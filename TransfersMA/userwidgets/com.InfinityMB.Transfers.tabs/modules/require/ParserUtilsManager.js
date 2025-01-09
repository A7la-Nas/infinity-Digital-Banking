/**
 * Utility manager extract 
 *
 * @author KH2144
 * @author KH2348
 */
define(function () {

  /**
   * Constructor
   */
  function ParserUtilsManager(){
    this.unicode = {};
    this.context={};
    this.breakPointConfig={};
    this.beneficiaryTypesConfig={};
  }

  /**
   * Set context object to ParserUtilityManager.
   *
   * @param {Object} context
   */
  ParserUtilsManager.prototype.setContext = function(context){
    this.context = context;
  };

  /**
   * Set responseData to its unicode.
   *
   * @param {String} unicode
   * @param {Object} responseData
   */
  ParserUtilsManager.prototype.setResponseData = function(unicode,responseData){
    this.unicode[unicode] = responseData;
  }
  
  ParserUtilsManager.prototype.setbreakPointConfig = function(breakPointConfig){
    this.breakPointConfig = breakPointConfig;
  };

  ParserUtilsManager.prototype.setbeneficiaryTypesConfig = function(beneficiaryTypesConfig){
    this.beneficiaryTypesConfig = beneficiaryTypesConfig;
  };
  
  ParserUtilsManager.prototype.getcomponentConfigValue = function(value,selectedtype){
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
      if(count == Object.keys(value).length){
        return value["default"];
      }
    }
    return value;
  };

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
      if(JSONValue && Object.keys(JSONValue).length > 0){
        return JSON.stringify(this.processJSON(JSONValue));
      }
    }
    catch(e){ 
    }
    return this.checkPatternPresent(value);
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
   * Parse String, add substrings with decorator pattern into an array and replace wach pattern with actual value.
   *
   * @param {String} text
   * 
   * @return {String} - value for string
   */
  ParserUtilsManager.prototype.checkPatternPresent = function(text){ 
    var parseStr = text;
    var delimiters="i$";
    var regex = new RegExp("{[["+delimiters+"\].+?}","g");
    var decoratorArray = parseStr.match(regex);
    if(decoratorArray){
      for(var i = 0; i < decoratorArray.length; i++){
        parseStr = parseStr.replace(decoratorArray[i],this.identifyPattern(decoratorArray[i]));
      }
    }
    return parseStr;
  };
  
  /**
   * Identify the pattern in the string.
   *
   * @param {String} text
   * 
   * @return {String} - value for string
   */
  ParserUtilsManager.prototype.identifyPattern = function(text){
    //Check if text is an i18n
    if(text.indexOf("{i.") != -1){
      return this.geti18nText(text.substring(text.indexOf("{i.")+3,text.length-1));
    }
    //Check if text is having a unicode
    else if(text.indexOf("{$.") != -1){
      var unicode = text.substring(3,text.indexOf(".",3))
      var valueStartIndex = text.indexOf(".",3)+1;
      // Differentiating the unicode between context and response data.
      if(unicode == "c"){
        return this.getContextValue(text.substring(valueStartIndex,text.length-1));
      }
      else{
        return this.getResponseValue(text.substring(valueStartIndex,text.length-1),unicode);
      }
    }
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
      if(i18ntext !== "" && i18ntext !== undefined && i18ntext !== null){
        return i18ntext;
      }
    }catch(e){
      
    }
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
      context = this.context[text];
      if(context != "" && context != undefined && context != null){
        return context;
      }
    }catch(e){
      
    }
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
      if(responseValue != "" && responseValue != undefined && responseValue != null){
      	return responseValue;
      }
    }catch(e){
      
    }
    return text;
  };
  
  return ParserUtilsManager;
});