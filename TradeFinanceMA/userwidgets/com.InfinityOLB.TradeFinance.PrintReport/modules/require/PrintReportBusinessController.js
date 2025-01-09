define(['DataFormattingUtils/FormatUtils','InvokeServiceUtils','CommonUtilities'], function(FormatUtils,InvokeServiceUtils,CommonUtilities) {

  function BusinessController() {
    this.context = {};
    this.serviceParameters = {};
    this.store = {};
    this.objectMetadata = {};
    this.breakpoints = {};
    this.formatUtils = new FormatUtils(); 
    this.invokeServiceUtils = new InvokeServiceUtils();
    this.error = [];
    this.dataJSON = {};
  }
  BusinessController.prototype.setProperties = function(serviceParameters, breakpoints) {
    this.serviceParameters = serviceParameters;
    this.breakpoints = breakpoints;
    //this.formatUtils.updateFormatJSON(dataFormatJSON);
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
      scope.setDataInCollection(this.serviceParameters.Object, response, criteria, "Object");
    }).catch(scope.setError.bind(this, "fetchTransactions"));
  };
    /**
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
   // var collection = this.getFormattedData(object, data);
    this.store.dispatch({
      type : "UPDATE_Collection_Cache",
      Cache: data,
      Collection: data,
      key : storeKey
    }); 
    kony.application.dismissLoadingScreen();
  };
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
	* Method to get the data of current breakpoint
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
	* @api : storeContextInCollection
	* Method to store the context data
	* @return : NA
	*/

  BusinessController.prototype.storeContextInCollection = function(data) {
    var scope = this;
    scope.store.dispatch({
      type : "UPDATE_Collection_Cache",
      Cache: data,
      Collection: data,
      key : "Object"
    }); 
  };
 /**
     * @api : setError
     * triggered as a error call back for any service
     * @return : NA
     */
    BusinessController.prototype.setError = function(errorMsg, method) {
        var errorObj = {
            "level": "BusinessController",
            "method": method,
            "error": errorMsg
        };
        this.error.push(errorObj);
    };
   kony.application.dismissLoadingScreen();
  return BusinessController;
});