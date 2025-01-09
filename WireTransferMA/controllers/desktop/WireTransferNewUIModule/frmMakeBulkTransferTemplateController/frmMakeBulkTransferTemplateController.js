/************************************************************************************************/
define(["CommonUtilities", "FormControllerUtility", "OLBConstants", "ViewConstants"], function(CommonUtilities, FormControllerUtility, OLBConstants, ViewConstants) {
     
    var orientationHandler = new OrientationHandler();
    return {

        bulkWireTemplate: "CopyflxBulkWireAck0a9900a01ff0944",
        formName: "frmMakeBulkTransferTemplate",

        init: function() {
            var scopeObj = this;
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function() {};
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.btnBack.toolTip = kony.i18n.getLocalizedString("i18n.transfers.Cancel");
            this.view.btnContinue.toolTip = kony.i18n.getLocalizedString("i18n.common.proceed");
            this.setButtonsActions();
            this.view.btnFiles.onClick = function() {
                FormControllerUtility.showProgressBar(this.view);
                var params = {
                    "formName": "frmMakeBulkTransfer",
                    "bulkWireCategoryFilter": "Files"
                };
                scopeObj.loadModule().presentationController.showBulkwirefiles(params);
            }
            this.bulkWireFilesSortMap = [{
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
        },

        preShow: function() {
            var self = this;
            this.view.flxDowntimeWarning.setVisibility(false);
            this.view.onBreakpointChange = function() {
                self.onBreakpointChange(kony.application.getCurrentBreakpoint());
            }
            FormControllerUtility.updateWidgetsHeightInInfo(this.view, ['flxHeader', 'flxFooter']);
        },

        postShow: function() {
            this.view.customheadernew.forceCloseHamburger();
            this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
            this.view.customheadernew.activateMenu("Wire Transfer", "Make Bulk Transfer");
            applicationManager.getNavigationManager().applyUpdates(this);
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
                    this.setTemplatesDate(viewModel.bulkWireFiles, viewModel.config, viewModel.pagination);
                }
                if (viewModel.searchBulkWireFiles) {
                    this.showSearchBulkWireFiles(viewModel.searchBulkWireFiles);
                }
                if (viewModel.noMoreRecords) {
                    this.showNoMoreRecords()
                }
            }
            this.view.forceLayout();
        },

        loadModule: function() {
            return kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
        },

        setButtonsActions: function() {
            var self = this;
            this.view.btnContinue.onClick = function() {
                var data = self.view.segMakeBulkTransfer.data;
                var index = self.view.segMakeBulkTransfer.selectedRowIndex;
                var rowIndex = index[1];
                var bulkWireTemplate = data[rowIndex].templateInfo;
                self.loadModule().presentationController.showBulkWireEditRecipientTemplate(bulkWireTemplate);
            }
            this.view.btnBack.onClick = function() {
                var params = {
                    "formName": "frmBulkTransferFiles",
                    "bulkWireCategoryFilter": OLBConstants.BULKWIRE_CATEGORY_FILTER.ALL
                };
                self.loadModule().presentationController.showBulkwirefiles(params);
            }
        },

        setTemplatesDate: function(data, config, pagination, isSearch) {
            this.setTemplateView();
            this.setTemplateData(data, config, pagination, isSearch);
            this.setBulkWireFileSearch();
        },

        setTemplateView: function() {
            this.view.lblFileName.text = kony.i18n.getLocalizedString("i18n.konybb.common.templateName");
            this.view.lblAddedBy.text = kony.i18n.getLocalizedString("i18n.konybb.Template.CreatedBy");
            this.view.lblAddedOn.text = kony.i18n.getLocalizedString("i18n.konybb.Template.CreatedOn");
            this.view.lblTotalRecipients.text = "Total Recipients"
        },

        filterRecordsOnPermission: function(data) {
            var self = this;
            data.forEach(function(item, index) {
                if (!self.isPermitted(item)) {
                    data.splice(index, 1);
                    index--;
                }
            })
        },

        isPermitted: function(data) {
            var domesticCount = data.noOfDomesticTransactions;
            var internationalCount = data.noOfInternationalTransactions;
            var isDomesticViewPermitted = this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_VIEW]);
            var isInternationalViewPermitted = this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_VIEW]);
            if (domesticCount > 0 && internationalCount === "0") {
                if (isDomesticViewPermitted) {
                    return true;
                }
            }
            if (internationalCount > 0) {
                if (isInternationalViewPermitted) {
                    return true;
                }
            }
            if (internationalCount > 0 && domesticCount > 0) {
                if (isDomesticViewPermitted || isInternationalViewPermitted) {
                    return true;
                }
            }
            return false;
        },
        setTemplateData: function (data, config, pagination, isSearch) {
            var controller = this;
            this.filterRecordsOnPermission(data);
            if (data.length <= 0) {
                this.setNoDataAvailableUI();
            } else {
                var len = Math.min((config.offset + config.limit), data.length) || data.length;
                if (!isSearch) {
                    this.recordsLength = data.length;
                    controller.setPagination({
                        'show': true,
                        'offset': config.offset,
                        'limit': config.limit,
                        'recordsLength': data.length,
                        'text': kony.i18n.getLocalizedString("i18n.BulkWires.Templates")
                    }, data, config);
                }
                var viewModel = [];
                var i;
                if (data.length > 0) {
                    for (i = config.offset || 0; i < len; i++) {
                        if (data[i] !== undefined) {
                            var transactionDate = CommonUtilities.getFrontendDateString(data[i].createdts);
                            var dataObject = {
                                "lblRecipient": {
                                    "text": data[i].bulkWireName ? CommonUtilities.truncateStringWithGivenLength(data[i].bulkWireName, 15) : "-",
                                    "toolTip": data[i].bulkWireName ? CommonUtilities.changedataCase(data[i].bulkWireName) : "-",
                                    "accessibilityconfig": {
                                        "a11yLabel": data[i].bulkWireName ? data[i].bulkWireName : "-",
                                    }
                                },
                                "lblFrom": {
                                    "text": data[i].firstname ? data[i].firstname + " " + data[i].lastname : "-",
                                    "toolTip": data[i].firstname ? data[i].firstname + " " + data[i].lastname : "-",
                                    "accessibilityconfig": {
                                        "a11yLabel": data[i].firstname ? data[i].firstname + " " + data[i].lastname : "-",
                                    }
                                },
                                "lblReferenceID": {
                                    "text": transactionDate ? transactionDate : "-",
                                    "toolTip": transactionDate ? transactionDate : "-",
                                    "accessibilityconfig": {
                                        "a11yLabel": transactionDate ? transactionDate : "-",
                                    }
                                },
                                "lblAmount": {
                                    "text": data[i].noOfTransactions ? data[i].noOfTransactions : "-",
                                    "toolTip": data[i].noOfTransactions ? data[i].noOfTransactions : "-",
                                    "accessibilityconfig": {
                                        "a11yLabel": data[i].noOfTransactions ? data[i].noOfTransactions : "-",
                                    }
                                },
                                "noOfDomesticTransactions": data[i].noOfDomesticTransactions,
                                "noOfInternationalTransactions": data[i].noOfInternationalTransactions,
                                "templateInfo": data[i],
                                "flxDropdown": {
                                    "onClick": controller.onSelection.bind(controller),
                                },
                                "lblDropdown": controller.recordsLength === 1 ? ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO : ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO,
                                "template": controller.bulkWireTemplate
                            };
                            viewModel.push(dataObject);
                        }
                    }
                }
                this.view.segMakeBulkTransfer.widgetDataMap = {
                    "lblDropdown": "lblDropdown",
                    "lblRecipient": "lblRecipient",
                    "lblFrom": "lblFrom",
                    "lblReferenceID": "lblReferenceID",
                    "lblAmount": "lblAmount",
                    "flxDropdown": "flxDropdown",
                    "flxMakeBulkTransfer": "flxMakeBulkTransfer"
                }
                this.view.segMakeBulkTransfer.setData(viewModel);
                if (data.length === 1) {
                    kony.application.getCurrentForm().segMakeBulkTransfer.selectedRowIndex = [0, 0];
                    CommonUtilities.enableButton(this.view.btnContinue);
                } else {
                    CommonUtilities.disableButton(this.view.btnContinue);
                }
                FormControllerUtility.updateSortFlex(this.bulkWireFilesSortMap, config);
                if (data.length === 1) {
                    kony.application.getCurrentForm().segMakeBulkTransfer.selectedIndex = [0, 0];
                    kony.application.getCurrentForm().segMakeBulkTransfer.selectedRowIndex = [0, 0];
                    CommonUtilities.enableButton(this.view.btnContinue);
                } else {
                    CommonUtilities.disableButton(this.view.btnContinue);
                }
                this.view.flxMakeBulkTransfer.setVisibility(true);
                this.view.flxNoRecords.setVisibility(false);
                this.view.flxMakeBulkTransfer.setVisibility(true);
                this.view.flxSort.setVisibility(true);
                this.view.tablePaginationWireTransfer.setVisibility(true);
                this.view.tablePaginationWireTransfer.flxPaginationNext.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_ACTIVE;
                this.view.forceLayout();
                FormControllerUtility.hideProgressBar(this.view);
            }
        },

        setNoDataAvailableUI: function() {
            this.view.flxNoRecords.setVisibility(true);
            this.view.flxMakeBulkTransfer.setVisibility(false);
            this.view.flxSort.setVisibility(false);
            this.view.lblScheduleAPayment.setVisibility(true);
            this.view.lblScheduleAPayment.text = kony.i18n.getLocalizedString("i18n.wireTransfers.CreateNewTemplate");
            this.view.lblScheduleAPayment.onTouchEnd = function() {
                var wireTransferModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "WireTransferNewUIModule","appName" :"WireTransferMA"});
                wireTransferModule.presentationController.resetPrimaryDetails();
                wireTransferModule.presentationController.resetRecipientData();
                wireTransferModule.presentationController.navigateToCreateTemplateForm();
            }
            this.view.lblViewSampleFile.setVisibility(false);
            this.view.tablePaginationWireTransfer.setVisibility(false);
            CommonUtilities.disableButton(this.view.btnContinue);
            this.view.rtxNoRecords.text = kony.i18n.getLocalizedString("i18n.BulkWires.NoTemplates");

        },

        createNewTemplateVisibility: function() {
            return !(kony.application.getCurrentBreakpoint() == 640 || orientationHandler.isMobile) && checkAtLeastOnePermission([
                OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_UPDATE_BULK_TEMPLATES,
                OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_UPDATE_BULK_TEMPLATES
            ])
        },

        checkAtLeastOnePermission: function(permissions) {
            return permissions.some(checkUserPermission);
        },

        showNoMoreRecords: function() {
            this.view.tablePagination.flxPaginationNext.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_INACTIVE;
            kony.ui.Alert(kony.i18n.getLocalizedString("i18n.navigation.norecordsfound"));
            FormControllerUtility.hideProgressBar(this.view);
        },

        onSelection: function() {
            var scopeObj = this;
            var data = this.view.segMakeBulkTransfer.data;
            var index = this.view.segMakeBulkTransfer.selectedRowIndex;
            var rowIndex = index[1];
            var sectionIndex = index[0];
            data.forEach(function(templateData, index) {
                templateData.lblDropdown = ViewConstants.FONT_ICONS.RADIO_BUTTON_UNSELECTED_NUO;
                scopeObj.view.segMakeBulkTransfer.setDataAt(data[index], index, sectionIndex);
            })
            data[rowIndex].lblDropdown = ViewConstants.FONT_ICONS.RADIO_BUTTON_SELECTED_NUO;
            this.view.segMakeBulkTransfer.setDataAt(data[rowIndex], rowIndex, sectionIndex);
            this.view.segMakeBulkTransfer.selectedRowIndex = index;
            if (data[rowIndex].lblAmount.text > 0 && this.isRequiredPermissionAvailable(data[rowIndex])) {
                CommonUtilities.enableButton(this.view.btnContinue);
            } else {
                CommonUtilities.disableButton(this.view.btnContinue);
            }
        },

        isRequiredPermissionAvailable: function(segmentData) {
            var domesticCount = segmentData.noOfDomesticTransactions;
            var internationalCount = segmentData.noOfInternationalTransactions;
            var isDomesticViewPermitted = this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_VIEW]);
            var isInternationalViewPermitted = this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_VIEW]);
            var isDomesticCreatePermitted = this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.DOMESTIC_WIRE_TRANSFER_CREATE]);
            var isInternationalCreatePermitted = this.checkAllPermissions([OLBConstants.BULK_WIRE_PERMISSIONS.INTERNATIONAL_WIRE_TRANSFER_CREATE]);
            if (domesticCount > 0 && internationalCount === "0") {
                if (isDomesticViewPermitted && isDomesticCreatePermitted) {
                    return true;
                }
            }
            if (internationalCount > 0 && domesticCount === "0") {
                if (isInternationalViewPermitted && isInternationalCreatePermitted) {
                    return true;
                }
            }
            if (internationalCount > 0 && domesticCount > 0) {
                if ((isDomesticViewPermitted && isDomesticCreatePermitted) || (isInternationalViewPermitted && isInternationalCreatePermitted)) {
                    return true;
                }
            }
            return false;
        },

        checkAllPermissions: function(permissions) {
            return permissions.every(this.checkUserPermission);
        },

        checkUserPermission: function(permission) {
            return applicationManager.getConfigurationManager().checkUserPermission(permission);
        },

        setPagination: function(values, viewModel, config) {
            var scopeObj = this;
            this.view.tablePaginationWireTransfer.setVisibility(true);
            var offset = values.offset;
            var limit = values.limit || OLBConstants.PAGING_ROWS_LIMIT;
            var recordsLength = values.recordsLength;
            CommonUtilities.setText(this.view.tablePaginationWireTransfer.lblPagination, (offset + 1) + " - " + (offset + recordsLength) + " " + values.text, CommonUtilities.getaccessibilityConfig());
            var recipientDetails = this.recordsLength;
            const lastRecord = Math.min((values.offset + values.limit), recipientDetails);
            this.view.tablePaginationWireTransfer.lblPagination.text = (values.offset + 1) + " - " + lastRecord + " " + values.text;
            if (values.offset !== 0 && values.offset <= recipientDetails - 1) {
                scopeObj.view.tablePaginationWireTransfer.flxPaginationPrevious.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_ACTIVE;
                scopeObj.view.tablePaginationWireTransfer.flxPaginationPrevious.setEnabled(true);
                scopeObj.view.tablePaginationWireTransfer.flxPaginationPrevious.onClick = this.onPrevious.bind(this, values, viewModel, config);
            } else {
                scopeObj.view.tablePaginationWireTransfer.flxPaginationPrevious.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_INACTIVE;
                scopeObj.view.tablePaginationWireTransfer.flxPaginationPrevious.setEnabled(false);
            }
            if (recipientDetails <= 10 || lastRecord > recipientDetails - 1) {
                scopeObj.view.tablePaginationWireTransfer.flxPaginationNext.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_INACTIVE;
                scopeObj.view.tablePaginationWireTransfer.flxPaginationNext.setEnabled(false);
            } else {
                scopeObj.view.tablePaginationWireTransfer.flxPaginationNext.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_ACTIVE;
                scopeObj.view.tablePaginationWireTransfer.flxPaginationNext.setEnabled(true);
                scopeObj.view.tablePaginationWireTransfer.flxPaginationNext.onClick = this.onNext.bind(this, values, viewModel, config);
            }
        },
        onPrevious: function(values, viewModel, config) {
            var recipientDetails = this.recordsLength;
            if (config.offset < recipientDetails) {
                config.offset = config.offset - 10;
            }
            this.setTemplateData(viewModel, config);
        },
        onNext: function(values, viewModel, config) {
            var recipientDetails = this.recordsLength;
            if (config.offset < recipientDetails) {
                config.offset = config.offset + 10;
            }
            this.setTemplateData(viewModel, config);
        },

        setBulkWireFileSearch: function() {
            var scopeObj = this;
            scopeObj.view.flxSearch.setVisibility(true);
            scopeObj.view.flxSearch.Search.imgCross.setVisibility(true);
            scopeObj.view.flxSearch.Search.btnConfirm.onClick = scopeObj.onSearchBtnClick.bind(scopeObj);
            scopeObj.view.flxSearch.Search.flxClearBtn.onClick = scopeObj.onSearchClearBtnClick.bind(scopeObj);
            scopeObj.view.flxSearch.Search.txtSearch.onKeyUp = scopeObj.onTxtSearchKeyUp.bind(scopeObj);
        },

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

        showSearchBulkWireFiles: function(viewModel) {
            var scopeObj = this;
            if (viewModel.bulkWireFiles.length === 0) {
                scopeObj.view.flxSort.setVisibility(false);
                scopeObj.view.flxMakeBulkTransfer.setVisibility(false);
                scopeObj.view.tablePaginationWireTransfer.setVisibility(false);
                scopeObj.view.flxNoRecords.setVisibility(true);
                scopeObj.view.lblScheduleAPayment.setVisibility(false);
                scopeObj.view.lblViewSampleFile.setVisibility(false);
                scopeObj.view.flxbtn.setVisibility(false);
                scopeObj.view.forceLayout();
                return;
            } else {
                scopeObj.setTemplateData(viewModel.bulkWireFiles, viewModel.searchInputs, {}, true);
                scopeObj.view.tablePaginationWireTransfer.setVisibility(false);
            }
        },

        clearSearchText: function() {
            this.prevSearchText = '';
            this.view.flxSearch.Search.txtSearch.text = '';
            this.disableSearch();
            this.view.flxSort.setVisibility(true);
            this.view.tablePaginationWireTransfer.setVisibility(true);
            this.view.forceLayout();
        },

        disableSearch: function() {
            this.view.flxSearch.Search.flxClearBtn.setVisibility(false);
        },

        enableSearch: function() {
            this.view.flxSearch.Search.flxClearBtn.setVisibility(true);
        },

        onSearchBtnClick: function() {
            var scopeObj = this;
            var searchKeyword = scopeObj.view.flxSearch.Search.txtSearch.text.trim();
            if (scopeObj.prevSearchText !== searchKeyword) {
                scopeObj.loadModule().presentationController.searchBulkWireFiles({
                    "searchKeyword": searchKeyword,
                    "formName": "frmBulkTransferFiles",
                    "bulkWireCategory": OLBConstants.BULKWIRE_CATEGORY_FILTER.TEMPLATES
                });
                scopeObj.prevSearchText = searchKeyword;
            }
        },

        onSearchClearBtnClick: function() {
            var scopeObj = this;
            var params = {
                "formName": this.formName,
                "bulkWireCategoryFilter": OLBConstants.BULKWIRE_CATEGORY_FILTER.TEMPLATES
            };
            scopeObj.view.flxSearch.Search.flxClearBtn.setVisibility(false);
            scopeObj.loadModule().presentationController.showBulkwirefiles(params);
            this.prevSearchText = '';
            this.view.flxSearch.Search.txtSearch.text = '';
            this.view.flxbtn.setVisibility(true);
            this.view.forceLayout();
        },

        onbulkWireFilesSortClickHandler: function(event, data) {
            var scopeObj = this;
            scopeObj.first = 0;
            data.formName = this.formName,
                data.bulkWireCategoryFilter = OLBConstants.BULKWIRE_CATEGORY_FILTER.TEMPLATES
            scopeObj.loadModule().presentationController.showBulkwirefiles(data);
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

    };
});