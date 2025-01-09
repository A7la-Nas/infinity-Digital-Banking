define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants'], function (FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants) {
     
    return {
        init: function () {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function () { };
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.btnConfirm.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Confirm");
            this.view.btnModify.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Modify");
            this.view.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
        },
        preShow: function () {
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
                this.setP2PRecipient(viewModel);
            }
        },
        /**
         * sets recipient details in confirmation screen
         * @param {Object} data contains recipient details
         */
        setP2PRecipient: function (data) {
            var scopeObj = this;
            scopeObj.transfersFastPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule").presentationController;
            CommonUtilities.setText(scopeObj.view.lblRecipientNameValue, data.name, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblNickNameValue, data.nickName, CommonUtilities.getaccessibilityConfig());
            if (data.phone) {
                CommonUtilities.setText(scopeObj.view.lblPhoneOrEmailKey, kony.i18n.getLocalizedString("i18n.ProfileManagement.PhoneNumbers"), CommonUtilities.getaccessibilityConfig());
                CommonUtilities.setText(scopeObj.view.lblPhoneOrEmailValue, data.phone, CommonUtilities.getaccessibilityConfig());
            } else {
                CommonUtilities.setText(scopeObj.view.lblPhoneOrEmailKey, kony.i18n.getLocalizedString("i18n.ProfileManagement.EmailId"), CommonUtilities.getaccessibilityConfig());
                CommonUtilities.setText(scopeObj.view.lblPhoneOrEmailValue, data.email, CommonUtilities.getaccessibilityConfig());
            }
            scopeObj.view.forceLayout();
            scopeObj.view.btnCancel.onClick = function () {
                scopeObj.showCancelPopup();
            };
            scopeObj.view.btnModify.onClick = function () {
                applicationManager.getNavigationManager().navigateTo("frmFastAddRecipient");
            }
            scopeObj.view.btnConfirm.onClick = function () {
                scopeObj.transfersFastPresentationController.addP2PRecipient(data);
            }
        },
        /**
         * show or hide cancel popup
         */
        showCancelPopup: function () {
            var scopeObj = this;
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