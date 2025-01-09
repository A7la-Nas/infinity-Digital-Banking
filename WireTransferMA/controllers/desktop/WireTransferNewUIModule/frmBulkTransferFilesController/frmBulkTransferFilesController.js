/************************************************************************************************/
define(["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants"], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
     
    var orientationHandler = new OrientationHandler();
    return {
        closedTemplate: "flxBulkwireFilesUnSelected",
        selectedTemplate: "flxBulkwireFilesSelected",

        init: function() {
          	var self = this;
            this.view.onDeviceBack = function() {};
            this.view.btnRecent.onClick = this.onRecentTabClick.bind(this); //Recent - Wire Transfer
            this.view.btnManageRecipient.onClick = this.onManageTabClick.bind(this);
            this.view.btnMakeTransfer.onClick = this.onMakeTransferTabClick.bind(this);
            this.view.onBreakpointChange = this.onBreakpointChange;
            var break_point = kony.application.getCurrentBreakpoint();
            if (break_point == 640 || orientationHandler.isMobile) {
                this.view.btnMakeTransfer.text = kony.i18n.getLocalizedString("i18n.hamburger.transfer");
                this.view.btnManageRecipient.text = kony.i18n.getLocalizedString("i18n.transfers.external_accounts");
                this.view.btnBulkWireFiles.text = kony.i18n.getLocalizedString("i18n.wireTransfers.Files&Templates");
                this.view.btnScheduleApayment.isVisible = false;
            }
            this.view.btnScheduleApayment.onClick = function() {
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
            this.view.btnScheduleApayment.setVisibility(!(kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) && this.checkAtLeastOnePermission([
                OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_UPLOAD_BULK_FILES,
                OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_UPLOAD_BULK_FILES
            ]));
            this.view.lblFiles.setVisibility(!(kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) && this.checkAtLeastOnePermission([
                OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_UPLOAD_BULK_FILES,
                OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_UPLOAD_BULK_FILES
            ]));
            this.view.btnViewSampleFile.onClick = function() {
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"}).presentationController.downloadSampleBulkWireFile();
            };
            this.view.btnViewSampleFile.setVisibility(!(kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) && this.checkAtLeastOnePermission([
                OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_UPLOAD_BULK_FILES,
                OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_UPLOAD_BULK_FILES
            ]));
            this.view.lblsamplefile.onTouchStart = function() {
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"}).presentationController.downloadSampleBulkWireFile();
            };
            this.view.lblsamplefile.setVisibility(false);
            this.view.btnAddNewTemplate.onClick = function() {
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"}).presentationController.resetPrimaryDetails();
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"}).presentationController.resetRecipientData();
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"}).presentationController.navigateToCreateTemplateForm();
            };
            this.view.btnAddNewTemplate.setVisibility(!(kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) && this.checkAtLeastOnePermission([
                OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_UPDATE_BULK_TEMPLATES,
                OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_UPDATE_BULK_TEMPLATES
            ]));
            this.view.lblCreatetemplate.setVisibility(!(kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) && this.checkAtLeastOnePermission([
                OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_UPDATE_BULK_TEMPLATES,
                OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_UPDATE_BULK_TEMPLATES
            ]));

            var scopeObj = this;
            scopeObj.bulkwirefilesPresentationController = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"}).presentationController;
            scopeObj.view.LisiBox1.onSelection = scopeObj.selectFilterOption;
            scopeObj.bulkWireFilesSortMap = [{
                    name: 'bulkWireName',
                    imageFlx: scopeObj.view.imgSortFileName,
                    clickContainer: scopeObj.view.flxFileNameSort
                },
                {
                    name: 'username',
                    imageFlx: scopeObj.view.imgSortAddedBy,
                    clickContainer: scopeObj.view.flxAddedBySort
                },
                {
                    name: 'createdts',
                    imageFlx: scopeObj.view.imgSortAddedOn,
                    clickContainer: scopeObj.view.flxAddedOnSort
                }
            ];
            FormControllerUtility.setSortingHandlers(scopeObj.bulkWireFilesSortMap, scopeObj.onbulkWireFilesSortClickHandler, scopeObj);

        },

        preShow: function() {
            this.view.flxNoTransactions.setVisibility(false);
            this.view.segWireTransfers.setVisibility(true);
            this.view.tablePagination.setVisibility(true);
            this.view.CustomPopup.doLayout = CommonUtilities.centerPopupFlex;
            this.view.btnBulkWireFiles.setVisibility(this.checkAtLeastOnePermission([
                OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_VIEW_BULK_FILES,
                OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_VIEW_BULK_FILES,
                OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_VIEW_BULK_TEMPLATES,
                OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_VIEW_BULK_TEMPLATES
            ]));
            this.disableSearch();
            this.view.flxSearch.Search.txtSearch.text = '';
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter', 'flxMain', 'wireTransferRightbar.flxInfo', 'wireTransferRightbar.flxAddAccountWindow']);
        },
        postShow: function() {
            let scopeObj = this;
            this.view.customheadernew.forceCloseHamburger();
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            this.view.customheadernew.activateMenu("Wire Transfer", "Files & Templates");
            this.view.flxSearch.Search.imgCross.setVisibility(false);
            this.view.TermsAndConditions.lblTermsAndConditions.text = kony.i18n.getLocalizedString("i18n.WireTransfers.TandC");
            this.view.imgSortFileName.toolTip = kony.i18n.getLocalizedString("i18n.bulkwirefiles.sortByFilename");
            this.view.imgSortAddedBy.toolTip = kony.i18n.getLocalizedString("i18n.bulkwirefiles.sortByUsername");
            this.view.imgSortAddedOn.toolTip = kony.i18n.getLocalizedString("i18n.bulkwirefiles.sortByDate");
            this.view.btnBulkWireFiles.toolTip = kony.i18n.getLocalizedString("i18n.wireTransfers.Files&Templates");
            this.view.btnBulkWireFiles.setVisibility(this.checkAtLeastOnePermission([
                OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_VIEW_BULK_FILES,
                OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_VIEW_BULK_FILES,
                OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_VIEW_BULK_TEMPLATES,
                OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_VIEW_BULK_TEMPLATES
            ]));
            if (this.view.btnBulkWireFiles.isVisible === true) {
                this.view.btnBulkWireFiles.onClick = function() {
                    var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
                    var params = {
                        "formName": "frmBulkTransferFiles",
                        "bulkWireCategoryFilter": "All"
                    };
                    wireTransferModule.presentationController.showBulkwirefiles(params);
                }
            }
            this.view.btnBulkWireFiles.text = kony.i18n.getLocalizedString("i18n.wireTransfers.Files&Templates");
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
        showOneTimeTransferInfo: function() {
            var scopeObj = this;
            if (scopeObj.view.AllFormsConfirmDetails.isVisible === false) {
                scopeObj.view.AllFormsConfirmDetails.isVisible = true;
                scopeObj.view.AllFormsConfirmDetails.left = scopeObj.view.flxRightBar.info.frame.x + scopeObj.view.wireTransferRightbar.flxInfo.info.frame.x - 135 + "dp";
                scopeObj.view.AllFormsConfirmDetails.RichTextInfo.text = kony.i18n.getLocalizedString("i18n.WireTransfer.msgInfo2OneTime");
                if (scopeObj.view.wireTransferRightbar.flxAccountInfoForAccountTransfer.isVisible === true) scopeObj.view.AllFormsConfirmDetails.top = scopeObj.view.flxRightBar.info.frame.height - 80 + "dp";
                else scopeObj.view.AllFormsConfirmDetails.top = scopeObj.view.flxRightBar.info.frame.height - 10 + "dp";
                scopeObj.view.forceLayout();
            } else scopeObj.view.AllFormsConfirmDetails.isVisible = false;
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
         * Called on Click of Make Transfer Tab
         */
        onMakeTransferTabClick: function() {
            var scopeObj = this;
            scopeObj.bulkwirefilesPresentationController.showMakeTransferRecipientList();
        },
        /**
         * Called on Click of Recent Tab
         */
        onManageTabClick: function() {
            var scopeObj = this;
            scopeObj.bulkwirefilesPresentationController.showManageRecipientList();
        },
        /**
         * Method to show server error
         * @param {Boolean} status true/false
         */
        showServerError: function(status) {
            if (status === false) {
                this.view.flxDowntimeWarning.setVisibility(false);
            } else {
                this.view.rtxNoPaymentMessage.text = kony.i18n.getLocalizedString("i18n.bulkwires.errorcode.14008");
                this.view.flxNoFiles.setVisibility(false);
                this.view.flxNoTemplates.setVisibility(false);
                this.view.flxNoTransactions.setVisibility(true);
                this.view.flxSortMakeTransfers.setVisibility(false);
                this.view.flxMakeTransferAck.setVisibility(false);
                this.view.segWireTransfers.setVisibility(false);
                this.view.tablePagination.setVisibility(false);
            }
            this.view.forceLayout();
        },

        /**
         * Called on Click of Recent Tab
         */
        onRecentTabClick: function() {
            var scopeObj = this;
            scopeObj.bulkwirefilesPresentationController.showRecentTransactions();
        },
        /** Manages the upcomming flow
         * @param  {object} viewModel object consisting data based on which new flow has to drive
         */
        updateFormUI: function(viewModel) {
            if (viewModel.serverError) {
                this.showServerError(viewModel.serverError);
            } else {
                this.showServerError(false);
                if (viewModel.isLoading === true) {
                    FormControllerUtility.showProgressBar(this.view);
                } else if (viewModel.isLoading === false) {
                    FormControllerUtility.hideProgressBar(this.view);
                }
                if (viewModel.bulkWireFiles) {
                    this.showBulkwirefiles(viewModel.bulkWireFiles, viewModel.config, viewModel.pagination, false, viewModel.bulkWireType);
                }
                if (viewModel.searchBulkWireFiles) {
                    this.showSearchBulkWireFiles(viewModel.searchBulkWireFiles);
                    this.view.tablePagination.setVisibility(false);
                }
                if (viewModel === "errorExternalAccounts") {
                    this.clearSearchText();
                    this.showBulkwirefiles(viewModel);
                }
                if (viewModel.deletionSuccess) {
                    this.deleteTemplateSuccess(viewModel.deletionSuccess);
                }
                if (viewModel.noMoreRecords) {
                    this.showNoMoreRecords()
                }
            }
            this.view.forceLayout();
        },
        deleteTemplateSuccess: function(successMsg) {
            this.view.flxMakeTransferAck.setVisibility(true);
            this.view.rtxMakeTransferError.text = successMsg;
        },
        /** On bulk wire file  Sort click handler.
         * @param  {object} event object
         * @param  {object} data New Sorting Data
         */
        onbulkWireFilesSortClickHandler: function(event, data) {
            var scopeObj = this;
            scopeObj.first = 0;
            var selectedfilter = this.view.LisiBox1.selectedKeyValue;
            var params = {
                'offset': data.offset,
                'sortBy': data.sortBy,
                'bulkWireCategoryFilter': selectedfilter[1]
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
                scopeObj.view.flxSortMakeTransfers.setVisibility(false);
                scopeObj.view.segWireTransfers.setVisibility(false);
                scopeObj.view.tablePagination.setVisibility(false);
                if (this.view.LisiBox1.selectedKeyValue[1] === "All") {
                    scopeObj.view.rtxNoPaymentMessage.text = kony.i18n.getLocalizedString("i18n.BulkWires.Nofilestemplates");
                } else if (this.view.LisiBox1.selectedKeyValue[1] === "Files") {
                    scopeObj.view.rtxNoPaymentMessage.text = kony.i18n.getLocalizedString("i18n.bulkWire.noFiles");
                } else if (this.view.LisiBox1.selectedKeyValue[1] === "Templates") {
                    scopeObj.view.rtxNoPaymentMessage.text = kony.i18n.getLocalizedString("i18n.BulkWires.NoTemplates");
                }
                scopeObj.view.flxNoTransactions.setVisibility(true);
                scopeObj.view.flxNoFiles.setVisibility(false);
                scopeObj.view.flxNoTemplates.setVisibility(false);
                scopeObj.view.forceLayout();
                return;
            }
            scopeObj.showBulkwirefiles(viewModel.bulkWireFiles, viewModel.searchInputs, {}, true, viewModel.bulkWireType);
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
            var selectedfilter = this.view.LisiBox1.selectedKeyValue;
            scopeObj.bulkwirefilesPresentationController.showBulkwirefiles({
                'bulkWireCategoryFilter': selectedfilter[1]
            });
            this.prevSearchText = '';
            this.view.flxSearch.Search.txtSearch.text = '';
            this.view.tablePagination.setVisibility(true);
            this.view.forceLayout();
        },

        /** Searches for a payee */
        onSearchBtnClick: function() {
            var scopeObj = this;
            var searchKeyword = scopeObj.view.flxSearch.Search.txtSearch.text.trim();
            var selectedfilter = this.view.LisiBox1.selectedKeyValue[1];
            if (scopeObj.prevSearchText !== searchKeyword) {
                scopeObj.bulkwirefilesPresentationController.searchBulkWireFiles({
                    'searchKeyword': searchKeyword,
                    'bulkWireCategory': selectedfilter
                });
                scopeObj.prevSearchText = searchKeyword;
            }

        },
        selectFilterOption: function() {
            var scopeObj = this;
            var searchKeyword = scopeObj.view.flxSearch.Search.txtSearch.text.trim();
            var selectedfilter = this.view.LisiBox1.selectedKeyValue;
            if (searchKeyword === "") {
                scopeObj.bulkwirefilesPresentationController.showBulkwirefiles({
                    'searchKeyword': searchKeyword,
                    'bulkWireCategoryFilter': selectedfilter[1]
                });
            } else {
                scopeObj.bulkwirefilesPresentationController.searchBulkWireFiles({
                    'searchKeyword': searchKeyword,
                    'bulkWireCategory': selectedfilter[1]
                });
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



        showBulkwirefiles: function(viewModel, config, pagination, isSearch, Type) {
            var scopeObj = this;
            this.view.flxMakeTransferAck.setVisibility(false);
            scopeObj.setBulkWireFileSearch();
            if (Type === "All") {
                this.view.LisiBox1.selectedKey = this.view.LisiBox1.masterData[0][0];
            } else if (Type === "Files") {
                this.view.LisiBox1.selectedKey = this.view.LisiBox1.masterData[1][0];
            } else if (Type === "Templates") {
                this.view.LisiBox1.selectedKey = this.view.LisiBox1.masterData[2][0];
            }
            var currBreakpoint = kony.application.getCurrentBreakpoint();
            if (currBreakpoint === 640 || orientationHandler.isMobile) {
                this.closedTemplate = "flxBulkWireTransferFilesMobileUnselected";
                this.selectedTemplate = "flxBulkWireTransferFilesMobileSelected";
            } else {
                this.closedTemplate = "flxBulkwireFilesUnSelected";
                this.selectedTemplate = "flxBulkwireFilesSelected";
            }
            if ((viewModel === "errorExternalAccounts") || (viewModel === undefined) || ((viewModel instanceof Array) && viewModel.length === 0)) {
                if (this.view.LisiBox1.selectedKeyValue[1] === "All") {
                    scopeObj.view.flxNoTemplates.top = "220dp";
                    scopeObj.view.rtxNoPaymentMessage.text = kony.i18n.getLocalizedString("i18n.BulkWires.Nofilestemplates");
                    scopeObj.view.flxNoFiles.setVisibility(true);
                    scopeObj.view.flxNoTemplates.setVisibility(true);
					scopeObj.view.flxRowSeperator.setVisibility(false);
                } else if (this.view.LisiBox1.selectedKeyValue[1] === "Files") {
                    scopeObj.view.rtxNoPaymentMessage.text = kony.i18n.getLocalizedString("i18n.bulkWire.noFiles");
                    scopeObj.view.flxNoFiles.setVisibility(true);
                    scopeObj.view.flxNoTemplates.setVisibility(false);
                } else if (this.view.LisiBox1.selectedKeyValue[1] === "Templates") {
                    scopeObj.view.flxNoTemplates.top = "100dp";
                    scopeObj.view.rtxNoPaymentMessage.text = kony.i18n.getLocalizedString("i18n.BulkWires.NoTemplates");
                    scopeObj.view.flxNoFiles.setVisibility(false);
                    scopeObj.view.flxNoTemplates.setVisibility(true);
                }
                this.view.flxNoTransactions.setVisibility(true);
                this.view.flxSortMakeTransfers.setVisibility(false);
                this.view.segWireTransfers.setVisibility(false);
                this.view.tablePagination.setVisibility(false);
            } else {
                // var BulkWireFiles = viewModel.map(this.createBulkWireFileListSegmentsModel);
                var dataMap = {
                    "lblDropdown": "lblDropdown",
                    "lblFilename": "lblFilename",
                    "lblAddedBy": "lblAddedBy",
                    "lblDate": "lblDate",
                    "btnAction": "btnAction",
                    "btnDownload": "btnDownload",
                    "lblLastUsedDate": "lblLastUsedDate",
                    "lblLastUsed": "lblLastUsed",
                    "lblDomesticTitle": "lblDomesticTitle",
                    "lblDomesticValue": "lblDomesticValue",
                    "lblTotalTitle": "lblTotalTitle",
                    "lblTotalValue": "lblTotalValue",
                    "lblInternationalTitle": "lblInternationalTitle",
                    "lblInternationalValue": "lblInternationalValue",
                    "btnViewActivity": "btnViewActivity",
                    "btnOpenFile": "btnOpenFile",
                    "flxDropdown": "flxDropdown",
                    "lblFileName": "lblFileName",
                    "lblIBANNo": "lblIBANNo",
                    "lblAccountHolder": "lblAccountHolder",
                    "lblAccountNumber": "lblAccountNumber",
                    "lblRoutingNumber": "lblRoutingNumber",
                    "lblSwiftCode": "lblSwiftCode",
                    "lblCreatedOn": "lblCreatedOn",
                    "CopylblAccountType0h48c60183cd540": "CopylblAccountType0h48c60183cd540",
                    "lblRecipientName": "lblRecipientName",
                    "lblAccountNumberValue": "lblAccountNumberValue",
                    "lblAccountTypeValue": "lblAccountTypeValue",
                    "lblRoutingNumberValue": "lblRoutingNumberValue",
                    "lblRecurrenceValue": "lblRecurrenceValue",
                    "lblAccountType": "lblAccountType",
                    "flxIdentifier": "flxIdentifier",
                    "lblIdentifier": "lblIdentifier",
                    "lblSeparatorLineActions": "lblSeparatorLineActions",
                    "lblSeparator": "lblSeparator",
                    "lblRowSeparator": "lblRowSeparator",
                    "lblBankDetailsTitle": "lblBankDetailsTitle",
                    "lblBankAddressValue": "lblBankAddressValue"
                };
                var len = Math.min((config.offset + config.limit), viewModel.length) || viewModel.length;
                if (!isSearch) {
                    var paginationtext;
                    if (this.view.LisiBox1.selectedKeyValue[1] === "All") {
                        paginationtext = kony.i18n.getLocalizedString("i18n.wireTransfers.Files&Templates");
                    } else if (this.view.LisiBox1.selectedKeyValue[1] === "Files") {
                        paginationtext = kony.i18n.getLocalizedString("i18n.BulkWires.Files");
                    } else if (this.view.LisiBox1.selectedKeyValue[1] === "Templates") {
                        paginationtext = kony.i18n.getLocalizedString("i18n.BulkWires.Templates");
                    }
                    this.recordsLength = viewModel.length;
                    scopeObj.setPagination({
                        'show': true,
                        'offset': config.offset,
                        'limit': config.limit,
                        'recordsLength': viewModel.length,
                        'text': paginationtext //kony.i18n.getLocalizedString("i18n.konybb.ACH.Files")
                    }, viewModel, config);
                }

                var data = [];
                var i;
                for (i = config.offset || 0; i < len; i++) {
                    if (viewModel[i] !== undefined) {
                        var forUtility = applicationManager.getFormatUtilManager();
                        var configManager = applicationManager.getConfigurationManager();
                        var transactionDate = forUtility.getDateObjectFromCalendarString(viewModel[i].createdts, "YYYY-MM-DD");
                        transactionDate = forUtility.getFormattedSelectedDate(transactionDate);
                        var executionDate = "-";
                        if (viewModel[i].lastExecutedOn != undefined && viewModel[i].lastExecutedOn != "" && viewModel[i].lastExecutedOn != null) {
                            executionDate = forUtility.getDateObjectFromCalendarString(viewModel[i].lastExecutedOn, "YYYY-MM-DD");
                            executionDate = forUtility.getFormattedSelectedDate(executionDate);
                        }
                        var templateName = CommonUtilities.truncateStringWithGivenLength(viewModel[i].bulkWireName, 25);
						if(!(/^([a-zA-Z0-9 ]+)$/.test(templateName)))
			{
				var text1 = templateName.replace(/[^A-Za-z0-9]/g, "");
                templateName = text1;
			}
                        var userName = viewModel[i].firstname + " " + viewModel[i].lastname;
                        var dataObject = {
                            "lblSeparator": " ",
                            "lblRowSeparator": " ",
                            "lblSeparatorLineActions": " ",
                            "lblDropdown": {
                                "text": ViewConstants.FONT_ICONS.CHEVRON_DOWN,
                                "toolTip": kony.i18n.getLocalizedString("i18n.bulkwirefiles.viewFileDetails")
                            },
                            "lblFilename": {
                                "text": templateName,
                                "toolTip": viewModel[i].bulkWireName,
                                "accessibilityconfig": {
                                    "a11yLabel": viewModel[i].bulkWireName,
                                }
                            },
                            "lblAddedBy": {
                                "text": userName,
                                "accessibilityconfig": {
                                    "a11yLabel": userName,
                                }
                            },
                            "lblDate": {
                                "text": transactionDate,
                                "accessibilityconfig": {
                                    "a11yLabel": transactionDate,
                                }
                            },
                            "lblDomesticValue": {
                                "text": viewModel[i].noOfDomesticTransactions,
                                "accessibilityconfig": {
                                    "a11yLabel": viewModel[i].noOfDomesticTransactions,
                                }
                            },
                            "lblInternationalValue": {
                                "text": viewModel[i].noOfInternationalTransactions,
                                "accessibilityconfig": {
                                    "a11yLabel": viewModel[i].noOfInternationalTransactions,
                                }
                            },
                            "lblTotalValue": {
                                "text": viewModel[i].noOfTransactions,
                                "accessibilityconfig": {
                                    "a11yLabel": viewModel[i].noOfTransactions,
                                }
                            },
                            "lblLastUsed": "Last Used On",
                            "lblDomesticTitle": "Domestic Recipients",
                            "lblTotalTitle": "Total Recipients",
                            "lblInternationalTitle": "International Recipients",
                            "lblLastUsedDate": {
                                "text": executionDate,
                                "accessibilityconfig": {
                                    "a11yLabel": executionDate,
                                }
                            },
                            "lblFileName": {
                                "text": CommonUtilities.truncateStringWithGivenLength(viewModel[i].bulkWireName, 25),
                                "accessibilityconfig": {
                                    "a11yLabel": viewModel[i].bulkWireName,
                                }
                            },
                            "lblIBANNo": {
                                "text": viewModel[i].bulkWireID,
                                "accessibilityconfig": {
                                    "a11yLabel": viewModel[i].bulkWireID,
                                }
                            },
                            "lblAccountHolder": "Total Recipients",
                            "lblAccountNumber": "Domestic Recipients",
                            "lblRoutingNumber": "International Recipients",
                            "lblSwiftCode": "Last Used On",
                            "lblCreatedOn": "Created On",
                            "CopylblAccountType0h48c60183cd540": {
                                "text": transactionDate,
                                "accessibilityconfig": {
                                    "a11yLabel": transactionDate,
                                }
                            },
                            "lblRecipientName": {
                                "text": userName,
                                "accessibilityconfig": {
                                    "a11yLabel": userName,
                                }
                            },
                            "lblAccountNumberValue": {
                                "text": viewModel[i].noOfTransactions,
                                "accessibilityconfig": {
                                    "a11yLabel": viewModel[i].noOfTransactions,
                                }
                            },
                            "lblAccountTypeValue": {
                                "text": viewModel[i].noOfDomesticTransactions,
                                "accessibilityconfig": {
                                    "a11yLabel": viewModel[i].noOfDomesticTransactions,
                                }
                            },
                            "lblRoutingNumberValue": {
                                "text": viewModel[i].noOfInternationalTransactions,
                                "accessibilityconfig": {
                                    "a11yLabel": viewModel[i].noOfInternationalTransactions,
                                }
                            },
                            "lblRecurrenceValue": {
                                "text": transactionDate,
                                "accessibilityconfig": {
                                    "a11yLabel": transactionDate,
                                }
                            },
                            "lblAccountType": {
                                "text": transactionDate,
                                "accessibilityconfig": {
                                    "a11yLabel": transactionDate,
                                }
                            },
                            "btnViewActivity": {
                                "text": kony.i18n.getLocalizedString("i18n.bulkWire.viewactivity"),
                                "onClick": this.viewActivity.bind(this, viewModel[i]),
                                "isVisible": this.isViewActivity(viewModel[i])
                            },
                            "btnAction": {
                                "text": kony.i18n.getLocalizedString("i18n.bulkWire.makeBulkTransfer"),
                                "onClick": this.makeBulkTransfer.bind(this, viewModel[i]),
                                "isVisible": this.showBtnTransfer(viewModel[i])
                            },
                            "btnDownload": {
                                "text": kony.i18n.getLocalizedString("i18n.bulkWire.DownloadFile"),
                                "onClick": this.downlaodFile.bind(this, viewModel[i]),
                                "isVisible": viewModel[i].bulkWireCategory == "Files" ? true : false
                            },
                            "btnOpenFile": {
                                "text": viewModel[i].bulkWireCategory == "Files" ? kony.i18n.getLocalizedString("i18n.bulkWire.openfile") : ((currBreakpoint === 640 || orientationHandler.isMobile) ? "View" : "View Details"),
                                "toolTip": viewModel[i].bulkWireCategory == "Files" ? kony.i18n.getLocalizedString("i18n.bulkWire.openfile") : "View Details",
                                "onClick": this.viewTemplate.bind(this, viewModel[i]),
                                "isVisible": this.checkViewDetailsPermission(viewModel[i])

                            },
                            "lblBankDetailsTitle": {
                                "text": kony.i18n.getLocalizedString("i18n.common.Type"),
                                "accessibilityconfig": {
                                    "a11yLabel": "Type",
                                }
                            },
                            "lblBankAddressValue": {
                                "text": viewModel[i].bulkWireCategory,
                                "accessibilityconfig": {
                                    "a11yLabel": viewModel[i].bulkWireCategory,
                                }
                            },
                            "flxDropdown": {
                                "onClick": this.onClickToggle,
                            },
                            "flxIdentifier": "flxIdentifier",
                            //"lblIdentifier": "lblIdentifier",
                            "defaultFromAccount": viewModel[i].defaultFromAccount,
                            "defaultCurrency": viewModel[i].defaultCurrency,
                            "type": viewModel[i].bulkWireCategory,
                            "template": this.closedTemplate
                        };
                        data.push(dataObject);
                    }
                }
                this.view.segWireTransfers.widgetDataMap = dataMap;
                this.view.segWireTransfers.setData(data);
                this.view.flxSortMakeTransfers.setVisibility(true);
                this.view.flxNoTransactions.setVisibility(false);
                this.view.segWireTransfers.setVisibility(true);
                this.view.tablePagination.setVisibility(true);
                FormControllerUtility.updateSortFlex(this.bulkWireFilesSortMap, config);
                this.view.forceLayout();
            }
        },
        isViewActivity: function(rowData) {
            if (rowData.lastExecutedOn == null || rowData.lastExecutedOn == undefined || rowData.lastExecutedOn == rowData.createdts) {
                return false;
            } else {
                if (rowData.bulkWireCategory.toLowerCase() === OLBConstants.BULKWIRE_CATEGORY_FILTER.FILES.toLowerCase()) {
                    return this.checkAtLeastOnePermission([OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_VIEW_BULK_FILES,
                        OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_VIEW_BULK_FILES
                    ]);
                } else {
                    return this.checkAtLeastOnePermission([OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_VIEW_BULK_TEMPLATES,
                        OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_VIEW_BULK_TEMPLATES
                    ]);

                }

            }
        },
        checkViewDetailsPermission: function(rowData) {

            if (rowData.bulkWireCategory.toLowerCase() === OLBConstants.BULKWIRE_CATEGORY_FILTER.FILES.toLowerCase()) {
                if (rowData.noOfInternationalTransactions == 0 && rowData.noOfDomesticTransactions > 0) {
                    return this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_VIEW_BULK_FILES]);
                } else if (rowData.noOfInternationalTransactions > 0 && rowData.noOfDomesticTransactions == 0) {
                    return this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_VIEW_BULK_FILES]);
                } else if (rowData.noOfInternationalTransactions > 0 && rowData.noOfDomesticTransactions > 0) {
                    return (this.checkAtLeastOnePermission([OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_VIEW_BULK_FILES,
                        OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_VIEW_BULK_FILES
                    ]));
                } else if (rowData.noOfInternationalTransactions == 0 && rowData.noOfDomesticTransactions == 0) {
                    return false;
                }
                return false;
            } else {
                if (rowData.noOfInternationalTransactions == 0 && rowData.noOfDomesticTransactions > 0) {
                    return this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_VIEW_BULK_TEMPLATES]);
                } else if (rowData.noOfInternationalTransactions > 0 && rowData.noOfDomesticTransactions == 0) {
                    return this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_VIEW_BULK_TEMPLATES]);
                } else if (rowData.noOfInternationalTransactions > 0 && rowData.noOfDomesticTransactions > 0) {
                    return (this.checkAtLeastOnePermission([OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_VIEW_BULK_TEMPLATES,
                        OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_VIEW_BULK_TEMPLATES
                    ]));
                } else if (rowData.noOfInternationalTransactions == 0 && rowData.noOfDomesticTransactions == 0) {
                    return false;
                }
                return false;
            }


        },
        viewTemplate: function(templateData) {
            if (templateData.bulkWireCategory == "Files") {
                this.openFile(templateData.bulkWireID);
            } else {
                var params = {
                    "bulkWireTemplateID": templateData.bulkWireID
                };
                FormControllerUtility.showProgressBar(this.view);
                templateData.bulkWireTemplateName = templateData.bulkWireName;
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"}).presentationController.setBulkWireTemplateId(params);
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"}).presentationController.setPrimaryDetails(templateData);
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"}).presentationController.fetchRecipientsByTemplateID(params, false);
            }
        },

        showBtnTransfer: function(rowData) {
            if (rowData.bulkWireCategory.toLowerCase() === OLBConstants.BULKWIRE_CATEGORY_FILTER.FILES.toLowerCase()) {
                if (rowData.noOfInternationalTransactions == 0 && rowData.noOfDomesticTransactions > 0) {
                    return this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_VIEW_BULK_FILES,
                        OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_CREATE
                    ]);
                } else if (rowData.noOfInternationalTransactions > 0 && rowData.noOfDomesticTransactions == 0) {
                    return this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_VIEW_BULK_FILES,
                        OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_CREATE
                    ]);
                } else if (rowData.noOfInternationalTransactions > 0 && rowData.noOfDomesticTransactions > 0) {
                    return (this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_VIEW_BULK_FILES,
                        OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_CREATE
                    ]) || this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_VIEW_BULK_FILES,
                        OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_CREATE
                    ]));
                } else if (rowData.noOfInternationalTransactions == 0 && rowData.noOfDomesticTransactions == 0) {
                    return false;
                }
                return false;
            } else {
                if (rowData.noOfInternationalTransactions == 0 && rowData.noOfDomesticTransactions > 0) {
                    return this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_VIEW_BULK_TEMPLATES,
                        OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_CREATE
                    ]);
                } else if (rowData.noOfInternationalTransactions > 0 && rowData.noOfDomesticTransactions == 0) {
                    return this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_VIEW_BULK_TEMPLATES,
                        OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_CREATE
                    ]);
                } else if (rowData.noOfInternationalTransactions > 0 && rowData.noOfDomesticTransactions > 0) {
                    return (this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_VIEW_BULK_TEMPLATES,
                        OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_CREATE
                    ]) || this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_VIEW_BULK_TEMPLATES,
                        OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_CREATE
                    ]));
                } else if (rowData.noOfInternationalTransactions == 0 && rowData.noOfDomesticTransactions == 0) {
                    return false;
                }
                return false;
            }
        },

        checkSpecificPermissions: function(permissionsNeeded, permissionsNotNeeded) {
            return this.checkAllPermissions(permissionsNeeded) && (this.checkAllPermissions(permissionsNotNeeded) == false);
        },

        checkAllPermissions: function(permissions) {
            return permissions.every(this.checkUserPermission);
        },
        checkAtLeastOnePermission: function(permissions) {
            return permissions.some(this.checkUserPermission);
        },

        checkUserPermission: function(permission) {
            return applicationManager.getConfigurationManager().checkUserPermission(permission);
        },

        onClickToggle: function() {
            var scopeObj = this;
            var index = kony.application.getCurrentForm().segWireTransfers.selectedRowIndex;
            var rowIndex = index[1];
            var data = kony.application.getCurrentForm().segWireTransfers.data;
            for (i = 0; i < data.length; i++) {
                if (i == rowIndex) {
                    if (data[i].lblDropdown.text == ViewConstants.FONT_ICONS.CHEVRON_UP) {
                        data[i].lblDropdown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
                        data[i].lblDropdown.toolTip = kony.i18n.getLocalizedString("i18n.bulkwirefiles.viewFileDetails");
                        data[i].template = this.closedTemplate;
                    } else {
                        data[i].lblDropdown.text = ViewConstants.FONT_ICONS.CHEVRON_UP;
                        data[i].lblDropdown.toolTip = kony.i18n.getLocalizedString("i18n.bulkwirefiles.hideFileDetails");
                        data[i].template = this.selectedTemplate;
                    }
                } else {
                    data[i].lblDropdown.text = ViewConstants.FONT_ICONS.CHEVRON_DOWN;
                    data[i].template = this.closedTemplate;
                }
            }
            kony.application.getCurrentForm().segWireTransfers.setData(data);
            kony.application.getCurrentForm().forceLayout();
            //  this.AdjustScreen();
        },

        downlaodFile: function(rowData) {
            var scopeObj = this;
            //  var index = kony.application.getCurrentForm().segWireTransfers.selectedRowIndex;
            //  var rowIndex = index[1];
            var data = kony.application.getCurrentForm().segWireTransfers.data;
            for (i = 0; i < data.length; i++) {
                if (rowData.bulkWireID == data[i].lblIBANNo.text) {
                    fileID = data[i].lblIBANNo.text;
                }
            }
            var params = {
                "bulkWireFileID": fileID
            }
            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"}).presentationController.downloadBulkWireFile(params);
        },

        makeBulkTransfer: function(rowData) {
            var scopeObj = this;
            //  var index = kony.application.getCurrentForm().segWireTransfers.selectedRowIndex;
            //  var rowIndex = index[1];
            var data = kony.application.getCurrentForm().segWireTransfers.data;
            var type = "";
            var templateInfo = "";
            for (i = 0; i < data.length; i++) {
                if (rowData.bulkWireID == data[i].lblIBANNo.text) {
                    fileID = data[i].lblIBANNo.text;
                    fileName = data[i].lblFilename.toolTip;
                    type = data[i].type;
                    templateInfo = data[i];
                }
            }
            if (type.toLowerCase() === OLBConstants.BULKWIRE_CATEGORY_FILTER.FILES.toLowerCase()) {
                var params = {
                    "bulkWireFileID": fileID,
                    "bulkWireFileName": fileName
                }
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"}).presentationController.showBulkWireConfirmTransfer(params);
            } else {
                var param = {
                    "bulkWireID": fileID,
                    "bulkWireName": fileName,
                    "defaultCurrency": templateInfo.defaultCurrency,
                    "defaultFromAccount": templateInfo.defaultFromAccount
                }
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"}).presentationController.showBulkWireEditRecipientTemplate(param);
            }
        },


        openFile: function(bulkWireID) {
            var scopeObj = this;
            //   var index = kony.application.getCurrentForm().segWireTransfers.selectedRowIndex;
            //   var rowIndex = index[1];
            var data = kony.application.getCurrentForm().segWireTransfers.data;
            for (i = 0; i < data.length; i++) {
                if (bulkWireID == data[i].lblIBANNo.text) {
                    fileID = data[i].lblIBANNo.text;
                    fileName = data[i].lblFilename.toolTip;
                    addedBy = data[i].lblAddedBy.text;
                    addedOn = data[i].lblDate.text;
                }
            }
            var params = {
                "bulkWireFileID": fileID,
                "bulkWireFileName": fileName,
                "addedOn": addedOn,
                "addedBy": addedBy
            }

            kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"}).presentationController.showBulkWireLineItems(params);
        },

        viewActivity: function(data) {
            var scopeObj = this;
            var forUtility = applicationManager.getFormatUtilManager();
            var transactionDate = forUtility.getDateObjectFromCalendarString(data.createdts, "YYYY-MM-DD");
            transactionDate = forUtility.getFormattedSelectedDate(transactionDate);
            if (data.bulkWireCategory == "Files") {
                var params = {
                    "bulkWireFileID": data.bulkWireID,
                    "bulkWireFileName": data.bulkWireName,
                    "addedOn": transactionDate,
                    "addedBy": data.firstname + " " + data.lastname,
                    "data": data,
                    "noOfDomesticTransactions": data.noOfDomesticTransactions,
                    "noOfInternationalTransactions": data.noOfInternationalTransactions
                };
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"}).presentationController.showBulkWireTransactions(params, true);
            } else {
                var params = {
                    "bulkWireTemplateID": data.bulkWireID,
                    "bulkWireTemplateName": data.bulkWireName,
                    "addedOn": transactionDate,
                    "addedBy": data.firstname + " " + data.lastname,
                    "data": data,
                    "noOfDomesticTransactions": data.noOfDomesticTransactions,
                    "noOfInternationalTransactions": data.noOfInternationalTransactions
                };
                kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"}).presentationController.showBulkWireTransactions(params, false);
            }
        },
        /**
         * Ui team proposed method to handle screen aligment
         */
        AdjustScreen: function() {
            this.view.forceLayout();
            var mainheight = 0;
            var screenheight = kony.os.deviceInfo().screenHeight;
            mainheight = this.view.flxHeader.info.frame.height + this.view.flxMain.info.frame.height + this.view.flxFooter.info.frame.height;
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
        /**
         * setPagination:   used to set pagination.
         * @param {obejct} data list of records
         * @param {function} previousCallBack -- previous button handler
         * @param {function}  nextCallBack -- next button handler
         */
        setPagination: function(values, viewModel, config, ) {
            var paginationComponent = this.view.tablePagination;
            paginationComponent.setVisibility(true);
            // var recipientDetails = this.getWireTransferModule().presentationController.getwireTransfersTransactions();
            var recipientDetails = this.recordsLength;
            this.view.tablePagination.flxPaginationWrapper.width = "350dp";
            this.view.tablePagination.flxPaginationPrevious.left = "40%";
            this.view.tablePagination.lblPagination.width = "45%";
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
        },

        showNoMoreRecords: function() {
            this.view.tablePagination.flxPaginationNext.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_INACTIVE;
            kony.ui.Alert(kony.i18n.getLocalizedString("i18n.navigation.norecordsfound"));
            FormControllerUtility.hideProgressBar(this.view);
        },

        onBreakpointChange: function(form, width) {
            var scope = this;
            this.view.CustomPopup.onBreakpointChangeComponent(scope.view.CustomPopup, width);
            this.view.CustomPopupLogout.onBreakpointChangeComponent(scope.view.CustomPopupLogout, width);
            FormControllerUtility.setupFormOnTouchEnd(width);
             
            this.view.customheadernew.onBreakpointChangeComponent(width);
            this.view.customfooternew.onBreakpointChangeComponent(width);
            var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
            if (width == 640 || orientationHandler.isMobile) {
                CommonUtilities.setText(this.view.btnMakeTransfer, kony.i18n.getLocalizedString("i18n.hamburger.transfer"), accessibilityConfig);
                CommonUtilities.setText(this.view.btnRecent, kony.i18n.getLocalizedString("i18n.transfers.recent"), accessibilityConfig);
                CommonUtilities.setText(this.view.btnManageRecipient, kony.i18n.getLocalizedString("i18n.transfers.external_accounts"), accessibilityConfig);
                CommonUtilities.setText(this.view.btnBulkWireFiles, kony.i18n.getLocalizedString("i18n.wireTransfers.Files&Templates"), accessibilityConfig);
                // Component not respecting form level values
                this.view.tablePagination.flxPaginationWrapper.width = "87.8%";
                this.view.tablePagination.flxPaginationWrapper.centerX = "50%";
                this.view.tablePagination.lblPagination.width = "80%";
            } else {
                CommonUtilities.setText(this.view.btnMakeTransfer, kony.i18n.getLocalizedString("i18n.billPay.BillPayMakeTransfer"), accessibilityConfig);
                CommonUtilities.setText(this.view.btnRecent, kony.i18n.getLocalizedString("i18n.transfers.recent"), accessibilityConfig);
                CommonUtilities.setText(this.view.btnManageRecipient, kony.i18n.getLocalizedString("i18n.PayAPerson.ManageRecipient"), accessibilityConfig);
                CommonUtilities.setText(this.view.btnBulkWireFiles, kony.i18n.getLocalizedString("i18n.wireTransfers.Files&Templates"), accessibilityConfig);
                // Component not respecting form level values
                this.view.tablePagination.flxPaginationWrapper.width = "350dp";
                this.view.tablePagination.lblPagination.width = "50%";
              	this.view.tablePagination.flxPaginationPrevious.left = "35%";
                //  this.view.tablePagination.flxPaginationWrapper.centerX = undefined;
            }
            this.view.forceLayout();
        }
    };
});