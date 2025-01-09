define({
   timerCounter : 0,
   init : function(){
     var FormValidator = require("FormValidatorManager");
     this.fv = new FormValidator(1);
     var navManager = applicationManager.getNavigationManager();
     var currentForm=navManager.getCurrentForm();
     applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
   },
   frmEnrollLAstNamePreShow : function(){
     this.setFlowAction();
     this.setPreShowData();
     this.updateOldUserName();
     this.view.flxSecurityRequirementsUsername.setVisibility(false);
     this.fv.submissionView(this.view.btnContinue);
     var navManager = applicationManager.getNavigationManager();
     var userdata = navManager.getCustomInfo("frmProfileUsername");
     this.view.rtxRulesPwd.text = userdata.usernamePolicy;
     var currentForm=navManager.getCurrentForm();
     applicationManager.getPresentationFormUtility().logFormName(currentForm);
     applicationManager.getPresentationUtility().dismissLoadingScreen();
     var deviceManager = applicationManager.getDeviceUtilManager();
    deviceManager.detectDynamicInstrumentation();
   },
  validateTheUserName : function(){
    var text = this.view.tbxUsername.text;
//     this.hideFlxRequirementsUsername();
    this.showFlxSecurityRequirementsUsername();
    this.fv.checkAndUpdateStatusForNull(0, text);
  },
  setFlowAction  : function(){
    var scopeObj = this;
    this.view.customHeader.flxBack.onClick = function(){
      var navManager = applicationManager.getNavigationManager();
      navManager.goBack();
    };
    this.view.customHeader.btnRight.onClick = function(){
      scopeObj.navToSettings();
    };
    this.view.btnContinue.onClick = function(){
      scopeObj.onUpdateClick();
      //scopeObj.navToSettingUpdated();
    };
    this.view.tbxUsername.onTextChange = function(){
      scopeObj.validateTheUserName();
    };
    this.view.tbxUsername.onTouchStart = function(){
      if(scopeObj.view.flxSecurityRequirementsUsername.isVisible === false){
      scopeObj.hideFlxRequirementsUsername();
      }
    };
  },
  setPreShowData  : function(){
    this.view.tbxUsername.text = "";
    this.view.flxSecurityRequirementsUsername.setVisibility(false);
    this.view.tbxUsername.setFocus(true);
    var scope = this;
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
      this.view.flxMainContainer.top = "56dp";
    }
    else{
      this.view.flxHeader.isVisible = false;
      this.view.flxMainContainer.top = "0dp";
    }
  },
  navToSettings : function(){
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    settingsMod.presentationController.commonFunctionForNavigation("frmSettings");
  },
  navToSettingUpdated : function(){
  },
  updateOldUserName : function(){
    var navManager = applicationManager.getNavigationManager();
    var data = navManager.getCustomInfo('frmProfileUsername');
    this.view.lblPreviousUsername.text = data.userName;
  },
  onUpdateClick : function(){
    var updatedUserName = this.view.tbxUsername.text;
    if(updatedUserName === null || updatedUserName === undefined || updatedUserName.length < 1){
      var i18n_msg = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.enroll.usernameEmptyMsg","Please enter a valid username");
      this.bindViewError(i18n_msg);
      this.showFlxSecurityRequirementsUsername();
      return;
    }
//     var validationUtility = applicationManager.getValidationUtilManager();
//     validationUtility.isUsernameValidForPolicy(res.passwordrules);
//     var validationManager = applicationManager.getValidationUtilManager();
//     if(validationManager.isValidUserName(updatedUserName) === false){
//        var i18nMsg1 = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.OnBoarding.invalidusername", "Please enter a valid username");
//       this.bindViewError(i18nMsg1);
//       this.showFlxSecurityRequirementsUsername();
//       return;
//     }
    var settings = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    var stepData = settings.presentationController.updateUserName(updatedUserName);
    //this.hideFlxRequirementsUsername();
  },
  bindViewError : function(msg){
    applicationManager.getDataProcessorUtility().showToastMessageError(this, msg);
  },
  showFlxSecurityRequirementsUsername: function() {
         //this.isPasswordValid = false;
     if(this.view.flxSecurityRequirementsUsername.isVisible == false)
         this.view.flxSecurityRequirementsUsername.isVisible = true;
        /* if (this.view.flxSecurityRequirementsUsername.height !== "190dp") {
             this.view.flxSecurityRequirementsUsername.animate(
                 kony.ui.createAnimation({
                     "0": {
                         "anchorPoint": {
                             "x": 0.5,
                             "y": 0.5
                         },
                         "stepConfig": {
                             "timingFunction": kony.anim.EASE
                         },
                         "rectified": true,
                         "height": "0dp",
                     },
                     "100": {
                         "anchorPoint": {
                             "x": 0.5,
                             "y": 0.5
                         },
                         "stepConfig": {
                             "timingFunction": kony.anim.EASE
                         },
                         "rectified": true,
                         "height": "190dp",
                     }
                 }), {
                     "delay": 0,
                     "iterationCount": 1,
                     "fillMode": kony.anim.FILL_MODE_FORWARDS,
                     "duration": 0.5
                 }, {
                     "animationEnd": function() {}
                 });
         } */
     },
   // utitlity function to hide password rules
     hideFlxRequirementsUsername: function() {
         var scope = this;
       this.view.flxSecurityRequirementsUsername.isVisible = false;
        /* if (this.view.flxSecurityRequirementsUsername.height !== "0dp") {
             this.view.flxSecurityRequirementsUsername.animate(
                 kony.ui.createAnimation({
                     "0": {
                         "anchorPoint": {
                             "x": 0.5,
                             "y": 0.5
                         },
                         "stepConfig": {
                             "timingFunction": kony.anim.EASE
                         },
                         "rectified": true,
                         "height": "190dp",
                     },
                     "100": {
                         "anchorPoint": {
                             "x": 0.5,
                             "y": 0.5
                         },
                         "stepConfig": {
                             "timingFunction": kony.anim.EASE
                         },
                         "rectified": true,
                         "height": "0dp",
                     }
                 }), {
                     "delay": 0,
                     "iterationCount": 1,
                     "fillMode": kony.anim.FILL_MODE_FORWARDS,
                     "duration": 0.5
                 }, {
                     "animationEnd": function() {
                         scope.view.flxSecurityRequirementsUsername.isVisible = true;
                     }
                 });
         } */
     },
});