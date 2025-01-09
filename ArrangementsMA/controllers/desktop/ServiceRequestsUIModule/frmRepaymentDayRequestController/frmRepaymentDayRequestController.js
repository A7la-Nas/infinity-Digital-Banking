define("ArrangementsMA/ServiceRequestsUIModule/userfrmRepaymentDayRequestController", ['FormControllerUtility', 'CommonUtilities'], function(FormControllerUtility, CommonUtilities) {
    //Type your controller code here 
    var orientationHandler = new OrientationHandler();
    return {
        dataObj: {},
        documentTitle: {},
        parsedAddress: {},
        ordinalDays: {
            "1": "1st",
            "2": "2nd",
            "3": "3rd",
            "4": "4th",
            "5": "5th",
            "6": "6th",
            "7": "7th",
            "8": "8th",
            "9": "9th",
            "10": "10th",
            "11": "11th",
            "12": "12th",
            "13": "13th",
            "14": "14th",
            "15": "15th",
            "16": "16th",
            "17": "17th",
            "18": "18th",
            "19": "19th",
            "20": "20th",
            "21": "21th",
            "22": "22th",
            "23": "23th",
            "24": "24th",
            "25": "25th",
            "26": "26th",
            "27": "27th",
            "28": "28th",
            "29": "29th",
            "30": "30th",
            "31": "31th"
        },
        frmPreShow: function() {
            var navMan = applicationManager.getNavigationManager();
            this.dataObj = navMan.getCustomInfo("frmRepaymentDayRequest");
            var scopeObj = this;
            if (this.dataObj.subType == "ChangeRepaymentDate") {
                this.setDataForDay();
            } else if (this.dataObj.subType == "ChangeRepaymentAccount") {
                this.setDataForAccount();
            } else if (this.dataObj.subType == "UpdatePrimaryAddress") {
                this.setDataForAddress();
            } else if (this.dataObj.subType == "CurrentAccountClosure" || this.dataObj.subType=="SavingAccountClosure") {
                this.setDataForClosure();
            }
            this.setDocumentViewSegment("");
            var formTemplateContext = {
                "sessionTimeOut": {
                    "timer": 4
                },
                "breadCrumbBack": {
                    "flag": "false"
                }
            }
            this.view.formTemplate12.setContext(formTemplateContext);
            this.view.formTemplate12.flxTCButtons.flxButtons.top = "5dp";
            this.view.formTemplate12.flxTCButtons.flxButtons.flxDownload.onClick = this.downloadPage;
            this.view.formTemplate12.flxPageFooter.flxBackButton.btnBack.onClick = this.backToServiceRequests;
            this.view.formTemplate12.onError = function(errorObject) {
                alert(JSON.stringify(errorObject));
            };
            this.view.formTemplate12.flxTCButtons.flxButtons.flxPrint.onClick = this.navigateToPrintScreen;
            if (kony.application.getCurrentBreakpoint() <= 640 || orientationHandler.isMobile) {
                this.view.formTemplate12.flxTCButtons.flxButtons.isVisible = false;
            }
        },
        postShow: function() {
            if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityHeader.flxSeparator.left = "0dp";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityHeader.flxSeparator.right = "0dp";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityHeader.flxSeparator.width = "100%";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxAccountDetails.flxSeparator1.left = "0dp";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxAccountDetails.flxSeparator1.right = "0dp";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxAccountDetails.flxSeparator1.width = "100%";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxAddress.flxSeparator3.left = "0dp";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxAddress.flxSeparator3.right = "0dp";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxAddress.flxSeparator3.width = "100%";
                this.view.formTemplate12.flxContentTCCenter.parent.width = "102%";
                this.view.formTemplate12.flxContentTCCenter.parent.left = "-9dp";
            }
            applicationManager.getNavigationManager().applyUpdates(this);
            if (kony.application.getCurrentBreakpoint() === 1366 || orientationHandler.isDesktop) {
                this.view.formTemplate12.flxContentTCCenter.parent.parent.parent.flxPageTitleMain.flxPageTitle.lblPageTitle.left = "-4dp";
            }
            if (kony.application.getCurrentBreakpoint() > 1366) {
                this.view.formTemplate12.flxContentTCCenter.parent.parent.parent.flxPageTitleMain.flxPageTitle.lblPageTitle.left = "12dp";
            }
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.height="";
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblRequestTypeVal.text = this.dataObj.subType_description;
        },
        navigateToPrintScreen: function() {
            var navMan = applicationManager.getNavigationManager();
            navMan.navigateTo({
                "appName": "ArrangementsMA",
                "friendlyName": "ServiceRequestsUIModule/frmPrintServiceRequest"
            })
        },
        downloadPage: function() {
            if (this.dataObj.subType == "ChangeRepaymentDate") {
                payload = {};
                payload.referenceNumber = this.dataObj.serviceReqId;
                payload.facilityName = this.dataObj.serviceReqRequestIn.facilityName + ' - ' + this.dataObj.accountName.slice(-4);
                payload.numberOfLoans = this.dataObj.serviceReqRequestIn.numOfLoans;
                payload.outstandingBalance = CommonUtilities.formatCurrencyWithCommas(this.dataObj.serviceReqRequestIn.currentOutstandingBalanceAmount, false, this.dataObj.serviceReqRequestIn.currentOutstandingBalanceCurrency);
                payload.maturityDate = this.getFormattedDate(this.dataObj.serviceReqRequestIn.currentMaturityDate);
                payload.contentType = "pdf";
                payload.loanDetails = [];
                plans = JSON.parse(this.dataObj.serviceReqRequestIn.requestDetails.replaceAll(/'/g, '\"'));
                plans.forEach(function(plan) {
                    var data = {
                        "loanName": plan.loanName + '-' + plan.loanAccountNumber.substr(-4),
                        "newRepayementDay": scopeObj.ordinalDays[String(plan.requestData[0].newValue)],
                        "newFrequency": plan.requestData[2].newValue,
                    }
                    payload.loanDetails.push(data);
                });
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "AccountServicesUIModule",
                    "appName": "ArrangementsMA"
                }).presentationController.downloadDayPage(payload);
            } else {
                payload = {};
                payload.referenceNumber = this.dataObj.serviceReqId;
                payload.loanName = this.dataObj.serviceReqRequestIn.loanName;
                details = JSON.parse(this.dataObj.serviceReqRequestIn.requestDetails.replaceAll(/'/g, '\"'));
                payload.newRepaymentAccountHolderName = details[0].newValue;
                payload.newRepaymentAccountHolderName = details[1].newValue;
                payload.bankName = details[2].newValue;
                payload.contentType = "pdf";
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "AccountServicesUIModule",
                    "appName": "ArrangementsMA"
                }).presentationController.downloadAccountPage(payload);
            }
        },
        downloadPageDoc: function(fileUrl) {
            var data = {
                "url": fileUrl
            };
            CommonUtilities.downloadFile(data);
        },
        setDataForClosure: function() {
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblRequestTypeVal.text = this.dataObj.subType_description;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblReferenceNumberVal.text = this.dataObj.serviceReqId;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblFacilityNameVal.text = this.dataObj.serviceReqRequestIn.accountName + ' - ' + this.dataObj.serviceReqRequestIn.accountNumber.slice(-4);
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblNoOfLoansVal.text = CommonUtilities.formatCurrencyWithCommas(this.dataObj.serviceReqRequestIn.currentBalance, false, this.dataObj.serviceReqRequestIn.currentBalanceCurrency);
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblOutstandingBalanceVal.text = this.dataObj.serviceReqRequestIn.closingReason;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblMaturityDateVal.text = this.dataObj.serviceReqStatus;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblStatusVal.isVisible = false;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblCommentsVal.isVisible = false;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblStatus.isVisible = false;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblComments.isVisible = false;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxAccountDetails.isVisible = false;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxSegLoanDetails.isVisible = true;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxAddress.isVisible = false;
            this.resetAccountData();
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblFacilityName.text = "Account :";
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblNoOfLoans.text = "Current Balance :";
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblOutstandingBalance.text = "Reason For Closure :";
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblMaturityDate.text = "Status:";
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblStatus.isVisible = false;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblComments.isVisible = false;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.height = (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) ? "350dp" : "250dp";
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.isVisible = false;
            this.setWidgetDataForAccountAndDay();
            this.setDocumentViewSegment("flxFileDownload");
            if (this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxSupportingDocsMain.flxSupportingDocs.segSupportingDocs.data.length !== 0) {
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxSupportingDocsMain.flxSupportingDocsTitle.isVisible = true;
            } else {
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxSupportingDocsMain.flxSupportingDocsTitle.isVisible = false;
            }
            this.view.formTemplate12.flxContentTCCenter.flxLoanDetails.isVisible=false;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.height="";
        },
        setDataForDay: function() {
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblRequestTypeVal.text = this.dataObj.subType_description;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblReferenceNumberVal.text = this.dataObj.serviceReqId;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblFacilityNameVal.text = this.dataObj.serviceReqRequestIn.facilityName + ' - ' + this.dataObj.accountName.slice(-4);
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblNoOfLoansVal.text = this.dataObj.serviceReqRequestIn.numOfLoans;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblOutstandingBalanceVal.text = CommonUtilities.formatCurrencyWithCommas(this.dataObj.serviceReqRequestIn.currentOutstandingBalanceAmount, false, this.dataObj.serviceReqRequestIn.currentOutstandingBalanceCurrency);
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblMaturityDateVal.text = this.getFormattedDate(this.dataObj.serviceReqRequestIn.currentMaturityDate);
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblStatusVal.text = this.dataObj.serviceReqStatus;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblCommentsVal.text = kony.sdk.isNullOrUndefined(this.dataObj.adminComments) ? "none":this.dataObj.adminComments;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxAccountDetails.isVisible = false;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxSegLoanDetails.isVisible = true;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxAddress.isVisible = false;
            this.resetAccountData();
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxSegLoanDetails.segLoanDetails.widgetDataMap = {
                "flxRepaymentDay": "flxRepaymentDay",
                "flxHead": "flxHead",
                "flxContent": "flxContent",
                "lblCurrentValue": "lblCurrentValue",
                "lblNewValue": "lblNewValue",
                "lblRepaymentDay": "lblRepaymentDay",
                "lblRepaymentDayCV": "lblRepaymentDayCV",
                "lblRepaymentDayCV1":"lblRepaymentDayCV1",
                "lblRepaymentDayNV1": "lblRepaymentDayNV1",
                "lblRepaymentDayNV": "lblRepaymentDayNV",
                "lblPaymentFrequency": "lblPaymentFrequency",
                "lblPaymentFrequencyCV": "lblPaymentFrequencyCV",
                "lblPaymentFrequencyNV": "lblPaymentFrequencyNV",
                "lblPaymentFrequencyCV1": "lblPaymentFrequencyCV1",
                "lblPaymentFrequencyNV1": "lblPaymentFrequencyNV1",
                "lblNextInstallmentDue": "lblNextInstallmentDue",
                "lblNextInstallmentDueCV": "lblNextInstallmentDueCV",
                "lblNextInstallmentDueNV": "lblNextInstallmentDueNV",
                "lblNextInstallmentDueCV1": "lblNextInstallmentDueCV1",
                "lblNextInstallmentDueNV1": "lblNextInstallmentDueNV1",
                "lblTransactionHeader": "lblTransactionHeader",
                "flxDropDown" : "flxDropDown",
                "lblSeparator": "lblSeparator",
                "lblTopSeparator": "lblTopSeparator",
                "imgDropDown": "imgDropDown"
            };
            var data = [];
            scopeObj = this;
            if (!(this.dataObj.serviceReqRequestIn.loansDetails == undefined)) plans = JSON.parse(this.dataObj.serviceReqRequestIn.loansDetails.replaceAll(/'/g, '\"'));
            else plans = JSON.parse(this.dataObj.serviceReqRequestIn.requestDetails.replaceAll(/'/g, '\"'));
            plans.forEach(function(plan, i) {
                var dataobject = [];
                dataobject[0] = {
                    flxDropDown:{
                        isVisible: false
                    },
                    imgDropDown: {
                        isVisible: false
                    },
                    lblTransactionHeader: {
                        text: plan.loanName + '-' + plan.loanAccountNumber.substr(-4),
                        left: "30dp"
                    }
                }
                dataobject[1] = [{
                    template: (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) ? "flxRepaymentDayMobile" : ((kony.application.getCurrentBreakpoint() == 1024 || orientationHandler.isTablet) ? "flxRepaymentDayTablet" : "flxRepaymentDay"),
                    lblRepaymentDayCV: scopeObj.ordinalDays[String(plan.requestData[0].currentValue)],
                    lblRepaymentDayCV1:"Repayment Day Current Value "+scopeObj.ordinalDays[String(plan.requestData[0].currentValue)],
                    lblRepaymentDayNV: scopeObj.ordinalDays[String(plan.requestData[0].newValue)],
                    lblRepaymentDayNV1: "Repayment Day New Value "+scopeObj.ordinalDays[String(plan.requestData[0].newValue)],
                    lblPaymentFrequencyCV: plan.requestData[2].currentValue,
                    lblPaymentFrequencyNV: plan.requestData[2].newValue,
                    lblPaymentFrequencyCV1: "Payment Frequency Current Value "+plan.requestData[2].currentValue,
                    lblPaymentFrequencyNV1: "Payment Frequency New Value "+plan.requestData[2].newValue,
                    lblNextInstallmentDueCV: plan.requestData[1].currentValue,
                    lblNextInstallmentDueNV: (plan.requestData[1].newValue===""||plan.requestData[1].newValue===null||plan.requestData[1].newValue===undefined)?"none":plan.requestData[1].newValue,
                    lblNextInstallmentDueCV1: "Next Installment Due Current Value "+plan.requestData[1].currentValue,
                    lblNextInstallmentDueNV1: (plan.requestData[1].newValue===""||plan.requestData[1].newValue===null||plan.requestData[1].newValue===undefined)?"Next Installment Due New Value none":"Next Installment Due New Value "+plan.requestData[1].newValue,
                }]
                data.push(dataobject);
            })
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxSegLoanDetails.segLoanDetails.sectionHeaderTemplate="flxLoanDetailsHeader";
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxSegLoanDetails.segLoanDetails.setData(data);
            this.setWidgetDataForAccountAndDay();
            this.setDocumentViewSegment("flxFileDownload");
            if (this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxSupportingDocsMain.flxSupportingDocs.segSupportingDocs.data.length !== 0) {
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxSupportingDocsMain.flxSupportingDocsTitle.isVisible = true;
            } else {
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxSupportingDocsMain.flxSupportingDocsTitle.isVisible = false;
            }
            kony.application.dismissLoadingScreen();
            this.view.formTemplate12.flxContentTCCenter.flxLoanDetails.isVisible=true;
            this.view.formTemplate12.flxContentTCCenter.flxLoanDetails.flxLoanAccountsSegment.isVisible=true;
        },
        resetAccountData: function() {
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblNoOfLoans.text = "Number Of Loans:";
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxSegLoanDetails.isVisible = true;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblOutstandingBalanceVal.isVisible = true;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblMaturityDateVal.isVisible = true;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblStatusVal.isVisible = true;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblCommentsVal.isVisible = true;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblOutstandingBalance.isVisible = true;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblMaturityDate.isVisible = true;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblStatus.isVisible = true;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblComments.isVisible = true;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.lblLoanDetails.text = "Loan Details";
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.height = (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) ? "440dp" : "340dp";
        },
        setDataForAccount: function() {
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblRequestTypeVal.text = this.dataObj.subType_description;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblReferenceNumberVal.text = this.dataObj.serviceReqId;
            if (!kony.sdk.isNullOrUndefined(this.dataObj.accountName)) {
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblFacilityNameVal.text = this.dataObj.serviceReqRequestIn.facilityName + '-' + this.dataObj.accountName.slice(-4);
            } else {
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblFacilityNameVal.text = this.dataObj.serviceReqRequestIn.facilityName + ' - ' + this.dataObj.serviceReqRequestIn.loanAccountNumber.slice(-4);
            }
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblNoOfLoansVal.text = this.dataObj.serviceReqRequestIn.loanName + ' - ' + this.dataObj.serviceReqRequestIn.loanAccountNumber.slice(-4);
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblNoOfLoans.text = "Loan Name:";
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxSegLoanDetails.isVisible = false;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblOutstandingBalanceVal.isVisible = false;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblMaturityDateVal.isVisible = false;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblStatusVal.isVisible = false;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblCommentsVal.isVisible = false;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblOutstandingBalance.isVisible = false;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblMaturityDate.isVisible = false;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblStatus.isVisible = false;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblComments.isVisible = false;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxAddress.isVisible = false;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxAccountDetails.isVisible = true;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.lblLoanDetails.text = "Loan Details";
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.height = (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) ? "260dp" : "180dp";
            temp = this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxAccountDetails;
            details = JSON.parse(this.dataObj.serviceReqRequestIn.requestDetails.replaceAll(/'/g, '\"'));
            if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
                this.setDataForAccountMobile(details);
            }
            temp.lblHolderNameCV.text = details[0].currentValue;
            temp.lblHolderNameNV.text = details[0].newValue;
            temp.lblHolderNameCV1.text = "Repayment Account Holder Name Current Account Detail "+details[0].currentValue;
            temp.lblHolderNameNV1.text = "Repayment Account Holder Name New Account Detail "+details[0].newValue;
            temp.lblAccountNumberCV.text = details[1].currentValue;
            temp.lblAccountNumberNV.text = details[1].newValue;
            temp.lblAccountNumberCV1.text = "Repayment Account Number Current Account Detail "+details[1].currentValue;
            temp.lblAccountNumberNV1.text = "Repayment Account Number New Account Detail "+details[1].newValue;
            temp.lblBankNameCV.text = details[2].currentValue;
            temp.lblBankNameNV.text = details[2].newValue;
            temp.lblBankNameCV1.text = "Bank Name Current Account Detail "+details[2].currentValue;
            temp.lblBankNameNV1.text = "Bank Name New Account Detail "+details[2].newValue;
            this.setWidgetDataForAccountAndDay();
            var template = (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? "flxFileDownloadMobile" : "flxFileDownload";
            this.setDocumentViewSegment(template);
            if (this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxSupportingDocsMain.flxSupportingDocs.segSupportingDocs.data.length !== 0) {
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxSupportingDocsMain.flxSupportingDocsTitle.isVisible = true;
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxAccountDetails.lblSeperator.isVisible = true;
            } else {
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxSupportingDocsMain.flxSupportingDocsTitle.isVisible = false;
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxAccountDetails.lblSeperator.isVisible = false;
            }
            this.view.formTemplate12.flxContentTCCenter.flxLoanDetails.isVisible=true;
            this.view.formTemplate12.flxContentTCCenter.flxLoanDetails.flxLoanAccountsSegment.isVisible=true;
        },
        setDataForAccountMobile: function(details) {
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxAccountDetails.flxCurrentACmb.flxHeadermb.height = "40dp";
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxAccountDetails.flxCurrentACmb.flxContentCurrentmb.top = "0dp";
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxAccountDetails.flxNewACmb.top = "210dp";
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.height = "";
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxAccountDetails.flxNewACmb.flxSeperatorMb1.isVisible = false;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxAccountDetails.flxNewACmb.flxSeparatorMb.isVisible = false;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxAccountDetails.flxNewACmb.flxContentNewmb.top = "0dp";
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxAccountDetails.flxNewACmb.flxNewHeaderMb.height = "40dp";
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxAccountDetails.flxCurrentACmb.flxHeadermb.skin = "ICSknbgF9F9F9topbottomBorder";
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxAccountDetails.flxNewACmb.flxNewHeaderMb.skin = "ICSknbgF9F9F9topbottomBorder";
            currentTemp = this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxAccountDetails.flxCurrentACmb.flxContentCurrentmb;
            newTemp = this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxAccountDetails.flxNewACmb.flxContentNewmb;
            currentTemp.lblAccountHolderNameValCV.text = details[0].currentValue;
            currentTemp.lblAccountNumberValCVmb.text = details[1].currentValue;
            currentTemp.lblBankNameValCVmb.text = details[2].currentValue;
            newTemp.lblAccountHolderNameValNV.text = details[0].newValue;
            newTemp.lblAccountNumberValNVmb.text = details[1].newValue;
            newTemp.lblBankNameValNVmb.text = details[2].newValue;
            this.view.formTemplate12.flxContentTCCenter.flxLoanDetails.isVisible=true;
            this.view.formTemplate12.flxContentTCCenter.flxLoanDetails.flxLoanAccountsSegment.isVisible=true;
        },
        /***
		      Function used to set data to Form based on UpdatePrimaryAddress subtype
      */
        setDataForAddress: function() {
            this.hideRepaymentDetails();
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblRequestTypeVal.text = "Change of Address";
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblReferenceNumberVal.text = this.dataObj.serviceReqId;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblFacilityName.text = "Status:";
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblFacilityNameVal.text = this.dataObj.serviceReqStatus;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblNoOfLoans.text = "Comments:";
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblNoOfLoansVal.text = "";
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.height = (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) ? "260dp" : "180dp";
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.lblLoanDetails.text = "Address Details";
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxAddress.isVisible = true;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxAddress.lblExistingAddressVal1.text = this.existingAddress1();
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxAddress.lblExistingAddressVal2.text = this.existingAddress2();
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxAddress.lblNewAddressVal1.text = this.newAddress1();
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxAddress.lblNewAddressVal2.text = this.newAddress2();
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxSupportingDocsMain.flxSupportingDocsTitle.isVisible = true;
            this.setWidgetDataMapForAddress();
            var template = (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? "flxChangeOfAddressMobile" : "flxChangeOfAddress";
            this.setDocumentViewSegment(template);
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityHeader.flxSeparator.left = "0dp";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityHeader.flxSeparator.right = "0dp";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityHeader.flxSeparator.width = "100%";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityHeader.lblRequestDetails.top = "18dp";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.lblLoanDetails.top = "18dp";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxSupportingDocsMain.flxSupportingDocsTitle.flxSeparator4.right = "0dp";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxSupportingDocsMain.flxSupportingDocsTitle.flxSeparator4.width = "100%";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxSupportingDocsMain.flxSupportingDocsTitle.flxSeparator4.left = "0dp";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxAddress.flxSeparator3.left = "0dp";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxAddress.flxSeparator3.right = "0dp";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxAddress.flxSeparator3.width = "100%";
            } else {
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxSupportingDocsMain.flxSupportingDocsTitle.lblSupportingDocTitle.skin = "bbSknLbl42424215pxSemibold";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.lblLoanDetails.skin = "bbSknLbl42424215pxSemibold";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblRequestTypeVal.skin = "bbSknLbl424242SSP15Px";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblReferenceNumberVal.skin = "bbSknLbl424242SSP15Px";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblFacilityNameVal.skin = "bbSknLbl424242SSP15Px";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblNoOfLoansVal.skin = "bbSknLbl424242SSP15Px";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityHeader.lblRequestDetails.skin = "bbSknLbl42424215pxSemibold";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblRequestType.skin = "bbSknLbl727272SSP15Px";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblReferenceNumberVal.skin = "bbSknLbl727272SSP15Px";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblFacilityNameVal.skin = "bbSknLbl727272SSP15Px";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblNoOfLoansVal.skin = "bbSknLbl727272SSP15Px";
            }
            if (this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxSupportingDocsMain.flxSupportingDocs.segSupportingDocs.data.length !== 0) {
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxSupportingDocsMain.isVisible = true;
            } else {
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxSupportingDocsMain.isVisible = false;
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxAddress.height = "180dp";
            }
            this.view.formTemplate12.flxContentTCCenter.flxLoanDetails.isVisible=true;
            this.view.formTemplate12.flxContentTCCenter.flxLoanDetails.flxLoanAccountsSegment.isVisible=true;
        },
        setDocumentViewSegment: function(template) {
            var documents = this.formatSegmentData(template);
            if(documents.length>0){
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxSupportingDocsMain.isVisible=true;
            }
            else{
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxSupportingDocsMain.isVisible=false;
            }
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxSupportingDocsMain.flxSupportingDocs.segSupportingDocs.setData(documents);
        },
        formatSegmentData: function(template) {
            if ((this.dataObj.serviceReqRequestIn.supportingDocumentData) !== "") {
                var data = JSON.parse(this.dataObj.serviceReqRequestIn.supportingDocumentData.replaceAll(/'/g, '\"'));
                for (var proofCount = 0; proofCount < data.length; proofCount++) {
                    var count = proofCount + 1;
                    data[proofCount].lblProof = "Proof " + count + ":";
                    data[proofCount].template = template; //"flxChangeOfAddress";flxFileDownload
                    data[proofCount]["flxDownload"] = {
                        "onClick": this.onDownloadClick.bind(this, data[proofCount])
                    };
                    data[proofCount]["flxMainWrapper"] = {
                        "width": "90%"
                    };
                    if (template === "flxChangeOfAddressMobile" && data[proofCount].fileName.length > 25) {
                        data[proofCount].fileName = data[proofCount].documentName.substring(0, 19) + "..." + (data[proofCount].fileType.split("/"))[1];
                    }
                }
                return data;
            } else {
                return [];
            }
        },
        setWidgetDataMapForAddress: function() {
            var widgetDataMap = {
                flxDownload: "flxDownload",
                flxFileDownloadMobile: "flxFileDownload",
                fileName: "documentName",
                lblDocName: "fileName",
                imgDownload: "imgDownload",
                lblDownload: "lblDownload",
                imgFileType: "imgFileType",
                lblDocumentType: "lblDocumentType",
                lblProof: "lblProof",
                lblProofName: "documentType",
                template: "template"
            };
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxSupportingDocsMain.flxSupportingDocs.segSupportingDocs.rowTemplate = "flxChangeOfAddress"
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxSupportingDocsMain.flxSupportingDocs.segSupportingDocs.widgetDataMap = widgetDataMap;
        },
        setWidgetDataForAccountAndDay: function() {
            var widgetDataMap = {
                flxDownload: "flxDownload",
                flxFileDownloadMobile: "flxDownload",
                lblFileName: "documentName",
                imgDownload: "imgDownload",
                lblDownload: "lblDownload",
                imgFileType: "imgFileType",
                template: "template",
                flxMainWrapper: "flxMainWrapper"
            };
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxSupportingDocsMain.flxSupportingDocs.segSupportingDocs.rowTemplate = "flxFileDownload"
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxSupportingDocsMain.flxSupportingDocs.segSupportingDocs.widgetDataMap = widgetDataMap;
        },
        hideRepaymentDetails: function() {
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblOutstandingBalance.isVisible = false;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblOutstandingBalanceVal.isVisible = false;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblMaturityDate.isVisible = false;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblMaturityDateVal.isVisible = false;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblStatus.isVisible = false;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblStatusVal.isVisible = false;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblComments.isVisible = false;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityContent.lblCommentsVal.isVisible = false;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxSegLoanDetails.isVisible = false;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxAccountDetails.isVisible = false;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxSupportingDocsMain.flxCheckBoxMain.isVisible = false;
        },
        existingAddress1: function() {
            data = JSON.parse(this.dataObj.serviceReqRequestIn.requestDetails.replaceAll(/'/g, '\"'));
            this.parsedAddress = data[0].requestData;
            var formattedAddress = this.parsedAddress[2].currentValue === "1" && this.parsedAddress[5].currentValue === "lbl1" ? " " : this.parsedAddress[0].currentValue !== undefined ? this.parsedAddress[0].currentValue + "," + this.parsedAddress[1].currentValue + "," : this.parsedAddress[1].currentValue + ",";
            return formattedAddress;
        },
        newAddress1: function() {
            var formattedAddress = this.parsedAddress[0].newValue !== undefined ? this.parsedAddress[0].newValue + "," + this.parsedAddress[1].newValue + "," : this.parsedAddress[1].newValue + ",";
            return formattedAddress;
        },
        existingAddress2: function() {
            var formattedAddress = this.parsedAddress[2].currentValue === "1" && this.parsedAddress[5].currentValue === "lbl1" ? " " : this.parsedAddress[6].currentValue + "," + this.parsedAddress[5].currentValue + "," + this.parsedAddress[2].currentValue + "," + this.parsedAddress[3].currentValue;
            return formattedAddress;
        },
        newAddress2: function() {
            var formattedAddress = this.parsedAddress[6].newValue + "," + this.parsedAddress[5].newValue + "," + this.parsedAddress[2].newValue + "," + this.parsedAddress[3].newValue;
            return formattedAddress;
        },
        onDownloadClick: function(selectedData) {
            this.documentTitle.fileName = selectedData.documentName;
            this.documentTitle.format = selectedData.fileType;
            //have to add loading indicator
            FormControllerUtility.showProgressBar(this.view);
            selectedData = selectedData.documentId !== undefined ? selectedData : {
                documentId: selectedData.docId
            };
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                moduleName: "ServiceRequestsUIModule",
                appName: "ArrangementsMA"
            }).presentationController.downloadDocument(selectedData);
        },
        downloadDocumentFile: function(url) {
            this.callDownloadService(url, this.documentTitle.fileName);
            FormControllerUtility.hideProgressBar(this.view);
        },
        callDownloadService: function(mfDownloadURL, fileName) {
            try {
                var self = this;
                var authToken = KNYMobileFabric.currentClaimToken;
                var xhr = new kony.net.HttpRequest();
                xhr.open('GET', mfDownloadURL, true);
                xhr.setRequestHeader("X-Kony-Authorization", authToken);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.responseType = "blob";
                xhr.onReadyStateChange = function() {
                    try {
                        if (xhr.readyState === 4 && xhr.status === 200) {
                            self.downloadFileFromResponse(xhr.response, fileName);
                        } else if (xhr.status !== 200) {
                            kony.print(" ERROR: Error downloadin csv");
                        }
                    } catch (err) {
                        kony.print(" ERROR:" + err);
                    }
                };
                xhr.send();
            } catch (err) {
                kony.print(" ERROR:" + err);
            }
        },
        downloadFileFromResponse: function(csvData, fileName) {
            //var data = "";
            var format = this.documentTitle.format;
            var fileType = "";
            switch (format) {
                case "image/jpeg":
                    //data = fileName.split(".jpg");
                    fileType = (format.split("/"))[1];
                    break;
                case "application/pdf":
                    //data = fileName.split(".pdf");
                    fileType = (format.split("/"))[1];
                    break;
                case "image/png":
                    fileType = (format.split("/"))[1];
            }
            var blobObj = new Blob([csvData], {
                type: format
            });
            var url = URL.createObjectURL(blobObj);
            var downloadLink = document.createElement("a");
            downloadLink.setAttribute('href', url);
            downloadLink.download = fileName + "." + fileType;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            kony.print("----" + fileType + "file downloaded----");
        },
        backToServiceRequests: function() {
            var servModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "ServiceRequestsUIModule",
                "appName": "ArrangementsMA"
            });
            servModule.presentationController.initServiceRequests();
        },
        updateFormUI: function(uiData) {
            if (uiData.selectedDocData) {
                this.onDownloadClick(uiData.selectedDocData);
            }
            if (uiData.documentDownloadFile) {
                this.downloadDocumentFile(uiData.documentDownloadFile);
            }
            if (uiData.pageDownloadFile) {
                this.downloadPageDoc(uiData.pageDownloadFile);
            }
            if (uiData.showOnServerError) {
                this.onErrorCallBack(uiData.showOnServerError);
            }
        },
        getFormattedDate: function(date) {
            if (date.indexOf("-") == "-1") {
                var newDate = date.substr(0, 4) + "-" + date.substr(4, 2) + "-" + date.substr(6, 2);
                return CommonUtilities.getFrontendDateString(newDate);
            } else {
                return CommonUtilities.getFrontendDateString(date);
            }
        },
        onBreakpointChange: function() {
            var navMan = applicationManager.getNavigationManager();
            this.dataObj = navMan.getCustomInfo("frmRepaymentDayRequest");
            var scopeObj = this;
            if (this.dataObj.subType == "ChangeRepaymentDate") {
                this.setDataForDay();
            } else if (this.dataObj.subType == "ChangeRepaymentAccount") {
                this.setDataForAccount();
            } else if (this.dataObj.subType == "UpdatePrimaryAddress") {
                this.setDataForAddress();
            }
            if (kony.application.getCurrentBreakpoint() === 640) {
                this.view.formTemplate12.pageTitleVisibility = false;
                this.view.formTemplate12.pageTitle = "Repayment Day Request";
            } else {
                this.view.formTemplate12.pageTitleVisibility = true;
                this.view.formTemplate12.pageTitle = "Repayment Day Request";
            }
            if ((kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile)) {
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxAccountDetails.flxCurrentACmb.isVisible = true;
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxAccountDetails.flxNewACmb.isVisible = true;
            } else {
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxAccountDetails.flxCurrentACmb.isVisible = false;
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.flxAccountDetails.flxNewACmb.isVisible = false;
            }
        },
        onErrorCallBack: function(errMsg) {
            kony.print(errMsg);
            FormControllerUtility.hideProgressBar(this.view);
        }
    }
});