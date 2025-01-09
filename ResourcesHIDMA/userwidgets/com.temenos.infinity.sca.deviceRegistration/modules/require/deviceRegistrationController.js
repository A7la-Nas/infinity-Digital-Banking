define(['./deviceRegistrationDAO', 'CommonUtilities', 'FormControllerUtility'],function(deviceRegistrationDAO, CommonUtilities, FormControllerUtility) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.deviceRegistrationDAO = new deviceRegistrationDAO();
      this.sequentialOperationName = "";
      this.currentOperationName = "";
      this.currentSelectedRowItems = "";
      this.totalActiveDevices = 0;
      this._objSeviceName = "";
      this._objName = "";
      this._operationName = "";
      this._objSeviceName1 = "";
      this._objName1 = "";
      this._operationName1 = "";
      this._objSeviceName2 = "";
      this._objName2 = "";
      this._operationName2 = "";
      this._objSeviceName3 = "";
      this._objName3 = "";
      this._operationName3 = "";
      this._objSeviceName4 = "";
      this._objName4 = "";
      this._operationName4 = "";

      //Flex Skin
      this._flxMainContainerSkn = "";
      this._flxTopMsgInnerSkn = "";
      this._flxRegisterDevicesHeaderSkn = "";
      this._flxRegisterDeviceHeaderSeperatorSkn = "";
      this._flxDevicesSkn = "";
      this._flxSeparatorSegmentSkn = "";

      //Flex Skin of Popup
      this._popupBgSkn = "";
      this._flxRegisterDevicePopupSkn = "";
      this._flxPopupHeaderSeparatorSkn = "";
      this._popupLoadingBgSkn = "";
      this._flxPopupLoadingSkn = "";

      //Btn Skin
      this._btnRegisterNewDeviceSkn = "";

      //Btn Skin of Popup
      this._btnYesSkn = "";
      this._btnNoSkn = "";

      //FontIcon Skin
      this._fontIconMsgTypeErrSkn = "";
      this._fontIconMsgTypeSuccessSkn = "";
      this._lblCloseMsgSkn = "";
      this._fontIconDeviceSkn = "";
      this._fontIconLastStatusActiveSkn = "";
      this._fontIconLastStatusSuspendSkn = "";

      //Label Skin
      this._lblMsgHeaderSkn = "";
      this._lblMsgSkn = "";
      this._lblRegisterDeviceHeaderSkn = "";
      this._lblDeviceNameSkn = "";
      this._lblRegisteredOnSkn = "";
      this._lblLastStatusSkn = "";
      this._lblSuspendDeviceSkn = "";
      this._lblRemoveDeviceSkn = "";
      this._lblNoRecordsSkn = "";

      //FontIcon Skin of Popup
      this._lblClosePopupSkn = "";

      //Label Skin of Popup
      this._lblRegisterDevicePopupHeaderSkn = "";
      this._lblRegisterDevicePopupBodySkn = "";
      this._lblPopupInfoSkn = "";
      this._ldlPopupTextSkn = "";

      //Image Source
      this._imgInfoSrc = "";
      this._imgLoadingSrc = "";

      //Btn Text
      this._btnRegisterNewDeviceTxt = "";   

      //Btn Text of Popup
      this._btnYesTxt = "";
      this._btnNoTxt = "";

      //FontIcon Text
      this._fontIconDeviceTxt = "";
      this._fontIconMsgTypeErrTxt = "";
      this._fontIconMsgTypeSuccessTxt = "";
      this._fontIconLastStatusActiveTxt = "";
      this._fontIconLastStatusSuspendTxt = "";
      this._lblCloseMsgTxt = "";

      //FontIcon Text of Popup
      this._lblClosePopupTxt = "";

      //Label Text
      this._lblMsgHeaderTxtActivationCodeCreated = "";
      this._lblMsgTxtReceivePushNotifications = "";
      this._lblMsgTxtNotReceivePushNotifications = "";
      this._lblMsgTxtActivationCodeSent = "";
      this._lblMsgTxtRequestDeniedErr = "";
      this._lblMsgTxtRequestTimedOutErr = "";
      this._lblRegisterDeviceHeaderTxt = "";
      this._lblRegisteredOnTxt = "";
      this._lblLastStatusActiveTxt = "";
      this._lblLastStatusSuspendTxt = "";
      this._lblSuspendDeviceSuspendTxt = "";
      this._lblSuspendDeviceUnsuspendTxt = "";
      this._lblRemoveDeviceTxt = "";
      this._lblNoRecordsTxt = "";
      
      //Label Text of Popup
      this._lblRegisterDevicePopupHeaderTxtRegisterNewDevice = "";
      this._lblPopupInfoTxtNotReceivePushNotificationsSuspend = "";
      this._lblPopupInfoTxtNotReceivePushNotificationsRemove = "";
      this._lblPopupInfoTxtNotReceivePushNotificationsSuspendOnlyDevice = "";
      this._lblPopupInfoTxtNotReceivePushNotificationsRemoveOnlyDevice = "";
      this._ldlPopupTextTxt = "";
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
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
      defineGetter(this, 'operationName1', () => {
        return this._operationName1;
      });
      defineSetter(this, 'operationName1', value => {
        this._operationName1 = value;
      });
      defineGetter(this, 'objName1', () => {
        return this._objName1;
      });
      defineSetter(this, 'objName1', value => {
        this._objName1 = value;
      });
      defineGetter(this, 'objSeviceName2', () => {
        return this._objSeviceName2;
      });
      defineSetter(this, 'objSeviceName2', value => {
        this._objSeviceName2 = value;
      });
      defineGetter(this, 'operationName2', () => {
        return this._operationName2;
      });
      defineSetter(this, 'operationName2', value => {
        this._operationName2 = value;
      });
      defineGetter(this, 'objName2', () => {
        return this._objName2;
      });
      defineSetter(this, 'objName2', value => {
        this._objName2 = value;
      });
      defineGetter(this, 'objSeviceName4', () => {
        return this._objSeviceName4;
      });
      defineSetter(this, 'objSeviceName4', value => {
        this._objSeviceName4 = value;
      });
      defineGetter(this, 'operationName4', () => {
        return this._operationName4;
      });
      defineSetter(this, 'operationName4', value => {
        this._operationName4 = value;
      });
      defineGetter(this, 'objName4', () => {
        return this._objName4;
      });
      defineSetter(this, 'objName4', value => {
        this._objName4 = value;
      });
      defineGetter(this, 'objSeviceName3', () => {
        return this._objSeviceName3;
      });
      defineSetter(this, 'objSeviceName3', value => {
        this._objSeviceName3 = value;
      });
      defineGetter(this, 'operationName3', () => {
        return this._operationName3;
      });
      defineSetter(this, 'operationName3', value => {
        this._operationName3 = value;
      });
      defineGetter(this, 'objName3', () => {
        return this._objName3;
      });
      defineSetter(this, 'objName3', value => {
        this._objName3 = value;
      });
      defineGetter(this, 'flxMainContainerSkn', () => {
        return this._flxMainContainerSkn;
      });
      defineSetter(this, 'flxMainContainerSkn', value => {
        this._flxMainContainerSkn = value;
      });
      defineGetter(this, 'flxTopMsgInnerSkn', () => {
        return this._flxTopMsgInnerSkn;
      });
      defineSetter(this, 'flxTopMsgInnerSkn', value => {
        this._flxTopMsgInnerSkn = value;
      });
      defineGetter(this, 'flxRegisterDevicesHeaderSkn', () => {
        return this._flxRegisterDevicesHeaderSkn;
      });
      defineSetter(this, 'flxRegisterDevicesHeaderSkn', value => {
        this._flxRegisterDevicesHeaderSkn = value;
      });
      defineGetter(this, 'flxRegisterDeviceHeaderSeperatorSkn', () => {
        return this._flxRegisterDeviceHeaderSeperatorSkn;
      });
      defineSetter(this, 'flxRegisterDeviceHeaderSeperatorSkn', value => {
        this._flxRegisterDeviceHeaderSeperatorSkn = value;
      });
      defineGetter(this, 'flxDevicesSkn', () => {
        return this._flxDevicesSkn;
      });
      defineSetter(this, 'flxDevicesSkn', value => {
        this._flxDevicesSkn = value;
      });
      defineGetter(this, 'flxSeparatorSegmentSkn', () => {
        return this._flxSeparatorSegmentSkn;
      });
      defineSetter(this, 'flxSeparatorSegmentSkn', value => {
        this._flxSeparatorSegmentSkn = value;
      });
      defineGetter(this, 'btnRegisterNewDeviceSkn', () => {
        return this._btnRegisterNewDeviceSkn;
      });
      defineSetter(this, 'btnRegisterNewDeviceSkn', value => {
        this._btnRegisterNewDeviceSkn = value;
      });
      defineGetter(this, 'fontIconMsgTypeErrSkn', () => {
        return this._fontIconMsgTypeErrSkn;
      });
      defineSetter(this, 'fontIconMsgTypeErrSkn', value => {
        this._fontIconMsgTypeErrSkn = value;
      });
      defineGetter(this, 'fontIconMsgTypeSuccessSkn', () => {
        return this._fontIconMsgTypeSuccessSkn;
      });
      defineSetter(this, 'fontIconMsgTypeSuccessSkn', value => {
        this._fontIconMsgTypeSuccessSkn = value;
      });
      defineGetter(this, 'lblCloseMsgSkn', () => {
        return this._lblCloseMsgSkn;
      });
      defineSetter(this, 'lblCloseMsgSkn', value => {
        this._lblCloseMsgSkn = value;
      });
      defineGetter(this, 'fontIconDeviceSkn', () => {
        return this._fontIconDeviceSkn;
      });
      defineSetter(this, 'fontIconDeviceSkn', value => {
        this._fontIconDeviceSkn = value;
      });
      defineGetter(this, 'fontIconLastStatusActiveSkn', () => {
        return this._fontIconLastStatusActiveSkn;
      });
      defineSetter(this, 'fontIconLastStatusActiveSkn', value => {
        this._fontIconLastStatusActiveSkn = value;
      });
      defineGetter(this, 'fontIconLastStatusSuspendSkn', () => {
        return this._fontIconLastStatusSuspendSkn;
      });
      defineSetter(this, 'fontIconLastStatusSuspendSkn', value => {
        this._fontIconLastStatusSuspendSkn = value;
      });
      defineGetter(this, 'lblMsgHeaderSkn', () => {
        return this._lblMsgHeaderSkn;
      });
      defineSetter(this, 'lblMsgHeaderSkn', value => {
        this._lblMsgHeaderSkn = value;
      });
      defineGetter(this, 'lblMsgSkn', () => {
        return this._lblMsgSkn;
      });
      defineSetter(this, 'lblMsgSkn', value => {
        this._lblMsgSkn = value;
      });
      defineGetter(this, 'lblRegisterDeviceHeaderSkn', () => {
        return this._lblRegisterDeviceHeaderSkn;
      });
      defineSetter(this, 'lblRegisterDeviceHeaderSkn', value => {
        this._lblRegisterDeviceHeaderSkn = value;
      });
      defineGetter(this, 'lblDeviceNameSkn', () => {
        return this._lblDeviceNameSkn;
      });
      defineSetter(this, 'lblDeviceNameSkn', value => {
        this._lblDeviceNameSkn = value;
      });
      defineGetter(this, 'lblRegisteredOnSkn', () => {
        return this._lblRegisteredOnSkn;
      });
      defineSetter(this, 'lblRegisteredOnSkn', value => {
        this._lblRegisteredOnSkn = value;
      });
      defineGetter(this, 'lblLastStatusSkn', () => {
        return this._lblLastStatusSkn;
      });
      defineSetter(this, 'lblLastStatusSkn', value => {
        this._lblLastStatusSkn = value;
      });
      defineGetter(this, 'lblSuspendDeviceSkn', () => {
        return this._lblSuspendDeviceSkn;
      });
      defineSetter(this, 'lblSuspendDeviceSkn', value => {
        this._lblSuspendDeviceSkn = value;
      });
      defineGetter(this, 'lblRemoveDeviceSkn', () => {
        return this._lblRemoveDeviceSkn;
      });
      defineSetter(this, 'lblRemoveDeviceSkn', value => {
        this._lblRemoveDeviceSkn = value;
      });
      defineGetter(this, 'lblNoRecordsSkn', () => {
        return this._lblNoRecordsSkn;
      });
      defineSetter(this, 'lblNoRecordsSkn', value => {
        this._lblNoRecordsSkn = value;
      });
      defineGetter(this, 'popupBgSkn', () => {
        return this._popupBgSkn;
      });
      defineSetter(this, 'popupBgSkn', value => {
        this._popupBgSkn = value;
      });
      defineGetter(this, 'flxRegisterDevicePopupSkn', () => {
        return this._flxRegisterDevicePopupSkn;
      });
      defineSetter(this, 'flxRegisterDevicePopupSkn', value => {
        this._flxRegisterDevicePopupSkn = value;
      });
      defineGetter(this, 'flxPopupHeaderSeparatorSkn', () => {
        return this._flxPopupHeaderSeparatorSkn;
      });
      defineSetter(this, 'flxPopupHeaderSeparatorSkn', value => {
        this._flxPopupHeaderSeparatorSkn = value;
      });
      defineGetter(this, 'btnYesSkn', () => {
        return this._btnYesSkn;
      });
      defineSetter(this, 'btnYesSkn', value => {
        this._btnYesSkn = value;
      });
      defineGetter(this, 'btnNoSkn', () => {
        return this._btnNoSkn;
      });
      defineSetter(this, 'btnNoSkn', value => {
        this._btnNoSkn = value;
      });
      defineGetter(this, 'lblClosePopupSkn', () => {
        return this._lblClosePopupSkn;
      });
      defineSetter(this, 'lblClosePopupSkn', value => {
        this._lblClosePopupSkn = value;
      });
      defineGetter(this, 'lblRegisterDevicePopupHeaderSkn', () => {
        return this._lblRegisterDevicePopupHeaderSkn;
      });
      defineSetter(this, 'lblRegisterDevicePopupHeaderSkn', value => {
        this._lblRegisterDevicePopupHeaderSkn = value;
      });
      defineGetter(this, 'lblRegisterDevicePopupBodySkn', () => {
        return this._lblRegisterDevicePopupBodySkn;
      });
      defineSetter(this, 'lblRegisterDevicePopupBodySkn', value => {
        this._lblRegisterDevicePopupBodySkn = value;
      });
      defineGetter(this, 'lblPopupInfoSkn', () => {
        return this._lblPopupInfoSkn;
      });
      defineSetter(this, 'lblPopupInfoSkn', value => {
        this._lblPopupInfoSkn = value;
      });
      defineGetter(this, 'imgInfoSrc', () => {
        return this._imgInfoSrc;
      });
      defineSetter(this, 'imgInfoSrc', value => {
        this._imgInfoSrc = value;
      });
      defineGetter(this, 'fontIconLastStatusActiveTxt', () => {
        return this._fontIconLastStatusActiveTxt;
      });
      defineSetter(this, 'fontIconLastStatusActiveTxt', value => {
        this._fontIconLastStatusActiveTxt = value;
      });
      defineGetter(this, 'fontIconLastStatusSuspendTxt', () => {
        return this._fontIconLastStatusSuspendTxt;
      });
      defineSetter(this, 'fontIconLastStatusSuspendTxt', value => {
        this._fontIconLastStatusSuspendTxt = value;
      });
      defineGetter(this, 'lblCloseMsgTxt', () => {
        return this._lblCloseMsgTxt;
      });
      defineSetter(this, 'lblCloseMsgTxt', value => {
        this._lblCloseMsgTxt = value;
      });
      defineGetter(this, 'lblClosePopupTxt', () => {
        return this._lblClosePopupTxt;
      });
      defineSetter(this, 'lblClosePopupTxt', value => {
        this._lblClosePopupTxt = value;
      });
      defineGetter(this, 'fontIconMsgTypeErrTxt', () => {
        return this._fontIconMsgTypeErrTxt;
      });
      defineSetter(this, 'fontIconMsgTypeErrTxt', value => {
        this._fontIconMsgTypeErrTxt = value;
      });
      defineGetter(this, 'fontIconMsgTypeSuccessTxt', () => {
        return this._fontIconMsgTypeSuccessTxt;
      });
      defineSetter(this, 'fontIconMsgTypeSuccessTxt', value => {
        this._fontIconMsgTypeSuccessTxt = value;
      });
      defineGetter(this, 'fontIconDeviceTxt', () => {
        return this._fontIconDeviceTxt;
      });
      defineSetter(this, 'fontIconDeviceTxt', value => {
        this._fontIconDeviceTxt = value;
      });
      defineGetter(this, 'btnRegisterNewDeviceTxt', () => {
        return this._btnRegisterNewDeviceTxt;
      });
      defineSetter(this, 'btnRegisterNewDeviceTxt', value => {
        this._btnRegisterNewDeviceTxt = value;
      });
      defineGetter(this, 'btnYesTxt', () => {
        return this._btnYesTxt;
      });
      defineSetter(this, 'btnYesTxt', value => {
        this._btnYesTxt = value;
      });
      defineGetter(this, 'btnNoTxt', () => {
        return this._btnNoTxt;
      });
      defineSetter(this, 'btnNoTxt', value => {
        this._btnNoTxt = value;
      });
      defineGetter(this, 'lblMsgHeaderTxtActivationCodeCreated', () => {
        return this._lblMsgHeaderTxtActivationCodeCreated;
      });
      defineSetter(this, 'lblMsgHeaderTxtActivationCodeCreated', value => {
        this._lblMsgHeaderTxtActivationCodeCreated = value;
      });
      defineGetter(this, 'lblMsgTxtReceivePushNotifications', () => {
        return this._lblMsgTxtReceivePushNotifications;
      });
      defineSetter(this, 'lblMsgTxtReceivePushNotifications', value => {
        this._lblMsgTxtReceivePushNotifications = value;
      });
      defineGetter(this, 'lblMsgTxtNotReceivePushNotifications', () => {
        return this._lblMsgTxtNotReceivePushNotifications;
      });
      defineSetter(this, 'lblMsgTxtNotReceivePushNotifications', value => {
        this._lblMsgTxtNotReceivePushNotifications = value;
      });
      defineGetter(this, 'lblMsgTxtActivationCodeSent', () => {
        return this._lblMsgTxtActivationCodeSent;
      });
      defineSetter(this, 'lblMsgTxtActivationCodeSent', value => {
        this._lblMsgTxtActivationCodeSent = value;
      });
      defineGetter(this, 'lblMsgTxtRequestDeniedErr', () => {
        return this._lblMsgTxtRequestDeniedErr;
      });
      defineSetter(this, 'lblMsgTxtRequestDeniedErr', value => {
        this._lblMsgTxtRequestDeniedErr = value;
      });
      defineGetter(this, 'lblMsgTxtRequestTimedOutErr', () => {
        return this._lblMsgTxtRequestTimedOutErr;
      });
      defineSetter(this, 'lblMsgTxtRequestTimedOutErr', value => {
        this._lblMsgTxtRequestTimedOutErr = value;
      });
      defineGetter(this, 'lblRegisterDeviceHeaderTxt', () => {
        return this._lblRegisterDeviceHeaderTxt;
      });
      defineSetter(this, 'lblRegisterDeviceHeaderTxt', value => {
        this._lblRegisterDeviceHeaderTxt = value;
      });
      defineGetter(this, 'lblRegisteredOnTxt', () => {
        return this._lblRegisteredOnTxt;
      });
      defineSetter(this, 'lblRegisteredOnTxt', value => {
        this._lblRegisteredOnTxt = value;
      });
      defineGetter(this, 'lblLastStatusActiveTxt', () => {
        return this._lblLastStatusActiveTxt;
      });
      defineSetter(this, 'lblLastStatusActiveTxt', value => {
        this._lblLastStatusActiveTxt = value;
      });
      defineGetter(this, 'lblLastStatusSuspendTxt', () => {
        return this._lblLastStatusSuspendTxt;
      });
      defineSetter(this, 'lblLastStatusSuspendTxt', value => {
        this._lblLastStatusSuspendTxt = value;
      });
      defineGetter(this, 'lblSuspendDeviceSuspendTxt', () => {
        return this._lblSuspendDeviceSuspendTxt;
      });
      defineSetter(this, 'lblSuspendDeviceSuspendTxt', value => {
        this._lblSuspendDeviceSuspendTxt = value;
      });
      defineGetter(this, 'lblSuspendDeviceUnsuspendTxt', () => {
        return this._lblSuspendDeviceUnsuspendTxt;
      });
      defineSetter(this, 'lblSuspendDeviceUnsuspendTxt', value => {
        this._lblSuspendDeviceUnsuspendTxt = value;
      });
      defineGetter(this, 'lblRemoveDeviceTxt', () => {
        return this._lblRemoveDeviceTxt;
      });
      defineSetter(this, 'lblRemoveDeviceTxt', value => {
        this._lblRemoveDeviceTxt = value;
      });
      defineGetter(this, 'lblNoRecordsTxt', () => {
        return this._lblNoRecordsTxt;
      });
      defineSetter(this, 'lblNoRecordsTxt', value => {
        this._lblNoRecordsTxt = value;
      });
      defineGetter(this, 'popupLoadingBgSkn', () => {
        return this._popupLoadingBgSkn;
      });
      defineSetter(this, 'popupLoadingBgSkn', value => {
        this._popupLoadingBgSkn = value;
      });
      defineGetter(this, 'flxPopupLoadingSkn', () => {
        return this._flxPopupLoadingSkn;
      });
      defineSetter(this, 'flxPopupLoadingSkn', value => {
        this._flxPopupLoadingSkn = value;
      });
      defineGetter(this, 'ldlPopupTextSkn', () => {
        return this._ldlPopupTextSkn;
      });
      defineSetter(this, 'ldlPopupTextSkn', value => {
        this._ldlPopupTextSkn = value;
      });
      defineGetter(this, 'imgLoadingSrc', () => {
        return this._imgLoadingSrc;
      });
      defineSetter(this, 'imgLoadingSrc', value => {
        this._imgLoadingSrc = value;
      });
      defineGetter(this, 'lblRegisterDevicePopupHeaderTxtRegisterNewDevice', () => {
        return this._lblRegisterDevicePopupHeaderTxtRegisterNewDevice;
      });
      defineSetter(this, 'lblRegisterDevicePopupHeaderTxtRegisterNewDevice', value => {
        this._lblRegisterDevicePopupHeaderTxtRegisterNewDevice = value;
      });
      defineGetter(this, 'lblPopupInfoTxtNotReceivePushNotificationsSuspend', () => {
        return this._lblPopupInfoTxtNotReceivePushNotificationsSuspend;
      });
      defineSetter(this, 'lblPopupInfoTxtNotReceivePushNotificationsSuspend', value => {
        this._lblPopupInfoTxtNotReceivePushNotificationsSuspend = value;
      });
      defineGetter(this, 'lblPopupInfoTxtNotReceivePushNotificationsRemove', () => {
        return this._lblPopupInfoTxtNotReceivePushNotificationsRemove;
      });
      defineSetter(this, 'lblPopupInfoTxtNotReceivePushNotificationsRemove', value => {
        this._lblPopupInfoTxtNotReceivePushNotificationsRemove = value;
      });
      defineGetter(this, 'lblPopupInfoTxtNotReceivePushNotificationsSuspendOnlyDevice', () => {
        return this._lblPopupInfoTxtNotReceivePushNotificationsSuspendOnlyDevice;
      });
      defineSetter(this, 'lblPopupInfoTxtNotReceivePushNotificationsSuspendOnlyDevice', value => {
        this._lblPopupInfoTxtNotReceivePushNotificationsSuspendOnlyDevice = value;
      });
      defineGetter(this, 'lblPopupInfoTxtNotReceivePushNotificationsRemoveOnlyDevice', () => {
        return this._lblPopupInfoTxtNotReceivePushNotificationsRemoveOnlyDevice;
      });
      defineSetter(this, 'lblPopupInfoTxtNotReceivePushNotificationsRemoveOnlyDevice', value => {
        this._lblPopupInfoTxtNotReceivePushNotificationsRemoveOnlyDevice = value;
      });
      defineGetter(this, 'ldlPopupTextTxt', () => {
        return this._ldlPopupTextTxt;
      });
      defineSetter(this, 'ldlPopupTextTxt', value => {
        this._ldlPopupTextTxt = value;
      });
    },

    preShowDeviceRegistration: function(){
      this.setTextAndSkinFromProperties();
      this.resetUI();
      this.setFlowActions();  
      this.fetchDevices();
    },

    updateComponentUI: function(context){
      kony.print(context+"");
      if(context){
        if(context.progressBar){
          this.changeProgressBarState(context.progressBar.isLoading);
        }
        if(context.error){
          let msg = {head: "Failed to perform operation", body: context.error.message}
          this.addTopSuccessErrMsg(msg, false);
        }
        if(context.errmsg && context.errmsg =='Failed to send push notification to the device'){
          let msg = {head: "Unable to perform this operation, please contact the bank", body: 'Please contact the bank to perform this operation as the only registered device is suspended'}
          this.addTopSuccessErrMsg(msg, false);
        }
        if(context.operationName){
          if(context.operationName === this._operationName1 || context.operationName === this._operationName2 || context.operationName === this._operationName3){
            if(context.device_auth_req_id)
              this.startFetchCIBAStatus(context);
            else
              this.fetchDevices();
          }
          else if(context.operationName === this._operationName4){
            this.stopFetchCIBAStatus(context);
          }
        }
        if(context.devices){
          this.setDevices(context.devices);
        }
      }
    },

    setFlowActions: function(){
      let scopeObj = this;
      this.view.btnRegisterNewDevice.onClick = function(){
        scopeObj.currentOperationName = scopeObj._operationName3;
        scopeObj.showPopup();
      };

      this.view.flxCloseMsg.onClick = function(){
        scopeObj.view.flxTopMsg.setVisibility(false);
      };
    },

    resetUI: function(){
      this.view.flxMainContainer.setVisibility(true);
      this.view.flxTopMsg.setVisibility(false);
      this.view.segRegisteredDevices.setData([]);
    },

    /**
     * Method to change the the progress bar state
   	 * @param {Object} isLoading- Consists of the loading indicator status.
    */
    changeProgressBarState: function(isLoading) {
      if (isLoading) {
        FormControllerUtility.showProgressBar(this.view);
      } else {
        FormControllerUtility.hideProgressBar(this.view);
      }
    },

    setDevices: function(devices){
      let self = this, segData = [];
      this.totalActiveDevices = 0;
      segData = devices.map(function(data){
        let lblSuspendDevice = "", lblLastStatus = "", fontIconLastStatus = { text: "", skin: ""};
        if(data.status === "ACTIVE"){
          self.totalActiveDevices++;
          lblSuspendDevice = self.getStringFromi18n(self._lblSuspendDeviceSuspendTxt);
          lblLastStatus = self.getStringFromi18n(self._lblLastStatusActiveTxt);
          fontIconLastStatus.text = self.getStringFromi18n(self._fontIconLastStatusActiveTxt);
          fontIconLastStatus.skin = self._fontIconLastStatusActiveSkn;
        }
        else{
          lblSuspendDevice = self.getStringFromi18n(self._lblSuspendDeviceUnsuspendTxt);
          lblLastStatus = self.getStringFromi18n(self._lblLastStatusSuspendTxt);
          fontIconLastStatus.text = self.getStringFromi18n(self._fontIconLastStatusSuspendTxt);
          fontIconLastStatus.skin = self._fontIconLastStatusSuspendSkn;
        }
        let formattedDate = CommonUtilities.getDateAndTime(data.registeredOn).substring(0,10);
        return {
          deviceId: data.id,
          deviceStatus: data.status,
          fontIconDevice:{
            text: self.getStringFromi18n(self._fontIconDeviceTxt),
            skin: self._fontIconDeviceSkn
          },
          lblDeviceName: {
            text: data.friendlyName,
            skin: self._lblDeviceNameSkn
          },
          lblRegisteredOn: {
            text: self.getStringFromi18n(self._lblRegisteredOnTxt) + ": " + formattedDate,
            skin: self._lblRegisteredOnSkn
          },
          lblSuspendDevice: {
            text: lblSuspendDevice,
            skin: self._lblSuspendDeviceSkn
          },
          lblRemoveDevice: {
            text: self.getStringFromi18n(self._lblRemoveDeviceTxt),
            skin: self._lblRemoveDeviceSkn
          },
          lblLastStatus: {
            text: lblLastStatus,
            skin: self._lblLastStatusSkn
          },
          fontIconLastStatus: {
            text: fontIconLastStatus.text,
            skin: fontIconLastStatus.skin
          },
          flxSuspendDevice: {
            onClick: function(){
              self.currentSelectedRowItems = self.view.segRegisteredDevices.selectedRowItems[0];
              self.currentOperationName = self._operationName1;
              self.showPopup();
            }
          },
          flxRemoveDevice: {
            onClick: function(){
              self.currentSelectedRowItems = self.view.segRegisteredDevices.selectedRowItems[0];
              self.currentOperationName = self._operationName2;
              self.showPopup();
            }
          }
        };
      });
      this.setSegmentData(segData, this.view.segRegisteredDevices, this.view.flxlNoRecords);
      this.view.forceLayout();
    },

    setSegmentData: function(data, segment, flxNoResult){
      flxNoResult.setVisibility(data.length === 0);
      segment.setVisibility(data.length > 0);
      segment.setData(data);
      this.view.forceLayout();
    },

    getServiceCallParam: function(operationName){
      let param = {};
      if(operationName === this._operationName1){
        param = {
          "id": this.currentSelectedRowItems.deviceId,
          "serviceName": this.currentSelectedRowItems.deviceStatus === "ACTIVE" ? "SUSPEND_DEVICE" : "UNSUSPEND_DEVICE"
        };
      } 
      else if(operationName === this._operationName2){
        param = {
          "id": this.currentSelectedRowItems.deviceId,
          "serviceName": "REVOKE_DEVICE"
        };
      }
      else if(operationName === this._operationName3){
        param = {
          "serviceName":"REGISTER_NEW_DEVICE"
        };
      }
      return param;
    },

    getPopupText: function(operationName, deviceItems){
      let msg = {head: "", body: "", info: ""};
      let operationText = "";
      if(operationName === this._operationName1){
        if(deviceItems && deviceItems.deviceStatus && deviceItems.deviceStatus === "ACTIVE"){
          operationText = "suspend";
          if(this.totalActiveDevices>1){
            msg.info = this.getStringFromi18n(this._lblPopupInfoTxtNotReceivePushNotificationsSuspend);
          }
          else{
            msg.info = this.getStringFromi18n(this._lblPopupInfoTxtNotReceivePushNotificationsSuspendOnlyDevice);
          }
        }
        else{
          operationText = "unsuspend";
        }
      }
      else if(operationName === this._operationName2){
        operationText = "remove";
        if(this.totalActiveDevices>1){
          msg.info = this.getStringFromi18n(this._lblPopupInfoTxtNotReceivePushNotificationsRemove);
        }
        else{
          msg.info = this.getStringFromi18n(this._lblPopupInfoTxtNotReceivePushNotificationsRemoveOnlyDevice);
        }
      }
      else if(operationName === this._operationName3){
        msg.head = this.getStringFromi18n(this._lblRegisterDevicePopupHeaderTxtRegisterNewDevice);
        msg.body = this.getStringFromi18n("i18n.DeviceRegistration.AreUSure") + "register a new device?";
      }
      if(msg.head === "")
        msg.head = operationText.charAt(0).toUpperCase() + operationText.slice(1) + " Device";
      if(msg.body === "")
        msg.body = this.getStringFromi18n("i18n.DeviceRegistration.AreUSure") + operationText +" this device?";
      return msg;
    },

    showPopup: function(){
      let popupTxt = this.getPopupText(this.currentOperationName, this.currentSelectedRowItems);
      this.addConfirmationPopup(popupTxt);
      this.view.forceLayout();
    },

    removeConfirmationPopup: function(){
      var currform = kony.application.getCurrentForm();
      if (currform.deviceRegistrationPopup) {
        currform.deviceRegistrationPopup.setVisibility(false);
        currform.remove(currform.deviceRegistrationPopup);
      }
      this.view.forceLayout();
    },

    addConfirmationPopup: function(popupTxt){
      let self = this;
      let breakpoint = kony.application.getCurrentBreakpoint();
      let currform = kony.application.getCurrentForm();
      let deviceRegistrationPopup = new com.temenos.infinity.sca.deviceRegistrationPopup({
        "height": "100%",
        "id": "deviceRegistrationPopup",
        "appName" : "ResourcesHIDMA",
        "isVisible": true,
        "left": "0dp",
        "masterType": constants.MASTER_TYPE_USERWIDGET,
        "isModalContainer": false,
        "skin": self._popupBgSkn,
        "top": "0dp",
        "width": "100%",
        "zIndex": 1001,
        "overrides": {
          "deviceRegistrationPopup": {
            "right": "viz.val_cleared",
            "bottom": "viz.val_cleared",
            "minWidth": "viz.val_cleared",
            "minHeight": "viz.val_cleared",
            "maxWidth": "viz.val_cleared",
            "maxHeight": "viz.val_cleared",
            "centerX": "viz.val_cleared",
            "centerY": "viz.val_cleared"
          },
          "flxRegisterDevicePopup": {
            "skin": self._flxRegisterDevicePopupSkn,
            "width": breakpoint <= 1024 ? "70%" : "40%",
            "centerY": breakpoint <= 1024 ? "50%" : "30%"
          },
          "flxPopupHeaderSeparator": {
            "skin": self._flxPopupHeaderSeparatorSkn
          },
          "lblRegisterDevicePopupHeader": {
            "text": popupTxt.head,
            "skin": self._lblRegisterDevicePopupHeaderSkn
          },
          "lblRegisterDevicePopupBody": {
            "text": popupTxt.body,
            "skin": self._lblRegisterDevicePopupBodySkn
          },
          "imgInfo": {
            "src": self._imgInfoSrc
          },
          "lblPopupInfo": {
            "text": popupTxt.info,
            "skin": self._lblPopupInfoSkn
          },
          "flxRegisterDevicePopupInfo": {
            "isVisible": popupTxt.info.length>0
          },
          "lblClosePopup": {
            "text": self.getStringFromi18n(self._lblClosePopupTxt),
            "skin": self._lblClosePopupSkn
          },
          "flxClosePopup": {
            "onClick": function(){
              self.removeConfirmationPopup();
            }
          },
          "btnNo": {
            "text": self.getStringFromi18n(self._btnNoTxt),
            "skin": self._btnNoSkn,
            "onClick": function(){
              self.removeConfirmationPopup();
            }
          },
          "btnYes":{
            "text": self.getStringFromi18n(self._btnYesTxt),
            "skin": self._btnYesSkn,
            "onClick": function(){
              self.removeConfirmationPopup();
              let param = self.getServiceCallParam(self.currentOperationName);
              self.serviceCallBasedOnOperation(self.currentOperationName, param);
            }
          },
        }
      }, {
        "overrides": {}
      }, {
        "overrides": {}
      });
      currform.add(deviceRegistrationPopup);
      if(currform.flxHeader.info.frame && currform.flxFooter.info.frame && currform.flxContainer.info.frame)
        currform.deviceRegistrationPopup.height = currform.flxHeader.info.frame.height + currform.flxFooter.info.frame.height + currform.flxContainer.info.frame.height + "dp";
      currform.scrollToWidget(currform.flxHeader);
      currform.forceLayout();
    },

    showSuccessMsg: function(msgHead, msg){
      this.view.fontIconMsgType.skin = this._fontIconMsgTypeSuccessSkn;
      this.view.fontIconMsgType.text = this.getStringFromi18n(this._fontIconMsgTypeSuccessTxt);
      this.view.lblMsgHeader.text = msgHead;
      this.view.lblMsg.text = msg;
      this.view.flxTopMsg.setVisibility(true);
      this.view.forceLayout();
    },

    showErrMsg: function(msgHead, msg){
      this.view.fontIconMsgType.skin = this._fontIconMsgTypeErrSkn;
      this.view.fontIconMsgType.text = this.getStringFromi18n(this._fontIconMsgTypeErrTxt);
      this.view.lblMsgHeader.text = msgHead;
      this.view.lblMsg.text = msg;
      this.view.flxTopMsg.setVisibility(true);
      this.view.forceLayout();
    },

    getSuccessErrMsgText: function(authStatus, operationName, deviceItems){
      let msg = {head: "", body: ""}, operationText = {noun: "", verb: ""};
      if(operationName === this._operationName1){
        if(deviceItems.deviceStatus && deviceItems.deviceStatus === "ACTIVE"){
          operationText = {noun: "suspend", verb: "suspended"};
          msg.body = this.getStringFromi18n(this._lblMsgTxtNotReceivePushNotifications);
        }
        else{
          operationText = {noun: "unsuspend", verb: "unsuspended"};
          msg.body = this.getStringFromi18n(this._lblMsgTxtReceivePushNotifications);
        }
      }
      else if(operationName === this._operationName2){
        operationText = {noun: "remove", verb: "removed"};
        msg.body = this.getStringFromi18n(this._lblMsgTxtNotReceivePushNotifications);
      }
      else if(operationName === this._operationName3){
        operationText = {noun: "register", verb: "registered"};
        let userManager = applicationManager.getUserPreferencesManager();
        let phone = userManager.getEntitlementPhoneNumbers()
        let maskedPhone;
        if (phone.length > 1) {
          phone.forEach((item) => {
            if (item.isPrimary ==='true') {
              maskedPhone = item.phoneNumber
            }
          });
        } else {
          maskedPhone = phone[0].phoneNumber;
        }
        msg.body = this.getStringFromi18n(this._lblMsgTxtActivationCodeSent);
        if(msg.body.indexOf("."))
          msg.body = msg.body.substring(0,msg.body.indexOf(".")) + " " + maskedPhone + msg.body.substring(msg.body.indexOf("."));
      }

      if(authStatus === "accept"){
        if(operationName === this._operationName3){
          msg.head = this.getStringFromi18n(this._lblMsgHeaderTxtActivationCodeCreated);
        }
        else{
          let deviceName = deviceItems && deviceItems.lblDeviceName.text;
          msg.head = "You have " + operationText.verb + " ‘"+ deviceName + "’ device successfully.";
        }
      }
      else if(authStatus === "deny"){
        msg.body = this.getStringFromi18n(this._lblMsgTxtRequestDeniedErr);
        msg.head = "Failed to "+ operationText.noun +" device";
      }
      else if(authStatus === "UNKNOWN"){
        msg.body = this.getStringFromi18n(this._lblMsgTxtRequestTimedOutErr);
        msg.head = "Failed to "+ operationText.noun +" device";
      }
      return msg;
    },
    
    addTopSuccessErrMsg: function(msg, isSuccess){
      let self = this;
      let currform = kony.application.getCurrentForm();
      var topMessage = new com.temenos.infinity.sca.topMessage({
        "appName" : "ResourcesHIDMA",
        "autogrowMode": kony.flex.AUTOGROW_HEIGHT,
        "id": "topMessage",
        "isVisible": true,
        "left": "0dp",
        "masterType": constants.MASTER_TYPE_USERWIDGET,
        "isModalContainer": false,
        "skin": "slFbox",
        "top": "0dp",
        "width": "100%",
        "zIndex": 1,
        "overrides": {
          "topMessage": {
            "right": "viz.val_cleared",
            "bottom": "viz.val_cleared",
            "height": "viz.val_cleared",
            "minWidth": "viz.val_cleared",
            "minHeight": "viz.val_cleared",
            "maxWidth": "viz.val_cleared",
            "maxHeight": "viz.val_cleared",
            "centerX": "viz.val_cleared",
            "centerY": "viz.val_cleared"
          },
          "fontIconMsgType": {
            "text": isSuccess? self.getStringFromi18n(self._fontIconMsgTypeSuccessTxt): self.getStringFromi18n(self._fontIconMsgTypeErrTxt),
            "skin": isSuccess? self._fontIconMsgTypeSuccessSkn: self._fontIconMsgTypeErrSkn
          },
          "lblMsgHeader": {
            "text": msg.head,
            "skin": self._lblMsgHeaderSkn
          },
          "lblMsg": {
            "text": msg.body,
            "skin": self._lblMsgSkn
          },
          "lblclosemsg": {
            "text": self.getStringFromi18n(self._lblCloseMsgTxt),
            "skin": self._lblCloseMsgSkn
          },
          "flxCloseMsg": {
            "onClick": function(){
              if(currform.topMessage)
                currform.remove(currform.topMessage);
              if(currform.flxTopMsg.topMessage)
                currform.flxTopMsg.remove(currform.flxTopMsg.topMessage);
              currform.flxTopMsg.setVisibility(false);
              currform.forceLayout();
            }
          }
        }
      }, {
        "overrides": {}
      }, {
        "overrides": {}
      });
      if(currform){
        if(currform.topMessage)
          currform.remove(currform.topMessage);
        if(currform.flxTopMsg){
          if(currform.flxTopMsg.topMessage)
            currform.flxTopMsg.remove(currform.flxTopMsg.topMessage);
          currform.flxTopMsg.add(topMessage);
          currform.flxTopMsg.setVisibility(true);
        }
      }
      // Workaround fix for top msg box not showing on closing msg box using cross icon
      if (currform) {
        if (currform.topMessage) 
          currform.remove(currform.topMessage);
        if (currform.flxTopMsg) {
          if (currform.flxTopMsg.topMessage) 
            currform.flxTopMsg.remove(currform.flxTopMsg.topMessage);
          currform.flxTopMsg.add(topMessage);
          currform.flxTopMsg.setVisibility(true);
        }
      }
      //to show 2nd msg box if top msg box fails
      if(!currform.topMessage && !currform.flxTopMsg.topMessage){
        if(isSuccess)
          this.showSuccessMsg(msg.head, msg.body);
        else
          this.showErrMsg(msg.head, msg.body);
      }
      currform.forceLayout();
    },

    addCIBAStatusLoadingScreen:function(){
      let self = this;
      let breakpoint = kony.application.getCurrentBreakpoint();
      let currform = kony.application.getCurrentForm();
      let Popup = new com.temenos.infinity.sca.Popup({
        "appName" : "ResourcesHIDMA",
        "height": "100%",
        "id": "Popup",
        "isVisible": true,
        "left": "0dp",
        "masterType": constants.MASTER_TYPE_USERWIDGET,
        "isModalContainer": true,
        "skin": self._popupLoadingBgSkn,
        "top": "0dp",
        "width": "100%",
        "zIndex": 1001,
        "overrides": {
          "Popup": {
            "right": "viz.val_cleared",
            "bottom": "viz.val_cleared",
            "minWidth": "viz.val_cleared",
            "minHeight": "viz.val_cleared",
            "maxWidth": "viz.val_cleared",
            "maxHeight": "viz.val_cleared",
            "centerX": "viz.val_cleared",
            "centerY": "viz.val_cleared"
          },
          "flxPopup": {
            "skin": self._flxPopupLoadingSkn,
            "centerY": breakpoint <= 1024 ? "50%" : "30%"
          },
          "imgLoading": {
            "src": self._imgLoadingSrc
          },
          "ldlPopupText": {
            "text": self.getStringFromi18n(self._ldlPopupTextTxt),
            "skin": self._ldlPopupTextSkn
          }
        }
      }, {
        "overrides": {}
      }, {
        "overrides": {}
      });
      Popup.headingtext = self.getStringFromi18n(self._ldlPopupTextTxt);
      currform.add(Popup);
      if(currform.flxHeader.info.frame && currform.flxFooter.info.frame && currform.flxContainer.info.frame)
        currform.Popup.height = currform.flxHeader.info.frame.height + currform.flxFooter.info.frame.height + currform.flxContainer.info.frame.height + "dp";
      currform.scrollToWidget(currform.flxHeader);
      currform.forceLayout();
    },

    removeCIBAStatusLoadingScreen:function(){
      var currform = kony.application.getCurrentForm();
      if (currform.Popup) {
        currform.Popup.setVisibility(false);
        currform.remove(currform.Popup);
      }
      this.view.forceLayout();
    },

    startFetchCIBAStatus : function(data){
      this.currentOperationName = data.operationName;
      this.addCIBAStatusLoadingScreen();
      var scopeObj = this;
      this.startTime = new Date().getTime();
      kony.timer.schedule("cibatimer", function(){
        scopeObj.fetchCIBAStatus(data.device_auth_req_id);
      }, 20, true);
    },

    stopFetchCIBAStatus: function(data) {
      let currentTime = new Date().getTime(), msg;
      if(data && data.ciba_status === "accept"){
        kony.timer.cancel("cibatimer");
        this.removeCIBAStatusLoadingScreen();
        this.serviceCallBasedOnOperation(this.currentOperationName, {"device_auth_req_id": data.auth_req_id});
        msg = this.getSuccessErrMsgText(data.ciba_status, this.currentOperationName, this.currentSelectedRowItems);
        this.addTopSuccessErrMsg(msg, true);
      }
      // cancel after 2 minutes
      else if(currentTime - this.startTime >  120000 || data.ciba_status === "deny"){
        this.removeCIBAStatusLoadingScreen();
        kony.timer.cancel("cibatimer");  
        msg = this.getSuccessErrMsgText(data.ciba_status, this.currentOperationName, this.currentSelectedRowItems);
        this.addTopSuccessErrMsg(msg, false);
      }
    },

    fetchCIBAStatus : function(authReqId){
      var param = {
        "auth_req_id" : authReqId
      };
      this.deviceRegistrationDAO.deviceRegistrationOperations(this._objSeviceName4, this._objName4, this._operationName4, param, this.updateComponentUI);
      //this.stopFetchCIBAStatus("");
    },

    fetchDevices: function() {
      this.view.segRegisteredDevices.setData([]);
      this.deviceRegistrationDAO.deviceRegistrationOperations(this._objSeviceName, this._objName, this._operationName, "", this.updateComponentUI);
    },

    updateMyDevice: function(param) {
      this.deviceRegistrationDAO.deviceRegistrationOperations(this._objSeviceName1, this._objName1, this._operationName1, param, this.updateComponentUI);
    },

    revokeMyDevice: function(param) {
      this.deviceRegistrationDAO.deviceRegistrationOperations(this._objSeviceName2, this._objName2, this._operationName2, param, this.updateComponentUI);
    },

    registerNewDevice: function(param) {
      this.deviceRegistrationDAO.deviceRegistrationOperations(this._objSeviceName3, this._objName3, this._operationName3, param, this.updateComponentUI);
    },

    serviceCallBasedOnOperation: function(operationName, param) {
      if(operationName === this._operationName1){
        this.updateMyDevice(param);
      } 
      else if(operationName === this._operationName2){
        this.revokeMyDevice(param);
      }
      else if(operationName === this._operationName3){
        this.registerNewDevice(param);
      }
    },

    getStringFromi18n: function(stringValue){
      return  kony.i18n.getLocalizedString(stringValue) ? kony.i18n.getLocalizedString(stringValue) : stringValue;
    },

    setTextAndSkinFromProperties: function(){  
      //Flex Skin
      this.view.flxMainContainer.skin = this._flxMainContainerSkn;
      this.view.flxTopMsgInner.skin = this._flxTopMsgInnerSkn;
      this.view.flxRegisterDevicesHeader.skin = this._flxRegisterDevicesHeaderSkn;
      this.view.flxRegisterDeviceHeaderSeperator = this._flxRegisterDeviceHeaderSeperatorSkn;
      this.view.flxDevices.skin = this._flxDevicesSkn;

      //Btn Skin
      this.view.btnRegisterNewDevice.skin = this._btnRegisterNewDeviceSkn;

      //FontIcon Skin
      this.view.lblCloseMsg.skin = this._lblCloseMsgSkn;

      //Label Skin
      this.view.lblMsgHeader.skin = this._lblMsgHeaderSkn;
      this.view.lblMsg.skin = this._lblMsgSkn;
      this.view.lblRegisterDeviceHeader.skin = this._lblRegisterDeviceHeaderSkn;
      this.view.lblNoRecords.skin = this._lblNoRecordsSkn;

      //Btn Text
      this.view.btnRegisterNewDevice.text = this.getStringFromi18n(this._btnRegisterNewDeviceTxt);

      //FontIcon Text
      this.view.lblCloseMsg.text = this.getStringFromi18n(this._lblCloseMsgTxt);

      //Label Text
      this.view.lblRegisterDeviceHeader.text = this.getStringFromi18n(this._lblRegisterDeviceHeaderTxt);
      this.view.lblNoRecords.text = this.getStringFromi18n(this._lblNoRecordsTxt);
    },

  };
});