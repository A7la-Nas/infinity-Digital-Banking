define(["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants"], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
    var orientationHandler = new OrientationHandler();
    var responsiveUtils = new ResponsiveUtils();
    return {
        /*
         *it updates the form ui
         *@param {Object} createBudgetConfirm view model object
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
                        this.setBudgetDataToUI(uiData.createBudgetData, false);
                    }
                    if (uiData.editBudgetData) {
                        this.setBudgetDataToUI(uiData.editBudgetData, true);
                    }
                }
            }
        },
        //UI Code
        /**
         * onBreakpointChange : Handles ui changes on .
         * @member of {frmCreateBudgetConfirmController}
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
            this.view.confirmation.onBreakpointChangeComponent(scope.view.confirmation, width);
            if (width === 640 || orientationHandler.isMobile) {
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
            /* Binding functions with form events and actions */
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.confirmation.btnConfirm.onClick = this.onClickContinue;
            this.view.confirmation.btnModify.onClick = this.onClickModify;
            this.view.confirmation.btnCancel.onClick = this.onClickCancel;
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
         * setAccessibilityTooltips - Method to set accessibilty and tooltips to all form elements
         */
        setAccessibilityTooltips: function() {
            /* Setting Tooltips */
            this.view.confirmation.lblConfirmKey1.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.budgetName");
            this.view.confirmation.lblConfirmKey2.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.budgetAmount");
            this.view.confirmation.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
            this.view.confirmation.btnModify.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Modify");
            this.view.confirmation.btnConfirm.toolTip = kony.i18n.getLocalizedString("i18n.common.confirm");
            /* Setting Accessibility options */
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            CommonUtilities.setText(this.view.confirmation.lblConfirmKey1, kony.i18n.getLocalizedString("i18n.savingsPot.budgetName"), accessibilityConfig);
            CommonUtilities.setText(this.view.confirmation.lblConfirmKey2, kony.i18n.getLocalizedString("i18n.savingsPot.budgetAmount"), accessibilityConfig);
            CommonUtilities.setText(this.view.confirmation.btnCancel, kony.i18n.getLocalizedString("i18n.transfers.Cancel"), accessibilityConfig);
            CommonUtilities.setText(this.view.confirmation.btnModify, kony.i18n.getLocalizedString("i18n.transfers.Modify"), accessibilityConfig);
            CommonUtilities.setText(this.view.confirmation.btnConfirm, kony.i18n.getLocalizedString("i18n.common.confirm"), accessibilityConfig);
        },
        /**
           * setBudgetToUI - sets the data from createBudgetData json to the form labels in Create/Edit flows
           Called from updateFormUI method.
           */
        setBudgetDataToUI: function(budgetData, isEditFlow) {
            var currencySymbol = this.savingsPotPresentationController.getCurrentAccountSupportedCurrency();
            if (isEditFlow) {
                this.view.lblTransfers.text = kony.i18n.getLocalizedString("i18n.savingsPot.editBudgetConfirm");
                this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.savingsPot.editBudgetConfirm");
                this.view.confirmation.flxConfirmDetail3.setVisibility(true);
                this.view.confirmation.lblConfirmKey3.text = kony.i18n.getLocalizedString("i18n.savingsPot.currentBalance");
                this.view.confirmation.lblConfirmValue3.text = CommonUtilities.formatCurrencyWithCommas(budgetData.availableBalance, false, currencySymbol);
            } else {
                this.view.lblTransfers.text = kony.i18n.getLocalizedString("i18n.savingsPot.confirmationHeader2");
                this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.savingsPot.confirmationHeader2");
                this.view.confirmation.flxConfirmDetail3.setVisibility(false);

            }
            this.view.confirmation.lblConfirmValue1.text = budgetData.potName;
            this.view.confirmation.lblConfirmValue2.text = CommonUtilities.formatCurrencyWithCommas(budgetData.targetAmount, false, currencySymbol);
            this.view.confirmation.btnConfirm.onClick = this.onClickContinue.bind(this, budgetData, isEditFlow);
            this.view.confirmation.btnModify.onClick = this.onClickModify.bind(this, budgetData, isEditFlow);
            this.view.confirmation.btnCancel.onClick = this.onClickCancel.bind(this, budgetData, isEditFlow);
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
         *Method that shows create budget acknowledgement form
         */
        onClickContinue: function(budgetData, isEditFlow) {
            var accountID = this.savingsPotPresentationController.getSavingsPotCurrentAccount();
            FormControllerUtility.showProgressBar(this.view);
            if (isEditFlow) {
                var params = {
                    "savingsPotId": budgetData.savingsPotId,
                    "potAccountId": accountID,
                    "potName": budgetData.potName,
                    "potType": "Budget",
                    "targetAmount": budgetData.targetAmount

                };
                this.savingsPotPresentationController.editBudget(budgetData, params);
            } else {
                var params = {
                    "fundingAccountId": accountID,
                    "productId": "SAVINGS.ACCOUNT",
                    "potType": "Budget",
                    "potName": budgetData.potName,
                    "targetAmount": budgetData.targetAmount,
                    "currency": "USD" // applicationManager.getConfigurationManager().getCurrencyCode()
                };

                this.savingsPotPresentationController.createBudget(budgetData, params);
            }
        },
        /**
         *Method that uses to modify budget details
         */
        onClickModify: function(budgetData, isEditFlow) {
            FormControllerUtility.showProgressBar(this.view);
            if (isEditFlow) {
                this.savingsPotPresentationController.presentUserInterface("frmEditBudget", {
                    editBudgetData: budgetData
                });
            } else {
                this.savingsPotPresentationController.presentUserInterface("frmCreateBudget", {
                    createBudgetData: budgetData
                });
            }
        },
        /**
         *show or hide cancel popup 
         */
        onClickCancel: function(budgetData, isEditFlow) {
            var scopeObj = this;
            scopeObj.view.flxDialogs.setVisibility(true);
            scopeObj.view.flxCancelPopup.setVisibility(true);
            scopeObj.view.flxCancelPopup.left = "0%";
            var popupComponent = scopeObj.view.flxCancelPopup.widgets()[0];
            popupComponent.top = ((kony.os.deviceInfo().screenHeight / 2) - 135) + "px";
            if (isEditFlow) {
                scopeObj.view.CancelPopup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.savingsPot.editBudgetPopupMsg");
            } else {
                scopeObj.view.CancelPopup.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.savingsPot.cancelBudgetCreate");
            }
            let width = kony.os.deviceInfo().deviceWidth;
            if (width <= 640 || orientationHandler.isMobile) {
                this.view.CancelPopup.lblPopupMessage.skin = "sknSSP42424215Px";
            }
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
        }

    };
});