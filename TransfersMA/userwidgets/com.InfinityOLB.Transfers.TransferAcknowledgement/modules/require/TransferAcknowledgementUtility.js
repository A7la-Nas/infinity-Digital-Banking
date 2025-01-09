define(function () {
   
  function TransferAcknowledgementUtility(){
     this.map = {};
}
 /**
     * @api : breakPointParser
     * Helper method to parse the exposed contract based on the current breakpoint.
     * @param : inputJSON {JSONObject} - object containing information about various breakpoints and associated texts
     * @param : lookUpKey {string}     - current breakpoint value to be looked upon the above object
     * @return : value of the lookup key in the input object
     */
    TransferAcknowledgementUtility.prototype.breakPointParser = function(inputJSON, lookUpKey) {
      try{
        inputJSON = JSON.parse(inputJSON);
      }
      catch(e){
        inputJSON = inputJSON;       
      }
      if(inputJSON.hasOwnProperty(lookUpKey)){
        return inputJSON[lookUpKey];
      }
      else if(inputJSON["default"]){
        return inputJSON["default"];
      }
      return inputJSON;
    },
      
    /**
     * @api : setFormattedData
     * Helper method required for construction of inputs to be passed for format value component.
     * @param : formatValues{JSONObject} - object of all inputs required for format value component
     * @param : text{string}             - value of the field on which formatting happens
     * @param : type{String}             - type of the field to recognise specific formatting to be applied
     * @return : updated object with necessary information for formatting field
     */
    TransferAcknowledgementUtility.prototype.setFormattedData = function(formatValues, text, type) {
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
    TransferAcknowledgementUtility.prototype.buttonParsedValue = function(property) {
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
    TransferAcknowledgementUtility.prototype.retrieveEntitlement = function(property) {
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
    TransferAcknowledgementUtility.prototype.readArray = function(array, jsonPath) {
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
     * @api : readObject
     * Helper method to parse the backend response.
     * @param : obj{JSONArray} - object containing any value
     * @param : jsonPath{String} - jsonPath traversed till the search field is reachable
     * @return : NA
     */
     TransferAcknowledgementUtility.prototype.readObject = function(obj, jsonPath) {
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
    }
    return TransferAcknowledgementUtility;
});