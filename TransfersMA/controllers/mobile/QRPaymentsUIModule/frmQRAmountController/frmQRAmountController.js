define({
  keypadString: '0',
  isPeriodUsed: false,
  init: function () {
    var scope = this;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm = currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.navigateCustomBack);
  },
  navigateCustomBack: function () {
    var navMan = applicationManager.getNavigationManager();
    var qrPresentationController = applicationManager.getModulesPresentationController({ "moduleName": "QRPaymentsUIModule", "appName": "TransfersMA" });
    if (navMan.getEntryPoint("frmQRAmount") === "frmQRVerify") {
      navMan.navigateTo("frmQRVerify");
      navMan.setEntryPoint("frmQRAmount","");
    }
    else {
      qrPresentationController.setAmount('');
      navMan.navigateTo('frmQRScan');
    }
  },
  preShow: function () {
    this.isPeriodUsed = false;
    var navManager = applicationManager.getNavigationManager();
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
    }
    else {
      this.view.flxHeader.isVisible = true;
      this.view.flxMainContainer.top = "56dp";
    }
    var formatUtil = applicationManager.getFormatUtilManager();
    var qrPresentationController = applicationManager.getModulesPresentationController({ "moduleName": "QRPaymentsUIModule", "appName": "TransfersMA" });
    var transObj = qrPresentationController.getTransObject();
    this.setAmount(transObj.amount);
    this.setFromAccountData();
    this.setToAccountData();
    this.view.lblDollar.text = formatUtil.getCurrencySymbol(transObj.transactionCurrency);
    this.initActions();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },

  initActions: function () {
    var scope = this;
    this.view.btnContinue.onClick = this.continueOnClick;
    this.view.customHeader.flxBack.onTouchEnd = scope.navigateCustomBack;
    this.view.customHeader.btnRight.onClick = scope.cancelOnClick;
    this.view.flxClearAmount.onTouchEnd = this.clearKeypad;
    this.view.flxFromImage.onClick = this.navigateToFromAccounts;
  },

  postShow: function () {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if (this.keypadString === "0.00" || this.keypadString === "0,00" || this.keypadString === "0" || this.keypadString === "") {
      this.view.btnContinue.setEnabled(false);
    } else {
      this.view.btnContinue.setEnabled(true);
    }
    this.view.keypad.btnDecimalSeperator.setEnabled(false);
    this.view.btnDot.setEnabled(false);
  },

  setAmount: function (amount) {
    if (amount) {
      this.keypadString = amount;
      if (amount.indexOf(".") === -1) {
        this.isPeriodUsed = false;
      }
      else {
        this.isPeriodUsed = true;
      }
    }
    else {
      this.keypadString = '0.00';
    }
    this.updateAmountValue();
  },

  setKeypadChar: function (char) {
    if (char === '.') {
      if(this.isPeriodUsed === false){
        this.isPeriodUsed = true;
      }
      else{
        return;
      }
    }
    this.keypadString = this.keypadString + char;
    var firstChar = this.keypadString[0];
    this.keypadString = this.keypadString.split("");
    for (var i = 1; i < this.keypadString.length; i++) {
      if(this.keypadString[i] === '.'){
        this.keypadString[i - 1] = this.keypadString[i + 1];
        i++;
      } else {
        this.keypadString[i - 1] = this.keypadString[i];
      }
    }
    this.keypadString = this.keypadString.join("");
    this.keypadString = this.keypadString.substr(0, this.keypadString.length - 1);
    if (firstChar !== '0') {
      this.keypadString = firstChar + this.keypadString;
    }
    this.updateAmountValue();
  },
  
  clearKeypadChar: function () {
    if (this.keypadString === '0.00') return;
    this.keypadString = this.keypadString.split("");
    for (var i = this.keypadString.length - 2; i >= 0; i--) {
      if (this.keypadString[i] === '.') {
        this.keypadString[i + 1] = this.keypadString[i - 1];
        i--;
      } else {
        this.keypadString[i + 1] = this.keypadString[i];
      }
    }
    this.keypadString = this.keypadString.join("");
    this.keypadString = this.keypadString.substr(1);
    if (this.keypadString[0] === '.') {
      this.keypadString = '0' + this.keypadString;
    }
    this.updateAmountValue();
  },
  
  clearKeypad: function () {
    this.keypadString = '0.00';
    this.isPeriodUsed = false;
    this.updateAmountValue();
  },

  updateAmountValue: function () {
    var qrPresentationController = applicationManager.getModulesPresentationController({
      "moduleName": "QRPaymentsUIModule",
      "appName": "TransfersMA"
    });
    if (this.keypadString === '' || this.keypadString === null) {
      this.view.keypad.btnDecimalSeperator.setEnabled(false);
      this.view.flxClearAmount.setVisibility(false);
      this.view.lblAmount.skin = "sknLblA0A0A0SSP42px";
      this.view.lblDollar.skin = "sknLbl4a4a4aSSP42px";
      this.view.lblAmount.text = qrPresentationController.getFormattedAmountWithOutCurrency(this.keypadString);
      this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
    }

    else {
      var keypadStringCommas = '';
      var beforeDecimal = this.keypadString.split('.')[0];
      var afterDecimal = this.keypadString.split('.')[1];
      if (beforeDecimal.length > 3) {
        var withoutCommas = (beforeDecimal.length) % 3;
        var temp = '';
        if (withoutCommas !== 0) {
          temp = beforeDecimal.substr(0, withoutCommas) + ',';
        }
        for (var i = withoutCommas; i < beforeDecimal.length; i += 3) {
          temp += beforeDecimal.substr(i, 3) + ',';
        }
        beforeDecimal = temp.substr(0, temp.length - 1);
      }
      keypadStringCommas = beforeDecimal + '.' + afterDecimal;
      this.view.flxClearAmount.setVisibility(true);
      this.view.lblAmount.skin = "sknLbl4a4a4aSSP42px";
      this.view.lblDollar.skin = "sknLbl4a4a4aSSP42px";
      this.view.lblAmount.text = qrPresentationController.getFormattedAmountWithOutCurrency(this.keypadString);
      if (Number(this.keypadString) !== 0) {
        this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
        this.view.btnContinue.setEnabled(true);
      }
      else {
        this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
      }
    }
  },

  setFromAccountData: function () {
    var qrPresentationController = applicationManager.getModulesPresentationController({
      "moduleName": "QRPaymentsUIModule",
      "appName": "TransfersMA"
    });
    var transObj = qrPresentationController.getTransObject();
    this.view.lblFromAccountValue.text = transObj.fromProcessedName;
    this.view.lblFromavailableBal.text = kony.i18n.getLocalizedString("i18n.common.availableBalancewithColon");
    this.view.lblFromBalanceValue.text = transObj.fromProcessedAvailableBalance;
  },
  setToAccountData: function () {
    var qrPresentationController = applicationManager.getModulesPresentationController({
      "moduleName": "QRPaymentsUIModule",
      "appName": "TransfersMA"
    });
    var transObj = qrPresentationController.getTransObject();
    this.view.lblToAccountValue.text = transObj.toProcessedName;
  },

  navigateToFromAccounts: function () {
    var navMan = applicationManager.getNavigationManager();
    navMan.setEntryPoint("frmQRFromAccount", "frmQRAmount");
    var qrPresentationController = applicationManager.getModulesPresentationController({
      "moduleName": "QRPaymentsUIModule",
      "appName": "TransfersMA"
    });
    qrPresentationController.getFromAccounts();
    applicationManager.getPresentationUtility().showLoadingScreen();
  },

  continueOnClick: function () {
    var qrPresentationController = applicationManager.getModulesPresentationController({ "moduleName": "QRPaymentsUIModule", "appName": "TransfersMA" });
    var transObj = qrPresentationController.getTransObject();
    var transactionManager = applicationManager.getTransactionManager();
    var amount = this.keypadString;
    if (amount.charAt(amount.length - 1) === ".") {
      amount = amount.substring(0, amount.length - 1);
    }
    qrPresentationController.setAmount(amount);
    var formattedAmount = qrPresentationController.getFormattedAmount(amount,transObj.fromAccountCurrency);
    transactionManager.setTransactionAttribute("formattedAmount", formattedAmount);
    var navMan = applicationManager.getNavigationManager();
    navMan.setEntryPoint("frmQRVerify", "frmQRAmount");
    navMan.navigateTo('frmQRVerify');
  },

  cancelOnClick: function () {
    var navMan = applicationManager.getNavigationManager();
    var qrPresentationController = applicationManager.getModulesPresentationController({ "moduleName": "QRPaymentsUIModule", "appName": "TransfersMA" });
    qrPresentationController.clearTransObj();
    navMan.navigateTo('frmQRPaymentsLanding');
  }
});    