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
  BusinessController.prototype.setProperties = function(serviceParameters, dataFormatJSON, breakpoints) {
    this.serviceParameters = serviceParameters;
    this.breakpoints = breakpoints;
    this.formatUtils.updateFormatJSON(dataFormatJSON);
  };

  BusinessController.prototype.getDataBasedOnDataMapping = function(widget, dataMapping, obj) {
    var collectionObj = obj;
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
	* @api : downloadTransactions
	* Downloades the particular transaction
	* @return : NA
	*/
  BusinessController.prototype.downloadTransactions = function(context) {
    var scope = this;
    this.context = context;
    var criteria = this.getCriteria(this.serviceParameters.Download.Criteria);
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.Download.Object, criteria, this.serviceParameters.Download.Verb).then(response => {
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
    CommonUtilities.downloadGeneratedFile({ url, fileName: 'Import Letter Of Credit', fileType: 'pdf' }, {"fileId": response.fileId});
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

  BusinessController.prototype.fetchSwiftAndAdvices = function() {
    var scope = this;
    var criteria = this.getCriteria(this.serviceParameters.SwiftAndAdvices.Criteria);
    scope.invokeServiceUtils.makeAServiceCall("customVerb", this.serviceParameters.SwiftAndAdvices.Object, criteria, this.serviceParameters.SwiftAndAdvices.Verb).then(response => {
      scope.storeContextInCollection(response);;
    }).catch(scope.fetchSwiftAndAdvicesFailure.bind(this));    
  };

  BusinessController.prototype.fetchSwiftAndAdvicesFailure = function(responseError) {
    kony.print(responseError);
  };

  return BusinessController;
});