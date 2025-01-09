define(["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants"], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
    var orientationHandler = new OrientationHandler();
    var responsiveUtils = new ResponsiveUtils();
    return {
        /*
         *it updates the form ui
         *@param {Object} fundBudgetAck view model object
         */
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
                    if (uiData.budgetSuccess) {
                        this.setDataToAckForm(uiData.budgetSuccess.budgetData, uiData.budgetSuccess.isFundNow);
                    }

                }
            }
        },
        /**
         * setDataToAckForm : binds data after a successful fund transfer .
         * @member of {frmFundBudgetAckController}
         * @param {Object} budgetData - data 
         * @return {}
         * @throws {}
         */
        setDataToAckForm: function(budgetData, isFundNow) {
            var today = new Date();
            var date = String(today.getMonth() + 1).padStart(2, '0') + '/' + String(today.getDate()).padStart(2, '0') + '/' + today.getFullYear();
            var accountID = this.savingsPotPresentationController.getSavingsPotCurrentAccount();
            var account = this.savingsPotPresentationController.fetchAccountByID(accountID);
            var currencySymbol = this.savingsPotPresentationController.getCurrentAccountSupportedCurrency();
            var accountDisplayName = CommonUtilities.mergeAccountNameNumber(CommonUtilities.getAccountName(account), accountID);
            this.view.acknowledgment.lblAckDetailValue1.text = accountDisplayName;
            this.view.acknowledgment.lblAckDetailValue2.text = budgetData.potName;
            this.view.acknowledgment.lblAckDetailValue3.text = CommonUtilities.formatCurrencyWithCommas(budgetData.targetAmount, false, currencySymbol);
            this.view.acknowledgment.lblAckDetailValue5.text = CommonUtilities.formatCurrencyWithCommas(budgetData.fundAmount, false, currencySymbol);
            this.view.acknowledgment.lblAckDetailValue6.text = date;
            this.view.acknowledgment.lblSavingsAccount.text = budgetData.potName;
            if (budgetData.availableBalance) {
                this.view.acknowledgment.lblBalanceValue.text = CommonUtilities.formatCurrencyWithCommas(+budgetData.availableBalance + +budgetData.fundAmount, false, currencySymbol);
            } else {
                this.view.acknowledgment.lblBalanceValue.text = CommonUtilities.formatCurrencyWithCommas(budgetData.fundAmount, false, currencySymbol);

            }
            if (isFundNow) {
                this.view.acknowledgment.lblAckDetailValue4.text = CommonUtilities.formatCurrencyWithCommas(+budgetData.availableBalance + +budgetData.fundAmount, false, currencySymbol);
                this.view.acknowledgment.flxAckDetail4.setVisibility(true);
            } else
                this.view.acknowledgment.flxAckDetail4.setVisibility(false);
        },
        //UI Code
        /**
         * onBreakpointChange : Handles ui changes on .
         * @member of {frmFundBudgetAckController}
         * @param {integer} width - current browser width
         * @return {}
         * @throws {}
         */
        onBreakpointChange: function(form, width) {
            var scope = this;
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            this.view.CustomPopupCancel.onBreakpointChangeComponent(scope.view.CustomPopupCancel, width);
            this.view.deletePopup.onBreakpointChangeComponent(scope.view.deletePopup, width);
            FormControllerUtility.setupFormOnTouchEnd(width);
            responsiveUtils.onOrientationChange(this.onBreakpointChange);
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooter.onBreakpointChangeComponent(width);
            this.view.acknowledgment.onBreakpointChangeComponent(this.view.acknowledgment, width);
        },

        /**
         * Method to show server error
         * @param {Boolean} status true/false
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
         * Init Method 
         */

        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.acknowledgment.btnAction2.onClick = this.viewAllSavingsPot;
            this.view.acknowledgment.btnAction1.onClick = this.viewAccounts;
            this.savingsPotPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SavingsPotUIModule").presentationController;
            /* Functionalities to be executed during form initialisation */
            this.setAccessibilityTooltips();
        },
        /**
         *setActiveHeaderHamburger - Method to highlight active header and hamburger
         */
        setActiveHeaderHamburger: function() {
            this.view.customheadernew.activateMenu("Accounts", "My Accounts");
            this.view.customheadernew.flxContextualMenu.setVisibility(false);
            this.view.customheadernew.flxAccounts.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
        },
        /**
         * setAccessibilityTooltips - Method to set accessibility and tooltips for the form elements.
         */
        setAccessibilityTooltips: function() {
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            this.view.acknowledgment.lblAckDetailKey1.toolTip = kony.i18n.getLocalizedString("i18n.StopCheckPayments.from");
            CommonUtilities.setText(this.view.acknowledgment.lblAckDetailKey1, kony.i18n.getLocalizedString("i18n.StopCheckPayments.from"), accessibilityConfig);
            this.view.acknowledgment.lblAckDetailKey2.toolTip = kony.i18n.getLocalizedString("i18n.StopCheckPayments.To");
            CommonUtilities.setText(this.view.acknowledgment.lblAckDetailKey2, kony.i18n.getLocalizedString("i18n.StopCheckPayments.To"), accessibilityConfig);
            this.view.acknowledgment.lblAckDetailKey3.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.budgetAmount");
            CommonUtilities.setText(this.view.acknowledgment.lblAckDetailKey3, kony.i18n.getLocalizedString("i18n.savingsPot.budgetAmount"), accessibilityConfig);
            this.view.acknowledgment.lblAckDetailKey4.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.currentBalance");
            CommonUtilities.setText(this.view.acknowledgment.lblAckDetailKey4, kony.i18n.getLocalizedString("i18n.savingsPot.currentBalance"), accessibilityConfig);
            this.view.acknowledgment.lblAckDetailKey5.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.fundAmount");
            CommonUtilities.setText(this.view.acknowledgment.lblAckDetailKey5, kony.i18n.getLocalizedString("i18n.savingsPot.fundAmount"), accessibilityConfig);
            this.view.acknowledgment.lblAckDetailKey6.toolTip = kony.i18n.getLocalizedString("i18n.ChequeManagement.Date:");
            CommonUtilities.setText(this.view.acknowledgment.lblAckDetailKey6, kony.i18n.getLocalizedString("i18n.ChequeManagement.Date:"), accessibilityConfig);
            this.view.acknowledgment.btnAction1.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.viewAccountSummary");
            CommonUtilities.setText(this.view.acknowledgment.btnAction1, kony.i18n.getLocalizedString("i18n.savingsPot.viewAccountSummary"), accessibilityConfig);
            this.view.acknowledgment.btnAction2.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.viewAllSavingsPot");
            CommonUtilities.setText(this.view.acknowledgment.btnAction2, kony.i18n.getLocalizedString("i18n.savingsPot.viewAllSavingsPot"), accessibilityConfig);
            this.view.acknowledgment.lblSuccessMessage.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.transferFundMsg");
            CommonUtilities.setText(this.view.acknowledgment.lblSuccessMessage, kony.i18n.getLocalizedString("i18n.savingsPot.transferFundMsg"), accessibilityConfig);
            this.view.acknowledgment.lblAvailableBalance.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.availableBalanceBudget");
            CommonUtilities.setText(this.view.acknowledgment.lblAvailableBalance, kony.i18n.getLocalizedString("i18n.savingsPot.availableBalanceBudget"), accessibilityConfig);
            this.view.acknowledgment.lblAcknowledgementHeader.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Acknowledgement");
            CommonUtilities.setText(this.view.acknowledgment.lblAcknowledgementHeader, kony.i18n.getLocalizedString("i18n.transfers.Acknowledgement"), accessibilityConfig);
            this.view.acknowledgment.lblConfirmHeader.toolTip = kony.i18n.getLocalizedString("i18n.transfers.YourTransactionDetails");
            CommonUtilities.setText(this.view.acknowledgment.lblConfirmHeader, kony.i18n.getLocalizedString("i18n.transfers.YourTransactionDetails"), accessibilityConfig);
            this.view.lblTransfers.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.fundTransferAckHeader");
            CommonUtilities.setText(this.view.lblTransfers, kony.i18n.getLocalizedString("i18n.savingsPot.fundTransferAckHeader"), accessibilityConfig);
        },
        /**
         * Method that navigates to savingspot dashboard
         */
        viewAllSavingsPot: function() {
            FormControllerUtility.showProgressBar(this.view);
            var accountID = this.savingsPotPresentationController.getSavingsPotCurrentAccount();
            this.savingsPotPresentationController.fetchSavingsPot(accountID);
        },
        /**
         * Method that navigates to Accounts dashboard
         */
        viewAccounts: function() {
            FormControllerUtility.showProgressBar(this.view);
            var accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName": "AccountsUIModule","appName": "ArrangementsMA"});
            var accountID = this.savingsPotPresentationController.getSavingsPotCurrentAccount();
            var account = this.savingsPotPresentationController.fetchAccountByID(accountID);
            accountModule.presentationController.showAccountDetails(account);
        },

        /**
         * post show Method 
         */
        postShow: function() {
            this.view.customheadernew.forceCloseHamburger();
            this.setActiveHeaderHamburger();
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            FormControllerUtility.hideProgressBar(this.view);
        },
        /**
         * pre show Method 
         */
        preShow: function() {
            this.view.customheadernew.setFocus(true);
            this.view.customheadernew.flxContextualMenu.setVisibility(false);
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain']);
        }

    };
});