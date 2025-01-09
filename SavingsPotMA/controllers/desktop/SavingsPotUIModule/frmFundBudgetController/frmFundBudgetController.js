define(["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants"], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
    var orientationHandler = new OrientationHandler();
    var responsiveUtils = new ResponsiveUtils();
    return {
        /*
         *it updates the form ui
         *@param {Object} fundBudget view model object
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
                    if (uiData.fundNowFromAck) {
                        this.view.fundGoal.flxHorzDetail4.isVisible = false;
                        this.setBudgetDataToUI(uiData.fundNowFromAck, false);
                        CommonUtilities.enableButton(this.view.fundGoal.btnContinue);
                    }
                    if (uiData.fundBudget) {
                        this.view.fundGoal.flxHorzDetail4.isVisible = true;
                        this.setBudgetDataToUI(uiData.fundBudget.savingsPotId, true);
                    }
                }
            }
        },

        /**
         * setBudgetDataToUI : set budget information to all the labels .
         * @member of {frmFundBudgetController}
         * @param {Object} budgetData - data fields 
         * @return {}
         * @throws {}
         */
        setBudgetDataToUI: function(viewModel, isFundLater) {
            var budgetData;
            var currencySymbol = this.savingsPotPresentationController.getCurrentAccountSupportedCurrency();
            if (isFundLater) {
                budgetData = this.savingsPotPresentationController.getSavingPotForId(viewModel);
                budgetData.savingsPotId = viewModel;
                this.view.fundGoal.lblValue4.text = CommonUtilities.formatCurrencyWithCommas(budgetData.availableBalance, false, currencySymbol);
            } else {
                budgetData = viewModel;
                this.view.fundGoal.tbxAmount.text = applicationManager.getFormatUtilManager().formatAmount(budgetData.targetAmount);
            }
            var accountID = this.savingsPotPresentationController.getSavingsPotCurrentAccount();
            var account = this.savingsPotPresentationController.fetchAccountByID(accountID);
            var accountDisplayName = CommonUtilities.mergeAccountNameNumber(CommonUtilities.getAccountName(account), accountID);
            this.view.fundGoal.lblValue1.text = accountDisplayName;
            this.view.fundGoal.lblValue2.text = budgetData.potName;
            this.view.fundGoal.lblValue3.text = CommonUtilities.formatCurrencyWithCommas(budgetData.targetAmount, false, currencySymbol);
            if (budgetData.fundAmount) {
                this.view.fundGoal.tbxAmount.text = CommonUtilities.formatCurrencyWithCommas(budgetData.fundAmount, true);
                CommonUtilities.enableButton(this.view.fundGoal.btnContinue);
            }
            this.view.fundGoal.btnContinue.onClick = this.confirmFundBudget.bind(this, budgetData, isFundLater);
        },
        //UI Code
        /**
         * onBreakpointChange : Handles ui changes on .
         * @member of {frmFundBudgetController}
         * @param {integer} width - current browser width
         * @return {}
         * @throws {}
         */
        onBreakpointChange: function(form, width) {
            var scope = this;
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            this.view.CustomPopupCancel.onBreakpointChangeComponent(scope.view.CustomPopupCancel, width);
            FormControllerUtility.setupFormOnTouchEnd(width);
            responsiveUtils.onOrientationChange(this.onBreakpointChange);
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooter.onBreakpointChangeComponent(width);
            this.view.fundGoal.onBreakpointChangeComponent(scope.view.fundGoal, width);
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
        /*
         * deFormatAmountWithoutPrecision - used to deformat the amount without decimal precision
         * @param {} 
         * @member of {frmCreateSavingsGoalController}
         * @return {}
         * @throws {}
         */
        deFormatAmountWithoutPrecision: function() {
            var skinName = ViewConstants.SKINS.FLEX_NOERROR_SKIN;
            this.view.fundGoal.setSkinForAmount(skinName);
            this.view.fundGoal.flxError.setVisibility(false);
        },

        /**
         * Init Method 
         */

        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.fundGoal.btnCancel.onClick = this.cancelFundGoal;
            var scope = this;
            CommonUtilities.disableButton(this.view.fundGoal.btnContinue);
            this.setAccessibilityTooltips();
            this.savingsPotPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SavingsPotUIModule").presentationController;
            FormControllerUtility.wrapAmountField(this.view.fundGoal.tbxAmount).onKeyUp(this.validateAmount).onBeginEditing(this.deFormatAmountWithoutPrecision);
            this.restrictSpecialCharacters();
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
         *Method to set tool tip and accessiblity config
         */
        setAccessibilityTooltips: function() {
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            this.view.fundGoal.lblKey1.toolTip = kony.i18n.getLocalizedString("i18n.StopCheckPayments.from");
            CommonUtilities.setText(this.view.fundGoal.lblKey1, kony.i18n.getLocalizedString("i18n.StopCheckPayments.from"), accessibilityConfig);
            this.view.fundGoal.lblKey2.toolTip = kony.i18n.getLocalizedString("i18n.StopCheckPayments.To");
            CommonUtilities.setText(this.view.fundGoal.lblKey2, kony.i18n.getLocalizedString("i18n.StopCheckPayments.To"), accessibilityConfig);
            this.view.fundGoal.lblKey3.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.budgetAmount");
            CommonUtilities.setText(this.view.fundGoal.lblKey3, kony.i18n.getLocalizedString("i18n.savingsPot.budgetAmount"), accessibilityConfig);
            this.view.fundGoal.lblKey4.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.currentBalance");
            CommonUtilities.setText(this.view.fundGoal.lblKey4, kony.i18n.getLocalizedString("i18n.savingsPot.currentBalance"), accessibilityConfig);
            this.view.fundGoal.lblAmount.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.fundAmount");
            CommonUtilities.setText(this.view.fundGoal.lblAmount, kony.i18n.getLocalizedString("i18n.savingsPot.fundAmount"), accessibilityConfig);
            this.view.fundGoal.btnContinue.toolTip = kony.i18n.getLocalizedString("i18n.userManagement.Continue");
            CommonUtilities.setText(this.view.fundGoal.btnContinue, kony.i18n.getLocalizedString("i18n.userManagement.Continue"), accessibilityConfig);
            this.view.fundGoal.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
            CommonUtilities.setText(this.view.fundGoal.btnCancel, kony.i18n.getLocalizedString("i18n.konybb.common.cancel"), accessibilityConfig);
            this.view.lblTransfers.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.fundYourBudget");
            CommonUtilities.setText(this.view.lblTransfers, kony.i18n.getLocalizedString("i18n.savingsPot.fundYourBudget"), accessibilityConfig);

        },

        /**
         * Method to restrict Special Characters entry in textbox
         */
        restrictSpecialCharacters: function() {
            var specialCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\";
            var alphabetsSet = "abcdefghijklmnopqrstuvwxyz";
            this.view.fundGoal.tbxAmount.restrictCharactersSet = specialCharactersSet.replace(',.', '') + alphabetsSet + alphabetsSet.toUpperCase();
        },

        /**
         * used to get the amount
         * @param {number} amount amount
         * @returns {number} amount
         */
        deformatAmount: function(amount) {
            return applicationManager.getFormatUtilManager().deFormatAmount(amount);
        },
        /**
         * onKeyUp action  of amount textbox 
         */
        validateAmount: function() {
            this.view.fundGoal.flxError.setVisibility(false);
            var self = this;
            var re = new RegExp("^([0-9])+(\.[0-9]{1,2})?$");
            var amount = this.view.fundGoal.tbxAmount.text;
            if (amount === null || amount === "" || isNaN(self.deformatAmount(amount)) || !re.test(self.deformatAmount(amount)) || (parseFloat(self.deformatAmount(amount)) <= 0)) {
                CommonUtilities.disableButton(this.view.fundGoal.btnContinue);
            } else {
                CommonUtilities.enableButton(this.view.fundGoal.btnContinue);
            }
        },
        /**
         * method on click of cancel button
         */
        cancelFundGoal: function() {
            FormControllerUtility.showProgressBar(this.view);
            var accountID = this.savingsPotPresentationController.getSavingsPotCurrentAccount();
            this.savingsPotPresentationController.fetchSavingsPot(accountID);
        },
        /**
         * method on click of continue button
         */
        confirmFundBudget: function(budgetData, isFundNow) {
            var accountID = this.savingsPotPresentationController.getSavingsPotCurrentAccount();
            var savingsAccDetails = this.savingsPotPresentationController.fetchAccountByID(accountID);
            var accountDisplayName = CommonUtilities.mergeAccountNameNumber(CommonUtilities.getAccountName(savingsAccDetails), accountID);
            var savingsAccBalance = savingsAccDetails.availableBalance;
            budgetData.fundAmount = this.deformatAmount(this.view.fundGoal.tbxAmount.text.trim());
            if (parseFloat(budgetData.fundAmount) > parseFloat(savingsAccBalance)) {
                this.view.fundGoal.flxError.setVisibility(true);
				CommonUtilities.disableButton(this.view.fundGoal.btnContinue);
                this.view.fundGoal.lblError.text = kony.i18n.getLocalizedString("i18n.savingsPot.insufficientBalanceError") + ' ' + accountDisplayName;
                var skinName = ViewConstants.SKINS.FLEX_ERROR_SKIN;
                this.view.fundGoal.setSkinForAmount(skinName);
            } else {
                // budgetData.date = "09/04/2020";
                FormControllerUtility.showProgressBar(this.view);
                this.savingsPotPresentationController.presentUserInterface("frmFundBudgetConfirm", {
                    confirmBudgetData: {
                        budgetData: budgetData,
                        isFundNow: isFundNow
                    }
                });
            }
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
            this.view.fundGoal.tbxAmount.text = "";
            CommonUtilities.disableButton(this.view.fundGoal.btnContinue);
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain']);
            var skinName = ViewConstants.SKINS.FLEX_NOERROR_SKIN;
            this.view.fundGoal.setSkinForAmount(skinName);
            this.view.fundGoal.flxError.isVisible = false;
            var config = applicationManager.getConfigurationManager();
            this.view.fundGoal.lblCurrency.text = config.getCurrency(this.savingsPotPresentationController.getCurrentAccountSupportedCurrency());
        }


    };
});