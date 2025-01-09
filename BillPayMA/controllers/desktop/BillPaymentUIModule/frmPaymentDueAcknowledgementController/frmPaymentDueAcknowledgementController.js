/**
 * Description of Module representing a Confirm form.
 * @module frmPaymentDueAcknowledgementController
 */
define(['CommonUtilities', 'OLBConstants', 'ViewConstants', 'FormControllerUtility'], function(CommonUtilities, OLBConstants, ViewConstants, FormControllerUtility) {
     
    var orientationHandler = new OrientationHandler();

    return /** @alias module:frmPaymentDueAcknowledgementController */ {
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.presenter = applicationManager.getModulesPresentationController({ 'appName': 'BillPayMA', 'moduleName': 'BillPaymentUIModule' });
            if (CommonUtilities.isPrintEnabled()) {
                this.view.lblPrintfontIcon.setVisibility(true);
                this.view.lblPrintfontIcon.onTouchStart = this.onClickPrint;
            } else {
                this.view.lblPrintfontIcon.setVisibility(false);
            }
            this.view.rtxTC.setVisibility(!CommonUtilities.isMirrorLayoutEnabled())
            this.view.rtxTCArabic.setVisibility(CommonUtilities.isMirrorLayoutEnabled())
        },
        onBreakpointChange: function(form, width) {
            var scopeObj = this;
            FormControllerUtility.setupFormOnTouchEnd(width);
            
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            this.view.CustomPopupLogout.onBreakpointChangeComponent(scopeObj.view.CustomPopupLogout, width);
            this.view.CustomPopupCancel.onBreakpointChangeComponent(scopeObj.view.CustomPopupCancel, width);
        },
        preShow: function() {
            this.view.customheadernew.activateMenu("Bill Pay", "Pay a Bill");
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader', 'flxFooter']);
            this.view.imgDownloadBulk.toolTip = kony.i18n.getLocalizedString("i18n.common.Download");
            this.view.imgClose.toolTip = kony.i18n.getLocalizedString("i18n.common.close");
        },
        postShow: function() {
            var scopeObj = this;
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
        },
        /**
         * updateFormUI - the entry point method for the form controller.
         * @param {Object} uiDataMap - it contains the set of view properties and keys.
         */
        updateFormUI: function(uiDataMap) {
            if (uiDataMap.isLoading) {
                FormControllerUtility.showProgressBar(this.view);
            } else {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (uiDataMap.bulkPay) {
                this.updateBulkPayAcknowledge(uiDataMap.bulkPay.Transactions);
            }
        },
        /**
         * used to update the BulkPay Acknoweldgement screen
         * @param {object} bulkPay list of responses
         */
        updateBulkPayAcknowledge: function(bulkPay) {
            var self = this;
            var totalSum = 0;
            var bulkPayAckWidgetDataMap = {
                "lblRefernceNumber": "lblRefernceNumber",
                "lblPayee": "lblPayee",
                "lblPaymentAccount": "lblPaymentAccount",
                "lblEndingBalanceAccount": "lblEndingBalanceAccount",
                "lblSendOn": "lblSendOn",
                "lblDeliverBy": "lblDeliverBy",
                "lblAmount": "lblAmount",
                "imgAcknowledgement": "imgAcknowledgement"
            };
            bulkPay = bulkPay.map(function(dataItem) {
                var ackImage;
                var deliverBy = dataItem.deliverBy;
                if (deliverBy.length > 10) {
                    deliverBy = self.getDateFromDateString(dataItem.deliverBy, "YYYY-MM-DDTHH:MM:SS");
                } else {
                    deliverBy = dataItem.deliverBy;
                }
                totalSum = totalSum + parseFloat(dataItem.amount);
                if (dataItem.status === "Sent") {
                    ackImage = ViewConstants.IMAGES.BULKPAY_SUCCESS;
                } else if (dataItem.status === "Pending") {
                    ackImage = ViewConstants.IMAGES.BULKPAY_PENDING;
                } else {
                    ackImage = ViewConstants.IMAGES.BULKPAY_UNSUCCESS;
                }
                return {
                    "lblRefernceNumber": dataItem.referenceId ? dataItem.referenceId : '',
                    "lblPayee": dataItem.payeeName,
                    "lblPayeeAddress":  kony.i18n.getLocalizedString("i18n.ChequeBookReq.Address")+ " " + dataItem.payeeAddressLine1,
                    "lblPaymentAccount": dataItem.fromAccountName,
                    "lblEndingBalanceAccount": kony.i18n.getLocalizedString("i18n.payments.endingBalanceWithColon") + " " + CommonUtilities.formatCurrencyWithCommas(dataItem.fromAccountBalance),
                    "lblSendOn": self.getDateFromDateString(dataItem.scheduledDate, "YYYY-MM-DDTHH:MM:SS"),
                    "lblDeliverBy": deliverBy,
                    "lblAmount": CommonUtilities.formatCurrencyWithCommas(dataItem.amount),
                    "imgAcknowledgement": {
                        "src": ackImage,
                        "toolTip": dataItem.message
                    }
                };
            });
            CommonUtilities.setText(this.view.lblAmountValue, CommonUtilities.formatCurrencyWithCommas(totalSum), CommonUtilities.getaccessibilityConfig());
            this.view.segBill.widgetDataMap = bulkPayAckWidgetDataMap;
            this.view.segBill.setData(bulkPay);
            this.view.btnViewPaymentActivity.onClick = this.onClickPaymentActivity;
            this.view.btnMakeAnotherPayment.onClick = this.onClickMakePayment;
            this.view.forceLayout();
        },
        /**
         * used to navigate the billPay History screen
         */
        onClickPaymentActivity: function() {
            var self = this;
            self.presenter.showBillPaymentScreen({
                "context": "History",
                "loadBills": true
            });
        },
        /**
         * used to navigate the PaymentDue screen
         */
        onClickMakePayment: function() {
            var self = this;
            self.presenter.showBillPaymentScreen({
                "context": "DueBills"
            });
        },
        /**
         * used to convert the CalenderFormat Date
         * @param {String} dateString string formated date
         * @param {String} inputFormat input format of the date
         * @return {date} Date object
         */
        getDateFromDateString: function(dateString, inputFormat) {
            var fu = applicationManager.getFormatUtilManager();
            var dateObj = fu.getDateObjectfromString(dateString, inputFormat);
            var outputDate = fu.getFormatedDateString(dateObj, fu.getApplicationDateFormat());
            return outputDate;
        },
        /**
         * Formats the Currency
         * @param  {Array} amount Array of transactions model
         * @param  {function} currencySymbolNotRequired Needs to be called when cancel button is called
         * @return {function} function to put comma
         */
        formatCurrency: function(amount, currencySymbolNotRequired, currencyCode) {
            return CommonUtilities.formatCurrencyWithCommas(amount, currencySymbolNotRequired, currencyCode);
        },
        /**
         * method to print acknowledgement page
         */
        onClickPrint: function() {
            var scopeObj = this;
            var viewModel = {
                module: scopeObj.view.lblBulkBillPayAcknowledgement.text,
                details: scopeObj.view.segBill.data,
                printCallback: function () {
                    // kony.mvc.getNavigationManager().navigate({
                    //     context: this,
                    //     callbackModelConfig: {
                    //         duePaymentAcknowledgement: true
                    //     }
                    // });
                    applicationManager.getNavigationManager().navigateTo({
                        appName: 'BillPayMA',
                        friendlyName: 'frmPaymentDueAcknowledgement'
                    });
                }
            }
            scopeObj.presenter.showPrintPage({
                transactionList: viewModel
            });
        }
    }
});