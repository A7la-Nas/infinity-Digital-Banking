define({
  init: function () {
    var scope = this;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm = currentFormObject.id;
  },

  preShow: function () {
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
    }
    else {
      this.view.flxHeader.isVisible = true;
      this.view.flxMain.top = "56dp";
    }
    this.setupUI();
    this.initActions();
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },

  initActions: function () {
    this.view.btnContinue.onClick = function () {
      var navMan = applicationManager.getNavigationManager();
      var qrPresentationController = applicationManager.getModulesPresentationController({ "moduleName": "QRPaymentsUIModule", "appName": "TransfersMA" });
      qrPresentationController.clearTransObj();
      navMan.navigateTo("frmQRPaymentsLanding");
    };

  },

  setupUI: function () {
    var transactionManager = applicationManager.getTransactionManager();
    var formatUtilManager = applicationManager.getFormatUtilManager();
    var qrPresentationController = applicationManager.getModulesPresentationController({ "moduleName": "QRPaymentsUIModule", "appName": "TransfersMA" });
    var transferObject = transactionManager.getTransactionObject();
    if (!qrPresentationController.isEmptyOrNullOrUndefined(transferObject.errmsg)) {
      this.view.flxSuccess.isVisible = false;
      this.view.flxFail.isVisible = true;
      var errDetails = transferObject.errmsg;
      this.view.lblError.text = errDetails[0].errorMessage;
      this.view.btnContinue.text = kony.i18n.getLocalizedString("kony.mb.common.close");
    }
    else {
      this.view.btnContinue.text = kony.i18n.getLocalizedString("kony.mb.common.done");
      this.view.lblAmount.text =  qrPresentationController.getTransObject().formattedAmount;
      this.view.flxSuccess.isVisible = true;
      this.view.flxFail.isVisible = false;
      this.setSegmentData();
    }
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },

  setSegmentData: function () {
    var qrPresentationController = applicationManager.getModulesPresentationController({ "moduleName": "QRPaymentsUIModule", "appName": "TransfersMA" });
    var segData = qrPresentationController.getAcknowledgmentScreenData();
    this.view.segDetails.widgetDataMap = this.getWidgetDataMap();
    var segmentData = applicationManager.getDataProcessorUtility().removeRowsWithEmptyValueFromSegmentData(segData, this.view.segDetails.widgetDataMap.lblFieldValue);
    this.view.segDetails.setData(segmentData);
    var transObj = qrPresentationController.getTransObject();
    if(qrPresentationController.isEmptyOrNullOrUndefined(transObj.notes)){
      this.view.flxDescription.isVisible= false;
    }else{
      this.view.lblDescriptionValue.text = transObj.notes || "";  
    }             
  },

  getWidgetDataMap: function () {
    var map = {
      lblFieldLabel: "property",
      lblFieldValue: "value",
    };
    return map;
  }

});