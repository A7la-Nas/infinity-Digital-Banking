define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      let scopeObj = this;
      scopeObj._primaryBtnEnableSkin = {};
      scopeObj._primaryBtnDisableSkin = {};
      scopeObj._errorFlexSkin = "";
      scopeObj._normalFlexSkin = "";
      scopeObj._displayAll = "";
      scopeObj._displayPrimary = "";
      scopeObj._displayNoValue = "";
      scopeObj._serviceName = "";
      scopeObj._serviceKey = "";
      scopeObj._securityKey = "";
      scopeObj._objectService = "";
      scopeObj._dataModel = "";
      scopeObj._verifyOTPOperationName = "";
      scopeObj._requestOTPOperationName = "";
      scopeObj._resendOTPOperationName = "";
      scopeObj._checkboxSelected = "";
      scopeObj._checkboxUnSelected = "";
      scopeObj._checkboxSelectedSkin = "";
      scopeObj._checkboxUnSelectedSkin = "";
      scopeObj._communicationType = "";
      scopeObj.customerPhone = "";
      scopeObj.customerEmail = "";
      scopeObj.customerCommunication = {};
      scopeObj.accessibilityConfig = {
        "a11yLabel": "",
        "a11yValue": "",
        "a11yHint": "",
        "a11yHidden" : false
      };
      scopeObj._isPostLogin = true;
      scopeObj._action = "";
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineSetter(this, "primaryBtnEnableSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._primaryBtnEnableSkin=val;
        }
      });
      defineGetter(this, "primaryBtnEnableSkin", function() {
        return this._primaryBtnEnableSkin;
      });
      defineSetter(this, "primaryBtnDisableSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._primaryBtnDisableSkin=val;
        }
      });
      defineGetter(this, "primaryBtnDisableSkin", function() {
        return this._primaryBtnDisableSkin;
      });
      defineSetter(this, "errorFlexSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._errorFlexSkin=val;
        }
      });
      defineGetter(this, "errorFlexSkin", function() {
        return this._errorFlexSkin;
      });
      defineSetter(this, "normalFlexSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._normalFlexSkin=val;
        }
      });
      defineGetter(this, "normalFlexSkin", function() {
        return this._normalFlexSkin;
      });
      defineSetter(this, "securityKey", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._securityKey=val;
        }
      });
      defineGetter(this, "displayAll", function() {
        return this._displayAll;
      });
      defineSetter(this, "displayAll", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._displayAll=val;
        }
      });
      defineGetter(this, "securityKey", function() {
        return this._securityKey;
      });
      defineSetter(this, "displayPrimary", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._displayPrimary=val;
        }
      });
      defineGetter(this, "displayPrimary", function() {
        return this._displayPrimary;
      });
      defineSetter(this, "displayNoValue", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._displayNoValue=val;
        }
      });
      defineGetter(this, "displayNoValue", function() {
        return this._displayNoValue;
      });
      defineSetter(this, "serviceName", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._serviceName=val;
        }
      });
      defineGetter(this, "serviceName", function() {
        return this._serviceName;
      });
      defineSetter(this, "serviceKey", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._serviceKey=val;
        }
      });
      defineGetter(this, "serviceKey", function() {
        return this._serviceKey;
      });
      defineSetter(this, "objectService", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._objectService=val;
        }
      });
      defineGetter(this, "objectService", function() {
        return this._objectService;
      });
      defineSetter(this, "dataModel", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._dataModel=val;
        }
      });
      defineGetter(this, "dataModel", function() {
        return this._dataModel;
      });
      defineSetter(this, "verifyOTPOperationName", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._verifyOTPOperationName=val;
        }
      });
      defineGetter(this, "verifyOTPOperationName", function() {
        return this._verifyOTPOperationName;
      });
      defineSetter(this, "requestOTPOperationName", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._requestOTPOperationName=val;
        }
      });
      defineGetter(this, "requestOTPOperationName", function() {
        return this._requestOTPOperationName;
      });
      defineSetter(this, "resendOTPOperationName", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._resendOTPOperationName=val;
        }
      });
      defineGetter(this, "resendOTPOperationName", function() {
        return this._resendOTPOperationName;
      });
      defineSetter(this, "checkboxUnSelected", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._checkboxUnSelected=val;
        }
      });
      defineGetter(this, "checkboxUnSelected", function() {
        return this._checkboxUnSelected;
      });
      defineSetter(this, "checkboxSelected", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._checkboxSelected=val;
        }
      });
      defineGetter(this, "checkboxSelected", function() {
        return this._checkboxSelected;
      });
      defineSetter(this, "checkboxUnSelectedSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._checkboxUnSelectedSkin=val;
        }
      });
      defineGetter(this, "checkboxUnSelectedSkin", function() {
        return this._checkboxUnSelectedSkin;
      });
      defineSetter(this, "checkboxSelectedSkin", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._checkboxSelectedSkin=val;
        }
      });
      defineGetter(this, "checkboxSelectedSkin", function() {
        return this._checkboxSelectedSkin;
      });
      defineSetter(this, "communicationType", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._communicationType=val;
        }
      });
      defineGetter(this, "communicationType", function() {
        return this._communicationType;
      });
      defineSetter(this, "isPostLogin", function(val) {
        if((typeof val === 'boolean')){
          this._isPostLogin=val;
        }
      });
      defineGetter(this, "isPostLogin", function() {
        return this._isPostLogin;
      });
      defineSetter(this, "action", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._action=val;
        }
      });
      defineGetter(this, "action", function() {
        return this._action;
      });
    },

    preShow : function(){
      this.setFlowActions();
      this.postLoginUIChanges();
    },

    postLoginUIChanges: function(){
      let scopeObj = this;
      if(scopeObj.isPostLogin){
        scopeObj.view.flxClose.setVisibility(false);
        scopeObj.view.flxRememberMe.setVisibility(false);
        scopeObj.view.btnLogin.setVisibility(false);
        scopeObj.view.btnProceed.setVisibility(false);
        scopeObj.view.flxConfirmation.setVisibility(true);
        scopeObj.view.flxNotes.setVisibility(true);
        scopeObj.view.lblPhoneOTP.left = "0dp";
        scopeObj.view.rtxEnterCVVCode.contentalignment = "4" ;
        scopeObj.view.btnResendOTP.centerX = "";
        scopeObj.view.flxDisplayAll.width = "350dp";
        scopeObj.view.flxCVV.width = "350dp";
        scopeObj.view.flxOTPContainer.width = "90%";
        scopeObj.view.flxSecureAccessContainer.width = "90%";
        scopeObj.view.flxSecureAccessContainer.top = "20dp";
        scopeObj.view.flxOTPContainer.top = "20dp";
      }
    },

    setFlowActions : function() {
      let scopeObj = this;
      scopeObj.view.tbxCVV.onKeyUp = function() {
        scopeObj.validatetoEnableContinueButton();
      };

      scopeObj.view.tbxCVV.onDone = function() {
        kony.application.showLoadingScreen("loadingskin","Data is still Loading");
        scopeObj.view.rtxEnterCVVCode.text = kony.i18n.getLocalizedString("i18n.mfa.SACHeader");
        var params = {
          "securityKey": scopeObj.securityKey,
          "otp": scopeObj.view.tbxCVV.text.trim()
        };
        scopeObj.verifyOTP(params);
      };

      scopeObj.view.btnLogin.onClick = function() {
        kony.application.showLoadingScreen("loadingskin","Data is still Loading");
        scopeObj.view.rtxEnterCVVCode.text = kony.i18n.getLocalizedString("i18n.mfa.SACHeader");
        var params = {
          "securityKey": scopeObj.securityKey,
          "otp": scopeObj.view.tbxCVV.text.trim()
        };
        scopeObj.verifyOTP(params);
      };

      scopeObj.view.btnProceed.onClick = function() {
        scopeObj.proceedToRequestOTP();
      };

      scopeObj.view.btnResendOTP.onClick = function() {
        kony.application.showLoadingScreen("loadingskin","Data is still Loading");
        var params = {
          "phone":  scopeObj.customerPhone,
          "email":  scopeObj.customerEmail,
          "securityKey": scopeObj.securityKey,
        };
        scopeObj.resendOTP(params);
      };

      scopeObj.view.flexcheckuncheck.onClick = function(){
        let isRememberMeSelected = scopeObj.isFontIconChecked(scopeObj.view.lblMRememberMe);
        scopeObj.toggleFontCheckbox(scopeObj.view.lblMRememberMe);
        kony.mvc.MDAApplication.getSharedInstance().appContext.registerStatus = !isRememberMeSelected;
      };

      scopeObj.view.flxClose.onClick = function(){
        if (scopeObj.closeOTP) {
          scopeObj.closeOTP();
        }
      };

      scopeObj.view.btnCancel.onClick = function(){
        if (scopeObj.closeOTP) {
          scopeObj.closeOTP();
        }
      };

      scopeObj.view.btnContinue.onClick = function() {
        if(scopeObj.view.flxOTPContainer.isVisible){
          scopeObj.proceedToRequestOTP();
        } else {
          kony.application.showLoadingScreen("loadingskin","Data is still Loading");
          scopeObj.view.rtxEnterCVVCode.text = kony.i18n.getLocalizedString("i18n.mfa.SACHeader");
          var params = {
            "securityKey": scopeObj.securityKey,
            "otp": scopeObj.view.tbxCVV.text.trim()
          };
          scopeObj.verifyOTP(params);
        }
      };

    },

    showMFA : function(response){
      let scopeObj = this;
      scopeObj.communicationType = response.MFAAttributes.communicationType;
      scopeObj.serviceKey = response.MFAAttributes.serviceKey;
      scopeObj.securityKey = response.MFAAttributes.securityKey;
      switch (scopeObj.communicationType) {
        case scopeObj.displayAll:
          scopeObj.customerCommunication = response.MFAAttributes.customerCommunication;
          scopeObj.showPhoneEmailScreen();
          break;
        case scopeObj.displayNoValue:
          scopeObj.showDefaultPhoneEmailScreen(response.MFAAttributes);
          break;
        case scopeObj.displayPrimary:
          scopeObj.showPrimaryPhoneEmailScreen(response.MFAAttributes);
          break;
      }
      scopeObj.enableOrDisableRegisterDeviceOption();
      scopeObj.onBreakpointChange();
    },

    showPhoneEmailScreen : function(){
      let scopeObj = this;
      kony.application.showLoadingScreen("loadingskin","Data is still Loading");
      scopeObj.view.lblWrongOTP.setVisibility(false);
      scopeObj.bindUIForOTPMFAScreen();
    },

    bindUIForOTPMFAScreen : function(customerCommunicationInfo){
      let scopeObj = this;
      scopeObj.view.flxSecureAccessContainer.setVisibility(false);
      scopeObj.view.flxOTPContainer.setVisibility(true);
      scopeObj.view.lblWrongOTP.setVisibility(false);
      scopeObj.enableButton(scopeObj.view.btnProceed);
      scopeObj.enableButton(scopeObj.view.btnContinue);
      scopeObj.setText(scopeObj.view.lblHeaderOTP, kony.i18n.getLocalizedString("i18n.mfa.newDeviceDetected"));
      scopeObj.setText(scopeObj.view.lblResendMessage, kony.i18n.getLocalizedString("i18n.MFA.headerMessageForOTP"));
      scopeObj.setText(scopeObj.view.btnProceed, kony.i18n.getLocalizedString("i18n.common.proceed"));
      scopeObj.setText(scopeObj.view.btnContinue, kony.i18n.getLocalizedString("i18n.common.proceed"));
      scopeObj.setText(scopeObj.view.lblRememberMe, kony.i18n.getLocalizedString("i18n.mfaprelogin.registerthisdevice"));
      let phone = scopeObj.customerCommunication.phone;
      let email = scopeObj.customerCommunication.email;
      if (phone.length>0 && email.length>0) {
        scopeObj.setText(scopeObj.view.lblResendMessage,kony.i18n.getLocalizedString("i18n.MFA.headerMessageForOTP"));
        scopeObj.view.lbxPhone.masterData = scopeObj.setDataForPhoneListBox(phone);
        scopeObj.view.lbxEmail.masterData = scopeObj.setDataForEmailListBox(email);
        scopeObj.view.lblRegisteredPhone.setVisibility(true);
        scopeObj.view.lbxPhone.setVisibility(true);
        scopeObj.view.lbxPhone.selectedKey = scopeObj.view.lbxPhone.masterData[0][0];
        scopeObj.view.lbxEmail.selectedKey = scopeObj.view.lbxEmail.masterData[0][0];
        scopeObj.view.lblRegisteredEmail.setVisibility(true);
        scopeObj.view.lbxEmail.setVisibility(true);
      } else{
        if (phone.length>0 || email.length>0){
          if (phone.length>0) {
            scopeObj.setText(scopeObj.view.lblResendMessage, kony.i18n.getLocalizedString("i18n.MFA.headerMessageForOTPPhone"));
            scopeObj.view.lbxPhone.masterData = scopeObj.setDataForPhoneListBox(phone);
            scopeObj.view.lbxPhone.selectedKey = scopeObj.view.lbxPhone.masterData[0][0];
            scopeObj.view.lblRegisteredPhone.setVisibility(true);
            scopeObj.view.lbxPhone.setVisibility(true);
            scopeObj.view.lblRegisteredEmail.setVisibility(false);
            scopeObj.view.lbxEmail.setVisibility(false);
          } else if (email.length>0) {
            scopeObj.setText(scopeObj.view.lblResendMessage, kony.i18n.getLocalizedString("i18n.MFA.headerMessageForOTPEmail"));
            scopeObj.view.lbxEmail.masterData = scopeObj.setDataForEmailListBox(email);
            scopeObj.view.lbxEmail.selectedKey = scopeObj.view.lbxEmail.masterData[0][0];
            scopeObj.view.lblRegisteredPhone.setVisibility(false);
            scopeObj.view.lbxPhone.setVisibility(false);
            scopeObj.view.lblRegisteredEmail.setVisibility(true);
            scopeObj.view.lbxEmail.setVisibility(true);
          }
        }
      }
      kony.application.dismissLoadingScreen();
    },

    setDataForPhoneListBox:function(phoneObj){
      var phoneNumbers = phoneObj.map(function (dataItem) {
        var phoneNumber = [];
        phoneNumber.push(dataItem.unmasked);
        phoneNumber.push(dataItem.masked);
        return phoneNumber;
      });
      return phoneNumbers;
    },

    setDataForEmailListBox:function(emailObj){
      var emailsIds = emailObj.map(function (dataItem) {
        var email = [];
        email.push(dataItem.unmasked);
        email.push(dataItem.masked);
        return email;
      });
      return emailsIds;
    },

    showDefaultPhoneEmailScreen : function(response){
      let scopeObj = this;
      if (response.remainingResendAttempts <= 0) {
        scopeObj.view.btnResendOTP.setVisibility(false);
      } else {
        scopeObj.bindUIForResendButton(response);
        scopeObj.view.btnResendOTP.setVisibility(true);
      }
      if(response.isOTPExpired === "true"){
        scopeObj.view.lblOTPError.text = kony.i18n.getLocalizedString("i18n.mfa.otpExpired");
        scopeObj.view.lblOTPError.setVisibility(true);
        scopeObj.view.btnLogin.setEnabled(false);
        scopeObj.view.btnContinue.setEnabled(false);
      } else {
        scopeObj.view.lblOTPError.setVisibility(false);
      }
      scopeObj.view.flxOTPContainer.setVisibility(false);
      scopeObj.view.flxSecureAccessContainer.setVisibility(true);
      scopeObj.view.rtxEnterCVVCode.text = kony.i18n.getLocalizedString("i18n.mfa.SACHeader");
      scopeObj.view.btnLogin.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.Verify");
      scopeObj.view.btnContinue.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.Verify");
      scopeObj.view.btnResendOTP.text = kony.i18n.getLocalizedString("i18n.login.ResendOtp");
      scopeObj.view.lblRememberMe.text = kony.i18n.getLocalizedString("i18n.mfaprelogin.registerthisdevice");
      scopeObj.view.flxCVV.skin = scopeObj.normalFlexSkin;
      scopeObj.view.tbxCVV.text = "";
      scopeObj.disableButton(scopeObj.view.btnLogin);
      scopeObj.disableButton(scopeObj.view.btnContinue);
    },

    validatetoEnableContinueButton:function(){
      let scopeObj = this;
      var otp = scopeObj.view.tbxCVV.text.trim();
      if(otp === ""){
        scopeObj.disableButton(scopeObj.view.btnLogin);
        scopeObj.disableButton(scopeObj.view.btnContinue);
      }else{
        scopeObj.enableButton(scopeObj.view.btnLogin);
        scopeObj.enableButton(scopeObj.view.btnContinue);
      }
    },

    showPrimaryPhoneEmailScreen : function(response){
      let scopeObj = this;
      if (response.remainingResendAttempts <= 0) {
        scopeObj.view.btnResendOTP.setVisibility(false);
      } else {
        scopeObj.bindUIForResendButton(response);
        scopeObj.view.btnResendOTP.setVisibility(true);
      }
      if(response.isOTPExpired === "true"){
        scopeObj.view.lblOTPError.text = kony.i18n.getLocalizedString("i18n.mfa.otpExpired");
        scopeObj.view.lblOTPError.setVisibility(true);
        scopeObj.disableButton(scopeObj.view.btnLogin);
        kony.application.dismissLoadingScreen();
      }else{
        scopeObj.view.lblOTPError.setVisibility(false);
      }
      scopeObj.view.flxOTPContainer.setVisibility(false);
      scopeObj.view.flxCVV.skin = scopeObj.normalFlexSkin;
      scopeObj.view.flxSecureAccessContainer.setVisibility(true);
      scopeObj.disableButton(scopeObj.view.btnLogin);
      scopeObj.disableButton(scopeObj.view.btnContinue);
      scopeObj.view.tbxCVV.text = "";
      scopeObj.view.btnLogin.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.Verify");
      scopeObj.view.btnContinue.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.Verify");
      scopeObj.view.lblRememberMe.text = kony.i18n.getLocalizedString("i18n.mfaprelogin.registerthisdevice");
      if(response.customerCommunication.phone.length>0 && response.customerCommunication.email.length>0){
        let phone = response.customerCommunication.phone[0].masked;
        let email = response.customerCommunication.email[0].masked;
        scopeObj.view.rtxEnterCVVCode.text = kony.i18n.getLocalizedString("i18n.mfa.EnterSACMobile") + phone + " & " + email;
      }else{
        if(response.customerCommunication.phone.length>0){
          let phone = response.customerCommunication.phone[0].masked;
          scopeObj.view.rtxEnterCVVCode.text = kony.i18n.getLocalizedString("i18n.mfa.EnterSACMobile") + phone;
        }else{
          let email = response.customerCommunication.email[0].masked;
          scopeObj.view.rtxEnterCVVCode.text = kony.i18n.getLocalizedString("i18n.mfa.EnterSACMobile") + email;
        }
      }
      scopeObj.view.rtxEnterCVVCode.height = "90px";
      kony.application.dismissLoadingScreen();
    },

    disableButton : function(button){
      let scopeObj = this;
      let skins = JSON.parse(scopeObj.primaryBtnDisableSkin);
      button.setEnabled(false);
      button.skin = "sknBtnBlockedSSPFFFFFF15Px";
      button.hoverSkin = "sknBtnBlockedSSPFFFFFF15Px";
      button.focusSkin = "sknBtnBlockedSSPFFFFFF15Px";
    },

    enableButton : function(button) {
      let scopeObj = this;
      let skins = JSON.parse(scopeObj.primaryBtnEnableSkin);
      button.setEnabled(true);
      button.skin = "sknbtnSSPffffff0278ee15pxbr3px";
      button.hoverSkin = "sknBtnHoverSSPFFFFFF15Px";
      button.focusSkin = "sknBtnFocusSSPFFFFFF15Px0273e3";
    },

    bindUIForResendButton:function(response){
      var scopeObj = this;
      let communicationDetails = response.customerCommunication ? response.customerCommunication : scopeObj.customerCommunication;
      scopeObj.customerCommunication = communicationDetails;
      scopeObj.view.tbxCVV.text = "";
      scopeObj.customerPhone = communicationDetails.phone ? communicationDetails.phone[0].unmasked : "";
      scopeObj.customerEmail = communicationDetails.email ? communicationDetails.email[0].unmasked : "",
      scopeObj.securityKey = response.securityKey;
      scopeObj.disableButton(scopeObj.view.btnLogin);
      scopeObj.disableButton(scopeObj.view.btnContinue);
    },

    isFontIconChecked : function(imageWidget){
      return imageWidget.text === this.checkboxSelected;
    },

    toggleFontCheckbox : function (imageWidget) {
      imageWidget.text = imageWidget.text === this.checkboxSelected ?  this.checkboxUnSelected : this.checkboxSelected; 
      imageWidget.skin = imageWidget.skin === this.checkboxSelectedSkin ?  this.checkboxUnSelectedSkin : this.checkboxSelectedSkin; 
    },

    showScreentoEnterOTP : function(response){
      let scopeObj = this;
      if (response.remainingResendAttempts <= 0) {
        scopeObj.view.btnResendOTP.setVisibility(false);
      } else {
        scopeObj.bindUIForResendButton(response);
        scopeObj.view.btnResendOTP.setVisibility(true);
      }
      if(response.isOTPExpired === "true"){
        scopeObj.view.lblOTPError.setVisibility(true);
        scopeObj.view.lblOTPError.text = kony.i18n.getLocalizedString("i18n.mfa.otpExpired");
        scopeObj.view.tbxCVV.text = "";
        scopeObj.disableButton(scopeObj.view.btnLogin);
        scopeObj.disableButton(scopeObj.view.btnContinue);
      }else{
        scopeObj.view.lblOTPError.setVisibility(false);
      }
      scopeObj.view.flxOTPContainer.setVisibility(false);
      scopeObj.view.tbxCVV.text = "";
      scopeObj.view.rtxEnterCVVCode.text = kony.i18n.getLocalizedString("i18n.MFA.EnterSACOnPhone");
      scopeObj.view.flxCVV.skin = scopeObj.normalFlexSkin;
      scopeObj.view.flxSecureAccessContainer.setVisibility(true);
      scopeObj.disableButton(scopeObj.view.btnLogin);
      scopeObj.disableButton(scopeObj.view.btnContinue);
      scopeObj.setText(scopeObj.view.btnLogin, kony.i18n.getLocalizedString("i18n.ProfileManagement.Verify"), scopeObj.accessibilityConfig);
      scopeObj.setText(scopeObj.view.btnContinue, kony.i18n.getLocalizedString("i18n.ProfileManagement.Verify"), scopeObj.accessibilityConfig);
      scopeObj.setText(scopeObj.view.btnResendOTP, kony.i18n.getLocalizedString("i18n.login.ResendOtp"), scopeObj.accessibilityConfig);
      scopeObj.setText(scopeObj.view.lblRememberMe, kony.i18n.getLocalizedString("i18n.mfaprelogin.registerthisdevice"), scopeObj.accessibilityConfig);
      kony.application.dismissLoadingScreen();
    },

    showRequestOTPError : function(){
      let scopeObj = this;
      scopeObj.view.lblWrongOTP.text = kony.i18n.getLocalizedString("i18n.mfa.requestOTPMessageFailed");
      scopeObj.view.lblWrongOTP.setVisibility(true);
      kony.application.dismissLoadingScreen();
    },

    setText : function (widgetID, text) {
      switch (typeof text) {
        case 'string': widgetID.text = text;         // if text parameter is a string
          widgetID.accessibilityConfig = {
            "a11yLabel": text
          };
          break;
        case 'object': if (text !== null && typeof text.text !== 'undefined') {         // if text parameter is an object and contains some text
          widgetID.text = text.text;
          widgetID.accessibilityConfig = {
            "a11yLabel": text.text
          };
        }
          break;
        default: widgetID.text = "";         // if text parameter is undefined
          widgetID.accessibilityConfig = {
            "a11yLabel": ""
          };
      }
    },

    enableOrDisableRegisterDeviceOption:function(){
      let scopeObj = this;
      scopeObj.view.flxRememberMe.setVisibility(false);
      //scopeObj.view.flxRememberMe.isVisible = kony.mvc.MDAApplication.getSharedInstance().appContext.rememberMeStatus;
    },

    onBreakpointChange : function(){
      let self = this;
      let breakpoint = kony.application.getCurrentBreakpoint();
      if (breakpoint >= 640 && breakpoint <= 768) {
        if(self.isPostLogin === false){
          self.view.flxSecureAccessContainer.top = "40dp";
          self.view.flxOTPContainer.top = "40dp";
        }
        else{
          self.view.flxSecureAccessContainer.top = "20dp";
          self.view.flxOTPContainer.top = "0dp";
        }
        self.view.flximgrtx.layoutType = kony.flex.FLOW_VERTICAL;
        self.view.flximgrtx.top = "20dp";
        self.view.lblPhoneOTP.centerX = "50%";
        self.view.rtxEnterCVVCode.contentAlignment = constants.CONTENT_ALIGN_CENTER;
        self.view.rtxEnterCVVCode.centerX = "50%";
        self.view.rtxEnterCVVCode.top = "10dp";
        self.view.rtxEnterCVVCode.width = "100%";
        self.view.flxCVV.top = "40dp";
        self.view.flxCVV.centerX = "50%";
        self.view.flxCVV.width = "100%";
        self.view.flxNotes.top = "40dp";
        self.view.lblNote.width = "100%";
        self.view.lblNote.contentAlignment = constants.CONTENT_ALIGN_CENTER;
        self.view.flxImgTxt.layoutType = kony.flex.FLOW_VERTICAL;
        self.view.lblOTP.centerX = "50%";
        self.view.flxDescription.centerX = "50%";
        self.view.flxDescription.width = "100%";
        self.view.lblHeaderOTP.contentAlignment = constants.CONTENT_ALIGN_CENTER;
        self.view.lblHeaderOTP.top = "10dp";
        self.view.lblResendMessage.contentAlignment = constants.CONTENT_ALIGN_CENTER;
        self.view.lblRegisteredPhone.top = "40dp";
        self.view.lblRegisteredEmail.top = "40dp";
        self.view.flxDisplayAll.width = "100%";
        self.view.flxConfirmation.top = "40dp";
        self.view.flxButtons.layoutType = kony.flex.FREE_FORM;
        self.view.btnCancel.right = "";
        self.view.btnCancel.left = "0dp";
      } else if (breakpoint > 768 && breakpoint <= 1024) {
        if(self.isPostLogin === false){
          self.view.flxSecureAccessContainer.top = "80dp";
          self.view.flxOTPContainer.top = "80dp";
        }
        else{
          self.view.flxSecureAccessContainer.top = "20dp";
          self.view.flxOTPContainer.top = "20dp";
        }
        self.view.flximgrtx.layoutType = kony.flex.FLOW_VERTICAL;
        self.view.flximgrtx.top = "20dp";
        self.view.lblPhoneOTP.centerX = "50%";
        self.view.rtxEnterCVVCode.contentAlignment = constants.CONTENT_ALIGN_CENTER;
        self.view.rtxEnterCVVCode.centerX = "50%";
        self.view.rtxEnterCVVCode.top = "10dp";
        self.view.rtxEnterCVVCode.width = "100%";
        self.view.flxCVV.top = "40dp";
        self.view.flxCVV.centerX = "";
        self.view.flxCVV.width = "350dp";
        self.view.flxNotes.top = "40dp";
        self.view.lblNote.width = "100%";
        self.view.lblNote.contentAlignment = constants.CONTENT_ALIGN_TOP_LEFT;
        self.view.flxImgTxt.layoutType = kony.flex.FLOW_VERTICAL;
        self.view.lblOTP.centerX = "50%";
        self.view.flxDescription.centerX = "50%";
        self.view.flxDescription.width = "100%";
        self.view.lblHeaderOTP.contentAlignment = constants.CONTENT_ALIGN_CENTER;
        self.view.lblHeaderOTP.top = "10dp";
        self.view.lblResendMessage.contentAlignment = constants.CONTENT_ALIGN_CENTER;
        self.view.lblRegisteredPhone.top = "40dp";
        self.view.lblRegisteredEmail.top = "40dp";
        self.view.flxDisplayAll.width = "350dp";
        self.view.flxConfirmation.top = "40dp";
        self.view.flxButtons.layoutType = kony.flex.FLOW_HORIZONTAL;
        self.view.btnCancel.right = "30dp";
        self.view.btnCancel.left = "";
      } else {
        if(self.isPostLogin === false){
          self.view.flxSecureAccessContainer.top = "80dp";
          self.view.flxOTPContainer.top = "80dp";
          self.view.flxCVV.centerX = "50%";
          self.view.flxCVV.width = "100%";
          self.view.rtxEnterCVVCode.width = "70%";
        }
        else{
          self.view.flxSecureAccessContainer.top = "0dp";
          self.view.flxOTPContainer.top = "0dp";
          self.view.flxCVV.centerX = "";
          self.view.flxCVV.width = "350dp";
          self.view.rtxEnterCVVCode.width = "85%";
        }
        self.view.flximgrtx.layoutType = kony.flex.FLOW_HORIZONTAL;
        self.view.flximgrtx.top = "0dp";
        self.view.lblPhoneOTP.centerX = "";
        self.view.lblPhoneOTP.left = "0dp";
        self.view.rtxEnterCVVCode.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        self.view.rtxEnterCVVCode.centerX = "";
        self.view.rtxEnterCVVCode.top = "10dp";
        self.view.rtxEnterCVVCode.left = "20dp";
        self.view.flxCVV.top = "20dp";
        self.view.flxNotes.top = "20dp";
        self.view.lblNote.width = "100%";
        self.view.lblNote.contentAlignment = constants.CONTENT_ALIGN_TOP_LEFT;
        self.view.flxImgTxt.layoutType = kony.flex.FLOW_HORIZONTAL;
        self.view.lblOTP.centerX = "";
        self.view.flxDescription.centerX = "";
        self.view.flxDescription.left = "20dp";
        self.view.flxDescription.width = "85%";
        self.view.lblHeaderOTP.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        self.view.lblHeaderOTP.top = "20dp";
        self.view.lblResendMessage.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_LEFT;
        self.view.lblRegisteredPhone.top = "30dp";
        self.view.lblRegisteredEmail.top = "30dp";
        self.view.flxDisplayAll.width = "350dp";
        self.view.flxConfirmation.top = "30dp";
        self.view.flxButtons.layoutType = kony.flex.FLOW_HORIZONTAL;
        self.view.btnCancel.right = "30dp";
        self.view.btnCancel.left = "";
      }
      self.view.btnResendOTP.centerX = "50%";
      self.view.flxImgTxt.Top = "0dp";
    },

    queryValidation: function(operationName, params, successCallback, failureCallback){
      var objSvc = kony.sdk.getCurrentInstance().getObjectService(this.objectService, {
        "access": "online"
      });
      if(this.action)
        params.Action = this.action;
      var dataObject = new kony.sdk.dto.DataObject(this.dataModel);
      for(var key in params){
        dataObject.addField(key,params[key]);
      }
      var options = {
        "dataObject": dataObject
      };
      function completionCallback(status, data, error) {
        let hasError = data === undefined || data.hasOwnProperty("dbpErrCode") || data.hasOwnProperty("dbpErrMsg") ||  data.opstatus.toString() !== "0";
        if(status === kony.mvc.constants.STATUS_SUCCESS && !hasError){
          successCallback(data);
        } else {
          failureCallback(hasError && data ? data : error);
        }
      }
      var userobj = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository(this.dataModel);
      userobj.customVerb(operationName, params, completionCallback);
    },

    verifyOTP : function(params){
      let scopeObj = this;
      scopeObj.view.flxCVV.skin = scopeObj.normalFlexSkin;
      scopeObj.view.lblOTPError.setVisibility(false);
      var inputparams = {
        "MFAAttributes": {
          "serviceName": scopeObj.serviceName,
          "serviceKey": scopeObj.serviceKey,
          "OTP": params
        }
      };
      scopeObj.queryValidation(scopeObj.verifyOTPOperationName, inputparams, scopeObj.verifyOTPSuccess, scopeObj.verifyOTPFailure);
    },

    verifyOTPSuccess: function(response){
      let scopeObj = this;
      if (response.MFAAttributes) {
        if (response.MFAAttributes.securityKey) {
          scopeObj.securityKey = response.MFAAttributes.securityKey;
          response.MFAAttributes.isOTPExpired = false;
        }
        scopeObj.showScreentoEnterOTP(response.MFAAttributes);
        kony.application.dismissLoadingScreen();
      } else if(scopeObj.onSuccessCallback){
        response.serviceKey = scopeObj.serviceKey;
        scopeObj.onSuccessCallback(response);
      }
    },

    verifyOTPFailure: function(error){
      let scopeObj = this;
      if(!(error.dbpErrCode >= 10500 && error.dbpErrCode <= 10700) && scopeObj.onFailureCallback){
        scopeObj.onFailureCallback(error, true);
      } else if(error.dbpErrMsg && !error.hasOwnProperty("MFAAttributes") && scopeObj.onFailureCallback){
        scopeObj.onFailureCallback(error.dbpErrMsg);
      } else {
        scopeObj.showIncorrectOTPError(error);
      }
      kony.application.dismissLoadingScreen();
    },

    showIncorrectOTPError : function(response){
      let scopeObj = this;
      if(response.errmsg){
        scopeObj.view.lblOTPError.text = response.errmsg;
        scopeObj.view.tbxCVV.text = "";
        scopeObj.disableButton(scopeObj.view.btnLogin);
        scopeObj.disableButton(scopeObj.view.btnContinue);
        kony.application.dismissLoadingScreen();
      } else {
        if (response.MFAAttributes && response.MFAAttributes.remainingFailedAttempts && response.MFAAttributes.remainingFailedAttempts > 0) {
          scopeObj.view.lblOTPError.setVisibility(true);
          scopeObj.view.flxCVV.skin = scopeObj.errorFlexSkin;
          scopeObj.view.lblOTPError.text = kony.i18n.getLocalizedString("i18n.mfa.invalidAccessCode") + " " + response.MFAAttributes.remainingFailedAttempts + " " + kony.i18n.getLocalizedString("i18n.mfa.remainingAttempts");
          scopeObj.view.flxOTPContainer.setVisibility(false);
          scopeObj.view.flxSecureAccessContainer.setVisibility(true);
          scopeObj.view.tbxCVV.text = "";
          if(scopeObj.isFontIconChecked(scopeObj.view.lblMRememberMe)){
            scopeObj.toggleFontCheckbox(scopeObj.view.lblMRememberMe);
            kony.mvc.MDAApplication.getSharedInstance().appContext.registerStatus = false;
          }
          scopeObj.disableButton(scopeObj.view.btnLogin);
          scopeObj.disableButton(scopeObj.view.btnContinue);
          kony.application.dismissLoadingScreen();
        } 
        else if(response.MFAAttributes && response.MFAAttributes.remainingFailedAttempts && response.MFAAttributes.remainingFailedAttempts < 1) {
         var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "AuthUIModule",
                    "appName": "AuthenticationMA"
                });
                var context = {
                    "action": "Logout"
                };
          authModule.presentationController.doLogout(context);
        }
      }
      if(scopeObj.isPostLogin && scopeObj.view.lblOTPError.isVisible){
        scopeObj.view.lblOTPError.setVisibility(false);
        scopeObj.onFailureCallback(scopeObj.view.lblOTPError.text);
      }
    },

    resendOTP:function(params){
      let scopeObj = this;
      var inputparams = {
        "MFAAttributes": {
          "serviceName": scopeObj.serviceName,
          "serviceKey": scopeObj.serviceKey,
          "OTP": params
        }
      };
      scopeObj.queryValidation(scopeObj.resendOTPOperationName, inputparams, scopeObj.verifyOTPSuccess, scopeObj.verifyOTPFailure);
    },

    requestOTP: function(params) {
      let scopeObj = this;
      if(scopeObj.forceLayout){
        scopeObj.forceLayout({"hideError": true});
      }
      var inputparams = {
        "MFAAttributes": {
          "serviceName": scopeObj.serviceName,
          "serviceKey": scopeObj.serviceKey,
          "OTP": params
        }
      };
      scopeObj.queryValidation(scopeObj.requestOTPOperationName, inputparams, scopeObj.requestOTPSuccess, scopeObj.requestOTPFailure);
    },

    requestOTPSuccess: function(response){
      this.showScreentoEnterOTP(response.MFAAttributes);
      this.setText(this.view.btnContinue, kony.i18n.getLocalizedString("i18n.ProfileManagement.Verify"));
    },

    requestOTPFailure: function(response){
      this.showRequestOTPError();
    },

    proceedToRequestOTP: function(){
      let scopeObj = this;
      kony.application.showLoadingScreen("loadingskin","Data is still Loading");
        var selectedData = {
          "phone" :scopeObj.view.lbxPhone.selectedKeyValue[0],
          "email" : scopeObj.view.lbxEmail.selectedKeyValue[0],
        };
        scopeObj.customerPhone  = selectedData.phone;
        scopeObj.customerEmail  = selectedData.email;
        scopeObj.requestOTP(selectedData);
    },

  };
});