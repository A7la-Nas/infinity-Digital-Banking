/************************************************************************************************/
define(["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants"], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
     
    var orientationHandler = new OrientationHandler();
    return {
        bulkWireFileID: "",
        bulkWireFileName: "",
        isFile: true,
        bulkWireTemplateID: "",
        bulkWireTemplateName: "",
        addedBy: "",
        addedOn: "",
        ExecutionID: "",
        bulkWireInfo: "",

        init: function() {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};

            var scopeObj = this;
            scopeObj.bulkwirefilesPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"}).presentationController;
            scopeObj.bulkWireSortMap = [{
                    name: 'transactionDate',
                    imageFlx: scopeObj.view.imgSortRecipient,
                    clickContainer: scopeObj.view.flxSortRecipient
                },
                {
                    name: 'username',
                    imageFlx: scopeObj.view.imgSortDescription,
                    clickContainer: scopeObj.view.flxSortDescription
                },
                {
                    name: 'totalCountOfTransactions',
                    imageFlx: scopeObj.view.imgSortType,
                    clickContainer: scopeObj.view.flxReferenceID
                }
            ];
            FormControllerUtility.setSortingHandlers(scopeObj.bulkWireSortMap, scopeObj.onbulkWireSortClickHandler, scopeObj);
            this.view.btnMakeAnother.onClick = function() {
                scopeObj.makeBulkTransfer();
            };
            this.view.btnFiles.onClick = function() {
                scopeObj.navigateTobulkFiles();
            };
            this.view.btnMakeAnother.toolTip = kony.i18n.getLocalizedString("i18n.bulkWire.make");
            this.view.btnFiles.toolTip = kony.i18n.getLocalizedString("i18n.bulkWire.backToBulkTransferFiles");
        },

        preShow: function() {
            var self = this;
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxFooter', 'flxHeader']);
            this.view.onBreakpointChange = function() {
                self.onBreakpointChange(kony.application.getCurrentBreakpoint());
            }
        },
        postShow: function() {
            this.view.customheadernew.forceCloseHamburger();
            this.view.customheadernew.activateMenu("Wire Transfer", "Bulk Transfer Files");
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            this.view.customheadernew.lblHeaderMobile.text = kony.i18n.getLocalizedString("i18n.bulkWire.activityHeader");
            applicationManager.getNavigationManager().applyUpdates(this);
        },
        /**
         * Binds initial widget actions - Should be called from pre show
         */
        setInitialActions: function() {
            var scopeObj = this;
            this.view.btnBack.onClick = function() {};
            this.view.btnContinue.onClick = function() {};

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

        /**
         * used to get the external accounts
         */
        getBulkWireFiles: function() {
            var scopeObj = this;
            scopeObj.clearSearchText();
            scopeObj.bulkwirefilesPresentationController.showBulkwirefiles();
        },
        /**
         * Method to show server error
         * @param {Boolean} status true/false
         */
        showServerError: function(status) {
            if (status === false) {
                this.view.flxDowntimeWarning.setVisibility(false);
            } else {
                this.view.rtxDowntimeWarning.text = status;
                this.view.rtxDowntimeWarning.toolTip = status;
                this.view.flxDowntimeWarning.setVisibility(true);
                this.view.flxDowntimeWarning.setFocus(true);
            }
            this.view.forceLayout();
        },
        /** Manages the upcomming flow
         * @param  {object} viewModel object consisting data based on which new flow has to drive
         */
        updateFormUI: function(viewModel) {
            if (viewModel.serverError) {
                this.showServerError(viewModel.serverError);
            } else {
                this.showServerError(false);
                if (viewModel.FileDetails) {
                    this.setFileDetails(viewModel.FileDetails);
                }
                if (viewModel.bulkWireFileTransactions) {
                    this.clearSearchText();
                    this.showBulkwirefiles(viewModel.bulkWireFileTransactions, viewModel.config, viewModel.pagination);
                    this.view.flxSearch.Search.imgCross.setVisibility(false);
                }
                if (viewModel.searchBulkWireFiles) {
                    this.showSearchBulkWireFiles(viewModel.searchBulkWireFiles);
                }
                if (viewModel.isLoading === true) {
                    FormControllerUtility.showProgressBar(this.view);
                } else if (viewModel.isLoading === false) {
                    FormControllerUtility.hideProgressBar(this.view);
                }
            }
            this.view.forceLayout();
        },
        /** On bulk wire file  Sort click handler.
         * @param  {object} event object
         * @param  {object} data New Sorting Data
         */
        onbulkWireSortClickHandler: function(event, data) {
            var scopeObj = this;
            scopeObj.first = 0;
            if (this.isFile) {
                data.bulkWireFileID = scopeObj.bulkWireFileID;
                data.bulkWireFileName = scopeObj.bulkWireFileName;
                data.addedBy = this.addedBy;
                data.addedOn = this.addedOn;
                scopeObj.bulkwirefilesPresentationController.showBulkWireTransactions(data, true);
            } else {
                data.bulkWireTemplateID = scopeObj.bulkWireTemplateID;
                data.bulkWireTemplateName = scopeObj.bulkWireTemplateName;
                data.addedBy = this.addedBy;
                data.addedOn = this.addedOn;
                scopeObj.bulkwirefilesPresentationController.showBulkWireTransactions(data, false);

            }
        },

        setFileDetails: function(fileData) {
            var self = this;
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            if ((fileData.addedBy !== undefined)) {
                this.addedBy = fileData.addedBy;
                this.addedOn = fileData.addedOn;
            }
            CommonUtilities.setText(this.view.lblAddedByKey, kony.i18n.getLocalizedString("i18n.bulkWire.addedBy"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblAddedByValue, this.addedBy, accessibilityConfig);
            CommonUtilities.setText(this.view.lblAddedOnKey, kony.i18n.getLocalizedString("i18n.bulkWire.addedOn"), accessibilityConfig);
            CommonUtilities.setText(this.view.lblAddedOnValue, this.addedOn, accessibilityConfig);
            this.bulkWireFileID = fileData.bulkWireFileID;
            this.bulkWireFileName = fileData.bulkWireFileName;
            this.bulkWireTemplateName = fileData.bulkWireTemplateName;
            this.bulkWireTemplateID = fileData.bulkWireTemplateID;
            this.bulkWireInfo = fileData;
            this.setPermissions(this.bulkWireInfo);
            if (fileData.bulkWireFileID) {
                this.isFile = true;
                CommonUtilities.setText(this.view.lblFileName, fileData.bulkWireFileName, accessibilityConfig);
                this.view.lblFileName.text = CommonUtilities.truncateStringWithGivenLength(fileData.bulkWireFileName, 25);
                this.view.lblFileName.toolTip = fileData.bulkWireFileName;
            } else {
                this.isFile = false;
                CommonUtilities.setText(this.view.lblFileName, fileData.bulkWireTemplateName, accessibilityConfig);
                this.view.lblFileName.text = CommonUtilities.truncateStringWithGivenLength(fileData.bulkWireTemplateName, 25);
                this.view.lblFileName.toolTip = fileData.bulkWireTemplateName;
            }
            if (fileData.data)
                this.setPermissions(fileData.data);
            var currBreakpoint = kony.application.getCurrentBreakpoint();
            if (currBreakpoint === 640 || orientationHandler.isMobile) {
                this.view.btnMakeAnother.setVisibility(false);
            }
        },

        setPermissions: function(data) {
            var domesticCount = data.noOfDomesticTransactions;
            var internationalCount = data.noOfInternationalTransactions;
            var isDomesticViewPermitted = this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_VIEW]);
            var isInternationalViewPermitted = this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_VIEW]);
            var isDomesticCreatePermitted = this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_CREATE]);
            var isInternationalCreatePermitted = this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_CREATE]);
            this.view.btnMakeAnother.setVisibility(false);
            if (domesticCount === undefined && internationalCount === undefined) {
                if (isDomesticViewPermitted && isDomesticCreatePermitted) {
                    this.view.btnMakeAnother.setVisibility(true);
                }
            }
            if (domesticCount > 0 && internationalCount == "0") {
                if (isDomesticViewPermitted && isDomesticCreatePermitted) {
                    this.view.btnMakeAnother.setVisibility(true);
                }
            }
            if (internationalCount > 0 && domesticCount == "0") {
                if (isInternationalViewPermitted && isInternationalCreatePermitted) {
                    this.view.btnMakeAnother.setVisibility(true);
                }
            }
            if (internationalCount > 0 && domesticCount > 0) {
                if ((isDomesticViewPermitted && isDomesticCreatePermitted) || (isInternationalViewPermitted && isInternationalCreatePermitted)) {
                    this.view.btnMakeAnother.setVisibility(true);
                }
            }
        },


        /** On Search is complete show external accounts
         * @param  {array} viewModel Array of recipients
         */
        showSearchBulkWireFiles: function(viewModel) {
            var scopeObj = this;
            if (viewModel.error) {
                scopeObj.showBulkwirefiles("errorExternalAccounts");
                return;
            }
            if (viewModel.bulkWireTransactions.length === 0) {
                scopeObj.view.flxSort.setVisibility(false);
                //scopeObj.view.flxSearch.setVisibility(false);
                scopeObj.view.flxSegment.setVisibility(false);
                scopeObj.view.tablePagination.setVisibility(false);
                scopeObj.view.segmentFileTransactions.setVisibility(false);
                scopeObj.view.NoTransactions.setVisibility(true);
                scopeObj.view.NoTransactions.rtxNoPaymentMessage.text = "No Transaction Activities";
                scopeObj.view.NoTransactions.lblScheduleAPayment.text = "";
                scopeObj.view.forceLayout();
                return;
            }
            scopeObj.showBulkwirefiles(viewModel.bulkWireTransactions, viewModel.searchInputs, {}, true);
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
            scopeObj.view.flxSearch.Search.flxClearBtn.setVisibility(false);
            if (this.isFile) {
                scopeObj.bulkwirefilesPresentationController.showBulkWireTransactions({
                    'bulkWireFileID': scopeObj.bulkWireFileID,
                    'bulkWireFileName': scopeObj.bulkWireFileName,
                    'addedBy': scopeObj.addedBy,
                    'addedOn': scopeObj.addedOn
                }, true);
            } else {
                scopeObj.bulkwirefilesPresentationController.showBulkWireTransactions({
                    'bulkWireTemplateID': scopeObj.bulkWireTemplateID,
                    'bulkWireTemplateName': scopeObj.bulkWireTemplateName,
                    'addedBy': scopeObj.addedBy,
                    'addedOn': scopeObj.addedOn
                });
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
                if (this.isFile) {
                    scopeObj.bulkwirefilesPresentationController.searchBulkWireFileTransactions({
                        'searchKeyword': searchKeyword,
                        'bulkWireFileID': scopeObj.bulkWireFileID,
                        'bulkWireFileName': scopeObj.bulkWireFileName,
                        'addedBy': scopeObj.addedBy,
                        'addedOn': scopeObj.addedOn
                    });
                } else {
                    scopeObj.bulkwirefilesPresentationController.searchBWTemplateTransactions({
                        'searchKeyword': searchKeyword,
                        'bulkWireTemplateID': scopeObj.bulkWireTemplateID,
                        'bulkWireTemplateName': scopeObj.bulkWireTemplateName,
                        'addedBy': scopeObj.addedBy,
                        'addedOn': scopeObj.addedOn
                    });
                }
                scopeObj.prevSearchText = searchKeyword;
            }
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

        makeBulkTransfer: function() {
            var scopeObj = this;
            if (this.isFile) {
                scopeObj.bulkwirefilesPresentationController.showBulkWireConfirmTransfer({
                    'bulkWireFileID': scopeObj.bulkWireFileID,
                    'bulkWireFileName': scopeObj.bulkWireFileName
                });
            } else {
                var params = {
                    "bulkWireID": scopeObj.bulkWireTemplateID,
                    "bulkWireName": scopeObj.bulkWireTemplateName
                }
                scopeObj.bulkwirefilesPresentationController.showBulkWireEditRecipientTemplate(params);
            }
        },

        navigateTobulkFiles: function() {
            var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
            var params = {};
            if (this.isFile) {
                params = {
                    "formName": "frmBulkTransferFiles"
                };
            } else {
                params = {
                    "formName": "frmBulkTransferFiles",
                    "bulkWireCategoryFilter": "Templates"
                };
            }
            wireTransferModule.presentationController.showBulkwirefiles(params);
        },

        /**
         * used to set the Bulk Wire Files serach
         */
        setBulkWireFileSearch: function() {
            var scopeObj = this;
            //scopeObj.view.flxSearch.setVisibility(true);
            scopeObj.view.flxSearch.Search.imgCross.setVisibility(true);
            //scopeObj.view.flxSearch.Search.btnConfirm.onClick = scopeObj.onSearchBtnClick.bind(scopeObj);
            scopeObj.view.flxSearch.Search.flxClearBtn.onClick = scopeObj.onSearchClearBtnClick.bind(scopeObj);
            scopeObj.view.flxSearch.Search.txtSearch.onKeyUp = scopeObj.onTxtSearchKeyUp.bind(scopeObj);
        },

        showBulkwirefiles: function(viewModel, config, pagination, isSearch) {
            var scopeObj = this;
            scopeObj.setBulkWireFileSearch();

            if ((viewModel === undefined) || ((viewModel instanceof Array) && viewModel.length === 0)) {
                scopeObj.view.flxSort.setVisibility(false);
                //scopeObj.view.flxSearch.setVisibility(false);
                scopeObj.view.flxSegment.setVisibility(false);
                scopeObj.view.tablePagination.setVisibility(false);
                scopeObj.view.segmentFileTransactions.setVisibility(false);
                scopeObj.view.NoTransactions.setVisibility(true);
            } else {
                var currBreakpoint = kony.application.getCurrentBreakpoint();
                if (currBreakpoint === 640 || orientationHandler.isMobile) {
                    this.selectedTemplate = "flxbulkWireFileTransactionDetailMobile";
                } else {
                    this.selectedTemplate = "flxbulkWireFileTransactionDetail";
                }
                var forUtility = applicationManager.getFormatUtilManager();
                var configManager = applicationManager.getConfigurationManager();
                var addedDate = forUtility.getDateObjectFromCalendarString(viewModel[0].createdts, "YYYY-MM-DD");
                this.addedOn = forUtility.getFormattedSelectedDate(addedDate);
                this.addedBy = viewModel[0].firstname + " " + viewModel[0].lastname;

                var dataMap = {
                    "lblTransactionDate": "lblTransactionDate",
                    "lblInitiatedBy": "lblInitiatedBy",
                    "lblTotalTransactions": "lblTotalTransactions",
                    "lblActions": "lblActions",
                    "lblActionsMobile": "lblActionsMobile",
                    "flxActions": "flxActions",
                    "lblDate": "lblDate",
                    "segbulkWireFileTransactionDetailMobile": "segbulkWireFileTransactionDetailMobile",
                    "segbulkWireFileTransactionDetail": "segbulkWireFileTransactionDetailMobile",

                };

                var len = viewModel.length;
                if (!isSearch) {
                    scopeObj.setPagination({
                        'show': true,
                        'offset': pagination.offset,
                        'limit': pagination.limit,
                        'recordsLength': viewModel.length,
                        'text': kony.i18n.getLocalizedString("i18n.konybb.Common.Transactions")
                    }, this.prevBulkWireFiles, this.nextBulkWireFiles);
                }
                var scopeObj = this;
                var data = [];
                var i;
                for (i = 0; i < len; i++) {
                    if (viewModel[i] !== undefined) {
                        var transactionDate = forUtility.getDateObjectFromCalendarString(viewModel[i].transactionDate, "YYYY-MM-DD");
                        transactionDate = forUtility.getFormattedSelectedDate(transactionDate);
                        var totalCountOfDomesticTransactions = viewModel[i].totalCountOfDomesticTransactions;
                        var totalCountOfInternationalTransactions = viewModel[i].totalCountOfInternationalTransactions;
                        var isDomesticFilePermitted = this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_VIEW]);
                        var isInternationalFilePermitted = this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_VIEW]);
                        var isDomesticTemplatePermitted = this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_VIEW]);
                        var isInternationalTemplatePermitted = this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_VIEW]);
                        var viewAllTransactions = true;
                        if (this.isFile) {
                            if (totalCountOfDomesticTransactions > 0 && (!isDomesticFilePermitted)) {
                                viewAllTransactions = false;
                            }
                            if (totalCountOfInternationalTransactions > 0 && (!isInternationalFilePermitted)) {
                                viewAllTransactions = false;
                            }
                        } else {
                            viewAllTransactions = false;
                            if (totalCountOfDomesticTransactions > 0 && (isDomesticTemplatePermitted)) {
                                viewAllTransactions = true;
                            }
                            if (totalCountOfInternationalTransactions > 0 && (isInternationalTemplatePermitted)) {
                                viewAllTransactions = true;
                            }
                            if (totalCountOfInternationalTransactions > 0 && totalCountOfDomesticTransactions > 0) {
                                if (isDomesticTemplatePermitted || isInternationalTemplatePermitted) {
                                    viewAllTransactions = true;
                                }
                            }
                        }
                        var dataObject = {
                            "lblTransactionDate": transactionDate,
                            "lblInitiatedBy": viewModel[i].firstname + " " + viewModel[i].lastname,
                            "lblTotalTransactions": viewModel[i].totalCountOfTransactions,
                            "lblDate": transactionDate,
                            "lblActions": kony.i18n.getLocalizedString("i18n.bulkWire.viewAllTransactions"),
                            "lblActionsMobile": "View Transactions",
                            "bulkWireTransactionID": viewModel[i].bulkWireTransactionID,
                            "fileName": viewModel[i].bulkWireFileID ? viewModel[i].bulkWireFileID : viewModel[i].bulkWireTemplateID,
                            "flxActions": {
                                "onClick": scopeObj.onClickActions.bind(this),
                                "isVisible": viewAllTransactions
                            },
                            "template": this.selectedTemplate,
                        };
                        data.push(dataObject);
                    }
                }
                this.view.segmentFileTransactions.widgetDataMap = dataMap;
                this.view.segmentFileTransactions.setData(data);
                scopeObj.view.flxSort.setVisibility(true);
                //scopeObj.view.flxSearch.setVisibility(true);
                scopeObj.view.flxSegment.setVisibility(true);
                scopeObj.view.tablePagination.setVisibility(true);
                scopeObj.view.segmentFileTransactions.setVisibility(true);
                scopeObj.view.NoTransactions.setVisibility(false);
                FormControllerUtility.updateSortFlex(this.bulkWireSortMap, config);
                this.view.forceLayout();
            }
        },

        checkAllPermissions: function(permissions) {
            return permissions.every(this.checkUserPermission);
        },

        checkUserPermission: function(permission) {
            return applicationManager.getConfigurationManager().checkUserPermission(permission);
        },

        onClickActions: function() {
            var index = this.view.segmentFileTransactions.selectedRowIndex;
            var rowIndex = index[1];
            var data = this.view.segmentFileTransactions.data;
            var selectedData = data[rowIndex];

            var params = {
                'executionID': selectedData.bulkWireTransactionID,
                'filterBy': "",
                'sortBy': "",
                'order': "",
                'searchString': ""
            };
            var controller = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"}).presentationController;
            var context = {};
            if (this.isFile) {
                context = {
                    "formName": "frmBulkWireActivityAll",
                    "isAcknowledgment": false,
                    "counts": {},
                    "fileDetails": {
                        "fileName": this.view.lblFileName.toolTip,
                        "initiatedBy": selectedData.lblInitiatedBy,
                        "initiatedOn": selectedData.lblDate,
                        "bulkWireFileID": selectedData.fileName
                    }
                };
                controller.fetchFileTransactionActivityByExecutionID(params, context);
            } else {
                context = {
                    "formName": "frmBulkWireActivityAll",
                    "isAcknowledgment": false,
                    "counts": {},
                    "fileDetails": {
                        "fileName": this.view.lblFileName.toolTip,
                        "initiatedBy": selectedData.lblInitiatedBy,
                        "initiatedOn": selectedData.lblDate,
                        "bulkWireTemplateID": selectedData.fileName
                    }
                };
                controller.getBWTTransactionActivityByExecutionID(params, context);
            }
        },

        /**Configure Pagination for previous External Accounts
         */
        prevBulkWireFiles: function() {
            var scopeObj = this;
            if (this.isFile) {
                scopeObj.bulkwirefilesPresentationController.fetchPreviousBulkWireFileTransactions({
                    'bulkWireFileID': scopeObj.bulkWireFileID,
                    'bulkWireFileName': scopeObj.bulkWireFileName,
                    'addedBy': scopeObj.addedBy,
                    'addedOn': scopeObj.addedOn
                }, true);
            } else {
                scopeObj.bulkwirefilesPresentationController.fetchPreviousBulkWireFileTransactions({
                    'bulkWireTemplateID': scopeObj.bulkWireTemplateID,
                    'bulkWireTemplateName': scopeObj.bulkWireTemplateName,
                    'addedBy': scopeObj.addedBy,
                    'addedOn': scopeObj.addedOn
                }, false);
            }
        },
        /**Configure Pagination for Next Button of External Accounts
         */
        nextBulkWireFiles: function() {
            var scopeObj = this;
            this.view.tablePagination.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_ACTIVE;
            if (this.isFile) {
                scopeObj.bulkwirefilesPresentationController.fetchNextBulkWireFileTransactions({
                    'bulkWireFileID': scopeObj.bulkWireFileID,
                    'bulkWireFileName': scopeObj.bulkWireFileName,
                    'addedBy': scopeObj.addedBy,
                    'addedOn': scopeObj.addedOn
                }, true);
            } else {
                scopeObj.bulkwirefilesPresentationController.fetchNextBulkWireFileTransactions({
                    'bulkWireTemplateID': scopeObj.bulkWireTemplateID,
                    'bulkWireTemplateName': scopeObj.bulkWireTemplateName,
                    'addedBy': scopeObj.addedBy,
                    'addedOn': scopeObj.addedOn
                }, false);
            }
        },
        /**
         * setPagination:   used to set pagination.
         * @param {obejct} data list of records
         * @param {function} previousCallBack -- previous button handler
         * @param {function}  nextCallBack -- next button handler
         */
        setPagination: function(data, previousCallBack, nextCallBack) {
            var scopeObj = this;
            if (data && data.show === true) {
                this.view.tablePagination.setVisibility(true);
                var offset = data.offset;
                var limit = data.limit || OLBConstants.PAGING_ROWS_LIMIT;
                var recordsLength = data.recordsLength;
                CommonUtilities.setText(this.view.tablePagination.lblPagination, (offset + 1) + " - " + (offset + recordsLength) + " " + data.text, CommonUtilities.getaccessibilityConfig());
                if (data.offset > 0) {
                    scopeObj.view.tablePagination.flxPaginationPrevious.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_ACTIVE;
                    scopeObj.view.tablePagination.flxPaginationPrevious.onClick = previousCallBack;
                } else {
                    scopeObj.view.tablePagination.flxPaginationPrevious.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_INACTIVE;
                    scopeObj.view.tablePagination.flxPaginationPrevious.onClick = null;
                }
                if (recordsLength >= OLBConstants.PAGING_ROWS_LIMIT) {
                    scopeObj.view.tablePagination.flxPaginationNext.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_ACTIVE;
                    scopeObj.view.tablePagination.flxPaginationNext.onClick = nextCallBack;
                } else {
                    scopeObj.view.tablePagination.flxPaginationNext.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_INACTIVE;
                    scopeObj.view.tablePagination.flxPaginationNext.onClick = null;
                }
            } else {
                scopeObj.view.tablePagination.setVisibility(false);
                scopeObj.view.tablePagination.flxPaginationPrevious.onClick = null;
                scopeObj.view.tablePagination.flxPaginationNext.onClick = null;
            }
        },

        onBreakpointChange: function(form, width) {
            var scope = this;
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            this.view.CustomPopupCancel.onBreakpointChangeComponent(scope.view.CustomPopupCancel, width);
            FormControllerUtility.setupFormOnTouchEnd(width);
             
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
        }

    };
});