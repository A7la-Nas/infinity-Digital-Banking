define("ArrangementsMA/MortgageServicesUIModule/userfrmPrintAccountAcknowledgeController", ['CommonUtilities', 'OLBConstants'], function(CommonUtilities, OLBConstants) {
    return {
        accountList: {},
        payLoad: {},
        account: {},
        preShow: function() {
            var navMan = applicationManager.getNavigationManager();
            var scopeObj = this;
            this.accountList = navMan.getCustomInfo("frmPrintAccountAcknowledge");
            this.payLoad = navMan.getCustomInfo("frmPrintAccountAcknowledge");
            this.account = navMan.getCustomInfo("frmPrintAccountAcknowledge");
            this.setUpFormData();
        },
        setUpFormData: function() {
            this.view.lblMyCheckingAccount.text = scopeObj.payLoad.loanName + "..." + scopeObj.payLoad.loanAccountNumber.slice(-4);
            this.view.lblKonyBank.text = scopeObj.payLoad.loanName + "..." + scopeObj.payLoad.loanAccountNumber.slice(-4);
            var navMan = applicationManager.getNavigationManager();
            this.view.lblReferenceValue.text = navMan.getCustomInfo("frmPrintAccountAcknowledge1")
            this.view.lblValLoan.text = scopeObj.payLoad.loanName;
            this.view.lblValNewRepaymentAcctHoldName.text = scopeObj.payLoad.requestDetails[0].newValue;
            this.view.lblValNewRepaymentAcctNo.text = "************" + scopeObj.payLoad.requestDetails[1].newValue.slice(-4);
            //this.view.lblValBICSWIFT.text = scopeObj.payLoad.requestDetails[2].newValue;
            this.view.lblValBankName.text = scopeObj.payLoad.requestDetails[2].newValue;
            //kony.application.dismissLoadingScreen();
        },
        postShow: function() {
            //this.printCall();
            scope = this;
            setTimeout(function() {
                scope.printCall();
            }, "17ms");
            applicationManager.getNavigationManager().applyUpdates(this);
        },
        printCall: function() {
            var scope = this;
            //kony.os.print();
            kony.os.print();
            //timeout is required to allow print popup to be visible.
            setTimeout(function() {
                scope.loadAccountsDetails();
            }, "17ms");
        },
        /**
         * loadAccountsDetails : Method to accounts details
         * @member of {frmPrintTransactionController}
         * @param {}
         * @return {}
         * @throws {}
         */
        loadAccountsDetails: function() {
            var navMan = applicationManager.getNavigationManager();
            navMan.navigateTo({
                "appName": "ArrangementsMA",
                "friendlyName": "MortgageServicesUIModule/frmChangeRepaymentAccountAcknowledge"
            });
            kony.application.dismissLoadingScreen();
        }
    }
});