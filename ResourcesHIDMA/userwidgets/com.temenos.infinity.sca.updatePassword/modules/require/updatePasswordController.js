define(['./updatePasswordDAO','OLBConstants','FormControllerUtility'],function(updatePasswordDAO,OLBConstants,FormControllerUtility) {

  return {
    constructor: function (baseConfig, layoutConfig, pspConfig) {
      this.updatePasswordDAO = new updatePasswordDAO();
      this._primaryBtnEnableSkin = {};
      this._primaryBtnDisableSkin = {};
      this._flexSkins = "";
      this._textboxSkins = "";
      this._objSeviceName = "";
      this._objName = "";
      this._operationName = "";
      this._objSeviceName1 = "";
      this._objName1 = "";
      this._operationName1 = "";
      this.breakpoint = "";
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function () {
      defineSetter(this, 'primaryBtnEnableSkin', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._primaryBtnEnableSkin = val;
        }
      });
      defineGetter(this, 'primaryBtnEnableSkin', function () {
        return this._primaryBtnEnableSkin;
      });
      defineSetter(this, 'primaryBtnDisableSkin', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._primaryBtnDisableSkin = val;
        }
      });
      defineGetter(this, 'primaryBtnDisableSkin', function () {
        return this._primaryBtnDisableSkin;
      });
      defineSetter(this, 'flexSkins', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._flexSkins = val;
        }
      });
      defineGetter(this, 'flexSkins', function () {
        return this._flexSkins;
      });
      defineSetter(this, 'textboxSkins', function (val) {
        if (typeof val === 'string' && val !== '') {
          this._textboxSkins = val;
        }
      });
      defineGetter(this, 'textboxSkins', function () {
        return this._textboxSkins;
      });
      defineGetter(this, 'objSeviceName', () => {
        return this._objSeviceName;
      });
      defineSetter(this, 'objSeviceName', value => {
        this._objSeviceName = value;
      });
      defineGetter(this, 'objName', () => {
        return this._objName;
      });
      defineSetter(this, 'objName', value => {
        this._objName = value;
      });
      defineGetter(this, 'operationName', () => {
        return this._operationName;
      });
      defineSetter(this, 'operationName', value => {
        this._operationName = value;
      });
      defineGetter(this, 'objSeviceName1', () => {
        return this._objSeviceName1;
      });
      defineSetter(this, 'objSeviceName1', value => {
        this._objSeviceName1 = value;
      });
      defineGetter(this, 'objName1', () => {
        return this._objName1;
      });
      defineSetter(this, 'objName1', value => {
        this._objName1 = value;
      });
      defineGetter(this, 'operationName1', () => {
        return this._operationName1;
      });
      defineSetter(this, 'operationName1', value => {
        this._operationName1 = value;
      });
    },
    stepUp: "",

    postShow: function () {
      this.onBreakpointChange();
      this.resetUI();
      this.setFlowActions();
      this.getPasswordPolicies();
    },

    onBreakpointChange: function () {
      let scopeObj = this;
      scopeObj.breakpoint = kony.application.getCurrentBreakpoint();
    },

    resetUI: function () {
      let scopeObj = this;
      scopeObj.setNormalSkin(scopeObj.view.flxExistingPasswordmod);
      scopeObj.setNormalSkin(scopeObj.view.flxNewPasswordmod);
      scopeObj.setNormalSkin(scopeObj.view.flxConfirmPasswordmod);
      scopeObj.view.tbxExistingPassword.text = "";
      scopeObj.view.tbxNewPassword.text = "";
      scopeObj.view.tbxConfirmPassword.text = "";
      scopeObj.view.tbxExistingPassword.skin = scopeObj.breakPointParser(scopeObj.textboxSkins);
      scopeObj.view.tbxNewPassword.skin = scopeObj.breakPointParser(scopeObj.textboxSkins);
      scopeObj.view.tbxConfirmPassword.skin = scopeObj.breakPointParser(scopeObj.textboxSkins);
      scopeObj.hideErrorMessages();
      scopeObj.enableOrDisbaleButton(scopeObj.view.btnEditPasswordProceed,false);
    },

    setFlowActions: function () {
      let scopeObj = this;

      scopeObj.view.tbxExistingPassword.onTouchStart = function () {
        scopeObj.setFocusSkin(scopeObj.view.flxExistingPasswordmod);
      };

      scopeObj.view.tbxExistingPassword.onEndEditing = function () {
        scopeObj.setNormalSkin(scopeObj.view.flxExistingPasswordmod);
        scopeObj.validatePasswordAndEnableButton();
      };

      scopeObj.view.tbxNewPassword.onTouchStart = function () {
        scopeObj.setFocusSkin(scopeObj.view.flxNewPasswordmod);
      };

      scopeObj.view.tbxNewPassword.onEndEditing = function () {
        scopeObj.setNormalSkin(scopeObj.view.flxNewPasswordmod);
        scopeObj.validatePasswordAndEnableButton();
      };

      scopeObj.view.tbxConfirmPassword.onTouchStart = function () {
        scopeObj.setFocusSkin(scopeObj.view.flxConfirmPasswordmod);
      };

      scopeObj.view.tbxConfirmPassword.onEndEditing = function () {
        scopeObj.setNormalSkin(scopeObj.view.flxConfirmPasswordmod);
        scopeObj.validatePasswordAndEnableButton();
      };

      scopeObj.view.btnEditPasswordCancel.onClick = function () {
        scopeObj.view.setVisibility(false);
        if (scopeObj.onCancel)
          scopeObj.onCancel(); 
      };

      scopeObj.view.btnEditPasswordProceed.onClick = function () {
        if (scopeObj.validatePasswordAndEnableButton()){
          scopeObj.RmsBasedAction();
        }
      };
    },

    setFocusSkin: function (flexWidget) {
      flexWidget.skin = JSON.parse(this.flexSkins).focusSkin;
    },

    setNormalSkin: function (flexWidget) {
      flexWidget.skin = JSON.parse(this.flexSkins).normalSkin;
    },

    setErrorSkin: function (flexWidget) {
      flexWidget.skin = JSON.parse(this.flexSkins).errorSkin;
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

    enableOrDisbaleButton: function (widget, isValidPassword) {
      let scopeObj = this;
      let existingPassword = scopeObj.view.tbxExistingPassword.text.trim();
      let password = scopeObj.view.tbxNewPassword.text.trim();
      let cnfPassword = scopeObj.view.tbxConfirmPassword.text.trim();
      let isEnabled =  isValidPassword && existingPassword && password && cnfPassword;
      isEnabled = isEnabled ? true : false;
      let skins = isEnabled ? scopeObj.breakPointParser(scopeObj.primaryBtnEnableSkin) : scopeObj.breakPointParser(scopeObj.primaryBtnDisableSkin);
      widget.setEnabled(isEnabled);
      widget.skin = skins.normalSkin;
      widget.hoverSkin = skins.hoverSkin;
      widget.focusSkin = skins.focusSkin;
    },

    validateResponse: function (status, response, error) {
      let res, isServiceFailure, data;
      if (status === kony.mvc.constants.STATUS_SUCCESS) {
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
        if (error.opstatus === 1011) {
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

    showErrorMessage: function (errorMessage) {
      let scopeObj = this;
      scopeObj.view.lblError1.text = errorMessage;
      scopeObj.view.flxErrorEditPassword.setVisibility(true);
      scopeObj.view.tbxExistingPassword.text = "";
      scopeObj.view.tbxNewPassword.text = "";
      scopeObj.view.tbxConfirmPassword.text = "";
      scopeObj.enableOrDisbaleButton(scopeObj.view.btnEditPasswordProceed,false);
      scopeObj.view.forceLayout();
      kony.application.dismissLoadingScreen();
    },

    hideErrorMessages: function () {
      let scopeObj = this;
      scopeObj.view.flxErrorEditPassword.setVisibility(false);
      scopeObj.view.flxPasswordCriteriaError.setVisibility(false);
      scopeObj.view.forceLayout();
    },

    getPasswordPolicies: function () {
      kony.application.showLoadingScreen("loadingskin","Data is still Loading");
      let scopeObj = this;
      function completionCallback(status, data, error) {
        if (status === kony.mvc.constants.STATUS_SUCCESS || status === true && data) {
          scopeObj.view.rtxRulesPassword.text = data.scapasswordpolicy;
        } else {
          scopeObj.view.rtxRulesPassword.text = error && error.errmsg ? error.errmsg : kony.i18n.getLocalizedString("i18n.ProfileManagement.PasswordPolicyFetchFailed");
        }
        kony.application.dismissLoadingScreen();
      }
      scopeObj.updatePasswordDAO.performOperations(scopeObj._objSeviceName, scopeObj._objName, scopeObj._operationName, {}, completionCallback);
    },

    validatePasswordAndEnableButton: function() {
      let scopeObj = this;
      scopeObj.hideErrorMessages();
      let isExistingPasswordFilled = (scopeObj.view.tbxExistingPassword.text!=='' && scopeObj.view.tbxExistingPassword.text!==null && scopeObj.view.tbxExistingPassword.text!==undefined) ? true : false;
      let isNewPasswordFilled = (scopeObj.view.tbxNewPassword.text!=='' && scopeObj.view.tbxNewPassword.text!==null && scopeObj.view.tbxNewPassword.text!==undefined) ? true : false;
      let isReEnterPasswordFilled = (scopeObj.view.tbxConfirmPassword.text!=='' && scopeObj.view.tbxConfirmPassword.text!==null && scopeObj.view.tbxConfirmPassword.text!==undefined) ? true : false;
      let isValidPassword = false;
      if(isNewPasswordFilled && isReEnterPasswordFilled && isExistingPasswordFilled && scopeObj.validatePassword()) {
        if(scopeObj.view.tbxNewPassword.text===scopeObj.view.tbxConfirmPassword.text)
          isValidPassword = true;
        else{
          isValidPassword = false;
          scopeObj.showErrorMessage(kony.i18n.getLocalizedString("i18n.idm.newPasswordMismatch"));
        }
      }
      else
        isValidPassword = false;
      scopeObj.enableOrDisbaleButton(scopeObj.view.btnEditPasswordProceed, isValidPassword);
      return isValidPassword;
    },

    validatePassword: function(){
      let scopeObj = this;
      return true;
    },

    updateUserPassword: function (stepUp) {
      let scopeObj = this;
      let param = {
        "password": scopeObj.view.tbxNewPassword.text,
        "currentPassword": scopeObj.view.tbxExistingPassword.text,
        "serviceName":"CHANGE_OLB_PASSWORD",
		    "stepUp": stepUp
      };
      scopeObj.view.authValidation.objSeviceName = scopeObj._objSeviceName1;
      scopeObj.view.authValidation.objName = scopeObj._objName1;
      scopeObj.view.authValidation.operationName = scopeObj._operationName1;
      if (stepUp == "false")
      scopeObj.view.authValidation.PerformStepdownAction(param, scopeObj.updateUserPasswordSuccessCallback, scopeObj.updateUserPasswordErrorCallback);
    else
      scopeObj.view.authValidation.sendSCANotificationRequest(param, scopeObj.updateUserPasswordSuccessCallback, scopeObj.updateUserPasswordErrorCallback);
    },

    updateUserPasswordSuccessCallback: function (data) {
      let scopeObj = this;
        if (data && data.errmsg)
          scopeObj.showErrorMessage(data.errmsg);
        else if (scopeObj.onSuccessCallback)
          scopeObj.onSuccessCallback();
        kony.application.dismissLoadingScreen();
    },

    updateUserPasswordErrorCallback: function (errmsg, data, error) {
      let errorMessage = data && data.errorMessage ? data.errorMessage :
        errmsg ? errmsg :
          data && data.errmsg ? data.errmsg :
            error && error.errorMessage ? error.errorMessage :
              error && error.errmsg ? error.errmsg :
                kony.i18n.getLocalizedString("i18n.ProfileManagement.UpdatePasswordFailed");
      this.showErrorMessage(errorMessage);
      },
    
    RmsBasedAction: function () {
      FormControllerUtility.showProgressBar(this.view);
      let actionType = "PASSWORD_UPDATE";
      let appSessionId  = "";
if (OLBConstants.CLIENT_PROPERTIES && OLBConstants.CLIENT_PROPERTIES.SCA_RISK_ASSESSMENT && OLBConstants.CLIENT_PROPERTIES.SCA_RISK_ASSESSMENT.toUpperCase() === "TRUE")
 appSessionId = applicationManager.getRmsSessionID();
     this.view.rmsComponent.rmsActionSuccess = response => {
        if (response.userBlock == "true") {
          FormControllerUtility.hideProgressBar(this.view);
          let usrBlockerrMsg = kony.i18n.getLocalizedString("kony.sca.rms.userBlock");
          this.showErrorMessage(usrBlockerrMsg);
        }
        else {
          FormControllerUtility.hideProgressBar(this.view);
          this.stepUp = response.stepUp;
          this.updateUserPassword(this.stepUp);
        }
      };
      this.view.rmsComponent.rmsActionFailure = response => {
        FormControllerUtility.hideProgressBar(this.view);
        this.stepUp = "true";
        this.updateUserPassword(this.stepUp);
      };
      this.view.rmsComponent.rmsActionCreate(actionType, appSessionId);
    }
  };
});