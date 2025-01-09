define(['./LoginPopupsUtility','./LoginPopupsDAO'],function(LoginPopupsUtility, LoginPopupsDAO) {
  return {

    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._identityServiceName = "";
      
      this._pinPopupTitleSkin="";
      this._pinPopupNumbersSkin="";
      this._pinPopupClearButtonSkin="";
      this._popupCancelButtonSkin="";
      this._pinPopupTitleText="";
      this._popupCancelBtnText="";
      
      this.LoginPopupsUtility = new LoginPopupsUtility();
      this.LoginPopupsDAO = new LoginPopupsDAO();
      this.dialPadNo="";
      this.lengthOfDialNo=0;
      this.currentAuthMode="";
      this.pinLength=0;
      
      this.getNativeController = function() {
      try {
        if (this.nativeControllerInstance === undefined) {
          var deviceInfo = kony.os.deviceInfo();
          var platformName = null;
          if (deviceInfo.name.toLowerCase() === 'android') {
            platformName = 'Android';
          }else if (deviceInfo.name.toLowerCase() === 'iphone') {
            platformName = 'IOS';
          }else {
            platformName = deviceInfo.name.charAt(0).toUpperCase() + deviceInfo.name.slice(1);
          }
          var nativeControllerPath = "com/temenos/hidapprove/sdk/NativeController" + platformName + ".js";
          var nativeController = require(nativeControllerPath);
          this.nativeControllerInstance = new nativeController(this.componentInstance,this.viewController);
        }
        return this.nativeControllerInstance;
      } catch (exception) {
        throw new Error(exception);
      }
    };this.sdkComponentInstance = null;
      
    },

    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineSetter(this, "identityServiceName", function(val){
        if((typeof val=='string') && (val != "")){
          this._identityServiceName=val;
        }
      });
      defineGetter(this, "identityServiceName", function(){
        return this._identityServiceName;
      });
      
      defineSetter(this, "pinPopupTitleText", function(val){
        if((typeof val ==="string") && (val !== "")){
          this._pinPopupTitleText=val;
        }
      });
      defineGetter(this, "pinPopupTitleText", function(){
        return this._pinPopupTitleText;
      });
      
       defineSetter(this, "popupCancelBtnText", function(val){
        if((typeof val ==="string") && (val !== "")){
          this._popupCancelBtnText=val;
        }
      });
      defineGetter(this, "popupCancelBtnText", function(){
        return this._popupCancelBtnText;
      });
      
      defineSetter(this, "pinPopupTitleSkin", function(val){
        if((typeof val=="string") && (val != "")){
          this._pinPopupTitleSkin=val;
        }
      });
      defineGetter(this, "pinPopupTitleSkin", function(){
        return this._pinPopupTitleSkin;
      });
      defineSetter(this, "pinPopupNumbersSkin", function(val){
        if((typeof val=="string") && (val != "")){
          this._pinPopupNumbersSkin=val;
        }
      });
      defineGetter(this, "pinPopupNumbersSkin", function(){
        return this._pinPopupNumbersSkin;
      });
      defineSetter(this, "pinPopupClearButtonSkin", function(val){
        if((typeof val=="string") && (val != "")){
          this._pinPopupClearButtonSkin=val;
        }
      });
      defineGetter(this, "pinPopupClearButtonSkin", function(){
        return this._pinPopupClearButtonSkin;
      });
      defineSetter(this, "popupCancelButtonSkin", function(val){
        if((typeof val=="string") && (val != "")){
          this._popupCancelButtonSkin=val;
        }
      });
      defineGetter(this, "popupCancelButtonSkin", function(){
        return this._popupCancelButtonSkin;
      });
    
    },

    raiseComponentEvent: function(methodName, argument=null){
      // This method invokes the appropriate event exposed  by the component
      const scopeObj = this;
      switch(methodName){
        case 'onLoginSuccess':
          if(scopeObj.onLoginSuccess) scopeObj.onLoginSuccess(argument);
          break;
        case 'onLoginFailure':
          if(scopeObj.onLoginFailure) scopeObj.onLoginFailure(argument);
          break;
        case 'onPopupVisible':          
          if(scopeObj.onPopupVisible) scopeObj.onPopupVisible(argument);
          break;
      }
    },

    preShow: function(){     
      this.setTextFromi18n();
      this.setFlowActions();      
     
      this.resetUI();
    },
    
    resetUI: function(){
      this.assignDefaultSkins();
      this.assignDefaultText();
      this.view.forceLayout();
    },
    
    getStringFromi18n: function(stringValue){
      return  kony.i18n.getLocalizedString(stringValue) ? kony.i18n.getLocalizedString(stringValue) : stringValue;
    },

    setTextFromi18n: function(){
      this._pinPopupTitleText=this.getStringFromi18n(this._pinPopupTitleText);
      this._popupCancelBtnText=this.getStringFromi18n(this._popupCancelBtnText);
    },
    
    setSdkComponentInstance: function(instance){
      this.sdkComponentInstance = instance;
    },
    assignDefaultSkins: function(){
  
      this.view.PinEntryLabel.skin = this._pinPopupTitleSkin;
      this.view.btnOne.skin = this._pinPopupNumbersSkin;
      this.view.btnTwo.skin = this._pinPopupNumbersSkin;
      this.view.btnThree.skin = this._pinPopupNumbersSkin;
      this.view.btnFour.skin = this._pinPopupNumbersSkin;
      this.view.btnFive.skin = this._pinPopupNumbersSkin;
      this.view.btnSix.skin = this._pinPopupNumbersSkin;
      this.view.btnSeven.skin = this._pinPopupNumbersSkin;
      this.view.btnEight.skin = this._pinPopupNumbersSkin;
      this.view.btnNine.skin = this._pinPopupNumbersSkin;
      this.view.btnZero.skin = this._pinPopupNumbersSkin;
      this.view.flxCross.skin = this._pinPopupClearButtonSkin;
      this.view.lblCancel.skin = this._popupCancelButtonSkin;
    },
    
    assignDefaultText: function(){
      this.view.PinEntryLabel.text = this._pinPopupTitleText;
      this.view.lblCancel.text = this._popupCancelBtnText;
    },
    
    setFlowActions: function() {
      const scopeObj = this;
      this.view.flxCancelPin.onTouchEnd = function(){        
        const currForm = kony.application.getCurrentForm();
        if(currForm.sdk){
          currForm.sdk.setContainerPin("");
          currForm.remove(currForm.sdk);
        }
      };
      this.view.flxMainContainer.onTouchEnd = null;
    },

    createDynamicProgressFlexContainers: function(pinLength){
      const progressFlexContainersList = [];
      for(let id=1; id<=pinLength; id++){
        let progressFlexContainer = this.getProgressFlexContainer(id);
        progressFlexContainersList.push(progressFlexContainer);
      }
      this.view.flxProgressButtons.add(...progressFlexContainersList);
      this.view.flxProgressButtons.forceLayout();
    },
    getProgressFlexContainer: function(id){
      const flexId = "flxProgressButton"+id;
     
      var left = (parseInt(id))* (65/(this.pinLength-1));
 
      const flxProgressButton = new kony.ui.FlexContainer({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "centerY": "50%",
        "clipBounds": true,
        "height": "11dp",
        "id": flexId,
        "isVisible": true,
        "layoutType": kony.flex.FREE_FORM,
        "left": left+"%",
        "isModalContainer": false,
        "skin": "sknFlxBorderA0A0A0",
        "top": "0%",
        "width": "11dp",
        "zIndex": 1
       
      }, {},{});
      flxProgressButton.setDefaultUnit(kony.flex.DP);
      flxProgressButton.add();
      return flxProgressButton;
    },
    setDefaultMode: function(authMode) {
      let userManager = applicationManager.getUserPreferencesManager();
      userManager.setDefaultAuthMode(authMode);
    },
    
    showPinDialog: function(pinLength){
         if(pinLength > 0){
              this.pinLength = pinLength;
              this.view.flxEnterPin.setVisibility(true);
              this.createDynamicProgressFlexContainers(pinLength);
              //this.clearProgressFlexLogin(pinLength);
              this.setDialPadActions();
              this.view.forceLayout();
         }
     
    },
    closePopup:function(){
          this.dialPadNo = "";
          this.lengthOfDialNo = 0;
          this.view.flxEnterPin.setVisibility(false);

    },
    
    initiateLoginFlow: function(loginType){
     
      
    },
    
    onLoginSuccessCallback: function(resSuccess){
      const scopeObj = this;
     
    },
    
    onLoginFailureCallback: function(resError) {
      this.LoginPopupsUtility.dismissLoadingScreen();
      let errMsg = resError.errmsg.errorMessage;
      
    },
 
    getNumber: function(num) {   
      this.view.lblErrorMessage.setVisibility(false);
      this.lengthOfDialNo = this.dialPadNo.length;
      this.changeSkinOfProgressBartoActive();
      if (this.lengthOfDialNo < this.pinLength) {
        this.dialPadNo = "" + this.dialPadNo + num;
      }
      if (this.dialPadNo.length === this.pinLength){
        let pinNo = this.dialPadNo;
        applicationManager.getPresentationUtility().showLoadingScreen();
        this.getNativeController().setContainerPin(pinNo, this.pinCallback);
        this.dialPadNo = "";
        this.lengthOfDialNo = 0;
      }
    },
    
    pinCallback: function(status, remainingTries){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      this.view.lblErrorMessage.setVisibility(true);
      this.clearProgressFlexLogin();
      this.view.forceLayout();
      if(status===103){
        this.view.lblErrorMessage.text = "Wrong PIN! Please try again";
      } else if(status===105){
        this.view.lblErrorMessage.text = `Wrong PIN! ${remainingTries} more attempts left.`;
      } else if(status===104){
        // PIN LOCKED
      }
    },

    onPinLogin: function(pin) {
      const scopeObj = this;
      this.LoginPopupsUtility.showLoadingScreen();
      let identityServiceName = this._identityServiceName;
    },

    onPinFailure: function(err) {
      this.LoginPopupsUtility.dismissLoadingScreen();
      if (err.errmsg["isServerUnreachable"]){
        let errMsgObj = {"errmsg":{"errorMessage":err.errmsg}};
        this.onLoginFailureCallback(errMsgObj);
        //applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", err.errmsg);
      } else {        
        let errMsgObj = {"errmsg":{"errorMessage":kony.i18n.getLocalizedString("kony.mb.Please.enter.a.valild.pin")}};
        this.clearProgressFlexLogin(pinLength);
        this.onLoginFailureCallback(errMsgObj);
        //this.bindPinError(kony.i18n.getLocalizedString("kony.mb.Please.enter.a.valild.pin"));
      }
    },

    bindPinError(err){
      const scopeObj = this;      
      applicationManager.getDataProcessorUtility().showToastMessageError(this,err,scopeObj.clearProgressFlexLogin);
    },

    setDialPadActions: function() {
      var scopeObj = this;
      this.view.btnOne.onTouchStart = function() {
        scopeObj.getNumber("1");
      };
      this.view.btnTwo.onTouchStart = function() {
        scopeObj.getNumber("2");
      };
      this.view.btnThree.onTouchStart = function() {
        scopeObj.getNumber("3");
      };
      this.view.btnFour.onTouchStart = function() {
        scopeObj.getNumber("4");
      };
      this.view.btnFive.onTouchStart = function() {
        scopeObj.getNumber("5");
      };
      this.view.btnSix.onTouchStart = function() {
        scopeObj.getNumber("6");
      };
      this.view.btnSeven.onTouchStart = function() {
        scopeObj.getNumber("7");
      };
      this.view.btnEight.onTouchStart = function() {
        scopeObj.getNumber("8");
      };
      this.view.btnNine.onTouchStart = function() {
        scopeObj.getNumber("9");
      };
      this.view.btnZero.onTouchStart = function() {
        scopeObj.getNumber("0");
      };
      this.view.flxCross.onTouchStart = function() {
        scopeObj.flxCancelDialPadOnClick();
      };
      this.view.flxCross.onClick = function() {
        // overwritting the actions onclick
      };
    },

    flxCancelDialPadOnClick: function() {
      this.dialPadNo = this.dialPadNo.slice(0, -1);
      this.lengthOfDialNo = this.dialPadNo.length;
      this.changeSkinOfProgressBartoInactive();
      this.view.flxDialPad.forceLayout();
    },

    clearProgressFlexLogin:function(){
      for(let i=this.pinLength; i>=1;i--){
        this.view["flxProgressButton"+i].skin="sknFlxBorderA0A0A0";
      }
    },

    changeSkinOfProgressBartoActive: function(){
      this.view["flxProgressButton"+(this.lengthOfDialNo + 1)].skin = "sknFlxBgA0A0A0BorderA0A0A0";
      this.view.flxProgressButtons.forceLayout();
    },

    changeSkinOfProgressBartoInactive: function(){
      this.view["flxProgressButton"+(this.lengthOfDialNo + 1)].skin = "sknFlxBorderA0A0A0";
      this.view.flxProgressButtons.forceLayout();
    },
    /* PIN-SCREEN END=============================================================================== */

  };
});
