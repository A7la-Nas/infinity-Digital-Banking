define(["ViewConstants", "CommonUtilities", "SCFUtils"], function (ViewConstants, CommonUtilities, SCFUtils) {
  const fontIcons = {
    'chevronUp': 'P',
    'chevronDown': 'O',
  },
    skins = {
      'pageEnabled': 'sknOLBFonts003e7512px',
      'pageDisabled': 'sknLblFontTypeIcona0a0a012px',
    },
    images = {
      'sortAsc': ViewConstants.IMAGES.SORT_PREV_IMAGE,
      'sortDesc': ViewConstants.IMAGES.SORT_NEXT_IMAGE,
      'noSort': ViewConstants.IMAGES.SORT_FINAL_IMAGE
    };
  let scope, presenter, invoicePresenter, paymentAllocationPresenter, contentScope, popupScope, breakpoint, previousIndex, currDate,
    programData, fundingRequestData, exchangeRatesData, programDropdownData,
    programSegmentData, tabSelected = 1, myInvoicesData,
    totalPages, currentPage, isSearchApplied, searchCriteria, tagsData,
    isSbaEnabled = false, sbaDetails, paymentAllocationsData,
    listData, listParams = {
      sortByParam: "",
      sortOrder: ""
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
    /**
     * Handles the navigation.
     */
    onNavigate: function () {
      breakpoint = kony.application.getCurrentBreakpoint();
    },
    /**
     * Handles breakpoint change.
     * @param {object} formHandle - Specifies the handle of form.
     * @param {number} breakpoint - Specifies the current breakpoint value.
     */
    onBreakpointChange: function (formHandle, breakpoint) {
      breakpoint = kony.application.getCurrentBreakpoint();
      this.view.formTemplate12.hideBannerError();
      if (breakpoint > 1024) {
        ['flxProgram', 'flxLimits', 'flxList'].forEach(w => contentScope[w].width = "66%");
        ['flxNeedAttention', 'flxQuickLinks', 'flxMyFundingRequest', 'flxExchangeRates'].forEach(w => contentScope[w].width = "32%");
        contentScope.flxMyFundingRequest.left = "";
        contentScope.flxMyFundingRequest.right = "0dp";
      } else {
        ['flxProgram', 'flxNeedAttention', 'flxQuickLinks', 'flxLimits', 'flxList'].forEach(w => contentScope[w].width = "100%");
        ['flxMyFundingRequest', 'flxExchangeRates'].forEach(w => contentScope[w].width = "48.2%");
        contentScope.flxMyFundingRequest.left = "0dp";
        contentScope.flxMyFundingRequest.right = "";
      }
    },
    /**
     * Performs the actions required before rendering form.
     */
    preShow: function () {
      exchangeRatesData = presenter.exchangeRates;
      popupScope.flxAdvanceSearch.doLayout = CommonUtilities.centerPopupFlex;
    },
    /**
     * Performs the actions required after rendering form.
     */
    postShow: function () {
      applicationManager.getNavigationManager().applyUpdates(this);
      this.resetForm();
      if (presenter.configurationManager.isMicroAppPresent(presenter.configurationManager.microappConstants.SMARTBANKINGADVISORY)) {
        this.getSbaDetails();
      }
    },
    /**
     * Method to initialise form actions.
     */
    initFormActions: function () {
      scope = this;
      currDate = new Date();
      currDate.setHours(0, 0, 0, 0);
      presenter = applicationManager.getModulesPresentationController({
        appName: 'TradeSupplyFinMA',
        moduleName: 'AnchorUIModule'
      });
      invoicePresenter = applicationManager.getModulesPresentationController({
        appName: 'TradeSupplyFinMA',
        moduleName: 'InvoicesUIModule'
      });
      paymentAllocationPresenter = applicationManager.getModulesPresentationController({
        'appName': 'TradeSupplyFinMA',
        'moduleName': 'PaymentAllocationUIModule'
      });
      contentScope = this.view.formTemplate12.flxContentTCCenter;
      popupScope = this.view.formTemplate12.flxContentPopup;
      [
        contentScope.flxClearSearchPG,
        contentScope.flxPageStart,
        contentScope.flxPagePrevious,
        contentScope.flxPageNext,
        contentScope.flxPageEnd,
        contentScope.flxQL1,
        contentScope.flxQL3,
        contentScope.flxQL2,
        contentScope.flxRefreshER,
        popupScope.flxASClose,
        contentScope.flxASRAction1,
        contentScope.flxASRAction2
      ].forEach(w => w.cursorType = 'pointer');
      contentScope.btnTab1.toolTip = kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.MyFundingRequest');
      contentScope.btnTab2.toolTip = kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.MyInvoices');
      contentScope.btnTab3.toolTip = kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.PaymentAllocation');
      contentScope.lblQL1.toolTip = kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.CreateFundingRequest');
      contentScope.lblQL2.toolTip = kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.CreateNewCounterpartyRequest');
      contentScope.lblQL3.toolTip = kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.UploadInvoices');
      contentScope.tbxSearchPG.onTextChange = () => contentScope.flxClearSearchPG.setVisibility(contentScope.tbxSearchPG.text !== '');
      contentScope.tbxSearchPG.onKeyUp = this.searchProgram;
      contentScope.flxClearSearchPG.onClick = () => {
        contentScope.tbxSearchPG.text = '';
        contentScope.flxClearSearchPG.setVisibility(false);
        scope.searchProgram();
      };
      contentScope.btnTab1.onClick = () => {
        contentScope.flxLoadingList.setVisibility(true);
        contentScope.flxContainerList.setVisibility(false);
        presenter.getFundingRequests(this.view.id);
      };
      contentScope.btnTab2.onClick = () => {
        contentScope.flxLoadingList.setVisibility(true);
        contentScope.flxContainerList.setVisibility(false);
        invoicePresenter.getFilteredInvoices(this.view.id, false);
      };
      contentScope.btnTab3.onClick = () => {
        contentScope.flxLoadingList.setVisibility(true);
        contentScope.flxContainerList.setVisibility(false);
        presenter.getPaymentAllocations(this.view.id);
      };
      contentScope.flxPageStart.onClick = this.applyPagination.bind(this, 'start');
      contentScope.flxPagePrevious.onClick = this.applyPagination.bind(this, 'previous');
      contentScope.flxPageNext.onClick = this.applyPagination.bind(this, 'next');
      contentScope.flxPageEnd.onClick = this.applyPagination.bind(this, 'end');
      contentScope.btnAdvancedSearch.onClick = () => scope.toggleAdvanceSearchPopup(true);
      popupScope.flxASClose.onClick = () => scope.toggleAdvanceSearchPopup(false);
      popupScope.btnASAction1.onClick = () => scope.toggleAdvanceSearchPopup(false);
      popupScope.btnASAction2.onClick = this.applyAdvanceSearch;
      contentScope.flxRefreshER.onClick = this.setExchangeRates;
      contentScope.flxContainerPG.doLayout = this.alignWidgets;
      contentScope.flxASRAction1.onClick = () => scope.toggleAdvanceSearchPopup(true);
      contentScope.flxASRAction2.onClick = () => {
        isSearchApplied = false;
        listData = {
          1: fundingRequestData,
          2: myInvoicesData,
          3: paymentAllocationsData
        }[tabSelected] || [];
        totalPages = Math.ceil(listData.length / 10);
        currentPage = totalPages === 0 ? 0 : 1;
        contentScope.flxListSearchContainer.setVisibility(true);
        contentScope.flxListSearchResults.setVisibility(false);
        scope.setPagination();
        scope.sortRecords();
      };
      contentScope.flxQL1.onClick = () => presenter.loadScreenWithContext({
        'context': 'createFundingRequest'
      });
      contentScope.flxQL3.onClick = () => invoicePresenter.loadScreenWithContext({
        'context': 'invoiceUpload',
        'uploader': 'anchor'
      });
      popupScope.cal1ASF4T1.onSelection = () => scope.enableStartDate(popupScope.cal1ASF4T1, popupScope.cal2ASF4T1);
      popupScope.cal1ASF4T2.onSelection = () => scope.enableStartDate(popupScope.cal1ASF4T2, popupScope.cal2ASF4T2);
      popupScope.cal1ASF6T3.onSelection = () => scope.enableStartDate(popupScope.cal1ASF6T3, popupScope.cal2ASF6T3);
      const validEndDate = [currDate.getDate(), currDate.getMonth() + 1, currDate.getFullYear()];
      ['cal1ASF4T1', 'cal2ASF4T1', 'cal1ASF4T2', 'cal2ASF4T2'].forEach(w => popupScope[w].validEndDate = validEndDate);
      contentScope.flxQL1.setVisibility(presenter.configurationManager.checkUserPermission('Anchor_Funding_Request_Create'));
      contentScope.flxQL3.setVisibility(presenter.configurationManager.checkUserPermission('Upload_Invoice_Anchor'));
      contentScope.btnSBALearnMore.onClick = this.navigateToSBAScreen.bind(this);
      contentScope.imgSbaClose.onTouchEnd = function () {
        contentScope.flxSba.setVisibility(false);
        isSbaEnabled = false;
        scope.alignVerticalWidgets();
      }

      contentScope.btnTab2.setVisibility(presenter.configurationManager.checkUserPermission('Anchor_My_Invoices_View'));
      contentScope.btnTab1.setVisibility(presenter.configurationManager.checkUserPermission('Anchor_Funding_Request_View'));
      contentScope.btnTab3.setVisibility(presenter.configurationManager.checkUserPermission('Payment_Allocations_Anchor_View'));
      contentScope.flxNA1.setVisibility(presenter.configurationManager.checkUserPermission('Invoice_Pending_Approval_View'));
      contentScope.flxNA2.setVisibility(presenter.configurationManager.checkUserPermission('Anchor_Funding_Request_View'));
      contentScope.flxNA3.setVisibility(presenter.configurationManager.checkUserPermission('Payment_Allocation_Anchor_View_Pending'));
      contentScope.btnNA1.onClick = () => invoicePresenter.getFilteredInvoices('frmInvoicePendingApproval', true);
      contentScope.btnNA2.onClick = () => { };
      contentScope.btnNA3.onClick = () => paymentAllocationPresenter.loadScreenWithContext({
        'context': 'pendingPaymentAllocation',
        'allocater': 'anchor'
      });
      this.initialiseCharts();
      this.renderCalendars();
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
      if (viewModel.fundingRequests) {
        fundingRequestData = viewModel.fundingRequests;
        contentScope.flxNoInvoice.setVisibility(false);
        contentScope.flxLoadingFR.setVisibility(false);
        contentScope.flxContainerFR.setVisibility(true);
        contentScope.flxLoadingList.setVisibility(false);
        contentScope.flxContainerList.setVisibility(true);
        this.setDropdownData(1);
        this.setListTab(1);
        this.setFundingRequestChart();
      }
      if (viewModel.saveFundingRequest) {
        this.view.formTemplate12.setBannerFocus();
        this.view.formTemplate12.showBannerError({
          'i18n': kony.i18n.getLocalizedString('i18n.TradeFinance.requestSavedSuccessfullyMessage')
        });
      }
      if (viewModel.cancelFundingRequest) {
        this.view.formTemplate12.setBannerFocus();
        this.view.formTemplate12.showBannerError({
          'i18n': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.cancelRequestSuccessMsg')
        });
      }
      if (viewModel.filteredInvoices) {
        myInvoicesData = viewModel.filteredInvoices;
        contentScope.flxLoadingFR.setVisibility(false);
        contentScope.flxContainerFR.setVisibility(true);
        contentScope.flxLoadingList.setVisibility(false);
        contentScope.flxContainerList.setVisibility(true);
        this.setDropdownData(2);
        this.setListTab(2);
      }
      if (viewModel.pendingInvoices) {
        contentScope.lblNA1.text = String((viewModel.pendingInvoices || []).length).padStart(2, 0);
        contentScope.flxNA1.forceLayout();
      }
      if (viewModel.programmesAndFacilities) {
        programData = viewModel.programmesAndFacilities;
        this.setDropdownData();
      }
      if (viewModel.paymentAllocations) {
        paymentAllocationsData = viewModel.paymentAllocations;
        contentScope.flxNoInvoice.setVisibility(false);
        contentScope.flxLoadingFR.setVisibility(false);
        contentScope.flxContainerFR.setVisibility(true);
        contentScope.flxLoadingList.setVisibility(false);
        contentScope.flxContainerList.setVisibility(true);
        this.setDropdownData(3);
        this.setListTab(3);
      }
      if (viewModel.pendingPaymentAllocations) {
        contentScope.lblNA3.text = String((viewModel.pendingPaymentAllocations || []).length).padStart(2, 0);
        contentScope.flxNA3.forceLayout();
      }
      if (viewModel.serverError) {
        this.view.formTemplate12.setBannerFocus();
        this.view.formTemplate12.showBannerError({
          'dbpErrMsg': viewModel.serverError
        });
      }
    },
    /**
     * Initialises the charts.
     */
    initialiseCharts: function () {
      const limitChartOptions = {
        'title': '',
        'height': 350,
        'width': 600,
        'legend': 'none',
        'isStacked': true,
        'bar': {
          'groupWidth': "40%"
        },
        'hAxis': {
          'baselineColor': '#E3E3E3',
          'gridlines': {
            'color': "#E3E3E3"
          },
          'viewWindow': {
            'min': 0
          },
          'format': "short",
          'textStyle': {
            'color': '#727272',
            'fontName': 'SourceSansPro-Regular',
            'fontSize': '13'
          }
        },
        'vAxis': {
          'textStyle': {
            'color': '#424242',
            'fontName': 'SourceSansPro-Regular',
            'fontSize': '15'
          }
        },
        'chartArea': {
          'left': 230,
          'top': 25
        },
        'colors': ['#4176A4', '#CFDDE8'],
        'tooltip': {
          'textStyle': {
            'fontName': 'SourceSansPro-Regular'
          }
        }
      };
      let limitsChart = new kony.ui.CustomWidget({
        "id": "limitsChart",
        "isVisible": true,
        "left": "4.4%",
        "width": "90%",
        "height": "100%",
        "zIndex": 1
      }, {
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {
        "widgetName": "SCFBarChart",
        "chartData": [],
        "chartProperties": limitChartOptions,
        "chartId": 'limitsChart_div'
      });
      contentScope.flxDataLM.add(limitsChart);
      const fundingRequestChartOptions = {
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
        'colors': ['#FF8600', '#F7EA3A', '#3897D6', '#4176A4', '#23A8B1', '#7BCCC4', '#77BC43', '#E8705B'],
        'pieSliceText': 'none',
        'pieSliceBorderColor': "transparent",
        'centerText': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.TotalRequests')
      };
      let fundingRequestChart = new kony.ui.CustomWidget({
        "id": "fundingRequestChart",
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
        "chartProperties": fundingRequestChartOptions,
        "chartId": 'fundingRequestChart_div'
      });
      contentScope.flxDataFR.add(fundingRequestChart);
    },
    /**
     * Sets the position of calendars.
     */
    renderCalendars: function () {
      const calendars = [popupScope.cal1ASF4T1, popupScope.cal2ASF4T1, popupScope.cal1ASF4T2, popupScope.cal2ASF4T2, popupScope.cal1ASF6T3, popupScope.cal2ASF6T3];
      for (const calWidget of calendars) {
        calWidget.dateEditable = false;
        calWidget.setContext({
          "widget": calWidget,
          "anchor": "bottom"
        });
      }
    },
    /**
     * Resets the form.
     */
    resetForm: function () {
      contentScope.flxClearSearchPG.setVisibility(false);
      contentScope.tbxSearchPG.text = '';
      contentScope.flxLoadingPG.setVisibility(true);
      contentScope.flxContainerPG.setVisibility(false);
      contentScope.flxLoadingLM.setVisibility(true);
      contentScope.flxContainerLM.setVisibility(false);
      contentScope.flxLoadingNA.setVisibility(false);
      contentScope.flxContainerNA.setVisibility(true);
      contentScope.flxLoadingFR.setVisibility(true);
      contentScope.flxContainerFR.setVisibility(false);
      contentScope.flxLoadingList.setVisibility(true);
      contentScope.flxContainerList.setVisibility(false);
      contentScope.flxLoadingER.setVisibility(true);
      contentScope.flxContainerER.setVisibility(false);
      contentScope.flxSba.setVisibility(false);
      presenter.getProgrammesAndFacilities(this.view.id);
      presenter.getFundingRequests(this.view.id);
      invoicePresenter.getFilteredInvoices(this.view.id, true);
      presenter.getPaymentAllocations(this.view.id, true);
      presenter.getLiveInvoices(this.view.id);
      this.setExchangeRates();
    },
    /**
     * Sets the dropdown data.
     * @param {number} tabIdx - Specifies the index of list tab.
     */
    setDropdownData: function (tabIdx) {
      if (!tabIdx) {
        if (!programData || !programData.length) {
          contentScope.flxLoadingPG.setVisibility(false);
          contentScope.flxContainerPG.setVisibility(true);
          contentScope.flxHeaderPG.setVisibility(false);
          contentScope.flxDataPG.setVisibility(false);
          contentScope.flxNoRecordsPG.setVisibility(true);
          contentScope.flxLoadingLM.setVisibility(false);
          contentScope.flxContainerLM.setVisibility(true);
          contentScope.flxDropdownLM.setVisibility(false);
          contentScope.flxDataLM.setVisibility(false);
          contentScope.flxNoRecordsLM.setVisibility(true);
          return;
        }
        contentScope.flxHeaderPG.setVisibility(true);
        contentScope.flxDataPG.setVisibility(true);
        contentScope.flxNoRecordsPG.setVisibility(false);
        contentScope.flxDropdownLM.setVisibility(true);
        contentScope.flxDataLM.setVisibility(true);
        contentScope.flxNoRecordsLM.setVisibility(false);
        programDropdownData = programData.reduce((acc, obj) => {
          acc[`P${obj.account}`] = `${obj.shortTitle} / ${obj.account}`;
          return acc;
        }, {
          'All': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.allProgrammes')
        });
        contentScope.ProgramDropdown.setContext(programDropdownData);
        contentScope.LimitsDropdown.setContext(programDropdownData);
        contentScope.ProgramDropdown.selectKey('All');
        contentScope.LimitsDropdown.selectKey('All');
      }
      //Sets the dropdown for Funding Request Tab.
      if (tabIdx === 1) {
        const dropdownDataASFT1 = (fundingRequestData || []).reduce((acc, obj) => {
          obj.supplierName && (acc['anchor'][obj.supplierName] = obj.supplierName);
          obj.facilityName && (acc['facility'][obj.facilityName] = obj.facilityName);
          return acc;
        }, {
          'anchor': {
            'All': kony.i18n.getLocalizedString('i18n.konybb.Common.All')
          },
          'facility': {
            'All': kony.i18n.getLocalizedString('i18n.konybb.Common.All')
          }
        });
        popupScope.DropdownASF1T1.setContext(dropdownDataASFT1.anchor);
        popupScope.DropdownASF3T1.setContext(presenter.anchorDashboardConfig.listTimePeriodFilters);
        popupScope.DropdownASF5T1.setContext(dropdownDataASFT1.facility);
        popupScope.DropdownASF6T1.setContext(Object.assign({
          'All': kony.i18n.getLocalizedString('i18n.konybb.Common.All')
        }, presenter.anchorDashboardConfig.fundingRequestChartStatus));
      }
      //Sets the dropdown for Invoice Tab.
      if (tabIdx === 2) {
        const dropdownDataASFT2 = (myInvoicesData || []).reduce((acc, obj) => {
          obj.supplierId && (acc['supplier'][obj.supplierId] = obj.supplierId);
          obj.status && (acc['status'][obj.status] = obj.status);
          return acc;
        }, {
          'supplier': {
            'All': kony.i18n.getLocalizedString('i18n.konybb.Common.All')
          },
          'status': {
            'All': kony.i18n.getLocalizedString('i18n.konybb.Common.All')
          }
        });
        popupScope.DropdownASF1T2.setContext(dropdownDataASFT2.supplier);
        popupScope.DropdownASF3T2.setContext(presenter.anchorDashboardConfig.listTimePeriodFilters);
        popupScope.DropdownASF5T2.setContext(dropdownDataASFT2.status);
      }
      //Sets the dropdown for Payment Allocation Tab.
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
        popupScope.DropdownASF4T3.setContext(Object.assign({
          'All': kony.i18n.getLocalizedString('i18n.konybb.Common.All')
        }, presenter.anchorDashboardConfig.paymentAllocationStatus));
        popupScope.DropdownASF5T3.setContext(presenter.anchorDashboardConfig.listTimePeriodFilters);
      }
    },
    /**
     * Handles the dropdown selection trigerred from component.
     * @param {string} widgetId - Specifies widget id.
     * @param {string} selectedKey - Specifies selected key.
     */
    handleDropdownSelection: function (widgetId, selectedKey) {
      switch (widgetId) {
        case 'ProgramDropdown':
          contentScope.flxClearSearchPG.setVisibility(false);
          contentScope.tbxSearchPG.text = '';
          this.setProgramData(selectedKey);
          break;
        case 'LimitsDropdown':
          this.setLimitsData(selectedKey);
          break;
        case 'DropdownASF3T1':
          this.setASCalendars(selectedKey, popupScope.flxASF4T1, popupScope.cal1ASF4T1, popupScope.cal2ASF4T1);
          break;
        case 'DropdownASF3T2':
          this.setASCalendars(selectedKey, popupScope.flxASF4T2, popupScope.cal1ASF4T2, popupScope.cal2ASF4T2);
          break;
        case 'DropdownASF5T3':
          this.setASCalendars(selectedKey, popupScope.flxASF6T3, popupScope.cal1ASF6T3, popupScope.cal2ASF6T3);
          break;
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
        currSymbol = '', currencySet = new Set();
      if (selectedKey === 'All') {
        totalAccounts = programData.length;
        let segRowData = [];
        programData.forEach(p => {
          currencySet.add(p.currency);
          currSymbol = presenter.configurationManager.getCurrency(p.currency);
          totalAvailable += p.availableCommitment;
          totalUtilised += p.utilisedCommitment;
          segRowData.push({
            'lblName': `${p.shortTitle} / ${p.account}`,
            'lblCount': `${p.facilities.length} ${kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.facilities')}`,
            'lblAvailableAmount': `${currSymbol}${presenter.formatUtilManager.formatAmount(p.availableCommitment)}`,
            'lblUtilisedAmount': `${currSymbol}${presenter.formatUtilManager.formatAmount(p.utilisedCommitment)}`,
            'availableAmount': p.availableCommitment,
            'utitlisedAmount': p.utilisedCommitment,
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
        const selectedProgram = programData.find(p => `P${p.account}` === selectedKey);
        currencySet.add(selectedProgram.currency);
        totalAccounts = selectedProgram.facilities.length;
        currSymbol = presenter.configurationManager.getCurrency(selectedProgram.currency);
        segData.push([
          {
            'lblHeading': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.ProgramReference'),
            'flxDropdown': {
              'isVisible': false
            }
          },
          [{
            'lblName': `${selectedProgram.shortTitle} / ${selectedProgram.account}`,
            'lblCount': `${totalAccounts} ${kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.facilities')}`,
            'lblAvailableAmount': `${currSymbol}${presenter.formatUtilManager.formatAmount(selectedProgram.availableCommitment)}`,
            'lblUtilisedAmount': `${currSymbol}${presenter.formatUtilManager.formatAmount(selectedProgram.utilisedCommitment)}`
          }]
        ]);
        if (totalAccounts) {
          let segRowData = [];
          selectedProgram.facilities.forEach(f => {
            currencySet.add(f.currency);
            currSymbol = presenter.configurationManager.getCurrency(f.currency);
            totalAvailable += f.availableCommitment;
            totalUtilised += f.utilisedCommitment;
            segRowData.push({
              'lblName': `${f.shortTitle} / ${f.account}`,
              'lblCount': {
                'isVisible': false
              },
              'lblAvailableAmount': `${currSymbol}${presenter.formatUtilManager.formatAmount(f.availableCommitment)}`,
              'lblUtilisedAmount': `${currSymbol}${presenter.formatUtilManager.formatAmount(f.utilisedCommitment)}`,
              'availableAmount': f.availableCommitment,
              'utitlisedAmount': f.utilisedCommitment,
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
      }
      programSegmentData = JSON.parse(JSON.stringify(segData));
      contentScope.segProgram.setData(segData);
      if (currencySet.size === 1) {
        contentScope.flxTotalPG.setVisibility(true);
        contentScope.lblTotalAccountCount.text = String(totalAccounts).padStart(2, 0);
        contentScope.lblTotalAvailableCount.text = `${currSymbol}${presenter.formatUtilManager.formatAmount(totalAvailable)}`;
        contentScope.lblTotalUsedCount.text = `${currSymbol}${presenter.formatUtilManager.formatAmount(totalUtilised)}`;
      } else {
        contentScope.flxTotalPG.setVisibility(false);
      }
      contentScope.flxLoadingPG.setVisibility(false);
      contentScope.flxContainerPG.setVisibility(true);
      contentScope.flxProgram.forceLayout();
    },
    /**
     * Handles the program widget search.
     */
    searchProgram: function () {
      const searchText = contentScope.tbxSearchPG.text.toLowerCase(),
        selectedKey = contentScope.ProgramDropdown.getSelectedKey();
      if (searchText.length >= 3 || !contentScope.flxClearSearchPG.isVisible) {
        let newSegData = JSON.parse(JSON.stringify(programSegmentData)),
          totalAccounts = 0,
          totalAvailable = 0,
          totalUtilised = 0,
          currSymbol = '';
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
    /**
     * Sets the limits chart.
     * @param {string} selectedKey - Specifies selected key.
     */
    setLimitsData: function (selectedKey) {
      let chartData = [];
      if (selectedKey === 'All') {
        chartData.push(['Program', 'Utilised', 'Available']);
        programData.forEach(p => chartData.push([`${p.shortTitle} / ${p.account}`, p.utilisedCommitment, p.availableCommitment]));
      } else {
        chartData.push(['Facility', 'Utilised', 'Available']);
        const facilities = programData.find(p => `P${p.account}` === selectedKey).facilities || [];
        facilities.forEach(f => chartData.push([`${f.shortTitle} / ${f.account}`, f.utilisedCommitment, f.availableCommitment]));
      }
      if (chartData.length < 2) {
        contentScope.flxDataLM.setVisibility(false);
        contentScope.flxNoRecordsLM.setVisibility(true);
      } else {
        contentScope.flxDataLM.setVisibility(true);
        contentScope.flxNoRecordsLM.setVisibility(false);
        contentScope.flxDataLM.limitsChart.chartData = chartData;
      }
      contentScope.flxLoadingLM.setVisibility(false);
      contentScope.flxContainerLM.setVisibility(true);
      contentScope.flxLimits.forceLayout();
    },
    /**
     * Sets the list tab.
     * @param {number} tabIdx - Specifies the index of tab.
     */
    setListTab: function (tabIdx) {
      tabSelected = tabIdx;
      isSearchApplied = false;
      contentScope.btnTab1.skin = 'ICSknBtnAccountSummaryUnselected2'
      contentScope.btnTab2.skin = 'ICSknBtnAccountSummaryUnselected2';
      contentScope.btnTab3.skin = 'ICSknBtnAccountSummaryUnselected2';
      if (tabSelected === 1) {
        listData = fundingRequestData;
        contentScope.btnTab1.skin = 'ICSknBtnAccountSummarySelected2'
        listParams['sortByParam'] = 'modificationDate';
        listParams['sortOrder'] = 'DESC';
        contentScope.lblListInfo.text = kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.ShowingRecentFundingRequest');
      } else if (tabSelected === 2) {
        listData = myInvoicesData;
        contentScope.btnTab2.skin = 'ICSknBtnAccountSummarySelected2';
        listParams['sortByParam'] = 'modificationDate';
        listParams['sortOrder'] = 'DESC';
        contentScope.lblListInfo.text = kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.anchorinvoicesinfo');
      } else if (tabSelected === 3) {
        listData = paymentAllocationsData;
        contentScope.btnTab3.skin = 'ICSknBtnAccountSummarySelected2';
        listParams['sortByParam'] = 'transactionId';
        listParams['sortOrder'] = 'DESC';
        contentScope.lblListInfo.text = kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.ShowRecentPaymentAllocation');
      }
      if (listData.length > 0) {
        totalPages = Math.ceil(listData.length / 10);
        currentPage = totalPages === 0 ? 0 : 1;
        contentScope.flxListSearchContainer.setVisibility(true);
        contentScope.flxListSearchResults.setVisibility(false);
        contentScope.flxListData.setVisibility(true);
        contentScope.flxListSearch.setVisibility(true);
        contentScope.flxListPagination.setVisibility(true);
        contentScope.flxNoInvoice.setVisibility(false);
        this.setPagination();
        this.sortRecords();
      } else {
        contentScope.flxListData.setVisibility(false);
        contentScope.flxListSearch.setVisibility(false);
        contentScope.flxListPagination.setVisibility(false);
        contentScope.flxNoInvoice.setVisibility(true);
        contentScope.lblNoData.text = {
          1: kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.nofundingrequestsmsg'),
          2: kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.noinvoicesmsg'),
          3: 'No Payment Allocation Records Present'
        }[tabSelected] || '';
        contentScope.flxList.forceLayout();
      }
    },
    /**
     * Sets the list data.
     */
    setListData: function () {
      const start = parseInt(currentPage - 1 + "0"),
        end = start + 10;
      paginatedRecords = (listData || []).slice(start, end);
      let segData = [],
        segRowData = [];
      previousIndex = undefined;
      if (tabSelected === 1) {
        for (const record of paginatedRecords) {
          const status = record.status;
          let segObj = {
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
            "flxDropdown": {
              "onClick": this.handleSegmentRowView
            },
            'flxColumn1': {
              'width': '21%',
            },
            'flxColumn2': {
              'width': '26%',
              'reverseLayoutDirection': true
            },
            'flxColumn3': {
              'left': '3%',
              'width': '21.5%',
            },
            'flxColumn4': {
              'isVisible': false
            },
            'flxAction': {
              'left': '1%',
              'width': '20%',
            },
            'lblColumn1': record.fundingRequestId || '-',
            'lblColumn2': (record.currency && record.fundingRequestAmount) ? `${presenter.configurationManager.getCurrency(record.currency)}${presenter.formatUtilManager.formatAmount(record.fundingRequestAmount)}` : '-',
            'lblColumn3': record.createdDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.createdDate) : '-',
            'btnAction': {
              'text': (status === presenter.fundingStatus.Draft ? kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.Continue') : (status === presenter.fundingStatus.ReturnedByBank ? kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.Edit') : kony.i18n.getLocalizedString('i18n.common.ViewDetails'))),
              'onClick': function (context) {
                scope.onClickOfActions(context, record);
              },
              'isVisible': (status === presenter.fundingStatus.ReturnedByBank ? presenter.configurationManager.checkUserPermission('Anchor_Funding_Request_Edit') : true)
            },
            'lblRow1Key': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.anchorWithColonWithColon'),
            'lblRow1Value': record.supplierName || '-',
            'lblRow2Key': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.facilityIDWithColon'),
            'lblRow2Value': record.facilityId || '-',
            'lblRow3Key': kony.i18n.getLocalizedString('i18n.wealth.statuswithColon'),
            'lblRow3Value': record.status || '-',
            'lblRow6Key': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.ActionWithColon')
          };
          if (status === presenter.fundingStatus.Draft) {
            segObj.flxRow6 = {
              'isVisible': true
            };
            segObj.lblRow6Button1 = {
              "text": kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.Delete'),
              'isVisible': true,
              'onClick': function (context) {
                scope.onClickOfActions(context, record);
              }
            }
          } else if (status === presenter.fundingStatus.ReturnedByBank) {
            segObj.flxRow6 = {
              'isVisible': true
            };
            segObj.lblRow6Button1 = {
              "text": kony.i18n.getLocalizedString('i18n.common.ViewDetails'),
              'isVisible': true,
              'onClick': function (context) {
                scope.onClickOfActions(context, record);
              }
            };
            segObj.lblRow6Button2 = {
              "text": kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.Cancel'),
              'isVisible': presenter.configurationManager.checkUserPermission('Anchor_Funding_Request_Cancel'),
              'onClick': function (context) {
                scope.onClickOfActions(context, record);
              }
            }
          } else if (status === presenter.fundingStatus.Cancelled || status === presenter.fundingStatus.SubmittedByBank || status === presenter.fundingStatus.Funded) {
            segObj.flxRow6 = {
              'isVisible': true
            };
          } else {
            segObj.flxRow6 = {
              'isVisible': true
            };
            segObj.lblRow6Button1 = {
              "text": kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.Cancel'),
              'isVisible': presenter.configurationManager.checkUserPermission('Anchor_Funding_Request_Cancel'),
              'onClick': function (context) {
                scope.onClickOfActions(context, record);
              }
            };
          }
          segRowData.push(segObj);
        }
        segData.push([{
          'flxColumn1': {
            'width': '21%',
            'onClick': function (context) {
              listParams['sortByParam'] = 'fundingRequestId';
              scope.sortRecords(context)
            }
          },
          'flxColumn2': {
            'width': '26%',
            'layoutType': kony.flex.FREE_FORM,
            'onClick': function (context) {
              listParams['sortByParam'] = 'fundingRequestAmount';
              scope.sortRecords(context)
            }
          },
          'flxColumn3': {
            'left': '3%',
            'width': '21.5%',
            'onClick': function (context) {
              listParams['sortByParam'] = 'createdDate';
              scope.sortRecords(context)
            }
          },
          'flxColumn4': {
            'isVisible': false
          },
          'flxAction': {
            'left': '1%',
            'width': '20%',
          },
          'lblColumn1': kony.i18n.getLocalizedString('i18n.ImportLC.Reference'),
          'lblColumn2': {
            'text': kony.i18n.getLocalizedString('i18n.transfers.lblAmount'),
            'left': '',
            'right': '20dp'
          },
          'lblColumn3': kony.i18n.getLocalizedString('i18n.TradeFinance.CreationDate'),
          'lblAction': kony.i18n.getLocalizedString('i18n.TradeFinance.Action'),
          'imgColumn1': {
            'src': scope.getSortImage('fundingRequestId')
          },
          'imgColumn2': {
            'left': '',
            'right': '0dp',
            'src': scope.getSortImage('fundingRequestAmount')
          },
          'imgColumn3': {
            'src': scope.getSortImage('createdDate')
          }
        }, segRowData]);
      } else if (tabSelected === 2) {
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
            "flxDropdown": {
              "onClick": this.handleSegmentRowView
            },
            'flxColumn1': {
              'width': '20%'
            },
            'flxColumn2': {
              'left': '2%',
              'width': '18%'
            },
            'flxColumn3': {
              'width': '20%',
              'reverseLayoutDirection': true
            },
            'flxColumn4': {
              'left': '4%',
              'width': '16%',
              'isVisible': true
            },
            'flxAction': {
              'left': '2%',
              'width': '12%'
            },
            'lblColumn1': record.invoiceReference,
            'lblColumn2': record.supplierId,
            'lblColumn3': `${presenter.configurationManager.getCurrency(record.invoiceCurrency)}${presenter.formatUtilManager.formatAmount(record.invoiceAmount)}`,
            'lblColumn4': {
              'text': record.status,
            },
            'btnAction': {
              'text': kony.i18n.getLocalizedString('i18n.TradeFinance.View'),
              'onClick': function (context) {
                scope.onClickOfViewInvoice(context, record);
              }
            },
            'lblRow1Key': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.CreationDateWithColon'),
            'lblRow1Value': presenter.formatUtilManager.getFormattedCalendarDate(record.createdDate),
            'flxRow3': {
              'isVisible': false
            },
            'flxRow2': {
              'isVisible': false
            }
          });
        }
        segData.push([{
          'flxColumn1': {
            'width': '20%',
            'onClick': function (context) {
              listParams['sortByParam'] = 'invoiceReference';
              scope.sortRecords(context)
            }
          },
          'flxColumn2': {
            'left': '2%',
            'width': '18%',
            'onClick': function (context) {
              listParams['sortByParam'] = 'supplierId';
              scope.sortRecords(context)
            }
          },
          'flxColumn3': {
            'width': '20%',
            'layoutType': kony.flex.FREE_FORM,
            'onClick': function (context) {
              listParams['sortByParam'] = 'invoiceAmount';
              scope.sortRecords(context)
            }
          },
          'flxColumn4': {
            'left': '4%',
            'width': '16%',
            'onClick': function (context) {
              listParams['sortByParam'] = 'status';
              scope.sortRecords(context)
            },
            'isVisible': true
          },
          'flxAction': {
            'left': '2%',
            'width': '12%'
          },
          'lblColumn1': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.InvoiceReference'),
          'lblColumn2': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.supplierID'),
          'lblColumn3': {
            'text': kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.invoiceAmount'),
            'left': '',
            'right': '20dp'
          },
          'lblColumn4': {
            'text': kony.i18n.getLocalizedString('i18n.common.status')
          },
          'lblAction': kony.i18n.getLocalizedString('i18n.TradeFinance.Action'),
          'imgColumn1': {
            'src': scope.getSortImage('invoiceReference')
          },
          'imgColumn2': {
            'src': scope.getSortImage('supplierId')
          },
          'imgColumn3': {
            'left': '',
            'right': '0dp',
            'src': scope.getSortImage('invoiceAmount')
          },
          'imgColumn4': {
            'src': scope.getSortImage('status')
          }
        }, segRowData]);
      } else if (tabSelected === 3) {
        const viewPermission = presenter.configurationManager.checkUserPermission('Payment_Allocation_Anchor_View_Submitted'),
          editPermission = presenter.configurationManager.checkUserPermission('Payment_Allocation_Anchor_Edit_Submitted');
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
            "flxDropdown": {
              "onClick": this.handleSegmentRowView
            },
            'flxColumn1': {
              'width': '20%'
            },
            'flxColumn2': {
              'isVisible': breakpoint > 1024 ? true : false,
              'left': '2%',
              'width': '18%'
            },
            'flxColumn3': {
              'width': '20%',
              'reverseLayoutDirection': true
            },
            'flxColumn4': {
              'left': breakpoint > 1024 ? '4%' : '8%',
              'width': breakpoint > 1024 ? '16%' : '23%',
              'isVisible': true
            },
            'flxAction': {
              'left': '2%',
              'width': '12%'
            },
            'flxRow4': {
              'isVisible': breakpoint > 1024 ? false : true
            },
            'lblColumn1': record.transactionId,
            'lblColumn2': record.valueDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.valueDate) : '-',
            'lblColumn3': `${presenter.configurationManager.getCurrency(record.currency)}${presenter.formatUtilManager.formatAmount(record.originalAmount)}`,
            'lblColumn4': record.status,
            'btnAction': {
              'text': record.btnActionLabel === 'edit' ? kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.Edit') : kony.i18n.getLocalizedString('i18n.TradeFinance.View'),
              'toolTip': record.btnActionLabel === 'edit' ? kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.Edit') : kony.i18n.getLocalizedString('i18n.TradeFinance.View'),
              'isVisible': (record.btnActionLabel === 'view' && viewPermission) || (record.btnActionLabel === 'edit' && editPermission),
              'onClick': () => paymentAllocationPresenter.loadScreenWithContext({
                'context': 'allocationDocuments',
                'allocater': 'anchor',
                'displayMode': record.btnActionLabel,
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
              scope.sortRecords(context)
            }
          },
          'flxColumn2': {
            'left': '2%',
            'width': '18%',
            'isVisible': breakpoint > 1024 ? true : false,
            'onClick': function (context) {
              listParams['sortByParam'] = 'valueDate';
              scope.sortRecords(context)
            }
          },
          'flxColumn3': {
            'width': '20%',
            'layoutType': kony.flex.FREE_FORM,
            'onClick': function (context) {
              listParams['sortByParam'] = 'originalAmount';
              scope.sortRecords(context)
            }
          },
          'flxColumn4': {
            'left': breakpoint > 1024 ? '4%' : '8%',
            'width': breakpoint > 1024 ? '16%' : '23%',
            'onClick': function (context) {
              listParams['sortByParam'] = 'status';
              scope.sortRecords(context)
            },
            'isVisible': true
          },
          'flxAction': {
            'left': '2%',
            'width': '12%'
          },
          'lblColumn1': kony.i18n.getLocalizedString('kony.i18n.common.transactionID'),
          'lblColumn2': kony.i18n.getLocalizedString('i18n.wealth.valueDate'),
          'lblColumn3': {
            'text': kony.i18n.getLocalizedString('kony.mb.accdetails.originalAmount'),
            'left': '',
            'right': '20dp'
          },
          'lblColumn4': {
            'text': kony.i18n.getLocalizedString('i18n.common.status')
          },
          'lblAction': kony.i18n.getLocalizedString('i18n.TradeFinance.Action'),
          'imgColumn1': {
            'src': scope.getSortImage('transactionId')
          },
          'imgColumn2': {
            'src': scope.getSortImage('valueDate')
          },
          'imgColumn3': {
            'left': '',
            'right': '0dp',
            'src': scope.getSortImage('originalAmount')
          },
          'imgColumn4': {
            'src': scope.getSortImage('status')
          }
        }, segRowData]);
      }
      contentScope.segList.setData(segData);
      contentScope.flxList.forceLayout();
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
     * Handles the segment row view on click of dropdown.
     */
    handleSegmentRowView: function () {
      const rowIndex = contentScope.segList.selectedRowIndex[1],
        segData = contentScope.segList.data[0][1],
        data = segData[rowIndex],
        collapsedView = [fontIcons.chevronDown, false, "slFbox", "sknflxffffffnoborder"],
        expandedView = [fontIcons.chevronUp, true, "skbflx293276", "ICSknFlxfbfbfb"];
      if (previousIndex === rowIndex) {
        this.toggleSegmentRowView(data, rowIndex, data.lblDropdown === fontIcons.chevronUp ? collapsedView : expandedView);
      } else {
        if (previousIndex >= 0) {
          this.toggleSegmentRowView(segData[previousIndex], previousIndex, collapsedView);
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
      contentScope.segList.setDataAt(data, index, 0);
    },
    /**
     * Sets the funding request chart.
     */
    setFundingRequestChart: function () {
      let chartData = [
        ['Status', 'Count']
      ];
      const fundingRequestChartData = fundingRequestData.reduce((acc, obj) => {
        if (!acc[obj.status]) acc[obj.status] = 0;
        acc[obj.status]++;
        return acc;
      }, {});
      contentScope.lblNA2.text = String((fundingRequestChartData['Returned by Bank'] || 0)).padStart(2, 0);
      contentScope.flxNA2.forceLayout();
      for (const [key, value] of Object.entries(presenter.anchorDashboardConfig.fundingRequestChartStatus)) {
        const count = fundingRequestChartData[key];
        chartData.push([value, count]);
      }
      contentScope.flxDataFR.fundingRequestChart.chartData = chartData;
    },
    /**
     * Sets the exchange rates.
     */
    setExchangeRates: function () {
      contentScope.lblTimeER.text = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      contentScope.tbxFromER.text = 'USD';
      contentScope.tbxFromER.setEnabled(false);
      let segData = [];
      for (const record of exchangeRatesData) {
        const curr = record.currencyCode.toLowerCase();
        segData.push({
          'flxImage': {
            'skin': presenter.anchorDashboardConfig.flagsWithoutOutline.includes(curr) ? 'sknFlxffffffBorderd9d9d9Radius4px' : 'sknFlxffffffBorderffffffRadius4px'
          },
          'imgCurrency': {
            'src': 'spritesheet.png',
            'left': (ViewConstants.CURRENCY_MAP[curr] && ViewConstants.CURRENCY_MAP[curr].left) || '-5px',
            'top': (ViewConstants.CURRENCY_MAP[curr] && ViewConstants.CURRENCY_MAP[curr].top) || '-5px',
          },
          'lblCurrencyCode': record.currencyCode,
          'lblCurrency': record.currency,
          'lblBuyValue': parseFloat(record.buy).toFixed(2),
          'lblSellValue': parseFloat(record.sell).toFixed(2),
        });
      }
      contentScope.segExchangeRate.setData(segData);
      contentScope.flxLoadingER.setVisibility(false);
      contentScope.flxContainerER.setVisibility(true);
      contentScope.flxDataER.forceLayout();
    },
    /**
     * Sorts the list data.
     * @param {object} context - Specifies the context.
     */
    sortRecords: function (context) {
      if (context) {
        const widgetSrc = context.widgets()[1].src;
        listParams['sortOrder'] = (widgetSrc === images.noSort) ? 'ASC' : (widgetSrc === images.sortAsc) ? 'DESC' : 'ASC';
      }
      contentScope.flxLoadingList.setVisibility(true);
      contentScope.flxContainerList.setVisibility(false);
      setTimeout(function () {
        listData = SCFUtils.sortRecords(listData, listParams);
        scope.setListData();
        contentScope.flxLoadingList.setVisibility(false);
        contentScope.flxContainerList.setVisibility(true);
        contentScope.flxList.forceLayout();
      }, 10);
    },
    /**
     * Applies the pagination.
     * @param {string} pageFlow - Specifies the page flow.
     * @returns {void} - Returns nothing if pagination is not applicable.
     */
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
      this.setListData();
    },
    /**
     * Sets the pagination container.
     */
    setPagination: function () {
      contentScope.lblPageText.text = `${currentPage} - ${totalPages} ${kony.i18n.getLocalizedString('i18n.konybb.Common.Pages')}`;
      contentScope.lblPageStartIcon.skin = currentPage === 1 ? skins.pageDisabled : skins.pageEnabled;
      contentScope.lblPagePreviousIcon.skin = currentPage > 1 ? skins.pageEnabled : skins.pageDisabled;
      contentScope.lblPageNextIcon.skin = currentPage < totalPages ? skins.pageEnabled : skins.pageDisabled;
      contentScope.lblPageEndIcon.skin = currentPage === totalPages ? skins.pageDisabled : skins.pageEnabled;
    },
    /**
     * Aligns the  dashbaord widgets.
     * @param {object} widgetPG - Specifies program widget reference.
     */
    alignWidgets: function (widgetPG) {
      const heightPG = widgetPG.frame.height,
        heightLM = parseFloat(contentScope.flxLimits.height),
        heightNA = parseFloat(contentScope.flxNeedAttention.height),
        heightQL = parseFloat(contentScope.flxQuickLinks.height),
        heightFR = parseFloat(contentScope.flxMyFundingRequest.height);
      contentScope.flxLoadingPG.height = `${heightPG}dp`;
      if (breakpoint > 1024) {
        contentScope.flxLimits.top = `${heightPG + 20}dp`;
        contentScope.flxList.top = `${heightPG + heightLM + 40}dp`;
        contentScope.flxSba.setVisibility(isSbaEnabled);
      } else {
        contentScope.flxSba.setVisibility(false);
        contentScope.flxNeedAttention.top = `${heightPG + 20}dp`;
        contentScope.flxQuickLinks.top = `${heightPG + heightNA + 40}dp`;
        contentScope.flxMyFundingRequest.top = `${heightPG + heightNA + heightQL + 60}dp`;
        contentScope.flxExchangeRates.top = `${heightPG + heightNA + heightQL + 60}dp`;
        contentScope.flxLimits.top = `${heightPG + heightNA + heightQL + heightFR + 80}dp`;
        contentScope.flxList.top = `${heightPG + heightNA + heightQL + heightFR + heightLM + 100}dp`;
      }
      contentScope.forceLayout();
    },
    /**
     * Toggles the advance search popup.
     * @param {boolean} visibility - Specfies whether to show/hide advance search popup.
     * @returns {void} - Returns nothing if visibility is false.
     */
    toggleAdvanceSearchPopup: function (visibility) {
      popupScope.setVisibility(visibility);
      popupScope.flxAdvanceSearchPopup.setVisibility(visibility);
      if (!visibility || isSearchApplied) {
        return;
      }
      if (tabSelected === 1) {
        popupScope.flxASFieldsTab1.setVisibility(true);
        popupScope.flxASFieldsTab2.setVisibility(false);
        popupScope.flxASFieldsTab3.setVisibility(false);
        popupScope.tbxASF2T1.text = '';
        ['DropdownASF1T1', 'DropdownASF3T1', 'DropdownASF5T1', 'DropdownASF6T1'].forEach(widget => {
          popupScope[widget].removeSelection();
          popupScope[widget].setDefaultText();
          popupScope[widget].closeDropdown();
        });
        ['cal1ASF4T1', 'cal2ASF4T1'].forEach(widget => {
          popupScope[widget].clear();
        });
      } else if (tabSelected === 2) {
        popupScope.flxASFieldsTab1.setVisibility(false);
        popupScope.flxASFieldsTab2.setVisibility(true);
        popupScope.flxASFieldsTab3.setVisibility(false);
        popupScope.tbxASF2T2.text = '';
        ['DropdownASF1T2', 'DropdownASF3T2', 'DropdownASF5T2'].forEach(widget => {
          popupScope[widget].removeSelection();
          popupScope[widget].setDefaultText();
          popupScope[widget].closeDropdown();
        });
        ['cal1ASF4T2', 'cal2ASF4T2'].forEach(widget => {
          popupScope[widget].clear();
        });
      } else if (tabSelected === 3) {
        popupScope.flxASFieldsTab1.setVisibility(false);
        popupScope.flxASFieldsTab2.setVisibility(false);
        popupScope.flxASFieldsTab3.setVisibility(true);
        popupScope.tbxASF1T3.text = '';
        ['DropdownASF2T3', 'DropdownASF3T3', 'DropdownASF4T3', 'DropdownASF5T3'].forEach(widget => {
          popupScope[widget].removeSelection();
          popupScope[widget].setDefaultText();
          popupScope[widget].closeDropdown();
        });
        ['cal1ASF6T3', 'cal2ASF6T3'].forEach(widget => {
          popupScope[widget].clear();
        });
      }
    },
    /**
     * Sets the advance search calendars on basis of selected date range.
     * @param {string} selectedKey - Specifes the selected range.
     * @returns {void} - Returns nothing is selected range is custom.
     */
    setASCalendars: function (selectedKey, flxCalWidget, cal1Widget, cal2Widget) {
      const [range, unit] = selectedKey.split(',');
      cal2Widget.validStartDate = null;
      if (range === 'CUSTOM') {
        flxCalWidget.setEnabled(true);
        cal1Widget.clear();
        cal2Widget.clear();
        return;
      }
      let cutOffDate = new Date();
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
      flxCalWidget.setEnabled(false);
      cal1Widget.dateComponents = [cutOffDate.getDate(), cutOffDate.getMonth() + 1, cutOffDate.getFullYear()];
      cal2Widget.dateComponents = [currDate.getDate(), currDate.getMonth() + 1, currDate.getFullYear()];
    },
    /**
     * Applies the advance search.
     * @returns {void} - Return nothing if search fields are empty/invalid.
     */
    applyAdvanceSearch: function () {
      this.toggleAdvanceSearchPopup(false);
      searchCriteria = {
        'searchParam': {},
        'filterParam': {},
        'dateParam': {}
      };
      tagsData = {};
      if (tabSelected === 1) {
        const f1 = popupScope.DropdownASF1T1.getSelectedKey(),
          f2 = popupScope.tbxASF2T1.text,
          f3 = popupScope.DropdownASF3T1.getSelectedKey(),
          f4d1 = popupScope.cal1ASF4T1.formattedDate,
          f4d2 = popupScope.cal2ASF4T1.formattedDate,
          f5 = popupScope.DropdownASF5T1.getSelectedKey(),
          f6 = popupScope.DropdownASF6T1.getSelectedKey();
        if (!f1 && !f2 && !f3 && !f4d1 && !f4d2 && !f5 && !f6) {
          return;
        }
        if (f1) {
          (f1 !== 'All') && (searchCriteria['filterParam']['supplierName'] = f1);
          tagsData['supplierName'] = `Anchor: ${f1}`;
        }
        if (f2) {
          searchCriteria['searchParam']['fundingRequestId'] = f2;
          tagsData['fundingRequestId'] = `${kony.i18n.getLocalizedString('i18n.ImportLC.Reference')}: ${f2}`;
        }
        if (f4d1 && f4d2) {
          searchCriteria['dateParam']['createdDate'] = [f4d1, f4d2];
          tagsData['createdDate'] = `${kony.i18n.getLocalizedString('i18n.serviceRequests.DateRange')} ${f4d1} to ${f4d2}`;
        }
        if (f5) {
          (f5 !== 'All') && (searchCriteria['filterParam']['facilityName'] = f5);
          tagsData['facilityName'] = `${kony.i18n.getLocalizedString('i18n.accounts.FacilityNameWithColon')} ${f5}`;
        }
        if (f6) {
          (f6 !== 'All') && (searchCriteria['filterParam']['status'] = f6);
          tagsData['status'] = `${kony.i18n.getLocalizedString('i18n.wealth.statuswithColon')} ${f6}`;
        }
      } else if (tabSelected === 2) {
        const f1 = popupScope.DropdownASF1T2.getSelectedKey(),
          f2 = popupScope.tbxASF2T2.text,
          f3 = popupScope.DropdownASF3T2.getSelectedKey(),
          f4d1 = popupScope.cal1ASF4T2.formattedDate,
          f4d2 = popupScope.cal2ASF4T2.formattedDate,
          f5 = popupScope.DropdownASF5T2.getSelectedKey();
        if (!f1 && !f2 && !f3 && !f4d1 && !f4d2 && !f5) {
          return;
        }
        if (f1) {
          (f1 !== 'All') && (searchCriteria['filterParam']['supplierId'] = f1);
          tagsData['supplierId'] = `${kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.supplierID')}: ${f1}`;
        }
        if (f2) {
          searchCriteria['searchParam']['invoiceReference'] = f2;
          tagsData['invoiceReference'] = `${kony.i18n.getLocalizedString('i18n.serviceRequests.ReferenceN')}: ${f2}`;
        }
        if (f4d1 && f4d2) {
          searchCriteria['dateParam']['createdDate'] = [f4d1, f4d2];
          tagsData['createdDate'] = `${kony.i18n.getLocalizedString('i18n.serviceRequests.DateRange')} ${f4d1} to ${f4d2}`;
        }
        if (f5) {
          (f5 !== 'All') && (searchCriteria['filterParam']['status'] = f5);
          tagsData['status'] = `${kony.i18n.getLocalizedString('i18n.common.status')}: ${f5}`;
        }
      } else if (tabSelected === 3) {
        const f1 = popupScope.tbxASF1T3.text,
          f2 = popupScope.DropdownASF2T3.getSelectedKey(),
          f3 = popupScope.DropdownASF3T3.getSelectedKey(),
          f4 = popupScope.DropdownASF4T3.getSelectedKey(),
          f5 = popupScope.DropdownASF5T3.getSelectedKey(),
          f6d1 = popupScope.cal1ASF6T3.formattedDate,
          f6d2 = popupScope.cal2ASF6T3.formattedDate;
        if (!f1 && !f2 && !f3 && !f4 && !f5 && !f6d1 && !f6d2) {
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
        if (f4) {
          (f4 !== 'All') && (searchCriteria['filterParam']['status'] = f4);
          tagsData['status'] = `${kony.i18n.getLocalizedString('i18n.wealth.statuswithColon')} ${f4}`;
        }
        if (f6d1 && f6d2) {
          searchCriteria['dateParam']['valueDate'] = [f6d1, f6d2];
          tagsData['valueDate'] = `${kony.i18n.getLocalizedString('i18n.serviceRequests.DateRange')} ${f6d1} to ${f6d2}`;
        }
      }
      scope.view.formTemplate12.showLoading();
      isSearchApplied = true;
      contentScope.flxListSearchContainer.setVisibility(false);
      contentScope.flxListSearchResults.setVisibility(true);
      setTimeout(function () {
        const searchData = {
          1: fundingRequestData,
          2: myInvoicesData,
          3: paymentAllocationsData
        }[tabSelected] || [];
        listData = SCFUtils.searchAndFilterRecords(searchData, searchCriteria);
        listData = SCFUtils.sortRecords(listData, listParams);
        totalPages = Math.ceil(listData.length / 10);
        currentPage = totalPages === 0 ? 0 : 1;
        scope.setPagination();
        scope.setListData();
        contentScope.brwSearchTags.evaluateJavaScript(`createTags(${JSON.stringify(tagsData)})`);
        contentScope.flxList.forceLayout();
        scope.view.formTemplate12.hideLoading();
      }, 100);
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
          case 'supplierName':
            popupScope.DropdownASF1T1.removeSelection();
            popupScope.DropdownASF1T1.setDefaultText();
            break;
          case 'fundingRequestId':
            popupScope.tbxASF2T1.text = '';
            break;
          case 'createdDate':
            popupScope.DropdownASF3T1.removeSelection();
            popupScope.DropdownASF3T1.setDefaultText();
            popupScope.cal1ASF4T1.clear();
            popupScope.cal2ASF4T1.clear();
            break;
          case 'facilityName':
            popupScope.DropdownASF5T1.removeSelection();
            popupScope.DropdownASF5T1.setDefaultText();
            break;
          case 'status':
            popupScope.DropdownASF6T1.removeSelection();
            popupScope.DropdownASF6T1.setDefaultText();
            break;
        }
      } else if (tabSelected === 2) {
        switch (tagId) {
          case 'supplierId':
            popupScope.DropdownASF1T2.removeSelection();
            popupScope.DropdownASF1T2.setDefaultText();
            break;
          case 'invoiceReference':
            popupScope.tbxASF2T2.text = '';
            break;
          case 'creationDate':
            popupScope.DropdownASF3T2.removeSelection();
            popupScope.DropdownASF3T2.setDefaultText();
            popupScope.cal1ASF4T2.clear();
            popupScope.cal2ASF4T2.clear();
            break;
          case 'status':
            popupScope.DropdownASF5T2.removeSelection();
            popupScope.DropdownASF5T2.setDefaultText();
            break;
        }
      } else if (tabSelected === 3) {
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
          case 'status':
            popupScope.DropdownASF4T3.removeSelection();
            popupScope.DropdownASF4T3.setDefaultText();
            break;
          case 'valueDate':
            popupScope.DropdownASF5T3.removeSelection();
            popupScope.DropdownASF5T3.setDefaultText();
            popupScope.cal1ASF6T3.clear();
            popupScope.cal2ASF6T3.clear();
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
          1: fundingRequestData,
          2: myInvoicesData,
          3: paymentAllocationsData
        }[tabSelected] || [];
        listData = SCFUtils.searchAndFilterRecords(searchData, searchCriteria);
        listData = SCFUtils.sortRecords(listData, listParams);
        totalPages = Math.ceil(listData.length / 10);
        currentPage = totalPages === 0 ? 0 : 1;
        scope.setPagination();
        scope.setListData();
        contentScope.flxList.forceLayout();
        scope.view.formTemplate12.hideLoading();
      }, 10);
    },
    /**
     * Enables the start date for end date range calendar.
     */
    enableStartDate: function (calStart, calEnd) {
      let startDate = new Date(calStart.formattedDate);
      if (calEnd.formattedDate) {
        const endData = new Date(calEnd.formattedDate);
        if (endData <= startDate) {
          calEnd.clear();
        }
      }
      if (startDate < currDate) {
        startDate.setDate(startDate.getDate() + 1);
      }
      calEnd.validStartDate = [startDate.getDate(), startDate.getMonth() + 1, startDate.getFullYear()];
    },
    /**
     * Handles the errors.
     * @param {object} err - Specifies the error details.
     */
    onError: function (err) {
      kony.print(JSON.stringify(err));
    },

    /**
     * Invoked when clicked on any action in My Funding Requests tab.
     * @param {Object} context - specifies the context details on clicked widget
     * @param {Object} fundingRecordDetails - funding request data belonging to clicked row
     */
    onClickOfActions: function (context, fundingRecordDetails) {
      let currentRequestDetails = Object.assign({}, fundingRecordDetails);
      currentRequestDetails.invoiceReferences = fundingRecordDetails.invoiceReferences ? JSON.parse(fundingRecordDetails.invoiceReferences) : [];
      currentRequestDetails.fundingDocuments = fundingRecordDetails.fundingDocuments ? JSON.parse(fundingRecordDetails.fundingDocuments) : {};
      let actionText = context.text;
      if (actionText === kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.Continue')) {
        this.onClickOfContinueAction(currentRequestDetails);
      } else if (actionText === kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.Edit')) {
        presenter.loadScreenWithContext({ 'context': 'createFundingRequest', 'data': currentRequestDetails })
      } else if (actionText === kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.Cancel') ||
        actionText === kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.Delete')) {
        this.togglePopup("cancelFundingRequest", currentRequestDetails, actionText);
      } else if (actionText === kony.i18n.getLocalizedString('i18n.common.ViewDetails')) {
        presenter.showView({
          form: 'frmViewFundingRequest',
          data: {
            fundingRequestData: currentRequestDetails
          }
        });
      }
    },

    /**
     * Gets the current stage of the application where user has left
     * @returns {string} - Returns the stage value
     */
    getCurrentStage: function (currentFunding) {
      let stage = "";
      const requiredMandatoryKeys = ["currency", "facilityAvailableLimit", "facilityCurrency", "facilityId", "facilityUtilisedLimit", "fundingRequestAmount", "productName"];
      if (requiredMandatoryKeys.every(key => currentFunding.hasOwnProperty(key))) {
        stage = "fundingInvoiceDetails";
      } else {
        stage = "createFundingRequest";
      }
      if (currentFunding.hasOwnProperty("invoiceReferences") && currentFunding.invoiceReferences.length > 0) {
        stage = (currentFunding.hasOwnProperty("fundingDocuments") && Object.keys(currentFunding.fundingDocuments).length !== 0) ? "fundingRequestSummary" : "fundingRequestDocuments";
      }
      return stage;
    },

    /**
     * Invoked on click of "Continue" from dashboard
     */
    onClickOfContinueAction: function (currentFunding) {
      let contextValue = this.getCurrentStage(currentFunding);

      switch (contextValue) {
        case 'fundingInvoiceDetails':
          currentFunding.step1 = "done";
          break;
        case 'fundingRequestDocuments':
          currentFunding.step1 = "done";
          currentFunding.step2 = "done";
          break;
        case 'fundingRequestSummary':
          currentFunding.step1 = "done";
          currentFunding.step2 = "done";
          currentFunding.step3 = "done";
          break;
      }
      presenter.loadScreenWithContext({
        'context': contextValue,
        'data': currentFunding
      });
    },

    togglePopup: function (flow, requestData, actionText) {
      let popupContext = {};
      switch (flow) {
        case "cancelFundingRequest":
          popupContext = {
            'heading': kony.i18n.getLocalizedString("i18n.TradeSupplyFinance.confirmSubmission"),
            'message': actionText === kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.Cancel') ? kony.i18n.getLocalizedString("i18n.TradeSupplyFinance.cancelRequestConfirmationMsg") : kony.i18n.getLocalizedString("i18n.TradeSupplyFinance.deleteRequestConfirmationMsg"),
            'noText': kony.i18n.getLocalizedString("i18n.common.no"),
            'yesText': kony.i18n.getLocalizedString("i18n.common.yes"),
            'yesClick': () => this.cancelFundingRequest(flow, requestData)
          };
          break;
      }
      this.view.formTemplate12.setPopup(popupContext);
    },

    cancelFundingRequest: function (flow, requestData) {
      presenter.cancelFundingRequest({
        'form': this.view.id
      }, requestData);
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

    alignVerticalWidgets: function () {
      const heightNA = parseFloat(contentScope.flxNeedAttention.height),
        heightQL = parseFloat(contentScope.flxQuickLinks.height),
        heightFR = parseFloat(contentScope.flxMyFundingRequest.height);
      if (breakpoint > 1024) {
        contentScope.flxSba.setVisibility(isSbaEnabled);
        let height = isSbaEnabled ? parseFloat(contentScope.flxSba.height) + 20 : 0;
        contentScope.flxNeedAttention.top = `${height}dp`;
        contentScope.flxQuickLinks.top = `${parseFloat(contentScope.flxNeedAttention.top) + heightNA + 20}dp`;
        contentScope.flxMyFundingRequest.top = `${parseFloat(contentScope.flxQuickLinks.top) + heightQL + 40}dp`;
        contentScope.flxExchangeRates.top = `${parseFloat(contentScope.flxMyFundingRequest.top) + heightFR + 40}dp`;
      }
      else {
        contentScope.flxSba.setVisibility(false);
      }
    },

    navigateToSBAScreen: function () {
      applicationManager.getModulesPresentationController({ appName: 'SBAdvisoryMA', moduleName: 'EnrolmentModule' }).navigateToScreens('SBAInfo');
    },

    onClickOfViewInvoice: function (context, record) {
      let invoiceInfo = Object.assign({}, record);
      if (context.text === kony.i18n.getLocalizedString('i18n.TradeFinance.View')) {
        presenter.showView({
          form: 'frmViewInvoiceDetails',
          data: {
            fundingRequestData: invoiceInfo
          }
        });
      }
    },

    onClickOfPaymentAction: function (context, record) {
      let invoiceInfo = Object.assign({}, record);
      if (context.text === kony.i18n.getLocalizedString('i18n.TradeFinance.View')) {
        //TODO
      } else if (context.text === kony.i18n.getLocalizedString('i18n.TradeSupplyFinance.Edit')) { //edit flow
        //TODO
      }
    },
  };
});