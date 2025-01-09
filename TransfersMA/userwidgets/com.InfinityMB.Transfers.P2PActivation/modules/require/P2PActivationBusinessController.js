define(['DataFormattingUtils/FormatUtils', 'DataValidationFramework/DataValidationHandler', 'InvokeServiceUtils'], function(FormatUtils, DataValidationHandler, InvokeServiceUtils) {
 
  function BusinessController() {
    this.context = {};
    this.serviceParameters = {};
    this.store = {};
    this.objectMetadata = {};
    this.formatUtils = new FormatUtils();
    this.dataValidationHandler = new DataValidationHandler();
    this.invokeServiceUtils = new InvokeServiceUtils();
    this.error = [];
    this.dataJSON = {};
    this.minimumDataFillConfig = {
      "dataJSON": {
        "nationalID": "3"
      }
    };
    this.maxFillMapping = {
      "dataJSON": {
        "nationalID": "8"
      }
    };
  }

   /**
	* @api : setProperties
	* sets initial properties
	* @return : NA
	*/
  BusinessController.prototype.setProperties = function(serviceParameters, dataFormatJSON) {
    this.resetCollection();
    this.serviceParameters = serviceParameters;
    this.formatUtils.updateFormatJSON(dataFormatJSON);
  };

  BusinessController.prototype.resetCollection = function() {
    var collectionObj = this.store.getState();
    collectionObj["Cache"] = {},
    collectionObj["Collection"] = {};
  };
  
  /**
	* @api : getMetaDataForAllObjects
	* get meta data  from the model for all the objects
	* @return : NA
	*/  
  BusinessController.prototype.getMetaDataForAllObjects = function() {
    this.getMetaDataFromModel(this.serviceParameters.ActivateP2P.Service, this.serviceParameters.ActivateP2P.Object);
    this.getMetaDataFromModel(this.serviceParameters.getDepositAccounts.Service, this.serviceParameters.getDepositAccounts.Object);
  };

  /**
	* @api : getMetaDataFromModel
	* get meta data  from the model
	* @return : NA
	*/  
  BusinessController.prototype.getMetaDataFromModel = function(service, object) {
    var scope = this;
    function getMetaDataSuccess(res) {
      scope.resetServiceResponse("getMetaDataFromModel");
      var objectMetadata = kony.mvc.util.ProcessorUtils.convertObjectMetadataToFieldMetadataMap(res);
      if(object === "User") {
        objectMetadata =  {"nationalID":{"validation":"ID_ALPHANUMERIC"}, "transferLimit":{"format":"AMOUNT", "formatting_dependency":"currency"}};
      } else if(object === "Accounts") {
         objectMetadata = {"accountName": {"format":"ACCOUNT_NAME","formatting_dependency":"accountID"} };
      }
      scope.objectMetadata[object] = objectMetadata;
      scope.objectMetadata["User"] =  {"nationalID":{"validation":"ID_ALPHANUMERIC"}, "transferLimit":{"format":"AMOUNT", "formatting_dependency":"currency"}};
      scope.objectMetadata["ArrangementPreferences_1"] =  {"nationalID":{"validation":"ID_ALPHANUMERIC"}, "transferLimit":{"format":"AMOUNT", "formatting_dependency":"currency"}};
      scope.objectMetadata["DigitalArrangements"] = {"accountName": {"format":"ACCOUNT_NAME","formatting_dependency":"accountID"} };
    }
    function getMetaDataFailure(err) {
      scope.setError("getMetaDataFromModel", err);
    }
    var options = {"getFromServer" : true};
    kony.mvc.util.ProcessorUtils.getMetadataForObject(service, object, options, getMetaDataSuccess, getMetaDataFailure);
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
          if(!fieldValue.indexOf("${Collection")) {
            var group = fieldValue.split(".")[1];
            var fieldType = fieldValue.split(".")[2].replace("}", "");
            if(!kony.sdk.isNullOrUndefined(collectionObj.Collection[group])) {
              if(!kony.sdk.isNullOrUndefined(collectionObj.Collection[group][fieldType]))
                return collectionObj.Collection[group][fieldType];
            } }
          else if(!fieldValue.indexOf("${i18n")) {
            return kony.i18n.getLocalizedString(fieldValue.substring(fieldValue.indexOf("${i18n{")+7, fieldValue.length-2));
          }
          else if(!fieldValue.indexOf("${CNTX")){
            return collectionObj.context[fieldValue.substring(7, fieldValue.length).replace("}", "")];
          }
        } }
    }
    return "";
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
        } 
      } 
    }
  };

     /**
     * @api : resetServiceResponse
     * clears the service response in collection
     * @return : NA
     */
  BusinessController.prototype.resetServiceResponse = function(objectName) {
    var collectionObj = this.store.getState();
    if(!kony.sdk.isNullOrUndefined(collectionObj.Collection[objectName])) {
      delete(collectionObj.Collection[objectName]);
    }
  };

     /**
     * Component minFillValidate
     * Validation for minimum length
     */
  BusinessController.prototype.minFillValidate = function(dataJson) {
    var scope = this;
    scope.resetServiceResponse("dvfError");
    var object = Object.keys(scope.minimumDataFillConfig)[0]; 
    var enableButton = "";
    var tempJson = {};
    for(var key in dataJson) {
      if(dataJson[key]){
        tempJson[key] = dataJson[key];
      }
      else {
        tempJson[key] = "";
      }
    }
    var dataValidator = scope.dataValidationHandler.validateMinFill(tempJson,object,scope.minimumDataFillConfig);       
    if((Object.keys(dataValidator).length === 0 && dataValidator.constructor === Object))
      enableButton = true;
    else
      enableButton = false;
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: enableButton,
      key :"minenableButton"
    });   
  },
    
    /**
     * Component maxFillValidate
     * Validation for minimum length
     */
    BusinessController.prototype.maxFillValidate = function(dataJson) {
    var scope = this;
    var object = Object.keys(scope.maxFillMapping)[0];    
    var enableButton = "";
    var tempJson = {};
    for(var key in dataJson) {
      if(dataJson[key]) {
        tempJson[key] = dataJson[key];
      }
      else{
        tempJson[key] = "";
      }
    }
    var dataValidator = scope.dataValidationHandler.validateMaxFill(tempJson,object,scope.maxFillMapping);       
    if((Object.keys(dataValidator).length === 0 && dataValidator.constructor === Object))
      enableButton = true;
    else
      enableButton = false;
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: enableButton,
      key :"maxenableButton"
    });     
  },

    /**
     * Component performDataValidation
     * Validation forinput mode
     */
    BusinessController.prototype.performDataValidation = function(inputData, mappedParameter, widgetName, dataMapping) {
    var validationSuccess = "";
    var inputDataJSON = {};
    var validateJSON = {"dataValidation" : {}};
    var object = Object.keys(validateJSON)[0];
    validateJSON.dataValidation[mappedParameter] = this.getValidationType(mappedParameter);
    inputDataJSON[mappedParameter] = inputData;
    var dataValidator = this.dataValidationHandler.validateData(inputDataJSON, object, validateJSON);
    if(Object.keys(dataValidator).length === 0 && dataValidator.constructor === Object) {
      validationSuccess = "";
      var text = Object.values(inputDataJSON)[0];
      this.updateDataInCollection(text, widgetName, dataMapping);
    }
    else {
      validationSuccess = dataValidator;
    }
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: validationSuccess,
      key : "dvfError"
    });
  },

  /**
  * @api : activateP2PSuccessCallback
  * Store the service response in Master object under collection and reset error mapping field.
  * @return : NA
  */
  BusinessController.prototype.resetServiceErrorKey = function() {
    var scope = this;
    this.resetServiceResponse("invokeCustomVerbforActivateP2P");
    this.resetServiceResponse("invokeCustomVerbToUpdateAccounts");
    this.resetServiceResponse("invokeCustomVerbForNationalID");
    this.resetServiceResponse("invokeCustomVerbToValidateTransferLimit");
  };
  
  /**
  * @api : setDataInCollection
  * Store the service response in Master object under collection and invoke formatting data
  * @return : NA
  */
  BusinessController.prototype.setDataInCollection = function(object, data) {
    var scope = this;
    scope.resetServiceErrorKey();
    var collectionObj = this.store.getState();
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: data,
      key : object
    });
    kony.application.dismissLoadingScreen();
  };

  /**
	* @api : ListFromAccounts
	* Stores all the Accounts
	* @return : NA
	*/
  BusinessController.prototype.setAccountsInCollection = function(object, errorMappingKey, data) {
    this.resetServiceResponse(errorMappingKey);
    var formattedData = this.getFormattedDataofResponse(object, data);
    this.store.dispatch({
      type: "UPDATE_CACHE_COLLECTION",
      cacheData: data,
      CollectionData: formattedData,
      key : object
    });
    kony.application.dismissLoadingScreen();
  };

    /**
	* @api : getFormattedData
	* returns the formatted data
	* @return : NA
	*/
  BusinessController.prototype.getFormattedDataofResponse = function(object, data) {
    var scope = this;
    var objectMetadata = this.objectMetadata[object];
    var formattedData = JSON.parse(JSON.stringify(data));
    formattedData = data.Accounts;
    formattedData.map(function(record) {
      var keys = Object.keys(record);
      keys.forEach((key) => {
        if(objectMetadata.hasOwnProperty(key)){
          var metaData = objectMetadata[key];
          if(metaData.format !== undefined){
            var dependentData;
            if(metaData.formatting_dependency){
              dependentData = record[metaData.formatting_dependency];
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
     * @api : updateDataInCollection
     * stores the input data in collection
     * @return : NA
     */
  BusinessController.prototype.updateDataInCollection = function(text, widgetName, dataMapping) {
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
	* @api : getValidationType
	* fetches the validation type from meta data
	* @return : validation type
	*/
  BusinessController.prototype.getValidationType = function(fieldType) {
    for(key in this.objectMetadata) {
      if(!kony.sdk.isNullOrUndefined(this.objectMetadata.User[fieldType]) && !kony.sdk.isNullOrUndefined(this.objectMetadata.User[fieldType]).validation)
        return this.objectMetadata.User[fieldType].validation;
      else
        return "";
    }
  };

  /**
	* @api : invokeCustomVerbforDepositAccount
	* fetches the  data from the object model for deposit Accounts.
	* @return : NA
	*/ 
  BusinessController.prototype.invokeCustomVerbforDepositAccount = function() {
    var scope = this;
    kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.getDepositAccounts.Object, this.serviceParameters.getDepositAccounts.Criteria, this.serviceParameters.getDepositAccounts.Verb)
      .then(this.setAccountsInCollection.bind(this, this.serviceParameters.getDepositAccounts.Object,"invokeCustomVerbforDepositAccount"))
      .catch(scope.setError.bind(this, "invokeCustomVerbforDepositAccount"));
  };

  /**
	* @api : invokeCustomVerbForNationalID
	* service to validate National ID.
	* @return : NA
	*/ 
  BusinessController.prototype.invokeCustomVerbForNationalID = function() {
    var scope = this;
    scope.resetServiceErrorKey("dvfError");
    kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.validateNationalID.Object, this.getCriteria(this.serviceParameters.validateNationalID.Criteria), this.serviceParameters.validateNationalID.Verb)
      .then(this.setDataInCollection.bind(this, this.serviceParameters.validateNationalID.Object))
      .catch(scope.setError.bind(this, "invokeCustomVerbForNationalID"));
  };

   /**
	* @api : invokeCustomVerbToValidateTransferLimit
	* service to validate transfer limit.
	* @return : NA
	*/ 
  BusinessController.prototype.invokeCustomVerbToValidateTransferLimit = function() {
    var scope = this;
    kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.validateTransferLimit.Object, this.getCriteria(this.serviceParameters.validateTransferLimit.Criteria), this.serviceParameters.validateTransferLimit.Verb)
      .then(this.setDataInCollection.bind(this, this.serviceParameters.validateTransferLimit.Object))
      .catch(scope.setError.bind(this, "invokeCustomVerbToValidateTransferLimit"));
  };

    /**
	* @api : invokeCustomVerbforActivateP2P
	* service to activate P2P flow.
	* @return : NA
	*/ 
  BusinessController.prototype.invokeCustomVerbforActivateP2P = function() {
     var scope = this;
    kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.ActivateP2P.Object, this.serviceParameters.ActivateP2P.Criteria, this.serviceParameters.ActivateP2P.Verb)
      .then(this.invokeCustomVerbToUpdateAccounts.bind(this))
      .catch(scope.setError.bind(this, "invokeCustomVerbforActivateP2P"));
  };

    /**
	* @api : invokeCustomVerbToUpdateAccounts
	* service to update selected preferred accounts
	* @return : NA
	*/ 
  BusinessController.prototype.invokeCustomVerbToUpdateAccounts = function() {
     var scope = this;
    kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.updateP2PDepositAccount.Object, this.getCriteria(this.serviceParameters.updateP2PDepositAccount.Criteria), this.serviceParameters.updateP2PDepositAccount.Verb)
      .then(this.setDataInCollection.bind(this, "ServiceAcknowledgement"))
      .catch(scope.setError.bind(this, "invokeCustomVerbToUpdateAccounts"));
  };

  /**
	* @api : invokeCustomVerbforDeactivateP2P
	* service to deactivate P2P flow.
	* @return : NA
	*/ 
  BusinessController.prototype.invokeCustomVerbforDeactivateP2P = function() {
    var scope = this;
    kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, null);
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.DeactivateP2P.Object, this.serviceParameters.DeactivateP2P.Criteria, this.serviceParameters.DeactivateP2P.Verb)
      .then(this.setDataInCollection.bind(this, "deactivateP2PAcknowledgement"))
      .catch(scope.setError.bind(this, "invokeCustomVerbforDeactivateP2P"));
  };

  /**
     * @api : getCriteria
     * Parse the criteria based and set context values.
     * @param : criteria {JSON} - value collected from exposed contract
     * @return : {JSONObject} - jsonvalue for criteria
     */
  BusinessController.prototype.getCriteria = function(criteriaJSON) {
    var collectionObj = this.store.getState();
    var criteria = JSON.parse(JSON.stringify(criteriaJSON));
    for(key in criteria) {
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
	* @api : getFormattedData
	* returns the formatted data
	* @return : NA
	*/
  BusinessController.prototype.getFormattedData = function(object, data, key) {
    var scope = this;
    var objectMetadata = this.objectMetadata[object];
    var metaData = objectMetadata[key];
    var dependentMappingData = "";
    var collectionObj = this.store.getState();
    if(metaData.format !== undefined) {
      if(!kony.sdk.isNullOrUndefined(metaData.formatting_dependency)) {
         dependentMappingData = collectionObj.Collection[object][metaData.formatting_dependency];
      }
    return scope.formatUtils.formatData(metaData.format, data,dependentMappingData); 
    }
  };

  /**
	* @api : setError
	* triggered as a error call back for any service
	* @return : NA
	*/
  BusinessController.prototype.setError = function(key, errorMsg) {
    var errorObj = {
      "level" : "BusinessController",
      "method" : key,
      "error": errorMsg["errmsg"]
    };
    this.error.push(errorObj);
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: errorObj,
      key : key
    });
  };
  

  return BusinessController;
});