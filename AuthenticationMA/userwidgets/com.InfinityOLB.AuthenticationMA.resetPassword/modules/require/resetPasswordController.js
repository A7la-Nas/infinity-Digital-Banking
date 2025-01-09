define(['FormControllerUtility'], function (FormControllerUtility) {

  return {
    constructor: function (baseConfig, layoutConfig, pspConfig) {
      let scopeObj = this;
      scopeObj._primaryBtnEnableSkin = {};
      scopeObj._primaryBtnDisableSkin = {};
      scopeObj._flxSkins = "";
      scopeObj._labelHeaderSkin = {};
      scopeObj._labelTitleSkin = {};
      scopeObj._labelInfoSkin = {};
      scopeObj._labelResendCodeSkin = {};
      scopeObj._textAlignment = {};
      scopeObj._labelErrorSkin = {};
      scopeObj._labelUsernameTitleSkin = {};
      scopeObj._labelUsernameSkin = {};
      scopeObj._txtSkin = {};
      scopeObj._objectService = "";
      scopeObj._resetPasswordRequestOTP = "";
      scopeObj._resetPasswordVerifyOTP = "";
      scopeObj._resetDbxUserPassword = "";
      scopeObj._passwordRulesAndPoliciesOperation = "";
      scopeObj._username = "";
      scopeObj._serviceKey = "";

      scopeObj.breakpoint = "";
      scopeObj.securityKey = "";
      scopeObj.username = "";
      scopeObj.passwordPolicies = {
        "minLength": "",
        "maxLength": "",
        "specialCharactersAllowed": "",
        "atleastOneNumber": "",
        "atleastOneSymbol": "",
        "atleastOneUpperCase": "",
        "atleastOneLowerCase": "",
        "charRepeatCount":""
      };
      scopeObj.passwordRegex = "";
      scopeObj.characterRepeatCountRegex = "";
      scopeObj.pwd = null;
      scopeObj.cnfPwd = null;
      scopeObj.phoneMap = null;
      scopeObj.emailMap = null;
      scopeObj.isComponentEnabled = false;
      scopeObj.selectedPhone = null;
      scopeObj.selectedEmail = null;
      scopeObj.isSecureAccessScreenEnabled = false;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function () {
      defineSetter(this, "primaryBtnEnableSkin", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._primaryBtnEnableSkin = val;
        }
      });
      defineGetter(this, "primaryBtnEnableSkin", function () {
        return this._primaryBtnEnableSkin;
      });
      defineSetter(this, "primaryBtnDisableSkin", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._primaryBtnDisableSkin = val;
        }
      });
      defineGetter(this, "primaryBtnDisableSkin", function () {
        return this._primaryBtnDisableSkin;
      });
      defineSetter(this, "flxSkins", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._flxSkins = val;
        }
      });
      defineGetter(this, "flxSkins", function () {
        return this._flxSkins;
      });
      defineSetter(this, "labelHeaderSkin", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._labelHeaderSkin = val;
        }
      });
      defineGetter(this, "labelHeaderSkin", function () {
        return this._labelHeaderSkin;
      });
      defineSetter(this, "labelTitleSkin", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._labelTitleSkin = val;
        }
      });
      defineGetter(this, "labelTitleSkin", function () {
        return this._labelTitleSkin;
      });
      defineSetter(this, "labelInfoSkin", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._labelInfoSkin = val;
        }
      });
      defineGetter(this, "labelInfoSkin", function () {
        return this._labelInfoSkin;
      });
      defineSetter(this, "labelResendCodeSkin", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._labelResendCodeSkin = val;
        }
      });
      defineGetter(this, "labelResendCodeSkin", function () {
        return this._labelResendCodeSkin;
      });
      defineSetter(this, "labelErrorSkin", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._labelErrorSkin = val;
        }
      });
      defineGetter(this, "labelErrorSkin", function () {
        return this._labelErrorSkin;
      });
      defineSetter(this, "labelUsernameTitleSkin", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._labelUsernameTitleSkin = val;
        }
      });
      defineGetter(this, "labelUsernameTitleSkin", function () {
        return this._labelUsernameTitleSkin;
      });
      defineSetter(this, "labelUsernameSkin", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._labelUsernameSkin = val;
        }
      });
      defineGetter(this, "labelUsernameSkin", function () {
        return this._labelUsernameSkin;
      });
      defineSetter(this, "txtSkin", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._txtSkin = val;
        }
      });
      defineGetter(this, "txtSkin", function () {
        return this._txtSkin;
      });
      defineSetter(this, "textAlignment", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._textAlignment = val;
        }
      });
      defineGetter(this, "textAlignment", function () {
        return this._textAlignment;
      });
      defineSetter(this, "objectService", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._objectService = val;
        }
      });
      defineGetter(this, "objectService", function () {
        return this._objectService;
      });
      defineSetter(this, "resetPasswordRequestOTP", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._resetPasswordRequestOTP = val;
        }
      });
      defineGetter(this, "resetPasswordRequestOTP", function () {
        return this._resetPasswordRequestOTP;
      });
      defineSetter(this, "resetPasswordVerifyOTP", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._resetPasswordVerifyOTP = val;
        }
      });
      defineGetter(this, "resetPasswordVerifyOTP", function () {
        return this._resetPasswordVerifyOTP;
      });
      defineSetter(this, "resetDbxUserPassword", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._resetDbxUserPassword = val;
        }
      });
      defineGetter(this, "resetDbxUserPassword", function () {
        return this._resetDbxUserPassword;
      });
      defineSetter(this, "passwordRulesAndPoliciesOperation", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._passwordRulesAndPoliciesOperation = val;
        }
      });
      defineGetter(this, "passwordRulesAndPoliciesOperation", function () {
        return this._passwordRulesAndPoliciesOperation;
      });
      defineSetter(this, "username", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._username = val;
        }
      });
      defineGetter(this, "username", function () {
        return this._username;
      });
      defineSetter(this, "serviceKey", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._serviceKey = val;
        }
      });
      defineGetter(this, "serviceKey", function () {
        return this._serviceKey;
      });
    },

    postshow: function () {
      let scopeObj = this;
      scopeObj.view.lblPwdIcon.text = "g";
      scopeObj.view.lblPwdIcon.skin = "ICSknLblDropdownFontIcon003e7518px";
      scopeObj.view.lblCnfInfoIcon.text = "g";
      scopeObj.view.lblCnfInfoIcon.skin = "ICSknLblDropdownFontIcon003e7518px";
      this.setFlowActions();
      this.onBreakpointChange();
      this.resetUI();
    },

    setFlowActions: function () {
      let scopeObj = this;
      scopeObj.view.flxResendCode1.accessibilityConfig = {
        a11yARIA : {
          "tabindex" : 0,
          "role":"button"
        }
      };
      scopeObj.view.imgViewCode.src = "show_password.png";
      scopeObj.view.flxImgViewCode.accessibilityConfig = {
        a11yLabel :  scopeObj.view.imgViewCode.src ===  "show_password.png" ? "hide the code, your code is currently visible" : "View the code, your code is currently hidden",
        a11yARIA : {
          "tabindex" : 0,
          "role":"button",
          "aria-live":"off",
          "aria-atomic":true
        }
      };
      scopeObj.view.flxClose.accessibilityConfig = {
        a11yARIA: {
            role: "button",
            tabindex: 0
        },
        a11yLabel: "Close and go back to login"
      };
      scopeObj.view.flxPwdIcon.accessibilityConfig = {
        a11yLabel :  scopeObj.view.lblPwdIcon.text ===  "h" ? "hide the code, your code is currently visible" : "View the code, your code is currently hidden",
        a11yARIA : {
          "tabindex" : 0,
          "role":"button",
          "aria-live":"off",
          "aria-atomic":true
        }
      };   
      scopeObj.view.flxCnfInfoIcon.accessibilityConfig = {
        a11yLabel :  scopeObj.view.lblCnfInfoIcon.text ===  "h" ? "hide the code, your code is currently visible" : "View the code, your code is currently hidden",
        a11yARIA : {
          "tabindex" : 0,
          "role":"button",
          "aria-live":"off",
          "aria-atomic":true
        }
      };
      scopeObj.view.flxPwdIcon.onClick = function () {
        let isSecuredText = scopeObj.view.tbxPassword.secureTextEntry;
        scopeObj.view.tbxPassword.secureTextEntry = !isSecuredText;
        scopeObj.view.lblPwdIcon.text = isSecuredText ? "h" : "g";
        scopeObj.view.flxPwdIcon.accessibilityConfig = {
          a11yLabel: scopeObj.view.lblPwdIcon.text === "h" ? "hide the code, your code is currently visible" : "View the code, your code is currently hidden",
          a11yARIA: {
            "tabindex": 0,
            "role": "button",
            "aria-live": "off",
            "aria-atomic": true
          }
        };
        scopeObj.view.flxPwdIcon.setActive(true);          
     };
      scopeObj.view.flxCnfInfoIcon.onClick = function() {
			let isSecuredText = scopeObj.view.tbxConfirmPassword.secureTextEntry;
		    scopeObj.view.tbxConfirmPassword.secureTextEntry = !isSecuredText;
			scopeObj.view.lblCnfInfoIcon.text = isSecuredText ? "h" : "g";
      scopeObj.view.flxCnfInfoIcon.accessibilityConfig = {
        a11yLabel :  scopeObj.view.lblCnfInfoIcon.text ===  "h" ? "hide the code, your code is currently visible" : "View the code, your code is currently hidden",
        a11yARIA : {
          "tabindex" : 0,
          "role":"button",
          "aria-live":"off",
          "aria-atomic":true
        }
      };
      scopeObj.view.flxCnfInfoIcon.setActive(true);
       };
      scopeObj.view.txtSecureCode.onKeyUp = function () {
        scopeObj.enableOrDisbaleButton(scopeObj.view.btnNext, scopeObj.view.txtSecureCode.text.trim() !== "");
      };

      scopeObj.view.txtSecureCode.onTouchStart = function () {
        scopeObj.setFocusSkin(scopeObj.view.flxSecureAccessCode);
      };

      scopeObj.view.txtSecureCode.onEndEditing = function () {
        scopeObj.setNormalSkin(scopeObj.view.flxSecureAccessCode);
      };
      
      scopeObj.view.flxImgViewCode.onClick = function () {
        let isSecuredText = scopeObj.view.txtSecureCode.secureTextEntry;
        scopeObj.view.txtSecureCode.secureTextEntry = !isSecuredText;
        scopeObj.view.imgViewCode.src = isSecuredText ? "show_password.png" : "hide_password.png";
        scopeObj.view.flxImgViewCode.accessibilityConfig = {
          a11yLabel :  scopeObj.view.imgViewCode.src ===  "show_password.png" ? "hide the code, your code is currently visible" : "View the code, your code is currently hidden",
          a11yARIA : {
            "tabindex" : 0,
            "role":"button",
            "aria-live":"off",
            "aria-atomic":true
          }
        };
        scopeObj.view.flxImgViewCode.setActive(true);
      };
      scopeObj.view.flxResendCode1.onClick= function () {
        scopeObj.resendOTP();
      };

      scopeObj.view.btnNext.onClick = function () {
        scopeObj.verifyOTP();
      };

      scopeObj.view.tbxPassword.onTouchStart = function () {
        scopeObj.setFocusSkin(scopeObj.view.flxPassword);
      };
      scopeObj.view.tbxPassword.onKeyUp = function () {
       scopeObj.enableSetPassword();
      };
      scopeObj.view.tbxPassword.onEndEditing = function () {
        scopeObj.setNormalSkin(scopeObj.view.flxPassword);
      };

      scopeObj.view.tbxConfirmPassword.onTouchStart = function () {
        scopeObj.setFocusSkin(scopeObj.view.flxConfirmPassword);
      };
      scopeObj.view.tbxConfirmPassword.onKeyUp = function () {
       scopeObj.enableSetPassword();
      };
      scopeObj.view.tbxConfirmPassword.onEndEditing = function () {
        scopeObj.setNormalSkin(scopeObj.view.flxConfirmPassword);
        scopeObj.enableSetPassword();
      };
      scopeObj.view.tbxConfirmPassword.onDone = function () {
        scopeObj.setNormalSkin(scopeObj.view.flxConfirmPassword);
        if (scopeObj.view.btnSetPassword.enable)
          scopeObj.resetPassword();
      };

      scopeObj.view.btnSetPassword.onClick = function () {
        scopeObj.resetPassword();
      };

      scopeObj.view.btnProceed.onClick = function () {
        if (scopeObj.showLogin)
          scopeObj.showLogin();
      };

      scopeObj.view.flxClose.onClick = function () {
        if (scopeObj.showLogin)
          scopeObj.showLogin();
      };

      scopeObj.view.btnContinue.onClick = function () {
        scopeObj.displaySecureAccessCodeScreen();
      };
      scopeObj.view.btnNext.accessibilityConfig = {
        a11yLabel:"Continue to reset password"
      }
    },

    showProgressBar: function () {
      FormControllerUtility.showProgressBar(this.view);
    },

    hideProgressBar: function () {
      FormControllerUtility.hideProgressBar(this.view);
    },

    onBreakpointChange: function () {
      let scopeObj = this;
      scopeObj.breakpoint = kony.application.getCurrentBreakpoint();
      let isDesktopBreakpoint = (scopeObj.breakpoint > 1024);
      // OTP Screen
      scopeObj.view.flximgrtx.layoutType = isDesktopBreakpoint ? kony.flex.FLOW_HORIZONTAL : kony.flex.FLOW_VERTICAL;
      scopeObj.view.flximgrtx.height = isDesktopBreakpoint ? "60dp" : "150dp";
	  scopeObj.view.flximgrtx.top = isDesktopBreakpoint ? "20dp" : "0dp";
      scopeObj.view.lblPhoneOTP.centerX = isDesktopBreakpoint ? "" : "50%";
      scopeObj.view.lblResetPwdHeader.centerX = isDesktopBreakpoint ? "" : "50%";
      scopeObj.view.lblResetPwdHeader.centerY = isDesktopBreakpoint ? "50%" : "";
      scopeObj.view.flxContent.width = (scopeObj.breakpoint < 1024) ? "250dp" : "350dp";
      scopeObj.view.lblReset.skin = scopeObj.breakPointParser(scopeObj.labelTitleSkin);
      scopeObj.view.lblResetMb.skin = scopeObj.breakPointParser(scopeObj.labelTitleSkin);
      scopeObj.view.lblReset.setVisibility(isDesktopBreakpoint);
      scopeObj.view.lblResetMb.setVisibility(!isDesktopBreakpoint);
      scopeObj.view.lblResetPwdHeader.skin = scopeObj.breakPointParser(scopeObj.labelHeaderSkin);
      scopeObj.view.lblResetPwdHeader.contentAlignment = constants[scopeObj.breakPointParser(scopeObj.textAlignment)];
      scopeObj.view.lblResetPwdMsg.skin = scopeObj.breakPointParser(scopeObj.labelInfoSkin);
      scopeObj.view.lblResetPwdMsg.contentAlignment = constants[scopeObj.breakPointParser(scopeObj.textAlignment)];
      scopeObj.view.lblErrorMsg.skin = scopeObj.breakPointParser(scopeObj.labelErrorSkin);
      scopeObj.view.txtSecureCode.skin = scopeObj.breakPointParser(scopeObj.txtSkin);
      scopeObj.view.lblResendCode.skin = scopeObj.breakPointParser(scopeObj.labelResendCodeSkin);
      scopeObj.enableOrDisbaleButton(scopeObj.view.btnNext, false);
      // Set Password Screen
      scopeObj.view.flxImgContent.layoutType = isDesktopBreakpoint ? kony.flex.FLOW_HORIZONTAL : kony.flex.FLOW_VERTICAL;
      scopeObj.view.flxImgContent.height = isDesktopBreakpoint ? "60dp" : "100dp";
      scopeObj.view.flxImageContainer.centerX = isDesktopBreakpoint ? "" : "50%";
      scopeObj.view.lblPwdMsg.centerX = isDesktopBreakpoint ? "" : "50%";
      scopeObj.view.lblPwdMsg.centerY = isDesktopBreakpoint ? "50%" : "";
      scopeObj.view.lblPwdMsg.width = isDesktopBreakpoint ? "77%" : "";
      scopeObj.view.lblPwdErrorMsg.skin = scopeObj.breakPointParser(scopeObj.labelErrorSkin);
      scopeObj.view.lblPwdMsg.skin = scopeObj.breakPointParser(scopeObj.labelTitleSkin);
      scopeObj.view.lblPassword.skin = scopeObj.breakPointParser(scopeObj.labelInfoSkin);
      scopeObj.view.lblReenterPassword.skin = scopeObj.breakPointParser(scopeObj.labelInfoSkin);
      scopeObj.view.tbxPassword.skin = scopeObj.breakPointParser(scopeObj.txtSkin);
      scopeObj.view.tbxConfirmPassword.skin = scopeObj.breakPointParser(scopeObj.txtSkin);
      scopeObj.enableOrDisbaleButton(scopeObj.view.btnSetPassword, false);
      // Success Screen
      scopeObj.view.flxSuccessImageContent.layoutType = isDesktopBreakpoint ? kony.flex.FLOW_HORIZONTAL : kony.flex.FLOW_VERTICAL;
      scopeObj.view.flxSuccessImageContent.height = isDesktopBreakpoint ? "80dp" : "140dp";
      scopeObj.view.flxSuccessImageContainer.centerX = isDesktopBreakpoint ? "" : "50%";
      scopeObj.view.lblUsernameTitle.centerX = isDesktopBreakpoint ? "" : "50%";
      scopeObj.view.lblUsername.centerX = isDesktopBreakpoint ? "" : "50%";
      scopeObj.view.lblSuccessMsg.centerX = isDesktopBreakpoint ? "" : "50%";
      scopeObj.view.lblSuccessMsg.skin = scopeObj.breakPointParser(scopeObj.labelTitleSkin);
      scopeObj.view.lblSuccessMsg.contentAlignment = constants[scopeObj.breakPointParser(scopeObj.textAlignment)];
      scopeObj.view.lblUsernameTitle.skin = scopeObj.breakPointParser(scopeObj.labelUsernameTitleSkin);
      scopeObj.view.lblUsername.skin = scopeObj.breakPointParser(scopeObj.labelUsernameSkin);
      scopeObj.enableOrDisbaleButton(scopeObj.view.btnProceed, true);
    },

    breakPointParser: function (inputJSON) {
      let jsonValue = (typeof inputJSON === "string") ? JSON.parse(inputJSON) : inputJSON;
      if (jsonValue.hasOwnProperty(this.breakpoint)) {
        return jsonValue[this.breakpoint];
      }
      else if (jsonValue["default"]) {
        return jsonValue["default"];
      }
      return jsonValue;
    },

    setFocusSkin: function (flexWidget) {
      flexWidget.skin = JSON.parse(this.flxSkins).focusSkin;
    },

    setNormalSkin: function (flexWidget) {
      flexWidget.skin = JSON.parse(this.flxSkins).normalSkin;
    },

    setErrorSkin: function (flexWidget) {
      flexWidget.skin = JSON.parse(this.flxSkins).errorSkin;
    },

    enableRequestResetComponent: function () {
      this.requestOTP(this._username, this._serviceKey);
    },

    setFocusForH1: function(){
      this.view.lblReset.isVisible ? this.view.lblReset.setActive(true) : this.view.lblResetMb.setActive(true);
    },

    resetUI: function () {
      let scopeObj = this;
      scopeObj.isComponentEnabled = false;
      scopeObj.phoneMap = null;
      scopeObj.emailMap = null;
      scopeObj.pwd = null;
      scopeObj.cnfPwd = null;
      scopeObj.selectedPhone = null;
      scopeObj.selectedEmail = null;
      scopeObj.securityKey = "";
      scopeObj.isSecureAccessScreenEnabled = false;
      scopeObj.view.txtSecureCode.text = "";
      scopeObj.view.txtSecureCode.secureTextEntry = true;
	  scopeObj.view.tbxPassword.secureTextEntry = true;
	  scopeObj.view.tbxConfirmPassword.secureTextEntry = true;
      scopeObj.enableOrDisbaleButton(scopeObj.view.btnNext, false);
      scopeObj.view.lblErrorMsg.setVisibility(false);
      scopeObj.view.flxContactDetails.setVisibility(false);
      scopeObj.view.flxSecureCode.setVisibility(false);
      scopeObj.view.flxPasswordContent.setVisibility(false);
      scopeObj.view.flxPaswordSuccess.setVisibility(false);
      scopeObj.view.lblPwdIcon.setVisibility(true);
      scopeObj.view.lblCnfInfoIcon.setVisibility(true);
      scopeObj.view.lblErrorMsg.setVisibility(false);
      scopeObj.view.lblResendCode.setVisibility(true);
      scopeObj.view.tbxPassword.text = "";
      scopeObj.view.tbxConfirmPassword.text = "";
      scopeObj.view.imgUser.src = "";
      scopeObj.view.imageUser.src = "";
      scopeObj.setNormalSkin(scopeObj.view.flxSecureAccessCode);
      scopeObj.setNormalSkin(scopeObj.view.flxPassword);
      scopeObj.setNormalSkin(scopeObj.view.flxSecureAccessCode);
      scopeObj.view.lblPwdErrorMsg.setVisibility(false);
      scopeObj.view.lblPwdErrorMsg.text = "";
	  if(scopeObj.view.flxTitle) {
		var isIphone = applicationManager.getDeviceUtilManager();
		scopeObj.view.flxTitle.setVisibility(!isIphone);
	  }
    },

    enableOrDisbaleButton: function (widget, isEnabled) {
      let skins = isEnabled ? this.breakPointParser(this.primaryBtnEnableSkin) : this.breakPointParser(this.primaryBtnDisableSkin);
      widget.setEnabled(isEnabled);
      widget.skin = skins.normalSkin;
      widget.hoverSkin = skins.hoverSkin;
      widget.focusSkin = skins.focusSkin;
    },

    verifyPassword: function (tbxWidget, iconWidget) {
      let scopeObj = this;
      let isValidText = scopeObj.isValidPassword(scopeObj.passwordPolicies, tbxWidget.text.trim());
      let widgetName = tbxWidget.id;
      if (widgetName === 'tbxPassword')
        scopeObj.pwd = isValidText;
      if (widgetName === 'tbxConfirmPassword')
        scopeObj.cnfPwd = isValidText;
      if (isValidText) {
        iconWidget.skin = scopeObj.successIconSkin;
        iconWidget.text = scopeObj.tickFontIcon;
        scopeObj.setNormalSkin(tbxWidget.parent);
        scopeObj.view.lblPwdErrorMsg.isVisible = false;
      } else {
        iconWidget.skin = scopeObj.warningIconSkin;
        iconWidget.text = scopeObj.exclamationFontIcon;
        scopeObj.setErrorSkin(tbxWidget.parent);
      }
      iconWidget.setVisibility(true);
      tbxWidget.parent.forceLayout();
      scopeObj.enableSetPassword();
    },
    enablePasswordError: function(tbxWidget, iconWidget) {
            let scopeObj = this;
            let isValidText = scopeObj.isValidPassword(scopeObj.passwordPolicies, tbxWidget.text.trim());
            let widgetName = tbxWidget.id;
            if (widgetName === 'tbxPassword') scopeObj.pwd = isValidText;
            if (widgetName === 'tbxConfirmPassword') scopeObj.cnfPwd = isValidText;
            if (isValidText) {
                iconWidget.skin = scopeObj.successIconSkin;
                iconWidget.text = scopeObj.tickFontIcon;
                scopeObj.setNormalSkin(tbxWidget.parent);
				scopeObj.view.lblPwdErrorMsg.isVisible = false;
            } else {
                iconWidget.skin = scopeObj.warningIconSkin;
                iconWidget.text = scopeObj.exclamationFontIcon;
                scopeObj.setErrorSkin(tbxWidget.parent);
				scopeObj.view.lblPwdErrorMsg.text = kony.i18n.getLocalizedString("i18n.common.errorCodes.10054");
				scopeObj.view.lblPwdErrorMsg.skin = "sknLabelSSPFF000015Px";
				scopeObj.view.lblPwdErrorMsg.isVisible = true;
            }
            iconWidget.setVisibility(true);
            tbxWidget.parent.forceLayout();
            scopeObj.enableSetPassword();
            scopeObj.view.tbxPassword.setActive(true);
        },

    enableSetPassword: function () {
      let scopeObj = this;
      let password = scopeObj.view.tbxPassword.text.trim();
      let cnfPassword = scopeObj.view.tbxConfirmPassword.text.trim();
      let isEnabled = false;
      if (password !== "" && cnfPassword !== "")
        isEnabled = true;
      scopeObj.enableOrDisbaleButton(scopeObj.view.btnSetPassword, isEnabled);
    },

    requestOTP: function (username, serviceKey) {
      let scopeObj = this;
      scopeObj.username = username;
      let params = {
        "UserName": username,
        "MFAAttributes": {
          "serviceKey": serviceKey
        }
      };
      scopeObj.requestOTPServiceCall(params);
    },

    requestOTPServiceCall: function (params) {
      let scopeObj = this;
      let dbxUserRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository(scopeObj._objectService);
      dbxUserRepo.customVerb(scopeObj._resetPasswordRequestOTP, params, requestOTPServiceCallBack);
      function requestOTPServiceCallBack(status, data, error) {
        let object = scopeObj.validateResponse(status, data, error);
        if (object["status"] === true) {
          scopeObj.requestOTPSuccessCallBack(object["data"]);
        }
        else {
          scopeObj.requestOTPErrorCallBack(object["data"]);
        }
      }
    },

    requestOTPSuccessCallBack: function (successResponse) {
      let scopeObj = this;
      let mfaAttributes = successResponse.MFAAttributes;
      let emailArray = [];
      let phoneArray = [];
      let headerMessage = null;
      if (mfaAttributes) {
        let customerCommunication = mfaAttributes.customerCommunication;
        if (customerCommunication && customerCommunication.phone && customerCommunication.email) {
          scopeObj.phoneMap = new Map();
          scopeObj.emailMap = new Map();
          (customerCommunication.email).forEach(function (data) {
            var emailKeyValue = [];
            emailKeyValue.push(data.masked);
            emailKeyValue.push(data.masked);
            emailArray.push(emailKeyValue);
            scopeObj.emailMap.set(data.masked, data.referenceId);
          });
          (customerCommunication.phone).forEach(function (data) {
            var phoneKeyValue = [];
            phoneKeyValue.push(data.masked);
            phoneKeyValue.push(data.masked);
            phoneArray.push(phoneKeyValue);
            scopeObj.phoneMap.set(data.masked, data.referenceId);
          });
        }
        let communicationType = mfaAttributes.communicationType;

        if (mfaAttributes.securityKey)
          scopeObj.securityKey = mfaAttributes.securityKey;

        if (scopeObj.isSecureAccessScreenEnabled === true && mfaAttributes.remainingResendAttempts) {
          if (mfaAttributes.remainingResendAttempts === "0") {
            scopeObj.view.lblResendCode.setVisibility(false);
            scopeObj.view.forceLayout();
          }
          scopeObj.hideProgressBar();
          return;
        }

        if (mfaAttributes.success || communicationType === "DISPLAY_NO_VALUE" || communicationType === "DISPLAY_PRIMARY") {
          for (let [key, value] of scopeObj.phoneMap.entries()) {
            scopeObj.selectedPhone = key;
          }
          for (let [key, value] of scopeObj.emailMap.entries()) {
            scopeObj.selectedEmail = key;
          }
          scopeObj.view.flxSecureCode.setVisibility(true);
          scopeObj.isSecureAccessScreenEnabled = true;
          if (communicationType === "DISPLAY_PRIMARY") {
            headerMessage = "Enter Secure Access Code on your " + scopeObj.selectedPhone + " & " + scopeObj.selectedEmail;
          }
          else if (communicationType === "DISPLAY_NO_VALUE") {
            headerMessage = "Security code will be sent to you primary email/phone number";
          }
          scopeObj.view.lblResetPwdHeader.text = headerMessage;
        }
        else if (communicationType === "DISPLAY_ALL") {
          scopeObj.view.lbxPhone.masterData = phoneArray;
          scopeObj.view.lbxEmail.masterData = emailArray;
          scopeObj.view.lbxPhone.selectedKey = this.view.lbxPhone.masterData[0][0];
          scopeObj.view.lbxEmail.selectedKey = this.view.lbxEmail.masterData[0][0];
          scopeObj.view.flxContactDetails.setVisibility(true);
          scopeObj.view.lblResetPwdHeader1.text = "Select registered phone and email to get the secure access code";
        }

        if (scopeObj.isComponentEnabled === true && successResponse.success) {
          scopeObj.view.lblResetPwdHeader.text = "Enter the secure access code sent to your registered phone and email";
          scopeObj.view.flxContactDetails.setVisibility(false);
          scopeObj.view.flxSecureCode.setVisibility(true);
          scopeObj.isSecureAccessScreenEnabled = true;
          scopeObj.view.forceLayout();
          scopeObj.hideProgressBar();
        }
        if (scopeObj.isComponentEnabled === false && scopeObj.displayRequestResetPasswordComponenet) {
          scopeObj.isComponentEnabled = true;
          scopeObj.displayRequestResetPasswordComponenet();
        }
      }
    },

    requestOTPErrorCallBack: function (errorResponse) {
      let scopeObj = this;
      scopeObj.hideProgressBar();
    },

    displaySecureAccessCodeScreen: function () {
      let scopeObj = this;
      scopeObj.showProgressBar();
      scopeObj.selectedPhone = scopeObj.view.lbxPhone.selectedKey;
      scopeObj.selectedEmail = scopeObj.view.lbxEmail.selectedKey;
      let params = {
        "UserName": scopeObj._username,
        "MFAAttributes": {
          "serviceKey": scopeObj._serviceKey,
          "OTP": {
            "phone": scopeObj.phoneMap.get(scopeObj.selectedPhone),
            "email": scopeObj.emailMap.get(scopeObj.selectedEmail)
          }
        }
      }
      scopeObj.requestOTPServiceCall(params);
    },

    resendOTP: function () {
      let scopeObj = this;
      scopeObj.showProgressBar();
      let params = {
        "UserName": scopeObj._username,
        "MFAAttributes": {
          "serviceKey": scopeObj._serviceKey,
          "OTP": {
            "phone": scopeObj.phoneMap.get(scopeObj.selectedPhone),
            "email": scopeObj.emailMap.get(scopeObj.selectedEmail),
            "securityKey": scopeObj.securityKey
          }
        }
      }
      scopeObj.requestOTPServiceCall(params);
    },

    verifyOTP: function () {
      let scopeObj = this;
      scopeObj.showProgressBar();
      let params = {
        "MFAAttributes": {
          "serviceKey": scopeObj._serviceKey,
          "OTP": {
            "otp": scopeObj.view.txtSecureCode.text.trim(),
            "securityKey": scopeObj.securityKey
          }
        }
      }
      scopeObj.verifyOTPServiceCall(params);
    },

    verifyOTPServiceCall: function (params) {
      let scopeObj = this;
      let dbxUserRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository(scopeObj._objectService);
      dbxUserRepo.customVerb(scopeObj._resetPasswordVerifyOTP, params, verifyOTPServiceCallBack);
      function verifyOTPServiceCallBack(status, data, error) {
        let object = scopeObj.validateResponse(status, data, error);
        if (object["status"] === true) {
          scopeObj.verifyOTPServiceSuccessCallBack(object["data"]);
        }
        else {
          scopeObj.verifyOTPServiceErrorCallBack(object["data"]);
        }
      }
    },
    verifyOTPServiceSuccessCallBack: function (successResponse) {
      let scopeObj = this;
      if (successResponse.success && successResponse.isOtpVerified === "true") {
        scopeObj.getPasswordRulesAndPolicies();
      }
    },

    verifyOTPServiceErrorCallBack: function (errorResponse) {
      let scopeObj = this;
      let errorMessage = null;
      let mfaAttributes = errorResponse.serverErrorRes.MFAAttributes;
      if (mfaAttributes.isOTPExpired === "true") {
        errorMessage = kony.i18n.getLocalizedString("i18n.mfa.otpExpired");
      }
      else if (mfaAttributes && mfaAttributes.remainingFailedAttempts && mfaAttributes.remainingFailedAttempts > 0) {
        errorMessage = kony.i18n.getLocalizedString("i18n.mfa.invalidAccessCode") + " " + mfaAttributes.remainingFailedAttempts + " " + kony.i18n.getLocalizedString("i18n.mfa.remainingAttempts");
      }
      else if (mfaAttributes && mfaAttributes.remainingFailedAttempts === "0" && mfaAttributes.lockUser === "true") {
        errorMessage = kony.i18n.getLocalizedString("i18n.mfalogin.lockeduser") + " " + mfaAttributes.lockoutTime + " " + kony.i18n.getLocalizedString("i18n.mfa.minutes");
        scopeObj.showLogin(errorMessage);
        scopeObj.hideProgressBar();
        return;
      }
      else if (mfaAttributes && mfaAttributes.remainingFailedAttempts === "0" && mfaAttributes.logoutUser === "true") {
        errorMessage = kony.i18n.getLocalizedString("i18n.mfaenroll.exceededOTP");
        scopeObj.showLogin(errorMessage);
        scopeObj.hideProgressBar();
        return;
      }
      else {
        errorMessage = errorResponse.errorMessage;
      }
      scopeObj.view.lblErrorMsg.text = errorMessage;
      scopeObj.view.txtSecureCode.text = "";
      scopeObj.view.lblErrorMsg.setVisibility(true);
      scopeObj.enableOrDisbaleButton(scopeObj.view.btnNext, scopeObj.view.txtSecureCode.text.trim() !== "");
      scopeObj.view.forceLayout();
      scopeObj.hideProgressBar();
      scopeObj.view.txtSecureCode.setActive(true);
    },

    displayResetPasswordScreen: function () {
      let scopeObj = this;
      scopeObj.view.flxSecureCode.setVisibility(false);
      scopeObj.view.flxPasswordContent.setVisibility(true);
      scopeObj.view.imgUser.src = "user_image.png";
      scopeObj.view.imageUser.src = "confirmation_tick.png";
      scopeObj.view.forceLayout();
      scopeObj.hideProgressBar();
      scopeObj.view.lblPwdMsg.setActive(true);
    },

    resetPassword: function () {
      let scopeObj = this;
      let isValidText = scopeObj.isValidPassword(scopeObj.passwordPolicies, scopeObj.view.tbxPassword.text.trim());
      let isValidConfirmText = scopeObj.isValidPassword(scopeObj.passwordPolicies, scopeObj.view.tbxConfirmPassword.text.trim());
      if (scopeObj.view.tbxPassword.text.trim() !== scopeObj.view.tbxConfirmPassword.text.trim()) {
        scopeObj.view.lblPwdErrorMsg.text = kony.i18n.getLocalizedString("i18n.idm.newPasswordMismatch");
		scopeObj.view.lblPwdErrorMsg.skin = "sknLabelSSPFF000015Px";
        scopeObj.view.lblPwdErrorMsg.isVisible = true;
        return;
      }
      if(isValidText && isValidConfirmText){
        scopeObj.view.lblPwdErrorMsg.isVisible = false;
        scopeObj.showProgressBar();
        let params = {
            "serviceKey": scopeObj._serviceKey,
            "UserName": scopeObj.username,
            "Password": scopeObj.view.tbxPassword.text.trim()
        }
        scopeObj.resetPasswordService(params);
      } else {
        scopeObj.view.lblPwdErrorMsg.text = kony.i18n.getLocalizedString("i18n.common.errorCodes.10054");
		scopeObj.view.lblPwdErrorMsg.skin = "sknLabelSSPFF000015Px";
        scopeObj.view.lblPwdErrorMsg.isVisible = true;
      }
    },
    resetPasswordService: function (params) {
      let scopeObj = this;
      let dbxUserRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository(scopeObj._objectService);
      dbxUserRepo.customVerb(scopeObj._resetDbxUserPassword, params, resetPasswordVerifyOTPServiceCallBack);
      function resetPasswordVerifyOTPServiceCallBack(status, data, error) {
        let object = scopeObj.validateResponse(status, data, error);
        if (object["status"] === true) {
          scopeObj.resetPasswordServiceSuccessCallBack(object["data"]);
        }
        else {
          scopeObj.resetPasswordServiceErrorCallBack(object["data"]);
        }
      }
    },

    resetPasswordServiceSuccessCallBack: function (successResponse) {
      let scopeObj = this;
      if (successResponse.success) {
        scopeObj.view.flxPasswordContent.setVisibility(false);
        scopeObj.view.flxPaswordSuccess.setVisibility(true);
        scopeObj.view.lblUsername.text = scopeObj._username;
        scopeObj.view.forceLayout();
        scopeObj.hideProgressBar();
        scopeObj.view.lblSuccessMsg.setActive(true);
      }
    },

    resetPasswordServiceErrorCallBack: function (errorResponse) {
      let scopeObj = this;
      scopeObj.hideProgressBar();
      scopeObj.view.lblPwdErrorMsg.text = errorResponse.errorMessage;
      scopeObj.view.lblPwdErrorMsg.isVisible = true;
      scopeObj.view.forceLayout();
    },

    getPasswordRulesAndPolicies: function () {
      let scopeObj = this;
      passwordPoliciesRequestJSON = {
        "ruleForCustomer": "true",
        "policyForCustomer": "true"
      }
      let dbxUserRepo = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository(this._objectService);
      dbxUserRepo.customVerb(this._passwordRulesAndPoliciesOperation, passwordPoliciesRequestJSON, passwordPolicyServiceCallBack);
      function passwordPolicyServiceCallBack(status, data, error) {
        let object = scopeObj.validateResponse(status, data, error);
        if (object["status"] === true) {
          scopeObj.setPasswordPolicies(object.data);
        }
      }
    },

    setPasswordPolicies: function (data) {
      var scopeObj = this;
       if (data) {
//         var policyData = "Minimum Length of Password:" + data.minLength + "\nMaximum Length of Password:" + data.maxLength + "\nSpecial Characters Allowed:" + data.supportedSymbols;
//         if (data.atleastOneNumber === true)
//           policyData += "\nAtleast One Number";
//         if (data.atleastOneSymbol === true)
//           policyData += "\nAtleast One Symbol";
//         if (data.atleastOneUpperCase === true)
//           policyData += "\nAtleast One Uppercase";
//         if (data.atleastOneLowerCase === true)
//           policyData += "\nAtleast One Lowercase";
// 		policyData += "\nAllowed Repetition of characters: " +data.charRepeatCount;
         scopeObj.passwordPolicies.minLength = data.passwordrules.minLength;
         scopeObj.passwordPolicies.maxLength = data.passwordrules.maxLength;
         scopeObj.passwordPolicies.specialCharactersAllowed = data.passwordrules.supportedSymbols;
         scopeObj.passwordPolicies.atleastOneNumber = data.passwordrules.atleastOneNumber;
         scopeObj.passwordPolicies.atleastOneSymbol = data.passwordrules.atleastOneSymbol;
         scopeObj.passwordPolicies.atleastOneUpperCase = data.passwordrules.atleastOneUpperCase;
         scopeObj.passwordPolicies.atleastOneLowerCase = data.passwordrules.atleastOneLowerCase;
 		scopeObj.passwordPolicies.charRepeatCount = data.passwordrules.charRepeatCount;
        scopeObj.view.rtxRulesPassword.text = data.passwordpolicy.content;
      }
      scopeObj.displayResetPasswordScreen();
    },

    isValidPassword: function (data, text) {
      let scopeObj = this;
      if (scopeObj.passwordRegex === "" && scopeObj.characterRepeatCountRegex === "") {
        let repeatedCharRules = "(.)\\1{" + data.charRepeatCount + "}";
        scopeObj.characterRepeatCountRegex = new RegExp(repeatedCharRules);
        let passwordRules = "";
        if (data.specialCharactersAllowed && data.specialCharactersAllowed.includes("-")) {
          data.specialCharactersAllowed = data.specialCharactersAllowed.replace("-", "\\-");
        }
        if (data.specialCharactersAllowed && data.specialCharactersAllowed.includes(",")) {
        	data.specialCharactersAllowed = data.specialCharactersAllowed.replaceAll(",", "");
        }
        if (data.atleastOneLowerCase) {
          passwordRules += "(?=.*\[a-z\])";
        }
        if (data.atleastOneUpperCase) {
          passwordRules += "(?=.*\[A-Z\])";
        }
        if (data.atleastOneNumber) {
          passwordRules += "(?=.*\\d)";
        }
        if (data.atleastOneSymbol) {
          passwordRules = passwordRules + "(?=(.*\[" + data.specialCharactersAllowed + "\]))";
          scopeObj.passwordRegex = new RegExp(passwordRules + "[A-Za-z0-9" + data.specialCharactersAllowed + "]{" + data.minLength + "," + data.maxLength + "}$");
        }
        else {
          scopeObj.passwordRegex = new RegExp(passwordRules + "\[^\\W\]{" + data.minLength + "," + data.maxLength + "}$");
        }
      }
      if (text.match(scopeObj.passwordRegex) && !scopeObj.characterRepeatCountRegex.test(text)) {
        return true;
      }
      return false;
    },

    validateResponse: function (status, response, error) {
      let res, isServiceFailure, data;
      if (status == kony.mvc.constants.STATUS_SUCCESS) {
        if (response.hasOwnProperty("errcode") || response.hasOwnProperty("dbpErrCode") || response.hasOwnProperty("errmsg") || response.hasOwnProperty("dbpErrMsg")) {
          data = {
            "errorCode": response.errcode ? response.errcode : response.dbpErrCode,
            "errorMessage": response.errmsg ? response.errmsg : response.dbpErrMsg,
            "serverErrorRes": response
          };
          res = {
            "status": false,
            "data": data,
            "isServerUnreachable": false
          };
        }
        else
          res = {
            "status": true,
            "data": response,
            "isServerUnreachable": false
          };
      }
      else {
        if (error.opstatus == 1011) {
          if (kony.os.deviceInfo().name === "thinclient" && kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY) === false) {
            location.reload(); //todo later so that it can be in sync with RB
          }
          else {
            isServiceFailure = true;
            errMsg = error.errmsg ? error.errmsg : error.dbpErrMsg;
          }
        }
        else {
          isServiceFailure = false;
          errMsg = error.errmsg ? error.errmsg : error.dbpErrMsg;
        }
        data = {
          "errorCode": error.errcode ? error.errcode : error.dbpErrCode,
          "errorMessage": error.errmsg ? error.errmsg : error.dbpErrMsg,
          "serverErrorRes": error
        };
        res = {
          "status": false,
          "data": data,
          "isServerUnreachable": isServiceFailure
        };
      }
      return res;
    },
  };
});