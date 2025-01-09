define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants', 'CampaignUtility'], function(FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants, CampaignUtility) {
     
    var orientationHandler = new OrientationHandler();
    var accountId;
    return {
        transitDays: 0,
        isSingleCustomerProfile: true,
        primaryCustomerId: [],
        profileAccess: "",
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;

            this.presenter = applicationManager.getModulesPresentationController({ 'appName': 'BillPayMA', 'moduleName': 'BillPaymentUIModule' });
            this.view.flxAddPayee.onClick = function() {
                this.presenter.showBillPaymentScreen({
                    context: "AddPayee"
                })
            }.bind(this);
            this.view.flxMakeOneTimePayment.onClick = function() {
                this.presenter.showBillPaymentScreen({
                    context: "MakeOneTimePayment"
                })
            }.bind(this);
        },
        onBreakpointChange: function(form, width) {
            var scopeObj = this;
            FormControllerUtility.setupFormOnTouchEnd(width);  
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            this.view.CustomPopup.onBreakpointChangeComponent(scopeObj.view.CustomPopup, width);
            this.view.deletePopup.onBreakpointChangeComponent(scopeObj.view.deletePopup, width);
            this.view.btnSkipRight.isVisible = this.view.flxRight.isVisible? true : false;
        },
        preShow: function() {
            var scopeObj = this;
            this.isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
            this.primaryCustomerId = applicationManager.getUserPreferencesManager().primaryCustomerId;
            this.profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
            this.view.customheadernew.activateMenu("Bill Pay", "Pay A Bill");
            this.view.flxDowntimeWarning.setVisibility(false);
            this.view.flxError.setVisibility(false);
            CampaignUtility.fetchPopupCampaigns();
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader', 'flxFooter', 'flxMain']);
            this.view.lblEbillActive.toolTip = kony.i18n.getLocalizedString("i18n.payments.eBill");
            this.view.btnViewEbillMobile.toolTip = kony.i18n.getLocalizedString("i18n.billPay.viewEBill");
            this.view.imgCancelFilterFrom.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
            this.view.imgLoadingIndicatorFrom.toolTip = kony.i18n.getLocalizedString("i18n.PayAPerson.payAPersonDeregister");
            this.view.btnViewEbill.toolTip = kony.i18n.getLocalizedString("i18n.billPay.viewEBill");
            this.view.btnConfirm.toolTip = kony.i18n.getLocalizedString("i18n.common.proceed");
            this.view.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
            this.view.btnYes.toolTip = kony.i18n.getLocalizedString("i18n.common.yes");
            this.view.btnNo.toolTip = kony.i18n.getLocalizedString("i18n.common.Not");
            this.view.imgCross.toolTip = kony.i18n.getLocalizedString("i18n.common.close");
            this.view.imgCancel.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.closeAccount");
            this.view.imgDownload.toolTip = kony.i18n.getLocalizedString("i18n.common.Download");
            this.view.imgFlip.toolTip = kony.i18n.getLocalizedString("i18n.payments.flip");
            this.view.imgZoom.toolTip = kony.i18n.getLocalizedString("i18n.payments.zoom");
            this.view.flxDropdownIcon.onClick = function () {
                if(scopeObj.view.flxFromSegment.isVisible){
                    scopeObj.view.flxDropdownIcon.accessibilityConfig = {
                        "a11yLabel": "Click to select another account from accounts",
                        "a11yARIA": {
                            "tabindex": 0,
                            "role": "button",
                            "aria-expanded": false
                        }
                    }
                }
                else{
                    scopeObj.view.flxDropdownIcon.accessibilityConfig = {
                        "a11yLabel": "Click to select another account from accounts",
                        "a11yARIA": {
                            "tabindex": 0,
                            "role": "button",
                            "aria-expanded": true
                        }
                    }
                }
                scopeObj.view.flxFromSegment.setVisibility(!scopeObj.view.flxFromSegment.isVisible);
            }
            this.view.customheadernew.btnSkipNav.onClick = function() {
                scopeObj.view.lblPayABill.setActive(true);
            }
            this.view.flxLogout.onKeyPress = this.onKeyPressCallBack;
            this.view.flxViewEbill.onKeyPress = this.EbillKeyPressCallBack;
            this.view.btnSkipRight.onClick = function() {
                scopeObj.view.flxAddPayee.setActive(true);
            }
           
        },
        onKeyPressCallBack: function(eventObject, eventPayload) {
            var self = this;
            if (eventPayload.keyCode === 27) {
                if (self.view.flxDialogs.isVisible === true) {
                    self.view.flxDialogs.isVisible = false;
                    this.view.customheadernew.btnLogout.setActive(true);
                }
            }
        },
        EbillKeyPressCallBack: function(eventObject, eventPayload) {
            var self = this;
            if (eventPayload.keyCode === 27) {
                if (self.view.flxViewEbill.isVisible === true) {
                    self.view.flxViewEbill.isVisible = false;
                    self.view.btnViewEbill.setActive(true);
                }
            }
        },
        postShow: function() {
			this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
			this.view.flxViewEbillContainer.doLayout = CommonUtilities.centerPopupFlex;
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            applicationManager.executeAuthorizationFramework(this);
            //           	if(applicationManager.getConfigurationManager().isCombinedUser === "true" || applicationManager.getConfigurationManager().isSMEUser === "true"){
            this.view.flxFrom.setVisibility(true);
            this.view.lbxPayFromValue.setVisibility(false);
            // 			}
            var currencyType = this.view.lblCurrencyType.text;
            this.view.txtSearch.accessibilityConfig = {
               "a11yLabel": "Enter Payment Amount in "+currencyType
           };
           var selectedAccount = this.view.lblSelectAccount.text;
           var lblAmount = this.view.lblFromAmount.text;
           this.view.flxFrom.accessibilityConfig ={
           "a11yLabel": "Pay Account from button currently Selected " + selectedAccount + lblAmount,
           "a11yARIA": {
               "tabindex": 0,
               "role":"textbox"
           }
           }
           this.view.flxDropdownIcon.accessibilityConfig ={
            "a11yLabel": "Click to select another account from accounts",
            "a11yARIA": {
                "tabindex": 0,
                "role":"button",
                "aria-expanded":false
            }
            }
            this.view.segTransferFrom.accessibilityConfig ={
                "a11yARIA": {
                    "tabindex": -1
                }
 
            }

            this.accessibilityFocusSetup();
        },
        /**
         * Set foucs handlers for skin of parent flex on input focus 
         */
        accessibilityFocusSetup: function() {
            let widgets = [
                [this.view.txtEnterAmount, this.view.flxEnterPayAmount],
                [this.view.txtSearch, this.view.flxEnterAmount],
                [this.view.txtTransferFrom, this.view.flxFrom]
            ]
            for (let i = 0; i < widgets.length; i++) {
                CommonUtilities.setA11yFoucsHandlers(widgets[i][0], widgets[i][1], this)
            }
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
            if (viewModel.serverError) {
                this.view.rtxDowntimeWarning.text = viewModel.serverError;
                this.view.flxDowntimeWarning.setVisibility(true);
                this.view.flxFormContent.forceLayout();
            }
            if (viewModel.singleBillPayData) {
                this.transitDays = viewModel.singleBillPayData.transitDays;
                this.setViewPayABill(viewModel.singleBillPayData.cif);
                this.setSinglePayementValue(viewModel.singleBillPayData, viewModel.context);
            }
            if (viewModel.payees) {
                this.loadAllPayees(viewModel.payees);
            }
            if (viewModel.billDueData) {
                this.bindTotalEbillAmountDue(viewModel.billDueData);
            }
            if (viewModel.campaign) {
                CampaignUtility.showCampaign(viewModel.campaign, this.view, "flxMain");
            }
        },
        /**
         * used to show pay a bill screen
         */
        setViewPayABill: function(cif) {
            var scopeObj = this;
            this.view.lblCurrencyType.text = applicationManager.getConfigurationManager().getCurrencyCode();
            this.view.lblCurrencyPayType.text = applicationManager.getConfigurationManager().getCurrencyCode();
            // CommonUtilities.setText(this.view.lblCurrencyType, applicationManager.getConfigurationManager().getCurrencyCode(), CommonUtilities.getaccessibilityConfig());
            // CommonUtilities.setText(this.view.lblCurrencyPayType, applicationManager.getConfigurationManager().getCurrencyCode(), CommonUtilities.getaccessibilityConfig());
            var billPayAccounts = this.presenter.getSingelBillPaySupportedAccounts();
            if (cif) {
                // let toMembershipId = JSON.parse(cif)[0].coreCustomerId.split(',');
                let toMembershipId = [];
                JSON.parse(cif).forEach(x => toMembershipId.push(...x.coreCustomerId.split(',')));
                billPayAccounts = billPayAccounts.filter(x => toMembershipId.includes(x.Membership_id));
            }
            //             if(applicationManager.getConfigurationManager().isCombinedUser === "true"|| applicationManager.getConfigurationManager().isSMEUser === "true"){
            scopeObj.view.flxFrom.setVisibility(true);
            scopeObj.view.flxCancelFilterFrom.setVisibility(false);
            scopeObj.view.flxDropdownIcon.setVisibility(true);
            scopeObj.view.imgCancelFilterFrom.src = "active_down_btn.png";
            scopeObj.view.txtTransferFrom.setVisibility(true);
            scopeObj.view.txtTransferFrom.text = "";
            this.view.segTransferFrom.rowtemplate = "flxFromAccountsList";
            this.view.segTransferFrom.sectionHeaderTemplate = "flxTransfersFromListHeader";
            this.view.segTransferFrom.widgetDataMap = {
                "flxFromAccountsList": "flxFromAccountsList",
                "flxAccountListItem": "flxAccountListItem",
                "lblAccountName": "lblAccountName",
                "flxAmount": "flxAmount",
                "flxSeparator": "flxSeparator",
                "lblSeparator": "lblSeparator",
                "lblAmount": "lblAmount",
                "lblCurrencySymbol": "lblCurrencySymbol",
                "flxTransfersFromListHeader": "flxTransfersFromListHeader",
                "lblTransactionHeader": "lblTransactionHeader",
                "imgDropDown": "imgDropDown",
                "flxDropDown": "flxDropDown",
                "flxIcons": "flxIcons",
                "imgIcon": "imgIcon",
                "flxBankIcon": "flxBankIcon",
                "imgBankIcon": "imgBankIcon",
                "lblAccType": "lblAccType"
            };
            var widgetFromData = this.isSingleCustomerProfile ? this.getDataWithAccountTypeSections(billPayAccounts) : this.getDataWithSections(billPayAccounts);
            if (widgetFromData && widgetFromData.length > 0) {
                this.view.segTransferFrom.setData(widgetFromData);
                this.view.flxLoadingContainerFrom.setVisibility(false);
                this.view.flxDropdownIcon.setVisibility(true);
                this.view.flxNoResultsFrom.setVisibility(false);
            } else {
                this.view.flxLoadingContainerFrom.setVisibility(false);
                this.view.flxDropdownIcon.setVisibility(true);
                this.view.flxNoResultsFrom.setVisibility(true);
            }
            this.view.txtTransferFrom.onTouchStart = function() {
                scopeObj.view.flxTypeIcon.setVisibility(false);
                scopeObj.view.lblSelectAccount.setVisibility(false);
                scopeObj.view.flxFromSegment.setVisibility(true);
                scopeObj.view.segTransferFrom.setVisibility(true);
                scopeObj.view.lblFromAmount.setVisibility(false);
                scopeObj.view.forceLayout();
            };
            this.view.segTransferFrom.onRowClick = this.onFromAccountSelection.bind(this);
            this.view.flxCancelFilterFrom.onClick = function() {
                scopeObj.view.txtTransferFrom.text = "";
                // scopeObj.view.flxCancelFilterFrom.setVisibility(false);
                scopeObj.view.flxFromSegment.setVisibility(!scopeObj.view.flxFromSegment.isVisible);
            };
            this.view.flxFrom.onClick = function() {
                if (scopeObj.view.txtTransferFrom.isVisible === false) {
                    scopeObj.view.txtTransferFrom.setVisibility(true);
                    scopeObj.view.txtTransferFrom.setFocus();
                    scopeObj.view.lblSelectAccount.setVisibility(false);
                    scopeObj.view.flxTypeIcon.setVisibility(false);
                    scopeObj.view.lblFromAmount.setVisibility(false);
                    scopeObj.view.flxCancelFilterFrom.setVisibility(false);
                    scopeObj.view.flxDropdownIcon.setVisibility(true);
                    scopeObj.view.flxFromSegment.setVisibility(true);
                }
            };
            //             }
            // this.view.lbxPayFromValue.masterData = FormControllerUtility.getListBoxDataFromObjects(billPayAccounts, "accountID", CommonUtilities.getAccountDisplayNameWithBalance);
            // this.setFromAccountCurrency(billPayAccounts);
            // this.view.lbxPayFromValue.onSelection = function() {
            //     scopeObj.setFromAccountCurrency(billPayAccounts);
            // };
            this.view.lbxFrequency.masterData = this.presenter.getFrequencies();
            this.view.lbxForHowLong.masterData = this.presenter.getHowLongValues();
            CommonUtilities.disableOldDaySelection(this.view.calSendOn);
            CommonUtilities.disableOldDaySelection(this.view.CalDeliverBy);
            CommonUtilities.disableOldDaySelection(this.view.calEndingOn);
            var dateFormat = applicationManager.getFormatUtilManager().getDateFormat();
            this.view.calSendOn.dateFormat = dateFormat;
            this.view.CalDeliverBy.dateFormat = dateFormat;
            this.view.calEndingOn.dateFormat = dateFormat;
            this.view.calSendOn.dateComponents = CommonUtilities.getServerDateComponent();
            this.view.CalDeliverBy.dateComponents = CommonUtilities.getServerDateComponent();
            this.view.calEndingOn.dateComponents = CommonUtilities.getServerDateComponent();
            this.view.calSendOn.validStartDate = CommonUtilities.getServerDateComponent();
            this.view.CalDeliverBy.validStartDate = CommonUtilities.getServerDateComponent();
            this.view.calEndingOn.validStartDate = CommonUtilities.getServerDateComponent();
            if (kony.application.getCurrentBreakpoint() === 640) {
                this.singleBillPayAmountField = FormControllerUtility.wrapAmountField(scopeObj.view.txtEnterAmount).onKeyUp(this.checkValidityBillPay.bind(this));
            } else {
                this.singleBillPayAmountField = FormControllerUtility.wrapAmountField(scopeObj.view.txtSearch).onKeyUp(this.checkValidityBillPay.bind(this));
            }
            this.view.txtNotes.maxTextLength = OLBConstants.NOTES_LENGTH;
            this.view.lbxFrequency.onSelection = this.onFrequencyChanged.bind(this);
            this.view.lbxForHowLong.onSelection = this.onHowLongChange.bind(this);
            this.view.txtEndingOn.onKeyUp = this.checkValidityBillPay.bind(this);
            this.renderCalendars(this.view.calSendOn, this.view.calEndingOn, this.view.CalDeliverBy);
        },
        /**
         * setting the position of calendars
         */
        renderCalendars: function() {
            for (var i = 0; i < arguments.length; i++) {
                var context1 = {
                    "widget": arguments[i],
                    "anchor": "bottom"
                };
                arguments[i].setContext(context1);
            }
        },
        /**
         * construct a pay A Bill object and send to single Bill Pay
         * @param {object} data payee Payment object
         * @param {string} context  context
         */
        setSinglePayementValue: function(data, context) {
            var scopeObj = this;
            var transitDays;
            if (data.transitDays) {
                transitDays = data.transitDays;
            } else {
                transitDays = 0;
            }
            this.view.txtNotes.text = data.notes ? data.notes : '';
            var preferredAccNum = this.presenter.getBillPayPreferedAccountNumber();
            // this.view.lbxPayFromValue.selectedKey = data.fromAccountNumber ? data.fromAccountNumber : (preferredAccNum ? preferredAccNum : this.view.lbxPayFromValue.masterData[0][0]);
            this.view.calSendOn.dateComponents = data.sendOn ? scopeObj.getDateComponents(data.sendOn, applicationManager.getFormatUtilManager().getDateFormat().toUpperCase()) : scopeObj.getvalidStartDate();
            this.view.calSendOn.onSelection = scopeObj.setNewDeliverDateForPayABill.bind(scopeObj, transitDays);
            this.view.lblDelieverBy.text = "(" + kony.i18n.getLocalizedString("i18n.billPay.DeliverBy") + ":" + scopeObj.getNextDeliveryDate(null, transitDays) + ")";
            scopeObj.setDefaultBillDetails(data);
            scopeObj.quickActionsFromBillPay(data, context);
            scopeObj.setFrequencyForPayABill(data);
            scopeObj.eBillForPayABill(data);
            scopeObj.setAmounForPayABilll(data, context);
            // scopeObj.enableAfterSelect(data,context);
            scopeObj.view.btnCancel.onClick = data.onCancel.bind(this);
            scopeObj.view.btnConfirm.onClick = this.sendSinglePayABillPayData.bind(this, data, context);
            //           if(applicationManager.getUserPreferencesManager().isSingleCustomerProfile === false){
            //if(applicationManager.getConfigurationManager().isCombinedUser === "true"){
            scopeObj.view.flxPayeeIcon.isVisible = false; //this.profileAccess === "both" ? true : false;
            scopeObj.view.lbxPayFromValue.setVisibility(false);
            scopeObj.view.flxFrom.setVisibility(true);
            scopeObj.view.lblIcon.text = data.isBusinessPayee === "1" ? "r" : "s";
            //scopeObj.view.flxFromSegment.setVisibility(true);
            scopeObj.view.txtTransferFrom.setVisibility(true);
            scopeObj.view.txtTransferFrom.text = "";
            scopeObj.view.lblSelectAccount.setVisibility(false);
            scopeObj.view.flxTypeIcon.setVisibility(false);
            scopeObj.view.lblFromAmount.setVisibility(false);
            //             }else{
            //               scopeObj.view.flxPayeeIcon.setVisibility(false);
            //               scopeObj.view.lbxPayFromValue.setVisibility(true);
            //               scopeObj.view.flxFrom.setVisibility(false);
            //             }
            scopeObj.preSelectFromAccount(data.fromAccountNumber || preferredAccNum);
        },
        setNewDeliverDateForPayABill: function(transitDays) {
            var selectedDate = this.view.calSendOn.dateComponents;
            var sendOnDate = selectedDate[1] + "/" + selectedDate[0] + "/" + selectedDate[2];
            var nextDeliveyDateForPayABill = this.getNextDeliveryDate(sendOnDate, transitDays);
            if (this.view.lbxFrequency.selectedKey === "Once") {
                this.view.lblDelieverBy.text = "(" + kony.i18n.getLocalizedString("i18n.billPay.DeliverBy") + ": " + nextDeliveyDateForPayABill + ")";
            } else {
                this.view.lblDelieverBy.text = "(" + kony.i18n.getLocalizedString("i18n.billPay.DeliveryIn") + " " + transitDays + kony.i18n.getLocalizedString("kony.mb.BillPay.TransactionDays") + ")";
            }
        },
        addDays: function(date, days) {
            days = Number(days);
            var result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        },
        getNextDeliveryDate: function(currentDate, transitDays) {
            var todaysDateObject;
            var selectedDate;
            if (currentDate === null) {
                selectedDate = this.view.calSendOn.dateComponents;
                currentDate = selectedDate[1] + "/" + selectedDate[0] + "/" + selectedDate[2];
            }
            todaysDateObject = new Date(currentDate);
            var nextDate = this.addDays(todaysDateObject, transitDays);
            var month = (nextDate.getMonth() + 1) >= 10 ? (nextDate.getMonth() + 1) : ("0" + (nextDate.getMonth() + 1));
            var day = nextDate.getDate() > 9 ? nextDate.getDate() : ("0" + nextDate.getDate());
            return CommonUtilities.isMirrorLayoutEnabled() ? (day + "/" + month + "/" + nextDate.getFullYear()) : (month + "/" + day + "/" + nextDate.getFullYear());
        },
        enableAfterSelect: function() {
            //          if(applicationManager.getConfigurationManager().isCombinedUser === "true"){
            if (this.view.txtTransferFrom.text !== "") {
                return false;
            } else {
                return true;
            }
            //          }else{
            //            return false;
            //          }
        },
        /**
         * used to set BillId
         * @param {object} data data
         */
        setDefaultBillDetails: function(data) {
            var nonValue = kony.i18n.getLocalizedString("i18n.common.none");
            if (data.billid === "0" || data.billid === undefined || data.billid === null) {
                lblDueDateValue1 = {
                    "text": nonValue,
                },
                lblBillValue1 = {
                    "text": nonValue,
                },
                this.view.lblDueDateValue.text = nonValue;
			  this.view.lblDueDateValue1.text = (this.view.lblDueDate.text) + " " + nonValue;
                this.view.lblBillValue.text = nonValue;
				this.view.lblBillValue1.text = (this.view.lblBill.text) + " " + nonValue;
                // CommonUtilities.setText(this.view.lblDueDateValue, nonValue, CommonUtilities.getaccessibilityConfig());
                // CommonUtilities.setText(this.view.lblBillValue, nonValue, CommonUtilities.getaccessibilityConfig());
            } else {
                lblDueDateValue1 = {
                    "text": data.billDueDate,
                },
                lblBillValue1 = {
                    "text": data.billDueDate,
                },
                 
                 this.view.lblDueDateValue.text = data.billDueDate;
                 this.view.lblDueDateValue1.text = data.billDueDate;
                 this.view.lblBillValue.text = data.billDueDate;
                 this.view.lblBillValue1.text = data.billDueDate;
                // CommonUtilities.setText(this.view.lblDueDateValue, data.billDueDate ? CommonUtilities.getFrontendDateString(data.billDueDate) : nonValue, CommonUtilities.getaccessibilityConfig());
                // CommonUtilities.setText(this.view.lblBillValue, data.dueAmount ? CommonUtilities.formatCurrencyWithCommas(data.dueAmount) : nonValue, CommonUtilities.getaccessibilityConfig());
            }
            if (data.lastPaidAmount) {
                this.view.lblLastPayment.text = kony.i18n.getLocalizedString("i18n.billPay.lastPayment") + ":" + (data.lastPaidAmount ? CommonUtilities.formatCurrencyWithCommas(data.lastPaidAmount) : nonValue) + " " + kony.i18n.getLocalizedString("i18n.common.on") + " " + CommonUtilities.getFrontendDateString(data.lastPaidDate, CommonUtilities.getaccessibilityConfig());
                //CommonUtilities.setText(this.view.lblLastPayment, kony.i18n.getLocalizedString("i18n.billPay.lastPayment") + ":" + (data.lastPaidAmount ? CommonUtilities.formatCurrencyWithCommas(data.lastPaidAmount) : nonValue) + " " + kony.i18n.getLocalizedString("i18n.common.on") + " " + CommonUtilities.getFrontendDateString(data.lastPaidDate, CommonUtilities.getaccessibilityConfig()));
            } else {
                this.view.lblLastPayment.text = kony.i18n.getLocalizedString("i18n.billPay.lastPayment") + ": " + kony.i18n.getLocalizedString("i18n.billPay.noPaymentActivity");
                // CommonUtilities.setText(this.view.lblLastPayment, kony.i18n.getLocalizedString("i18n.billPay.lastPayment") + ": " + kony.i18n.getLocalizedString("i18n.billPay.noPaymentActivity"), CommonUtilities.getaccessibilityConfig());
            }
        },
        /**
         * used data for pay A Bill
         * @param {object} data
         * @param {string} context
         */
        quickActionsFromBillPay: function(data, context) {
            if (context === "quickAction" || data.context === "quickAction") {
                if(this.allPayees.length > 0){this.view.lbxpayee.selectedKey = data.payeeId ? data.payeeId : this.view.lbxpayee.masterData[0][0]};
                this.view.lbxpayee.setVisibility(true);
                this.onPayeeSelect();
                this.view.lblPayeeName.setVisibility(false);
                this.view.lblLastPayment.setVisibility(false);
                this.fromAccountNumber = data.fromAccountNumber;
            } else {
                this.view.lbxpayee.setVisibility(false);
                if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                    this.view.lblLastPayment.setVisibility(false);
                    this.view.flxPayeeIcon.top = "0dp";
                } else {
                    this.view.lblLastPayment.setVisibility(true);
                }
                lblPayeeName1 = {
					"text" : data.payeeNickName ? data.payeeNickName : data.payeeNickname,
				},
                this.view.lblPayeeName.setVisibility(true);
                this.view.lblPayeeName.text = data.payeeNickName ? data.payeeNickName : data.payeeNickname;
                this.view.lblPayeeName1.text= (this.view.lblPayee.text) + " " + (data.payeeNickName ? data.payeeNickName : data.payeeNickname)
                //CommonUtilities.setText(this.view.lblPayeeName, data.payeeNickName ? data.payeeNickName : data.payeeNickname, CommonUtilities.getaccessibilityConfig());
                this.fromAccountNumber = null;
            }
            this.view.forceLayout();
        },
        /**
         * Frequency For Pay A Bill
         * @param {object} data
         */
        setFrequencyForPayABill: function(data) {
            var scopeObj = this;
            this.view.lbxFrequency.selectedKey = data.frequencyType ? data.frequencyType : this.view.lbxFrequency.masterData[0][0];
            if (data.frequencyStartDate !== null && data.frequencyStartDate !== "" && data.frequencyEndDate !== null && data.frequencyEndDate !== "") {
                this.view.lbxForHowLong.selectedKey = "ON_SPECIFIC_DATE";
                this.view.calEndingOn.dateComponents = data.frequencyEndDate ? scopeObj.getDateComponents(data.frequencyEndDate, applicationManager.getFormatUtilManager().getDateFormat().toUpperCase()) : scopeObj.getvalidStartDate();
            } else if (data.numberOfRecurrences !== null && data.numberOfRecurrences !== "" && data.numberOfRecurrences !== "0") {
                this.view.lbxForHowLong.selectedKey = "NO_OF_RECURRENCES";
                this.view.txtEndingOn.text = data.numberOfRecurrences;
            }
            scopeObj.getFrequencyAndFormLayout(this.view.lbxFrequency.selectedKey, this.view.lbxForHowLong.selectedKey, data.transitDays);
        },
        /**
         * EBill For Pay A Bill
         * @param {object} data
         */
        eBillForPayABill: function(data) {
            var scopeObj = this;
            if (data.eBillSupport === "true") {
                scopeObj.view.lblEbillActive.setVisibility(true);
                if (data.eBillStatus === "1") {
                    var eBillViewModel = {
                        billGeneratedDate: CommonUtilities.getFrontendDateString(data.billGeneratedDate),
                        amount: CommonUtilities.formatCurrencyWithCommas(data.dueAmount),
                        ebillURL: data.ebillURL
                    };
                    scopeObj.view.lblEbillActive.skin = ViewConstants.SKINS.SKNBTNEBILLACTIVE;
                    //scopeObj.view.lblEbillActive.onClick = this.viewEBill.bind(this, eBillViewModel,true);
                    if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
                        scopeObj.view.btnViewEbillMobile.setVisibility(true);
                        scopeObj.view.btnViewEbill.setVisibility(false);
                        scopeObj.view.btnViewEbillMobile.onClick = this.viewEBill.bind(this, eBillViewModel);
                    } else {
                        scopeObj.view.btnViewEbillMobile.setVisibility(false);
                        scopeObj.view.btnViewEbill.setVisibility(true);
                        scopeObj.view.btnViewEbill.onClick = this.viewEBill.bind(this, eBillViewModel);
                    }
                } else {
                    scopeObj.view.lblEbillActive.skin = ViewConstants.SKINS.SKNBTNIMGINACTIVEEBILL;
                    //scopeObj.view.lblEbillActive.onClick = null;
                    scopeObj.view.btnViewEbillMobile.setVisibility(false);
                    scopeObj.view.btnViewEbill.setVisibility(false);
                }
            } else {
                scopeObj.view.lblEbillActive.setVisibility(false);
                scopeObj.view.btnViewEbillMobile.setVisibility(false);
                scopeObj.view.btnViewEbill.setVisibility(false);
            }
            scopeObj.view.flxBillPayeeInfo.forceLayout();
        },
        /**
         * method to show view the ebill.
         * @param {object} viewModel ebill information
         */
        viewEBill: function(viewModel) {
            var scopeObj = this;
            if (viewModel) {
                var nonValue = kony.i18n.getLocalizedString("i18n.common.none");
                scopeObj.view.lblPostDateValue.text = viewModel.billGeneratedDate || nonValue;
                scopeObj.view.lblAmountValue.text = viewModel.amount || nonValue;
                // CommonUtilities.setText(scopeObj.view.lblPostDateValue, viewModel.billGeneratedDate || nonValue, CommonUtilities.getaccessibilityConfig());
                // CommonUtilities.setText(scopeObj.view.lblAmountValue, viewModel.amount || nonValue, CommonUtilities.getaccessibilityConfig());
                scopeObj.view.flxMemo.setVisibility(false);
                if (viewModel.ebillURL) {
                    scopeObj.view.flxDownload.onClick = scopeObj.downloadFile.bind(scopeObj, {
                        'url': viewModel.ebillURL
                    });
                    scopeObj.view.flxDownload.setVisibility(true);
                    scopeObj.view.imgEBill.src = viewModel.ebillURL;
                } else {
                    scopeObj.view.flxDownload.setVisibility(false);
                    scopeObj.view.flxDownload.onClick = null;
                }
                this.view.imgZoom.setVisibility(false)
                this.view.imgFlip.setVisibility(false)
                scopeObj.view.flxViewEbill.setVisibility(true);
                // scopeObj.view.flxDialogs.setVisibility(true);
                scopeObj.view.lblTransactions.setFocus(true);
            }
            scopeObj.view.flxImgCancel.onClick = function() {
                scopeObj.view.flxViewEbill.setVisibility(false);
                // scopeObj.view.flxDialogs.setVisibility(false);
                    scopeObj.view.btnViewEbill.setActive(true);
            };
            scopeObj.view.flxViewEbill.lblTransactions.setActive(true);
        },
        /**
         * setting amount value
         * @param {object} data data
         * @param {object} context context
         */
        setAmounForPayABilll: function(data, context) {
            var scopeObj = this;
            if (data.amount) {
                if (context === "acknowledgement") {
                    kony.application.getCurrentBreakpoint() === 640 ? (this.view.txtEnterAmount.text = '') : (this.view.txtSearch.text = '');
                    FormControllerUtility.disableButton(scopeObj.view.btnConfirm);
                } else {
                    var amountValue = data.amount ? CommonUtilities.formatCurrencyWithCommas(data.amount, true) : '';
                    kony.application.getCurrentBreakpoint() === 640 ? (this.view.txtEnterAmount.text = amountValue) : (this.view.txtSearch.text = amountValue);
                    FormControllerUtility.enableButton(scopeObj.view.btnConfirm);
                }
            } else {
                kony.application.getCurrentBreakpoint() === 640 ? (this.view.txtEnterAmount.text = '') : (this.view.txtSearch.text = '');
                FormControllerUtility.disableButton(scopeObj.view.btnConfirm);
            }
        },
        setFromAccountCurrency: function(billPayAccounts) {
            var selectedAccount = applicationManager.getConfigurationManager().isRetailUser === "true" ? this.view.lbxPayFromValue.masterData[0][0] : billPayAccounts[0].accountID;
            var fromAccount = this.getFromAccount(billPayAccounts, selectedAccount);
            this.view.lblCurrencyType.text = applicationManager.getFormatUtilManager().getCurrencySymbol(fromAccount.currencyCode);
        },
        getFromAccount: function(data, value) {
            data = data.filter(function(item) {
                return item.Account_id === value
            });
            return data[0];
        },
        /**
         * method for handling On onHowLongChange Change
         */
        checkValidityBillPay: function() {
            var scopeObj = this;
            var disableConfirmButton = function() {
                FormControllerUtility.disableButton(scopeObj.view.btnConfirm);
            }.bind(this);
            if (!this.singleBillPayAmountField.isValidAmount()) {
                disableConfirmButton();
                return;
            }
            if (this.view.lbxFrequency.selectedKey !== "Once" && this.view.lbxForHowLong.selectedKey === "NO_OF_RECURRENCES" && this.view.txtEndingOn.text === "") {
                disableConfirmButton();
                return;
            }
            if (this.view.txtEndingOn.text && (isNaN(this.view.txtEndingOn.text) || parseInt(this.view.txtEndingOn.text) <= 0)) {
                disableConfirmButton();
                return;
            }
            if (this.enableAfterSelect()) {
                disableConfirmButton();
                return;
            }
            FormControllerUtility.enableButton(scopeObj.view.btnConfirm);
        },
        /**
         * onFrequencyChanged:   Method for handling On Frequeny Change
         */
        onFrequencyChanged: function() {
            var scopeObj = this;
            scopeObj.getFrequencyAndFormLayout(this.view.lbxFrequency.selectedKey, this.view.lbxForHowLong.selectedKey, this.transitDays);
            scopeObj.checkValidityBillPay();
        },
        /**
         * onHowLongChange:  Method for handling On onHowLongChange Change
         */
        onHowLongChange: function() {
            var scopeObj = this;
            scopeObj.getForHowLongandFormLayout(this.view.lbxForHowLong.selectedKey, this.transitDays);
            scopeObj.checkValidityBillPay();
        },
        /**
         * getFrequencyAndFormLayout:  Method for handling On onHowLongChange Change
         * @param {String} frequencyValue frequency value
         * @param {String} howLongValue has long value
         */
        getFrequencyAndFormLayout: function(frequencyValue, howLongValue, days) {
            if (frequencyValue !== "Once" && howLongValue !== 'NO_OF_RECURRENCES') {
                this.makeLayoutfrequencyWeeklyDate(days);
            } else if (frequencyValue !== "Once" && howLongValue === 'NO_OF_RECURRENCES') {
                this.makeLayoutfrequencyWeeklyRecurrences();
            } else {
                this.makeLayoutfrequencyOnce(days);
            }
        },
        /**
         * method for handling On onHowLongChange Change
         * @param {object} value value
         */
        getForHowLongandFormLayout: function(value, days) {
            if (value === "ON_SPECIFIC_DATE") {
                this.makeLayoutfrequencyWeeklyDate(days);
            } else if (value === "NO_OF_RECURRENCES") {
                this.makeLayoutfrequencyWeeklyRecurrences();
            } else if (value === "CONTINUE_UNTIL_CANCEL") {
                this.makeLayoutfrequencyWeeklyCancel();
            }
        },
        /**
         * method for handling On onHowLongChange Change
         */
        makeLayoutfrequencyWeeklyDate: function(days) {
            var transitDays;
            if (days) {
                transitDays = days;
            } else {
                transitDays = 0;
            }
            this.view.lblForHowLong.setVisibility(true);
            this.view.lbxForHowLong.setVisibility(true);
            this.view.lblSendOn.text =  kony.i18n.getLocalizedString("i18n.transfers.start_date");
            this.view.lblEndingOn.text = kony.i18n.getLocalizedString("i18n.transfers.end_date");
            this.view.lblDelieverBy = "(" + kony.i18n.getLocalizedString("i18n.billPay.DeliveryIn") + " " + transitDays + " " + kony.i18n.getLocalizedString("kony.mb.BillPay.TransactionDays") + ")";
            // CommonUtilities.setText(this.view.lblSendOn, kony.i18n.getLocalizedString("i18n.transfers.start_date"), CommonUtilities.getaccessibilityConfig());
            // CommonUtilities.setText(this.view.lblEndingOn, kony.i18n.getLocalizedString("i18n.transfers.end_date"), CommonUtilities.getaccessibilityConfig());
            // CommonUtilities.setText(this.view.lblDelieverBy, "(" + kony.i18n.getLocalizedString("i18n.billPay.DeliveryIn") + " " + transitDays + " " + kony.i18n.getLocalizedString("kony.mb.BillPay.TransactionDays") + ")", CommonUtilities.getaccessibilityConfig());
            this.view.calEndingOn.setVisibility(true);
            this.view.lblEndingOn.setVisibility(true);
            this.view.txtEndingOn.setVisibility(false);
            this.view.txtEndingOn.text = "";
        },
        /**
         * used to show the frequency weekly recuurences
         */
        makeLayoutfrequencyWeeklyRecurrences: function() {
            this.view.lblForHowLong.setVisibility(true);
            this.view.lbxForHowLong.setVisibility(true);
            this.view.calEndingOn.setVisibility(false);
            this.view.lblEndingOn.setVisibility(true);
            this.view.txtEndingOn.setVisibility(true);
            this.view.lblSendOn.text = kony.i18n.getLocalizedString("i18n.transfers.send_on");
            this.view.lblEndingOn.text = kony.i18n.getLocalizedString("i18n.transfers.lblNumberOfRecurrences");
            // CommonUtilities.setText(this.view.lblSendOn, kony.i18n.getLocalizedString("i18n.transfers.send_on"), CommonUtilities.getaccessibilityConfig());
            // CommonUtilities.setText(this.view.lblEndingOn, kony.i18n.getLocalizedString("i18n.transfers.lblNumberOfRecurrences"), CommonUtilities.getaccessibilityConfig());
        },
        /**
         * used to diplay tableView flex
         */
        makeLayoutfrequencyOnce: function(days) {
            var transitDays;
            if (days) {
                transitDays = days;
            } else {
                transitDays = 0;
            }
            this.view.lblSendOn.text = kony.i18n.getLocalizedString("i18n.transfers.send_on");
            this.view.lblDelieverBy.text = "(" + kony.i18n.getLocalizedString("i18n.billPay.DeliveryBy") + ":" + this.getNextDeliveryDate(null, transitDays) + ")";
            // CommonUtilities.setText(this.view.lblSendOn, kony.i18n.getLocalizedString("i18n.transfers.send_on"), CommonUtilities.getaccessibilityConfig());
            // CommonUtilities.setText(this.view.lblDelieverBy, "(" + kony.i18n.getLocalizedString("i18n.billPay.DeliveryBy") + ":" + this.getNextDeliveryDate(null, transitDays) + ")", CommonUtilities.getaccessibilityConfig());
            this.view.lblForHowLong.setVisibility(false);
            this.view.lbxForHowLong.setVisibility(false);
            this.view.lblEndingOn.setVisibility(false);
            this.view.calEndingOn.setVisibility(false);
            this.view.txtEndingOn.setVisibility(false);
        },
        /**
         * Method to get the date
         * @return {array[]} startdate
         */
        getvalidStartDate: function() {
            return CommonUtilities.getServerDateComponent();
        },
        /**
         * getDateComponents:  Method to get the date
         * @param {object} dateString date string
         * @returns {object} date components
         */
        getDateComponents: function(dateString) {
            var dateObj = applicationManager.getFormatUtilManager().getDateObjectfromString(dateString, applicationManager.getFormatUtilManager().getDateFormat().toUpperCase());
            return [dateObj.getDate(), dateObj.getMonth() + 1, dateObj.getFullYear()];
        },
        /**
         * getDateObj : used to format the date and return as object
         * @param {dateComponents} date
         */
        getDateObj: function(dateComponents) {
            var date = new Date();
            date.setDate(dateComponents[0]);
            date.setMonth(parseInt(dateComponents[1]) - 1);
            date.setFullYear(dateComponents[2]);
            date.setHours(0, 0, 0, 0)
            return date;
        },
        /**
         * call to pay a bill
         * @param {object} data data
         * @param {object} context context
         */
        sendSinglePayABillPayData: function(data, context) {
            var scopeObj = this;
            var message;
            var currTime = CommonUtilities.getServerDateObject();
            currTime.setHours(0, 0, 0, 0);
            var formattedPayABill = scopeObj.constructSingleBillPayObj(data, context);
            var payFromAccount = formattedPayABill.payFrom;
            var index = payFromAccount.indexOf("(");
            var accountPaid = payFromAccount.substring(0, index);
            var sendOnDate = this.getDateObj(scopeObj.view.calSendOn.dateComponents);
            var endOnDate = this.getDateObj(scopeObj.view.calEndingOn.dateComponents);
            var deliverByDate = this.getDateObj(scopeObj.view.CalDeliverBy.dateComponents);
            var deFormatAmount = applicationManager.getFormatUtilManager().deFormatAmount(scopeObj.view.txtSearch.text ? scopeObj.view.txtSearch.text : scopeObj.view.txtEnterAmount.text);
            var result = scopeObj.presenter.validateBillPayAmount({
                "amount": parseFloat(deFormatAmount),
                "fromAccountNumber": formattedPayABill.fromAccountNumber
            });
            scopeObj.view.lblPopupMessage.text = kony.i18n.getLocalizedString("i18n.billPay.setDefaultPopUpBillPay") + " " + accountPaid + kony.i18n.getLocalizedString("i18n.billPay.setDefaultPopUpBillPayee");
            //CommonUtilities.setText(scopeObj.view.lblPopupMessage, kony.i18n.getLocalizedString("i18n.billPay.setDefaultPopUpBillPay") + " " + accountPaid + kony.i18n.getLocalizedString("i18n.billPay.setDefaultPopUpBillPayee"), CommonUtilities.getaccessibilityConfig());
            var tncObj = {
                "isBulkBillPay": false,
                "data": formattedPayABill,
                "context": context
            };
            if (result.isAmountValid) {
                if (sendOnDate.getTime() < currTime.getTime()) {
                    message = kony.i18n.getLocalizedString("i18n.transfers.error.invalidSendOnDate");
                    scopeObj.showErrorFlexForSinglePayABill(message);
                    return;
                }
                if (scopeObj.view.lbxFrequency.selectedKey !== 'Once') {
                    if (scopeObj.view.lbxForHowLong.selectedKey === 'ON_SPECIFIC_DATE') {
                        if (endOnDate.getTime() < sendOnDate.getTime()) {
                            message = kony.i18n.getLocalizedString("i18n.transfers.errors.invalidEndOnDate");
                            scopeObj.showErrorFlexForSinglePayABill(message);
                        } else if (endOnDate.getTime() === sendOnDate.getTime()) {
                            message = kony.i18n.getLocalizedString("i18n.transfers.errors.sameEndDate");
                            scopeObj.showErrorFlexForSinglePayABill(message);
                        }
                        //                       else if (deliverByDate.getTime() < sendOnDate.getTime()) {
                        //                             message = kony.i18n.getLocalizedString("i18n.transfers.errors.invalidDeliverByDate");
                        //                             scopeObj.showErrorFlexForSinglePayABill(message);
                        //                         } 
                        else {
                            if (scopeObj.presenter.getBillPayPreferedAccountNumber() === "") {
                                if (this.presenter.getDefaultBillPayPopUp() === true) {
                                    scopeObj.setBillPayDefaultAccountWithSingleBillPayConfirm(tncObj);
                                } else {
                                    scopeObj.view.flxConfirmDefaultAccount.isVisible = false;
                                    scopeObj.view.flxError.setVisibility(false);
                                    scopeObj.presenter.getTnCBillPayTransfer(tncObj);
                                }
                            } else {
                                scopeObj.view.flxConfirmDefaultAccount.setVisibility(false);
                                scopeObj.view.flxError.setVisibility(false);
                                scopeObj.presenter.getTnCBillPayTransfer(tncObj);
                            }
                        }
                    }
                    if (scopeObj.view.lbxForHowLong.selectedKey === 'NO_OF_RECURRENCES') {
                        //                         if (deliverByDate.getTime() < sendOnDate.getTime()) {
                        //                             message = kony.i18n.getLocalizedString("i18n.transfers.errors.invalidDeliverByDate");
                        //                             scopeObj.showErrorFlexForSinglePayABill(message);
                        //                         } else {
                        if (scopeObj.presenter.getBillPayPreferedAccountNumber() === "") {
                            if (this.presenter.getDefaultBillPayPopUp() === true) {
                                scopeObj.setBillPayDefaultAccountWithSingleBillPayConfirm(tncObj);
                            } else {
                                scopeObj.view.flxConfirmDefaultAccount.isVisible = false;
                                scopeObj.view.flxError.setVisibility(false);
                                scopeObj.presenter.getTnCBillPayTransfer(tncObj);
                            }
                        } else {
                            scopeObj.view.flxConfirmDefaultAccount.setVisibility(false);
                            scopeObj.view.flxError.setVisibility(false);
                            scopeObj.presenter.getTnCBillPayTransfer(tncObj);
                        }
                        // }
                    }
                } else {
                    //                     if (deliverByDate.getTime() < sendOnDate.getTime()) {
                    //                         message = kony.i18n.getLocalizedString("i18n.transfers.errors.invalidDeliverByDate");
                    //                         scopeObj.showErrorFlexForSinglePayABill(message);
                    //                     }
                    //                     else {
                    if (scopeObj.presenter.getBillPayPreferedAccountNumber() === "") {
                        if (this.presenter.getDefaultBillPayPopUp() === true) {
                            scopeObj.setBillPayDefaultAccountWithSingleBillPayConfirm(tncObj);
                        } else {
                            scopeObj.view.flxConfirmDefaultAccount.isVisible = false;
                            scopeObj.view.flxError.setVisibility(false);
                            scopeObj.presenter.getTnCBillPayTransfer(tncObj);
                        }
                    } else {
                        scopeObj.view.flxConfirmDefaultAccount.setVisibility(false);
                        scopeObj.view.flxError.setVisibility(false);
                        scopeObj.presenter.getTnCBillPayTransfer(tncObj);
                    }
                    //}
                }
            } else {
                scopeObj.view.rtxErrorPayBill.text = result.errMsg;
                scopeObj.view.flxError.setVisibility(true);
                return;
            }
        },
        /**
         * used to set BillPay Default Account and navigate to single Bill Pay confirm screen
         * @param {object} tncObj constructed Single BillPay object
         */
        setBillPayDefaultAccountWithSingleBillPayConfirm: function(tncObj) {
            var scopeObj = this;
            var payFromAccount = tncObj.data.payFrom;
            var index = payFromAccount.indexOf("(");
            var accountPaid = payFromAccount.substring(0, index);
            scopeObj.view.flxDialogs.setVisibility(true);
            scopeObj.view.flxConfirmDefaultAccount.setVisibility(true);
            scopeObj.view.imgCheckBox.src = ViewConstants.IMAGES.UNCHECKED_IMAGE;
            scopeObj.view.imgCross.onTouchEnd = function() {
                scopeObj.view.flxConfirmDefaultAccount.setVisibility(false);
            };
            scopeObj.view.btnNo.onClick = function() {
                scopeObj.view.flxConfirmDefaultAccount.setVisibility(false);
                scopeObj.presenter.getTnCBillPayTransfer(tncObj);
            }
            scopeObj.view.flxCheckBox.onClick = function() {
                if (scopeObj.view.imgCheckBox.src === ViewConstants.IMAGES.UNCHECKED_IMAGE) {
                    scopeObj.view.imgCheckBox.src = ViewConstants.IMAGES.CHECKED_IMAGE;
                } else {
                    scopeObj.view.imgCheckBox.src = ViewConstants.IMAGES.UNCHECKED_IMAGE;
                }
            }
            scopeObj.view.btnYes.onClick = function() {
                if (scopeObj.view.imgCheckBox.src === ViewConstants.IMAGES.CHECKED_IMAGE) {
                    scopeObj.presenter.updateShowBillPayFromAccPop();
                }
                scopeObj.presenter.updateBillPayPreferedAccount(tncObj.data.fromAccountNumber);
                tncObj.data.statusOfDefaultAccountSetUp = true;
                tncObj.data.defaultAccountBillPay = accountPaid;
                scopeObj.view.flxConfirmDefaultAccount.setVisibility(false);
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.presenter.getTnCBillPayTransfer(tncObj);
            }
        },
        /**
         * used to construct the single bill payment object
         * @param {object} data data
         * @param {string} context  context
         */
        constructSingleBillPayObj: function(data, context) {
            var scopeObj = this;
            var deliverByVal;
            var deliverByValue;
            var payFrom;
            var fromAccountNumber;
            var deliverBy = scopeObj.view.lblDelieverBy.text;
            if (this.view.lbxFrequency.selectedKey === "Once") {
                deliverByVal = deliverBy ? (deliverBy.split(":"))[1] : "";
                deliverByValue = deliverByVal ? (deliverByVal.split(")"))[0] : "";
            } else {
                deliverByVal = deliverBy ? (deliverBy.split("in"))[1] : "";
                deliverByValue = deliverByVal ? (deliverByVal.split(")"))[0] : "";
            }
            //            if(applicationManager.getConfigurationManager().isCombinedUser === "true"){
            payFrom = scopeObj.view.segTransferFrom.selectedRowItems ? scopeObj.view.segTransferFrom.selectedRowItems[0].lblAccountName : this.view.lblSelectAccount.text;
            fromAccountNumber = scopeObj.view.segTransferFrom.selectedRowItems ? scopeObj.view.segTransferFrom.selectedRowItems[0].accountID : accountId;
            //            }else{
            //                payFrom = scopeObj.view.lbxPayFromValue.selectedKeyValue[1];
            //                fromAccountNumber = scopeObj.view.lbxPayFromValue.selectedKeyValue[0];
            //            }
            var formattedPayABill = {
                "payeeId": data.payeeId,
                "payFrom": payFrom,
                "fromAccountNumber": fromAccountNumber,
                "isBusinessPayee": data.isBusinessPayee,
                "payeeName": scopeObj.view.lblPayeeName.text,
                "amount": scopeObj.view.txtSearch.text ? scopeObj.view.txtSearch.text : scopeObj.view.txtEnterAmount.text,
                "sendOn": scopeObj.view.calSendOn.formattedDate,
                "notes": scopeObj.view.txtNotes.text,
                "payeeNickname": data.payeeNickname,
                "billid": data.billid,
                "lastPaidAmount": data.lastPaidAmount,
                "lastPaidDate": data.lastPaidDate,
                "dueAmount": data.dueAmount,
                "billDueDate": data.billDueDate,
                "eBillSupport": data.eBillSupport,
                "eBillStatus": data.eBillStatus,
                "referenceNumber": data.referenceNumber,
                "accountNumber": data.accountNumber,
                "deliveryDate": deliverByValue, //scopeObj.view.CalDeliverBy.formatteddate,
                "isScheduleEditFlow": data.isScheduleEditFlow,
                "frequencyType": scopeObj.view.lbxFrequency.selectedKeyValue[0],
                "numberOfRecurrences": scopeObj.view.txtEndingOn.text,
                "hasHowLong": scopeObj.view.lbxForHowLong.selectedKey,
                "frequencyStartDate": scopeObj.view.calSendOn.formattedDate,
                "frequencyEndDate": scopeObj.view.calEndingOn.formattedDate,
                "isScheduled": data.isScheduled,
                "statusOfDefaultAccountSetUp": false,
                "defaultAccountBillPay": data.payFrom,
                "onCancel": data.onCancel,
                "transactionCurrency": applicationManager.getFormatUtilManager().getCurrencySymbolCode(scopeObj.view.lblCurrencyType.text),
            };
            if (context === "quickAction") {
                formattedPayABill.context = "quickAction";
                formattedPayABill.payeeName = scopeObj.view.lbxpayee.selectedKeyValue[1];
                formattedPayABill.payeeId = scopeObj.view.lbxpayee.selectedKeyValue[0];
            }
            return formattedPayABill;
        },
        /**
         * used to show error flex.
         * @param {string} message error information
         */
        showErrorFlexForSinglePayABill: function(message) {
            this.view.flxError.setVisibility(true);
            this.view.rtxErrorPayBill.text = message;
            this.view.forceLayout();
        },
        /**
         * used to load the payees in dropDown
         * @param {object} payees payees list
         */
        loadAllPayees: function(payees) {
            var scopeObj = this;
            scopeObj.allPayees = payees.filter(function(payee) {
                return payee.ebillStatus !== "0";
            });
            this.view.lbxpayee.masterData = FormControllerUtility.getListBoxDataFromObjects(scopeObj.allPayees, "payeeId", "payeeNickName");
            this.view.lbxpayee.onSelection = this.onPayeeSelect.bind(scopeObj);
            this.allBillPayAccounts = this.presenter.getSingelBillPaySupportedAccounts();
        },
        /**
         * selecting payee
         */
         onPayeeSelect: function() {
            var scopeObj = this;
            var selectedKey = scopeObj.view.lbxpayee.selectedKey;
            var selectedPayee = scopeObj.allPayees.filter(function(payee) {
                return payee.payeeId === selectedKey;
            })[0];
            var nonValue = kony.i18n.getLocalizedString("i18n.common.none");
            if(selectedPayee){scopeObj.setFromAccountDataBySelectedPayee(selectedPayee.cif)
            selectedPayee.billDueDate = selectedPayee.billDueDate ? CommonUtilities.getFrontendDateString(selectedPayee.billDueDate) : nonValue;
            selectedPayee.dueAmount = selectedPayee.dueAmount ? CommonUtilities.formatCurrencyWithCommas(selectedPayee.dueAmount) : nonValue;
            scopeObj.view.lblDueDateValue.text = selectedPayee.billDueDate;
            scopeObj.view.lblBillValue.text = scopeObj.view.lblBillValue;
            // CommonUtilities.setText(scopeObj.view.lblDueDateValue, selectedPayee.billDueDate, CommonUtilities.getaccessibilityConfig());
            // CommonUtilities.setText(scopeObj.view.lblBillValue, selectedPayee.dueAmount, CommonUtilities.getaccessibilityConfig());
            scopeObj.eBillForPayABill(selectedPayee);
            }
        },

        setFromAccountDataBySelectedPayee: function(cif) {
            // let toMembershipId = JSON.parse(cif)[0].coreCustomerId.split(',');
            let toMembershipId = [];
            JSON.parse(cif).forEach(x => toMembershipId.push(...x.coreCustomerId.split(',')));
            let billPayAccounts = this.allBillPayAccounts.filter(x => toMembershipId.includes(x.Membership_id));

            var widgetFromData = this.isSingleCustomerProfile ? this.getDataWithAccountTypeSections(billPayAccounts) : this.getDataWithSections(billPayAccounts);
            if (widgetFromData && widgetFromData.length > 0) {
                this.view.segTransferFrom.setData(widgetFromData);
                this.view.flxLoadingContainerFrom.setVisibility(false);
                this.view.flxDropdownIcon.setVisibility(true);
                this.view.flxNoResultsFrom.setVisibility(false);
                this.view.lblFromAmount.setVisibility(false);
                this.view.txtTransferFrom.setVisibility(true);
                this.view.lblSelectAccount.setVisibility(false);
                this.view.txtTransferFrom.text = "";
            } else {
                this.view.flxLoadingContainerFrom.setVisibility(false);
                this.view.flxDropdownIcon.setVisibility(true);
                this.view.flxNoResultsFrom.setVisibility(true);
            }
        },
        /**
         * method to download the e-bill page.
         * @param {object} data information
         */
        downloadFile: function(data) {
            if (data) {
                CommonUtilities.downloadFile({
                    'url': data.url,
                    'filename': kony.i18n.getLocalizedString('i18n.billPay.Bill')
                })
            }
        },
        /**
         * used to show the dueBills count and totalDueBills Amount
         * @param {object} dueBills contains the no of bills and toatalBillamount
         */
        bindTotalEbillAmountDue: function(dueBills) {
            var scopeObj = this;
            if (dueBills && dueBills.count === 0) {
                scopeObj.view.flxTotalEbillAmountDue.setVisibility(false);
            } else {
                scopeObj.view.flxTotalEbillAmountDue.setVisibility(true);
                scopeObj.view.lblBills.text =  dueBills.count + " " + kony.i18n.getLocalizedString("i18n.billPay.eBills");
                scopeObj.view.lblEbillAmountDueValue = scopeObj.formatAmount(String(dueBills.totalDueAmount));
                // CommonUtilities.setText(scopeObj.view.lblBills, dueBills.count + " " + kony.i18n.getLocalizedString("i18n.billPay.eBills"), CommonUtilities.getaccessibilityConfig());
                // CommonUtilities.setText(scopeObj.view.lblEbillAmountDueValue, scopeObj.formatAmount(String(dueBills.totalDueAmount)), CommonUtilities.getaccessibilityConfig());
            }
            scopeObj.view.forceLayout();
        },
        /**
         * used to format the amount
         * @param {string} amount amount
         * @param {boolean} currencySymbolNotRequired currency symbol required
         * @returns {string} formated amount
         */
        formatAmount: function(amount, currencySymbolNotRequired, currencySymbol) {
            return this.presenter.formatAmount(amount, currencySymbolNotRequired);
        },
        /**
         * used to show the permission based UI
         */
        showAddPayeeOption: function() {
            this.view.flxAddPayee.setVisibility(true);
        },
        /**
         * used to hide the permission based UI
         */
        hideAddPayeeOption: function() {
            this.view.flxAddPayee.setVisibility(false);
        },
        /**
         * creates segment with account numbers and other details with particular header values
         */
        getDataWithSections: function(accounts) {
            var scopeObj = this;
            var finalData = {};
            var prioritizeAccountTypes = ["Personal Accounts"];
            accounts.forEach(function(account) {
                var accountType = "Personal Accounts";

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

                if (finalData.hasOwnProperty(accountType) && account.Membership_id === finalData[accountType][0]["membershipId"]) {
                    if (finalData[accountType][1][finalData[accountType][1].length - 1].length === 0) {
                        finalData[accountType][1].pop();
                    }
                    finalData[accountType][1].push(scopeObj.createSegmentData(account));
                } else {
                    if(accountType !== "Personal Accounts")
                      prioritizeAccountTypes.push(accountType);
                    finalData[accountType] = [{
                            lblTransactionHeader: accountType === "Personal Accounts" ? accountType : account.MembershipName,
                            lblSeparator: {
                                "isVisible": "true"
                            },
                            imgDropDown: "P",
                            flxDropDown: {
                                "onClick": function(context) {
                                    scopeObj.showOrHideAccountRows(context);
                                }.bind(this)
                            },
                            template: "flxTransfersFromListHeader",
                            membershipId: account.Membership_id
                        },
                        [scopeObj.createSegmentData(account)]
                    ];
                }
            });
            var data = [];
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
        /*create segment data with account type grouping
         */
        getDataWithAccountTypeSections: function(accounts) {
            var scopeObj = this;
            var finalData = {};
            var isCombinedUser = applicationManager.getConfigurationManager().getConfigurationValue('isCombinedUser') === "true";
            var prioritizeAccountTypes = applicationManager.getTypeManager().getAccountTypesByPriority();
            accounts.forEach(function(account) {
                var accountType = applicationManager.getTypeManager().getAccountType(account.accountType);
                if (finalData.hasOwnProperty(accountType)) {
                    finalData[accountType][1].push(scopeObj.createSegmentData(account));
                } else {
                    finalData[accountType] = [{

                            lblTransactionHeader: {
                                text: accountType,
                                left: "10dp"
                            },
                            lblSeparator: {
                                "isVisible": "true"
                            },
                            imgDropDown: "P",
                            flxDropDown: {
                                "onClick": function(context) {
                                    scopeObj.showOrHideAccountRows(context);
                                }.bind(this),
                                "isVisible": false
                            },
                            template: "flxTransfersFromListHeader",

                        },
                        [scopeObj.createSegmentData(account)]
                    ];
                }
            });
            this.sectionData = [];
            var data = [];
            for (var key in prioritizeAccountTypes) {
                var accountType = prioritizeAccountTypes[key];
                if (finalData.hasOwnProperty(accountType)) {
                    data.push(finalData[accountType]);
                    this.sectionData.push(accountType);
                }
            }
           for (i = 0; i < data.length; i++) {
                for (j = 0; j < data[i][1].length; j++) {
                    if (j === data[i][1].length - 1) data[i][1][j].lblSeparator.isVisible = false;
                }
            }
            return data;
        },
        /**
         *  creates the row template with account number and other details
         */

        createSegmentData: function(account) {
            //var combineduser = applicationManager.getConfigurationManager().isCombinedUser;
            var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile
            var dataObject = {
                //"lblAccountName": (account.accountID || account.Account_id) ? CommonUtilities.getAccountDisplayName(account) : (account.nickName ? account.nickName : account.name),
                "lblAccountName": (account.accountID || account.Account_id) ? CommonUtilities.truncateStringWithGivenLength(account.accountName + "....", 26) + CommonUtilities.getLastFourDigit(account.accountID) : CommonUtilities.getAccountDisplayName(account),
                "lblAmount": ((account.accountType !== "CreditCard") && (account.accountType !== "Loan")) ? (account.availableBalance ? CommonUtilities.formatCurrencyWithCommas(account.availableBalance, false, account.currencyCode) : (account.bankName || account.phone || account.email)) : (CommonUtilities.formatCurrencyWithCommas(account.outstandingBalance, false, account.currencyCode)),
                "accountID": account.Account_id || account.accountID || account.accountNumber || account.payPersonId || account.PayPersonId,
                "currencyCode": account.currencyCode,
                "imgIcon": {
                    "text": account.isBusinessAccount === "true" ? "r" : "s",
                    //"isVisible" : combineduser==="true"?true:false,
                    "isVisible": this.profileAccess === "both" ? true : false,
                },
                "lblSeparator": {
                    "isVisible": "true",
                },
                "lblAccType": account.accountType,
                "flxIcons": {
                    //"left": (combineduser==="true")?"0px":"15px"
                    "left": this.profileAccess === "both" ? "0px" : "15px"
                },
                "flxBankIcon": {
                    "isVisible": account.externalIndicator === "true" ? true : false,
                },
                "imgBankIcon": {
                    "src": "bank_icon_hdfc.png"
                },
                "flxAccountListItem": {
                    "isVisible": true
                }

            };
            //} 
            return dataObject;
        },
        /**
         * It shows or hides the particular section 
         */
        showOrHideAccountRows: function(context) {
            var section = context.rowContext.sectionIndex;
            var segData = this.view.segTransferFrom.data;
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
                this.updateKeyAt("flxAccountListItem", flxAccountListItem, i, section);
            }
            segData = this.view.segTransferFromData;
            this.view.segTransferFrom.setSectionAt(segData[section], section);
        },
        updateKeyAt: function(widgetName, value, row, section) {
            var data = this.view.segTransferFrom.data;
            var rowDataTobeUpdated = data[section][1][row];
            rowDataTobeUpdated[widgetName] = value;
            this.view.segTransferFrom.setDataAt(rowDataTobeUpdated, row, section);
        },
        /**
         * handle the UI when any from account is selected
         */
        onFromAccountSelection: function () {
            const scopeObj = this;
            const segData = scopeObj.view.segTransferFrom.selectedRowItems[0];
            scopeObj.view.txtTransferFrom.text = segData.lblAccountName;
            accountId = segData.accountID;
            // scopeObj.view.flxCancelFilterFrom.setVisibility(true);
            scopeObj.view.txtTransferFrom.setVisibility(false);
            //scopeObj.view.flxCancelFilterFrom.setVisibility(false);
            scopeObj.view.lblSelectAccount.text = segData.lblAccountName;
            scopeObj.view.lblSelectAccount.setVisibility(true);
            scopeObj.view.flxTypeIcon.setVisibility(true);
            scopeObj.view.lblTypeIcon.setVisibility(true);
            //applicationManager.getConfigurationManager().isCombinedUser==="true"?scopeObj.view.flxTypeIcon.setVisibility(true):scopeObj.view.flxTypeIcon.setVisibility(false);
            scopeObj.profileAccess === "both" ? scopeObj.view.flxTypeIcon.setVisibility(true) : scopeObj.view.flxTypeIcon.setVisibility(false);
            scopeObj.profileAccess === "both" ? scopeObj.view.lblSelectAccount.left = "40px" : scopeObj.view.lblSelectAccount.left = "2%";
            scopeObj.view.lblTypeIcon.text = segData.imgIcon.text;
            scopeObj.view.lblFromAmount.setVisibility(true);
            scopeObj.view.lblFromAmount.text = segData.lblAmount;
            scopeObj.view.flxFromSegment.setVisibility(false);
            scopeObj.view.flxDropdownIcon.accessibilityConfig = {
                "a11yLabel" :"Click to select from other accounts",
                "a11yARIA": {
                    "tabindex": 0,
                    "role": "button",
                    "aria-expanded": false
                }
            }
            var selectedAccount = this.view.lblSelectAccount.text;
            var lblAmount = this.view.lblFromAmount.text;
            this.view.flxFrom.accessibilityConfig ={
            "a11yLabel": "Pay Account from button currently Selected " + selectedAccount + lblAmount,
            "a11yARIA": {
                "tabindex": 0,
                "role":"textbox"
            }
            } 
            scopeObj.view.flxFrom.setActive(true);
            scopeObj.checkValidityBillPay();
        },
        /**
         * prefill the from account field for Repeat/Edit flow
         */
        preSelectFromAccount: function (fromAccNumber) {
            if (!fromAccNumber) return;
            const scope = this;
            const segData = scope.view.segTransferFrom.data;
            let isFromAccountAvailable = false;
            for (let i = 0; i < segData.length; i++) {
                const sectionRow = segData[i][1];
                for (let j = 0; j < sectionRow.length; j++) {
                    if (sectionRow[j].accountID === fromAccNumber) {
                        scope.view.segTransferFrom.selectedRowIndex = [i, j];
                        isFromAccountAvailable = true;
                        break;
                    }
                }
            }
            if (isFromAccountAvailable) scope.onFromAccountSelection();
        },
    };
});