define([],function() {
   
    function BusinessController() {
    this.store = {};
    this.context = {};
    this.serviceParameters = {};
    this.error = [];
  }
  
  /**
  * @api : setPropertiesFromComponent
  * set properties from component
  * @return : NA
  */
  BusinessController.prototype.setProperties = function(serviceParameters, customDataFormat) {
    this.serviceParameters = serviceParameters;
  };
  
  /**
  * @api : setDataInCollection
  * Store the service response in Master object under collection and invoke formatting data
  * @return : NA
  */

  BusinessController.prototype.setDataInCollection = function(data) {
    this.store.dispatch({
      type: "UPDATE_COLLECTION",
      data: data,
      key : "context"
    });
    kony.application.dismissLoadingScreen();
  };
  
  /**
     * @api : getDataBasedOnDataMapping
     * gets the corresponding data of each widget from collection
     * @return : NA
     */
  
    BusinessController.prototype.getDataBasedOnDataMapping = function(widget, dataMapping) {
    var collectionObj = this.store.getState()["Collection"];
    var fieldValue = dataMapping[widget];
    if(!fieldValue.indexOf("${Collection")) {
      var group = fieldValue.split(".")[1];
      var fieldType = fieldValue.split(".")[2].replace("}", "");
      if(!kony.sdk.isNullOrUndefined(collectionObj.Collection[group])) {
        if(!kony.sdk.isNullOrUndefined(collectionObj.Collection[group][fieldType]))
          return collectionObj.Collection[group][fieldType];
      } }
    else if(!fieldValue.indexOf("${i18n")) {
		return kony.i18n.getLocalizedString(fieldValue.substring(fieldValue.indexOf("${i18n{") + 7, fieldValue.indexOf("}"))) ? kony.i18n.getLocalizedString(fieldValue.substring(fieldValue.indexOf("${i18n{") + 7, fieldValue.indexOf("}"))) + fieldValue.substring(fieldValue.indexOf("}")+1, fieldValue.length - 1) : fieldValue;
    }
    else{
      if(fieldValue.indexOf("$") !== -1){
        var token = fieldValue.substring(fieldValue.indexOf("{")+1,fieldValue.indexOf("}"));
        if(token.indexOf("CNTX.") !== -1){
          token = token.substring(5,token.length);
          return collectionObj["context"]?collectionObj["context"][token]:"";
        }
      }
    }
    return "";
  };
  
  /**
  * @api : setError
  * triggered as a error call back for any service
  * @return : NA
  */
  BusinessController.prototype.setError = function(errorMsg,method) {
    var errorObj =
        {
          "level" : "BusinessController",
          "method" : method,
          "error": errorMsg
        };
    this.error.push(errorObj);
  };

  return BusinessController;

});