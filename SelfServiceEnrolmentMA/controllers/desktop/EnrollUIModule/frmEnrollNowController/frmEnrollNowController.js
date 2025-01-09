define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants'], function(CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants) {
  this.customerPhone = "";
  this.customerEmail = "";
  this.serviceKeyForCaptcha = "";
  var orientationHandler = new OrientationHandler();
  var langDropdownClosed = "false";
  var keystoke = "";
  return {
    /**
     * Method to load Enroll Module
     */
    loadEnrollModule: function() { //TODO: will be replaced with Commom Utitlty method if any.
      return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("EnrollModule");
    },
    updateFormUI: function(context) {
      if (context.showProgressBar) {
        FormControllerUtility.showProgressBar(this.view);
      }
      if (context.hideProgressBar) {
        FormControllerUtility.hideProgressBar(this.view);
      }
      if (context.userDetails) {
        this.view.flxVerification.setVisibility(false);
        this.view.flxResetPasswordOptions.setVisibility(true);
      }
      if (context.captchaSuccess) {
        this.view.letsverify.imgCaptcha.base64 = context.captchaSuccess.response.encodedImage;
        this.serviceKeyForCaptcha = context.captchaSuccess.response.serviceKey;
      }
      if (context.captchaFailure) {
        this.handleCaptchaFailure();
      }
      // if (context.action === "ServerDown") {
      //     this.showServerErrorPage(this.view.flxVerification);//have ui issues , so we navigating to login server down.
      // }
      if (context.action === "usernamePoliciesRules") {
        this.setUserNamePolicies(context.data);
        this.setPasswordPolicies(context.data);
        FormControllerUtility.hideProgressBar(this.view);
      }
      if (context.action === "NavigateToEnroll" || context.action === "Navigate to Enroll") {
        this.verifyUser();
      }
      if (context.action === "PasswordResetSuccess") {
        this.getCardsSuccessCallBack(context.data);
      }
      if (context.action === "PasswordResetFailure") {
        this.getCardsErrorCallBack(context.data);
      }
      if (context.action === "CVVValidateSuccess") {
        this.CVVValidateResponseSuccess(context.data);
      }
      if (context.action === "CVVValidateFailure") {
        this.CVVValidateResponseFailure(context.data);
      }
      if (context.action === "OTPValidateSuccess") {
        this.OTPValidateResponseSuccess(context.data);
      }
      if (context.action === "OTPValidateFailure") {
        this.OTPValidateResponseFailure(context.data);
      }
      if (context.action === "OTPResponseSuccess") {
        this.requestOTPResponseSuccess(context.data);
      }
      if (context.action === "OTPResponseFailure") {
        this.requestOTPResponseFailure(context.data);
      }
      if (context.action === "OTPResendSuccess") {
        this.resendOTPResponseSuccess(context.data);
      }
      if (context.action === "OTPResendFailure") {
        this.resendOTPResponseFailure(context.data);
      }
      if (context.action === "CreateUserSuccess") {
        this.createUserPasswordResponseSuccess(context.data);
      }
      if (context.action === "CreateUserFailure") {
        this.createUserPasswordResponseFailure(context.data);
      }
      if (context.action === "FetchQuestionsSuccess") {
        this.staticSetQuestions(context.data.context, context.data.response);
      }
      if (context.action === "FetchQuestionsFailure") {
        this.staticSetQuestionsFailure(context);
      }
      if (context.action === "SaveQuestionsSuccess") {
        this.saveSQCallback(context.data);
      }
      if (context.action === "SaveQuestionsFailure") {
        this.saveSQfailureCallback(context.data);
      }
      if (context.action === "VerifyUserSuccess") {
        this.verifyUserSuccessCallBack(context.data);
      }
      if (context.action === "VerifyUserFailure") {
        this.verifyUserErrorCallBack(context.data);
      }
      if (context.enrollTypeSelectionRequired) {
        this.showEnrollTypeSelection();
      }
      if (context.enrollTypeSelectionNotRequired) {
        this.showPersonalBankingEnrollScreen();
      }
      if (context.showErrorInUserDetailsPageBB) {
        this.showErrorInUserDetailsPageBB(context.showErrorInUserDetailsPageBB);
      }
      if (context.showSendOTPScreen1MBB) {
        this.showSendOTPScreen1MBB();
      }
      if (context.showSendOTPScreen2MBB) {
        this.showSendOTPScreen2MBB();
      }
      if (context.showCreateUserAndPasswordScreenMBB) {
        this.showCreateUserAndPasswordScreenMBB(context.showCreateUserAndPasswordScreenMBB);
      }
      if (context.createUserBBFailure) {
        this.createUserBBFailure(context.createUserBBFailure);
      }
      if (context.showChooseSecuritySettingsScreenMBB) {
        this.showChooseSecuritySettingsScreenMBB(context.showChooseSecuritySettingsScreenMBB);
      }
      if (context.showSecurityQuestionsDetailsScreenMBB) {
        this.showSecurityQuestionsDetailsScreenMBB(context.showSecurityQuestionsDetailsScreenMBB.data, context.showSecurityQuestionsDetailsScreenMBB.backendResponse);
      }
      if (context.showEsignAgreementScreenMBB) {
        this.showEsignAgreementScreenMBB();
      }
      if (context.showCreateUserAndPasswordScreenUsingResetLinkMBB) {
        this.showCreateUserAndPasswordScreenUsingResetLinkMBB(context.showCreateUserAndPasswordScreenUsingResetLinkMBB)
      }
      if (context.invalidPasswordLink) {
        this.showInvalidPasswordLinkPage(context.invalidPasswordLink);
      }
      if (context.resendOtpBB) {
        this.showResendOTPBB();
      }
      if (context.otpValidationFailureBB) {
        this.showOtpValidationFailureBB();
      }
      if (context.createPasswordForOrganizationEmployeeFailure) {
        this.showCreatePasswordForOrganizationEmployeeFailure(context.createPasswordForOrganizationEmployeeFailure);
      }
      if (context.saveSecurityQuestionsFailureBB) {
        this.showSaveSecurityQuestionsFailureBB(context.saveSecurityQuestionsFailureBB);
      }
      if (context.showScreenToEnterSecureCode) {
        this.showScreenToEnterSecureCode(context.showScreenToEnterSecureCode);
      }
      if (context.TnCcontent) {
        this.showTnC(context.TnCcontent);
      }
      if (context.showSecureAccessCodeScreenAfterResend) {
        this.showSecureAccessCodeScreenAfterResend(context.showSecureAccessCodeScreenAfterResend);
      }
      if (context.isEnteredOTPIncorrect) {
        this.showIncorrectOTPError(context.isEnteredOTPIncorrect);
      }
      if (context.isOTPReceived) {
        this.showScreentoEnterOTP(context.isOTPReceived);
      }
      if (context.isOTPRequestFailed) {
        this.showRequestOTPError(context.isOTPRequestFailed);
      }
      if (context.showScreenToEnterSecureCodeMB) {
        this.showScreenToEnterSecureCodeMB(context.showScreenToEnterSecureCodeMB);
      }
      if (context.showSecureAccessCodeScreenAfterResendMB) {
        this.showSecureAccessCodeScreenAfterResendMB(context.showSecureAccessCodeScreenAfterResendMB);
      }
      if (context.isEnteredOTPIncorrectMB) {
        this.showIncorrectOTPErrorMB(context.isEnteredOTPIncorrectMB);
      }
      if (context.isOTPReceivedMB) {
        this.showScreentoEnterOTPMB(context.isOTPReceivedMB);
      }
      var navManager = applicationManager.getNavigationManager();
       var Entityvalue = navManager.getCustomInfo("legalEntityName");
       this.view.lblSelectedEntityValue.text = Entityvalue;
    },
    /**
     * showDates :This function sets the Date Of Birth
     */
    showDates: function() {
      this.setNoOfDays();
      this.allFieldsCheck();
    },
    /**
     * securityQuesAnsProceed :This function sets the UI for securityQuestions flex
     */
    securityQuesAnsProceed: function() {
      var self = this;
      this.view.flxSecurityQuestionsAck.isVisible = false;
      this.view.flxVerification.isVisible = true;
      this.view.flxVerification.letsverify.isVisible = true;
      this.goToLogin();
    },
    //     /**
    //     * showServerErrorPage :This function is for showing the server DownTime Screen
    //     * @member of {frmEnrollNowController}
    //     * @param {object} currentFlex takes current flex to navigate to server error page
    //    */
    //     showServerErrorPage: function (currentFlex) {
    //         currentFlex.isVisible = false;
    //         FormControllerUtility.hideProgressBar(this.view);
    //         this.view.flxEnrollOrServerError.isVisible = true;
    //     },
    /**
     * passwordEditing :The function is called when the user enters the wrong password and gives an error that password doesnot meet the required criteria
     */
    passwordEditing: function() {
      this.showRulesPassword();
      if (this.view.newUsernamepasswordsetting.lblErrorInfo.isVisible) {
        this.reEnterNewPassword();
      }
    },
    /**
     * newUsernameValidation :The function is internally calls other function which validates the user
     */
    newUsernameValidation: function() {
      this.ValidateUserName(this.view.newUsernamepasswordsetting.tbxNewUserName.text);
    },
    /**
     * newPwdValidation :The function is internally calls other function which validates the password
     */
    newPwdValidation: function() {
      if (this.view.newUsernamepasswordsetting.tbxNewPassword.text !== "") {
        this.validateNewPassword(this.view.newUsernamepasswordsetting.tbxNewPassword.text);
      }
      else {
        this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch.isVisible = false;
        this.view.newUsernamepasswordsetting.imgValidPassword.isVisible = false;
      }
      this.view.forceLayout();
    },
    hideTextBox: function() {
      var scopeObj = this;

      function timerFunc() {
        scopeObj.view.tbxAutopopulateIssueFix.setVisibility(false);
        kony.timer.cancel("mytimer");
      }
      kony.timer.schedule("mytimer", timerFunc, 0.5, false);
    },
    frmEnrollInit: function() {
      this.view.tbxAutopopulateIssueFix.secureTextEntry = true;
      this.view.tbxAutopopulateIssueFix.setVisibility(true);
    },
    /**
         * Method triggers when click on language dropdown
         */
        languageDropdownClick: function() {
            var scopeObj = this;
            if (scopeObj.view.lblCheckBox.text === "O") {
                scopeObj.view.flxLanguagePicker.isVisible = true;
                scopeObj.view.lblCheckBox.text = "P";
                scopeObj.view.flxDropdown.accessibilityConfig = {
                    "a11yLabel":"Current Language "+scopeObj.view.lblLanguage.text+". Click here to choose another language",
                     a11yARIA: {
                      "aria-expanded": true,
                      role: "button"
                    },
                  };
            } else {
                scopeObj.view.flxLanguagePicker.isVisible = false;
                scopeObj.view.lblCheckBox.text = "O";      
                scopeObj.view.flxDropdown.accessibilityConfig = {
                    "a11yLabel":"Current Language "+scopeObj.view.lblLanguage.text+". Click here to choose another language",
                    a11yARIA: {
                      "aria-expanded": false,
                      role: "button"
                    },
                  };   
            }
        },
    /**
     * Function to be called on post show of the frmEnrollNow
     */
    onPostShow: function() {
      var scopeObj = this;
      scopeObj.hideTextBox();
      var width = kony.application.getCurrentBreakpoint();
      this.view.OrLine.setVisibility(true);
      this.view.BusinessBanking.setVisibility(true);
                  if(width === 768){
                scopeObj.view.flxSelectedEntityValue.width = "80%";
                scopeObj.view.flxSelectedEntityValue.left = "10%";
                scopeObj.view.lblSelectedEntityValue.left = "7dp";
                scopeObj.view.lblSelectedEntityValue.top = "7dp";

            }
      // if ((width === 640 && orientationHandler.isMobile) || (width === 768 && orientationHandler.isMobile)) {
      //     this.view.OrLine.setVisibility(false);
      //     this.view.BusinessBanking.setVisibility(false);
      // } else {
      //     this.view.OrLine.setVisibility(true);
      //     this.view.BusinessBanking.setVisibility(true);
      // }
      this.view.letsverify.flxDOB.setVisibility(false);
      this.view.letsverify.flxDateInput.setVisibility(true);
      this.view.CustomDate.setVisibility(false);
      this.view.flxDateInput.setVisibility(true);
      this.view.DateInput.textChangeCallback = function() {
        this.view.lblWrongInformation.isVisible = false;
        var text = this.view.DateInput.getText();
        if (text.length === 10) {
          var date = this.view.DateInput.getDateObject();
          if (!(date instanceof Date) || isNaN(date.getDay())) {
            this.view.lblWrongInformation.text = kony.i18n.getLocalizedString("i18n.common.invalidDOB");
            this.view.lblWrongInformation.isVisible = true;
            this.view.DateInput.setText("");
          }
          else {
            this.view.lblWrongInformation.isVisible = false;
          }
        }
        this.allFieldsCheckBB();
        this.view.forceLayout();
      }.bind(this);
      this.view.letsverify.DateInput.textChangeCallback = function() {
        this.view.letsverify.lblWrongInfo.isVisible = false;
        var text = this.view.letsverify.DateInput.getText();
        if (text.length === 10) {
          var date = this.view.letsverify.DateInput.getDateObject();
          if (!(date instanceof Date) || isNaN(date.getDay())) {
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            //CommonUtilities.setText(this.view.letsverify.lblWrongInfo, kony.i18n.getLocalizedString("i18n.common.invalidDOB"), accessibilityConfig);
            this.view.letsverify.lblWrongInfo.text = kony.i18n.getLocalizedString("i18n.common.invalidDOB");
            this.view.letsverify.lblWrongInfo.isVisible = true;
            this.view.letsverify.DateInput.setText("");
          }
          else {
            this.view.letsverify.lblWrongInfo.isVisible = false;
          }
        }
        this.allFieldsCheck();
        this.view.forceLayout();
      }.bind(this);
      this.view.letsverify.DateInput.onPostShow(applicationManager.getFormatUtilManager().getDateFormat(), "frmEnrollNow_letsverify_DateInput");
      this.view.DateInput.onPostShow(applicationManager.getFormatUtilManager().getDateFormat(), "frmEnrollNow_DateInput");
      this.view.letsverify.DateInput.tbxDateInputKA.left = "1dp";
      this.view.AlterneteActionsEnterCVV.skin = OLBConstants.SKINS.COMMON_TEXTBOX_NOERROR;
      this.view.AlterneteActionsEnterCVV.hoverSkin = OLBConstants.SKINS.COMMON_TEXTBOX_HOVER;
      this.view.AlterneteActionsEnterPIN.skin = OLBConstants.SKINS.COMMON_TEXTBOX_NOERROR;
      this.view.AlterneteActionsEnterPIN.hoverSkin = OLBConstants.SKINS.COMMON_TEXTBOX_HOVER;
      this.view.PersonalBanking.skin = OLBConstants.SKINS.COMMON_TEXTBOX_NOERROR;
      this.view.PersonalBanking.hoverSkin = OLBConstants.SKINS.COMMON_TEXTBOX_HOVER;
      this.view.PersonalBanking.accessibilityConfig = {
        "a11yARIA":{
            "role": "button",
            }
        };
      this.view.BusinessBanking.skin = OLBConstants.SKINS.COMMON_TEXTBOX_NOERROR;
      this.view.BusinessBanking.hoverSkin = OLBConstants.SKINS.COMMON_TEXTBOX_HOVER;
      this.view.BusinessBanking.accessibilityConfig = {
        "a11yARIA":{
            "role": "button",
            }
        };
      this.view.OrLine.imgOr.accessibilityConfig = {
        "a11yARIA": {
            "aria-hidden" : true,
            "tabindex" : -1
        }
      };
      var handCursor = document.querySelectorAll(("." + OLBConstants.SKINS.COMMON_TEXTBOX_NOERROR));
      for (var i = 0; i < handCursor.length; i++) {
        handCursor[i].style.cursor = "pointer";
      }
      // this.setmainflexheight();
      this.onLoadChangePointer();
      this.setFlowActions();
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
    //   CommonUtilities.setText(this.view.btnLocateUs, kony.i18n.getLocalizedString("i18n.footer.locateUs"), accessibilityConfig);
    //   CommonUtilities.setText(this.view.btnFaqs, kony.i18n.getLocalizedString("i18n.footer.faqs"), accessibilityConfig);
    //   CommonUtilities.setText(this.view.btnContactUs, kony.i18n.getLocalizedString("i18n.footer.contactUs"), accessibilityConfig);
    //   CommonUtilities.setText(this.view.btnPrivacy, kony.i18n.getLocalizedString("i18n.footer.privacy"), accessibilityConfig);
    //   CommonUtilities.setText(this.view.btnTermsAndConditions, kony.i18n.getLocalizedString("i18n.common.TnC"), accessibilityConfig);
      this.view.btnLocateUs.text = kony.i18n.getLocalizedString("i18n.footer.locateUs");
      this.view.btnFaqs.text = kony.i18n.getLocalizedString("i18n.footer.faqs");
      this.view.btnContactUs.text =  kony.i18n.getLocalizedString("i18n.footer.contactUs");
      this.view.btnPrivacy.text = kony.i18n.getLocalizedString("i18n.footer.privacy");
      this.view.btnTermsAndConditions.text = kony.i18n.getLocalizedString("i18n.common.TnC");
      this.view.btnLocateUs.onClick = function() {
        var locateUsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LocateUsModule");
        locateUsModule.presentationController.showLocateUsPage();
      };
      this.view.btnFaqs.onClick = function() {
        var informationContentModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("InformationContentModule");
        informationContentModule.presentationController.showOnlineHelp();
      };
      this.view.btnContactUs.onClick = function() {
        var informationContentModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("InformationContentModule");
        informationContentModule.presentationController.showContactUsPage();
      };
      this.view.btnContact.onClick = function() {
        var informationContentModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("InformationContentModule");
        informationContentModule.presentationController.showContactUsPage();
      };
      this.view.btnSignInNow.onClick = function() {
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo("frmLogin");
      };
      this.view.btnActivateYourProfile.onClick = function() {
        let context = {
          "action": "NavigateToActivate"
        };
        let authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "AuthUIModule", "appName" : "AuthenticationMA"});
        authModule.presentationController.showLoginScreen(context);
      };
      this.view.btnPrivacy.onClick = function() {
        var informationContentModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("InformationContentModule");
        informationContentModule.presentationController.showPrivacyPolicyPage();
      };
      this.view.btnTermsAndConditions.onClick = function() {
        var termsAndConditionModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TermsAndConditionsModule");
        termsAndConditionModule.presentationController.showTermsAndConditions(OLBConstants.TNC_FLOW_TYPES.Footer_TnC);
      };
      this.view.flxClose.onClick = function() {
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo("frmLogin");
      };
      this.view.flxclose1.onClick = function() {
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo("frmLogin");
      };
      this.view.flxDropdown.onClick = function() {
                if (langDropdownClosed === "true" && keystoke !== "Enter") {
                    langDropdownClosed = "";
                    keystoke = "";
                } else if (langDropdownClosed === "false" && scopeObj.view.lblCheckBox.text === "O") {
                    scopeObj.languageDropdownClick();
                    langDropdownClosed = "";
                } else {
                    scopeObj.languageDropdownClick();
                }
            };
      this.view.newUsernamepasswordsetting.flxRulesPassword.setVisibility(false);
      this.view.newUsernamepasswordsetting.tbxNewUserName.onBeginEditing = this.showRulesUsername;
      this.view.newUsernamepasswordsetting.tbxNewUserName.onKeyUp = this.newUsernameValidation; //ValidateUserName(this.view.newUsernamepasswordsetting.tbxNewUserName.text);
      this.view.newUsernamepasswordsetting.tbxNewPassword.onBeginEditing = this.passwordEditing;
      this.view.newUsernamepasswordsetting.tbxNewPassword.onKeyUp = this.newPwdValidation; //validateNewPassword(this.view.newpasswordsetting.tbxNewPassword.text);
      this.view.newUsernamepasswordsetting.tbxMatchPassword.onKeyUp = this.validateConfirmPassword;
      this.view.newUsernamepasswordsetting.btnCreate.onClick = this.showResetConfirtoResetPasswordmationPage;
      this.view.letsverify.lbxMonth.onSelection = this.showDates;
      this.view.letsverify.lbxYear.onSelection = this.showDates;
	   this.view.letsverify.flxRefresh.accessibilityConfig = {
        "a11yLabel" : "Refresh",
        "a11yARIA": {
            "tabindex": 0,
            "role":"button"
         }
      };
      FormControllerUtility.disableButton(this.view.letsverify.btnProceed);
      FormControllerUtility.disableButton(this.view.resetusingOTPEnterOTP.btnNext);
      FormControllerUtility.disableButton(this.view.ResetOrEnroll.btnNext);
      FormControllerUtility.disableButton(this.view.newUsernamepasswordsetting.btnCreate);
      FormControllerUtility.disableButton(this.view.SetSecurityQuestions.btnSetSecurityQuestionsProceed);
      applicationManager.getNavigationManager().applyUpdates(this);
      this.accessibilityFocusSetup();
      try {
        FormControllerUtility.setRequestUrlConfig(this.view.brwBodyTnC);
      }
      catch(e){
      }
    },
    /**
     * Set foucs handlers for skin of parent flex on input focus 
     */
    accessibilityFocusSetup: function() {
      let widgets = [
        [this.view.tbxOTP, this.view.flxOTP],
      ];
      for (let i = 0; i < widgets.length; i++) {
        CommonUtilities.setA11yFoucsHandlers(widgets[i][0], widgets[i][1], this);
      }
    },
    /**
     * setFlowActions :The function contains the list of actions
     */
    setFlowActions: function() {
      var scopeObj = this;
      this.view.letsverify.flxWhatIsSSN.onClick = function() {
        if (scopeObj.view.AllForms.isVisible === false) {
          scopeObj.view.AllForms.left = "26%";
          scopeObj.view.AllForms.top = scopeObj.view.letsverify.flexSSN.frame.y + scopeObj.view.letsverify.flxWhatIsSSN.frame.height + "dp";
          scopeObj.view.AllForms.setVisibility(true);
        }
        else {
          scopeObj.view.AllForms.setVisibility(false);
        }
      };
      this.view.flxWhatIsSSN.onClick = function() {
        if (scopeObj.view.AllFormsBB.isVisible === false) {
          scopeObj.view.AllFormsBB.setVisibility(true);
        }
        else {
          scopeObj.view.AllFormsBB.setVisibility(false);
        }
      };
      this.view.AllForms.flxCross.onClick = function() {
        scopeObj.view.AllForms.setVisibility(false);
      };
      this.view.AllFormsBB.flxCross.onClick = function() {
        scopeObj.view.AllFormsBB.setVisibility(false);
      };
      this.view.letsverify.tbxSSN.onTextChange = function() {
        scopeObj.view.letsverify.lblWrongInfo.setVisibility(false);
        scopeObj.view.forceLayout();
      };
      this.view.letsverify.tbxTaxID.onTextChange = function() {
        scopeObj.view.letsverify.lblWrongInfo.setVisibility(false);
        scopeObj.view.forceLayout();
      };
      this.view.letsverify.tbxCaptcha.onTextChange = function() {
        scopeObj.view.letsverify.flxCaptchaText.skin = "skne3e3e3br3pxradius";
        scopeObj.view.letsverify.lblWrongInfo.setVisibility(false);
        scopeObj.allFieldsCheck();
        scopeObj.view.forceLayout();
      };
      this.view.letsverify.tbxLastName.onTextChange = function() {
        scopeObj.view.letsverify.lblWrongInfo.setVisibility(false);
        scopeObj.view.forceLayout();
      };
      this.view.letsverify.flxRefresh.onClick = function() {
        scopeObj.fetchCaptchaForEnrollment();
      };
      //this.view.letsverify.lblRefresh.onTouchStart = function() {
      //  scopeObj.fetchCaptchaForEnrollment();
      //};
    },
    /**
     * This function is used to set height of main flex
     */
    setmainflexheight: function() {
      // var height = kony.os.deviceInfo().screenHeight;
      // this.view.flxMain.height = height + "dp";
      // this.view.forceLayout();
    },
    /**
     * This function is called once the user clicks on enroll button then enroll form visiblilty is set to false and verification flex visibility is set to true
     */
    verifyUser: function() {
      FormControllerUtility.hideProgressBar(this.view);
      this.view.flxLogoutMsg.setVisibility(false);
      this.view.flxMain.skin = ViewConstants.SKINS.LOGIN_ERROR_BAKGROUND;
      this.view.flxSecurityQuestionsAck.setVisibility(false);
      this.view.flxUsernameAndPasswordAck.setVisibility(false);
      this.view.flxPhoneAndEmail.setVisibility(false);
      this.view.flxVerification.setVisibility(true);
      this.view.flxVerification.letsverify.isVisible = true;
      this.emptyUserDetails();
      this.view.flxVerification.parent.forceLayout();
    },
    /**
     * goToResetUsingOTP :This function is for setting the visibility of the flxSendOTP as true on clicking of the "Reset using OTP" option
     */
    goToResetUsingOTP: function() {
      this.view.flxResetPasswordOptions.isVisible = false;
      this.view.flxResetUsingCVV.isVisible = false;
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
     // CommonUtilities.setText(this.view.flxSendOTP.resetusingOTP.lblResendOTPMsg, kony.i18n.getLocalizedString("i18n.enrollNow.sendOTP"), accessibilityConfig);
      this.view.flxSendOTP.resetusingOTP.lblResendOTPMsg.text = kony.i18n.getLocalizedString("i18n.enrollNow.sendOTP");
      this.view.resetusingOTPEnterOTP.lblWrongOTP.isVisible = false;
      this.view.flxSendOTP.isVisible = true;
      this.view.flxResetUsingCVV.isVisible = false;
      this.view.ResetOrEnroll.tbxCVV.secureTextEntry = true;
      this.view.resetusingOTPEnterOTP.tbxCVV.secureTextEntry = false;
      this.view.resetusingOTP.flxCVV.isVisible = false;
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      //CommonUtilities.setText(this.view.resetusingOTP.btnNext, kony.i18n.getLocalizedString("i18n.common.send"), accessibilityConfig);
      this.view.resetusingOTP.btnNext.text = kony.i18n.getLocalizedString("i18n.common.send");
      this.view.forceLayout();
    },
    /**
     * This function shows the OTP flex once the user clicks on "Reset using the Secure Access Code" Option
     */
    showEnterOTPPage: function() {
      var self = this;
      this.view.flxSendOTP.isVisible = false;
      this.view.resetusingOTPEnterOTP.flxCVV.isVisible = true;
      this.view.resetusingOTPEnterOTP.btnResendOTP.isVisible = true;
      this.view.resetusingOTPEnterOTP.lblResendOTPMsg.isVisible = false;
      this.view.resetusingOTPEnterOTP.lblWrongOTP.isVisible = false;
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      //CommonUtilities.setText(this.view.resetusingOTPEnterOTP.lblWrongOTP, kony.i18n.getLocalizedString("i18n.Enrollnow.ResendOTP"), accessibilityConfig);
      this.view.resetusingOTPEnterOTP.lblWrongOTP.text = kony.i18n.getLocalizedString("i18n.Enrollnow.ResendOTP");
      this.view.resetusingOTPEnterOTP.btnNext.top = "3.52%";
      this.view.resetusingOTPEnterOTP.btnUseCVV.top = "2.61%";
      //CommonUtilities.setText(this.view.resetusingOTPEnterOTP.btnNext, kony.i18n.getLocalizedString("i18n.common.next"), accessibilityConfig);
      this.view.resetusingOTPEnterOTP.btnNext.text = kony.i18n.getLocalizedString("i18n.common.next");
      this.view.flxResetUsingOTP.isVisible = true;
      self.view.resetusingOTPEnterOTP.btnResendOTP.setEnabled(false);
      self.view.resetusingOTPEnterOTP.btnResendOTP.skin = OLBConstants.SKINS.LOGIN_RESEND_OTP_DISABLED;
      self.view.resetusingOTPEnterOTP.btnResendOTP.hoverSkin = OLBConstants.SKINS.LOGIN_RESEND_OTP_DISABLED;
      self.view.flxResetUsingOTP.parent.forceLayout();
      self.enalbeResendButton();
    },
    /**
     * enalbeResendButton: Enable Re-send button after one second.
     */
    enalbeResendButton: function() {
      var scopeObj = this;
      var enableResendBtn = function() {
        scopeObj.view.resetusingOTPEnterOTP.btnResendOTP.setEnabled(true);
        scopeObj.view.resetusingOTPEnterOTP.btnResendOTP.skin = ViewConstants.SKINS.LOGIN_RESEND_OTP_ENABLED;
        scopeObj.view.resetusingOTPEnterOTP.btnResendOTP.hoverSkin = ViewConstants.SKINS.LOGIN_RESEND_OTP_ENABLED;
      };
      kony.timer.schedule("otpTimer", enableResendBtn, 2, false); //As per the requirement need timer here. Enable OTP button after 2 sec.
    },
    /**
     * showEnterCVVPage :This function shows the CVV flex once the user clicks on "Reset using the CVV" Option
     */
    showEnterCVVPage: function() {
      this.view.flxResetPasswordOptions.isVisible = false;
      this.view.flxResetUsingCVV.isVisible = true;
      this.view.flxResetUsingCVV.parent.forceLayout();
    },
    /**
     * reEnterCVV :This function shows the error message if the user enters incorrect CVV
     */
    reEnterCVV: function() {
      this.view.ResetOrEnroll.lblWrongCvv.isVisible = false;
      this.view.ResetOrEnroll.parent.forceLayout();
    },
    /**
     * showResetPasswordPage :This function shows Reset Password Flex from CVV
     */
    showResetPasswordPage: function() {
      if (!this.view.ResetOrEnroll.tbxCVV.text) {
        this.view.ResetOrEnroll.lblWrongCvv.isVisible = true;
      }
      else {
        this.view.flxResetUsingCVV.isVisible = false;
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        //CommonUtilities.setText(this.view.newUsernamepasswordsetting.lblResetPasswordTitle, kony.i18n.getLocalizedString("i18n.newUsernamepasswordsetting.EnrollingtoOnlineBanking"), accessibilityConfig);
        this.view.newUsernamepasswordsetting.lblResetPasswordTitle.text = kony.i18n.getLocalizedString("i18n.newUsernamepasswordsetting.EnrollingtoOnlineBanking");
        this.view.flxUsernameAndPassword.isVisible = true;
      }
      this.view.newUsernamepasswordsetting.tbxNewUserName.onBeginEditing = this.showRulesUsername.bind(this);
      this.view.newUsernamepasswordsetting.tbxNewUserName.onKeyUp = this.newUsernameValidation.bind(this);
      this.view.flxResetPassword.parent.forceLayout();
    },
    /**
     * Function to map user name policies to defined widget
     * @param {Object} data it has response from service containing username policies
     */
    setUserNamePolicies: function(data) {
      if (data) {
        //var policyData =  "Minimum Length of Username:" + data.usernamerules.minLength + "\nMaximum Length of Username:" + data.usernamerules.maxLength + "\nSpecial Characters Allowed:" + data.usernamerules.supportedSymbols;
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        //CommonUtilities.setText(this.view.newUsernamepasswordsetting.rtxRulesUsername, data.usernamepolicy.content, accessibilityConfig);
        this.view.newUsernamepasswordsetting.rtxRulesUsername.text = data.usernamepolicy.content;
      }
      else {
        var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
        authModule.presentationController.updateFormUI('frmLogin', {});
        authModule.presentationController.navigateToServerDownScreen.call(authModule.presentationController);
      }
    },
    /**
     * Function to map password policies to defined widget
     * @param {Object} data it has response from service containing password policies
     */
    setPasswordPolicies: function(data) {
      if (data) {
        var policyData = "Minimum Length of Password:" + data.passwordrules.minLength + "\nMaximum Length of Password:" + data.passwordrules.maxLength + "\nSpecial Characters Allowed:" + data.passwordrules.supportedSymbols + "\nAllowed Repetition of characters: " + data.passwordrules.charRepeatCount + "\nAtleast One Number" + "\nAtleast One Symbol" + "\nAtleast One Uppercase" + "\nAtleast One Lowercase";
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        //CommonUtilities.setText(this.view.newUsernamepasswordsetting.rtxRulesPassword, data.passwordpolicy.content, accessibilityConfig);
        this.view.newUsernamepasswordsetting.rtxRulesPassword.text = data.passwordpolicy.content;
      }
      else {
        var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
        authModule.presentationController.updateFormUI('frmLogin', {});
        authModule.presentationController.navigateToServerDownScreen.call(authModule.presentationController);
      }
    },
    /**
     * showRulesUsername :This function shows the username rules on click of username textbox
     */
    showRulesUsername: function() {
      // this.view.newUsernamepasswordsetting.flxMain.height = "700dp";
      this.view.newUsernamepasswordsetting.flxRulesUsername.setVisibility(true);
      this.view.newUsernamepasswordsetting.flxRulesPassword.setVisibility(false);
      this.view.flxUsernameAndPassword.parent.forceLayout();
    },
    /**
     * showRulesPassword :This function shows the password rules on click of password textbox
     */
    showRulesPassword: function() {
      //this.view.newUsernamepasswordsetting.flxMain.height = "700dp";
      //this.loadEnrollModule().presentationController.getUserNamePolicies();
      this.view.newUsernamepasswordsetting.flxRulesUsername.setVisibility(false);
      this.view.newUsernamepasswordsetting.flxRulesPassword.setVisibility(true);
      this.view.flxUsernameAndPassword.parent.forceLayout();
    },
    /**
     * reEnterOTP :This function shows the error message if the user enters incorrect OTP
     */
    reEnterOTP: function() {
      this.view.resetusingOTPEnterOTP.lblWrongOTP.isVisible = false;
      this.view.flxResetUsingOTP.parent.forceLayout();
    },
    /**
     * showResetPasswordPageFromOTP :This function shows ResetPassword flex from CVV
     */
    showResetPasswordPageFromOTP: function() {
      this.resetAllFlexes();
      this.getUserNameAndPasswordPolicies();
      this.view.flxResetUsingOTP.isVisible = false;
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      //CommonUtilities.setText(this.view.newUsernamepasswordsetting.lblResetPasswordTitle, kony.i18n.getLocalizedString("i18n.newUsernamepasswordsetting.EnrollingtoOnlineBanking"), accessibilityConfig);
      this.view.newUsernamepasswordsetting.lblResetPasswordTitle.text = kony.i18n.getLocalizedString("i18n.newUsernamepasswordsetting.EnrollingtoOnlineBanking");
      this.view.newUsernamepasswordsetting.tbxNewUserName.onBeginEditing = this.showRulesUsername.bind(this);
      this.view.newUsernamepasswordsetting.tbxNewUserName.onKeyUp = this.newUsernameValidation.bind(this);
      this.view.flxUsernameAndPassword.isVisible = true;
      this.view.flxUsernameAndPassword.parent.forceLayout();
    },
    /**
     * This function checks whether the entered password and reenter Password are matched or not
     * @return {boolean} true if they match,false if they do not match
     */
    isPasswordValidAndMatchedWithReEnteredValue: function() {
      if (this.view.newUsernamepasswordsetting.tbxNewPassword.text && this.view.newUsernamepasswordsetting.tbxMatchPassword.text) {
        if (this.view.newUsernamepasswordsetting.tbxNewPassword.text === this.view.newUsernamepasswordsetting.tbxMatchPassword.text) {
          return true;
        }
      }
      return false;
    },
    /**
     * showSetSecurityQuestions :This function sets the visibilty of the security questions flex to true
     */
    showSetSecurityQuestions: function() {
      this.view.flxUsernameAndPasswordAck.setVisibility(false);
      this.view.flxSecurityQuestions.setVisibility(true);
      this.view.flxSecurityQuestions.parent.forceLayout();
    },
    /**
     * showSecurityQuestionsAck :This function sets the visibilty of the security questions Acknowledgement flex to true
     */
    showSecurityQuestionsAck: function() {
      this.view.flxSecurityQuestions.setVisibility(false);
      this.view.flxSecurityQuestionsAck.setVisibility(true);
      this.view.flxVerification.setVisibility(false);
      this.view.securityAck.flxBottom.setVisibility(false);
      this.view.securityAck.orline.setVisibility(false);
      this.view.flxSecurityQuestionsAck.parent.forceLayout();
    },
    /**
     * showUsernamePasswordAck :This function sets the visibilty of the UserName and password  Acknowledgement flex to true
     */
    showUsernamePasswordAck: function() {
      this.view.flxSecurityQuestions.setVisibility(false);
      this.view.flxUsernameAndPassword.setVisibility(false);
      this.view.flxUsernameAndPasswordAck.setVisibility(true);
      this.view.flxUsernameAndPasswordAck.parent.forceLayout();
    },
    /**
     * showResetConfirmationPage :This function checks whether to show the password Confirmation Screen
     */
    showResetConfirmationPage: function() {
      var isPasswordValidAndMatched = this.isPasswordValidAndMatchedWithReEnteredValue();
      if (!isPasswordValidAndMatched) {
        this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch.isVisible = true;
        this.view.newUsernamepasswordsetting.flxNewPassword.top = "3.52%";
      }
      else {
        this.view.flxUsernameAndPassword.isVisible = false;
        this.view.flxVerification.isVisible = false;
        this.view.passwordresetsuccess.lblReserSuccessMsg.skin = ViewConstants.SKINS.ENROLL_RESETSUCCESS;
        this.view.flxUsernameAndPasswordAck.isVisible = true;
        this.view.flxUsernameAndPasswordAck.parent.forceLayout();
      }
    },
    /**
     * useCVVForReset :This function is for selecting the CVV option from the OTP screen
     */
    useCVVForReset: function() {
      this.view.flxResetUsingOTP.isVisible = false;
      this.view.flxSendOTP.isVisible = false;
      this.view.flxResetUsingCVV.isVisible = true;
      this.view.resetusingOTPEnterOTP.tbxCVV.text = "";
      this.view.ResetOrEnroll.lstbxCards.selectedKey = this.view.ResetOrEnroll.lstbxCards.masterData[0][0]; //reset drop down.
      this.view.ResetOrEnroll.tbxCVV.secureTextEntry = true;
      this.view.resetusingOTPEnterOTP.tbxCVV.secureTextEntry = false;
      FormControllerUtility.disableButton(this.view.resetusingOTPEnterOTP.btnNext);
      this.view.resetusingOTPEnterOTP.lblWrongOTP.isVisible = false;
      this.view.ResetOrEnroll.forceLayout();
    },
    /**
     * useOTPForReset :This function is for selecting the OTP option from the CVV screen
     */
    useOTPForReset: function() {
      this.view.flxResetUsingCVV.isVisible = false;
      this.view.flxSendOTP.isVisible = true;
      this.view.ResetOrEnroll.tbxCVV.text = "";
      this.view.ResetOrEnroll.lblWrongCvv.isVisible = false;
      FormControllerUtility.disableButton(this.view.ResetOrEnroll.btnNext);
      this.view.ResetOrEnroll.forceLayout();
    },
    /**
     * UI function
     */
    onLoadChangePointer: function() {
      var elems = document.querySelectorAll("input[kwidgettype='Button']");
      for (var i = 0, iMax = elems.length; i < iMax; i++) {
        elems[i].style.cursor = 'pointer';
      }
    },
    /**
     * verifyUserDetails :This function calls the function which fetches the user based on the details entered
     */
    verifyUserDetails: function() {
      var SSN = this.view.letsverify.tbxSSN.text.trim();
      var taxId = this.view.letsverify.tbxTaxID.text.trim();
      var captcha = this.view.letsverify.tbxCaptcha.text.trim();
      var LastName = this.view.letsverify.tbxLastName.text.trim();
      var dateStr = applicationManager.getFormatUtilManager().getFormatedDateString(this.view.letsverify.DateInput.getDateObject(), applicationManager.getFormatUtilManager().getBackendDateFormat());
      FormControllerUtility.showProgressBar(this.view);
      var navManager = applicationManager.getNavigationManager();
      var enrollBusiness = navManager.getCustomInfo("enrollPersonal");
      /*this.loadEnrollModule().presentationController.verifyUser({
          "Ssn": SSN,
          "LastName": LastName,
          "DateOfBirth": dateStr
      });*/
      var data = {
        "lastName": LastName,
        "taxId": taxId,
        "dateOfBirth": dateStr,
        "captchaValue": captcha,
        "serviceKey": this.serviceKeyForCaptcha,
        "legalEntityId": enrollBusiness
      }
      this.loadEnrollModule().presentationController.verifyUser(data, this.updateFormUI);
    },
    /**
     * verifyUserSuccessCallBack :This function sets the visibility of the passwordResetOptionsPage to true if the fetching of the username is Successfull
     */
    verifyUserSuccessCallBack: function(data) {
      /*if (data.userDetails.isUserEnrolled == "true") {
				
                var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                CommonUtilities.setText(this.view.letsverify.lblWrongInfo, kony.i18n.getLocalizedString("i18n.common.alreadyenrolled"), accessibilityConfig);
                this.view.letsverify.lblWrongInfo.isVisible = true;
                this.view.letsverify.tbxSSN.text = "";
                this.view.letsverify.tbxLastName.text = "";
                FormControllerUtility.disableButton(this.view.letsverify.btnProceed);
                this.view.letsverify.DateInput.setText("");
                FormControllerUtility.hideProgressBar(this.view);
                this.view.flxMain.parent.forceLayout();
            } else if (data.userDetails.isUserEnrolled == "false") {
                this.goToPasswordResetOptionsPage();
            }*/
      if (data.userDetails.isUserExists == "false") {
        this.showCantEnrollScreen();
      }
      else if (data.userDetails.isUserExists == "true" && data.userDetails.isActivationCodeSent == "true") {
        this.showSuccessfullyEnrolledScreen(data.userDetails);
      }
      else if (data.userDetails.isUserExists == "true" && data.userDetails.isUserEnrolled == "true") {
        this.showEnrolledScreen(false);
      }
      else if (data.userDetails.isActivationCodeSent == "true") {
        this.showSuccessfullyEnrolledScreen(data.userDetails);
      }
    },
    /**
     * verifyUserErrorCallBack :This function sets the visibility of the passwordResetOptionsPage to false if the fetching of the username is Successfull
     */
    verifyUserErrorCallBack: function(data) {
      var errCode = data.serverErrorRes.dbpErrCode;
      FormControllerUtility.hideProgressBar(this.view);
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      switch (errCode) {
        case "10812":
          this.showCantEnrollScreen();
          break;
        case "10810":
          //CommonUtilities.setText(this.view.letsverify.lblWrongInfo, kony.i18n.getLocalizedString("i18n.enroll.captcha"), accessibilityConfig);
          this.view.letsverify.lblWrongInfo.text = kony.i18n.getLocalizedString("i18n.enroll.captcha");
          if (data.serverErrorRes.encodedImage !== undefined) {
            this.view.letsverify.flxCaptchaText.skin = "sknborderff0000error";
            this.view.letsverify.imgCaptcha.base64 = data.serverErrorRes.encodedImage;
          }
          break;
        default:
         // CommonUtilities.setText(this.view.letsverify.lblWrongInfo, data.serverErrorRes.dbpErrMsg, accessibilityConfig);
          this.view.letsverify.lblWrongInfo.text = data.serverErrorRes.dbpErrMsg;
          break;
      }
      this.view.letsverify.lblWrongInfo.isVisible = true;
      FormControllerUtility.disableButton(this.view.letsverify.btnProceed);
      this.view.flxMain.parent.forceLayout();
      /*FormControllerUtility.hideProgressBar(this.view);
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            //CommonUtilities.setText(this.view.letsverify.lblWrongInfo, kony.i18n.getLocalizedString("i18n.login.wrongInfo"), accessibilityConfig);
			CommonUtilities.setText(this.view.letsverify.lblWrongInfo, kony.i18n.getLocalizedString("i18n.login.wrongInfo"), accessibilityConfig);
            this.view.letsverify.lblWrongInfo.isVisible = true;
			if (data.serverErrorRes.encodedImage !== undefined) {
                CommonUtilities.setText(this.view.letsverify.lblWrongInfo, "Looks like you've entered incorrect captcha - try again", accessibilityConfig);
                this.view.letsverify.lblWrongInfo.isVisible = true;
                FormControllerUtility.disableButton(this.view.letsverify.btnProceed);      
            }
			
            this.view.flxMain.parent.forceLayout();*/
    },
    handleCaptchaFailure: function() {
      FormControllerUtility.hideProgressBar(this.view);
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
     // CommonUtilities.setText(this.view.letsverify.lblWrongInfo, kony.i18n.getLocalizedString("i18n.enroll.captchaFail"), accessibilityConfig);
      this.view.letsverify.lblWrongInfo.text = kony.i18n.getLocalizedString("i18n.enroll.captchaFail");
      this.view.letsverify.lblWrongInfo.isVisible = true;
      FormControllerUtility.disableButton(this.view.letsverify.btnProceed);
      this.view.flxMain.parent.forceLayout();
    },
    showCantEnrollScreen: function() {
      this.view.title = "Enroll Now- Acknowledgement ";
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      this.hideScreens();
      this.view.flxWelcome.setVisibility(false);
      this.view.flxAlreadyEnroll.setVisibility(false);
      this.view.flxCantEnroll.setVisibility(true);
      this.view.lblNote1.setVisibility(false);
      //CommonUtilities.setText(this.view.lblNote2, kony.i18n.getLocalizedString("i18n.enroll.enrollFail"), accessibilityConfig);
      this.view.lblNote2.text = kony.i18n.getLocalizedString("i18n.enroll.enrollFail");
      this.view.lblNote2.setVisibility(true);
      this.view.btnActivateYourProfile.setVisibility(false);
      this.view.btnSignInNow.setVisibility(false);
      this.view.btnContact.setVisibility(true);
      this.view.flxWelcomeBack.setVisibility(true);
      this.view.lblCallSupport.setVisibility(true);
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
    },
    showSuccessfullyEnrolledScreen: function(data) {
      this.view.title = "Enroll Now- Acknowledgement";
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      this.hideScreens();
      this.view.flxWelcome.setVisibility(true);
      this.view.flxAlreadyEnroll.setVisibility(false);
      this.view.flxCantEnroll.setVisibility(false);
    //   CommonUtilities.setText(this.view.lblNote1, kony.i18n.getLocalizedString("i18n.enroll.enrollSuccess"), accessibilityConfig);
    //   CommonUtilities.setText(this.view.lblNote2, kony.i18n.getLocalizedString("i18n.enroll.activateInstruct"), accessibilityConfig);
      this.view.lblNote1.text = kony.i18n.getLocalizedString("i18n.enroll.enrollSuccess");
      this.view.lblNote2.text = kony.i18n.getLocalizedString("i18n.enroll.activateInstruct");
      //this.view.lblUserName
      //CommonUtilities.setText(this.view.lblUserName, data.firstName + " " + data.lastName, accessibilityConfig);
      this.view.lblUserName.text = data.firstName + " " + data.lastName;
      this.view.lblNote1.setVisibility(true);
      this.view.lblNote2.setVisibility(true);
      this.view.btnActivateYourProfile.setVisibility(true);
      FormControllerUtility.enableButton(this.view.btnActivateYourProfile);
      this.view.btnSignInNow.setVisibility(false);
      this.view.btnContact.setVisibility(false);
      this.view.flxWelcomeBack.setVisibility(true);
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
    },
    showEnrolledScreen: function(pending) {
      this.view.title = "Enroll Now- Acknowledgement ";
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      this.hideScreens();
      this.view.flxWelcome.setVisibility(false);
      this.view.flxAlreadyEnroll.setVisibility(true);
      this.view.flxCantEnroll.setVisibility(false);
      this.view.lblNote1.setVisibility(false);
      this.view.lblNote2.setVisibility(false);
      this.view.btnContact.setVisibility(false);
      if (pending) {
        //CommonUtilities.setText(this.view.lblAlreadyEnroll, kony.i18n.getLocalizedString("i18n.enroll.activateYourProfile"), accessibilityConfig);
        this.view.lblAlreadyEnroll.text = kony.i18n.getLocalizedString("i18n.enroll.activateYourProfile");
        this.view.btnActivateYourProfile.setVisibility(true);
        FormControllerUtility.enableButton(this.view.btnActivateYourProfile);
        this.view.btnSignInNow.setVisibility(false);
      }
      else {
       // CommonUtilities.setText(this.view.lblAlreadyEnroll, kony.i18n.getLocalizedString("i18n.enroll.alreadyEnrolled"), accessibilityConfig);
        this.view.lblAlreadyEnroll.text = kony.i18n.getLocalizedString("i18n.enroll.alreadyEnrolled");
        this.view.btnActivateYourProfile.setVisibility(false);
        this.view.btnSignInNow.setVisibility(true);
      }
      this.view.flxWelcomeBack.setVisibility(true);
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
    },
    hideScreens: function() {
      this.view.flxVerification.setVisibility(false);
      this.view.flxWelcomeBack.setVisibility(false);
      this.view.flxVerificationBB.setVisibility(false);
      this.view.flxSelectProductToEnrollFor.setVisibility(false);
    },
    fetchCaptchaForEnrollment: function() {
      this.loadEnrollModule().presentationController.generateCaptchaForEnrollment(this.updateFormUI);
    },
    /**
     * welcomeVerifiedUser :This function is showing the flxResetUsingCVV once all the details are filled and proceed button is clicked
     * @param {Object} response is either success or failure dependding on the details entered
     */
    welcomeVerifiedUser: function() {
      FormControllerUtility.hideProgressBar(this.view);
      this.emptyUserDetails();
      this.view.flxResetUsingCVV.isVisible = true;
      this.view.flxResetUsingCVV.parent.forceLayout();
    },
    /**
     * emptyUserDetails :This function empties all the user details entered and disable the login button
     */
    emptyUserDetails: function() {
      this.view.letsverify.tbxSSN.text = "";
      this.view.letsverify.tbxLastName.text = "";
      this.view.letsverify.tbxTaxID.text = "";
      this.view.letsverify.tbxCaptcha.text = "";
      this.view.letsverify.flxCaptcha.setVisibility(true);
      this.view.letsverify.flxCaptchaText.skin = "skne3e3e3br3pxradius";
      this.view.letsverify.lbxYear.selectedKey = 'key-1';
      this.view.letsverify.lbxMonth.selectedKey = 'm0';
      this.view.letsverify.lbxDate.selectedKey = "day0";
      this.view.ResetOrEnroll.tbxCVV.text = "";
      this.view.letsverify.lblWrongInfo.setVisibility(false);
      this.view.resetusingOTP.lblWrongOTP.setVisibility(false);
      this.view.resetusingOTP.tbxCVV.text = "";
      this.view.resetusingOTPEnterOTP.lblWrongOTP.setVisibility(false);
      this.view.resetusingOTPEnterOTP.tbxCVV.text = "";
      FormControllerUtility.disableButton(this.view.resetusingOTPEnterOTP.btnNext);
      this.view.ResetOrEnroll.tbxCVV.text = "";
      FormControllerUtility.disableButton(this.view.ResetOrEnroll.btnNext);
      this.view.newpasswordsetting.tbxNewUserName.text = "";
      this.view.newpasswordsetting.tbxNewPassword.text = "";
      this.view.newpasswordsetting.tbxMatchPassword.text = "";
      FormControllerUtility.disableButton(this.view.newpasswordsetting.btnNext);
      this.view.newpasswordsetting.lblErrorInfo.setVisibility(false);
      this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch.setVisibility(false);
      this.view.newUsernamepasswordsetting.tbxNewUserName.text = "";
      this.view.newUsernamepasswordsetting.tbxNewPassword.text = "";
      this.view.newUsernamepasswordsetting.tbxMatchPassword.text = "";
      this.view.newUsernamepasswordsetting.imgCorrectUserName.isVisible = false;
      this.view.newUsernamepasswordsetting.imgValidPassword.isVisible = false;
      this.view.newUsernamepasswordsetting.imgPasswordMatched.isVisible = false;
      FormControllerUtility.disableButton(this.view.newUsernamepasswordsetting.btnCreate);
      FormControllerUtility.disableButton(this.view.letsverify.btnProceed);
      this.view.flxActivationLinkExpired.setVisibility(false);
      this.view.flxPhoneAndEmail.setVisibility(false);
      this.view.tbxEnterLastName.text = "";
      this.view.tbxSSN.text = "";
      this.view.tbxCompanyId.text = "";
      this.view.DateInput.setText("");
      this.view.letsverify.DateInput.setText("");
      this.view.forceLayout();
    },
    /**
     * allFieldsCheck :This function enables the Proceed button only if all the fields(SSN,DOB,lastName) are correct
     */
    allFieldsCheck: function() {
      var text = this.view.letsverify.DateInput.getText();
      var date = "";
      if (text.length === 10) {
        date = this.view.letsverify.DateInput.getDateObject();
      }
      //var SSN = this.view.letsverify.tbxSSN.text.trim();
      var taxId = this.view.letsverify.tbxTaxID.text.trim();
      var lastName = this.view.letsverify.tbxLastName.text.trim();
      var captcha = this.view.letsverify.tbxCaptcha.text.trim();
      //if (SSN != "" && lastName !== "" && date instanceof Date && !isNaN(date)) {//&& captcha !== "" 
      if (taxId != "" && lastName !== "" && date instanceof Date && !isNaN(date) && captcha !== "") {
        FormControllerUtility.enableButton(this.view.letsverify.btnProceed);
      }
      else {
        FormControllerUtility.disableButton(this.view.letsverify.btnProceed);
      }
    },
    /**
     * ssnCheck :This function used to check whether the SSN entered is correct or not ..If it is wrong the error message is shown
     */
    ssnCheck: function() {
      /* Removed Temporarily As no error message is needed for ssn validation
      var input = this.view.letsverify.tbxSSN.text.trim();
      //var SSNLENGTH = 9;
      var validationUtility = applicationManager.getValidationUtilManager();
      //if ((input.length < SSNLENGTH && isNaN(input)) || (input.length >= SSNLENGTH && !validationUtility.isValidSSNNumber(input))) {
      if(!validationUtility.isValidSSNNumber(input)) {
          this.view.letsverify.lblWrongInfo.text = kony.i18n.getLocalizedString("i18n.login.incorrectSSN");
          this.view.letsverify.lblWrongInfo.isVisible = true;
      } else {
          this.view.letsverify.lblWrongInfo.isVisible = false;
      }
      this.view.letsverify.forceLayout();
      */
    },
    /**
     * cvvCheck :This function checks whether the entered CVV  is valid or not
     */
    cvvCheck: function() {
      var input = this.view.ResetOrEnroll.tbxCVV.text.trim();
      var CVVLENGTH = 3;
      var validationUtility = applicationManager.getValidationUtilManager();
      if (input.length < CVVLENGTH || !validationUtility.isValidCVV(input)) {
        if (isNaN(input) || input.length >= CVVLENGTH) {
          var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
          //CommonUtilities.setText(this.view.ResetOrEnroll.lblWrongCvv, kony.i18n.getLocalizedString("i18n.login.IncorrectCVV"), accessibilityConfig);
          this.view.ResetOrEnroll.lblWrongCvv.text = kony.i18n.getLocalizedString("i18n.login.IncorrectCVV");
          this.view.ResetOrEnroll.lblWrongCvv.isVisible = true;
        }
        FormControllerUtility.disableButton(this.view.ResetOrEnroll.btnNext);
      }
      else {
        this.view.ResetOrEnroll.lblWrongCvv.isVisible = false;
        FormControllerUtility.enableButton(this.view.ResetOrEnroll.btnNext);
      }
      this.view.ResetOrEnroll.parent.forceLayout();
    },
    /**
     * otpCheck :This function checks the OTP entered is correct or not and shows the error message if it is incorrect
     */
    otpCheck: function() {
      var input = this.view.resetusingOTPEnterOTP.tbxCVV.text.trim();
      var OTP_LENGTH = 6;
      var validationUtility = applicationManager.getValidationUtilManager();
      if (input.length < OTP_LENGTH || !validationUtility.isValidOTP(input)) {
        if (isNaN(input) || input.length >= OTP_LENGTH) {
          var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
          //CommonUtilities.setText(this.view.resetusingOTPEnterOTP.lblWrongOTP, kony.i18n.getLocalizedString("i18n.login.incorrectOTP"), accessibilityConfig);
          this.view.resetusingOTPEnterOTP.lblWrongOTP.text = kony.i18n.getLocalizedString("i18n.login.incorrectOTP");
          this.view.resetusingOTPEnterOTP.lblWrongOTP.isVisible = true;
        }
        FormControllerUtility.disableButton(this.view.resetusingOTPEnterOTP.btnNext);
      }
      else {
        this.view.resetusingOTPEnterOTP.lblWrongOTP.isVisible = false;
        FormControllerUtility.enableButton(this.view.resetusingOTPEnterOTP.btnNext);
      }
      this.view.resetusingOTPEnterOTP.parent.forceLayout();
    },
    /**
     * showCVV :This function shows the masked CVV on click of "i" icon
     */
    showCVV: function() {
      if (this.view.ResetOrEnroll.tbxCVV.secureTextEntry === true) {
        this.view.ResetOrEnroll.tbxCVV.secureTextEntry = false;
        this.view.ResetOrEnroll.imgViewCVV.src = "icon_hide.png";
        this.view.ResetOrEnroll.imgViewCVV.width = "20dp";
        this.view.ResetOrEnroll.imgViewCVV.height = "22dp";
        this.view.ResetOrEnroll.imgViewCVV.top = "7dp";
      }
      else {
        this.view.ResetOrEnroll.tbxCVV.secureTextEntry = true;
        this.view.ResetOrEnroll.imgViewCVV.src = "view.png";
        this.view.ResetOrEnroll.imgViewCVV.top = "8dp";
      }
      this.view.ResetOrEnroll.parent.forceLayout();
    },
    /**
     * showOTP :This function shows the masked OTP on click of eye icon
     */
    showOTP: function() {
      if (this.view.resetusingOTPEnterOTP.tbxCVV.secureTextEntry === true) {
        this.view.resetusingOTPEnterOTP.tbxCVV.secureTextEntry = false;
      }
      else {
        this.view.resetusingOTPEnterOTP.tbxCVV.secureTextEntry = true;
      }
    },
    /**
     * goToPasswordResetOptionsPage :This function calls the function to retrieve the cards for the user
     */
    goToPasswordResetOptionsPage: function() {
      var year = [];
      var month = [];
      var date = [];
      var SSN = this.view.letsverify.tbxSSN.text;
      var LastName = this.view.letsverify.tbxLastName.text;
      year = this.view.letsverify.lbxYear.selectedKeyValue;
      month = this.view.letsverify.lbxMonth.selectedKeyValue;
      var mon = month[0].slice(1, 3);
      if (mon.length < 2) {
        mon = '0' + mon;
      }
      date = this.view.letsverify.lbxDate.selectedKeyValue;
      var day = date[1];
      if (day < 10) {
        day = '0' + day;
      }
      var dateStr = year[1] + '-' + mon + '-' + day;
      var detailsJSON = {
        "Ssn": SSN,
        "LastName": LastName,
        "DateOfBirth": dateStr
      };
      var params = {
        "MFAAttributes": {
          "serviceKey": applicationManager.getAuthManager().getServicekey()
        }
      };
      this.loadEnrollModule().presentationController.goToPasswordResetOptionsPage(params);
    },
    /**
     * setNoOfDays :This function sets the Date Of Birth (day,month and year)
     */
    setNoOfDays: function() {
      var selectedMonth = this.view.letsverify.lbxMonth.selectedKey;
      var dayArray = [];
      dayArray = [{
        "daykey": "day0",
        "dayvalue": "Day"
      }, {
        "daykey": "day1",
        "dayvalue": 1
      }, {
        "daykey": "day2",
        "dayvalue": 2
      }, {
        "daykey": "day3",
        "dayvalue": 3
      }, {
        "daykey": "day4",
        "dayvalue": 4
      }, {
        "daykey": "day5",
        "dayvalue": 5
      }, {
        "daykey": "day6",
        "dayvalue": 6
      }, {
        "daykey": "day7",
        "dayvalue": 7
      }, {
        "daykey": "day8",
        "dayvalue": 8
      }, {
        "daykey": "day9",
        "dayvalue": 9
      }, {
        "daykey": "day10",
        "dayvalue": 10
      }, {
        "daykey": "day11",
        "dayvalue": 11
      }, {
        "daykey": "day12",
        "dayvalue": 12
      }, {
        "daykey": "day13",
        "dayvalue": 13
      }, {
        "daykey": "day14",
        "dayvalue": 14
      }, {
        "daykey": "day15",
        "dayvalue": 15
      }, {
        "daykey": "day16",
        "dayvalue": 16
      }, {
        "daykey": "day17",
        "dayvalue": 17
      }, {
        "daykey": "day18",
        "dayvalue": 18
      }, {
        "daykey": "day19",
        "dayvalue": 19
      }, {
        "daykey": "day20",
        "dayvalue": 20
      }, {
        "daykey": "day21",
        "dayvalue": 21
      }, {
        "daykey": "day22",
        "dayvalue": 22
      }, {
        "daykey": "day23",
        "dayvalue": 23
      }, {
        "daykey": "day24",
        "dayvalue": 24
      }, {
        "daykey": "day25",
        "dayvalue": 25
      }, {
        "daykey": "day26",
        "dayvalue": 26
      }, {
        "daykey": "day27",
        "dayvalue": 27
      }, {
        "daykey": "day28",
        "dayvalue": 28
      }];
      var dayV, dayK;
      var dayObj;
      if (selectedMonth === 'm1' || selectedMonth === 'm3' || selectedMonth === 'm5' || selectedMonth === 'm7' || selectedMonth === 'm8' || selectedMonth === 'm10' || selectedMonth === 'm12') {
        var MaxMonths = 31;
        for (var i = 29; i <= MaxMonths; i++) {
          dayK = "day" + i;
          dayV = i;
          dayObj = {
            "daykey": dayK,
            "dayvalue": dayV
          };
          dayArray.push(dayObj);
        }
      }
      else if (selectedMonth === 'm4' || selectedMonth === 'm6' || selectedMonth === 'm9' || selectedMonth === 'm11') {
        var MonthEnd = 30;
        for (var j = 29; j <= MonthEnd; j++) {
          dayK = "day" + j;
          dayV = j;
          dayObj = {
            "daykey": dayK,
            "dayvalue": dayV
          };
          dayArray.push(dayObj);
        }
      }
      else {
        if ((this.view.letsverify.lbxYear.selectedKeyValue !== undefined) && (this.view.letsverify.lbxYear.selectedKeyValue !== null)) {
          var thisYear = this.view.letsverify.lbxYear.selectedKeyValue[1];
          var leapCheck1 = 4;
          var leapCheck2 = 100;
          var leapCheck3 = 400;
          var daysAdded = 29;
          if (((thisYear % leapCheck1 === 0) && (thisYear % leapCheck2 !== 0)) || (thisYear % leapCheck3 === 0)) {
            dayK = "day" + daysAdded;
            dayV = daysAdded;
            dayObj = {
              "daykey": dayK,
              "dayvalue": dayV
            };
            dayArray.push(dayObj);
          }
        }
      }
      this.view.letsverify.lbxDate.masterDataMap = [dayArray, "daykey", "dayvalue"];
    },
    /**
     * showCVVCards :This function prepares the list of cards available for the user and stores in the form of key and value where the key is the actual card number and value is the masked card number
     * @param {Object} presentCards list of cards available for th user
     */
    showCVVCards: function(presentCards) {
      var scopeObj = this;

      function maskCard(card) {
        var dataProcessor = applicationManager.getDataProcessorUtility();
        return dataProcessor.maskCardNumber(card.cardNumber);
      }
      this.view.ResetOrEnroll.lstbxCards.masterData = FormControllerUtility.getListBoxDataFromObjects(presentCards, "cardNumber", maskCard);
    },
    /**
     * showCVVOption :This function is for showing the CVV option if there are  cards available for the user
     */
    showCVVOption: function() {
      this.view.flxResetPasswordOptions.isVisible = true;
      this.view.resetusingOTP.btnUseCVV.isVisible = true;
      this.view.resetusingOTP.orline.isVisible = true;
      this.view.AlterneteActionsEnterCVV.isVisible = true;
      this.view.OrLineForCVVandPIN.isVisible = true;
      this.view.flxResetPasswordOptions.isVisible = true;
      this.view.flxResetPasswordOptions.parent.forceLayout();
    },
    /**
     * hideCVVOption :This function is for hiding the CVV option if there are no cards available for the user
     */
    hideCVVOption: function() {
      this.view.flxResetPasswordOptions.isVisible = true;
      this.view.AlterneteActionsEnterCVV.isVisible = false;
      this.view.OrLineForCVVandPIN.isVisible = false;
      this.view.resetusingOTP.btnUseCVV.isVisible = false;
      this.view.resetusingOTP.orline.isVisible = false;
      this.view.flxResetPasswordOptions.parent.forceLayout();
    },
    /**
     * preshowFrmLogin :Pre show function of login pafe
     */
    preshowFrmLogin: function() {
      var scopeObj = this;
      this.view.title = "Enroll Now- Select Entity";
	  if(applicationManager.getStorageManager().getStoredItem("langObj") && applicationManager.getStorageManager().getStoredItem("langObj").language === "Arabic")
				
      {
        scopeObj.view.PersonalBanking.imgRightTip.src = "right_arrow_white.png";
        scopeObj.view.BusinessBanking.imgRightTip.src = "right_arrow_white.png";
        scopeObj.view.letsverify.top = "0px";
        
      }
      
      scopeObj.view.letsverify.flxUserVerify.isVisible = true;
      scopeObj.view.PersonalBanking.width = "88%";
      scopeObj.view.PersonalBanking.left = "20dp";
      scopeObj.view.PersonalBanking.height = "60dp";
      scopeObj.view.PersonalBanking.top = "-72px";
      scopeObj.view.PersonalBanking.fontIconOption.right = "53dp";
      scopeObj.view.PersonalBanking.fontIconOption.setVisibility(true);
      scopeObj.view.BusinessBanking.width = "88%";
      scopeObj.view.BusinessBanking.left = "20dp";
      scopeObj.view.BusinessBanking.height = "60dp";
      scopeObj.view.BusinessBanking.top = "68%";
      scopeObj.view.BusinessBanking.fontIconOption.right = "53dp";
      scopeObj.view.BusinessBanking.fontIconOption.top = "14dp";
      scopeObj.view.PersonalBanking.fontIconOption.text = "c";
      scopeObj.view.BusinessBanking.fontIconOption.text = "d";
      scopeObj.view.PersonalBanking.accessibilityConfig = { 
        "a11yARIA": {
            "tabindex": 0,     
        }
      };
      scopeObj.view.BusinessBanking.accessibilityConfig = { 
        "a11yARIA": {
            "tabindex": 0,     
        }
       };
      scopeObj.view.CustomChangeLanguagePopup.accessibilityConfig = {
        "a11yARIA": {
            "role": "dialog",
            "tabindex": -1,
        },
        };
      scopeObj.view.CustomChangeLanguagePopup.lblHeading.accessibilityConfig = {
        "a11yARIA": {
            "tabindex": -1,
        },
        };
      scopeObj.view.CustomChangeLanguagePopup.isModalContainer = true;
      scopeObj.view.btnVeiwMore.accessibilityConfig = {
        "a11yLabel": "Learn more about our Bank’s offerings. Opens in a new tab",
            "a11yARIA": {},
        };
      scopeObj.view.OTPModule.lblWrongOTP.isVisible = false;
      // defined onBreakpointChange through studio action
      // this.view.onBreakpointChange = function () {
      //     scopeObj.onBreakpointChange(kony.application.getCurrentBreakpoint());
      // };
      this.view.btnVeiwMore.onClick = function() {
        var config = applicationManager.getConfigurationManager();
        kony.application.openURL(config.getConfigurationValue("LINK_TO_DBX"));
      }
      this.view.btnVeiwMore.hoverSkin = "sknbtn41a0edviewmoreHover";
      this.view.flxMain.skin = ViewConstants.SKINS.LOGIN_MAIN_BAKGROUND;
      this.view.flxVerification.isVisible = true;
      this.view.flxResetPasswordOptions.isVisible = false;
      this.view.resetusingOTP.lblResendOTPMsg.isVisible = false
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
    //   CommonUtilities.setText(this.view.newUsernamepasswordsetting.rtxRulesUsername, "", accessibilityConfig);
    //   CommonUtilities.setText(this.view.newUsernamepasswordsetting.rtxRulesPassword, "", accessibilityConfig);
      this.view.newUsernamepasswordsetting.rtxRulesUsername.text = "";
      this.view.newUsernamepasswordsetting.rtxRulesPassword.text = "";
      this.view.UsenamePasswordSuccess.lblAcknowledgement.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
      this.view.lblWrongInformation.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
      this.view.resetusingOTP.lblResendOTPMsg.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
      this.view.resetusingOTPEnterOTP.lblResetPasswordMsg.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
      this.view.ResetOrEnroll.lblWrongCvv.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
      this.view.newpasswordsetting.lblErrorInfo.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
      this.view.newUsernamepasswordsetting.lblErrorInfo.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
      this.view.lblWrongOTP.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
      this.view.EnrollPromptScreen.rtxServerError.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
      //this.view.lblSelectProductToEnrollFor.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
      this.view.flxSendOTP.isVisible = false;
      this.view.newUsernamepasswordsetting.imgCorrectUserName.isVisible = false;
      this.view.newUsernamepasswordsetting.imgValidPassword.isVisible = false;
      this.view.newUsernamepasswordsetting.imgPasswordMatched.isVisible = false;
      this.view.flxResetUsingOTP.isVisible = false;
      this.view.flxResetUsingCVV.isVisible = false;
      this.view.flxResetPassword.isVisible = false;
      this.view.flxUsernameAndPassword.isVisible = false;
      this.view.flxSecurityQuestions.isVisible = false;
      this.view.flxSecurityQuestionsAck.isVisible = false;
      this.view.flxUsernameAndPasswordAck.isVisible = false;
      this.view.flxusernamepassword.isVisible = false;
      this.view.flxResetSuccessful.isVisible = false;
      this.view.flxEnrollOrServerError.isVisible = false;
      this.view.flxPhoneAndEmail.isVisible = false;
      this.view.flxClose.onClick = this.goToLogin;
      this.view.flxclose1.onClick = this.goToLogin;
      this.view.flxCloseSelectProduct.onClick = this.goToLogin;
      this.view.flxCloseResetPassword.onClick = this.goToLogin;
      this.view.flxCloseSendOTP.onClick = this.goToLogin;
      this.view.flxCloseResetUsingOTP.onClick = this.goToLogin;
      this.view.flxCloseResetUsingCVV.onClick = this.goToLogin;
      this.view.flxCloseResetPswd.onClick = this.goToLogin;
      this.view.flxCloseUsernamePassowrd.onClick = this.goToLogin;
      this.view.flxCloseMFA.onClick = this.goToLogin;
      this.view.flxCloseFontIcon.onClick = this.showLoginOnCancel;
      this.view.imgKonyEnroll.onTouchEnd = this.showLoginOnCancel;
      this.view.PersonalBanking.fontIconOption.skin = OLBConstants.SKINS.ALTERNATEACTIONS_NEW_SKIN;
      this.view.BusinessBanking.fontIconOption.skin = OLBConstants.SKINS.ALTERNATEACTIONS_NEW_SKIN;
      this.setLanguages(applicationManager.getConfigurationManager().locale);
      this.view.CustomChangeLanguagePopup.onKeyPress = this.onKeyPressCallBack;
      this.view.flxDropdown.accessibilityConfig = {
        "a11yLabel":"Current Language "+this.view.lblLanguage.text+". Click here to choose another language",
        a11yARIA: {
            "aria-expanded": false,
            role: "button"
        },
        };
         this.view.flxDifferentLanguagesSegment.accessibilityConfig = {
          "a11yARIA": {
            "tabindex": -1,
          },
        };
        this.view.letsverify.btnProceed.accessibilityConfig = {
            "a11yLabel": "Continue to acknowledgement screen",
            a11yARIA: {},
        };
        this.view.segLanguagesList.accessibilityConfig = {
            "a11yARIA": {
            "tabindex" : -1
            },
        };
       
      if (applicationManager.getStorageManager().getStoredItem("langObj")) {
        var langObj = applicationManager.getStorageManager().getStoredItem("langObj").language;
        this.showDefaultLanguageOnLoginScreen(langObj);
      }
      else {
        this.showDefaultLanguage();
      }
      this.setToolTipsForEnroll();
      this.setAriaLabels();
    },
    onKeyPressCallBack: function(eventObject, eventPayload) {
        var self = this;
            if (eventPayload.keyCode === 27) {
                if (self.view.CustomChangeLanguagePopup.isVisible === true) {
                    self.view.flxChangeLanguage.isVisible = false;
                    this.view.flxDropdown.setActive(true);
                    
                }
            }
        },
    setAriaLabels: function() {
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
    //   CommonUtilities.setText(this.view.PersonalBanking.rtxCVV, kony.i18n.getLocalizedString("i18n.Enroll.PersonalBanking"), accessibilityConfig);
    //   CommonUtilities.setText(this.view.BusinessBanking.rtxCVV, kony.i18n.getLocalizedString("i18n.Enroll.BusinessBanking"), accessibilityConfig);
    //   CommonUtilities.setText(this.view.OTPModule.rtxEnterCVVCode, kony.i18n.getLocalizedString("i18n.MFA.EnterSACOnPhone"), accessibilityConfig);
    //   CommonUtilities.setText(this.view.OTPModule.lblResendOTPMessage, kony.i18n.getLocalizedString("i18n.mfa.subheader"), accessibilityConfig);
      this.view.PersonalBanking.rtxCVV.text = kony.i18n.getLocalizedString("i18n.Enroll.PersonalBanking");
      this.view.BusinessBanking.rtxCVV.text = kony.i18n.getLocalizedString("i18n.Enroll.BusinessBanking");
      this.view.OTPModule.rtxEnterCVVCode.text = kony.i18n.getLocalizedString("i18n.MFA.EnterSACOnPhone");
      this.view.OTPModule.lblResendOTPMessage.text = kony.i18n.getLocalizedString("i18n.mfa.subheader");
    },
    /**
     setToolTipsForEnroll :       This method sets the toolTips across the enroll Flow
     */
    setToolTipsForEnroll: function() {
      this.view.SetSecurityQuestions.btnSetSecurityQuestionsProceed.toolTip = kony.i18n.getLocalizedString("i18n.common.proceed");
      this.view.securityAck.btnProceed.toolTip = "Back to Login";
      this.view.UsenamePasswordSuccess.btnProceed.toolTip = kony.i18n.getLocalizedString("i18n.common.proceed");
      this.view.OTPModule.btnProceed.toolTip = kony.i18n.getLocalizedString("i18n.common.proceed");
      this.view.OTPModule.btnResendOTP.toolTip = kony.i18n.getLocalizedString("i18n.login.ResendOtp");
      this.view.SetSecurityQuestions.btnSetSecurityQuestionsCancel.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
    },
    /**
     * showDefaultLanguage :This function sets the default language in the textbox as the value in local store
     * @param {String} lang It contains language
     */
    showDefaultLanguageOnLoginScreen: function (lang) {
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        CommonUtilities.setText(this.view.lblLanguage, this.getFrontendLanguage(lang), accessibilityConfig);
        this.view.lblLanguage.toolTip = this.getFrontendLanguage(lang);
        this.setLocale(lang);
    },
    /**
     * showDefaultLanguage :This function sets the default language in the textbox if nothing is set in local store
     */
   showDefaultLanguage: function () {
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      CommonUtilities.setText(this.view.lblLanguage, this.view.segLanguagesList.data[0].lblLang, accessibilityConfig);
      this.view.lblLanguage.toolTip = this.view.segLanguagesList.data[0].lblLang;
      this.setLocale(this.getBackendLanguage(this.view.segLanguagesList.data[0].lblLang));
    },
    /**
     * setLocale :This function sets the locale selected
     * @param {String} lang It contains langauge
     */
    setLocale: function(lang) {
      var localeCode = applicationManager.getConfigurationManager().locale[lang];
      kony.i18n.setCurrentLocaleAsync(localeCode, function() {
        applicationManager.getStorageManager().setStoredItem("langObj", {
          language: lang
        });
        applicationManager.getConfigurationManager().setLocaleAndDateFormat({
          "data": {}
        });
      }, function() {});
    },
    /**
     * setLanguages :This function sets the languages in the dropdown list
     * @param {String} langlist It contains lanugage list
     */
    setLanguages: function(langlist) {
            var scope = this;
            var langlist = this.getLanguageMasterData();
            var languages = [];
            var translatedLanguage = {
                "US English": "(English)",
                "UK English": "(English)",
                "Spanish": "(Español)",
                "German": "(Deutsch)",
                "French": "(Français)",
                "Arabic": "(عربي)"
            };
            var langValue = {
                "US English": "en",
                "UK English": "en",
                "Spanish": "es",
                "German": "de",
                "French": "fr",
                "Arabic": "ar"
            };
			var dataMap = {
                "flxLangList":"flxLangList",
                "btnLang":"btnLang",
				"lblLang":"lblLang",
                "lblTranslatedLang": "lblTranslatedLang",
				"lblSeparator": "lblSeparator"
            };
            this.view.segLanguagesList.widgetDataMap = dataMap;
            for (var lang in langlist) {
                if (langlist.hasOwnProperty(lang)) {
                    var temp = {
                        "flxLangList": {},
                        "btnLang": {
							"onClick": function(eventobject, segInfo, xcoord, context) {
                                scope.selectYourLanguage(segInfo);
                            }.bind(this),
                            "onKeyPress": scope.onKeyPressLanguage
						},
                        "lblLang": lang,
                        //"lblTranslatedLang": translatedLanguage[lang],
                         "lblTranslatedLang": {
                            "text": translatedLanguage[lang],
                            "accessibilityConfig" :{
                                a11yARIA:{
                                    lang : langValue[lang]
                                }
                            }
                        },
                        "lblSeparator": "a"
                    };
                    languages.push(temp);
                }
                
            }
            this.view.segLanguagesList.setData(languages);
        },
		 onKeyPressLanguage: function(eventobject, eventPayload, context) {
            var scopeObj = this;
            if (eventPayload.keyCode === 9 && context.sectionIndex === 0 && context.rowIndex === context.widgetInfo.data.length - 1 && !eventPayload.shiftKey) {
                eventPayload.preventDefault();
                scopeObj.hideLanguageSelectionPopUp();
                scopeObj.view.flxLanguagePicker.isVisible = false;
                scopeObj.view.loginComponent.setUserNameTbxActive();
            }
            if (eventPayload.shiftKey && eventPayload.keyCode === 9) {
                if (context.rowIndex === 0 && context.sectionIndex === 0) {
                    eventPayload.preventDefault();
                    scopeObj.hideLanguageSelectionPopUp();
                    scopeObj.view.flxLanguagePicker.isVisible = false;
                }
            }
            if (eventPayload.keyCode === 27) {
                eventPayload.preventDefault();
                scopeObj.hideLanguageSelectionPopUp();
                scopeObj.view.flxLanguagePicker.isVisible = false;
            }
        },
         /**
               * Method to fetch languages JSON
               */
      getLanguageMasterData: function () {
        return {
          "US English": "en_US",
          "UK English": "en_GB",
          "Spanish": "es_ES",
          "German": "de_DE",
          "French": "fr_FR",
          "Arabic": "ar_AE"
        }
      },
       /**
               * Method to change the selected language to backend language string
               * @param {String} lang - selected language
               */
       getBackendLanguage: function (lang) {
        var languageData = this.getLanguageMasterData();
        var configManager = applicationManager.getConfigurationManager();
        var langObject = configManager.locale;
        for (var key in languageData) {
          if (languageData.hasOwnProperty(key)) {
            if (key === lang) {
              return this.getValueFromKey(languageData[key], langObject);
            }
          }
        }
      },
      /**
               * Method to change the selected language to backend language string
               * @param {String} lang - selected language
               */
      getFrontendLanguage: function (lang) {
        var languageData = this.getLanguageMasterData();
        var configManager = applicationManager.getConfigurationManager();
        var langObject = configManager.locale;
        for (var key in langObject) {
          if (langObject.hasOwnProperty(key)) {
            if (key === lang) {
              return this.getValueFromKey(langObject[key], languageData);
            }
          }
        }
      },
      /**
               * Method to fetch language from key
               * @param {String} value - selected language
               * @param {Object} langObject - language Object
               */
      getValueFromKey: function (value, langObject) {
        for (var key in langObject) {
          if (langObject.hasOwnProperty(key)) {
            var shortLang = langObject[key];
            if (shortLang === value) {
              return key;
            }
          }
        }
      },
    /**
     * selectYourLanguage :This function sets the language selected from the dropdown menu to the label and also stores it in localstore
     */
    selectYourLanguage: function(context) {
            this.view.flxLanguagePicker.setVisibility(false);
			var index = context.rowIndex;
            var langSelected = JSON.stringify(context.widgetInfo.data[index].lblLang);
            langSelected = langSelected.replace(/"/g, "");
            this.showLanguageSelectionPopUp(langSelected);
        },
    /**
     * showLanguageSelectionPopUp: This function shows language selection for popup
     * @param {String} langSelected It contains language selected
     */
    showLanguageSelectionPopUp: function(langSelected) {
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            //CommonUtilities.setText(this.view.CustomChangeLanguagePopup.lblPopupMessage, kony.i18n.getLocalizedString("i18n.common.changeLanguageMessage") + " " + langSelected + "?", accessibilityConfig);
            this.view.CustomChangeLanguagePopup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.common.changeLanguageMessage") + " " + langSelected + "?";
            this.view.flxChangeLanguage.setVisibility(true);
            this.view.CustomChangeLanguagePopup.btnYes.onClick = function() {
				applicationManager.getStorageManager().setStoredItem("langObj", {
                    language: scopeObj.getBackendLanguage(langSelected)
                });
                var localeCode = applicationManager.getConfigurationManager().locale[scopeObj.getBackendLanguage(langSelected)];
                kony.i18n.setCurrentLocaleAsync(localeCode, function() {
                    applicationManager.getStorageManager().setStoredItem("langObj", {
                        language: scopeObj.getBackendLanguage(langSelected)
                    });
                    applicationManager.getConfigurationManager().setLocaleAndDateFormat({
                        "data": {}
                    });
                     applicationManager.getNavigationManager().navigateTo("frmEnrollNow");
                }, function() {});
                //CommonUtilities.setText(this.view.lblLanguage, langSelected, accessibilityConfig);
                this.view.lblLanguage.text = langSelected;
              
                this.hideLanguageSelectionPopUp();
            }.bind(this);
            this.view.CustomChangeLanguagePopup.btnNo.onClick = this.hideLanguageSelectionPopUp.bind(this);
            this.view.CustomChangeLanguagePopup.flxCross.onClick = this.hideLanguageSelectionPopUp.bind(this);
            this.view.CustomChangeLanguagePopup.lblHeading.setActive(true);
            this.view.CustomChangeLanguagePopup.flxCross.accessibilityConfig = {
                a11yLabel: "Close this pop-up",
                a11yARIA: {},
            };
            this.view.CustomChangeLanguagePopup.btnNo.accessibilityConfig = {
                a11yLabel: "No, don't change the language",
                a11yARIA: {},
            };
            this.view.CustomChangeLanguagePopup.btnYes.accessibilityConfig= {
                a11yLabel: "Yes, change the language",
                a11yARIA: {},
            };
        },
    /**
     * hideLanguageSelectionPopUp: This function hides language selection popup
     */
    hideLanguageSelectionPopUp: function() {
            this.view.lblCheckBox.text = "O";
            this.view.flxDropdown.accessibilityConfig = {
                "a11yLabel": "Current Language " + this.view.lblLanguage.text + ". Click here to choose another language",
                a11yARIA: {
                    "aria-expanded": false,
                    role: "button"
                },
            };
            this.view.flxChangeLanguage.setVisibility(false);
            this.view.flxDropdown.setActive(true);
        },
    /**
     * getUserNameAndPasswordPolicies :This function calls getusernameandpolicies of presentation controller
     */
    getUserNameAndPasswordPolicies: function() {
      //this.loadEnrollModule().presentationController.getUserNamePolicies();
      this.loadEnrollModule().presentationController.getUserNameAndPasswordPolicies();
    },
    /**
     * goToLogin :This function navigates to login page
     */
    goToLogin: function() {
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("frmLogin");
    },
    onBreakpointChange: function(width) {
      kony.print('on breakpoint change');
      var scope = this;
      this.view.CustomChangeLanguagePopup.onBreakpointChangeComponent(scope.view.CustomChangeLanguagePopup, width);
      orientationHandler.onOrientationChange(this.onBreakpointChange);
      this.view.lblSSN.setVisibility(false);
      if ((width <= 1024 && orientationHandler.isTablet) || (width <= 1024 && orientationHandler.isDesktop)) {
        this.view.flxCloseFontIconParent.left = "";
        this.view.flxCloseFontIconParent.right = "20%";
        this.view.flxCloseFontIconParent.top = "60dp";
        //this.view.flxDateInput.width = "85%";
        //this.view.letsverify.flxDateInput.width = "68%";
        this.view.flexSSN.width = "85%";
        this.view.flexSSN.centerX = "50%";
        //this.view.letsverify.btnProceed.width = "68%";
        // this.view.lblCopyrightDesktop.isVisible = false;
        this.view.ResetOrEnroll.rtxEnterCVV.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
        this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
        //this.view.lblSelectProductToEnrollFor.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
      }
      if ((width === 768 && orientationHandler.isTablet) || (width === 768 && orientationHandler.isDesktop)) {
        this.view.flxCloseFontIconParent.left = "";
        this.view.flxCloseFontIconParent.right = "15%";
        this.view.flxCloseFontIconParent.top = "60dp";
        this.view.flxDateInput.width = "85%";
        this.view.flexSSN.width = "85%";
        this.view.ResetOrEnroll.rtxEnterCVV.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
        this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
        //this.view.lblSelectProductToEnrollFor.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
      }
      if (width > 1024 && !orientationHandler.isTablet) {
        //this.view.letsverify.flxDateInput.width = "68%";
        this.view.letsverify.btnProceed.width = "68%";
        this.view.ResetOrEnroll.flxHeaderNError.top = "130dp";
        this.view.ResetOrEnroll.btnNext.width = "68%";
        this.view.resetusingOTP.btnNext.width = "68%";
        //this.view.lblSelectProductToEnrollFor.contentAlignment = constants.CONTENT_ALIGN_TOP_LEFT;
        this.view.OTPModule.rtxEnterCVVCode.contentAlignment = constants.CONTENT_ALIGN_TOP_LEFT;
        // this.view.lblCopyrightDesktop.isVisible = true;
      }
      else {
        //this.view.letsverify.flxDateInput.width = "85%";
      }
      if ((width <= 640 && orientationHandler.isMobile) || (width <= 640 && orientationHandler.isDesktop)) {
        //this.view.lblSelectProductToEnrollFor.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
        this.view.flxCloseFontIconParent.left = "";
        this.view.flxCloseFontIconParent.right = "7.50%";
        this.view.flxCloseFontIconParent.top = "40dp";
        this.view.flxFooterMenu.width = "148dp";
        this.view.flxDateInput.width = "85%";
        this.view.flexSSN.width = "85%";
        this.view.btnLocateUs.left = "0dp";
        this.view.AlterneteActionsEnterCVV.rtxCVV.skin = "sknSSPLight0273E315Px";
        this.view.AlterneteActionsEnterPIN.rtxCVV.skin = "sknSSPLight0273E315Px";
        this.view.letsverify.lbxDate.left = "4%";
        // this.view.lblCopyrightDesktop.isVisible = false;
        this.view.ResetOrEnroll.rtxEnterCVV.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
        this.view.UsenamePasswordSuccess.lblMessage.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
        this.view.resetusingOTP.rtxEnterCVVCode.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
        this.view.resetusingOTPEnterOTP.rtxEnterCVVCode.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
        this.view.resetusingOTPEnterOTP.lblWrongOTP.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
        this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch.contentAlignment = constants.CONTENT_ALIGN_TOP_CENTER;
        this.view.forceLayout();
      }
      if (width !== 1400) this.view.onTouchEnd = function() {}
      if (width > 1024 && orientationHandler.isTablet) {
        this.view.flxCloseFontIconParent.left = "";
        this.view.letsverify.flxLetsVerifyCntr.centerX = "50%";
        this.view.flxCloseFontIconParent.right = "20%";
        this.view.flxCloseFontIconParent.top = "60dp";
        this.view.flxDateInput.width = "85%";
        this.view.flexSSN.width = "85%";
        this.view.newUsernamepasswordsetting.flxRulesUsername.width = "68%";
        this.view.newUsernamepasswordsetting.flxRulesPassword.width = "68%";
        //this.view.lblSelectProductToEnrollFor.contentAlignment = constants.CONTENT_ALIGN_TOP_LEFT;
      }
      if (orientationHandler.isTablet) {
        this.view.lblSelectProductToEnrollFor.text = kony.i18n.getLocalizedString("i18n.Enroll.SelectProductyouWantToEnrollTab");
      }
      //this.allFieldsCheck();
    },
    /**
     * getCardsSuccessCallBack :This function retrieve the Cards of the user and calls the function to show the CVV option
     * @param {JSONObject} cardsJSON It contains JSON object of CVV Cards
     */
    getCardsSuccessCallBack: function(cardsJSON) {
      FormControllerUtility.hideProgressBar(this.view);
      if (cardsJSON.length !== 0) {
        this.showCVVOption();
        this.showCVVCards(cardsJSON);
      }
      else {
        this.hideCVVOption();
      }
      this.emptyUserDetails();
    },
    /**
     * getCardsErrorCallBack :This function navigates to error screen if the cards are not fetched because of the server error
     *
     */
    getCardsErrorCallBack: function() {
      FormControllerUtility.hideProgressBar(this.view);
      this.hideCVVOption();
      this.loadEnrollModule().presentationController.navigateToServerDownScreen();
    },
    /**
     * isCVVCorrect :This function checks whether the  CVV  is correct  or not for the selected card
     */
    isCVVCorrect: function() {
      var maskedCardNumber = this.view.ResetOrEnroll.flxCards.lstbxCards.selectedKeyValue;
      var selCardNumber = JSON.stringify(maskedCardNumber);
      selCardNumber = selCardNumber.substring(selCardNumber.indexOf(",") + 1, selCardNumber.length - 1);
      var cvv = this.view.ResetOrEnroll.tbxCVV.text;
      FormControllerUtility.showProgressBar(this.view);
      this.loadEnrollModule().presentationController.cvvValidate(selCardNumber, cvv);
    },
    /**
     * CVVValidateResponseSuccess :This function shows the Reset Password page if the entered cvv is valid and correct
     */
    CVVValidateResponseSuccess: function() {
      FormControllerUtility.hideProgressBar(this.view);
      this.view.letsverify.isVisible = false;
      this.getUserNameAndPasswordPolicies();
      this.showResetPasswordPage();
    },
    /**
     * CVVValidateResponseFailure :This function shows the error message if the entered cvv is incorrect
     */
    CVVValidateResponseFailure: function() {
      FormControllerUtility.hideProgressBar(this.view);
      this.view.letsverify.isVisible = false;
      this.showErrorForCVV();
    },
    /**
     * This function shows the error message if the user enters the incorrect CVV
     */
    showErrorForCVV: function() {
      this.view.ResetOrEnroll.lblWrongCvv.isVisible = true;
    },
    /**
     * isOTPCorrect :This function calls the function which validates whether entered OTP is correct or not
     */
    isOTPCorrect: function() {
      FormControllerUtility.showProgressBar(this.view);
      var otp = this.view.resetusingOTPEnterOTP.tbxCVV.text;
      this.loadEnrollModule().presentationController.otpValidate(otp);
    },
    /**
     * OTPValidateResponseSuccess :This function shows the resetPasswordPage from the OTP page
     */
    OTPValidateResponseSuccess: function() {
      FormControllerUtility.hideProgressBar(this.view);
      this.view.letsverify.isVisible = false;
      this.view.flxPhoneAndEmail.setVisibility(false);
      this.view.OTPModule.flxEnterSecureAccessCode.setVisibility(false);
      this.view.OTPModule.flxEnterOTP.setVisibility(false);
      FormControllerUtility.disableButton(this.view.OTPModule.btnLogin);
      this.view.OTPModule.tbxCVV.text = "";
      this.showResetPasswordPageFromOTP();
    },
    /**
     * OTPValidateResponseFailure :This function shows the error message if the entered OTP is wrong
     */
    OTPValidateResponseFailure: function() {
      FormControllerUtility.hideProgressBar(this.view);
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      //CommonUtilities.setText(this.view.resetusingOTPEnterOTP.lblWrongOTP, kony.i18n.getLocalizedString("i18n.login.incorrectOTP"), accessibilityConfig);
      this.view.resetusingOTPEnterOTP.lblWrongOTP.text = kony.i18n.getLocalizedString("i18n.login.incorrectOTP");
      FormControllerUtility.disableButton(this.view.resetusingOTPEnterOTP.btnNext);
      this.view.resetusingOTPEnterOTP.lblWrongOTP.setVisibility(true);
      this.view.resetusingOTPEnterOTP.tbxCVV.text = "";
      this.view.forceLayout();
    },
    /**
     * requestOTPValue :This function is for calling the other function in the presentation Controller for requesting OTP from the server
     */
    requestOTPValue: function() {
      FormControllerUtility.showProgressBar(this.view);
      this.loadEnrollModule().presentationController.requestOTP();
    },
    /**
     * requestOTPResponseSuccess :This function is called once the OTP from the server is received i.e. success
     */
    requestOTPResponseSuccess: function() {
      FormControllerUtility.hideProgressBar(this.view);
      this.showEnterOTPPage();
    },
    /**
     * requestOTPResponseFailure :This function is called when there is request OTP is failed i.e. OTP is not received
     */
    requestOTPResponseFailure: function() {
      FormControllerUtility.hideProgressBar(this.view);
    },
    /**
     * showErrorForOTP :This function shows error message if user enters the wrong OTP
     */
    showErrorForOTP: function() {
      this.view.resetusingOTPEnterOTP.lblWrongOTP.isVisible = false;
      this.view.flxResetUsingOTP.parent.forceLayout();
    },
    /**
     * validateConfirmPassword :This function validates whether the entered password and the matched password are same or not
     * @param {Object}  enteredPassword password entered by the user
     */
    validateConfirmPassword: function(enteredPassword) {
      var enteredPassword = this.view.newUsernamepasswordsetting.tbxNewPassword.text;
      var reEnteredpassword = this.view.newUsernamepasswordsetting.tbxMatchPassword.text
      if (reEnteredpassword != "" && !this.isPasswordValidAndMatchedWithReEnteredValue()) {
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        //CommonUtilities.setText(this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch, kony.i18n.getLocalizedString("i18n.login.passwordmismatch"), accessibilityConfig);
        kony.i18n.getLocalizedString("i18n.login.incorrectOTP").text = kony.i18n.getLocalizedString("i18n.login.passwordmismatch");
        this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch.isVisible = true;
        this.view.newUsernamepasswordsetting.imgPasswordMatched.isVisible = false;
        FormControllerUtility.disableButton(this.view.newUsernamepasswordsetting.btnCreate);
        this.view.flxUsernameAndPassword.parent.forceLayout();
        return;
      }
      if (this.isPasswordValid(enteredPassword)) {
        if (this.isPasswordValidAndMatchedWithReEnteredValue()) {
          if (!this.isUserNameValid(this.view.newUsernamepasswordsetting.tbxNewUserName.text)) {
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            //CommonUtilities.setText(this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch, kony.i18n.getLocalizedString("i18n.enrollNow.validUsername"), accessibilityConfig);
            this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch.text = kony.i18n.getLocalizedString("i18n.enrollNow.validUsername");
            this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch.isVisible = true;
            FormControllerUtility.disableButton(this.view.newUsernamepasswordsetting.btnCreate);
          }
          else {
            FormControllerUtility.enableButton(this.view.newUsernamepasswordsetting.btnCreate);
          }
          this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch.isVisible = false;
          this.view.newUsernamepasswordsetting.imgPasswordMatched.isVisible = true;
        }
        else {
          var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
          //CommonUtilities.setText(this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch, kony.i18n.getLocalizedString("i18n.login.passwordmismatch"), accessibilityConfig);
          this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch.text = kony.i18n.getLocalizedString("i18n.login.passwordmismatch");
          this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch.isVisible = true;
          this.view.newUsernamepasswordsetting.imgPasswordMatched.isVisible = false;
          FormControllerUtility.disableButton(this.view.newUsernamepasswordsetting.btnCreate);
        }
      }
      else {
        if (enteredPassword.length === 0) {
          this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch.isVisible = false;
          this.view.newUsernamepasswordsetting.imgPasswordMatched.isVisible = false;
        }
        else {
          var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
          //CommonUtilities.setText(this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch, kony.i18n.getLocalizedString("i18n.login.invalidPassword"), accessibilityConfig);
          this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch.text = kony.i18n.getLocalizedString("i18n.login.invalidPassword");
          this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch.isVisible = true;
        }
        this.view.newUsernamepasswordsetting.imgPasswordMatched.isVisible = false;
        FormControllerUtility.disableButton(this.view.newUsernamepasswordsetting.btnCreate);
      }
      this.view.flxUsernameAndPassword.parent.forceLayout();
    },
    /**
     * validateUserName :This function validates whether the entered username is valid or not
     * @param {Object} enteredUserName username entered by the user
     */
    ValidateUserName: function(enteredUserName) {
      if (this.isUserNameValid(enteredUserName)) {
        this.view.newUsernamepasswordsetting.imgCorrectUserName.isVisible = true;
        // this.view.newUsernamepasswordsetting.flxRulesUsername.isVisible = false;
        this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch.isVisible = false;
        if ((this.isPasswordValid(this.view.newUsernamepasswordsetting.tbxNewPassword.text)) && (this.isPasswordValid(this.view.newUsernamepasswordsetting.tbxMatchPassword.text))) {
          if (this.isPasswordValidAndMatchedWithReEnteredValue()) {
            FormControllerUtility.enableButton(this.view.newUsernamepasswordsetting.btnCreate);
          }
          else {
            FormControllerUtility.disableButton(this.view.newUsernamepasswordsetting.btnCreate);
          }
        }
      }
      else {
        if (enteredUserName.length === 0) {
          this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch.isVisible = false;
          this.view.newUsernamepasswordsetting.imgPasswordMatched.isVisible = false;
        }
        else {
          var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
          //CommonUtilities.setText(this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch, kony.i18n.getLocalizedString("i18n.enrollNow.validUsername"), accessibilityConfig);
          this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch.text = kony.i18n.getLocalizedString("i18n.enrollNow.validUsername");
          this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch.isVisible = true;
        }
        this.view.newUsernamepasswordsetting.imgCorrectUserName.isVisible = false;
        FormControllerUtility.disableButton(this.view.newUsernamepasswordsetting.btnCreate);
      }
      this.view.flxUsernameAndPassword.parent.forceLayout();
    },
    /**
     * validateNewPassword :This function validates whether the entered password is correct or not
     * @param {Object}  enteredPassword password entered by the user
     */
    validateNewPassword: function(enteredPassword) {
      if (this.isPasswordValid(enteredPassword)) {
        this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch.isVisible = false;
        this.view.newUsernamepasswordsetting.imgValidPassword.isVisible = true;
        this.view.newUsernamepasswordsetting.flxRulesPassword.isVisible = true;
        if (this.view.newUsernamepasswordsetting.tbxMatchPassword.text !== "") {
          if (this.isPasswordValidAndMatchedWithReEnteredValue()) {
            if (!this.isUserNameValid(this.view.newUsernamepasswordsetting.tbxNewUserName.text)) {
              var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
              //CommonUtilities.setText(this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch, kony.i18n.getLocalizedString("i18n.enrollNow.validUsername"), accessibilityConfig);
              this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch.text = kony.i18n.getLocalizedString("i18n.enrollNow.validUsername");
              this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch.isVisible = true;
              FormControllerUtility.disableButton(this.view.newUsernamepasswordsetting.btnCreate);
            }
            else {
              FormControllerUtility.enableButton(this.view.newUsernamepasswordsetting.btnCreate);
            }
            this.view.newUsernamepasswordsetting.imgPasswordMatched.isVisible = true;
          }
          else {
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            //CommonUtilities.setText(this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch, kony.i18n.getLocalizedString("i18n.login.passwordmismatch"), accessibilityConfig);
            this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch.text = kony.i18n.getLocalizedString("i18n.login.passwordmismatch");
            this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch.isVisible = true;
            this.view.newUsernamepasswordsetting.imgPasswordMatched.isVisible = false;
            FormControllerUtility.disableButton(this.view.newUsernamepasswordsetting.btnCreate);
          }
        }
      }
      else {
        this.view.newUsernamepasswordsetting.imgValidPassword.isVisible = false;
        this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch.isVisible = true;
        this.showRulesPassword();
        this.view.newUsernamepasswordsetting.imgValidPassword.isVisible = false;
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        //CommonUtilities.setText(this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch, kony.i18n.getLocalizedString("i18n.login.invalidPassword"), accessibilityConfig);
        this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch.text = kony.i18n.getLocalizedString("i18n.login.invalidPassword");
        this.view.newUsernamepasswordsetting.imgPasswordMatched.isVisible = false;
        FormControllerUtility.disableButton(this.view.newUsernamepasswordsetting.btnCreate);
      }
      this.view.flxUsernameAndPassword.parent.forceLayout();
    },
    /**
     * reEnterNewPassword :This function shows the error message if the entered password is wrong
     */
    reEnterNewPassword: function() {
      this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch.isVisible = false;
      this.view.newUsernamepasswordsetting.flxNewPassword.top = "8.8%";
      this.view.flxUsernameAndPassword.parent.forceLayout();
    },
    /**
     * isPasswordValid: This function checks whether the password is valid or not
     * @param {Object} enteredPassword password entered by the user
     @return {boolean} true if the password is valid,false if it is not
    */
    isPasswordValid: function(enteredPassword) {
      return applicationManager.getValidationUtilManager().isPasswordValidForPolicy(enteredPassword);
    },
    /**
     * hasConsecutiveDigits :This function checks whether there are 9 Consecutive Digits or not
     * @param {var} input is the entered password
     * @return {boolean}  true-- if there are no consecutive digits ,false-- if there are consecutive digits
     */
    hasConsecutiveDigits: function(input) {
      var i;
      var count = 0;
      var consquetiveLength = 9;
      for (i = 0; i < input.length; i++) {
        if (input[i] >= 0 && input[i] <= consquetiveLength) {
          count++;
        }
        else {
          count = 0;
        }
        if (count === consquetiveLength) {
          return true;
        }
      }
      return false;
    },
    /**
     * isUserNameValid :This function checks whether the username is valid or not
     * @param {var}  enteredUserName username entered by the user
     * @return {boolean} true -- if the username is valid,false--if the username is not valid
     */
    isUserNameValid: function(enteredUserName) { // TODO: move to validation manager?
      return applicationManager.getValidationUtilManager().isUsernameValidForPolicy(enteredUserName);
    },
    /**
     * showResetConfirtoResetPasswordmationPage :This function calls the function to create the username and password
     */
    showResetConfirtoResetPasswordmationPage: function() {
      var password = this.view.newUsernamepasswordsetting.tbxNewPassword.text;
      var userName = this.view.newUsernamepasswordsetting.tbxNewUserName.text;
      FormControllerUtility.showProgressBar(this.view);
      this.loadEnrollModule().presentationController.createUser(userName, password);
    },
    /**
     * createUserPasswordResponseSuccess :This function is called when the creation of the user is successfull
     * @param {Object} response contains the userId
     */
    createUserPasswordResponseSuccess: function(response) {
      if (response.userId !== "") {
        this.view.flxUsernameAndPassword.setVisibility(false);
        this.view.flxSecurityQuestionsAck.setVisibility(true);
        this.view.securityAck.lblNotYetEnrolledOrError.isVisible = true;
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        // CommonUtilities.setText(this.view.securityAck.lblNotYetEnrolledOrError, "You have set your Username & Password", accessibilityConfig);
        // CommonUtilities.setText(this.view.securityAck.btnProceed, "Back to Login", accessibilityConfig);
        this.view.securityAck.lblNotYetEnrolledOrError.text = "You have set your Username & Password";
        this.view.securityAck.btnProceed.text = "Back to Login";
        this.view.securityAck.orline.setVisibility(false);
        this.view.securityAck.btnLoginLater.setVisibility(false);
        this.view.securityAck.lblLoginNextTime.setVisibility(false);
        this.view.newUsernamepasswordsetting.tbxNewUserName.text = "";
        this.view.newUsernamepasswordsetting.imgCorrectUserName.isVisible = false;
        this.view.newUsernamepasswordsetting.imgValidPassword.isVisible = false;
        this.view.newUsernamepasswordsetting.tbxNewPassword.text = "";
        this.view.newUsernamepasswordsetting.imgPasswordMatched.isVisible = false;
        this.view.newUsernamepasswordsetting.tbxMatchPassword.text = "";
        FormControllerUtility.disableButton(this.view.newUsernamepasswordsetting.btnCreate);
        this.view.forceLayout();
      }
      else {
        this.createUserPasswordResponseAlreadyEnrolled(response);
      }
      FormControllerUtility.hideProgressBar(this.view);
    },
    /**
     * createUserPasswordResponseAlreadyEnrolled :This function is called when the creating the user whose is already enrolled
     * @param {object} response contains the userId
     */
    createUserPasswordResponseAlreadyEnrolled: function(response) {
      this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch.text = kony.i18n.getLocalizedString("i18n.enrollNow.wrongUserName");
      this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch.isVisible = true;
      this.view.newUsernamepasswordsetting.tbxNewUserName.text = "";
      this.view.newUsernamepasswordsetting.imgCorrectUserName.isVisible = false;
      this.view.newUsernamepasswordsetting.imgValidPassword.isVisible = false;
      this.view.newUsernamepasswordsetting.tbxNewPassword.text = "";
      this.view.newUsernamepasswordsetting.imgPasswordMatched.isVisible = false;
      this.view.newUsernamepasswordsetting.tbxMatchPassword.text = "";
      FormControllerUtility.disableButton(this.view.newUsernamepasswordsetting.btnCreate);
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
    },
    /**
     * createUserPasswordResponseFailure :This function is called when the creation of the username is failed
     * @param {Object} response contains the userId
     */
    createUserPasswordResponseFailure: function(response) {
      if (response && response.errorMessage) {
        this.createUserPasswordResponseAlreadyEnrolled();
      }
      else {
        this.loadEnrollModule().presentationController.navigateToServerDownScreen();
      }
    },
    /**
     * showResetConfirmationScreen :This function  shows the password Confirmation Screen
     */
    showResetConfirmationScreen: function() {
      this.view.flxUsernameAndPassword.isVisible = false;
      this.view.flxUsernameAndPasswordAck.isVisible = true;
      this.view.flxUsernameAndPasswordAck.parent.forceLayout();
    },
    /**
     * resendOTPValue :This function is called when the user clicks on resend OTP button
     */
    resendOTPValue: function() {
      FormControllerUtility.showProgressBar(this.view);
      this.view.ResetOrEnroll.tbxCVV.secureTextEntry = true;
      this.view.resetusingOTPEnterOTP.tbxCVV.secureTextEntry = false;
      this.loadEnrollModule().presentationController.resendOTP();
    },
    /**
     * resendOTPResponseSuccess :This function is called when the Resend OTP is Success
     */
    resendOTPResponseSuccess: function() {
      var self = this;
      FormControllerUtility.hideProgressBar(this.view);
      this.view.resetusingOTPEnterOTP.tbxCVV.text = "";
      FormControllerUtility.disableButton(this.view.resetusingOTPEnterOTP.btnNext);
      self.view.resetusingOTPEnterOTP.btnResendOTP.setEnabled(false);
      self.view.resetusingOTPEnterOTP.btnResendOTP.skin = OLBConstants.SKINS.LOGIN_RESEND_OTP_DISABLED;
      self.view.resetusingOTPEnterOTP.btnResendOTP.hoverSkin = OLBConstants.SKINS.LOGIN_RESEND_OTP_DISABLED;
      self.view.flxResetUsingOTP.parent.forceLayout();
      self.enalbeResendButton();
    },
    /**
     * resendOTPResponseFailure :This function is called when the Resend OTP is failed
     */
    resendOTPResponseFailure: function() {
      FormControllerUtility.hideProgressBar(this.view);
    },
    selectedQuestions: {
      ques: ["Select a Question", "Select a Question", "Select a Question", "Select a Question", "Select a Question"],
      key: ["lb0", "lb0", "lb0", "lb0", "lb0"]
    },
    selectedQuestionsTemp: {
      securityQuestions: [],
      flagToManipulate: []
    },
    responseBackend: [{
      question: "",
      SecurityID: ""
    }],
    /**
     * updateSecurityQuestions :This function updates the security Questions
     */
    updateSecurityQuestions: function() {
      var enrollModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("EnrollModule");
      FormControllerUtility.showProgressBar(this.view);
      enrollModule.presentationController.fetchSecurityQuestions(this.selectedQuestionsTemp);
    },
    /**
     * staticSetQuestions :This function makes a service call which retrieves all the questions
     * @param {Object} response
     * @param {Object} data
     */
    staticSetQuestions: function(response, data) {
      FormControllerUtility.hideProgressBar(this.view);
      this.responseBackend = data;
      this.successCallback(response);
      this.showSetSecurityQuestions();
    },
    /**
     * staticSetQuestionsFailure :This method is excuted as a failure callback method for fetching security questions
     * @param {Object} response It contains data of failure
     */
    staticSetQuestionsFailure: function(response) {
      FormControllerUtility.hideProgressBar(this.view);
      var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
      authModule.presentationController.updateFormUI('frmLogin', {});
      authModule.presentationController.navigateToServerDownScreen.call(authModule.presentationController);
    },
    /**
     * successCallback :This function sets the master Data of the  Security Questions to each list Box
     * @param {object} response set of aall questions
     */
    successCallback: function(response) {
      var data = [];
      this.selectedQuestionsTemp = response;
      data = this.getQuestions(response);
      this.view.SetSecurityQuestions.lbxQuestion1.masterData = data;
      this.view.SetSecurityQuestions.lbxQuestion2.masterData = data;
      this.view.SetSecurityQuestions.lbxQuestion3.masterData = data;
      this.view.SetSecurityQuestions.lbxQuestion4.masterData = data;
      this.view.SetSecurityQuestions.lbxQuestion5.masterData = data;
      this.view.SetSecurityQuestions.tbxAnswer1.text = "";
      this.view.SetSecurityQuestions.tbxAnswer2.text = "";
      this.view.SetSecurityQuestions.tbxAnswer3.text = "";
      this.view.SetSecurityQuestions.tbxAnswer4.text = "";
      this.view.SetSecurityQuestions.tbxAnswer5.text = "";
      FormControllerUtility.disableButton(this.view.SetSecurityQuestions.btnSetSecurityQuestionsProceed);
    },
    /**
     * flagManipulation :This function manipulates the data in the listbox after selection
     * @param {Object} data
     * @param {Object} selectedData
     * @return {Object} tempData2: which is the new Data Set
     */
    flagManipulation: function(data, selectedData) {
      var tempData1 = [],
        tempData2 = [];
      if (selectedData[0] !== "lb0") {
        tempData1[0] = selectedData;
        tempData2 = tempData1.concat(data);
      }
      else {
        tempData2 = data;
      }
      return tempData2;
    },
    /**
     * getQuestionsAfterSelected :This function manipulates the listbox after selection
     * @param {Object} data Contains enetire questions
     * @param {Object} selectedQues Contains selected questions
     * @param {var} key Contains questions number
     * @returns {Object} questions It contains requried questions
     */
    getQuestionsAfterSelected: function(data, selectedQues, key) {
      var temp = 10;
      var check = 10;
      if (data[1] !== "Select a Question") {
        for (var i = 0; i < this.selectedQuestionsTemp.securityQuestions.length; i++) {
          if (this.selectedQuestionsTemp.securityQuestions[i] === data[1]) {
            if (this.selectedQuestionsTemp.flagToManipulate[i] === "false") {
              this.selectedQuestionsTemp.flagToManipulate[i] = "true";
              temp = i;
            }
          }
          if (this.selectedQuestionsTemp.securityQuestions[i] === selectedQues.ques) {
            if (this.selectedQuestionsTemp.flagToManipulate[i] === "true") {
              this.selectedQuestionsTemp.flagToManipulate[i] = "false";
              this.selectedQuestions.key[key] = "lb" + (i + 1);
            }
          }
        }
      }
      else {
        FormControllerUtility.disableButton(this.view.SetSecurityQuestions.btnSetSecurityQuestionsProceed);
        if (key === 0) {
          this.view.SetSecurityQuestions.tbxAnswer1.text = "";
        }
        else if (key === 1) {
          this.view.SetSecurityQuestions.tbxAnswer2.text = "";
        }
        else if (key === 2) {
          this.view.SetSecurityQuestions.tbxAnswer3.text = "";
        }
        else if (key === 3) {
          this.view.SetSecurityQuestions.tbxAnswer4.text = "";
        }
        else if (key === 4) {
          this.view.SetSecurityQuestions.tbxAnswer5.text = "";
        }
        for (var ij = 0; ij < this.selectedQuestionsTemp.securityQuestions.length; ij++) {
          if (this.selectedQuestionsTemp.securityQuestions[ij] === selectedQues.ques) {
            if (this.selectedQuestionsTemp.flagToManipulate[ij] === "true") {
              this.selectedQuestionsTemp.flagToManipulate[ij] = "false";
              this.selectedQuestions.key[key] = "lb" + (ij + 1);
            }
          }
        }
      }
      if (temp !== check) {
        this.selectedQuestions.ques[key] = this.selectedQuestionsTemp.securityQuestions[temp];
        this.selectedQuestions.key[key] = "lb" + (temp + 1);
      }
      else {
        this.selectedQuestions.ques[key] = "Select a Question";
        this.selectedQuestions.key[key] = "lb0";
      }
      var questions = [];
      questions = this.getQuestions(this.selectedQuestionsTemp);
      return questions;
    },
    /**
     * getQuestions :This function changes questions into key-value pairs basing on the flagManipulation
     * @param {Object} response JSON of questions
     * @return {Object} temp: array of Security Questions
     */
    getQuestions: function(response) {
      var temp = [];
      temp[0] = ["lb0", "Select a Question"];
      for (var i = 0, j = 1; i < response.securityQuestions.length; i++) {
        var arr = [];
        if (response.flagToManipulate[i] === "false") {
          arr[0] = "lb" + (i + 1);
          arr[1] = response.securityQuestions[i];
          temp[j] = arr;
          j++;
        }
      }
      return temp;
    },
    /**
     * enableSecurityQuestions :This function sets the status whether to enable/disable the status button
     * @param {question1, question2, question3, question4, question5} values of all five questions
     * @return {}
     * @throws {}
     */
    enableSecurityQuestions: function(question1, question2, question3, question4, question5) {
      if (question1 !== null && question1 !== "" && question2 !== null && question2 !== "" && question3 !== null && question3 !== "" && question4 !== null && question4 !== "" && question5 !== null && question5 !== "") {
        this.btnSecurityQuestions(true);
      }
      else {
        this.btnSecurityQuestions(false);
      }
    },
    /**
     * btnSecurityQuestions :This function enables the proceed button if all the five questions are answered
     * @member of {frmEnrollNowController}
     * @param {status}  returns true-- if all the five questions are answered , false-- if any question is not answered
     * @return {}
     * @throws {}
     */
    btnSecurityQuestions: function(status) {
      if (status === true) {
        FormControllerUtility.enableButton(this.view.SetSecurityQuestions.btnSetSecurityQuestionsProceed);
      }
      else {
        FormControllerUtility.disableButton(this.view.SetSecurityQuestions.btnSetSecurityQuestionsProceed);
      }
    },
    /**
     * setQuestionForListBox1 :This function sets the question for first listBox
     */
    setQuestionForListBox1: function() {
      var value = [];
      value = this.view.SetSecurityQuestions.lbxQuestion1.selectedKeyValue;
      var data = [];
      var selectedQues = {
        ques: "null",
        key: "null"
      };
      selectedQues.ques = this.selectedQuestions.ques[0];
      selectedQues.key = this.selectedQuestions.key[0];
      var position = 0;
      data = this.getQuestionsAfterSelected(value, selectedQues, position);
      var mainData = [],
        selectedData = [];
      selectedData = this.view.SetSecurityQuestions.lbxQuestion2.selectedKeyValue;
      mainData = this.flagManipulation(data, selectedData);
      this.view.SetSecurityQuestions.lbxQuestion2.masterData = mainData;
      var mainData2 = [],
        selectedData2 = [];
      selectedData2 = this.view.SetSecurityQuestions.lbxQuestion3.selectedKeyValue;
      mainData2 = this.flagManipulation(data, selectedData2);
      this.view.SetSecurityQuestions.lbxQuestion3.masterData = mainData2;
      var mainData3 = [],
        selectedData3 = [];
      selectedData3 = this.view.SetSecurityQuestions.lbxQuestion4.selectedKeyValue;
      mainData3 = this.flagManipulation(data, selectedData3);
      this.view.SetSecurityQuestions.lbxQuestion4.masterData = mainData3;
      var mainData4 = [],
        selectedData4 = [];
      selectedData4 = this.view.SetSecurityQuestions.lbxQuestion5.selectedKeyValue;
      mainData4 = this.flagManipulation(data, selectedData4);
      this.view.SetSecurityQuestions.lbxQuestion5.masterData = mainData4;
    },
    /**
     * setQuestionForListBox4 :This function sets the question for fourth listBox
     */
    setQuestionForListBox4: function() {
      var value = [];
      value = this.view.SetSecurityQuestions.lbxQuestion4.selectedKeyValue;
      var data = [];
      var selectedQues = {
        ques: "null",
        key: "null"
      };
      selectedQues.ques = this.selectedQuestions.ques[3];
      selectedQues.key = this.selectedQuestions.key[3];
      var position = 3;
      data = this.getQuestionsAfterSelected(value, selectedQues, position);
      var mainData = [],
        selectedData = [];
      selectedData = this.view.SetSecurityQuestions.lbxQuestion1.selectedKeyValue;
      mainData = this.flagManipulation(data, selectedData);
      this.view.SetSecurityQuestions.lbxQuestion1.masterData = mainData;
      var mainData2 = [],
        selectedData2 = [];
      selectedData2 = this.view.SetSecurityQuestions.lbxQuestion3.selectedKeyValue;
      mainData2 = this.flagManipulation(data, selectedData2);
      this.view.SetSecurityQuestions.lbxQuestion3.masterData = mainData2;
      var mainData3 = [],
        selectedData3 = [];
      selectedData3 = this.view.SetSecurityQuestions.lbxQuestion2.selectedKeyValue;
      mainData3 = this.flagManipulation(data, selectedData3);
      this.view.SetSecurityQuestions.lbxQuestion2.masterData = mainData3;
      var mainData4 = [],
        selectedData4 = [];
      selectedData4 = this.view.SetSecurityQuestions.lbxQuestion5.selectedKeyValue;
      mainData4 = this.flagManipulation(data, selectedData4);
      this.view.SetSecurityQuestions.lbxQuestion5.masterData = mainData4;
    },
    /**
     * setQuestionForListBox3 :This function sets the question for third listBox
     */
    setQuestionForListBox3: function() {
      var value = [];
      value = this.view.SetSecurityQuestions.lbxQuestion3.selectedKeyValue;
      var data = [];
      var selectedQues = {
        ques: "null",
        key: "null"
      };
      selectedQues.ques = this.selectedQuestions.ques[2];
      selectedQues.key = this.selectedQuestions.key[2];
      var position = 2;
      data = this.getQuestionsAfterSelected(value, selectedQues, position);
      var mainData = [],
        selectedData = [];
      selectedData = this.view.SetSecurityQuestions.lbxQuestion1.selectedKeyValue;
      mainData = this.flagManipulation(data, selectedData);
      this.view.SetSecurityQuestions.lbxQuestion1.masterData = mainData;
      var mainData2 = [],
        selectedData2 = [];
      selectedData2 = this.view.SetSecurityQuestions.lbxQuestion2.selectedKeyValue;
      mainData2 = this.flagManipulation(data, selectedData2);
      this.view.SetSecurityQuestions.lbxQuestion2.masterData = mainData2;
      var mainData3 = [],
        selectedData3 = [];
      selectedData3 = this.view.SetSecurityQuestions.lbxQuestion4.selectedKeyValue;
      mainData3 = this.flagManipulation(data, selectedData3);
      this.view.SetSecurityQuestions.lbxQuestion4.masterData = mainData3;
      var mainData4 = [],
        selectedData4 = [];
      selectedData4 = this.view.SetSecurityQuestions.lbxQuestion5.selectedKeyValue;
      mainData4 = this.flagManipulation(data, selectedData4);
      this.view.SetSecurityQuestions.lbxQuestion5.masterData = mainData4;
    },
    /**
     * setQuestionForListBox2 :This function sets the question for second listBox
     */
    setQuestionForListBox2: function() {
      var value = [];
      value = this.view.SetSecurityQuestions.lbxQuestion2.selectedKeyValue;
      var data = [];
      var selectedQues = {
        ques: "null",
        key: "null"
      };
      selectedQues.ques = this.selectedQuestions.ques[1];
      selectedQues.key = this.selectedQuestions.key[1];
      var position = 1;
      data = this.getQuestionsAfterSelected(value, selectedQues, position);
      var mainData = [],
        selectedData = [];
      selectedData = this.view.SetSecurityQuestions.lbxQuestion1.selectedKeyValue;
      mainData = this.flagManipulation(data, selectedData);
      this.view.SetSecurityQuestions.lbxQuestion1.masterData = mainData;
      var mainData2 = [],
        selectedData2 = [];
      selectedData2 = this.view.SetSecurityQuestions.lbxQuestion3.selectedKeyValue;
      mainData2 = this.flagManipulation(data, selectedData2);
      this.view.SetSecurityQuestions.lbxQuestion3.masterData = mainData2;
      var mainData3 = [],
        selectedData3 = [];
      selectedData3 = this.view.SetSecurityQuestions.lbxQuestion4.selectedKeyValue;
      mainData3 = this.flagManipulation(data, selectedData3);
      this.view.SetSecurityQuestions.lbxQuestion4.masterData = mainData3;
      var mainData4 = [],
        selectedData4 = [];
      selectedData4 = this.view.SetSecurityQuestions.lbxQuestion5.selectedKeyValue;
      mainData4 = this.flagManipulation(data, selectedData4);
      this.view.SetSecurityQuestions.lbxQuestion5.masterData = mainData4;
    },
    /**
     * setQuestionForListBox5 :This function sets the question for fifth listBox
     */
    setQuestionForListBox5: function() {
      var value = [];
      value = this.view.SetSecurityQuestions.lbxQuestion5.selectedKeyValue;
      var data = [];
      var selectedQues = {
        ques: "null",
        key: "null"
      };
      selectedQues.ques = this.selectedQuestions.ques[4];
      selectedQues.key = this.selectedQuestions.key[4];
      var position = 4;
      data = this.getQuestionsAfterSelected(value, selectedQues, position);
      var mainData = [],
        selectedData = [];
      selectedData = this.view.SetSecurityQuestions.lbxQuestion1.selectedKeyValue;
      mainData = this.flagManipulation(data, selectedData);
      this.view.SetSecurityQuestions.lbxQuestion1.masterData = mainData;
      var mainData2 = [],
        selectedData2 = [];
      selectedData2 = this.view.SetSecurityQuestions.lbxQuestion3.selectedKeyValue;
      mainData2 = this.flagManipulation(data, selectedData2);
      this.view.SetSecurityQuestions.lbxQuestion3.masterData = mainData2;
      var mainData3 = [],
        selectedData3 = [];
      selectedData3 = this.view.SetSecurityQuestions.lbxQuestion4.selectedKeyValue;
      mainData3 = this.flagManipulation(data, selectedData3);
      this.view.SetSecurityQuestions.lbxQuestion4.masterData = mainData3;
      var mainData4 = [],
        selectedData4 = [];
      selectedData4 = this.view.SetSecurityQuestions.lbxQuestion2.selectedKeyValue;
      mainData4 = this.flagManipulation(data, selectedData4);
      this.view.SetSecurityQuestions.lbxQuestion2.masterData = mainData4;
    },
    /**
     * onEditingAnswer1 :This function sets the minimum and maximum limitations on the first answer selected
     */
    onEditingAnswer1: function() {
      var data = [];
      data = this.view.SetSecurityQuestions.lbxQuestion1.selectedKeyValue;
      if (data[1] === "Select a Question") {
        this.view.SetSecurityQuestions.tbxAnswer1.maxTextLength = 0;
      }
      else {
        this.view.SetSecurityQuestions.tbxAnswer1.maxTextLength = 50;
      }
    },
    /**
     * onEditingAnswer2 :This function sets the minimum and maximum limitations on the second answer selected
     */
    onEditingAnswer2: function() {
      var data = [];
      data = this.view.SetSecurityQuestions.lbxQuestion2.selectedKeyValue;
      if (data[1] === "Select a Question") {
        this.view.SetSecurityQuestions.tbxAnswer2.maxTextLength = 0;
      }
      else {
        this.view.SetSecurityQuestions.tbxAnswer2.maxTextLength = 50;
      }
    },
    /**
     * onEditingAnswer3 :This function sets the minimum and maximum limitations on the third answer selected
     */
    onEditingAnswer3: function() {
      var data = [];
      data = this.view.SetSecurityQuestions.lbxQuestion3.selectedKeyValue;
      if (data[1] === "Select a Question") {
        this.view.SetSecurityQuestions.tbxAnswer3.maxTextLength = 0;
      }
      else {
        this.view.SetSecurityQuestions.tbxAnswer3.maxTextLength = 50;
      }
    },
    /**
     * onEditingAnswer4 :This function sets the minimum and maximum limitations on the fourth answer selected
     */
    onEditingAnswer4: function() {
      var data = [];
      data = this.view.SetSecurityQuestions.lbxQuestion4.selectedKeyValue;
      if (data[1] === "Select a Question") {
        this.view.SetSecurityQuestions.tbxAnswer4.maxTextLength = 0;
      }
      else {
        this.view.SetSecurityQuestions.tbxAnswer4.maxTextLength = 50;
      }
    },
    /**
     * onEditingAnswer5 :This function sets the minimum and maximum limitations on the fifth answer selected
     */
    onEditingAnswer5: function() {
      var data = [];
      data = this.view.SetSecurityQuestions.lbxQuestion5.selectedKeyValue;
      if (data[1] === "Select a Question") {
        this.view.SetSecurityQuestions.tbxAnswer5.maxTextLength = 0;
      }
      else {
        this.view.SetSecurityQuestions.tbxAnswer5.maxTextLength = 50;
      }
    },
    /**
     * onSaveSecurityQuestions :This function sets the selected answer to the selected question
     */
    onSaveSecurityQuestions: function() {
      var data = [{
        customerAnswer: "",
        questionId: ""
      }, {
        customerAnswer: "",
        questionId: ""
      }, {
        customerAnswer: "",
        questionId: ""
      }, {
        customerAnswer: "",
        questionId: ""
      }, {
        customerAnswer: "",
        questionId: ""
      }];
      var quesData = "";
      quesData = this.view.SetSecurityQuestions.lbxQuestion1.selectedKeyValue;
      data[0].customerAnswer = this.view.SetSecurityQuestions.tbxAnswer1.text;
      data[0].questionId = this.getQuestionID(quesData);
      quesData = this.view.SetSecurityQuestions.lbxQuestion2.selectedKeyValue;
      data[1].customerAnswer = this.view.SetSecurityQuestions.tbxAnswer2.text;
      data[1].questionId = this.getQuestionID(quesData);
      quesData = this.view.SetSecurityQuestions.lbxQuestion3.selectedKeyValue;
      data[2].customerAnswer = this.view.SetSecurityQuestions.tbxAnswer3.text;
      data[2].questionId = this.getQuestionID(quesData);
      quesData = this.view.SetSecurityQuestions.lbxQuestion4.selectedKeyValue;
      data[3].customerAnswer = this.view.SetSecurityQuestions.tbxAnswer4.text;
      data[3].questionId = this.getQuestionID(quesData);
      quesData = this.view.SetSecurityQuestions.lbxQuestion5.selectedKeyValue;
      data[4].customerAnswer = this.view.SetSecurityQuestions.tbxAnswer5.text;
      data[4].questionId = this.getQuestionID(quesData);
      return data;
    },
    /**
     * getQuestionID :This function gets the unique question ID for each question
     * @param {Object} quesData: Array of questions
     * @returns
     */
    getQuestionID: function(quesData) {
      var qData;
      for (var i = 0; i < this.responseBackend.length; i++) {
        if (quesData[1] === this.responseBackend[i].SecurityQuestion) {
          qData = this.responseBackend[i].SecurityQuestion_id;
        }
      }
      return qData;
    },
    /**
     * onProceedSQ :This function is called when the server fails to save the security questions and navigates to server down time
     */
    onProceedSQ: function() {
      FormControllerUtility.showProgressBar(this.view);
      var data = this.onSaveSecurityQuestions();
      this.loadEnrollModule().presentationController.saveSecurityQuestions(data);
    },
    /**
     * saveSQCallback :This function is called when the server fails to save the security questions and navigates to server down time
     */
    saveSQCallback: function() {
      FormControllerUtility.hideProgressBar(this.view);
      this.showSecurityQuestionsAck();
      //this.view.securityAck.lblNotYetEnrolledOrError.text = kony.i18n.getLocalizedString("i18n.enrollNow.successfulEnrol");
    },
    /**
     * saveSQfailureCallback :This function is called when the server fails to save the security questions and navigates to server down time
     * @param {String} errorMessage - errormessage to be displayed
     */
    saveSQfailureCallback: function(errorMessage) {
      FormControllerUtility.hideProgressBar(this.view);
      // var navManager = applicationManager.getNavigationManager();
      //     navManager.navigateTo("frmLogin");
      //this.loadEnrollModule().presentationController.navigateToServerDownScreen();
    },
    /**
     * onCancelSecurityQuestions :This function when user dont want to enter the security questions and click on cancel
     */
    onCancelSecurityQuestions: function() {
      this.selectedQuestions = {
        ques: ["Select a Question", "Select a Question", "Select a Question", "Select a Question", "Select a Question"],
        key: ["lb0", "lb0", "lb0", "lb0", "lb0"]
      };
      this.selectedQuestionsTemp = {
        securityQuestions: [],
        flagToManipulate: []
      };
      this.showUsernamePasswordAck();
    },
    /**
     * resetAllFlexes: This function resets all flexes
     */
    resetAllFlexes: function() {
      this.view.flxVerification.isVisible = false;
      this.view.flxVerificationBB.isVisible = false;
      this.view.flxResetPasswordOptions.isVisible = false;
      this.view.flxSelectProductToEnrollFor.isVisible = false;
      this.view.flxWelcomeBack.isVisible = false;
      this.view.flxSendOTP.isVisible = false;
      this.view.flxResetUsingOTP.isVisible = false;
      this.view.flxResetUsingCVV.isVisible = false;
      this.view.flxResetPassword.isVisible = false;
      this.view.flxUsernameAndPassword.isVisible = false;
      this.view.flxSecurityQuestions.isVisible = false;
      this.view.flxSecurityQuestionsSelectedUsername.isVisible = false;
      this.view.flxSecurityQuestionsAck.isVisible = false;
      this.view.flxUsernameAndPasswordAck.isVisible = false;
      this.view.flxUsernameAndPasswordAckSelectedUsername.isVisible = false;
      this.view.flxusernamepassword.isVisible = false;
      this.view.flxResetSuccessful.isVisible = false;
      this.view.flxEnrollOrServerError.isVisible = false;
      this.view.flxCloseSendOTPBusinessBanking.isVisible = false;
      this.view.flxEnroll.isVisible = false;
      this.view.flxPhoneAndEmail.isVisible = false;
      this.view.forceLayout();
    },
    /**
     * showEnrollTypeSelection: This function shows enroll type selection screen
     */
    showEnrollTypeSelection: function() {
      FormControllerUtility.hideProgressBar(this.view);
      this.resetAllFlexes();
      this.emptyUserDetails();
      this.view.flxSelectProductToEnrollFor.setVisibility(true);
      this.view.PersonalBanking.onTouchStart = this.showPersonalBankingEnrollScreen.bind(this);
      this.view.PersonalBanking.onClick = this.showPersonalBankingEnrollScreen.bind(this);
      this.view.BusinessBanking.onTouchEnd = this.showBusinessBankingEnrollScreen.bind(this);
      this.view.BusinessBanking.onClick = this.showBusinessBankingEnrollScreen.bind(this);

      this.fetchCaptchaForEnrollment();
      this.view.forceLayout();
      let self = this;
      var locale = kony.i18n.getCurrentLocale();
      if (locale === "ar_AE") {
        self.view.lblBeyondBankingDesc.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
        self.view.lblCopyrightDesktop.contentAlignment = constants.CONTENT_ALIGN_MIDDLE_RIGHT;
        self.view.lblCopyrightDesktop.height = "70dp";
      }
    },
    /**
     * showBusinessBankingEnrollScreen : this function shows business banking enroll screen
     */
    showBusinessBankingEnrollScreen: function() {
      var accountCentric = false;
      if (applicationManager.getConfigurationManager().configurations.getItem("isAccountCentricCore") === "true") accountCentric = true;
      this.loadEnrollModule().presentationController.showBusinessEnrollScreen(accountCentric);
    },
    /**
     * showPersonalBankingEnrollScreen: This function shows personal banking enroll screen
     */
    showPersonalBankingEnrollScreen: function() {
      this.view.title = "Enroll Now- Verification";
      this.resetAllFlexes();
      this.view.flxVerification.setVisibility(true);
      this.view.flxVerification.letsverify.setVisibility(true);
      this.view.forceLayout();
    },
    /**
     * checkIfBusinessBankingUserDetailsExists: This function checks if member id exists
     */
    checkIfBusinessBankingUserDetailsExists: function() {
      var mbbUserJson = this.getBusinessBankingUserDetailsFromUI();
      this.loadEnrollModule().presentationController.checkIfBusinessBankingMemberExists(mbbUserJson);
    },
    /**
     * getBusinessBankingUserDetailsFromUI: This function gets business banking user details
     * @returns {Object} JSONObject of entered user details
     */
    getBusinessBankingUserDetailsFromUI: function() {
      applicationManager.getFormatUtilManager().getBackendDateTimeFormat();
      return {
        "LastName": this.view.tbxEnterLastName.text,
        "Ssn": this.view.tbxSSN.text,
        "Organization_Id": this.view.tbxCompanyId.text,
        "DateOfBirth": applicationManager.getFormatUtilManager().getFormatedDateString(this.view.DateInput.getDateObject(), applicationManager.getFormatUtilManager().getBackendDateFormat())
      };
    },
    /**
     * showErrorInUserDetailsPageBB: This functions shows error in entered user details
     * @param {Object} errorMsg contains error message
     */
    showErrorInUserDetailsPageBB: function(errorMsg) {
      this.view.lblWrongInformation.text = errorMsg;
      this.view.lblWrongInformation.setVisibility(true);
      this.view.forceLayout();
    },
    /**
     * showSendOTPScreen1MBB: This function shows send OTP screen
     */
    showSendOTPScreen1MBB: function() {
      this.view.btnNext.onClick = this.loadEnrollModule().presentationController.requestOTPPreLoginMB.bind(this);
      this.view.forceLayout();
    },
    /**
     * showSendOTPScreen2MBB: This function shows validate OTP screen
     */
    showSendOTPScreen2MBB: function() {
      this.resetAllFlexes();
      this.view.flxCloseSendOTPBusinessBanking.setVisibility(true);
      this.view.lblOTPQuestion.setVisibility(false);
      this.view.flxOTP.setVisibility(true);
      this.view.btnResendOTP.setVisibility(true);
      this.view.btnResendOTP.setEnabled(false);
      this.view.btnResendOTP.skin = OLBConstants.SKINS.LOGIN_RESEND_OTP_DISABLED;
      this.view.btnResendOTP.hoverSkin = OLBConstants.SKINS.LOGIN_RESEND_OTP_DISABLED;
      this.view.tbxOTP.text = "";
      FormControllerUtility.disableButton(this.view.btnNext);
      this.view.btnResendOTP.onClick = this.loadEnrollModule().presentationController.resendOTPBB.bind(this);
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
    //   CommonUtilities.setText(this.view.lblResetBySecureCodeQuestion, kony.i18n.getLocalizedString("i18n.enrollNow.enterSAC"), accessibilityConfig);
    //   CommonUtilities.setText(this.view.btnNext, kony.i18n.getLocalizedString("i18n.common.next"), accessibilityConfig);
      this.view.lblResetBySecureCodeQuestion.text = kony.i18n.getLocalizedString("i18n.enrollNow.enterSAC");
      this.view.btnNext.text = kony.i18n.getLocalizedString("i18n.common.next");
      this.view.btnNext.onClick = function() {
        this.loadEnrollModule().presentationController.validateOTPBB(this.view.tbxOTP.text);
      }.bind(this);
      this.view.imgViewOTP.onTouchStart = this.showOTPBB.bind(this);
      this.view.imgCloseSendOTPBB.onTouchEnd = this.showLoginOnCancel.bind(this);
      this.view.tbxOTP.onKeyUp = this.otpCheckBB.bind(this);
      this.enableResendButtonBB();
      this.view.forceLayout();
    },
    /**
     * Method to show after resend otp is succeeded
     */
    showResendOTPBB: function() {
      this.view.btnResendOTP.setEnabled(false);
      this.view.lblWrongOTP.setVisibility(false);
      this.view.tbxOTP.text = "";
      this.view.btnResendOTP.skin = OLBConstants.SKINS.LOGIN_RESEND_OTP_DISABLED;
      this.view.btnResendOTP.hoverSkin = OLBConstants.SKINS.LOGIN_RESEND_OTP_DISABLED;
      this.enableResendButtonBB();
      this.view.forceLayout();
    },
    /**
     * Method to request the otp
     */
    enableResendButtonBB: function() {
      var scopeObj = this;
      var enableResendBtn = function() {
        scopeObj.view.btnResendOTP.setEnabled(true);
        scopeObj.view.btnResendOTP.skin = ViewConstants.SKINS.LOGIN_RESEND_OTP_ENABLED;
        scopeObj.view.btnResendOTP.hoverSkin = ViewConstants.SKINS.LOGIN_RESEND_OTP_ENABLED;
        scopeObj.view.forceLayout();
      };
      kony.timer.schedule("otpTimerBB", enableResendBtn, 2, false); //As per the requirement need timer here. Enable OTP button after 2 sec.
    },
    /**
     * showOTP :This function shows the masked OTP on click of eye icon for a business banking flow
     */
    showOTPBB: function() {
      if (this.view.tbxOTP.secureTextEntry === true) {
        this.view.tbxOTP.secureTextEntry = false;
      }
      else {
        this.view.tbxOTP.secureTextEntry = true;
      }
    },
    /**
     * showCreateUserAndPasswordScreenUsingResetLinkMBB: This function shows create username and password screen
     * @param {Object} viewModel Contains username and password rules
     */
    showCreateUserAndPasswordScreenUsingResetLinkMBB: function(viewModel) {
      this.resetAllFlexes();
      this.setUserNamePolicies(viewModel.rules);
      this.setPasswordPolicies(viewModel.rules);
      this.view.newUsernamepasswordsetting.tbxNewUserName.text = "";
      this.view.newUsernamepasswordsetting.tbxNewPassword.text = "";
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      //CommonUtilities.setText(this.view.newUsernamepasswordsetting.lblResetPasswordTitle, kony.i18n.getLocalizedString("i18n.enrollNow.accountActivation"), accessibilityConfig);
      this.view.newUsernamepasswordsetting.lblResetPasswordTitle.text = kony.i18n.getLocalizedString("i18n.enrollNow.accountActivation");
      this.view.flxUsernameAndPassword.setVisibility(true);
      this.view.newUsernamepasswordsetting.btnCreate.onClick = this.createPasswordForOrganizationEmployee.bind(this, viewModel.identifier);
      this.view.flxCloseUsernamePassowrd.onClick = this.showLoginOnCancel.bind(this);
      this.view.newUsernamepasswordsetting.tbxNewUserName.onBeginEditing = this.showRulesUsername.bind(this);
      this.view.newUsernamepasswordsetting.tbxNewUserName.onKeyUp = this.newUsernameValidation.bind(this);
      this.view.forceLayout();
    },
    /**
     * showCreatePasswordForOrganizationEmployeeFailure: This function shows error screen when error has occured
     * @param {Object} errmsg error message
     */
    showCreatePasswordForOrganizationEmployeeFailure: function(errmsg) {
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      //CommonUtilities.setText(this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch, errmsg, accessibilityConfig);
      this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch.text = errmsg;
      this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch.isVisible = true;
      this.view.newUsernamepasswordsetting.tbxNewPassword.text = "";
      this.view.newUsernamepasswordsetting.tbxMatchPassword.text = "";
      this.view.newUsernamepasswordsetting.imgValidPassword.isVisible = false;
      this.view.newUsernamepasswordsetting.imgPasswordMatched.isVisible = false;
      FormControllerUtility.disableButton(this.view.newUsernamepasswordsetting.btnCreate);
      this.view.forceLayout();
    },
    /**
     * show Save security questions failure screen
     * @param {String} errorMessage - errormessage to be displayed
     */
    showSaveSecurityQuestionsFailureBB: function(errorMessage) {
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      //CommonUtilities.setText(this.view.lblWrongInfo, errorMessage, accessibilityConfig);
      this.view.lblWrongInfo.text = errorMessage;
      this.view.lblWrongInfo.setVisibility(true);
      this.view.forceLayout();
    },
    /**
     * showInvalidPasswordLinkPage: This function shows invalid password link page
     * @param {Object} viewModel contains error message
     */
    showInvalidPasswordLinkPage: function(viewModel) {
      this.resetAllFlexes();
      this.view.flxActivationLinkExpired.setVisibility(true);
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      //CommonUtilities.setText(this.view.lblActivationExpiredLink, viewModel.errorMessage, accessibilityConfig);
      this.view.lblActivationExpiredLink.text = viewModel.errorMessage;
      this.view.rtxActivationLinkExpired.setVisibility(false);
      this.view.forceLayout();
    },
    /**
     * createPasswordForOrganizationEmployee: This function creates password for org employee
     * @param {*} identifier Contains identifier for user
     */
    createPasswordForOrganizationEmployee: function(identifier) {
      var password = this.view.newUsernamepasswordsetting.tbxNewPassword.text;
      var userName = this.view.newUsernamepasswordsetting.tbxNewUserName.text;
      this.loadEnrollModule().presentationController.createPasswordForOrganizationEmployee({
        "identifier": identifier,
        "UserName": userName,
        "Password": password
      });
    },
    /**
     * showCreateUserAndPasswordScreenMBB: This function shows create username and password screen
     * @param {Object} response contains username and password policies
     */
    showCreateUserAndPasswordScreenMBB: function(response) {
      this.resetAllFlexes();
      this.setUserNamePolicies(response);
      this.setPasswordPolicies(response);
      this.view.newUsernamepasswordsetting.tbxNewUserName.text = "";
      this.view.newUsernamepasswordsetting.tbxNewPassword.text = "";
      this.view.newUsernamepasswordsetting.tbxMatchPassword.text = "";
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      //CommonUtilities.setText(this.view.newUsernamepasswordsetting.lblResetPasswordTitle, kony.i18n.getLocalizedString("i18n.enrollNow.enrollBB"), accessibilityConfig);
      this.view.newUsernamepasswordsetting.lblResetPasswordTitle.text = kony.i18n.getLocalizedString("i18n.enrollNow.enrollBB");
      this.view.flxUsernameAndPassword.setVisibility(true);
      this.view.newUsernamepasswordsetting.btnCreate.onClick = this.createUserBB.bind(this);
      this.view.flxCloseUsernamePassowrd.onClick = this.showLoginOnCancel.bind(this);
      this.view.newUsernamepasswordsetting.tbxNewUserName.onBeginEditing = this.showRulesUsername.bind(this);
      this.view.newUsernamepasswordsetting.tbxNewUserName.onKeyUp = this.newUsernameValidation.bind(this);
      this.view.forceLayout();
    },
    /**
     * createUserBB: This function creates business banking user
     */
    createUserBB: function() {
      var password = this.view.newUsernamepasswordsetting.tbxNewPassword.text;
      var userName = this.view.newUsernamepasswordsetting.tbxNewUserName.text;
      this.loadEnrollModule().presentationController.createUserBB(userName, password);
    },
    /**
     * createUserBBFailure: This function shows error screen when error has occured
     * @param {Object} errmsg error message
     */
    createUserBBFailure: function(errmsg) {
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      //CommonUtilities.setText(this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch, errmsg, accessibilityConfig);
      this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch.text = errmsg;
      this.view.newUsernamepasswordsetting.lblPasswordDoesnotMatch.isVisible = true;
      FormControllerUtility.disableButton(this.view.newUsernamepasswordsetting.btnCreate);
      this.view.forceLayout();
    },
    /**
     * showChooseSecuritySettingsScreenMBB: This function shows choose security questions settings screen
     * @param {Object} viewModel contains flag for isEsignAgreementRequired
     */
    showChooseSecuritySettingsScreenMBB: function(viewModel) {
      this.isEsignAgreementRequired = viewModel.isEsignAgreementRequired;
      this.resetAllFlexes();
      this.view.flxUsernameAndPasswordAck.setVisibility(true);
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      //CommonUtilities.setText(this.view.UsenamePasswordSuccess.btnProceed, kony.i18n.getLocalizedString("i18n.enrollNow.proceed"), accessibilityConfig);
      this.view.UsenamePasswordSuccess.btnProceed.text = kony.i18n.getLocalizedString("i18n.enrollNow.proceed");
      this.view.UsenamePasswordSuccess.btnProceed.toolTip = kony.i18n.getLocalizedString("i18n.enrollNow.proceed");
      this.view.UsenamePasswordSuccess.btnLoginLater.setVisibility(false);
      //CommonUtilities.setText(this.view.UsenamePasswordSuccess.lblLoginNextTime, kony.i18n.getLocalizedString("i18n.enrollNow.doItLaterSQ"), accessibilityConfig);
      this.view.UsenamePasswordSuccess.lblLoginNextTime.text = kony.i18n.getLocalizedString("i18n.enrollNow.doItLaterSQ");
      this.view.UsenamePasswordSuccess.orline.imgOr.setVisibility(false);
      //this.view.UsenamePasswordSuccess.btnProceed.onClick = this.loadEnrollModule().presentationController.fetchSecurityQuestionsBB.bind(this);
      this.view.UsenamePasswordSuccess.btnProceed.onClick = this.showEsignAgreementScreenMBB.bind(this);
      this.view.UsenamePasswordSuccess.lblMessage.setVisibility(false);
      this.view.UsenamePasswordSuccess.lblLoginNextTime.onTouchEnd = this.showEsignAgreementScreenMBB.bind(this);
      this.view.forceLayout();
    },
    /**
     * showSecurityQuestionsDetailsScreenMBB: This function shows show Security Questions Details Screen
     * @param {*} data contains data of security questions
     * @param {*} response contains response of service call
     */
    showSecurityQuestionsDetailsScreenMBB: function(data, response) {
      this.resetAllFlexes();
      this.view.flxSecurityQuestionsSelectedUsername.setVisibility(true);
      this.view.flxScrollContainerSetSecurityQuestions.setVisibility(true);
      this.view.btnDoItLaterUsingSecuritySettings.setVisibility(true);
      this.view.lblWrongInfo.setVisibility(false);
      this.view.flxDocumentSiginText.setVisibility(false);
      this.questionWidgets = [this.view.lbxQuestion1, this.view.lbxQuestion2, this.view.lbxQuestion3, this.view.lbxQuestion4, this.view.lbxQuestion5];
      this.answerWidgets = [this.view.tbxAnswer1, this.view.tbxAnswer2, this.view.tbxAnswer3, this.view.tbxAnswer4, this.view.tbxAnswer5];
      this.setSecurityQuestionsBB(data, response);
      this.view.lbxQuestion1.onSelection = this.onQuestionSelectionBB.bind(this, 0);
      this.view.lbxQuestion2.onSelection = this.onQuestionSelectionBB.bind(this, 1);
      this.view.lbxQuestion3.onSelection = this.onQuestionSelectionBB.bind(this, 2);
      this.view.lbxQuestion4.onSelection = this.onQuestionSelectionBB.bind(this, 3);
      this.view.lbxQuestion5.onSelection = this.onQuestionSelectionBB.bind(this, 4);
      this.view.tbxAnswer1.onKeyUp = this.enableProceedForSecurityQuestionsBB.bind(this);
      this.view.tbxAnswer2.onKeyUp = this.enableProceedForSecurityQuestionsBB.bind(this);
      this.view.tbxAnswer3.onKeyUp = this.enableProceedForSecurityQuestionsBB.bind(this);
      this.view.tbxAnswer4.onKeyUp = this.enableProceedForSecurityQuestionsBB.bind(this);
      this.view.tbxAnswer5.onKeyUp = this.enableProceedForSecurityQuestionsBB.bind(this);
      this.view.flxCloseResetSelectedUsername.onClick = this.showEsignAgreementScreenMBB.bind(this);
      this.view.btnDoItLaterUsingSecuritySettings.onClick = this.showEsignAgreementScreenMBB.bind(this);
      this.view.btnProceed.onClick = this.saveSecurityQuestionsBB.bind(this);
      this.view.forceLayout();
    },
    /**
     * getQuestionAndAnswer: This function gets questions and answers
     * @param {Object} listWidget contains listbox data
     * @param {Object} textboxWidget contains textbox data
     * @returns {Object} q contains questions
     */
    getQuestionAndAnswer: function(listWidget, textboxWidget) {
      var q = {};
      q.questionId = this.getQuestionID(listWidget.selectedKeyValue);
      q.customerAnswer = textboxWidget.text;
      return q;
    },
    /**
     * saveSecurityQuestionsBB: This function saves security questions
     */
    saveSecurityQuestionsBB: function() {
      var data = [];
      for (i = 0; i < this.questionWidgets.length; i++) {
        data.push(this.getQuestionAndAnswer(this.questionWidgets[i], this.answerWidgets[i]));
      }
      this.loadEnrollModule().presentationController.saveSecurityQuestionsBB(data);
    },
    /**
     * enableProceedForSecurityQuestionsBB: This function enables Proceed of Security Questions screen
     */
    enableProceedForSecurityQuestionsBB: function() {
      var isValid = true;
      for (var i = 0; i < this.answerWidgets.length; i++) {
        if (!this.answerWidgets[i].text || !this.answerWidgets[i].text.trim()) {
          isValid = false;
          break;
        }
      }
      if (isValid) {
        for (var i = 0; i < this.selectedQuestions.ques.length; i++) {
          if (this.selectedQuestions.ques[i] === 'Select a Question') {
            isValid = false;
            break;
          }
        }
      }
      if (isValid) {
        FormControllerUtility.enableButton(this.view.btnProceed);
      }
      else {
        FormControllerUtility.disableButton(this.view.btnProceed);
      }
    },
    /**
     * onQuestionSelectionBB: This function processes selected question
     * @param {*} position indicates position of the question
     */
    onQuestionSelectionBB: function(position) {
      var selectedQues = {
        ques: "null",
        key: "null"
      };
      selectedQues.ques = this.selectedQuestions.ques[position];
      selectedQues.key = this.selectedQuestions.key[position];
      var value = this.questionWidgets[position].selectedKeyValue;
      var data = this.getQuestionsAfterSelectedBB(value, selectedQues, position);
      for (var i = 0; i < this.questionWidgets.length; i++) {
        if (i != position) {
          var selectedData = this.questionWidgets[i].selectedKeyValue;
          var mainData = this.flagManipulation(data, selectedData);
          this.questionWidgets[i].masterData = mainData;
        }
      }
    },
    /**
     * getQuestionsAfterSelectedBB: This function gets questions after selection
     * @param {*} data contains data of questions
     * @param {*} selectedQues contains selected questions
     * @param {*} key contains position
     * @returns {Object} questions contains selectd questions after processing
     */
    getQuestionsAfterSelectedBB: function(data, selectedQues, key) {
      var temp = 10;
      var check = 10;
      if (data[1] !== "Select a Question") {
        for (var i = 0; i < this.selectedQuestionsTemp.securityQuestions.length; i++) {
          if (this.selectedQuestionsTemp.securityQuestions[i] === data[1]) {
            if (this.selectedQuestionsTemp.flagToManipulate[i] === "false") {
              this.selectedQuestionsTemp.flagToManipulate[i] = "true";
              temp = i;
            }
          }
          if (this.selectedQuestionsTemp.securityQuestions[i] === selectedQues.ques) {
            if (this.selectedQuestionsTemp.flagToManipulate[i] === "true") {
              this.selectedQuestionsTemp.flagToManipulate[i] = "false";
              this.selectedQuestions.key[key] = "lb" + (i + 1);
            }
          }
        }
      }
      else {
        FormControllerUtility.disableButton(this.view.btnProceed);
        this.answerWidgets[key].text = "";
        for (var ij = 0; ij < this.selectedQuestionsTemp.securityQuestions.length; ij++) {
          if (this.selectedQuestionsTemp.securityQuestions[ij] === selectedQues.ques) {
            if (this.selectedQuestionsTemp.flagToManipulate[ij] === "true") {
              this.selectedQuestionsTemp.flagToManipulate[ij] = "false";
              this.selectedQuestions.key[key] = "lb" + (ij + 1);
            }
          }
        }
      }
      if (temp !== check) {
        this.selectedQuestions.ques[key] = this.selectedQuestionsTemp.securityQuestions[temp];
        this.selectedQuestions.key[key] = "lb" + (temp + 1);
      }
      else {
        this.selectedQuestions.ques[key] = "Select a Question";
        this.selectedQuestions.key[key] = "lb0";
      }
      var questions = [];
      questions = this.getQuestions(this.selectedQuestionsTemp);
      return questions;
    },
    /**
     * setSecurityQuestionsBB: This function sets security questions
     * @param {*} data1 contains data of security questions
     * @param {*} response contains service call resposne
     */
    setSecurityQuestionsBB: function(data1, response) {
      this.selectedQuestionsTemp = data1;
      this.responseBackend = response;
      var data = this.getQuestions(data1);
      for (var i = 0; i < this.questionWidgets.length; i++) {
        this.questionWidgets[i].masterData = data;
        this.answerWidgets.text = "";
      }
      FormControllerUtility.disableButton(this.view.btnProceed);
    },
    /**
     * showEsignAgreementScreenMBB: This function shows esign agreement screen
     */
    showEsignAgreementScreenMBB: function() {
      this.resetAllFlexes();
      if (this.isEsignAgreementRequired) {
        this.view.flxSecurityQuestionsSelectedUsername.setVisibility(true);
        this.view.flxCloseResetSelectedUsername.onClick = this.showLoginOnCancel.bind(this);
        this.view.flxScrollContainerSetSecurityQuestions.setVisibility(false);
        this.view.btnDoItLaterUsingSecuritySettings.setVisibility(false);
        this.view.flxDocumentSiginText.setVisibility(true);
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        // CommonUtilities.setText(this.view.lblLetsVerify, kony.i18n.getLocalizedString("i18n.enrollNow.eSignDoc"), accessibilityConfig);
        // CommonUtilities.setText(this.view.btnProceed, kony.i18n.getLocalizedString("i18n.enrollNow.login"), accessibilityConfig);
        this.view.lblLetsVerify.text = kony.i18n.getLocalizedString("i18n.enrollNow.eSignDoc");
        this.view.btnProceed.text = kony.i18n.getLocalizedString("i18n.enrollNow.login");
        this.view.flxPDF.onClick = this.loadEnrollModule().presentationController.downloadESignAgreement.bind(this);
        this.view.btnProceed.onClick = this.showLoginOnCancel.bind(this);
        this.view.forceLayout();
      }
      else {
        this.showLoginOnCancel();
      }
    },
    /**
     * showLoginOnCancel: This function shows login on cancel of button
     */
    showLoginOnCancel: function() {
      var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName":"AuthUIModule","appName":"AuthenticationMA"});
      authModule.presentationController.showLoginScreen();
    },
    /**
     * allFieldsCheckBB: This function validates all fields in enroll screen
     */
    allFieldsCheckBB: function() {
      var SSN = this.view.tbxSSN.text.trim();
      var lastName = this.view.tbxEnterLastName.text.trim();
      var text = this.view.DateInput.getText();
      var date = "";
      if (text.length === 10) {
        date = this.view.DateInput.getDateObject();
      }
      var companyId = this.view.tbxCompanyId.text.trim();
      if (SSN !== "" && lastName !== "" && companyId !== "" && date instanceof Date && !isNaN(date)) {
        FormControllerUtility.enableButton(this.view.btnProceedBB);
      }
      else {
        FormControllerUtility.disableButton(this.view.btnProceedBB);
      }
    },
    /**
     * ssnCheckBB: This function validates SSN
     */
    ssnCheckBB: function() {
      /*
      var input = this.view.tbxSSN.text.trim();
      //var SSNLENGTH = 9;
      var validationUtility = applicationManager.getValidationUtilManager();
      //if (!this.checkSpChars(input) && (input.length < SSNLENGTH && isNaN(input)) || (input.length >= SSNLENGTH && !validationUtility.isValidSSNNumber(input))) {
      if(!validationUtility.isValidSSNNumber(input)){
          this.view.lblWrongInformation.text = kony.i18n.getLocalizedString("i18n.login.incorrectSSN");
          this.view.lblWrongInformation.isVisible = true;
      } else {
          this.view.lblWrongInformation.isVisible = false;
      }
      this.view.forceLayout();
      */
    },
    /**
     * checkSpChars: This function checks special chars in data
     * @param {*} data contains data to check special chars
     * @returns {boolean} false if data constains spec chars, else not
     */
    checkSpChars: function(data) {
      var letters = /^[!@#%$^&*()_+\-=\[\]{};':"\\|,.<>\/? ]*$/;
      for (var i = 0; i < data.length; i++) {
        if (data[i].match(letters)) return false;
      }
      return true;
    },
    /**
     * showOtpValidationFailureBB : method to show the error if a otp validation fails
     */
    showOtpValidationFailureBB: function() {
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      //CommonUtilities.setText(this.view.lblWrongOTP, kony.i18n.getLocalizedString("i18n.login.incorrectOTP"), accessibilityConfig);
      this.view.lblWrongOTP.text = kony.i18n.getLocalizedString("i18n.login.incorrectOTP");
      this.view.lblWrongOTP.isVisible = true;
      this.view.forceLayout();
      FormControllerUtility.disableButton(this.view.btnNext);
    },
    /**
     * otpCheckBB: This function validates OTP
     */
    otpCheckBB: function() {
      var input = this.view.tbxOTP.text.trim();
      var OTP_LENGTH = 6;
      var validationUtility = applicationManager.getValidationUtilManager();
      if (input.length < OTP_LENGTH || !validationUtility.isValidOTP(input)) {
        if (isNaN(input) || input.length >= OTP_LENGTH) {
          var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
         // CommonUtilities.setText(this.view.lblWrongOTP, kony.i18n.getLocalizedString("i18n.login.incorrectOTP"), accessibilityConfig);
          this.view.lblWrongOTP.text = kony.i18n.getLocalizedString("i18n.login.incorrectOTP");
          this.view.lblWrongOTP.isVisible = true;
        }
        FormControllerUtility.disableButton(this.view.btnNext);
      }
      else {
        this.view.lblWrongOTP.isVisible = false;
        FormControllerUtility.enableButton(this.view.btnNext);
      }
      this.view.forceLayout();
    },
    showScreenToEnterSecureCodeMB: function(response) {
      var authManager = applicationManager.getAuthManager();
      var communicationType = authManager.getCommunicationType();
      if (communicationType == OLBConstants.MFA_FLOW_TYPES.DISPLAY_ALL) {
        this.showPhoneEmailScreenMB(response);
      }
      else if (communicationType == OLBConstants.MFA_FLOW_TYPES.DISPLAY_PRIMARY) {
        this.showPrimaryEmailScreenMB(response);
      }
      else if (communicationType == OLBConstants.MFA_FLOW_TYPES.DISPLAY_NO_VALUE) {
        this.showDefaultPhoneEmailScreenMB(response);
      }
    },
    showPrimaryEmailScreenMB: function(response) {
      this.bindUIForPrimaryScreenMB(response);
    },
    bindUIForPrimaryScreenMB: function(response) {
      if (response.MFAAttributes.remainingResendAttempts <= 0) {
        this.view.OTPModule.btnResendOTP.setVisibility(false);
      }
      else {
        this.bindUIForResendButtonMB(response);
        this.view.OTPModule.btnResendOTP.setVisibility(true);
      }
      if (response.MFAAttributes.isOTPExpired === "true") {
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        //CommonUtilities.setText(this.view.OTPModule.lblWrongOTP, kony.i18n.getLocalizedString("i18n.mfa.otpExpired"), accessibilityConfig);
        this.view.OTPModule.lblWrongOTP.text = kony.i18n.getLocalizedString("i18n.mfa.otpExpired");
        this.view.OTPModule.lblWrongOTP.setVisibility(true);
        this.view.OTPModule.tbxCVV.text = "";
        FormControllerUtility.disableButton(this.view.OTPModule.btnLogin);
        FormControllerUtility.hideProgressBar(this.view);
      }
      else {
        this.view.OTPModule.lblWrongOTP.setVisibility(false);
      }
      this.view.flxVerificationBB.setVisibility(false);
      this.view.flxPhoneAndEmail.setVisibility(true);
      this.view.OTPModule.flxEnterSecureAccessCode.setVisibility(true);
      this.view.OTPModule.flxEnterOTP.setVisibility(false);
      FormControllerUtility.disableButton(this.view.OTPModule.btnLogin);
      this.view.OTPModule.tbxCVV.text = "";
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
     // CommonUtilities.setText(this.view.OTPModule.btnLogin, kony.i18n.getLocalizedString("i18n.ProfileManagement.Verify"), accessibilityConfig);
      this.view.OTPModule.btnLogin.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.Verify");
      var phone = response.MFAAttributes.customerCommunication.phone[0].masked;
      var email = response.MFAAttributes.customerCommunication.email[0].masked;
      this.view.OTPModule.rtxEnterCVVCode.text = kony.i18n.getLocalizedString("i18n.mfa.EnterSACMobile") + phone + " & " + email;
      this.view.OTPModule.tbxCVV.onKeyUp = function() {
        this.validatetoEnableContinueButton();
      }.bind(this);
      this.view.OTPModule.tbxCVV.onDone = function() {
        if (!this.view.OTPModule.btnLogin.enable) return;
        FormControllerUtility.showProgressBar(this.view);
        var params = {
          "securityKey": response.MFAAttributes.securityKey,
          "otp": this.view.OTPModule.tbxCVV.text.trim()
        };
        this.verifyOTPMB(params);
      }.bind(this);
      this.view.OTPModule.btnLogin.onClick = function() {
        FormControllerUtility.showProgressBar(this.view);
        var params = {
          "securityKey": response.MFAAttributes.securityKey,
          "otp": this.view.OTPModule.tbxCVV.text.trim()
        };
        this.verifyOTPMB(params);
      }.bind(this);
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
    },
    showDefaultPhoneEmailScreenMB: function(customerCommunicationInfo) {
      this.bindUIForDefaultScreenMB(customerCommunicationInfo);
    },
    bindUIForDefaultScreenMB: function(response) {
      if (response.MFAAttributes.remainingResendAttempts <= 0) {
        this.view.OTPModule.btnResendOTP.setVisibility(false);
      }
      else {
        this.bindUIForResendButtonMB(response);
        this.view.OTPModule.btnResendOTP.setVisibility(true);
      }
      if (response.MFAAttributes.isOTPExpired === "true") {
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        //CommonUtilities.setText(this.view.OTPModule.lblWrongOTP, kony.i18n.getLocalizedString("i18n.mfa.otpExpired"), accessibilityConfig);
        this.view.OTPModule.lblWrongOTP.text =  kony.i18n.getLocalizedString("i18n.mfa.otpExpired");
        this.view.OTPModule.lblWrongOTP.setVisibility(true);
        this.view.OTPModule.tbxCVV.text = "";
        FormControllerUtility.disableButton(this.view.OTPModule.btnLogin);
        FormControllerUtility.hideProgressBar(this.view);
      }
      else {
        this.view.OTPModule.lblWrongOTP.setVisibility(false);
      }
      this.view.flxVerificationBB.setVisibility(false);
      this.view.flxPhoneAndEmail.setVisibility(true);
      this.view.OTPModule.flxEnterOTP.setVisibility(false);
      this.view.OTPModule.flxEnterSecureAccessCode.setVisibility(true);
      this.view.OTPModule.rtxEnterCVVCode.text = kony.i18n.getLocalizedString("i18n.mfa.SACHeader");
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
    //   CommonUtilities.setText(this.view.OTPModule.btnLogin, kony.i18n.getLocalizedString("i18n.ProfileManagement.Verify"), accessibilityConfig);
    //   CommonUtilities.setText(this.view.OTPModule.btnResendOTP, kony.i18n.getLocalizedString("i18n.login.ResendOtp"), accessibilityConfig);
    //   CommonUtilities.setText(this.view.OTPModule.lblRememberMe, kony.i18n.getLocalizedString("i18n.mfaprelogin.registerthisdevice"), accessibilityConfig);
      this.view.OTPModule.btnLogin.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.Verify");
      this.view.OTPModule.btnResendOTP.text = kony.i18n.getLocalizedString("i18n.login.ResendOtp");
      this.view.OTPModule.lblRememberMe.text = kony.i18n.getLocalizedString("i18n.mfaprelogin.registerthisdevice");
      this.view.OTPModule.tbxCVV.text = "";
      FormControllerUtility.disableButton(this.view.OTPModule.btnLogin);
      this.view.OTPModule.tbxCVV.onKeyUp = function() {
        this.validatetoEnableContinueButton();
      }.bind(this);
      this.view.OTPModule.tbxCVV.onDone = function() {
        if (!this.view.OTPModule.btnLogin.enable) return;
        FormControllerUtility.showProgressBar(this.view);
        this.view.OTPModule.rtxEnterCVVCode.text = kony.i18n.getLocalizedString("i18n.mfa.SACHeader");
        var params = {
          "securityKey": response.MFAAttributes.securityKey,
          "otp": this.view.OTPModule.tbxCVV.text.trim()
        };
        this.verifyOTPMB(params);
      }.bind(this);
      this.view.OTPModule.btnLogin.onClick = function() {
        FormControllerUtility.showProgressBar(this.view);
        this.view.OTPModule.rtxEnterCVVCode.text = kony.i18n.getLocalizedString("i18n.mfa.SACHeader");
        var params = {
          "securityKey": response.MFAAttributes.securityKey,
          "otp": this.view.OTPModule.tbxCVV.text.trim()
        };
        this.verifyOTPMB(params);
      }.bind(this);
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
    },
    showSecureAccessCodeScreenAfterResendMB: function(response) {
      var authManager = applicationManager.getAuthManager();
      var communicationType = authManager.getCommunicationType();
      if (communicationType == OLBConstants.MFA_FLOW_TYPES.DISPLAY_ALL) {
        this.showScreentoEnterOTPMB(response);
      }
      else if (communicationType == OLBConstants.MFA_FLOW_TYPES.DISPLAY_PRIMARY) {
        this.showPrimaryEmailScreenMB(response);
      }
      else if (communicationType == OLBConstants.MFA_FLOW_TYPES.DISPLAY_NO_VALUE) {
        this.showDefaultPhoneEmailScreenMB(response);
      }
    },
    showIncorrectOTPErrorMB: function(response) {
      var scopeObj = this;
      if (response.MFAAttributes && response.MFAAttributes.remainingFailedAttempts && response.MFAAttributes.remainingFailedAttempts > 0) {
        this.view.OTPModule.lblWrongOTP.setVisibility(true);
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        //CommonUtilities.setText(this.view.OTPModule.lblWrongOTP, kony.i18n.getLocalizedString("i18n.mfa.invalidAccessCode") + " " + response.MFAAttributes.remainingFailedAttempts + " " + kony.i18n.getLocalizedString("i18n.mfa.remainingAttempts"), accessibilityConfig);
        this.view.OTPModule.lblWrongOTP.text = kony.i18n.getLocalizedString("i18n.mfa.invalidAccessCode") + " " + response.MFAAttributes.remainingFailedAttempts + " " + kony.i18n.getLocalizedString("i18n.mfa.remainingAttempts");
        this.view.flxPhoneAndEmail.setVisibility(true);
        this.view.OTPModule.flxEnterOTP.setVisibility(false);
        this.view.OTPModule.flxEnterSecureAccessCode.setVisibility(true);
        this.view.OTPModule.tbxCVV.text = "";
        FormControllerUtility.disableButton(this.view.OTPModule.btnLogin);
        FormControllerUtility.hideProgressBar(this.view);
        this.view.forceLayout();
      }
      else if (response.MFAAttributes && response.MFAAttributes.remainingFailedAttempts === "0" && response.MFAAttributes.lockUser === "true") {
        FormControllerUtility.showProgressBar(this.view);
        var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
        authModule.presentationController.showLoginScreen({
          "hideProgressBar": true,
          "errorMessage": kony.i18n.getLocalizedString("i18n.mfaenroll.exceededOTP")
        });
      }
      else if (response.MFAAttributes && response.MFAAttributes.remainingFailedAttempts === "0" && response.MFAAttributes.logoutUser === "true") {
        FormControllerUtility.showProgressBar(this.view);
        var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
        authModule.presentationController.showLoginScreen({
          "hideProgressBar": true,
          "errorMessage": kony.i18n.getLocalizedString("i18n.mfaenroll.exceededOTP")
        });
      }
      else {
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        //CommonUtilities.setText(this.view.OTPModule.lblWrongOTP, response.dbpErrMsg, accessibilityConfig);
        this.view.OTPModule.lblWrongOTP.text = response.dbpErrMsg;
        this.view.OTPModule.lblWrongOTP.setVisibility(true);
        this.view.OTPModule.tbxCVV.text = "";
        FormControllerUtility.disableButton(this.view.OTPModule.btnLogin);
        FormControllerUtility.hideProgressBar(this.view);
      }
      this.view.forceLayout();
    },
    bindUIForResendButtonMB: function(response) {
      var scopeObj = this;
      this.view.OTPModule.tbxCVV.text = "";
      FormControllerUtility.disableButton(this.view.OTPModule.btnLogin);
      this.view.OTPModule.btnResendOTP.onClick = function() {
        FormControllerUtility.showProgressBar(scopeObj.view);
        if (response.MFAAttributes.customerCommunication) {
          var params = {
            "phone": response.MFAAttributes.customerCommunication.phone[0].unmasked,
            "email": response.MFAAttributes.customerCommunication.email[0].unmasked,
            "securityKey": response.MFAAttributes.securityKey,
          };
        }
        else {
          var params = {
            "phone": scopeObj.customerPhone,
            "email": scopeObj.customerEmail,
            "securityKey": response.MFAAttributes.securityKey,
          };
        }
        scopeObj.resendOTPMB(params);
      };
    },
    resendOTPMB: function(params) {
      var authManager = applicationManager.getAuthManager();
      var params = {
        "MFAAttributes": {
          "serviceKey": authManager.getServicekey(),
          "OTP": params
        }
      };
      this.loadEnrollModule().presentationController.resendOTPMB(params);
    },
    showScreentoEnterOTPMB: function(response) {
      var scopeObj = this;
      if (response.MFAAttributes.remainingResendAttempts <= 0) {
        this.view.OTPModule.btnResendOTP.setVisibility(false);
      }
      else {
        this.bindUIForResendButtonMB(response);
        this.view.OTPModule.btnResendOTP.setVisibility(true);
      }
      if (response.MFAAttributes.isOTPExpired === "true") {
        this.view.OTPModule.lblWrongOTP.setVisibility(true);
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        //CommonUtilities.setText(this.view.OTPModule.lblWrongOTP, kony.i18n.getLocalizedString("i18n.mfa.otpExpired"), accessibilityConfig);
        this.view.OTPModule.lblWrongOTP.text = kony.i18n.getLocalizedString("i18n.mfa.otpExpired");
        this.view.OTPModule.tbxCVV.text = "";
        FormControllerUtility.disableButton(this.view.OTPModule.btnLogin);
        FormControllerUtility.hideProgressBar(this.view);
      }
      else {
        this.view.OTPModule.lblWrongOTP.setVisibility(false);
      }
      this.view.flxPhoneAndEmail.setVisibility(true);
      this.view.OTPModule.flxEnterOTP.setVisibility(false);
      this.view.OTPModule.tbxCVV.text = "";
      this.view.OTPModule.rtxEnterCVVCode.text = kony.i18n.getLocalizedString("i18n.MFA.EnterSACOnPhone");
      this.view.OTPModule.flxEnterSecureAccessCode.setVisibility(true);
      FormControllerUtility.disableButton(this.view.OTPModule.btnLogin);
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
    //   CommonUtilities.setText(this.view.OTPModule.btnLogin, kony.i18n.getLocalizedString("i18n.ProfileManagement.Verify"), accessibilityConfig);
    //   CommonUtilities.setText(this.view.OTPModule.btnResendOTP, kony.i18n.getLocalizedString("i18n.login.ResendOtp"), accessibilityConfig);
      this.view.OTPModule.btnLogin.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.Verify");
      this.view.OTPModule.btnResendOTP.text =  kony.i18n.getLocalizedString("i18n.login.ResendOtp");
      this.view.OTPModule.tbxCVV.onKeyUp = function() {

        this.validatetoEnableContinueButton();
      }.bind(this);
      this.view.OTPModule.tbxCVV.onDone = function() {
        if (!this.view.OTPModule.btnLogin.enable) return;
        FormControllerUtility.showProgressBar(scopeObj.view);
        var selectedData = {
          "securityKey": response.MFAAttributes.securityKey,
          "otp": this.view.OTPModule.tbxCVV.text.trim()
        };
        this.verifyOTPMB(selectedData);
      }.bind(this);
      this.view.OTPModule.btnLogin.onClick = function() {
        FormControllerUtility.showProgressBar(scopeObj.view);
        var selectedData = {
          "securityKey": response.MFAAttributes.securityKey,
          "otp": this.view.OTPModule.tbxCVV.text.trim()
        };
        this.verifyOTPMB(selectedData);
      }.bind(this);
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
    },
    showPhoneEmailScreenMB: function(response) {
      var scopeObj = this;
      this.view.flxVerificationBB.setVisibility(false);
      FormControllerUtility.showProgressBar(this.view);
      this.bindUIForOTPMFAScreen(response.MFAAttributes.customerCommunication);
      this.view.OTPModule.btnProceed.onClick = function() {
        this.view.flxLoading.height = "100%";
        FormControllerUtility.showProgressBar(scopeObj.view);
        var selectedData = {
          "phone": scopeObj.view.OTPModule.lbxPhone.selectedKeyValue[0],
          "email": scopeObj.view.OTPModule.lbxEmail.selectedKeyValue[0],
        };
        scopeObj.customerPhone = selectedData.phone;
        scopeObj.customerEmail = selectedData.email;
        this.requestOTPUsingPhoneAndEmailMB(selectedData);
      }.bind(this);
      this.view.forceLayout();
    },
    showScreenToEnterSecureCode: function(response) {
      var authManager = applicationManager.getAuthManager();
      var communicationType = authManager.getCommunicationType();
      if (communicationType == OLBConstants.MFA_FLOW_TYPES.DISPLAY_ALL) {
        this.showPhoneEmailScreen(response);
      }
      else if (communicationType == OLBConstants.MFA_FLOW_TYPES.DISPLAY_PRIMARY) {
        this.showPrimaryEmailScreen(response);
      }
      else if (communicationType == OLBConstants.MFA_FLOW_TYPES.DISPLAY_NO_VALUE) {
        this.showDefaultPhoneEmailScreen(response);
      }
    },
    showTnC: function(TnCcontent) {
      if (TnCcontent.alreadySigned) {
        this.view.OTPModule.flxAgree.setVisibility(false);
      }
      else {
        this.view.OTPModule.btnTandC.toolTip = kony.i18n.getLocalizedString("i18n.common.TnC");
        FormControllerUtility.disableButton(this.view.OTPModule.btnLogin);
        this.view.OTPModule.lblFavoriteEmailCheckBox.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
        this.view.OTPModule.flxAgree.setVisibility(true);
        this.view.flxCloseTnC.onClick = this.hideTermsAndConditionPopUp;
        this.view.OTPModule.lblFavoriteEmailCheckBox.onTouchEnd = this.toggleTnC.bind(this, this.view.OTPModule.lblFavoriteEmailCheckBox);
        this.view.flxPhoneAndEmail.setVisibility(true);
        this.view.letsverify.setVisibility(false);
        if (TnCcontent.contentTypeId === OLBConstants.TERMS_AND_CONDITIONS_URL) {
          this.view.OTPModule.btnTandC.onClick = function() {
            window.open(TnCcontent.termsAndConditionsContent);
          }
        }
        else {
          this.view.OTPModule.btnTandC.onClick = this.showTermsAndConditionPopUp;
          this.view.rtxTC.text = TnCcontent.termsAndConditionsContent;
          FormControllerUtility.setHtmlToBrowserWidget(this, this.view.brwBodyTnC, TnCcontent.termsAndConditionsContent);
        }
        this.view.forceLayout();
      }
    },
    showTermsAndConditionPopUp: function() {
      this.view.flxTermsAndConditions.setVisibility(true);
    },
    hideTermsAndConditionPopUp: function() {
      this.view.flxTermsAndConditions.setVisibility(false);
    },
    toggleTnC: function(widget) {
      CommonUtilities.toggleFontCheckbox(widget);
      this.validatetoEnableContinueButton();
    },
    showPrimaryEmailScreen: function(response) {
      this.bindUIForPrimaryScreen(response);
    },
    bindUIForPrimaryScreen: function(response) {
      if (response.MFAAttributes.remainingResendAttempts <= 0) {
        this.view.OTPModule.btnResendOTP.setVisibility(false);
      }
      else {
        this.bindUIForResendButton(response);
        this.view.OTPModule.btnResendOTP.setVisibility(true);
      }
      if (response.MFAAttributes.isOTPExpired === "true") {
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        //CommonUtilities.setText(this.view.OTPModule.lblWrongOTP, kony.i18n.getLocalizedString("i18n.mfa.otpExpired"), accessibilityConfig);
        this.view.OTPModule.lblWrongOTP.text = kony.i18n.getLocalizedString("i18n.mfa.otpExpired");
        this.view.OTPModule.lblWrongOTP.setVisibility(true);
        this.view.OTPModule.tbxCVV.text = "";
        FormControllerUtility.disableButton(this.view.OTPModule.btnLogin);
        FormControllerUtility.hideProgressBar(this.view);
      }
      else {
        this.view.OTPModule.lblWrongOTP.setVisibility(false);
      }
      this.view.flxVerification.setVisibility(false);
      this.view.flxPhoneAndEmail.setVisibility(true);
      this.view.OTPModule.flxEnterSecureAccessCode.setVisibility(true);
      this.view.OTPModule.flxEnterOTP.setVisibility(false);
      FormControllerUtility.disableButton(this.view.OTPModule.btnLogin);
      this.view.OTPModule.tbxCVV.text = "";
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      //CommonUtilities.setText(this.view.OTPModule.btnLogin, kony.i18n.getLocalizedString("i18n.ProfileManagement.Verify"), accessibilityConfig);
      this.view.OTPModule.btnLogin.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.Verify");
      var phone = response.MFAAttributes.customerCommunication.phone[0].masked;
      var email = response.MFAAttributes.customerCommunication.email[0].masked;
      this.view.OTPModule.rtxEnterCVVCode.text = kony.i18n.getLocalizedString("i18n.mfa.EnterSACMobile") + phone + " & " + email;
      // this.view.OTPModule.rtxEnterCVVCode.height = "90px";
      this.view.OTPModule.tbxCVV.onKeyUp = function() {
        this.validatetoEnableContinueButton();
      }.bind(this);
      this.view.OTPModule.tbxCVV.onDone = function() {
        if (!this.view.OTPModule.btnLogin.enable) return;
        FormControllerUtility.showProgressBar(this.view);
        var params = {
          "securityKey": response.MFAAttributes.securityKey,
          "otp": this.view.OTPModule.tbxCVV.text.trim()
        };
        this.verifyOTP(params);
      }.bind(this);
      this.view.OTPModule.btnLogin.onClick = function() {
        FormControllerUtility.showProgressBar(this.view);
        var params = {
          "securityKey": response.MFAAttributes.securityKey,
          "otp": this.view.OTPModule.tbxCVV.text.trim()
        };
        this.verifyOTP(params);
      }.bind(this);
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
    },
    validatetoEnableContinueButton: function() {
      var otp = this.view.OTPModule.tbxCVV.text.trim();
      var widget = this.view.OTPModule.lblFavoriteEmailCheckBox;
      if (widget.text === OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED || otp === "") {
        FormControllerUtility.disableButton(this.view.OTPModule.btnLogin);
      }
      else {
        FormControllerUtility.enableButton(this.view.OTPModule.btnLogin);
      }
    },
    verifyOTP: function(data) {
      var authManager = applicationManager.getAuthManager();
      var params = {
        "MFAAttributes": {
          "serviceKey": authManager.getServicekey(),
          "OTP": data
        }
      };
      this.loadEnrollModule().presentationController.verifyOTPPreLogin(params);
    },
    verifyOTPMB: function(data) {
      var authManager = applicationManager.getAuthManager();
      var params = {
        "MFAAttributes": {
          "serviceKey": authManager.getServicekey(),
          "OTP": data
        }
      };
      this.loadEnrollModule().presentationController.verifyOTPPreLoginMB(params);
    },
    showSecureAccessCodeScreenAfterResend: function(response) {
      var authManager = applicationManager.getAuthManager();
      var communicationType = authManager.getCommunicationType();
      if (communicationType == OLBConstants.MFA_FLOW_TYPES.DISPLAY_ALL) {
        this.showScreentoEnterOTP(response);
      }
      else if (communicationType == OLBConstants.MFA_FLOW_TYPES.DISPLAY_PRIMARY) {
        this.showPrimaryEmailScreen(response);
      }
      else if (communicationType == OLBConstants.MFA_FLOW_TYPES.DISPLAY_NO_VALUE) {
        this.showDefaultPhoneEmailScreen(response);
      }
    },
    showIncorrectOTPError: function(response) {
      var scopeObj = this;
      if (response.MFAAttributes && response.MFAAttributes.remainingFailedAttempts && response.MFAAttributes.remainingFailedAttempts > 0) {
        this.view.OTPModule.lblWrongOTP.setVisibility(true);
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        //CommonUtilities.setText(this.view.OTPModule.lblWrongOTP, kony.i18n.getLocalizedString("i18n.mfa.invalidAccessCode") + " " + response.MFAAttributes.remainingFailedAttempts + " " + kony.i18n.getLocalizedString("i18n.mfa.remainingAttempts"), accessibilityConfig);
        this.view.OTPModule.lblWrongOTP.text = kony.i18n.getLocalizedString("i18n.mfa.invalidAccessCode") + " " + response.MFAAttributes.remainingFailedAttempts + " " + kony.i18n.getLocalizedString("i18n.mfa.remainingAttempts");
        this.view.flxPhoneAndEmail.setVisibility(true);
        this.view.OTPModule.flxEnterOTP.setVisibility(false);
        this.view.OTPModule.flxEnterSecureAccessCode.setVisibility(true);
        this.view.OTPModule.tbxCVV.text = "";
        FormControllerUtility.disableButton(this.view.OTPModule.btnLogin);
        FormControllerUtility.hideProgressBar(this.view);
        this.view.forceLayout();
      }
      else if (response.MFAAttributes && response.MFAAttributes.remainingFailedAttempts === "0" && response.MFAAttributes.lockUser === "true") {
        FormControllerUtility.showProgressBar(this.view);
        var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
        authModule.presentationController.showLoginScreen({
          "hideProgressBar": true,
          "errorMessage": kony.i18n.getLocalizedString("i18n.mfaenroll.exceededOTP")
        });
      }
      else if (response.MFAAttributes && response.MFAAttributes.remainingFailedAttempts === "0" && response.MFAAttributes.logoutUser === "true") {
        FormControllerUtility.showProgressBar(this.view);
        var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
        authModule.presentationController.showLoginScreen({
          "hideProgressBar": true,
          "errorMessage": kony.i18n.getLocalizedString("i18n.mfaenroll.exceededOTP")
        });
      }
      else {
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        //CommonUtilities.setText(this.view.OTPModule.lblWrongOTP, response.dbpErrMsg, accessibilityConfig);
        this.view.OTPModule.lblWrongOTP.text = response.dbpErrMsg;
        this.view.OTPModule.lblWrongOTP.setVisibility(true);
        this.view.OTPModule.tbxCVV.text = "";
        FormControllerUtility.disableButton(this.view.OTPModule.btnLogin);
        FormControllerUtility.hideProgressBar(this.view);
      }
      this.view.forceLayout();
    },
    bindUIForResendButton: function(response) {
      var scopeObj = this;
      this.view.OTPModule.tbxCVV.text = "";
      FormControllerUtility.disableButton(this.view.OTPModule.btnLogin);
      this.view.OTPModule.btnResendOTP.onClick = function() {
        FormControllerUtility.showProgressBar(scopeObj.view);
        if (response.MFAAttributes.customerCommunication) {
          var params = {
            "phone": response.MFAAttributes.customerCommunication.phone[0].unmasked,
            "email": response.MFAAttributes.customerCommunication.email[0].unmasked,
            "securityKey": response.MFAAttributes.securityKey,
          };
        }
        else {
          var params = {
            "phone": scopeObj.customerPhone,
            "email": scopeObj.customerEmail,
            "securityKey": response.MFAAttributes.securityKey,
          };
        }
        scopeObj.resendOTP(params);
      };
    },
    resendOTP: function(params) {
      var authManager = applicationManager.getAuthManager();
      var params = {
        "MFAAttributes": {
          "serviceKey": authManager.getServicekey(),
          "OTP": params
        }
      };
      this.loadEnrollModule().presentationController.resendOTPForResetPassword(params);
    },
    showDefaultPhoneEmailScreen: function(customerCommunicationInfo) {
      this.bindUIForDefaultScreen(customerCommunicationInfo);
    },
    bindUIForDefaultScreen: function(response) {
      if (response.MFAAttributes.remainingResendAttempts <= 0) {
        this.view.OTPModule.btnResendOTP.setVisibility(false);
      }
      else {
        this.bindUIForResendButton(response);
        this.view.OTPModule.btnResendOTP.setVisibility(true);
      }
      if (response.MFAAttributes.isOTPExpired === "true") {
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        //CommonUtilities.setText(this.view.OTPModule.lblWrongOTP, kony.i18n.getLocalizedString("i18n.mfa.otpExpired"), accessibilityConfig);
        this.view.OTPModule.lblWrongOTP.text = kony.i18n.getLocalizedString("i18n.mfa.otpExpired");
        this.view.OTPModule.lblWrongOTP.setVisibility(true);
        this.view.OTPModule.tbxCVV.text = "";
        FormControllerUtility.disableButton(this.view.OTPModule.btnLogin);
        FormControllerUtility.hideProgressBar(this.view);
      }
      else {
        this.view.OTPModule.lblWrongOTP.setVisibility(false);
      }
      this.view.flxVerification.setVisibility(false);
      this.view.flxPhoneAndEmail.setVisibility(true);
      this.view.OTPModule.flxEnterOTP.setVisibility(false);
      this.view.OTPModule.flxEnterSecureAccessCode.setVisibility(true);
      this.view.OTPModule.rtxEnterCVVCode.text = kony.i18n.getLocalizedString("i18n.mfa.SACHeader");
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
    //   CommonUtilities.setText(this.view.OTPModule.btnLogin, kony.i18n.getLocalizedString("i18n.ProfileManagement.Verify"), accessibilityConfig);
    //   CommonUtilities.setText(this.view.OTPModule.btnResendOTP, kony.i18n.getLocalizedString("i18n.login.ResendOtp"), accessibilityConfig);
    //   CommonUtilities.setText(this.view.OTPModule.lblRememberMe, kony.i18n.getLocalizedString("i18n.mfaprelogin.registerthisdevice"), accessibilityConfig);
      this.view.OTPModule.btnLogin.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.Verify");
      this.view.OTPModule.btnResendOTP.text =  kony.i18n.getLocalizedString("i18n.login.ResendOtp");
      this.view.OTPModule.lblRememberMe.text = kony.i18n.getLocalizedString("i18n.mfaprelogin.registerthisdevice");
      this.view.OTPModule.tbxCVV.text = "";
      FormControllerUtility.disableButton(this.view.OTPModule.btnLogin);
      this.view.OTPModule.tbxCVV.onKeyUp = function() {
        this.validatetoEnableContinueButton();
      }.bind(this);
      this.view.OTPModule.tbxCVV.onDone = function() {
        if (!this.view.OTPModule.btnLogin.enable) return;
        FormControllerUtility.showProgressBar(this.view);
        this.view.OTPModule.rtxEnterCVVCode.text = kony.i18n.getLocalizedString("i18n.mfa.SACHeader");
        var params = {
          "securityKey": response.MFAAttributes.securityKey,
          "otp": this.view.OTPModule.tbxCVV.text.trim()
        };
        this.verifyOTP(params);
      }.bind(this);
      this.view.OTPModule.btnLogin.onClick = function() {
        FormControllerUtility.showProgressBar(this.view);
        this.view.OTPModule.rtxEnterCVVCode.text = kony.i18n.getLocalizedString("i18n.mfa.SACHeader");
        var params = {
          "securityKey": response.MFAAttributes.securityKey,
          "otp": this.view.OTPModule.tbxCVV.text.trim()
        };
        this.verifyOTP(params);
      }.bind(this);
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
    },
    showPhoneEmailScreen: function(response) {
      var scopeObj = this;
      this.view.flxVerification.setVisibility(false);
      FormControllerUtility.showProgressBar(this.view);
      this.bindUIForOTPMFAScreen(response.MFAAttributes.customerCommunication);
      this.view.OTPModule.btnProceed.onClick = function() {
        this.view.flxLoading.height = "100%";
        FormControllerUtility.showProgressBar(scopeObj.view);
        var selectedData = {
          "phone": scopeObj.view.OTPModule.lbxPhone.selectedKeyValue[0],
          "email": scopeObj.view.OTPModule.lbxEmail.selectedKeyValue[0],
        };
        scopeObj.customerPhone = selectedData.phone;
        scopeObj.customerEmail = selectedData.email;
        this.requestOTP(selectedData);
      }.bind(this);
      this.view.forceLayout();
    },
    bindUIForOTPMFAScreen: function(customerCommunicationInfo) {
      this.view.flxVerification.setVisibility(false);
      this.view.flxPhoneAndEmail.setVisibility(true);
      this.view.OTPModule.flxEnterSecureAccessCode.setVisibility(false);
      this.view.OTPModule.lblHeaderOTP.setVisibility(false);
      this.view.OTPModule.flxEnterOTP.setVisibility(true);
      this.view.OTPModule.lblWrongOTP.setVisibility(false);
      FormControllerUtility.enableButton(this.view.OTPModule.btnProceed);
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
    //   CommonUtilities.setText(this.view.OTPModule.lblResendMessage, kony.i18n.getLocalizedString("i18n.MFA.headerMessageForOTP"), accessibilityConfig);
    //   CommonUtilities.setText(this.view.OTPModule.btnProceed, kony.i18n.getLocalizedString("i18n.common.proceed"), accessibilityConfig);
      this.view.OTPModule.lblResendMessage.text = kony.i18n.getLocalizedString("i18n.MFA.headerMessageForOTP");
      this.view.OTPModule.btnProceed.text =  kony.i18n.getLocalizedString("i18n.common.proceed");
      if (customerCommunicationInfo.phone && customerCommunicationInfo.email) {
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        //CommonUtilities.setText(this.view.OTPModule.lblResendMessage, kony.i18n.getLocalizedString("i18n.MFA.headerMessageForOTP"), accessibilityConfig);
        this.view.OTPModule.lblResendMessage.text = kony.i18n.getLocalizedString("i18n.MFA.headerMessageForOTP");
        this.view.OTPModule.lbxPhone.masterData = this.setDataForPhoneListBox(customerCommunicationInfo.phone);
        this.view.OTPModule.lbxEmail.masterData = this.setDataForEmailListBox(customerCommunicationInfo.email);
        this.view.OTPModule.lblRegisteredPhone.setVisibility(true);
        this.view.OTPModule.lbxPhone.setVisibility(true);
        this.view.OTPModule.lblRegisteredEmail.setVisibility(true);
        this.view.OTPModule.lbxEmail.setVisibility(true);
        this.view.forceLayout();
      }
      else {
        if (customerCommunicationInfo.phone || customerCommunicationInfo.email) {
          if (customerCommunicationInfo.phone) {
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            //CommonUtilities.setText(this.view.OTPModule.lblResendMessage, kony.i18n.getLocalizedString("i18n.MFA.headerMessageForOTPPhone"), accessibilityConfig);
            this.view.OTPModule.lblResendMessage.text = kony.i18n.getLocalizedString("i18n.MFA.headerMessageForOTPPhone");
            this.view.OTPModule.lbxPhone.masterData = this.setDataForPhoneListBox(customerCommunicationInfo.phone);
            this.view.OTPModule.lblRegisteredPhone.setVisibility(true);
            this.view.OTPModule.lbxPhone.setVisibility(true);
            this.view.OTPModule.lblRegisteredEmail.setVisibility(false);
            this.view.OTPModule.lbxEmail.setVisibility(false);
            this.view.forceLayout();
          }
          else if (customerCommunicationInfo.email) {
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            //CommonUtilities.setText(this.view.OTPModule.lblResendMessage, kony.i18n.getLocalizedString("i18n.MFA.headerMessageForOTPEmail"), accessibilityConfig);
            this.view.OTPModule.lblResendMessage.text = kony.i18n.getLocalizedString("i18n.MFA.headerMessageForOTPEmail");
            this.view.OTPModule.lbxEmail.masterData = this.setDataForEmailListBox(customerCommunicationInfo.email);
            this.view.OTPModule.lblRegisteredPhone.setVisibility(false);
            this.view.OTPModule.lbxPhone.setVisibility(false);
            this.view.OTPModule.lblRegisteredEmail.setVisibility(true);
            this.view.OTPModule.lbxEmail.setVisibility(true);
            this.view.forceLayout();
          }
        }
      }
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
    },
    setDataForPhoneListBox: function(phoneObj) {
      var phoneNumbers = phoneObj.map(function(dataItem) {
        var phoneNumber = [];
        phoneNumber.push(dataItem.unmasked);
        phoneNumber.push(dataItem.masked);
        return phoneNumber;
      });
      return phoneNumbers;
    },
    setDataForEmailListBox: function(emailObj) {
      var emailsIds = emailObj.map(function(dataItem) {
        var email = [];
        email.push(dataItem.unmasked);
        email.push(dataItem.masked);
        return email;
      });
      return emailsIds;
    },
    requestOTP: function(selectedData) {
      var authManager = applicationManager.getAuthManager();
      var params = {
        "MFAAttributes": {
          "serviceKey": authManager.getServicekey(),
          "OTP": selectedData
        }
      };
      this.loadEnrollModule().presentationController.requestOTPUsingPhoneEmail(params);
    },
    requestOTPUsingPhoneAndEmailMB: function(selectedData) {
      var authManager = applicationManager.getAuthManager();
      var params = {
        "MFAAttributes": {
          "serviceKey": authManager.getServicekey(),
          "OTP": selectedData
        }
      };
      this.loadEnrollModule().presentationController.requestOTPUsingPhoneAndEmailMB(params);
    },
    showScreentoEnterOTP: function(response) {
      var scopeObj = this;
      if (response.MFAAttributes.remainingResendAttempts <= 0) {
        this.view.OTPModule.btnResendOTP.setVisibility(false);
      }
      else {
        this.bindUIForResendButton(response);
        this.view.OTPModule.btnResendOTP.setVisibility(true);
      }
      if (response.MFAAttributes.isOTPExpired === "true") {
        this.view.OTPModule.lblWrongOTP.setVisibility(true);
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        //CommonUtilities.setText(this.view.OTPModule.lblWrongOTP, kony.i18n.getLocalizedString("i18n.mfa.otpExpired"), accessibilityConfig);
        this.view.OTPModule.lblWrongOTP.text = kony.i18n.getLocalizedString("i18n.mfa.otpExpired");
        this.view.OTPModule.tbxCVV.text = "";
        FormControllerUtility.disableButton(this.view.OTPModule.btnLogin);
        FormControllerUtility.hideProgressBar(this.view);
      }
      else {
        this.view.OTPModule.lblWrongOTP.setVisibility(false);
      }
      this.view.flxVerification.setVisibility(false);
      this.view.flxPhoneAndEmail.setVisibility(true);
      this.view.OTPModule.flxEnterOTP.setVisibility(false);
      this.view.OTPModule.tbxCVV.text = "";
      this.view.OTPModule.rtxEnterCVVCode.text = kony.i18n.getLocalizedString("i18n.MFA.EnterSACOnPhone");
      this.view.OTPModule.flxEnterSecureAccessCode.setVisibility(true);
      FormControllerUtility.disableButton(this.view.OTPModule.btnLogin);
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
    //   CommonUtilities.setText(this.view.OTPModule.btnLogin, kony.i18n.getLocalizedString("i18n.ProfileManagement.Verify"), accessibilityConfig);
    //   CommonUtilities.setText(this.view.OTPModule.btnResendOTP, kony.i18n.getLocalizedString("i18n.login.ResendOtp"), accessibilityConfig);
      this.view.OTPModule.btnLogin.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.Verify");
      this.view.OTPModule.btnResendOTP.text = kony.i18n.getLocalizedString("i18n.login.ResendOtp");
      this.view.OTPModule.tbxCVV.onKeyUp = function() {
        this.validatetoEnableContinueButton();
      }.bind(this);
      this.view.OTPModule.tbxCVV.onDone = function() {
        if (!this.view.OTPModule.btnLogin.enable) return;
        FormControllerUtility.showProgressBar(scopeObj.view);
        var selectedData = {
          "securityKey": response.MFAAttributes.securityKey,
          "otp": this.view.OTPModule.tbxCVV.text.trim()
        };
        this.verifyOTP(selectedData);
      }.bind(this);
      this.view.OTPModule.btnLogin.onClick = function() {
        FormControllerUtility.showProgressBar(scopeObj.view);
        var selectedData = {
          "securityKey": response.MFAAttributes.securityKey,
          "otp": this.view.OTPModule.tbxCVV.text.trim()
        };
        this.verifyOTP(selectedData);
      }.bind(this);
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
    },
    showRequestOTPError: function(error) {
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
      //CommonUtilities.setText(this.view.OTPModule.lblWrongOTP, kony.i18n.getLocalizedString("i18n.mfa.requestOTPMessageFailed"), accessibilityConfig);
      this.view.OTPModule.lblWrongOTP.text = kony.i18n.getLocalizedString("i18n.mfa.requestOTPMessageFailed");
      this.view.OTPModule.lblWrongOTP.setVisibility(true);
      FormControllerUtility.hideProgressBar(this.view);
      this.view.forceLayout();
    },
  }
});
