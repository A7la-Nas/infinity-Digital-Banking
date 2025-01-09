define("ArrangementsMA/MortgageServicesUIModule/userfrmPrintAcknowledgeController", ['CommonUtilities', 'OLBConstants'], function(CommonUtilities, OLBConstants) {
    return {
        dataObj: {},
        preShow: function() {
            this.setDataForPrint();
        },
        postShow: function() {
            scope = this;
            setTimeout(function() {
                scope.printCall();;
            }, "17ms");
            //this.printCall();
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
        setDataForPrint: function() {
            scope = this;
            this.view.imgGreenTick.src = "confirmation_tick.png";
            var navMan = applicationManager.getNavigationManager();
            this.dataObj = navMan.getCustomInfo("frmChangeRepaymentDayAcknowledge");
            this.view.lblReferenceValue.text = navMan.getCustomInfo("frmPrintAcknowledge");
            this.view.lblMyCheckingAccount.text = this.dataObj.accountName;
            this.view.lblKonyBank.text = this.dataObj.accountName;
            this.view.lblCurrentMaturityDateVal.text = this.dataObj.maturityDate;
            this.view.lblCurrentOutstandingBalVal.text = this.dataObj.outstandingBalance;
            this.view.lblFacilityNameVal.text = this.dataObj.accountName;
            this.view.lblNoOfLoansVal.text = this.dataObj.noOfLoans;
            this.dataObj.segData[0][0].template = "flxLoanPlanHeader";
            setTimeout(function() {
                scope.view.segLoanPlanDetails.setData(scope.dataObj.segData);
            }, "17ms");
            //this.view.segLoanPlanDetails.setData(this.dataObj.segData);
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
                "friendlyName": "MortgageServicesUIModule/frmChangeRepaymentDayAcknowledge"
            });
            kony.application.dismissLoadingScreen();
        }
    }
});