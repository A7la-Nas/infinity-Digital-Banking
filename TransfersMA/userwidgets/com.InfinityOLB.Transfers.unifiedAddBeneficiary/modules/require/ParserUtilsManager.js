define(function () {

  /**
   * Constructor
   */
  function ParserUtilsManager(){
    this.unicode = {};
    this.context={};
    this.breakPointConfig={};
    this.beneficiaryTypesConfig={};
    this.flowTypeConfig={};
    this.frequencyTypesConfig={};
    this.occurrencyTypesConfig={};
    this.payeeTypesConfig={};
    this.accountTypesConfig={};
  }

  /**
   * Set context object to ParserUtilityManager.
   *
   * @param {Object} context
   */
  ParserUtilsManager.prototype.setContext = function(context){
    for(var key in context){
      this.context[key]=context[key];  
    }
  };

  /**
   * Clears context object to ParserUtilityManager.
   */
  ParserUtilsManager.prototype.clearContext = function(){
    this.context = {};
  };

  /**
   * Set context object to setBreakPointConfig.
   *
   * @param {Object} context
   */
  ParserUtilsManager.prototype.setBreakPointConfig = function(breakPointConfig){
    this.breakPointConfig = breakPointConfig;
  };

  /**
   * Set context object to setFrequencyTypeConfig.
   *
   * @param {Object} context
   */

  ParserUtilsManager.prototype.setFrequencyTypeConfig = function(frequencyTypesConfig){
    this.frequencyTypesConfig = frequencyTypesConfig;
  };
  /**
   * Set context object to setOccurrenceTypeConfig.
   *
   * @param {Object} context
   */

  ParserUtilsManager.prototype.setOccurrenceTypeConfig = function(occurrenceTypesConfig){
    this.occurrencyTypesConfig = occurrenceTypesConfig;
  };

  /**
   * Set context object to setPayeeTypeConfig.
   *
   * @param {Object} context
   */

  ParserUtilsManager.prototype.setPayeeTypeConfig = function(payeeTypesConfig){
    this.payeeTypesConfig = payeeTypesConfig;
  };

  /**
   * Set context object to setAccountTypeConfig.
   *
   * @param {Object} context
   */

  ParserUtilsManager.prototype.setAccountTypeConfig = function(accountTypesConfig){
    this.accountTypesConfig = accountTypesConfig;
  };
  /**
   * Set context object to setBeneficiaryTypeConfig.
   *
   * @param {Object} context
   */
  ParserUtilsManager.prototype.setBeneficiaryTypeConfig = function(beneficiaryTypesConfig){
    this.beneficiaryTypesConfig = beneficiaryTypesConfig;
  };

  /**
   * Set context object to setFlowTypeConfig.
   *
   * @param {Object} context
   */
  ParserUtilsManager.prototype.setFlowTypeConfig = function(flowTypeConfig){
    this.flowTypeConfig = flowTypeConfig;
  };

  /**
   * Set context object to setBreakPointConfig.
   *
   * @unicode{Object} 
   * @responseData {Object} 
   */
  ParserUtilsManager.prototype.setResponseData = function(unicode,responseData){
    this.unicode[unicode] = responseData;
  }

  /**
   * Identify the value is a JSON string or plain string.
   *
   * @param {String} value
   * 
   * @return {String} - value for string
   */
  ParserUtilsManager.prototype.getParsedValue = function(value){
    var JSONValue = {}
    try{
      JSONValue = JSON.parse(value);
    }
    catch(e){

    }
    if(JSONValue && Object.keys(JSONValue).length > 0)
      return JSON.stringify(this.processJSON(JSONValue));
    return this.getParsedText(value);
  };

  /**
   * Parse JSON and replace the values in decorator pattern with actual values.
   *
   * @param {JSON} JSONValue
   * 
   * @return {JSON} - JSON with actual values
   */
  ParserUtilsManager.prototype.processJSON = function(JSONValue){
    for(var key in JSONValue){
      JSONValue[key] = this.getParsedValue(JSONValue[key]);
    }
    return JSONValue;
  };

  /**
   * Parse text and return appropriate string
   *
   * @param {JSON} JSONValue
   * 
   * @return {String} - parsed String
   */
  ParserUtilsManager.prototype.getParsedText = function(text){
    var parseStr = text;
    var delimiters="i$"
    var regex = new RegExp("{[["+delimiters+"\].+?}","g");
    var decoratorArray = parseStr.match(regex);
    if(decoratorArray){
      for(var i = 0; i < decoratorArray.length; i++){
        parseStr = parseStr.replace(decoratorArray[i],this.getDecoratorText(decoratorArray[i]));
      }
    }
    return parseStr;
  };

  /**
   * Parse decorator text and return appropriate string
   *
   * @param {JSON} JSONValue
   * 
   * @return {String} - value either from contet or from service response
   */
  ParserUtilsManager.prototype.getDecoratorText = function(decoratorText){
    if(decoratorText.indexOf("{i.") != -1)
      return this.geti18nText(decoratorText.substring(decoratorText.indexOf("{i.")+3,decoratorText.length-1));
    else if(decoratorText.indexOf("{$.") != -1){
      var unicode = decoratorText.substring(3,decoratorText.indexOf(".",3))
      var valueStartIndex = decoratorText.indexOf(".",3)+1;
      if(unicode == "c"){
        return this.getContextValue(decoratorText.substring(valueStartIndex,decoratorText.length-1));
      }
      else{
        return this.getResponseValue(decoratorText.substring(valueStartIndex,decoratorText.length-1),unicode);
      }
    }
  };

  /**
   * Parse value  and selectedType config and return value
   *
   * @value {JSON} 
    @selectedtype {JSON} 
   * 
   * @return {String} - parsed String
   */
  ParserUtilsManager.prototype.getComponentConfigParsedValue = function(value,selectedtype){
    var count=0;
    for(var key in value){
      count++;
      if(key.includes("$.BNFTYPES.")){
        var key2 = this.getBeneficiaryTypeValue(key.split("$.BNFTYPES.")[1]) 
        if(key2 == selectedtype){
          return value[key];
        }
      }
      if(key.includes("$.BREAKPTS.")){
        var key2 = this.getBreakPointValue(key.split("$.BREAKPTS.")[1]) 
        if(key2 == selectedtype){
          return value[key];
        }
      }
      if(key.includes("$.FLOWTYPES.")){
        var key2 = this.getFlowTypeValue(key.split("$.FLOWTYPES.")[1]) 
        if(key2 == selectedtype){
          return value[key];
        }
      }
      if(key.includes("$.FREQUENCYTYPES.")){
        var key2 = this.getFrequencyTypeValue(key.split("$.FREQUENCYTYPES.")[1]) 
        if(key2 == selectedtype){
          return value[key];
        }
      }
      if(key.includes("$.OCCURRENCETYPES.")){
        var key2 = this.getOccurrenceTypeValue(key.split("$.OCCURRENCETYPES.")[1]) 
        if(key2 == selectedtype){
          return value[key];
        }
      }
      if(key.includes("$.PAYEETYPES.")){
        var key2 = this.getPayeeTypeValue(key.split("$.PAYEETYPES.")[1]) 
        if(key2 == selectedtype){
          return value[key];
        }
      }
      if(key.includes("$.ACCOUNTTYPES.")){
        var key2 = this.getAccountTypeValue(key.split("$.ACCOUNTTYPES.")[1]) 
        if(key2 == selectedtype){
          return value[key];
        }
      }
      if(count == Object.keys(value).length){
        if(value.hasOwnProperty("default"))
          return value["default"];
        else
          return "";
      }
    }
  };

  /**
   * get breakpoint value for the Input.
   *
   * @param {String} text
   * 
   * @return {String} - beneficiaryType value for Input
   */
  ParserUtilsManager.prototype.getBreakPointValue = function(text){
    var breakPointConfigValue = "";
    try{
      breakPointConfigValue = this.breakPointConfig[text];
    }catch(e){
      kony.print(e);
    }
    if(breakPointConfigValue != "" && breakPointConfigValue != undefined && breakPointConfigValue != null)
      return breakPointConfigValue;
    return text;
  };

  /**
   * get beneficiaryType value for the Input.
   *
   * @param {String} text
   * 
   * @return {String} - beneficiaryType value for Input
   */
  ParserUtilsManager.prototype.getBeneficiaryTypeValue = function(text){
    var beneficiaryTypesConfigValue = "";
    try{
      beneficiaryTypesConfigValue = this.beneficiaryTypesConfig[text];
    }catch(e){
      kony.print(e);
    }
    if(beneficiaryTypesConfigValue != "" && beneficiaryTypesConfigValue != undefined && beneficiaryTypesConfigValue != null)
      return beneficiaryTypesConfigValue;
    return text;
  };

  /**
   * get flowType value for the Input.
   *
   * @param {String} text
   * 
   * @return {String} - flowType value for Input
   */
  ParserUtilsManager.prototype.getFlowTypeValue = function(text){
    var flowTypeConfigValue = "";
    try{
      flowTypeConfigValue = this.flowTypeConfig[text];
    }catch(e){
      kony.print(e);
    }
    if(flowTypeConfigValue != "" && flowTypeConfigValue != undefined && flowTypeConfigValue != null)
      return flowTypeConfigValue;
    return text;
  };

  /**
   * get frequency type value for the Input.
   *
   * @param {String} text
   * 
   * @return {String} - frequency type value for Input
   */
  ParserUtilsManager.prototype.getFrequencyTypeValue = function(text){
    var frequencyTypeConfigValue = "";
    try{
      frequencyTypeConfigValue = this.frequencyTypesConfig[text];
    }catch(e){
      kony.print(e);
    }
    if(frequencyTypeConfigValue != "" && frequencyTypeConfigValue != undefined && frequencyTypeConfigValue != null)
      return frequencyTypeConfigValue;
    return text;
  };


  /**
   * get occurrence type value for the Input.
   *
   * @param {String} text
   * 
   * @return {String} - occurrence type value for Input
   */
  ParserUtilsManager.prototype.getOccurrenceTypeValue = function(text){
    var occurrenceTypeConfigValue = "";
    try{
      occurrenceTypeConfigValue = this.occurrencyTypesConfig[text];
    }catch(e){
      kony.print(e);
    }
    if(occurrenceTypeConfigValue != "" && occurrenceTypeConfigValue != undefined && occurrenceTypeConfigValue != null)
      return occurrenceTypeConfigValue;
    return text;
  };

  /**
   * get payee type value for the Input.
   *
   * @param {String} text
   * 
   * @return {String} - payee type value for Input
   */
  ParserUtilsManager.prototype.getPayeeTypeValue = function(text){
    var payeeTypeConfigValue = "";
    try{
      payeeTypeConfigValue = this.payeeTypesConfig[text];
    }catch(e){
      kony.print(e);
    }
    if(payeeTypeConfigValue != "" && payeeTypeConfigValue != undefined && payeeTypeConfigValue != null)
      return payeeTypeConfigValue;
    return text;
  };

  /**
   * get account type value for the Input.
   *
   * @param {String} text
   * 
   * @return {String} - account type value for Input
   */
  ParserUtilsManager.prototype.getAccountTypeValue = function(text){
    var accountTypeConfigValue = "";
    try{
      accountTypeConfigValue = this.accountTypesConfig[text];
    }catch(e){
      kony.print(e);
    }
    if(accountTypeConfigValue != "" && accountTypeConfigValue != undefined && accountTypeConfigValue != null)
      return accountTypeConfigValue;
    return text;
  };
  /**
   * get i18n value for the String.
   *
   * @param {String} text
   * 
   * @return {String} - i18n value for string
   */
  ParserUtilsManager.prototype.geti18nText = function(text){
    var i18ntext = "";
    try{
      i18ntext = kony.i18n.getLocalizedString(text);
    }catch(e){

    }
    if(i18ntext != "" && i18ntext != undefined && i18ntext != null)
      return i18ntext;
    return text;
  };

  /**
   * get context value for the String.
   *
   * @param {String} text
   * 
   * @return {String} - context value for string
   */
  ParserUtilsManager.prototype.getContextValue = function(text){
    var context = "";
    try{
      context = this.context[text] ? this.context[text] : "";
    }catch(e){

    }
    if(context==="")
      return context;
    else if(context !== undefined && context !== null)
      return context;
    return text;
  };

  /**
   * get value from response data for the String.
   *
   * @param {String} text
   * 
   * @return {String} - value for string
   */
  ParserUtilsManager.prototype.getResponseValue = function(text,unicode){
    var responseValue = ""
    try{
      responseValue = this.unicode[unicode][text];
    }catch(e){

    }
    if(responseValue != "" && responseValue != undefined && responseValue != null)
      return responseValue;
    return text;
  };

  return ParserUtilsManager;
});