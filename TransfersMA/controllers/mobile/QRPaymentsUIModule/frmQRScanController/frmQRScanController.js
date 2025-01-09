define({
  //invoked everytime when navigated to form
  preShow: function () {
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
    }
    else {
      this.view.flxHeader.isVisible = true;
      this.view.flxMainContainer.top = "56dp";
    }
    this.initActions();
  },

  //defined actions
  initActions: function () {
    var scope = this;
    var navMan = applicationManager.getNavigationManager();
    var qrPresentationController = applicationManager.getModulesPresentationController({ "moduleName": "QRPaymentsUIModule", "appName": "TransfersMA" });
    scope.view.customHeader.flxBack.onClick = function () {
      navMan.navigateTo("frmQRPaymentsLanding");
    };
    scope.view.barcodeqrscanner.afterScan = scope.onQRScan.bind(scope);
    scope.view.barcodeqrscanner.errorCallback = scope.errorCallBack.bind(scope);
  },

  //iphone back navigation
  navigateCustomBack: function () {
    var scope = this;
    var navMan = applicationManager.getNavigationManager();
    navMan.navigateTo("frmQRPaymentsLanding");
  },

  //invoked when a QR is scanned
  onQRScan: function (result, format) {
    var scope = this;
    try{
    if (typeof result === 'string') {
      result = JSON.parse(result);
    }
    else {
      scope.onQRError();
      return;
    }
    if (result.hasOwnProperty('toAccountName') && result.hasOwnProperty('toAccountNumber')) {
      //alert("Scan Result: "+result+" Code Format: "+format);
      this.onQRSuccess(result);
    }
    else {
      scope.onQRError();
    }
    }
    catch(err){
      scope.onQRError();
    }
  },

  onQRSuccess: function (result) {
    var scope = this;
    var navMan = applicationManager.getNavigationManager();
    navMan.setCustomInfo("frmQRScan", result);
    var transactionManager = applicationManager.getTransactionManager();
    var qrPresentationController = applicationManager.getModulesPresentationController({ "moduleName": "QRPaymentsUIModule", "appName": "TransfersMA" });
    var transObj = qrPresentationController.getTransObject();
    var formattedToAccountName = applicationManager.getPresentationUtility().formatText(result.toAccountName, 10, result.toAccountNumber, 4);
    transactionManager.setTransactionAttribute("toAccountName", result.toAccountName);
    transactionManager.setTransactionAttribute("toAccountNumber", result.toAccountNumber);
    transactionManager.setTransactionAttribute("toProcessedName", formattedToAccountName);

    if (result.hasOwnProperty('amount')) {
      if(result.amount.includes(',')){
        scope.onQRError();
      }
      else{
      transactionManager.setTransactionAttribute("amount", result.amount);
      navMan.setEntryPoint("frmQRVerify", "frmQRScan");
      navMan.navigateTo('frmQRVerify');
    }
    }
    else {
      navMan.navigateTo('frmQRAmount');
    }
  },

  //invoked when QR data is incorrect
  onQRError: function () {
    var scope = this;
    var basicConfig = {
      "alertType": constants.ALERT_TYPE_CONFIRMATION,
      "alertTitle": kony.i18n.getLocalizedString("i18n.qrpayments.VerificationFailed"),
      "message": kony.i18n.getLocalizedString("i18n.qrpayments.UnableToVerifyTheQRCode"),
      "alertHandler": scope.alertCallback.bind(scope),
      "yesLabel": kony.i18n.getLocalizedString("i18n.qrpayments.Retry"),
      "noLabel": kony.i18n.getLocalizedString("i18n.transfers.Cancel")
    };
    var pspConfig = {};
    applicationManager.getPresentationUtility().showAlertMessage(basicConfig, pspConfig);   
  },

  //invoked when user clicks on alert box 
  alertCallback: function (response) {
    var scope = this;
    var navMan = applicationManager.getNavigationManager();
    if (response) {
      scope.view.barcodeqrscanner.resumeScan();
    }
    else {
      navMan.navigateTo("frmQRPaymentsLanding");
    }
  },

  //invoked when the QR component has any error
  errorCallBack: function (errMsg) {
    var scope = this;
    kony.print(errMsg);
  },
  
  bindGenericError: function (errorMsg) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
  }

});