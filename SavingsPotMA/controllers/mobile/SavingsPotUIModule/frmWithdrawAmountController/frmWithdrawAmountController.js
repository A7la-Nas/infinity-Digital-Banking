define(["CommonUtilities"], function (CommonUtilities) {
  return {
    keypadString: '0.00',
    isPeriodUsed: false,
    timerCounter: 0,
    init: function () {
      var scope = this;
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm, scope.navigateCustomBack);
    },

    preShow: function () {
      if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
        this.view.flxHeader.isVisible = true;
      }
      else {
        this.view.flxHeader.isVisible = false;
      }
      this.view.flxError.isVisible = false;
      this.view.btnContinue.onClick = this.btnContinueFunction;
      this.view.customHeader.flxBack.onTouchEnd = this.navigateCustomBack;
      var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
      var savingsObj = SavingsPotMod.getFundWithDrawDetails();
      this.view.lblDollar.text = SavingsPotMod.getCurrencySymbol();
      this.setReference(savingsObj.amount);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    postShow: function () {
      this.updateAmountValue();
    },
    setReference: function (amountWithdrawn) {
      if (amountWithdrawn) {
        this.keypadString = amountWithdrawn;
      }
      else {
        var locale = kony.i18n.getCurrentLocale();
    locale = locale.toLowerCase();
    locale = locale.replace("_", "-");
    if (locale == "de-de" || locale === "fr-fr" || locale == "es-es")
          this.keypadString = "0,00";
        else
          this.keypadString = "0.00";
      }
    },
    setKeypadChar: function (char) {
      CommonUtilities.setKeypadChar(this, char);
      this.updateAmountValue();
    },
    clearKeypadChar: function () {
      CommonUtilities.clearKeypadChar(this);
      this.updateAmountValue();
    },
    updateAmountValue: function () {
      var locale = kony.i18n.getCurrentLocale();
    locale = locale.toLowerCase();
    locale = locale.replace("_", "-");
      if (this.keypadString === '0.00' || (( (locale == "de-de" || locale === "fr-fr" || locale == "es-es") && this.keypadString === '0,00'))) {
        this.view.btnContinue.skin = "sknBtnOnBoardingInactive";
        this.view.btnContinue.setEnabled(false);
        this.view.lblAmount.text = this.view.keypad.formatAmount(this.keypadString);
      } else {
        var keypadStringCommas = CommonUtilities.updateAmountValue(this);
        this.view.btnContinue.skin = "sknBtn0095e4RoundedffffffSSP26px";
        this.view.btnContinue.setEnabled(true);
        this.view.lblAmount.text = this.view.keypad.formatAmount(keypadStringCommas);
      }
    },
    navigateCustomBack: function () {
      var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
      SavingsPotMod.commonFunctionForgoBack();
    },
    btnContinueFunction: function () {
      var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
      var type = SavingsPotMod.presentationController.getSavingsType();
      var navManager = applicationManager.getNavigationManager();
      var potName = SavingsPotMod.presentationController.getSavingsPotName();
      if (type === "Goal") {
        var Details = navManager.getCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "frmSavingsGoalViewDetails"});
      } else if (type === "Budget") {
        var Details = navManager.getCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "frmBudgetPotDetails"});
      }
      var amountWithdrawn = this.keypadString;
      if (parseFloat(amountWithdrawn) > parseFloat(Details.availableBalance)) {
        this.view.flxError.isVisible = true;
        this.view.lblError.text = "You can’t withdraw more than the Available Balance of your pot" + " " + potName;
      } else {
        this.view.flxError.isVisible = false;
        SavingsPotMod.presentationController.navToFundVerifyDetails(amountWithdrawn, "Debit", {"appName" : "SavingsPotMA", "friendlyName" : "frmWithdrawVerifyDetails"});
      }
    }
  };
});