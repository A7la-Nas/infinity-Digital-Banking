define(["CommonUtilities","SCAUtility"], function (CommonUtilities, SCAUtility){
  const SDKConstants = {
    "PIN_REQUEST" : 100,
    "OKRA_OTP_GENERATED" : 107,
    "TX_ACCEPTED" : 101,
    "TX_DENIED"   : 102
  };
  const SCAPhoneContext = {
    serviceName: "ADD_NEW_PHONE_NUMBER",
    phoneNumbers: null,
    modifiedByName: null,
    userName: null
  };
  return{
 init : function(){
   var navManager = applicationManager.getNavigationManager();
   var currentForm=navManager.getCurrentForm();
   applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
 },
 frmPreShow : function(){
    this.setPreshowData();
    this.setFlowActions();
   this.setData();
   var navManager = applicationManager.getNavigationManager();
   var currentForm=navManager.getCurrentForm();
   applicationManager.getPresentationFormUtility().logFormName(currentForm);
   applicationManager.getPresentationUtility().dismissLoadingScreen();
   const configurationSvc = kony.sdk.getCurrentInstance().getConfigurationService();
   configurationSvc.getAllClientAppProperties((response) => {
     CommonUtilities.CLIENT_PROPERTIES = {...CommonUtilities.CLIENT_PROPERTIES, ...response};
   });
   if(this.view.sdk){
      this.view.remove(this.view.sdk);
    }
  },
  setPreshowData : function(){
        if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
      this.view.flxMainContainer.top = "56dp";
    }
    else{
      this.view.flxHeader.isVisible = false;
      this.view.flxMainContainer.top = "0dp";
    }
  },
  setData : function(){
    var nav = applicationManager.getNavigationManager();
    var data = nav.getCustomInfo('frmProfileConfirmDetails');
    this.view.lblPhoneNumberValue.text = data.phoneCountryCode+" "+data.phoneNumber;
    this.view.lblContantTypeValue.text = data.type;
    this.view.lblCountryValue.text = data.countryType;
    this.view.lblMarkasPrimaryValue.text = data.isPrimary === "true"?kony.i18n.getLocalizedString("kony.mb.common.AlertYes"):kony.i18n.getLocalizedString("kony.mb.common.AlertNo");
  },
  setFlowActions : function(){
    var scope = this;
    this.view.btnUpdateChanges.onClick = function(){
      //scope.navToList();
      if(CommonUtilities.isSCAEnabled()) {
        scope.addPhoneSCAUtility();
      } else {
      var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    settingsMode.presentationController.addUserPhoneNumber();
     }
    };
	this.view.customHeader.btnRight.onClick = function(){
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
	settingsMod.presentationController.commonFunctionForNavigation("frmProfilePersonalDetails");
    };
    this.view.customHeader.flxBack.onClick = function(){
      var navManager = applicationManager.getNavigationManager();
      navManager.goBack();
    };
  },
  navToList : function(){
  },
  /**
     * AAC-8579: App Phone - SCA
     */
    addPhoneSCAUtility: function(data){
      const userObj = applicationManager.getUserPreferencesManager();
      const settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
      const obj = settingsMode.presentationController.getPhoneBuilderObject();
      let phoneNumbers = [{
        "isPrimary": (obj.isPrimary === "true") ? "1" : "0",
        "phoneNumber": obj.phoneNumber,
        "phoneCountryCode":obj.phoneCountryCode,
        "phoneExtension":obj.phoneExtension,
        "Extension": obj.type
      }];
      phoneNumbers = JSON.stringify(phoneNumbers);
      phoneNumbers = phoneNumbers.replace(/"/g, "'");      
      SCAPhoneContext.phoneNumbers = phoneNumbers;
      SCAPhoneContext.modifiedByName = userObj.getCurrentUserName();
      SCAPhoneContext.userName = userObj.getCurrentUserName();
      this.addPhoneSCA();
    },
    addPhoneSCA: function(){
      const scopeObj = this;
      const currentForm = kony.application.getCurrentForm();
      const userManager = applicationManager.getUserPreferencesManager();
      const userName = userManager.getUserObj().userName;
      const OKRAcontext = SCAPhoneContext.serviceName;
      var HIDApproveSDKManager = require('HIDApproveSDKManager');
      hidApplicationSDKManager = HIDApproveSDKManager.getHIDApproveSDKManager();
      var sdk = hidApplicationSDKManager.getSdkInstance();
      if(currentForm.sdk){
        currentForm.remove(sdk);
      }
      currentForm.add(sdk);
      currentForm.sdk.setVisibility(false);
      currentForm.sdk.generateOCRAOTP(userName, OKRAcontext, function(status, otpJSON) {
        const otp = JSON.parse(otpJSON).otp;
        const context = SCAPhoneContext.serviceName;
        if(SDKConstants.PIN_REQUEST === status) {
          var pinLength = JSON.parse(otpJSON).MAX_LENGTH;
          currentForm.sdk.setVisibility(true);
          currentForm.sdk.showPinDialog(pinLength);
        } else if(SDKConstants.OKRA_OTP_GENERATED === status) {
          currentForm.sdk.hidePinDialog();
          applicationManager.getPresentationUtility().showLoadingScreen();
          const servicePayload = {
            objServiceName: "SCAObjects",
            objName: "SCAUser",
            operationName: "updateMyProfileDetails",
            payload: {
              "serviceName": SCAPhoneContext.serviceName,
              "isMobile": true,
              "otp": otp,
              "context": context,
              "phoneNumbers": SCAPhoneContext.phoneNumbers,
              "modifiedByName": SCAPhoneContext.modifiedByName
            },
            successCallback: scopeObj.addPhoneSCASuccessCallback,
            errorCallback: scopeObj.addPhoneSCAFailureCallback
          };
          SCAUtility.callBackendService(servicePayload);
        }
      });
    },
    addPhoneSCASuccessCallback: function(){
      const dataToDisplay = {
        msgTitle: `Success!`,
        msgDesc: `You have added the phone number successfully.`
      };
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      const currentForm = kony.application.getCurrentForm();
      currentForm.sdk.setVisibility(true);
      currentForm.sdk.showOrHideTxStatus(SDKConstants.TX_ACCEPTED, dataToDisplay);
      currentForm.sdk.setFlowActions(this.addPhoneSuccessNavigation);
    },
    addPhoneSuccessNavigation: function(){
      applicationManager.getPresentationUtility().showLoadingScreen();
      const settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
      settingsMode.presentationController.updatePhoneSCASuccess({"flow":"addsuccess"});
    },
    addPhoneSCAFailureCallback: function(){
      const dataToDisplay = {
        msgTitle: `Failed!`,
        msgDesc: `Phone number not added in Infinity System.`
      };
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      const currentForm = kony.application.getCurrentForm();
      currentForm.sdk.setVisibility(true);
      currentForm.sdk.showOrHideTxStatus(SDKConstants.TX_DENIED, dataToDisplay);
      currentForm.sdk.setFlowActions();
    },
    
  };
 });