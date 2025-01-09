define("ArrangementsMA/MortgageServicesUIModule/userfrmChangeRepaymentDayCnController", ['CommonUtilities', 'ViewConstants', 'FormControllerUtility', 'OLBConstants', 'CampaignUtility'], function(CommonUtilities, ViewConstants, FormControllerUtility, OLBConstants, CampaignUtility) {
    //Type your controller code here 
    var orientationHandler = new OrientationHandler();
    return {
        selectedDay: "",
        payLoad: {},
        dataObj: {},
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
            this.selectedDay = navMan.getCustomInfo("frmChangeRepaymentDayCn");
            // this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.segLoanDetails.data[0][1][0] = {
            //     template: "flxRepaymentDay"
            // };
            // this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.segLoanDetails.data[1][1][0] = {
            //     template: "flxRepaymentDay"
            // };
            // this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.segLoanDetails.data[2][1][0] = {
            //     template: "flxRepaymentDay"
            // };
            // this.view.formTemplate12.pageTitle = 'Confirm Repayment Day';
            // this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.segLoanDetails.data[1][0].lblTransactionHeader = {
            //     text: "Secondary Loan-1234",
            //     left: "30dp"
            // };
            // this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.segLoanDetails.data[0][0].lblTransactionHeader = {
            //     text: "Primary Loan-1211",
            //     left: "30dp"
            // };
            // this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.segLoanDetails.data[2][0].lblTransactionHeader = {
            //     text: "New Loan-2434",
            //     left: "30dp"
            // };
            var scopeObj = this;
            this.view.formTemplate12.pageTitle = 'Change Repayment Day- Confirmation';
            mortgageDetails = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountServicesUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.mortgageDetails;
            mortgagePlans = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountServicesUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.mortgagePlans;
            account1 = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountsUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.currentAccount;
            scopeObj.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxSupportingDocsMain.flxCheckBoxMain.flxCheckBox.lblCheckBox.text = 'D'
            this.setDataForForm(account1, mortgageDetails, mortgagePlans);
            scopeObj.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxConfirmAndModify.flxButtons.btnSubmit.skin = "sknBtnBlockedSSPFFFFFF15Px";
            scopeObj.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxConfirmAndModify.flxButtons.btnSubmit.setEnabled(false);
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxConfirmAndModify.flxButtons.btnModify.onClick = this.backToChangeRepaymentDay;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxConfirmAndModify.flxButtons.btnCancel.onClick = this.backToFacility;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxSupportingDocsMain.flxCheckBoxMain.flxCheckBox.onClick = function() {
                if (scopeObj.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxSupportingDocsMain.flxCheckBoxMain.flxCheckBox.lblCheckBox.text == 'D') {
                    scopeObj.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxSupportingDocsMain.flxCheckBoxMain.flxCheckBox.lblCheckBox.text = 'C'
                    scopeObj.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxConfirmAndModify.flxButtons.btnSubmit.setEnabled(true);
                    scopeObj.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxConfirmAndModify.flxButtons.btnSubmit.skin = "sknBtnNormalSSPFFFFFF15Px";
                    scopeObj.view.formTemplate12.flxContentTCCenter.flxCheckBox.accessibilityConfig = {
						"a11yARIA": {
							   "tabindex": 0,
                               "aria-labelledby": "lblCheckMsg",
                               "aria-checked": true,
							   "role": "checkbox"
                               }
					};
                } else {
                    scopeObj.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxSupportingDocsMain.flxCheckBoxMain.flxCheckBox.lblCheckBox.text = 'D'
                    scopeObj.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxConfirmAndModify.flxButtons.btnSubmit.setEnabled(false);
                    scopeObj.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxConfirmAndModify.flxButtons.btnSubmit.skin = "sknBtnBlockedSSPFFFFFF15Px";
                    scopeObj.view.formTemplate12.flxContentTCCenter.flxCheckBox.accessibilityConfig = {
						"a11yARIA": {
							   "tabindex": 0,
                               "aria-labelledby": "lblCheckMsg",
                               "aria-checked": false,
							   "role": "checkbox"
                               }
					};
                }
             scopeObj.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxSupportingDocsMain.flxCheckBoxMain.flxCheckBox.setActive(true);   
            };
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxConfirmAndModify.flxButtons.btnSubmit.onClick = this.showAcknowledge;
            var formTemplateContext = {
                "sessionTimeOut": {
                    "timer": 4
                },
                "breadCrumbBack": {
                    "flag": "false"
                }
            }
            this.view.formTemplate12.setContext(formTemplateContext);
            this.view.onBreakpointChange = this.onBreakpoint;
            this.view.formTemplate12.onError = function(errorObject) {
                alert(JSON.stringify(errorObject));
            };
            if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
                scopeObj.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxConfirmAndModify.height = "201dp";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxSupportingDocsMain.flxCheckBoxMain.flxCheckBox.left = "10dp";
                scopeObj.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxConfirmAndModify.flxButtons.height = "165dp";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.height = "260px";
            }
        },
        postShow: function() {
            applicationManager.getNavigationManager().applyUpdates(this);
        },
        onBreakpoint: function() {
            if (kony.application.getCurrentBreakpoint() === 640) {
                this.view.formTemplate12.pageTitleVisibility = false;
                this.view.formTemplate12.pageTitle = "Change Repayment Day- Confirmation";
            } else {
                this.view.formTemplate12.pageTitleVisibility = true;
                this.view.formTemplate12.pageTitle = "Change Repayment Day- Confirmation";
            }
        },
        setDataForForm: function(account, details, plans) {
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityHeader.flxFacilityContent.lblFacilityNameVal.text = account.accountName + ' - ' + account.account_id.substr(-4);
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityHeader.flxFacilityContent.lblCurrentOutstandingBalVal.text = CommonUtilities.formatCurrencyWithCommas(details.totalOutstandingBalance, false, details.currencyCode);
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityHeader.flxFacilityContent.lblNoOfLoansVal.text = plans.length.toString();
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxFacilityDetails.flxFacilityHeader.flxFacilityContent.lblCurrentMaturityDateVal.text = this.getFormattedDate(details.maturityDate);
            this.dataObj.accountName = account.accountName + ' - ' + account.account_id.substr(-4);
            this.dataObj.outstandingBalance = CommonUtilities.formatCurrencyWithCommas(details.totalOutstandingBalance, false, details.currencyCode);
            this.dataObj.noOfLoans = plans.length.toString();
            this.dataObj.maturityDate = this.getFormattedDate(details.maturityDate);
            this.dataObj.selectedDay = "";
            this.dataObj.segData = [
                [{
                        lblLoans: 'Loans',
                        lblNextInstallment: {
                            text: 'Payment Frequency',
                            isVisible: true,
                            left: (kony.application.getCurrentBreakpoint() == 1024 || orientationHandler.isTablet) ? "553dp" : "675dp"
                        },
                        lblRepaymentDayNew: {
                            text: 'New Repayment Day',
                            left: (kony.application.getCurrentBreakpoint() == 1024 || orientationHandler.isTablet) ? "285dp" : "359dp"
                        }
                    },
                    []
                ]
            ];
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.segLoanDetails.widgetDataMap = {
                "flxRepaymentDay": "flxRepaymentDay",
                "flxHead": "flxHead",
                "flxContent": "flxContent",
                "lblCurrentValue": "lblCurrentValue",
                "lblNewValue": "lblNewValue",
                "lblRepaymentDay": "lblRepaymentDay",
                "lblRepaymentDayCV": "lblRepaymentDayCV",
				"lblRepaymentDayCV1": "lblRepaymentDayCV1",
                "lblRepaymentDayNV": "lblRepaymentDayNV",
				"lblRepaymentDayNV1": "lblRepaymentDayNV1",
                "lblPaymentFrequency": "lblPaymentFrequency",
                "lblPaymentFrequencyCV": "lblPaymentFrequencyCV",
				"lblPaymentFrequencyCV1": "lblPaymentFrequencyCV1",
                "lblPaymentFrequencyNV": "lblPaymentFrequencyNV",
				"lblPaymentFrequencyNV1": "lblPaymentFrequencyNV1",
                "lblNextInstallmentDue": "lblNextInstallmentDue",
                "lblNextInstallmentDueCV": "lblNextInstallmentDueCV",
				"lblNextInstallmentDueCV1": "lblNextInstallmentDueCV1",
                "lblNextInstallmentDueNV": "lblNextInstallmentDueNV",
				"lblNextInstallmentDueNV1": "lblNextInstallmentDueNV1",
                "lblTransactionHeader": "lblTransactionHeader",
                "lblSeparator": "lblSeparator",
                "lblTopSeparator": "lblTopSeparator",
                "imgDropDown": "imgDropDown"
            };
            var data = [];
            payload = {};
            scopeObj = this;
            payload.facilityName = account.accountName;
            payload.accountID = account.accountID;
            payload.arrangementId = account.arrangementId;
            payload.customerId = account.coreCustomerId;
            payload.customerName = account.coreCustomerName;
            payload.numOfLoans = plans.length.toString();
            payload.currentOutstandingBalanceCurrency = account.currencyCode;
            payload.currentOutstandingBalanceAmount = details.totalOutstandingBalance;
            payload.currentMaturityDate = details.maturityDate;
            //             payload.supportingDocumentIds = "2768678687,266757567,277767572";
            payload.requestDetails = [];
           // repaymentDay = "4";
            selectedDay = this.selectedDay;
            this.dataObj.selectedDay = selectedDay;
            plans.forEach(function(plan, i) {
                var dataobject = [];
                dataobject[0] = {
                    imgDropDown: {
                        isVisible: false
                    },
                    lblTransactionHeader: {
                        text: plan.accountName + '-' + plan.accountID.substr(-4),
                        left: "30dp"
                    }
                }
                var repaymentDay = "10";
				var nextInstallmentDue = "10/09/2022";
				if(!kony.sdk.isNullOrUndefined(plan.currentNextRepaymentDate) && plan.currentNextRepaymentDate !== ""){
					repaymentDay = plan.currentNextRepaymentDate.substring(6,8);
					nextInstallmentDue = plan.currentNextRepaymentDate.substring(6,8) + "/" + plan.currentNextRepaymentDate.substring(4,6) + "/" + plan.currentNextRepaymentDate.substring(0,4);
				}
                dataobject[1] = [{
                    template: (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) ? "flxRepaymentDayMobile" : ((kony.application.getCurrentBreakpoint() == 1024 || orientationHandler.isTablet) ? "flxRepaymentDayTablet" : "flxRepaymentDay"),
                    
					lblRepaymentDayCV1: {
						
						"text": "Repayment Day" + " " + "Current Value " + " " + (repaymentDay + "th"),
					},				
					lblRepaymentDayCV: (repaymentDay + "th"),
					
					lblRepaymentDayNV1: {
						"text": "Repayment Day" + " " + "New Value " + " " + (scopeObj.ordinalDays[String(scopeObj.selectedDay)]),
					},
					
                    lblRepaymentDayNV: scopeObj.ordinalDays[String(scopeObj.selectedDay)],
					
					lblPaymentFrequencyCV1: {
						"text": "Payment Frequency" + " " + "Current Value " + " " + "Monthly",
					},
					
                    lblPaymentFrequencyCV: "Monthly",
					
					lblPaymentFrequencyNV1: {
						"text": "Payment Frequency" + " " + "New Value " + " " + "Monthly",
					},
                    lblPaymentFrequencyNV: "Monthly",
					
					lblNextInstallmentDueCV1: {
						"text": "Next Installment Due" + " " + "Current Value " + " " + nextInstallmentDue,
					},
					
                    lblNextInstallmentDueCV: nextInstallmentDue,
					lblNextInstallmentDueNV1: {
						"text": "Next Installment Due" + " " + "New Value " + " " + "None"
					},
					
                    lblNextInstallmentDueNV: "None"
                }]
                data.push(dataobject);
                a = {};
                a.loanName = plan.accountName;
                a.loanAccountNumber = plan.accountID;
                a.requestData = [{
                    "displayName": "RepaymentDay",
                    "fieldName": "repaymentDay",
                    "currentValue": "21",
                    "newValue": "22"
                }, {
                    "displayName": "Next Installment Due",
                    "fieldName": "nextInstallmentDue",
                    "currentValue": "21/8/2023",
                    "newValue": ""
                }, {
                    "displayName": "Frequency",
                    "fieldName": "Frequency",
                    "currentValue": "Monthly",
                    "newValue": "Monthly"
                }];
                a.requestData[0].currentValue = repaymentDay;
                a.requestData[0].newValue = selectedDay;
                a.requestData[1].newValue = "";
                a.requestData[1].currentValue = nextInstallmentDue;
                a.requestData[2].currentValue = "Monthly";
                a.requestData[2].newValue = "Monthly";
                payload.requestDetails[i] = a;
                c = {
                    lblLoanName: plan.accountName + '-' + plan.accountID.substr(-4),
                    lblNextInstallment: {
                        text: 'Monthly',
                        isVisible: true,
                        left: (kony.application.getCurrentBreakpoint() == 1024 || orientationHandler.isTablet) ? "553dp" : "675dp"
                    },
                    lblRepaymentDayNV: {
                        text: scopeObj.ordinalDays[String(selectedDay)],
                        left: (kony.application.getCurrentBreakpoint() == 1024 || orientationHandler.isTablet) ? "285dp" : "359dp"
                    }
                }
                scopeObj.dataObj.segData[0][1][i] = c;
            })
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.segLoanDetails.setData(data);
            if(kony.os.deviceInfo().screenHeight<350){
				if(kony.os.deviceInfo().screenWidth<640){
				var data=this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.segLoanDetails.data;
				for(var i=0;i<data.length;i++){
					for(var j=0;j<data[i][1].length;j++){
						data[i][1][j].template="flxRepaymentDayMobile";
				this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.segLoanDetails.setData(data);
					}
				}
				}
				else if(kony.os.deviceInfo().screenWidth>640&&kony.os.deviceInfo().screenWidth<1366){
				var data=this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.segLoanDetails.data;
				for(var i=0;i<data.length;i++){
					for(var j=0;j<data[i][1].length;j++){
						data[i][1][j].template="flxRepaymentDayTablet";
				this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.segLoanDetails.setData(data);
					}
				}
				}
			    //else
				//this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxLoanAccountsSegment.segLoanDetails.rowTemplate="flxRepaymentDayTablet";	
			}
            var navMan = applicationManager.getNavigationManager();
            var docs = navMan.getCustomInfo("frmChangeRepaymentDayCnFileData");
            payload.supportingDocuments = docs;
            var segData = [];
            docs.forEach(function(doc) {
                segData.push({
                    "flxContentDocs":{"left": (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) ? "-20dp" : "0dp"},
                    "lblDocName": doc.fileName
                })
            })
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxSupportingDocsMain.flxSupportingDocs.segSupportingDocs.setData(segData);
            if (segData.length == 0) {
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxSupportingDocsMain.flxSupportingDocs.isVisible = false;
            } else {
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoanDetails.flxSupportingDocsMain.flxSupportingDocs.isVisible = true;
            }
            this.payLoad = payload;
            kony.application.dismissLoadingScreen();
        },
        backToFacility: function() {
            account = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountsUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.currentAccount;
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountsUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.showAccountDetails(account);
        },
        backToChangeRepaymentDay: function() {
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountsUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.isFromMortgage = -1;
            var navMan = applicationManager.getNavigationManager();
            var configManager = applicationManager.getConfigurationManager();
            navMan.navigateTo({
                "appName": "ArrangementsMA",
                "friendlyName": "AccountsUIModule/frmChangeRepaymentDay"
            });
        },
        showAcknowledge: function() {
            kony.application.showLoadingScreen("loadingskin","Data is still Loading");
            payload = this.payLoad;
            var navMan = applicationManager.getNavigationManager();
            navMan.setCustomInfo("frmChangeRepaymentDayAcknowledge", scopeObj.dataObj);
            navMan.setCustomInfo("frmChangeRepaymentDayAcknowledgePay", scopeObj.payLoad);
            navMan.setCustomInfo("modifyFileData", null);
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "AccountServicesUIModule",
                    "appName": "ArrangementsMA"
                }).presentationController.showAcknowledgement(payload)
                // var navMan = applicationManager.getNavigationManager();
                // var configManager = applicationManager.getConfigurationManager();
                // navMan.navigateTo({
                //     "appName": "ArrangementsMA",
                //     "friendlyName": "MortgageServicesUIModule/frmChangeRepaymentDayAcknowledge"
                // });
        },
        getFormattedDate: function(date) {
            if (date.indexOf("-") == "-1") {
                var newDate = date.substr(0, 4) + "-" + date.substr(4, 2) + "-" + date.substr(6, 2);
                return CommonUtilities.getFrontendDateString(newDate);
            } else {
                return CommonUtilities.getFrontendDateString(date);
            }
        }
    }
});