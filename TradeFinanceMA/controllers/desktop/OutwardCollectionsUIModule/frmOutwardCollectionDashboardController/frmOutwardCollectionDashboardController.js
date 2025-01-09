define(['CommonUtilities', 'OLBConstants', 'ViewConstants', 'FormControllerUtility', 'FormatUtil'], function (CommonUtilities, OLBConstants, ViewConstants, FormControllerUtility, FormatUtil) {
  let globalView;
  let isTablet = false;
  let NA = kony.i18n.getLocalizedString("i18n.common.NA");
  let serviceResponse = {};
  let recordsData = {};
  let presenter;
  let prevSelectedIndex;
  let TAB_COLLECTIONS = kony.i18n.getLocalizedString("i18n.TradeFinance.collections"), 
          TAB_AMENDMENTS = kony.i18n.getLocalizedString("i18n.ImportLC.Amendments"), 
          CURRENT_TAB = TAB_COLLECTIONS, 
          CURRENT_ROW_TEMPLATE = 'flxTempInwardAmendmentList',
          CURRENT_EXPAND_ROW_TEMPLATE = 'flxTempInwardAmendmentListExpand';
  let segLCAccountType = '';
  let segLCStatusType = '';
  let segTimePeriods = '';
  let filterByValue = "";
  let filterByParam = "";
  let isSearchEnabled = false;
  let isFilterApplied = false;
  let segFilter1Data = [];
  let segFilter2Data = [];
    let statusData = {};
  let segFilter3Data = [];
	let downloadXLSXData = "";
    let pageConfig = {
    "pageOffset": "0",
    "pageSize": "11"
  };
  this.downloadXLSXData = "";
    let serviceParameters = {
    "searchString": "",
    "pageSize": "",
    "pageOffset": "",
    "sortByParam": "createdOn",
    "sortOrder": "DESC",
    "timeParam": "",
    "timeValue": "6,MONTH",
    "filterByValue": "",
    "filterByParam": ""
    };
    let chartServiceParameters = {
    searchString: "",
    pageSize: "",
    pageOffset: "",
    sortByParam: "createdOn",
    sortOrder: "DESC",
    timeParam: "createdOn",
    timeValue: "1,MONTH",
    filterByValue: "",
    filterByParam: "",
  };
  let SEG_REF;
  let flowType = "";
  let collectionStatusData = {};
  let amendmentStatusData = {};
  let isChartRendered = false;
  let orientationHandler = new OrientationHandler();
  let chartAndStatusData = {};
  let lcCurrency = {};
  let selectedCurrency = "USD";
  let selectedTimePeriod = "";
  let tenorType;
  let tenorTypeLength = 0;
  let productType;
  let serviceResponseTemp;
  let isAmendViewDetailsonClick = false;
  let isViewDetailsBtnOnClick = false;
  let iscreatenewamendment = false;
  let collectionsChart;
  this.selectedRecord = {};
  let collectionsStatus;
  let formatUtil;
  let ViewAllCollections = kony.i18n.getLocalizedString("i18n.TradeFinance.viewAllCollections");
  let sortFields = {
      "imgTabOneListHeader1": "drawerName",
      "imgTabOneListHeader2": "tenorType",
      "imgTabOneListHeader3": "documentNo",
      "imgTabOneListHeader4": "updatedOn",
      "imgTabOneListHeader5": "amount",
      "imgTabOneListHeader6": "status",
      "imgTabTwoListHeader1": "corporateUserName",
      "imgTabTwoListHeader2": "amendmentNo",
      "imgTabTwoListHeader3": "amendmentReference",
      "imgTabTwoListHeader4": "updatedOn",
      "imgTabTwoListHeader5": "amount",
      "imgTabTwoListHeader6": "status"
  };
  let navigationFrom = '';
  return{
    /**
     * Sets the initial actions for form
     */ 
    init : function(){
      this.view.preShow = this.preShow;
      this.view.postShow = this.postShow;
      this.view.onDeviceBack = function () { };
      this.view.onBreakpointChange = this.onBreakPointChange;
      this.initFormActions();
    },

    /**
         * @api : onNavigate
         * * Triggers when navigation come to this form
         * @return : NA
        */
    onNavigate: function (data) {
      var scope = this;
      try {
        if (data.flowType) {
          data.flowType === ViewAllCollections ? flowType = TAB_COLLECTIONS : flowType = TAB_AMENDMENTS;
          navigationFrom = data.flowType;
          if (navigationFrom == scope.presenter.outwardConstants.saveCollectionAsDraft || navigationFrom == scope.presenter.outwardConstants.deletedCollection) {
            flowType = TAB_COLLECTIONS;
          }
        } else if (kony.sdk.isNullOrUndefined(data.flowType)) {
          flowType = TAB_COLLECTIONS;
          navigationFrom = '';
        }
      } catch (err) {
        var errorObj = {
          "method": "onNavigate",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
     * Performs the actions required before rendering form
     */
    preShow: function () {
      var scope = this;
      try{
        formatUtil = applicationManager.getFormatUtilManager();
        lcCurrency = Object.values(scope.presenter.collectionsConfig.currencies);
        chartTimePeriod = Object.values(scope.presenter.collectionsConfig.month);
        popupScope.flxCreateNewAmendContainer.doLayout = CommonUtilities.centerPopupFlex;
        this.view.formTemplate12.flxContentTCCenter.btnChartCurrency.text = lcCurrency[0] + "-" + applicationManager.getConfigurationManager().getCurrency(lcCurrency[0]);
        if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
          globalView.flxNewAndRecentTab.height = '50dp';
        }
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
     * Performs the actions required after rendering form
     */
    postShow: function () {
      var scope = this;
      try{
        scope.view.formTemplate12.flxContentTCCenter.flxCurrencyDropdown.setVisibility(false);
        scope.setSegCurrencyDropdownData();
        scope.setSegChartTimeDropdownData();
        tenorType = scope_configManager.collectionsTenorType;
        collectionsStatus = scope_configManager.OutwardCollectionsChartData;
        collectionsChart = scope_configManager.collectionsChartData;
        isChartRendered = false;
        scope.onTabClick(flowType);
        scope.renderBannerMessages();
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
         * @api : initFormActions
         * Method to initialise form actions
         * @return : NA
        */
    initFormActions: function () {
      var scope = this;
      try {
        scope.presenter = applicationManager.getModulesPresentationController({
          appName: 'TradeFinanceMA',
          moduleName: 'OutwardCollectionsUIModule'
        });
        globalView = this.view.formTemplate12.flxContentTCCenter;
        popupScope = this.view.formTemplate12.flxContentPopup;
        SEG_REF = globalView.segResponseListing;
        collectionStatusData = (scope.presenter.collectionStatusConfig);
        amendmentStatusData = (scope.presenter.amendmentStatusConfig);
        globalView.flxPagination.PaginationContainer.setPageSize(10);
        globalView.flxPagination.PaginationContainer.flxPagination.width = "235dp";
        scope.setPaginationComponent(kony.i18n.getLocalizedString("i18n.TradeFinance.collections"));               
        scope.presenter.getOutwardCollections(chartServiceParameters, "frmOutwardCollectionDashboard");
        isChartRendered = false;
        globalView.btnTab1.onClick = scope.onTabClick.bind(this, TAB_COLLECTIONS);
        globalView.btnTab2.onClick = scope.onTabClick.bind(this, TAB_AMENDMENTS);
        globalView.btnNewOne.onClick = scope.setQuickLinksUI.bind(this, TAB_COLLECTIONS);
        globalView.btnNewTwo.onClick = scope.toggleCreateNewAmendmentPopup.bind(this, true);
        globalView.btnNewOneTab.onClick = scope.setQuickLinksUI.bind(this, TAB_COLLECTIONS);
        globalView.btnNewTwoTab.onClick = scope.toggleCreateNewAmendmentPopup.bind(this, true);
        popupScope.CreateNewAmend.txtSearchBox.placeholder = scope.presenter.renderI18nKeys("i18n.TradeFinance.searchForDraweeOrDocumentNo",false);
        popupScope.CreateNewAmend.btnCopyDetails.onClick = this.createNewAmendment;
        popupScope.CreateNewAmend.btnClose.onClick = this.viewOutwardCollectionDetails;
        popupScope.CreateNewAmend.flxClose.onClick = scope.toggleCreateNewAmendmentPopup.bind(this, false);
        globalView.flxExportList.onClick = scope.moreActionOnClick.bind(this);
        globalView.tbxSearch.text = "";           
        globalView.btnNewOneTab.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.createNewCollection",false);
        globalView.btnNewTwoTab.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.CreateNewAmendment",false);
        globalView.lblClear.setVisibility(false);
        globalView.flxErrorMessage.setVisibility(false);
        globalView.flxErrorClose.onClick = function () {
          globalView.flxErrorMessage.setVisibility(false);
        };
        globalView.tbxSearch.onTextChange = function () {
          if (globalView.tbxSearch.text.length > 0) globalView.lblClear.setVisibility(true);
          else globalView.lblClear.setVisibility(false);
        };
        globalView.tbxSearch.onTouchStart = function () {
          if (globalView.flxListDropdown.isVisible === true) {
            globalView.imgFilterDropdown.src = "arrowdown_sm.png";
            globalView.flxListDropdown.setVisibility(false);
          }
        };
        globalView.lblClear.onTouchEnd = function () {
          globalView.tbxSearch.text = "";
          scope.isSearchEnabled = false;
          globalView.lblClear.setVisibility(false);
          downloadXLSXData = "";
          scope.fetchDashBoardData();
        };
        if (!kony.sdk.isNullOrUndefined(globalView.tbxSearch.text)) {
          globalView.lblClear.setVisibility(false);
        }
        scope.setFilterUIView();
        scope.setFilterData();
        globalView.flxFilter.onClick = scope.toggleFilterDropDownVisibility.bind(this);
        globalView.tbxSearch.onDone = scope.getSearchData;
        globalView.btnApply.onClick = scope.applyFilters;
        globalView.flxListDropdown.setVisibility(false);
        globalView.imgFilterDropdown.src = "arrowdown_sm.png";
        globalView.flxEllipsisDropDown.setVisibility(false);
        scope.view.formTemplate12.flxContentTCCenter.flxChartTitleCurrency.onClick = scope.segDropdownExpandCollapse.bind(this, "lblDropdown", "flxCurrencyDropdown");
        scope.view.formTemplate12.flxContentTCCenter.flxChartTimeFilter.onClick = scope.segDropdownExpandCollapse.bind(this, "lblChartTimeDropdown", "flxChartTimeDropdown");
        globalView.btnCancel.onClick = scope.onFilterCancel;
        globalView.flxEllipsisDropDown.onClick = scope.downloadXLSXFile.bind(this);
        globalView.flxPagination.zIndex = 0;
      } catch (err) {
        var errorObj = {
          "method": "initFormActions",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    
    /**
      * @api : onBreakPointChange
      * Based on break point design will change
      * @return : NA
      */
    onBreakPointChange: function() {
      var scope = this;
      try {
        var currentBreakpoint = kony.application.getCurrentBreakpoint();
        if (currentBreakpoint > 640 && currentBreakpoint <= 1024) {
              // Mobile and Tablet screen
              isTablet = true;
              if (currentBreakpoint === 640) {
                  // Mobile screen
                  globalView.tbxSearch.width = '80%';
                  globalView.flxFilerDropdown.width = '45%';
              } else {
                  // Tablet Screen
                  globalView.tbxSearch.width = '84%';
                  globalView.flxFilerDropdown.width = '71.8%';
              }
          } else if (currentBreakpoint === 1366 || currentBreakpoint === 1380) {
              // Browser screen
              isTablet = false;
              globalView.tbxSearch.width = '86%';
              globalView.flxFilerDropdown.width = '80%';
          }
          for (let i = 2; i <= 6; i++) {
              globalView[`flxTabTwoListHeader${i}`].width = isTablet ? '18%' : '10%';
          }
          globalView.flxChart.width = isTablet ? '100%' : '60%';
          globalView.flxNewAndRecent.isVisible = isTablet ? false : true;
          globalView.flxNewAndRecentTab.isVisible = isTablet ? true : false;
          globalView.flxTabOneListHeader3.isVisible = isTablet ? false : true;
          globalView.flxTabOneListHeader2.left = isTablet ? "3%" : "0%";
          globalView.flxTabOneListHeader5.isVisible = isTablet ? false : true;
          globalView.flxTabOneListHeader5.width = '10%';
          globalView.flxTabOneListHeader5.left = '7%';
          globalView.flxTabOneListHeader1.right = isTablet ? '2%' : '6%';
          globalView.flxTabOneListHeader4.left = isTablet ? '11%' : '2%';
          globalView.flxTabOneListHeader6.left = isTablet ? '10%' : '2%';
          globalView.flxTabOneListHeader7.left = isTablet ? '13%' : '1%';
          // Amendment tab values
          globalView.flxPagination.zIndex = 0;
          globalView.flxTabTwoListHeader2.isVisible = isTablet ? false : true;
          globalView.flxTabTwoListHeader5.isVisible = isTablet ? false : true;
          globalView.flxTabTwoListHeader2.width = '13%';
          globalView.flxTabTwoListHeader3.left = isTablet ? '2%' : '0%';
          if (Object.keys(serviceResponse).length > 0) scope.renderDataInDashboardList();
        } catch (err) {
            var errorObj = {
                "method": "onBreakPointChange",
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
        if (viewModel.serverError) {
          globalView.flxErrorMessage.setVisibility(true);
          this.showServerError(viewModel.serverError);
        }
        if(viewModel.OutwardCollections && iscreatenewamendment){
          let filteredRecords = scope.filterApprovedRecords(viewModel.OutwardCollections);
          popupScope.CreateNewAmend.setData(filteredRecords, 'outwardCollectionAmendment');
          iscreatenewamendment = false;
        }
        else if (viewModel.OutwardCollections && CURRENT_TAB === TAB_COLLECTIONS) {
            serviceResponse = viewModel.OutwardCollections;
            recordsData = serviceResponse.slice(0, 10);
            scope.guaranteesLCDetails = viewModel.OutwardCollections;
            if (Object.keys(serviceResponse).length > 0) {
                globalView.flxListingSegment.setVisibility(true);
                globalView.flxNoTransactions.setVisibility(false);
                globalView.flxPagination.setVisibility(true);
                if (!isChartRendered) {
                    isChartRendered = true;
                    scope.customWidgets();
                    scope.getStatusAndChartData();
                }
                else{
                scope.renderDataInDashboardList();
                if (scope.presenter.isEmptyNullOrUndefined(globalView.lblRecentOneTypeRefValue.text) && scope.presenter.isEmptyNullOrUndefined(globalView.lblRecentTwoTypeRefValue.text)) {
                    recentCollectionsData = serviceResponse.slice(0, 2);
                    scope.setRecentCollectionsData();
                }
              }
            } else {
                globalView.flxListingSegment.setVisibility(false);
                globalView.flxNoTransactions.setVisibility(true);
                globalView.flxPagination.setVisibility(false);
                globalView.flxExportList.setVisibility(false);
            }
        }
        if (viewModel.OutwardCollectionAmendments && !isAmendViewDetailsonClick) {
          serviceResponse = viewModel.OutwardCollectionAmendments;
          if (Object.keys(serviceResponse).length > 0) {
              globalView.flxListingSegment.setVisibility(true);
              globalView.flxNoTransactions.setVisibility(false);
              globalView.flxPagination.setVisibility(true);
              recordsData = serviceResponse.slice(0, 10);
              scope.renderDataInDashboardList();
          } else {
              globalView.flxListingSegment.setVisibility(false);
              globalView.flxNoTransactions.setVisibility(true);
              globalView.flxPagination.setVisibility(false);
          }
        }
        const offset = globalView.flxPagination.PaginationContainer.getPageOffset();
        if (offset === 0) {
          globalView.flxPagination.PaginationContainer.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_INACTIVE;
        } else {
          globalView.flxPagination.PaginationContainer.imgPaginationPrevious.src = ViewConstants.IMAGES.PAGINATION_BACK_ACTIVE;
        }
        if (!kony.sdk.isNullOrUndefined(serviceResponse) && serviceResponse.length > 10) {
          globalView.flxPagination.PaginationContainer.imgPaginationNext.src = "pagination_next_active_container.png";
          globalView.flxPagination.PaginationContainer.imgPaginationNext.imageScaleMode = constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS;
        } else {
          globalView.flxPagination.PaginationContainer.imgPaginationNext.src = "pagination_next_inactive.png";
        }
        if (viewModel.collectionReference && CURRENT_TAB === TAB_COLLECTIONS && isViewDetailsBtnOnClick) {
            isViewDetailsBtnOnClick = false;
            new kony.mvc.Navigation({
                "appName": "TradeFinanceMA",
                "friendlyName": "OutwardCollectionsUIModule/frmOutwardCollectionsViewDetails"
            }).navigate(viewModel);
        }
            
      } catch (err) {
        var errorObj = {
          "method": "updateFormUI",
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
        var segCurrencyData = [],
            i;
        scope.view.formTemplate12.flxContentTCCenter.segCurrencyDropdown.rowTemplate = "flxGuaranteesDropdown"
        scope.view.formTemplate12.flxContentTCCenter.segCurrencyDropdown.widgetDataMap = {
          "flxGuaranteesDropdown": "flxGuaranteesDropdown",
          "lblLCValue": "lblLCValue",
          "lblSeparator": "lblSeparator"
        };
        for (i = 0; i < lcCurrency.length; i++) {
          segCurrencyData[i] = {
            "lblLCValue": {
              "text": lcCurrency[i] + "-" + applicationManager.getConfigurationManager().getCurrency(lcCurrency[i]),
              "isVisible": true,
            },
            "flxGuaranteesDropdown": {
              "onClick": scope.segCurrencyDropdownOnclick.bind(this),
              "isVisible": true,
            }
          };
        }
        scope.view.formTemplate12.flxContentTCCenter.segCurrencyDropdown.setData(segCurrencyData);
      } catch (err) {
        var errorObj = {
          "method": "setSegCurrencyDropdownData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    
    /**
      * @api : segCurrencyDropdownOnclick
      * This function handles onClick of each row in segLCDropdown
      * @return : NA
      */
    segCurrencyDropdownOnclick: function () {
      var scope = this;
      try {
        let segmentdata = JSON.parse(JSON.stringify(scope.view.formTemplate12.flxContentTCCenter.segCurrencyDropdown.data));
        var rowIndex = scope.view.formTemplate12.flxContentTCCenter.segCurrencyDropdown.selectedRowIndex[1];
        scope.view.formTemplate12.flxContentTCCenter.btnChartCurrency.text = segmentdata[rowIndex].lblLCValue.text;
        selectedCurrency = lcCurrency[rowIndex];
        scope.view.formTemplate12.flxContentTCCenter.flxCurrencyDropdown.setVisibility(false);
        scope.view.formTemplate12.flxContentTCCenter.lblDropdown.text = "O";
        scope.setBarChartData();
        scope.setStatusData();
      } catch (err) {
        var errorObj = {
          "method": "segCurrencyDropdownOnclick",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    
    /**
      * @api : setSegChartTimeDropdownData
      * This function sets widget data mapping for All Guarantees & Standby LC dropdown
      * @return : NA
      */
    setSegChartTimeDropdownData: function() {
      var scope = this;
      try {
          var segCurrencyData = [],
              i;
          scope.view.formTemplate12.flxContentTCCenter.segChartTime.rowTemplate = "flxGuaranteesDropdown"
          scope.view.formTemplate12.flxContentTCCenter.segChartTime.widgetDataMap = {
              "flxGuaranteesDropdown": "flxGuaranteesDropdown",
              "lblLCValue": "lblLCValue",
              "lblSeparator": "lblSeparator"
          };
          for (i = 0; i < chartTimePeriod.length; i++) {
              segCurrencyData[i] = {
                  "lblLCValue": {
                      "text": chartTimePeriod[i],
                      "isVisible": true,
                      "left": "9dp"
                  },
                  "flxGuaranteesDropdown": {
                      "onClick": scope.segChartTimeDropdownOnclick.bind(this),
                      "isVisible": true,
                  }
              };
          }
          scope.view.formTemplate12.flxContentTCCenter.segChartTime.setData(segCurrencyData);
      } catch (err) {
          var errorObj = {
              "method": "setSegCurrencyDropdownData",
              "error": err
          };
          scope.onError(errorObj);
      }
  },

  /**
    * @api : segCurrencyDropdownOnclick
    * This function handles onClick of each row in segLCDropdown
    * @return : NA
    */
  segChartTimeDropdownOnclick: function() {
      var scope = this;
      try {
          let segmentdata = JSON.parse(JSON.stringify(scope.view.formTemplate12.flxContentTCCenter.segChartTime.data));
          var rowIndex = scope.view.formTemplate12.flxContentTCCenter.segChartTime.selectedRowIndex[1];
          scope.view.formTemplate12.flxContentTCCenter.btnChartMonth.text = segmentdata[rowIndex].lblLCValue.text;
          selectedTimePeriod = chartTimePeriod[rowIndex];
          scope.view.formTemplate12.flxContentTCCenter.flxChartTimeDropdown.setVisibility(false);
          scope.view.formTemplate12.flxContentTCCenter.lblChartTimeDropdown.text = "O";
          scope.view.formTemplate12.flxContentTCCenter.flxCurrencyDropdown.setVisibility(false);
          scope.renderChartTimefilter();
      } catch (err) {
          var errorObj = {
              "method": "segCurrencyDropdownOnclick",
              "error": err
          };
          scope.onError(errorObj);
      }
  },

    /**
	  * @api : segDropdownExpandCollapse
	  * This function handles expand and collapse of segLCDropdown
	  * @return : NA
	  */
    segDropdownExpandCollapse: function (labelID, flxID) {
      var scope = this;
      try {
        if (scope.view.formTemplate12.flxContentTCCenter[labelID].text === "O") {
          scope.view.formTemplate12.flxContentTCCenter[flxID].setVisibility(true);
          scope.view.formTemplate12.flxContentTCCenter[labelID].text = "P";
        } else {
          scope.view.formTemplate12.flxContentTCCenter[flxID].setVisibility(false);
          scope.view.formTemplate12.flxContentTCCenter[labelID].text = "O";
        }
        if (flxID === "flxChartTimeDropdown") {
          scope.view.formTemplate12.flxContentTCCenter.flxCurrencyDropdown.setVisibility(false);
          scope.view.formTemplate12.flxContentTCCenter.lblDropdown.text = "O";
      } else {
          scope.view.formTemplate12.flxContentTCCenter.flxChartTimeDropdown.setVisibility(false);
          scope.view.formTemplate12.flxContentTCCenter.lblChartTimeDropdown.text = "O";
      }
      } catch (err) {
        var errorObj = {
          "method": "segDropdownExpandCollapse",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    renderChartTimefilter: function() {
      var scope = this;
      try {
          chartServiceParameters.timeParam = "updatedOn";
		  selectedTimePeriod = selectedTimePeriod.replace(" ", ",");
          chartServiceParameters.timeValue = selectedTimePeriod;
          isChartRendered = false;
          scope.fetchDashBoardData();
      } catch (err) {
          var errorObj = {
              "method": "renderChartTimefilter",
              "error": err
          };
          scope.onError(errorObj);
      }
    },

    filterApprovedRecords : function(records){
      let approvedCollections = [];
      const scope = this
      for(key in records){
        let parsedRecord = records[key].lastAmendmentDetails ? JSON.parse(records[key].lastAmendmentDetails) : "" ;        
        if(scope.presenter.isEmptyNullOrUndefined(parsedRecord) || (!scope.presenter.isEmptyNullOrUndefined(parsedRecord) && (parsedRecord.amendmentStatus === scope.presenter.collectionStatusConfig.Approved || parsedRecord.amendmentStatus === scope.presenter.collectionStatusConfig.Rejected ))) 
        {
          approvedCollections.push(records[key]);
        }
      }
      return approvedCollections;
    },
    setQuickLinksUI: function(flxID) {
      var scope = this;
      try {
          if (flxID === TAB_COLLECTIONS) {
            scope.presenter.showOutwardCollectionScreen({
              context: 'createCollection'
            });
          } else {}
      } catch (err) {
          var errorObj = {
              "method": "setQuickLinksUI",
              "error": err
          };
          scope.onError(errorObj);
      }
    },
    toggleCreateNewAmendmentPopup: function (visibility) {
      try {
        popupScope.setVisibility(visibility);
        popupScope.flxCreateNewAmendPopup.setVisibility(visibility);
        if (visibility) {
          iscreatenewamendment = true;
          FormControllerUtility.disableButton(popupScope.CreateNewAmend.btnCopyDetails);
          this.presenter.getOutwardCollections({
            filterByParam: "status",
            filterByValue: "Approved",
            sortByParam: "createdOn",
            sortOrder: "DESC"
          }, "frmOutwardCollectionDashboard");
        }
      }
      catch (err) {
        var errorObj = {
          "method": "toggleCreateNewAmendmentPopup",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    getSearchedRecords: function () {
      const text = popupScope.CreateNewAmend.txtSearchBox.text || '';
      iscreatenewamendment = true;
      this.presenter.getOutwardCollections({
        searchString: text,
        filterByParam: "status",
        filterByValue: "Approved",
        sortByParam: "createdOn",
        sortOrder: "DESC"
      }, "frmOutwardCollectionDashboard");;
    },
    viewOutwardCollectionDetails: function () {
      const data = popupScope.CreateNewAmend.getData();
      this.toggleCreateNewAmendmentPopup(false);
      this.presenter.showOutwardCollectionScreen({
        context: 'viewCollectionDetails',
        data,
        form : this.view.id
      });
    },
    createNewAmendment: function () {
      const data = popupScope.CreateNewAmend.getData();
      this.toggleCreateNewAmendmentPopup(false);
      this.presenter.showOutwardCollectionScreen({
        context: 'createAmendment',
        data,
        // form: this.view.id
      });

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
          height: 180,
          width: 200,
          legend: {
            position: 'none'
          },
          isStacked: true,
          bar: {
            groupWidth: "20%"
          },
          vAxis: {
            gridlines: {
              color: "#F6F6F6"
            },
            viewWindow: {
              min: 0
            },
            format: "short"
          }
        };
        if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
          options.width = 380;
        } else if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
          options.width = 600;
        } else if (kony.application.getCurrentBreakpoint() === 1366 || orientationHandler.isDesktop) {
          options.width = 600;
        }

        var BarChart = new kony.ui.CustomWidget({
          "id": "OutwardCollectionBarChart",
          "isVisible": true,
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
          "OnClickOfBar": function (data) { }
        });
        scope.view.formTemplate12.flxContentTCCenter.flxBarGraphMain.add(BarChart);
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
     * @api : setBarChartData
     * Sets data to chart
     * @return : NA
     */
    setBarChartData: function() {
      var scope = this;
      try {
          var data = [];
          var i, j, budget, remainingBudget, toolTip,
              position;
          tenorTypeLength = tenorType.length;
          for (j = 0; j < tenorTypeLength; j++) {
              tenorType[j].type = tenorType[j].type.charAt(0).toLocaleUpperCase() + tenorType[j].type.slice(1);
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
              budget = statusData["Approved"]["totalAmount"][(tenorType[j].type).toLowerCase()][selectedCurrency] ? statusData["Approved"]["totalAmount"][(tenorType[j].type).toLowerCase()][selectedCurrency] : 0;
              remainingBudget = statusData["Available"]["totalAmount"][(tenorType[j].type).toLowerCase()][selectedCurrency] ? statusData["Available"]["totalAmount"][(tenorType[j].type).toLowerCase()][selectedCurrency] : 0;
              toolTip = tenorType[j].type + "\n" + kony.i18n.getLocalizedString("i18n.konybb.Common.Approved") + " " + kony.i18n.getLocalizedString("i18n.wealth.amount") + " : " + formatUtil.formatAmountandAppendCurrencySymbol(JSON.stringify(budget), selectedCurrency) + "\n" + kony.i18n.getLocalizedString("i18n.TradeFinance.processing") + " " + kony.i18n.getLocalizedString("i18n.wealth.amount") + " : " + formatUtil.formatAmountandAppendCurrencySymbol(JSON.stringify(remainingBudget), selectedCurrency);
              barData.categoryName = tenorType[j].type;
              barData.budget1 = budget;
              barData.budget1ColorCode = tenorType[j].colorCode;
              barData.budget2 = remainingBudget;
              barData.budget2ColorCode = "color:" + tenorType[j].colorCode + ";" + "opacity:0.5";
              barData.budget1TooltipText = toolTip
              barData.budget2TooltipText = toolTip
              barData.remainingBudgeTooltipText = toolTip
              data.push(barData);
          }
          scope.view.formTemplate12.flxContentTCCenter.flxBarGraphMain.OutwardCollectionBarChart.chartData = data;
      } catch (err) {
          var errorObj = {
              "level": "frmInwardCollectionsDashboardNewController",
              "method": "setBarChartData",
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
    getStatusAndChartData: function() {
        var scope = this;
        try {
            //chartAndStatusData holds count and total Amount of records, grouped based on statuses.
            chartAndStatusData = scope.guaranteesLCDetails.reduce(function(acc, res) {
                let status = (res['status'] !== Object.keys(collectionStatusData)[0] ? res['status'] : "").toLowerCase();
                let currency = res['currency'] ? res['currency'] : "USD";
                let currentTenorType = (res['tenorType'] ? res['tenorType'] : "").toLowerCase();
                if (!acc[status]) {
                    acc[status] = {};
                    acc[status] = {
                        "totalAmount": {
                            "sight": {},
                            "usance": {}
                        },
                        "count": {
                            "sight": {},
                            "usance": {}
                        }
                    };
                }
                if (!acc[status]["count"][currentTenorType][currency]) {
                    acc[status]["totalAmount"][currentTenorType][currency] = 0;
                    acc[status]["count"][currentTenorType][currency] = 0;
                }
                acc[status]["totalAmount"][currentTenorType][currency] = acc[status]["totalAmount"][currentTenorType][currency] + (res['amount'] && (res['amount'] !== "" || res['amount'] !== " ") ? parseFloat(res['amount']) : 0);
                acc[status]["count"][currentTenorType][currency] = acc[status]["count"][currentTenorType][currency] + 1;
                return acc;
            }, {});
            //Total amount and count of individual status values for grouped in their respective Display status group
            for (let i = 0; i < collectionsStatus.length; i++) {
                statusData[collectionsStatus[i].DisplayStatus] = {};
                statusData[collectionsStatus[i].DisplayStatus] = {
                    "totalAmount": {
                        "sight": {},
                        "usance": {}
                    },
                    "count": {
                        "sight": {},
                        "usance": {}
                    }
                };
                if (!statusData["Available"]) {
                    statusData["Available"] = {
                        "totalAmount": {
                            "sight": {},
                            "usance": {}
                        }
                    };
                }
                if (!statusData["Approved"]) {
                    statusData["Approved"] = {
                        "totalAmount": {
                            "sight": {},
                            "usance": {}
                        },
                        "count": {
                            "sight": {},
                            "usance": {}
                        }
                    };
                }
                for (let j = 0; j < collectionsStatus[i].outwardStatus.length; j++) {
                    for (let k = 0; k < Object.keys(chartAndStatusData).length; k++) {
                        if ((collectionsStatus[i].outwardStatus[j]).toLowerCase() === (Object.keys(chartAndStatusData)[k]).toLowerCase()) {
                            collectionsStatus[i].outwardStatus[j] = Object.keys(chartAndStatusData)[k];
                            for (let l = 0; l < lcCurrency.length; l++) {
                                //Initiating objects 
                                if (!statusData["Available"]["totalAmount"]["usance"][lcCurrency[l]]) {
                                    statusData["Available"]["totalAmount"]["usance"][lcCurrency[l]] = 0;
                                }
                                if (!statusData["Available"]["totalAmount"]["sight"][lcCurrency[l]]) {
                                    statusData["Available"]["totalAmount"]["sight"][lcCurrency[l]] = 0;
                                }
                                if (!statusData["Approved"]["count"]["usance"][lcCurrency[l]]) {
                                    statusData["Approved"]["count"]["usance"][lcCurrency[l]] = 0;
                                }
                                if (!statusData["Approved"]["count"]["sight"][lcCurrency[l]]) {
                                    statusData["Approved"]["count"]["sight"][lcCurrency[l]] = 0;
                                }
                                if (!statusData["Approved"]["totalAmount"]["sight"][lcCurrency[l]]) {
                                    statusData["Approved"]["totalAmount"]["sight"][lcCurrency[l]] = 0;
                                }
                                if (!statusData["Approved"]["totalAmount"]["usance"][lcCurrency[l]]) {
                                    statusData["Approved"]["totalAmount"]["usance"][lcCurrency[l]] = 0;
                                }
                                //Appending total Amount and count 
                                if (!statusData[collectionsStatus[i].DisplayStatus]["totalAmount"]["usance"][lcCurrency[l]]) statusData[collectionsStatus[i].DisplayStatus]["totalAmount"]["usance"][lcCurrency[l]] = 0;
                                statusData[collectionsStatus[i].DisplayStatus]["totalAmount"]["usance"][lcCurrency[l]] = statusData[collectionsStatus[i].DisplayStatus]["totalAmount"]["usance"][lcCurrency[l]] + (chartAndStatusData[collectionsStatus[i].outwardStatus[j]]["totalAmount"]["usance"][lcCurrency[l]] ? chartAndStatusData[collectionsStatus[i].outwardStatus[j]]["totalAmount"]["usance"][lcCurrency[l]] : 0);
                                if (!statusData[collectionsStatus[i].DisplayStatus]["totalAmount"]["sight"][lcCurrency[l]]) statusData[collectionsStatus[i].DisplayStatus]["totalAmount"]["sight"][lcCurrency[l]] = 0;
                                statusData[collectionsStatus[i].DisplayStatus]["totalAmount"]["sight"][lcCurrency[l]] = statusData[collectionsStatus[i].DisplayStatus]["totalAmount"]["sight"][lcCurrency[l]] + (chartAndStatusData[collectionsStatus[i].outwardStatus[j]]["totalAmount"]["sight"][lcCurrency[l]] ? chartAndStatusData[collectionsStatus[i].outwardStatus[j]]["totalAmount"]["sight"][lcCurrency[l]] : 0);
                                if (!statusData[collectionsStatus[i].DisplayStatus]["count"]["usance"][lcCurrency[l]]) statusData[collectionsStatus[i].DisplayStatus]["count"]["usance"][lcCurrency[l]] = 0;
                                statusData[collectionsStatus[i].DisplayStatus]["count"]["usance"][lcCurrency[l]] = statusData[collectionsStatus[i].DisplayStatus]["count"]["usance"][lcCurrency[l]] + (chartAndStatusData[collectionsStatus[i].outwardStatus[j]]["count"]["usance"][lcCurrency[l]] ? chartAndStatusData[collectionsStatus[i].outwardStatus[j]]["count"]["usance"][lcCurrency[l]] : 0);
                                if (!statusData[collectionsStatus[i].DisplayStatus]["count"]["sight"][lcCurrency[l]]) statusData[collectionsStatus[i].DisplayStatus]["count"]["sight"][lcCurrency[l]] = 0;
                                statusData[collectionsStatus[i].DisplayStatus]["count"]["sight"][lcCurrency[l]] = statusData[collectionsStatus[i].DisplayStatus]["count"]["sight"][lcCurrency[l]] + (chartAndStatusData[collectionsStatus[i].outwardStatus[j]]["count"]["sight"][lcCurrency[l]] ? chartAndStatusData[collectionsStatus[i].outwardStatus[j]]["count"]["sight"][lcCurrency[l]] : 0);
                                //Calcluating Total Amount of Available records
                                if (collectionsStatus[i].outwardStatus[j].toLowerCase() !== OLBConstants.GUARANTEE_LC_STATUS.APPROVED.toLowerCase()) {
                                    statusData["Available"]["totalAmount"]["usance"][lcCurrency[l]] = statusData["Available"]["totalAmount"]["usance"][lcCurrency[l]] + (chartAndStatusData[collectionsStatus[i].outwardStatus[j]]["totalAmount"]["usance"][lcCurrency[l]] ? chartAndStatusData[collectionsStatus[i].outwardStatus[j]]["totalAmount"]["usance"][lcCurrency[l]] : 0);
                                    statusData["Available"]["totalAmount"]["sight"][lcCurrency[l]] = statusData["Available"]["totalAmount"]["sight"][lcCurrency[l]] + (chartAndStatusData[collectionsStatus[i].outwardStatus[j]]["totalAmount"]["sight"][lcCurrency[l]] ? chartAndStatusData[collectionsStatus[i].outwardStatus[j]]["totalAmount"]["sight"][lcCurrency[l]] : 0);
                                }
                            }
                        }
                    }
                }
            }
            scope.setBarChartData();
            scope.setStatusData();
        } catch (err) {
            var errorObj = {
                "level": "frmInwardCollectionsDashboardNewController",
                "method": "getStatusAndChartData",
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
    setStatusData: function() {
        var scope = this;
        try {
            let i, j, widgetStatus = "lblStatus",
                widgetStatusCount = "lblStatusCount",
                widgetStatusAmount = "lblStatusAmount";
            for (i = 0; i < collectionsStatus.length; i++) {
                scope.view.formTemplate12.flxContentTCCenter[widgetStatus + i].text = collectionsStatus[i].DisplayStatus;
                scope.view.formTemplate12.flxContentTCCenter[widgetStatusCount + i].text = (statusData[collectionsStatus[i].DisplayStatus]["count"]["sight"][selectedCurrency] !== undefined && statusData[collectionsStatus[i].DisplayStatus]["count"]["usance"][selectedCurrency] !== undefined) ? JSON.stringify(statusData[collectionsStatus[i].DisplayStatus]["count"]["sight"][selectedCurrency] + statusData[collectionsStatus[i].DisplayStatus]["count"]["usance"][selectedCurrency]) : "0";
                scope.view.formTemplate12.flxContentTCCenter[widgetStatusAmount + i].text = (statusData[collectionsStatus[i].DisplayStatus]["totalAmount"]["sight"][selectedCurrency] !== undefined && statusData[collectionsStatus[i].DisplayStatus]["totalAmount"]["usance"][selectedCurrency] !== undefined) ? formatUtil.formatAmountandAppendCurrencySymbol(JSON.stringify(statusData[collectionsStatus[i].DisplayStatus]["totalAmount"]["sight"][selectedCurrency] + statusData[collectionsStatus[i].DisplayStatus]["totalAmount"]["usance"][selectedCurrency]), selectedCurrency) : formatUtil.formatAmountandAppendCurrencySymbol("0", selectedCurrency);
                if (scope.view.formTemplate12.flxContentTCCenter[widgetStatusAmount + i].text.length > 13) {
                  scope.view.formTemplate12.flxContentTCCenter[widgetStatusAmount + i].top = "10px";
                  scope.view.formTemplate12.flxContentTCCenter[widgetStatusAmount + i].skin = "bbSknLbl424242SSP15Px";
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
      * @api : setRecentCollectionsData
      * This function sets Data for the Recent Collections Section
      * @return : NA
      */
    setRecentCollectionsData: function () {
      var scope = this;
        try {
        globalView.lblRecentOneApplicant.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.transDotRef", true);
        globalView.lblRecentTwoApplicant.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.transDotRef", true);
        globalView.lblRecentOneTypeRef.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.drawee", true);
        globalView.lblRecentTwoTypeRef.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.drawee", true);
        if (!kony.sdk.isNullOrUndefined(recentCollectionsData[0])) {
            globalView.lblRecentOneApplicantValue.text = scope.presenter.isEmptyNullOrUndefined(recentCollectionsData[0].collectionReference) ? NA : recentCollectionsData[0].collectionReference;
            globalView.lblRecentOneTypeRefValue.text = scope.presenter.isEmptyNullOrUndefined(recentCollectionsData[0].draweeName) ? NA : recentCollectionsData[0].draweeName;
            globalView.lblRecentOneStatusValue.text = scope.presenter.isEmptyNullOrUndefined(recentCollectionsData[0].status) ? NA : recentCollectionsData[0].status;
            globalView.btnRecentOneViewDetails.text = scope.presenter.renderI18nKeys("i18n.common.ViewDetails", false);
            globalView.btnRecentOneViewDetails.onClick = scope.getCollectionsByID.bind(this, recentCollectionsData[0].collectionReference, recentCollectionsData[0].status);
        } else {
            globalView.lblRecentOneApplicantValue.text = NA;
            globalView.lblRecentOneTypeRefValue.text = NA;
            globalView.lblRecentOneStatusValue.text = NA;
        }
        if (!kony.sdk.isNullOrUndefined(recentCollectionsData[1])) {
            globalView.lblRecentTwoApplicantValue.text = scope.presenter.isEmptyNullOrUndefined(recentCollectionsData[1].collectionReference) ? NA : recentCollectionsData[1].collectionReference;
            globalView.lblRecentTwoTypeRefValue.text = scope.presenter.isEmptyNullOrUndefined(recentCollectionsData[1].draweeName) ? NA : recentCollectionsData[1].draweeName;
            globalView.lblRecentTwoStatusValue.text = scope.presenter.isEmptyNullOrUndefined(recentCollectionsData[1].status) ? NA : recentCollectionsData[1].status;
            globalView.btnRecentTwoViewDetails.text = scope.presenter.renderI18nKeys("i18n.common.ViewDetails", false);
            globalView.btnRecentTwoViewDetails.onClick = scope.getCollectionsByID.bind(this, recentCollectionsData[0].collectionReference, recentCollectionsData[1].status);
        } else {
            globalView.lblRecentTwoApplicantValue.text = NA;
            globalView.lblRecentTwoTypeRefValue.text = NA;
            globalView.lblRecentTwoStatusValue.text = NA;
        }
    } catch (err) {
        var errorObj = {
            "level": "frmInwardCollectionsDashboardNewController",
            "method": "setRecentCollectionsData",
            "error": err
        };
        scope.onError(errorObj);
    }
},
    
    /**
      * @api : onTabClick
      * Tab navigations
      * @arg: err - object based on error
      * @return : NA
      */
     onTabClick: function (buttonId) {
      var scope = this;
      try {
        globalView.flxPagination.setVisibility(false);
        if (buttonId === TAB_COLLECTIONS) {
          // Collections
          globalView.btnTab1.skin = 'ICSknBtnAccountSummarySelected2';
          globalView.btnTab2.skin = 'ICSknBtnAccountSummaryUnselected2';
          CURRENT_TAB = TAB_COLLECTIONS;
          globalView.flxTabOneListingHeaderContainer.setVisibility(true);
          globalView.flxTabTwoListingHeaderContainer.setVisibility(false);
          serviceResponse = {};
          CURRENT_ROW_TEMPLATE = 'flxTempInwardAmendmentList';
          CURRENT_EXPAND_ROW_TEMPLATE = 'flxTempInwardAmendmentListExpand';
          globalView.tbxSearch.placeholder = scope.presenter.renderI18nKeys("i18n.TradeFinance.searchDraweeDocumentNo",false);
          scope.view.formTemplate12.pageTitle = scope.presenter.renderI18nKeys("i18n.TradeFinance.outwardCollections", false);
          scope.setPaginationComponent(kony.i18n.getLocalizedString("i18n.TradeFinance.collections"));
          scope.setViewActions();
          scope.setFilterUIView();  
          serviceParameters = {
            searchString: "",
            pageSize: "11",
            pageOffset: 0,
            sortByParam: "updatedOn",
            sortOrder: "DESC",
            timeParam: "createdOn",
            timeValue: "6,MONTH",
            filterByValue: Object.keys(collectionStatusData).toString(),
            filterByParam: "status,status,status,status,status,status,status,status,status"
          };  
          globalView.imgTabOneListHeader4.src = "sorting_previous.png";
          globalView.lblFilterText.text = scope.presenter.renderI18nKeys("i18n.konybb.Common.All", false);
          globalView.lblClear.setVisibility(false);
          globalView.tbxSearch.text = "";
          globalView.flxListDropdown.setVisibility(false);
          globalView.imgFilterDropdown.src = "arrowdown_sm.png";
          globalView.flxEllipsisDropDown.setVisibility(false);
          scope.fetchDashBoardData();
        } else if (buttonId === TAB_AMENDMENTS) {
          // Amendments
          CURRENT_TAB = TAB_AMENDMENTS;
          globalView.btnTab1.skin = 'ICSknBtnAccountSummaryUnselected2';
          globalView.btnTab2.skin = 'ICSknBtnAccountSummarySelected2';
          globalView.flxPagination.PaginationContainer.flxPagination.width = "257dp";
          globalView.flxTabOneListingHeaderContainer.setVisibility(false);
          globalView.flxTabTwoListingHeaderContainer.setVisibility(true);
          scope.setDefaultSort("imgTabTwoListHeader4");
          globalView.tbxSearch.placeholder = scope.presenter.renderI18nKeys("i18n.TradeFinance.searchforDrawerTransactionRef", false);
          CURRENT_ROW_TEMPLATE = 'flxTempInwardAmendmentList';
          CURRENT_EXPAND_ROW_TEMPLATE = 'flxTempInwardAmendmentListExpand';
          scope.setPaginationComponent(kony.i18n.getLocalizedString("i18n.ImportLC.Amendments"));
          serviceResponse = serviceResponseTemp;
          scope.setViewActions();
          serviceParameters = {
              searchString: "",
              pageSize: "11",
              pageOffset: 0,
              sortByParam: "updatedOn",
              sortOrder: "DESC",
              timeParam: "requestedOn",
              timeValue: "6,MONTH",
              filterByValue: "",
              filterByParam: ""
          };
          scope.fetchDashBoardData();
        }
      } catch (err) {
        var errorObj = {
          "method": "onTabClick",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    
     /**
   * @api : setViewActions
   * Set the default actions for component
   * @return : NA
   */
    setViewActions: function() {
      var scope = this;
      try {
        var imageName = "";
        if (CURRENT_TAB === TAB_AMENDMENTS) {
          imageName = "flxTabTwoListHeader";
        } else if (CURRENT_TAB === TAB_COLLECTIONS) {
          imageName = "flxTabOneListHeader";
        }
        globalView[imageName + 1].onClick = scope.sortRecords.bind(this, 1);
        globalView[imageName + 2].onClick = scope.sortRecords.bind(this, 2);
        globalView[imageName + 3].onClick = scope.sortRecords.bind(this, 3);
        globalView[imageName + 4].onClick = scope.sortRecords.bind(this, 4);
        globalView[imageName + 5].onClick = scope.sortRecords.bind(this, 5);
        globalView[imageName + 6].onClick = scope.sortRecords.bind(this, 6);
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
      * @api : sortRecords
      * Update sort icons and trigger a action to business controller to sort
      * @return : NA
      */
    sortRecords: function(columnNo) {
      var scope = this;
      try {
          var sortType = "";
          scope.sortApplied = true;
          var imageName = "";
          if (CURRENT_TAB === TAB_COLLECTIONS) {
              imageName = "imgTabOneListHeader";
          } else if (CURRENT_TAB === TAB_AMENDMENTS) {
            imageName = "imgTabTwoListHeader";
        }
          var field = sortFields[imageName + columnNo];
          if (globalView[imageName + columnNo].src === "sortingfinal.png") {
              globalView[imageName + columnNo].src = "sorting_previous.png";
              sortType = "ASC";
          } else if (globalView[imageName + columnNo].src === "sorting_previous.png") {
              globalView[imageName + columnNo].src = "sorting_next.png";
              sortType = "DESC";
          } else {
              globalView[imageName + columnNo].src = "sorting_previous.png";
              sortType = "ASC";
          }
          for (var i = 1; i <= 6; i++) {
              if (i !== columnNo && globalView[imageName + i]) {
                  globalView[imageName + i].src = "sortingfinal.png";
              }
          }
          serviceParameters.sortByParam = field ? field : "";
          serviceParameters.sortOrder = sortType;
          scope.fetchDashBoardData("sort");
      } catch (err) {
          var errorObj = {
              "method": "sortRecords",
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
    getSearchData: function() {
      var scope = this;
      try {
        var searchString = globalView.tbxSearch.text;
        this.lowerLimit = 1;
        globalView.flxPagination.PaginationContainer.setPageSize(10);
        if (searchString !== null && searchString !== undefined) {
          this.isSearchEnabled = true;
          if (CURRENT_TAB === TAB_COLLECTIONS) {
            serviceParameters.pageSize = pageConfig.pageSize;
            serviceParameters.pageOffset = pageConfig.pageOffset;
            serviceParameters.searchString = searchString;
            scope.presenter.getOutwardCollections(serviceParameters, "frmOutwardCollectionDashboard");
          } else if (CURRENT_TAB === TAB_AMENDMENTS) {
            serviceParameters.pageSize = pageConfig.pageSize;
            serviceParameters.pageOffset = pageConfig.pageOffset;
            serviceParameters.searchString = searchString;
            scope.presenter.showOutwardCollectionScreen({
              context: 'outwardAmendments',
              form: scope.view.id,
              data: serviceParameters
          });
          }
          downloadXLSXData = serviceParameters;
        } else {
          this.isSearchEnabled = false;
        }
      } catch (err) {
        var errorObj = {
          "method": "getSearchData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

     /**
         * @api : renderDataInDashboardList
         * Rendering data in dashboard listing segment
         * @arg: err - object based on error
         * @return : NA
        */
    renderDataInDashboardList: function () {
      var scope = this;
      try {
        let masterData = [];
        SEG_REF.widgetDataMap = {
          lblColumn1: "lblColumn1",
          lblColumn2: "lblColumn2",
          lblColumn3: "lblColumn3",
          lblColumn4: "lblColumn4",
          lblColumn5: "lblColumn5",
          lblColumn6: "lblColumn6",
          flxColumn1: "flxColumn1",
          flxColumn2: "flxColumn2",
          flxColumn3: "flxColumn3",
          flxColumn4: "flxColumn4",
          flxColumn5: "flxColumn5",
          flxColumn6: "flxColumn6",
          flxColumn7: "flxColumn7",
          flxDropdown: "flxDropdown",
          lblRow1Column1Value1: "lblRow1Column1Value1",
          lblRow1Column1Value2: "lblRow1Column1Value2",
          imgDaysLeft: "imgDaysLeft",
          lblDaysLeft: "lblDaysLeft",
          imgDaysLeftTab: "imgDaysLeftTab",
          lblRow1Column1Value4: "lblRow1Column1Value4",
          lblRow1Column1Value5: "lblRow1Column1Value5",
          lblRow1Column1Title1: "lblRow1Column1Title1",
          lblRow1Column1Title2: "lblRow1Column1Title2",
          flxRow1Column1Title3: "flxRow1Column1Title3",
          lblRow2Column1Title1: "lblRow2Column1Title1",
          lblRow2Column2Title2: "lblRow2Column2Title2",
          lblRow1Column1Title4: "lblRow1Column1Title4",
          lblRow1Column1Title5: "lblRow1Column1Title5",
          lblRow2Column2Title3: "lblRow2Column2Title3",
          lblRow2Column2Title4: "lblRow2Column2Title4",
          btnDownload: "btnDownload",
          btnPrint: "btnPrint",
          btnAction: "btnAction",
          lblRow2Column1Value1: "lblRow2Column1Value1",
          lblRow2Column2Value2: "lblRow2Column2Value2",
          lblRow2Column2Value3: "lblRow2Column2Value3",
          lblRow2Column2Value4: "lblRow2Column2Value4",
          flxRowOne: "flxRowOne",
          flxRowTwo: "flxRowTwo",
          flxRow1Column1: "flxRow1Column1",
          flxRow1Column2: "flxRow1Column2",
          flxRow1Column3: "flxRow1Column3",
          flxRow1Column4: "flxRow1Column4",
          flxRow1Column5: "flxRow1Column5",
          flxRow1Column6: "flxRow1Column6",
          flxRow1Column7: "flxRow1Column7",
          flxRow2Column1: "flxRow2Column1",
          flxRow2Column2: "flxRow2Column2",
          flxRow2Column3: "flxRow2Column3",
          flxRow2Column4: "flxRow2Column4",
          flxTempInwardAmendmentListExpand: "flxTempInwardAmendmentListExpand",
          flxTempHeaderContainer: "flxTempHeaderContainer"
        };
        if (CURRENT_TAB === TAB_COLLECTIONS) {
          recordsData.map(singleResponse => {
            masterData.push({
              lblColumn1: singleResponse.draweeName ? singleResponse.draweeName : NA,
              lblColumn2: singleResponse.tenorType ? singleResponse.tenorType : NA,
              lblColumn3: {
				text: singleResponse.documentNo ? singleResponse.documentNo  : NA,
				width: "100%",
				skin: "ICSKNLbl42424215PxWordBreak"
			  },
              lblColumn4: {
                text: isTablet ? singleResponse.tenorType ? singleResponse.tenorType : NA : singleResponse.updatedOn ? CommonUtilities.getFrontendDateString(singleResponse.updatedOn, applicationManager.getConfigurationManager().frontendDateFormat) : NA
              },
              lblColumn5: {
                text: isTablet ? singleResponse.updatedOn ? CommonUtilities.getFrontendDateString(singleResponse.updatedOn, applicationManager.getConfigurationManager().frontendDateFormat) : NA : singleResponse.amount ? singleResponse.currency + " " + applicationManager.getFormatUtilManager().formatAmount(singleResponse.amount) : NA,
                right: isTablet ? '0%' : '20%',
              },
              lblColumn6: singleResponse.status ? singleResponse.status : NA,
              flxColumn1: {
                width: isTablet ? '15%' : '10%',
                right: isTablet ? '0%' : '6%'
              },
              flxColumn2: {
                isVisible: isTablet ? false : true
              },
              flxColumn3: {
                isVisible: isTablet ? false : true,
                width: isTablet ? '18%' : '11%'
              },
              flxColumn4: {
                width: isTablet ? '16%' : '10%',
                left: isTablet ? '0%' : '1%'
              },
              flxColumn5: {
                width: isTablet ? '18%' : '18%',
                left: isTablet ? '-2%' : '0%'
              },
              flxColumn6: {
                width: isTablet ? '20%' : '14%',
                left: isTablet ? '9%' : '1%',
              },
              flxColumn7: {
                width: isTablet ? '16%' : '10%'
              },
              flxDropdown: {
                "onClick": scope.onSegmentRowToggle.bind(this)
              },
              btnAction: {
                "text": (singleResponse.status === collectionStatusData.Draft) ? kony.i18n.getLocalizedString("i18n.ImportLC.ContinueEditing") : kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                "toolTip": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                "onClick": function() {
                  isViewDetailsBtnOnClick = true;
                  scope.getCollectionsByID(singleResponse.collectionReference, singleResponse.status);
                  }
                },
                btnDownload: {
                "text": kony.i18n.getLocalizedString("i18n.common.Download"),
                "toolTip": kony.i18n.getLocalizedString("i18n.common.Download"),
                "onClick": function() {
                      scope.presenter.generateOutwardCollections({
                      "collectionReference": singleResponse.collectionReference
                      }, "frmOutwardCollectionDashboard");
                    }
                },
              });
            });
      } else if (CURRENT_TAB === TAB_AMENDMENTS) {
        recordsData.map(singleResponse => {
            masterData.push({
                lblColumn1: singleResponse.corporateUserName ? singleResponse.corporateUserName : NA,
                lblColumn2: singleResponse.amendmentNo ? singleResponse.amendmentNo : NA,
                lblColumn3: singleResponse.amendmentReference ? singleResponse.amendmentReference : NA,
                lblColumn4: {
                  text: isTablet ? singleResponse.amendmentReference ? singleResponse.amendmentReference : NA : singleResponse.updatedOn ? CommonUtilities.getFrontendDateString(singleResponse.updatedOn, applicationManager.getConfigurationManager().frontendDateFormat) : NA
                },
                lblColumn5: {
                  text: isTablet ? singleResponse.updatedOn ? CommonUtilities.getFrontendDateString(singleResponse.updatedOn, applicationManager.getConfigurationManager().frontendDateFormat) : NA : singleResponse.amount ? singleResponse.currency + " " + applicationManager.getFormatUtilManager().formatAmount(singleResponse.amount) : NA,
                  right: isTablet ? '0%' : '14.7%',
                },
                lblColumn6: singleResponse.status ? singleResponse.status : NA,
                flxColumn1: {
                    width: isTablet ? '15%' : '10%',
                    right: isTablet ? '-3%' : '6%'
                },
                flxColumn2: {
                    isVisible: isTablet ? false : true,
                    width: isTablet ? '15%' : '10%',
                },
                flxColumn3: {
                    isVisible: isTablet ? false : true,
                    width: isTablet ? '18%' : '13%',
                    left: isTablet ? '6%' : '3%'
                },
                flxColumn4: {
                    width: isTablet ? '16%' : '7.7%',
                    left: isTablet ? '6%' : '1%'
                },
                flxColumn5: {
                    width: isTablet ? '17%' : '12.3%',
                    left: isTablet ? '0%' : '0.8%'
                },
                flxColumn6: {
                    width: isTablet ? '20%' : '13%',
                    left: isTablet ? '10%' : '5.2%',
                },
                flxColumn7: {
                    width: isTablet ? '16%' : '8%',
                    left: isTablet ? '-4%' : '3%'
                },
                flxRowOne: {
                	width: isTablet ? '81%' : '100%',
              	},
                flxDropdown: {
                    "onClick": scope.onSegmentRowToggle.bind(this)
                },
                flxTempHeaderContainer: {
                    height: isTablet ? "25%" : "44dp"
                },
                btnAction: {
                  "text": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                  "toolTip": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                  "onClick": function() {
                    scope.presenter.showOutwardCollectionScreen({
                      context: "amendViewDetails",
                      form: scope.view.id,
                      data: singleResponse
                  });
                  }},
                btnPrint: {
                    "text": kony.i18n.getLocalizedString("i18n.accounts.print"),
                    "isVisible": isTablet ? false : true,
                    "toolTip": kony.i18n.getLocalizedString("i18n.accounts.print"),
                    "onClick": function() {
                        scope.presenter.showOutwardCollectionScreen({
                            context: "amendmentPrint",
                            form: scope.view.id,
                            data: singleResponse
                        });
                    }
                },
                btnDownload: {
                    "text": kony.i18n.getLocalizedString("i18n.common.Download"),
                    "isVisible": true,
                    "toolTip": kony.i18n.getLocalizedString("i18n.common.Download"),
                    "onClick": function() {
                      scope.presenter.generateOutwardAmendments({
                        "amendmentReference": singleResponse.amendmentReference
                      }, "frmOutwardCollectionDashboard");
                    }
                },
            });
        })
      }  
        SEG_REF.setData(masterData);
      } catch (err) {
          var errorObj = {
          "method": "renderDataInDashboardList",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    
    /**
      * @api : onSegmentRowToggle
      * On clicking of expand image in segment row template
      * @return : NA
      */
    onSegmentRowToggle: function() {
      var scope = this;
      try {
        let index = SEG_REF.selectedRowIndex;
        let rowIndex = index[1];
        let selectedRowDataObject;
        let segData = SEG_REF.data;
        let singleResponse = serviceResponse[rowIndex];
        // Segment without section
        selectedRowDataObject = segData[rowIndex];
        if (!scope.presenter.isEmptyNullOrUndefined(prevSelectedIndex)) {
          // Removing expand row template and assigning normal row template
          let prevSelectedRowDataObject;
          if (!scope.presenter.isEmptyNullOrUndefined(segData[prevSelectedIndex])) {
            prevSelectedRowDataObject = segData[prevSelectedIndex];
            prevSelectedRowDataObject.template = CURRENT_ROW_TEMPLATE;
            if (CURRENT_TAB === TAB_COLLECTIONS) {
              selectedRowDataObject.flxColumn4 = {
                width: isTablet ? '16%' : '10%',
                left: isTablet ? '0%' : '1%'
              };
              selectedRowDataObject.flxColumn5 = {
                width: isTablet ? '18%' : '18%',
                left: isTablet ? prevSelectedRowDataObject.template === 'flxTempInwardAmendmentListExpand' ? '5%' : '-2%' : '0%'
              };
              selectedRowDataObject.flxColumn6 = {
                width: isTablet ? '20%' : '13%',
                left: isTablet ? prevSelectedRowDataObject.template === 'flxTempInwardAmendmentListExpand' ? '2%' : '9%' : '1%',
              };
              selectedRowDataObject.lblColumn5 = {
                text: isTablet ? singleResponse.updatedOn ? CommonUtilities.getFrontendDateString(singleResponse.updatedOn, applicationManager.getConfigurationManager().frontendDateFormat) : NA : singleResponse.amount ? singleResponse.currency + " " + applicationManager.getFormatUtilManager().formatAmount(singleResponse.amount) : NA,
                right: isTablet ? '0%' : '20%',
              };
            }
            if (CURRENT_TAB === TAB_AMENDMENTS) {
              prevSelectedRowDataObject.flxColumn3 = {
                  isVisible: isTablet ? false : true,
                  width: '13%',
              };
              prevSelectedRowDataObject.flxColumn4 = {
                  width: isTablet ? '16%' : '7.7%',
                  left: isTablet ? '6%' : '1%'
              };
              prevSelectedRowDataObject.flxColumn5 = {
                  width: isTablet ? '17%' : '12.3%',
                  left: isTablet ? '0%' : '0.8%'
              };
              prevSelectedRowDataObject.flxColumn6 = {
                  width: isTablet ? '20%' : '13%',
                  left: isTablet ? '9.5%' : '5.2%',
              };
              prevSelectedRowDataObject.flxColumn7 = {
                  left: isTablet ? '1%' : '3%',
                  width: isTablet ? '11.5%' : '8%'
              };
            }
            SEG_REF.setDataAt(prevSelectedRowDataObject, prevSelectedIndex);
            if (prevSelectedIndex === rowIndex) {
              prevSelectedIndex = null;
              return;
            }
          }
        }
        prevSelectedIndex = rowIndex;
        selectedRowDataObject.template = CURRENT_EXPAND_ROW_TEMPLATE;
        // Setting data at expanded row template
        if (CURRENT_TAB === TAB_COLLECTIONS) {
            selectedRowDataObject.flxRow1Column1 = {
              right: isTablet ? '1%' : '6%',
              width: isTablet ? '14%' : '10%'
            };
            selectedRowDataObject.flxRow1Column3 = {
              left: isTablet ? '6%' : '3%',
              width: isTablet ? '15%' : '11%'
            };
            selectedRowDataObject.flxRow1Column4 = {
              left: isTablet ? '5%' : '1%',
              width: isTablet ? '18%' : '13%'
            };
            selectedRowDataObject.flxRow1Column5 = {
              isVisible: isTablet ? false : true
            };
            selectedRowDataObject.flxRow1Column6 = {
              isVisible: isTablet ? false : true
            };
            selectedRowDataObject.flxRow1Column7 = {
              left: isTablet ? '7%' : '2%',
              width: "11%"
            };
            selectedRowDataObject.flxRow2Column1 = {
              right: isTablet ? '1%' : '3%',
              width: isTablet ? '14%' : '13%'
            };
            selectedRowDataObject.flxRow2Column2 = {
              width: isTablet ? '18%' : '13%',
              isVisible: isTablet ? true : Object.keys(collectionStatusData)[6] === singleResponse.status ? true : singleResponse.lastAmendmentDetails ? (JSON.parse(singleResponse.lastAmendmentDetails).cancellationStatus ? true : false) : false,
            };
            selectedRowDataObject.flxRow2Column3 = {
              isVisible: isTablet ? true : Object.keys(collectionStatusData)[6] === singleResponse.status ? true : false,
              width: isTablet ? "13%" : "11%",
              left: isTablet ? "3%" : "0%"
            };
            selectedRowDataObject.flxColumn4 = {
              width: isTablet ? selectedRowDataObject.template === 'flxTempInwardAmendmentListExpand' ? '16%' : '18%' : '10%',
              left: isTablet ? '0%' : '1%'
            };
            selectedRowDataObject.flxColumn5 = {
              width: isTablet ? '18%' : '18%',
              left: isTablet ? selectedRowDataObject.template === 'flxTempInwardAmendmentListExpand' ? '3%' : '5%' : '0%',
            };
            selectedRowDataObject.flxColumn6 = {
              width: isTablet ? '20%' : '13%',
              left: isTablet ? '4%' : '1%',
            };
            selectedRowDataObject.flxColumn7 = {
              width: isTablet ? '16%' : '11%',
            };
            selectedRowDataObject.lblColumn5 = {
              text: isTablet ? singleResponse.updatedOn ? CommonUtilities.getFrontendDateString(singleResponse.updatedOn, applicationManager.getConfigurationManager().frontendDateFormat) : NA : singleResponse.amount ? singleResponse.currency + " " + applicationManager.getFormatUtilManager().formatAmount(singleResponse.amount) : NA,
              right: isTablet ? '30%' : '20%',
            };
            selectedRowDataObject.lblRow1Column1Title1 = {
              text: scope.presenter.renderI18nKeys("i18n.TradeFinance.TransactionRef", false)
            };
            selectedRowDataObject.lblRow1Column1Title2 = {
              text: isTablet ? scope.presenter.renderI18nKeys("i18n.wealth.amount", false) : scope.presenter.renderI18nKeys("i18n.konybb.Template.CreatedOn", false)
            };
            selectedRowDataObject.lblRow1Column1Title4 = {
              text: scope.presenter.renderI18nKeys("i18n.TradeFinance.usanceDetails", false)
            };
            selectedRowDataObject.lblRow2Column1Title1 = {
              text: scope.presenter.renderI18nKeys("i18n.TradeFinance.collectingBank", false)
            };
            selectedRowDataObject.lblRow2Column2Title2 = {
              text: isTablet ? scope.presenter.renderI18nKeys("i18n.AccountsDetails.Createdon", false) : scope.presenter.outwardConstants.overdue.toLowerCase() === singleResponse.status.toLowerCase() ? scope.presenter.renderI18nKeys("i18n.accountDetail.maturityDate", false) : singleResponse.lastAmendmentDetails ? (JSON.parse(singleResponse.lastAmendmentDetails).cancellationStatus ? scope.presenter.renderI18nKeys("i18n.TradeFinance.CancellationStatus", false): NA) : NA,
            };
            selectedRowDataObject.lblRow2Column2Title3 = {
              isVisible: true,
              text: isTablet ? scope.presenter.renderI18nKeys("i18n.TradeFinance.documentNoWithDot", false) : "Bill of Exchange"
            };
            selectedRowDataObject.flxRow1Column1Title3 = {
              text: scope.presenter.renderI18nKeys("i18n.TradeFinance.usanceDays", false)
            };
            selectedRowDataObject.imgDaysLeft = {
              width: "0dp"
            };
            selectedRowDataObject.imgDaysLeftTab = {
              isVisible: false,
              width: "0dp"
            };
            selectedRowDataObject.lblRow2Column1Value1 = {
              left: isTablet ? '1dp' : '0dp',
			  width: "100%"
            };
            selectedRowDataObject.lblDaysLeft = {
              left: isTablet ? '0dp' : '5dp'
            };
            selectedRowDataObject.flxRow1Column2 = {
              width: isTablet ? '15%' : '10%'
            };
            selectedRowDataObject.lblRow1Column1Value5= {
              isVisible: false,
              text : ""
            };
            selectedRowDataObject.lblRow1Column1Title5= {
              isVisible: false,
              text: ""
            };
            selectedRowDataObject.flxRow2Column4 = {
              isVisible: isTablet ? (singleResponse.billOfExchangeStatus ? true : (singleResponse.lastAmendmentDetails ? (JSON.parse(singleResponse.lastAmendmentDetails).cancellationStatus ? true : false): false)) : false,
              left: '7%',
              width: "20%"
            };
            selectedRowDataObject.lblRow2Column2Value4 = {
              text: singleResponse.billOfExchangeStatus ? singleResponse.billOfExchangeStatus : (singleResponse.lastAmendmentDetails ? (JSON.parse(singleResponse.lastAmendmentDetails).cancellationStatus) : NA),
              skin: "ICSknlbl424242SSP15pxSemibold"
            };
            selectedRowDataObject.lblRow2Column2Title4 = {
              text: singleResponse.billOfExchangeStatus ? scope.presenter.renderI18nKeys("i18n.TradeFinance.billOfExchange", false) : (singleResponse.lastAmendmentDetails ? (JSON.parse(singleResponse.lastAmendmentDetails).cancellationStatus ? scope.presenter.renderI18nKeys("i18n.TradeFinance.CancellationStatus", false) : NA ): NA),
            };
            selectedRowDataObject.flxDaysLeftTab = {
              width: "100%"
            };
          if (isTablet) {
              selectedRowDataObject.lblRow1Column1Value1 = singleResponse.tenorType ? singleResponse.tenorType : NA;
              selectedRowDataObject.lblRow1Column1Value2 = singleResponse.amount ? singleResponse.currency + " " + applicationManager.getFormatUtilManager().formatAmount(singleResponse.amount) : NA;
              selectedRowDataObject.lblDaysLeft["text"] = singleResponse.usanceDays ? singleResponse.usanceDays : NA;
              selectedRowDataObject.lblRow1Column1Value4 = singleResponse.usanceDetails ? singleResponse.usanceDetails : NA;
              selectedRowDataObject.lblRow2Column2Value2 = singleResponse.createdOn ? CommonUtilities.getFrontendDateString(singleResponse.createdOn, applicationManager.getConfigurationManager().frontendDateFormat) : NA;
              selectedRowDataObject.lblRow2Column2Value3 = singleResponse.documentNo ? singleResponse.documentNo : NA;
              selectedRowDataObject.lblRow2Column1Value1["text"] = singleResponse.collectingBank ? singleResponse.collectingBank : NA;
          } else {
              selectedRowDataObject.lblRow1Column1Value1 = singleResponse.collectionReference ? singleResponse.collectionReference : NA;
              selectedRowDataObject.lblRow1Column1Value2 = singleResponse.createdOn ? CommonUtilities.getFrontendDateString(singleResponse.createdOn, applicationManager.getConfigurationManager().frontendDateFormat) : NA;
              selectedRowDataObject.lblRow1Column1Value4 = singleResponse.usanceDetails ? singleResponse.usanceDetails : NA;
              selectedRowDataObject.lblRow2Column1Value1["text"] = singleResponse.collectingBank ? singleResponse.collectingBank : NA;
              selectedRowDataObject.lblRow2Column2Value2 = {
                text: singleResponse.status.toLowerCase() === scope.presenter.outwardConstants.overdue ? (singleResponse.maturityDate ? CommonUtilities.getFrontendDateString(singleResponse.maturityDate, applicationManager.getConfigurationManager().frontendDateFormat) : NA) : singleResponse.lastAmendmentDetails ? (JSON.parse(singleResponse.lastAmendmentDetails).cancellationStatus) : NA,
                skin: singleResponse.status.toLowerCase() === scope.presenter.outwardConstants.overdue ? "bbSknLbl424242SSP15Px" : "ICSknlbl424242SSP15pxSemibold"
              };
              selectedRowDataObject.lblDaysLeft["text"] = singleResponse.usanceDays ? singleResponse.usanceDays : NA;
              selectedRowDataObject.lblRow2Column2Value3 = {
                text: singleResponse.billOfExchangeStatus ? singleResponse.billOfExchangeStatus : NA,
                skin: "ICSknlbl424242SSP15pxSemibold"
            };
          }
          selectedRowDataObject.btnPrint = {
            "onClick": function() {
                scope.navigateToPrint(singleResponse);
            },
            "isVisible": isTablet ? false : true
          };
        }else if (CURRENT_TAB === TAB_AMENDMENTS) {
          selectedRowDataObject.flxRow1Column1 = {
              width: isTablet ? '16%' : '10%',
              right: isTablet ? '2%' : '6%'
          };
          selectedRowDataObject.flxRow1Column2 = {
              left: isTablet ? '4.5%' : '0%',
              width: isTablet ? '16%' : '10%',
          };
          selectedRowDataObject.flxRow1Column3 = {
              isVisible: isTablet ? false  : false,
              // left: '11.9%',
              // width: '16%'
          };
          selectedRowDataObject.flxRow1Column4 = {
              isVisible: isTablet ? true : true,
              left: isTablet ? '12%' : '3%',
              width: isTablet ? '28.5%' : '12%'
          }
          selectedRowDataObject.flxRow1Column5 = {
              isVisible: isTablet ? false : true,
              left: '2%',
              width: '12%'
          };
          selectedRowDataObject.flxRow1Column6 = {
              isVisible: isTablet ? false : true
          };
          selectedRowDataObject.flxRow1Column7 = {
              left: isTablet ? '26%' : '14%',
			  width: isTablet ? '11%' : '10%'
          };
          selectedRowDataObject.flxRowTwo = {
            isVisible: isTablet ? true : (singleResponse.cancellationStatus ? true : false)
          };
          selectedRowDataObject.flxRow2Column1 = {
              isVisible: true,
              left: isTablet ? '4%' : '5%',
              width: '15%',
          };
          selectedRowDataObject.flxRow2Column2 = {
              isVisible: isTablet ? true : false,
              left: '-3%',
              width: '14.5%',

          };
          selectedRowDataObject.flxRow2Column3 = {
              isVisible: false
          };
          selectedRowDataObject.flxRow2Column4 = {
              isVisible: isTablet ? true : false,
              left: '8.5%'
          };
          selectedRowDataObject.flxColumn4 = {
              width: isTablet ? '16%' : '7.7%',
              left: isTablet ? '6%' : '1%'
          };
          selectedRowDataObject.flxColumn5 = {
              width: isTablet ? '17%' : '12.3%',
              left: isTablet ? '0%' : '0.8%'
          };
          selectedRowDataObject.flxColumn6 = {
              left: isTablet ? '9.5%' : '5.2%',
              width: isTablet ? '20%' : '13%'
          };
          selectedRowDataObject.flxColumn7 = {
              left: isTablet ? '1%' : '3%',
              width: isTablet ? '11.5%' : '8%'
          };
          selectedRowDataObject.flxTempInwardAmendmentListExpand = {
              height: isTablet ? "176dp" : singleResponse.cancellationStatus ? "176dp" : "111dp"
          };
          selectedRowDataObject.lblRow1Column1Title1 = {
              text: isTablet ? scope.presenter.renderI18nKeys("i18n.TradeFinance.tenorType", false) : scope.presenter.renderI18nKeys("i18n.TradeFinance.tenorType", false)
          };
          selectedRowDataObject.lblRow1Column1Title2 = {
              text: isTablet ? scope.presenter.renderI18nKeys("i18n.TradeFinance.AmendmentNo", false) : scope.presenter.renderI18nKeys("i18n.konybb.Template.CreatedOn", false)
          };
          selectedRowDataObject.lblRow1Column1Title4 = {
              isVisible : true,
              text: isTablet ? scope.presenter.renderI18nKeys("i18n.konybb.Common.Amount", false) : scope.presenter.renderI18nKeys("i18n.accountDetail.maturityDate", false)
          };
          selectedRowDataObject.lblRow1Column1Title5 = {
              isVisible: isTablet ? false : true,
              text: scope.presenter.renderI18nKeys("i18n.TradeFinance.collectingBank", false)
          };
          selectedRowDataObject.lblRow2Column1Title1 = {
              isVisible: true,
              text: isTablet ? scope.presenter.renderI18nKeys("i18n.TradeFinance.collectingBank", false) : scope.presenter.renderI18nKeys("i18n.TradeFinance.CancellationStatus", false)
          };
          selectedRowDataObject.lblRow2Column2Title2 = {
              text: scope.presenter.renderI18nKeys("i18n.accountDetail.maturityDate", false)
          };
          selectedRowDataObject.lblRow2Column2Title4 = {
              text: scope.presenter.renderI18nKeys("i18n.konybb.Template.CreatedOn", false)
          };
          if (isTablet) {
              selectedRowDataObject.lblRow1Column1Value1 = singleResponse.tenorType ? singleResponse.tenorType : NA;
              selectedRowDataObject.lblRow1Column1Value2 = singleResponse.amendmentNo ? singleResponse.amendmentNo : NA;
              selectedRowDataObject.lblRow1Column1Value4 = singleResponse.amount ? applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(singleResponse.amount,singleResponse.currency): NA;
              selectedRowDataObject.lblRow2Column1Value1 = {
                text : singleResponse.collectingBank ? singleResponse.collectingBank : NA,
                skin : "bbSknLbl424242SSP15Px"
              };
              selectedRowDataObject.lblRow2Column2Value2 = singleResponse.maturityDate ? CommonUtilities.getFrontendDateString(singleResponse.maturityDate, applicationManager.getConfigurationManager().frontendDateFormat): NA;
              selectedRowDataObject.lblRow2Column2Value4 = singleResponse.requestedOn ? CommonUtilities.getFrontendDateString(singleResponse.requestedOn, applicationManager.getConfigurationManager().frontendDateFormat): NA;
          } else {
              selectedRowDataObject.lblRow1Column1Value1 = singleResponse.tenorType ? singleResponse.tenorType : NA;
              selectedRowDataObject.lblRow1Column1Value2 = singleResponse.requestedOn ? CommonUtilities.getFrontendDateString(singleResponse.requestedOn, applicationManager.getConfigurationManager().frontendDateFormat) : NA;
              selectedRowDataObject.lblRow1Column1Value4 = singleResponse.maturityDate ? CommonUtilities.getFrontendDateString(singleResponse.maturityDate, applicationManager.getConfigurationManager().frontendDateFormat): NA;
              selectedRowDataObject.lblRow1Column1Value5 = {
              text : singleResponse.collectingBank ? singleResponse.collectingBank : NA,
              skin : "bbSknLbl424242SSP15Px"
              };
              selectedRowDataObject.lblRow2Column1Value1 = {
                text : singleResponse.cancellationStatus ? singleResponse.cancellationStatus : NA,
                skin : "ICSknlbl424242SSP15pxSemibold"
            }
          }
        }
        // Updating the segment data/template at particular index
        SEG_REF.setDataAt(selectedRowDataObject, rowIndex);
      } catch (err) {
        var errorObj = {
          "method": "onSegmentRowToggle",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
         * @api : navigateToPrint
         * Navigating to the print based on condition
         * @return : NA
         */
    navigateToPrint: function(data) {
      var scope = this;
      try {
          let formNameForPrint = 'frmOutwardCollectionPrint';
          let dataObj = {
              navData: data,
              previousFormName: 'frmOutwardCollectionDashboard',
              pageTitle: 'i18n.TradeFinance.messageKey'
          };
          new kony.mvc.Navigation({
              "appName": "TradeFinanceMA",
              "friendlyName": `OutwardCollectionsUIModule/${formNameForPrint}`
          }).navigate(dataObj);
      } catch (err) {
          var errorObj = {
              "level": "frmInwardCollectionsDashboardNewController",
              "method": "navigateToPrint",
              "error": err
          };
          scope.onError(errorObj);
      }
    },

  /**
    * @api : getCollectionsByID
    * This function handles onclick of View Details in Recent Collections section
    * @return : NA
    */
        getCollectionsByID: function(CollectionsID, collectionStatus) {
      var scope = this;
      var serviceParamGetCollectionsByID = {};
      try {
          isViewDetailsBtnOnClick = true;
        if (collectionStatus === collectionStatusData.Draft) {
          let data = {
            collectionReference: CollectionsID,
            flowType: 'continueEditing'
          }
          scope.presenter.showOutwardCollectionScreen({
            context: 'createCollection',
            data
          });
        } else {
          scope.presenter.getOutwardCollectionsById({
              "collectionReference": CollectionsID
          }, "frmOutwardCollectionDashboard");
       }
      } catch (err) {
          var errorObj = {
              "level": "frmInwardCollectionsDashboardNewController",
              "method": "getGTCollectionsByID",
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
    downloadXLSXFile: function() {
      var scope = this;
      try {
        serviceParameters.pageOffset = "";
        serviceParameters.pageSize = "";
        if (downloadXLSXData.hasOwnProperty("sortByParam")) serviceParameters = downloadXLSXData;
        if (CURRENT_TAB === TAB_COLLECTIONS) {
          serviceParameters.sortByParam = "createdOn";
          scope.presenter.generateOutwardCollectionsList(serviceParameters, "frmOutwardCollectionDashboard");
        } else if (CURRENT_TAB === TAB_AMENDMENTS) {
          serviceParameters.sortByParam = "updatedOn";
          scope.presenter.generateOutwardAmendmentsList(serviceParameters, "frmOutwardCollectionDashboard");       
        }
        globalView.flxEllipsisDropDown.setVisibility(false);
      } catch (err) {
        var errorObj = {
          "method": "downloadXLSXFile",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    
    fetchDashBoardData: function (params) {
      var scope = this;
      try {
        var searchStringtext = globalView.tbxSearch.text;
        serviceParameters.searchString = searchStringtext;
        if (params !== 'pagination' && params !== "sort") {
          globalView.flxPagination.PaginationContainer.setLowerLimit(1);
          globalView.flxPagination.PaginationContainer.setPageSize(10);
          globalView.flxPagination.PaginationContainer.setIntervalHeader();
        }
        var pageOffsetValue = (params === "pagination" || params === "sort") ? globalView.flxPagination.PaginationContainer.getPageOffset() : 0;
        serviceParameters.pageOffset = JSON.stringify(pageOffsetValue);
        serviceParameters.pageSize = pageConfig.pageSize;
        if (CURRENT_TAB === TAB_COLLECTIONS) {
          scope.presenter.getOutwardCollections(serviceParameters, "frmOutwardCollectionDashboard");
        } else if (CURRENT_TAB === TAB_AMENDMENTS) {
          scope.presenter.showOutwardCollectionScreen({
              context: 'outwardAmendments',
              form: scope.view.id,
              data: serviceParameters
            });
      }
      } catch (err) {
        var errorObj = {
          "level": "",
          "method": "",
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
        if (globalView.flxEllipsisDropDown.isVisible) globalView.flxEllipsisDropDown.setVisibility(false);
        else globalView.flxEllipsisDropDown.setVisibility(true);
      } catch (err) {
        var errorObj = {
          "method": "moreActionOnClick",
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
    onActionClickFilterSegment: function(segmentName, imageName) {
      var scope = this;
      try {
        if (globalView[imageName].src === "arrowup_sm.png") {
          globalView[segmentName].setVisibility(false);
          if (segmentName === "segLCAccountType") {
            globalView.flxLCTypeHeadingSeparator.setVisibility(false);
          }
          if (segmentName === "segLCStatusType") {
            globalView.flxStatusTypeHeadingSeparator.setVisibility(false);
          }
          if (segmentName === "segTimePeriods") {
            globalView.flxLCTimePeriodHeadingSeparator.setVisibility(false);
            globalView.flxBottomSeparator.setVisibility(true);
          }
          globalView[imageName].src = "arrowdown_sm.png";
        } else {
          globalView[segmentName].setVisibility(true);
          if (segmentName === "segLCAccountType") {
            globalView.flxLCTypeHeadingSeparator.setVisibility(true);
          }
          if (segmentName === "segLCStatusType") {
            globalView.flxStatusTypeHeadingSeparator.setVisibility(true);
          }
          if (segmentName === "segTimePeriods") {
            globalView.flxLCTimePeriodHeadingSeparator.setVisibility(true);
            globalView.flxBottomSeparator.setVisibility(false);
          }
          globalView[imageName].src = "arrowup_sm.png";
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
      * @api : toggleFilterDropDownVisibility
      * Hides or shows the filter dropw down based on its current state
      * @return : NA
      */
    toggleFilterDropDownVisibility: function() {
      var scope = this;
      try {
        if (globalView.imgFilterDropdown.src === "arrowdown_sm.png") {
          if (scope.isFilterApplied) {
            globalView.segLCAccountType.setData(scope.segFilter1Data);
            globalView.segLCStatusType.setData(scope.segFilter2Data);
            globalView.segTimePeriods.setData(scope.segFilter3Data);
          } else {
            scope.setLCAccountTypeFilterData();
            scope.setStatusTypeFilterData();
            scope.setsegTimeFilterData();
          }
          globalView.btnApply.skin = "ICSknbtnEnabed003e7536px";
          globalView.btnApply.setEnabled(true);
          globalView.flxListDropdown.setVisibility(true);
          globalView.imgFilterDropdown.src = "arrowup_sm.png";
        } else {
          globalView.flxListDropdown.setVisibility(false);
          globalView.imgFilterDropdown.src = "arrowdown_sm.png";
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
         * @api : setFilterWidgetDataMap
         * Maps widgetdata to  filter segments
         * @return : NA
         */
    setImportFilterWidgetDataMap: function() {
      var scope = this;
      try {
        globalView.segLCAccountType.widgetDataMap = {
          "lblLCAccountType": "lblLCAccountType",
          "lblLCCheckbox": "lblLCCheckbox",
          "flxLCAccountType": "flxLCAccountType"
        };
        globalView.segLCStatusType.widgetDataMap = {
          "lblStatusType": "lblStatusType",
          "lblLCCheckbox": "lblLCCheckbox",
          "flxStatus": "flxStatus"
        };
        globalView.segTimePeriods.widgetDataMap = {
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
      * @api : setLCAccountTypeFilterData
      * Widget data mapping for LC type segment
      * @return : NA
      */
    setLCAccountTypeFilterData: function() {
      var scope = this;
      try {
        globalView.lblAccountLCType.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.tenorType", false) + " (" + scope.presenter.renderI18nKeys("i18n.TradeFinance.Required", false) + ")";
        scope.segFilter1Data = [];
        scope.segFilter1Data = [{
          lblLCAccountType: {
            text: scope.presenter.renderI18nKeys("i18n.TradeFinance.SelectAll", false),
            isVisible: true,
            key: 'Select All'
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
            text: scope.presenter.renderI18nKeys("i18n.ImportLC.Sight", false),
            isVisible: true,
            key: OLBConstants.INWARD_COLLECTIONS_TENORTYPE.SIGHT
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
            text: scope.presenter.renderI18nKeys("i18n.TradeFinance.Usance", false),
            isVisible: true,
            key: OLBConstants.INWARD_COLLECTIONS_TENORTYPE.USANCE
          },
          lblLCCheckbox: {
            text: "C",
            isVisible: true
          },
          flxLCAccountType: {
            onClick: this.filterRowOnClick.bind(this, "segLCAccountType", "widgetLabel")
          }
        }];
        globalView.segLCAccountType.setData(scope.segFilter1Data);
      } catch (err) {
        var errorObj = {
          "method": "setLCAccountTypeFilterData",
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
    setStatusTypeFilterData: function() {
      var scope = this;
      try {
       globalView.lblStatusLCType.text = scope.presenter.renderI18nKeys("i18n.ChequeManagement.Status", false) + " (" + scope.presenter.renderI18nKeys("i18n.TradeFinance.Required", false) + ")";
       scope.segFilter2Data = [];
       if (CURRENT_TAB === TAB_COLLECTIONS) {
         scope.segFilter2Data.push({
           lblStatusType: {
             text: scope.presenter.renderI18nKeys("i18n.TradeFinance.SelectAll", false),
             isVisible: true,
             key: 'Select All'
           },
           lblLCCheckbox: {
             text: "C",
             isVisible: true
           },
           flxStatus: {
             onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "selectAll")
           }
         });
         for (const [key, value] of Object.entries(collectionStatusData)) {
           scope.segFilter2Data.push({
             lblStatusType: {
               text: value,
               isVisible: true,
               key: key
             },
             lblLCCheckbox: {
               text: "C",
               isVisible: true
             },
             flxStatus: {
               onClick: this.filterRowOnClick.bind(this, "segLCStatusType", key)
             }
           });
         }
       } else if (CURRENT_TAB === TAB_AMENDMENTS) {
        scope.segFilter2Data.push({
          lblStatusType: {
            text: scope.presenter.renderI18nKeys("i18n.TradeFinance.SelectAll", false),
            isVisible: true,
            key: 'Select All'
          },
          lblLCCheckbox: {
            text: "C",
            isVisible: true
          },
          flxStatus: {
            onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "selectAll")
          }
        });
        for (const [key, value] of Object.entries(amendmentStatusData)) {
          scope.segFilter2Data.push({
            lblStatusType: {
              text: value,
              isVisible: true,
              key: key
            },
            lblLCCheckbox: {
              text: "C",
              isVisible: true
            },
            flxStatus: {
              onClick: this.filterRowOnClick.bind(this, "segLCStatusType", key)
            }
          });
        }
      }		
       globalView.segLCStatusType.setData(scope.segFilter2Data);
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
    setsegTimeFilterData: function() {
      var scope = this;
      try {
        let timePeriodTypes = [];
        timePeriodTypes = ['Today', 'Last One Month', 'Last Six Months', 'Last One Year', 'YTD'];
        globalView.lblTimePeriodType.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.TimePeriod", false),
          scope.segFilter3Data = [];
        timePeriodTypes.forEach((timePeriodType, idx) => {
          scope.segFilter3Data.push({
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
        globalView.segTimePeriods.setData(scope.segFilter3Data);
      } catch (err) {
        var errorObj = {
          "method": "setsegTimeFilterData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
      * @api : onFilterCancel
      * This metod will invoked on cancel of filters
      * @return : NA
      */
    onFilterCancel: function() {
      var scope = this;
      try {
        var accountTypeCount = 0;
        var statusTypeCount = 0;
        var timeParamValue = "";
        var selectedFilterString = "";
        var selectedTimePeriodFilter = "";
        var statusTypeFilterSegment = [];
        var timePeriodSegment = [];
        scope.resetFilters();
        selectedFilterString = serviceParameters.filterByValue;
        selectedTimePeriodFilter = serviceParameters.timeValue;
        var segemntListArray = ['segLCAccountType', 'segLCStatusType', 'segTimePeriods'];
        var selectedFilterArray = selectedFilterString.split(",");
        if (selectedFilterArray[0] !== null && selectedFilterArray[0] !== undefined && selectedFilterArray[0] !== "") {
          for (var i = 0; i < selectedFilterArray.length; i++) {
            for (var j = 0; j < globalView.segLCAccountType.data.length; j++) {
              var accountTypeFilterSegment = globalView.segLCAccountType.data;
              if (accountTypeFilterSegment[j].lblLCAccountType.text === selectedFilterArray[i]) {
                accountTypeCount++;
                accountTypeFilterSegment[j].lblLCCheckbox.text = "C";
                if (accountTypeCount === 2) {
                  accountTypeFilterSegment[0].lblLCCheckbox.text = "C";
                }
              }
            }
          }
          globalView.segLCAccountType.removeAll();
          globalView.segLCAccountType.setData(accountTypeFilterSegment);
          scope.view.forceLayout();
          for (var i = 0; i < selectedFilterArray.length; i++) {
            for (var j = 0; j < globalView.segLCStatusType.data.length; j++) {
              statusTypeFilterSegment = globalView.segLCStatusType.data;
              if (statusTypeFilterSegment[j].lblStatusType.text === selectedFilterArray[i]) {
                statusTypeCount++;
                statusTypeFilterSegment[j].lblLCCheckbox.text = "C";
                if (statusTypeCount === 3) {
                  statusTypeFilterSegment[0].lblLCCheckbox.text = "C";
                }
              }
            }
          }
          globalView.segLCStatusType.removeAll();
          globalView.segLCStatusType.setData(statusTypeFilterSegment);
          scope.view.forceLayout();
          for (var i = 0; i < globalView.segTimePeriods.data.length; i++) {
            timePeriodSegment = globalView.segTimePeriods.data;
            switch (timePeriodSegment[i].lblFeatureName.text) {
              case "Last Six Months":
                timeParamValue = "6,MONTH";
                break;
              case "Today":
                timeParamValue = "1,DAY";
                break;
              case "Last One Month":
                timeParamValue = "1,MONTH";
                break;
              case "Last One Year":
                timeParamValue = "1,YEAR";
                break;
              case "YTD":
                var dt = new Date();
                var current = new Date(dt.getTime());
                var previous = new Date(dt.getFullYear(), 0, 1);
                timeParamValue = (Math.ceil((current - previous + 1) / 86400000)) + ",DAYS";
                break;
              default:
                timeParamValue = "";
                break;
            }
            if (timeParamValue === selectedTimePeriodFilter) {
              timePeriodSegment[i].lblLCCheckbox.text = "M";
              timePeriodSegment[i].lblLCCheckbox.skin = "ICSknLblRadioBtnSelectedFontIcon003e7520px";
            }
          }
          globalView.segTimePeriods.removeAll();
          globalView.segTimePeriods.setData(timePeriodSegment);
          scope.view.forceLayout();
        } else {
          var accountTypeFilterSegment = globalView.segLCAccountType.data;
          for (var i = 0; i < accountTypeFilterSegment.length; i++) {
            accountTypeFilterSegment[i].lblLCCheckbox.text = "C";
          }
          globalView.segLCAccountType.removeAll();
          globalView.segLCAccountType.setData(accountTypeFilterSegment);
          var statusTypeFilterSegment = globalView.segLCStatusType.data;
          for (var i = 0; i < statusTypeFilterSegment.length; i++) {
            statusTypeFilterSegment[i].lblLCCheckbox.text = "C";
          }
          globalView.segLCStatusType.removeAll();
          globalView.segLCStatusType.setData(statusTypeFilterSegment);
          var timePeriodSegment = globalView.segTimePeriods.data;
          timePeriodSegment[0].lblLCCheckbox.text = "M";
          timePeriodSegment[0].lblLCCheckbox.skin = "ICSknLblRadioBtnSelectedFontIcon003e7520px";
          globalView.segTimePeriods.removeAll();
          globalView.segTimePeriods.setData(timePeriodSegment);
          scope.view.forceLayout();
        }
        globalView.flxListDropdown.setVisibility(false);
        globalView.imgFilterDropdown.src = "arrowdown_sm.png";
        this.setDefaultValueForDownloadCriteria();
      } catch (err) {
        var errorObj = {
          "method": "onFilterCancel",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    
     /**
       * @api : resetFilter
       * This metod will invoked on cancel of filters
       * @return : NA
       */
    resetFilters: function() {
      var scope = this;
      var lcTypeSegment = globalView.segLCAccountType.data;
      var statusTypeSegment = globalView.segLCStatusType.data;
      var timePeriodSegment = globalView.segTimePeriods.data;
      for (var i = 0; i < lcTypeSegment.length; i++) {
        lcTypeSegment[i].lblLCCheckbox.text = "D";
      }
      for (var j = 0; j < statusTypeSegment.length; j++) {
        statusTypeSegment[j].lblLCCheckbox.text = "D";
      }
      for (var z = 0; z < timePeriodSegment.length; z++) {
        timePeriodSegment[z].lblLCCheckbox.text = "L";
        timePeriodSegment[z].lblLCCheckbox.skin = "sknLblOlbFontIconsA0A0A020Px";
      }
      globalView.segLCAccountType.setData(lcTypeSegment);
      globalView.segLCStatusType.setData(statusTypeSegment);
      globalView.segTimePeriods.setData(timePeriodSegment);
    },
    
    /**
         * @api : filterRowOnClick
         * This method handles row onClick of fiter dropdown
         * @return : NA
         */
    filterRowOnClick: function(segName, widgetName) {
      var scope = this;
      try {
        var statusTypeCount = 0;
        var lcTypeCount = 0;
        var segmentdata = globalView[segName].data;
        var rowData = globalView[segName].selectedRowItems;
        var index = globalView[segName].selectedRowIndex;
        var sectionIndex = index[0];
        var rowIndex = index[1];
        var timePeriodCurrentImage = "";
        if (segName === "segLCAccountType" || segName === "segLCStatusType") {
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
            globalView.flxCustomDateRange.setVisibility(false);
          } else {
            globalView.flxCustomDateRange.setVisibility(true);
          }
        }
        if (widgetName === "selectAll") {
          for (var i = 0; i < segmentdata.length; i++) {
            segmentdata[i].lblLCCheckbox.text = segmentdata[rowIndex].lblLCCheckbox.text;
          }
        }
        globalView[segName].setData(segmentdata);
        globalView.forceLayout();
        if (widgetName !== "TimePeriod") {
          var lcTypeData = globalView.segLCAccountType.data;
          for (var i = 0; i < lcTypeData.length; i++) {
            if (lcTypeData[i].lblLCCheckbox.text === "C") {
              lcTypeCount++;
              if (lcTypeCount === 2) {
                lcTypeData[0].lblLCCheckbox.text = "C";
                globalView.segLCAccountType.removeAll();
                globalView.segLCAccountType.setData(lcTypeData);
              }
            }
          }
          var statusTypeData = globalView.segLCStatusType.data;
          for (var i = 0; i < statusTypeData.length; i++) {
            if (statusTypeData[i].lblLCCheckbox.text === "C") {
              statusTypeCount++;
              if ((statusTypeCount === 10 && CURRENT_TAB === TAB_COLLECTIONS) || (statusTypeCount === 4 && CURRENT_TAB === TAB_AMENDMENTS)) {
                statusTypeData[0].lblLCCheckbox.text = "C";
                globalView.segLCStatusType.removeAll();
                globalView.segLCStatusType.setData(statusTypeData);
              }
            }
          }
          if (lcTypeCount >= 1 && statusTypeCount >= 1) {
            globalView.btnApply.onClick = scope.applyFilters;
            globalView.btnApply.skin = "ICSknbtnEnabed003e7536px";
            globalView.btnApply.setEnabled(true);
          } else {
            globalView.btnApply.skin = "ICSknbtnDisablede2e9f036px";
            globalView.btnApply.setEnabled(false);
          }
        }
        globalView[segName].setData(segmentdata);
        globalView.forceLayout();
      } catch (err) {
        var errorObj = {
          "method": "filterRowOnClick",
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
    hideFilterDropDown: function() {
      var scope = this;
      try {
        if (globalView.flxListDropdown.isVisible === true) {
          globalView.flxListDropdown.setVisibility(false);
          globalView.imgFilterDropdown.src = "arrowdown_sm.png";
        }
        if (globalView.flxEllipsisDropDown.isVisible === true) {
          globalView.flxEllipsisDropDown.setVisibility(false);
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
      * @api : setFilterData
      * To set filter segment data
      * @return : NA
      */
    setFilterData: function() {
      var scope = this;
      try {
        globalView.imgAccountLCDropdown.src = "arrowup_sm.png";
        globalView.flxAccountLCDropdownImage.onClick = scope.onActionClickFilterSegment.bind(this, "segLCAccountType", "imgAccountLCDropdown");
        globalView.imgStatusLCDropdown.src = "arrowup_sm.png";
        globalView.flxStatusLCDropdownImage.onClick = scope.onActionClickFilterSegment.bind(this, "segLCStatusType", "imgStatusLCDropdown");
        globalView.imgTimePeriodDropdown.src = "arrowup_sm.png";
        globalView.flxTimePeriodDropdownImage.onClick = scope.onActionClickFilterSegment.bind(this, "segTimePeriods", "imgTimePeriodDropdown");
      } catch (err) {
        var errorObj = {
          "method": "setFilterData",
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
    applyFilters: function() {
      var scope = this;
      try {
        let filterByValue = [];
        let filterByParam = [];
        let timeValue = "";
        let pageOffset = globalView.flxPagination.PaginationContainer.getPageOffset();
        let selectedFilterCount = 0;
        for (var i = 1; i < globalView.segLCAccountType.data.length; i++) {
          if (globalView.segLCAccountType.data[i].lblLCCheckbox.text === "C") {
            filterByValue.push(globalView.segLCAccountType.data[i].lblLCAccountType.key);
            if(CURRENT_TAB === TAB_COLLECTIONS)
              filterByParam.push("tenorType");
            if(CURRENT_TAB === TAB_AMENDMENTS)
              filterByParam.push("tenorType");
            selectedFilterCount++;
          }
        }
        for (var i = 1; i < globalView.segLCStatusType.data.length; i++) {
          if (globalView.segLCStatusType.data[i].lblLCCheckbox.text === "C") {
            filterByValue.push(globalView.segLCStatusType.data[i].lblStatusType.key);
            if (CURRENT_TAB === TAB_COLLECTIONS) {
              filterByParam.push("status");
            }
            if (CURRENT_TAB === TAB_AMENDMENTS) {
              filterByParam.push("status");
            }
            selectedFilterCount++;
          }
        }
        for (var i = 0; i < globalView.segTimePeriods.data.length; i++) {
          if (globalView.segTimePeriods.data[i].lblLCCheckbox.text === "M") {
            switch (globalView.segTimePeriods.data[i].lblFeatureName.text) {
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
        globalView.flxListDropdown.setVisibility(false);
        globalView.imgFilterDropdown.src = "arrowdown_sm.png";
        segFilter1Data = globalView.segLCAccountType.data;
        segFilter2Data = globalView.segLCStatusType.data;
        segFilter3Data = globalView.segTimePeriods.data;
        if (segFilter1Data[0].lblLCCheckbox.text === "C" && segFilter2Data[0].lblLCCheckbox.text === "C") {
          globalView.lblFilterText.text = scope.presenter.renderI18nKeys("i18n.konybb.Common.All", false);
        } else {
          globalView.lblFilterText.text = scope.presenter.renderI18nKeys("i18n.ProfileManagement.Selected", false) + "(" + selectedFilterCount + ")";
        }
        scope.view.forceLayout();
        filterByValue = filterByValue.join(',');
        filterByParam = filterByParam.join(',');
        filterByValue.substring(1, filterByValue.length);
        let timeParam = "";
        if (CURRENT_TAB === TAB_COLLECTIONS) {
          timeParam = "createdOn";
        }
        if (CURRENT_TAB === TAB_AMENDMENTS) {
          timeParam = "requestedOn";
        }
        serviceParameters.filterByValue = filterByValue;
        serviceParameters.filterByParam = filterByParam;
        serviceParameters.timeParam = timeParam;
        serviceParameters.timeValue = timeValue;
        if (CURRENT_TAB === TAB_COLLECTIONS) {
          serviceParameters.sortByParam = "createdOn";
        }
        if (CURRENT_TAB === TAB_AMENDMENTS) {
          serviceParameters.sortByParam = "updatedOn";
        }
        downloadXLSXData = serviceParameters;
        scope.fetchDashBoardData();
      } catch (err) {
        var errorObj = {
          "method": "applyFilters",
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
    setFilterUIView: function() {
      var scope = this;
      try {
        scope.setImportFilterWidgetDataMap();
        globalView.segLCAccountType.setVisibility(true);
        globalView.segLCStatusType.setVisibility(true);
        globalView.segTimePeriods.setVisibility(true);
        globalView.flxLCTypeHeadingSeparator.setVisibility(true);
        globalView.flxStatusTypeHeadingSeparator.setVisibility(true);
        globalView.flxLCTimePeriodHeadingSeparator.setVisibility(true);
        globalView.imgAccountLCDropdown.src = "arrowup_sm.png";
        globalView.imgStatusLCDropdown.src = "arrowup_sm.png";
        globalView.imgTimePeriodDropdown.src = "arrowup_sm.png";
        scope.setLCAccountTypeFilterData();
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
      * @api : setDefaultValueForDownloadCriteria
      * To remove all the filter Critera and set the downloadXLSXData to default values
      * @return : NA
      */
    setDefaultValueForDownloadCriteria: function() {
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

    renderBannerMessages: function () {
      var scope = this;
      try {
        globalView.flxErrorMessage.setVisibility(false);
        if (navigationFrom == scope.presenter.outwardConstants.saveCollectionAsDraft) {
          globalView.imgErrorMessageIcon.src = scope.presenter.resourcesConstants.images.successBannerImage;
          globalView.lblErrorMessage.text = scope.presenter.renderI18nKeys('i18n.TradeFinance.outwardCollectionSavedDraft', false);
          globalView.flxErrorMessage.setVisibility(true);
        } else if (navigationFrom == scope.presenter.outwardConstants.deletedCollection) {
          globalView.imgErrorMessageIcon.src = scope.presenter.resourcesConstants.images.successBannerImage;
          globalView.lblErrorMessage.text = scope.presenter.renderI18nKeys('i18n.TradeFinance.outwardCollectionDeleted', false);
          globalView.flxErrorMessage.setVisibility(true);
        }
      } catch (err) {
        var errorObj = {
          "method": "renderBannerMessages",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    setDefaultSort: function (widget) {
      var scope = this;
      try {
        for (const key in sortFields) {
          globalView[key].src = "sortingfinal_1.png";
        }
          globalView[widget].src = "sorting_next.png";
      } catch (err) {
        var errorObj = {
          "method": "setDefaultSort",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    onError: function (err) {
      let errMsg = JSON.stringify(err);
      errMsg.level = " frmOutwardCollectionDashboard";
      // kony.ui.Alert(errMsg);
    },
    
    /**
      * @api : setPaginationComponent
      * This method will invoked to set pagination variables
      * @return : NA
      */
    setPaginationComponent: function(pageHeader) {
      var scope = this;
      try {
        globalView.flxPagination.PaginationContainer.setPageSize(10);
        globalView.flxPagination.PaginationContainer.setLowerLimit(1);
        globalView.flxPagination.PaginationContainer.setPageHeader(pageHeader);
        globalView.flxPagination.PaginationContainer.setServiceDelegate(scope.fetchDashBoardData.bind(scope, 'pagination'));
        globalView.flxPagination.PaginationContainer.setIntervalHeader();
      } catch (err) {
        var errorObj = {
          "method": "setPaginationComponent",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
  };
});