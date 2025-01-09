define(['CommonUtilities', 'CSRAssistUI','FormControllerUtility', 'OLBConstants', 'ViewConstants', 'CampaignUtility'], function(CommonUtilities, CSRAssistUI, FormControllerUtility, OLBConstants, ViewConstants) {
  var orientationHandler = new OrientationHandler();
  var responsiveUtils = new ResponsiveUtils();
  return {
    updateFormUI: function(viewModel) {
      if (viewModel !== undefined) {
        if (viewModel.usernameAndPasswordLanding) this.showUsernameAndPassword();
        if (viewModel.isLoading !== undefined) this.changeProgressBarState(viewModel.isLoading);     
      }
      this.view.lblUsernameAndPasswordHeading.setActive(true);
    },
    init:function(){
      var self = this;
      applicationManager.getLoggerManager().setCustomMetrics(this, false, "Profile");
      this.view.preShow=this.preShow;
      this.view.postShow=this.postShow;
      this.view.flxAccountSettingsCollapseMobile.onClick = this.toggleMenuMobile;
      this.view.onBreakpointChange = function() {
        self.onBreakpointChange(kony.application.getCurrentBreakpoint());
      };
      this.setFlowActions();
    },
    preShow:function()
    { 
      this.view.flxRight.setVisibility(true);
      this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain','flxMenuItemMobile']);
      this.view.lblCollapseMobile.text  = "O";
      this.view.customheadernew.activateMenu("Settings","Profile Settings");
      this.view.profileMenu.checkLanguage();
      this.view.profileMenu.activateMenu("PROFILESETTINGS","UsernamePassword");
      this.setSelectedValue("i18n.ProfileManagement.Username&Password");
      this.setAccessibility();
      this.view.forceLayout();     
    },
    /**
	* *@param {String} text- text that needs to be appended to the upper text in mobile breakpoint
	*  Method to set the text in mobile breakpoint
	*/
    setSelectedValue: function (text) {
     var self = this;
      CommonUtilities.setText(self.view.lblAccountSettingsMobile, kony.i18n.getLocalizedString(text) , CommonUtilities.getaccessibilityConfig());
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
    /**
	*  Method to set the Accessibility configurations
	*/
    setAccessibility: function(){
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
     // this.view.btnPasswordEdit.toolTip = kony.i18n.getLocalizedString("i18n.billPay.Edit");
      CommonUtilities.setText(this.view.customheadernew.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.ProfileManagement.profilesettings"), accessibilityConfig);
      // this.view.customheadernew.lblAccounts.toolTip=kony.i18n.getLocalizedString("i18n.topmenu.accounts");
      //CommonUtilities.setText(this.view.lblUsernameAndPasswordHeading, kony.i18n.getLocalizedString("i18n.ProfileManagement.Username&Password"), accessibilityConfig);
      //CommonUtilities.setText(this.view.lblUsernameKey, kony.i18n.getLocalizedString("i18n.transfers.username"), accessibilityConfig);
      //CommonUtilities.setText(this.view.lblPasswordKey, kony.i18n.getLocalizedString("i18n.transfers.password"), accessibilityConfig);
      //CommonUtilities.setText(this.view.btnPasswordEdit, kony.i18n.getLocalizedString("i18n.billPay.Edit"), accessibilityConfig);
    //  CommonUtilities.setText(this.view.lblHeading, kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson"), accessibilityConfig);
      /*this.view.lblUsernameAndPasswordHeading.accessibilityConfig = {
        "a11yLabel": ""
      };
      this.view.lblUsernameKey.accessibilityConfig = {
        "a11yLabel": ""
      };
      this.view.lblPasswordKey.accessibilityConfig = {
        "a11yLabel": ""
      };*/
      this.view.lblHeading.accessibilityConfig = {
        "a11yARIA": {
          "tabindex": -1
        },
        "a11yLabel": this.view.lblUsernameAndPasswordHeading.text + " " + kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson")
      };
      this.view.btnPasswordEdit.accessibilityConfig = {
        "a11yLabel": kony.i18n.getLocalizedString("i18n.ProfileManagement.EditPassword")
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
    showUsernameAndPassword: function() {
      var userPreferencesManager = applicationManager.getUserPreferencesManager();
      if(kony.mvc.MDAApplication.getSharedInstance().appContext.userName){
        CommonUtilities.setText(this.view.lblUsernameValue, kony.mvc.MDAApplication.getSharedInstance().appContext.userName , CommonUtilities.getaccessibilityConfig());
      }else{
        CommonUtilities.setText(this.view.lblUsernameValue, userPreferencesManager.getCurrentUserName() , CommonUtilities.getaccessibilityConfig());
      }
      this.changeProgressBarState(false);
    },
    setFlowActions:function(){
      var scopeObj=this;
      if(applicationManager.getConfigurationManager().checkUserPermission("PROFILE_SETTINGS_UPDATE"))
      {
        this.view.btnPasswordEdit.setVisibility(true);
        this.view.btnPasswordEdit.onClick = function() {
          FormControllerUtility.showProgressBar(scopeObj.view);
          if(CommonUtilities.getSCAType() == 0)
          kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsNewUIModule", "appName" : "ManageProfileMA"}).presentationController.getPasswordRulesAndPolicies();
          else
          applicationManager.getNavigationManager().navigateTo("frmEditPasswordHID");
          
        }; 
      } else {
        this.view.btnPasswordEdit.setVisibility(false);
      }
    },
    onKeyPressCallBack: function(eventObject, eventPayload) {
            var self = this;
            if (eventPayload.keyCode === 27) {
                if (self.view.flxDialogs.isVisible === true &&  self.view.flxLogout.isVisible === true) {
                    self.view.flxDialogs.setVisibility(false);
                    self.view.flxLogout.setVisibility(false);
                    self.view.customheadernew.btnLogout.setFocus(true);
                }
            }
        },
    postShow: function() { 
      this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
      applicationManager.getNavigationManager().applyUpdates(this);
      this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight -this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp"; 
      var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
     // CommonUtilities.setText(this.view.lblHeading, kony.i18n.getLocalizedString("i18n.ProfileManagement.Settingscapson"), accessibilityConfig);
      CommonUtilities.setText(this.view.lblPasswordKey, kony.i18n.getLocalizedString("i18n.transfers.password"), accessibilityConfig);     
      this.view.forceLayout();     
      this.view.lblUsernameAndPasswordHeading.setActive(true); 
    },
  };
});