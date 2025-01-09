/**
 * Login form controller which will handle all login page UI changes
 * @module frmLoginController
 */
define(['FormControllerUtility', 'Deeplinking', 'ViewConstants', 'CommonUtilities','OLBConstants'], function(FormControllerUtility, Deeplinking, ViewConstants, CommonUtilities,OLBConstants) {
  return {
    postShow: function(){
      var config = applicationManager.getConfigurationManager();
      kony.i18n.setCurrentLocaleAsync(config.configurations.getItem("LOCALE"), function() {
        var previousForm = kony.application.getPreviousForm();
        var currentForm = kony.application.getCurrentForm();
        var OLBLogoutStatus = kony.store.getItem('OLBLogoutStatus');
        //var isUserLoggedin = kony.store.getItem('UserLoginStatus');
        if(previousForm && previousForm.id == "frmProfileManagement")
          applicationManager.getNavigationManager().navigateTo("frmProfileManagement");
        else if(OLBLogoutStatus && OLBLogoutStatus.isUserLoggedoutSuccessfully || (currentForm && currentForm.id == "frmLogout" ))
        {
          if(OLBLogoutStatus){
            // kony.store.setItem('UserLoginStatus',false);
            OLBLogoutStatus.isUserLoggedoutSuccessfully=false;
            applicationManager.getStorageManager().setStoredItem('OLBLogoutStatus', OLBLogoutStatus);
          }
          applicationManager.getNavigationManager().navigateTo("frmLogout"); 
        }
        else if(previousForm && previousForm.id === "frmProfileLanguage") 
        {
          if(config.configurations.getItem("LOCALE") === "ar_AE"){
            kony.application.setApplicationBehaviors({ 'rtlMirroringInWidgetPropertySetter': true });
          } else {
            kony.application.setApplicationBehaviors({ 'rtlMirroringInWidgetPropertySetter': false });
          }
          kony.application.destroyForm({
            "appName"     : "ManageProfileMA",
            "friendlyName": "frmProfileLanguage"
          }); 
          applicationManager.getNavigationManager().navigateTo({
            "appName"     : "ManageProfileMA",
            "friendlyName": "frmProfileLanguage"
          });
        }
        else{

          var scaType=CommonUtilities.getSCAType();
          if(scaType==1){
           kony.application.destroyForm("frmLoginHID"); 
            applicationManager.getNavigationManager().navigateTo("frmLoginHID");
          } else if(scaType==2){
           kony.application.destroyForm("frmLoginUniken"); 
            applicationManager.getNavigationManager().navigateTo("frmLoginUniken");
          } else {
            kony.application.destroyForm("frmLogin"); 
            applicationManager.getNavigationManager().navigateTo("frmLogin");  
          }
        }
      }, function() {});
    }
  };
});