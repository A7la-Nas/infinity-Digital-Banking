define(['CommonUtilities', 'CSRAssistUI','FormControllerUtility', 'OLBConstants', 'ViewConstants', 'CampaignUtility'], function(CommonUtilities, CSRAssistUI, FormControllerUtility, OLBConstants, ViewConstants) {
  var orientationHandler = new OrientationHandler();
  var responsiveUtils = new ResponsiveUtils();
  return {
    updateFormUI: function(viewModel) {
      if (viewModel !== undefined) {
        if (viewModel.showRegisteredDevices) this.showRegisteredDevices();
        if (viewModel.isLoading !== undefined) this.changeProgressBarState(viewModel.isLoading);   
      }
    },

  init:function(){
      var self=this;
      this.view.preShow=this.preShow;
      this.view.postShow=this.postShow;
      this.view.flxAccountSettingsCollapseMobile.onClick = this.toggleMenuMobile;
      this.setFlowActions();
      applicationManager.getLoggerManager().setCustomMetrics(this, false, "Profile");
      this.view.onBreakpointChange = function() {
        self.onBreakpointChange(kony.application.getCurrentBreakpoint());
      };
    },
    
    setSelectedValue: function (text) {
      var self = this;
      CommonUtilities.setText(self.view.lblAccountSettingsMobile, kony.i18n.getLocalizedString(text) , CommonUtilities.getaccessibilityConfig());
    },

    toggleMenuMobile: function() {
      if (this.view.lblCollapseMobile.text === "O") {
        this.view.lblCollapseMobile.text = "P";
        this.view.flxLeft.setVisibility(true);
        this.view.flxRight.setVisibility(false);
      } else {
        this.view.lblCollapseMobile.text = "O";
        this.view.flxLeft.setVisibility(false);
        this.view.flxRight.setVisibility(true);
      }
    },

     preShow:function()
    {
      this.view.flxRight.setVisibility(true);
      let currform = kony.application.getCurrentForm();
      currform.flxTopMsg.setVisibility(false);
      currform.flxTopMsg.height = "110dp";
      this.changeProgressBarState(true);
      FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain','flxMenuItemMobile']);
      this.view.lblCollapseMobile.text  = "O";
      this.view.customheadernew.activateMenu("Settings","Device Management");
      this.view.profileMenu.checkLanguage();
      this.view.profileMenu.activateMenu("DEVICEMANAGEMENT","Device");
      this.setSelectedValue("i18n.ProfileManagement.DeviceManagement");
      this.setAccessibility();
    },

    postShow: function() {
      this.changeProgressBarState(false);
      applicationManager.getNavigationManager().applyUpdates(this);
      this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
      this.view.forceLayout();
    },

     setFlowActions:function(){
       let presentationUtility = applicationManager.getPresentationUtility();
       if (presentationUtility.MFA && presentationUtility.MFA.isSCAEnabled && presentationUtility.MFA.isSCAEnabled()) {
        	this.addRegisteredDevicesComponent();
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
         var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
         CommonUtilities.setText(this.view.customheadernew.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.ProfileManagement.DeviceManagement"), accessibilityConfig);
      }
      this.view.forceLayout();    
    },

    changeProgressBarState: function(isLoading) {
      if (isLoading) {
        FormControllerUtility.showProgressBar(this.view);
      } else {
        FormControllerUtility.hideProgressBar(this.view);
      }
    },

    setAccessibility: function() {
     },
    
    addRegisteredDevicesComponent: function () {
      let self = this;

      let currform = kony.application.getCurrentForm();

      var deviceRegistration = new com.temenos.infinity.sca.deviceRegistration({
        "autogrowMode": kony.flex.AUTOGROW_NONE,
        "id": "deviceRegistration",
        "appName" : "ResourcesHIDMA",
        "isVisible": false,
        "left": "0dp",
        "masterType": constants.MASTER_TYPE_USERWIDGET,
        "isModalContainer": false,
        "skin": "slFbox",
        "top": "0dp",
        "width": "100%",
        "height": "100%",
        "zIndex": 1,
        "overrides": {
          "deviceRegistration": {
            "height": "viz.val_cleared",
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
      deviceRegistration.objSeviceName = "SCAActivationObjects";
      deviceRegistration.objSeviceName1 = "SCAActivationObjects";
      deviceRegistration.objSeviceName2 = "SCAActivationObjects";
      deviceRegistration.objSeviceName4 = "SCAObjects";
      deviceRegistration.objSeviceName3 = "SCAActivationObjects";
      deviceRegistration.flxMainContainerSkn = "sknFFFFFFscroll";
      deviceRegistration.btnRegisterNewDeviceSkn = "sknBtnSSP0273e313Px";
      deviceRegistration.fontIconMsgTypeErrSkn = "sknFontIconCrossEE000550px";
      deviceRegistration.lblMsgHeaderSkn = "sknSSP42424224Px";
      deviceRegistration.popupBgSkn = "sknFlx000000Opacity40";
      deviceRegistration.btnYesSkn = "sknBtnNormalSSPFFFFFF15Px";
      deviceRegistration.lblClosePopupSkn = "sknOLBFonts003e7520px";
      deviceRegistration.lblRegisterDevicePopupHeaderSkn = "sknSSPRegular42424215Px";
      deviceRegistration.imgInfoSrc = "info_grey.png";
      deviceRegistration.fontIconLastStatusSuspendTxt = "K";
      deviceRegistration.lblClosePopupTxt = "g";
      deviceRegistration.btnRegisterNewDeviceTxt = "i18n.DeviceRegistration.RegisterNewDevice";
      deviceRegistration.btnYesTxt = "Yes";
      deviceRegistration.lblMsgHeaderTxtActivationCodeCreated = "i18n.DeviceRegistration.MsgActivationCodeCreated";
      deviceRegistration.lblRegisterDevicePopupHeaderTxtRegisterNewDevice = "i18n.DeviceRegistration.RegisterNewDevice";
      deviceRegistration.operationName = "getMyDevices";
      deviceRegistration.operationName1 = "updateMyDeviceStatus";
      deviceRegistration.operationName2 = "revokeMyDevice";
      deviceRegistration.operationName4 = "fetch";
      deviceRegistration.operationName3 = "registerNewDevice";
      deviceRegistration.flxTopMsgInnerSkn = "sknrounded";
      deviceRegistration.fontIconMsgTypeSuccessSkn = "sknFontIconActive04A61550px";
      deviceRegistration.lblMsgSkn = "sknSSP72727215Px";
      deviceRegistration.flxRegisterDevicePopupSkn = "bbSknFlxffffffWithShadow";
      deviceRegistration.btnNoSkn = "sknBtn003E75Border";
      deviceRegistration.lblRegisterDevicePopupBodySkn = "sknlblSSPreg42424220px";
      deviceRegistration.lblCloseMsgTxt = "g";
      deviceRegistration.btnNoTxt = "No";
      deviceRegistration.lblMsgTxtReceivePushNotifications = "i18n.DeviceRegistration.MsgReceivePushNotifications";
      deviceRegistration.imgLoadingSrc = "rb_4_0_ad_loading_indicator.gif";
      deviceRegistration.lblPopupInfoTxtNotReceivePushNotificationsSuspend = "i18n.DeviceRegistration.WarningMsgNotReceivePushNotificationsSuspend";
      deviceRegistration.objName = "Device";
      deviceRegistration.objName1 = "Device";
      deviceRegistration.objName2 = "Device";
      deviceRegistration.objName4 = "AuthStatus";
      deviceRegistration.objName3 = "Device";
      deviceRegistration.flxRegisterDevicesHeaderSkn = "sknFFFFFFnoBor";
      deviceRegistration.lblCloseMsgSkn = "sknOLBFonts003e7520px";
      deviceRegistration.lblRegisterDeviceHeaderSkn = "sknLblSSP42424215px";
      deviceRegistration.flxPopupHeaderSeparatorSkn = "sknFlxd3d3d3op60";
      deviceRegistration.lblPopupInfoSkn = "sknSSP72727215Px";
      deviceRegistration.fontIconLastStatusActiveTxt = "N";
      deviceRegistration.lblMsgTxtNotReceivePushNotifications = "i18n.DeviceRegistration.MsgnNotReceivePushNotifications";
      deviceRegistration.lblPopupInfoTxtNotReceivePushNotificationsRemove = "i18n.DeviceRegistration.WarningMsgNotReceivePushNotificationsRemove";
      deviceRegistration.flxRegisterDeviceHeaderSeperatorSkn = "sknFlxd3d3d3op60";
      deviceRegistration.fontIconDeviceSkn = "sknOlbFonts0273e3";
      deviceRegistration.lblDeviceNameSkn = "sknSSPRegular42424215Px";
      deviceRegistration.fontIconMsgTypeErrTxt = "l";
      deviceRegistration.lblMsgTxtActivationCodeSent = "i18n.DeviceRegistration.MsgActivationCodeSent";
      deviceRegistration.popupLoadingBgSkn = "sknflx000000op50";
      deviceRegistration.ldlPopupTextSkn = "sknlbl424242SSPReg17px";
      deviceRegistration.lblPopupInfoTxtNotReceivePushNotificationsSuspendOnlyDevice = "i18n.DeviceRegistration.WarningMsgNotReceivePushNotificationsSuspendOnlyDevice";
      deviceRegistration.flxDevicesSkn = "sknFlxBgFFFFFFBorderE3E3E3Radius4Px";
      deviceRegistration.fontIconLastStatusActiveSkn = "sknFontIconActive04A61524px";
      deviceRegistration.lblRegisteredOnSkn = "sknLblSSP72727215px";
      deviceRegistration.fontIconMsgTypeSuccessTxt = "N";
      deviceRegistration.lblMsgTxtRequestDeniedErr = "i18n.DeviceRegistration.ErrMsgApprovalDenied";
      deviceRegistration.flxPopupLoadingSkn = "sknflxffffffRadius5px";
      deviceRegistration.lblPopupInfoTxtNotReceivePushNotificationsRemoveOnlyDevice = "i18n.DeviceRegistration.WarningMsgNotReceivePushNotificationsRemoveOnlyDevice";
      deviceRegistration.flxSeparatorSegmentSkn = "sknFlxd3d3d3op60";
      deviceRegistration.fontIconLastStatusSuspendSkn = "sknFontIconSuspendFFA50024px";
      deviceRegistration.lblLastStatusSkn = "sknSSPRegular42424215Px";
      deviceRegistration.fontIconDeviceTxt = "(";
      deviceRegistration.lblMsgTxtRequestTimedOutErr = "i18n.DeviceRegistration.ErrMsgApprovalTimedOut";
      deviceRegistration.ldlPopupTextTxt = "i18n.DeviceRegistration.MsgApproveRequestNotificationSent";
      deviceRegistration.lblSuspendDeviceSkn = "sknSSP4176a415px";
      deviceRegistration.lblRegisterDeviceHeaderTxt = "i18n.DeviceRegistration.RegisterDevices";
      deviceRegistration.lblRemoveDeviceSkn = "sknSSP4176a415px";
      deviceRegistration.lblRegisteredOnTxt = "i18n.DeviceRegistration.RegisteredOn";
      deviceRegistration.lblNoRecordsSkn = "sknLblSSP72727215px";
      deviceRegistration.lblLastStatusActiveTxt = "i18n.DeviceRegistration.Active";
      deviceRegistration.lblLastStatusSuspendTxt = "i18n.DeviceRegistration.DeviceSuspended";
      deviceRegistration.lblSuspendDeviceSuspendTxt = "i18n.DeviceRegistration.SuspendDevice";
      deviceRegistration.lblSuspendDeviceUnsuspendTxt = "i18n.DeviceRegistration.UnsuspendDevice";
      deviceRegistration.lblRemoveDeviceTxt = "i18n.DeviceRegistration.RemoveDevice";
      deviceRegistration.lblNoRecordsTxt = "No devices found.";
      deviceRegistration.updateFormUI = this.updateFormUI;
      if (currform.flxRegisteredDevice) {
        currform.flxRegisteredDevice.add(deviceRegistration);
        currform.flxRegisteredDevice.setVisibility(true);
        currform.flxRegisteredDevice.deviceRegistration.setVisibility(true);
      }
      currform.forceLayout();
    },
    
    showRegisteredDevices: function () {
      let currform = kony.application.getCurrentForm();
      currform.flxRegisteredDevice.deviceRegistration.fetchDevices();
    },


  };
});