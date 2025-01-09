/**
 * Description of Module representing a Confirm form.
 * @module frmMakeOneTimePaymentController
 */
define(['CommonUtilities', 'OLBConstants', 'ViewConstants', 'FormControllerUtility'], function(CommonUtilities, OLBConstants, ViewConstants, FormControllerUtility) {
     
    var orientationHandler = new OrientationHandler();
    var accountId;

    return /** @alias module:frmMakeOneTimePaymentController */ {
        isSingleCustomerProfile: true,
        primaryCustomerId: [],
        profileAccess: "",
        init: function() {
            var scopeObj = this;
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.presenter = applicationManager.getModulesPresentationController({ 'appName': 'BillPayMA', 'moduleName': 'BillPaymentUIModule' });
            this.view.flxLeft.setVisibility(true);
            this.view.flxAddRecepientTo.setVisibility(false);
            this.initActions();
        },
        preShow: function() {
            this.isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
            this.primaryCustomerId = applicationManager.getUserPreferencesManager().primaryCustomerId;
            this.profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
            this.view.customheadernew.activateMenu("Bill Pay", "Make One Time Payment");
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader', 'flxFooter', 'flxContainer']);
            this.view.imgCancelFilterFrom.toolTip = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
            this.view.imgLoadingIndicatorFrom.toolTip = kony.i18n.getLocalizedString("i18n.PayAPerson.payAPersonDeregiste");
            this.view.txtNotes.toolTip = '';
            this.view.btnNext.toolTip = '';
            this.view.btnCancel.toolTip = '';
            this.view.btnYes.toolTip = '';
            this.view.btnNo.toolTip = '';
            this.view.imgCross.toolTip = kony.i18n.getLocalizedString("i18n.common.close");
            this.view.imgCancelFilterFrom.src = "clear_field.png";
            this.section=0;
            var self = this;
            this.view.flxLogout.skin = "sknBackground000000Op35";
            this.view.btnBypass.onClick = function() {
                self.view.flxAddPayee.setActive(true);
            }
            this.view.customheadernew.btnSkipNav.onClick = function() {
                self.view.lblOneTimePayment.setActive(true);
            }
            
        },
        postShow: function() {
            var self=this;
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            applicationManager.executeAuthorizationFramework(this);
            this.accessibilityFocusSetup();
            this.view.flxFromtxt.accessibilityConfig = {
                "a11yLabel": "Pay From. Currently selected" + self.view.lblSelectAccount.text  + ". Click to select another from account",
                a11yARIA: {
                    "role": "button",
                    "aria-expanded": false
                },
            }
            this.view.txtPaymentAmount.accessibilityConfig = {
                a11yARIA: {
                    "aria-autocomplete": "off",
                    "role": "textbox",
                    "aria-labelledby": "lblPaymentAmount",
                    "aria-required": true
                },
            }
            this.view.txtNotes.accessibilityConfig = {
                a11yARIA: {
                    "aria-autocomplete": "off",
                    "role": "textbox",
                    "aria-labelledby": "txtNotes",
                    "aria-multiline": "true"
                },
            }
            this.view.CustomPopupLogout.onKeyPress=this.onKeyPressCallBack;
            this.view.CustomPopupLogout.doLayout = CommonUtilities.centerPopupFlex;
            this.view.txtTransferFrom.onKeyPress=this.closeFromDropdown;
            if (kony.application.getCurrentBreakpoint() > 1024)
                this.view.btnBypass.setVisibility(true);
        },
        closeFromDropdown:function(eventObject,eventPayload){
            if(eventPayload.keyCode===27){
                if(this.view.flxFromSegment.isVisible){
                    this.view.flxFromSegment.isVisible= false;
                    this.section=0;
                    this.view.txtTransferFrom.setVisibility(false);
                    this.view.flxCancelFilterFrom.setVisibility(false);
                    this.view.flxDropdownIcon.setVisibility(true);
                    this.view.lblSelectAccount.setVisibility(true);
                    this.view.flxFromtxt.skin = "skne3e3e3br3pxradius"
                    this.view.flxFromtxt.setActive(true);
                    this.view.flxFromtxt.accessibilityConfig = {
                        "a11yLabel": scopeObj.view.txtTransferFrom.text !=='' ? "Pay From. Currently selected" + self.view.lblSelectAccount.text  + ". Click to select another from account":"Pay From Click to select from account",
                        a11yARIA: {
                             "role": "button",
                            "aria-expanded": false
                    },
                  }
                }
            }
        },
        onKeyPressCallBack: function(eventObject, eventPayload) {
            if (eventPayload.keyCode === 27) {
                if (this.view.flxLogout.isVisible === true) {
                    this.view.flxDialogs.isVisible = false;
                    this.view.flxLogout.isVisible === false;
                    this.view.customheadernew.btnLogout.setFocus(true);
                }
            }
        },
        /**
         * Set foucs handlers for skin of parent flex on input focus 
         */
        accessibilityFocusSetup: function() {
            let widgets = [
                [this.view.txtPaymentAmount, this.view.flxPaymentAmount],
                [this.view.txtTransferFrom, this.view.flxFromtxt]
            ]
            for (let i = 0; i < widgets.length; i++) {
                CommonUtilities.setA11yFoucsHandlers(widgets[i][0], widgets[i][1], this)
            }
        },

        /**
         * used perform the initialize activities.
         *
         */
        initActions: function() {
            this.view.flxAddPayee.onClick = function() {
                this.presenter.showBillPaymentScreen({
                    context: "AddPayee"
                });
            }.bind(this);
            this.view.flxMakeOneTimePayment.onClick = function() {
                this.presenter.showBillPaymentScreen({
                    context: "MakeOneTimePayment"
                });
            }.bind(this);

        },

        onBreakpointChange: function(form, width) {
            var scopeObj = this;
            FormControllerUtility.setupFormOnTouchEnd(width);
            
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            this.view.CustomPopupLogout.onBreakpointChangeComponent(scopeObj.view.CustomPopupLogout, width);
            this.view.CustomPopupCancel.onBreakpointChangeComponent(scopeObj.view.CustomPopupCancel, width);
        },

        /** @alias module:frmMakeOneTimePayeeController */
        /** updates the present Form based on required function.
         * @param {list} uiDataMap used to load a view
         */
        updateFormUI: function(uiDataMap) {
            if (uiDataMap.isLoading) {
                FormControllerUtility.showProgressBar(this.view);
            } else {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (uiDataMap.serverError) {
                this.showServerError(uiDataMap.serverError);
            }
            if (uiDataMap.billPayAccounts) {
                // this.bindBillPayAccounts(uiDataMap.billPayAccounts);
                this.initializeSegment(uiDataMap.billPayAccounts);
            }
            if (uiDataMap.billDueData) {
                this.bindTotalEbillAmountDue(uiDataMap.billDueData);
            }
            if (uiDataMap.initOneTimePayment) {
                this.resetOneTimePayment();
            }
            if (uiDataMap.payeeData) {
                this.setPayeeData(uiDataMap.payeeData);
            }
            if (uiDataMap.TnCcontentTransfer && uiDataMap.oneTimeData) {
                this.makeOneTimePayment(uiDataMap.TnCcontentTransfer, uiDataMap.oneTimeData);
            }
        },

        setNewDeliverDateForPayABill: function(transitDays) {
            var selectedDate = this.view.calSendOn.dateComponents;
            var sendOnDate = selectedDate[1] + "/" + selectedDate[0] + "/" + selectedDate[2];
            var nextDeliveyDateForPayABill = this.getNextDeliveryDate(sendOnDate, transitDays);
            this.view.lblNoOfRecOrEndingOn.text = "(" + kony.i18n.getLocalizedString("i18n.billPay.DeliverBy") + ":" + nextDeliveyDateForPayABill + ")";
        },

        addDays: function(date, days) {
            days = Number(days);
            var result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        },

        getNextDeliveryDate: function(currentDate, transitDays) {
            var todaysDateObject;
            if (currentDate) {
                todaysDateObject = new Date(currentDate);
            } else {
                todaysDateObject = CommonUtilities.getServerDateObject();
            }
            var nextDate = this.addDays(todaysDateObject, transitDays);
            var month = (nextDate.getMonth() + 1) >= 10 ? (nextDate.getMonth() + 1) : ("0" + (nextDate.getMonth() + 1));
            var day = nextDate.getDate() > 9 ? nextDate.getDate() : ("0" + nextDate.getDate());
            return CommonUtilities.isMirrorLayoutEnabled() ? (day + "/" + month + "/" + nextDate.getFullYear()) : (month + "/" + day + "/" + nextDate.getFullYear());
        },
        /**
         * used to set the payee data 
         */
        setPayeeData: function(data) {
            var scopeObj = this;
            var transitDays;
            if (data.transitDays) {
                transitDays = data.transitDays;
            } else {
                transitDays = 0;
            }
            // this.view.lbxPayFrom.selectedKey = data.fromAccountNumber ? data.fromAccountNumber : this.view.lbxPayFrom.masterData[0][0];
            this.view.txtNotes.text = data.notes ? data.notes : '';
            this.view.calSendOn.onSelection = scopeObj.setNewDeliverDateForPayABill.bind(scopeObj, transitDays);
            this.view.lblNoOfRecOrEndingOn.text = "(" + kony.i18n.getLocalizedString("i18n.billPay.DeliverBy") + ":" + scopeObj.getNextDeliveryDate(null, transitDays) + ")";
            CommonUtilities.setText(this.view.lblAccountNumberValue, data.accountNumber ? data.accountNumber : '', CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(this.view.lblToOne, data.billerName ? data.billerName : '', CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(this.view.lbloTwo, data.mobileNumber ? data.mobileNumber : '', CommonUtilities.getaccessibilityConfig());
            CommonUtilities.disableOldDaySelection(this.view.calSendOn);
            CommonUtilities.disableOldDaySelection(this.view.calEndingOn);
            this.singleBillPayAmountField = FormControllerUtility.wrapAmountField(this.view.txtPaymentAmount).onKeyUp(this.checkValidityBillPay.bind(this));
            this.view.btnNext.onClick = this.verifyAndPay.bind(this, data);
            this.view.btnCancel.onClick = this.navigateToBulkPayees.bind(this);
            this.renderCalendars(this.view.calSendOn, this.view.calEndingOn);
            //if(applicationManager.getConfigurationManager().isCombinedUser === "true"){
            //         if(applicationManager.getUserPreferencesManager().isSingleCustomerProfile === false){
            //         //this.view.flxIcon.setVisibility(true);
            //         //this.view.lblIcon.setVisibility(true);
            //       }else{
            this.view.flxIcon.setVisibility(false);
            this.view.lblIcon.setVisibility(false);
            //       }
            const preferredAccNum = this.presenter.getBillPayPreferedAccountNumber();
            this.preSelectFromAccount(data.fromAccountNumber || preferredAccNum);
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
         * navigate to frmMakeOneTimePayee
         */
        navigateToOneTimePayee: function () {
            kony.mvc.getNavigationManager().navigate({
                context: this
            });
        },

        navigateToBulkPayees: function() {
            var scopeObj = this;
            scopeObj.presenter.showBillPaymentScreen({
                context: "BulkPayees"
            });
        },
        /**
         * used to load the  due payements
         * @param {object} accounts accounts
         */
        bindBillPayAccounts: function(accounts) {
            this.view.lbxPayFrom.masterData = FormControllerUtility.getListBoxDataFromObjects(accounts, "accountID", CommonUtilities.getAccountDisplayNameWithBalance);
        },

        /**
         * Used to reset the payment
         */
        resetOneTimePayment: function() {
            FormControllerUtility.disableButton(this.view.btnNext);
            var dateFormat = applicationManager.getFormatUtilManager().getDateFormat();
            var today = CommonUtilities.getServerDateObject();
            var date = [today.getDate(), today.getMonth() + 1, today.getFullYear()];
            this.view.calSendOn.dateFormat = dateFormat;
            this.view.calSendOn.dateComponents = date;
            //this.view.calEndingOn.dateFormat = dateFormat;
            // this.view.calEndingOn.dateComponents = date;
            this.view.txtNotes.text = "";
            this.view.txtPaymentAmount.text = "";
            this.view.flxLeft.setVisibility(true);
            this.view.flxAddRecepientTo.setVisibility(false);
            this.view.flxTypeIcon.setVisibility(false);
            this.view.lblSelectAccount.setVisibility(false);
            this.view.lblFromAmount.setVisibility(false);
        },
        /**
         * used to load the  due payements
         * @param {object} dueBills due bills
         */
        bindTotalEbillAmountDue: function(dueBills) {
            var scopeObj = this;
            if (dueBills && dueBills.count === 0) {
                this.view.flxTotalEbillAmountDue.setVisibility(false);
            } else {
                this.view.flxTotalEbillAmountDue.setVisibility(true);
                CommonUtilities.setText(scopeObj.view.lblBills, dueBills.count + " " + kony.i18n.getLocalizedString("i18n.billPay.eBills"), CommonUtilities.getaccessibilityConfig());
                CommonUtilities.setText(scopeObj.view.lblEbillAmountDueValue, scopeObj.formatAmount(String(dueBills.totalDueAmount)), CommonUtilities.getaccessibilityConfig());
            }
            this.view.flxRight.forceLayout();
        },

        enableAfterSelect: function() {
            //          if(applicationManager.getConfigurationManager().isCombinedUser === "true"){
            if (this.view.txtTransferFrom.text !== "") {
                return false;
            } else {
                return true;
            }
            //          }
            //       else{
            //            return false;
            //          }
        },

        /**
         * method for handling On onHowLongChange Change
         */
        checkValidityBillPay: function() {
            var scopeObj = this;
            var disableConfirmButton = function() {
                FormControllerUtility.disableButton(scopeObj.view.btnNext);
                scopeObj.view.btnNext.skin = "ICSknsknBtnBlockedSSPFFFFFF15Px";
            }.bind(this);
            //resetting amount skin to regular skin if there is no error
            this.view.flxPaymentAmount.skin = "sknFlxffffff2pxe3e3e3border";
            if (!this.singleBillPayAmountField.isValidAmount()) {
                disableConfirmButton();
                return;
            }
            if (this.enableAfterSelect()) {
                disableConfirmButton();
                return;
            }
            FormControllerUtility.enableButton(scopeObj.view.btnNext);
            this.view.btnNext.skin = "sknBtnNormalSSPFFFFFF4vs";
        },

        /**
         * used to format the amount
         * @param {string} amount amount
         * @param {boolean} currencySymbolNotRequired currency symbol required
         * @returns {string} formated amount
         */
        formatAmount: function(amount, currencySymbolNotRequired, currencySymbol) {
            var scopeObj = this;
            return scopeObj.presenter.formatAmount(amount, currencySymbolNotRequired);
        },

        verifyAndPay: function(data) {
            //       if(applicationManager.getConfigurationManager().isCombinedUser === "true"){
            //         this.goToAddRecepientDetails(data);
            //       }else{
            //         this.getTnCOneTimeBillPay(data);
            //       }
            this.getTnCOneTimeBillPay(data);
        },

        getTnCOneTimeBillPay: function(data) {
            var scopeObj = this;
            scopeObj.presenter.getTnCBillPayTransfer({
                "data": data,
                "isOneTimePayment": true
            });
        },
        /**
         * make a one time payement
         * @param {object} data transaction object
         */
        makeOneTimePayment: function(TnCcontentOneTimeTransfer, data) {
            var self = this;
            var formattedMakeOneTimePayABill = self.constructOneTimeBillPayObj(data, TnCcontentOneTimeTransfer);
            var deFormatAmount = self.deformatAmount(self.view.txtPaymentAmount.text);
            var result = self.presenter.validateBillPayAmount({
                "amount": parseFloat(deFormatAmount),
                "fromAccountNumber": formattedMakeOneTimePayABill.fromAccountNumber
            });
            //var resultDate = self.validateBillPayDate();
            var payFromAccount = formattedMakeOneTimePayABill.payFrom;
            var index = payFromAccount.indexOf("(");
            var accountPaid = payFromAccount.substring(0, index);
            CommonUtilities.setText(self.view.lblPopupMessage, kony.i18n.getLocalizedString("i18n.billPay.setDefaultPopUpBillPay") + " " + accountPaid + kony.i18n.getLocalizedString("i18n.billPay.setDefaultPopUpBillPayee"), CommonUtilities.getaccessibilityConfig());
            if (result.isAmountValid) {
                if (this.presenter.getBillPayPreferedAccountNumber() === "") {
                    if (this.presenter.getDefaultBillPayPopUp() === true) {
                        self.setBillPayDefaultAccountWithSingleBillPayConfirm(formattedMakeOneTimePayABill);
                    } else {
                        self.view.flxConfirmDefaultAccount.isVisible = false;
                        self.view.flxError.setVisibility(false);
                        self.presenter.navigateToOneTimePaymentConfirmation(formattedMakeOneTimePayABill);
                    }
                } else {
                    self.view.flxConfirmDefaultAccount.setVisibility(false);
                    self.view.flxError.setVisibility(false);
                    self.presenter.navigateToOneTimePaymentConfirmation(formattedMakeOneTimePayABill);
                }
                this.view.flxDowntimeWarning.setVisibility(false);
            } //else if (!resultDate.isDateValid) {
            //         var message = kony.i18n.getLocalizedString("i18n.transfers.errors.invalidDeliverByDate");
            //         this.showInlineErrorMessage(message);
            //       } 
            else {
                self.showServerError(result.errMsg, false);
                return;
            }
        },
        /**
         * constructing OneTime BillPay Object
         * @param {object} data data
         * @returns {object} formattedOneTimePayment
         */
        constructOneTimeBillPayObj: function(data, TnCcontentOneTimeTransfer) {
            var self = this;
            var scopeObj = this;
            var payFrom;
            var fromAccountNumber;
            var deliverBy = scopeObj.view.lblNoOfRecOrEndingOn.text;
            var deliverByVal = deliverBy ? (deliverBy.split(":"))[1] : "";
            var deliverByValue = deliverByVal ? (deliverByVal.split(")"))[0] : "";
            //       if(applicationManager.getConfigurationManager().isCombinedUser === "true"){
            payFrom = self.view.segTransferFrom.selectedRowItems ? self.view.segTransferFrom.selectedRowItems[0].lblAccountName : this.view.lblSelectAccount.text;
            fromAccountNumber = self.view.segTransferFrom.selectedRowItems ? self.view.segTransferFrom.selectedRowItems[0].accountID : accountId;
            //         }else{
            //                payFrom = self.view.lbxPayFrom.selectedKeyValue[1];
            //                fromAccountNumber = self.view.lbxPayFrom.selectedKeyValue[0];
            //         }
            var formattedOneTimePayment = {
                "payeeId": data.payeeId,
                "payFrom": payFrom,
                "fromAccountNumber": fromAccountNumber,
                "payeeName": self.view.lblToOne.text,
                "amount": self.view.txtPaymentAmount.text,
                "sendOn": self.view.calSendOn.formattedDate,
                "deliveryDate": deliverByValue, //self.view.calEndingOn.date,
                "notes": self.view.txtNotes.text,
                "payeeNickname": data.payeeNickname,
                "referenceNumber": data.referenceNumber,
                "accountNumber": data.accountNumber,
                "billerName": data.billerName,
                "mobileNumber": data.mobileNumber,
                "gettingFromOneTimePayment": true,
                "statusOfDefaultAccountSetUp": false,
                "defaultAccountBillPay": data.payFrom,
                "zipCode": data.zipCode,
                "billerId": data.billerId,
                "TnCcontentTransfer": TnCcontentOneTimeTransfer
            };
            return formattedOneTimePayment;
        },
        /**
         * used to check Date validations for OneTime Payment.
         */
        validateBillPayDate: function() {
            var resultDate = {
                isDateValid: false
            };
            var sendOnDate = applicationManager.getFormatUtilManager().getDateObjectFromDateComponents(this.view.calSendOn.dateComponents);
            var deliverByDate = applicationManager.getFormatUtilManager().getDateObjectFromDateComponents(this.view.calEndingOn.dateComponents);
            if (sendOnDate.getTime() <= deliverByDate.getTime()) {
                resultDate.isDateValid = true;
            }
            return resultDate;
        },
        /**
         * showErrorMessage:    used to show error flex.
         * @param {string} message error information
         */
        showInlineErrorMessage: function(message) {
            this.view.rtxDowntimeWarningDomestic.text = message;
            this.view.flxError.setVisibility(true);
            this.view.flxError.setFocus(true);
        },

        /**
         * showErrorMessage:    used to show error flex.
         * @param {string} message error information
         */
        showServerError: function(message,isAmountValid) {
            this.view.rtxDowntimeWarning.text = message;
            this.view.flxDowntimeWarning.setVisibility(true);
            this.view.flxDowntimeWarning.setFocus(true);
            //update the error code after receiving it from backend
            if (isAmountValid === false) {
                //setting error skin if the error is on amount
                this.view.flxPaymentAmount.skin = "sknborderff0000error";
                //disabling the btnNext button due to the error
                FormControllerUtility.disableButton(this.view.btnNext);
                this.view.btnNext.skin = "ICSknsknBtnBlockedSSPFFFFFF15Px";
            }
            this.view.forceLayout();
        },

        /**
         * used to set BillPay Default Account and navigate to single Bill Pay confirm screen
         * @param {object} formattedPayABill constructed Single BillPay object
         */
        setBillPayDefaultAccountWithSingleBillPayConfirm: function(formattedPayABill) {
            var self = this;
            var payFromAccount = formattedPayABill.payFrom;
            var index = payFromAccount.indexOf("(");
            var accountPaid = payFromAccount.substring(0, index);
            self.view.ConfirmDefaultAccount.lblCheckBox.text = 'D';
            self.view.flxConfirmDefaultAccount.height = self.view.flxHeader.info.frame.height + self.view.flxContainer.info.frame.height + self.view.flxFooter.info.frame.height + "dp";
            self.view.flxConfirmDefaultAccount.setVisibility(true);
            self.view.ConfirmDefaultAccount.lblPopupMessage.setFocus(true);
            self.view.ConfirmDefaultAccount.imgCross.onTouchEnd = function() {
                self.view.flxConfirmDefaultAccount.setVisibility(false);
            }
            self.view.ConfirmDefaultAccount.btnNo.onClick = function() {
                self.view.flxConfirmDefaultAccount.setVisibility(false);
                self.view.flxDowntimeWarning.setVisibility(false);
                //self.view.flxError.setVisibility(false);
                self.presenter.navigateToOneTimePaymentConfirmation(formattedPayABill);
            }
            self.view.ConfirmDefaultAccount.flxCheckBox.onClick = function() {
                if (self.view.ConfirmDefaultAccount.lblCheckBox.text === 'D') {
                    self.view.ConfirmDefaultAccount.lblCheckBox.text = 'C';
                    self.view.ConfirmDefaultAccount.lblCheckBox.skin = ViewConstants.SKINS.CHECKBOX_SELECTED_SKIN;
                } else {
                    self.view.ConfirmDefaultAccount.lblCheckBox.text = 'D';
                    self.view.ConfirmDefaultAccount.lblCheckBox.skin = ViewConstants.SKINS.CHECKBOX_UNSELECTED_SKIN;
                }
            }
            self.view.ConfirmDefaultAccount.btnYes.onClick = function() {
                if (self.view.ConfirmDefaultAccount.lblCheckBox.text === 'D') {
                    self.presenter.updateBillPayPreferedAccount(formattedPayABill.fromAccountNumber);
                    formattedPayABill.statusOfDefaultAccountSetUp = true;
                    formattedPayABill.defaultAccountBillPay = accountPaid;
                    self.view.flxConfirmDefaultAccount.setVisibility(false);
                    self.view.flxDowntimeWarning.setVisibility(false);
                    // self.view.payABill.flxError.setVisibility(false);
                    self.presenter.navigateToOneTimePaymentConfirmation(formattedPayABill);
                } else {
                    self.presenter.updateShowBillPayFromAccPop();
                    self.presenter.updateBillPayPreferedAccount(formattedPayABill.fromAccountNumber);
                    formattedPayABill.statusOfDefaultAccountSetUp = true;
                    formattedPayABill.defaultAccountBillPay = accountPaid;
                    self.view.flxConfirmDefaultAccount.setVisibility(false);
                    self.view.flxDowntimeWarning.setVisibility(false);
                    self.presenter.navigateToOneTimePaymentConfirmation(formattedPayABill);
                }
            }
        },
        /**
         * used to get the amount
         * @param {number} amount amount
         * @returns {number} amount
         */
        deformatAmount: function(amount) {
            return applicationManager.getFormatUtilManager().deFormatAmount(amount);
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
         * used to show the permission based UI
         */
        showMakePaymentOption: function() {
            this.view.flxMakeOneTimePayment.setVisibility(true);
        },
        /**
         * used to hide the permission based UI
         */
        hideMakePaymentOption: function() {
            this.view.flxMakeOneTimePayment.setVisibility(true);
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
                    }
                    //                      }
                    else {
                        accountType = account.Membership_id;
                    }
                } else {
                    accountType = account.Membership_id;
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
                            imgDropDown: "P",
                            flxDropDown: {
                                "onClick": function(context) {
                                    scopeObj.showOrHideAccountRows(context)
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
            return data;
        },



        /**
         *  creates the row template with account number and other details
         */

        createSegmentData: function(account) {
            var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
            //var combineduser = applicationManager.getConfigurationManager().isCombinedUser;
            var dataObject = {
                //  "lblAccountName": (account.accountID || account.Account_id) ? (isMobileDevice ? commonUtilities.truncateStringWithGivenLength(account.accountName+"....",26)+commonUtilities.getLastFourDigit(account.accountID) :commonUtilities.getAccountDisplayName(account)) : account.nickName,
                "lblAccountName": (account.accountID || account.Account_id) ? CommonUtilities.truncateStringWithGivenLength(account.accountName + "....", 18) + CommonUtilities.getLastFourDigit(account.accountID) : CommonUtilities.getAccountDisplayName(account),
                "lblAmount": ((account.accountType !== "CreditCard") && (account.accountType !== "Loan")) ? (account.availableBalance ? CommonUtilities.formatCurrencyWithCommas(account.availableBalance, false, account.currencyCode) : (account.bankName || account.phone || account.email)) : (CommonUtilities.formatCurrencyWithCommas(account.outstandingBalance, false, account.currencyCode)),
                "accountID": account.Account_id || account.accountID || account.accountNumber || account.payPersonId || account.PayPersonId,
                "currencyCode": account.currencyCode,
                "imgIcon": {
                    "text": account.isBusinessAccount === "true" ? "r" : "s",
                    //"isVisible" : (combineduser==="true")?true:false
                    "isVisible": this.profileAccess === "both" ? true : false
                },
                "flxIcons": {
                    //"left": (combineduser==="true")?"0px":"18px"
                    "left": this.profileAccess === "both" ? "0px" : "18px"
                },
                "lblAccType": account.accountType,
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
                var flxAccountListItem1 = JSON.parse(JSON.stringify(segData[section][1][i].flxAccountListItem));
                flxAccountListItem1["isVisible"] = isRowVisible;
                this.updateKeyAt("flxAccountListItem", flxAccountListItem1, i, section);
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
         * Initialises the segment data if its a combined user
         */
        initializeSegment: function(userData) {
            var scopeObj = this;
            //if(applicationManager.getConfigurationManager().isCombinedUser === "true"||applicationManager.getConfigurationManager().isSMEUser === "true"){
            //            if(applicationManager.getUserPreferencesManager().isSingleCustomerProfile === false){//||applicationManager.getConfigurationManager().isSMEUser === "true"){
            this.view.lbxPayFrom.setVisibility(false);
            this.view.flxFromtxt.setVisibility(true);
            this.view.segTransferFrom.rowtemplate = "flxFromAccountsList";
            this.view.segTransferFrom.widgetDataMap = {
                "flxFromAccountsList": "flxFromAccountsList",
                "flxAccountListItem": "flxAccountListItem",
                "lblAccountName": "lblAccountName",
                "flxAmount": "flxAmount",
                "flxSeparator": "flxSeparator",
                "lblAmount": "lblAmount",
                "lblCurSym": "lblCurSym",
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
            var widgetFromData = this.isSingleCustomerProfile ? this.getDataWithAccountTypeSections(userData) : this.getDataWithSections(userData);
            if (widgetFromData) {
                this.view.segTransferFrom.setData(widgetFromData);
                this.view.flxLoadingContainerFrom.setVisibility(false);
                this.view.flxNoResultsFrom.setVisibility(false);
                this.view.flxDropdownIcon.setVisibility(true);
            }
            this.view.txtTransferFrom.onTouchStart = function() {
                scopeObj.view.flxTypeIcon.setVisibility(false);
                scopeObj.view.lblSelectAccount.setVisibility(false);
                scopeObj.view.flxFromSegment.setVisibility(true);
                scopeObj.view.segTransferFrom.setVisibility(true);
                scopeObj.view.lblFromAmount.setVisibility(false);
                scopeObj.view.flxCancelFilterFrom.setActive(true);
                scopeObj.section = 0;
                scopeObj.view.forceLayout();
            };
            this.view.segTransferFrom.onRowClick = function(){
                scopeObj.onFromAccountSelection();
                scopeObj.view.flxFromtxt.setActive(true);
                scopeObj.view.flxFromtxt.accessibilityConfig = {
                    "a11yLabel": "Pay From. Currently selected" + scopeObj.view.lblSelectAccount.text  + ". Click to select another from account",
                    a11yARIA: {
                        "role": "button",
                        "aria-expanded": false
                    },
                }
            };
            this.view.flxFromSegment.onKeyPress = function(eventObject, eventPayload) {
                if (eventPayload.keyCode === 9) {
                    scopeObj.section += 1;
                    if (scopeObj.section === eventObject.data.length) {
                        scopeObj.view.flxFromSegment.setVisibility(false);
                        scopeObj.section = 0;
                        scopeObj.view.flxFromtxt.setActive(true);
                        scopeObj.view.txtTransferFrom.accessibilityConfig = {
                            a11yARIA: {
                                "aria-autocomplete": "list",
                                "role": "combobox",
                                "aria-labelledby": "lblPayFrom",
                                "aria-expanded": false,
                                "aria-required": true,
                                "aria-controls":"flxFromSegment"
                            },
                        }
                    }
                }
            };
            this.view.flxCancelFilterFrom.onClick = function() {
                scopeObj.view.txtTransferFrom.text = "";
                scopeObj.view.flxCancelFilterFrom.setVisibility(false);
                scopeObj.view.flxDropdownIcon.setVisibility(true);
                scopeObj.view.flxFromSegment.setVisibility(true);
                scopeObj.view.txtTransferFrom.setActive(true);
                scopeObj.section = 0;
                scopeObj.view.txtTransferFrom.accessibilityConfig = {
                    "a11yLabel": "",
                    a11yARIA: {
                        "aria-autocomplete": "list",
                        "role": "combobox",
                        "aria-labelledby": "lblPayFrom",
                        "aria-expanded": true,
                        "aria-required": true,
                        "aria-controls":"flxFromSegment"
                    },
                }
            };
            this.view.flxFromtxt.onClick = function() {
                if (scopeObj.view.txtTransferFrom.isVisible === false) {
                    scopeObj.view.txtTransferFrom.setVisibility(true);
                    scopeObj.view.txtTransferFrom.setFocus(true);
                    scopeObj.view.lblSelectAccount.setVisibility(false);
                    scopeObj.view.flxTypeIcon.setVisibility(false);
                    scopeObj.view.lblFromAmount.setVisibility(false);
                    scopeObj.view.flxCancelFilterFrom.setVisibility(true);
                    scopeObj.view.flxDropdownIcon.setVisibility(false);
                    scopeObj.view.flxFromSegment.setVisibility(true);
                    scopeObj.view.txtTransferFrom.accessibilityConfig = {
                        "a11yLabel": "",
                        a11yARIA: {
                            "aria-autocomplete": "list",
                            "role": "combobox",
                            "aria-labelledby": "lblPayFrom",
                            "aria-expanded": true,
                            "aria-required": true,
                            "aria-controls":"flxFromSegment"
                        },
                    }

                }
            };
            //           }
        },
        goToAddRecepientDetails: function(frm) {
            var scopeObj = this;
            scopeObj.view.flxLeft.setVisibility(false);
            scopeObj.view.flxAddRecepientTo.setVisibility(true);
            scopeObj.radioButtonClick();
            scopeObj.view.btnRecepientBack.onClick = function() {
                scopeObj.view.txtTransferFrom.text = "";
                scopeObj.view.flxTypeIcon.setVisibility(false);
                scopeObj.view.lblSelectAccount.setVisibility(false);
                scopeObj.view.lblFromAmount.setVisibility(false);
                scopeObj.view.flxLeft.setVisibility(true);
                scopeObj.view.flxAddRecepientTo.setVisibility(false);
            };
            scopeObj.view.btnRecepientCancel.onClick = this.navigateToOneTimePayee.bind(this);
            scopeObj.view.btnAddRecepientContinue.onClick = function() {
                scopeObj.getTnCOneTimeBillPay(frm);
            };
        },
        radioButtonClick: function() {
            var scopeObj = this;
            scopeObj.view.lblPersonalBankingSelect.onTouchStart = function() {
                scopeObj.view.lblPersonalBankingSelect.text = "M";
                scopeObj.view.lblBusinessBankingSelect.text = "L";
            };
            scopeObj.view.lblBusinessBankingSelect.onTouchStart = function() {
                scopeObj.view.lblPersonalBankingSelect.text = "L";
                scopeObj.view.lblBusinessBankingSelect.text = "M";
            };
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
            scopeObj.view.flxCancelFilterFrom.setVisibility(false);
            scopeObj.view.flxDropdownIcon.setVisibility(true);
            scopeObj.view.lblSelectAccount.text = segData.lblAccountName;
            scopeObj.view.lblSelectAccount.setVisibility(true);
            scopeObj.view.flxTypeIcon.setVisibility(true);
            scopeObj.view.lblTypeIcon.setVisibility(true);
            //applicationManager.getConfigurationManager().isCombinedUser==="true"?scopeObj.view.flxTypeIcon.setVisibility(true):scopeObj.view.flxTypeIcon.setVisibility(false);
            scopeObj.profileAccess === "both" ? scopeObj.view.flxTypeIcon.setVisibility(true) : scopeObj.view.flxTypeIcon.setVisibility(false);
            scopeObj.view.lblTypeIcon.text = segData.imgIcon.text;
            // scopeObj.view.lblFromAmount.setVisibility(true);
            // scopeObj.view.lblFromAmount.text = segData.lblAmount;
            scopeObj.view.flxFromSegment.setVisibility(false);
            scopeObj.checkValidityBillPay();
        },
        /**
         * prefill the from account field
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