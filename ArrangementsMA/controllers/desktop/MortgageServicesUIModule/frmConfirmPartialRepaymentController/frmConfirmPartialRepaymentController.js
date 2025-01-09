define("ArrangementsMA/MortgageServicesUIModule/userfrmConfirmPartialRepaymentController", ['CommonUtilities', 'ViewConstants', 'FormControllerUtility', 'OLBConstants', 'CampaignUtility'], function(CommonUtilities, ViewConstants, FormControllerUtility, OLBConstants, CampaignUtility) {
    //Type your controller code here
    var orientationHandler = new OrientationHandler();
    return {
            loadData: {},
            preShow: function() {
            var navMan = applicationManager.getNavigationManager();
            this.loadData = navMan.getCustomInfo("frmConfirmPartialRepayment");
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
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxModifyAndConfirm.flxButtons.btnConfirm.onClick = this.navAcknowledgement;
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxModifyAndConfirm.flxButtons.btnCancel.onClick = this.navCancel;
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxModifyAndConfirm.flxButtons.btnModify.onClick = this.navModify;
            formData = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountServicesUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.formData;
            if (formData.toAccountCurrency === formData.fromAccountCurrency){
                this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxExchangeRate.isVisible = false;
            } else {
                this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxExchangeRate.isVisible = true;
            }
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxAccountNumber.lblAccountNumberVal.text = "************" + formData.fromAccountNumber.slice(-4);
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxAccountNumber.lblShowIcon.text = 'g';
            scope.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxAccountNumber.flxShowIcon.accessibilityConfig = {
                "a11yLabel": "View account number, your account number is currently hidden",
                "a11yARIA":{
                    "tabindex": 0,
                    "role": "button"
                }
            };
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxAccountNumber.flxShowIcon.onClick = function() {
                if (scope.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxAccountNumber.lblShowIcon.text == 'g') {
                    scope.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxAccountNumber.lblShowIcon.text = 'h';
                    scope.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxAccountNumber.flxShowIcon.accessibilityConfig = {
                        "a11yLabel": "Hide account number, your account number is currently visible",
                        "a11yARIA":{
                            "tabindex": 0,
                            "role": "button"
                        }
                    };
                    scope.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxAccountNumber.lblAccountNumberVal.text = formData.fromAccountNumber;
                    scope.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxAccountNumber.flxShowIcon.setActive(true);
                } else {
                    scope.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxAccountNumber.lblShowIcon.text = 'g';
                    scope.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxAccountNumber.flxShowIcon.accessibilityConfig = {
                        "a11yLabel": "View account number, your account number is currently hidden",
                        "a11yARIA":{
                            "tabindex": 0,
                            "role": "button"
                        }
                    };
                    scope.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxAccountNumber.lblAccountNumberVal.text = "************" + formData.fromAccountNumber.slice(-4);
                    scope.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxAccountNumber.flxShowIcon.setActive(true);
                }
            }       
            this.setFacilityDetails();
            this.setPaymentDetails();
        },
        updateFormUI: function(uiData) {
            if (uiData) {
                if (uiData.showLoadingIndicator) {
                    if (uiData.showLoadingIndicator.status === true) {
                        FormControllerUtility.showProgressBar(this.view)
                    } else {
                        FormControllerUtility.hideProgressBar(this.view)
                    }
                }
            }
        },
        postShow: function() {
            applicationManager.getNavigationManager().applyUpdates(this);
            this.setLoanDetails();
            var navMan = applicationManager.getNavigationManager();
            var docs = navMan.getCustomInfo("frmChangeRepaymentAcountCnFileData");
            this.loadData.supportingDocuments = docs;
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
                this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxSupportingDocuments.lblSupportingDocumentsVal.isVisible = true;
                this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxSupportingDocuments.lblSupportingDocumentsVal.text = "None";
            
            }
            this.view.title= "Partial Repayment - Confirmation";
            this.view.confirmPartialRepayment.pageTitlei18n = "i18n.Accounts.ConfirmPartialRepayment";
        },
        setFacilityDetails: function(){
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxMortgageFacilityDetails.flxMortgageFacilityHeader.flxMortgageFacilityContent.lblFacilityNameValue.text = currAccount.accountName + " - " + currAccount.accountID.substr(-4);
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxMortgageFacilityDetails.flxMortgageFacilityHeader.flxMortgageFacilityContent.lblNoOfLoansValue.text = mortgagePlans.length.toString();
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxMortgageFacilityDetails.flxMortgageFacilityHeader.flxMortgageFacilityContent.lblOutstandingBalValue.text  = CommonUtilities.formatCurrencyWithCommas(currAccount.outstandingBalance, false, currAccount.currencyCode);
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxMortgageFacilityDetails.flxMortgageFacilityHeader.flxMortgageFacilityContent.lblMaturityDateValue.text = CommonUtilities.formatCurrencyWithCommas(mortgageDetails.totalPaidAmount, false, mortgageDetails.currencyCode);
            },
        setLoanDetails: function(){
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountName.lblLoanAccountName.text =  details[0].accountName + " - " + details[0].accountID.substr(-4);
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxRepaymentDate.lblRepaymentCurrentDate.text =  this.loadData.currentDate;
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxMaturityDate.lblMaturityCurrentVal.text = this.loadData.currentEndDate;
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxSimulatedAmount.lblSimulatedAmountVal.text = this.loadData.simuVal;
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxSimulatedDate.lblSimulatedDateVal.text = this.loadData.simuDate;
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxSimulatedMaturityDate.lblSimulatedMaturityDateVal.text = this.loadData.simuEndDate;
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxInstallmentAmount.lblCurrentInstallmentVal.text =  this.loadData.currVal;
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxInstallmentAmount.lblSimulatedInstallmentVal.text = this.loadData.simuVal;
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxRepaymentDate.lblRepaymentSimulatedDate.text = this.loadData.simuDate;
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxMaturityDate.lblMaturitySimulatedVal.text = this.loadData.simuEndDate; 
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxRepaymentDate.lblRepaymentCurrentDateDummy.text = "Next Repayment Date Current Value "+ this.loadData.currentDate;
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxMaturityDate.lblMaturityCurrentValDummy.text = "End Date (Maturity Date) Current Value "+this.loadData.currentEndDate;
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxInstallmentAmount.lblCurrentInstallmentValDummy.text ="Installment Amount Current Value "+this.loadData.currVal;
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxInstallmentAmount.lblSimulatedInstallmentValDummy.text = "Installment Amount Simulated Value "+this.loadData.simuVal;
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxRepaymentDate.lblRepaymentSimulatedDateDummy.text ="Next Repayment Date Simulated Value "+ this.loadData.simuDate;
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxMaturityDate.lblMaturitySimulatedValDummy.text = "End Date (Maturity Date) Simulated Value "+this.loadData.simuEndDate;  
           },
       setPaymentDetails: function() {
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxPayon.lblPayonDate.text = this.loadData.Date;
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxNotes.lblNotesDesc.text = this.loadData.Note ==="" ? "None":this.loadData.Note ;
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxCreditValueDate.lblCreditValueDate.text = this.loadData.Date;
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxTotalRepaymentAmount.lblTotalRepaymentAmountVal.text = this.loadData.Amount;
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxAccountHolderName.lblAccountHolderNameVal.text = currAccount.MembershipName;
            this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxLoanAccount.lblLoanAccountVal.text = this.loadData.loanAccountNumber;
            },
       getFormattedDate: function(date) {
            if (date.indexOf("-") == "-1") {
                var newDate = date.substr(0, 4) + "-" + date.substr(4, 2) + "-" + date.substr(6, 2);
                return CommonUtilities.getFrontendDateString(newDate);
            } else {
                return CommonUtilities.getFrontendDateString(date);
            }
        },
        navAcknowledgement: function(){
           var navMan = applicationManager.getNavigationManager();
           var supportingDocumentIdsArray = [];
           this.selData = {};
           this.request = {};
           this.selData.Amount = this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxTotalRepaymentAmount.lblTotalRepaymentAmountVal.text;
           this.selData.Date = this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxPayon.lblPayonDate.text;
           this.selData.creditDate = this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxCreditValueDate.lblCreditValueDate.text;
           this.selData.Notes = this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxNotes.lblNotesDesc.text;
           this.selData.AccountHolder = this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxAccountHolderName.lblAccountHolderNameVal.text;
           this.selData.supportingDocumentIds = this.loadData.supportingDocuments;
           this.selData.nextRepaymentDate = this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxRepaymentDate.lblRepaymentCurrentDate.text;
           this.selData.currMaturityDate = this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxMaturityDate.lblMaturityCurrentVal.text;
           this.selData.simAmount = this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxSimulatedAmount.lblSimulatedAmountVal.text;
           this.selData.simDate = this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxSimulatedDate.lblSimulatedDateVal.text;
           this.selData.simEndDate = this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxSimulatedMaturityDate.lblSimulatedMaturityDateVal.text;
           this.selData.currAmount = this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxInstallmentAmount.lblCurrentInstallmentVal.text;
           this.selData.simuAmount = this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxInstallmentAmount.lblSimulatedInstallmentVal.text;
           this.selData.simuEndDate = this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxRepaymentDate.lblRepaymentSimulatedDate.text;
           this.selData.simulatedEndDate = this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanDetailsContent.flxMaturityDate.lblMaturitySimulatedVal.text;
           this.selData.loanAccNumber = this.view.confirmPartialRepayment.flxContentTCCenter.flxContentMain.flxPaymentDetails.flxPaymentContentDetails.flxLoanAccount.lblLoanAccountVal.text;
            //this.request = this.selData;
            this.request.facilityName = currAccount.accountName;
            this.request.accountID = currAccount.accountID;
            this.request.arrangementId = details[0].arrangementId;
            this.request.customerId = this.loadData.accountList.coreCustomerId;
            this.request.customerName = this.loadData.accountList.coreCustomerName;
            this.request.numOfLoans = mortgagePlans.length.toString();
            this.request.currentOutstandingBalanceCurrency = currAccount.currencyCode;
            this.request.currentOutstandingBalanceAmount = CommonUtilities.formatCurrencyWithCommas(currAccount.outstandingBalance, false, currAccount.currencyCode);
            this.request.amountPaidToDate = CommonUtilities.formatCurrencyWithCommas(mortgageDetails.totalPaidAmount, false, mortgageDetails.currencyCode);
            this.selData.supportingDocumentIds.forEach(function(obj){
                supportingDocumentIdsArray.push(obj.fileName);
            });
            this.selData.supportingDocumentIdsString = supportingDocumentIdsArray.join(", ");
            this.request.requestDetails = [{
                "loanName": details[0].accountName,
                "loanAccountNumber": details[0].accountID,
                "requestData": [
                    {
                        "displayName": "Installment Amount",
                        "fieldName": "installmentAmount",
                        "currentValue": this.loadData.currVal,
                        "newValue": this.loadData.simuVal
                    }, {
                        "displayName": "Next Repayment Date",
                        "fieldName": "nextRepaymentDate",
                        "currentValue": this.loadData.currentDate,
                        "newValue": this.loadData.simuDate
                    }, {
                        "displayName": "End Date",
                        "fieldName": "endDate",
                        "currentValue": this.loadData.currentEndDate,
                        "newValue": this.loadData.simuEndDate
                    }
                ]
            }];
            this.request.paymentDetails = [{
                "totalRepaymentAmount": this.selData.Amount,
                "loanAccount": details[0].accountID,
                "transactionFee": "$5.00",
                "exchangeRate": "1.1233",
                "accountHolderName": currAccount.MembershipName,
                "accountNumber": mortgageDetails.accountNumber,
                "payOn": this.loadData.Date,
                "notes": this.loadData.Note,
                "supportingDocuments":this.selData.supportingDocumentIdsString
            }];
            this.request.supportingDocumentIds = this.loadData.supportingDocuments;
           navMan.setCustomInfo("frmPartialPaymentAcknowledgement", this.selData);
           kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
           "moduleName": "AccountServicesUIModule",
           "appName": "ArrangementsMA"
            }).presentationController.repaymentAccount = loanAccount;
            /*navMan.navigateTo({
                "appName": "ArrangementsMA",
                "friendlyName": "MortgageServicesUIModule/frmPartialPaymentAcknowledgement"
            });*/
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountServicesUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.showConfirmPartialPayment(this.request);
        },
        navCancel: function() {
            var navMan = applicationManager.getNavigationManager();
            navMan.navigateTo({
                "appName": "HomepageMA",
                "friendlyName": "AccountsUIModule/frmDashboard"
            });
        },
        navModify: function() {
           var navMan = applicationManager.getNavigationManager();
           navMan.setCustomInfo("accountModifyFlow", true);
           kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
           "moduleName": "AccountServicesUIModule",
           "appName": "ArrangementsMA"
        }).presentationController.repaymentAccount = loanAccount;
            navMan.navigateTo({
                "appName": "ArrangementsMA",
                "friendlyName": "MortgageServicesUIModule/frmPartialRepaymentPaymentDetails"
            });
        }
    }
});