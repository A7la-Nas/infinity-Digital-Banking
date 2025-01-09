define(['FormatUtil'],function (FormatUtil) {

  function UnifiedTransfersUtility(){
    this.map = {};
    this.formatUtil = new FormatUtil();
  }
  /**
     * @api : breakPointParser
     * Helper method to parse the exposed contract based on the current breakpoint.
     * @param : inputJSON {JSONObject} - object containing information about various breakpoints and associated texts
     * @param : lookUpKey {string}     - current breakpoint value to be looked upon the above object
     * @return : value of the lookup key in the input object
     */
  UnifiedTransfersUtility.prototype.breakPointParser = function(inputJSON, lookUpKey) {
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
    UnifiedTransfersUtility.prototype.setFormattedData = function(formatValues, text, type) {
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
    UnifiedTransfersUtility.prototype.buttonParsedValue = function(property) {
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
    UnifiedTransfersUtility.prototype.retrieveEntitlement = function(property) {
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
    UnifiedTransfersUtility.prototype.readArray = function(array, jsonPath) {
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
      validateAndFormatAmount: Validates the amount in the given amount field reference and then formats it if the amount is valid.
      */
  UnifiedTransfersUtility.prototype.validateAndFormatAmount = function(widgetId, formatData){
    var amount = widgetId.text;
    if(!this.isValidAmount(amount)){
      return false;
    }else{
      widgetId.text = this.formatCurrencyWithCommas(amount, true, "", formatData);
      return true;
    }
  };

   /**
      validateAndFormatAmount: Validates the amount in the given amount field reference and then formats it if the amount is valid.
      */
  UnifiedTransfersUtility.prototype.removeCurrencyWithCommas = function(widgetId){
    var amount = widgetId.text;
    if(amount === undefined || amount === null || amount === ""){
      return false;
    }else{
      widgetId.text = this.formatUtil.deFormatAmount(amount);
      return true;
    }
  };

  /**
   isValidAmount : Method to validat amount field
         */
  UnifiedTransfersUtility.prototype.isValidAmount = function(amount) {
    return amount !== undefined && amount !== null && !isNaN(amount) && amount !== "";
  };

  /**
      formatCurrencyWithCommas - Returns formatted amount string. Adds commas and currency symbol to a given amount string.
      */
  UnifiedTransfersUtility.prototype.formatCurrencyWithCommas = function(amount, currencySymbolNotRequired, currencySymbolCode, formatData){
    amount = this.formatUtil.deFormatAmount(amount);
    if (currencySymbolNotRequired) {
      return this.formatUtil.formatAmount(amount,formatData);
    } else if(currencySymbolCode){
      return this.formatUtil.formatAmountandAppendCurrencySymbol(amount,currencySymbolCode,formatData);
    } else {
      return this.formatUtil.formatAmountandAppendCurrencySymbol(amount,"",formatData);
    }
  };
  /**
     * @api : readObject
     * Helper method to parse the backend response.
     * @param : obj{JSONArray} - object containing any value
     * @param : jsonPath{String} - jsonPath traversed till the search field is reachable
     * @return : NA
     */
  UnifiedTransfersUtility.prototype.readObject = function(obj, jsonPath) {
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
  
  /**
  * check whether given Account number is valid
  * @param {String} accNumber- accNumber to validate
  * @returns {Boolean} - true if valid, false if invalid
  */
     UnifiedTransfersUtility.prototype.isValidAccountNumber = function(accNumber){
    if(isNaN(accNumber) || accNumber === null || accNumber.length<=0 || accNumber == undefined || accNumber.length>24 ){
      return false;
    }
    else {
      return true;
    }
  };
  
  /**
  * check whether given IBAN is valid
  * @param {String} iban- IBAN to validate
  * @returns {Boolean} - true if valid, false if invalid
  */
  UnifiedTransfersUtility.prototype.isValidIBAN = function(iban) {
    iban = iban.replace(/\s/g, '');
    if (!iban.match(/^[\dA-Z]+$/))
      return false;
    var ibanLen = {
      NO:15, BE:16, DK:18, FI:18, FO:18, GL:18, NL:18, MK:19,
      SI:19, AT:20, BA:20, EE:20, KZ:20, LT:20, LU:20, CR:21,
      CH:21, HR:21, LI:21, LV:21, BG:22, BH:22, DE:22, GB:22,
      GE:22, IE:22, ME:22, RS:22, AE:23, GI:23, IL:23, AD:24,
      CZ:24, ES:24, MD:24, PK:24, RO:24, SA:24, SE:24, SK:24,
      VG:24, TN:24, PT:25, IS:26, TR:26, FR:27, GR:27, IT:27,
      MC:27, MR:27, SM:27, AL:28, AZ:28, CY:28, DO:28, GT:28,
      HU:28, LB:28, PL:28, BR:29, PS:29, KW:30, MU:30, MT:31
    };
    var len = iban.length;
    if (len != ibanLen[iban.substr(0,2)])
      return false;
    var ibanNum,ibanMod;
    iban = iban.substr(4) + iban.substr(0,4);
    for (ibanNum='', i=0; i<len; i+=1)
      ibanNum+=parseInt(iban.charAt(i),36);
    for (ibanMod=ibanNum.substr(0,15)%97, ibanNum=ibanNum.substr(15); ibanNum; ibanNum=ibanNum.substr(13))
    ibanMod=(ibanMod+ibanNum.substr(0,13))%97;
    return ibanMod == 1;
  };
  
  return UnifiedTransfersUtility;
});