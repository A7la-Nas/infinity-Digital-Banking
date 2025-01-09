define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants', 'CampaignUtility'], function (FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants, CampaignUtility) {
     
    return {
        init: function () {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function () { };
            var scopeObj = this;
            scopeObj.transfersFastPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule").presentationController;
            scopeObj.view.btnDBXAccountkProceed.onClick = function() {
                scopeObj.transfersFastPresentationController.showTransferScreen({
                    initialView: "addDBXAccount"
                });
            };
            scopeObj.view.btnExternalAccountProceed.onClick = function() {
                scopeObj.transfersFastPresentationController.showTransferScreen({
                    initialView: "addExternalAccount"
                });
            };
            scopeObj.view.btnInternationalAccountlProceed.onClick = function() {
                scopeObj.transfersFastPresentationController.showTransferScreen({
                    initialView: "addInternationalAccount"
                });
            };
            scopeObj.view.btnRecipientrProceed.onClick = function() {
                scopeObj.transfersFastPresentationController.showTransferScreen({
                    initialView: "addRecipient"
                });
            };
            scopeObj.view.btnActivatePayAPersonProceed.onClick = function() {
                scopeObj.transfersFastPresentationController.showTransferScreen({
                    activateRecipient: true
                });
            }
            scopeObj.view.flxDBXAccount.onClick = function () {
                scopeObj.transfersFastPresentationController.showTransferScreen({
                    initialView: "addDBXAccount"
                });
            };
            scopeObj.view.flxExternalAccount.onClick = function () {
                scopeObj.transfersFastPresentationController.showTransferScreen({
                    initialView: "addExternalAccount"
                });
            };
            scopeObj.view.flxInternationalAccount.onClick = function () {
                scopeObj.transfersFastPresentationController.showTransferScreen({
                    initialView: "addInternationalAccount"
                });
            };
            scopeObj.view.flxRecipient.onClick = function () {
                scopeObj.transfersFastPresentationController.showTransferScreen({
                    initialView: "addRecipient"
                });
            };
            scopeObj.view.btnActivatePayAPersonProceed.onClick = function () {
                scopeObj.transfersFastPresentationController.showTransferScreen({
                    activateRecipient: true
                });
            }
        },
        preShow: function () {
            var scopeObj = this;
            var payApersonEligibility = applicationManager.getUserPreferencesManager().checkP2PEligibilityForUser();
            if (applicationManager.getConfigurationManager().checkUserPermission("P2P_VIEW")) {
                if (payApersonEligibility !== 'Activated' && applicationManager.getConfigurationManager().checkUserPermission("P2P_ACTIVATE")) {
                    scopeObj.view.flxRecipient.setVisibility(false);
                    scopeObj.view.flxActivatePayAPerson.setVisibility(true);
                } else if (payApersonEligibility === 'Activated' && applicationManager.getConfigurationManager().checkUserPermission("P2P_CREATE_RECEPIENT")) {
                    scopeObj.view.flxRecipient.setVisibility(true);
                    scopeObj.view.flxActivatePayAPerson.setVisibility(false);
                }
            } else {
                scopeObj.view.flxRecipient.setVisibility(false);
                scopeObj.view.flxActivatePayAPerson.setVisibility(false);
            }
            scopeObj.view.customheadernew.activateMenu("FASTTRANSFERS", "Add Infinity Accounts");
            CampaignUtility.fetchPopupCampaigns();
            scopeObj.view.forceLayout();
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader', 'flxFooter', 'flxMain']);
            this.view.customheadernew.btnSkipNav.onClick = function () {
                scopeObj.view.lblTransfers.setActive(true);
            };
            this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
            this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;      

        },
        onKeyPressCallBack: function(eventObject, eventPayload) {
            var self = this;
            if (eventPayload.keyCode === 27) {
                if (self.view.flxLogout.isVisible === true) {
                    self.view.flxLogout.isVisible = false;
                    self.view.flxDialogs.isVisible = false;
                    self.view.customheadernew.btnLogout.setFocus(true);
                }
            }
        },

        postShow: function () {
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            applicationManager.executeAuthorizationFramework(this);
            this.view.title="Add Recipients";
            if (kony.os.deviceInfo().screenHeight < 400) {
                if (kony.application.getCurrentBreakpoint() === 1024) {
                    this.view.customheadernew.flximgKony.left = "30dp";
                    this.view.customheadernew.flxHamburger.width = "48%";
                    this.view.customheadernew.flxMenuLeft.left = "20dp";
                    this.view.customheadernew.flxActionsMenu.right="36dp";
                }
                if (kony.application.getCurrentBreakpoint() === 640) {
                    this.view.flxHeader.height = "40dp";
                    this.view.flxFormContent.top = "60dp";
                    this.view.customheadernew.lblHeaderMobile.isVisible = true;
                    this.view.customheadernew.lblHeaderMobile.centerX = "50%";
                    this.view.customheadernew.lblHeaderMobile.centerY = "50%";
                    this.view.customheadernew.flxHamburger.width = "90%";
                }
            }
			this.view.flxFormContent.accessibilityConfig = {
                        a11yARIA: {
                            "tabindex": -1
                        },
                    };
        },
        onBreakpointChange: function (form, width) {
            var scope = this;
            FormControllerUtility.setupFormOnTouchEnd(width);
           
            this.view.customheadernew.onBreakpointChangeComponent();
            this.view.customfooternew.onBreakpointChangeComponent();
         //   this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
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
            if (viewModel.campaign) {
                CampaignUtility.showCampaign(viewModel.campaign, this.view, "flxMain");
            }
        },
        showInternalAccFlx: function () {
            this.view.flxDBXAccount.setVisibility(true);
        },
        hideInternalAccFlx: function () {
            this.view.flxDBXAccount.setVisibility(false);
        },
        showExternalAccFlx: function () {
            this.view.flxExternalAccount.setVisibility(true);
        },
        hideExternalAccFlx: function () {
            this.view.flxExternalAccount.setVisibility(false);
        },
        showInternationalAccFlx: function () {
            this.view.flxInternationalAccount.setVisibility(true);
        },
        hideInternationalAccFlx: function () {
            this.view.flxInternationalAccount.setVisibility(false);
        }
    };
});