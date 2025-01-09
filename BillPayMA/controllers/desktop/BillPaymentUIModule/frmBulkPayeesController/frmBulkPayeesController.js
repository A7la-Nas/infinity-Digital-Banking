/**
 * Description of Module representing a Confirm form.
 * @module frmBulkPayeesController
 */
define(['CommonUtilities', 'OLBConstants', 'ViewConstants', 'FormControllerUtility', 'CampaignUtility'], function(CommonUtilities, OLBConstants, ViewConstants, FormControllerUtility, CampaignUtility) {
     
    var orientationHandler = new OrientationHandler();

    return /** @alias module:frmBulkPayeesController */ {
        /** updates the present Form based on required function.
         * @param {uiDataMap[]} uiDataMap
         */
        profileAccess: "",
        updateFormUI: function(uiDataMap) {
            if (uiDataMap.campaign) {
                CampaignUtility.showCampaign(uiDataMap.campaign, this.view, "flxMain");
            } else if (uiDataMap.isLoading) {
                FormControllerUtility.showProgressBar(this.view);
            } else {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (uiDataMap.serverError) {
                this.setServerError(uiDataMap.serverError);
            } else {
                this.view.flxDowntimeWarning.setVisibility(false);
            }
            if (uiDataMap.billDueData) {
                this.bindTotalEbillAmountDue(uiDataMap.billDueData);
            }
            if (uiDataMap.bulkPayees) {
                this.setBulkPayeesSegmentData(uiDataMap.bulkPayees, uiDataMap.billPayAccounts);
                this.initializeSearchAndFilterActions(uiDataMap.bulkPayees, uiDataMap.billPayAccounts);
                FormControllerUtility.updateSortFlex(this.bulkPayeesSortMap, uiDataMap.sortingInputs);
                if(uiDataMap.sortingInputs)this.setAccessibilityConfigForSorting(uiDataMap.sortingInputs.order);
            }
        },
        ActivatePopupFlag: false,
        CancelPopupFlag: false,
        ViewBillPopupFlag: false,
        indexSelected : 0,
        escIndex : 0,
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.presenter = applicationManager.getModulesPresentationController({ 'appName': 'BillPayMA', 'moduleName': 'BillPaymentUIModule' });
            this.initActions();
            //       this.view.btnConfirm.onClick = this.onSearchBtnClick.bind(this);
            //       this.view.txtSearch.onKeyUp = this.onTxtSearchKeyUp.bind(this);
            //       this.view.txtSearch.onDone = this.onSearchBtnClick.bind(this);
            //       this.view.flxClearBtn.onClick = this.onSearchClearBtnClick.bind(this);

        },
        preShow: function() {
            this.view.flxFormContent.enableScrolling = true;
            this.profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
            this.view.customheadernew.activateMenu("Bill Pay", "Pay a Bill");
            CampaignUtility.fetchPopupCampaigns();
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader', 'flxFooter', 'flxMain']);
            this.isScheduledTab = true;
            // this.view.imgSearch.toolTip = kony.i18n.getLocalizedString("i18n.serviceRequests.Search");
            // this.view.btnAllPayees.toolTip = kony.i18n.getLocalizedString("i18n.billPay.AllPayees");
            // this.view.btnPayementDue.toolTip = kony.i18n.getLocalizedString("i18n.billPay.PaymentDue");
            // this.view.btnScheduled.toolTip = kony.i18n.getLocalizedString("i18n.billPay.scheduled");
            // this.view.btnHistory.toolTip = kony.i18n.getLocalizedString("i18n.kony.BulkPayments.bulkPaymentHistory");
            // this.view.btnManagePayee.toolTip = kony.i18n.getLocalizedString("i18n.billPay.ManagePayee");
            // this.view.txtSearch.toolTip = kony.i18n.getLocalizedString("i18n.payments.searchtooltip");
            // this.view.imgSortPayee.toolTip = kony.i18n.getLocalizedString("i18n.payments.sortByPayee");
            // this.view.imgSortDatee.toolTip = kony.i18n.getLocalizedString("i18n.payments.sortByDueDate");
            // this.view.imgBill.toolTip = kony.i18n.getLocalizedString("i18n.payments.sortByBill");
            // this.view.imgInfo.toolTip = kony.i18n.getLocalizedString("kony.mb.NAO.Info");
            // this.view.btnBulkConfirm.toolTip = kony.i18n.getLocalizedString("i18n.unifiedBeneficiary.Continue");
            // this.view.imgCancel.toolTip = kony.i18n.getLocalizedString("i18n.savingsPot.closeAccount");
            // this.view.imgDownload.toolTip = kony.i18n.getLocalizedString("i18n.common.Download");
            // this.view.imgFlip.toolTip = kony.i18n.getLocalizedString("i18n.payments.flip");
            // this.view.imgZoom.toolTip = kony.i18n.getLocalizedString("i18n.payments.zoom");
            // this.view.imgCrossIcon.toolTip = kony.i18n.getLocalizedString("i18n.TransfersEur.btnCancel");
            // this.view.btnProceed.toolTip = kony.i18n.getLocalizedString("i18n.common.yes");
            // this.view.btnCancel.toolTip = kony.i18n.getLocalizedString("i18n.common.no");
        },
        /**
         * used perform the initialize activities.
         *
         */
        initActions: function() {
            var scopeObj = this;
            scopeObj.setBulkPayeeSorting();
            this.view.flxFiltersList.onClick = this.onFiltersBtnClick.bind(this);
            scopeObj.setTabActions();
           // this.view.flxFiltersWrapper.onKeyPress = this.shiftTabFocus;
        },
        shiftTabFocus:function(eventObj, eventPayload){
      if (eventPayload.keyCode === 9) {
                //Shift + Tab key
                if (eventPayload.shiftKey && eventPayload.keyCode === 9) {
                    eventPayload.preventDefault();
                    if (context.rowIndex === 1) {
                        context.widgetInfo.setActive(0, 0, "flxAccountTypes");
                    } else if (context.rowIndex === 2) {
                        context.widgetInfo.setActive(1, 0, "flxAccountTypes");
                    } else if (context.rowIndex === 3) {
                        context.widgetInfo.setActive(2, 0, "flxAccountTypes");
                    }
                    if (context.rowIndex === 0 && context.sectionIndex === 0) {
                        scopeObj.view.accountTypesBillPayAllPayees.setVisibility(false);
                        scopeObj.view.flxFiltersList.accessibilityConfig = {
                            "a11yLabel": `View Details`,
                            "a11yARIA": {
                                "role": "button",
                                "tabindex": 0,
                                "aria-expanded": false
                            }
                        };
                        scopeObj.view.flxFiltersList.setActive(true);
                    }
                } else if (context.rowIndex === context.widgetInfo.data.length - 1) {
                    scopeObj.view.accountTypesBillPaySchedule.setVisibility(false);
                    scopeObj.view.flxFiltersList.setActive(true);
                    scopeObj.view.flxFiltersList.accessibilityConfig = {
                        "a11yLabel": `View Details`,
                        "a11yARIA": {
                            "role": "button",
                            "tabindex": 0,
                            "aria-expanded": false
                        }
                    };
                }
            }
    },
        /**
         * used to perform the post show activities
         *
         */
        postShow: function() {
            var scope = this;
            this.view.flxFormContent.enableScrolling = true;
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            //this.view.btnAllPayees.setFocus(true);
            applicationManager.getNavigationManager().applyUpdates(this);
            applicationManager.executeAuthorizationFramework(this);
            this.accessibilityFocusSetup();
            this.view.flxTermsAndConditions.setVisibility(false);
            this.view.customheadernew.btnSkipNav.onClick = function () {
                scope.view.lblTransactions.setActive(true);
            }; 
            this.view.btnBypass.onClick = function () {
                scope.view.flxAddPayee.setActive(true);
            };
            this.view.title = 'My Bills';
            if(kony.application.getCurrentBreakpoint()<=1024)
            this.view.btnBypass.setVisibility(false);
            this.view.imgSortDatee.setVisibility(false);
            this.view.flxViewEbill.isModalContainer = true;
            this.view.flxDialogs.isModalContainer = true;
            this.view.CustomPopupLogout.doLayout = CommonUtilities.centerPopupFlex;
            this.view.flxActivate.doLayout = CommonUtilities.centerPopupFlex;
            this.view.CustomPopupLogout.onKeyPress = this.onKeyPressCallBack;
            this.view.flxViewEbillContainer.onKeyPress = this.onKeyPressCallBack;
            this.view.flxFiltersList.onKeyPress = this.onKeyPressCallBack;
        },
        setAccessibilityConfigForSorting: function (sortType) {
            if (sortType === "asc") {
                this.view.flxPayee.accessibilityConfig = {
                    "a11yLabel": this.view.lblPayee.text + 'column. Sorted in Ascending order. Click to Sort in Descending order',
                    "a11yARIA": {
                        "role": "button",
                        "tabindex": 0
                    }
                }
            } else if (sortType === "desc") {
                this.view.flxPayee.accessibilityConfig = {
                    "a11yLabel": this.view.lblPayee.text + ' column. Sorted in Descending order. Click to Sort in Ascending order',
                    "a11yARIA": {
                        "role": "button",
                        "tabindex": 0
                    }
                }
            }
            if (this.isScheduledTab) {
                this.isScheduledTab = false
            } else {
                this.view.flxPayee.setActive(true);
            }
        },
        onKeyPressCallBack: function(eventObject, eventPayload) {
            if (eventPayload.keyCode === 27) {
                if (this.view.flxLogout.isVisible === true) {
                    this.view.flxDialogs.isVisible = false;
                    this.view.customheadernew.btnLogout.setFocus(true);
                }
                if(this.view.flxActivate.isVisible === true && this.view.flxDialogs.isVisible === true){
                    this.view.flxDialogs.isVisible = false;
                    kony.application.getCurrentForm().segmentBillpay.setActive(indexSelected, 0, 'fflxBillPaymentAllPayeesSelected.flxDate.btnActivateEbill');
                }
                if(this.view.flxViewEbill.isVisible === true){
                   this.view.flxViewEbill.setVisibility(false);
                   this.view.flxDialogs.setVisibility(false);
                   kony.application.getCurrentForm().segmentBillpay.setActive(escIndex, 0, 'flxBillPaymentAllPayeesSelected.btnViewEBill');
                }
            }
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
                CommonUtilities.setText(scopeObj.view.lblBills, dueBills.count + " " + kony.i18n.getLocalizedString("i18n.billPay.eBills"), CommonUtilities.getaccessibilityConfig());
                CommonUtilities.setText(scopeObj.view.lblEbillAmountDueValue, scopeObj.formatAmount(String(dueBills.totalDueAmount)), CommonUtilities.getaccessibilityConfig());
            }
            scopeObj.view.forceLayout();
        },

        /**
         * sorting configurations to billPay
         */
        setBulkPayeeSorting: function() {
            var scopeObj = this;
            scopeObj.bulkPayeesSortMap = [{
                name: 'payeeNickName',
                imageFlx: scopeObj.view.imgSortPayee,
                clickContainer: scopeObj.view.flxPayee
            }];
            FormControllerUtility.setSortingHandlers(scopeObj.bulkPayeesSortMap, scopeObj.onBulkPayeeSortClickHanlder, scopeObj);
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
                scopeObj.view.flxHorizontalLine1.setVisibility(false);
                scopeObj.view.flxHorizontalLine2.setVisibility(false);
                scopeObj.view.flxConfirmButton.setVisibility(false);
                scopeObj.view.rtxNoPaymentMessage.text = kony.i18n.getLocalizedString(message.noPaymentMessageI18Key);
                if (message.showActionMessageI18Key) {
                    scopeObj.view.lblScheduleAPayment.setVisibility(false);
                    CommonUtilities.setText(scopeObj.view.lblScheduleAPayment, kony.i18n.getLocalizedString(message.showActionMessageI18Key), CommonUtilities.getaccessibilityConfig());
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
        onBulkPayeeSortClickHanlder: function(event, data) {
            var scopeObj = this;
            FormControllerUtility.showProgressBar(this.view);
            scopeObj.presenter.loadBulkPayees(data);
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
                    var accountNumber = data[record].lstPayFrom.selectedKey;
                    //var endingBalance = 
                    if (isNaN(amount)) {
                        isInputValid = false;
                        // data[record].flxAmount.skin = ViewConstants.SKINS.LOANS_FLEX_ERROR;
                        // this.view.segmentBillpay.setDataAt(data[record], record);
                        break;
                    } else {
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
                        //  data[record].flxAmount.skin = ViewConstants.SKINS.COMMON_FLEX_NOERRORSKIN;
                        // this.view.segmentBillpay.setDataAt(data[record], record);
                    }
                }
            }
            if (isInputValid) {
                self.hideErrorFlex();
                var bulkbillPayObj = self.getBulkPayeesConfirmPaymentData();
                this.getTnC({
                    isBulkBillPay: true,
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
                return applicationManager.getFormatUtilManager().getFormatedDateString(dateObj, 'm/d/Y');
            }
            for (index = 0; index < bulkPayRecords.length; index++) {
                var deliverBy = bulkPayRecords[index].lblDeliverBy.text;
                var deliverByVal = (deliverBy.split(":"))[1];
                var deliverByValue = (deliverByVal.split(")"))[0];
                var split  = deliverByValue.split("/");
                if(CommonUtilities.isMirrorLayoutEnabled()){deliverByValue = [split[1],split[0],split[2]].join("/")}
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
                            "text": CommonUtilities.isMirrorLayoutEnabled() ? (bulkPayRecords[index].lblLineOne ? bulkPayRecords[index].lblLineOne + " " + bulkPayRecords[index].lblLineTwo : "Address line 01 Address line 02") + " " + kony.i18n.getLocalizedString("i18n.ChequeBookReq.Address") : kony.i18n.getLocalizedString("i18n.ChequeBookReq.Address") + " " + (bulkPayRecords[index].lblLineOne ? bulkPayRecords[index].lblLineOne + " " + bulkPayRecords[index].lblLineTwo : "Address line 01 Address line 02")
                        },
                        "lblEndingBalanceAccount": {
                            "text": CommonUtilities.isMirrorLayoutEnabled() ? accountName.substring(accountName.indexOf("(") + 1, accountName.indexOf(")")) + " " + kony.i18n.getLocalizedString("i18n.payments.endingBalanceWithColon") : kony.i18n.getLocalizedString("i18n.payments.endingBalanceWithColon") + " " + accountName.substring(accountName.indexOf("(") + 1, accountName.indexOf(")"))
                        },
                        //             "lblEndingBalanceAccount": {
                        //               "text": "Ending Balance: " + bulkPayRecords[index].lstPayFrom.selectedkeyvalue[1].substring( bulkPayRecords[index].lstPayFrom.selectedkeyvalue[1].indexOf("(")+1, bulkPayRecords[index].lstPayFrom.selectedkeyvalue[1].indexOf(")"))
                        //             },

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
            scopeObj.view.flxDowntimeWarning.setFocus(true);
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
            this.CancelPopupFlag = true;
            CommonUtilities.setText(scopeObj.view.CustomPopupCancel.lblHeading, obj.dialogueHeader, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.CustomPopupCancel.lblPopupMessage, obj.dialogueText, CommonUtilities.getaccessibilityConfig());
            scopeObj.view.flxDialogs.setVisibility(true);
            scopeObj.view.flxCancelPopup.setVisibility(true);
            scopeObj.view.CustomPopupCancel.btnYes.onClick = function() {
                scopeObj.CancelPopupFlag = false;
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.setVisibility(false);
                obj.dialogueAction();
            };
            scopeObj.view.CustomPopupCancel.btnNo.onClick = function() {
                scopeObj.CancelPopupFlag = false;
                scopeObj.view.flxDialogs.setVisibility(false);
                scopeObj.view.flxCancelPopup.setVisibility(false);
            };
            scopeObj.view.CustomPopupCancel.flxCross.onClick = function() {
                scopeObj.CancelPopupFlag = false;
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
            this.isScheduledTab = true;
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
                    bulkPayees: true
                }
            });
        },

        /**
         * setBulkPayeesSegmentData:    used to set bulk payees segment data.
         * @param {object} bulkPayees bulk payees object
         * @param {object} billPayAccounts bill pay accounts
         * */
        setBulkPayeesSegmentData: function(bulkPayees, billPayAccounts) {
            var scopeObj = this;
            const isMobileBreakpoint = kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile;
            FormControllerUtility.showProgressBar(this.view);
            scopeObj.view.flxNoPayment.setVisibility(false);
            scopeObj.view.segmentBillpay.setVisibility(true);
            scopeObj.view.flxHorizontalLine1.setVisibility(true);
            scopeObj.view.flxHorizontalLine2.setVisibility(!isMobileBreakpoint);
            //if(applicationManager.getConfigurationManager().isCombinedUser === "true"){
            if (applicationManager.getUserPreferencesManager().isSingleCustomerProfile === false) {
                scopeObj.view.flxSearchAllPayees.setVisibility(true);
                if (isMobileBreakpoint) {
                    scopeObj.view.flxFiltersList.setVisibility(false);
                    scopeObj.view.flxtxtSearchandClearbtn.right = "10dp";
                }
            } else {
                this.view.flxSearchAllPayees.setVisibility(false);
                this.view.flxHorizontalLine3.setVisibility(false);
            }
            if (isMobileBreakpoint) {
                scopeObj.view.flxBulkBillPayHeader.setVisibility(false);
                scopeObj.view.flxConfirmButton.setVisibility(false);
            } else {
                scopeObj.view.flxBulkBillPayHeader.setVisibility(true);
                scopeObj.view.flxConfirmButton.setVisibility(true);
            }
            if (bulkPayees) {
                if (bulkPayees.length === 0) {
                    scopeObj.showNoPayementDetails({
                        noPaymentMessageI18Key: "i18n.billPay.noPayeesMessage"
                    });
                } else {
                    var preferredAccountNumber = scopeObj.presenter.getBillPayPreferedAccountNumber();
                    this.view.btnBulkConfirm.onClick = this.validateBulkPayData.bind(this);
                    var billPayData = {
                        "bulkPayees": bulkPayees
                    };
                    var searchView = bulkPayees.searchView;
                    this.getNewBulkPayData(billPayData, billPayAccounts, preferredAccountNumber);
                    var dataMap = {
                        "lblLineOne": "lblLineOne",
                        "lblLineTwo": "lblLineTwo",
                        "lblIdentifier": "lblIdentifier",
                        "lblDropdown": "lblDropdown",
                        "lblPayee": "lblPayee",
                        "lblPayeeDate": "lblPayeeDate",
                        "btnEbill": "btnEbill",
                        "flxBtnEbill":"flxBtnEbill",
                        "lblDueDate": "lblDueDate",
                        "lblBill": "lblBill",
                        "txtAmount": "txtAmount",
                        "lblSeparator": "lblSeparator",
                        "lblPayFrom": "lblPayFrom",
                        "lblSendOn": "lblSendOn",
                        "lblDeliverBy": "lblDeliverBy",
                        "imgListBoxDropdown": "imgListBoxDropdown",
                        "calSendOn": "calSendOn",
                        "calDeliverBy": "calDeliverBy",
                        "lblNotes": "lblNotes",
                        "lblCategory": "lblCategory",
                        "txtNotes": "txtNotes",
                        "lblCategoryList": "lblCategoryList",
                        "imgCategoryListDropdown": "imgCategoryListDropdown",
                        "btnViewEBill": "btnViewEBill",
                        "lblDollar": "lblDollar",
                        "lblSeparatorBottom": "lblSeparatorBottom",
                        "btnActivateEbill": "btnActivateEbill",
                        "lstPayFrom": "lstPayFrom",
                        "btnPayBill": "btnPayBill",
                        "flxDropdown": "flxDropdown",
                        "flxIdentifier": "flxIdentifier",
                        "flxBillPaymentAllPayeesSelected": "flxBillPaymentAllPayeesSelected",
                        "flxdetails": "flxdetails",
                        "flxAmount": "flxAmount",
                        "flxIcon": "flxIcon",
                        "lblIcon": "lblIcon",
                        "flxFromIcon": "flxFromIcon",
                        "lblFromIcon": "lblFromIcon",
                        "flxPayeeWrapper":"flxPayeeWrapper",
                        "flxDate":"flxDate",
                        "flxBill":"flxBill",
                        "flxAmount":"flxAmount"
                    };
                    this.view.segmentBillpay.widgetDataMap = dataMap;
                    for (let i in billPayData.formattedBulkBillPayRecords) {
                        billPayData.formattedBulkBillPayRecords[i].flxPayeeWrapper = {
                            "accessibilityConfig": {
                                "a11yLabel": "Payee " + billPayData.formattedBulkBillPayRecords[i].lblPayee.text + " " + billPayData.formattedBulkBillPayRecords[i].lblPayeeDate.text
                            }
                        };
                        billPayData.formattedBulkBillPayRecords[i].flxDate = {
                            "accessibilityConfig": {
                                "a11yLabel": "Due Date " + billPayData.formattedBulkBillPayRecords[i].lblDueDate.text
                            }
                        };
                        billPayData.formattedBulkBillPayRecords[i].flxBill = {
                            "accessibilityConfig": {
                                "a11yLabel": "Bill " + billPayData.formattedBulkBillPayRecords[i].lblBill.text
                            }
                        };
                        billPayData.formattedBulkBillPayRecords[i].flxAmount = {
                            "accessibilityConfig": {
                                "a11yLabel": "Amount " + applicationManager.getConfigurationManager().getCurrencyCode() + " " + billPayData.formattedBulkBillPayRecords[i].txtAmount.text
                            }
                        };
                    }
                    var segmentData = billPayData.formattedBulkBillPayRecords;
                    this.view.segmentBillpay.setData(segmentData);
                    this.enableOrDisableContinueButton();
                }
            }
            scopeObj.view.forceLayout();
            FormControllerUtility.hideProgressBar(this.view);
        },

        /*
         * method to display the types of payees list
         */
        onFiltersBtnClick: function() {
            this.view.accountTypesBillPayAllPayees.setVisibility(!this.view.accountTypesBillPayAllPayees.isVisible);
            this.view.accountTypesBillPayAllPayees.skin = "slfBoxffffffB1R5"; //"slfBoxffffffB1R5";
            this.view.accountTypesBillPayAllPayees.flxAccountTypesSegment.skin = "slfBoxffffffB1R5";
            // this.view.accountTypesBillPayAllPayees.segAccountTypes.rowSkin = "sknFlxffffffnoborderThree";
            this.view.flxFiltersList.accessibilityConfig = {
                "a11yLabel": 'View Details',
                "a11yARIA": {
                    "role": "button",
                    "tabindex": 0,
                    "aria-expanded": this.view.accountTypesBillPayAllPayees.isVisible
                }
            }
        },

        /*
         * Method to initialize search and filter actions
         */
        initializeSearchAndFilterActions: function(bulkPayees, billPayAccounts) {
            this.initializeFilterSegments();
            this.view.txtSearch.text = "";
            this.view.txtSearch.placeholder = kony.i18n.getLocalizedString("i18n.billpay.searchByKeywords");
            this.view.flxClearBtn.setVisibility(false);
            this.view.flxClearBtn.onClick = this.onSearchClearBtnClick.bind(this, bulkPayees, billPayAccounts);
            this.view.txtSearch.onKeyUp = this.onTxtSearchKeyUp.bind(this);
            this.view.txtSearch.onDone = this.onSearchBtnClick.bind(this, bulkPayees, billPayAccounts);
            this.view.btnConfirm.onClick = this.onSearchBtnClick.bind(this, bulkPayees);
            this.view.flxFiltersList.onClick = this.onFiltersBtnClick.bind(this);
            this.view.accountTypesBillPayAllPayees.segAccountTypes.onRowClick = this.onFilterSelection.bind(this, bulkPayees, billPayAccounts);
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
            var data = [{
                "flxAccountTypes": {
                    "height": "40dp",
                    "onKeyPress": this.onSegKeyPressCallBack,
                    "accessibilityConfig": {
                        "a11yLabel": 'All Payees',
                        "a11yARIA": {
                            "role": "button",
                            "tabindex": 0
                        }
                    },
                },
                "lblSeparator": {
                    "text": "lblSeparator",
                    "isVisible": true
                },
                "lblUsers": {
                    "text": "All Payees",
                    "left": "10dp"
                }
            }, {
                "flxAccountTypes": {
                    "height": "40dp",
                    "onKeyPress": this.onSegKeyPressCallBack,
                    "accessibilityConfig": {
                        "a11yLabel": 'Personal Payees',
                        "a11yARIA": {
                            "role": "button",
                            "tabindex": 0
                        }
                    },
                },
                "lblSeparator": {
                    "text": "lblSeparator",
                    "isVisible": true
                },
                "lblUsers": {
                    "text": "Personal Payees",
                    "left": "10dp"
                }
            }, {
                "flxAccountTypes": {
                    "height": "40dp",
                    "onKeyPress": this.onSegKeyPressCallBack,
                    "accessibilityConfig": {
                        "a11yLabel": 'Business Payees',
                        "a11yARIA": {
                            "role": "button",
                            "tabindex": 0
                        }
                    },
                },
                "lblSeparator": {
                    "text": "lblSeparator",
                    "isVisible": true
                },
                "lblUsers": {
                    "text": "Business Payees",
                    "left": "10dp"
                }
            }];
            this.view.accountTypesBillPayAllPayees.segAccountTypes.widgetDataMap = {
                "lblUsers": "lblUsers",
                "flxAccountTypes":"flxAccountTypes",
                "lblSeparator":"lblSeparator"
            };
            this.view.accountTypesBillPayAllPayees.height="120dp";
            this.view.accountTypesBillPayAllPayees.segAccountTypes.setData(data);
            this.view.lblType.text = this.view.accountTypesBillPayAllPayees.segAccountTypes.data[0].lblUsers.text;
        },
        onSegKeyPressCallBack: function (eventObject, eventPayload, context) {
            var scopeObj = this;
            //Esc Key
            if (eventPayload.keyCode === 27) {
                scopeObj.view.accountTypesBillPayAllPayees.setVisibility(false);
                scopeObj.view.flxFiltersList.setActive(true);
                scopeObj.view.flxFiltersList.accessibilityConfig = {
                    "a11yLabel": 'View Details',
                    "a11yARIA": {
                        "role": "button",
                        "tabindex": 0,
                        "aria-expanded": false
                    }
                };
            }
            //Tab key
           else if (eventPayload.keyCode === 9) {
                //Shift + Tab key
                if (eventPayload.shiftKey && eventPayload.keyCode === 9) {
                    eventPayload.preventDefault();
                    if (context.rowIndex === 1) {
                        context.widgetInfo.setActive(0, 0, "flxAccountTypes");
                    } else if (context.rowIndex === 2) {
                        context.widgetInfo.setActive(1, 0, "flxAccountTypes");
                    } else if (context.rowIndex === 3) {
                        context.widgetInfo.setActive(2, 0, "flxAccountTypes");
                    }
                    if (context.rowIndex === 0 && context.sectionIndex === 0) {
                        scopeObj.view.accountTypesBillPayAllPayees.setVisibility(false);
                        scopeObj.view.flxFiltersList.accessibilityConfig = {
                            "a11yLabel": `View Details`,
                            "a11yARIA": {
                                "role": "button",
                                "tabindex": 0,
                                "aria-expanded": false
                            }
                        };
                        scopeObj.view.flxFiltersList.setActive(true);
                    }
                } else if (context.rowIndex === context.widgetInfo.data.length - 1) {
                    scopeObj.view.accountTypesBillPayAllPayees.setVisibility(false);
                    eventPayload.preventDefault(); 
                    scopeObj.view.flxFiltersList.accessibilityConfig = {
                        "a11yLabel": `View Details`,
                        "a11yARIA": {
                            "role": "button",
                            "tabindex": 0,
                            "aria-expanded": false
                        }
                    };
                    scopeObj.view.flxFiltersList.setActive(true);
                }
            }
        },

        /*
         * Method to process segment ui based on selected filter
         */
        onFilterSelection: function(bulkPayees, billPayAccounts) {
            var scopeObj = this;
            //var segData = this.view.accountTypesBillPaySchedule.segAccountTypes.data;
            //accounts = context.recipients;    
            this.view.accountTypesBillPayAllPayees.setVisibility(false);
            var data = scopeObj.getSearchAndFilterData(bulkPayees);
            // context.recipients = data;
            this.setBulkPayeesSegmentData(data, billPayAccounts);
            scopeObj.view.flxFiltersList.accessibilityConfig = {
                "a11yLabel": 'View Details',
                "a11yARIA": {
                    "role": "button",
                    "tabindex": 0,
                    "aria-expanded": this.view.accountTypesBillPayAllPayees.isVisible
                }
            }
            scopeObj.view.flxFiltersList.setActive(true);
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
        onSearchClearBtnClick: function(bulkPayees, billPayAccounts) {
            var scopeObj = this;

            scopeObj.view.txtSearch.text = "";
            scopeObj.view.txtSearch.setActive(true);
            scopeObj.view.flxClearBtn.setVisibility(false);
            //var data = scopeObj.getSearchAndFilterData(scheduledBills);
            this.setBulkPayeesSegmentData(bulkPayees, billPayAccounts);
            // context.recipients = data;
            //this.bindScheduleBills(data);     
        },

        /**
         * method to handle the search account functionality
         */
        onSearchBtnClick: function(bulkPayees, billPayAccounts) {
            var scopeObj = this;
            // accounts = context.recipients;    
            var data = scopeObj.getSearchAndFilterData(bulkPayees);
            // context.recipients = data;
            this.setBulkPayeesSegmentData(data, billPayAccounts);
            scopeObj.view.forceLayout();
        },

        /**
         * method to get data from search and filter values
         */
        getSearchAndFilterData: function(bulkPayees) {
            var scopeObj = this;
            var selectedAccountType = this.view.accountTypesBillPayAllPayees.segAccountTypes.selectedRowItems;
            this.view.lblType.text = (selectedAccountType !== null && selectedAccountType.length !== 0) ? selectedAccountType[0].lblUsers.text : this.view.accountTypesBillPayAllPayees.segAccountTypes.data[0].lblUsers.text;
            var filterQuery = this.view.lblType.text;
            var searchQuery = scopeObj.view.txtSearch.text.trim();

            if (filterQuery.includes("All Payees")) {
                var accountlist = [];
                accountlist = bulkPayees;
                //all accounts will be shown      
            } else if (filterQuery.includes("Personal Payees")) {
                //        accounts = accounts.filter(accounts.type==="Individual");
                var accountlist = [];
                for (i = 0; i < bulkPayees.length; i++) {
                    if (bulkPayees[i].isBusinessPayee === "0") {
                        accountlist.push(bulkPayees[i]);
                        //accountlist = JSON.stringify(accounts[i]);
                    }
                }
                bulkPayees = accountlist;
            } else if (filterQuery.includes("Business Payees")) {
                //accounts = accounts.filter(this.isBusinessAccount);
                var accountlist = [];
                for (i = 0; i < bulkPayees.length; i++) {
                    if (bulkPayees[i].isBusinessPayee === "1") {
                        accountlist.push(bulkPayees[i]);
                        //accountlist = JSON.stringify(accounts[i]);
                    }
                }
                bulkPayees = accountlist;
            }
            if (searchQuery !== "") {
                // var data = scopeObj.getDataWithSections(accounts);
                var data = bulkPayees;
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
                            //rowdata = "";
                            j++;
                        }
                    }
                }
                return searchresults;
            } else {
                return bulkPayees;
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
                        bulkPayees: true
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
            const scope = this;
            data.formattedBulkBillPayRecords = data.bulkPayees.map((d, i) => {
                let rowData = scope.createNewBulkPayData(billPayAccounts, preferredAccountNumber, d);
                rowData['lblSeparatorBottom']['isVisible'] = i < data.bulkPayees.length - 1;
                return rowData;
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
            var flxBtnEbill;
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
            var specialCharactersSet = "!@#&*_'-~^|$%()+=}{][/|?,.><`:;\"\\";
            var alphabetsSet = "abcdefghijklmnopqrstuvwxyz";
            var format = applicationManager.getFormatUtilManager().getDateFormat().toUpperCase();
            if (data.transitDays) {
                var transitDays = data.transitDays;
            } else {
                var transitDays = 0;
            }
            lblPayee = data.payeeNickName ? data.payeeNickName : data.payeeName;
            var nonValue = kony.i18n.getLocalizedString("i18n.common.none");
            if (data.billid === "0") {
                lblPayeeDate = kony.i18n.getLocalizedString("i18n.billPay.lastPayment") + ": " + kony.i18n.getLocalizedString("i18n.billPay.noPaymentActivity");
                lblDueDate = nonValue;
                lblBill = nonValue;
                txtAmount = {
                    "placeholder": kony.i18n.getLocalizedString("i18n.common.EnterAmount"),
                    "text": "",
                    "restrictCharactersSet": specialCharactersSet.replace(',.', '') + alphabetsSet + alphabetsSet.toUpperCase(),
                    "onKeyUp": scopeObj.enableOrDisableContinueButton.bind(scopeObj)
                    //           "textInputMode":constants.TEXTBOX_INPUT_MODE_NUMERIC
                };
            } else {
                lblPayeeDate = kony.i18n.getLocalizedString("i18n.billPay.lastPayment") + ": " + (data.lastPaidAmount ? ((scopeObj.formatAmount(data.lastPaidAmount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(data.transactionCurrency)) + " " + kony.i18n.getLocalizedString("i18n.common.on") + " " + scopeObj.getDateFromDateString(data.lastPaidDate, "YYYY-MM-DDTHH:MM:SS"))) : ("No Payment Activity"));
                lblDueDate = data.billDueDate ? scopeObj.getDateFromDateString(data.billDueDate, "YYYY-MM-DD") : nonValue;
                lblBill = data.dueAmount ? scopeObj.formatAmount(data.dueAmount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(data.transactionCurrency)) : nonValue;
                txtAmount = {
                    "placeholder": kony.i18n.getLocalizedString("i18n.common.EnterAmount"),
                    "text": data.dueAmount ? scopeObj.formatAmount(data.dueAmount, true) : "",
                    "restrictCharactersSet": specialCharactersSet.replace(',.', '') + alphabetsSet + alphabetsSet.toUpperCase(),
                    "onKeyUp": scopeObj.enableOrDisableContinueButton.bind(scopeObj)
                };
            }
            var lblNotes = data.notes ? data.notes : '';
            var btnPayBill = {
                "text": kony.i18n.getLocalizedString("i18n.Pay.PayBill"),
                "onClick": self.onClickPayBill.bind(scopeObj, data),
                "isVisible": applicationManager.getConfigurationManager().checkUserPermission("BILL_PAY_CREATE")
            }
            var calSendOn = {
                "dateComponents": CommonUtilities.getServerDateComponent(data.sendOn),
                "dateFormat": applicationManager.getFormatUtilManager().getDateFormat(),
                "validStartDate": CommonUtilities.getServerDateComponent(),
                "hidePreviousNextMonthDates": true,
                "onSelection": scopeObj.setNewDeliverDate.bind(scopeObj, transitDays),
                "accessibilityconfig": {
                    "a11yLabel": data.sendOn
                }
            };
            var calDeliverBy = {
                "dateComponents": CommonUtilities.getServerDateComponent(data.sendOn),
                "dateFormat": applicationManager.getFormatUtilManager().getDateFormat(),
                "validStartDate": CommonUtilities.getServerDateComponent(),
                "hidePreviousNextMonthDates": true
            };
            if (data.eBillSupport == "false" || data.isManuallyAdded == "true") {
                flxBtnEbill = {
                    //"text": "SOME TEXT",
                    "skin": ViewConstants.SKINS.SKNBTNEBILLACTIVE,
                    "isVisible": false
                };
                btnViewEbill = {
                    "isVisible": false
                };
            } else {
                if (data.eBillStatus == 1) {
                    flxBtnEbill = {
                        //"text": "SOME TEXT",
                        "skin": ViewConstants.SKINS.SKNBTNEBILLACTIVE,
                        "onClick": (data.billid === undefined || data.billid === null || data.billid == "0") ? null : scopeObj.viewEBill.bind(scopeObj, {
                            "billGeneratedDate": scopeObj.getDateFromDateString(data.billGeneratedDate, "YYYY-MM-DD"),
                            "amount": scopeObj.formatAmount(data.dueAmount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(data.transactionCurrency)),
                            "ebillURL": data.ebillURL
                        })
                    };
                    lblDueDate = {
                        "text": lblDueDate,
                        "isVisible": true
                    };
                    btnActivateEBill = {
                        "isVisible": false,
                        "text": kony.i18n.getLocalizedString("i18n.WireTransfer.ACTIVATE"),
                        "toolTip": kony.i18n.getLocalizedString("i18n.WireTransfer.ACTIVATE"),
                        "onClick": null,
                    };
                    btnViewEbill = {
                        "isVisible": true,
                        "text": kony.i18n.getLocalizedString("i18n.billPay.viewEBill"),
                        "toolTip": kony.i18n.getLocalizedString("i18n.billPay.viewEBill"),
                        "onClick": scopeObj.viewEBill.bind(scopeObj, {
                            "billGeneratedDate": scopeObj.getDateFromDateString(data.billGeneratedDate, "YYYY-MM-DD"),
                            "amount": scopeObj.formatAmount(data.dueAmount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(data.transactionCurrency)),
                            "ebillURL": data.ebillURL
							
				
                        })
                    };
                } else {
                    flxBtnEbill = {
                        //"text": "SOME TEXT",
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
                        "toolTip": kony.i18n.getLocalizedString("i18n.WireTransfer.ACTIVATE"),
                        "onClick": self.activateEbill.bind(scopeObj, data, "frmBulkPayees")
                    };
                    btnViewEbill = {
                        "isVisible": false,
                    };
                }
            }
            if(data.billid === undefined || data.billid === null || data.billid == "0"){
                flxBtnEbill.accessibilityConfig = {
                    "a11yLabel":  flxBtnEbill.skin === 'sknbtnebillactive' ? "ebill for " + lblPayee + " activated" : "ebill for " + lblPayee + " deactivated",
                    "a11yARIA": {
                        "tabindex": -1
                    }
                }

            }else{
                flxBtnEbill.accessibilityConfig = {
                    "a11yLabel":  "ebill for " + lblPayee,
                    "a11yARIA": {
                        "tabindex": 0,
                         "role":"button"
                    }
                }
            }
            btnViewEbill.accessibilityConfig = {
                "a11yLabel": "view ebill for payee " + lblPayee,
                "a11yARIA": {
                    "tabindex": 0,
                    "role": "button"
                }
            }
            btnActivateEBill.accessibilityConfig = {
                "a11yLabel": "Activate eBill for payee " + lblPayee,
                "a11yARIA": {
                    "tabindex": 0,
                    "role": "button"
                }
            }
            btnViewEbill.toolTip = '';
            //btnEbill.toolTip = '';
            btnActivateEBill.toolTip = '';
            var lstbPayFromMasterData = FormControllerUtility.getListBoxDataFromObjects(billPayAccounts, "accountID", CommonUtilities.getAccountDisplayNameWithBalance);
            return {
                "payeeId": data.payeeId,
                "billid": data.billid,
                "isBusinessPayee": isBusiness,
                "payeeAccountNumber": data.payeeAccountNumber,
                "lblSeparatorBottom": {
                    "text": " "
                },
                "flxdetails": {
                    "isVisible": false
                },
                "lblDropdown": ViewConstants.FONT_ICONS.CHEVRON_DOWN,
                "flxDropdown": {
                    accessibilityConfig: {
                        "a11yLabel": "Show more details for Payee " + lblPayee,
                        "a11yARIA": {
                            "role": "button",
                            "tabindex": 0,
                            "aria-expanded": false
                        }
                    }
                },
                "lblIdentifier": {
                    "skin": "sknffffff15pxolbfonticons"
                },
                "flxIdentifier": {
                    "skin": "sknFlxIdentifier"
                },
                "flxBillPaymentAllPayeesSelected": {
                    "height": "75dp",
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
                "flxBtnEbill":flxBtnEbill,
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
                    "masterData": lstbPayFromMasterData,
                    "selectedKey": preferredAccountNumber && this.isValidSelectedKey(lstbPayFromMasterData, preferredAccountNumber) ? preferredAccountNumber : (billPayAccounts && billPayAccounts.length > 0) ? billPayAccounts[0].accountID : null,
                    "left": this.profileAccess === "both" ? "5%" : "0%",
                    "width": this.profileAccess === "both" ? "95%" : "100%",
                    "onSelection": function(eventObject, context) {
                        scopeObj.setFromAccountIcon(context)
                    }.bind(scopeObj),
                    // isBusiness : billPayAccounts[0].isBusinessAccount
                },
                "template": (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) ? "flxBillPaymentAllPayeesMobileSelected" : "flxBillPaymentAllPayeesSelected",
                "btnActivateEbill": btnActivateEBill,
                "lblDollar": applicationManager.getConfigurationManager().getCurrencyCode(),
                "preferredAccountNumber": preferredAccountNumber,
                "btnPayBill": btnPayBill,
                "flxAmount": {
                    "skin": ViewConstants.SKINS.COMMON_FLEX_NOERRORSKIN
                },
                "lblIcon": {
                    "isVisible": this.profileAccess === "both" ? true : false,
                    //"isVisible": applicationManager.getConfigurationManager().isCombinedUser === "true" ? true : false,
                    "text": isBusiness === "1" ? "r" : "s"
                },
                "flxIcon": {
                    "isVisible": false //this.profileAccess === "both" ? true : false
                    //"isVisible": applicationManager.getConfigurationManager().isCombinedUser === "true" ? true : false
                },
                "flxFromIcon": {
                    "isVisible": this.profileAccess === "both" ? true : false
                    //"isVisible": applicationManager.getConfigurationManager().isCombinedUser === "true" ? true : false
                },
                "lblFromIcon": {
                    "isVisible": this.profileAccess === "both" ? true : false,
                    //"isVisible": applicationManager.getConfigurationManager().isCombinedUser === "true" ? true : false,
                    "text": (billPayAccounts && billPayAccounts.length > 0 && this.presenter.isBusinessAccount(billPayAccounts[0].accountID) === "true") ? "r" : "s"
                    //"text": billPayAccounts[0].isBusinessAccount === "true" ? "r" : "s",
                    // "onSelection": scopeObj.setFromAccountIcon.bind(scopeObj)
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
            var index = this.view.segmentBillpay.selectedRowIndex ? this.view.segmentBillpay.selectedRowIndex[1] : arguments[3].rowIndex;
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
            if(CommonUtilities.isMirrorLayoutEnabled()){
                return (day + "/" + month + "/" + nextDate.getFullYear());
            }
            else{
                return (month + "/" + day + "/" + nextDate.getFullYear());
            }
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
         * Activates the E-Bill
         * @param {object} data data
         * @param {string} selectedTab selected tab
         */
        activateEbill: function(data, selectedTab) {
            var self = this;
            indexSelected = arguments[3].rowIndex;
            this.ActivatePopupFlag = true;
            CommonUtilities.setText(self.view.lblAccountNumberValue, data.accountNumber ? data.accountNumber : " ", CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(self.view.lblBillerNameValue, data.payeeNickName ? data.payeeNickName : data.payeeName, CommonUtilities.getaccessibilityConfig());
            self.view.flxActivatePopup.setVisibility(true);
            self.view.flxDialogs.setVisibility(true);
            self.view.lblHeader.setActive(true);
            self.view.btnProceed.onClick = function() {
                self.ActivatePopupFlag = false;
                self.view.flxActivatePopup.setVisibility(false);
                self.view.flxDialogs.setVisibility(false);
                self.presenter.activateEbill(data, selectedTab);
            };
            self.view.btnCancel.onClick = function() {
                self.ActivatePopupFlag = false;
                self.view.flxActivatePopup.setVisibility(false);
                self.view.flxDialogs.setVisibility(false);
                kony.application.getCurrentForm().segmentBillpay.setActive(indexSelected, 0, 'fflxBillPaymentAllPayeesSelected.flxDate.btnActivateEbill');
            };
            self.view.flxCross.onClick = function() {
                self.ActivatePopupFlag = false;
                self.view.flxActivatePopup.setVisibility(false);
                self.view.flxDialogs.setVisibility(false);
                kony.application.getCurrentForm().segmentBillpay.setActive(indexSelected, 0, 'fflxBillPaymentAllPayeesSelected.flxDate.btnActivateEbill');
            };
        },

        /**
         * Method to get the date
         * @return {array[]} startdate
         */
        getvalidStartDate: function() {
            var date = new Date(CommonUtilities.getServerDate());
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
            var dateObj = scopeobj.getDateFromDateString(dateString, "YYYY-MM-DDTHH:MM:SS");
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
                CommonUtilities.setText(scopeObj.view.lblPostDateValue, viewModel.billGeneratedDate || nonValue, CommonUtilities.getaccessibilityConfig());
                CommonUtilities.setText(scopeObj.view.lblAmountValue, viewModel.amount || nonValue, CommonUtilities.getaccessibilityConfig());
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
                scopeObj.view.flxFormContent.minHeight = "190%";
                scopeObj.view.flxFormContent.enableScrolling = false;
                scopeObj.view.flxViewEbill.setVisibility(true);
                scopeObj.ViewBillPopupFlag = true;
                scopeObj.view.flxDialogs.setVisibility(true);
                scopeObj.view.lblTransactions1.setActive(true);
            }
            scopeObj.view.flxImgCancel.onClick = function() {
                scopeObj.view.flxFormContent.minHeight = kony.os.deviceInfo().screenHeight - 
                 parseInt(scopeObj.view.flxHeader.height.slice(0, -2)) - parseInt(scopeObj.view.flxFooter.height.slice(0, -2)) + "dp";
                scopeObj.view.flxFormContent.enableScrolling = true;
                scopeObj.ViewBillPopupFlag = false;
                scopeObj.view.flxViewEbill.setVisibility(false);
                scopeObj.view.flxDialogs.setVisibility(false);
                kony.application.getCurrentForm().segmentBillpay.setActive(escIndex, 0, 'flxBillPaymentAllPayeesSelected.btnViewEBill');
            };
            escIndex = arguments[2].rowIndex;
			scopeObj.view.flxViewEbill.lblTransactions1.setActive(true);
        },
        /**
         * downloadFile:    method to download the e-bill file.
         * @param {object} data information
         */
        downloadFile: function(data) {
            if (data) {
                // CommonUtilities.downloadFile({
                this.downloadFileBillPay({      // If the original download service available modify the downloadFileBillPay to CommonUtilities.downloadFile function. This is for mock billPay image download function
                    'url': data.url,
                    'filename': kony.i18n.getLocalizedString('i18n.billPay.Bill')
                })
            }
        },

        downloadFileBillPay: function(data) {
            if (data) {
                if (data.url) {
                    var element = document.createElement('a');
                    element.setAttribute('href', data.url);
                    element.setAttribute('download', data.filename || 'download');
                    element.setAttribute('target', '_blank'); 
                    element.style.display = 'none';
                    document.body.appendChild(element);
                    element.click();
                    document.body.removeChild(element);
                } else {
                    return "Url is Invalid : " + data.url;
                }
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
            this.view.flxFormContent.enableScrolling = true;
            this.view.flxFormContent.minHeight = kony.os.deviceInfo().screenHeight - 
            parseInt(scopeObj.view.flxHeader.height.slice(0, -2)) - parseInt(scopeObj.view.flxFooter.height.slice(0, -2)) + "dp";
            FormControllerUtility.setupFormOnTouchEnd(width);
            
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            this.popUpFunction();
            this.view.CustomPopupLogout.onBreakpointChangeComponent(scopeObj.view.CustomPopupLogout, width);
            this.view.CustomPopupCancel.onBreakpointChangeComponent(scopeObj.view.CustomPopupCancel, width);
        },
        popUpFunction: function() {
          var scope = this;
            if (this.ActivatePopupFlag) {
                this.view.flxActivatePopup.setVisibility(true);
                this.view.flxDialogs.setVisibility(true);
            } else if (this.CancelPopupFlag) {
                this.view.flxCancelPopup.setVisibility(true);
                this.view.flxDialogs.setVisibility(true);
            } else if (this.ViewBillPopupFlag) {
                this.view.flxFormContent.minHeight = "190%";
                this.view.flxFormContent.enableScrolling = false;
                this.view.flxViewEbill.setVisibility(true);
                this.view.flxDialogs.setVisibility(true);
            } else {
                this.view.flxCancelPopup.setVisibility(false);
                this.view.flxActivatePopup.setVisibility(false);
                this.view.flxFormContent.minHeight = kony.os.deviceInfo().screenHeight - 
                parseInt(scope.view.flxHeader.height.slice(0, -2)) - parseInt(scope.view.flxFooter.height.slice(0, -2)) + "dp";
                this.view.flxFormContent.enableScrolling = true;
                this.view.flxViewEbill.setVisibility(false);
                this.view.flxDialogs.setVisibility(false);
            }
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
        },
        /**
         * method to disable or enable continue button based on amount entered
         */
        enableOrDisableContinueButton: function () {
            const segData = this.view.segmentBillpay.data;
            let amount = 0;
            for (const record in segData) {
                if (segData[record].txtAmount.text) {
                    amount += parseFloat(this.deformatAmount(segData[record].txtAmount.text));
                }
            }
            if (amount > 0) {
                CommonUtilities.enableButton(this.view.btnBulkConfirm);
            } else {
                CommonUtilities.disableButton(this.view.btnBulkConfirm);
            }
        }
    }
});