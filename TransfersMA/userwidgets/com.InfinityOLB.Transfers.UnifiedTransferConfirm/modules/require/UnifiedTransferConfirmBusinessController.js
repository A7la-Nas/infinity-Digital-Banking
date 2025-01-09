define(['DataFormattingUtils/FormatUtils', 'DataValidationFramework/DataValidationHandler', 'InvokeServiceUtils'], function (FormatUtils, DataValidationHandler, InvokeServiceUtils) {

  function BusinessController() {
    this.store = {};
    this.objectMetadata = {};
    this.context = {};
    this.serviceParameters = {};
    this.dataMapping = {};
    this.breakpoints = {};
    this.formatUtils = new FormatUtils();
    this.dataValidationHandler = new DataValidationHandler();
    this.invokeServiceUtils = new InvokeServiceUtils();
    this.error = [];
  }
  /**
  * @api : setPropertiesFromComponent
  * set properties from component
  * @return : NA
  */
  BusinessController.prototype.setProperties = function (serviceParameters, dataFormatJSON, dataMapping, breakpoints) {
    this.serviceParameters = serviceParameters;
    this.dataMapping = dataMapping;
    this.breakpoints = breakpoints;
  };
 /**
  * @api : getDataBasedOnDataMapping
  * get data from datamapping
  * @return : NA
  */
  BusinessController.prototype.getDataBasedOnDataMapping = function (widget) {
    var collectionObj = this.store.getState();
    for (var record in this.dataMapping) {
      var keyValues = this.dataMapping[record];
      for (var key in keyValues) {
        if (widget === key) {
          var fieldValue = this.dataMapping[record][widget];
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
            }
          } else if (typeof fieldValue === "object") {
            var data = this.getDataSpecificToBreakpoint(fieldValue);
            return kony.i18n.getLocalizedString(data.substring(data.indexOf("${i18n{") + 7, data.length - 2));
          }
        }
      }
    }
    return "";
  };
    /**
    * @api : resetCollection
    * clears the data in collection
    * @return : NA
    */
  BusinessController.prototype.resetCollection = function (objectName) {
    var collectionObj = this.store.getState();
    if (objectName) {
      collectionObj["Collection"][objectName] = {};
    } else {
      collectionObj["Cache"] = {},
      collectionObj["Collection"] = {};
    }
  };
  /**
   * @api : getDataSpecificToBreakpoint
   * gets data specified to the corresponding breakpoint
   * @return : NA
   */
  BusinessController.prototype.getDataSpecificToBreakpoint = function (inputJSON) {
    var currentBreakpoint = kony.application.getCurrentBreakpoint();
    if (Object.keys(this.breakpoints).length !== 0) {
      for (var key in this.breakpoints) {
        if (currentBreakpoint === this.breakpoints[key]) {
          if (!kony.sdk.isNullOrUndefined(inputJSON.key)) {
            return inputJSON.key;
          }
        }
      }
    }
    if (inputJSON.hasOwnProperty("default")) {
      return inputJSON["default"];
    }
  };
  /**
    * @api : setDataInCollection
    * Store the data in context object under collection and invoke formatting data
    * @return : NA
    */
  BusinessController.prototype.setDataInCollection = function(context) {
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: context
    });
  };

  /**
  * @api : invokeCustomVerbforCreateTransaction
  * invoke the transaction data using service call
  * @return : NA
  */
  BusinessController.prototype.invokeCustomVerbforCreateTransaction = function() {
    var scope = this;
    var collectionObj = this.store.getState();
    var serviceName = "";
    var transferType =  collectionObj.Collection["Transaction"]["transferType"];
    var accountType = collectionObj.Collection["Transaction"]["accountType"];
    if (collectionObj.Collection["Transaction"]["payeeType"] === "Existing Payee") {
      if (transferType === "Same Bank") {
        if (accountType === "External") serviceName = "IntraBankAccFundTransfer";
        else if (accountType === "CreditCard") serviceName = "createCreditCardTransfer";
        else serviceName = "TransferToOwnAccounts";
      } else if (transferType === "Domestic Transfer") serviceName = "InterBankAccFundTransfer";
      else if (transferType === "International Transfer") serviceName = "InternationalAccFundTransfer";
      else serviceName = "P2PTransfer";
    } else {
      serviceName = "CreateOneTimeTransfer";
    }
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    var criteria = this.getCriteria(this.serviceParameters[serviceName].Criteria);
    if (!criteria["toAccountCurrency"]) criteria["toAccountCurrency"] = criteria["transactionCurrency"];
    if (criteria["amount"]) criteria["amount"] = this.getDeformattedAmount(criteria["amount"]);
	if (criteria["transactionAmount"]) criteria["transactionAmount"] = this.getDeformattedAmount(criteria["transactionAmount"]);
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters[serviceName].Object, criteria, this.serviceParameters[serviceName].Verb)
      .then(this.setAcknowledgementInCollection.bind(this, this.serviceParameters[serviceName].Object))
      .catch(scope.setError.bind(this, "invokeCustomVerbforCreateTransaction"));
  };
  
  /**
  * @api : invokeCustomVerbforEditTransaction
  * invoke the transaction data using service call
  * @return : NA
  */
  BusinessController.prototype.invokeCustomVerbforEditTransaction = function(){
    var scope = this;
    var collectionObj = this.store.getState();
    var serviceName = "";
    var transferType =  collectionObj.Collection["Transaction"]["transferType"];
    var accountType = collectionObj.Collection["Transaction"]["accountType"];
    if (collectionObj.Collection["Transaction"]["payeeType"] === "Existing Payee") {
      if (transferType === "Same Bank") {
        if (accountType === "External") serviceName = "IntraBankAccFundTransferEdit";
        else serviceName = "TransferToOwnAccountsEdit";
      } else if (transferType === "Domestic Transfer") serviceName = "InterBankFundTransferEdit";
      else if (transferType === "International Transfer") serviceName = "InternationalFundTransferEdit";
    } else {
      serviceName = "CreateOneTimeTransfer";
    }
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    var criteria = this.getCriteria(this.serviceParameters[serviceName].Criteria);
    if (!criteria["payeeCurrency"]) criteria["payeeCurrency"] = criteria["transactionCurrency"];
    if (criteria["amount"]) criteria["amount"] = this.getDeformattedAmount(criteria["amount"]);
	if (criteria["transactionAmount"]) criteria["transactionAmount"] = this.getDeformattedAmount(criteria["transactionAmount"]);
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters[serviceName].Object, criteria, this.serviceParameters[serviceName].Verb)
      .then(this.setAcknowledgementInCollection.bind(this, this.serviceParameters[serviceName].Object))
      .catch(scope.setError.bind(this, "invokeCustomVerbforEditTransaction"));
  };
  /**
   * @api : getCriteria
   * Parse the criteria based and set context values.
   * @param : criteria {JSON} - value collected from exposed contract
   * @return : {JSONObject} - jsonvalue for criteria
   */
  BusinessController.prototype.getCriteria = function (criteriaJSON) {
    var collectionObj = this.store.getState();
    var criteria = JSON.parse(JSON.stringify(criteriaJSON));
    for (var key in criteria) {
      var value = criteria[key];
      if (typeof value === "string") {
        if (value.indexOf("$") !== -1) {
          var token = value.substring(value.indexOf("{") + 1, value.indexOf("}"));
          var objectName = token.split(".")[1];
          token = token.split(".")[2];
          if (!kony.sdk.isNullOrUndefined(collectionObj.Collection[objectName]) && !kony.sdk.isNullOrUndefined(collectionObj.Collection[objectName][token])) {
            criteria[key] = collectionObj.Collection[objectName][token];
          } else {
            criteria[key] = "";
          }
        }
      }
    }
    return criteria;
  };
  /**
	* @api : setAcknowledgementInCollection
	* sets acknowledgement data in collection
	* @return : NA
	*/
       BusinessController.prototype.setAcknowledgementInCollection = function(object, data) {
        var scope = this;
        kony.application.dismissLoadingScreen();
        var collectionObj = this.store.getState();
        var objectName = "Transaction";
        var successMessage = this.getDataBasedOnDataMapping("lblSuccess");
        var pendingMessage = this.getDataBasedOnDataMapping("lblPending");
        if (!kony.sdk.isNullOrUndefined(collectionObj.Collection[objectName])) {
            scope.dataJSON = collectionObj.Collection[objectName];
        } else {
            collectionObj.Collection[objectName] = {};
            scope.dataJSON = collectionObj.Collection[objectName];
        }
        if(data.messageDetails){
          scope.dataJSON["messageDetails"] = data.messageDetails;
        }else{
        delete scope.dataJSON.messageDetails;
        }
        if (data.backendReferenceId && (data.status === "Sent" || data.status === "success")) {
          scope.dataJSON["referenceId"] = data.backendReferenceId;
          scope.dataJSON["message"] = data.message ? kony.i18n.getLocalizedString("i18n.Transfers.AcknowledgementSuccessMessage") : successMessage;  
          scope.dataJSON["createSuccess"] = "true";    
        } else if (data.referenceId &&  (data.status === "Sent" || data.status === "success")) {
          scope.dataJSON["message"] = data.message ? kony.i18n.getLocalizedString("i18n.Transfers.AcknowledgementSuccessMessage") : successMessage;
          scope.dataJSON["referenceId"] = data.referenceId;
          scope.dataJSON["createSuccess"] = "true";
        }  else if(data.Id || data.PayPersonId){
          scope.dataJSON["referenceId"] = data.Id ? data.Id : data.PayPersonId;
          scope.dataJSON["message"] = data.message ? kony.i18n.getLocalizedString("i18n.Transfers.AcknowledgementSuccessMessage") : successMessage; 
          scope.dataJSON["createSuccess"] = "true";    
        } else if (data.status === "Pending") {
          scope.dataJSON["referenceId"] = data.referenceId;
          scope.dataJSON["message"] = data.message ? data.message : pendingMessage; 
          scope.dataJSON["createSuccess"] = "true";   
        } else if (data.status === "Denied") {
          scope.dataJSON["message"] = data.message;         
          scope.dataJSON["createSuccess"] = "true";
        } else if (data.errmsg || data.dbpErrMsg) {
          scope.dataJSON["errorDetails"] = data; 
          scope.dataJSON["createSuccess"] = "false";
        } else if (data.MFAAttributes) {
          scope.dataJSON["serviceName"] =  collectionObj.Collection[objectName].serviceName;
          scope.dataJSON["MFAAttributes"] = data.MFAAttributes;		  
        }
      this.store.dispatch({
        type : "UPDATE_COLLECTION",
        data : scope.dataJSON,
        key : objectName
      });
  };
  /**
  * @api : getDeformattedAmount
  * get the deformatted amount value
  * @return : deformattedAmount
  */
  BusinessController.prototype.getDeformattedAmount = function (amountValue) {
    const isDeformatted = (/^(\-|)\d+(?:\.\d{1,2})?$/g).test(amountValue);
    if (isDeformatted) return amountValue;
    if (amountValue.lastIndexOf('.') > amountValue.lastIndexOf(',')) return amountValue.replace(/\,/g, '');
    return amountValue.replace(/\./g, '').replace(/\,/g, '.');
  };
  /**
	* @api : setError
	* triggered as a error call back for any service
	* @return : NA
	*/
  BusinessController.prototype.setError = function(method, errorDetails) {
    var collectionObj = this.store.getState();
    var objectName = "ErrorDetails";
    kony.application.dismissLoadingScreen();
    collectionObj.Collection[objectName] = {};
    this.store.dispatch({
      type : "UPDATE_COLLECTION",
      data : errorDetails,
      key : objectName
    });
  };
  return BusinessController;
});