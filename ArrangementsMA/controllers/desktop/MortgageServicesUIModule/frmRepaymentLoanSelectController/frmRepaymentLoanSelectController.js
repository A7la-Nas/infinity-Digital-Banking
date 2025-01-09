define("ArrangementsMA/MortgageServicesUIModule/userfrmRepaymentLoanSelectController", ['CommonUtilities', 'ViewConstants', 'FormControllerUtility', 'OLBConstants', 'CampaignUtility'], function(CommonUtilities, ViewConstants, FormControllerUtility, OLBConstants, CampaignUtility) {
    //Type your controller code here 
    var orientationHandler = new OrientationHandler();
    var currencyCode = "";
    var mortgageAccDetails = [];
    var selectedData = [];
    return {
        
        preShow: function() {
            var navMan = applicationManager.getNavigationManager();
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoan.flxSegLoan.setVisibility(false);
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
            mortgageAccDetails = [];
            for (var i =0;i<mortgagePlans.length;i++){
                loanAccount = mortgagePlans[i];
                details = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "AccountsUIModule",
                    "appName": "ArrangementsMA"
                }).presentationController.showMortgageAccountDetails(loanAccount);
            }
            var formTemplateContext = {
                "sessionTimeOut": {
                    "timer": 4
                },
                "breadCrumbBack": {
                    "flag": false
                }
            }
            this.view.formTemplate12.setContext(formTemplateContext);
            this.currencyCode = applicationManager.getFormatUtilManager().getCurrencySymbol(currAccount.currencyCode);
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoan.flxButtons.btnSubmit.setEnabled(false);
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoan.flxButtons.btnSubmit.skin = "sknBtnBlockedSSPFFFFFF15Px";
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoan.flxButtons.btnSubmit.onClick = this.showSimulation;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoan.flxButtons.btnCancel.onClick = this.navCancel;
        },

        updateFormUI: function (uiData) {
            if (uiData) {
                if (uiData.showLoadingIndicator) {
                    if (uiData.showLoadingIndicator.status === true) {
                        FormControllerUtility.showProgressBar(this.view)
                    } else {
                        FormControllerUtility.hideProgressBar(this.view)
                    }
                }
                if (uiData.errResponse){
                    errResponse = uiData.errResponse;
                }
                if (uiData.mortgageAccDetails) {
                    mortgageAccDetails.push(uiData.mortgageAccDetails);
                    this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoan.flxSegLoan.setVisibility(true);
                    this.setLoanData(mortgageAccDetails);
                }
            }
        },

        postShow: function() {
            applicationManager.getNavigationManager().applyUpdates(this);
            this.setMobileUI();
        },

        setLoanData: function(loanAccount){
            var scope = this;
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile){
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoan.flxSegLoan.segLoan.rowTemplate = "flxLoanSelectMobile";
            } else if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet){
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoan.flxSegLoan.segLoan.rowTemplate = "flxLoanSelectTablet";
            }
            var dataMap = {
                "flxAmount": "flxAmount",
                "flxBalance": "flxBalance",
                "flxBody": "flxBody",
                "flxContent": "flxContent",
                "flxHeader": "flxHeader",
                "flxInterestRate": "flxInterestRate",
                "flxLoanSelect": "flxLoanSelect",
                "flxMaturityDate": "flxMaturityDate",
                "flxRadioButton": "flxRadioButton",
                "flxSelect": "flxSelect",
                "flxSeparator4": "flxSeparator4",
                "flxSpace": "flxSpace",
                "imgRadioButton": "imgRadioButton",
                "lblAccountName2": "lblAccountName2",
                "lblAmount": "lblAmount",
                "lblAmountValue": "lblAmountValue",
                "lblBalance": "lblBalance",
                "lblBalanceValue": "lblBalanceValue",
                "lblDate": "lblDate",
                "lblDateValue": "lblDateValue",
                "lblRate": "lblRate",
                "lblRateValue": "lblRateValue",
                "lblSelect": "lblSelect",
                "lblSeparator": "lblSeparator",
                "lblSeparator2": "lblSeparator2",
                "lblSeparator3": "lblSeparator3"
            }
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoan.flxSegLoan.segLoan.widgetDataMap = dataMap;
            var data = [];
            if (mortgageAccDetails !== undefined) {
                data = mortgageAccDetails.map(function (res) {
                    return {
                        "lblAccountName2": {
                            "text": res[0].accountName + " - " + res[0].accountID.substr(-4)
                        },
                        "lblSelect": {
                            "left": (kony.application.getCurrentBreakpoint()===1366) ? "73%" : (kony.application.getCurrentBreakpoint()===1024) ? "55%" : "79%"
                        },                        
                        "flxRadioButton": {
                            "onClick": scope.toggleRadioButton,
                            "accessibilityConfig": {
                                "a11yLabel": "Select "+res[0].accountName + " - " + res[0].accountID.substr(-4),
                                "a11yARIA": {  
                                    "tabindex": 0,
                                    "role": "radio",
                                    "aria-checked": false			
                                }  
                            }
                        },
                        "imgRadioButton": {
                            "text": "L"
                        },
                        "lblBalanceValue": {
                            "text": scope.currencyCode + applicationManager.getFormatUtilManager().formatAmount(res[0].outstandingBalance)
                        },
                        "lblAmountValue": {
                            "text": scope.currencyCode + applicationManager.getFormatUtilManager().formatAmount(res[0].nextPaymentAmount)
                        },
                        "lblRateValue": {
                            "text": res[0].interestRate + "%"
                        },
                        "lblDateValue": {
                            "text": scope.getFormattedDate(res[0].maturityDate)
                        }
                    }
                });
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoan.flxSegLoan.segLoan.setData(data);
            }
        },

        showSimulation: function () {
            var navMan = applicationManager.getNavigationManager();
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountServicesUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.repaymentAccount = loanAccount;
            for (var i=0; i<mortgageAccDetails.length; i++){
                if (mortgageAccDetails[i][0].accountName + " - " + mortgageAccDetails[i][0].accountID.substr(-4) === selectedData[0].lblAccountName2.text){
                    mortgageAccDetails = mortgageAccDetails[i]
                }
            }
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountsUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.mortgageAccDetails = mortgageAccDetails;
            navMan.navigateTo({
                "appName": "ArrangementsMA",
                "friendlyName": "MortgageServicesUIModule/frmRepaymentSimulation"
            });
        },

        navCancel: function() {
            var navMan = applicationManager.getNavigationManager();
            navMan.navigateTo({
                "appName": "HomepageMA",
                "friendlyName": "AccountsUIModule/frmDashboard"
            });
        },

        toggleRadioButton: function(){
            var data = this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoan.flxSegLoan.segLoan.data;
            selectedData = this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoan.flxSegLoan.segLoan.selectedRowItems;
            var segRowIndex = 0;
            for (i = 0; i < data.length; i++) {
                if (data[i].lblAccountName2.text === selectedData[0].lblAccountName2.text) {
                    data[i].imgRadioButton.text = "M";
                    data[i].flxRadioButton.accessibilityConfig = {
                        "a11yLabel": "Select "+data[i].lblAccountName2.text,
                        "a11yARIA": {    
                            "tabindex": 0,
                            "role": "radio",           
                            "aria-checked":true
                        }
                    };
                    segRowIndex = i;
                    this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoan.flxButtons.btnSubmit.setEnabled(true);
                    this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoan.flxButtons.btnSubmit.skin = "sknbtnSSPffffff15px0273e3bg";
                } else {
                    data[i].imgRadioButton.text = "L";
                    data[i].flxRadioButton.accessibilityConfig = {
                        "a11yLabel": "Select "+data[i].lblAccountName2.text,
                        "a11yARIA": {
                            "tabindex": 0,
                            "role": "radio",               
                            "aria-checked":false
                        }
                    };                   
                }
            }
            
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoan.flxSegLoan.segLoan.setData(data);
            
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile){
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoan.flxSegLoan.segLoan.setActive(segRowIndex, -1,"flxLoanSelectMobile.flxContent.flxHeader.flxSelect.flxRadioButton");
            } else if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet){
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoan.flxSegLoan.segLoan.setActive(segRowIndex, -1,"flxLoanSelectTablet.flxContent.flxHeader.flxSelect.flxRadioButton");
            }else if(kony.application.getCurrentBreakpoint() === 1366){
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoan.flxSegLoan.segLoan.setActive(segRowIndex, -1,"flxLoanSelect.flxContent.flxHeader.flxSelect.flxRadioButton");
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

        setMobileUI: function(){
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile){
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxLoan.flxButtons.height = "100dp";
            }
        }
    }
});