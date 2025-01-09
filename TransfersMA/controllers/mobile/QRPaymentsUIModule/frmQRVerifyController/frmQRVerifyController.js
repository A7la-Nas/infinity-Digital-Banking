define({
  init: function () {
    var scope = this;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm = currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.navigateCustomBack);
  },
  navigateCustomBack: function () {
    var navMan = applicationManager.getNavigationManager();
    var qrPresentationController = applicationManager.getModulesPresentationController({ "moduleName": "QRPaymentsUIModule", "appName": "TransfersMA" });
    if (navMan.getEntryPoint("frmQRVerify") === "frmQRScan") {
      navMan.navigateTo('frmQRScan');
	  qrPresentationController.setAmount('');
    }
    else {
      navMan.navigateTo('frmQRAmount');
    }
  },
  preShow: function () {
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
    }
    else {
      this.view.flxHeader.isVisible = true;
      this.view.flxMainContainer.top = "56dp";
    }
    this.initActions();
    this.setFormData();
  },

  postShow: function () {
  },

  initActions: function () {
    this.view.customHeader.flxBack.onTouchEnd = this.navigateCustomBack;
    this.view.customHeader.btnRight.onClick = this.cancelOnClick;
    this.view.flxFromAccount.onTouchEnd = this.navigateToFromAccounts;
    this.view.flxAmount.onTouchEnd = this.navigateToAmountScreen;
    this.view.btnContinue.onClick = this.onContinue;
  },

  setFormData: function () {
    var qrPresentationController = applicationManager.getModulesPresentationController({
      "moduleName": "QRPaymentsUIModule",
      "appName": "TransfersMA"
    });
    var transactionManager = applicationManager.getTransactionManager();
    var transObj = qrPresentationController.getTransObject();
    var data = {
      "availableBalance": transObj.amount,
      "currencyCode": transObj.fromAccountCurrency
    };
    var formattedAmount = qrPresentationController.getFormattedAmount(transObj.amount,transObj.fromAccountCurrency);
    transactionManager.setTransactionAttribute("formattedAmount", formattedAmount);
    this.view.lblAmount.text = transObj.formattedAmount;
    this.view.lblFromAccountValue.text = transObj.fromProcessedName;
    this.view.lblFromavailableBal.text = kony.i18n.getLocalizedString("i18n.common.availableBalancewithColon");
    this.view.lblFromBalanceValue.text = transObj.fromProcessedAvailableBalance;
    this.view.lblToAccountValue.text = transObj.toProcessedName;
    this.view.txtDescription.text = transObj.notes || "";

  },

  navigateToFromAccounts: function () {
    var navMan = applicationManager.getNavigationManager();
    navMan.setEntryPoint("frmQRFromAccount", "frmQRVerify");
    var qrPresentationController = applicationManager.getModulesPresentationController({
      "moduleName": "QRPaymentsUIModule",
      "appName": "TransfersMA"
    });
    qrPresentationController.getFromAccounts();
    applicationManager.getPresentationUtility().showLoadingScreen();
  },

  navigateToAmountScreen: function () {
    var navMan = applicationManager.getNavigationManager();
    navMan.setEntryPoint("frmQRAmount", "frmQRVerify");
    navMan.navigateTo("frmQRAmount");
  },

  cancelOnClick: function () {
    var navMan = applicationManager.getNavigationManager();
    navMan.navigateTo('frmQRPaymentsLanding');
  },
  
  onContinue: function () {
    var transactionManager = applicationManager.getTransactionManager();
    var qrPresentationController = applicationManager.getModulesPresentationController({
      "moduleName": "QRPaymentsUIModule",
      "appName": "TransfersMA"
    });
    transactionManager.setTransactionAttribute("notes", this.view.txtDescription.text);
    qrPresentationController.makeATransfer();
    applicationManager.getPresentationUtility().showLoadingScreen();
  }


});    