define(['CommonUtilities', 'CSRAssistUI','FormControllerUtility', 'OLBConstants', 'ViewConstants', 'CampaignUtility'], function(CommonUtilities, CSRAssistUI, FormControllerUtility, OLBConstants, ViewConstants) {
  var orientationHandler = new OrientationHandler();
  var responsiveUtils = new ResponsiveUtils();
  return {
    updateFormUI: function(viewModel) {
      if (viewModel !== undefined) {
        if (viewModel.usernamepasswordRules) this.getPasswordRules(viewModel.usernamepasswordRules);
        if (viewModel.showVerificationByChoice) {
          this.updateRequirements();
        }
        if (viewModel.verifyOtpError) this.showVerifyOtpError();
        if (viewModel.passwordServerError) this.showPasswordServerError(viewModel.passwordServerError);
        if (viewModel.wrongPassword) this.showWrongPasswordError();
        if (viewModel.passwordExists) this.showExistingPasswordError();
        if (viewModel.isLoading !== undefined) this.changeProgressBarState(viewModel.isLoading);   
      }
    },
    preShow:function()
    {
      this.view.flxRight.setVisibility(true);
      this.view.brsrTerms.skin= "sknlbla0a0a015px";
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain','flxMenuItemMobile']);
      this.view.lblCollapseMobile.text  = "O";
      this.view.customheadernew.activateMenu("Settings","Profile Settings");
      this.view.profileMenu.checkLanguage();
      this.view.profileMenu.activateMenu("PROFILESETTINGS","UsernamePassword");
      this.setSelectedValue("i18n.ProfileManagement.Username&Password");
      this.setAccessibility();
      this.view.forceLayout();
    },
    init:function(){
      var self=this;
      applicationManager.getLoggerManager().setCustomMetrics(this, false, "Profile");
      this.view.preShow=this.preShow;
      this.view.postShow=this.postShow;
      this.view.flxAccountSettingsCollapseMobile.onClick = this.toggleMenuMobile;
      this.view.onBreakpointChange = function() {
        self.onBreakpointChange(kony.application.getCurrentBreakpoint());
      };
      this.setFlowActions();
    },
    addUpdatePasswordSCAComponent: function(){ 

        let self = this; 
  
        let currform = kony.application.getCurrentForm(); 
  
        let updatePassword = new com.temenos.infinity.sca.updatePassword({ 
          "appName" : "ResourcesHIDMA",
  
         "autogrowMode": kony.flex.AUTOGROW_NONE, 
  
          "clipBounds": true, 
  
          //"height": "100%", 
  
          "id": "updatePassword", 
  
          "isVisible": true, 
  
          "layoutType": kony.flex.FLOW_VERTICAL, 
  
          "left": "0dp", 
  
          "masterType": constants.MASTER_TYPE_USERWIDGET, 
  
          "isModalContainer": false, 
  
          "skin": "slFbox", 
  
          "top": "0dp", 
  
          "width": "100%", 
  
          "overrides": { 
  
            "updatePassword": { 
  
              "right": "viz.val_cleared", 
  
              "bottom": "viz.val_cleared", 
  
              "minWidth": "viz.val_cleared", 
  
              "minHeight": "viz.val_cleared", 
  
              "maxWidth": "viz.val_cleared", 
  
              "maxHeight": "viz.val_cleared", 
  
              "centerX": "viz.val_cleared", 
  
              "centerY": "viz.val_cleared" 
  
            } 
  
          } 
  
        }, { 
  
          "overrides": {} 
  
        }, { 
  
          "overrides": {} 
  
        }); 
  
        updatePassword.primaryBtnDisableSkin = "{\"640\" : {\"normalSkin\": \"sknBtnBlockedSSP0273e313px\", \"hoverSkin\": \"sknBtnBlockedSSP0273e313px\", \"focusSkin\": \"sknBtnBlockedSSP0273e313px\"}, \"768\": {\"normalSkin\": \"sknBtnBlockedSSP0273e313px\", \"hoverSkin\": \"sknBtnBlockedSSP0273e313px\", \"focusSkin\": \"sknBtnBlockedSSP0273e313px\"},\"default\": {\"normalSkin\": \"sknBtnBlockedSSP0273e315px\", \"hoverSkin\": \"sknBtnBlockedSSP0273e315px\", \"focusSkin\": \"sknBtnBlockedSSP0273e315px\"}}"; 
  
        updatePassword.primaryBtnEnableSkin = "{\"640\" : {\"normalSkin\": \"sknBtnNormalSSPFFFFFF13Px\", \"hoverSkin\": \"sknBtnNormalSSPFFFFFFHover13Px\", \"focusSkin\": \"sknBtnNormalSSPFFFFFF13PxFocus\"}, \"768\": {\"normalSkin\": \"sknBtnNormalSSPFFFFFF13Px\", \"hoverSkin\": \"sknBtnNormalSSPFFFFFFHover13Px\", \"focusSkin\": \"sknBtnNormalSSPFFFFFF13PxFocus\"}, \"default\": {\"normalSkin\": \"sknBtnNormalSSPFFFFFF15Px\", \"hoverSkin\": \"sknBtnNormalSSPFFFFFFHover15Px\", \"focusSkin\": \"sknBtnNormalSSPFFFFFF15PxFocus\"}}"; 
  
        updatePassword.textboxSkins = "{\"640\":\"sknTbxSSP42424213PxWithoutBorder\", \"768\":\"sknTbxSSP42424213PxWithoutBorder\", \"1024\":\"sknTbxSSP42424215PxWithoutBorder\", \"default\":\"sknTbxSSP42424215PxWithoutBorder\"}"; 
  
        updatePassword.flexSkins = "{\"normalSkin\": \"sknBorderE3E3E3\", \"focusSkin\": \"sknFlxBorder4A90E23px\", \"errorSkin\": \"sknborderff0000error\"}"; 
  
        updatePassword.objSeviceName = "SCAActivationObjects"; 
  
        updatePassword.objName = "PasswordPolicy"; 
  
        updatePassword.operationName = "fetch"; 
  
        updatePassword.objSeviceName1 = "SCAObjects"; 
  
        updatePassword.objName1 = "SCAUser"; 
  
        updatePassword.operationName1 = "changeOLBPassword"; 
  
  
  
        updatePassword.onSuccessCallback = function() { 
  
          let authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "AuthUIModule", "appName" : "AuthenticationMA"}); 
  
          authModule.presentationController.onPasswordChange(); 
  
        }; 
  
        updatePassword.onFailureCallback = function() {}; 
  
        updatePassword.onCancel = function() { 
  
          self.showUsernameAndPassword(); 
  
        }; 
  
  
        if(currform.flxUpdatePassword){ 
  
          currform.flxUpdatePassword.add(updatePassword); 
          currform.flxEditPasswordHeader.setVisibility(false);
          currform.flxPasswordChangeContainer.setVisibility(false); 
          currform.flxEditPasswordButtons.setVisibility(false); 
          currform.flxUpdatePassword.setVisibility(true); 
          currform.flxUpdatePassword.updatePassword.setVisibility(true); 
          currform.flxUpdatePassword.height = "700px";
  
        } 
         currform.forceLayout();
  
      }, 
    /**
	* *@param {String} text- text that needs to be appended to the upper text in mobile breakpoint
	*  Method to set the text in mobile breakpoint
	*/
    setSelectedValue: function (text) {
      var self = this;
      CommonUtilities.setText(self.view.lblAccountSettingsMobile, kony.i18n.getLocalizedString(text) , CommonUtilities.getaccessibilityConfig());
    },
    getPasswordRules: function(data) {
      FormControllerUtility.hideProgressBar(this.view);
      if (data) {
       // CommonUtilities.setText(this.view.rtxRulesPassword, data.passwordpolicies.content , CommonUtilities.getaccessibilityConfig());
        this.view.brsrTerms.htmlString=data.passwordpolicies.content;
		if(kony.i18n.getCurrentLocale() === "ar_AE"){
          this.view.brsrTerms.left="0dp";
        }
      } else {
        CommonUtilities.showServerDownScreen();
      }
    },
    showPasswordServerError: function(error) {
      this.view.flxErrorEditPassword.setVisibility(true);
      this.view.tbxExistingPassword.text = "";
      this.view.tbxNewPassword.text = "";
      this.view.tbxConfirmPassword.text = "";
      var errMsg;
      (error.dbpErrMsg)?errMsg=error.dbpErrMsg:errMsg=error.errmsg;
      CommonUtilities.setText(this.view.lblError1, errMsg , CommonUtilities.getaccessibilityConfig());
      this.disableButton(this.view.btnEditPasswordProceed);
      this.view.forceLayout();
      FormControllerUtility.hideProgressBar(this.view);
    },
    /**
	*  Method to set the Accessibility configurations
	*/
    setAccessibility: function(){
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      this.view.btnEditPasswordCancel.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
      this.view.btnEditPasswordProceed.toolTip = kony.i18n.getLocalizedString("i18n.common.proceed");
       this.view.customheadernew.lblAccounts.toolTip=kony.i18n.getLocalizedString("i18n.topmenu.accounts");
      CommonUtilities.setText(this.view.customheadernew.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.ProfileManagement.profilesettings"), accessibilityConfig);
      //CommonUtilities.setText(this.view.lblEditPasswordHeader, kony.i18n.getLocalizedString("i18n.ProfileManagement.EditPassword"), accessibilityConfig);
      //CommonUtilities.setText(this.view.lblExistingPassword, kony.i18n.getLocalizedString("i18n.ProfileManagement.ExistingPassword"), accessibilityConfig);
      //CommonUtilities.setText(this.view.lblNewPassword, kony.i18n.getLocalizedString("i18n.ProfileManagement.NewPassword"), accessibilityConfig);
      //CommonUtilities.setText(this.view.lblConfirmPassword, kony.i18n.getLocalizedString("i18n.ProfileManagement.ConfirmPassword"), accessibilityConfig);
      //CommonUtilities.setText(this.view.lblEditPasswodRules, kony.i18n.getLocalizedString("i18n.ProfileManagement.Pleasenotethefollowingthings"), accessibilityConfig);
      //CommonUtilities.setText(this.view.btnEditPasswordCancel, kony.i18n.getLocalizedString("i18n.transfers.Cancel"), accessibilityConfig);
      //CommonUtilities.setText(this.view.btnEditPasswordProceed, kony.i18n.getLocalizedString("i18n.common.proceed"), accessibilityConfig);
      //CommonUtilities.setText(this.view.lblHeading, kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson"), accessibilityConfig);
      this.view.lblEditPasswordHeader.accessibilityConfig = {
        "a11yLabel": ""
      };
      this.view.lblExistingPassword.accessibilityConfig = {
        "a11yLabel": ""
      };
      this.view.lblNewPassword.accessibilityConfig = {
        "a11yLabel": ""
      };
      this.view.lblConfirmPassword.accessibilityConfig = {
        "a11yLabel": ""
      };
      this.view.btnEditPasswordCancel.accessibilityConfig = {
        "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.EditPasswordCancel")
     };
     this.view.btnEditPasswordProceed.accessibilityConfig = {
        "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.ProceedEditPassword")
     };
     this.view.lblCollapseMobile.accessibilityConfig = {
        "a11yARIA": {
            "tabindex": -1
        }
      };
      this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
        "a11yLabel": "Dropdown"
      };
    }, 
    /**
       * Method to show error while updating the password and ad password is not same for the existing password entered by user
       */
    showExistingPasswordError: function() {
      this.disableButton(this.view.btnEditPasswordProceed);
      this.view.flxErrorEditPassword.setVisibility(true);
      this.view.tbxExistingPassword.text = "";
      this.view.tbxNewPassword.text = "";
      this.view.tbxConfirmPassword.text = "";
      CommonUtilities.setText(this.view.lblError1, kony.i18n.getLocalizedString("i18n.ProfileManagement.passwordExists") , CommonUtilities.getaccessibilityConfig());
      this.view.forceLayout();
      FormControllerUtility.hideProgressBar(this.view);
    },
    /**
      * Method used to show the invalid credentials error message when trying to change password.
      */
    showWrongPasswordError: function(){
      this.disableButton(this.view.btnEditPasswordProceed);
      this.view.flxErrorEditPassword.setVisibility(true);
      this.view.tbxExistingPassword.text = "";
      this.view.tbxNewPassword.text = "";
      this.view.tbxConfirmPassword.text = "";
      CommonUtilities.setText(this.view.lblError1, kony.i18n.getLocalizedString("i18n.idm.existingPasswordMismatch") , CommonUtilities.getaccessibilityConfig());
      this.view.forceLayout();
      FormControllerUtility.hideProgressBar(this.view);
    },
    /**
       * Method to show error while verifying OTP from backend
       */
    showVerifyOtpError: function() {
      this.view.settings.flxErrorSecuritySettingsVerification.setVisibility(true);
      CommonUtilities.setText(this.view.settings.lblErrorSecuritySettingsVerification, kony.i18n.getLocalizedString("i18n.ProfileManagement.invalidCode") , CommonUtilities.getaccessibilityConfig());
      this.view.forceLayout();
      FormControllerUtility.hideProgressBar(this.view);
    },
    updateRequirements: function() {
      var self = this;
      FormControllerUtility.showProgressBar(self.view);
      kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsNewUIModule", "appName" : "ManageProfileMA"}).presentationController.updatePassword(self.view.tbxExistingPassword.text,self.view.tbxNewPassword.text);
    },
    onBreakpointChange: function (width) {
      FormControllerUtility.setupFormOnTouchEnd(width);
      responsiveUtils.onOrientationChange(this.onBreakpointChange);
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);
      this.view.profileMenu.onBreakpointChangeComponent(width);
      orientationHandler.onOrientationChange(this.onBreakpointChange);
      if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        CommonUtilities.setText(this.view.customheadernew.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.ProfileManagement.profilesettings"), accessibilityConfig);
      }
      this.view.forceLayout();      
    },
    isPasswordValid: function(enteredPassword) {
      var validationUtility = applicationManager.getValidationUtilManager();
      var isValidPassword =  validationUtility.isPasswordValidForPolicy(enteredPassword);
      var userName = kony.mvc.MDAApplication.getSharedInstance().appContext.username;
      if (isValidPassword && !this.hasConsecutiveDigits(enteredPassword) && enteredPassword !== userName && this.view.tbxExistingPassword.text.length > 0) {
        return true;
      }
      return false;
    },
    /**
       * Method to Check whether the entered text has consecutive digits or not
       * @param {Int} input - field entered by the User
       */
    hasConsecutiveDigits: function(input) {
      var i;
      var count = 0;
      for (i = 0; i < input.length; i++) {
        // alert(abc[i]);
        if (input[i] >= 0 && input[i] <= 9)
          count++;
        else
          count = 0;
        if (count === 9)
          return true;
      }
      return false;
    },
    setFlowActions:function(){
      var scopeObj=this;
     /* this.view.tbxExistingPassword.onTextChange = function(){
          //CommonUtilities.setText(scopeObj.view.tbxExistingPassword,scopeObj.view.tbxExistingPassword.text.trim() , CommonUtilities.getaccessibilityConfig());
          scopeObj.view.tbxExistingPassword.accessibilityConfig ={
               "a11yValue":scopeObj.view.tbxExistingPassword.text.trim()
          }
      };
      this.view.tbxNewPassword.onTextChange = function(){
          //CommonUtilities.setText(scopeObj.view.tbxNewPassword,scopeObj.view.tbxNewPassword.text.trim() , CommonUtilities.getaccessibilityConfig());
          scopeObj.view.tbxNewPassword.accessibilityConfig ={
               "a11yValue":scopeObj.view.tbxNewPassword.text.trim()
          }
      };
      this.view.tbxConfirmPassword.onTextChange = function(){
          //CommonUtilities.setText(scopeObj.view.tbxConfirmPassword,scopeObj.view.tbxConfirmPassword.text.trim() , CommonUtilities.getaccessibilityConfig());
          scopeObj.view.tbxConfirmPassword.accessibilityConfig ={
               "a11yValue":scopeObj.view.tbxConfirmPassword.text.trim()
          }
      };*/
      scopeObj.addUpdatePasswordSCAComponent();
    },
    enableButton: function(button) {
      if(!CommonUtilities.isCSRMode()){
        button.setEnabled(true);
        button.skin = "sknbtnSSPffffff15px0273e3bg";
        button.hoverSkin = "sknBtnFocusSSPFFFFFF15Px0273e3";
        button.focusSkin = "sknBtnHoverSSPFFFFFF15Px0273e3";
      }
    },
    ValidatePassword: function() {
      if ((this.isPasswordValid(this.view.tbxNewPassword.text)) && (this.isPasswordValid(this.view.tbxConfirmPassword.text))) {
        if (this.isPasswordValidAndMatchedWithReEnteredValue()) {
          this.enableButton(this.view.btnEditPasswordProceed);
          this.view.flxErrorEditPassword.setVisibility(false);
        } else {
          this.disableButton(this.view.btnEditPasswordProceed);
          this.view.flxErrorEditPassword.setVisibility(true);
          CommonUtilities.setText(this.view.lblError1, kony.i18n.getLocalizedString("i18n.idm.newPasswordMismatch"), CommonUtilities.getaccessibilityConfig());
        }
      } else {
        if (!this.isPasswordValidAndMatchedWithReEnteredValue()) {
          if (this.view.tbxNewPassword.text !== "" && this.view.tbxConfirmPassword.text !== "") {
            CommonUtilities.setText(this.view.lblError1, kony.i18n.getLocalizedString("i18n.idm.newPasswordMismatch"), CommonUtilities.getaccessibilityConfig());
            this.disableButton(this.view.btnEditPasswordProceed);
            this.view.flxErrorEditPassword.setVisibility(true);
          }
          else {
            if((!this.isPasswordValid(this.view.tbxNewPassword.text)) && this.view.tbxNewPassword.text !== ""){
              CommonUtilities.setText(this.view.lblError1, kony.i18n.getLocalizedString("i18n.ProfileManagement.YourPasswordDoesnotMeetTheCriteria"), CommonUtilities.getaccessibilityConfig());
              this.disableButton(this.view.btnEditPasswordProceed);
              this.view.flxErrorEditPassword.setVisibility(true);
            }
            else{
              this.view.flxErrorEditPassword.setVisibility(false);
            }
          }
        }
      }
      this.view.forceLayout();
    },
    /**
       * Method to Check whether the password is valid and matches with the re entered password
       */
    isPasswordValidAndMatchedWithReEnteredValue: function() {
      if (this.view.tbxNewPassword.text && this.view.tbxConfirmPassword.text) {
        if (this.view.tbxNewPassword.text === this.view.tbxConfirmPassword.text) {
          return true;
        }
      }
      return false;
    },
    /**
       * Method to Disable a button
       * @param {String} button - ID of the button to be disabled
       */
    disableButton: function(button) {
      button.setEnabled(false);
      button.skin = "sknBtnBlockedSSPFFFFFF15Px";
      button.hoverSkin = "sknBtnBlockedSSPFFFFFF15Px";
      button.focusSkin = "sknBtnBlockedSSPFFFFFF15Px";
    },
    /**
	*  Method to set ui for the component in mobile breakpoint
	*/
    toggleMenuMobile: function () {
      if (this.view.lblCollapseMobile.text === "O") {
        this.view.lblCollapseMobile.text = "P";
        this.view.flxLeft.setVisibility(true);
        this.view.flxRight.setVisibility(false);
      } else {
        this.view.lblCollapseMobile.text  = "O";
        this.view.flxLeft.setVisibility(false);
        this.view.flxRight.setVisibility(true);
      }
    }, 
    /**
	* *@param {Boolean} isLoading- True or false to show/hide the progess bar
	*  Method to set show/hide the progess bar
	*/
    changeProgressBarState: function(isLoading) {
      if (isLoading) {
        FormControllerUtility.showProgressBar(this.view);
      } else {
        FormControllerUtility.hideProgressBar(this.view);
      }
    },
    postShow: function() { 
      applicationManager.getNavigationManager().applyUpdates(this);
      this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight -this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp"; 
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      CommonUtilities.setText(this.view.lblHeading, kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson"), accessibilityConfig);
      this.view.btnEditPasswordProceed.skin = CommonUtilities.disableButtonSkinForCSRMode();
      this.view.forceLayout();      
    },
  };
});