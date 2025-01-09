define("ArrangementsMA/MortgageServicesUIModule/userfrmChangeRepaymentDayAcknowledgeController", ['FormControllerUtility', 'CommonUtilities'], function(FormControllerUtility, CommonUtilities) {
    //Type your controller code here 
    var orientationHandler = new OrientationHandler();
    return {
        dataObj: {},
        payload: {},
        requestID: "",
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
        updateFormUI: function(uiData) {
            if (uiData) {
                if (uiData.showLoadingIndicator) {
                    if (uiData.showLoadingIndicator.status === true) {
                        kony.application.showLoadingScreen("loadingskin","Data is still Loading");
                    } else {
                        kony.application.dismissLoadingScreen();
                    }
                }
                if (uiData.response) {
                    this.view.formTemplate66.flxContentTCLeft.flxLeft.flxLeftContent.lblReferenceValue.text = uiData.response.Id;
                    this.requestID = uiData.response.Id;
                    var navMan = applicationManager.getNavigationManager();
                    navMan.setCustomInfo("frmPrintAcknowledge",this.requestID);
                }
                if (uiData.pageDownloadFile) {
                    this.downloadPageDoc(uiData.pageDownloadFile);
                }
                if (uiData.showError) {
                    this.showErrorScreen(uiData.error);
                }
            }
        },
        frmPreShow: function() {
            kony.application.showLoadingScreen("loadingskin","Data is still Loading");
            var navMan = applicationManager.getNavigationManager();
            this.dataObj = navMan.getCustomInfo("frmChangeRepaymentDayAcknowledge");
            this.payload = navMan.getCustomInfo("frmChangeRepaymentDayAcknowledgePay");
            this.setUpFormData();
            this.view.formTemplate66.flxPageFooter.flxAcknowledgeFooter.btnBackToFacility.onClick = this.backToFacility;
            this.view.formTemplate66.flxTCButtons.flxButtons.flxPrint.onClick = this.print;
            var formTemplateContext = {
                "sessionTimeOut": {
                    "timer": 4
                },
                "breadCrumbBack": {
                    "flag": "false"
                }
            }
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.resetUI();
            this.view.formTemplate66.setContext(formTemplateContext);
            this.view.formTemplate66.flxTCButtons.flxButtons.flxDownload.onClick = this.downloadPage;
            this.view.formTemplate66.onError = function(errorObject) {
                alert(JSON.stringify(errorObject));
            };
			
        },
        postShow: function() {
            applicationManager.getNavigationManager().applyUpdates(this);
            
        },
        onBreakpointChange: function() {
            if (kony.application.getCurrentBreakpoint() === 640) {
                this.view.formTemplate66.pageTitleVisibility = false;
                this.view.formTemplate66.pageTitle = "Change Repayment Day";
            } else {
                this.view.formTemplate66.pageTitleVisibility = true;
                this.view.formTemplate66.pageTitle = "Change Repayment Day- Acknowledgement";
            }
        },
        downloadPage: function() {
            payload = {};
            payload.referenceNumber = this.requestID;
            payload.facilityName = this.payload.facilityName + ' - ' + this.payload.accountID.slice(-4);
            payload.numberOfLoans = this.payload.numOfLoans;
            payload.outstandingBalance = CommonUtilities.formatCurrencyWithCommas(this.payload.currentOutstandingBalanceAmount, false, this.payload.currentOutstandingBalanceCurrency);
            payload.maturityDate = this.getFormattedDate(this.payload.currentMaturityDate);
            payload.contentType = "pdf";
            payload.loanDetails = [];
            plans = this.payload.requestDetails;
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
        },
        downloadPageDoc: function(fileUrl) {
            var data = {
                "url": fileUrl
            };
            CommonUtilities.downloadFile(data);
        },
        print: function() {
            var navMan = applicationManager.getNavigationManager();
            navMan.navigateTo({
                "appName": "ArrangementsMA",
                "friendlyName": "MortgageServicesUIModule/frmPrintAcknowledge"
            });
        },
        setUpFormData: function() {
            var orientationHandler = new OrientationHandler();
            if (kony.application.getCurrentBreakpoint() === 640 ||kony.os.deviceInfo().screenWidth <= 640|| orientationHandler.isMobile) {
                this.view.formTemplate66.flxPageFooter.flxAcknowledgeFooter.flxLoanPlanDetails.segLoanPlanDetails.widgetDataMap = {
                    "flxDropdown": "flxDropdown",
                    "lblChevron": "lblChevron",
                    "lblLoanName": "lblLoanName",
                    "flxHead": "flxHead",
                    "lblRepaymentDay1": "lblRepaymentDay1",
                    "lblRepaymentDayCV": "lblRepaymentDayCV",
                    "lblPaymentFrequency": "lblPaymentFrequency",
                    "lblPaymentFrequencyNV": "lblPaymentFrequencyNV"
                };
                this.setDataForMobile();
                this.view.formTemplate66.flxPageFooter.flxAcknowledgeFooter.flxLoanPlanDetails.segLoanPlanDetails.setData(this.dataObj.segDataMB);
            } else {
                this.view.formTemplate66.flxPageFooter.flxAcknowledgeFooter.flxLoanPlanDetails.segLoanPlanDetails.widgetDataMap = {
                    "flxContent": "flxContent",
                    "flxSeperator": "flxSeperator",
                    "lblLoans": "lblLoans",
                     "lblLoanNameAccessibility":"lblLoanNameAccessibility",
                    "lblRepaymentDayNVAccessibility":"lblRepaymentDayNVAccessibility",
                    "lblNextInstallmentAccessibility":"lblNextInstallmentAccessibility",
                    "lblRepaymentDayNew": "lblRepaymentDayNew",
                    "lblNextInstallment": "lblNextInstallment",
                    "lblLoanName": "lblLoanName",
                    "lblRepaymentDayNV": "lblRepaymentDayNV"
                };
                this.view.formTemplate66.flxPageFooter.flxAcknowledgeFooter.flxLoanPlanDetails.segLoanPlanDetails.setData(this.dataObj.segData);
                var segData=this.view.formTemplate66.flxPageFooter.flxAcknowledgeFooter.flxLoanPlanDetails.segLoanPlanDetails.data;
               
                    for(var i=0;i<segData.length;i++){
					
						                        if(kony.os.deviceInfo().screenHeight<400 && kony.os.deviceInfo().screenWidth<=1024){

                            segData[i][0].lblRepaymentDayNew.left="0dp";
                            segData[i][0].lblNextInstallment.left="0dp";
                        }
                        if(kony.os.deviceInfo().screenWidth>1024){
                            segData[i][0].lblRepaymentDayNew.left="0dp";
                            segData[i][0].lblNextInstallment.left="0dp";
                        }
                    for(var j=0;j<segData[i][1].length;j++){
                        segData[i][1][j]["lblLoanNameAccessibility"]={
                            "text":"Loans "+segData[i][1][j].lblLoanName,
                            "isVisible":true
                        }
						segData[i][1][j]["lblRepaymentDayNVAccessibility"]={
                            "text":"New Repayment Day "+segData[i][1][j].lblRepaymentDayNV.text,
                            "isVisible":true
                        }
                        segData[i][1][j]["lblNextInstallmentAccessibility"]={
                            "text":"Payment Frequency "+segData[i][1][j].lblNextInstallment.text,
                            "isVisible":true
                        }
						                        if(kony.os.deviceInfo().screenHeight<400 && kony.os.deviceInfo().screenWidth<=1024){
                            segData[i][1][j].lblLoanName.left="15dp";
                            segData[i][1][j].lblRepaymentDayNV.left="0dp";
                            segData[i][1][j].lblNextInstallment.left="0dp";
                        }
                        if(kony.os.deviceInfo().screenWidth>1024){
                            segData[i][1][j].lblLoanName.left="15dp";
                            segData[i][1][j].lblRepaymentDayNV.left="0dp";
                            segData[i][1][j].lblNextInstallment.left="0dp";
                        }
                    }
                }
                this.view.formTemplate66.flxPageFooter.flxAcknowledgeFooter.flxLoanPlanDetails.segLoanPlanDetails.setData(segData);
            }
            this.view.formTemplate66.flxContentTCRight.flxRight.flxFacilityDetails.flxFacilityContent.lblFacilityNameVal.text = this.dataObj.accountName;
            this.view.formTemplate66.flxContentTCRight.flxRight.flxFacilityDetails.flxFacilityContent.lblNoOfLoansVal.text = this.dataObj.noOfLoans;
            this.view.formTemplate66.flxContentTCRight.flxRight.flxFacilityDetails.flxFacilityContent.lblCurrentMaturityDateVal.text = this.dataObj.maturityDate;
            this.view.formTemplate66.flxContentTCRight.flxRight.flxFacilityDetails.flxFacilityContent.lblCurrentOutstandingBalVal.text = this.dataObj.outstandingBalance;
            this.view.formTemplate66.flxContentTCRight.flxRight.flxFacilityDetails.flxFacilityContent.lblCurrentOutstandingBal.text = kony.i18n.getLocalizedString("i18n.TransfersEur.OutstandingBalance")+ ":";
            // kony.application.dismissLoadingScreen();
        },
        setDataForMobile: function() {
            mortgagePlans = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountServicesUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.mortgagePlans;
            this.dataObj.segDataMB = [];
            scopeObj = this;
            mortgagePlans.forEach(function(plan, i) {
                var dataObjMb = [];
                dataObjMb[0] = {
                    template: "flxLoanDetailsMobile",
                    flxDropdown: {
                        isVisible: true,
                        "onClick": function(eventobject, context) {
                            scopeObj.showOrHideAccountRows(context);
                        }.bind(this)
                    },
                    lblChevron: {
                        text: "O"
                    },
                     
                    lblLoanName: {
                        text: plan.accountName + '-' + plan.accountID.substr(-4)
                    }
                }
                dataObjMb[1] = [{
                    template: "flxLoanDetailsRowMobile",
                    flxHead: {
                        isVisible: false
                    },
                    lblRepaymentDay1: {
                        text: "New Repayment Day"
                    },
                    lblRepaymentDayCV: {
                        text: scopeObj.ordinalDays[String(scopeObj.dataObj.selectedDay)]
                    },
                    lblPaymentFrequencyNV: {
                        text: "Monthly"
                    },
                    lblPaymentFrequency: {
                        text: "Payment Frequency"
                    }
                }]
                scopeObj.dataObj.segDataMB.push(dataObjMb)
            })
        },
        showOrHideAccountRows: function(context) {
            var section = context.sectionIndex;
            var segData = this.view.formTemplate66.flxPageFooter.flxAcknowledgeFooter.flxLoanPlanDetails.segLoanPlanDetails.data;
            var isRowVisible = true;
            var dataLength;
            var i;
            var height;
            if (segData[section][0].lblChevron.text === "O") {
                segData[section][0]["lblChevron"] = {
                    text: "P"
                };
                isRowVisible = true;
            } else {
                segData[section][0]["lblChevron"] = {
                    text: "O"
                };
                isRowVisible = false;
            }
            dataLength = segData[section][1].length;
            for (var i = 0; i < dataLength; i++) {
                var flxHead = JSON.parse(JSON.stringify(segData[section][1][i].flxHead));
                flxHead["isVisible"] = isRowVisible;
                this.updateKeyAt("flxHead", flxHead, i, section);
            }
            segData = this.view.formTemplate66.flxPageFooter.flxAcknowledgeFooter.flxLoanPlanDetails.segLoanPlanDetails.data;
            this.view.formTemplate66.flxPageFooter.flxAcknowledgeFooter.flxLoanPlanDetails.segLoanPlanDetails.setSectionAt(segData[section], section);
            this.view.forceLayout();
        },
        updateKeyAt: function(widgetName, value, row, section) {
            var data = this.view.formTemplate66.flxPageFooter.flxAcknowledgeFooter.flxLoanPlanDetails.segLoanPlanDetails.data;
            var rowDataTobeUpdated = data[section][1][row];
            rowDataTobeUpdated[widgetName] = value;
            this.view.formTemplate66.flxPageFooter.flxAcknowledgeFooter.flxLoanPlanDetails.segLoanPlanDetails.setDataAt(rowDataTobeUpdated, row, section);
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
        getFormattedDate: function(date) {
            if (date.indexOf("-") == "-1") {
                var newDate = date.substr(0, 4) + "-" + date.substr(4, 2) + "-" + date.substr(6, 2);
                return CommonUtilities.getFrontendDateString(newDate);
            } else {
                return CommonUtilities.getFrontendDateString(date);
            }
        },
        resetUI: function() {
            this.view.formTemplate66.flxPageFooter.flxAcknowledgeFooter.flxLoanPlanDetails.isVisible = true;
            this.view.formTemplate66.flxContentTCLeft.flxLeft.flxLeftContent.lblReferenceID.isVisible = true;
            this.view.formTemplate66.flxContentTCLeft.flxLeft.flxLeftContent.lblReferenceValue.isVisible = true;
            this.view.formTemplate66.flxContentTCLeft.flxLeft.flxLeftContent.imgGreenTick.src = "confirmation_tick.png";
            this.view.formTemplate66.flxContentTCLeft.flxLeft.flxLeftContent.flxMsg.lblMsg.text = "You have successfully submitted the change repayment day request";
        },
        showErrorScreen: function(error) {
            this.view.formTemplate66.flxPageFooter.flxAcknowledgeFooter.flxLoanPlanDetails.isVisible = false;
            this.view.formTemplate66.flxContentTCLeft.flxLeft.flxLeftContent.lblReferenceID.isVisible = false;
            this.view.formTemplate66.flxContentTCLeft.flxLeft.flxLeftContent.lblReferenceValue.isVisible = false;
            this.view.formTemplate66.flxContentTCLeft.flxLeft.flxLeftContent.imgGreenTick.src = "failed_icon.png";
            this.view.formTemplate66.flxContentTCLeft.flxLeft.flxLeftContent.flxMsg.lblMsg.text = "Failed to Capture the Service Request, Try again later"; // error.errorMessage || "";
            this.view.forceLayout();
        }
    }
});