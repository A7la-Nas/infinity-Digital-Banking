define(["CommonUtilities", "SCAUtility","OLBConstants"], function (CommonUtilities, SCAUtility, OLBConstants){
  const SDKConstants = {
    "PIN_REQUEST" : 100,
    "OKRA_OTP_GENERATED" : 107,
    "TX_ACCEPTED" : 101,
    "TX_DENIED"   : 102
  };
  const SCAEmailContext = {
    serviceName: "",
    EmailIds: null,
    modifiedByName: null,
    userName: null
  };
  return{
  //timerCounter : 0,
  init : function(){
    var FormValidator = require("FormValidatorManager");
    this.fv = new FormValidator(1);
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
    var scope = this;
    this.view.postShow = function(){
      scope.postShow();
    };
  },
  onNavigate : function(param){
    var scope = this;
    if(param === "add")
      scope.showAddEmail();
    else if(param === "edit")
      scope.showEditEmail();
  },
  frmEnrollLAstNamePreShow : function(){
    this.setFlowAction();
    this.setPreShowData();
    this.fv.submissionView(this.view.btnContinue);
    this.view.tbxEmail.setFocus(true);
    var navigationManager = applicationManager.getNavigationManager();
    var param = navigationManager.getCustomInfo("frmProfileEnterEmailIDFlow");
    this.onNavigate(param);
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    //alert(this.view.imgCheckboxPrimary.src);
    var configManager = applicationManager.getConfigurationManager();
    if(configManager.isCombinedUser === "true"){
      this.view.flxPrimary.isVisible=true;
      this.view.flxPrimary.width="70%";
      this.view.flxPrimary.centerX="50%";
    }else{
      this.view.btnDeleteEmailCombinedUser.isVisible=false;
    }
     const configurationSvc = kony.sdk.getCurrentInstance().getConfigurationService();
    configurationSvc.getAllClientAppProperties((response) => {
      CommonUtilities.CLIENT_PROPERTIES = {...CommonUtilities.CLIENT_PROPERTIES, ...response};
    });
    if(this.view.sdk){
      this.view.remove(this.view.sdk);
    }
  },
  validateEmailTextBox : function(){
    var text = this.view.tbxEmail.text;
    this.fv.checkAndUpdateStatusForNull(0, text);
  },
  showAddEmail : function(){
    var scopeObj = this;
    this.view.tbxEmail.text = "";
    this.view.tbxEmail.setFocus(true);
    this.view.imgCheckboxPrimary.src = "checkboxempty.png";
    this.view.btnDeleteEmail.isVisible = false;
    this.view.btnDeleteEmail.setVisibility(false);
    this.view.flxPrimary.isVisible = true;
    this.isFromEditFlow = false;
    this.view.btnContinue.text = kony.i18n.getLocalizedString("kony.mb.common.continue");
    this.view.btnContinue.bottom="10dp";
    this.view.btnContinue.onClick = function(){
      scopeObj.addUserEmail();
      //scopeObj.navToEmailList("add");
    };
    var configManager = applicationManager.getConfigurationManager();
    if(configManager.isCombinedUser === "true"){
      this.view.btnDeleteEmailCombinedUser.isVisible=false;
    }
    
  },
  showEditEmail : function(){
    var scopeObj = this;
    //this.view.btnDeleteEmail.setVisibility(true);
    this.view.btnContinue.text = kony.i18n.getLocalizedString("kony.mb.Profile.UpdateChanges");
    this.view.btnContinue.bottom="53dp";
    this.view.btnContinue.onClick = function(){
      scopeObj.updateEmail() ;
      //scopeObj.navToEmailList("edit");
    };
    this.view.btnDeleteEmail.isVisible = false;
    this.view.btnDeleteEmail.onClick = function(){
      scopeObj.deleteEmail();
    };
    var navManager = applicationManager.getNavigationManager();
    this.isFromEditFlow = true;
    var data = navManager.getCustomInfo('frmProfileEnterEmailID');
    this.view.tbxEmail.text = data.email;
    this.view.tbxEmail.setFocus(true);
    this.fv.checkAndUpdateStatusForNull(0, data.email);
    if(data.isPrimary === "true"){
      this.view.imgCheckboxPrimary.src = "checkbox.png";
      this.view.flxPrimary.isVisible = false;
      this.view.btnDeleteEmail.isVisible = false;
    }
    else{
      this.view.imgCheckboxPrimary.src = "checkboxempty.png";
      this.view.flxPrimary.isVisible = true;
      this.view.btnDeleteEmail.isVisible = true;
    }
     var configManager = applicationManager.getConfigurationManager();
    if(configManager.isCombinedUser === "true"){
      this.view.btnDeleteEmailCombinedUser.isVisible=true;
      this.view.btnDeleteEmail.isVisible=false;
    }
  },
  postShow : function(){
    if(this.isFromEditFlow !== null && this.isFromEditFlow !== undefined && this.isFromEditFlow === true){
      var navManager = applicationManager.getNavigationManager();
      var data = navManager.getCustomInfo('frmProfileEnterEmailID');
      if(data && data.email)
        this.view.tbxEmail.text = data.email;
      this.view.tbxEmail.setFocus(true);
      this.fv.checkAndUpdateStatusForNull(0, data.email);
    }
    else{
      this.view.tbxEmail.text = "";
      this.view.tbxEmail.setFocus(true);
    }
  },
  setFlowAction  : function(){
    var scopeObj = this;
    this.view.customHeader.flxBack.onClick = function(){
      scopeObj.navToSettings();
    };
    this.view.flxCheckboxPrimary.onClick = function(){
      scopeObj.toggle();
    };
    this.view.customHeader.btnRight.onClick = function(){
      var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
      settingsMod.presentationController.commonFunctionForNavigation("frmProfilePersonalDetails");
    };
    this.view.tbxEmail.onTextChange = function(){
      scopeObj.validateEmailTextBox();
      scopeObj.view.tbxEmail.setFocus(true);
    };
    this.view.btnDeleteEmailCombinedUser.onClick=function(){
      scopeObj.deleteYes();
    };
    this.view.confirmationAlertPopup.onClickflxYes=function(){
      scopeObj.deleteEmail();
    };
    
    this.view.confirmationAlertPopup.onClickflxNo=function(){
      scopeObj.deleteCancel();
    };
    
  },
  toggle : function(){
    if(this.view.imgCheckboxPrimary.src === "checkbox.png"){
      this.view.imgCheckboxPrimary.src = "checkboxempty.png";
    }
    else
      this.view.imgCheckboxPrimary.src = "checkbox.png"
      },
  setPreShowData  : function(){
    this.view.customHeader.btnRight.isVisible = true;
    this.view.flxConfirmationPopUp.isVisible=false;
    var scope = this;
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
      this.view.flxMainContainer.top = "56dp";
    }
    else{
      this.view.flxHeader.isVisible = false;
      this.view.flxMainContainer.top = "0dp";
    }
  },
  updateEmail : function(){
    var email = this.view.tbxEmail.text;
    var isPrimary = "false";
    if(this.view.imgCheckboxPrimary.src === "checkbox.png"){
      isPrimary = "true";
    }
    var navManager = applicationManager.getNavigationManager();
    var data = navManager.getCustomInfo('frmProfileEnterEmailID');
    var index = data.index;
    var id = data.id;
    var updatedData = {
    };
    updatedData.index = index;
    updatedData.email = email;
    updatedData.isPrimary = isPrimary;
    updatedData.id = id;
    this.updateData=updatedData;
    if(CommonUtilities.isSCAEnabled()) {
      this.updateEmailSCAUtility(updatedData);
    }else{
    var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    settingsMode.presentationController.updateEmail(updatedData);
    }
  },
  deleteEmail : function(){
    var email = this.view.tbxEmail.email;
    var navManager = applicationManager.getNavigationManager();
    var data = navManager.getCustomInfo('frmProfileEnterEmailID');
    var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    settingsMode.presentationController.deleteEmail(data);
  },
  addUserEmail : function(){
    var email = this.view.tbxEmail.text;
    var isPrimary = "false";
    if(this.view.imgCheckboxPrimary.src === "checkbox.png"){
      isPrimary = "true";
    }
    var data = {};
    data.email = email;
    data.isPrimary = isPrimary;
    if(CommonUtilities.isSCAEnabled()) {
      this.addEmailSCAUtility(data);
    } else {
    var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    settingsMode.presentationController.addEmail(data);
  }
  },
  navToSettings : function(){
    var navigationManager = applicationManager.getNavigationManager();
    navigationManager.goBack();
  },
  navToEmailList : function(param){
  },
  bindViewError : function(msg){
    applicationManager.getDataProcessorUtility().showToastMessageError(this, msg);
  },
  bindViewSuccess : function(msg){
    applicationManager.getDataProcessorUtility().showToastMessageSuccess(this, msg);
  },
  deleteCancel : function(){
    try{
      this.view.flxConfirmationPopUp.isVisible=false;
    }catch(er){
      kony.print(er);
    }
  },
  deleteYes : function(){
    try{
      this.view.confirmationAlertPopup.lblMessage =kony.i18n.getLocalizedString("kony.mb.confirmationAlertPopup.lblMessage");
      this.view.flxConfirmationPopUp.isVisible=true;
    }catch(er){
      kony.print(er);
    }
  },
  /**
     * AAC-8583: Change+UpdateEmail - SCA
     */
    isEmailAlreadyPresent: function(emailIds, emailAddress){
      for (let i = 0; i < emailIds.length; i++) {
        let existingEmail = emailIds[i].Value;
        if(typeof(existingEmail)=== "string" && typeof(emailAddress)=== "string" && existingEmail.toUpperCase() === emailAddress.toUpperCase()) {
          if(!kony.sdk.isNullOrUndefined(emailIds[i].isTypeBusiness) && emailIds[i].isTypeBusiness == 1 ){ // we should not check with business profile emails as we will be creating emails only for personal account
            return false;
          } else {
            return true;
          }
        }
      }
    },
    addEmailFailureCallBack: function(error){
      var scopeObj = this;
      error=error.errorDetails?error.errorDetails:error;
      if(scaComponent) scopeObj.view.flxMainContainer.remove(scaComponent);
      
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      if (error && error["isServerUnreachable"]){
        applicationManager.getPresentationInterruptHandler().showErrorMessage("postLogin", error);
      } else {        
        this.bindViewError(error);
      }
    },
    addEmailSCAUtility: function(data){
      const validationManager = applicationManager.getValidationUtilManager();
      if(!validationManager.isValidEmail(data.email)){
        var i18nV = applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.OnBoarding.InvalidEmail');
        this.bindViewError(i18nV);
        return;
      }
      const entitlementEmailIds = applicationManager.getUserPreferencesManager().getEntitlementEmailIds();
      if (this.isEmailAlreadyPresent(entitlementEmailIds, data.email)) {
        this.addEmailFailureCallBack(kony.i18n.getLocalizedString("kony.mb.Profile.emailAlreadyExists"));
        return;
      } else {
        if (entitlementEmailIds.length < 3) {
          var emailIds = [{
            "isPrimary": (data.isPrimary === "true") ? "1" : "0",
            "isAlertsRequired": "0",
            "value": data.email,
            "Extension": "Personal"
          }];
          emailIds = JSON.stringify(emailIds);
          emailIds = emailIds.replace(/"/g, "'");
          SCAEmailContext.EmailIds = emailIds;
          SCAEmailContext.modifiedByName = applicationManager.getUserPreferencesManager().getCurrentUserName();
          SCAEmailContext.userName = applicationManager.getUserPreferencesManager().getCurrentUserName();
          SCAEmailContext.serviceName = "ADD_NEW_EMAIL";
          if(CommonUtilities.getSCAType() == '2'){
            //uniken flow
            this.SCAComponentCall(SCAEmailContext);
          }else
            this.addOrUpdateEmailSCA();
        } else{
          this.addEmailFailureCallBack("We currently do not support adding more than three emails for a user");
          return;
        }
      }
    },
      SCAComponentCall : function(emailContext){
      var scopeObj = this;
      scaComponent = new com.temenos.infinity.mb.sca.transactions.uniken.SCAComponent({
        "height": "100%",
        "id": "scaComponent",
        "isVisible": true,
        "left": "-2dp",
        "masterType": constants.MASTER_TYPE_USERWIDGET,
        "isModalContainer": false,
        "top": "0dp",
        "width": "100%",
        "appName": "ResourcesUnikenMA",
        "viewType": "SCAComponent",
        "shouldGroup": false,
      },
      {
        "paddingInPixel": false,
        "overrides": {}
      }, 
      {
        "overrides": {}
      });

      this.view.flxMainContainer.add(scaComponent);
      this.view.flxMainContainer.scaComponent.setVisibility(true);
      this.view.flxMainContainer.scaComponent.verifyUserCredentials(emailContext);
    },
updateEmailSCAUtility: function(updatedData) {
    const validationManager = applicationManager.getValidationUtilManager();
    if (validationManager.isValidEmail(updatedData.email) === false) {
        var i18nV = applicationManager.getPresentationUtility().getStringFromi18n('kony.mb.OnBoarding.InvalidEmail');
        this.bindViewError(i18nV);
        return;
    }
    let emailIds = [{
        "id": updatedData.id,
        "isPrimary": (updatedData.isPrimary === "true") ? "1" : "0",
        //"isAlertsRequired": "0",
        "value": updatedData.email
    }];
    emailIds = JSON.stringify(emailIds);
    emailIds = emailIds.replace(/"/g, "'");
    SCAEmailContext.userName = applicationManager.getUserPreferencesManager().getCurrentUserName();
    SCAEmailContext.EmailIds = emailIds;
    SCAEmailContext.modifiedByName = applicationManager.getUserPreferencesManager().getCurrentUserName();
    SCAEmailContext.serviceName = "UPDATE_EMAIL_ADDRESS";
     if (CommonUtilities.getSCAType() == '2') {
        //uniken flow
        this.SCAComponentCall(SCAEmailContext);
     } else this.addOrUpdateEmailSCA();
},
    addOrUpdateEmailSCA: function(){
      const scopeObj = this;
      const currentForm = kony.application.getCurrentForm();
      const userManager = applicationManager.getUserPreferencesManager();
      const userName = userManager.getUserObj().userName;
      const OKRAcontext = SCAEmailContext.serviceName;
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
        const context = SCAEmailContext.serviceName;
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
              "serviceName": SCAEmailContext.serviceName,
              "isMobile": true,
              "otp": otp,
              "context": context,
              "EmailIds": SCAEmailContext.EmailIds,
              "modifiedByName": SCAEmailContext.modifiedByName
            },
            successCallback: scopeObj.updateEmailSCASuccessCallback,
            errorCallback: scopeObj.updateEmailSCAFailureCallback
          };
          SCAUtility.callBackendService(servicePayload);          
        }
      });
    },
    updateEmailSCASuccessCallback: function(){
      let dataToDisplay = {};
      if(SCAEmailContext.serviceName === "ADD_NEW_EMAIL"){
        dataToDisplay = {
          msgTitle: `Success!`,
          msgDesc: `You have created the email ID successfully.`
        };
      } else {
        dataToDisplay = {
          msgTitle: `Success!`,
          msgDesc: `You have updated the email ID successfully.`
        };
      }
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      const currentForm = kony.application.getCurrentForm();
      currentForm.sdk.setVisibility(true);
      currentForm.sdk.showOrHideTxStatus(SDKConstants.TX_ACCEPTED, dataToDisplay);
      currentForm.sdk.setFlowActions(this.emailSuccessNavigation);
      /*var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
      if(this.updateData.context==="update")
      settingsMode.presentationController.updateEmail(this.updateData);
       if(this.updateData.context==="add")
      settingsMode.presentationController.addEmail(this.updateData);*/
    },
    emailSuccessNavigation: function(){
      var scopeObj = this;
      if(scaComponent) scopeObj.view.flxMainContainer.remove(scaComponent);

      applicationManager.getPresentationUtility().showLoadingScreen();
      let data = "";
      data = SCAEmailContext.serviceName === "ADD_NEW_EMAIL" ? "addsuccess" : "updatesuccess";
      const settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
      settingsMode.presentationController.emailSCASuccess(data);
    },
    updateEmailSCAFailureCallback: function(){
      let dataToDisplay = {};
      if(SCAEmailContext.serviceName === "ADD_NEW_EMAIL"){
        dataToDisplay = {
          msgTitle: `Failed!`,
          msgDesc: `Email ID not added in Infinity System`
        };
      } else {
        dataToDisplay = {
          msgTitle: `Failed!`,
          msgDesc: `Email ID not updated in Infinity System`
        };
      }
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      const currentForm = kony.application.getCurrentForm();
      currentForm.sdk.setVisibility(true);
      currentForm.sdk.showOrHideTxStatus(SDKConstants.TX_DENIED, dataToDisplay);
      currentForm.sdk.setFlowActions();
    },

  };

});