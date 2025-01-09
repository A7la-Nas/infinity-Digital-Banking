define("ArrangementsMA/MortgageServicesUIModule/userfrmPrintPartialRepaymentAcknowledgeController", ['CommonUtilities', 'OLBConstants'], function(CommonUtilities, OLBConstants) {
    return {
        showInfo: {},
        preShow: function() {
            var navMan = applicationManager.getNavigationManager();
            var scopeObj = this;
            this.showInfo = navMan.getCustomInfo("frmPrintPartialRepaymentAcknowledge");
            this.setUpFormData();
        },
        setUpFormData: function() {
            this.view.lblKonyBank.text = this.showInfo.loanAccountName;
            this.view.lblMyLoanAccount.text = this.showInfo.loanAccountName;
            this.view.lblReferenceValue.text = this.showInfo.RequestId;
            this.view.lblReferenceNumberVal.text = this.showInfo.RefNum;
            this.view.lblFacilityNameVal.text = this.showInfo.facilityName;
            this.view.lblNoOfLoansVal.text = this.showInfo.numberOfLoans;
            this.view.lblOutstandingBalanceVal.text = this.showInfo.outstandingBalance;
            this.view.lblAmountVal.text = this.showInfo.amountPaidtoDate;
            this.view.lblLoanAccountName.text = this.showInfo.loanAccountName;
            this.view.lblcurrInstallmentAmount.text = this.showInfo.currentInstallmentAmount;
            this.view.lblsimInstallmentAmount.text = this.showInfo.installmentAmount;
            this.view.lblcurrRepaymentDate.text = this.showInfo.currentNextRepaymentDate;
            this.view.lblsimRepaymentDate.text = this.showInfo.currentEndDate;
            this.view.lblcurrEndDate.text = this.showInfo.nextRepaymentDate;
            this.view.lblsimEndDate.text = this.showInfo.endDate;
            this.view.lblRepaymentAmountVal.text = this.showInfo.totalRepaymentAmount;
            this.view.lblCredDateVal.text = this.showInfo.creditValueDate;
            this.view.lblTransactionFeeVal.text = this.showInfo.transactionFee;
            this.view.lblExchangeRateVal.text = this.showInfo.exchangeRate;
            this.view.lblAccountHolderVal.text = this.showInfo.accountHolderName;
            this.view.lblAccountNumberVal.text = this.showInfo.accountNumber;
            this.view.lblPayOnVal.text = this.showInfo.payOn;
            this.view.lblNotesDesc.text = this.showInfo.notes;
            this.view.lblLoanAccountVal.text = this.showInfo.loanAccNumber;
        },
        postShow: function() {
            scope = this;
            applicationManager.getNavigationManager().applyUpdates(this);
            var navMan = applicationManager.getNavigationManager();
            var docs = navMan.getCustomInfo("frmChangeRepaymentAcountCnFileData");
            this.showInfo.supportingDocuments = docs;
            var segData = [];
            docs.forEach(function(doc) {
                segData.push({
                    "lblDocName": doc.fileName
                })
            })
            this.view.segSupportingDocs.isVisible = true;
            this.view.segSupportingDocs.setData(segData);
            if (segData.length == 0) {
                this.view.segSupportingDocs.isVisible = false;
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
            navMan.navigateTo({
                "appName": "ArrangementsMA",
                "friendlyName": "MortgageServicesUIModule/frmPartialPaymentAcknowledgement"
            });
            kony.application.dismissLoadingScreen();
        }
    }
});