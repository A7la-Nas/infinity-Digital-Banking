define(['DataFormattingUtils/FormatUtils', 'CommonUtilities', 'InvokeServiceUtils'], function(FormatUtils, CommonUtilities, InvokeServiceUtils) {

  function BusinessController() {
    this.context = {};
    this.serviceParameters = {};
    this.invokeServiceUtils = new InvokeServiceUtils();
    this.store = {};
    this.objectMetadata = {};
    this.formatUtils = new FormatUtils(); 
    this.error = [];
    this.dataJSON = {};
    this.segData;
  }
  /**
      * @api : setProperties
      * sets initial properties
      * @return : NA
      */
  BusinessController.prototype.setProperties = function(serviceParameters, segData) {
    this.serviceParameters = serviceParameters;
    this.segData = segData;
  };
  /**
      * @api : getCriteria
      * Return the criteria with context value
      * @return : {JSON}
      */
  BusinessController.prototype.getCriteria = function(criteriaJSON) {
    var criteria = JSON.parse(JSON.stringify(criteriaJSON));
    for(key in criteria){
      var value = criteria[key];
      if(typeof value === "string"){
        if(value.indexOf("$") !== -1){
          var token = value.substring(value.indexOf("{")+1,value.indexOf("}"));
          if(token.indexOf("CNTX.") !== -1){
            token = token.split(".");
            token = token[token.length - 1].replace("}","");
            criteria[key] = this.context.data[token];
          }
        }
      }
    }
    return criteria;
  };
  /**
      * @api : downloadTransactions
      * Downloades the particular transaction
      * @return : NA
      */
  BusinessController.prototype.downloadTransactions = function(context, fileName) {
    kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
    var scope = this;
    this.context = context;
    var criteria = this.getCriteria(this.serviceParameters.Criteria);
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.Object, criteria, this.serviceParameters.Verb).then(response => {
      scope.downloadTransactionsSuccess(response, fileName);
    }).catch(scope.downloadTransactionsFailure.bind(this));
  };
  /**
      * @api : downloadTransactionsSuccess
      * onSuccessCallback of downloadTransactions
      * @return : NA
      */
  BusinessController.prototype.downloadTransactionsSuccess = function(response, fileName) {
    const mfURL = KNYMobileFabric.mainRef.config.services_meta.TradeFinance.url;
    const url = `${mfURL}/operations/LCSummary/downloadGeneratedAcknowledgement`;
    CommonUtilities.downloadGeneratedFile({ url, fileName, fileType: 'pdf' }, {"fileId": response.fileId});
    kony.application.dismissLoadingScreen();
  };
  BusinessController.prototype.downloadTransactionsFailure = function(responseError) {
    kony.application.dismissLoadingScreen();
    kony.ui.Alert("norecordsfound");
  };
  /**
       * @api : getDataBasedOnDataMapping
       * gets the corresponding data of each widget from collection
       * @return : NA
       */
  BusinessController.prototype.getDataBasedOnDataMapping = function(widget, dataMapping) {
    var collectionObj = this.store.getState();
    for(var record in dataMapping) {
      var keyValues = dataMapping[record];
      for(var key in keyValues) {
        if(widget === key) {
          var fieldValue = dataMapping[record][widget];
          if(typeof fieldValue === "string") {
            if(!fieldValue.indexOf("${Collection")) {
              var group = fieldValue.split(".")[1];
              var fieldType = fieldValue.split(".")[2].replace("}", "");
              if(!kony.sdk.isNullOrUndefined(collectionObj.Collection[group])) {
                if(!kony.sdk.isNullOrUndefined(collectionObj.Collection[group][fieldType])) {
                  return collectionObj.Collection[group][fieldType];
                } } }
            else if(!fieldValue.indexOf("${i18n")) {
              return kony.i18n.getLocalizedString(fieldValue.substring(fieldValue.indexOf("${i18n{")+7, fieldValue.length-2));
            } else if(fieldValue.indexOf("${i18n") === -1 && fieldValue.indexOf("${Collection")=== -1) {
              return fieldValue;
            }
          }
          else if(typeof fieldValue === "object") {
            var data = this.getDataSpecificToBreakpoint(fieldValue);
            return kony.i18n.getLocalizedString(data.substring(data.indexOf("${i18n{")+7, data.length-2));
          }
        } }
    }
    return "";
  };
  /**
       * @api : getDataSpecificToBreakpoint
       * gets data specified to the corresponding breakpoint
       * @return : NA
       */
  BusinessController.prototype.getDataSpecificToBreakpoint = function(inputJSON) {
    var currentBreakpoint = kony.application.getCurrentBreakpoint();
    if(Object.keys(this.breakpoints).length !== 0) {
      for(var key in this.breakpoints) {
        if(currentBreakpoint === this.breakpoints[key]) {
          if(!kony.sdk.isNullOrUndefined(inputJSON.key)) {
            return inputJSON.key;
          } }
      } }
    if(inputJSON.hasOwnProperty("default")) {
      return inputJSON["default"];
    }
  };
  /**
      * @api : setError
      * triggered as a error call back for any service
      * @return : NA
      */
  BusinessController.prototype.setError = function(errorMsg, method) {
    var errorObj =
        {
          "level" : "BusinessController",
          "method" : method,
          "error": errorMsg
        };
    this.error.push(errorObj);
    if(errorMsg === "fetchDrawingsCount-drawingsCount"){
      this.store.dispatch({
        type: "UPDATE_CACHE_COLLECTION",
        cacheData: errorMsg,
        collectionData: errorMsg,
        key : "fetchDrawingsCount"
      });
    }
    kony.application.dismissLoadingScreen();
  };

  BusinessController.prototype.fetchDrawingsCount = function(storeKey) {
    kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
    var scope = this;
    var criteria = this.getCriteria(this.serviceParameters.Criteria);
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.Object, criteria, this.serviceParameters.Verb)
      .then(response => {
      scope.storeFetchedData(response,storeKey);
    })
      .catch(scope.setError.bind(this, "fetchDrawingsCount-"+storeKey));
  };

  BusinessController.prototype.fetchTransactions = function() {
    kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
    var scope = this;
    var criteria = this.getCriteria(this.serviceParameters.Criteria);
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.Object, criteria, this.serviceParameters.Verb)
      .then(response => {
      scope.storeFetchedData(response,"Transactions");
    })
      .catch(scope.setError.bind(this, "fetchTransactions"));
  };

  /**
      * @api : storeFetchedData
      * Store the service response in Master object under collection and invoke formatting data
      * @return : NA
      */
  BusinessController.prototype.storeFetchedData = function(data,key) {
    kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
    var scope = this;
    this.collectionObj = this.store.getState();
    var collection;
    if(key === "Transactions"){
      this.getMetaDataFromModel(this.serviceParameters.Object);
      collection = this.getFormattedData(this.serviceParameters.Object, data);
      this.store.dispatch({
        type: "UPDATE_CACHE_COLLECTION",
        cacheData: collection[0],
        collectionData: collection[0],
        key : "objName"
      });
    }
    else if(key === "drawingsCount"){
      scope.store.dispatch({
        type: "UPDATE_CACHE_COLLECTION",
        cacheData: data.drawings,
        collectionData: data.drawings,
        key : key
      });
    }
    else if(key === "swiftsAndAdvices"){
      scope.getMetaDataFromModel("swiftsAndAdvices");
      collection = scope.getFormattedData("swiftsAndAdvices", data);
      scope.store.dispatch({
        type: "UPDATE_CACHE_COLLECTION",
        cacheData: collection,
        collectionData: collection,
        key : key
      });
    }
    else{
      this.store.dispatch({
        type: "UPDATE_CACHE_COLLECTION",
        cacheData: data.letterOfCredits,
        collectionData: data.letterOfCredits,
        key : key
      });
    }

    if(data.allAccounts){
      this.getMetaDataFromModel("allAccounts");
      data.allAccounts = this.getFormattedData("allAccounts",data["allAccounts"]);
      this.store.dispatch({
        type: "UPDATE_CACHE_COLLECTION",
        cacheData: data.allAccounts,
        collectionData: data.allAccounts,
        key : "allAccounts"
      });
    }
    kony.application.dismissLoadingScreen();
  };
  /**
      * @api : getMetaDataFromModel
      * sets the value to ObjectMetaData
      * @return : NA
      */
  BusinessController.prototype.getMetaDataFromModel = function(object) {
    var scope = this;
    var objectMetadata;      
    if(object === "allAccounts")
      objectMetadata = {"accountName":{"validation":"ACCOUNT_NAME","format":"ACCOUNT_NAME","formatting_dependency":"accountID"}};
    else if (object === "swiftsAndAdvices")
      objectMetadata = {
        swiftDate : {
          "validation":"DATE",
          "format":"DATE"
        }
      };
    else
      objectMetadata = {"additionalAmountPayable":{"validation":"AMOUNT","format":"AMOUNT","formatting_dependency":"additionalPayableCurrency"},"documentCharges":{"validation":"AMOUNT","format":"AMOUNT","formatting_dependency":"lcCurrency"},"issueDate":{"validation":"DATE","format":"DATE"},"lcCreatedOn":{"validation":"DATE","format":"DATE"},"expiryDate":{"validation":"DATE","format":"DATE"},"lcAmount":{"validation":"AMOUNT","format":"AMOUNT","formatting_dependency":"lcCurrency"},"selfApprovedAmount":{"validation":"AMOUNT","format":"AMOUNT","formatting_dependency":"lcCurrency"},"draftAmount":{"validation":"AMOUNT","format":"AMOUNT","formatting_dependency":"lcCurrency"},"totalAmount":{"validation":"AMOUNT","format":"AMOUNT","formatting_dependency":"lcCurrency"},"deletedAmount":{"validation":"AMOUNT","format":"AMOUNT","formatting_dependency":"lcCurrency"}};
    scope.objectMetadata[object] = objectMetadata;
  }; 
  /**
      * @api : getFormattedData
      * forms the values based on the passed arguments
      * @return : formatted value
      */
  BusinessController.prototype.getFormattedData = function (object, data) {
    var scope = this;
    try{
      var objectMetadata = this.objectMetadata[object];
      var formattedData = JSON.parse(JSON.stringify(data));
      if(object === "LetterOfCredit")
        formattedData = formattedData.LetterOfCredits;
      else if (object === "swiftsAndAdvices")
        formattedData = formattedData.SwiftsAndAdvises;
      formattedData.map(function (record) {
        var keys = Object.keys(record);
        keys.forEach((key) => {
          if (objectMetadata.hasOwnProperty(key)) {
            var metaData = objectMetadata[key];
            if (metaData.format !== undefined) {
              var dependentData;
              if (metaData.formatting_dependency) {
                dependentData = record[metaData.formatting_dependency];
              }
              var formattedValue = scope.formatUtils.formatData(metaData.format, record[key], dependentData);
              if(object === "LetterOfCredit" || object === "swiftsAndAdvices")
                record[key] = formattedValue;
              else
                record[key + "Formatted"] = formattedValue;
            }
          }
        });
      });
      return formattedData;
    }
    catch(err)
    {
      var errorObj =
          {
            "level" : "BusinessController",
            "method" : "getFormattedData",
            "error": err
          };
    }
  };
  kony.application.dismissLoadingScreen();
  return BusinessController;
});