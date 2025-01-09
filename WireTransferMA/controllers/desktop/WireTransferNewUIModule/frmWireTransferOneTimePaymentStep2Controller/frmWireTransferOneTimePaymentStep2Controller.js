define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants', 'IBANUtils'], function(FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants, IBANUtils) {
     
    var exData;
    return {
        updateFormUI: function(context) {
            if (context.isLoading) {
                FormControllerUtility.showProgressBar(this.view);
            } else {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (context.resetForm) {
                this.resetUI();
            }
            if (context.data) {
                exData = context.data;
                this.showOneTimeTransferAccountDetailsForm(context.data, context.states);
            }
        },
        resetUI: function() {
            this.view.flxPrint.setVisibility(false);
            this.view.flxDownload.setVisibility(false);
            this.view.flxDowntimeWarning.setVisibility(false);
            this.view.rtxDowntimeWarning.setVisibility(false);
        },
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
        },
        onBreakpointChange: function(form, width) {
            var scope = this;
            this.view.CustomPopupLogout.onBreakpointChangeComponent(scope.view.CustomPopupLogout, width);
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            FormControllerUtility.setupFormOnTouchEnd(width);
             
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
        },
        preShow: function() {
            this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxRightBar', 'flxMain', 'wireTransferRightbar.flxInfo']);
            this.setInitialActions();
        },
        postShow: function() {
            this.view.customheadernew.activateMenu("Wire Transfer", "Make One Time Payment");
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
        },
        /**
         * Binds initial widget actions - Should be called from pre show
         */
        setInitialActions: function() {
            var scopeObj = this;
            this.view.wireTransferRightbar.flxInfo.onClick = this.showOneTimeTransferInfo.bind(this);
            this.view.AllFormsConfirmDetails.flxCross.onClick = function() {
                scopeObj.view.AllFormsConfirmDetails.setVisibility(false);
            };
            this.setOneTimeTransferValidationActions();
        },
        /**
         * Shows I-icon for one time transfer
         */
        showOneTimeTransferInfo: function() {
            var scopeObj = this;
            if (scopeObj.view.AllFormsConfirmDetails.isVisible === false) {
                scopeObj.view.AllFormsConfirmDetails.isVisible = true;
                scopeObj.view.AllFormsConfirmDetails.left = scopeObj.view.flxRightBar.info.frame.x + scopeObj.view.wireTransferRightbar.flxInfo.info.frame.x - 135 + "dp";
                scopeObj.view.AllFormsConfirmDetails.RichTextInfo.text = kony.i18n.getLocalizedString("i18n.WireTransfer.msgInfo2OneTime");
                if (scopeObj.view.wireTransferRightbar.flxAccountInfoForAccountTransfer.isVisible === true) scopeObj.view.AllFormsConfirmDetails.top = scopeObj.view.flxRightBar.info.frame.height - 80 + "dp";
                else scopeObj.view.AllFormsConfirmDetails.top = scopeObj.view.flxRightBar.info.frame.height - 10 + "dp";
                scopeObj.view.forceLayout();
            } else scopeObj.view.AllFormsConfirmDetails.isVisible = false;
        },
        getWireTransferNewModule: function() {
            return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule", "appName"
            : "WireTransferMA"});
        },
        /**
         * Show One time transfer step 2
         * @param {function} [onCancel] Optional Listener for on cancel
         */
        showOneTimeTransferAccountDetailsForm: function(data, states, onCancel) {
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            this.resetOneTimeTransferForms();
            this.view.lbxBankState.masterData = states;
            this.ShowAllStep2();
            this.view.tbxAccountNumber.onBeginEditing = this.hideErrorFlexOTT.bind(this);
            this.view.tbxReAccountNumber.onBeginEditing = this.hideErrorFlexOTT.bind(this);
            if (data.wireAccountType === OLBConstants.WireTransferConstants.ACCOUNT_DOMESTIC) {
                this.view.lblSwiftCode.text = kony.i18n.getLocalizedString("i18n.accounts.routingNumber")
                this.view.tbxSwiftCode.placeholder = kony.i18n.getLocalizedString("i18n.AddExternalAccount.EnterRoutingNumber")
                this.view.lblIBANOrIRC.setVisibility(false);
                this.view.tbxIBANOrIRC.setVisibility(false);
            } else {
                this.view.lblSwiftCode.text = kony.i18n.getLocalizedString("i18n.accounts.swiftCode");;
                this.view.tbxSwiftCode.placeholder = kony.i18n.getLocalizedString("i18n.WireTransfers.EnterSwiftCode")
                this.view.lblIBANOrIRC.setVisibility(true);
                this.view.tbxIBANOrIRC.setVisibility(true);
                if (IBANUtils.isCountrySupportsIBAN(data.country)) {
                    this.view.lblIBANOrIRC.setVisibility(true);
                    this.view.tbxIBANOrIRC.setVisibility(true);
                    this.view.lblIBANOrIRC.text = kony.i18n.getLocalizedString("i18n.WireTransfers.InternationalBankAccountNumberBAN")
                    this.view.tbxIBANOrIRC.placeholder = kony.i18n.getLocalizedString("i18n.WireTransfers.EnterInternationalBankAccountNumber")
                } else {
                    this.view.lblIBANOrIRC.text = kony.i18n.getLocalizedString("i18n.WireTransfer.internationalRoutingCode"); //TODO i18n
                    this.view.tbxIBANOrIRC.placeholder = kony.i18n.getLocalizedString("i18n.WireTransfers.EnterInternationalRoutingCode"); //TODO i18n
                }
            }
            this.view.btnStep2Proceed.onClick = function() {
                if (this.validateOTTForm()) {
                    var step2Data = this.getOTTRecipientAccountFormData();
                    var payeeData = Object.assign(data, step2Data);
                    this.getWireTransferNewModule().presentationController.showMakeTransferForPayee(payeeData, null, onCancel, "frmWireTransferOneTimePaymentStep3");
                }
            }.bind(this);
            this.view.btnBack.onClick = this.showStep1.bind(this);
            this.view.btnStep2Cancel.onClick = this.showConfirmDialog.bind(this, "i18n.PayAPerson.Quit", "i18n.wireTransfer.cancelOneTimeTransfer", onCancel, "i18n.common.noDontCancel", "i18n.transfers.Cancel");
            this.checkOTTRecipientAccountDetailForm.bind(this);
            this.view.forceLayout();
        },
        /**
         * Toggles the visibility of Row in account details page based data its passes
         * @return {boolean} True if vlid and false will not valid
         */
        validateOTTForm: function() {
            var data = this.getOTTRecipientAccountFormData();
            if (data.payeeAccountNumber !== data.accountNumberConfirm) {
                this.showErrorForAccountFieldsOTT();
                return false;
            }
            this.hideErrorFlexOTT();
            return true;
        },
        /**
         * Navigate to Step1
         */

        showStep1: function() {
            // applicationManager.getNavigationManager().navigateTo("frmWireTransferOneTimePaymentStep1");
            var obj = {
                "context": this,
                "callbackModelConfig": {
                    "frmWireTransferOneTimePaymentStep1": true
                }
            };
            var navManager = kony.mvc.getNavigationManager();
            navManager.navigate(obj);
        },
        /**
         * Validates recipient account details form in OTT
         */
        checkOTTRecipientAccountDetailForm: function() {
            var formData = this.getOTTRecipientAccountFormData();
            if (formData.swiftCode === "" ||
                formData.payeeAccountNumber === "" ||
                formData.accountNumberConfirm === "" ||
                formData.payeeNickName === "" ||
                formData.bankName === "" ||
                formData.bankAddressLine1 === "" ||
                formData.bankCity === "" ||
                formData.bankZip === "" || 
                formData.bankState === "" ||
                (this.view.tbxIBANOrIRC.isVisible && formData.IBAN === "")) {
                FormControllerUtility.disableButton(this.view.btnStep2Proceed);
            } else {
                FormControllerUtility.enableButton(this.view.btnStep2Proceed);
            }
        },
        /**
         * Get Recipient Account Details for One time transfer (Step 2 data)
         * @member frmWireTransferController
         * @returns {JSON} - JSON for data
         */
        getOTTRecipientAccountFormData: function() {
            return {
                payeeNickName: this.view.tbxNickName.text.trim(),
                routingCode: this.view.tbxSwiftCode.text.trim(),
                swiftCode: this.view.tbxSwiftCode.text.trim(),
                IBAN: this.view.tbxIBANOrIRC.text.trim(),
                internationalRoutingCode: this.view.tbxIBANOrIRC.text.trim(),
                payeeAccountNumber: this.view.tbxAccountNumber.text.trim(),
                accountNumberConfirm: this.view.tbxReAccountNumber.text.trim(),
                recipientReasonForTransfer: this.view.tbxReason.text.trim(),
                bankName: this.view.tbxBankName.text.trim(),
                bankAddressLine1: this.view.tbxBankAddressLine1.text.trim(),
                bankAddressLine2: this.view.tbxBankAddressLine2.text.trim(),
                bankCity: this.view.tbxBankCity.text.trim(),
                bankState: this.view.lbxBankState.selectedKeyValue ? this.view.lbxBankState.selectedKeyValue[1] : "",
                bankZip: this.view.tbxBankZipcode.text.trim()
            }
        },
        /**
         * Show Confirm Dialog
         * @param {string} headingKey  - i18n of heading
         * @param {string} messaogeKey  - i18n of message
         * @param {function} onYesPressed  - callback for yes button
         * @param {string} noBtnTooltip  - i18n for tooltip
         * @param {string} yesBtnTooltip - i18n of tooltip
         */
        showConfirmDialog: function(headingKey, messageKey, onYesPressed, noBtnTooltip, yesBtnTooltip) {
            this.view.flxDialogs.setVisibility(true);
            this.view.flxPopup.setVisibility(true);
            var height = this.view.flxHeader.info.frame.height + this.view.flxMain.info.frame.height + this.view.flxFooter.info.frame.height;
            this.view.flxPopup.height = height + "dp";
            this.view.CustomPopup.setFocus(true);
            if (noBtnTooltip) {
                this.view.CustomPopup.btnNo.toolTip = kony.i18n.getLocalizedString(noBtnTooltip);
            } else {
                this.view.CustomPopup.btnNo.toolTip = kony.i18n.getLocalizedString("i18n.common.no");
            }
            if (yesBtnTooltip) {
                this.view.CustomPopup.btnYes.toolTip = kony.i18n.getLocalizedString(yesBtnTooltip);
            } else {
                this.view.CustomPopup.btnYes.toolTip = kony.i18n.getLocalizedString("i18n.common.yes");
            }
            this.view.CustomPopup.lblHeading.text = kony.i18n.getLocalizedString(headingKey);
            this.view.CustomPopup.lblPopupMessage.text = kony.i18n.getLocalizedString(messageKey);
            this.view.forceLayout();
            //Quit Pop-Up Message Box
            this.view.CustomPopup.flxCross.onClick = function() {
                this.view.flxDialogs.setVisibility(false);
                this.view.flxPopup.setVisibility(false);
            }.bind(this);
            this.view.CustomPopup.btnNo.onClick = function() {
                this.view.flxDialogs.setVisibility(false);
                this.view.flxPopup.setVisibility(false);
            }.bind(this);
            this.view.CustomPopup.btnYes.onClick = function() {
                this.view.flxDialogs.setVisibility(false);
                this.view.flxPopup.setVisibility(false);
                if (onYesPressed !== undefined || typeof onYesPressed === "function")
                    onYesPressed();
                else
                    this.enableCancel();
                this.disableTnC();
            }.bind(this);
        },
        enableCancel: function() {
            this.getWireTransferNewModule().presentationController.showMakeTransferRecipientList();
        },
        disableTnC: function() {
            CommonUtilities.enableButton(this.view.btnConfirm);
        },
        /**
         * Resets one time transfer form.
         */
        resetOneTimeTransferForms: function() {
            this.view.tbxSwiftCode.text = "";
            this.view.tbxIBANOrIRC.text = "";
            this.view.tbxAccountNumber.text = "";
            this.view.tbxReason.text = "";
            this.view.tbxReAccountNumber.text = "";
            this.view.tbxNickName.text = "";
            this.view.tbxBankName.text = "";
            this.view.tbxBankAddressLine1.text = "";
            this.view.tbxBankAddressLine2.text = "";
            this.view.tbxBankCity.text = "";
            this.view.tbxBankZipcode.text = "";
            FormControllerUtility.disableButton(this.view.btnStep2Proceed);
        },
        /**
         * Show errros for account number in OTT
         */
        showErrorForAccountFieldsOTT: function() {
            this.view.flxError.setVisibility(true);
            this.view.tbxAccountNumber.skin = ViewConstants.SKINS.SKNTXTSSP424242BORDERFF0000OP100RADIUS2PX;
            this.view.tbxReAccountNumber.skin = ViewConstants.SKINS.SKNTXTSSP424242BORDERFF0000OP100RADIUS2PX;
        },
        /**
         * Hide errros for account number in OTT
         */
        hideErrorFlexOTT: function() {
            this.view.tbxAccountNumber.skin = ViewConstants.SKINS.SKNTBXLAT0FFFFFF15PXBORDER727272OPA20;
            this.view.tbxReAccountNumber.skin = ViewConstants.SKINS.SKNTBXLAT0FFFFFF15PXBORDER727272OPA20;
            this.view.flxError.setVisibility(false);
        },
        /**
         * Binds initial validations actions on text fields of OTT - Should be called from pre show
         */
        setOneTimeTransferValidationActions: function() {
            this.view.tbxSwiftCode.onKeyUp = this.checkOTTRecipientAccountDetailForm.bind(this);
            this.view.tbxAccountNumber.onKeyUp = this.checkOTTRecipientAccountDetailForm.bind(this);
            this.view.tbxReAccountNumber.onKeyUp = this.checkOTTRecipientAccountDetailForm.bind(this);
            this.view.tbxNickName.onKeyUp = this.checkOTTRecipientAccountDetailForm.bind(this);
            this.view.tbxBankName.onKeyUp = this.checkOTTRecipientAccountDetailForm.bind(this);
            this.view.tbxBankAddressLine1.onKeyUp = this.checkOTTRecipientAccountDetailForm.bind(this);
            this.view.tbxBankAddressLine2.onKeyUp = this.checkOTTRecipientAccountDetailForm.bind(this);
            this.view.tbxBankCity.onKeyUp = this.checkOTTRecipientAccountDetailForm.bind(this);
            this.view.tbxBankZipcode.onKeyUp = this.checkOTTRecipientAccountDetailForm.bind(this);
            this.view.tbxIBANOrIRC.onKeyUp = this.checkOTTRecipientAccountDetailForm.bind(this);
        },
        /**
         * Resets all the fields of step 2 OTT
         */
        ShowAllStep2: function() {
            this.view.flxSwiftCode.setVisibility(true);
            this.view.flxAccountNumber.setVisibility(true);
            this.view.flxReAccountNumber.setVisibility(true);
            this.view.flxNickName.setVisibility(true);
            this.view.flxBankName.setVisibility(true);
            this.view.flxBankAddress1.setVisibility(true);
            this.view.flxBankCityStateZipcode.setVisibility(true);
        },

    };
});