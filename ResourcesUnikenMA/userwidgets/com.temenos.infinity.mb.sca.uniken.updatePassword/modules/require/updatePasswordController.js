define(['SCAUtility'],function(SCAUtility) {
  const SCA_SERVICE_DETAILS = {
    objServiceName: null,
    objName: null,
    operationName: null,
    payload: null,
    successCallback: null,
    errorCallback: null
  };
  const Password_CONTEXT = {
    changePasswordServiceName: "CHANGE_OLB_PASSWORD",
    createPasswordServiceName: "CREATE_OLB_PASSWORD",
    currentPassword: null,
    updatedPassword: null,
  };
  var REL_ID_PwdRegex = null;
  var chkPwd = null;

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._objectServiceName1="";
      this._objectName1="";
      this._operationName1="";
      this._objectServiceName2="";
      this._objectName2="";
      this._operationName2="";
      this._objectServiceName3="";
      this._objectName3="";
      this._operationName3="";
      this._objectServiceName4="";
      this._objectName4="";
      this._operationName4="";
      this._flxHeaderSkn = "";
      this._flxMainContainerSkn = "";
      this._flxGradientSkn = "";
      this._flxSuccessContainerSkn = "";
      this._lblScreenNameSkn = "";
      this._lblTopMsgSkn = "";
      this._lblErrorMsgSkn = "";
      this._lblCurrentPasswordSkn = "";
      this._lblNewPasswordSkn = "";
      this._lblReEnterPasswordSkn = "";
      this._lblSecurityRequirementsSkn = "";
      this._lblSuccessHeaderSkn = "";
      this._lblSuccessBodySkn = "";
      this._btnCancelSkn = "";
      this._btnCreatePasswordEnabledSkn = "";
      this._btnChangePasswordEnabledSkn = "";
      this._btnCreatePasswordDisabledSkn = "";
      this._btnChangePasswordDisabledSkn = "";
      this._btnBack2SettingsSkn = "";
      this._tbxCurrentPasswordSkn = "";
      this._tbxCurrentPasswordFocusSkn = "";
      this._tbxNewPasswordSkn = "";
      this._tbxNewPasswordFocusSkn = "";
      this._tbxReEnterPasswordSkn = "";
      this._tbxReEnterPasswordFocusSkn = "";
      this._rtxRulesPwdSkn = "";
      this._lblScreenNameCreatePasswordTxt = "";
      this._lblScreenNameChangePasswordTxt = "";
      this._lblTopMsgCreatePasswordTxt = "";
      this._lblTopMsgChangePasswordTxt = "";
      this._lblErrorMsgCreatePasswordTxt = "";
      this._lblErrorMsgChangePasswordTxt = "";
      this._lblCurrentPasswordTxt = "";
      this._lblNewPasswordTxt = "";
      this._lblReEnterPasswordTxt = "";
      this._lblSecurityRequirementsTxt = "";
      this._lblSuccessHeaderCreatePasswordTxt = "";
      this._lblSuccessHeaderChangePasswordTxt = "";
      this._lblSuccessBodyCreatePasswordTxt = "";
      this._lblSuccessBodyChangePasswordTxt = "";
      this._btnCancelTxt = "";
      this._btnCreatePasswordTxt = "";
      this._btnChangePasswordTxt = "";
      this._btnBack2SettingsTxt = "";
      this._tbxCurrentPasswordPlaceholderTxt = "";
      this._tbxNewPasswordPlaceholderTxt = "";
      this._tbxReEnterPasswordPlaceholderTxt = "";
      this._imgBackSrc = "";
      this._imgCurrentPasswordVisiblityToggleTrueSrc = "";
      this._imgCurrentPasswordVisiblityToggleFalseSrc = "";
      this._imgNewPasswordVisiblityToggleTrueSrc = "";
      this._imgNewPasswordVisiblityToggleFalseSrc = "";
      this._imgReEnterPasswordMatchTrueSrc = "";
      this._imgReEnterPasswordMatchFalseSrc = "";
      this._imgSuccessSrc = "";
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this, 'objectServiceName1', () => {
        return this._objectServiceName1;
      });
      defineSetter(this, 'objectServiceName1', value => {
        this._objectServiceName1 = value;
      });
      defineGetter(this, 'objectName1', () => {
        return this._objectName1;
      });
      defineSetter(this, 'objectName1', value => {
        this._objectName1 = value;
      });
      defineGetter(this, 'operationName1', () => {
        return this._operationName1;
      });
      defineSetter(this, 'operationName1', value => {
        this._operationName1 = value;
      });
      defineGetter(this, 'objectServiceName2', () => {
        return this._objectServiceName2;
      });
      defineSetter(this, 'objectServiceName2', value => {
        this._objectServiceName2 = value;
      });
      defineGetter(this, 'objectName2', () => {
        return this._objectName2;
      });
      defineSetter(this, 'objectName2', value => {
        this._objectName2 = value;
      });
      defineGetter(this, 'operationName2', () => {
        return this._operationName2;
      });
      defineSetter(this, 'operationName2', value => {
        this._operationName2 = value;
      });
      defineGetter(this, 'objectServiceName3', () => {
        return this._objectServiceName3;
      });
      defineSetter(this, 'objectServiceName3', value => {
        this._objectServiceName3 = value;
      });
      defineGetter(this, 'objectName3', () => {
        return this._objectName3;
      });
      defineSetter(this, 'objectName3', value => {
        this._objectName3 = value;
      });
      defineGetter(this, 'operationName3', () => {
        return this._operationName3;
      });
      defineSetter(this, 'operationName3', value => {
        this._operationName3 = value;
      });
      defineGetter(this, 'objectServiceName4', () => {
        return this._objectServiceName4;
      });
      defineSetter(this, 'objectServiceName4', value => {
        this._objectServiceName4 = value;
      });
      defineGetter(this, 'objectName4', () => {
        return this._objectName4;
      });
      defineSetter(this, 'objectName4', value => {
        this._objectName4 = value;
      });
      defineGetter(this, 'operationName4', () => {
        return this._operationName4;
      });
      defineSetter(this, 'operationName4', value => {
        this._operationName4 = value;
      });
      defineGetter(this, 'flxHeaderSkn', () => {
        return this._flxHeaderSkn;
      });
      defineSetter(this, 'flxHeaderSkn', value => {
        this._flxHeaderSkn = value;
      });
      defineGetter(this, 'flxMainContainerSkn', () => {
        return this._flxMainContainerSkn;
      });
      defineSetter(this, 'flxMainContainerSkn', value => {
        this._flxMainContainerSkn = value;
      });
      defineGetter(this, 'flxGradientSkn', () => {
        return this._flxGradientSkn;
      });
      defineSetter(this, 'flxGradientSkn', value => {
        this._flxGradientSkn = value;
      });
      defineGetter(this, 'flxSuccessContainerSkn', () => {
        return this._flxSuccessContainerSkn;
      });
      defineSetter(this, 'flxSuccessContainerSkn', value => {
        this._flxSuccessContainerSkn = value;
      });
      defineGetter(this, 'lblScreenNameSkn', () => {
        return this._lblScreenNameSkn;
      });
      defineSetter(this, 'lblScreenNameSkn', value => {
        this._lblScreenNameSkn = value;
      });
      defineGetter(this, 'lblTopMsgSkn', () => {
        return this._lblTopMsgSkn;
      });
      defineSetter(this, 'lblTopMsgSkn', value => {
        this._lblTopMsgSkn = value;
      });
      defineGetter(this, 'lblErrorMsgSkn', () => {
        return this._lblErrorMsgSkn;
      });
      defineSetter(this, 'lblErrorMsgSkn', value => {
        this._lblErrorMsgSkn = value;
      });
      defineGetter(this, 'lblCurrentPasswordSkn', () => {
        return this._lblCurrentPasswordSkn;
      });
      defineSetter(this, 'lblCurrentPasswordSkn', value => {
        this._lblCurrentPasswordSkn = value;
      });
      defineGetter(this, 'lblNewPasswordSkn', () => {
        return this._lblNewPasswordSkn;
      });
      defineSetter(this, 'lblNewPasswordSkn', value => {
        this._lblNewPasswordSkn = value;
      });
      defineGetter(this, 'lblReEnterPasswordSkn', () => {
        return this._lblReEnterPasswordSkn;
      });
      defineSetter(this, 'lblReEnterPasswordSkn', value => {
        this._lblReEnterPasswordSkn = value;
      });
      defineGetter(this, 'lblSecurityRequirementsSkn', () => {
        return this._lblSecurityRequirementsSkn;
      });
      defineSetter(this, 'lblSecurityRequirementsSkn', value => {
        this._lblSecurityRequirementsSkn = value;
      });
      defineGetter(this, 'lblSuccessHeaderSkn', () => {
        return this._lblSuccessHeaderSkn;
      });
      defineSetter(this, 'lblSuccessHeaderSkn', value => {
        this._lblSuccessHeaderSkn = value;
      });
      defineGetter(this, 'lblSuccessBodySkn', () => {
        return this._lblSuccessBodySkn;
      });
      defineSetter(this, 'lblSuccessBodySkn', value => {
        this._lblSuccessBodySkn = value;
      });
      defineGetter(this, 'btnCancelSkn', () => {
        return this._btnCancelSkn;
      });
      defineSetter(this, 'btnCancelSkn', value => {
        this._btnCancelSkn = value;
      });
      defineGetter(this, 'btnCreatePasswordEnabledSkn', () => {
        return this._btnCreatePasswordEnabledSkn;
      });
      defineSetter(this, 'btnCreatePasswordEnabledSkn', value => {
        this._btnCreatePasswordEnabledSkn = value;
      });
      defineGetter(this, 'btnCreatePasswordDisabledSkn', () => {
        return this._btnCreatePasswordDisabledSkn;
      });
      defineSetter(this, 'btnCreatePasswordDisabledSkn', value => {
        this._btnCreatePasswordDisabledSkn = value;
      });
      defineGetter(this, 'btnChangePasswordEnabledSkn', () => {
        return this._btnChangePasswordEnabledSkn;
      });
      defineSetter(this, 'btnChangePasswordEnabledSkn', value => {
        this._btnChangePasswordEnabledSkn = value;
      });
      defineGetter(this, 'btnChangePasswordDisabledSkn', () => {
        return this._btnChangePasswordDisabledSkn;
      });
      defineSetter(this, 'btnChangePasswordDisabledSkn', value => {
        this._btnChangePasswordDisabledSkn = value;
      });
      defineGetter(this, 'btnBack2SettingsSkn', () => {
        return this._btnBack2SettingsSkn;
      });
      defineSetter(this, 'btnBack2SettingsSkn', value => {
        this._btnBack2SettingsSkn = value;
      });
      defineGetter(this, 'tbxCurrentPasswordSkn', () => {
        return this._tbxCurrentPasswordSkn;
      });
      defineSetter(this, 'tbxCurrentPasswordSkn', value => {
        this._tbxCurrentPasswordSkn = value;
      });
      defineGetter(this, 'tbxCurrentPasswordFocusSkn', () => {
        return this._tbxCurrentPasswordFocusSkn;
      });
      defineSetter(this, 'tbxCurrentPasswordFocusSkn', value => {
        this._tbxCurrentPasswordFocusSkn = value;
      });
      defineGetter(this, 'tbxNewPasswordSkn', () => {
        return this._tbxNewPasswordSkn;
      });
      defineSetter(this, 'tbxNewPasswordSkn', value => {
        this._tbxNewPasswordSkn = value;
      });
      defineGetter(this, 'tbxNewPasswordFocusSkn', () => {
        return this._tbxNewPasswordFocusSkn;
      });
      defineSetter(this, 'tbxNewPasswordFocusSkn', value => {
        this._tbxNewPasswordFocusSkn = value;
      });
      defineGetter(this, 'tbxReEnterPasswordSkn', () => {
        return this._tbxReEnterPasswordSkn;
      });
      defineSetter(this, 'tbxReEnterPasswordSkn', value => {
        this._tbxReEnterPasswordSkn = value;
      });
      defineGetter(this, 'tbxReEnterPasswordFocusSkn', () => {
        return this._tbxReEnterPasswordFocusSkn;
      });
      defineSetter(this, 'tbxReEnterPasswordFocusSkn', value => {
        this._tbxReEnterPasswordFocusSkn = value;
      });
      defineGetter(this, 'rtxRulesPwdSkn', () => {
        return this._rtxRulesPwdSkn;
      });
      defineSetter(this, 'rtxRulesPwdSkn', value => {
        this._rtxRulesPwdSkn = value;
      });
      defineGetter(this, 'lblScreenNameCreatePasswordTxt', () => {
        return this._lblScreenNameCreatePasswordTxt;
      });
      defineSetter(this, 'lblScreenNameCreatePasswordTxt', value => {
        this._lblScreenNameCreatePasswordTxt = value;
      });
      defineGetter(this, 'lblScreenNameChangePasswordTxt', () => {
        return this._lblScreenNameChangePasswordTxt;
      });
      defineSetter(this, 'lblScreenNameChangePasswordTxt', value => {
        this._lblScreenNameChangePasswordTxt = value;
      });
      defineGetter(this, 'lblTopMsgCreatePasswordTxt', () => {
        return this._lblTopMsgCreatePasswordTxt;
      });
      defineSetter(this, 'lblTopMsgCreatePasswordTxt', value => {
        this._lblTopMsgCreatePasswordTxt = value;
      });
      defineGetter(this, 'lblTopMsgChangePasswordTxt', () => {
        return this._lblTopMsgChangePasswordTxt;
      });
      defineSetter(this, 'lblTopMsgChangePasswordTxt', value => {
        this._lblTopMsgChangePasswordTxt = value;
      });
      defineGetter(this, 'lblErrorMsgCreatePasswordTxt', () => {
        return this._lblErrorMsgCreatePasswordTxt;
      });
      defineSetter(this, 'lblErrorMsgCreatePasswordTxt', value => {
        this._lblErrorMsgCreatePasswordTxt = value;
      });
      defineGetter(this, 'lblErrorMsgChangePasswordTxt', () => {
        return this._lblErrorMsgChangePasswordTxt;
      });
      defineSetter(this, 'lblErrorMsgChangePasswordTxt', value => {
        this._lblErrorMsgChangePasswordTxt = value;
      });
      defineGetter(this, 'lblCurrentPasswordTxt', () => {
        return this._lblCurrentPasswordTxt;
      });
      defineSetter(this, 'lblCurrentPasswordTxt', value => {
        this._lblCurrentPasswordTxt = value;
      });
      defineGetter(this, 'lblNewPasswordTxt', () => {
        return this._lblNewPasswordTxt;
      });
      defineSetter(this, 'lblNewPasswordTxt', value => {
        this._lblNewPasswordTxt = value;
      });
      defineGetter(this, 'lblReEnterPasswordTxt', () => {
        return this._lblReEnterPasswordTxt;
      });
      defineSetter(this, 'lblReEnterPasswordTxt', value => {
        this._lblReEnterPasswordTxt = value;
      });
      defineGetter(this, 'lblSecurityRequirementsTxt', () => {
        return this._lblSecurityRequirementsTxt;
      });
      defineSetter(this, 'lblSecurityRequirementsTxt', value => {
        this._lblSecurityRequirementsTxt = value;
      });
      defineGetter(this, 'lblSuccessHeaderCreatePasswordTxt', () => {
        return this._lblSuccessHeaderCreatePasswordTxt;
      });
      defineSetter(this, 'lblSuccessHeaderCreatePasswordTxt', value => {
        this._lblSuccessHeaderCreatePasswordTxt = value;
      });
      defineGetter(this, 'lblSuccessHeaderChangePasswordTxt', () => {
        return this._lblSuccessHeaderChangePasswordTxt;
      });
      defineSetter(this, 'lblSuccessHeaderChangePasswordTxt', value => {
        this._lblSuccessHeaderChangePasswordTxt = value;
      });
      defineGetter(this, 'lblSuccessBodyCreatePasswordTxt', () => {
        return this._lblSuccessBodyCreatePasswordTxt;
      });
      defineSetter(this, 'lblSuccessBodyCreatePasswordTxt', value => {
        this._lblSuccessBodyCreatePasswordTxt = value;
      });
      defineGetter(this, 'lblSuccessBodyChangePasswordTxt', () => {
        return this._lblSuccessBodyChangePasswordTxt;
      });
      defineSetter(this, 'lblSuccessBodyChangePasswordTxt', value => {
        this._lblSuccessBodyChangePasswordTxt = value;
      });
      defineGetter(this, 'btnCancelTxt', () => {
        return this._btnCancelTxt;
      });
      defineSetter(this, 'btnCancelTxt', value => {
        this._btnCancelTxt = value;
      });
      defineGetter(this, 'btnCreatePasswordTxt', () => {
        return this._btnCreatePasswordTxt;
      });
      defineSetter(this, 'btnCreatePasswordTxt', value => {
        this._btnCreatePasswordTxt = value;
      });
      defineGetter(this, 'btnChangePasswordTxt', () => {
        return this._btnChangePasswordTxt;
      });
      defineSetter(this, 'btnChangePasswordTxt', value => {
        this._btnChangePasswordTxt = value;
      });
      defineGetter(this, 'btnBack2SettingsTxt', () => {
        return this._btnBack2SettingsTxt;
      });
      defineSetter(this, 'btnBack2SettingsTxt', value => {
        this._btnBack2SettingsTxt = value;
      });
      defineGetter(this, 'tbxCurrentPasswordPlaceholderTxt', () => {
        return this._tbxCurrentPasswordPlaceholderTxt;
      });
      defineSetter(this, 'tbxCurrentPasswordPlaceholderTxt', value => {
        this._tbxCurrentPasswordPlaceholderTxt = value;
      });
      defineGetter(this, 'tbxNewPasswordPlaceholderTxt', () => {
        return this._tbxNewPasswordPlaceholderTxt;
      });
      defineSetter(this, 'tbxNewPasswordPlaceholderTxt', value => {
        this._tbxNewPasswordPlaceholderTxt = value;
      });
      defineGetter(this, 'tbxReEnterPasswordPlaceholderTxt', () => {
        return this._tbxReEnterPasswordPlaceholderTxt;
      });
      defineSetter(this, 'tbxReEnterPasswordPlaceholderTxt', value => {
        this._tbxReEnterPasswordPlaceholderTxt = value;
      });
      defineGetter(this, 'imgBackSrc', () => {
        return this._imgBackSrc;
      });
      defineSetter(this, 'imgBackSrc', value => {
        this._imgBackSrc = value;
      });
      defineGetter(this, 'imgCurrentPasswordVisiblityToggleTrueSrc', () => {
        return this._imgCurrentPasswordVisiblityToggleTrueSrc;
      });
      defineSetter(this, 'imgCurrentPasswordVisiblityToggleTrueSrc', value => {
        this._imgCurrentPasswordVisiblityToggleTrueSrc = value;
      });
      defineGetter(this, 'imgCurrentPasswordVisiblityToggleFalseSrc', () => {
        return this._imgCurrentPasswordVisiblityToggleFalseSrc;
      });
      defineSetter(this, 'imgCurrentPasswordVisiblityToggleFalseSrc', value => {
        this._imgCurrentPasswordVisiblityToggleFalseSrc = value;
      });
      defineGetter(this, 'imgNewPasswordVisiblityToggleTrueSrc', () => {
        return this._imgNewPasswordVisiblityToggleTrueSrc;
      });
      defineSetter(this, 'imgNewPasswordVisiblityToggleTrueSrc', value => {
        this._imgNewPasswordVisiblityToggleTrueSrc = value;
      });
      defineGetter(this, 'imgNewPasswordVisiblityToggleFalseSrc', () => {
        return this._imgNewPasswordVisiblityToggleFalseSrc;
      });
      defineSetter(this, 'imgNewPasswordVisiblityToggleFalseSrc', value => {
        this._imgNewPasswordVisiblityToggleFalseSrc = value;
      });
      defineGetter(this, 'imgReEnterPasswordMatchTrueSrc', () => {
        return this._imgReEnterPasswordMatchTrueSrc;
      });
      defineSetter(this, 'imgReEnterPasswordMatchTrueSrc', value => {
        this._imgReEnterPasswordMatchTrueSrc = value;
      });
      defineGetter(this, 'imgReEnterPasswordMatchFalseSrc', () => {
        return this._imgReEnterPasswordMatchFalseSrc;
      });
      defineSetter(this, 'imgReEnterPasswordMatchFalseSrc', value => {
        this._imgReEnterPasswordMatchFalseSrc = value;
      });
      defineGetter(this, 'imgSuccessSrc', () => {
        return this._imgSuccessSrc;
      });
      defineSetter(this, 'imgSuccessSrc', value => {
        this._imgSuccessSrc = value;
      });
    },
	 preShowCreatePassword: function(){
      this.renderTitleBar();
      this.setTextAndSkinFromProperties();
      this.resetUI();
      this.setFlowActions();
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      Controllers.set("UpdatePasswordController", this);
      this.getPasswordPolicies();
      //this.checkPasswordStatus();
    },
    handleSynErrorResponse: function(response) {
                    kony.print("Uniken : handlesyncresponse in updatePasswordController: " + JSON.stringify(response));

                    function SHOW_ALERT_Callback(form) {
                        // form.rdnaObj.resetAuthState();
                    }
                    if (response[0].shortErrorCode !== 0) {
                    if(response[0].shortErrorCode === 213){
                        var errormsg = kony.i18n.getLocalizedString("kony.mb.sca.ErrMsgPlsRetry");
                        this.changePasswordFailureCallback(errormsg);
                    }
                    else{
                        var error = kony.i18n.getLocalizedString("kony.mb.sca.ErrUpdatePwd")
                        this.changePasswordFailureCallback(error);
                        }
                    }
                },
    setFlowActions: function(){
      const scopeObj = this;
      this.view.flxBack.onClick = function(){
        scopeObj.navigateToPreviousForm();
      };
      this.view.btnCancel.onClick = function(){
        scopeObj.navigateToPreviousForm();
      };
      this.view.tbxCurrentPassword.onTextChange = function(){
        scopeObj.view.flxErrorMsg.setVisibility(false);
      };
      this.view.tbxNewPassword.onTouchEnd = function(){
        scopeObj.enableSetPasswordButtonAndTickMark();
      };
      this.view.tbxNewPassword.onTextChange = function(){
        scopeObj.view.flxErrorMsg.setVisibility(false);
        scopeObj.enableSetPasswordButtonAndTickMark();
      };
      this.view.tbxReEnterPassword.onTouchEnd = function(){
        scopeObj.enableSetPasswordButtonAndTickMark();
      };
      this.view.tbxReEnterPassword.onTextChange = function(){
        scopeObj.view.flxErrorMsg.setVisibility(false);
        scopeObj.enableSetPasswordButtonAndTickMark();
      };
      this.view.flxCurrentPasswordVisiblityToggle.onTouchEnd = function(){
        scopeObj.toggleCurrentPasswordVisibility();
      };
      this.view.flxNewPasswordVisiblityToggle.onTouchEnd = function(){
        scopeObj.toggleNewPasswordVisibility();
      };
      this.view.btnChangePassword.onClick = function(){
        Password_CONTEXT.currentPassword = scopeObj.view.tbxCurrentPassword.text;
        Password_CONTEXT.updatedPassword = scopeObj.view.tbxReEnterPassword.text;
        scopeObj.changePassword();
      };
      this.view.btnCreatePassword.onClick = function(){
        Password_CONTEXT.updatedPassword = scopeObj.view.tbxReEnterPassword.text;
        scopeObj.createPassword();
      };
      this.view.btnBack2Settings.onClick = function(){
        const navManager = applicationManager.getNavigationManager();
        navManager.navigateTo("frmSettings");
      };
    },
    resetUI: function(){
      this.view.flxBack.setVisibility(true);
      this.view.btnCancel.setVisibility(true);
      this.view.flxErrorMsg.setVisibility(false);
      this.view.flxMainContainer.setVisibility(true);
      this.view.flxSuccessContainer.setVisibility(false);   
      this.view.tbxCurrentPassword.text = "";
      this.view.tbxNewPassword.text = "";
      this.view.tbxReEnterPassword.text = "";
      Password_CONTEXT.currentPassword = "";
      Password_CONTEXT.updatedPassword = "";
      this.view.tbxCurrentPassword.secureTextEntry = true;
      this.view.tbxNewPassword.secureTextEntry = true;
      this.view.tbxReEnterPassword.secureTextEntry = true;
      this.view.imgCurrentPasswordVisiblityToggle.src = this._imgCurrentPasswordVisiblityToggleFalseSrc;
      this.view.imgNewPasswordVisiblityToggle.src = this._imgNewPasswordVisiblityToggleFalseSrc;
      this.view.imgReEnterPasswordMatch.src = this._imgReEnterPasswordMatchFalseSrc;
      this.view.btnCreatePassword.setEnabled(false);
      this.view.btnCreatePassword.skin = this._btnCreatePasswordDisabledSkn;
      this.view.btnChangePassword.setEnabled(false);
      this.view.btnChangePassword.skin = this._btnChangePasswordDisabledSkn;
    },
    showChangePasswordScreen: function(){      
      this.view.flxMainContainer.setVisibility(true);
      this.view.flxSuccessContainer.setVisibility(false);
      this.view.lblScreenName.text = this.getStringFromi18n(this._lblScreenNameChangePasswordTxt);
      this.view.lblTopMsg.text = this.getStringFromi18n(this._lblTopMsgChangePasswordTxt);
      this.view.flxCurrentPassword.setVisibility(true);
      this.view.btnChangePassword.setVisibility(true);
      this.view.btnCreatePassword.setVisibility(false);
    },
    showCreatePasswordScreen: function(){
      this.view.flxMainContainer.setVisibility(true);
      this.view.flxSuccessContainer.setVisibility(false);
      this.view.lblScreenName.text = this.getStringFromi18n(this._lblScreenNameCreatePasswordTxt);
      this.view.lblTopMsg.text = this.getStringFromi18n(this._lblTopMsgCreatePasswordTxt);
      this.view.flxCurrentPassword.setVisibility(false);
      this.view.btnChangePassword.setVisibility(false);
      this.view.btnCreatePassword.setVisibility(true);
    },
    showResultScreen: function(){
    //   this.view.flxMainContainer.setVisibility(false);
    //   this.view.flxSuccessContainer.setVisibility(true);
    //   this.view.flxBack.setVisibility(false);
    //   this.view.btnCancel.setVisibility(false);
      const authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "AuthUIModule", "appName" : "AuthenticationMA"});
      authMod.presentationController.passwordUpdateLogout();
    },

    enableSetPasswordButtonAndTickMark: function(){
      const scopeObj = this;
      const isChangePasswordFlow = this.view.flxCurrentPassword.isVisible;
      const isNewPasswordFilled = (scopeObj.view.tbxNewPassword.text!=='' && scopeObj.view.tbxNewPassword.text!==null && scopeObj.view.tbxNewPassword.text!==undefined) ? true : false;
      const isReEnterPasswordFilled = (scopeObj.view.tbxReEnterPassword.text!=='' && scopeObj.view.tbxReEnterPassword.text!==null && scopeObj.view.tbxReEnterPassword.text!==undefined) ? true : false;
      if(isChangePasswordFlow) {
        const isCurrentPasswordFilled = (scopeObj.view.tbxCurrentPassword.text!=='' && scopeObj.view.tbxCurrentPassword.text!==null && scopeObj.view.tbxCurrentPassword.text!==undefined) ? true : false;
        if(isCurrentPasswordFilled && isNewPasswordFilled && isReEnterPasswordFilled && this.doPasswordsMatch() && scopeObj.validatePassword(REL_ID_PwdRegex)){
          this.view.btnChangePassword.setEnabled(true);
          this.view.btnChangePassword.skin = this._btnChangePasswordEnabledSkn;
          this.view.flxSecurityRequirements.setVisibility(false);
        } else {
          this.view.btnChangePassword.setEnabled(false);
          this.view.btnChangePassword.skin = this._btnChangePasswordDisabledSkn;
          this.view.flxSecurityRequirements.setVisibility(true);
        }
      } else {
        if(isNewPasswordFilled && isReEnterPasswordFilled && this.doPasswordsMatch()){
          this.view.btnCreatePassword.setEnabled(true);
          this.view.btnCreatePassword.skin = this._btnCreatePasswordEnabledSkn;
          this.view.flxSecurityRequirements.setVisibility(false);
        } else {
          this.view.btnCreatePassword.setEnabled(false);
          this.view.btnCreatePassword.skin = this._btnCreatePasswordDisabledSkn;
          this.view.flxSecurityRequirements.setVisibility(true);
        }
      }
      this.changeTickIcon();
    },
    changeTickIcon: function(){
      if(this.doPasswordsMatch()){
        this.view.imgReEnterPasswordMatch.src = this._imgReEnterPasswordMatchTrueSrc;
      } else {
        this.view.imgReEnterPasswordMatch.src = this._imgReEnterPasswordMatchFalseSrc;
      }
    },
    doPasswordsMatch: function(){
      const newPassword = this.view.tbxNewPassword.text;
      const reEnteredPassword = this.view.tbxReEnterPassword.text;
      if(newPassword===reEnteredPassword){
        return true;
      }
      return false;
    },
    validatePassword: function(pwdRegex_pattern_scope) {
      const scopeObj = this;
      let password = scopeObj.view.tbxNewPassword.text;
      //var pwdRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$");
      var pwdRegex = new RegExp(pwdRegex_pattern_scope);
      if (pwdRegex.test(password.trim())) {
          kony.print("Uniken: Password validated with Regex Successfully ");
          return true;
      } else {
          kony.print("Uniken: Password validated with Regex Failed ");
          return false;
      }
      // return true;
  },
    toggleCurrentPasswordVisibility: function(){
      if (this.view.imgCurrentPasswordVisiblityToggle.src === this._imgCurrentPasswordVisiblityToggleFalseSrc) {
        this.view.imgCurrentPasswordVisiblityToggle.src = this._imgCurrentPasswordVisiblityToggleTrueSrc;
        this.view.tbxCurrentPassword.secureTextEntry = false;
      } else {
        this.view.imgCurrentPasswordVisiblityToggle.src = this._imgCurrentPasswordVisiblityToggleFalseSrc;
        this.view.tbxCurrentPassword.secureTextEntry = true;
      }
    },
    toggleNewPasswordVisibility: function(){
      if (this.view.imgNewPasswordVisiblityToggle.src === this._imgNewPasswordVisiblityToggleFalseSrc) {
        this.view.imgNewPasswordVisiblityToggle.src = this._imgNewPasswordVisiblityToggleTrueSrc;
        this.view.tbxNewPassword.secureTextEntry = false;
      } else {
        this.view.imgNewPasswordVisiblityToggle.src = this._imgNewPasswordVisiblityToggleFalseSrc;
        this.view.tbxNewPassword.secureTextEntry = true;
      }
    },

    navigateToPreviousForm: function(){
      const ntf = new kony.mvc.Navigation(kony.application.getPreviousForm().id);
      ntf.navigate();
    },

    getPasswordPolicies: function(){
      var REL_ID_PWD_JsonString = applicationManager.getNavigationManager().getCustomInfo("UpdatePasswordRules");
      var policy = JSON.parse(REL_ID_PWD_JsonString).msg;
      this.view.rtxRulesPwd.text = policy;
      RDNAUtility.getSession().pwdRegex = JSON.parse(REL_ID_PWD_JsonString).regex;
      var Regex_pattern = RDNAUtility.getSession().pwdRegex;
      REL_ID_PwdRegex = this.base64DecodefrmString(Regex_pattern);
      kony.print("The pwdRegex Pattern for validation : " + JSON.stringify(RDNAUtility.getSession().pwdRegex));
      kony.print("The pwdRegex Pattern for validation : Decoded : " + REL_ID_PwdRegex);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },  

    base64DecodefrmString: function(stringToConvert) {
      try {
          var Base64 = {
              _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
              decode: function(e) {
                  var base64String = "";
                  var characterCount, r, i;
                  var s, o, u, a;
                  var f = 0;
                  e = e.replace(/[^A-Za-z0-9+/=]/g, "");
                  while (f < e.length) {
                      s = this._keyStr.indexOf(e.charAt(f++));
                      o = this._keyStr.indexOf(e.charAt(f++));
                      u = this._keyStr.indexOf(e.charAt(f++));
                      a = this._keyStr.indexOf(e.charAt(f++));
                      characterCount = s << 2 | o >> 4;
                      r = (o & 15) << 4 | u >> 2;
                      i = (u & 3) << 6 | a;
                      base64String = base64String + String.fromCharCode(characterCount);
                      if (u != 64) {
                          base64String = base64String + String.fromCharCode(r);
                      }
                      if (a != 64) {
                          base64String = base64String + String.fromCharCode(i);
                      }
                  }
                  base64String = Base64._utf8_decode(base64String);
                  return base64String;
              },
              _utf8_decode: function(e) {
                  var base64String = "";
                  var characterCount = 0;
                  var r = 0,
                      c1 = 0,
                      c2 = 0,
                      c3 = 0;
                  while (characterCount < e.length) {
                      r = e.charCodeAt(characterCount);
                      if (r < 128) {
                          base64String += String.fromCharCode(r);
                          characterCount++;
                      } else if (r > 191 && r < 224) {
                          c2 = e.charCodeAt(characterCount + 1);
                          base64String += String.fromCharCode((r & 31) << 6 | c2 & 63);
                          characterCount += 2;
                      } else {
                          c2 = e.charCodeAt(characterCount + 1);
                          c3 = e.charCodeAt(characterCount + 2);
                          base64String += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
                          characterCount += 3;
                      }
                  }
                  return base64String;
              }
          };
          if (stringToConvert !== null && stringToConvert !== undefined) {
              var returnBase64 = Base64.decode(stringToConvert);
              kony.print("blob data " + returnBase64);
              return returnBase64;
          } else {
              return null;
          }
      } catch (err) {
          kony.print(err);
      }
  },

    changePassword: function(){
      this.handleSynErrorResponse(RDNAAPI.updatePassword(Password_CONTEXT.currentPassword, Password_CONTEXT.updatedPassword, 2 ));
    },

    onUpdateCredentialResponse : function(res){
      if(res.error.shortErrorCode == 0){
        res=res.status?res:res.challengeResponse;
        if(res.status.statusCode == 100)
          this.changePasswordSuccessCallback(res);
        else if(res.status.statusCode == 102)
          this.changePasswordFailureCallback(res.status.statusMessage);
      }
      else{
        this.changePasswordFailureCallback("Password Update failed")
      }
    },

    changePasswordSuccessCallback: function(res){
      applicationManager.getPresentationUtility().dismissLoadingScreen();      
      this.view.imgSuccess.src = this._imgSuccessSrc;
      this.view.lblSuccessHeader.text = this.getStringFromi18n(this._lblSuccessHeaderChangePasswordTxt);
      this.view.lblSuccessBody.text = this.getStringFromi18n(this._lblSuccessBodyChangePasswordTxt);
      this.showResultScreen();
    },
    
    changePasswordFailureCallback: function(errMsg){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      this.view.flxErrorMsg.setVisibility(true);
      this.view.lblErrorMsg.text = errMsg ? errMsg : this.getStringFromi18n(this._lblErrorMsgChangePasswordTxt);
    },

    createPassword: function(){
      const context = Password_CONTEXT.createPasswordServiceName;
      SCA_SERVICE_DETAILS.objServiceName = this._objectServiceName3;
      SCA_SERVICE_DETAILS.objName = this._objectName3;
      SCA_SERVICE_DETAILS.operationName = this._operationName3;
      SCA_SERVICE_DETAILS.payload = {
        "serviceName": Password_CONTEXT.createPasswordServiceName,
        "isMobile": true,
        "otp": "",
        "context": context,
        "password": Password_CONTEXT.updatedPassword
      };
      SCA_SERVICE_DETAILS.successCallback = this.createPasswordSuccessCallback;
      SCA_SERVICE_DETAILS.errorCallback = this.createPasswordFailureCallback;      
      const userManager = applicationManager.getUserPreferencesManager();
      const userName = userManager.getUserObj().userName;
      this.view.sdk.generateOCRAOTP(userName, context, this.generateOKRAOTPCallback);
    },    
    createPasswordSuccessCallback: function(res){
      applicationManager.getPresentationUtility().dismissLoadingScreen();      
      this.view.imgSuccess.src = this._imgSuccessSrc;
      this.view.lblSuccessHeader.text = this.getStringFromi18n(this._lblSuccessHeaderCreatePasswordTxt);
      this.view.lblSuccessBody.text = this.getStringFromi18n(this._lblSuccessBodyCreatePasswordTxt);
      this.showResultScreen();
    },
    createPasswordFailureCallback: function(errMsg){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      this.view.flxErrorMsg.setVisibility(true);
      this.view.lblErrorMsg.text = errMsg ? errMsg : this.getStringFromi18n(this._lblErrorMsgCreatePasswordTxt);
    },
    getStringFromi18n: function(stringValue){
      return  kony.i18n.getLocalizedString(stringValue) ? kony.i18n.getLocalizedString(stringValue) : stringValue;
    },
    setTextAndSkinFromProperties: function(){
      this.view.flxHeader.skin = this._flxHeaderSkn;
      this.view.flxMainContainer.skin = this._flxMainContainerSkn;
      this.view.flxGradient.skin = this._flxGradientSkn;
      this.view.flxSuccessContainer.skin = this._flxSuccessContainerSkn;
      this.view.lblScreenName.skin = this._lblScreenNameSkn;
      this.view.lblTopMsg.skin = this._lblTopMsgSkn;
      this.view.lblErrorMsg.skin = this._lblErrorMsgSkn;
      this.view.lblCurrentPassword.skin = this._lblCurrentPasswordSkn;
      this.view.lblNewPassword.skin = this._lblNewPasswordSkn;
      this.view.lblReEnterPassword.skin = this._lblReEnterPasswordSkn;
      this.view.lblSecurityRequirements.skin = this._lblSecurityRequirementsSkn;
      this.view.lblSuccessHeader.skin = this._lblSuccessHeaderSkn;
      this.view.lblSuccessBody.skin = this._lblSuccessBodySkn;
      this.view.btnCancel.skin = this._btnCancelSkn;
      this.view.btnCreatePassword.skin = this._btnCreatePasswordDisabledSkn;
      this.view.btnChangePassword.skin = this._btnChangePasswordDisabledSkn;
      this.view.btnBack2Settings.skin = this._btnBack2SettingsSkn;
      this.view.tbxCurrentPassword.skin = this._tbxCurrentPasswordSkn;
      this.view.tbxCurrentPassword.focusSkin = this._tbxCurrentPasswordFocusSkn;
      this.view.tbxNewPassword.skin = this._tbxNewPasswordSkn;
      this.view.tbxNewPassword.focusSkin = this._tbxNewPasswordFocusSkn;
      this.view.tbxReEnterPassword.skin = this._tbxReEnterPasswordSkn;
      this.view.tbxReEnterPassword.focusSkin = this._tbxReEnterPasswordFocusSkn;
      this.view.rtxRulesPwd.skin = this._rtxRulesPwdSkn;
      this.view.lblScreenName.text = this.getStringFromi18n(this._lblScreenNameChangePasswordTxt);
      this.view.lblTopMsg.text = this.getStringFromi18n(this._lblTopMsgChangePasswordTxt);
      this.view.lblErrorMsg.text = this.getStringFromi18n(this._lblErrorMsgChangePasswordTxt);
      this.view.lblCurrentPassword.text = this.getStringFromi18n(this._lblCurrentPasswordTxt);
      this.view.lblNewPassword.text = this.getStringFromi18n(this._lblNewPasswordTxt);
      this.view.lblReEnterPassword.text = this.getStringFromi18n(this._lblReEnterPasswordTxt);
      this.view.lblSecurityRequirements.text = this.getStringFromi18n(this._lblSecurityRequirementsTxt);
      this.view.lblSuccessHeader.text = this.getStringFromi18n(this._lblSuccessHeaderChangePasswordTxt);
      this.view.lblSuccessBody.text = this.getStringFromi18n(this._lblSuccessBodyChangePasswordTxt);
      this.view.btnCancel.text = this.getStringFromi18n(this._btnCancelTxt);
      this.view.btnCreatePassword.text = this.getStringFromi18n(this._btnCreatePasswordTxt);
      this.view.btnChangePassword.text = this.getStringFromi18n(this._btnChangePasswordTxt);
      this.view.btnBack2Settings.text = this.getStringFromi18n(this._btnBack2SettingsTxt);
      this.view.tbxCurrentPassword.placeholder = this.getStringFromi18n(this._tbxCurrentPasswordPlaceholderTxt);
      this.view.tbxNewPassword.placeholder = this.getStringFromi18n(this._tbxNewPasswordPlaceholderTxt);
      this.view.tbxReEnterPassword.placeholder = this.getStringFromi18n(this._tbxReEnterPasswordPlaceholderTxt);
      this.view.imgBack.src = this._imgBackSrc;
      this.view.imgCurrentPasswordVisiblityToggle.src = this._imgCurrentPasswordVisiblityToggleFalseSrc;
      this.view.imgNewPasswordVisiblityToggle.src = this._imgNewPasswordVisiblityToggleFalseSrc;
      this.view.imgReEnterPasswordMatch.src = this._imgReEnterPasswordMatchFalseSrc;
      this.view.imgSuccess.src = this._imgSuccessSrc;
    },
    
     renderTitleBar: function() {
        var deviceUtilManager = applicationManager.getDeviceUtilManager();
        var isIphone = deviceUtilManager.isIPhone();
        if (!isIphone) {
            this.view.flxHeader.isVisible = true;
        } else {
            this.view.flxHeader.isVisible = false;
            this.view.flxMainContainer.top = "-50dp";
        }
     },
  };
});