define(["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants"], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
    var orientationHandler = new OrientationHandler();
    var responsiveUtils = new ResponsiveUtils();
    return {
        /*
         *it updates the form ui
         *@param {Object} withdrawGoalAck view model object
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

                }
                if (uiData.goalSuccess) {
                    this.setDataToAckForm(uiData.goalSuccess);
                }

            }
        },
        /**
         * setDataToAckForm : binds data after a successful fund transfer .
         *@member of{frmWithdrawGoalAckController}
         *@param{Object} goalData - data 
         *@return{}
         *@throws{}
         */
        setDataToAckForm: function(goalData) {
            var accountCurrencyCode = this.savingsPotPresentationController.getCurrentAccountSupportedCurrency();
            var accountID = this.savingsPotPresentationController.getSavingsPotCurrentAccount();
            var account = this.savingsPotPresentationController.fetchAccountByID(accountID);
            var accountDisplayName = CommonUtilities.mergeAccountNameNumber(CommonUtilities.getAccountName(account), accountID);
            this.view.acknowledgment.lblAckDetailValue1.text = goalData.potName;
            this.view.acknowledgment.lblAckDetailValue2.text = accountDisplayName;
            this.view.acknowledgment.lblAckDetailValue3.text = CommonUtilities.formatCurrencyWithCommas(goalData.targetAmount, false, accountCurrencyCode);
            this.view.acknowledgment.lblAckDetailValue4.text = CommonUtilities.formatCurrencyWithCommas(goalData.availableBalance - goalData.withdrawAmount, false, accountCurrencyCode);
            this.view.acknowledgment.lblAckDetailValue5.text = CommonUtilities.formatCurrencyWithCommas(goalData.withdrawAmount, false, accountCurrencyCode);
            this.view.acknowledgment.lblAckDetailValue6.text = this.calculateDate();
            this.view.acknowledgment.lblSavingsAccount.text = goalData.potName;
            this.view.acknowledgment.lblBalanceValue.text = CommonUtilities.formatCurrencyWithCommas(goalData.availableBalance - goalData.withdrawAmount, false, accountCurrencyCode);
        },

        /**
         * calculates today's date
         * @returns {string} date
         */
        calculateDate: function() {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();

            return mm + '/' + dd + '/' + yyyy;
        },
        //UI Code
        /**
         * onBreakpointChange : Handles ui changes on .
         *�@member�of�{frmWithdrawGoalAckController}
         *�@param�{integer} width - current browser width
         *�@return�{}
         *�@throws�{}
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
            this.view.acknowledgment.btnAction1.onClick = this.navToAccountsModule;
            this.view.acknowledgment.btnAction2.onClick = this.navToSavingsPotDashboard;
            this.setConfig();
            this.savingsPotPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SavingsPotUIModule").presentationController;
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
         * navigate to Accounts Module method
         */
        navToAccountsModule: function() {
            FormControllerUtility.showProgressBar(this.view);
            var accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName": "AccountsUIModule","appName": "ArrangementsMA"});
            var accountID = this.savingsPotPresentationController.getSavingsPotCurrentAccount();
            var account = this.savingsPotPresentationController.fetchAccountByID(accountID);
            accountModule.presentationController.showAccountDetails(account);
        },
        /**
         * navigate to Savings Pot Module method
         */
        navToSavingsPotDashboard: function() {
            FormControllerUtility.showProgressBar(this.view);
            var accountID = this.savingsPotPresentationController.getSavingsPotCurrentAccount();
            this.savingsPotPresentationController.fetchSavingsPot(accountID);
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
        },
        /**
         * Method to set tool tip and accessiblity config
         */
        setConfig: function() {
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            this.view.acknowledgment.lblAcknowledgementHeader.toolTip = kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement");
            this.view.acknowledgment.lblSuccessMessage.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.amountWithdrawnMsg");
            this.view.acknowledgment.lblAvailableBalance.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.availableBalance");
            this.view.acknowledgment.lblConfirmHeader.toolTip = kony.i18n.getLocalizedString("i18n.transfers.YourTransactionDetails");
            this.view.acknowledgment.lblAckDetailKey1.toolTip = kony.i18n.getLocalizedString("i18n.StopCheckPayments.from");
            this.view.acknowledgment.lblAckDetailKey2.toolTip = kony.i18n.getLocalizedString("i18n.StopCheckPayments.To");
            this.view.acknowledgment.lblAckDetailKey3.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.goalAmount");
            this.view.acknowledgment.lblAckDetailKey4.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.currentBalance");
            this.view.acknowledgment.lblAckDetailKey5.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.withdrawnAmount");
            this.view.acknowledgment.lblAckDetailKey6.toolTip = kony.i18n.getLocalizedString("i18n.ChequeManagement.Date:");
            this.view.acknowledgment.btnAction1.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.viewAccountSummary");
            this.view.acknowledgment.btnAction2.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.viewAllSavingsPot");
            this.view.lblTransfers.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.withdrawAmountAckHeader");
            this.view.customheadernew.lblHeaderMobile.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.withdrawAmountAckHeader");
            CommonUtilities.setText(this.view.acknowledgment.lblAcknowledgementHeader, kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement"), accessibilityConfig);
            CommonUtilities.setText(this.view.acknowledgment.lblSuccessMessage, kony.i18n.getLocalizedString("i18n.savingsPot.amountWithdrawnMsg"), accessibilityConfig);
            CommonUtilities.setText(this.view.acknowledgment.lblAvailableBalance, kony.i18n.getLocalizedString("i18n.savingsPot.availableBalance"), accessibilityConfig);
            CommonUtilities.setText(this.view.acknowledgment.lblConfirmHeader, kony.i18n.getLocalizedString("i18n.transfers.YourTransactionDetails"), accessibilityConfig);
            CommonUtilities.setText(this.view.acknowledgment.lblAckDetailKey1, kony.i18n.getLocalizedString("i18n.StopCheckPayments.from"), accessibilityConfig);
            CommonUtilities.setText(this.view.acknowledgment.lblAckDetailKey2, kony.i18n.getLocalizedString("i18n.StopCheckPayments.To"), accessibilityConfig);
            CommonUtilities.setText(this.view.acknowledgment.lblAckDetailKey3, kony.i18n.getLocalizedString("i18n.savingsPot.goalAmount"), accessibilityConfig);
            CommonUtilities.setText(this.view.acknowledgment.lblAckDetailKey4, kony.i18n.getLocalizedString("i18n.savingsPot.currentBalance"), accessibilityConfig);
            CommonUtilities.setText(this.view.acknowledgment.lblAckDetailKey5, kony.i18n.getLocalizedString("i18n.savingsPot.withdrawnAmount"), accessibilityConfig);
            CommonUtilities.setText(this.view.acknowledgment.lblAckDetailKey6, kony.i18n.getLocalizedString("i18n.ChequeManagement.Date:"), accessibilityConfig);
            CommonUtilities.setText(this.view.acknowledgment.btnAction1, kony.i18n.getLocalizedString("i18n.savingsPot.viewAccountSummary"), accessibilityConfig);
            CommonUtilities.setText(this.view.acknowledgment.btnAction2, kony.i18n.getLocalizedString("i18n.savingsPot.viewAllSavingsPot"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblTransfers, kony.i18n.getLocalizedString("i18n.savingsPot.withdrawAmountAckHeader"), accessibilityConfig);
            CommonUtilities.setText(this.view.customheadernew.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.savingsPot.withdrawAmountAckHeader"), accessibilityConfig);

        }
    };
});