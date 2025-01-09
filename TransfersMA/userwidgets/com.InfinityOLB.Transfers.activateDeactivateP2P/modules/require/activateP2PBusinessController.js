define(['DataFormattingUtils/FormatUtils', 'DataValidationFramework/DataValidationHandler', 'InvokeServiceUtils'], function(FormatUtils, DataValidationHandler, InvokeServiceUtils) {

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
    this.dataJSON = {};
    this.setKey="";
    this.minimumDataFillConfig = {
      "dataJSON": {
        "tbxNationalID": "3",        
      }
    };
  }

  /**
	* @api : setProperties
	* sets initial properties
	* @return : NA
	*/
  BusinessController.prototype.setProperties = function(serviceParameters, dataFormatJSON,breakpoints) {
    this.resetCollection();
    this.serviceParameters = serviceParameters;
    this.breakpoints = breakpoints;
    this.formatUtils.updateFormatJSON(dataFormatJSON);
  };

   BusinessController.prototype.resetCollection = function() {
    var collectionObj = this.store.getState();
    collectionObj["Cache"] = {},
    collectionObj["Collection"] = {};
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
          if(!kony.sdk.isNullOrUndefined(inputJSON[key])) {
            return inputJSON[key];
          } }
      } }
    if(inputJSON.hasOwnProperty("default")) {
      return inputJSON["default"];
    }
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
      var objectMetadata = kony.mvc.util.ProcessorUtils.convertObjectMetadataToFieldMetadataMap(res);
      if(object === "User") {
        objectMetadata =  {"tbxNationalID":{"validation":"ID_ALPHANUMERIC"},"tbxAmount1":{"format":"AMOUNT"}};
      }
      else if(object === "ArrangementPreferences_1") {
        objectMetadata =  {"tbxNationalID":{"validation":"ID_ALPHANUMERIC"},"tbxAmount1":{"format":"AMOUNT"}};
      }
      else if(object==="DigitalArrangements")
      {
        scope.objectMetadata["ArrangementPreferences_1"] =  {"tbxNationalID":{"validation":"ID_ALPHANUMERIC"},"tbxAmount1":{"format":"AMOUNT"}};

        objectMetadata={"accountName": {"format":"ACCOUNT_NAME","formatting_dependency":"accountID"},
                        "fromAccountNumber":{"validation":"ACCOUNT_NUMBER"},
                        "transactionCurrency":{"format":"CURRENCY"},
                        "transferLimit":{"format":"AMOUNT", "formatting_dependency":"currency"},
                        "currencyCode":{"format":"CURRENCY"}};
      }
      scope.objectMetadata[object] = objectMetadata;
      scope.invokeCustomVerbforGetAccounts();
    }
    function getMetaDataFailure(err) {
      scope.setError(err, "getMetaDataFromModel");
    }
    var options = {"getFromServer" : true};
    kony.mvc.util.ProcessorUtils.getMetadataForObject(service, object, options, getMetaDataSuccess, getMetaDataFailure);
  }; 

  /**
	* @api : invokeCustomVerbforGetAccounts
	* fetches the accounts
	* @return : NA
	*/ 
  BusinessController.prototype.invokeCustomVerbforGetAccounts = function() {
    var scope = this;
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.getDepositAccounts.Object, this.serviceParameters.getDepositAccounts.Criteria, this.serviceParameters.getDepositAccounts.Verb)
      .then(this.setFromAccountsDataInCollection.bind(this, this.serviceParameters.getDepositAccounts.Object))
      .catch(scope.setError.bind(this, "invokeCustomVerbforGetAccounts"));
  };

  /**
	* @api : invokeCustomVerbforNationalID
	* fetches the data
	* @return : NA
	*/ 
  BusinessController.prototype.invokeCustomVerbforNationalID = function() {
    var scope = this;
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.validateNationalID.Object,this.getCriteria(this.serviceParameters.validateNationalID.Criteria), this.serviceParameters.validateNationalID.Verb)
      .then(this.setNationalIDDataInCollection.bind(this, this.serviceParameters.validateNationalID.Object))
      .catch(scope.setError.bind(this, "invokeCustomVerbforNationalID"));
  }; 

  /**
	* @api : invokeCustomVerbforNationalID
	* fetches the data
	* @return : NA
	*/ 
  BusinessController.prototype.invokeCustomVerbforTransferLimit1 = function() {
    var scope = this;
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.validateTransferLimit.Object,this.getCriteria(this.serviceParameters.validateTransferLimit.Criteria), this.serviceParameters.validateTransferLimit.Verb)
      .then(this.setTransferLimitDataInCollection.bind(this, this.serviceParameters.validateTransferLimit.Object))
      .catch(scope.setError.bind(this, "invokeCustomVerbforTransferLimit1"));
  }; 

  /**
	* @api : invokeCustomVerbforActivateP2PForUser
	* fetches the activate service
	* @return : NA
	*/ 
  BusinessController.prototype.invokeCustomVerbforActivateP2PForUser = function() {
    var scope = this;
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.ActivateP2P.Object, this.serviceParameters.ActivateP2P.Criteria, this.serviceParameters.ActivateP2P.Verb)
      .then(this.setActivateP2PForUserInCollection.bind(this, this.serviceParameters.ActivateP2P.Object))
      .catch(scope.setError.bind(this, "invokeCustomVerbforActivateP2PForUser"));
  };

  /**
	* @api : invokeCustomVerbforUpdatePreferredP2PAccounts
	* fetches the activate service
	* @return : NA
	*/ 
  BusinessController.prototype.invokeCustomVerbforUpdatePreferredP2PAccounts = function() {
    var scope = this;
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    var collectionObj = this.store.getState();
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.updateP2PDepositAccount.Object, this.getCriteria(this.serviceParameters.updateP2PDepositAccount.Criteria), this.serviceParameters.updateP2PDepositAccount.Verb)
      .then(this.setUpdatePreferredP2PInCollection.bind(this, this.serviceParameters.updateP2PDepositAccount.Object))
      .catch(scope.setError.bind(this, "UpdatePreferredP2PAccounts"));
  };  

  /**
	* @api : invokeCustomVerbforActivateP2PForUser
	* fetches the activate service
	* @return : NA
	*/ 
  BusinessController.prototype.invokeCustomVerbforDeactivateP2PForUser = function() {
    var scope=this;
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.ActivateP2P.Object, this.serviceParameters.ActivateP2P.Criteria, this.serviceParameters.ActivateP2P.Verb)
      .then(this.setDeactivateP2PForUserInCollection.bind(this, this.serviceParameters.ActivateP2P.Object))
      .catch(scope.setError.bind(this, "invokeCustomVerbforDeactivateP2PForUser"));

  };

  /**
	* @api : setUserDataInCollection
	* formats and stores the retrieved  data in collection
	* @return : NA
	*/
  BusinessController.prototype.setInitialContextInCollection = function(userdata,currency) {
    var collectionObj = this.store.getState();
    userdata.currency=currency;
    kony.application.dismissLoadingScreen();
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: userdata,
      key : "ActivateP2P"
    });

  };

  /**
	* @api : setUserContextInCollection
	* formats and stores the retrieved  user data in collection
	* @return : NA
	*/
  BusinessController.prototype.setUserContextInCollection = function(contextJSON) {
    var collectionObj = this.store.getState();
    kony.application.dismissLoadingScreen();  
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: contextJSON,
      key : "P2PContextJSON"
    });
  };

  /**
	* @api : setFromAccountsDataInCollection
	* set from data in collection
	* @return : NA
	*/  
  BusinessController.prototype.setFromAccountsDataInCollection = function(object, data) {
    var scope=this;
    var slaveData;
    if(!scope.objectMetadata[object])
    {
      this.getMetaDataFromModel(this.serviceParameters.getDepositAccounts.Service, object);    
    }
    slaveData = this.getFormattedData(object, data);  
    kony.application.dismissLoadingScreen();
    this.store.dispatch({
      type: "UPDATE_CACHE_COLLECTION",
      masterData:slaveData ,
      slaveData: data,
      key : object
    });
  };

  /**
	* @api : setNationalIDDataInCollection
	* set nationalID data in collection
	* @return : NA
	*/  
  BusinessController.prototype.setNationalIDDataInCollection = function(object, data) {
    var scope=this;
    kony.application.dismissLoadingScreen();
    data={};
    data["tbxNationalID"]="";
    this.store.dispatch({
      type : "UPDATE_COLLECTION",
      data : data,
      key : "NationalID"
    });
  };

  /**
	* @api : setNationalIDDataInCollection
	* set nationalID data in collection
	* @return : NA
	*/  
  BusinessController.prototype.setTransferLimitDataInCollection = function(object, data) {
    var scope=this;
    kony.application.dismissLoadingScreen();
    data={};
     data["tbxAmount1"]="";
    this.store.dispatch({
      type : "UPDATE_COLLECTION",
      data : data,
      key : "TransferLimit"
    });
  };


  /**
	* @api : setUpdatePreferredP2PInCollection
	* update data of activate service
	* @return : NA
	*/ 
  BusinessController.prototype.setUpdatePreferredP2PInCollection = function(object,data) {  
     kony.application.dismissLoadingScreen();
    var scope=this;
    if(!kony.sdk.isNullOrUndefined(data["result"]))
      {
        data=data["result"]; 
      }
    else{
      data=data["errmsg"];
    }   
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: data,
      key : "UpdatePreferredP2PAccounts"
    });
  };

  /**
	* @api : setActivateP2PForUserInCollection
	* call of activate service
	* @return : NA
	*/ 
  BusinessController.prototype.setActivateP2PForUserInCollection = function(object,data) {
    var scope=this;
    this.invokeCustomVerbforUpdatePreferredP2PAccounts();     
    kony.application.dismissLoadingScreen();     
  };

  /**
	* @api : setActivateP2PForUserInCollection
	* formats and stores the retrieved  user data in collection
	* @return : NA
	*/
  BusinessController.prototype.setDeactivateP2PForUserInCollection = function(object,data) {
     kony.application.dismissLoadingScreen();
    var collectionObj = this.store.getState();
    if(!kony.sdk.isNullOrUndefined(data["result"]))
      {
        data=data["result"]; 
      }
    else{
      data=data["errmsg"];
    }  
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: data,
      key : "DeactivateP2P"
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
     * @api : updateP2PContextCollection
     * updates the P2PContext to the collection
     * @return : NA
     */
  BusinessController.prototype.updateP2PDetailsCollection =function(data,key){
    this.collectionObj = this.store.getState();
    if(this.collectionObj.Collection.P2PContextJSON)
      var dataJSON= this.collectionObj.Collection.P2PContextJSON
      dataJSON[key]= data;
    this.store.dispatch({        
      type: "UPDATE_COLLECTION",
      data: dataJSON,
      key : "P2PContextJSON"
    });
  };

  /**
	* @api : updateDepositAccountDetails
	* set selected data of from accounts
	* @return : NA
	*/
  BusinessController.prototype.updateDepositAccountDetails = function(selectedDepositName,selectedDepositAccount) {
    var scope = this;
    this.collectionObj = this.store.getState();    
    var dataJSON = {}, selectedData = {}; 
    var records;
    var collectionObj = this.store.getState();
   
    if(!kony.sdk.isNullOrUndefined(collectionObj.Collection["DigitalArrangements"])) {
     
        dataJSON = collectionObj.Collection.DigitalArrangements;   
        dataJSON.formattedDeposiAccount=selectedDepositName; 
        dataJSON.selectedAccountNumber=selectedDepositAccount;
        this.updateP2PDetailsCollection(selectedDepositName, "formattedDeposiAccount");
        this.updateP2PDetailsCollection(selectedDepositAccount, "selectedAccountNumber");     
         
    }  
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: dataJSON,
      key : "DigitalArrangements"
    });
  };

  /**
	* @api : getFormattedData
	* get  getFormattedData 
	* @return : NA
	*/
  BusinessController.prototype.getFormattedData = function(object, data) {
    var scope = this;
    var objectMetadata = this.objectMetadata[object];
    var formattedData = JSON.parse(JSON.stringify(data));
    formattedData = data.Accounts;
    formattedData.map(function(record){
      var keys = Object.keys(record);
      keys.forEach((key) => {
        if(objectMetadata.hasOwnProperty(key)){
          var metaData = objectMetadata[key];
          if(metaData.format !== undefined){
            var dependentData;
            if(metaData.formatting_dependency){
              dependentData = record[metaData.formatting_dependency];
            }
            var formattedValue = scope.formatUtils.formatData(metaData.format, record[key],dependentData); 
            record[key] = formattedValue;
          }
        }
      });
    });
    return formattedData;
  };

  /**
    * @api : getFormattedAmount
    * returns the formatted amount
    * @return : NA
    */
  BusinessController.prototype.getFormattedAmount = function(object,contextObject, data, key) {
    var scope = this;
    var objectMetadata = this.objectMetadata[object];
    var metaData = objectMetadata[key];
    var dependentMappingData = "";
    var collectionObj = this.store.getState();
    if(metaData.format !== undefined) {
      if(!kony.sdk.isNullOrUndefined(metaData.formatting_dependency)) {
        dependentMappingData = collectionObj.Collection[contextObject][metaData.formatting_dependency];
      }
      return scope.formatUtils.formatData(metaData.format, data,dependentMappingData);
    }
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
	* @api : performDataValidation
	* performs data validation
	* @return : whether validation is success or not
	*/
  BusinessController.prototype.performDataValidation = function(inputData, mappedParameter, widgetName, dataMapping) {
    var validationSuccess = "";
    var inputDataJSON = {};
    var validateJSON = {"dataValidation" : {}};
    var object = Object.keys(validateJSON)[0];
    validateJSON.dataValidation[widgetName] = this.getValidationType(mappedParameter);
    inputDataJSON[widgetName] = inputData;
    var dataValidator = this.dataValidationHandler.validateData(inputDataJSON, object, validateJSON);
    if(Object.keys(dataValidator).length === 0 && dataValidator.constructor === Object) {
      validationSuccess = "";
      var text = Object.values(inputDataJSON)[0];
      this.storeInCollection(text, widgetName, dataMapping);
    }
    else {
      validationSuccess = dataValidator;
    }
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: validationSuccess,
      key : "dvfError"
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
      if(!kony.sdk.isNullOrUndefined(this.objectMetadata[key][fieldType]))
        return this.objectMetadata[key][fieldType].format;
    }
  };

  /**
	* @api : getValidationType
	* fetches the validation type from meta data
	* @return : validation type
	*/
  BusinessController.prototype.getValidationType = function(fieldType) {
    for(key in this.objectMetadata) {
      if(!kony.sdk.isNullOrUndefined(this.objectMetadata[key][fieldType]))
        return this.objectMetadata[key][fieldType].validation;
      else
        return "";
    }
  };



  /**
     * @api : updateContactTypeDetails
     * updates the selected contact in segment to the collection
     * @return : NA
     */
  BusinessController.prototype.updateContactTypeDetails = function(data) {
    this.collectionObj = this.store.getState();    
    var dataJSON = {}, selectedData = {}; 
    var records;
    var collectionObj = this.store.getState();
    var keys=Object.keys(data);
    if(!kony.sdk.isNullOrUndefined(collectionObj.Collection["ActivateP2P"])) {
      if(keys[0]==="lblsegmentEmail")
      {
        dataJSON = collectionObj.Collection.ActivateP2P;   
        records = this.collectionObj.Collection.ActivateP2P.EmailIds;        
        this.setKey="Value";

      }    
      else if(keys[0]==="lblsegmentPhone")
      {
        dataJSON = collectionObj.Collection.ActivateP2P;   
        records = this.collectionObj.Collection.ActivateP2P.ContactNumbers;
        this.setKey= "phoneNumber";         
      }    
    }  
    for(var i = 0; i < records.length; i++) {
      if(records[i][this.setKey] ===   data[keys[0]]) {
        if(this.setKey==="Value")
        {
          dataJSON.EmailIds[i]["isPrimary"] = "true";      
          this.collectionObj.Collection.P2PContextJSON.selectedEmail=records[i][this.setKey];
        }
        else
        {
          dataJSON.ContactNumbers[i]["isPrimary"] = "true";         
          this.collectionObj.Collection.P2PContextJSON.selectedPhoneNumber=records[i][this.setKey];      
        }         
      }
      else
      {
        if(this.setKey==="Value")
        {
          dataJSON.EmailIds[i]["isPrimary"] = "false";      
        }
        else
        {
          dataJSON.ContactNumbers[i]["isPrimary"] = "false";         
        }           
      }
    }
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: dataJSON,
      key : "ActivateP2P"
    });
  };


  /**
     * @api : minFillValidation
     * minimum field level validation to enable continue button.
     * @return : NA
     */
  BusinessController.prototype.minFillValidation = function(dataJSON,dataMapping) {
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
    if((Object.keys(mindataValidator).length === 0 && mindataValidator.constructor === Object)){
      enableButton = "";
      var text = Object.values(mindataValidator)[0];   
    }
    else {
      enableButton = mindataValidator;
    }
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: enableButton,
      key : "enableButton"
    });
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
            }
            else{
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
     * @api : resetServiceResponse
     * clears the service response in collection
     * @return : NA
     */
  BusinessController.prototype.resetServiceResponse = function(objectName) {
    var collectionObj = this.store.getState();
    if(!kony.sdk.isNullOrUndefined(collectionObj.Collection[objectName])) {
      delete(collectionObj.Collection[objectName]);
    }
      if(!kony.sdk.isNullOrUndefined(collectionObj.Cache[objectName])) {
      delete(collectionObj.Cache[objectName]);
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
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: errorMsg,
      key : method
    });
  };

  return BusinessController;
});