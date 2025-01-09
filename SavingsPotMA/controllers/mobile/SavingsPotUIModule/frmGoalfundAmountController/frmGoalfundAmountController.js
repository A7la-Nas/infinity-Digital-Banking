define(["CommonUtilities"], function (CommonUtilities) {
  return {
    keypadString: '0.00',
    isPeriodUsed: false,
    timerCounter: 0,
    init: function () {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm, scope.navigateCustomBack);
    },
    navigateCustomBack: function () {
      var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
      SavingsPotMod.commonFunctionForgoBack();
    },
    preShow: function () {
      if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
        this.view.flxHeader.setVisibility(false);
      }
      var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
      var currencySymbol = SavingsPotMod.presentationController.getCurrencySymbol();
      this.view.lblDollar.text = currencySymbol;
      this.view.btnContinue.onClick = this.continueOnClick;
      this.view.customHeader.flxBack.onClick = this.navigateCustomBack;
      var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
      var type = SavingsPotMod.getSavingsType();
      var paramValue;
      var flag = SavingsPotMod.getInitiateTransfer();
      var navManager = applicationManager.getNavigationManager();
      if (flag) {      
        var budgetDetails = navManager.getCustomInfo({"friendlyName" : "frmBudgetPotDetails", "appName" : "SavingsPotMA"});
        paramValue = parseFloat(budgetDetails.fundAmount);
        paramValue = paramValue.toFixed(2);
        var locale = kony.i18n.getCurrentLocale();
    locale = locale.toLowerCase();
    locale = locale.replace("_", "-");
    if (locale == "de-de" || locale === "fr-fr" || locale == "es-es")
        paramValue = paramValue.replace(".",",");
      }
      else {
        if (type === "budgetFund") {
          var budgetDetails = SavingsPotMod.getBudgetDetails();
          if (budgetDetails.fundAmount) {
            paramValue = budgetDetails.fundAmount;
          }
          else {
            if(navManager.getPreviousForm() !== "frmBudgetInitiateTransferDetails"){
              paramValue = parseFloat(budgetDetails.targetAmount);
              paramValue = paramValue.toFixed(2);
            }
            else{
              paramValue=budgetDetails.targetAmount;
            }
          }
          var locale = kony.i18n.getCurrentLocale();
    locale = locale.toLowerCase();
    locale = locale.replace("_", "-");
    if (locale == "de-de" || locale === "fr-fr" || locale == "es-es") 
           paramValue = paramValue.replace(".",",");
        }
        else {
          var budgetDetails = SavingsPotMod.getFundWithDrawDetails();
          paramValue = budgetDetails.amount;
        }
      }
      this.setReference(paramValue);
      this.view.flxError.isVisible = false;
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    postShow: function () {
      this.updateAmountValue();
    },
    setReference: function (targetAmount) {
      if (targetAmount) {
        this.keypadString = targetAmount;
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
      if (this.keypadString === '0.00' || ((locale == "de-de" || locale === "fr-fr" || locale == "es-es") && this.keypadString === '0,00')) {
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
    continueOnClick: function () {
      var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
      var SavingsPotModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
      var type = SavingsPotMod.getSavingsType();
      var availableBalance = SavingsPotMod.getAvailableBalance();
      var AccountName = SavingsPotMod.getMaskedAccountName();
      var fundAmount = this.keypadString;
      var flag = SavingsPotMod.getInitiateTransfer();
      if (flag) {
        var navManager = applicationManager.getNavigationManager();
        var budgetDetails = navManager.getCustomInfo({"friendlyName" : "frmBudgetPotDetails", "appName" : "SavingsPotMA"});
        budgetDetails.fundAmount = fundAmount;
        navManager.setCustomInfo({"friendlyName" : "frmBudgetPotDetails", "appName" : "SavingsPotMA"}, budgetDetails)
      }
      if (parseFloat(fundAmount) > parseFloat(availableBalance)) {
        this.view.flxError.isVisible = true;
        this.view.lblError.text = "You have insufficient Balance in your" + " " + AccountName;
      } else {
        this.view.flxError.isVisible = false;
        if (type === "budgetFund") {
          SavingsPotModule.presentationController.navToBudgetAcknowledgement(fundAmount, {"friendlyName" : "frmBudgetInitiateTransferDetails", "appName" : "SavingsPotMA"});
        }
        else {
          SavingsPotModule.presentationController.navToFundVerifyDetails(fundAmount, "Credit", {"friendlyName" : "frmGoalfundverifyDetails", "appName" : "SavingsPotMA"});
        }
      }
    }
  };
});