define(['FormControllerUtility', 'CommonUtilities', 'IBANUtils', 'ViewConstants', 'OLBConstants'], function(FormControllerUtility, CommonUtilities, IBANUtils, ViewConstants, OLBConstants) {
     
    var orientationHandler = new OrientationHandler();
    return {
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
        },
        onBreakpointChange: function(form, width) {
            var scope = this;
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            this.view.CustomPopupLogout.onBreakpointChangeComponent(scope.view.CustomPopupLogout, width);
            FormControllerUtility.setupFormOnTouchEnd(width);
             
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
        },
        preShow: function() {
            this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
            this.view.brwBodyTnC.requestURLConfig = {
                URL: "richtextViewer.html",
                requestMethod: constants.BROWSER_REQUEST_METHOD_GET,
            };
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain', 'flxBankDetails', 'flxRecipientDetails', 'flxConfirmDetailsMain', 'flxSuccessMessage']);
        },
        postShow: function() {
            this.view.customheadernew.activateMenu("Wire Transfer", "Make Transfer");
            this.view.customheadernew.forceCloseHamburger();
     //       this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            this.view.lblFavoriteEmailCheckBoxMain.skin = "sknlblOLBFontsE3E3E320pxOlbFontIcons";
        },

        updateFormUI: function(context) {
            if (context.isLoading) {
                FormControllerUtility.showProgressBar(this.view);
            } else {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (context.confirmationDetails) {
                this.enableTnC();
                this.showMakeTransferConfirmation(context.confirmationDetails, context.onCancel);
            }
            if (context.TnCcontent) {
                this.bindTnCData(context.TnCcontent);
            }
            if (context.TnCFailure) {
                this.disableTnC();
            }
            if (context.wireTransferAcknowledgement) {
                this.showWireTransferAcknowledgement(context.wireTransferAcknowledgement);
                this.footerAlignment();
            }
        },
        /**
         * Called on Click of Make Transfer Tab
         */
        onMakeTransferTabClick: function() {
            this.getWireTransferModule().presentationController.showMakeTransferRecipientList();
            //this.view.Search.txtSearch.setFocus(true);
        },
        /**
         * Called on Click of Recent Tab
         */
        onRecentTabClick: function() {
            this.getWireTransferModule().presentationController.showRecentTransactions();
        },

        /** Show wire transfer acknowledgement screen
         * @param {string} acknowledgementData -Acknowledgement Data to show
         * @param {string} acknowledgementData.referenceId - referenceId of the transaction
         */
        showWireTransferAcknowledgement: function(acknowledgementData) {
            this.view.lblRefrenceNumber.setVisibility(true);
            this.view.lblRefrenceNumberValue.setVisibility(true);
            this.view.lblRefrenceNumberValue.text = acknowledgementData.referenceId;
            this.view.btnMakeAnotherWireTransfer.text = kony.i18n.getLocalizedString("i18n.WireTranfers.MakeAnotherWireTransfer");
            this.view.btnMakeAnotherWireTransfer.toolTip = kony.i18n.getLocalizedString("i18n.WireTranfers.MakeAnotherWireTransfer");
            this.view.btnViewSentTransactions.text = kony.i18n.getLocalizedString("i18n.payaperson.viewSentTrasactions");
            this.view.btnViewSentTransactions.toolTip = kony.i18n.getLocalizedString("i18n.common.viewRecentTransaction");
            this.view.flxStep2Buttons.setVisibility(false);
            this.view.flxbuttons.setVisibility(true);
            this.view.btnSaveRecipient.setVisibility(false);
            this.view.flxAgree.setVisibility(false);
            this.view.lblAddAccountHeading.text = kony.i18n.getLocalizedString("i18n.wiretransfers.makeTransferAck");
            this.view.flxSuccessMessage.setVisibility(true);
            this.view.flxBankDetails.info.frame.height = this.view.flxRecipientDetails.info.frame.height;
            this.view.btnViewSentTransactions.onClick = this.onRecentTabClick.bind(this);
            this.view.btnMakeAnotherWireTransfer.onClick = this.onMakeTransferTabClick.bind(this);
            this.view.lblSuccessAcknowledgement.text = acknowledgementData.message;
            this.view.flxHeader.setFocus(true);
            if (kony.application.getCurrentBreakpoint() === 640  || orientationHandler.isMobile) {
              this.view.flxFooter.top =  "1300dp";
            }
            this.view.forceLayout();
        },

        bindTnCData: function(TnCcontent) {
            FormControllerUtility.disableButton(this.view.btnConfirm);
            this.view.lblFavoriteEmailCheckBoxMain.text = OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED;
            this.view.flxAgree.setVisibility(true);
            if (TnCcontent.contentTypeId === OLBConstants.TERMS_AND_CONDITIONS_URL) {
                this.view.btnTandC.onClick = function() {
                    window.open(TnCcontent.termsAndConditionsContent);
                }
            } else {
                this.view.btnTandC.onClick = this.showTermsAndConditionPopUp;
                this.setTnCDATASection(TnCcontent.termsAndConditionsContent);
                FormControllerUtility.setHtmlToBrowserWidget(this, this.view.brwBodyTnC, TnCcontent.termsAndConditionsContent);
            }
            this.view.flxClose.onClick = this.hideTermsAndConditionPopUp;
            this.view.lblFavoriteEmailCheckBoxMain.onTouchEnd = this.toggleTnC.bind(this, this.view.lblFavoriteEmailCheckBoxMain);
        },
        yes: function() {
            console.log("WireTransfer:Yes");
        },
        no: function() {
            console.log("WireTransfer:No");
        },

        toggleTnC: function(widget) {
            CommonUtilities.toggleFontCheckbox(widget);
            if (widget.text === OLBConstants.FONT_ICONS.CHECBOX_UNSELECTED) {
                FormControllerUtility.disableButton(this.view.btnConfirm);
                this.view.lblFavoriteEmailCheckBoxMain.skin = "sknlblOLBFontsE3E3E320pxOlbFontIcons";
            } else {
                CommonUtilities.enableButton(this.view.btnConfirm);
                this.view.lblFavoriteEmailCheckBoxMain.skin = "sknlblDelete20px";
            }
        },

        showTermsAndConditionPopUp: function() {
          //  var height = this.view.flxHeader.info.frame.height + this.view.flxMain.info.frame.height + this.view.flxFooter.info.frame.height;
          //  this.view.flxTermsAndConditionsPopUp.height = height + "dp";
            this.view.flxDialogs.setVisibility(true);
            this.view.flxTermsAndConditionsPopUp.setVisibility(true);
            this.view.forceLayout();
        },
        setTnCDATASection: function(content) {
            this.view.rtxTC.text = content;
        },
        hideTermsAndConditionPopUp: function() {
            this.view.flxTermsAndConditionsPopUp.setVisibility(false);
            this.view.flxDialogs.setVisibility(false);
        },

        enableTnC: function() {
            FormControllerUtility.disableButton(this.view.btnConfirm);
            this.view.flxAgree.setVisibility(true);
        },
        /**
         * Returns the wire Transfer Module
         * @returns {object} Reference to wire transfer module.
         */
        getWireTransferModule: function() {
            return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule", "appName"
            : "WireTransferMA"});
        },
        /**
         * Formats the amount label for confirmation for a given currency symbol
         * @param {string} currencySymbol Currency Symbol
         * @returns {string} Label for amount
         */
        getAmountLabelText: function(currencySymbol) {
            return kony.i18n.getLocalizedString("i18n.transfers.amountlabel") + "(" + currencySymbol + ") :";
        },
        /**
         * Return recipient address
         * @param {Payee} dataItem - Reciepient Object
         * @returns {string} Formatted Address of the payee
         */
        returnRecipientAddress: function(dataItem) {
            var strings = [dataItem.addressLine1, dataItem.addressLine2, dataItem.cityName, dataItem.state, dataItem.country, dataItem.zipCode];
            var address = strings.filter(function(string) {
                if (string) {
                    return true;
                }
                return false;
            }).join(', ');
            return address;
        },
        /**
         * To return Bank Address
         * @param {Payee} payeeObject recipient list
         * @param {boolean} withName -to specify whether Address required with name or not
         * @returns {string} formatted address
         */
        returnBankAddress: function(payeeObject, withName) {
            var strings = [payeeObject.bankAddressLine1, payeeObject.bankAddressLine2, payeeObject.bankCity, payeeObject.bankState, payeeObject.bankZip];
            var address = strings.filter(function(string) {
                if (string) {
                    return true
                };
                return false;
            }).join(', ');
            if (withName) {
                address = [payeeObject.bankName, address].filter(function(string) {
                    if (string) {
                        return true;
                    }
                    return false;
                }).join(', ');
            }
            return address;
        },
        /**
         * Shows the make transfer confirmation
         * @param {object} makeTransferData Object containing data for tranfer
         */
        showMakeTransferConfirmation: function(makeTransferData, onCancel) {
            var scopeObj = this;
            scopeObj.getWireTransferModule().presentationController.getTnC(makeTransferData.payeeObject.wireAccountType, "frmConfirmDetails");
            this.showMakeTransferConfirmationUI();
            var payeeObject = makeTransferData.payeeObject;
            // Hiding Currency if payee is domestic
            this.view.lblCurrencyKey.setVisibility(true);
            this.view.rtxCurrencyValue.setVisibility(true);
            //if(applicationManager.getConfigurationManager().isCombinedUser === "true"){
            if (applicationManager.getUserPreferencesManager().profileAccess === "both") {
                this.view.lblFromIcon.setVisibility(true);
                this.view.lblFromIcon.text = makeTransferData.fromAccountType;
            }
            this.view.lblFromAccountKey.text = kony.i18n.getLocalizedString("i18n.transfers.fromAccount") + ":";
            var name = makeTransferData.fromAccountName;
            var truncatedName = name;
            name = name.split("....");
            if (name[0].length > 25) {
                truncatedName = name[0].substring(0, 25) + "...." + name[1];
            }
            this.view.rtxFromAccountValue.text = truncatedName;
            this.view.lblToAccountKey.text = kony.i18n.getLocalizedString("i18n.transfers.lblTo") + ":";
            var payeeObj = this.getWireTransferModule().presentationController.getPayee(payeeObject.payeeNickName);
            if (payeeObj === undefined || payeeObj === null) {
                payeeObj = payeeObject;
            }
            this.view.rtxToAccountValue.text = payeeObject.payeeNickName;
            this.view.lblAmountKey.text = this.getAmountLabelText(makeTransferData.currencySymbol);
            this.view.rtxAmountValue.text = CommonUtilities.formatCurrencyWithCommas(makeTransferData.amount, true);
            this.view.lblCurrencyKey.text = kony.i18n.getLocalizedString("i18n.common.Currency") + ":";
            this.view.rtxCurrencyValue.text = makeTransferData.currency;
            this.view.lblTransactionFeeKey.text = kony.i18n.getLocalizedString("i18n.WireTransfer.TransactionFee") + ":";
            this.view.rtxTransactionFeeValue.text = CommonUtilities.formatCurrencyWithCommas(applicationManager.getConfigurationManager().wireTranferFees, false, makeTransferData.currencySymbol);
            this.view.lblNoteKey.text = kony.i18n.getLocalizedString("i18n.transfers.Description") + ":";
            this.view.rtxNoteValue.text = makeTransferData.reasonForTransfer;
            this.view.flxTransactionFeeInfo.onClick = this.onInfoClick;
            this.view.ProfileInfo.flxCross.onClick = this.onInfoClose;
            //if(applicationManager.getConfigurationManager().isCombinedUser === "true") {
            if (applicationManager.getUserPreferencesManager().profileAccess === "both") {
                this.view.lblIcon.isVisible = false;
                this.view.lblIcon.text = payeeObject.isBusinessPayee === "1" ? "r" : "s";
            }
            //recipient details
            this.view.lblDetailsKey1.text = kony.i18n.getLocalizedString("i18n.transfers.benificiaryName") + " :";
            this.view.rtxDetailsValue1.text = payeeObj.payeeName;
            this.view.lblDetailsKey2.text = kony.i18n.getLocalizedString("i18n.WireTransfer.recipientType") + " :";
//             this.view.rtxDetailsValue2.text = payeeObj.isBusinessPayee === "0" ? "Individual" : "Business";
            this.view.rtxDetailsValue2.text = payeeObj.type ? payeeObj.type : (payeeObj.isBusinessPayee === "0" ? "Individual" : "Business");
            this.view.lblDetailsKey3.text = kony.i18n.getLocalizedString("i18n.transfers.accountType") + " :";
            this.view.rtxDetailsValue3.text = payeeObj.wireAccountType;
            this.view.lblDetailsKey4.text = kony.i18n.getLocalizedString("i18n.WireTransfer.RecipientAddress") + " :";
            this.view.rtxDetailsValue4.text = scopeObj.returnRecipientAddress(payeeObj);
            //bank details
            this.view.lblBankDetailsKey3.text = kony.i18n.getLocalizedString("i18n.WireTransfer.recipientAccountNumber") + " :";
            this.view.rtxBankDetailsValue3.text = payeeObject.accountNumber || payeeObject.payeeAccountNumber;
            this.view.lblBankDetailsKey5.text = kony.i18n.getLocalizedString("i18n.transfers.accountNickName") + " :";
            this.view.rtxBankDetailsValue5.text = payeeObj.payeeNickName;
            this.view.lblBankDetailsKey6.text = kony.i18n.getLocalizedString("i18n.WireTransfer.recipientBank&Address") + " :";
            this.view.rtxBankDetailsValue6.text = scopeObj.returnBankAddress(payeeObject, true);
            //location specific bank details
            if (payeeObject.wireAccountType === applicationManager.getConfigurationManager().OLBConstants.WireTransferConstants.ACCOUNT_DOMESTIC) {
                this.view.lblBankDetailsKey1.text = kony.i18n.getLocalizedString("i18n.accounts.routingNumber") + " :";
                this.view.rtxBankDetailsValue1.text = payeeObject.routingCode || payeeObject.routingNumber;
                this.view.flxRow2.setVisibility(false);
            } else if (payeeObject.wireAccountType === applicationManager.getConfigurationManager().OLBConstants.WireTransferConstants.ACCOUNT_INTERNATIONAL) {
                this.view.flxRow2.setVisibility(true);
                if (IBANUtils.isCountrySupportsIBAN(payeeObject.country)) {
                    this.view.lblBankDetailsKey2.text = kony.i18n.getLocalizedString("i18n.WireTransfer.IBAN");
                    this.view.rtxBankDetailsValue2.text = payeeObject.IBAN;
                } else {
                    this.view.lblBankDetailsKey2.text = kony.i18n.getLocalizedString("i18n.WireTransfer.internationalRoutingCode") + " :";
                    this.view.rtxBankDetailsValue2.text = payeeObject.internationalRoutingCode
                }
                this.view.lblBankDetailsKey1.text = kony.i18n.getLocalizedString("i18n.accounts.swiftCode") + " :";
                this.view.rtxBankDetailsValue1.text = payeeObject.swiftCode;
            }
            this.view.btnCancelConfirmDetails.onClick = onCancel ? onCancel : function() {
                scopeObj.getWireTransferModule().presentationController.showMakeTransferRecipientList();
            };
          this.view.btnCancelConfirmDetails.toolTip = kony.i18n.getLocalizedString('i18n.transfers.Cancel');
          this.view.btnModify.onClick = this.modifyWireTransfer.bind(this, makeTransferData);
          this.view.btnModify.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Modify");
          this.view.btnConfirm.onClick = this.onMakeTransfer.bind(this, makeTransferData);
          this.view.btnConfirm.toolTip = kony.i18n.getLocalizedString('i18n.common.confirmTransaction');
          this.view.forceLayout();
          var mainheight = this.view.flxHeader.info.frame.height + this.view.flxConfirmDetailsMain.info.frame.height - 100;
          this.view.flxFooter.top = mainheight + "dp";
          var currBreakpoint = kony.application.getCurrentBreakpoint();
          if (currBreakpoint === 640 || orientationHandler.isMobile) {
                this.view.flxFooter.top = mainheight + 100 + "dp";
          }
            //this.AdjustScreen();
        },
        onInfoClick: function() {
            this.view.ProfileInfo.setVisibility(true);
            this.footerAlignment();
        },

        onInfoClose: function() {
            this.view.ProfileInfo.setVisibility(false);
            this.footerAlignment();
        },
        footerAlignment: function () {
            this.view.forceLayout();
            var currBreakpoint = kony.application.getCurrentBreakpoint();
            var mainheight;
            if (currBreakpoint === 640 || orientationHandler.isMobile) {
                mainheight =this.view.flxSuccessMessage.isVisible === true ? this.view.flxSuccessMessage.info.frame.height + this.view.flxHeader.info.frame.height + this.view.flxConfirmDetailsMain.info.frame.height + 150 : this.view.flxHeader.info.frame.height + this.view.flxConfirmDetailsMain.info.frame.height;
            } else {
                mainheight = this.view.flxSuccessMessage.isVisible === true ? this.view.flxSuccessMessage.info.frame.height + this.view.flxHeader.info.frame.height + this.view.flxConfirmDetailsMain.info.frame.height : this.view.flxHeader.info.frame.height + this.view.flxConfirmDetailsMain.info.frame.height - 100;
            }
            this.view.flxFooter.top = mainheight + "dp";
        },
        /**
         * Modify Wire Transfer
         */
        modifyWireTransfer: function(makeTransferData) {
            //if(applicationManager.getConfigurationManager().isCombinedUser === "true"){
            if (applicationManager.getUserPreferencesManager().isSingleCustomerProfile === false) {
                makeTransferData.payeeObject.fromAccountNumber = makeTransferData.fromAccountNumber;
                makeTransferData.payeeObject.amount = makeTransferData.amount;
                makeTransferData.payeeObject.transactionsNotes = makeTransferData.reasonForTransfer;
                makeTransferData.payeeObject.isModify = "true";
                makeTransferData.payeeObject.currency = makeTransferData.currency;
                makeTransferData.payeeObject.currencySymbol = makeTransferData.currencySymbol;
                if (makeTransferData.payeeObject.payeeId) {
                    this.getWireTransferModule().presentationController.showMakeTransferForPayee(makeTransferData.payeeObject, makeTransferData.payeeObject, this.onCancel);
                } else {
                    this.getWireTransferModule().presentationController.showMakeTransferForPayee(makeTransferData.payeeObject, null, this.onCancel, "frmWireTransferOneTimePaymentStep3");
                }
            } else {
                if (makeTransferData.payeeObject.payeeId) {
                    // applicationManager.getNavigationManager().navigateTo("frmWireTransferMakeTransfer");
                    var obj = {
                        "context": this,
                        "callbackModelConfig": {
                            "frmWireTransferMakeTransfer": true
                        }
                    };
                    var navManager = kony.mvc.getNavigationManager();
                    navManager.navigate(obj);
                } else {
                    // applicationManager.getNavigationManager().navigateTo("frmWireTransferOneTimePaymentStep3");
                    var obj = {
                        "context": this,
                        "callbackModelConfig": {
                            "frmWireTransferOneTimePaymentStep3": true
                        }
                    };
                    var navManager = kony.mvc.getNavigationManager();
                    navManager.navigate(obj);
                }
            }
        },
        /**
         * onClick listener for make transfer on confirmation flex
         */
        onMakeTransfer: function(transferData) {
            this.disableTnC();
            //var transferData = this.getWireTransferData();
            this.getWireTransferModule().presentationController.authorizeWireTransfer(transferData);
        },
        disableTnC: function() {
            this.view.flxAgree.setVisibility(false);
            CommonUtilities.enableButton(this.view.btnConfirm);
        },
        /**
         * UI logic for showing confirmation screen for make transfer
         */
        showMakeTransferConfirmationUI: function() {
            //this.resetUI();
            this.view.flxRow4.setVisibility(false);
            this.view.flxTransactionDetails.setVisibility(true);
            this.view.flxSuccessMessage.setVisibility(true);
            this.view.flxPrint.setVisibility(false);
            this.view.flxDownload.setVisibility(false);
            this.view.flxSuccessMessage.setVisibility(false);
            this.view.flxbuttons.setVisibility(false);
            this.view.lblAddAccountHeading.text = kony.i18n.getLocalizedString("i18n.WireTransfer.makeTransferConfirm");
            this.view.btnModify.setVisibility(true);
            this.view.btnModify.text = kony.i18n.getLocalizedString('i18n.transfers.Modify');
            this.view.flxStep2Buttons.setVisibility(true);
            this.view.btnCancel.setVisibility(true);
            this.view.flxTermsAndConditions.setVisibility(false);
            this.view.flxSuccessMessage.setVisibility(false);
            this.view.flxHeader.setFocus(true);
            this.view.flxRecipientDetails.info.frame.height = this.view.flxBankDetails.info.frame.height;
            this.view.forceLayout();
        },
    };
});