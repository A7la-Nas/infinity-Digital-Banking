define(['SCAUtility'],function(SCAUtility){ 
  return{
  PROVISION_STARTED  : 1,
  PROVISION_FINISHED : 2,
  PROVISION_FAILED   : 0,
  PROVISION_ERROR    : -1,
  PIN_REQUEST        : 100,
  //Type your controller code here 
  preShowEnterPin: function(){
    this.resetUI();
    this.setFlowActions();
    this.view.postShow = this.postShow;
    this.view.init=this.init;
  },
  init:function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  postShow: function(){
    this.view.tbxCurrentPin.setFocus(true);
  },
  setFlowActions: function(){
    let scopeSCA = this;
    scopeSCA.view.customHeader.flxBack.onClick = function() {
      applicationManager.getPresentationUtility().showLoadingScreen();
      var navMan=applicationManager.getNavigationManager();
      navMan.goBack();
    };
    this.view.flxCurrentPinToggle.onTouchEnd = function(){
      scopeSCA.pinVisiblityToggle(scopeSCA.view.imgCurrentPinVisiblityToggle, scopeSCA.view.tbxCurrentPin);
    };
    this.view.tbxCurrentPin.onTextChange=this.enableorDisableContinueButton;
    this.view.btnContinue.onClick = function(){
      scopeSCA.onClickContinue();
    };
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  enableorDisableContinueButton: function(){
    let iscurrentPinEntered = (this.view.tbxCurrentPin.text!=='' && this.view.tbxCurrentPin.text!==null && this.view.tbxCurrentPin.text!==undefined) ? true : false;      if(iscurrentPinEntered){
      this.view.btnContinue.setEnabled(true);
      this.view.btnContinue.skin = "sknBtn0095e426pxEnabled";
      //this.view.flxPinPasswordPolicy.setVisibility(false);
    } else {
      this.view.btnContinue.setEnabled(false);
      this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
      //this.view.flxPinPasswordPolicy.setVisibility(true);
    }
    this.view.flxErrorPin.setVisibility(false);
  },
  resetUI: function(){
    if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
      this.view.customHeader.isVisible = false;
    }else{
      this.view.customHeader.isVisible = true;
    }
    this.view.flxMainContainer.setVisibility(true);
    this.view.flxErrorPin.setVisibility(false);
    this.view.flxPinPasswordPolicy.setVisibility(false);
    this.view.tbxCurrentPin.secureTextEntry = true;
    this.view.btnContinue.setEnabled(false);
    this.view.btnContinue.skin = "sknBtna0a0a0SSPReg26px";
    this.view.tbxCurrentPin.text="";
    this.view.imgCurrentPinVisiblityToggle.src = "viewicon.png"
    // this.view.rtxRulesPin.text = "Pin must be "+this.PIN_MIN_LENGTH+" digits in length";
    this.view.forceLayout();
  },

  pinVisiblityToggle: function(img, tbx){
    if (img.src === "viewicon.png") {
      img.src = "viewactive.png";
      tbx.secureTextEntry =  false;
    } else {
      img.src = "viewicon.png";
      tbx.secureTextEntry = true;
    }
    this.view.forceLayout();
  },

  validatePin: function(){
    let pin = this.view.tbxNewPin.text;
    var pinRegex = new RegExp("^\\d{"+ this.PIN_MIN_LENGTH +","+this.PIN_MAX_LENGTH+"}$");
    if(pinRegex.test(pin.trim())){
      return true;
    }else{
      return false;
    }
  },
  onClickContinue : function(){
    // TODO: Flow needs to be changed.
    //scopeObj.navigateToScreen(2);
    var scopeObj=this;
    this.view.flxErrorPin.setVisibility(false);
    applicationManager.getPresentationUtility().showLoadingScreen();
    let userManager = applicationManager.getUserPreferencesManager();
    let userName = userManager.getUserObj().userName;
    var navManager = applicationManager.getNavigationManager();
    if(navManager.getEntryPoint("CapturePinForSCA")=="frmPreferencesTouchIdHID"){
      var isDeviceFaceIDAvailable=""
      if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
        var isDeviceFaceIDAvailable= this.view.sdk.isFaceIDSupport();
      }
      var isDeviceBiometricAvailable= scopeObj.view.sdk.isDeviceBiometricAvailable();
      if(isDeviceBiometricAvailable|| isDeviceFaceIDAvailable){
        var basicConfig={
          "alertIcon":"alert.png",
          "alertType": constants.ALERT_TYPE_CONFIRMATION,
          "alertTitle": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.sca.EnableBioMetricHeader"),
          "yesLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.enable"),
          "noLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.notnow"),
          "message": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.sca.EnableBioMetricMessage"),
          "alertHandler": scopeObj.enableBioMetric
        };
        var pspConfig = {
          "contentAlignment": constants.ALERT_CONTENT_ALIGN_CENTER
        };
        applicationManager.getPresentationUtility().showAlertMessage(basicConfig,pspConfig);
      }
      else{

        scopeObj.navigateBasedOnFlowType();
      }

    }
  },
  enableBioMetric: function(response){
    var scopeSCA=this;
    const userManager = applicationManager.getUserPreferencesManager();
    const userName = userManager.getUserObj().userName;
    if(response===true){
      scopeSCA.view.sdk.enableBiometricAuthentication(userName,this.view.tbxCurrentPin.text,getEnrollmentStatusCallBack);
    }
    else{
      //scopeSCA.navigateBasedOnFlowType();
    }
    function getEnrollmentStatusCallBack(res){
      if(SCAUtility.SDKConstants.BIOMETRICS_ENABLED == res){
        //scopeObj.invokeBioMetric();
        scopeSCA.navigateBasedOnFlowType("Success");         
      }
      else{
        if(SCAUtility.SDKConstants.BIOMETRICS_NOTVALID==res){
        applicationManager.getDataProcessorUtility().showToastMessageError(scopeSCA,applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.sca.EnterValidPin"));
        }
      }
    }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  invokeBioMetric : function(){
    var scopeSCA=this;
    scopeSCA.view.sdk.setBiometricPrompt(scopeObj.userId,getBioMetricStatus);
    function getBioMetricStatus(res){
      if(SCAUtility.SDKConstants.BIOMETRICS_SUCCESS){
        scopeSCA.navigateBasedOnFlowType();
      }
      else{
        scopeSCA.navigateBasedOnFlowType();
      }
    }
  },
  showErrorMsg: function(error){
    this.view.lblErrorPin.text = error;
    this.view.flxErrorPin.setVisibility(true);
    this.view.forceLayout();
  },

  navigateToPrevScreen: function(){
    var navMan = applicationManager.getNavigationManager();
    navMan.goBack();
  },

  getStringFromi18n: function(stringValue){
    return  kony.i18n.getLocalizedString(stringValue) ? kony.i18n.getLocalizedString(stringValue) : stringValue;
  },
  navigateBasedOnFlowType : function(state){
    var settingsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"SettingsUIModule","appName":"ManageProfileMA"});
    var flowType = settingsModule.presentationController.getSCAEnterPinFlowType();
    var navManager = applicationManager.getNavigationManager();
    if(navManager.getEntryPoint("CapturePinForSCA")=="frmPreferencesTouchIdHID"){
      if(state=="Success"){
        var tempData = settingsModule.presentationController.getAuthModeData();
        var deviceUtilManager = applicationManager.getDeviceUtilManager();
        var isIphone = deviceUtilManager.isIPhone();
        if(flowType=="EnableBioMetric"){
        if(isIphone)
          tempData.popUpMsg = kony.i18n.getLocalizedString("kony.mb.Touch.Id.is.set.a.Default.Login");
        else
          tempData.popUpMsg = kony.i18n.getLocalizedString("kony.mb.devReg.defaultSignInChanged");
        }
        else if(flowType=="EnableFaceID"){
          tempData.popUpMsg = kony.i18n.getLocalizedString("kony.mb.Face.Id.is.set.as.Default.Login");
        }
        navManager.setCustomInfo("frmPreferencesDefaultLogin",tempData);
      }
      settingsModule.presentationController.setSCAEnterPinFlowType("");
      settingsModule.presentationController.commonFunctionForNavigation({"appName": "ManageProfileMA","friendlyName": "SettingsHIDUIModule/frmPreferencesDefaultLoginHID"});
    }
  }
  }
});