define(['commonUtilities', 'OLBConstants', 'ViewConstants', 'FormControllerUtility', 'CampaignUtility'], function (commonUtilities, OLBConstants, ViewConstants, FormControllerUtility, CampaignUtility) {
     
    return {
        init: function () {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function () { };
            this.view.onBreakpointChange = this.onBreakpointChange;
            var scopeObj = this;
            this.view.btnAddAccountKA.toolTip = kony.i18n.getLocalizedString("i18n.common.proceed");
            this.view.btnCancelKA.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
            this.view.lblAccountHeader.toolTip = kony.i18n.getLocalizedString("i18n.FastTransfers.AddDBXAccount");
            this.view.lblAddKonyAccount.toolTip = kony.i18n.getLocalizedString("i18n.FastTransfers.AddExternalAccount");
            this.view.lblAddNonKonyAccount.toolTip = kony.i18n.getLocalizedString("i18n.FastTransfers.AddInternationalAccount");
            this.view.lblP2PSettings.toolTip = kony.i18n.getLocalizedString("i18n.FastTransfers.ViewPersonToPersonSettings");
            this.view.lblDeactivateP2P.toolTip = kony.i18n.getLocalizedString("i18n.p2p.deactivateP2pTitle");
            scopeObj.transfersFastPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule").presentationController;
            scopeObj.view.flxAddaccountHeader.onClick = function () {
                scopeObj.transfersFastPresentationController.showTransferScreen({
                    initialView: "addDBXAccount"
                });
            };
            scopeObj.view.flxAddKonyAccount.onClick = function () {
                scopeObj.transfersFastPresentationController.showTransferScreen({
                    initialView: "addExternalAccount"
                });
            };
            scopeObj.view.flxAddNonKonyAccount.onClick = function () {
                scopeObj.transfersFastPresentationController.showTransferScreen({
                    initialView: "addInternationalAccount"
                });
            };
            scopeObj.view.flxDeactivateP2P.onClick = function () {
                scopeObj.transfersFastPresentationController.showTransferScreen({
                    deactivateRecipient: true
                });
            };
            scopeObj.view.flxP2PSettings.onClick = function () {
                scopeObj.transfersFastPresentationController.fetchP2PdataSettings(kony.application.getCurrentForm().id);
            };
            scopeObj.view.flxNUORadioBtn1.onClick = function () {
                scopeObj.view.imgRadioBtn1.src = ViewConstants.IMAGES.RADIO_BUTTON_ACTIVE;
                scopeObj.view.imgRadioBtn2.src = ViewConstants.IMAGES.RADIO_BTN_INACTIVE;
                scopeObj.view.flxPhoneNumberKA.isVisible = true;
                scopeObj.view.flxEmailAddressKA.isVisible = false;
                scopeObj.view.tbxEmailAddressKA.text = "";
                FormControllerUtility.disableButton(scopeObj.view.btnAddAccountKA);
                scopeObj.view.forceLayout();
            };
            scopeObj.view.flxNUORadioBtn2.onClick = function () {
                scopeObj.view.imgRadioBtn1.src = ViewConstants.IMAGES.RADIO_BTN_INACTIVE;
                scopeObj.view.imgRadioBtn2.src = ViewConstants.IMAGES.RADIO_BUTTON_ACTIVE;
                scopeObj.view.flxPhoneNumberKA.isVisible = false;
                scopeObj.view.flxEmailAddressKA.isVisible = true;
                scopeObj.view.tbxPhoneNumberKA.text = "";
                FormControllerUtility.disableButton(scopeObj.view.btnAddAccountKA);
                scopeObj.view.forceLayout();
            };
        },
        preShow: function () {
            this.view.customheadernew.activateMenu("FASTTRANSFERS", "Add Infinity Accounts");
            this.view.flxDowntimeWarning.setVisibility(false);
            CampaignUtility.fetchPopupCampaigns();
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader', 'flxFooter', 'flxMain']);
        },
        postShow: function () {
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
        },
        showInternalAccFlx: function () {
            this.view.flxAddaccountHeader.setVisibility(true);
        },
        hideInternalAccFlx: function () {
            this.view.flxAddaccountHeader.setVisibility(false);
        },
        showExternalAccFlx: function () {
            this.view.flxAddKonyAccount.setVisibility(true);
        },
        hideExternalAccFlx: function () {
            this.view.flxAddKonyAccount.setVisibility(false);
        },
        showInternationalAccFlx: function () {
            this.view.flxAddNonKonyAccount.setVisibility(true);
        },
        hideInternationalAccFlx: function () {
            this.view.flxAddNonKonyAccount.setVisibility(false);
        },
        showP2PManageSettingFlx: function () {
            this.view.flxP2PSettings.setVisibility(true);
        },
        hideP2PManageSettingFlx: function () {
            this.view.flxP2PSettings.setVisibility(false);
        },
        showP2PDeactivateFlx: function () {
            this.view.flxDeactivateP2P.setVisibility(true);
        },
        hideP2PDeactivateFlx: function () {
            this.view.flxDeactivateP2P.setVisibility(false);
        },
        onBreakpointChange: function (form, width) {
            var scope = this;
            FormControllerUtility.setupFormOnTouchEnd(width);
           
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            this.view.deletePopup.onBreakpointChangeComponent(scope.view.deletePopup, width);
        },
        updateFormUI: function (viewModel) {
            if (viewModel.isLoading === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (viewModel.isLoading === false) {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.initialView) {
                this.resetAddRecipient();
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
        checkIsValidInput: function () {
            var scopeObj = this;
            var validationUtilityManager = applicationManager.getValidationUtilManager();
            var name = scopeObj.view.tbxRecipientNameKA.text.trim();
            if (name !== undefined && name !== null && name !== "") {
                if (scopeObj.view.flxPhoneNumberKA.isVisible) {
                    var phone = scopeObj.view.tbxPhoneNumberKA.text.trim();
                    if (phone !== "" && validationUtilityManager.isValidPhoneNumber(phone) && phone.length == 10) {
                        FormControllerUtility.enableButton(scopeObj.view.btnAddAccountKA);
                    } else {
                        FormControllerUtility.disableButton(scopeObj.view.btnAddAccountKA);
                    }
                } else {
                    var email = scopeObj.view.tbxEmailAddressKA.text.trim();
                    if (email !== "" && validationUtilityManager.isValidEmail(email)) {
                        FormControllerUtility.enableButton(scopeObj.view.btnAddAccountKA);
                    } else {
                        FormControllerUtility.disableButton(scopeObj.view.btnAddAccountKA);
                    }
                }
            } else {
                FormControllerUtility.disableButton(scopeObj.view.btnAddAccountKA);
            }
        },
        addNewRecipient: function (params) {
            var scopeObj = this;
            var data = {
                "name": commonUtilities.changedataCase(this.view.tbxRecipientNameKA.text.trim()),
                "nickName": commonUtilities.changedataCase(this.view.tbxAccountNickNameKA.text.trim())
            };
            if (scopeObj.view.flxPhoneNumberKA.isVisible) {
                data["phone"] = scopeObj.view.tbxPhoneNumberKA.text;
                data["primaryContactForSending"] = scopeObj.view.tbxPhoneNumberKA.text;
            } else {
                data["email"] = scopeObj.view.tbxEmailAddressKA.text;
                data["primaryContactForSending"] = scopeObj.view.tbxEmailAddressKA.text;
            }
            if (scopeObj.view.btnAddAccountKA.text === kony.i18n.getLocalizedString("i18n.common.proceed")) {
                scopeObj.transfersFastPresentationController.addP2PRecipient({
                    addP2P: data
                });
            } else {
                data["PayPersonId"] = params.PayPersonId;
                scopeObj.transfersFastPresentationController.editP2PRecipient(data);
            }
        },
        resetAddRecipient: function () {
            var scopeObj = this;
            scopeObj.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.FastTransfers.AddPersonToPersonRecipient");
            commonUtilities.setText(scopeObj.view.lblTransfers, kony.i18n.getLocalizedString("i18n.FastTransfers.AddPersonToPersonRecipient"), commonUtilities.getaccessibilityConfig());
            commonUtilities.setText(scopeObj.view.btnAddAccountKA, kony.i18n.getLocalizedString("i18n.common.proceed"), commonUtilities.getaccessibilityConfig());
            scopeObj.view.tbxRecipientNameKA.text = "";
            scopeObj.view.tbxAccountNickNameKA.text = "";
            scopeObj.view.tbxPhoneNumberKA.text = "";
            scopeObj.view.tbxEmailAddressKA.text = "";
            scopeObj.view.imgRadioBtn1.src = ViewConstants.IMAGES.RADIO_BTN_INACTIVE;
            scopeObj.view.imgRadioBtn2.src = ViewConstants.IMAGES.RADIO_BTN_INACTIVE;
            scopeObj.view.btnAddAccountKA.setEnabled(false);
            scopeObj.view.btnAddAccountKA.skin = ViewConstants.SKINS.BLOCKED;
            scopeObj.view.btnAddAccountKA.hoverSkin = ViewConstants.SKINS.BLOCKED;
            scopeObj.view.btnAddAccountKA.focusSkin = ViewConstants.SKINS.BLOCKED;
            scopeObj.view.flxPhoneNumberKA.setVisibility(false);
            scopeObj.view.flxEmailAddressKA.setVisibility(false);
            scopeObj.view.flxAddAccountWindow.setVisibility(true);
            scopeObj.view.flxP2PWindow.top = "20px";
            scopeObj.view.btnAddAccountKA.onClick = function () {
                scopeObj.addNewRecipient();
            };
            scopeObj.view.btnCancelKA.onClick = function () {
                scopeObj.transfersFastPresentationController.showTransferScreen({
                    showRecipientGateway: true
                });
            };
            scopeObj.view.forceLayout();
        },
        editDetails: function (data) {
            var scopeObj = this;
            scopeObj.view.flxAddAccountWindow.setVisibility(false);
            scopeObj.view.flxP2PWindow.top = "0px";
            scopeObj.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.PayAPerson.EditRecipient");
            commonUtilities.setText(scopeObj.view.lblTransfers, kony.i18n.getLocalizedString("i18n.billPay.Edit") + " " + data.name, commonUtilities.getaccessibilityConfig());
            scopeObj.view.tbxRecipientNameKA.text = data.name
            if (data.nickName) {
                scopeObj.view.tbxAccountNickNameKA.text = data.nickName;
            }
            if (data.phone !== null) {
                scopeObj.view.imgRadioBtn1.src = ViewConstants.IMAGES.RADIO_BUTTON_ACTIVE;
                scopeObj.view.flxPhoneNumberKA.isVisible = true;
                scopeObj.view.tbxPhoneNumberKA.text = data.phone;
            } else {
                scopeObj.view.imgRadioBtn2.src = ViewConstants.IMAGES.RADIO_BUTTON_ACTIVE;
                scopeObj.view.flxEmailAddressKA.isVisible = true;
                scopeObj.view.tbxEmailAddressKA.text = data.email;
            }
            commonUtilities.setText(scopeObj.view.btnAddAccountKA, kony.i18n.getLocalizedString("i18n.ProfileManagement.Save"), commonUtilities.getaccessibilityConfig());
            scopeObj.view.btnAddAccountKA.setEnabled(true);
            scopeObj.view.btnAddAccountKA.skin = ViewConstants.SKINS.NORMAL;
            scopeObj.view.btnAddAccountKA.hoverSkin = ViewConstants.SKINS.HOVER;
            scopeObj.view.btnAddAccountKA.focusSkin = ViewConstants.SKINS.FOCUS;
            scopeObj.view.btnAddAccountKA.onClick = function () {
                scopeObj.addNewRecipient(data);
            };
            scopeObj.view.btnCancelKA.onClick = function () {
                applicationManager.getNavigationManager().navigateTo("frmFastManagePayee");
            };
            scopeObj.view.forceLayout();
        }
    };
});