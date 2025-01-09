define({
    initActions: function() {
        var scope = this;
        var currentFormObject = kony.application.getCurrentForm();
        var currentForm = currentFormObject.id;
        applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
        this.view.customHeader.flxBack.onTouchEnd = scope.navigateToSearch;
    },
    navigateToSearch: function() {
        var search = applicationManager.getModulesPresentationController({"appName":"ArrangementsMA", "moduleName":"ChequeManagementUIModule"});
        search.commonFunctionForNavigation({"appName":"ArrangementsMA", "friendlyName":"frmCMSearch"});
    },
    preShow: function() {
        if (kony.os.deviceInfo().name === "iPhone") {
            this.view.flxHeader.isVisible = false;
        } else {
            this.view.flxHeader.isVisible = true;
        }
        var transferObject = applicationManager.getTransactionsListManager().getTransactionObject();
        var navMan = applicationManager.getNavigationManager();
        var data = navMan.getCustomInfo("frmCMSearchResult");
        if (data.length === 0) {
            this.view.flxSearchSeg.isVisible = false;
            this.view.flxNoTransactions.isVisible = true;
            
        } else {
            this.view.flxSearchSeg.isVisible = true;
            this.view.flxNoTransactions.isVisible = false;
            this.bindTransactions(data);
        }
    },
    getWidgetDataMap: function() {
        return {
            "lblChequeNo": "lblChequeNo",
            "lblDate": "lblDate",
            "lblStatus": "lblStatus",
            "lblAccountNo": "lblAccountNo"
        };
    },
    bindTransactions: function(data) {
        this.view.segTransactionswidgetDataMap = this.getWidgetDataMap();
        this.view.segTransactions.setData(data);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
});