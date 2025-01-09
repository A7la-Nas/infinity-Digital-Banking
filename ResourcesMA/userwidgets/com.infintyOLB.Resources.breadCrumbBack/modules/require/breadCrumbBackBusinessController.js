define(function () {

  function BusinessController(compViewCtrlScope) {
    this.store = {};
    this.compViewCtrlScope = compViewCtrlScope;
    this.contextKey = "";
  }

  /**
   * Sets the key globally into whcih data can be stored in collection
   * @param {String} contextKey - Key into whcih data to be stored into collection
   */
  BusinessController.prototype.setContextKey = function (contextKey) {
    var scope = this;
    try {
      scope.contextKey = contextKey;
    } catch (err) {
      scope.setError(err, "setContextKey");
    }
  };

  /**
   * Sets the context data in collection
   * @param {Object} collectionData - Data to be set in collection
   */
  BusinessController.prototype.setDataInCollection = function (dataToBeStored) {
    var scope = this;
    try {
      this.store.dispatch({
        type: "UPDATE_COLLECTION",
        data: dataToBeStored,
        key: scope.contextKey
      }, this.compViewCtrlScope);
    } catch (err) {
      scope.setError(err, "setDataInCollection");
    }
  };

  /**
   * Processes the tokens in data mapping to text
   * @param {String} fieldMapping - Data from collection
   * @param {Object} record - Corresponding record
   * @returns {String} Text to be displayed
   */
  BusinessController.prototype.convertTokensInDataMapping = function (record, fieldMapping) {
    var scope = this;
    try {
      if (typeof fieldMapping === "string") {

        if (fieldMapping.indexOf("$") !== -1) {
          if (fieldMapping.indexOf("${i18n") !== -1) {
            return this.geti18nText(fieldMapping);
          }
          else if (fieldMapping.indexOf("${CNTX") !== -1) {
            fieldMapping = fieldMapping.split(".");
            fieldMapping = fieldMapping[fieldMapping.length - 1].replace("}", "");
            return record[fieldMapping];
          }
          else {
            fieldMapping = fieldMapping.split(".");
            fieldMapping = fieldMapping[fieldMapping.length - 1].replace("}", "");
            return record[fieldMapping];
          }
        }
        else {
          return fieldMapping;
        }
      }
    } catch (err) {
      scope.setError(err, "convertTokensInDataMapping");
    }
  };

  BusinessController.prototype.getDataBasedOnDataMapping = function(widget, dataMapping) {
    var scope = this;
    try {
      let collectionObj = scope.store.getState();
      for(let record in dataMapping) {
        let keyValues = dataMapping[record];
        for(let key in keyValues) {
          if(widget === key) {
            let fieldValue = dataMapping[record][widget];
            if(!fieldValue.indexOf("${Collection")) {
              let group = fieldValue.split(".")[1];
              let fieldType = fieldValue.split(".")[2].replace("}", "");
              if(!kony.sdk.isNullOrUndefined(collectionObj.Collection[group])) {
                if(!kony.sdk.isNullOrUndefined(collectionObj.Collection[group][fieldType])) {
                  return collectionObj.Collection[group][fieldType];
                } } }
            else if(!fieldValue.indexOf("${i18n")) {
              let i18ntext = kony.i18n.getLocalizedString(fieldValue.substring(fieldValue.indexOf("${i18n{") + 7, fieldValue.length - 2));
              if(!scope.componentUtility.isEmptyNullUndefined(i18ntext)) {
                return i18ntext;
              }
              return fieldValue;
            }
            else if(!fieldValue.indexOf("${CNTX")) {
              return collectionObj.Collection.context[fieldValue.substring(7, fieldValue.length).replace("}", "")];
            }
          } 
        }
      }
      return fieldValue;
    } catch(err) {
      scope.setError(err, "getDataBasedOnDataMapping");
    }
  };



  /**
   * Gets the value mapped to corresponding i18n key
   * @param {String} token - Token to be converted to a text
   * @returns {String} Key associated to corresponding i18n key 
   */
  BusinessController.prototype.geti18nText = function (token) {
    var scope = this;
    try {
      let i18ntext = token.substring(token.indexOf("${i18n") + 7, token.length - 2);
      return kony.i18n.getLocalizedString(i18ntext);
    } catch (err) {
      scope.setError(err, "geti18nText");
    }
  };

  /**
   * Gets trigerred when any exception occurs in any method in business controller
   * @param errorMsg {String} - error message
   * @param method {String} - method from which error message is received
   */
  BusinessController.prototype.setError = function (errorMsg, method) {
    let errorObj = {
      "level": "ComponentBusinessController",
      "method": method,
      "error": errorMsg
    };
    this.compViewCtrlScope.onError(errorObj);
  };

  return BusinessController;
});