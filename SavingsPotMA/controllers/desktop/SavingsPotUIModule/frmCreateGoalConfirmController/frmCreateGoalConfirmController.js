define(["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants"], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
    var orientationHandler = new OrientationHandler();
    var responsiveUtils = new ResponsiveUtils();
    return {
        /*
         * updateFormUI - it updates the form ui
         * @param {Object} view model object
         * @member of {frmCreateGoalConfirmController}
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
                    if (uiData.createGoalData) {
                        this.setDataToConfirm(uiData.createGoalData, true);
                        this.setDataToConfirmUI(true);

                    }
                    if (uiData.editGoalData) {
                        this.setDataToConfirm(uiData.editGoalData, false);
                        this.setDataToConfirmUI(false);
                    }
                }
            }
        },
        /**
         * setDataToConfirmUI : method that binds budget data to form .
         * @member of {frmCreateGoalConfirmController}
         * @param {Boolean} isCreate - data flow from Create/Edit - true/false 
         * @return {}
         * @throws {}
         */
        setDataToConfirmUI: function(isCreate) {
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            if (isCreate) {
                this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.savingsPot.confirmationHeader");
                CommonUtilities.setText(this.view.customheadernew.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.savingsPot.confirmationHeader"), accessibilityConfig);
                CommonUtilities.setText(this.view.CancelPopup.lblPopupMessage, kony.i18n.getLocalizedString("i18n.savingsPot.cancelCreate"), accessibilityConfig);
                this.view.CancelPopup.lblPopupMessage.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.cancelCreate");
                this.view.lblTransfers.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.confirmationHeader");
                this.view.customheadernew.lblHeaderMobile.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.confirmationHeader");
                CommonUtilities.setText(this.view.lblTransfers, kony.i18n.getLocalizedString("i18n.savingsPot.confirmationHeader"), accessibilityConfig);
                this.view.confirmation.flxConfirmDetail33.setVisibility(false);
                this.view.confirmation.flxConfirmDetail44.setVisibility(false);
                this.view.confirmation.flxConfirmDetail5.setVisibility(true);
            } else {
                this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.savingsPot.editGoalConfirm");
                CommonUtilities.setText(this.view.customheadernew.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.savingsPot.editGoalConfirm"), accessibilityConfig);
                CommonUtilities.setText(this.view.CancelPopup.lblPopupMessage, kony.i18n.getLocalizedString("i18n.savingsPot.editGoalPopupMsg"), accessibilityConfig);
                this.view.CancelPopup.lblPopupMessage.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.editGoalPopupMsg");
                this.view.lblTransfers.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.editGoalConfirm");
                this.view.customheadernew.lblHeaderMobile.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.editGoalConfirm");
                CommonUtilities.setText(this.view.lblTransfers, kony.i18n.getLocalizedString("i18n.savingsPot.editGoalConfirm"), accessibilityConfig);
                CommonUtilities.setText(this.view.customheadernew.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.savingsPot.editGoalConfirm"), accessibilityConfig);
                this.view.confirmation.flxConfirmDetail33.setVisibility(true);
                this.view.confirmation.flxConfirmDetail44.setVisibility(true);
                this.view.confirmation.flxConfirmDetail5.setVisibility(false);
            }
        },
        /**
         * setDataToConfirm : method that binds goal data to form .
         * @member of {frmCreateGoalConfirmController}
         * @param {Object} goalData - data 
         * @param {Boolean} data flows from Create/Edit - true/false
         * @return {}
         * @throws {}
         */
        setDataToConfirm: function(goalData, isCreate) {
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();

            if (goalData.frequency == OLBConstants.SAVINGS_POT_TRANSACTION_RECURRENCE.MONTHLY) {
                this.view.confirmation.lblConfirmKey7.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.frequencyDate");
                CommonUtilities.setText(this.view.confirmation.lblConfirmKey7, kony.i18n.getLocalizedString("i18n.savingsPot.frequencyDate"), accessibilityConfig);
            } else {
                this.view.confirmation.lblConfirmKey7.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.frequencyDayAck");
                CommonUtilities.setText(this.view.confirmation.lblConfirmKey7, kony.i18n.getLocalizedString("i18n.savingsPot.frequencyDayAck"), accessibilityConfig);
            }
            this.view.confirmation.lblConfirmValue1.text = goalData.potName;
            this.view.confirmation.lblConfirmValue0.text = goalData.savingsType;
            this.view.confirmation.lblConfirmValue2.text = CommonUtilities.formatCurrencyWithCommas(goalData.targetAmount, false, goalData.currency);
            this.view.confirmation.lblConfirmValue3.text = goalData.targetPeriod;
            this.view.confirmation.lblConfirmValue4.text = CommonUtilities.formatCurrencyWithCommas(goalData.periodicContribution, false, goalData.currency);
            this.view.confirmation.lblConfirmValue6.text = goalData.frequency;
            this.view.confirmation.lblConfirmValue7.text = goalData.frequencyDate;
            this.view.confirmation.lblConfirmValue8.text = CommonUtilities.getFrontendDateString(goalData.endDate);
            if (isCreate) {
                this.view.confirmation.lblConfirmValue5.text = CommonUtilities.getFrontendDateString(goalData.startDate);
            } else {
                this.view.confirmation.lblConfirmValue33.text = CommonUtilities.formatCurrencyWithCommas(goalData.availableBalance, false, goalData.currency);
                this.view.confirmation.lblConfirmValue44.text = CommonUtilities.formatCurrencyWithCommas(goalData.remainingSavings, false, goalData.currency);
            }
            this.view.confirmation.btnConfirm.onClick = this.onClickContinue.bind(this, goalData, isCreate);
            this.view.confirmation.btnModify.onClick = this.onClickModify.bind(this, goalData, isCreate);
        },
        //UI Code
        /**
         * onBreakpointChange : Handles ui changes on .
         * @member of {frmCreateGoalConfirmController}
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
            if (width === 1024 || width === 1366 || width === 1380) {
                this.view.confirmation.flxSubHeader.isVisible = true;
                this.view.confirmation.flxHorizontalLine.isVisible = true;
            }
        },
        /*
         * showServerError - Method to show server error
         * @param {Boolean} status true/false
         * @member of {frmCreateGoalConfirmController}
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
         * @member of {frmCreateGoalConfirmController}
         * @return {}
         * @throws {}
         */
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.confirmation.btnCancel.onClick = this.onClickCancel;
            /* Functionalities to be executed during form initialisation */
            this.setAccessibilityTooltips();
        },
        /*
         * setActiveHeaderHamburger - Method to highlight active header and hamburger
         * @param {} 
         * @member of {frmCreateGoalConfirmController}
         * @return {}
         * @throws {}
         */
        setActiveHeaderHamburger: function() {
            this.view.customheadernew.activateMenu("Accounts", "My Accounts");
            this.view.customheadernew.flxContextualMenu.setVisibility(false);
            this.view.customheadernew.flxAccounts.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
        },
        /*
         * setAccessibilityTooltips - method to set accessibility tooltips for the form elements
         * @param {} 
         * @member of {frmCreateGoalConfirmController}
         * @return {}
         * @throws {}
         */
        setAccessibilityTooltips: function() {
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            this.view.confirmation.lblConfirmKey1.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.goalName");
            CommonUtilities.setText(this.view.confirmation.lblConfirmKey1, kony.i18n.getLocalizedString("i18n.savingsPot.goalName"), accessibilityConfig);
            this.view.confirmation.lblConfirmKey2.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.goalAmount");
            CommonUtilities.setText(this.view.confirmation.lblConfirmKey2, kony.i18n.getLocalizedString("i18n.savingsPot.goalAmount"), accessibilityConfig);
            this.view.confirmation.lblConfirmKey3.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.periodOfMonths");
            CommonUtilities.setText(this.view.confirmation.lblConfirmKey3, kony.i18n.getLocalizedString("i18n.savingsPot.periodOfMonths"), accessibilityConfig);
            this.view.confirmation.lblConfirmKey4.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.periodicContribution");
            CommonUtilities.setText(this.view.confirmation.lblConfirmKey4, kony.i18n.getLocalizedString("i18n.savingsPot.periodicContribution"), accessibilityConfig);
            this.view.confirmation.lblConfirmKey5.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.startDate");
            CommonUtilities.setText(this.view.confirmation.lblConfirmKey5, kony.i18n.getLocalizedString("i18n.savingsPot.startDate"), accessibilityConfig);
            this.view.confirmation.lblConfirmKey6.toolTip = kony.i18n.getLocalizedString("i18n.PayPerson.frequency");
            CommonUtilities.setText(this.view.confirmation.lblConfirmKey6, kony.i18n.getLocalizedString("i18n.PayPerson.frequency"), accessibilityConfig);
            this.view.confirmation.lblConfirmKey7.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.frequencyDay");
            CommonUtilities.setText(this.view.confirmation.lblConfirmKey7, kony.i18n.getLocalizedString("i18n.savingsPot.frequencyDay"), accessibilityConfig);
            this.view.confirmation.lblConfirmKey8.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.finalDate");
            CommonUtilities.setText(this.view.confirmation.lblConfirmKey8, kony.i18n.getLocalizedString("i18n.savingsPot.finalDate"), accessibilityConfig);
            this.view.confirmation.lblConfirmKey0.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.goalType");
            CommonUtilities.setText(this.view.confirmation.lblConfirmKey0, kony.i18n.getLocalizedString("i18n.savingsPot.goalType"), accessibilityConfig);
            this.view.confirmation.lblConfirmKey33.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.currentBalance");
            CommonUtilities.setText(this.view.confirmation.lblConfirmKey33, kony.i18n.getLocalizedString("i18n.savingsPot.currentBalance"), accessibilityConfig);
            this.view.confirmation.lblConfirmKey44.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.remainingSavings");
            CommonUtilities.setText(this.view.confirmation.lblConfirmKey44, kony.i18n.getLocalizedString("i18n.savingsPot.remainingSavings"), accessibilityConfig);
            this.view.confirmation.btnConfirm.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Confirm");
            CommonUtilities.setText(this.view.confirmation.btnConfirm, kony.i18n.getLocalizedString("i18n.transfers.Confirm"), accessibilityConfig);
            this.view.confirmation.btnModify.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Modify");
            CommonUtilities.setText(this.view.confirmation.btnModify, kony.i18n.getLocalizedString("i18n.transfers.Modify"), accessibilityConfig);
            this.view.confirmation.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
            CommonUtilities.setText(this.view.confirmation.btnCancel, kony.i18n.getLocalizedString("i18n.konybb.common.cancel"), accessibilityConfig);
            this.savingsPotPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SavingsPotUIModule").presentationController;

        },
        /*
         * postShow - post show Method 
         * @param {} 
         * @member of {frmCreateGoalConfirmController}
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
         * @member of {frmCreateGoalConfirmController}
         * @return {}
         * @throws {}
         */
        preShow: function() {
            this.view.customheadernew.setFocus(true);
            this.view.customheadernew.flxContextualMenu.setVisibility(false);
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain']);
        },
        /*
         * onClickContinue - Method that navigates to confirmation form
         * @param {Object} goalData - contains goal Details
         * @param {Boolean} isCreate - whether it is createflow - true/false
         * @member of {frmCreateGoalConfirmController}
         * @return {}
         * @throws {}
         */
        onClickContinue: function(goalData, isCreate) {
            FormControllerUtility.showProgressBar(this.view);
            var accountID = this.savingsPotPresentationController.getSavingsPotCurrentAccount();
            var targetPeriod = goalData.targetPeriod.split(" ")[0];
            if (goalData.frequency == OLBConstants.SAVINGS_POT_TRANSACTION_RECURRENCE.MONTHLY) {
                var freqDate = goalData.frequencyDate.split(" ")[0];
            } else {
                var freqDate = goalData.frequencyDate.split(" ")[4];
            }

            if (isCreate) {
                var params = {
                    "savingsType": goalData.savingsTypeKey,
                    "potName": goalData.potName,
                    "targetAmount": goalData.targetAmount,
                    "targetPeriod": targetPeriod,
                    "periodicContribution": goalData.periodicContribution,
                    "startDate": CommonUtilities.getFrontendDateString(goalData.startDate),
                    "frequency": goalData.frequency,
                    "frequencyDay": freqDate,
                    "endDate": CommonUtilities.getFrontendDateString(goalData.endDate),
                    "potType": "Goal",
                    "currency": goalData.currency, // applicationManager.getConfigurationManager().getCurrencyCode(),
                    "fundingAccountId": accountID
                };
                this.savingsPotPresentationController.createGoal(goalData, params);
            } else {
                var params = {
                    "potType": "Goal",
                    "currency": "USD",
                    "savingsPotId": goalData.savingsPotId,
                    "potName": goalData.potName,
                    "targetAmount": goalData.targetAmount,
                    "targetPeriod": targetPeriod,
                    "periodicContribution": goalData.periodicContribution,
                    "startDate": CommonUtilities.getFrontendDateString(goalData.startDate),
                    "frequency": goalData.frequency,
                    "frequencyDay": goalData.frequencyDay,
                    "endDate": CommonUtilities.getFrontendDateString(goalData.endDate),
                    "potAccountId": goalData.potAccountId,
                    "savingsType": goalData.savingsTypeKey,
                    "fundingAccountId": accountID
                };
                this.savingsPotPresentationController.editGoal(goalData, params);
            }
        },
        /*
         * onClickModify - Method that uses to modify goal details
         * @param {} 
         * @member of {frmCreateGoalConfirmController}
         * @return {}
         * @throws {}
         */
        onClickModify: function(goalData, isCreate) {
            FormControllerUtility.showProgressBar(this.view);
            if (isCreate) {
                this.savingsPotPresentationController.presentUserInterface("frmCreateSavingsGoal", {
                    createGoalData: goalData
                });
            } else {
                this.savingsPotPresentationController.presentUserInterface("frmEditGoal", {
                    modifyEditGoalData: goalData
                });
            }

        },
        /*
         * onClickCancel - show or hide cancel popup 
         * @param {} 
         * @member of {frmCreateGoalConfirmController}
         * @return {}
         * @throws {}
         */
        onClickCancel: function() {
            var scopeObj = this;
            scopeObj.view.flxDialogs.setVisibility(true);
            scopeObj.view.flxCancelPopup.setVisibility(true);
            scopeObj.view.flxCancelPopup.left = "0%";
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            var popupComponent = scopeObj.view.flxCancelPopup.widgets()[0];
            popupComponent.top = ((kony.os.deviceInfo().screenHeight / 2) - 135) + "px";
            popupComponent.btnYes.toolTip = kony.i18n.getLocalizedString("i18n.common.yes");
            CommonUtilities.setText(popupComponent.btnYes, kony.i18n.getLocalizedString("i18n.common.yes"), accessibilityConfig);
            CommonUtilities.setText(popupComponent.btnNo, kony.i18n.getLocalizedString("i18n.common.no"), accessibilityConfig);
            popupComponent.btnNo.toolTip = kony.i18n.getLocalizedString("i18n.common.no");
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