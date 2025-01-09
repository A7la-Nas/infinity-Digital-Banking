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
            this.view.btnMakeOneTimePayment.toolTip = kony.i18n.getLocalizedString("i18n.payments.makeOneTimePayment");
            this.view.btnAddPayee.toolTip = kony.i18n.getLocalizedString("i18n.billPay.addPayee");
        },
        postShow: function() {
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            applicationManager.executeAuthorizationFramework(this);
        },
        initActions: function() {
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
         * updateFormUI - the entry point method for the form controller.
         * @param {Object}  viewModel - it contains the set of view properties and keys.
         */
        updateFormUI: function(uiDataMap) {
            if (uiDataMap.isLoading === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (uiDataMap.isLoading === false) {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (uiDataMap.showBillPayActivationAck) {
                this.showBillPayActivationAcknowledgementScreen();
            }

            if (uiDataMap.serverError) {
                this.setServerError(true, uiDataMap.serverError);
            } else {
                this.setServerError(false);
            }
        },
        /**
         * used to show  billpay activation screen
         */
        showBillPayActivationAcknowledgementScreen: function() {
            var self = this;
            CommonUtilities.setText(self.view.lblHeader, kony.i18n.getLocalizedString("i18n.billPay.activateBillPay"), CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(self.view.lblTransactionMessage, kony.i18n.getLocalizedString("i18n.billPay.activateBillPaySuccessMsg"), CommonUtilities.getaccessibilityConfig());
            self.view.btnAddPayee.onClick = self.onClickAddPayee.bind(self);
            self.view.btnMakeOneTimePayment.onClick = self.onClickOneTimePayement.bind(self);
            //self.view.AllForms.isVisible = false;
            self.view.forceLayout();
        },
        /**
         * used to navigate the add Payee screen
         */
        onClickAddPayee: function() {
            this.presenter.showBillPaymentScreen({
                context: "AddPayee"
            });
        },
        /**
         * onClickOneTimePayement:   Used to naviage the oneTimePayment Flow.
         * @param {object} isCancel is cancel
         */
        onClickOneTimePayement: function(isCancel) {
            this.presenter.navigateToOneTimePayement(isCancel);
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
        showAddPayeeOption: function() {
            this.view.btnAddPayee.setVisibility(true);
        },
        /**
         * used to hide the permission based UI
         */
        hideAddPayeeOption: function() {
            this.view.btnAddPayee.setVisibility(false);
        },
        /**
         * used to show the permission based UI
         */
        showOneTimePaymentOption: function() {
            this.view.btnMakeOneTimePayment.setVisibility(true);
        },
        /**
         * used to hide the permission based UI
         */
        hideOneTimePaymentOption: function() {
            this.view.btnMakeOneTimePayment.setVisibility(false);
        }
    };
});