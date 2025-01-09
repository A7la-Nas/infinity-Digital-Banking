define({
  init : function(){
     var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  preShow: function() {
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
    } else{
      this.view.flxHeader.isVisible = false;
    }
    var SettingsAlertsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
    SettingsAlertsUIModule.presentationController.setAlertCommunicationData();
    this.setFlowActions();
  },
  setFlowActions : function(){
    var scopeObj = this;
    this.view.customHeader.flxBack.onClick = function() {
      applicationManager.getPresentationUtility().showLoadingScreen();
      var navMan=applicationManager.getNavigationManager();
      navMan.goBack();
    };
    this.view.flxPhoneNumberValue.onClick = function(){
      var context = {"type":"PHONE",
                     "assignedValue":scopeObj.view.lblPhoneNumValue.info.assignedValue,
                     "data":""};
      var SettingsAlertsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
      SettingsAlertsUIModule.presentationController.navigateToAlertsCommunicationEdit(context);
    };
    this.view.flxEmailValue.onClick = function(){
      var context = {"type":"EMAIL",
                     "assignedValue":scopeObj.view.lblEmailValue.info.assignedValue,
                     "data":""};
      var SettingsAlertsUIModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsAlertsUIModule");
      SettingsAlertsUIModule.presentationController.navigateToAlertsCommunicationEdit(context);
    };
  },

   /**
  * used to set the alert data to the form.
  * @param {object} userDetails
  */
  bindData: function(userDetails) {
    var checkPhone = true, checkEmail = true;
     if(userDetails.ContactNumbers && userDetails.ContactNumbers.length > 0 ){
       this.showHidePhoneNumber(true);
       this.view.flxViewAlertCommunication.setVisibility(true);
       this.view.flxNoAlertCommunication.setVisibility(false);
       this.setSelectedContactNumber(userDetails.ContactNumbers);    
     } else{
       checkPhone = false;
       this.showHidePhoneNumber(false);
     }
     if(userDetails.EmailIds && userDetails.EmailIds.length > 0 ){
       this.showHideEmail(true); 
       this.view.flxViewAlertCommunication.setVisibility(true);
       this.view.flxNoAlertCommunication.setVisibility(false);
       this.setSelectedEmail(userDetails.EmailIds);
     }else{
       checkEmail = false;
       this.showHideEmail(false); 
     }
    //in case there is no primary and alert related contact info
    if(checkPhone === false && (checkEmail === false)){
      this.view.flxViewAlertCommunication.setVisibility(false);
      this.view.flxNoAlertCommunication.setVisibility(true);
    }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  /*
  * show/hide the phone number field
  * @param : visibility - true/false to show
  */
  showHidePhoneNumber : function(visiblity){
    this.view.flxPhoneNumberHeader.setVisibility(visiblity);
    this.view.flxPhoneNumberValue.setVisibility(visiblity);
  },
  /*
  * show/hide the email field
  * @param : visibility - true/false to show
  */
  showHideEmail : function(visiblity){
    this.view.flxEmailHeader.setVisibility(visiblity);
    this.view.flxEmailValue.setVisibility(visiblity);
  },
  /**
  * used to set alert phone number details
  * @param {Array} contactNums :array of contact num
  */
  setSelectedContactNumber : function(contactNums){
    var contact = "",primaryContact = "";
    for(var i=0;i<contactNums.length; i++){
      if(contactNums[i].isAlertsRequired === "true"){
        contact = contactNums[i];
      }
      if(contactNums[i].isPrimary === "true"){
        primaryContact = contactNums[i];
      }
    }
    if(contact){
      this.view.lblPhoneNumValue.text = (contact.Extension || "") + " - "+ contact.Value;
      this.view.lblPhoneNumValue.info = {"assignedValue":contact};
    } else if(primaryContact){
      this.view.lblPhoneNumValue.text =(primaryContact.Extension || "") + " - " + primaryContact.Value;
      this.view.lblPhoneNumValue.info = {"assignedValue":primaryContact};
    } else{
      this.view.lblPhoneNumValue.info = {"assignedValue" : ""};
      this.showHidePhoneNumber(false);
    }
  },
  /**
  * used to set the alert email details
  * @param {object} emailIds : array of emails
  */
  setSelectedEmail : function(emailIds){
    var email = "",primaryEmail = "";
    
    for(var i=0;i<emailIds.length; i++){
      if(emailIds[i].isAlertsRequired === "true"){
        email = emailIds[i];
      }
      if(emailIds[i].isPrimary === "true"){
        primaryEmail = emailIds[i];
      }
    }
    if(email){
      this.view.lblEmailValue.text =email.Value;
      this.view.lblEmailValue.info = {"assignedValue":email};
    } else if(primaryEmail){
      this.view.lblEmailValue.text =primaryEmail.Value;
      this.view.lblEmailValue.info = {"assignedValue":primaryEmail};
    } else{
      this.view.lblEmailValue.info = {"assignedValue":""};
      this.showHideEmail(false);
    }
  },
});