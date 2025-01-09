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
    this.view.btnContinue.onClick = this.continueOnClick;
    this.view.flxFromImage.onTouchEnd = this.goalName;
    this.view.flxAmountImage.onTouchEnd = this.goalAmount;
    this.view.flxMonthlyAmountImg.onTouchEnd = this.periodicContribution;
    this.view.flxImg.onTouchEnd = this.noOfMonths;
    this.view.flxStartDateImg.onTouchEnd = this.startDate;
    this.view.flxFrequencyImg.onTouchEnd = this.frequency;
    this.view.flxFrequencyDateImg.onTouchEnd = this.frequencyDay;
    this.view.customHeader.flxBack.onTouchEnd = this.onBack;
    this.view.customHeader.btnRight.onClick = this.onCancelClick;
    this.view.flxTypeImage.onClick = this.goalType;
    this.setDataToForm();
  },
  getFinalDateForMonthly: function (startDate, months) {
    var tempDate = new Date(startDate);
    var finalDate = new Date(tempDate.setMonth(tempDate.getMonth() + months));
    if (finalDate.getDate() == startDate.getDate()) {
      return finalDate;
    }
    else {
      var endDate = new Date(finalDate.setMonth(finalDate.getMonth() - 1));
      var lastDay = new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0);
      return lastDay;
    }
  },
  getFinalDateForBiWeekly: function (startDate, goalAmount, periodicContribution) {
    var occurences = goalAmount / periodicContribution;
    var days = (occurences - 1) * 14;
    var endDate = startDate.setDate(startDate.getDate() + days);
    var finalDate = new Date(endDate);
    return finalDate;
  },
  setDataToForm: function () {
      var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
        var currencySymbol = SavingsPotMod.presentationController.getCurrencySymbol();
        var locale = kony.i18n.getCurrentLocale();
        locale = locale.toLowerCase();
        locale = locale.replace("_", "-");
        if (locale == "de-de" || locale === "fr-fr" || locale == "es-es") {
      var goalDetails = SavingsPotMod.presentationController.getBudgetDetails();
      var periodicFlag = SavingsPotMod.presentationController.getBiWeekly();
      if (periodicFlag) {
        var tempperiodicContribution = (Number((goalDetails.periodicContribution).replace(",", "."))) / 2;
        var setPeroidicContribution = String(tempperiodicContribution).replace(".",",");
        SavingsPotMod.presentationController.updatePeriodicContribution(setPeroidicContribution);
        goalDetails = SavingsPotMod.presentationController.getBudgetDetails();
        SavingsPotMod.presentationController.setBiWeekly("");
      }
      this.view.lblGoalTypeValue.text = goalDetails.savingsType;
      this.view.lblGoalNameValue.text = goalDetails.potName;
      this.view.lblAmountValue.text = currencySymbol + goalDetails.targetAmount;
      //  this.view.lblMonthlyAmountValue.text = "$"+((String(goalDetails.periodicContribution)).replace(/\B(?=(\d{3})+(?!\d))/g, "."));
      var locale = kony.i18n.getCurrentLocale();
    locale = locale.toLowerCase();
    locale = locale.replace("_", "-");
    if (locale == "de-de" || locale === "fr-fr" || locale == "es-es") 
        this.view.lblMonthlyAmountValue.text = currencySymbol+ goalDetails.periodicContribution.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      else
        this.view.lblMonthlyAmountValue.text = currencySymbol+ ((String(goalDetails.periodicContribution)).replace(/\B(?=(\d{3})+(?!\d))/g, ","));

      this.view.lblMonthsVal.text = goalDetails.targetPeriod;
      this.view.lblStartDateValue.text = goalDetails.startDate;
      this.view.flxFrequencyValue.text = goalDetails.frequency;
      this.view.lblFrequencyDateValue.text = goalDetails.freqDay;
      if (goalDetails.startDate) {
        var date = goalDetails.startDate;
        var dateformat = date;
        dateformat = dateformat.split("/");
        var period = Number((goalDetails.targetPeriod).replace(".", ""));
        var goalAmount;
        var locale = kony.i18n.getCurrentLocale();
    locale = locale.toLowerCase();
    locale = locale.replace("_", "-");
    if (locale == "de-de" || locale === "fr-fr" || locale == "es-es")
          goalAmount = Number((goalDetails.targetAmount).replace(".", "").replace(",", "."));
        else
          goalAmount = Number((goalDetails.targetAmount).replace(",", ""));
        var periodicContribution;
        var locale = kony.i18n.getCurrentLocale();
        locale = locale.toLowerCase();
        locale = locale.replace("_", "-");
        if (locale == "de-de" || locale === "fr-fr" || locale == "es-es")
          periodicContribution = Number((String(goalDetails.periodicContribution)).replace(".", "").replace(",", "."));

        else
          periodicContribution = Number((String(goalDetails.periodicContribution)).replace(",", ""));
        var endDate;
        if (goalDetails.frequency == "Biweekly") {
          endDate = this.getFinalDateForBiWeekly(new Date(dateformat[2], parseInt(dateformat[0]) - 1, dateformat[1]), goalAmount, periodicContribution);
        }
        else {
          endDate = this.getFinalDateForMonthly(new Date(dateformat[2], parseInt(dateformat[0]) - 1, dateformat[1]), period - 1);
        }
        var dateObj = new Date(endDate);
        var month = dateObj.getMonth() + 1; //months from 1-12
        if ((month.toString()).length == 1) {
          month = "0" + month;
        }
        var day = dateObj.getDate();
        if ((day.toString()).length == 1) {
          day = "0" + day;
        }
        var year = dateObj.getFullYear();
        var finalDate = month + "/" + day + "/" + year;
        SavingsPotMod.presentationController.updateEndDate(finalDate);
        this.view.lblFinalDateValue.text = finalDate;
      }

    }
    else {
      var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
      var goalDetails = SavingsPotMod.presentationController.getBudgetDetails();
      var periodicFlag = SavingsPotMod.presentationController.getBiWeekly();
      if (periodicFlag) {
        var tempperiodicContribution = (Number((goalDetails.periodicContribution).replace(",", ""))) / 2;
        SavingsPotMod.presentationController.updatePeriodicContribution(tempperiodicContribution);
        goalDetails = SavingsPotMod.presentationController.getBudgetDetails();
        SavingsPotMod.presentationController.setBiWeekly("");
      }
      this.view.lblGoalTypeValue.text = goalDetails.savingsType;
      this.view.lblGoalNameValue.text = goalDetails.potName;
      this.view.lblAmountValue.text = currencySymbol + goalDetails.targetAmount;
      this.view.lblMonthlyAmountValue.text = currencySymbol + ((String(goalDetails.periodicContribution)).replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      this.view.lblMonthsVal.text = goalDetails.targetPeriod;
      this.view.lblStartDateValue.text = goalDetails.startDate;
      this.view.flxFrequencyValue.text = goalDetails.frequency;
      this.view.lblFrequencyDateValue.text = goalDetails.freqDay;
      if (goalDetails.startDate) {
        var date = goalDetails.startDate;
        var dateformat = date;
        dateformat = dateformat.split("/");
        var period = Number((goalDetails.targetPeriod).replace(",", ""));
        var goalAmount = Number((goalDetails.targetAmount).replace(",", ""));
        var periodicContribution = Number((String(goalDetails.periodicContribution)).replace(",", ""));
        var endDate;
        if (goalDetails.frequency == "Biweekly") {
          endDate = this.getFinalDateForBiWeekly(new Date(dateformat[2], parseInt(dateformat[0]) - 1, dateformat[1]), goalAmount, periodicContribution);
        }
        else {
          endDate = this.getFinalDateForMonthly(new Date(dateformat[2], parseInt(dateformat[0]) - 1, dateformat[1]), period - 1);
        }
        var dateObj = new Date(endDate);
        var month = dateObj.getMonth() + 1; //months from 1-12
        if ((month.toString()).length == 1) {
          month = "0" + month;
        }
        var day = dateObj.getDate();
        if ((day.toString()).length == 1) {
          day = "0" + day;
        }
        var year = dateObj.getFullYear();
        var finalDate = month + "/" + day + "/" + year;
        SavingsPotMod.presentationController.updateEndDate(finalDate);
        this.view.lblFinalDateValue.text = finalDate;
      }
    }
  },
  onBack: function () {
    var navigationMan = applicationManager.getNavigationManager();
    navigationMan.goBack();
  },
  goalName: function () {
    var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
    SavingsPotMod.initializeStateData(true, {"appName" : "SavingsPotMA", "friendlyName" : "frmCreateGoalVerifyDetails"});
    SavingsPotMod.commonFunctionForNavigation({"appName" : "SavingsPotMA", "friendlyName" : "frmGoalName"});
  },
  goalAmount: function () {
    var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
    var goalDetails = SavingsPotMod.getBudgetDetails();
    if (goalDetails.frequency == "Biweekly") {
      var tempperiodicContribution;
      var locale = kony.i18n.getCurrentLocale();
      locale = locale.toLowerCase();
      locale = locale.replace("_", "-");
      if (locale == "de-de" || locale === "fr-fr" || locale == "es-es")
      tempperiodicContribution = ((Number(goalDetails.periodicContribution.replace(",","."))) * 2);
      else
      tempperiodicContribution = ((Number(goalDetails.periodicContribution)) * 2);
      SavingsPotMod.updatePeriodicContribution(tempperiodicContribution);
      SavingsPotMod.setBiWeekly("YES");
    }

    SavingsPotMod.initializeStateData(true,{"appName" : "SavingsPotMA", "friendlyName" : "frmCreateGoalVerifyDetails"});
    SavingsPotMod.commonFunctionForNavigation({"appName" : "SavingsPotMA", "friendlyName" : "frmOptimizeGoal"});
  },
  periodicContribution: function () {
    var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
    var goalDetails = SavingsPotMod.getBudgetDetails();
    if (goalDetails.frequency == "Biweekly") {
       var tempperiodicContribution;
       var locale = kony.i18n.getCurrentLocale();
       locale = locale.toLowerCase();
       locale = locale.replace("_", "-");
       if (locale == "de-de" || locale === "fr-fr" || locale == "es-es")
      tempperiodicContribution = ((Number(goalDetails.periodicContribution.replace(",","."))) * 2);
      else
      tempperiodicContribution = ((Number(goalDetails.periodicContribution)) * 2);

      SavingsPotMod.updatePeriodicContribution(tempperiodicContribution);
      SavingsPotMod.setBiWeekly("YES");
    }
    SavingsPotMod.initializeStateData(true, {"appName" : "SavingsPotMA", "friendlyName" : "frmCreateGoalVerifyDetails"});
    SavingsPotMod.commonFunctionForNavigation({"appName" : "SavingsPotMA", "friendlyName" : "frmOptimizeGoal"});
  },
  noOfMonths: function () {
    var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
    var goalDetails = SavingsPotMod.getBudgetDetails();
    if (goalDetails.frequency == "Biweekly") {
      var tempperiodicContribution = ((Number(goalDetails.periodicContribution)) * 2);
      SavingsPotMod.updatePeriodicContribution(tempperiodicContribution);
      SavingsPotMod.setBiWeekly("YES");
    }
    SavingsPotMod.initializeStateData(true, {"appName" : "SavingsPotMA", "friendlyName" : "frmCreateGoalVerifyDetails"});
    SavingsPotMod.commonFunctionForNavigation({"appName" : "SavingsPotMA", "friendlyName" : "frmOptimizeGoal"});
  },
  startDate: function () {
    var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
    SavingsPotMod.initializeStateData(true,{"appName" : "SavingsPotMA", "friendlyName" : "frmCreateGoalVerifyDetails"} );
    SavingsPotMod.commonFunctionForNavigation({"appName" : "SavingsPotMA", "friendlyName" : "frmCreateSavingsGoalFrequencyDate"});
  },
  frequency: function () {
    var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
    SavingsPotMod.initializeStateData(true,{"appName" : "SavingsPotMA", "friendlyName" : "frmCreateGoalVerifyDetails"} );
    SavingsPotMod.commonFunctionForNavigation({"appName" : "SavingsPotMA", "friendlyName" : "frmCreateSavingsGoalFrequency"});
  },
  frequencyDay: function () {
    var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
    SavingsPotMod.initializeStateData(true, {"appName" : "SavingsPotMA", "friendlyName" : "frmCreateGoalVerifyDetails"});
    SavingsPotMod.commonFunctionForNavigation({"appName" : "SavingsPotMA", "friendlyName" : "frmCreateSavingsGoalFrequencyDate"});
  },
  goalType: function () {
    var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
    SavingsPotMod.initializeStateData(true, {"appName" : "SavingsPotMA", "friendlyName" : "frmCreateGoalVerifyDetails"});
    SavingsPotMod.commonFunctionForNavigation({"appName" : "SavingsPotMA", "friendlyName" : "frmGoalsType"});
  },
  continueOnClick: function () {
    var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
    var params = SavingsPotMod.getAccountId();
    SavingsPotMod.creteSavingsGoal(params);
  },
  onCancelClick: function () {
    var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
    SavingsPotMod.clearCreateData();
    var navManager = applicationManager.getNavigationManager();
	var createBudgetPermission  = applicationManager.getConfigurationManager().checkUserPermission("BUDGET_POT_CREATE");
    (createBudgetPermission)?navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "frmSavingsType"}):navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "frmMySavingsPot"}); 
  },
  bindGenericError: function (errorMsg) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var scopeObj = this;
    applicationManager.getDataProcessorUtility().showToastMessageError(scopeObj, errorMsg);
  }

});