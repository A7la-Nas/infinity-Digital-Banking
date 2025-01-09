define({
 //Type your controller code here
  init : function(){
  },
  preShow : function(){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  postShow : function(){
    var authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
    var sm = applicationManager.getStorageManager();
    var config = applicationManager.getConfigurationManager();
    var langObjFromStorage = sm.getStoredItem("langObj");
    if(langObjFromStorage.flow === config.constants.LANG_CHANGE_FROM_LOGIN)
    	authMod.presentationController.onLanguageChange();
    else
      authMod.presentationController.onLanguageChangeFromSettings();
  }
 });