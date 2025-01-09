define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants'], function(FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants) {
     
    return {
      profileAccess: '',
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
                this.view.flxPrint.setVisibility(true);
                //this.view.lblPrintfontIcon.onTouchStart = this.onClickPrint;
                this.view.flxPrint.onClick = this.onClickPrint;
            } else {
                this.view.flxPrint.setVisibility(false);
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
            var scopeObj = this;
            this.profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
            this.view.customheadernew.activateMenu("Bill Pay", "Pay A Bill");
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader', 'flxFooter']);
            this.view.lblPrintfontIcon.toolTip = kony.i18n.getLocalizedString("i18n.accounts.print");

            this.view.customheadernew.btnSkipNav.onClick = function() {
                scopeObj.view.lblBillPayAcknowledgement.setActive(true);
            }

            this.view.flxLogout.onKeyPress = this.onKeyPressCallBack;     
            
        },
        postShow: function() {
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
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
                this.showSingleBillPayAcknowledgement(viewModel.ackPayABill);
            }
        },
        /**
         * used to set single Bill Pay scrren
         * @param {object} data
         */
        showSingleBillPayAcknowledgement: function(data) {
            var scopeObj = this;
            var transactionCurrency = applicationManager.getFormatUtilManager().getCurrencySymbol(data.savedData.transactionCurrency);
            if (data.savedData.frequencyType !== "Once" && data.savedData.hasHowLong === "ON_SPECIFIC_DATE" || data.savedData.frequencyType !== "Once" && data.savedData.hasHowLong === "NO_OF_RECURRENCES") {
                scopeObj.view.flxEndDate.setVisibility(true);
                CommonUtilities.setText(scopeObj.view.lblDeliverByKey, kony.i18n.getLocalizedString("i18n.billPay.DeliveryIn"), CommonUtilities.getaccessibilityConfig());
            } else {
                scopeObj.view.flxEndDate.setVisibility(false);
                CommonUtilities.setText(scopeObj.view.lblDeliverByKey, kony.i18n.getLocalizedString("i18n.billPay.DeliveryBy"), CommonUtilities.getaccessibilityConfig());
            }
            CommonUtilities.setText(scopeObj.view.lblRefrenceNumberValue, data.response.referenceId || "None", CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblSuccessMessage, kony.i18n.getLocalizedString("i18n.transfers.AcknowledgementMessage"), CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblSavingsAccount, data.accountData.accountName || "None", CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblBalanceValue, CommonUtilities.formatCurrencyWithCommas(data.accountData.availableBalance, false, data.accountData.currencyCode), CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblFromValue, data.savedData.payFrom || "None", CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblToValue, data.savedData.payeeName || "None", CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblAmountKey, kony.i18n.getLocalizedString("i18n.transfers.lblAmount") + "(" + transactionCurrency + ")", CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblAmountValue, data.savedData.languageAmount, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblPaymentDateKey, kony.i18n.getLocalizedString("i18n.billPay.PaymentDate"), CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblPaymentDateValue, data.savedData.sendOn, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblNotesValue, data.savedData.notes || "None" , CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblDeliverByValue, data.savedData.deliveryDate || "None", CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblFrequencyValue, data.savedData.frequencyType || "None", CommonUtilities.getaccessibilityConfig());
            if (this.isFutureDate(data.savedData.sendOn)) {
                if (data.response.status != "Pending") {
                    CommonUtilities.setText(scopeObj.view.lblSuccessMessage, kony.i18n.getLocalizedString("i18n.FastTransfers.YourTransactionHasBeenScheduledfor"), CommonUtilities.getaccessibilityConfig());
                } else {
                    CommonUtilities.setText(scopeObj.view.lblSuccessMessage, kony.i18n.getLocalizedString("i18n.transfers.approvalAck"), CommonUtilities.getaccessibilityConfig());
                }
            }
            if (data.savedData.frequencyType !== "Once" && data.savedData.hasHowLong === "ON_SPECIFIC_DATE") {
                CommonUtilities.setText(scopeObj.view.lblSuccessMessage, kony.i18n.getLocalizedString("i18n.mybills.statusmessage.ScheduledRecurrence"), CommonUtilities.getaccessibilityConfig());
                CommonUtilities.setText(scopeObj.view.lblPaymentDateKey, kony.i18n.getLocalizedString("i18n.transfers.start_date"), CommonUtilities.getaccessibilityConfig());
                // CommonUtilities.setText(scopeObj.view.lblPaymentDateValue, data.savedData.frequencyStartDate, CommonUtilities.getaccessibilityConfig());
                CommonUtilities.setText(scopeObj.view.lblEndDateKey, kony.i18n.getLocalizedString("i18n.transfers.end_date"), CommonUtilities.getaccessibilityConfig());
                CommonUtilities.setText(scopeObj.view.lblEndDateValue, data.savedData.frequencyEndDate, CommonUtilities.getaccessibilityConfig());
            } else if (data.savedData.frequencyType !== "Once" && data.savedData.hasHowLong === "NO_OF_RECURRENCES") {
                CommonUtilities.setText(scopeObj.view.lblSuccessMessage, kony.i18n.getLocalizedString("i18n.mybills.statusmessage.ScheduledRecurrence"), CommonUtilities.getaccessibilityConfig());
                CommonUtilities.setText(scopeObj.view.lblPaymentDateKey, kony.i18n.getLocalizedString("i18n.transfers.send_on"), CommonUtilities.getaccessibilityConfig());
                CommonUtilities.setText(scopeObj.view.lblEndDateKey, kony.i18n.getLocalizedString("i18n.transfers.lblNumberOfRecurrences"), CommonUtilities.getaccessibilityConfig());
                CommonUtilities.setText(scopeObj.view.lblEndDateValue, data.savedData.numberOfRecurrences, CommonUtilities.getaccessibilityConfig());
            }
            if (this.profileAccess === "true") {
                scopeObj.view.flxSavingsIcon.setVisibility(true);
                scopeObj.view.flxFromIcon.setVisibility(true);
                scopeObj.view.flxToIcon.setVisibility(false);
                scopeObj.view.lblFromIcon.setVisibility(true);
                scopeObj.view.lblToIcon.setVisibility(true);
                scopeObj.view.lblSavingsIcon.setVisibility(true);
                scopeObj.view.lblFromIcon.text = scopeObj.presenter.isBusinessAccount(data.savedData.fromAccountNumber) === "true" ? "r" : "s";
                scopeObj.view.lblToIcon.text = data.savedData.isBusinessPayee === "1" ? "r" : "s";
                scopeObj.view.lblSavingsIcon.text = scopeObj.presenter.isBusinessAccount(data.savedData.fromAccountNumber) === "true" ? "r" : "s";
            } else {
                scopeObj.view.flxSavingsIcon.setVisibility(false);
                scopeObj.view.flxFromIcon.setVisibility(false);
                scopeObj.view.flxToIcon.setVisibility(false);
                scopeObj.view.lblToIcon.setVisibility(false);
                scopeObj.view.lblFromIcon.setVisibility(false);
                scopeObj.view.lblSavingsIcon.setVisibility(false);
            }
            scopeObj.view.flxMain.forceLayout();
            scopeObj.view.btnMakeAnotherPayment.onClick = function() {
                var dataMap = data.savedData;
                dataMap.categories = '';
                dataMap.amount = '';
                dataMap.sendOn = '';
                dataMap.notes = '';
                dataMap.deliveryDate = '';
                dataMap.frequencyType = '';
                dataMap.numberOfRecurrences = '';
                dataMap.frequencyStartDate = '';
                dataMap.frequencyEndDate = '';
                dataMap.billCategory = '';
                scopeObj.presenter.showBillPaymentScreen({
                    "sender": 'acknowledgement',
                    "context": 'PayABill',
                    "loadBills": true,
                    "data": dataMap
                });
            };
            scopeObj.view.btnViewPaymentActivity.onClick = function() {
              if (data.savedData.frequencyType === "Once" && !scopeObj.isFutureDate(data.savedData.sendOn)) {
              scopeObj.presenter.showBillPaymentScreen({
                    "sender" : 'acknowledgement',
                    "context": 'History',
                    "loadBills": true,
              });
              }else{
                scopeObj.presenter.showBillPaymentScreen({
                    "sender" : 'acknowledgement',
                    "context": 'ScheduleBills',
                    "loadBills": true,
              });
              }
            }
            scopeObj.view.forceLayout();
        },
        onClickPrint: function(){
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
                    //         payABillAcknowledgement: true
                    //     }
                    // });
                    applicationManager.getNavigationManager().navigateTo({
                        appName: 'BillPayMA',
                        friendlyName: 'frmPayBillAcknowledgement'
                    });
                }
            }
            scopeObj.presenter.showPrintPage({
                printKeyValueGroupModel: viewModel
            });
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
        },


        /**
         * logout dialog
         */
           onKeyPressCallBack: function(eventObject, eventPayload) {
            var self = this;
            if (eventPayload.keyCode === 27) {
                if (self.view.flxLogout.isVisible === true) {
                    self.view.flxDialogs.setVisibility(false);
                    self.view.flxLogout.isVisible = false;
                    self.view.customheader.headermenu.btnLogout.setActive(true);
                }
            }
        },

    };
});