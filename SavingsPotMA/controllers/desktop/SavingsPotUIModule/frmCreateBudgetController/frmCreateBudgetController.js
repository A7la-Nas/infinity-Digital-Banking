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
                    if (uiData.createBudgetData) {
                        this.setBudgetDataToUI(uiData.createBudgetData);
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

            this.updateCharCountName();
            this.view.btnContinue.onClick = this.onClickContinue.bind(this, budgetData);
            if (budgetData.potName) {
                this.view.tbxbudgetName.text = budgetData.potName;
                this.view.lblNameCharCount.text = this.view.tbxbudgetName.text.length + "/30";
                CommonUtilities.enableButton(this.view.btnContinue);
            }
            if (budgetData.targetAmount)
                this.view.tbxAmount.text = CommonUtilities.formatCurrencyWithCommas(budgetData.targetAmount, true);
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
        /*
         * deFormatAmountWithoutPrecision - used to deformat the amount without decimal precision
         * @param {} 
         * @member of {frmCreateSavingsGoalController}
         * @return {}
         * @throws {}
         */
        deFormatAmountWithoutPrecision: function() {
            this.view.flxAmountValue.skin = ViewConstants.SKINS.FLEX_NOERROR_SKIN;
            this.view.flxError.isVisible = false;

        },

        /**
         * Init Method 
         */

        init: function() {
            var scope = this;
            /* Binding functions with form actions */
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            CommonUtilities.disableButton(this.view.btnContinue);
            this.view.onDeviceBack = function() {};
            FormControllerUtility.wrapAmountField(this.view.tbxAmount).onKeyUp(this.validateAmount).onBeginEditing(this.deFormatAmountWithoutPrecision);
            this.restrictSpecialCharacters();
            this.savingsPotPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SavingsPotUIModule").presentationController;
            /* Functionalites to be executed during form initialisation */
            this.setConfig();

            this.view.tbxbudgetName.onKeyUp = function() {
                //Adding this if statement because maxTextLength prop of 30 not working for iOS devices.
                if (scope.view.tbxbudgetName.text.length > 30) {
                    scope.view.tbxbudgetName.text = scope.view.tbxbudgetName.text.substr(0, 30);
                    return;
                }
                scope.view.tbxbudgetName.skin = ViewConstants.SKINS.RECURRENCE_FIELD_FAST_TRANSFER;
                scope.view.flxError.isVisible = false;
                if (scope.view.tbxAmount.text !== "" && scope.view.tbxbudgetName.text !== "") {
                    CommonUtilities.enableButton(scope.view.btnContinue);
                } else {
                    CommonUtilities.disableButton(scope.view.btnContinue);
                }
                scope.updateCharCountName();
            }
            this.view.tbxbudgetName.onEndEditing = this.ignoreExtraSpace;
        },
        /**
         * Method to ignore extra space in budget name
         */

        ignoreExtraSpace: function() {
            this.view.tbxbudgetName.text = this.view.tbxbudgetName.text.trim();
            this.view.lblNameCharCount.text = this.view.tbxbudgetName.text.length + "/30";
        },
        /**
         * Method to check duplicate budget name
         */
        checkDuplicateName: function() {
            var name = this.view.tbxbudgetName.text;
            var potList = this.savingsPotPresentationController.getBudgetList();
            for (var index in potList) {
                if (name.toUpperCase() === potList[index].potName.toUpperCase()) {
                    this.view.tbxbudgetName.skin = ViewConstants.SKINS.FLEX_ERROR_SKIN;
                    this.view.flxError.isVisible = true;
                    this.view.lblError.text = kony.i18n.getLocalizedString("i18n.savingsPot.sameBudgetNameError")
                }
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
            scopeObj.view.tbxAmount.restrictCharactersSet = specialCharactersSet.replace(',.', '') + alphabetsSet + alphabetsSet.toUpperCase();
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
         * setConfig - Method to include accessibility configs and tooltip
         */
        setConfig: function() {
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.btnBack.onClick = this.onClickBack;
            this.view.tbxbudgetName.maxTextLength = 30;
            this.view.lblContentHeader.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.lblTitleCreateBudget");
            this.view.customheadernew.lblHeaderMobile.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.lblTitleCreateBudget");
            this.view.lblBudgetName.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.budgetName");
            this.view.lblBudgetAmount.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.budgetAmount");
            this.view.btnContinue.toolTip = kony.i18n.getLocalizedString("i18n.userManagement.Continue");
            this.view.btnBack.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            CommonUtilities.setText(this.view.lblContentHeader, kony.i18n.getLocalizedString("i18n.savingsPot.lblTitleCreateBudget"), accessibilityConfig);
            CommonUtilities.setText(this.view.customheadernew.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.savingsPot.lblTitleCreateBudget"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblBudgetName, kony.i18n.getLocalizedString("i18n.savingsPot.budgetName"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblBudgetAmount, kony.i18n.getLocalizedString("i18n.savingsPot.budgetAmount"), accessibilityConfig);
            CommonUtilities.setText(this.view.btnContinue, kony.i18n.getLocalizedString("i18n.userManagement.Continue"), accessibilityConfig);
            CommonUtilities.setText(this.view.btnBack, kony.i18n.getLocalizedString("i18n.transfers.Cancel"), accessibilityConfig);
        },
        /**
         * post show Method 
         */
        postShow: function() {
            this.view.customheadernew.forceCloseHamburger();
            this.setActiveHeaderHamburger();
            this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.savingsPot.lblTitleCreateBudget");
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            FormControllerUtility.hideProgressBar(this.view);
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
            var amount = this.view.tbxAmount.text;
            if (amount === null || amount === "" || isNaN(self.deformatAmount(amount)) || !re.test(self.deformatAmount(amount)) || (parseFloat(self.deformatAmount(amount)) <= 0)) {
                CommonUtilities.disableButton(this.view.btnContinue);
            } else {
                if (this.view.tbxbudgetName.text !== "") {
                    CommonUtilities.enableButton(this.view.btnContinue);
                }
            }
        },
        /**
         * pre show Method 
         */
        preShow: function() {
            this.view.tbxAmount.text = "";
            this.view.tbxbudgetName.text = "";
            this.view.lblNameCharCount.text = "0/30";
            this.view.customheadernew.setFocus(true);
            this.view.customheadernew.flxContextualMenu.setVisibility(false);
            CommonUtilities.disableButton(this.view.btnContinue);
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain']);
            this.view.flxError.isVisible = false;
            this.view.tbxbudgetName.skin = ViewConstants.SKINS.RECURRENCE_FIELD_FAST_TRANSFER;
            var config = applicationManager.getConfigurationManager();
            this.view.lblCurrency.text = config.getCurrency(this.savingsPotPresentationController.getCurrentAccountSupportedCurrency());
        },
        /**
         *Method that navigates to confirmation form
         */
        onClickContinue: function(createBudgetData) {
            this.checkDuplicateName();
            if (!this.view.flxError.isVisible) {
                var budgetAmount = parseInt(this.deformatAmount(this.view.tbxAmount.text.trim()));
                var minAmt = parseInt(applicationManager.getConfigurationManager().getMinBudgetAmount());
                if (budgetAmount <= minAmt) {
                    this.view.flxAmountValue.skin = ViewConstants.SKINS.FLEX_ERROR_SKIN;
                    this.view.flxError.isVisible = true;
                    this.view.lblError.text = kony.i18n.getLocalizedString("i18n.savingsPot.minLimitAmountError") + ' ' + CommonUtilities.formatCurrencyWithCommas(minAmt, true);
                } else {
                    FormControllerUtility.showProgressBar(this.view);
                    createBudgetData.potName = this.view.tbxbudgetName.text;
                    createBudgetData.targetAmount = this.deformatAmount(this.view.tbxAmount.text.trim());
                    this.savingsPotPresentationController.presentUserInterface("frmCreateBudgetConfirm", {
                        createBudgetData: createBudgetData
                    });
                }
            }
        },
        /**
         *Method that navigates to previous form frmcreateSavingsPot
         */
        onClickBack: function() {
            FormControllerUtility.showProgressBar(this.view);
            var accountID = this.savingsPotPresentationController.getSavingsPotCurrentAccount();
            this.savingsPotPresentationController.fetchSavingsPot(accountID);
        }
    };
});