define(["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants"], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
    var orientationHandler = new OrientationHandler();
    var responsiveUtils = new ResponsiveUtils();
    return {
        isCreateFlag: false,
        /*
         *it updates the form ui
         *@param {Object} createGoal view model object
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
                    if (uiData.createGoalSuccess) {
                        this.setGoalDatatoAckUI(uiData.createGoalSuccess, true);
                    }
                    if (uiData.editGoalSuccess) {
                        this.setGoalDatatoAckUI(uiData.editGoalSuccess, false);
                    }

                }
            }
        },
        setGoalDatatoAckUI: function(goalData, isCreate) {
            this.isCreateFlag = isCreate;
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            if (goalData.frequency === "Monthly") {
                this.view.acknowledgment.lblAckDetailKey6.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.frequencyDate");
                CommonUtilities.setText(this.view.acknowledgment.lblAckDetailKey6, kony.i18n.getLocalizedString("i18n.savingsPot.frequencyDate"), accessibilityConfig);
            } else {
                this.view.acknowledgment.lblAckDetailKey6.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.frequencyDayAck");
                CommonUtilities.setText(this.view.acknowledgment.lblAckDetailKey6, kony.i18n.getLocalizedString("i18n.savingsPot.frequencyDayAck"), accessibilityConfig);
            }
            var accountID = this.savingsPotPresentationController.getSavingsPotCurrentAccount();
            var account = this.savingsPotPresentationController.fetchAccountByID(accountID);
            var accountDisplayName = CommonUtilities.mergeAccountNameNumber(CommonUtilities.getAccountName(account), accountID);
            this.view.acknowledgment.lblAckDetailValue1.text = accountDisplayName;
            this.view.acknowledgment.lblAckDetailValue2.text = goalData.potName;
            this.view.acknowledgment.lblAckDetailValue3.text = CommonUtilities.formatCurrencyWithCommas(goalData.targetAmount, false, goalData.currency);
            this.view.acknowledgment.lblAckDetailValue4.text = goalData.targetPeriod;
            this.view.acknowledgment.lblAckDetailValue5.text = CommonUtilities.formatCurrencyWithCommas(goalData.periodicContribution, false, goalData.currency);
            this.view.acknowledgment.lblAckDetailValue6.text = goalData.frequencyDate;
            this.view.acknowledgment.lblAckDetailValue7.text = CommonUtilities.getFrontendDateString(new Date().toISOString());
            this.view.acknowledgment.lblAckDetailValue9.text = CommonUtilities.getFrontendDateString(goalData.endDate);
            if (isCreate) {
                if (kony.application.getCurrentBreakpoint() >= 1366) {
                    this.view.acknowledgment.flxSuccess.minHeight = "440dp";
                }
                this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.savingsPot.createGoalAckHeader");
                CommonUtilities.setText(this.view.customheadernew.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.savingsPot.createGoalAckHeader"), accessibilityConfig);
                this.view.lblTransfers.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.createGoalAckHeader");
                CommonUtilities.setText(this.view.lblTransfers, kony.i18n.getLocalizedString("i18n.savingsPot.createGoalAckHeader"), accessibilityConfig);
                this.view.acknowledgment.lblSuccessMessage.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.ackMessage");
                CommonUtilities.setText(this.view.acknowledgment.lblSuccessMessage, kony.i18n.getLocalizedString("i18n.savingsPot.ackMessage"), accessibilityConfig);
                this.view.acknowledgment.lblAckDetailKey7.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.createdDate");
                CommonUtilities.setText(this.view.acknowledgment.lblAckDetailKey7, kony.i18n.getLocalizedString("i18n.savingsPot.createdDate"), accessibilityConfig);
                this.view.acknowledgment.lblAckDetailKey8.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.startDate");
                CommonUtilities.setText(this.view.acknowledgment.lblAckDetailKey8, kony.i18n.getLocalizedString("i18n.savingsPot.startDate"), accessibilityConfig);
                this.view.acknowledgment.lblAckDetailValue8.text = CommonUtilities.getFrontendDateString(goalData.startDate);
                this.view.acknowledgment.flxAckDetail8.setVisibility(true);
                this.view.acknowledgment.flxAckDetail33.setVisibility(false);
                this.view.acknowledgment.flxAckDetail44.setVisibility(false);
            } else {
                if (kony.application.getCurrentBreakpoint() >= 1366) {
                    this.view.acknowledgment.flxSuccess.minHeight = "475dp";
                }
                this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.savingsPot.editGoalAck");
                CommonUtilities.setText(this.view.customheadernew.lblHeaderMobile, kony.i18n.getLocalizedString("i18n.savingsPot.editGoalAck"), accessibilityConfig);
                this.view.lblTransfers.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.editGoalAck");
                CommonUtilities.setText(this.view.lblTransfers, kony.i18n.getLocalizedString("i18n.savingsPot.editGoalAck"), accessibilityConfig);
                this.view.acknowledgment.lblSuccessMessage.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.editGoalSuccess");
                CommonUtilities.setText(this.view.acknowledgment.lblSuccessMessage, kony.i18n.getLocalizedString("i18n.savingsPot.editGoalSuccess"), accessibilityConfig);
                this.view.acknowledgment.lblAckDetailKey7.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.modifiedDate");
                CommonUtilities.setText(this.view.acknowledgment.lblAckDetailKey7, kony.i18n.getLocalizedString("i18n.savingsPot.modifiedDate"), accessibilityConfig);
                this.view.acknowledgment.lblAckDetailKey33.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.currentBalance");
                CommonUtilities.setText(this.view.acknowledgment.lblAckDetailKey33, kony.i18n.getLocalizedString("i18n.savingsPot.currentBalance"), accessibilityConfig);
                this.view.acknowledgment.lblAckDetailKey44.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.remainingSavings");
                CommonUtilities.setText(this.view.acknowledgment.lblAckDetailKey44, kony.i18n.getLocalizedString("i18n.savingsPot.remainingSavings"), accessibilityConfig);
                this.view.acknowledgment.flxAckDetail33.setVisibility(true);
                this.view.acknowledgment.flxAckDetail44.setVisibility(true);
                this.view.acknowledgment.flxAckDetail8.setVisibility(false);
                this.view.acknowledgment.lblAckDetailValue33.text = CommonUtilities.formatCurrencyWithCommas(goalData.availableBalance, false, goalData.currency);
                this.view.acknowledgment.lblAckDetailValue44.text = CommonUtilities.formatCurrencyWithCommas(goalData.remainingSavings, false, goalData.currency);
            }

        },
        //UI Code
        /**
         * onBreakpointChange : Handles ui changes on .
         * @member of {frmCreateGoalAckController}
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
            if ((kony.application.getCurrentBreakpoint() >= 1366) && !this.isCreateFlag) {
                this.view.acknowledgment.flxSuccess.minHeight = "475dp";
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
            this.view.acknowledgment.btnAction2.onClick = this.viewAllSavingsPot;
            this.view.acknowledgment.btnAction1.onClick = this.viewAccounts;
            this.savingsPotPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SavingsPotUIModule").presentationController;
            this.setAccessibilityTooltips();
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
            this.view.acknowledgment.lblAckDetailKey2.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.goalName");
            CommonUtilities.setText(this.view.acknowledgment.lblAckDetailKey2, kony.i18n.getLocalizedString("i18n.savingsPot.goalName"), accessibilityConfig);
            this.view.acknowledgment.lblAckDetailKey3.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.goalAmount");
            CommonUtilities.setText(this.view.acknowledgment.lblAckDetailKey3, kony.i18n.getLocalizedString("i18n.savingsPot.goalAmount"), accessibilityConfig);
            this.view.acknowledgment.lblAckDetailKey4.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.periodOfMonths");
            CommonUtilities.setText(this.view.acknowledgment.lblAckDetailKey4, kony.i18n.getLocalizedString("i18n.savingsPot.periodOfMonths"), accessibilityConfig);
            this.view.acknowledgment.lblAckDetailKey5.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.periodicContribution");
            CommonUtilities.setText(this.view.acknowledgment.lblAckDetailKey5, kony.i18n.getLocalizedString("i18n.savingsPot.periodicContribution"), accessibilityConfig);
            this.view.acknowledgment.lblAckDetailKey9.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.finalDate");
            CommonUtilities.setText(this.view.acknowledgment.lblAckDetailKey9, kony.i18n.getLocalizedString("i18n.savingsPot.finalDate"), accessibilityConfig);
            this.view.acknowledgment.btnAction2.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.viewAllSavingsPot");
            this.view.acknowledgment.btnAction1.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.viewAccountSummary");
            CommonUtilities.setText(this.view.acknowledgment.btnAction2, kony.i18n.getLocalizedString("i18n.savingsPot.viewAllSavingsPot"), accessibilityConfig);
            CommonUtilities.setText(this.view.acknowledgment.btnAction1, kony.i18n.getLocalizedString("i18n.savingsPot.viewAccountSummary"), accessibilityConfig);
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
         * Method that navigates to savingspot dashboard
         */
        viewAllSavingsPot: function() {
            FormControllerUtility.showProgressBar(this.view);
            var accountID = this.savingsPotPresentationController.getSavingsPotCurrentAccount();
            this.savingsPotPresentationController.fetchSavingsPot(accountID);
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
        }

    };
});