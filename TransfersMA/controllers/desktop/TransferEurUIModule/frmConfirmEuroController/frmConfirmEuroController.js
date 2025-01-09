define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants'], function(FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants) {
     
    return {
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.ManageActivitiesPresenter = applicationManager.getModulesPresentationController({"appName" : "TransfersMA", "moduleName" : "ManageActivitiesUIModule"});
            this.euroPresenter =   applicationManager.getModulesPresentationController({"appName" : "TransfersMA", "moduleName" : "TransferEurUIModule"});
            this.view.onBreakpointChange = this.onBreakpointChange;
        },
        onBreakpointChange: function(form, width) {
            var scope = this;
            this.view.CustomPopupLogout.onBreakpointChangeComponent(scope.view.CustomPopupLogout, width);
            this.view.CustomPopupCancel.onBreakpointChangeComponent(scope.view.CustomPopupCancel, width);
            FormControllerUtility.setupFormOnTouchEnd(width);
           
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
        },
        preShow: function() {
            var self = this;
            this.view.customheadernew.btnSkipNav.onClick = function(){
                self.view.lblConfirm.setActive(true);
            };
            this.view.GenericMessageNew1.setVisibility(false);
            this.view.GenericMessageNew.setVisibility(false);
            this.view.flxWarning.setVisibility(false);
            this.view.flxInsufficientFundsWarning.setVisibility(false);
            this.view.flxSupportingDocumentsValue.removeAll();
            this.view.flxSupportingDocumentsValue.setVisibility(true);
            this.view.flxPaymentActivities.onClick = function() {
                self.ManageActivitiesPresenter.showTransferScreen({
                    context: "ScheduledPayments"
                });
            };
            this.view.flxManageBeneficiaries.onClick = function() {
                self.ManageActivitiesPresenter.showTransferScreen({
                    context: "ManageBeneficiaries"
                });
            };
            // this.view.btnContinue.toolTip = kony.i18n.getLocalizedString("i18n.unifiedBeneficiary.Continue");
            // this.view.btnModify.toolTip = kony.i18n.getLocalizedString("i18n.common.modifiy");
            // this.view.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
            this.view.btnContinue.accessibilityConfig = {
                a11yLabel:"Continue to Acknowledgement Screen"
            };
            this.view.btnModify.accessibilityConfig = {
                a11yLabel:"Modify money transfer details"
            };
            this.view.btnCancel.accessibilityConfig = {
                a11yLabel:"Cancel money transfer"
            };
            this.view.flxLogout.onKeyPress = this.onKeyPressCallbackLogout;
            this.view.CustomPopupLogout.doLayout = CommonUtilities.centerPopupFlex;
            this.view.CustomPopupCancel.doLayout = CommonUtilities.centerPopupFlex;

        },
        onKeyPressCallbackLogout: function(eventObject, eventPayload) {
            var scopeObj = this;
            if (eventPayload.keyCode === 27) {
                if (scopeObj.view.flxDialogs.isVisible === true) {
                    scopeObj.view.flxDialogs.setVisibility(false);
                    scopeObj.view.flxLogout.setVisibility(false);
                    scopeObj.view.customheadernew.btnLogout.setActive(true);
                }
            }
        },
        postShow: function() {
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.frame.height - this.view.flxFooter.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            //add colon to labels - fix for responsive purposes
            this.view.lblFromKey.text = kony.i18n.getLocalizedString("i18n.transfers.lblFrom") + ":" ;
            this.view.lblAccountNumberKey.text = kony.i18n.getLocalizedString("i18n.common.accountNumber") + ":" ;
            this.view.lblPaymentTypeKey.text =  kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentType") + ":" ;
            this.view.lblPaymentMethodKey.text =  kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentMethod") + ":" ;
            this.view.lblSWIFTBICKey.text =  kony.i18n.getLocalizedString("i18n.TransfersEur.SWIFTBIC") + ":" ;
            this.view.lblBankAddressKey.text =  kony.i18n.getLocalizedString("i18n.transfers.bankAddress") + ":" ;
            this.view.lblCurrencyKey.text =  kony.i18n.getLocalizedString("i18n.common.Currency") + ":" ;
            this.view.lblAmountKey.text =  kony.i18n.getLocalizedString("i18n.transfers.lblAmount") + ":" ;
            this.view.lblExchangeRateKey.text =  kony.i18n.getLocalizedString("i18n.TransfersEur.ExchangeRate") + ":" ;
            this.view.lblPaymentMediumKey.text =  kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentMedium") + ":" ;
            this.view.lblFeeBreakdownKey.text =  kony.i18n.getLocalizedString("i18n.TransfersEur.FeeBreakdown") + ":" ;
            this.view.lblTotalDebitKey.text =  kony.i18n.getLocalizedString("i18n.TransfersEur.TotalDebit") + ":" ;
            this.view.lblFeesPaidByKey.text =  kony.i18n.getLocalizedString("i18n.TransfersEur.FeesPaidBy") + ":" ;
            this.view.lblFrequencyKey.text =  kony.i18n.getLocalizedString("i18n.transfers.lblFrequency") + ":" ;
            this.view.lblSendOnKey.text =  kony.i18n.getLocalizedString("i18n.TransfersEur.SendOn") + ":" ;
            this.view.lblEndingOnKey.text =  kony.i18n.getLocalizedString("i18n.PayAPerson.EndingOn") + ":" ;
            this.view.lblSupportingDocumentsKey.text =  kony.i18n.getLocalizedString("i18n.TransfersEur.SupportingDocuments") + ":" ;
            this.view.lblBeneficiaryNicknameKey.text =  kony.i18n.getLocalizedString("i18n.TransfersEur.BeneficiaryNickname") + ":" ;
            this.view.lblBeneficiaryAddressKey.text =  kony.i18n.getLocalizedString("i18n.TransfersEur.BeneficiaryAddress") + ":" ;
            this.view.lblCreditDateKey.text =  kony.i18n.getLocalizedString("i18n.Transfers.CreditValueDate") + ":" ;
        },
        /**
         * updateFormUI - the entry point method for the form controller.
         * @param {Object} viewModel - it contains the set of view properties and keys.
         */
        updateFormUI: function(viewModel) {
            if (viewModel.isLoading === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (viewModel.isLoading === false) {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.confirmDetails) {
                this.confirmDetails(viewModel);
                this.setSegmentData(viewModel.chargesList);
            }
            if (viewModel.details) {
                if (!viewModel.details.messageDetails) return;
                this.view.GenericMessageNew1.setContext(viewModel.details);
                this.view.GenericMessageNew1.setVisibility(true);
                this.view.flxInsufficientFundsWarning.setVisibility(true);
            }
        },
        getFromAccountName: function(fromAccount) {
            const accName = fromAccount.accountName || fromAccount.AccountName || fromAccount.nickName;
            const accId = fromAccount.accountID || fromAccount.account_id || fromAccount.Account_id;
            return accName ? (accName + "...." + CommonUtilities.getLastFourDigit(accId)) : accId;
        },
        getToAccountName: function(toAccount) {
            var accountName = toAccount.beneficiaryName || toAccount.nickName || toAccount.AccountName;
            var nameToShow = "";
            if (accountName) {
                nameToShow = accountName + "...." + CommonUtilities.getLastFourDigit(toAccount.accountNumber || toAccount.accountID);
            } else {
                nameToShow = toAccount.accountNumber;
            }
            return nameToShow;
        },
        confirmDetails: function(allData) {
            var self = this;
            var formatUtilManager = applicationManager.getFormatUtilManager();
            var data = allData.confirmDetails;
            //this.view.flxInsufficientFundsWarning.setVisibility(data.isInsufficientFundsTransfer || false);
            if (data.isOwnAccount) {
                this.showOwnAccountFields();
            } else {
                this.showExternalAccountFields(data);
            }
            var bankname = data.toAccount.bankName ? data.toAccount.bankName : kony.i18n.getLocalizedString("i18n.common.none");
            var bankCountry = (data.toAccount.bankCountry || kony.i18n.getLocalizedString("i18n.common.none"));
            if (bankname === kony.i18n.getLocalizedString("i18n.common.none")) {
                bankCountry = bankCountry;
            } else if (bankCountry === kony.i18n.getLocalizedString("i18n.common.none")) {
                bankCountry = bankname
            } else {
                bankCountry = data.toAccount.bankName + ", " + bankCountry;
            }
            this.view.lblFromValue.text = this.getFromAccountName(data.fromAccount);
            this.view.lblBeneficiaryValue.text = this.getToAccountName(data.toAccount);
            this.view.lblAccountNumberValue.text = data.toAccount.accountNumber || data.toAccount.accountID;
            this.view.lblSWIFTBICValue.text = data.swiftCode;
            this.view.rtxBankAddressValue.text = bankCountry;
            this.view.lblAmountValue.text = CommonUtilities.formatCurrencyWithCommas(data.amount, false, data.currency);
            if (allData.exchangeRate && (data.currency !== data.fromAccount.currencyCode)) {
                this.view.flxExchangeRate.setVisibility(true);
                if (allData.details.quoteCurrency === data.fromAccount.currencyCode) {
                    this.view.lblExchangeRateValue.text = '1.00 ' + data.fromAccount.currencyCode + ' = ' + allData.exchangeRate + ' ' + data.currency;
                } else if (allData.details.quoteCurrency === data.currency) {
                    this.view.lblExchangeRateValue.text = '1.00 ' + data.currency + ' = ' + allData.exchangeRate + ' ' + data.fromAccount.currencyCode;
                }
            } else {
                this.view.flxExchangeRate.setVisibility(false);
            }
            this.view.lblFrequencyValue.text = data.frequency;
            this.view.lblSendOnValue.text = data.sendOnDate;
            this.view.flxEndingDate.setVisibility(data.EndingVisbility);
            this.view.lblEndingOnValue.setVisibility(data.EndingVisbility);
            this.view.lblEndingOnValue.text = data.endOnDate || kony.i18n.getLocalizedString("i18n.common.none");
            this.view.lblPaymentReferenceValue.text = data.paymentReference || kony.i18n.getLocalizedString("i18n.common.none");
            this.view.lblBeneficiaryNicknameValue.text = data.toAccount.nickName || kony.i18n.getLocalizedString("i18n.common.none");
            this.view.lblPaymentMethodValue.text = data.paymentMethod;
            this.view.lblCurrencyValue.text = data.currency;
            if (data.supportedDocuments.length > 0) {
                for (var i = 0; i < data.supportedDocuments.length; i++) {
                    var lblSupportingDocumentName = new kony.ui.Label({
                        "id": "lblSupportingDocumentName" + i,
                        "accessibilityConfig": {
                            "a11yARIA": {
                                "tabindex": -1
                            },
                            "tagName": "span"
                        },
                        "isVisible": true,
                        "skin": "sknLabelSSP42424215pxBorder",
                        "zIndex": 1,
                        "top": "0px",
                        "left": "3%",
                        "text": data.supportedDocuments[i]
                    }, {
                        "contentAlignment": constants.CONTENT_ALIGN_CENTER,
                        "padding": [2, 0, 2, 0],
                        "paddingInPixel": false
                    }, {});
                    this.view.flxSupportingDocumentsValue.add(lblSupportingDocumentName);
                }
            } else {
                var lblSupportingDocumentName = new kony.ui.Label({
                    "id": "lblSupportingDocumentName",
                    "accessibilityConfig": {
                        "a11yARIA": {
                            "tabindex": -1
                        },
                        "tagName": "span"
                    },
                    "isVisible": true,
                    "top": "0px",
                    "left": kony.application.getCurrentBreakpoint() === 640 ? "0%" : "3%",
                    "skin": "ICSknSSP42424215Px",
                    "zIndex": 1,
                    "text": kony.i18n.getLocalizedString("i18n.common.none")
                }, {
                    "contentAlignment": constants.CONTENT_ALIGN_CENTER,
                    "padding": [0, 0, 0, 0],
                    "paddingInPixel": false
                }, {});
                this.view.flxSupportingDocumentsValue.add(lblSupportingDocumentName);
            }
            if (data.isPaidBy !== '') {
                var payedByi18 = '';
                switch (data.isPaidBy) {
                    case 'OUR':
                        payedByi18 = "i18n.TransfersEur.Me";
                        break;
                    case 'SHA':
                        payedByi18 = "i18n.TransfersEur.Both5050";
                        break;
                    case 'BEN':
                        payedByi18 = "i18n.TransfersEur.Beneficiary";
                        break;
                }
                this.view.lblFeesPaidByValue.text =  kony.i18n.getLocalizedString(payedByi18) ;
            } else this.view.flxFeesPaidBy.setVisibility(false);
            if (allData.totalAmount) {
                this.view.flxTotalDebit.setVisibility(true);
                this.view.lblTotalDebitValue.text = CommonUtilities.formatCurrencyWithCommas(allData.totalAmount, false, data.fromAccount.currencyCode);
            } else {
                this.view.flxTotalDebit.setVisibility(false);
            }
            if (data.isOwnAccount && (data.toAccount.accountType === "Loan" || data.toAccount.accountType === "CreditCard")) {
                this.view.flxPaymentType.setVisibility(true);
                this.view.lblPaymentTypeValue.text =  data.paymentType ;
            } else {
                this.view.flxPaymentType.setVisibility(false);
            }
            if (data.EndingVisbility || !allData.creditValueDate) {
                this.view.flxCreditDate.setVisibility(false);
            } else {
                this.view.flxCreditDate.setVisibility(true);
                data.creditValueDate = formatUtilManager.getFormatedDateString(formatUtilManager.getDateObjectfromString(allData.creditValueDate), "d/m/Y");
                this.view.lblCreditDateValue.text =  data.creditValueDate ;
            }
            data.totalAmount = kony.sdk.isNullOrUndefined(allData.totalAmount) ? "" : allData.totalAmount;
            data.transactionCurrency = kony.sdk.isNullOrUndefined(allData.currency) ? "" : allData.currency;
            data.transactionAmount = kony.sdk.isNullOrUndefined(allData.exchangeRate) ? data.amount : (data.amount * allData.exchangeRate);
            data.transactionAmount = Number((Math.floor(data.transactionAmount * 100) / 100))
            data.serviceCharge = this.getTotalCharges(allData.chargesList);
            data.quoteCurrency = allData.hasOwnProperty("details") ? allData.details.quoteCurrency : "";
            this.view.btnContinue.onClick = this.createTransactionRequestSCA.bind(this, data);
            this.view.btnCancel.onClick = this.showCancelPopup.bind(this, data.isEditMode);
            this.view.btnModify.onClick = function() {
                FormControllerUtility.showProgressBar(this.view);
                if (data.isOwnAccount) {
                    self.euroPresenter.showTransferScreen({
                        context: "MakePaymentOwnAccounts",
                        modifyTransaction: data
                    });
                } else {
                    self.euroPresenter.showTransferScreen({
                        context: "MakePayment",
                        modifyTransaction: data
                    });
                }
            }
            this.view.forceLayout();
        },
        //function call to check SCAType and SCAEnfore
        createTransactionRequestSCA: function(data) {
            let self = this;
            //if SCAType is 0 , sca is excluded
            if (CommonUtilities.getSCAType() == 0) {
                data.isMFARequired = "false";
                this.postTransaction(data);
            } else if (CommonUtilities.getSCAType() == 1) {
                FormControllerUtility.showProgressBar(this.view);
                this.view.flxLoading.setVisibility(true);
                this.action = data.serviceName;
                let appSessionId = "";
                let rmsComponent = new com.temenos.infinity.sca.rmsComponent({
                    "appName": "ResourcesHIDMA"
                });
                if (OLBConstants.CLIENT_PROPERTIES && OLBConstants.CLIENT_PROPERTIES.SCA_RISK_ASSESSMENT && OLBConstants.CLIENT_PROPERTIES.SCA_RISK_ASSESSMENT.toUpperCase() === "TRUE") appSessionId = applicationManager.getRmsSessionID();
                rmsComponent.rmsActionSuccess = function(output) {
                    if (output.userBlock == "true") {
                        var errorMessage = kony.i18n.getLocalizedString("kony.sca.rms.userBlock");
                        var serverErrorResponse = {
                            errorMessage: errorMessage,
                            dbpErrMsg: errorMessage
                        };
                        var outputMessage = {
                            errorMessage: errorMessage,
                            serverErrorRes: serverErrorResponse
                        };
                        self.euroPresenter.createTransferErrorCallback(data, outputMessage);
                    } else {
                        data.isMFARequired = output.stepUp;
                        FormControllerUtility.hideProgressBar(this.view);
                        self.postTransaction(data);
                    }
                };
                rmsComponent.rmsActionFailure = function(output) {
                    data.isMFARequired = "true";
                    FormControllerUtility.hideProgressBar(this.view);
                    self.postTransaction(data);
                };
                rmsComponent.rmsActionCreate(this.action, appSessionId);
            }
            else if(CommonUtilities.getSCAType () == 2){
                data.isMFARequired = "true";
                self.postTransaction(data);
            }
     },
        
        /**
         * Method to get sum of all types of charge
         */
        getTotalCharges: function(chargesData) {
            var totalCharge = 0;
            if (kony.sdk.isNullOrUndefined(chargesData) || !Array.isArray(chargesData)) return totalCharge;
            for (var i = 0; i < chargesData.length; i++) {
                totalCharge = totalCharge + (!kony.sdk.isNullOrUndefined(chargesData[i].chargeAmount) ? chargesData[i].chargeAmount : 0);
            }
            totalCharge = Number((Math.floor(totalCharge * 100) / 100))
            return totalCharge
        },
        /**
         * Method to show the Transfers related fields
         */
        showOwnAccountFields: function() {
            var scopeObj = this;
            scopeObj.view.customheadernew.activateMenu("EUROTRANSFERS", "Transfer Between Accounts");
            scopeObj.view.flxNewPayment.onClick = function() {
                scopeObj.euroPresenter.showTransferScreen({
                    context: "MakePaymentOwnAccounts"
                });
            };
            scopeObj.view.customheadernew.lblHeaderMobile.text =  kony.i18n.getLocalizedString("i18n.hamburger.transfers") ;
            scopeObj.view.lblNewPayment.text =  kony.i18n.getLocalizedString("i18n.TransfersEur.NewTransferbetweenAccounts") ;
            scopeObj.view.lblConfirm.text =  kony.i18n.getLocalizedString("i18n.unifiedTransfer.TransfersConfirmation");
            scopeObj.view.lblPaymentActivities.text =  kony.i18n.getLocalizedString("i18n.FastTransfer.TransferActivities") ;
            scopeObj.view.lblPaymentReferenceKey.text =  kony.i18n.getLocalizedString("i18n.TransfersEur.TransferReference") + ":" ;
            scopeObj.view.lblBeneficiaryKey.text =  kony.i18n.getLocalizedString("i18n.common.To") + ":" ;
            scopeObj.view.flxManageBeneficiaries.setVisibility(false);
            scopeObj.view.flxAccountNumber.setVisibility(false);
            scopeObj.view.flxPaymentMethod.setVisibility(false);
            scopeObj.view.flxSWIFTBIC.setVisibility(false);
            scopeObj.view.flxBankAddress.setVisibility(false);
            scopeObj.view.flxCurrency.setVisibility(true);
            scopeObj.view.flxPaymentMedium.setVisibility(false);
            scopeObj.view.flxFeesPaidBy.setVisibility(false);
            scopeObj.view.flxBeneficiaryNickname.setVisibility(false);
            scopeObj.view.flxBeneficiaryAddress.setVisibility(false);
        },
        setFormattedAddress: function(data) {
            var scopeObj = this;
            if (!data.addressLine1 && !data.addressLine2 && !data.city && !data.postCode && !data.country) {
                scopeObj.view.lblAddress1.setVisibility(true);
                scopeObj.view.lblAddress2.setVisibility(false);
                scopeObj.view.lblAddress3.setVisibility(false);
                scopeObj.view.lblAddress1.text =  kony.i18n.getLocalizedString("i18n.common.none") ;
                return;
            }
            if (!data.addressLine1) {
                scopeObj.view.lblAddress1.setVisibility(false);
            } else {
                scopeObj.view.lblAddress1.setVisibility(true);
                scopeObj.view.lblAddress1.text =  data.addressLine1 ;
            }
            if (!data.addressLine2) {
                scopeObj.view.lblAddress2.setVisibility(false);
            } else {
                scopeObj.view.lblAddress2.setVisibility(true);
                scopeObj.view.lblAddress2.text =  data.addressLine2 ;
            }
            if (!data.city && !data.postCode && !data.country) {
                scopeObj.view.lblAddress3.setVisibility(false);
            } else {
                scopeObj.view.lblAddress3.setVisibility(true);
                var strings = [data.city, data.country, data.postCode];
                scopeObj.view.lblAddress3.text =  strings.filter(function(string) {
                    if (string) {
                        return true;
                    }
                    return false;
                }).join(', ') ;
            }
            scopeObj.view.forceLayout();
        },
        /**
         * Method to show the Payments related fields
         */
        showExternalAccountFields: function(data) {
            var scopeObj = this;
            scopeObj.view.customheadernew.activateMenu("EUROTRANSFERS", "Make a Payment");
            scopeObj.view.flxNewPayment.onClick = function() {
                scopeObj.euroPresenter.showTransferScreen({
                    context: "MakePayment"
                })
            };
            scopeObj.view.customheadernew.lblHeaderMobile.text =  kony.i18n.getLocalizedString("i18n.AccountsDetails.PAYMENTS") ;
            scopeObj.view.lblNewPayment.text =  kony.i18n.getLocalizedString("i18n.TransfersEur.NewPayment") ;
            scopeObj.view.lblConfirm.text =  kony.i18n.getLocalizedString("i18n.unifiedTransfer.TransfersConfirmation");
            scopeObj.view.lblPaymentActivities.text =  kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentActivities") ;
            scopeObj.view.lblPaymentReferenceKey.text =  kony.i18n.getLocalizedString("i18n.TransfersEur.PaymentReference") + ":" ;
            scopeObj.view.lblBeneficiaryKey.text =  kony.i18n.getLocalizedString("i18n.TransfersEur.Beneficiary") + ":" ;
            this.setFormattedAddress(data);
            if (data.toAccount && data.toAccount.isSameBankAccount === "true") {
                scopeObj.view.flxSWIFTBIC.setVisibility(false);
                scopeObj.view.flxBankAddress.setVisibility(false);
            } else {
                scopeObj.view.flxSWIFTBIC.setVisibility(true);
                scopeObj.view.flxBankAddress.setVisibility(true);
            }
            if (data.toAccount && data.toAccount.isInternationalAccount === "false" && data.toAccount.isSameBankAccount === "false" && data.frequency === "Once") {
                scopeObj.view.flxPaymentMedium.setVisibility(true);
                this.view.lblPaymentMediumValue.text =  data.paymentMedium ;
            } else {
                scopeObj.view.flxPaymentMedium.setVisibility(false);
            }
            scopeObj.view.flxManageBeneficiaries.setVisibility(true);
            scopeObj.view.flxAccountNumber.setVisibility(false);
            scopeObj.view.flxPaymentMethod.setVisibility(true);
            scopeObj.view.flxCurrency.setVisibility(false);
            scopeObj.view.flxFeesPaidBy.setVisibility(true);
            scopeObj.view.flxBeneficiaryNickname.setVisibility(true);
            scopeObj.view.flxBeneficiaryAddress.setVisibility(true);
        },
        postTransaction: function(data) {
            if (data.isEditMode && data.isScheduled) {
                this.euroPresenter.editTransaction(data);
            } else {
                this.euroPresenter.createTransaction(data);
            }
        },
        /**
         * Method to show or hide Cancel Popup
         */
        showCancelPopup: function(isEditMode) {
            var scopeObj = this;
            scopeObj.view.flxDialogs.setVisibility(true);
            scopeObj.view.flxCancelPopup.setVisibility(true);

            scopeObj.view.CustomPopupCancel.btnYes.onClick = function() {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.setVisibility(false);
                if (isEditMode) {
                    scopeObj.ManageActivitiesPresenter.showTransferScreen({
                        context: "ScheduledPayments"
                    });
                } else {
                    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                        "moduleName": "AccountsUIModule",
                        "appName": "HomepageMA"
                    }).presentationController.showAccountsDashboard();
                }
            };
            scopeObj.view.CustomPopupCancel.btnNo.onClick = function() {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.setVisibility(false);
                scopeObj.view.btnCancel.setActive(true);
            };
            scopeObj.view.CustomPopupCancel.flxCross.onClick = function() {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.setVisibility(false);
                scopeObj.view.btnCancel.setActive(true);
            };
            scopeObj.view.CustomPopupCancel.onKeyPress = scopeObj.onKeyPressCallback;
            scopeObj.view.CustomPopupCancel.lblHeading.accessibilityConfig = {
                a11yARIA:{
                    tabindex:-1
                }
            }
            scopeObj.view.CustomPopupCancel.flxCross.accessibilityConfig = {
                a11yLabel : kony.i18n.getLocalizedString("i18n.common.close")+"this Cancel dialog",
                a11yARIA : {
                  tabindex : 0,
                  role : "button"
                }
            }
            scopeObj.view.CustomPopupCancel.btnYes.accessibilityConfig = {
                a11yLabel : "Yes, cancel this process",
                a11yARIA : {
                    tabindex : 0,
                    role : "button"
                  }
            }
            scopeObj.view.CustomPopupCancel.btnNo.accessibilityConfig = {
                a11yLabel : "No, don't Cancel this process",
                a11yARIA : {
                    tabindex : 0,
                    role : "button"
                  }
            }
            scopeObj.view.CustomPopupCancel.lblHeading.setActive(true);
            scopeObj.view.flxDialogs.accessibilityConfig = {
                a11yARIA:{
                    tabindex:-1,
                    role:"dialog"
                }
            };

            if (kony.application.getCurrentBreakpoint() <= 640) {
                scopeObj.view.CustomPopupCancel.height = "250dp";
              }
              scopeObj.view.CustomPopupCancel.isModalContainer = true; 

        },
        onKeyPressCallback: function (eventObject, eventPayload) {
            var scopeObj = this;
            if (eventPayload.keyCode === 27) {
                if(scopeObj.view.flxCancelPopup.isVisible === true) {
                    scopeObj.view.flxDialogs.setVisibility(false);
                    scopeObj.view.flxCancelPopup.setVisibility(false);
                    scopeObj.view.btnCancel.setActive(true);
                }
            }
        },
        setSegmentData: function(data) {
            if (data && data.length > 0) {
                this.view.flxFeeBreakdown.setVisibility(true);
                this.view.sgmFeeBreakdown.widgetDataMap = this.getWidgetDataMap();
                this.view.sgmFeeBreakdown.setData(data);
            } else {
                this.view.flxFeeBreakdown.setVisibility(false);
                this.view.forceLayout();
            }
        },
        getWidgetDataMap: function() {
            var map = {
                lblChargeName: "chargeName",
                lblChargeValue: "amountCurrency",
            };
            return map;
        },
    };
});