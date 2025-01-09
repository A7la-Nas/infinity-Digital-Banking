define(['CommonUtilities'],function(CommonUtilities){ 
  return{
  init : function(){
    var FormValidator = require("FormValidatorManager");
    this.fv = new FormValidator(1);
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },

  frmAlertsDetailsPreShow : function(){
    this.setPreshowData();
    this.setFlowActions();
    this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("i18n.Alerts.Notifications");
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },

  setPreshowData : function(){
    this.setAlertsDetailsData();
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
      this.view.flxNotificationsDetailsMain.top = "56dp";
    }
    else{
      this.view.flxHeader.isVisible = false;
      this.view.flxNotificationsDetailsMain.top = "0dp";
    }
  },

  setFlowActions : function(){
    var scopeObj = this;
    this.view.customHeader.flxBack.onClick = this.goBack;
    this.view.flxDelete.onClick = this.openDeletePopup;
    this.view.btnCancel.onClick = this.closeDeletePopup;
    this.view.btnRemove.onClick = this.onSelectDelete;
  },
  setAlertsDetailsData : function(){
    var scopeObj = this;
    var navManager = applicationManager.getNavigationManager();
    var alertsDetails = navManager.getCustomInfo("frmAlertsDetails");
    var subject = alertsDetails.notificationSubject;
    var text = alertsDetails.notificationText;
    var dateString = alertsDetails.receivedDate;
    var displayImage = alertsDetails.imgCategory;
    var bannerImage = alertsDetails.imageURL;
    var actionLink = alertsDetails.actionButtonLabelName;
    var notificationLink = alertsDetails.notificationActionLink;
    this.setSubject(subject);
    this.setText(text);
    this.view.lblSubjectDescription.text = CommonUtilities.getDateAndTime(dateString);
    this.setImage(displayImage);
    this.setBannerImage(bannerImage);
    this.setActionlink(actionLink,notificationLink);
  },
  setSubject : function(subject){
    this.view.lblSubject.text = subject;
  },
  setText : function(text){
    this.view.lblNotificationDescription.text = text;
  },
    setImage : function(displayImage){
      this.view.imgNotificationCategory.src = displayImage.src;
    },
  setBannerImage : function(bannerImage){
    if(bannerImage){
    this.view.imgNotification.isVisible = true;
    this.view.imgNotification.src = bannerImage;
    } else{
    this.view.imgNotification.isVisible = false;
    }
  },
  setActionlink : function(actionLink,notificationLink){
    if(actionLink && notificationLink){
    this.view.btnActionLink.isVisible = true;
    this.view.btnActionLink.text = actionLink;
    this.view.btnActionLink.onClick = this.actionHandlerActionButton.bind(this,actionLink,notificationLink);
    } else{
    this.view.btnActionLink.isVisible = false;
    }
  },
  goBack : function(){
    var navManager = applicationManager.getNavigationManager();
    navManager.goBack();
  },
  openDeletePopup : function(){
    var scopeObj = this;
    scopeObj.view.flxPopup1.setVisibility(true);
  },
  closeDeletePopup : function(){
    var scopeObj = this;
    scopeObj.view.flxPopup1.setVisibility(false);
  },
  onSelectDelete :function(){
    var scopeObj = this;
    scopeObj.view.flxPopup1.setVisibility(false);
    var navManager = applicationManager.getNavigationManager();
    var alertsDetails = navManager.getCustomInfo("frmAlertsDetails");
    var notificationId = alertsDetails.userNotificationId;
    var alertsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AlertsUIModule");
    alertsModule.presentationController.deleteNotificationForDetails(notificationId);
  },

  actionHandlerActionButton : function(actionLink,notificationLink){
	if(notificationLink && actionLink){
    notificationLink = notificationLink.trim().toUpperCase();
    }
    switch (notificationLink) {
    case "BILL_PAY_CREATE":
    var BillPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPayModule");
          BillPayMod.presentationController.fetchBills();
          BillPayMod.presentationController.getHolidays();
    break;
    case "P2P_CREATE":
    applicationManager.getPresentationUtility().showLoadingScreen();
          var navMan = applicationManager.getNavigationManager();
          navMan.setEntryPoint("europeTransferFlow","frmDashboardAggregated");
          var transferModPresentationController = applicationManager.getModulesPresentationController("TransferModule");
          transferModPresentationController.setEuropeFlowType("EXTERNAL");
          transferModPresentationController.getFromAndToAccounts();
          transferModPresentationController.clearEuropeFlowAtributes();
    break;
    case "ACCOUNT_DASHBOARD":
     var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
          accountMod.presentationController.showDashboard();
    break;
     case "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE":
     var transMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransactionModule");
            transMod.presentationController.getTransactions();
     var configManager = applicationManager.getConfigurationManager();
            var transMod = applicationManager.getModulesPresentationController("TransactionModule");
            if (configManager.getDeploymentGeography() === 'EUROPE') {
              applicationManager.getPresentationUtility().showLoadingScreen();
              var navMan = applicationManager.getNavigationManager();
              navMan.setEntryPoint("europeTransferFlow","frmDashboardAggregated");
              var transferModPresentationController = applicationManager.getModulesPresentationController("TransferModule");
              transferModPresentationController.setEuropeFlowType("INTERNAL");
              transferModPresentationController.getFromAccounts();
              transferModPresentationController.clearEuropeFlowAtributes();
            }  
            else {  
              transMod.getTransactions();
            }  
     }
  },
  
  showErrorPopUp : function(msg)
  {
    applicationManager.getDataProcessorUtility().showToastMessageError(this,msg);
  },
  }
});