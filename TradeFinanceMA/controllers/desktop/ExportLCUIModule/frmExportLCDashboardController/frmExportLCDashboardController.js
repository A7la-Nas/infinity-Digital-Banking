define(['FormControllerUtility', 'OLBConstants', 'CommonUtilities', 'TradeFinanceUtils', 'ViewConstants'], function (FormControllerUtility, OLBConstants, CommonUtilities, TFUtils, ViewConstants) {
  let context = {}, presenter, currencyCode, currencySymbol, duration, exportLCGraphData, newlyReceivedView, newlyReceivedCount, breakpoint,
    scope, contentScope, popupScope, currDate, segFilterData,
    tabSelected, exportLCData, exportAmendmentData, exportDrawingData, currentPage, totalPages, listParams, filterCriteria, generateListCriteria;
  const NA = kony.i18n.getLocalizedString("i18n.common.NA"),
    formatter = new Intl.NumberFormat('en', { 'notation': 'compact' }),
    fontIcons = {
      'chevronUp': 'P',
      'chevronDown': 'O',
      'radioSelected': 'M',
      'radioUnselected': 'L',
      'checkboxSelected': 'C',
      'checkboxUnselected': 'D',
    },
    skins = {
      'pageEnabled': 'sknOLBFonts003e7512px',
      'pageDisabled': 'sknLblFontTypeIcona0a0a012px',
      'radioSelected': 'ICSknLblRadioBtnSelectedFontIcon003e7520px',
      'radioUnselected': 'ICSknLblRadioBtnUnelectedFontIcona0a0a020px'
    },
    images = {
      'sortAsc': ViewConstants.IMAGES.SORT_PREV_IMAGE,
      'sortDesc': ViewConstants.IMAGES.SORT_NEXT_IMAGE,
      'noSort': ViewConstants.IMAGES.SORT_FINAL_IMAGE
    },
    sortFields = {
      "imgColumn1Tab1": "applicant",
      "imgColumn2Tab1": "lcReferenceNo",
      "imgColumn3Tab1": "lcType",
      "imgColumn4Tab1": "lcUpdatedOn",
      "imgColumn5Tab1": "amount",
      "imgColumn6Tab1": "status",
      "imgColumn1Tab3": "applicantName",
      "imgColumn2Tab3": "exportlcReferenceNo",
      "imgColumn3Tab3": "lcType",
      "imgColumn4Tab3": "amendmentReceivedDate",
      "imgColumn5Tab3": "amendmentNo",
      "imgColumn6Tab3": "amendmentStatus",
      "imgColumn1Tab2": "applicant",
      "imgColumn2Tab2": "drawingReferenceNo",
      "imgColumn3Tab2": "drawingAmount",
      "imgColumn4Tab2": "drawingCreatedDate",
      "imgColumn5Tab2": "status"
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
    onNavigate: function (param = {}) {
      breakpoint = kony.application.getCurrentBreakpoint();
      context = param;
      if (!context.flowType) context.flowType = 'GetAllExportLettersOfCredit';
      tabSelected = {
        'GetAllExportLettersOfCredit': 1,
        'GetAllExportAmendments': 2,
        'GetAllExportDrawings': 3
      }[context.flowType];
      if (context.deleteDrawing) {
        this.view.formTemplate12.setBannerFocus();
        this.view.formTemplate12.showBannerError({
          'i18n': kony.i18n.getLocalizedString('i18n.TradeFinance.ExportLCDrawingDraftDeleteMessage')
        });
      }
      if (context.drawings) {
        this.view.formTemplate12.setBannerFocus();
        this.view.formTemplate12.showBannerError({
          'i18n': kony.i18n.getLocalizedString('i18n.TradeFinance.ExportLCDrawingDraftSaveMessage')
        });
      }
    },
    /**
     * Handles breakpoint change.
     * @param {object} formHandle - Specifies the handle of form.
     * @param {number} breakpoint - Specifies the current breakpoint value.
     */
    onBreakpointChange: function (formHandle, breakpoint) {
      breakpoint = kony.application.getCurrentBreakpoint();
    },
    /**
     * Performs the actions required before rendering form.
     */
    preShow: function () {
      popupScope.flxCreateNewDrawingContainer.doLayout = CommonUtilities.centerPopupFlex;
      this.resetForm();
    },
    /**
     * Performs the actions required after rendering form.
     */
    postShow: function () {
      applicationManager.getNavigationManager().applyUpdates(this);
      this.setDropdownValues(contentScope.segCurrencyFilter, presenter.exportLCConfig.graphCurrencyFilters, contentScope.flxCurrencyFilterList, contentScope.lblSelectedCurrencyFilter);
      this.setDropdownValues(contentScope.segDurationFilter, presenter.exportLCConfig.graphDurationFilters, contentScope.flxDurationFilterList, contentScope.lblSelectedDurationFilter);
      presenter.getExportLetterOfCredits({}, this.view.id);
      if (tabSelected === 2) {
        presenter.getExportLCAmmendments({}, this.view.id);
      } else if (tabSelected === 3) {
        presenter.getExportLCDrawings({}, this.view.id);
      }
    },
    /**
     * Initialises the form actions.
     */
    initFormActions: function () {
      scope = this;
      currDate = new Date();
      presenter = applicationManager.getModulesPresentationController({ 'appName': 'TradeFinanceMA', 'moduleName': 'ExportLCUIModule' });
      contentScope = this.view.formTemplate12.flxContentTCCenter;
      popupScope = this.view.formTemplate12.flxContentPopup;
      [
        contentScope.flxCurrencyFilterDropdown,
        contentScope.flxDurationFilterDropdown,
        contentScope.flxSearchClear,
        contentScope.flxDropDown,
        contentScope.flxVerticalEllipsis,
        contentScope.flxPageStart,
        contentScope.flxPagePrevious,
        contentScope.flxPageNext,
        contentScope.flxPageEnd
      ].forEach(w => w.cursorType = 'pointer');
      contentScope.flxCurrencyFilterDropdown.onClick = this.toggleDropdown.bind(this, contentScope.flxCurrencyFilterList, contentScope.lblCurrencyFilterDropdownIcon);
      contentScope.segCurrencyFilter.onRowClick = this.segRowClick.bind(this, contentScope.segCurrencyFilter, contentScope.lblSelectedCurrencyFilter, contentScope.flxCurrencyFilterList, contentScope.lblCurrencyFilterDropdownIcon);
      contentScope.flxDurationFilterDropdown.onClick = this.toggleDropdown.bind(this, contentScope.flxDurationFilterList, contentScope.lblDurationFilterDropdownIcon);
      contentScope.segDurationFilter.onRowClick = this.segRowClick.bind(this, contentScope.segDurationFilter, contentScope.lblSelectedDurationFilter, contentScope.flxDurationFilterList, contentScope.lblDurationFilterDropdownIcon);
      contentScope.btnQL1.onClick = this.toggleCreateNewDrawingPopup.bind(this, true);
      contentScope.btnQLTablet1.onClick = this.toggleCreateNewDrawingPopup.bind(this, true);
      popupScope.CreateNewDrawing.flxClose.onClick = this.toggleCreateNewDrawingPopup.bind(this, false);
      popupScope.CreateNewDrawing.btnClose.onClick = this.viewLCDetails;
      popupScope.CreateNewDrawing.btnCopyDetails.onClick = this.createNewDrawing;
      contentScope.btnQL2.onClick = this.toggleNewlyReceivedExportLCView.bind(this, true);
      contentScope.btnQLTablet2.onClick = this.toggleNewlyReceivedExportLCView.bind(this, true);
      contentScope.btnBackToDashboard.onClick = this.toggleNewlyReceivedExportLCView.bind(this, false);
      contentScope.btnTab1.onClick = () => presenter.getExportLetterOfCredits({}, this.view.id);
      contentScope.btnTab2.onClick = () => presenter.getExportLCAmmendments({}, this.view.id);
      contentScope.btnTab3.onClick = () => presenter.getExportLCDrawings({}, this.view.id);
      contentScope.flxVerticalEllipsis.onClick = () => contentScope.flxEllipsisDropDown.setVisibility(!contentScope.flxEllipsisDropDown.isVisible);
      contentScope.btnApply.onClick = this.applyFilter;
      contentScope.btnCancel.onClick = () => {
        contentScope.flxListDropdown.setVisibility(false);
        contentScope.lblDropdownFilterIcon.text = fontIcons.chevronDown;
      };
      contentScope.flxDropDown.onClick = this.toggleFilterDropdown;
      contentScope.tbxSearch.onDone = scope.searchAndFilterRecords;
      contentScope.tbxSearch.onTextChange = () => contentScope.flxSearchClear.setVisibility(contentScope.tbxSearch.text !== "");
      contentScope.flxSearchClear.onClick = function () {
        contentScope.tbxSearch.text = "";
        contentScope.flxSearchClear.setVisibility(false);
        scope.searchAndFilterRecords();
      };
      contentScope.tbxSearch.onBeginEditing = () => contentScope.flxSearch.skin = "ICSknFlxffffffBorder003e751pxRadius3px";
      contentScope.tbxSearch.onEndEditing = () => contentScope.flxSearch.skin = "ICSknFlxffffffBordere3e3e31pxRadius3px";
      Object.keys(sortFields).forEach(widgetId => {
        contentScope[widgetId].cursorType = 'pointer';
        contentScope[widgetId].onTouchStart = scope.applySort.bind(scope, widgetId);
      });
      contentScope.flxPageStart.onClick = this.applyPagination.bind(this, 'start');
      contentScope.flxPagePrevious.onClick = this.applyPagination.bind(this, 'previous');
      contentScope.flxPageNext.onClick = this.applyPagination.bind(this, 'next');
      contentScope.flxPageEnd.onClick = this.applyPagination.bind(this, 'end');
      contentScope.segFilter.widgetDataMap = {
        'lblIcon': 'lblIcon',
        'lblFilterValue': 'lblFilterValue',
        'lblHeading': 'lblHeading',
        'lblDropdownIcon': 'lblDropdownIcon',
        'flxMain': 'flxMain',
        'flxDropdown': 'flxDropdown'
      };
      contentScope.segEllipsisDropDownValues.widgetDataMap = {
        "flxListDropdown": "flxListDropdown",
        "lblListValue": "lblListValue"
      };
      contentScope.segList.widgetDataMap = {
        "btnAction": "btnAction",
        "btnAction1": "btnAction1",
        "btnAction2": "btnAction2",
        "btnAction3": "btnAction3",
        "flxDropdown": "flxDropdown",
        "flxExportAmendmentList": "flxExportAmendmentList",
        "flxExportAmendmentListTablet": "flxExportAmendmentListTablet",
        "flxIdentifier": "flxIdentifier",
        "flxTempExportLCList1": "flxTempExportLCList1",
        "flxTempExportLCList2": "flxTempExportLCList2",
        "flxTempExportLCList3": "flxTempExportLCList3",
        "flxTempExportLCList4": "flxTempExportLCList4",
        "lblColumn1": "lblColumn1",
        "lblColumn2": "lblColumn2",
        "lblColumn3": "lblColumn3",
        "lblColumn4": "lblColumn4",
        "lblColumn5": "lblColumn5",
        "lblColumn6": "lblColumn6",
        "lblDropdown": "lblDropdown",
        "lblIdentifier": "lblIdentifier",
        "lblRow2Column1Key": "lblRow2Column1Key",
        "lblRow2Column1Value": "lblRow2Column1Value",
        "lblRow2Column2Key": "lblRow2Column2Key",
        "lblRow2Column2Value": "lblRow2Column2Value",
        "lblRow2Column3Key": "lblRow2Column3Key",
        "lblRow2Column3Value": "lblRow2Column3Value",
        "lblRow3Column1Key": "lblRow3Column1Key",
        "lblRow3Column1Value": "lblRow3Column1Value",
        "lblRowColumn1Key": "lblRowColumn1Key",
        "lblRowColumn1Value": "lblRowColumn1Value",
        "lblRowColumn2Key": "lblRowColumn2Key",
        "lblRowColumn2Value": "lblRowColumn2Value",
        "lblRowColumn3Key": "lblRowColumn3Key",
        "lblRowColumn3Value": "lblRowColumn3Value",
        "lblRowColumn4Key": "lblRowColumn4Key",
        "lblRowColumn4Value": "lblRowColumn4Value"
      };
      this.moreActionSegDataMapping();
      this.initialiseColumnChart();
    },
    /**
     * updateFormUI - the entry point method for the form controller.
     * @param {Object} viewModel - it contains the set of view properties and keys.
     */
    updateFormUI: function (viewModel) {
      if (viewModel.isLoading === true) {
        this.view.formTemplate12.showLoading();
      } else if (viewModel.isLoading === false) {
        this.view.formTemplate12.hideLoading();
      }
      if (viewModel.ExportLetterOfCredits) {
        exportLCData = viewModel.ExportLetterOfCredits || [];
        this.constructGraphData();
        this.setRecentLCData();
        if (!context.flowType || context.flowType === 'GetAllExportLettersOfCredit') {
          this.setListTab(1);
        } else {
          delete context.flowType;
        }
      }
      if (viewModel.getExportLCAmmendments && viewModel.getExportLCAmmendments.ExportLcAmendments) {
        exportAmendmentData = viewModel.getExportLCAmmendments.ExportLcAmendments || [];
        this.setListTab(2);
      }
      if (viewModel.ExportLCDrawings) {
        exportDrawingData = viewModel.ExportLCDrawings || [];
        this.setListTab(3);
      }
      if (viewModel.serverError) {
        this.view.formTemplate12.setBannerFocus();
        this.view.formTemplate12.showBannerError({
          'dbpErrMsg': viewModel.serverError
        });
      }
    },
    setDropdownValues: function (segWidget, listValues, flxList, lblSelectedValue) {
      let segmentData = [];
      if (listValues) {
        segWidget.widgetDataMap = {
          'lblListValue': 'value'
        };
        for (const key in listValues) {
          segmentData.push({
            key: key,
            value: listValues[key],
            template: 'flxListDropdown'
          });
        }
        segWidget.setData(segmentData);
      }
      if (segWidget.id === 'segCurrencyFilter') {
        segWidget.selectedRowIndex = [0, 0];
        lblSelectedValue.text = segWidget.selectedRowItems[0].value;
        currencyCode = segWidget.selectedRowItems[0].key;
        currencySymbol = presenter.configurationManager.getCurrency(currencyCode);
      } else if (segWidget.id === 'segDurationFilter') {
        segWidget.selectedRowIndex = [0, 2];
        lblSelectedValue.text = segWidget.selectedRowItems[0].value;
        duration = segWidget.selectedRowItems[0].key;
      }
      flxList.height = (segmentData.length * 41 > 205) ? "205dp" : `${segmentData.length * 41}dp`;
    },
    toggleDropdown: function (flxSeg, lblIcon) {
      if (flxSeg.isVisible) {
        flxSeg.setVisibility(false);
        lblIcon.text = fontIcons.chevronDown;
      } else {
        flxSeg.setVisibility(true);
        lblIcon.text = fontIcons.chevronUp;
      }
    },
    segRowClick: function (segDropdown, lblSelectedValue, flxSegDropdown, lblDropdownIcon) {
      const selectedData = segDropdown.selectedRowItems[0];
      lblSelectedValue.text = selectedData.value;
      flxSegDropdown.setVisibility(false);
      lblDropdownIcon.text = fontIcons.chevronDown;
      if (segDropdown.id === 'segCurrencyFilter' || segDropdown.id === 'segDurationFilter') {
        this.setGraphData();
      }
    },
    initialiseColumnChart: function () {
      const options = {
        'title': '',
        'height': 200,
        'width': (breakpoint >= 1380) ? 720 : (breakpoint >= 1366) ? 670 : 670,
        'legend': { 'position': 'none' },
        'isStacked': true,
        'bar': { 'groupWidth': "45%" },
        'vAxis': {
          'gridlines': { 'color': "#F6F6F6" },
          'viewWindow': { 'min': 0 },
          'format': "short"
        },
        'chartArea': { 'left': 40 }
      };
      let exportLCBarChart = new kony.ui.CustomWidget({
        "id": "ExportLCBarChart",
        "isVisible": true,
        "width": "100%",
        "height": "100%",
        "zIndex": 1
      }, {
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {
        "widgetName": "VerticalBarChart",
        "chartData": [],
        "chartProperties": Object.assign({ widgetId: 'stacked_barChart_div1' }, options),
        "OnClickOfBar": function () { }
      });
      contentScope.flxBarGraph.add(exportLCBarChart);
    },
    setRecentLCData: function () {
      contentScope.segRecentLC.widgetDataMap = {
        'lblKey1': 'lblKey1',
        'lblKey2': 'lblKey2',
        'lblKey3': 'lblKey3',
        'lblValue1': 'lblValue1',
        'lblValue2': 'lblValue2',
        'lblValue3': 'lblValue3',
        'btnAction': 'btnAction'
      };
      const recentLCData = (exportLCData.length) ? exportLCData.slice(0, presenter.exportLCConfig.recentLCLimit) : [];
      let segRecentLCData = [];
      for (const record of recentLCData) {
        segRecentLCData.push({
          'lblKey1': kony.i18n.getLocalizedString('i18n.TradeFinance.lcRefWithColon'),
          'lblKey2': kony.i18n.getLocalizedString('i18n.TradeFinance.ApplicantWithColon'),
          'lblKey3': kony.i18n.getLocalizedString('i18n.serviceRequests.Status:'),
          'lblValue1': record.lcReferenceNo || NA,
          'lblValue2': record.applicant || NA,
          'lblValue3': record.status || NA,
          'btnAction': {
            'text': kony.i18n.getLocalizedString('i18n.common.ViewDetails'),
            'toolTip': kony.i18n.getLocalizedString('i18n.common.ViewDetails'),
            'onClick': () => presenter.showExportLCScreen({ context: 'viewExportLoC', data: record, form: this.view.id })
          }
        });
      }
      contentScope.segRecentLC.setData(segRecentLCData);
    },
    resetForm: function () {
      newlyReceivedView = false;
      listParams = {
        'sortByParam': '',
        'sortOrder': ''
      };
      filterCriteria = {
        'filterParam': {},
        'dateParam': {}
      };
      generateListCriteria = {};
      this.view.formTemplate12.pageTitle = kony.i18n.getLocalizedString('i18n.ImportLC.ExportLC');
      contentScope.flxCurrencyFilterList.setVisibility(false);
      contentScope.lblCurrencyFilterDropdownIcon.text = fontIcons.chevronDown;
      contentScope.flxDurationFilterList.setVisibility(false);
      contentScope.lblDurationFilterDropdownIcon = fontIcons.chevronDown;
      contentScope.flxExportLCSummary.setVisibility(true);
      contentScope.flxActions.setVisibility(false);
      contentScope.btnQL2.text = `${kony.i18n.getLocalizedString('i18n.TradeFinance.newlyReceivedExportLc')} (0)`;
      contentScope.btnQLTablet2.text = `${kony.i18n.getLocalizedString('i18n.TradeFinance.newlyReceivedExportLc')} (0)`;
    },
    constructGraphData: function () {
      newlyReceivedCount = 0;
      if (!exportLCData) return;
      const lcStatuses = {};
      scope_configManager.exportLCChartData.forEach(x => { Object.values(x.LCStatus).forEach(y => lcStatuses[y] = x.DisplayStatus) });
      exportLCGraphData = exportLCData.reduce(function (acc, obj) {
        if (obj.status === OLBConstants.EXPORT_LC_STATUS.NEW) newlyReceivedCount++;
        let date = new Date(obj.lcUpdatedOn).toDateString();
        if (!acc[obj.currency]) acc[obj.currency] = {};
        if (!acc[obj.currency][date]) acc[obj.currency][date] = {};
        if (!acc[obj.currency][date][obj.lcType]) acc[obj.currency][date][obj.lcType] = {
          'totalAmount': 0,
          'utilizedAmount': 0
        };
        acc[obj.currency][date][obj.lcType]['totalAmount'] += parseFloat(obj.amount || 0);
        acc[obj.currency][date][obj.lcType]['utilizedAmount'] += parseFloat(obj.utilizedLCAmount || 0);
        if (!acc[obj.currency][date][lcStatuses[obj.status]]) acc[obj.currency][date][lcStatuses[obj.status]] = {
          'count': 0,
          'amount': 0
        };
        acc[obj.currency][date][lcStatuses[obj.status]]['count']++;
        acc[obj.currency][date][lcStatuses[obj.status]]['amount'] += parseFloat(obj.amount || 0);
        return acc;
      }, {});
      contentScope.btnQL2.text = `${kony.i18n.getLocalizedString('i18n.TradeFinance.newlyReceivedExportLc')} (${newlyReceivedCount})`;
      contentScope.btnQLTablet2.text = `${kony.i18n.getLocalizedString('i18n.TradeFinance.newlyReceivedExportLc')} (${newlyReceivedCount})`;
      this.setGraphData();
    },
    setGraphData: function () {
      currencyCode = contentScope.segCurrencyFilter.selectedRowItems[0].key;
      currencySymbol = presenter.configurationManager.getCurrency(currencyCode);
      duration = contentScope.segDurationFilter.selectedRowItems[0].key;
      let filteredData = {};
      scope_configManager.lcPaymentTerms.forEach(x => filteredData[x.type] = { colorCode: x.colorCode, totalAmount: 0, utilizedAmount: 0 });
      let filteredSummary = scope_configManager.exportLCChartData.reduce(function (acc, obj) {
        acc[obj.DisplayStatus] = { count: 0, amount: 0 };
        return acc;
      }, {});
      let graphData = [], date = new Date(), lcDate;
      for (let i = 0; i < duration; i++) {
        lcDate = date.toDateString();
        if (exportLCGraphData[currencyCode] && exportLCGraphData[currencyCode][lcDate]) {
          Object.keys(exportLCGraphData[currencyCode][lcDate]).forEach(key => {
            if (filteredData[key]) {
              filteredData[key]['utilizedAmount'] += exportLCGraphData[currencyCode][lcDate][key]['utilizedAmount'];
              filteredData[key]['totalAmount'] += exportLCGraphData[currencyCode][lcDate][key]['totalAmount'];
            }
            if (filteredSummary[key]) {
              filteredSummary[key]['count'] += exportLCGraphData[currencyCode][lcDate][key]['count'];
              filteredSummary[key]['amount'] += exportLCGraphData[currencyCode][lcDate][key]['amount'];
            }
          });
        }
        date.setDate(date.getDate() - 1);
      }
      contentScope.lblCount1.text = `${filteredSummary['Pending Requests']['count']}`;
      contentScope.lblAmount1.text = `${currencySymbol} ${presenter.formatUtilManager.formatAmount(filteredSummary['Pending Requests']['amount'])}`;
      contentScope.lblCount2.text = `${filteredSummary['Approved']['count']}`;
      contentScope.lblAmount2.text = `${currencySymbol} ${presenter.formatUtilManager.formatAmount(filteredSummary['Approved']['amount'])}`;
      contentScope.lblCount3.text = `${filteredSummary['Settled']['count']}`;
      contentScope.lblAmount3.text = `${currencySymbol} ${presenter.formatUtilManager.formatAmount(filteredSummary['Settled']['amount'])}`;
      contentScope.lblCount4.text = `${filteredSummary['Rejected']['count']}`;
      contentScope.lblAmount4.text = `${currencySymbol} ${presenter.formatUtilManager.formatAmount(filteredSummary['Rejected']['amount'])}`;
      for (let statusLabel = 1; statusLabel <= 4; statusLabel++) {
        if (contentScope["lblAmount" + statusLabel].text.length > 13) {
          contentScope["lblAmount" + statusLabel].skin = "bbSknLbl424242SSP15Px";
          contentScope["lblAmount" + statusLabel].top = "10px";
        }
      }
      for (const lcType in filteredData) {
        let barData = {
          'categoryName': lcType,
          'budget1': 0,
          'budget1ColorCode': filteredData[lcType]['colorCode'],
          'budget1TooltipText': '',
          'budget2': 0,
          'budget2TooltipText': '',
          'budget2ColorCode': `color:${filteredData[lcType]['colorCode']};opacity:0.5`,
          'budget3': -1,
          'budget3ColorCode': '',
          'budget3TooltipText': ''
        };
        if (filteredData[lcType]) {
          barData.budget1 = filteredData[lcType]['utilizedAmount'];
          barData.budget2 = filteredData[lcType]['totalAmount'] - filteredData[lcType]['utilizedAmount'];
        }
        const tooltipText = `${lcType}\n`
          + `${kony.i18n.getLocalizedString('i18n.TradeFinance.totalLimit')}: ${currencySymbol}${formatter.format(filteredData[lcType]['totalAmount'])}\n`
          + `${kony.i18n.getLocalizedString('i18n.TradeFinance.available')}: ${currencySymbol}${formatter.format(barData.budget2)}\n`
          + `${kony.i18n.getLocalizedString('i18n.TradeFinance.utilized')}: ${currencySymbol}${formatter.format(barData.budget1)}`;
        barData.budget1TooltipText = tooltipText;
        barData.budget2TooltipText = tooltipText;
        graphData.push(barData);
      }
      contentScope.flxBarGraph.ExportLCBarChart.chartData = graphData;
    },
    toggleCreateNewDrawingPopup: function (visibility) {
      breakpoint = kony.application.getCurrentBreakpoint();
      popupScope.setVisibility(visibility);
      popupScope.flxCreateNewDrawingPopup.setVisibility(visibility);
      popupScope.flxCreateNewDrawingContainer.width = (breakpoint <= 1024) ? "90%" : "65%";
      if (visibility) {
        FormControllerUtility.disableButton(popupScope.CreateNewDrawing.btnCopyDetails);
        this.view.formTemplate12.showLoading();
        setTimeout(function () {
          let popupLCData = TFUtils.filterRecords(exportLCData, {
            'filterParam': {
              'status': [OLBConstants.EXPORT_LC_STATUS.APPROVED]
            }
          });
          popupLCData = TFUtils.sortRecords(popupLCData, {
            'sortByParam': 'lcUpdatedOn',
            'sortOrder': 'DESC'
          });
          popupScope.CreateNewDrawing.setData(popupLCData, 'exportDrawing');
          popupScope.forceLayout();
          scope.view.formTemplate12.hideLoading();
        }, 100);
      }
    },
    getSearchedRecords: function () {
      this.view.formTemplate12.showLoading();
      setTimeout(function () {
        let popupLCData = TFUtils.filterRecords(exportLCData, {
          'filterParam': {
            'status': [OLBConstants.EXPORT_LC_STATUS.APPROVED]
          }
        });
        popupLCData = TFUtils.searchRecords(popupLCData, popupScope.CreateNewDrawing.txtSearchBox.text);
        popupLCData = TFUtils.sortRecords(popupLCData, {
          'sortByParam': 'lcUpdatedOn',
          'sortOrder': 'DESC'
        });
        popupScope.CreateNewDrawing.setData(popupLCData, 'exportDrawing');
        popupScope.forceLayout();
        scope.view.formTemplate12.hideLoading();
      }, 100);
    },
    viewLCDetails: function () {
      const data = popupScope.CreateNewDrawing.getData();
      if (!data) return;
      this.toggleCreateNewDrawingPopup(false);
      presenter.showExportLCScreen({ 'context': 'viewExportLoC', data, 'form': this.view.id });
    },
    createNewDrawing: function () {
      const data = popupScope.CreateNewDrawing.getData();
      this.toggleCreateNewDrawingPopup(false);
      presenter.navigationManager.navigateTo({ 'appName': "TradeFinanceMA", 'friendlyName': "frmExportLCCreateDrawings" }, false, data);
    },
    toggleNewlyReceivedExportLCView: function (visibility) {
      if (visibility) {
        newlyReceivedView = true;
        this.view.formTemplate12.pageTitle = kony.i18n.getLocalizedString('i18n.TradeFinance.exportLcNewlyReceived');
        contentScope.flxExportLCSummary.setVisibility(false);
        contentScope.flxActions.setVisibility(true);
      } else {
        newlyReceivedView = false;
        this.view.formTemplate12.pageTitle = kony.i18n.getLocalizedString('i18n.ImportLC.ExportLC');
        contentScope.flxExportLCSummary.setVisibility(true);
        contentScope.flxActions.setVisibility(false);
      }
      this.setListTab(1);
    },
    /**
     * Sets the filter dropdown data.
     */
    setFilterDropdownData: function () {
      let filter1Data = [], filter2Data = [], filter3Data = [];

      const lcTypes = ['Select All'].concat(Object.values(OLBConstants['LC_PAYMENT_TERM']));
      lcTypes.forEach(lcType => {
        filter1Data.push({
          'lblFilterValue': {
            'text': lcType
          },
          'lblIcon': {
            'text': fontIcons.checkboxSelected,
            'cursorType': 'pointer'
          }
        });
      });

      let statusTypes = [];
      if (tabSelected === 1) {
        statusTypes = newlyReceivedView ? statusTypes = ['Select All'].concat((OLBConstants.EXPORT_LC_STATUS.NEW)) : ['Select All'].concat(Object.values(OLBConstants['EXPORT_LC_STATUS']));
      } else if (tabSelected === 3) {
        statusTypes = ['Select All'].concat(Object.values(OLBConstants['EXPORT_DRAWING_STATUS']));
      } else {
        statusTypes = ['Select All'].concat(Object.values(OLBConstants['EXPORT_AMENDMENT_STATUS']));
      }
      statusTypes.forEach(statusType => {
        filter2Data.push({
          'lblFilterValue': {
            'text': statusType
          },
          'lblIcon': {
            'text': fontIcons.checkboxSelected,
            'cursorType': 'pointer'
          }
        });
      });

      const timePeriodValues = {
        '1,DAY': kony.i18n.getLocalizedString('i18n.ImportLC.Today'),
        '1,MONTH': kony.i18n.getLocalizedString('i18n.ImportLC.LastOneMonth'),
        '6,MONTH': kony.i18n.getLocalizedString('i18n.ImportLC.LastSixMonths'),
        '1,YEAR': kony.i18n.getLocalizedString('i18n.ImportLC.LastOneYear'),
        'YTD': kony.i18n.getLocalizedString('i18n.wealth.datePicker.YTD')
      };
      Object.entries(timePeriodValues).forEach(([key, value], idx) => {
        filter3Data.push({
          'lblFilterValue': {
            key,
            'text': value
          },
          'lblIcon': {
            'text': idx === 2 ? fontIcons.radioSelected : fontIcons.radioUnselected,
            'skin': idx === 2 ? skins.radioSelected : skins.radioUnselected,
            'cursorType': 'pointer'
          }
        });
      });

      segFilterData = [
        [{
          'lblHeading': {
            'text': kony.i18n.getLocalizedString('i18n.TradeFinance.LCTypeRequired'),
            'left': "5%"
          },
          'lblDropdownIcon': {
            'text': fontIcons.chevronUp,
            'cursorType': 'pointer',
            'top': "2dp"
          },
          'flxMain': {
            'top': "0dp"
          },
          'flxDropdown': {
            'right': "5%"
          },
          'filterKey': 'lcType'
        }, filter1Data],
        [{
          'lblHeading': {
            'text': kony.i18n.getLocalizedString('i18n.TradeFinance.statusRequired'),
            'left': "5%"
          },
          'lblDropdownIcon': {
            'text': fontIcons.chevronUp,
            'cursorType': 'pointer',
            'top': "2dp"
          },
          'flxMain': {
            'top': "0dp"
          },
          'flxDropdown': {
            'right': "5%"
          },
          'filterKey': tabSelected === 2 ? 'amendmentStatus' : 'status'
        }, filter2Data],
        [{
          'lblHeading': {
            'text': kony.i18n.getLocalizedString('i18n.TradeFinance.TimePeriod'),
            'left': "5%"
          },
          'lblDropdownIcon': {
            'text': fontIcons.chevronUp,
            'cursorType': 'pointer',
            'top': "2dp"
          },
          'flxMain': {
            'top': "0dp"
          },
          'flxDropdown': {
            'right': "5%"
          },
          'filterKey': tabSelected === 1 ? "lcUpdatedOn" : tabSelected === 2 ? "amendmentReceivedDate" : "drawingCreatedDate"
        }, filter3Data]
      ];
      contentScope.segFilter.setData(segFilterData);
    },
    /**
     * Toggles filter dropdown.
     */
    toggleFilterDropdown: function () {
      if (contentScope.lblDropdownFilterIcon.text === fontIcons.chevronDown) {
        contentScope.segFilter.setData(segFilterData);
        contentScope.btnApply.skin = "ICSknbtnEnabed003e7536px";
        contentScope.btnApply.setEnabled(true);
        contentScope.flxListDropdown.setVisibility(true);
        contentScope.lblDropdownFilterIcon.text = fontIcons.chevronUp;
      } else {
        contentScope.flxListDropdown.setVisibility(false);
        contentScope.lblDropdownFilterIcon.text = fontIcons.chevronDown;
      }
      contentScope.forceLayout();
    },
    onFilterSelection: function ({ segWidget, rowIndex, sectionIndex }) {
      let segData = JSON.parse(JSON.stringify(contentScope[segWidget].data));
      if (sectionIndex !== 2) {
        if (rowIndex === 0) {
          if (segData[sectionIndex][1][rowIndex].lblIcon.text === fontIcons.checkboxUnselected) {
            segData[sectionIndex][1].forEach(record => record.lblIcon.text = fontIcons.checkboxSelected);
          } else {
            segData[sectionIndex][1].forEach(record => record.lblIcon.text = fontIcons.checkboxUnselected);
          }
        } else {
          if (segData[sectionIndex][1][rowIndex].lblIcon.text === fontIcons.checkboxUnselected) {
            segData[sectionIndex][1][rowIndex].lblIcon.text = fontIcons.checkboxSelected;
          } else {
            segData[sectionIndex][1][rowIndex].lblIcon.text = fontIcons.checkboxUnselected;
          }
          let selectCount = 1;
          for (let i = 1; i < segData[sectionIndex][1].length; i++) {
            if (segData[sectionIndex][1][i].lblIcon.text === fontIcons.checkboxSelected) selectCount++;
          }
          segData[sectionIndex][1][0].lblIcon.text = segData[sectionIndex][1].length === selectCount ? fontIcons.checkboxSelected : fontIcons.checkboxUnselected;
        }
        let filterCount = 0;
        for (let i = 0; i < segData.length; i++) {
          for (let j = 1; j < segData[i][1].length; j++) {
            if (segData[i][1][j].lblIcon.text === fontIcons.checkboxSelected) {
              filterCount++;
              break;
            }
          }
        }
        if (filterCount === 2) {
          contentScope.btnApply.skin = "ICSknbtnEnabed003e7536px";
          contentScope.btnApply.setEnabled(true);
        } else {
          contentScope.btnApply.skin = "ICSknbtnDisablede2e9f036px";
          contentScope.btnApply.setEnabled(false);
        }
      } else {
        segData[sectionIndex][1].forEach(record => {
          record.lblIcon.text = fontIcons.radioUnselected;
          record.lblIcon.skin = skins.radioUnselected;
        });
        segData[sectionIndex][1][rowIndex].lblIcon.text = fontIcons.radioSelected;
        segData[sectionIndex][1][rowIndex].lblIcon.skin = skins.radioSelected;
      }
      contentScope[segWidget].removeAll();
      contentScope[segWidget].setData(segData);
    },
    toggleSectionHeader: function ({ sectionIndex, rowIndex, segmentId }) {
      let newSegData = JSON.parse(JSON.stringify(contentScope.segFilter.data));
      if (newSegData[sectionIndex][0]['lblDropdownIcon']['text'] === fontIcons.chevronDown) {
        newSegData[sectionIndex][0]['lblDropdownIcon']['text'] = fontIcons.chevronUp;
        newSegData[sectionIndex][1] = segFilterData[sectionIndex][1];
      } else {
        newSegData[sectionIndex][0]['lblDropdownIcon']['text'] = fontIcons.chevronDown;
        newSegData[sectionIndex][1] = [];
      }
      for (let i = 0; i < segFilterData.length; i++) {
        if (newSegData[i][1].length > 0) {
          newSegData[i][1] = segFilterData[i][1];
        }
      }
      segFilterData[sectionIndex][0]['lblDropdownIcon']['text'] = newSegData[sectionIndex][0]['lblDropdownIcon']['text']
      contentScope.segFilter.setData(newSegData);
    },
    /**
     * Applies the filter.
     */
    applyFilter: function () {
      filterCriteria = {
        'filterParam': {},
        'dateParam': {}
      };
      let filterByValue = [],
        filterByParam = [],
        timeValue = "",
        selectedFilterCount = 0;
      const segData = contentScope.segFilter.data;

      const filter1Key = segData[0][0]['filterKey'];
      for (let i = 1; i < segData[0][1].length; i++) {
        if (segData[0][1][i].lblIcon.text === fontIcons.checkboxSelected) {
          filterByValue.push(segData[0][1][i].lblFilterValue.text);
          filterByParam.push(filter1Key);
          selectedFilterCount++;
          if (!filterCriteria['filterParam'][filter1Key]) {
            filterCriteria['filterParam'][filter1Key] = [];
          }
          filterCriteria['filterParam'][filter1Key].push(segData[0][1][i].lblFilterValue.text);
        }
      }

      const filter2Key = segData[1][0]['filterKey'];
      for (let i = 1; i < segData[1][1].length; i++) {
        if (segData[1][1][i].lblIcon.text === fontIcons.checkboxSelected) {
          filterByValue.push(segData[1][1][i].lblFilterValue.text);
          filterByParam.push(filter2Key);
          selectedFilterCount++;
          if (!filterCriteria['filterParam'][filter2Key]) {
            filterCriteria['filterParam'][filter2Key] = [];
          }
          filterCriteria['filterParam'][filter2Key].push(segData[1][1][i].lblFilterValue.text);
        }
      }

      const filter3Key = segData[2][0]['filterKey'];
      let cutOffDate = new Date();
      for (let i = 0; i < segData[2][1].length; i++) {
        if (segData[2][1][i].lblIcon.text === fontIcons.radioSelected) {
          timeValue = segData[2][1][i].lblFilterValue.key;
          switch (timeValue) {
            case "1,DAY":
              filterCriteria['dateParam'][filter3Key] = [cutOffDate.setDate(currDate.getDate() - parseInt(1, 10)), currDate];
              break;
            case "1,MONTH":
              filterCriteria['dateParam'][filter3Key] = [cutOffDate.setMonth(currDate.getMonth() - parseInt(1, 10)), currDate];
              break;
            case "6,MONTH":
              filterCriteria['dateParam'][filter3Key] = [cutOffDate.setMonth(currDate.getMonth() - parseInt(6, 10)), currDate];
              break;
            case "1,YEAR":
              filterCriteria['dateParam'][filter3Key] = [cutOffDate.setFullYear(currDate.getFullYear() - parseInt(1, 10)), currDate];
              break;
            case "YTD":
              timeValue = `${Math.ceil((Date.now() - Date.parse(new Date().getFullYear(), 0, 0)) / 864e5)},DAY`;
              filterCriteria['dateParam'][filter3Key] = [new Date(currDate.getFullYear(), 0, 1), currDate];
              break;
          }
          selectedFilterCount++;
        }
      }
      contentScope.flxListDropdown.setVisibility(false);
      contentScope.lblDropdownFilterIcon.text = fontIcons.chevronDown;
      segFilterData = segData;
      if (segData[0][1][0].lblIcon.text === fontIcons.checkboxSelected && segData[1][1][0].lblIcon.text === fontIcons.checkboxSelected) {
        contentScope.lblFilterText.text = kony.i18n.getLocalizedString("i18n.konybb.Common.All");
      } else {
        contentScope.lblFilterText.text = `${kony.i18n.getLocalizedString("i18n.ProfileManagement.Selected")}(${selectedFilterCount})`;
      }
      generateListCriteria['filterByValue'] = filterByValue.join(',');
      generateListCriteria['filterByParam'] = filterByParam.join(',');
      generateListCriteria['timeValue'] = timeValue;
      generateListCriteria['timeParam'] = filter3Key;
      this.searchAndFilterRecords();
    },
    /**
     * Applies search and filter.
     */
    searchAndFilterRecords: function () {
      this.view.formTemplate12.showLoading();
      setTimeout(function () {
        const searchData = {
          1: exportLCData,
          2: exportAmendmentData,
          3: exportDrawingData
        }[tabSelected] || [];
        const searchText = contentScope.tbxSearch.text;
        listData = TFUtils.filterRecords(searchData, filterCriteria || {});
        searchText && (listData = TFUtils.searchRecords(listData, searchText));
        listData = TFUtils.sortRecords(listData, listParams);
        if (listData.length > 0) {
          totalPages = Math.ceil(listData.length / 10);
          currentPage = totalPages === 0 ? 0 : 1;
          contentScope.flxVerticalEllipsis.setVisibility(tabSelected !== 1);
          contentScope.flxTransactionList.setVisibility(true);
          contentScope.flxPagination.setVisibility(true);
          contentScope.flxNoTransactions.setVisibility(false);
          scope.setPagination();
          scope.setListData();
        } else {
          contentScope.flxVerticalEllipsis.setVisibility(false);
          contentScope.flxTransactionList.setVisibility(false);
          contentScope.flxPagination.setVisibility(false);
          contentScope.flxNoTransactions.setVisibility(true);
        }
        contentScope.flxList.forceLayout();
        scope.view.formTemplate12.hideLoading();
      }, 100);
    },
    /**
     * Sets the list tab.
     * @param {number} tabIdx - Specifies the index of tab.
     */
    setListTab: function (tabIdx) {
      let cutOffDate = new Date();
      tabSelected = tabIdx;
      contentScope.btnTab1.skin = 'ICSknBtnAccountSummaryUnselected2'
      contentScope.btnTab2.skin = 'ICSknBtnAccountSummaryUnselected2';
      contentScope.btnTab3.skin = 'ICSknBtnAccountSummaryUnselected2';
      contentScope.flxLCHeader.setVisibility(false);
      contentScope.flxAmendmentHeader.setVisibility(false);
      contentScope.flxDrawingHeader.setVisibility(false);
      for (const widget in sortFields) {
        contentScope[widget].src = images.noSort;
      }
      switch (tabSelected) {
        case 1:
          contentScope.btnTab1.skin = 'ICSknBtnAccountSummarySelected2';
          contentScope.flxLCHeader.setVisibility(true);
          contentScope.imgColumn4Tab1.src = images.sortDesc;
          listParams = {
            'sortByParam': 'lcUpdatedOn',
            'sortOrder': 'DESC'
          };
          filterCriteria = {
            'filterParam': newlyReceivedView ? {
              'status': [OLBConstants.EXPORT_LC_STATUS.NEW]
            } : {},
            'dateParam': {
              'lcUpdatedOn': [cutOffDate.setMonth(currDate.getMonth() - parseInt(6, 10)), currDate]
            }
          };
          break;
        case 2:
          contentScope.btnTab2.skin = 'ICSknBtnAccountSummarySelected2';
          contentScope.flxAmendmentHeader.setVisibility(true);
          contentScope.imgColumn4Tab3.src = images.sortDesc;
          listParams = {
            'sortByParam': 'amendmentReceivedDate',
            'sortOrder': 'DESC'
          };
          filterCriteria = {
            'filterParam': {},
            'dateParam': {
              'amendmentReceivedDate': [cutOffDate.setMonth(currDate.getMonth() - parseInt(6, 10)), currDate]
            }
          };
          break;
        case 3:
          contentScope.btnTab3.skin = 'ICSknBtnAccountSummarySelected2';
          contentScope.flxDrawingHeader.setVisibility(true);
          contentScope.imgColumn4Tab2.src = images.sortDesc;
          listParams = {
            'sortByParam': 'drawingCreatedDate',
            'sortOrder': 'DESC'
          };
          filterCriteria = {
            'filterParam': {},
            'dateParam': {
              'drawingCreatedDate': [cutOffDate.setMonth(currDate.getMonth() - parseInt(6, 10)), currDate]
            }
          };
          break;
      }
      contentScope.tbxSearch.text = "";
      contentScope.flxSearchClear.setVisibility(false);
      contentScope.lblFilterText.text = kony.i18n.getLocalizedString("i18n.konybb.Common.All");
      contentScope.flxListDropdown.setVisibility(false);
      contentScope.lblDropdownFilterIcon.text = fontIcons.chevronDown;
      contentScope.flxEllipsisDropDown.setVisibility(false);
      this.setFilterDropdownData();
      this.searchAndFilterRecords();
    },
    applySort: function (widget) {
      if (widget) {
        listParams['sortByParam'] = sortFields[widget];
        if (contentScope[widget].src === images.sortAsc) {
          contentScope[widget].src = images.sortDesc;
          listParams['sortOrder'] = "DESC";
        } else {
          contentScope[widget].src = images.sortAsc;
          listParams['sortOrder'] = "ASC";
        }
        for (const key in sortFields) {
          if (key !== widget) {
            contentScope[key].src = images.noSort;
          }
        }
      }
      this.view.formTemplate12.showLoading();
      setTimeout(function () {
        listData = TFUtils.sortRecords(listData, listParams);
        scope.setListData();
        scope.view.formTemplate12.hideLoading();
      }, 10);
    },
    /**
     * Sets the list data.
     */
    setListData: function () {
      const start = parseInt(currentPage - 1 + "0"),
        end = start + 10;
      paginatedRecords = (listData || []).slice(start, end);
      previousIndex = undefined;
      let segData = [];
      switch (tabSelected) {
        case 1:
          segData = this.getLCSegmentData(paginatedRecords);
          break;
        case 2:
          segData = this.getAmendmentSegmentData(paginatedRecords);
          break;
        case 3:
          segData = this.getDrawingSegmentData(paginatedRecords);
          break;
      }
      contentScope.segList.setData(segData);
      contentScope.flxList.forceLayout();
    },
    getLCSegmentData: function (records) {
      let segData = [];
      if (breakpoint <= 1024) {
        for (const record of records) {
          segData.push(Object.assign(record, {
            "lblDropdown": fontIcons.chevronDown,
            "flxTempExportLCList3": {
              "height": "40dp",
              "skin": "sknflxffffffnoborder"
            },
            "lblIdentifier": {
              "skin": "sknffffff15pxolbfonticons"
            },
            "flxIdentifier": {
              'isVisible': false,
              "skin": "sknFlxIdentifier"
            },
            "flxDropdown": {
              "onClick": this.handleSegmentRowView.bind(this)
            },
            "lblColumn1": record.applicant || NA,
            "lblColumn2": record.lcReferenceNo || NA,
            "lblColumn3": record.lcUpdatedOn ? presenter.formatUtilManager.getFormattedCalendarDate(record.lcUpdatedOn) : NA,
            "lblColumn4": record.status || NA,
            "template": 'flxTempExportLCList3',
            "lblRowColumn1Key": kony.i18n.getLocalizedString("i18n.ImportLC.LCType"),
            "lblRowColumn2Key": kony.i18n.getLocalizedString("i18n.wealth.amount"),
            "lblRowColumn3Key": kony.i18n.getLocalizedString("i18n.TradeFinance.IssuingBank"),
            "lblRowColumn4Key": kony.i18n.getLocalizedString("i18n.TradeFinance.IssueDate"),
            "lblRow2Column1Key": kony.i18n.getLocalizedString("i18n.TradeFinance.ExpiryDate"),
            "lblRow2Column2Key": kony.i18n.getLocalizedString("i18n.TradeFinance.AmendLatestShipmentDate"),
            "lblRowColumn1Value": record.lcType || NA,
            "lblRowColumn2Value": (record.currency && record.amount) ? `${presenter.configurationManager.getCurrency(record.currency)}${presenter.formatUtilManager.formatAmount(record.amount)}` : NA,
            "lblRowColumn3Value": record.issuingBank || NA,
            "lblRowColumn4Value": record.issueDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.issueDate) : NA,
            "lblRow2Column1Value": record.expiryDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.expiryDate) : NA,
            "lblRow2Column2Value": record.latestShipmentDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.latestShipmentDate) : NA,
            "btnAction": {
              "text": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
              "toolTip": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
              "onClick": function () {
                presenter.showExportLCScreen({
                  'context': 'viewExportLoC',
                  'data': record,
                  'form': scope.view.id
                });
              }
            },
            "btnAction1": {
              "text": kony.i18n.getLocalizedString("i18n.common.Download"),
              "toolTip": kony.i18n.getLocalizedString("i18n.common.Download"),
              "onClick": function () {
                presenter.generateExportLC({
                  'exportLCId': record.exportLCId
                }, scope.view.id);
              }
            },
            "btnAction2": {
              "text": kony.i18n.getLocalizedString("i18n.accounts.print"),
              "toolTip": kony.i18n.getLocalizedString("i18n.accounts.print"),
              "onClick": function () {
                presenter.showExportLCScreen({
                  'context': 'printLC',
                  'data': record,
                  'form': scope.view.id
                });
              }
            },
            "btnAction3": {
              "isVisible": record.status === OLBConstants.EXPORT_LC_STATUS.APPROVED,
              "text": kony.i18n.getLocalizedString("i18n.TradeFinance.CreateNewDrawing"),
              "toolTip": kony.i18n.getLocalizedString("i18n.TradeFinance.CreateNewDrawing"),
              "onClick": function () {
                applicationManager.getNavigationManager().navigateTo({ appName: "TradeFinanceMA", friendlyName: "frmExportLCCreateDrawings" }, false, record);
              }
            }
          }));
        }
      } else {
        for (const record of records) {
          segData.push(Object.assign(record, {
            "lblDropdown": fontIcons.chevronDown,
            "flxTempExportLCList1": {
              "height": "40dp",
              "skin": "sknflxffffffnoborder"
            },
            "lblIdentifier": {
              "skin": "sknffffff15pxolbfonticons"
            },
            "flxIdentifier": {
              'isVisible': false,
              "skin": "sknFlxIdentifier"
            },
            "flxDropdown": {
              "onClick": this.handleSegmentRowView.bind(this)
            },
            "lblColumn1": record.applicant || NA,
            "lblColumn2": record.lcReferenceNo || NA,
            "lblColumn3": record.lcType || NA,
            "lblColumn4": record.lcUpdatedOn ? presenter.formatUtilManager.getFormattedCalendarDate(record.lcUpdatedOn) : NA,
            "lblColumn5": (record.currency && record.amount) ? `${presenter.configurationManager.getCurrency(record.currency)}${presenter.formatUtilManager.formatAmount(record.amount)}` : NA,
            "lblColumn6": record.status || NA,
            "template": 'flxTempExportLCList1',
            "lblRowColumn1Key": kony.i18n.getLocalizedString("i18n.TradeFinance.IssuingBank"),
            "lblRowColumn2Key": kony.i18n.getLocalizedString("i18n.TradeFinance.IssueDate"),
            "lblRowColumn3Key": kony.i18n.getLocalizedString("i18n.ImportLC.ExpiryDate"),
            "lblRowColumn4Key": kony.i18n.getLocalizedString("i18n.TradeFinance.AmendLatestShipmentDate"),
            "lblRowColumn1Value": record.issuingBank || NA,
            "lblRowColumn2Value": record.issueDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.issueDate) : NA,
            "lblRowColumn3Value": record.expiryDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.expiryDate) : NA,
            "lblRowColumn4Value": record.latestShipmentDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.latestShipmentDate) : NA,
            "btnAction": {
              "text": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
              "toolTip": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
              "onClick": function () {
                presenter.showExportLCScreen({
                  'context': 'viewExportLoC',
                  'data': record,
                  'form': scope.view.id
                });
              }
            },
            "btnAction1": {
              "text": kony.i18n.getLocalizedString("i18n.common.Download"),
              "toolTip": kony.i18n.getLocalizedString("i18n.common.Download"),
              "onClick": function () {
                presenter.generateExportLC({
                  'exportLCId': record.exportLCId
                }, scope.view.id);
              }
            },
            "btnAction2": {
              "text": kony.i18n.getLocalizedString("i18n.accounts.print"),
              "toolTip": kony.i18n.getLocalizedString("i18n.accounts.print"),
              "onClick": function () {
                presenter.showExportLCScreen({
                  'context': 'printLC',
                  'data': record,
                  'form': scope.view.id
                });
              }
            },
            "btnAction3": {
              "isVisible": record.status === OLBConstants.EXPORT_LC_STATUS.APPROVED,
              "text": kony.i18n.getLocalizedString("i18n.TradeFinance.CreateNewDrawing"),
              "toolTip": kony.i18n.getLocalizedString("i18n.TradeFinance.CreateNewDrawing"),
              "onClick": function () {
                presenter.navigationManager.navigateTo({ 'appName': "TradeFinanceMA", 'friendlyName': "frmExportLCCreateDrawings" }, false, record);
              }
            }
          }));
        }
      }
      return segData;
    },
    getAmendmentSegmentData: function (records) {
      let segData = [];
      if (breakpoint <= 1024) {
        for (const record of records) {
          segData.push(Object.assign(record, {
            "flxExportAmendmentListTablet": {
              "height": "40dp",
              "skin": "sknflxffffffnoborder"
            },
            "lblDropdown": fontIcons.chevronDown,
            "flxDropdown": {
              "onClick": this.handleSegmentRowView.bind(this)
            },
            "flxIdentifier": {
              'isVisible': false,
              "skin": "sknFlxIdentifier"
            },
            "lblIdentifier": {
              "skin": "sknffffff15pxolbfonticons"
            },
            "template": 'flxExportAmendmentListTablet',
            "lblColumn1": record.applicantName || NA,
            "lblColumn2": record.exportlcReferenceNo || NA,
            "lblColumn3": record.amendmentReceivedDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.amendmentReceivedDate) : NA,
            "lblColumn4": record.amendmentStatus || NA,
            "lblRowColumn1Key": kony.i18n.getLocalizedString("i18n.ImportLC.LCType"),
            "lblRowColumn1Value": record.lcType || NA,
            "lblRowColumn2Key": kony.i18n.getLocalizedString("i18n.TradeFinance.IssueDate"),
            "lblRowColumn2Value": record.lcIssueDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.lcIssueDate) : NA,
            "lblRowColumn3Key": kony.i18n.getLocalizedString("i18n.ImportLC.ExpiryDate"),
            "lblRowColumn3Value": record.lcExpiryDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.lcExpiryDate) : NA,
            "lblRowColumn4Key": kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentNoWithDot"),
            "lblRowColumn4Value": record.amendmentNo || NA,
            "lblRow2Column1Key": kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentReference"),
            "lblRow2Column1Value": record.amendmentReferenceNo || NA,
            "btnAction": {
              "text": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
              "toolTip": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
              "onClick": function () {
                presenter.showExportLCScreen({
                  'context': 'viewAmendment',
                  'data': record,
                  'form': this.view.id
                });
              }
            },
            "btnAction1": {
              "text": kony.i18n.getLocalizedString("i18n.common.Download"),
              "toolTip": kony.i18n.getLocalizedString("i18n.common.Download"),
              "onClick": function () {
                presenter.generateExportAmendment({
                  'amendmentReferenceNo': record.amendmentSRMSRequestId
                }, scope.view.id);
              }
            },
            "btnAction2": {
              "text": kony.i18n.getLocalizedString("i18n.accounts.print"),
              "toolTip": kony.i18n.getLocalizedString("i18n.accounts.print"),
              "onClick": function () {
                presenter.showExportLCScreen({
                  'context': 'printAmendment',
                  'data': record,
                  'form': this.view.id
                });
              }
            }
          }))
        }
      } else {
        for (const record of records) {
          segData.push(Object.assign(record, {
            "flxExportAmendmentList": {
              "height": "40dp",
              "skin": "sknflxffffffnoborder"
            },
            "lblDropdown": fontIcons.chevronDown,
            "flxDropdown": {
              "onClick": this.handleSegmentRowView.bind(this)
            },
            "flxIdentifier": {
              'isVisible': false,
              "skin": "sknFlxIdentifier"
            },
            "lblIdentifier": {
              "skin": "sknffffff15pxolbfonticons"
            },
            "template": 'flxExportAmendmentList',
            "lblColumn1": record.applicantName || NA,
            "lblColumn2": record.exportlcReferenceNo || NA,
            "lblColumn3": record.lcType || NA,
            "lblColumn4": record.amendmentReceivedDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.amendmentReceivedDate) : NA,
            "lblColumn5": record.amendmentNo || NA,
            "lblColumn6": record.amendmentStatus || NA,
            "lblRowColumn1Key": kony.i18n.getLocalizedString("i18n.TradeFinance.IssueDate"),
            "lblRowColumn1Value": record.lcIssueDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.lcIssueDate) : NA,
            "lblRowColumn2Key": kony.i18n.getLocalizedString("i18n.ImportLC.ExpiryDate"),
            "lblRowColumn2Value": record.lcExpiryDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.lcExpiryDate) : NA,
            "lblRowColumn3Key": kony.i18n.getLocalizedString("i18n.TradeFinance.AmendmentReference"),
            "lblRowColumn3Value": record.amendmentReferenceNo || NA,
            "btnAction": {
              "text": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
              "toolTip": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
              "onClick": function () {
                presenter.showExportLCScreen({
                  'context': 'viewAmendment',
                  'data': record,
                  'form': this.view.id
                });
              }
            },
            "btnAction1": {
              "text": kony.i18n.getLocalizedString("i18n.common.Download"),
              "toolTip": kony.i18n.getLocalizedString("i18n.common.Download"),
              "onClick": function () {
                presenter.generateExportAmendment({
                  'amendmentReferenceNo': record.amendmentSRMSRequestId
                }, scope.view.id);
              }
            },
            "btnAction2": {
              "text": kony.i18n.getLocalizedString("i18n.accounts.print"),
              "toolTip": kony.i18n.getLocalizedString("i18n.accounts.print"),
              "onClick": function () {
                presenter.showExportLCScreen({
                  'context': 'printAmendment',
                  'data': record,
                  'form': this.view.id
                });
              }
            }
          }))
        }
      }
      return segData;
    },
    getDrawingSegmentData: function (records) {
      let segData = [];
      if (breakpoint <= 1024) {
        for (const record of records) {
          segData.push(Object.assign(record, {
            "lblDropdown": fontIcons.chevronDown,
            "flxTempExportLCList4": {
              "height": "40dp",
              "skin": "sknflxffffffnoborder"
            },
            "lblIdentifier": {
              "skin": "sknffffff15pxolbfonticons"
            },
            "flxIdentifier": {
              'isVisible': false,
              "skin": "sknFlxIdentifier"
            },
            "flxDropdown": {
              "onClick": this.handleSegmentRowView.bind(this)
            },
            "lblColumn1": record.applicant || NA,
            "lblColumn2": record.drawingCreatedDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.drawingCreatedDate) : NA,
            "lblColumn3": record.status || NA,
            "template": 'flxTempExportLCList4',
            "lblRowColumn1Key": kony.i18n.getLocalizedString("i18n.TradeFinance.AdvisingLCRefNo"),
            "lblRowColumn2Key": kony.i18n.getLocalizedString("i18n.TradeFinance.DrawingReference"),
            "lblRowColumn3Key": kony.i18n.getLocalizedString("i18n.wealth.amount"),
            "lblRow2Column1Key": kony.i18n.getLocalizedString("i18n.TradeFinance.MessageToBankDrawings"),
            "lblRow2Column2Key": kony.i18n.getLocalizedString("i18n.TradeFinance.DocStatus"),
            "lblRow2Column3Key": kony.i18n.getLocalizedString("i18n.common.Currency"),
            "lblRowColumn1Value": record.lcReferenceNo || NA,
            "lblRowColumn2Value": record.drawingReferenceNo || NA,
            "lblRowColumn3Value": (record.currency && record.drawingAmount) ? `${presenter.configurationManager.getCurrency(record.currency)}${presenter.formatUtilManager.formatAmount(record.drawingAmount.replace(/,/g, ''))}` : NA,
            "lblRow2Column1Value": record.messageToBank || NA,
            "lblRow2Column2Value": record.documentStatus || NA,
            "lblRow2Column3Value": record.currency || NA,
            "btnAction": {
              "text": record.status === OLBConstants.EXPORT_DRAWING_STATUS.DRAFT ? kony.i18n.getLocalizedString("i18n.ImportLC.ContinueEditing") : kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
              "toolTip": record.status === OLBConstants.EXPORT_DRAWING_STATUS.DRAFT ? kony.i18n.getLocalizedString("i18n.ImportLC.ContinueEditing") : kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
              "onClick": function () {
                presenter.showExportLCScreen({
                  'context': 'viewDrawing',
                  'data': record,
                  'form': scope.view.id
                });
              }
            },
            "btnAction1": {
              "text": kony.i18n.getLocalizedString("i18n.common.Download"),
              "toolTip": kony.i18n.getLocalizedString("i18n.common.Download"),
              "onClick": function () {
                presenter.generateExportDrawing({
                  'drawingReferenceNo': record.drawingReferenceNo
                }, scope.viwe.id);
              }
            },
            "btnAction2": {
              "text": kony.i18n.getLocalizedString("i18n.accounts.print"),
              "toolTip": kony.i18n.getLocalizedString("i18n.accounts.print"),
              "onClick": function () {
                presenter.showExportLCScreen({
                  'context': 'printDrawing',
                  'data': record,
                  'form': scope.view.id
                });
              }
            }
          }));
        }
      } else {
        for (const record of records) {
          segData.push(Object.assign(record, {
            "lblDropdown": fontIcons.chevronDown,
            "flxTempExportLCList2": {
              "height": "40dp",
              "skin": "sknflxffffffnoborder"
            },
            "lblIdentifier": {
              "skin": "sknffffff15pxolbfonticons"
            },
            "flxIdentifier": {
              'isVisible': false,
              "skin": "sknFlxIdentifier"
            },
            "flxDropdown": {
              "onClick": this.handleSegmentRowView.bind(this)
            },
            "lblColumn1": record.applicant || NA,
            "lblColumn2": record.drawingReferenceNo || NA,
            "lblColumn3": (record.currency && record.drawingAmount) ? `${presenter.configurationManager.getCurrency(record.currency)}${presenter.formatUtilManager.formatAmount(record.drawingAmount.replace(/,/g, ''))}` : NA,
            "lblColumn4": record.drawingCreatedDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.drawingCreatedDate) : NA,
            "lblColumn5": record.status || NA,
            "template": 'flxTempExportLCList2',
            "lblRowColumn1Key": kony.i18n.getLocalizedString("i18n.TradeFinance.AdvisingLCRefNo"),
            "lblRowColumn2Key": kony.i18n.getLocalizedString("i18n.ImportLC.LCType"),
            "lblRowColumn3Key": kony.i18n.getLocalizedString("i18n.TradeFinance.DocStatus"),
            "lblRowColumn4Key": kony.i18n.getLocalizedString("i18n.common.Currency"),
            "lblRow2Column1Key": kony.i18n.getLocalizedString("i18n.TradeFinance.MessageToBankDrawings"),
            "lblRowColumn1Value": record.lcReferenceNo || NA,
            "lblRowColumn2Value": record.lcType || NA,
            "lblRowColumn3Value": record.documentStatus || NA,
            "lblRowColumn4Value": record.currency || NA,
            "lblRow2Column1Value": record.messageToBank || NA,
            "btnAction": {
              "text": kony.i18n.getLocalizedString(record.status === OLBConstants.EXPORT_DRAWING_STATUS.DRAFT ? "i18n.ImportLC.ContinueEditing" : "i18n.common.ViewDetails"),
              "toolTip": kony.i18n.getLocalizedString(record.status === OLBConstants.EXPORT_DRAWING_STATUS.DRAFT ? "i18n.ImportLC.ContinueEditing" : "i18n.common.ViewDetails"),
              "onClick": function () {
                presenter.showExportLCScreen({
                  'context': 'viewDrawing',
                  'data': record,
                  'form': scope.view.id
                });
              }
            },
            "btnAction1": {
              "text": kony.i18n.getLocalizedString("i18n.common.Download"),
              "toolTip": kony.i18n.getLocalizedString("i18n.common.Download"),
              "onClick": function () {
                presenter.generateExportDrawing({
                  'drawingReferenceNo': record.drawingReferenceNo
                }, scope.viwe.id);
              }
            },
            "btnAction2": {
              "text": kony.i18n.getLocalizedString("i18n.accounts.print"),
              "toolTip": kony.i18n.getLocalizedString("i18n.accounts.print"),
              "onClick": function () {
                presenter.showExportLCScreen({
                  'context': 'printDrawing',
                  'data': record,
                  'form': scope.view.id
                });
              }
            }
          }));
        }
      }
      return segData;
    },
    /**
     * Method to handle the segment row view on click of dropdown
     */
    handleSegmentRowView: function () {
      const rowIndex = contentScope.segList.selectedRowIndex[1];
      const data = contentScope.segList.data;
      let expandedHeight;
      if (tabSelected === 1) {
        expandedHeight = breakpoint <= 1024 ? "170dp" : "130dp";
      } else if (tabSelected === 3) {
        expandedHeight = breakpoint <= 1024 ? "205dp" : "210dp";
      } else {
        expandedHeight = breakpoint <= 1024 ? "175dp" : "105dp";
      }
      const collapsedView = [fontIcons.chevronDown, false, "40dp", "sknflxffffffnoborder"],
        expandedView = [fontIcons.chevronUp, true, expandedHeight, "ICSknFlxfbfbfb"];
      if (previousIndex === rowIndex) {
        this.toggleSegmentRowView(rowIndex, data[rowIndex].lblDropdown === fontIcons.chevronUp ? collapsedView : expandedView);
      } else {
        if (previousIndex >= 0) {
          this.toggleSegmentRowView(previousIndex, collapsedView);
        }
        this.toggleSegmentRowView(rowIndex, expandedView);
      }
      previousIndex = rowIndex;
    },
    /**
     * Method to toggle the segment row view
     * @param {Number} index - index of segment row to toggle
     * @param {Array} viewData - data which need to be assigned to toggled view
     */
    toggleSegmentRowView: function (index, viewData) {
      let data = contentScope.segList.data[index];
      const template = data.template;
      data.lblDropdown = viewData[0];
      data.flxIdentifier.isVisible = viewData[1];
      data[template].height = viewData[2];
      data[template].skin = viewData[3];
      contentScope.segList.setDataAt(data, index);
    },
    /**
     * Applies the pagination.
     * @param {string} pageFlow - Specifies the page flow.
     * @returns {void} - Return nothing if there is no record.
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
      contentScope.lblPageText.text = `${currentPage} - ${totalPages} ${kony.i18n.getLocalizedString(tabSelected === 1 ? 'i18n.ImportLC.Exports' : tabSelected === 2 ? 'i18n.ImportLC.Amendments' : 'i18n.ImportLC.Drawings')}`;
      contentScope.lblPageStartIcon.skin = currentPage === 1 ? skins.pageDisabled : skins.pageEnabled;
      contentScope.lblPagePreviousIcon.skin = currentPage > 1 ? skins.pageEnabled : skins.pageDisabled;
      contentScope.lblPageNextIcon.skin = currentPage < totalPages ? skins.pageEnabled : skins.pageDisabled;
      contentScope.lblPageEndIcon.skin = currentPage === totalPages ? skins.pageDisabled : skins.pageEnabled;
    },
    moreActionSegDataMapping: function () {
      const segData = [{
        'flxListDropdown': {
          'onClick': this.downloadExportedList,
          'cursorType': 'pointer'
        },
        'lblListValue': {
          'text': kony.i18n.getLocalizedString("i18n.TradeFinance.ExportList"),
          'toolTip': kony.i18n.getLocalizedString("i18n.TradeFinance.ExportList")
        }
      }];
      contentScope.segEllipsisDropDownValues.setData(segData);
    },
    /**
     * Downloads exported records list.
     */
    downloadExportedList: function () {
      const criteria = {
        'searchString': contentScope.tbxSearch.text,
        'sortByParam': listParams.sortByParam,
        'sortOrder': listParams.sortOrder,
        'timeParam': generateListCriteria['timeParam'] || '',
        'timeValue': generateListCriteria['timeValue'] || '',
        'filterByValue': generateListCriteria['filterByValue'] || '',
        'filterByParam': generateListCriteria['filterByParam'] || ''
      };
      contentScope.flxEllipsisDropDown.setVisibility(false);
      presenter.generateList({
        'flow': ['Export Letter Of Credit', 'Export LC Amendment', 'Export Drawing'][tabSelected - 1],
        criteria,
        'form': scope.view.id
      });
    },
    /**
     * Error thrown from catch block of form controller
     */
    onError: function (err) {
      kony.print(JSON.stringify(err));
    }
  };
});