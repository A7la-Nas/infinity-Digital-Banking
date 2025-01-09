define(["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants"], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
    var orientationHandler = new OrientationHandler();
    var responsiveUtils = new ResponsiveUtils();
    return {
        /*
         *it updates the form ui
         *@param {Object} createBudget view model object
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
                    if (uiData.editBudgetData) {
                        this.setBudgetDataToUI(uiData.editBudgetData);
                    }

                }
            }
        },
        //UI Code
        /**
         * onBreakpointChange : Handles ui changes on .
         * @member of {frmCreateBudgetController}
         * @param {integer} width - current browser width
         * @return {}
         * @throws {}
         */
        onBreakpointChange: function(form, width) {
            var scope = this;
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            this.view.CustomPopupLogout.onBreakpointChangeComponent(scope.view.CustomPopupLogout, width);
            FormControllerUtility.setupFormOnTouchEnd(width);
            responsiveUtils.onOrientationChange(this.onBreakpointChange);
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooter.onBreakpointChangeComponent(width);
        },
        /**
         * updateCharCountName : Updates the character count while typing in the BudgetName textbox .
         * @member of {frmCreateBudgetController}
         * @param {}
         * @return {}
         * @throws {}
         */
        updateCharCountName: function() {
            this.view.lblNameCharCount.text = this.view.tbxbudgetName.text.length + "/30";
            this.view.forceLayout(); // temp fix, need to remove
        },
        /**
           * setBudgetToUI - sets the data from createBudgetData json to the form labels
           Called from updateFormUI method.
           */

        setBudgetDataToUI: function(budgetData) {
            var editBudgetData;
            var currencySymbol = this.savingsPotPresentationController.getCurrentAccountSupportedCurrency();
            if (budgetData.potName) {
                editBudgetData = budgetData;
            } else {
                editBudgetData = this.savingsPotPresentationController.getSavingPotForId(budgetData.savingsPotId);
                editBudgetData.savingsPotId = budgetData.savingsPotId;
            }
            this.view.tbxbudgetName.text = editBudgetData.potName;
            this.view.lblNameCharCount.text = this.view.tbxbudgetName.text.length + "/30";
            this.view.tbxBudgetAmount.text = CommonUtilities.formatCurrencyWithCommas(editBudgetData.targetAmount, true);
            this.view.tbxCurrBalance.text = CommonUtilities.formatCurrencyWithCommas(editBudgetData.availableBalance, false, currencySymbol);
            CommonUtilities.enableButton(this.view.btnContinue);
            this.view.btnContinue.onClick = this.onClickUpdate.bind(this, editBudgetData);
        },
        /**
         * Method to show server error
         * @param {Boolean} status true/false
         */
        showServerError: function(status) {
            if (status === false) {
                // this.view.flxMakeTransferError.setVisibility(false);
            } else {
                FormControllerUtility.hideProgressBar(this.view);
            }
            this.view.forceLayout();
        },
        /**
         * Init Method 
         */

        init: function() {
            this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.savingsPot.editBudget");
            this.view.tbxbudgetName.maxTextLength = 30;
            this.savingsPotPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SavingsPotUIModule").presentationController;
            var scope = this;
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            //this.view.btnContinue.onClick=this.onClickUpdate;
            this.view.btnBack.onClick = this.onClickCancel;
            FormControllerUtility.wrapAmountField(this.view.tbxBudgetAmount).onKeyUp(this.validateAmount).onBeginEditing(this.deFormatAmountWithoutPrecision).onEndEditing(this.ignoreDecimalChange);
            this.restrictSpecialCharacters();
            //CommonUtilities.disableButton(this.view.btnContinue);
            this.view.tbxbudgetName.onKeyUp = function() {
                //Adding this if statement because maxTextLength prop of 30 not working for iOS devices.
                if (scope.view.tbxbudgetName.text.length > 30) {
                    scope.view.tbxbudgetName.text = scope.view.tbxbudgetName.text.substr(0, 30);
                    return;
                }
             //   scope.view.tbxbudgetName.skin = ViewConstants.SKINS.RECURRENCE_FIELD_FAST_TRANSFER;
                scope.view.flxError.isVisible = false;
                CommonUtilities.enableButton(scope.view.btnContinue);
                if (scope.view.tbxbudgetName.text == "") {
                    CommonUtilities.disableButton(scope.view.btnContinue);

                }
                scope.updateCharCountName();
            }
            this.setConfig();
            this.view.tbxbudgetName.onEndEditing = this.ignoreExtraSpace;
        },
        /*
         * deFormatAmountWithoutPrecision - used to deformat the amount without decimal precision
         * @param {} 
         * @member of {frmCreateSavingsGoalController}
         * @return {}
         * @throws {}
         */
        deFormatAmountWithoutPrecision: function() {
            this.view.flxError.isVisible = false;
            this.view.flxBudgetAmountValue.skin = ViewConstants.SKINS.FLEX_NOERROR_SKIN;
        },

        /**
         * Method to ignore extra space in budget name
         */

        ignoreExtraSpace: function() {
            this.view.tbxbudgetName.text = this.view.tbxbudgetName.text.trim();
            this.view.lblNameCharCount.text = this.view.tbxbudgetName.text.length + "/30";
        },

        /**
         * Method to ignore decimal value change
         */
        ignoreDecimalChange: function() {
            var amount = this.deformatAmount(this.view.tbxBudgetAmount.text);
            var currBalAmount = this.deformatAmount(this.view.tbxCurrBalance.text);
            if (parseInt(amount) <= parseInt(currBalAmount)) {
                this.view.flxError.isVisible = true;
                this.view.lblError.text = kony.i18n.getLocalizedString("i18n.savingsPot.errorBudgetAmountLessThanCurrBal");
                this.view.flxBudgetAmountValue.skin = ViewConstants.SKINS.FLEX_ERROR_SKIN;
            }
        },


        /**
         * Method to restrict Special Characters entry in textbox
         */
        restrictSpecialCharacters: function() {
            var scopeObj = this;
            var specialCharactersSet = "!@#&*_'-~^|$%()+=}{][/|?,.><`:;\"\\";
            var specialCharactersSet1 = "!@#&*_'-.~^|$%()+=}{][/|?,><`:;\"\\";
            var alphabetsSet = "abcdefghijklmnopqrstuvwxyz";
            scopeObj.view.tbxBudgetAmount.restrictCharactersSet = specialCharactersSet.replace(',.', '') + alphabetsSet + alphabetsSet.toUpperCase();
            scopeObj.view.tbxbudgetName.restrictCharactersSet = specialCharactersSet1.replace("!@#&*_'-.", '');
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
         * post show Method 
         */
        postShow: function() {
            this.view.customheadernew.forceCloseHamburger();
            this.setActiveHeaderHamburger();
            this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.savingsPot.editBudget");
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            FormControllerUtility.hideProgressBar(this.view);

        },
        /**
         * pre show Method 
         */
        preShow: function() {
            this.view.tbxCurrBalance.setEnabled(false);
            this.view.customheadernew.setFocus(true);
            this.view.customheadernew.flxContextualMenu.setVisibility(false);
            this.view.flxWarning.setVisibility(true);
            this.view.tbxCurrBalance.setEnabled(false);
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            this.view.lblContentHeader.text = kony.i18n.getLocalizedString("i18n.savingsPot.editBudget");
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain']);
            this.view.flxError.isVisible = false;
           // this.view.tbxbudgetName.skin = ViewConstants.SKINS.RECURRENCE_FIELD_FAST_TRANSFER;
            this.view.flxBudgetAmountValue.skin = ViewConstants.SKINS.FLEX_NOERROR_SKIN;
            var config = applicationManager.getConfigurationManager();
            this.view.lblBudgetAmtCurrency.text = config.getCurrency(this.savingsPotPresentationController.getCurrentAccountSupportedCurrency());
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
            var self = this;
            var re = new RegExp("^([0-9])+(\.[0-9]{1,2})?$");
            var amount = this.view.tbxBudgetAmount.text;
            if (amount === null || amount === "" || isNaN(self.deformatAmount(amount)) || !re.test(self.deformatAmount(amount)) || (parseFloat(self.deformatAmount(amount)) <= 0)) {
                CommonUtilities.disableButton(this.view.btnContinue);
            } else {
                CommonUtilities.enableButton(this.view.btnContinue);
            }
        },
        /**
         * Method to check duplicate budget name
         */
        checkDuplicateName: function(editBudgetData) {
            var name = this.view.tbxbudgetName.text;
            var potList = this.savingsPotPresentationController.getBudgetList();
            for (var index in potList) {
                if (name.toUpperCase() === potList[index].potName.toUpperCase()) {
                    if (editBudgetData.savingsPotId !== potList[index].savingsPotId) {
                        this.view.tbxbudgetName.skin = ViewConstants.SKINS.FLEX_ERROR_SKIN;
                        this.view.flxError.isVisible = true;
                        this.view.lblError.text = kony.i18n.getLocalizedString("i18n.savingsPot.sameBudgetNameError");

                    }
                }
            }
        },
        /**
         *Method that navigates to confirmation form
         */
        onClickUpdate: function(editBudgetData) {
            this.checkDuplicateName(editBudgetData);
            if (!this.view.flxError.isVisible) {
                var budgetAmount = parseInt(this.deformatAmount(this.view.tbxBudgetAmount.text.trim()));
                var currenbalance = parseInt(editBudgetData.availableBalance);
                var limitCheckAmount = budgetAmount + currenbalance;
                var minAmt = parseInt(applicationManager.getConfigurationManager().getMinBudgetAmount());
                if (limitCheckAmount <= minAmt) {
                    this.view.flxBudgetAmountValue.skin = ViewConstants.SKINS.FLEX_ERROR_SKIN;
                    this.view.flxError.isVisible = true;
                    this.view.lblError.text = kony.i18n.getLocalizedString("i18n.savingsPot.minLimitAmountError") + ' ' + CommonUtilities.formatCurrencyWithCommas(minAmt, true);
                } else {
                    FormControllerUtility.showProgressBar(this.view);
                    editBudgetData.potName = this.view.tbxbudgetName.text;
                    editBudgetData.targetAmount = this.deformatAmount(this.view.tbxBudgetAmount.text.trim());
                    // editBudgetData.currBalance = this.deformatAmount(this.view.tbxCurrBalance.text);
                    this.savingsPotPresentationController.presentUserInterface("frmCreateBudgetConfirm", {
                        editBudgetData: editBudgetData
                    });
                }
            }
        },
        /**
         *Method that navigates to previous form frmcreateSavingsPot
         */
        onClickCancel: function() {
            FormControllerUtility.showProgressBar(this.view);
            var accountID = this.savingsPotPresentationController.getSavingsPotCurrentAccount();
            this.savingsPotPresentationController.fetchSavingsPot(accountID);
        },
        /**
         * Method to set tool tip and accessiblity config
         */
        setConfig: function() {
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            this.view.lblContentHeader.toolTip = kony.i18n.getLocalizedString("i18n.savingspot.editBudget");
            this.view.lblWarning.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.budgetInfo");
            this.view.lblBudgetName.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.budgetName");
            this.view.lblBudgetAmount.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.budgetAmount");
            this.view.lblCurrentBalance.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.currentBalance");
            this.view.btnBack.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
            this.view.btnContinue.toolTip = kony.i18n.getLocalizedString("i18n.PayAPerson.Update");
            this.view.customheadernew.lblHeaderMobile.toolTip = kony.i18n.getLocalizedString("i18n.savingspot.editBudget");
            CommonUtilities.setText(this.view.lblContentHeader, kony.i18n.getLocalizedString("i18n.savingspot.editBudget"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblWarning, kony.i18n.getLocalizedString("i18n.savingsPot.budgetInfo"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblBudgetName, kony.i18n.getLocalizedString("i18n.savingsPot.budgetName"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblBudgetAmount, kony.i18n.getLocalizedString("i18n.savingsPot.budgetAmount"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblCurrentBalance, kony.i18n.getLocalizedString("i18n.savingsPot.currentBalance"), accessibilityConfig);
            CommonUtilities.setText(this.view.btnBack, kony.i18n.getLocalizedString("i18n.transfers.Cancel"), accessibilityConfig);
            CommonUtilities.setText(this.view.btnContinue, kony.i18n.getLocalizedString("i18n.PayAPerson.Update"), accessibilityConfig);
            CommonUtilities.setText(this.view.customheadernew.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.savingspot.editBudget"), accessibilityConfig);
        }

    };
});