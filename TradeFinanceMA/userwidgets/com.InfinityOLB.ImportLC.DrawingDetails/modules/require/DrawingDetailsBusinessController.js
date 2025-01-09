/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Copyright © Temenos Headquarters SA 2021. All rights reserved.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*/
define(['DataFormattingUtils/FormatUtils', 'CommonUtilities', 'InvokeServiceUtils','OLBConstants'], function(FormatUtils, CommonUtilities, InvokeServiceUtils,OLBConstants) {

  function BusinessController() {	
    this.context = {};
    this.serviceParameters = {};
    this.store = {};
    this.invokeServiceUtils = new InvokeServiceUtils();
    this.objectMetadata = {};
    this.breakpoints = {};
    this.formatUtils = new FormatUtils(); 
    this.error = [];
    this.dataJSON = {};
  }

  /**
	* @api : setProperties
	* sets initial properties
	* @return : NA
	*/
  BusinessController.prototype.setProperties = function(serviceParameters) {
    this.serviceParameters = serviceParameters;
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
	* @api : storeFetchedData
	* Store the service response in Master object under collection and invoke formatting data
	* @return : NA
	*/
  BusinessController.prototype.storeFetchedData = function(data) {
    var scope = this;
    this.collectionObj = this.store.getState();
    this.getMetaDataFromModel("DigitalArrangements");
    if (data["Drawing"] && data["Drawing"].length > 0) {
      var collection = this.getFormattedData("DigitalArrangements", data.Drawing);
      this.store.dispatch({
        type: "UPDATE_COLLECTION",
        data: collection[0],
        key: "dashboard"
      }); 
      if(data["SwiftsAndAdvises"] && data["SwiftsAndAdvises"].length)
        this.store.dispatch({
          type: "UPDATE_COLLECTION",
          data: data,
          key: "swiftsAndAdvices"
        });
    } else if (data["LetterOfCredits"] && data["LetterOfCredits"].length > 0) {
      this.store.dispatch({
        type: "UPDATE_COLLECTION",
        data: data.LetterOfCredits[0],
        key: "LetterOfCredits"
      });
    } else if (data["status"] === OLBConstants.IMPORT_DRAWINGS_STATUS.PROCESSING_BY_BANK || data["status"] === OLBConstants.IMPORT_DRAWINGS_STATUS.SUBMITTED_TO_BANK) {
      this.store.dispatch({
        type: "UPDATE_COLLECTION",
        data: data,
        key: "Submit"
      });
    }
    if (!scope.collectionObj.Collection["DigitalArrangements"]) {
      if (data["DigitalArrangements"] && data["DigitalArrangements"].length > 0) data["DigitalArrangements"] = this.getFormattedData("DigitalArrangements", data["DigitalArrangements"]);
      this.store.dispatch({
        type: "UPDATE_COLLECTION",
        data: data["DigitalArrangements"],
        key: "DigitalArrangements"
      });
    }
    kony.application.dismissLoadingScreen();
  }; 

  /**
	* @api : downloadTransactions
	* Downloades the particular transaction
	* @return : NA
	*/
  BusinessController.prototype.downloadTransactions = function() {
    var scope = this;
    var criteria = this.getCriteria(this.serviceParameters.Criteria);
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.Object, criteria, this.serviceParameters.Verb).then(response => {
      scope.downloadTransactionsSuccess(response);
    }).catch(scope.downloadTransactionsFailure.bind(this));    
  };

  /**
	* @api : downloadTransactionsSuccess
	* onSuccessCallback of downloadTransactions
	* @return : NA
	*/
  BusinessController.prototype.downloadTransactionsSuccess = function(response) {
    const mfURL = KNYMobileFabric.mainRef.config.services_meta.TradeFinance.url;
    const url = `${mfURL}/operations/LCSummary/downloadGeneratedAcknowledgement`;
    CommonUtilities.downloadGeneratedFile({ url, fileName: 'Import Drawing', fileType: 'pdf' }, {"fileId": response.fileId});
  };
  BusinessController.prototype.downloadTransactionsFailure = function(responseError) {
    var errMsg = responseError;
  };

  /**
	* @api : fetchTransactions
	* fetches the  data from the object model
	* @return : NA
	*/
  BusinessController.prototype.fetchTransactions = function() {
    var scope = this;
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    // this.context = context;
    var criteria = this.getCriteria(this.serviceParameters.Criteria);
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.Object, criteria, this.serviceParameters.Verb).then(response => {
      scope.storeFetchedData(response);
    }).catch(scope.setError.bind(this, "fetchTransactions"));    
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
  * @api : getFormattedData
  * returns the formatted data
  * @return : NA
  */
  BusinessController.prototype.getFormattedData = function (object, data) {
    var scope = this;
    var objectMetadata = this.objectMetadata[object];
    var formattedData = JSON.parse(JSON.stringify(data));
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
            record[key + "Formatted"] = formattedValue;
          }
        }
      });
    });
    return formattedData;
  };

  /**
	* @api : getMetaDataFromModel
	* get meta data  from the model
	* @return : NA
	*/  
  BusinessController.prototype.getMetaDataFromModel = function(object) {
    var scope = this;
    var objectMetadata;
    if(object === "DigitalArrangements"){
      objectMetadata = {
        "accountName":{"validation":"ACCOUNT_NAME","format":"ACCOUNT_NAME","formatting_dependency":"accountID"},        
        "lcExpiryDate": {
          "validation": "DATE",
          "format": "DATE"
        },
        "lcIssueDate": {
          "validation": "DATE",
          "format": "DATE"
        },
        "drawingAmount": {
          "validation": "AMOUNT",
          "format": "AMOUNT",
          "formatting_dependency": "drawingCurrency"
        },
        "drawingCreationDate": {
          "validation": "DATE",
          "format": "DATE"
        },
        "lcAmount": {
          "validation": "AMOUNT",
          "format": "AMOUNT",
          "formatting_dependency": "drawingCurrency"
        },
        "totalAmountToBePaid": {
          "validation": "AMOUNT",
          "format": "AMOUNT",
          "formatting_dependency": "drawingCurrency"
        },
        "paymentDate": {
          "validation": "DATE",
          "format": "DATE"
        },
        "rejectedDate": {
          "validation": "DATE",
          "format": "DATE"
        }
      };
    }
    scope.objectMetadata[object] = objectMetadata;
  }; 
  BusinessController.prototype.setError = function(errorMsg, method) {
    kony.application.dismissLoadingScreen();
    var errorObj = {
      "level": "BusinessController",
      "method": method,
      "error": errorMsg
    };
    if(this.serviceParameters.Verb === "submitImportLCDrawing") {
      this.store.dispatch({
        type: "UPDATE_COLLECTION",
        data: method.serverErrorRes,
        key: "error"
      });
    }
    else
      this.error.push(errorObj);
  };
  kony.application.dismissLoadingScreen();
  return BusinessController;
});