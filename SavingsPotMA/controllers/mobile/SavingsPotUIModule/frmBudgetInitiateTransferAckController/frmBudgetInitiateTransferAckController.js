define({

  init: function () {
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
  },

  preShow: function () {
    if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
      this.view.flxHeader.isVisible = true;
    }
    else {

      this.view.flxHeader.isVisible = false;
    }
    this.view.btnFund.onClick = this.continueOnClick;
    this.setDataToForm();
  },
  postShow: function () {

  },
  setDataToForm: function () {
    var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
    var flag = SavingsPotMod.presentationController.getInitiateTransfer();
    var budgetDetails;
    if (flag) {
      var navManager = applicationManager.getNavigationManager();
      budgetDetails = navManager.getCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "frmBudgetPotDetails"});
      if (!budgetDetails.fundAmount) {
        budgetDetails.fundAmount = budgetDetails.targetAmount;
      }

    }
    else {
      budgetDetails = SavingsPotMod.presentationController.getBudgetDetails();
    }
    var fromDetails = SavingsPotMod.presentationController.getMaskedAccountName();
    this.view.lblBudgetAn.text = budgetDetails.potName;
    var formatUtil = applicationManager.getFormatUtilManager();
    var amount;
    var currencySymbol = SavingsPotMod.presentationController.getCurrencySymbol();
    var locale = kony.i18n.getCurrentLocale();
    locale = locale.toLowerCase();
    locale = locale.replace("_", "-");
    if (locale == "de-de" || locale === "fr-fr" || locale == "es-es") {
      amount = budgetDetails.targetAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    else {
      amount = formatUtil.formatAmount(budgetDetails.targetAmount) || budgetDetails.targetAmount;
    }
    this.view.lblAmountAn.text = currencySymbol + amount;
    this.view.lblAccAn.text = fromDetails;
    if (budgetDetails.fundAmount == undefined) {
      this.view.lblTransferAmountValue.text = currencySymbol + amount;
    }
    else {
      var fundAmount;
      var locale = kony.i18n.getCurrentLocale();
      locale = locale.toLowerCase();
      locale = locale.replace("_", "-");
      if (locale == "de-de" || locale === "fr-fr" || locale == "es-es") {
        fundAmount = formatUtil.formatAmount(budgetDetails.fundAmount.replace(",", "."));
      }
      else {
        fundAmount = formatUtil.formatAmount(budgetDetails.fundAmount);
      }
      this.view.lblTransferAmountValue.text = currencySymbol + fundAmount;
    }
    var today = new Date();
    var month = today.getMonth() + 1;
    var date = today.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (date < 10) {
      date = "0" + date;
    }
    var startDate = month + "/" + date + "/" + today.getFullYear();
    this.view.lblDateAn.text = startDate;
  },
  continueOnClick: function () {
    var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
    SavingsPotMod.clearCreateData();
    SavingsPotMod.setInitiateTransfer("");
    var accountsID = SavingsPotMod.getAccountId();
    SavingsPotMod.getAllSavingsPot(accountsID);
  },
  bindGenericError: function (errorMsg) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
  }

});