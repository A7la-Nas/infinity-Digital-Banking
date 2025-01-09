define(["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants"], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
    var orientationHandler = new OrientationHandler();
    var responsiveUtils = new ResponsiveUtils();
    return {
        updateFormUI: function(uiData) {
            if (uiData) {
                if (uiData.serverError) {
                    this.showServerError(uiData.serverError);
                } else {
                    this.showServerError(false);
                    if (uiData.showLoadingIndicator) {
                        if (uiData.showLoadingIndicator.status === true) {
                            FormControllerUtility.showProgressBar(this.view)
                        } else {
                            FormControllerUtility.hideProgressBar(this.view)
                        }
                    }
                    if (uiData.confirmGoalData) {
                        this.setDataToConfirmUI(uiData.confirmGoalData);
                    }
                }
            }
        },
        /**
         * onBreakpointChange : Method to handle break point change
         * @param1 {Object} form - Form object
         * @param2 {Integer} width - Current width 
         */
        onBreakpointChange: function(form, width) {
            var scope = this;
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            this.view.CustomPopupCancel.onBreakpointChangeComponent(scope.view.CustomPopupCancel, width);
            FormControllerUtility.setupFormOnTouchEnd(width);
            responsiveUtils.onOrientationChange(this.onBreakpointChange);
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooter.onBreakpointChangeComponent(width);
            this.view.confirmation.onBreakpointChangeComponent(scope.view.confirmation, width);
            if (width === 640 || orientationHandler.isMobile) {
                this.view.confirmation.flxConfirmKey1.width = "15%";
                this.view.confirmation.flxConfirmKey2.width = "15%";
                this.view.confirmation.flxConfirmValue1.width = "82%";
                this.view.confirmation.flxConfirmValue2.width = "82%";
                this.view.CancelPopup.height = "250px";
            }
        },
        /**
         * setGoalDataToUI : set goal information to all the labels .
         * @member of {frmFundBudgetConfirmController}
         * @param1 {Object} goalData - data fields 
         */
        setDataToConfirmUI: function(goalData) {
            var accountCurrencyCode = this.savingsPotPresentationController.getCurrentAccountSupportedCurrency();
            var accountID = this.savingsPotPresentationController.getSavingsPotCurrentAccount();
            var account = this.savingsPotPresentationController.fetchAccountByID(accountID);
            var accountDisplayName = CommonUtilities.mergeAccountNameNumber(CommonUtilities.getAccountName(account), accountID);
            this.view.confirmation.lblConfirmValue1.text = accountDisplayName;
            this.view.confirmation.lblConfirmValue2.text = goalData.potName;
            this.view.confirmation.lblConfirmValue3.text = CommonUtilities.formatCurrencyWithCommas(goalData.targetAmount, false, accountCurrencyCode);
            this.view.confirmation.lblConfirmValue4.text = CommonUtilities.formatCurrencyWithCommas(goalData.availableBalance, false, accountCurrencyCode);
            this.view.confirmation.lblConfirmValue5.text = CommonUtilities.formatCurrencyWithCommas(goalData.fundAmount, false, accountCurrencyCode);
            this.view.confirmation.btnConfirm.onClick = this.onClickContinue.bind(this, goalData);
            this.view.confirmation.btnModify.onClick = this.onClickModify.bind(this, goalData);
        },
        /**
         * showServerError : Method to show server error
         * @param1 {Boolean} status true/false
         */
        showServerError: function(status) {
            if (status === false) {
                this.view.flxMakeTransferError.setVisibility(false);
            } else {
                this.view.rtxError.text = status;
                this.view.rtxError.toolTip = status;
                this.view.flxMakeTransferError.setVisibility(true);
                this.view.flxMakeTransferError.setFocus(true);
                FormControllerUtility.hideProgressBar(this.view);
            }
            this.view.forceLayout();
        },
        /**
         * init : Form Initialisation
         * @member of {frmFundBudgetConfirmController}
         * Takes no parameter  
         */
        init: function() {
            /*Binding function calls with form and element events */
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.confirmation.btnConfirm.onClick = this.onClickContinue;
            this.view.confirmation.btnModify.onClick = this.onClickModify;
            this.view.confirmation.btnCancel.onClick = this.onClickCancel;
            /*Functionalities to be executed during form initialisation */
            this.setAccessibilityTooltips();
            this.savingsPotPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SavingsPotUIModule").presentationController;
        },
        /**
         * setActiveHeaderHamburger : Method to highlight active header and hamburger
         * @member of {frmFundBudgetConfirmController}
         * Takes no parameter
         */
        setActiveHeaderHamburger: function() {
            this.view.customheadernew.activateMenu("Accounts", "My Accounts");
            this.view.customheadernew.flxContextualMenu.setVisibility(false);
            this.view.customheadernew.flxAccounts.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
        },
        /**
         * setAccessibilityTooltips : Method to set Accessibility and Tooltip texts
         * @member of {frmFundBudgetConfirmController}
         * Takes no parameter
         */
        setAccessibilityTooltips: function() {
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            /* Accessibility Tooltip options for form header */
            this.view.lblTransfers.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.confirmationFundHeader");
            CommonUtilities.setText(this.view.lblTransfers, kony.i18n.getLocalizedString("i18n.savingsPot.confirmationFundHeader"), accessibilityConfig);
            /* Accessibility Tooltip  options for confirmation details */
            this.view.confirmation.lblConfirmKey1.toolTip = kony.i18n.getLocalizedString("i18n.StopCheckPayments.from");
            CommonUtilities.setText(this.view.confirmation.lblConfirmKey1, kony.i18n.getLocalizedString("i18n.StopCheckPayments.from"), accessibilityConfig);
            this.view.confirmation.lblConfirmKey2.toolTip = kony.i18n.getLocalizedString("i18n.StopCheckPayments.To");
            CommonUtilities.setText(this.view.confirmation.lblConfirmKey2, kony.i18n.getLocalizedString("i18n.StopCheckPayments.To"), accessibilityConfig);
            this.view.confirmation.lblConfirmKey3.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.goalAmount");
            CommonUtilities.setText(this.view.confirmation.lblConfirmKey3, kony.i18n.getLocalizedString("i18n.savingsPot.goalAmount"), accessibilityConfig);
            this.view.confirmation.lblConfirmKey4.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.currentBalance");
            CommonUtilities.setText(this.view.confirmation.lblConfirmKey4, kony.i18n.getLocalizedString("i18n.savingsPot.currentBalance"), accessibilityConfig);
            this.view.confirmation.lblConfirmKey5.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.fundAmount");
            CommonUtilities.setText(this.view.confirmation.lblConfirmKey5, kony.i18n.getLocalizedString("i18n.savingsPot.fundAmount"), accessibilityConfig);
            /* Accessibility Tooltip  options for form buttons */
            this.view.confirmation.btnConfirm.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Confirm");
            CommonUtilities.setText(this.view.confirmation.btnConfirm, kony.i18n.getLocalizedString("i18n.transfers.Confirm"), accessibilityConfig);
            this.view.confirmation.btnModify.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Modify");
            CommonUtilities.setText(this.view.confirmation.btnModify, kony.i18n.getLocalizedString("i18n.transfers.Modify"), accessibilityConfig);
            this.view.confirmation.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
            CommonUtilities.setText(this.view.confirmation.btnCancel, kony.i18n.getLocalizedString("i18n.konybb.common.cancel"), accessibilityConfig);
        },
        /**
         * postShow : Post show Method 
         * @member of {frmFundBudgetConfirmController}
         * Takes no parameter
         */
        postShow: function() {
            this.view.customheadernew.forceCloseHamburger();
            this.setActiveHeaderHamburger();
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            FormControllerUtility.hideProgressBar(this.view)
        },
        /**
         * preShow : Pre show Method 
         * @member of {frmFundBudgetConfirmController}
         * Takes no parameter
         */
        preShow: function() {
            this.view.customheadernew.setFocus(true);
            this.view.customheadernew.flxContextualMenu.setVisibility(false);
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain']);
        },
        /**
         * onClickContinue : Method on click of continue button
         * @member of {frmFundBudgetConfirmController}
         * @param1 {Object} goalData - Object holds the details of the goal
         */
        onClickContinue: function(goalData) {
            FormControllerUtility.showProgressBar(this.view);
            var params = {
                "amount": goalData.fundAmount,
                "isCreditDebit": "Credit",
                "savingsPotId": goalData.savingsPotId,
                "potAccountId": goalData.potAccountId
            };
            this.savingsPotPresentationController.fundGoal(goalData, params);
        },
        /**
         * onClickModify : Method that uses to modify goal details
         * @member of {frmFundBudgetConfirmController}
         * @param1 {Object} goalData - Object holds the details of the goal
         */
        onClickModify: function(goalData) {
            FormControllerUtility.showProgressBar(this.view);
            this.savingsPotPresentationController.presentUserInterface("frmFundGoal", {
                fundGoal: goalData
            });
        },
        /**
         * onClickCancel : Show or hide cancel popup 
         * @member of {frmFundBudgetController}
         * Takes no parameter
         */
        onClickCancel: function() {
            var scopeObj = this;
            scopeObj.view.flxDialogs.setVisibility(true);
            scopeObj.view.flxCancelPopup.setVisibility(true);
            scopeObj.view.flxCancelPopup.left = "0%";
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            CommonUtilities.setText(this.view.CancelPopup.lblPopupMessage, kony.i18n.getLocalizedString("I18n.billPay.QuitTransactionMsg"), accessibilityConfig);
            this.view.CancelPopup.lblPopupMessage.toolTip = kony.i18n.getLocalizedString("I18n.billPay.QuitTransactionMsg");
            var popupComponent = scopeObj.view.flxCancelPopup.widgets()[0];
            popupComponent.top = ((kony.os.deviceInfo().screenHeight / 2) - 135) + "px";
            popupComponent.btnYes.toolTip = kony.i18n.getLocalizedString("i18n.common.yes");
            CommonUtilities.setText(popupComponent.btnYes, kony.i18n.getLocalizedString("i18n.common.yes"), accessibilityConfig);
            CommonUtilities.setText(popupComponent.btnNo, kony.i18n.getLocalizedString("i18n.common.no"), accessibilityConfig);
            popupComponent.btnNo.toolTip = kony.i18n.getLocalizedString("i18n.common.no");
            /**
             * btnYes onClick : Cancel the flow.
             */
            popupComponent.btnYes.onClick = function() {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.left = "-100%";
                FormControllerUtility.showProgressBar(scopeObj.view);
                var accountID = scopeObj.savingsPotPresentationController.getSavingsPotCurrentAccount();
                scopeObj.savingsPotPresentationController.fetchSavingsPot(accountID);
                //  this.savingsPotPresentationController.fetchSavingsPot({});
            };
            /**
             * btnNo onClick : Close the pop up. 
             */
            popupComponent.btnNo.onClick = function() {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.left = "-100%";
            }
            /**
             * flxCross onClick :  Close the pop up. 
             */
            popupComponent.flxCross.onClick = function() {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.left = "-100%";
            }
        }
    };
});