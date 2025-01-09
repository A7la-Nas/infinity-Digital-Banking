define(["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants"], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
    var orientationHandler = new OrientationHandler();
    var responsiveUtils = new ResponsiveUtils();
    return {
        /*
         *it updates the form ui
         *@param {Object} createBudgetAck view model object
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
                    if (uiData.createBudgetSuccess) {
                        this.setBudgetDataToUI(uiData.createBudgetSuccess, false);
                    }
                    if (uiData.editBudgetSuccess) {
                        this.setBudgetDataToUI(uiData.editBudgetSuccess, true);
                    }
                }
            }
        },
        //UI Code
        /**
         * onBreakpointChange : Handles ui changes on .
         * @member of {frmCreateBudgetAckController}
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
            if (width === 640) {
                this.view.acknowledgment.flxConfirmDetails.minHeight = "270dp";
            }
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
         * setBudgetDataToUI-Method that set data to UI
         * @param {object} budgetData - budget data
         * @param {boolean} isEditFlow - true ->edit budget , false-> create budget
         * @return {}
         * @throws {}
         */
        setBudgetDataToUI: function(budgetData, isEditFlow) {
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            var currencySymbol = this.savingsPotPresentationController.getCurrentAccountSupportedCurrency();
            var today = new Date();
            var date = String(today.getMonth() + 1).padStart(2, '0') + '/' + String(today.getDate()).padStart(2, '0') + '/' + today.getFullYear();
            if (isEditFlow) {
                this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.savingsPot.editBudgetAck");
                CommonUtilities.setText(this.view.customheadernew.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.savingsPot.editBudgetAck"), accessibilityConfig);
                this.view.lblTransfers.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.editBudgetAck");
                this.view.customheadernew.lblHeaderMobile.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.editBudgetAck");
                this.view.acknowledgment.lblAckDetailKey4.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.currentBalance");
                this.view.acknowledgment.lblAckDetailKey5.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.modifiedDate");
                this.view.acknowledgment.lblSuccessMessage.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.budgetAckEditMessage");
                this.view.customheadernew.lblHeaderMobile.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.editBudgetAck");
                this.view.lblTransfers.text = kony.i18n.getLocalizedString("i18n.savingsPot.editBudgetAck");
                this.view.acknowledgment.lblSuccessMessage.text = kony.i18n.getLocalizedString("i18n.savingsPot.editBudgetSuccess");
                this.view.acknowledgment.flxAckDetail5.setVisibility(true);
                this.view.acknowledgment.lblAckDetailKey4.text = kony.i18n.getLocalizedString("i18n.savingsPot.currentBalance");
                this.view.acknowledgment.lblAckDetailValue4.text = CommonUtilities.formatCurrencyWithCommas(budgetData.availableBalance, false, currencySymbol);
                this.view.acknowledgment.lblAckDetailValue5.text = date;
                CommonUtilities.setText(this.view.acknowledgment.lblAckDetailKey5, kony.i18n.getLocalizedString("i18n.savingsPot.modifiedDate"), accessibilityConfig);
                // this.view.acknowledgment.lblSuccessMessage.text = kony.i18n.getLocalizedString("i18n.savingsPot.budgetAckEditMessage");
                this.view.acknowledgment.btnAction1.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.viewAllSavingsPot");
                this.view.acknowledgment.btnAction2.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.viewAccountSummary");
                this.view.acknowledgment.btnAction1.onClick = this.onClickFundLater;
                this.view.acknowledgment.btnAction2.onClick = this.viewAccounts;
                CommonUtilities.setText(this.view.acknowledgment.btnAction1, kony.i18n.getLocalizedString("i18n.savingsPot.viewAllSavingsPot"), accessibilityConfig);
                CommonUtilities.setText(this.view.acknowledgment.btnAction2, kony.i18n.getLocalizedString("i18n.savingsPot.viewAccountSummary"), accessibilityConfig);

            } else {
                this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.savingsPot.createBudgetAckHeader");
                CommonUtilities.setText(this.view.customheadernew.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.savingsPot.createBudgetAckHeader"), accessibilityConfig);
                this.view.customheadernew.lblHeaderMobile.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.createBudgetAckHeader");
                this.view.acknowledgment.flxAckDetail5.setVisibility(false);
                this.view.acknowledgment.lblAckDetailKey4.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.createdDate");
                CommonUtilities.setText(this.view.acknowledgment.lblAckDetailKey4, kony.i18n.getLocalizedString("i18n.savingsPot.createdDate"), accessibilityConfig);
                this.view.acknowledgment.lblAckDetailValue4.text = date;
                this.view.lblTransfers.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.createBudgetAckHeader");
                CommonUtilities.setText(this.view.lblTransfers, kony.i18n.getLocalizedString("i18n.savingsPot.createBudgetAckHeader"), accessibilityConfig);
                CommonUtilities.setText(this.view.acknowledgment.lblSuccessMessage, kony.i18n.getLocalizedString("i18n.savingsPot.budgetAckMessage"), accessibilityConfig);
                this.view.acknowledgment.lblSuccessMessage.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.budgetAckMessage");
                if (applicationManager.getConfigurationManager().checkUserPermission(OLBConstants.SAVINGS_POT_PERMISSIONS.BUDGET_POT_ADHOC_FUND)) {
                    CommonUtilities.setText(this.view.acknowledgment.btnAction2, kony.i18n.getLocalizedString("i18n.savingsPot.fundNow"), accessibilityConfig);
                    CommonUtilities.setText(this.view.acknowledgment.btnAction1, kony.i18n.getLocalizedString("i18n.savingsPot.fundLater"), accessibilityConfig);
                    this.view.acknowledgment.btnAction1.onClick = this.onClickFundLater;
                    this.view.acknowledgment.btnAction2.onClick = this.onClickFundNow.bind(this, budgetData);
                    this.view.acknowledgment.btnAction2.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.fundNow");
                    this.view.acknowledgment.btnAction1.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.fundLater");

                } else {
                    CommonUtilities.setText(this.view.acknowledgment.btnAction2, kony.i18n.getLocalizedString("i18n.savingsPot.viewAccountSummary"), accessibilityConfig);
                    CommonUtilities.setText(this.view.acknowledgment.btnAction1, kony.i18n.getLocalizedString("i18n.savingsPot.viewAllSavingsPot"), accessibilityConfig);
                    this.view.acknowledgment.btnAction2.onClick = this.viewAccounts;
                    this.view.acknowledgment.btnAction1.onClick = this.onClickFundLater;
                    this.view.acknowledgment.btnAction1.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.viewAllSavingsPot");
                    this.view.acknowledgment.btnAction2.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.viewAccountSummary");
                }

            }
            this.setSuccessData(budgetData);
        },
        /**
        setSuccessData Method - contains UI set up for both edit and create budget flows
        @param {budgetData} budget data passed
        **/
        setSuccessData: function(budgetData) {
            var currencySymbol = this.savingsPotPresentationController.getCurrentAccountSupportedCurrency();
            var accountID = this.savingsPotPresentationController.getSavingsPotCurrentAccount();
            var account = this.savingsPotPresentationController.fetchAccountByID(accountID);
            var accountDisplayName = CommonUtilities.mergeAccountNameNumber(CommonUtilities.getAccountName(account), accountID);
            this.view.acknowledgment.lblAckDetailValue1.text = accountDisplayName;
            this.view.acknowledgment.lblAckDetailValue3.text = CommonUtilities.formatCurrencyWithCommas(budgetData.targetAmount, false, currencySymbol);
            this.view.acknowledgment.lblAckDetailValue2.text = budgetData.potName;
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
            /* Binding functions with event and actions */
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            /* Functionalities to be executed during form initialisation */
            this.savingsPotPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SavingsPotUIModule").presentationController;
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
         * setAccessibilityTooltips - Setting accessibility options and tooltips for all form elements.
         */
        setAccessibilityTooltips: function() {

            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            this.view.acknowledgment.lblAcknowledgementHeader.toolTip = kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement");
            CommonUtilities.setText(this.view.acknowledgment.lblAcknowledgementHeader, kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement"), accessibilityConfig);
            this.view.acknowledgment.lblConfirmHeader.toolTip = kony.i18n.getLocalizedString("i18n.transfers.YourTransactionDetails");
            CommonUtilities.setText(this.view.acknowledgment.lblConfirmHeader, kony.i18n.getLocalizedString("i18n.transfers.YourTransactionDetails"), accessibilityConfig);
            this.view.acknowledgment.lblAckDetailKey1.toolTip = kony.i18n.getLocalizedString("i18n.ChequeBookReq.account");
            CommonUtilities.setText(this.view.acknowledgment.lblAckDetailKey1, kony.i18n.getLocalizedString("i18n.ChequeBookReq.account"), accessibilityConfig);
            this.view.acknowledgment.lblAckDetailKey2.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.budgetName");
            CommonUtilities.setText(this.view.acknowledgment.lblAckDetailKey2, kony.i18n.getLocalizedString("i18n.savingsPot.budgetName"), accessibilityConfig);
            this.view.acknowledgment.lblAckDetailKey3.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.budgetAmount");
            CommonUtilities.setText(this.view.acknowledgment.lblAckDetailKey3, kony.i18n.getLocalizedString("i18n.savingsPot.budgetAmount"), accessibilityConfig);

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
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain']);
        },
        /**
         * Method that navigates to fund budget flow
         */
        onClickFundNow: function(budgetData) {
            FormControllerUtility.showProgressBar(this.view);
            this.savingsPotPresentationController.presentUserInterface("frmFundBudget", {
                fundNowFromAck: budgetData
            });
        },
        /**
         * onClickFundLater : navigates to savings pot dashboard
         */
        onClickFundLater: function() {
            var accountID = this.savingsPotPresentationController.getSavingsPotCurrentAccount();
            FormControllerUtility.showProgressBar(this.view);
            this.savingsPotPresentationController.fetchSavingsPot(accountID);
        }
    };
});