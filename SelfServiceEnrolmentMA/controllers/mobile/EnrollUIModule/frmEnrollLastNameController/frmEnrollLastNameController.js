define({
  timerCounter:0,
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  frmEnrollLAstNamePreShow : function(){
    this.setFlowAction();
    this.setPreShowData();
    this.view.tbxLastName.setFocus(true);
    this.setButtonPosition({isKeypadOpen: false});
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
  },
  setFlowAction  : function(){
    var scopeObj = this;
    this.view.customHeaderNew.flxBack.onTouchEnd = function(){
      scopeObj.navBack();
    };
    this.view.customHeaderNew.btnCancel.onClick = function(){
      scopeObj.onClickCancel();
    };
    this.view.tbxLastName.onTextChange = function(){
      var text = scopeObj.view.tbxLastName.text;
      if(text === "" || text === undefined){
        scopeObj.view.btnContinue.skin = "sknBtnOnBoardingInactive";
        scopeObj.view.btnContinue.setEnabled(false);
      }else{
        scopeObj.view.btnContinue.skin = "sknBtn0095e426pxEnabled";
        scopeObj.view.btnContinue.setEnabled(true);
      }
    };
    this.view.tbxLastName.onTouchEnd = this.setButtonPosition.bind(scopeObj, {isKeypadOpen: true});
    this.view.tbxLastName.onBeginEditing = this.setButtonPosition.bind(scopeObj, {isKeypadOpen: true});
    this.view.tbxLastName.onDone = this.setButtonPosition.bind(scopeObj, {isKeypadOpen: false});
    this.view.btnContinue.onClick = function(){
      scopeObj.validateLastName();
    };
  },
  setPreShowData  : function(){
    var locale  = kony.i18n.getCurrentLocale();
    if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
      this.view.flxHeader.isVisible=false;
      this.view.flxMainContainer.top ="0dp";
    }else{
      this.view.flxHeader.isVisible=true;
      this.view.flxMainContainer.top ="56dp";
    }
    this.view.tbxLastName.skin = "sknTbx424242SSPRegular28px";
 //   this.view.tbxLastName.focusSkin = "tbxBlueFocus";
    this.view.tbxLastName.setFocus(true);
    var scope = this;
    this.view.customHeaderNew.lblScreenName.text = "Last Name";
    this.view.customHeaderNew.lblScreenName.skin="sknLblffffffSSPReg36pxop100";
    var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('EnrollUIModule');
    var userlastname = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('NewUserBusinessManager').businessController.getEnrollObject().LastName;
    if(userlastname !== null && userlastname !== "" && userlastname !== undefined){
      this.view.tbxLastName.text = userlastname;
      this.view.btnContinue.skin = "sknBtn0095e426pxEnabled";
      this.view.btnContinue.setEnabled(true);
    }
    else{
      this.view.tbxLastName.text = "";
      this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
      this.view.btnContinue.setEnabled(false);
    }
    if (locale == "ar_AE") {
     this.view.customHeaderNew.imgBack.src = "backbutton_reverse.png";
     this.view.lblInfo.top="13px";
    }else if (locale == "en_US" || locale == "en") {
      this.view.customHeaderNew.imgBack.src = "backbutton.png";
      this.view.lblInfo.top="8px";
    }
//     this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
//     this.view.btnContinue.setEnabled(false);
  },
  setButtonPosition: function({isKeypadOpen}){
    this.view.flxButtonContainer.reverseLayoutDirection = !isKeypadOpen;
  },
  navToSecurityCheck : function(){
    var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('EnrollUIModule');//kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
    enrollMod.presentationController.commonFunctionForNavigation("frmEnrollSecurityCheck");
  },
  onClickCancel : function(){
    var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('EnrollUIModule');//kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
    enrollMod.presentationController.resetEnrollObj();
  },
  navToDOB : function(){
    var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('EnrollUIModule');//kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
    enrollMod.presentationController.commonFunctionForNavigation("frmEnrollDOB");
  },
  navBack : function(){
    const navManager = applicationManager.getNavigationManager();
    navManager.navigateTo({"appName" :"AuthenticationMA","friendlyName" : "AuthUIModule/frmLegalEntity"});
  },
  //development
  /**
  * validates Last Name
  */
  validateLastName : function(){
    var lastName = this.view.tbxLastName.text;
    if(lastName === '' || lastName === null || lastName === undefined){
      this.bindViewError(applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.invalidLastName"));
    }
    else{
      var enrollMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('EnrollUIModule');//kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "EnrollUIModule", "appName": "SelfServiceEnrolmentMA"});
      enrollMod.presentationController.navigateToFrmEnrollSSN(lastName);
    }
  },
  /**
  *Shows Toast Message with red skin
  */
  bindViewError : function(msg)
  {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getDataProcessorUtility().showToastMessageError(this,msg);
  },
});