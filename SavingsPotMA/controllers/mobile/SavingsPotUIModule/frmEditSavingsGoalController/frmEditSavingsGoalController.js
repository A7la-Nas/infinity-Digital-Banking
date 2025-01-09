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
    this.view.btnClose.onClick = this.onClose;
    this.view.flxTypeImage.onTouchEnd = this.goalType;
    this.view.flxFromImage.onTouchEnd = this.goalName;
    this.view.flxAmountImage.onTouchEnd = this.goalAmount;
    this.view.flxMonthlyAmountImg.onTouchEnd = this.periodicContribution;
    this.view.flxImg.onTouchEnd = this.period;
    this.view.flxFrequencyImg.onTouchEnd = this.frequency;
    this.view.flxFrequencyDateImg.onTouchEnd = this.frequencyDay;
    this.view.customHeader.btnRight.onClick = this.onCancelClick;
    this.setDataToForm();
    this.checkPermissions();
  },

  setDataToForm: function () {
    var navManager = applicationManager.getNavigationManager();
    var goalDetails = navManager.getCustomInfo({"friendlyName" : "frmSavingsGoalViewDetails", "appName" : "SavingsPotMA"});
    var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
    var currencyCode = SavingsPotMod.presentationController.getCurrencyCode();
    if (goalDetails.periodicFlag) {
      var locale = kony.i18n.getCurrentLocale();
      locale = locale.toLowerCase();
      locale = locale.replace("_", "-");
      if (locale == "de-de" || locale === "fr-fr" || locale == "es-es") {
        goalDetails.periodicContribution = goalDetails.periodicContribution;
        goalDetails.periodicContribution = goalDetails.periodicContribution + "";
      }
      else {
        goalDetails.periodicContribution = (Number((String(goalDetails.periodicContribution)).replace(",", ""))) / 2;
      }
      goalDetails.periodicFlag = "";
      navManager.setCustomInfo({"friendlyName" : "frmSavingsGoalViewDetails", "appName" : "SavingsPotMA"}, goalDetails);
      goalDetails = navManager.getCustomInfo({"friendlyName" : "frmSavingsGoalViewDetails", "appName" : "SavingsPotMA"});
    }
    var formatUtil = applicationManager.getFormatUtilManager();
    this.view.lblGoalNameValue.text = goalDetails.potName;
    var category = navManager.getCustomInfo({"friendlyName" : "frmEditGoalsType", "appName" : "SavingsPotMA"});
    for (var TitleNo in category) {
      var data = category[TitleNo];
      if (data.name == goalDetails.savingsType) {
        goalDetails.savingsName = data.name;
        goalDetails.savingsType = data.description;
      }
    }
    navManager.setCustomInfo({"friendlyName" : "frmEditGoalsType", "appName" : "SavingsPotMA"}, category);
    this.view.lblGoalTypeValue.text = goalDetails.savingsType;
    this.view.lblAmountValue.text = formatUtil.formatAmountandAppendCurrencySymbol(goalDetails.targetAmount, currencyCode);
    this.view.lblCurrBalanceValue.text = formatUtil.formatAmountandAppendCurrencySymbol(goalDetails.availableBalance, currencyCode);
    this.view.lblMonthlyAmountValue.text = formatUtil.formatAmountandAppendCurrencySymbol(goalDetails.periodicContribution, currencyCode);
    this.view.lblMonthsVal.text = goalDetails.targetPeriod;
    this.view.flxFrequencyValue.text = goalDetails.frequency;
    this.view.lblFrequencyDateValue.text = goalDetails.frequencyDay;
    var currencySymbol = SavingsPotMod.presentationController.getCurrencySymbol();
    if (parseFloat(goalDetails.availableBalance) > parseFloat(goalDetails.targetAmount)) {
      this.view.lblRemSavingsValue.text = currencySymbol+"0.00";
    } else {
      this.view.lblRemSavingsValue.text = formatUtil.formatAmountandAppendCurrencySymbol(goalDetails.remainingSavings, currencyCode);
    }
    var endDateobj = formatUtil.getDateObjectfromString(goalDetails.endDate, "MM/DD/YYYY");
    var endDate = formatUtil.getFormatedDateString(endDateobj, formatUtil.getApplicationDateFormat());
    this.view.lblFinalDateValue.text = endDate;
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  onBack: function () {
    var navigationMan = applicationManager.getNavigationManager();
    navigationMan.goBack();
  },
  goalType: function () {
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo({"friendlyName" : "frmEditGoalsType", "appName" : "SavingsPotMA"});
  },
  goalName: function () {
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo({"friendlyName" : "frmGoalName", "appName" : "SavingsPotMA"});
  },
  goalAmount: function () {
    var navManager = applicationManager.getNavigationManager();

    var goalDetails = navManager.getCustomInfo({"friendlyName" : "frmSavingsGoalViewDetails", "appName" : "SavingsPotMA"});
    if (goalDetails.frequency == "Biweekly") {
      goalDetails.periodicContribution = ((Number(goalDetails.periodicContribution)) * 2);
      goalDetails.periodicFlag = "YES";
    }
    navManager.setCustomInfo({"friendlyName" : "frmSavingsGoalViewDetails", "appName" : "SavingsPotMA"}, goalDetails)
    navManager.navigateTo({"friendlyName" : "frmEditOptimizeGoal", "appName" : "SavingsPotMA"});
  },
  /*Function to show/hide close savings goal button based on user permissions*/
  checkPermissions: function () {
    var self = this;
    var closeGoalPotPermission = applicationManager.getConfigurationManager().checkUserPermission("GOAL_POT_CLOSE");
    (closeGoalPotPermission) ? self.view.btnClose.isVisible = true : self.view.btnClose.isVisible = false;
  },
  periodicContribution: function () {
    var navManager = applicationManager.getNavigationManager();
    var goalDetails = navManager.getCustomInfo({"friendlyName" : "frmSavingsGoalViewDetails", "appName" : "SavingsPotMA"});
    if (goalDetails.frequency == "Biweekly") {
      goalDetails.periodicContribution = ((Number(goalDetails.periodicContribution)) * 2);
      goalDetails.periodicFlag = "YES";
    }
    navManager.setCustomInfo({"friendlyName" : "frmSavingsGoalViewDetails", "appName" : "SavingsPotMA"}, goalDetails);
    navManager.navigateTo({"friendlyName" : "frmEditOptimizeGoal", "appName" : "SavingsPotMA"});
  },
  period: function () {
    var navManager = applicationManager.getNavigationManager();
    var goalDetails = navManager.getCustomInfo({"friendlyName" : "frmSavingsGoalViewDetails", "appName" : "SavingsPotMA"});
    if (goalDetails.frequency == "Biweekly") {
      goalDetails.periodicContribution = ((Number(goalDetails.periodicContribution)) * 2);
      goalDetails.periodicFlag = "YES";
    }
    navManager.setCustomInfo({"friendlyName" : "frmSavingsGoalViewDetails", "appName" : "SavingsPotMA"}, goalDetails);
    navManager.navigateTo({"friendlyName" : "frmEditOptimizeGoal", "appName" : "SavingsPotMA"});
  },
  frequency: function () {
    var navManager = applicationManager.getNavigationManager();
    navManager.navigateTo({"friendlyName" : "frmCreateSavingsGoalFrequency", "appName" : "SavingsPotMA"});
  },
  frequencyDay: function () {
    var navManager = applicationManager.getNavigationManager();
    var goalDetails = navManager.getCustomInfo({"friendlyName" : "frmSavingsGoalViewDetails", "appName" : "SavingsPotMA"});
    if (goalDetails.frequency == "Monthly") {
      navManager.navigateTo({"friendlyName" : "frmEditMonthlyFrequencyDay", "appName" : "SavingsPotMA"});
    }
    else {
      navManager.navigateTo({"friendlyName" : "frmEditWeeklyFrequencyDay", "appName" : "SavingsPotMA"});
    }
  },
  continueOnClick: function () {
    var locale = kony.i18n.getCurrentLocale();
    locale = locale.toLowerCase();
    locale = locale.replace("_", "-");
    if (locale == "de-de" || locale === "fr-fr" || locale == "es-es") {
      var navManager = applicationManager.getNavigationManager();
      var goalDetails = navManager.getCustomInfo({"friendlyName" : "frmSavingsGoalViewDetails", "appName" : "SavingsPotMA"});
      var targetAmount = this.view.lblAmountValue.text.replace(/[\\. ]+/g, "");
      targetAmount = targetAmount.replace(",", ".");
      var availableBalance = this.view.lblCurrBalanceValue.text.replace(/[\\. ]+/g, "");
      availableBalance = availableBalance.replace(",", ".");
      var periodicContribution = this.view.lblMonthlyAmountValue.text.replace(/[\\. ]+/g, "");
      periodicContribution = periodicContribution.replace(",", ".");
      var remainingSavings = this.view.lblRemSavingsValue.text.replace(/[\\. ]+/g, "");
      remainingSavings = remainingSavings.replace(",", ".");
      var params = {
        "targetAmount": targetAmount.slice(targetAmount.search(/\d/)),
        "potType": "Goal",
        "productId": "SAVINGS.ACCOUNT",
        "endDate": this.view.lblFinalDateValue.text,
        "targetPeriod": this.view.lblMonthsVal.text,
        "potName": this.view.lblGoalNameValue.text,
        "frequency": this.view.flxFrequencyValue.text,
        "availableBalance": availableBalance.slice(availableBalance.search(/\d/)),
        "remainingSavings": remainingSavings.slice(remainingSavings.search(/\d/)),
        "periodicContribution": periodicContribution.slice(periodicContribution.search(/\d/)),
        "currency": goalDetails.currency,
        "startDate": goalDetails.startDate,
        "fundingAccountId": goalDetails.fundingAccountId,
        "savingsType": goalDetails.savingsName
      }
    }
    else {
      var navManager = applicationManager.getNavigationManager();
      var goalDetails = navManager.getCustomInfo({"friendlyName" : "frmSavingsGoalViewDetails", "appName" : "SavingsPotMA"});
      var targetAmount = this.view.lblAmountValue.text.replace(/[, ]+/g, "");
      var availableBalance = this.view.lblCurrBalanceValue.text.replace(/[, ]+/g, "");
      var periodicContribution = this.view.lblMonthlyAmountValue.text.replace(/[, ]+/g, "");
      var remainingSavings = this.view.lblRemSavingsValue.text.replace(/[, ]+/g, "");
      var params = {
        "targetAmount": targetAmount.slice(targetAmount.search(/\d/)),
        "potType": "Goal",
        "productId": "SAVINGS.ACCOUNT",
        "endDate": this.view.lblFinalDateValue.text,
        "targetPeriod": this.view.lblMonthsVal.text,
        "potName": this.view.lblGoalNameValue.text,
        "frequency": this.view.flxFrequencyValue.text,
        "availableBalance": availableBalance.slice(availableBalance.search(/\d/)),
        "remainingSavings": remainingSavings.slice(remainingSavings.search(/\d/)),
        "periodicContribution": periodicContribution.slice(periodicContribution.search(/\d/)),
        "currency": goalDetails.currency,
        "startDate": goalDetails.startDate,
        "fundingAccountId": goalDetails.fundingAccountId,
        "savingsType": goalDetails.savingsName
      }
    }
    var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
    SavingsPotMod.presentationController.updateSavingsPocket(params, {"friendlyName" : "frmEditGoalsAcknowledgement", "appName" : "SavingsPotMA"});
  },
  onClose: function () {
    var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
    var navManager = applicationManager.getNavigationManager();
    var goalDetails = navManager.getCustomInfo({"friendlyName" : "frmSavingsGoalViewDetails", "appName" : "SavingsPotMA"});
    var potName = this.view.lblGoalNameValue.text;
    var accountName = SavingsPotMod.getMaskedAccountName();
    if (goalDetails.availableBalance > "0") {
      var message = "Your Goal pot " + potName + " is not zero, do you want to move the balance to Primary Account " + accountName + " and close";
    } else {
      var message = "Do you want to close your Savings Goal " + potName;
    }
    var basicProperties =
    {
      "message": message,
      "alertType": constants.ALERT_TYPE_CONFIRMATION,
      "alertTitle": "Close Savings Goal",
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
    navManager.navigateTo({"friendlyName" : "frmSavingsGoalViewDetails", "appName" : "SavingsPotMA"});
  },
  bindGenericError: function (errorMsg) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
  }

});