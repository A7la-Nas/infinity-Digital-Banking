define(['CommonUtilities', 'CSRAssistUI','FormControllerUtility', 'OLBConstants', 'ViewConstants', 'CampaignUtility'], function(CommonUtilities, CSRAssistUI, FormControllerUtility, OLBConstants, ViewConstants) {
  var orientationHandler = new OrientationHandler();
  var responsiveUtils = new ResponsiveUtils();
  return {
    updateFormUI: function(viewModel) {
      if (viewModel !== undefined) {
        if(viewModel.updateSecurityQuestionError)this.showSecurityQuestionsError(viewModel);
        if (viewModel.SecurityQuestionExists) this.showSecurityQuestions(viewModel.SecurityQuestionExists);
        if (viewModel.isLoading !== undefined) this.changeProgressBarState(viewModel.isLoading);   
      }
      this.view.lblSecuritySettingsHeader.setActive(true);
    },
    preShow:function()
    {
      this.view.flxRight.setVisibility(true);
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain','flxMenuItemMobile']);
      this.view.lblCollapseMobile.text  = "O";
      this.view.customheadernew.activateMenu("Settings","Security Settings");
      this.view.profileMenu.checkLanguage();
      this.view.profileMenu.activateMenu("SECURITYSETTINGS","Security Setting");
      this.setSelectedValue("i18n.ProfileManagement.SecuritySettings");
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
    /**
	* *@param {String} text- text that needs to be appended to the upper text in mobile breakpoint
	*  Method to set the text in mobile breakpoint
	*/
    setSelectedValue: function (text) {
      var self = this;
      self.view.lblAccountSettingsMobile.text = kony.i18n.getLocalizedString(text);
    },
    /**
       * Method to show error while requestind OTP
       */
    showRequestOtpError: function() {
      //warning flex not there
      this.view.forceLayout();
      FormControllerUtility.hideProgressBar(this.view);
    },
    showSecurityQuestionsError:function(viewModel){
      this.view.lblErrorSecuritySettings.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.updateServerError");
      this.view.flxErrorEditSecuritySettings.setVisibility(true);
      this.view.forceLayout();
      FormControllerUtility.hideProgressBar(this.view);      
    },
    /**
       * Method to show error while verifying OTP
       */
    showVerifyOtpServerError: function() {
      this.view.flxErrorSecuritySettingsVerification.setVisibility(true);
      this.view.lblErrorSecuritySettingsVerification.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.updateServerError");
      this.view.forceLayout();
    },
    /**
	*  Method to set the Accessibility configurations
	*/
    setAccessibility: function(){
      this.view.btnSecuritySettingsProceed.text = kony.i18n.getLocalizedString("i18n.enrollNow.proceed");
      this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.SecuritySettings");
      this.view.lblRulesreset.text = kony.i18n.getLocalizedString("i18n.StopPayment.PleaseNote");
      this.view.lblSecurityRuleReset1.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.SecurityQuestionPoint1");
      this.view.lblSecurityRuleReset2.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.SecurityQuestionPoint2");
      this.view.lblSecurityRuleReset3.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.SecurityQuestionPoint3");
      //CommonUtilities.setText(this.view.btnSecuritySettingsProceed, kony.i18n.getLocalizedString("i18n.enrollNow.proceed"), accessibilityConfig);
      this.view.lblSecuritySettingsHeader.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.SecuritySettings");   
      this.view.lblHeading.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson");
      this.view.lblHeading.accessibilityConfig = {
        "a11yARIA": {
          "tabindex": -1
        },
        "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.SecuritySettings")
      };
      this.view.btnSecuritySettingsProceed.accessibilityConfig = {
        "a11yLabel" : "Proceed to Edit Security Settings"
      }
    }, 
    onBreakpointChange: function (width) {
      FormControllerUtility.setupFormOnTouchEnd(width);
      responsiveUtils.onOrientationChange(this.onBreakpointChange);
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);
      this.view.profileMenu.onBreakpointChangeComponent(width);
      orientationHandler.onOrientationChange(this.onBreakpointChange);
      if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
        this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.SecuritySettings");
      }
      this.view.forceLayout();      
    },

    setFlowActions:function(){
      var scopeObj=this;
      this.view.btnSecuritySettingsProceed.onClick=function(){
        var selectedQuestionsTemp =  {
          securityQuestions: [],
          flagToManipulate: []
        };
        kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsNewUIModule", "appName" : "ManageProfileMA"}).presentationController.fetchSecurityQuestions(selectedQuestionsTemp);
      }
    },
    /**
	*  Method to set ui for the component in mobile breakpoint
	*/
    toggleMenuMobile: function () {
      if (this.view.lblCollapseMobile.text === "O") {
        this.view.lblCollapseMobile.text = "P";
        this.view.flxLeft.setVisibility(true);
        this.view.flxRight.setVisibility(false);
        this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
          a11yARIA: {
            "tabindex": 0,
            "role": "button",
            "aria-labelledby": "lblAccountSettingsMobile",
            "aria-expanded": true
          }
        };
      } else {
        this.view.lblCollapseMobile.text  = "O";
        this.view.flxLeft.setVisibility(false);
        this.view.flxRight.setVisibility(true);
        this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
          a11yARIA: {
            "tabindex": 0,
            "role": "button",
            "aria-labelledby": "lblAccountSettingsMobile",
            "aria-expanded": false
          }
        };
      }
    }, 
    /**
       * Method to show all the security questions screen after fetching from backend
       * @param {Object} viewModel- None
       */

    showSecurityQuestions: function(viewModel) {

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
      this.view.lblHeading.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson");
      this.view.forceLayout();  
      this.setAccessibility();
      this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex; 
      this.view.CustomPopup.onKeyPress = this.popUpDismiss;   
      this.view.lblSecuritySettingsHeader.setActive(true);
    },
    popUpDismiss: function (eventObject, eventPayload) {
      if (eventPayload.keyCode === 27) {
        if (this.view.flxDialogs.isVisible === true) {
          this.view.flxDialogs.setVisibility(false);
          this.view.flxLogout.setVisibility(false);
        }
        this.view.customheadernew.onKeyPressCallBack(eventObject, eventPayload);
      }
    },
  };
});