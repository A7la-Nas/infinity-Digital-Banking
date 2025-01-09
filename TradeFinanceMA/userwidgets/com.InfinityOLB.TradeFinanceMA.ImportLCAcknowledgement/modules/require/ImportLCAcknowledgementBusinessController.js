define(['DataFormattingUtils/FormatUtils'], function(FormatUtils) {

  function BusinessController() {
    this.context = {};
    this.serviceParameters = {};
    this.store = {};
    this.objectMetadata = {};
    this.breakpoints = {};
    this.formatUtils = new FormatUtils(); 
    this.error = [];
    this.dataJSON = {};

  }


  BusinessController.prototype.setProperties = function(serviceParameters, dataFormatJSON, breakpoints) {
    this.serviceParameters = serviceParameters;
    this.breakpoints = breakpoints;
    this.formatUtils.updateFormatJSON(dataFormatJSON);
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
    for(var key in data){
      if(key === "LetterOfCredit" || key === "DigitalArrangements"){
        this.store.dispatch({
          type: "UPDATE_COLLECTION",
          data: data[key],      
          key : key
        });
      }
    }
  };
 
  return BusinessController;
});