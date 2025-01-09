/************************************************************************************************/
define(["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants", "CampaignUtility"], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants, CampaignUtility) {
     
    var orientationHandler = new OrientationHandler();
    return {

        init: function() {
            var self = this;
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.btnTemplates.onClick = function() {
                FormControllerUtility.showProgressBar(this.view);
                var params = {
                    "formName": "frmMakeBulkTransferTemplate",
                    "bulkWireCategoryFilter": "Templates"
                };
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"}).presentationController.showBulkwirefiles(params);
            };
            this.view.lblScheduleAPayment.onTouchStart = function() {
                var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
                // applicationManager.getNavigationManager().navigateTo("frmAddBulkTransferFile");
                var obj = {
                    "context": self,
                    "callbackModelConfig": {
                        "frmAddBulkTransferFile": true
                    }
                };
                var navManager = kony.mvc.getNavigationManager();
                navManager.navigate(obj);
            };
            this.view.lblViewSampleFile.onTouchStart = function() {
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"}).presentationController.downloadSampleBulkWireFile();
            };

            var scopeObj = this;
            scopeObj.bulkwirefilesPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"}).presentationController;
            scopeObj.bulkWireFilesSortMap = [{
                    name: 'bulkWireName',
                    imageFlx: scopeObj.view.imgSortFileName,
                    clickContainer: scopeObj.view.flxFileName
                },
                {
                    name: 'username',
                    imageFlx: scopeObj.view.imgSortAddedBy,
                    clickContainer: scopeObj.view.flxAddedBy
                },
                {
                    name: 'createdts',
                    imageFlx: scopeObj.view.imgSortAddedOn,
                    clickContainer: scopeObj.view.flxAddedOn
                }
            ];
            FormControllerUtility.setSortingHandlers(scopeObj.bulkWireFilesSortMap, scopeObj.onbulkWireFilesSortClickHandler, scopeObj);
            this.view.btnBack.onClick = function() {
                var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
                var params = {
                    "formName": "frmBulkTransferFiles",
                    "bulkWireCategoryFilter": "Files"
                };
                wireTransferModule.presentationController.showBulkwirefiles(params);
            }
            this.view.btnContinue.onClick = this.MakeBulkTransfer;
        },

        preShow: function() {
            //  this.getBulkWireFiles();
            this.view.flxNoRecords.setVisibility(false);
            this.view.segMakeBulkTransfer.setVisibility(true);
            this.view.tablePaginationWireTransfer.setVisibility(true);
            this.view.flxbtn.setVisibility(true);
//             this.view.btnContinue.skin = sknBtnBlockedSSP0273e315px;
            this.view.flxDowntimeWarning.setVisibility(false);
            this.view.btnBack.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
            this.view.btnContinue.toolTip = kony.i18n.getLocalizedString("i18n.common.proceed");
            this.view.lblScheduleAPayment.toolTip = kony.i18n.getLocalizedString("i18n.bulkWire.uploadBulkWireFile");
            this.view.lblViewSampleFile.toolTip = kony.i18n.getLocalizedString("i18n.bulkWire.viewSampleFile");
            this.view.btnBack.hoverSkin = "sknBtnSecondaryFocusSSP3343a815PxHover";
            this.view.btnBack.focusSkin = "sknBtnSecondaryFocusSSP3343a815Px";

            CampaignUtility.fetchPopupCampaigns();
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain']);
            //  this.setInitialActions();     
        },
        postShow: function() {
            this.view.customheadernew.forceCloseHamburger();
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            this.view.customheadernew.activateMenu("Wire Transfer", "Make Bulk Transfer");
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
            this.view.flxSort.setVisibility(true);
            this.view.tablePaginationWireTransfer.setVisibility(true);
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

        /** Manages the upcomming flow
         * @param  {object} viewModel object consisting data based on which new flow has to drive
         */
        updateFormUI: function(viewModel) {
            if (viewModel.serverError) {
                this.showServerError(viewModel.serverError);
            } else {
                if (viewModel.isLoading === true) {
                    FormControllerUtility.showProgressBar(this.view);
                } else if (viewModel.isLoading === false) {
                    FormControllerUtility.hideProgressBar(this.view);
                }
                if (viewModel.bulkWireFiles) {
                    this.clearSearchText();
                    this.showBulkwirefiles(viewModel.bulkWireFiles, viewModel.config, viewModel.pagination);
                }
                if (viewModel.searchBulkWireFiles) {
                    this.showSearchBulkWireFiles(viewModel.searchBulkWireFiles);
                }
                if (viewModel.noMoreRecords) {
                    this.showNoMoreRecords()
                }
            }
            if (viewModel.campaign) {
                CampaignUtility.showCampaign(viewModel.campaign, this.view, "flxMain");
            }
            this.view.forceLayout();
        },
        /** On bulk wire file  Sort click handler.
         * @param  {object} event object
         * @param  {object} data New Sorting Data
         */
        onbulkWireFilesSortClickHandler: function(event, data) {
            var scopeObj = this;
            scopeObj.first = 0;
            var params = {
                'offset': data.offset,
                'sortBy': data.sortBy,
                'bulkWireCategoryFilter': OLBConstants.BULKWIRE_CATEGORY_FILTER.FILES
            }
            scopeObj.bulkwirefilesPresentationController.showBulkwirefiles(params);
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
            if (viewModel.bulkWireFiles.length === 0) {
                scopeObj.view.flxSort.setVisibility(false);
                scopeObj.view.segMakeBulkTransfer.setVisibility(false);
                scopeObj.view.tablePaginationWireTransfer.setVisibility(false);
                scopeObj.view.flxNoRecords.setVisibility(true);
                scopeObj.view.lblScheduleAPayment.setVisibility(false);
                scopeObj.view.lblViewSampleFile.setVisibility(false);
                scopeObj.view.flxbtn.setVisibility(false);
                //  scopeObj.view.flxNoTransactions.rtxNoPaymentMessage.text = kony.i18n.getLocalizedString('i18n.transfers.searchNoPayees');
                scopeObj.view.forceLayout();
                return;
            } else {
                scopeObj.showBulkwirefiles(viewModel.bulkWireFiles, viewModel.searchInputs, {}, true);
                scopeObj.view.tablePaginationWireTransfer.setVisibility(false);
            }
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
            scopeObj.bulkwirefilesPresentationController.showBulkwirefiles({
                'bulkWireCategoryFilter': OLBConstants.BULKWIRE_CATEGORY_FILTER.FILES
            });
            this.prevSearchText = '';
            this.view.flxSearch.Search.txtSearch.text = '';
            this.view.flxbtn.setVisibility(true);
            this.view.forceLayout();
        },

        /** Searches for a payee */
        onSearchBtnClick: function() {
            var scopeObj = this;
            var searchKeyword = scopeObj.view.flxSearch.Search.txtSearch.text.trim();
            if (scopeObj.prevSearchText !== searchKeyword) {
                scopeObj.bulkwirefilesPresentationController.searchBulkWireFiles({
                    'searchKeyword': searchKeyword,
                    'bulkWireCategory': OLBConstants.BULKWIRE_CATEGORY_FILTER.FILES
                });
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

        /**
         * used to set the Bulk Wire Files serach
         */
        setBulkWireFileSearch: function() {
            var scopeObj = this;
            scopeObj.view.flxSearch.setVisibility(true);
            scopeObj.view.flxSearch.Search.imgCross.setVisibility(true);
            scopeObj.view.flxSearch.Search.btnConfirm.onClick = scopeObj.onSearchBtnClick.bind(scopeObj);
            scopeObj.view.flxSearch.Search.flxClearBtn.onClick = scopeObj.onSearchClearBtnClick.bind(scopeObj);
            scopeObj.view.flxSearch.Search.txtSearch.onKeyUp = scopeObj.onTxtSearchKeyUp.bind(scopeObj);
        },


        showBulkwirefiles: function(viewModel, config, pagination, isSearch) {
            var scopeObj = this;
            scopeObj.setBulkWireFileSearch();

            if ((viewModel === undefined) || ((viewModel instanceof Array) && viewModel.length === 0)) {
                this.view.flxNoRecords.setVisibility(true);
                scopeObj.view.lblScheduleAPayment.setVisibility(true);
                scopeObj.view.lblViewSampleFile.setVisibility(true);
                this.view.flxSort.setVisibility(false);
                this.view.segMakeBulkTransfer.setVisibility(false);
                this.view.tablePaginationWireTransfer.setVisibility(false);
                this.view.flxbtn.setVisibility(false);
            } else {
                var dataMap = {
                    "lblDropdown": "lblDropdown",
                    "lblRecipient": "lblRecipient",
                    "lblFrom": "lblFrom",
                    "lblReferenceID": "lblReferenceID",
                    "lblAmount": "lblAmount",
                    "lblBulkFileID": "lblBulkFileID",
                    "flxDropdown": "flxDropdown"
                };
                var len = Math.min((config.offset + config.limit), viewModel.length) || viewModel.length;
                if (!isSearch) {
                    this.recordsLength = viewModel.length;
                    scopeObj.setPagination({
                        'show': true,
                        'offset': config.offset,
                        'limit': config.limit,
                        'recordsLength': viewModel.length,
                        'text': kony.i18n.getLocalizedString("i18n.konybb.ACH.Files") 
                    }, viewModel, config);
                }
                var data = [];
                var i;
                if (len === 1) {
                    this.view.btnContinue.skin = ViewConstants.SKINS.NORMAL;
                    this.view.btnContinue.focusSkin = "sknBtnFocusSSPFFFFFF15Px0273e3";
                    this.view.btnContinue.hoverSkin = "sknBtnHoverSSPFFFFFF15Px";
                }
                for (i = config.offset || 0; i < len; i++) {
                    if (viewModel[i] !== undefined) {
                        var forUtility = applicationManager.getFormatUtilManager();
                        var configManager = applicationManager.getConfigurationManager();
                        var transactionDate = forUtility.getDateObjectFromCalendarString(viewModel[i].createdts, "YYYY-MM-DD");
                        transactionDate = forUtility.getFormattedSelectedDate(transactionDate);
                        var userName = viewModel[i].firstname + " " + viewModel[i].lastname;
                        var dataObject = {
                            "lblDropdown": {
                                "text": (len === 1) ? "M" : "L",
                            },
                            "flxDropdown":{
                                "onClick": scopeObj.onRowClickSegment.bind(this, viewModel[i])
                            },
                            "lblRecipient": {
                                "text": CommonUtilities.truncateStringWithGivenLength(viewModel[i].bulkWireName, 30),
                                "accessibilityconfig": {
                                    "a11yLabel": viewModel[i].bulkWireName,
                                }
                            },
                            "lblFrom": {
                                "text": userName,
                                "accessibilityconfig": {
                                    "a11yLabel": userName,
                                }
                            },
                            "lblReferenceID": {
                                "text": transactionDate,
                                "accessibilityconfig": {
                                    "a11yLabel": transactionDate,
                                }
                            },
                            "lblAmount": {
                                "text": viewModel[i].noOfTransactions,
                                "accessibilityconfig": {
                                    "a11yLabel": viewModel[i].noOfTransactions,
                                }
                            },
                            "lblBulkFileID": {
                                "text": viewModel[i].bulkWireID,
                                "accessibilityconfig": {
                                    "a11yLabel": viewModel[i].bulkWireID,
                                }
                            }
                        };
                        data.push(dataObject);
                    }
                }
                this.view.segMakeBulkTransfer.widgetDataMap = dataMap;
                this.view.segMakeBulkTransfer.setData(data);
                this.view.flxNoRecords.setVisibility(false);
                this.view.segMakeBulkTransfer.setVisibility(true);
                FormControllerUtility.updateSortFlex(this.bulkWireFilesSortMap, config);
                this.view.tablePaginationWireTransfer.flxPaginationNext.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_ACTIVE;
                this.view.forceLayout();
            }
        },

        showNoMoreRecords: function() {
            this.view.tablePagination.flxPaginationNext.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_INACTIVE;
            kony.ui.Alert(kony.i18n.getLocalizedString("i18n.navigation.norecordsfound"));
            FormControllerUtility.hideProgressBar(this.view);
        },

        onRowClickSegment: function(selectedData) {
            var scopeObj = this;
            var index = kony.application.getCurrentForm().segMakeBulkTransfer.selectedRowIndex;
            var rowIndex = index[1];
            scopeObj.selectedRowIndex = rowIndex;
            var data = kony.application.getCurrentForm().segMakeBulkTransfer.data;
            for (i = 0; i < data.length; i++) {
                if (i == rowIndex) {
                    data[i].lblDropdown = "M";
                } else if (data[i].lblDropdown === "M") {
                    data[i].lblDropdown = "L";
                }
            }
            scopeObj.view.segMakeBulkTransfer.setData(data);
            if ((this.checkSpecificPermissions(["DOMESTIC_WIRE_TRANSFER_BULKWIRES", "DOMESTIC_WIRE_TRANSFER_CREATE"], ["INTERNATIONAL_WIRE_TRANSFER_BULKWIRES", "INTERNATIONAL_WIRE_TRANSFER_CREATE"]) &&
                    selectedData.noOfInternationalTransactions > 0) ||
                (this.checkSpecificPermissions(["INTERNATIONAL_WIRE_TRANSFER_BULKWIRES", "INTERNATIONAL_WIRE_TRANSFER_CREATE"], ["DOMESTIC_WIRE_TRANSFER_BULKWIRES", "DOMESTIC_WIRE_TRANSFER_CREATE"]) &&
                    selectedData.noOfDomesticTransactions > 0)) {
                this.view.btnContinue.skin = ViewConstants.SKINS.BLOCKED;
                this.view.rtxDowntimeWarning.text = kony.i18n.getLocalizedString("i18n.bulkWire.NoAccess");
                this.view.flxDowntimeWarning.setVisibility(true);
            } else {
                this.view.btnContinue.skin = ViewConstants.SKINS.NORMAL;
                this.view.flxDowntimeWarning.setVisibility(false);
            }
            this.view.forceLayout();
        },

        checkSpecificPermissions: function(permissionsNeeded, permissionsNotNeeded) {
            return permissionsNeeded.every(this.checkUserPermission) && (permissionsNotNeeded.every(this.checkUserPermission) == false);
        },

        checkUserPermission: function(permission) {
            return applicationManager.getConfigurationManager().checkUserPermission(permission);
        },

        onClickRadioButton: function() {
            var index = this.view.segMakeBulkTransfer.selectedRowIndex[1];
            var data = this.view.segMakeBulkTransfer.data[index];
            data.lblDropdown.text = "M";
        },
        /**Configure Pagination for previous External Accounts
         */
        prevBulkWireFiles: function() {
            var scopeObj = this;
            scopeObj.bulkwirefilesPresentationController.fetchPreviousBulkWireFiles();
        },
        /**Configure Pagination for Next Button of External Accounts
         */
        nextBulkWireFiles: function() {
            var scopeObj = this;
            this.view.tablePaginationWireTransfer.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_ACTIVE;
            scopeObj.bulkwirefilesPresentationController.fetchNextBulkWireFiles();
        },
        onBreakpointChange: function(form, width) {
            var scope = this;
            this.view.deletePopup.onBreakpointChangeComponent(scope.view.deletePopup, width);
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            this.view.CustomPopupCancel.onBreakpointChangeComponent(scope.view.CustomPopupCancel, width);
            FormControllerUtility.setupFormOnTouchEnd(width);
             
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
        },

        MakeBulkTransfer: function() {
            var scopeObj = this;
            var index = scopeObj.selectedRowIndex;
            var rowIndex = index ? index : 0;
            var data = kony.application.getCurrentForm().segMakeBulkTransfer.data;
            for (i = 0; i < data.length; i++) {
                if (i == rowIndex) {
                    fileID = data[i].lblBulkFileID.text;
                    fileName = data[i].lblRecipient.accessibilityconfig.a11yLabel;
                }
            }
            var params = {
                "bulkWireFileID": fileID,
                "bulkWireFileName": fileName
            }
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"}).presentationController.showBulkWireConfirmTransfer(params);
        },
        /**
         * setPagination:   used to set pagination.
         * @param {obejct} data list of records
         * @param {function} previousCallBack -- previous button handler
         * @param {function}  nextCallBack -- next button handler
         */
         setPagination: function(values, viewModel, config, ) {
            var paginationComponent = this.view.tablePaginationWireTransfer;
            paginationComponent.setVisibility(true);
            var recipientDetails = this.recordsLength;
            const lastRecord = Math.min((values.offset + values.limit), recipientDetails);
            paginationComponent.lblPagination.text = (values.offset + 1) + " - " + lastRecord + " " + values.text;
            if (values.offset !== 0 && values.offset <= recipientDetails - 1) {
                paginationComponent.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_ACTIVE;
                paginationComponent.flxPaginationPrevious.setEnabled(true);
                paginationComponent.flxPaginationPrevious.onClick = this.onPrevious.bind(this, values, viewModel, config);
            } else {
                paginationComponent.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_INACTIVE;
                paginationComponent.flxPaginationPrevious.setEnabled(false);
            }
            if (recipientDetails <= 10 || lastRecord > recipientDetails - 1) {
                paginationComponent.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_INACTIVE;
                paginationComponent.flxPaginationNext.setEnabled(false);
            } else {
                paginationComponent.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_ACTIVE;
                paginationComponent.flxPaginationNext.setEnabled(true);
                paginationComponent.flxPaginationNext.onClick = this.onNext.bind(this, values, viewModel, config);
            }
        },
        onPrevious: function(values, viewModel, config) {
            var recipientDetails = this.recordsLength;
            if (config.offset < recipientDetails) {
                config.offset = config.offset - 10;
            }
            this.showBulkwirefiles(viewModel, config);
        },
        onNext: function(values, viewModel, config) {
            var recipientDetails = this.recordsLength;
            if (config.offset < recipientDetails) {
                config.offset = config.offset + 10;
            }
            this.showBulkwirefiles(viewModel, config);
        }
    };
});