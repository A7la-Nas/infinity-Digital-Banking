define(['FormControllerUtility', 'CommonUtilities', 'ViewConstants', 'OLBConstants'], function(FormControllerUtility, CommonUtilities, ViewConstants, OLBConstants) {
     
    var orientationHandler = new OrientationHandler();
    return {
        profileAccess: "",
        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;

            this.presenter = applicationManager.getModulesPresentationController({ 'appName': 'BillPayMA', 'moduleName': 'BillPaymentUIModule' });
            this.view.btnbacktopayeelist.onClick = function () {
                kony.mvc.getNavigationManager().navigate({
                    context: this,
                    params: {
                        "refreshComponent": false
                    },
                    callbackModelConfig: {
                        managePayees: true
                    }
                });
            }.bind(this);
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
            let self = this;
            this.profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
            this.view.customheadernew.activateMenu("Bill Pay", "My Payee List");
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['flxHeader', 'flxFooter']);
            this.view.imgSortFrom.toolTip = kony.i18n.getLocalizedString("i18n.payments.sortByBillDate");
            this.view.imgSortDate.toolTip = kony.i18n.getLocalizedString("i18n.payments.sortByPaidDate");
            this.view.imgSortFromAccount.toolTip = kony.i18n.getLocalizedString("i18n.payments.sortByAccount");
            this.view.btnbacktopayeelist.toolTip = kony.i18n.getLocalizedString("i18n.Transfers.BACKTOPAYEELIST");

            this.view.customheadernew.btnSkipNav.onClick = function() {
                self.view.lblPayABill.setActive(true);
            }

            this.view.btnSkipRight.onClick = function() {
                self.view.flxAddPayee.setActive(true);
            }

            this.view.flxLogout.onKeyPress = this.onKeyPressCallBack;     
            
        },
        postShow: function() {
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            applicationManager.executeAuthorizationFramework(this);
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
            if (viewModel.data && viewModel.payeeActivities) {
                this.bindViewActivityData(viewModel.data, viewModel.payeeActivities);
            }
            if (viewModel.billDueData) {
                this.bindTotalEbillAmountDue(viewModel.billDueData);
            }
        },
        /**
         * Method to handle and display bill payment activity data.
         * @param {object} data contains header data i.e. payee name and account number
         * @param {object} response contains payment activities data
         */
        bindViewActivityData: function(data, response) {
            var scopeObj = this;
            this.billSortMap = [{
                name: 'billGeneratedDate',
                imageFlx: this.view.imgSortFrom,
                clickContainer: this.view.flxFrom
            }, {
                name: 'billPaidDate',
                imageFlx: this.view.imgSortDate,
                clickContainer: this.view.flxDate
            }, {
                name: 'fromAccountNumber',
                imageFlx: this.view.imgSortFromAccount,
                clickContainer: this.view.flxfromaccount
            }, {
                name: 'amount',
                imageFlx: this.view.imgSortAmount,
                clickContainer: this.view.flxAmount
            },{
                name: 'statusDescription',
                imageFlx: this.view.imgSortStatus,
                clickContainer: this.view.flxStatus
            }];
            //if(configurationManager.isCombinedUser === "true"){
            if (this.profileAccess === "both") {
                this.view.flxFromUser.setVisibility(true);
                this.view.lblFromUser.text = data.isBusinessPayee === "1" ? "r" : "s";
            }
            CommonUtilities.setText(scopeObj.view.lblAccountName, data.payeeName, CommonUtilities.getaccessibilityConfig());
            CommonUtilities.setText(scopeObj.view.lblAccountHolder, data.payeeAccountNumber ? data.payeeAccountNumber : " ", CommonUtilities.getaccessibilityConfig());
            if (response.length === 0) {
                CommonUtilities.setText(scopeObj.view.lblAmountDeducted, kony.i18n.getLocalizedString("i18n.common.NA"), CommonUtilities.getaccessibilityConfig());
                scopeObj.view.flxSegment.setVisibility(false);
                scopeObj.view.flxNoRecords.setVisibility(true);
                this.view.flxFormContent.forceLayout();
                return;
            }
            scopeObj.view.flxSegment.setVisibility(true);
            scopeObj.view.flxNoRecords.setVisibility(false);
            var totalAmount = response[0].billPaidAmount ? scopeObj.formatAmount(response[0].billPaidAmount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(response[0].transactionCurrency)) : kony.i18n.getLocalizedString("i18n.common.none");
            var dataMap = {
                "lblDate": "lblDate",
                "lblDate1": "lblDate1",
                "flxbills": "flxbills",
                "lblBills": "lblBills",
                "lblBillsAccessibility":"lblBillsAccessibility",
                "lblpaiddate": "lblpaiddate",
                "lblpaiddate1": "lblpaiddate1",
                "lblFrom": "lblFrom",
                "lblFrom1": "lblFrom1",
                "flxActivityUser": "flxActivityUser",
                "lblActivityUser": "lblActivityUser",
                "lblAmount": "lblAmount",
                "lblAmount1": "lblAmount1",
                "lblStatus": "lblStatus",
                "lblStatus1": "lblStatus1",
                "lblFromHeader": "lblFromHeader",
                "lblAmountHeader": "lblAmountHeader",
                "lblSeparator": "lblSeparator"
            };
            this.filterData=response;
            response = response.map(function(dataItem, index) {
                var payeeNickName = dataItem.payeeNickName ? dataItem.payeeNickName : kony.i18n.getLocalizedString("i18n.common.none");
                var fromAccountName = dataItem.fromAccountName ? dataItem.fromAccountName : kony.i18n.getLocalizedString("i18n.common.none");
                var billGeneratedDate = dataItem.billGeneratedDate ? dataItem.billGeneratedDate : kony.i18n.getLocalizedString("i18n.common.none");
                return {
                    "lblDate1": {
						"text": dataItem.billGeneratedDate ? scopeObj.getDateFromDateString(dataItem.billGeneratedDate, "YYYY-MM-DDTHH:MM:SS") : kony.i18n.getLocalizedString("i18n.common.none"),
					},

                    "lblDate": dataItem.billGeneratedDate ? scopeObj.getDateFromDateString(dataItem.billGeneratedDate, "YYYY-MM-DDTHH:MM:SS") : kony.i18n.getLocalizedString("i18n.common.none"),
                    "lblDate1": (scopeObj.view.lblFrom.text) + " " + (dataItem.billGeneratedDate ? scopeObj.getDateFromDateString(dataItem.billGeneratedDate, "YYYY-MM-DDTHH:MM:SS") : kony.i18n.getLocalizedString("i18n.common.none")),

                    "flxbills": {
                        "onClick": applicationManager.getConfigurationManager().canViewPastEBills === 'true' && dataItem.eBillStatus == 1 ? scopeObj.viewEBill.bind(scopeObj, {
                            "billGeneratedDate": dataItem.billGeneratedDate ? scopeObj.getDateFromDateString(dataItem.billGeneratedDate, "YYYY-MM-DDTHH:MM:SS") : kony.i18n.getLocalizedString("i18n.common.none"),
                            "amount": dataItem.billDueAmount ? scopeObj.formatAmount(dataItem.billDueAmount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(dataItem.transactionCurrency)) : kony.i18n.getLocalizedString("i18n.common.none"),
                            "ebillURL": dataItem.ebillURL
                        }) : null
                    },
                    "lblBills": {
                        "text": scopeObj.formatBillString(payeeNickName, fromAccountName, scopeObj.getDateFromDateString(billGeneratedDate, "YYYY-MM-DDTHH:MM:SS"))
                    },
                    "lblBillsAccessibility":{
                        "text": scopeObj.view.lblBillsKey.text+" "+scopeObj.formatBillString(payeeNickName, fromAccountName, scopeObj.getDateFromDateString(billGeneratedDate, "YYYY-MM-DDTHH:MM:SS"))
                    },
                    "lblpaiddate1": {
						"text" : dataItem.billPaidDate ? scopeObj.getDateFromDateString(dataItem.billPaidDate, "YYYY-MM-DDTHH:MM:SS") : kony.i18n.getLocalizedString("i18n.common.none"),
					},
					
                    "lblpaiddate": dataItem.billPaidDate ? scopeObj.getDateFromDateString(dataItem.billPaidDate, "YYYY-MM-DDTHH:MM:SS") : kony.i18n.getLocalizedString("i18n.common.none"),
					
					"lblpaiddate1": (scopeObj.view.lblDate.text) + " " + (dataItem.billPaidDate ? scopeObj.getDateFromDateString(dataItem.billPaidDate, "YYYY-MM-DDTHH:MM:SS") : kony.i18n.getLocalizedString("i18n.common.none")),
                    "lblFrom1": {
						"text" : dataItem.fromAccountName ? CommonUtilities.getAccountDisplayName({
                        name: dataItem.fromAccountName,
                        accountID: dataItem.fromAccountNumber,
                        Account_id: dataItem.fromAccountNumber
                    }) : kony.i18n.getLocalizedString("i18n.common.none"),
						},
										
                    "lblFrom": dataItem.fromAccountName ? CommonUtilities.getAccountDisplayName({
                        name: dataItem.fromAccountName,
                        accountID: dataItem.fromAccountNumber,
                        Account_id: dataItem.fromAccountNumber
                    }) : kony.i18n.getLocalizedString("i18n.common.none"),
					
					"lblFrom1": (scopeObj.view.lblFromAccount.text) + " " + (dataItem.fromAccountName ? CommonUtilities.getAccountDisplayName({
                        name: dataItem.fromAccountName,
                        accountID: dataItem.fromAccountNumber,
                        Account_id: dataItem.fromAccountNumber
                    }) : kony.i18n.getLocalizedString("i18n.common.none")),

                    "flxActivityUser": {
                        "isVisible": (applicationManager.getUserPreferencesManager().isSingleCustomerProfile === false) ? true : false
                        //"isVisible": (configurationManager.isCombinedUser === "true")? true : false
                    },
                    "lblActivityUser": {
                        "text": scopeObj.presenter.isBusinessAccount(dataItem.fromAccountNumber) === "true" ? "r" : "s", //dataItem.isBusinessPayee === "1" ? "r" : "s"
                    },
                    "lblAmount1": {
						"text" : dataItem.amount ? scopeObj.formatAmount(dataItem.amount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(dataItem.transactionCurrency)) : kony.i18n.getLocalizedString("i18n.common.none"),
					},
					
                    "lblAmount": dataItem.amount ? scopeObj.formatAmount(dataItem.amount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(dataItem.transactionCurrency)) : kony.i18n.getLocalizedString("i18n.common.none"),
					
					"lblAmount1": (scopeObj.view.lblAmount.text) + " " + (dataItem.amount ? scopeObj.formatAmount(dataItem.amount, false, applicationManager.getFormatUtilManager().getCurrencySymbol(dataItem.transactionCurrency)) : kony.i18n.getLocalizedString("i18n.common.none")),
					
					"lblStatus1": {
						"text" : dataItem.statusDescription ? dataItem.statusDescription : kony.i18n.getLocalizedString("i18n.common.none"),
					},
					
                    "lblStatus": dataItem.statusDescription ? dataItem.statusDescription : kony.i18n.getLocalizedString("i18n.common.none"),
					"lblStatus1": (scopeObj.view.lblStatus.text) + " " + (dataItem.statusDescription ? dataItem.statusDescription : kony.i18n.getLocalizedString("i18n.common.none")),
                    "template": (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) ? "flxBillPaymentActivityMobile" : "flxBillPaymentActivity",
                    "lblSeparator": {
                        "isVisible": index !== response.length - 1
                    }
                };
            });
            CommonUtilities.setText(scopeObj.view.lblAmountDeducted, totalAmount, CommonUtilities.getaccessibilityConfig());
            scopeObj.view.segTransferActivity.widgetDataMap = dataMap;
            scopeObj.view.segTransferActivity.setData(response);
            FormControllerUtility.setSortingHandlers(this.billSortMap, this.sortActivityHandler, this);
             FormControllerUtility.updateSortFlex(this.billSortMap, this.sortConfig);
            scopeObj.view.flxFormContent.forceLayout();
        },
        sortActivityHandler: function(event, obj) {
            //this.loadBusinessBankingModule().presentationController.navigateToUsers(this.loadBusinessBankingModule().presentationController.fetchSubUsersSuccess.bind(this.loadBusinessBankingModule().presentationController), obj);
            var sortBy = obj.sortBy;
            this.sortConfig = {};
            this.sortConfig.sortBy = sortBy;
            //this.sortConfig.offset = OLBConstants.DEFAULT_OFFSET;
            //this.sortConfig.paginationRowLimit = OLBConstants.PAGING_ROWS_LIMIT;
            var sortData = {};
            if (sortBy === "billGeneratedDate") {
                if (this.view.imgSortFrom.src === OLBConstants.IMAGES.SORTING || this.view.imgSortFrom.src === OLBConstants.IMAGES.SORTING_NEXT) {
                    this.sortConfig.order = OLBConstants.ASCENDING_KEY;
                    
                        sortData = CommonUtilities.sortAndSearchJSON(this.filterData, "billGeneratedDate", "ASC", null, null);
                    
                } else if (this.view.imgSortFrom.src === OLBConstants.IMAGES.SORTING_PREVIOUS) {
                    this.sortConfig.order = OLBConstants.DESCENDING_KEY;
                    
                        sortData = CommonUtilities.sortAndSearchJSON(this.filterData, "billGeneratedDate", "DESC", null, null);
                    
                } else {
                    this.view.imgSortFrom.src = OLBConstants.IMAGES.SORTING;
                    sortData = this.filterData;
                }
            } else if (sortBy === "billPaidDate") {
                if (this.view.imgSortDate.src === OLBConstants.IMAGES.SORTING || this.view.imgSortDate.src === OLBConstants.IMAGES.SORTING_NEXT) {
                    this.sortConfig.order = OLBConstants.ASCENDING_KEY;
						
						sortData = CommonUtilities.sortAndSearchJSON(this.filterData, "billPaidDate", "ASC", null, null);
                    
                } else if (this.view.imgSortDate.src === OLBConstants.IMAGES.SORTING_PREVIOUS) {
                    this.sortConfig.order = OLBConstants.DESCENDING_KEY;
                    
                        sortData = CommonUtilities.sortAndSearchJSON(this.filterData, "billPaidDate", "DESC", null, null);
                    
                } else {
                    this.view.imgSortDate.src = OLBConstants.IMAGES.SORTING;
                    sortData = this.filterData;
                }
            } else if (sortBy === "fromAccountNumber") {
                if (this.view.imgSortFromAccount.src === OLBConstants.IMAGES.SORTING || this.view.imgSortFromAccount.src === OLBConstants.IMAGES.SORTING_NEXT) {
                    this.sortConfig.order = OLBConstants.ASCENDING_KEY;
                    
                        sortData = CommonUtilities.sortAndSearchJSON(this.filterData, "fromAccountNumber", "ASC", null, null);
                    
                } else if (this.view.imgSortFromAccount.src === OLBConstants.IMAGES.SORTING_PREVIOUS) {
                    this.sortConfig.order = OLBConstants.DESCENDING_KEY;
                    
					
                        sortData = CommonUtilities.sortAndSearchJSON(this.filterData, "fromAccountNumber", "DESC", null, null);
                    
                } else {
                    this.view.imgSortFromAccount.src = OLBConstants.IMAGES.SORTING;
                    sortData = this.filterData;
                }
            } else if (sortBy === "amount") {
                if (this.view.imgSortAmount.src === OLBConstants.IMAGES.SORTING || this.view.imgSortAmount.src === OLBConstants.IMAGES.SORTING_NEXT) {
                    this.sortConfig.order = OLBConstants.ASCENDING_KEY;
                    
                        sortData = CommonUtilities.sortAndSearchJSON(this.filterData, "amount", "ASC", null, null);
                    
                } else if (this.view.imgSortAmount.src === OLBConstants.IMAGES.SORTING_PREVIOUS) {
                    this.sortConfig.order = OLBConstants.DESCENDING_KEY;
                    
                        sortData = CommonUtilities.sortAndSearchJSON(this.filterData, "amount", "DESC", null, null);
                    
                } else {
                    this.view.imgSortAmount.src = OLBConstants.IMAGES.SORTING;
                    sortData = this.filterData;
                }
            }
            else if (sortBy === "statusDescription") {
                if (this.view.imgSortStatus.src === OLBConstants.IMAGES.SORTING || this.view.imgSortStatus.src === OLBConstants.IMAGES.SORTING_NEXT) {
                    this.sortConfig.order = OLBConstants.ASCENDING_KEY;
                    
                        sortData = CommonUtilities.sortAndSearchJSON(this.filterData, "statusDescription", "ASC", null, null);
                    
                } else if (this.view.imgSortStatus.src === OLBConstants.IMAGES.SORTING_PREVIOUS) {
                    this.sortConfig.order = OLBConstants.DESCENDING_KEY;
                    
                        sortData = CommonUtilities.sortAndSearchJSON(this.filterData, "statusDescription", "DESC", null, null);
                    
                } else {
                    this.view.imgSortStatus.src = OLBConstants.IMAGES.SORTING;
                    sortData = this.filterData;
                }
            }
            this.sortConfig.limit = sortData.length;
				this.data={};
				this.data.payeeName = sortData[0].payeeName;
				this.bindViewActivityData(this.data,sortData);
        },
        /**
         * used to show the dueBills count and totalDueBills Amount
         * @param {object} dueBills contains the no of bills and totalBillDueAmount
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
         * used to convert the CalenderFormat Date from string formated date
         */
        getDateFromDateString: function(dateString, inputFormat) {
            var fu = applicationManager.getFormatUtilManager();
            var dateObj = fu.getDateObjectfromString(dateString, inputFormat);
            var outputDate = fu.getFormatedDateString(dateObj, fu.getApplicationDateFormat());
            return outputDate;
        },
        /**
         * used to format the amount
         */
        formatAmount: function(amount, currencySymbolNotRequired, currencySymbol) {
            return this.presenter.formatAmount(amount, currencySymbolNotRequired);
        },
        /**
         * returns formatted string with Account name, Month, year
         */
        formatBillString: function(payeeNickName, fromAccountName, billDate) {
            var monthString = kony.i18n.getLocalizedString("i18n.common.none");
            var year = kony.i18n.getLocalizedString("i18n.common.none");
            if (billDate !== "") {
                var dateObj = applicationManager.getFormatUtilManager().getDateObjectFromCalendarString(billDate, applicationManager.getFormatUtilManager().getDateFormat());
                monthString = dateObj.getMonth() + 1;
                year = dateObj.getFullYear();
            }
            return payeeNickName.split(' ')[0] + '-' + fromAccountName.split(' ')[0] + '-' + monthString + '-' + year;
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
        showOneTimePaymentOption: function() {
            this.view.flxMakeOneTimePayment.setVisibility(true);
        },
        /**
         * used to hide the permission based UI
         */
        hideOneTimePaymentOption: function() {
            this.view.flxMakeOneTimePayment.setVisibility(false);
        },

        /**
         * logout dialog
         */
           onKeyPressCallBack: function(eventObject, eventPayload) {
            var self = this;
            if (eventPayload.keyCode === 27) {
                if (self.view.flxLogout.isVisible === true) {
                    self.view.flxLogout.isVisible = false;
                    self.view.customheader.headermenu.btnLogout.setActive(true);
                }
            }
        },
    };
});