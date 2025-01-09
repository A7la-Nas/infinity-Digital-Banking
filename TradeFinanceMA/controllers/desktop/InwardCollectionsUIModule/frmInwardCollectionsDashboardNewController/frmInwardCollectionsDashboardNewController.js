define(['CommonUtilities', 'OLBConstants', 'ViewConstants', 'FormControllerUtility', 'FormatUtil'], function (CommonUtilities, OLBConstants, ViewConstants, FormControllerUtility, FormatUtil) {
    let globalView;
    let isTablet = false;
    let NA = kony.i18n.getLocalizedString("i18n.common.NA");
    let viewAllCollections = kony.i18n.getLocalizedString("i18n.TradeFinance.viewAllCollections");
    let serviceResponse = {};
    let serviceResponseTemp;
    let presenter;
	let dataObj={};
	let isAmendView = false;
    let prevSelectedIndex;
    let TAB_COLLECTIONS = kony.i18n.getLocalizedString("i18n.TradeFinance.collections"), 
        TAB_AMENDMENTS = kony.i18n.getLocalizedString("i18n.ImportLC.Amendments"), 
        CURRENT_TAB = TAB_COLLECTIONS, 
        CURRENT_ROW_TEMPLATE = 'flxTempInwardAmendmentList',
        CURRENT_EXPAND_ROW_TEMPLATE = 'flxTempInwardAmendmentListExpand',
        NEW_COLLECTIONS = kony.i18n.getLocalizedString("i18n.TradeFinance.newCollections"),
        PAY_DUE_COLLECTIONS = kony.i18n.getLocalizedString("i18n.TradeFinance.payDueCollections");
    let segLCAccountType = '';
    let segLCStatusType = '';
    let segTimePeriods = '';
    let filterByValue = "";
    let filterByParam = "";
    let isSearchEnabled = false;
    let isFilterApplied = false;
    let segFilter1Data = [];
    let segFilter2Data = [];
    let segFilter3Data = [];
    let SEG_REF;
    let isCollectionSrmsIdServiceTriggered = false;
    this.isViewDetailsBtnOnClick = false;
	this.isAmendViewDetailsonClick = false;
	this.selectedRecord = {};
	this.isPrintNavigation = false;
    this.downloadXLSXData = "";
    this.serviceParameters = {
        "searchString": "",
        "pageSize": "",
        "pageOffset": "",
        "sortByParam": "createdDate",
        "sortOrder": "DESC",
        "timeParam": "",
        "timeValue": "6,MONTH",
        "filterByValue": "",
        "filterByParam": ""
    };
    this.pageConfig = {
        "pageOffset": "0",
        "pageSize": "11"
    };
    this.sortFields = {
    "imgTabTwoListHeader1": "drawer",
    "imgTabTwoListHeader2": "amendmentNo",
    "imgTabTwoListHeader3": "tenorType",
    "imgTabTwoListHeader4": "receivedOn",
    "imgTabTwoListHeader5": "amount",
    "imgTabTwoListHeader6": "status",
    "imgTabOneListHeader1": "drawerName",
    "imgTabOneListHeader2": "tenorType",
    "imgTabOneListHeader3": "documentNo",
    "imgTabOneListHeader4": "receivedOn",
    "imgTabOneListHeader5": "amount",
    "imgTabOneListHeader6": "status",
    };
	this.chartServiceParameters = {
    searchString: "",
    pageSize: "",
    pageOffset: "",
    sortByParam: "createdDate",
    sortOrder: "DESC",
    timeParam: "",
    timeValue: "",
    filterByValue: "",
    filterByParam: "",
  };
  let isChartRendered = false;
  let orientationHandler = new OrientationHandler();
  let chartAndStatusData = {};
  let lcCurrency = {};
  let selectedCurrency = "USD";
  let tenorType;
  let tenorTypeLength = 0;
  let guaranteesLCDetails;
  let collectionsChart;
  let collectionsStatus;
  let flowType = "";
  let recordsData = {};
  let statusData = {};
  let productType;
  let formatUtil;
  let recentCollectionsData;
  let collectionType = {New : false, PayDue : false};
    return {

        /**
         * @api : onNavigate
         * * Triggers when navigation come to this form
         * @return : NA
        */
        onNavigate: function (data = {}) {
            var scope = this;
            try {
                if (data.flowType) {
                    flowType = (data.flowType === viewAllCollections) ? TAB_COLLECTIONS :TAB_AMENDMENTS;
                } else if (kony.sdk.isNullOrUndefined(data.flowType)) {
                    flowType = TAB_COLLECTIONS;
                }
                scope.view.preShow = this.preShow;
                scope.view.postShow = this.postShow;
                scope.view.onDeviceBack = function () { };
                globalView = this.view.formTemplate12.flxContentTCCenter;
                SEG_REF = globalView.segResponseListing;
                scope.initFormActions();
                scope.view.onBreakpointChange = this.onBreakPointChange;
            } catch (err) {
                var errorObj = {
                    "method": "onNavigate",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : preShow
         * Performs the actions required before rendering form
         * @return : NA
        */
        preShow: function () {
            var scope = this;
            try {
                var orientationHandler = new OrientationHandler();
				formatUtil = applicationManager.getFormatUtilManager();
				lcCurrency = Object.values(scope.presenter.collectionsConfig.currencies);
				this.view.formTemplate12.flxContentTCCenter.btnChartCurrency.text = lcCurrency[0] + "-" + applicationManager.getConfigurationManager().getCurrency(lcCurrency[0]);
                if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                    globalView.flxNewAndRecentTab.height = '50dp';
                }
            } catch (err) {
                var errorObj = {
                    "method": "preShow",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },

        /**
         * @api : postShow
         * Performs the actions required after rendering form
         * @return : NA
        */
        postShow: function () {
            var scope = this;
            try {
				scope.view.formTemplate12.flxContentTCCenter.flxCurrencyDropdown.setVisibility(false);
				scope.setSegCurrencyDropdownData();
				tenorType = scope_configManager.collectionsTenorType;
				collectionsStatus = scope_configManager.inwardCollectionsStatus;
				collectionsChart = scope_configManager.collectionsChartData;
                scope.inwardAmendmentsPermission = applicationManager.getConfigurationManager().checkUserPermission('INWARD_COLLECTIONS_AMENDMENTS_VIEW');
				if(scope.inwardAmendmentsPermission === true){
					globalView.btnTab2.setVisibility(true);
				}
				else{
					globalView.btnTab2.setVisibility(false);
				}
                isAmendViewDetailsonClick = false;
                scope.onTabClick(flowType);
            } catch (err) {
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
                    moduleName: 'InwardCollectionsUIModule'
                });
                globalView.flxPagination.PaginationContainer.setPageSize(10);
                globalView.flxPagination.PaginationContainer.flxPagination.width = "235dp";
				scope.setPaginationComponent(kony.i18n.getLocalizedString("i18n.TradeFinance.collections"));               
                scope.presenter.getInwardCollections(chartServiceParameters, "frmInwardCollectionsDashboardNew");
                isChartRendered = false;
                globalView.btnTab1.onClick = scope.onTabClick.bind(this, TAB_COLLECTIONS);
                globalView.btnTab2.onClick = scope.onTabClick.bind(this, TAB_AMENDMENTS);
                globalView.flxExportList.onClick = scope.moreActionOnClick.bind(this);
                globalView.tbxSearch.text = "";
                globalView.btnNewOne.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.newCollections",false);
                globalView.btnNewTwo.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.payDueCollections",false);              
                globalView.btnNewOneTab.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.newCollections",false);
                globalView.btnNewTwoTab.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.payDueCollections",false);
                globalView.lblClear.setVisibility(false);
                globalView.flxErrorMessage.setVisibility(false);
                globalView.flxErrorClose.onClick = function () {
                    globalView.flxErrorMessage.setVisibility(false);
                };
                scope.viewOrHideDashboardView(true,true);
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
                globalView.flxCurrencyDropdown.left = "88%";
                globalView.flxListDropdown.setVisibility(false);
                globalView.imgFilterDropdown.src = "arrowdown_sm.png";
                globalView.flxEllipsisDropDown.setVisibility(false);
                scope.view.formTemplate12.flxContentTCCenter.flxChartTitleCurrency.onClick = scope.segDropdownExpandCollapse.bind(this, "lblDropdown", "flxCurrencyDropdown");
                globalView.btnCancel.onClick = scope.onFilterCancel;
                globalView.flxEllipsisDropDown.onClick = scope.downloadXLSXFile.bind(this);
                globalView.flxPagination.zIndex = 0;
                globalView.btnNewOne.onClick = scope.setQuickLinksUI.bind(this, scope.presenter.renderI18nKeys("i18n.TradeFinance.newCollections"));
                globalView.btnNewTwo.onClick = scope.setQuickLinksUI.bind(this, scope.presenter.renderI18nKeys("i18n.TradeFinance.payDueCollections"));
                globalView.btnNewOneTab.onClick = scope.setQuickLinksUI.bind(this, scope.presenter.renderI18nKeys("i18n.TradeFinance.newCollections"));
                globalView.btnNewTwoTab.onClick = scope.setQuickLinksUI.bind(this, scope.presenter.renderI18nKeys("i18n.TradeFinance.payDueCollections"));
                globalView.btnBackToCollectionsDashboard.onClick = scope.viewOrHideDashboardView.bind(this, true,true);
            } catch (err) {
                var errorObj = {
                    "method": "initFormActions",
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
                        scope.presenter.getInwardCollections(serviceParameters,  "frmInwardCollectionsDashboardNew");
                    } else if (CURRENT_TAB === TAB_AMENDMENTS) {
                        serviceParameters.pageSize = pageConfig.pageSize;
                        serviceParameters.pageOffset = pageConfig.pageOffset;
                        serviceParameters.searchString = searchString;
						scope.presenter.getInwardAmendments(serviceParameters, "frmInwardCollectionsDashboardNew");						
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
         * @api : resetFilter
         * This metod will invoked on cancel of filters
         * @return : NA
        */
        resetFilters: function(){
            var scope = this;
            var lcTypeSegment = globalView.segLCAccountType.data;	
            var statusTypeSegment = globalView.segLCStatusType.data;
            var timePeriodSegment = globalView.segTimePeriods.data;	
            for(var i=0; i<lcTypeSegment.length; i++){
            lcTypeSegment[i].lblLCCheckbox.text = "D"
            }	
            for(var i=0; i<statusTypeSegment.length; i++){
            statusTypeSegment[i].lblLCCheckbox.text = "D"
            }	
            for(var i=0; i<timePeriodSegment.length; i++){
            timePeriodSegment[i].lblLCCheckbox.text = "L"
            timePeriodSegment[i].lblLCCheckbox.skin = "sknLblOlbFontIconsA0A0A020Px"		
            }
            globalView.segLCAccountType.setData(lcTypeSegment);
            globalView.segLCStatusType.setData(statusTypeSegment);
            globalView.segTimePeriods.setData(timePeriodSegment);
        },

        /**
            * @api : onFilterCancel
            * This metod will invoked on cancel of filters
            * @return : NA
        */
        onFilterCancel: function() {
            var scope = this;
            try{
            var accountTypeCount = 0;
            var statusTypeCount = 0;
            var timeParamValue = "";
            var selectedFilterString = "";
            var selectedTimePeriodFilter = "";
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
                    var statusTypeFilterSegment = globalView.segLCStatusType.data;
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
                var timePeriodSegment = globalView.segTimePeriods.data;
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
            var errorObj =
                {
                    "method": "onFilterCancel",
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
         * @api : sortRecords
         * Update sort icons and trigger a action to business controller to sort
         * @return : NA
         */
         sortRecords: function(columnNo) {
            var scope = this;
            try {
                var sortType = "";
                serviceParameters.filterByParam = "";
                serviceParameters.filterByValue = "";
                scope.sortApplied = true;
                var imageName = "";
                if (CURRENT_TAB === TAB_AMENDMENTS) {
                    imageName = "imgTabTwoListHeader";
                } else if (CURRENT_TAB === TAB_COLLECTIONS) {
                    imageName = "imgTabOneListHeader";
                } 
                var field = sortFields[imageName + columnNo];
                if (globalView[imageName + columnNo].src === "sortingfinal.png") {
                    globalView[imageName + columnNo].src = "sorting_previous.png";
                    sortType = "DESC";
                } else if (globalView[imageName + columnNo].src === "sorting_previous.png") {
                    globalView[imageName + columnNo].src = "sorting_next.png";
                    sortType = "ASC";
                } else {
                    globalView[imageName + columnNo].src = "sorting_previous.png";
                    sortType = "DESC";
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
         * @api : cancelFilters
         * This metod will invoked on cancel of filters
         * @return : NA
         */
          cancelFilters: function() {
            var scope = this;
            try {
            globalView.flxListDropdown.setVisibility(false);
            globalView.imgFilterDropdown.src = "arrowdown_sm.png";
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
                    timeParam = "createdDate";
                }
				if (CURRENT_TAB === TAB_AMENDMENTS) {
                    timeParam = "createdDate";
                }
                serviceParameters.filterByValue = filterByValue;
                serviceParameters.filterByParam = filterByParam;
                serviceParameters.timeParam = timeParam;
                serviceParameters.timeValue = timeValue;
                if (CURRENT_TAB === TAB_COLLECTIONS) {
                  serviceParameters.sortByParam = "createdDate";
                }
				if (CURRENT_TAB === TAB_AMENDMENTS) {
                   serviceParameters.sortByParam = "createdDate";
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
                    scope.segFilter2Data = [{
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
                    }, {
                        lblStatusType: {
                        text: scope.presenter.renderI18nKeys("i18n.userManagement.new", false),
                            isVisible: true,
                            key: OLBConstants.INWARD_COLLECTIONS_STATUS.NEW
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
                            key: OLBConstants.INWARD_COLLECTIONS_STATUS.SUBMITTED_TO_BANK
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
                        text: scope.presenter.renderI18nKeys("i18n.TradeFinance.ProcessingByBank", false),
                        isVisible: true,
                        key: OLBConstants.INWARD_COLLECTIONS_STATUS.PROCESSING_BY_BANK
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
                        key: OLBConstants.INWARD_COLLECTIONS_STATUS.RETURNED_BY_BANK
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
                        key: OLBConstants.INWARD_COLLECTIONS_STATUS.REJECTED
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
                            key: OLBConstants.INWARD_COLLECTIONS_STATUS.APPROVED
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
                            text: scope.presenter.renderI18nKeys("i18n.payments.payDue", false),
                            isVisible: true,
                            key: OLBConstants.INWARD_COLLECTIONS_STATUS.PAY_DUE
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
                            text: scope.presenter.renderI18nKeys("i18n.AccountSummary.overdue", false),
                            isVisible: true,
                            key: OLBConstants.INWARD_COLLECTIONS_STATUS.OVERDUE
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
                            text: scope.presenter.renderI18nKeys("i18n.TradeFinance.settled", false),
                            isVisible: true,
                            key: OLBConstants.INWARD_COLLECTIONS_STATUS.SETTLED
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
                            text: scope.presenter.renderI18nKeys("i18n.Transfers.Cancelled", false),
                            isVisible: true,
                            key: OLBConstants.INWARD_COLLECTIONS_STATUS.CANCELLED
                        },
                        lblLCCheckbox: {
                            text: "C",
                            isVisible: true
                        },
                        flxStatus: {
                            onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")
                        }
                    }];
                }
				if (CURRENT_TAB === TAB_AMENDMENTS){
					scope.segFilter2Data = [{
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
                    }, {
                        lblStatusType: {
                            text: scope.presenter.renderI18nKeys("i18n.userManagement.new", false),
                            isVisible: true,
                            key: OLBConstants.INWARD_COLLECTION_AMENDMENTS_STATUS.NEW
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
                            key: OLBConstants.INWARD_COLLECTION_AMENDMENTS_STATUS.SUBMITTED_TO_BANK
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
                            text: scope.presenter.renderI18nKeys("i18n.TradeFinance.ProcessingByBank", false),
                            isVisible: true,
                            key: OLBConstants.INWARD_COLLECTION_AMENDMENTS_STATUS.PROCESSING_BY_BANK
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
                            key: OLBConstants.INWARD_COLLECTION_AMENDMENTS_STATUS.RETURNED_BY_BANK
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
                            key: OLBConstants.INWARD_COLLECTION_AMENDMENTS_STATUS.REJECTED
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
                            key: OLBConstants.INWARD_COLLECTION_AMENDMENTS_STATUS.APPROVED
                        },
                        lblLCCheckbox: {
                            text: "C",
                            isVisible: true
                        },
                        flxStatus: {
                            onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")
                        }
                    }];
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
                if (viewModel.amendmentsListServerError) {
                    globalView.flxErrorMessage.setVisibility(true);
                    this.showServerError(viewModel.amendmentsListServerError);
                }
                if (viewModel.InwardCollections && CURRENT_TAB === TAB_COLLECTIONS) {
                    serviceResponse = viewModel.InwardCollections;
					recordsData = serviceResponse.slice(0, 10);
					scope.guaranteesLCDetails = viewModel.InwardCollections;
                    if (Object.keys(serviceResponse).length > 0) {
                        globalView.flxListingSegment.setVisibility(true);
                        globalView.flxNoTransactions.setVisibility(false);
                        globalView.flxPagination.setVisibility(true);
                        if (!isChartRendered) {
                            isChartRendered = true;
                            scope.customWidgets();
                            scope.getStatusAndChartData();
                        }
                            scope.renderDataInDashboardList();
                            if (scope.presenter.isEmptyNullOrUndefined(globalView.lblRecentOneTypeRefValue.text) && scope.presenter.isEmptyNullOrUndefined(globalView.lblRecentTwoTypeRefValue.text)) {
                                recentCollectionsData = serviceResponse.slice(0, 2);
                                scope.setRecentCollectionsData();
                        }
                    } else {
                        globalView.flxListingSegment.setVisibility(false);
                        globalView.flxNoTransactions.setVisibility(true);
                        globalView.flxPagination.setVisibility(false);
                        globalView.flxExportList.setVisibility(false);
                    }
                }
                
                if (viewModel.InwardCollectionAmendments && !isAmendViewDetailsonClick) {
                    serviceResponse = viewModel.InwardCollectionAmendments;
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
                if (CURRENT_TAB === TAB_AMENDMENTS && !(viewModel.InwardCollectionAmendments) && !(viewModel.serverError)) {                  
                    if (((isPrintNavigation && isCollectionSrmsIdServiceTriggered) || (isAmendViewDetailsonClick && isCollectionSrmsIdServiceTriggered)) && viewModel.amendmentSrmsId) {
						selectedRecord["amendmentResponse"] = viewModel;
                        isCollectionSrmsIdServiceTriggered = false;
                        scope.presenter.getInwardCollectionsById({
                            "collectionSrmsId": selectedRecord.collectionSrmsId
                        }, "frmInwardCollectionsDashboardNew");
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
				
				if (viewModel.SwiftMessages) {
                    if (CURRENT_TAB === TAB_COLLECTIONS || isViewDetailsBtnOnClick) {
                        isViewDetailsBtnOnClick = false;
                        new kony.mvc.Navigation({
                            "appName": "TradeFinanceMA",
                            "friendlyName": "InwardCollectionsUIModule/frmInwardCollectionsViewDetails"
                        }).navigate(viewModel);
                    } else if (CURRENT_TAB === TAB_AMENDMENTS && !viewModel.amendmentSrmsId) {
                        let serviceResponse = {
                            collectionResponse: viewModel,
                            amendmentResponse: selectedRecord
                        };
                         dataObj = {
                            serviceResponse,
                            previousFormName: 'frmInwardCollectionsDashboardNew'
                        };
                        if (isPrintNavigation) {
                            // Navigate to Amendments Print
                            isPrintNavigation = false;
                            let formName = 'frmInwardCollectionAmendmentPrint';
                            new kony.mvc.Navigation({
                                "appName": "TradeFinanceMA",
                                "friendlyName": `InwardCollectionsUIModule/${formName}`
                            }).navigate(dataObj);
                        }
						else {
							isAmendView = true;
						}						
                    }
                }
				if (isAmendViewDetailsonClick && CURRENT_TAB === TAB_AMENDMENTS && !(isPrintNavigation) && isAmendView) {
                    // Navigate to Amendments ViewDetails
                    isAmendViewDetailsonClick = false;
                    isAmendView = false;
                    new kony.mvc.Navigation({
                        "appName": "TradeFinanceMA",
                        "friendlyName": "InwardCollectionsUIModule/frmInwardCollectionAmendmentViewDetails"
                    }).navigate(dataObj);
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
         * @api : showServerError
         * This method is responsible for setting error message  
         * @return : NA
        */
        showServerError: function (errorMsg) {
            try {
                globalView.lblErrorMessage.text = errorMsg;
            } catch (err) {
                var errorObj = {
                    "method": "showServerError",
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
        onBreakPointChange: function () {
            var scope = this;
            try {
                if (kony.application.getCurrentBreakpoint() === 640 || kony.application.getCurrentBreakpoint() === 1024) {
                    // Mobile and Tablet screen
                    isTablet = true;
                    if (kony.application.getCurrentBreakpoint() === 640) {
                        // Mobile screen
                        globalView.tbxSearch.width = '80%';
                        globalView.flxFilerDropdown.width = '45%';
                    } else {
                        // Tablet Screen
                        globalView.tbxSearch.width = '84%';
                        globalView.flxFilerDropdown.width = '65%';
                        globalView.flxFilerDropdown.left = '0dp';
                        globalView.flxListDropdown.left = '66.2%';
                    }
                } else if (kony.application.getCurrentBreakpoint() === 1366 || kony.application.getCurrentBreakpoint() === 1380) {
                    // Browser screen
                    isTablet = false;
                    globalView.tbxSearch.width = '86%';
                    globalView.flxFilerDropdown.width = '80%';
                    globalView.flxFilerDropdown.left = '0dp';
                }
                for (let i = 2; i <= 6; i++) {
                    globalView[`flxTabTwoListHeader${i}`].width = isTablet ? '18%' : '10%';
                }
                globalView.flxChart.width = isTablet ? '100%' : '60%';
                globalView.flxNewAndRecent.isVisible = isTablet ? false : true;
                globalView.flxNewAndRecentTab.isVisible = isTablet ? true : false;
				globalView.flxTabOneListHeader2.isVisible = isTablet ? false : true;
				globalView.flxTabOneListHeader5.isVisible = isTablet ? false : true;
				globalView.flxTabOneListHeader5.width = '10%';
				globalView.flxTabOneListHeader5.left = '7%';
				globalView.flxTabOneListHeader1.right = isTablet ? '2%' : '6%';
				globalView.flxTabOneListHeader4.left = isTablet ? '11%' : '2%';
				globalView.flxTabOneListHeader6.left = isTablet ? '10%' :'2%';
				globalView.flxTabOneListHeader7.left = isTablet ? '13%' : '1%';
                // Amendment tab values
                globalView.flxTabTwoListHeader2.isVisible = isTablet ? false : true;
                globalView.flxTabTwoListHeader3.isVisible = isTablet ? false : true;
                globalView.flxTabTwoListHeader1.width = isTablet ? '5%' : '13%';
                globalView.flxTabTwoListHeader4.width = isTablet ? '13%' : '10%';
                globalView.flxTabTwoListHeader4.left = isTablet ? '7%': '2%';
                globalView.flxTabTwoListHeader5.left = '9%';
                globalView.flxTabTwoListHeader6.left = isTablet ? '2%' : '1%';
                globalView.flxTabTwoListHeader7.width = isTablet ? '17%' : '10%';
                globalView.flxTabTwoListHeader7.left = isTablet ? '-4%' : '0%';
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
		  } catch (err) {
			var errorObj = {
			  "method": "segDropdownExpandCollapse",
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
			  "id": "InwardCollectionsBarChart",
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
         * @api : getStatusAndChartData
         * This function fetches all data based on status and Bill type
         * @return : NA
         */
        getStatusAndChartData: function () {
            var scope = this;
            try {
                //chartAndStatusData holds count and total Amount of records, grouped based on statuses.
                chartAndStatusData = scope.guaranteesLCDetails.reduce(function (acc, res) {
                    let status = (res['status'] ? res['status'] : "").toLowerCase();
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
                    for (let j = 0; j < collectionsStatus[i].InwardStatus.length; j++) {
                        for (let k = 0; k < Object.keys(chartAndStatusData).length; k++) {
                            if ((collectionsStatus[i].InwardStatus[j]).toLowerCase() === (Object.keys(chartAndStatusData)[k]).toLowerCase()) {
                                collectionsStatus[i].InwardStatus[j] = Object.keys(chartAndStatusData)[k];
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
                                    statusData[collectionsStatus[i].DisplayStatus]["totalAmount"]["usance"][lcCurrency[l]] = statusData[collectionsStatus[i].DisplayStatus]["totalAmount"]["usance"][lcCurrency[l]] + (chartAndStatusData[collectionsStatus[i].InwardStatus[j]]["totalAmount"]["usance"][lcCurrency[l]] ? chartAndStatusData[collectionsStatus[i].InwardStatus[j]]["totalAmount"]["usance"][lcCurrency[l]] : 0);
                                    if (!statusData[collectionsStatus[i].DisplayStatus]["totalAmount"]["sight"][lcCurrency[l]]) statusData[collectionsStatus[i].DisplayStatus]["totalAmount"]["sight"][lcCurrency[l]] = 0;
                                    statusData[collectionsStatus[i].DisplayStatus]["totalAmount"]["sight"][lcCurrency[l]] = statusData[collectionsStatus[i].DisplayStatus]["totalAmount"]["sight"][lcCurrency[l]] + (chartAndStatusData[collectionsStatus[i].InwardStatus[j]]["totalAmount"]["sight"][lcCurrency[l]] ? chartAndStatusData[collectionsStatus[i].InwardStatus[j]]["totalAmount"]["sight"][lcCurrency[l]] : 0);
                                    if (!statusData[collectionsStatus[i].DisplayStatus]["count"]["usance"][lcCurrency[l]]) statusData[collectionsStatus[i].DisplayStatus]["count"]["usance"][lcCurrency[l]] = 0;
                                    statusData[collectionsStatus[i].DisplayStatus]["count"]["usance"][lcCurrency[l]] = statusData[collectionsStatus[i].DisplayStatus]["count"]["usance"][lcCurrency[l]] + (chartAndStatusData[collectionsStatus[i].InwardStatus[j]]["count"]["usance"][lcCurrency[l]] ? chartAndStatusData[collectionsStatus[i].InwardStatus[j]]["count"]["usance"][lcCurrency[l]] : 0);
                                    if (!statusData[collectionsStatus[i].DisplayStatus]["count"]["sight"][lcCurrency[l]]) statusData[collectionsStatus[i].DisplayStatus]["count"]["sight"][lcCurrency[l]] = 0;
                                    statusData[collectionsStatus[i].DisplayStatus]["count"]["sight"][lcCurrency[l]] = statusData[collectionsStatus[i].DisplayStatus]["count"]["sight"][lcCurrency[l]] + (chartAndStatusData[collectionsStatus[i].InwardStatus[j]]["count"]["sight"][lcCurrency[l]] ? chartAndStatusData[collectionsStatus[i].InwardStatus[j]]["count"]["sight"][lcCurrency[l]] : 0);
                                    //Calcluating Total Amount of Available records
                                    if (collectionsStatus[i].InwardStatus[j].toLowerCase() !== OLBConstants.GUARANTEE_LC_STATUS.APPROVED.toLowerCase()) {
                                        statusData["Available"]["totalAmount"]["usance"][lcCurrency[l]] = statusData["Available"]["totalAmount"]["usance"][lcCurrency[l]] + (chartAndStatusData[collectionsStatus[i].InwardStatus[j]]["totalAmount"]["usance"][lcCurrency[l]] ? chartAndStatusData[collectionsStatus[i].InwardStatus[j]]["totalAmount"]["usance"][lcCurrency[l]] : 0);
                                        statusData["Available"]["totalAmount"]["sight"][lcCurrency[l]] = statusData["Available"]["totalAmount"]["sight"][lcCurrency[l]] + (chartAndStatusData[collectionsStatus[i].InwardStatus[j]]["totalAmount"]["sight"][lcCurrency[l]] ? chartAndStatusData[collectionsStatus[i].InwardStatus[j]]["totalAmount"]["sight"][lcCurrency[l]] : 0);
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
         * @api : setBarChartData
         * Sets data to chart
         * @return : NA
         */
        setBarChartData: function () {
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
                    };
                    budget = statusData["Approved"] ? statusData["Approved"]["totalAmount"][(tenorType[j].type).toLowerCase()][selectedCurrency] : 0;
                    remainingBudget = statusData["Available"] ? statusData["Available"]["totalAmount"][(tenorType[j].type).toLowerCase()][selectedCurrency] : 0;
                    toolTip = tenorType[j].type + "\n" + kony.i18n.getLocalizedString("i18n.konybb.Common.Approved") + " " + kony.i18n.getLocalizedString("i18n.wealth.amount") + " : " + formatUtil.formatAmountandAppendCurrencySymbol(JSON.stringify(budget), selectedCurrency) + "\n" + kony.i18n.getLocalizedString("i18n.TradeFinance.processing") + " " + kony.i18n.getLocalizedString("i18n.wealth.amount") + " : " + formatUtil.formatAmountandAppendCurrencySymbol(JSON.stringify(remainingBudget), selectedCurrency);
                    barData.categoryName = tenorType[j].type;
                    barData.budget1 = budget;
                    barData.budget1ColorCode = tenorType[j].colorCode;
                    barData.budget2 = remainingBudget;
                    barData.budget2ColorCode = "color:" + tenorType[j].colorCode + ";" + "opacity:0.5";
                    barData.budget1TooltipText = toolTip
                    barData.budget2TooltipText = toolTip
                    data.push(barData);
                }
                scope.view.formTemplate12.flxContentTCCenter.flxBarGraphMain.InwardCollectionsBarChart.chartData = data;
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
                    lblRow1Column1Title1: "lblRow1Column1Title1",
                    lblRow1Column1Title2: "lblRow1Column1Title2",
                    flxRow1Column1Title3: "flxRow1Column1Title3",
                    lblRow2Column1Title1: "lblRow2Column1Title1",
                    lblRow2Column2Title2: "lblRow2Column2Title2",
                    lblRow1Column1Title4: "lblRow1Column1Title4",
                    lblRow2Column2Title3: "lblRow2Column2Title3",
                    lblRow2Column2Title4: "lblRow2Column2Title4",
                    btnDownload: "btnDownload",
                    btnPrint: "btnPrint",
                    btnAction: "btnAction",
                    lblRow2Column1Value1: "lblRow2Column1Value1",
                    lblRow2Column2Value2: "lblRow2Column2Value2",
                    lblRow2Column2Value3: "lblRow2Column2Value3",
                    lblRow2Column2Value4: "lblRow2Column2Value4",
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
                    imgDaysLeft: "imgDaysLeft",
                    lblRow2Column2Title2: "lblRow2Column2Title2",
                    flxTempInwardAmendmentListExpand: "flxTempInwardAmendmentListExpand",
                    flxTempHeaderContainer: "flxTempHeaderContainer"
                };
                if (CURRENT_TAB === TAB_COLLECTIONS) {
                    recordsData.map(singleResponse => {
                        masterData.push({
                            lblColumn1: { 
                                text: singleResponse.drawerName ? singleResponse.drawerName : NA,
                                skin: 'ICSKNLbl42424215PxWordBreak',
                                width : "100%",
                                height : "49dp"
                            },
                            lblColumn2: singleResponse.tenorType ? singleResponse.tenorType : NA,
                            lblColumn3: singleResponse.documentNo ? singleResponse.documentNo : NA,
                            lblColumn4: {
                                text: isTablet ? singleResponse.documentNo ? singleResponse.documentNo : NA
                                    : singleResponse.receivedOn ? CommonUtilities.getFrontendDateString(singleResponse.receivedOn, applicationManager.getConfigurationManager().frontendDateFormat) : NA
                            },
                            lblColumn5: {
                                text: isTablet ? singleResponse.receivedOn ? CommonUtilities.getFrontendDateString(singleResponse.receivedOn, applicationManager.getConfigurationManager().frontendDateFormat) : NA
                                    : singleResponse.amount ? singleResponse.currency + " " + applicationManager.getFormatUtilManager().formatAmount(singleResponse.amount) : NA,
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
                                width: isTablet ? '20%' : '15%',
                                left: isTablet ? '9%' : '1%',
                            },
                            flxColumn7: {
                                width: isTablet ? '16%' : '9%'
                            },
                            flxDropdown: {
                                "onClick": scope.onSegmentRowToggle.bind(this)
                            },
                            btnAction: {
                                "text": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                                "toolTip": kony.i18n.getLocalizedString("i18n.common.ViewDetails"),
                                "onClick": function () {
                                    isViewDetailsBtnOnClick = true;
                                    scope.presenter.getInwardCollectionsById({
                                        "collectionSrmsId": singleResponse.collectionSrmsId
                                    }, "frmInwardCollectionsDashboardNew");
                                }
                            },
                            btnDownload: {
                                "text": kony.i18n.getLocalizedString("i18n.common.Download"),
                                "toolTip": kony.i18n.getLocalizedString("i18n.common.Download"),
                                "onClick": function () {
                                    scope.presenter.generateInwardCollections({
                                        "collectionSrmsId": singleResponse.collectionSrmsId
                                    }, "frmInwardCollectionsDashboardNew");
                                }
                            },
                        });
                    })
                } else if (CURRENT_TAB === TAB_AMENDMENTS) {
                    recordsData.map(singleResponse => {
                        masterData.push({
                            lblColumn1: { 
                                text: singleResponse.drawer ? singleResponse.drawer : NA,
                                skin: 'ICSKNLbl42424215PxWordBreak',
                                width : "100%",
                                height : "49dp"
                            },
                            lblColumn2: singleResponse.amendmentNo ? singleResponse.amendmentNo : NA,
                            lblColumn3: singleResponse.tenorType ? singleResponse.tenorType : NA,
                            lblColumn4: singleResponse.receivedOn ? CommonUtilities.getFrontendDateString(singleResponse.receivedOn, applicationManager.getConfigurationManager().frontendDateFormat) : NA,
                            lblColumn5: {
                                text: singleResponse.amount ? singleResponse.currency + " " + applicationManager.getFormatUtilManager().formatAmount(singleResponse.amount) : NA,
                                right: isTablet ? '0%' : '20%',
                            },
                            lblColumn6: singleResponse.status ? singleResponse.status : NA,
                            flxColumn1: {
                                width: isTablet ? '15%' : '13%',
                                right: isTablet ? '-3%' : '6%'
                            },
                            flxColumn2: {
                                isVisible: isTablet ? false : true
                            },
                            flxColumn3: {
                                isVisible: isTablet ? false : true,
                                width: isTablet ? '18%' : '11%'
                            },
                            flxColumn4: {
                                width: isTablet ? '13%' : '10%',
                                left: isTablet ? '6%' : '1%'
                            },
                            flxColumn5: {
                                width: isTablet ? '18%' : '18%',
								left: isTablet  ? '-1%' : '2%'
                            },
                            flxColumn6: {
                                width: isTablet ? '20%' : '13%',
                                left: isTablet ? '12%' : '0%',
                            },
                            flxColumn7: {
                                width: isTablet ? '16%' : '8%',
                                left: isTablet ? '-5%' : '-1%'
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
                                "onClick": function () {
                                    selectedRecord = singleResponse;
                                    isAmendViewDetailsonClick = true;
                                    isCollectionSrmsIdServiceTriggered = true;
                                    scope.presenter.showInwardCollectionScreen({
                                        context: 'viewAmendmentDetails',
                                        form: scope.view.id,
                                        data: singleResponse
                                    });
                                }
                            },
                            "btnPrint": {
                                "text": kony.i18n.getLocalizedString("i18n.accounts.print"),
                                "isVisible": isTablet ? false : true,
                                "toolTip": kony.i18n.getLocalizedString("i18n.accounts.print"),
                                "onClick": function () {
                                    selectedRecord = singleResponse;
                                    isPrintNavigation = true;
                                    isCollectionSrmsIdServiceTriggered = true;
                                    scope.presenter.getInwardAmendmentsById({
                                        "amendmentSrmsId": singleResponse.amendmentSrmsId
                                    }, "frmInwardCollectionsDashboardNew");
                                }
                            },
                            btnDownload: {
                                "text": kony.i18n.getLocalizedString("i18n.common.Download"),
                                "toolTip": kony.i18n.getLocalizedString("i18n.common.Download"),
                                "onClick": function () {
                                    scope.presenter.generateInwardAmendment({
                                        "amendmentSrmsId": singleResponse.amendmentSrmsId
                                    }, "frmInwardCollectionsDashboardNew");
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
        onSegmentRowToggle: function () {
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
                    if(!scope.presenter.isEmptyNullOrUndefined(segData[prevSelectedIndex])){
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
                            text: isTablet ? singleResponse.receivedOn ? CommonUtilities.getFrontendDateString(singleResponse.receivedOn, applicationManager.getConfigurationManager().frontendDateFormat) : NA
                                : singleResponse.amount ? singleResponse.currency + " " + applicationManager.getFormatUtilManager().formatAmount(singleResponse.amount) : NA,
                            right: isTablet ? '0%' : '20%',
                        };
                    }
                    if (CURRENT_TAB === TAB_AMENDMENTS) {
                        prevSelectedRowDataObject.flxColumn4 = {
                            width: isTablet ? '13%' : '10%',
                            left: isTablet ? '6%' : '1%'
                        };
                        prevSelectedRowDataObject.flxColumn5 = {
                            width: isTablet ? '18%' : '18%',
                            left: isTablet ? '-1%' : '2%'
                        };
                        prevSelectedRowDataObject.flxColumn6 = {
                            width: isTablet ? '20%' : '13%',
                            left: isTablet ? '12%' : '0%',
                        };
                        prevSelectedRowDataObject.flxColumn7 = {
                            left: isTablet ? '0%' : '-1%',
                            width: isTablet ? '11%' : '8%'
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
                        right: isTablet ? '4%' : '6%',
                        width: isTablet ? '11%' : '10%'
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
                        width: isTablet ? '18%' : '13%'
                    };
                    selectedRowDataObject.flxRow2Column3 = {
                        isVisible: isTablet ? true : false
                    };
                    selectedRowDataObject.flxRow2Column4 = {
                        isVisible: isTablet ? true : false,
                        width: isTablet ? '14%' : '13%',
                        left: isTablet ? '9%' : '3%'
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
                        text: isTablet ? singleResponse.receivedOn ? CommonUtilities.getFrontendDateString(singleResponse.receivedOn, applicationManager.getConfigurationManager().frontendDateFormat) : NA
                            : singleResponse.amount ? singleResponse.currency + " " + applicationManager.getFormatUtilManager().formatAmount(singleResponse.amount) : NA,
                        right: isTablet ? '30%' : '20%',
                    };
                    selectedRowDataObject.lblRow1Column1Title1 = {
                        text: isTablet ? scope.presenter.renderI18nKeys("i18n.TradeFinance.tenorType", false) : scope.presenter.renderI18nKeys("i18n.TradeFinance.TransactionRef", false)
                    };
                    selectedRowDataObject.lblRow1Column1Title2 = {
                        text: isTablet ? scope.presenter.renderI18nKeys("i18n.konybb.Common.Amount", false) : scope.presenter.renderI18nKeys("i18n.accountDetail.maturityDate", false)
                    };
                    selectedRowDataObject.lblRow1Column1Title4 = {
                        text: isTablet ? scope.presenter.renderI18nKeys("i18n.accountDetail.maturityDate", false) : scope.presenter.renderI18nKeys("i18n.TradeFinance.amountDebitFrom", false)
                    };
                    selectedRowDataObject.lblRow2Column1Title1 = {
                        text: isTablet ? scope.presenter.renderI18nKeys("i18n.TradeFinance.daysLeftTopay", false) : scope.presenter.renderI18nKeys("i18n.TradeFinance.IncoTerms", false)
                    };
                    selectedRowDataObject.lblRow2Column2Title2 = {
                        text: isTablet ? scope.presenter.renderI18nKeys("i18n.TradeFinance.amountDebitFrom", false) : scope.presenter.renderI18nKeys("i18n.TradeFinance.remittingBank", false)
                    };
                    selectedRowDataObject.lblRow2Column2Title3 = {
                        isVisible: isTablet ? true : false,
                        text: scope.presenter.renderI18nKeys("i18n.TradeFinance.IncoTerms", false)
                    };
                    selectedRowDataObject.lblRow2Column2Title4 = {
                        isVisible: isTablet ? true : false,
                        text: scope.presenter.renderI18nKeys("i18n.TradeFinance.remittingBank", false)
                    };
                    selectedRowDataObject.flxRow1Column1Title3 = {
                        text: isTablet ? scope.presenter.renderI18nKeys("i18n.TradeFinance.TransactionRef", false) : scope.presenter.renderI18nKeys("i18n.TradeFinance.daysLeftTopay", false)
                    };
                    selectedRowDataObject.imgDaysLeft = {
                        isVisible: isTablet ? false : true,
                    };
                    selectedRowDataObject.imgDaysLeftTab = {
                        isVisible: isTablet ? true : false,
                    };
                    selectedRowDataObject.lblRow2Column1Value1 = {
                        left: isTablet ? '5dp' : '0dp'
                    };
                    selectedRowDataObject.lblDaysLeft = {
                        left: isTablet ? '0dp' : '5dp'
                    };
                    selectedRowDataObject.flxRow1Column2 = {
                        width: isTablet ? '15%' : '10%'
                    };
                    let tempMaturityDate = scope.presenter.calculateMaturityDate(singleResponse.maturityDate);
                    if (isTablet) {
                        selectedRowDataObject.lblRow1Column1Value1 = singleResponse.tenorType ? singleResponse.tenorType : NA;
                        selectedRowDataObject.lblRow1Column1Value2 = singleResponse.amount ? singleResponse.currency + " " + applicationManager.getFormatUtilManager().formatAmount(singleResponse.amount) : NA;
                        selectedRowDataObject.lblDaysLeft["text"] = singleResponse.collectionSrmsId ? singleResponse.collectionSrmsId : NA;
                        selectedRowDataObject.lblRow1Column1Value4 = singleResponse.maturityDate ? CommonUtilities.getFrontendDateString(singleResponse.maturityDate, applicationManager.getConfigurationManager().frontendDateFormat) : NA;
                        selectedRowDataObject.lblRow2Column1Value1["text"] = tempMaturityDate.daysLeft;
                        selectedRowDataObject.imgDaysLeftTab["src"] = tempMaturityDate.imageToLoad;
                        selectedRowDataObject.lblRow2Column2Value2 = singleResponse.debitAmountFrom ? singleResponse.debitAmountFrom : scope.presenter.renderI18nKeys("i18n.TradeFinance.notProvidedYet", false);
                        selectedRowDataObject.lblRow2Column2Value3 = singleResponse.incoTerms ? singleResponse.incoTerms : NA;
                        selectedRowDataObject.lblRow2Column2Value4 = singleResponse.remittingBank ? singleResponse.remittingBank : NA;
                    } else {
                        selectedRowDataObject.lblRow1Column1Value1 = singleResponse.collectionSrmsId ? singleResponse.collectionSrmsId : NA;
                        selectedRowDataObject.lblRow1Column1Value2 = singleResponse.maturityDate ? CommonUtilities.getFrontendDateString(singleResponse.maturityDate, applicationManager.getConfigurationManager().frontendDateFormat) : NA;
                        selectedRowDataObject.lblDaysLeft["text"] = tempMaturityDate.daysLeft;
                        selectedRowDataObject.imgDaysLeft["src"] = tempMaturityDate.imageToLoad;
                        selectedRowDataObject.lblRow1Column1Value4 = singleResponse.debitAmountFrom ? singleResponse.debitAmountFrom : scope.presenter.renderI18nKeys("i18n.TradeFinance.notProvidedYet", false);
                        selectedRowDataObject.lblRow2Column1Value1["text"] = singleResponse.incoTerms ? singleResponse.incoTerms : NA;
                        selectedRowDataObject.lblRow2Column2Value2 = singleResponse.remittingBank ? singleResponse.remittingBank : NA;
                    }
                    selectedRowDataObject.btnPrint = {
                        "onClick": function () {
                            scope.navigateToPrint(singleResponse);
                        },
						"isVisible": isTablet ? false : true
                    };
                } else if (CURRENT_TAB === TAB_AMENDMENTS) {
                    selectedRowDataObject.flxRow1Column1 = {
                        right: isTablet ? '2%' : '6%'
                    };
                    selectedRowDataObject.flxRow1Column3 = {
                        left: isTablet ? '11.9%' : '3%',
                        width: isTablet ? '16%' : '11%'
                    };
                    selectedRowDataObject.flxRow1Column4 = {
                        left: isTablet ? '4%' : '1%',
                        width: isTablet ? '18%' : '10%'
                    };
                    selectedRowDataObject.flxRow1Column5 = {
                        isVisible: isTablet ? false : true
                    };
                    selectedRowDataObject.flxRow1Column6 = {
                        isVisible: isTablet ? false : true
                    };
                    selectedRowDataObject.flxRow1Column7 = {
                        left: isTablet ? '2.8%' : '3%'
                    };
                    selectedRowDataObject.flxRow2Column1 = {
                        right: isTablet ? '2%' : '6%',
                        width: "13%"
                    };
                    selectedRowDataObject.flxColumn5 = {
                        width: isTablet ? '18%' : '18%',
                        left: isTablet ? '-0.8%' : '2%'
                    };
                    selectedRowDataObject.flxColumn6 = {
                        left: isTablet ? '11.5%' : '0%',
                        width: isTablet ? '17%' : '13%'
                    };
                    selectedRowDataObject.flxColumn7 = {
                        left: isTablet ? '3%' : '-1%',
                        width: isTablet ? '11%' : '8%'
                    };
                    selectedRowDataObject.flxTempInwardAmendmentListExpand = {
                        height: isTablet ? "176dp" : singleResponse.hasOwnProperty("cancellationStatus") ? "176dp" : "112dp"
                    };
                    selectedRowDataObject.flxRowTwo = {
                        isVisible: isTablet ? true : (singleResponse.cancellationStatus ? true : false)
                    };
                    selectedRowDataObject.lblRow1Column1Title1 = {
                        text: isTablet ? scope.presenter.renderI18nKeys("i18n.TradeFinance.AmendmentNo", false) : scope.presenter.renderI18nKeys("i18n.TradeFinance.TransactionRef", false)
                    };
                    selectedRowDataObject.lblRow1Column1Title2 = {
                        text: isTablet ? scope.presenter.renderI18nKeys("i18n.TradeFinance.tenorType", false) : scope.presenter.renderI18nKeys("i18n.accountDetail.maturityDate", false)
                    };
                    selectedRowDataObject.flxRow1Column1Title3 = {
                        text: isTablet ? scope.presenter.renderI18nKeys("i18n.TradeFinance.TransactionRef", false) : scope.presenter.renderI18nKeys("i18n.TradeFinance.daysLeftTopay", false)
                    };
                    selectedRowDataObject.lblRow1Column1Title4 = {
                        text: isTablet ? scope.presenter.renderI18nKeys("i18n.accountDetail.maturityDate", false) : scope.presenter.renderI18nKeys("i18n.TradeFinance.remittingBank", false)
                    };
                    selectedRowDataObject.lblRow2Column1Title1 = {
                        text: isTablet ? scope.presenter.renderI18nKeys("i18n.TradeFinance.daysLeftTopay", false) : scope.presenter.renderI18nKeys("i18n.TradeFinance.CancellationStatus", false)
                    };
                    selectedRowDataObject.lblRow2Column2Title2 = {
                        text: scope.presenter.renderI18nKeys("i18n.TradeFinance.remittingBank", false)
                    };
                    selectedRowDataObject.lblRow2Column1Title3 = {
                        text: scope.presenter.renderI18nKeys("i18n.TradeFinance.CancellationStatus", false),
                        isVisible: true
                    };
                    selectedRowDataObject.imgDaysLeft = {
                        isVisible: isTablet ? false : true
                    };
                    selectedRowDataObject.lblDaysLeft = {
                        left: isTablet ? '0dp' : '5dp'
                    };
                    selectedRowDataObject.lblRow2Column1Value1 = {
                        left: isTablet ? '5dp' : '0dp'
                    };
                    selectedRowDataObject.imgDaysLeftTab = {
                        isVisible: isTablet ? true : false,
                    };
                    selectedRowDataObject.flxRow2Column4 = {
                        isVisible: singleResponse.hasOwnProperty("cancellationRequest") ? true : false,
                        width: isTablet ? '20%' : '13%',
                        left: isTablet ? '7%' : '3%'
                    };
                    selectedRowDataObject.flxRow2Column2 = {
                        isVisible: isTablet ? true : false,
                        width: isTablet ? '15%' : '10%',
                        left: isTablet ? '3%' : '0%'
                    };
                    selectedRowDataObject.flxRow1Column2 = {
                        left: isTablet ? '3%' : '0%'
                    };
                    selectedRowDataObject.flxRow2Column4 = {
                        isVisible: isTablet ? (singleResponse.cancellationStatus ? true : false) : false,
                        width: "20%",
                        left: "7%"
                    };
                    let tempMaturityDate = scope.presenter.calculateMaturityDate(singleResponse.maturityDate);
                    if (isTablet) {
                        selectedRowDataObject.lblRow1Column1Value1 = singleResponse.amendmentNo ? singleResponse.amendmentNo : NA;
                        selectedRowDataObject.lblRow1Column1Value2 = singleResponse.tenorType ? singleResponse.tenorType : NA;
                        selectedRowDataObject.lblDaysLeft = singleResponse.amendmentSrmsId ? singleResponse.amendmentSrmsId : NA;
                        selectedRowDataObject.lblRow1Column1Value4 = singleResponse.maturityDate ? CommonUtilities.getFrontendDateString(singleResponse.maturityDate, applicationManager.getConfigurationManager().frontendDateFormat) : NA;
                        selectedRowDataObject.lblRow2Column1Value1["text"] = tempMaturityDate.daysLeft;
                        selectedRowDataObject.imgDaysLeftTab["src"] = tempMaturityDate.imageToLoad;
                        selectedRowDataObject.lblRow2Column2Value2 = singleResponse.remittingBank ? singleResponse.remittingBank : NA;
                        selectedRowDataObject.lblRow2Column2Value4 = {
                            text: singleResponse.cancellationStatus ? singleResponse.cancellationStatus : NA,
                            skin: 'ICSknlbl424242SSP15pxSemibold'
                        };
                    } else {
                        selectedRowDataObject.lblRow1Column1Value1 = singleResponse.amendmentSrmsId ? singleResponse.amendmentSrmsId : NA;
                        selectedRowDataObject.lblRow1Column1Value2 = singleResponse.maturityDate ? CommonUtilities.getFrontendDateString(singleResponse.maturityDate, applicationManager.getConfigurationManager().frontendDateFormat) : NA;
                        selectedRowDataObject.lblDaysLeft["text"] = tempMaturityDate.daysLeft;
                        selectedRowDataObject.imgDaysLeft["src"] = tempMaturityDate.imageToLoad;
                        selectedRowDataObject.lblRow1Column1Value4 = singleResponse.remittingBank ? singleResponse.remittingBank : NA;
                        selectedRowDataObject.lblRow2Column1Value1["text"] = singleResponse.cancellationStatus ? singleResponse.cancellationStatus : NA;
                        selectedRowDataObject.lblRow2Column1Value1["skin"] = "ICSknlbl424242SSP15pxSemibold";
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
            if(collectionType.New || collectionType.PayDue){
                let key = collectionType.New ? NEW_COLLECTIONS : PAY_DUE_COLLECTIONS
                globalView.btnTab1.skin = 'ICSknBtnAccountSummarySelected2';
                globalView.btnTab2.skin = 'ICSknBtnAccountSummaryUnselected2';
                scope.setQuickLinksUI(key);
            }
            else{
            // Collections
            globalView.btnTab1.skin = 'ICSknBtnAccountSummarySelected2';
            globalView.btnTab2.skin = 'ICSknBtnAccountSummaryUnselected2';
            CURRENT_TAB = TAB_COLLECTIONS;
            globalView.flxTabOneListingHeaderContainer.setVisibility(true);
            globalView.flxTabTwoListingHeaderContainer.setVisibility(false);
            serviceResponse = {};
            CURRENT_ROW_TEMPLATE = 'flxTempInwardAmendmentList';
            CURRENT_EXPAND_ROW_TEMPLATE = 'flxTempInwardAmendmentListExpand';
            globalView.tbxSearch.placeholder = scope.presenter.renderI18nKeys("i18n.TradeFinance.searchForDrawerDocumentNo",false);
            scope.view.formTemplate12.pageTitle = scope.presenter.renderI18nKeys("i18n.TradeFinance.inwardCollections");
            scope.setPaginationComponent(kony.i18n.getLocalizedString("i18n.TradeFinance.collections"));
            scope.setViewActions();
            scope.setFilterUIView();  
            serviceParameters = {
              searchString: "",
              pageSize: "11",
              pageOffset: 0,
              sortByParam: "createdDate",
              sortOrder: "DESC",
              timeParam: "createdDate",
              timeValue: "6,MONTH",
              filterByValue: "",
              filterByParam: ""
            };  
            globalView.imgTabOneListHeader4.src = "sorting_previous.png";
            globalView.lblFilterText.text = scope.presenter.renderI18nKeys("i18n.konybb.Common.All", false);
            globalView.lblClear.setVisibility(false);
            globalView.tbxSearch.text = "";
            globalView.flxListDropdown.setVisibility(false);
            globalView.imgFilterDropdown.src = "arrowdown_sm.png";
            globalView.flxEllipsisDropDown.setVisibility(false);
            scope.fetchDashBoardData();
            }
          } else if (buttonId === TAB_AMENDMENTS) {
            // Amendments
            scope.setDefaultSort("imgTabTwoListHeader4");
            globalView.btnTab1.skin = 'ICSknBtnAccountSummaryUnselected2';
            globalView.btnTab2.skin = 'ICSknBtnAccountSummarySelected2';
            globalView.flxTabTwoListHeader1.width = isTablet ? '5%' : '13%';
            globalView.flxTabTwoListHeader7.width = isTablet ? '17%' : '10%';
            globalView.flxPagination.PaginationContainer.flxPagination.width = "257dp";
            CURRENT_TAB = TAB_AMENDMENTS;
            globalView.flxTabOneListingHeaderContainer.setVisibility(false);
            globalView.flxTabTwoListingHeaderContainer.setVisibility(true);
            globalView.tbxSearch.placeholder = scope.presenter.renderI18nKeys("i18n.TradeFinance.searchforDrawerTransactionRef",false);
            scope.view.formTemplate12.pageTitle = scope.presenter.renderI18nKeys("i18n.TradeFinance.inwardCollections");
            globalView.lblFilterText.text = scope.presenter.renderI18nKeys("i18n.konybb.Common.All", false);
            CURRENT_ROW_TEMPLATE = 'flxTempInwardAmendmentList';
            CURRENT_EXPAND_ROW_TEMPLATE = 'flxTempInwardAmendmentListExpand';
            scope.setPaginationComponent(kony.i18n.getLocalizedString("i18n.ImportLC.Amendments"));
            serviceResponse = {};
            scope.setViewActions();
            scope.setFilterUIView();
            serviceParameters = {
              searchString: "",
              pageSize: "11",
              pageOffset: 0,
              sortByParam: "createdDate",
              sortOrder: "DESC",
              timeParam: "createdDate",
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
                    scope.presenter.generateInwardCollectionsList(serviceParameters, "frmInwardCollectionsDashboardNew");
                } else if (CURRENT_TAB === TAB_AMENDMENTS) {
                    scope.presenter.generateInwardAmendmentsList(serviceParameters,"frmInwardCollectionsDashboardNew");
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
                    scope.presenter.getInwardCollections(serviceParameters, "frmInwardCollectionsDashboardNew");
                } else if (CURRENT_TAB === TAB_AMENDMENTS) {
                    scope.presenter.getInwardAmendments(serviceParameters, "frmInwardCollectionsDashboardNew"); 
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
        /**
   * @api : navigateToPrint
   * Navigating to the print based on condition
   * @return : NA
   */
        navigateToPrint: function (data) {
            var scope = this;
            try {
                let formNameForPrint = 'frmInwardCollectionsPrint';
                let dataObj = {
                    navData: data,
                    previousFormName: 'frmInwardCollectionsDashboardNew',
                    pageTitle: 'i18n.TradeFinance.messageKey'
                };
                new kony.mvc.Navigation({
                    "appName": "TradeFinanceMA",
                    "friendlyName": `InwardCollectionsUIModule/${formNameForPrint}`
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
      * @api : setRecentCollectionsData
      * This function sets Data for the Recent Collections Section
      * @return : NA
      */
        setRecentCollectionsData: function () {
            var scope = this;
            try {
                globalView.lblRecentOneApplicant.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.drawee", true);
                globalView.lblRecentTwoApplicant.text = scope.presenter.renderI18nKeys("i18n.TradeFinance.drawee", true);
                if (!kony.sdk.isNullOrUndefined(recentCollectionsData[0])) {
                    globalView.lblRecentOneApplicantValue.text = scope.presenter.isEmptyNullOrUndefined(recentCollectionsData[0].drawerName) ? NA : recentCollectionsData[0].drawerName;
                    globalView.lblRecentOneTypeRefValue.text = scope.presenter.isEmptyNullOrUndefined(recentCollectionsData[0].collectionSrmsId) ? NA : recentCollectionsData[0].collectionSrmsId;
                    globalView.lblRecentOneStatusValue.text = scope.presenter.isEmptyNullOrUndefined(recentCollectionsData[0].status) ? NA : recentCollectionsData[0].status;
                    globalView.btnRecentOneViewDetails.text = scope.presenter.renderI18nKeys("i18n.common.ViewDetails", false),
                    globalView.btnRecentOneViewDetails.onClick = scope.getCollectionsByID.bind(this, globalView.lblRecentOneTypeRefValue.text);
                } else {
                    globalView.lblRecentOneApplicantValue.text = NA;
                    globalView.lblRecentOneTypeRefValue.text = NA;
                    globalView.lblRecentOneStatusValue.text = NA;
                }
                if (!kony.sdk.isNullOrUndefined(recentCollectionsData[1])) {
                    globalView.lblRecentTwoApplicantValue.text = scope.presenter.isEmptyNullOrUndefined(recentCollectionsData[1].drawerName) ? NA : recentCollectionsData[1].drawerName;
                    globalView.lblRecentTwoTypeRefValue.text = scope.presenter.isEmptyNullOrUndefined(recentCollectionsData[1].collectionSrmsId) ? NA : recentCollectionsData[1].collectionSrmsId;
                    globalView.lblRecentTwoStatusValue.text = scope.presenter.isEmptyNullOrUndefined(recentCollectionsData[1].status) ? NA : recentCollectionsData[1].status;
                    globalView.btnRecentTwoViewDetails.text = scope.presenter.renderI18nKeys("i18n.common.ViewDetails", false),
                        globalView.btnRecentTwoViewDetails.onClick = scope.getCollectionsByID.bind(this, globalView.lblRecentTwoTypeRefValue.text);
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
         * @api : getCollectionsByID
         * This function handles onclick of View Details in Recent Collections section
         * @return : NA
         */
        getCollectionsByID: function (CollectionsID) {
            var scope = this;
            var serviceParamGetCollectionsByID = {};
            try {
                isViewDetailsBtnOnClick = true;
                serviceParamGetCollectionsByID["collectionSrmsId"] = CollectionsID;
                scope.presenter.getInwardCollectionsById(serviceParamGetCollectionsByID, "frmInwardCollectionsDashboardNew");
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
           * @api : setQuickLinksUI
           * this function is responsible for QuickLinks UI
           * @return : NA
          */
        setQuickLinksUI: function (param) {
            var scope = this;
            collectionType.New = param === NEW_COLLECTIONS ? true : false;
            collectionType.PayDue = param === PAY_DUE_COLLECTIONS ? true : false;
            var PayDueCollections = scope.presenter.renderI18nKeys("i18n.payments.payDue") + "," + scope.presenter.renderI18nKeys("i18n.AccountSummary.overdue") + "," + scope.presenter.renderI18nKeys("i18n.konybb.Common.Approved");
            try {
                scope.view.formTemplate12.pageTitle = kony.i18n.getCurrentLocale() === 'ar_AE' ? param + "-" + scope.presenter.renderI18nKeys("i18n.TradeFinance.inwardCollections"): scope.presenter.renderI18nKeys("i18n.TradeFinance.inwardCollections") + " - " + param ;
                serviceParameters = {
                    searchString: "",
                    pageSize: "11",
                    pageOffset: 0,
                    sortByParam: "",
                    sortOrder: "DESC",
                    timeParam: "",
                    timeValue: "6,MONTH",
                    filterByValue: "",
                    filterByParam: ""
                };
                serviceParameters.filterByParam = param === scope.presenter.renderI18nKeys("i18n.TradeFinance.newCollections") ? "status" : "status,status,status";
                serviceParameters.filterByValue = param === scope.presenter.renderI18nKeys("i18n.TradeFinance.newCollections") ? scope.presenter.renderI18nKeys("i18n.userManagement.new") : serviceParameters.filterByValue = PayDueCollections;
                scope.fetchDashBoardData();
                scope.viewOrHideDashboardView(false, false);
            } catch (err) {
                var errorObj =
                {
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
        viewOrHideDashboardView: function(param,isBtnClick) {
            var scope = this;
            try {
				globalView.flxBackToCollectionsDashboard.setVisibility(!param);
                globalView.flxOverViewAndRecent.setVisibility(param);
                if (param && isBtnClick) {
                    collectionType.New = false;
                    collectionType.PayDue = false;
                    scope.onTabClick(TAB_COLLECTIONS);
                }
            } catch (err) {
                var errorObj = {
                    "method": "viewOrHideDashboardView",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
      
        /**
         * @api : onError
         * Error thrown from catch block in component and shown on the form
         * @arg: err - object based on error
         * @return : NA
        */
        onError: function (err) {
            let errMsg = JSON.stringify(err);
            errMsg.level = "frmInwardCollectionsDashboard";
            // kony.ui.Alert(errMsg);
        },
    };
});