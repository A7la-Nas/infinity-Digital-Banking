define(['DataFormattingUtils/FormatUtils','InvokeServiceUtils','CommonUtilities'],function(FormatUtils,InvokeServiceUtils,CommonUtilities) {
  function BusinessController() {
    this.context = {};
    this.serviceParameters = {};
    this.store = {};
    //this.store = ImportLCStore;
    this.objectMetadata = {};
    this.breakpoints = {};
    this.formatUtils = new FormatUtils();
    this.invokeServiceUtils = new InvokeServiceUtils();
    this.error = [];
    this.dataJSON = {};
  }
  /**
	* @api : setProperties
	* sets initial properties
	* @return : NA
	*/
  BusinessController.prototype.setProperties = function(serviceParameters, dataFormatJSON, breakpoints) {
    this.serviceParameters = serviceParameters;
    this.breakpoints = breakpoints;
    this.formatUtils.updateFormatJSON(dataFormatJSON);
  };
  /**
	* @api : getMetaData
	* get meta data  from the model
	* @return : NA
	*/
  BusinessController.prototype.getMetaData = function(serviceParameters) {
    var scope = this;
    function getMetaDataSuccess(response) {
      var objectMetadata = kony.mvc.util.ProcessorUtils.convertObjectMetadataToFieldMetadataMap(response);
      objectMetadata = {"chargesPaid":{"validation":"AMOUNT","format":"AMOUNT","formatting_dependency":"lcCurrency"},"maximumCreditAmount":{"validation":"AMOUNT","format":"AMOUNT","formatting_dependency":"lcCurrency"},"amendmentApprovedDate":{"validation":"DATE","format":"DATE"},"amendmentDate":{"validation":"DATE","format":"DATE"},"issueDate":{"validation":"DATE","format":"DATE"},"lcCreatedOn":{"validation":"DATE","format":"DATE"},"expiryDate":{"validation":"DATE","format":"DATE"},"lcAmount":{"validation":"AMOUNT","format":"AMOUNT","formatting_dependency":"lcCurrency"},"documentCharges":{"validation":"AMOUNT","format":"AMOUNT","formatting_dependency":"lcCurrency"},"additionalAmountPayable":{"validation":"AMOUNT","format":"AMOUNT","formatting_dependency":"lcCurrency"},"drawingCreationDate":{"validation":"DATE","format":"DATE"},"drawingAmount": {"validation": "AMOUNT","format": "AMOUNT","formatting_dependency": "drawingCurrency"},"lcIssueDate":{"validation":"DATE","format":"DATE"}};
      scope.objectMetadata[scope.serviceParameters.Object] = objectMetadata;
    }
    function getMetaDataFailure(err) {
      scope.setError(err,"getMetaDataFromModel");
    }
    var options = {"getFromServer" : true};
    kony.mvc.util.ProcessorUtils.getMetadataForObject(serviceParameters.Service, serviceParameters.Object, options, getMetaDataSuccess, getMetaDataFailure);
  }; 
  /**
	* @api : fetchTransactions
	* fetches the  data from the object model
	* @return : NA
	*/
  BusinessController.prototype.fetchTransactions = function(context) {
    var scope = this;
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    this.context = context;
    var criteria = this.getCriteria(this.serviceParameters.Criteria);
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.Object, criteria, this.serviceParameters.Verb).then(response => {
      scope.setDataInCollection(this.serviceParameters.Object, response, criteria, "Transactions");
    }).catch(scope.setError.bind(this, "fetchTransactions"));    
  };
  /**
	* @api : downloadTransactions
	* Downloades the particular transaction
	* @return : NA
	*/
  BusinessController.prototype.downloadTransactions = function(context, fileName) {
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
  };
  BusinessController.prototype.downloadTransactionsFailure = function(responseError) {
    kony.ui.Alert("norecordsfound");
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
      if(typeof value == "string"){
        if(value.indexOf("$") != -1){
          var token = value.substring(value.indexOf("{")+1,value.indexOf("}"));
          if(token.indexOf("CNTX.") != -1){
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
	* @api : setDataInCollection
	* Store the service response in Master object under collection and invoke formatting data
	* @return : NA
	*/

  BusinessController.prototype.setDataInCollection = function(object, data, transactionType, storeKey) {
    // data = this.addTransactionTypeInResponse(data.Transactions, transactionType);
    var collection = this.getFormattedData(object, data);
    this.store.dispatch({
      type : "UPDATE_Collection_Cache",
      Cache: data,
      Collection: collection,
      key : storeKey
    }); 
    kony.application.dismissLoadingScreen();
  };
  /**
	* @api : addTransactionTypeInResponse
	* adds the transaction type field in response if the field not exists
	* @return : Array
	*/
  BusinessController.prototype.addTransactionTypeInResponse = function(data, transactionType) {
    if(data.length > 0){
      if(data[0].transactionType === null || data[0].transactionType === undefined){
        data.map(function(record){
          record["transactionType"] = transactionType;
        });
      }
    }
    return data;
  };
  /**
	* @api : getFormattedData
	* returns the formatted data
	* @return : NA
	*/

  BusinessController.prototype.getFormattedData = function(object, data) {
    var scope = this;
    var objectMetadata = this.objectMetadata[object];
    var formattedData = JSON.parse(JSON.stringify(data));
    if(object === "LetterOfCredit"){
      if(formattedData.LetterOfCredits)
        formattedData = formattedData.LetterOfCredits;
      else if(formattedData.Amendments)
        formattedData = formattedData.Amendments;
    }else{
      formattedData = formattedData.drawings;
    }
    formattedData.map(function(record){
      var keys = Object.keys(record);
      keys.forEach((key) => {
        if(objectMetadata.hasOwnProperty(key)){
          var metaData = objectMetadata[key];
          if(metaData.format != undefined){
            var dependentData;
            if(metaData.formatting_dependency){
              dependentData = record[metaData.formatting_dependency]
            }
            var formattedValue = scope.formatUtils.formatData(metaData.format, record[key], dependentData); 
            if(!formattedValue.includes("NaN"))
              record[key] = formattedValue;
          }
        }
      });
    });
    return formattedData;
  };
  /**
	* @api : getMetaDataForAllObjects
	* get meta data  from the model for all the objects
	* @return : NA
	*/  
  BusinessController.prototype.getMetaDataForAllObjects = function() {
    this.getMetaDataFromModel(this.serviceParameters.Service, this.serviceParameters.Object);  
  };
  /**
	* @api : getMetaDataFromModel
	* get meta data  from the model
	* @return : NA
	*/  
  BusinessController.prototype.getMetaDataFromModel = function(service, object) {
    var scope = this;
    //var objectMetadata = kony.mvc.util.ProcessorUtils.convertObjectMetadataToFieldMetadataMap(res);
    var objectMetadata;
    if(object === "objName") {
      objectMetadata =  {"lcReferenceNo":{"validation":"ID_ALPHANUMERIC"},"lcAmount":{"validation":"AMOUNT_FORMAT"},"expiryPlace":{"validation":"NAME"}};
    }    
    scope.objectMetadata[object] = objectMetadata;
    //var options = {"getFromServer" : true};
    //kony.mvc.util.ProcessorUtils.getMetadataForObject(service, object, options, getMetaDataSuccess, getMetaDataFailure);
  }; 
  /**
     * @api : getDataBasedOnDataMapping
     * gets the corresponding data of each widget from collection
     * @return : NA
     */
  BusinessController.prototype.getDataBasedOnDataMapping = function(widget, dataMapping) {
    var collectionObj = this.store.getState();
    for (var record in dataMapping) {
      var keyValues = dataMapping[record];
      for (var key in keyValues) {
        if (widget === key) {
          var fieldValue = dataMapping[record][widget];
          if (typeof fieldValue === "string") {
            if (!fieldValue.indexOf("${Collection")) {
              var group = fieldValue.split(".")[1];
              var fieldType = fieldValue.split(".")[2].replace("}", "");
              if (!kony.sdk.isNullOrUndefined(collectionObj.Collection[group])) {
                if (!kony.sdk.isNullOrUndefined(collectionObj.Collection[group][fieldType])) {
                  return collectionObj.Collection[group][fieldType];
                }
              }
            } else if (!fieldValue.indexOf("${i18n")) {
              return kony.i18n.getLocalizedString(fieldValue.substring(fieldValue.indexOf("${i18n{") + 7, fieldValue.length - 2));
            } else {
              return fieldValue;
            }
          } else if (typeof fieldValue === "object") {
            var data = this.getDataSpecificToBreakpoint(fieldValue);
            if (!data.indexOf("${Collection")) {
              var group = data.split(".")[1];
              var fieldType = data.split(".")[2].replace("}", "");
              if (!kony.sdk.isNullOrUndefined(collectionObj.Collection[group])) {
                if (!kony.sdk.isNullOrUndefined(collectionObj.Collection[group][fieldType])) {
                  return collectionObj.Collection[group][fieldType];
                }
              }
            }else if (!data.indexOf("${i18n")) {
              return kony.i18n.getLocalizedString(data.substring(data.indexOf("${i18n{") + 7, data.length - 2));
            } else {
              return data;
            }
          }
        }
      }
    }
    return "";
  };
  /**
	* @api : sortData
	* gets invoked on sorting  data
	* @return : NA
	*/
  BusinessController.prototype.sortData = function(field, sortBy, storeKey) {
    var scope = this;
    var state = this.store.getState();
    var records = state.Cache[storeKey];
    var sortedData = [];
    sortedData = records.slice().sort(function(a, b) {
      a = a[field];
      b = b[field];
      return a > b ? 1 : a < b ? -1 : 0;
    });
    if(sortBy === "DESC"){
      sortedData = sortedData.reverse();
    }
    var data = this.getFormattedData(this.serviceParameters.Object, sortedData);
    this.store.dispatch({
      type: "UPDATE_Collection",
      data: data,
      key : "Transactions"
    });
  };
  /**
	* @api : performDataValidation
	* performs data validation
	* @return : whether validation is success or not
	*/
  BusinessController.prototype.performDataValidation = function(inputData, mappedParameter, widgetName, dataMapping) {
    var validationSuccess = "";
    var inputDataJSON = {};
    var resultJSON = {};
    var validateJSON = {"dataValidation" : {}};
    var object = Object.keys(validateJSON)[0];
    validateJSON.dataValidation[widgetName] = this.getValidationType(mappedParameter);
    inputDataJSON[widgetName] = inputData;
    var dataValidator = this.dataValidationHandler.validateData(inputDataJSON, object, validateJSON);
    if(Object.keys(dataValidator).length === 0 && dataValidator.constructor === Object) {
      validationSuccess = "";
      var text = Object.values(inputDataJSON)[0];
      resultJSON["dvfError"] = validationSuccess;
      resultJSON["widgetId"] = widgetName;
      this.storeInCollection(text, widgetName, dataMapping);
    }
    else {
      validationSuccess = dataValidator;
      resultJSON["dvfError"] = validationSuccess;
    }
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: resultJSON,
      key : "dvfResult"
    });
  };
  /**
     * @api : storeInCollection
     * stores the input data in collection
     * @return : NA
     */
  BusinessController.prototype.storeInCollection = function(text, widgetName, dataMapping) {
    var scope = this;
    var formatType = "", formattedData;
    var collectionObj = this.store.getState();
    var fieldName = this.getKeyFromMapping(widgetName, dataMapping);
    var objectName = this.getObjectName(widgetName, dataMapping);
    if(!kony.sdk.isNullOrUndefined(collectionObj.Collection[objectName])) {
      scope.dataJSON = collectionObj.Collection[objectName];
    }
    scope.dataJSON[fieldName] = text;    
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: scope.dataJSON,
      key : objectName
    });
  };
  /**
	* @api : getObjectName
	* gets the object name mapped for the corresponding widget
	* @return : NA
	*/
  BusinessController.prototype.getObjectName = function(widgetName, dataMapping) {
    for(var record in dataMapping) {
      var keyValues = dataMapping[record];
      for(var key in keyValues) {
        if(widgetName === key) {
          var fieldValue = dataMapping[record][widgetName];
          fieldValue = fieldValue.split(".")[1];
          return fieldValue;
        } } }
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
	* @api : getKeyFromMapping
	* gets key from data mapping
	* @return : NA
	*/
  BusinessController.prototype.getKeyFromMapping = function(widget, dataMapping) {
    for(var record in dataMapping) {
      var keyValues = dataMapping[record];
      for(var key in keyValues) {
        if(widget === key) {
          var fieldValue = dataMapping[record][widget];
          fieldValue = fieldValue.split(".")[2].replace("}","");
          return fieldValue;
        } } }
  };
  /**
	* @api : getFormatType
	* fetches the format type from meta data
	* @return : format type
	*/
  BusinessController.prototype.getFormatType = function(fieldType) {
    for(key in this.objectMetadata) {
      if(!kony.sdk.isNullOrUndefined(this.objectMetadata.objName[fieldType]))
        return this.objectMetadata.objName[fieldType].format;
    }
  };

  /**
	* @api : getValidationType
	* fetches the validation type from meta data
	* @return : validation type
	*/
  BusinessController.prototype.getValidationType = function(fieldType) {
    for(key in this.objectMetadata) {
      if(!kony.sdk.isNullOrUndefined(this.objectMetadata.objName[fieldType]))
        return this.objectMetadata.objName[fieldType].validation;
      else
        return "";
    }
  };

 /**
     * @api : getXLSXFile
     * Generated the file ID of the DOwnloaded file
     * @return : validation type
     */
  BusinessController.prototype.getXLSXFile = function(fileName) {
    var scope = this;
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    var criteria = this.getCriteria(this.serviceParameters.Criteria);
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.Object, criteria, this.serviceParameters.Verb).then(response => {
        scope.getXLSXFileSuccess(response, fileName);
    }).catch(scope.getXLSXFileFailure.bind(this));
};
/**
 * @api : getXLSXFileSuccess
 * called on success of download service call
 * @return : validation type
 */
  BusinessController.prototype.getXLSXFileSuccess = function (response, fileName) {
    const mfURL = KNYMobileFabric.mainRef.config.services_meta.TradeFinance.url;
    const url = `${mfURL}/operations/LCSummary/downloadGeneratedList`;
    CommonUtilities.downloadGeneratedFile({ url, fileName, fileType: 'xlsx' }, {"fileId": response.fileId});
    kony.application.dismissLoadingScreen();
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: {
        isDownloadComplete: true
      },
      key: "download"
    });
  };
  /**
     * @api : getXLSXFileFailure
     * Handles download service failed cases
     * @return : validation type
     */
   BusinessController.prototype.getXLSXFileFailure = function(responseError) {
		this.store.dispatch({
            type: "UPDATE_COLLECTION",
            data: {
				isDownloadComplete : true
			},
            key: "download"
        });
        kony.application.dismissLoadingScreen();
        this.setError(responseError, "getXLSXFileFailure");
    };
  /**
	* @api : setError
	* triggered as a error call back for any service
	* @return : NA
	*/
  BusinessController.prototype.setError = function(errorMsg, method) {
    kony.application.dismissLoadingScreen();
    var collectionObj = this.store.getState();
    this.dataJSON["errorMessage"] = method.errorMessage;
    this.dataJSON["isServerUnreachable"] = method.isServerUnreachable;
    this.store.dispatch({
      type: "UPDATE_Collection_Cache",
      data: this.dataJSON,
      key : "Transactions"
    });
  };
  kony.application.dismissLoadingScreen();
  return BusinessController;
});