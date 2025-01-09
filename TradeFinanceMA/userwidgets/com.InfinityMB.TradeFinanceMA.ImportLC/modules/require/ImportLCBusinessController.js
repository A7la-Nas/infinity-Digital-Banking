define(['DataFormattingUtils/FormatUtils','InvokeServiceUtils'],function (FormatUtils,InvokeServiceUtils) { 
  function BusinessController() {
    this.context = {};
    this.serviceParameters = {};
    this.store = {};
    this.objectMetadata = {};
    this.formatUtils = new FormatUtils();
    this.invokeServiceUtils = new InvokeServiceUtils();
    this.error = [];
    this.dataJSON = {};
  }

  /**
     * @api : getDataBasedOnDataMapping
     * gets the corresponding data of each widget from collection
     * @return : NA
     */
  BusinessController.prototype.getDataBasedOnDataMapping = function(widget, dataMapping) {
    var collectionObj = this.store.getState();
    this.collectionDataLength = Object.keys(collectionObj.Collection).length;
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
    var scope=this;
    kony.application.dismissLoadingScreen();
    var errorObj =
        {
          "level" : "BusinessController",
          "method" : method,
          "error": errorMsg
        };
    this.error.push(errorObj);
    this.dataJSON["errorMessage"] = method.errorMessage;
    this.dataJSON["isServerUnreachable"] = method.isServerUnreachable;
    // this.dataJSON["isServerUnreachable"] = method.isServerUnreachable;
    this.store.dispatch({
      type: "UPDATE_Collection_Cache",
      Cache: scope.dataJSON,
      Collection: scope.dataJSON,
      key : "Error"
    });
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
    if(object === "LetterOfCredit")
      formattedData = formattedData.LetterOfCredits;
    else if(object === "LCImportDrawing")
      formattedData = formattedData.drawings;
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
            record[key] = formattedValue;
          }
        }
      });
    });
    return formattedData;
  };

  /**
	* @api : setDataInCollection
	* Store the service response in Master object under collection and invoke formatting data
	* @return : NA
	*/
  BusinessController.prototype.setDataInCollection = function(object, data, transactionType, storeKey) {
    var collection = this.getFormattedData(object, data);
    this.store.dispatch({
      type : "UPDATE_Collection_Cache",
      Cache: data,
      Collection: collection,
      key: storeKey
    });
    kony.application.dismissLoadingScreen();
  };



  /**
* @api : setDataInCollectionExportLC
* Store the service response in Master object under ExportLC collection and invoke formatting data
* @return : NA
*/
  BusinessController.prototype.setDataInCollectionExportLC = function(data) {
    this.store.dispatch({
      type : "UPDATE_Collection_Cache",
      Cache: data,
      Collection: data,
      key : "ExportLC"
    });
    kony.application.dismissLoadingScreen();
  };



  /**
* @api : setProperties
* sets initial properties
* @return : NA
*/
  BusinessController.prototype.setProperties = function(serviceParameters, dataFormatJSON) {
    this.serviceParameters = serviceParameters;
    this.formatUtils.updateFormatJSON(dataFormatJSON);
  };



  /**
* @api : fetchTransactions
* fetches the data from the object model
* @return : NA
*/
  BusinessController.prototype.fetchTransactions = function(context) {
    var scope = this;
    kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
    this.context = context;
    var criteria = this.getCriteria(this.serviceParameters.Transactions.Criteria);
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.Transactions.Object, criteria, this.serviceParameters.Transactions.Verb).then(response => {
      scope.setDataInCollection(this.serviceParameters.Transactions.Object, response, criteria, "Transactions");
    }).catch(scope.setError.bind(this, "fetchTransactions"));
  };

  /**
	* @api : getMetaData
	* get meta data  from the model
	* @return : NA
	*/
  BusinessController.prototype.getMetaData = function() {
    var scope = this;
    function getMetaDataSuccess(response) {
      var objectMetadata = kony.mvc.util.ProcessorUtils.convertObjectMetadataToFieldMetadataMap(response);
      objectMetadata = {
        "additionalAmountPayable": {
          "validation": "AMOUNT",
          "format": "AMOUNT",
          "formatting_dependency": "additionalPayableCurrency"
        },
        "documentCharges": {
          "validation": "AMOUNT",
          "format": "AMOUNT",
          "formatting_dependency": "lcCurrency"
        },
        "issueDate": {
          "validation": "DATE",
          "format": "DATE"
        },
        "drawingCreationDate": {
          "validation": "DATE",
          "format": "DATE"
        },
        "lcExpiryDate": {
          "validation": "DATE",
          "format": "DATE"
        },
        "lcIssueDate": {
          "validation": "DATE",
          "format": "DATE"
        },
        "lcCreatedOn": {
          "validation": "DATE",
          "format": "DATE"
        },
        "rejectedDate": {
          "validation": "DATE",
          "format": "DATE"
        },
        "paymentDate": {
          "validation": "DATE",
          "format": "DATE"
        },
        "expiryDate": {
          "validation": "DATE",
          "format": "DATE"
        },
        "lcAmount": {
          "validation": "AMOUNT",
          "format": "AMOUNT",
          "formatting_dependency": "lcCurrency"
        },
        "selfApprovedAmount": {
          "validation": "AMOUNT",
          "format": "AMOUNT",
          "formatting_dependency": "lcCurrency"
        },
        "draftAmount": {
          "validation": "AMOUNT",
          "format": "AMOUNT",
          "formatting_dependency": "lcCurrency"
        },
        "totalAmount": {
          "validation": "AMOUNT",
          "format": "AMOUNT",
          "formatting_dependency": "lcCurrency"
        },
        "drawingAmount": {
          "validation": "AMOUNT",
          "format": "AMOUNT",
          "formatting_dependency": "drawingCurrency"
        },
        "deletedAmount": {
          "validation": "AMOUNT",
          "format": "AMOUNT",
          "formatting_dependency": "lcCurrency"
        },
        "totalAmountToBePaid": {
          "validation": "AMOUNT",
          "format": "AMOUNT",
          "formatting_dependency": "drawingCurrency"
        }
      };
      scope.objectMetadata[scope.serviceParameters.Transactions.Object] = objectMetadata;
    }
    function getMetaDataFailure(err) {
      scope.setError(err,"getMetaDataFromModel");
    }
    var options = {"getFromServer" : true};
    kony.mvc.util.ProcessorUtils.getMetadataForObject(this.serviceParameters.Transactions.Service, this.serviceParameters.Transactions.Object, options, getMetaDataSuccess, getMetaDataFailure);
  };

  /**
	* @api : getMetaDataForAllObjects
	* get meta data  from the model for all the objects
	* @return : NA
	*/  
  BusinessController.prototype.getMetaDataForAllObjects = function() {
    this.getMetaDataFromModel(this.serviceParameters.Transactions.Service, this.serviceParameters.Transactions.Object);  
  };

  /**
	* @api : getMetaDataFromModel
	* get meta data  from the model
	* @return : NA
	*/  
  BusinessController.prototype.getMetaDataFromModel = function(service, object) {
    var scope = this;
    var objectMetadata;
    if(object === "objName") {
      objectMetadata =  {"lcReferenceNo":{"validation":"ID_ALPHANUMERIC"},"lcAmount":{"validation":"AMOUNT_FORMAT"},"expiryPlace":{"validation":"NAME"}};
    }    
    scope.objectMetadata[object] = objectMetadata;
  };

  kony.application.dismissLoadingScreen();
  return BusinessController;
});