define(["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants"], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
    var orientationHandler = new OrientationHandler();
    var responsiveUtils = new ResponsiveUtils();
    return {
        /*
         *it updates the form ui
         *@param {Object} withdrawBudget view model object
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
                if (uiData.withdrawBudget) {

                    this.setBudgetDataToUI(uiData.withdrawBudget.savingsPotId);
                }
            }
        },
        /**
         * setBudgetDataToUI : set budget information to all the labels .
         *�@member�of�{frmWithdrawBudgetController}
         *�@param�{Object} budgetData - data fields 
         *�@return�{}
         *�@throws�{}
         */
        setBudgetDataToUI: function(savingsPotId) {
            var budgetData = this.savingsPotPresentationController.getSavingPotForId(savingsPotId);
            var accountID = this.savingsPotPresentationController.getSavingsPotCurrentAccount();
            var account = this.savingsPotPresentationController.fetchAccountByID(accountID);
            var currencySymbol = this.savingsPotPresentationController.getCurrentAccountSupportedCurrency();
            var config = applicationManager.getConfigurationManager();
            this.view.fundGoal.lblCurrency.text = config.getCurrency(currencySymbol);
            var accountDisplayName = CommonUtilities.mergeAccountNameNumber(CommonUtilities.getAccountName(account), accountID);
            budgetData.savingsPotId = savingsPotId;
            this.view.fundGoal.lblValue1.text = budgetData.potName;
            this.view.fundGoal.lblValue2.text = accountDisplayName;
            this.view.fundGoal.lblValue3.text = CommonUtilities.formatCurrencyWithCommas(budgetData.targetAmount, false, currencySymbol);
            this.view.fundGoal.lblValue4.text = CommonUtilities.formatCurrencyWithCommas(budgetData.availableBalance, false, currencySymbol);
            if (budgetData.withdrawAmount) {
                this.view.fundGoal.tbxAmount.text = CommonUtilities.formatCurrencyWithCommas(budgetData.withdrawAmount, true);
                CommonUtilities.enableButton(this.view.fundGoal.btnContinue);
            }
            this.view.fundGoal.btnContinue.onClick = this.navToNextScreen.bind(this, budgetData);
        },

        //UI Code
        /**
         * onBreakpointChange : Handles ui changes on .
         *�@member�of�{frmwithdrawBudgetController}
         *�@param�{integer} width - current browser width
         *�@return�{}
         *�@throws�{}
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
        /**
         * Init Method 
         */

        init: function() {
            var scopeobj = this;
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.fundGoal.btnCancel.onClick = this.cancelWithdrawGoal;
            this.setConfig();
            this.savingsPotPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SavingsPotUIModule").presentationController;
            CommonUtilities.disableButton(this.view.fundGoal.btnContinue);
            FormControllerUtility.wrapAmountField(this.view.fundGoal.tbxAmount).onKeyUp(this.validateAmount).onBeginEditing(this.deFormatAmountWithoutPrecision);
            this.restrictSpecialCharacters();
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
         * Method to restrict Special Characters entry in textbox
         */
        restrictSpecialCharacters: function() {
            var specialCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\";
            var alphabetsSet = "abcdefghijklmnopqrstuvwxyz";
            this.view.fundGoal.tbxAmount.restrictCharactersSet = specialCharactersSet.replace(',.', '') + alphabetsSet + alphabetsSet.toUpperCase();
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
         * navigate to next screen method
         */
        navToNextScreen: function(budgetData) {
            var amount = applicationManager.getFormatUtilManager().deFormatAmount(this.view.fundGoal.tbxAmount.text);
            var bal = applicationManager.getFormatUtilManager().deFormatAmount(budgetData.availableBalance);
            if (parseFloat(amount) > parseFloat(bal)) {
                this.view.fundGoal.lblError.text = kony.i18n.getLocalizedString("i18n.savingsPot.withdrawMoreErrorBudget") + ' ' + budgetData.potName;
                this.view.fundGoal.flxError.setVisibility(true);
                var skinName = ViewConstants.SKINS.FLEX_ERROR_SKIN;
                this.view.fundGoal.setSkinForAmount(skinName);
            } else {
                FormControllerUtility.showProgressBar(this.view);
                budgetData.withdrawAmount = this.deformatAmount(this.view.fundGoal.tbxAmount.text.trim());
                applicationManager.getNavigationManager().navigateTo("frmWithdrawBudgetConfirm");
                applicationManager.getNavigationManager().updateForm({
                    confirmBudgetData: budgetData
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
            // this.view.fundGoal.tbxAmount.text = config.getCurrency(this.savingsPotPresentationController.getCurrentAccountSupportedCurrency());
        },
        /**
         * validating amount textbox 
         */
        validateAmount: function() {
            var scopeobj = this;
            var re = new RegExp("^([0-9])+(\.[0-9]{1,2})?$");
            var amount = this.view.fundGoal.tbxAmount.text;
            if (amount === null || amount === "" || isNaN(scopeobj.deformatAmount(amount)) || !re.test(scopeobj.deformatAmount(amount)) || (parseFloat(scopeobj.deformatAmount(amount)) <= 0)) {
                CommonUtilities.disableButton(this.view.fundGoal.btnContinue);
            } else {
                CommonUtilities.enableButton(this.view.fundGoal.btnContinue);
            }
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
         * show or hide cancel popup
         */
        cancelWithdrawGoal: function() {
            FormControllerUtility.showProgressBar(this.view);
            var accountID = this.savingsPotPresentationController.getSavingsPotCurrentAccount();
            this.savingsPotPresentationController.fetchSavingsPot(accountID);
        },
        /**
         * Method to set tool tip and accessiblity config
         */
        setConfig: function() {
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            this.view.fundGoal.lblError.toolTip = kony.i18n.getLocalizedString("i18n.savingspot.withdrawMoreError");
            this.view.fundGoal.lblKey1.toolTip = kony.i18n.getLocalizedString("i18n.StopCheckPayments.from");
            this.view.fundGoal.lblKey2.toolTip = kony.i18n.getLocalizedString("i18n.StopCheckPayments.To");
            this.view.fundGoal.lblKey3.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.budgetAmount");
            this.view.fundGoal.lblKey4.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.currentBalance");
            this.view.fundGoal.lblAmount.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.withdrawnAmount");
            this.view.fundGoal.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
            this.view.fundGoal.btnContinue.toolTip = kony.i18n.getLocalizedString("i18n.userManagement.Continue");
            this.view.lblTransfers.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.withdrawBudget");
            this.view.customheadernew.lblHeaderMobile.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.withdrawBudget");
            CommonUtilities.setText(this.view.fundGoal.lblError, kony.i18n.getLocalizedString("i18n.savingspot.withdrawMoreError"), accessibilityConfig);
            CommonUtilities.setText(this.view.fundGoal.lblKey1, kony.i18n.getLocalizedString("i18n.StopCheckPayments.from"), accessibilityConfig);
            CommonUtilities.setText(this.view.fundGoal.lblKey2, kony.i18n.getLocalizedString("i18n.StopCheckPayments.To"), accessibilityConfig);
            CommonUtilities.setText(this.view.fundGoal.lblKey3, kony.i18n.getLocalizedString("i18n.savingsPot.budgetAmount"), accessibilityConfig);
            CommonUtilities.setText(this.view.fundGoal.lblKey4, kony.i18n.getLocalizedString("i18n.savingsPot.currentBalance"), accessibilityConfig);
            CommonUtilities.setText(this.view.fundGoal.lblAmount, kony.i18n.getLocalizedString("i18n.savingsPot.withdrawnAmount"), accessibilityConfig);
            CommonUtilities.setText(this.view.fundGoal.btnCancel, kony.i18n.getLocalizedString("i18n.transfers.Cancel"), accessibilityConfig);
            CommonUtilities.setText(this.view.fundGoal.btnContinue, kony.i18n.getLocalizedString("i18n.userManagement.Continue"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblTransfers, kony.i18n.getLocalizedString("i18n.savingsPot.withdrawBudget"), accessibilityConfig);
            CommonUtilities.setText(this.view.customheadernew.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.savingsPot.withdrawBudget"), accessibilityConfig);

        }
    };
});