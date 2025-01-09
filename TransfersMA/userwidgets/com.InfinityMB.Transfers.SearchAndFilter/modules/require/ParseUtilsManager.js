define(function () {

  function ParserUtilsManager(){
    this.unicode = {};
    this.context={};
  }
  ParserUtilsManager.prototype.setContext = function(context){
    this.context = context;
  };

  ParserUtilsManager.prototype.setResponseData = function(unicode,responseData){
    this.unicode[unicode] = responseData;
  }
  
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
  
  ParserUtilsManager.prototype.processJSON = function(JSONValue){
    for(var key in JSONValue){
      JSONValue[key] = this.getParsedValue(JSONValue[key]);
    }
    return JSONValue;
  };
  
  ParserUtilsManager.prototype.getParsedText = function(text){
    var parseStr = text;
    var delimiters="i$"
    var regex = new RegExp("{[["+delimiters+"\].+?(}{1,})","g")
    var decoratorArray = parseStr.match(regex);
    if(decoratorArray){
      for(var i = 0; i < decoratorArray.length; i++){
        parseStr = parseStr.replace(decoratorArray[i],this.getDecoratorText(decoratorArray[i]));
      }
    }
    return parseStr;
  };
  
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
  ParserUtilsManager.prototype.getContextValue = function(text){
    var context = "";
    try{
      let parsedText = this.getParsedValue(text);
      context = this.context[parsedText];
      if(!context){
        context = this.context[parsedText];
      }
    }catch(e){
      
    }
    if(context != "" && context != undefined && context != null)
      return context;
    return "";
  };
  ParserUtilsManager.prototype.getResponseValue = function(text,unicode){
    var responseValue = ""
    try{
      responseValue = this.unicode[unicode][this.getParsedValue(text)];
    }catch(e){
      
    }
    if(responseValue != "" && responseValue != undefined && responseValue != null)
      return responseValue;
    return "";
  };
  
  return ParserUtilsManager;
});