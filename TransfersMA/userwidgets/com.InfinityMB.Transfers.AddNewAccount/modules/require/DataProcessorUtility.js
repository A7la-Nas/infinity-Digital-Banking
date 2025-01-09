/**
*@module DataProcessorUtility
*/
define([], function() {
  /**
   * Data processor utility provides apis for common data processing across the app
   *@alias module:DataProcessorUtility
   *@class
   */
  function DataProcessorUtility(){
    /**@member {Integer}  a global count for timer*/
    this.timerCounter = 0;
  }
  // inheritsFrom(DataProcessorUtility, kony.mvc.Business.Delegator);
  // DataProcessorUtility.prototype.initializeBusinessController = function(){};
  /**
  * A UI function to display a generic error toast message (i18n conversion is not done in this function. A converted localised string is to be given)
  * @param {scope} scope - scope of current  controller(generally "this")
  * @param {String} msg  - a msg to be displayed
  * @param {function} callBack - a callback function defined in given scope
*/
  DataProcessorUtility.prototype.showToastMessageError = function(scope, msg, func)
  {
    if(scope && scope.view && scope.view.flxPopup){
      this.showToast("sknflxff5d6e", "errormessage.png", msg,func,scope);
    }
  };
  /**
  * A UI function to display a generic success toast message (i18n conversion is not done in this function. A converted localised string is to be given)
  * @param {scope} scope - scope of current  controller(generally "this")
  * @param {String} msg  - a msg to be displayed
  * @param {function} callBack - a callback function defined in given scope
*/
  DataProcessorUtility.prototype.showToastMessageSuccess = function(scope, msg , func)
  {
    if(scope && scope.view && scope.view.flxPopup){
      this.showToast("sknFlxBg43ce6eTab", "confirmation.png", msg,func,scope);
    }
  };
  /** Tost Messages util*/
  DataProcessorUtility.prototype.showToast = function(skin, image, message,func,scope) {
    var deviceName= kony.os.deviceInfo()["name"];
    if(deviceName === "iPhone")
    {
      if (scope.view.flxMainContainer != null || scope.view.flxMainContainer != undefined) {
        scope.view.flxMainContainer.top = "65dp";
      }
      if (scope.view.titleBarAttributes != null || scope.view.titleBarAttributes != undefined) {
        var titleBarAttributes = scope.view.titleBarAttributes;
        titleBarAttributes["navigationBarHidden"] = true;
        scope.view.titleBarAttributes = titleBarAttributes;
        titleBarAttributes["navigationBarHidden"] = false;
      }
    }
    scope.view.flxPopup.isVisible = true;
    if (this.timerCounter == undefined || this.timerCounter == null)
      this.timerCounter = 0;
    this.timerCounter=parseInt(this.timerCounter)+1;
    var timerId="timerPopupSuccess"+this.timerCounter;
    scope.view.flxPopup.skin = "" + skin;
    scope.view.customPopup.imgPopup.src = "" + image;
    scope.view.customPopup.lblPopup.text = message;
    try{
      kony.print(timerId);
      kony.timer.schedule(timerId, function() {
        scope.view.flxPopup.isVisible = false;
        if (deviceName === "iPhone") {
          if (scope.view.flxMainContainer != null || scope.view.flxMainContainer != undefined) {
            scope.view.flxMainContainer.top = "0dp";
          }
          if (scope.view.titleBarAttributes != null || scope.view.titleBarAttributes != undefined) {
            scope.view.titleBarAttributes = titleBarAttributes
          }
        }
        if(!(func === null || func === undefined))
          func.call(scope);
      }, 5, false);
    }
    catch(e)
    {
      kony.print(timerId);
      kony.print(e);
    }
  };
  return DataProcessorUtility;
});