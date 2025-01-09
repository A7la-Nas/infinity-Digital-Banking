/************************************************************************************************/
var globalacc = {};
var payOther = 0;
var payOtherPartial = 0;
var payDuePartial = 0;
var editTransferData = {};
define(['commonUtilities', 'FormControllerUtility', 'OLBConstants', 'ViewConstants', 'CampaignUtility'], function (commonUtilities, FormControllerUtility, OLBConstants, ViewConstants, CampaignUtility) {
    var originalAmount = 0;
    var frequencies = {
        'Once': "i18n.transfers.frequency.once",
        'Daily': "i18n.Transfers.Daily",
        'Weekly': "i18n.Transfers.Weekly",
        'BiWeekly': "i18n.Transfers.EveryTwoWeeks",
        'Monthly': "i18n.Transfers.Monthly",
        'Quarterly': "i18n.Transfers.Quaterly",
        'Half Yearly': "i18n.Transfers.HalfYearly",
        'Yearly': "i18n.Transfers.Yearly"
    };
    var fromAccounts;
    var toAccounts;
    var fromSeg = true,
        toSeg = true;
    var forHowLong = {
        ON_SPECIFIC_DATE: "i18n.transfers.lbxOnSpecificDate",
        NO_OF_RECURRENCES: "i18n.transfers.lblNumberOfRecurrences"
    };
    var fromScroll = false;
    var toScroll = false;

    var currency = {
        'EUR': "€ EURO",
        'GBP': "£ GBP",
        'USD': "$ USD",
        'JPY': "¥ JPY",
        'RUB': "₽ RUB",
        'AED': "د.إ AED",
    };
    var crediCardRadioButtonMappings = {
        "lblRadioBtn1": {
            parentFlx: "flxNUORadioBtn1",
            associatedWidget: "lblCurrentBalance"
        },
        "lblRadioBtn2": {
            parentFlx: "flxNUORadioBtn2",
            associatedWidget: "lblStatementBalance"
        },
        "lblRadioBtn3": {
            parentFlx: "flxNUORadioBtn3",
            associatedWidget: "lblMinimumDueBalance"
        },
        "lblRadioBtn4": {
            parentFlx: "flxNUORadioBtn4",
            associatedWidget: "lblOtherAmount"
        }
    };
    return {
        isSingleCustomerProfile: true,
        primaryCustomerId: [],
        profileAccess: "",
        init: function () {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function () { };
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.onTouchEnd = this.onFormTouchEnd;
        },
        onFormTouchEnd: function () {
            this.hidePopups();
        },
        preShow: function () {
            this.isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
            this.primaryCustomerId = applicationManager.getUserPreferencesManager().primaryCustomerId;
            this.profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
            var self = this;
            this.enableToList = false;
            this.resetFastTransfersForm();
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader', 'flxFooter', 'flxMain']);
            this.view.flxAcknowledgement.setVisibility(false);
            this.view.flxRightBar.setVisibility(true);
            this.view.calEndingOnNew.onDone = function () {
                self.checkValidityMakeFastTransferForm();
            };
            this.view.lblTransfers.setVisibility(true);
            this.view.flxContainer3.setVisibility(true);
            this.view.flxContainer4.setVisibility(true);
            this.view.CopyflxContainer0be7f6bcaada644.setVisibility(true);
            this.view.flxContainer5.setVisibility(true);
            this.view.flxContainer6.setVisibility(true);
            this.view.flxTransferSubmit.setVisibility(true);
            this.view.flxLoanpayDue.setVisibility(false);
            this.view.flxTrasfersWindow.setVisibility(true);
            this.view.calSendOnNew.dateComponents = commonUtilities.getServerDateComponent();
            this.view.calEndingOnNew.dateComponents = commonUtilities.getServerDateComponent();
            this.view.calSendOnNew.dateFormat = applicationManager.getFormatUtilManager().getDateFormat();
            this.view.calEndingOnNew.dateFormat = applicationManager.getFormatUtilManager().getDateFormat();
            var scopeObj = this;
            this.view.customheadernew.activateMenu("FASTTRANSFERS", "Transfer Money");
            this.view.flxNUORadioBtn1.onClick = this.onClickRadioButton;
            this.view.flxNUORadioBtn2.onClick = this.onClickRadioButton;
            this.view.flxNUORadioBtn3.onClick = this.onClickRadioButton;
            this.view.flxNUORadioBtn4.onClick = this.onClickRadioButton;
            this.view.lbxForHowLong.onSelection = this.onHowLongChange.bind(this);
            this.view.lbxFrequency.onSelection = this.onFrequencyChanged.bind(this);
            this.view.calSendOnNew.onSelection = this.setSkinToCalendar.bind(this, scopeObj.view.calSendOnNew);
            this.view.calEndingOnNew.onSelection = this.setSkinToCalendar.bind(this, scopeObj.view.calEndingOnNew);
            this.view.calEndingOnNew.onSelection = this.checkValidityMakeFastTransferForm.bind(this)
            this.view.tbxNoOfRecurrences.onKeyUp = this.checkValidityMakeFastTransferForm.bind(this);
            this.view.btnModify.text = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
            this.view.btnConfirm.hoverSkin = "sknBtn72727215pxLatoBgf8f7f8";
            this.view.flxIcon.setVisibility(false);
            this.view.flxToIcon.setVisibility(false);
            this.view.calSendOnNew.hidePreviousNextMonthDates = true;
            this.view.calEndingOnNew.hidePreviousNextMonthDates = true;
            this.view.segTransferFrom.widgetDataMap = {
                "flxTransfersFrom": "flxTransfersFrom",
                "flxAccountListItemWrapper": "flxAccountListItemWrapper",
                "lblAccountName": "lblAccountName",
                "flxAmount": "flxAmount",
                // "flxSeparator": "flxSeparator",
                "flxSeparator": "flxSeparator",
                "lblAmount": "lblAmount",
                "lblCurrencySymbol": "lblCurrencySymbol",
                "flxTransfersFromHeader": "flxTransfersFromHeader",
                "lblTransactionHeader": "lblTransactionHeader"
            };
            this.view.segTransferTo.widgetDataMap = {
                "flxTransfersFrom": "flxTransfersFrom",
                "flxAccountListItemWrapper": "flxAccountListItemWrapper",
                "lblAccountName": "lblAccountName",
                "flxAmount": "flxAmount",
                "lblCurrencySymbol": "lblCurrencySymbol",
                "flxSeparator": "flxSeparator",
                // "flxSeparator": "flxSeparator",
                "lblAmount": "lblAmount",
                "flxTransfersFromHeader": "flxTransfersFromHeader",
                "lblTransactionHeader": "lblTransactionHeader",
                "flxFastTransfersActivate": "flxFastTransfersActivate",
                "lblContent": "lblContent",
                "lblActivePayAPerson": "lblActivePayAPerson"
            };
            this.view.txtTransferFrom.onBeginEditing = function () {
                if (self.view.txtTransferFrom.text === "") {
                    self.fetchFromAccountsBySearch();
                }
                self.view.flxIcon.setVisibility(false);
                self.view.flxFromSegment.setVisibility(true);
                self.view.flxToSegment.setVisibility(false);
                self.view.forceLayout();
                self.view.txtTransferFrom.accessibilityConfig = {
                    a11yARIA: {
                        "aria-autocomplete": "list",
                        "aria-expanded": true,
                        "role": "combobox",
                        "aria-labelledby": "lbTransferFrom",
                        "aria-required": true,
                        "aria-controls": "flxFromSegment",
                        "tabindex": 0
                    }
                };
            };
            this.view.txtTransferTo.onBeginEditing = function () {
                if (self.view.txtTransferTo.text === "") {
                    self.fetchToAccountsBySearch();
                }
                self.view.flxToIcon.setVisibility(false);
                self.view.flxToSegment.setVisibility(true);
                self.view.flxFromSegment.setVisibility(false);
                self.view.forceLayout();
                self.view.txtTransferTo.accessibilityConfig = {
                    a11yARIA: {
                        "aria-autocomplete": "list",
                        "aria-expanded": true,
                        "role": "combobox",
                        "aria-labelledby": "lbTransferTo",
                        "aria-required": true,
                        "aria-controls": "flxToSegment",
                        "tabindex": 0
                    }
                };
            };
            this.view.flxFromSegment.onScrolling = function () {
                fromScroll = true;
            };
            this.view.flxToSegment.onScrolling = function () {
                toScroll = true;
            };
            this.view.flxFrom.onClick = function () {
                if (self.view.txtTransferFrom.isVisible === false) {
                    self.view.txtTransferFrom.setVisibility(true);
                    self.view.txtTransferFrom.setFocus();
                    self.view.lblSelectAccount.setVisibility(false);
                    self.view.flxIcon.setVisibility(false);
                    self.view.lblFromAmount.setVisibility(false);
                    self.view.flxCancelFilterFrom.setVisibility(true);
                    self.view.segTransferFrom.selectedRowItems.length ? self.fetchFromAccountsBySearch(self, self.view.segTransferFrom.selectedRowItems[0].accountID) : self.fetchFromAccountsBySearch(self);
                    //self.view.segTransferFrom.setVisibility(true);
                    self.view.flxFromSegment.setVisibility(true);
                    self.view.txtTransferFrom.setActive(true);
                }
                else {
                    self.view.txtTransferFrom.setActive(true);
                    self.view.flxFrom.accessibilityConfig = {
                        a11yARIA: {
                            "tabindex": -1
                        }
                    };
                }
            };
            this.view.flxTo.onClick = function () {
                if (self.view.txtTransferTo.isVisible === false) {
                    self.view.txtTransferTo.setVisibility(true);
                    self.view.txtTransferTo.setFocus();
                    self.view.lblSelectAccountTo.setVisibility(false);
                    self.view.lblToAmount.setVisibility(false);
                    self.view.flxToIcon.setVisibility(false);
                    self.view.flxCancelFilterTo.setVisibility(true);
                    self.view.segTransferTo.selectedRowItems.length ? self.fetchToAccountsBySearch(self, self.view.segTransferTo.selectedRowItems[0].accountID) : self.fetchToAccountsBySearch(self);
                    //self.view.segTransferTo.setVisibility(true);
                    self.view.flxToSegment.setVisibility(true);
                    self.view.txtTransferTo.setActive(true);
                }
                else {
                    self.view.txtTransferTo.setActive(true);
                    self.view.flxTo.accessibilityConfig = {
                        a11yARIA: {
                            "tabindex": -1
                        }
                    };
                }
            };
            this.view.flxCancelFilterFrom.onClick = function () {
                self.view.txtTransferFrom.text = "";
                self.view.flxCancelFilterFrom.setVisibility(false);
                self.fetchFromAccountsBySearch();
                //self.view.segTransferFrom.setVisibility(true);
                self.view.flxFromSegment.setVisibility(true);
                self.view.txtTransferFrom.setActive(true);
            };
            this.view.flxCancelFilterTo.onClick = function () {
                self.view.txtTransferTo.text = "";
                self.toggleCreditCardFlexes(true);
                self.view.flxCancelFilterTo.setVisibility(false);
                self.fetchToAccountsBySearch();
                //self.view.segTransferTo.setVisibility(true);
                self.view.flxToSegment.setVisibility(true);
                self.view.txtTransferTo.setActive(true);
            };
            this.view.txtTransferFrom.onKeyUp = commonUtilities.debounce(this.fetchFromAccountsBySearch.bind(this), OLBConstants.FUNCTION_WAIT, false);
            this.view.txtTransferTo.onKeyUp = commonUtilities.debounce(this.fetchToAccountsBySearch.bind(this), OLBConstants.FUNCTION_WAIT, false);
            CampaignUtility.fetchPopupCampaigns();
            this.view.tbxAmount2.onEndEditing = function () {
                self.view.flxMakeTransferError.setVisibility(false);
                FormControllerUtility.enableButton(self.view.btnPayAmount);
                if (self.view.tbxAmount2.text == "" || self.view.tbxAmount2.text == null || self.view.tbxAmount2.text == "0" || self.view.tbxAmount2.text == "0.00") {
                    self.view.tbxAmount2.text = "0.00";
                    FormControllerUtility.disableButton(self.view.btnPayAmount);
                } else {
                    self.view.tbxAmount2.text = commonUtilities.formatCurrencyWithCommas(self.view.tbxAmount2.text, false, globalacc.currency);
                    self.view.tbxAmount2.text = self.view.tbxAmount2.text.substring(1);
                    FormControllerUtility.enableButton(self.view.btnPayAmount);
                }
                self.view.forceLayout();
                self.validateDate();
            };
            this.view.flxRadioPayOtherAmount.onClick = function () {
                self.view.flxMakeTransferError.setVisibility(false);
                self.view.lblDueAmount.setVisibility(true);
                self.view.tbxAmount2.setEnabled(true);
                self.view.lblPayDueAmount.setEnabled(true);
                self.view.tbxAmount2.skin = "sknTbxBdre3e3e3Bckgrndf6f6f6";
                self.view.tbxAmount2.focusSkin = "sknTbxBdre3e3e3Bckgrndf6f6f6";
                self.view.tbxAmount2.hoverSkin = "sknTbxBdre3e3e3Bckgrndf6f6f6";
                self.view.tbxAmount2.text = applicationManager.getFormatUtilManager().formatAmount(globalacc.dueAmount);
                self.view.imgRadioPayDueAmount.src = ViewConstants.IMAGES.RADIO_BTN_INACTIVE;
                self.view.imgRadioPayOtherAmount.src = ViewConstants.IMAGES.RADIO_BUTTON_ACTIVE;
                self.view.lblDueAmount.text = "(" + kony.i18n.getLocalizedString("i18n.accountDetail.currentDue") + ": " + commonUtilities.formatCurrencyWithCommas(globalacc.dueAmount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(globalacc.currency)) + ", " + kony.i18n.getLocalizedString("i18n.accountDetail.totalOverdue") + ": " + commonUtilities.formatCurrencyWithCommas(globalacc.dueTotalAmount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(globalacc.currency)) + ")";
                self.view.lblDueDate3.text = ("(" + kony.i18n.getLocalizedString("i18n.billPay.DueDate") + ": " + globalacc.dueDate + ")");
                if (self.view.tbxAmount2.text == "" || self.view.tbxAmount2.text == null || self.view.tbxAmount2.text == "0" || self.view.tbxAmount2.text == "0.00") {
                    self.view.tbxAmount2.text = "0.00";
                    FormControllerUtility.disableButton(self.view.btnPayAmount);
                } else {
                    FormControllerUtility.enableButton(self.view.btnPayAmount);
                }
                globalacc.action = "transferOther";
                self.view.forceLayout();
                self.validateDate();
                self.view.flxRadioPayOtherAmount.accessibilityConfig = {
                    "a11yARIA": {
                        "role": "radio",
                        "aria-labelledby": "lblPayOtherAmount",
                        "aria-checked": true,
                        "tabindex": 0
                    }
                };
                self.view.flxRadioPayDueAmount.accessibilityConfig = {
                    "a11yARIA": {
                        "role": "radio",
                        "aria-labelledby": "lblPayDueAmount",
                        "aria-checked": false,
                        "tabindex": 0
                    }
                };
                self.view.flxRadioPayOtherAmount.setActive(true);
            };
            this.view.flxRadioPayDueAmount.onClick = function () {
                self.view.flxMakeTransferError.setVisibility(false);
                self.view.tbxAmount2.text = applicationManager.getFormatUtilManager().formatAmount(globalacc.dueAmount);
                self.view.imgRadioPayDueAmount.src = ViewConstants.IMAGES.RADIO_BUTTON_ACTIVE;
                self.view.imgRadioPayOtherAmount.src = ViewConstants.IMAGES.RADIO_BTN_INACTIVE;
                //self.view.lblDueAmount.setVisibility(false);
                self.view.tbxAmount2.setEnabled(false);
                self.view.lblPayDueAmount.setEnabled(false);
                self.view.lblDueAmount.setVisibility(false);
                self.view.tbxAmount2.skin = "sknTbxBkGrndf6f6f6SSP42424215px";
                self.view.tbxAmount2.focusSkin = "sknTbxBkGrndf6f6f6SSP42424215px";
                self.view.tbxAmount2.hoverSkin = "sknTbxBkGrndf6f6f6SSP42424215px";
                if (self.view.tbxAmount2.text == "" || self.view.tbxAmount2.text == null || self.view.tbxAmount2.text == "0" || self.view.tbxAmount2.text == "0.00") {
                    self.view.tbxAmount2.text = "0.00";
                    FormControllerUtility.disableButton(self.view.btnPayAmount);
                } else {
                    FormControllerUtility.enableButton(self.view.btnPayAmount);
                }
                globalacc.action = "transferDue";
                self.view.forceLayout();
                self.validateDate();
                self.view.flxRadioPayOtherAmount.accessibilityConfig = {
                    "a11yARIA": {
                        "role": "radio",
                        "aria-labelledby": "lblPayOtherAmount",
                        "aria-checked": false,
                        "tabindex": 0
                    }
                };
                self.view.flxRadioPayDueAmount.accessibilityConfig = {
                    "a11yARIA": {
                        "role": "radio",
                        "aria-labelledby": "lblPayDueAmount",
                        "aria-checked": true,
                        "tabindex": 0
                    }
                };
                self.view.flxRadioPayDueAmount.setActive(true);
            };
            this.view.btnPayAmount.onClick = function () {
                var amount = parseFloat(applicationManager.getFormatUtilManager().deFormatAmount(self.view.tbxAmount2.text.trim()));
                var balance = globalacc.dueAmount - amount;
                var totalamount = parseFloat(applicationManager.getFormatUtilManager().deFormatAmount(globalacc.dueTotalAmount));
                var total = globalacc.dueAmount + totalamount;
                //         if(amount > total){
                //           self.view.flxMakeTransferError.setVisibility(true);
                //           self.view.rtxMakeTransferError.text = "Payment amount cannot be greater than the due amount";
                //         }else{
                self.view.flxMakeTransferError.setVisibility(false);
                self.confirmscreen();
            };
            this.view.btnCancel.onClick = function () {
                var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "AccountsUIModule",
                    "appName": "HomepageMA"
                });
                accountsModule.presentationController.showAccountsDashboard();
            };
            this.confirmscreen = function () {
                self.view.lblConfirmationTitle.text = kony.i18n.getLocalizedString("i18n.payments.confirmDuePayment");
                self.view.lblTransfers.setVisibility(false);
                self.view.confirmation.flxContainerPaymentDate.setVisibility(false);
                self.view.confirmation.flxContainerDescription.setVisibility(true);
                self.view.flxConfirmation.setVisibility(true);
                if (self.view.tbxOptional.text == "" || self.view.tbxOptional.text == null) {
                    self.view.tbxOptional.text = kony.i18n.getLocalizedString("i18n.payments.payDue");
                }
                if (payOther == 1) {
                    payOtherPartial == 0;
                    payDuePartial === 0;
                    self.view.confirmation.lblValue.text = self.view.txtTransferFrom.text;
                    self.view.confirmation.lblValueTo.text = self.view.txtTransferTo.text;
                    self.view.confirmation.lblValueDate.text = self.selectedDate;
                    self.view.confirmation.lblValueDescription.text = self.view.tbxOptional.text;
                    self.view.confirmation.lblValueAmount.text = commonUtilities.formatCurrencyWithCommas(self.view.tbxAmount2.text, false, self.view.lblDollar.text);
                    var data = {
                        "from": self.view.txtTransferFrom.text,
                        "to": self.view.txtTransferTo.text,
                        "date": self.view.CalendarSendDate.formattedDate,
                        "amount": parseFloat(applicationManager.getFormatUtilManager().deFormatAmount(self.view.tbxAmount2.text.trim())),
                        "notes": self.view.tbxOptional.text
                    };
                    self.view.confirmation.flxPartialPayment.setVisibility(false);
                    self.view.confirmation.flxError.setVisibility(false);
                } else {
                    if (globalacc.action == "transferDue") {
                        self.view.confirmation.lblValue.text = self.view.txtTransferFrom.text;
                        self.view.confirmation.lblValueTo.text = self.view.txtTransferTo.text;
                        self.view.confirmation.lblValueDate.text = self.selectedDate;
                        self.view.confirmation.lblValueDescription.text = self.view.tbxOptional.text;
                        self.view.confirmation.lblValueAmount.text = commonUtilities.formatCurrencyWithCommas(self.view.tbxAmount2.text, false, self.view.lblDollar.text);
                        var data = {
                            "from": self.view.txtTransferFrom.text,
                            "to": self.view.txtTransferTo.text,
                            "date": self.view.CalendarSendDate.formattedDate,
                            "amount": parseFloat(applicationManager.getFormatUtilManager().deFormatAmount(self.view.tbxAmount2.text.trim())),
                            "notes": self.view.tbxOptional.text
                        };
                        var presentationController = applicationManager.getModulesPresentationController({
                            "moduleName": "LoanPayModule",
                            "appName": "TransfersMA"
                        });
                        self.view.confirmation.flxContainerYourBill.setVisibility(true);
                        self.view.confirmation.flxContainerYouArePaying.setVisibility(true);
                        self.view.confirmation.flxContainerBalanceAmount.setVisibility(true);
                        self.view.confirmation.lblKeyYourBill.text = kony.i18n.getLocalizedString("i18n.PayDueAmount.YouarePaying");
                        self.view.confirmation.lblValueYourBill.text = commonUtilities.formatCurrencyWithCommas(data.amount, false, self.view.lblDollar.text);
                        self.view.confirmation.lblKeyYouArePaying.text = kony.i18n.getLocalizedString("i18n.transfers.lblDate");
                        self.view.confirmation.lblValueYouArePaying.text = presentationController.getFormattedDateString(self.dueShownDate);
                        self.view.confirmation.lblKeyBalanceAmount.text = kony.i18n.getLocalizedString("i18n.payments.yourPaymentDateWithColon");
                        self.view.confirmation.lblValueBalanceAmount.text = presentationController.getFormattedDateString(self.selectedDate);
                        if (self.getDateObject(self.selectedDate).getTime() > self.getDateObject(self.dueShownDate).getTime()) {
                            self.view.confirmation.flxPartialPayment.setVisibility(true);
                            self.view.confirmation.flxError.setVisibility(true);
                            self.view.confirmation.flxContainerPartialDate.setVisibility(false);
                            self.view.confirmation.lblError.text = kony.i18n.getLocalizedString("i18n.payments.payDueConfirmationErrorMessage");
                            payDuePartial = 1;
                        } else {
                            payDuePartial = 0;
                            self.view.confirmation.flxPartialPayment.setVisibility(false);
                            self.view.confirmation.flxError.setVisibility(false);
                        }
                    } else {
                        self.view.confirmation.lblValue.text = self.view.txtTransferFrom.text;
                        self.view.confirmation.lblValueTo.text = self.view.txtTransferTo.text;
                        self.view.confirmation.lblValueDate.text = self.selectedDate;
                        self.view.confirmation.lblValueDescription.text = self.view.tbxOptional.text;
                        self.view.confirmation.lblValueAmount.text = commonUtilities.formatCurrencyWithCommas(self.view.tbxAmount2.text, false, self.view.lblDollar.text);
                        var data = {
                            "from": self.view.txtTransferFrom.text,
                            "to": self.view.txtTransferTo.text,
                            "date": self.view.CalendarSendDate.formattedDate,
                            "amount": parseFloat(applicationManager.getFormatUtilManager().deFormatAmount(self.view.tbxAmount2.text.trim())),
                            "notes": self.view.tbxOptional.text
                        };
                        var presentationController = applicationManager.getModulesPresentationController({
                            "moduleName": "LoanPayModule",
                            "appName": "TransfersMA"
                        });
                        if (self.getDateObject(self.selectedDate).getTime() > self.getDateObject(self.dueShownDate).getTime()) {
                            self.view.confirmation.flxError.setVisibility(true);
                            self.view.confirmation.flxContainerPartialDate.setVisibility(false);
                            self.view.confirmation.flxPartialPayment.setVisibility(true);
                            self.view.confirmation.lblError.text = kony.i18n.getLocalizedString("i18n.payments.payDueConfirmationErrorMessage");
                            payDuePartial = 0;
                            payOtherPartial = 1;
                            self.view.confirmation.flxContainerYourBill.setVisibility(true);
                            self.view.confirmation.flxContainerYouArePaying.setVisibility(true);
                            self.view.confirmation.flxContainerBalanceAmount.setVisibility(true);
                            self.view.confirmation.lblKeyYourBill.text = kony.i18n.getLocalizedString("i18n.PayDueAmount.YouarePaying");
                            self.view.confirmation.lblValueYourBill.text = commonUtilities.formatCurrencyWithCommas(data.amount, false, self.view.lblDollar.text);
                            self.view.confirmation.lblKeyYouArePaying.text = kony.i18n.getLocalizedString("i18n.transfers.lblDate");
                            self.view.confirmation.lblValueYouArePaying.text = presentationController.getFormattedDateString(self.dueShownDate);
                            self.view.confirmation.lblKeyBalanceAmount.text = kony.i18n.getLocalizedString("i18n.payments.yourPaymentDateWithColon");
                            self.view.confirmation.lblValueBalanceAmount.text = presentationController.getFormattedDateString(self.selectedDate);
                        } else {
                            var due = parseFloat(applicationManager.getFormatUtilManager().deFormatAmount(globalacc.dueAmount));
                            data.balance = due - data.amount;
                            if (data.balance > due || data.amount == globalacc.dueAmount || data.balance < 0) {
                                self.view.confirmation.flxPartialPayment.setVisibility(false);
                                self.view.confirmation.flxError.setVisibility(false);
                            } else {
                                self.view.confirmation.flxPartialPayment.setVisibility(true);
                                self.view.confirmation.flxError.setVisibility(true);
                                self.view.confirmation.flxContainerPartialDate.setVisibility(true);
                                self.view.confirmation.flxContainerYourBill.setVisibility(true);
                                self.view.confirmation.flxContainerYouArePaying.setVisibility(true);
                                self.view.confirmation.flxContainerBalanceAmount.setVisibility(true);
                                self.view.confirmation.lblKeyYourBill.text = kony.i18n.getLocalizedString("i18n.accountDetail.currentDue") + ":";
                                self.view.confirmation.lblValueYourBill.text = commonUtilities.formatCurrencyWithCommas(globalacc.dueAmount, false, self.view.lblDollar.text);
                                self.view.confirmation.lblKeyYouArePaying.text = kony.i18n.getLocalizedString("i18n.PayDueAmount.YouarePaying");
                                self.view.confirmation.lblValueYouArePaying.text = commonUtilities.formatCurrencyWithCommas(data.amount, false, self.view.lblDollar.text);
                                self.view.confirmation.lblKeyBalanceAmount.text = kony.i18n.getLocalizedString("i18n.PayDueAmount.BalanceAmount");
                                self.view.confirmation.lblValueBalanceAmount.text = commonUtilities.formatCurrencyWithCommas(data.balance, false, self.view.lblDollar.text);
                                self.view.confirmation.lblKeyPartialDate.text = kony.i18n.getLocalizedString("i18n.ChequeManagement.Date:");
                                self.view.confirmation.lblValuePartialDate.text = self.dueShownDate;
                            }
                        }
                    }
                }
                self.view.flxTrasfersWindow.setVisibility(false);
                self.view.flxRightBar.setVisibility(false);
            };
            this.view.confirmation.confirmButtons.btnModify.onClick = function () {
                self.view.flxMakeTransferError.setVisibility(false);
                self.view.lblTransfers.setVisibility(true);
                self.view.flxConfirmation.setVisibility(false);
                self.view.flxTrasfersWindow.setVisibility(true);
                self.view.flxRightBar.setVisibility(true);
                self.view.forceLayout();
            };
            this.view.confirmation.confirmButtons.btnCancel.onClick = function () {
                var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                    "moduleName": "AccountsUIModule",
                    "appName": "HomepageMA"
                });
                accountsModule.presentationController.showAccountsDashboard();
            };
            this.view.confirmation.confirmButtons.btnConfirm.onClick = function () {
                FormControllerUtility.showProgressBar(this.view);
                var transferData = {};
                var today = commonUtilities.getServerDateObject();
                var month = (today.getMonth() + 1) >= 10 ? (today.getMonth() + 1) : ("0" + (today.getMonth() + 1));
                var day = today.getDate() > 9 ? today.getDate() : ("0" + today.getDate());
                var todayDate = month + "/" + day + "/" + today.getFullYear();
                if (todayDate == self.selectedDate) {
                    transferData.isScheduled = 0;
                } else {
                    transferData.isScheduled = 1;
                }
                var fromAccountNumber = {};
                fromAccountNumber.accountID = globalacc.accountId;
                var accountTo = {};
                accountTo.type = "OWN_INTERNAL_ACCOUNTS";
                transferData.accountTo = accountTo;
                transferData.fromAccountNumber = fromAccountNumber;
                transferData.amount = parseFloat(applicationManager.getFormatUtilManager().deFormatAmount(self.view.tbxAmount2.text.trim()));
                transferData.notes = self.view.tbxOptional.text;
                transferData.ExternalAccountNumber = "";
                transferData.transactionType = "InternalTransfer";
                transferData.toAccountNumber = globalacc.toaccId;
                transferData.frequencyType = "Once";
                transferData.scheduledDate = self.selectedDate;
                transferData.fromAccountCurrency = globalacc.currency;
                transferData.toAccountCurrency = globalacc.toCurrency;
                transferData.action = globalacc.action;
                transferData.fromAccountName = self.view.txtTransferFrom.text;
                transferData.toAccountName = self.view.txtTransferTo.text;
                transferData.sendOnDate = self.selectedDate;
                transferData.dueDate = self.dueShownDate;
                transferData.dueAmount = globalacc.dueAmount;
                transferData.balAmount = globalacc.dueAmount - transferData.amount;
                var TransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule");
                TransferModule.presentationController.createTransfer(transferData);
            };
            this.successDue = function (data, refId) {
                self.view.lblAcknowledgementTitle.text = kony.i18n.getLocalizedString("i18n.payments.acknowledgementDuePayment");
                self.view.flxConfirmation.setVisibility(false);
                self.view.flxAcknowledgement.setVisibility(true);
                self.view.flxMainAcknowledgment.setVisibility(true);
                if (applicationManager.getConfigurationManager().showLoanUpdateDisclaimer === "true") {
                    self.view.acknowledgment.lblTransactionMessage.setVisibility(true);
                } else {
                    self.view.acknowledgment.lblTransactionMessage.setVisibility(false);
                }
                self.view.acknowledgment.lblTransactionMessage.text = kony.i18n.getLocalizedString("i18n.loanpay.transactionSuccess");
                self.view.acknowledgment.flxBalance.setVisibility(false);
                self.view.acknowledgment.lblRefrenceNumberValue.text = refId;
                self.view.confirmDialog.lblValue.text = data.fromAccountName;
                self.view.confirmDialog.lblValueTo.text = data.toAccountName;
                self.view.confirmDialog.lblValueAmount.text = commonUtilities.formatCurrencyWithCommas(data.amount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(data.toAccountCurrency));
                self.view.confirmDialog.lblValueDate.text = data.sendOnDate;
                if (data.notes) {
                    self.view.confirmDialog.flxContainerDescription.setVisibility(true);
                    self.view.confirmDialog.lblValueDescription.text = data.notes;
                } else {
                    self.view.confirmDialog.flxContainerDescription.setVisibility(false);
                }
                if (payDuePartial == 1) {
                    self.view.confirmDialog.flxPartial.setVisibility(true);
                    self.view.confirmDialog.flxContainerBillAmount.setVisibility(false);
                    self.view.confirmDialog.lblKeyBalanceAmount.text = kony.i18n.getLocalizedString("i18n.transfers.lblDate");
                    self.view.confirmDialog.lblValueBalanceAmount.text = data.dueDate;
                    self.view.confirmDialog.lblKeyPayDate.text = kony.i18n.getLocalizedString("i18n.payments.yourPaymentDateWithColon");
                    self.view.confirmDialog.lblValuePayDate.text = data.sendOnDate;
                    self.view.confirmDialog.lblValuePaying.text = commonUtilities.formatCurrencyWithCommas(data.amount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(data.toAccountCurrency));
                } else {
                    self.view.confirmDialog.flxPartial.setVisibility(false);
                    self.view.confirmDialog.flxContainerBillAmount.setVisibility(true);
                }
                FormControllerUtility.hideProgressBar(self.view);
                self.view.forceLayout();
            };
            this.successOther = function (data, refId) {
                self.view.lblAcknowledgementTitle.text = kony.i18n.getLocalizedString("i18n.payments.acknowledgementDuePayment");
                self.view.flxConfirmation.setVisibility(false);
                self.view.flxAcknowledgement.setVisibility(true);
                self.view.flxMainAcknowledgment.setVisibility(true);
                if (applicationManager.getConfigurationManager().showLoanUpdateDisclaimer === "true") {
                    self.view.acknowledgment.lblTransactionMessage.setVisibility(true);
                } else {
                    self.view.acknowledgment.lblTransactionMessage.setVisibility(false);
                }
                self.view.acknowledgment.lblTransactionMessage.text = kony.i18n.getLocalizedString("i18n.loanpay.transactionSuccess");
                self.view.acknowledgment.flxBalance.setVisibility(false);
                self.view.acknowledgment.lblRefrenceNumberValue.text = refId;
                self.view.confirmDialog.lblValue.text = data.fromAccountName;
                self.view.confirmDialog.lblValueTo.text = data.toAccountName;
                self.view.confirmDialog.lblValueAmount.text = commonUtilities.formatCurrencyWithCommas(data.amount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(data.toAccountCurrency));
                self.view.confirmDialog.lblValueDate.text = data.sendOnDate;
                if (data.notes) {
                    self.view.confirmDialog.flxContainerDescription.setVisibility(true);
                    self.view.confirmDialog.lblValueDescription.text = data.notes;
                } else {
                    self.view.confirmDialog.flxContainerDescription.setVisibility(false);
                }
                if (payOtherPartial == 0) {
                    if (payDuePartial === 0) {
                        self.view.confirmDialog.flxPartial.setVisibility(false);
                        self.view.confirmDialog.flxContainerBillAmount.setVisibility(true);
                    } else {
                        self.view.confirmDialog.flxPartial.setVisibility(true);
                        self.view.confirmDialog.flxContainerBillAmount.setVisibility(true);
                        self.view.confirmDialog.lblKeyBillAmount.text = kony.i18n.getLocalizedString("i18n.accountDetail.currentDue");
                        self.view.confirmDialog.lblValueBillAmount.text = commonUtilities.formatCurrencyWithCommas(data.dueAmount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(data.toAccountCurrency));
                        self.view.confirmDialog.lblValuePaying.text = commonUtilities.formatCurrencyWithCommas(data.amount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(data.toAccountCurrency));
                        self.view.confirmDialog.lblKeyBalanceAmount.text = kony.i18n.getLocalizedString("i18n.PayDueAmount.BalanceAmount");
                        self.view.confirmDialog.lblValueBalanceAmount.text = commonUtilities.formatCurrencyWithCommas(data.balAmount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(data.toAccountCurrency));
                        self.view.confirmDialog.lblKeyPayDate.text = kony.i18n.getLocalizedString("i18n.ChequeManagement.Date:");
                        self.view.confirmDialog.lblValuePayDate.text = data.dueDate;
                    }
                } else {
                    if (payDuePartial == 0) {
                        self.view.confirmDialog.flxPartial.setVisibility(true);
                        self.view.confirmDialog.flxContainerBillAmount.setVisibility(false);
                        self.view.confirmDialog.lblKeyBalanceAmount.text = kony.i18n.getLocalizedString("i18n.transfers.lblDate");
                        self.view.confirmDialog.lblValueBalanceAmount.text = data.dueDate;
                        self.view.confirmDialog.lblKeyPayDate.text = kony.i18n.getLocalizedString("i18n.payments.yourPaymentDateWithColon");
                        self.view.confirmDialog.lblValuePaying.text = commonUtilities.formatCurrencyWithCommas(data.amount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(data.toAccountCurrency));
                        self.view.confirmDialog.lblValuePayDate.text = data.sendOnDate;
                    }
                }
                FormControllerUtility.hideProgressBar(self.view);
                self.view.forceLayout();
            };
            this.view.btnBackToAccountSummary.onClick = function () {
                var TransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LoanPayModule");
                TransferModule.presentationController.backToAccount;
            };
            this.view.btnBackToAccountDeatil.onClick = function () {
                var selectedKey = globalacc.toaccId;
                var TransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("LoanPayModule");
                TransferModule.presentationController.fetchUpdatedAccountDetails(selectedKey, "navigationToAccountDetailsfromLoan");
            };
            this.view.lbxCurrency.onSelection = this.onChangeCurrency;
            this.view.txtNotes.onKeyUp = function () {
                self.view.txtNotes.text = self.view.txtNotes.text.replace(/[^a-zA-Z0-9.?:/()+ ]/g, "");
            };
        },
        onChangeCurrency: function () {
            var scopeObj = this;
            this.view.lblCurrencySymbol.text = this.view.lbxCurrency.selectedKeyValue[1][0];
            this.view.lblAmount.accessibilityConfig = {
                    "a11yLabel": `${scopeObj.view.lblAmount.text} ${scopeObj.view.lblCurrencySymbol.text}`,
                    "a11yARIA": {
                        "tabindex": -1,
                        "role": "span"
                    }
            }
        },
        showServerError: function (serverError) {
            FormControllerUtility.hideProgressBar(this.view);
            this.view.flxMakeTransferError.setVisibility(true);
            this.view.rtxMakeTransferError.setVisibility(true);
            this.view.rtxMakeTransferError.text = serverError;
            this.view.rtxMakeTransferError.setFocus(true);
            this.view.forceLayout();
        },
        toggleCreditCardFlexes: function (flag) {
            var self = this;
            if (flag === true) {
                self.view.flxOption1.setVisibility(false);
                self.view.flxOption2.setVisibility(false);
                self.view.flxOption3.setVisibility(false);
                self.view.flxOption4.setVisibility(false);
                self.view.flxOptions.setVisibility(false);
                self.view.flxAmount.setVisibility(true);
                self.view.lblAmount.setVisibility(true);
                self.view.flxContainer4.setVisibility(true);
                self.view.lblDueDate.setVisibility(false);
                self.view.lblNoOfRecOrEndingOn.setVisibility(false);
            } else {
                self.view.flxOption1.setVisibility(true);
                self.view.flxOption2.setVisibility(true);
                self.view.flxOption3.setVisibility(true);
                self.view.flxOption4.setVisibility(true);
                self.view.flxOptions.setVisibility(true);
                self.view.flxAmount.setVisibility(false);
                self.view.lblAmount.setVisibility(false);
                self.view.flxContainer4.setVisibility(false);
                self.view.lblDueDate.setVisibility(true);
                self.view.lblNoOfRecOrEndingOn.setVisibility(false);
            }
        },
        postShow: function () {
            var scopeObj = this;
            this.view.customheadernew.forceCloseHamburger();
            applicationManager.getNavigationManager().applyUpdates(this);
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.executeAuthorizationFramework(this);
            this.view.flxCalEndingOn.setVisibility(false);
            this.view.lblNoOfRecOrEndingOn.setVisibility(false);
            this.view.tbxNoOfRecurrences.setVisibility(false);
            this.makeTransferAmountField = FormControllerUtility.wrapAmountField(this.view.tbxAmount).onKeyUp(this.checkValidityMakeFastTransferForm);
            this.makeTransferCreditCardAmountField = FormControllerUtility.wrapAmountField(this.view.tbxAmountValue).onKeyUp(this.checkValidityMakeFastTransferForm);
            this.hideCurrency();
            this.view.lbxCurrency.masterData = this.getCurrencyMasterData();
            this.view.lbxCurrency.selectedKey = this.view.lbxCurrency.masterData[0][0];
            scopeObj.view.tbxAmountValue.onBeginEditing = function () {
                scopeObj.onClickRadioButton(scopeObj.view.flxNUORadioBtn4, true);
            };
            scopeObj.view.customheadernew.btnSkipNav.onClick = function () {
                scopeObj.view.lblTransfers.setActive(true);
            };
            scopeObj.view.btnBypass.onClick = function () {
                if (scopeObj.view.flxAddBankAccount.isVisible)
                    scopeObj.view.flxAddBankAccount.setActive(true);
                else if (scopeObj.view.flxAddKonyAccount.isVisible)
                    scopeObj.view.flxAddKonyAccount.setActive(true);
                else if (scopeObj.view.flxAddInternationalAccount.isVisible)
                    scopeObj.view.flxAddInternationalAccount.setActive(true);
                else if (scopeObj.view.flxAddReciepient.isVisible)
                    scopeObj.view.flxAddReciepient.setActive(true);
            }.bind();
            scopeObj.view.CustomPopup.doLayout = commonUtilities.centerPopupFlex;
            scopeObj.view.onKeyPress = scopeObj.onKeyPressCallBack;
            scopeObj.view.CustomPopup.onKeyPress = this.onKeyPressCallBack;
            scopeObj.view.flxCancelFilterFrom.accessibilityConfig = {
                "a11yLabel": "Clear Text",
                "a11yARIA": {
                    "role": "button",
                    "tabindex": 0
                }
            };
            scopeObj.view.flxCancelFilterTo.accessibilityConfig = {
                "a11yLabel": "Clear Text",
                "a11yARIA": {
                    "role": "button",
                    "tabindex": 0
                }
            };
            //From Account accessibilityConfig
            if (scopeObj.view.txtTransferFrom.isVisible) {
                scopeObj.view.txtTransferFrom.accessibilityConfig = {
                    a11yARIA: {
                        "aria-autocomplete": "list",
                        "aria-expanded": false,
                        "role": "combobox",
                        "aria-labelledby": "lbTransferFrom",
                        "aria-required": true,
                        "aria-controls": "flxFromSegment",
                        "tabindex": 0
                    }
                };
                scopeObj.view.flxFrom.accessibilityConfig = {
                    a11yARIA: {
                        "tabindex": -1
                    }
                };
            }
            else if (scopeObj.view.lblSelectAccount.isVisible) {
                scopeObj.view.txtTransferFrom.accessibilityConfig = {
                    a11yARIA: {
                        "aria-autocomplete": "list",
                        "aria-expanded": false,
                        "role": "combobox",
                        "aria-labelledby": "lbTransferFrom",
                        "aria-required": true,
                        "aria-controls": "flxFromSegment",
                        "tabindex": -1
                    },
                };
                scopeObj.view.flxFrom.accessibilityConfig = {
                    a11yLabel: `Transfer From. Currently selected ${scopeObj.view.lblSelectAccount.text} with Amount of ${scopeObj.view.lblFromAmount.text}. Click to select another account`,
                    a11yARIA: {
                        "tabindex": 0,
                        "role": "button"
                    }
                };

            }

            //To Account accessibilityConfig
            if (scopeObj.view.txtTransferTo.isVisible) {
                scopeObj.view.txtTransferTo.accessibilityConfig = {
                    a11yARIA: {
                        "aria-autocomplete": "list",
                        "aria-expanded": false,
                        "role": "combobox",
                        "aria-labelledby": "lbTransferTo",
                        "aria-required": true,
                        "aria-controls": "flxToSegment",
                        "tabindex": 0
                    }
                };
                scopeObj.view.flxTo.accessibilityConfig = {
                    a11yARIA: {
                        "tabindex": -1
                    }
                };
            }
            else if (scopeObj.view.lblSelectAccountTo.isVisible) {
                scopeObj.view.txtTransferTo.accessibilityConfig = {
                    a11yARIA: {
                        "aria-autocomplete": "list",
                        "aria-expanded": false,
                        "role": "combobox",
                        "aria-labelledby": "lbTransferTo",
                        "aria-required": true,
                        "aria-controls": "flxToSegment",
                        "tabindex": -1
                    },
                };
                scopeObj.view.flxTo.accessibilityConfig = {
                    a11yLabel: scopeObj.view.lblToAmount.isVisible ?
                        `Transfer To. Currently selected ${scopeObj.view.lblSelectAccountTo.text} of bank ${scopeObj.view.lblToAmount.text}. Click to select another account` :
                        `Transfer To. Currently selected ${scopeObj.view.lblSelectAccountTo.text}`,
                    a11yARIA: {
                        "tabindex": 0,
                        "role": "button"
                    }
                };
            }

            //flxNewRecipientWrapper properties start
            scopeObj.view.flxNewRecipientWrapper.onClick = function () {
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule").presentationController.showTransferScreen({ showRecipientGateway: true });
            }.bind(this);


            scopeObj.view.flxNewRecipientWrapper.accessibilityConfig = {
                a11yLabel: `${scopeObj.view.lblSendMoneyToNewRecipientTo.text}`,
                a11yARIA: {
                    "tabindex": 0,
                    "role": "link"
                }
            };

            scopeObj.view.flxNewRecipientWrapper.onKeyPress = function (eventObject, eventPayload) {
                if (eventPayload.keyCode === 9) {
                    if (scopeObj.view.flxToSegment.isVisible) {
                        scopeObj.view.flxToSegment.setVisibility(false);
                        scopeObj.view.txtTransferTo.accessibilityConfig = {
                            a11yARIA: {
                                "aria-autocomplete": "list",
                                "aria-expanded": false,
                                "role": "combobox",
                                "aria-labelledby": "lbTransferTo",
                                "aria-required": true,
                                "aria-controls": "flxToSegment",
                                "tabindex": 0
                            }
                        };
                    }
                }
                else if (eventPayload.keyCode === 27) {
                    scopeObj.view.flxToSegment.setVisibility(false);
                    eventPayload.preventDefault();
                    scopeObj.view.txtTransferTo.setActive(true);
                    scopeObj.view.txtTransferTo.accessibilityConfig = {
                        a11yARIA: {
                            "aria-autocomplete": "list",
                            "aria-expanded": true,
                            "role": "combobox",
                            "aria-labelledby": "lbTransferTo",
                            "aria-required": true,
                            "aria-controls": "flxToSegment",
                            "tabindex": 0
                        }
                    };
                }
            }.bind(this);

            //flxNewRecipientWrapper properties end

            //flxSendMoneyWrapper properties start
            scopeObj.view.flxSendMoneyWrapper.accessibilityConfig = {
                a11yLabel: `${scopeObj.view.lblSendMoneyToNewRecipientPayPersonFailure.text}`,
                a11yARIA: {
                    "tabindex": 0,
                    "role": "link"
                }
            };
            scopeObj.view.flxSendMoneyWrapper.onKeyPress = function (eventObject, eventPayload) {
                if (eventPayload.keyCode === 9) {
                    if (scopeObj.view.flxToSegment.isVisible) {
                        scopeObj.view.flxToSegment.setVisibility(false);
                        scopeObj.view.txtTransferTo.accessibilityConfig = {
                            a11yARIA: {
                                "aria-autocomplete": "list",
                                "aria-expanded": false,
                                "role": "combobox",
                                "aria-labelledby": "lbTransferTo",
                                "aria-required": true,
                                "aria-controls": "flxToSegment",
                                "tabindex": 0
                            }
                        };
                    }
                }
                else if (eventPayload.keyCode === 27) {
                    scopeObj.view.flxToSegment.setVisibility(false);
                    eventPayload.preventDefault();
                    scopeObj.view.txtTransferTo.accessibilityConfig = {
                        a11yARIA: {
                            "aria-autocomplete": "list",
                            "aria-expanded": true,
                            "role": "combobox",
                            "aria-labelledby": "lbTransferTo",
                            "aria-required": true,
                            "aria-controls": "flxToSegment",
                            "tabindex": 0
                        }
                    };
                    scopeObj.view.txtTransferTo.setActive(true);
                }
            }.bind(this);
            //flxSendMoneyWrapper properties end

            //flxOpenAccountFrom properties start
            scopeObj.view.flxOpenAccountFrom.onClick = function () {
                var nuoModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("NAOModule");
                nuoModule.presentationController.showNewAccountOpening();
            }.bind(this);

            scopeObj.view.flxOpenAccountFrom.accessibilityConfig = {
                a11yLabel: `${scopeObj.view.lblOpenAccounttFrom.text}`,
                a11yARIA: {
                    "tabindex": 0,
                    "role": "link"
                }
            };

            scopeObj.view.flxOpenAccountFrom.onKeyPress = function (eventObject, eventPayload) {
                if (eventPayload.keyCode === 9) {
                    if (scopeObj.view.flxFromSegment.isVisible) {
                        scopeObj.view.flxFromSegment.setVisibility(false);
                        scopeObj.view.txtTransferFrom.accessibilityConfig = {
                            a11yARIA: {
                                "aria-autocomplete": "list",
                                "aria-expanded": false,
                                "role": "combobox",
                                "aria-labelledby": "lbTransferFrom",
                                "aria-required": true,
                                "aria-controls": "flxFromSegment",
                                "tabindex": 0
                            },
                        };
                    }
                }
                else if (eventPayload.keyCode === 27) {
                    scopeObj.view.flxFromSegment.setVisibility(false);
                    eventPayload.preventDefault();
                    scopeObj.view.txtTransferFrom.accessibilityConfig = {
                        a11yARIA: {
                            "aria-autocomplete": "list",
                            "aria-expanded": true,
                            "role": "combobox",
                            "aria-labelledby": "lbTransferFrom",
                            "aria-required": true,
                            "aria-controls": "flxFromSegment",
                            "tabindex": 0
                        },
                    };
                    scopeObj.view.txtTransferFrom.setActive(true);
                }
            }.bind(this);
            //flxOpenAccountFrom properties end

            //flxOpenNewAccountWrapper properties start
            scopeObj.view.flxOpenNewAccountWrapper.onClick = function () {
                // kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                //   "moduleName": "NAOModule",
                //   "appName": "NAOMA"
                // }).presentationController.showNewAccountOpening();
            };

            scopeObj.view.flxOpenNewAccountWrapper.accessibilityConfig = {
                a11yLabel: `${scopeObj.view.lblOpenNewAccounttFrom.text}`,
                a11yARIA: {
                    "tabindex": 0,
                    "role": "link"
                }
            };

            scopeObj.view.flxOpenNewAccountWrapper.onKeyPress = function (eventObject, eventPayload) {
                if (eventPayload.keyCode === 9) {
                    if (scopeObj.view.flxFromSegment.isVisible) {
                        scopeObj.view.flxFromSegment.setVisibility(false);
                    }
                }
                else if (eventPayload.keyCode === 27) {
                    scopeObj.view.flxFromSegment.setVisibility(false);
                    eventPayload.preventDefault();
                    scopeObj.view.txtTransferFrom.setActive(true);
                }
            }.bind(this);

            //flxOpenNewAccountWrapper properties end

            scopeObj.view.txtTransferFrom.onKeyPress = function (eventObject, eventPayload) {
                if (eventPayload.shiftKey && eventPayload.keyCode === 9) {
                    scopeObj.view.flxFromSegment.setVisibility(false);
                }
                else if(eventPayload.keyCode === 27){
                    scopeObj.view.flxFromSegment.setVisibility(false);
                    eventPayload.preventDefault();
                    scopeObj.view.flxFrom.accessibilityConfig = {
                        a11yARIA: {
                            "aria-autocomplete": "list",
                            "aria-expanded": false,
                            "role": "combobox",
                            "aria-labelledby": "lbTransferFrom",
                            "aria-required": true,
                            "aria-controls": "flxFromSegment",
                            "tabindex": -1
                        }
                    };
                    scopeObj.view.flxFrom.setActive(true);
                }
            };

            scopeObj.view.txtTransferTo.onKeyPress = function (eventObject, eventPayload) {
                if (eventPayload.shiftKey && eventPayload.keyCode === 9) {
                    scopeObj.view.flxToSegment.setVisibility(false);
                }
                else if (eventPayload.keyCode === 27){
                    scopeObj.view.flxToSegment.setVisibility(false);
                    eventPayload.preventDefault();
                    scopeObj.view.flxTo.accessibilityConfig = {
                        a11yARIA: {
                            "aria-autocomplete": "list",
                            "aria-expanded": false,
                            "role": "combobox",
                            "aria-labelledby": "lbTransferTo",
                            "aria-required": true,
                            "aria-controls": "flxToSegment",
                            "tabindex": -1
                        }
                    };
                    scopeObj.view.flxTo.setActive(true);
                }
            };
        },

        onSegFromKeyPressCallBack: function (eventObject, eventPayload, context) {
            var scopeObj = this;
            if (eventPayload.keyCode === 9) {
                if (context.sectionIndex === context.widgetInfo.data.length - 1) {
                    if (context.rowIndex === context.widgetInfo.data[context.sectionIndex][1].length - 1) {
                        if (scopeObj.view.flxFromSegment.isVisible) {
                            scopeObj.view.flxFromSegment.setVisibility(false);
                        }
                    }
                }
            }
            else if (eventPayload.keyCode === 27) {
                scopeObj.view.flxFromSegment.setVisibility(false);
                eventPayload.preventDefault();
                scopeObj.view.flxFrom.accessibilityConfig = {
                    a11yARIA: {
                        "aria-autocomplete": "list",
                        "aria-expanded": false,
                        "role": "combobox",
                        "aria-labelledby": "lbTransferFrom",
                        "aria-required": true,
                        "aria-controls": "flxFromSegment",
                        "tabindex": -1
                    }
                };
                scopeObj.view.flxFrom.setActive(true);
            }
        },

        onSegToKeyPressCallBack: function (eventObject, eventPayload, context) {
            var scopeObj = this;
            if (eventPayload.keyCode === 9) {
                if (eventPayload.shiftKey) {
                    if (context.sectionIndex === 0 && context.rowIndex === 0) {
                        if (scopeObj.view.flxToSegment.isVisible)
                            scopeObj.view.flxToSegment.setVisibility(false);
                    }
                }
                else if (context.sectionIndex === context.widgetInfo.data.length - 1) {
                    if (context.rowIndex === context.widgetInfo.data[context.sectionIndex][1].length - 1) {
                        if (scopeObj.view.flxToSegment.isVisible) {
                            scopeObj.view.flxToSegment.setVisibility(false);
                        }
                    }
                }
            }
            else if (eventPayload.keyCode === 27) {
                scopeObj.view.flxToSegment.setVisibility(false);
                eventPayload.preventDefault();
                scopeObj.view.flxTo.accessibilityConfig = {
                    a11yARIA: {
                        "aria-autocomplete": "list",
                        "aria-expanded": false,
                        "role": "combobox",
                        "aria-labelledby": "lbTransferTo",
                        "aria-required": true,
                        "aria-controls": "flxToSegment",
                        "tabindex": -1
                    }
                };
                scopeObj.view.flxTo.setActive(true);
            }
        },

        onKeyPressCallBack: function (eventObject, eventPayload) {
            var scopeObj = this;
            if (eventPayload.keyCode === 27) {
                if (scopeObj.view.flxLogout.isVisible) {
                    scopeObj.view.flxDialogs.isVisible = false;
                    scopeObj.view.flxLogout.setVisibility(false);
                    if ((kony.application.getCurrentBreakpoint() === 640) || new OrientationHandler().isMobile)
                        scopeObj.view.customheadernew.btnHamburgerNew.setActive(true);
                    else
                        scopeObj.view.customheadernew.btnLogout.setActive(true);
                }
            }
        },
        getCurrencyMasterData: function () {
            var list = [];
            for (var key in currency) {
                if (currency.hasOwnProperty(key)) {
                    list.push([key, currency[key]]);
                }
            }
            return list;
        },
        showInternalAccFlx: function () {
            this.view.flxAddBankAccount.setVisibility(true);
        },
        hideInternalAccFlx: function () {
            this.view.flxAddBankAccount.setVisibility(false);
        },
        showExternalAccFlx: function () {
            this.view.flxAddKonyAccount.setVisibility(true);
        },
        hideExternalAccFlx: function () {
            this.view.flxAddKonyAccount.setVisibility(false);
        },
        showInternationalAccFlx: function () {
            this.view.flxAddInternationalAccount.setVisibility(true);
        },
        hideInternationalAccFlx: function () {
            this.view.flxAddInternationalAccount.setVisibility(false);
        },
        showP2PAccFlx: function () {
            this.view.flxAddReciepient.setVisibility(true);
        },
        hideP2PAccFlx: function () {
            this.view.flxAddReciepient.setVisibility(false);
        },
        setupFormOnTouchEnd: function (width) {
            var self = this;
            if (width == 640) {
                this.view.onTouchEnd = function () { }
                this.nullifyPopupOnTouchStart();
            } else {
                if (width == 1024) {
                    this.view.onTouchEnd = function () { }
                    this.nullifyPopupOnTouchStart();
                } else {
                    this.view.onTouchEnd = function () {
                        self.hidePopups();
                    }
                }
                var userAgent = kony.os.deviceInfo().userAgent;
                if (userAgent.indexOf("iPad") != -1) {
                    this.view.onTouchEnd = function () { }
                    this.nullifyPopupOnTouchStart();
                } else if (userAgent.indexOf("Android") != -1 && userAgent.indexOf("Mobile") == -1) {
                    this.view.onTouchEnd = function () { }
                    this.nullifyPopupOnTouchStart();
                }
            }
        },
        nullifyPopupOnTouchStart: function () { },
        onBreakpointChange: function (form, width) {
            var scope = this;

            this.setupFormOnTouchEnd(width);
            this.view.customheadernew.onBreakpointChangeComponent();
            this.view.customfooternew.onBreakpointChangeComponent();
            this.view.CustomPopupCancel.onBreakpointChangeComponent(scope.view.CustomPopupCancel, width);
            this.view.deletePopup.onBreakpointChangeComponent(scope.view.deletePopup, width);
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            var scope = this;
            this.view.flxFooter.isVisible = true;
            this.view.flxTermsAndConditions.setVisibility(false);
            var views;
            if (width === 640) {
                var scopeObj = this;
                views = Object.keys(this.responsiveViews);
                views.forEach(function (e) {
                    scope.view[e].isVisible = scope.responsiveViews[e];
                });
                scopeObj.view.txtTransferTo.placeholder = kony.i18n.getLocalizedString("i18n.FastTransfers.SearchTransferToMobile");
                scopeObj.view.flxRightBar.setVisibility(false);
            } else {
                views = Object.keys(this.responsiveViews);
                views.forEach(function (e) {
                    scope.view[e].isVisible = scope.responsiveViews[e];
                });
                this.view.customheadernew.lblHeaderMobile.text = "";
                scope.view.txtTransferTo.placeholder = kony.i18n.getLocalizedString("i18n.FastTransfers.SearchByAccountNameNumberOrRecipientName");
                if (width === 1380) {
                    this.view.lblTransfers.skin = "sknSSP42424220Px";
                }
                scope.view.flxRightBar.setVisibility(true);
            }
        },
        initialLoadingDone: false,
        transfersViewModel: {
            transactionsData: [],
            first: 0,
            last: 10
        },
        setpayDue: function (account) {
            this.view.lblDueDate3.setVisibility(true);
            this.dueAmount = parseFloat(account[0].nextPaymentAmount ? account[0].nextPaymentAmount : "0") + parseFloat(account[0].paymentDue ? account[0].paymentDue : "0");
            globalacc.dueAmount = this.dueAmount;
            if (this.dueAmount === undefined || this.dueAmount === null || this.dueAmount === "" || this.dueAmount === "0") {
                payOther = 1;
            }
            this.dueTotalAmount = account[0].paymentDue;
            globalacc.dueTotalAmount = account[0].paymentDue;
            this.dueCurrentAmount = account[0].nextPaymentAmount ? account[0].nextPaymentAmount : "0";
            this.view.tbxAmount2.text = applicationManager.getFormatUtilManager().formatAmount(globalacc.dueAmount);
            this.view.lblDueAmount.text = "(" + kony.i18n.getLocalizedString("i18n.accountDetail.currentDue") + ": " + commonUtilities.formatCurrencyWithCommas(this.dueCurrentAmount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(account[0].currencyCode)) + ", " + kony.i18n.getLocalizedString("i18n.accountDetail.totalOverdue") + ": " + commonUtilities.formatCurrencyWithCommas(globalacc.dueTotalAmount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(account[0].currencyCode)) + ")";
            this.dueDate = account[0].nextPaymentDate;
            //globalacc.dueDate = presentationController.getFormattedDateString(this.dueDate);
            globalacc.currency = account[0].currencyCode;
            var presentationController = applicationManager.getModulesPresentationController({
                "moduleName": "LoanPayModule",
                "appName": "TransfersMA"
            });
            this.datedue = presentationController.getFormattedDateString(this.dueDate);
            globalacc.dueDate = this.datedue;
            if (this.dueDate === undefined || this.dueDate === null || this.dueDate === "") {
                globalacc.dueDate = "NA";
            }
            this.view.lblDueDate3.text = "(" + kony.i18n.getLocalizedString("i18n.billPay.DueDate") + ": " + globalacc.dueDate + ")";
            this.view.lblDueDate3.setVisibility(true);
            FormControllerUtility.hideProgressBar(this.view);
            if (this.view.tbxAmount2.text == "" || this.view.tbxAmount2.text == null || this.view.tbxAmount2.text == "0" || this.view.tbxAmount2.text == "0.00") {
                this.view.tbxAmount2.text = "0.00";
                FormControllerUtility.disableButton(this.view.btnPayAmount);
            } else {
                FormControllerUtility.enableButton(this.view.btnPayAmount);
            }
            this.view.CalendarSendDate.onSelection = this.validateDate;
            this.view.forceLayout();
            this.validateDate();
            globalacc.action = "payCompleteMonthlyDue";
        },
        getDateObject: function (dateString) {
            var index = -1;
            index = dateString.indexOf("T");
            if (index !== -1) {
                return applicationManager.getFormatUtilManager().getDateObjectfromString(dateString);
            } else {
                return applicationManager.getFormatUtilManager().getDateObjectFromCalendarString(dateString, applicationManager.getFormatUtilManager().getDateFormat().toUpperCase());
            }
        },
        validateDate: function () {
            var scopeObj = this;
            var presentationController = applicationManager.getModulesPresentationController({
                "moduleName": "LoanPayModule",
                "appName": "TransfersMA"
            });
            this.dueShownDate = presentationController.getFormattedDateString(globalacc.dueDate);
            this.selectedDate = this.view.CalendarSendDate.formattedDate;
            if (scopeObj.getDateObject(this.selectedDate).getTime() > scopeObj.getDateObject(this.dueShownDate).getTime()) {
                if (globalacc.dueAmount == 0.00) {
                    this.view.lblDueDate3.setVisibility(true);
                    this.view.flxInfoDueDate.setVisibility(false);
                    this.view.flxMakeTransferError.setVisibility(true);
                    this.view.rtxMakeTransferError.text = kony.i18n.getLocalizedString("i18n.payments.noPendingDuesErrorMessage");
                } else {
                    this.view.flxMakeTransferError.setVisibility(false);
                    this.view.lblInfoAmount.setVisibility(false);
                    this.view.lblDueAmount.isVisible = true;
                    this.view.lblDueDate3.setVisibility(false);
                    this.view.flxInfoDueDate.setVisibility(true);
                }
            } else {
                if (globalacc.dueAmount == 0.00) {
                    this.view.flxMakeTransferError.setVisibility(true);
                    this.view.rtxMakeTransferError.text = kony.i18n.getLocalizedString("i18n.payments.noPendingDuesErrorMessage");
                } else {
                    this.view.flxMakeTransferError.setVisibility(false);
                }
                this.view.lblDueDate3.setVisibility(true);
                this.view.flxInfoDueDate.setVisibility(false);
            }
            this.view.forceLayout();
        },
        /** Manages the upcomming flow
         * @param  {object} viewModel object consisting data based on which new flow has to drive
         */
        updateFormUI: function (viewModel) {
            if (viewModel.serverError) {
                this.showServerError(viewModel.serverError);
            } else {
                if (viewModel.data) {
                    this.finalLoan(viewModel.data, viewModel.referenceId);
                }
                if (viewModel.paydueDetails) {
                    this.setpayDue(viewModel.paydueDetails);
                }
                if (viewModel.transferOther) {
                    this.successOther(viewModel.transferOther.data, viewModel.transferOther.referenceId);
                }
                if (viewModel.transferDue) {
                    this.successDue(viewModel.transferDue.data, viewModel.transferDue.referenceId);
                }
                if (viewModel.isLoading === true) {
                    FormControllerUtility.showProgressBar(this.view);
                    this.view.flxLoadingContainerFrom.setVisibility(true);
                    this.view.flxLoadingContainerTo.setVisibility(true);
                } else if (viewModel.isLoading === false) {
                    FormControllerUtility.hideProgressBar(this.view);
                    this.view.flxLoadingContainerFrom.setVisibility(false);
                    this.view.flxLoadingContainerTo.setVisibility(false);
                }
                if (viewModel.limit) {
                    this.checkTransactionLimit(viewModel);
                }
                if (viewModel.gateway) {
                    this.initActionsFastTransfers();
                    kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule").presentationController.loadAccounts({}, null, null);
                }
                if (viewModel.resetAndShowProgressBar) {
                    this.initActionsFastTransfers();
                }
                if (viewModel.fromAccounts) {
                    this.filterAccounts(viewModel.fromAccounts);
                }
                if (viewModel.toAccounts) {
                    this.filterAccounts(viewModel.toAccounts);
                }
                if (viewModel.accountsValue) {
                    //this.view.flxLoadingContainerFrom.setVisibility(true);
                    //this.view.flxLoadingContainerTo.setVisibility(true);
                    this.filterAccounts(viewModel.accountsValue);
                }
                if (viewModel.modifyTransaction) {
                    if (viewModel.transferError && this.editTransferData !== undefined && Object.keys(this.editTransferData).length > 0) {
                        this.modifyFastTransfer(this.editTransferData);
                        this.editTransferData = {};
                    } else {
                        this.modifyFastTransfer(viewModel.modifyTransaction);
                    }
                }
                if (viewModel.repeatTransaction || viewModel.editTransaction) {
                    this.updateMakeTransferForm(viewModel);
                }
                if (viewModel.transferError) {
                    this.showTransferError(viewModel.transferError);
                }
            }
            if (viewModel.campaign) {
                CampaignUtility.showCampaign(viewModel.campaign, this.view, "flxMain");
            }
            this.view.forceLayout();
        },
        initActionsFastTransfers: function () {
            var scopeObj = this;
            this.view.onBreakpointChange = scopeObj.onBreakpointChange;
            this.view.lblWarning.setVisibility(false);
            this.view.txtTransferTo.text = "";
            this.view.txtTransferFrom.text = "";
            this.view.txtTransferTo.setVisibility(true);
            this.view.txtTransferFrom.setVisibility(true);
            this.view.lblToAmount.setVisibility(false);
            this.view.lblFromAmount.setVisibility(false);
            this.view.flxIcon.setVisibility(false);
            this.view.flxToIcon.setVisibility(false);
            this.view.lblSelectAccount.setVisibility(false);
            this.view.lblSelectAccountTo.setVisibility(false);
            this.view.flxCancelFilterTo.setVisibility(false);
            this.view.flxCancelFilterFrom.setVisibility(false);
            this.view.flxFromSegment.setVisibility(false);
            this.view.flxToSegment.setVisibility(false);
            this.view.txtEndingOn.setVisibility(false);
            this.view.flxCurrency.setVisibility(false);
            this.view.lbxCurrency.selectedKey = this.view.lbxCurrency.masterData[0][0];
            this.view.lblCurrencySymbol.text = this.view.lbxCurrency.selectedKeyValue[1][0];
            this.view.lblAmount.accessibilityConfig = {
                "a11yLabel": `${scopeObj.view.lblAmount.text} ${scopeObj.view.lblCurrencySymbol.text}`,
                "a11yARIA": {
                    "tabindex": -1,
                    "role": "span"
                }
            }
            this.toggleCreditCardFlexes(true);
            this.renderCalendarMakeTransfer();
            this.view.flxMakeTransferError.setVisibility(false);
            this.view.customheadernew.forceCloseHamburger();
            this.view.customheadernew.flxContextualMenu.setVisibility(false);
            this.view.customheadernew.flxTransfersAndPay.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
            this.view.customheadernew.imgLblTransfers.text = "O";
            this.restrictSpecialCharacters();
            scopeObj.view.txtTransferFrom.accessibilityConfig = {
                a11yARIA: {
                    "aria-autocomplete": "list",
                    "aria-expanded": false,
                    "role": "combobox",
                    "aria-labelledby": "lbTransferFrom",
                    "aria-required": true,
                    "aria-controls": "flxFromSegment",
                    "tabindex": 0
                }
            };
            scopeObj.view.flxFrom.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1
                }
            };
            scopeObj.view.txtTransferTo.accessibilityConfig = {
                a11yARIA: {
                    "aria-autocomplete": "list",
                    "aria-expanded": false,
                    "role": "combobox",
                    "aria-labelledby": "lbTransferTo",
                    "aria-required": true,
                    "aria-controls": "flxToSegment",
                    "tabindex": 0
                }
            };
            scopeObj.view.flxTo.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1
                }
            };
        },
        restrictSpecialCharacters: function () {
            var scopeObj = this;
            var specialCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\";
            var alphabetsSet = "abcdefghijklmnopqrstuvwxyz";
            scopeObj.view.tbxAmount.restrictCharactersSet = specialCharactersSet.replace(',.', '') + alphabetsSet + alphabetsSet.toUpperCase();
            scopeObj.view.tbxAmount2.restrictCharactersSet = specialCharactersSet.replace(',.', '') + alphabetsSet + alphabetsSet.toUpperCase();
        },
        hidePopups: function () {
            var scopeObj = this;
            var currFormObj = kony.application.getCurrentForm();
            if (currFormObj.customheadernew.flxUserActions.isVisible === true) {
                setTimeout(function () {
                    currFormObj.customheadernew.flxUserActions.setVisibility(false);
                }, "17ms")
            }
            if ((currFormObj.flxFromSegment.isVisible === true && fromSeg === true) || (currFormObj.flxToSegment.isVisible === true && toSeg === true)) {
                fromSeg = false;
                toSeg = false;
            } else if ((currFormObj.flxFromSegment.isVisible === true && fromSeg === false) || (currFormObj.flxToSegment.isVisible === true && toSeg === false)) {
                if (this.view.txtTransferFrom.text !== "" && currFormObj.flxFromSegment.isVisible === true) {
                    this.view.txtTransferFrom.text = "";
                    this.view.flxCancelFilterFrom.setVisibility(false);
                    //this.fetchFromAccountsBySearch();
                }
                setTimeout(function () {
                    if (!fromScroll) {
                        currFormObj.flxFromSegment.setVisibility(false);
                        fromSeg = true;
                        scopeObj.view.txtTransferFrom.accessibilityConfig = {
                            a11yARIA: {
                                "aria-autocomplete": "list",
                                "aria-expanded": false,
                                "role": "combobox",
                                "aria-labelledby": "lbTransferFrom",
                                "aria-required": true,
                                "aria-controls": "flxFromSegment",
                                "tabindex": 0
                            }
                        };
                    }
                    fromScroll = false;
                }, "17ms")
                if (this.view.txtTransferTo.text !== "" && currFormObj.flxToSegment.isVisible === true) {
                    this.view.txtTransferTo.text = "";
                    this.view.flxCancelFilterTo.setVisibility(false);
                    //this.fetchToAccountsBySearch();
                    //this.toggleCreditCardFlexes(true);
                }
                setTimeout(function () {
                    if (!toScroll) {
                        currFormObj.flxToSegment.setVisibility(false);
                        toSeg = true;
                        scopeObj.view.txtTransferTo.accessibilityConfig = {
                            a11yARIA: {
                                "aria-autocomplete": "list",
                                "aria-expanded": false,
                                "role": "combobox",
                                "aria-labelledby": "lbTransferTo",
                                "aria-required": true,
                                "aria-controls": "flxToSegment",
                                "tabindex": 0
                            }
                        };
                    }
                    toScroll = false;
                }, "17ms")
            } else if ((currFormObj.flxFromSegment.isVisible === false && fromSeg === false) || (currFormObj.flxToSegment.isVisible === false && toSeg === false)) {
                fromSeg = true;
                toSeg = true;
            }
            if (currFormObj.customheadernew.flxContextualMenu.isVisible === true) {
                setTimeout(function () {
                    currFormObj.customheadernew.flxContextualMenu.setVisibility(false);
                    currFormObj.customheadernew.flxTransfersAndPay.skin = ViewConstants.SKINS.BLANK_SKIN_TOPMENU;
                    currFormObj.customheadernew.imgLblTransfers.text = "O";
                }, "17ms")
            }
        },
        showTransferError: function (errorMsg) {
            this.view.flxMakeTransferError.setVisibility(true);
            this.view.rtxMakeTransferError.text = errorMsg;
        },
        renderCalendarMakeTransfer: function () {
            var context1 = {
                "widget": this.view.flxCalSendOn,
                "anchor": "bottom"
            };
            this.view.calSendOnNew.setContext(context1);
            var context2 = {
                "widget": this.view.flxCalEndingOn,
                "anchor": "bottom"
            };
            this.view.calEndingOnNew.setContext(context2);
        },
        // Workaround for Responsive issue.
        modifyFastTransfer: function (modifyTransaction) {
            var self = this;
            this.hideAll();
            this.showMainFastTransferWindow();
            this.showMakeTransfer();
            this.view.txtNotes.text = modifyTransaction.notes;
            this.view.tbxAmount.text = modifyTransaction.amount;
            var fromData = this.view.segTransferFrom.data;
            if (!modifyTransaction.accountFromKey) modifyTransaction.accountFromKey = modifyTransaction.accountFrom ? modifyTransaction.accountFrom.accountID : modifyTransaction.fromAccountNumber;
            if (!modifyTransaction.accountToKey) modifyTransaction.accountToKey = modifyTransaction.transactionType === 'InternalTransfer' ? modifyTransaction.toAccountNumber : (modifyTransaction.transactionType === 'P2P' ? modifyTransaction.personId : (modifyTransaction.ExternalAccountNumber || modifyTransaction.toAccountNumber));
            var fromStatus = false;
            for (i = 0; i < fromData.length; i++) {
                for (j = 0; j < fromData[i][1].length; j++) {
                    if (modifyTransaction.accountFromKey === fromData[i][1][j].accountID) {
                        self.view.segTransferFrom.selectedRowIndex = [i, j];
                        this.segFromAccountRowClick(toAccounts);
                        fromStatus = true;
                        break;
                    }
                }
                if (fromStatus) {
                    break;
                }
            }
            var toData = this.view.segTransferTo.data;
            var toStatus = false;
            for (i = 0; i < toData.length; i++) {
                for (j = 0; j < toData[i][1].length; j++) {
                    if ((modifyTransaction.accountToKey === toData[i][1][j].accountID) && (modifyTransaction.Id === toData[i][1][j].Id)) {
                        self.view.segTransferTo.selectedRowIndex = [i, j];
                        this.onToAccountChange(modifyTransaction);
                        toStatus = true;
                        break;
                    }
                }
                if (toStatus) {
                    break;
                }
            }
            this.view.calSendOnNew.dateComponents = modifyTransaction.sendOnDateComponents;
            this.view.calEndingOnNew.dateComponents = modifyTransaction.endOnDateComponents;
            this.getFrequencyAndFastTransferFormLayout(modifyTransaction.frequencyKey, modifyTransaction.howLongKey);
            if (modifyTransaction.howLongKey === OLBConstants.NO_OF_RECURRENCES) {
                this.view.tbxNoOfRecurrences.text = modifyTransaction.noOfRecurrences;
            }
            if (modifyTransaction.accountTo.isInternationalAccount === "true") {
                this.view.lbxCurrency.selectedKey = modifyTransaction.currency;
                this.showCurrency();
            } else {
                this.hideCurrency();
            }
            this.checkValidityMakeFastTransferForm();
        },
        /**Get Front End Date String
         * @param  {string} dateStr Date String from backend
         */
        getDateFromDateStr: function (dateStr) {
            if (dateStr) {
                return commonUtilities.getFrontendDateString(dateStr);
            } else {
                return "";
            }
        },
        addP2PAccount: function () {
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule").presentationController.showTransferScreen({
                initialView: "addRecipient"
            });
        },
        addInternalAccount: function () {
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule").presentationController.showTransferScreen({
                initialView: "addDBXAccount"
            });
        },
        addExternalAccount: function () {
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule").presentationController.showTransferScreen({
                initialView: "addExternalAccount"
            });
        },
        addInternationalAccount: function () {
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule").presentationController.showTransferScreen({
                initialView: "addInternationalAccount"
            });
        },
        /**onToAccountChange : methord to change cridit card actions.
         * @param  {object} editTransaction Details of the Transaction
         */
        onToAccountChange: function (editTransaction) {
            var scopeObj = this;
            var configurationManager = applicationManager.getConfigurationManager();
            var selectedCard = editTransaction.accountTo ? editTransaction.accountTo : this.view.segTransferTo.selectedRowItems[0];
            var orientationHandler = new OrientationHandler();
            var isMobileDevice = ((kony.application.getCurrentBreakpoint() === 640) || orientationHandler.isMobile);
            this.view.txtTransferTo.setVisibility(false);
            this.view.flxCancelFilterTo.setVisibility(false);
            this.view.flxToSegment.setVisibility(false);
            if (editTransaction.accountTo) {
                var name = (selectedCard.accountID || selectedCard.Account_id) ? (isMobileDevice ? commonUtilities.truncateStringWithGivenLength(selectedCard.accountName + "....", 26) + commonUtilities.getLastFourDigit(selectedCard.accountID) : commonUtilities.getAccountDisplayName(selectedCard)) : ((selectedCard.payPersonId || selectedCard.PayPersonId) ? selectedCard.nickName : selectedCard.nickName + " ...." + commonUtilities.getLastFourDigit(selectedCard.accountNumber))
                this.view.txtTransferTo.text = name;
                this.view.lblSelectAccountTo.text = name;
                this.view.lblToAmount.text = selectedCard.bankName;
            } else {
                this.view.txtTransferTo.text = this.view.segTransferTo.selectedRowItems[0].lblAccountName;
                this.view.lblSelectAccountTo.text = this.view.segTransferTo.selectedRowItems[0].lblAccountName;
                this.view.lblToAmount.text = this.view.segTransferTo.selectedRowItems[0].lblAmount;
            }
            if (!this.isSingleCustomerProfile) {
                this.view.flxToIcon.isVisible = this.profileAccess === "both" ? true : false;
                if (kony.sdk.isNullOrUndefined(selectedCard.imgIcon)) {
                    if (selectedCard.isBusinessAccount === "true" || selectedCard.isBusinessPayee === "1") {
                        this.view.imgToIcon.text = "r";
                    } else {
                        this.view.imgToIcon.text = "s";
                    }
                } else {
                    this.view.imgToIcon.text = selectedCard.imgIcon.text;
                }
                //this.view.imgToIcon.text = selectedCard.imgIcon ? selectedCard.imgIcon :(selectedCard.isBusinessAccount ==="true"|| selectedCard.isBusinessPayee==="1" ? "r" :"s");
                this.view.lblSelectAccountTo.left = "35dp";
            } else {
                this.view.flxToIcon.setVisibility(false);
            }
            this.view.lblSelectAccountTo.setVisibility(true);
            this.view.lblToAmount.setVisibility(true);
            if (selectedCard.lblAccType == "Loan") {
                this.view.flxContainer3.setVisibility(false);
                this.view.flxContainer4.setVisibility(false);
                this.view.CopyflxContainer0be7f6bcaada644.setVisibility(false);
                this.view.flxContainer5.setVisibility(false);
                this.view.flxContainer6.setVisibility(false);
                this.view.flxTransferSubmit.setVisibility(false);
                this.view.flxLoanpayDue.setVisibility(true);
                globalacc.toaccId = selectedCard.accountID;
                for (i = 0; i < toAccounts.length; i++) {
                    if (globalacc.toaccId == toAccounts[i].Account_id) {
                        globalacc.nextDueAmount = parseFloat(toAccounts[i].nextPaymentAmount ? toAccounts[i].nextPaymentAmount : "0.00") + parseFloat(toAccounts[i].paymentDue ? toAccounts[i].paymentDue : "0.00");
                        globalacc.nextdue = toAccounts[i].nextPaymentAmount;
                        globalacc.nextduedate = toAccounts[i].nextPaymentDate;
                        globalacc.totaldue = toAccounts[i].paymentDue;
                        globalacc.toCurrency = toAccounts[i].currencyCode;
                    }
                }
                this.view.imgRadioPayDueAmount.src = ViewConstants.IMAGES.RADIO_BUTTON_ACTIVE;
                this.view.imgRadioPayOtherAmount.src = ViewConstants.IMAGES.RADIO_BTN_INACTIVE;
                this.view.tbxAmount2.setEnabled(false);
                this.view.imgRadioPayOtherAmount.setEnabled(true);
                if (globalacc.nextdue == null || globalacc.nextdue == undefined) globalacc.nextdue = "0.00";
                this.view.tbxAmount2.text = String(globalacc.nextDueAmount);
                this.view.lblDueAmount.text = ("(" + kony.i18n.getLocalizedString("i18n.accountDetail.currentDue") + ": " + this.view.lblDollar.text + globalacc.nextdue + ", " + kony.i18n.getLocalizedString("i18n.accountDetail.totalOverdue") + ": " + this.view.lblDollar.text + globalacc.totaldue + ")");
                this.view.lblDueDate3.text = ("(" + kony.i18n.getLocalizedString("i18n.transfers.lblDate") + globalacc.nextduedate + ")");
                if (this.view.tbxAmount2.text == "" || this.view.tbxAmount2.text == null || this.view.tbxAmount2.text == "0" || this.view.tbxAmount2.text == "0.00") {
                    this.view.tbxAmount2.text = "0.00";
                    FormControllerUtility.disableButton(this.view.btnPayAmount);
                }
                this.view.CalendarSendDate.dateComponents = commonUtilities.getServerDateComponent();
                FormControllerUtility.showProgressBar(this.view);
                this.view.lblDueAmount.setVisibility(false);
                this.view.lblDueDate3.setVisibility(false);
                var data = {
                    "accountID": globalacc.toaccId
                }
                var presentationController = applicationManager.getModulesPresentationController({
                    "moduleName": "TransferFastUIModule",
                    "appName": "TransfersMA"
                });
                presentationController.payDueDetails(data);
            } else {
                this.view.flxContainer3.setVisibility(true);
                this.view.flxContainer4.setVisibility(true);
                this.view.CopyflxContainer0be7f6bcaada644.setVisibility(true);
                this.view.flxContainer5.setVisibility(true);
                this.view.flxContainer6.setVisibility(true);
                this.view.flxTransferSubmit.setVisibility(true);
                this.view.flxLoanpayDue.setVisibility(false);
                if (selectedCard.CreditCard || selectedCard.accountType === "CreditCard") {
                    this.isCreditCardSelected = true;
                    //this.view.transfermain.flxSearchSortSeparator.setVisibility(false);
                    if (!selectedCard.CreditCard) {
                        selectedCard.CreditCard = {
                            dueDate: selectedCard.dueDate,
                            currentBalance: selectedCard.currentBalance,
                            currencyCode: selectedCard.currencyCode,
                            lastStatementBalance: selectedCard.lastStatementBalance,
                            minimumDue: selectedCard.minimumDue
                        };
                    }
                    this.view.lblDueDate.text = "(" + (selectedCard.CreditCard.dueDate ? (kony.i18n.getLocalizedString("i18n.billPay.DueDate") + ": ") : "") + this.getDateFromDateStr(selectedCard.CreditCard.dueDate) + ")";
                    this.view.lblCurrentBalanceValue.text = commonUtilities.formatCurrencyWithCommas(selectedCard.CreditCard.currentBalance, false, selectedCard.CreditCard.currencyCode);
                    this.view.lblStatementBalanceValue.text = commonUtilities.formatCurrencyWithCommas(selectedCard.CreditCard.lastStatementBalance, false, selectedCard.CreditCard.currencyCode);
                    this.view.lblMinimumDueBalanceValue.text = commonUtilities.formatCurrencyWithCommas(selectedCard.CreditCard.minimumDue, false, selectedCard.CreditCard.currencyCode);
                    this.view.lbxFrequency.selectedKey = kony.i18n.getLocalizedString("i18n.transfers.frequency.once");
                    if (editTransaction && editTransaction.amount && editTransaction.radioButtonSelected) {
                        if (editTransaction.radioButtonSelected !== this.view.lblRadioBtn4) {
                            this.view.tbxAmountValue.text = "";
                            this.onClickRadioButton(editTransaction.radioButtonSelected);
                        } else {
                            this.view.tbxAmountValue.text = editTransaction.amount + "";
                            this.onClickRadioButton(editTransaction.radioButtonSelected);
                        }
                    } else {
                        this.view.tbxAmountValue.text = "";
                        this.onClickRadioButton(this.view.flxNUORadioBtn1);
                    }
                    this.onAmountChanged(this.view.tbxAmountValue);
                    this.view.flxCalEndingOn.setVisibility(false);
                    this.toggleCreditCardFlexes(false);
                    this.view.flxNUORadioBtn1.accessibilityConfig = {
                        "a11yARIA": {
                            "aria-checked": "true",
                            "role": "radio",
                            "tabindex": 0
                        },
                        "a11yLabel": `${scopeObj.view.lblCurrentBalance.text} Amount ${scopeObj.view.lblCurrentBalanceValue.text}`
                    };
                    this.view.flxNUORadioBtn2.accessibilityConfig = {
                        "a11yARIA": {
                            "aria-checked": "false",
                            "role": "radio",
                            "tabindex": 0
                        },
                        "a11yLabel": `${scopeObj.view.lblStatementBalance.text} Amount ${scopeObj.view.lblStatementBalanceValue.text}`
                    };
                    this.view.flxNUORadioBtn3.accessibilityConfig = {
                        "a11yARIA": {
                            "aria-checked": "false",
                            "role": "radio",
                            "tabindex": 0
                        },
                        "a11yLabel": `${scopeObj.view.lblMinimumDueBalance.text} Amount ${scopeObj.view.lblMinimumDueBalanceValue.text}`
                    };
                    this.view.flxNUORadioBtn4.accessibilityConfig = {
                        "a11yARIA": {
                            "aria-checked": "false",
                            "role": "radio",
                            "tabindex": 0
                        },
                        "a11yLabel": `${scopeObj.view.lblMinimumDueBalance.text}`
                    };
                } else {
                    this.isCreditCardSelected = false;
                    this.toggleCreditCardFlexes(true);
                    this.onFrequencyChanged();
                    this.onAmountChanged(this.view.tbxAmount);
                }
            }
            if (selectedCard.isInternationalAccount === "true") {
                this.showCurrency();
            } else {
                this.hideCurrency();
            }
            this.view.forceLayout();
            scopeObj.view.flxTo.accessibilityConfig = {
                a11yLabel: scopeObj.view.lblToAmount.isVisible ?
                    `Transfer To. Currently selected ${scopeObj.view.lblSelectAccountTo.text} of bank ${scopeObj.view.lblToAmount.text}. Click to select another account` :
                    `Transfer To. Currently selected ${scopeObj.view.lblSelectAccountTo.text}`,
                a11yARIA: {
                    "tabindex": 0,
                    "role": "button"
                }
            };
            scopeObj.view.flxTo.setActive(true);
        },
        showCurrency: function () {
            var scopeObj = this;
            this.view.flxCurrency.setVisibility(true);
            this.initializeResponsiveViews();
            this.view.lblCurrencySymbol.text = this.view.lbxCurrency.selectedKeyValue[1][0];
            this.view.lblAmount.accessibilityConfig = {
                "a11yLabel": `${scopeObj.view.lblAmount.text} ${scopeObj.view.lblCurrencySymbol.text}`,
                "a11yARIA": {
                    "tabindex": -1,
                    "role": "span"
                }
            }
        },
        hideCurrency: function () {
            var scopeObj = this;
            this.view.flxCurrency.setVisibility(false);
            this.initializeResponsiveViews();
            var selectedAccount = this.view.segTransferFrom.selectedRowItems[0];
            if (selectedAccount) {
                this.view.lblCurrencySymbol.text = applicationManager.getFormatUtilManager().getCurrencySymbol(selectedAccount.currencyCode);
            } else {
                this.view.lblCurrencySymbol.text = applicationManager.getFormatUtilManager().getCurrencySymbol(this.getCurrencyMasterData()[0][0]);
            }
            this.view.lblAmount.accessibilityConfig = {
                "a11yLabel": `${scopeObj.view.lblAmount.text} ${scopeObj.view.lblCurrencySymbol.text}`,
                "a11yARIA": {
                    "tabindex": -1,
                    "role": "span"
                }
        }
        },
        /**Show main transfer window - contains tabs etc
         */
        showMainFastTransferWindow: function () {
            this.view.flxTrasfersWindow.setVisibility(true);
            this.view.flxNoAccounts.setVisibility(false);
        },
        /** Manages the search in From Accounts
         * @param  {String} data search string in case of pre-selected accounts
         */
        fetchFromAccountsBySearch: function (context, data) {
            var scopeObj = this;
            if (this.view.txtTransferFrom.text === "") {
                this.view.flxCancelFilterFrom.setVisibility(false);
            } else {
                this.view.flxCancelFilterFrom.setVisibility(true);
            }
            var searchString = this.view.txtTransferFrom.text;
            if (data) {
                searchString = data;
            }
            if (this.view.segTransferTo.selectedRowItems.length > 0 && this.view.segTransferTo.selectedRowItems[0] !== undefined) {
                var accountId = this.view.segTransferTo.selectedRowItems[0].accountID;
            }
            var presentationController = applicationManager.getModulesPresentationController({
                "moduleName": "TransferFastUIModule",
                "appName": "TransfersMA"
            });
            presentationController.searchAccounts(searchString, "from", accountId);
            this.view.flxFromSegment.setVisibility(true);
            scopeObj.view.flxFrom.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1
                }
            };
        },
        /** Manages the search in To Accounts
         * @param  {String} data search string in case of pre-selected accounts
         */
        fetchToAccountsBySearch: function (context, data) {
            var scopeObj = this;
            if (this.view.txtTransferTo.text === "") {
                this.view.flxCancelFilterTo.setVisibility(false);
            } else {
                this.view.flxCancelFilterTo.setVisibility(true);
            }
            var searchString = this.view.txtTransferTo.text;
            if (data) {
                searchString = data;
            }
            if (this.view.segTransferFrom.selectedRowItems.length > 0 && this.view.segTransferFrom.selectedRowItems[0] !== undefined) {
                var accountId = this.view.segTransferFrom.selectedRowItems[0].accountID;
            }
            var presentationController = applicationManager.getModulesPresentationController({
                "moduleName": "TransferFastUIModule",
                "appName": "TransfersMA"
            });
            presentationController.searchAccounts(searchString, "to", accountId);
            this.view.flxToSegment.setVisibility(true);
            scopeObj.view.flxTo.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1
                }
            };
        },
        /**Resets the Transfer Form
         */
        resetFastTransfersForm: function () {
            //this.view.lblWarning.setVisibility(false);
            //this.view.flxWarning.setVisibility(false);
            //this.view.segTransferTo.removeAll();
            //this.view.segTransferFrom.removeAll();
            this.view.lbxFrequency.masterData = this.getFrequencies();
            this.view.lbxFrequency.selectedKey = this.view.lbxFrequency.masterData[0][0];
            this.view.calSendOnNew.dateComponents = commonUtilities.getServerDateComponent();
            this.view.calSendOnNew.validStartDate = commonUtilities.getServerDateComponent();
            this.view.calEndingOnNew.dateComponents = commonUtilities.getServerDateComponent();
            this.view.calEndingOnNew.validStartDate = commonUtilities.getServerDateComponent();
            this.view.lbxForHowLong.masterData = this.getForHowLong();
            this.view.lbxForHowLong.selectedKey = this.view.lbxForHowLong.masterData[0][0];
            this.view.tbxNoOfRecurrences.text = "";
            this.view.txtNotes.text = "";
            this.view.tbxAmount.text = "";
            this.onAmountChanged(this.view.tbxAmount);
            this.checkValidityMakeFastTransferForm();
            this.onFrequencyChanged();
        },
        /** sets the Frequency with i18 value
         */
        getFrequencies: function () {
            var list = [];
            for (var key in frequencies) {
                if (frequencies.hasOwnProperty(key)) {
                    list.push([key, kony.i18n.getLocalizedString(frequencies[key])]);
                }
            }
            return list;
        },
        /** sets the duration of the transaction with i18 value
         */
        getForHowLong: function () {
            var list = []
            for (var key in forHowLong) {
                if (forHowLong.hasOwnProperty(key)) {
                    list.push([key, kony.i18n.getLocalizedString(forHowLong[key])]);
                }
            }
            return list;
        },
        /** filters the data from the backend response
         * @param {object} viewModel data comming from backend
         */
        filterAccounts: function (viewModel) {
            var makeTransfer = {
                fromAccounts: viewModel.fromAccounts,
                toAccounts: viewModel.toAccounts,
                isSearch: viewModel.isSearch,
                p2pEnabled: viewModel.p2pEnabled,
                p2pSuccess: viewModel.p2pSuccess,
                accountFrom: viewModel.accountFrom,
                accountTo: viewModel.accountTo
            };
            this.updateMakeTransferForm(makeTransfer);
        },
        /** Creates the segment data along with Section Headers
         * @param  {object} accounts list of accounts
         * @param  {string} type specifies either from or to accounts
         * @param  {boolean} p2pEnabledStatus specifies whether p2p is enabled or not
         * @param  {boolean} p2pServiceStatus specifies whether the p2p service has failed or not
         * @param  {integer} accountId account id of the previously selected account
         */
        getDataWithSections: function (accounts, type, p2pEnabledStatus, p2pServiceStatus, accountId) {
            var scopeObj = this;
            var finalData = {};
            var prioritizeAccountTypes = applicationManager.getTypeManager().getAccountTypesByPriority();
            if (!prioritizeAccountTypes.includes("Recipients")) {
                prioritizeAccountTypes.push("Recipients");
            }
            accounts.forEach(function (account) {
                var accountType = "Recipients";
                if (account.accountType) {
                    accountType = applicationManager.getTypeManager().getAccountType(account.accountType);
                }
                if (finalData.hasOwnProperty(accountType)) {
                    if (finalData[accountType][1][finalData[accountType][1].length - 1].length === 0) {
                        finalData[accountType][1].pop();
                    }
                    finalData[accountType][1].push(scopeObj.createSegmentData(account, type, accountId));
                } else {
                    finalData[accountType] = [{
                        lblTransactionHeader: accountType, //(accountType !== "External") ? ("My " + (applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) != undefined ? applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) : accountType)) : ((applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) != undefined ? applicationManager.getTypeManager().getAccountTypeDisplayValue(accountType) : accountType)),
                        template: "flxTransfersFromHeader"
                    },
                    [scopeObj.createSegmentData(account, type, accountId)]
                    ];
                }
            });
            if (applicationManager.getConfigurationManager().checkUserFeature("P2P")) {
                if (p2pEnabledStatus === false && type === "to") {
                    finalData["Recipients"] = [{
                        lblContent: kony.i18n.getLocalizedString("i18n.FastTransfers.ActivatePersonToPersonLabel"),
                        lblActivePayAPerson: kony.i18n.getLocalizedString("i18n.FastTransfers.ActivatePayAPersonButton"),
                        template: "flxFastTransfersActivate"
                    },
                    []
                    ];
                } else if (p2pServiceStatus === false && type === "to") {
                    finalData["Recipients"] = [{
                        lblContent: kony.i18n.getLocalizedString("i18n.FastTransfers.PayAPersonFailure"),
                        template: "flxFastTransfersActivate"
                    },
                    []
                    ];
                }
            }
            var data = [];
            for (var key in prioritizeAccountTypes) {
                var accountType = prioritizeAccountTypes[key];
                if (finalData.hasOwnProperty(accountType)) {
                    //New if else for Credit Card Scenario with plural and singular handling
                    if (finalData[accountType][0].lblTransactionHeader) {
                        finalData[accountType][0].lblTransactionHeader = finalData[accountType][0].lblTransactionHeader + "(" + finalData[accountType][1].length + ")"
                    }
                    if (finalData[accountType][1].length === 1) {
                        if (finalData[accountType][0].lblTransactionHeader && finalData[accountType][0].lblTransactionHeader !== "External") {
                            finalData[accountType][0].lblTransactionHeader = finalData[accountType][0].lblTransactionHeader.slice(0, -3);
                        }
                    }
                    data.push(finalData[accountType]);
                }
            }
            for (i = 0; i < data.length; i++) {
                for (j = 0; j < data[i][1].length; j++) {
                    if (j === data[i][1].length - 1) data[i][1][j].lblSeparator.isVisible = false;
                }
            }
            return data;
        },
        /* Creates segments data along with headers for combined access
         */
        getCombinedDataWithSections: function (accounts, type, p2pEnabledStatus, p2pServiceStatus, accountId) {
            var scopeObj = this;
            var finalData = {};
            if (type === "from") {
                var prioritizeAccountTypes = ["Personal Accounts"]
            } else {
                var prioritizeAccountTypes = ["My Personal Accounts"]
            };
            accounts.forEach(function (account) {
                var accountType = "";
                if (type === "from") {
                    accountType = "Personal Accounts";
                    if (account.isBusinessAccount === "false") {
                        //                     if(!kony.sdk.isNullOrUndefined(primaryCustomerId)){
                        if (scopeObj.primaryCustomerId.id === account.Membership_id && scopeObj.primaryCustomerId.type === 'personal') {
                            accountType = "Personal Accounts";
                            accountTypeIcon = "s";
                        }
                        //                      }
                        else {
                            accountType = account.Membership_id;
                            accountTypeIcon = "s";
                        }
                    } else {
                        accountType = account.Membership_id;
                        accountTypeIcon = "r";
                    }
                } else if (type === "to") {
                    if ((account.isBusinessAccount === "false") || (account.isBusinessPayee === "0") && account.accountID) accountType = "My Personal Accounts";
                    else if ((account.isBusinessAccount === "true") || (account.isBusinessPayee === "1") && account.accountID) accountType = !kony.sdk.isNullOrUndefined(account.MembershipName) ? account.MembershipName : "Business Accounts";
                    else if (account.isBusinessAccount === "false" || account.isBusinessPayee === "0") accountType = "Personal Recipients";
                    else if (account.isBusinessAccount === "true" || account.isBusinessPayee === "1") accountType = "Business Recipients";
                    else if (!kony.sdk.isNullOrUndefined(account.isSameBankAccount)) accountType = "External";
                    else if (account.PayPersonId) {
                        account.accountType = "PayAPerson";
                        accountType = "PayAPerson";
                    }
                }
                if (finalData.hasOwnProperty(accountType)) {
                    if (!kony.sdk.isNullOrUndefined(finalData[accountType][0]["membershipId"])) {
                        if (account.Membership_id === finalData[accountType][0]["membershipId"]) {
                            if (finalData[accountType][1][finalData[accountType][1].length - 1].length === 0) {
                                finalData[accountType][1].pop();
                            }
                            finalData[accountType][1].push(scopeObj.createSegmentData(account, type, accountId, true));
                        }
                    } else if (account.cif) {
                        finalData[accountType][1].push(scopeObj.createSegmentData(account, type, accountId, true));
                    }
                } else {
                    //if (account.isBusinessAccount === "true") prioritizeAccountTypes.push(accountType);
                    if (accountType !== "Personal Accounts" && accountType !== "My Personal Accounts") prioritizeAccountTypes.push(accountType);
                    finalData[accountType] = [{
                        lblTransactionHeader: accountType === "Personal Accounts" || accountType === "My Personal Accounts" || account.accountType === "External" || account.accountType === "PayAPerson" ? accountType : account.MembershipName,
                        imgDropDown: "P",
                        flxDropDown: {
                            "onClick": function (context) {
                                if (type === "from") scopeObj.view.flxFromSegment.setVisibility(true);
                                else scopeObj.view.flxToSegment.setVisibility(true);
                                scopeObj.showOrHideAccountRows(context, type)
                            },
                            "isVisible": false
                        },
                        lblSeparator: {
                            "isVisible": true
                        },
                        lblTopSeparator: {
                            "isVisible": true
                        },
                        template: "flxTransfersFromListHeader",
                        membershipId: account.Membership_id
                    },
                    [scopeObj.createSegmentData(account, type, accountId, true)]
                    ];
                }
            });
            if (applicationManager.getConfigurationManager().checkUserFeature("P2P")) {
                if (p2pEnabledStatus === false && type === "to") {
                    finalData["PayAPerson"] = [{
                        lblContent: kony.i18n.getLocalizedString("i18n.FastTransfers.ActivatePersonToPersonLabel"),
                        lblActivePayAPerson: kony.i18n.getLocalizedString("i18n.FastTransfers.ActivatePayAPersonButton"),
                        template: "flxFastTransfersActivate"
                    },
                    []
                    ];
                } else if (p2pServiceStatus === false && type === "to") {
                    finalData["PayAPerson"] = [{
                        lblContent: kony.i18n.getLocalizedString("i18n.FastTransfers.PayAPersonFailure"),
                        template: "flxFastTransfersActivate"
                    },
                    []
                    ];
                }
            }
            var data = [];
            if (type === "to") {
                prioritizeAccountTypes.push("Personal Recipients", "Business Recipients");
            }
            for (var key in prioritizeAccountTypes) {
                var accountType = prioritizeAccountTypes[key];
                if (finalData.hasOwnProperty(accountType)) {
                    data.push(finalData[accountType]);
                }
            }
            for (i = 0; i < data.length; i++) {
                for (j = 0; j < data[i][1].length; j++) {
                    if (j === data[i][1].length - 1) data[i][1][j].lblSeparator.isVisible = false;
                }
            }
            return data;
        },
        /*shows or hides the rows in the from and to dropdown*/
        showOrHideAccountRows: function (context, type) {
            var section = context.rowContext.sectionIndex;
            if (type === "from") var segData = this.view.segTransferFrom.data;
            else var segData = this.view.segTransferTo.data;
            var isRowVisible = true;
            if (segData[section][0].imgDropDown.text === "O") {
                segData[section][0]["imgDropDown"] = {
                    text: "P"
                };
                isRowVisible = true;
            } else {
                segData[section][0]["imgDropDown"] = {
                    text: "O"
                };
                isRowVisible = false;
            }
            for (var i = 0; i < segData[section][1].length; i++) {
                var flxAccountListItem = JSON.parse(JSON.stringify(segData[section][1][i].flxAccountListItem));
                flxAccountListItem["isVisible"] = isRowVisible;
                this.updateKeyAt("flxAccountListItem", flxAccountListItem, i, section, type);
            }
            if (type === "from") {
                segData = this.view.segTransferFrom.data;
                this.view.segTransferFrom.setSectionAt(segData[section], section);
            } else if (type === "to") {
                segData = this.view.segTransferTo.data;
                this.view.segTransferTo.setSectionAt(segData[section], section);
            }
        },
        updateKeyAt: function (widgetName, value, row, section, type) {
            if (type === "from") var data = this.view.segTransferFrom.data;
            else if (type === "to") var data = this.view.segTransferTo.data;
            var rowDataTobeUpdated = data[section][1][row];
            rowDataTobeUpdated[widgetName] = value;
            if (type === "from") this.view.segTransferFrom.setDataAt(rowDataTobeUpdated, row, section);
            else this.view.segTransferTo.setDataAt(rowDataTobeUpdated, row, section);
        },
        /** Creates the segment data along with Section Headers
         * @param  {object} account account
         * @param  {string} type specifies either from or to accounts
         * @param  {integer} accountId account id of the previously selected account
         */
        createSegmentData: function (account, type, accountId, visible) {
            var orientationHandler = new OrientationHandler();
            var isMobileDevice = ((kony.application.getCurrentBreakpoint() === 640) || orientationHandler.isMobile);
            var icon = (!kony.sdk.isNullOrUndefined(this.getBankIcon(account.bankName))) ? this.getBankIcon(account.bankName) : "null";
            if (type === "to") {
                var dataObject = {
                    "lblAccountName": (account.accountID || account.Account_id) ? (isMobileDevice ? commonUtilities.truncateStringWithGivenLength(account.accountName + "....", 26) + commonUtilities.getLastFourDigit(account.accountID) : commonUtilities.getAccountDisplayName(account)) : ((account.payPersonId || account.PayPersonId) ? account.nickName : account.nickName ? (account.nickName + " ...." + commonUtilities.getLastFourDigit(account.accountNumber)) : (account.beneficiaryName + " ...." + commonUtilities.getLastFourDigit(account.accountNumber))),
                    "lblAmount": (account.bankName || account.phone || account.email || ""),
                    "accountID": account.Account_id || account.accountID || account.accountNumber || account.payPersonId || account.PayPersonId,
                    "currencyCode": account.currencyCode,
                    "Membership_id": account.Membership_id || account.coreCustomerId,
                    "lblCurrencySymbol": "",
                    "Id": account.Id,
                    "isInternationalAccount": account.isInternationalAccount,
                    "imgIcon": {
                        "text": (account.isBusinessAccount === "true") || (account.isBusinessPayee === "1") ? "r" : "s",
                        //"isVisible" : applicationManager.getConfigurationManager().isCombinedUser === "true" ? true : false
                        "isVisible": this.profileAccess === "both" && account.accountType !== "External" && account.accountType !== "PayAPerson" ? true : false
                    },
                    "lblAccType": {
                        "text": account.accountType,
                        "left": this.profileAccess === "both" ? "7px" : "20px",
                    },
                    "imgBankIcon": {
                        "src": icon
                    },
                    "flxBankIcon": {
                        "isVisible": account.isSameBankAccount === "false" && !kony.sdk.isNullOrUndefined(icon) ? true : false
                    },
                    "flxAccountListItem": {
                        "isVisible": true
                    },
                    "lblSeparator": {
                        "isVisible": visible
                    },
                    "flxTransfersFrom": {
                        "onKeyPress": this.onSegToKeyPressCallBack,
                        "accessibilityConfig": {
                            "a11yLabel": "Account name" + ((account.accountID || account.Account_id) ? (isMobileDevice ? commonUtilities.truncateStringWithGivenLength(account.accountName + "....", 26) + commonUtilities.getLastFourDigit(account.accountID) : commonUtilities.getAccountDisplayName(account)) : ((account.payPersonId || account.PayPersonId) ? account.nickName : account.nickName ? (account.nickName + " ...." + commonUtilities.getLastFourDigit(account.accountNumber)) : (account.beneficiaryName + " ...." + commonUtilities.getLastFourDigit(account.accountNumber)))) +
                                ((account.bankName || account.phone || account.email || "") ? (`, Bank name ${account.bankName || account.phone || account.email}`) : ""),
                            "a11yARIA": {
                                "tabindex": 0,
                                "role": "button"
                            }
                        }
                    },
                    "flxFromAccountsList": {
                        "onKeyPress": this.onSegToKeyPressCallBack,
                        "accessibilityConfig": {
                            "a11yLabel": "Account name" + ((account.accountID || account.Account_id) ? (isMobileDevice ? commonUtilities.truncateStringWithGivenLength(account.accountName + "....", 26) + commonUtilities.getLastFourDigit(account.accountID) : commonUtilities.getAccountDisplayName(account)) : ((account.payPersonId || account.PayPersonId) ? account.nickName : account.nickName ? (account.nickName + " ...." + commonUtilities.getLastFourDigit(account.accountNumber)) : (account.beneficiaryName + " ...." + commonUtilities.getLastFourDigit(account.accountNumber)))) +
                                ", Account Type" + (account.accountType) +
                                ((account.bankName || account.phone || account.email || "") ? (`, Bank name ${account.bankName || account.phone || account.email}`) : ""),
                            "a11yARIA": {
                                "tabindex": 0,
                                "role": "button"
                            }
                        }
                    }
                };
            } else {
                var dataObject = {
                    "lblAccountName": (account.accountID || account.Account_id) ? (isMobileDevice ? commonUtilities.truncateStringWithGivenLength(account.accountName + "....", 26) + commonUtilities.getLastFourDigit(account.accountID) : commonUtilities.getAccountDisplayName(account)) : account.nickName,
                    "lblAmount": (account.accountType !== "CreditCard") ? commonUtilities.formatCurrencyWithCommas(account.availableBalance, false, account.currencyCode) : commonUtilities.formatCurrencyWithCommas(account.availableCredit, false, account.currencyCode),
                    "accountID": account.Account_id || account.accountID || account.accountNumber || account.payPersonId,
                    "Membership_id": account.Membership_id || account.coreCustomerId,
                    "currencyCode": account.currencyCode,
                    "imgIcon": {
                        "text": (account.isBusinessAccount === "true") ? "r" : "s",
                        //"isVisible" : applicationManager.getConfigurationManager().isCombinedUser === "true" ? true : false
                        "isVisible": this.profileAccess === "both" ? true : false
                    },
                    "lblAccType": {
                        "text": account.accountType,
                        "left": this.profileAccess === "both" ? "7px" : "20px",
                    },
                    "imgBankIcon": {
                        "src": icon
                    },
                    "lblCurrencySymbol": "",
                    "flxBankIcon": {
                        "isVisible": account.isSameBankAccount === "false" && !kony.sdk.isNullOrUndefined(icon) ? true : false
                    },
                    "flxAccountListItem": {
                        "isVisible": true
                    },
                    "lblSeparator": {
                        "isVisible": visible
                    },
                    "flxTransfersFrom": {
                        "onKeyPress": this.onSegFromKeyPressCallBack,
                        "accessibilityConfig": {
                            "a11yLabel": "Account name " + (((account.accountID || account.Account_id) ? (isMobileDevice ? commonUtilities.truncateStringWithGivenLength(account.accountName + "....", 26) + commonUtilities.getLastFourDigit(account.accountID) : commonUtilities.getAccountDisplayName(account)) : account.nickName)) +
                                ", Amount" + ((account.accountType !== "CreditCard") ? commonUtilities.formatCurrencyWithCommas(account.availableBalance, false, account.currencyCode) : commonUtilities.formatCurrencyWithCommas(account.availableCredit, false, account.currencyCode)),
                            "a11yARIA": {
                                "tabindex": 0,
                                "role": "button"
                            }
                        }
                    },
                    "flxFromAccountsList": {
                        "onKeyPress": this.onSegFromKeyPressCallBack,
                        "accessibilityConfig": {
                            "a11yLabel": "Account name " + ((account.accountID || account.Account_id) ? (isMobileDevice ? commonUtilities.truncateStringWithGivenLength(account.accountName + "....", 26) + commonUtilities.getLastFourDigit(account.accountID) : commonUtilities.getAccountDisplayName(account)) : account.nickName) +
                                ", Account Type " + (account.accountType) +
                                ", Amount " + ((account.accountType !== "CreditCard") ? commonUtilities.formatCurrencyWithCommas(account.availableBalance, false, account.currencyCode) : commonUtilities.formatCurrencyWithCommas(account.availableCredit, false, account.currencyCode)),
                            "a11yARIA": {
                                "tabindex": 0,
                                "role": "button"
                            }
                        }
                    }
                };
            }
            if (account.accountType === "CreditCard") {
                dataObject.CreditCard = {
                    "dueDate": account.dueDate,
                    "currentBalance": account.currentBalance,
                    "currencyCode": account.currencyCode,
                    "lastStatementBalance": account.lastStatementBalance,
                    "minimumDue": account.minimumDue
                }
            }
            return dataObject;
        },
        /* mapping of bank images*/
        getBankIcon: function (bankName) {
            var img;
            if (!kony.sdk.isNullOrUndefined(bankName)) {
                if (bankName.toLowerCase().includes("citi")) img = ViewConstants.IMAGES.CITI_BANK_IMAGE;
                else if (bankName.toLowerCase().includes("chase")) img = ViewConstants.IMAGES.CHASE_BANK_IMAGE;
                else if (bankName.toLowerCase().includes("boa") || bankName.toLowerCase().includes("america")) img = ViewConstants.IMAGES.BOA_BANK_IMAGE;
                else if (bankName.toLowerCase().includes("hdfc")) img = ViewConstants.IMAGES.HDFC_BANK_IMAGE;
                else if (bankName.toLowerCase().includes("infintiy")) img = ViewConstants.IMAGES.INFINITY_BANK_IMAGE;
                else img = ViewConstants.IMAGES.EXTERNAL_BANK_IMAGE;
            }
            return img;
        },
        /** Creates the segment data along with Section Headers
         * @param  {object} toAccounts list of accounts
         * @param  {string} type specifies either from or to accounts
         * @param  {boolean} p2pEnabledStatus specifies whether p2p is enabled or not
         * @param  {boolean} p2pServiceStatus specifies whether the p2p service has failed or not
         */
        segFromAccountRowClick: function (toAccounts, p2pEnabledStatus, p2pServiceStatus) {
            var scopeObj = this;
            var configurationManager = applicationManager.getConfigurationManager();
            var presentationController = applicationManager.getModulesPresentationController({
                "moduleName": "TransferFastUIModule",
                "appName": "TransfersMA"
            });
            var self = this;
            var selectedAccount = this.view.segTransferFrom.selectedRowItems[0];
            var accountId = selectedAccount.accountID;
            globalacc.accountId = accountId;
            globalacc.currency = selectedAccount.currencyCode
            this.view.lblCurrencySymbol.text = applicationManager.getFormatUtilManager().getCurrencySymbol(selectedAccount.currencyCode);
            this.view.lblAmount.accessibilityConfig = {
                "a11yLabel": `${scopeObj.view.lblAmount.text} ${scopeObj.view.lblCurrencySymbol.text}`,
                "a11yARIA": {
                    "tabindex": -1,
                    "role": "span"
                }
            }
            if (selectedAccount.CreditCard || selectedAccount.accountType === "CreditCard") {
                self.toggleCreditCardFlexes(true);
            }
            this.view.flxLoadingContainerTo.setVisibility(true);
            /*var p2pStatus = false;
            if (applicationManager.getConfigurationManager().ispayAPersonEnabled == "true") {
              p2pStatus = true;
            }*/
            var newList = [];
            toAccounts.forEach(function (acc) {
                if (acc.accountID !== accountId) newList.push(acc)
            })
            toAccounts = newList;
            toAccounts = presentationController.filterToAccountsByMembershipId(selectedAccount.Membership_id, toAccounts);
            if (!this.isSingleCustomerProfile) {
                var widgetToData = this.getCombinedDataWithSections(toAccounts, "to", p2pEnabledStatus, p2pServiceStatus);
            } else {
                var widgetToData = this.getDataWithSections(toAccounts, "to", p2pEnabledStatus, p2pServiceStatus);
            }
            if (widgetToData) {
                this.enableToList = true;
                this.view.flxNoResultsTo.setVisibility(false);
            } else {
                this.enableToList = false;
                this.view.flxNoResultsTo.setVisibility(true);
            }
            var posi = 0,
                posj = 0,
                toSelectedBeneficiaryId;
            if (this.view.segTransferTo.selectedRowIndex) {
                var toselectedRowIndex = this.view.segTransferTo.selectedRowIndex;
                var toSelectedId = this.view.segTransferTo.selectedRowItems[0].accountID;
                if (this.view.segTransferTo.selectedRowItems[0].Id !== null || this.view.segTransferTo.selectedRowItems[0].Id !== undefined) {
                    toSelectedBeneficiaryId = this.view.segTransferTo.selectedRowItems[0].Id;
                }
                for (var i = 0; i < widgetToData.length; i++) {
                    for (var j = 0; j < widgetToData[i][1].length; j++) {
                        if ((widgetToData[i][1][j].accountID === toSelectedId) && (widgetToData[i][1][j].Id === toSelectedBeneficiaryId)) {
                            posi = i;
                            posj = j;
                            break;
                        }
                    }
                }
                toselectedRowIndex = [posi, posj];
                this.view.segTransferTo.setData(widgetToData);
                this.view.segTransferTo.selectedRowIndex = toselectedRowIndex;
                this.view.lblSelectAccountTo.text = this.view.segTransferTo.selectedRowItems[0].lblAccountName;
                this.view.lblToAmount.text = this.view.segTransferTo.selectedRowItems[0].lblAmount;
            } else {
                this.view.lblSelectAccountTo.setVisibility(false);
                this.view.lblToAmount.setVisibility(false);
                this.view.txtTransferTo.text = "";
                this.view.txtTransferTo.setVisibility(true);
                this.view.segTransferTo.setData(widgetToData);
            }
            this.view.flxLoadingContainerTo.setVisibility(false);
            this.view.txtTransferFrom.text = selectedAccount.lblAccountName;
            this.view.txtTransferFrom.setVisibility(false);
            scopeObj.view.flxFrom.accessibilityConfig = {
                a11yLabel: `Transfer From. Currently selected ${selectedAccount.lblAccountName} with Amount of ${selectedAccount.lblAmount}. Click to select another account`,
                a11yARIA: {
                    "tabindex": 0,
                    "role": "button"
                }
            };
            scopeObj.view.flxFrom.setActive(true);
            this.view.flxCancelFilterFrom.setVisibility(false);
            this.view.lblSelectAccount.text = selectedAccount.lblAccountName;
            this.view.lblFromAmount.text = selectedAccount.lblAmount;
            this.view.flxFromSegment.setVisibility(false);
            this.view.lblFromAmount.setVisibility(true);
            //if(configurationManager.isCombinedUser==="true"){
            if (this.profileAccess === "both") {
                this.view.flxIcon.setVisibility(true);
                this.view.imgIcon.text = selectedAccount.imgIcon.text;
                this.view.lblSelectAccount.left = "35dp";
            } else {
                this.view.flxIcon.setVisibility(false);
            }
            this.view.lblSelectAccount.setVisibility(true);
            if (this.view.txtTransferTo.text === this.view.txtTransferFrom.text) {
                this.view.txtTransferTo.text = "";
                this.view.txtTransferTo.setVisibility(true);
                this.view.lblSelectAccountTo.setVisibility(false);
                this.view.lblToAmount.setVisibility(false);
            }
            this.onFrequencyChanged();
        },
        /* setting widgetdatamap for combined user scenario */
        setFromAccountsdata: function () {
            this.view.segTransferFrom.rowTemplate = "flxFromAccountsList";
            this.view.segTransferFrom.sectionHeaderTemplate = "flxTransfersFromListHeader";
            this.view.segTransferFrom.widgetDataMap = {
                "flxFromAccountsList": "flxFromAccountsList",
                "flxAccountListItem": "flxAccountListItem",
                "lblAccountName": "lblAccountName",
                "flxAmount": "flxAmount",
                "flxSeparator": "flxSeparator",
                "lblSeparator": "lblSeparator",
                "lblTopSeparator": "lblTopSeparator",
                "lblAmount": "lblAmount",
                "lblCurSym": "lblCurSym",
                "flxIcons": "flxIcons",
                "imgIcon": "imgIcon",
                "imgBankIcon": "imgBankIcon",
                "flxBankIcon": "flxBankIcon",
                "lblAccType": "lblAccType",
                "flxTransfersFromListHeader": "flxTransfersFromListHeader",
                "lblTransactionHeader": "lblTransactionHeader",
                "imgDropDown": "imgDropDown",
                "flxDropDown": "flxDropDown"
            };
        },
        /* setting widgetdatamap for combined user scenario */
        setToAccountsData: function () {
            this.view.segTransferTo.rowTemplate = "flxFromAccountsList";
            this.view.segTransferTo.sectionHeaderTemplate = "flxTransfersFromListHeader";
            this.view.segTransferTo.widgetDataMap = {
                "flxFromAccountsList": "flxFromAccountsList",
                "flxAccountListItem": "flxAccountListItem",
                "lblAccountName": "lblAccountName",
                "flxAmount": "flxAmount",
                "flxSeparator": "flxSeparator",
                "lblSeparator": "lblSeparator",
                "lblTopSeparator": "lblTopSeparator",
                "lblAmount": "lblAmount",
                "lblCurSym": "lblCurSym",
                "flxIcons": "flxIcons",
                "imgIcon": "imgIcon",
                "flxBankIcon": "flxBankIcon",
                "imgBankIcon": "imgBankIcon",
                "lblAccType": "lblAccType",
                "flxTransfersFromListHeader": "flxTransfersFromListHeader",
                "lblTransactionHeader": "lblTransactionHeader",
                "imgDropDown": "imgDropDown",
                "flxDropDown": "flxDropDown"
            };
        },
        /**Make Transfer Form Configuration based context - handles make transfer, repeats and edit transfer
         * @param  {object} makeTransferViewModel - View Model containing context and data
         */
        updateMakeTransferForm: function (makeTransferViewModel) {
            /*this.showMainTransferWindow();
            this.view.tbxNoOfRecurrences.skin = ViewConstants.SKINS.TRANSFERS_TEXTBOX_NOERROR;
            this.view.calEndingOnNew.skin = ViewConstants.SKINS.COMMON_CALENDAR_NOERROR;
            this.view.calSendOnNew.skin = ViewConstants.SKINS.COMMON_CALENDAR_NOERROR;
            this.view.lbxFromAccount.skin = ViewConstants.SKINS.COMMON_LISTBOX_NOERROR;
            this.view.lbxToAccount.skin = ViewConstants.SKINS.COMMON_LISTBOX_NOERROR;
            this.view.flxAmount.skin =  ViewConstants.SKINS.COMMON_FLEX_NOERRORSKIN;
            //this.view.lblWarning.setVisibility(false);
            //this.setChangeTransferTypeView(this.getValidTransferTypes(), {fromAccount : makeTransferViewModel.defaultFromAccountNumber, headerText : kony.i18n.getLocalizedString("i18n.Transfers.ChangeTransferType")});
            commonUtilities.disableOldDaySelection(this.view.calSendOnNew);
            commonUtilities.disableOldDaySelection(this.view.calEndingOnNew);
            this.resetFastTransfersForm();
            if (makeTransferViewModel.toAccounts.length === 0) {
              this.showNoAccountsAvailableUI(makeTransferViewModel.type)
            } else {*/
            var configurationManager = applicationManager.getConfigurationManager();
            commonUtilities.disableOldDaySelection(this.view.calSendOnNew);
            commonUtilities.disableOldDaySelection(this.view.calEndingOnNew);
            var presentationController = applicationManager.getModulesPresentationController({
                "moduleName": "TransferFastUIModule",
                "appName": "TransfersMA"
            });
            this.view.calSendOnNew.dateComponents = this.view.calSendOnNew.dateComponents;
            this.view.calEndingOnNew.dateComponents = this.view.calEndingOnNew.dateComponents;
            this.view.btnConfirm.onClick = this.confirmFastTransfer.bind(this, makeTransferViewModel);
            this.resetFastTransfersForm();
            this.view.lbxFrequency.selectedKey = "Once"
            this.view.btnModify.onClick = function () {
                var previousForm = kony.application.getPreviousForm().id;
                if (previousForm === "frmScheduledPaymentsNew" || previousForm === "frmPastPaymentsNew") {
                    applicationManager.getNavigationManager().navigateTo(previousForm);
                } else {
                    var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                        "moduleName": "AccountsUIModule",
                        "appName": "HomepageMA"
                    });
                    accountsModule.presentationController.showAccountsDashboard();
                }
            };
            if (makeTransferViewModel.fromAccounts) {
                if (makeTransferViewModel.fromAccounts.length > 0) {
                    if (!fromAccounts) fromAccounts = makeTransferViewModel.fromAccounts;
                    if (this.preFilledToAccount && this.preFilledToAccount.cif) {
                        // let toMembershipId = JSON.parse(this.preFilledToAccount.cif)[0].coreCustomerId.split(',');
                        let toMembershipId = [];
                        JSON.parse(this.preFilledToAccount.cif).forEach(x => toMembershipId.push(...x.coreCustomerId.split(',')));
                        makeTransferViewModel.fromAccounts = makeTransferViewModel.fromAccounts.filter(x => toMembershipId.includes(x.Membership_id));
                        delete this.preFilledToAccount;
                    }
                    if (!this.isSingleCustomerProfile) {
                        this.setFromAccountsdata();
                        var widgetFromData = this.getCombinedDataWithSections(makeTransferViewModel.fromAccounts, "from");
                    } else {
                        var widgetFromData = this.getDataWithSections(makeTransferViewModel.fromAccounts, "from");
                    }
                    if (widgetFromData) {
                        this.view.segTransferFrom.setData(widgetFromData);
                        this.view.flxLoadingContainerFrom.setVisibility(false);
                        this.view.segTransferFrom.setVisibility(true);
                        this.view.flxNoResultsFrom.setVisibility(false);
                    }
                } else {
                    if (makeTransferViewModel.isSearch) {
                        this.view.segTransferFrom.setVisibility(false);
                        this.view.lblNoResultsFrom.text = kony.i18n.getLocalizedString("i18n.FastTransfers.NoResultsFound");
                        this.view.flxNoResultsFrom.setVisibility(true);
                    } else {
                        this.view.segTransferFrom.setVisibility(false);
                        this.view.lblNoResultsFrom.text = kony.i18n.getLocalizedString("i18n.FastTransfers.NoAccountsToTransferFrom");
                        this.view.flxNoResultsFrom.setVisibility(true);
                    }
                }
            }
            if (makeTransferViewModel.toAccounts) {
                if (makeTransferViewModel.toAccounts.length > 0) {
                    //if (!toAccounts)
                    toAccounts = makeTransferViewModel.toAccounts;
                    //var p2pEnabledStatus = true, p2pServiceStatus = true;
                    if (makeTransferViewModel.p2pEnabled === false) {
                        var p2pEnabledStatus = false;
                    } else {
                        var p2pEnabledStatus = true;
                        if (makeTransferViewModel.p2pSuccess === false) {
                            var p2pServiceStatus = false;
                        } else {
                            var p2pServiceStatus = true;
                        }
                    }
                    if (makeTransferViewModel.accountFrom) {
                        var newList = [];
                        makeTransferViewModel.toAccounts.forEach(function (acc) {
                            if (acc.accountID !== makeTransferViewModel.accountFrom) newList.push(acc)
                        })
                        let membershipId = makeTransferViewModel.toAccounts.filter(x => x.accountID === makeTransferViewModel.accountFrom)[0].Membership_id;
                        newList = presentationController.filterToAccountsByMembershipId(membershipId, newList);
                        this.enableToList = true;
                        makeTransferViewModel.toAccounts = newList;
                        toAccounts = makeTransferViewModel.toAccounts;
                    }
                    if (!this.isSingleCustomerProfile) {
                        this.setToAccountsData();
                        if (this.view.segTransferFrom.selectedRowItems[0] && this.view.segTransferFrom.selectedRowItems[0].Membership_id) {
                            makeTransferViewModel.toAccounts = presentationController.filterToAccountsByMembershipId(this.view.segTransferFrom.selectedRowItems[0].Membership_id, makeTransferViewModel.toAccounts);
                        }
                        var widgetToData = this.getCombinedDataWithSections(makeTransferViewModel.toAccounts, "to", p2pEnabledStatus, p2pServiceStatus);
                    } else {
                        if (this.view.segTransferFrom.selectedRowItems[0] && this.view.segTransferFrom.selectedRowItems[0].Membership_id) {
                            makeTransferViewModel.toAccounts = presentationController.filterToAccountsByMembershipId(this.view.segTransferFrom.selectedRowItems[0].Membership_id, makeTransferViewModel.toAccounts);
                        }
                        var widgetToData = this.getDataWithSections(makeTransferViewModel.toAccounts, "to", p2pEnabledStatus, p2pServiceStatus);
                    }
                    if (widgetToData) {
                        this.view.segTransferTo.setData(widgetToData);
                        this.view.flxLoadingContainerTo.setVisibility(false);
                        this.view.segTransferTo.setVisibility(true);
                        this.view.flxNoResultsTo.setVisibility(false);
                    }
                    if (this.enableToList) {
                        this.view.flxLoadingContainerTo.setVisibility(false);
                        this.view.segTransferTo.setVisibility(true);
                        this.view.flxNoResultsTo.setVisibility(false);
                        // if (makeTransferViewModel.accountFrom) {
                        //     this.view.segTransferTo.setData(widgetToData);
                        // }
                    } else {
                        this.view.flxLoadingContainerTo.setVisibility(false);
                        this.view.segTransferTo.setVisibility(false);
                        this.view.flxNoResultsTo.setVisibility(true);
                    }
                } else {
                    if (makeTransferViewModel.p2pEnabled === true && makeTransferViewModel.p2pSuccess === false) {
                        this.view.flxNoResultsToPayPersonFailure.setVisibility(true);
                        this.view.flxNoResultsTo.setVisibility(false);
                    } else if (makeTransferViewModel.isSearch) {
                        this.view.segTransferTo.setVisibility(false);
                        this.view.flxNoResultsToPayPersonFailure.setVisibility(false);
                        this.view.lblNoResultsFrom.text = kony.i18n.getLocalizedString("i18n.FastTransfers.NoResultsFound");
                        this.view.flxNoResultsTo.setVisibility(true);
                    } else {
                        this.view.segTransferTo.setVisibility(false);
                        this.view.flxNoResultsToPayPersonFailure.setVisibility(false);
                        this.view.lblNoResultsFrom.text = kony.i18n.getLocalizedString("i18n.FastTransfers.NoRecipient");
                        this.view.flxNoResultsTo.setVisibility(true);
                    }
                }
            }
            if (makeTransferViewModel.accountTo) {
                this.prefillToAccount(makeTransferViewModel.accountTo, makeTransferViewModel.toAccounts, widgetToData);
            }
            if (!this.view.segTransferTo.selectedRowItems || this.view.segTransferTo.selectedRowItems.length === 0) this.view.lblTransfers.text = kony.i18n.getLocalizedString("i18n.hamburger.transfers");
            if (makeTransferViewModel.accountFrom) {
                this.prefillFromAccount(makeTransferViewModel.accountFrom, widgetFromData, makeTransferViewModel.fromAccounts);
            }
            this.view.segTransferFrom.onRowClick = this.segFromAccountRowClick.bind(this, toAccounts, p2pEnabledStatus, p2pServiceStatus);
            this.view.segTransferTo.onRowClick = this.onToAccountChange;
            if (makeTransferViewModel.editTransaction) {
                var data = makeTransferViewModel;
                makeTransferViewModel.editTransaction.userAccounts.accountsValue.accountFrom = makeTransferViewModel.editTransaction.editTransactionObject.fromAccountNumber;
                makeTransferViewModel.editTransaction.userAccounts.accountsValue.accountTo = makeTransferViewModel.editTransaction.editTransactionObject.transactionType === 'InternalTransfer' ? makeTransferViewModel.editTransaction.editTransactionObject.toAccountNumber : (makeTransferViewModel.editTransaction.editTransactionObject.transactionType === 'P2P' ? makeTransferViewModel.editTransaction.editTransactionObject.personId : (makeTransferViewModel.editTransaction.editTransactionObject.ExternalAccountNumber || makeTransferViewModel.editTransaction.editTransactionObject.toAccountNumber));
                this.filterAccounts(makeTransferViewModel.editTransaction.userAccounts.accountsValue);
                this.preFillTransfersForm(this.generateTransferData(makeTransferViewModel.editTransaction.editTransactionObject));
                this.view.btnConfirm.onClick = this.confirmFastTransfer.bind(this, data);
                if (makeTransferViewModel.editTransaction.onCancelCreateTransfer !== undefined) {
                    this.view.btnModify.onClick = makeTransferViewModel.editTransaction.onCancelCreateTransfer;
                } else {
                    this.view.btnModify.onClick = function () {
                        var previousForm = kony.application.getPreviousForm().id;
                        if (previousForm === "frmScheduledPaymentsNew" || previousForm === "frmPastPaymentsNew") {
                            applicationManager.getNavigationManager().navigateTo(previousForm);
                        } else {
                            var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                                "moduleName": "AccountsUIModule",
                                "appName": "HomepageMA"
                            });
                            accountsModule.presentationController.showAccountsDashboard();
                        }
                    };
                }
            }
            if (makeTransferViewModel.repeatTransaction) {
                var data = makeTransferViewModel;
                makeTransferViewModel.repeatTransaction.userAccounts.accountsValue.accountFrom = makeTransferViewModel.repeatTransaction.transactionObject.fromAccountNumber;
                makeTransferViewModel.repeatTransaction.userAccounts.accountsValue.accountTo = makeTransferViewModel.repeatTransaction.transactionObject.transactionType === 'InternalTransfer' ? makeTransferViewModel.repeatTransaction.transactionObject.toAccountNumber : (makeTransferViewModel.repeatTransaction.transactionObject.transactionType === 'P2P' ? makeTransferViewModel.repeatTransaction.transactionObject.personId : (makeTransferViewModel.repeatTransaction.transactionObject.ExternalAccountNumber || makeTransferViewModel.repeatTransaction.transactionObject.toAccountNumber));
                this.filterAccounts(makeTransferViewModel.repeatTransaction.userAccounts.accountsValue);
                this.preFillTransfersForm(this.generateTransferData(makeTransferViewModel.repeatTransaction.transactionObject));
                this.view.btnConfirm.onClick = this.confirmFastTransfer.bind(this, data);
                var previousForm = kony.application.getPreviousForm().id;
                if (makeTransferViewModel.repeatTransaction.onCancelCreateTransfer !== undefined) {
                    this.view.btnModify.onClick = makeTransferViewModel.editTransaction.onCancelCreateTransfer;
                } else {
                    this.view.btnModify.onClick = function () {
                        var previousForm = kony.application.getPreviousForm().id;
                        if (previousForm === "frmScheduledPaymentsNew" || previousForm === "frmPastPaymentsNew") {
                            applicationManager.getNavigationManager().navigateTo(previousForm);
                        } else {
                            var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
                                "moduleName": "AccountsUIModule",
                                "appName": "HomepageMA"
                            });
                            accountsModule.presentationController.showAccountsDashboard();
                        }
                    };
                }
            }
            /*this.showMainTransferWindow();
                this.showMakeTransfer();
                var masterData = makeTransferViewModel.fromAccounts.map(this.fromAccountsListBoxMapper);
                if(makeTransferViewModel.defaultFromAccountNumber) {
                  this.view.lbxFromAccount.masterData = masterData;
                  this.view.lbxFromAccount.selectedKey = makeTransferViewModel.defaultFromAccountNumber;
                } else {
                  masterData = commonUtilities.appendAccountNamePlaceholder(masterData);
                  this.view.lbxFromAccount.masterData = masterData;
                }
                this.view.lbxToAccount.masterData = makeTransferViewModel.toAccounts.map(this.toAccountListBoxMapper);
                this.filterAccountsTo(makeTransferViewModel);
                this.filterFromAccount(makeTransferViewModel);
                this.setAddAccountUI(makeTransferViewModel.type);
                if (makeTransferViewModel.editTransactionObject) {
                  this.preFillTransfersForm(this.generateTransferData(makeTransferViewModel, makeTransferViewModel.editTransactionObject));
                }
                if (makeTransferViewModel.repeatTransactionObject) {
                  this.preFillTransfersForm(this.generateTransferData(makeTransferViewModel, makeTransferViewModel.repeatTransactionObject));
                }
                if (makeTransferViewModel.transferData) {
                  this.preFillTransfersForm(makeTransferViewModel.transferData)
                }
                this.view.transfermain.maketransfer.lbxToAccount.onSelection = this.onToAccountChange;
                var transactionObj;
                if (makeTransferViewModel.editTransactionObject || makeTransferViewModel.repeatTransactionObject) {
                  if(makeTransferViewModel.editTransactionObject !== undefined){
                    transactionObj = makeTransferViewModel.editTransactionObject
                  }else{
                    transactionObj = makeTransferViewModel.repeatTransactionObject
                  }
                  this.view.transfermain.maketransfer.lbxToAccount.onSelection(transactionObj);
                }else{
                  this.view.transfermain.maketransfer.lbxToAccount.onSelection();
                }
                this.view.transfermain.maketransfer.btnConfirm.onClick = this.confirmTransfer.bind(this, makeTransferViewModel);
                this.view.transfermain.maketransfer.btnModify.onClick = makeTransferViewModel.onCancelCreateTransfer ||  function () {
                  this.showTransfersGateway();
                }.bind(this);
                var scopeObj = this;
                this.view.transfermain.maketransfer.lbxFromAccount.onSelection = function(){
                  if(scopeObj.view.transfermain.maketransfer.lbxFromAccount.selectedKey === "Key") {
                    commonUtilities.disableButton(scopeObj.view.transfermain.maketransfer.btnConfirm);
                    return;
                  }
                  scopeObj.filterAccountsTo(makeTransferViewModel);
                  scopeObj.view.transfermain.maketransfer.lbxFromAccount.skin = ViewConstants.SKINS.COMMON_LISTBOX_NOERROR;
                  scopeObj.view.transfermain.maketransfer.lbxToAccount.skin = ViewConstants.SKINS.COMMON_LISTBOX_NOERROR;
                  scopeObj.hideFieldError();
                }
                this.view.flxMakeTransferError.setVisibility(false);
              }*/
            //}
        },
        /** Returns Current Date in string format
         * @returns {string} Date String
         */
        getCurrDateString: function () {
            return commonUtilities.getFrontendDateString(commonUtilities.getServerDateObject());
        },
        /**Returns date object from a dateString
         * @param  {object} dateString String of the Date
         * @returns {object} Date Object
         */
        getDateObjectFromServer: function (dateString) {
            var formatUtilManager = applicationManager.getFormatUtilManager();
            return formatUtilManager.getDateObjectfromString(dateString, "YYYY-MM-DD");
        },
        /**Prefills a transfer form from view model
         * @param  {object} transferData View Model containing context and data
         */
        preFillTransfersForm: function (transferData) {
            var scopeObj = this;
            var sendOnDateObj = applicationManager.getFormatUtilManager().getDateObjectFromCalendarString(transferData.sendOnDate, applicationManager.getFormatUtilManager().getDateFormat().toUpperCase());
            var endOnDateObj = applicationManager.getFormatUtilManager().getDateObjectFromCalendarString(transferData.endOnDate, applicationManager.getFormatUtilManager().getDateFormat().toUpperCase());
            this.view.lbxFrequency.selectedKey = transferData.frequencyKey;
            this.view.calSendOnNew.dateFormat = applicationManager.getFormatUtilManager().getDateFormat();
            this.view.calSendOnNew.dateComponents = sendOnDateObj ? [sendOnDateObj.getDate(), sendOnDateObj.getMonth() + 1, sendOnDateObj.getFullYear()] : commonUtilities.getServerDateComponent();
            this.view.calEndingOnNew.dateFormat = applicationManager.getFormatUtilManager().getDateFormat();
            this.view.calEndingOnNew.dateComponents = endOnDateObj ? [endOnDateObj.getDate(), endOnDateObj.getMonth() + 1, endOnDateObj.getFullYear()] : commonUtilities.getServerDateComponent();
            this.view.lbxForHowLong.selectedKey = transferData.howLongKey;
            if (transferData.frequencyKey !== 'Once') {
                if (transferData.howLongKey === "NO_OF_RECURRENCES") {
                    this.makeLayoutfrequencyWeeklyRecurrences();
                } else {
                    this.makeLayoutfrequencyWeeklyDate();
                }
            }
            this.onFrequencyChanged();
            this.view.tbxNoOfRecurrences.text = transferData.noOfRecurrences;
            this.view.txtNotes.text = transferData.notes; //UI textbox widget name is change to txtNotes
            this.view.tbxAmount.text = transferData.amount;
            if (transferData.transactionCurrency) {
                this.view.lblCurrencySymbol.text = applicationManager.getFormatUtilManager().getCurrencySymbol(transferData.transactionCurrency);
                this.view.lblAmount.accessibilityConfig = {
                    "a11yLabel": `${scopeObj.view.lblAmount.text} ${scopeObj.view.lblCurrencySymbol.text}`,
                    "a11yARIA": {
                        "tabindex": -1,
                        "role": "span"
                    }
                }
                this.view.lbxCurrency.selectedKey = transferData.transactionCurrency;
            }
            this.onAmountChanged(this.view.tbxAmount);
            this.checkValidityMakeFastTransferForm();
        },
        /** Converts Transaction Model Object to a view model
         * @param  {object} makeTransferViewModel View Model containing context and data
         * @param  {object} transaction Transaction Model Object
         */
        generateTransferData: function (transaction) {
            var viewModel = {};
            viewModel.accountFromKey = transaction.fromAccountNumber;
            viewModel.accountToKey = transaction.toAccountNumber || transaction.ExternalAccountNumber
            viewModel.amount = transaction.amount || "";
            viewModel.frequencyKey = transaction.frequencyType || 'Once';
            viewModel.noOfRecurrences = transaction.numberOfRecurrences || "";
            viewModel.notes = transaction.transactionsNotes || "";
            viewModel.howLongKey = (transaction.numberOfRecurrences && transaction.numberOfRecurrences !== "0") ? "NO_OF_RECURRENCES" : "ON_SPECIFIC_DATE";
            var dateFormat = applicationManager.getFormatUtilManager().getDateFormat();
            if (!transaction.isModifiedTransferFlow) {
                if (!transaction.scheduledDate || (transaction.scheduledDate && this.getDateObjectFromServer(transaction.scheduledDate).getTime() < commonUtilities.getServerDateObject().getTime())) {
                    viewModel.sendOnDate = this.getCurrDateString();
                } else {
                    viewModel.sendOnDate = commonUtilities.getFrontendDateString(transaction.scheduledDate, dateFormat);
                }
                if (!transaction.frequencyEndDate || (transaction.frequencyEndDate && this.getDateObjectFromServer(transaction.frequencyEndDate).getTime() < commonUtilities.getServerDateObject().getTime())) {
                    viewModel.endOnDate = this.getCurrDateString();
                } else {
                    viewModel.endOnDate = commonUtilities.getFrontendDateString(transaction.frequencyEndDate, dateFormat);
                }
            } else {
                if (transaction.scheduledDate && applicationManager.getFormatUtilManager().getDateObjectFromCalendarString(transaction.scheduledDate, applicationManager.getFormatUtilManager().getDateFormat()).getTime() < commonUtilities.getServerDateObject().getTime()) {
                    viewModel.sendOnDate = this.getCurrDateString();
                } else {
                    viewModel.sendOnDate = transaction.scheduledDate;
                }
                if (transaction.frequencyEndDate && applicationManager.getFormatUtilManager().getDateObjectFromCalendarString(transaction.frequencyEndDate, applicationManager.getFormatUtilManager().getDateFormat()).getTime() < commonUtilities.getServerDateObject().getTime()) {
                    viewModel.endOnDate = this.getCurrDateString();
                } else {
                    viewModel.endOnDate = transaction.frequencyEndDate;
                }
            }
            viewModel.transactionType = transaction.transactionType;
            viewModel.transactionCurrency = transaction.transactionCurrency;
            return viewModel;
        },
        prefillToAccount: function (accountTo, toAccountsList, widgetToData) {
            var configurationManager = applicationManager.getConfigurationManager();
            var account = {};
            var orientationHandler = new OrientationHandler();
            var isMobileDevice = ((kony.application.getCurrentBreakpoint() === 640) || orientationHandler.isMobile);
            if (toAccountsList) {
                if (accountTo.Id != null || accountTo.Id != undefined) {
                    account = toAccountsList.filter(function (record) {
                        return ((record["accountNumber"] && record["accountNumber"].toUpperCase() === accountTo.accountTo.toUpperCase()) && (record["Id"] && record["Id"].toUpperCase() === accountTo.Id.toUpperCase()));
                    });
                } else {
                    account = toAccountsList.filter(function (record) {
                        return ((record["accountID"] && record["accountID"].toUpperCase() === accountTo.toUpperCase()) || (record["accountNumber"] && record["accountNumber"].toUpperCase() === accountTo.toUpperCase()) || (record["PayPersonId"] && record["PayPersonId"].toUpperCase() === accountTo.toUpperCase()) || (record["accountID"] && record["accountID"].toUpperCase() === accountTo.toUpperCase()));
                    });
                }
            }
            if (account[0] === undefined) { return };
            var accType = "";
            if (account[0].isInternationalAccount && account[0].isInternationalAccount === "true") {
                accType = "International Account";
                this.showCurrency();
            } else if (account[0].isSameBankAccount && account[0].isSameBankAccount === "true") accType = "Infinity Account";
            else if (!kony.sdk.isNullOrUndefined(account[0].PayPersonId)) accType = "Person-to-Person";
            let toTextboxText = "",
                toLabelText = "";
            if (account[0].accountID || account[0].Account_id) {
                toTextboxText = commonUtilities.getAccountDisplayName(account[0]);
                if (isMobileDevice) {
                    toLabelText = commonUtilities.truncateStringWithGivenLength(account[0].accountName + "....", 26) + commonUtilities.getLastFourDigit(account[0].accountID);
                }
            } else if (account[0].payPersonId || account[0].PayPersonId) {
                toTextboxText = account[0].nickName;
            } else if (account[0].beneficiaryName) {
                toTextboxText = account[0].beneficiaryName + " ...." + commonUtilities.getLastFourDigit(account[0].accountNumber)
            } else {
                toTextboxText = account[0].nickName + " ...." + commonUtilities.getLastFourDigit(account[0].accountNumber)
            }
            this.view.txtTransferTo.text = toTextboxText;
            this.view.lblSelectAccountTo.text = toLabelText || toTextboxText;
            this.view.txtTransferTo.setVisibility(false);
            this.view.flxCancelFilterTo.setVisibility(false);
            this.view.lblToAmount.text = ((account[0].accountType !== "CreditCard") && (account[0].accountType !== "Loan")) ? (account[0].availableBalance ? commonUtilities.formatCurrencyWithCommas(account[0].availableBalance, false, account[0].currencyCode) : (account[0].bankName || account[0].phone || account[0].email)) : (commonUtilities.formatCurrencyWithCommas(account[0].outstandingBalance, false, account[0].currencyCode));
            //if(configurationManager.isCombinedUser==="true"){
            if (this.profileAccess === "both") {
                this.view.flxToIcon.setVisibility(true);
                this.view.imgToIcon.text = (account[0].isBusinessPayee === "1") || (account[0].isBusinessAccount === "true") ? "r" : "s";
                this.view.lblSelectAccountTo.left = "35dp";
            }
            this.view.lblSelectAccountTo.setVisibility(true);
            this.view.lblToAmount.setVisibility(true);
            this.view.lblTransfers.text = accType + " " + kony.i18n.getLocalizedString("i18n.hamburger.transfers");
            var posi = 0,
                posj = 0;
            var toSelectedId = (account[0].accountID || account[0].Account_id) ? (account[0].accountID || account[0].Account_id) : (account[0].PayPersonId ? account[0].PayPersonId : account[0].accountNumber);
            var toSelectedBeneficiaryId;
            if (account[0].Id != null || account[0].Id != undefined) {
                toSelectedBeneficiaryId = account[0].Id;
            }
            for (var i = 0; i < widgetToData.length; i++) {
                for (var j = 0; j < widgetToData[i][1].length; j++) {
                    if ((widgetToData[i][1][j].accountID === toSelectedId) && (widgetToData[i][1][j].Id === toSelectedBeneficiaryId)) {
                        posi = i;
                        posj = j;
                        break;
                    }
                }
            }
            this.preFilledToAccount = account[0];
            this.view.segTransferTo.setData(widgetToData);
            this.view.segTransferTo.selectedRowIndex = [posi, posj];
            this.enableToList = true;
        },
        prefillFromAccount: function (accountFrom, widgetFromData, fromAccountsList) {
            var scopeObj = this;
            var configurationManager = applicationManager.getConfigurationManager();
            var account = {};
            if (fromAccountsList) {
                account = fromAccountsList.filter(function (record) {
                    return ((record["accountID"] && record["accountID"].toUpperCase() === accountFrom.toUpperCase()) || (record["accountNumber"] && record["accountNumber"].toUpperCase() === accountFrom.toUpperCase()));
                });
            }
            this.view.txtTransferFrom.text = (account[0].accountID || account[0].Account_id) ? commonUtilities.getAccountDisplayName(account[0]) : account[0].nickName;
            this.view.txtTransferFrom.setVisibility(false);
            this.view.flxCancelFilterFrom.setVisibility(false);
            this.view.lblSelectAccount.text = (account[0].accountID || account[0].Account_id) ? commonUtilities.getAccountDisplayName(account[0]) : account[0].nickName;
            this.view.lblFromAmount.text = (account[0].accountType !== "CreditCard") ? commonUtilities.formatCurrencyWithCommas(account[0].availableBalance, false, account[0].currencyCode) : commonUtilities.formatCurrencyWithCommas(account[0].availableCredit, false, account[0].currencyCode);
            this.view.lblSelectAccount.setVisibility(true);
            this.view.lblFromAmount.setVisibility(true);
            this.view.lblCurrencySymbol.text = applicationManager.getFormatUtilManager().getCurrencySymbol(account[0].currencyCode);
            this.view.lblAmount.accessibilityConfig = {
                "a11yLabel": `${scopeObj.view.lblAmount.text} ${scopeObj.view.lblCurrencySymbol.text}`,
                "a11yARIA": {
                    "tabindex": -1,
                    "role": "span"
                }
            }
            var posi = 0,
                posj = 0;
            var fromSelectedId = (account[0].accountID || account[0].Account_id);
            //if (configurationManager.isCombinedUser === "true") {
            if (this.profileAccess === "both") {
                this.view.flxIcon.setVisibility(true);
                this.view.imgIcon.text = account[0].isBusinessAccount === "true" ? "r" : "s";
                this.view.lblSelectAccount.left = "35dp";
            } else {
                this.view.flxIcon.setVisibility(false);
            }
            for (var i = 0; i < widgetFromData.length; i++) {
                for (var j = 0; j < widgetFromData[i][1].length; j++) {
                    if (widgetFromData[i][1][j].accountID === fromSelectedId) {
                        posi = i;
                        posj = j;
                        break;
                    }
                }
            }
            this.view.segTransferFrom.selectedRowIndex = [posi, posj];
        },
        /**Hides all the main flexes and  Resets UI
         */
        hideAll: function () {
            this.view.btnConfirm.skin = ViewConstants.SKINS.ACCOUNT_SUMMARY_UNSELETED_MODIFIED;
            this.view.flxMakeTransferError.setVisibility(false);
            this.view.flxTransferForm.setVisibility(false);
            this.view.lblWarning.setVisibility(false);
            this.view.flxNoAccounts.setVisibility(false);
            this.view.transferactivity.isVisible = false;
        },
        /**Shows Make Transfer Screen
         */
        showMakeTransfer: function () {
            this.hideAll();
            //this.view.breadcrumb.setBreadcrumbData([{text:kony.i18n.getLocalizedString("i18n.hamburger.transfers")}, {text:kony.i18n.getLocalizedString("i18n.billPay.BillPayMakeTransfer")}]);
            this.view.btnConfirm.skin = ViewConstants.SKINS.ACCOUNT_SUMMARY_SELETED_MODIFIED;
            this.view.flxTransferForm.setVisibility(true);
            //this.view.flxRowSeperator.setVisibility(false);
            //this.setSearchFlexVisibility(false);
            this.view.forceLayout();
        },
        /**Callback for Amount Field onEndEditing
         */
        onAmountChanged: function (obj) {
            commonUtilities.validateAndFormatAmount(obj);
            this.checkValidityMakeFastTransferForm();
            this.view.flxAmount.skin = ViewConstants.SKINS.COMMON_FLEX_NOERRORSKIN;
            this.hideFieldError();
        },
        responsiveViews: {},
        initializeResponsiveViews: function () {
            this.responsiveViews["transferactivity"] = this.isViewVisible("transferactivity");
            this.responsiveViews["flxTrasfersWindow"] = this.isViewVisible("flxTrasfersWindow");
            this.responsiveViews["flxNoAccounts"] = this.isViewVisible("flxNoAccounts");
            this.responsiveViews["flxCurrency"] = this.isViewVisible("flxCurrency");
        },
        isViewVisible: function (container) {
            if (this.view[container].isVisible) {
                return true;
            } else {
                return false;
            }
        },
        // COMMON
        onClickRadioButton: function (radioButton, isTextBoxEvent = false) {
            var self = this;
            var selectedButton;
            var allRadioButtions = ["lblRadioBtn1", "lblRadioBtn2", "lblRadioBtn3", "lblRadioBtn4"];
            if (radioButton && radioButton.widgets()) {
                selectedButton = radioButton.widgets()[0].id;
            } else {
                return;
            }
            var selectRadioButton = function (button) {
                var RadioBtn = self.view[button];
                RadioBtn.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
                RadioBtn.skin = ViewConstants.SKINS.RADIOBTN_SELECTED;
                self.view[crediCardRadioButtonMappings[button].parentFlx].accessibilityConfig = {
                    "a11yARIA": {
                        "aria-checked": "true",
                        "role": "radio",
                        "tabindex": 0
                    },
                    "a11yLabel": self.view[crediCardRadioButtonMappings[button].associatedWidget].text + (button === "lblRadioBtn4" ? "" : self.view[crediCardRadioButtonMappings[button].associatedWidget + "Value"].text)
                };
                isTextBoxEvent ? "" : self.view[crediCardRadioButtonMappings[button].parentFlx].setActive(true);
            };
            var unSelectRadioButton = function (button) {
                var RadioBtn = self.view[button];
                RadioBtn.text = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                RadioBtn.skin = ViewConstants.SKINS.RADIOBTN_UNSELECTED;
                self.view[crediCardRadioButtonMappings[button].parentFlx].accessibilityConfig = {
                    "a11yARIA": {
                        "aria-checked": "false",
                        "role": "radio",
                        "tabindex": 0
                    },
                    "a11yLabel": self.view[crediCardRadioButtonMappings[button].associatedWidget].text + (button === "lblRadioBtn4" ? "" : self.view[crediCardRadioButtonMappings[button].associatedWidget + "Value"].text)
                }
            };
            allRadioButtions.forEach(function (button) {
                if (button === selectedButton) {
                    selectRadioButton(button);
                } else {
                    unSelectRadioButton(button);
                }
            });
            this.checkValidityMakeFastTransferForm();
        },
        /**call when frequency is changed in make transfer form - Resets the UI
         */
        onFrequencyChanged: function () {
            this.getFrequencyAndFastTransferFormLayout(this.view.lbxFrequency.selectedKey, this.view.lbxForHowLong.selectedKey);
            this.checkValidityMakeFastTransferForm();
        },
        /**Call Back when for how long listbox value is changed - Resets UI based on selection
         */
        onHowLongChange: function () {
            this.getForHowLongandFormLayout(this.view.lbxForHowLong.selectedKey);
            this.checkValidityMakeFastTransferForm();
        },
        /**Checks Validity For Make Transfer - Call on every field changes - Changes button state
         */
        checkValidityMakeFastTransferForm: function () {
            this.view.tbxNoOfRecurrences.skin = "sknTxtBrodere0e0e0";
            var formData = this.getFastTransferFormData({});
            if (formData.amount === null || formData.amount === "" || formData.amount === "NaN") {
                commonUtilities.disableButton(this.view.btnConfirm);
                return;
            }
            if (this.view.segTransferFrom.selectedRowItems === null || this.view.segTransferTo.selectedRowItems === null || this.view.segTransferFrom.selectedRowItems[0] === undefined || this.view.segTransferTo.selectedRowItems[0] === undefined) {
                commonUtilities.disableButton(this.view.btnConfirm);
                return;
            }
            if (formData.frequencyKey !== "Once" && ((formData.howLongKey === "NO_OF_RECURRENCES" && (formData.noOfRecurrences === null || formData.noOfRecurrences === "" || formData.noOfRecurrences === '0' || (isNaN(formData.noOfRecurrences) || !Number.isInteger(Number.parseFloat(formData.noOfRecurrences)) || Number.parseFloat(formData.noOfRecurrences) <= 0))) || (formData.howLongKey === 'ON_SPECIFIC_DATE' && !(formData.sendOnDate < formData.endOnDate)))) {
                commonUtilities.disableButton(this.view.btnConfirm);
                return;
            }
            if (this.view.calEndingOnNew.formattedDate === '') {
                commonUtilities.disableButton(this.view.btnConfirm);
                return;
            }
            commonUtilities.enableButton(this.view.btnConfirm);
            this.hideFieldError();
        },
        /**Hides The Field Error from make Transfer Form
         */
        hideFieldError: function () {
            this.view.flxAmount.skin = ViewConstants.SKINS.COMMON_FLEX_NOERRORSKIN;
            this.view.lblWarning.setVisibility(false);
        },
        /**Callback for calendar Field OnSelection
         * @member  frmTransfersController
         * @returns {void} None
         * @throws {void} None
         */
        setSkinToCalendar: function (widgetId) {
            widgetId.skin = ViewConstants.SKINS.COMMON_CALENDAR_NOERROR;
            this.hideFieldError();
        },
        checkTransactionLimit: function (viewModel) {
            var limit = viewModel.limit.accounts.filter(this.userAccountsFilter.bind(this, viewModel.formData));
            var userLimits = limit[0].limits;
            var errMsg = "";
            if (parseFloat(viewModel.formData.amount) < parseFloat(userLimits.MIN_TRANSACTION_LIMIT)) {
                errMsg = kony.i18n.getLocalizedString("i18n.common.minTransactionError") + " " + this.formatAmount(userLimits.MIN_TRANSACTION_LIMIT);
            } else if (parseFloat(viewModel.formData.amount) > parseFloat(userLimits.MAX_TRANSACTION_LIMIT)) {
                errMsg = kony.i18n.getLocalizedString("i18n.common.maxTransactionError") + " " + this.formatAmount(userLimits.MAX_TRANSACTION_LIMIT);
            } else {
                if (userLimits.AUTO_DENIED_TRANSACTION_LIMIT) {
                    var minValue = Math.min(parseFloat(userLimits.AUTO_DENIED_TRANSACTION_LIMIT), parseFloat(userLimits.MAX_TRANSACTION_LIMIT));
                    if (parseFloat(viewModel.formData.amount) > minValue) {
                        errMsg = kony.i18n.getLocalizedString("i18n.common.maxTransactionError") + " " + this.formatAmount(minValue);
                    }
                }
            }
            if (errMsg !== "") {
                this.showTransferError(errMsg);
            } else {
                this.navigateToConfirmTransfer(viewModel);
            }
        },
        formatAmount: function (amount, currencySymbolNotRequired) {
            if (currencySymbolNotRequired) {
                return applicationManager.getFormatUtilManager().formatAmount(amount);
            } else {
                return applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(amount);
            }
        },
        userAccountsFilter: function (formData, userAccount) {
            if (formData.accountFrom.accountID === userAccount.accountId) {
                return userAccount.limits;
            }
        },
        navigateToConfirmTransfer: function (viewModel) {
            if (this.validateFastTransferData(viewModel.formData, viewModel.makeTransferViewModel)) {
                var TransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule");
                TransferModule.presentationController.confirmFastTransfer(viewModel.makeTransferViewModel, viewModel.formData);
            }
        },
        /**Send Form Model to P.C for showing confirmation to user
         * @param  {object} makeTransferViewModel OBject containing form data
         */
        confirmFastTransfer: function (makeTransferViewModel) {
            var formData = this.getFastTransferFormData(makeTransferViewModel);
            formData.accountFrom = this.getFromAccount(makeTransferViewModel, formData.accountFromKey);
            formData.accountTo = this.getToAccount(makeTransferViewModel, formData.accountToKey, formData.Id);
            formData.currency = formData.accountTo.isInternationalAccount === "true" ? formData.currency : formData.fromAccountCurrency;
            formData.beneficiaryName = formData.accountTo.beneficiaryName;
            if (formData.accountTo.isInternationalAccount === "true") {
                formData.swiftCode = formData.accountTo.swiftCode;
            }
            formData.header = this.view.lblTransfers.text;
            if (makeTransferViewModel.editTransaction) {
                this.editTransferData = formData;
            }
            var TransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule");
            TransferModule.presentationController.fetchLimits(makeTransferViewModel, formData);
        },
        /** getMinMaxTransfersLimit  - Shows Confirmation for transfer
         * @param {String} type type of the account
         */
        getMinMaxTransfersLimit: function (type) {
            var limit = {
                minimum: "",
                maximum: ""
            };
            switch (type) {
                case "OWN_INTERNAL_ACCOUNTS":
                    limit.minimum = applicationManager.getConfigurationManager().getConfigurationValue("minKonyBankAccountsTransferLimit");
                    limit.maximum = applicationManager.getConfigurationManager().getConfigurationValue("maxKonyBankAccountsTransferLimit");
                    break;
                case "OTHER_INTERNAL_MEMBER":
                    limit.minimum = applicationManager.getConfigurationManager().getConfigurationValue("minOtherKonyAccountsTransferLimit");
                    limit.maximum = applicationManager.getConfigurationManager().getConfigurationValue("maxOtherKonyAccountsTransferLimit");
                    break;
                case "OTHER_EXTERNAL_ACCOUNT":
                    limit.minimum = applicationManager.getConfigurationManager().getConfigurationValue("minOtherBankAccountsTransferLimit");
                    limit.maximum = applicationManager.getConfigurationManager().getConfigurationValue("maxOtherBankAccountsTransferLimit");
                    break;
                case "INTERNATIONAL_ACCOUNT":
                    limit.minimum = applicationManager.getConfigurationManager().getConfigurationValue("minInternationalAccountsTransferLimit");
                    limit.maximum = applicationManager.getConfigurationManager().getConfigurationValue("maxInternationalAccountsTransferLimit");
                    break;
                case "P2P_ACCOUNT":
                    limit.minimum = applicationManager.getConfigurationManager().getConfigurationValue("minP2PLimit");
                    limit.maximum = applicationManager.getConfigurationManager().getConfigurationValue("maxP2PLimit");
                    break;
            }
            return limit;
        },
        /**Validated some of the business rules on transfer form data and shows field errors
         * @param  {object} formData Form Data
         * @returns {boolean} True if form data is correct and false if its not
         */
        validateFastTransferData: function (formData, makeTransferViewModel) {
            var formatUtilManager = applicationManager.getFormatUtilManager();
            var currTime = commonUtilities.getServerDateObject();
            var minMaxLimit = {};
            minMaxLimit = this.getMinMaxTransfersLimit(formData.accountTo.type);
            var deFormatAmount = this.removeCurrencyWithCommas(formData.amount);
            var amountFloats = parseFloat(deFormatAmount);
            currTime.setHours(0, 0, 0, 0); // Sets to midnight.
            var sendOnDate = formatUtilManager.getDateObjectFromDateComponents(formData.sendOnDateComponents);
            var endOnDate = formatUtilManager.getDateObjectFromDateComponents(formData.endOnDateComponents);
            if (formData.accountFrom === formData.accountTo) {
                this.showFieldError("i18n.transfers.error.cannotTransferToSame");
                this.view.lbxFromAccount.skin = ViewConstants.SKINS.LOANS_LISTBOX_ERRORSKIN;
                this.view.lbxToAccount.skin = ViewConstants.SKINS.LOANS_LISTBOX_ERRORSKIN;
                return false;
            } else if (!commonUtilities.isValidAmount(deFormatAmount)) {
                this.showFieldError("i18n.transfers.error.enterAmount");
                this.view.flxAmount.skin = ViewConstants.SKINS.LOANS_FLEX_ERROR;
                return false;
            } else if (sendOnDate.getTime() < currTime.getTime()) {
                this.showFieldError("i18n.transfers.error.invalidSendOnDate");
                this.view.calSendOnNew.skin = ViewConstants.SKINS.SKNFF0000CAL;
                return false;
            } else if (formData.frequencyKey !== 'Once') {
                if (formData.howLongKey === 'ON_SPECIFIC_DATE') {
                    if (endOnDate.getTime() < currTime.getTime()) {
                        this.showFieldError("i18n.transfers.errors.invalidEndOnDate");
                        this.view.calEndingOnNew.skin = ViewConstants.SKINS.SKNFF0000CAL;
                        return false;
                    }
                    if (endOnDate.getTime() === sendOnDate.getTime()) {
                        this.showFieldError("i18n.transfers.errors.sameEndDate");
                        this.view.calEndingOnNew.skin = ViewConstants.SKINS.SKNFF0000CAL;
                        return false;
                    }
                    if (endOnDate.getTime() < sendOnDate.getTime()) {
                        this.showFieldError("i18n.transfers.errors.beforeEndDate");
                        this.view.calEndingOnNew.skin = ViewConstants.SKINS.SKNFF0000CAL;
                        return false;
                    }
                }
                if (formData.howLongKey === 'NO_OF_RECURRENCES') {
                    if (formData.noOfRecurrences === null || formData.noOfRecurrences === "" || formData.noOfRecurrences === '0' || (isNaN(formData.noOfRecurrences) || !Number.isInteger(Number.parseFloat(formData.noOfRecurrences)) || Number.parseFloat(formData.noOfRecurrences) <= 0)) {
                        this.showFieldError("i18n.transfers.error.invalidNoOfRecurrences");
                        this.view.tbxNoOfRecurrences.skin = ViewConstants.SKINS.SKNTXTLATO424242BORDERFF0000OP100RADIUS2PX;
                        return false;
                    }
                }
            }
            this.view.tbxNoOfRecurrences.skin = "sknTxtBrodere0e0e0";
            this.view.calEndingOnNew.skin = ViewConstants.SKINS.COMMON_CALENDAR_NOERROR;
            this.view.calSendOnNew.skin = ViewConstants.SKINS.COMMON_CALENDAR_NOERROR;
            this.view.flxAmount.skin = ViewConstants.SKINS.COMMON_FLEX_NOERRORSKIN;
            this.hideFieldError();
            return true;
        },
        /**Show field error for transfer form
         * @param  {string} errorKey i18n key for Make Transfer form
         */
        showFieldError: function (errorKey) {
            this.view.lblWarning.setVisibility(true);
            this.view.lblWarning.text = kony.i18n.getLocalizedString(errorKey);
        },
        /**Validated some of the business rules on transfer form data and shows field errors
         * @param  {String} errorMsg Error message to be displayed
         */
        showFieldErrorMinMaxError: function (errorMsg) {
            this.view.lblWarning.setVisibility(true);
            this.view.lblWarning.text = errorMsg;
        },
        /**Returns Account Model Object for given account number
         * @param  {array} makeTransferViewModel Make Transfer Context
         * @param  {array} selectedKey AccountID
         * @returns {object} Account Model Object
         */
        getFromAccount: function (makeTransferViewModel, selectedKey) {
            return fromAccounts.filter(function (fromAccount) {
                return fromAccount.accountID === selectedKey
            })[0]
        },
        /**Returns Account Model Object or ExternalAccount Object for given account number
         * @param  {array} makeTransferViewModel Make Transfer Context
         * @param  {array} selectedKey AccountID
         * @returns {object} Account Model Object or ExternalAccount Object
         */
        getToAccount: function (makeTransferViewModel, selectedKey, selectedId) {
            return toAccounts.filter(function (toAccount) {
                if (toAccount.accountID) {
                    return toAccount.accountID === selectedKey;
                } else if (toAccount.PayPersonId) {
                    return toAccount.PayPersonId === selectedKey;
                } else if (toAccount.Id) {
                    if (toAccount.Id === selectedId) return toAccount.accountNumber === selectedKey;
                } else {
                    return toAccount.accountNumber === selectedKey;
                }
            })[0]
        },
        /**Removes commans from currency
         * @param  {number} amount amount entered
         * @returns {number} amount
         */
        removeCurrencyWithCommas: function (amount) {
            if (amount === undefined || amount === null) {
                return;
            }
            return applicationManager.getFormatUtilManager().deFormatAmount(amount);
        },
        /**  Returns form Data of Make Transfer Component
         * @returns {object} JSON containing all the form data
         */
        getFastTransferFormData: function () {
            var viewModel = {};
            if (this.view.segTransferFrom.selectedRowItems.length > 0 && this.view.segTransferTo.selectedRowItems.length > 0 && this.view.segTransferFrom.selectedRowItems[0] !== undefined && this.view.segTransferTo.selectedRowItems[0] !== undefined) {
                viewModel.accountFromKey = this.view.segTransferFrom.selectedRowItems[0].accountID;
                viewModel.accountToKey = this.view.segTransferTo.selectedRowItems[0].accountID;
                viewModel.Id = this.view.segTransferTo.selectedRowItems[0].Id;
                viewModel.toAccountCurrency = this.view.segTransferTo.selectedRowItems[0].currencyCode;
                viewModel.fromAccountCurrency = this.view.segTransferFrom.selectedRowItems[0].currencyCode;
            }
            if (this.isCreditCardSelected !== true) {
                (this.view.tbxAmount.text !== "") ? (viewModel.amount = this.removeCurrencyWithCommas(this.view.tbxAmount.text)) : (viewModel.amount = "");
            } else {
                if (this.view.lblRadioBtn1.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
                    viewModel.radioButtonSelected = this.view.lblRadioBtn1;
                    (this.view.lblCurrentBalanceValue.text !== "") ? (viewModel.amount = this.removeCurrencyWithCommas(this.view.lblCurrentBalanceValue.text)) : (viewModel.amount = "");
                } else if (this.view.lblRadioBtn2.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
                    viewModel.radioButtonSelected = this.view.lblRadioBtn2;
                    (this.view.lblStatementBalanceValue.text !== "") ? (viewModel.amount = this.removeCurrencyWithCommas(this.view.lblStatementBalanceValue.text)) : (viewModel.amount = "");
                } else if (this.view.lblRadioBtn3.text === ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO) {
                    viewModel.radioButtonSelected = this.view.lblRadioBtn3;
                    (this.view.lblMinimumDueBalanceValue.text !== "") ? (viewModel.amount = this.removeCurrencyWithCommas(this.view.lblMinimumDueBalanceValue.text)) : (viewModel.amount = "");
                } else {
                    viewModel.radioButtonSelected = this.view.lblRadioBtn4;
                    (this.view.tbxAmountValue.text !== "") ? (viewModel.amount = this.removeCurrencyWithCommas(this.view.tbxAmountValue.text)) : (viewModel.amount = "");
                }
            }
            viewModel.frequencyKey = this.view.lbxFrequency.selectedKey;
            viewModel.howLongKey = this.view.lbxForHowLong.selectedKey;
            viewModel.sendOnDate = this.view.calSendOnNew.formattedDate;
            viewModel.sendOnDateComponents = this.view.calSendOnNew.dateComponents;
            viewModel.endOnDate = this.view.calEndingOnNew.formattedDate;
            viewModel.endOnDateComponents = this.view.calEndingOnNew.dateComponents;
            viewModel.noOfRecurrences = this.view.tbxNoOfRecurrences.text.trim();
            viewModel.notes = this.view.txtNotes.text.trim();
            viewModel.currency = this.view.lbxCurrency.selectedKey;
            return viewModel;
        },
        getFrequencyAndFastTransferFormLayout: function (frequencyValue, howLangValue) {
            this.view.lbxFrequency.selectedKey = frequencyValue;
            this.view.lbxForHowLong.selectedKey = howLangValue;
            if (frequencyValue !== "Once" && howLangValue !== 'NO_OF_RECURRENCES') {
                this.makeLayoutfrequencyWeeklyDate();
            } else if (frequencyValue !== "Once" && howLangValue === 'NO_OF_RECURRENCES') {
                this.makeLayoutfrequencyWeeklyRecurrences();
            } else {
                this.makeLayoutfrequencyOnce();
            }
        },
        getForHowLongandFormLayout: function (value) {
            if (value === "ON_SPECIFIC_DATE") {
                this.makeLayoutfrequencyWeeklyDate();
            } else if (value === "NO_OF_RECURRENCES") {
                this.makeLayoutfrequencyWeeklyRecurrences();
            } else if (value === "CONTINUE_UNTIL_CANCEL") {
                this.makeLayoutfrequencyWeeklyCancel();
            }
        },
        makeLayoutfrequencyWeeklyDate: function () {
            this.view.lblForhowLong.setVisibility(true);
            this.view.lbxForHowLong.setVisibility(true);
            this.view.CopyflxContainer0be7f6bcaada644.setVisibility(true);
            this.view.flxCalEndingOn.setVisibility(true);
            var today = commonUtilities.getServerDateObject();
            //this.view.calEndingOnNew.dateComponents =[today.getDate(), today.getMonth() + 1, today.getFullYear()];
            this.view.lblSendOn.text = kony.i18n.getLocalizedString("i18n.transfers.start_date");
            this.view.lblNoOfRecOrEndingOn.text = kony.i18n.getLocalizedString("i18n.transfers.end_date");
            this.view.lblNoOfRecOrEndingOn.setVisibility(true);
            this.view.tbxNoOfRecurrences.setVisibility(false);
        },
        makeLayoutfrequencyWeeklyRecurrences: function () {
            this.view.lblForhowLong.setVisibility(true);
            this.view.lbxForHowLong.setVisibility(true);
            this.view.CopyflxContainer0be7f6bcaada644.setVisibility(true);
            this.view.flxCalEndingOn.setVisibility(false);
            this.view.lblNoOfRecOrEndingOn.setVisibility(true);
            this.view.tbxNoOfRecurrences.setVisibility(true);
            this.view.tbxNoOfRecurrences.text = "";
            this.view.lblSendOn.text = kony.i18n.getLocalizedString("i18n.transfers.send_on");
            this.view.lblNoOfRecOrEndingOn.text = kony.i18n.getLocalizedString("i18n.transfers.lblNumberOfRecurrences");
        },
        makeLayoutfrequencyWeeklyCancel: function () {
            this.view.lblForhowLong.setVisibility(true);
            this.view.lbxForHowLong.setVisibility(true);
            this.view.CopyflxContainer0be7f6bcaada644.setVisibility(true);
            this.view.flxCalEndingOn.setVisibility(false);
            this.view.lblNoOfRecOrEndingOn.setVisibility(false);
            this.view.tbxNoOfRecurrences.setVisibility(false);
        },
        makeLayoutfrequencyOnce: function () {
            this.view.lblSendOn.text = kony.i18n.getLocalizedString("i18n.transfers.send_on");
            this.view.lblForhowLong.setVisibility(false);
            this.view.lbxForHowLong.setVisibility(false);
            this.view.CopyflxContainer0be7f6bcaada644.setVisibility(false);
            this.view.flxCalEndingOn.setVisibility(false);
            this.view.lblNoOfRecOrEndingOn.setVisibility(false);
            this.view.tbxNoOfRecurrences.setVisibility(false);
        }
    };
});