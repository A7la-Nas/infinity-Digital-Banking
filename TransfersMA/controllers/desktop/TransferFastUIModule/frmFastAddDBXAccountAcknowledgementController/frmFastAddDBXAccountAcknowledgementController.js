define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants'], function (FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants) {
     
    return {
        /**
         * updateFormUI - the entry point method for the form controller.
         * @param {Object} viewModel - it contains the set of view properties and keys.
         */
        profileAccess: "",
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
        init: function () {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function () { };
            this.view.onBreakpointChange = this.onBreakpointChange;
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
         * preShow Actions
         */
        preShow: function () {
            var scopeObj = this;
            this.profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
            scopeObj.view.customheadernew.activateMenu("FASTTRANSFERS", "Add Infinity Accounts");
            scopeObj.view.forceLayout();
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader', 'flxFooter']);
        },
        /**
         * postShow Actions
         */
        postShow: function () {
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
        },
        /**
         * show add account acknowledgement screen
         * @param {Object} viewModel contains added account details
         */
        showAddAcknowledgement: function (viewModel) {
            var scopeObj = this;
            var data = viewModel.DBXAccount;
            //var combineduser = applicationManager.getConfigurationManager().isCombinedUser==="true";
            var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
            var orientationHandler = new OrientationHandler();
            var isMobileDevice = ((kony.application.getCurrentBreakpoint() === 640) || orientationHandler.isMobile);
            //if(combineduser){
            if (this.profileAccess === "both") {
                scopeObj.view.flxIcon.setVisibility(true);
                this.view.lblIcon.text = data.isBusinessPayee === "1" ? "r" : "s";
                this.view.lblAckRecipientNameValue.left = isMobileDevice ? "8.5%" : "275dp";
            }
            scopeObj.transfersFastPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule").presentationController;
            scopeObj.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.FastTransfers.AddDBXAccount");
            CommonUtilities.setText(scopeObj.view.lblTransfers, kony.i18n.getLocalizedString("i18n.FastTransfers.AddDBXAccount"), CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblSuccessMessage, data.beneficiaryName + "..." + data.accountNumber.slice(-4) + " " + kony.i18n.getLocalizedString("i18n.common.HasBeenAddedSuccessfully"), CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.btnAddAnotherRecipient, kony.i18n.getLocalizedString("i18n.PayAPerson.AddAnotherRecipient"), CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.btnNewTransfer, kony.i18n.getLocalizedString("i18n.hamburger.transfer"), CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblRefrenceNumberValue, data.referenceNo || data.payeeId, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblAckBankNameValue, data.bankName, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblAckAccNumberValue, data.accountNumber, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblAckAccTypeValue, data.accountType, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblAckRecipientNameValue, data.beneficiaryName, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblAckNickNameValue, data.nickName, CommonUtilities.getaccessibilityConfig());
            scopeObj.view.btnAddAnotherRecipient.toolTip = kony.i18n.getLocalizedString("i18n.PayAPerson.AddAnotherRecipient");
            scopeObj.view.btnNewTransfer.toolTip = kony.i18n.getLocalizedString("i18n.hamburger.transfer");
            scopeObj.view.btnAddAnotherRecipient.onClick = function () {
                scopeObj.transfersFastPresentationController.showTransferScreen({
                    showRecipientGateway: true
                });
            };
            scopeObj.view.btnNewTransfer.onClick = function () {
                var accountTo = {
                    accountTo: data.accountNumber,
                    Id: data.Id,
                    displayName: data.beneficiaryName
                };
                scopeObj.transfersFastPresentationController.showTransferScreen(accountTo);
            };
        },
        /**
         * show edited account acknowledgement screen
         * @param {Object} viewModel contains edited account details
         */
        showEditAcknowledgement: function (data) {
            var scopeObj = this;
            //var combineduser = applicationManager.getConfigurationManager().isCombinedUser==="true";
            var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile
            var orientationHandler = new OrientationHandler();
            var isMobileDevice = ((kony.application.getCurrentBreakpoint() === 640) || orientationHandler.isMobile);
            //if(combineduser){
            if (this.profileAccess === "both") {
                scopeObj.view.flxIcon.setVisibility(true);
                this.view.lblIcon.text = data.isBusinessPayee === "1" ? "r" : "s";
                this.view.lblAckRecipientNameValue.left = isMobileDevice ? "8.5%" : "275dp";
            }
            scopeObj.transfersFastPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule").presentationController;
            scopeObj.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.PayAPerson.EditRecipient");
            CommonUtilities.setText(scopeObj.view.lblTransfers, kony.i18n.getLocalizedString("i18n.billPay.Edit") + " " + data.oldName, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblSuccessMessage, data.oldName + " " + kony.i18n.getLocalizedString("i18n.FastTransfers.hasbeensuccessfullyedited"), CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.btnAddAnotherRecipient, kony.i18n.getLocalizedString("i18n.topmenu.accounts"), CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.btnNewTransfer, kony.i18n.getLocalizedString("i18n.PayAPerson.ManageRecipient"), CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblRefrenceNumberValue, data.Id || data.payeeId, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblAckBankNameValue, data.bankName, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblAckAccNumberValue, data.accountNumber, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblAckAccTypeValue, data.accountType, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblAckRecipientNameValue, data.beneficiaryName, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblAckNickNameValue, data.nickName, CommonUtilities.getaccessibilityConfig());
            scopeObj.view.flxAckBankName.isVisible = false;
            scopeObj.view.flxAckAccType.isVisible = false;
            if (!isMobileDevice) {
                scopeObj.view.flxAckAccNumber.top = "0dp";
                scopeObj.view.flxAckRecipientName.top = "40dp";
                scopeObj.view.flxAckNickName.top = "80dp";
            }
            scopeObj.view.btnAddAnotherRecipient.toolTip = kony.i18n.getLocalizedString("i18n.topmenu.accounts");
            scopeObj.view.btnNewTransfer.toolTip = kony.i18n.getLocalizedString("i18n.PayAPerson.ManageRecipient");
            scopeObj.view.btnAddAnotherRecipient.onClick = function () {
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "AccountsUIModule",
                    "appName": "HomepageMA"
                }).presentationController.showAccountsDashboard();
            };
            scopeObj.view.btnNewTransfer.onClick = function () {
                scopeObj.transfersFastPresentationController.showTransferScreen({
                    showManageRecipients: true
                });
            };
        }
    };
});