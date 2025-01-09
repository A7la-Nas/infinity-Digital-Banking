/**
 * Description of Module representing a Confirm form.
 * @module frmBillPaymentDueController
 */
define(['CommonUtilities', 'OLBConstants', 'ViewConstants', 'FormControllerUtility'], function(CommonUtilities, OLBConstants, ViewConstants, FormControllerUtility) {
     
    var orientationHandler = new OrientationHandler();

    return /** @alias module:frmBillPaymentDueController */ {
        /** updates the present Form based on required function.
         * @param {uiDataMap[]} uiDataMap
         */
        profileAccess: "",
        updateFormUI: function(uiDataMap) {
            if (uiDataMap.isLoading) {
                FormControllerUtility.showProgressBar(this.view);
            } else {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (uiDataMap.serverError) {
                this.setServerError(uiDataMap.serverError);
            } else {
                this.view.flxDowntimeWarning.setVisibility(false);
            }
            if (uiDataMap.paymentDueBills) {
                this.setPaymentDueBillsSegmentData(uiDataMap.paymentDueBills, uiDataMap.billPayAccounts);
                this.initializeSearchAndFilterActions(uiDataMap.paymentDueBills, uiDataMap.billPayAccounts);
                FormControllerUtility.updateSortFlex(this.paymentDueSortMap, uiDataMap.noOfRecords);
            }
        },
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.presenter = applicationManager.getModulesPresentationController({ 'appName': 'BillPayMA', 'moduleName': 'BillPaymentUIModule' });
            this.initActions();
        },
        preShow: function() {
            this.profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
            this.view.customheadernew.activateMenu("Bill Pay", "Pay a Bill");
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader', 'flxFooter']);
            // this.view.imgSearch.toolTip = kony.i18n.getLocalizedString("i18n.serviceRequests.Search");
            // this.view.btnAllPayees.toolTip = kony.i18n.getLocalizedString("i18n.billPay.AllPayees");
            // this.view.btnPayementDue.toolTip = kony.i18n.getLocalizedString("i18n.billPay.PaymentDue");
            // this.view.btnScheduled.toolTip = kony.i18n.getLocalizedString("i18n.billPay.scheduled");
            // this.view.btnHistory.toolTip = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.bulkPaymentHistory");
            // this.view.btnManagePayee.toolTip = kony.i18n.getLocalizedString("i18n.billPay.ManagePayee");
            // this.view.imgSortPayee.toolTip = kony.i18n.getLocalizedString("i18n.payments.sortByPayee");
            // this.view.imgSortDatee.toolTip = kony.i18n.getLocalizedString("i18n.payments.sortByDueDate");
            // this.view.imgBill.toolTip = kony.i18n.getLocalizedString("i18n.payments.sortByBill");
            // this.view.imgInfo.toolTip = kony.i18n.getLocalizedString("kony.mb.NAO.Info");
            // this.view.btnBulkConfirm.toolTip = kony.i18n.getLocalizedString("i18n.unifiedBeneficiary.Continue");
            // this.view.imgCrossIcon.toolTip = kony.i18n.getLocalizedString("i18n.TransfersEur.btnCancel");
            // this.view.btnProceed.toolTip = kony.i18n.getLocalizedString("i18n.common.yes");
            // this.view.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.common.Not");
            // this.view.imgCancel.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.closeAccount");
            // this.view.imgDownload.toolTip = kony.i18n.getLocalizedString("i18n.common.Download");
            // this.view.imgFlip.toolTip = kony.i18n.getLocalizedString("i18n.payments.flip");
            this.view.customheadernew.flxShadowContainer.accessibilityConfig={
                "a11yARIA":{
                    "aria-hidden":true
                }
            }
    
            this.view.customheadernew.btnSkipNav.onClick = this.skipToMainContent;
            this.view.btnSkipRight.onClick = this.skipToRightContent;
            this.view.CustomPopupLogout.onKeyPress = this.onKeyPressCallBack;
            this.view.CustomPopupLogout.doLayout = CommonUtilities.centerPopupFlex;
            this.view.CustomPopupCancel.doLayout = CommonUtilities.centerPopupFlex;
        },
        /**
         * used perform the initialize activities.
         *
         */
        initActions: function() {
            var scopeObj = this;
            scopeObj.setPaymentDueSorting();
            this.view.flxFiltersList.onClick = this.onFiltersBtnClick.bind(this);
            scopeObj.setTabActions();
        },
        /**
         * used to perform the post show activities
         *
         */
        postShow: function() {
            var scopeObj = this;
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            applicationManager.executeAuthorizationFramework(this);
            this.accessibilityFocusSetup();
        },
        /**
         * Set foucs handlers for skin of parent flex on input focus 
         */
        accessibilityFocusSetup: function() {
            let widgets = [
                [this.view.txtSearch, this.view.flxtxtSearchandClearbtn]
            ]
            for (let i = 0; i < widgets.length; i++) {
                CommonUtilities.setA11yFoucsHandlers(widgets[i][0], widgets[i][1], this)
            }
        },
        /**
         * used to load the  due payements
         * @param {object} dueBills due bills
         */
        bindTotalEbillAmountDue: function(dueBills) {
            var scopeObj = this;
            if (dueBills && dueBills.count === 0) {
                scopeObj.view.flxTotalEbillAmountDue.setVisibility(false);
            } else {
                scopeObj.view.flxTotalEbillAmountDue.setVisibility(true);
                scopeObj.view.lblBills.text = dueBills.count + " " + kony.i18n.getLocalizedString("i18n.billPay.eBills");
                scopeObj.view.lblEbillAmountDueValue.text = scopeObj.formatAmount(String(dueBills.totalDueAmount));
            }
            scopeObj.view.forceLayout();
        },
    /**
     * skip To Main Content
     */
        skipToMainContent: function() {
            this.view.lblTransactions.setActive(true);
        },

        skipToRightContent: function() {
            if(this.view.flxTotalEbillAmountDue.isVisible===true){
                this.view.lblTotalEbillAmountDue.setActive(true);
            }
            else{
                this.view.flxAddPayee.setActive(true);
            }
        },

        onKeyPressCallBack: function(eventObject, eventPayload) {
            if (eventPayload.keyCode === 27) {
                if (this.view.flxLogout.isVisible === true) {
                    this.view.flxDialogs.isVisible = false;
                    this.view.flxLogout.isVisible = false;
                    this.view.customheadernew.btnLogout.setFocus(true);
                }
            }
        },


        /**
         * sorting configurations to billPay
         */
        setPaymentDueSorting: function() {
            var scopeObj = this;
            scopeObj.paymentDueSortMap = [{
                    name: 'nickName',
                    imageFlx: scopeObj.view.imgSortPayee,
                    clickContainer: scopeObj.view.flxPayee
                },
                {
                    name: 'billDueDate',
                    imageFlx: this.view.imgSortDatee,
                    clickContainer: this.view.flxDate
                }
            ];
            FormControllerUtility.setSortingHandlers(scopeObj.paymentDueSortMap, scopeObj.onPaymentDueSortClickHandler, scopeObj);
        },


        /**
         * used to show the no payees flow.
         * @param {message} message used to show the no message message on the page
         */
        showNoPayementDetails: function(message) {
            var scopeObj = this;
            if (message) {
                scopeObj.view.flxNoPayment.setVisibility(true);
                scopeObj.view.flxBulkBillPayHeader.setVisibility(false);
                scopeObj.view.segmentBillpay.setVisibility(false);
                scopeObj.view.flxHorizontalLine.setVisibility(false);
                scopeObj.view.flxHorizontalLine2.setVisibility(false);
                scopeObj.view.flxConfirmButton.setVisibility(false);
                scopeObj.view.rtxNoPaymentMessage.text = kony.i18n.getLocalizedString(message.noPaymentMessageI18Key);
                if (message.showActionMessageI18Key) {
                    scopeObj.view.lblScheduleAPayment.setVisibility(false);
                    scopeObj.view.lblScheduleAPayment.text = kony.i18n.getLocalizedString(message.showActionMessageI18Key);
                }
            }
        },

        /**
         * used to format the amount
         * @param {string} amount amount
         * @param {boolean} currencySymbolNotRequired currency symbol required
         * @returns {string} formated amount
         */
        formatAmount: function(amount, currencySymbolNotRequired, currencySymbol) {
            if (currencySymbolNotRequired) {
                return applicationManager.getFormatUtilManager().formatAmount(amount);
            } else {
                return applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(amount, currencySymbol);
            }
        },

        /**
         * On Scheduled sort Click handler
         * @param {object} event
         * @param {object} data
         */
        onPaymentDueSortClickHandler: function(event, data) {
            var scopeObj = this;
            FormControllerUtility.showProgressBar(this.view);
            scopeObj.presenter.loadDueBills(data);
        },


        /**
         * validateBulkPayData:    used to validate the bulk payment.
         */
        validateBulkPayData: function() {
            var data = this.view.segmentBillpay.data;
            var self = this;
            var isInputValid = false;
            var isValidRecordFound = false;
            var errMsg = kony.i18n.getLocalizedString("i18n.Profilemanagement.lblInvalidAmount");
            for (var record in data) {
                if (data[record].txtAmount.text) {
                    var amount = parseFloat(self.deformatAmount(data[record].txtAmount.text));
                    var accountNumber = data[record].preferredAccountNumber;
                    if (isNaN(amount)) {
                        isInputValid = false;
                        // data[record].flxAmount.skin = ViewConstants.SKINS.LOANS_FLEX_ERROR;
                        // this.view.segmentBillpay.setDataAt(data[record], record);
                        break;
                    } else {
                        // data[record].flxAmount.skin = ViewConstants.SKINS.COMMON_FLEX_NOERRORSKIN;
                        // this.view.segmentBillpay.setDataAt(data[record], record);
                        var result = self.presenter.validateBillPayAmount({
                            "amount": amount,
                            "fromAccountNumber": accountNumber
                        });
                        if (!result.isAmountValid) {
                            isInputValid = false;
                            errMsg = result.errMsg;
                            break;
                        } else {
                            isInputValid = true;
                            isValidRecordFound = true;
                        }
                    }
                }
            }
            if (isInputValid) {
                self.hideErrorFlex();
                var bulkbillPayObj = self.getBulkPayeesConfirmPaymentData();
                this.getTnC({
                    isPayDue: true,
                    data: bulkbillPayObj
                });
            } else {
                self.setServerError({
                    "errorMessage": errMsg
                });
            }
        },

        /**
         * used to set the 
         */
        getBulkPayeesConfirmPaymentData: function() {
            var self = this;
            var bulkPayRecords = this.view.segmentBillpay.data;
            var records = [];
            var totalSum = 0;
            var index;

            function getDateFromConfiguration(dateComponents) {
                var dateObj = new Date(dateComponents[2] /* Year */ , dateComponents[1] - 1 /* Month*/ , dateComponents[0] /* Day*/ );
                return applicationManager.getFormatUtilManager().getFormatedDateString(dateObj, applicationManager.getFormatUtilManager().getApplicationDateFormat());
            }
            for (index = 0; index < bulkPayRecords.length; index++) {
                var deliverBy = bulkPayRecords[index].lblDeliverBy.text;
                var deliverByVal = (deliverBy.split(":"))[1];
                var deliverByValue = (deliverByVal.split(")"))[0];
                var txtAmount = bulkPayRecords[index].txtAmount.text;
                var accountName = self.setSelectedKeyValueForListbox(bulkPayRecords[index].lstPayFrom.masterData, bulkPayRecords[index].lstPayFrom.selectedKey);
                if (txtAmount !== '' && txtAmount !== null && (parseFloat(self.deformatAmount(txtAmount)) > 0)) {
                    totalSum = totalSum + parseFloat(self.deformatAmount(bulkPayRecords[index].txtAmount.text));
                    records.push({
                        "lblPayee": bulkPayRecords[index].lblPayee,
                        "isBusinessPayee": bulkPayRecords[index].isBusinessPayee,
                        "lblSendOn": getDateFromConfiguration(bulkPayRecords[index].calSendOn.dateComponents),
                        "lblDeliverBy": deliverByValue, //getDateFromConfiguration(bulkPayRecords[index].calDeliverBy.dateComponents),
                        "lblAmount": {
                            "text": self.formatAmount(self.deformatAmount(bulkPayRecords[index].txtAmount.text)),
                            "accessibilityconfig": {
                                "a11yLabel": self.formatAmount(self.deformatAmount(bulkPayRecords[index].txtAmount.text))
                            }
                        },
                        "lblPaymentAccount": {
                            "text": self.setSelectedKeyValueForListbox(bulkPayRecords[index].lstPayFrom.masterData, bulkPayRecords[index].lstPayFrom.selectedKey),
                            "accessibilityconfig": {
                                "a11yLabel": self.setSelectedKeyValueForListbox(bulkPayRecords[index].lstPayFrom.masterData, bulkPayRecords[index].lstPayFrom.selectedKey)
                            }
                        },
                        "payeeId": bulkPayRecords[index].payeeId !== undefined ? bulkPayRecords[index].payeeId : bulkPayRecords[index].lblPayeeId,
                        "billid": bulkPayRecords[index].billid !== undefined ? bulkPayRecords[index].billid : bulkPayRecords[index].lblBillId,
                        "payeeAccountNumber": bulkPayRecords[index].payeeAccountNumber,
                        "accountNumber": bulkPayRecords[index].lstPayFrom.selectedKey,
                        "transactionsNotes": bulkPayRecords[index].txtNotes.text,
                        "flxPayeeIcon": {
                            //"isVisible" :applicationManager.getConfigurationManager().isCombinedUser === "true" ? true : false
                            "isVisible": false//this.profileAccess === "both" ? true : false
                        },
                        "lblPayeeIcon": {
                            "isVisible": this.profileAccess === "both" ? true : false,
                            //"isVisible": applicationManager.getConfigurationManager().isCombinedUser === "true" ? true : false,
                            "text": bulkPayRecords[index].isBusinessPayee === "1" ? "r" : "s",
                        },
                        "flxPaymentIcon": {
                            "isVisible": this.profileAccess === "both" ? true : false,
                            //"isVisible":applicationManager.getConfigurationManager().isCombinedUser === "true" ? true : false,
                        },
                        "lblPaymentIcon": {
                            "isVisible": this.profileAccess === "both" ? true : false,
                            // "isVisible": applicationManager.getConfigurationManager().isCombinedUser === "true" ? true : false,
                            "text": this.presenter.isBusinessAccount(bulkPayRecords[index].accountId) === "true" ? "r" : "s"
                        },
                        "lblPayeeAddress": {
                            "text": kony.i18n.getLocalizedString("i18n.ChequeBookReq.Address") + " " + (bulkPayRecords[index].lblLineOne ? bulkPayRecords[index].lblLineOne + " " + bulkPayRecords[index].lblLineTwo : "Address line 01 Address line 02")
                        },
                        "lblEndingBalanceAccount": {
                            "text": kony.i18n.getLocalizedString("i18n.payments.endingBalanceWithColon") + " " + accountName.substring(accountName.indexOf("(") + 1, accountName.indexOf(")"))
                        },
                        // "lblEndingBalanceAccount": {
                        //     "text": "Ending Balance: " + bulkPayRecords[index].lstPayFrom.selectedkeyvalue[1].substring( bulkPayRecords[index].lstPayFrom.selectedkeyvalue[1].indexOf("(")+1, bulkPayRecords[index].lstPayFrom.selectedkeyvalue[1].indexOf(")"))
                        // },
                    });
                }
            }
            var billPayData = {};
            billPayData.records = records;
            billPayData.totalSum = self.formatAmount(totalSum);
            billPayData.bulkPayRecords = bulkPayRecords;
            return billPayData;
        },
        /**
         * getTnC:    used to get the terms and condtions.
         */
        getTnC: function(tncObj) {
            var scopeObj = this;
            scopeObj.presenter.getTnCBillPayTransfer(tncObj);
        },

        /**
         * Method to return value for selected key value for listbox
         * @param {object} masterData has master data of listbox
         * @param {string} selectedKey has selected key for listbox
         * @return {string} selectedkeyvalue
         */
        setSelectedKeyValueForListbox: function(masterData, selectedKey) {
            var selectedkeyvalue;
            masterData.map(function(item) {
                if (item[0] === selectedKey) {
                    selectedkeyvalue = item;
                }
            });
            var result = selectedkeyvalue ? selectedkeyvalue[1] : masterData[0][1];
            return result;
        },

        /**
         * hideErrorFlex:    used to hide error flex.
         */
        hideErrorFlex: function() {
            this.view.flxDowntimeWarning.setVisibility(false);
            this.view.forceLayout();
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
         * executes and displays the error flex in landing page.
         * @param {boolean} isError used to display the flex
         * @param {object} erroObj  get the exact error mesage
         */
        setServerError: function(erroObj) {
            var scopeObj = this;
            scopeObj.view.flxDowntimeWarning.setVisibility(true);
            if (erroObj.errorMessage) {
                scopeObj.view.rtxDowntimeWarning.text = erroObj.errorMessage;
            } else {
                scopeObj.view.rtxDowntimeWarning.text = kony.i18n.getLocalizedString("i18n.common.OoopsServerError");
            }
            FormControllerUtility.hideProgressBar(scopeObj.view);
            scopeObj.view.forceLayout();
        },
        /** 
         * used to set the popup.
         * @param {obj} obj
         */
        showPopUp: function(obj) {
            var scopeObj = this;
            scopeObj.view.CustomPopupCancel.lblHeading.text = obj.dialogueHeader;
            scopeObj.view.CustomPopupCancel.lblPopupMessage.text = obj.dialogueText;
            scopeObj.view.flxDialogs.setVisibility(true);
            scopeObj.view.flxCancelPopup.setVisibility(true);
            scopeObj.view.CustomPopupCancel.btnYes.onClick = function() {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.setVisibility(false);
                obj.dialogueAction();
            };
            scopeObj.view.CustomPopupCancel.btnNo.onClick = function() {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.setVisibility(false);
            };
            scopeObj.view.CustomPopupCancel.flxCross.onClick = function() {
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.setVisibility(false);
            };
        },


        /**
         * used to convert the CalenderFormat Date
         * @param {String} dateString string formated date
         * @param {string} inputFormat input format
         * @returns {string} outputDate output date
         */
        getDateFromDateString: function(dateString, inputFormat) {
            var fu = applicationManager.getFormatUtilManager();
            var dateObj = fu.getDateObjectfromString(dateString, inputFormat);
            var outputDate = fu.getFormatedDateString(dateObj, fu.getApplicationDateFormat());
            return outputDate;
        },

        /**
         * used to set the actions
         */
        setTabActions: function() {
            this.view.btnAllPayees.onClick = this.loadAllPayees.bind(this);
            this.view.btnPayementDue.onClick = this.loadPayementDues.bind(this);
            this.view.btnScheduled.onClick = this.loadScheduleBills.bind(this);
            this.view.btnHistory.onClick = this.loadBillPayHistory.bind(this);
            this.view.btnManagePayee.onClick = this.loadManagePayees.bind(this);
            this.view.flxAddPayee.onClick = this.loadAddPayee.bind(this);
            this.view.flxMakeOneTimePayment.onClick = this.loadOneTimePayement.bind(this);
            if(kony.os.deviceInfo().screenHeight<200){
               this.view.btnAllPayees.skin = "ICSknBtnAccountSummaryUnselected10px";
               this.view.btnPayementDue.skin = "ICSknBtnAccountSummarySelected10px";
               this.view.btnScheduled.skin = "ICSknBtnAccountSummaryUnselected10px";
               this.view.btnHistory.skin = "ICSknBtnAccountSummaryUnselected10px";
               this.view.btnManagePayee.skin = "ICSknBtnAccountSummaryUnselected10px";
               this.view.btnAllPayees.hoverSkin = "";
               this.view.btnPayementDue.hoverSkin = "";
               this.view.btnScheduled.hoverSkin = "";
               this.view.btnHistory.hoverSkin = "";
               this.view.btnManagePayee.hoverSkin = "";
           }
        },

        /**
         * used to load the Bulk Payees
         */
        loadAllPayees: function() {
            var scopeObj = this;
            scopeObj.presenter.showBillPaymentScreen({
                context: "BulkPayees",
                loadBills: true
            });
        },

        /**
         * used to load the Due Payements
         */
        loadPayementDues: function() {
            var scopeObj = this;
            scopeObj.presenter.showBillPaymentScreen({
                context: "DueBills",
                loadBills: true
            });
        },

        /**
         * used to load the scheduled bills
         */
        loadScheduleBills: function() {
            var scopeObj = this;
            scopeObj.presenter.showBillPaymentScreen({
                context: "ScheduleBills",
                loadBills: true
            });
        },

        /**
         * used to load the bill pay history
         */
        loadBillPayHistory: function() {
            var scopeObj = this;
            scopeObj.presenter.showBillPaymentScreen({
                context: "History",
                loadBills: true
            });
        },

        /**
         * used to load the manage payees
         */
        loadManagePayees: function() {
            var scopeObj = this;
            scopeObj.presenter.showBillPaymentScreen({
                context: "ManagePayees",
                loadBills: true
            });
        },

        /**
         * used to load the Payee Module
         */
        loadAddPayee: function() {
            var scopeObj = this;
            scopeObj.presenter.showBillPaymentScreen({
                context: "AddPayee"
            });
        },

        /**
         * used to load the Payee Module
         */
        loadOneTimePayement: function() {
            var scopeObj = this;
            scopeObj.presenter.showBillPaymentScreen({
                context: "MakeOneTimePayment",
                callbackModelConfig: {
                    duePayment: true
                }
            });
        },

        /**
         * setPaymentDueBillsSegmentData:    used to set bulk payees segment data.
         * @param {object} bulkPayees bulk payees object
         * @param {object} billPayAccounts bill pay accounts
         * */
        setPaymentDueBillsSegmentData: function(bulkPayees, billPayAccounts) {
            var scopeObj = this;
            FormControllerUtility.showProgressBar(this.view);
            scopeObj.view.flxNoPayment.setVisibility(false);
            //if(configurationManager.isCombinedUser === "true"){
            if (applicationManager.getUserPreferencesManager().isSingleCustomerProfile === false) {
                scopeObj.view.flxSearchandFilters.setVisibility(true);
                if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
                    scopeObj.view.flxFiltersList.setVisibility(false);
                    scopeObj.view.flxtxtSearchandClearbtn.right = "3.5%";
                }
            } else {
                scopeObj.view.flxSearchandFilters.setVisibility(false);
            }
            scopeObj.view.segmentBillpay.setVisibility(true);
            scopeObj.view.flxHorizontalLine.setVisibility(true);
            scopeObj.view.flxHorizontalLine2.setVisibility(true);
            if (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) {
                scopeObj.view.flxBulkBillPayHeader.setVisibility(false);
                scopeObj.view.flxConfirmButton.setVisibility(false);

            } else {
                scopeObj.view.flxBulkBillPayHeader.setVisibility(true);
                scopeObj.view.flxConfirmButton.setVisibility(true);
            }
            if (bulkPayees) {
                if (bulkPayees.length === 0) {
                    scopeObj.showNoPayementDetails({
                        noPaymentMessageI18Key: "i18n.billPay.noPaymentDueMessage"
                    });
                    this.view.flxSearchandFilters.setVisibility(false);
                    scopeObj.bindTotalEbillAmountDue({
                        count: 0
                    });
                } else {
                    var preferredAccountNumber = scopeObj.presenter.getBillPayPreferedAccountNumber();
                    this.view.btnBulkConfirm.onClick = this.validateBulkPayData.bind(this);
                    var billPayData = {
                        "bulkPayees": bulkPayees,
                        count: bulkPayees.length,
                        totalDueAmount: 0
                    };
                    this.getNewBulkPayData(billPayData, billPayAccounts, preferredAccountNumber);
                    var dataMap = {
                        "lblIdentifier": "lblIdentifier",
                        "lblDropdown": "lblDropdown",
                        "lblPayee": "lblPayee",
                        "lblPayeeDate": "lblPayeeDate",
                        "btnEbill": "btnEbill",
                        "lblDueDate": "lblDueDate",
                        "lblBill": "lblBill",
                        "txtAmount": "txtAmount",
                        "lblSeparator": "lblSeparator",
                        "lblPayFrom": "lblPayFrom",
                        "lblSendOn": "lblSendOn",
                        "lblDeliverBy": "lblDeliverBy",
                        "lstPayFrom": "lstPayFrom",
                        "imgListBoxDropdown": "imgListBoxDropdown",
                        "calSendOn": "calSendOn",
                        "calDeliverBy": "calDeliverBy",
                        "lblNotes": "lblNotes",
                        "lblCategory": "lblCategory",
                        "txtNotes": "txtNotes",
                        "lblCategoryList": "lblCategoryList",
                        "imgCategoryListDropdown": "imgCategoryListDropdown",
                        "btnViewEBill": "btnViewEBill",
                        "btnPayBill": "btnPayBill",
                        "lblfromAccountNumber": "lblfromAccountNumber",
                        "lblBillId": "lblBillId",
                        "lblPayeeId": "lblPayeeId",
                        "paymentDue": "paymentDue",
                        "lblDollar": "lblDollar",
                        "flxDropdown": "flxDropdown",
                        "flxIdentifier": "flxIdentifier",
                        "lblSeparatorBottom": "lblSeparatorBottom",
                        "flxBillPaymentAllPayeesSelected": "flxBillPaymentAllPayeesSelected",
                        "flxBillPaymentAllPayeesMobileSelected": "flxBillPaymentAllPayeesMobileSelected",
                        "flxAmount": "flxAmount",
                        "flxIcon": "flxIcon",
                        "lblIcon": "lblIcon",
						"flxdetails":"flxdetails"
                    };
                    this.view.segmentBillpay.widgetDataMap = dataMap;
                    var segmentData = billPayData.formattedPayementDueRecords;
                    this.view.segmentBillpay.setData(segmentData);
                    scopeObj.bindTotalEbillAmountDue(billPayData);
                }
            }
            scopeObj.view.forceLayout();
            FormControllerUtility.hideProgressBar(this.view);
        },

        /*
         * method to display the types of payees list
         */
        onFiltersBtnClick: function() {
            this.view.accountTypesBillPayPaymentDue.setVisibility(!this.view.accountTypesBillPayPaymentDue.isVisible);
            this.view.accountTypesBillPayPaymentDue.skin = "slfBoxffffffB1R5";
            this.view.accountTypesBillPayPaymentDue.flxAccountTypesSegment.skin = "slfBoxffffffB1R5";
            // this.view.accountTypesBillPayPaymentDue.segAccountTypes.rowSkin = "slfBoxffffffB1R5";
        },

        /*
         * Method to initialize search and filter actions
         */
        initializeSearchAndFilterActions: function(paymentDueBills, billPayAccounts) {
            this.initializeFilterSegments();
            this.view.txtSearch.text = "";
            this.view.flxClearBtn.setVisibility(false);
            this.view.flxClearBtn.onClick = this.onSearchClearBtnClick.bind(this, paymentDueBills, billPayAccounts);
            this.view.txtSearch.onKeyUp = this.onTxtSearchKeyUp.bind(this);
            this.view.txtSearch.onDone = this.onSearchBtnClick.bind(this, paymentDueBills, billPayAccounts);
            this.view.btnConfirm.onClick = this.onSearchBtnClick.bind(this, paymentDueBills, billPayAccounts);
            this.view.flxFiltersList.onClick = this.onFiltersBtnClick.bind(this);
            this.view.accountTypesBillPayPaymentDue.segAccountTypes.onRowClick = this.onFilterSelection.bind(this, paymentDueBills, billPayAccounts);
            //this.view.accountTypesBillPaySchedule.segAccountTypes.onRowClick = function(eventobject, sectionIndex, rowIndex){     
            //this.onFilterSelection(eventobject, sectionIndex, rowIndex, scheduledBills);
            //}.bind(this);
        },

        /*
         * Method to add data to filter segment
         */
        initializeFilterSegments: function() {
            // this.view.a = this.view.LisiBox1.masterData[0]; 

            //this.view.accountTypesBillPaySchedule.setVisibility(true);
            var data = [
            {
                    "flxAccountTypes":{
                        "height":"40dp"
                    },
                    "lblSeparator":{
                        "text":"lblSeparator",
                        "isVisible":true
                    },
                    "lblUsers": {
                        "text":"All Payees",
                        "left":"10dp"
                    }
                },
                {
                    "flxAccountTypes":{
                        "height":"40dp"
                    },
                    "lblSeparator":{
                        "text":"lblSeparator",
                        "isVisible":true
                    },
                    "lblUsers": {
                        "text":"Personal Payees",
                        "left":"10dp"
                    }
                },
                {
                    "flxAccountTypes":{
                        "height":"40dp"
                    },
                    "lblSeparator":{
                        "text":"lblSeparator",
                        "isVisible":true
                    },
                    "lblUsers": {
                        "text":"Business Payees",
                        "left":"10dp"
                    }
                }
            ];
            this.view.accountTypesBillPayPaymentDue.segAccountTypes.widgetDataMap = {
                "lblUsers": "lblUsers",
                "flxAccountTypes":"flxAccountTypes",
                "lblSeparator":"lblSeparator"
            };
            this.view.accountTypesBillPayPaymentDue.height="120dp";
            this.view.accountTypesBillPayPaymentDue.segAccountTypes.setData(data);
            this.view.lblType.text = this.view.accountTypesBillPayPaymentDue.segAccountTypes.data[0].lblUsers.text;

        },

        /*
         * Method to process segment ui based on selected filter
         */
        onFilterSelection: function(paymentDueBills, billPayAccounts) {
            var scopeObj = this;
            //var segData = this.view.accountTypesBillPaySchedule.segAccountTypes.data;
            //accounts = context.recipients;    
            this.view.accountTypesBillPayPaymentDue.setVisibility(false);
            var data = scopeObj.getSearchAndFilterData(paymentDueBills);
            // context.recipients = data;
            this.setPaymentDueBillsSegmentData(data, billPayAccounts);
            scopeObj.view.forceLayout();
        },

        /**
         * method used to enable or disable the clear button.
         */
        onTxtSearchKeyUp: function() {
            var scopeObj = this;
            var searchKeyword = scopeObj.view.txtSearch.text.trim();
            if (searchKeyword.length > 0) {
                scopeObj.view.flxClearBtn.setVisibility(true);
            } else {
                scopeObj.view.flxClearBtn.setVisibility(false);
            }
            this.view.flxtxtSearchandClearbtn.forceLayout();
        },

        /**
         * method used to clear search
         */
        onSearchClearBtnClick: function(paymentDueBills, billPayAccounts) {
            var scopeObj = this;

            scopeObj.view.txtSearch.text = "";
            scopeObj.view.flxClearBtn.setVisibility(false);
            //var data = scopeObj.getSearchAndFilterData(scheduledBills);
            this.setPaymentDueBillsSegmentData(paymentDueBills, billPayAccounts);
            // context.recipients = data;
            //this.bindScheduleBills(data);     
        },

        /**
         * method to handle the search account functionality
         */
        onSearchBtnClick: function(paymentDueBills, billPayAccounts) {
            var scopeObj = this;
            // accounts = context.recipients;    
            var data = scopeObj.getSearchAndFilterData(paymentDueBills);
            // context.recipients = data;
            this.setPaymentDueBillsSegmentData(data, billPayAccounts);
            scopeObj.view.forceLayout();
        },

        /**
         * method to get data from search and filter values
         */
        getSearchAndFilterData: function(paymentDueBills) {
            var scopeObj = this;
            var selectedAccountType = this.view.accountTypesBillPayPaymentDue.segAccountTypes.selectedRowItems;
            this.view.lblType.text =  (selectedAccountType !== null && selectedAccountType.length !== 0) ? selectedAccountType[0].lblUsers.text : this.view.accountTypesBillPayPaymentDue.segAccountTypes.data[0].lblUsers.text;
            var filterQuery = this.view.lblType.text;
            var searchQuery = scopeObj.view.txtSearch.text.trim();

            if (filterQuery.includes("All Payees")) {
                var accountlist = [];
                accountlist = paymentDueBills;
                //all accounts will be shown      
            } else if (filterQuery.includes("Personal Payees")) {
                //        accounts = accounts.filter(accounts.type==="Individual");
                var accountlist = [];
                for (i = 0; i < paymentDueBills.length; i++) {
                    if (paymentDueBills[i].isBusinessPayee === "0") {
                        accountlist.push(paymentDueBills[i]);
                        //accountlist = JSON.stringify(accounts[i]);
                    }
                }
                paymentDueBills = accountlist;
            } else if (filterQuery.includes("Business Payees")) {
                //accounts = accounts.filter(this.isBusinessAccount);
                var accountlist = [];
                for (i = 0; i < paymentDueBills.length; i++) {
                    if (paymentDueBills[i].isBusinessPayee === "1") {
                        accountlist.push(paymentDueBills[i]);
                        //accountlist = JSON.stringify(accounts[i]);
                    }
                }
                paymentDueBills = accountlist;
            }
            if (searchQuery !== "") {
                // var data = scopeObj.getDataWithSections(accounts);
                var data = paymentDueBills;
                var searchresults = [];
                if (!kony.sdk.isNullOrUndefined(searchQuery) && searchQuery !== "") {

                    var j = 0;
                    for (var i = 0; i < data.length; i++) {
                        var rowdata = null;
                        if ((data[i].paidAmount && data[i].paidAmount.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1) ||
                            (data[i].payeeName && data[i].payeeName.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1) ||
                            (data[i].billDueAmount && data[i].billDueAmount.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1)) {
                            rowdata = data[i];
                        }
                        if (kony.sdk.isNullOrUndefined(rowdata)) {
                            //data[i][1][0].flxAccountsRowWrapper["isVisible"] = false;
                            //data[i][1][0].flxNoResultsFound["isVisible"] = true;
                            data[i].isNoRecords = true;
                            data[i].lblNoResultsFound = {
                                "text": kony.i18n.getLocalizedString("i18n.FastTransfers.NoResultsFound")
                            };
                            var noRecordsData = data[i];
                            //data[i] = [];
                            if (data[i].isNoRecords === false) {
                                searchresults[j].push(noRecordsData);
                                j++;
                            }
                        } else {
                            //data[i] = [];
                            searchresults[j] = rowdata;
                            j++;
                        }
                    }
                }
                return searchresults;
            } else {
                return paymentDueBills;
            }
        },
        /**
         * navigate to PayABill screen
         */
        onClickPayBill: function(data) {
            var scopeObj = this;
            data.onCancel = function() {
                kony.mvc.getNavigationManager().navigate({
                    context: this,
                    callbackModelConfig: {
                        duePayment: true
                    }
                });
            };
            scopeObj.presenter.showBillPaymentScreen({
                "context": 'PayABill',
                "loadBills": true,
                "data": data
            });
        },

        /**
         * getNewBulkPayData:     Method to handle bulk pay
         * @param {object} data data
         * @param {object} billPayAccounts billPay accounts
         * @param {string} preferredAccountNumber prefferd account number
         */
        getNewBulkPayData: function(data, billPayAccounts, preferredAccountNumber) {
            data.formattedPayementDueRecords = data.bulkPayees.map(this.createNewBulkPayData.bind(this, billPayAccounts, preferredAccountNumber));
            data.bulkPayees.map(function(dataItem) {
                data.totalDueAmount += parseFloat(dataItem.dueAmount);
            });
        },

        /**
         * Method to create the bulk Payement UI
         * @param {object} billPayAccounts billPay accounts
         * @param {string}  preferredAccountNumber prefferd account number
         * @param {object} data data
         * @returns {object} payee list
         */
        createNewBulkPayData: function(billPayAccounts, preferredAccountNumber, data) {
            var lblPayeeDate;
            var lblDueDate;
            var lblBill;
            var btnEbill;
            var btnViewEbill;
            var lblPayee;
            var btnActivateEBill;
            var txtAmount;
            var scopeObj = this;
            var self = this;
            var isBusiness = data.isBusinessPayee;
            var addressLine1 = data.addressLine1;
            var addressLine2 = data.addressLine2;
            var specialCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\";
            var alphabetsSet = "abcdefghijklmnopqrstuvwxyz";
            var format = applicationManager.getFormatUtilManager().getDateFormat().toUpperCase();
            if (data.transitDays) {
                var transitDays = data.transitDays;
            } else {
                var transitDays = 0;
            }
            lblPayee = data.payeeNickName ? data.payeeNickName : data.payeeName;
            var btnPayBill = {
                "text": kony.i18n.getLocalizedString("i18n.Pay.PayBill"),
                "onClick": self.onClickPayBill.bind(this, data),
                "isVisible": applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_CREATE")
            }
            var nonValue = kony.i18n.getLocalizedString("i18n.common.none");
            if (data.billid === "0") {
                lblPayeeDate = kony.i18n.getLocalizedString("i18n.billPay.lastPayment") + ": " + kony.i18n.getLocalizedString("i18n.billPay.noPaymentActivity");
                lblDueDate = nonValue;
                lblBill = nonValue;
                txtAmount = {
                    "placeholder": kony.i18n.getLocalizedString("i18n.common.EnterAmount"),
                    "text": "",
                    "restrictCharactersSet": specialCharactersSet.replace(',.', '') + alphabetsSet + alphabetsSet.toUpperCase()
                };
            } else {
                lblPayeeDate = kony.i18n.getLocalizedString("i18n.billPay.lastPayment") + ": " + (data.lastPaidAmount ? ((scopeObj.formatAmount(data.lastPaidAmount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(data.transactionCurrency)) + " " + kony.i18n.getLocalizedString("i18n.common.on") + " " + scopeObj.getDateFromDateString(data.lastPaidDate, "YYYY-MM-DDTHH:MM:SS"))) : ("No Payment Activity"));
                lblDueDate = data.billDueDate ? this.getDateFromDateString(data.billDueDate, "YYYY-MM-DD") : nonValue;
                lblBill = data.dueAmount ? this.formatAmount(data.dueAmount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(data.transactionCurrency)) : nonValue;
                txtAmount = {
                    "placeholder": kony.i18n.getLocalizedString("i18n.common.EnterAmount"),
                    "text": data.dueAmount ? this.formatAmount(data.dueAmount, true) : nonValue,
                    "restrictCharactersSet": specialCharactersSet.replace(',.', '') + alphabetsSet + alphabetsSet.toUpperCase()
                };
            }
            var lblNotes = data.notes ? data.notes : '';
            var calSendOn = {
                "dateComponents": data.sendOn ? this.getDateComponents(data.sendOn) : self.getvalidStartDate(),
                "dateFormat": applicationManager.getFormatUtilManager().getDateFormat(),
                "validStartDate": self.getvalidStartDate(),
                "hidePreviousNextMonthDates": true,
                "onSelection": scopeObj.setNewDeliverDate.bind(scopeObj, transitDays),
                "accessibilityconfig": {
                    "a11yLabel": data.sendOn
                }
            };
            var calDeliverBy = {
                "dateComponents": lblDueDate == nonValue ? self.getvalidStartDate() : this.getDateComponents(data.billDueDate),
                "dateFormat": applicationManager.getFormatUtilManager().getDateFormat(),
                "validStartDate": self.getvalidStartDate(),
                "hidePreviousNextMonthDates": true
            };
            if (data.eBillSupport == "false" || data.isManuallyAdded == "true") {
                btnEbill = {
                    "text": "SOME TEXT",
                    "skin": ViewConstants.SKINS.SKNBTNEBILLACTIVE,
                    "isVisible": false
                };
            } else {
                if (data.ebillStatus == 1) {
                    btnEbill = {
                        "text": "SOME TEXT",
                        "skin": ViewConstants.SKINS.SKNBTNEBILLACTIVE,
                        "onClick": data.ebillStatus == 1 ? scopeObj.viewEBill.bind(scopeObj, {
                            "billGeneratedDate": scopeObj.getDateFromDateString(data.billGeneratedDate, "YYYY-MM-DD"),
                            "amount": scopeObj.formatAmount(data.dueAmount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(data.transactionCurrency)),
                            "ebillURL": data.ebillURL
                        }) : null
                    };
                    lblDueDate = {
                        "text": lblDueDate,
                        "isVisible": true
                    };
                    btnActivateEBill = {
                        "isVisible": false,
                        "text": kony.i18n.getLocalizedString("i18n.WireTransfer.ACTIVATE"),
                        //"toolTip": kony.i18n.getLocalizedString("i18n.WireTransfer.ACTIVATE"),
                        "onClick": null,
                    };
                } else {
                    btnEbill = {
                        "text": "SOME TEXT",
                        "skin": ViewConstants.SKINS.SKNBTNIMGINACTIVEEBILL,
                        "onClick": null
                    };
                    lblDueDate = {
                        "text": lblDueDate,
                        "isVisible": false,
                        "accessibilityconfig": {
                            "a11yLabel": lblDueDate
                        }
                    };
                    btnActivateEBill = {
                        "isVisible": applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_ACTIVATE_OR_DEACTIVATE_EBILL"),
                        "text": kony.i18n.getLocalizedString("i18n.WireTransfer.ACTIVATE"),
                        //"toolTip": kony.i18n.getLocalizedString("i18n.WireTransfer.ACTIVATE"),
                        "onClick": self.activateEbill.bind(this, data, "frmBillPaymentDue")
                    };
                }
            }
            return {
                "payeeId": data.payeeId,
                "billid": data.billid,
                "isBusinessPayee": isBusiness,
                "payeeAccountNumber": data.payeeAccountNumber,
                "lblSeparatorBottom": {
                    "text": " "
                },
                "lblDropdown": ViewConstants.FONT_ICONS.CHEVRON_DOWN,
                "lblIdentifier": {
                    "skin": "sknffffff15pxolbfonticons"
                },
                "flxIdentifier": {
                    "skin": "sknFlxIdentifier"
                },
                "flxBillPaymentAllPayeesSelected": {
                    "height": "70dp",
                    "skin": "sknflxffffffnoborder"
                },
                "flxdetails":{
                      "isVisible":false
                },
                "flxBillPaymentAllPayeesMobileSelected": {
                    "height": "90dp",
                    "skin": "sknflxffffffnoborder"
                },
                "lblPayee": {
                    "text": lblPayee,
                    "accessibilityconfig": {
                        "a11yLabel": lblPayee
                    }
                },
                "lblPayeeDate": {
                    "text": lblPayeeDate,
                    "accessibilityconfig": {
                        "a11yLabel": lblPayeeDate
                    }
                },
                "btnEbill": btnEbill,
                "lblDueDate": lblDueDate,
                "lblBill": {
                    "text": lblBill,
                    "accessibilityconfig": {
                        "a11yLabel": lblBill
                    }
                },
                "txtAmount": txtAmount,
                "lblSeparator": "A",
                "lblPayFrom": {
                    "text": kony.i18n.getLocalizedString("i18n.billPay.PayFrom"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.billPay.PayFrom")
                    }
                },
                "lblSendOn": {
                    "text": kony.i18n.getLocalizedString("i18n.transfers.send_on"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.transfers.send_on")
                    }
                },
                "lblDeliverBy": {
                    "text": "(" + kony.i18n.getLocalizedString("i18n.billPay.DeliverBy") + ":" + scopeObj.getNextDeliveryDate(null, transitDays) + ")",
                    "onSelection": scopeObj.setNewDeliverDate.bind(scopeObj, transitDays),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.billPay.DeliverBy")
                    }
                },
                "imgListBoxDropdown": ViewConstants.IMAGES.ARRAOW_DOWN,
                "calSendOn": calSendOn,
                "calDeliverBy": calDeliverBy,
                "lblNotes": {
                    "text": kony.i18n.getLocalizedString("i18n.transfers.Description"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.transfers.Description")
                    }
                },
                "lblCategory": {
                    "text": kony.i18n.getLocalizedString("i18n.billPay.category"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.billPay.category")
                    }
                },
                "txtNotes": {
                    "placeholder": kony.i18n.getLocalizedString("i18n.transfers.optional"),
                    "text": ""
                },
                "lblCategoryList": {
                    "text": "Phone Bill",
                    "accessibilityconfig": {
                        "a11yLabel": "Phone Bill"
                    }
                },
                "imgCategoryListDropdown": ViewConstants.IMAGES.ARRAOW_DOWN,
                "btnViewEBill": btnViewEbill,
                "lblLineOne": addressLine1,
                "lblLineTwo": addressLine2,
                "accountNumber": {
                    "text": data.accountNumber,
                    "accessibilityconfig": {
                        "a11yLabel": data.accountNumber
                    }
                },
                "payeeNickName": {
                    "text": data.payeeNickName,
                    "accessibilityconfig": {
                        "a11yLabel": data.payeeNickName
                    }
                },
                "payeeName": {
                    "text": data.payeeName,
                    "accessibilityconfig": {
                        "a11yLabel": data.payeeName
                    }
                },
                "lstPayFrom": {
                    "masterData": FormControllerUtility.getListBoxDataFromObjects(billPayAccounts, "accountID", CommonUtilities.getAccountDisplayNameWithBalance),
                    "selectedKey": preferredAccountNumber ? preferredAccountNumber : billPayAccounts[0].accountID,
                },
                "flxIcon": {
                    "isVisible": scopeObj.profileAccess === "both" ? true : false
                    //"isVisible": applicationManager.getConfigurationManager().isCombinedUser === "true"? true : false
                },
                "lblIcon": {
                    "text": scopeObj.presenter.isBusinessAccount(data.accountNumber) === "true" ? "r" : "s",
                    //"isVisible": applicationManager.getConfigurationManager().isCombinedUser === "true" ? true : false
                    "isVisible": scopeObj.profileAccess === "both" ? true : false
                },
                "template": orientationHandler.isMobile ? "flxBillPaymentAllPayeesMobileSelected" : "flxBillPaymentAllPayeesSelected",
                "btnActivateEbill": btnActivateEBill,
                "lblDollar": applicationManager.getConfigurationManager().getCurrencyCode(),
                "preferredAccountNumber": preferredAccountNumber,
                "btnPayBill": btnPayBill,
                "flxAmount": {
                    "skin": ViewConstants.SKINS.COMMON_FLEX_NOERRORSKIN
                }
            }
        },
        isValidSelectedKey: function(masterData, selectedKey) {
            var isValue = false;
            masterData.forEach(function(data) {
                if (data[0] == selectedKey)
                    isValue = true;
            });
            return isValue;
        },

        setFromAccountIcon: function(context) {
            var data = this.view.segmentBillpay.data;
            var index = context.rowIndex;
            var isBuisnessAccount = this.presenter.isBusinessAccount(data[index].lstPayFrom.selectedKey) === "true" ? "r" : "s"
            data[index].lblFromIcon.text = isBuisnessAccount;
            data[index].accountId = data[index].lstPayFrom.selectedKey;
            this.view.segmentBillpay.setDataAt(data[index], index);
        },

        setNewDeliverDate: function(transitDays) {
            var data = this.view.segmentBillpay.data;
            var index = this.view.segmentBillpay.selectedRowIndex[1];
            var selectedDate = data[index].calSendOn.dateComponents;
            var sendOnDate = selectedDate[1] + "/" + selectedDate[0] + "/" + selectedDate[2];
            var nextDeliveyDate = this.getNextDeliveryDate(sendOnDate, transitDays);
            data[index].lblDeliverBy.text = "(" + kony.i18n.getLocalizedString("i18n.billPay.DeliverBy") + ":" + nextDeliveyDate + ")";
            this.view.segmentBillpay.setDataAt(data[index], index);
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
                todaysDateObject = new Date(CommonUtilities.getServerDate());
            }
            var nextDate = this.addDays(todaysDateObject, transitDays);
            var month = (nextDate.getMonth() + 1) >= 10 ? (nextDate.getMonth() + 1) : ("0" + (nextDate.getMonth() + 1));
            var day = nextDate.getDate() > 9 ? nextDate.getDate() : ("0" + nextDate.getDate());
            return (month + "/" + day + "/" + nextDate.getFullYear());
        },
        /**
         * Activates the E-Bill
         * @param {object} data data
         * @param {string} selectedTab selected tab
         */
        activateEbill: function(data, selectedTab) {
            var self = this;
            self.view.lblAccountNumberValue.text = data.accountNumber ? data.accountNumber : " ";
            self.view.lblBillerNameValue.text = data.payeeNickName ? data.payeeNickName : data.payeeName;
            self.view.flxActivatePopup.setVisibility(true);
            self.view.flxDialogs.setVisibility(true);
            self.view.btnProceed.onClick = function() {
                self.view.flxActivatePopup.setVisibility(false);
                self.view.flxDialogs.setVisibility(false);
                self.presenter.activateEbill(data, selectedTab);
            };
            self.view.btnCancel.onClick = function() {
                self.view.flxActivatePopup.setVisibility(false);
                self.view.flxDialogs.setVisibility(false);
            };
            self.view.flxCross.onClick = function() {
                self.view.flxActivatePopup.setVisibility(false);
                self.view.flxDialogs.setVisibility(false);
            };
        },
        /**
         * Need to remove
         */
        onBulkPayeesSegmentRowClick: function() {
            var index = this.view.segmentBillpay.selectedRowIndex[1];
            var data = this.view.segmentBillpay.data;
            for (i = 0; i < data.length; i++) {
                if (i == index) {
                    data[i].imgDropdown = "chevron_up.png";
                    data[i].imgError = "error_yellow.png";
                    data[i].lblError = "Verify payment amount and available account balance";
                    data[i].template = "flxBillPayAllPayeesSelected";
                } else {
                    data[i].imgDropdown = "arrow_down.png";
                    data[i].imgError = "error_yellow.png";
                    if (kony.application.getCurrentBreakpoint() == 640) {
                        data[i].template = "flxBillPayAllPayeesMobile";
                    } else {
                        data[i].template = "flxBillPayAllPayees";
                    }
                }
            }
            this.view.segmentBillpay.setData(data);
            data = this.view.segmentBillpay.data;
            // data[index].calSendOn.context = {
            //   "widget": this.view.segmentBillpay.clonedTemplates[index].calSendOn,
            //   "anchor": "bottom"
            // }
            // data[index].calDeliverBy.context = {
            //   "widget": this.view.segmentBillpay.clonedTemplates[index].calDeliverBy,
            //   "anchor": "bottom"
            // }
            this.view.segmentBillpay.setDataAt(data[index], index);
        },

        /**
         * Method to get the date
         * @return {array[]} startdate
         */
        getvalidStartDate: function() {
            var date = CommonUtilities.getServerDateObject();
            var dd = date.getDate();
            var mm = date.getMonth() + 1;
            var yy = date.getFullYear();
            return [dd, mm, yy, 0, 0, 0];
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
         * method to show view the ebill.
         * @param {object} viewModel ebill information
         */
        viewEBill: function(viewModel) {
            var scopeObj = this;
            if (viewModel) {
                var nonValue = kony.i18n.getLocalizedString("i18n.common.none");
                scopeObj.view.lblPostDateValue.text = viewModel.billGeneratedDate || nonValue;
                scopeObj.view.lblAmountValue.text = viewModel.amount || nonValue;
                scopeObj.view.flxMemo.setVisibility(false);
                scopeObj.view.imgEBill.src = viewModel.ebillURL;
                if (viewModel.ebillURL) {
                    scopeObj.view.flxDownload.onClick = scopeObj.downloadFile.bind(scopeObj, {
                        'url': viewModel.ebillURL
                    });
                    scopeObj.view.flxDownload.setVisibility(true);
                } else {
                    scopeObj.view.flxDownload.setVisibility(false);
                    scopeObj.view.flxDownload.onClick = null;
                }
                this.view.imgZoom.setVisibility(false)
                this.view.imgFlip.setVisibility(false)
                scopeObj.view.flxViewEbill.setVisibility(true);
                scopeObj.view.flxDialogs.setVisibility(true);
                scopeObj.view.lblTransactions1.setFocus(true);
            }
            scopeObj.view.flxImgCancel.onClick = function() {
                scopeObj.view.flxViewEbill.setVisibility(false);
                scopeObj.view.flxDialogs.setVisibility(false);
            };
        },
        /**
         * downloadFile:    method to download the e-bill file.
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

        //UI Code
        /**
         * onBreakpointChange : Handles ui changes on .
         * @member of {frmConfirmtransferController}
         * @param {integer} width - current browser width
         * @return {}
         * @throws {}
         */
        onBreakpointChange: function(form, width) {
            var scopeObj = this;
            FormControllerUtility.setupFormOnTouchEnd(width);
            
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            this.view.CustomPopupLogout.onBreakpointChangeComponent(scopeObj.view.CustomPopupLogout, width);
            this.view.CustomPopupCancel.onBreakpointChangeComponent(scopeObj.view.CustomPopupCancel, width);
        },

        /**
         * used to show the permission based UI
         */
        showAllCreatePayeeOptions: function() {
            this.view.btnAllPayees.setVisibility(true);
            this.view.btnPayementDue.setVisibility(true);
            this.view.btnScheduled.setVisibility(true);
            this.view.flxMakeOneTimePayment.setVisibility(true);
        },

        /**
         * used to hide the permission based UI
         */
        hideAllCreatePayeeOptions: function() {
            this.view.btnAllPayees.setVisibility(false);
            this.view.btnPayementDue.setVisibility(false);
            this.view.btnScheduled.setVisibility(false);
            this.view.flxMakeOneTimePayment.setVisibility(false);
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
        showManagePayeeOption: function() {
            this.view.btnManagePayee.setVisibility(true);
        },

        /**
         * used to hide the permission based UI
         */
        hideManagePayeeOption: function() {
            this.view.btnManagePayee.setVisibility(false);
        },


        /**
         * used to show the permission based UI
         */
        showHistoryOption: function() {
            this.view.btnHistory.setVisibility(true);
        },

        /**
         * used to hide the permission based UI
         */
        hideHistoryOption: function() {
            this.view.btnHistory.setVisibility(false);
        }
    }
});