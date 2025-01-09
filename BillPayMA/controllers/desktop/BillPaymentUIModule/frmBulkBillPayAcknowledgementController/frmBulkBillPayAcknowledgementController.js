/**
 * Description of Module representing a Confirm form.
 * @module frmBulkBillPayAcknowledgementController
 */
define(['CommonUtilities', 'OLBConstants', 'ViewConstants', 'FormControllerUtility'], function(CommonUtilities, OLBConstants, ViewConstants, FormControllerUtility) {
     
    var orientationHandler = new OrientationHandler();

    return /** @alias module:frmBulkPayeesController */ {
        profileAccess: "",
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.presenter = applicationManager.getModulesPresentationController({ 'appName': 'BillPayMA', 'moduleName': 'BillPaymentUIModule' });
            if (kony.application.getCurrentBreakpoint() == 640 || kony.application.getCurrentBreakpoint() == 1024) {
                this.view.flxPrintBulkPay.setVisibility(false);
            }
            if (CommonUtilities.isPrintEnabled()) {
                this.view.lblPrintfontIcon.setVisibility(true);
                this.view.lblPrintfontIcon.onTouchStart = this.onClickPrint;
            } else {
                this.view.lblPrintfontIcon.setVisibility(false);
            }
             this.view.customheadernew.btnSkipNav.onClick = this.onSkipNav;
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
            this.profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
            this.view.customheadernew.activateMenu("Bill Pay", "Pay a Bill");
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader', 'flxFooter']);
            this.view.imgDownloadBulk.toolTip = kony.i18n.getLocalizedString("i18n.common.Download");
            this.view.btnViewPaymentActivity.toolTip = kony.i18n.getLocalizedString("i18n.billPay.ViewPaymentActivity");
            this.view.btnMakeAnotherPayment.toolTip = kony.i18n.getLocalizedString("i18n.billPay.MakeAnotherPayment");
            this.view.imgClose.toolTip = kony.i18n.getLocalizedString("i18n.common.close");
            this.view.CopylblPayee0c25e79c2245546.text = kony.i18n.getLocalizedString("i18n.ImportLC.Reference") + " " + "#";
          	this.view.rtxTC.setVisibility(!CommonUtilities.isMirrorLayoutEnabled());
            this.view.rtxTCArabic.setVisibility(CommonUtilities.isMirrorLayoutEnabled());
            this.view.title=kony.i18n.getLocalizedString("i18n.billPay.AcknowledgementBillPay");
		},
        postShow: function() {
            var scopeObj = this;
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            this.view.CustomPopupLogout.doLayout = CommonUtilities.centerPopupFlex;
			this.view.lblTotalAmountPaidNVDA.accessibilityConfig = {
								"a11yHidden": false
							};
             
        },
        /**
         * updateFormUI - the entry point method for the form controller.
         * @param {Object} viewModel - it contains the set of view properties and keys.
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
         * used o update the BulkPay Acknoweldgement screen
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
                "lblPayeeAddress": "lblPayeeAddress",
                "lblSendOn": "lblSendOn",
                "lblDeliverBy": "lblDeliverBy",
                "lblAmount": "lblAmount",
                "imgAcknowledgement": "imgAcknowledgement",
                "flxPayeeIcon": "flxPayeeIcon",
                "lblPayeeIcon": "lblPayeeIcon",
                "lblVal1":"lblVal1",
                "lblVal2":"lblVal2",
                "lblVal3":"lblVal3",
                "lblVal4":"lblVal4",
                "lblVal5":"lblVal5",
                "lblVal6":"lblVal6"
            };
            bulkPay = bulkPay.map(function(dataItem) {
                var ackImage;
                var ackStatus;
                var deliverBy = dataItem.deliverBy;
                if (deliverBy.length > 10) {
                    deliverBy = self.getDateFromDateString(dataItem.deliverBy, "YYYY-MM-DDTHH:MM:SS");
                } else {
                    deliverBy = dataItem.deliverBy;
                }
                totalSum = totalSum + parseFloat(dataItem.amount);
                if (dataItem.status === "Sent") {
                    ackImage = ViewConstants.IMAGES.BULKPAY_SUCCESS;
                    ackStatus = "Bill Payment Successful";
                } else if (dataItem.status === "Pending") {
                    ackImage = ViewConstants.IMAGES.BULKPAY_PENDING;
                    ackStatus = "Bill Payment Pending";
                } else {
                    ackImage = ViewConstants.IMAGES.BULKPAY_UNSUCCESS;
                    ackStatus = "Bill Payment Failure";
                }
                return {
                    "lblRefernceNumber": dataItem.referenceId ? dataItem.referenceId : '',
                    "lblVal1": "Reference Number ".concat(dataItem.referenceId ? dataItem.referenceId : ''),
                    "lblPayee": dataItem.payeeName,
                    "lblPayeeAddress": dataItem.payeeAddressLine1,
                    "lblVal2": "Payee " + dataItem.payeeName + " " + dataItem.payeeAddressLine1,
                    "lblPaymentAccount": dataItem.fromAccountName,
                    "lblEndingBalanceAccount": CommonUtilities.formatCurrencyWithCommas(dataItem.fromAccountBalance),
                    "lblVal3": "Payment Account " + dataItem.fromAccountName + " " + CommonUtilities.formatCurrencyWithCommas(dataItem.fromAccountBalance),
                    "lblSendOn": self.getDateFromDateString(dataItem.scheduledDate, "YYYY-MM-DDTHH:MM:SS"),
                    "lblVal4": "Send On " + self.getDateFromDateString(dataItem.scheduledDate, "YYYY-MM-DDTHH:MM:SS"),
                    "lblDeliverBy": deliverBy,
                    "lblVal5": "Deliver By " + deliverBy,
                    "lblAmount": CommonUtilities.formatCurrencyWithCommas(dataItem.amount),
                    "lblVal6": "Amount " + CommonUtilities.formatCurrencyWithCommas(dataItem.amount),
                    "imgAcknowledgement": {
                        "src": ackImage,
                        "toolTip": ackStatus,
                        "accessibilityConfig": {
                            "a11yLabel": ackStatus,
                            "a11yHidden": true
                        }
                    },
                    "flxPayeeIcon": {
                        //"isVisible":applicationManager.getConfigurationManager().isCombinedUser === "true" ? true : false,
                        "isVisible": false, //this.profileAccess === "both" ? true : false,
                    },
                    "lblPayeeIcon": {
                        //"isVisible":applicationManager.getConfigurationManager().isCombinedUser === "true" ? true : false,
                        "isVisible": this.profileAccess === "both" ? true : false,
                        "text": dataItem.isBusinessPayee === "1" ? "r" : "s",
                    }
                };
            });
            CommonUtilities.setText(this.view.lblAmountValue, CommonUtilities.formatCurrencyWithCommas(totalSum), CommonUtilities.getaccessibilityConfig());
              var amountVal= "Total amount "+this.view.lblAmountValue.text;
               this.view.lblAmountValue.accessibilityConfig = {
				"a11yLabel": amountVal				
			};        
            this.view.segBill.widgetDataMap = bulkPayAckWidgetDataMap;
            this.view.segBill.setData(bulkPay);
            this.view.btnViewPaymentActivity.onClick = this.onClickPaymentActivity;
            this.view.btnMakeAnotherPayment.onClick = this.onClickMakePayment;
            this.view.forceLayout();
        },
        /**
         * used to skip to main content
         */
        	onSkipNav : function(){
			this.view.lblBulkBillPayAcknowledgement.setActive(true);
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
         * used to navigate the allPayees screen
         */
        onClickMakePayment: function() {
            var self = this;
            self.presenter.showBillPaymentScreen({
                "context": "BulkPayees",
                "loadBills": true
            });
        },
        /**
         *used to convert the CalenderFormat Date
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
                printCallback: function() {
                    // kony.mvc.getNavigationManager().navigate({
                    //     context: this,
                    //     callbackModelConfig: {
                    //         bulkPayeesAcknowledgement: true
                    //     }
                    // });
                    applicationManager.getNavigationManager().navigateTo({
                        appName: 'BillPayMA',
                        friendlyName: 'frmBulkBillPayAcknowledgement'
                    });
                }
            }
            scopeObj.presenter.showPrintPage({
                transactionList: viewModel
            });
        }
    }
});