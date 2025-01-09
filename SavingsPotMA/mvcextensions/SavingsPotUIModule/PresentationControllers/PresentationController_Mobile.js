define(['CommonUtilities'], function (CommonUtilities) {
  /**
   * User defined presentation controller
   * @constructor
   * @extends kony.mvc.Presentation.BasePresenter
   */
  function SavingsPot_PresentationController() {
    scope_SavingsPotPresentationController = this;
    //stateNavigation - holds the value as true if it is on state management form like amount or review screen and for rest of screens hold false value
    scope_SavingsPotPresentationController.stateNavigation = "";
    //stateTriggeredForm - holds the value as mame of form where state management has triggered.
    scope_SavingsPotPresentationController.stateTriggeredForm = "";
    kony.mvc.Presentation.BasePresenter.call(this);
    this.SavingsType = "";
    this.AccountId = "";
    this.AccountName = "";
    this.PotName = "";
    this.PotID = "";
    this.EditFlow = "";
    this.savingsTypeName = "";
    this.freqDay = "";
    this.EditBackupObj = {};
    this.TransactPotID = "";
    this.InitiateTransfer = "";
    this.AvailableBalance = "";
    this.biWeeklyflag = "";
    this.currencySymbol = "";
    this.currencyCode = "";
    this.potCategory = [];
    this.targetAmount = "";
    this.targetPeriod = "";
    this.periodicContribution = "";
  }

  inheritsFrom(SavingsPot_PresentationController, kony.mvc.Presentation.BasePresenter);

  /**
   * Overridden Method of kony.mvc.Presentation.BasePresenter
   * This method gets called when presentation controller gets initialized
   * @method
   */
  SavingsPot_PresentationController.prototype.initializePresentationController = function () {

  };
  SavingsPot_PresentationController.prototype.setInitiateTransfer = function (params) {
    this.InitiateTransfer = params;
  };
  SavingsPot_PresentationController.prototype.getInitiateTransfer = function () {
    return this.InitiateTransfer;
  };
  SavingsPot_PresentationController.prototype.setBiWeekly = function (params) {
    this.biWeeklyflag = params;
  };
  SavingsPot_PresentationController.prototype.getBiWeekly = function () {
    return this.biWeeklyflag;
  };
  SavingsPot_PresentationController.prototype.setEditObj = function (params) {
    this.EditBackupObj = JSON.parse(JSON.stringify(params));
  };
  SavingsPot_PresentationController.prototype.getEditObj = function () {
    return this.EditBackupObj;
  };
  SavingsPot_PresentationController.prototype.setSavingsType = function (params) {
    this.SavingsType = params;
  };
  SavingsPot_PresentationController.prototype.getSavingsType = function () {
    return this.SavingsType;
  };
  SavingsPot_PresentationController.prototype.setSavingsFlow = function (params) {
    this.EditFlow = params;
  };
  SavingsPot_PresentationController.prototype.getSavingsFlow = function () {
    return this.EditFlow;
  };
  SavingsPot_PresentationController.prototype.setAccountId = function (params) {
    this.AccountId = params;
  };
  SavingsPot_PresentationController.prototype.getAccountId = function () {
    return this.AccountId;
  };

  SavingsPot_PresentationController.prototype.setMaskedAccountName = function (params) {
    this.AccountName = params;
  };
  SavingsPot_PresentationController.prototype.getMaskedAccountName = function () {
    return this.AccountName;
  };

  SavingsPot_PresentationController.prototype.setSavingsPotName = function (params) {
    this.PotName = params;
  };
  SavingsPot_PresentationController.prototype.getSavingsPotName = function () {
    return this.PotName;
  };

  SavingsPot_PresentationController.prototype.setSavingsPotId = function (params) {
    this.PotID = params;
  };
  SavingsPot_PresentationController.prototype.getSavingsPotId = function () {
    return this.PotID;
  };

  SavingsPot_PresentationController.prototype.setTransactPotId = function (params) {
    this.TransactPotID = params;
  };
  SavingsPot_PresentationController.prototype.getTransactPotId = function () {
    return this.TransactPotID;
  };

  SavingsPot_PresentationController.prototype.setfreqDay = function (params) {
    this.freqDay = params;
  };
  SavingsPot_PresentationController.prototype.getfreqDay = function () {
    return this.freqDay;
  };
  SavingsPot_PresentationController.prototype.setsavingsTypeName = function (params) {
    this.savingsTypeName = params;
  };
  SavingsPot_PresentationController.prototype.getsavingsTypeName = function () {
    return this.freqDay;
  };
  SavingsPot_PresentationController.prototype.setAvailableBalance = function (params) {
    this.AvailableBalance = params;
  };
  SavingsPot_PresentationController.prototype.getAvailableBalance = function () {
    return this.AvailableBalance;
  };
  SavingsPot_PresentationController.prototype.setPotCategory = function (params) {
    this.potCategory = params;
  };
  SavingsPot_PresentationController.prototype.getPotCategory = function () {
    return this.potCategory;
  };
  SavingsPot_PresentationController.prototype.commonFunctionForNavigation = function (formName) {
    var navManager = applicationManager.getNavigationManager();
    var currentForm = kony.application.getCurrentForm();
    // If state management is triggered and if it is not on the state triggered form then we will navigate to state triggered form and ignoring it's entry(passing additional parameter boolean along with the form name to navigateTo method) into the navigation stack as the form is being re-visited
    if (scope_SavingsPotPresentationController.stateNavigation && scope_SavingsPotPresentationController.stateTriggeredForm !== currentForm.id) {
      navManager.navigateTo(scope_SavingsPotPresentationController.stateTriggeredForm, true);
      scope_SavingsPotPresentationController.stateNavigation = false;
      scope_SavingsPotPresentationController.stateTriggeredForm = "";
    }
    // If state management is triggered and if it is on the state triggered form then we will navigate to specified form and ignoring it's entry into the navigation stack as the form is being re-visited
    else if (scope_SavingsPotPresentationController.stateNavigation) {
      navManager.navigateTo(formName, true);
    }
    // This is triggered when the forms are being visited for the first time.
    else {
      navManager.navigateTo(formName);
    }
  };
  /**
   * This method is used to handle the backward navigation including state management
   */
  SavingsPot_PresentationController.prototype.commonFunctionForgoBack = function () {
    var navManager = applicationManager.getNavigationManager();
    var currentForm = kony.application.getCurrentForm();
    // If state management is triggered and if it is not on the state triggered form then we will navigate to state triggered form and ignoring it's entry(passing additional parameter boolean along with the form name to navigateTo method) into the navigation stack as the form is being re-visited
    if (scope_SavingsPotPresentationController.stateNavigation && scope_SavingsPotPresentationController.stateTriggeredForm !== currentForm.id) {
      navManager.navigateTo(scope_SavingsPotPresentationController.stateTriggeredForm, true);
      scope_SavingsPotPresentationController.stateNavigation = false;
      scope_SavingsPotPresentationController.stateTriggeredForm = "";
    }
    // This is triggered when the forms entry into navigation manager's stack is equal to one .
    else {
      navManager.goBack();
    }
  };

  /**
   * This method is a pass-through to return the SavingsPot object
   */
  SavingsPot_PresentationController.prototype.getCreateObject = function () {
    var SavingsMan = applicationManager.getSavingsPotManager();
    var obj = SavingsMan.getCreateBudgetData();
    return obj;
  };
  /**
      * This method is a pass-through to return the Clears Savings object
      */
  SavingsPot_PresentationController.prototype.clearCreateData = function () {
    var SavingsMan = applicationManager.getSavingsPotManager();
    var obj = SavingsMan.clearCreateBudgetData();
    return obj;
  };

  /**
   * This method is used to initialise the state management flow
   * initialized- {boolean} hold the initialisation state value
   * triggeredForm - {String} holds the form name from where state management has been triggered.
   */
  SavingsPot_PresentationController.prototype.initializeStateData = function (initialized, triggeredForm) {
    scope_SavingsPotPresentationController.stateNavigation = initialized;
    scope_SavingsPotPresentationController.stateTriggeredForm = triggeredForm;
  };
  SavingsPot_PresentationController.prototype.updateSavingsPocket = function (params, formName) {
    var SavingsPotManager = applicationManager.getSavingsPotManager();
    var savingsObj = SavingsPotManager.getCreateBudgetData();
    var PotId = this.getSavingsPotId();
    var TransactPotID = this.getTransactPotId();
    params.savingsPotId = PotId;
    params.potAccountId = TransactPotID;
    if (params.potType === "Goal") {
      var potManager = applicationManager.getSavingsPotManager();
      potManager.updateSavingsPot(params, scope_SavingsPotPresentationController.updateSavingsPocketSuccessCallback, scope_SavingsPotPresentationController.updateSavingsPocketFailureCallback);
      applicationManager.getPresentationUtility().showLoadingScreen();
    }
  };
  SavingsPot_PresentationController.prototype.updateSavingsPocketSuccessCallback = function (data) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    if(data.message)
    navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "SavingsPotUIModule/frmEditGoalsAcknowledgement"});
  };
  SavingsPot_PresentationController.prototype.updateSavingsPocketFailureCallback = function (error) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager()
	navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "SavingsPotUIModule/frmCreateGoalAckError"});
  };
  SavingsPot_PresentationController.prototype.initiatePot = function (potType, formName) {
    var SavingsPotManager = applicationManager.getSavingsPotManager();
    SavingsPotManager.setAttributeCreateBudget("potType", potType);
    if (potType === "Goal") {
      var potManager = applicationManager.getSavingsPotManager();
      potManager.fetchCategoriesForGoal(scope_SavingsPotPresentationController.categoriesSuccessCallback, scope_SavingsPotPresentationController.categoriesFailureCallback);
      applicationManager.getPresentationUtility().showLoadingScreen();
    }
    else {
      this.commonFunctionForNavigation(formName);
    }
  };
  SavingsPot_PresentationController.prototype.categoriesSuccessCallback = function (data) {
    var category = data.category;
    var navManager = applicationManager.getNavigationManager();
    if (scope_SavingsPotPresentationController.EditFlow) {
	  navManager.setCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "SavingsPotUIModule/frmEditGoalsType"}, category);
      scope_SavingsPotPresentationController.setPotCategory(category);
      var goalDetails = scope_SavingsPotPresentationController.EditBackupObj;
      navManager.setCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "SavingsPotUIModule/frmEditSavingsGoal"}, goalDetails); 
	  navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "SavingsPotUIModule/frmEditSavingsGoal"});
    }
    else {
      navManager.setCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "SavingsPotUIModule/frmGoalsType"}, category);
	  navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "SavingsPotUIModule/frmGoalsType"});
    }
  };
  SavingsPot_PresentationController.prototype.categoriesFailureCallback = function (error) {
    var navManager = applicationManager.getNavigationManager();
    if (scope_SavingsPotPresentationController.EditFlow) {
	 navManager.setCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "SavingsPotUIModule/frmEditGoalsType"}, error);
	  navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "SavingsPotUIModule/frmEditSavingsGoal"});
    }
    else {
	  navManager.setCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "SavingsPotUIModule/frmGoalsType"}, error);
	  navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "SavingsPotUIModule/frmGoalsType"});
    }
  };
  SavingsPot_PresentationController.prototype.navToMySavingsPot = function (accountsDetails) {
    var accountID = accountsDetails.selectedAccountData ? accountsDetails.selectedAccountData.accountID : accountsDetails.accountID;
    var accountName = accountsDetails.selectedAccountData ? accountsDetails.selectedAccountData.accountName : accountsDetails.accountName;
    var accountbalance = accountsDetails.selectedAccountData ? accountsDetails.selectedAccountData.availableBalance : accountsDetails.availableBalance;
    var currencyCode = accountsDetails.selectedAccountData ? accountsDetails.selectedAccountData.currencyCode : accountsDetails.currencyCode;
    this.setCurrencyCode(currencyCode);
    var maskAccountName = CommonUtilities.truncateStringWithGivenLength(accountName + "....", 26) + CommonUtilities.getLastFourDigit(accountID);
    var fundingAccountId = {
      "fundingAccountId": accountsDetails.fundingAccountId || accountsDetails.Account_id
    };
    this.setAccountId(accountID);
    this.setMaskedAccountName(maskAccountName);
    this.setAvailableBalance(accountbalance);
    var potManager = applicationManager.getSavingsPotManager();
    potManager.fetchSavingsPotsDetails(fundingAccountId, scope_SavingsPotPresentationController.myPotSuccessCallback, scope_SavingsPotPresentationController.myPotFailureCallback);
    applicationManager.getPresentationUtility().showLoadingScreen();
  };
  SavingsPot_PresentationController.prototype.setCurrencyCode = function (currencyCode) {
    var currencySymbolObj= { "EUR":"€","USD":"$","GBP":"£","YER":"YER","SAR":"SAR"};
    this.currencyCode = currencyCode;
    this.currencySymbol= currencySymbolObj[currencyCode];
  };
  SavingsPot_PresentationController.prototype.getCurrencyCode = function () {
    return this.currencyCode;
  };
  SavingsPot_PresentationController.prototype.getCurrencySymbol = function () {
    return this.currencySymbol;
  };
  SavingsPot_PresentationController.prototype.myPotSuccessCallback = function (data) {
    var savingsPot = data.savingsPot;
    var navManager = applicationManager.getNavigationManager();
	navManager.setCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "SavingsPotUIModule/frmMySavingsPot"}, savingsPot);
	navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "SavingsPotUIModule/frmMySavingsPot"});
  };
  SavingsPot_PresentationController.prototype.myPotFailureCallback = function (error) {
    var navManager = applicationManager.getNavigationManager();
    navManager.setCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "SavingsPotUIModule/frmMySavingsPot"}, error);
	navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "SavingsPotUIModule/frmMySavingsPot"});
  };
  SavingsPot_PresentationController.prototype.getAllSavingsPot = function (accountsDetails) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var fundingAccountId = {
      "fundingAccountId": accountsDetails
    }
    var potManager = applicationManager.getSavingsPotManager();
    potManager.fetchSavingsPotsDetails(fundingAccountId, scope_SavingsPotPresentationController.getAllPotSuccessCallback, scope_SavingsPotPresentationController.getAllPotFailureCallback);
  };
  SavingsPot_PresentationController.prototype.getAllPotSuccessCallback = function (data) {
    var savingsPot = data.savingsPot;
    var navManager = applicationManager.getNavigationManager();
	navManager.setCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "SavingsPotUIModule/frmMySavingsPot"}, savingsPot);
    navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "SavingsPotUIModule/frmMySavingsPot"});
  };
  SavingsPot_PresentationController.prototype.getAllPotFailureCallback = function (error) {
    var navManager = applicationManager.getNavigationManager();
	navManager.setCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "SavingsPotUIModule/frmMySavingsPot"}, error);
	navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "SavingsPotUIModule/frmMySavingsPot"});
  };
  SavingsPot_PresentationController.prototype.navToBudgetAmount = function (potName, formName) {
    var SavingsPotManager = applicationManager.getSavingsPotManager();
    SavingsPotManager.setAttributeCreateBudget("potName", potName);
    this.commonFunctionForNavigation(formName);
  };
  SavingsPot_PresentationController.prototype.navToGoalName = function (savingsType, savingsName, formName) {
    var SavingsPotManager = applicationManager.getSavingsPotManager();
    SavingsPotManager.setAttributeCreateBudget("savingsType", savingsType);
    SavingsPotManager.setAttributeCreateBudget("savingsName", savingsName);
    this.commonFunctionForNavigation(formName);
  };
  SavingsPot_PresentationController.prototype.navToGoalFreqDate = function (frequency, formName) {
    var SavingsPotManager = applicationManager.getSavingsPotManager();
    SavingsPotManager.setAttributeCreateBudget("frequency", frequency);
    this.commonFunctionForNavigation(formName);
  };
  SavingsPot_PresentationController.prototype.updateEndDate = function (endDate) {
    var SavingsPotManager = applicationManager.getSavingsPotManager();
    SavingsPotManager.setAttributeCreateBudget("endDate", endDate);
  }
  SavingsPot_PresentationController.prototype.updatePeriodicContribution = function (periodicContribution) {
    var SavingsPotManager = applicationManager.getSavingsPotManager();
    SavingsPotManager.setAttributeCreateBudget("periodicContribution", periodicContribution);
  };
  SavingsPot_PresentationController.prototype.updateFrequencyDay = function (finalFreqDay) {
    var SavingsPotManager = applicationManager.getSavingsPotManager();
    SavingsPotManager.setAttributeCreateBudget("freqDay", finalFreqDay);
  };
  SavingsPot_PresentationController.prototype.navToGoalVerifyDetails = function (date, freqDay, formName) {
    var SavingsPotManager = applicationManager.getSavingsPotManager();
    SavingsPotManager.setAttributeCreateBudget("startDate", date);
    SavingsPotManager.setAttributeCreateBudget("freqDay", freqDay);
    this.commonFunctionForNavigation(formName);
  };
  SavingsPot_PresentationController.prototype.navToBudgetVerifyDetails = function (potAmount, formName) {
    var SavingsPotManager = applicationManager.getSavingsPotManager();
    SavingsPotManager.setAttributeCreateBudget("targetAmount", potAmount);
    this.commonFunctionForNavigation(formName);
  };
  SavingsPot_PresentationController.prototype.navToBudgetAcknowledgement = function (fundAmount, formName) {
    var SavingsPotManager = applicationManager.getSavingsPotManager();
    SavingsPotManager.setAttributeCreateBudget("fundAmount", fundAmount);
    this.commonFunctionForNavigation(formName);
  };
  SavingsPot_PresentationController.prototype.getBudgetDetails = function () {
    var SavingsPotManager = applicationManager.getSavingsPotManager();
    return SavingsPotManager.getCreateBudgetData();
  };
  SavingsPot_PresentationController.prototype.updateTargetAmount = function (targetAmount) {
    var SavingsPotManager = applicationManager.getSavingsPotManager();
    SavingsPotManager.setAttributeCreateBudget("targetAmount", targetAmount);
  };
  SavingsPot_PresentationController.prototype.updateTargetPeriod = function (targetPeriod) {
    var SavingsPotManager = applicationManager.getSavingsPotManager();
    SavingsPotManager.setAttributeCreateBudget("targetPeriod", targetPeriod);
  };
  SavingsPot_PresentationController.prototype.navToGoalFrequency = function (targetAmount, targetPeriod, periodicContribution, formName) {
    var SavingsPotManager = applicationManager.getSavingsPotManager();
    SavingsPotManager.setAttributeCreateBudget("targetAmount", targetAmount);
    SavingsPotManager.setAttributeCreateBudget("targetPeriod", targetPeriod);
    SavingsPotManager.setAttributeCreateBudget("periodicContribution", periodicContribution);
    this.commonFunctionForNavigation(formName);
  };
  SavingsPot_PresentationController.prototype.navToOptimizeGoal = function (periodicContribution, formName) {
    var SavingsPotManager = applicationManager.getSavingsPotManager();
    SavingsPotManager.setAttributeCreateBudget("periodicContribution", periodicContribution);
    this.commonFunctionForNavigation(formName);
  };
  SavingsPot_PresentationController.prototype.navToOptimizeGoalTargetPeriod = function (targetPeriod, formName) {
    var SavingsPotManager = applicationManager.getSavingsPotManager();
    SavingsPotManager.setAttributeCreateBudget("targetPeriod", targetPeriod);
    this.commonFunctionForNavigation(formName);
  };
  SavingsPot_PresentationController.prototype.navToFundVerifyDetails = function (amount, isCreditDebit, formName) {
    var SavingsPotManager = applicationManager.getSavingsPotManager();
    SavingsPotManager.setAttributeFundWithdraw("amount", amount);
    SavingsPotManager.setAttributeFundWithdraw("isCreditDebit", isCreditDebit);
    this.commonFunctionForNavigation(formName);
  };
  SavingsPot_PresentationController.prototype.getFundWithDrawDetails = function () {
    var SavingsPotManager = applicationManager.getSavingsPotManager();
    return SavingsPotManager.getFundWithdrawData();
  };
  SavingsPot_PresentationController.prototype.clearFundWithdrawData = function () {
    var SavingsMan = applicationManager.getSavingsPotManager();
    var obj = SavingsMan.clearFundWithdrawData();
    return obj;
  };

  SavingsPot_PresentationController.prototype.creteSavingsGoal = function (accountId) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var potManager = applicationManager.getSavingsPotManager();
    var goalData = this.getBudgetDetails();
    goalData.fundingAccountId = accountId;
    goalData.currency = this.getCurrencyCode();
    goalData.productId = "SAVINGS.ACCOUNT";
    goalData.savingsType = goalData.savingsName;
    this.setsavingsTypeName(goalData.savingsName);
    this.setfreqDay(goalData.freqDay);
    delete goalData.freqDay;
    delete goalData.savingsName;
   var locale = kony.i18n.getCurrentLocale();
            locale = locale.toLowerCase();
            locale = locale.replace("_", "-");
            if (locale == "de-de" || locale === "fr-fr" || locale == "es-es")
      goalData.targetAmount = goalData.targetAmount.replace(/[\\.]+/g, "").split(",")[0];
    else
      goalData.targetAmount = goalData.targetAmount.replace(/[, ]+/g, "");
    var locale = kony.i18n.getCurrentLocale();
            locale = locale.toLowerCase();
            locale = locale.replace("_", "-");
            if (locale == "de-de" || locale === "fr-fr" || locale == "es-es") {
      goalData.periodicContribution = (String(goalData.periodicContribution)).replace(/[\\. ]+/g, "");
      goalData.periodicContribution = (String(goalData.periodicContribution)).replace(",", ".");
    }
    else {
      goalData.periodicContribution = (String(goalData.periodicContribution)).replace(/[, ]+/g, "");
    }
    potManager.createSavingsPot(goalData, scope_SavingsPotPresentationController.createGoalSuccessCallback.bind(this), scope_SavingsPotPresentationController.createGoalFailureCallback);
  };
  SavingsPot_PresentationController.prototype.createGoalSuccessCallback = function (data) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(data.message){
      var finalFreqDay = this.getfreqDay();
      var savingsName = this.getsavingsTypeName();
      var SavingsPotManager = applicationManager.getSavingsPotManager();
      SavingsPotManager.setAttributeCreateBudget("savingsName", savingsName);
      SavingsPotManager.setAttributeCreateBudget("freqDay", finalFreqDay);
      var navManager = applicationManager.getNavigationManager();
	  navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "SavingsPotUIModule/frmGoalsAcknowledgement"});
    }
  };
  SavingsPot_PresentationController.prototype.createGoalFailureCallback = function (error) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    scope_SavingsPotPresentationController.clearCreateData();
    var navManager = applicationManager.getNavigationManager();
	navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "SavingsPotUIModule/frmCreateGoalAckError"});
  };

  SavingsPot_PresentationController.prototype.creteSavingsBudget = function (accountId) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var potManager = applicationManager.getSavingsPotManager();
    var budgetData = this.getBudgetDetails();
    budgetData.fundingAccountId = accountId;
    budgetData.currency = this.getCurrencyCode();
    budgetData.productId = "SAVINGS.ACCOUNT";
     var locale = kony.i18n.getCurrentLocale();
            locale = locale.toLowerCase();
            locale = locale.replace("_", "-");
            if (locale == "de-de" || locale === "fr-fr" || locale == "es-es") {
               
      budgetData.targetAmount = budgetData.targetAmount.replace(",", ".");
    }
    else{
        budgetData.targetAmount = budgetData.targetAmount.replace(/[, ]+/g, "");
    }
    potManager.createSavingsPot(budgetData, scope_SavingsPotPresentationController.createBudgetSuccessCallback, scope_SavingsPotPresentationController.createBudgetFailureCallback);
  };
  SavingsPot_PresentationController.prototype.createBudgetSuccessCallback = function (data) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(data.message){
      var navManager = applicationManager.getNavigationManager();
	  navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "SavingsPotUIModule/frmBudgetAcknowledgement"});
      var savingsPotID = data.savingsPotId;
      var potAccountId = data.potAccountId;
      scope_SavingsPotPresentationController.setSavingsPotId(savingsPotID);
      scope_SavingsPotPresentationController.setTransactPotId(potAccountId);
    }
  };
  SavingsPot_PresentationController.prototype.createBudgetFailureCallback = function (error) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    scope_SavingsPotPresentationController.clearCreateData();
    var navManager = applicationManager.getNavigationManager();
	navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "SavingsPotUIModule/frmCreateGoalAckError"});
  };

  SavingsPot_PresentationController.prototype.updateSavingsBudget = function (params) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var PotId = scope_SavingsPotPresentationController.getSavingsPotId();
    var TransactPotID = scope_SavingsPotPresentationController.getTransactPotId();
    params.savingsPotId = PotId;
    params.potAccountId = TransactPotID;
    var potManager = applicationManager.getSavingsPotManager();
    potManager.updateSavingsPot(params, scope_SavingsPotPresentationController.updateBudgetSuccessCallback, scope_SavingsPotPresentationController.updateBudgetFailureCallback);
  };
  SavingsPot_PresentationController.prototype.updateBudgetSuccessCallback = function (data) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
	navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "SavingsPotUIModule/frmEditBudgetAcknowledgement"});
  };
  SavingsPot_PresentationController.prototype.updateBudgetFailureCallback = function (error) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    scope_SavingsPotPresentationController.clearCreateData();
    var navManager = applicationManager.getNavigationManager();
	navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "SavingsPotUIModule/frmCreateGoalAckError"});
  };

  SavingsPot_PresentationController.prototype.savingspotFund = function (params) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var PotId = this.getSavingsPotId();
    var TransactPotID = this.getTransactPotId();
    params.savingsPotId = PotId;
    params.potAccountId = TransactPotID;
    var potManager = applicationManager.getSavingsPotManager();
    potManager.updateSavingsPotBalance(params, scope_SavingsPotPresentationController.potFundSuccessCallback, scope_SavingsPotPresentationController.potFundFailureCallback);
  };
  SavingsPot_PresentationController.prototype.potFundSuccessCallback = function (data) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
	navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "SavingsPotUIModule/frmGoalFundAck"});
  };
  SavingsPot_PresentationController.prototype.potFundFailureCallback = function (error) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
	navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "SavingsPotUIModule/frmCreateGoalAckError"});
  };

  SavingsPot_PresentationController.prototype.savingspotWithdraw = function (params) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var PotId = this.getSavingsPotId();
    var TransactPotID = this.getTransactPotId();
    params.savingsPotId = PotId;
    params.potAccountId = TransactPotID;
    var potManager = applicationManager.getSavingsPotManager();
    potManager.updateSavingsPotBalance(params, scope_SavingsPotPresentationController.potWithdrawSuccessCallback, scope_SavingsPotPresentationController.potWithdrawFailureCallback);
  };
  SavingsPot_PresentationController.prototype.potWithdrawSuccessCallback = function (data) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
	navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "SavingsPotUIModule/frmWithdrawAck"});
  };
  SavingsPot_PresentationController.prototype.potWithdrawFailureCallback = function (error) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
	navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "SavingsPotUIModule/frmCreateGoalAckError"});
  };
  SavingsPot_PresentationController.prototype.closeSavingsPot = function (params) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var TransactPotID = this.getTransactPotId();
    params.potAccountId = TransactPotID;
    var potManager = applicationManager.getSavingsPotManager();
    potManager.closeSavingsPot(params, scope_SavingsPotPresentationController.closePotSuccessCallback, scope_SavingsPotPresentationController.closePotFailureCallback);
  };
  SavingsPot_PresentationController.prototype.closePotSuccessCallback = function (data) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
	navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "SavingsPotUIModule/frmGoalCloseAck"});
  };
  SavingsPot_PresentationController.prototype.closePotFailureCallback = function (error) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
	navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "SavingsPotUIModule/frmCreateGoalAckError"});
  };
  SavingsPot_PresentationController.prototype.getMySavingsPot = function (accountsDetails, type) {
    var fundingAccountId = {
      "fundingAccountId": accountsDetails
    }
    var potManager = applicationManager.getSavingsPotManager();
    if (type === "Goal") {
      potManager.fetchSavingsPotsDetails(fundingAccountId, scope_SavingsPotPresentationController.getmyPotGoalsSuccessCallback, scope_SavingsPotPresentationController.getmyPotGoalsFailureCallback);
    }
    else {
      potManager.fetchSavingsPotsDetails(fundingAccountId, scope_SavingsPotPresentationController.getmyPotBudgetsSuccessCallback, scope_SavingsPotPresentationController.getmyPotBudgetsFailureCallback);
    }
    applicationManager.getPresentationUtility().showLoadingScreen();
  };
  SavingsPot_PresentationController.prototype.getmyPotGoalsSuccessCallback = function (data) {
    var potDetails = data.savingsPot;
    var selectedPotDetails;
    for (var TitleNo in potDetails) {
      var datum = potDetails[TitleNo];
      if (datum.potName == scope_SavingsPotPresentationController.PotName) {
        selectedPotDetails = datum;
      }
    }
    scope_SavingsPotPresentationController.setEditObj(selectedPotDetails);
    var navManager = applicationManager.getNavigationManager();
	navManager.setCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "SavingsPotUIModule/frmMySavingsPot"}, potDetails);
	navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "SavingsPotUIModule/frmSavingsGoalViewDetails"});
  };
  SavingsPot_PresentationController.prototype.getmyPotGoalsFailureCallback = function (error) {
    var navManager = applicationManager.getNavigationManager();
	navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "SavingsPotUIModule/frmSavingsGoalViewDetails"});
  };
  SavingsPot_PresentationController.prototype.getmyPotBudgetsSuccessCallback = function (data) {
    var potDetails = data.savingsPot;
    var selectedPotDetails;
    for (var TitleNo in potDetails) {
      var datum = potDetails[TitleNo];
      if (datum.potName == scope_SavingsPotPresentationController.PotName) {
        selectedPotDetails = datum;
      }
    }
    scope_SavingsPotPresentationController.setEditObj(selectedPotDetails);
    var navManager = applicationManager.getNavigationManager();
    navManager.setCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "SavingsPotUIModule/frmMySavingsPot"}, potDetails);
    navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "SavingsPotUIModule/frmBudgetPotDetails"});
  };
  SavingsPot_PresentationController.prototype.getmyPotBudgetsFailureCallback = function (error) {
    var navManager = applicationManager.getNavigationManager();
	navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "SavingsPotUIModule/frmBudgetPotDetails"});
  };
  SavingsPot_PresentationController.prototype.initiateFund = function (params) {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var potManager = applicationManager.getSavingsPotManager();
    potManager.updateSavingsPotBalance(params, scope_SavingsPotPresentationController.initiateFundSuccessCallback, scope_SavingsPotPresentationController.initiateFundFailureCallback);
  };
  SavingsPot_PresentationController.prototype.initiateFundSuccessCallback = function (data) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
    if(data.message){
	  navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "SavingsPotUIModule/frmBudgetInitiateTransferAck"});
    }
  };
  SavingsPot_PresentationController.prototype.initiateFundFailureCallback = function (error) {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var navManager = applicationManager.getNavigationManager();
	navManager.navigateTo({"appName" : "SavingsPotMA", "friendlyName" : "SavingsPotUIModule/frmCreateGoalAckError"});
  };
  return SavingsPot_PresentationController;
});