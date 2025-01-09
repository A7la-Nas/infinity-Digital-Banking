define(["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants"], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
    var orientationHandler = new OrientationHandler();
    var responsiveUtils = new ResponsiveUtils();
    return {
        /*
         *it updates the form ui
         *@param {Object} withdrawBudgetConfirm view model object
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
                if (uiData.confirmBudgetData) {
                    this.setDataToConfirmUI(uiData.confirmBudgetData);
                }
            }
        },
        /**
         * setDataToConfirmUI : method that binds budget data to form .
         *�@member�of�{frmWithdrawBudgetConfirmController}
         *�@param�{Object} budgetData - data 
         *�@return�{}
         *�@throws�{}
         */
        setDataToConfirmUI: function(budgetData) {
            var accountID = this.savingsPotPresentationController.getSavingsPotCurrentAccount();
            var account = this.savingsPotPresentationController.fetchAccountByID(accountID);
            var currencySymbol = this.savingsPotPresentationController.getCurrentAccountSupportedCurrency();
            var accountDisplayName = CommonUtilities.mergeAccountNameNumber(CommonUtilities.getAccountName(account), accountID);
            this.view.confirmation.lblConfirmValue1.text = budgetData.potName;
            this.view.confirmation.lblConfirmValue2.text = accountDisplayName;
            this.view.confirmation.lblConfirmValue3.text = CommonUtilities.formatCurrencyWithCommas(budgetData.targetAmount, false, currencySymbol);
            this.view.confirmation.lblConfirmValue4.text = CommonUtilities.formatCurrencyWithCommas(budgetData.availableBalance, false, currencySymbol);
            this.view.confirmation.lblConfirmValue5.text = CommonUtilities.formatCurrencyWithCommas(budgetData.withdrawAmount, false, currencySymbol);
            this.view.confirmation.btnConfirm.onClick = this.onClickContinue.bind(this, budgetData);
            this.view.confirmation.btnModify.onClick = this.onClickModify.bind(this, budgetData);
        },

        //UI Code
        /**
         * onBreakpointChange : Handles ui changes on .
         *�@member�of�{frmWithdrawBudgetConfirmController}
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
            this.view.confirmation.onBreakpointChangeComponent(scope.view.confirmation, width);
            if (width === 640 || orientationHandler.isMobile) {
                this.view.confirmation.flxConfirmKey1.width = "20%";
                this.view.confirmation.flxConfirmKey2.width = "20%";
                this.view.confirmation.flxConfirmValue1.width = "77%";
                this.view.confirmation.flxConfirmValue2.width = "77%";
                this.view.CancelPopup.height = "250px";
            }
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
            this.view.confirmation.btnCancel.onClick = this.onClickCancel;
            this.savingsPotPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SavingsPotUIModule").presentationController;
            this.setConfig();
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
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            FormControllerUtility.hideProgressBar(this.view)
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
         *Method that shows create goal acknowledgement form
         */
        onClickContinue: function(budgetData) {
            FormControllerUtility.showProgressBar(this.view);
            var params = {
                "savingsPotId": budgetData.savingsPotId,
                "potAccountId": budgetData.potAccountId,
                "amount": budgetData.withdrawAmount,
                "isCreditDebit": "Debit"
            }
            this.savingsPotPresentationController.withdrawBudget(budgetData, params);
        },
        /**
         *Method that uses to modify goal details
         */
        onClickModify: function(budgetData) {
            FormControllerUtility.showProgressBar(this.view);
            this.savingsPotPresentationController.presentUserInterface("frmWithdrawBudget", {
                withdrawBudget: budgetData
            });
        },
        /**
         *show or hide cancel popup 
         */
        onClickCancel: function() {
            var scopeObj = this;
            scopeObj.view.flxDialogs.setVisibility(true);
            scopeObj.view.flxCancelPopup.setVisibility(true);
            scopeObj.view.flxCancelPopup.left = "0%";
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            CommonUtilities.setText(this.view.CancelPopup.lblPopupMessage, kony.i18n.getLocalizedString("I18n.billPay.QuitTransactionMsg"), accessibilityConfig);
            var popupComponent = scopeObj.view.flxCancelPopup.widgets()[0];
            popupComponent.top = ((kony.os.deviceInfo().screenHeight / 2) - 135) + "px";
            popupComponent.btnYes.onClick = function() {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.left = "-100%";
                FormControllerUtility.showProgressBar(scopeObj.view);
                var accountID = scopeObj.savingsPotPresentationController.getSavingsPotCurrentAccount();
                scopeObj.savingsPotPresentationController.fetchSavingsPot(accountID);
            };
            popupComponent.btnNo.onClick = function() {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.left = "-100%";
            }
            popupComponent.flxCross.onClick = function() {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.left = "-100%";
            }
        },
        /**
         * Method to set tool tip and accessiblity config
         */
        setConfig: function() {
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            this.view.confirmation.lblConfirmKey1.toolTip = kony.i18n.getLocalizedString("i18n.StopCheckPayments.from");
            this.view.confirmation.lblConfirmKey2.toolTip = kony.i18n.getLocalizedString("i18n.StopCheckPayments.To");
            this.view.confirmation.lblConfirmKey3.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.budgetAmount");
            this.view.confirmation.lblConfirmKey4.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.currentBalance");
            this.view.confirmation.lblConfirmKey5.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.withdrawnAmount");
            this.view.confirmation.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
            this.view.confirmation.btnModify.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Modify");
            this.view.confirmation.btnConfirm.toolTip = kony.i18n.getLocalizedString("i18n.common.confirm");
            this.view.lblTransfers.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.confirmWithdrawHeader");
            this.view.customheadernew.lblHeaderMobile.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.confirmWithdrawHeader");
            this.view.CancelPopup.lblHeading.toolTip = kony.i18n.getLocalizedString("i18n.PayAPerson.Quit");
            this.view.CancelPopup.lblPopupMessage.toolTip = kony.i18n.getLocalizedString("i18n.Transfers.Areyousureyouwanttocancelthistransaction");
            CommonUtilities.setText(this.view.confirmation.lblConfirmKey1, kony.i18n.getLocalizedString("i18n.StopCheckPayments.from"), accessibilityConfig);
            CommonUtilities.setText(this.view.confirmation.lblConfirmKey2, kony.i18n.getLocalizedString("i18n.StopCheckPayments.To"), accessibilityConfig);
            CommonUtilities.setText(this.view.confirmation.lblConfirmKey3, kony.i18n.getLocalizedString("i18n.savingsPot.budgetAmount"), accessibilityConfig);
            CommonUtilities.setText(this.view.confirmation.lblConfirmKey4, kony.i18n.getLocalizedString("i18n.savingsPot.currentBalance"), accessibilityConfig);
            CommonUtilities.setText(this.view.confirmation.lblConfirmKey5, kony.i18n.getLocalizedString("i18n.savingsPot.withdrawnAmount"), accessibilityConfig);
            CommonUtilities.setText(this.view.confirmation.btnCancel, kony.i18n.getLocalizedString("i18n.transfers.Cancel"), accessibilityConfig);
            CommonUtilities.setText(this.view.confirmation.btnModify, kony.i18n.getLocalizedString("i18n.transfers.Modify"), accessibilityConfig);
            CommonUtilities.setText(this.view.confirmation.btnConfirm, kony.i18n.getLocalizedString("i18n.common.confirm"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblTransfers, kony.i18n.getLocalizedString("i18n.savingsPot.confirmWithdrawHeader"), accessibilityConfig);
            CommonUtilities.setText(this.view.customheadernew.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.savingsPot.confirmWithdrawHeader"), accessibilityConfig);
            CommonUtilities.setText(this.view.CancelPopup.lblHeading, kony.i18n.getLocalizedString("i18n.PayAPerson.Quit"), accessibilityConfig);
            CommonUtilities.setText(this.view.CancelPopup.lblPopupMessage, kony.i18n.getLocalizedString("i18n.Transfers.Areyousureyouwanttocancelthistransaction"), accessibilityConfig);

        }
    };
});