define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants', 'CampaignUtility'], function (FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants, CampaignUtility) {
     
    return {
        /**
         * inital actions
         */
        init: function () {
            var combineduser = applicationManager.getConfigurationManager().isCombinedUser === "true";
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function () { };
            this.view.onBreakpointChange = this.onBreakpointChange;
            var scopeObj = this;
            this.view.btnAddAccountKA.toolTip = kony.i18n.getLocalizedString("i18n.common.proceed");
            this.view.btnCancelKA.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
            this.view.btnSave.toolTip = kony.i18n.getLocalizedString("i18n.ProfileManagement.Save");
            this.view.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
            this.view.lblAccountHeader.toolTip = kony.i18n.getLocalizedString("i18n.FastTransfers.AddExternalAccount");
            this.view.lblAddKonyAccount.toolTip = kony.i18n.getLocalizedString("i18n.FastTransfers.AddInternationalAccount");
            this.view.lblAddNonKonyAccount.toolTip = kony.i18n.getLocalizedString("i18n.FastTransfers.AddPersonToPersonRecipient");
            this.restrictSpecialCharacters();
            scopeObj.transfersFastPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule").presentationController;
            scopeObj.view.flxAddaccountHeader.onClick = function () {
                scopeObj.transfersFastPresentationController.showTransferScreen({
                    initialView: "addExternalAccount"
                });
            };
            scopeObj.view.flxAddKonyAccount.onClick = function () {
                scopeObj.transfersFastPresentationController.showTransferScreen({
                    initialView: "addInternationalAccount"
                });
            };
            scopeObj.view.flxAddNonKonyAccount.onClick = function () {
                scopeObj.transfersFastPresentationController.showTransferScreen({
                    initialView: "addRecipient"
                });
            };
            scopeObj.view.btnCancelKA.onClick = function () {
                scopeObj.transfersFastPresentationController.showTransferScreen({
                    showRecipientGateway: true
                });
            };
            scopeObj.view.btnCancelAccount.onClick = function () {
                scopeObj.transfersFastPresentationController.showTransferScreen({
                    showRecipientGateway: true
                });
            };
            scopeObj.view.btnAddAccountKA.onClick = function () {
                if (combineduser) {
                    if (scopeObj.validateData()) {
                        scopeObj.view.flxAddDBXAccount.setVisibility(false);
                        scopeObj.view.flxDBXAccountType.setVisibility(true);
                    }
                } else {
                    scopeObj.addDBXAccount();
                }
            };
            scopeObj.view.btnConfirm.onClick = function () {
                scopeObj.addDBXAccount();
            };
            scopeObj.view.btnModify.onClick = function () {
                scopeObj.view.flxAddDBXAccount.setVisibility(true);
                scopeObj.view.flxDBXAccountType.setVisibility(false);
            };
            scopeObj.view.lblBtnPersonal.onTouchStart = function () {
                scopeObj.view.lblBtnPersonal.text = "M";
                scopeObj.view.lblBtnBusiness.text = "L";
            };
            scopeObj.view.lblBtnBusiness.onTouchStart = function () {
                scopeObj.view.lblBtnPersonal.text = "L";
                scopeObj.view.lblBtnBusiness.text = "M";
            };
        },
        onBreakpointChange: function (form, width) {
            var scope = this;
            FormControllerUtility.setupFormOnTouchEnd(width);
           
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            this.view.deletePopup.onBreakpointChangeComponent(scope.view.deletePopup, width);
        },
        /**
         * updateFormUI - the entry point method for the form controller.
         * @param {Object} viewModel - it contains the set of view properties and keys.
         */
        updateFormUI: function (viewModel) {
            if (viewModel.isLoading === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (viewModel.isLoading === false) {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.initialView) {
                this.resetAddDBXAccount();
            }
            if (viewModel.editDetails) {
                this.editDetails(viewModel.editDetails);
            }
            if (viewModel.serverError) {
                this.view.rtxDowntimeWarning.text = viewModel.serverError;
                this.view.flxDowntimeWarning.setVisibility(true);
                this.view.flxFormContent.forceLayout();
            }
            if (viewModel.campaign) {
                CampaignUtility.showCampaign(viewModel.campaign, this.view, "flxMain");
            }
        },
        /**
         * preshow actions
         */
        preShow: function () {
            this.view.customheadernew.activateMenu("FASTTRANSFERS", "Add Infinity Accounts");
            this.view.flxDowntimeWarning.setVisibility(false);
            this.view.flxAccountTypeKA.setVisibility(false);
            this.view.flxAddDBXAccount.setVisibility(true);
            this.view.flxDBXAccountType.setVisibility(false);
            CampaignUtility.fetchPopupCampaigns();
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader', 'flxFooter', 'flxMain']);
            this.view.btnConfirm.toolTip = kony.i18n.getLocalizedString("i18n.common.confirm");
            this.view.btnModify.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Modify");
            this.view.btnCancelAccount.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
        },
        /**
         * postshow actions
         */
        postShow: function () {
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            applicationManager.executeAuthorizationFramework(this);
        },
        showExternalAccFlx: function () {
            this.view.flxAddaccountHeader.setVisibility(true);
        },
        hideExternalAccFlx: function () {
            this.view.flxAddaccountHeader.setVisibility(false);
        },
        showInternationalAccFlx: function () {
            this.view.flxAddKonyAccount.setVisibility(true);
        },
        hideInternationalAccFlx: function () {
            this.view.flxAddKonyAccount.setVisibility(false);
        },
        showP2PAccFlx: function () {
            this.view.flxSperator2.setVisibility(true);
            this.view.flxAddNonKonyAccount.setVisibility(true);
        },
        hideP2PAccFlx: function () {
            this.view.flxSperator2.setVisibility(false);
            this.view.flxAddNonKonyAccount.setVisibility(false);
        },
        /**
         * Method to restrict Special Characters entry in textbox
         */
        restrictSpecialCharacters: function () {
            var scopeObj = this;
            var specialCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\";
            var alphabetsSet = "abcdefghijklmnopqrstuvwxyz";
            scopeObj.view.tbxAccountNumberKA.restrictCharactersSet = specialCharactersSet + alphabetsSet + alphabetsSet.toUpperCase();
            scopeObj.view.tbxAccountNumberAgainKA.restrictCharactersSet = specialCharactersSet + alphabetsSet + alphabetsSet.toUpperCase();
        },
        /**
         * Validates the account detail fields
         */
        validateDBXAccountFields: function () {
            var data = {
                "accountNumber": this.view.tbxAccountNumberKA.text.trim(),
                "reAccountNumber": this.view.tbxAccountNumberAgainKA.text.trim(),
                "beneficiaryName": this.view.tbxBeneficiaryNameKA.text.trim(),
                "nickName": this.view.tbxAccountNickNameKA.text.trim()
            };
            if (data.accountNumber.length > 18 || data.reAccountNumber.length > 18 || data.beneficiaryName === null || data.accountNumber === "" || data.reAccountNumber === "" || data.beneficiaryName === "") {
                FormControllerUtility.disableButton(this.view.btnAddAccountKA);
            } else {
                FormControllerUtility.enableButton(this.view.btnAddAccountKA);
            }
        },
        /**
        validating accountnumber entered
        **/
        validateData: function () {
            var scopeObj = this;
            if (isNaN(scopeObj.view.tbxAccountNumberKA.text.trim()) || !(scopeObj.view.tbxAccountNumberAgainKA.text.trim() === scopeObj.view.tbxAccountNumberKA.text.trim())) {
                scopeObj.view.tbxAccountNumberKA.skin = ViewConstants.SKINS.BORDER;
                scopeObj.view.tbxAccountNumberAgainKA.skin = ViewConstants.SKINS.BORDER;
                scopeObj.view.btnAddAccountKA.skin = ViewConstants.SKINS.BLOCKED;
                scopeObj.view.btnAddAccountKA.hoverSkin = ViewConstants.SKINS.BLOCKED;
                scopeObj.view.btnAddAccountKA.focusSkin = ViewConstants.SKINS.BLOCKED;
                scopeObj.view.btnAddAccountKA.setEnabled(false);
                if (isNaN(scopeObj.view.tbxAccountNumberKA.text.trim())) {
                    errMsg = kony.i18n.getLocalizedString("i18n.transfers.accNumNotAlphanumeric");
                } else {
                    errMsg = kony.i18n.getLocalizedString("i18n.transfers.accNoDoNotMatch");
                }
                scopeObj.errorInternal({
                    "errorInternal": errMsg
                });
                return false;
            } else {
                scopeObj.view.tbxAccountNumberKA.skin = ViewConstants.SKINS.ACCOUNT_NUMBER_TEXTBOX;
                scopeObj.view.tbxAccountNumberAgainKA.skin = ViewConstants.SKINS.ACCOUNT_NUMBER_TEXTBOX;
                scopeObj.view.btnAddAccountKA.skin = ViewConstants.SKINS.NORMAL;
                scopeObj.view.btnAddAccountKA.hoverSkin = ViewConstants.SKINS.HOVER;
                scopeObj.view.btnAddAccountKA.focusSkin = ViewConstants.SKINS.FOCUS;
                scopeObj.view.btnAddAccountKA.setEnabled(true);
                scopeObj.view.lblWarning.setVisibility(false);
                return true;
            }
        },
        /**
         * Sends the account data for confirmation
         */
        addDBXAccount: function () {
            var scopeObj = this;
            var smeUser = applicationManager.getConfigurationManager().isSMEUser === "true";
            var combinedUser = applicationManager.getConfigurationManager().isCombinedUser === "true";
            var data = {
                "bankName": "Infinity",
                "accountNumber": scopeObj.view.tbxAccountNumberKA.text.trim(),
                "reAccountNumber": scopeObj.view.tbxAccountNumberAgainKA.text.trim(),
                "accountType": scopeObj.view.lbxAccountTypeKA.selectedKeyValue[1],
                "beneficiaryName": CommonUtilities.changedataCase(scopeObj.view.tbxBeneficiaryNameKA.text.trim()),
                "nickName": scopeObj.view.tbxAccountNickNameKA.text.trim() ? CommonUtilities.changedataCase(scopeObj.view.tbxAccountNickNameKA.text.trim()) : "",
                "isBusinessPayee": smeUser ? "1" : (combinedUser ? (scopeObj.view.lblBtnPersonal.text === "M" ? "0" : "1") : "0")
            };
            var errMsg;
            if ((data.nickName === null || data.nickName === "") && (data.beneficiaryName !== null || data.beneficiaryName !== "")) {
                data.nickName = data.beneficiaryName;
            }
            if (!(data.accountNumber === data.reAccountNumber)) {
                scopeObj.view.tbxAccountNumberKA.skin = ViewConstants.SKINS.BORDER;
                scopeObj.view.tbxAccountNumberAgainKA.skin = ViewConstants.SKINS.BORDER;
                scopeObj.view.btnAddAccountKA.skin = ViewConstants.SKINS.BLOCKED;
                scopeObj.view.btnAddAccountKA.hoverSkin = ViewConstants.SKINS.BLOCKED;
                scopeObj.view.btnAddAccountKA.focusSkin = ViewConstants.SKINS.BLOCKED;
                scopeObj.view.btnAddAccountKA.setEnabled(false);
                errMsg = kony.i18n.getLocalizedString("i18n.transfers.accNoDoNotMatch");
                scopeObj.errorInternal({
                    "errorInternal": errMsg
                });
            } else {
                scopeObj.view.tbxAccountNumberKA.skin = ViewConstants.SKINS.ACCOUNT_NUMBER_TEXTBOX;
                scopeObj.view.tbxAccountNumberAgainKA.skin = ViewConstants.SKINS.ACCOUNT_NUMBER_TEXTBOX;
                scopeObj.view.btnAddAccountKA.skin = ViewConstants.SKINS.NORMAL;
                scopeObj.view.btnAddAccountKA.hoverSkin = ViewConstants.SKINS.HOVER;
                scopeObj.view.btnAddAccountKA.focusSkin = ViewConstants.SKINS.FOCUS;
                scopeObj.view.btnAddAccountKA.setEnabled(true);
                scopeObj.view.lblWarning.setVisibility(false);
                scopeObj.transfersFastPresentationController.addDBXAccount(data);
            }
            scopeObj.view.forceLayout();
        },
        /**
         * Resets the Account fields
         */
        resetAddDBXAccount: function () {
            var scopeObj = this;
            scopeObj.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.FastTransfers.AddDBXAccount");
            CommonUtilities.setText(scopeObj.view.lblTransfers, kony.i18n.getLocalizedString("i18n.FastTransfers.AddDBXAccount"), CommonUtilities.getaccessibilityConfig());
            scopeObj.view.flxAddDBXAccount.setVisibility(true);
            scopeObj.view.flxEditDBXAccount.setVisibility(false);
            scopeObj.view.tbxAccountNumberKA.skin = ViewConstants.SKINS.ACCOUNT_NUMBER_TEXTBOX;
            scopeObj.view.tbxAccountNumberAgainKA.skin = ViewConstants.SKINS.ACCOUNT_NUMBER_TEXTBOX;
            scopeObj.view.tbxAccountNumberKA.hoverSkin = ViewConstants.SKINS.ACCOUNT_NUMBER_TEXTBOX;
            scopeObj.view.tbxAccountNumberAgainKA.hoverSkin = ViewConstants.SKINS.ACCOUNT_NUMBER_TEXTBOX;
            scopeObj.view.tbxAccountNumberKA.text = "";
            scopeObj.view.tbxBeneficiaryNameKA.text = "";
            scopeObj.view.tbxAccountNickNameKA.text = "";
            scopeObj.view.tbxAccountNumberAgainKA.text = "";
            scopeObj.view.lblWarning.setVisibility(false);
            scopeObj.view.btnAddAccountKA.skin = ViewConstants.SKINS.BLOCKED;
            scopeObj.view.btnAddAccountKA.hoverSkin = ViewConstants.SKINS.BLOCKED;
            scopeObj.view.btnAddAccountKA.focusSkin = ViewConstants.SKINS.BLOCKED;
            scopeObj.view.btnAddAccountKA.setEnabled(false);
            scopeObj.view.forceLayout();
        },
        /**
         * edit the account details
         */
        editDetails: function (data) {
            var scopeObj = this;
            scopeObj.view.flxAddDBXAccount.setVisibility(false);
            scopeObj.view.flxEditDBXAccount.setVisibility(true);
            scopeObj.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.PayAPerson.EditRecipient");
            CommonUtilities.setText(scopeObj.view.lblTransfers, kony.i18n.getLocalizedString("i18n.billPay.Edit") + " " + (data.lblAccountName ? data.lblAccountName.text : data.beneficiaryName), CommonUtilities.getaccessibilityConfig());
            scopeObj.view.btnSave.skin = ViewConstants.SKINS.NORMAL;
            scopeObj.view.btnSave.hoverSkin = ViewConstants.SKINS.HOVER;
            scopeObj.view.btnSave.focusSkin = ViewConstants.SKINS.FOCUS;
            scopeObj.view.btnSave.setEnabled(true);
            scopeObj.view.tbxAccountNumber.text = data.txtAccountNumber ? data.txtAccountNumber.text : data.accountNumber;
            scopeObj.view.tbxAccountNumberAgain.text = data.txtAccountNumber ? data.txtAccountNumber.text : data.accountNumber;
            scopeObj.view.tbxAccountType.text = data.txtAccountType ? data.txtAccountType.text : data.accountType;
            scopeObj.view.tbxBeneficiaryName.text = data.lblAccountName ? data.lblAccountName.text : data.beneficiaryName;
            scopeObj.view.tbxAccountNickName.text = data.txtAccountName ? data.txtAccountName.text : data.nickName;
            scopeObj.view.tbxAccountNumber.setEnabled(false);
            scopeObj.view.tbxAccountNumberAgain.setEnabled(false);
            scopeObj.view.tbxAccountType.setEnabled(false);
            scopeObj.view.tbxBeneficiaryName.onKeyUp = function () {
                if (scopeObj.view.tbxBeneficiaryName.text === "" || scopeObj.view.tbxBeneficiaryName.text === null || scopeObj.view.tbxBeneficiaryName.text === undefined) {
                    FormControllerUtility.disableButton(scopeObj.view.btnSave);
                } else {
                    FormControllerUtility.enableButton(scopeObj.view.btnSave);
                }
            }
            scopeObj.view.btnCancel.onClick = function () {
                applicationManager.getNavigationManager().navigateTo("frmFastManagePayee", undefined, {
                    "refreshComponent": false,
                    "showPreviousTab": true
                });
            };
            scopeObj.view.btnSave.onClick = function () {
                scopeObj.saveChangedAccountDetails(data);
            };
            scopeObj.view.forceLayout();
        },
        /**
         * send the edited info to backend
         */
        saveChangedAccountDetails(data) {
            var scopeObj = this;
            scopeObj.view.tbxBeneficiaryName.skin = ViewConstants.SKINS.ACCOUNT_NUMBER_TEXTBOX;
            var params = {
                "bankName": data.lblBankName ? data.lblBankName : data.bankName,
                "accountNumber": data.txtAccountNumber ? data.txtAccountNumber.text : data.accountNumber,
                "accountType": data.txtAccountType ? data.txtAccountType.text : data.accountType,
                "oldName": data.lblAccountName ? data.lblAccountName.text : data.beneficiaryName,
                "beneficiaryName": CommonUtilities.changedataCase(scopeObj.view.tbxBeneficiaryName.text.trim()),
                "nickName": scopeObj.view.tbxAccountNickName.text.trim() ? CommonUtilities.changedataCase(scopeObj.view.tbxAccountNickName.text.trim()) : "",
                "isSameBankAccount": data.isSameBankAccount,
                "isInternationalAccount": data.isInternationalAccount,
                "payeeId": data.Id
            };
            if ((params.nickName === null || params.nickName === "") && (params.beneficiaryName !== null || params.beneficiaryName !== "")) {
                params.nickName = params.beneficiaryName;
            }
            scopeObj.transfersFastPresentationController.saveChangedAccountDetails(params);
        },
        /**
         * shows the internal error
         * @param {object} response error response
         */
        errorInternal: function (response) {
            var scopeObj = this;
            CommonUtilities.setText(scopeObj.view.lblWarning, response.errorInternal, CommonUtilities.getaccessibilityConfig());
            scopeObj.view.lblWarning.setVisibility(true);
            scopeObj.view.forceLayout();
        }
    };
});