define({
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"NO",currentForm);
  },
  preShow:function(){
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      		this.view.flxHeader.isVisible = true;
    	}
    	else{
      		this.view.flxHeader.isVisible = false;
   		 }
    //this.flexView(1);
    this.view.btnSend.onClick = this.onClickSend;
    this.view.customHeader.btnRight.onClick = this.onCancelClick;
  },
  onCancelClick : function(){
    var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
    authModule.presentationController.navigateToLogin();
  },
  setFormUI : function(mfaResponse){
    var customerCommunicationInfo = mfaResponse.MFAAttributes.customerCommunication;
    this.setCustomerCommunicationInfo(customerCommunicationInfo);
    this.view.forceLayout();
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  setFormUIForTransfers : function(){
    this.view.flxNewDevice.setVisibility(false);
    this.view.flxDeviceRegistration.setVisibility(false);
    this.view.lblLetsAuthenticateTransaction.setVisibility(true);
  },
  setFormUIForProfile : function(){
    this.view.flxNewDevice.setVisibility(false);
    this.view.flxDeviceRegistration.setVisibility(true);
    var userObj = applicationManager.getUserPreferencesManager();
    var uname = userObj.gettempUserName();
    this.view.lblName = "Hi!! "+uname+" Let's authenticate";
    this.view.lblLetsAuthenticateTransaction.setVisibility(false);
  },
  setFormUIForDeviceRegistration : function(){
    this.view.flxNewDevice.setVisibility(true);
    this.view.flxDeviceRegistration.setVisibility(false);
    var userObj = applicationManager.getUserPreferencesManager();
    var uname = userObj.gettempUserName();
    this.view.lblName = "Hi!! "+uname+" Let's authenticate";
    this.view.lblLetsAuthenticateTransaction.setVisibility(false);
  },
  setCustomerCommunicationInfo : function(customerCommunicationInfo){
    this.view.lbxRegisteredModePhone.masterData = this.setDataForPhoneListBox(customerCommunicationInfo.phone);
    this.view.lbxRegisteredModeEmail.masterData = this.setDataForEmailListBox(customerCommunicationInfo.email);
    this.view.lbxRegisteredModePhone.selectedKey = this.view.lbxRegisteredModePhone.masterData[0][0];
    this.view.lbxRegisteredModeEmail.selectedKey = this.view.lbxRegisteredModeEmail.masterData[0][0];
  },
  setDataForPhoneListBox:function(phoneObj){
    var phoneNumbers = phoneObj.map(function (dataItem) {
      var phoneNumber = [];
      phoneNumber.push(dataItem.unmasked);
      phoneNumber.push(dataItem.masked);
      return phoneNumber;
    });
    return phoneNumbers;
  },
  setDataForEmailListBox:function(emailObj){
    var emailsIds = emailObj.map(function (dataItem) {
      var email = [];
      email.push(dataItem.unmasked);
      email.push(dataItem.masked);
      return email;
    });
    return emailsIds;
  },
  onClickSend : function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var selectedData = {
      "phone" : this.view.lbxRegisteredModePhone.selectedKeyValue[0],
      "email" : this.view.lbxRegisteredModeEmail.selectedKeyValue[0]
    };
     var authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
     authModule.presentationController.maskedphoneNumber = this.view.lbxRegisteredModePhone.selectedKeyValue[1];
      authModule.presentationController.maskedemail = this.view.lbxRegisteredModeEmail.selectedKeyValue[1];
    authModule.presentationController.navigateToOTPScreen(selectedData);
 //   applicationManager.getPresentationUtility().MFA.setPhoneAndEmail(selectedData);
  //  applicationManager.getPresentationUtility().MFA.requestOTP(selectedData);
  },
  flexView:function(option){
    this.resetFlexes();
    if(option===1){
      this.view.flxNewDevice.isVisible=true;
    }
    else if(option===2){
      this.view.flxDeviceRegistration.isVisible=true;
    }
    else{
      this.view.lblLetsAuthenticateTransaction.isVisible=true;
    }
  },
  resetFlexes:function(){
    this.view.flxNewDevice.isVisible=false;
    this.view.flxDeviceRegistration.isVisible=false;
    this.view.lblLetsAuthenticateTransaction.isVisible=false;
  },
  bindError : function(err){
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    applicationManager.getDataProcessorUtility().showToastMessageError(this,err);
  }
});