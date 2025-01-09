define(['SCAUtility'],function(SCAUtility) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.PIN_MIN_LENGTH = 6;
      this.PIN_MAX_LENGTH = 8;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this, 'headerChangePinLblText', () => {
        return this._headerChangePinLblText;
      });
      defineSetter(this, 'headerChangePinLblText', value => {
        this._headerChangePinLblText = value;
      });
      defineGetter(this, 'headerBtnCancelText', () => {
        return this._headerBtnCancelText;
      });
      defineSetter(this, 'headerBtnCancelText', value => {
        this._headerBtnCancelText = value;
      });
      defineGetter(this, 'topMsgLblText', () => {
        return this._topMsgLblText;
      });
      defineSetter(this, 'topMsgLblText', value => {
        this._topMsgLblText = value;
      });
      defineGetter(this, 'currPinLblText', () => {
        return this._currPinLblText;
      });
      defineSetter(this, 'currPinLblText', value => {
        this._currPinLblText = value;
      });
      defineGetter(this, 'currPinTbxText', () => {
        return this._currPinTbxText;
      });
      defineSetter(this, 'currPinTbxText', value => {
        this._currPinTbxText = value;
      });
      defineGetter(this, 'newPinLblText', () => {
        return this._newPinLblText;
      });
      defineSetter(this, 'newPinLblText', value => {
        this._newPinLblText = value;
      });
      defineGetter(this, 'newPinTbxText', () => {
        return this._newPinTbxText;
      });
      defineSetter(this, 'newPinTbxText', value => {
        this._newPinTbxText = value;
      });
      defineGetter(this, 'reEnterPinLblText', () => {
        return this._reEnterPinLblText;
      });
      defineSetter(this, 'reEnterPinLblText', value => {
        this._reEnterPinLblText = value;
      });
      defineGetter(this, 'reEnterTbxText', () => {
        return this._reEnterTbxText;
      });
      defineSetter(this, 'reEnterTbxText', value => {
        this._reEnterTbxText = value;
      });
      defineGetter(this, 'pinPolicyLblText', () => {
        return this._pinPolicyLblText;
      });
      defineSetter(this, 'pinPolicyLblText', value => {
        this._pinPolicyLblText = value;
      });
      defineGetter(this, 'btnContinueText', () => {
        return this._btnContinueText;
      });
      defineSetter(this, 'btnContinueText', value => {
        this._btnContinueText = value;
      });
      defineGetter(this, 'successMsgLblText', () => {
        return this._successMsgLblText;
      });
      defineSetter(this, 'successMsgLblText', value => {
        this._successMsgLblText = value;
      });
      defineGetter(this, 'successMsgDescText', () => {
        return this._successMsgDescText;
      });
      defineSetter(this, 'successMsgDescText', value => {
        this._successMsgDescText = value;
      });
      defineGetter(this, 'btnSignInText', () => {
        return this._btnSignInText;
      });
      defineSetter(this, 'btnSignInText', value => {
        this._btnSignInText = value;
      });
      defineGetter(this, 'headerBgSkin', () => {
        return this._headerBgSkin;
      });
      defineSetter(this, 'headerBgSkin', value => {
        this._headerBgSkin = value;
      });
      defineGetter(this, 'headerLabelSkin', () => {
        return this._headerLabelSkin;
      });
      defineSetter(this, 'headerLabelSkin', value => {
        this._headerLabelSkin = value;
      });
      defineGetter(this, 'headerbtnCancelSkin', () => {
        return this._headerbtnCancelSkin;
      });
      defineSetter(this, 'headerbtnCancelSkin', value => {
        this._headerbtnCancelSkin = value;
      });
      defineGetter(this, 'topMessageSkin', () => {
        return this._topMessageSkin;
      });
      defineSetter(this, 'topMessageSkin', value => {
        this._topMessageSkin = value;
      });
      defineGetter(this, 'errorLblSkin', () => {
        return this._errorLblSkin;
      });
      defineSetter(this, 'errorLblSkin', value => {
        this._errorLblSkin = value;
      });
      defineGetter(this, 'tbxLabelSkin', () => {
        return this._tbxLabelSkin;
      });
      defineSetter(this, 'tbxLabelSkin', value => {
        this._tbxLabelSkin = value;
      });
      defineGetter(this, 'tbxSkin', () => {
        return this._tbxSkin;
      });
      defineSetter(this, 'tbxSkin', value => {
        this._tbxSkin = value;
      });
      defineGetter(this, 'pswrdReqLblSkin', () => {
        return this._pswrdReqLblSkin;
      });
      defineSetter(this, 'pswrdReqLblSkin', value => {
        this._pswrdReqLblSkin = value;
      });
      defineGetter(this, 'pswrdReqValuesSkin', () => {
        return this._pswrdReqValuesSkin;
      });
      defineSetter(this, 'pswrdReqValuesSkin', value => {
        this._pswrdReqValuesSkin = value;
      });
      defineGetter(this, 'btnEnabledSkin', () => {
        return this._btnEnabledSkin;
      });
      defineSetter(this, 'btnEnabledSkin', value => {
        this._btnEnabledSkin = value;
      });
      defineGetter(this, 'btnDisabledSkin', () => {
        return this._btnDisabledSkin;
      });
      defineSetter(this, 'btnDisabledSkin', value => {
        this._btnDisabledSkin = value;
      });
      defineGetter(this, 'successHeaderLblSkin', () => {
        return this._successHeaderLblSkin;
      });
      defineSetter(this, 'successHeaderLblSkin', value => {
        this._successHeaderLblSkin = value;
      });
      defineGetter(this, 'successDescLblSkin', () => {
        return this._successDescLblSkin;
      });
      defineSetter(this, 'successDescLblSkin', value => {
        this._successDescLblSkin = value;
      });
      defineGetter(this, 'btnSignInSkin', () => {
        return this._btnSignInSkin;
      });
      defineSetter(this, 'btnSignInSkin', value => {
        this._btnSignInSkin = value;
      });
      defineGetter(this, 'backBtnImage', () => {
        return this._backBtnImage;
      });
      defineSetter(this, 'backBtnImage', value => {
        this._backBtnImage = value;
      });
      defineGetter(this, 'eyeIconInactiveImage', () => {
        return this._eyeIconInactiveImage;
      });
      defineSetter(this, 'eyeIconInactiveImage', value => {
        this._eyeIconInactiveImage = value;
      });
      defineGetter(this, 'eyeIconActiveImage', () => {
        return this._eyeIconActiveImage;
      });
      defineSetter(this, 'eyeIconActiveImage', value => {
        this._eyeIconActiveImage = value;
      });
      defineGetter(this, 'tickInactiveImage', () => {
        return this._tickInactiveImage;
      });
      defineSetter(this, 'tickInactiveImage', value => {
        this._tickInactiveImage = value;
      });
      defineGetter(this, 'tickActiveImage', () => {
        return this._tickActiveImage;
      });
      defineSetter(this, 'tickActiveImage', value => {
        this._tickActiveImage = value;
      });
      defineGetter(this, 'greenTickSuccessImage', () => {
        return this._greenTickSuccessImage;
      });
      defineSetter(this, 'greenTickSuccessImage', value => {
        this._greenTickSuccessImage = value;
      });
    },
    preShowChangePin: function(){
      this.setTextAndSkinFromProperties();
      this.resetUI();
      this.setFlowActions();
    },

    setFlowActions: function(){
      let scopeObj = this;
      this.view.flxBack.onTouchEnd = function(){
        scopeObj.navigateToPrevScreen();
      };
      this.view.btnCancel.onClick = function(){
        scopeObj.navigateToPrevScreen();
      };
      this.view.flxCurrentPinToggle.onTouchEnd = function(){
        scopeObj.pinVisiblityToggle(scopeObj.view.imgCurrentPinVisiblityToggle, scopeObj.view.tbxCurrentPin);
      };
      this.view.flxNewPinToggle.onTouchEnd = function(){
        scopeObj.pinVisiblityToggle(scopeObj.view.imgNewPinVisiblityToggle, scopeObj.view.tbxNewPin);
      };
      this.view.tbxNewPin.onTouchStart = function(){
        scopeObj.enableChangePinButtonAndTickMark();
      };
      this.view.tbxNewPin.onTextChange = function(){
        scopeObj.enableChangePinButtonAndTickMark();
      };
      this.view.tbxReEnterPin.onTouchStart = function(){
        scopeObj.enableChangePinButtonAndTickMark();
      };
      this.view.tbxReEnterPin.onTextChange = function(){
        scopeObj.enableChangePinButtonAndTickMark();
      };
      this.view.btnChangePin.onClick = function(){
        scopeObj.changePin();
      };
      this.view.btnSignIn.onClick = function(){
        const authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"AuthUIModule","appName":"AuthenticationMA"});
        authMod.presentationController.signInFromLogoutScreen();
      };
    },

    resetUI: function(){      
      this.view.flxMainContainer.setVisibility(true);
      this.view.flxPin.setVisibility(true);
      this.view.flxBack.setVisibility(true);
      this.view.btnCancel.setVisibility(true);
      this.view.flxErrorPin.setVisibility(false);
      this.view.flxPinPasswordPolicy.setVisibility(false);
      this.view.flxSuccessMessage.setVisibility(false);
      this.view.tbxCurrentPin.secureTextEntry = true;
      this.view.tbxNewPin.secureTextEntry = true;
      this.view.btnChangePin.setEnabled(false);      
      this.view.rtxRulesPin.text = "Pin must be "+this.PIN_MIN_LENGTH+" digits in length";
      if (applicationManager.getPresentationFormUtility().getDeviceName() === "android") {
        this.view.flxTopMsg.shadowDepth = 10;
        this.view.flxTopMsg.shadowType = constants.VIEW_BOUNDS_SHADOW;
      }
      this.view.tbxCurrentPin.text = "";
      this.view.tbxNewPin.text = "";
      this.view.tbxReEnterPin.text = "";      
      this.view.forceLayout();
    },

    pinVisiblityToggle: function(img, tbx){
      if (img.src === this._eyeIconInactiveImage) {
        img.src = this._eyeIconActiveImage;
        tbx.secureTextEntry =  false;
      } else {
        img.src = this._eyeIconInactiveImage;
        tbx.secureTextEntry = true;
      }
      this.view.forceLayout();
    },

    enableChangePinButtonAndTickMark: function(){
      let iscurrentPinEntered = (this.view.tbxCurrentPin.text!=='' && this.view.tbxCurrentPin.text!==null && this.view.tbxCurrentPin.text!==undefined) ? true : false;
      let isNewPinEntered = (this.view.tbxNewPin.text!=='' && this.view.tbxNewPin.text!==null && this.view.tbxNewPin.text!==undefined) ? true : false;
      let isReEnterPinEntered = (this.view.tbxReEnterPin.text!=='' && this.view.tbxReEnterPin.text!==null && this.view.tbxReEnterPin.text!==undefined) ? true : false;
      if(iscurrentPinEntered && isNewPinEntered && isReEnterPinEntered && this.view.tbxNewPin.text===this.view.tbxReEnterPin.text && this.validatePin()){
        this.view.imgReEnterPinMatch.src = this._tickActiveImage;
        this.view.btnChangePin.setEnabled(true);
        this.view.btnChangePin.skin = this._btnEnabledSkin;
        this.view.flxPinPasswordPolicy.setVisibility(false);
      } else {
        this.view.imgReEnterPinMatch.src = this._tickInactiveImage;
        this.view.btnChangePin.setEnabled(false);
        this.view.btnChangePin.skin = this._btnDisabledSkin;
        this.view.flxPinPasswordPolicy.setVisibility(true);
      }
      this.view.flxErrorPin.setVisibility(false);
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

    changePin: function(){      
      const oldPin = this.view.tbxCurrentPin.text;
      const newPin = this.view.tbxNewPin.text;
      if(oldPin !== newPin){
        this.view.flxErrorPin.setVisibility(false);
        const userManager = applicationManager.getUserPreferencesManager();
        const userName = userManager.getUserObj().userName;
        applicationManager.getPresentationUtility().showLoadingScreen();
        this.view.sdk.updatePin(userName, oldPin, newPin, this.changePinCallback);        
      } else {        
        const errMsg = kony.i18n.getLocalizedString("kony.mb.sca.NewPinShouldNotBeSameAsCurrentPin");
        this.showErrorMsg(errMsg);
      }
    },
    
    getChangePinErrorMessage: function(statusCode){
      switch(statusCode){
        case SCAUtility.SDKConstants.INCORRET_PIN:
          return kony.i18n.getLocalizedString("kony.mb.sca.IncorrectPin");
        case SCAUtility.SDKConstants.PIN_UPDATE_FAILED:          
          return kony.i18n.getLocalizedString("kony.mb.sca.FailedToUpdatePin");
        case SCAUtility.SDKConstants.INVALID_PIN:
          return kony.i18n.getLocalizedString("kony.mb.sca.InvalidPin");
        case SCAUtility.SDKConstants.PIN_NOT_YET_UPDATEABLE:
          // In this case we cannot change the passowrd uptil a certain time-period.
          // which is configurable from the HID.
          return kony.i18n.getLocalizedString("kony.mb.sca.PinNotUpdatable");
        default:
          return kony.i18n.getLocalizedString("kony.mb.sca.FailedToUpdatePin");
      }
    },

    changePinCallback: function(statusCode, policyJSON){
      if(statusCode === SCAUtility.SDKConstants.PIN_UPDATE_SUCCESS){
        const authManger = applicationManager.getAuthManager();
        authManger.logout(this.logoutSuccess, this.logoutError);        
      } else {
        const errorMsg = this.getChangePinErrorMessage(statusCode);
        this.showErrorMsg(errorMsg);
      }
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    
    logoutSuccess: function(){
      const navMan = applicationManager.getNavigationManager();
      navMan.setCustomInfo("logoutStatus",true);
      this.showSuccessScreen();
    },
    
    logoutError: function(){
      const navMan = applicationManager.getNavigationManager();
      navMan.setCustomInfo("logoutStatus", false);
    },

    showErrorMsg: function(errorMsg){
      this.view.lblErrorPin.text = errorMsg;
      this.view.flxErrorPin.setVisibility(true);
      this.view.forceLayout();
    },

    showSuccessScreen: function(){      
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      this.view.flxPin.setVisibility(false);
      this.view.flxBack.setVisibility(false);
      this.view.btnCancel.setVisibility(false);
      this.view.flxSuccessMessage.setVisibility(true);
      this.view.forceLayout();
    },    
    
    navigateToPrevScreen: function(){
      const ntf = new kony.mvc.Navigation(kony.application.getPreviousForm().id);
      ntf.navigate();
    },    

    setTextAndSkinFromProperties: function(){
      this.setTextFromi18n();
      this.assignDefaultSkins();
      this.assignDefaultText();
      this.assignDefaultImages();
    },
    
    assignDefaultSkins: function(){
      this.view.flxHeader.skin = this._headerBgSkin;
      this.view.lblScreenName.skin = this._headerLabelSkin;
      this.view.btnCancel.skin = this._headerbtnCancelSkin;
      this.view.lblTopMsg.skin = this._topMessageSkin;
      this.view.lblErrorPin.skin = this._errorLblSkin;
      this.view.lblCurrentPin.skin = this._tbxLabelSkin;
      this.view.tbxCurrentPin.skin = this._tbxSkin;
      this.view.lblPin.skin = this._tbxLabelSkin;
      this.view.tbxNewPin.skin = this._tbxSkin;
      this.view.lblReEnterPin.skin = this._tbxLabelSkin;
      this.view.tbxReEnterPin.skin = this._tbxSkin;
      this.view.lblPinPolicyRequirements.skin = this._pswrdReqLblSkin;
      this.view.rtxRulesPin.skin = this._pswrdReqValuesSkin;
      this.view.btnChangePin.skin = this._btnDisabledSkin;
      this.view.lblSuccessHeader.skin = this._successHeaderLblSkin;
      this.view.lblSuccessBody.skin = this._successDescLblSkin;
      this.view.btnSignIn.skin = this._btnSignInSkin;
    },
    
    assignDefaultText: function(){
      this.view.lblScreenName.text = this._headerChangePinLblText;
      this.view.btnCancel.text = this._headerBtnCancelText;
      this.view.lblTopMsg.text = this._topMsgLblText;
      this.view.lblCurrentPin.text = this._currPinLblText;
      this.view.tbxCurrentPin.placeholder = this._currPinTbxText;
      this.view.lblPin.text = this._newPinLblText;
      this.view.tbxNewPin.placeholder = this._newPinTbxText;
      this.view.lblReEnterPin.text = this._reEnterPinLblText;
      this.view.tbxReEnterPin.placeholder = this._reEnterTbxText;
      this.view.lblPinPolicyRequirements.text = this._pinPolicyLblText;
      this.view.btnChangePin.text = this._btnContinueText;
      this.view.lblSuccessHeader.text = this._successMsgLblText;
      this.view.lblSuccessBody.text = this._successMsgDescText;
      this.view.btnSignIn.text = this._btnSignInText;
    },
    
    assignDefaultImages: function(){
      this.view.imgBack.src = this._backBtnImage;
      this.view.imgCurrentPinVisiblityToggle.src = this._eyeIconInactiveImage;
      this.view.imgNewPinVisiblityToggle.src = this._eyeIconInactiveImage;
      this.view.imgReEnterPinMatch.src = this._tickInactiveImage;
      this.view.imgGreenIcon.src = this._greenTickSuccessImage;
    },
    
    setTextFromi18n: function(){
      this._headerChangePinLblText = this.getStringFromi18n(this._headerChangePinLblText);
      this._headerBtnCancelText = this.getStringFromi18n(this._headerBtnCancelText);
      this._topMsgLblText = this.getStringFromi18n(this._topMsgLblText);
      this._currPinLblText = this.getStringFromi18n(this._currPinLblText);
      this._currPinTbxText = this.getStringFromi18n(this._currPinTbxText);
      this._newPinLblText = this.getStringFromi18n(this._newPinLblText);
      this._newPinTbxText = this.getStringFromi18n(this._newPinTbxText);
      this._reEnterPinLblText = this.getStringFromi18n(this._reEnterPinLblText);
      this._reEnterTbxText = this.getStringFromi18n(this._reEnterTbxText);
      this._pinPolicyLblText = this.getStringFromi18n(this._pinPolicyLblText);
      this._btnContinueText = this.getStringFromi18n(this._btnContinueText);
      this._successMsgLblText = this.getStringFromi18n(this._successMsgLblText);
      this._successMsgDescText = this.getStringFromi18n(this._successMsgDescText);
      this._btnSignInText = this.getStringFromi18n(this._btnSignInText);
    },
    
    getStringFromi18n: function(stringValue){
      return  kony.i18n.getLocalizedString(stringValue) ? kony.i18n.getLocalizedString(stringValue) : stringValue;
    },
    
  };
});