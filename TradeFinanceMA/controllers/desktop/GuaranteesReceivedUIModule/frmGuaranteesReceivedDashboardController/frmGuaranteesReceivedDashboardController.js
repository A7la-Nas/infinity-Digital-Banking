define(['CommonUtilities', 'OLBConstants', 'FormControllerUtility', 'ViewConstants', 'FormatUtil'], function (CommonUtilities, OLBConstants, FormControllerUtility, ViewConstants, FormatUtil) {

  let guaranteesLCDetails;
  let GUARANTEES_TAB = kony.i18n.getLocalizedString("i18n.TradeFinance.GuaranteesReceivedLC");
  let AMENDMENTS_TAB = kony.i18n.getLocalizedString("i18n.ImportLC.Amendments");
  let CLAIMS_TAB = "Claims";
  let currentTab = GUARANTEES_TAB;
  let previousFilterSelection = 0;
  let selectedRecord;
  let navData;
  let lcDetails;
  let presenter;
  let isNoRecordsAvailable = false;
  let isPrintNavigation = false;
  let segLCAccountType = '';
  let segLCStatusType = '';
  let segTimePeriods = '';
  let filterByValue = "";
  let filterByParam = "";
  let navToLCDetails = false;
  let isSearchEnabled = false;
  let isFilterApplied = false;
  let intitateFirst = true;
  let segFilter1Data = [];
  let segFilter2Data = [];
  let segFilter3Data = [];
  let segFilter4Data = [];
  let sortApplied = false;
  let upperLimit = 10;
  this.downloadXLSXData = "";
  let tabSelection = false;
  let onClickViewAmendments = false;
  let newGuaranteesCount = 0;
  let newStatusDashboard = false;
  let serviceParameters = {
    "searchString": "",
    "pageSize": "",
    "pageOffset": "",
    "sortByParam": "receivedOn",
    "sortOrder": "",
    "timeParam": "",
    "timeValue": "6,MONTH",
    "filterByValue": "receivedOn",
    "filterByParam": ""
  };
  //Created On
  this.sortField = {
    "imgCoulmnTab1": "applicantName",
    "imgCoulmnTab2": "productType",
    "imgCoulmnTab3": "lcType",
    "imgCoulmnTab4": "guaranteeSrmsId",
    "imgCoulmnTab5": "receivedOn",
    "imgCoulmnTab6": "status",
    "imgColumnAmendmentsTab1": "applicant",
    "imgColumnAmendmentsTab2": "guaranteeSrmsId",
    "imgColumnAmendmentsTab3": "amendmentSrmsId",
    "imgColumnAmendmentsTab4": "receivedOn",
    "imgColumnAmendmentsTab5": "amendmentNo",
    "imgColumnAmendmentsTab6": "status",
    "imgColumnClaimsTab1": "beneficiaryName",
    "imgColumnClaimsTab2": "productType",
    "imgColumnClaimsTab3": "claimAmount",
    "imgColumnClaimsTab4": "serviceRequestTime",
    "imgColumnClaimsTab5": "status"
  };
  let billType;
  let statusData = {};
  let billTypeLength = 0;
  let guaranteesAndStandByLCStatus;
  let isChartRendered = false;
  let orientationHandler = new OrientationHandler();
  let currentLCValue = "AllGuaranteesAndStandbyLC";
  let chartAndStatusData = {};
  let mixedTotalAmount = {};
  let isPopUpSearchEnabled = false;
  let lcCurrency = {};
  let selectedCurrency = "USD";
  let productType = "AllGuaranteesAndStandbyLC";
  let isGuaranteesAndStandByLC = false;
  let formatUtil;
  let regExpForCheckArrayInString = /[\[\]]+/;
  let lcByIDNav;
  let isRecentLCViewDetailsBtnOnClick = false;
  const NA = kony.i18n.getLocalizedString("i18n.common.NA");
  return {
    /**
       * @api : onNavigate
       * This function for executing the postShow, displayData and methods given
       * @return : NA
       */
    onNavigate: function (record) {
      const flowType = record && record.hasOwnProperty('flowType') ? record.flowType : 'ReceivedGuarantees';
      this.currentTab = {
        'ReceivedGuarantees': GUARANTEES_TAB,
        'ReceivedAmendments': AMENDMENTS_TAB,
        'Claims': CLAIMS_TAB
      }[flowType];
    },

    /**
     * Sets the initial actions for form
     */
    init: function () {
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.view.onDeviceBack = function () { };
      this.view.onBreakpointChange = this.onBreakpointChange;
      this.initActions();
    },
    /**
    * @api : preShow
    * Gets invoked initially before rendering of UI
    * @return : NA
    */
    preShow: function () {
      var scope = this;
      try {
        scope.view.customheadernew.activateMenu("TradeFinance", "GuaranteesReceived");
        FormControllerUtility.updateWidgetsHeightInInfo(this.view, ["flxHeader", "flxFooter",]);
        scope.view.customheadernew.forceCloseHamburger();
        scope.initiateFirst = true;
        scope.lowerLimit = 1;
        scope.upperLimit = 10;
        scope.intitateFirst = true;
        scope.isFilterApplied = false;
        scope.isPopUpSearchEnabled = false;
        scope.sortApplied = false;
		isChartRendered = false;
        this.navManager = applicationManager.getNavigationManager();
        if (scope.currentTab === "" || kony.sdk.isNullOrUndefined(scope.currentTab)) {
          scope.currentTab = GUARANTEES_TAB;
        }
        scope.setFilterData();
        scope.view.btnTab2.setVisibility(true);
        formatUtil = applicationManager.getFormatUtilManager();
        lcCurrency = Object.values(scope.presenter.guaranteeConfig.currencies);
        scope.view.btnLCCurrency.text = lcCurrency[0] + "-" + applicationManager.getConfigurationManager().getCurrency(lcCurrency[0]);
        scope.view.btnAllGuaranteesAndStandbyLC.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.AllGTSBLC", false);
        this.view.flxCreateNewClaimContainer.doLayout = CommonUtilities.centerPopupFlex;
      }
      catch (err) {
        var errorObj = {
          "method": "preShow",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : postShow
    * Gets invoked initially after rendering of UI
    * @return : NA
    */
    postShow: function () {
      var scope = this;
      try {
        this.view.flxMain.minHeight = kony.os.deviceInfo().screenHeight - this.view.flxHeader.info.frame.height - this.view.flxFooter.info.frame.height + "dp";
        applicationManager.getNavigationManager().applyUpdates(this);
        scope.view.flxGuaranteesDropdown.setVisibility(false);
        scope.view.flxCurrencyDropdown.setVisibility(false);
        scope.setSegCurrencyDropdownData();
        scope.view.flxDialogs.height = kony.os.deviceInfo().screenHeight + 120 + "dp";
        //Overview Methods
        scope.seti18nKeys();
        scope.segLCDropdownWidgetMapping();
        billType = scope_configManager.guaranteeBillType;
        guaranteesAndStandByLCStatus = scope_configManager.receivedGuaranteesAndStandByLCStatus;
        //Listing methods
        scope.view.PaginationContainer.setPageSize(10);
        scope.setTabNavigation();
        scope.setHeaderi18n();
        scope.view.flxListDropdown.setVisibility(false);
        scope.view.imgFilterDropdown.src = "arrowdown_sm.png";
        scope.view.imgCoulmnTab1.src = "sortingfinal.png";
        scope.view.imgCoulmnTab1.src = "sortingfinal.png";
        scope.view.imgCoulmnTab2.src = "sortingfinal.png";
        scope.view.imgCoulmnTab3.src = "sortingfinal.png";
        scope.view.imgCoulmnTab4.src = "sortingfinal.png";
        scope.view.imgCoulmnTab5.src = "sorting_previous.png";
        scope.view.imgCoulmnTab6.src = "sortingfinal.png";
        scope.moreActionSegDataMapping();
        scope.view.segLCAccountType.height = "135dp";
        scope.view.flxFooter.zIndex = 0;
        scope.revceivedGuranteeViewPermission = applicationManager.getConfigurationManager().checkUserPermission('RECEIVED_GUARANTEES_VIEW');
        scope.receivedAmendmentsPermission = applicationManager.getConfigurationManager().checkUserPermission('RECEIVED_GUARANTEES_AMENDMENTS_VIEW');
        scope.claimsViewPermission = applicationManager.getConfigurationManager().checkUserPermission('RECEIVED_GUARANTEES_CLAIMS_VIEW');
        if (scope.receivedAmendmentsPermission === true) {
          scope.view.btnTab2.setVisibility(true);
        }
        else {
          scope.view.btnTab2.setVisibility(false);
        }
        if (scope.claimsViewPermission === true) {
          scope.view.btnTab3.setVisibility(true);
        }
        else {
          scope.view.btnTab3.setVisibility(false);
        }
      }
      catch (err) {
        var errorObj = {
          "method": "postShow",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : onBreakpointChange
    * This function for changing the UI depending upon breakpoint
    * @return : NA
    */
    onBreakpointChange: function () {
      var scope = this;
      try {
        var currentBreakpoint = kony.application.getCurrentBreakpoint();
        scope.view.customheadernew.onBreakpointChangeComponent(currentBreakpoint);
        scope.view.customfooternew.onBreakpointChangeComponent(currentBreakpoint);
        scope.setDashboardData();
        scope.setHeaderi18n();
        if(scope.currentTab === AMENDMENTS_TAB){
        scope.view.flxSegHeaderAmendments.setVisibility(true);
        }
        this.view.flxSegLCHeader.forceLayout();
        if (currentBreakpoint === 1024 || orientationHandler.isTablet) {
          scope.view.flxGuaranteesOverview.height = "443dp";
          scope.view.flxVerticalEllipsis.right = "20dp";
        }
        if (currentBreakpoint === 1366 || orientationHandler.isDesktop) {
          scope.view.flxListSearchBar.top = "0dp";
          scope.view.flxGuaranteesOverview.height = "400dp";
          scope.view.flxVerticalEllipsis.right = "15dp";
          scope.view.flxVerticalEllipsis.top = "75px";
          scope.view.PaginationContainer.flxPagination.top = "0dp";
        }
      } catch (err) {
        var errorObj = {
          "method": "onBreakpointChange",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * Entry point method for the form controller
    * @param {Object} viewModel - it contains the set of view properties and keys.
    */
    updateFormUI: function (viewModel) {
      var scope = this;
      try {
        if (viewModel.isLoading === true) {
          FormControllerUtility.showProgressBar(this.view);
        } else if (viewModel.isLoading === false) {
          FormControllerUtility.hideProgressBar(this.view);
        }
        if (viewModel.ReceivedAmendments) {
          scope.guaranteesLCDetails = viewModel.ReceivedAmendments;
          scope.setDashboardData();
          scope.lcDetails = scope.guaranteesLCDetails;
        }
        if (viewModel.Guarantees) {
          if (this.view.flxCreateNewClaimPopup.isVisible) {
            this.view.CreateNewClaim.setData(viewModel.Guarantees,'issuedClaim');
          } else {
            scope.guaranteesLCDetails = viewModel.Guarantees;
            scope.newGuaranteesCount = scope.guaranteesLCDetails.reduce(function (count, item) {
              if (item.status === kony.i18n.getLocalizedString("i18n.userManagement.new")) count++;
              return count;
            }, 0);
            scope.view.btnRaiseNewAmendmentRequest.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.NewlyReceivedGTAndAmendments", false);
            scope.view.btnCreateNewAmendment.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.NewlyReceivedGTAndAmendments", false);
            if (scope.currentTab === GUARANTEES_TAB) {
              scope.setDashboardData();
            }
            scope.setRecentLCData();
            if (!isChartRendered) {
              isChartRendered = true;
              scope.customWidgets();
              scope.getStatusAndChartData();
              scope.initiateFirst = false;
            }
          }
        }
        else if (viewModel.guaranteeSrmsId && !(viewModel.amendmentSRMSRequestId) && (isRecentLCViewDetailsBtnOnClick)) {
          isRecentLCViewDetailsBtnOnClick = false;
          scope.navigateLCByID(viewModel);
        }
        if (navToLCDetails && viewModel.guaranteeSrmsId && !(viewModel.amendmentSrmsId) && !(scope.currentTab === AMENDMENTS_TAB)) {
          navToLCDetails = false;
          new kony.mvc.Navigation({
            "appName": "TradeFinanceMA",
            "friendlyName": "GuaranteesReceivedUIModule/frmGuaranteeReceivedViewDetails"
          }).navigate(viewModel);
        }
        if (navToLCDetails && (viewModel.guaranteeSrmsId && viewModel.amendmentSrmsId) && scope.currentTab === AMENDMENTS_TAB) {
          navToLCDetails = false;
          selectedRecord = viewModel;
          scope.presenter.getReceivedGuaranteeById({
            "guaranteeSrmsId": viewModel.guaranteeSrmsId
          }, "frmGuaranteesReceivedDashboard");
        }
        if (viewModel.guaranteeSrmsId && !(viewModel.amendmentSrmsId) && scope.currentTab === AMENDMENTS_TAB) {
          selectedRecord["LCDetails"] = viewModel;
          if (!isPrintNavigation) {
            new kony.mvc.Navigation({
              "appName": "TradeFinanceMA",
              "friendlyName": "GuaranteesReceivedUIModule/frmReceivedGuaranteeAmendment"
            }).navigate(selectedRecord);
          } else {
            isPrintNavigation = false;
            let dataObj = {
              lcData: selectedRecord,
              previousFormName: 'frmGuaranteesReceivedDashboard'
            };
            new kony.mvc.Navigation({
              "appName": "TradeFinanceMA",
              "friendlyName": "GuaranteesReceivedUIModule/frmPrintReceivedGuaranteeAmendments"
            }).navigate(dataObj);
          }
        }
        if (viewModel.GuaranteeClaims) {
          scope.guaranteesLCDetails = viewModel.GuaranteeClaims;
          scope.setDashboardData();
        }
        if (viewModel.showSuccessMessage) {
          this.showSuccessMessage(viewModel);
        }
        if (viewModel.serverError) {
          this.showServerError(viewModel.serverError);
        }
      } catch (err) {
        var errorObj = {
          "method": "onBreakpointChange",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : initActions
    * Method to initialise the component actions
    * @return : NA
    */
    initActions: function () {
      var scope = this;
      try {
        scope.presenter = applicationManager.getModulesPresentationController({
          appName: 'TradeFinanceMA',
          moduleName: 'GuaranteesReceivedUIModule'
        });
        //Overview methods
        scope.view.flxGuaranteesLC.setVisibility(true);
		scope.viewOrHideDashboardView(true, false);
        scope.view.btnRaiseNewAmendmentRequest.onClick = scope.setQuickLinksUI.bind(this);
		scope.view.btnCreateNewAmendment.onClick = scope.setQuickLinksUI.bind(this);
        scope.view.flxAllGuarantessAndStandbyLC.onClick = scope.segLCDropdownExpandCollapse.bind(this, "lblDropdownIcon", "flxGuaranteesDropdown");
        scope.view.flxLCCurrency.onClick = scope.segLCDropdownExpandCollapse.bind(this, "lblLCCurrency", "flxCurrencyDropdown");
        //Listing method
        scope.setFilterData();
        scope.view.flxVerticalEllipsis.onClick = scope.moreActionOnClick.bind(this);
        scope.view.tbxSearch.text = "";
        scope.view.imgClear.setVisibility(false);
        scope.view.tbxSearch.onTextChange = function () {
          if (scope.view.tbxSearch.text.length > 0) scope.view.imgClear.setVisibility(true);
          else scope.view.imgClear.setVisibility(false);
        };
        scope.view.tbxSearch.onTouchStart = function () {
          if (scope.view.flxListDropdown.isVisible === true) {
            scope.view.imgFilterDropdown.src = "arrowdown_sm.png";
            scope.view.flxListDropdown.setVisibility(false);
          }
        };
        scope.view.imgClear.onTouchEnd = function () {
          scope.view.tbxSearch.text = "";
          scope.isSearchEnabled = false;
          scope.view.imgClear.setVisibility(false);
          downloadXLSXData = "";
          scope.fetchDashboardData();
        };
        if (!kony.sdk.isNullOrUndefined(scope.view.tbxSearch.text)) {
          scope.view.imgClear.setVisibility(false);
        }
        scope.setFilterUIView();
        scope.view.flxDropDown.onClick = scope.toggleFilterDropDownVisibility.bind(this);
        scope.view.tbxSearch.onDone = scope.getSearchData;
        scope.view.btnApply.onClick = scope.applyFilters;
        scope.view.btnCancel.onClick = scope.cancelFilters.bind(this);
        scope.view.btnTab1.onClick = scope.setTabData.bind(scope, GUARANTEES_TAB);
        scope.view.btnTab2.onClick = scope.setTabData.bind(scope, AMENDMENTS_TAB);
        scope.view.btnTab3.onClick = scope.setTabData.bind(scope, CLAIMS_TAB);
        scope.view.flxGuaranteesLCMain.onClick = scope.hideFilterDropDown.bind(this);
        this.view.btnCreateNewGSLC.onClick = this.toggleCreateNewClaimPopup.bind(this, true);
        this.view.CreateNewClaim.flxClose.onClick = this.toggleCreateNewClaimPopup.bind(this, false);
        this.view.CreateNewClaim.btnClose.onClick = this.viewGuaranteeDetails;
        this.view.CreateNewClaim.btnCopyDetails.onClick = this.createNewClaim;
        this.view.btnCreateNewGTSBLC.onClick = this.toggleCreateNewClaimPopup.bind(this, true);
        this.view.flxCloseError.onClick = () => scope.view.flxErrorMessage.setVisibility(false);
        this.view.flxSuccessClose.onClick = () => scope.view.flxSuccessMessage.setVisibility(false);
		scope.view.btnBackToDashboard.onClick = scope.viewOrHideDashboardView.bind(this, true, true);
      } catch (err) {
        var errorObj = {
          "method": "initActions",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
   * @api : seti18nKeys
   * This function assigns i18n to static labels
   * @return : NA
   */
    seti18nKeys: function () {
      var scope = this;
      try {
        scope.view.btnCreateNewGTSBLC.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.createNewClaim", false);
        scope.view.btnCreateNewGSLC.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.createNewClaim", false);
        scope.view.lblBeneficiaryKey1.text = scope.presenter.renderI18nKeys("i18n.ExportLC.Applicant", true);
        scope.view.lblTypeRefKey1.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.TypeRef", true);
        scope.view.lblStatusKey1.text = scope.presenter.renderI18nKeys("i18n.billPay.Status", true);
        scope.view.lblBeneficiaryKey2.text = scope.presenter.renderI18nKeys("i18n.ExportLC.Applicant", true);
        scope.view.lblTypeRefKey2.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.TypeRef", true);
        scope.view.lblStatusKey2.text = scope.presenter.renderI18nKeys("i18n.billPay.Status", true);
        scope.view.lblNoTransaction.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.NoRecordErrMsg", false);
        scope.view.btnApply.toolTip = scope.presenter.renderI18nKeys("i18n.LocateUs.APPLY", false);
        scope.view.btnCancel.toolTip = scope.presenter.renderI18nKeys("i18n.TransfersEur.btnCancel", false);
        scope.view.btnCreateNewGTSBLC.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.createNewClaim", false);
      } catch (err) {
        var errorObj = {
          "method": "seti18nKeys",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

		 /**
         * @api : setQuickLinksUI
         * this function is responsible for QuickLinks UI
         * @return : NA
         */
        setQuickLinksUI: function(param) {
            var scope = this;
            try {
                scope.serviceParameters = {
                        searchString: "",
                        pageSize: "11",
                        pageOffset: 0,
                        sortByParam: "receivedOn",
                        sortOrder: "DESC",
                        timeParam: "receivedOn",
                        timeValue: "6,MONTH",
                        filterByValue: "",
                        filterByParam: ""
                    };
                scope.serviceParameters.filterByParam = "status";
                scope.serviceParameters.filterByValue =  scope.presenter.renderI18nKeys("i18n.userManagement.new");
                scope.fetchDashboardData();
                scope.viewOrHideDashboardView(false, false);
            } catch (err) {
                var errorObj = {
                    "level": "frmInwardCollectionsDashboardNewController",
                    "method": "setQuickLinksUI",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
		
    /**
      * @api : viewOrHideDashboardView
      * this function is responsible for setting UI for Quick Actions
      * @return : NA
      */
    viewOrHideDashboardView: function (param, isBtnClick) {
      var scope = this;
      try {
        newStatusDashboard = !param;
        scope.view.flxListingDetails.top = "20dp";
        scope.view.flxBackToDashboard.setVisibility(!param);
        scope.view.flxGuaranteesLC.setVisibility(param);
        if (param && isBtnClick)
          scope.setTabData(GUARANTEES_TAB);
      } catch (err) {
        var errorObj = {
          "method": "viewOrHideDashboardView",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
   * @api : setSegCurrencyDropdownData
   * This function sets widget data mapping for All Guarantees & Standby LC dropdown
   * @return : NA
   */
    setSegCurrencyDropdownData: function () {
      var scope = this;
      try {
        var segCurrencyData = [], i;
        scope.view.segCurrencyDropdown.widgetDataMap = {
          "flxGuaranteesDropdown": "flxGuaranteesDropdown",
          "lblLCValue": "lblLCValue",
          "lblSeparator": "lblSeparator"
        };
        for (i = 0; i < lcCurrency.length; i++) {
          segCurrencyData[i] = {
            "lblLCValue": {
              "text": lcCurrency[i] + "-" + applicationManager.getConfigurationManager().getCurrency(lcCurrency[i]),
              "toolTip": scope.presenter.renderI18nKeys("i18n.TradeFinance.AllGTSBLC", false),
              "isVisible": true,
            },
            "flxGuaranteesDropdown": {
              "onClick": scope.segLCCurrencyDropdownOnclick.bind(this),
              "isVisible": true,
            }
          };
        }
        scope.view.segCurrencyDropdown.setData(segCurrencyData);
      } catch (err) {
        var errorObj = {
          "method": "setSegCurrencyDropdownData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
   * @api : segLCCurrencyDropdownOnclick
   * This function handles onClick of each row in segLCDropdown
   * @return : NA
   */
    segLCCurrencyDropdownOnclick: function () {
      var scope = this;
      try {
        let segmentdata = JSON.parse(JSON.stringify(scope.view.segCurrencyDropdown.data));
        var rowIndex = scope.view.segCurrencyDropdown.selectedRowIndex[1];
        scope.view.btnLCCurrency.text = segmentdata[rowIndex].lblLCValue.text;
        selectedCurrency = lcCurrency[rowIndex];
        scope.view.flxCurrencyDropdown.setVisibility(false);
        scope.view.lblLCCurrency.text = "O";
        scope.setBarChartData();
        scope.setStatusData();
      } catch (err) {
        var errorObj = {
          "method": "segLCCurrencyDropdownOnclick",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
   * @api : segLCDropdownWidgetMapping
   * This function sets widget data mapping for All Guarantees & Standby LC dropdown
   * @return : NA
   */
    segLCDropdownWidgetMapping: function () {
      var scope = this;
      try {
        scope.view.segGuaranteesDropdown.widgetDataMap = {
          "flxGuaranteesDropdown": "flxGuaranteesDropdown",
          "lblLCValue": "lblLCValue",
          "lblSeparator": "lblSeparator"
        };
        var segData = [
          [
            {},
            [{
              lblLCValue: {
                text: scope.presenter.renderI18nKeys("i18n.TradeFinance.AllGTSBLC", false),
                toolTip: scope.presenter.renderI18nKeys("i18n.TradeFinance.AllGTSBLC", false),
                isVisible: true,
              },
              flxGuaranteesDropdown: {
                onClick: scope.segLCDropdownOnClick.bind(this),
                isVisible: true,
              },
            },
            {
              lblLCValue: {
                text: scope.presenter.renderI18nKeys("i18n.TradeFinance.allGuarantees", false),
                toolTip: scope.presenter.renderI18nKeys("i18n.TradeFinance.allGuarantees", false),
                isVisible: true,
              },
              flxGuaranteesDropdown: {
                onClick: scope.segLCDropdownOnClick.bind(this),
                isVisible: true,
              },
            },
            {
              lblLCValue: {
                text: scope.presenter.renderI18nKeys("i18n.TradeFinance.allStandbyLC", false),
                toolTip: scope.presenter.renderI18nKeys("i18n.TradeFinance.allStandbyLC", false),
                isVisible: true,
              },
              flxGuaranteesDropdown: {
                onClick: scope.segLCDropdownOnClick.bind(this),
                isVisible: true,
              },
            },
            ]
          ]
        ];
        scope.view.segGuaranteesDropdown.setData(segData);
      } catch (err) {
        var errorObj = {
          "method": "segLCDropdownWidgetMapping",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
   * @api : segLCDropdownOnClick
   * This function handles onClick of each row in segLCDropdown
   * @return : NA
   */
    segLCDropdownOnClick: function () {
      var scope = this;
      try {
        let segmentdata = JSON.parse(JSON.stringify(scope.view.segGuaranteesDropdown.data));
        var rowIndex = scope.view.segGuaranteesDropdown.selectedRowIndex[1];
        if (rowIndex === 0) {
          scope.view.btnAllGuaranteesAndStandbyLC.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.AllGTSBLC", false);
          productType = "AllGuaranteesAndStandbyLC";
        } else if (rowIndex === 1) {
          scope.view.btnAllGuaranteesAndStandbyLC.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.allGuarantees", false);
          productType = "Guarantee";
        } else if (rowIndex === 2) {
          scope.view.btnAllGuaranteesAndStandbyLC.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.allStandbyLC", false);
          productType = "StandBy LC";
        }
        scope.view.flxGuaranteesDropdown.setVisibility(false);
        scope.view.lblDropdownIcon.text = "O";
        scope.setBarChartData();
        scope.setStatusData();
      } catch (err) {
        var errorObj = {
          "method": "segLCDropdownOnClick",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
   * @api : segLCDropdownExpandCollapse
   * This function handles expand and collapse of segLCDropdown
   * @return : NA
   */
    segLCDropdownExpandCollapse: function (labelID, flxID) {
      var scope = this;
      try {
        if (scope.view[labelID].text === "O") {
          scope.view[flxID].setVisibility(true);
          scope.view[labelID].text = "P";
        } else {
          scope.view[flxID].setVisibility(false);
          scope.view[labelID].text = "O";
        }
      } catch (err) {
        var errorObj = {
          "method": "segLCDropdownExpandCollapse",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
   * @api : customWidgets
   * Method to invoke on barchart add       
   * @return : NA
   */
    customWidgets: function () {
      var scope = this;
      try {
        var data = [];
        var options = {
          title: '',
          height: 200,
          width: 200,
          legend: {
            position: 'none'
          },
          isStacked: true,
          bar: {
            groupWidth: "50%"
          },
          vAxis: {
            gridlines: {
              color: "#F6F6F6"
            },
            viewWindow: {
              min: 0
            },
            format: "short"
          },
          widgetId: 'stacked_barChart_div'
        };
        if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
          options.width = 380;
        } else if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
          options.width = 600;
        } else if (kony.application.getCurrentBreakpoint() === 1366 || orientationHandler.isDesktop) {
          options.width = 650;
        }
        var BarChart = new kony.ui.CustomWidget({
          "id": "GuaranteesBarchart",
          "isVisible": true,
          "left": "80dp",
          "top": "20dp",
          "width": "800dp",
          "height": "300dp",
          "zIndex": 1
        }, {
          "padding": [0, 0, 0, 0],
          "paddingInPixel": false
        }, {
          "widgetName": "VerticalBarChart",
          "chartData": data,
          "chartProperties": options,
          "OnClickOfBar": function (data) {

          }
        });
        this.view.flxBarGraphMain.add(BarChart);
        this.customWidgetAdded = true;
      } catch (err) {
        var errorObj = {
          "method": "customWidgets",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : getStatusAndChartData
    * This function fetches all data based on status and Bill type
    * @return : NA
    */
    getStatusAndChartData: function () {
      var scope = this;
      try {
        mixedTotalAmount = {
          "totalAmount": {
            "AllGuaranteesAndStandbyLC": {},
            "Guarantee": {},
            "StandBy LC": {}
          },
        };
        chartAndStatusData = scope.guaranteesLCDetails.reduce(function (acc, res) {
          let key = res['lcType'];
          let status = res['status'] ? res['status'] : "";
          let currency = res['currency'] ? res['currency'] : "USD";
          let lcProductType = res['productType'];
          if (!acc[key]) {
            acc[key] = {};
            acc[key] = {
              "totalAmount": {
                "AllGuaranteesAndStandbyLC": {},
                "Guarantee": {},
                "StandBy LC": {}
              }
            };
          }
          if (!acc[status]) {
            acc[status] = {};
            acc[status] = {
              "totalAmount": {
                "AllGuaranteesAndStandbyLC": {},
                "Guarantee": {},
                "StandBy LC": {}
              },
              "count": {
                "AllGuaranteesAndStandbyLC": {},
                "Guarantee": {},
                "StandBy LC": {}
              }
            };
          }
          if (!acc[key]["totalAmount"]["AllGuaranteesAndStandbyLC"][currency]) {
            acc[key]["totalAmount"]["AllGuaranteesAndStandbyLC"][currency] = 0;
            acc[key]["totalAmount"]["Guarantee"][currency] = 0;
            acc[key]["totalAmount"]["StandBy LC"][currency] = 0;
          }
          if (mixedTotalAmount["totalAmount"]["AllGuaranteesAndStandbyLC"][currency] === undefined || mixedTotalAmount["totalAmount"]["Guarantee"][currency] === undefined || mixedTotalAmount["totalAmount"]["StandBy LC"][currency] === undefined) {
            mixedTotalAmount["totalAmount"]["AllGuaranteesAndStandbyLC"][currency] = 0;
            mixedTotalAmount["totalAmount"]["Guarantee"][currency] = 0;
            mixedTotalAmount["totalAmount"]["StandBy LC"][currency] = 0;
          }
          mixedTotalAmount["totalAmount"]["AllGuaranteesAndStandbyLC"][currency] = mixedTotalAmount["totalAmount"]["AllGuaranteesAndStandbyLC"][currency] + (res['amount'] && (res['amount'] !== "" || res['amount'] !== " ") ? parseFloat(res['amount']) : 0);
          acc[key]["totalAmount"]["AllGuaranteesAndStandbyLC"][currency] = acc[key]["totalAmount"]["AllGuaranteesAndStandbyLC"][currency] + (res['amount'] && (res['amount'] !== "" || res['amount'] !== " ") ? parseFloat(res['amount']) : 0);
          if ((lcProductType).toLowerCase() === (OLBConstants.GUARANTEE_LC_PRODUCT_TYPE.GUARANTEE).toLowerCase()) {
            mixedTotalAmount["totalAmount"]["Guarantee"][currency] = mixedTotalAmount["totalAmount"]["Guarantee"][currency] + (res['amount'] && (res['amount'] !== "" || res['amount'] !== " ") ? parseFloat(res['amount']) : 0);
            acc[key]["totalAmount"]["Guarantee"][currency] = acc[key]["totalAmount"]["Guarantee"][currency] + (res['amount'] && (res['amount'] !== "" || res['amount'] !== " ") ? parseFloat(res['amount']) : 0);
          } else if ((lcProductType).toLowerCase() === (OLBConstants.GUARANTEE_LC_PRODUCT_TYPE.STANDBY_LC).toLowerCase()) {
            mixedTotalAmount["totalAmount"]["StandBy LC"][currency] = mixedTotalAmount["totalAmount"]["StandBy LC"][currency] + (res['amount'] && (res['amount'] !== "" || res['amount'] !== " ") ? parseFloat(res['amount']) : 0);
            acc[key]["totalAmount"]["StandBy LC"][currency] = acc[key]["totalAmount"]["StandBy LC"][currency] + (res['amount'] && (res['amount'] !== "" || res['amount'] !== " ") ? parseFloat(res['amount']) : 0);
          }
          if (!acc[status]["count"]["AllGuaranteesAndStandbyLC"][currency]) {
            acc[status]["totalAmount"]["AllGuaranteesAndStandbyLC"][currency] = 0;
            acc[status]["totalAmount"]["Guarantee"][currency] = 0;
            acc[status]["totalAmount"]["StandBy LC"][currency] = 0;
            acc[status]["count"]["AllGuaranteesAndStandbyLC"][currency] = 0;
            acc[status]["count"]["Guarantee"][currency] = 0;
            acc[status]["count"]["StandBy LC"][currency] = 0;
          }
          acc[status]["totalAmount"]["AllGuaranteesAndStandbyLC"][currency] = acc[status]["totalAmount"]["AllGuaranteesAndStandbyLC"][currency] + (res['amount'] && (res['amount'] !== "" || res['amount'] !== " ") ? parseFloat(res['amount']) : 0);
          acc[status]["count"]["AllGuaranteesAndStandbyLC"][currency] = acc[status]["count"]["AllGuaranteesAndStandbyLC"][currency] + 1;
          if ((lcProductType).toLowerCase() === (OLBConstants.GUARANTEE_LC_PRODUCT_TYPE.GUARANTEE).toLowerCase()) {
            acc[status]["totalAmount"]["Guarantee"][currency] = acc[status]["totalAmount"]["Guarantee"][currency] + (res['amount'] && (res['amount'] !== "" || res['amount'] !== " ") ? parseFloat(res['amount']) : 0);
            acc[status]["count"]["Guarantee"][currency] = acc[status]["count"]["Guarantee"][currency] + 1;
          } else if ((lcProductType).toLowerCase() === (OLBConstants.GUARANTEE_LC_PRODUCT_TYPE.STANDBY_LC).toLowerCase()) {
            acc[status]["totalAmount"]["StandBy LC"][currency] = acc[status]["totalAmount"]["StandBy LC"][currency] + (res['amount'] && (res['amount'] !== "" || res['amount'] !== " ") ? parseFloat(res['amount']) : 0);
            acc[status]["count"]["StandBy LC"][currency] = acc[status]["count"]["StandBy LC"][currency] + 1;
          }
          return acc;
        }, {});
        for (let i = 0; i < guaranteesAndStandByLCStatus.length; i++) {
          statusData[guaranteesAndStandByLCStatus[i].DisplayStatus] = {};
          statusData[guaranteesAndStandByLCStatus[i].DisplayStatus] = {
            "totalAmount": {
              "AllGuaranteesAndStandbyLC": {},
              "Guarantee": {},
              "StandBy LC": {}
            },
            "count": {
              "AllGuaranteesAndStandbyLC": {},
              "Guarantee": {},
              "StandBy LC": {}
            }
          };
          for (let j = 0; j < guaranteesAndStandByLCStatus[i].LCStatus.length; j++) {
            for (let k = 0; k < Object.keys(chartAndStatusData).length; k++)
              if ((guaranteesAndStandByLCStatus[i].LCStatus[j]).toLowerCase() === (Object.keys(chartAndStatusData)[k]).toLowerCase()) {
                guaranteesAndStandByLCStatus[i].LCStatus[j] = Object.keys(chartAndStatusData)[k];
                for (let l = 0; l < lcCurrency.length; l++) {
                  if (!statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["totalAmount"]["AllGuaranteesAndStandbyLC"][lcCurrency[l]])
                    statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["totalAmount"]["AllGuaranteesAndStandbyLC"][lcCurrency[l]] = 0;
                  statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["totalAmount"]["AllGuaranteesAndStandbyLC"][lcCurrency[l]] = statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["totalAmount"]["AllGuaranteesAndStandbyLC"][lcCurrency[l]] + chartAndStatusData[guaranteesAndStandByLCStatus[i].LCStatus[j]]["totalAmount"]["AllGuaranteesAndStandbyLC"][lcCurrency[l]];
                  if (!statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["totalAmount"]["Guarantee"][lcCurrency[l]])
                    statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["totalAmount"]["Guarantee"][lcCurrency[l]] = 0;
                  statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["totalAmount"]["Guarantee"][lcCurrency[l]] = statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["totalAmount"]["Guarantee"][lcCurrency[l]] + chartAndStatusData[guaranteesAndStandByLCStatus[i].LCStatus[j]]["totalAmount"]["Guarantee"][lcCurrency[l]];
                  if (!statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["totalAmount"]["StandBy LC"][lcCurrency[l]])
                    statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["totalAmount"]["StandBy LC"][lcCurrency[l]] = 0;
                  statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["totalAmount"]["StandBy LC"][lcCurrency[l]] = statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["totalAmount"]["StandBy LC"][lcCurrency[l]] + chartAndStatusData[guaranteesAndStandByLCStatus[i].LCStatus[j]]["totalAmount"]["StandBy LC"][lcCurrency[l]];
                  if (!statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["count"]["AllGuaranteesAndStandbyLC"][lcCurrency[l]])
                    statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["count"]["AllGuaranteesAndStandbyLC"][lcCurrency[l]] = 0;
                  statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["count"]["AllGuaranteesAndStandbyLC"][lcCurrency[l]] = statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["count"]["AllGuaranteesAndStandbyLC"][lcCurrency[l]] + chartAndStatusData[guaranteesAndStandByLCStatus[i].LCStatus[j]]["count"]["AllGuaranteesAndStandbyLC"][lcCurrency[l]];
                  if (!statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["count"]["Guarantee"][lcCurrency[l]])
                    statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["count"]["Guarantee"][lcCurrency[l]] = 0;
                  statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["count"]["Guarantee"][lcCurrency[l]] = statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["count"]["Guarantee"][lcCurrency[l]] + chartAndStatusData[guaranteesAndStandByLCStatus[i].LCStatus[j]]["count"]["Guarantee"][lcCurrency[l]];
                  if (!statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["count"]["StandBy LC"][lcCurrency[l]])
                    statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["count"]["StandBy LC"][lcCurrency[l]] = 0;
                  statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["count"]["StandBy LC"][lcCurrency[l]] = statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["count"]["StandBy LC"][lcCurrency[l]] + chartAndStatusData[guaranteesAndStandByLCStatus[i].LCStatus[j]]["count"]["StandBy LC"][lcCurrency[l]];
                }
              }
          }
        }
        scope.setBarChartData();
        scope.setStatusData();
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesReceivedDashboardController",
          "method": "getStatusAndChartData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
   * @api : setHeaderi18n
   * To set i18nkeys for Listing Document
   * @return : NA
   */
    setHeaderi18n: function () {
      var scope = this;
      try {
        scope.view.btnCoulmnTab1.text = scope.presenter.renderI18nKeys("i18n.ExportLC.Applicant", false);
        scope.view.btnCoulmnTab2.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.productType", false);
        scope.view.btnCoulmnTab3.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.GTAndSlbc", false);
        scope.view.btnCoulmnTab4.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.TransactionRef", false);
        scope.view.btnCoulmnTab5.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.ReceivedOn", false);
        scope.view.btnCoulmnTab6.text = scope.presenter.renderI18nKeys("i18n.konybb.manageUser.Status", false);
        scope.view.btnCoulmnTab7.text = scope.presenter.renderI18nKeys("i18n.wireTransfers.Actions", false);
      } catch (err) {
        var errorObj = {
          "method": "setHeaderi18n",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : setBarChartData
    * Sets data to chart
    * @return : NA
    */
    setBarChartData: function () {
      var scope = this;
      try {
        var data = [];
        var i, j, isBillPayPresent = false,
          position;
        billTypeLength = billType.length;
        for (j = 0; j < billTypeLength && billType[j].type !== "Mixed"; j++) {
          for (i = 0; i < Object.keys(chartAndStatusData).length; i++) {
            if (Object.keys(chartAndStatusData)[i] === billType[j].type) {
              isBillPayPresent = true;
            }
          }
          var barData = {
            "allocatedAmount": "",
            "amountSpent": "",
            "budgetId": "1",
            "categoryId": "1",
            "categoryName": "",
            "errmsg": null,
            "budget1": 0,
            "budget1ColorCode": "",
            "budget1AnnotationText": "",
            "budget1TooltipText": "",
            "budget2": 0,
            "budget2TooltipText": "",
            "budget2ColorCode": "",
            "budget2AnnotationText": "",
            "budget3": -1,
            "budget3ColorCode": "",
            "budget3TooltipText": ""
          }
          if (isBillPayPresent) {
            barData.categoryName = billType[j].type;
            barData.budget1 = 0;
            barData.budget1ColorCode = billType[j].colorCode;
            barData.budget2 = chartAndStatusData[billType[j].type]["totalAmount"][productType][selectedCurrency];
            barData.budget2ColorCode = "color:" + billType[j].colorCode + ";" + "opacity:0.5";
            barData.budget1TooltipText = billType[j].type + "\n" + kony.i18n.getLocalizedString("i18n.TradeFinance.totalLimit") + " : " + formatUtil.formatAmountandAppendCurrencySymbol(JSON.stringify(chartAndStatusData[billType[j].type]["totalAmount"][productType][selectedCurrency]), selectedCurrency) + "\n" + kony.i18n.getLocalizedString("i18n.TradeFinance.availBal") + " : " + formatUtil.formatAmountandAppendCurrencySymbol(JSON.stringify(chartAndStatusData[billType[j].type]["totalAmount"][productType][selectedCurrency]), selectedCurrency) + "\n" + kony.i18n.getLocalizedString("i18n.TradeFinance.utilized") + " : " + formatUtil.formatAmountandAppendCurrencySymbol("0", selectedCurrency);
            barData.budget2TooltipText = billType[j].type + "\n" + kony.i18n.getLocalizedString("i18n.TradeFinance.totalLimit") + " : " + formatUtil.formatAmountandAppendCurrencySymbol(JSON.stringify(chartAndStatusData[billType[j].type]["totalAmount"][productType][selectedCurrency]), selectedCurrency) + "\n" + kony.i18n.getLocalizedString("i18n.TradeFinance.availBal") + " : " + formatUtil.formatAmountandAppendCurrencySymbol(JSON.stringify(chartAndStatusData[billType[j].type]["totalAmount"][productType][selectedCurrency]), selectedCurrency) + "\n" + kony.i18n.getLocalizedString("i18n.TradeFinance.utilized") + " : " + formatUtil.formatAmountandAppendCurrencySymbol("0", selectedCurrency);
          } else {
            barData.categoryName = billType[j].type;
            barData.budget1 = 0;
            barData.budget1ColorCode = billType[j].colorCode;
            barData.budget2 = 0;
            barData.budget2ColorCode = "color:" + billType[j].colorCode + ";" + "opacity:0.5";
            barData.budget1TooltipText = billType[j].type + "\n" + kony.i18n.getLocalizedString("i18n.TradeFinance.totalLimit") + ":" + formatUtil.formatAmountandAppendCurrencySymbol("0", selectedCurrency) + "\n" + kony.i18n.getLocalizedString("i18n.TradeFinance.availBal") + ":" + formatUtil.formatAmountandAppendCurrencySymbol("0", selectedCurrency) + "\n" + kony.i18n.getLocalizedString("i18n.TradeFinance.utilized") + ":" + "0";
            barData.budget2TooltipText = billType[j].type + "\n" + kony.i18n.getLocalizedString("i18n.TradeFinance.totalLimit") + ":" + formatUtil.formatAmountandAppendCurrencySymbol("0", selectedCurrency) + "\n" + kony.i18n.getLocalizedString("i18n.TradeFinance.availBal") + ":" + formatUtil.formatAmountandAppendCurrencySymbol("0", selectedCurrency) + "\n" + kony.i18n.getLocalizedString("i18n.TradeFinance.utilized") + ":" + formatUtil.formatAmountandAppendCurrencySymbol("0", selectedCurrency);
          }
          data.push(barData);
          isBillPayPresent = false;
        }
        var barData = {
          "allocatedAmount": "",
          "amountSpent": "",
          "budgetId": "1",
          "categoryId": "1",
          "categoryName": kony.i18n.getLocalizedString("i18n.TradeFinance.mixed"),
          "errmsg": null,
          "budget1": 0,
          "budget1ColorCode": "#B339E2",
          "budget1AnnotationText": "",
          "budget1TooltipText": kony.i18n.getLocalizedString("i18n.TradeFinance.mixed") + "\n" + kony.i18n.getLocalizedString("i18n.TradeFinance.totalLimit") + " : " + formatUtil.formatAmountandAppendCurrencySymbol(JSON.stringify(mixedTotalAmount["totalAmount"][productType][selectedCurrency]), selectedCurrency) + "\n" + kony.i18n.getLocalizedString("i18n.TradeFinance.availBal") + " : " + formatUtil.formatAmountandAppendCurrencySymbol(JSON.stringify(mixedTotalAmount["totalAmount"][productType][selectedCurrency]), selectedCurrency) + "\n" + kony.i18n.getLocalizedString("i18n.TradeFinance.utilized") + " : " + formatUtil.formatAmountandAppendCurrencySymbol("0", selectedCurrency),
          "budget2": mixedTotalAmount["totalAmount"][productType][selectedCurrency],
          "budget2TooltipText": kony.i18n.getLocalizedString("i18n.TradeFinance.mixed") + "\n" + kony.i18n.getLocalizedString("i18n.TradeFinance.totalLimit") + " : " + formatUtil.formatAmountandAppendCurrencySymbol(JSON.stringify(mixedTotalAmount["totalAmount"][productType][selectedCurrency]), selectedCurrency) + "\n" + kony.i18n.getLocalizedString("i18n.TradeFinance.availBal") + " : " + formatUtil.formatAmountandAppendCurrencySymbol(JSON.stringify(mixedTotalAmount["totalAmount"][productType][selectedCurrency]), selectedCurrency) + "\n" + kony.i18n.getLocalizedString("i18n.TradeFinance.utilized") + " : " + formatUtil.formatAmountandAppendCurrencySymbol("0", selectedCurrency),
          "budget2ColorCode": "color:#B339E2;opacity:0.5",
          "budget2AnnotationText": "",
          "budget3": -1,
          "budget3ColorCode": "",
          "budget3TooltipText": ""
        }
        data.push(barData);
        scope.view.flxBarGraphMain.GuaranteesBarchart.chartData = data;
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesReceivedDashboardController",
          "method": "setBarChartData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : setStatusData
    * This function assigns the Status Fields related data
    * @return : NA
    */
    setStatusData: function () {
      var scope = this;
      try {
        let i, j, widgetStatus = "lblStatus",
          widgetStatusCount = "lblStatusCount",
          widgetStatusAmount = "lblStatusAmount";
        for (i = 0; i < guaranteesAndStandByLCStatus.length; i++) {
          scope.view[widgetStatus + i].text = guaranteesAndStandByLCStatus[i].DisplayStatus;
          scope.view[widgetStatusCount + i].text = statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["count"][productType][selectedCurrency] ? JSON.stringify(statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["count"][productType][selectedCurrency]) : "0";
          scope.view[widgetStatusAmount + i].text = statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["totalAmount"][productType][selectedCurrency] ? formatUtil.formatAmountandAppendCurrencySymbol(JSON.stringify(statusData[guaranteesAndStandByLCStatus[i].DisplayStatus]["totalAmount"][productType][selectedCurrency]), selectedCurrency) : formatUtil.formatAmountandAppendCurrencySymbol("0", selectedCurrency);
          if (scope.view[widgetStatusAmount + i].text.length > 13) {
            scope.view[widgetStatusAmount + i].top = "10px";
            scope.view[widgetStatusAmount + i].skin = "bbSknLbl424242SSP15Px";
          }
        }
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesReceivedDashboardController",
          "method": "setStatusData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : setRecentLCData
    * This function sets Data for the Recent LC Section
    * @return : NA
    */
    setRecentLCData: function () {
      var scope = this;
      try {
        if (!kony.sdk.isNullOrUndefined(scope.guaranteesLCDetails[0])) {
          scope.view.lblBeneficiaryValue1.text = scope.guaranteesLCDetails[0].applicantName ? scope.guaranteesLCDetails[0].applicantName : NA;
          scope.view.lblTypeRefValue1.text = scope.guaranteesLCDetails[0].productType ? scope.guaranteesLCDetails[0].productType + " - " + scope.guaranteesLCDetails[0].guaranteeSrmsId : NA;
          scope.view.lblStatusValue1.text = scope.guaranteesLCDetails[0].status ? scope.guaranteesLCDetails[0].status : NA;
          scope.view.btnRecentViewDetails1.text = scope.guaranteesLCDetails[0].status === "Draft" ? kony.i18n.getLocalizedString("i18n.ImportLC.ContinueEditing") : kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
            scope.view.btnRecentViewDetails1.onClick = scope.getGTLCByID.bind(this, "btnRecentViewDetails1");
        } else {
          scope.view.lblBeneficiaryValue1.text = NA;
          scope.view.lblTypeRefValue1.text = NA;
          scope.view.lblStatusValue1.text = NA;
        }
        if (!kony.sdk.isNullOrUndefined(scope.guaranteesLCDetails[1])) {
          scope.view.lblBeneficiaryValue2.text = scope.guaranteesLCDetails[1].applicantName ? scope.guaranteesLCDetails[1].applicantName : NA;
          scope.view.lblTypeRefValue2.text = scope.guaranteesLCDetails[1].productType ? scope.guaranteesLCDetails[1].productType + " - " + scope.guaranteesLCDetails[1].guaranteeSrmsId : NA;
          scope.view.lblStatusValue2.text = scope.guaranteesLCDetails[1].status ? scope.guaranteesLCDetails[1].status : NA;
          scope.view.btnRecentViewDetails2.text = scope.guaranteesLCDetails[1].status === "Draft" ? kony.i18n.getLocalizedString("i18n.ImportLC.ContinueEditing") : kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
            scope.view.btnRecentViewDetails2.onClick = scope.getGTLCByID.bind(this, "btnRecentViewDetails2");
        } else {
          scope.view.lblBeneficiaryValue2.text = NA;
          scope.view.lblTypeRefValue2.text = NA;
          scope.view.lblStatusValue2.text = NA;
        }
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "setRecentLCData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : getGTLCByID
    * This function handles onclick of View Details in Recent LC section
    * @return : NA
    */
    getGTLCByID: function (btnID) {
      var scope = this;
      var serviceParamGetLCByID = {};
      try {
        isRecentLCViewDetailsBtnOnClick = true;
        if (btnID === "btnRecentViewDetails1") {
          serviceParamGetLCByID["guaranteeSrmsId"] = scope.guaranteesLCDetails[0].guaranteeSrmsId;
        } else if (btnID === "btnRecentViewDetails2") {
          serviceParamGetLCByID["guaranteeSrmsId"] = scope.guaranteesLCDetails[1].guaranteeSrmsId;
        }
        if (scope.view[btnID].text === kony.i18n.getLocalizedString("i18n.common.ViewDetails"))
          lcByIDNav = "viewDetails";
        scope.presenter.getReceivedGuaranteeById(serviceParamGetLCByID, "frmGuaranteesReceivedDashboard");
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "getGTLCByID",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
   * @api : setTabData
   * To set segment data for tab on button click
   * @return : NA
   */
    setTabData: function (tabName) {
      var scope = this;
      try {
        scope.currentTab = tabName;
		scope.setDefaultValueForDownloadCriteria();
        scope.setTabNavigation();
      } catch (err) {
        var errorObj = {
          "method": "setTabData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
   * @api : applyFilters
   * Applies the filter values for filtering the data
   * @return : NA
   */
    applyFilters: function () {
      var scope = this;
      try {
        let filterByValue = [];
        let filterByParam = [];
        let timeValue = "";
        scope.serviceParameters.sortByParam = "";
        scope.serviceParameters.sortOrder = "";
        let pageOffset = this.view.PaginationContainer.getPageOffset();
        let selectedFilterCount = 0;
        for (var i = 1; i < scope.view.segLCAccountType.data.length; i++) {
          if (scope.view.segLCAccountType.data[i].lblLCCheckbox.text === "C") {
            filterByValue.push(scope.view.segLCAccountType.data[i].lblLCAccountType.key);
            filterByParam.push("productType");
            selectedFilterCount++;
          }
        }
        for (var i = 1; i < scope.view.segBillType.data.length; i++) {
          if (scope.view.segBillType.data[i].lblLCCheckbox.text === "C") {
            filterByValue.push(scope.view.segBillType.data[i].lblStatusType.key);
            if (scope.currentTab === GUARANTEES_TAB) {
              filterByParam.push("lcType");
            } else if (scope.currentTab === AMENDMENTS_TAB) {
              filterByParam.push("lcType");
            } else if (scope.currentTab === CLAIMS_TAB) {
              filterByParam.push("guaranteeAndSBLCType");
            }
            selectedFilterCount++;
          }
        }
        for (var i = 1; i < scope.view.segLCStatusType.data.length; i++) {
          if (scope.view.segLCStatusType.data[i].lblLCCheckbox.text === "C") {
            filterByValue.push(scope.view.segLCStatusType.data[i].lblStatusType.key);
            if (scope.currentTab === GUARANTEES_TAB || scope.currentTab === CLAIMS_TAB) {
              filterByParam.push("status");
            } else if (scope.currentTab === AMENDMENTS_TAB) {
              filterByParam.push("status");
            }
            selectedFilterCount++;
          }
        }
        for (var i = 0; i < scope.view.segTimePeriods.data.length; i++) {
          if (scope.view.segTimePeriods.data[i].lblLCCheckbox.text === "M") {
            switch (scope.view.segTimePeriods.data[i].lblFeatureName.text) {
              case "Last Six Months":
                timeValue = "6,MONTH";
                break;
              case "Today":
                timeValue = "1,DAY";
                break;
              case "Last One Month":
                timeValue = "1,MONTH";
                break;
              case "Last One Year":
                timeValue = "1,YEAR";
                break;
              case "YTD":
                var dt = new Date();
                var current = new Date(dt.getTime());
                var previous = new Date(dt.getFullYear(), 0, 1);
                timeValue = (Math.ceil((current - previous + 1) / 86400000)) + ",DAYS";
                break;
            }
            selectedFilterCount++;
          }
        }
        scope.isFilterApplied = true;
        scope.view.flxListDropdown.setVisibility(false);
        scope.view.imgFilterDropdown.src = "arrowdown_sm.png";
        scope.segFilter1Data = scope.view.segLCAccountType.data;
        scope.segFilter2Data = scope.view.segBillType.data;
        scope.segFilter3Data = scope.view.segLCStatusType.data;
        scope.segFilter4Data = scope.view.segTimePeriods.data;
        if (scope.segFilter1Data[0].lblLCCheckbox.text === "C" && scope.segFilter2Data[0].lblLCCheckbox.text === "C" && scope.segFilter3Data[0].lblLCCheckbox.text === "C") {
          scope.view.lblFilterText.text = scope.presenter.renderI18nKeys("i18n.konybb.Common.All", false);
        } else {
          scope.view.lblFilterText.text = scope.presenter.renderI18nKeys("i18n.ProfileManagement.Selected", false) + "(" + selectedFilterCount + ")";
        }
        scope.view.forceLayout();
        filterByValue = filterByValue.join(',');
        filterByParam = filterByParam.join(',');
        filterByValue.substring(1, filterByValue.length);
        let timeParam = "";
        if (scope.currentTab === AMENDMENTS_TAB) {
          timeParam = "receivedOn";
        } else if (scope.currentTab === GUARANTEES_TAB) {
          timeParam = "receivedOn";
        } else if (scope.currentTab === CLAIMS_TAB) {
          timeParam = "serviceRequestTime";
        }
        scope.serviceParameters.filterByValue = filterByValue;
        scope.serviceParameters.filterByParam = filterByParam;
        scope.serviceParameters.timeParam = timeParam;
        scope.serviceParameters.timeValue = timeValue;
        if (scope.currentTab === AMENDMENTS_TAB) {
          scope.serviceParameters.sortByParam = "receivedOn";
        } else if (scope.currentTab === GUARANTEES_TAB) {
          scope.serviceParameters.sortByParam = "receivedOn";
        } else if (scope.currentTab === CLAIMS_TAB) {
          scope.serviceParameters.sortByParam = "serviceRequestTime";
        }
        downloadXLSXData = scope.serviceParameters;
        scope.fetchDashboardData();
      } catch (err) {
        var errorObj = {
          "method": "applyFilters",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
   * @api : getSearchData
   * Gets on search
   * @return : NA
   */
    getSearchData: function () {
      var scope = this;
      try {
        var searchString = this.view.tbxSearch.text;
        this.lowerLimit = 1;
        scope.view.PaginationContainer.setPageSize(10);
        if (searchString !== null && searchString !== undefined) {
          this.isSearchEnabled = true;
          if (scope.currentTab === GUARANTEES_TAB) {
            scope.serviceParameters.pageSize = "11";
            scope.serviceParameters.pageOffset = "0";
            scope.serviceParameters.searchString = searchString;
            scope.presenter.getReceivedGuarantees(scope.serviceParameters, "frmGuaranteesReceivedDashboard");
          } else if (scope.currentTab === AMENDMENTS_TAB) {
            scope.serviceParameters.pageSize = "11";
            scope.serviceParameters.pageOffset = "0";
            scope.serviceParameters.searchString = searchString;
            scope.presenter.getReceivedGuaranteesAmendments(scope.serviceParameters, "frmGuaranteesReceivedDashboard");
          } else if (scope.currentTab === CLAIMS_TAB) {
            scope.serviceParameters.pageSize = "11";
            scope.serviceParameters.pageOffset = "0";
            scope.serviceParameters.searchString = searchString;
            scope.presenter.getGuaranteeClaims(scope.serviceParameters, "frmGuaranteesReceivedDashboard");
          }
          downloadXLSXData = scope.serviceParameters;
        } else {
          this.isSearchEnabled = false;
        }
      }
      catch (err) {
        var errorObj = {
          "method": "getSearchData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
   * @api : fetchDashboardData
   * This method will invoked to fetch the dashboard data 
   * @return : NA
   */
    fetchDashboardData: function (params) {
      try {
        var scope = this;
        if (params !== 'pagination' && params !== "sort") {
          scope.view.PaginationContainer.setLowerLimit(1);
          scope.view.PaginationContainer.setPageSize(10);
          scope.view.PaginationContainer.setIntervalHeader();
        }
        var searchStringtext = scope.view.tbxSearch.text;
        var pageOffsetValue = (params === "pagination" || params === "sort") ? scope.view.PaginationContainer.getPageOffset() : 0;
        scope.serviceParameters.searchString = searchStringtext;
        scope.serviceParameters.pageOffset = JSON.stringify(pageOffsetValue);
        if (scope.currentTab === GUARANTEES_TAB) {
          scope.serviceParameters.pageSize = "11";
          scope.serviceParameters.timeParam = "receivedOn";
          if (!scope.serviceParameters.timeValue)
            scope.serviceParameters.timeValue = "6,MONTH";
          if (!isChartRendered) {
            scope.serviceParameters = {
              "searchString": "",
              "pageSize": "",
              "pageOffset": "",
              "sortByParam": "receivedOn",
              "sortOrder": "DESC",
              "timeParam": "",
              "timeValue": "",
              "filterByValue": "",
              "filterByParam": ""
            };
          }
          scope.presenter.getReceivedGuarantees(scope.serviceParameters, "frmGuaranteesReceivedDashboard");
        } else if (scope.currentTab === AMENDMENTS_TAB) {
          scope.presenter.getReceivedGuaranteesAmendments(scope.serviceParameters, "frmGuaranteesReceivedDashboard");
        } else if (scope.currentTab === CLAIMS_TAB) {
          scope.presenter.getGuaranteeClaims(scope.serviceParameters, "frmGuaranteesReceivedDashboard");
        }
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesReceivedDashboardController",
          "method": "fetchDashboardData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : cancelFilters
    * This metod will invoked on cancel of filters
    * @return : NA
    */
    cancelFilters: function () {
      var scope = this;
      try {
        scope.view.flxListDropdown.setVisibility(false);
        scope.view.imgFilterDropdown.src = "arrowdown_sm.png";
        scope.setDefaultValueForDownloadCriteria();
      } catch (err) {
        var errorObj = {
          "method": "cancelFilters",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
   * @api : setDefaultValueForDownloadCriteria
   * To remove all the filter Critera and set the downloadXLSXData to default values
   * @return : NA
   */
    setDefaultValueForDownloadCriteria: function () {
      var scope = this;
      try {
        downloadXLSXData = {
          "searchString": "",
          "pageSize": "",
          "pageOffset": "",
          "sortByParam": "",
          "sortOrder": "",
          "timeParam": "",
          "timeValue": "",
          "filterByValue": "",
          "filterByParam": ""
        };
      } catch (err) {
        var errorObj = {
          "method": "setDefaultValueForDownloadCriteria",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
   * @api : setFilterData
   * To set filter segment data
   * @return : NA
   */
    setFilterData: function () {
      var scope = this;
      try {
        scope.view.imgAccountLCDropdown.src = "arrowup_sm.png";
        scope.view.flxAccountLCDropdownImage.onClick = scope.onActionClickFilterSegment.bind(this, "segLCAccountType", "imgAccountLCDropdown");
        scope.view.imgStatusLCDropdown.src = "arrowup_sm.png";
        scope.view.flxStatusLCDropdownImage.onClick = scope.onActionClickFilterSegment.bind(this, "segLCStatusType", "imgStatusLCDropdown");
        scope.view.imgTimePeriodDropdown.src = "arrowup_sm.png";
        scope.view.imgBillTypeDropdown.src = "arrowup_sm.png";
        scope.view.flxBillTypeDropdownImage.onClick = scope.onActionClickFilterSegment.bind(this, "segBillType", "imgBillTypeDropdown");
        scope.view.flxTimePeriodDropdownImage.onClick = scope.onActionClickFilterSegment.bind(this, "segTimePeriods", "imgTimePeriodDropdown");
      } catch (err) {
        var errorObj = {
          "method": "setFilterData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
   * @api : onActionClickFilterSegment
   * This method handles expand collapse of filter dropdowns
   * @return : NA
   */
    onActionClickFilterSegment: function (segmentName, imageName) {
      var scope = this;
      try {
        if (scope.view[imageName].src === "arrowup_sm.png") {
          scope.view[segmentName].setVisibility(false);
          if (segmentName === "segLCAccountType") {
            scope.view.flxLCTypeHeadingSeparator.setVisibility(false);
          }
          if (segmentName === "segBillType") {
            scope.view.flxBillTypeHeadingSeparartor.setVisibility(false);
          }
          if (segmentName === "segLCStatusType") {
            scope.view.flxStatusTypeHeadingSeparator.setVisibility(false);
          }
          if (segmentName === "segTimePeriods") {
            scope.view.flxLCTimePeriodHeadingSeparator.setVisibility(false);
            scope.view.flxBottomSeparator.setVisibility(true);
          }
          scope.view[imageName].src = "arrowdown_sm.png";
        } else {
          scope.view[segmentName].setVisibility(true);
          if (segmentName === "segLCAccountType") {
            scope.view.flxLCTypeHeadingSeparator.setVisibility(true);
          }
          if (segmentName === "segLCStatusType") {
            scope.view.flxStatusTypeHeadingSeparator.setVisibility(true);
          }
          if (segmentName === "segBillType") {
            scope.view.flxBillTypeHeadingSeparartor.setVisibility(true);
          }
          if (segmentName === "segTimePeriods") {
            scope.view.flxLCTimePeriodHeadingSeparator.setVisibility(true);
            scope.view.flxBottomSeparator.setVisibility(false);
          }
          scope.view[imageName].src = "arrowup_sm.png";
        }
      } catch (err) {
        var errorObj = {
          "method": "onActionClickFilterSegment",
          "error": err
        };
        scopeObj.onError(errorObj);
      }
    },

    /**
* @api : setViewActions
* Set the default actions for component
* @return : NA
*/
    setViewActions: function () {
      var scope = this;
      try {
        var imageName = "";
        if (scope.currentTab === GUARANTEES_TAB) {
          imageName = "flxColumn";
        } else if (scope.currentTab === AMENDMENTS_TAB) {
          imageName = "flxAmendmentsColumn";
        } else if (scope.currentTab === CLAIMS_TAB) {
          imageName = "flxClaimsColumn";
        }
        scope.view[imageName + 1].onClick = scope.sortRecords.bind(this, 1);
        scope.view[imageName + 2].onClick = scope.sortRecords.bind(this, 2);
        scope.view[imageName + 3].onClick = scope.sortRecords.bind(this, 3);
        scope.view[imageName + 4].onClick = scope.sortRecords.bind(this, 4);
        scope.view[imageName + 5].onClick = scope.sortRecords.bind(this, 5);
        scope.view[imageName + 6].onClick = scope.sortRecords.bind(this, 6);
        scope.view[imageName + 7] && (scope.view[imageName + 7].onClick = scope.sortRecords.bind(this, 7));
        scope.selectedTab = 1;
      } catch (err) {
        var errorObj = {
          "method": "setViewActions",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
   * @api : setDefaultSort
   * Method to set default sort icon image
   * @return : NA
   */
    setDefaultSort: function (widget) {
      var scope = this;
      try {
        for (const key in sortField) {
          scope.view[key].src = "sortingfinal_1.png";
        }
        scope.view[widget].src = "sorting_next.png";
      } catch (err) {
        var errorObj = {
          "method": "setDefaultSort",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
   * @api : sortRecords
   * Update sort icons and trigger a action to business controller to sort
   * @return : NA
   */
    sortRecords: function (columnNo) {
      var scope = this;
      try {
        var sortType = "";
        scope.serviceParameters.filterByParam = "";
        scope.serviceParameters.filterByValue = "";
        scope.sortApplied = true;
        var imageName = "";
        if (scope.currentTab === GUARANTEES_TAB) {
          imageName = "imgCoulmnTab";
        } else if (scope.currentTab === AMENDMENTS_TAB) {
          imageName = "imgColumnAmendmentsTab";
        } else if (scope.currentTab === CLAIMS_TAB) {
          imageName = "imgColumnClaimsTab";
        }
        var field = sortField[imageName + columnNo];
        if (columnNo === 4 && scope.currentTab === GUARANTEES_TAB) {
          field = "guaranteeSrmsId";
        }
        if (scope.view[imageName + columnNo].src === "sortingfinal.png") {
          scope.view[imageName + columnNo].src = "sorting_previous.png";
          sortType = "DESC";
        } else if (scope.view[imageName + columnNo].src === "sorting_previous.png") {
          scope.view[imageName + columnNo].src = "sorting_next.png";
          sortType = "ASC";
        } else {
          scope.view[imageName + columnNo].src = "sorting_previous.png";
          sortType = "DESC";
        }
        for (var i = 1; i <= 7; i++) {
          if (i !== columnNo && scope.view[imageName + i]) {
            scope.view[imageName + i].src = "sortingfinal.png";
          }
        }
        scope.serviceParameters.sortByParam = field;
        scope.serviceParameters.sortOrder = sortType;
        scope.fetchDashboardData("sort");
      } catch (err) {
        var errorObj = {
          "method": "sortRecords",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
   * @api : setSegmentWidgetDataMap
   * This method will set the widget data map for segImportLCList segment
   * @return : NA
   */
    setSegmentWidgetDataMap: function () {
      var scope = this;
      try {
        if (scope.currentTab === CLAIMS_TAB) {
          this.view.segTransactionList.widgetDataMap = {
            "btnAction": "btnAction",
            "btnAction1": "btnAction1",
            "btnAction2": "btnAction2",
            "btnAction3": "btnAction3",
            "flxAction": "flxAction",
            "flxDropdown": "flxDropdown",
            "flxIdentifier": "flxIdentifier",
            "flxInitiatedClaimsList1": "flxInitiatedClaimsList1",
            "flxInitiatedClaimsList2": "flxInitiatedClaimsList2",
            "lblColumn1": "lblColumn1",
            "lblColumn2": "lblColumn2",
            "lblColumn3": "lblColumn3",
            "lblColumn4": "lblColumn4",
            "lblColumn5": "lblColumn5",
            "lblDropdown": "lblDropdown",
            "lblIdentifier": "lblIdentifier",
            "lblRowColumn1Key": "lblRowColumn1Key",
            "lblRowColumn1Value": "lblRowColumn1Value",
            "lblRowColumn2Key": "lblRowColumn2Key",
            "lblRowColumn2Value": "lblRowColumn2Value",
            "lblRowColumn3Key": "lblRowColumn3Key",
            "lblRowColumn3Value": "lblRowColumn3Value",
            "lblRowColumn4Key": "lblRowColumn4Key",
            "lblRowColumn4Value": "lblRowColumn4Value",
            "lblRow2Column1Key": "lblRow2Column1Key",
            "lblRow2Column1Value": "lblRow2Column1Value",
            "lblRow2Column2Key": "lblRow2Column2Key",
            "lblRow2Column2Value": "lblRow2Column2Value"
          };
        } else {
          this.view.segTransactionList.widgetDataMap = {
            "flxDropDown": "flxDropDown",
            "imgDropdown": "imgDropdown",
            "lblCoulmnTabValue1": "lblCoulmnTabValue1",
            "lblCoulmnTabValue2": "lblCoulmnTabValue2",
            "lblCoulmnTabValue3": "lblCoulmnTabValue3",
            "lblCoulmnTabValue4": "lblCoulmnTabValue4",
            "lblCoulmnTabValue5": "lblCoulmnTabValue5",
            "lblCoulmnTabValue6": "lblCoulmnTabValue6",
            "btnAction": "btnAction",
            "lblLCData1": "lblLCData1",
            "lblLCDataValue1": "lblLCDataValue1",
            "lblLCData2": "lblLCData2",
            "lblLCDataValue2": "lblLCDataValue2",
            "lblLCData3": "lblLCData3",
            "lblLCDataValue3": "lblLCDataValue3",
            "lblLCData4": "lblLCData4",
            "lblLCDataValue4": "lblLCDataValue4",
            "lblLCData5": "lblLCData5",
            "lblLCDataValue5": "lblLCDataValue5",
            "lblLCData6": "lblLCData6",
            "lblLCDataValue6": "lblLCDataValue6",
            "lblLCData7": "lblLCData7",
            "lblLCDataValue7": "lblLCDataValue7",
            "lblLCData8": "lblLCData8",
            "lblLCDataValue8": "lblLCDataValue8",
            "lblLCData9": "lblLCData9",
            "lblLCDataValue9": "lblLCDataValue9",
            "lblLCData10": "lblLCData10",
            "lblLCDataValue10": "lblLCDataValue10",
            "lblLCData11": "lblLCData11",
            "lblLCDataValue11": "lblLCDataValue11",
            "lblLCData12": "lblLCData12",
            "lblLCDataValue12": "lblLCDataValue12",
            "btnViewDetails": "btnViewDetails",
            "btnCreateNewLC": "btnCreateNewLC",
            "btnDownload": "btnDownload",
            "btnPrint": "btnPrint",
            "flxLCRowData8": "flxLCRowData8",
            "flxLCRowData7": "flxLCRowData7",
            "flxActionTab": "flxActionTab",
            "flxLCRowData12": "flxLCRowData12",
            "flxColumn3": "flxColumn3",
            "flxColumn4": "flxColumn4",
            "flxColumn5": "flxColumn5",
            "flxColumn6": "flxColumn6",
            "flxLCRowDetails2": "flxLCRowDetails2",
            "flxLCRowDetails3": "flxLCRowDetails3",
            "flxColumn2": "flxColumn2",
            "flxLCRowData3": "flxLCRowData3",
            "flxLCRowData6": "flxLCRowData6",
            "flxLCRowData4": "flxLCRowData4",
            "flxLCRowData2": "flxLCRowData2",
            "flxLCRowData5": "flxLCRowData5",
            "flxLCRowData11": "flxLCRowData11",
            "flxLCRowData10": "flxLCRowData10",
            "flxLCRowData9": "flxLCRowData9",
            "flxLCRowDetails": "flxLCRowDetails",
            "flxLCRowDetails1": "flxLCRowDetails1",
            "flxLCTransactionListRow": "flxLCTransactionListRow",
            "flxTopSeperator": "flxTopSeperator",
            "btnCreateClaim": "btnCreateClaim",
            "flxLCTransactionListExpandTablet": "flxLCTransactionListExpandTablet",
            "flxLCTransaction": "flxLCTransaction",
            "flxActions": "flxActions",
            "flxLCRowData1": "flxLCRowData1"
          };
        }
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesReceivedDashboardController",
          "method": "setSegmentWidgetDataMap",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
   * @api : setDashboardData
   * This method will invoked to set dashboard data 
   * @return : NA
   */
    setDashboardData: function () {
      var scope = this;
      try {
        scope.previousIndex = undefined;
        if (scope.guaranteesLCDetails && scope.guaranteesLCDetails.length > 0) {
          scope.view.segTransactionList.setVisibility(true);
          scope.view.flxNoTransactions.setVisibility(false);
          scope.view.flxPagination.setVisibility(true);
          scope.view.flxVerticalEllipsis.setVisibility(true);
          scope.view.flxDropDown.width = "280dp";
          scope.view.flxDropDown.right = "50dp";
        } else {
          scope.view.segTransactionList.setVisibility(false);
          scope.view.flxNoTransactions.setVisibility(true);
          scope.view.flxPagination.setVisibility(false);
          scope.view.flxVerticalEllipsis.setVisibility(false);
          scope.view.flxDropDown.width = "310dp";
          scope.view.flxDropDown.right = "20dp";
          return;
        }
        const offset = scope.view.PaginationContainer.getPageOffset();
        if (offset === 0) {
          scope.view.flxPagination.PaginationContainer.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_INACTIVE;
        } else {
          scope.view.flxPagination.PaginationContainer.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_ACTIVE;
        }
        if (scope.guaranteesLCDetails.length > 10) {
          scope.view.flxPagination.PaginationContainer.imgPaginationNext.src = "pagination_next_active_container.png";
        } else {
          scope.view.flxPagination.PaginationContainer.imgPaginationNext.src = "pagination_next_inactive.png";
        }
        scope.view.flxPagination.PaginationContainer.imgPaginationNext.imageScaleMode = constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS;
        scope.view.flxPagination.PaginationContainer.imgPaginationPrevious.imageScaleMode = constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS;
        var rowTemplate = scope.getSegmentTemplate();
        scope.view.segTransactionList.rowTemplate = rowTemplate.row;
        const segData = scope.getSegmentData(scope.guaranteesLCDetails.slice(0, 10));
        scope.view.segTransactionList.setData(segData);
        scope.hideFilterDropDown();
        scope.view.forceLayout();
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesReceivedDashboardController",
          "method": "setDashboardData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : getSegmentData
    * This method will set listing data in dashboard
    * @return : NA
    */
    getSegmentData: function (ReceivedLCData) {
      var scope = this;
      const formatUtilManager = applicationManager.getFormatUtilManager();
      try {
        var orientationHandler = new OrientationHandler();
        scope.setSegmentWidgetDataMap();
        var breakpoint = kony.application.getCurrentBreakpoint();
        let template = "",
          segData = [];
        if (breakpoint === 1024 || orientationHandler.isTablet) {
          scope.view.flxColumn2.setVisibility(true);
          scope.view.flxColumn2.width = "18%";
          scope.view.flxColumn2.left = "23.5%";
          scope.view.flxColumn3.setVisibility(false);
          scope.view.flxColumn4.setVisibility(false);
          scope.view.flxColumn4.left = "23.5%";
          scope.view.flxColumn4.width = "17%";
          scope.view.flxColumn5.left = "44.5%";
          scope.view.flxColumn5.width = "20%";
          scope.view.flxColumn6.left = "62%";
          scope.view.flxSegLCHeader.forceLayout();
          if (scope.currentTab === CLAIMS_TAB) {
            if (breakpoint > 1024) {
              scope.view.flxClaimsColumn3.setVisibility(false);
              scope.view.flxClaimsColumn4.setVisibility(false);
              scope.view.flxClaimsColumn2.left = "10.5%";
              scope.view.flxClaimsColumn2.width = "23%";
              scope.view.flxClaimsColumn5.left = "9%";
              scope.view.flxClaimsColumn6.right = "20px";
              scope.view.imgColumnClaimsTab2.setVisibility(true);
              scope.view.imgColumnClaimsTab5.setVisibility(true);
            }
            scope.view.btnTab1.skin = "ICSknBtnAccountSummaryUnselected2";
            scope.view.btnTab2.skin = "ICSknBtnAccountSummaryUnselected2";
            //scope.view.flxListingDetails.top = "0px"
            scope.view.imgColumnClaimsTab1.src = "sorting_next.png";
            scope.view.flxSegHeaderClaims.forceLayout();
            template = "flxInitiatedClaimsList2";
            for (const record of ReceivedLCData) {
              segData.push(Object.assign({
                "lblDropdown": "O",
                "flxInitiatedClaimsList2": {
                  "height": "50dp",
                  "skin": "sknflxffffffnoborder"
                },
                "lblIdentifier": {
                  "skin": "sknffffff15pxolbfonticons"
                },
                "flxIdentifier": {
                  "skin": "sknFlxIdentifier"
                },
                "flxDropdown": {
                  "onClick": this.handleSegmentRowView.bind(this)
                },
                "lblColumn1": record.beneficiaryName || NA,
                "lblColumn2": record.productType || NA,
                "lblColumn3": record.status || NA,
                "template": template,
                "lblRowColumn1Key": kony.i18n.getLocalizedString("i18n.TradeFinance.TransactionRef"),
                "lblRowColumn2Key": kony.i18n.getLocalizedString("i18n.TradeFinance.GTAndSlbc"),
                "lblRow2Column1Key": kony.i18n.getLocalizedString("i18n.TradeFinance.demandType"),
                "lblRow2Column2Key": kony.i18n.getLocalizedString("i18n.TradeFinance.newExtensionDate"),
                "lblRowColumn1Value": record.guaranteesSRMSId || NA,
                "lblRowColumn2Value": record.guaranteeAndSBLCType || NA,
                "lblRow2Column1Value": record.demandType || NA,
                "lblRow2Column2Value": record.newExtensionDate || NA,
                "btnAction": {
                  "text": kony.i18n.getLocalizedString(record.status.toLowerCase() === 'draft' ? 'i18n.ImportLC.ContinueEditing' : 'i18n.common.ViewDetails'),
                  "toolTip": kony.i18n.getLocalizedString(record.status.toLowerCase() === 'draft' ? 'i18n.ImportLC.ContinueEditing' : 'i18n.common.ViewDetails'),
                  "onClick": function () {
                    scope.presenter.showGuaranteesReceivedScreen({
                      context: record.status.toLowerCase() === 'draft' ? 'createGuaranteeClaim' : 'viewClaimDetails',
                      form: scope.view.id,
                      data: record
                    });
                  }
                },
                "btnAction1": {
                  "text": kony.i18n.getLocalizedString("i18n.common.Download"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.common.Download"),
                  "onClick": function () {
                    scope.presenter.generateGuaranteesReceivedClaims(record);
                  }
                },
                "btnAction2": {
                  isVisible: false
                }
              }, record));
            }
          }
          else if (scope.currentTab === AMENDMENTS_TAB) {
            template = "flxLCAmendmentsCollapseTablet";
            for (const record of ReceivedLCData) {
              var beneficiaryName = record.beneficiaryDetails ? JSON.parse(record.beneficiaryDetails.replaceAll("'", "\""))[0].beneficiaryName : NA;
              segData.push(Object.assign(record, {
                "imgDropdown": "arrow_down.png",
                "flxDropDown": {
                  "onClick": scope.onSegmentRowToggle.bind(this)
                },
                "lblCoulmnTabValue1": record.applicant ? record.applicant : NA,
                "lblCoulmnTabValue3": {
                  "text": record.amendmentSrmsId ? record.amendmentSrmsId : NA,
                  "isVisible": true,
                  "width": "100%",
                  "left": "0%"
                },
                "lblCoulmnTabValue4": {
                  "text": record.receivedOn ? CommonUtilities.getFrontendDateString(record.receivedOn, applicationManager.getConfigurationManager().frontendDateFormat) : NA,
                  "isVisible": true,
                  "width": "100%",
                  "left": "0%"
                },
                "lblCoulmnTabValue6": {
                  "text": record.status ? record.status : NA,
                  "isVisible": true,
                  "width": "100%",
                  "left": "0%"
                },
                "template": template,
                "lblLCData1": kony.i18n.getLocalizedString("i18n.TradeFinance.productType"),
                "lblLCData2": kony.i18n.getLocalizedString("i18n.TradeFinance.GTAndSlbc"),
                "lblLCData3": kony.i18n.getLocalizedString("kony.mb.common.Amount"),
                "lblLCData4": kony.i18n.getLocalizedString("i18n.TradeFinance.AmendNum"),
                "lblLCData5": kony.i18n.getLocalizedString("i18n.TradeFinance.expiryType"),
                "lblLCData7": kony.i18n.getLocalizedString("i18n.TradeFinance.TransactionRef"),
                "lblLCDataValue1": record.productType ? record.productType : NA,
                "lblLCDataValue2": record.lcType ? record.lcType : NA,
                "lblLCDataValue3": record.amendAmount ? record.currency + " " + formatUtilManager.formatAmount(record.amendAmount) : NA,
                "lblLCDataValue4": record.amendmentNo ? record.amendmentNo : NA,
                "lblLCDataValue5": record.amendExpiryType ? record.amendExpiryType : NA,
                "lblLCDataValue7": record.guaranteeSrmsId ? record.guaranteeSrmsId : NA,
                "flxColumn2": {
                  "isVisible": false
                },
                "flxColumn3": {
                  "left": "22.9%",
                  "isVisible": true
                },
                "flxColumn4": {
                  "left": "44.5%",
                  "isVisible": true
                },
                "flxColumn6": {
                  "left": "64%",
                  "width": "16%",
                  "isVisible": true
                },
                "flxLCRowData2": {
                  "left": "27%",
                  "isVisible": true
                },
                "flxLCRowData3": {
                  "left": "53.5%",
                  "isVisible": true
                },"flxLCRowData4": {
                  "left": "77.4%",
                  "isVisible": true
                },"flxLCRowData7": {
                  "left": "53.5%",
                  "isVisible": true
                },
                "flxLCRowDetails2": {
                  "isVisible": true
                },
                "btnDownload": {
                  "text": kony.i18n.getLocalizedString("i18n.common.Download"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.common.Download"),
                  "onClick": function () {
                    scope.presenter.generateGuaranteesReceivedAmendments({
                      "amendmentSrmsId": record.amendmentSrmsId
                    }, "frmGuaranteesReceivedDashboard");
                  }
                },
                "btnAction": {
                  "text": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                  "onClick": function () {
                    scope.navigateLCView(record);
                  }
                },
                "btnPrint": {
                  "text": kony.i18n.getLocalizedString("i18n.accounts.print"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.accounts.print"),
                  "onClick": function () {
                    selectedRecord = record;
                    isPrintNavigation = true;
                    scope.presenter.getReceivedGuaranteeById({
                      "guaranteeSrmsId": record.guaranteeSrmsId
                    }, "frmGuaranteesReceivedDashboard");
                  }
                }
              }, record));
            }
          } else if (scope.currentTab === GUARANTEES_TAB) {
            template = "flxLCTransactionListCollapseTablet";
            scope.view.btnTab1.skin = "ICSknBtnAccountSummarySelected2";
            scope.view.btnTab2.skin = "ICSknBtnAccountSummaryUnselected2";
            scope.view.btnTab3.skin = "ICSknBtnAccountSummaryUnselected2";
            for (const record of ReceivedLCData) {
              segData.push(Object.assign(record, {
                "imgDropdown": "arrow_down.png",
                "flxDropDown": {
                  "onClick": scope.onSegmentRowToggle.bind(this)
                },
                "flxLCTransactionListExpandTablet": {
                  "height": "205dp"
                },
                "flxLCRowData1": {
                 	"width": "20%"
                },
                "flxLCRowDetails1":{
                 	"height": "60dp"
                },
                "flxLCTransaction": {
                  "height": "205dp"
                },
                "flxActions": {
                  "top": record.status.toLowerCase() === (OLBConstants.GUARANTEE_LC_STATUS.APPROVED).toLowerCase() ? "10dp" : "0dp",
                  "left": "81%"
                },
                "flxLCRowDetails2": {
                  "top": "0dp"
                },
                "lblCoulmnTabValue1": record.applicantName ? (record.applicantName.length > 20 ? record.applicantName.substr(0, 19) + "..." : record.applicantName) : NA,
                "lblCoulmnTabValue2": record.productType ? record.productType : NA,
                "lblCoulmnTabValue3": record.receivedOn ? CommonUtilities.getDateAndTimeInUTC(record.receivedOn).substr(0, 10) : NA,
                "lblCoulmnTabValue6": record.status ? record.status : NA,
                "template": template,
                "lblLCData1": kony.i18n.getLocalizedString("kony.mb.common.Amount"),
                "lblLCData2": kony.i18n.getLocalizedString("kony.mb.CM.issueDate"),
                "lblLCData3": {
                  "isVisible": true,
                  "text": kony.i18n.getLocalizedString("i18n.TradeFinance.expiryType")
                },
                "lblLCData4": {
                  "isVisible": true,
                  "text": kony.i18n.getLocalizedString("i18n.common.Currency")
                },
                "lblLCData5": kony.i18n.getLocalizedString("i18n.TradeFinance.modeOfTransaction"),
                "lblLCData6": kony.i18n.getLocalizedString("i18n.TradeFinance.IssuingBank"),
                "lblLCData7": kony.i18n.getLocalizedString("i18n.TradeFinance.GTAndSlbc"),
                "lblLCData8": kony.i18n.getLocalizedString("i18n.TradeFinance.TransactionRef"),
                "lblLCData9": kony.i18n.getLocalizedString("i18n.TradeFinance.modeOfTransaction"),
                "lblLCData10": kony.i18n.getLocalizedString("i18n.TradeFinance.IssuingBank"),
                "lblLCData11": kony.i18n.getLocalizedString("i18n.TradeFinance.InstructingParty"),
                "lblLCDataValue1": {
                    "text": record.amount ? scope.presenter.getConvertedCurrency(record, 'currency') + " " + formatUtilManager.formatAmount(record.amount) : NA,
                    "width": "110%"
			    },
                "lblLCDataValue2": record.expectedIssueDate ? CommonUtilities.getDateAndTimeInUTC(record.expectedIssueDate).substr(0, 10) : NA,
                "lblLCDataValue3": {
                  "isVisible": true,
                  "text": record.expiryType ? record.expiryType : NA
                },
                "lblLCDataValue4": {
                  "isVisible": true,
                  "text": record.currency ? record.currency : NA
                },
                "lblLCDataValue5": record.modeOfTransaction ? record.modeOfTransaction : NA,
                "lblLCDataValue6": {
                  "text": record.issuingBankName ? record.issuingBankName : NA,
                  "width": (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) ? "140dp" : "165dp",
                  "height": (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) ? "30dp" : "26dp"
                },
                "lblLCDataValue7": record.lcType ? record.lcType : NA,
                "lblLCDataValue8": record.guaranteeSrmsId ? record.guaranteeSrmsId : NA,
                "flxLCRowData12": {
                  "isVisible": false
                },
                "flxColumn6": {
                  "width": "20%"
                },
                "flxLCRowData4": {
                  "isVisible": true
                },
                "flxLCRowData8": {
                  "isVisible": true
                },
                "flxLCRowData7": {
                  "isVisible": true
                },
                "btnPrint": {
                  "isVisible": false
                },
                "flxLCRowDetails3": {
                  "isVisible": false
                },
                "btnCreateNewLC": {
                  "text": kony.i18n.getLocalizedString("i18n.TradeFinance.createNewClaim"),
                  "isVisible": record.status.toLowerCase() === (OLBConstants.GUARANTEE_LC_STATUS.APPROVED).toLowerCase() ? true : false,
                  "onClick": function() {
                      scope.presenter.showGuaranteesReceivedScreen({
                          context: 'createGuaranteeClaim',
                          data: record,
                          form: scope.view.id
                      });
                  }
              },
                "btnDownload": {
                  "text": kony.i18n.getLocalizedString("i18n.common.Download"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.common.Download"),
                  "onClick": function () {
                    scope.presenter.generateReceivedGuaranteesLC({
                      "guaranteeSrmsId": record.guaranteeSrmsId
                    });
                  }
                },
                "btnAction": {
                  "text": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                  "onClick": function () {
                    scope.navigateLCView(record);
                  }
                }
              }, record));
            }
          }
        } else {
          scope.view.flxColumn2.setVisibility(true);
          scope.view.flxColumn3.setVisibility(true);
          if (scope.currentTab === CLAIMS_TAB) {
            scope.view.flxClaimsColumn3.setVisibility(true);
            scope.view.flxClaimsColumn4.setVisibility(true);
            scope.view.flxClaimsColumn2.left = "0%";
            scope.view.flxClaimsColumn5.left = "0%";
            scope.view.flxClaimsColumn6.left = "0%";
            scope.view.imgColumnClaimsTab4.src = "sorting_next.png";
            scope.view.flxSegHeaderClaims.forceLayout();
            template = "flxInitiatedClaimsList1";
            for (const record of ReceivedLCData) {
              segData.push(Object.assign({
                "lblDropdown": "O",
                "flxInitiatedClaimsList1": {
                  "height": "50dp",
                  "skin": "sknflxffffffnoborder"
                },
                "lblIdentifier": {
                  "skin": "sknffffff15pxolbfonticons"
                },
                "flxIdentifier": {
                  "skin": "sknFlxIdentifier"
                },
                "flxDropdown": {
                  "onClick": this.handleSegmentRowView.bind(this)
                },
                "lblColumn1": record.beneficiaryName || NA,
                "lblColumn2": record.productType || NA,
                "lblColumn3": (record.claimCurrency && record.claimAmount) ? `${record.claimCurrency} ${formatUtilManager.formatAmount(record.claimAmount)}` : NA,
                "lblColumn4": record.createdOn ? formatUtilManager.getFormattedCalendarDate(record.createdOn) : NA,
                "lblColumn5": record.status || NA,
                "template": template,
                "lblRowColumn1Key": kony.i18n.getLocalizedString("i18n.TradeFinance.TransactionRef"),
                "lblRowColumn2Key": kony.i18n.getLocalizedString("i18n.TradeFinance.GTAndSlbc"),
                "lblRowColumn3Key": kony.i18n.getLocalizedString("i18n.Wealth.expiryDate"),
                "lblRowColumn4Key": kony.i18n.getLocalizedString("i18n.TradeFinance.demandType"),
                "lblRow2Column1Key": kony.i18n.getLocalizedString("i18n.TradeFinance.newExtensionDate"),
                "lblRow2Column2Key": kony.i18n.getLocalizedString("kony.mb.cardManage.issuingBank"),
                "lblRowColumn1Value": record.guaranteesSRMSId || NA,
                "lblRowColumn2Value": record.guaranteeAndSBLCType || NA,
                "lblRowColumn3Value": record.expiryDate ? formatUtilManager.getFormattedCalendarDate(record.expiryDate) : NA,
                "lblRowColumn4Value": record.demandType || NA,
                "lblRow2Column1Value": record.newExtensionDate || NA,
                "lblRow2Column2Value": record.issuingBank || NA,
                "btnAction": {
                  "text": kony.i18n.getLocalizedString(record.status.toLowerCase() === 'draft' ? 'i18n.ImportLC.ContinueEditing' : 'i18n.common.ViewDetails'),
                  "toolTip": kony.i18n.getLocalizedString(record.status.toLowerCase() === 'draft' ? 'i18n.ImportLC.ContinueEditing' : 'i18n.common.ViewDetails'),
                  "onClick": function () {
                    scope.presenter.showGuaranteesReceivedScreen({
                      context: record.status.toLowerCase() === 'draft' ? 'createGuaranteeClaim' : 'viewClaimDetails',
                      form: scope.view.id,
                      data: record
                    });
                  }
                },
                "btnAction1": {
                  "text": kony.i18n.getLocalizedString("i18n.common.Download"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.common.Download"),
                  "onClick": function () {
                    scope.presenter.generateGuaranteesReceivedClaims(record);
                  }
                },
                "btnAction2": {
                  "text": kony.i18n.getLocalizedString("i18n.accounts.print"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.accounts.print"),
                  "onClick": function () {
                    scope.presenter.showGuaranteesReceivedScreen({
                      context: 'printClaim',
                      form: scope.view.id,
                      data: Object.assign({
                        printCallback: function () {
                          applicationManager.getNavigationManager().navigateTo({ appName: 'TradeFinanceMA', friendlyName: 'frmGuaranteesReceivedDashboard' }, false, { flowType: 'Claims' });
                        }
                      }, record)
                    });
                  }
                }
              }, record));
            }
          }
          else if (scope.currentTab === AMENDMENTS_TAB) {
            template = "flxLCAmendmentsCollapse";
            for (const record of ReceivedLCData) {
              var beneficiaryName = record.beneficiaryDetails ? JSON.parse(record.beneficiaryDetails.replaceAll("'", "\""))[0].beneficiaryName : NA;
              segData.push(Object.assign(record, {
                "imgDropdown": "arrow_down.png",
                "flxDropDown": {
                  "onClick": scope.onSegmentRowToggle.bind(this)
                },

                "lblCoulmnTabValue1": record.applicant ? record.applicant : NA,
                "lblCoulmnTabValue2": {
                  "text": record.productType ? record.productType : NA,
                  "isVisible": true,
                  "width": "100%",
                  "left": "0%"
                },
                "lblCoulmnTabValue3": {
                  "text": record.amendmentSrmsId ? record.amendmentSrmsId : NA,
                  "isVisible": true,
                  "width": "100%",
                  "left": "0%"
                },

                "lblCoulmnTabValue4": {
                  "text": record.receivedOn ? CommonUtilities.getFrontendDateString(record.receivedOn, applicationManager.getConfigurationManager().frontendDateFormat) : NA,
                  "isVisible": true,
                  "width": "100%",
                  "left": "0%"
                },
                "lblCoulmnTabValue5": {
                  "text": record.amendmentNo ? record.amendmentNo : NA,
                  "isVisible": true,
                  "width": "100%",
                  "left": "0%"
                },
                "lblCoulmnTabValue6": record.status ? record.status : NA,
                "template": template,
                "lblLCData1": kony.i18n.getLocalizedString("i18n.TradeFinance.productType"),
                "lblLCData2": kony.i18n.getLocalizedString("i18n.TradeFinance.GTAndSlbc"),
                "lblLCData3": kony.i18n.getLocalizedString("kony.mb.common.Amount"),
                "lblLCData4": kony.i18n.getLocalizedString("i18n.TradeFinance.amdEffectiveDate"),
                "lblLCData5": kony.i18n.getLocalizedString("i18n.TradeFinance.expiryType"),
                "lblLCData7": kony.i18n.getLocalizedString("i18n.TradeFinance.CancellationStatus"),
                "lblLCDataValue1": record.productType ? record.productType : NA,
                "lblLCDataValue2": record.lcType ? record.lcType : NA,
                "lblLCDataValue3": record.amendAmount ? record.currency + " " + formatUtilManager.formatAmount(record.amendAmount) : NA,
                "lblLCDataValue5": record.amendExpiryType ? record.amendExpiryType : NA,
                "lblLCDataValue7": record.cancellationStatus ? record.cancellationStatus : NA,
                "flxLCRowDetails": {
                  "height": "155dp"
                },
                "flxLCRowData3": {
                  "isVisible": true,
                  "left": "51%"
                },
                "flxColumn2": {
                  "left": "20.7%",
                  "isVisible": true
                },
                "flxColumn3": {
                  "left": "36%",
                  "isVisible": true
                },
                "flxColumn4": {
                  "left": "49%",
                  "isVisible": true
                },
                "flxColumn5": {
                  "left": "60%",
                  "isVisible": true
                },
                "flxColumn6": {
                  "left": "71.9%",
                  "isVisible": true
              },
                "flxLCRowDetails2": {
                  "isVisible": true,
                  "height": "70dp",
                  "top": "7dp"
                },
                "flxLCRowDetails5": {
                  "isVisible": true
                },
                "flxLCRowData4": {
                  "isVisible": true
                },
                "flxLCRowData8": {
                  "isVisible": false
                },
                "flxLCRowData7": {
                  "isVisible": record.cancellationStatus ? true : false,
                  "left": "55.5%"
                },
                "flxLCRowData4": {
                  isVisible: false
                },
                "btnDownload": {
                  "text": kony.i18n.getLocalizedString("i18n.common.Download"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.common.Download"),
                  "onClick": function () {
                    scope.presenter.generateGuaranteesReceivedAmendments({
                      "amendmentSrmsId": record.amendmentSrmsId
                    }, "frmGuaranteesReceivedDashboard");
                  }
                },
                "btnAction": {
                  "text": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                  "onClick": function () {
                    scope.navigateLCView(record);
                  }
                },
                "btnPrint": {
                  "text": kony.i18n.getLocalizedString("i18n.accounts.print"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.accounts.print"),
                  "onClick": function () {
                    selectedRecord = record;
                    isPrintNavigation = true;
                    scope.presenter.getReceivedGuaranteeById({
                      "guaranteeSrmsId": record.guaranteeSrmsId
                    }, "frmGuaranteesReceivedDashboard");
                  }
                }
              }, record));
            }
          } else if (scope.currentTab === GUARANTEES_TAB) {
            template = "flxLCTransactionListCollapse";
            for (const record of ReceivedLCData) {
              segData.push(Object.assign(record, {
                "imgDropdown": "arrow_down.png",
                "flxDropDown": {
                  "onClick": scope.onSegmentRowToggle.bind(this)
                },
                "lblCoulmnTabValue1": record.applicantName ? record.applicantName : NA,
                "lblCoulmnTabValue2": record.productType ? record.productType : NA,
                "lblCoulmnTabValue3": record.lcType ? record.lcType : NA,
                "lblCoulmnTabValue4": {
                  "text": record.guaranteeSrmsId ? record.guaranteeSrmsId : NA,
                  "width": "100%",
                  "left": "0%"
                },
                "lblCoulmnTabValue5": record.receivedOn ? CommonUtilities.getDateAndTimeInUTC(record.receivedOn).substr(0, 10) : NA,
                "lblCoulmnTabValue6": record.status ? record.status : NA,
                "template": template,
                "lblLCData1": kony.i18n.getLocalizedString("kony.mb.common.Amount"),
                "lblLCData2": kony.i18n.getLocalizedString("kony.mb.CM.issueDate"),
                "lblLCData3": kony.i18n.getLocalizedString("i18n.TradeFinance.expiryType"),
                "lblLCData4": kony.i18n.getLocalizedString("i18n.common.Currency"),
                "lblLCData5": kony.i18n.getLocalizedString("i18n.TradeFinance.modeOfTransaction"),
                "lblLCData6": kony.i18n.getLocalizedString("i18n.TradeFinance.IssuingBank"),
                "lblLCData7": kony.i18n.getLocalizedString("i18n.TradeFinance.InstructingParty"),
                "lblLCDataValue1": record.amount ? scope.presenter.getConvertedCurrency(record, 'currency') + " " + formatUtilManager.formatAmount(record.amount) : NA,
                "lblLCDataValue2": record.expectedIssueDate ? CommonUtilities.getDateAndTimeInUTC(record.expectedIssueDate).substr(0, 10) : NA,
                "lblLCDataValue3": record.expiryType ? record.expiryType : NA,
                "lblLCDataValue4": record.currency ? record.currency : NA,
                "lblLCDataValue5": record.modeOfTransaction ? record.modeOfTransaction : NA,
                "lblLCDataValue6": record.issuingBankName ? record.issuingBankName : NA,
                "flxLCRowData4": {
                  "isVisible": true
                },
                "flxLCRowData6": {
                  "width": "26%"
                },
                "flxLCRowData7": {
                  "width": "20%",
                  "isVisible": false
                },
                "flxColumn4": {
                  "width": "15%"
                },
                "flxColumn6": {
                  "left": "71.4%"
                },
                "btnCreateNewLC": {
                  "isVisible": false
                },
                "flxLCRowData5": {
                  "width": "20%"
                },
                "flxLCRowData8": {
                  "isVisible": false
                },
                "flxActionTab": {
                  "width": 14 + "%"
                },
                "btnCreateClaim": {
                  "text": kony.i18n.getLocalizedString("i18n.TradeFinance.createNewClaim"),
                  "isVisible": record.status.toLowerCase() === (OLBConstants.GUARANTEE_LC_STATUS.APPROVED).toLowerCase() ? true : false,
                  "onClick": function () {
                    scope.presenter.showGuaranteesReceivedScreen({
                      context: 'createGuaranteeClaim',
                      data: record,
                      form: scope.view.id
                    });
                  }
                },
                "btnDownload": {
                  "text": kony.i18n.getLocalizedString("i18n.common.Download"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.common.Download"),
                  "onClick": function () {
                    scope.presenter.generateReceivedGuaranteesLC({
                      "guaranteeSrmsId": record.guaranteeSrmsId
                    });
                  }
                },
                "btnAction": {
                  "text": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                  "onClick": function () {
                    scope.navigateLCView(record);
                  }
                },
                "btnPrint": {
                  "text": kony.i18n.getLocalizedString("i18n.accounts.print"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.accounts.print"),
                  "onClick": function () {
                    let formNameForPrint;
                    let dataObj = {
                      navData: record,
                      previousFormName: 'frmGuaranteesReceivedDashboard'
                    };
                    if (scope_configManager.swiftEnabled === 'True' && record.status === OLBConstants.GUARANTEE_LC_STATUS.APPROVED) {
                      formNameForPrint = 'frmPrintSwiftReceivedGuarantee';
                    } else {
                      formNameForPrint = 'frmPrintReceivedGuarantees';
                    }
                    new kony.mvc.Navigation({
                      "appName": "TradeFinanceMA",
                      "friendlyName": `GuaranteesReceivedUIModule/${formNameForPrint}`
                    }).navigate(dataObj);
                  }
                }
              }, record));
            }
          }
        }
        return segData;
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesReceivedDashboardController",
          "method": "getSegmentData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : navigateLCView
    * This method navigates screen to Create Guarantee flow or View Details based on the status.
    * @return : NA
    */
    navigateLCView: function (data) {
      var scope = this;
      try {
        const navManager = applicationManager.getNavigationManager();
        navToLCDetails = true;
        if (scope.currentTab === GUARANTEES_TAB) {
          scope.presenter.getReceivedGuaranteeById({
            "guaranteeSrmsId": data.guaranteeSrmsId
          }, "frmGuaranteesReceivedDashboard");
        }
        else if (scope.currentTab === AMENDMENTS_TAB) {
          scope.presenter.getReceivedGuaranteeAmendmentsById({
            "amendmentSrmsId": data.amendmentSrmsId
          }, "frmGuaranteesReceivedDashboard");
        }
      } catch (err) {
        var errorObj = {
          "method": "navigateLCView",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
  * @api : navigateLCByID
  * Navigate with LC Data to the target forms
  * @return : NA
  */
    navigateLCByID: function (record) {
      var scope = this;
      try {
        this.navManager = applicationManager.getNavigationManager();
        var data;
        data = record;
        if (lcByIDNav === "viewDetails") {
          data = record;
          friendlyNames = "frmGuaranteeReceivedViewDetails"
        }
        this.navManager.navigateTo({
          appName: "TradeFinanceMA",
          friendlyName: `GuaranteesReceivedUIModule/${friendlyNames}`
        }, false, data);

      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesLCDashboardController",
          "method": "navigateLCByID",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : downloadXLSXFile
    * downloads records in XLSX File for the current tab records.
    * @return : NA
    */
    downloadXLSXFile: function () {
      var scope = this;
      try {
        scope.serviceParameters.pageOffset = "";
        scope.serviceParameters.pageSize = "";
        if (downloadXLSXData.hasOwnProperty("sortByParam"))
          scope.serviceParameters = downloadXLSXData;
        if (this.currentTab === GUARANTEES_TAB) {
          scope.presenter.generateReceivedGuaranteeList(scope.serviceParameters, "frmGuaranteesReceivedDashboard");
        } else if (this.currentTab === AMENDMENTS_TAB) {
          scope.presenter.generateReceivedGuaranteeAmendmentList(scope.serviceParameters, "frmGuaranteesReceivedDashboard");
        } else if (this.currentTab === CLAIMS_TAB) {
          scope.presenter.generateReceivedGuaranteeClaimsList(scope.serviceParameters, "frmGuaranteesReceivedDashboard");
        }
        scope.view.flxEllipsisDropDown.setVisibility(false);
      } catch (err) {
        var errorObj = {
          "method": "downloadXLSXFile",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
   * @api : hideFilterDropDown
   * Hides the filter drop down
   * @return : NA
   */
    hideFilterDropDown: function () {
      var scope = this;
      try {
        if (scope.view.flxListDropdown.isVisible === true) {
          scope.view.flxListDropdown.setVisibility(false);
          scope.view.imgFilterDropdown.src = "arrowdown_sm.png";
        }
        if (scope.view.flxEllipsisDropDown.isVisible === true) {
          scope.view.flxEllipsisDropDown.setVisibility(false);
        }
      } catch (err) {
        var errorObj = {
          "method": "hideFilterDropDown",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : onSegmentRowToggle
    * This metod will show expand and collapse row to show detailed view
    * @return : NA
    */
    onSegmentRowToggle: function () {
      var scope = this;
      try {
        var index = scope.view.segTransactionList.selectedRowIndex;
        var sectionIndex = index[0];
        var rowIndex = index[1];
        var data = scope.view.segTransactionList.data;
        var rowData = data[rowIndex];
        scope.rowData = rowData;
        var section = data.length;
        var segTemplate = scope.getSegmentTemplate();
        if (data[rowIndex].template !== segTemplate.expanded) {
          if (scope.previousIndex !== null && scope.previousIndex !== undefined && scope.previousIndex !== "") {
            data[scope.previousIndex].template = segTemplate.row;
            data[scope.previousIndex].imgDropdown = {
              image: "arrow_down.png"
            };
            switch (segTemplate.row) {
              case "flxLCTransactionListCollapse":
                data[scope.previousIndex].lblCoulmnTabValue4.width = "100%";
                data[scope.previousIndex].lblCoulmnTabValue4.left = "0%";
                break;
              case "flxLCAmendmentsCollapse":
                data[scope.previousIndex].lblCoulmnTabValue2.width = "100%";
                data[scope.previousIndex].lblCoulmnTabValue2.left = "0%"
                data[scope.previousIndex].lblCoulmnTabValue3.width = "100%";
                data[scope.previousIndex].lblCoulmnTabValue3.left = "0%"
                data[scope.previousIndex].lblCoulmnTabValue4.width = "100%";
                data[scope.previousIndex].lblCoulmnTabValue4.left = "0%"
                data[scope.previousIndex].lblCoulmnTabValue5.width = "100%";
                data[scope.previousIndex].lblCoulmnTabValue5.left = "0%"
                break;
              case "flxLCAmendmentsCollapseTablet":
                data[scope.previousIndex].lblCoulmnTabValue3.width = "100%";
                data[scope.previousIndex].lblCoulmnTabValue3.left = "0%";
                data[scope.previousIndex].lblCoulmnTabValue4.width = "100%";
                data[scope.previousIndex].lblCoulmnTabValue4.left = "0%";
                data[scope.previousIndex].lblCoulmnTabValue6.width = "100%";
                data[scope.previousIndex].lblCoulmnTabValue6.left = "0%";
            }
            scope.view.segTransactionList.setDataAt(data[scope.previousIndex], scope.previousIndex, sectionIndex);
          }
          data[rowIndex].imgDropdown = {
            image: "chevron_up.png"
          };
          data[rowIndex].template = segTemplate.expanded;
          scope.previousIndex = JSON.parse(JSON.stringify(rowIndex));
          switch (segTemplate.expanded) {
            case "flxLCTransactionListExpand":
              data[rowIndex].lblCoulmnTabValue4.width = "130dp";
              data[rowIndex].lblCoulmnTabValue4.left = "48.8%";
              break;
            case "flxLCAmendmentsExpand":
              data[rowIndex].lblCoulmnTabValue2.width = "115dp";
              data[rowIndex].lblCoulmnTabValue2.left = "20.4%";
              data[rowIndex].lblCoulmnTabValue3.width = "125dp";
              data[rowIndex].lblCoulmnTabValue3.left = "35.7%";
              data[rowIndex].lblCoulmnTabValue4.width = "109dp";
              data[rowIndex].lblCoulmnTabValue4.left = "48.8%";
              data[rowIndex].lblCoulmnTabValue5.width = "109dp";
              data[rowIndex].lblCoulmnTabValue5.left = "59.8%";
              break;
            case "flxLCAmendmentsExpandTablet":
              data[scope.previousIndex].lblCoulmnTabValue3.width = "100%";
                data[scope.previousIndex].lblCoulmnTabValue3.left = "22.4%";
                data[scope.previousIndex].lblCoulmnTabValue4.width = "100%";
                data[scope.previousIndex].lblCoulmnTabValue4.left = "44.2%";
                data[scope.previousIndex].lblCoulmnTabValue6.width = "100%";
                data[scope.previousIndex].lblCoulmnTabValue6.left = "63.8%";
              break;
          }
          scope.view.segTransactionList.setDataAt(data[rowIndex], rowIndex, sectionIndex);
        } else {
          switch (segTemplate.row) {
            case "flxLCTransactionListCollapse":
              data[scope.previousIndex].lblCoulmnTabValue4.width = "100%";
              data[scope.previousIndex].lblCoulmnTabValue4.left = "0%";
              break;
            case "flxLCAmendmentsCollapse":
              data[scope.previousIndex].lblCoulmnTabValue2.width = "100%";
              data[scope.previousIndex].lblCoulmnTabValue2.left = "0%"
              data[scope.previousIndex].lblCoulmnTabValue3.width = "100%";
              data[scope.previousIndex].lblCoulmnTabValue3.left = "0%"
              data[scope.previousIndex].lblCoulmnTabValue4.width = "100%";
              data[scope.previousIndex].lblCoulmnTabValue4.left = "0%"
              data[scope.previousIndex].lblCoulmnTabValue5.width = "100%";
              data[scope.previousIndex].lblCoulmnTabValue5.left = "0%"
              break;
            case "flxLCAmendmentsCollapseTablet":
              data[scope.previousIndex].lblCoulmnTabValue3.width = "100%";
              data[scope.previousIndex].lblCoulmnTabValue3.left = "0%";
              data[scope.previousIndex].lblCoulmnTabValue4.width = "100%";
              data[scope.previousIndex].lblCoulmnTabValue4.left = "0%";
              data[scope.previousIndex].lblCoulmnTabValue6.width = "100%";
              data[scope.previousIndex].lblCoulmnTabValue6.left = "0%";
          }
          data[rowIndex].imgDropdown = {
            image: "arrow_down.png"
          };
          data[rowIndex].template = segTemplate.row;
          scope.view.segTransactionList.setDataAt(data[rowIndex], rowIndex, sectionIndex);
        }
        if (scope.view.flxListDropdown.isVisible === true) {
          scope.view.flxListDropDown.setVisibility = false;
        }
        scope.view.forceLayout();
      } catch (err) {
        var errorObj = {
          "method": "onSegmentRowToggle",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : setTabNavigation
    * This metod handles tab Navigation
    * @return : NA
    */
    setTabNavigation: function () {
      var scope = this;
      try {
        //scope.view.flxGuaranteesLC.setVisibility(true);
        scope.view.tbxSearch.text = "";
        scope.view.imgClear.setVisibility(false);
        scope.view.segTransactionList.removeAll();
        scope.view.flxPagination.setVisibility(false);
        scope.view.btnTab1.skin = "ICSknBtnAccountSummarySelected2";
        scope.view.btnTab2.skin = "ICSknBtnAccountSummaryUnselected2";
        scope.view.btnTab3.skin = "ICSknBtnAccountSummaryUnselected2";
        //Setting tab header data
        scope.view.flxSegHeaderAmendments.setVisibility(false);
        scope.view.flxSegLCHeader.setVisibility(true);
        scope.view.tbxSearch.placeholder = scope.presenter.renderI18nKeys("i18n.TradeFinance.guaranteeAndSblcSearchString", false);
        if (scope.isSearchEnabled === false) {
          scope.view.tbxSearch.text = "";
          scope.view.imgClear.setVisibility(false);
        }
        if (scope.currentTab === GUARANTEES_TAB) {
          sortField.imgCoulmnTab3 = "lcType";
          scope.serviceParameters = {
            searchString: "",
            pageSize: "11",
            pageOffset: 0,
            sortByParam: "receivedOn",
            sortOrder: "DESC",
            timeParam: "receivedOn",
            timeValue: "6,MONTH",
            filterByValue: "",
            filterByParam: ""
          };
          scope.switchToLOCTab();
        }
        else if (scope.currentTab === AMENDMENTS_TAB) {
          sortField.imgCoulmnTab3 = "billType";
          scope.serviceParameters = {
            searchString: "",
            pageSize: "11",
            pageOffset: 0,
            sortByParam: "receivedOn",
            sortOrder: "DESC",
            timeParam: "receivedOn",
            timeValue: "",
            filterByValue: "",
            filterByParam: "",
          };
          scope.switchToAmendmentsTab();
        }
        else if (scope.currentTab === CLAIMS_TAB) {
          scope.serviceParameters = {
            searchString: "",
            pageSize: "11",
            pageOffset: 0,
            sortByParam: "serviceRequestTime",
            sortOrder: "DESC",
            timeParam: "serviceRequestTime",
            timeValue: "6,MONTH",
            filterByValue: "",
            filterByParam: ""
          };
          scope.switchToClaimsTab();
        }
        scope.setFilterUIView();
        scope.setViewActions();
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesReceivedDashboardController",
          "method": "setTabNavigation",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
   * @api : switchToLOCTab
   * This metod handles functionalities on click of LOC Tab
   * @return : NA
   */
    switchToLOCTab: function () {
      var scope = this;
      try {
        scope.view.lblFilterText.text = scope.presenter.renderI18nKeys("i18n.konybb.Common.All", false);
        if (scope.guaranteesLCDetails > 0) {
          scope.view.flxVerticalEllipsis.setVisibility(true);
          scope.view.flxDropDown.width = "280dp";
          scope.view.flxDropDown.right = "50dp";
        } else {
          scope.view.flxVerticalEllipsis.setVisibility(false);
          scope.view.flxDropDown.width = "310dp";
          scope.view.flxDropDown.right = "20dp";
        }
        scope.setDefaultSort("imgCoulmnTab5");
        scope.currentTab = GUARANTEES_TAB;
        scope.view.btnTab1.skin = "ICSknBtnAccountSummarySelected2";
        scope.view.btnTab2.skin = "ICSknBtnAccountSummaryUnselected2";
        scope.view.btnTab3.skin = "ICSknBtnAccountSummaryUnselected2";
        scope.view.flxSegLCHeader.setVisibility(true);
        scope.view.flxSegHeaderAmendments.setVisibility(false);
        scope.view.flxSegHeaderClaims.setVisibility(false);
        scope.view.tbxSearch.placeholder = scope.presenter.renderI18nKeys("i18n.TradeFinance.guaranteeAndSblcSearchString", false);
        scope.setPaginationComponent("Guarantees");
        var rowTemplate = scope.getSegmentTemplate();
        scope.view.segTransactionList.rowTemplate = rowTemplate.row;
        scope.setSegmentWidgetDataMap();
        if(newStatusDashboard){
          scope.setQuickLinksUI();
        }
        else{
          scope.fetchDashboardData();
        }
      } catch (err) {
        var errorObj = {
          "method": "switchToLOCTab",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    switchToAmendmentsTab: function () {
      var scope = this;
      try {
        scope.currentTab = AMENDMENTS_TAB;
        scope.view.btnTab1.skin = "ICSknBtnAccountSummaryUnselected2";
        scope.view.btnTab2.skin = "ICSknBtnAccountSummarySelected2";
        scope.view.btnTab3.skin = "ICSknBtnAccountSummaryUnselected2";
        scope.view.flxSegLCHeader.setVisibility(false);
        scope.view.flxSegHeaderAmendments.setVisibility(true);
        scope.view.flxSegHeaderClaims.setVisibility(false);
        scope.view.tbxSearch.placeholder = kony.i18n.getLocalizedString("i18n.TradeFinance.guaranteeAndSblcSearchString");
        scope.setPaginationComponent(kony.i18n.getLocalizedString("i18n.ImportLC.Amendments"));
        var rowTemplate = scope.getSegmentTemplate();
        scope.view.segTransactionList.rowTemplate = rowTemplate.row;
        scope.setSegmentWidgetDataMap();
        scope.fetchDashboardData();
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesReceivedDashboardController",
          "method": "switchToAmendmentsTab",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * @api : switchToClaimsTab
     * This metod handles functionalities on click of Claims Tab
     * @return : NA
     */
    switchToClaimsTab: function () {
      var scope = this;
      try {
        scope.view.lblFilterText.text = scope.presenter.renderI18nKeys("i18n.konybb.Common.All", false);
        if (scope.guaranteesLCDetails > 0) {
          scope.view.flxVerticalEllipsis.setVisibility(true);
          scope.view.flxDropDown.width = "280dp";
          scope.view.flxDropDown.right = "50dp";
        } else {
          scope.view.flxVerticalEllipsis.setVisibility(false);
          scope.view.flxDropDown.width = "310dp";
          scope.view.flxDropDown.right = "20dp";
        }
        var breakpoint = kony.application.getCurrentBreakpoint();
        if (breakpoint === 1024 || orientationHandler.isTablet) {
          scope.setDefaultSort("imgColumnClaimsTab1");
        }
        else {
          scope.setDefaultSort("imgColumnClaimsTab4");
        }
        scope.currentTab = CLAIMS_TAB;
        scope.isClaimsTabRendered = true;
        scope.view.btnTab1.skin = "ICSknBtnAccountSummaryUnselected2";
        scope.view.btnTab2.skin = "ICSknBtnAccountSummaryUnselected2";
        scope.view.btnTab3.skin = "ICSknBtnAccountSummarySelected2";
        scope.view.flxSegLCHeader.setVisibility(false);
        scope.view.flxSegHeaderAmendments.setVisibility(false);
        scope.view.flxClaimsHeader.setVisibility(true);
        scope.view.flxSegHeaderClaims.setVisibility(true);
        scope.view.tbxSearch.placeholder = scope.presenter.renderI18nKeys("i18n.TradeFinance.guaranteeAndSblcSearchString", false);
        scope.setPaginationComponent("Claims");
        var rowTemplate = scope.getSegmentTemplate();
        scope.view.segTransactionList.rowTemplate = rowTemplate.row;
        scope.setSegmentWidgetDataMap();
        scope.fetchDashboardData();
      } catch (err) {
        var errorObj = {
          "method": "switchToClaimsTab",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
   * @api : setFilterWidgetDataMap
   * Maps widgetdata to  filter segments
   * @return : NA
   */
    setImportFilterWidgetDataMap: function () {
      var scope = this;
      try {
        scope.view.segLCAccountType.widgetDataMap = {
          "lblLCAccountType": "lblLCAccountType",
          "lblLCCheckbox": "lblLCCheckbox",
          "flxLCAccountType": "flxLCAccountType"
        };
        scope.view.segLCStatusType.widgetDataMap = {
          "lblStatusType": "lblStatusType",
          "lblLCCheckbox": "lblLCCheckbox",
          "flxStatus": "flxStatus"
        };
        scope.view.segBillType.widgetDataMap = {
          "lblStatusType": "lblStatusType",
          "lblLCCheckbox": "lblLCCheckbox",
          "flxStatus": "flxStatus"
        };
        scope.view.segTimePeriods.widgetDataMap = {
          "lblFeatureName": "lblFeatureName",
          "lblLCCheckbox": "lblLCCheckbox",
          "flxLCTimePeriodRow": "flxLCTimePeriodRow"
        };
      } catch (err) {
        var errorObj = {
          "method": "setImportFilterWidgetDataMap",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : toggleFilterDropDownVisibility
    * Hides or shows the filter dropw down based on its current state
    * @return : NA
    */
    toggleFilterDropDownVisibility: function () {
      var scope = this;
      try {
        if (scope.view.imgFilterDropdown.src === "arrowdown_sm.png") {
          if (scope.isFilterApplied) {
            scope.view.segLCAccountType.setData(scope.segFilter1Data);
            scope.view.segBillType.setData(scope.segFilter2Data);
            scope.view.segLCStatusType.setData(scope.segFilter3Data);
            scope.view.segTimePeriods.setData(scope.segFilter4Data);
          } else {
            scope.setSegLCProductTypeFilterData();
            scope.setSegBillTypeData();
            scope.setStatusTypeFilterData();
            scope.setsegTimeFilterData();
          }
          scope.view.btnApply.skin = "ICSknbtnEnabed003e7536px";
          scope.view.btnApply.setEnabled(true);
          scope.view.flxListDropdown.setVisibility(true);
          scope.view.imgFilterDropdown.src = "arrowup_sm.png";
        } else {
          scope.view.flxListDropdown.setVisibility(false);
          scope.view.imgFilterDropdown.src = "arrowdown_sm.png";
        }
        scope.view.forceLayout();
      } catch (err) {
        var errorObj = {
          "method": "toggleFilterDropDownVisibility",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
   * @api : moreActionOnClick
   * Handles visibility of more actions dropdown
   * @return : NA
   */
    moreActionOnClick: function () {
      var scope = this;
      try {
        if (this.view.flxEllipsisDropDown.isVisible) this.view.flxEllipsisDropDown.setVisibility(false);
        else this.view.flxEllipsisDropDown.setVisibility(true);
      } catch (err) {
        var errorObj = {
          "method": "moreActionOnClick",
          "error": err
        };
        scope.onError(errorObj);
      }
    },


    /**
    * @api : moreActionSegDataMapping
    * Sets data for more actions dropdown
    * @return : NA
    */
    moreActionSegDataMapping: function () {
      var scope = this;
      try {
        scope.view.segEllipsisDropDownValues.skin = "sknSegScrollHide";
        scope.view.segEllipsisDropDownValues.widgetDataMap = {
          "flxAccountTypes": "flxAccountTypes",
          "lblUsers": "lblUsers",
          "lblSeparator": "lblSeparator"
        };
        var segData = [
          [{},
          [{
            lblUsers: {
              text: scope.presenter.renderI18nKeys("i18n.TradeFinance.ExportList", false),
              toolTip: scope.presenter.renderI18nKeys("i18n.TradeFinance.ExportList", false),
              isVisible: true,
              skin: "ICSknLbl72727215pxSSPR",
            },
            flxAccountTypes: {
              onClick: scope.downloadXLSXFile.bind(this),
              isVisible: true,
            },
          },]
          ]
        ];
        scope.view.segEllipsisDropDownValues.setData(segData);
      } catch (err) {
        var errorObj = {
          "method": "moreActionSegDataMapping",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
   * @api : setFilterUIView
   * This Method handles filter dropdown UI
   * @return : NA
   */
    setFilterUIView: function () {
      var scope = this;
      try {
        scope.setImportFilterWidgetDataMap();
        scope.view.segLCAccountType.setVisibility(true);
        scope.view.segLCStatusType.setVisibility(true);
        scope.view.segTimePeriods.setVisibility(true);
        scope.view.segBillType.setVisibility(true);
        scope.view.flxLCTypeHeadingSeparator.setVisibility(true);
        scope.view.flxBillTypeHeadingSeparartor.setVisibility(true);
        scope.view.flxStatusTypeHeadingSeparator.setVisibility(true);
        scope.view.flxLCTimePeriodHeadingSeparator.setVisibility(true);
        scope.view.imgAccountLCDropdown.src = "arrowup_sm.png";
        scope.view.imgStatusLCDropdown.src = "arrowup_sm.png";
        scope.view.imgTimePeriodDropdown.src = "arrowup_sm.png";
        scope.setSegLCProductTypeFilterData();
        scope.setSegBillTypeData();
        scope.setStatusTypeFilterData();
        scope.setsegTimeFilterData();
        scope.view.forceLayout();
      } catch (err) {
        var errorObj = {
          "method": "setFilterUIView",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
   * @api : setSegLCProductTypeFilterData
   * Widget data mapping for LC type segment
   * @return : NA
   */
    setSegLCProductTypeFilterData: function () {
      var scope = this;
      try {
        scope.view.lblAccountLCType.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.productType", false) + " (" + scope.presenter.renderI18nKeys("i18n.TradeFinance.Required", false) + ")";
        scope.segFilter1Data = [];
        scope.segFilter1Data = [{
          lblLCAccountType: {
            text: scope.presenter.renderI18nKeys("i18n.TradeFinance.SelectAll", false),
            isVisible: true
          },
          lblLCCheckbox: {
            text: "C",
            isVisible: true
          },
          flxLCAccountType: {
            onClick: this.filterRowOnClick.bind(this, "segLCAccountType", "selectAll")
          }
        }, {
          lblLCAccountType: {
            text: scope.presenter.renderI18nKeys("i18n.TradeFinance.guarantee", false),
            isVisible: true,
            key: OLBConstants.GUARANTEE_LC_PRODUCT_TYPE.GUARANTEE
          },
          lblLCCheckbox: {
            text: "C",
            isVisible: true
          },
          flxLCAccountType: {
            onClick: this.filterRowOnClick.bind(this, "segLCAccountType", "widgetLabel")
          }
        }, {
          lblLCAccountType: {
            text: scope.presenter.renderI18nKeys("i18n.TradeFinance.standByLCFilter", false),
            isVisible: true,
            key: OLBConstants.GUARANTEE_LC_PRODUCT_TYPE.STANDBY_LC
          },
          lblLCCheckbox: {
            text: "C",
            isVisible: true
          },
          flxLCAccountType: {
            onClick: this.filterRowOnClick.bind(this, "segLCAccountType", "widgetLabel")
          }
        }];
        scope.view.segLCAccountType.setData(scope.segFilter1Data);
      } catch (err) {
        var errorObj = {
          "method": "setSegLCProductTypeFilterData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : setSegBillTypeData
    * Widget data mapping for Currency segment
    * @return : NA
    */
    setSegBillTypeData: function () {
      var scope = this;
      try {
        scope.view.lblBillType.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.GTAndSlbc", false) + " (" + scope.presenter.renderI18nKeys("i18n.TradeFinance.Required", false) + ")";
        scope.segFilter2Data = [];
        scope.segFilter2Data = [{
          lblStatusType: {
            text: scope.presenter.renderI18nKeys("i18n.TradeFinance.SelectAll", false),
            isVisible: true
          },
          lblLCCheckbox: {
            text: "C",
            isVisible: true
          },
          flxStatus: {
            onClick: this.filterRowOnClick.bind(this, "segBillType", "selectAll")
          }
        }, {
          lblStatusType: {
            text: scope.presenter.renderI18nKeys("i18n.wealth.performance", false),
            isVisible: true,
            key: OLBConstants.GUARANTEE_AND_STANDBYLC_BILLTYPE.PERFORMANCE
          },
          lblLCCheckbox: {
            text: "C",
            isVisible: true
          },
          flxStatus: {
            onClick: this.filterRowOnClick.bind(this, "segBillType", "widgetLabel")
          }
        }, {
          lblStatusType: {
            text: scope.presenter.renderI18nKeys("i18n.TradeFinance.BID", false),
            isVisible: true,
            key: OLBConstants.GUARANTEE_AND_STANDBYLC_BILLTYPE.BID
          },
          lblLCCheckbox: {
            text: "C",
            isVisible: true
          },
          flxStatus: {
            onClick: this.filterRowOnClick.bind(this, "segBillType", "widgetLabel")
          }
        }, {
          lblStatusType: {
            text: scope.presenter.renderI18nKeys("i18n.TradeFinance.Advance", false),
            isVisible: true,
            key: OLBConstants.GUARANTEE_AND_STANDBYLC_BILLTYPE.ADVANCE
          },
          lblLCCheckbox: {
            text: "C",
            isVisible: true
          },
          flxStatus: {
            onClick: this.filterRowOnClick.bind(this, "segBillType", "widgetLabel")
          }
        }, {
          lblStatusType: {
            text: scope.presenter.renderI18nKeys("i18n.TradeFinance.shipping", false),
            isVisible: true,
            key: OLBConstants.GUARANTEE_AND_STANDBYLC_BILLTYPE.SHIPPING
          },
          lblLCCheckbox: {
            text: "C",
            isVisible: true
          },
          flxStatus: {
            onClick: this.filterRowOnClick.bind(this, "segBillType", "widgetLabel")
          }
        }];
        scope.view.segBillType.setData(scope.segFilter2Data);
      } catch (err) {
        var errorObj = {
          "method": "setSegBillTypeData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
   * @api : setStatusTypeFilterData
   * This method sets status data for filter
   * @return : NA
   */
    setStatusTypeFilterData: function () {
      var scope = this;
      try {
        scope.view.lblStatusLCType.text = scope.presenter.renderI18nKeys("i18n.ChequeManagement.Status", false) + " (" + scope.presenter.renderI18nKeys("i18n.TradeFinance.Required", false) + ")";
        scope.segFilter3Data = [];
        if (scope.currentTab === GUARANTEES_TAB) {
          scope.segFilter3Data = [{
            lblStatusType: {
              text: scope.presenter.renderI18nKeys("i18n.TradeFinance.SelectAll", false),
              isVisible: true
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "selectAll")
            }
          }, {
            lblStatusType: {
              text: scope.presenter.renderI18nKeys("i18n.userManagement.new", false),
              isVisible: true,
              key: OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.NEW
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")
            }
          }, {
            lblStatusType: {
              text: scope.presenter.renderI18nKeys("i18n.TradeFinance.SubmittedToBank", false),
              isVisible: true,
              key: OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.SUBMITTED_TO_BANK
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")
            }
          }, {
            lblStatusType: {
              text: scope.presenter.renderI18nKeys("kony.mb.ApprovalRequests.Approved", false),
              isVisible: true,
              key: OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.APPROVED
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")
            }
          }, {
            lblStatusType: {
              text: scope.presenter.renderI18nKeys("i18n.TradeFinance.processingwithBank", false),
              isVisible: true,
              key: OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.PROCESSING_WITH_BANK
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")
            }
          }, {
            lblStatusType: {
              text: scope.presenter.renderI18nKeys("i18n.TradeFinance.ReturnedbyBank", false),
              isVisible: true,
              key: OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.RETURNED_BY_BANK
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")
            }
          }, {
            lblStatusType: {
              text: scope.presenter.renderI18nKeys("i18n.Search.Rejected", false),
              isVisible: true,
              key: OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.REJECTED
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")
            }
          }, {
            lblStatusType: {
              text: scope.presenter.renderI18nKeys("i18n.TradeFinance.ClaimHonoured", false),
              isVisible: true,
              key: OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.CLAIM_HONOURED
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")
            }
          }];
        } else if (scope.currentTab === AMENDMENTS_TAB) {
          scope.segFilter3Data = [{
            lblStatusType: {
              text: scope.presenter.renderI18nKeys("i18n.TradeFinance.SelectAll", false),
              isVisible: true
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "selectAll")
            }
          }, {
            lblStatusType: {
              text: scope.presenter.renderI18nKeys("i18n.userManagement.new", false),
              isVisible: true,
              key: OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.NEW
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")
            }
          }, {
            lblStatusType: {
              text: scope.presenter.renderI18nKeys("i18n.TradeFinance.SubmittedToBank", false),
              isVisible: true,
              key: OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.SUBMITTED_TO_BANK
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")
            }
          }, {
            lblStatusType: {
              text: scope.presenter.renderI18nKeys("kony.mb.ApprovalRequests.Approved", false),
              isVisible: true,
              key: OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.APPROVED
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")
            }
          }, {
            lblStatusType: {
              text: scope.presenter.renderI18nKeys("i18n.Search.Rejected", false),
              isVisible: true,
              key: OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.REJECTED
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")
            }
          }, {
            lblStatusType: {
              text: scope.presenter.renderI18nKeys("i18n.TradeFinance.ReturnedbyBank", false),
              isVisible: true,
              key: OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.RETURNED_BY_BANK
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")
            }
          }];
        } else if (scope.currentTab === CLAIMS_TAB) {
          scope.segFilter3Data = [{
            lblStatusType: {
              text: scope.presenter.renderI18nKeys("i18n.TradeFinance.SelectAll", false),
              isVisible: true
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "selectAll")
            }
          }, {
            lblStatusType: {
              text: scope.presenter.renderI18nKeys("kony.mb.Messages.draft", false),
              isVisible: true,
              key: OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.DRAFT
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")
            }
          }, {
            lblStatusType: {
              text: scope.presenter.renderI18nKeys("i18n.TradeFinance.SubmittedToBank", false),
              isVisible: true,
              key: OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.SUBMITTED_TO_BANK
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")
            }
          }, {
            lblStatusType: {
              text: scope.presenter.renderI18nKeys("i18n.TradeFinance.processingwithBank", false),
              isVisible: true,
              key: OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.PROCESSING_WITH_BANK
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")
            }
          }, {
            lblStatusType: {
              text: scope.presenter.renderI18nKeys("i18n.TradeFinance.ReturnedbyBank", false),
              isVisible: true,
              key: OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.RETURNED_BY_BANK
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")
            }
          }, {
            lblStatusType: {
              text: scope.presenter.renderI18nKeys("i18n.ImportDrawings.RejectedByBank", false),
              isVisible: true,
              key: OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.REJECTED_BY_BANK
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")
            }
          }, {
            lblStatusType: {
              text: scope.presenter.renderI18nKeys("i18n.TradeFinance.ClaimHonoured", false),
              isVisible: true,
              key: OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.CLAIM_HONOURED
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")
            }
          }, {
            lblStatusType: {
              text: scope.presenter.renderI18nKeys("i18n.TradeFinance.ClaimExtended", false),
              isVisible: true,
              key: OLBConstants.GUARANTEES_RECEIVED_CONSTANTS.CLAIM_EXTENDED
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")
            }
          }
          ];
        }
        scope.view.segLCStatusType.setData(scope.segFilter3Data);
      } catch (err) {
        var errorObj = {
          "method": "setStatusTypeFilterData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : setsegTimeFilterData
    * Widget data mapping for time period segment
    * @return : NA
    */
    setsegTimeFilterData: function () {
      var scope = this;
      try {
        let timePeriodTypes = [];
        timePeriodTypes = ['Today', 'Last One Month', 'Last Six Months', 'Last One Year', 'YTD'];
        scope.view.lblTimePeriodType.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.TimePeriod", false),
          scope.segFilter4Data = [];
        timePeriodTypes.forEach((timePeriodType, idx) => {
          scope.segFilter4Data.push({
            lblFeatureName: {
              text: timePeriodType,
              isVisible: true
            },
            lblLCCheckbox: {
              text: idx === 2 ? "M" : "L",
              skin: idx === 2 ? "ICSknLblRadioBtnSelectedFontIcon003e7520px" : "sknLblOlbFontIconsA0A0A020Px",
              isVisible: true,
              cursorType: "pointer"
            },
            flxLCTimePeriodRow: {
              onClick: this.filterRowOnClick.bind(this, "segTimePeriods", "TimePeriod")
            }
          });
        });
        scope.view.segTimePeriods.setData(scope.segFilter4Data);
      } catch (err) {
        var errorObj = {
          "method": "setsegTimeFilterData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : filterRowOnClick
    * This method handles row onClick of fiter dropdown
    * @return : NA
    */
    filterRowOnClick: function (segName, widgetName) {
      var scope = this;
      try {
        var statusTypeCount = 0;
        var lcTypeCount = 0;
        var billTypeCount = 0;
        var segmentdata = scope.view[segName].data;
        var rowData = scope.view[segName].selectedRowItems;
        var index = scope.view[segName].selectedRowIndex;
        var sectionIndex = index[0];
        var rowIndex = index[1];
        var timePeriodCurrentImage = "";
        if (segName === "segLCAccountType" || segName === "segLCStatusType" || segName === "segBillType") {
          if (segmentdata[rowIndex].lblLCCheckbox.text === "D") {
            segmentdata[rowIndex].lblLCCheckbox.text = "C";
            if (rowIndex !== 0) {
              segmentdata[0].lblLCCheckbox.text = "D";
            }
          } else {
            segmentdata[rowIndex].lblLCCheckbox.text = "D";
            if (rowIndex !== 0) {
              segmentdata[0].lblLCCheckbox.text = "D";
            }
          }
        } else {
          if (rowIndex === scope.previousFilterSelection) {
            segmentdata[rowIndex].lblLCCheckbox.text = "L";
            segmentdata[rowIndex].lblLCCheckbox.skin = "sknLblOlbFontIconsA0A0A020Px";
            segmentdata[scope.previousFilterSelection].lblLCCheckbox.text = "M";
            segmentdata[scope.previousFilterSelection].lblLCCheckbox.skin = "ICSknLblRadioBtnSelectedFontIcon003e7520px";
            scope.previousFilterSelection = rowIndex;
          } else {
            segmentdata[rowIndex].lblLCCheckbox.text = "M";
            segmentdata[rowIndex].lblLCCheckbox.skin = "ICSknLblRadioBtnSelectedFontIcon003e7520px";
          }
        }
        if (widgetName === "customDataRange" || widgetName === "TimePeriod") {
          for (var i = 0; i < segmentdata.length; i++) {
            if (i !== rowIndex) {
              segmentdata[i].lblLCCheckbox.text = "L";
              segmentdata[i].lblLCCheckbox.skin = "sknLblOlbFontIconsA0A0A020Px";
            }
          }
        }
        if (widgetName === "customDataRange") {
          if (segmentdata[rowIndex].lblLCCheckbox.text === "L") {
            scope.view.flxCustomDateRange.setVisibility(false);
          } else {
            scope.view.flxCustomDateRange.setVisibility(true);
          }
        }
        if (widgetName === "selectAll") {
          for (var i = 0; i < segmentdata.length; i++) {
            segmentdata[i].lblLCCheckbox.text = segmentdata[rowIndex].lblLCCheckbox.text;
          }
        }
        scope.view[segName].setData(segmentdata);
        scope.view.forceLayout();
        if (widgetName !== "TimePeriod") {
          var lcTypeData = scope.view.segLCAccountType.data;
          for (var i = 0; i < lcTypeData.length; i++) {
            if (lcTypeData[i].lblLCCheckbox.text === "C") {
              lcTypeCount++;
              if (lcTypeCount === 2) {
                lcTypeData[0].lblLCCheckbox.text = "C";
                scope.view.segLCAccountType.removeAll();
                scope.view.segLCAccountType.setData(lcTypeData);
              }
            }
          }
          var statusTypeData = scope.view.segLCStatusType.data;
          for (var i = 0; i < statusTypeData.length; i++) {
            if (statusTypeData[i].lblLCCheckbox.text === "C") {
              statusTypeCount++;
              if ((statusTypeCount === 7 && scope.currentTab === GUARANTEES_TAB) || (statusTypeCount === 5 && scope.currentTab === AMENDMENTS_TAB) || (statusTypeCount === 7 && scope.currentTab === CLAIMS_TAB)) {
                statusTypeData[0].lblLCCheckbox.text = "C";
                scope.view.segLCStatusType.removeAll();
                scope.view.segLCStatusType.setData(statusTypeData);
              }
            }
          }
          var billTypeData = scope.view.segBillType.data;
          for (var i = 0; i < billTypeData.length; i++) {
            if (billTypeData[i].lblLCCheckbox.text === "C") {
              billTypeCount++;
              if (billTypeCount === 4) {
                billTypeData[0].lblLCCheckbox.text = "C";
                scope.view.segBillType.removeAll();
                scope.view.segBillType.setData(billTypeData);
              }
            }
          }
          if (lcTypeCount >= 1 && statusTypeCount >= 1 && billTypeCount >= 1) {
            scope.view.btnApply.onClick = scope.applyFilters;
            scope.view.btnApply.skin = "ICSknbtnEnabed003e7536px";
            scope.view.btnApply.setEnabled(true);
          } else {
            scope.view.btnApply.skin = "ICSknbtnDisablede2e9f036px";
            scope.view.btnApply.setEnabled(false);
          }
        }
        scope.view[segName].setData(segmentdata);
        scope.view.forceLayout();
      } catch (err) {
        var errorObj = {
          "method": "filterRowOnClick",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
    * @api : setPaginationComponent
    * This method will invoked to set pagination variables
    * @return : NA
    */
    setPaginationComponent: function (pageHeader) {
      var scope = this;
      try {
        scope.view.PaginationContainer.setPageSize(10);
        scope.view.PaginationContainer.setLowerLimit(1);
        scope.view.PaginationContainer.setPageHeader(pageHeader);
        scope.view.PaginationContainer.setServiceDelegate(scope.fetchDashboardData.bind(scope, 'pagination'));
        scope.view.PaginationContainer.setIntervalHeader();
      } catch (err) {
        var errorObj = {
          "method": "setPaginationComponent",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
* @api : getSegmentTemplate
* This metod will return segment template for breakpoint
* @return : {JSON}
*/
    getSegmentTemplate: function () {
      var scope = this;
      try {
        var segmentTemplate = {};
        var orientationHandler = new OrientationHandler();
        var breakpoint = kony.application.getCurrentBreakpoint();
        if (breakpoint === 1024 || orientationHandler.isTablet) {
          if (scope.currentTab === GUARANTEES_TAB) {
            segmentTemplate["row"] = "flxLCTransactionListCollapseTablet";
            segmentTemplate["expanded"] = "flxLCTransactionListExpandTablet";
          } else if (scope.currentTab === AMENDMENTS_TAB) {
            segmentTemplate["row"] = "flxLCAmendmentsCollapseTablet";
            segmentTemplate["expanded"] = "flxLCAmendmentsExpandTablet";
          } else if (scope.currentTab === CLAIMS_TAB) {
            segmentTemplate["row"] = "flxLCClaimsCollapseTablet";
            segmentTemplate["expanded"] = "flxLCClaimsExpandTablet";
          }
        } else {
          if (scope.currentTab === GUARANTEES_TAB) {
            segmentTemplate["row"] = "flxLCTransactionListCollapse";
            segmentTemplate["expanded"] = "flxLCTransactionListExpand";
          } else if (scope.currentTab === AMENDMENTS_TAB) {
            segmentTemplate["row"] = "flxLCAmendmentsCollapse";
            segmentTemplate["expanded"] = "flxLCAmendmentsExpand";
          } else if (scope.currentTab === CLAIMS_TAB) {
            segmentTemplate["row"] = "flxLCClaimsListCollapse";
            segmentTemplate["expanded"] = "flxLCClaimsListExpand";
          }
        }
        return segmentTemplate;
      } catch (err) {
        var errorObj = {
          "level": "frmGuaranteesReceivedDashboardController",
          "method": "getSegmentTemplate",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    toggleCreateNewClaimPopup: function (visibility) {
      this.view.flxCreateNewClaimPopup.setVisibility(visibility);
      if (visibility) {
        FormControllerUtility.disableButton(this.view.CreateNewClaim.btnCopyDetails);
        this.presenter.getReceivedGuarantees({
          filterByParam: "status",
          filterByValue: "Approved",
          sortByParam: "receivedOn",
          sortOrder: "DESC"
        }, this.view.id);
      }
      this.view.forceLayout();
    },
    getSearchedRecords: function () {
      const text = this.view.CreateNewClaim.txtSearchBox.text || '';
      this.presenter.getReceivedGuarantees({
        searchString: text,
        filterByParam: "status",
        filterByValue: "Approved",
        sortByParam: "receivedOn",
        sortOrder: "DESC"
      }, this.view.id);
    },
    viewGuaranteeDetails: function () {
      const data = this.view.CreateNewClaim.getData();
      this.toggleCreateNewClaimPopup(false);
      this.navigateLCView(data);
    },
    createNewClaim: function () {
      const data = this.view.CreateNewClaim.getData();
      this.toggleCreateNewClaimPopup(false);
      this.presenter.showGuaranteesReceivedScreen({
        context: 'createGuaranteeClaim',
        data,
        form: this.view.id
      });
    },

    /**
     * @api : navigateToPrint
     * Navigating to the print based on condition
     * @return : NA
     */
    navigateToPrint: function () {
      var scope = this;
      try {
        let dataObj = {
          lcData,
          previousFormName: 'frmReceivedGuaranteeAmendment'
        }
        formNameForPrint = 'frmPrintReceivedGuaranteeAmendments';
        new kony.mvc.Navigation({
          "appName": "TradeFinanceMA",
          "friendlyName": `GuaranteesReceivedUIModule/${formNameForPrint}`
        }).navigate(dataObj);
      } catch (err) {
        var errorObj = {
          "level": "frmReceivedGuaranteeAmendmentController",
          "method": "navigateToPrint",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : navigateToDownload
     * Navigation to download
     * @return : NA
     */
    navigateToDownload: function () {
      var scope = this;
      try {
        scope.presenter.generateGuaranteesReceivedAmendments({
          "amendmentSRMSRequestId": lcData.amendmentSrmsId
        }, "frmReceivedGuaranteeAmendment");
      } catch (err) {
        var errorObj = {
          "level": "frmReceivedGuaranteeAmendmentController",
          "method": "navigateToDownload",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    showSuccessMessage: function (viewModel) {
      this.view.flxErrorMessage.setVisibility(false);
      this.view.flxSuccessMessage.setVisibility(true);
      if (this.currentTab === CLAIMS_TAB) {
        this.view.lblSuccessMessage.text = kony.i18n.getLocalizedString(viewModel.status.toLowerCase() === 'deleted' ? "i18n.TradeFinance.deleteDraftClaimSuccessMessage" : "i18n.TradeFinance.yourClaimHasBeenSavedAsADraft");
      }
      this.view.forceLayout();
    },
    showServerError: function (errorMsg) {
      this.view.flxErrorMessage.setVisibility(true);
      this.view.flxSuccessMessage.setVisibility(false);
      this.view.lblErrorMessage.text = errorMsg;
      this.view.forceLayout();
    },
    /**
     * Method to handle the segment row view on click of dropdown
     */
    handleSegmentRowView: function () {
      try {
        const rowIndex = this.view.segTransactionList.selectedRowIndex[1];
        const data = this.view.segTransactionList.data;
        const breakpoint = kony.application.getCurrentBreakpoint();
        let expandedHeight;
        if (this.currentTab === CLAIMS_TAB) {
          expandedHeight = (breakpoint === 1024 || orientationHandler.isTablet) ? "188dp" : "200dp";
        }
        let pre_val;
        let requiredView = [];
        const collapsedView = ["O", false, "sknFlxIdentifier", "sknffffff15pxolbfonticons", "50dp", "sknflxffffffnoborder"];
        const expandedView = ["P", true, "sknflxBg4a90e2op100NoBorder", "sknSSP4176a415px", expandedHeight, "slFboxBGf8f7f8B0"];
        if (this.previousIndex === rowIndex) {
          requiredView = data[rowIndex].lblDropdown === "P" ? collapsedView : expandedView;
          this.toggleSegmentRowView(rowIndex, requiredView);
        } else {
          if (this.previousIndex >= 0) {
            pre_val = this.previousIndex;
            this.toggleSegmentRowView(pre_val, collapsedView);
          }
          pre_val = rowIndex;
          this.toggleSegmentRowView(rowIndex, expandedView);
        }
        this.previousIndex = rowIndex;
      } catch (err) {
        const errorObj = {
          "level": "frmReceivedGuaranteeAmendmentController",
          "method": "handleSegmentRowView",
          "error": err
        };
        this.onError(errorObj);
      }
    },
    /**
     * Method to toggle the segment row view
     * @param {Number} index - index of segment row to toggle
     * @param {Array} viewData - data which need to be assigned to toggled view
     */
    toggleSegmentRowView: function (index, viewData) {
      try {
        let data = this.view.segTransactionList.data[index];
        const template = data.template;
        data.lblDropdown = viewData[0];
        data.flxIdentifier.isVisible = viewData[1];
        data.flxIdentifier.skin = viewData[2];
        data.lblIdentifier.skin = viewData[3];
        data[template].height = viewData[4];
        data[template].skin = viewData[5];
        this.view.segTransactionList.setDataAt(data, index);
      } catch (err) {
        const errorObj = {
          "level": "frmReceivedGuaranteeAmendmentController",
          "method": "toggleSegmentRowView",
          "error": err
        };
        this.onError(errorObj);
      }
    },
    /**
    * @api : onError
    * Error thrown from catch block in component and shown on the form
    * @return : NA
    */
    onError: function (err) {
      let errMsg = JSON.stringify(err);
      errMsg.level = "frmGuaranteesReceivedDashboardController";
    }
  };
});