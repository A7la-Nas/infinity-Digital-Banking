define("ArrangementsMA/AccountsUIModule/userfrmNewPrintTransactionController", ['CommonUtilities', 'OLBConstants'], function(CommonUtilities, OLBConstants) {
    var orientationHandler = new OrientationHandler();
    return {
        showInfo: {},
        preShow: function() {
            var navMan = applicationManager.getNavigationManager();
            var scopeObj = this;
            this.showInfo = navMan.getCustomInfo("frmNewPrintTransaction");
            this.setUpFormData();
        },
        setUpFormData: function() {
            this.view.lblKonyBank.text = this.showInfo.accountName;
            this.view.lblMyCheckingAccount.text = this.showInfo.accountName;
            this.view.keyValueAccHolderName.lblValue.text = this.showInfo.AccountName;
            this.view.keyValueAccNumber.lblValue.text = this.showInfo.AccountNumber;
            this.view.keyValueAvailableBalance.lblValue.text = this.showInfo.principalBalance;
            this.view.keyValueCurrentBalance.lblValue.text = this.showInfo.currentBalance;
            this.view.keyValuePendingDeposits.lblValue.text = this.showInfo.pendingDeposits;
            this.view.keyValuePendingWithdrawal.lblValue.text = this.showInfo.pendingWithdrawals;
            this.view.lblPendingTransactions.text = this.showInfo.selectedTab + " " + "Transactions";
        },
        postShow: function() {
            scope = this;
            applicationManager.getNavigationManager().applyUpdates(this);
            var navMan = applicationManager.getNavigationManager();
            var transactions = navMan.getCustomInfo("frmNewPrintTransactionData");
            this.showInfo.transactions = transactions;
          //  var segData = [];
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                var segData = [];
                transactions.forEach(function(transaction) {
                segData.push({
                    "lblAmount": transaction.lbl2.text,
                    "lblDate": transaction.lbl1.text,
                    "lblSeparator": "",
                    "lblDescription": "",
                    "lblBalance": "",
                    "lblType": ""
                })
            })
            this.view.segPendingTransaction.isVisible = true;
            this.view.segPendingTransaction.setData(segData);
            } else if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                var segData = [];
                transactions.forEach(function(transaction) {
                segData.push({
                    "lblAmount": transaction.lbl3.text,
                    "lblBalance": transaction.lbl2.text,
                    "lblDate": transaction.lbl1.text,
                    "lblDescription": "",
                    "lblSeparator": "",
                    "lblType": transaction.lbl4.text
                })
            })
            this.view.segPendingTransaction.isVisible = true;
            this.view.segPendingTransaction.setData(segData);       
            } else {
                var segData = [];
              transactions.forEach(function(transaction) {
                segData.push({
                    "lblAmount": transaction.lbl3.text,
                    "lblBalance": transaction.lbl2.text,
                    "lblDate": transaction.lbl1.text,
                    "lblDescription": transaction.lbl5.text,
                    "lblSeparator": "",
                    "lblType": transaction.lbl4.text
                })
            })
            this.view.segPendingTransaction.isVisible = true;
            this.view.segPendingTransaction.setData(segData);
            }
            if (segData.length == 0) {
                this.view.segPendingTransaction.isVisible = false;
            } 
            setTimeout(function() {
                scope.printCall();
            }, "17ms");
            applicationManager.getNavigationManager().applyUpdates(this);
        },
        printCall: function() {
            var scope = this;
            kony.os.print();
            setTimeout(function() {
                scope.loadAccountsDetails();
            }, "17ms");
        },
        loadAccountsDetails: function() {
            var navMan = applicationManager.getNavigationManager();
            // navMan.navigateTo({
            //     "appName": "ArrangementsMA",
            //     "friendlyName": "AccountsUIModule/frmAccountsDetails"
            // });
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountsUIModule").presentationController.presentAccountDetails();
            kony.application.dismissLoadingScreen();
        }
    }
});