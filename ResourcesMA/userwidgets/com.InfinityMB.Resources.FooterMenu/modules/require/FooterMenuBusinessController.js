define(function () {

  function BusinessController(viewController) {
    this.store = {};
    this.viewControllerScope = viewController;
    this.componentUtility = {};
    this.entitlements = {};
  }

  /**
   * @api : setDataInCollection
   * Store the service response in Master object under collection and invoke formatting data
   * @Param {Object} data - value which need to update in collection
   * @Param {String} objectName - Referring to key under which value to be pushed
   * @return : NA
   */
  BusinessController.prototype.setDataInCollection = function (data, objectName) {
    var scope = this;
    try {
      let collectionObj = this.store.getState();
      if (!scope.componentUtility.isEmptyNullUndefined(collectionObj.Collection[objectName])) {
        data = Object.assign(collectionObj.Collection[objectName], data);
      }
      scope.store.dispatch({
        type: "UPDATE_COLLECTION",
        data: data,
        key: objectName
      }, scope.viewControllerScope);
    } catch (error) {
      scope.setError("setDataInCollection", error);
    }
  };

  /**
   * @api : getParsedValue
   * gets the parsed data of each data
   * @Param {String} fieldValue - Value which is mapped through contracts
   * @return : {String} field value
   */
  BusinessController.prototype.getParsedValue = function (fieldValue) {
    var scope = this;
    try {
      let collectionObj = this.store.getState();
      if (!fieldValue.indexOf("${Collection")) {
        let group = fieldValue.split(".")[1];
        let fieldType = fieldValue.split(".")[2].replace("}", "");
        if (!scope.componentUtility.isEmptyNullUndefined(collectionObj.Collection[group])) {
          if (!scope.componentUtility.isEmptyNullUndefined(collectionObj.Collection[group][fieldType])) {
            return collectionObj.Collection[group][fieldType];
          }
        }
      } else if (!fieldValue.indexOf("${i18n")) {
        return scope.geti18nText(fieldValue);
      } else if (!fieldValue.indexOf("${CNTX")) {
        let fieldIdentifier = fieldValue.substring(7, fieldValue.length).replace("}", "");
        if (collectionObj.Collection.hasOwnProperty("context") && collectionObj.Collection.context.hasOwnProperty(fieldIdentifier)) {
          return collectionObj.Collection.context[fieldIdentifier];
        } else {
          return "";
        }
      }
      return fieldValue;
    } catch (error) {
      scope.setError("getParsedValue", error);
    }
  };

  /**
  * @api: geti18nText
  * This method is used get the i18n text
  * @Param: {String} token - token to be converted to a text
  * return: {String} corresponding i18n key 
  */
  BusinessController.prototype.geti18nText = function (token) {
    var scope = this;
    try {
      let i18ntext = kony.i18n.getLocalizedString(token.substring(token.indexOf("${i18n{") + 7, token.length - 2));
      if (!scope.componentUtility.isEmptyNullUndefined(i18ntext)) {
        return i18ntext;
      } else {
        return token;
      }
    } catch (error) {
      scope.setError("geti18nText", error);
    }
  };

  /**
   * @api : getFieldValueFromMapping
   * Returns the data in collection using data mapping and conditional data mapping
   * @Param {String} fieldMapping - Value configured through contracts
   * @return : {String} Mapped Value
   */
  BusinessController.prototype.getFieldValueFromMapping = function (fieldMapping) {
    var scope = this;
    try {
      if (typeof fieldMapping === "string") {
        if (fieldMapping.indexOf("$") !== -1) {
          if (fieldMapping.indexOf("${i18n") !== -1) {
            return scope.geti18nText(fieldMapping);
          }
          else {
            fieldMapping = fieldMapping.split(".");
            fieldMapping = fieldMapping[fieldMapping.length - 1].replace("}", "");
            return fieldMapping;
          }
        }
        else {
          return fieldMapping;
        }
      }
      else {
        return fieldMapping;
      }
    } catch (error) {
      scope.setError("getFieldValueFromMapping", error);
    }
  };

  /**
  * @api : setError
  * communicate error handling from component business controller to parent widget.
  * @Param: {String} methodName - method from which error message is received
  * @Param: {Object} error - error response
  * @return : NA
  */
  BusinessController.prototype.setError = function (methodName, error) {
    let errorObj = {
      "level": "ComponentBusinessController",
      "method": methodName,
      "error": error
    };
    this.viewControllerScope.onError(errorObj);
  };
  
    /**
  * @api: setEntitlements
  * sets the entitlements of the corresponding user from component consumer and set globally
  * @arg: entitlements {Object} - entitlements that the corresponding has
  * @return: NA
  **/
  BusinessController.prototype.setEntitlements = function (entitlements) {
    var scope = this;
    try {
      scope.entitlements = entitlements;
    } catch (err) {
      scope.setError(err, "setEntitlements");
    }
  };
  
    /**
  * @api: isEntitled
  * checks whether input entitlements satisfy the permisson
  * @arg: userPermissions {Object} - entitlements configured for a specific button
  * @return: returns if the input entitlements satisfy the permisson
  **/
  BusinessController.prototype.isEntitled = function (userPermissions) {
    var scope = this;
    try {
      if (userPermissions.length === 0) {
        return true;
      }
      var entitlementFlag = false;
      for (let index = 0; index < userPermissions.length; index++) {
        if (this.entitlements.features.includes(userPermissions[index]) || this.entitlements.permissions.includes(userPermissions[index])) {
          entitlementFlag = true;
          break;
        }
      }
      return entitlementFlag;
    } catch (err) {
      scope.setError(err, "isEntitled");
    }
  };

  return BusinessController;
});