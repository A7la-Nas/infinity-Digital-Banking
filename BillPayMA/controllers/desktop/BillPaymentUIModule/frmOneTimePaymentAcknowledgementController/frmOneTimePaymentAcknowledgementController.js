define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants'], function(FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants) {
     
    return {
        profileAccess: "",
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;

            this.presenter = applicationManager.getModulesPresentationController({ 'appName': 'BillPayMA', 'moduleName': 'BillPaymentUIModule' });
            if (kony.application.getCurrentBreakpoint() == 640 || kony.application.getCurrentBreakpoint() == 1024) {
                this.view.flxPrint.setVisibility(false);
            }
            if (CommonUtilities.isPrintEnabled()) {
                this.view.lblPrintfontIcon.setVisibility(true);
				 this.view.flxPrint.onClick = this.onClickPrint;
                //this.view.lblPrintfontIcon.onTouchStart = this.onClickPrint;
            } else {
                this.view.lblPrintfontIcon.setVisibility(false);
            }
        },
        onBreakpointChange: function(form, width) {
            var scopeObj = this;
            FormControllerUtility.setupFormOnTouchEnd(width);
            
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            this.view.CustomPopup.onBreakpointChangeComponent(scopeObj.view.CustomPopup, width);
            this.view.deletePopup.onBreakpointChangeComponent(scopeObj.view.deletePopup, width);
        },
        preShow: function() {
            var scope=this;
            this.profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
            this.view.customheadernew.activateMenu("Bill Pay", "Pay A Bill");
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader', 'flxFooter']);
            this.view.lblPrintfontIcon.toolTip = kony.i18n.getLocalizedString("i18n.accounts.print");
            this.view.btnSavePayee.toolTip = kony.i18n.getLocalizedString("i18n.billpay.savePayee");
            this.view.btnMakeAnotherPayment.toolTip = kony.i18n.getLocalizedString("i18n.billPay.MakeAnotherPayment");
            this.view.btnViewPaymentActivity.toolTip = kony.i18n.getLocalizedString("i18n.billPay.ViewPaymentActivity");
			this.view.customheadernew.btnSkipNav.onClick = function() {
		    scope.view.lblBillPayAcknowledgement.setActive(true);
                };
				this.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
        },
		onKeyPressCallBack: function(eventObject, eventPayload) {
			var scope=this;
            if (eventPayload.keyCode === 27) {
                if (scope.view.flxLogout.isVisible === true) {
                    scope.view.flxDialogs.isVisible = false;
                    scope.view.customheadernew.btnLogout.setFocus(true);
                }
            }
			 scope.view.customheadernew.onKeyPressCallBack(eventObject, eventPayload);
            },
        postShow: function() {
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            applicationManager.executeAuthorizationFramework(this);
            this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
        },
        /**
         * updateFormUI - the entry point method for the form controller.
         * @param {Object} viewModel - it contains the set of view properties and keys.
         */
        updateFormUI: function(viewModel) {
            if (viewModel.isLoading === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (viewModel.isLoading === false) {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.ackPayABill) {
                this.showOneTimePaymentAcknowledgement(viewModel.ackPayABill);
            }
        },
        /**
         * used to set single Bill Pay scrren
         * @param {object} data
         */
        showOneTimePaymentAcknowledgement: function(data) {
            var scopeObj = this;
            var transactionCurrency = applicationManager.getFormatUtilManager().getCurrencySymbol(data.savedData.transactionCurrency);
            CommonUtilities.setText(scopeObj.view.lblRefrenceNumberValue, data.response.referenceId, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblSuccessMessage, kony.i18n.getLocalizedString("i18n.transfers.AcknowledgementMessage"), CommonUtilities.getaccessibilityConfig());
            if (this.isFutureDate(data.savedData.sendOn)) {
                if (data.response.status != "Pending") {
                    CommonUtilities.setText(scopeObj.view.lblSuccessMessage, kony.i18n.getLocalizedString("i18n.FastTransfers.YourTransactionHasBeenScheduledfor"), CommonUtilities.getaccessibilityConfig());
                } else {
                    CommonUtilities.setText(scopeObj.view.lblSuccessMessage, kony.i18n.getLocalizedString("i18n.transfers.approvalAck"), CommonUtilities.getaccessibilityConfig());
                }
            }
            CommonUtilities.setText(scopeObj.view.lblSavingsAccount, data.accountData.accountName, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblBalanceValue, CommonUtilities.formatCurrencyWithCommas(data.accountData.availableBalance, false, data.accountData.currencyCode), CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblFromValue, data.savedData.payFrom, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblToValue, data.savedData.payeeName, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblAmountKey, kony.i18n.getLocalizedString("i18n.transfers.lblAmount") + "(" + transactionCurrency + ")" +":", CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblAmountValue, data.savedData.languageAmount, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblPaymentDateValue, data.savedData.sendOn, CommonUtilities.getaccessibilityConfig());
            if(data.savedData.notes===""){
			data.savedData.notes="None";
			}
            CommonUtilities.setText(scopeObj.view.lblNotesValue, data.savedData.notes, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblDeliverByValue, data.savedData.deliveryDate, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblFrequencyValue, data.savedData.frequencyType, CommonUtilities.getaccessibilityConfig());
            //if(applicationManager.getConfigurationManager().isCombinedUser === "true"){
            if (this.profileAccess === "both") {
                this.view.flxAccountIcon.setVisibility(true);
                this.view.flxFromIcon.setVisibility(true);
                //this.view.flxToIcon.setVisibility(true);
                this.view.lblFromIcon.setVisibility(true);
                this.view.lblFromIcon.text = scopeObj.presenter.isBusinessAccount(data.savedData.fromAccountNumber) === "true" ? "r" : "s";
                //this.view.lblToIcon.setVisibility(true);
                this.view.lblAccountIcon.setVisibility(true);
                this.view.lblAccountIcon.text = scopeObj.presenter.isBusinessAccount(data.savedData.fromAccountNumber) === "true" ? "r" : "s";
            }
            scopeObj.view.flxMain.forceLayout();
            scopeObj.view.btnMakeAnotherPayment.onClick = function() {
                scopeObj.presenter.navigateToOneTimePayment();
            };
            scopeObj.view.btnViewPaymentActivity.onClick = function() {
                scopeObj.presenter.showBillPaymentScreen({
                    "sender": 'acknowledgement',
                    "context": 'History',
                    "loadBills": true
                });
            };
            scopeObj.view.btnSavePayee.onClick = function() {
                scopeObj.presenter.showUpdateBillerPage("frmOneTimePaymentAcknowledgement");
            };
        },
        onClickPrint: function() {
            var scopeObj = this;
            var printData = [];
            printData.push({
                key: kony.i18n.getLocalizedString("i18n.common.status"),
                value: scopeObj.view.lblSuccessMessage.text
            });
            printData.push({
                key: scopeObj.view.lblRefrenceNumber.text,
                value: scopeObj.view.lblRefrenceNumberValue.text
            });
            printData.push({
                key: kony.i18n.getLocalizedString("i18n.transfers.accountName"),
                value: scopeObj.view.lblSavingsAccount.text
            });
            printData.push({
                key: kony.i18n.getLocalizedString("i18n.accounts.availableBalance"),
                value: scopeObj.view.lblBalanceValue.text
            });
            printData.push({
                key: scopeObj.view.lblFromKey.text,
                value: scopeObj.view.lblFromValue.text
            });
            printData.push({
                key: scopeObj.view.lblToKey.text,
                value: scopeObj.view.lblToValue.text
            });
            printData.push({
                key: scopeObj.view.lblAmountKey.text,
                value: scopeObj.view.lblAmountValue.text
            });
            printData.push({
                key: scopeObj.view.lblPaymentDateKey.text,
                value: scopeObj.view.lblPaymentDateValue.text
            });
            printData.push({
                key: scopeObj.view.lblDeliverByKey.text,
                value: scopeObj.view.lblDeliverByValue.text
            });
            printData.push({
                key: scopeObj.view.lblFrequencyKey.text,
                value: scopeObj.view.lblFrequencyValue.text
            });
            if (scopeObj.view.lblNotesValue.text !== "") {
                printData.push({
                    key: scopeObj.view.lblNotesKey.text,
                    value: scopeObj.view.lblNotesValue.text
                });
            }
            else{
                 printData.push({
                    key: scopeObj.view.lblNotesKey.text,
                    value: "None"
                });
            }
            var viewModel = {
                moduleHeader: scopeObj.view.lblBillPayAcknowledgement.text,
                tableList: [{
                    tableHeader: scopeObj.view.lblHeadingDetails.text,
                    tableRows: printData
                }],
                printCallback: function () {
                    // kony.mvc.getNavigationManager().navigate({
                    //     context: this,
                    //     callbackModelConfig: {
                    //         oneTimePaymentAcknowledgement: true
                    //     }
                    // });
                    applicationManager.getNavigationManager().navigateTo({
                        appName: 'BillPayMA',
                        friendlyName: 'frmOneTimePaymentAcknowledgement'
                    });
                }
            }
            scopeObj.presenter.showPrintPage({
                printKeyValueGroupModel: viewModel
            });
        },
        /**
         * used to show the permission based UI
         */
        showHistoryOption: function() {
            this.view.btnViewPaymentActivity.setVisibility(true);
        },

        /**
         * used to hide the permission based UI
         */
        hideHistoryOption: function() {
            this.view.btnViewPaymentActivity.setVisibility(false);
        },
        /**
         * used to show the permission based UI
         */
        showSavePayeeOption: function() {
            this.view.btnSavePayee.setVisibility(true);
        },

        /**
         * used to hide the permission based UI
         */
        hideSavePayeeOption: function() {
            this.view.btnSavePayee.setVisibility(false);
        },

        /*
         * Method to know whether given date value is future date or not
         * @param  {String} date to be compared in mm/dd/yyyy
         * @returns {boolean} true if future date else false
         */
        isFutureDate: function(date) {
            var scheduledDate = new Date(date);
            var endTimeToday = CommonUtilities.getServerDateObject();
            var minutes = ViewConstants.MAGIC_NUMBERS.MAX_MINUTES;
            endTimeToday.setHours(ViewConstants.MAGIC_NUMBERS.MAX_HOUR, minutes, minutes, minutes);
            if (scheduledDate.getTime() > endTimeToday.getTime()) {
                return true;
            }
            return false;
        }

    };
});