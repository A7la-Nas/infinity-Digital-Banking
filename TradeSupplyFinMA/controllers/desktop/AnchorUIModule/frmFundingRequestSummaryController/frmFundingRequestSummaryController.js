define(["ViewConstants", "CommonUtilities", "SCFUtils"], function (ViewConstants, CommonUtilities, SCFUtils) {
    let scope, presenter, contentScope, contentPopupScope, breakpoint, fundingRequestData, documentDetails, invoicedata,
        listData, listParams = {
            sortByParam: "",
            sortOrder: ""
        };
    const fontIcons = {
        'chevronUp': 'P',
        'chevronDown': 'O',
    },
        NA = kony.i18n.getLocalizedString("i18n.common.NA"),
        skins = {
            'pageEnabled': 'sknOLBFonts003e7512px',
            'pageDisabled': 'sknLblFontTypeIcona0a0a012px',
        },
        images = {
            'sortAsc': ViewConstants.IMAGES.SORT_PREV_IMAGE,
            'sortDesc': ViewConstants.IMAGES.SORT_NEXT_IMAGE,
            'noSort': ViewConstants.IMAGES.SORT_FINAL_IMAGE
        };
    return {
        /**
         * Sets the initial actions for form.
         */
        init: function () {
            this.view.preShow = this.preShow;
            this.view.postShow = this.postShow;
            this.view.onDeviceBack = function () { };
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.formTemplate12.onError = this.onError;
            this.initFormActions();
        },
        onNavigate: function () {
            breakpoint = kony.application.getCurrentBreakpoint();
        },
        onBreakpointChange: function (form, width) {
            breakpoint = kony.application.getCurrentBreakpoint();
        },
        /**
         * Performs the actions required before rendering form.
         */
        preShow: function () {
            fundingRequestData = JSON.parse(JSON.stringify(presenter.fundingRequest.data));
            documentDetails = fundingRequestData.fundingDocuments;
            invoicedata = fundingRequestData.invoiceReferences;
            this.view.formTemplate12.hideBannerError();
            contentScope.flxReturnRequestReason.setVisibility(false);
            contentScope.flxMainContent.top = "0dp";
            if (fundingRequestData.status === presenter.fundingStatus.ReturnedByBank) {
                contentScope.flxReturnRequestReason.setVisibility(true);
                contentScope.flxMainContent.top = "20dp";
            }
        },
        /**
         * Performs the actions required after rendering form.
         */
        postShow: function () {
            applicationManager.getNavigationManager().applyUpdates(this);
            let roadmapData = [];
            for (const [key, value] of Object.entries(presenter.fundingRequest.roadmap)) {
                roadmapData.push({
                    'isCurrentRow': key === 'step4',
                    'rowStatus': fundingRequestData[key] === 'done' ? 'done' : key === 'step4' ? 'Inprogress' : 'Incomplete',
                    'rowLabel': value.text,
                    'rowForm': value.form
                });
            }
            contentScope.ProgressTracker.setData({
                'heading': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.fundingRequest'),
                'subheading': `${kony.i18n.getLocalizedString('i18n.serviceRequests.ReferenceNo')} ${fundingRequestData.fundingRequestId || ''}`,
                'data': roadmapData
            });
            this.resetForm();
        },
        /**
         * Method to initialise form actions.
         */
        initFormActions: function () {
            scope = this;
            presenter = applicationManager.getModulesPresentationController({
                appName: 'TradeSupplyFinMA',
                moduleName: 'AnchorUIModule'
            });
            contentScope = this.view.formTemplate12.flxContentTCCenter;
            contentPopupScope = this.view.formTemplate12.flxContentPopup;
            contentScope.btnFREdit.onClick = () => {
                delete presenter.fundingRequest.data['step3'];
                delete presenter.fundingRequest.data['step2'];
                delete presenter.fundingRequest.data['step1'];
                presenter.showView({
                    'form': 'frmFundingRequestDetails'
                });
            }
            contentScope.btnIDEdit.onClick = () => {
                delete presenter.fundingRequest.data['step3'];
                delete presenter.fundingRequest.data['step2'];
                presenter.showView({
                    'form': 'frmInvoiceDetails'
                });
            }
            contentScope.btnDDEdit.onClick = () => {
                delete presenter.fundingRequest.data['step3'];
                presenter.showView({
                    'form': 'frmFundingRequestDocuments'
                });
            }
            contentScope.btnBack.onClick = () => {
                delete presenter.fundingRequest.data['step3'];
                presenter.showView({
                    'form': 'frmFundingRequestDocuments'
                });
            }
            contentScope.btnSubmit.onClick = () => scope.createFundingRequest();
            contentScope.btnClose.onClick = () => scope.toggleClosePopup(true);
            contentPopupScope.flxCross.onClick = () => scope.toggleClosePopup(false);
            contentPopupScope.btnClosee.onClick = () => scope.backToDashbord();
            contentPopupScope.btnDraft.onClick = () => scope.saveAsDraft();
            contentScope.flxDropdown1.onClick = this.toggleDropdown.bind(this, contentScope.flxFRDetails, contentScope.imgDropdown1);
            contentScope.flxDropdown2.onClick = this.toggleDropdown.bind(this, contentScope.flxInvoiceSegment, contentScope.imgDropdown2);
            contentScope.flxDropdown3.onClick = this.toggleDropdown.bind(this, contentScope.flxDocumentSection, contentScope.imgDropdown3);
            [
                contentScope.flxDropdown1,
                contentScope.flxDropdown2,
                contentScope.flxDropdown3,
                contentScope.flxPageStart,
                contentScope.flxPagePrevious,
                contentScope.flxPageNext,
                contentScope.flxPageEnd,
                contentPopupScope.flxCross
            ].forEach(w => w.cursorType = 'pointer');
            contentScope.flxRequestDocument.setVisibility(false);
            contentScope.flxSettlementInstructionDocument.setVisibility(false);
            contentScope.flxReceivablesDocument.setVisibility(false);
            contentScope.flxOtherDocument.setVisibility(false);
            contentScope.flxPageStart.onClick = this.applyPagination.bind(this, 'start');
            contentScope.flxPagePrevious.onClick = this.applyPagination.bind(this, 'previous');
            contentScope.flxPageNext.onClick = this.applyPagination.bind(this, 'next');
            contentScope.flxPageEnd.onClick = this.applyPagination.bind(this, 'end');
        },
        /**
         * Entry point method for the form controller.
         * @param {Object} viewModel - Specifies the set of view properties and keys.
         */
        updateFormUI: function (viewModel) {
            if (viewModel.isLoading === true) {
                this.view.formTemplate12.showLoading();
            } else if (viewModel.isLoading === false) {
                this.view.formTemplate12.hideLoading();
            }
            if (viewModel.serverError) {
                this.view.formTemplate12.setBannerFocus();
                this.view.formTemplate12.showBannerError({
                    'dbpErrMsg': viewModel.serverError
                });
            }
        },
        /**
         * @api : setsegInvoiceingWidgetDataMap
         * This function for setting widgetDataMap for segment
         * @param : name of the segment.
         * @return : NA
         */
        setInvoiceData: function () {
            const start = parseInt(currentPage - 1 + "0"),
                end = start + 10;
            paginatedRecords = (listData || []).slice(start, end);
            let segData = [],
                segRowData = [];
            previousIndex = undefined;
            for (const record of paginatedRecords) {
                segRowData.push({
                    'lblDropdown': fontIcons.chevronDown,
                    'flxDashboardListRow': {
                        'skin': 'sknflxffffffnoborder'
                    },
                    "flxDetails": {
                        "isVisible": false
                    },
                    "flxCheckbox": {
                        "isVisible": false,
                    },
                    "flxIdentifier": {
                        "skin": "slFbox"
                    },
                    "flxDropdown": {
                        "onClick": this.handleSegmentRowView
                    },
                    'flxColumn1': {
                        'width': '21%',
                    },
                    'flxColumn2': {
                        'width': '24%'
                    },
                    'flxColumn3': {
                        'width': '24%'
                    },
                    'flxAction': {
                        "isVisible": false,
                    },
                    'flxColumn4': {
                        'reverseLayoutDirection': true,
                        "isVisible": true,
                        'width': '20%',
                    },
                    'flxRow4': {
                        "isVisible": true,
                    },
                    'flxRow5': {
                        "isVisible": true,
                    },
                    'lblColumn1': record.supplierName || '',
                    'lblColumn2': record.buyerName || '',
                    'lblColumn3': record.invoiceReference || '',
                    'lblColumn4': {
                        'text': `${presenter.configurationManager.getCurrency(record.invoiceCurrency)}${presenter.formatUtilManager.formatAmount(record.invoiceAmount)}`,
                        'right': '40dp'
                    },
                    'lblRow1Key': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.buyerIDWithColon'),
                    'lblRow1Value': record.buyerId || '',
                    'lblRow2Key': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.supplierIDWithColon'),
                    'lblRow2Value': record.supplierId || '',
                    'lblRow3Key': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.CreationDateWithColon'),
                    'lblRow3Value': record.issueDate || '',
                    'lblRow4Key': kony.i18n.getLocalizedString('i18n.Wealth.maturityDate'),
                    'lblRow4Value': record.maturityDate || '',
                    'lblRow5Key': kony.i18n.getLocalizedString('i18n.wealth.statuswithColon'),
                    'lblRow5Value': record.status || ''
                });
            }
            segData.push([{
                'flxColumn1': {
                    'width': '21%',
                    'onClick': function (context) {
                        listParams['sortByParam'] = 'supplierName';
                        scope.getListData(context)
                    }
                },
                'flxColumn2': {
                    'width': '21%',
                    'onClick': function (context) {
                        listParams['sortByParam'] = 'buyerName';
                        scope.getListData(context)
                    }
                },
                'flxColumn3': {
                    'left': '3%',
                    'width': '21.5%',
                    'onClick': function (context) {
                        listParams['sortByParam'] = 'invoiceReference';
                        scope.getListData(context)
                    }
                },
                'flxColumn4': {
                    'isVisible': true,
                    'left': '3%',
                    'width': '21.5%',
                    'onClick': function (context) {
                        listParams['sortByParam'] = 'invoiceAmount';
                        scope.getListData(context)
                    }
                },
                'lblColumn1': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.supplierName'),
                'lblColumn2': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.buyerName'),
                'lblColumn3': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.InvoiceReference'),
                'lblColumn4': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.invoiceAmount'),
                'imgColumn1': {
                    'src': scope.getSortImage('supplierName')
                },
                'imgColumn2': {
                    'src': scope.getSortImage('buyerName')
                },
                'imgColumn3': {
                    'src': scope.getSortImage('invoiceReference')
                },
                'imgColumn4': {
                    'src': scope.getSortImage('invoiceAmount')
                },
            }, segRowData]);
            contentScope.segInvoice.setData(segData);
            contentScope.flxInvoiceSegment.forceLayout();
        },
        /**
         * Returns the sort image.
         * @param {string} sortBy - Specifies the sort by field name.
         * @returns {string} - Sort image name.
         */
        getSortImage: function (sortBy) {
            return listParams['sortByParam'] === sortBy ? (listParams['sortOrder'] === 'ASC' ? images.sortAsc : images.sortDesc) : images.noSort
        },
        handleSegmentRowView: function () {
            const rowIndex = contentScope.segInvoice.selectedRowIndex[1];
            const data = contentScope.segInvoice.data[0][1][rowIndex];
            const previousIndexData = contentScope.segInvoice.data[0][1][previousIndex];
            const collapsedView = [fontIcons.chevronDown, false, "slFbox", "sknflxffffffnoborder"];
            const expandedView = [fontIcons.chevronUp, true, "skbflx293276", "ICSknFlxfbfbfb"];
            if (previousIndex === rowIndex) {
                this.toggleSegmentRowView(data, rowIndex, data.lblDropdown === fontIcons.chevronUp ? collapsedView : expandedView);
            } else {
                if (previousIndex >= 0) {
                    this.toggleSegmentRowView(previousIndexData, previousIndex, collapsedView);
                }
                this.toggleSegmentRowView(data, rowIndex, expandedView);
            }
            previousIndex = rowIndex;
        },
        /**
         * Toggles the segment row view.
         * @param {Array} data - Data of segent row.
         * @param {Number} index - Index of segment row to toggle.
         * @param {Array} viewData - Data which need to be assigned to toggled view.
         */
        toggleSegmentRowView: function (data, index, viewData) {
            data['lblDropdown'] = viewData[0];
            data['flxDetails'].isVisible = viewData[1];
            data['flxIdentifier'].skin = viewData[2];
            data['flxDashboardListRow'].skin = viewData[3];
            contentScope.segInvoice.setDataAt(data, index, 0);
        },
        getListData: function (context) {
            if (context) {
                const widgetSrc = context.widgets()[1].src;
                listParams['sortOrder'] = (widgetSrc === images.noSort) ? 'ASC' : (widgetSrc === images.sortAsc) ? 'DESC' : 'ASC';
            }
            listData = SCFUtils.sortRecords(listData, listParams);
            this.setInvoiceData();
        },
        applyPagination: function (pageFlow) {
            if (totalPages === 0) {
                return;
            }
            switch (pageFlow) {
                case 'previous':
                    if (currentPage === 1) {
                        return;
                    }
                    currentPage--;
                    break;
                case 'next':
                    if (totalPages === currentPage) {
                        return;
                    }
                    currentPage++;
                    break;
                case 'start':
                    if (currentPage === 1) {
                        return;
                    }
                    currentPage = 1;
                    break;
                case 'end':
                    if (currentPage === totalPages) {
                        return;
                    }
                    currentPage = totalPages;
                    break;
            }
            this.setPagination();
            this.setInvoiceData();
        },
        setPagination: function () {
            contentScope.lblPageText.text = `${currentPage} - ${totalPages} ${kony.i18n.getLocalizedString('i18n.konybb.Common.Pages')}`;
            contentScope.lblPageStartIcon.skin = currentPage === 1 ? skins.pageDisabled : skins.pageEnabled;
            contentScope.lblPagePreviousIcon.skin = currentPage > 1 ? skins.pageEnabled : skins.pageDisabled;
            contentScope.lblPageNextIcon.skin = currentPage < totalPages ? skins.pageEnabled : skins.pageDisabled;
            contentScope.lblPageEndIcon.skin = currentPage === totalPages ? skins.pageDisabled : skins.pageEnabled;
        },
        /**
         * Resets the form.
         */
        resetForm: function () {
            isSearchApplied = false;
            listData = invoicedata
            listParams['sortOrder'] = 'ASC';
            totalPages = Math.ceil(listData.length / 10);
            currentPage = totalPages === 0 ? 0 : 1;
            listParams['sortByParam'] = 'supplierId';
            scope.setPagination();
            scope.getListData();
            this.setInvoiceData();
            this.setFRDetails();
            this.setDocumentDetails();
        },
        setFRDetails: function () {
            let segData = [];
            contentScope.segFRDetails.widgetDataMap = {
                'flxValue': 'flxValue',
                'lblKey': 'lblKey',
                'lblValue': 'lblValue'
            };
            contentScope.segFRDetails.setData([{
                lblKey: kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.facilityIDWithColon'),
                lblValue: fundingRequestData.facilityId
            }, {
                lblKey: kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.programNameWithColon'),
                lblValue: fundingRequestData.programName
            }, {
                lblKey: kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.facilityAvailableLimitWithColon'),
                lblValue: `${presenter.configurationManager.getCurrency(fundingRequestData.currency)}${presenter.formatUtilManager.formatAmount(fundingRequestData.facilityAvailableLimit)}`,
            }, {
                lblKey: kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.facilityUtilisedLimitWithColon'),
                lblValue: `${presenter.configurationManager.getCurrency(fundingRequestData.currency)}${presenter.formatUtilManager.formatAmount(fundingRequestData.facilityUtilisedLimit)}`,
            }, {
                lblKey: kony.i18n.getLocalizedString('i18n.CardManagement.productName'),
                lblValue: fundingRequestData.productName || NA
            }, {
                lblKey: kony.i18n.getLocalizedString('i18n.wealth.currencyColon'),
                lblValue: fundingRequestData.currency || NA
            }, {
                lblKey: kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.fundingRequestAmountWithColon'),
                lblValue: `${presenter.configurationManager.getCurrency(fundingRequestData.currency)}${presenter.formatUtilManager.formatAmount(fundingRequestData.fundingRequestAmount)}`,
            },]);
        },
        processDocumentDetails: function (documents, content, label, image, list, replica) {
            contentScope[content].setVisibility(false);
            list.widgets().forEach(widget => {
                if (widget && widget.id.startsWith('doc')) {
                    list.remove(widget);
                }
            });
            if (documents.length > 0) {
                contentScope[content].setVisibility(true);
                label.text = documents[0].documentName;
                image.src = SCFUtils.getDocumentImages(documents[0].documentName.split('.').pop());
                replica.onClick = () => presenter.downloadDocument(documents[0].documentReference, kony.application.getCurrentForm().id)
                replica.cursorType = 'pointer';
                documents.slice(1).forEach((document, i) => {
                    list.remove(contentScope[replica.clone("doc" + i).id])
                    list.add(replica.clone("doc" + i));
                    contentScope["doc" + i + replica.id].onClick = () => presenter.downloadDocument(document.documentReference, kony.application.getCurrentForm().id)
                    contentScope[["doc" + i + replica.id]].cursorType = 'pointer';
                    contentScope["doc" + i + label.id].text = document.documentName;
                    contentScope["doc" + i + image.id].src = SCFUtils.getDocumentImages(document.documentName.split('.').pop());
                });
            }
        },
        setDocumentDetails: function () {
            let documents = Object.keys(documentDetails)
            if (documents.length > 0) {
                documents.forEach(detail => {
                    this.setdocs(documentDetails[detail], detail);
                });
            }
        },
        setdocs: function (docs, clonedId) {
            contentScope.flxListOfDocs.widgets().forEach(widget => {
                if (widget && widget.id.startsWith('doc')) {
                    contentScope.flxListOfDocs.remove(widget);
                }
            });
            contentScope.flxDocumentSection.remove(contentScope[(contentScope.flxRequestDocument.clone(clonedId)).id])
            if (docs.length > 0) {
                contentScope.flxDocumentSection.add(contentScope.flxRequestDocument.clone(clonedId));
                contentScope[clonedId + "lblHeader1"].text = scope_configManager.SCF_Document_category.find(item => item.key === clonedId).displayName;
                this.processDocumentDetails(docs, contentScope.flxRequestDocument.clone(clonedId).id, contentScope[clonedId + "lblDocName"], contentScope[clonedId + "imgDocType"], contentScope[clonedId + "flxListOfDocs"], contentScope[clonedId + "flxDocRD"]);
            }
        },
        /**
         * Sets the height of tags container.
         * @param {number} height - Specifies the height.
         */
        setTagsContainerHeight: function (height) {
            contentScope.flxListOfDocs.height = `${height + 20}dp`;
            contentScope.flxDocumentSection.forceLayout();
        },
        toggleDropdown: function (flxDropdownList, lblDropdownIcon) {
            if (flxDropdownList.isVisible) {
                flxDropdownList.setVisibility(false);
                lblDropdownIcon.text = fontIcons.chevronDown;
            } else {
                flxDropdownList.setVisibility(true);
                lblDropdownIcon.text = fontIcons.chevronUp;
            }
        },
        downloadDocument: function (id) { },
        cloneOtherDocs: function () {
            contentScope.flxDocumentDetails.add(contentScope.flxDocumentSection.clone("doc"));
        },
        /**
         * Toggles the advance search popup.
         * @param {boolean} visibility - Specfies whether to show/hide advance search popup.
         * @returns {void} - Returns nothing if visibility is false.
         */
        toggleClosePopup: function (visibility) {
            contentPopupScope.setVisibility(visibility);
        },
        backToDashbord: function () {
            this.toggleClosePopup(false);
            presenter.loadScreenWithContext({
                'context': 'anchorDashboard'
            });
        },
        saveAsDraft: function () {
            this.toggleClosePopup(false);
            flow = 'saveDraftOrClose';
            presenter.saveFundingRequest({
                'form': this.view.id,
                flow
            });
        },
        createFundingRequest: function () {
            presenter.submitFundingRequest({
                'form': this.view.id
            });
        },
        /**
         * Handles the errors.
         */
        onError: function (err) {
            kony.print(JSON.stringify(err));
        }
    };
});