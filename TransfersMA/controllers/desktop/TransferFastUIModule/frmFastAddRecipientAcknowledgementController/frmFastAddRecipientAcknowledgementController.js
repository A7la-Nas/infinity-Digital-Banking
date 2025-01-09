define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants'], function (FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants) {
     
    return {
        init: function () {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function () { };
            this.view.onBreakpointChange = this.onBreakpointChange;
            var scopeObj = this;
            scopeObj.transfersFastPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule").presentationController;
        },
        preShow: function () {
            this.view.customheadernew.activateMenu("FASTTRANSFERS", "Add Infinity Accounts");
            this.view.forceLayout();
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader', 'flxFooter']);
        },
        postShow: function () {
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
        },
        onBreakpointChange: function (form, width) {
            var scope = this;
            FormControllerUtility.setupFormOnTouchEnd(width);
           
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
            if (viewModel.showAddAcknowledgement) {
                this.showAddAcknowledgement(viewModel.showAddAcknowledgement);
            }
            if (viewModel.showEditAcknowledgement) {
                this.showEditAcknowledgement(viewModel.showEditAcknowledgement);
            }
        },
        /**
         * show acknowledgement screen
         * @param {Object} viewModel contains added account details
         */
        showAddAcknowledgement: function (data) {
            var scopeObj = this;
            scopeObj.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.FastTransfers.AddPersonToPersonRecipient");
            CommonUtilities.setText(scopeObj.view.lblTransfers, kony.i18n.getLocalizedString("i18n.FastTransfers.AddPersonToPersonRecipient"), CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblSuccessMessage, data.name + " " + kony.i18n.getLocalizedString("i18n.common.HasBeenAddedSuccessfully"), CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.btnAddRecipient, kony.i18n.getLocalizedString("i18n.PayAPerson.AddAnotherRecipient"), CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.btnNewTransfer, kony.i18n.getLocalizedString("i18n.hamburger.transfer"), CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblRefrenceNumberValue, data.PayPersonId, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblAckRecipientNameValue, data.name, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblAckRecipientNicknameValue, data.nickName, CommonUtilities.getaccessibilityConfig());
            if (data.phone) {
                CommonUtilities.setText(scopeObj.view.lblAckPhoneOrEmailKey, kony.i18n.getLocalizedString("i18n.ProfileManagement.PhoneNumbers"), CommonUtilities.getaccessibilityConfig());
                CommonUtilities.setText(scopeObj.view.lblAckPhoneOrEmailValue, data.phone, CommonUtilities.getaccessibilityConfig());
            } else {
                CommonUtilities.setText(scopeObj.view.lblAckPhoneOrEmailKey, kony.i18n.getLocalizedString("i18n.ProfileManagement.EmailId"), CommonUtilities.getaccessibilityConfig());
                CommonUtilities.setText(scopeObj.view.lblAckPhoneOrEmailValue, data.email, CommonUtilities.getaccessibilityConfig());
            }
            scopeObj.view.btnAddRecipient.toolTip = kony.i18n.getLocalizedString("i18n.PayAPerson.AddAnotherRecipient");
            scopeObj.view.btnNewTransfer.toolTip = kony.i18n.getLocalizedString("i18n.hamburger.transfer");
            scopeObj.view.btnAddRecipient.onClick = function () {
                scopeObj.transfersFastPresentationController.showTransferScreen({
                    showRecipientGateway: true
                });
            };
            scopeObj.view.btnNewTransfer.onClick = function () {
                scopeObj.transfersFastPresentationController.showTransferScreen({
                    accountTo: data.PayPersonId,
                    displayName: data.name
                });
            };
        },
        /**
         * show edited recipient acknowledgement screen
         * @param {Object} viewModel contains edited recipient details
         */
        showEditAcknowledgement: function (data) {
            var scopeObj = this;
            scopeObj.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.PayAPerson.EditRecipient");
            CommonUtilities.setText(scopeObj.view.lblTransfers, kony.i18n.getLocalizedString("i18n.billPay.Edit") + " " + data.name, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblSuccessMessage, data.name + " " + kony.i18n.getLocalizedString("i18n.FastTransfers.hasbeensuccessfullyedited"), CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.btnAddRecipient, kony.i18n.getLocalizedString("i18n.topmenu.accounts"), CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.btnNewTransfer, kony.i18n.getLocalizedString("i18n.PayAPerson.ManageRecipient"), CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblRefrenceNumberValue, data.PayPersonId, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblAckRecipientNameValue, data.name, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblAckRecipientNicknameValue, data.nickName, CommonUtilities.getaccessibilityConfig());
            if (data.phone) {
                CommonUtilities.setText(scopeObj.view.lblAckPhoneOrEmailKey, kony.i18n.getLocalizedString("i18n.ProfileManagement.PhoneNumbers"), CommonUtilities.getaccessibilityConfig());
                CommonUtilities.setText(scopeObj.view.lblAckPhoneOrEmailValue, data.phone, CommonUtilities.getaccessibilityConfig());
            } else {
                CommonUtilities.setText(scopeObj.view.lblAckPhoneOrEmailKey, kony.i18n.getLocalizedString("i18n.ProfileManagement.EmailId"), CommonUtilities.getaccessibilityConfig());
                CommonUtilities.setText(scopeObj.view.lblAckPhoneOrEmailValue, data.email, CommonUtilities.getaccessibilityConfig());
            }
            scopeObj.view.btnAddRecipient.toolTip = kony.i18n.getLocalizedString("i18n.topmenu.accounts");
            scopeObj.view.btnNewTransfer.toolTip = kony.i18n.getLocalizedString("i18n.PayAPerson.ManageRecipient");
            scopeObj.view.btnAddRecipient.onClick = function () {
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "AccountsUIModule",
                    "appName": "HomepageMA"
                }).presentationController.showAccountsDashboard();
            };
            scopeObj.view.btnNewTransfer.onClick = function () {
                scopeObj.transfersFastPresentationController.showRecipients();
            };
        }
    };
});