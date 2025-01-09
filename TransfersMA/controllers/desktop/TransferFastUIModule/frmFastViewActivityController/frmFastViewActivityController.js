define(['CommonUtilities', 'OLBConstants', 'ViewConstants', 'FormControllerUtility'], function (CommonUtilities, OLBConstants, ViewConstants, FormControllerUtility) {
    var count = 0;
    return {
        profileAccess: "",
        init: function () {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function () { };
            this.view.onBreakpointChange = this.onBreakpointChange;
            //this.view.lblAddBankAccount.toolTip = kony.i18n.getLocalizedString("i18n.FastTransfers.AddDBXAccount");
            //this.view.lblAddKonyAccount.toolTip = kony.i18n.getLocalizedString("i18n.FastTransfers.AddExternalAccount");
           // this.view.lblAddInternationalAccount.toolTip = kony.i18n.getLocalizedString("i18n.FastTransfers.AddInternationalAccount");
           // this.view.lblAddRecipient.toolTip = kony.i18n.getLocalizedString("i18n.FastTransfers.AddPersonToPersonRecipient");
           // this.view.lblBackToManageRecipients.toolTip = kony.i18n.getLocalizedString("i18n.FastTransfers.BackToManageRecipient");
            var scopeObj = this;
            scopeObj.transfersFastPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule").presentationController;
            this.view.flxAddBankAccount.setVisibility(applicationManager.getConfigurationManager().checkUserPermission("INTRA_BANK_FUND_TRANSFER_CREATE_RECEPIENT"));
            this.view.flxAddBankAccount.onClick = function () {
                scopeObj.transfersFastPresentationController.showTransferScreen({
                    initialView: "addDBXAccount"
                });
            }
            this.view.flxAddKonyAccount.setVisibility(applicationManager.getConfigurationManager().checkUserPermission("INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT"));
            this.view.flxAddKonyAccount.onClick = function () {
                scopeObj.transfersFastPresentationController.showTransferScreen({
                    initialView: "addExternalAccount"
                });
            }
            this.view.flxAddInternationalAccount.setVisibility(applicationManager.getConfigurationManager().checkUserPermission("INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT"));
            this.view.flxAddInternationalAccount.onClick = function () {
                scopeObj.transfersFastPresentationController.showTransferScreen({
                    initialView: "addInternationalAccount"
                });
            }
            this.view.flxAddReciepient.setVisibility(applicationManager.getConfigurationManager().checkUserPermission("P2P_CREATE_RECEPIENT"));
            this.view.flxAddReciepient.onClick = function () {
                scopeObj.transfersFastPresentationController.showTransferScreen({
                    initialView: "addRecipient"
                });
            }
            this.fastTransferPC = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("TransferFastUIModule").presentationController;
            this.viewTransactionsSortMap = [{
                name: "fromAccountName",
                imageFlx: this.view.flximgdatemod,
                clickContainer: this.view.flxdatemod
				
            
				
            }, {
                name: "transactionDate",
                imageFlx: this.view.flxfromaccountimgmod,
                clickContainer: this.view.flxfromaccountmod
				
            
				
            }];
        },
        onBreakpointChange: function (form, width) {
            var scope = this
            FormControllerUtility.setupFormOnTouchEnd(width);
           
            this.view.customheadernew.onBreakpointChangeComponent();
            this.view.customfooternew.onBreakpointChangeComponent();
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            this.view.CustomPopupLogout.onBreakpointChangeComponent(scope.view.CustomPopupLogout, width);
        },
        preShow: function () {
			var scope=this;
            this.profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
            this.view.customheadernew.activateMenu("FASTTRANSFERS", "Transfer Money");
            FormControllerUtility.updateWidgetsHeightInInfo(this, ['customheader', 'flxMainContainer', 'flxHeader', 'flxFooter']);
			this.view.customheadernew.btnSkipNav.onClick = function () {
                scope.view.lblHeader.setActive(true);
            };
			scope.view.btnByPass.onClick = function() {
                scope.view.flxAddBankAccount.setActive(true);
            };
			 
			//this.view.flxLogout.onKeyPress = this.onKeyPressCallBack;
           
            
			this.view.tablePagination.imgPaginationNext.toolTip="";
			this.view.tablePagination.imgPaginationPrevious.toolTip="";
           this.view.tablePagination.lblPagination.width="36%";
         if (kony.application.getCurrentBreakpoint() === 640 || kony.application.getCurrentBreakpoint() === 1024) {
                    this.view.lblHeader.text="Transfer Activities";
                    this.view.customheadernew.lblHeaderMobile.text ="Transfer Activities";
                }
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
        postShow: function () {
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
            this.view.flxLogout.onKeyPress = this.onKeyPressCallBack;
            this.view.CustomPopupLogout.onKeyPress = this.onKeyPressCallBack;
            this.view.CustomPopupLogout.doLayout = CommonUtilities.centerPopupFlex;
            this.view.lblFromTitle.text = "To account :";
            this.view.lblAmountDeductedTitle.text = "Amount Deducted till Date :";
            this.view.lblFromTitle.skin = "slLabel0d8a72616b3cc47";
            this.view.lblAmountDeductedTitle.skin = "slLabel0d8a72616b3cc47";
            if (kony.application.getCurrentBreakpoint() >= 1024) {
                this.view.flxdatemod.width = "21%";
            }
            if (kony.application.getCurrentBreakpoint() < 1024) {
                this.view.customheadernew.lblHeaderMobile.text = "Transfer Activities";
            }
            this.view.flxBackToManageRecipients.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": -1
                }
            }
            this.view.lblBackToManageRecipients.accessibilityConfig = {
                a11yARIA: {
                    "tabindex": 0
                }
            }
        },
        /**
         * updateFormUI - the entry point method for the form controller.
         * @param {Object} viewModel - it contains the set of view properties and keys.
         */
        updateFormUI: function (viewModel) {
            if (viewModel.isLoading === true) {
                FormControllerUtility.showProgressBar(this.view);
            } else if (viewModel.isLoading === false) {
                FormControllerUtility.hideProgressBar(this.view);
            }
            if (viewModel.viewTransactionsData) {
                this.setAccountActivity(viewModel.viewTransactionsData);
            }
            if (viewModel.noMoreRecords) {
                this.showNoMoreRecords();
            }
            if (viewModel.headerData) {
                this.updateHeader(viewModel.headerData)
            }
        },
        /**
         * postShow Actions
         */
        postShowActions: function () {
            applicationManager.getNavigationManager().applyUpdates(this);
        },
        /**
         * showNoMoreRecords - Handles zero records scenario in navigation.
         */
        showNoMoreRecords: function () {
            this.view.tablePagination.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_INACTIVE;
            this.view.tablePagination.flxPaginationNext.accessibilityConfig = {
                a11yLabel: "Next page",
                a11yARIA: {
                    tabindex: -1,
                    role: "button"
                }
            }
            this.view.tablePagination.flxPaginationNext.onClick = function () { };
            kony.ui.Alert(kony.i18n.getLocalizedString("i18n.navigation.norecordsfound"));
            FormControllerUtility.hideProgressBar(this.view);
        },
        updateHeader: function (data) {
            CommonUtilities.setText(this.view.lblAccountName, data.accountName, CommonUtilities.getaccessibilityConfig());
            //CommonUtilities.setText(this.view.lblAccountHolder, viewModel[len - 1].accountNumber , CommonUtilities.getaccessibilityConfig());
            //this.view.flxBackToManageRecipients.onTouchStart = data.onCallbackManagerPayee;
            // this.view.flxBackToManageRecipients.onClick = data.onCallbackManagerPayee;
            this.view.lblBackToManageRecipients.onClick = data.onCallbackManagerPayee;
            this.view.flxFormContent.forceLayout();
        },
        setAccountActivity: function (viewModel) {
            var orientationHandler = new OrientationHandler();
            var configurationManager = applicationManager.getConfigurationManager();
            var widgetDataMap = {
                "flxAmount": "flxAmount",
                "flxDate": "flxDate",
                "flxFrom": "flxFrom",
                "flxRunningBalance": "flxRunningBalance",
                "flxSort": "flxSort",
                "flxStatus": "flxStatus",
                "lblAmount": "lblAmount",
                "lblDate": "lblDate",
                "imgIcon": "imgIcon",
                "flxIcon": "flxIcon",
                "lblFrom": "lblFrom",
				"lblFrom1": "lblFrom1",
                "lblpaiddate": "lblpaiddate",
				"lblpaiddate1": "lblpaiddate1",
                "lblRunningBalance": "lblRunningBalance",
                "lblStatus": "lblStatus",
				"lblStatus1": "lblStatus1",
                "lblAmount1": "lblAmount1",
                "lblAmountHeader": "lblAmountHeader",
                "lblSeparator": "lblSeparator"
            };
            var data = [];
            if (viewModel.noTransaction) {
                this.view.flxSegment.isVisible = false;
                this.view.flxNoRecords.isVisible = true;
                this.view.rtxNoRecords.text = kony.i18n.getLocalizedString("i18n.PFM.YouHaveNotDoneAnyTransactions");
                CommonUtilities.setText(this.view.lblAmountDeducted, kony.i18n.getLocalizedString("i18n.common.NA"), CommonUtilities.getaccessibilityConfig());
            } else {
                this.setViewTransactionsPagination(viewModel.data, viewModel.config);
                this.sortFlex();
                FormControllerUtility.updateSortFlex(this.viewTransactionsSortMap, viewModel.config);
				this.setAccessibilityConfigForSorting(viewModel.config);
                for (const record of viewModel.data) {
                    data.push({
                        "lblAmount": {
                            "text": CommonUtilities.formatCurrencyWithCommas(Math.abs(record.amount)),
                           // "accessibilityConfig": {
                            //    "a11yLabel": CommonUtilities.formatCurrencyWithCommas(Math.abs(record.amount)),
                          //  }
                        },
                        "lblDate": {
                            "text": record.transactionDate.slice(),
                            "accessibilityConfig": {
                                "a11yLabel": record.transactionDate.slice(),
                            }
                        },
						
						 "lblFrom1": {
                            "text": (record.fromAccountName || record.fromNickName) + "..." + record.fromAccountNumber.slice(-4),
						 },
						
                        "lblFrom": {
                            "text": (record.fromAccountName || record.fromNickName) + "..." + record.fromAccountNumber.slice(-4),
                            "left": configurationManager.isCombinedUser === "true" && !(kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? "25dp" : "6dp",
                           // "accessibilityConfig": {
                           //     "a11yLabel": (record.fromAccountName || record.fromNickName) + "..." + record.fromAccountNumber.slice(-4),
                          //  }
                        },
						
						"lblFrom1": (this.view.flxlbldatemod.text)  + " " + (record.fromAccountName || record.fromNickName) + "..." + record.fromAccountNumber.slice(-4),
						
						"lblStatus1": {
                            "text": record.statusDescription,
						},
                        "lblStatus": {
                            "text": record.statusDescription,
                           // "accessibilityConfig": {
                           //     "a11yLabel": record.statusDescription,
                         //   }
                        },
						
						"lblStatus1": (this.view.imgamountmod.text)  + " " + (record.statusDescription),
						
						"lblpaiddate1": {
                            "text": CommonUtilities.getFrontendDateString(record.transactionDate),
						},
											
                        "lblpaiddate": {
                            "text": CommonUtilities.getFrontendDateString(record.transactionDate),
                          //  "accessibilityConfig": {
                              //  "a11yLabel": CommonUtilities.getFrontendDateString(record.transactionDate),
                          //  }
                        },
						"lblpaiddate1": (this.view.flxfromaccountlblmod.text)  + " " + CommonUtilities.getFrontendDateString(record.transactionDate),
						
                        "lblAmount1": {
                            "text": CommonUtilities.formatCurrencyWithCommas(Math.abs(record.amount)),
                         //   "accessibilityConfig": {
                             //   "a11yLabel": CommonUtilities.formatCurrencyWithCommas(Math.abs(record.amount)),
                          //  }
                        },
						
						"lblAmount1":(this.view.CopylblAmount0c7d3995df3ba4f.text) + " " + CommonUtilities.formatCurrencyWithCommas(Math.abs(record.amount)),
                        "lblAmountHeader": {
                            "text": "Running Balance",
                            "accessibilityConfig": {
                                "a11yLabel": "Running Balance",
                            }
                        },
                        "lblSeparator": {
                            "text": "",
                            "accessibilityConfig": {
                            }
                        },
                        "lblFromHeader": {
                            "text": "From:",
                            "accessibilityConfig": {
                                "a11yLabel": "From",
                            }
                        },
                        "imgIcon": {
                            //"isVisible": configurationManager.isCombinedUser==="true" ? true :false,
                            "isVisible": this.profileAccess === "both" ? true : false,
                            "text": this.displayIcon(record.fromAccountNumber),
                        },
                        "flxIcon": {
                            //"isVisible": configurationManager.isCombinedUser==="true"? true : false
                            "isVisible": this.profileAccess === "both" ? true : false
                        },
                        "template": (kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) ? "flxFastTransferActivityMobile" : "flxFastTransferActivity",
                    });
                }
                var amountDeducted = (viewModel.data[0].totalAmount !== null) ? viewModel.data[0].totalAmount : viewModel.data[0].amountTransferedTillNow;
                CommonUtilities.setText(this.view.lblAmountDeducted, CommonUtilities.formatCurrencyWithCommas(amountDeducted), CommonUtilities.getaccessibilityConfig());
                this.view.segTransferActivity.widgetDataMap = widgetDataMap;
                this.view.segTransferActivity.setData(data);
                if (count !== 0) {
                    if (viewModel.config.sortBy === "fromAccountName") {
                        this.view.flxdatemod.setActive(true);
                    }
                    else {
                        this.view.flxfromaccountmod.setActive(true);
                    }
                }
                count += 1;
                this.view.flxSegment.isVisible = true;
                this.view.flxNoRecords.isVisible = false;
            }
            this.view.forceLayout();
        },
        displayIcon: function (accountNumber) {
            const accounts = applicationManager.getAccountManager().getInternalAccounts() || [];
            for (const account of accounts) {
                if (account.accountID === accountNumber) return account.isBusinessAccount === "true" ? "r" : "s";
            }
            return "s";
        },
		setAccessibilityConfigForSorting: function () {
            var scope = this, 
			widgetMapping = {
                "fromAccountName": {
                    "widgetName": "flxdatemod",
                    "uiMapping": this.view.flxlbldatemod.text
                },
                "transactionDate": {
                    "widgetName": "flxfromaccountmod",
                    "uiMapping": this.view.flxfromaccountlblmod.text
                },
            };
               this.viewTransactionsSortMap.forEach((element) => {
                if (element.imageFlx.src === "sorting.png") {
                    scope.view[widgetMapping[element.name].widgetName].accessibilityConfig = {
                        "a11yLabel": `${widgetMapping[element.name].uiMapping} column. No sort applied. Click to sort in Ascending order`,
                        "a11yARIA": {
                            "role": "button",
                            "tabindex": 0
                        }
                    }
                }
                else if (element.imageFlx.src === "sorting_previous.png") {
                    scope.view[widgetMapping[element.name].widgetName].accessibilityConfig = {
                        "a11yLabel": `${widgetMapping[element.name].uiMapping} column. Sorted in Ascending order. Click to Sort in Descending order`,
                        "a11yARIA": {
                            "role": "button",
                            "tabindex": 0
                        }
                    }
                }
                else if (element.imageFlx.src === "sorting_next.png") {
                    scope.view[widgetMapping[element.name].widgetName].accessibilityConfig = {
                        "a11yLabel": `${widgetMapping[element.name].uiMapping} column. Sorted in Descending order. Click to Sort in Ascending order`,
                        "a11yARIA": {
                            "role": "button",
                            "tabindex": 0
                        }
                    }
                }
            });
			
            },
        /**Configure Sort Flex
         * @param  {string} tab Type of tab and shows sort flex
         */
        sortFlex: function (config) {
            FormControllerUtility.setSortingHandlers(this.viewTransactionsSortMap, this.onViewTransactionsSortClickHandler, this);
            CommonUtilities.Sorting.updateSortFlex(this.viewTransactionsSortMap, config);
        },
        /** On Past Transactions Sort click handler.
         * @param  {object} event object
         * @param  {object} data New Sorting Data
         */
        onViewTransactionsSortClickHandler: function (event, data) {
            if (this.fastTransferPC.isP2PActivityView()) {
                this.fastTransferPC.showSelectedP2PTransactions(null, data);
            } else {
                this.fastTransferPC.showSelectedAccountTransactions(null, data);
            }
        },
        /**
         * Configure Paginations for View Transfers
         * @param {object} config configuration to show pagination
         */
        setViewTransactionsPagination: function (transactions, config) {
            this.setPaginationPreviousView(config);
            this.setPaginationNextView();
            this.view.tablePagination.lblPagination.text = (config.offset + 1) + "-" + (config.offset + transactions.length) + " " + kony.i18n.getLocalizedString("i18n.common.transactions");
            if (transactions.length < ViewConstants.MAGIC_NUMBERS.LIMIT) {
                this.view.tablePagination.flxPaginationNext.onClick = function () { };
                this.view.tablePagination.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_INACTIVE;
                this.view.tablePagination.flxPaginationNext.accessibilityConfig = {
                    a11yLabel: "Next page",
                    a11yARIA: {
                        tabindex: -1,
                        role: "button"
                    }
                }
            }
        },
        /**Configure pagination for previous button for Past transfers
         * @param {object} config pagination values
         */
        setPaginationPreviousView: function (config) {
            var scopeObj = this;
            if (config.offset <= 0) {
                this.view.tablePagination.flxPaginationPrevious.onClick = function () { };
                this.view.tablePagination.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_INACTIVE;
                this.view.tablePagination.flxPaginationPrevious.accessibilityConfig = {
                    a11yLabel: "Previous page",
                    a11yARIA: {
                        tabindex: -1,
                        role: "button"
                    }
                }
            } else {
                this.view.tablePagination.flxPaginationPrevious.onClick = function () {
                    scopeObj.getPreviousViewTransactions(config);
                };
                this.view.tablePagination.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_ACTIVE;
                this.view.tablePagination.flxPaginationPrevious.accessibilityConfig = {
                    a11yLabel: "Previous page",
                    a11yARIA: {
                        tabindex: 0,
                        role: "button"
                    }
                }
            }
        },
        /**
         * Configure Pagination for Next Button Of Past Transfers
         */
        setPaginationNextView: function () {
            var scopeObj = this;
            this.view.tablePagination.flxPaginationNext.onClick = function () {
                scopeObj.getNextViewTransactions();
            };
            this.view.tablePagination.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_ACTIVE;
            this.view.tablePagination.flxPaginationNext.accessibilityConfig = {
                a11yLabel: "Next page",
                a11yARIA: {
                    tabindex: 0,
                    role: "button"
                }
            }
        },
        /**Called when Pagination is triggered for next Past Tranctions
         */
        getNextViewTransactions: function () {
            this.view.tablePagination.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_ACTIVE;
            this.fastTransferPC.fetchNextViewTransactions();
        },
        /**Called when previos button is triggered from pagination
         * @returns {object} config configuration values for pagination
         */
        getPreviousViewTransactions: function (config) {
            if (config.offset >= ViewConstants.MAGIC_NUMBERS.LIMIT) {
                this.fastTransferPC.fetchPreviousViewTransactions();
            } else {
                this.view.tablePagination.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_INACTIVE;
                this.view.tablePagination.flxPaginationPrevious.accessibilityConfig = {
                    a11yLabel: "Previous page",
                    a11yARIA: {
                        tabindex: -1,
                        role: "button"
                    }
                }
            }
        },
        AdjustScreen: function () {
            var mainheight = 0;
            var screenheight = kony.os.deviceInfo().screenHeight;
            mainheight = this.view.customheader.info.frame.height + this.view.flxMainContainer.info.frame.height;
            var diff = screenheight - mainheight;
            if (mainheight < screenheight) {
                diff = diff - this.view.flxFooter.info.frame.height;
                if (diff > 0) {
                    this.view.flxFooter.top = mainheight + diff + ViewConstants.POSITIONAL_VALUES.DP;
                } else {
                    this.view.flxFooter.top = mainheight + ViewConstants.POSITIONAL_VALUES.DP;
                }
            } else {
                this.view.flxFooter.top = mainheight + ViewConstants.POSITIONAL_VALUES.DP;
            }
            this.view.forceLayout();
        },
        setRecipientActivity: function () { }
    };
});