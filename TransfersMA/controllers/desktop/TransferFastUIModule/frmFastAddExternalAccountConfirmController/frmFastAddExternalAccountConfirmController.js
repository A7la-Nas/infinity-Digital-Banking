define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants'], function (FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants) {
     
    return {
        profileAccess: "",
        init: function () {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function () { };
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.btnConfirm.toolTip = kony.i18n.getLocalizedString("i18n.FastTransfers.AddAccount");
            this.view.btnModify.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Modify");
            this.view.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
        },
        preShow: function () {
            this.profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
            this.view.customheadernew.activateMenu("FASTTRANSFERS", "Add Infinity Accounts");
            this.view.flxDialogs.setVisibility(false);
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
            this.view.CancelPopup.onBreakpointChangeComponent(scope.view.CancelPopup, width);
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
            } else {
                this.setExternalAccount(viewModel);
            }
        },
        /**
         * sets account details in confirmation screen
         * @param {Object} data contains account details
         */
        setExternalAccount: function (data) {
            var scopeObj = this;
            //var combineduser = applicationManager.getConfigurationManager().isCombinedUser==="true";
            var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
            scopeObj.transfersFastPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule").presentationController;
            var viewModel = {};
            //if(combineduser){
            if (this.profileAccess === "both") {
                scopeObj.view.flxIcon.setVisibility(true);
                scopeObj.view.lblIcon.text = data.isBusinessPayee === "1" ? "r" : "s";
                scopeObj.view.lblRecipientNameValue.left = "10dp";
            }
            viewModel["ExternalAccount"] = data;
            CommonUtilities.setText(scopeObj.view.lblRoutingNumberValue, data.routingNumber, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblBankNameValue, data.bankName, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblAccountNumberValue, data.accountNumber, CommonUtilities.getaccessibilityConfig());
            //CommonUtilities.setText(scopeObj.view.lblAccountTypeValue, data.accountType , CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblRecipientNameValue, data.beneficiaryName, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblNickNameValue, data.nickName, CommonUtilities.getaccessibilityConfig());
            scopeObj.view.flxAccountType.setVisibility(false);
            scopeObj.view.forceLayout();
            scopeObj.view.btnCancel.onClick = function () {
                scopeObj.showCancelPopup();
            };
            scopeObj.view.btnModify.onClick = function () {
                applicationManager.getNavigationManager().navigateTo("frmFastAddExternalAccount");
            };
            scopeObj.view.btnConfirm.onClick = function () {
                scopeObj.transfersFastPresentationController.navigateToVerifyAccount(viewModel);
            };
        },
        /**
         * show or hide cancel popup
         */
        showCancelPopup: function () {
            var scopeObj = this;
            var height = scopeObj.view.flxFooter.info.frame.height + scopeObj.view.flxFooter.info.frame.y;
            scopeObj.view.flxCancelPopup.height = height + ViewConstants.POSITIONAL_VALUES.DP;
            scopeObj.view.flxDialogs.setVisibility(true);
            scopeObj.view.flxCancelPopup.setVisibility(true);
            scopeObj.view.flxCancelPopup.left = "0%";
            var popupComponent = scopeObj.view.flxCancelPopup.widgets()[0];
            popupComponent.top = ((kony.os.deviceInfo().screenHeight / 2) - 135) + "px";
            popupComponent.btnYes.onClick = function () {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.left = "-100%";
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "AccountsUIModule",
                    "appName": "HomepageMA"
                }).presentationController.showAccountsDashboard();
            };
            popupComponent.btnNo.onClick = function () {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.left = "-100%";
            }
            popupComponent.flxCross.onClick = function () {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.left = "-100%";
            }
        }
    };
});