define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants', 'IBANUtils'], function(FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants, IBANUtils) {
     
    var exData;
    return {
        updateFormUI: function(context) {
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            if (context.isLoading) {
                FormControllerUtility.showProgressBar(this.view);
            } else {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (context.data) {
                exData = context.data;
                this.confirmAddRecipient(context.data, context.modify, OLBConstants.WireTransferConstants.ACCOUNT_INTERNATIONAL);
            }
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
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxRightBar', 'flxMain', 'flxRecipientDetails', 'flxBankDetails']);
        },
        postShow: function() {
            this.view.customheadernew.activateMenu("WIRE TRANSFER", "Add Recipient");
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
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
         * Shows UI for add recipient Confirmation
         * @param {string} type Type of Recipient International/Domestic
         */
        showAddRecipientConfirmUI: function(type) {
            // this.resetUI();
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            this.view.flxConfirmDetails.setVisibility(true);
            this.view.flxHeader.setFocus(true);
            this.view.lblAddAccountHeading.text = kony.i18n.getLocalizedString("i18n.PayAPerson.AddRecipientConfirmation");
            this.view.lblConfirmHeader.text = kony.i18n.getLocalizedString('i18n.wiretransfers.confirmDetails');
            this.view.flxTransactionDetails.setVisibility(false);
            this.view.flxTermsAndConditions.setVisibility(false);
            this.view.flxSuccessMessage.setVisibility(false);
            this.view.flxbuttons.setVisibility(false);
            this.view.flxRow4.setVisibility(false);
            this.view.flxStep2Buttons.setVisibility(true);
            this.view.flxPrint.setVisibility(false);
            this.view.flxDownload.setVisibility(false);
            this.view.flxSeparator.setVisibility(false);
            this.view.flxRow4.setVisibility(false);
            this.view.flxRecipientDetails.info.frame.height = this.view.flxBankDetails.info.frame.height;
        },
        /**
         * Calls business logic to save recipient.
         * @param {string} type - type of recipient to save domestic/international
         */
        saveRecipient: function(type) {
            if (this.view.flxContractsComponent.isVisible) {
                exData.cif = this.view.screenConfirm.createCIFDataForAddBenificiary(this.view.screenConfirm.segContracts.data);
                exData.cifSegData = this.view.screenConfirm.segContracts.data;
            } else {
                exData.cif = exData.recipientDetails.cif;
            }
            var wireTransferNewModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
            wireTransferNewModule.presentationController.saveWireTransferPayee(exData, type);
        },
        /**
         * Show Confirm Dialog
         * @param {string} headingKey  - i18n of heading
         * @param {string} messageKey  - i18n of message
         * @param {function} onYesPressed  - callback for yes button
         * @param {string} noBtnTooltip  - i18n for tooltip
         * @param {string} yesBtnTooltip - i18n of tooltip
         */
        showConfirmDialog: function(headingKey, messageKey, onYesPressed, noBtnTooltip, yesBtnTooltip) {
            this.view.flxDialogs.setVisibility(true);
            this.view.flxPopup.setVisibility(true);
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
        modifyAddRecipient: function(context, type) {
            // applicationManager.getNavigationManager().navigateTo("frmWireTransferAddInternationalAccountStep1");
            var obj = {
                "context": context,
                "callbackModelConfig": {
                    "frmWireTransferAddInternationalAccountStep1": true
                }
            };
            var navManager = kony.mvc.getNavigationManager();
            navManager.navigate(obj);
        },
        getWireTransferNewModule: function() {
            return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule", "appName"
            : "WireTransferMA"});
        },
        /**
         * Shows data forconfirmation UI
         * @param {Object}  data of add recipient form
         * @param {string}  type of recipient 'domestic'/'international'   
         * @param {function} [onCancel] Optional Listener for cancel
         * @param {function} [onSave] Optional Listener for on save
         * @param {boolean}  disableModify If modify needs to be disabled
         * @returns {void} - None
         */
        confirmAddRecipient: function(data, modify, type, onCancel, onSave, disableModify) {
            var self = this;
          	var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            this.showAddRecipientConfirmUI(type);
            if (modify === true)
                this.view.lblAddAccountHeading.text = kony.i18n.getLocalizedString('i18n.PayAPerson.EditRecipientConfirmation');
            else
                this.view.lblAddAccountHeading.text = kony.i18n.getLocalizedString('i18n.PayAPerson.AddRecipientConfirmation');
            //recipient details
            this.view.lblDetailsKey1.text = kony.i18n.getLocalizedString("i18n.transfers.benificiaryName") + " :";
            this.view.rtxDetailsValue1.text = data.recipientDetails.payeeName;
            this.view.lblDetailsKey2.text = kony.i18n.getLocalizedString('i18n.WireTransfer.recipientType') + " :";
            this.view.rtxDetailsValue2.text = data.recipientDetails.type;
            this.view.lblDetailsKey3.text = kony.i18n.getLocalizedString('i18n.transfers.accountType') + " :";
            this.view.rtxDetailsValue3.text = type;
            this.view.lblDetailsKey4.text = kony.i18n.getLocalizedString('i18n.WireTransfer.RecipientAddress') + " :";
            this.view.rtxDetailsValue4.text = this.returnRecipientAddress(data.recipientDetails)
            //bank details
            this.view.lblBankDetailsKey3.text = kony.i18n.getLocalizedString('i18n.WireTransfer.recipientAccountNumber') + " :";
            this.view.rtxBankDetailsValue3.text = data.recipientAccountDetails.payeeAccountNumber;
            this.view.lblBankDetailsKey5.text = kony.i18n.getLocalizedString('i18n.transfers.accountNickName') + " :";
            this.view.rtxBankDetailsValue5.text = data.recipientAccountDetails.payeeNickName;
            this.view.lblBankDetailsKey6.text = kony.i18n.getLocalizedString('i18n.WireTransfer.recipientBank&Address') + " :";
            this.view.rtxBankDetailsValue6.text = data.recipientAccountDetails.bankAddressLine1;
            this.view.rtxBankDetailsValue6.text = this.returnBankAddress(data.recipientAccountDetails, true);

            //location specific bank details
            if (IBANUtils.isCountrySupportsIBAN(data.recipientDetails.country)) {
                this.view.lblBankDetailsKey2.text = kony.i18n.getLocalizedString('i18n.Accounts.IBAN');
                this.view.rtxBankDetailsValue2.text = data.recipientAccountDetails.IBAN
            } else {
                this.view.lblBankDetailsKey2.text = kony.i18n.getLocalizedString('i18n.WireTransfer.internationalRoutingCode') + " :";
                this.view.rtxBankDetailsValue2.text = data.recipientAccountDetails.internationalRoutingCode
            }
            this.view.lblBankDetailsKey1.text = kony.i18n.getLocalizedString('i18n.accounts.swiftCode') + " :";
            this.view.rtxBankDetailsValue1.text = data.recipientAccountDetails.swiftCode;
            //if(applicationManager.getConfigurationManager().isCombinedUser === "true"){
            if (applicationManager.getUserPreferencesManager().profileAccess === "both") {
                this.view.lblIcon.setVisibility(false);
                this.view.lblIcon.text = data.recipientAccountDetails.isBusinessPayee === "1" ? "r" : "s";
            }
            this.view.btnCancel1.toolTip = kony.i18n.getLocalizedString('i18n.transfers.Cancel');
            this.view.btnConfirm.toolTip = kony.i18n.getLocalizedString('i18n.common.confirmAndAddRecipient');
            if (disableModify) {
                this.view.btnCancel1.setVisibility(false);
                this.view.btnModify.onClick = this.showConfirmDialog.bind(this, "i18n.PayAPerson.Quit", modify ? "i18n.wireTransfers.cancelEditRecipient" : "i18n.wireTransfers.cancelAddRecipient", onCancel, "i18n.common.noDontCancel", "i18n.transfers.Cancel");
                this.view.btnModify.toolTip = kony.i18n.getLocalizedString('i18n.transfers.Cancel');
                this.view.btnModify.text = kony.i18n.getLocalizedString('i18n.transfers.Cancel');
            } else {
                this.view.btnModify.text = kony.i18n.getLocalizedString('i18n.transfers.Modify');
                this.view.btnModify.toolTip = kony.i18n.getLocalizedString('i18n.common.modifyRecipientDetail');
                this.view.btnCancel1.onClick = this.showConfirmDialog.bind(this, "i18n.PayAPerson.Quit", modify ? "i18n.wireTransfers.cancelEditRecipient" : "i18n.wireTransfers.cancelAddRecipient", onCancel, "i18n.common.noDontCancel", "i18n.transfers.Cancel");
                this.view.btnModify.onClick = this.modifyAddRecipient.bind(this, self);
            }
            if (CommonUtilities.isCSRMode()) {
                this.view.btnConfirm.onClick = FormControllerUtility.disableButtonActionForCSRMode();
                this.view.btnConfirm.skin = FormControllerUtility.disableButtonSkinForCSRMode();
                this.view.btnConfirm.hoverSkin = FormControllerUtility.disableButtonSkinForCSRMode();
            } else {
                this.view.btnConfirm.onClick = function() {
                    if (modify === true) {
                        this.editRecipient(type);
                    } else {
                        this.saveRecipient(type);
                    }
                }.bind(this);
            }
            if (data.contractsData && data.contractsData.length > 0) {
                this.view.flxContractsComponent.setVisibility(true)
                this.view.flxStep2ButtonSeperator.width = "100%";
                this.setContractsData(data.contractsData);
            } else {
				this.view.flxStep2ButtonSeperator.width = "96%";
                this.view.flxContractsComponent.setVisibility(false)
            }
        },

        setContractsData: function(data) {
            this.view.screenConfirm.setConfirmScreenContractsData(data);
        },
        /**
         * Calls business logic to edit recipient.
         * @param {string} type - type of recipient to save domestic/international if(modify === "true")
         */
        editRecipient: function(type) {
            if (this.view.flxContractsComponent.isVisible) {
                exData.cif = this.view.screenConfirm.createCIFDataForAddBenificiary(this.view.screenConfirm.segContracts.data);
                exData.cifSegData = this.view.screenConfirm.segContracts.data;
            } else {
                exData.cif = exData.recipientDetails.cif;
            }
            var wireTransferNewModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
            wireTransferNewModule.presentationController.updateRecipient(exData, type);
        },
    };
});