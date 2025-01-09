define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants'], function(FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants) {
     
    var extData;
    // var editPayeeData;
    return {
        editPayeeData: null,
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
                extData = context.data;
                this.showDomesticAccountDetailsForm(context.states, context.modify);
            }
            if (context.editPayee) {
                editPayeeData = context.editPayee;
                this.editRecipientAccountDetails(context.editPayee, context.modify);
            }
            if (context.contracts) {
                this.setContractsData(context.contracts);
            }
        },
        resetUI: function() {
            this.view.flxPrint.setVisibility(false);
            this.view.flxDownload.setVisibility(false);
            this.view.flxDowntimeWarning.setVisibility(false);
            this.view.rtxDowntimeWarning.setVisibility(false);
            this.view.flxAddRecipientsWindow.setVisibility(true);
            this.view.flxAddRecepientTo.setVisibility(false);
            this.view.forceLayout();

        },
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.flxAddRecipientsWindow.setVisibility(true);
            this.view.flxAddRecepientTo.setVisibility(false);
            this.restrictSpecialCharacters();
        },
        onBreakpointChange: function(form, width) {
            var scope = this;
            this.view.CustomPopupLogout.onBreakpointChangeComponent(scope.view.CustomPopupLogout, width);
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            FormControllerUtility.setupFormOnTouchEnd(width);
             
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
        },
        getWireTransferNewModule: function() {
            return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule", "appName"
            : "WireTransferMA"});
        },
        preShow: function() {
            this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
            this.view.btnInternationalAccount.setEnabled(true);
            this.view.btnDomesticAccount.setEnabled(true);
            this.setInitialActions();
            this.view.flxAddRecipientsWindow.setVisibility(true);
            this.view.flxAddRecepientTo.setVisibility(false);
            // this.setStateForDomesticInternationalTabButton();
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxRightBar', 'flxMain', 'wireTransferRightbar', 'wireTransferRightbar.flxInfo', 'wireTransferRightbar.flxAddAccountWindow']);
            this.view.contractList.setVisibility(false);
            this.view.flxMainWrapper.setVisibility(true);
        },
        postShow: function() {
            this.view.customheadernew.activateMenu("WIRE TRANSFER", "Add Recipient");
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            applicationManager.executeAuthorizationFramework(this);
        },
        showInternationalTab: function() {
            this.view.btnInternationalAccount.setVisibility(true);
        },
        hideInternationalTab: function() {
            this.view.btnInternationalAccount.setVisibility(false);
        },
        /**
         * Shows Add Button based on Configurations
         */
        setStateForDomesticInternationalTabButton: function() {
            if (applicationManager.getConfigurationManager().isInternationalWireTransferEnabled === "false") {
                this.view.btnInternationalAccount.skin = "sknbtnfbfbfbBottomBordere3e3e3csr";
                this.view.btnInternationalAccount.setEnabled(false);
            } else {
                this.view.btnInternationalAccount.setEnabled(true);
            }
            if (applicationManager.getConfigurationManager().isDomesticWireTransferEnabled === "false") {
                this.view.btnDomesticAccount.skin = "sknbtnfbfbfbBottomBordere3e3e3csr";
                this.view.btnDomesticAccount.setEnabled(false);
            } else {
                this.view.btnDomesticAccount.skin = "sknBtnAccountSummarySelected";
                this.view.btnDomesticAccount.setEnabled(true);
            }
        },
        /**
         * Shows Domestic recipient add form - step 2
         * @param {function} [onCancel] Optional Listener for cancewl button
         */
        showDomesticAccountDetailsForm: function(states, modify, onCancel) {
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            this.view.flxTabs.setVisibility(true);
            this.view.lblAddAccountHeading.text = kony.i18n.getLocalizedString('i18n.PayAPerson.AddRecipient');
            if (!modify) this.resetAddRecipientForms();
            this.hideErrorFlexAddRecipient();
            this.view.tbxAccountNumber.onBeginEditing = this.hideErrorFlexAddRecipient.bind(this);
            this.view.tbxReAccountNumber.onBeginEditing = this.hideErrorFlexAddRecipient.bind(this);
            this.view.lbxBankState.masterData = states;
            this.view.btnBack.onClick = this.showStep1.bind(this);
            this.view.btnAddRecipent.text = kony.i18n.getLocalizedString('i18n.PayAPerson.AddRecipient');
            this.view.btnStep2Cancel.onClick = this.showConfirmDialog.bind(this, "i18n.PayAPerson.Quit", "i18n.wireTransfers.cancelAddRecipient", onCancel, "i18n.common.noDontCancel", "i18n.transfers.Cancel");
            // this.view.btnAddRecipent.onClick = this.addRecipient.bind(this,onCancel,this.editPayeeData);
            this.view.btnAddRecipent.onClick = this.getContracts.bind(this, modify, true);
            /*  if (this.validateAddRecipientForm()) {
                    var wireTransferNewModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
                    wireTransferNewModule.presentationController.showWireTransferAddRecipientConfirmScreen(this.getFullRecipientData(), this.editPayeeData)
                }
            }.bind(this);
               if(applicationManager.getConfigurationManager().isCombinedUser === "true"){
               this.goToAddRecepientDetails();
              }else{
                this.verifyAndAdd.bind();
              }*/

        },
        /**
         * Resets the fields of add recipient form.
         */
        resetAddRecipientForms: function() {
            this.view.tbxSwiftCode.text = "";
            this.view.tbxIBANOrIRC.text = "";
            this.view.tbxAccountNumber.text = "";
            this.view.tbxReAccountNumber.text = "";
            this.view.tbxNickName.text = "";
            this.view.tbxBankName.text = "";
            this.view.tbxBankAddressLine1.text = "";
            this.view.tbxBankAddressLine2.text = "";
            this.view.tbxBankCity.text = "";
            this.view.tbxBankZipcode.text = "";
            FormControllerUtility.disableButton(this.view.btnAddRecipent);
            this.view.forceLayout();
        },
        editRecipientAccountDetails: function(context, modify, onCancel) {
            var edit = true;
            FormControllerUtility.enableButton(this.view.btnAddRecipent);
            extData.payeeId = context.payee.payeeId;
            var OLBConstants = applicationManager.getConfigurationManager().OLBConstants;
            var scopeObj = this;
            this.view.flxTabs.setVisibility(false);
            this.view.btnAddRecipent.text = kony.i18n.getLocalizedString('i18n.PayAPerson.EditRecipient');
            this.view.btnAddRecipent.toolTip = kony.i18n.getLocalizedString("i18n.PayAPerson.EditRecipient");
            this.view.lblAddAccountHeading.text = kony.i18n.getLocalizedString('i18n.PayAPerson.EditRecipient');
            this.view.tbxSwiftCode.placeholder = kony.i18n.getLocalizedString("i18n.AddExternalAccount.EnterRoutingNumber");
            this.view.lblIBANOrIRC.setVisibility(false);
            this.view.tbxIBANOrIRC.setVisibility(false);
            if (!modify) {
                this.view.tbxSwiftCode.text = context.payee.routingCode;
                this.view.lblSwiftCode.text = kony.i18n.getLocalizedString("i18n.accounts.routingNumber");
                this.view.tbxAccountNumber.text = context.payee.accountNumber;
                this.view.tbxReAccountNumber.text = context.payee.accountNumber;
                this.view.tbxNickName.text = context.payee.payeeNickName;
                this.view.tbxBankName.text = context.payee.bankName;
                this.view.tbxBankAddressLine1.text = context.payee.bankAddressLine1;
                this.view.tbxBankAddressLine2.text = context.payee.bankAddressLine2;
                this.view.tbxBankCity.text = context.payee.bankCity;
                this.view.lbxBankState.selectedKey = context.payee.bankState;
                this.view.tbxBankZipcode.text = context.payee.bankZip;
            }
            this.view.lblPersonalBankingSelect.text = context.payee.isBusinessPayee === "0" ? "M" : "L";
            this.view.btnStep2Cancel.onClick = this.showConfirmDialog.bind(this, "i18n.PayAPerson.Quit", "i18n.wireTransfers.cancelEditRecipient", onCancel, "i18n.common.noDontCancel", "i18n.transfers.Cancel");
            //             this.view.btnStep2Cancel.onClick = function() {
            //                 this.getWireTransferNewModule().presentationController.showMakeTransferRecipientList();
            //             }.bind(this);
            this.view.btnAddRecipent.onClick = this.getContracts.bind(this, modify, false);
            /* if (this.validateAddRecipientForm()) {
                    var wireTransferNewModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
                    wireTransferNewModule.presentationController.showWireTransferAddRecipientConfirmScreen(this.getFullRecipientData(), edit)
                }
            }.bind(this);
              if(applicationManager.getConfigurationManager().isCombinedUser === "true"){
               this.goToAddRecepientDetails.bind(this);
              }else{
                this.verifyAndAdd.bind(this);
              }
            };*/
            this.view.forceLayout();
        },

        addRecipient: function(onCancel, edit) {
            //if(applicationManager.getConfigurationManager().isCombinedUser === "true"){
            if (applicationManager.getUserPreferencesManager().isSingleCustomerProfile === false) {
                if (this.validateAddRecipientForm()) {
                    if (edit === true) {
                        this.verifyAndAdd(edit);
                    } else {
                        this.goToAddRecepientDetails(onCancel, edit);
                    }
                }
            } else {
                this.verifyAndAdd(edit);
            }
        },

        verifyAndAdd: function(edit) {
            var scopeObj = this;
            //this.vavalidateAddRecipientForm();
            // var b =  this.validateAddRecipientForm();
            if (scopeObj.validateAddRecipientForm()) {
                var wireTransferNewModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
                wireTransferNewModule.presentationController.showWireTransferAddRecipientConfirmScreen(this.getFullRecipientData(), edit);
            }

        },

        restrictSpecialCharacters: function() {
            var scopeObj = this;
            var specialCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\";
            var spaceSet = " ";
            var alphabetsSet = "abcdefghijklmnopqrstuvwxyz";
            var numericSet = "0123456789";

            scopeObj.view.tbxBankZipcode.restrictCharactersSet = specialCharactersSet + spaceSet;
            scopeObj.view.tbxSwiftCode.restrictCharactersSet = specialCharactersSet;
            scopeObj.view.tbxAccountNumber.restrictCharactersSet = specialCharactersSet;
            scopeObj.view.tbxReAccountNumber.restrictCharactersSet = specialCharactersSet;
            scopeObj.view.tbxNickName.restrictCharactersSet = specialCharactersSet.replace("!@#&*_'-.,", '');
            scopeObj.view.tbxBankName.restrictCharactersSet = specialCharactersSet.replace("!@#&*_'-.,", '');
            // scopeObj.view.tbxBankAddressLine1.restrictCharactersSet = specialCharactersSet.replace("!@#&*_'-.,", '');    ARB-25075
            // scopeObj.view.tbxBankAddressLine2.restrictCharactersSet = specialCharactersSet.replace("!@#&*_'-.,", '');    ARB-25075
            scopeObj.view.tbxBankCity.restrictCharactersSet = specialCharactersSet.replace("!@#&*_'-.,", '') + numericSet;
        },
        /**
         * Navigate to confirm screen
         */
        showConfirmScreen: function() {
            var wireTransferNewModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
            wireTransferNewModule.presentationController.showWireTransferAddRecipientConfirmScreen({
                landingPageView: "addRecipient"
            })
        },
        /**
         * Navigate to Step1
         */
        showStep1: function() {
            // applicationManager.getNavigationManager().navigateTo("frmWireTransferAddKonyAccountStep1");
            var obj = {
                "context": this,
                "callbackModelConfig": {
                    "frmWireTransferAddKonyAccountStep1": true
                }
            };
            var navManager = kony.mvc.getNavigationManager();
            navManager.navigate(obj);
        },
        /**
         * Returns the complete data for recipient
         * @returns {object} - Containing details of recipient  details
         */
        getFullRecipientData: function() {
            if (this.cif) {
                extData.cif = this.cif;
            }
            return {
                recipientDetails: extData,
                recipientAccountDetails: this.getRecipientAccountFormData(),
                contractsData: this.view.contractList.segContract.data
            }
        },
        /**
         * Returns the account details of recipient in key value pairs.
         * @returns {Object} details of account of recipient
         */
        getRecipientAccountFormData: function() {
            var scope = this;
            var isBusinessPayeeValue;
            if (applicationManager.getConfigurationManager().isSMEUser === "true") {
                isBusinessPayeeValue = "1";
            }
            if (applicationManager.getConfigurationManager().isRBUser === "true") {
                isBusinessPayeeValue = "0";
            }
            //if(applicationManager.getConfigurationManager().isCombinedUser === "true") {
            if (applicationManager.getUserPreferencesManager().isSingleCustomerProfile === false) {
                isBusinessPayeeValue = this.view.lblPersonalBankingSelect.text === "M" ? "0" : "1";
            }
            return {
                payeeNickName: this.view.tbxNickName.text.trim(),
                routingCode: this.view.tbxSwiftCode.text.trim(),
                swiftCode: this.view.tbxSwiftCode.text.trim(),
                IBAN: this.view.tbxIBANOrIRC.text.trim(),
                internationalRoutingCode: this.view.tbxIBANOrIRC.text.trim(),
                payeeAccountNumber: this.view.tbxAccountNumber.text.trim(),
                accountNumberConfirm: this.view.tbxReAccountNumber.text.trim(),
                bankName: this.view.tbxBankName.text.trim(),
                bankAddressLine1: this.view.tbxBankAddressLine1.text.trim(),
                bankAddressLine2: scope.view.tbxBankAddressLine2.text ? scope.view.tbxBankAddressLine2.text.trim() : "",
                bankCity: this.view.tbxBankCity.text.trim(),
                bankState: this.view.lbxBankState.selectedKeyValue !== null ? this.view.lbxBankState.selectedKeyValue[1] : null,
                bankZip: this.view.tbxBankZipcode.text.trim(),
                isBusinessPayee: isBusinessPayeeValue
            }
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
            this.view.btnInternationalAccount.onClick = this.onAddInternationalAccount.bind(this);
            this.setDomesticAddFormValidationActions();
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
        /**
         * Right Bar Add International Account Listener
         */
        onAddInternationalAccount: function() {
            var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
            wireTransferModule.presentationController.showWireTransferInternationalStep1({
                landingPageView: "addRecipientInternational"
            })
        },
        /**
         * Binds Field Validation actions for add recipient scenario
         */
        setDomesticAddFormValidationActions: function() {
            this.view.tbxSwiftCode.onKeyUp = this.checkAddRecipientAccountDetailForm.bind(this);
            this.view.tbxAccountNumber.onKeyUp = this.checkAddRecipientAccountDetailForm.bind(this);
            this.view.tbxReAccountNumber.onKeyUp = this.checkAddRecipientAccountDetailForm.bind(this);
            this.view.tbxNickName.onKeyUp = this.checkAddRecipientAccountDetailForm.bind(this);
            this.view.tbxBankName.onKeyUp = this.checkAddRecipientAccountDetailForm.bind(this);
            this.view.tbxBankAddressLine1.onKeyUp = this.checkAddRecipientAccountDetailForm.bind(this);
            //this.view.tbxBankAddressLine2.onKeyUp = this.checkAddRecipientAccountDetailForm.bind(this);
            this.view.tbxBankCity.onKeyUp = this.checkAddRecipientAccountDetailForm.bind(this);
            this.view.tbxBankZipcode.onKeyUp = this.checkAddRecipientAccountDetailForm.bind(this);
            this.view.tbxIBANOrIRC.onKeyUp = this.checkAddRecipientAccountDetailForm.bind(this);
        },
        /**
         * Validates domestic recipient account details form
         */
        checkAddRecipientAccountDetailForm: function() {
            var formData = this.getRecipientAccountFormData();
            if (formData.swiftCode === "" || formData.payeeAccountNumber === "" || formData.accountNumberConfirm === "" || formData.payeeNickName === "" || formData.bankName === "" || formData.bankAddressLine1 === "" || formData.bankCity === "" || formData.bankZip === "" || (this.view.tbxIBANOrIRC.isVisible && formData.IBAN === "")) {
                FormControllerUtility.disableButton(this.view.btnAddRecipent);
            } else {
                FormControllerUtility.enableButton(this.view.btnAddRecipent);
            }
        },
        /**
         * Toggles the visibility of Row in account details page based data its passes
         * @param {object}  rowObject in format {rowId: 'id of the row', left: {key: 'i18n', value: 'value'}, right: {key: 'i18n', value: 'value'}}
         * @return {void} None
         */
        validateAddRecipientForm: function() {
            var data = this.getRecipientAccountFormData();
            if (isNaN(data.payeeAccountNumber.trim())) {
                this.showErrorForAccountFields(kony.i18n.getLocalizedString("i18n.transfers.accNumNotAlphanumeric"));
                return false;
            } else if (!(data.payeeAccountNumber.trim() === data.accountNumberConfirm.trim())) {
                this.showErrorForAccountFields(kony.i18n.getLocalizedString("i18n.transfers.accNoDoNotMatch"));
                return false;
            }
            this.hideErrorFlexAddRecipient();
            return true;
        },
        /**
         * Show Error for account fields for add recipient
         */
        showErrorForAccountFields: function(errMsg) {
            this.view.lblError.text = errMsg;
            this.view.flxError.setVisibility(true);
            this.view.tbxAccountNumber.skin = ViewConstants.SKINS.SKNTXTSSP424242BORDERFF0000OP100RADIUS2PX;
            this.view.tbxReAccountNumber.skin = ViewConstants.SKINS.SKNTXTSSP424242BORDERFF0000OP100RADIUS2PX;
        },
        /**
         * Hides Error for account fields for add recipient
         */
        hideErrorFlexAddRecipient: function() {
            this.view.tbxAccountNumber.skin = ViewConstants.SKINS.SKNTBXLAT0FFFFFF15PXBORDER727272OPA20;
            this.view.tbxReAccountNumber.skin = ViewConstants.SKINS.SKNTBXLAT0FFFFFF15PXBORDER727272OPA20;
            this.view.flxError.setVisibility(false);
        },
        disableTnC: function() {
            CommonUtilities.enableButton(this.view.btnConfirm);
        },
        enableCancel: function() {
            this.editPayeeData = null;
            this.getWireTransferNewModule().presentationController.showMakeTransferRecipientList();
        },

        goToAddRecepientDetails: function(onCancel, edit) {
            var scopeObj = this;
            scopeObj.view.flxAddRecipientsWindow.setVisibility(false);
            scopeObj.view.flxAddRecepientTo.setVisibility(true);
            scopeObj.radioButtonClick();
            scopeObj.view.btnRecepientBack.onClick = function() {
                scopeObj.view.flxAddRecipientsWindow.setVisibility(true);
                scopeObj.view.flxAddRecepientTo.setVisibility(false);
            };
            scopeObj.view.btnRecepientCancel.onClick = this.showConfirmDialog.bind(this, "i18n.PayAPerson.Quit", "i18n.wireTransfers.cancelAddRecipient", onCancel, "i18n.common.noDontCancel", "i18n.transfers.Cancel");
            scopeObj.view.btnAddRecepientContinue.onClick = this.verifyAndAdd.bind(this, edit);

        },

        radioButtonClick: function() {
            var scopeObj = this;
            scopeObj.view.lblPersonalBankingSelect.onTouchStart = function() {
                scopeObj.view.lblPersonalBankingSelect.text = "M";
                scopeObj.view.lblBusinessBankingSelect.text = "L";
            };
            scopeObj.view.lblBusinessBankingSelect.onTouchStart = function() {
                scopeObj.view.lblPersonalBankingSelect.text = "L";
                scopeObj.view.lblBusinessBankingSelect.text = "M";
            };
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

        setContractsData: function(contractsData, onCancel) {

            if (contractsData.contracts.length > 0) {
                if (contractsData.contracts.length == 1 && contractsData.contracts[0].contractCustomers.length == 1) {
                    this.view.contractList.segContract.data = [];
                    this.cif = JSON.stringify([{
                        "contractId": contractsData.contracts[0].contractId,
                        "coreCustomerId": contractsData.contracts[0].contractCustomers[0].coreCustomerId
                    }]);
                    this.verifyAndAdd(this.isEdit);
                    this.view.contractList.setVisibility(false);
                    this.view.flxMainWrapper.setVisibility(true);
                } else {
                    this.view.contractList.setVisibility(true);
                    this.view.flxMainWrapper.setVisibility(false);

                    contractsData.isCombinedUser = applicationManager.getUserPreferencesManager().profileAccess == "both" ? true : false;
                    contractsData.action = "DOMESTIC_WIRE_TRANSFER_CREATE"

                    if (this.isEdit) {
                        this.view.contractList.preshow(contractsData, editPayeeData.payee.cif);
                    } else {
                        this.view.contractList.preshow(contractsData);
                    }

                    this.view.contractList.btnAction4.onClick = this.showConfirmDialog.bind(this, "i18n.PayAPerson.Quit", "i18n.wireTransfers.cancelAddRecipient", onCancel, "i18n.common.noDontCancel", "i18n.transfers.Cancel");
                    this.view.contractList.btnAction5.onClick = this.onContractsBackButtonPress.bind(this);
                    this.view.contractList.btnAction6.onClick = this.verifyAndAdd.bind(this, this.isEdit);
                }
            } else {
                 kony.print("Error")
            }
        },

        onContractsBackButtonPress: function() {
            this.view.contractList.setVisibility(false);
            this.view.flxMainWrapper.setVisibility(true);
            this.view.btnAddRecipent.onClick = this.getContracts.bind(this, true, true);
        },

        getContracts: function(modify, isAddFlow) {

            if (!modify) {
                if (this.validateAddRecipientForm()) {
                    isAddFlow == true ? this.isEdit = false : this.isEdit = true;
                    var wireTransferNewModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
                    wireTransferNewModule.presentationController.getContracts("DOMESTIC_WIRE_TRANSFER_CREATE", "frmWireTransferAddKonyAccountStep2");
                }
            } else if (this.cif) {
                this.verifyAndAdd(this.isEdit);
            } else {
                if (this.validateAddRecipientForm()) {
                    isAddFlow == true ? this.isEdit = false : this.isEdit = true;
                    var wireTransferNewModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                        "moduleName": "WireTransferNewUIModule",
                        "appName": "WireTransferMA"
                    });
                    wireTransferNewModule.presentationController.getContracts("DOMESTIC_WIRE_TRANSFER_CREATE", "frmWireTransferAddKonyAccountStep2");
                } else {
                    this.view.contractList.setVisibility(true);
                    this.view.flxMainWrapper.setVisibility(false);
                }
            }
        },

    };
});