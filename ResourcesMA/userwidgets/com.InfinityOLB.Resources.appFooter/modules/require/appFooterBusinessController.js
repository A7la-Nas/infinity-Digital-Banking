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
  BusinessController.prototype.convertTokensInDataMapping = function (fieldMapping, record) {
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
    * @api : getParsedDataBasedOnDataMapping
    * gets the corresponding data of each widget based on datamapping
    * @return : string / object / boolean
    */
    BusinessController.prototype.getParsedDataBasedOnDataMapping = function (widget, dataMapping) {
        try {
            var collectionObj = this.store.getState();
            if (dataMapping) {
                var fieldValue = dataMapping[widget];
                if (typeof (fieldValue) === "number" || typeof (fieldValue) === "boolean") {
                    return fieldValue;
                }
                if (fieldValue) {
                    if (!fieldValue.indexOf("${Collection")) {
                        var group = fieldValue.split(".")[1];
                        var fieldType = fieldValue.split(".")[2].replace("}", "");
                        if (!kony.sdk.isNullOrUndefined(collectionObj.Collection[group])) {
                            if (!kony.sdk.isNullOrUndefined(collectionObj.Collection[group][fieldType]))
                                return collectionObj.Collection[group][fieldType];
                        }
                    } else if (!fieldValue.indexOf("${i18n")) {
                        return kony.i18n.getLocalizedString(fieldValue.substring(fieldValue.indexOf("${i18n{") + 7, fieldValue.indexOf("}"))) ? kony.i18n.getLocalizedString(fieldValue.substring(fieldValue.indexOf("${i18n{") + 7, fieldValue.indexOf("}"))) + fieldValue.substring(fieldValue.indexOf("}") + 1, fieldValue.length - 1) : fieldValue;
                    } else if (typeof (fieldValue) === "string") {
                        return fieldValue;
                    } else {
                        if (fieldValue.indexOf("$") !== -1) {
                            var token = fieldValue.substring(fieldValue.indexOf("{") + 1, fieldValue.indexOf("}"));
                            if (token.indexOf("CNTX.") !== -1) {
                                token = token.substring(5, token.length);
                                return collectionObj["context"] ? collectionObj["context"][token] : "";
                            }
                        }
                    }
                } else {
                    return "";
                }
            }
            return "";
        } catch (err) {
            var errorObj = {
                "level": "ComponentBusinessController",
                "method": "getParsedDataBasedOnDataMapping",
                "error": err
            };
            this.viewControllerScope.onError(errorObj);
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