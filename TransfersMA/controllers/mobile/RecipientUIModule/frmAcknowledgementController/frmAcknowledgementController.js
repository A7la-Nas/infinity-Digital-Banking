define({

  frmPreShow: function() {
     if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
    } else {
      this.view.flxHeader.isVisible = true;
    } 
    this.initAction();
  },


  initAction: function() {
    var navMan = applicationManager.getNavigationManager();
    var formName = navMan.getEntryPoint("acknowledgment");
    var navData = navMan.getCustomInfo("frmAcknowledgment");
    this.view.onDeviceBack = function() {};
    if (navData !== undefined && Object.keys(navData).length > 0) {
      if (navData.hasOwnProperty("error")) {
        this.setErrorLayout(formName);
      } else {
        this.view.flxError.isVisible = false;
        this.view.flxSuccessTransaction.isVisible = true;

        if (formName === "frmBillPayVerifyDetails" || formName === "frmBillPayEdit") {
          this.setAddPayeeData(navData, formName);
        }
        if (formName === "frmP2PAdd" || formName === "frmP2PEdit") {
          this.setAddRecipientData(navData, formName);
        }
        if (formName === "frmTransfers" || formName === "frmTransfersEdit") {
          this.setTransfersData(navData, formName);
        }
      }
    } else
      this.setErrorLayout();

    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },

  setErrorLayout: function() {
    var navMan = applicationManager.getNavigationManager();
    var formName = navMan.getEntryPoint("acknowledgment");
    var navData = navMan.getCustomInfo("frmAcknowledgment");
    this.view.flxError.isVisible = true;
    this.view.flxSuccessTransaction.isVisible = false;
    this.view.lblTitle.text = applicationManager.getPresentationUtility().getStringFromi18n("i18n.kony.transfers.transferFailed");
    this.view.lblMessage.text = applicationManager.getPresentationUtility().getStringFromi18n("i18n.payments.serverError");
    if(navData !== undefined && Object.keys(navData).length > 0){
      if (formName === "frmBillPayVerifyDetails" || formName === "frmP2PAdd" || formName === "frmTransfers" ) {
        this.view.lblTitle.text = applicationManager.getPresentationUtility().getStringFromi18n("i18n.payments.createPayeeFailed");
      }
      else if (formName === "frmP2PEdit" || formName === "frmBillPayEdit" || formName === "frmTransfersEdit") {
        this.view.lblTitle.text = applicationManager.getPresentationUtility().getStringFromi18n("i18n.payments.editPayeeFailed");
      }
      if (navData.hasOwnProperty("error"))
      	this.view.lblMessage.text = navData["error"];
    }
    this.view.btnTryAgain.onClick = this.navigateToList;
  },

  setAddPayeeData: function(navData, entryForm) {
    this.setSegmentData(navData);
    this.view.lblSuccessMessage.text =(entryForm === "frmBillPayVerifyDetails")? navData["Payee Full Name"] + applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.BenAdded") : navData["Payee Full Name"] + applicationManager.getPresentationUtility().getStringFromi18n("i18n.FastTransfers.hasbeensuccessfullyedited");
    this.view.btnDashboard.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Transfers.allpayees");
    this.view.btnDashboard.onClick = this.navigateToManagePayee;
    this.view.btnNewTransfer.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.tab.BillPay.PayBill");
    this.view.btnNewTransfer.onClick = this.navigateToPayBill;


  },

  setAddRecipientData: function(navData, entryForm) {
	this.setSegmentData(navData);
    this.view.lblSuccessMessage.text = (entryForm === "frmP2PAdd")? navData["Recipient Name"] + applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.BenAdded") : navData["Recipient Name"] + applicationManager.getPresentationUtility().getStringFromi18n("i18n.FastTransfers.hasbeensuccessfullyedited");
    this.view.btnDashboard.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MyAccounts.Title");
    this.view.btnDashboard.onClick = this.navigateToDashboard;
    this.view.btnNewTransfer.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transaction.transfer");
	this.view.btnNewTransfer.onClick = this.navigateToPayAPerson;

  },

  setTransfersData: function(navData, entryForm) {
    this.setSegmentData(navData);
    this.view.lblSuccessMessage.text = (entryForm === "frmTransfers")? navData["Recipient Name"] + applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.TransfersEurope.BenAdded") : navData["Recipient Name"] + applicationManager.getPresentationUtility().getStringFromi18n("i18n.FastTransfers.hasbeensuccessfullyedited");
    this.view.btnDashboard.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.MyAccounts.Title");
    this.view.btnDashboard.onClick = this.navigateToDashboard;
    this.view.btnNewTransfer.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transaction.transfer");
    this.view.btnNewTransfer.onClick = this.navigateToTransferMoney;
  },

  setSegmentData: function(navData){
    var segData = [];
    this.view.segDetails.widgetDataMap = {
      "lblTitle": "lblTitle",
      "lblDetails": "lblDetails",
      "lblExtras": "lblExtras"
    };
    for(var key in navData) {
      segData.push({
        "lblTitle": {
          "text": key
        },
        "lblDetails": {
          "text": navData[key]
        },
        "lblExtras": {
          "isVisible": false
        }
      });
    }
    this.view.segDetails.setData(segData);
  },

  navigateToDashboard: function() {
    var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"HomepageMA", "moduleName":"AccountsUIModule"});
    accountMod.presentationController.showDashboard();
  },

  navigateToList: function() {
    var navMan = applicationManager.getNavigationManager();
    var type = navMan.getCustomInfo("recipientListType");
    var transferModulePresentationController = applicationManager.getModulesPresentationController("RecipientUIModule");
    var moneyMovementPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
    switch(type){
      case "SameBankRecipients":
        applicationManager.getPresentationUtility().showLoadingScreen();
        transferModulePresentationController.fetchSameBankRecepients();
        moneyMovementPresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers");
        transferModulePresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherKonyBankMembers");
        transferModulePresentationController.setFlowType("SameBankRecipients");
        break;
      case "OtherBankRecipients":
        applicationManager.getPresentationUtility().showLoadingScreen();
        transferModulePresentationController.fetchOtherBankRecepients();
        moneyMovementPresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts");
        transferModulePresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.OtherBankAccounts");
        transferModulePresentationController.setFlowType("OtherBankRecipients");
        break;
      case "P2P":
        applicationManager.getPresentationUtility().showLoadingScreen();
        var p2pMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonUIModule");
        moneyMovementPresentationController.transactionMode = "PayAPerson";
        p2pMod.presentationController.setFlowType("P2P");
        p2pMod.presentationController.fetchAllP2PRecipients();
        break;
      case "InternationalRecipients":
        applicationManager.getPresentationUtility().showLoadingScreen();
        transferModulePresentationController.fetchInternationalRecepients();
        moneyMovementPresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer");
        transferModulePresentationController.transactionMode = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.transfer.InternationalTransfer");
        transferModulePresentationController.setFlowType("InternationalRecipients");
        break;
      default:
        this.navigateToManagePayee();
        break;
    }
  },

  navigateToTransferMoney: function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var navMan = applicationManager.getNavigationManager();
    var cm = applicationManager.getConfigurationManager();
    if (cm.isFastTransfersFlowEnabled()) {
      var moneyMovementPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
      navMan.setEntryPoint("makeatransferMoneyModule", "frmManageTransferRecipientInfo");
      moneyMovementPresentationController.haveLimitsBeenFetched = false;
      moneyMovementPresentationController.initializeStateData(false, "");
      moneyMovementPresentationController.setTransferToAccountFromManageFlow();
    } else {
      var transMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferEuropeUIModule");
      transMod.presentationController.setTransferToInfo();
      navMan.setEntryPoint("makeatransfer", "frmManageTransferRecipient");
    }
  },

  navigateToPayAPerson: function(){
    var navMan = applicationManager.getNavigationManager();
    var cm = applicationManager.getConfigurationManager();
    if (cm.isFastTransfersFlowEnabled()) {
      var moneyMovementPresentationController = applicationManager.getModulesPresentationController("MoneyMovementUIModule");
      navMan.setEntryPoint("makeatransferMoneyModule", "frmManageP2pRecipient");
      moneyMovementPresentationController.haveLimitsBeenFetched = false;
      moneyMovementPresentationController.initializeStateData(false, "");
      moneyMovementPresentationController.setP2PToAccountFromManageFlow();
    } else {
      var payeeMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PayAPersonUIModule");
      var data = payeeMod.presentationController.getP2PPayeeDetails();
      navMan.setEntryPoint("payaperson", "frmManageP2pRecipient");
      payeeMod.presentationController.getP2pAccounts(data);
    }
  },

  navigateToManagePayee: function() {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPayModule");
    billPayMod.presentationController.fetchAllPayees();
  },

  navigateToPayBill: function(){
    var billPayMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BillPayModule");
    var navMan = applicationManager.getNavigationManager();
    navMan.setEntryPoint("payBill", "frmBillPayPayeeDetails");
    var payeeData = billPayMod.presentationController.getPayeeDetails();
    billPayMod.presentationController.navAfterSelectPayee(payeeData);
  }
});