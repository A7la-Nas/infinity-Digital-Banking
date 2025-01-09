define({

    init: function() {},

    preShow: function() {
        if (kony.os.deviceInfo().name === "iPhone") {
            this.view.flxHeader.isVisible = false;
        }

        this.initActions();

    },
    initActions: function() {
        this.view.btnFund.onClick = this.continueOnClick;
        this.setDataToForm();
    },
    setDataToForm: function() {
        var navManager = applicationManager.getNavigationManager();
        var goalDetails = navManager.getCustomInfo({"appName" : "SavingsPotMA", "friendlyName" : "frmSavingsGoalViewDetails"});
        var formatUtil = applicationManager.getFormatUtilManager();
        var SavingsPotMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName" : "SavingsPotMA", "moduleName" : "SavingsPotUIModule"});
        var fromDetails = SavingsPotMod.presentationController.getMaskedAccountName();
        var currencyCode = SavingsPotMod.presentationController.getCurrencyCode();
        this.view.lblGoalAn.text = goalDetails.potName;
        this.view.lblAmountAn.text = formatUtil.formatAmountandAppendCurrencySymbol(goalDetails.targetAmount, currencyCode);
        this.view.lblCurrentbalanceValue.text = formatUtil.formatAmountandAppendCurrencySymbol(goalDetails.availableBalance, currencyCode);
        this.view.lblContributionAn.text = formatUtil.formatAmountandAppendCurrencySymbol(goalDetails.periodicContribution, currencyCode);
        this.view.lblPeriodAn.text = goalDetails.targetPeriod;
        this.view.lblDayAn.text = goalDetails.frequencyDay;
        this.view.lblRemainingbalanceValue.text = formatUtil.formatAmountandAppendCurrencySymbol(goalDetails.remainingSavings,currencyCode);
        this.view.lblAccAn.text = fromDetails;
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
        this.view.lblModifiedvalue.text = createdDate;
        applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    postShow: function() {

    },
    continueOnClick: function() {
        var SavingsPotMod = applicationManager.getModulesPresentationController("SavingsPotUIModule");
        SavingsPotMod.setSavingsFlow("");
        SavingsPotMod.clearCreateData();
        var accountsID = SavingsPotMod.getAccountId();
        SavingsPotMod.getAllSavingsPot(accountsID);
    }

});