define(["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants"], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
    var orientationHandler = new OrientationHandler();
     
    return {
        closedTemplate: "flxBulkWireAck",
        selectedTemplate: "flxBulkWireAckSelected",
        execution_ID: "",
        tab: "",
        counts: {},
        checkingAccounts: [],
        fileDetails: {},
        isFile: true,
        updateFormUI: function(uiData) {
            if (uiData) {
                if (uiData.serverError) {
                    this.showServerError(uiData.serverError);
                } else {
                    this.showServerError(false);
                    if (uiData.showLoadingIndicator) {
                        if (uiData.showLoadingIndicator.status === true) {
                            FormControllerUtility.showProgressBar(this.view)
                        } else {
                            FormControllerUtility.hideProgressBar(this.view)
                        }
                    }
                    if (uiData.fileDetails) {
                        this.setFileDetails(uiData.fileDetails);
                        this.fileDetails = uiData.fileDetails;
                    }
                    if (uiData.countResponse) {
                        this.counts = uiData.countResponse;
                    }
                    if (uiData.checkingAccounts) {
                        this.checkingAccounts = uiData.checkingAccounts;
                    }
                    if (uiData.notSearchFlow) {
                        this.clearSearchText();
                    }
                    if (uiData.acknowledgment) {
                        this.setAcknowledgmentUI(true);
                        this.setTransactionsData(uiData.acknowledgment);
                    }
                    if (uiData.activity) {
                        this.setAcknowledgmentUI(false);
                        this.setTransactionsData(uiData.activity);
                    }
                    if (uiData.searchBulkWireTransactions) {
                        this.showsearchBulkWireTransactions(uiData.searchBulkWireTransactions);
                    }
                }
            }
        },

        onBreakpointChange: function(form, width) {
            var scope = this;
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            this.view.CustomPopupCancel.onBreakpointChangeComponent(scope.view.CustomPopupCancel, width);
            this.view.deletePopup.onBreakpointChangeComponent(scope.view.deletePopup, width);
            FormControllerUtility.setupFormOnTouchEnd(width);
             
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
        },

        /**
         * Method to show server error
         * @param {Boolean} status true/false
         */
        showServerError: function(status) {
            if (status === false) {
                this.view.flxMakeTransferError.setVisibility(false);
            } else {
                this.view.rtxError.text = status;
                this.view.rtxError.toolTip = status;
                this.view.flxMakeTransferError.setVisibility(true);
                this.view.flxMakeTransferError.setFocus(true);
                FormControllerUtility.hideProgressBar(this.view);
            }
            this.view.forceLayout();
        },


        /**
         * Method to display  transactions.
         */
        showTransactions: function() {
            this.view.flxNoTransactions.setVisibility(false);
            this.view.flxSegment.setVisibility(true);
            var currBreakpoint = kony.application.getCurrentBreakpoint();
            if (currBreakpoint === 640 || orientationHandler.isMobile) {
                this.view.flxSort.setVisibility(false);
            } else
                this.view.flxSort.setVisibility(true);
            this.view.forceLayout();
        },
        /**
         * Method to display no transactions ui.
         */
        showNoTransactions: function() {
            this.view.flxNoTransactions.setVisibility(true);
            this.view.flxSegment.setVisibility(false);
            this.view.flxSort.setVisibility(false);
            this.view.forceLayout();
        },

        /**
         * @param {Boolean} flag- flag which represents whether it is domestic or international
         * Method to set ui and segment mapping
         */
        setAcknowledgmentUI: function(flag) {
            this.isAcknowledgment = flag;
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            CommonUtilities.setText(this.view.lblHeading, kony.i18n.getLocalizedString("i18n.bulkWire.acknowledgmentHeader"), accessibilityConfig);
            if (flag == true) {
                this.view.customheadernew.activateMenu("Wire Transfer", "Make Bulk Transfer");
                this.view.lblHeading.text = kony.i18n.getLocalizedString("i18n.bulkWire.acknowledgmentHeader");
                this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.bulkWire.acknowledgmentHeader");
                this.view.lblHeading.toolTip = kony.i18n.getLocalizedString("i18n.bulkWire.acknowledgmentHeader");
                CommonUtilities.setText(this.view.lblHeading, kony.i18n.getLocalizedString("i18n.bulkWire.acknowledgmentHeader"), accessibilityConfig);
                this.view.flxMakeTransferAck.setVisibility(true);
                this.view.btnMakeAnother.setVisibility(true);
                this.view.btnViewActivity.setVisibility(true);
                this.view.btnNewTransfer.setVisibility(false);
                this.view.btnFailedTrans.setVisibility(true);
            } else {
                this.view.customheadernew.activateMenu("Wire Transfer", "Bulk Transfer Files");
                this.view.lblHeading.text = kony.i18n.getLocalizedString("i18n.bulkWire.activityHeader");
                this.view.lblHeading.toolTip = kony.i18n.getLocalizedString("i18n.bulkWire.activityHeader");
                this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.bulkWire.activityHeader");
                CommonUtilities.setText(this.view.lblHeading, kony.i18n.getLocalizedString("i18n.bulkWire.activityHeader"), accessibilityConfig);
                this.view.flxMakeTransferAck.setVisibility(false);
                this.view.btnMakeAnother.setVisibility(false);
                this.view.btnViewActivity.setVisibility(false);
                this.view.btnNewTransfer.setVisibility(true);
                this.view.btnFailedTrans.setVisibility(true);
            }

        },
        /**
         * Init Method 
         */

        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.bulkwirefilesPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"}).presentationController;
            this.view.flxSearch.setVisibility(true);
            this.view.flxSearch.Search.imgCross.setVisibility(true);
            this.view.flxSearch.Search.btnConfirm.onClick = this.onSearchBtnClick.bind(this);
            this.view.flxSearch.Search.flxClearBtn.onClick = this.onSearchClearBtnClick.bind(this);
            this.view.flxSearch.Search.txtSearch.onKeyUp = this.onTxtSearchKeyUp.bind(this);
            this.view.lblSortRecipient.toolTip = kony.i18n.getLocalizedString("i18n.PayPerson.recipientName");
            this.view.lblSortBankName.toolTip = kony.i18n.getLocalizedString("i18n.transfers.fromAccount");
            this.view.lblSortFromAccountNumber.toolTip = kony.i18n.getLocalizedString("i18n.konybb.common.referenceId");
            this.view.lblSortType.toolTip = kony.i18n.getLocalizedString("i18n.transfers.amountlabel");
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            this.view.btnAllTransactions.onClick = this.onTabClick;
            this.view.btnFailedTrans.onClick = this.onTabClick;
            this.view.btnPendingTrans.onClick = this.onTabClick;
            this.view.btnSuccessTrans.onClick = this.onTabClick;
            CommonUtilities.setText(this.view.lblSortRecipient, kony.i18n.getLocalizedString("i18n.PayPerson.recipientName"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblSortBankName, kony.i18n.getLocalizedString("i18n.transfers.fromAccount"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblSortFromAccountNumber, kony.i18n.getLocalizedString("i18n.konybb.common.referenceId"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblSortType, kony.i18n.getLocalizedString("i18n.transfers.amountlabel"), accessibilityConfig);
            this.transactionsSortMap = [{
                name: 'transactionId',
                imageFlx: this.view.imgSortFromAccountNumber,
                clickContainer: this.view.flxReferenceFromAccountNumber
            }, {
                name: 'amount',
                imageFlx: this.view.imgSortType,
                clickContainer: this.view.flxSortAmount
            }, {
                name: 'payeeName',
                imageFlx: this.view.imgSortRecipient,
                clickContainer: this.view.flxSortRecipient
            }];
            this.setSortHandlers(this.transactionsSortMap, this.onbulkWireActivitySortClickHandler, this);

        },
        /**
         * post show Method 
         */
        postShow: function() {
            this.view.customheadernew.forceCloseHamburger();
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            applicationManager.getNavigationManager().applyUpdates(this);
        },
        /**
         * pre show Method 
         */
        preShow: function() {
            this.view.customheadernew.setFocus(true);
            this.view.customheadernew.flxContextualMenu.setVisibility(false);
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain']);
        },
        /**
         * *@param {Object} fileData- Data containing file 
         *  Method to set the file related data
         */

        setFileDetails: function(fileData) {
            var self = this;
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            CommonUtilities.setText(this.view.lblDateTitle, kony.i18n.getLocalizedString("i18n.bulkWire.transactionDate"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblUserTitle, kony.i18n.getLocalizedString("i18n.bulkWire.transactionsInitiated"), accessibilityConfig);
            if (fileData.bulkWireName) {
                CommonUtilities.setText(this.view.lblFileName, fileData.bulkWireName, accessibilityConfig);
                CommonUtilities.setText(this.view.lblDate, fileData.lastExecutedOn, accessibilityConfig);
                CommonUtilities.setText(this.view.lblUser, fileData.firstname + " " + fileData.lastname, accessibilityConfig);
                this.view.lblFileName.text = CommonUtilities.truncateStringWithGivenLength(fileData.bulkWireName, 25);
                this.view.lblFileName.toolTip = fileData.bulkWireName;
                this.view.lblDate.toolTip = fileData.lastExecutedOn;
                this.view.lblUser.toolTip = fileData.firstname + " " + fileData.lastname;
                this.view.lblFileNameValue.text = CommonUtilities.truncateStringWithGivenLength(fileData.bulkWireName, 25);
                this.view.lblFileNameValue.toolTip = fileData.bulkWireName;
                this.view.btnMakeAnother.onClick = this.makeAnotherBulkTransfer.bind(this);
                this.view.btnViewActivity.onClick = this.viewBulkActivity.bind(this, fileData.bulkWireName);
                this.bulkWireFileID = fileData.bulkWireCategory == "Files" ? fileData.bulkWireID : "";
                this.bulkWireTemplateID = fileData.bulkWireCategory == "Templates" ? fileData.bulkWireID : "";
            } else {
                CommonUtilities.setText(this.view.lblFileName, fileData.fileName, accessibilityConfig);
                CommonUtilities.setText(this.view.lblDate, fileData.initiatedOn, accessibilityConfig);
                CommonUtilities.setText(this.view.lblUser, fileData.initiatedBy, accessibilityConfig);
                this.view.lblFileName.text = CommonUtilities.truncateStringWithGivenLength(fileData.fileName, 25);
                this.view.lblFileName.toolTip = fileData.fileName;
                this.view.lblDate.toolTip = fileData.initiatedOn;
                this.view.lblUser.toolTip = fileData.initiatedBy;
                this.view.lblFileNameValue.text = CommonUtilities.truncateStringWithGivenLength(fileData.fileName, 25);
                this.view.lblFileNameValue.toolTip = fileData.fileName;
                this.view.btnMakeAnother.onClick = this.makeAnotherBulkTransfer.bind(this);
                this.view.btnViewActivity.onClick = this.viewBulkActivity.bind(this, fileData.fileName);
                this.bulkWireFileID = fileData.bulkWireFileID != "" ? fileData.bulkWireFileID : "";
                this.bulkWireTemplateID = fileData.bulkWireTemplateID != "" ? fileData.bulkWireTemplateID : "";
                fileData.bulkWireCategory = (fileData.bulkWireFileID) ? "Files" : "Templates";
            }
            this.view.btnNewTransfer.onClick = this.backToBWDashboard.bind(this);
            if (fileData.bulkWireCategory == "Files") {
                CommonUtilities.setText(this.view.lblFileNameTitle, kony.i18n.getLocalizedString("i18n.bulkWire.fileNameTitle"), accessibilityConfig);
                this.view.lblFileNameTitle.toolTip = kony.i18n.getLocalizedString("i18n.bulkWire.fileNameTitle");
                this.isFile = true;
            } else {
                CommonUtilities.setText(this.view.lblFileNameTitle, kony.i18n.getLocalizedString("i18n.bulkWire.templateName"), accessibilityConfig);
                this.view.lblFileNameTitle.toolTip = kony.i18n.getLocalizedString("i18n.bulkWire.templateName");
                this.isFile = false;
            }
        },

        /**
         * @param {String} fileID - fileID 
         * @param  {String} filename- name of the file
         * Method to navigate to bulk activity for the given fileID
         */
        viewBulkActivity: function(filename) {
            FormControllerUtility.showProgressBar(this.view);
            var scopeObj = this;
            if (this.isFile) {
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"}).presentationController.showBulkWireTransactions({
                    "bulkWireFileID": scopeObj.bulkWireFileID,
                    "bulkWireFileName": filename
                }, true);
            } else {
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"}).presentationController.showBulkWireTransactions({
                    "bulkWireTemplateID": scopeObj.bulkWireTemplateID,
                    "bulkWireTemplateName": filename
                }, false);
            }
        },

        /**
         * @param  {String} fileID- fileID 
         * @param  {String} filename- name of the file 
         * Method to navigate to create another bulk transfer for the given fileID
         */
        makeAnotherBulkTransfer: function() {
            FormControllerUtility.showProgressBar(this.view);
            var params = {};
            if (this.isFile) {
                params = {
                    "formName": "frmMakeBulkTransfer",
                    "bulkWireCategoryFilter": OLBConstants.BULKWIRE_CATEGORY_FILTER.FILES
                };
            } else {
                params = {
                    "formName": "frmMakeBulkTransferTemplate",
                    "bulkWireCategoryFilter": OLBConstants.BULKWIRE_CATEGORY_FILTER.TEMPLATES
                };
            }
            this.bulkwirefilesPresentationController.showBulkwirefiles(params);
        },

        /**
         * Method to navigate to create a new  bulk transfer
         */
        backToBWDashboard: function() {
            FormControllerUtility.showProgressBar(this.view);
            var params = {
                "formName": "frmBulkTransferFiles",
                "bulkWireCategoryFilter": "All"
            };
            this.bulkwirefilesPresentationController.showBulkwirefiles(params);
        },
        /**
         * Clear the search text box
         */
        clearSearchText: function() {
            this.prevSearchText = '';
            this.view.flxSearch.Search.txtSearch.text = '';
            this.disableSearch();
            this.view.forceLayout();
        },


        /** On Search Text Key Up
         * @param  {object} event object
         */
        onTxtSearchKeyUp: function(event) {
            var scopeObj = this;
            var searchKeyword = scopeObj.view.flxSearch.Search.txtSearch.text.trim();
            if (searchKeyword.length > 0) {
                scopeObj.view.flxSearch.Search.txtSearch.onDone = scopeObj.onSearchBtnClick.bind(scopeObj);
                scopeObj.enableSearch();
            } else {
                scopeObj.view.flxSearch.Search.txtSearch.onDone = scopeObj.onSearchBtnClick.bind(scopeObj);
                scopeObj.disableSearch();
            }
            this.view.flxSearch.forceLayout();
        },
        /** On Search is complete show external accounts
         * @param  {array} viewModel Array of recipients
         */
        showsearchBulkWireTransactions: function(viewModel) {
            var scopeObj = this;
            if (viewModel.error) {
                this.showServerError(viewModel.error);
                return;
            }
            if (viewModel.transactionsData.length === 0) {
                scopeObj.view.flxSort.setVisibility(false);
                scopeObj.view.segmentTransfers.setVisibility(false);
                scopeObj.view.flxNoTransactions.setVisibility(true);
                scopeObj.view.forceLayout();
                return;
            }
            scopeObj.setTransactionsData(viewModel.transactionsData, viewModel.searchInputs, {}, true);
        },

        /** Disables Search Button
         */
        disableSearch: function() {
            this.view.flxSearch.Search.flxClearBtn.setVisibility(false);
        },
        /** Enable Search Button
         */
        enableSearch: function() {
            this.view.flxSearch.Search.flxClearBtn.setVisibility(true);
        },
        /** clears the text on search textbox
         */
        onSearchClearBtnClick: function() {
            var scopeObj = this;
            FormControllerUtility.showProgressBar(this.view);
            this.disableSearch();
            var params = {
                'executionID': this.execution_ID,
                'filterBy': this.tab == ViewConstants.BULKWIRE_STATUS_TYPES.All ? "" : this.tab,
                'sortBy': "",
                'order': "",
                'searchString': ""
            };
            var context = {
                "formName": scopeObj.fetchFormFromTab(),
                "isAcknowledgment": this.isAcknowledgment,
                "counts": this.counts,
                "fileDetails": this.fileDetails
            };
            if (this.isFile) {
                this.bulkwirefilesPresentationController.fetchFileTransactionActivityByExecutionID(params, context);
            } else {
                this.bulkwirefilesPresentationController.getBWTTransactionActivityByExecutionID(params, context);
            }
            this.prevSearchText = '';
            this.view.flxSearch.Search.txtSearch.text = '';
            this.view.forceLayout();
        },

        /** Searches for a payee */
        onSearchBtnClick: function() {
            var scopeObj = this;
            var searchKeyword = scopeObj.view.flxSearch.Search.txtSearch.text.trim();
            if (scopeObj.prevSearchText !== searchKeyword) {
                var params = {
                    'executionID': this.execution_ID,
                    'searchString': searchKeyword,
                    'filterBy': this.tab == ViewConstants.BULKWIRE_STATUS_TYPES.All ? "" : this.tab,
                    'sortBy': "",
                    'order': ""
                };
                var context = {
                    "formName": scopeObj.fetchFormFromTab(),
                    "isAcknowledgment": this.isAcknowledgment,
                    "counts": this.counts,
                    "fileDetails": this.fileDetails
                };
                FormControllerUtility.showProgressBar(this.view);
                if (this.isFile) {
                    this.bulkwirefilesPresentationController.fetchFileTransactionActivityByExecutionID(params, context);
                } else {
                    this.bulkwirefilesPresentationController.getBWTTransactionActivityByExecutionID(params, context);
                }
                scopeObj.prevSearchText = searchKeyword;
            }
        },
        fetchFormFromTab: function() {
            switch (this.tab) {
                case ViewConstants.BULKWIRE_STATUS_TYPES.Pending:
                    return "frmBulkWireActivityPending";
                case ViewConstants.BULKWIRE_STATUS_TYPES.Failed:
                    return "frmBulkWireActivityFailed";
                case ViewConstants.BULKWIRE_STATUS_TYPES.Executed:
                    return "frmBulkWireActivitySuccess";
                case ViewConstants.BULKWIRE_STATUS_TYPES.All:
                    return "frmBulkWireActivityAll";
            }
        },
        /**
         * on click Method of any tabs
         */
        onTabClick: function(event) {
            var scopeObj = this;
            this.tab = scopeObj.fetchStatusFilterByTab(event.id);
            var params = {
                'executionID': this.execution_ID,
                'filterBy': this.tab == ViewConstants.BULKWIRE_STATUS_TYPES.All ? "" : this.tab,
                'sortBy': "",
                'order': "",
                'searchString': ""
            };
            var context = {
                "formName": scopeObj.fetchFormFromTab(),
                "isAcknowledgment": this.isAcknowledgment,
                "counts": this.counts,
                "fileDetails": this.fileDetails
            };
            FormControllerUtility.showProgressBar(this.view);
            if (this.isFile) {
                this.bulkwirefilesPresentationController.fetchFileTransactionActivityByExecutionID(params, context);
            } else {
                this.bulkwirefilesPresentationController.getBWTTransactionActivityByExecutionID(params, context);
            }
        },
        /**
         * Method to set transactions data   
         */
        fetchStatusFilterByTab: function(currId) {
            if (currId === "btnPendingTrans" || currId === "frmBulkWireActivityPending")
                return ViewConstants.BULKWIRE_STATUS_TYPES.Pending;
            if (currId === "btnFailedTrans" || currId === "frmBulkWireActivityFailed")
                return ViewConstants.BULKWIRE_STATUS_TYPES.Failed;
            if (currId === "btnSuccessTrans" || currId === "frmBulkWireActivitySuccess")
                return ViewConstants.BULKWIRE_STATUS_TYPES.Executed;
            if (currId === "btnAllTransactions" || currId === "frmBulkWireActivityAll")
                return ViewConstants.BULKWIRE_STATUS_TYPES.All;
        },
        setSortHandlers: function(sortMap, clickHandler, scope) {
            var scopeObj = this;
            sortMap.forEach(function(item) {
                item.clickContainer.onClick = clickHandler.bind(scope || scopeObj, event, {
                    'sortBy': item.name,
                    'imageFlx': item.imageFlx
                });
            });
        },
        /** On bulk wire file  Sort click handler.
         * @param  {object} event object
         * @param  {object} data New Sorting Data
         */
        onbulkWireActivitySortClickHandler: function(event, data) {
            var scopeObj = this;
            scopeObj.first = 0;
            var img = data.imageFlx.src;
            img = (img === "sorting_next.png") ? "sorting_previous.png" : "sorting_next.png";
            var params = {
                'executionID': this.execution_ID,
                'sortBy': data.sortBy ? data.sortBy : "",
                'order': (img === "sorting_next.png") ? OLBConstants.DESCENDING_KEY : OLBConstants.ASCENDING_KEY,
                'searchString': data.searchString ? data.searchString : "",
                'filterBy': this.tab == ViewConstants.BULKWIRE_STATUS_TYPES.All ? "" : this.tab
            };
            var context = {
                "formName": scopeObj.fetchFormFromTab(),
                "isAcknowledgment": this.isAcknowledgment,
                "counts": this.counts,
                "fileDetails": this.fileDetails
            };
            FormControllerUtility.showProgressBar(this.view);
            if (this.isFile) {
                this.bulkwirefilesPresentationController.fetchFileTransactionActivityByExecutionID(params, context);
            } else {
                this.bulkwirefilesPresentationController.getBWTTransactionActivityByExecutionID(params, context);
            }
        },

        /**
         * @param  {Object} transactionsData - transactions Data 
         * Method to set transactions data   
         */
        setTransactionsData: function(transactions) {
            var id = kony.application.getCurrentForm().id;
            this.tab = this.fetchStatusFilterByTab(id);
            var currBreakpoint = kony.application.getCurrentBreakpoint();
            var transactionsData = transactions.BulkWireExecutionDetails ? transactions.BulkWireExecutionDetails[0] : (transactions.BulkWireFileExecutionDetails ? transactions.BulkWireFileExecutionDetails[0] : transactions.BulkWireTemplateExecutionDetails[0]);
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            CommonUtilities.setText(this.view.btnAllTransactions, kony.i18n.getLocalizedString("i18n.accounts.allTransactions"), accessibilityConfig);
            CommonUtilities.setText(this.view.btnFailedTrans, kony.i18n.getLocalizedString("i18n.bulkWire.failedTransactions"), accessibilityConfig);
            CommonUtilities.setText(this.view.btnSuccessTrans, kony.i18n.getLocalizedString("i18n.bulkWire.SuccessfulTransactions"), accessibilityConfig);
            CommonUtilities.setText(this.view.btnPendingTrans, kony.i18n.getLocalizedString("i18n.bulkWire.pendingTransactions"), accessibilityConfig);
            this.view.btnAllTransactions.text = kony.i18n.getLocalizedString("i18n.accounts.allTransactions") + " (" + this.counts.totalCount + ")";
            this.view.btnAllTransactions.toolTip = kony.i18n.getLocalizedString("i18n.accounts.allTransactions") + " (" + this.counts.totalCount + ")";
            this.view.btnFailedTrans.text = kony.i18n.getLocalizedString("i18n.bulkWire.failedTransactions") + " (" + this.counts.failedCount + ")";
            this.view.btnSuccessTrans.text = kony.i18n.getLocalizedString("i18n.bulkWire.SuccessfulTransactions") + " (" + this.counts.successCount + ")";
            this.view.btnPendingTrans.text = kony.i18n.getLocalizedString("i18n.bulkWire.pendingTransactions") + " (" + this.counts.pendingCount + ")";
            this.view.btnFailedTrans.toolTip = kony.i18n.getLocalizedString("i18n.bulkWire.failedTransactions") + " (" + this.counts.failedCount + ")";
            this.view.btnSuccessTrans.toolTip = kony.i18n.getLocalizedString("i18n.bulkWire.SuccessfulTransactions") + " (" + this.counts.successCount + ")";
            this.view.btnPendingTrans.toolTip = kony.i18n.getLocalizedString("i18n.bulkWire.pendingTransactions") + " (" + this.counts.pendingCount + ")";
            if (currBreakpoint === 640 || orientationHandler.isMobile) {
                this.view.btnSuccessTrans.text = kony.i18n.getLocalizedString("i18n.bulkWire.Successful") + " (" + this.counts.successCount + ")";
                this.view.btnPendingTrans.text = kony.i18n.getLocalizedString("i18n.accounts.pending") + " (" + this.counts.pendingCount + ")";
                this.view.btnSuccessTrans.toolTip = kony.i18n.getLocalizedString("i18n.bulkWire.Successful") + " (" + this.counts.successCount + ")";
                this.view.btnPendingTrans.toolTip = kony.i18n.getLocalizedString("i18n.accounts.pending") + " (" + this.counts.pendingCount + ")";
            }
            this.execution_ID = transactions.sortConfig.executionID;
            if (!transactionsData || (transactionsData.Domestic.length === 0 && transactionsData.International.length === 0)) {
                this.showNoTransactions();
            } else {
                var controller = this;
                if (currBreakpoint === 640 || orientationHandler.isMobile) {
                    this.closedTemplate = "flxBulkWireAckMobile";
                    this.selectedTemplate = "flxBulkWireAckSelectedMobile";
                } else {
                    this.closedTemplate = "flxBulkWireAck";
                    this.selectedTemplate = "flxBulkWireAckSelected";
                }
                var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
                var createSegmentSection = function(recipients, sectionHeaderText, isDomestic) {
                    return [{
                            "lblHeader": sectionHeaderText,
                            "lblSeparator": "."
                        },
                        recipients.map(controller.createRecipientSegmentModel.bind(this, isDomestic))
                    ];
                };
                for (const transaction of transactionsData.Domestic) {
                    if (transaction.status) {
                        transaction.status = {
                            "pending": ViewConstants.BULKWIRE_STATUS_TYPES.Pending,
                            "failed": ViewConstants.BULKWIRE_STATUS_TYPES.Failed,
                            "denied": ViewConstants.BULKWIRE_STATUS_TYPES.Denied,
                            "executed": ViewConstants.BULKWIRE_STATUS_TYPES.Executed,
                            "rejected": ViewConstants.BULKWIRE_STATUS_TYPES.Rejected
                        }[transaction.status.toLowerCase()] || transaction.status;
                    }
                }
                for (const transaction of transactionsData.International) {
                    if (transaction.status) {
                        transaction.status = {
                            "pending": ViewConstants.BULKWIRE_STATUS_TYPES.Pending,
                            "failed": ViewConstants.BULKWIRE_STATUS_TYPES.Failed,
                            "denied": ViewConstants.BULKWIRE_STATUS_TYPES.Denied,
                            "executed": ViewConstants.BULKWIRE_STATUS_TYPES.Executed,
                            "rejected": ViewConstants.BULKWIRE_STATUS_TYPES.Rejected
                        }[transaction.status.toLowerCase()] || transaction.status;
                    }
                }
                var domesticRecipientsSection = createSegmentSection(transactionsData.Domestic, {
                    "text": kony.i18n.getLocalizedString('i18n.bulkWires.domesticRecipientsHeader') + " (" + transactionsData.Domestic.length + ")",
                    "toolTip": kony.i18n.getLocalizedString('i18n.bulkWires.domesticRecipientsHeader') + " (" + transactionsData.Domestic.length + ")",
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString('i18n.bulkWires.domesticRecipientsHeader'),
                    }
                }, true);
                var internationalRecipientsSection = createSegmentSection(transactionsData.International, {
                    "text": kony.i18n.getLocalizedString('i18n.bulkWires.internationalRecipientsHeader') + " (" + transactionsData.International.length + ")",
                    "toolTip": kony.i18n.getLocalizedString('i18n.bulkWires.internationalRecipientsHeader') + " (" + transactionsData.International.length + ")",
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString('i18n.bulkWires.internationalRecipientsHeader'),
                    }
                }, false);
                this.view.segmentTransfers.widgetDataMap = {
                    "lbFromAccountValue": "lbFromAccountValue",
                    "lblRecipientTypeTitle": "lblRecipientTypeTitle",
                    "lblTransactionTypeValue": "lblTransactionTypeValue",
                    "lblBankAddressValue": "lblBankAddressValue",
                    "lblRecipientAddress": "lblRecipientAddress",
                    "lblAmountValue": "lblAmountValue",
                    "lblAmount": "lblAmount",
                    "lblDropdown": "lblDropdown",
                    "lblFrom": "lblFrom",
                    "flxFrom": "flxFrom",
                    "lblRecipient": "lblRecipient",
                    "lblReferenceID": "lblReferenceID",
                    "lblSeparator": "lblSeparator",
                    "lblAccNumber": "lblAccNumber",
                    "lblAccNumberValue": "lblAccNumberValue",
                    "lblBankAddress": "lblBankAddress",
                    "lblBankAddressTitle": "lblBankAddressTitle",
                    "lblBankName": "lblBankName",
                    "lblBankNameValue": "lblBankNameValue",
                    "lblCurrency": "lblCurrency",
                    "lblCurrencyValueOf": "lblCurrencyValueOf",
                    "lblIBAN": "lblIBAN",
                    "lblIBANValue": "lblIBANValue",
                    "lblIdentifier": "lblIdentifier",
                    "lblNoteTitle": "lblNoteTitle",
                    "lblNotesValue": "lblNotesValue",
                    "lblNote": "lblNote",
                    "lblNoteValue": "lblNoteValue",
                    "lblRecipientAddressTitle": "lblRecipientAddressTitle",
                    "lblRecipientAddressValue": "lblRecipientAddressValue",
                    "lblRecipientType": "lblRecipientType",
                    "lblRecipientTypeValue": "lblRecipientTypeValue",
                    "lblRowSeperator": "lblRowSeperator",
                    "lblSeparator2": "lblSeparator2",
                    "lblStatus": "lblStatus",
                    "lblSwiftCode": "lblSwiftCode",
                    "lblSwiftCodeValue": "lblSwiftCodeValue",
                    "lblTransactionType": "lblTransactionType",
                    "lblTransactionTypeTitle": "lblTransactionTypeTitle",
                    "flxSegment": "flxSegment",
                    "segBulkWireAckSelected": "segBulkWireAckSelected",
                    "segBulkWireAck": "segBulkWireAck",
                    "segBulkWireAckMobile": "segBulkWireAckMobile",
                    "segBulkWireAckSelectedMobile": "segBulkWireAckSelectedMobile",
                    "flxDropdown": "flxDropdown",
                    "lblHeader": "lblHeader",
                    "lblFromAccountNo": "lblFromAccountNo",
                    "flxIdentifier": "flxIdentifier",
                    "lblFromAccount": "lblFromAccount",
                    "lblBankValue": "lblBankValue"
                };
                if (transactionsData.Domestic.length === 0) {
                    this.view.segmentTransfers.setData([internationalRecipientsSection]);
                } else if (transactionsData.International.length === 0) {
                    this.view.segmentTransfers.setData([domesticRecipientsSection]);
                } else
                    this.view.segmentTransfers.setData([domesticRecipientsSection, internationalRecipientsSection]);
                FormControllerUtility.updateSortFlex(this.transactionsSortMap, transactions.sortConfig);
                this.showTransactions();
            }
            FormControllerUtility.hideProgressBar(this.view);
            this.AdjustScreen();
        },
        /**
         * @param  {Object} status - status of the transaction 
         * Method to set icon for the given status 
         */
        fetchIconForStatus: function(status) {
            switch (status) {
                case ViewConstants.BULKWIRE_STATUS_TYPES.Pending:
                    return ViewConstants.FONT_ICONS.PENDING;
                case ViewConstants.BULKWIRE_STATUS_TYPES.Failed:
                    return ViewConstants.FONT_ICONS.FAILED;
                case ViewConstants.BULKWIRE_STATUS_TYPES.Executed:
                    return ViewConstants.FONT_ICONS.EXECUTED;
                case ViewConstants.BULKWIRE_STATUS_TYPES.Denied:
                    return ViewConstants.FONT_ICONS.DENIED;
                case ViewConstants.BULKWIRE_STATUS_TYPES.Rejected:
                    return ViewConstants.FONT_ICONS.DENIED;
            }
        },

        /**
         * @param  {Object} status - status of the transaction 
         * Method to set skin for the given status 
         */
        fetchSkinForStatus: function(status) {
            switch (status) {
                case ViewConstants.BULKWIRE_STATUS_TYPES.Pending:
                    return ViewConstants.SKINS.PENDING;
                case ViewConstants.BULKWIRE_STATUS_TYPES.Failed:
                    return ViewConstants.SKINS.FAILED;
                case ViewConstants.BULKWIRE_STATUS_TYPES.Executed:
                    return ViewConstants.SKINS.EXECUTED;
                case ViewConstants.BULKWIRE_STATUS_TYPES.Denied:
                    return ViewConstants.SKINS.DENIED;
                case ViewConstants.BULKWIRE_STATUS_TYPES.Rejected:
                    return ViewConstants.SKINS.DENIED;
            }
        },

        /**
         * @param  {Boolean} isDomestic - field whether it is domestic or international
         * @param  {Object} recipientData - transaction's recipient data
         * Method to group transactiona nd recipient data and assigning the values
         * */
        createRecipientSegmentModel: function(isDomestic, recipientData) {
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            var scopeObj = this;
            return {
                "lblFromAccount": {
                    "text": kony.i18n.getLocalizedString("i18n.transfers.lblFrom"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.transfers.lblFrom"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.transfers.lblFrom"),
                    }
                },
                "lblRecipient": {
                    "text": recipientData.payeeName ? recipientData.payeeName : "-",
                    "toolTip": recipientData.payeeName ? CommonUtilities.changedataCase(recipientData.payeeName) : "-",
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.payeeName ? recipientData.payeeName : "-",
                    }
                },
                "lblSeparator2": "lblSeparator2",
                "lblSeparator": "lblSeparator",
                "lblBankNameValue": {
                    "text": recipientData.bankName ? recipientData.bankName : "-",
                    "toolTip": recipientData.bankName ? CommonUtilities.changedataCase(recipientData.bankName) : "-",
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.bankName ? recipientData.bankName : "-",
                    }
                },
                "lblBankValue": {
                    "text": recipientData.bankName ? recipientData.bankName : "-",
                    "toolTip": recipientData.bankName ? CommonUtilities.changedataCase(recipientData.bankName) : "-",
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.bankName ? recipientData.bankName : "-",
                    }
                },
                "lblAmount": {
                    "text": recipientData.amount ? CommonUtilities.formatCurrencyWithCommas(recipientData.amount, false, recipientData.payeeCurrency) : "-",
                    "toolTip": recipientData.amount ? CommonUtilities.formatCurrencyWithCommas(recipientData.amount, false, recipientData.payeeCurrency) : "-",
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.amount ? CommonUtilities.formatCurrencyWithCommas(recipientData.amount, false, recipientData.payeeCurrency) : "-",
                    }
                },

                "lblAmountValue": {
                    "text": recipientData.amount ? CommonUtilities.formatCurrencyWithCommas(recipientData.amount, false, recipientData.payeeCurrency) : "-",
                    "toolTip": recipientData.amount ? CommonUtilities.formatCurrencyWithCommas(recipientData.amount, false, recipientData.payeeCurrency) : "-",
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.amount ? CommonUtilities.formatCurrencyWithCommas(recipientData.amount, false, recipientData.payeeCurrency) : "-",
                    }
                },
                "lblStatus": {
                    "text": recipientData.status ? scopeObj.fetchIconForStatus(recipientData.status) : "-",
                    "toolTip": recipientData.status ? recipientData.status : "-",
                    "skin": recipientData.status ? scopeObj.fetchSkinForStatus(recipientData.status) : "-",
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.status ? recipientData.status : "-",
                    }
                },
                "lblFromAccountNo": {
                    "text": this.filterAccount(recipientData.fromAccountNumber) ? CommonUtilities.getAccountDisplayName(this.filterAccount(recipientData.fromAccountNumber)) : "-",
                    "toolTip": this.filterAccount(recipientData.fromAccountNumber) ? CommonUtilities.getAccountDisplayName(this.filterAccount(recipientData.fromAccountNumber)) : "-",
                    "accessibilityconfig": {
                        "a11yLabel": this.filterAccount(recipientData.fromAccountNumber) ? CommonUtilities.getAccountDisplayName(this.filterAccount(recipientData.fromAccountNumber)) : "-",
                    }
                },
                "lblReferenceID": {
                    "text": recipientData.transactionId ? recipientData.transactionId : "-",
                    "toolTip": recipientData.transactionId ? recipientData.transactionId : "-",
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.transactionId ? recipientData.transactionId : "-",
                    }
                },

                "lbFromAccountValue": {
                    "text": this.filterAccount(recipientData.fromAccountNumber) ? CommonUtilities.getAccountDisplayName(this.filterAccount(recipientData.fromAccountNumber)) : "-",
                    "toolTip": this.filterAccount(recipientData.fromAccountNumber) ? CommonUtilities.getAccountDisplayName(this.filterAccount(recipientData.fromAccountNumber)) : "-",
                    "accessibilityconfig": {
                        "a11yLabel": this.filterAccount(recipientData.fromAccountNumber) ? CommonUtilities.getAccountDisplayName(this.filterAccount(recipientData.fromAccountNumber)) : "-",
                    }
                },

                "lblAccNumber": {
                    "text": kony.i18n.getLocalizedString("i18n.common.accountNumber"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.common.accountNumber"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.common.accountNumber"),
                    }
                },
                "lblAccNumberValue": {
                    "text": recipientData.payeeAccountNumber ? recipientData.payeeAccountNumber : "-",
                    "toolTip": recipientData.payeeAccountNumber ? recipientData.payeeAccountNumber : "-",
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.payeeAccountNumber ? recipientData.payeeAccountNumber : "-",
                    }
                },
                "lblSwiftCode": {
                    "text": kony.i18n.getLocalizedString("i18n.accounts.swiftCode"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.accounts.swiftCode"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.accounts.swiftCode"),
                    }
                },
                "lblSwiftCodeValue": {
                    "text": recipientData.swiftCode ? recipientData.swiftCode : "-",
                    "toolTip": recipientData.swiftCode ? recipientData.swiftCode : "-",
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.swiftCode ? recipientData.swiftCode : "-",
                    }
                },
                "lblIBAN": {
                    "text": isDomestic == true ? kony.i18n.getLocalizedString("i18n.accounts.routingNumber") : kony.i18n.getLocalizedString("i18n.WireTransfer.IBAN"),
                    "toolTip": isDomestic == true ? kony.i18n.getLocalizedString("i18n.accounts.routingNumber") : kony.i18n.getLocalizedString("i18n.WireTransfer.IBAN"),
                    "accessibilityconfig": {
                        "a11yLabel": isDomestic == true ? kony.i18n.getLocalizedString("i18n.accounts.routingNumber") : kony.i18n.getLocalizedString("i18n.WireTransfer.IBAN"),
                    }
                },
                "lblIBANValue": {
                    "text": isDomestic == true ? (recipientData.routingNumber ? recipientData.routingNumber : "-") : (recipientData.internationalRoutingCode ? recipientData.internationalRoutingCode : "-"),
                    "toolTip": isDomestic == true ? (recipientData.routingNumber ? recipientData.routingNumber : "-") : (recipientData.internationalRoutingCode ? recipientData.internationalRoutingCode : "-"),
                    "accessibilityconfig": {
                        "a11yLabel": isDomestic == true ? (recipientData.routingNumber ? recipientData.routingNumber : "-") : (recipientData.internationalRoutingCode ? recipientData.internationalRoutingCode : "-"),
                    }
                },
                "lblRecipientTypeTitle": {
                    "text": kony.i18n.getLocalizedString("i18n.WireTransfer.recipientType"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.WireTransfer.recipientType"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.WireTransfer.recipientType"),
                    }
                },
                "lblRecipientType": {
                    "text": kony.i18n.getLocalizedString("i18n.WireTransfer.recipientType"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.WireTransfer.recipientType"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.WireTransfer.recipientType"),
                    }
                },
                "lblRecipientTypeValue": {
                    "text": recipientData.payeeType ? recipientData.payeeType : "-",
                    "toolTip": recipientData.payeeType ? CommonUtilities.changedataCase(recipientData.payeeType) : "-",
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.payeeType ? recipientData.payeeType : "-",
                    }
                },
                "lblTransactionType": {
                    "text": kony.i18n.getLocalizedString("i18n.accounts.TransactionType"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.accounts.TransactionType"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.accounts.TransactionType"),
                    }
                },
                "lblTransactionTypeTitle": {
                    "text": kony.i18n.getLocalizedString("i18n.accounts.TransactionType"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.accounts.TransactionType"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.accounts.TransactionType"),
                    }
                },
                "lblTransactionTypeValue": {
                    "text": recipientData.wireAccountType ? recipientData.wireAccountType : "-",
                    "toolTip": recipientData.wireAccountType ? CommonUtilities.changedataCase(recipientData.wireAccountType) : "-",
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.wireAccountType ? recipientData.wireAccountType : "-",
                    }
                },
                "lblRecipientAddress": {
                    "text": kony.i18n.getLocalizedString("i18n.WireTransfer.RecipientAddress"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.WireTransfer.RecipientAddress"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.WireTransfer.RecipientAddress"),
                    }
                },
                "lblRecipientAddressTitle": {
                    "text": kony.i18n.getLocalizedString("i18n.WireTransfer.RecipientAddress"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.WireTransfer.RecipientAddress"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.WireTransfer.RecipientAddress"),
                    }
                },
                "lblRecipientAddressValue": {
                    "text": (recipientData.payeeAddressLine1 ? recipientData.payeeAddressLine1 : "") + " " + (recipientData.payeeAddressLine2 ? ", " + recipientData.payeeAddressLine2 : "") + " " + (recipientData.cityName ? ", " + recipientData.cityName : "") + " " + (recipientData.state ? ", " + recipientData.state : "") + "" + (recipientData.zipCode ? ", " + recipientData.zipCode : "") + "" + (recipientData.country ? ", " + recipientData.country : ""),
                    "toolTip": CommonUtilities.changedataCase(recipientData.payeeAddressLine1 + " " + recipientData.payeeAddressLine2),
                    "accessibilityconfig": {
                        "a11yLabel": (recipientData.payeeAddressLine1 ? recipientData.payeeAddressLine1 : "") + " " + (recipientData.payeeAddressLine2 ? ", " + recipientData.payeeAddressLine2 : "") + " " + (recipientData.cityName ? ", " + recipientData.cityName : "") + " " + (recipientData.state ? ", " + recipientData.state : "") + "" + (recipientData.zipCode ? ", " + recipientData.zipCode : "") + "" + (recipientData.country ? ", " + recipientData.country : ""),
                    }
                },
                "lblBankAddressTitle": {
                    "text": kony.i18n.getLocalizedString("i18n.transfers.bankAddress"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.transfers.bankAddress"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.transfers.bankAddress"),
                    }
                },

                "lblBankAddress": {
                    "text": kony.i18n.getLocalizedString("i18n.transfers.bankAddress"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.transfers.bankAddress"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.transfers.bankAddress"),
                    }
                },
                "lblBankAddressValue": {
                    "text": (recipientData.bankAddressLine1 ? recipientData.bankAddressLine1 : "") + " " + (recipientData.bankAddressLine2 ? ", " + recipientData.bankAddressLine2 : "") + " " + (recipientData.bankCity ? ", " + recipientData.bankCity : "") + " " + (recipientData.bankState ? ", " + recipientData.bankState : ""),
                    "toolTip": CommonUtilities.changedataCase(recipientData.bankAddressLine1 + " " + recipientData.bankAddressLine2),
                    "accessibilityconfig": {
                        "a11yLabel": (recipientData.bankAddressLine1 ? recipientData.bankAddressLine1 : "") + " " + (recipientData.bankAddressLine2 ? ", " + recipientData.bankAddressLine2 : "") + " " + (recipientData.bankCity ? ", " + recipientData.bankCity : "") + " " + (recipientData.bankState ? ", " + recipientData.bankState : ""),
                    }
                },
                "lblNoteTitle": {
                    "text": kony.i18n.getLocalizedString("i18n.accounts.Note"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.accounts.Note"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.accounts.Note"),
                    }
                },
                "lblNotesValue": {
                    "text": recipientData.notes ? recipientData.notes : "-",
                    "toolTip": recipientData.notes ? CommonUtilities.changedataCase(recipientData.notes) : "-",
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.notes ? recipientData.notes : "-",
                    }
                },
                "lblNoteValue": {
                    "text": kony.i18n.getLocalizedString("i18n.accounts.Note"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.accounts.Note"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.accounts.Note"),
                    }
                },
                "lblNote": {
                    "text": recipientData.notes ? recipientData.notes : "-",
                    "toolTip": recipientData.notes ? CommonUtilities.changedataCase(recipientData.notes) : "-",
                    "accessibilityconfig": {
                        "a11yLabel": recipientData.notes ? recipientData.notes : "-",
                    }
                },
                "lblBankName": {
                    "text": kony.i18n.getLocalizedString("i18n.transfers.bankName"),
                    "toolTip": kony.i18n.getLocalizedString("i18n.transfers.bankName"),
                    "accessibilityconfig": {
                        "a11yLabel": kony.i18n.getLocalizedString("i18n.transfers.bankName"),
                    }
                },
                "flxDropdown": {
                    "onClick": this.onClickToggle,
                },
                "lblDropdown": {
                    "text": "O"
                },
                "flxIdentifier": "flxIdentifier",
                //"lblIdentifier": "lblIdentifier",
                "template": this.closedTemplate
            }
        },
        /**
         * on row click Method of the segment
         * */
        onClickToggle: function() {
            var scopeObj = this;
            var index = kony.application.getCurrentForm().segmentTransfers.selectedRowIndex;
            var sectionIndex = index[0];
            var rowIndex = index[1];
            var data = kony.application.getCurrentForm().segmentTransfers.data;
            var section = data.length;
            var collapseAll = function(segments, section) {
                segments.forEach(function(segment, i) {
                    if (segment.template === scopeObj.selectedTemplate) {
                        segment.template = scopeObj.closedTemplate;
                        segment.lblDropdown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
                        kony.application.getCurrentForm().segmentTransfers.setDataAt(segment, i, section);
                    }
                });
            };
            if (data[sectionIndex][1]) {
                if (data[sectionIndex][1][rowIndex].template === this.closedTemplate) {
                    while (section--) {
                        collapseAll(data[section][1], section);
                    }
                    data[sectionIndex][1][rowIndex].lblDropdown.text = ViewConstants.FONT_ICONS.CHEVRON_UP;
                    data[sectionIndex][1][rowIndex].template = this.selectedTemplate;
                } else {
                    data[sectionIndex][1][rowIndex].lblDropdown = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
                    data[sectionIndex][1][rowIndex].template = this.closedTemplate;
                }
                kony.application.getCurrentForm().segmentTransfers.setDataAt(data[sectionIndex][1][rowIndex], rowIndex, sectionIndex);
                kony.application.getCurrentForm().segmentTransfers.setDataAt(data[sectionIndex][1][rowIndex], rowIndex, sectionIndex);
                this.view.forceLayout();
            }
        },

        filterAccount: function(fromAccountNumber) {
            var currAccounts = this.checkingAccounts;
            for (var index = 0; index < currAccounts.length; index++) {
                if (currAccounts[index].accountID == fromAccountNumber) {
                    return currAccounts[index];
                }
            }
            return false;
        },

        /**
         * Ui team proposed method to handle screen aligment
         */
        AdjustScreen: function() {
            this.view.forceLayout();
            var mainheight = 0;
            var screenheight = kony.os.deviceInfo().screenHeight;
            mainheight = this.view.flxHeader.info.frame.height + this.view.flxMain.info.frame.height + this.view.flxFooter.frame.height;
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
            //this.initializeResponsiveViews();
        },

    };
});