define(["ViewConstants", "CommonUtilities", "TradeLendingUtils"], function (ViewConstants, CommonUtilities, TLUtils) {
  const fontIcons = {
    'chevronUp': 'P',
    'chevronDown': 'O',
    'radioSelected': 'M',
    'radioUnselected': 'L'
  },
    skins = {
      'pageEnabled': 'sknOLBFonts003e7512px',
      'pageDisabled': 'sknLblFontTypeIcona0a0a012px',
      'radioSelected': 'ICSknLblRadioBtnSelectedFontIcon003e7520px',
      'radioUnselected': 'ICSknLblRadioBtnUnelectedFontIcona0a0a020px',
    },
    images = {
      'sortAsc': ViewConstants.IMAGES.SORT_PREV_IMAGE,
      'sortDesc': ViewConstants.IMAGES.SORT_NEXT_IMAGE,
      'noSort': ViewConstants.IMAGES.SORT_FINAL_IMAGE
    },
    NA = kony.i18n.getLocalizedString('i18n.common.NA'),
    all = kony.i18n.getLocalizedString('i18n.konybb.Common.All');
  let scope, presenter, contentScope, popupScope, breakpoint,
    balancesData, balanceSegmentData, balanceDropdownSegmentData, myLoansData, upcomingMaturityData, upcomingPaymentsData,
    totalPages, currentPage, isSearchApplied, previousIndex, searchCriteria, tagsData, currDate,
    listData, listParams = {
      'sortByParam': "",
      'sortOrder': ""
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
      this.view.onTouchEnd = function () {
        kony.timer.schedule("touchEndTimer", TLUtils.hideSubscribedWidgetsIfVisible, 0.1, false);
      };
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
        ['flxBalances', 'flxList'].forEach(w => contentScope[w].width = "66%");
        ['flxQuickLinks', 'flxMyLoans'].forEach(w => contentScope[w].width = "32%");
        contentScope.flxMyLoans.left = "";
        contentScope.flxMyLoans.right = "0dp";
      } else {
        ['flxBalances', 'flxList'].forEach(w => contentScope[w].width = "100%");
        ['flxQuickLinks', 'flxMyLoans'].forEach(w => contentScope[w].width = "48.2%");
        contentScope.flxMyLoans.left = "0dp";
        contentScope.flxMyLoans.right = "";
      }
      contentScope.forceLayout();
    },
    /**
     * Performs the actions required before rendering form.
     */
    preShow: function () {
      popupScope.flxAdvancedSearch.doLayout = CommonUtilities.centerPopupFlex;
      TLUtils.subscribeToTouchEnd([
        popupScope.DropdownASF1T1,
        popupScope.DropdownASF1T2,
        popupScope.DropdownASF1T3,
        popupScope.DropdownASF2T1,
        popupScope.DropdownASF2T2,
        popupScope.DropdownASF2T3,
        popupScope.DropdownASF3T1,
        popupScope.DropdownASF3T2,
        popupScope.DropdownASF3T3,
        popupScope.DropdownASF4T1,
        popupScope.DropdownASF4T3,
        popupScope.DropdownASF5T1,
        popupScope.DropdownASF7T1
      ]);
    },
    /**
     * Performs the actions required after rendering form.
     */
    postShow: function () {
      applicationManager.getNavigationManager().applyUpdates(this);
      this.resetForm();
    },
    /**
     * Method to initialise form actions.
     */
    initFormActions: function () {
      scope = this;
      currDate = new Date();
      currDate.setHours(0, 0, 0, 0);
      presenter = applicationManager.getModulesPresentationController({
        'appName': 'TradeLendingMA',
        'moduleName': 'LendingDashboardUIModule'
      });
      contentScope = this.view.formTemplate12.flxContentTCCenter;
      popupScope = this.view.formTemplate12.flxContentPopup;
      [
        contentScope.flxDropdownBL,
        contentScope.flxClearSearchBL,
        contentScope.flxDealRadio,
        contentScope.flxFacilityRadio,
        contentScope.flxPageStart,
        contentScope.flxPagePrevious,
        contentScope.flxPageNext,
        contentScope.flxPageEnd,
        contentScope.flxQL1,
        contentScope.flxQL3,
        contentScope.flxQL2,
        popupScope.flxASClose,
        contentScope.flxASRAction1,
        contentScope.flxASRAction2
      ].forEach(w => w.cursorType = 'pointer');
      contentScope.btnTab1.toolTip = kony.i18n.getLocalizedString('i18n.TradeLending.myLoans');
      contentScope.btnTab2.toolTip = kony.i18n.getLocalizedString('i18n.TradeLending.upcomingMaturity');
      contentScope.btnTab3.toolTip = kony.i18n.getLocalizedString('i18n.SBAdvisory.upcomingPayments');
      contentScope.lblQL1.toolTip = kony.i18n.getLocalizedString('i18n.TradeLending.drawdownRequest');
      contentScope.lblQL2.toolTip = kony.i18n.getLocalizedString('i18n.AccountsDetails.PAYMENTS');
      contentScope.lblQL3.toolTip = kony.i18n.getLocalizedString('i18n.TradeLending.rolloverRequest');
      contentScope.flxDropdownBL.onClick = this.toggleBalancesDropdown;
      contentScope.flxDealRadio.onClick = this.toggleDealFacilityRadio.bind(this, 'deal');
      contentScope.flxFacilityRadio.onClick = this.toggleDealFacilityRadio.bind(this, 'facility');
      contentScope.btnCancel.onClick = this.toggleBalancesDropdown;
      contentScope.btnApply.onClick = this.handleBalanceDropdownSelection;
      contentScope.tbxSearchBL.onTextChange = () => contentScope.flxClearSearchBL.setVisibility(!!contentScope.tbxSearchBL.text);
      contentScope.tbxSearchBL.onKeyUp = this.searchBalances;
      contentScope.flxClearSearchBL.onClick = () => {
        contentScope.tbxSearchBL.text = '';
        contentScope.flxClearSearchBL.setVisibility(false);
        scope.searchBalances();
      };
      contentScope.btnTab1.onClick = () => {
        contentScope.flxLoadingList.setVisibility(true);
        contentScope.flxContainerList.setVisibility(false);
        presenter.getMyLoans(scope.view.id);
      };
      contentScope.btnTab2.onClick = () => {
        contentScope.flxLoadingList.setVisibility(true);
        contentScope.flxContainerList.setVisibility(false);
        presenter.getUpcomingMaturityLoans(scope.view.id);
      };
      contentScope.btnTab3.onClick = () => {
        contentScope.flxLoadingList.setVisibility(true);
        contentScope.flxContainerList.setVisibility(false);
        presenter.getUpcomingLoanPayments(scope.view.id);
      };
      contentScope.flxPageStart.onClick = this.applyPagination.bind(this, 'start');
      contentScope.flxPagePrevious.onClick = this.applyPagination.bind(this, 'previous');
      contentScope.flxPageNext.onClick = this.applyPagination.bind(this, 'next');
      contentScope.flxPageEnd.onClick = this.applyPagination.bind(this, 'end');
      contentScope.btnAdvancedSearch.onClick = () => scope.toggleAdvancedSearchPopup(true);
      popupScope.flxASClose.onClick = () => scope.toggleAdvancedSearchPopup(false);
      popupScope.btnASAction1.onClick = () => scope.toggleAdvancedSearchPopup(false);
      popupScope.btnASAction2.onClick = this.applyAdvancedSearch;
      contentScope.flxContainerBL.doLayout = this.alignWidgets;
      contentScope.flxASRAction1.onClick = () => scope.toggleAdvancedSearchPopup(true);
      contentScope.flxASRAction2.onClick = () => {
        isSearchApplied = false;
        listData = {
          1: myLoansData,
          2: upcomingMaturityData,
          3: upcomingPaymentsData
        }[tabSelected] || [];
        totalPages = Math.ceil(listData.length / 10);
        currentPage = totalPages === 0 ? 0 : 1;
        contentScope.flxListSearchContainer.setVisibility(true);
        contentScope.flxListSearchResults.setVisibility(false);
        scope.setPagination();
        scope.sortRecords();
      };
      popupScope.cal1ASF6T1.onSelection = () => scope.enableStartDate(popupScope.cal1ASF6T1, popupScope.cal2ASF6T1);
      popupScope.cal1ASF8T1.onSelection = () => scope.enableStartDate(popupScope.cal1ASF8T1, popupScope.cal2ASF8T1);
      popupScope.cal1ASF4T2.onSelection = () => scope.enableStartDate(popupScope.cal1ASF4T2, popupScope.cal2ASF4T2);
      popupScope.cal1ASF5T3.onSelection = () => scope.enableStartDate(popupScope.cal1ASF5T3, popupScope.cal2ASF5T3);
      contentScope.flxQL3.onClick = () => presenter.loadScreenWithContext({
        'context': 'rolloverRequest'
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
      if (viewModel.balances) {
        balancesData = viewModel.balances;
        this.setBalancesDropdownData();
      }
      if (viewModel.myLoans) {
        myLoansData = viewModel.myLoans;
        this.setDropdownData(1);
        this.setListTab(1);
        this.setMyLoansChart();
      }
      if (viewModel.upcomingMaturity) {
        upcomingMaturityData = viewModel.upcomingMaturity;
        this.setDropdownData(2);
        this.setListTab(2);
      }
      if (viewModel.upcomingPayments) {
        upcomingPaymentsData = viewModel.upcomingPayments;
        this.setDropdownData(3);
        this.setListTab(3);
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
      const loansChartOptions = {
        'title': '',
        'legend': 'none',
        'pieHole': 0.7,
        'chartArea': {
          'left': '20%',
          'right': '3%',
          'top': 0,
          'width': 500,
          'height': 500
        },
        'width': 270,
        'height': 270,
        'colors': ['#77BC43', '#FF8600', '#3897D6'],
        'pieSliceText': 'none',
        'pieSliceBorderColor': "transparent",
        'centerText': kony.i18n.getLocalizedString('i18n.TradeLending.totalLoans')
      };
      let loansChart = new kony.ui.CustomWidget({
        "id": "myLoansChart",
        "isVisible": true,
        "left": "5%",
        "width": "90%",
        "height": "100%",
        "zIndex": 1
      }, {
        "padding": [0, 0, 0, 0],
        "paddingInPixel": false
      }, {
        "widgetName": "TLDonutChart",
        "chartData": [],
        "chartProperties": loansChartOptions,
        "chartId": 'myLoansChart_div'
      });
      contentScope.flxDataML.add(loansChart);
    },
    /**
     * Sets the position of calendars.
     */
    renderCalendars: function () {
      const calendars = [popupScope.cal1ASF6T1, popupScope.cal2ASF6T1, popupScope.cal1ASF8T1, popupScope.cal2ASF8T1, popupScope.cal1ASF4T2, popupScope.cal2ASF4T2, popupScope.cal1ASF5T3, popupScope.cal2ASF5T3];
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
      selectedBalancesKey = 'All Deals';
      contentScope.flxClearSearchBL.setVisibility(false);
      contentScope.tbxSearchBL.text = '';
      contentScope.lblDropdownIconBL.text = fontIcons.chevronDown;
      contentScope.flxDropdownListBL.setVisibility(false);
      contentScope.flxLoadingBL.setVisibility(true);
      contentScope.flxContainerBL.setVisibility(false);
      contentScope.flxLoadingList.setVisibility(true);
      contentScope.flxContainerList.setVisibility(false);
      contentScope.flxLoadingML.setVisibility(true);
      contentScope.flxContainerML.setVisibility(false);
      presenter.getBalances(this.view.id);
      presenter.getMyLoans(this.view.id);
    },
    /**
     * Sets the balances dropdown data.
     */
    setBalancesDropdownData: function () {
      let segDealData = [{
        'lblIcon': {
          'text': fontIcons.radioSelected,
          'skin': skins.radioSelected
        },
        'lblValue': kony.i18n.getLocalizedString('i18n.TradeLending.allDeals'),
        'key': 'All Deals'
      }];
      balancesData.deals.forEach(d => {
        segDealData.push({
          'lblIcon': {
            'text': fontIcons.radioUnselected,
            'skin': skins.radioUnselected
          },
          'lblValue': `${d.shortTitle} / ${d.account}`,
          'key': d.account
        });
      });
      contentScope.segDeals.setData(segDealData);

      let segFacilityData = [{
        'lblIcon': {
          'text': fontIcons.radioSelected,
          'skin': skins.radioSelected
        },
        'lblValue': kony.i18n.getLocalizedString('i18n.TradeLending.allFacilities'),
        'key': 'All Facilities'
      }];
      balancesData.facilities.forEach(f => {
        segFacilityData.push({
          'lblIcon': {
            'text': fontIcons.radioUnselected,
            'skin': skins.radioUnselected
          },
          'lblValue': `${f.shortTitle} / ${f.account}`,
          'key': f.account
        });
      });
      contentScope.segFacilities.setData(segFacilityData);
      balanceDropdownSegmentData = {
        'segDealData': JSON.parse(JSON.stringify(segDealData)),
        'segFacilityData': JSON.parse(JSON.stringify(segFacilityData))
      };
      this.setBalancesData();
    },
    /**
     * Sets the balances widget data.
     */
    setBalancesData: function () {
      contentScope.flxLoadingBL.setVisibility(false);
      contentScope.flxContainerBL.setVisibility(true);
      let segData = [],
        totalAccounts = 0,
        totalLimit = 0,
        totalAvailable = 0,
        totalUtilised = 0,
        currSymbol = '', currencySet = new Set();
      if (selectedBalancesKey === 'All Deals') {
        contentScope.lblValueBL.text = kony.i18n.getLocalizedString('i18n.TradeLending.allDeals');
        totalAccounts = balancesData.deals.length;
        if (!totalAccounts) {
          contentScope.flxDataBL.setVisibility(false);
          contentScope.flxNoDataBL.setVisibility(true);
          contentScope.lblNoDataBL.text = kony.i18n.getLocalizedString('i18n.TradeLending.noDealsFoundMessage');
          contentScope.flxBalances.forceLayout();
          return;
        }
        let segRowData = [];
        balancesData.deals.forEach(d => {
          currencySet.add(d.currency);
          currSymbol = presenter.configurationManager.getCurrency(d.currency);
          totalLimit += d.totalCommitment;
          totalAvailable += d.availableCommitment;
          totalUtilised += d.utilisedCommitment;
          segRowData.push({
            'lblName': `${d.shortTitle} / ${d.account}`,
            'lblCount1': {
              'isVisible': true,
              'text': `${d.facilities.length} ${kony.i18n.getLocalizedString(d.facilities.length < 2 ? 'i18n.TradeLending.facility' : 'i18n.TradeSupplyFinance.facilities')}`
            },
            'lblTotalLimitValue': `${currSymbol}${presenter.formatUtilManager.formatAmount(d.totalCommitment)}`,
            'lblAvailableLimitValue': `${currSymbol}${presenter.formatUtilManager.formatAmount(d.availableCommitment)}`,
            'lblUtilisedLimitValue': `${currSymbol}${presenter.formatUtilManager.formatAmount(d.utilisedCommitment)}`,
            'totalLimit': d.totalCommitment,
            'availableLimit': d.availableCommitment,
            'utitlisedLimit': d.utilisedCommitment,
            currSymbol
          });
        });
        segData.push([{
          'lblHeading': kony.i18n.getLocalizedString('i18n.TradeLending.myBalances'),
          'flxDropdown': {
            'isVisible': false
          }
        },
          segRowData
        ]);
      } else if (selectedBalancesKey === 'All Facilities') {
        contentScope.lblValueBL.text = kony.i18n.getLocalizedString('i18n.TradeLending.allFacilities');
        totalAccounts = balancesData.facilities.length;
        if (!totalAccounts) {
          contentScope.flxDataBL.setVisibility(false);
          contentScope.flxNoDataBL.setVisibility(true);
          contentScope.lblNoDataBL.text = kony.i18n.getLocalizedString('i18n.TradeLending.noFacilitiesFoundMessage');
          contentScope.flxBalances.forceLayout();
          return;
        }
        let segRowData = [];
        balancesData.facilities.forEach(f => {
          currencySet.add(f.currency);
          currSymbol = presenter.configurationManager.getCurrency(f.currency);
          totalLimit += f.totalCommitment;
          totalAvailable += f.availableCommitment;
          totalUtilised += f.utilisedCommitment;
          segRowData.push({
            'lblName': `${f.shortTitle} / ${f.account}`,
            'lblCount1': {
              'isVisible': !!f.dealNameWithId,
              'text': f.dealNameWithId
            },
            'lblCount2': {
              'isVisible': true,
              'text': `${f.loans.length} ${kony.i18n.getLocalizedString(f.loans.length < 2 ? 'i18n.TradeFinance.Drawing' : 'i18n.ImportLC.Drawings')}`
            },
            'lblTotalLimitValue': `${currSymbol}${presenter.formatUtilManager.formatAmount(f.totalCommitment)}`,
            'lblAvailableLimitValue': `${currSymbol}${presenter.formatUtilManager.formatAmount(f.availableCommitment)}`,
            'lblUtilisedLimitValue': `${currSymbol}${presenter.formatUtilManager.formatAmount(f.utilisedCommitment)}`,
            'totalLimit': f.totalCommitment,
            'availableLimit': f.availableCommitment,
            'utitlisedLimit': f.utilisedCommitment,
            currSymbol
          });
        });
        segData.push([{
          'lblHeading': kony.i18n.getLocalizedString('i18n.TradeLending.myBalances'),
          'flxDropdown': {
            'isVisible': false
          }
        },
          segRowData
        ]);
      } else {
        if (contentScope.segDeals.isVisible) {
          const selectedDeal = balancesData.deals.find(d => `${d.account}` === selectedBalancesKey);
          contentScope.lblValueBL.text = `${selectedDeal.shortTitle} / ${selectedDeal.account}`;
          currencySet.add(selectedDeal.currency);
          totalAccounts = selectedDeal.facilities.length;
          currSymbol = presenter.configurationManager.getCurrency(selectedDeal.currency);
          segData.push([
            {
              'lblHeading': kony.i18n.getLocalizedString('i18n.TradeLending.myBalances'),
              'flxDropdown': {
                'isVisible': false
              }
            },
            [{
              'lblName': `${selectedDeal.shortTitle} / ${selectedDeal.account}`,
              'lblCount1': {
                'isVisible': true,
                'text': `${totalAccounts} ${kony.i18n.getLocalizedString(totalAccounts < 2 ? 'i18n.TradeLending.facility' : 'i18n.TradeSupplyFinance.facilities')}`
              },
              'lblTotalLimitValue': `${currSymbol}${presenter.formatUtilManager.formatAmount(selectedDeal.totalCommitment)}`,
              'lblAvailableLimitValue': `${currSymbol}${presenter.formatUtilManager.formatAmount(selectedDeal.availableCommitment)}`,
              'lblUtilisedLimitValue': `${currSymbol}${presenter.formatUtilManager.formatAmount(selectedDeal.utilisedCommitment)}`
            }]
          ]);
          if (totalAccounts) {
            let segRowData = [];
            selectedDeal.facilities.forEach(f => {
              currencySet.add(f.currency);
              currSymbol = presenter.configurationManager.getCurrency(f.currency);
              totalLimit += f.totalCommitment;
              totalAvailable += f.availableCommitment;
              totalUtilised += f.utilisedCommitment;
              segRowData.push({
                'lblName': `${f.shortTitle} / ${f.account}`,
                'lblCount1': {
                  'isVisible': true,
                  'text': `${f.loans.length} ${kony.i18n.getLocalizedString(f.loans.length < 2 ? 'i18n.TradeFinance.Drawing' : 'i18n.ImportLC.Drawings')}`
                },
                'lblTotalLimitValue': `${currSymbol}${presenter.formatUtilManager.formatAmount(f.totalCommitment)}`,
                'lblAvailableLimitValue': `${currSymbol}${presenter.formatUtilManager.formatAmount(f.availableCommitment)}`,
                'lblUtilisedLimitValue': `${currSymbol}${presenter.formatUtilManager.formatAmount(f.utilisedCommitment)}`,
                'totalLimit': f.totalCommitment,
                'availableLimit': f.availableCommitment,
                'utitlisedLimit': f.utilisedCommitment,
                currSymbol
              });
            });
            segData.push([{
              'lblHeading': kony.i18n.getLocalizedString('i18n.TradeLending.facilityReference'),
              'flxDropdown': {
                'isVisible': false
              }
            },
              segRowData
            ]);
          }
        } else {
          const selectedFacility = balancesData.facilities.find(f => `${f.account}` === selectedBalancesKey);
          const selectedFacilityDeal = balancesData.deals.find(d => d.account === selectedFacility.dealId);
          if (selectedFacilityDeal) {
            currSymbol = presenter.configurationManager.getCurrency(selectedFacilityDeal.currency);
            currencySet.add(selectedFacilityDeal.currency);
            segData.push([
              {
                'lblHeading': kony.i18n.getLocalizedString('i18n.TradeLending.myBalances'),
                'flxDropdown': {
                  'isVisible': false
                }
              },
              [{
                'lblName': `${selectedFacilityDeal.shortTitle} / ${selectedFacilityDeal.account}`,
                'lblCount1': {
                  'isVisible': true,
                  'text': `${selectedFacilityDeal.facilities.length} ${kony.i18n.getLocalizedString(selectedFacilityDeal.facilities.length < 2 ? 'i18n.TradeLending.facility' : 'i18n.TradeSupplyFinance.facilities')}`
                },
                'lblTotalLimitValue': `${currSymbol}${presenter.formatUtilManager.formatAmount(selectedFacilityDeal.totalCommitment)}`,
                'lblAvailableLimitValue': `${currSymbol}${presenter.formatUtilManager.formatAmount(selectedFacilityDeal.availableCommitment)}`,
                'lblUtilisedLimitValue': `${currSymbol}${presenter.formatUtilManager.formatAmount(selectedFacilityDeal.utilisedCommitment)}`
              }]
            ]);
          }
          contentScope.lblValueBL.text = `${selectedFacility.shortTitle} / ${selectedFacility.account}`;
          currencySet.add(selectedFacility.currency);
          totalAccounts = selectedFacility.loans.length;
          currSymbol = presenter.configurationManager.getCurrency(selectedFacility.currency);
          segData.push([
            {
              'lblHeading': kony.i18n.getLocalizedString('i18n.TradeLending.facilityReference'),
              'flxDropdown': {
                'isVisible': false
              }
            },
            [{
              'lblName': `${selectedFacility.shortTitle} / ${selectedFacility.account}`,
              'lblCount1': {
                'isVisible': true,
                'text': `${totalAccounts} ${kony.i18n.getLocalizedString(totalAccounts < 2 ? 'i18n.TradeFinance.Drawing' : 'i18n.ImportLC.Drawings')}`
              },
              'lblTotalLimitValue': `${currSymbol}${presenter.formatUtilManager.formatAmount(selectedFacility.totalCommitment)}`,
              'lblAvailableLimitValue': `${currSymbol}${presenter.formatUtilManager.formatAmount(selectedFacility.availableCommitment)}`,
              'lblUtilisedLimitValue': `${currSymbol}${presenter.formatUtilManager.formatAmount(selectedFacility.utilisedCommitment)}`
            }]
          ]);
          if (totalAccounts) {
            let segRowData = [];
            selectedFacility.loans.forEach(l => {
              currencySet.add(l.currency);
              currSymbol = presenter.configurationManager.getCurrency(l.currency);
              totalLimit += l.totalCommitment;
              totalAvailable += l.availableCommitment;
              totalUtilised += l.utilisedCommitment;
              segRowData.push({
                'lblName': `${l.shortTitle} / ${l.account}`,
                'lblTotalLimitValue': `${currSymbol}${presenter.formatUtilManager.formatAmount(l.totalCommitment)}`,
                'lblAvailableLimitValue': `${currSymbol}${presenter.formatUtilManager.formatAmount(l.availableCommitment)}`,
                'lblUtilisedLimitValue': `${currSymbol}${presenter.formatUtilManager.formatAmount(l.utilisedCommitment)}`,
                'totalLimit': l.totalCommitment,
                'availableLimit': l.availableCommitment,
                'utitlisedLimit': l.utilisedCommitment,
                currSymbol
              });
            });
            segData.push([{
              'lblHeading': kony.i18n.getLocalizedString('i18n.TradeLending.loanReference'),
              'flxDropdown': {
                'isVisible': false
              }
            },
              segRowData
            ]);
          }
        }
      }
      balanceSegmentData = JSON.parse(JSON.stringify(segData));
      contentScope.segBalances.setData(segData);
      if (currencySet.size === 1) {
        contentScope.flxTotalBL.setVisibility(true);
        contentScope.lblTotalAccountCount.text = String(totalAccounts).padStart(2, 0);
        contentScope.lblTotalLimitValue.text = `${currSymbol}${presenter.formatUtilManager.formatAmount(totalLimit)}`;
        contentScope.lblTotalAvailableValue.text = `${currSymbol}${presenter.formatUtilManager.formatAmount(totalAvailable)}`;
        contentScope.lblTotalUtilisedValue.text = `${currSymbol}${presenter.formatUtilManager.formatAmount(totalUtilised)}`;
      } else {
        contentScope.flxTotalBL.setVisibility(false);
      }
      contentScope.flxDataBL.setVisibility(true);
      contentScope.flxNoDataBL.setVisibility(false);
      contentScope.flxBalances.forceLayout();
    },
    /**
     * Handles deal and facility filter selection.
     * @param {object} param - Specifies selected segment id, row index and section index.
     */
    onFilterSelection: function ({ segWidget, rowIndex, sectionIndex }) {
      let segData = contentScope[segWidget].data;
      segData.forEach(record => {
        record.lblIcon.text = fontIcons.radioUnselected;
        record.lblIcon.skin = skins.radioUnselected;
      });
      segData[rowIndex].lblIcon.text = fontIcons.radioSelected;
      segData[rowIndex].lblIcon.skin = skins.radioSelected;
      contentScope[segWidget].removeAll();
      contentScope[segWidget].setData(segData);
    },
    /**
     * Handles the balance widget dropdown selection.
     */
    handleBalanceDropdownSelection: function () {
      selectedBalancesKey = contentScope[contentScope.segDeals.isVisible ? 'segDeals' : 'segFacilities'].data.find(r => r.lblIcon.text === fontIcons.radioSelected)['key'];
      balanceDropdownSegmentData.segDealData = JSON.parse(JSON.stringify(contentScope.segDeals.data));
      balanceDropdownSegmentData.segFacilityData = JSON.parse(JSON.stringify(contentScope.segFacilities.data));
      contentScope.flxClearSearchBL.setVisibility(false);
      contentScope.tbxSearchBL.text = '';
      scope.toggleBalancesDropdown();
      scope.setBalancesData();
    },
    /**
     * Handles the balances widget search.
     */
    searchBalances: function () {
      const searchText = contentScope.tbxSearchBL.text.toLowerCase();
      if (searchText.length >= 3 || !contentScope.flxClearSearchBL.isVisible) {
        let newSegData = JSON.parse(JSON.stringify(balanceSegmentData)),
          totalAccounts = 0,
          totalLimit = 0,
          totalAvailable = 0,
          totalUtilised = 0,
          currSymbol = '';
        lastIdx = balanceSegmentData.length - 1;
        newSegData[lastIdx][1] = balanceSegmentData[lastIdx][1].filter(obj => {
          if (obj.lblName.toLowerCase().includes(searchText)) {
            totalLimit += obj.totalLimit;
            totalAvailable += obj.availableLimit;
            totalUtilised += obj.utitlisedLimit;
            currSymbol = obj.currSymbol;
            return true;
          }
          return false;
        });
        totalAccounts = newSegData[lastIdx][1].length;
        contentScope.segBalances.setData(newSegData);
        contentScope.lblTotalAccountCount.text = String(totalAccounts).padStart(2, 0);
        contentScope.lblTotalLimitValue.text = `${currSymbol}${presenter.formatUtilManager.formatAmount(totalLimit)}`;
        contentScope.lblTotalAvailableValue.text = `${currSymbol}${presenter.formatUtilManager.formatAmount(totalAvailable)}`;
        contentScope.lblTotalUtilisedValue.text = `${currSymbol}${presenter.formatUtilManager.formatAmount(totalUtilised)}`;
        contentScope.flxBalances.forceLayout();
      }
    },
    /**
     * Sets the dropdown data.
     * @param {number} tabIdx - Specifies the index of list tab.
     */
    setDropdownData: function (tabIdx) {
      //Sets the dropdown for my loans tab.
      if (tabIdx === 1) {
        const dropdownDataASFT1 = myLoansData.reduce((acc, obj) => {
          obj.borrowerName && (acc['borrowerName'].add(obj.borrowerName));
          obj.product && (acc['product'].add(obj.product));
          obj.account && (acc['account'].add(obj.account));
          obj.status && (acc['status'].add(obj.status));
          return acc;
        }, {
          'borrowerName': new Set([all]),
          'product': new Set([all]),
          'account': new Set([all]),
          'status': new Set([all])
        });
        popupScope.DropdownASF1T1.setContext(dropdownDataASFT1.borrowerName);
        popupScope.DropdownASF2T1.setContext(dropdownDataASFT1.product);
        popupScope.DropdownASF3T1.setContext(dropdownDataASFT1.account);
        popupScope.DropdownASF4T1.setContext(dropdownDataASFT1.status);
        popupScope.DropdownASF5T1.setContext(presenter.lendingDashboardConfig.timePeriodFilters);
        popupScope.DropdownASF7T1.setContext(presenter.lendingDashboardConfig.timePeriodFilters);
      }

      //Sets the dropdown for upcmoing maturity tab.
      if (tabIdx === 2) {
        const dropdownDataASFT2 = upcomingMaturityData.reduce((acc, obj) => {
          obj.account && (acc['account'].add(obj.account));
          obj.product && (acc['product'].add(obj.product));
          return acc;
        }, {
          'account': new Set([all]),
          'product': new Set([all])
        });
        popupScope.DropdownASF1T2.setContext(dropdownDataASFT2.account);
        popupScope.DropdownASF2T2.setContext(dropdownDataASFT2.product);
        popupScope.DropdownASF3T2.setContext(presenter.lendingDashboardConfig.timePeriodFilters);
      }

      //Sets the dropdown for upcmoing payments tab.
      if (tabIdx === 3) {
        const dropdownDataASFT3 = upcomingPaymentsData.reduce((acc, obj) => {
          obj.account && (acc['account'].add(obj.account));
          obj.product && (acc['product'].add(obj.product));
          obj.type && (acc['type'].add(obj.type));
          return acc;
        }, {
          'account': new Set([all]),
          'product': new Set([all]),
          'type': new Set([all])
        });
        popupScope.DropdownASF1T3.setContext(dropdownDataASFT3.account);
        popupScope.DropdownASF2T3.setContext(dropdownDataASFT3.product);
        popupScope.DropdownASF3T3.setContext(dropdownDataASFT3.type);
        popupScope.DropdownASF4T3.setContext(presenter.lendingDashboardConfig.timePeriodFilters);
      }
    },
    /**
     * Toggles the balances widget dropdown.
     */
    toggleBalancesDropdown: function () {
      if (contentScope.flxDropdownListBL.isVisible) {
        contentScope.flxDropdownListBL.setVisibility(false);
        contentScope.lblDropdownIconBL.text = fontIcons.chevronDown;
      } else {
        contentScope.flxDropdownListBL.setVisibility(true);
        contentScope.lblDropdownIconBL.text = fontIcons.chevronUp;
        contentScope.segDeals.setData(balanceDropdownSegmentData.segDealData);
        contentScope.segFacilities.setData(balanceDropdownSegmentData.segFacilityData);
      }
    },
    /**
     * Toggles the deal/facility radio.
     * @param {string} selectedRadio - Specifes the selected radio.
     */
    toggleDealFacilityRadio: function (selectedRadio) {
      if (selectedRadio === 'deal') {
        contentScope.lblDealRadio.text = fontIcons.radioSelected;
        contentScope.lblDealRadio.skin = skins.radioSelected;
        contentScope.lblFacilityRadio.text = fontIcons.radioUnselected;
        contentScope.lblFacilityRadio.skin = skins.radioUnselected;
        contentScope.segDeals.setVisibility(true);
        contentScope.segFacilities.setVisibility(false);
      } else {
        contentScope.lblDealRadio.text = fontIcons.radioUnselected;
        contentScope.lblDealRadio.skin = skins.radioUnselected;
        contentScope.lblFacilityRadio.text = fontIcons.radioSelected;
        contentScope.lblFacilityRadio.skin = skins.radioSelected;
        contentScope.segDeals.setVisibility(false);
        contentScope.segFacilities.setVisibility(true);
      }
      contentScope.flxDropdownListBL.forceLayout();
    },
    /**
     * Sets the my loans chart.
     */
    setMyLoansChart: function () {
      contentScope.flxLoadingML.setVisibility(false);
      contentScope.flxContainerML.setVisibility(true);
      if (!myLoansData.length) {
        contentScope.flxDataML.setVisibility(false);
        contentScope.flxNoDataML.setVisibility(true);
        contentScope.flxMyLoans.forceLayout();
        return;
      }
      let chartData = [
        ['Status', 'Count']
      ];
      const myLoansChartData = myLoansData.reduce((acc, obj) => {
        if (!acc[obj.status]) acc[obj.status] = 0;
        acc[obj.status]++;
        return acc;
      }, {});
      for (const [key, value] of Object.entries(presenter.lendingDashboardConfig.loansChartStatus)) {
        const count = myLoansChartData[key];
        chartData.push([value, count]);
      }
      contentScope.flxDataML.myLoansChart.chartData = chartData;
      contentScope.flxDataML.setVisibility(true);
      contentScope.flxNoDataML.setVisibility(false);
      contentScope.flxMyLoans.forceLayout();
    },
    /**
     * Handles the dropdown selection trigerred from component.
     * @param {string} widgetId - Specifies widget id.
     * @param {string} selectedKey - Specifies selected key.
     */
    handleDropdownSelection: function (widgetId, selectedKey) {
      switch (widgetId) {
        case 'DropdownASF5T1':
          this.setASCalendars(selectedKey, popupScope.flxASF6T1, popupScope.cal1ASF6T1, popupScope.cal2ASF6T1);
          break;
        case 'DropdownASF7T1':
          this.setASCalendars(selectedKey, popupScope.flxASF8T1, popupScope.cal1ASF8T1, popupScope.cal2ASF8T1);
          break;
        case 'DropdownASF3T2':
          this.setASCalendars(selectedKey, popupScope.flxASF4T2, popupScope.cal1ASF4T2, popupScope.cal2ASF4T2);
          break;
        case 'DropdownASF4T3':
          this.setASCalendars(selectedKey, popupScope.flxASF5T3, popupScope.cal1ASF5T3, popupScope.cal2ASF5T3);
          break;
      }
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
        listData = myLoansData;
        contentScope.btnTab1.skin = 'ICSknBtnAccountSummarySelected2'
        listParams['sortByParam'] = 'borrowerName';
        listParams['sortOrder'] = 'ASC';
        contentScope.lblListInfo.text = kony.i18n.getLocalizedString('i18n.TradeLending.showingMyRecentLoans');
      } else if (tabSelected === 2) {
        listData = upcomingMaturityData;
        contentScope.btnTab2.skin = 'ICSknBtnAccountSummarySelected2';
        listParams['sortByParam'] = 'account';
        listParams['sortOrder'] = 'ASC';
        contentScope.lblListInfo.text = kony.i18n.getLocalizedString('i18n.TradeLending.showingRecentUpcomingMaturity');
      } else if (tabSelected === 3) {
        listData = upcomingPaymentsData;
        contentScope.btnTab3.skin = 'ICSknBtnAccountSummarySelected2';
        listParams['sortByParam'] = 'account';
        listParams['sortOrder'] = 'ASC';
        contentScope.lblListInfo.text = kony.i18n.getLocalizedString('i18n.TradeLending.showingRecentUpcomingPayments');
      }
      if (listData.length > 0) {
        totalPages = Math.ceil(listData.length / 10);
        currentPage = totalPages === 0 ? 0 : 1;
        contentScope.flxListSearchContainer.setVisibility(true);
        contentScope.flxListSearchResults.setVisibility(false);
        contentScope.flxListData.setVisibility(true);
        contentScope.flxListSearch.setVisibility(true);
        contentScope.flxListPagination.setVisibility(true);
        contentScope.flxNoListData.setVisibility(false);
        this.setPagination();
        this.sortRecords();
      } else {
        contentScope.flxLoadingList.setVisibility(false);
        contentScope.flxContainerList.setVisibility(true);
        contentScope.flxListData.setVisibility(false);
        contentScope.flxListSearch.setVisibility(false);
        contentScope.flxListPagination.setVisibility(false);
        contentScope.flxNoListData.setVisibility(true);
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
      previousIndex = undefined;
      const segData = this[tabSelected === 1 ? 'getMyLoansSegmentData' : tabSelected === 2 ? 'getUpcomingMaturitySegmentData' : 'getUpcomingPaymentsSegmentData'](paginatedRecords);
      contentScope.segList.setData(segData);
      contentScope.flxList.forceLayout();
    },
    /**
     * Creates the my loans table data.
     * @param {Array} records - Specifies the records data.
     * @returns {Array} - Returns the table data.
     */
    getMyLoansSegmentData: function (records) {
      let segData = [], segRowData = [];
      for (const record of records) {
        segRowData.push({
          'lblDropdown': fontIcons.chevronDown,
          'flxListRow': {
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
            'width': '27%'
          },
          'flxColumn2': {
            'width': '16%'
          },
          'flxColumn3': {
            'width': '18%'
          },
          'flxColumn4': {
            'isVisible': true,
            'width': '17%',
            'reverseLayoutDirection': true
          },
          'flxColumn5': {
            'isVisible': true,
            'left': '4%',
            'width': '10.5%'
          },
          'flxAction': {
            'isVisible': false
          },
          'lblColumn1': record.borrowerName || NA,
          'lblColumn2': record.account || NA,
          'lblColumn3': record.product || NA,
          'lblColumn4': (record.currency && record.totalCommitment) ? `${presenter.configurationManager.getCurrency(record.currency)}${presenter.formatUtilManager.formatAmount(record.totalCommitment)}` : NA,
          'lblColumn5': record.status || NA,
          'flxRow2': {
            'isVisible': true
          },
          'flxRow3': {
            'isVisible': !!record.totalCommitment
          },
          'flxRow4': {
            'isVisible': !!record.totalInterest
          },
          'flxRow5': {
            'isVisible': !!record.totalCharges
          },
          'flxRow6': {
            'isVisible': !!record.totalTaxes
          },
          'lblRow1Key': kony.i18n.getLocalizedString('i18n.savingsPot.startDate'),
          'lblRow1Value': record.startDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.startDate) : NA,
          'lblRow2Key': kony.i18n.getLocalizedString('i18n.Wealth.expiryDate'),
          'lblRow2Value': record.maturityDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.maturityDate) : NA,
          'lblRow3Key': kony.i18n.getLocalizedString('i18n.payments.totalPrincipal'),
          'lblRow3Value': (record.currency && record.totalCommitment) ? `${presenter.configurationManager.getCurrency(record.currency)}${presenter.formatUtilManager.formatAmount(record.totalCommitment)}` : NA,
          'lblRow4Key': kony.i18n.getLocalizedString('i18n.payments.totalInterest'),
          'lblRow4Value': (record.currency && record.totalInterest) ? `${presenter.configurationManager.getCurrency(record.currency)}${presenter.formatUtilManager.formatAmount(record.totalInterest)}` : NA,
          'lblRow5Key': kony.i18n.getLocalizedString('i18n.TradeLending.totalChargesWithColon'),
          'lblRow5Value': (record.currency && record.totalCharges) ? `${presenter.configurationManager.getCurrency(record.currency)}${presenter.formatUtilManager.formatAmount(record.totalCharges)}` : NA,
          'lblRow6Key': kony.i18n.getLocalizedString('i18n.TradeLending.totalTaxesWithColon'),
          'lblRow6Value': (record.currency && record.totalTaxes) ? `${presenter.configurationManager.getCurrency(record.currency)}${presenter.formatUtilManager.formatAmount(record.totalTaxes)}` : NA
        });
      }
      segData.push([{
        'flxColumn1': {
          'width': '27%',
          'onClick': function (context) {
            listParams['sortByParam'] = 'borrowerName';
            scope.sortRecords(context)
          }
        },
        'flxColumn2': {
          'width': '16%',
          'onClick': function (context) {
            listParams['sortByParam'] = 'account';
            scope.sortRecords(context)
          }
        },
        'flxColumn3': {
          'width': '18%',
          'onClick': function (context) {
            listParams['sortByParam'] = 'product';
            scope.sortRecords(context)
          }
        },
        'flxColumn4': {
          'isVisible': true,
          'width': '17%',
          'layoutType': kony.flex.FREE_FORM,
          'onClick': function (context) {
            listParams['sortByParam'] = 'amount';
            scope.sortRecords(context)
          }
        },
        'flxColumn5': {
          'isVisible': true,
          'left': '4%',
          'width': '10.5%'
        },
        'flxAction': {
          'isVisible': false
        },
        'lblColumn1': kony.i18n.getLocalizedString('i18n.TradeLending.borrowerName'),
        'lblColumn2': kony.i18n.getLocalizedString('i18n.approvals.account'),
        'lblColumn3': kony.i18n.getLocalizedString('i18n.TradeFinance.product'),
        'lblColumn4': {
          'text': kony.i18n.getLocalizedString('i18n.TradeLending.loanAmount'),
          'left': '',
          'right': '20dp'
        },
        'lblColumn5': kony.i18n.getLocalizedString('i18n.common.status'),
        'imgColumn1': {
          'src': scope.getSortImage('borrowerName')
        },
        'imgColumn2': {
          'src': scope.getSortImage('account')
        },
        'imgColumn3': {
          'src': scope.getSortImage('product')
        },
        'imgColumn4': {
          'left': '',
          'right': '0dp',
          'src': scope.getSortImage('amount')
        },
        'imgColumn5': {
          'isVisible': false
        }
      }, segRowData]);
      return segData;
    },
    /**
     * Creates the upcoming maturity table data.
     * @param {Array} records - Specifies the records data.
     * @returns {Array} - Returns the table data.
     */
    getUpcomingMaturitySegmentData: function (records) {
      let segData = [], segRowData = [];
      for (const record of records) {
        segRowData.push({
          'lblDropdown': fontIcons.chevronDown,
          'flxListRow': {
            'skin': 'sknflxffffffnoborder'
          },
          "flxDetails": {
            "isVisible": false
          },
          "flxIdentifier": {
            "skin": "slFbox"
          },
          "flxDropdown": {
            // "onClick": this.handleSegmentRowView
          },
          'flxColumn1': {
            'width': '15%'
          },
          'flxColumn2': {
            'width': '19%'
          },
          'flxColumn3': {
            'width': '18%',
            'reverseLayoutDirection': true
          },
          'flxColumn4': {
            'isVisible': true,
            'left': '4%',
            'width': '20%'
          },
          'flxAction': {
            'isVisible': true,
            'width': '16.5%'
          },
          'lblColumn1': record.account || NA,
          'lblColumn2': record.product || NA,
          'lblColumn3': (record.currency && record.loanAmount) ? `${presenter.configurationManager.getCurrency(record.currency)}${presenter.formatUtilManager.formatAmount(record.loanAmount)}` : NA,
          'lblColumn4': record.maturityDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.maturityDate) : NA,
          'btnAction': {
            'text': kony.i18n.getLocalizedString('i18n.TradeLending.rollOver'),
            'toolTip': kony.i18n.getLocalizedString('i18n.TradeLending.rollOver')
          }
        });
      }
      segData.push([{
        'flxColumn1': {
          'width': '15%',
          'onClick': function (context) {
            listParams['sortByParam'] = 'account';
            scope.sortRecords(context)
          }
        },
        'flxColumn2': {
          'width': '19%',
          'onClick': function (context) {
            listParams['sortByParam'] = 'product';
            scope.sortRecords(context)
          }
        },
        'flxColumn3': {
          'width': '18%',
          'layoutType': kony.flex.FREE_FORM,
          'onClick': function (context) {
            listParams['sortByParam'] = 'amount';
            scope.sortRecords(context)
          }
        },
        'flxColumn4': {
          'isVisible': true,
          'left': '4%',
          'width': '20%',
          'onClick': function (context) {
            listParams['sortByParam'] = 'maturityDate';
            scope.sortRecords(context)
          }
        },
        'flxAction': {
          'isVisible': true,
          'width': '16.5%'
        },
        'lblColumn1': kony.i18n.getLocalizedString('i18n.approvals.account'),
        'lblColumn2': kony.i18n.getLocalizedString('i18n.TradeFinance.product'),
        'lblColumn3': {
          'text': kony.i18n.getLocalizedString('i18n.wealth.amount'),
          'left': '',
          'right': '20dp'
        },
        'lblColumn4': kony.i18n.getLocalizedString('i18n.accountDetail.maturityDate'),
        'lblAction': kony.i18n.getLocalizedString('i18n.TradeFinance.Action'),
        'imgColumn1': {
          'src': scope.getSortImage('account')
        },
        'imgColumn2': {
          'src': scope.getSortImage('product')
        },
        'imgColumn3': {
          'left': '',
          'right': '0dp',
          'src': scope.getSortImage('amount')
        },
        'imgColumn4': {
          'src': scope.getSortImage('maturityDate')
        }
      }, segRowData]);
      return segData;
    },
    /**
     * Creates the upcoming payments table data.
     * @param {Array} records - Specifies the records data.
     * @returns {Array} - Returns the table data.
     */
    getUpcomingPaymentsSegmentData: function (records) {
      let segData = [], segRowData = [];
      for (const record of records) {
        segRowData.push({
          'lblDropdown': fontIcons.chevronDown,
          'flxListRow': {
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
            'width': '15%'
          },
          'flxColumn2': {
            'width': '19%'
          },
          'flxColumn3': {
            'isVisible': true,
            'width': '20%'
          },
          'flxColumn4': {
            'isVisible': true,
            'width': '18%',
            'reverseLayoutDirection': true
          },
          'flxAction': {
            'isVisible': true,
            'left': '4%',
            'width': '16.5%'
          },
          'lblColumn1': record.account || NA,
          'lblColumn2': record.product || NA,
          'lblColumn3': record.dueDate ? presenter.formatUtilManager.getFormattedCalendarDate(record.dueDate) : NA,
          'lblColumn4': (record.currency && record.dueAmount) ? `${presenter.configurationManager.getCurrency(record.currency)}${presenter.formatUtilManager.formatAmount(record.dueAmount)}` : NA,
          'btnAction': {
            'text': kony.i18n.getLocalizedString('i18n.payments.makePayment'),
            'toolTip': kony.i18n.getLocalizedString('i18n.payments.makePayment')
          },
          'flxRow2': {
            'isVisible': !!record.totalCommitment
          },
          'flxRow3': {
            'isVisible': !!record.totalInterest
          },
          'flxRow4': {
            'isVisible': !!record.totalCharges
          },
          'flxRow5': {
            'isVisible': !!record.totalTaxes
          },
          'lblRow1Key': kony.i18n.getLocalizedString('i18n.ProfileManagement.Type'),
          'lblRow1Value': record.type || NA,
          'lblRow2Key': kony.i18n.getLocalizedString('i18n.TradeLending.principalAmountWithColon'),
          'lblRow2Value': (record.currency && record.totalCommitment) ? `${presenter.configurationManager.getCurrency(record.currency)}${presenter.formatUtilManager.formatAmount(record.totalCommitment)}` : NA,
          'lblRow3Key': kony.i18n.getLocalizedString('kony.mb.loans.Interest'),
          'lblRow3Value': (record.currency && record.totalInterest) ? `${presenter.configurationManager.getCurrency(record.currency)}${presenter.formatUtilManager.formatAmount(record.totalInterest)}` : NA,
          'lblRow4Key': kony.i18n.getLocalizedString('i18n.TradeFinance.ChargesWithColon'),
          'lblRow4Value': (record.currency && record.totalCharges) ? `${presenter.configurationManager.getCurrency(record.currency)}${presenter.formatUtilManager.formatAmount(record.totalCharges)}` : NA,
          'lblRow5Key': kony.i18n.getLocalizedString('kony.mb.loans.Tax'),
          'lblRow5Value': (record.currency && record.totalTaxes) ? `${presenter.configurationManager.getCurrency(record.currency)}${presenter.formatUtilManager.formatAmount(record.totalTaxes)}` : NA
        });
      }
      segData.push([{
        'flxColumn1': {
          'width': '15%',
          'onClick': function (context) {
            listParams['sortByParam'] = 'account';
            scope.sortRecords(context)
          }
        },
        'flxColumn2': {
          'width': '19%',
          'onClick': function (context) {
            listParams['sortByParam'] = 'product';
            scope.sortRecords(context)
          }
        },
        'flxColumn3': {
          'isVisible': true,
          'width': '20%',
          'onClick': function (context) {
            listParams['sortByParam'] = 'dueDate';
            scope.sortRecords(context)
          }
        },
        'flxColumn4': {
          'isVisible': true,
          'width': '18%',
          'layoutType': kony.flex.FREE_FORM,
          'onClick': function (context) {
            listParams['sortByParam'] = 'amount';
            scope.sortRecords(context)
          }
        },
        'flxAction': {
          'isVisible': true,
          'left': '4%',
          'width': '16.5%'
        },
        'lblColumn1': kony.i18n.getLocalizedString('i18n.approvals.account'),
        'lblColumn2': kony.i18n.getLocalizedString('i18n.TradeFinance.product'),
        'lblColumn3': kony.i18n.getLocalizedString('i18n.billPay.DueDate'),
        'lblColumn4': {
          'text': kony.i18n.getLocalizedString('i18n.loan.dueAmount'),
          'left': '',
          'right': '20dp'
        },
        'lblAction': kony.i18n.getLocalizedString('i18n.TradeFinance.Action'),
        'imgColumn1': {
          'src': scope.getSortImage('account')
        },
        'imgColumn2': {
          'src': scope.getSortImage('product')
        },
        'imgColumn3': {
          'src': scope.getSortImage('dueDate')
        },
        'imgColumn4': {
          'left': '',
          'right': '0dp',
          'src': scope.getSortImage('amount')
        }
      }, segRowData]);
      return segData;
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
      data['flxListRow'].skin = viewData[3];
      contentScope.segList.setDataAt(data, index, 0);
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
        listData = TLUtils.sortRecords(listData, listParams);
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
     * Aligns the  dashboard widgets.
     * @param {object} widgetBL - Specifies balances widget reference.
     */
    alignWidgets: function (widgetBL) {
      const heightBL = widgetBL.frame.height,
        heightQL = parseFloat(contentScope.flxQuickLinks.height),
        heightML = parseFloat(contentScope.flxMyLoans.height);
      contentScope.flxLoadingBL.height = `${heightBL}dp`;
      if (breakpoint > 1024) {
        contentScope.flxList.top = `${heightBL + 20}dp`;
      } else {
        contentScope.flxQuickLinks.top = `${heightBL + 20}dp`;
        contentScope.flxMyLoans.top = `${heightBL + 20}dp`;
        contentScope.flxList.top = `${heightBL + heightML + 40}dp`;
      }
      contentScope.forceLayout();
    },
    /**
     * Toggles the advanced search popup.
     * @param {boolean} visibility - Specfies whether to show/hide advanced search popup.
     * @returns {void} - Returns nothing if visibility is false.
     */
    toggleAdvancedSearchPopup: function (visibility) {
      popupScope.setVisibility(visibility);
      popupScope.flxAdvancedSearchPopup.setVisibility(visibility);
      if (!visibility || isSearchApplied) {
        return;
      }
      popupScope.flxASFieldsTab1.setVisibility(false);
      popupScope.flxASFieldsTab2.setVisibility(false);
      popupScope.flxASFieldsTab3.setVisibility(false);
      if (tabSelected === 1) {
        popupScope.flxASFieldsTab1.setVisibility(true);
        ['DropdownASF1T1', 'DropdownASF2T1', 'DropdownASF3T1', 'DropdownASF4T1', 'DropdownASF5T1', 'DropdownASF7T1'].forEach(widget => {
          popupScope[widget].removeSelection();
          popupScope[widget].setDefaultText();
          popupScope[widget].closeDropdown();
        });
        ['cal1ASF6T1', 'cal2ASF6T1', 'cal1ASF8T1', 'cal2ASF8T1'].forEach(widget => {
          popupScope[widget].clear();
        });
        popupScope.flxASF6T1.setEnabled(false);
        popupScope.flxASF8T1.setEnabled(false);
      } else if (tabSelected === 2) {
        popupScope.flxASFieldsTab2.setVisibility(true);
        ['DropdownASF1T2', 'DropdownASF2T2', 'DropdownASF3T2'].forEach(widget => {
          popupScope[widget].removeSelection();
          popupScope[widget].setDefaultText();
          popupScope[widget].closeDropdown();
        });
        ['cal1ASF4T2', 'cal2ASF4T2'].forEach(widget => {
          popupScope[widget].clear();
        });
        popupScope.flxASF4T2.setEnabled(false);
      } else if (tabSelected === 3) {
        popupScope.flxASFieldsTab3.setVisibility(true);
        ['DropdownASF1T3', 'DropdownASF2T3', 'DropdownASF3T3', 'DropdownASF4T3'].forEach(widget => {
          popupScope[widget].removeSelection();
          popupScope[widget].setDefaultText();
          popupScope[widget].closeDropdown();
        });
        ['cal1ASF5T3', 'cal2ASF5T3'].forEach(widget => {
          popupScope[widget].clear();
        });
        popupScope.flxASF5T3.setEnabled(false);
      }
    },
    /**
     * Sets the advanced search calendars on basis of selected date range.
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
     * Applies the advanced search.
     * @returns {void} - Return nothing if search fields are empty/invalid.
     */
    applyAdvancedSearch: function () {
      this.toggleAdvancedSearchPopup(false);
      searchCriteria = {
        'searchParam': {},
        'filterParam': {},
        'dateParam': {}
      };
      tagsData = {};
      if (tabSelected === 1) {
        const f1 = popupScope.DropdownASF1T1.getSelectedKey(),
          f2 = popupScope.DropdownASF2T1.getSelectedKey(),
          f3 = popupScope.DropdownASF3T1.getSelectedKey(),
          f4 = popupScope.DropdownASF4T1.getSelectedKey(),
          f5 = popupScope.DropdownASF5T1.getSelectedKey(),
          f6d1 = popupScope.cal1ASF6T1.formattedDate,
          f6d2 = popupScope.cal2ASF6T1.formattedDate,
          f7 = popupScope.DropdownASF7T1.getSelectedKey(),
          f8d1 = popupScope.cal1ASF8T1.formattedDate,
          f8d2 = popupScope.cal2ASF8T1.formattedDate;
        if (!f1 && !f2 && !f3 && !f4 && !f5 && !f6d1 && !f6d2 && !f7 && !f8d1 && !f8d2) {
          return;
        }
        if (f1) {
          (f1 !== all) && (searchCriteria['filterParam']['borrowerName'] = f1);
          tagsData['borrowerName'] = `${kony.i18n.getLocalizedString('i18n.TradeLending.borrowerNameWithColon')} ${f1}`;
        }
        if (f2) {
          (f2 !== all) && (searchCriteria['filterParam']['product'] = f2);
          tagsData['product'] = `${kony.i18n.getLocalizedString('i18n.TradeLending.productWithColon')} ${f2}`;
        }
        if (f3) {
          (f3 !== all) && (searchCriteria['filterParam']['account'] = f3);
          tagsData['account'] = `${kony.i18n.getLocalizedString('i18n.common.accountNumWithColon')} ${f3}`;
        }
        if (f4) {
          (f4 !== all) && (searchCriteria['filterParam']['status'] = f4);
          tagsData['status'] = `${kony.i18n.getLocalizedString('i18n.wealth.statuswithColon')} ${f4}`;
        }
        if (f6d1 && f6d2) {
          searchCriteria['dateParam']['startDate'] = [f6d1, f6d2];
          tagsData['startDate'] = `${kony.i18n.getLocalizedString('i18n.savingsPot.startDate')} ${f6d1} to ${f6d2}`;
        }
        if (f8d1 && f8d2) {
          searchCriteria['dateParam']['maturityDate'] = [f8d1, f8d2];
          tagsData['maturityDate'] = `${kony.i18n.getLocalizedString('i18n.Wealth.maturityDate')} ${f8d1} to ${f8d2}`;
        }
      } else if (tabSelected === 2) {
        const f1 = popupScope.DropdownASF1T2.getSelectedKey(),
          f2 = popupScope.DropdownASF2T2.getSelectedKey(),
          f3 = popupScope.DropdownASF3T2.getSelectedKey(),
          f4d1 = popupScope.cal1ASF4T2.formattedDate,
          f4d2 = popupScope.cal2ASF4T2.formattedDate;
        if (!f1 && !f2 && !f3 && !f4d1 && !f4d2) {
          return;
        }
        if (f1) {
          (f1 !== all) && (searchCriteria['filterParam']['account'] = f1);
          tagsData['account'] = `${kony.i18n.getLocalizedString('i18n.savingspot.account')} ${f1}`;
        }
        if (f2) {
          (f2 !== all) && (searchCriteria['filterParam']['product'] = f2);
          tagsData['product'] = `${kony.i18n.getLocalizedString('i18n.TradeLending.productWithColon')} ${f2}`;
        }
        if (f4d1 && f4d2) {
          searchCriteria['dateParam']['maturityDate'] = [f4d1, f4d2];
          tagsData['maturityDate'] = `${kony.i18n.getLocalizedString('i18n.Wealth.maturityDate')} ${f4d1} to ${f4d2}`;
        }
      } else if (tabSelected === 3) {
        const f1 = popupScope.DropdownASF1T3.getSelectedKey(),
          f2 = popupScope.DropdownASF2T3.getSelectedKey(),
          f3 = popupScope.DropdownASF3T3.getSelectedKey(),
          f4 = popupScope.DropdownASF4T3.getSelectedKey(),
          f5d1 = popupScope.cal1ASF5T3.formattedDate,
          f5d2 = popupScope.cal2ASF5T3.formattedDate;
        if (!f1 && !f2 && !f3 && !f4 && !f5d1 && !f5d2) {
          return;
        }
        if (f1) {
          (f1 !== all) && (searchCriteria['filterParam']['account'] = f1);
          tagsData['account'] = `${kony.i18n.getLocalizedString('i18n.savingspot.account')} ${f1}`;
        }
        if (f2) {
          (f2 !== all) && (searchCriteria['filterParam']['product'] = f2);
          tagsData['product'] = `${kony.i18n.getLocalizedString('i18n.TradeLending.productWithColon')} ${f2}`;
        }
        if (f3) {
          (f3 !== all) && (searchCriteria['filterParam']['type'] = f3);
          tagsData['type'] = `${kony.i18n.getLocalizedString('i18n.ProfileManagement.Type')} ${f3}`;
        }
        if (f5d1 && f5d2) {
          searchCriteria['dateParam']['dueDate'] = [f5d1, f5d2];
          tagsData['dueDate'] = `${kony.i18n.getLocalizedString('i18n.payments.dueDateWithColon')} ${f5d1} to ${f5d2}`;
        }
      }
      scope.view.formTemplate12.showLoading();
      isSearchApplied = true;
      contentScope.flxListSearchContainer.setVisibility(false);
      contentScope.flxListSearchResults.setVisibility(true);
      setTimeout(function () {
        const searchData = {
          1: myLoansData,
          2: upcomingMaturityData,
          3: upcomingPaymentsData
        }[tabSelected] || [];
        listData = TLUtils.searchAndFilterRecords(searchData, searchCriteria);
        listData = TLUtils.sortRecords(listData, listParams);
        totalPages = Math.ceil(listData.length / 10);
        currentPage = totalPages === 0 ? 0 : 1;
        scope.setPagination();
        scope.setListData();
        contentScope.brwSearchTags.evaluateJavaScript(`createTags(${JSON.stringify(tagsData)})`);
        contentScope.flxList.forceLayout();
        scope.view.formTemplate12.hideLoading();
      }, 500);
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
          case 'borrowerName':
            popupScope.DropdownASF1T1.removeSelection();
            popupScope.DropdownASF1T1.setDefaultText();
            break;
          case 'product':
            popupScope.DropdownASF2T1.removeSelection();
            popupScope.DropdownASF2T1.setDefaultText();
            break;
          case 'account':
            popupScope.DropdownASF3T1.removeSelection();
            popupScope.DropdownASF3T1.setDefaultText();
            break;
          case 'status':
            popupScope.DropdownASF4T1.removeSelection();
            popupScope.DropdownASF4T1.setDefaultText();
            break;
          case 'startDate':
            popupScope.DropdownASF5T1.removeSelection();
            popupScope.DropdownASF5T1.setDefaultText();
            popupScope.cal1ASF6T1.clear();
            popupScope.cal2ASF6T1.clear();
            break;
          case 'maturityDate':
            popupScope.DropdownASF7T1.removeSelection();
            popupScope.DropdownASF7T1.setDefaultText();
            popupScope.cal1ASF8T1.clear();
            popupScope.cal2ASF8T1.clear();
            break;
        }
      } else if (tabSelected === 2) {
        switch (tagId) {
          case 'account':
            popupScope.DropdownASF1T2.removeSelection();
            popupScope.DropdownASF1T2.setDefaultText();
            break;
          case 'product':
            popupScope.DropdownASF2T2.removeSelection();
            popupScope.DropdownASF2T2.setDefaultText();
            break;
          case 'maturityDate':
            popupScope.DropdownASF3T2.removeSelection();
            popupScope.DropdownASF3T2.setDefaultText();
            popupScope.cal1ASF4T2.clear();
            popupScope.cal2ASF4T2.clear();
            break;
        }
      } else if (tabSelected === 3) {
        switch (tagId) {
          case 'account':
            popupScope.DropdownASF1T3.removeSelection();
            popupScope.DropdownASF1T3.setDefaultText();
            break;
          case 'product':
            popupScope.DropdownASF2T3.removeSelection();
            popupScope.DropdownASF2T3.setDefaultText();
            break;
          case 'type':
            popupScope.DropdownASF3T3.removeSelection();
            popupScope.DropdownASF3T3.setDefaultText();
            break;
          case 'dueDate':
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
          1: myLoansData,
          2: upcomingMaturityData,
          3: upcomingPaymentsData
        }[tabSelected] || [];
        listData = TLUtils.searchAndFilterRecords(searchData, searchCriteria);
        listData = TLUtils.sortRecords(listData, listParams);
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
  };
});
