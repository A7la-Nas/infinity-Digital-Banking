define({

  init: function () {
    },

  preShow: function () {
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
    }

    this.initActions();

  },
  initActions: function () {
    //osama
    this.view.onDeviceBack = this.continueOnClick;
    this.view.btnFund.onClick = this.continueOnClick;
    this.setDataToForm();
  },
  postShow:function(){
 
  },
  setDataToForm: function(){
    var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
    var goalDetails = SavingsPotMod.presentationController.getBudgetDetails();
    var fromDetails = SavingsPotMod.presentationController.getMaskedAccountName();
    var currencySymbol = SavingsPotMod.presentationController.getCurrencySymbol();
    this.view.lblAccAn.text = fromDetails;
    this.view.lblGoalAn.text = goalDetails.potName;
    var locale = kony.i18n.getCurrentLocale();
      locale = locale.toLowerCase();
      locale = locale.replace("_", "-");
      if (locale == "de-de" || locale === "fr-fr" || locale == "es-es") {
      this.view.lblAmountAn.text = currencySymbol + goalDetails.targetAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ".")+",00";
      goalDetails.periodicContribution = goalDetails.periodicContribution.replace(".", ",");
      this.view.lblContributionAn.text = currencySymbol + goalDetails.periodicContribution.replace(/\B(?=(\d{3})+(?!\d))/g, ".")+((goalDetails.periodicContribution.indexOf(','))?"":",00");
    }
    else {
      this.view.lblAmountAn.text = currencySymbol + goalDetails.targetAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      this.view.lblContributionAn.text = currencySymbol + goalDetails.periodicContribution.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    this.view.lblPeriodAn.text = goalDetails.targetPeriod;
    this.view.lblDayAn.text = goalDetails.freqDay;
    var today = new Date();
    var month = today.getMonth() + 1;
    var date = today.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (date < 10) {
      date = "0" + date;
    }
    var createdDate = month + "/" + date + "/" + today.getFullYear();
    this.view.lblDateAn.text = createdDate;
    this.view.lblStartAn.text = goalDetails.startDate;
    this.view.lblFinalAn.text = goalDetails.endDate;
  },
 continueOnClick: function(){
   var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
    SavingsPotMod.clearCreateData();
    var accountsID = SavingsPotMod.getAccountId();
    SavingsPotMod.getAllSavingsPot(accountsID);
  }
	
});
