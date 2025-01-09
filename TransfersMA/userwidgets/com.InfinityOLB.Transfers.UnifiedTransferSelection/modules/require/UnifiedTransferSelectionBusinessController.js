define(function () {

  function BusinessController() {
    this.store = {};
    this.context = {};
    this.error = [];
  }
  /**
	* @api : setDataInCollection
	* Store the data in context object under collection and invoke formatting data
	* @return : NA
	*/

  BusinessController.prototype.setDataInCollection = function(context) {
    this.store.dispatch({
      type: "UPDATE_CNTX",
      data: context,
      key: "Entitlement"
    });
  };
  /**
     * @api : getDataBasedOnDataMapping
     * Get the data in collection and i18n resource based on dataMapping
     * @return : Field value
     */
  BusinessController.prototype.getDataBasedOnDataMapping = function(widget, dataMapping) {
    for(var record in dataMapping) {
      var keyValues = dataMapping[record];
      if(widget === record){
        return keyValues;
      }else{
        for(var key in keyValues) {
          if(widget === key) {
            var fieldValue = dataMapping[record][widget];
            if(!fieldValue.indexOf("${i18n")) {
              return kony.i18n.getLocalizedString(fieldValue.substring(fieldValue.indexOf("${i18n{")+7, fieldValue.length-2));
            }else{
              return fieldValue;
            }
          } }
      }
    }
    return "";
  };
  /** 
   * Verifies if the user is entitled for respective features & permissions.
   * data {array} - entitlements for the feature.
   * @return : {boolean} - entitlement of the feature/permission passed.
  */
  BusinessController.prototype.isEntitled = function(data) {
    var collectionObj = this.store.getState();
    if(!this.isEmptyNullUndefined(data) && data.length === 0)
      return true;
    var flag = false,
        features = collectionObj.CNTX.entitlement.features,
        permissions = collectionObj.CNTX.entitlement.permissions;
    for(var i = 0; i < data.length; i++) {
      if(data[i].includes("&&")) {
        var keys = data[i].split("&&");
        for(var j = 0; j < keys.length; j++) {
          if(!(features.includes(keys[j]) || permissions.includes(keys[j]))) {
            flag = false;
            break;
          } else {
            flag = true;
          }
        }
      } else {
        if(features.includes(data[i]) || permissions.includes(data[i])) {
          flag = true;
          break;
        }
      }
    }
    return flag;
  };
  /**
   * Verifies if the value is empty, null or undefined.
   * data {string} - value to be verified.
   * @return : {boolean} - validity of the value passed.
   */
  BusinessController.prototype.isEmptyNullUndefined = function(data){
    if(data === null || data === undefined || data === "")
      return true;
    return false;
  };
  return BusinessController;
});