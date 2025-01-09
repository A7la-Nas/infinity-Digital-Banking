define("ArrangementsMA/MortgageServicesUIModule/userfrmRepaymentSimulationController", ['CommonUtilities', 'ViewConstants', 'FormControllerUtility', 'OLBConstants', 'CampaignUtility'], function (CommonUtilities, ViewConstants, FormControllerUtility, OLBConstants, CampaignUtility) {
    //Type your controller code here 
    var orientationHandler = new OrientationHandler();
    var currencyCode = "";
    var amount = "";
    return {
        selectedValue: {},
        frmPreShow: function () {
            var navMan = applicationManager.getNavigationManager();
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
            mortgageAccDetails = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountsUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.mortgageAccDetails;
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountsUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.getTermsAndConditionsSimulation();
            var formTemplateContext = {
                "sessionTimeOut": {
                    "timer": 4
                },
                "breadCrumbBack": {
                    "flag": false
                }
            }
            this.view.formTemplate12.setContext(formTemplateContext);
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxSimulatedResults.flxConfirmAndModify.flxButtons.flxCheckBoxMain.btnTnC.onClick = function () {
                scope.showPopup();
            }
            this.view.formTemplate12.flxContentPopup.flxPopup.flxTC.flxTermsAndConditionsHeader.flxClose.onClick = function () {
                scope.view.formTemplate12.flxContentPopup.flxPopup.setVisibility(false);
                scope.view.formTemplate12.flxContentPopup.isVisible = false;
                scope.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxSimulatedResults.flxConfirmAndModify.flxButtons.flxCheckBoxMain.btnTnC.setActive(true);
            }
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxSimulatedResults.flxConfirmAndModify.flxButtons.btnSubmit.onClick = this.navPayment;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxSimulatedResults.flxConfirmAndModify.flxButtons.btnCancel.onClick = this.navCancel;
            var params = {};
            var tokenParams = kony.sdk.getCurrentInstance().tokens[OLBConstants.IDENTITYSERVICENAME].provider_token.params.security_attributes;
            params.entitlement = {};
            params.entitlement.permissions = JSON.parse(tokenParams.permissions);
            this.param = params;
            this.view.formTemplate12.flxTCButtons.left = "51.5%";
            if (!(orientationHandler.isMobile || orientationHandler.isTablet)) {
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.left = "10dp";
                this.view.formTemplate12.flxContentTCCenter.parent.parent.parent.parent.flxMain.flxPageTitleMain.left = "10dp";
                this.view.formTemplate12.flxTCButtons.left = "50%";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.width = "100%";
            }
            if (kony.application.getPreviousForm().id === "frmPartialRepaymentPaymentDetails") {
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxSimulatedResults.isVisible = true;
                this.view.formTemplate12.flxContentPopup.parent.flxAppFooter.top = "40dp";
                this.view.formTemplate12.flxTCButtons.flxDownloadOptions.setVisibility(true);
            } else {
                amount = "";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxSimulatedResults.isVisible = false;
                this.view.formTemplate12.flxTCButtons.flxDownloadOptions.setVisibility(false);
            }
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxError.isVisible = false;
            this.currencyCode = applicationManager.getFormatUtilManager().getCurrencySymbol(currAccount.currencyCode);
            this.view.formTemplate12.flxContentPopup.parent.flxAppFooter.top = "230dp";
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
                if (uiData.TnCdataresponse) {
                    this.view.formTemplate12.flxContentPopup.flxPopup.flxTC.flxTCContents.rtxTC.text = uiData.TnCdataresponse.termsAndConditionsContent;
                }
                if (uiData.response) {
                    var data = this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxRepaymentAmount.flxSegLoanReductionSimulation.segLoanReductionSimulation.data;
                    if (data[0].imgRadioBtn1.text === 'M') {
                        simData = uiData.response;
                        this.setResultData(uiData.response);
                    } else {
                        uiData.response.rawResponse = JSON.parse(uiData.response.rawResponse);
                        simData = uiData.response.rawResponse;
                        this.setResultData(uiData.response.rawResponse);
                    }
                    this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxSimulatedResults.isVisible = true;
                    this.view.formTemplate12.flxContentPopup.parent.flxAppFooter.top = "40dp";
                    this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxError.isVisible = false;
                    data[0].btnSimulate.enable = true;
                    data[0].btnSimulate.skin = "sknbtnSSPffffff15px0273e3bg";
                    this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxRepaymentAmount.flxSegLoanReductionSimulation.segLoanReductionSimulation.setData(data);
                    if (kony.application.getCurrentBreakpoint() >= 1024) {
                        this.view.formTemplate12.flxTCButtons.flxDownloadOptions.setVisibility(true);
                    }
                    this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxSimulatedResults.lblSimulatedResults.setActive(true);
                }
                if (uiData.error) {
                    var data = this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxRepaymentAmount.flxSegLoanReductionSimulation.segLoanReductionSimulation.data;
                    this.view.formTemplate12.flxTCButtons.flxDownloadOptions.setVisibility(false);
                    this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxSimulatedResults.isVisible = false;
                    this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxError.isVisible = true;
                    if (uiData.error.errorMessage) {
                        this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxError.lblError.text = uiData.error.errorMessage;
                    } else if (uiData.error.errmsg) {
                        this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxError.lblError.text = uiData.error.errmsg;
                    } else if (uiData.error.dbpErrMsg) {
                        if (uiData.error.dbpErrCode === "12504" || uiData.error.dbpErrMsg === "transaction is denied due to max transaction limit") {
                            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxError.lblError.text = "Transaction is denied due to max transaction limit";
                        } else {
                            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxError.lblError.text = uiData.error.dbpErrMsg;
                        }
                    }
                    data[0].btnSimulate.enable = false;
                    data[0].btnSimulate.skin = "sknBtnBlockedSSPFFFFFF15Px";
                    data[0].tbxAmount.text = "";
                    this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxRepaymentAmount.flxSegLoanReductionSimulation.segLoanReductionSimulation.setData(data);
                }
                if (uiData.pageDownloadFile) {
                    this.downloadSimulationPageDoc(uiData.pageDownloadFile);
                }
            }
        },

        showPopup: function () {
            this.view.formTemplate12.flxContentPopup.flxPopup.setVisibility(true);
            this.view.formTemplate12.flxContentPopup.flxPopup.flxTC.flxTCContents.setVisibility(true);
            this.view.formTemplate12.flxContentPopup.isVisible = true;
            this.view.formTemplate12.flxContentPopup.lblTermsAndConditions.setActive(true);
        },

        setSimulationData: function (loanAccount) {
            var scope = this;
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxRepaymentAmount.flxSegLoanReductionSimulation.segLoanReductionSimulation.rowTemplate = "flxSimulationMobile";
            } else if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxRepaymentAmount.flxSegLoanReductionSimulation.segLoanReductionSimulation.rowTemplate = "flxSimulationTablet";
            }
            var specialCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\";
            var alphabetsSet = "abcdefghijklmnopqrstuvwxyz";
            var dataMap = {
                "btnSimulate": "btnSimulate",
                "flxAmount": "flxAmount",
                "flxContent": "flxContent",
                "flxLoan": "flxLoan",
                "flxLoanAmount": "flxLoanAmount",
                "flxRadioBtn1": "flxRadioBtn1",
                "flxRadioBtn2": "flxRadioBtn2",
                "flxRadioButtons": "flxRadioButtons",
                "flxReduction": "flxReduction",
                "flxSimulation": "flxSimulation",
                "flxSpace": "flxSpace",
                "flxSpace2": "flxSpace2",
                "flxTextButton": "flxTextButton",
                "imgRadioBtn1": "imgRadioBtn1",
                "imgRadioBtn2": "imgRadioBtn2",
                "lblAmount": "lblAmount",
                "lblBalanceAmount": "lblBalanceAmount",
                "lblInstallments": "lblInstallments",
                "lblLoan": "lblLoan",
                "lblLoanAccount": "lblLoanAccount",
                "lblReduction": "lblReduction",
                "lblTenure": "lblTenure",
                "tbxAmount": "tbxAmount",
                "tbxCurrency": "tbxCurrency",
                "lblCurrencyAccessibility": "lblCurrencyAccessibility"
            };
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxRepaymentAmount.flxSegLoanReductionSimulation.segLoanReductionSimulation.widgetDataMap = dataMap;
            var data = [{
                "flxRadioBtn1": {
                    "onClick": scope.toggleRadioButton1,
                    "accessibilityConfig": {
                        "a11yLabel": `Reduction in, Tenure`,
                        "a11yARIA": {
                            "role": "radio",
                            "tabindex": 0,
                            "aria-checked": true
                        }
                    },
                },
                "flxRadioBtn2": {
                    "onClick": scope.toggleRadioButton2,
                    "accessibilityConfig": {
                        "a11yLabel": `Reduction in, Installments`,
                        "a11yARIA": {
                            "role": "radio",
                            "tabindex": 0,
                            "aria-checked": false
                        }
                    },
                },
                "imgRadioBtn1": {
                    "text": "M"
                },
                "imgRadioBtn2": {
                    "text": "L"
                },
                "tbxCurrency": {
                    "text": scope.currencyCode,
                    "enable": false
                },
                "lblCurrencyAccessibility": {
                    "text": `Currency ${scope.currencyCode}`,
                },
                "tbxAmount": {
                    "onKeyPress": scope.tbxAmountKeyPressCallBack,
                    "onEndEditing": scope.changeSimBtn,
                    "text": amount,
                    "restrictCharactersSet": specialCharactersSet.replace(',.', '') + alphabetsSet + alphabetsSet.toUpperCase(),
                    "accessibilityConfig": {
                        "a11yARIA": {
                            "aria-labelledby": "lblAmount"
                        }
                    }
                },
                "lblLoan": {
                    "text": "Loan 1:"
                },
                "lblLoanAccount": {
                    "text": mortgageAccDetails[0].accountName + " - " + mortgageAccDetails[0].accountID.substr(-4)
                },
                "lblBalanceAmount": {
                    "text": "(" + "Balance Amount: " + scope.currencyCode + applicationManager.getFormatUtilManager().formatAmount(mortgageAccDetails[0].currentBalance.replace("-", "")) + ")"
                },
                "btnSimulate": {
                    "skin": "sknBtnBlockedSSPFFFFFF15Px",
                    "onClick": scope.showResult,
                    "enable": false,
                    "accessibilityConfig": {
                        "a11yLabel": `Simulate repayment values`
                    }
                }
            }]
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxRepaymentAmount.flxSegLoanReductionSimulation.segLoanReductionSimulation.setData(data);
            this.selectedData = data;
            this.selectedValue[0] = this.selectedData;
        },

        tbxAmountKeyPressCallBack: function (eventObject, eventPayload) {
            var scope = this;
            if (eventPayload.keyCode === 9 && !eventPayload.shiftKey) {
                eventPayload.preventDefault();
                scope.changeSimBtn();
            }
            setTimeout(function () {
                if (eventPayload.keyCode === 9 && eventPayload.shiftKey) {
                    scope.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxRepaymentAmount.flxSegLoanReductionSimulation.segLoanReductionSimulation.setActive(0, 0, "flxSimulation.flxContent.flxReduction.flxRadioButtons.flxRadioBtn2");
                }
                else if (eventPayload.keyCode === 9) {
                    if (scope.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxRepaymentAmount.flxSegLoanReductionSimulation.segLoanReductionSimulation.data[0].btnSimulate.enable) {
                        scope.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxRepaymentAmount.flxSegLoanReductionSimulation.segLoanReductionSimulation.setActive(0, 0, "flxSimulation.flxContent.flxLoanAmount.flxAmount.btnSimulate");
                    }
                    else {
                        scope.view.formTemplate12.setActiveElement();
                    }
                }
            }, 200);
        },

        toggleRadioButton1: function () {
            var data = this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxRepaymentAmount.flxSegLoanReductionSimulation.segLoanReductionSimulation.data;
            for (var i = 0; i < data.length; i++) {
                data[i].imgRadioBtn1.text = "M";
                data[i].imgRadioBtn2.text = "L";
                data[i].tbxAmount.text = "";
                data[i].btnSimulate.enable = false;
                data[i].btnSimulate.skin = "sknBtnBlockedSSPFFFFFF15Px";
                data[i].flxRadioBtn1.accessibilityConfig = {
                    "a11yLabel": `Reduction in, Tenure`,
                    "a11yARIA": {
                        "role": "radio",
                        "aria-checked": true
                    }
                };
                data[i].flxRadioBtn2.accessibilityConfig = {
                    "a11yLabel": `Reduction in, Installments`,
                    "a11yARIA": {
                        "role": "radio",
                        "aria-checked": false
                    }
                };
            }
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxRepaymentAmount.flxSegLoanReductionSimulation.segLoanReductionSimulation.setData(data);
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxSimulatedResults.isVisible = false;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxRepaymentAmount.flxSegLoanReductionSimulation.segLoanReductionSimulation.setActive(0, 0, "flxSimulation.flxContent.flxReduction.flxRadioButtons.flxRadioBtn1");
        },

        toggleRadioButton2: function () {
            var data = this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxRepaymentAmount.flxSegLoanReductionSimulation.segLoanReductionSimulation.data;
            for (var i = 0; i < data.length; i++) {
                data[i].imgRadioBtn1.text = "L";
                data[i].imgRadioBtn2.text = "M";
                data[i].tbxAmount.text = "";
                data[i].btnSimulate.enable = false;
                data[i].btnSimulate.skin = "sknBtnBlockedSSPFFFFFF15Px";
                data[i].flxRadioBtn1.accessibilityConfig = {
                    "a11yLabel": `Reduction in, Tenure`,
                    "a11yARIA": {
                        "role": "radio",
                        "aria-checked": false
                    }
                };
                data[i].flxRadioBtn2.accessibilityConfig = {
                    "a11yLabel": `Reduction in, Installments`,
                    "a11yARIA": {
                        "role": "radio",
                        "aria-checked": true
                    }
                };
            }
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxRepaymentAmount.flxSegLoanReductionSimulation.segLoanReductionSimulation.setData(data);
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxSimulatedResults.isVisible = false;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxRepaymentAmount.flxSegLoanReductionSimulation.segLoanReductionSimulation.setActive(0, 0, "flxSimulation.flxContent.flxReduction.flxRadioButtons.flxRadioBtn2");
        },
        changeSimBtn: function () {
            if (this.param.entitlement.permissions.indexOf("EARLY_PARTIAL_REPAYMENT-CREATE") !== -1 && this.param.entitlement.permissions.indexOf("TRANSFER_BETWEEN_OWN_ACCOUNT_CREATE") !== -1) {
                var data = this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxRepaymentAmount.flxSegLoanReductionSimulation.segLoanReductionSimulation.data;
                if (isNaN(Number(data[0].tbxAmount.text))) {
                    this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxSimulatedResults.isVisible = false;
                    this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxError.isVisible = true;
                    this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxError.lblError.text = "Entered amount cannnot be simulated, please try with different amount."
                    data[0].btnSimulate.enable = false;
                    data[0].btnSimulate.skin = "sknBtnBlockedSSPFFFFFF15Px";
                } else if (data[0].tbxAmount.text === "") {
                    this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxSimulatedResults.isVisible = false;
                    data[0].btnSimulate.enable = false;
                    data[0].btnSimulate.skin = "sknBtnBlockedSSPFFFFFF15Px";
                } else {
                    this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxError.isVisible = false;
                    data[0].btnSimulate.enable = true;
                    data[0].btnSimulate.skin = "sknbtnSSPffffff15px0273e3bg";
                }
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxRepaymentAmount.flxSegLoanReductionSimulation.segLoanReductionSimulation.setDataAt(data[0], 0, 0);
                this.view.forceLayout();
            }
        },
        showResult: function () {
            var data = this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxRepaymentAmount.flxSegLoanReductionSimulation.segLoanReductionSimulation.data;
            if (data[0].tbxAmount.text !== "") {
                if (Number(data[0].tbxAmount.text) < Number(currAccount.outstandingBalance) && Number(data[0].tbxAmount.text) > 0) {
                    if (data[0].imgRadioBtn1.text === "M") {
                        payloadforMortageSimulation = {};
                        payloadforMortageSimulation.arrangementId = mortgageAccDetails[0].arrangementId;
                        payloadforMortageSimulation.currencyId = mortgageAccDetails[0].currencyCode;
                        payloadforMortageSimulation.transactionAmount = data[0].tbxAmount.text;
                        payloadforMortageSimulation.activityId = "LENDING-APPLYPAYMENT-PR.PRINCIPAL.DECREASE";
                        kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                            "moduleName": "AccountServicesUIModule",
                            "appName": "ArrangementsMA"
                        }).presentationController.mortgageSimulatedResults(payloadforMortageSimulation);
                    } else {
                        payloadforSimulation = {};
                        kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                            "moduleName": "AccountServicesUIModule",
                            "appName": "ArrangementsMA"
                        }).presentationController.getSimulatedResults(payloadforSimulation);
                    }
                } else {
                    this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxSimulatedResults.isVisible = false;
                    this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxError.isVisible = true;
                    this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxError.lblError.text = "Entered amount cannnot be simulated, please try with different amount."
                    data[0].btnSimulate.enable = false;
                    data[0].btnSimulate.skin = "sknBtnBlockedSSPFFFFFF15Px";
                    this.view.formTemplate12.flxTCButtons.flxDownloadOptions.setVisibility(false);
                }
                data[0].tbxAmount.text = applicationManager.getFormatUtilManager().formatAmount(data[0].tbxAmount.text);
            } else {
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxSimulatedResults.isVisible = false;
                this.view.formTemplate12.flxTCButtons.flxDownloadOptions.setVisibility(false);
            }
            amount = data[0].tbxAmount.text;
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxRepaymentAmount.flxSegLoanReductionSimulation.segLoanReductionSimulation.setData(data);
            this.view.formTemplate12.flxTCButtons.flxDownloadOptions.flxDownload.onClick = this.downloadSimulationPage;
        },
        downloadSimulationPage: function () {
            payload = {};
            payload.facilityName = currAccount.accountName + " - " + currAccount.accountID.substr(-4);
            payload.numberOfLoans = mortgagePlans.length.toString();
            payload.outstandingBalance = this.currencyCode + applicationManager.getFormatUtilManager().formatAmount(currAccount.outstandingBalance);
            payload.amountPaidtoDate = this.currencyCode + applicationManager.getFormatUtilManager().formatAmount(mortgageDetails.totalPaidAmount);
            var data = this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxRepaymentAmount.flxSegLoanReductionSimulation.segLoanReductionSimulation.data;
            for (var i = 0; i < data.length; i++) {
                if (data[i].imgRadioBtn1.text === "M") {
                    payload.reductionIn = "Tenure";
                } else {
                    payload.reductionIn = "Installments";
                }
            }
            payload.amount = this.selectedData[0].tbxAmount.text;
            payload.contentType = "pdf";
            payload.currentInstallmentAmount = this.currencyCode + applicationManager.getFormatUtilManager().formatAmount(simData.currentInstallmentAmount.substr(1));
            payload.currentNextRepaymentDate = this.selectedRowData[0].lblCurrRepayDate.text;
            payload.currentEndDate = this.selectedRowData[0].lblCurrEndDate.text;
            payload.installmentAmount = this.currencyCode + applicationManager.getFormatUtilManager().formatAmount(simData.simulatedInstallmentAmount.substr(1));
            payload.nextRepaymentDate = this.selectedRowData[0].lblSimuRepayDate.text;
            payload.endDate = this.selectedRowData[0].lblSimuEndDate.text;
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountServicesUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.downloadSimulatePage(payload);
        },
        downloadSimulationPageDoc: function (fileUrl) {
            var data = {
                "url": fileUrl
            };
            CommonUtilities.downloadFile(data);
        },

        postShow: function () {
            var scope = this;
            this.setMobileUI();
            this.setFacilityDetails();
            this.setSimulationData(loanAccount);
            this.view.title = this.view.formTemplate12.pageTitle;
            this.view.formTemplate12.flxContentPopup.flxTC.onKeyPress = function (eventObject, eventPayload) {
                if (eventPayload.keyCode === 27) {
                    scope.view.formTemplate12.flxContentPopup.flxPopup.setVisibility(false);
                    scope.view.formTemplate12.flxContentPopup.isVisible = false;
                    scope.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxSimulatedResults.flxConfirmAndModify.flxButtons.flxCheckBoxMain.btnTnC.setActive(true);
                }
            };
            scope.view.formTemplate12.flxContentPopup.flxTC.doLayout = CommonUtilities.centerPopupFlex;
        },

        setFacilityDetails: function () {
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxFacilityDetails.height = "285dp";
            } else {
                if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                    this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxFacilityDetails.height = "220dp";
                } else {
                    this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxFacilityDetails.height = "150dp";
                }
                this.view.formTemplate12.flxContentTCCenter.parent.parent.parent.parent.parent.flxAppFooter.left = "8dp";
            }
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxFacilityDetails.flxFacilityHeader.flxFacilityContent.lblFacilityNameVal.text = currAccount.accountName + " - " + currAccount.accountID.substr(-4);
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxFacilityDetails.flxFacilityHeader.flxFacilityContent.lblNoOfLoansVal.text = mortgagePlans.length.toString();
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxFacilityDetails.flxFacilityHeader.flxFacilityContent.lblOutstandingBalVal.text = this.currencyCode + applicationManager.getFormatUtilManager().formatAmount(currAccount.outstandingBalance);
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxFacilityDetails.flxFacilityHeader.flxFacilityContent.lblAmountPaidToDateVal.text = this.currencyCode + applicationManager.getFormatUtilManager().formatAmount(mortgageDetails.totalPaidAmount);
        },
        getDate: function (date) {
            var datearray = date.split("/");
            var newdate = datearray[1] + '/' + datearray[0] + '/' + datearray[2];
            return newdate;
        },

        setResultData: function (dataResponse) {
            var data1 = this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxRepaymentAmount.flxSegLoanReductionSimulation.segLoanReductionSimulation.data;
            var scope = this;
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxSimulatedResults.flxLoanValues.flxSegLoanValues.segLoanNamenValues.rowTemplate = "flxLoanValuesMobile";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxSimulatedResults.flxLoanValues.flxSegLoanValues.segLoanNamenValues.sectionHeaderTemplate = "flxLoanNameHeaderMobile";
            } else if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxSimulatedResults.flxLoanValues.flxSegLoanValues.segLoanNamenValues.rowTemplate = "flxLoanValuesTablet";
            }
            var dataMap = {
                "flxEndDate": "flxEndDate",
                "flxInstallmentAmount": "flxInstallmentAmount",
                "flxLoanName": "flxLoanName",
                "flxLoanNameHeader": "flxLoanNameHeader",
                "flxLoanValues": "flxLoanValues",
                "flxRepaymentDate": "flxRepaymentDate",
                "flxSeparator3": "flxSeparator3",
                "flxSeparator4": "flxSeparator4",
                "flxValueHeader": "flxValueHeader",
                "flxValues": "flxValues",
                "lblAccountName2": "lblAccountName2",
                "lblCurrAmt": "lblCurrAmt",
                "lblCurrAmtAccessibility": "lblCurrAmtAccessibility",
                "lblCurrEndDate": "lblCurrEndDate",
                "lblCurrEndDateAccessibility": "lblCurrEndDateAccessibility",
                "lblCurrRepayDate": "lblCurrRepayDate",
                "lblCurrRepayDateAccessibility": "lblCurrRepayDateAccessibility",
                "lblCurrentValues": "lblCurrentValues",
                "lblEndDate": "lblEndDate",
                "lblInstallmentAmt": "lblInstallmentAmt",
                "lblRepayDate": "lblRepayDate",
                "lblSimuAmt": "lblSimuAmt",
                "lblSimuAmtAccessibility": "lblSimuAmtAccessibility",
                "lblSimuEndDate": "lblSimuEndDate",
                "lblSimuEndDateAccessibility": "lblSimuEndDateAccessibility",
                "lblSimuRepayDate": "lblSimuRepayDate",
                "lblSimuRepayDateAccessibility": "lblSimuRepayDateAccessibility",
                "lblSimulatedValues": "lblSimulatedValues"
            }
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxSimulatedResults.flxLoanValues.flxSegLoanValues.segLoanNamenValues.widgetDataMap = dataMap;
            var data = [];
            var rowData = [];
            if (mortgageAccDetails !== undefined) {
                data[0] = [{
                    lblAccountName2: {
                        "text": mortgageAccDetails[0].accountName + " - " + mortgageAccDetails[0].accountID.substr(-4)
                    }
                }]
                if (data1[0].imgRadioBtn1.text === 'M') {
                    rowData = [{
                        lblCurrAmt: {
                            "text": CommonUtilities.formatCurrencyWithCommas(dataResponse.currentInstallmentAmount.replace("-", ""), false, scope.currencyCode)
                        },
                        lblCurrAmtAccessibility: {
                            "text": `${kony.i18n.getLocalizedString("i18n.payments.installmentAmountWithcolon")}, ${kony.i18n.getLocalizedString("i18n.Accounts.CurrentValue")}, ${CommonUtilities.formatCurrencyWithCommas(dataResponse.currentInstallmentAmount.replace("-", ""), false, scope.currencyCode)}`
                        },
                        lblSimuAmt: {
                            "text": CommonUtilities.formatCurrencyWithCommas(dataResponse.simulatedInstallmentAmount.replace("-", ""), false, scope.currencyCode)
                        },
                        lblSimuAmtAccessibility: {
                            "text": `${kony.i18n.getLocalizedString("i18n.payments.installmentAmountWithcolon")}, ${kony.i18n.getLocalizedString("i18n.Accounts.SimulatedValue")}, ${CommonUtilities.formatCurrencyWithCommas(dataResponse.simulatedInstallmentAmount.replace("-", ""), false, scope.currencyCode)}`
                        },
                        lblCurrRepayDate: {
                            "text": applicationManager.getFormatUtilManager().getFormattedCalendarDate(dataResponse.currentNextRepaymentDate)
                        },
                        lblCurrRepayDateAccessibility: {
                            "text": `${kony.i18n.getLocalizedString("i18n.payments.nextRepaymentDateWithColon")}, ${kony.i18n.getLocalizedString("i18n.Accounts.CurrentValue")}, ${applicationManager.getFormatUtilManager().getFormattedCalendarDate(dataResponse.currentNextRepaymentDate)}`
                        },
                        lblSimuRepayDate: {
                            "text": applicationManager.getFormatUtilManager().getFormattedCalendarDate(dataResponse.simulatedNextRepaymentDate)
                        },
                        lblSimuRepayDateAccessibility: {
                            "text": `${kony.i18n.getLocalizedString("i18n.payments.nextRepaymentDateWithColon")}, ${kony.i18n.getLocalizedString("i18n.Accounts.SimulatedValue")}, ${applicationManager.getFormatUtilManager().getFormattedCalendarDate(dataResponse.currentNextRepaymentDate)}`
                        },
                        lblCurrEndDate: {
                            "text": applicationManager.getFormatUtilManager().getFormattedCalendarDate(dataResponse.currentEndDate)
                        },
                        lblCurrEndDateAccessibility: {
                            "text": `${kony.i18n.getLocalizedString("i18n.payments.endDateWithColon")}, ${kony.i18n.getLocalizedString("i18n.Accounts.CurrentValue")}, ${applicationManager.getFormatUtilManager().getFormattedCalendarDate(dataResponse.currentEndDate)}`
                        },
                        lblSimuEndDate: {
                            "text": applicationManager.getFormatUtilManager().getFormattedCalendarDate(dataResponse.simulatedEndDate)
                        },
                        lblSimuEndDateAccessibility: {
                            "text": `${kony.i18n.getLocalizedString("i18n.payments.endDateWithColon")}, ${kony.i18n.getLocalizedString("i18n.Accounts.SimulatedValue")} ${applicationManager.getFormatUtilManager().getFormattedCalendarDate(dataResponse.simulatedEndDate)}`
                        }
                    }];
                }
                else {
                    rowData = [{
                        lblCurrAmt: {
                            "text": CommonUtilities.formatCurrencyWithCommas(dataResponse.currentInstallmentAmount.replace("-", ""), false, scope.currencyCode)
                        },
                        lblCurrAmtAccessibility: {
                            "text": `${kony.i18n.getLocalizedString("i18n.payments.installmentAmountWithcolon")}, ${kony.i18n.getLocalizedString("i18n.Accounts.CurrentValue")}, ${CommonUtilities.formatCurrencyWithCommas(dataResponse.currentInstallmentAmount.replace("-", ""), false, scope.currencyCode)}`
                        },
                        lblSimuAmt: {
                            "text": CommonUtilities.formatCurrencyWithCommas(dataResponse.simulatedInstallmentAmount.replace("-", ""), false, scope.currencyCode)
                        },
                        lblSimuAmtAccessibility: {
                            "text": `${kony.i18n.getLocalizedString("i18n.payments.installmentAmountWithcolon")}, ${kony.i18n.getLocalizedString("i18n.Accounts.SimulatedValue")}, ${CommonUtilities.formatCurrencyWithCommas(dataResponse.simulatedInstallmentAmount.replace("-", ""), false, scope.currencyCode)}`
                        },
                        lblCurrRepayDate: {
                            "text": scope.getDate(dataResponse.currentNextRepaymentDate)
                        },
                        lblCurrRepayDateAccessibility: {
                            "text": `${kony.i18n.getLocalizedString("i18n.payments.nextRepaymentDateWithColon")}, ${kony.i18n.getLocalizedString("i18n.Accounts.CurrentValue")}, ${scope.getDate(dataResponse.currentNextRepaymentDate)}`
                        },
                        lblSimuRepayDate: {
                            "text": scope.getDate(dataResponse.simulatedNextRepaymentDate)
                        },
                        lblSimuRepayDateAccessibility: {
                            "text": `${kony.i18n.getLocalizedString("i18n.payments.nextRepaymentDateWithColon")}, ${kony.i18n.getLocalizedString("i18n.Accounts.SimulatedValue")}, ${scope.getDate(dataResponse.simulatedNextRepaymentDate)}`
                        },
                        lblCurrEndDate: {
                            "text": scope.getDate(dataResponse.currentEndDate)
                        },
                        lblCurrEndDateAccessibility: {
                            "text": `${kony.i18n.getLocalizedString("i18n.payments.endDateWithColon")}, ${kony.i18n.getLocalizedString("i18n.Accounts.CurrentValue")}, ${scope.getDate(dataResponse.currentEndDate)}`
                        },
                        lblSimuEndDate: {
                            "text": scope.getDate(dataResponse.simulatedEndDate)
                        },
                        lblSimuEndDateAccessibility: {
                            "text": `${kony.i18n.getLocalizedString("i18n.payments.endDateWithColon")}, ${kony.i18n.getLocalizedString("i18n.Accounts.SimulatedValue")} ${scope.getDate(dataResponse.simulatedEndDate)}`
                        }
                    }]
                }
                data[0][1] = rowData;
                this.selectedRowData = rowData;
                this.selectedValue[1] = this.selectedRowData;
            }
            this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxSimulatedResults.flxLoanValues.flxSegLoanValues.segLoanNamenValues.setData(data);
        },

        setMobileUI: function () {
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxSimulatedResults.flxConfirmAndModify.height = "200dp";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxSimulatedResults.flxConfirmAndModify.flxButtons.height = "160dp";
                this.view.formTemplate12.flxContentTCCenter.flxContentMain.flxBody.flxFacilityDetails.height = "260dp";
                this.view.formTemplate12.flxContentPopup.flxPopup.height = "100%";
                this.view.formTemplate12.flxContentPopup.flxPopup.flxTC.height = "93%";
                this.view.formTemplate12.flxContentPopup.flxPopup.flxTC.width = "94.5%";
                this.view.formTemplate12.flxContentPopup.flxPopup.flxTC.flxTCContents.height = "85%";
                this.view.formTemplate12.flxContentPopup.flxPopup.flxTC.top = "30dp";
                this.view.formTemplate12.flxContentTCCenter.parent.top = "0dp"
                this.view.formTemplate12.flxContentTCCenter.parent.parent.parent.parent.flxMain.flxPageTitleMain.isVisible = false;
            }
        },

        getFormattedDate: function (date) {
            if (date.indexOf("-") == "-1") {
                var newDate = date.substr(0, 4) + "-" + date.substr(4, 2) + "-" + date.substr(6, 2);
                return CommonUtilities.getFrontendDateString(newDate);
            } else {
                return CommonUtilities.getFrontendDateString(date);
            }
        },

        navPayment: function () {
            var navMan = applicationManager.getNavigationManager();
            navMan.setCustomInfo("frmPartialRepaymentPaymentDetails", this.selectedValue);
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                "moduleName": "AccountServicesUIModule",
                "appName": "ArrangementsMA"
            }).presentationController.repaymentAccount = loanAccount;
            navMan.navigateTo({
                "appName": "ArrangementsMA",
                "friendlyName": "MortgageServicesUIModule/frmPartialRepaymentPaymentDetails"
            });
        },

        navCancel: function () {
            var navMan = applicationManager.getNavigationManager();
            navMan.navigateTo({
                "appName": "HomepageMA",
                "friendlyName": "AccountsUIModule/frmDashboard"
            });
        }
    }
});