define(["ViewConstants", "CommonUtilities", "FormControllerUtility", "SCFUtils"], function (ViewConstants, CommonUtilities, FormControllerUtility, SCFUtils) {
  let scope, presenter, invoicePresenter, paymentAllocationPresenter, contentScope, popupScope, breakpoint, previousIndex, programData, assignedReceivablesData, receivablesApprovedForFundingData,
    paymentAllocationsData, myInvoices, totalPages, currentPage, tabSelected = 1, requestedPaymentAllocationList,
    selectAll = false, isSbaEnabled = false, sbaDetails,
    isSearchApplied, searchCriteria, tagsData,
    listData, listParams = {
      sortByParam: "",
      sortOrder: ""
    };
  const fontIcons = {
    'chevronUp': 'P',
    'chevronDown': 'O',
    'checkboxSelected': '\uE926',
    'checkboxUnselected': '\uE924'
  },
    skins = {
      'checkboxSelected': 'sknLbl003e75InfinityIcons20px',
      'checkboxUnselected': 'sknLbl647277InfinityIcons20px',
      'pageEnabled': 'sknOLBFonts003e7512px',
      'pageDisabled': 'sknLblFontTypeIcona0a0a012px',
    },
    images = {
      'sortAsc': ViewConstants.IMAGES.SORT_PREV_IMAGE,
      'sortDesc': ViewConstants.IMAGES.SORT_NEXT_IMAGE,
      'noSort': ViewConstants.IMAGES.SORT_FINAL_IMAGE
    },
    calendars = [{
      start: 'calInvoiceStartDate',
      end: 'calInvoiceEndDate'
    }, {
      start: 'calFinancedStartDate',
      end: 'calFinancedEndDate'
    }, {
      start: 'calMaturityStartDate',
      end: 'calMaturityEndDate'
    }, {
      start: 'calCreationStartDate',
      end: 'calCreationEndDate'
    }, {
      start: 'calMaturityStartDate1',
      end: 'calMaturityEndDate2'
    }, {
      start: 'cal1ASF5T3',
      end: 'cal2ASF5T3'
    }];
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
      if (breakpoint == 1024) {
        ['flxProgram', 'flxNeedAttention', 'flxList', 'flxQuickLinks', 'flxMyInvoices'].forEach(widget => {
          contentScope[widget].width = "100%";
        });
      }
    },
    /**
     * Performs the actions required before rendering form.
     */
    preShow: function () {
      programData = presenter.counterpartyProgramList;
      assignedReceivablesData = presenter.counterpartyAssignedReceivables;
      receivablesApprovedForFundingData = presenter.counterpartyReceivablesApprovedForFunding;
      popupScope.flxAdvancedSearch.doLayout = CommonUtilities.centerPopupFlex;
    },
    /**
     * Performs the actions required after rendering form.
     */
    postShow: function () {
      applicationManager.getNavigationManager().applyUpdates(this);
      this.resetForm();
      contentScope.flxProgram.doLayout = function () {
        let height = 20 + contentScope.flxProgram.frame.height;
        if (breakpoint === 1024) {
          contentScope.flxNeedAttention.top = height + "dp";
        } else {
          contentScope.flxList.top = height + "dp";
        }
      }.bind(this);
      if (breakpoint === 1024) {
        contentScope.flxNeedAttention.doLayout = function () {
          contentScope.flxQuickLinks.top = contentScope.flxNeedAttention.frame.y + 220 + "dp";
        }.bind(this);
        contentScope.flxQuickLinks.doLayout = function () {
          contentScope.flxMyInvoices.top = contentScope.flxQuickLinks.frame.y + 183 + "dp";
        }.bind(this);
        contentScope.flxMyInvoices.doLayout = function () {
          contentScope.flxList.top = contentScope.flxMyInvoices.frame.y + 430 + "dp";
        }.bind(this);
      }
      if (presenter.configurationManager.isMicroAppPresent(presenter.configurationManager.microappConstants.SMARTBANKINGADVISORY)) {
        this.getSbaDetails();
      }
    },
    /**
     * Method to initialise form actions.
     */
    initFormActions: function () {
      scope = this;
      presenter = applicationManager.getModulesPresentationController({
        appName: 'TradeSupplyFinMA',
        moduleName: 'CounterPartyUIModule'
      });
      paymentAllocationPresenter = applicationManager.getModulesPresentationController({
        'appName': 'TradeSupplyFinMA',
        'moduleName': 'PaymentAllocationUIModule'
      });
      invoicePresenter = applicationManager.getModulesPresentationController({ appName: 'TradeSupplyFinMA', moduleName: 'InvoicesUIModule' });
      contentScope = this.view.formTemplate12.flxContentTCCenter;
      popupScope = this.view.formTemplate12.flxContentPopup;
      [
        contentScope.flxClearSearchPG,
        contentScope.flxPageStart,
        contentScope.flxPagePrevious,
        contentScope.flxPageNext,
        contentScope.flxPageEnd,
        contentScope.flxQL1,
        contentScope.flxQL2,
        contentScope.flxQL3,
        contentScope.flxDownloadIcon,
        contentScope.flxASRAction1,
        contentScope.flxASRAction2,
        popupScope.flxCross
      ].forEach(w => w.cursorType = 'pointer');
      contentScope.btnTab1.onClick = scope.tabClick.bind(this, 1, 'invoiceReference');
      contentScope.btnTab2.onClick = scope.tabClick.bind(this, 2, 'invoiceReference');
      contentScope.btnTab3.onClick = () => {
        contentScope.flxLoadingList.setVisibility(true);
        contentScope.flxContainerList.setVisibility(false);
        presenter.fetchPaymentAllocationData(this.view.id);
      };
      contentScope.tbxSearchPG.onTextChange = () => contentScope.flxClearSearchPG.setVisibility(contentScope.tbxSearchPG.text !== '');
      contentScope.tbxSearchPG.onKeyUp = this.searchProgram;
      contentScope.flxQL1.onClick = () => invoicePresenter.loadScreenWithContext({
        'context': 'invoiceUpload',
        'uploader': 'counterparty'
      });
      const closePopup = () => scope.toggleAdvanceSearchPopup(false);
      contentScope.btnAdvancedSearch.onClick = () => scope.toggleAdvanceSearchPopup(true);
      popupScope.flxCross.onClick = closePopup;
      popupScope.btnCancel.onClick = closePopup;
      popupScope.btnSearch.onClick = this.performSearch;
      contentScope.flxASRAction1.onClick = () => scope.toggleAdvanceSearchPopup(true);
      contentScope.flxASRAction2.onClick = () => {
        isSearchApplied = false;
        listData = tabSelected === 1 ? assignedReceivablesData : (tabSelected === 2 ? receivablesApprovedForFundingData : paymentAllocationsData);
        totalPages = Math.ceil(listData.length / 10);
        currentPage = totalPages === 0 ? 0 : 1;
        contentScope.flxListSearchContainer.setVisibility(true);
        contentScope.flxListSearchResults.setVisibility(false);
        scope.setPagination();
        scope.getListData();
      };
      contentScope.flxClearSearchPG.onClick = () => {
        contentScope.tbxSearchPG.text = '';
        contentScope.flxClearSearchPG.setVisibility(false);
        scope.searchProgram();
      };
      popupScope.calInvoiceStartDate.onSelection = this.enableStartDate.bind(this, calendars[0].start, calendars[0].end);
      popupScope.calInvoiceEndDate.onSelection = this.enableSearch.bind(this, calendars[0].start, calendars[0].end);
      popupScope.calMaturityStartDate.onSelection = this.enableStartDate.bind(this, calendars[2].start, calendars[2].end);
      popupScope.calMaturityEndDate.onSelection = this.enableSearch.bind(this, calendars[2].start, calendars[2].end);
      popupScope.calFinancedStartDate.onSelection = this.enableStartDate.bind(this, calendars[1].start, calendars[1].end);
      popupScope.calFinancedEndDate.onSelection = this.enableSearch.bind(this, calendars[1].start, calendars[1].end);
      popupScope.calCreationStartDate.onSelection = this.enableStartDate.bind(this, calendars[3].start, calendars[3].end);
      popupScope.calCreationEndDate.onSelection = this.enableSearch.bind(this, calendars[3].start, calendars[3].end);
      popupScope.calMaturityStartDate1.onSelection = this.enableStartDate.bind(this, calendars[4].start, calendars[4].end);
      popupScope.calMaturityEndDate2.onSelection = this.enableSearch.bind(this, calendars[4].start, calendars[4].end);
      popupScope.cal1ASF5T3.onSelection = this.enableStartDate.bind(this, calendars[5].start, calendars[5].end);
      popupScope.cal2ASF5T3.onSelection = this.enableSearch.bind(this, calendars[5].start, calendars[5].end);
      contentScope.flxPageStart.onClick = this.applyPagination.bind(this, 'start');
      contentScope.flxPagePrevious.onClick = this.applyPagination.bind(this, 'previous');
      contentScope.flxPageNext.onClick = this.applyPagination.bind(this, 'next');
      contentScope.flxPageEnd.onClick = this.applyPagination.bind(this, 'end');
      contentScope.flxQL1.setVisibility(presenter.configurationManager.checkUserPermission('Upload_Invoice_Counterparty'));
      contentScope.flxMyInvoices.setVisibility(presenter.configurationManager.checkUserPermission('View_Invoice_Donut_Chart'));
      contentScope.btnTab3.setVisibility(presenter.configurationManager.checkUserPermission('Payment_Allocation_Counterparty_View_Submitted'));
      contentScope.flxNA3.setVisibility(presenter.configurationManager.checkUserPermission('Payment_Allocation_Counterparty_View'));
      contentScope.btnNA1.onClick = () => { };
      contentScope.btnNA2.onClick = () => { };
      contentScope.btnNA3.onClick = () => paymentAllocationPresenter.loadScreenWithContext({
        'context': 'pendingPaymentAllocation',
        'allocater': 'counterparty'
      });
      this.initialiseCharts();
      this.renderCalendars();
      contentScope.btnSBALearnMore.onClick = this.navigateToSBAScreen.bind(this);
      contentScope.imgSbaClose.onTouchEnd = function () {
        contentScope.flxSba.setVisibility(false);
        isSbaEnabled = false;
        scope.alignVerticalWidgets();
      };
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
      if (viewModel.allInvoices) {
        myInvoices = viewModel.allInvoices;
        this.setMyInvoicesChart();
      }
      if (viewModel.paymentAllocationList) {
        paymentAllocationsData = viewModel.paymentAllocationList;
        requestedPaymentAllocationList = viewModel.requestedPaymentAllocationList;
        this.setDropdownData(3);
        this.tabClick(3, 'transactionId');
      }
      if (viewModel.requestedPaymentAllocationList) {
        requestedPaymentAllocationList = viewModel.requestedPaymentAllocationList;
        contentScope.lblNA3.text = String((requestedPaymentAllocationList || []).length).padStart(2, 0);
        contentScope.flxLoadingNA.setVisibility(false);
        contentScope.flxContainerNA.setVisibility(true);
        contentScope.flxContainerNA.forceLayout();
      }
      if (viewModel.serverError) {
        this.view.formTemplate12.setBannerFocus();
        this.view.formTemplate12.showBannerError({
          'dbpErrMsg': viewModel.serverError
        });
      }
    },
    tabClick: function (id, sort, param) {
      tabSelected = id;
      isSearchApplied = false;
      listData = id === 1 ? assignedReceivablesData : (id === 2 ? receivablesApprovedForFundingData : paymentAllocationsData);
      contentScope.flxDownloadIcon.setVisibility(id === 1)
      contentScope.btnTab1.skin = 'ICSknBtnAccountSummaryUnselected2';
      contentScope.btnTab2.skin = 'ICSknBtnAccountSummaryUnselected2';
      contentScope.btnTab3.skin = 'ICSknBtnAccountSummaryUnselected2';
      contentScope["btnTab" + id].skin = 'ICSknBtnAccountSummarySelected2';
      totalPages = Math.ceil(listData.length / 10);
      currentPage = totalPages === 0 ? 0 : 1;
      listParams['sortByParam'] = sort;
      listParams['sortOrder'] = 'DESC';
      contentScope.flxListSearchContainer.setVisibility(true);
      contentScope.flxListSearchResults.setVisibility(false);
      FormControllerUtility.enableButton(popupScope.btnSearch);
      scope.setPagination();
      scope.getListData();
      // scope.setListData(id);
    },
    /**
     * @api : setsegListingWidgetDataMap
     * This function for setting widgetDataMap for segment
     * @param : name of the segment.
     * @return : NA
     */
    setListData: function (id) {
      const start = parseInt(currentPage - 1 + "0"),
        end = start + 10;
      paginatedRecords = (listData || []).slice(start, end);
      let segData = [],
        segRowData = [];
      previousIndex = undefined;
      if (id === 1) {
        contentScope.lblListInfo.text = kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.showingRecentAssignedReceivables');
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
              "isVisible": true,
              "onClick": function () {
                scope.toggleCheckbox(arguments[1].rowIndex);
              }
            },
            "lblCheckbox": {
              "text": selectAll ? fontIcons.checkboxSelected : fontIcons.checkboxUnselected,
              "skin": selectAll ? skins.checkboxSelected : skins.checkboxUnselected
            },
            "flxIdentifier": {
              "skin": "slFbox"
            },
            "flxDropdown": {
              "onClick": this.handleSegmentRowView
            },
            'flxColumn1': {
              'width': '19%',
            },
            'flxColumn2': {
              'width': '22.5%',
              'reverseLayoutDirection': true
            },
            'flxColumn3': {
              'left': '4%',
              'width': '21.5%',
            },
            'flxAction': {
              'left': '1%',
              'width': '20%',
            },
            'lblColumn1': record.invoiceReference,
            'lblColumn2': `${presenter.configurationManager.getCurrency(record.currencyCode)}${presenter.formatUtilManager.formatAmount(record.amount)}`,
            'lblColumn3': presenter.formatUtilManager.getFormattedCalendarDate(record.maturityDate),
            'btnAction': {
              'text': 'Download'
            },
            'lblRow1Key': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.counterpartyNameWithColon'),
            'lblRow1Value': record.counterParty,
            'lblRow2Key': 'Invoice Date:',
            'lblRow2Value': presenter.formatUtilManager.getFormattedCalendarDate(record.invoiceDate),
            'lblRow3Key': "Financed Date",
            'lblRow3Value': presenter.formatUtilManager.getFormattedCalendarDate(record.financedDate),
          });
        }
        segData.push([{
          'flxColumn1': {
            'width': '21%',
            'onClick': function (context) {
              listParams['sortByParam'] = 'invoiceReference';
              scope.getListData(context)
            }
          },
          'flxColumn2': {
            'width': '21%',
            'layoutType': kony.flex.FREE_FORM,
            'onClick': function (context) {
              listParams['sortByParam'] = 'amount';
              scope.getListData(context)
            }
          },
          'flxColumn3': {
            'left': '3%',
            'width': '21.5%',
            'onClick': function (context) {
              listParams['sortByParam'] = 'maturityDate';
              scope.getListData(context)
            }
          },
          "flxCheckbox": {
            "isVisible": true,
            "onClick": this.selectAll
          },
          "lblCheckbox": {
            "text": selectAll ? fontIcons.checkboxSelected : fontIcons.checkboxUnselected,
            "skin": selectAll ? skins.checkboxSelected : skins.checkboxUnselected
          },
          'flxAction': {
            'left': '1%',
            'width': '20%',
          },
          'lblColumn1': 'Invoice Reference',
          'lblColumn2': {
            'text': 'Amount',
            'left': '',
            'right': '20dp'
          },
          'imgColumn1': {
            'src': scope.getSortImage('invoiceReference')
          },
          'imgColumn3': {
            'src': scope.getSortImage('maturityDate')
          },
          'imgColumn2': {
            'src': scope.getSortImage('amount'),
            'left': '',
            'right': '0dp'
          },
          'lblColumn3': 'Maturity Date',
          'lblAction': 'Action',
        }, segRowData]);
      } else if (id === 2) {
        contentScope.lblListInfo.text = kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.showingRecentReceivablesApprovedForFunding');
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
              "isVisible": false
            },
            "flxIdentifier": {
              "skin": "slFbox"
            },
            "flxDropdown": {
              "onClick": this.handleSegmentRowView
            },
            'flxColumn1': {
              'width': '24%'
            },
            'flxColumn2': {
              'width': '26%'
            },
            'flxColumn3': {
              'width': '18.5%'
            },
            'lblColumn1': record.invoiceReference,
            'lblColumn2': `${presenter.configurationManager.getCurrency(record.currencyCode)}${presenter.formatUtilManager.formatAmount(record.amount)}`,
            'lblColumn3': presenter.formatUtilManager.getFormattedCalendarDate(record.maturityDate),
            'btnAction': {
              'text': 'View Details'
            },
            'lblRow1Key': 'Anchor Name:',
            'lblRow1Value': record.anchorName,
            'lblRow2Key': 'Facility',
            'lblRow2Value': record.facilityName,
            'lblRow3Key': "Creation Date",
            'lblRow3Value': presenter.formatUtilManager.getFormattedCalendarDate(record.creationDate),
          });
        }
        segData.push([{
          'flxColumn1': {
            'width': '23%',
            'onClick': function (context) {
              listParams['sortByParam'] = 'invoiceReference';
              scope.getListData(context)
            }
          },
          'flxColumn2': {
            'left': '2%',
            'width': '25%',
            'onClick': function (context) {
              listParams['sortByParam'] = 'amount';
              scope.getListData(context)
            }
          },
          'flxColumn3': {
            'width': '18.5%',
            'onClick': function (context) {
              listParams['sortByParam'] = 'maturityDate';
              scope.getListData(context)
            }
          },
          'imgColumn1': {
            'src': scope.getSortImage('invoiceReference')
          },
          'imgColumn3': {
            'src': scope.getSortImage('maturityDate')
          },
          'imgColumn2': {
            'src': scope.getSortImage('amount'),
            'left': '',
            'right': '0dp'
          },
          'lblColumn1': 'Invoice Reference',
          'lblColumn2': 'Amount',
          'lblColumn3': 'Maturity Date',
          'lblAction': 'Action',
        }, segRowData]);
      } else {
        const editPermission = presenter.configurationManager.checkUserPermission('Payment_Allocation_Counterparty_Edit_Submitted');
        contentScope.lblListInfo.text = kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.ShowRecentPaymentAllocation');
        for (const record of paginatedRecords) {
          segRowData.push({
            'lblDropdown': fontIcons.chevronDown,
            'flxDashboardListRow': {
              'skin': 'sknflxffffffnoborder'
            },
            "flxDetails": {
              "isVisible": false
            },
            "flxIdentifier": {
              "skin": "slFbox"
            },
            "flxCheckbox": {
              "isVisible": false
            },
            "flxDropdown": {
              "onClick": this.handleSegmentRowView
            },
            'flxColumn1': {
              'width': '20%'
            },
            'flxColumn2': {
              'isVisible': breakpoint > 1024 ? true : false,
              'width': '16%'
            },
            'flxColumn3': {
              'width': '20%',
              'layoutType': kony.flex.FREE_FORM,
            },
            'flxColumn4': {
              'isVisible': true,
              'left': breakpoint > 1024 ? '2.5%' : '6%',
              'width': breakpoint > 1024 ? '18%' : '25%',
            },
            'flxRow4': {
              'isVisible': breakpoint > 1024 ? false : true
            },
            'lblColumn1': record.transactionId,
            'lblColumn2': presenter.formatUtilManager.getFormattedCalendarDate(record.valueDate),
            'lblColumn3': {
              'text': `${presenter.configurationManager.getCurrency(record.currency)}${presenter.formatUtilManager.formatAmount(record.originalAmount)}`,
              'left': '',
              'right': '20dp',
            },
            'lblColumn4': record.status,
            'btnAction': {
              'text': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.Edit'),
              'toolTip': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.Edit'),
              'isVisible': editPermission,
              'onClick': () => paymentAllocationPresenter.loadScreenWithContext({
                'context': 'allocationDocuments',
                'allocater': 'counterparty',
                'displayMode': 'edit',
                'data': record
              })
            },
            'lblRow1Key': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.receiptAmountWithColon'),
            'lblRow1Value': `${presenter.configurationManager.getCurrency(record.currency)}${presenter.formatUtilManager.formatAmount(record.receiptAmount)}`,
            'lblRow2Key': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.senderNameWithColon'),
            'lblRow2Value': record.senderName,
            'lblRow3Key': kony.i18n.getLocalizedString('kony.mb.TransferEurope.beneficairyNameColon'),
            'lblRow3Value': record.beneficiaryName,
            'lblRow4Key': kony.i18n.getLocalizedString('i18n.wealth.valueDatemb'),
            'lblRow4Value': presenter.formatUtilManager.getFormattedCalendarDate(record.valueDate),
          });
        }
        segData.push([{
          'flxColumn1': {
            'width': '20%',
            'onClick': function (context) {
              listParams['sortByParam'] = 'transactionId';
              scope.getListData(context)
            }
          },
          'flxColumn2': {
            'width': '16%',
            'isVisible': breakpoint > 1024 ? true : false,
            'onClick': function (context) {
              listParams['sortByParam'] = 'valueDate';
              scope.getListData(context)
            }
          },
          'flxColumn3': {
            'width': '20%',
            'layoutType': kony.flex.FREE_FORM,
            'onClick': function (context) {
              listParams['sortByParam'] = 'originalAmount';
              scope.getListData(context)
            }
          },
          'flxColumn4': {
            'left': breakpoint > 1024 ? '2.5%' : '6%',
            'isVisible': true,
            'width': breakpoint > 1024 ? '18%' : '25%',
            'onClick': function (context) {
              listParams['sortByParam'] = 'status';
              scope.getListData(context)
            }
          },
          'imgColumn1': {
            'src': scope.getSortImage('transactionId')
          },
          'imgColumn2': {
            'src': scope.getSortImage('valueDate')
          },
          'imgColumn3': {
            'src': scope.getSortImage('originalAmount'),
            'left': '',
            'right': '0dp'
          },
          'imgColumn4': {
            'src': scope.getSortImage('status')
          },
          'lblColumn1': kony.i18n.getLocalizedString('kony.i18n.common.transactionID'),
          'lblColumn2': kony.i18n.getLocalizedString('i18n.wealth.valueDate'),
          'lblColumn3': {
            'text': kony.i18n.getLocalizedString('kony.mb.accdetails.originalAmount'),
            'left': '',
            'right': '20dp'
          },
          'lblColumn4': kony.i18n.getLocalizedString('i18n.common.status'),
          'lblAction': kony.i18n.getLocalizedString('i18n.TradeFinance.Action'),
        }, segRowData]);
      }
      contentScope.segList.setData(segData);
      contentScope.flxContainerList.forceLayout();
    },
    /**
     * Returns the sort image.
     * @param {string} sortBy - Specifies the sort by field name.
     * @returns {string} - Sort image name.
     */
    getSortImage: function (sortBy) {
      return listParams['sortByParam'] === sortBy ? (listParams['sortOrder'] === 'ASC' ? images.sortAsc : images.sortDesc) : images.noSort
    },
    /**
     * @api : sortRecords
     * Update sort icons and trigger a action to business controller to sort
     * @return : NA
     */
    sortRecords: function (columnNo, field) {
      var scope = this;
      try {
        var sortType = "";
        sortApplied = true;
        var imageName = "imgColumn";
        var segView = contentScope.segList.data[0][0];
        if (segView[imageName + columnNo].src === "sorting.png") {
          segView[imageName + columnNo].src = "sorting_previous.png";
          sortType = "ASC";
        } else if (segView[imageName + columnNo].src === "sorting_previous.png") {
          segView[imageName + columnNo].src = "sorting_next.png";
          sortType = "DESC";
        } else {
          segView[imageName + columnNo].src = "sorting_previous.png";
          sortType = "ASC";
        }
        for (var i = 1; i <= 3; i++) {
          if (i !== columnNo && segView[imageName + i]) {
            segView[imageName + i].src = "sorting.png";
          }
        }
        contentScope.segList.data[0][0] = segView;
        var data = contentScope.segList.data[0][1]
        field = "lblColumn" + columnNo
        data.sort(function (a, b) {
          return b.field - a.field;
        });
        contentScope.segList.data[0][1] = data
      } catch (err) {
        var errorObj = {
          "method": "sortRecords",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * Toggles the advance search popup.
     * @param {boolean} visibility - Specfies whether to show/hide advance search popup.
     * @returns {void} - Returns nothing if visibility is false.
     */
    toggleAdvanceSearchPopup: function (visibility) {
      popupScope.setVisibility(visibility);
      popupScope.flxAdvancedSearchPopup.setVisibility(true);
      for (let i = 1; i <= 3; i++) {
        popupScope[`flxASFieldsTab${i}`].setVisibility(false);
      }
      popupScope["flxASFieldsTab" + tabSelected].setVisibility(true);
      const tabSelections = {
        1: {
          counterParty: ['CounterPartyDropdown', 'tbxInvoiceNumber', 'InvoiceDropdown', 'calInvoiceStartDate', 'calInvoiceEndDate', 'MaturityDropdown', 'calMaturityStartDate', 'calMaturityEndDate', 'FinancedDropdown', 'calFinancedStartDate', 'calFinancedEndDate'],
        },
        2: {
          anchorFacility: ['AnchorNameDropdown', 'FacilityDropdown', 'CreationDateDropdown', 'calCreationStartDate', 'calCreationEndDate', 'MaturityDropdown2', 'calMaturityStartDate1', 'calMaturityEndDate2'],
        },
        3: {
          counterPartyStatus: ['tbxASF1T3', 'DropdownASF2T3', 'DropdownASF3T3', 'DropdownASF4T3', 'cal1ASF5T3', 'cal2ASF5T3'],
        },
      };
      if (!visibility || isSearchApplied) return;
      if (tabSelected && tabSelections[tabSelected]) {
        const selectedTab = tabSelections[tabSelected];
        for (const item of Object.values(selectedTab)[0]) {
          if (item.startsWith('tbx')) {
            popupScope[item].text = '';
          } else if (item.startsWith('cal')) {
            popupScope[item].clear();
          } else {
            popupScope[item].removeSelection();
            popupScope[item].setDefaultText();
            popupScope[item].closeDropdown();
          }
        }
      }
    },
    performSearch: function () {
      this.toggleAdvanceSearchPopup(false);
      searchCriteria = {
        'searchParam': {},
        'filterParam': {},
        'dateParam': {}
      };
      tagsData = {};
      if (tabSelected === 1) {
        const f1 = popupScope.CounterPartyDropdown.getSelectedKey(),
          f2 = popupScope.tbxInvoiceNumber.text,
          f3 = popupScope.InvoiceDropdown.getSelectedKey(),
          f3d1 = popupScope.calInvoiceStartDate.formattedDate,
          f3d2 = popupScope.calInvoiceEndDate.formattedDate,
          f4 = popupScope.MaturityDropdown.getSelectedKey(),
          f4d1 = popupScope.calMaturityStartDate.formattedDate,
          f4d2 = popupScope.calMaturityEndDate.formattedDate,
          f5 = popupScope.FinancedDropdown.getSelectedKey(),
          f5d1 = popupScope.calFinancedStartDate.formattedDate,
          f5d2 = popupScope.calFinancedEndDate.formattedDate;
        if (!f1 && !f2 && !f3 && !f3d1 && !f3d2 && !f4 && !f4d1 && !f4d2 && !f5 && !f5d1 && !f5d2) {
          return;
        }
        if (f1) {
          (f1 !== 'All') && (searchCriteria['filterParam']['counterParty'] = f1);
          tagsData['counterParty'] = `Counterparty Name: ${f1}`;
        }
        if (f2) {
          searchCriteria['searchParam']['invoiceReference'] = f2;
          tagsData['invoiceReference'] = `Invoice Reference Number: ${f2}`;
        }
        if (f3d1 && f3d2) {
          searchCriteria['dateParam']['invoiceDate'] = [f3d1, f3d2];
          tagsData['invoiceDate'] = `Invoice Date Range: ${f3d1} to ${f3d2}`;
        }
        if (f4d1 && f4d2) {
          searchCriteria['dateParam']['maturityDate'] = [f4d1, f4d2];
          tagsData['maturityDate'] = `Maturity Date Range: ${f4d1} to ${f4d2}`;
        }
        if (f5d1 && f5d2) {
          searchCriteria['dateParam']['financedDate'] = [f5d1, f5d2];
          tagsData['financedDate'] = `Financed Date Range: ${f5d1} to ${f5d2}`;
        }
      } else if (tabSelected === 2) {
        const f1 = popupScope.AnchorNameDropdown.getSelectedKey(),
          f2 = popupScope.FacilityDropdown.getSelectedKey(),
          f3 = popupScope.CreationDateDropdown.getSelectedKey(),
          f3d1 = popupScope.calCreationStartDate.formattedDate,
          f3d2 = popupScope.calCreationEndDate.formattedDate,
          f4 = popupScope.MaturityDropdown2.getSelectedKey(),
          f4d1 = popupScope.calMaturityStartDate1.formattedDate,
          f4d2 = popupScope.calMaturityEndDate2.formattedDate;
        if (!f1 && !f2 && !f3 && !f3d1 && !f3d2 && !f4 && !f4d1 && !f4d2) {
          return;
        }
        if (f1) {
          (f1 !== 'All') && (searchCriteria['filterParam']['anchorName'] = f1);
          tagsData['anchorName'] = `Anchor Name: ${f1}`;
        }
        if (f2) {
          (f2 !== 'All') && (searchCriteria['filterParam']['facilityName'] = f2);
          tagsData['facilityName'] = `Facility: ${f2}`;
        }
        if (f3d1 && f3d2) {
          searchCriteria['dateParam']['creationDate'] = [f3d1, f3d2];
          tagsData['creationDate'] = `Creation Date Range: ${f3d1} to ${f3d2}`;
        }
        if (f4d1 && f4d2) {
          searchCriteria['dateParam']['maturityDate'] = [f4d1, f4d2];
          tagsData['maturityDate'] = `Maturity Date Range: ${f4d1} to ${f4d2}`;
        }
      } else {
        const f1 = popupScope.tbxASF1T3.text,
          f2 = popupScope.DropdownASF2T3.getSelectedKey(),
          f3 = popupScope.DropdownASF3T3.getSelectedKey(),
          f4 = popupScope.DropdownASF4T3.getSelectedKey(),
          f5d1 = popupScope.cal1ASF5T3.formattedDate,
          f5d2 = popupScope.cal2ASF5T3.formattedDate;
        if (!f1 && !f2 && !f3 && !f4 && !f5d1 && !f5d2) {
          return;
        }
        if (f1) {
          searchCriteria['searchParam']['transactionId'] = f1;
          tagsData['transactionId'] = `${kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.transactionIdWithColon')} ${f1}`;
        }
        if (f2) {
          (f2 !== 'All') && (searchCriteria['filterParam']['senderName'] = f2);
          tagsData['senderName'] = `${kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.senderNameWithColon')} ${f2}`;
        }
        if (f3) {
          (f3 !== 'All') && (searchCriteria['filterParam']['beneficiaryName'] = f3);
          tagsData['beneficiaryName'] = `${kony.i18n.getLocalizedString('kony.mb.TransferEurope.beneficairyNameColon')} ${f3}`;
        }
        if (f5d1 && f5d2) {
          searchCriteria['dateParam']['valueDate'] = [f5d1, f5d2];
          tagsData['valueDate'] = `${kony.i18n.getLocalizedString('i18n.serviceRequests.DateRange')} ${f5d1} to ${f5d2}`;
        }
      }
      scope.view.formTemplate12.showLoading();
      isSearchApplied = true;
      contentScope.flxListSearchContainer.setVisibility(false);
      contentScope.flxListSearchResults.setVisibility(true);
      setTimeout(function () {
        const searchData = {
          1: assignedReceivablesData,
          2: receivablesApprovedForFundingData,
          3: paymentAllocationsData
        }[tabSelected] || [];
        listData = SCFUtils.searchAndFilterRecords(searchData, searchCriteria);
        listData = SCFUtils.sortRecords(listData, listParams);
        totalPages = Math.ceil(listData.length / 10);
        currentPage = totalPages === 0 ? 0 : 1;
        scope.setPagination();
        scope.setListData(tabSelected);
        contentScope.brwSearchTags.evaluateJavaScript(`createTags(${JSON.stringify(tagsData)})`);
        contentScope.flxList.forceLayout();
        scope.view.formTemplate12.hideLoading();
      }, 100);
    },
    handleSegmentRowView: function () {
      const rowIndex = contentScope.segList.selectedRowIndex[1];
      const data = contentScope.segList.data[0][1][rowIndex];
      const previousIndexData = contentScope.segList.data[0][1][previousIndex];
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
     * Toggles the checkbox.
     * @param {Number} rowIndex - Index of segment row.
     */
    toggleCheckbox: function (rowIndex) {
      const headData = contentScope.segList.data[0][0],
       rowData = contentScope.segList.data[0][1];
      if (rowData[rowIndex]["lblCheckbox"].text === fontIcons.checkboxSelected) {
        rowData[rowIndex]["lblCheckbox"].text = fontIcons.checkboxUnselected;
        rowData[rowIndex]["lblCheckbox"].skin = skins.checkboxUnselected;
      } else {
        rowData[rowIndex]["lblCheckbox"].text = fontIcons.checkboxSelected;
        rowData[rowIndex]["lblCheckbox"].skin = skins.checkboxSelected;
      }      
      selectAll = rowData.every(item => item.lblCheckbox.text === fontIcons.checkboxSelected);
      if (selectAll) {
        headData["lblCheckbox"].text = fontIcons.checkboxSelected;
        headData["lblCheckbox"].skin = skins.checkboxSelected;
      } else {
        headData["lblCheckbox"].text = fontIcons.checkboxUnselected;
        headData["lblCheckbox"].skin = skins.checkboxUnselected;
      }
      contentScope.segList.setData([
        [headData, rowData]
      ]);
    },
    selectAll: function () {
      const data = contentScope.segList.data[0][0];
      if (data["lblCheckbox"].text === fontIcons.checkboxSelected) {
        selectAll = false;
        data["lblCheckbox"].text = fontIcons.checkboxUnselected;
        data["lblCheckbox"].skin = skins.checkboxUnselected;
      } else {
        selectAll = true;
        data["lblCheckbox"].text = fontIcons.checkboxSelected;
        data["lblCheckbox"].skin = skins.checkboxSelected;
      }
      const rowData = contentScope.segList.data[0][1];
      rowData.forEach(item => {
        if (selectAll) {
          item.lblCheckbox.text = fontIcons.checkboxSelected;
          item.lblCheckbox.skin = skins.checkboxSelected;
        } else {
          item.lblCheckbox.text = fontIcons.checkboxUnselected;
          item.lblCheckbox.skin = skins.checkboxUnselected;
        }
      });
      contentScope.segList.setData([
        [data, rowData]
      ]);
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
      contentScope.segList.setDataAt(data, index, 0);
    },
    initialiseCharts: function () {
      const myInvoicesChartOptions = {
        'title': '',
        'legend': 'none',
        'pieHole': 0.7,
        'chartArea': {
          'left': '20%',
          'top': 0,
          'width': 500,
          'height': 500
        },
        'width': 270,
        'height': 270,
        'colors': ['#77BC43', '#F7EA3A', '#E8705B'],
        'pieSliceText': 'none',
        'pieSliceBorderColor': "transparent",
        'centerText': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.totalInvoices')
      };
      let myInvoicesChart = new kony.ui.CustomWidget({
        "id": "myInvoicesChart",
        "isVisible": true,
        "left": "5%",
        "width": "90%",
        "height": "100%",
        "zIndex": 1
      }, {
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {
        "widgetName": "SCFDonutChart",
        "chartData": [],
        "chartProperties": myInvoicesChartOptions,
        "chartId": 'myInvoicesChart_div'
      });
      contentScope.flxDataMI.add(myInvoicesChart);
    },
    setDropdownData: function (tabIdx) {
      if (!tabIdx) {
        programDropdownData = programData.reduce((acc, obj) => {
          acc[obj.programId] = obj.programName;
          return acc;
        }, {
          'All': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.allProgrammes')
        });
        contentScope.ProgramDropdown.setContext(programDropdownData);
        contentScope.ProgramDropdown.selectKey('All');
        const dropdowns = ['InvoiceDropdown', 'MaturityDropdown', 'FinancedDropdown', 'CreationDateDropdown', 'MaturityDropdown2'];
        dropdowns.forEach(dropdown => {
          popupScope[dropdown].setContext(presenter.counterPartyDashboardConfig.listTimePeriodFilters);
        });
        const counterPartyDropdownData = assignedReceivablesData.reduce((acc, obj) => {
          acc[obj.counterParty] = obj.counterParty;
          return acc;
        }, {
          'All': kony.i18n.getLocalizedString('i18n.konybb.Common.All')
        });
        const anchorNameFacility = receivablesApprovedForFundingData.reduce((acc, obj) => {
          acc['anchor'][obj.anchorName] = obj.anchorName;
          acc['facility'][obj.facilityName] = obj.facilityName;
          return acc;
        }, {
          'anchor': {
            'All': kony.i18n.getLocalizedString('i18n.konybb.Common.All')
          },
          'facility': {
            'All': kony.i18n.getLocalizedString('i18n.konybb.Common.All')
          }
        });
        popupScope.CounterPartyDropdown.setContext(counterPartyDropdownData);
        popupScope.AnchorNameDropdown.setContext(anchorNameFacility.anchor);
        popupScope.FacilityDropdown.setContext(anchorNameFacility.facility);
      }
      if (tabIdx === 3) {
        const dropdownDataASFT3 = (paymentAllocationsData || []).reduce((acc, obj) => {
          obj.senderName && (acc['sender'][obj.senderName] = obj.senderName);
          obj.beneficiaryName && (acc['beneficiary'][obj.beneficiaryName] = obj.beneficiaryName);
          return acc;
        }, {
          'sender': {
            'All': kony.i18n.getLocalizedString('i18n.konybb.Common.All')
          },
          'beneficiary': {
            'All': kony.i18n.getLocalizedString('i18n.konybb.Common.All')
          }
        });
        popupScope.DropdownASF2T3.setContext(dropdownDataASFT3.sender);
        popupScope.DropdownASF3T3.setContext(dropdownDataASFT3.beneficiary);
        popupScope.DropdownASF4T3.setContext(presenter.counterPartyDashboardConfig.listTimePeriodFilters);
      }
    },
    setMyInvoicesChart: function () {
      let chartData = [
        ['Status', 'Count']
      ];
      const myInvoiceChartData = myInvoices.reduce((acc, obj) => {
        if (!acc[obj.status]) acc[obj.status] = 0;
        acc[obj.status]++;
        return acc;
      }, {});
      for (const [key, value] of Object.entries(presenter.counterPartyDashboardConfig.myInvoiceChartStatus)) {
        const count = myInvoiceChartData[key];
        chartData.push([value, count]);
      }
      contentScope.flxDataMI.myInvoicesChart.chartData = chartData;
    },
    searchProgram: function () {
      const searchText = contentScope.tbxSearchPG.text.toLowerCase(),
        selectedKey = contentScope.ProgramDropdown.getSelectedKey();
      if (searchText.length >= 3 || !contentScope.flxClearSearchPG.isVisible) {
        let newSegData = JSON.parse(JSON.stringify(programSegmentData)),
          totalAccounts = 0,
          totalAvailable = 0,
          totalUtilised = 0,
          currSymbol = ''
        if (selectedKey === 'All') {
          newSegData[0][1] = programSegmentData[0][1].filter(obj => {
            if (obj.lblName.toLowerCase().includes(searchText)) {
              totalAvailable += obj.availableAmount;
              totalUtilised += obj.utitlisedAmount;
              currSymbol = obj.currSymbol;
              return true;
            }
            return false;
          });
          totalAccounts = newSegData[0][1].length;
        } else {
          newSegData[1][1] = programSegmentData[1][1].filter(obj => {
            if (obj.lblName.toLowerCase().includes(searchText)) {
              totalAvailable += obj.availableAmount;
              totalUtilised += obj.utitlisedAmount;
              currSymbol = obj.currSymbol;
              return true;
            }
            return false;
          });
          totalAccounts = newSegData[1][1].length;
        }
        contentScope.segProgram.setData(newSegData);
        contentScope.lblTotalAccountCount.text = String(totalAccounts).padStart(2, 0);
        contentScope.lblTotalAvailableCount.text = `${currSymbol}${presenter.formatUtilManager.formatAmount(totalAvailable)}`;
        contentScope.lblTotalUsedCount.text = `${currSymbol}${presenter.formatUtilManager.formatAmount(totalUtilised)}`;
      }
    },
    handleDropdownSelection: function (widgetId, selectedKey) {
      switch (widgetId) {
        case 'ProgramDropdown':
          contentScope.flxClearSearchPG.setVisibility(false);
          contentScope.tbxSearchPG.text = '';
          this.setProgramData(selectedKey);
          break;
        case 'InvoiceDropdown':
        case 'FinancedDropdown':
        case 'MaturityDropdown':
        case 'CreationDateDropdown':
        case 'MaturityDropdown2':
        case 'DropdownASF4T3':
          const elementDetails = {
            InvoiceDropdown: ['calInvoiceStartDate', 'calInvoiceEndDate', 'flxInvoiceCal'],
            FinancedDropdown: ['calFinancedStartDate', 'calFinancedEndDate', 'flxFinancedCal'],
            MaturityDropdown: ['calMaturityStartDate', 'calMaturityEndDate', 'flxMaturityCal'],
            CreationDateDropdown: ['calCreationStartDate', 'calCreationEndDate', 'flxCreationCal'],
            MaturityDropdown2: ['calMaturityStartDate1', 'calMaturityEndDate2', 'flxMaturityCal2'],
            DropdownASF4T3: ['cal1ASF5T3', 'cal2ASF5T3', 'flxASF5T3']
          };
          this.setASCalendars(selectedKey, ...elementDetails[widgetId]);
          break;
      }
    },
    setASCalendars: function (selectedKey, calendarStartDateId, calendarEndDateId, calendarContainerId) {
      const cal1Widget = popupScope[calendarStartDateId],
        cal2Widget = popupScope[calendarEndDateId],
        [range, unit] = selectedKey.split(',');
      popupScope[calendarEndDateId].validStartDate = null;
      if (range === 'CUSTOM') {
        popupScope[calendarContainerId].setEnabled(true);
        cal1Widget.clear();
        cal2Widget.clear();
        return;
      }
      let currDate = new Date(),
        cutOffDate = new Date();
      switch (unit) {
        case 'DAY':
          cutOffDate.setDate(currDate.getDate() - parseInt(range, 10));
          break;
        case 'MONTH':
          cutOffDate.setMonth(currDate.getMonth() - parseInt(range, 10));
          break;
        case 'YEAR':
          cutOffDate.setFullYear(currDate.getFullYear() - parseInt(range, 10));
          break;
      }
      popupScope[calendarContainerId].setEnabled(false);
      cal1Widget.dateComponents = [cutOffDate.getDate(), cutOffDate.getMonth() + 1, cutOffDate.getFullYear()];
      cal2Widget.dateComponents = [currDate.getDate(), currDate.getMonth() + 1, currDate.getFullYear()];
    },
    /**
     * Enables the start date for end date range calendar.
     */
    enableStartDate: function (calendarStartDateId, calendarEndDateId) {
      const calendarStartDate = popupScope[calendarStartDateId],
        calendarEndDate = popupScope[calendarEndDateId];
      let startDate = new Date(calendarStartDate.formattedDate);
      if (calendarEndDate.formattedDate) {
        const endData = new Date(calendarEndDate.formattedDate);
        if (endData < startDate) {
          calendarEndDate.clear();
        }
      }
      calendarEndDate.validStartDate = [startDate.getDate(), startDate.getMonth() + 1, startDate.getFullYear()];
      this.enableSearch(calendarStartDateId, calendarEndDateId);
    },
    enableSearch: function (calendarStartDateId, calendarEndDateId) {
      const calendarStartDate = popupScope[calendarStartDateId],
        calendarEndDate = popupScope[calendarEndDateId];
      if (calendarStartDate.formattedDate === '' || calendarEndDate.formattedDate === '') {
        FormControllerUtility.disableButton(popupScope.btnSearch);
      } else {
        FormControllerUtility.enableButton(popupScope.btnSearch);
      }
    },
    /**
     * Sets the program widget data.
     * @param {string} selectedKey - Specifies selected key.
     */
    setProgramData: function (selectedKey) {
      let segData = [],
        totalAccounts = 0,
        totalAvailable = 0,
        totalUtilised = 0,
        currSymbol = '',
        availableBalance;
      if (selectedKey === 'All') {
        totalAccounts = programData.length;
        let segRowData = [];
        programData.forEach(p => {
          currSymbol = presenter.configurationManager.getCurrency(p.currencyCode);
          availableBalance = p.programTotalLimit - p.programUtilisedBalance;
          totalAvailable += availableBalance;
          totalUtilised += p.programUtilisedBalance;
          segRowData.push({
            'lblName': `${p.programName} / ${p.programId}`,
            'lblCount': `${p.facilities.length} ${kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.facilities')}`,
            'lblAvailableAmount': `${currSymbol}${presenter.formatUtilManager.formatAmount(availableBalance)}`,
            'lblUtilisedAmount': `${currSymbol}${presenter.formatUtilManager.formatAmount(p.programUtilisedBalance)}`,
            'availableAmount': availableBalance,
            'utitlisedAmount': p.programUtilisedBalance,
            currSymbol
          });
        });
        segData.push([{
          'lblHeading': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.ProgramReference'),
          'flxDropdown': {
            'isVisible': false
          }
        },
          segRowData
        ]);
      } else {
        const selectedProgram = programData.find(p => p.programId === selectedKey);
        currSymbol = presenter.configurationManager.getCurrency(selectedProgram.currencyCode);
        segData.push([{
          'lblHeading': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.ProgramReference'),
          'flxDropdown': {
            'isVisible': false
          }
        },
        [{
          'lblName': `${selectedProgram.programName} / ${selectedProgram.programId}`,
          'lblCount': `${selectedProgram.facilities.length} ${kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.facilities')}`,
          'lblAvailableAmount': `${currSymbol}${presenter.formatUtilManager.formatAmount(selectedProgram.programTotalLimit - selectedProgram.programUtilisedBalance)}`,
          'lblUtilisedAmount': `${currSymbol}${presenter.formatUtilManager.formatAmount(selectedProgram.programUtilisedBalance)}`
        }]
        ]);
        let segRowData = [];
        totalAccounts = selectedProgram.facilities.length;
        selectedProgram.facilities.forEach(f => {
          currSymbol = presenter.configurationManager.getCurrency(f.currencyCode);
          availableBalance = f.facilityTotalLimit - f.facilityUtilisedBalance;
          totalAvailable += availableBalance;
          totalUtilised += f.facilityUtilisedBalance;
          segRowData.push({
            'lblName': `${f.facilityName} / ${f.facilityId}`,
            'lblCount': {
              'isVisible': false
            },
            'lblAvailableAmount': `${currSymbol}${presenter.formatUtilManager.formatAmount(availableBalance)}`,
            'lblUtilisedAmount': `${currSymbol}${presenter.formatUtilManager.formatAmount(f.facilityUtilisedBalance)}`,
            'availableAmount': availableBalance,
            'utitlisedAmount': f.facilityUtilisedBalance,
            currSymbol
          });
        });
        segData.push([{
          'lblHeading': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.FacilityIdFacilityName'),
          'flxDropdown': {
            'isVisible': false
          }
        },
          segRowData
        ]);
      }
      programSegmentData = JSON.parse(JSON.stringify(segData));
      contentScope.segProgram.setData(segData);
      contentScope.lblTotalAccountCount.text = String(totalAccounts).padStart(2, 0);
      contentScope.lblTotalAvailableCount.text = `${currSymbol}${presenter.formatUtilManager.formatAmount(totalAvailable)}`;
      contentScope.lblTotalUsedCount.text = `${currSymbol}${presenter.formatUtilManager.formatAmount(totalUtilised)}`;
    },
    getListData: function (context) {
      if (context) {
        const widgetSrc = context.widgets()[1].src;
        listParams['sortOrder'] = (widgetSrc === images.noSort) ? 'ASC' : (widgetSrc === images.sortAsc) ? 'DESC' : 'ASC';
      }
      contentScope.flxLoadingList.setVisibility(true);
      contentScope.flxContainerList.setVisibility(false);
      setTimeout(function () {
        listData = SCFUtils.sortRecords(listData, listParams);
        scope.setListData(tabSelected);
        contentScope.flxLoadingList.setVisibility(false);
        contentScope.flxContainerList.setVisibility(true);
        contentScope.flxList.forceLayout();
      }, 10);
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
      this.setListData(tabSelected);
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
      isSbaEnabled = false;
      contentScope.flxSba.setVisibility(false);
      contentScope.flxClearSearchPG.setVisibility(false);
      contentScope.flxLoadingNA.setVisibility(true);
      contentScope.flxContainerNA.setVisibility(false);
      contentScope.flxLoadingList.setVisibility(true);
      contentScope.flxContainerList.setVisibility(false);
      contentScope.tbxSearchPG.text = '';
      contentScope.lblNA1.text = String(Math.floor(Math.random() * 21)).padStart(2, 0);
      contentScope.lblNA2.text = String(Math.floor(Math.random() * 21)).padStart(2, 0);
      this.tabClick(1, 'invoiceReference');
      this.setListData(1);
      this.setDropdownData();
      invoicePresenter.getFilteredInvoices(this.view.id);
      presenter.fetchPaymentAllocationData(this.view.id, true);
    },
    /**
     * Sets the position of calendars.
     */
    renderCalendars: function () {
      const calendars = [popupScope.calInvoiceStartDate, popupScope.calInvoiceEndDate, popupScope.calFinancedStartDate, popupScope.calFinancedEndDate,
      popupScope.calMaturityStartDate, popupScope.calMaturityEndDate, popupScope.calCreationStartDate, popupScope.calCreationEndDate,
      popupScope.calMaturityStartDate1, popupScope.calMaturityEndDate2,
      popupScope.cal1ASF5T3, popupScope.cal2ASF5T3
      ];
      const calendarContainerIds = [popupScope.flxInvoiceCal, popupScope.flxFinancedCal, popupScope.flxMaturityCal, popupScope.flxCreationCal,
      popupScope.flxMaturityCal2, popupScope.flxASF5T3
      ];
      calendarContainerIds.forEach(containerId => {
        containerId.setEnabled(false);
      });
      for (const calWidget of calendars) {
        calWidget.dateEditable = false;
        calWidget.setContext({
          "widget": calWidget,
          "anchor": "bottom"
        });
      }
    },
    /**
     * Sets the height of tags container.
     * @param {number} height - Specifies the height.
     */
    setTagsContainerHeight: function (height) {
      contentScope.flxASFields.height = `${height + 10}dp`;
      contentScope.flxListSearchResults.forceLayout();
    },
    /**
     * Removes the search tag.
     * @param {string} tagId - Specifies the tag id.
     */
    removeSearchTag: function (tagId) {
      delete tagsData[tagId];
      for (const key in searchCriteria) {
        if (tagId in searchCriteria[key]) {
          delete searchCriteria[key][tagId];
          break;
        }
      }
      if (tabSelected === 1) {
        switch (tagId) {
          case 'counterParty':
            popupScope.CounterPartyDropdown.removeSelection();
            popupScope.CounterPartyDropdown.setDefaultText();
            break;
          case 'invoiceReference':
            popupScope.tbxInvoiceNumber.text = '';
            break;
          case 'invoiceDate':
            popupScope.InvoiceDropdown.removeSelection();
            popupScope.InvoiceDropdown.setDefaultText();
            popupScope.calInvoiceStartDate.clear();
            popupScope.calInvoiceEndDate.clear();
            break;
          case 'maturityDate':
            popupScope.MaturityDropdown.removeSelection();
            popupScope.MaturityDropdown.setDefaultText();
            popupScope.calMaturityStartDate.clear();
            popupScope.calMaturityEndDate.clear();
          case 'financedDate':
            popupScope.FinancedDropdown.removeSelection();
            popupScope.FinancedDropdown.setDefaultText();
            popupScope.calFinancedStartDate.clear();
            popupScope.calFinancedEndDate.clear();
        }
      } else if (tabSelected === 2) {
        switch (tagId) {
          case 'anchorName':
            popupScope.AnchorNameDropdown.removeSelection();
            popupScope.AnchorNameDropdown.setDefaultText();
            break;
          case 'facilityName':
            popupScope.FacilityDropdown.removeSelection();
            popupScope.FacilityDropdown.setDefaultText();
            break;
          case 'creationDate':
            popupScope.CreationDateDropdown.removeSelection();
            popupScope.CreationDateDropdown.setDefaultText();
            popupScope.calCreationStartDate.clear();
            popupScope.calCreationEndDate.clear();
            break;
          case 'maturityDate':
            popupScope.MaturityDropdown2.removeSelection();
            popupScope.MaturityDropdown2.setDefaultText();
            popupScope.calMaturityStartDate1.clear();
            popupScope.calMaturityEndDate2.clear();
            break;
        }
      } else {
        switch (tagId) {
          case 'transactionId':
            popupScope.tbxASF1T3.text = '';
            break;
          case 'senderName':
            popupScope.DropdownASF2T3.removeSelection();
            popupScope.DropdownASF2T3.setDefaultText();
            break;
          case 'beneficiaryName':
            popupScope.DropdownASF3T3.removeSelection();
            popupScope.DropdownASF3T3.setDefaultText();
            break;
          case 'valueDate':
            popupScope.DropdownASF4T3.removeSelection();
            popupScope.DropdownASF4T3.setDefaultText();
            popupScope.cal1ASF5T3.clear();
            popupScope.cal2ASF5T3.clear();
            break;
        }
      }
      if (Object.keys(tagsData).length === 0) {
        isSearchApplied = false;
        contentScope.flxListSearchContainer.setVisibility(true);
        contentScope.flxListSearchResults.setVisibility(false);
      }
      scope.view.formTemplate12.showLoading();
      setTimeout(function () {
        const searchData = {
          1: assignedReceivablesData,
          2: receivablesApprovedForFundingData,
          3: paymentAllocationsData
        }[tabSelected] || [];
        listData = SCFUtils.searchAndFilterRecords(searchData, searchCriteria);
        totalPages = Math.ceil(listData.length / 10);
        currentPage = totalPages === 0 ? 0 : 1;
        scope.setPagination();
        scope.setListData(tabSelected);
        contentScope.flxList.forceLayout();
        scope.view.formTemplate12.hideLoading();
      }, 10);
    },
    /**
     * Handles the errors.
     */
    onError: function (err) {
      kony.print(JSON.stringify(err));
    },

    getSbaDetails: function () {
      sbaDetails = applicationManager.getSbaJourney();
      if (!kony.sdk.isNullOrUndefined(sbaDetails) && sbaDetails.length > 0) {
        const hasEnabledStatus = sbaDetails.some(obj => obj.sbaEnrolmentStatus.status === "Enabled");
        if (hasEnabledStatus) {
          contentScope.flxSba.setVisibility(true);
          isSbaEnabled = true;
          this.alignVerticalWidgets();
        }
      }
    },

    navigateToSBAScreen: function () {
      applicationManager.getModulesPresentationController({ appName: 'SBAdvisoryMA', moduleName: 'EnrolmentModule' }).navigateToScreens('SBAInfo');
    },

    alignVerticalWidgets: function () {
      const heightNA = parseFloat(contentScope.flxNeedAttention.height),
        heightQL = parseFloat(contentScope.flxQuickLinks.height),
        heightFR = parseFloat(contentScope.flxMyInvoices.height);
      if (breakpoint > 1024) {
        contentScope.flxSba.setVisibility(isSbaEnabled);
        let height = isSbaEnabled ? parseFloat(contentScope.flxSba.height) + 20 : 0;
        contentScope.flxNeedAttention.top = `${height}dp`;
        contentScope.flxQuickLinks.top = `${parseFloat(contentScope.flxNeedAttention.top) + heightNA + 20}dp`;
        contentScope.flxMyInvoices.top = `${parseFloat(contentScope.flxQuickLinks.top) + heightQL + 40}dp`;
      }
      else {
        contentScope.flxSba.setVisibility(false);
      }
    },
  };
});