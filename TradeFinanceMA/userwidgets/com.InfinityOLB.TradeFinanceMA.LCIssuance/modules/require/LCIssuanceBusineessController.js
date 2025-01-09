define(['DataFormattingUtils/FormatUtils', 'DataValidationFramework/DataValidationHandler','InvokeServiceUtils'], function(FormatUtils, DataValidationHandler,InvokeServiceUtils) {
   
   function BusinessController() {
    this.context = {};
    this.serviceParameters = {};
    this.store = {};
    this.objectMetadata = {};
    this.breakpoints = {};
    this.formatUtils = new FormatUtils();
    this.dataValidationHandler = new DataValidationHandler();
    this.invokeServiceUtils = new InvokeServiceUtils();
    this.error = [];
    this.minimumDataFillConfig = {
      "dataJSON": {
        "tbxReferenceNumber": "1",
        "tbxAmount": "1",
        "tbxCurrency": "1",
        "tbxPayableCurrency": "1",
        "tbxAvailable1": "1",
        "tbxAvailable2": "1",
        "tbxAvailable3": "1",
        "tbxAvailable4": "1",
        "tbxIssueDate": "10",
        "tbxExpiryDate": "10",
        "tbxExpiryPlace": "1",
        "tbxBeneficiaryName":"1",
        "tbxBeneficiaryAddress1":"1",
        "tbxCity":"1",
        "tbxBankZipCode":"1",
        "tbxBankName":"1",
        "tbxBankAddress1":"1",
        "tbxBankAddress2": "1",
        "tbxBeneficiaryAddress2": "1",
        "tbxBankCity":"1",
        "tbxBeneficiaryZipCode":"1",
        "tbxCharges": "1"
      }
    };
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
	* @api : getMetaDataForAllObjects
	* get meta data  from the model for all the objects
	* @return : NA
	*/  
  BusinessController.prototype.getMetaDataForAllObjects = function() {
    this.getMetaDataFromModel(this.serviceParameters.CreateLC.Service, this.serviceParameters.CreateLC.Object);  
   // this.getMetaDataFromModel(this.serviceParameters.GetAccounts.Service, this.serviceParameters.GetAccounts.Object);
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
    if(object === "LetterOfCredit") {
      objectMetadata =  {
        "lcReferenceNo": {
          "validation": "ID_ALPHANUMERIC"
        },
        "tolerancePercentage": {
          "validation": "ID_ALPHANUMERIC"
        },
        "availableWith1": {
          "validation": "ID_ALPHANUMERIC"
        },
        "availableWith2": {
          "validation": "ID_ALPHANUMERIC"
        },
        "availableWith3": {
          "validation": "ID_ALPHANUMERIC"
        },
        "availableWith4": {
          "validation": "ID_ALPHANUMERIC"
        },
        "issueDate":{
          "validation":"DATE","format":"DATE"
        },
        "expiryDate":{
          "validation":"DATE","format":"DATE"
        },
        "latestShippingDate": {
          "validation": "DATE","format": "DATE"
        },
        "expiryPlace": {
          "validation": "ID_ALPHANUMERIC"
        },
        "messageToBank": {
          "validation": "ID_ALPHANUMERIC"
        },
        "lcAmount": {
          "validation": "AMOUNT_FORMAT"
        },
        "beneficiaryName": {
          "validation": "ID_ALPHANUMERIC"
        },
        "beneficiaryAddressLine1": {
          "validation": "ID_ALPHANUMERIC"
        },
        "beneficiaryAddressLine2": {
          "validation": "ID_ALPHANUMERIC"
        },
        "beneficiaryPostCode": {
          "validation": "ID_ALPHANUMERIC"
        },
        "beneficiaryCity": {
          "validation": "ID_ALPHANUMERIC"
        },
        "beneficiaryBank": {
          "validation": "ID_ALPHANUMERIC"
        },
        "beneficiaryBankAdressLine1": {
          "validation": "ID_ALPHANUMERIC"
        },
        "beneficiaryBankAdressLine2": {
          "validation": "ID_ALPHANUMERIC"
        },
        "beneficiaryBankPostCode": {
          "validation": "ID_ALPHANUMERIC"
        },
        "beneficiaryBankCity": {
          "validation": "ID_ALPHANUMERIC"
        },
        "placeOfTakingIncharge": {
          "validation": "ID_ALPHANUMERIC"
        },
        "portOfLoading": {
          "validation": "ID_ALPHANUMERIC"
        },
        "portOfDischarge": {
          "validation": "ID_ALPHANUMERIC"
        },
        "placeOfFinalDelivery": {
          "validation": "ID_ALPHANUMERIC"
        },
        "descriptionOfGoods": {
          "validation": "ID_ALPHANUMERIC"
        },
        "documentsRequired": {
          "validation": "ID_ALPHANUMERIC"
        },
        "additionalConditionsCode": {
          "validation": "ID_ALPHANUMERIC"
        },
        "otherAdditionalConditions": {
          "validation": "ID_ALPHANUMERIC"
        },
        "documentCharges": {
          "validation": "ID_ALPHANUMERIC"
        }
      };
      } else if(object == "DigitalArrangements"){
       objectMetadata = {"accountName":{"validation":"ACCOUNT_NAME","format":"ACCOUNT_NAME","formatting_dependency":"accountID"}};
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
     * @api : minFillValidation
     * minimum field level validation to enable continue button.
     * @return : NA
     */
  BusinessController.prototype.minFillValidation = function(dataJSON) {
    var scope = this;
    var enableButton = "";
    var object = Object.keys(this.minimumDataFillConfig)[0];
    var tempJSON = {};
    for(var key in dataJSON) {
      if(dataJSON[key])
        tempJSON[key] = dataJSON[key];
      else
        tempJSON[key] = "";
    }
    var mindataValidator = this.dataValidationHandler.validateMinFill(tempJSON, object, scope.minimumDataFillConfig);
    if((Object.keys(mindataValidator).length === 0 && mindataValidator.constructor === Object))
      enableButton = true;
    else
      enableButton = false;
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: enableButton,
      key : "enableButton"
    });
  };
    /**
     * @api : resetButtonStatus
     * method to update enable button value
     * @return : NA
     */
  BusinessController.prototype.resetButtonStatus = function(buttonStatus) {   
      var enableButton = buttonStatus;
      this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: enableButton,
      key : "enableButton"
    });
  };
   
  /**
	* @api : performDataValidation
	* performs data validation
	* @return : whether validation is success or not
	*/
  BusinessController.prototype.performDataValidation = function(dataValadationObj) {
    let regexInputConatinsOnlySpecialChars = /^[^a-zA-Z0-9]+$/;
    let inputData = dataValadationObj.inputData;
    let mappedParameter = dataValadationObj.mappedValueForWidget;
    let widgetName = dataValadationObj.widgetName;
    let dataMapping = dataValadationObj.dataMapping;
    let allowSpacesAndSpecialChar = dataValadationObj.allowSpacesAndSpecialChar;
    let containsOnlySpecialChars = regexInputConatinsOnlySpecialChars.test(inputData);
    var validationSuccess = "";
    var inputDataJSON = {};
    var resultJSON = {};
    var validateJSON = {"dataValidation" : {}};
    var object = Object.keys(validateJSON)[0];
    let dataValidator = {};
    validateJSON.dataValidation[widgetName] = this.getValidationType(mappedParameter);
    inputDataJSON[widgetName] = inputData;
    if (!allowSpacesAndSpecialChar || kony.sdk.isNullOrUndefined(allowSpacesAndSpecialChar) || containsOnlySpecialChars) {
      dataValidator = this.dataValidationHandler.validateData(inputDataJSON, object, validateJSON);
    }
    if(Object.keys(dataValidator).length === 0 && dataValidator.constructor === Object) {
      validationSuccess = "";
      var text = Object.values(inputDataJSON)[0];
      resultJSON["dvfError"] = validationSuccess;
      resultJSON["widgetId"] = widgetName;
      this.storeInCollection(text, widgetName, dataMapping);
    }
    else {
      validationSuccess = dataValidator;
      resultJSON["widgetId"] = widgetName;
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
    var LCdataJSON = this.store.getState();
    var formatType = "", formattedData;
    var collectionObj = this.store.getState();
    var fieldName = this.getKeyFromMapping(widgetName, dataMapping);
    var objectName = this.getObjectName(widgetName, dataMapping);
    if(!kony.sdk.isNullOrUndefined(collectionObj.Collection[objectName])) {
      LCdataJSON = collectionObj.Collection[objectName];
    }
    LCdataJSON[fieldName] = text;    
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: LCdataJSON,
      key : objectName
    });
  };
  /**
     * @api : updateCollectionObject
     * Method to update all parameter in ther particular object.
     * @return : NA
     */
  BusinessController.prototype.updateCollectionObject = function(dataToBeUpdate, objectName, dataMapping) {
    var scope = this;
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: dataToBeUpdate,
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
	* @api : storeDataFetchedFromExistingRecord
	* stores data fetched from the existing record
	* @return : NA
	*/
  BusinessController.prototype.storeDataFetchedFromExistingRecord = function(data) {
//    this.dataJSON = this.collectionObj.Collection["Imports"];    
    var scope = this;
    this.collectionObj = this.store.getState();
    data = this.formatDateField(data);
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: data["LetterOfCredit"],
      key : "LetterOfCredit"
    });
    if(!scope.collectionObj.Collection["DigitalArrangements"]){
    this.getMetaDataFromModel("Holdings", "DigitalArrangements");
    if(data["DigitalArrangements"] && data["DigitalArrangements"].length >0)
    data["DigitalArrangements"] = this.getFormattedData("DigitalArrangements", data["DigitalArrangements"]);
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: data["DigitalArrangements"],
      key : "DigitalArrangements"
    });
    }
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
	* @api : formatDateField
	* Method to format the date field
	* @return : data with formatted date value
	*/
  BusinessController.prototype.formatDateField = function(data) {
    var scope = this;
    if(!scope.objectMetadata["LetterOfCredit"])
       scope.getMetaDataFromModel("TradeFinanceObjects", "LetterOfCredit");
       var objectMetadata = this.objectMetadata["LetterOfCredit"];
     if(data && data.LetterOfCredit){
       data.LetterOfCredit.issueDate = data.LetterOfCredit.issueDate ? scope.formatUtils.formatData(scope.getFormatType("issueDate"),data.LetterOfCredit.issueDate) : "";
       data.LetterOfCredit.expiryDate = data.LetterOfCredit.expiryDate ? scope.formatUtils.formatData(scope.getFormatType("expiryDate"),data.LetterOfCredit.expiryDate) : "";
       data.LetterOfCredit.latestShippingDate = data.LetterOfCredit.latestShippingDate ? scope.formatUtils.formatData(scope.getFormatType("latestShippingDate"),data.LetterOfCredit.latestShippingDate) : "";
     }   
      return data;
  },
  /**
	* @api : getFormatType
	* fetches the format type from meta data
	* @return : format type
	*/
  BusinessController.prototype.getFormatType = function(fieldType) {
    for(key in this.objectMetadata) {
      if(!kony.sdk.isNullOrUndefined(this.objectMetadata.LetterOfCredit[fieldType]))
        return this.objectMetadata.LetterOfCredit[fieldType].format;
    }
  };

  /**
	* @api : getValidationType
	* fetches the validation type from meta data
	* @return : validation type
	*/
  BusinessController.prototype.getValidationType = function(fieldType) {
    for(key in this.objectMetadata) {
      if(!kony.sdk.isNullOrUndefined(this.objectMetadata.LetterOfCredit[fieldType]))
        return this.objectMetadata.LetterOfCredit[fieldType].validation;
      else
        return "";
    }
  };
  /**
	* @api : getValueFromString
	* Get the value from given input string 
	* @return : format type
	*/
  BusinessController.prototype.getValueFromString = function(fieldValue){
    var collectionObj = this.store.getState();
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
  },   
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
          if (metaData.format != undefined) {
            var dependentData;
            if (metaData.formatting_dependency) {
              dependentData = record[metaData.formatting_dependency]
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
	* @api : invokeCreateLetterOfCreditsService
	* fetches the  data from the object model to create a LC
	* @return : NA
	*/ 
  BusinessController.prototype.invokeCreateLetterOfCreditsService = function() {
    var scope = this;
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.CreateLC.Object, this.getCriteria(this.serviceParameters.CreateLC.Criteria), this.serviceParameters.CreateLC.Verb)
      .then(this.onCreateLCSuccess.bind(this, this.serviceParameters.CreateLC.Object))
      .catch(scope.setError.bind(this, "invokeCustomVerbforCreateLC",this.serviceParameters.CreateLC.Object));
  };
  /**
	* @api : invokeLookUpService
	* fetches the  data for Lookup
	* @return : NA
	*/ 
  BusinessController.prototype.invokeLookUpService = function() {
    var scope = this;
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    var criteria = this.getCriteria(this.serviceParameters.LookUp.Criteria);
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.LookUp.Object, criteria, this.serviceParameters.LookUp.Verb).then(response => {
      scope.onInvokeLookUpSuccess(this.serviceParameters.LookUp.Object,response);
    }).catch(scope.setError.bind(this, "LookUpService",this.serviceParameters.LookUp.Objectt));
  };
  /**
	* @api : invokeDeleteLetterOfCreditsService
	* Method to delete a LC
	* @return : NA
	*/ 
  BusinessController.prototype.invokeDeleteLetterOfCreditsService = function() {
    var scope = this;
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.CreateLC.Object, this.getCriteria(this.serviceParameters.CreateLC.Criteria), this.serviceParameters.CreateLC.deleteVerb)
      .then(this.onCreateLCSuccess.bind(this, this.serviceParameters.CreateLC.Object))
      .catch(scope.setError.bind(this, "invokeCustomVerbforDeleteLC",this.serviceParameters.CreateLC.Object));
  };
  /**
	* @api : onCreateLCSuccess
	* IMethod will update the store with success or error code
	* @return : NA
	*/
  BusinessController.prototype.onCreateLCSuccess = function(object, data) {
    var LCdataJSON = this.store.getState();
    kony.application.dismissLoadingScreen();
    var collectionObj = this.store.getState();
    var createLCResponse = {};   
    if(!kony.sdk.isNullOrUndefined(collectionObj.Collection[object])) {
      LCdataJSON = collectionObj.Collection[object];
    }
    data.transactReference && (LCdataJSON['transactReference'] = data.transactReference);
    if(data.hasOwnProperty("srmsReqOrderID")) {
      LCdataJSON["srmsReqOrderID"] = data.srmsReqOrderID;
      LCdataJSON["srmsReqSuccess"] = true;
      LCdataJSON["errcode"] = "";
      LCdataJSON["errmsg"] = "";  
    }
    else if(data.hasOwnProperty("errcode")) {
      LCdataJSON["srmsReqSuccess"] = false;
      LCdataJSON["errcode"] = data.errocode;
      LCdataJSON["errmsg"] = data.errmsg;
    }else if(data.hasOwnProperty("dbpErrCode")) {
      LCdataJSON["srmsReqSuccess"] = false;
      LCdataJSON["errcode"] = data.dbpErrCode;
      LCdataJSON["errmsg"] = data.dbpErrMsg;
    }
    this.store.dispatch({
      type : "UPDATE_COLLECTION",
      data : LCdataJSON,
      key : object
    });
  };
  /**
	* @api : onInvokeLookUpSuccess
	* Method will update the store with success or error code
	* @return : NA
	*/
  BusinessController.prototype.onInvokeLookUpSuccess = function(object, data){   
    kony.application.dismissLoadingScreen();
    this.store.dispatch({
      type : "UPDATE_COLLECTION",
      data : data,
      key : "LookUp"
    });
  },
    /**
     * @api : getCriteria
     * Parse the criteria based and set context values.
     * @param : criteria {JSON} - value collected from exposed contract
     * @return : {JSONObject} - jsonvalue for criteria
     */
  BusinessController.prototype.getCriteria = function(criteriaJSON) {
    var collectionObj = this.store.getState();
    var criteria = JSON.parse(JSON.stringify(criteriaJSON));
    for(var key in criteria) {
      var value = criteria[key];
      if(typeof value === "string") {
        if(value.indexOf("$") !== -1) {
          var token = value.substring(value.indexOf("{") + 1,value.indexOf("}"));
          var objectName = token.split(".")[1];
          token = token.split(".")[2];
          criteria[key] = collectionObj.Collection[objectName][token];
        }
      }
    }
    return criteria;
  };
  /**
	* @api : setError
	* triggered as a error call back for any service
	* @return : NA
	*/
  BusinessController.prototype.setError = function(key,object,errorMsg) {
    var LCdataJSON = this.store.getState();
    kony.application.dismissLoadingScreen();
    var collectionObj = this.store.getState();    
    LCdataJSON = collectionObj.Collection[object] ? collectionObj.Collection[object] : {} ;
    LCdataJSON["srmsReqSuccess"] = false;
    LCdataJSON["errorObjFail"] = errorMsg;
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: LCdataJSON,
      key : object
    });
  };

  return BusinessController;
});