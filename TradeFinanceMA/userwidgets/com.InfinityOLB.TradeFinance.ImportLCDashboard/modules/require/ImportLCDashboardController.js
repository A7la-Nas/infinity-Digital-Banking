define(['./ImportLCStore','./ImportLCBusinessController','FormatUtil', 'OLBConstants', 'FormControllerUtility'],function(ImportLCStore, BusinessController,FormatUtil, OLBConstants, FormControllerUtility) {
  var orientationHandler = new OrientationHandler();
  let fileName = '', importLCGraphData;
  let popupObj;
  const NA = kony.i18n.getLocalizedString("i18n.common.NA");
  const formatter = new Intl.NumberFormat('en', { notation: 'compact' });
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._serviceParameters = {};
      this._dataFormatting = {};
      this._dataMapping = {};
      this._breakoints = {};      
      ImportLCStore.subscribe(this.render.bind(this));
      this.businessController = new BusinessController();
      this.dataValidationHandler = new DataValidationHandler();
      this.formatUtil = new FormatUtil();
      this.store = ImportLCStore;
      this.collectionObj = ImportLCStore.getState();
      this.businessController.store = this.store;
      this.context = {};
      this.isNoRecordsAvailable = false;
      this.segLCAccountType = '';
      this.segLCStatusType = '';
      this.segTimePeriods = ''; 
      this.filterByValue = "";
      this.filterByParam = "";
      this.isSearchEnabled = false;
      this.isFilterApplied = false;
      this.intitateFirst = true;
      this.accountTypeFilter = [];
      this.statusTypeFilter = [];
      this.timePeriodFilter = [];
      this.customWidgetAdded= false;
      this.sortApplied = false;
      this.upperLimit = 10;
      this.currentTab = "LetterOfCredits";
      this.tabSelection = false;
      this.downloadXLSXData = "";
      this.isChartRendered = false;
      this.initialCall = true;
      this.segUIMapping = {
        "segImportLCList": {
          "flxDropDown": {onClick: this.onSegmentRowToggle.bind(this)},                    
          "imgDropdown": {"src": "arrow_down.png", isVisible: true},
          "btnAction": {"text": "${i18n{i18n.common.ViewDetails}}", "toolTip": "${i18n{i18n.common.ViewDetails}}",  onClick: this.onActionClick.bind(this), "isVisible": true},    
          "btnContinueEditing": {"text": "${i18n{i18n.ImportLC.ContinueEditing}}", "toolTip": "${i18n{i18n.ImportLC.ContinueEditing}}", onClick: this.onActionClick.bind(this), "isVisible": true},    
          "btnCreateNewLCOFF": {"text": "${i18n{i18n.ImportLC.Copy&CreateNewLC}}", "toolTip": "${i18n{i18n.ImportLC.Copy&CreateNewLC}}", onClick:  this.showCopyAndCreateNewLCPopup.bind(this), "isVisible": false},
          "btnCreateNewLC": {"text": "${i18n{i18n.ImportLC.Copy&CreateNewLC}}", "toolTip": "${i18n{i18n.ImportLC.Copy&CreateNewLC}}", onClick:  this.showCopyAndCreateNewLCPopup.bind(this), "isVisible": true},    
          "btnDownload": {"text": "${i18n{i18n.common.Download}}", "toolTip": "${i18n{i18n.common.Download}}", onClick: this.onDownloadAction.bind(this), "isVisible": true},    
          "btnPrint": {"text": "${i18n{i18n.accounts.print}}","toolTip": "${i18n{i18n.accounts.print}}", onClick: this.onActionClick.bind(this), "isVisible": true},
          "btnPrintOFF": {"text": "${i18n{i18n.accounts.print}}","toolTip": "${i18n{i18n.accounts.print}}", onClick: this.onActionClick.bind(this), "isVisible": false}    
        }			
      };
      this.segUIConditionalMapping = {
        "segImportLCLIst" : {
        }
      };
      this.sortFields = {
        "column1" : "",
        "column2" : "",
        "column3" : "",
        "column4" : "",
        "column5" : "",
        "column6" : "",
        "column7" : ""
      };
      this.presenter = applicationManager.getModulesPresentationController({ appName: 'TradeFinanceMA', moduleName: 'ImportLCUIModule'});
      this.currencyCode;
      this.currencySymbol;
    },
    initGettersSetters: function() {
      defineGetter(this, 'dataMapping', () => {
        return this._dataMapping;
      });
      defineSetter(this, 'dataMapping', value => {
        this._dataMapping = value;
      });
      defineGetter(this, 'dataFormatting', () => {
        return this._dataFormatting;
      });
      defineSetter(this, 'dataFormatting', value => {
        this._dataFormatting = value;
      });
      defineGetter(this, 'conditionalMappingKey', () => {
        return this._conditionalMappingKey;
      });
      defineSetter(this, 'conditionalMappingKey', value => {
        this._conditionalMappingKey = value;
      });
      defineGetter(this, 'conditionalMapping', () => {
        return this._conditionalMapping;
      });
      defineSetter(this, 'conditionalMapping', value => {
        this._conditionalMapping = value;
      });
      defineGetter(this, 'breakpoints', () => {
        return this._breakpoints;
      });
      defineSetter(this, 'breakpoints', value => {
        this._breakpoints = value;
      });
      defineGetter(this, 'serviceParameters', () => {
        return this._serviceParameters;
      });
      defineSetter(this, 'serviceParameters', value => {
        this._serviceParameters = value;
      });
    },

    /**
       * @api : setContext
       * Method to set the context value 
       * @return : NA
       */
    setContext: function(context) {
      var scope = this;
      scope.context.Amend = "";
      scope.context.Drawings = "";
	  scope.currentTab = "";
      try{
        if (!kony.sdk.isNullOrUndefined(context.isAmendBackEvent)) {
          scope.context.Amend = context;
        } else if (!kony.sdk.isNullOrUndefined(context.isDrawingsBack)) {
          scope.context.Drawings = context;
        }else{
          scope.context = context;
        }
        if (!kony.sdk.isNullOrUndefined(scope.context.Amend) && !kony.sdk.isNullOrUndefined(scope.context.Amend.isAmendBackEvent)&& kony.sdk.isNullOrUndefined(context.isDrawingsBack)) {
          scope.setTabData("Amendments");
        } else if (!kony.sdk.isNullOrUndefined(scope.context.Drawings) && !kony.sdk.isNullOrUndefined(scope.context.Drawings.isDrawingsBack)&& kony.sdk.isNullOrUndefined(context.isAmendBackEvent)) {
          scope.setTabData("Drawings");
        }
      } catch (err) {
        var errorObj = {
              "level" : "ComponentController",
              "method" : "SetContext",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    /**
      * @api : preShow
      * Gets invoked initiapostShowlly after rendering of UI
      * @return : NA
      */
    preShow: function() {
      var scope = this;
      try {
        popupObj = this.view.flxPopup.clone();
        if (typeof scope.dataMapping === 'string') {
          scope.dataMapping = JSON.parse(scope.dataMapping);
        }
        if (typeof this.serviceParameters === 'string') {
          this.serviceParameters = JSON.parse(this.serviceParameters);
        }
        this.isChartRendered = false;
        this.lowerLimit = 1;
        this.upperLimit = 10;
        scope.intitateFirst = true;
        scope.isFilterApplied = false;
        scope.isSearchEnabled = false;
        scope.sortApplied = false;
        if(scope.currentTab === "" || kony.sdk.isNullOrUndefined(scope.currentTab)){
          scope.currentTab = "LetterOfCredits";
        }
        this.setFilterData();
        //this.setFilterRawData();
        this.serviceParameters.Transactions.Criteria.pageOffset = 0;
        var configurationManager = applicationManager.getConfigurationManager();
        scope.createPermission = applicationManager.getConfigurationManager().checkUserPermission('IMPORT_LC_CREATE');
        scope.drawingViewPermission = applicationManager.getConfigurationManager().checkUserPermission('IMPORT_LC_DRAWINGS_VIEW');
        scope.drawingSubmitPermission = applicationManager.getConfigurationManager().checkUserPermission('IMPORT_LC_DRAWINGS_SUBMIT');
        if(scope.drawingViewPermission === true){
          this.view.btnTab3.setVisibility(true);
        }else {
          this.view.btnTab3.setVisibility(false);
        }
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "preShow",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
      * @api : postShow
      * Gets invoked initiapostShowlly after rendering of UI
      * @return : NA
      */
    postShow: function() {
      var scope = this;
      try {        
        this.setDropdownValues(this.view.segCurrencyFilter, this.presenter.importLCConfig.currencies, this.view.flxCurrencyFilterList, this.view.lblSelectedCurrencyFilter);
        this.setDropdownValues(this.view.segDurationFilter, this.presenter.importLCConfig.chartFilter, this.view.flxDurationFilterList, this.view.lblSelectedDurationFilter);
        var configurationManager = applicationManager.getConfigurationManager();
        scope.createPermission = applicationManager.getConfigurationManager().checkUserPermission('IMPORT_LC_CREATE');
        scope.drawingViewPermission = applicationManager.getConfigurationManager().checkUserPermission('IMPORT_LC_DRAWINGS_VIEW');
        scope.drawingSubmitPermission = applicationManager.getConfigurationManager().checkUserPermission('IMPORT_LC_DRAWINGS_SUBMIT');
        scope.amendPermission = applicationManager.getConfigurationManager().checkUserPermission('IMPORT_LC_AMENDMENT_CREATE');
        if(scope.drawingViewPermission === true){
          this.view.btnTab3.setVisibility(true);
        }else {
          this.view.btnTab3.setVisibility(false);
        }
        if(scope.amendPermission === true){
          this.view.btnTab2.setVisibility(true);
        }else {
          this.view.btnTab2.setVisibility(false);
        }
        if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
          this.view.flxFooter.left = "-3%";
        }
        if (typeof this.serviceParameters === 'string') {
          this.serviceParameters = JSON.parse(this.serviceParameters);
        }
        if(typeof this.dataMapping === 'string'){
          this.dataMapping = JSON.parse(this.dataMapping);
        }
        scope.tabSelection = false;
        scope.view.imgNoTransaction.text = "error_yellow.png";
        if(scope.currentTab === "LetterOfCredits") {
          scope.view.lblNoTransaction.text = "No transactions available";
        } else {
          scope.view.lblNoTransaction.text = "There are no records to display";
        }
        scope.view.flxSegHeaderTab3.setVisibility(false);
        scope.view.imgError.src = "error_yellow.png";
        scope.view.lblNoData.text = "No Data Available";
        scope.view.imgFilterDropdown.src = "arrowdown_sm.png";
        scope.view.PaginationContainer.setPageSize(10);
        scope.serviceParameters.Transactions.Criteria.pageSize = "";
        scope.serviceParameters.Transactions.Criteria.pageOffset = "";
        scope.serviceParameters.Transactions.Criteria.filterByValue = "";
        scope.serviceParameters.Transactions.Criteria.filterByParam = "";
        scope.serviceParameters.Transactions.Criteria.timeValue = "";  
        scope.serviceParameters.Transactions.Criteria.timeParam = "";
        scope.view.tbxSearch.restrictCharactersSet = "~!@#$%^&*()_-\\?/+={[]}:;,.<>'`|\"";
        scope.businessController.setProperties(this.serviceParameters.Transactions, this.dataFormatting, this.breakpoints);
        if(scope.currentTab === "LetterOfCredits"){
          scope.fetchTransactions(this.serviceParameters.Transactions);
        }
        scope.businessController.getMetaDataForAllObjects();             
        scope.initButtonActions();
        scope.setTabNavigation();
        scope.initActionsofDateFields();
        scope.view.flxListDropdown.setVisibility(false);
        if (scope.createPermission === true && kony.application.getCurrentBreakpoint() === 640 && orientationHandler.isMobile) {
          this.view.btnCreateImportLCMb.setVisibility(true);
        }else{
          this.view.btnCreateImportLCMb.setVisibility(false);
        }
        scope.moreActionSegDataMapping();
        scope.view.imgFilterDropdown.src = "arrowdown_sm.png";
        scope.view.imgCoulmnTab1.src = "sortingfinal.png";
        scope.view.imgCoulmnTab2.src = "sortingfinal.png";
        scope.view.imgCoulmnTab3.src = "sortingfinal.png";
        scope.view.imgCoulmnTab4.src = "sortingfinal.png";
        scope.view.imgCoulmnTab5.src = "sortingfinal.png";
        scope.view.imgCoulmnTab6.src = "sortingfinal.png";
        scope.view.imgCoulmnTab7.src = "sortingfinal.png";
        scope.view.imgTab3Column1.src = "sortingfinal.png";
        scope.view.imgTab3Column2.src = "sortingfinal.png";
        scope.view.imgTab3Column3.src = "sortingfinal.png";
        scope.view.imgTab3Column4.src = "sortingfinal.png";
        scope.view.imgTab3Column5.src = "sortingfinal.png";
        scope.view.imgTab3Column6.src = "sortingfinal.png";
        scope.view.imgTab3Column7.src = "sortingfinal.png";
        scope.view.imgTab3Column2.setVisibility(true);
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "postShow",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
      * @api : initButtonActions
      * To set button actions
      * @return : NA
      */
    initButtonActions : function(){
      var scope = this;
      try{
        var data = "";
        scope.view.segCurrencyFilter.onRowClick = this.segRowClick.bind(this, this.view.segCurrencyFilter, this.view.lblSelectedCurrencyFilter, this.view.flxCurrencyFilterList, this.view.lblCurrencyFilterDropdownIcon);
        scope.view.segDurationFilter.onRowClick = this.segRowClick.bind(this, this.view.segDurationFilter, this.view.lblSelectedDurationFilter, this.view.flxDurationFilterList, this.view.lblDurationFilterDropdownIcon);
        scope.view.flxCurrencyFilterDropdown.onClick = this.toggleDropdown.bind(this,  scope.view.flxCurrencyFilterList, scope.view.lblCurrencyFilterDropdownIcon);
        scope.view.flxDurationFilterDropdown.onClick = this.toggleDropdown.bind(this,  scope.view.flxDurationFilterList, scope.view.lblDurationFilterDropdownIcon);
        scope.view.flxQuickLink2.onClick = this.toggleCreateNewAmendmentPopup.bind(this, true);
        scope.view.flxQuickLinkTablet2.onClick = this.toggleCreateNewAmendmentPopup.bind(this, true);
        popupObj.CreateNewAmendment.flxClose.onClick = this.toggleCreateNewAmendmentPopup.bind(this, false);
        popupObj.CreateNewAmendment.btnClose.onClick = this.viewLCDetails;
        popupObj.CreateNewAmendment.btnCopyDetails.onClick = this.createNewAmendment;
        scope.view.flxVerticalEllipsis.onClick = scope.moreActionOnClick.bind(this);
        scope.view.lblClose.text = "Copy & Create";
        scope.view.lblPopupText.text = "Are you sure you want to copy LC details and create new Import LC?";
        scope.view.btnAction1.text = scope.businessController.getDataBasedOnDataMapping("btnNoText", scope.dataMapping);
        scope.view.btnAction2.text = scope.businessController.getDataBasedOnDataMapping("btnYesText", scope.dataMapping);
        scope.view.tbxSearch.text = "";
        scope.view.imgClear.setVisibility(false);
        scope.view.tbxSearch.onTextChange = function() {
          if(scope.view.tbxSearch.text.length >0)
            scope.view.imgClear.setVisibility(true);
          else
            scope.view.imgClear.setVisibility(false);  
        };
        scope.view.tbxSearch.onTouchStart  = function() {
          if(scope.view.flxListDropdown.isVisible === true){
            scope.view.imgFilterDropdown.src = "arrowdown_sm.png";
            scope.view.flxListDropdown.setVisibility(false);
          }
        };
        scope.view.imgClear.onTouchEnd = function() {          
          scope.view.tbxSearch.text = "";
          scope.isSearchEnabled = false;
          scope.view.imgClear.setVisibility(false);
          scope.setTabNavigationServiceParameter();
        };
        if(!kony.sdk.isNullOrUndefined(scope.view.tbxSearch.text)){
          scope.view.imgClear.setVisibility(false);
        }
        scope.setFilterUIView();
        scope.view.flxDropDown.onClick = scope.onClickAllImports;
        scope.view.flxQuickLink1.onClick = scope.onActionClick.bind(scope, "btnCreateNewLC", data);
        scope.view.flxQuickLinkTablet1.onClick = scope.onActionClick.bind(scope, "btnCreateNewLC", data);
        scope.view.btnCreateImportLCMb.onClick = scope.onActionClick.bind(scope, "btnCreateNewLC", data);
        scope.view.btnApply.toolTip = "Apply";
        scope.view.btnCancel.toolTip = "Cancel";
        scope.view.tbxSearch.onDone = scope.getSearchData;
        scope.view.btnApply.onClick = scope.filterActions;
        //scope.view.btnCancel.onClick = scope.onFilterCancel.bind(this, "filterCancelAction");
        scope.view.btnCancel.onClick = scope.onFilterCancel;
        scope.view.btnTab1.onClick = scope.setTabData.bind(scope, "LetterOfCredits");
        scope.view.btnTab2.onClick = scope.setTabData.bind(scope, "Amendments");
        scope.view.btnTab3.onClick = scope.setTabData.bind(scope, "Drawings");
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "initButtonActions",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    /**
      * @api : fetchTransactions
      * To get meta data and get data from object model
      * @return : NA
      */
    fetchTransactions: function (serviceParameters) {
      var scope = this;
      try {
        if (serviceParameters) {
          scope.businessController.getMetaData(serviceParameters);
          scope.businessController.setProperties(serviceParameters, this.dataFormatting, this.breakpoints);
          if (serviceParameters.Verb === "generate" || serviceParameters.Verb === "generateImportLCAmendment") {
            scope.businessController.downloadTransactions(scope.context, fileName);
          }
          else if (serviceParameters.Verb === "generateImportAmendmentsList" || serviceParameters.Verb === "generateImportLetterOfCreditsList" || serviceParameters.Verb === "generateImportDrawingsList") {
            scope.businessController.getXLSXFile(fileName);
          } else {
            scope.businessController.fetchTransactions(scope.context);
          }
        }
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "fetchTransactions",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
      * @api : render
      * This method will be invoked when collection is updated to refresh UI
      * @return : NA
      */
    render: function () {
      var scope = this;
      try {
        let tempCollectionObj;
        if (typeof this.dataMapping === 'string') {
          this.dataMapping = JSON.parse(this.dataMapping);
        }
        if (typeof this.serviceParameters === 'string') {
          this.serviceParameters = JSON.parse(this.serviceParameters);
        }
        tempCollectionObj = ImportLCStore.getState();
        if (!tempCollectionObj.Collection.Transactions) {
          // tempCollectionObj.Collection.Transactions is undefined
          if (scope.currentTab === "Drawings") {
            this.fetchTransactions(this.serviceParameters.Drawings);
          }
          tempCollectionObj = scope.collectionObj;
        }
        scope.collectionObj = tempCollectionObj;
        scope.previousIndex = '';
        scope.previousFilterSelection = 0;
        scope.view.imgFilterDropdown.src = "arrowdown_sm.png";
        scope.view.flxListDropdown.setVisibility(false);
        if (scope.isSearchEnabled === false && scope.isFilterApplied === false) {
          if (popupObj.flxCreateNewAmendmentPopup.isVisible) {
            popupObj.CreateNewAmendment.setData(scope.collectionObj.Collection.Transactions, 'importLCAmendment');
            popupObj.CreateNewAmendment.flxSegDetails.height = "250dp";
          }
          else if (scope.currentTab === "LetterOfCredits" && scope.isChartRendered === false) {
            scope.initialCall = true;
            scope.isChartRendered = true;     
            scope.view.flxChartArea.removeAll();   
            scope.setRecentLCData();
            scope.initialiseColumnChart();
            scope.constructGraphData();
            scope.serviceParameters.Transactions.Criteria.pageSize = "11";
            scope.serviceParameters.Transactions.Criteria.pageOffset = "0";
            scope.serviceParameters.Transactions.Criteria.filterByValue = "";
            scope.serviceParameters.Transactions.Criteria.filterByParam = "";
            scope.serviceParameters.Transactions.Criteria.sortByParam = "lcCreatedOn";
            scope.serviceParameters.Transactions.Criteria.sortOrder = "DESC";
            scope.serviceParameters.Transactions.Criteria.timeValue = "6,MONTH";  
            scope.serviceParameters.Transactions.Criteria.timeParam = "lcCreatedOn";
            scope.fetchTransactions(this.serviceParameters.Transactions);
          }
          else if (scope.currentTab === "LetterOfCredits" && scope.isChartRendered === true && scope.initialCall === true) {
            scope.initialCall = false;
            scope.setDashboardUIData();
          }
          scope.setFilterRawData();
        }
        if (scope.collectionObj.Collection && scope.collectionObj.Collection.Transactions && scope.collectionObj.Collection.Transactions.length > 0) {
          scope.view.flxVerticalEllipsis.setVisibility(true);
        }
        else {
          scope.view.flxVerticalEllipsis.setVisibility(false);
        }
        if (!popupObj.flxCreateNewAmendmentPopup.isVisible) {
          scope.performDataMapping();
          scope.performUIActions();
          scope.showPaginationContainer();
          scope.widgetFilterActions();
          scope.view.forceLayout();
          scope.view.flxEllipsisList.setVisibility(false);
        }  
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "render",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    getSearchedRecords: function () {
      var scope = this;
      try {
        scope.serviceParameters.Transactions.Criteria.searchString = popupObj.CreateNewAmendment.txtSearchBox.text;
        scope.serviceParameters.Transactions.Criteria.filterByValue = OLBConstants.IMPORT_LC_STATUS.APPROVED;
        scope.serviceParameters.Transactions.Criteria.filterByParam = "status";
        scope.serviceParameters.Transactions.Criteria.sortByParam = "lcCreatedOn";
        scope.serviceParameters.Transactions.Criteria.sortOrder = "DESC";
        this.fetchTransactions(this.serviceParameters.Transactions);
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "getSearchedRecords",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    setRecentLCData: function () {
      var scope = this;
      try {
        let lcData = scope.collectionObj.Collection.Transactions;
        this.view.segRecentLC.widgetDataMap = {
          'lblKey1': 'lblKey1',
          'lblKey2': 'lblKey2',
          'lblKey3': 'lblKey3',
          'lblValue1': 'lblValue1',
          'lblValue2': 'lblValue2',
          'lblValue3': 'lblValue3',
          'btnAction': 'btnAction'
        };
        const recentLCData = (lcData && lcData.length > 0) ? lcData.slice(0, this.presenter.importLCConfig.recentLCLimit) : [];
        let segRecentLCData = [];
        for (const record of recentLCData) {
          segRecentLCData.push({
            'lblKey1': kony.i18n.getLocalizedString('i18n.TradeFinance.lcRefWithColon'),
            'lblKey2': kony.i18n.getLocalizedString('i18n.TradeFinance.BeneficiaryWithColon'),
            'lblKey3': kony.i18n.getLocalizedString('i18n.serviceRequests.Status:'),
            'lblValue1': record.lcReferenceNo || NA,
            'lblValue2': record.beneficiaryName || NA,
            'lblValue3': record.status || NA,
            'btnAction': {
              'text': kony.i18n.getLocalizedString('i18n.common.ViewDetails'),
              'toolTip': kony.i18n.getLocalizedString('i18n.common.ViewDetails'),
              'onClick': this.onActionClick.bind(this, "RecentLCViewDetails", record)
            }
          });
        }
        this.view.segRecentLC.setData(segRecentLCData);
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "setRecentLCData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    viewLCDetails: function () {
      var scope = this;
      try {
        const data = popupObj.CreateNewAmendment.getData();
        if (!data) return;
        this.toggleCreateNewAmendmentPopup(false);
        FormControllerUtility.showProgressBar(this.view);
        applicationManager.getNavigationManager().navigateTo({ appName: "TradeFinanceMA", friendlyName: "ImportLCUIModule/frmImportLCDetails" }, false, data);;
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "viewLCDetails",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    createNewAmendment: function () {
      var scope = this;
      try {
        const data = popupObj.CreateNewAmendment.getData();
        this.toggleCreateNewAmendmentPopup(false);
        FormControllerUtility.showProgressBar(this.view);
        applicationManager.getNavigationManager().navigateTo({ appName: "TradeFinanceMA", friendlyName: "ImportLCUIModule/frmImportLCAmend" }, false, data);
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "createNewAmendment",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    toggleCreateNewAmendmentPopup: function (visibility) {
      var scope = this;
      try {
        var form = kony.application.getCurrentForm(); 
        var breakpoint = kony.application.getCurrentBreakpoint();
        if (breakpoint > 640 && breakpoint <= 1024) {
          popupObj.flxCreateNewAmendmentContainer.width = "90%";
        } else if (breakpoint === 1366 || breakpoint === 1380){
          popupObj.flxCreateNewAmendmentContainer.width = "70%";
        }
        if (visibility) {
          form.add(popupObj);
        } else {
          form.remove(popupObj);
        }
        popupObj.isVisible = true;
        popupObj.height = "100%";
        popupObj.flxCreateNewAmendmentPopup.setVisibility(visibility);
        popupObj.flxCreateNewAmendmentContainer.height = "550dp";
        popupObj.flxCreateNewAmendmentPopup.top = "0dp";
        popupObj.flxCreateNewAmendmentPopup.left = "0dp";
        if (visibility) {
          popupObj.CreateNewAmendment.lblCopyDetails.text = kony.i18n.getLocalizedString("i18n.TradeFinance.CreateNewAmendment");
          popupObj.CreateNewAmendment.lblDescription.text = kony.i18n.getLocalizedString("i18n.TradeFinance.selectAnImportLCToCreateNewAmendment");
          popupObj.CreateNewAmendment.txtSearchBox.placeholder = kony.i18n.getLocalizedString("i18n.TradeFinance.importLCCreateNewAmendmentPlaceholder");
          popupObj.CreateNewAmendment.lblBeneficiary.text = kony.i18n.getLocalizedString("i18n.ExportLC.Applicant");
          popupObj.CreateNewAmendment.lblReference.text = kony.i18n.getLocalizedString("i18n.ImportLC.LCReference");
          popupObj.CreateNewAmendment.lblProduct.text = kony.i18n.getLocalizedString("i18n.ImportLC.LCType");
          popupObj.CreateNewAmendment.lblIssueDate.text = kony.i18n.getLocalizedString("i18n.TradeFinance.updatedOn");
          popupObj.CreateNewAmendment.btnClose.text = kony.i18n.getLocalizedString("i18n.common.ViewDetails");
          popupObj.CreateNewAmendment.btnCopyDetails.text = kony.i18n.getLocalizedString("i18n.enrollNow.Create");
          popupObj.CreateNewAmendment.lblNoTransaction.text = kony.i18n.getLocalizedString("i18n.TradeFinance.NoRecordErrMsg");
          popupObj.CreateNewAmendment.txtSearchBox.skin = "sknTextBoxSSP42424215PxNoBor";
          popupObj.CreateNewAmendment.txtSearchBox.text = "";
          popupObj.CreateNewAmendment.txtSearchBox.top = "0%";
          popupObj.CreateNewAmendment.txtSearchBox.height = "48dp";
          popupObj.CreateNewAmendment.flxSearchBox.skin = "ICSknFlxE3E3E3Bdr1PX";
          FormControllerUtility.disableButton(popupObj.CreateNewAmendment.btnCopyDetails);
          scope.serviceParameters.Transactions.Criteria.pageSize = "";
          scope.serviceParameters.Transactions.Criteria.pageOffset = "";
          scope.serviceParameters.Transactions.Criteria.filterByValue = "Approved";
          scope.serviceParameters.Transactions.Criteria.filterByParam = "status";
          scope.serviceParameters.Transactions.Criteria.sortByParam = "lcCreatedOn";
          scope.serviceParameters.Transactions.Criteria.sortOrder = "DESC";
          scope.serviceParameters.Transactions.Criteria.timeValue = "";
          scope.serviceParameters.Transactions.Criteria.timeParam = "";
          scope.fetchTransactions(this.serviceParameters.Transactions);
        }
        this.view.forceLayout();
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "toggleCreateNewAmendmentPopup",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    initialiseColumnChart: function () {
      const options = {
        title: '',
        height: 200,
        width: (kony.application.getCurrentBreakpoint() === 640) ? 380 : (kony.application.getCurrentBreakpoint() === 1024) ? 650 : 670,
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
      let importLCBarChart = new kony.ui.CustomWidget({
        "id": "ImportLCBarChart",
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
      this.view.flxChartArea.add(importLCBarChart);
    },
    constructGraphData: function () {
      try {
        var scope = this;
        let lcData = scope.collectionObj.Collection.Transactions;
        if (!lcData) return;
        const lcStatuses = {};
        scope_configManager.importLCChartData.forEach(x => { Object.values(x.LCStatus).forEach(y => lcStatuses[y] = x.DisplayStatus) });
        importLCGraphData = lcData.reduce(function (acc, obj) {
          let date = new Date(obj.lcCreatedOn).toDateString();
          obj.lcAmount = parseFloat(applicationManager.getFormatUtilManager().deFormatAmount((obj.lcAmount || '').replace(/[^0-9\.,-]+/g, "")) || 0);
          if (!acc[obj.lcCurrency]) acc[obj.lcCurrency] = {};
          if (!acc[obj.lcCurrency][date]) acc[obj.lcCurrency][date] = {};
          if (!acc[obj.lcCurrency][date][obj.paymentTerms]) acc[obj.lcCurrency][date][obj.paymentTerms] = {
            totalAmount: 0,
            utilizedAmount: 0
          };
          acc[obj.lcCurrency][date][obj.paymentTerms]['totalAmount'] += obj.lcAmount;
          acc[obj.lcCurrency][date][obj.paymentTerms]['utilizedAmount'] += parseFloat(obj.utilizedLCAmount || 0);
          if (!acc[obj.lcCurrency][date][lcStatuses[obj.status]]) acc[obj.lcCurrency][date][lcStatuses[obj.status]] = {
            count: 0,
            amount: 0
          };
          acc[obj.lcCurrency][date][lcStatuses[obj.status]]['count']++;
          acc[obj.lcCurrency][date][lcStatuses[obj.status]]['amount'] += obj.lcAmount;
          return acc;
        }, {});
        this.setGraphData();
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "constructGraphData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    setGraphData: function () {
      try {
        currencyCode = this.view.segCurrencyFilter.selectedRowItems[0].key;
        currencySymbol = this.presenter.configurationManager.getCurrency(currencyCode);
        duration = this.view.segDurationFilter.selectedRowItems[0].key;
        let filteredData = {};
        scope_configManager.lcPaymentTerms.forEach(x => filteredData[x.type] = { colorCode: x.colorCode, totalAmount: 0, utilizedAmount: 0 });
        let filteredSummary = scope_configManager.importLCChartData.reduce(function (acc, obj) {
          acc[obj.DisplayStatus] = { count: 0, amount: 0 };
          return acc;
        }, {});
        let graphData = [], date = new Date(), lcDate;
        for (let i = 0; i < duration; i++) {
          lcDate = date.toDateString();
          if (importLCGraphData[currencyCode] && importLCGraphData[currencyCode][lcDate]) {
            Object.keys(importLCGraphData[currencyCode][lcDate]).forEach(key => {
              if (filteredData[key]) {
                filteredData[key]['utilizedAmount'] += importLCGraphData[currencyCode][lcDate][key]['utilizedAmount'];
                filteredData[key]['totalAmount'] += importLCGraphData[currencyCode][lcDate][key]['totalAmount'];
              }
              if (filteredSummary[key]) {
                filteredSummary[key]['count'] += importLCGraphData[currencyCode][lcDate][key]['count'];
                filteredSummary[key]['amount'] += importLCGraphData[currencyCode][lcDate][key]['amount'];
              }
            });
          }
          date.setDate(date.getDate() - 1);
        }
        this.view.lblCount0 .text = `${filteredSummary['Pending Requests']['count']}`;
        this.view.lblStatusAmount0.text = `${currencySymbol} ${this.presenter.formatUtilManager.formatAmount(filteredSummary['Pending Requests']['amount'])}`;
        this.view.lblCount1.text = `${filteredSummary['Approved']['count']}`;
        this.view.lblStatusAmount1.text = `${currencySymbol} ${this.presenter.formatUtilManager.formatAmount(filteredSummary['Approved']['amount'])}`;
        this.view.lblCount2.text = `${filteredSummary['Settled']['count']}`;
        this.view.lblStatusAmount2.text = `${currencySymbol} ${this.presenter.formatUtilManager.formatAmount(filteredSummary['Settled']['amount'])}`;
        this.view.lblCount3.text = `${filteredSummary['Rejected']['count']}`;
        this.view.lblStatusAmount3.text = `${currencySymbol} ${this.presenter.formatUtilManager.formatAmount(filteredSummary['Rejected']['amount'])}`;
        for (let statusLabel = 0; statusLabel <= 3; statusLabel++) {
          if(this.view["lblStatusAmount" + statusLabel].text.length > 13) {
            this.view["lblStatusAmount" + statusLabel].skin = "bbSknLbl424242SSP15Px";
            this.view["lblStatusAmount" + statusLabel].top = "10px";
          }
        }
        for (const paymentTerms in filteredData) {
          let barData = {
            'categoryName': paymentTerms,
            'budget1': 0,
            'budget1ColorCode': filteredData[paymentTerms]['colorCode'],
            'budget1TooltipText': '',
            'budget2': 0,
            'budget2TooltipText': '',
            'budget2ColorCode': `color:${filteredData[paymentTerms]['colorCode']};opacity:0.5`,
            'budget3': -1,
            'budget3ColorCode': '',
            'budget3TooltipText': ''
          };
          if (filteredData[paymentTerms]) {
            barData.budget1 = filteredData[paymentTerms]['utilizedAmount'];
            barData.budget2 = filteredData[paymentTerms]['totalAmount'] - filteredData[paymentTerms]['utilizedAmount'];
          }
          const tooltipText = `${paymentTerms}\n`
            + `${kony.i18n.getLocalizedString('i18n.TradeFinance.totalLimit')}: ${currencySymbol}${formatter.format(filteredData[paymentTerms]['totalAmount'])}\n`
            + `${kony.i18n.getLocalizedString('i18n.TradeFinance.available')}: ${currencySymbol}${formatter.format(barData.budget2)}\n`
            + `${kony.i18n.getLocalizedString('i18n.TradeFinance.utilized')}: ${currencySymbol}${formatter.format(barData.budget1)}`;
          barData.budget1TooltipText = tooltipText;
          barData.budget2TooltipText = tooltipText;
          graphData.push(barData);
        }
        this.view.flxChartArea.ImportLCBarChart.chartData = graphData;
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "setGraphData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    setDropdownValues: function (segWidget, listValues, flxList, lblSelectedValue) {
      try {
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
        if (segWidget.id === 'segCurrencyFilter') {
          segWidget.selectedRowIndex = [0, 0];
          lblSelectedValue.text = segWidget.selectedRowItems[0].value;
          currencyCode = segWidget.selectedRowItems[0].key;
          currencySymbol = this.presenter.configurationManager.getCurrency(currencyCode);
        } else if (segWidget.id === 'segDurationFilter') {
          segWidget.selectedRowIndex = [0, 2];
          lblSelectedValue.text = segWidget.selectedRowItems[0].value;
          duration = segWidget.selectedRowItems[0].key;
        }
        flxList.height = (segmentData.length * 41 > 205) ? "205dp" : `${segmentData.length * 41}dp`;
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "setDropdownValues",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    toggleDropdown: function (flxSeg, lblIcon) {
      try {
        if (flxSeg.isVisible) {
          flxSeg.setVisibility(false);
          lblIcon.text = this.presenter.resourcesConstants.fontIcons.chevronDown;
        } else {
          flxSeg.setVisibility(true);
          lblIcon.text = this.presenter.resourcesConstants.fontIcons.chevronUp;
        }
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "toggleDropdown",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    segRowClick: function (segDropdown, lblSelectedValue, flxSegDropdown, lblDropdownIcon) {
      try {
        const selectedData = segDropdown.selectedRowItems[0];
        lblSelectedValue.text = selectedData.value;
        flxSegDropdown.setVisibility(false);
        lblDropdownIcon.text = this.presenter.resourcesConstants.fontIcons.chevronDown;
        if (segDropdown.id === 'segCurrencyFilter' || segDropdown.id === 'segDurationFilter') {
          this.setGraphData();
        }
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "segRowClick",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
      * @api : setDashboardUIData
      * prepares UI for Credit Details Screen
      * @return : NA
      */
    setDashboardUIData: function() {
      var scope = this;
      try {
        var collectionData = this.store.getState();
        var formatData = {
          "locale": "",
          "positiveFormat": "{CS}{D}",
          "negativeFormat": "-({CS}{D})",
          "fractionDigits": "2"
        };
        scope.collectionDataLength = Object.keys(collectionData.Collection).length;
        if (scope.collectionDataLength > 0 && (!kony.sdk.isNullOrUndefined(scope.collectionDataLength))) {
          this.view.lblImportOverview.text = scope.businessController.getDataBasedOnDataMapping("lblImportOverview", scope.dataMapping);
          //this.view.lblPendingImports.text = scope.businessController.getDataBasedOnDataMapping("lblPendingImports", scope.dataMapping);
          this.view.lblPendingImports.text = "Deleted Imports";
          this.view.lblPendingCount.text = scope.collectionObj.Collection.Transactions && scope.collectionObj.Collection.Transactions[0].deletedCount ? scope.collectionObj.Collection.Transactions[0].deletedCount : "0";
          this.view.lblPendingAmount.text = scope.collectionObj.Collection.Transactions && scope.collectionObj.Collection.Transactions[0].deletedAmount ? scope.formatUtil.formatAmountandAppendCurrencySymbol(scope.collectionObj.Collection.Transactions[0].deletedAmount, "USD", formatData, "").text : "$0.00";
          this.view.lblDraftImports.text = scope.businessController.getDataBasedOnDataMapping("lblDraftImports", scope.dataMapping);
          this.view.lblDraftCount.text = scope.collectionObj.Collection.Transactions && scope.collectionObj.Collection.Transactions[0].draftCount ? scope.collectionObj.Collection.Transactions[0].draftCount : "0"
          this.view.lblDraftAmount.text = scope.collectionObj.Collection.Transactions && scope.collectionObj.Collection.Transactions[0].draftAmount ? scope.formatUtil.formatAmountandAppendCurrencySymbol(scope.collectionObj.Collection.Transactions[0].draftAmount, "USD", formatData, "").text : "$0.00";
          // this.view.lblApprovedImports.text = scope.businessController.getDataBasedOnDataMapping("lblApprovedImports", scope.dataMapping);
          this.view.lblApprovedImports.text = "SelfApproved Imports";
          this.view.lblApprovedCount.text = scope.collectionObj.Collection.Transactions && scope.collectionObj.Collection.Transactions[0].selfApprovedCount ? scope.collectionObj.Collection.Transactions[0].selfApprovedCount : "0"
          this.view.lblApprovedAmount.text = scope.collectionObj.Collection.Transactions && scope.collectionObj.Collection.Transactions[0].selfApprovedAmount ? scope.formatUtil.formatAmountandAppendCurrencySymbol(scope.collectionObj.Collection.Transactions[0].selfApprovedAmount, "USD", formatData, "").text : "$0.00";
          this.view.lblTotalImports.text = scope.businessController.getDataBasedOnDataMapping("lblTotalImports", scope.dataMapping);
          this.view.lblTotalCount.text = scope.collectionObj.Collection.Transactions && scope.collectionObj.Collection.Transactions[0].totalCount ? scope.collectionObj.Collection.Transactions[0].totalCount : "0"
          this.view.lblTotalAmount.text = scope.collectionObj.Collection.Transactions && scope.collectionObj.Collection.Transactions[0].totalAmount ? scope.formatUtil.formatAmountandAppendCurrencySymbol(scope.collectionObj.Collection.Transactions[0].totalAmount, "USD", formatData, "").text : "$0.00";
          this.view.lblGraphTabName1.text = scope.businessController.getDataBasedOnDataMapping("lblGraphTabName1", scope.dataMapping);
          this.view.lblGraphTabName2.text = scope.businessController.getDataBasedOnDataMapping("lblGraphTabName2", scope.dataMapping);
          //Recent LC flex
          this.view.lblRecentLC.text = scope.businessController.getDataBasedOnDataMapping("lblRecentLC", scope.dataMapping);
          //ImportLC List flex
          this.view.btnTab1.text = scope.businessController.getDataBasedOnDataMapping("lblLetterOfCredits", scope.dataMapping);
          this.view.btnTab2.text = scope.businessController.getDataBasedOnDataMapping("lblAmendments", scope.dataMapping);
          this.view.btnTab3.text = scope.businessController.getDataBasedOnDataMapping("lblDrawings", scope.dataMapping);
          this.view.lblView.text = scope.businessController.getDataBasedOnDataMapping("lblView", scope.dataMapping)+":";
          if (scope.currentTab === "Drawings") {
            this.view.lblFilterText.text = scope.businessController.getDataBasedOnDataMapping("lblAllDrawings", scope.dataMapping);
          } else if (scope.currentTab === "Amendments") {
            this.view.lblFilterText.text = "All Amendments";
          } else {
            this.view.lblFilterText.text = kony.i18n.getLocalizedString("i18n.konybb.Common.All");
          }
          this.view.btnTab1.toolTip = kony.i18n.getLocalizedString("i18n.konybb.Common.All");
          this.view.btnTab2.toolTip = scope.businessController.getDataBasedOnDataMapping("lblAmendments", scope.dataMapping);
          this.view.btnTab3.toolTip = scope.businessController.getDataBasedOnDataMapping("lblDrawings", scope.dataMapping);
        }
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "setDashboardUIData",
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
    setTabData: function(tabName) {			 
      var scope = this;
      try {
        scope.currentTab = tabName;
        scope.tabSelection = true;
        scope.setTabNavigation();
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "setTabData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
      * @api : setTabNavigation
      * To set segment data for tab navigation
      * @return : NA
      */
    setTabNavigation: function() {
      var scope = this;
      scope.lowerLimit = 1;
      scope.view.PaginationContainer.setPageSize(10);
      this.view.btnTab2.setVisibility(true);
      if (typeof scope.dataMapping === 'string') {
        scope.dataMapping = JSON.parse(scope.dataMapping);
      }
      if (typeof this.serviceParameters === 'string') {
        this.serviceParameters = JSON.parse(this.serviceParameters);
      }
      try {
        if (this.currentTab === "LetterOfCredits") {
          scope.view.lblNoTransaction.text = "No transactions available";
          if (scope.createPermission === true && kony.application.getCurrentBreakpoint() === 640 && orientationHandler.isMobile) {
            this.view.btnCreateImportLCMb.setVisibility(true);
          }else{
            this.view.btnCreateImportLCMb.setVisibility(false);
          }
          if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile && this.view.btnCreateImportLCMb.isVisible === true) {
            this.view.imgClear.right = "33%";
          }else{
            this.view.imgClear.right = "1%";
          }
          this.view.btnTab1.skin = "ICSknBtnAccountSummarySelected2";
          this.view.btnTab2.skin = "ICSknBtnAccountSummaryUnselected2";
          this.view.btnTab3.skin = "ICSknBtnAccountSummaryUnselected2";
          //Setting tab header data
          this.view.flxSegHeaderTab2.setVisibility(false);
          this.view.flxSegHeaderTab3.setVisibility(false);
          this.view.flxSegHeaderTab1.setVisibility(true);
          if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
            this.view.flxSegHeaderTab2.setVisibility(false)
            this.view.flxSegHeaderTab1.setVisibility(false);
          }
          //Set search placeholder text
          this.view.tbxSearch.placeholder = kony.i18n.getLocalizedString("i18n.TradeFinance.searchForBeneficiaryLCRef");
          this.view.lblFilterText.text = scope.businessController.getDataBasedOnDataMapping("lblAllImports", scope.dataMapping);
          if (scope.tabSelection === true && scope.isSearchEnabled === false) {
            scope.view.tbxSearch.text = "";
            scope.view.imgClear.setVisibility(false);
            scope.serviceParameters.Transactions.Criteria.searchString = scope.view.tbxSearch.text;
          }
          if (scope.intitateFirst !== true) {
            this.serviceParameters.Transactions.Criteria.pageSize  = "11";
            this.serviceParameters.Transactions.Criteria.pageOffset  = "0";
            scope.serviceParameters.Transactions.Criteria.filterByValue = "";
            scope.serviceParameters.Transactions.Criteria.filterByParam = "";
            scope.serviceParameters.Transactions.Criteria.timeValue = "6,MONTH";
            scope.serviceParameters.Transactions.Criteria.timeParam = "lcCreatedOn";
            this.fetchTransactions(this.serviceParameters.Transactions);
          }          
          this.view.forceLayout();
        } else if (this.currentTab === "Drawings") {
          scope.view.lblNoTransaction.text = "There are no records to display";
          this.view.btnCreateImportLCMb.setVisibility(false);
          this.view.imgClear.right = "1%";
          if(scope.drawingViewPermission === true){
            if (scope.tabSelection === true && scope.isSearchEnabled === false) {
              scope.view.tbxSearch.text = "";
              scope.view.imgClear.setVisibility(false);
              scope.serviceParameters.Drawings.Criteria.searchString = scope.view.tbxSearch.text;
            }
            if (scope.intitateFirst !== true ||  scope.context.isDrawingsBack ||
                (!kony.sdk.isNullOrUndefined(scope.context.Drawings) && scope.context.Drawings.isDrawingsBack) ) {
              this.serviceParameters.Drawings.Criteria.pageSize  = "11";
              this.serviceParameters.Drawings.Criteria.pageOffset  = "0";
              scope.serviceParameters.Drawings.Criteria.filterByValue = "";
              scope.serviceParameters.Drawings.Criteria.filterByParam = "";
              scope.serviceParameters.Drawings.Criteria.timeValue = "6,MONTH";
              scope.serviceParameters.Drawings.Criteria.timeParam = "drawingCreationDate";
              this.fetchTransactions(this.serviceParameters.Drawings);
            }
            this.view.btnTab1.skin = "ICSknBtnAccountSummaryUnselected2";
            this.view.btnTab2.skin = "ICSknBtnAccountSummaryUnselected2";
            this.view.btnTab3.skin = "ICSknBtnAccountSummarySelected2";
            //Setting tab header data
            this.view.flxSegHeaderTab2.setVisibility(true)
            this.view.flxSegHeaderTab1.setVisibility(false);
            scope.view.flxSegHeaderTab3.setVisibility(false);
            if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
              this.view.flxSegHeaderTab2.setVisibility(false)
              this.view.flxSegHeaderTab1.setVisibility(false);
            }
            //Set search placeholder text
            if (kony.application.getCurrentBreakpoint() !== 640 && !orientationHandler.isMobile) {
              this.view.tbxSearch.placeholder = this.businessController.getDataBasedOnDataMapping("drawingsPlaceHolderText", this.dataMapping);
            } else {
              this.view.tbxSearch.placeholder = "Search for Beneficiary...";
            }
            this.view.lblFilterText.text = scope.businessController.getDataBasedOnDataMapping("lblAllDrawings", scope.dataMapping);
            if (scope.tabSelection === true && scope.isSearchEnabled === false) {
              scope.view.tbxSearch.text = "";
              scope.view.imgClear.setVisibility(false);
              scope.serviceParameters.Drawings.Criteria.searchString = scope.view.tbxSearch.text;
            }
          }else{
            this.view.btnTab3.setVisibility(false);
          }
          this.view.forceLayout();
        } else if(this.currentTab === "Amendments") {
          this.amendPermission = applicationManager.getConfigurationManager().checkUserPermission('IMPORT_LC_AMENDMENT_CREATE');
          this.view.lblNoTransaction.text = "There are no records to display";
          this.view.btnCreateImportLCMb.setVisibility(false);
          this.view.imgClear.right = "1%";
          if(this.amendPermission === true){
            if (scope.tabSelection === true && scope.isSearchEnabled === false) {
              scope.view.tbxSearch.text = "";
              scope.view.imgClear.setVisibility(false);
              scope.serviceParameters.Amendments.Criteria.searchString = scope.view.tbxSearch.text;
            }
            if (scope.intitateFirst !== true || scope.context.isAmendBackEvent || 
                (!kony.sdk.isNullOrUndefined(scope.context.Amend) && scope.context.Amend.isAmendBackEvent) ){
              scope.serviceParameters.Amendments.Criteria.pageSize = "11";
              scope.serviceParameters.Amendments.Criteria.pageOffset = "0";
              scope.serviceParameters.Amendments.Criteria.sortByParam = "amendmentDate";
              scope.serviceParameters.Amendments.Criteria.sortOrder = "DESC";
              scope.serviceParameters.Amendments.Criteria.filterByValue = "";
              scope.serviceParameters.Amendments.Criteria.filterByParam = "";
              scope.serviceParameters.Amendments.Criteria.timeValue = "6,MONTH";
              scope.serviceParameters.Amendments.Criteria.timeParam = "amendmentDate";
              scope.fetchTransactions(this.serviceParameters.Amendments);
            }
            this.view.btnTab1.skin = "ICSknBtnAccountSummaryUnselected2";
            this.view.btnTab2.skin = "ICSknBtnAccountSummarySelected2";
            this.view.btnTab3.skin = "ICSknBtnAccountSummaryUnselected2";
            this.view.flxSegHeaderTab3.setVisibility(true);
            this.view.flxSegHeaderTab1.setVisibility(false);
            this.view.flxSegHeaderTab2.setVisibility(false);
            this.view.lblFilterText.text = "All Amendments";
            this.view.tbxSearch.placeholder = kony.i18n.getLocalizedString("i18n.TradeFinance.searchForBeneficiaryAmendmentReferenceWithDots");
            //scope.view.lblNoTransaction.text = "No Amendments";
            if (scope.tabSelection === true && scope.isSearchEnabled === false) {
              scope.view.tbxSearch.text = "";
              scope.view.imgClear.setVisibility(false);
              scope.serviceParameters.Amendments.Criteria.searchString = scope.view.tbxSearch.text;
            }
          }
        }
        else {
          this.view.btnTab2.setVisibility(false);
        }
        this.setViewActions();
        this.setFilterRawData();
        this.getSegmentHeaderData(this.isNoRecordsAvailable);
        var rowTemplate = scope.getSegmentTemplate();
        this.view.segImportLCList.rowTemplate = rowTemplate.row;
        this.view.forceLayout();
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "setTabNavigation",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
      * @api : setFilterRawData
      * To set filter segment data
      * @return : NA
      */
    setFilterRawData : function(){
      var scope = this;
      try{
        scope.view.imgFilterDropdown.src = "arrowdown_sm.png";
        scope.view.flxListDropdown.setVisibility(false);
        scope.view.segLCAccountType.removeAll();
        scope.view.segLCStatusType.removeAll();
        scope.view.segTimePeriods.removeAll();
        scope.setSegLCAccountTypeFilterData();
        scope.setSegLCStatusTypeFilterData();
        scope.setSegTimePeriodsFilterData();
        scope.setImportFilterWidgetDataMap();
        scope.view.forceLayout();
      }catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setFilterRawData",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    /**
* @api : setFilterUIView
* To set filter view
* @return : NA
*/
    setFilterUIView : function(){
      var scope = this;
      try{
        scope.view.segLCAccountType.setVisibility(true);
        scope.view.segLCStatusType.setVisibility(true);
        scope.view.segTimePeriods.setVisibility(true);
        scope.view.flxFilter1Separator1.setVisibility(true);
        scope.view.flxFilter2Separator1.setVisibility(true);
        scope.view.flxFilter3Separator1.setVisibility(true);
        scope.view.imgFilter1Dropdown.src = "arrowup_sm.png";
        scope.view.imgFilter2Dropdown.src = "arrowup_sm.png";
        scope.view.imgFilter3Dropdown.src = "arrowup_sm.png";
        scope.view.forceLayout();
      }catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setFilterUIView",
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
    setFilterData : function(){
      var scope = this;
      try{
        this.view.lblAccountLCType.text = this.businessController.getDataBasedOnDataMapping("segLCAccountTypeHeader", this.dataMapping)+" ("+"Required"+")";
        this.view.imgFilter1Dropdown.src = "arrowup_sm.png";
        this.view.flxFilter1Dropdown.onClick = this.onActionClickFilterSegment.bind(this, "segLCAccountType", "imgFilter1Dropdown");
        this.view.lblStatusLCType.text = this.businessController.getDataBasedOnDataMapping("segLCStatusTypeHeader", this.dataMapping)+" ("+"Required"+")";
        this.view.imgFilter2Dropdown.src = "arrowup_sm.png";
        this.view.flxFilter2Dropdown.onClick = this.onActionClickFilterSegment.bind(this, "segLCStatusType", "imgFilter2Dropdown");
        //this.view.lblTimePeriodType.text = this.businessController.getDataBasedOnDataMapping("segTimePeriodsHeader", this.dataMapping);
        this.view.lblTimePeriodType.text = "Time Period";
        this.view.imgFilter3Dropdown.src = "arrowup_sm.png";
        this.view.flxFilter3Dropdown.onClick = this.onActionClickFilterSegment.bind(this, "segTimePeriods", "imgFilter3Dropdown");
      }catch(err){
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setFilterData",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    /**
      * @api : setViewActions
      * Set the default actions for component
      * @return : NAthis.view.segImportLCList
      */
    setViewActions: function() {
      var scope = this;
      try {
        var imageName = "";
        if (scope.currentTab === "LetterOfCredits") {
          imageName = "flxColumn";
        } else if(scope.currentTab === "Drawings"){
          imageName = "flxTab2Column";
        }else if(scope.currentTab === "Amendments"){
          imageName = "flxTab3Column";
        }
        this.view[imageName + 1].onClick = this.sortRecords.bind(this, 1);
        this.view[imageName + 2].onClick = this.sortRecords.bind(this, 2);
        this.view[imageName + 3].onClick = this.sortRecords.bind(this, 3);
        this.view[imageName + 4].onClick = this.sortRecords.bind(this, 4);
        this.view[imageName + 5].onClick = this.sortRecords.bind(this, 5);
        this.view[imageName + 6].onClick = this.sortRecords.bind(this, 6);
        this.view[imageName + 7].onClick = this.sortRecords.bind(this, 7);
        this.selectedTab = 1;
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "setViewActions",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    performDataMapping: function() {
      var scope = this;
      try {
        var segArray = [];
        var dataMapping = this.dataMapping;
        var conditionalDataMapping = this.conditionalMapping;
        for (key in dataMapping) {
          if (key === "segments") {
            var widgets = dataMapping[key];
            for (key in widgets) {
              var widgetId = key;
              var segmentData = scope.getSegmentDataFromMapping(widgets[widgetId], conditionalDataMapping[widgetId], widgetId);
              this.segData = JSON.parse(JSON.stringify(segmentData));
              var paginatedSegment = segmentData;
              if(this.isSearchEnabled === false && this.isFilterApplied === false){
                if(segmentData.length >10){
                  var segData = paginatedSegment.pop();
                }
              }
              scope.view[widgetId].removeAll();
              scope.view[widgetId].setData(segmentData);
            }
          }
        }
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "performDataMapping",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
      * @api : performUIActions
      * This method will do ui changes and actions to be taken before rendering view
      * @return : NA
      */
    
    performUIActions : function() {
      var scope = this;
      try{
        this.segRecords = this.view.segImportLCList.data;
        var recordsLength = this.segRecords.length;
        if(recordsLength > 0){
          if(scope.sortApplied !== true){
            if(scope.currentTab === "LetterOfCredits"){
              this.view.imgCoulmnTab3.src= "sorting_next.png";
            }else if(scope.currentTab === "Drawings"){
              this.view.imgTab2Column4.src= "sorting_next.png";
            }else if(scope.currentTab === "Amendments"){
              this.view.imgTab3Column3.src= "sorting_next.png";
            }
          }
          this.view.flxPagination.setVisibility(true);
          this.isNoRecordsAvailable = true;
          this.view.flxNoTransactions.setVisibility(false);
          this.view.segImportLCList.setVisibility(true);
          this.setSegmentWidgetDataMap();
          this.view.segImportLCList.removeAll();
          this.view.segImportLCList.setData(this.segRecords);
          this.view.forceLayout();
        }else {
          if(scope.sortApplied !== true){
            if(scope.currentTab === "LetterOfCredits")
              this.view.imgCoulmnTab3.src = "sorting_final.png";
            else if(scope.currentTab === "Drawings")
              this.view.imgTab2Column4 = "sorting_final.png";  
            else if(scope.currentTab === "Amendments")
              this.view.imgTab3Column3 = "sorting_final.png";  
          }
          this.view.flxPagination.setVisibility(false);
          this.isNoRecordsAvailable = false;
          this.view.segImportLCList.setVisibility(false);
          this.view.flxNoTransactions.setVisibility(true);          
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "performUIActions",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    /**
      * @api : setTabNavigationServiceParameter
      * This method will set service parameters for current tab
      * @return : Array
      */
    setTabNavigationServiceParameter: function(){
      var scope = this;
      try{
        if(scope.currentTab === "LetterOfCredits"){
          scope.serviceParameters.Transactions.Criteria.searchString = "";
          this.fetchTransactions(this.serviceParameters.Transactions);
        }else if(scope.currentTab === "Drawings"){
          scope.serviceParameters.Drawings.Criteria.searchString = "";
          this.fetchTransactions(this.serviceParameters.Drawings);
        }else if(scope.currentTab === "Amendments"){
          scope.serviceParameters.Amendments.Criteria.searchString = "";
          this.fetchTransactions(this.serviceParameters.Amendments);
        }
      }catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setTabNavigationServiceParameter",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    
    /**
         * @api : getSegmentDataFromMapping
         * This method will return the segement data from data mapping property
         * @return : Array
         */
    getSegmentDataFromMapping: function(segDataJSON, conditionalMapping, segId) {
      var scope = this;
      try {
        var segData = [];
        var segRecord = "";
        var segMasterDataToken = segDataJSON.segmentMasterData;
        segMasterDataToken = segMasterDataToken.split(".");
        if (segMasterDataToken[0].indexOf("Collection") != -1) {
          var segMasterData = [];
          var key;
          key = "Transactions";
          if (this.collectionObj.Collection[key]) {
            segMasterData = this.collectionObj.Collection[key];
          }
          if (segMasterData.length > 0) {
            this.totalRecords = segMasterData.length;
          }
          segMasterData.map(function(record) {
            if (scope.currentTab === "LetterOfCredits") {
              segRecord = JSON.parse(JSON.stringify(segDataJSON.letterOfCredits));
            } else if (scope.currentTab === "Drawings") {
              segRecord = JSON.parse(JSON.stringify(segDataJSON.drawings));
            } else if (scope.currentTab === "Amendments") {
              segRecord = JSON.parse(JSON.stringify(segDataJSON.amendments));
            }
            for (key in segRecord) {
              segRecord[key] = scope.getFieldValueFromMapping(key, segRecord[key], conditionalMapping, record);
            }
            segRecord = scope.getUIMappings(segRecord, record, segId);
            var incoTermsKey = record.incoTerms;
            if (!kony.sdk.isNullOrUndefined(incoTermsKey)) {
              incoTermsKey = incoTermsKey.toUpperCase();
              var incoTermsValue = scope.businessController.getDataBasedOnDataMapping(incoTermsKey, scope.dataMapping);
              record.incoTerms = incoTermsValue;
            }
            var currentBreakpoint = kony.application.getCurrentBreakpoint();
            if (currentBreakpoint === 640 || currentBreakpoint === 1024) {
              segRecord["btnPrint"] = scope.getFieldValueFromMapping("btnPrint", scope.segUIMapping.segImportLCList["btnPrint"], {}, record);
            } else {
              segRecord["btnPrint"] = scope.getFieldValueFromMapping("btnPrint", scope.segUIMapping.segImportLCList["btnPrint"], {}, record);
            }
            if (currentBreakpoint === 1024 && scope.currentTab === "Amendmnets") {
              segRecord["btnPrint"] = scope.getFieldValueFromMapping("btnPrint", scope.segUIMapping.segImportLCList["btnPrint"], {}, record);
            }
            if (record.status === "Draft") {
              if (scope.createPermission === true && scope.currentTab === "LetterOfCredits") {
                segRecord["btnAction"] = scope.getFieldValueFromMapping("btnContinueEditing", scope.segUIMapping.segImportLCList["btnContinueEditing"], {}, record);
                segRecord["btnCreateNewLC"] = scope.getFieldValueFromMapping("btnCreateNewLCOFF", scope.segUIMapping.segImportLCList["btnCreateNewLCOFF"], {}, record);
              } else {
                segRecord["btnAction"] = scope.getFieldValueFromMapping("btnAction", scope.segUIMapping.segImportLCList["btnAction"], {}, record);
                segRecord["btnCreateNewLC"] = scope.getFieldValueFromMapping("btnCreateNewLCOFF", scope.segUIMapping.segImportLCList["btnCreateNewLCOFF"], {}, record);
              }
            } else if (record.status === "Deleted" || scope.currentTab === "Drawings") {
              segRecord["btnAction"] = scope.getFieldValueFromMapping("btnAction", scope.segUIMapping.segImportLCList["btnAction"], {}, record);
              segRecord["btnCreateNewLC"] = scope.getFieldValueFromMapping("btnCreateNewLCOFF", scope.segUIMapping.segImportLCList["btnCreateNewLCOFF"], {}, record);
            } else if (scope.currentTab === "Amendments") {
              segRecord["btnAction"] = scope.getFieldValueFromMapping("btnAction", scope.segUIMapping.segImportLCList["btnAction"], {}, record);
              segRecord["btnCreateNewLC"] = scope.getFieldValueFromMapping("btnCreateNewLCOFF", scope.segUIMapping.segImportLCList["btnCreateNewLCOFF"], {}, record);
            } else {
              segRecord["btnAction"] = scope.getFieldValueFromMapping("btnAction", scope.segUIMapping.segImportLCList["btnAction"], {}, record);
              segRecord["btnCreateNewLC"] = scope.getFieldValueFromMapping("btnCreateNewLC", scope.segUIMapping.segImportLCList["btnCreateNewLC"], {}, record);
            }
            if (this.currentTab === "Amendments") {
              segRecord["btnAction"].setEnabled(false);
              //segRecord["btnPrint"].setEnabled(false);
              segRecord["btnDownload"].setEnabled(false);
            }
            segData.push(segRecord);
          });
        }
        return segData;
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "getSegmentDataFromMapping",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
      * @api : getSegmentHeaderData
      * Returns the data in collection using data mapping and conditional data mapping
      * @return : String
      */
    getSegmentHeaderData: function(isNoRecordsAvailable) {
      var scope = this;
      try {
        var columnHeaderData = {};
        var segmentHeaderData = [];
        this.emptyObject = {};
        var buttonUIName = "";
        var imageUIName = "";
        if(scope.currentTab === "LetterOfCredits"){
          columnHeaderData = this.dataMapping.segmentHeader.default;
          buttonUIName = "btnCoulmnTab";
          imageUIName = "imgCoulmnTab";
        }else if(scope.currentTab === "Drawings"){
          columnHeaderData = this.dataMapping.segmentHeader.drawings;
          buttonUIName = "btnTab2Column";
          imageUIName = "imgTab2Column";
        } 
        else if(scope.currentTab === "Amendments"){
          columnHeaderData = this.dataMapping.segmentHeader.amendments;
          buttonUIName = "btnTab3Column";
          imageUIName = "imgTab3Column";
        } 
        for (var i = 1; i <= 7; i++) {
          this.view[buttonUIName + i].text = this.getDisplayText(columnHeaderData["column" + i].text);
          this.view[imageUIName + i].setVisibility = columnHeaderData["column" + i].isSortable;
          if(isNoRecordsAvailable === false){
            this.view[imageUIName + i].src = "sortingfinal.png";
          }
          if (columnHeaderData["column" + i].isSortable) {
            this.sortFields["column" + i] = columnHeaderData["column" + i].sortField;
          } else {
            this.sortFields["column" + i] = "";
          }
        }
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "getSegmentHeaderData",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
      * @api : initActionsofDateFields
      * Gets invoked on date field
      * @return : NA
      */
    initActionsofDateFields: function() {
      var scope = this;
      this.view.StartDateInput.tbxDateInputKA.onDone = this.checkDate.bind(this, this.view.StartDateInput.tbxDateInputKA, "", "tbxIssueDate");
      this.view.EndDateInput.tbxDateInputKA.onDone = this.checkDate.bind(this, this.view.EndDateInput.tbxDateInputKA, "", "tbxExpiryDate");
    },
    /**
         * @api : checkdate
         * vchecking whether the entered date is valid or not
         * @return : NA */
    checkDate: function(widgetName, errLabel, widgetPropertyName) {
      var dateArr = widgetName.text.split("/");
      var month = parseInt(dateArr[0]);
      if (month > 12) {
        widgetName.skin = "ICSknTextBoxEE0005";
        this.view.btnApply.skin = "ICSknbtnDisablede2e9f036px";   
        this.view.btnApply.setEnabled(false);
        return;
      }
      var date = parseInt(dateArr[1]);
      if (date > 31) {
        widgetName.skin = "ICSknTextBoxEE0005";
        this.view.btnApply.skin = "ICSknbtnDisablede2e9f036px";
        this.view.btnApply.setEnabled(false);
        return;
      }
      if (Date.parse(this.view.StartDateInput.tbxDateInputKA.text) > Date.parse(this.view.EndDateInput.tbxDateInputKA.text)) {
        this.view.StartDateInput.tbxDateInputKA.skin = "ICSknTextBoxEE0005";
        this.view.EndDateInput.tbxDateInputKA.skin = "ICSknTextBoxEE0005";
        this.view.btnApply.skin = "ICSknbtnDisablede2e9f036px";
        this.view.btnApply.setEnabled(false);
        return;
      }	
      if ((this.view.StartDateInput.tbxDateInputKA.text === "") && (this.view.EndDateInput.tbxDateInputKA.text === "")) {
        this.view.btnApply.skin = "ICSknbtnDisablede2e9f036px";
        this.view.btnApply.setEnabled(false);
      }			
      // widgetName.skin = "skntbxSSP42424215pxnoborder"; 
      widgetName.skin = "sknTxtSSP15pxBorder727272Op201px";	
      this.view.btnApply.skin = "ICSknbtnEnabed003e7536px";	
      this.view.btnApply.setEnabled(true);			
    },
    /**
      * @api : onClickAllImports
      * Gets invoked on dropdownonClick
      * @return : NA
      */
    onClickAllImports: function() {
      var scope = this;
      this.filterByValue = "";
      this.filterByParam = "";
      try {
        if (this.view.imgFilterDropdown.src === "arrowdown_sm.png") {                   
          this.view.imgFilterDropdown.src = "arrowup_sm.png";          
          this.view.flxListDropdown.setVisibility(true);
        } else {                    
          this.view.imgFilterDropdown.src = "arrowdown_sm.png";
          this.view.flxListDropdown.setVisibility(false);
          this.onFilterCancel();
        }
        this.view.forceLayout();
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "onClickAllImports",
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
      var searchString = this.view.tbxSearch.text;
      this.lowerLimit = 1;
      scope.view.PaginationContainer.setPageSize(10);
      if (searchString !== null && searchString !== undefined) {
        this.isSearchEnabled = true;
        if(scope.currentTab === "LetterOfCredits"){
          this.serviceParameters.Transactions.Criteria.pageSize  = "11";
          this.serviceParameters.Transactions.Criteria.pageOffset  = "0";
          this.serviceParameters.Transactions.Criteria.searchString = searchString;
          this.fetchTransactions(this.serviceParameters.Transactions);
        }else if(scope.currentTab === "Drawings"){          
          this.serviceParameters.Drawings.Criteria.pageSize  = "11";
          this.serviceParameters.Drawings.Criteria.pageOffset  = "0";
          this.serviceParameters.Drawings.Criteria.searchString = searchString;
          this.fetchTransactions(this.serviceParameters.Drawings);
        }
        else if(scope.currentTab === "Amendments"){          
          this.serviceParameters.Amendments.Criteria.pageSize  = "11";
          this.serviceParameters.Amendments.Criteria.pageOffset  = "0";
          this.serviceParameters.Amendments.Criteria.searchString = searchString;
          this.fetchTransactions(this.serviceParameters.Amendments);
        }
      } else {
        this.isSearchEnabled = false;
      }
    },
    /**
      * @api : setFilterWidgetDataMap
      * Maps widgetdata to segments
      * @return : NA
      */
    setImportFilterWidgetDataMap: function() {
      var scope = this;
      this.view.segLCAccountType.widgetDataMap = {
        "lblLCAccountType": "lblLCAccountType",
        "lblLCCheckbox": "lblLCCheckbox",
        "flxLCAccountType": "flxLCAccountType"
      };
      this.view.segLCStatusType.widgetDataMap = {
        "lblStatusType": "lblStatusType",
        "lblLCCheckbox": "lblLCCheckbox",
        "flxStatus": "flxStatus"
      };
      this.view.segTimePeriods.widgetDataMap = {
        "lblFeatureName": "lblFeatureName",
        "lblLCCheckbox": "lblLCCheckbox",
        "flxLCTimePeriodRow": "flxLCTimePeriodRow"
      };
    },
    /**
      * @api : setDataSegLCAccountTypeFilter
      * Setting segmentdata
      * @return : NA
      */
    setSegLCAccountTypeFilterData: function(){		
      var scope = this;
      let { SIGHT, DEFERRED, ACCEPTANCE, NEGOTIATION_SIGHT, NEGOTIATION_ACCEPTANCE } = OLBConstants.LC_PAYMENT_TERM;
      var segLCAccountType = [
        {
          lblLCAccountType: { text: scope.businessController.getDataBasedOnDataMapping("segLCAccountValue1", scope.dataMapping), isVisible: true },
          lblLCCheckbox: { text: "C", isVisible: true },
          flxLCAccountType: { onClick: this.filterRowOnClick.bind(this, "segLCAccountType", "selectAll") }
        }, {
          lblLCAccountType: {/*text:scope.businessController.getDataBasedOnDataMapping("segLCAccountValue2", scope.dataMapping),*/ text: SIGHT, isVisible: true },
          lblLCCheckbox: { text: "C", isVisible: true },
          flxLCAccountType: { onClick: this.filterRowOnClick.bind(this, "segLCAccountType", "widgetLabel") }
        }, {
          lblLCAccountType: {/*text:scope.businessController.getDataBasedOnDataMapping("segLCAccountValue3", scope.dataMapping),*/ text: DEFERRED, isVisible: true },
          lblLCCheckbox: { text: "C", isVisible: true },
          flxLCAccountType: { onClick: this.filterRowOnClick.bind(this, "segLCAccountType", "widgetLabel") }
        }, {
          lblLCAccountType: {/*text:scope.businessController.getDataBasedOnDataMapping("segLCAccountValue4", scope.dataMapping),*/ text: ACCEPTANCE, isVisible: true },
          lblLCCheckbox: { text: "C", isVisible: true },
          flxLCAccountType: { onClick: this.filterRowOnClick.bind(this, "segLCAccountType", "widgetLabel") }
        }, {
          lblLCAccountType: {/*text:scope.businessController.getDataBasedOnDataMapping("segLCAccountValue5", scope.dataMapping),*/ text: NEGOTIATION_SIGHT, isVisible: true },
          lblLCCheckbox: { text: "C", isVisible: true },
          flxLCAccountType: { onClick: this.filterRowOnClick.bind(this, "segLCAccountType", "widgetLabel") }
        }, {
          lblLCAccountType: {/*text:scope.businessController.getDataBasedOnDataMapping("segLCAccountValue6", scope.dataMapping),*/ text: NEGOTIATION_ACCEPTANCE, isVisible: true },
          lblLCCheckbox: { text: "C", isVisible: true },
          flxLCAccountType: { onClick: this.filterRowOnClick.bind(this, "segLCAccountType", "widgetLabel") }
        }];
      this.view.lblAccountLCType.text = this.businessController.getDataBasedOnDataMapping("segLCAccountTypeHeader", this.dataMapping)+" ("+"Required"+")";
      scope.segLCAccountType = segLCAccountType;
      scope.view.segLCAccountType.removeAll();
      scope.view.segLCAccountType.setData(segLCAccountType);
      scope.view.forceLayout();
    },  
    /**
      * @api : setSegLCStatusTypeFilterData
      * Setting segmentdata
      * @return : NA
      */
    setSegLCStatusTypeFilterData: function(){
      var scope = this;
      var segLCStatusTypeData = [];
      if(scope.currentTab === "LetterOfCredits"){
        segLCStatusTypeData=[
          {lblStatusType:{text:scope.businessController.getDataBasedOnDataMapping("segLCStatusTypeSectionValue1", scope.dataMapping), isVisible:true},
           lblLCCheckbox:{text:"C", isVisible:true},
           flxStatus:{onClick:this.filterRowOnClick.bind(this, "segLCStatusType", "selectAll")}
          },{lblStatusType:{text: OLBConstants.IMPORT_LC_STATUS.DRAFT, isVisible:true},
             lblLCCheckbox:{text:"C", isVisible:true},
             flxStatus:{onClick:this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")}
            },{lblStatusType:{text: OLBConstants.IMPORT_LC_STATUS.APPROVED, isVisible:true},
               lblLCCheckbox:{text:"C", isVisible:true},
               flxStatus:{onClick:this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")}
              },{lblStatusType:{text: OLBConstants.IMPORT_LC_STATUS.REJECTED, isVisible:true},
                 lblLCCheckbox:{text:"C", isVisible:true},
                 flxStatus:{onClick:this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")}
                },{lblStatusType:{text: OLBConstants.IMPORT_LC_STATUS.SUBMITTED_TO_BANK, isVisible:true},
                lblLCCheckbox:{text:"C", isVisible:true},
                flxStatus:{onClick:this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")}
               },{lblStatusType:{text: OLBConstants.IMPORT_LC_STATUS.PROCESSING_BY_BANK, isVisible:true},
               lblLCCheckbox:{text:"C", isVisible:true},
               flxStatus:{onClick:this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")}
              },{lblStatusType:{text: OLBConstants.IMPORT_LC_STATUS.CANCELLED, isVisible:true},
              lblLCCheckbox:{text:"C", isVisible:true},
              flxStatus:{onClick:this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")}
             },{lblStatusType:{text: OLBConstants.IMPORT_LC_STATUS.RETURNED_BY_BANK, isVisible:true},
             lblLCCheckbox:{text:"C", isVisible:true},
             flxStatus:{onClick:this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")}
            },{lblStatusType:{text: OLBConstants.IMPORT_LC_STATUS.PARTIALLY_SETTLED, isVisible:true},
            lblLCCheckbox:{text:"C", isVisible:true},
            flxStatus:{onClick:this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")}
           },{lblStatusType:{text: OLBConstants.IMPORT_LC_STATUS.CLOSED, isVisible:true},
           lblLCCheckbox:{text:"C", isVisible:true},
           flxStatus:{onClick:this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")}
          }];
      } else if (scope.currentTab === "Drawings") {
        segLCStatusTypeData = [
          {
            lblStatusType: { text: scope.businessController.getDataBasedOnDataMapping("segLCStatusTypeSectionValue1", scope.dataMapping), isVisible: true },
            lblLCCheckbox: { text: "C", isVisible: true },
            flxStatus: { onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "selectAll") }
          }, {
            lblStatusType: { text: OLBConstants.IMPORT_DRAWINGS_STATUS.NEW, isVisible: true },
            lblLCCheckbox: { text: "C", isVisible: true },
            flxStatus: { onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel") }
          }, {
            lblStatusType: { text: OLBConstants.IMPORT_DRAWINGS_STATUS.SUBMITTED_TO_BANK, isVisible: true },
            lblLCCheckbox: { text: "C", isVisible: true },
            flxStatus: { onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel") }
          }, {
            lblStatusType: { text: OLBConstants.IMPORT_DRAWINGS_STATUS.PROCESSING_BY_BANK, isVisible: true },
            lblLCCheckbox: { text: "C", isVisible: true },
            flxStatus: { onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel") }
          }, {
            lblStatusType: { text: OLBConstants.IMPORT_DRAWINGS_STATUS.REJECTED, isVisible: true },
            lblLCCheckbox: { text: "C", isVisible: true },
            flxStatus: { onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel") }
          }, {
            lblStatusType: { text: OLBConstants.IMPORT_DRAWINGS_STATUS.SETTLED, isVisible: true },
            lblLCCheckbox: { text: "C", isVisible: true },
            flxStatus: { onClick: this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel") }
          }];
      }
      else if(scope.currentTab === "Amendments") {
        segLCStatusTypeData=[
          {lblStatusType:{text:scope.businessController.getDataBasedOnDataMapping("segLCStatusTypeSectionValue1", scope.dataMapping), isVisible:true},
           lblLCCheckbox:{text:"C", isVisible:true},
           flxStatus:{onClick:this.filterRowOnClick.bind(this, "segLCStatusType", "selectAll")}
          },{lblStatusType:{text: OLBConstants.IMPORT_AMENDMENT_STATUS.REJECTED, isVisible:true},
             lblLCCheckbox:{text:"C", isVisible:true},
             flxStatus:{onClick:this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")}
            },{lblStatusType:{text: OLBConstants.IMPORT_AMENDMENT_STATUS.SUBMITTED_TO_BANK, isVisible:true},
               lblLCCheckbox:{text:"C", isVisible:true},
               flxStatus:{onClick:this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")}
              },{lblStatusType:{text: OLBConstants.IMPORT_AMENDMENT_STATUS.APPROVED, isVisible:true},
                 lblLCCheckbox:{text:"C", isVisible:true},
                 flxStatus:{onClick:this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")}
                }, {lblStatusType:{text: OLBConstants.IMPORT_AMENDMENT_STATUS.PROCESSING_BY_BANK, isVisible:true},
                lblLCCheckbox:{text:"C", isVisible:true},
                flxStatus:{onClick:this.filterRowOnClick.bind(this, "segLCStatusType", "widgetLabel")}
               }];
      }
      scope.segLCStatusType = segLCStatusTypeData;
      scope.view.segLCStatusType.removeAll();
      scope.view.segLCStatusType.setData(segLCStatusTypeData);
      scope.view.forceLayout();
    },
    /**
      * @api : setSegTimePeriodsFilterData
      * Setting segmentdata
      * @return : NA
      */
    setSegTimePeriodsFilterData: function(){
      var scope = this;
      var segTimePeriodsData=[
        {lblFeatureName:{/*text:scope.businessController.getDataBasedOnDataMapping("segTimePeriodsValue1", scope.dataMapping),*/ text: "Last six months", isVisible:true},
         lblLCCheckbox:{text:"M",skin: "ICSknLblRadioBtnSelectedFontIcon003e7520px", isVisible:true},
         flxLCTimePeriodRow:{onClick:this.filterRowOnClick.bind(this, "segTimePeriods", "TimePeriod")}
        },{lblFeatureName:{/*text:scope.businessController.getDataBasedOnDataMapping("segTimePeriodsValue2", scope.dataMapping),*/ text: "Today", isVisible:true},
           lblLCCheckbox:{text:"L",skin: "sknLblOlbFontIconsA0A0A020Px", isVisible:true},
           flxLCTimePeriodRow:{onClick:this.filterRowOnClick.bind(this, "segTimePeriods", "TimePeriod")}
          },{lblFeatureName:{text:scope.businessController.getDataBasedOnDataMapping("segTimePeriodsValue3", scope.dataMapping), isVisible:true},
             lblLCCheckbox:{text:"L",skin: "sknLblOlbFontIconsA0A0A020Px", isVisible:true},
             flxLCTimePeriodRow:{onClick:this.filterRowOnClick.bind(this, "segTimePeriods", "TimePeriod")}
            },{lblFeatureName:{text:scope.businessController.getDataBasedOnDataMapping("segTimePeriodsValue4", scope.dataMapping), isVisible:true},
               lblLCCheckbox:{text:"L",skin: "sknLblOlbFontIconsA0A0A020Px", isVisible:true},
               flxLCTimePeriodRow:{onClick:this.filterRowOnClick.bind(this, "segTimePeriods", "TimePeriod")}
              }];
      scope.segTimePeriods = segTimePeriodsData;
      scope.view.segTimePeriods.removeAll();
      scope.view.segTimePeriods.setData(segTimePeriodsData);
      scope.view.forceLayout();
    }, 
    /**
      * @api : onActionClickFilterSegment
      * Invoked on dropdown click on filter
      * @return : NA
      */
    onActionClickFilterSegment: function(segmentName, imageName) {
      var scopeObj = this;
      try {
        if (this.view[imageName].src === "arrowup_sm.png") {          
          this.view[segmentName].setVisibility(false);
          if (segmentName === "segLCAccountType") {
            this.view.flxFilter1Separator1.setVisibility(false);
          } if (segmentName === "segLCStatusType") {
            this.view.flxFilter2Separator1.setVisibility(false);
          } if (segmentName === "segTimePeriods") {
            this.view.flxFilter3Separator1.setVisibility(false);
            this.view.flxBottomSeparator.setVisibility(true);
          }
          this.view[imageName].src = "arrowdown_sm.png";
        } else {          
          this.view[segmentName].setVisibility(true);
          if (segmentName === "segLCAccountType") {
            this.view.flxFilter1Separator1.setVisibility(true);
          } if (segmentName === "segLCStatusType") {
            this.view.flxFilter2Separator1.setVisibility(true);
          } if (segmentName === "segTimePeriods") {
            this.view.flxFilter3Separator1.setVisibility(true);
            this.view.flxBottomSeparator.setVisibility(false);
          }
          this.view[imageName].src = "arrowup_sm.png";
        }
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "onActionClickFilterSegment",
          "error": err
        };
        scopeObj.onError(errorObj);
      }
    },
    /**
      * @api : getFieldValueFromMapping
      * Returns the data in collection using data mapping and conditional data mapping
      * @return : String
      */
    getFieldValueFromMapping : function(widget, fieldMapping, conditionalMapping, record) {
      var scope = this;
      try{
        var conditionalfieldMapping;
        if(conditionalMapping){
          var conditionalMappingKey = this.conditionalMappingKey;
          if(conditionalMapping[record[conditionalMappingKey]] != undefined){
            conditionalfieldMapping = conditionalMapping[record[conditionalMappingKey]][widget]; 
          }
        }
        if(conditionalfieldMapping) {
          fieldMapping = conditionalfieldMapping;
        }
        if (typeof fieldMapping === "string") {
          if (fieldMapping.indexOf("$") !== -1) {
            if (fieldMapping.indexOf("${i18n") !== -1) {
              return this.geti18nText(fieldMapping);
            } else {
              fieldMapping = fieldMapping.split(".");
              fieldMapping = fieldMapping[fieldMapping.length - 1].replace("}", "");
              var recordData = record[fieldMapping];
              if(recordData === undefined){
                recordData = "-";
              }
              return recordData;
            }
          } else {
            return fieldMapping;
          }
        } else if (typeof fieldMapping === "object") {
          var keys = Object.keys(fieldMapping);
          if(JSON.stringify(keys).indexOf("BP1") != -1 || JSON.stringify(keys).indexOf("BP2") != -1 || JSON.stringify(keys).indexOf("BP3") != -1){
            var fieldValue = this.getBreakpointBasedValue(fieldMapping, kony.application.getCurrentBreakpoint());
            return this.getFieldValueFromMapping(widget, fieldValue, {}, record);
          }else{
            for(key in fieldMapping){
              if(typeof fieldMapping[key] === "string"){
                if(fieldMapping[key].indexOf("${") !== -1){
                  fieldMapping[key] = this.getFieldValueFromMapping(widget, fieldMapping[key], {}, record);
                } 
              }
            } 
          }
          return fieldMapping;
        }
      }catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "getFieldValueFromMapping",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    /**
      * @api : getUIMappings
      * This method will do ui mapping and return the segment record
      * @return : {JSON}
      */
    getUIMappings : function(segRecord, record, segId) { 
      var scope = this;
      try{
        var segUIMappings = this.segUIMapping[segId];
        for(key in segUIMappings) {
          segRecord[key] = this.getFieldValueFromMapping(key, segUIMappings[key], this.segUIConditionalMapping[segId], record);
        }
        return segRecord;
      }catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "getUIMappings",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    getBreakpointBasedValue : function(contractJSON, currbreakpoint) {
      var scope = this;
      try{
        var value; 
        var breakPointConfig = this._breakpoints;
        currbreakpoint = JSON.stringify(currbreakpoint);
        Object.keys(breakPointConfig).find(function(key){
          if(breakPointConfig[key] === currbreakpoint){
            value = contractJSON[key];
          }
        });
        if(value ===  undefined){
          return contractJSON["default"]
        }
        return value;
      }catch(err){
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "getUIMappings",
              "error": err
            };
        scope.onError(errorObj);
      }
    },  
    /**
         * @api : onActionClick
         * Triggerd on click of action button in segment
         * @return : NA
         */
    onActionClick: function(id, data) {
      var scopeObj = this;
      let isSwiftEnabled = scope_configManager.swiftEnabled === 'True';
      try {
        if (id.text === "Copy & Create New LC") {
          id = id.text;
          data = this.collectionObj.Cache.Transactions.LetterOfCredits[data.rowIndex];
          delete data["srmsReqOrderID"];
          data["isCopyDetail"] = true;
        } else if (id.text === "Continue Editing") {
          id = id.text;
          data = this.collectionObj.Cache.Transactions.LetterOfCredits[data.rowIndex];
        } else if (id.text === "Print") {
          id = id.text;
          if (this.currentTab === "LetterOfCredits") {
            data = this.collectionObj.Collection.Transactions[data.rowIndex];
            data["isLetterOfCreditsPrint"] = true;
            if(isSwiftEnabled)
            data["isSwiftFormatPrint"] = true;
	        //this code is for visibility of swift codes in print UI 
            //if(!scope_configManager.swiftEnabled)
            //data["isSwiftFormatPrintWithoutCode"] = true;
            data["dashboardForm"] = true;
          } else if (this.currentTab === "Drawings") {
            data["drawingsSrmsReqOrderID"] = this.collectionObj.Collection.Transactions[data.rowIndex].drawingsSrmsReqOrderID;
            data["isDrawingsPrint"] = true;
            data["dashboardForm"] = true;
          } else{
            var collectionData = this.collectionObj.Collection.Transactions;
            data = collectionData[data.rowIndex];
            data["Tab"] = "Amendments";
          }
        } else if (id === "btnCreateNewLC" || id === "RecentLCViewDetails") {
          id = id;
        } else {
          id = id.text;	
          var collectionData = this.collectionObj.Collection.Transactions;
          data = collectionData[data.rowIndex];
          if(this.currentTab === "Amendments") 
            data["Tab"] = "Amendments";
          else if(this.currentTab === "LetterOfCredits") 
            data["Tab"] = "LetterOfCredits";
          else 
            data["Tab"] = "Drawings";
          data["drawingSubmitPermission"] = this.drawingSubmitPermission;
        }
        scopeObj.contextualActionButtonOnClick(id, data);

      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "onActionClick",
          "error": err
        };
        scopeObj.onError(errorObj);
      }
    },
    /**
         * @api : onDownloadAction
         * Triggerd on click of download button in segment
         * @return : NA
         */
    onDownloadAction: function(id, data) {
      var scope = this;
      try{
        var selectedData = '';
        if(scope.currentTab === "LetterOfCredits"){
          selectedData = scope.collectionObj.Collection.Transactions[data.rowIndex]["srmsReqOrderID"];
          this.serviceParameters.DownloadLOC.Criteria.srmsReqOrderID = selectedData;
          fileName = "Import Letter Of Credit";
          this.fetchTransactions(this.serviceParameters.DownloadLOC);
        }else if(scope.currentTab === "Drawings"){
          selectedData = scope.collectionObj.Collection.Transactions[data.rowIndex]["drawingsSrmsReqOrderID"];
          this.serviceParameters.DownloadDrawings.Criteria.drawingsSrmsReqOrderID = selectedData;
          fileName = "Import Drawing";
          this.fetchTransactions(this.serviceParameters.DownloadDrawings);
        }
        else if(scope.currentTab === "Amendments"){
          selectedData = scope.collectionObj.Collection.Transactions[data.rowIndex]["amendmentReference"];
          this.serviceParameters.DownloadAmendments.Criteria.amendmentReference = selectedData;
          fileName = "Import Amendment";
          this.fetchTransactions(this.serviceParameters.DownloadAmendments);
        }
      }catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "onDownloadAction",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    /**
      * @api : invokePrintScreen
      * Triggerd on click of action print in segment
      * @return : NA
      */
    invokePrintScreen: function(){
      var scope = this;
      this.invokePrint();
    },
    /**
      * @api : showCopyAndCreateNewLCPopup
      * Triggerd on click of button copy&CreateLC
      * @return : NA
      */
    showCopyAndCreateNewLCPopup: function(id, data) {
      var scope = this;       
      var form = kony.application.getCurrentForm();      
      var popupObj = this.view.flxPopup.clone();
      form.add(popupObj);
      popupObj.isVisible = true;
      popupObj.flxClosePopup.setVisibility(true);
      popupObj.top = "0dp";
      popupObj.left = "0dp";
      popupObj.height = "100%";
      popupObj.flxClosePopup.centerY = "50%";
      popupObj.flxClosePopup.flxClose.onClick = function() {
        form.remove(popupObj);
      };
      popupObj.flxClosePopup.btnAction1.onClick = function() {
        popupObj.flxClosePopup.setVisibility(false);
        form.remove(popupObj);
      };
      popupObj.flxClosePopup.btnAction2.onClick = function() {
        popupObj.flxClosePopup.setVisibility(false);
        form.remove(popupObj);
        scope.onActionClick(id, data);
      };     
      this.view.forceLayout();
    },
    getContextBtnWidth : function(record){
      var btnVisible = 1;
      for(var i = 2; i <= 4 ; i++){
        if(record["btnDetails" + i].isVisible){
          ++btnVisible;
        }
      }
      var width = 100 / btnVisible;
      for(var i = 1; i <= 4 ; i++){
        if(record["btnDetails" + i].isVisible){
          if(i != 1){
            record["lblSeparatorLineActions1" + i-1] = {isVisible : true}; 
          }
          record["btnDetails" + i]["width"] = width + "%";
        }
      }
      return record;
    },    
    showPaginationContainer: function() {
      var scope = this;
      try {
        if (scope.collectionDataLength > 0) {
          this.view.PaginationContainer.setVisibility(true);
          this.view.PaginationContainer.setLowerLimit(this.lowerLimit);
          if(scope.currentTab === "LetterOfCredits"){
            this.view.PaginationContainer.setPageHeader(this.geti18nText("${i18n{i18n.ImportLC.Imports}}"));
          }else if(scope.currentTab === "Drawings"){
            this.view.PaginationContainer.setPageHeader("Drawings");
          }
          else if(scope.currentTab === "Amendments") {
            this.view.PaginationContainer.setPageHeader("Amendments");
          }
          this.view.PaginationContainer.setIntervalHeaderForBulkpayments();
          this.view.PaginationContainer.setServiceDelegate(this.updateSegmentData);
          this.updatePaginationContainerUI(this.segData);
          if (this.segRecords.length === this.view.PaginationContainer.getPageSize() + 1) {
            this.segRecords.pop();
          }
          this.view.PaginationContainer.flxPagination.width = "300dp";
        } else {
          this.view.PaginationContainer.setVisibility(false);
        }
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "showPaginationContainer",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    updateSegmentData: function() {
      var scope = this;
      var pageOffSet = this.view.PaginationContainer.getPageOffset();
      var pageSize = this.view.PaginationContainer.getPageSize();
      if (pageOffSet === 0) {
        this.lowerLimit = 1;
      } else {
        if (pageOffSet < 0) {
          this.lowerLimit = pageSize - 20;
        } else {
          this.lowerLimit = pageOffSet + 1;
        }
      }
      if (this.lowerLimit === 0) {
        this.lowerLimit = 1;
      }
      if(scope.currentTab === "LetterOfCredits"){
        this.serviceParameters.Transactions.Criteria.pageOffset = "" + (Math.abs(pageOffSet));
        this.fetchTransactions(this.serviceParameters.Transactions);
      }else if(scope.currentTab === "Drawings"){
        this.serviceParameters.Drawings.Criteria.pageOffset = "" + (Math.abs(pageOffSet));
        this.fetchTransactions(this.serviceParameters.Drawings);
      }else if(scope.currentTab === "Amendments"){
        this.serviceParameters.Amendments.Criteria.pageOffset = "" + (Math.abs(pageOffSet));
        this.fetchTransactions(this.serviceParameters.Amendments);
      }
    },
    updatePaginationContainerUI: function(responseData) {
      var scope = this;
      try {
        scope.intitateFirst = false;
        var pageOffSet = this.view.PaginationContainer.getPageOffset();
        var pageSize = this.view.PaginationContainer.getPageSize();
        var isMaxLimitReached = responseData.length <= this.view.PaginationContainer.getPageSize();
        this.view.PaginationContainer.setIsMaxLimitReached(isMaxLimitReached);
        this.view.PaginationContainer.updateUI();
        this.view.flxPagination.PaginationContainer.imgPaginationPrevious.imageScaleMode = constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS;
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "updatePaginationContainerUI",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
      * @api : geti18nText
       * This method is used get the i18n text
       * return String
       */
    geti18nText : function(text) {
      var i18ntext = text.substring(text.indexOf("${i18n")+7,text.length-2)
      return kony.i18n.getLocalizedString(i18ntext);
    },
    /**
      * @api : getDisplayText
       * This method is used to get display text
       * return String
       */
    getDisplayText : function(text) {
      if(text.indexOf("${i18n") !== -1){
        return this.geti18nText(text);
      }
      return text;
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
        if(scope.currentTab === "LetterOfCredits"){
          imageName = "imgCoulmnTab";
        }else if(scope.currentTab === "Drawings"){
          imageName = "imgTab2Column";
        }else if(scope.currentTab === "Amendments"){
          imageName = "imgTab3Column";
        }
        var field = this.sortFields["column" + columnNo];	
        if(columnNo === 6 && this.currentTab === "Amendments"){
          field = "amendStatus";
        } 
        if (this.view[imageName + columnNo].src === "sortingfinal.png") {
          this.view[imageName + columnNo].src = "sorting_previous.png";
          sortType = "DESC";
        } else if (this.view[imageName + columnNo].src === "sorting_previous.png") {
          this.view[imageName + columnNo].src = "sorting_next.png";
          sortType = "ASC";
        } else {
          this.view[imageName + columnNo].src = "sorting_previous.png";
          sortType = "DESC";
        }
        for(var i=1; i<=7; i++){
          if(i !== columnNo){
            this.view[imageName + i].src = "sortingfinal.png";
          }
        }				
        var storeKey = "Transactions";
        if(this.currentTab === "LetterOfCredits"){
          this.serviceParameters.Transactions.Criteria.sortByParam = field;
          this.serviceParameters.Transactions.Criteria.sortOrder = sortType;
          this.fetchTransactions(this.serviceParameters.Transactions);
        }else if(this.currentTab === "Drawings"){
          this.serviceParameters.Drawings.Criteria.sortByParam = field;
          this.serviceParameters.Drawings.Criteria.sortOrder = sortType;
          this.fetchTransactions(this.serviceParameters.Drawings);
        }else if(this.currentTab === "Amendments"){
          this.serviceParameters.Amendments.Criteria.sortByParam = field;
          this.serviceParameters.Amendments.Criteria.sortOrder = sortType;
          this.fetchTransactions(this.serviceParameters.Amendments);
        }
        //this.businessController.sortData(field, sortType, storeKey);
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "sortRecords",
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
    onSegmentRowToggle: function() {
      var scopeObj = this;
      try {
        var index = scopeObj.view.segImportLCList.selectedRowIndex;
        var sectionIndex = index[0];
        var rowIndex = index[1];
        var data = scopeObj.view.segImportLCList.data;
        var rowData = data[rowIndex];
        scopeObj.rowData = rowData;
        var section = data.length;
        var segTemplate = this.getSegmentTemplate();
        if (data[rowIndex].template !== segTemplate.expanded) {
          if(this.previousIndex !== null && this.previousIndex !== undefined && this.previousIndex !== ""){
            data[this.previousIndex].template = segTemplate.row;
            data[this.previousIndex].imgDropdown = {
              image: "arrow_down.png"
            };
            scopeObj.view.segImportLCList.setDataAt(data[this.previousIndex], this.previousIndex, sectionIndex);
          }
          data[rowIndex].imgDropdown = {
            image: "chevron_up.png"
          };
          data[rowIndex].template = segTemplate.expanded;
          this.previousIndex = JSON.parse(JSON.stringify(rowIndex));
          scopeObj.view.segImportLCList.setDataAt(data[rowIndex], rowIndex, sectionIndex);
        } else {
          data[rowIndex].imgDropdown = {
            image: "arrow_down.png"
          };
          data[rowIndex].template = segTemplate.row;
          scopeObj.view.segImportLCList.setDataAt(data[rowIndex], rowIndex, sectionIndex);
        }
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "getUIMappings",
          "error": err
        };
        scopeObj.onError(errorObj);
      }
    },
    /**
      * @api : setSegmentWidgetDataMap
      * This method will set the widget data map for segImportLCList segment
      * @return : NA
      */
    setSegmentWidgetDataMap : function() {
      this.view.segImportLCList.widgetDataMap = {
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
        "btnPrint": "btnPrint"
      };
    },
    /**
         * @api : filterRowOnClick
         * This metod will invoked on onRowClick of filters
         * @return : NA
         **/
    filterRowOnClick: function(segName, widgetName) {
      var scope = this;
      try {
        var statusTypeCount = 0;
        var lcTypeCount = 0;
        this.view.flxCustomDateRange.setVisibility(false);
        var segmentdata = this.view[segName].data;
        var rowData = this.view[segName].selectedRowItems;
        var index = this.view[segName].selectedRowIndex;
        var sectionIndex = index[0];
        var rowIndex = index[1];
        var timePeriodCurrentImage = "";
        if (segName === "segLCAccountType" || segName === "segLCStatusType") {
          if (segmentdata[rowIndex].lblLCCheckbox.text === "D") {
            segmentdata[rowIndex].lblLCCheckbox.text = "C";
            if (rowIndex != 0) {
              segmentdata[0].lblLCCheckbox.text = "D";
            }
          } else {
            segmentdata[rowIndex].lblLCCheckbox.text = "D";
            if (rowIndex != 0) {
              segmentdata[0].lblLCCheckbox.text = "D";
            }
          }
        } else {
          if (rowIndex === this.previousFilterSelection) {
            segmentdata[rowIndex].lblLCCheckbox.text = "L";
            segmentdata[rowIndex].lblLCCheckbox.skin = "sknLblOlbFontIconsA0A0A020Px";
            segmentdata[this.previousFilterSelection].lblLCCheckbox.text = "M";
            segmentdata[this.previousFilterSelection].lblLCCheckbox.skin = "ICSknLblRadioBtnSelectedFontIcon003e7520px";
            this.previousFilterSelection = rowIndex;
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
            this.view.flxCustomDateRange.setVisibility(false);
          } else {
            this.view.flxCustomDateRange.setVisibility(true);
          }
        }
        if (widgetName === "selectAll") {
          for (var i = 0; i < segmentdata.length; i++) {
            segmentdata[i].lblLCCheckbox.text = segmentdata[rowIndex].lblLCCheckbox.text;
          }
        }
        // this.view[segName].removeAll();
        this.view[segName].setData(segmentdata);
        this.view.forceLayout();
        if(widgetName !== "TimePeriod"){
          var lcTypeData = this.view.segLCAccountType.data;
          for (var i = 0; i < lcTypeData.length; i++) {
            if (lcTypeData[i].lblLCCheckbox.text === "C") {
              lcTypeCount++;
              if (lcTypeCount === 5) {
                lcTypeData[0].lblLCCheckbox.text = "C";
                this.view.segLCAccountType.removeAll();
                this.view.segLCAccountType.setData(lcTypeData);
              }
            }
          }
          var statusTypeData = this.view.segLCStatusType.data;
          for (var i = 0; i < statusTypeData.length; i++) {
            if (statusTypeData[i].lblLCCheckbox.text === "C") {
              statusTypeCount++;
              if (statusTypeCount === 3) {
                statusTypeData[0].lblLCCheckbox.text = "C";
                this.view.segLCStatusType.removeAll();
                this.view.segLCStatusType.setData(statusTypeData);
              }
            }
          }
          if (lcTypeCount >= 1 && statusTypeCount >= 1) {
            this.view.btnApply.onClick = this.filterActions;
            this.view.btnApply.skin = "ICSknbtnEnabed003e7536px";
            this.view.btnApply.setEnabled(true);
          } else {
            this.view.btnApply.skin = "ICSknbtnDisablede2e9f036px";
            this.view.btnApply.setEnabled(false);
          }
        }
        // this.view[segName].removeAll();
        this.view[segName].setData(segmentdata);
        this.view.forceLayout();
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "filterRowOnClick",
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
      var lcTypeSegment = this.view.segLCAccountType.data;	
      var statusTypeSegment = this.view.segLCStatusType.data;
      var timePeriodSegment = this.view.segTimePeriods.data;	
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
      this.view.segLCAccountType.setData(lcTypeSegment);
      this.view.segLCStatusType.setData(statusTypeSegment);
      this.view.segTimePeriods.setData(timePeriodSegment);
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
        if (this.currentTab === "LetterOfCredits") {
          selectedFilterString = scope.serviceParameters.Transactions.Criteria.filterByValue;
          selectedTimePeriodFilter = scope.serviceParameters.Transactions.Criteria.timeValue;
        }else if(this.currentTab === "Drawings"){
          selectedFilterString = scope.serviceParameters.Drawings.Criteria.filterByValue;
          selectedTimePeriodFilter = scope.serviceParameters.Drawings.Criteria.timeValue;
        }    
        else if(this.currentTab === "Amendments"){
          selectedFilterString = scope.serviceParameters.Amendments.Criteria.filterByValue;
          selectedTimePeriodFilter = scope.serviceParameters.Amendments.Criteria.timeValue;
        } 
        var segemntListArray = ['segLCAccountType', 'segLCStatusType', 'segTimePeriods'];
        var selectedFilterArray = selectedFilterString.split(",");

        if (selectedFilterArray[0] !== null && selectedFilterArray[0] !== undefined && selectedFilterArray[0] !== "") {
          for (var i = 0; i < selectedFilterArray.length; i++) {
            for (var j = 0; j < this.view.segLCAccountType.data.length; j++) {
              var accountTypeFilterSegment = this.view.segLCAccountType.data;
              if (accountTypeFilterSegment[j].lblLCAccountType.text === selectedFilterArray[i]) {
                accountTypeCount++;
                accountTypeFilterSegment[j].lblLCCheckbox.text = "C";
                if (accountTypeCount === 5) {
                  accountTypeFilterSegment[0].lblLCCheckbox.text = "C";
                }
              }
            }
          }
          this.view.segLCAccountType.removeAll();
          this.view.segLCAccountType.setData(accountTypeFilterSegment);
          this.view.forceLayout();
          for (var i = 0; i < selectedFilterArray.length; i++) {
            for (var j = 0; j < this.view.segLCStatusType.data.length; j++) {
              var statusTypeFilterSegment = this.view.segLCStatusType.data;
              if (statusTypeFilterSegment[j].lblStatusType.text === selectedFilterArray[i]) {
                statusTypeCount++;
                statusTypeFilterSegment[j].lblLCCheckbox.text = "C";
                if (statusTypeCount === 3) {
                  statusTypeFilterSegment[0].lblLCCheckbox.text = "C";
                }
              }
            }
          }
          this.view.segLCStatusType.removeAll();
          this.view.segLCStatusType.setData(statusTypeFilterSegment);
          this.view.forceLayout();
          for (var i = 0; i < this.view.segTimePeriods.data.length; i++) {
            var timePeriodSegment = this.view.segTimePeriods.data;
            switch (timePeriodSegment[i].lblFeatureName.text) {
              case "Last six months":
                timeParamValue = "6,MONTH";
                break;
              case "Today":
                timeParamValue = "1,DAY";
                break;
              case "Last one month":
                timeParamValue = "1,MONTH";
                break;
              case "Last one year":
                timeParamValue = "1,YEAR";
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
          this.view.segTimePeriods.removeAll();
          this.view.segTimePeriods.setData(timePeriodSegment);
          this.view.forceLayout();
        } else {
          var accountTypeFilterSegment = this.view.segLCAccountType.data;
          for (var i = 0; i < accountTypeFilterSegment.length; i++) {
            accountTypeFilterSegment[i].lblLCCheckbox.text = "C";
          }
          this.view.segLCAccountType.removeAll();
          this.view.segLCAccountType.setData(accountTypeFilterSegment);
          var statusTypeFilterSegment = this.view.segLCStatusType.data;
          for (var i = 0; i < statusTypeFilterSegment.length; i++) {
            statusTypeFilterSegment[i].lblLCCheckbox.text = "C";
          }
          this.view.segLCStatusType.removeAll();
          this.view.segLCStatusType.setData(statusTypeFilterSegment);
          var timePeriodSegment = this.view.segTimePeriods.data;
          timePeriodSegment[0].lblLCCheckbox.text = "M";
          timePeriodSegment[0].lblLCCheckbox.skin = "ICSknLblRadioBtnSelectedFontIcon003e7520px";			
          this.view.segTimePeriods.removeAll();
          this.view.segTimePeriods.setData(timePeriodSegment);
          this.view.forceLayout();
        }
        this.view.flxListDropdown.setVisibility(false);
        this.view.imgFilterDropdown.src = "arrowdown_sm.png";
        this.setDefaultValueForDownloadCriteria();
      } catch (err) {
        var errorObj =
            {
              "level": "ComponentController",
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
      try {
        this.downloadXLSXData = {
          "searchString": "",
          "pageSize": "10",
          "pageOffset": 0,
          "sortByParam": "",
          "sortOrder": "",
          "timeParam": "",
          "timeValue": "",
          "filterByValue": "",
          "filterByParam": ""
        };
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "onFilterActions",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
      * @api : onFilterActions
      * This metod will invoked on click of apply filters
      * @return : NA
    */
    filterActions: function() {
      var scope = this;
      try {
        var param = "";
        var timeParam = "";
        var LCType = this.view.segLCAccountType.data;
        var statusType = this.view.segLCStatusType.data;
        var timePeriod = this.view.segTimePeriods.data;
        let selectedFilterCount = 0;
        for (var i = 0; i < LCType.length; i++) {
          if (LCType[i].lblLCCheckbox.text === "C" && LCType[i].lblLCAccountType.text !== "Select All") {
            if(scope.currentTab === "LetterOfCredits" || scope.currentTab === "Amendments"){
              param = "paymentTerms";
            }else{
              param = "lcType";
            }             
            this.filterByValue = this.filterByValue + "," + LCType[i].lblLCAccountType.text;
            this.filterByParam = this.filterByParam + "," + param;
            selectedFilterCount++;
          }
        }
        for (var i = 0; i < statusType.length; i++) {
          if (statusType[i].lblLCCheckbox.text === "C" && statusType[i].lblStatusType.text !== "Select All") {
            if (this.currentTab === "Amendments") {
              param = "amendStatus"
            } else param = "status";
            this.filterByValue = this.filterByValue + "," + statusType[i].lblStatusType.text;
            this.filterByParam = this.filterByParam + "," + param;
            selectedFilterCount++;
          }
        }
        for (var i = 0; i < timePeriod.length; i++) {
          if (timePeriod[i].lblLCCheckbox.text === "M") {
            if(scope.currentTab === "LetterOfCredits"){
              timeParam = "lcCreatedOn";
            }else if(scope.currentTab === "Drawings"){
              timeParam = "drawingCreationDate";
            }else if(scope.currentTab === "Amendments"){
              timeParam = "amendmentDate";
            }
            var timeParamValue = "";
            switch (timePeriod[i].lblFeatureName.text) {
              case "Last six months":
                timeParamValue = "6,MONTH";
                break;
              case "Today":
                timeParamValue = "1,DAY";
                break;
              case "Last one month":
                timeParamValue = "1,MONTH";
                break;
              case "Last one year":
                timeParamValue = "1,YEAR";
                break;
              default:
                timeParam = ""
                timeParamValue = "";
                break;
            }
            selectedFilterCount++;
          }
        }
        this.isFilterApplied = true;
        var currentService = "";
        if(this.currentTab === "LetterOfCredits"){
          currentService = "Transactions";
        }else if(this.currentTab === "Drawings"){
          currentService = "Drawings";
        }else if(this.currentTab === "Amendments"){
          currentService = "Amendments";
        }
        if (LCType[0].lblLCCheckbox.text === "C" && statusType[0].lblLCCheckbox.text === "C") {
          scope.view.lblFilterText.text = kony.i18n.getLocalizedString("i18n.konybb.Common.All");
        } else {
          scope.view.lblFilterText.text = kony.i18n.getLocalizedString("i18n.ProfileManagement.Selected") + "(" + selectedFilterCount + ")";
        }
        this.lowerLimit = 1;
        scope.view.PaginationContainer.setPageSize(10);
        this.serviceParameters[currentService].Criteria.timeValue = timeParamValue;
        this.serviceParameters[currentService].Criteria.timeParam = timeParam;
        this.serviceParameters[currentService].Criteria.pageSize  = "11";
        this.serviceParameters[currentService].Criteria.pageOffset  = "0";
        this.serviceParameters[currentService].Criteria.filterByValue = this.filterByValue.substring(1, this.filterByValue.length);
        this.serviceParameters[currentService].Criteria.filterByParam = this.filterByParam.substring(1, this.filterByParam.length);
        this.serviceParameters[currentService].Criteria.fromDateFilter = (this.view.StartDateInput.tbxDateInputKA.text).split('/').reverse().join('-');
        this.serviceParameters[currentService].Criteria.toDateFilter = (this.view.EndDateInput.tbxDateInputKA.text).split('/').reverse().join('-');
        this.downloadXLSXData =  this.serviceParameters[currentService].Criteria;
        this.onClickAllImports();
        this.fetchTransactions(this.serviceParameters[currentService]);
        this.view.forceLayout();
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "onFilterActions",
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
    getSegmentTemplate : function() { 
      var scope = this;
      try{
        var segmentTemplate = {};
        var breakpoint = kony.application.getCurrentBreakpoint();
        if(breakpoint === 640){
          if(scope.currentTab === "LetterOfCredits"){
            segmentTemplate["row"] = "flxLCTransactionListCollapseMobile";
            segmentTemplate["expanded"] = "flxLCTransactionListExpandMobile";
          }else if(scope.currentTab === "Drawings"){
            segmentTemplate["row"] = "flxLCTransactionListCollapseMobile";
            segmentTemplate["expanded"] = "flxLCDrawingsExpandMobile";
          }
        }else if(breakpoint === 1024){
          if(scope.currentTab === "LetterOfCredits"){
            segmentTemplate["row"] = "flxLCTransactionListCollapseTablet";
            segmentTemplate["expanded"] = "flxLCTransactionListExpandTablet";
          }else if(scope.currentTab === "Drawings"){
            segmentTemplate["row"] = "flxLCDrawingsCollapseTablet";
            segmentTemplate["expanded"] = "flxLCDrawingsExpandTablet";
          }else if(scope.currentTab === "Amendments"){
            segmentTemplate["row"] = "flxLCAmendmentsCollapseTablet";
            segmentTemplate["expanded"] = "flxLCAmendmentsExpandTablet";
          }
        }
        else{
          if(scope.currentTab === "LetterOfCredits"){
            segmentTemplate["row"] = "flxLCTransactionListCollapse";
            segmentTemplate["expanded"] = "flxLCTransactionListExpand";
          }else if(scope.currentTab === "Drawings"){
            segmentTemplate["row"] = "flxLCDrawingsCollapse";
            segmentTemplate["expanded"] = "flxLCDrawingsExpand";
          }else if(scope.currentTab === "Amendments"){
            segmentTemplate["row"] = "flxLCAmendmentsCollapse";
            segmentTemplate["expanded"] = "flxLCAmendmentsExpand";
          }
        }
        return segmentTemplate;
      }catch(err){
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "getSegmentTemplate",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    /**
       * @api : onBreakpointChange
       * Method invoked on chaning break points
       * @return : NA
       */
    onBreakpointChange: function() {
      var scope = this;
      try {
        if(!kony.sdk.isNullOrUndefined(this.view.tbxSearch.text)) {
          this.view.imgClear.setVisibility(false);
        } else {
          this.view.imgClear.setVisibility(true);
        }				
        var rowTemplate = scope.getSegmentTemplate();
        scope.view.segImportLCList.rowTemplate = rowTemplate.row;
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "onBreakpointChange",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    
    /**
    * Method to handle visiblity of separators in collapse
    */
    widgetFilterActions: function() {
      if(this.view.imgFilter1Dropdown.src === "arrowup_sm.png") {
        this.view.flxFilter1Separator1.setVisibility(true);
      } else {
        this.view.flxFilter1Separator1.setVisibility(false);
      }
      if(this.view.imgFilter2Dropdown.src === "arrowup_sm.png") {
        this.view.flxFilter2Separator1.setVisibility(true);
      } else {
        this.view.flxFilter2Separator1.setVisibility(false);
      }
      if(this.view.imgFilter3Dropdown.src === "arrowup_sm.png") {
        this.view.flxFilter3Separator1.setVisibility(true);
      } else {
        this.view.flxFilter3Separator1.setVisibility(false);
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
        if (this.view.flxEllipsisList.isVisible) this.view.flxEllipsisList.setVisibility(false);
        else this.view.flxEllipsisList.setVisibility(true);
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
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
        scope.view.segEllipsisList.widgetDataMap = {
          "flxAccountTypes": "flxAccountTypes",
          "lblUsers": "lblUsers",
          "lblSeparator": "lblSeparator"
        };
        var segData = [
          [
            {},
            [{
              lblUsers: {
                text: kony.i18n.getLocalizedString("i18n.TradeFinance.importList"),
				toolTip: kony.i18n.getLocalizedString("i18n.TradeFinance.importList"),
                isVisible: true,
              },
              flxAccountTypes: {
                onClick: scope.downloadXLSXFile.bind(this),
                isVisible: true,
              },
            }
            ]
          ]
        ];
        scope.view.segEllipsisList.setData(segData);
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "moreActionSegDataMapping",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
      * @api : downloadXLSXFile
      * downloads records in XLSX File
      * @return : NA
      */
    downloadXLSXFile: function () {
      var scope = this;
      try {
        if(this.currentTab === "LetterOfCredits"){
          this.serviceParameters.getXLSXFile.Verb = "generateImportLetterOfCreditsList";
          this.serviceParameters.getXLSXFile.Criteria = this.serviceParameters.Transactions.Criteria;
          fileName = "Import Letter Of Credit";
        }
        else if(this.currentTab === "Drawings") {
          this.serviceParameters.getXLSXFile.Verb = "generateImportDrawingsList";
          this.serviceParameters.getXLSXFile.Criteria = this.serviceParameters.Drawings.Criteria;
          fileName = "Import Drawing";
        }
        else if(this.currentTab === "Amendments") {
          this.serviceParameters.getXLSXFile.Verb = "generateImportAmendmentsList";
          this.serviceParameters.getXLSXFile.Criteria = this.serviceParameters.Amendments.Criteria;
          fileName = "Import Amendment";
        }
        this.fetchTransactions(this.serviceParameters.getXLSXFile);
        scope.view.flxEllipsisList.setVisibility(false);
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "downloadXLSXFile",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
      * @api : exportAndPrint
      * Export and prints Records
      * @return : NA
      */
    exportAndPrint: function () {
      var scope = this;
      try {

      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "exportAndPrint",
          "error": err
        };
        scope.onError(errorObj);
      }
    },
    /**
      * @api : onError
      * Error thrown from catch block in component and shown on the form
      * @return : NA
      */
    onError: function(err) {
      var errMsg = JSON.stringify(err);
      //alert(errMsg);
    }
  };
});