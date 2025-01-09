define(["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants"], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
    var orientationHandler = new OrientationHandler();
    var responsiveUtils = new ResponsiveUtils();
    return {
        /*
         * updateFormUI - it updates the form ui
         * @param {Object} withdraw goal view model object
         * @member of {frmWithdrawGoalController}
         * @return {}
         * @throws {}
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
                if (uiData.withdrawGoal) {

                    this.setGoalDataToUI(uiData.withdrawGoal.savingsPotId);
                }
            }
        },
        /**
         * setGoalDataToUI : set goal information to all the labels .
         *@member of {frmWithdrawGoalController}
         *@param{Object} goalData - data fields 
         *@return{}
         *@throws{}
         */
        setGoalDataToUI: function(savingsPotId) {
            var accountCurrencyCode = this.savingsPotPresentationController.getCurrentAccountSupportedCurrency();
            var goalData = this.savingsPotPresentationController.getSavingPotForId(savingsPotId);
            var accountID = this.savingsPotPresentationController.getSavingsPotCurrentAccount();
            var account = this.savingsPotPresentationController.fetchAccountByID(accountID);
            var accountDisplayName = CommonUtilities.mergeAccountNameNumber(CommonUtilities.getAccountName(account), accountID);
            goalData.savingsPotId = savingsPotId;
            var config = applicationManager.getConfigurationManager();
            this.view.fundGoal.lblCurrency.text = config.getCurrency(accountCurrencyCode);
            this.view.fundGoal.lblValue1.text = goalData.potName;
            this.view.fundGoal.lblValue2.text = accountDisplayName;
            this.view.fundGoal.lblValue3.text = CommonUtilities.formatCurrencyWithCommas(goalData.targetAmount, false, accountCurrencyCode);
            this.view.fundGoal.lblValue4.text = CommonUtilities.formatCurrencyWithCommas(goalData.availableBalance, false, accountCurrencyCode);
            if (goalData.withdrawAmount) {
                this.view.fundGoal.tbxAmount.text = CommonUtilities.formatCurrencyWithCommas(goalData.withdrawAmount, true);
                CommonUtilities.enableButton(this.view.fundGoal.btnContinue);
            }
            this.view.fundGoal.btnContinue.onClick = this.navToNextScreen.bind(this, goalData);
        },
        //UI Code
        /**
         * onBreakpointChange : Handles ui changes on .
         *�@member�of�{frmWithdrawGoalController}
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
        /*
         * showServerError - Method to show server error
         * @param {Boolean} status true/false
         * @member of {frmWithdrawGoalController}
         * @return {}
         * @throws {}
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
         * init - Method triggered when form is initialized
         * @param {} 
         * @member of {frmWithdrawGoalController}
         * @return {}
         * @throws {}
         */
        init: function() {
            var scopeobj = this;
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.fundGoal.btnCancel.onClick = this.cancelWithdrawGoal;
            this.savingsPotPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SavingsPotUIModule").presentationController;
            this.setConfig();
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
        /*
         * setActiveHeaderHamburger - Method to highlight active header and hamburger
         * @param {} 
         * @member of {frmWithdrawGoalController}
         * @return {}
         * @throws {}
         */
        setActiveHeaderHamburger: function() {
            this.view.customheadernew.activateMenu("Accounts", "My Accounts");
            this.view.customheadernew.flxContextualMenu.setVisibility(false);
            this.view.customheadernew.flxAccounts.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
        },
        /*
         * restrictSpecialCharacters - Method to restrict Special Characters entry in textbox
         * @param {} 
         * @member of {frmWithdrawGoalController}
         * @return {}
         * @throws {}
         */
        restrictSpecialCharacters: function() {
            var specialCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\";
            var alphabetsSet = "abcdefghijklmnopqrstuvwxyz";
            this.view.fundGoal.tbxAmount.restrictCharactersSet = specialCharactersSet.replace(',.', '') + alphabetsSet + alphabetsSet.toUpperCase();
        },
        /*
         * navToNextScreen - on click continue
         * @param {Object} goalData - contains details of goal 
         * @member of {frmWithdrawGoalController}
         * @return {}
         * @throws {}
         */
        navToNextScreen: function(goalData) {
            var amount = applicationManager.getFormatUtilManager().deFormatAmount(this.view.fundGoal.tbxAmount.text);
            var bal = applicationManager.getFormatUtilManager().deFormatAmount(goalData.availableBalance);
            if (parseFloat(amount) > parseFloat(bal)) {
                this.view.fundGoal.lblError.text = kony.i18n.getLocalizedString("i18n.savingsPot.withdrawMoreErrorGoal") + ' ' + goalData.potName;
                this.view.fundGoal.flxError.setVisibility(true);
                var skinName = ViewConstants.SKINS.FLEX_ERROR_SKIN;
                this.view.fundGoal.setSkinForAmount(skinName);
            } else {
                FormControllerUtility.showProgressBar(this.view);
                goalData.withdrawAmount = this.deformatAmount(this.view.fundGoal.tbxAmount.text.trim());
                applicationManager.getNavigationManager().navigateTo("frmWithdrawGoalConfirm");
                applicationManager.getNavigationManager().updateForm({
                    confirmGoalData: goalData
                });
            }
        },
        /*
         * postShow - post show Method 
         * @param {} 
         * @member of {frmWithdrawGoalController}
         * @return {}
         * @throws {}
         */
        postShow: function() {
            this.view.customheadernew.forceCloseHamburger();
            this.setActiveHeaderHamburger();
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            FormControllerUtility.hideProgressBar(this.view);
        },
        /*
         * preShow - pre show Method
         * @param {} 
         * @member of {frmWithdrawGoalController}
         * @return {}
         * @throws {}
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
        /*
         * validateAmount - on key up of amount textbox
         * @param {} 
         * @member of {frmWithdrawGoalController}
         * @return {}
         * @throws {}
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
        /*
         * deformatAmount - used to deformat the amount
         * @param {} 
         * @member of {frmWithdrawGoalController}
         * @return {}
         * @throws {}
         */
        deformatAmount: function(amount) {
            return applicationManager.getFormatUtilManager().deFormatAmount(amount);
        },
        /*
         * cancelWithdrawGoal - on click cancel button
         * @param {} 
         * @member of {frmWithdrawGoalController}
         * @return {}
         * @throws {}
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
            this.view.fundGoal.lblKey3.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.goalAmount");
            this.view.fundGoal.lblKey4.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.currentBalance");
            this.view.fundGoal.lblAmount.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.withdrawnAmount");
            this.view.fundGoal.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
            this.view.fundGoal.btnContinue.toolTip = kony.i18n.getLocalizedString("i18n.userManagement.Continue");
            this.view.lblTransfers.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.withdrawGoal");
            this.view.customheadernew.lblHeaderMobile.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.withdrawGoal");
            CommonUtilities.setText(this.view.fundGoal.lblError, kony.i18n.getLocalizedString("i18n.savingspot.withdrawMoreError"), accessibilityConfig);
            CommonUtilities.setText(this.view.fundGoal.lblKey1, kony.i18n.getLocalizedString("i18n.StopCheckPayments.from"), accessibilityConfig);
            CommonUtilities.setText(this.view.fundGoal.lblKey2, kony.i18n.getLocalizedString("i18n.StopCheckPayments.To"), accessibilityConfig);
            CommonUtilities.setText(this.view.fundGoal.lblKey3, kony.i18n.getLocalizedString("i18n.savingsPot.goalAmount"), accessibilityConfig);
            CommonUtilities.setText(this.view.fundGoal.lblKey4, kony.i18n.getLocalizedString("i18n.savingsPot.currentBalance"), accessibilityConfig);
            CommonUtilities.setText(this.view.fundGoal.lblAmount, kony.i18n.getLocalizedString("i18n.savingsPot.withdrawnAmount"), accessibilityConfig);
            CommonUtilities.setText(this.view.fundGoal.btnCancel, kony.i18n.getLocalizedString("i18n.transfers.Cancel"), accessibilityConfig);
            CommonUtilities.setText(this.view.fundGoal.btnContinue, kony.i18n.getLocalizedString("i18n.userManagement.Continue"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblTransfers, kony.i18n.getLocalizedString("i18n.savingsPot.withdrawGoal"), accessibilityConfig);
            CommonUtilities.setText(this.view.customheadernew.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.savingsPot.withdrawGoal"), accessibilityConfig);

        }
    };
});