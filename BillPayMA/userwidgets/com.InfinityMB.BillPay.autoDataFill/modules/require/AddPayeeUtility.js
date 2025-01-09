define(function () {

  function AddPayeeUtility(){
    this.map = {};
  }

    /**
     * @api : setFormattedData
     * Helper method required for construction of inputs to be passed for format value component.
     * @param : formatValues{JSONObject} - object of all inputs required for format value component
     * @param : text{string}             - value of the field on which formatting happens
     * @param : type{String}             - type of the field to recognise specific formatting to be applied
     * @return : updated object with necessary information for formatting field
     */
    AddPayeeUtility.prototype.setFormattedData = function(formatValues, text, type) {
    formatValues["FieldType"] = {"type" : type};
    if(text)
      formatValues["FieldValue"] = {"value" :text};
    else
      formatValues["FieldValue"] = {"value" : ""};
    return formatValues;
  },
    /**
  * buttonParsedValue
  *
  *  helper method for parsing value to be set on buttons.
  */
    AddPayeeUtility.prototype.buttonParsedValue = function(property) {
    var parsedValue="";
    try{
      parsedValue=JSON.parse(property);
    }
    catch(exception){
      parsedValue=property;
      kony.print(exception);
    }
    return parsedValue;
  },

    /**
  * fetchEntitlement
  *
  *  helper method for retrievingEntitlment assigned.
  */
    AddPayeeUtility.prototype.retrieveEntitlement = function(property) {
    var parsedJson = "";
    var parsedValue = "";
    try{
      parsedJson=JSON.parse(property);
      parsedValue = parsedJson.entitlement;
    }
    catch(exception){
      parsedValue=property;
      kony.print(exception);
    }
    return parsedValue;
  },
    /**
     * @api : readArray
     * Helper method to parse the backend response.
     * @param : array{JSONArray} - array of records
     * @param : jsonPath{String} - jsonPath traversed till the search field is reachable
     * @return : NA
     */
    AddPayeeUtility.prototype.readArray = function(array, jsonPath) {
    var parentPath = jsonPath;
    for (var i = 0; i < array.length; i++) {
      var value = array[i];
      jsonPath = parentPath + "[" + i + "]";
      if (value instanceof Array) {
        this.readArray(value, jsonPath);
      } else if (value instanceof Object) {
        this.readObject(value, jsonPath);
      } else { 
        if(isNaN(value) && (value.indexOf("{")>-1 ||value.indexOf("[")>-1))
          value=JSON.parse(value);
        if (value instanceof Array) {
          this.readArray(value, jsonPath);
        } else if (value instanceof Object) {
          this.readObject(value, jsonPath);
        }else{
          this.map[jsonPath] = value;
        }
      }
    }
  },
      
      /**
     * @api : geti18nText
     * @description :  method to parse i18n key
     * @param : text - i18n key or text which needs parsing
     */
  AddPayeeUtility.prototype.geti18nText = function(text){
    var i18ntext = "";
    try{
      i18ntext = kony.i18n.getLocalizedString(text);
      if(i18ntext !== "" && i18ntext !== undefined && i18ntext !== null){
        return i18ntext;
      }
    return text;
    }catch(e){
      kony.print(e);
    }
  },
      
    /**
     * @api : readObject
     * Helper method to parse the backend response.
     * @param : obj{JSONArray} - object containing any value
     * @param : jsonPath{String} - jsonPath traversed till the search field is reachable
     * @return : NA
     */
    AddPayeeUtility.prototype.readObject = function(obj, jsonPath) {
    var keysItr = Object.keys(obj);
    var parentPath = jsonPath;
    for (var i = 0; i < keysItr.length; i++) {
      var key = keysItr[i];
      var value = obj[key]
      if(parentPath)
        jsonPath = parentPath + "." + key;
      else
        jsonPath = key;
      if (value instanceof Array) {
        this.readArray(value, jsonPath);
      } else if (value instanceof Object) {
        this.readObject(value, jsonPath);
      } else { 
        if(isNaN(value) && (value.indexOf("{")>-1 ||value.indexOf("[")>-1))
          value=JSON.parse(value);
        if (value instanceof Array) {
          this.readArray(value, jsonPath);
        } else if (value instanceof Object) {
          this.readObject(value, jsonPath);
        }else{
          this.map[jsonPath] = value;
        }
      }
    }
  };

  AddPayeeUtility.prototype.isNullOrUndefinedOrEmpty = function(val){
    if (val === null || val === undefined || val ==="") {
      return true;
    } else {
      return false;
    }
  };
  return AddPayeeUtility;
});