define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants'], function(FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants) {
     
    return {
        init: function() {
            var scopeObj = this;
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.initActions();
            this.view.onBreakpointChange = function() {
                scopeObj.onBreakpointChange(kony.application.getCurrentBreakpoint());
            };
        },
        preShow: function() {
            this.view.customheadernew.activateMenu("Bill Pay", "Pay A Bill");
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader', 'flxFooter']);
            this.view.btnProceedNotEligible.tooltip = kony.i18n.getLocalizedString("i18n.PayAPerson.CreateNewAccount");
            this.view.btnCancelNotEligible = kony.i18n.getLocalizedString("i18n.BillPay.NOTHANKS");
        },
        postShow: function() {
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            applicationManager.executeAuthorizationFramework(this);
        },
        initActions: function() {
            this.view.btnProceedNotEligible.onClick = this.onClickOpenNewAccount.bind(this);
            this.view.btnCancelNotEligible.onClick = this.onClickCancelEligibile.bind(this);
            this.presenter = applicationManager.getModulesPresentationController({ 'appName': 'BillPayMA', 'moduleName': 'BillPaymentUIModule' });
        },
        onBreakpointChange: function(form, width) {
            var scopeObj = this;
            FormControllerUtility.setupFormOnTouchEnd(width);
            
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            this.view.CustomPopupLogout.onBreakpointChangeComponent(scopeObj.view.CustomPopupLogout, width);
            this.view.CustomPopupCancel.onBreakpointChangeComponent(scopeObj.view.CustomPopupCancel, width);
        },
        /**
         * used to navigate the account page
         */
        onClickCancelEligibile: function() {
            this.presenter.cancelEligibile();
        },
        /**
         * used to navigate the newAccount screen
         */
        onClickOpenNewAccount: function() {
            this.presenter.openNewBillPayAccount();
        },
        /**
         * updateFormUI - the entry point method for the form controller.
         * @param {Object}  viewModel - it contains the set of view properties and keys.
         */
        updateFormUI: function(uiDataMap) {
            if (uiDataMap.isLoading === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (uiDataMap.isLoading === false) {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (uiDataMap.showNotEligibleView) {
                this.showBillPayActivationNotEligibileScreen();
            }

            if (uiDataMap.serverError) {
                this.setServerError(true, uiDataMap.serverError);
            } else {
                this.setServerError(false);
            }
        },
        /** used to diplay the billPay Not Eligible screen.
         */
        showBillPayActivationNotEligibileScreen: function() {
            CommonUtilities.setText(self.view.lblHeaderNotEligible, kony.i18n.getLocalizedString("i18n.billPay.activateBillPay"), CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(self.view.lblWarningNotEligible, kony.i18n.getLocalizedString("i18n.billPay.activateBillPayNotEligibleMsg"), CommonUtilities.getaccessibilityConfig());
        },
        /**
         * executes and displays the error flex in landing page.
         * @param {boolean} isError used to display the flex
         * @param {object} erroObj  get the exact error mesage
         */
        setServerError: function(isError, erroObj) {
            var scopeObj = this;
            scopeObj.view.flxServerError.setVisibility(isError);
            if (isError) {
                scopeObj.view.rtxErrorMessage.text = kony.i18n.getLocalizedString("i18n.common.OoopsServerError");
                if (erroObj.errorMessage) {
                    scopeObj.view.rtxDowntimeWarning.text = erroObj.errorMessage;
                }
                FormControllerUtility.hideProgressBar(scopeObj.view);
            }
        },

        /**
         * used to show the permission based UI
         */
        showOpenNewAccountOption: function() {
            this.view.btnProceedNotEligible.setVisibility(true);
        },

        /**
         * used to hide the permission based UI
         */
        hideOpenNewAccountOption: function() {
            this.view.btnProceedNotEligible.setVisibility(false);
        }
    };
});