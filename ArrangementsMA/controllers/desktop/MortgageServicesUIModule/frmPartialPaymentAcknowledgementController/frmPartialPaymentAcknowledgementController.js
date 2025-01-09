define("ArrangementsMA/MortgageServicesUIModule/userfrmPartialPaymentAcknowledgementController", ['CommonUtilities', 'ViewConstants', 'FormControllerUtility', 'OLBConstants', 'CampaignUtility'], function(CommonUtilities, ViewConstants, FormControllerUtility, OLBConstants, CampaignUtility) {
    //Type your controller code here
    var orientationHandler = new OrientationHandler();
    return {
        loadInfo: {},
        preShow: function() {
            var navMan = applicationManager.getNavigationManager();
            this.loadInfo = navMan.getCustomInfo("frmPartialPaymentAcknowledgement");
            var scope = this;
            mortgageDetails = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountServicesUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.mortgageDetails;
            mortgagePlans = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountServicesUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.mortgagePlans;
            currAccount = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountsUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.currentAccount;
            loanAccount = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountServicesUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.repaymentAccount;
            details = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountsUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.mortgageAccDetails;
            var formTemplateContext = {
            "sessionTimeOut": {
            "timer": 4
            },
            "breadCrumbBack": {
            "flag": false
            }
            }
            if(orientationHandler.isMobile){
            this.view.confirmPartialRepayment.flxContentTCCenter.parent.parent.parent.parent.flxMain.flxPageTitleMain.isVisible = false;
            }
            this.view.confirmPartialRepayment.flxTCButtons.flxDownloadOptions.flxPrint.onClick = this.print;
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxFacilityOverview.flxButtons.btnBack.onClick = this.backToFacility;
            this.view.confirmPartialRepayment.flxTCButtons.flxDownloadOptions.flxDownloadServ.onClick = this.downloadPartialPaymentAck;
            formData = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountServicesUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.formData;
            if (formData.toAccountCurrency === formData.fromAccountCurrency) {
                this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxExchangeRate.isVisible = false;
            } else {
                this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxExchangeRate.isVisible = true;
            }
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxAccountNumber.lblAccountNumberVal.text = "************" + formData.fromAccountNumber.slice(-4);

            
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxAccountNumber.flxShowEyeIcon.accessibilityConfig = {                
                "a11yARIA": {
                    "role": "button",
                    "tabindex": 0
                },
                "a11yLabel": "View account number, your account number is currently hidden"
            };

            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxAccountNumber.flxShowEyeIcon.onClick = function() {
                if (scope.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxAccountNumber.flxShowEyeIcon.lblShowEyeIcon.text == 'g') {
                    scope.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxAccountNumber.flxShowEyeIcon.lblShowEyeIcon.text = 'h';
                    scope.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxAccountNumber.lblAccountNumberVal.text = formData.fromAccountNumber;
                    scope.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxAccountNumber.flxShowEyeIcon.accessibilityConfig = {                
                        "a11yARIA": {
                            "role": "button",
                            "tabindex": 0
                        },
                        "a11yLabel": "Hide account number, your account number is currently visible"
                    };
                    scope.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxAccountNumber.flxShowEyeIcon.setActive(true);
                } else {
                    scope.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxAccountNumber.flxShowEyeIcon.lblShowEyeIcon.text = 'g';
                    scope.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxAccountNumber.lblAccountNumberVal.text = "************" + formData.fromAccountNumber.slice(-4);
                    scope.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxAccountNumber.flxShowEyeIcon.accessibilityConfig = {                
                        "a11yARIA": {
                            "role": "button",
                            "tabindex": 0
                        },
                        "a11yLabel": "View account number, your account number is currently hidden"
                    };
                    scope.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxAccountNumber.flxShowEyeIcon.setActive(true);
                }
            }

            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxLoanAccount.flxShowEyeIconForLoanAcc.accessibilityConfig = {                
                "a11yARIA": {
                    "role": "button",
                    "tabindex": 0
                },
                "a11yLabel": "View loan account number, your loan account number is currently hidden"
            };

            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxLoanAccount.flxShowEyeIconForLoanAcc.onClick = function() {
                if (scope.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxLoanAccount.flxShowEyeIconForLoanAcc.lblShowEyeIconForLoanAcc.text == 'g') {
                    scope.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxLoanAccount.flxShowEyeIconForLoanAcc.lblShowEyeIconForLoanAcc.text = 'h';
                    scope.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxLoanAccount.lblLoanAccountVal.text = formData.toAccountNumber;
                    scope.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxLoanAccount.flxShowEyeIconForLoanAcc.accessibilityConfig = {                
                        "a11yARIA": {
                            "role": "button",
                            "tabindex": 0
                        },
                        "a11yLabel": "Hide loan account number, your loan account number is currently visible"
                    };
                    scope.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxLoanAccount.flxShowEyeIconForLoanAcc.setActive(true);
                } else {
                    scope.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxLoanAccount.flxShowEyeIconForLoanAcc.lblShowEyeIconForLoanAcc.text = 'g';
                    scope.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxLoanAccount.lblLoanAccountVal.text = "************" + formData.toAccountNumber.slice(-4);
                    scope.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxLoanAccount.flxShowEyeIconForLoanAcc.accessibilityConfig = {                
                        "a11yARIA": {
                            "role": "button",
                            "tabindex": 0
                        },
                        "a11yLabel": "View loan account number, your loan account number is currently hidden"
                    };
                    scope.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxLoanAccount.flxShowEyeIconForLoanAcc.setActive(true);
                }
            }
        },
        updateFormUI: function(uiData) {
            if(uiData){
              if (uiData.showLoadingIndicator) {
                if (uiData.showLoadingIndicator.status === true) {
                  FormControllerUtility.showProgressBar(this.view)
                } else {
                  FormControllerUtility.hideProgressBar(this.view)
                }
              } 
                if (uiData.response) {
                    //uiData.response.rawResponse = JSON.parse(uiData.response.rawResponse);
                    this.setTransactionDetails(uiData.response.rawResponse);
                }
                if (uiData.referenceId){
                    this.setTransactionDetails();
                }
                if(uiData.error){
                    this.showError();
                }
             if (uiData.pageDownloadFile) {
                 this.downloadPaymentAckPageDoc(uiData.pageDownloadFile);
             }
            }
     },
        setTransactionDetails: function () {
            var referenceNo = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountServicesUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.referenceNumber;
            var requestId = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountServicesUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.requestId;
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxRequestDetails.flxTransactionMsgDetails.flxRequestInfo.lblRequestIDVal.text = requestId;
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxRequestDetails.flxTransactionMsgDetails.flxRequestInfo.lblReferenceNumberVal.text = referenceNo;
        },
        setFacilityDetails: function(){
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxMortgageFacilityDetails.flxMortgageFacilityHeader.flxMortgageFacilityContent.lblFacilityNameVal.text = currAccount.accountName + " - " + currAccount.accountID.substr(-4);
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxMortgageFacilityDetails.flxMortgageFacilityHeader.flxMortgageFacilityContent.lblNoOfLoansVal.text = mortgagePlans.length.toString();
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxMortgageFacilityDetails.flxMortgageFacilityHeader.flxMortgageFacilityContent.lblOutstandingBalVal.text  =  CommonUtilities.formatCurrencyWithCommas(currAccount.outstandingBalance, false, currAccount.currencyCode);
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxMortgageFacilityDetails.flxMortgageFacilityHeader.flxMortgageFacilityContent.lblMaturityAmountDateVal.text = CommonUtilities.formatCurrencyWithCommas(mortgageDetails.totalPaidAmount, false, mortgageDetails.currencyCode);
        },
       setLoanDetails: function(){
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountName.lblLoanAccountName.text =  details[0].accountName + " - " + details[0].accountID.substr(-4);
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxRepaymentDate.lblRepaymentCurrentDate.text = this.loadInfo.nextRepaymentDate;
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxMaturityDate.lblMaturityCurrentval.text = this.loadInfo.currMaturityDate;
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxSimulatedAmount.lblSimulatedAmountVal.text = this.loadInfo.simAmount;
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxSimulatedDate.lblSimulatedDateVal.text = this.loadInfo.simDate;
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxSimulatedMaturityDate.lblSimulatedMaturityDateVal.text = this.loadInfo.simEndDate;
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxInstallmentAmount.lblCurrentInstallmentVal.text = this.loadInfo.currAmount;
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxInstallmentAmount.lblSimulatedInstallmentVal.text = this.loadInfo.simuAmount;
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxRepaymentDate.lblRepaymentSimulatedDate.text = this.loadInfo.simuEndDate;
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxMaturityDate.lblMaturitySimulatedVal.text = this.loadInfo.simulatedEndDate; 
            this.setLoanDetailsAccessibility();
        },
        setLoanDetailsAccessibility: function(){
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxInstallmentAmount.lblCurrentInstallmentValEmpty.text = "Installment Amount Current Value " + this.loadInfo.currAmount
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxInstallmentAmount.lblSimulatedInstallmentValEmpty.text = "Installment Amount Simulated Value " + this.loadInfo.simuAmount
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxRepaymentDate.lblRepaymentCurrentDateEmpty.text = "Next Repayment Date Current Value " + this.loadInfo.nextRepaymentDate
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxRepaymentDate.lblRepaymentSimulatedDateEmpty.text = "Next Repayment Date Simulated Value " + this.loadInfo.simuEndDate
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxMaturityDate.lblMaturityCurrentvalEmpty.text = "End Date (Maturity Date) Current Value " + this.loadInfo.currMaturityDate
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxMaturityDate.lblMaturitySimulatedValEmpty.text = "End Date (Maturity Date) Simulated Value " + this.loadInfo.simulatedEndDate
        },
        showError: function() {
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxRequestDetails.flxTransactionMsgDetails.flxTransactionMsg.centerY = "25%";
			this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxRequestDetails.flxTransactionMsgDetails.flxRequestInfo.isVisible = false;
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxRequestDetails.imgGreenTick.src = "error_cross_1x.png";
			this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxRequestDetails.imgGreenTick.centerY = "60%";
			this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxRequestDetails.flxTransactionMsgDetails.flxTransactionMsg.lblMsg.left = "0dp";
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxRequestDetails.flxTransactionMsgDetails.flxTransactionMsg.lblMsg.text = "Failed to Capture the Service Request, Try again later";
        },
       setPaymentDetails: function(){
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxTotalRepaymentAmount.lblTotalRepaymentAmountVal.text = this.loadInfo.Amount;
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxCreditValueDate.lblCreditValueDate.text = this.loadInfo.Date;
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxPayon.lblPayonDate.text = this.loadInfo.Date;
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxNotes.lblNotesDesc.text = this.loadInfo.Notes;
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxAccountHolderName.lblAccountHolderNameVal.text = this.loadInfo.AccountHolder;
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxLoanAccount.lblLoanAccountVal.text = this.loadInfo.loanAccNumber;
       },
       downloadPartialPaymentAck: function() {
        payload = {};
        payload.facilityName = currAccount.accountName + " - " + currAccount.accountID.substr(-4);
        payload.numberOfLoans =  mortgagePlans.length.toString();
        payload.outstandingBalance = CommonUtilities.formatCurrencyWithCommas(currAccount.outstandingBalance, false, currAccount.currencyCode);
        payload.amountPaidtoDate = CommonUtilities.formatCurrencyWithCommas(mortgageDetails.totalPaidAmount, false, mortgageDetails.currencyCode);
        payload.contentType = "pdf";
        payload.currentInstallmentAmount = this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxInstallmentAmount.lblCurrentInstallmentVal.text;
        payload.currentNextRepaymentDate = this.getFormattedDate(details[0].nextPaymentDate);
        payload.currentEndDate = this.getFormattedDate(details[0].maturityDate);
        payload.installmentAmount = this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxInstallmentAmount.lblSimulatedInstallmentVal.text;
        payload.nextRepaymentDate = this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxRepaymentDate.lblRepaymentSimulatedDate.text;
        payload.endDate = this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxMaturityDate.lblMaturitySimulatedVal.text;
        payload.totalRepaymentAmount = this.loadInfo.Amount;
        payload.creditValueDate = this.loadInfo.Date;
        payload.transactioFee = this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxTransactionFee.lblTransactionFeeVal.text;
        if (formData.toAccountCurrency === formData.fromAccountCurrency) {
            payload.exchangeRate = "";
        } else {
            payload.exchangeRate = this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxExchangeRate.lblExchangeRateVal.text;
        }
        payload.accountHolderName = this.loadInfo.AccountHolder;
        payload.accountNumber = formData.fromAccountNumber;
        payload.loanAccNumber = this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxLoanAccount.lblLoanAccountVal.text;
        payload.payOn = this.loadInfo.Date;
        payload.notes = this.loadInfo.Notes;
        payload.supportingDocuments = this.loadInfo.supportingDocumentIdsString;
        kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
            "moduleName": "AccountServicesUIModule",
            "appName": "ArrangementsMA"
        }).presentationController.downloadPartialPaymentAckPage(payload);
       },
       downloadPaymentAckPageDoc: function(fileUrl) {
        var data = {
            "url": fileUrl
        };
        CommonUtilities.downloadFile(data);
    },
       getFormattedDate: function(date) {
            if (date.indexOf("-") == "-1") {
                var newDate = date.substr(0, 4) + "-" + date.substr(4, 2) + "-" + date.substr(6, 2);
                return CommonUtilities.getFrontendDateString(newDate);
            } else {
                return CommonUtilities.getFrontendDateString(date);
            }
        },
        postShow: function() {
            applicationManager.getNavigationManager().applyUpdates(this);
            var navMan = applicationManager.getNavigationManager();
            var docs = navMan.getCustomInfo("frmChangeRepaymentAcountCnFileData");
            this.loadInfo.supportingDocuments = docs;
            var segData = [];
            docs.forEach(function(doc) {
                segData.push({
                    "lblDocName": doc.fileName
                })
            })
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxSupportingDocuments.segSupportingDocs.isVisible = true;
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxSupportingDocuments.segSupportingDocs.setData(segData); 
            if (segData.length == 0) {
                this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxSupportingDocuments.segSupportingDocs.isVisible = false;
            }

            this.view.title= "Partial Repayment - Acknowledgement";
            this.view.confirmPartialRepayment.pageTitlei18n = "i18n.accounts.PartialRepaymentAck";

            this.setFacilityDetails();
            this.setLoanDetails();
            this.setPaymentDetails();
        },
        print: function() {
            var navMan = applicationManager.getNavigationManager();
            this.selectedInfo = {};
            this.selectedInfo.facilityName = currAccount.accountName + " - " + currAccount.accountID.substr(-4);
            this.selectedInfo.loanAccountName = details[0].accountName + " - " + details[0].accountID.substr(-4);
            this.selectedInfo.numberOfLoans = mortgagePlans.length.toString();
            this.selectedInfo.outstandingBalance = CommonUtilities.formatCurrencyWithCommas(currAccount.outstandingBalance, false, currAccount.currencyCode);
            this.selectedInfo.amountPaidtoDate = CommonUtilities.formatCurrencyWithCommas(mortgageDetails.totalPaidAmount, false, mortgageDetails.currencyCode);
            this.selectedInfo.currentInstallmentAmount = this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxInstallmentAmount.lblCurrentInstallmentVal.text;
            this.selectedInfo.currentNextRepaymentDate = this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxRepaymentDate.lblRepaymentCurrentDate.text;
            this.selectedInfo.currentEndDate = this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxRepaymentDate.lblRepaymentSimulatedDate.text;
            this.selectedInfo.installmentAmount = this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxInstallmentAmount.lblSimulatedInstallmentVal.text;
            this.selectedInfo.nextRepaymentDate = this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxMaturityDate.lblMaturityCurrentval.text;
            this.selectedInfo.endDate = this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxMaturityDate.lblMaturitySimulatedVal.text;
            this.selectedInfo.totalRepaymentAmount = this.loadInfo.Amount;
            this.selectedInfo.creditValueDate = this.loadInfo.Date;
            this.selectedInfo.transactionFee = this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxTransactionFee.lblTransactionFeeVal.text;
            if (formData.toAccountCurrency === formData.fromAccountCurrency) {
                this.selectedInfo.exchangeRate = "";
            } else {
                this.selectedInfo.exchangeRate = this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxExchangeRate.lblExchangeRateVal.text;
            }
            this.selectedInfo.accountHolderName = this.loadInfo.AccountHolder;
            this.selectedInfo.accountNumber = "************" + formData.fromAccountNumber.slice(-4);
            this.selectedInfo.loanAccNumber = this.loadInfo.loanAccNumber;
            this.selectedInfo.payOn = this.loadInfo.Date;
            this.selectedInfo.notes = this.loadInfo.Notes;
            this.selectedInfo.supportingDocs = this.loadInfo.supportingDocumentIds;
            this.selectedInfo.RequestId = this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxRequestDetails.flxTransactionMsgDetails.flxRequestInfo.lblRequestIDVal.text;
            this.selectedInfo.RefNum = this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxRequestDetails.flxTransactionMsgDetails.flxRequestInfo.lblReferenceNumberVal.text;
            navMan.setCustomInfo("frmPrintPartialRepaymentAcknowledge", this.selectedInfo);
            applicationManager.getNavigationManager().navigateTo({
                appName: "ArrangementsMA",
                friendlyName: "MortgageServicesUIModule/frmPrintPartialRepaymentAcknowledge"
            })
        },
        backToFacility: function() {
           var navMan = applicationManager.getNavigationManager();
           navMan.setCustomInfo("accountModifyFlow", false);
           kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
          "moduleName": "AccountServicesUIModule",
          "appName": "ArrangementsMA"
        }).presentationController.mortgageDetails = mortgageDetails ;
            navMan.navigateTo({
                "appName": "ArrangementsMA",
                "friendlyName": "AccountsUIModule/frmMortgageAccountDetails"
            });
        },
    }
});

