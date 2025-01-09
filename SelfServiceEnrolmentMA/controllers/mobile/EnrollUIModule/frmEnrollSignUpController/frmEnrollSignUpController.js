define({
  timerCounter:0,
  init : function(){
    var FormValidator = require("FormValidatorManager")
	this.fv = new FormValidator(3);
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  preShow : function(){
    //this.view.btnContinueSignUp.onClick()
    this.view.txtEnterUsername.setFocus(true);
    this.fv.submissionView(this.view.btnContinueSignUp);
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
      this.view.flxMainContainer.top = "56dp";
    }
    else{
      this.view.flxHeader.isVisible = false;
      this.view.flxMainContainer.top = "0dp";
    }
    var scope = this;
    scope.hideFlxRequirements();
    scope.hideFlxRequirementsUsername();
    scope.view.customHeader.flxBack.onClick = this.goback;
    scope.view.txtPassword.onEndEditing = function(){
     scope.txtPasswordOnEndEditing();
    };
    scope.view.flxPwdVisiblityToggle.onClick = function(){
      scope.imgPwdVisiblityToggleOnClick();
    };
    scope.view.txtPassword.onTextChange = function(){
      scope.txtReEnterPassOnTextChange();
      scope.validatePassword();
    };
    scope.view.txtPassword.onTouchStart = function(){
      if(scope.view.flxSecurityRequirementsUsername.isVisible === false){
        scope.hideFlxRequirementsUsername();
      }
      else{
      }
      scope.hideFlxRequirements();
    };
    scope.view.txtEnterUsername.onTouchStart = function(){
      scope.hideFlxRequirementsUsername();
      scope.hideFlxRequirements();
    };
    scope.view.txtEnterUsername.onTextChange = function(){
      scope.validateUsername();
    };
    scope.view.txtReEnterPass.onTextChange = function () {
      scope.txtReEnterPassOnTextChange();
      scope.validateReenterPassword();
    };
//     scope.view.txtEnterUsername.onBeginEditing = function(){
//       scope.showFlxSecurityRequirementsUsername();
//     };
    scope.clearAllFields();
    scope.view.imgRenterPass.src = "tickmark.png";
    scope.view.imghideOrShowPwd.src = "view.png";
//	var authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "EnrollUIModule", "appName"
: "SelfServiceEnrolmentMA"})
//    var userdata  = authMod.presentationController.usernameRules;
//    var pwddata = authMod.presentationController.passwordRules;
	var navManager = applicationManager.getNavigationManager();
    var userdata = navManager.getCustomInfo("frmEnrollSignUp");
    scope.view.rtxRulesUsername.text = userdata.usernamePolicy;
    scope.view.rtxRulesPwd.text = userdata.passwordPolicy;
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },
  goback: function(){
      var navManager = applicationManager.getNavigationManager();
      if(navManager.getPreviousForm()=== "frmEnrollMFASecurityCode"){
        kony.print("back");
      } else {
      navManager.goBack();
       }
    },
  onClickCancel : function(){
    var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
    enrollMod.presentationController.resetEnrollObj();
  },
  clearAllFields : function(){
    this.view.txtEnterUsername.text = "";
    this.view.txtPassword.text = "";
    this.view.txtReEnterPass.text = "";
  },
  validateUsername :function(){
    var text = this.view.txtEnterUsername.text;
    this.fv.checkAndUpdateStatusForNull(0, text);
  },
  validatePassword:function(){
    var text = this.view.txtPassword.text;
    this.fv.checkAndUpdateStatusForNull(1, text);
  },
  validateReenterPassword : function(){
    var text = this.view.txtReEnterPass.text;
    this.fv.checkAndUpdateStatusForNull(2, text);
  },
  /**
  * Validates Password
  */
  txtPasswordOnEndEditing:function()
  {
    var password = this.view.txtPassword.text;
    if(password !== null && password !== '' && password !== undefined){
      var enrollModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
      enrollModule.presentationController.validatePassword(password);
    }
  },
  /**
  * Validates User Name
  */
  txtEnterUsernameOnEndEditing:function()
  {
    var userName = this.view.txtEnterUsername.text;
    if(userName !== null && userName !== '' && userName !== undefined){
      var validationManager = applicationManager.getValidationUtilManager();
      if(validationManager.isUsernameValidForPolicy(userName)){
        var enrollModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
        applicationManager.getPresentationUtility().showLoadingScreen();
        enrollModule.presentationController.checkAvailabilityOfUserName(userName);
      }
      else{
        this.showFlxSecurityRequirementsUsername();
      }
    }
    /*
    if(this.view.txtEnterUsername.text!=="user")
      {
        this.view.txtEnterUsername.skin="sknTbx424242SSPRegular26pxBerr";
        this.view.txtEnterUsername.focusSkin="sknTbx424242SSPRegular26pxBerr";
        var scopeObj=this;
        this.timerCounter=parseInt(this.timerCounter)+1;
        var timerId="timerPopupError"+this.timerCounter;
        this.view.flxPopup.skin = "sknFlxf54b5e";
        this.view.customPopup.imgPopup.src = "errormessage.png";
        this.view.customPopup.lblPopup.text = kony.i18n.getLocalizedString("kony.mb.enroll.usernameUnavailableMsg");
        this.view.flxPopup.setVisibility(true);
        kony.timer.schedule(timerId, function() {
            scopeObj.view.flxPopup.setVisibility(false);
            scopeObj.resetSkinsOfUsernameAndPwd();
            scopeObj.view.txtEnterUsername.text="";
            scopeObj.view.txtEnterUsername.setFocus(true);
        }, 1.5, false)
        this.view.flxSignUpContainer.forceLayout();
      }*/
  },
  resetSkinsOfUsernameAndPwd: function() {
    this.view.txtEnterUsername.skin = "sknTbx424242SSPRegular26px";
    this.view.txtPassword.skin = "sknTbx424242SSPRegular26px";
    this.view.txtReEnterPass.skin="sknTbx424242SSPRegular26px";
    this.view.txtEnterUsername.focusSkin = "tbxBlueFocus";
    this.view.txtPassword.focusSkin = "tbxBlueFocus";
    this.view.txtReEnterPass.focusSkin="tbxBlueFocus";
    this.view.flxSignUpContainer.forceLayout();
  },
  /**
  * Validates User Name and Password first and then calls CreateUser method from PresentationController.
  */
  btnContinueSignUpOnClick:function()
  {
    var userName = this.view.txtEnterUsername.text;
    var password = this.view.txtPassword.text;
    var enrollModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
    var validationManager = applicationManager.getValidationUtilManager();
    if(!(validationManager.isUsernameValidForPolicy(userName))){
      this.bindInvalidUserName();
      this.showFlxSecurityRequirementsUsername();
    }
    else if(password!==this.view.txtReEnterPass.text)
    {
      this.view.txtPassword.skin="sknTbx424242SSPRegular26pxBerr";
      this.view.txtReEnterPass.skin="sknTbx424242SSPRegular26pxBerr";
      this.view.txtPassword.focusSkin="tbxBlueFocus";
      this.view.txtReEnterPass.focusSkin="tbxBlueFocus";
      var scopeObj=this;
      this.timerCounter=parseInt(this.timerCounter)+1;
      var timerId="timerPopupError2"+this.timerCounter;
      this.view.flxPopup.skin = "sknFlxf54b5e";
      this.view.customPopup.imgPopup.src = "errormessage.png";
      this.view.customPopup.lblPopup.text = kony.i18n.getLocalizedString("kony.mb.enroll.passwordNotMatch");
      this.view.flxPopup.setVisibility(true);
      kony.timer.schedule(timerId, function() {
        scopeObj.view.flxPopup.setVisibility(false);
        scopeObj.resetSkinsOfUsernameAndPwd();
      }, 1.5, false)
      this.view.flxSignUpContainer.forceLayout();
    }
	else if(validationManager.isPasswordValidForPolicy(password)){
      applicationManager.getPresentationUtility().showLoadingScreen();
      enrollModule.presentationController.createUser(userName,password);
    }
    else{
      this.bindInvalidPassword();
    }
  },
  imgPwdVisiblityToggleOnClick: function() {
    if (this.view.imghideOrShowPwd.src === "view.png") {
      this.view.imghideOrShowPwd.src = "viewactive.png";
      this.view.txtPassword.secureTextEntry = false;
      this.view.flxSignUpContainer.forceLayout();
    } else {
      this.view.imghideOrShowPwd.src = "view.png";
      this.view.txtPassword.secureTextEntry = true;
      this.view.flxSignUpContainer.forceLayout();
    }
  },
  txtReEnterPassOnTextChange:function()
  {
    var pass = this.view.txtPassword.text;
    if(this.view.txtReEnterPass.text===pass)
    {
      if(pass !== "" && pass !== null && pass !== undefined){
        this.view.imgRenterPass.src="greentick.png";
      }
    }
    else
    {
      this.view.imgRenterPass.src="tickmark.png";
    }
    this.view.flxSignUpContainer.forceLayout();
  },
  //Development
  bindUserNameIsAvailable : function(){
	applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  /**
  * Shows Toast Message "User Name is not available"
  */
  bindUserNameIsNotAvailable : function(){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    this.bindViewError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.enroll.usernameUnavailableMsg"));
  },
   /**
  * Shows Toast Message "Please enter valid username"
  */
  bindInvalidUserName : function(){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    this.bindViewError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.OnBoarding.invalidusername"));
  },
  bindValidPassword : function(){
  },
  /**
  * Shows Toast Message "Please enter Valid Password"
  */
  bindInvalidPassword : function(){
    this.bindViewError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.invalidPassword"));
  },
  /**
  * Shows Toast Message with red skin
  */
  bindViewError : function(msg)
  {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getDataProcessorUtility().showToastMessageError(this,msg);
  },
  showFlxSecurityRequirements: function() {
         this.view.flxSecurityRequirements.isVisible = true;
       /*  if (this.view.flxSecurityRequirements.height !== "150dp") {
             this.view.flxSecurityRequirements.animate(
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
                         "height": "150dp",
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
     hideFlxRequirements: function() {
         var scope = this;
       this.view.flxSecurityRequirements.isVisible = false;
        /* if (this.view.flxSecurityRequirements.height !== "0dp") {
             this.view.flxSecurityRequirements.animate(
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
                         "height": "150dp",
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
                         scope.view.flxSecurityRequirements.isVisible = true;
                     }
                 });
         } */
},
  showFlxSecurityRequirementsUsername: function() {
         //this.isPasswordValid = false;
         this.view.flxSecurityRequirementsUsername.isVisible = true;
      /*   if (this.view.flxSecurityRequirementsUsername.height !== "190dp") {
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
       this.view.flxSecurityRequirementsUsername.isVisible = false;
         /*var scope = this;
         if (this.view.flxSecurityRequirementsUsername.height !== "0dp") {
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