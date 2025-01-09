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
                    if (uiData.goalSuccess) {
                        this.setDataToAckForm(uiData.goalSuccess);
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
            this.view.deletePopup.onBreakpointChangeComponent(scope.view.deletePopup, width);
            FormControllerUtility.setupFormOnTouchEnd(width);
            responsiveUtils.onOrientationChange(this.onBreakpointChange);
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooter.onBreakpointChangeComponent(width);
            this.view.acknowledgment.onBreakpointChangeComponent(this.view.acknowledgment, width);
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
         * setDataToAckForm : Binds data after a successful fund transfer .
         * @param1 {Boolean} status true/false
         */
        setDataToAckForm: function(goalData) {
            var accountCurrencyCode = this.savingsPotPresentationController.getCurrentAccountSupportedCurrency();
            var today = new Date();
            var date = String(today.getMonth() + 1).padStart(2, '0') + '/' + String(today.getDate()).padStart(2, '0') + '/' + today.getFullYear();
            var accountID = this.savingsPotPresentationController.getSavingsPotCurrentAccount();
            var account = this.savingsPotPresentationController.fetchAccountByID(accountID);
            var accountDisplayName = CommonUtilities.mergeAccountNameNumber(CommonUtilities.getAccountName(account), accountID);
            this.view.acknowledgment.lblAckDetailValue1.text = accountDisplayName;
            this.view.acknowledgment.lblAckDetailValue2.text = goalData.potName;
            this.view.acknowledgment.lblAckDetailValue3.text = CommonUtilities.formatCurrencyWithCommas(goalData.targetAmount, false, accountCurrencyCode);
            this.view.acknowledgment.lblAckDetailValue4.text = CommonUtilities.formatCurrencyWithCommas(+goalData.availableBalance + +goalData.fundAmount, false, accountCurrencyCode);
            this.view.acknowledgment.lblAckDetailValue5.text = CommonUtilities.formatCurrencyWithCommas(goalData.fundAmount, false, accountCurrencyCode);
            this.view.acknowledgment.lblAckDetailValue6.text = date;
            this.view.acknowledgment.lblSavingsAccount.text = goalData.potName;
            this.view.acknowledgment.lblBalanceValue.text = CommonUtilities.formatCurrencyWithCommas(+goalData.availableBalance + +goalData.fundAmount, false, accountCurrencyCode);
        },
        /**
         * init : Form Initialisation
         * @member of {frmFundBudgetAckController}
         * Takes no parameter  
         */
        init: function() {
            /* Binding form element events to functions */
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.acknowledgment.btnAction2.onClick = this.viewAllSavingsPot;
            this.view.acknowledgment.btnAction1.onClick = this.viewAccounts;
            /* Functionalities to be executed during form initialisation */
            this.setAccessibilityTooltips();
            this.savingsPotPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SavingsPotUIModule").presentationController;
        },
        /**
         * setActiveHeaderHamburger : Method to highlight active header and hamburger
         * @member of {frmFundBudgetAckController}
         * Takes no parameter
         */
        setActiveHeaderHamburger: function() {
            this.view.customheadernew.activateMenu("Accounts", "My Accounts");
            this.view.customheadernew.flxContextualMenu.setVisibility(false);
            this.view.customheadernew.flxAccounts.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
        },
        /**
         * setAccessibilityTooltips : Method to set Accessibility and Tooltip texts
         * @member of {frmFundBudgetAckController}
         * Takes no parameter
         */
        setAccessibilityTooltips: function() {
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            /* Set Accessibility tooltip options for form header */
            this.view.lblTransfers.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.fundTransferAckHeader");
            CommonUtilities.setText(this.view.lblTransfers, kony.i18n.getLocalizedString("i18n.savingsPot.fundTransferAckHeader"), accessibilityConfig);
            /* Set Accessibility tooltip options for transaction details */
            this.view.acknowledgment.lblAckDetailKey1.toolTip = kony.i18n.getLocalizedString("i18n.StopCheckPayments.from");
            CommonUtilities.setText(this.view.acknowledgment.lblAckDetailKey1, kony.i18n.getLocalizedString("i18n.StopCheckPayments.from"), accessibilityConfig);
            this.view.acknowledgment.lblAckDetailKey2.toolTip = kony.i18n.getLocalizedString("i18n.StopCheckPayments.To");
            CommonUtilities.setText(this.view.acknowledgment.lblAckDetailKey2, kony.i18n.getLocalizedString("i18n.StopCheckPayments.To"), accessibilityConfig);
            this.view.acknowledgment.lblAckDetailKey3.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.goalAmount");
            CommonUtilities.setText(this.view.acknowledgment.lblAckDetailKey3, kony.i18n.getLocalizedString("i18n.savingsPot.goalAmount"), accessibilityConfig);
            this.view.acknowledgment.lblAckDetailKey4.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.currentBalance");
            CommonUtilities.setText(this.view.acknowledgment.lblAckDetailKey4, kony.i18n.getLocalizedString("i18n.savingsPot.currentBalance"), accessibilityConfig);
            this.view.acknowledgment.lblAckDetailKey5.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.fundAmount");
            CommonUtilities.setText(this.view.acknowledgment.lblAckDetailKey5, kony.i18n.getLocalizedString("i18n.savingsPot.fundAmount"), accessibilityConfig);
            this.view.acknowledgment.lblAckDetailKey6.toolTip = kony.i18n.getLocalizedString("i18n.ChequeManagement.Date:");
            CommonUtilities.setText(this.view.acknowledgment.lblAckDetailKey6, kony.i18n.getLocalizedString("i18n.ChequeManagement.Date:"), accessibilityConfig);
            /* Set Accessibility tooltip options for the buttons */
            this.view.acknowledgment.btnAction1.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.viewAccountSummary");
            CommonUtilities.setText(this.view.acknowledgment.btnAction1, kony.i18n.getLocalizedString("i18n.savingsPot.viewAccountSummary"), accessibilityConfig);
            this.view.acknowledgment.btnAction2.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.viewAllSavingsPot");
            CommonUtilities.setText(this.view.acknowledgment.btnAction2, kony.i18n.getLocalizedString("i18n.savingsPot.viewAllSavingsPot"), accessibilityConfig);
            /* Set Accessibility tooltip options for Acknowledgement card */
            this.view.acknowledgment.lblSuccessMessage.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.transferFundMsg");
            CommonUtilities.setText(this.view.acknowledgment.lblSuccessMessage, kony.i18n.getLocalizedString("i18n.savingsPot.transferFundMsg"), accessibilityConfig);
            this.view.acknowledgment.lblAvailableBalance.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.availableBalanceBudget");
            CommonUtilities.setText(this.view.acknowledgment.lblAvailableBalance, kony.i18n.getLocalizedString("i18n.savingsPot.availableBalanceBudget"), accessibilityConfig);
            this.view.acknowledgment.lblAcknowledgementHeader.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Acknowledgement");
            CommonUtilities.setText(this.view.acknowledgment.lblAcknowledgementHeader, kony.i18n.getLocalizedString("i18n.transfers.Acknowledgement"), accessibilityConfig);
            this.view.acknowledgment.lblConfirmHeader.toolTip = kony.i18n.getLocalizedString("i18n.transfers.YourTransactionDetails");
            CommonUtilities.setText(this.view.acknowledgment.lblConfirmHeader, kony.i18n.getLocalizedString("i18n.transfers.YourTransactionDetails"), accessibilityConfig);
            this.view.acknowledgment.lblAvailableBalance.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.availableBalance");
            CommonUtilities.setText(this.view.acknowledgment.lblAvailableBalance, kony.i18n.getLocalizedString("i18n.savingsPot.availableBalance"), accessibilityConfig);
        },
        /**
         * viewAllSavingsPot : Method that navigates to savingspot dashboard
         * @member of {frmFundBudgetAckController}
         * Takes no parameter
         */
        viewAllSavingsPot: function() {
            FormControllerUtility.showProgressBar(this.view);
            var accountID = this.savingsPotPresentationController.getSavingsPotCurrentAccount();
            this.savingsPotPresentationController.fetchSavingsPot(accountID);
        },
        /**
         * viewAccounts : Method that navigates to Accounts dashboard
         * @member of {frmFundBudgetAckController}
         * Takes no parameter
         */
        viewAccounts: function() {
            FormControllerUtility.showProgressBar(this.view);
            var accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName": "AccountsUIModule","appName": "ArrangementsMA"});
            var accountID = this.savingsPotPresentationController.getSavingsPotCurrentAccount();
            var account = this.savingsPotPresentationController.fetchAccountByID(accountID);
            accountModule.presentationController.showAccountDetails(account);
        },
        /**
         * postShow : Post show Method 
         * @member of {frmFundBudgetAckController}
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
         * @member of {frmFundBudgetAckController}
         * Takes no parameter
         */
        preShow: function() {
            this.view.customheadernew.setFocus(true);
            this.view.customheadernew.flxContextualMenu.setVisibility(false);
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain']);
        },
    };
});