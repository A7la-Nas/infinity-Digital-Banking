define(['CommonUtilities', 'CSRAssistUI', 'FormControllerUtility', 'OLBConstants', 'ViewConstants', 'CampaignUtility'], function(CommonUtilities, CSRAssistUI, FormControllerUtility, OLBConstants, ViewConstants) {
  var orientationHandler = new OrientationHandler();
  var responsiveUtils = new ResponsiveUtils();
  return {
    updateFormUI: function(viewModel) {
      if (viewModel !== undefined) {
        if (viewModel.isLoading !== undefined) this.changeProgressBarState(viewModel.isLoading);
      }
      this.view.lblAcknowledgementHeader.setActive(true);
    },
    preShow: function() {
      this.view.flxRight.setVisibility(true);
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain','flxMenuItemMobile']);
      this.view.lblCollapseMobile.text  = "O";
      this.view.customheadernew.activateMenu("Settings","Security Settings");
      this.view.profileMenu.checkLanguage();
      this.view.profileMenu.activateMenu("SECURITYSETTINGS","Security Setting");
      this.setSelectedValue("i18n.ProfileManagement.SecuritySettings");
      this.view.forceLayout();
      this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
      this.view.onKeyPress = this.onKeyPressCallBack;
      this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
      this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
        "a11yARIA": {
          "role": "button",
          "aria-labelledby": "lblAccountSettingsMobile",
          "aria-expanded": false
        }
      }
      this.view.lblHeading.accessibilityConfig = {
        "a11yARIA": {
          "tabindex": -1
        },
        "a11yLabel": "Security Settings Acknowledgement"
      };
    },
    init: function() {
      var self = this;
      applicationManager.getLoggerManager().setCustomMetrics(this, false, "Profile");
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
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
    setSelectedValue: function(text) {
      var self = this;
      CommonUtilities.setText(self.view.lblAccountSettingsMobile, kony.i18n.getLocalizedString(text));
      self.view.lblAccountSettingsMobile.accessibilityConfig = {
        a11yARIA: {
          "tabindex": -1
        }
      };
    },
    
    onBreakpointChange: function(width) {
      FormControllerUtility.setupFormOnTouchEnd(width);
      responsiveUtils.onOrientationChange(this.onBreakpointChange);
      this.view.customheadernew.onBreakpointChangeComponent(width);
      this.view.customfooternew.onBreakpointChangeComponent(width);
      this.view.profileMenu.onBreakpointChangeComponent(width);
      orientationHandler.onOrientationChange(this.onBreakpointChange);
      if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
        CommonUtilities.setText(this.view.customheadernew.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.ProfileManagement.SecuritySettings"));
        this.view.customheadernew.lblHeaderMobile.accessibilityConfig = {
          a11yARIA: {
            "tabindex": -1
          }
        };
        this.view.flxLeft.accessibilityConfig = {
          a11yARIA: {
            "aria-live": "off",
            "tabindex": -1
          }
        };
        this.view.flxRight.accessibilityConfig = {
          a11yARIA: {
            "aria-live": "off",
            "tabindex": -1
          }
        }
      }
      else {
        this.view.flxLeft.accessibilityConfig = {
          a11yARIA: {
            "tabindex": -1
          }
        }
        this.view.flxRight.accessibilityConfig = {
          a11yARIA: {
            "tabindex": -1
          }
        }
      }
      this.view.forceLayout();
    },

    setFlowActions: function() {
      this.view.btnAcknowledgementDone.onClick = function(){
        kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsNewUIModule", "appName" : "ManageProfileMA"}).presentationController.checkSecurityQuestions();
      }
      this.view.btnAcknowledgementDone.accessibilityConfig = {
        a11yLabel:"Updated security questions. Back to security settings"
      }
    },
    /**
       * Method to show error while updating Question and answer at the service side
       */
    showUpdateSecurityQuestionError: function() {
      CommonUtilities.setText(this.view.lblErrorSecuritySettings, kony.i18n.getLocalizedString("i18n.ProfileManagement.updateServerError"));
      this.view.flxErrorEditSecuritySettings.setVisibility(true);
      this.view.forceLayout();
      FormControllerUtility.hideProgressBar(this.view);
    },
    /**
         *  Method to set ui for the component in mobile breakpoint
         */
    toggleMenuMobile: function() {
      if (this.view.lblCollapseMobile.text === "O") {
        this.view.lblCollapseMobile.text = "P";
        this.view.flxLeft.setVisibility(true);
        this.view.flxRight.setVisibility(false);
        this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
          "a11yARIA": {
            "role": "button",
            "aria-labelledby": "lblAccountSettingsMobile",
            "aria-expanded": true
          }
        }
      } else {
        this.view.lblCollapseMobile.text = "O";
        this.view.flxLeft.setVisibility(false);
        this.view.flxRight.setVisibility(true);
        this.view.flxAccountSettingsCollapseMobile.accessibilityConfig = {
          "a11yARIA": {
            "role": "button",
            "aria-labelledby": "lblAccountSettingsMobile",
            "aria-expanded": false
          }
        }
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
      var scope=this;
      applicationManager.getNavigationManager().applyUpdates(this);
      this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
      this.view.forceLayout();
      this.view.customheadernew.btnSkipNav.onClick=function()
      {
        scope.view.lblHeading.setActive(true);
      }
      this.view.lblAcknowledgementHeader.setActive(true);
    },

    onKeyPressCallBack: function (eventObject, eventPayload) {
      var self = this;
      if (eventPayload.keyCode === 27) {
        if (self.view.flxDialogs.isVisible === true) {
          self.view.flxDialogs.isVisible = false;
          self.view.customheadernew.btnLogout.setFocus(true);
        }
        self.view.customheadernew.onKeyPressCallBack(eventObject, eventPayload);
        if (kony.application.getCurrentBreakpoint() === 640) {
          if (self.view.flxLeft.isVisible) {
            self.toggleMenuMobile();
            self.view.flxAccountSettingsCollapseMobile.setActive(true);
          }
        }
      }
    },
  };
});