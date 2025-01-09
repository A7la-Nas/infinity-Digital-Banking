define({
  init: function () {
    var scope=this;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm=currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.navigateCustomBack);
  },
  
  navigateCustomBack: function() {
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    transMod.commonFunctionForgoBack();
  },
  
  preShow: function () {
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
    } else {
      this.view.flxHeader.isVisible = true;
    }
    this.setupUI();
    this.initActions();
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },

  setupUI: function() {
    var transactionManager = applicationManager.getTransactionManager();
    var transferPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    var transferObject = transactionManager.getTransactionObject();
    var navManager = applicationManager.getNavigationManager();
    var data = navManager.getCustomInfo("frmTransfersPaymentMedium");
    if (!kony.sdk.isNullOrUndefined(transferObject.messageDetails)) {
      var messageDetails = transferObject.messageDetails;
      this.view.flxSameorNextDay.isVisible = false;
      this.view.flxNextDay.isVisible = false;
      this.view.flxNoSelection.isVisible = false;
      this.view.flxButton.isVisible = true;
      this.view.flxInfoList.isVisible = true;
      if (messageDetails.length > 1) {
        for (i = 0; i < messageDetails.length; i++) {
            messageDetails[i].imgIcon = "inactivegreydot.png";
          }
      if (messageDetails.length > 3) {
            messageDetails = messageDetails.slice(0, 3);
          }
      this.view.segErrorList.widgetDataMap = {"lblGenericMsgInfo": "message","imgIcon": "imgIcon"};
          this.view.segErrorList.setData(messageDetails);
    } else {
      messageDetails[0].imgIcon = "";
      this.view.segErrorList.widgetDataMap = {"lblGenericMsgInfo": "message","imgIcon": "imgIcon"};
          this.view.segErrorList.setData(messageDetails); 
        } 
    } else {
    if (data["ui"] === "twoOptions") {
      this.view.flxSameorNextDay.isVisible = true;
      this.view.flxNextDay.isVisible = false;
      this.view.flxNoSelection.isVisible = false;
      this.view.flxButton.isVisible = false;
    }
    else {
      this.view.flxSameorNextDay.isVisible = false;
      this.view.flxNextDay.isVisible = true;
      this.view.flxNoSelection.isVisible = false;
      this.view.flxButton.isVisible = true;
    }
   }
  },
  
  initActions: function () {
	  this.view.customHeader.btnRight.onClick = this.cancelOnClick;
    this.view.customHeader.flxBack.onClick = this.navigateCustomBack;
    this.view.flxInstantPayment.onClick = this.flxInstantPaymentOnClick;
    this.view.flxDomesticPayment.onClick = this.flxDomesticPaymentOnClick;
    this.view.btnContinue.onClick = this.continueOnClick;
  },

  flxInstantPaymentOnClick: function() {
    var transactionManager = applicationManager.getTransactionManager();
    var navManager = applicationManager.getNavigationManager();
    var data = navManager.getCustomInfo("frmTransfersPaymentMedium");
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    transactionManager.setTransactionAttribute("paymentType", "INSTPAY");
    transMod.makeATransfer(data.attachmentPayload);
  },

  flxDomesticPaymentOnClick: function() {
    var navManager = applicationManager.getNavigationManager();
    var data = navManager.getCustomInfo("frmTransfersPaymentMedium");
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    transMod.continueWithDomesticPayment(data.attachmentPayload);
  },
  
   cancelOnClick: function() {
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    transMod.cancelCommon();
  },

  continueOnClick: function() {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    var data = navManager.getCustomInfo("frmTransfersPaymentMedium");
    var transMod = applicationManager.getModulesPresentationController({"moduleName" : "TransferEuropeUIModule", "appName" : "TransfersMA"});
    transMod.makeATransfer(data.attachmentPayload);
  }
  

});