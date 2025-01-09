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
                    if (uiData.fundGoal) {
                        this.setGoalDataToUI(uiData.fundGoal.savingsPotId);
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
            this.view.fundGoal.onBreakpointChangeComponent(scope.view.fundGoal, width);
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
         * setGoalDataToUI : set Goal information to all the labels .
         * @member of {frmFundBudgetController}
         * @param1 {String} savingsPotId - Id of the selected savings pot.
         */
        setGoalDataToUI: function(savingsPotId) {
            var accountCurrencyCode = this.savingsPotPresentationController.getCurrentAccountSupportedCurrency();
            var goalData = this.savingsPotPresentationController.getSavingPotForId(savingsPotId);
            var accountID = this.savingsPotPresentationController.getSavingsPotCurrentAccount();
            var account = this.savingsPotPresentationController.fetchAccountByID(accountID);
            var accountDisplayName = CommonUtilities.mergeAccountNameNumber(CommonUtilities.getAccountName(account), accountID);
            goalData.savingsPotId = savingsPotId;
            if (goalData.fundAmount) {
                this.view.fundGoal.tbxAmount.text = CommonUtilities.formatCurrencyWithCommas(goalData.fundAmount, true);
                CommonUtilities.enableButton(this.view.fundGoal.btnContinue);
            }
            var config = applicationManager.getConfigurationManager();
            this.view.fundGoal.lblCurrency.text = config.getCurrency(accountCurrencyCode);
            this.view.fundGoal.lblValue1.text = accountDisplayName;
            this.view.fundGoal.lblValue2.text = goalData.potName;
            this.view.fundGoal.lblValue3.text = CommonUtilities.formatCurrencyWithCommas(goalData.targetAmount, false, accountCurrencyCode);
            this.view.fundGoal.lblValue4.text = CommonUtilities.formatCurrencyWithCommas(goalData.availableBalance, false, accountCurrencyCode);
            this.view.fundGoal.btnContinue.onClick = this.confirmFundGoal.bind(this, goalData);
        },
        /**
         * init : Form Initialisation
         * @member of {frmFundBudgetController}
         * Takes no parameter  
         */
        init: function() {
            /* Binding the events to functions */
            var scope = this;
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.fundGoal.btnCancel.onClick = this.cancelFundGoal;
            this.savingsPotPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SavingsPotUIModule").presentationController;
            /* Functionalities to be executed on Initialisation */
            this.setAccessibilityTooltips();
            FormControllerUtility.wrapAmountField(this.view.fundGoal.tbxAmount).onKeyUp(this.validateAmount).onBeginEditing(this.deFormatAmountWithoutPrecision);
            this.restrictSpecialCharacters();
            CommonUtilities.disableButton(this.view.fundGoal.btnContinue);
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
         * setActiveHeaderHamburger : Method to highlight active header and hamburger
         * @member of {frmFundBudgetController}
         * Takes no parameter
         */
        setActiveHeaderHamburger: function() {
            this.view.customheadernew.activateMenu("Accounts", "My Accounts");
            this.view.customheadernew.flxContextualMenu.setVisibility(false);
            this.view.customheadernew.flxAccounts.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
        },
        /**
         * setAccessibilityTooltips : Method to set Accessibility and Tooltip texts
         * @member of {frmFundBudgetController}
         * Takes no parameter
         */
        setAccessibilityTooltips: function() {
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            /* Accessibility Tooltips for form header */
            this.view.lblTransfers.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.fundYourGoal");
            CommonUtilities.setText(this.view.lblTransfers, kony.i18n.getLocalizedString("i18n.savingsPot.fundYourGoal"), accessibilityConfig);
            /* Accessibility Tooltips for form details */
            this.view.fundGoal.lblKey1.toolTip = kony.i18n.getLocalizedString("i18n.StopCheckPayments.from");
            CommonUtilities.setText(this.view.fundGoal.lblKey1, kony.i18n.getLocalizedString("i18n.StopCheckPayments.from"), accessibilityConfig);
            this.view.fundGoal.lblKey2.toolTip = kony.i18n.getLocalizedString("i18n.StopCheckPayments.To");
            CommonUtilities.setText(this.view.fundGoal.lblKey2, kony.i18n.getLocalizedString("i18n.StopCheckPayments.To"), accessibilityConfig);
            this.view.fundGoal.lblKey3.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.goalAmount");
            CommonUtilities.setText(this.view.fundGoal.lblKey3, kony.i18n.getLocalizedString("i18n.savingsPot.goalAmount"), accessibilityConfig);
            this.view.fundGoal.lblKey4.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.currentBalance");
            CommonUtilities.setText(this.view.fundGoal.lblKey4, kony.i18n.getLocalizedString("i18n.savingsPot.currentBalance"), accessibilityConfig);
            this.view.fundGoal.lblAmount.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.fundAmount");
            CommonUtilities.setText(this.view.fundGoal.lblAmount, kony.i18n.getLocalizedString("i18n.savingsPot.fundAmount"), accessibilityConfig);
            /* Accessibility Tooltips for form buttons */
            this.view.fundGoal.btnContinue.toolTip = kony.i18n.getLocalizedString("i18n.userManagement.Continue");
            CommonUtilities.setText(this.view.fundGoal.btnContinue, kony.i18n.getLocalizedString("i18n.userManagement.Continue"), accessibilityConfig);
            this.view.fundGoal.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
            CommonUtilities.setText(this.view.fundGoal.btnCancel, kony.i18n.getLocalizedString("i18n.konybb.common.cancel"), accessibilityConfig);
        },
        /**
         * cancelFundGoal : method on click of cancel button
         * @member of {frmFundBudgetController}
         * Takes no parameter
         */
        cancelFundGoal: function() {
            FormControllerUtility.showProgressBar(this.view);
            var accountID = this.savingsPotPresentationController.getSavingsPotCurrentAccount();
            this.savingsPotPresentationController.fetchSavingsPot(accountID);
        },
        /**
         * confirmFundGoal : Method on click of continue button
         * @member of {frmFundBudgetController}
         * @param1 {Object} goalData - Object holds the details of the goal
         */
        confirmFundGoal: function(goalData) {
            var accountID = this.savingsPotPresentationController.getSavingsPotCurrentAccount();
            var savingsAccDetails = this.savingsPotPresentationController.fetchAccountByID(accountID);
            var accountDisplayName = CommonUtilities.mergeAccountNameNumber(CommonUtilities.getAccountName(savingsAccDetails), accountID);
            var savingsAccBalance = savingsAccDetails.availableBalance;
            goalData.fundAmount = this.deformatAmount(this.view.fundGoal.tbxAmount.text.trim());
            var limitCheckAmount = Number(goalData.fundAmount) + Number(goalData.availableBalance);
            var maxAmt = Number(applicationManager.getConfigurationManager().getMaxGoalAmount());
            var minAmt = Number(applicationManager.getConfigurationManager().getMinGoalAmount());

            if (limitCheckAmount >= maxAmt || limitCheckAmount <= minAmt) {
                this.view.fundGoal.flxError.setVisibility(true);
                this.view.fundGoal.lblError.text = kony.i18n.getLocalizedString("i18n.savingsPot.maxLimitAmountError") + ' ' + CommonUtilities.formatCurrencyWithCommas(minAmt, true) + " & " + CommonUtilities.formatCurrencyWithCommas(maxAmt, true);
                var skinName = ViewConstants.SKINS.FLEX_ERROR_SKIN;
                this.view.fundGoal.setSkinForAmount(skinName);
            } else {
                if (parseFloat(goalData.fundAmount) > parseFloat(savingsAccBalance)) {
                    this.view.fundGoal.flxError.setVisibility(true);
                    this.view.fundGoal.lblError.text = kony.i18n.getLocalizedString("i18n.savingsPot.insufficientBalanceError") + ' ' + accountDisplayName;
                    var skinName = ViewConstants.SKINS.FLEX_ERROR_SKIN;
                    this.view.fundGoal.setSkinForAmount(skinName);
                } else {
                    FormControllerUtility.showProgressBar(this.view);
                    this.savingsPotPresentationController.presentUserInterface("frmFundGoalConfirm", {
                        confirmGoalData: goalData
                    });
                }
            }
        },
        /**
         * restrictSpecialCharacters : Method to restrict Special Characters entry in textbox
         * @member of {frmFundBudgetController}
         * Takes no parameter
         */
        restrictSpecialCharacters: function() {
            var specialCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\";
            var alphabetsSet = "abcdefghijklmnopqrstuvwxyz";
            this.view.fundGoal.tbxAmount.restrictCharactersSet = specialCharactersSet.replace(',.', '') + alphabetsSet + alphabetsSet.toUpperCase();
        },
        /**
         * deformatAmount : Used to deformat the amount
         * @member of {frmFundBudgetController}
         * @param1 {String} amount - Amount string with Currenct and comma characters.
         */
        deformatAmount: function(amount) {
            return applicationManager.getFormatUtilManager().deFormatAmount(amount);
        },
        /**
         * onKeyUp : onKeyUp action  of amount textbox 
         * @member of {frmFundBudgetController}
         * Takes no parameter
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
         * postShow : Post show Method 
         * @member of {frmFundBudgetController}
         * Takes no parameter
         */
        postShow: function() {
            this.view.customheadernew.forceCloseHamburger();
            this.setActiveHeaderHamburger();
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            FormControllerUtility.hideProgressBar(this.view);
        },
        /**
         * preShow : Pre show Method 
         * @member of {frmFundBudgetController}
         * Takes no parameter
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
        },
    };
});