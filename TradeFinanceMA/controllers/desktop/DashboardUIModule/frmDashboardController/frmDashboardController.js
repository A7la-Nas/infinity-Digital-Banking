define(["FormControllerUtility", "CommonUtilities", "OLBConstants", "ViewConstants"], function (FormControllerUtility, CommonUtilities, OLBConstants, ViewConstants) {
  const NA = kony.i18n.getLocalizedString("i18n.common.NA");
  let presenter, contentScope, contentPopupScope, titleActionScope, breakpoint, limitsData,
    isReceivablesGraphRendered = false, isPayablesGraphRendered = false, receivablesData, payablesData, receivableOverdue, payableOverdue, accountsData = [],
    currencyCode, currencySymbol, rpType, previousIndex, rpPayload, rpSortFields, segRPFilterData,
    segContextualQLData, selectedQL, availableQL, segContextualNAData, selectedNA, availableNA,
    needAttentionData, naPayload, naSortFields, baseCurrencyCode = '', dropdownCurrenciesList = [], selectedTextBox = '',
    isDropdownRendered = false, exchangeRatesList = [], recentERCurrencies = [],
    formatter = new Intl.NumberFormat('en', { notation: 'compact' });
  return {
    /**
     * Sets the initial actions for form
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
      responsiveUtils.onOrientationChange(this.onBreakpointChange);
      breakpoint = kony.application.getCurrentBreakpoint();
    },
    /**
     * Performs the actions required before rendering form
     */
    preShow: function () {
      this.resetForm();
      contentPopupScope.flxRPContainer.doLayout = CommonUtilities.centerPopupFlex;
      contentPopupScope.flxNAListingContainer.doLayout = CommonUtilities.centerPopupFlex;
      this.callDashboardServices();
      presenter.fetchTFConfiguration({
        "payload": {},
        "screenLoader": false,
        "formID": this.view.id
      });
    },
    /**
     * Performs the actions required after rendering form
     */
    postShow: function () {
      applicationManager.getNavigationManager().applyUpdates(this);
      this.setDropdownValues(contentScope.segCurrency, presenter.dashboardConfig.currencies, contentScope.flxCurrencyList, contentScope.lblSelectedCurrency);
      this.setDropdownValues(contentScope.segReceivableGraphFilter, presenter.dashboardConfig.receivableGraphFilters, contentScope.flxReceivableGraphFilterList, contentScope.lblSelectedReceivableGraphFilter);
      this.setDropdownValues(contentScope.segPayableGraphFilter, presenter.dashboardConfig.payableGraphFilters, contentScope.flxPayableGraphFilterList, contentScope.lblSelectedPayableGraphFilter);
      this.setListPopupContextualValues();
      this.getAccountsData();
      this.setAccountsData();
    },
    /**
     * Method to initialise form actions
     */
    initFormActions: function () {
      const scope = this;
      presenter = applicationManager.getModulesPresentationController({ appName: 'TradeFinanceMA', moduleName: 'DashboardUIModule' });
      contentScope = this.view.formTemplate12.flxContentTCCenter;
      contentPopupScope = this.view.formTemplate12.flxContentPopup;
      titleActionScope = this.view.formTemplate12.flxTCButtons;
      contentPopupScope.calRPDate.dateEditable = false;
      contentScope.flxCurrencyDropdown.onClick = this.toggleDropdown.bind(this, contentScope.flxCurrencyList, contentScope.lblCurrencyDropdownIcon);
      contentScope.flxQuickLinks.onClick = this.toggleDropdown.bind(this, contentScope.flxQuickLinksContent, contentScope.lblQuickLinksDropdownIcon);
      contentScope.segCurrency.onRowClick = this.segRowClick.bind(this, contentScope.segCurrency, contentScope.lblSelectedCurrency, contentScope.flxCurrencyList, contentScope.lblCurrencyDropdownIcon);
      contentScope.flxReceivableGraphFilterDropdown.onClick = this.toggleDropdown.bind(this, contentScope.flxReceivableGraphFilterList, contentScope.lblReceivableGraphFilterDropdownIcon);
      contentScope.segReceivableGraphFilter.onRowClick = this.segRowClick.bind(this, contentScope.segReceivableGraphFilter, contentScope.lblSelectedReceivableGraphFilter, contentScope.flxReceivableGraphFilterList, contentScope.lblReceivableGraphFilterDropdownIcon);
      contentScope.flxPayableGraphFilterDropdown.onClick = this.toggleDropdown.bind(this, contentScope.flxPayableGraphFilterList, contentScope.lblPayableGraphFilterDropdownIcon);
      contentScope.segPayableGraphFilter.onRowClick = this.segRowClick.bind(this, contentScope.segPayableGraphFilter, contentScope.lblSelectedPayableGraphFilter, contentScope.flxPayableGraphFilterList, contentScope.lblPayableGraphFilterDropdownIcon);
      contentPopupScope.flxRPClose.onClick = this.togglePopup.bind(this, 'flxReceivablePayablePopup', false);
      contentScope.flxRefresh.onClick = this.callDashboardServices;
      contentScope.btnViewReceivables.onClick = this.initialiseRPPopup.bind(this, 'Receivables');
      contentScope.btnViewPayables.onClick = this.initialiseRPPopup.bind(this, 'Payables');
      contentPopupScope.tbxRPSearch.onDone = this.getRPData;
      contentPopupScope.calRPDate.onSelection = this.getRPData.bind(this, 'date');
      contentPopupScope.flxRPFilter.onClick = this.toggleDropdown.bind(this, contentPopupScope.flxRPFilterList, contentPopupScope.lblRPFilterDropdown);
      contentPopupScope.flxRPContextual.onClick = () => contentPopupScope.flxRPContextualList.setVisibility(!contentPopupScope.flxRPContextualList.isVisible);
      contentPopupScope.flxNAListingClose.onClick = this.togglePopup.bind(this, 'flxNAListingPopup', false);
      contentScope.flxNeedAttentionContextual.onClick = () => contentScope.flxContextualNA.setVisibility(true);
      contentScope.btnEditLinks.onClick = () => {
        contentScope.flxContextualQL.setVisibility(true);
        contentScope.flxQuickLinksContent.setVisibility(false);
      };
      contentScope.btnResetNA.onClick = () => {
        contentScope.segContextualNA.setData(segContextualNAData);
        contentScope.btnApplyNA.skin = "ICSknbtnEnabed003e7536px";
        contentScope.btnApplyNA.setEnabled(true);
      };
      contentScope.btnResetQL.onClick = () => {
        contentScope.segContextualQL.setData(segContextualQLData);
        contentScope.btnApplyQL.skin = "ICSknbtnEnabed003e7536px";
        contentScope.btnApplyQL.setEnabled(true);
      };
      contentScope.btnCancelNA.onClick = () => contentScope.flxContextualNA.setVisibility(false);
      contentScope.btnCancelQL.onClick = () => {
        contentScope.flxContextualQL.setVisibility(false);
        contentScope.flxQuickLinksContent.setVisibility(true);
      };
      contentPopupScope.tbxRPSearch.onTextChange = () => contentPopupScope.lblRPSearchClearIcon.setVisibility(contentPopupScope.tbxRPSearch.text !== "");
      contentPopupScope.lblRPSearchClearIcon.onTouchEnd = () => {
        contentPopupScope.flxRPSearch.tbxRPSearch.text = "";
        contentPopupScope.lblRPSearchClearIcon.setVisibility(false);
        scope.getRPData();
      };
      contentPopupScope.btnRPFilterApply.onClick = this.applyRPFilters;
      contentPopupScope.btnRPFilterCancel.onClick = this.toggleDropdown.bind(this, contentPopupScope.flxRPFilterList, contentPopupScope.lblRPFilterDropdown);
      for (let i = 1; i < 7; i++) {
        contentPopupScope['imgRPSortColumn' + i].onTouchStart = scope.toggleRPSort.bind(scope, 'imgRPSortColumn' + i);
      }
      contentScope.btnApplyQL.onClick = this.applyQLContextual;
      contentScope.segQuickLinks.onRowClick = this.handleQuickLinkNavigation;
      contentScope.btnApplyNA.onClick = this.applyNAContextual;
      contentScope.flxExchangeRatesContextual.onClick = this.renderEditCurrencyList.bind(this);
      contentScope.btnCancelCurrency.onClick = () => contentScope.flxCurrencyContexualDropdown.setVisibility(false);
      contentScope.btnResetAction.onClick = this.resetCurrencies.bind(this);
      contentScope.txtFromCurrency.onTouchStart = this.renderFromToCurrencyList.bind(this, contentScope.txtFromCurrency);
      contentScope.txtToCurrency.onTouchStart = this.renderFromToCurrencyList.bind(this, contentScope.txtToCurrency);
      contentScope.segRecentlyUsed.onRowClick = this.setSelectedCurrency.bind(this, contentScope.segRecentlyUsed);
      contentScope.segAllCurrency.onRowClick = this.setSelectedCurrency.bind(this, contentScope.segAllCurrency);
      contentScope.txtSearch.onKeyUp = this.searchERCurrency.bind(this, contentScope.txtSearch);
      contentScope.btnApplyCurrency.onClick = this.applyERContextual.bind(this);
      contentScope.lblRefreshExchangeRatesIcon.onTouchStart = this.refreshExchangeRates.bind(this);
      contentScope.txtSearchAvailable.onKeyUp = this.searchERCurrency.bind(this, contentScope.txtSearchAvailable)
      contentScope.segNeedAttention.onRowClick = this.initialiseNAPopup;
      for (let i = 1; i <= 4; i++) {
        contentPopupScope['imgNASortColumn' + i].onTouchStart = scope.toggleNASort.bind(scope, 'imgNASortColumn' + i);
      }
      contentPopupScope.tbxNASearch.onDone = this.getNAData;
      contentPopupScope.tbxNASearch.onTextChange = () => contentPopupScope.lblNASearchClearIcon.setVisibility(contentPopupScope.tbxNASearch.text !== "");
      contentPopupScope.lblNASearchClearIcon.onTouchEnd = () => {
        contentPopupScope.tbxNASearch.text = "";
        contentPopupScope.lblNASearchClearIcon.setVisibility(false);
        scope.getNAData();
      };
      contentPopupScope.flxNAListingClose.onClick = this.togglePopup.bind(this, 'flxNAListingPopup', false);
      contentPopupScope.flxNAListingContextual.onClick = () => contentPopupScope.flxNAContextualList.setVisibility(!contentPopupScope.flxNAContextualList.isVisible);
      CommonUtilities.disableOldDaySelection(contentPopupScope.calRPDate);
      contentScope.btnViewAllAccounts.onClick = () => applicationManager.getModulesPresentationController({ appName: 'HomepageMA', moduleName: 'AccountsUIModule' }).showAccountsDashboard();
      contentScope.lblSelectedDropdown.onTouchStart = this.toggleERFilter.bind(this, contentScope.segSelectedCurrenciesList, contentScope.lblSelectedDropdown);
      contentScope.lblAvailableDropdown.onTouchStart = this.toggleERFilter.bind(this, contentScope.segAvailableCurrenciesList, contentScope.lblAvailableDropdown);
      this.renderCalendars();
      this.initialiseColumnCharts();
      this.initialiseBarCharts();
      this.setPermissionData();
    },
    /**
     * Entry point method for the form controller
     * @param {Object} viewModel - it contains the set of view properties and keys.
     */
    updateFormUI: function (viewModel) {
      if (viewModel.isLoading === true) {
        FormControllerUtility.showProgressBar(this.view);
      } else if (viewModel.isLoading === false) {
        FormControllerUtility.hideProgressBar(this.view);
      }
      if (viewModel.isReceivablesLoading === true) {
        contentScope.flxLoadingReceivables.setVisibility(true);
        contentScope.flxReceivables.setVisibility(false);
      } else if (viewModel.isReceivablesLoading === false) {
        contentScope.flxLoadingReceivables.setVisibility(false);
        contentScope.flxReceivables.setVisibility(true);
        FormControllerUtility.hideProgressBar(this.view);
      }
      if (viewModel.isPayablesLoading === true) {
        contentScope.flxLoadingPayables.setVisibility(true);
        contentScope.flxPayables.setVisibility(false);
      } else if (viewModel.isPayablesLoading === false) {
        contentScope.flxLoadingPayables.setVisibility(false);
        contentScope.flxPayables.setVisibility(true);
        FormControllerUtility.hideProgressBar(this.view);
      }
      if (viewModel.isLimitsLoading === true) {
        contentScope.flxLoadingLimits.setVisibility(true);
        contentScope.flxLimitsContainer.setVisibility(false);
      } else if (viewModel.isLimitsLoading === false) {
        contentScope.flxLoadingLimits.setVisibility(false);
        contentScope.flxLimitsContainer.setVisibility(true);
        FormControllerUtility.hideProgressBar(this.view);
      }
      if (viewModel.isTFConfigurationLoading === true || viewModel.isTradeDetailsLoading === true) {
        contentScope.flxLoadingNA.setVisibility(true);
        contentScope.flxNeedAttentionContainer.setVisibility(false);
      } else if (viewModel.isTFConfigurationLoading === false || viewModel.isTradeDetailsLoading === false) {
        contentScope.flxLoadingNA.setVisibility(false);
        contentScope.flxNeedAttentionContainer.setVisibility(true);
        FormControllerUtility.hideProgressBar(this.view);
      }
      if (viewModel.isBaseCurrencyLoading === true || viewModel.isDropdownCurrencyListLoading === true || viewModel.isCurrencyRatesLoading === true) {
        contentScope.flxLoadingER.setVisibility(true);
        contentScope.flxExchangeRatesContainer.setVisibility(false);
      } else if (viewModel.isBaseCurrencyLoading === false || viewModel.isDropdownCurrencyListLoading === false || viewModel.isCurrencyRatesLoading === false) {
        contentScope.flxLoadingER.setVisibility(false);
        contentScope.flxExchangeRatesContainer.setVisibility(true);
        FormControllerUtility.hideProgressBar(this.view);
      }
      if (viewModel.Receivables) {
        if (!isReceivablesGraphRendered) {
          this.constructReceivablesGraphData(viewModel.Receivables);
        } else {
          this.setRPData(viewModel.Receivables);
        }
      }
      if (viewModel.Payables) {
        if (!isPayablesGraphRendered) {
          this.constructPayablesGraphData(viewModel.Payables);
        } else {
          this.setRPData(viewModel.Payables);
        }
      }
      if (viewModel.Limits) {
        this.constructLimitsGraphData(viewModel.Limits);
      }
      if (viewModel.quickLink) {
        selectedQL = viewModel.quickLink;
        this.setQuickLinks();
      }
      if (viewModel.needAttention) {
        selectedNA = viewModel.needAttention;
        this.setNeedAttentionValues();
      }
      if (viewModel.AllTradeDetails) {
        if (contentPopupScope.flxNAListingPopup.isVisible) {
          this.setNAData(viewModel.AllTradeDetails);
        } else {
          this.constructNeedAttentionData(viewModel.AllTradeDetails);
        }
      }
      if (viewModel.serverError) {
        this.view.formTemplate12.showBannerError({ dbpErrMsg: viewModel.serverError });
      }
      if (viewModel.code) {
        baseCurrencyCode = viewModel.code;
        contentScope.txtFromCurrency.text = baseCurrencyCode;
        presenter.fetchDropdownCurrencyList({
          "payload": {
            "baseCurrencyCode": baseCurrencyCode
          },
          "screenLoader": false,
          "formID": this.view.id
        });
      }
      if (viewModel.Currencies) {
        if (viewModel.httpresponse.url.includes("fetchDashboardCurrencyList")) {
          dropdownCurrenciesList = viewModel.Currencies;
          if (!isDropdownRendered) this.setRecentERCurrencies();
          else {
            this.populateFromToCurrencyList(contentScope.segRecentlyUsed, []);
            this.populateFromToCurrencyList(contentScope.segAllCurrency, []);
          }
        } else {
          exchangeRatesList = viewModel.Currencies;
          this.populateExchangeRates('');
        }
      }
    },
    /**
    * setting the position of calendars
    */
    renderCalendars: function () {
      const calendars = [contentPopupScope.calRPDate];
      for (const calWidget of calendars) {
        calWidget.setContext({
          "widget": calWidget,
          "anchor": "bottom"
        });
      }
    },
    callDashboardServices: function () {
      this.resetForm();
      contentScope.lblRefreshedTime.text = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      presenter.getReceivables({
        "payload": {},
        "screenLoader": false,
        "formID": this.view.id
      });
      presenter.getPayables({
        "payload": {},
        "screenLoader": false,
        "formID": this.view.id
      });
      presenter.getAllTradeDetails({
        "payload": {},
        "screenLoader": false,
        "formID": this.view.id
      });
      presenter.getLimits({
        "payload": {},
        "screenLoader": false,
        "formID": this.view.id
      });
      presenter.fetchBaseCurrency({
        "payload": {
          "CountryCode": " ",
          "companyCode": applicationManager.getUserPreferencesManager().getCompanyId(),
          "market": "10 1"
        },
        "screenLoader": false,
        "formID": this.view.id
      });
      presenter.updateRecentCurrencies({
        "payload": {
          "quoteCurrencyCode": contentScope.txtToCurrency.text
        },
        "screenLoader": false,
        "formID": this.view.id
      });
    },
    resetForm: function () {
      isReceivablesGraphRendered = false;
      isPayablesGraphRendered = false;
      receivablesData = [];
      payablesData = [];
      receivableOverdue = {};
      payableOverdue = {};
      contentScope.lblCurrencyDropdownIcon.text = presenter.resourcesConstants.fontIcons.chevronDown;
      contentScope.lblQuickLinksDropdownIcon.text = presenter.resourcesConstants.fontIcons.chevronDown;
      contentScope.lblReceivableGraphFilterDropdownIcon.text = presenter.resourcesConstants.fontIcons.chevronDown;
      contentScope.lblPayableGraphFilterDropdownIcon.text = presenter.resourcesConstants.fontIcons.chevronDown;
      contentScope.flxCurrencyList.setVisibility(false);
      contentScope.flxReceivableGraphFilterList.setVisibility(false);
      contentScope.flxPayableGraphFilterList.setVisibility(false);
      contentScope.flxContextualNA.setVisibility(false);
      contentScope.flxContextualQL.setVisibility(false);
      contentScope.flxQuickLinksContent.setVisibility(false);
      contentScope.flxCurrencyContexualDropdown.setVisibility(false);
      contentScope.flxCurrencyListDropdown.setVisibility(false);
      contentPopupScope.setVisibility(false);
      contentPopupScope.flxReceivablePayablePopup.setVisibility(false);
      contentPopupScope.flxNAListingPopup.setVisibility(false);
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
        segWidget.selectedRowIndex = [0, 0];
        lblSelectedValue.text = segWidget.selectedRowItems[0].value;
      }
      if (segWidget.id === 'segCurrency') {
        currencyCode = segWidget.selectedRowItems[0].key;
        currencySymbol = presenter.configurationManager.getCurrency(currencyCode);
      }
      flxList.height = (segmentData.length * 41 > 205) ? "205dp" : `${segmentData.length * 41}dp`;
    },
    toggleDropdown: function (flxSeg, lblIcon) {
      if (flxSeg.isVisible) {
        flxSeg.setVisibility(false);
        lblIcon.text = presenter.resourcesConstants.fontIcons.chevronDown;
      } else {
        flxSeg.setVisibility(true);
        lblIcon.text = presenter.resourcesConstants.fontIcons.chevronUp;
        switch (flxSeg.id) {
          case 'flxRPFilterList':
            contentPopupScope.segRPFilterList.setData(segRPFilterData);
            contentPopupScope.btnRPFilterApply.skin = "ICSknbtnEnabed003e7536px";
            contentPopupScope.btnRPFilterApply.setEnabled(true);
            break;
          case 'flxQuickLinksContent':
            contentScope.segContextualQL.setData(segContextualQLData);
            contentScope.btnApplyQL.skin = "ICSknbtnEnabed003e7536px";
            contentScope.btnApplyQL.setEnabled(true);
            break;
        }
      }
    },
    segRowClick: function (segDropdown, lblSelectedValue, flxSegDropdown, lblDropdownIcon) {
      const selectedData = segDropdown.selectedRowItems[0];
      lblSelectedValue.text = selectedData.value;
      flxSegDropdown.setVisibility(false);
      lblDropdownIcon.text = presenter.resourcesConstants.fontIcons.chevronDown;
      if (segDropdown.id === 'segCurrency') {
        currencyCode = selectedData.key;
        currencySymbol = presenter.configurationManager.getCurrency(currencyCode);
        this.setReceivablesGraphData();
        this.setPayablesGraphData();
        this.setNeedAttentionValues();
        this.setAccountsData();
        this.setLimitsGraphData();
      }
      if (segDropdown.id === 'segReceivableGraphFilter') {
        this.setReceivablesGraphData();
      }
      if (segDropdown.id === 'segPayableGraphFilter') {
        this.setPayablesGraphData();
      }
    },
    togglePopup: function (flxWidget, visibility) {
      contentPopupScope.setVisibility(visibility);
      contentPopupScope[flxWidget].setVisibility(visibility);
    },
    initialiseColumnCharts: function () {
      const options = {
        title: '',
        height: 200,
        width: (breakpoint >= 1380) ? 900 : (breakpoint >= 1366) ? 820 : 800,
        legend: { position: 'none' },
        isStacked: true,
        bar: { groupWidth: "45%" },
        vAxis: {
          gridlines: { color: "#F6F6F6" },
          viewWindow: { min: 0 },
          format: "short"
        },
        chartArea: { left: 40 }
      };
      let receivablesBarChart = new kony.ui.CustomWidget({
        "id": "ReceivablesBarChart",
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
      contentScope.flxReceivablesGraph.add(receivablesBarChart);
      let payablesBarChart = new kony.ui.CustomWidget({
        "id": "PayablesBarChart",
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
        "chartProperties": Object.assign({ widgetId: 'stacked_barChart_div2' }, options),
        "OnClickOfBar": function () { }
      });
      contentScope.flxPayablesGraph.add(payablesBarChart);
    },
    setPermissionData: function () {
      contentScope.flxReceivableType1.setVisibility(presenter.productPermission[OLBConstants.TRADE_FINANCE_PRODUCT.EXPORT_DRAWING]);
      contentScope.flxReceivableType2.setVisibility(presenter.productPermission[OLBConstants.TRADE_FINANCE_PRODUCT.OUTWARD_COLLECTION]);
      contentScope.flxReceivableType3.setVisibility(presenter.productPermission[OLBConstants.TRADE_FINANCE_PRODUCT.CLAIM_INITIATED]);
      contentScope.flxPayableType1.setVisibility(presenter.productPermission[OLBConstants.TRADE_FINANCE_PRODUCT.IMPORT_DRAWING]);
      contentScope.flxPayableType2.setVisibility(presenter.productPermission[OLBConstants.TRADE_FINANCE_PRODUCT.INWARD_COLLECTION]);
      contentScope.flxPayableType3.setVisibility(presenter.productPermission[OLBConstants.TRADE_FINANCE_PRODUCT.CLAIM_RECEIVED]);
    },
    constructReceivablesGraphData: function (receivables) {
      receivablesData = (receivables || []).reduce(function (acc, obj) {
        let date = new Date(obj.expiryDate).toDateString();
        obj.amount = parseFloat(presenter.formatUtilManager.deFormatAmount(obj.amount) || 0);
        if (!acc[obj.tradeCurrency]) acc[obj.tradeCurrency] = {};
        if (!acc[obj.tradeCurrency][date]) acc[obj.tradeCurrency][date] = {
          'receivables': { count: 0, amount: 0 },
          'amountReceived': { count: 0, amount: 0 }
        };
        if (!acc[obj.tradeCurrency][date][obj.product]) acc[obj.tradeCurrency][date][obj.product] = 0;
        if ((presenter.dashboardConfig.receivableStatus.receivable[obj.product] || []).includes(obj.status)) {
          acc[obj.tradeCurrency][date][obj.product] += obj.amount;
          acc[obj.tradeCurrency][date]['receivables'].count++;
          acc[obj.tradeCurrency][date]['receivables'].amount += obj.amount;
        }
        if ((presenter.dashboardConfig.receivableStatus.received[obj.product] || []).includes(obj.status) && obj.paymentStatus === 'Received') {
          acc[obj.tradeCurrency][date]['amountReceived'].count++;
          acc[obj.tradeCurrency][date]['amountReceived'].amount += obj.amount;
        }
        if (!receivableOverdue[obj.tradeCurrency]) receivableOverdue[obj.tradeCurrency] = { count: 0, amount: 0 };
        if (obj.paymentStatus === 'Overdue') {
          receivableOverdue[obj.tradeCurrency].count++;
          receivableOverdue[obj.tradeCurrency].amount += obj.amount;
        }
        return acc;
      }, {});
      this.setReceivablesGraphData();
      contentScope.flxLoadingReceivables.setVisibility(false);
      contentScope.flxReceivables.setVisibility(true);
    },
    constructPayablesGraphData: function (payables) {
      payablesData = (payables || []).reduce(function (acc, obj) {
        let date = new Date(obj.expiryDate).toDateString();
        obj.amount = parseFloat(presenter.formatUtilManager.deFormatAmount(obj.amount) || 0);
        if (!acc[obj.tradeCurrency]) acc[obj.tradeCurrency] = {};
        if (!acc[obj.tradeCurrency][date]) acc[obj.tradeCurrency][date] = {
          'payables': { count: 0, amount: 0 },
          'amountPaid': { count: 0, amount: 0 }
        };
        if (!acc[obj.tradeCurrency][date][obj.product]) acc[obj.tradeCurrency][date][obj.product] = 0;
        if ((presenter.dashboardConfig.payableStatus.payable[obj.product] || []).includes(obj.status)) {
          acc[obj.tradeCurrency][date][obj.product] += obj.amount;
          acc[obj.tradeCurrency][date]['payables'].count++;
          acc[obj.tradeCurrency][date]['payables'].amount += obj.amount;
        }
        if ((presenter.dashboardConfig.payableStatus.paid[obj.product] || []).includes(obj.status) && obj.paymentStatus === 'Paid') {
          acc[obj.tradeCurrency][date]['amountPaid'].count++;
          acc[obj.tradeCurrency][date]['amountPaid'].amount += obj.amount;
        }
        if (!payableOverdue[obj.tradeCurrency]) payableOverdue[obj.tradeCurrency] = { count: 0, amount: 0 };
        if (obj.paymentStatus === 'Overdue') {
          payableOverdue[obj.tradeCurrency].count++;
          payableOverdue[obj.tradeCurrency].amount += obj.amount;
        }
        return acc;
      }, {});
      this.setPayablesGraphData();
      contentScope.flxLoadingPayables.setVisibility(false);
      contentScope.flxPayables.setVisibility(true);
    },
    constructLimitsGraphData: function (limits) {
      limitsData = (limits || []).reduce(function (acc, obj) {
        if (!acc[obj.limitCurrency]) {
          acc[obj.limitCurrency] = [];
        }
        acc[obj.limitCurrency].push(obj);
        return acc;
      }, {});
      this.setLimitsGraphData();
    },
    setReceivablesGraphData: function () {
      isReceivablesGraphRendered = true;
      let date = new Date(), graphData = [],
        days = contentScope.segReceivableGraphFilter.selectedRowItems[0].key;
      const todayReceivable = receivablesData[currencyCode] ? receivablesData[currencyCode][date.toDateString()] : '';
      if (todayReceivable) {
        contentScope.lblReceivableCount1.text = todayReceivable['receivables'].count.toString();
        contentScope.lblReceivableAmount1.text = `${currencySymbol} ${presenter.formatUtilManager.formatAmount(todayReceivable['receivables'].amount)}`;
        contentScope.lblReceivableCount2.text = todayReceivable['amountReceived'].count.toString();
        contentScope.lblReceivableAmount2.text = `${currencySymbol} ${presenter.formatUtilManager.formatAmount(todayReceivable['amountReceived'].amount)}`;
      } else {
        contentScope.lblReceivableCount1.text = '0';
        contentScope.lblReceivableAmount1.text = `${currencySymbol} ${presenter.formatUtilManager.formatAmount(0)}`;
        contentScope.lblReceivableCount2.text = '0';
        contentScope.lblReceivableAmount2.text = `${currencySymbol} ${presenter.formatUtilManager.formatAmount(0)}`;
      }
      contentScope.lblReceivableCount3.text = receivableOverdue[currencyCode] ? (receivableOverdue[currencyCode].count || 0).toString() : '0';
      contentScope.lblReceivableAmount3.text = `${currencySymbol} ${presenter.formatUtilManager.formatAmount(receivableOverdue[currencyCode] ? (receivableOverdue[currencyCode].amount || 0) : 0)}`;
      while (days-- > 0) {
        let barData = {
          'categoryName': date.toLocaleString('default', { month: 'short', day: 'numeric' }),
          'budget1': 0,
          'budget1ColorCode': '#4176A4',
          'budget1TooltipText': '',
          'budget2': 0,
          'budget2TooltipText': '',
          'budget2ColorCode': '#83A6C4',
          'budget3': 0,
          'budget3ColorCode': '#C6D6E4',
          'budget3TooltipText': ''
        };
        const receivableDate = date.toDateString();
        if (receivablesData[currencyCode] && receivablesData[currencyCode][receivableDate]) {
          barData.budget1 = receivablesData[currencyCode][receivableDate][OLBConstants.TRADE_FINANCE_PRODUCT.CLAIM_INITIATED] || 0;
          barData.budget2 = receivablesData[currencyCode][receivableDate][OLBConstants.TRADE_FINANCE_PRODUCT.OUTWARD_COLLECTION] || 0;
          barData.budget3 = receivablesData[currencyCode][receivableDate][OLBConstants.TRADE_FINANCE_PRODUCT.EXPORT_DRAWING] || 0;
        }
        const tooltipText = `${barData.categoryName}\n`
          + `${kony.i18n.getLocalizedString('i18n.wealth.totalWithColon')} ${currencySymbol}${formatter.format(barData.budget1 + barData.budget2 + barData.budget3)}`
          + `${presenter.productPermission[OLBConstants.TRADE_FINANCE_PRODUCT.EXPORT_DRAWING] ? `\n${kony.i18n.getLocalizedString('i18n.TradeFinance.drawingsWithColon')} ${currencySymbol}${formatter.format(barData.budget3)}` : ''}`
          + `${presenter.productPermission[OLBConstants.TRADE_FINANCE_PRODUCT.OUTWARD_COLLECTION] ? `\n${kony.i18n.getLocalizedString('i18n.TradeFinance.collectionsWithColon')} ${currencySymbol}${formatter.format(barData.budget2)}` : ''}`
          + `${presenter.productPermission[OLBConstants.TRADE_FINANCE_PRODUCT.CLAIM_INITIATED] ? `\n${kony.i18n.getLocalizedString('i18n.TradeFinance.claimsWithColon')} ${currencySymbol}${formatter.format(barData.budget1)}` : ''}`;
        barData.budget1TooltipText = tooltipText;
        barData.budget2TooltipText = tooltipText;
        barData.budget3TooltipText = tooltipText;
        graphData.push(barData);
        date.setDate(date.getDate() + 1);
      }
      contentScope.flxReceivablesGraph.ReceivablesBarChart.chartData = graphData;
    },
    setPayablesGraphData: function () {
      isPayablesGraphRendered = true;
      let date = new Date(), graphData = [],
        days = contentScope.segPayableGraphFilter.selectedRowItems[0].key;
      const todayPayable = payablesData[currencyCode] ? payablesData[currencyCode][date.toDateString()] : '';
      if (todayPayable) {
        contentScope.lblPayableCount1.text = todayPayable['payables'].count.toString();
        contentScope.lblPayableAmount1.text = `${currencySymbol} ${presenter.formatUtilManager.formatAmount(todayPayable['payables'].amount)}`;
        contentScope.lblPayableCount2.text = todayPayable['amountPaid'].count.toString();
        contentScope.lblPayableAmount2.text = `${currencySymbol} ${presenter.formatUtilManager.formatAmount(todayPayable['amountPaid'].amount)}`;
      } else {
        contentScope.lblPayableCount1.text = '0';
        contentScope.lblPayableAmount1.text = `${currencySymbol} ${presenter.formatUtilManager.formatAmount(0)}`;
        contentScope.lblPayableCount2.text = '0';
        contentScope.lblPayableAmount2.text = `${currencySymbol} ${presenter.formatUtilManager.formatAmount(0)}`;
      }
      contentScope.lblPayableCount3.text = payableOverdue[currencyCode] ? (payableOverdue[currencyCode].count || 0).toString() : '0';
      contentScope.lblPayableAmount3.text = `${currencySymbol} ${presenter.formatUtilManager.formatAmount(payableOverdue[currencyCode] ? (payableOverdue[currencyCode].amount || 0) : 0)}`;
      while (days-- > 0) {
        let barData = {
          'categoryName': date.toLocaleString('default', { month: 'short', day: 'numeric' }),
          'budget1': 0,
          'budget1ColorCode': '#FF8600',
          'budget1TooltipText': '',
          'budget2': 0,
          'budget2TooltipText': '',
          'budget2ColorCode': '#FFB059',
          'budget3': 0,
          'budget3ColorCode': '#FFDBB2',
          'budget3TooltipText': ''
        };
        const payableDate = date.toDateString();
        if (payablesData[currencyCode] && payablesData[currencyCode][payableDate]) {
          barData.budget1 = payablesData[currencyCode][payableDate][OLBConstants.TRADE_FINANCE_PRODUCT.CLAIM_RECEIVED] || 0;
          barData.budget2 = payablesData[currencyCode][payableDate][OLBConstants.TRADE_FINANCE_PRODUCT.INWARD_COLLECTION] || 0;
          barData.budget3 = payablesData[currencyCode][payableDate][OLBConstants.TRADE_FINANCE_PRODUCT.IMPORT_DRAWING] || 0;
        }
        const tooltipText = `${barData.categoryName}\n`
          + `${kony.i18n.getLocalizedString('i18n.wealth.totalWithColon')} ${currencySymbol}${formatter.format(barData.budget1 + barData.budget2 + barData.budget3)}`
          + `${presenter.productPermission[OLBConstants.TRADE_FINANCE_PRODUCT.IMPORT_DRAWING] ? `\n${kony.i18n.getLocalizedString('i18n.TradeFinance.drawingsWithColon')} ${currencySymbol}${formatter.format(barData.budget3)}` : ''}`
          + `${presenter.productPermission[OLBConstants.TRADE_FINANCE_PRODUCT.INWARD_COLLECTION] ? `\n${kony.i18n.getLocalizedString('i18n.TradeFinance.collectionsWithColon')} ${currencySymbol}${formatter.format(barData.budget2)}` : ''}`
          + `${presenter.productPermission[OLBConstants.TRADE_FINANCE_PRODUCT.CLAIM_RECEIVED] ? `\n${kony.i18n.getLocalizedString('i18n.TradeFinance.claimsWithColon')} ${currencySymbol}${formatter.format(barData.budget1)}` : ''}`;
        barData.budget1TooltipText = tooltipText;
        barData.budget2TooltipText = tooltipText;
        barData.budget3TooltipText = tooltipText;
        graphData.push(barData);
        date.setDate(date.getDate() + 1);
      }
      contentScope.flxPayablesGraph.PayablesBarChart.chartData = graphData;
    },
    setLimitsGraphData: function () {
      let graphData = [];
      const limitsChartData = (limitsData[currencyCode] || []).slice(0, presenter.dashboardConfig.limitChartsCount);
      contentScope.btnViewAllLimits.text = `${kony.i18n.getLocalizedString('i18n.common.viewAll')} (${limitsChartData.length})`;
      limitsChartData.forEach((record, idx) => {
        i++;
        let barData = {
          'categoryName': `L${idx + 1}: ${record.limitId}\n`,
          'budget1': parseFloat(record.utilizedLimit),
          'budget1ColorCode': '#23A8B1',
          'budget1TooltipText': '',
          'budget2': parseFloat(record.availableLimit),
          'budget2TooltipText': '',
          'budget2ColorCode': '#C8E9EB',
          'budget3': -1,
          'budget3ColorCode': '',
          'budget3TooltipText': ''
        };
        const tooltipText = `L${idx + 1}: ${record.limitId}\n`
          + `${kony.i18n.getLocalizedString('i18n.wealth.totalWithColon')} ${currencySymbol}${formatter.format(barData.budget1 + barData.budget2 + barData.budget3)}` + "\n"
          + `${kony.i18n.getLocalizedString('i18n.common.available')}: ${currencySymbol}${formatter.format(barData.budget1)}` + "\n"
          + `${kony.i18n.getLocalizedString('i18n.TradeFinance.utilized')}: ${currencySymbol}${formatter.format(barData.budget2)}`;
        barData.budget1TooltipText = tooltipText;
        barData.budget2TooltipText = tooltipText;
        graphData.push(barData);
      });
      contentScope.flxLimitsChartArea.limitsBarChart.chartData = graphData;
    },
    initialiseRPPopup: function (type) {
      rpType = type;
      CommonUtilities.disableOldDaySelection(contentPopupScope.calRPDate);
      const expiryDate = contentPopupScope.calRPDate.formattedDate.split('/');
      rpPayload = {
        searchString: '',
        pageSize: '11',
        pageOffset: '0',
        sortByParam: 'transactionReference',
        sortOrder: 'ASC',
        timeParam: 'expiryDate',
        timeValue: [expiryDate[2], expiryDate[0], expiryDate[1]].join('-'),
        filterByValue: currencyCode,
        filterByParam: 'tradeCurrency'
      };
      rpSortFields = {
        imgRPSortColumn1: 'product',
        imgRPSortColumn2: 'transactionReference',
        imgRPSortColumn3: 'amount',
        imgRPSortColumn4: 'paymentStatus',
        imgRPSortColumn5: rpType === 'Receivables' ? 'creditAccount' : 'debitAccount',
        imgRPSortColumn6: 'availableBalance'
      };
      contentPopupScope.flxRPSearch.tbxRPSearch.text = '';
      contentPopupScope.lblRPSelectedFilter.text = kony.i18n.getLocalizedString("i18n.konybb.Common.All");
      contentPopupScope.lblRPFilterDropdown.text = presenter.resourcesConstants.fontIcons.chevronDown;
      contentPopupScope.flxRPFilterList.setVisibility(false);
      contentPopupScope.flxRPContextualList.setVisibility(false);
      for (const key in rpSortFields) {
        contentPopupScope[key].src = ViewConstants.IMAGES.SORT_FINAL_IMAGE;
      }
      contentPopupScope['imgRPSortColumn2'].src = ViewConstants.IMAGES.SORTING_PREVIOUS;
      this.setPaginationComponent(contentPopupScope.RPPaginationContainer, kony.i18n.getLocalizedString(rpType === 'Receivables' ? 'i18n.TradeFinance.receivables' : 'i18n.TradeFinance.payables'));
      this.setRPFilterValues();
      this.togglePopup('flxReceivablePayablePopup', true);
      contentPopupScope.lblRPHeading.text = `${kony.i18n.getLocalizedString(rpType === 'Receivables' ? 'i18n.TradeFinance.receivables' : 'i18n.TradeFinance.payables')} (${currencyCode} ${currencySymbol})`;
      contentPopupScope.lblRPSortColumn5.text = kony.i18n.getLocalizedString(rpType === 'Receivables' ? 'i18n.konybb.Common.CreditAccount' : 'i18n.konybb.Common.DebitAccount');
      this.getRPData('date');
    },
    getRPData: function (params) {
      contentPopupScope.lblRPToday.setVisibility(new Date(contentPopupScope.calRPDate.formattedDate).toDateString() === new Date().toDateString());
      if (params !== 'pagination' && params !== "sort") {
        contentPopupScope.RPPaginationContainer.setLowerLimit(1);
        contentPopupScope.RPPaginationContainer.setPageSize(10);
        contentPopupScope.RPPaginationContainer.setIntervalHeader();
      }
      const expiryDate = contentPopupScope.calRPDate.formattedDate.split('/');
      rpPayload.timeValue = [expiryDate[2], expiryDate[0], expiryDate[1]].join('-');
      rpPayload.searchString = contentPopupScope.flxRPSearch.tbxRPSearch.text;
      rpPayload.pageOffset = (params === "pagination" || params === "sort") ? contentPopupScope.RPPaginationContainer.getPageOffset() : 0;
      if (params === 'date') {
        let selectedDateData = '';
        contentPopupScope.lblRPCount1.text = '0';
        contentPopupScope.lblRPAmount1.text = `${currencySymbol} ${presenter.formatUtilManager.formatAmount(0)}`;
        contentPopupScope.lblRPCount2.text = '0';
        contentPopupScope.lblRPAmount2.text = `${currencySymbol} ${presenter.formatUtilManager.formatAmount(0)}`;
        if (rpType === 'Receivables') {
          contentPopupScope.lblRPSummary1.text = kony.i18n.getLocalizedString('i18n.TradeFinance.receivables');
          contentPopupScope.lblRPSummary2.text = kony.i18n.getLocalizedString('i18n.WireTransfer.AmountReceived');
          selectedDateData = receivablesData[currencyCode] ? receivablesData[currencyCode][new Date(contentPopupScope.calRPDate.formattedDate).toDateString()] : '';
          if (selectedDateData) {
            contentPopupScope.lblRPCount1.text = selectedDateData['receivables'].count.toString();
            contentPopupScope.lblRPAmount1.text = `${currencySymbol} ${presenter.formatUtilManager.formatAmount(selectedDateData['receivables'].amount)}`;
            contentPopupScope.lblRPCount2.text = selectedDateData['amountReceived'].count.toString();
            contentPopupScope.lblRPAmount2.text = `${currencySymbol} ${presenter.formatUtilManager.formatAmount(selectedDateData['amountReceived'].amount)}`;
          }
        } else {
          contentPopupScope.lblRPSummary1.text = kony.i18n.getLocalizedString('i18n.TradeFinance.payables');
          contentPopupScope.lblRPSummary2.text = kony.i18n.getLocalizedString('i18n.TradeFinance.amountPaid');
          selectedDateData = payablesData[currencyCode] ? payablesData[currencyCode][new Date(contentPopupScope.calRPDate.formattedDate).toDateString()] : '';
          if (selectedDateData) {
            contentPopupScope.lblRPCount1.text = selectedDateData['payables'].count.toString();
            contentPopupScope.lblRPAmount1.text = `${currencySymbol} ${presenter.formatUtilManager.formatAmount(selectedDateData['payables'].amount)}`;
            contentPopupScope.lblRPCount2.text = selectedDateData['amountPaid'].count.toString();
            contentPopupScope.lblRPAmount2.text = `${currencySymbol} ${presenter.formatUtilManager.formatAmount(selectedDateData['amountPaid'].amount)}`;
          }
        }
      }
      rpType === "Receivables" ? presenter.getReceivables({ "payload": rpPayload, "screenLoader": true, "formID": this.view.id }) : presenter.getPayables({ "payload": rpPayload, "screenLoader": true, "formID": this.view.id });
    },
    setRPData: function (rpData) {
      previousIndex = undefined;
      if (rpData && rpData.length > 0) {
        contentPopupScope.flxRPContextual.setVisibility(true);
        contentPopupScope.flxRPList.setVisibility(true);
        contentPopupScope.flxRPPagination.setVisibility(true);
        contentPopupScope.flxRPNoRecords.setVisibility(false);
      } else {
        contentPopupScope.flxRPContextual.setVisibility(false);
        contentPopupScope.flxRPList.setVisibility(false);
        contentPopupScope.flxRPPagination.setVisibility(false);
        contentPopupScope.flxRPNoRecords.setVisibility(true);
        return;
      }
      const offset = contentPopupScope.RPPaginationContainer.getPageOffset();
      if (offset === 0) {
        contentPopupScope.RPPaginationContainer.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_INACTIVE;
      } else {
        contentPopupScope.RPPaginationContainer.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_ACTIVE;
      }
      if (rpData.length > 10) {
        contentPopupScope.RPPaginationContainer.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_ACTIVE;
      } else {
        contentPopupScope.RPPaginationContainer.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_INACTIVE;
      }
      contentPopupScope.RPPaginationContainer.imgPaginationPrevious.imageScaleMode = constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS;
      contentPopupScope.RPPaginationContainer.imgPaginationNext.imageScaleMode = constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS;
      contentPopupScope.segReceivablePayable.widgetDataMap = {
        "lblDropdown": "lblDropdown",
        "flxDropdown": "flxDropdown",
        "flxReceivablePayableList2": "flxReceivablePayableList2",
        "lblColumn1": "lblColumn1",
        "lblColumn2": "lblColumn2",
        "lblColumn3": "lblColumn3",
        "lblColumn4": "lblColumn4",
        "lblColumn5": "lblColumn5",
        "lblColumn6": "lblColumn6",
        "lblRowColumn1Key": "lblRowColumn1Key",
        "lblRowColumn2Key": "lblRowColumn2Key",
        "lblRowColumn1Value": "lblRowColumn1Value",
        "lblRowColumn2Value": "lblRowColumn2Value",
        "btnAction": "btnAction",
        "lblColumn4Icon": "lblColumn4Icon"
      };
      let segRPData = [];
      rpData = rpData.slice(0, 10);
      if (kony.application.getCurrentBreakpoint() === 1024) {
        for (const data of rpData) {
          segRPData.push({
            "lblDropdown": presenter.resourcesConstants.fontIcons.chevronDown,
            "flxDropdown": {
              "onClick": this.handleSegmentRowView
            },
            "flxReceivablePayableList2": {
              "height": "40dp",
              "skin": "sknflxffffffnoborder"
            },
            'lblColumn1': data.product || NA,
            'lblColumn2': data.transactionReference || NA,
            'lblColumn3': data.amount ? `${currencySymbol}${presenter.formatUtilManager.formatAmount(presenter.formatUtilManager.deFormatAmount(data.amount) || 0)}` : NA,
            'lblColumn4': data.paymentStatus || NA,
            'lblColumn4Icon': {
              'text': 'F',
              'skin': presenter.resourcesConstants.skins[(data.paymentStatus || '').toLowerCase()]
            },
            'lblRowColumn1Key': kony.i18n.getLocalizedString(rpType === 'Receivables' ? 'i18n.konybb.Common.CreditAccount' : 'i18n.konybb.Common.DebitAccount'),
            'lblRowColumn2Key': kony.i18n.getLocalizedString('i18n.TradeFinance.availBal'),
            'lblRowColumn1Value': presenter.getAccountDisplayName(rpType === 'Receivables' ? data.creditAccount : data.debitAccount) || NA,
            'lblRowColumn2Value': (data.accountCurrency && data.availableBalance) ? `${presenter.configurationManager.getCurrency(data.accountCurrency)}${presenter.formatUtilManager.formatAmount(data.availableBalance)}` : NA,
            'btnAction': {
              'text': kony.i18n.getLocalizedString('i18n.TradeFinance.View'),
              'toolTip': kony.i18n.getLocalizedString('i18n.TradeFinance.View'),
              'onClick': this.viewRecordDetails.bind(this, data)
            },
            'template': 'flxReceivablePayableList2'
          });
        }
      } else {
        for (const data of rpData) {
          segRPData.push({
            'lblColumn1': data.product || NA,
            'lblColumn2': data.transactionReference || NA,
            'lblColumn3': data.amount ? `${currencySymbol}${presenter.formatUtilManager.formatAmount(presenter.formatUtilManager.deFormatAmount(data.amount) || 0)}` : NA,
            'lblColumn4': data.paymentStatus || NA,
            'lblColumn4Icon': {
              'text': 'F',
              'skin': presenter.resourcesConstants.skins[(data.paymentStatus || '').toLowerCase()]
            },
            'lblColumn5': presenter.getAccountDisplayName(rpType === 'Receivables' ? data.creditAccount : data.debitAccount) || NA,
            'lblColumn6': (data.accountCurrency && data.availableBalance) ? `${presenter.configurationManager.getCurrency(data.accountCurrency)}${presenter.formatUtilManager.formatAmount(data.availableBalance)}` : NA,
            'btnAction': {
              'text': kony.i18n.getLocalizedString('i18n.TradeFinance.View'),
              'toolTip': kony.i18n.getLocalizedString('i18n.TradeFinance.View'),
              'onClick': this.viewRecordDetails.bind(this, data)
            },
            'template': 'flxReceivablePayableList1'
          });
        }
      }
      contentPopupScope.segReceivablePayable.setData(segRPData);
    },
    /**
     * Method to handle the segment row view on click of dropdown
     */
    handleSegmentRowView: function () {
      const rowIndex = contentPopupScope.segReceivablePayable.selectedRowIndex[1];
      const data = contentPopupScope.segReceivablePayable.data;
      const collapsedView = [presenter.resourcesConstants.fontIcons.chevronDown, "40dp", "sknflxffffffnoborder"];
      const expandedView = [presenter.resourcesConstants.fontIcons.chevronUp, "105dp", "slFboxBGf8f7f8B0"];
      if (previousIndex === rowIndex) {
        this.toggleSegmentRowView(rowIndex, data[rowIndex].lblDropdown === presenter.resourcesConstants.fontIcons.chevronUp ? collapsedView : expandedView);
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
      let data = contentPopupScope.segReceivablePayable.data[index];
      const template = data.template;
      data.lblDropdown = viewData[0];
      data[template].height = viewData[1];
      data[template].skin = viewData[2];
      contentPopupScope.segReceivablePayable.setDataAt(data, index);
    },
    viewRecordDetails: function (data) {
      switch (data.product) {
        case OLBConstants.TRADE_FINANCE_PRODUCT.IMPORT_LC:
          applicationManager.getModulesPresentationController({ appName: 'TradeFinanceMA', moduleName: 'ImportLCUIModule' }).showImportLCScreen({ context: 'viewImportLoC', data, form: this.view.id });
          break;
        case OLBConstants.TRADE_FINANCE_PRODUCT.IMPORT_DRAWING:
          applicationManager.getNavigationManager().navigateTo({ friendlyName: 'ImportLCUIModule/frmImportLCDrawingViewDetails', appName: 'TradeFinanceMA' }, false, {drawingsSrmsReqOrderID: data.transactionReference, lcSrmsReqOrderID: data.lcSrmsReqOrderID})
          break;
        case OLBConstants.TRADE_FINANCE_PRODUCT.IMPORT_AMENDMENT:
          applicationManager.getModulesPresentationController({ appName: 'TradeFinanceMA', moduleName: 'ImportLCUIModule' }).showImportLCScreen({ context: 'viewAmendment', data, form: this.view.id });
          break;
        case OLBConstants.TRADE_FINANCE_PRODUCT.EXPORT_LC:
          applicationManager.getModulesPresentationController({ appName: 'TradeFinanceMA', moduleName: 'ExportLCUIModule' }).showExportLCScreen({ context: 'viewExportLoC', data, form: this.view.id });
          break;
        case OLBConstants.TRADE_FINANCE_PRODUCT.EXPORT_DRAWING:
          applicationManager.getModulesPresentationController({ appName: 'TradeFinanceMA', moduleName: 'ExportLCUIModule' }).showExportLCScreen({ context: 'viewDrawing', data, form: this.view.id });
          break;
        case OLBConstants.TRADE_FINANCE_PRODUCT.EXPORT_AMENDMENT:
          applicationManager.getModulesPresentationController({ appName: 'TradeFinanceMA', moduleName: 'ExportLCUIModule' }).showExportLCScreen({ context: 'viewAmendment', data, form: this.view.id });
          break;
        case OLBConstants.TRADE_FINANCE_PRODUCT.ISSUED_GT_AND_SBLC:
          applicationManager.getModulesPresentationController({ appName: 'TradeFinanceMA', moduleName: 'GuaranteesUIModule' }).showGuaranteesScreen({ context: 'viewGuaranteeDetails', data, form: this.view.id });
          break;
        case OLBConstants.TRADE_FINANCE_PRODUCT.ISSUED_GT_AND_SBLC_AMENDMENT:
          applicationManager.getModulesPresentationController({ appName: 'TradeFinanceMA', moduleName: 'GuaranteesUIModule' }).showGuaranteesScreen({ context: 'viewAmendment', data, form: this.view.id });
          break;
        case OLBConstants.TRADE_FINANCE_PRODUCT.CLAIM_RECEIVED:
          applicationManager.getModulesPresentationController({ appName: 'TradeFinanceMA', moduleName: 'GuaranteesUIModule' }).showGuaranteesScreen({ context: 'viewClaimDetails', data, form: this.view.id });
          break;
        case OLBConstants.TRADE_FINANCE_PRODUCT.RECEIVED_GT_AND_SBLC:
          applicationManager.getModulesPresentationController({ appName: 'TradeFinanceMA', moduleName: 'GuaranteesReceivedUIModule' }).showGuaranteesReceivedScreen({ context: 'viewGuaranteeDetails', data, form: this.view.id });
          break;
        case OLBConstants.TRADE_FINANCE_PRODUCT.RECEIVED_GT_AND_SBLC_AMENDMENT:
          applicationManager.getModulesPresentationController({ appName: 'TradeFinanceMA', moduleName: 'GuaranteesReceivedUIModule' }).showGuaranteesReceivedScreen({ context: 'viewAmendment', data, form: this.view.id });
          break;
        case OLBConstants.TRADE_FINANCE_PRODUCT.CLAIM_INITIATED:
          applicationManager.getModulesPresentationController({ appName: 'TradeFinanceMA', moduleName: 'GuaranteesReceivedUIModule' }).showGuaranteesReceivedScreen({ context: 'viewClaimDetails', data, form: this.view.id });
          break;
        case OLBConstants.TRADE_FINANCE_PRODUCT.INWARD_COLLECTION:
          applicationManager.getModulesPresentationController({ appName: 'TradeFinanceMA', moduleName: 'InwardCollectionsUIModule' }).showInwardCollectionScreen({ context: 'viewCollectionDetails', data, form: this.view.id });
          break;
        case OLBConstants.TRADE_FINANCE_PRODUCT.INWARD_COLLECTION_AMENDMENT:
          applicationManager.getModulesPresentationController({ appName: 'TradeFinanceMA', moduleName: 'InwardCollectionsUIModule' }).showInwardCollectionScreen({ context: 'viewAmendmentDetails', data, form: this.view.id });
          break;
        case OLBConstants.TRADE_FINANCE_PRODUCT.OUTWARD_COLLECTION:
          applicationManager.getModulesPresentationController({ appName: 'TradeFinanceMA', moduleName: 'OutwardCollectionsUIModule' }).showOutwardCollectionScreen({ context: 'viewCollectionDetails', data, form: this.view.id });
          break;
        case OLBConstants.TRADE_FINANCE_PRODUCT.OUTWARD_COLLECTION_AMENDMENT:
          applicationManager.getModulesPresentationController({ appName: 'TradeFinanceMA', moduleName: 'OutwardCollectionsUIModule' }).showOutwardCollectionScreen({ context: 'amendViewDetails', data, form: this.view.id });
          break;
      }
    },
    setRPFilterValues: function () {
      contentPopupScope.segRPFilterList.widgetDataMap = {
        'lblIcon': 'lblIcon',
        'lblFilterValue': 'lblFilterValue',
        'lblHeading': 'lblHeading',
        'lblDropdownIcon': 'lblDropdownIcon',
        'flxMain': 'flxMain',
        'flxDropdown': 'flxDropdown'
      };
      const filterList = rpType === 'Receivables' ? presenter.dashboardConfig.receivableListFilters : presenter.dashboardConfig.payableListFilters;
      segRPFilterData = [];
      for (let i = 0; i < filterList.length; i++) {
        let rowData = [];
        for (let j = 0; j < filterList[i].filters.length; j++) {
          rowData.push({
            lblIcon: {
              text: presenter.resourcesConstants.fontIcons.checkboxSelected
            },
            lblFilterValue: {
              key: filterList[i].filters[j].key,
              text: filterList[i].filters[j].value
            }
          });
        }
        segRPFilterData.push([
          {
            lblHeading: {
              key: filterList[i].key,
              text: filterList[i].value,
              left: "5%"
            },
            lblDropdownIcon: {
              text: presenter.resourcesConstants.fontIcons.chevronUp,
              cursorType: 'pointer',
              top: "2dp"
            },
            flxMain: {
              top: "0dp"
            },
            flxDropdown: {
              right: "5%"
            }
          },
          rowData
        ]);
      }
      contentPopupScope.segRPFilterList.setData(segRPFilterData);
    },
    setListPopupContextualValues: function () {
      contentPopupScope.segRPContextualList.widgetDataMap = {
        'flxListDropdown': 'flxListDropdown',
        'lblListValue': 'lblListValue'
      };
      contentPopupScope.segNAContextualList.widgetDataMap = {
        'flxListDropdown': 'flxListDropdown',
        'lblListValue': 'lblListValue'
      };
      const segListContextualData = [
        {
          lblListValue: {
            text: kony.i18n.getLocalizedString("i18n.TradeFinance.ExportList"),
            toolTip: kony.i18n.getLocalizedString("i18n.TradeFinance.ExportList")
          },
          flxListDropdown: {
            onClick: this.exportList
          }
        }
      ];
      contentPopupScope.segRPContextualList.setData(segListContextualData);
      contentPopupScope.segNAContextualList.setData(segListContextualData);
    },
    exportList: function () {
      const segId = arguments[1].widgetInfo.id;
      let exportListPayload, type;
      if (segId === 'segRPContextualList') {
        contentPopupScope.flxRPContextualList.setVisibility(false);
        exportListPayload = JSON.parse(JSON.stringify(rpPayload));
        type = rpType;
      } else {
        contentPopupScope.flxNAContextualList.setVisibility(false);
        exportListPayload = JSON.parse(JSON.stringify(naPayload));
        type = 'AllTrade';
      }
      delete exportListPayload.pageOffset;
      delete exportListPayload.pageSize;
      presenter.generateList({ "payload": exportListPayload, "screenLoader": true, type, "formID": this.view.id });
    },
    setQuickLinks: function () {
      availableQL = Object.keys(presenter.dashboardConfig.quickLinks).filter(ql => selectedQL.indexOf(ql) === -1);
      contentScope.segQuickLinks.widgetDataMap = {
        'lblListValue': 'lblListValue'
      };
      let segQLData = [];
      for (const ql of selectedQL) {
        const link = presenter.dashboardConfig.quickLinks[ql];
        if (link.permission) {
          segQLData.push({
            lblListValue: {
              key: ql,
              text: link.text,
              skin: 'sknLbl4176A4SSP15Px'
            },
            template: 'flxListDropdown'
          });
        }
      }
      contentScope.segQuickLinks.setData(segQLData);
      this.setQuickLinkContextual();
    },
    setQuickLinkContextual: function () {
      contentScope.segContextualQL.widgetDataMap = {
        'lblIcon': 'lblIcon',
        'lblFilterValue': 'lblFilterValue',
        'lblHeading': 'lblHeading',
        'lblDropdownIcon': 'lblDropdownIcon',
        'flxMain': 'flxMain',
        'flxDropdown': 'flxDropdown'
      };
      const qlData = [selectedQL, availableQL];
      segContextualQLData = [];
      for (let i = 0; i < qlData.length; i++) {
        let rowData = [];
        for (let j = 0; j < qlData[i].length; j++) {
          const link = presenter.dashboardConfig.quickLinks[qlData[i][j]];
          if (link.permission) {
            rowData.push({
              lblIcon: {
                text: i === 0 ? presenter.resourcesConstants.fontIcons.checkboxSelected : presenter.resourcesConstants.fontIcons.checkboxUnselected
              },
              lblFilterValue: {
                key: qlData[i][j],
                text: link.text
              }
            });
          }
        }
        segContextualQLData.push([
          {
            lblHeading: {
              text: i === 0 ? `${kony.i18n.getLocalizedString('i18n.ProfileManagement.Selected')} (Max. ${presenter.dashboardConfig.quickLinksLimit})` : kony.i18n.getLocalizedString('i18n.TradeFinance.available'),
              left: "5%"
            },
            lblDropdownIcon: {
              text: presenter.resourcesConstants.fontIcons.chevronUp,
              cursorType: 'pointer',
              top: "2dp"
            },
            flxMain: {
              top: "0dp"
            },
            flxDropdown: {
              right: "5%"
            }
          },
          rowData
        ]);
      }
      contentScope.segContextualQL.setData(segContextualQLData);
    },
    applyQLContextual: function () {
      segContextualQLData = contentScope.segContextualQL.data;
      selectedQL = [];
      for (const ql of segContextualQLData[0][1]) {
        selectedQL.push(ql.lblFilterValue.key);
      }
      this.setQuickLinks();
      contentScope.flxContextualQL.setVisibility(false);
      contentScope.lblQuickLinksDropdownIcon.text = presenter.resourcesConstants.fontIcons.chevronDown;
      presenter.createorUpdateTFConfiguration({ "payload": { quickLink: JSON.stringify(selectedQL) }, "screenLoader": true, "formID": this.view.id });
    },
    handleQuickLinkNavigation: function () {
      const selectedLink = contentScope.segQuickLinks.selectedRowItems[0];
      switch (selectedLink.lblListValue.key) {
        case OLBConstants.TRADE_FINANCE_QUICK_LINK.IMPORT_LETTER_OF_CREDIT:
          presenter.navigationManager.navigateTo({ appName: "TradeFinanceMA", friendlyName: "ImportLCUIModule/frmImportLCDashboard" });
          break;
        case OLBConstants.TRADE_FINANCE_QUICK_LINK.IMPORT_DRAWINGS:
          presenter.navigationManager.navigateTo({ appName: "TradeFinanceMA", friendlyName: "ImportLCUIModule/frmImportLCDashboard" }, false, { isDrawingsBack: true });
          break;
        case OLBConstants.TRADE_FINANCE_QUICK_LINK.EXPORT_LETTER_OF_CREDIT:
          presenter.navigationManager.navigateTo({ appName: "TradeFinanceMA", friendlyName: "frmExportLCDashboard" }, false, { flowType: 'GetAllExportLettersOfCredit' });
          break;
        case OLBConstants.TRADE_FINANCE_QUICK_LINK.EXPORT_DRAWINGS:
          presenter.navigationManager.navigateTo({ appName: "TradeFinanceMA", friendlyName: "frmExportLCDashboard" }, false, { flowType: 'GetAllExportDrawings' });
          break;
        case OLBConstants.TRADE_FINANCE_QUICK_LINK.ISSUED_GUARANTEE_AND_SBLC:
          applicationManager.getModulesPresentationController({ appName: 'TradeFinanceMA', moduleName: 'GuaranteesUIModule' }).showGuaranteesScreen({ context: 'viewGuarantees' });
          break;
        case OLBConstants.TRADE_FINANCE_QUICK_LINK.CLAIMS_RECEIVED:
          applicationManager.getModulesPresentationController({ appName: 'TradeFinanceMA', moduleName: 'GuaranteesUIModule' }).showGuaranteesScreen({ context: 'viewAllReceivedClaims' });
          break;
        case OLBConstants.TRADE_FINANCE_QUICK_LINK.RECEIVED_GUARANTEE_AND_SBLC:
          applicationManager.getModulesPresentationController({ appName: 'TradeFinanceMA', moduleName: 'GuaranteesReceivedUIModule' }).showGuaranteesReceivedScreen({ context: 'viewAllReceivedGtAndSblc' });
          break;
        case OLBConstants.TRADE_FINANCE_QUICK_LINK.CLAIMS_INITIATED:
          applicationManager.getModulesPresentationController({ appName: 'TradeFinanceMA', moduleName: 'GuaranteesReceivedUIModule' }).showGuaranteesReceivedScreen({ context: 'viewAllInitiatedClaims' });
          break;
        case OLBConstants.TRADE_FINANCE_QUICK_LINK.INWARD_COLLECTIONS:
          presenter.showView({ form: "frmInwardCollectionsDashboardNew" });
          break;
        case OLBConstants.TRADE_FINANCE_QUICK_LINK.OUTWARD_COLLECTIONS:
          presenter.showView({ form: "OutwardCollectionsUIModule/frmOutwardCollectionDashboard" });
          break;
      }
    },
    setNeedAttentionValues: function () {
      availableNA = Object.keys(presenter.dashboardConfig.needAttention).filter(n => selectedNA.indexOf(n) === -1);
      contentScope.segNeedAttention.widgetDataMap = {
        'lblValue': 'lblValue',
        'lblCount': 'lblCount',
        'lblIcon': 'lblIcon'
      };
      let segNAData = [], countValue;
      for (const value of selectedNA) {
        countValue = (needAttentionData && needAttentionData[currencyCode]) ? String((needAttentionData[currencyCode][value] || '').length).padStart(2, '0') : '00';
        segNAData.push({
          lblIcon: presenter.dashboardConfig.needAttention[value].icon,
          lblValue: {
            key: value,
            text: presenter.dashboardConfig.needAttention[value].text,
            skin: countValue === '00' ? 'sknLblSSP72727215px' : 'sknLbl4176A4SSP15Px'
          },
          lblCount: countValue
        });
      }
      contentScope.segNeedAttention.setData(segNAData);
      this.setNeedAttentionContextual();
    },
    setNeedAttentionContextual: function () {
      contentScope.segContextualNA.widgetDataMap = {
        'lblIcon': 'lblIcon',
        'lblFilterValue': 'lblFilterValue',
        'lblHeading': 'lblHeading',
        'lblDropdownIcon': 'lblDropdownIcon',
        'flxMain': 'flxMain',
        'flxDropdown': 'flxDropdown'
      };
      const naData = [selectedNA, availableNA];
      segContextualNAData = [];
      for (let i = 0; i < naData.length; i++) {
        let rowData = [];
        for (let j = 0; j < naData[i].length; j++) {
          rowData.push({
            lblIcon: {
              text: i === 0 ? presenter.resourcesConstants.fontIcons.checkboxSelected : presenter.resourcesConstants.fontIcons.checkboxUnselected
            },
            lblFilterValue: {
              key: naData[i][j],
              text: presenter.dashboardConfig.needAttention[naData[i][j]].text
            }
          });
        }
        segContextualNAData.push([
          {
            lblHeading: {
              text: i === 0 ? `${kony.i18n.getLocalizedString('i18n.ProfileManagement.Selected')} (Max. ${presenter.dashboardConfig.needAttentionLimit})` : kony.i18n.getLocalizedString('i18n.TradeFinance.available'),
              left: "5%"
            },
            lblDropdownIcon: {
              text: presenter.resourcesConstants.fontIcons.chevronUp,
              cursorType: 'pointer',
              top: "2dp"
            },
            flxMain: {
              top: "0dp"
            },
            flxDropdown: {
              right: "5%"
            }
          },
          rowData
        ]);
      }
      contentScope.segContextualNA.setData(segContextualNAData);
    },
    applyNAContextual: function () {
      segContextualNAData = contentScope.segContextualNA.data;
      selectedNA = [];
      for (const naValue of segContextualNAData[0][1]) {
        selectedNA.push(naValue.lblFilterValue.key);
      }
      this.setNeedAttentionValues();
      contentScope.flxContextualNA.setVisibility(false);
      presenter.createorUpdateTFConfiguration({ "payload": { needAttention: JSON.stringify(selectedNA) }, "screenLoader": true, "formID": this.view.id });
    },
    onFilterSelection: function ({ segWidget, rowIndex, sectionIndex }) {
      if (segWidget === 'segRPFilterList') {
        let segData = JSON.parse(JSON.stringify(contentPopupScope[segWidget].data));
        if (rowIndex === 0) {
          if (segData[sectionIndex][1][rowIndex].lblIcon.text === presenter.resourcesConstants.fontIcons.checkboxUnselected) {
            segData[sectionIndex][1].forEach(record => record.lblIcon.text = presenter.resourcesConstants.fontIcons.checkboxSelected);
          } else {
            segData[sectionIndex][1].forEach(record => record.lblIcon.text = presenter.resourcesConstants.fontIcons.checkboxUnselected);
          }
        } else {
          if (segData[sectionIndex][1][rowIndex].lblIcon.text === presenter.resourcesConstants.fontIcons.checkboxUnselected) {
            segData[sectionIndex][1][rowIndex].lblIcon.text = presenter.resourcesConstants.fontIcons.checkboxSelected;
          } else {
            segData[sectionIndex][1][rowIndex].lblIcon.text = presenter.resourcesConstants.fontIcons.checkboxUnselected;
          }
          let filterCount = 1;
          for (let i = 1; i < segData[sectionIndex][1].length; i++) {
            if (segData[sectionIndex][1][i].lblIcon.text === presenter.resourcesConstants.fontIcons.checkboxSelected) filterCount++;
          }
          segData[sectionIndex][1][0].lblIcon.text = segData[sectionIndex][1].length === filterCount ? presenter.resourcesConstants.fontIcons.checkboxSelected : presenter.resourcesConstants.fontIcons.checkboxUnselected;
        }
        let filterCount = 0;
        for (let i = 0; i < segData.length; i++) {
          for (let j = 1; j < segData[i][1].length; j++) {
            if (segData[i][1][j].lblIcon.text === presenter.resourcesConstants.fontIcons.checkboxSelected) {
              filterCount++;
              break;
            }
          }
        }
        if (filterCount === 2) {
          contentPopupScope.btnRPFilterApply.skin = "ICSknbtnEnabed003e7536px";
          contentPopupScope.btnRPFilterApply.setEnabled(true);
        } else {
          contentPopupScope.btnRPFilterApply.skin = "ICSknbtnDisablede2e9f036px";
          contentPopupScope.btnRPFilterApply.setEnabled(false);
        }
        contentPopupScope[segWidget].removeAll();
        contentPopupScope[segWidget].setData(segData);
      } else {
        let segData = JSON.parse(JSON.stringify(contentScope[segWidget].data));
        if (sectionIndex === 0) {
          segData[0][1][rowIndex].lblIcon.text = presenter.resourcesConstants.fontIcons.checkboxUnselected;
          segData[1][1].splice(segData[1][1].length, 0, segData[0][1][rowIndex]);
          segData[0][1].splice(rowIndex, 1);
        } else {
          if (segWidget === 'segContextualQL' && segData[0][1].length >= presenter.dashboardConfig.quickLinksLimit) return;
          if (segWidget === 'segContextualNA' && segData[0][1].length >= presenter.dashboardConfig.needAttentionLimit) return;
          segData[sectionIndex][1][rowIndex].lblIcon.text = presenter.resourcesConstants.fontIcons.checkboxSelected;
          segData[0][1].splice(segData[0][1].length, 0, segData[1][1][rowIndex]);
          segData[1][1].splice(rowIndex, 1);
        }
        contentScope[segWidget].setData(segData);
        const btnApplyWidget = segWidget === 'segContextualQL' ? 'btnApplyQL' : 'btnApplyNA';
        if (segData[0][1].length === 0) {
          contentScope[btnApplyWidget].skin = "ICSknbtnDisablede2e9f036px";
          contentScope[btnApplyWidget].setEnabled(false);
        } else {
          contentScope[btnApplyWidget].skin = "ICSknbtnEnabed003e7536px";
          contentScope[btnApplyWidget].setEnabled(true);
        }
      }
    },
    toggleSectionHeader: function ({ sectionIndex, rowIndex, segmentId }) {
      let segmentData = {
        'segRPFilterList': segRPFilterData,
        'segContextualQL': segContextualQLData,
        'segContextualNA': segContextualNAData
      }[segmentId];
      let segWidgetPath = {
        'segRPFilterList': contentPopupScope[segmentId],
        'segContextualQL': contentScope[segmentId],
        'segContextualNA': contentScope[segmentId]
      }[segmentId];
      let newSegData = JSON.parse(JSON.stringify(segWidgetPath.data));
      if (newSegData[sectionIndex][0]['lblDropdownIcon']['text'] === presenter.resourcesConstants.fontIcons.chevronDown) {
        newSegData[sectionIndex][0]['lblDropdownIcon']['text'] = presenter.resourcesConstants.fontIcons.chevronUp;
        newSegData[sectionIndex][1] = segmentData[sectionIndex][1];
      } else {
        newSegData[sectionIndex][0]['lblDropdownIcon']['text'] = presenter.resourcesConstants.fontIcons.chevronDown;
        newSegData[sectionIndex][1] = [];
      }
      for (let i = 0; i < segmentData.length; i++) {
        if (newSegData[i][1].length > 0) {
          newSegData[i][1] = segmentData[i][1];
        }
      }
      segmentData[sectionIndex][0]['lblDropdownIcon']['text'] = newSegData[sectionIndex][0]['lblDropdownIcon']['text']
      segWidgetPath.setData(newSegData);
    },
    toggleRPSort: function (widget) {
      if (contentPopupScope[widget].src === ViewConstants.IMAGES.SORTING_PREVIOUS) {
        contentPopupScope[widget].src = ViewConstants.IMAGES.SORTING_NEXT;
        rpPayload.sortOrder = 'DESC';
      } else {
        contentPopupScope[widget].src = ViewConstants.IMAGES.SORTING_PREVIOUS;
        rpPayload.sortOrder = 'ASC';
      }
      for (const key in rpSortFields) {
        if (key === widget) continue;
        contentPopupScope[key].src = ViewConstants.IMAGES.SORT_FINAL_IMAGE;
      }
      rpPayload.pageOffset = contentPopupScope.RPPaginationContainer.getPageOffset();
      rpPayload.sortByParam = rpSortFields[widget];
      this.getRPData("sort");
    },
    applyRPFilters: function () {
      let filterByValue = [currencyCode];
      let filterByParam = ['tradeCurrency'];
      let selectedFilterCount = 0, totalFilterCount = 0;
      segRPFilterData = contentPopupScope.segRPFilterList.data;
      for (let i = 0; i < segRPFilterData.length; i++) {
        for (let j = 1; j < segRPFilterData[i][1].length; j++) {
          totalFilterCount++;
          if (segRPFilterData[i][1][j].lblIcon.text === presenter.resourcesConstants.fontIcons.checkboxSelected) {
            filterByValue.push(segRPFilterData[i][1][j].lblFilterValue.key);
            filterByParam.push(segRPFilterData[i][0].lblHeading.key);
            selectedFilterCount++;
          }
        }
      }
      if (selectedFilterCount === totalFilterCount) {
        contentPopupScope.lblRPSelectedFilter.text = kony.i18n.getLocalizedString("i18n.konybb.Common.All");
      } else {
        contentPopupScope.lblRPSelectedFilter.text = `${kony.i18n.getLocalizedString("i18n.ProfileManagement.Selected")} (${selectedFilterCount})`;
      }
      rpPayload.filterByValue = filterByValue.join(',');
      rpPayload.filterByParam = filterByParam.join(',');
      this.toggleDropdown(contentPopupScope.flxRPFilterList, contentPopupScope.lblRPFilterDropdown);
      this.getRPData();
    },
    setPaginationComponent: function (paginationInstance, pageHeader) {
      paginationInstance.setPageSize(10);
      paginationInstance.setLowerLimit(1);
      paginationInstance.setPageHeader(pageHeader);
      if (paginationInstance.id === 'RPPaginationContainer') {
        paginationInstance.setServiceDelegate(this.getRPData.bind(this, 'pagination'));
      } else {
        paginationInstance.setServiceDelegate(this.getNAData.bind(this, 'pagination'));
      }
      paginationInstance.setIntervalHeader();
    },
    constructNeedAttentionData: function (tradeDetails) {
      const todayDate = new Date();
      const weekBeforeDate = Date.parse(new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() - 7));
      needAttentionData = (tradeDetails || []).reduce(function (acc, obj) {
        if (!acc[obj.tradeCurrency]) acc[obj.tradeCurrency] = {};
        if (!acc[obj.tradeCurrency][obj.tradeStatus]) acc[obj.tradeCurrency][obj.tradeStatus] = [];
        if (obj.tradeStatus === OLBConstants.TRADE_FINANCE_NEED_ATTENTION.RECENTLY_COMPLETED || obj.tradeStatus === OLBConstants.TRADE_FINANCE_NEED_ATTENTION.RECENTLY_REJECTED) {
          if (Date.parse(obj.date) > weekBeforeDate) {
            acc[obj.tradeCurrency][obj.tradeStatus].push(obj);
          }
        } else {
          acc[obj.tradeCurrency][obj.tradeStatus].push(obj);
        }
        return acc;
      }, {});
      this.setNeedAttentionValues();
    },
    initialiseNAPopup: function () {
      const selectedNAData = contentScope.segNeedAttention.selectedRowItems[0];
      if (selectedNAData.lblCount === '00') return;
      contentPopupScope.text = `${selectedNAData.lblValue.key} (${selectedNAData.lblCount})`;
      naPayload = {
        searchString: '',
        pageSize: '11',
        pageOffset: '0',
        sortByParam: 'date',
        sortOrder: 'DESC',
        timeParam: '',
        timeValue: '',
        filterByValue: `${selectedNAData.lblValue.key},${currencyCode}`,
        filterByParam: 'tradeStatus,tradeCurrency'
      };
      if (selectedNAData.lblValue.key === OLBConstants.TRADE_FINANCE_NEED_ATTENTION.RECENTLY_COMPLETED || selectedNAData.lblValue.key === OLBConstants.TRADE_FINANCE_NEED_ATTENTION.RECENTLY_REJECTED) {
        naPayload['timeParam'] = 'date';
        naPayload['timeValue'] = '7,DAY';
        contentPopupScope.lblNAListingHeading.text = `${selectedNAData.lblValue.key} - for last 7 days (${selectedNAData.lblCount})`;
      } else {
        contentPopupScope.lblNAListingHeading.text = `${selectedNAData.lblValue.key} (${selectedNAData.lblCount})`;
      }
      naSortFields = {
        imgNASortColumn1: 'product',
        imgNASortColumn2: 'transactionReference',
        imgNASortColumn3: 'date',
        imgNASortColumn4: 'amount'
      };
      contentPopupScope.flxNASearch.tbxNASearch.text = '';
      contentPopupScope.flxNAContextualList.setVisibility(false);
      for (const key in naSortFields) {
        contentPopupScope[key].src = ViewConstants.IMAGES.SORT_FINAL_IMAGE;
      }
      contentPopupScope['imgNASortColumn3'].src = ViewConstants.IMAGES.SORTING_NEXT;
      this.setPaginationComponent(contentPopupScope.NAPaginationContainer, kony.i18n.getLocalizedString('i18n.ExportLC.Records'));
      this.togglePopup('flxNAListingPopup', true);
      this.getNAData();
    },
    toggleNASort: function (widget) {
      if (contentPopupScope[widget].src === ViewConstants.IMAGES.SORTING_PREVIOUS) {
        contentPopupScope[widget].src = ViewConstants.IMAGES.SORTING_NEXT;
        naPayload.sortOrder = 'DESC';
      } else {
        contentPopupScope[widget].src = ViewConstants.IMAGES.SORTING_PREVIOUS;
        naPayload.sortOrder = 'ASC';
      }
      for (const key in naSortFields) {
        if (key === widget) continue;
        contentPopupScope[key].src = ViewConstants.IMAGES.SORT_FINAL_IMAGE;
      }
      naPayload.pageOffset = contentPopupScope.NAPaginationContainer.getPageOffset();
      naPayload.sortByParam = naSortFields[widget];
      this.getNAData("sort");
    },
    getNAData: function (params) {
      if (params !== 'pagination' && params !== "sort") {
        contentPopupScope.NAPaginationContainer.setLowerLimit(1);
        contentPopupScope.NAPaginationContainer.setPageSize(10);
        contentPopupScope.NAPaginationContainer.setIntervalHeader();
      }
      naPayload.searchString = contentPopupScope.flxNASearch.tbxNASearch.text;
      naPayload.pageOffset = (params === "pagination" || params === "sort") ? contentPopupScope.NAPaginationContainer.getPageOffset() : 0;
      presenter.getAllTradeDetails({ "payload": naPayload, "screenLoader": true, "formID": this.view.id });
    },
    setNAData: function (tradeData) {
      contentPopupScope.flxNAListingContainer.width = breakpoint > 1024 ? "69%" : "95%";
      if (tradeData && tradeData.length > 0) {
        contentPopupScope.flxNAListingContextual.setVisibility(true);
        contentPopupScope.flxNAListing.setVisibility(true);
        contentPopupScope.flxNAPagination.setVisibility(true);
        contentPopupScope.flxNANoRecords.setVisibility(false);
      } else {
        contentPopupScope.flxNAListingContextual.setVisibility(false);
        contentPopupScope.flxNAListing.setVisibility(false);
        contentPopupScope.flxNAPagination.setVisibility(false);
        contentPopupScope.flxNANoRecords.setVisibility(true);
        return;
      }
      const offset = contentPopupScope.NAPaginationContainer.getPageOffset();
      if (offset === 0) {
        contentPopupScope.NAPaginationContainer.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_INACTIVE;
      } else {
        contentPopupScope.NAPaginationContainer.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_ACTIVE;
      }
      if (tradeData.length > 10) {
        contentPopupScope.NAPaginationContainer.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_ACTIVE;
      } else {
        contentPopupScope.NAPaginationContainer.imgPaginationNext.src = ViewConstants.IMAGES.PAGINATION_NEXT_INACTIVE;
      }
      contentPopupScope.NAPaginationContainer.imgPaginationPrevious.imageScaleMode = constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS;
      contentPopupScope.NAPaginationContainer.imgPaginationNext.imageScaleMode = constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS;
      contentPopupScope.segNAListing.widgetDataMap = {
        'lblColumn1': 'lblColumn1',
        'lblColumn2': 'lblColumn2',
        'lblColumn3': 'lblColumn3',
        'lblColumn4': 'lblColumn4',
        'lblColumn4': 'lblColumn4',
        'btnAction': 'btnAction'
      };
      let segNAListingData = [];
      tradeData = tradeData.slice(0, 10);
      for (const data of tradeData) {
        segNAListingData.push({
          'lblColumn1': data.product || NA,
          'lblColumn2': data.transactionReference || NA,
          'lblColumn3': data.date ? presenter.formatUtilManager.getFormattedCalendarDate(data.date) : NA,
          'lblColumn4': data.amount ? `${currencySymbol}${presenter.formatUtilManager.formatAmount(presenter.formatUtilManager.deFormatAmount(data.amount) || 0)}` : NA,
          'btnAction': {
            'text': kony.i18n.getLocalizedString('i18n.TradeFinance.View'),
            'toolTip': kony.i18n.getLocalizedString('i18n.TradeFinance.View'),
            'onClick': this.viewRecordDetails.bind(this, data)
          }
        });
      }
      contentPopupScope.segNAListing.setData(segNAListingData);
    },
    getAccountsData: function () {
      const recentlyUpdatedAccounts = (presenter.accountManager.getInternalAccounts() || []).filter(acc => presenter.dashboardConfig.accountTypes.includes(acc.accountType));
      accountsData = recentlyUpdatedAccounts.reduce(function (acc, obj) {
        if (!acc[obj.currencyCode]) {
          acc[obj.currencyCode] = {
            'totalBalance': 0,
            'accounts': []
          };
        }
        acc[obj.currencyCode]['totalBalance'] += parseFloat(obj.availableBalance || 0);
        acc[obj.currencyCode]['accounts'].push({
          accountName: CommonUtilities.getAccountDisplayName(obj),
          accountType: obj.accountType,
          availableBalance: presenter.formatUtilManager.formatAmountandAppendCurrencySymbol(obj.availableBalance, obj.currencyCode)
        });
        return acc;
      }, {});
    },
    setAccountsData: function () {
      if (!currencyCode) {
        currencyCode = Object.keys(presenter.dashboardConfig.currencies)[0];
      }
      contentScope.segAccountsListing.widgetDataMap = {
        'lblAccountName': 'lblAccountName',
        'lblAccountType': 'lblAccountType',
        'lblAvailableBalance': 'lblAvailableBalance'
      };
      contentScope.lblAvailableAmount.text = `${currencySymbol} ${presenter.formatUtilManager.formatAmount(accountsData[currencyCode] ? accountsData[currencyCode]['totalBalance'] : 0)}`;
      const accountRecords = accountsData[currencyCode] ? accountsData[currencyCode]['accounts'].slice(0, presenter.dashboardConfig.accountsLimit) : [];
      contentScope.btnViewAllAccounts.text = `${kony.i18n.getLocalizedString("i18n.common.viewAll")} (${accountRecords.length})`;
      let segAccountData = [];
      accountRecords.forEach(record => {
        segAccountData.push({
          lblAccountName: record.accountName,
          lblAccountType: record.accountType,
          lblAvailableBalance: record.availableBalance
        });
      });
      contentScope.segAccountsListing.setData(segAccountData);
      contentScope.flxAccounts.height = `${150 + (70 * segAccountData.length)}dp`;
      this.handleWidgetAlignment();
    },
    renderEditCurrencyList: function () {
      if (contentScope.flxCurrencyContexualDropdown.isVisible) {
        contentScope.flxCurrencyContexualDropdown.setVisibility(false);
      } else {
        this.setEREditCurrencyMenu(contentScope.segSelectedCurrenciesList, []);
        this.setEREditCurrencyMenu(contentScope.segAvailableCurrenciesList, []);
        contentScope.flxCurrencyContexualDropdown.setVisibility(true);
      }
    },
    renderFromToCurrencyList: function (widgetID) {
      contentScope.lblClear.setVisibility(contentScope.txtSearch.length > 0);
      if (contentScope.flxCurrencyListDropdown.isVisible) {
        isDropdownRendered = false;
        contentScope.flxCurrencyListDropdown.setVisibility(false);
      } else {
        presenter.fetchDropdownCurrencyList({ "payload": { "baseCurrencyCode": baseCurrencyCode }, "screenLoader": false, "formID": this.view.id });
        selectedTextBox = widgetID;
        contentScope.flxCurrencyListDropdown.left = widgetID.id === 'txtToCurrency' ? '22%' : '5%';
        isDropdownRendered = true;
        contentScope.flxCurrencyListDropdown.setVisibility(true)
        presenter.updateRecentCurrencies({ "payload": { "quoteCurrencyCode": contentScope.txtToCurrency.text }, "screenLoader": false, "formID": this.view.id });
      }
    },
    populateExchangeRates: function (selectedCurrency) {
      contentScope.lblExchangeRatesRefreshedTime.text = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
      contentScope.segExchangeRates.widgetDataMap = {
        'flxCrop': 'flxCrop',
        'imgCurrency': 'imgCurrency',
        'lblCurrencyShort': 'lblCurrencyShort',
        'lblCurrencyWithCountry': 'lblCurrencyWithCountry',
        'lblBuyValue': 'lblBuyValue',
        'lblSellValue': 'lblSellValue'
      };
      let data = [], segData = [], dataLimit = presenter.dashboardConfig.exchangeRatesLimit;
      data = exchangeRatesList.map(item => ({
        ...item.markets.filter(m => m.market === 'Currency')[0],
        code: item.code,
        name: item.name
      }));
      if (selectedCurrency.length === 0) {
        data = data.filter(item => recentERCurrencies.includes(item.code));
      } else {
        data = data.filter(item => item.code === selectedCurrency);
        dataLimit = 1;
      }
      for (let d = 0; d < dataLimit; d++) {
        segData.push({
          flxCrop: {
            skin: presenter.flagsWithoutOutline.includes(data[d].code.toLowerCase()) ? 'sknFlxffffffBorderd9d9d9Radius4px' : 'sknFlxffffffBorderffffffRadius4px'
          },
          imgCurrency: {
            src: 'spritesheet.png',
            left: (ViewConstants.CURRENCY_MAP[data[d].code.toLowerCase()] && ViewConstants.CURRENCY_MAP[data[d].code.toLowerCase()].left) || '-5px',
            top: (ViewConstants.CURRENCY_MAP[data[d].code.toLowerCase()] && ViewConstants.CURRENCY_MAP[data[d].code.toLowerCase()].top) || '-5px',
          },
          lblCurrencyShort: data[d].code,
          lblCurrencyWithCountry: data[d].name,
          lblBuyValue: parseFloat(data[d].buyRate).toFixed(2),
          lblSellValue: parseFloat(data[d].sellRate).toFixed(2),
        });
      }
      contentScope.segExchangeRates.setData(segData)
      presenter.updateRecentCurrencies({ "payload": { "quoteCurrencyCode": contentScope.txtToCurrency.text }, "screenLoader": false, "formID": this.view.id });
    },
    populateFromToCurrencyList: function (segType, filteredData) {
      const baseERCurrency = selectedTextBox.id === 'txtFromCurrency' ? contentScope.txtToCurrency.text : contentScope.txtFromCurrency.text;
      if (dropdownCurrenciesList.length === 0) return [];
      var currencyData = [];
      var currencyList = [];
      let segData = [];
      let allERCurrencies = [];
      segType.rowTemplate = 'flxERCurrency';
      segType.widgetDataMap = {
        'flxCrop': 'flxCrop',
        'imgCurrency': 'imgCurrency',
        'lblERCheckbox': 'lblERCheckbox',
        'lblERCurrency': 'lblERCurrency'
      };
      //filtered data contains the data that's searched for
      if (filteredData.length > 0) {
        filteredData = this.removeDuplicateValues(filteredData);
        currencyData = filteredData;
        contentScope.segAllCurrency.setVisibility(false);
        contentScope.lblRecentlyUsed.setVisibility(false);
        contentScope.lblAllCurrency.setVisibility(false);
      } else {
        currencyList = dropdownCurrenciesList.filter(item => item.code !== baseERCurrency);
        for (var j = 2; j < currencyList.length; j++) {
          allERCurrencies.push(currencyList[j]);
        };
        allERCurrencies = this.removeDuplicateValues(allERCurrencies);
        switch (segType.id) {
          case 'segRecentlyUsed':
            for (var i = 0; i < 2; i++) {
              currencyData.push(currencyList[i]);
            };
            break;
          case 'segAllCurrency':
            currencyData = allERCurrencies;
            break;
        }
        contentScope.segAllCurrency.setVisibility(true);
        contentScope.lblRecentlyUsed.setVisibility(true);
        contentScope.lblAllCurrency.setVisibility(true);
      }
      for (let i = 0; i < currencyData.length; i++) {
        segData.push({
          lblERCheckbox: {
            isVisible: false
          },
          flxCrop: {
            skin: presenter.flagsWithoutOutline.includes(currencyData[i].code.toLowerCase()) ? 'sknFlxffffffBorderd9d9d9Radius4px' : 'sknFlxffffffBorderffffffRadius4px'
          },
          imgCurrency: {
            src: 'spritesheet.png',
            left: (ViewConstants.CURRENCY_MAP[currencyData[i].code.toLowerCase()] && ViewConstants.CURRENCY_MAP[currencyData[i].code.toLowerCase()].left) || '-5px',
            top: (ViewConstants.CURRENCY_MAP[currencyData[i].code.toLowerCase()] && ViewConstants.CURRENCY_MAP[currencyData[i].code.toLowerCase()].top) || '-5px'
          },
          lblERCurrency: {
            text: currencyData[i].code + ' - ' + currencyData[i].name
          }
        });
      }
      segType.setData(segData);
    },
    setSelectedCurrency: function (segID) {
      if (segID.selectedRowItems.length > 0) {
        const selectedData = segID.selectedRowItems[0];
        selectedTextBox.text = selectedData.lblERCurrency.text.substr(0, 3);
        isDropdownRendered = false;
        contentScope.flxCurrencyListDropdown.setVisibility(false);
        if (selectedTextBox.id === 'txtFromCurrency') {
          presenter.fetchDropdownCurrencyList({
            "payload": {
              "baseCurrencyCode": selectedTextBox.text
            }, "screenLoader": false, "formID": this.view.id
          });
        }
        else this.populateExchangeRates(selectedTextBox.text);
      }
    },
    searchERCurrency: function (widget) {
      var segEachData = [];
      var currencyListtemp = dropdownCurrenciesList;
      let searchQuery = widget.text;
      if (searchQuery.length > 0) {
        for (var i = 0; i < currencyListtemp.length; i++) {
          if (typeof (currencyListtemp[i]["code"]) === "string" || typeof (currencyListtemp[i]["name"]) === "string") {
            if ((!kony.sdk.isNullOrUndefined(currencyListtemp[i]["code"]) && currencyListtemp[i]["code"].toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1) || (!kony.sdk.isNullOrUndefined(currencyListtemp[i]["name"]) && currencyListtemp[i]["name"].toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1)) {
              segEachData.push(currencyListtemp[i]);
            }
          }
        }
        if (widget.id === 'txtSearch')
          this.populateFromToCurrencyList(contentScope.segRecentlyUsed, segEachData);
        else
          this.setEREditCurrencyMenu(contentScope.segAvailableCurrenciesList, segEachData);
      } else {
        if (widget.id === 'txtSearch') {
          this.populateFromToCurrencyList(contentScope.segRecentlyUsed, []);
          this.populateFromToCurrencyList(contentScope.segAllCurrency, []);
        } else {
          this.setEREditCurrencyMenu(contentScope.segAvailableCurrenciesList, '');
        }
      }
    },
    setRecentERCurrencies: function () {
      contentScope.flxCurrencyListDropdown.setVisibility(false);
      let data = dropdownCurrenciesList.filter(item => item.code !== baseCurrencyCode);
      recentERCurrencies = data.slice(0, 5).map(item => item.code);
      presenter.fetchCurrencyRates({
        "payload": {
          "baseCurrencyCode": baseCurrencyCode,
          "market": "10 1",
          "companyCode": applicationManager.getUserPreferencesManager().getCompanyId(),
        }, "screenLoader": false, "formID": this.view.id
      });
    },
    setEREditCurrencyMenu: function (segType, filteredData) {
      let allERCurrencies = [];
      let segData = [];
      let currencyData = [];
      segType.rowTemplate = 'flxERCurrency';
      segType.widgetDataMap = {
        'flxCrop': 'flxCrop',
        'imgCurrency': 'imgCurrency',
        'lblERCheckbox': 'lblERCheckbox',
        'lblERCurrency': 'lblERCurrency'
      };
      if (filteredData.length > 0) {
        currencyData = filteredData;
      } else {
        if (segType.id === 'segSelectedCurrenciesList') {
          currencyData = dropdownCurrenciesList.filter(item => recentERCurrencies.includes(item.code));
          currencyData = this.removeDuplicateValues(currencyData);
        } else {
          for (var j = 2; j < dropdownCurrenciesList.length; j++) {
            allERCurrencies.push(dropdownCurrenciesList[j]);
          };
          allERCurrencies = allERCurrencies.filter(item => !recentERCurrencies.includes(item.code));
          currencyData = this.removeDuplicateValues(allERCurrencies);
        }
      }
      for (i = 0; i < currencyData.length; i++) {
        segData.push({
          lblERCheckbox: {
            isVisible: true,
            text: segType.id === 'segSelectedCurrenciesList' ? presenter.resourcesConstants.fontIcons.checkboxSelected : presenter.resourcesConstants.fontIcons.checkboxUnselected,
            onTouchStart: this.filterERCurrency.bind(this, segType, i)
          },
          flxCrop: {
            skin: presenter.flagsWithoutOutline.includes(currencyData[i].code.toLowerCase()) ? 'sknFlxffffffBorderd9d9d9Radius4px' : 'sknFlxffffffBorderffffffRadius4px'
          },
          imgCurrency: {
            src: "spritesheet.png",
            left: (ViewConstants.CURRENCY_MAP[currencyData[i].code.toLowerCase()] && ViewConstants.CURRENCY_MAP[currencyData[i].code.toLowerCase()].left) || '-5px',
            top: (ViewConstants.CURRENCY_MAP[currencyData[i].code.toLowerCase()] && ViewConstants.CURRENCY_MAP[currencyData[i].code.toLowerCase()].top) || '-5px'
          },
          lblERCurrency: {
            text: currencyData[i].code + ' - ' + currencyData[i].name
          }
        });
      }
      segType.setData(segData);
    },
    filterERCurrency: function (segType, index) {
      var data = segType.data;
      if (data[index].lblERCheckbox.text === presenter.resourcesConstants.fontIcons.checkboxUnselected) {
        data[index].lblERCheckbox.text = presenter.resourcesConstants.fontIcons.checkboxSelected;
      } else {
        data[index].lblERCheckbox.text = presenter.resourcesConstants.fontIcons.checkboxUnselected;
      }
      segType.setData(data);
    },
    applyERContextual: function () {
      let data = [];
      data = contentScope.segSelectedCurrenciesList.data.filter(item => item.lblERCheckbox.text === presenter.resourcesConstants.fontIcons.checkboxSelected);
      data = data.concat(contentScope.segAvailableCurrenciesList.data.filter(item => item.lblERCheckbox.text === presenter.resourcesConstants.fontIcons.checkboxSelected));
      if (data.length <= 5) {
        recentERCurrencies = data.map(item => item.lblERCurrency.text.substr(0, 3));
        this.populateExchangeRates('');
        contentScope.flxCurrencyContexualDropdown.setVisibility(false);
      }
    },
    removeDuplicateValues: function (arr) {
      var filteredArr = arr.filter((item, index, self) => index === self.findIndex(t => t.code === item.code));
      return filteredArr;
    },
    refreshExchangeRates: function () {
      contentScope.flxCurrencyContexualDropdown.setVisibility(false);
      presenter.fetchBaseCurrency({
        "payload": {
          "CountryCode": " ",
          "companyCode": applicationManager.getUserPreferencesManager().getCompanyId(),
          "market": "10 1"
        }, "screenLoader": false, "formID": this.view.id
      });
      presenter.updateRecentCurrencies({ "payload": { "quoteCurrencyCode": contentScope.txtToCurrency.text }, "screenLoader": false, "formID": this.view.id });
      contentScope.txtToCurrency.text = '';
      contentScope.lblExchangeRatesRefreshedTime.text = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    },
    resetCurrencies: function () {
      let data = contentScope.segSelectedCurrenciesList.data;
      data = data.map(obj => ({ ...obj, lblERCheckbox: { ...obj.lblERCheckbox, text: presenter.resourcesConstants.fontIcons.checkboxSelected } }));
      contentScope.segSelectedCurrenciesList.setData(data);
      data = contentScope.segAvailableCurrenciesList.data;
      data = data.map(obj => ({ ...obj, lblERCheckbox: { ...obj.lblERCheckbox, text: presenter.resourcesConstants.fontIcons.checkboxUnselected } }));
      contentScope.segAvailableCurrenciesList.setData(data);
    },
    initialiseBarCharts: function () {
      const options = {
        title: '',
        height: 300,
        width: (breakpoint === 640) ? 380 : (breakpoint === 1024) ? 800 : 800,
        legend: {
          position: 'none'
        },
        isStacked: true,
        bar: {
          groupWidth: "45%"
        },
        hAxis: {
          gridlines: {
            color: "#F6F6F6"
          },
          viewWindow: {
            min: 0
          },
          format: "short"
        },
        chartArea: {
          left: 80
        }
      };
      let limitsBarChart = new kony.ui.CustomWidget({
        "id": "limitsBarChart",
        "isVisible": true,
        "width": "100%",
        "height": "100%",
        "zIndex": 1
      }, {
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {
        "widgetName": "HorizontalBarChart",
        "chartData": [],
        "chartProperties": Object.assign({
          widgetId: 'stacked_barChart_div3'
        }, options),
        "OnClickOfBar": function () { }
      });
      contentScope.flxLimitsChartArea.add(limitsBarChart);
    },
    toggleERFilter: function (segId, widgetId) {
      if (widgetId.text === presenter.resourcesConstants.fontIcons.chevronUp) {
        segId.setVisibility(false);
        if (segId.id === 'segAvailableCurrenciesList') contentScope.flxSearchAvailableCurrencies.setVisibility(false);
        widgetId.text = presenter.resourcesConstants.fontIcons.chevronDown;
      } else {
        segId.setVisibility(true);
        widgetId.text = presenter.resourcesConstants.fontIcons.chevronUp;
      }
    },
    handleWidgetAlignment: function () {
      if (breakpoint > 1024) {
        contentScope.flxExchangeRates.top = `${40 + parseFloat(contentScope.flxNeedAttention.height) + parseFloat(contentScope.flxAccounts.height)}dp`;
        contentScope.flxLimits.top = '890dp';
      } else {
        contentScope.flxExchangeRates.top = '890dp';
        contentScope.flxLimits.top = `${20 + parseFloat(contentScope.flxAccounts.top) + parseFloat(contentScope.flxAccounts.height)}dp`;
      }
    },
    /**
     * Error thrown from catch block of form controller
     */
    onError: function (err) {
      kony.print(JSON.stringify(err));
    }
  };
});