define(function () {

  function EntitlementUtils() {
    /**@member {OBJECT}  contains features & permissions*/
    this.features = [];
    this.permissions = [];
  }

  /** 
   * To set the entitlements (features & permissions) of the logged in user.
   * context {array} - context holding list of entitlements.
  */
  EntitlementUtils.prototype.setEntitlements = function(context) {
    this.features = context.entitlement.features;
    this.permissions = context.entitlement.permissions;
  };

  /** 
   * Verifies if the user is entitled for respective features & permissions.
   * data {array} - entitlements for the feature.
   * @return : {boolean} - entitlement of the feature/permission passed.
  */
  EntitlementUtils.prototype.isEntitled = function(data) {
    if(!this.isEmptyNullUndefined(data) && data.length === 0)
        return true;
    var flag = false;
    for(var i = 0; i < data.length; i++) {
      if(data[i].includes("&&")) {
        var keys = data[i].split("&&");
        for(var j = 0; j < keys.length; j++) {
          if(!(this.features.includes(keys[j]) || this.permissions.includes(keys[j]))) {
            flag = false;
            break;
          } else {
            flag = true;
          }
        }
      } else {
        if(this.features.includes(data[i]) || this.permissions.includes(data[i])) {
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
  EntitlementUtils.prototype.isEmptyNullUndefined = function(data){
    if(data === null || data === undefined || data === "")
      return true;
    return false;
  };
  
  return EntitlementUtils;
  
});