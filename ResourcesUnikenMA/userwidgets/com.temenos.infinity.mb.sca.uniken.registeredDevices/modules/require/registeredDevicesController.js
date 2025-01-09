define(['SCAUtility'], function (SCAUtility) {
  const CIBAObjSrv = {
    getDataModel: function (objectName, objectServiceName) {
      var objSvc = kony.sdk.getCurrentInstance().getObjectService(objectServiceName, {
        "access": "online"
      });
      return {
        customVerb: function (customVerb, params, callback) {
          var dataObject = new kony.sdk.dto.DataObject(objectName);
          for (let key in params) {
            dataObject.addField(key, params[key]);
          }
          var options = {
            "dataObject": dataObject
          };
          objSvc.customVerb(customVerb, options, success => callback(true, success), error => callback(false, error));
        }
      };
    }
  };
  const DEVICE_CONSTANTS = {
    selectedDeviceID: null,
    selectedDeviceStatus: null,
    devicesCount: null,
    selectedDeviceName: null,
    currentDevice:null,
    appUuid: null,
    lastAccessedTs: null,
    createdTs: null,
    devBind: null,
  };
  return {
    constructor: function (baseConfig, layoutConfig, pspConfig) {
      this._lblRegisteredDevicesText = "";
      this._btnRegisterNewDeviceText = "";
      this._btnSuspendDeviceText = "";
      this._btnUnsuspendDeviceText = "";
      this._btnRemoveDeviceText = "";
    },

    //Logic for getters/setters of custom properties
    initGettersSetters: function () {
      defineGetter(this, 'lblRegisteredDevicesText', () => {
        return this._lblRegisteredDevicesText;
      });
      defineSetter(this, 'lblRegisteredDevicesText', value => {
        this._lblRegisteredDevicesText = value;
      });
      defineGetter(this, 'btnRegisterNewDeviceText', () => {
        return this._btnRegisterNewDeviceText;
      });
      defineSetter(this, 'btnRegisterNewDeviceText', value => {
        this._btnRegisterNewDeviceText = value;
      });
      defineGetter(this, 'btnSuspendDeviceText', () => {
        return this._btnSuspendDeviceText;
      });
      defineSetter(this, 'btnSuspendDeviceText', value => {
        this._btnSuspendDeviceText = value;
      });
      defineGetter(this, 'btnUnsuspendDeviceText', () => {
        return this._btnUnsuspendDeviceText;
      });
      defineSetter(this, 'btnUnsuspendDeviceText', value => {
        this._btnUnsuspendDeviceText = value;
      });
      defineGetter(this, 'btnRemoveDeviceText', () => {
        return this._btnRemoveDeviceText;
      });
      defineSetter(this, 'btnRemoveDeviceText', value => {
        this._btnRemoveDeviceText = value;
      });
    },

    preShowRegisteredDevices: function () {
      this.setTextFromi18n();
      this.resetUI();
      this.setFlowActions();
      Controllers.set("DeviceManagementController", this);
      this.getDevices();
      this.renderTitleBar();
    },

    resetUI: function () {
      this.assignDefaultText();
      this.view.flxPopups.setVisibility(false);
      this.view.flxLogoutScreen.setVisibility(false);
      this.view.flxCustomDevicePopup.setVisibility(false);
      this.view.flxDeviceSettingsPopup.setVisibility(false);
      this.view.btnSuspendDevice.setVisibility(false);
      this.view.btnUnsuspendDevice.setVisibility(false);
      this.view.SCAComponent.setVisibility(false);
      this.view.segRegisteredDevices.setVisibility(false);
    },

    assignDefaultText: function () {
      this.view.lblRegisteredDevices.text = this._lblRegisteredDevicesText;
      this.view.btnRegisterNewDevice.text = this._btnRegisterNewDeviceText;
      this.view.btnSuspendDevice.text = this._btnSuspendDeviceText;
      this.view.btnUnsuspendDevice.text = this._btnUnsuspendDeviceText;
      this.view.btnRemoveDevice.text = this._btnRemoveDeviceText;
    },

    setTextFromi18n: function () {
      this._lblRegisteredDevicesText = this.getStringFromi18n(this._lblRegisteredDevicesText);
      this._btnRegisterNewDeviceText = this.getStringFromi18n(this._btnRegisterNewDeviceText);
      this._btnSuspendDeviceText = this.getStringFromi18n(this._btnSuspendDeviceText);
      this._btnUnsuspendDeviceText = this.getStringFromi18n(this._btnUnsuspendDeviceText);
      this._btnRemoveDeviceText = this.getStringFromi18n(this._btnRemoveDeviceText);
    },

    getStringFromi18n: function (stringValue) {
      return kony.i18n.getLocalizedString(stringValue) ? kony.i18n.getLocalizedString(stringValue) : stringValue;
    },

    setFlowActions: function () {
      const scopeObj = this;
      this.view.SCAComponent.onFailureCallback = this.scaFailureCallback;
      this.view.btnDone.onClick = function () {
        scopeObj.view.flxSignInApprovedPopup.setVisibility(false);
      };
      this.view.btnClose.onClick = function () {
        scopeObj.view.flxSignInDeniedPopup.setVisibility(false);
      };
      this.view.flxBack.onClick = function () {
        let navManager = applicationManager.getNavigationManager();
        navManager.goBack();
      };
      this.view.btnRegisterNewDevice.onClick = function () {
        scopeObj.handleOnClickRegisterDevice();
      };
      this.view.btnSuspendDevice.onClick = function () {
        scopeObj.handleOnClickSuspendDevice();
      };
      this.view.btnUnsuspendDevice.onClick = function () {
        scopeObj.handleOnClickUnsuspendDevice();
      };
      this.view.btnRemoveDevice.onClick = function () {
        scopeObj.handleOnClickRemoveDevice();
      };
      this.view.btnCancel.onClick = function () {
        scopeObj.setDeviceSettingsPopupVisibility(false);
      };
      this.view.btnDecisionNo.onClick = function () {
        scopeObj.setDevicePopupVisibility(false);
      };
      this.view.btnDecisionYes.onClick = function () {
        const popupTitle = scopeObj.view.lblPopupTitle.text;
        scopeObj.setDevicePopupVisibility(false);
        scopeObj.handleAction(popupTitle);
      };
      this.view.btnLogIn.onClick = function () {
        const authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AuthUIModule", "appName": "AuthenticationMA" });
        authMod.presentationController.signInFromLogoutScreen();
      };
      this.view.flxPopups.onTouchEnd = null;
      this.view.flxCustomDevicePopup.onTouchEnd = null;
      this.view.flxDeviceSettingsPopup.onTouchEnd = null;
    },

    handleOnClickRegisterDevice: function () {
      const popupData = {
        title: kony.i18n.getLocalizedString("kony.mb.sca.RegisterANewDevice"),
        description: kony.i18n.getLocalizedString("kony.mb.sca.RegisterNewDeviceMessage")
      };
      this.populateCustomPopupData(popupData);
      this.setDevicePopupVisibility(true);
    },

    handleOnClickSuspendDevice: function () {
      let popupData = {};
      if (this.view.segRegisteredDevices.data.length === 1) {
        popupData = {
          title: kony.i18n.getLocalizedString("kony.mb.sca.SuspendDeviceQM"),
          description: kony.i18n.getLocalizedString("kony.mb.sca.SuspendDeviceMsgSingleDevice")
        };
      } else if (this.view.segRegisteredDevices.data.length > 1) {
        popupData = {
          title: kony.i18n.getLocalizedString("kony.mb.sca.SuspendDeviceQM"),
          description: kony.i18n.getLocalizedString("kony.mb.sca.SuspendDeviceMsgMultipleDevices")
        };
      }
      this.populateCustomPopupData(popupData);
      this.setDevicePopupVisibility(true);
    },

    handleOnClickUnsuspendDevice: function () {
      let popupData = {
        title: kony.i18n.getLocalizedString("kony.mb.sca.UnsuspendDeviceQM"),
        description: kony.i18n.getLocalizedString("kony.mb.sca.UnsuspendDeviceMsg")
      };
      this.populateCustomPopupData(popupData);
      this.setDevicePopupVisibility(true);
    },

    handleOnClickRemoveDevice: function () {
      let popupData = {};
      if (this.view.segRegisteredDevices.data.length === 1) {
        popupData = {
          title: kony.i18n.getLocalizedString("kony.mb.sca.RemoveDeviceQM"),
          description: kony.i18n.getLocalizedString("kony.mb.sca.RemoveDeviceMsgSingleDevice")
        };
      }
      else if (DEVICE_CONSTANTS.selectedDeviceName === DEVICE_CONSTANTS.currentDevice) {
        popupData = {
          title: kony.i18n.getLocalizedString("kony.mb.sca.RemoveDeviceQM"),
          description: kony.i18n.getLocalizedString("kony.mb.sca.uniken.removeCurrentDevice")
        };
      }
      else if (this.view.segRegisteredDevices.data.length > 1) {
        popupData = {
          title: kony.i18n.getLocalizedString("kony.mb.sca.RemoveDeviceQM"),
          description: kony.i18n.getLocalizedString("kony.mb.sca.RemoveDeviceMsgMultipleDevices")
        };
      }
      this.populateCustomPopupData(popupData);
      this.setDevicePopupVisibility(true);
    },

    setDevicePopupVisibility: function (isVisible) {
      this.view.flxPopups.setVisibility(isVisible);
      this.view.flxCustomDevicePopup.setVisibility(isVisible);
      this.view.flxDeviceSettingsPopup.setVisibility(false);
    },

    setDeviceSettingsPopupVisibility: function (isVisible, isSuspended = false) {
      // this.view.btnSuspendDevice.setVisibility(!isSuspended);
      // this.view.btnUnsuspendDevice.setVisibility(isSuspended);
      this.view.flxCustomDevicePopup.setVisibility(false);
      this.view.flxPopups.setVisibility(isVisible);
      this.view.flxDeviceSettingsPopup.setVisibility(isVisible);
      this.view.flxDeviceSettings.height="60dp";
    },

    populateCustomPopupData: function ({ title, description }) {
      this.view.lblPopupTitle.text = title;
      this.view.lblDescription.text = description;
    },

    populateData: function (registeredDevicesData) {
      this.view.segRegisteredDevices.widgetDataMap = this.getDevicesDataMap();
      const mappedSegmentData = registeredDevicesData.map(this.mappingSegmentData);
      this.view.segRegisteredDevices.setData(mappedSegmentData);
    },

    mappingSegmentData: function ({ appUuid, devName, createdTs, status, devUUID, devBind, lastAccessedTs }) {
      const scopeObj = this;
      const deviceStatusVisibility = (status &&
        status !== "" &&
        status !== undefined) ? true : false;
      let imgDeviceStatus = "";
      if (deviceStatusVisibility) {
        if (status === "ACTIVE") imgDeviceStatus = "confirmation_tick.png";
        else if (status === "SUSPENDED") imgDeviceStatus = "warninground.png";
      }
      let lblDeviceStatus = deviceStatusVisibility ? status : "";
      let [year, month, date] = createdTs.split("T")[0].split("-");
      const registeredDate = `${month}/${date}/${year}`;
      return {
        id: appUuid,
        registeredOn: createdTs,
        friendlyName: devName,
        status: status,
        //         imgDevice: {
        //           src: "device_3.png"
        //         },
        lblDeviceName: {
          text: devName
        },
        lblRegisteredOn: {
          text: kony.i18n.getLocalizedString("kony.mb.sca.RegisteredOn"),
        },
        lblDeviceRegisteredDate: {
          text: registeredDate
        },
        flxDeviceInfoRight: {
          onClick: () => {
            DEVICE_CONSTANTS.selectedDeviceName = devName;
            DEVICE_CONSTANTS.selectedDeviceID = devUUID;
            DEVICE_CONSTANTS.selectedDeviceStatus = status;
            DEVICE_CONSTANTS.appUuid = appUuid;
            DEVICE_CONSTANTS.createdTs = createdTs;
            DEVICE_CONSTANTS.lastAccessedTs = lastAccessedTs;
            DEVICE_CONSTANTS.devBind = devBind;
            scopeObj.setDeviceSettingsPopupVisibility(true, status === "SUSPENDED");
          },
        },
        imgOptions: {
          src: "more_detail.png"
        },
        flxDeviceStatus: {
          isVisible: deviceStatusVisibility
        },
        imgDeviceStatus: {
          src: imgDeviceStatus
        },
        lblDeviceStatus: {
          text: lblDeviceStatus
        }
      };
    },

    getDevicesDataMap: function () {
      return {
        flxRegisteredDevices: "flxRegisteredDevices",
        flxDeviceInfo: "flxDeviceInfo",
        flxDeviceInfoLeft: "flxDeviceInfoLeft",
        //imgDevice: "imgDevice",
        flxDeviceInfoMid: "flxDeviceInfoMid",
        flxDeviceInfoMidInner: "flxDeviceInfoMidInner",
        lblDeviceName: "lblDeviceName",
        flxDeviceRegistrationDate: "flxDeviceRegistrationDate",
        lblRegisteredOn: "lblRegisteredOn",
        lblDeviceRegisteredDate: "lblDeviceRegisteredDate",
        flxDeviceInfoRight: "flxDeviceInfoRight",
        imgOptions: "imgOptions",
        flxDeviceStatus: "flxDeviceStatus",
        flxDeviceStatusInner: "flxDeviceStatusInner",
        imgDeviceStatus: "imgDeviceStatus",
        lblDeviceStatus: "lblDeviceStatus"
      };
    },

    getDevices: function () {
      // const servicePayload = {
      //   objServiceName: this._objectServiceName1,
      //   objName: this._objectName1,
      //   operationName: this._operationName1,
      //   payload: "",
      //   successCallback: this.getDevicesSuccessCallback,
      //   errorCallback: this.getDevicesErrorCallback
      // };
      // applicationManager.getPresentationUtility().showLoadingScreen();
      // SCAUtility.callBackendService(servicePayload);
      const userManager = applicationManager.getUserPreferencesManager();
      const userName = userManager.getUserObj().userName;
      this.handleSynErrorResponse(RDNAAPI.getRegisteredDeviceDetails(userName));
    },
    scaFailureCallback: function (response) {
      var scopeObj = this;
      scopeObj.showOrHideTxStatus("Failure", response);
      this.getDevices();
    },

    handleSynErrorResponse: function (response) {
      kony.print("Uniken : handlesyncresponse in RegisteredDevciesController : " + JSON.stringify(response));

      function SHOW_ALERT_Callback(form) {
        // form.rdnaObj.resetAuthState();
      }
      if (response[0].shortErrorCode !== 0) {
        if (response[0].shortErrorCode === 213) {
          var errormsg = kony.i18n.getLocalizedString("kony.mb.sca.uniken.errorMessage");
          this.getDevicesErrorCallback(errormsg);
        } else {
          var error = kony.i18n.getLocalizedString("kony.mb.sca.uniken.UnikenError");
          this.getDevicesErrorCallback(error);
        }
      }
    },

    getDevicesSuccessCallback: function (data) {
      if (data.pArgs.response.StatusCode === 146) {
        let msg = kony.i18n.getLocalizedString("kony.mb.sca.uniken.deviceerror");
        this.getDevicesErrorCallback(msg);
        this.view.segRegisteredDevices.setVisibility(false);
      }
      else {
        this.view.flxErrorMsg.setVisibility(false);
        this.view.segRegisteredDevices.setVisibility(true);
        this.populateData(data.pArgs.response.ResponseData.device);
        let deviceObj = data.pArgs.response.ResponseData.device.filter(item => item.currentDevice === true);
        DEVICE_CONSTANTS.currentDevice = deviceObj[0].devName;
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        DEVICE_CONSTANTS.devicesCount = data.pArgs.response.ResponseData.device.length;
      }
    },
    getDevicesErrorCallback: function (err) {
      kony.print("ERROR" + JSON.stringify(err));
      this.view.flxErrorMsg.setVisibility(true);
      this.view.lblErrorMsg.text = err;

      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },

    handleAction: function (popupTitle) {
      switch (popupTitle) {
        case kony.i18n.getLocalizedString("kony.mb.sca.RegisterANewDevice"):
          var reason = "RegisterNewDevice";
          var payload = applicationManager.getUserPreferencesManager().getUserObj().userName;
          this.authenticateUserData(payload, reason);
          break;
        case kony.i18n.getLocalizedString("kony.mb.sca.RemoveDeviceQM"):
          var reason = "RevokeDevice";
          var payload = applicationManager.getUserPreferencesManager().getUserObj().userName + "|" + DEVICE_CONSTANTS.selectedDeviceName;
          this.authenticateUserData(payload, reason);
          break;
        case kony.i18n.getLocalizedString("kony.mb.sca.SuspendDeviceQM"):
          this.suspendDevice();
          break;
        case kony.i18n.getLocalizedString("kony.mb.sca.UnsuspendDeviceQM"):
          this.unsuspendDevice();
          break;
        default:
          kony.print("Error while calling service");
      }
    },
    authenticateUserData: function (payload, reason) {
      this.view.SCAComponent.setVisibility(true);
      this.view.SCAComponent.authenticateUserData(payload, reason);
    },
    authenticateUserDataCB: function (response) {
      let scopeObj = this;
      if (response.error.longErrorCode === 0) {
        const statusCode = response.status.statusCode;
        if (statusCode === 100) {
          if (response.reason === "RegisterNewDevice") scopeObj.registerDevice();
          else if (response.reason === "RevokeDevice") scopeObj.revokeDevice();
        }
        else if (statusCode === 102) {
          this.view.flxSignInApprovedPopup.setVisibility(false);
          this.view.flxSignInDeniedPopup.setVisibility(true);
          this.view.lblSignInDeclined.text = kony.i18n.getLocalizedString("kony.mb.sca.uniken.failedAuthentication");
          this.view.lblSignInDeclineDescription.text = kony.i18n.getLocalizedString("kony.mb.sca.uniken.invalidCredentials");
        }
        else {
          const dataToDisplay = {
            msgTitle: kony.i18n.getLocalizedString("kony.mb.sca.FailureExclamation"),
            msgDesc: kony.i18n.getLocalizedString("kony.mb.sca.approvalRequestFailed")
          };
          this.showOrHideTxStatus("Failure", dataToDisplay);
        }
      }
      else {
        const dataToDisplay = {
          msgTitle: kony.i18n.getLocalizedString("kony.mb.sca.FailureExclamation"),
          msgDesc: kony.i18n.getLocalizedString("kony.mb.sca.approvalRequestFailed")
        };
        this.showOrHideTxStatus("Failure", dataToDisplay);
      }

    },

    registerDevice: function () {
      let scopeObj = this;
      applicationManager.getPresentationUtility().showLoadingScreen();
      const userManager = applicationManager.getUserPreferencesManager();
      const userName = userManager.getUserObj().userName;
      let requestObject = CIBAObjSrv.getDataModel("SCADevice", "SCAUniken");
      let request = {
        "userName": userName
      };
      requestObject.customVerb('registerNewDevice', request, completionCallback);

      function completionCallback(status, data, error) {
        if (status === true) {
          scopeObj.registerDeviceSuccessCallback(data);
        } else {
          scopeObj.registerDeviceFailureCallback(data);
        }
      }
    },

    revokeDevice: function () {
      applicationManager.getPresentationUtility().showLoadingScreen();
      const payload = JSON.stringify({
        "device": [
          {
            "devUUID":
              DEVICE_CONSTANTS.selectedDeviceID,
            "devName": DEVICE_CONSTANTS.selectedDeviceName,
            "status": "Delete",
            "lastAccessedTs": DEVICE_CONSTANTS.lastAccessedTs,
            "createdTs": DEVICE_CONSTANTS.createdTs,
            "appUuid": DEVICE_CONSTANTS.appUuid,
            "devBind": 0
          }
        ]
      });

      const userManager = applicationManager.getUserPreferencesManager();
      const userName = userManager.getUserObj().userName;
      if (DEVICE_CONSTANTS.selectedDeviceName === DEVICE_CONSTANTS.currentDevice)
        this.logoutUser = true;
      else
        this.logoutUser = false;
      this.handleSynErrorResponse(RDNAAPI.updateDeviceDetails(userName, payload));
    },

    registerDeviceSuccessCallback: function () {
      const userManager = applicationManager.getUserPreferencesManager();
      //const phone = userManager.getUserObj().phone;
      //const maskedPhone = phone.slice(0,6) + "*".repeat(phone.length-8) + phone.slice(-2);
      let phone = userManager.getEntitlementPhoneNumbers()
      let maskedPhone;
      if (phone.length > 1) {
        phone.forEach((item) => {
          if (item.isPrimary === 'true') {
            maskedPhone = item.phoneNumber
          }
        });
      } else {
        maskedPhone = phone[0].phoneNumber;
      }
      var maskedNumber = "xxxxxxx" + maskedPhone.slice(7);
      const dataToDisplay = {
        msgTitle: kony.i18n.getLocalizedString("kony.mb.sca.SuccessExclamation"),
        msgDesc: kony.i18n.getLocalizedString("kony.mb.sca.NewActivationCodeHasBeenSentToYourMobileNumber") + " " + maskedNumber + ". " + kony.i18n.getLocalizedString("kony.mb.sca.PleaseUseTheCodeToRegisterWithTheDeviceYouWantTo")
      };
      this.showOrHideTxStatus("Success", dataToDisplay);
      this.getDevices();
      this.view.SCAComponent.setVisibility(false);
    },
    registerDeviceFailureCallback: function () {
      const dataToDisplay = {
        msgTitle: kony.i18n.getLocalizedString("kony.mb.sca.FailureExclamation"),
        msgDesc: kony.i18n.getLocalizedString("kony.mb.sca.FailedToRegisterTheNewDevice")
      };
      this.showOrHideTxStatus("Failure", dataToDisplay);
      this.view.SCAComponent.setVisibility(false);
    },

    showOrHideTxStatus: function (status, displayText) {
      this.view.SCAComponent.setVisibility(false);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if (status && status === "Success") {
        this.view.flxSignInApprovedPopup.setVisibility(true);
        this.view.flxSignInDeniedPopup.setVisibility(false);
        this.view.lblSignInApproved.text = displayText.msgTitle;
        this.view.lblSignInDescription.text = displayText.msgDesc;
      } else if (status && status === "Failure") {
        this.view.flxSignInApprovedPopup.setVisibility(false);
        this.view.flxSignInDeniedPopup.setVisibility(true);
        if (displayText && displayText.msgTitle && displayText.msgDesc) {
          this.view.lblSignInDeclined.text = displayText.msgTitle;
          this.view.lblSignInDeclineDescription.text = displayText.msgDesc;
        } else {
          this.view.lblSignInDeclined.text = kony.i18n.getLocalizedString("kony.mb.sca.uniken.deny");
          this.view.lblSignInDeclineDescription.text = kony.i18n.getLocalizedString("kony.mb.sca.uniken.denyMsg");
        }
      }
      this.view.forceLayout();
    },
    revokeDeviceSuccessCallback: function () {
      DEVICE_CONSTANTS.devicesCount === 1 ? this.revokeDeviceSingleSuccessCallback() : this.revokeDeviceMultipleSuccessCallback();
    },
    revokeDeviceSingleSuccessCallback: function () {
      this.view.lblCongrats.text = kony.i18n.getLocalizedString("kony.mb.sca.YouveRemovedTheDeviceSuccessfully");
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      const authManger = applicationManager.getAuthManager();
      authManger.logout(this.logoutSuccess, this.logoutError);
    },
    revokeDeviceMultipleSuccessCallback: function () {
      const dataToDisplay = {
        msgTitle: kony.i18n.getLocalizedString("kony.mb.sca.Removed") + " '" + DEVICE_CONSTANTS.selectedDeviceName + "' " + kony.i18n.getLocalizedString("kony.mb.sca.successfullyDot"),
        msgDesc: kony.i18n.getLocalizedString("kony.mb.sca.YouWillNoLongerReceivePushNotificationsOnThisDevice")
      };
      this.showOrHideTxStatus("Success", dataToDisplay);
      if (this.logoutUser) {
        this.view.lblCongrats.text = kony.i18n.getLocalizedString("kony.mb.sca.YouveRemovedTheDeviceSuccessfully");
        const authManger = applicationManager.getAuthManager();
        authManger.logout(this.logoutSuccess, this.logoutError);
      }
      else {
        this.getDevices();
      }
    },
    revokeDeviceFailureCallback: function () {
      this.view.SCAComponent.setVisibility(false);
      const dataToDisplay = {
        msgTitle: kony.i18n.getLocalizedString("kony.mb.sca.FailureExclamation"),
        msgDesc: kony.i18n.getLocalizedString("kony.mb.sca.FailedToRemoveDevice")
      };

      applicationManager.getPresentationUtility().dismissLoadingScreen();
      this.showOrHideTxStatus("Failure", dataToDisplay);
    },


    suspendDeviceSingleSuccessCallback: function () {
      this.view.lblCongrats.text = kony.i18n.getLocalizedString("kony.mb.sca.YouveSuspendedTheDeviceSuccessfully");
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      const authManger = applicationManager.getAuthManager();
      authManger.logout(this.logoutSuccess, this.logoutError);
    },
    suspendDeviceMultipleSuccessCallback: function () {
      const dataToDisplay = {
        msgTitle: kony.i18n.getLocalizedString("kony.mb.sca.Suspended") + " '" + DEVICE_CONSTANTS.selectedDeviceName + "' " + kony.i18n.getLocalizedString("kony.mb.sca.successfullyDot"),
        msgDesc: kony.i18n.getLocalizedString("kony.mb.sca.YouWillNoLongerReceivePushNotificationsOnThisDevice")
      };
      this.view.sdk.setVisibility(true);
      this.view.sdk.showOrHideTxStatus(SCAUtility.SDKConstants.TX_ACCEPTED, dataToDisplay);
      this.getDevices();
    },
    suspendDeviceFailureCallback: function () {
      const dataToDisplay = {
        msgTitle: kony.i18n.getLocalizedString("kony.mb.sca.FailedToSuspendDevice"),
        msgDesc: kony.i18n.getLocalizedString("kony.mb.sca.approvalRequestFailed")
      };
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      this.view.sdk.setVisibility(true);
      this.view.sdk.showOrHideTxStatus(SCAUtility.SDKConstants.TX_DENIED, dataToDisplay);
    },

    unsuspendDeviceSuccessCallback: function () {
      const dataToDisplay = {
        msgTitle: kony.i18n.getLocalizedString("kony.mb.sca.Unsuspended") + " '" + DEVICE_CONSTANTS.selectedDeviceName + "' " + kony.i18n.getLocalizedString("kony.mb.sca.successfullyDot"),
        msgDesc: kony.i18n.getLocalizedString("kony.mb.sca.YouWillNowReceivePushNotificationsOnThisDevice")
      };
      this.view.sdk.setVisibility(true);
      this.view.sdk.showOrHideTxStatus(SCAUtility.SDKConstants.TX_ACCEPTED, dataToDisplay);
      this.getDevices();
    },
    unsuspendDeviceFailureCallback: function () {
      const dataToDisplay = {
        msgTitle: kony.i18n.getLocalizedString("kony.mb.sca.FailedToUnsuspendDevice"),
        msgDesc: kony.i18n.getLocalizedString("kony.mb.sca.approvalRequestFailed")
      };
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      this.view.sdk.setVisibility(true);
      this.view.sdk.showOrHideTxStatus(SCAUtility.SDKConstants.TX_DENIED, dataToDisplay);
    },
    logoutSuccess: function (resSuccess) {
      const navMan = applicationManager.getNavigationManager();
      navMan.setCustomInfo("logoutStatus", true);
      this.view.flxRegisteredDevicesContainer.setVisibility(false);
      this.view.flxPopups.setVisibility(false);
      this.view.flxLogoutScreen.setVisibility(true);
    },
    logoutError: function (resError) {
      const navMan = applicationManager.getNavigationManager();
      navMan.setCustomInfo("logoutStatus", false);
      this.view.flxRegisteredDevicesContainer.setVisibility(false);
      this.view.flxPopups.setVisibility(false);
      this.view.flxLogoutScreen.setVisibility(true);
    },
    renderTitleBar: function() {
      var deviceUtilManager = applicationManager.getDeviceUtilManager();
      var isIphone = deviceUtilManager.isIPhone();
      var currForm = kony.application.getCurrentForm();
      if (!isIphone) {
          this.view.flxRegisteredDevicesHeader.isVisible = true;
      } else {
          this.view.flxRegisteredDevicesHeader.isVisible = false;
          this.view.flxRegisteredDevicesMain.top = "0dp";
          var titleBarAttributes = currForm.titleBarAttributes;
          titleBarAttributes["navigationBarHidden"] = false;
          currForm.titleBarAttributes = titleBarAttributes;
      }
    },

  };
});