define("ArrangementsMA/MortgageServicesUIModule/userfrmPartialRepaymentPaymentDetailsController", ['CommonUtilities', 'ViewConstants', 'FormControllerUtility', 'OLBConstants', 'CampaignUtility'], function (CommonUtilities, ViewConstants, FormControllerUtility, OLBConstants, CampaignUtility) {
    //Type your controller code here
    var orientationHandler = new OrientationHandler();
    return {
        payload: {},
        frmPreShow: function () {
            var navMan = applicationManager.getNavigationManager();
            this.payload = navMan.getCustomInfo("frmPartialRepaymentPaymentDetails");
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
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountsUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.getBankDate();
            var formTemplateContext = {
                "sessionTimeOut": {
                    "timer": 4
                },
                "breadCrumbBack": {
                    "flag": false
                }
            }
            this.view.formTemplate12.setContext(formTemplateContext);
            if (orientationHandler.isMobile) {
                this.view.formTemplate12.flxContentTCCenter.parent.parent.parent.parent.flxMain.flxPageTitleMain.isVisible = false;
                this.view.formTemplate12.flxContentTCCenter.flxMainContent.top = "20dp";
                this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxButtons.height = "200dp";
                this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxButtons.left = "10dp";
                this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxButtons.btnContinue.width = "100%";
                this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxButtons.btnBack.width = "100%";
                this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxButtons.btnCancel.width = "100%";
                this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxButtons.btnCancel.right = "0dp";
                this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxButtons.btnContinue.right = "0dp";
                this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxButtons.btnBack.right = "0dp";
                this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxButtons.btnBack.top = "70dp";
                this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxButtons.btnCancel.top = "130dp";
            }
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxDocumentContainer.flxSuppDocContainer.flxImgSupportInfo.onClick = function () {
                scope.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxDocumentContainer.flxSuppDocInfo.isVisible = true;
                scope.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxDocumentContainer.flxSuppDocInfo.lblAttachmentRules.setActive(true);
                if (orientationHandler.isMobile) {
                    scope.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxDocumentContainer.flxSuppDocInfo.lblSuppDocInfo.skin = "ICSknBBLabelSSP42424213px";
                }
                if (kony.application.getCurrentBreakpoint() > 1366) {
                    scope.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxDocumentContainer.flxSuppDocInfo.lblSuppDocInfo.skin = "ICSknBBLabelSSP42424213px";
                }
            }
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxDocumentContainer.flxSuppDocInfo.flxClose.onClick = function () {
                scope.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxDocumentContainer.flxSuppDocInfo.isVisible = false;
                scope.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxDocumentContainer.flxSuppDocContainer.flxImgSupportInfo.setActive(true);
            }
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxButtons.btnContinue.onClick = this.navConfirmPayment;
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxButtons.btnCancel.onClick = this.backToDashboard;
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxButtons.btnBack.onClick = this.navBack;
            this.onBreakpointChange();
            this.dataMapping();
            this.renderCalendars();
            this.setDataForUploadFileComp();
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.CalPayOn.onSelection = this.onCalenderSelect;
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxButtons.btnContinue.setEnabled(false);
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxButtons.btnContinue.skin = "sknBtnBlockedSSPFFFFFF15Px";
            // this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.tbxFromAccount.onKeyUp = CommonUtilities.debounce(self.onKeyUpFrom.bind(self), OLBConstants.FUNCTION_WAIT, false);
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.tbxFromAccount.onBeginEditing = function () {
                scope.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.tbxFromAccount.accessibilityConfig = {
                    "a11yARIA": {
                        "aria-autocomplete": "list",
                        "aria-expanded": true,
                        "role": "combobox",
                        "aria-controls": (scope.view.formTemplate12.flxContentTCCenter.flxSegAccountsContainer.isVisible) ? "flxSegAccountsContainer" : "flxFromAccount",
                        "tabindex": 0,
                        "aria-labelledby": "lblFromAccount"
                    }
                };
                scope.view.formTemplate12.flxContentTCCenter.flxFromAccount.accessibilityConfig = {
                    "a11yARIA": {
                        "tabindex": -1
                    }
                };
                scope.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.lblAccountBalance.text = "";
                if (scope.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.tbxFromAccount.text === "") {
                    scope.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.flxSegAccountsContainer.isVisible = true;
                    scope.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.flxSegAccountsContainer.segAccounts.setData(scope.segData);
                } else {
                    scope.searchAccount();
                }
            }
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.tbxFromAccount.onKeyUp = this.searchAccount;
            //this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.flxSegAccountsContainer.segAccounts.onRowClick = this.onAccountSelection.bind(this, this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.flxSegAccountsContainer.segAccounts.selectedRowItems);
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxErrorContainer.flxErrorClose.onClick = function () {
                scope.view.formTemplate12.flxContentTCCenter.flxMainContent.flxErrorContainer.isVisible = false;
            }
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxErrorContainer.isVisible = false;
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxError.isVisible = false;
        },
        postShow: function () {
            var scopeObj = this;
            applicationManager.getNavigationManager().applyUpdates(this);
            this.setFacilityDetails();
            this.setLoanDetails();
            this.setPaymentDetails();
            this.setDataBasedonFlowType();
            this.view.formTemplate12.flxContentTCCenter.tbxFromAccount.accessibilityConfig = {
                "a11yARIA": {
                    "aria-autocomplete": "list",
                    "aria-expanded": false,
                    "role": "combobox",
                    "aria-controls": (this.view.formTemplate12.flxContentTCCenter.flxSegAccountsContainer.isVisible) ? "flxSegAccountsContainer" : "flxFromAccount",
                    "tabindex": 0
                }
            };
            this.view.formTemplate12.flxContentTCCenter.flxFromAccount.onClick = function () {
                scopeObj.view.formTemplate12.flxContentTCCenter.tbxFromAccount.isVisible ? scopeObj.view.formTemplate12.flxContentTCCenter.tbxFromAccount.setActive(true) : null;
            }.bind(this);
            /*this.view.formTemplate12.flxContentTCCenter.flxFromAccount.onKeyPress = function (eventObject, eventPayload) {
                if (eventPayload.keyCode === 27) {
                    scopeObj.view.formTemplate12.flxContentTCCenter.flxSegAccountsContainer.setVisibility(false);
                    scopeObj.view.formTemplate12.flxContentTCCenter.flxFromAccount.setActive(true);
                    scopeObj.view.formTemplate12.flxContentTCCenter.flxFromAccount.accessibilityConfig = {
                        "a11yLabel": "From account. Click to select an account.",
                        "a11yARIA": {
                            "aria-autocomplete": "list",
                            "aria-expanded": false,
                            "role": "combobox",
                            "aria-controls": "tbxFromAccount",
                            "tabindex": -1
                        }
                    };
                }
            };*/
            this.view.formTemplate12.flxContentTCCenter.lblAccountBalance.accessibilityConfig = {                
                "a11yHidden": true
            }
            this.view.formTemplate12.flxContentTCCenter.flxSuppDocInfo.onKeyPress = this.flxSuppDocInfoOnKeyPress;
            this.view.formTemplate12.flxContentTCCenter.flxClose.onKeyPress = this.flxCloseOnKeyPress;
            this.view.formTemplate12.flxContentTCCenter.tbxFromAccount.onKeyPress = this.tbxFromAccountOnKeyPress;
        },
        tbxFromAccountOnKeyPress: function (eventObject, eventPayload) {
            var scope = this;
            if (eventPayload.keyCode === 27) {
                scope.view.formTemplate12.flxContentTCCenter.flxSegAccountsContainer.setVisibility(false);
                eventPayload.preventDefault();
                scope.view.formTemplate12.flxContentTCCenter.flxFromAccount.accessibilityConfig = {
                    "a11yLabel": "From account. Click to select an account.",
                    "a11yARIA": {
                        "aria-autocomplete": "list",
                        "aria-expanded": false,
                        "role": "combobox",
                        "tabindex": 0
                    }
                };
                scope.view.formTemplate12.flxContentTCCenter.tbxFromAccount.accessibilityConfig = {
                    "a11yHidden": true,
                    "a11yARIA": {
                        "tabindex": -1
                    }
                };
                scope.view.formTemplate12.flxContentTCCenter.flxFromAccount.setActive(true);
            }
            else if (eventPayload.keyCode === 9 && eventPayload.shiftKey) {
                scope.view.formTemplate12.flxContentTCCenter.flxSegAccountsContainer.setVisibility(false);
            }
        },
        flxSuppDocInfoOnKeyPress: function (eventObject, eventPayload) {
            var scope = this;
            if (eventPayload.keyCode === 27) {
                scope.view.formTemplate12.flxContentTCCenter.flxSuppDocInfo.setVisibility(false);
                eventPayload.preventDefault();
                scope.view.formTemplate12.flxContentTCCenter.flxImgSupportInfo.setActive(true);
            }
            else if (eventPayload.keyCode === 9 && eventPayload.shiftKey) {
                scope.view.formTemplate12.flxContentTCCenter.flxSuppDocInfo.setVisibility(false);
                eventPayload.preventDefault();
                scope.view.formTemplate12.flxContentTCCenter.flxImgSupportInfo.setActive(true);
            }
        },
        flxCloseOnKeyPress: function (eventObject, eventPayload) {
            var scope = this;
            if (eventPayload.keyCode === 27) {
                scope.view.formTemplate12.flxContentTCCenter.flxSuppDocInfo.setVisibility(false);
                eventPayload.preventDefault();
                scope.view.formTemplate12.flxContentTCCenter.flxImgSupportInfo.setActive(true);
            }
            else if (eventPayload.keyCode === 9 && eventPayload.shiftKey) {
                scope.view.formTemplate12.flxContentTCCenter.flxSuppDocInfo.setVisibility(false);
                eventPayload.preventDefault();
                scope.view.formTemplate12.flxContentTCCenter.flxImgSupportInfo.setActive(true);
            }
            else if (eventPayload.keyCode === 9) {
                scope.view.formTemplate12.flxContentTCCenter.flxSuppDocInfo.setVisibility(false);
            }
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
                if (uiData.errorMessage) {
                    this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxErrorContainer.isVisible = true;
                    this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxErrorContainer.lblErrorMsg.text = uiData.errorMessage.dbpErrMsg
                }
                if (uiData.error) {
                    this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxError.isVisible = true;
                    this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxError.lblError.text = "Failed to upload the documents, please try again.";
                }
                if (uiData.bankDate) {
                    bankDateObj = uiData.bankDate;
                    this.setBankDate(bankDateObj);
                }
            }
        },
        setBankDate: function (bankDateObj) {
            var scopeObj = this;
            if (this.selectedNote === undefined) {
                var bankDate = bankDateObj.currentWorkingDate || CommonUtilities.getServerDate();
                scopeObj.disableOldDaySelection(scopeObj.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.CalPayOn, bankDate);
            } else {
                var bankDate = this.selectedNote.Date;
                var today = new Date(bankDate);
                scopeObj.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.CalPayOn.dateComponents = [today.getDate(), today.getMonth() + 1, today.getFullYear()];
            }
        },
        disableOldDaySelection: function (widgetId, bankDate) {
            var numberOfYearsAllowed = OLBConstants.CALENDAR_ALLOWED_FUTURE_YEARS;
            var today = new Date(bankDate);
            var futureDate = new Date(today.getTime() + (1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 365 /*days*/ * numberOfYearsAllowed));
            widgetId.enableRangeOfDates([today.getDate(), today.getMonth() + 1, today.getFullYear()], [futureDate.getDate(), futureDate.getMonth() + 1, futureDate.getFullYear()], "skn", true);
            widgetId.dateComponents = [today.getDate(), today.getMonth() + 1, today.getFullYear()];
        },
        onBreakpointChange: function () {
        },
        validateFields: function () {
            if (this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.tbxFromAccount.text === "") {
                this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxButtons.btnContinue.setEnabled(false);
                this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxButtons.btnContinue.skin = "sknBtnBlockedSSPFFFFFF15Px";
            } else if (this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.CalPayOn.formattedDate === "") {
                this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxButtons.btnContinue.setEnabled(false);
                this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxButtons.btnContinue.skin = "sknBtnBlockedSSPFFFFFF15Px";
            } else {
                this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxButtons.btnContinue.setEnabled(true);
                this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxButtons.btnContinue.skin = "sknBtnNormalSSPFFFFFF15Px";
            }
        },
        onCalenderSelect: function () {
            var self = this;
            self.validateFields();
        },
        setDataBasedonFlowType: function () {
            var navMan = applicationManager.getNavigationManager();
            var isModifyFlow = navMan.getCustomInfo("accountModifyFlow") ? true : false;
            var self = this;
            if (isModifyFlow) {
                self.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.tbxNote.text = this.selectedNote.Note;
                self.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxButtons.btnContinue.setEnabled(true);
                self.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxButtons.btnContinue.skin = "sknBtnNormalSSPFFFFFF15Px";
            }
            else {
                self.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.tbxNote.text = "";
                self.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.CalPayOn.clear();
                self.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.tbxFromAccount.text = "";
                self.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.lblAccountBalance.text = "";
                self.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxDocumentContainer.uploadFiles3.removeAllDocs();
            }
        },
        setFacilityDetails: function () {
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxFacilityDetails.flxFacilityHeader.flxFacilityContent.lblFacilityNameVal.text = currAccount.accountName + "- " + currAccount.accountID.substr(-4);
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxFacilityDetails.flxFacilityHeader.flxFacilityContent.lblNoOfLoansVal.text = mortgagePlans.length.toString();
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxFacilityDetails.flxFacilityHeader.flxFacilityContent.lblOutstandingBalVal.text = CommonUtilities.formatCurrencyWithCommas(currAccount.outstandingBalance, false, currAccount.currencyCode);
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxFacilityDetails.flxFacilityHeader.flxFacilityContent.lblAmountPaidToDateVal.text = CommonUtilities.formatCurrencyWithCommas(mortgageDetails.totalPaidAmount, false, mortgageDetails.currency);
        },
        setLoanDetails: function () {
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPrimaryLoanDetails.flxPrimaryLoanAccount.lblPrimaryLoanAccount.text = details[0].accountName + " - " + details[0].accountID.substr(-4);
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPrimaryLoanDetails.flxPrimaryLoanHeader.flxLoanDetailsContent.lblRepayDateVal.text = this.payload[1][0].lblCurrRepayDate.text;
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPrimaryLoanDetails.flxPrimaryLoanHeader.flxLoanDetailsContent.lblRepayDateValAccessibility.text = `${this.view.formTemplate12.flxContentTCCenter.lblNextRepayDate.text}, ${this.view.formTemplate12.flxContentTCCenter.lblCurrentValue.text}, ${this.payload[1][0].lblCurrRepayDate.text}`;
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPrimaryLoanDetails.flxPrimaryLoanHeader.flxLoanDetailsContent.lblEndDateVal.text = this.payload[1][0].lblCurrEndDate.text;
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPrimaryLoanDetails.flxPrimaryLoanHeader.flxLoanDetailsContent.lblEndDateValAccessibility.text = `${this.view.formTemplate12.flxContentTCCenter.lblEndDate.text}, ${this.view.formTemplate12.flxContentTCCenter.lblCurrentValue.text}, ${this.payload[1][0].lblCurrEndDate.text}`;
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPrimaryLoanDetails.flxPrimaryLoanHeader.flxLoanDetailsContent.lblEndDateVal1.text = this.payload[1][0].lblSimuEndDate.text;
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPrimaryLoanDetails.flxPrimaryLoanHeader.flxLoanDetailsContent.lblEndDateVal1Accessibility.text = `${this.view.formTemplate12.flxContentTCCenter.lblEndDate.text}, ${this.view.formTemplate12.flxContentTCCenter.lblSimulatedValue.text}, ${this.payload[1][0].lblSimuEndDate.text}`;
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPrimaryLoanDetails.flxPrimaryLoanHeader.flxLoanDetailsContent.lblRepayDateVal1.text = this.payload[1][0].lblSimuRepayDate.text;
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPrimaryLoanDetails.flxPrimaryLoanHeader.flxLoanDetailsContent.lblRepayDateVal1Accessibility.text = `${this.view.formTemplate12.flxContentTCCenter.lblNextRepayDate.text}, ${this.view.formTemplate12.flxContentTCCenter.lblSimulatedValue.text}, ${this.payload[1][0].lblSimuRepayDate.text}`;
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPrimaryLoanDetails.flxPrimaryLoanHeader.flxLoanDetailsContent.lblInstalAmountVal.text = this.payload[1][0].lblCurrAmt.text;
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPrimaryLoanDetails.flxPrimaryLoanHeader.flxLoanDetailsContent.lblInstalAmountValAccessibility.text = `${this.view.formTemplate12.flxContentTCCenter.lblInstalAmount.text}, ${this.view.formTemplate12.flxContentTCCenter.lblCurrentValue.text}, ${this.payload[1][0].lblCurrAmt.text}`;
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPrimaryLoanDetails.flxPrimaryLoanHeader.flxLoanDetailsContent.lblInstalAmountVal1.text = this.payload[1][0].lblSimuAmt.text;
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPrimaryLoanDetails.flxPrimaryLoanHeader.flxLoanDetailsContent.lblInstalAmountVal1Accessibility.text = `${this.view.formTemplate12.flxContentTCCenter.lblInstalAmount.text}, ${this.view.formTemplate12.flxContentTCCenter.lblSimulatedValue.text}, ${this.payload[1][0].lblSimuAmt.text}`;
        },
        setPaymentDetails: function () {
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer1.lblTotalRepaymentAmountVal.text = this.payload[0][0].tbxCurrency.text + this.payload[0][0].tbxAmount.text;
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer1.lblLoanAccountVal.text = "********" + details[0].accountID.substr(-4);
        },
        getFormattedDate: function (date) {
            if (date.indexOf("-") == "-1") {
                var newDate = date.substr(0, 4) + "-" + date.substr(4, 2) + "-" + date.substr(6, 2);
                return CommonUtilities.getFrontendDateString(newDate);
            } else {
                return CommonUtilities.getFrontendDateString(date);
            }
        },
        navConfirmPayment: function () {
            var navMan = applicationManager.getNavigationManager();
            var isModifyFlow = navMan.getCustomInfo("accountModifyFlow") ? true : false;
            if (isModifyFlow) {
                this.amountBalance = CommonUtilities.deFormatAmount(this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContainer3.lblAccountBalance.text);
            } else {
                this.amountBalance = this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.flxSegAccountsContainer.segAccounts.selectedRowItems[0].account.availableBalance;
            }
            if (parseInt(this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer1.lblTotalRepaymentAmountVal.text.substr(1)) < parseInt(this.amountBalance)) {
                this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxErrorContainer.isVisible = false;
                var navMan = applicationManager.getNavigationManager();
                this.selectedNote = {};
                this.selectedNote.Amount = this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer1.lblTotalRepaymentAmountVal.text;
                this.selectedNote.accountList = this.selectedAccount;
                this.selectedNote.loanAccountNumber = this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer1.lblLoanAccountVal.text;
                this.selectedNote.Note = this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.tbxNote.text;
                this.selectedNote.Date = this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.CalPayOn.formattedDate;
                this.selectedNote.currentDate = this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPrimaryLoanDetails.flxPrimaryLoanHeader.flxLoanDetailsContent.lblRepayDateVal.text;
                this.selectedNote.currentEndDate = this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPrimaryLoanDetails.flxPrimaryLoanHeader.flxLoanDetailsContent.lblEndDateVal.text;
                this.selectedNote.simuEndDate = this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPrimaryLoanDetails.flxPrimaryLoanHeader.flxLoanDetailsContent.lblEndDateVal1.text;
                this.selectedNote.simuDate = this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPrimaryLoanDetails.flxPrimaryLoanHeader.flxLoanDetailsContent.lblRepayDateVal1.text;
                this.selectedNote.currVal = this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPrimaryLoanDetails.flxPrimaryLoanHeader.flxLoanDetailsContent.lblInstalAmountVal.text;
                this.selectedNote.simuVal = this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPrimaryLoanDetails.flxPrimaryLoanHeader.flxLoanDetailsContent.lblInstalAmountVal1.text;
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "AccountServicesUIModule",
                    "appName": "ArrangementsMA"
                }).presentationController.repaymentAccount = loanAccount;
                navMan.setCustomInfo("frmConfirmPartialRepayment", this.selectedNote);
                navMan.setCustomInfo("accountModifyFlow", true);
                var data = this.getFormDetails();
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "AccountServicesUIModule",
                    "appName": "ArrangementsMA"
                }).presentationController.formData = this.getFormDetails();
                this.getFileData();
                /*navMan.navigateTo({
                    "appName": "ArrangementsMA",
                    "friendlyName": "MortgageServicesUIModule/frmConfirmPartialRepayment"
                });*/
            } else if (parseInt(this.amountBalance < 0)) {
                this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxErrorContainer.isVisible = true;
                this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxFacilityDetails.top = "20dp";
                this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxButtons.btnContinue.setEnabled(false);
                this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxButtons.btnContinue.skin = "sknBtnBlockedSSPFFFFFF15Px";
            } else {
                this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxErrorContainer.isVisible = true;
                this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxFacilityDetails.top = "20dp";
                this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxButtons.btnContinue.setEnabled(false);
                this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxButtons.btnContinue.skin = "sknBtnBlockedSSPFFFFFF15Px";
            }
            this.view.forceLayout();
        },
        getFormDetails: function () {
            var formDetails = {
                "amount": this.payload[0][0].tbxAmount.text.includes(",") ? this.payload[0][0].tbxAmount.text.replace(",", "") : this.payload[0][0].tbxAmount.text,
                "createWithPaymentId": data.createWithPaymentId,
                "transactionId": "",
                "frequency": "Once",
                "fromAccountNumber": this.selectedAccount.accountID,
                "isScheduled": "0",
                "isOwnAccount": true,
                "frequencyStartDate": this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.CalPayOn.formattedDate,
                "frequencyEndDate": "",
                "scheduledDate": this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.CalPayOn.formattedDate,
                "toAccountNumber": details[0].accountID,
                "paymentType": "",
                "paidBy": "",
                "swiftCode": "",
                "serviceName": "TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE",
                "beneficiaryName": currAccount.MembershipName,
                "beneficiaryNickname": currAccount.MembershipName,
                "transactionsNotes": this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.tbxNote.text,
                "transactionType": "InternalTransfer",
                "transactionCurrency": currAccount.currencyCode,
                "fromAccountCurrency": this.selectedAccount.currencyCode,
                "toAccountCurrency": currAccount.currencyCode,
                "numberOfRecurrences": "",
                "ExternalAccountNumber": "",
                "transactionFlow": "",
                "uploadedattachments": "",
                "deletedDocuments": "",
                "transactionAmount": "",
                "serviceCharge": "",
                "charges": "",
                "totalAmount": "",
                "creditValueDate": "",
                "exchangeRate": ""
            }
            return formDetails;
        },
        backToDashboard: function () {
            var navMan = applicationManager.getNavigationManager();
            navMan.setCustomInfo("accountModifyFlow", false);
            navMan.navigateTo({
                "appName": "HomepageMA",
                "friendlyName": "AccountsUIModule/frmDashboard"
            });
        },
        navBack: function () {
            var navMan = applicationManager.getNavigationManager();
            navMan.navigateTo({
                "appName": "ArrangementsMA",
                "friendlyName": "MortgageServicesUIModule/frmRepaymentSimulation"
            });
        },
        renderCalendars: function () {
            var context1 = {
                "widget": this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.CalPayOn,
                "anchor": "bottom"
            };
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.CalPayOn.setContext(context1);
        },
        setDataForUploadFileComp: function () {
            var isMandatory = true;
            var navMan = applicationManager.getNavigationManager();
            var files = navMan.getCustomInfo("modifyFileData");
            var filesData = [];
            if (kony.sdk.isNullOrUndefined(files)) {
                // filesData = this.getFormattedFileDataForComp(files);
            }
            var config = {
                "selectMultipleFiles": false,
                "filter": ['image/jpeg', 'application/pdf']
            }
            var dataComp = {
                // "title": kony.i18n.getLocalizedString("kony.onboarding.documents.adddocuments"),
                // "description": kony.i18n.getLocalizedString("kony.onboarding.documents.lblUploadDescription.text"),
                // "uploadFilesDocCallback": this.uploadFilesCallback.bind(this, userActionName, false, key, coApplicantKey, isMandatory, applicantType,areMultipleUserActionsPresent),//userActions[key][i].ActionMetaData.Skippable),
                // "fileSelectedCallback": this.fileSelectedCallBack.bind(this, userActionName),
                // "downloadCallback": this.downloadCallback.bind(this),
                "removeFileCallback": this.removeFileCallback.bind(this, isMandatory),
                // "checkEvidenceCallback": this.checkEvidenceCallback.bind(this, isMandatory),
                // "deleteEvidenceCallback": this.deleteEvidenceCallback.bind(this, isMandatory),
                // "removeFileUpdateCallback": this.removeFileUpdateCallback.bind(this, isMandatory),
                // "removeFileDropdownCallback": this.removeFileDropdownCallback.bind(this, isMandatory),
                // "filesData": filesData,
                "config": config,
                // "fulfilmentId": fulfilmentId,
                // "hasUploadState": false
            };
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxDocumentContainer.uploadFiles3.setData(dataComp);
        },
        getFormattedFileDataForComp: function (files) {
            var fileData = [];
            files.forEach(function (file) {
                var fileObject = {
                    "fileObj": {
                        "documentName": file[1]
                    },
                    documentDescription: "file a added",
                    clientDocID: file[2]
                };
                fileData.push(fileObject);
            })
            return fileData;
        },
        removeFileCallback: function (isMandatory, file, uniqueId, removeSuccess, removeFailure, removeSuccessDocument, isUpload, componentParentData) {
            removeSuccess();
            this.view.formTemplate12.flxContentTCCenter.uploadFiles3.attachmentFocus();
        },
        getFileData: function () {
            var browsedFiles = this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxDocumentContainer.uploadFiles3.getData();
            var navMan = applicationManager.getNavigationManager();
            navMan.setCustomInfo("modifyFileData", browsedFiles);
            var attachments = [],
                fileData = {};
            var reader = new FileReader();

            function readFile(index) {
                if (index >= browsedFiles.length) {
                    navMan.setCustomInfo("frmChangeRepaymentAcountCnFileData", attachments);
                    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                        "moduleName": "AccountServicesUIModule",
                        "appName": "ArrangementsMA"
                    }).presentationController.uploadDocuments();
                    if (attachments == 0) {
                        kony.application.dismissLoadingScreen();
                    }
                } else {
                    var newFile = browsedFiles[index];
                    fileData = {};
                    fileData.fileName = newFile[0].name;
                    fileData.fileType = newFile[0].file.type;
                    fileData.fileInfo = newFile[1];
                    fileData.fileClientId = newFile[2];
                    fileData.documentStatus = "Pending";
                    reader.onloadend = function (e) {
                        var base64String = e.target.result;
                        base64String = base64String.replace("data:;base64,", "");
                        base64String = base64String.replace("data:image/png;base64,", "");
                        base64String = base64String.replace("data:application/octet-stream;base64,", "");
                        base64String = base64String.replace("data:image/jpeg;base64,", "");
                        base64String = base64String.replace("data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,", "");
                        base64String = base64String.replace("data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,", "");
                        base64String = base64String.replace("data:application/vnd.ms-excel;base64,", "");
                        fileData.fileContents = base64String.replace("data:application/pdf;base64,", "");
                        attachments.push(fileData);
                        readFile(index + 1);
                    };
                    reader.readAsDataURL(newFile[0].file);
                }
            }
            readFile(0);
        },
        onAccountSelection: function (account) {
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.flxFromAccount.accessibilityConfig = {
                "a11yARIA": {
                    "aria-autocomplete": "list",
                    "aria-expanded": false,
                    "role": "combobox",
                    "tabindex": 0
                },
                "a11yLabel": `From account. Currently selected  ${(account.nickName || account.accountName)}, With balance of ${CommonUtilities.formatCurrencyWithCommas(account.availableBalance, false, account.currencyCode)} Click to select another from account.`
            };
            this.view.formTemplate12.flxContentTCCenter.tbxFromAccount.accessibilityConfig = {
                "a11yHidden": true,
                "a11yARIA": {
                    "tabindex": -1
                }
            };
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.lblAccountBalance.text = CommonUtilities.formatCurrencyWithCommas(account.availableBalance, false, account.currencyCode);
            try{
                this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.tbxFromAccount.text = (account.nickName || account.accountName) + " ...." + account.account_id.slice(-4);
            }
            catch(ex){}
            this.selectedAccount = account;
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.flxSegAccountsContainer.isVisible = false;
            this.validateFields();
            this.view.formTemplate12.flxContentTCCenter.flxFromAccount.setActive(true);
        },
        searchAccount: function () {
            var navObj = applicationManager.getNavigationManager();
            var searchtext = this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.tbxFromAccount.text.toLowerCase();
            if (searchtext) {
                var data = [];
                //var accountList = this.view.formChangeRepaymentAccountNew.flxContentTCCenter.flxContMainNew.flxAccountList.flxAccountContainer.flxSegAccounts.segAccounts.data;
                var accountList = this.segData;
                data = accountList;
                header = [];
                row = [];
                for (var j = 0; j < data.length; j++) {
                    header = data[j][0];
                    for (var i = 0; i < data[j][1].length; i++) {
                        let b = data[j][1][i];
                        row.push(b);
                    }
                }
                //var searchSegmentData = applicationManager.getDataProcessorUtility().commonSectionSegmentSearch("accountName", searchtext, row,header);
                var searchSegmentData = this.searchAccounts("accountName", searchtext, data, header);
                if (searchSegmentData.length > 0) {
                    this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.flxSegAccountsContainer.segAccounts.setData(searchSegmentData);
                    this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.flxSegAccountsContainer.isVisible = true;
                    this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.flxSegAccountsContainer.flxNoResult.isVisible = false;
                    this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.flxSegAccountsContainer.segAccounts.isVisible = true;
                } else {
                    this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.flxSegAccountsContainer.flxNoResult.isVisible = true;
                    this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.flxSegAccountsContainer.segAccounts.isVisible = false;
                    this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.flxSegAccountsContainer.flxNoResult.lblNoResult.text = kony.i18n.getLocalizedString("i18n.maps.NoResultsFound");
                }
            } else {
                if (this.segData !== undefined && this.segData.length > 0) {
                    this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.flxSegAccountsContainer.segAccounts.setData(this.segData);
                    this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.flxSegAccountsContainer.flxNoResult.isVisible = false;
                    this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.flxSegAccountsContainer.segAccounts.isVisible = true;
                    this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.flxSegAccountsContainer.isVisible = true;
                } else {
                    this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.flxSegAccountsContainer.flxNoResult.isVisible = true;
                    this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.flxSegAccountsContainer.segAccounts.isVisible = false;
                    this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.flxSegAccountsContainer.flxNoResult.lblNoResult.text = kony.i18n.getLocalizedString("i18n.konybb.manageUser.noAccountAccess");
                }
            }
        },
        searchAccounts: function (field, searchText, data, headers) {
            var searchdata = [],
                segEachData = [];
            var scopeObj = this;
            for (var i = 0; i < data.length; i++) {
                segEachData = [];
                for (var j = 0; j < data[i][1].length; j++) {
                    if (!kony.sdk.isNullOrUndefined(data[i][1][j][field])) {
                        if (data[i][1][j][field].toLowerCase().indexOf(searchText) >= 0) {
                            segEachData.push(data[i][1][j]);
                        }
                    }
                }
                if (segEachData.length > 0) {
                    var segData = [headers, segEachData];
                    searchdata.push(segData);
                }
            }
            return searchdata;
        },
        dataMapping: function () {
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.flxSegAccountsContainer.segAccounts.widgetDataMap = {
                "lblAccountName": "lblAccountName",
                "lblRoleIcon": "lblRoleIcon",
                "lblFavoriteIcon": "lblFavoriteIcon",
                "imgBankIcon": "imgBankIcon",
                "flxFavorite": "flxFavorite",
                "flxBankIcon": "flxBankIcon",
                "lblBankIcon": "lblBankIcon",
                "lblAccountType": "lblAccountType",
                "lblAvailableBalanceValue": "lblAvailableBalanceValue",
                "lblAvailableBalanceTitle": "lblAvailableBalanceTitle",
                "imgThreeDotIcon": "imgThreeDotIcon",
                "flxMenu": "flxMenu",
                "flxAccountRoleType": "flxAccountRoleType",
                "lblAccountRoleType": "lblAccountRoleType",
                "lblAccountTypeHeader": "lblAccountTypeHeader",
                "flxDropDown": "flxDropDown",
                "lblDropDown": "lblDropDown",
                "lblSeperator": "lblSeperator",
                "lblBottomSeperator": "lblBottomSeperator",
                "lblTopSeperator": "lblTopSeperator",
                "flxPlansRowWrapper": "flxPlansRowWrapper",
                "flxNoResultsFound": "flxNoResultsFound",
                "lblNoResultsFound": "lblNoResultsFound",
                "imgNoResultsFound": "imgNoResultsFound",
                "lblTotalAccountsTitle": "lblTotalAccountsTitle",
                "lblTotalAccountsValue": "lblTotalAccountsValue",
                "lblTotalBalanceTitle": "lblTotalBalanceTitle",
                "lblTotalBalanceValue": "lblTotalBalanceValue",
                "flxRowTotalAccountsGroupBalance": "flxRowTotalAccountsGroupBalance",
                "flxRowTotalAccountsGroupBalanceMobile": "flxRowTotalAccountsGroupBalanceMobile",
                "imgExternalAlert": "imgExternalAlert",
                "lblCurrentBalanceValue": "lblCurrentBalanceValue",
                "lblCurrentBalanceTitle": "lblCurrentBalanceTitle",
                "lblAccountTypeNumber": "lblAccountTypeNumber",
                "flxAvailableBalance": "flxAvailableBalance",
                "flxCurrentBalance": "flxCurrentBalance",
                "account": "account",
                "flxPlansRowTemplate": "flxPlansRowTemplate",
                "flxContent": "flxContent"
            };
            var data = applicationManager.getAccountManager().getInternalAccounts();
            data = data.filter(function (account) {
                return (account.accountType == "Checking" || account.accountType == "CURRENT" || account.accountType == "Savings")
            })
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.flxSegAccountsContainer.segAccounts.setData(data);
            var accountList = (kony.sdk.isNullOrUndefined(accounts) || accounts.constructor !== Array) ? [] : accounts;
            this.accounts = accountList;
            this.segData = this.getDataWithAccountTypeSections(data);
            scope = this;
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.flxSegAccountsContainer.segAccounts.setData(scope.segData);
        },
        getDataWithAccountTypeSections: function (accounts) {
            var scopeObj = this;
            var finalData = {};
            var isCombinedUser = applicationManager.getConfigurationManager().getConfigurationValue('isCombinedUser') === "true";
            var prioritizeAccountTypes = applicationManager.getTypeManager().getAccountTypesByPriority();
            accounts.forEach(function (account) {
                var accountType = applicationManager.getTypeManager().getAccountType(account.accountType);
                if (finalData.hasOwnProperty(accountType)) {
                    finalData[accountType][1].push(scopeObj.createAllAccountSegmentsModel(account, accounts.length));
                    var totalAccount = finalData[accountType][1].length;
                    finalData[accountType][0].lblAccountTypeNumber = {
                        "text": "(" + totalAccount + ")"
                    }
                } else {
                    finalData[accountType] = [{
                        lblAccountTypeHeader: {
                            "text": applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) != undefined ? applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) : accountType + " " + kony.i18n.getLocalizedString("i18n.topmenu.accounts"),
                            "accessibilityConfig": {
                                "a11yLabel": applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) != undefined ? applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) : accountType + " " + kony.i18n.getLocalizedString("i18n.topmenu.accounts")
                            },
                            "left": "8px"
                        },
                        lblAccountRoleType: {
                            "isVisible": false
                        },
                        lblDropDown: {
                            "text": ViewConstants.FONT_ICONS.CHEVRON_UP,
                            "accessibilityConfig": {
                                "a1yHidden": true
                            },
                        },
                        lblTopSeperator: {
                            "isVisible": true
                        },
                        lblBottomSeperator: {
                            "isVisible": true
                        },
                        template: "flxAcctSectionHeader",
                        flxDropDown: {
                            "onClick": function (eventobject, context) {
                                scopeObj.showOrHideAccountRows(context);
                            }.bind(this),
                            "accessibilityConfig": {
                                "a11yARIA": {
                                    "role": "button",
                                    "aria-expanded": true,
                                    "aria-labelledby": "lblAccountTypeHeader",
                                    "tabindex": 0
                                }
                            },
                            "onKeyPress": function (eventobject, eventPayload, context) {
                                if (eventPayload.keyCode === 27) {
                                    scopeObj.view.formTemplate12.flxContentTCCenter.flxSegAccountsContainer.setVisibility(false);
                                    eventPayload.preventDefault();
                                    scopeObj.view.formTemplate12.flxContentTCCenter.flxFromAccount.accessibilityConfig = {
                                        "a11yLabel": "From account. Click to select an account.",
                                        "a11yARIA": {
                                            "aria-autocomplete": "list",
                                            "aria-expanded": false,
                                            "role": "combobox",
                                            "tabindex": 0
                                        }
                                    };
                                    scopeObj.view.formTemplate12.flxContentTCCenter.tbxFromAccount.accessibilityConfig = {
                                        "a11yHidden": true,
                                        "a11yARIA": {
                                            "tabindex": -1
                                        }
                                    };
                                    scopeObj.view.formTemplate12.flxContentTCCenter.flxFromAccount.setActive(true);
                                }
                                else if (eventPayload.keyCode === 9 && eventPayload.shiftKey) {
                                    scopeObj.view.formTemplate12.flxContentTCCenter.flxSegAccountsContainer.setVisibility(false);
                                    eventPayload.preventDefault();
                                    scopeObj.view.formTemplate12.flxContentTCCenter.flxFromAccount.accessibilityConfig = {
                                        "a11yLabel": "From account. Click to select an account.",
                                        "a11yARIA": {
                                            "aria-autocomplete": "list",
                                            "aria-expanded": false,
                                            "role": "combobox",
                                            "tabindex": 0
                                        }
                                    };
                                    scopeObj.view.formTemplate12.flxContentTCCenter.tbxFromAccount.accessibilityConfig = {
                                        "a11yHidden": true,
                                        "a11yARIA": {
                                            "tabindex": -1
                                        }
                                    };
                                    scopeObj.view.formTemplate12.flxContentTCCenter.flxFromAccount.setActive(true);
                                }
                                else if (eventPayload.keyCode === 9 && !eventPayload.shiftKey) {
                                    if (context.rowIndex === context.widgetInfo.data.length - 2 && !context.widgetInfo.data[context.sectionIndex][1][0].flxPlansRowWrapper.isVisible) {
                                        scopeObj.view.formTemplate12.flxContentTCCenter.flxSegAccountsContainer.setVisibility(false);
                                    }
                                }
                            }
                        },
                        flxAccountRoleType: {
                            "isVisible": false
                        },
                        lblAccountTypeNumber: {
                            "text": "(1)"
                        },
                        membershipId: account.Membership_Id
                    },
                    [scopeObj.createAllAccountSegmentsModel(account, accounts.length)]
                    ];
                }
            });
            this.sectionData = [];
            var data = [];
            if (finalData.hasOwnProperty('Investment')) {
                delete finalData['Investment']
            }
            for (var key in prioritizeAccountTypes) {
                var accountType = prioritizeAccountTypes[key];
                if (finalData.hasOwnProperty(accountType)) {
                    data.push(finalData[accountType]);
                    this.sectionData.push(accountType);
                }
            }
            return data;
        },
        createAllAccountSegmentsModel: function (account, accsLen) {
            var scopeObject = this;
            var updatedAccountID;
            var updatedAccountName;
            var accountID = account.accountID;
            var externalaccountID = accountID.substring(accountID.length, accountID.indexOf('-'));
            var isCombinedUser = applicationManager.getConfigurationManager().getConfigurationValue('isCombinedUser') === "true";
            var dualConfiguration = {
                isCurrentBalanceToBeDisplayed: false,
                isAvailableBalanceToBeDisplayed: true
            };
            var modifiedAccountType = account.accountType;
            if (account.accountType === "Savings") {
                account.accountType = kony.i18n.getLocalizedString("i18n.accounts.savings");
            } else if (account.accountType === "Checking") {
                account.accountType = kony.i18n.getLocalizedString("i18n.accounts.checking");
            } else if (account.accountType === "CreditCard") {
                account.accountType = kony.i18n.getLocalizedString("i18n.accounts.creditCard");
            } else if (account.accountType === "CURRENT") {
                account.accountType = kony.i18n.getLocalizedString("i18n.accounts.current");
            } else if (account.accountType === "Deposit") {
                account.accountType = kony.i18n.getLocalizedString("i18n.accounts.deposit");
            } else if (account.accountType === "External") {
                account.accountType = kony.i18n.getLocalizedString("i18n.accounts.external");
            } else if (account.accountType === "Investment") {
                account.accountType = kony.i18n.getLocalizedString("i18n.accounts.investment");
            } else if (account.accountType === "Line Of Credit") {
                account.accountType = kony.i18n.getLocalizedString("i18n.accounts.lineOfCredit");
            } else if (account.accountType === "Loan") {
                account.accountType = kony.i18n.getLocalizedString("i18n.accounts.loan");
            } else if (account.accountType === "Mortgage") {
                account.accountType = kony.i18n.getLocalizedString("i18n.account.mortgage");
            } else if (account.accountType === "Other") {
                account.accountType = kony.i18n.getLocalizedString("i18n.accounts.others");
            }
            if (account.externalIndicator && account.externalIndicator === "true") {
                updatedAccountID = externalaccountID;
            } else {
                updatedAccountID = account.accountID
            }
            if (kony.application.getCurrentBreakpoint() <= 640 && (orientationHandler.isMobile)) {
                var truncatedAccountName = CommonUtilities.getAccountName(account);
                truncatedAccountName = truncatedAccountName.substring(0, 20);
                updatedAccountName = CommonUtilities.mergeAccountNameNumber(truncatedAccountName, updatedAccountID); //account.accountType + " " + 
            } else updatedAccountName = CommonUtilities.mergeAccountNameNumber(account.nickName || account.accountName, updatedAccountID);
            let currentLocale = kony.i18n.getCurrentLocale();
            var getConfigFor = function (accountType) {
                if (scopeObject.accountTypeConfig[accountType]) {
                    return scopeObject.accountTypeConfig[accountType];
                } else {
                    return scopeObject.accountTypeConfig.Default;
                }
            };
            var dataObject = {
                "template": (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) && dualConfiguration.isAvailableBalanceToBeDisplayed && dualConfiguration.isCurrentBalanceToBeDisplayed ? "flxAccountsRowTemplateMobile" : "flxPlansRowTemplate",
                "lblAccountName": {
                    "skin": (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? "sknSSP42424213Px" : "sknSSP42424215Px",
                    "text": updatedAccountName,
                    "accessibilityConfig": {
                        "a11yLabel": updatedAccountName
                    }
                },
                "lblAvailableBalanceValue": {
                    "skin": (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? "sknSSP42424213Px" : "sknlbl424242SSPReg24px",
                    "text": CommonUtilities.formatCurrencyWithCommas(account[getConfigFor(modifiedAccountType).balanceKey], false, account.currencyCode),
                    "accessibilityConfig": {
                        "a11yLabel": CommonUtilities.formatCurrencyWithCommas(account[getConfigFor(modifiedAccountType).balanceKey], false, account.currencyCode)
                    }
                },
                "lblAvailableBalanceTitle": {
                    "isVisible": false,
                    "skin": (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? "sknSSP72727211Px" : "sknSSP72727213Px",
                    "text": kony.i18n.getLocalizedString(getConfigFor(account.accountType).balanceTitle) + String(account.isExternalAccount === true ? ": " + account.availableBalanceUpdatedAt : ""),
                    "accessibilityConfig": {
                        "a11yLabel": kony.i18n.getLocalizedString(getConfigFor(account.accountType).balanceTitle) + String(account.isExternalAccount === true ? ": " + account.availableBalanceUpdatedAt : "")
                    }
                },
                "flxAvailableBalance": {
                    "isVisible": (account.accountType !== OLBConstants.ACCOUNT_TYPE.SAVING && account.accountType !== OLBConstants.ACCOUNT_TYPE.CHECKING) ? true : dualConfiguration.isAvailableBalanceToBeDisplayed
                },
                "flxCurrentBalance": {
                    "isVisible": false
                },
                "lblCurrentBalanceValue": {
                    "isVisible": false
                },
                "lblCurrentBalanceTitle": {
                    "isVisible": (account.accountType === OLBConstants.ACCOUNT_TYPE.SAVING || account.accountType === OLBConstants.ACCOUNT_TYPE.CHECKING) ? true : false
                },
                "onAccountClick": scopeObject.onAccountSelection.bind(scopeObject, account),
                "flxMenu": {
                    "isVisible": false,
                },
                "flxNoResultsFound": {
                    "isVisible": false
                },
                "isNoRecords": false,
                "imgThreeDotIcon": {
                    "isVisible": false,
                },
                "flxPlansRowWrapper": {
                    "isVisible": true,
                },
                "lblSeperator": {
                    "isVisible": true
                },
                "userName": account.userName,
                "bankId": account.bankId,
                "membershipName": account.MembershipName ? account.MembershipName : "",
                "accountName": updatedAccountName,
                "accountType": account.accountType,
                "account": account,
                "accountID": updatedAccountID,
                "accountBalance": account[getConfigFor(account.accountType).balanceKey],
                "currentBalance": account[getConfigFor(account.accountType).currentBalanceKey],
                "currency": account.currencyCode,
                "favouriteStatus": account.favouriteStatus,
                "isError": account.isError,
                "externalIndicator": account.externalIndicator,
                "isExternalAccount": account.isExternalAccount,
                "lblAccountType": {
                    text: (account.accountType === "mortgageFacility") ? kony.i18n.getLocalizedString("i18n.Accounts.displayMortgageFacility") : account.accountType
                },
                "lblAccountTypeHeader": {
                    "text": account.accountRoleType,
                },
                "flxContent": {
                    "onKeyPress": scopeObject.segOnKeyPress,
                    "accessibilityConfig": {
                        "a11yLabel": `Account name ${updatedAccountName}, Account Type ${((account.accountType === "mortgageFacility") ? kony.i18n.getLocalizedString("i18n.Accounts.displayMortgageFacility") : account.accountType)}, Balance Amount ${CommonUtilities.formatCurrencyWithCommas(account[getConfigFor(modifiedAccountType).balanceKey], false, account.currencyCode)}`,
                        "a11yARIA": {
                            "role": "button",
                            "tabindex": 0
                        }
                    }
                }
            };
            return dataObject;
        },

        segOnKeyPress: function (eventObject, eventPayload, context) {
            var scope = this;
            if (eventPayload.keyCode === 27) {
                scope.view.formTemplate12.flxContentTCCenter.flxSegAccountsContainer.setVisibility(false);
                eventPayload.preventDefault();
                scope.view.formTemplate12.flxContentTCCenter.flxFromAccount.accessibilityConfig = {
                    "a11yLabel": "From account. Click to select an account.",
                    "a11yARIA": {
                        "aria-autocomplete": "list",
                        "aria-expanded": false,
                        "role": "combobox",
                        "tabindex": 0
                    }
                };
                scope.view.formTemplate12.flxContentTCCenter.tbxFromAccount.accessibilityConfig = {
                    "a11yHidden": true,
                    "a11yARIA": {
                        "tabindex": -1
                    }
                };
                scope.view.formTemplate12.flxContentTCCenter.flxFromAccount.setActive(true);
            }
            else if (eventPayload.keyCode === 9 && eventPayload.shiftKey && context.widgetInfo.data[0][0].template !== 'flxAcctSectionHeader') {
                eventPayload.preventDefault();
                if (context.rowIndex === 0 && context.sectionIndex === 0) {
                    scope.view.formTemplate12.flxContentTCCenter.flxSegAccountsContainer.setVisibility(false);
                    scope.view.formTemplate12.flxContentTCCenter.flxFromAccount.accessibilityConfig = {
                        "a11yLabel": "From account. Click to select an account.",
                        "a11yARIA": {
                            "aria-autocomplete": "list",
                            "aria-expanded": false,
                            "role": "combobox",
                            "tabindex": 0
                        }
                    };
                    scope.view.formTemplate12.flxContentTCCenter.tbxFromAccount.accessibilityConfig = {
                        "a11yHidden": true,
                        "a11yARIA": {
                            "tabindex": -1
                        }
                    };
                    scope.view.formTemplate12.flxContentTCCenter.flxFromAccount.setActive(true);
                }
            }
            else if (eventPayload.keyCode === 9 && !eventPayload.shiftKey) {
                if (context.rowIndex === 0 && context.sectionIndex === 0) {
                    scope.view.formTemplate12.flxContentTCCenter.flxSegAccountsContainer.setVisibility(false);
                }
            }
        },

        showOrHideAccountRows: function (context) {
            var section = context.sectionIndex;
            var segData = this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.flxSegAccountsContainer.segAccounts.data;
            var isRowVisible = true;
            var dataLength;
            var i;
            var height;
            if (segData[section][0].lblDropDown.text === "O") {
                segData[section][0]["lblDropDown"] = {
                    text: "P"
                };
                segData[section][0]["lblDropDown"].accessibilityConfig = {
                    "a11yHidden": true,
                }
                segData[section][0]["flxDropDown"].accessibilityConfig = {
                    "a11yARIA": {
                        "role": "button",
                        "aria-labelledby": "lblAccountTypeHeader",
                        "aria-expanded": true,
                        "tabindex": 0
                    }
                }
                isRowVisible = true;
            } else {
                segData[section][0]["lblDropDown"] = {
                    text: "O"
                };
                segData[section][0]["lblDropDown"].accessibilityConfig = {
                    "a11yHidden": true,
                }
                segData[section][0]["flxDropDown"].accessibilityConfig = {
                    "a11yARIA": {
                        "role": "button",
                        "aria-labelledby": "lblAccountTypeHeader",
                        "aria-expanded": false,
                        "tabindex": 0
                    }
                }
                isRowVisible = false;
            }
            dataLength = segData[section][1].length;
            for (var i = 0; i < dataLength; i++) {
                if (segData[section][1][i].isNoRecords) {
                    var flxNoResultsFound = JSON.parse(JSON.stringify(segData[section][1][i].flxNoResultsFound));
                    flxNoResultsFound["isVisible"] = isRowVisible;
                    this.updateKeyAt("flxNoResultsFound", flxNoResultsFound, i, section);
                } else {
                    var flxPlansRowWrapper = JSON.parse(JSON.stringify(segData[section][1][i].flxPlansRowWrapper));
                    flxPlansRowWrapper["isVisible"] = isRowVisible;
                    this.updateKeyAt("flxPlansRowWrapper", flxPlansRowWrapper, i, section);
                }
            }
            segData[section][0]["lblBottomSeperator"] = {
                isVisible: isRowVisible
            };
            segData = this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.flxSegAccountsContainer.segAccounts.data;
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.flxSegAccountsContainer.segAccounts.setSectionAt(segData[section], section);
            this.view.formTemplate12.flxContentTCCenter.segAccounts.setActive(-1, section, "flxAcctSectionHeader.flxHeaderWrapper.flxDropDown");
            this.view.forceLayout();
        },
        updateKeyAt: function (widgetName, value, row, section) {
            var data = this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.flxSegAccountsContainer.segAccounts.data
            var rowDataTobeUpdated = data[section][1][row];
            rowDataTobeUpdated[widgetName] = value;
            this.view.formTemplate12.flxContentTCCenter.flxMainContent.flxPaymentDetailsContainer.flxPaymentDetailsContent.flxPaymentDetailsContainer3.flxSegAccountsContainer.segAccounts.setDataAt(rowDataTobeUpdated, row, section);
        },
        accountTypeConfig: (function () {
            var accountTypeConfig = {};
            var ApplicationManager = require('ApplicationManager');
            applicationManager = ApplicationManager.getApplicationManager();
            accountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.SAVING)] = {
                sideImage: ViewConstants.SIDEBAR_TURQUOISE,
                sideSkin: ViewConstants.SKINS.SAVINGS_SIDE_BAR,
                balanceKey: 'availableBalance',
                balanceTitle: 'i18n.accounts.availableBalance',
                currentBalanceKey: 'currentBalance',
                currentBalanceTitle: 'i18n.accounts.currentBalance'
            },
                accountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.CHECKING)] = {
                    sideImage: ViewConstants.SIDEBAR_PURPLE,
                    sideSkin: ViewConstants.SKINS.CHECKINGS_SIDE_BAR,
                    balanceKey: 'availableBalance',
                    balanceTitle: 'i18n.accounts.availableBalance',
                    currentBalanceKey: 'currentBalance',
                    currentBalanceTitle: 'i18n.accounts.currentBalance'
                },
                accountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.CREDITCARD)] = {
                    sideImage: ViewConstants.SIDEBAR_YELLOW,
                    sideSkin: ViewConstants.SKINS.CREDIT_CARD_SIDE_BAR,
                    balanceKey: 'currentBalance',
                    balanceTitle: 'i18n.accountDetail.availableCredit'
                },
                accountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.DEPOSIT)] = {
                    sideImage: ViewConstants.SIDEBAR_BLUE,
                    sideSkin: ViewConstants.SKINS.DEPOSIT_SIDE_BAR,
                    balanceKey: 'currentBalance',
                    balanceTitle: 'i18n.accounts.currentBalance'
                },
                accountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.MORTGAGE)] = {
                    sideImage: ViewConstants.SIDEBAR_BROWN,
                    sideSkin: ViewConstants.SKINS.MORTGAGE_CARD_SIDE_BAR,
                    balanceKey: 'outstandingBalance',
                    balanceTitle: 'i18n.accounts.outstandingBalance'
                },
                accountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.LOAN)] = {
                    sideImage: ViewConstants.SIDEBAR_BROWN,
                    sideSkin: ViewConstants.SKINS.LOAN_SIDE_BAR,
                    balanceKey: 'outstandingBalance',
                    balanceTitle: 'i18n.accounts.outstandingBalance'
                },
                accountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.MORTGAGE_FACILITY)] = {
                    sideImage: ViewConstants.SIDEBAR_BROWN,
                    sideSkin: ViewConstants.SKINS.LOAN_SIDE_BAR,
                    balanceKey: 'outstandingBalance',
                    balanceTitle: 'i18n.accounts.outstandingBalance'
                },
                accountTypeConfig[applicationManager.getTypeManager().getAccountTypeBackendValue(OLBConstants.ACCOUNT_TYPE.INVESTMENT)] = {
                    sideImage: ViewConstants.SIDEBAR_BROWN,
                    sideSkin: ViewConstants.SKINS.LOAN_SIDE_BAR,
                    balanceKey: 'marketValue',
                    balanceTitle: 'i18n.accounts.currentBalance'
                },
                accountTypeConfig['Default'] = {
                    sideImage: ViewConstants.SIDEBAR_TURQUOISE,
                    sideSkin: ViewConstants.SKINS.SAVINGS_SIDE_BAR,
                    balanceKey: 'availableBalance',
                    balanceTitle: 'i18n.accounts.availableBalance'
                },
                accountTypeConfig['null'] = {
                    sideImage: ViewConstants.SIDEBAR_TURQUOISE,
                    sideSkin: ViewConstants.SKINS.SAVINGS_SIDE_BAR,
                    balanceKey: 'availableBalance',
                    balanceTitle: 'i18n.accounts.availableBalance'
                }
            return accountTypeConfig;
        })(),
    }
});