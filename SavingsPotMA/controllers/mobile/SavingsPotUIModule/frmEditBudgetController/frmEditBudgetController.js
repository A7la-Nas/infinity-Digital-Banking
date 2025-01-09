define({

  init: function () {
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
  },

  preshow: function () {
    if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
      this.view.flxHeader.isVisible = true;
    }
    else {
      this.view.flxHeader.isVisible = false;
    }
    this.initActions();
  },
  postShow: function () {

  },
  initActions: function () {
    this.view.customHeader.flxBack.onClick = this.onBack;
    this.view.btnSaveConfirm.onClick = this.continueOnClick;
    this.view.btnClose.onClick = this.closeOnClick;
    this.view.flxFromImage.onTouchEnd = this.goalName;
    this.view.flxAmountImage.onTouchEnd = this.goalAmount;
    this.view.customHeader.btnRight.onClick = this.onCancelClick;
    this.view.flxError.setVisibility(false);
    this.setDataToForm();
    this.checkPermissions();
  },
  setDataToForm: function () {
    var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
    var navManager = applicationManager.getNavigationManager();
    var budgetDetails = navManager.getCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "frmBudgetPotDetails"});
    var formatUtil = applicationManager.getFormatUtilManager();
    var currencyCode = SavingsPotMod.presentationController.getCurrencyCode();
    var locale = kony.i18n.getCurrentLocale();
    locale = locale.toLowerCase();
    locale = locale.replace("_", "-");
    if (locale == "de-de" || locale === "fr-fr" || locale == "es-es") {
      budgetDetails.targetAmount = budgetDetails.targetAmount.replace(",", ".");
    }
    else {
      budgetDetails.targetAmount = budgetDetails.targetAmount.replace(/[, ]+/g, "");
    }
    this.view.lblGoalNameValue.text = budgetDetails.potName;
    this.view.lblAmountValue.text = formatUtil.formatAmountandAppendCurrencySymbol(budgetDetails.targetAmount, currencyCode);
    this.view.lblCurrBalanceValue.text = formatUtil.formatAmountandAppendCurrencySymbol(budgetDetails.availableBalance, currencyCode);
  },
  onBack: function () {
    var navigationMan = applicationManager.getNavigationManager();
    navigationMan.goBack();
  },
  goalName: function () {
    var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
    SavingsPotMod.setSavingsType("editBudgetName");
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "frmBudgetName"});
  },
  goalAmount: function () {
    var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
    SavingsPotMod.setSavingsType("editBudgetAmount");
    var navManager = applicationManager.getNavigationManager();
    var budgetDetails = navManager.getCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "frmBudgetPotDetails"});
    var formatUtil = applicationManager.getFormatUtilManager();
    var amount = formatUtil.formatAmount(budgetDetails.targetAmount);
    var locale = kony.i18n.getCurrentLocale();
    locale = locale.toLowerCase();
    locale = locale.replace("_", "-");
    if (locale == "de-de" || locale === "fr-fr" || locale == "es-es") {
      budgetDetails.targetAmount = amount.replace(/[. ]+/g, "");
    }
    else {
      budgetDetails.targetAmount = amount.replace(/[, ]+/g, "");
    }
    navManager.setCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "frmBudgetPotDetails"}, budgetDetails);
    navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "frmBudgetfundAmount"});
  },
  /*Function to show/hide close budget pot button based on user permissions*/
  checkPermissions: function () {
    var self = this;
    var closeBudgetPotPermission = applicationManager.getConfigurationManager().checkUserPermission("BUDGET_POT_CLOSE");
    (closeBudgetPotPermission) ? self.view.btnClose.isVisible = true : self.view.btnClose.isVisible = false;
  },
  continueOnClick: function () {
    var targetAmount;
    var locale = kony.i18n.getCurrentLocale();
    locale = locale.toLowerCase();
    locale = locale.replace("_", "-");
    if (locale == "de-de" || locale === "fr-fr" || locale == "es-es") {
      targetAmount = this.view.lblAmountValue.text.replace(/[. ]+/g, "");
      targetAmount = targetAmount.replace(",", ".");
    }
    else {
      targetAmount = this.view.lblAmountValue.text.replace(/[, ]+/g, "");
    }
    var budgetAmount=parseInt(this.deformatAmount(this.view.lblCurrBalanceValue.text.trim()));
    var currentbalance=parseInt(this.deformatAmount(targetAmount));
    if(currentbalance<=budgetAmount){
      this.view.flxError.setVisibility(true);
    }else{
      var potName = this.view.lblGoalNameValue.text;
      var params = {
        "targetAmount": targetAmount.slice(1),
        "potName": potName,
        "potType": "Budget"
      };
    this.view.flxError.setVisibility(false);
    var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
    SavingsPotMod.updateSavingsBudget(params);
    }
  },
  deformatAmount: function (amount) {
      return applicationManager.getFormatUtilManager().deFormatAmount(amount);
    },
  closeOnClick: function () {
    var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
    var navManager = applicationManager.getNavigationManager();
    var budgetDetails = navManager.getCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "frmBudgetPotDetails"});
    var potName = this.view.lblGoalNameValue.text;
    var accountName = SavingsPotMod.getMaskedAccountName();
    if (budgetDetails.availableBalance > "0") {
      var message = "Your Budget pot " + potName + " is not zero, do you want to move the balance to Primary Account " + accountName + " and close";
    } else {
      var message = "Do you want to close your Savings Budget " + potName;
    }
    var basicProperties =
    {
      "message": message,
      "alertType": constants.ALERT_TYPE_CONFIRMATION,
      "alertTitle": "Close Savings Budget",
      "noLabel": "NO",
      "yesLabel": "YES",
      "alertIcon": "appicon.png",
      "alertHandler": function (response) {
        if (response) {
          var savingsPotId = SavingsPotMod.getSavingsPotId();
          var params = {
            "savingsPotId": savingsPotId
          }
          SavingsPotMod.closeSavingsPot(params);
        } else {
          kony.print("Dismiss");
        }
      }
    };
    applicationManager.getPresentationUtility().showAlertMessage(basicProperties, {});
  },
  onCancelClick: function () {
    var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
    SavingsPotMod.presentationController.setSavingsFlow("");
    SavingsPotMod.presentationController.clearCreateData();
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "frmBudgetPotDetails"});
  },
  bindGenericError: function (errorMsg) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
  }

});