define(['CommonUtilities', 'CSRAssistUI', 'FormControllerUtility', 'OLBConstants', 'ViewConstants', 'CampaignUtility'], function (CommonUtilities, CSRAssistUI, FormControllerUtility, OLBConstants, ViewConstants) {
  var orientationHandler = new OrientationHandler();
  var responsiveUtils = new ResponsiveUtils();
  let currform;
  var deviceRegistrationVar;
  return {
    updateFormUI: function (viewModel) {
      var scope = this;
      try {
        if (viewModel !== undefined) {
          if (viewModel.showRegisteredDevices) scope.showRegisteredDevices();
        }
      } catch (err) {
        var errorObj = {
          "method": "updateFormUI",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    init: function () {
      var scope = this;
      try {
        currform = kony.application.getCurrentForm();
        scope.view.preShow = scope.preShow;
        scope.view.postShow = scope.postShow;
        scope.view.flxAccountSettingsCollapseMobile.onClick = scope.toggleMenuMobile;
        scope.setFlowActions();
        applicationManager.getLoggerManager().setCustomMetrics(this, false, "Profile");
        scope.view.onBreakpointChange = function () {
          scope.onBreakpointChange(kony.application.getCurrentBreakpoint());
        };
      } catch (err) {
        var errorObj = {
          "method": "init",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    setSelectedValue: function (text) {
      var scope = this;
      try {
        CommonUtilities.setText(scope.view.lblAccountSettingsMobile, kony.i18n.getLocalizedString(text), CommonUtilities.getaccessibilityConfig());
      } catch (err) {
        var errorObj = {
          "method": "setSelectedValue",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    toggleMenuMobile: function () {
      var scope = this;
      try {
        if (scope.view.lblCollapseMobile.text === "O") {
          scope.view.lblCollapseMobile.text = "P";
          scope.view.flxLeft.setVisibility(true);
          scope.view.flxRight.setVisibility(false);
        } else {
          scope.view.lblCollapseMobile.text = "O";
          scope.view.flxLeft.setVisibility(false);
          scope.view.flxRight.setVisibility(true);
        }
      } catch (err) {
        var errorObj = {
          "method": "toggleMenuMobile",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    preShow: function () {
      var scope = this;
      try {
        scope.view.flxRight.setVisibility(true);
        currform.flxTopMsg.setVisibility(false);
        currform.flxTopMsg.height = "110dp";
        scope.changeProgressBarState(true);
        FormControllerUtility.updateWidgetsHeightInInfo(scope.view, ['flxHeader', 'flxFooter', 'flxMain', 'flxMenuItemMobile']);
        scope.view.lblCollapseMobile.text = "O";
        scope.view.customheadernew.activateMenu("Settings", "Device Management");
        scope.view.profileMenu.checkLanguage();
        scope.view.profileMenu.activateMenu("DEVICEMANAGEMENT", "Device");
        scope.setSelectedValue("i18n.ProfileManagement.DeviceManagement");
        scope.setAccessibility();
      } catch (err) {
        var errorObj = {
          "method": "preShow",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    postShow: function () {
      var scope = this;
      try {
        applicationManager.getNavigationManager().applyUpdates(this);
        scope.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - scope.view.flxHeader.info.frame.height - scope.view.flxFooter.info.frame.height + "dp";
        scope.view.forceLayout();
      } catch (err) {
        var errorObj = {
          "method": "postShow",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    setFlowActions: function () {
      var scope = this;
      try {
        let presentationUtility = applicationManager.getPresentationUtility();
        if (presentationUtility.MFA && presentationUtility.MFA.isSCAEnabled && presentationUtility.MFA.isSCAEnabled()) {
          scope.addRegisteredDevicesComponent();
        }
      } catch (err) {
        var errorObj = {
          "method": "setFlowActions",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    onBreakpointChange: function (width) {
      var scope = this;
      try {
        FormControllerUtility.setupFormOnTouchEnd(width);
        responsiveUtils.onOrientationChange(scope.onBreakpointChange);
        scope.view.customheadernew.onBreakpointChangeComponent(width);
        scope.view.customfooternew.onBreakpointChangeComponent(width);
        scope.view.profileMenu.onBreakpointChangeComponent(width);
        orientationHandler.onOrientationChange(scope.onBreakpointChange);
        if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
          var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
          CommonUtilities.setText(scope.view.customheadernew.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.ProfileManagement.DeviceManagement"), accessibilityConfig);
        }
        scope.view.forceLayout();
      } catch (err) {
        var errorObj = {
          "method": "onBreakpointChange",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    changeProgressBarState: function (isLoading) {
      var scope = this;
      try {
        if (isLoading) {
          FormControllerUtility.showProgressBar(scope.view);
        } else {
          FormControllerUtility.hideProgressBar(scope.view);
        }
      } catch (err) {
        var errorObj = {
          "method": "changeProgressBarState",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    setAccessibility: function () {
    },

    addRegisteredDevicesComponent: function () {
      var scope = this;
      try {
        deviceRegistrationVar = new com.temenos.infinity.sca.Unike.deviceRegistration({
          "autogrowMode": kony.flex.AUTOGROW_NONE,
          "appName": "ResourcesUnikenMA",
          "id": "deviceRegistration",
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
        deviceRegistrationVar.objSeviceName = "SCAUniken";
        deviceRegistrationVar.objSeviceName1 = "SCAUniken";
        deviceRegistrationVar.objSeviceName2 = "SCAUniken";
        deviceRegistrationVar.objSeviceName4 = "SCAUniken";
        deviceRegistrationVar.objSeviceName3 = "SCAUniken";
        deviceRegistrationVar.flxMainContainerSkn = "sknFFFFFFscroll";
        deviceRegistrationVar.btnRegisterNewDeviceSkn = "sknBtnSSP0273e313Px";
        deviceRegistrationVar.fontIconMsgTypeErrSkn = "sknFontIconCrossEE000550px";
        deviceRegistrationVar.lblMsgHeaderSkn = "sknSSP42424224Px";
        deviceRegistrationVar.popupBgSkn = "sknFlx000000Opacity40";
        deviceRegistrationVar.btnYesSkn = "sknBtnNormalSSPFFFFFF15Px";
        deviceRegistrationVar.lblClosePopupSkn = "sknOLBFonts003e7520px";
        deviceRegistrationVar.lblRegisterDevicePopupHeaderSkn = "sknSSPSB42424218Px";
        deviceRegistrationVar.imgInfoSrc = "info_grey.png";
        deviceRegistrationVar.fontIconLastStatusSuspendTxt = "K";
        deviceRegistrationVar.lblClosePopupTxt = "g";
        deviceRegistrationVar.btnRegisterNewDeviceTxt = "i18n.DeviceRegistration.RegisterNewDevice";
        deviceRegistrationVar.btnYesTxt = "Yes";
        deviceRegistrationVar.lblMsgHeaderTxtActivationCodeCreated = "i18n.DeviceRegistration.MsgActivationCodeCreated";
        deviceRegistrationVar.lblRegisterDevicePopupHeaderTxtRegisterNewDevice = "i18n.DeviceRegistration.RegisterNewDevice";
        deviceRegistrationVar.operationName = "getUserDevices";
        deviceRegistrationVar.operationName1 = "updateMyDeviceStatus";
        deviceRegistrationVar.operationName2 = "revokeMyDevice";
        deviceRegistrationVar.operationName4 = "fetch";
        deviceRegistrationVar.operationName3 = "registerNewDevice";
        deviceRegistrationVar.flxTopMsgInnerSkn = "sknrounded";
        deviceRegistrationVar.fontIconMsgTypeSuccessSkn = "sknFontIconActive04A61550px";
        deviceRegistrationVar.lblMsgSkn = "sknSSP72727215Px";
        deviceRegistrationVar.flxRegisterDevicePopupSkn = "bbSknFlxffffffWithShadow";
        deviceRegistrationVar.btnNoSkn = "sknBtn003E75Border";
        deviceRegistrationVar.lblRegisterDevicePopupBodySkn = "slLabel424242Regular17px";
        deviceRegistrationVar.lblCloseMsgTxt = "g";
        deviceRegistrationVar.btnNoTxt = "No";
        deviceRegistrationVar.lblMsgTxtReceivePushNotifications = "i18n.DeviceRegistration.MsgReceivePushNotifications";
        deviceRegistrationVar.imgLoadingSrc = "rb_4_0_ad_loading_indicator.gif";
        deviceRegistrationVar.lblPopupInfoTxtNotReceivePushNotificationsSuspend = "i18n.DeviceRegistration.WarningMsgNotReceivePushNotificationsSuspend";
        deviceRegistrationVar.objName = "SCADevice";
        deviceRegistrationVar.objName1 = "SCADevice";
        deviceRegistrationVar.objName2 = "SCADevice";
        deviceRegistrationVar.objName4 = "AuthStatus";
        deviceRegistrationVar.objName3 = "SCADevice";
        deviceRegistrationVar.flxRegisterDevicesHeaderSkn = "sknFFFFFFnoBor";
        deviceRegistrationVar.lblCloseMsgSkn = "sknOLBFonts003e7520px";
        deviceRegistrationVar.lblRegisterDeviceHeaderSkn = "sknLblSSP42424215px";
        deviceRegistrationVar.flxPopupHeaderSeparatorSkn = "sknFlxd3d3d3op60";
        deviceRegistrationVar.lblPopupInfoSkn = "sknSSP72727215Px";
        deviceRegistrationVar.fontIconLastStatusActiveTxt = "N";
        deviceRegistrationVar.lblMsgTxtNotReceivePushNotifications = "i18n.DeviceRegistration.MsgnNotReceivePushNotifications";
        deviceRegistrationVar.lblPopupInfoTxtNotReceivePushNotificationsRemove = "i18n.DeviceRegistration.WarningMsgNotReceivePushNotificationsRemove";
        deviceRegistrationVar.flxRegisterDeviceHeaderSeperatorSkn = "sknFlxd3d3d3op60";
        deviceRegistrationVar.fontIconDeviceSkn = "sknOlbFonts0273e3";
        deviceRegistrationVar.lblDeviceNameSkn = "sknSSPRegular42424215Px";
        deviceRegistrationVar.fontIconMsgTypeErrTxt = "l";
        deviceRegistrationVar.lblMsgTxtActivationCodeSent = "i18n.DeviceRegistration.MsgActivationCodeSent";
        deviceRegistrationVar.popupLoadingBgSkn = "sknflx000000op50";
        deviceRegistrationVar.ldlPopupTextSkn = "sknlbl424242SSPReg17px";
        deviceRegistrationVar.lblPopupInfoTxtNotReceivePushNotificationsSuspendOnlyDevice = "i18n.DeviceRegistration.WarningMsgNotReceivePushNotificationsSuspendOnlyDevice";
        deviceRegistrationVar.flxDevicesSkn = "sknFlxBgFFFFFFBorderE3E3E3Radius4Px";
        deviceRegistrationVar.fontIconLastStatusActiveSkn = "sknFontIconActive04A61524px";
        deviceRegistrationVar.lblRegisteredOnSkn = "sknLblSSP72727215px";
        deviceRegistrationVar.fontIconMsgTypeSuccessTxt = "N";
        deviceRegistrationVar.lblMsgTxtRequestDeniedErr = "i18n.DeviceRegistration.ErrMsgApprovalDenied";
        deviceRegistrationVar.flxPopupLoadingSkn = "sknflxffffffRadius5px";
        deviceRegistrationVar.lblPopupInfoTxtNotReceivePushNotificationsRemoveOnlyDevice = "i18n.DeviceRegistration.WarningMsgNotReceivePushNotificationsRemoveOnlyDevice";
        deviceRegistrationVar.flxSeparatorSegmentSkn = "sknFlxd3d3d3op60";
        deviceRegistrationVar.fontIconLastStatusSuspendSkn = "sknFontIconSuspendFFA50024px";
        deviceRegistrationVar.lblLastStatusSkn = "sknSSPRegular42424215Px";
        deviceRegistrationVar.fontIconDeviceTxt = "(";
        deviceRegistrationVar.lblMsgTxtRequestTimedOutErr = "i18n.DeviceRegistration.ErrMsgApprovalTimedOut";
        deviceRegistrationVar.ldlPopupTextTxt = "i18n.DeviceRegistration.MsgApproveRequestNotificationSent";
        deviceRegistrationVar.lblSuspendDeviceSkn = "sknSSP4176a415px";
        deviceRegistrationVar.lblRegisterDeviceHeaderTxt = "i18n.DeviceRegistration.RegisterDevices";
        deviceRegistrationVar.lblRemoveDeviceSkn = "sknSSP4176a415px";
        deviceRegistrationVar.lblRegisteredOnTxt = "i18n.DeviceRegistration.RegisteredOn";
        deviceRegistrationVar.lblNoRecordsSkn = "sknLblSSP72727215px";
        deviceRegistrationVar.lblLastStatusActiveTxt = "i18n.DeviceRegistration.Active";
        deviceRegistrationVar.lblLastStatusSuspendTxt = "i18n.DeviceRegistration.DeviceSuspended";
        deviceRegistrationVar.lblSuspendDeviceSuspendTxt = "i18n.DeviceRegistration.SuspendDevice";
        deviceRegistrationVar.lblSuspendDeviceUnsuspendTxt = "i18n.DeviceRegistration.UnsuspendDevice";
        deviceRegistrationVar.lblRemoveDeviceTxt = "i18n.DeviceRegistration.RemoveDevice";
        deviceRegistrationVar.lblNoRecordsTxt = "No devices found.";
        deviceRegistrationVar.updateFormUI = scope.updateFormUI;
        if (currform.flxRegisteredDevice) {
          currform.flxRegisteredDevice.add(deviceRegistrationVar);
          currform.flxRegisteredDevice.setVisibility(true);
          deviceRegistrationVar.setVisibility(true);
        }
        currform.forceLayout();
      } catch (err) {
        var errorObj = {
          "method": "addRegisteredDevicesComponent",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    showRegisteredDevices: function () {
      var scope = this;
      try {
        deviceRegistrationVar.fetchDevices();
      } catch (err) {
        var errorObj = {
          "method": "showRegisteredDevices",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    onError: function (err) {
      var errMsg = JSON.stringify(err);
      errMsg.level = "frmDeviceManagementUniken";
      // kony.ui.Alert(errMsg);
    },
  };
});