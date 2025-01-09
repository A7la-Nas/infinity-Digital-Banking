define(['./ImportLCStore','./ImportLCBusinessController','FormatUtil'],function(ImportLCStore, BusinessController,FormatUtil) {
  var orientationHandler = new OrientationHandler();
  let fileName = '';
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
      this.filterByValue = "";
      this.filterByParam = "";
      this.isSearchEnabled = false;
      this.intitateFirst = true;
      this.sortApplied = false;
      this.upperLimit = 10;
      this.currentTab = "Drawings";
      this.segUIMapping = {
        "segImportLCList": {
          "flxDropDown": {onClick: this.onSegmentRowToggle.bind(this)},                    
          "imgDropdown": {"src": "arrow_down.png", isVisible: true},
          "btnAction": {"text": "${i18n{i18n.common.ViewDetails}}", "toolTip": "${i18n{i18n.common.ViewDetails}}", onClick: this.onActionClick.bind(this), "isVisible": true},    
          "btnContinueEditing": {"text": "${i18n{i18n.ImportLC.ContinueEditing}}", "toolTip": "${i18n{i18n.ImportLC.ContinueEditing}}",   /* onClick: this.onActionClick.bind(this),*/ "isVisible": true},    
          "btnCreateNewLCOFF": {"text": "${i18n{i18n.ImportLC.Copy&CreateNewLC}}", "toolTip": "${i18n{i18n.ImportLC.Copy&CreateNewLC}}", /* onClick: this.onActionClick.bind(this),*/ "isVisible": false},
          "btnCreateNewLC": {"text": "${i18n{i18n.ImportLC.Copy&CreateNewLC}}", "toolTip": "${i18n{i18n.ImportLC.Copy&CreateNewLC}}", /* onClick: this.onActionClick.bind(this),*/ "isVisible": true},    
          "btnDownload": {"text": "${i18n{i18n.common.Download}}", "toolTip": "${i18n{i18n.common.Download}}",  onClick: this.onDownloadAction.bind(this), "isVisible": true},    
          "btnPrint": {"text": "${i18n{i18n.accounts.print}}","toolTip": "${i18n{i18n.accounts.print}}",  onClick: this.onActionClick.bind(this), "isVisible": true},
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
      try{
        scope.context = context;
        scope.currentTab = scope.context.Tab;
        scope.getSegmentHeaderData(this.isNoRecordsAvailable);
        scope.setViewActions();
        if(this.currentTab === "Drawings") {
          scope.view.flxButtons.setVisibility(false);
          scope.view.flxSegHeaderAmendments.setVisibility(false);
          scope.view.flxSegHeader.setVisibility(true);
          scope.view.flxPagination.setVisibility(true);
          scope.view.tbxSearch.placeholder = this.businessController.getDataBasedOnDataMapping("drawingsPlaceHolderText", this.dataMapping);
          scope.serviceParameters.Transactions.Criteria.filterByValue = scope.context.srmsReqOrderID;
          scope.serviceParameters.Transactions.Criteria.filterByParam = "lcSrmsReqOrderID";
          scope.businessController.setProperties(this.serviceParameters.Transactions, this.dataFormatting, this.breakpoints);
          scope.fetchTransactions(this.serviceParameters.Transactions);
        }
        else if(this.currentTab === "Amendments") {
          scope.view.flxButtons.setVisibility(false);
          scope.view.flxPagination.setVisibility(true);
          scope.view.flxSegHeaderAmendments.setVisibility(true);
          scope.view.flxSegHeader.setVisibility(false);
          scope.view.tbxSearch.placeholder = kony.i18n.getLocalizedString("i18n.TradeFinance.searchForBeneficiaryAmendmentReferenceWithDots");
          scope.view.imgColumnAmendmentsTab2.setVisibility(false);
          scope.view.flxAmendmentsColumn2.setEnabled(false);
          scope.serviceParameters.Amendments.Criteria.filterByValue = scope.context.srmsReqOrderID;
          scope.serviceParameters.Amendments.Criteria.filterByParam = "lcSRMSId";
          scope.businessController.setProperties(this.serviceParameters.Amendments, this.dataFormatting, this.breakpoints);
          scope.fetchTransactions(this.serviceParameters.Amendments);
        }
      }
      catch(err)
      {
        var errorObj =
            {
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
        if(typeof scope.dataMapping === 'string'){
          scope.dataMapping = JSON.parse(scope.dataMapping);
        }
        if (typeof this.serviceParameters === 'string') {
          this.serviceParameters = JSON.parse(this.serviceParameters);
        }
        this.lowerLimit = 1;
        this.upperLimit = 10;
        this.serviceParameters.Transactions.Criteria.pageOffset = 0;
        this.serviceParameters.Amendments.Criteria.pageOffset = 0;
        var configurationManager = applicationManager.getConfigurationManager();
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
        scope.intitateFirst = true;
        scope.isSearchEnabled = false;
        scope.sortApplied = false;
        if(typeof this.dataMapping === 'string'){
          this.dataMapping = JSON.parse(this.dataMapping);
        }
        if (typeof this.serviceParameters === 'string') {
          this.serviceParameters = JSON.parse(this.serviceParameters);
        }
        scope.view.imgNoTransaction.src = "error_yellow.png";
        scope.view.lblNoTransaction.text = "No transactions available";  
        scope.view.PaginationContainer.setPageSize(10);
        if(this.currentTab === "Drawings"){
          scope.view.flxSegHeaderAmendments.setVisibility(false);
          scope.view.flxSegHeader.setVisibility(true);
          scope.view.tbxSearch.placeholder = this.businessController.getDataBasedOnDataMapping("drawingsPlaceHolderText", this.dataMapping);
          scope.serviceParameters.Transactions.Criteria.filterByValue = "";
          scope.serviceParameters.Transactions.Criteria.filterByParam = "";
          scope.serviceParameters.Transactions.Criteria.timeValue = "6,MONTH";  
          scope.serviceParameters.Transactions.Criteria.timeParam = "drawingCreationDate";
          scope.serviceParameters.Transactions.Criteria.sortByParam = "drawingCreationDate";
          scope.serviceParameters.Transactions.Object = "LCImportDrawing";
          scope.serviceParameters.Transactions.Verb = "getImportLCDrawings";
        }else if(this.currentTab === "Amendments"){
          scope.view.flxSegHeaderAmendments.setVisibility(true);
          scope.view.flxSegHeader.setVisibility(false);
          scope.view.tbxSearch.placeholder = kony.i18n.getLocalizedString("i18n.TradeFinance.searchForBeneficiaryAmendmentReferenceWithDots");
          scope.view.imgColumnAmendmentsTab2.setVisibility(false);
          scope.view.flxAmendmentsColumn2.setEnabled(false);
          scope.view.flxPagination.setVisibility(false);
          scope.serviceParameters.Amendments.Criteria.filterByValue = "";
          scope.serviceParameters.Amendments.Criteria.filterByParam = "";
          scope.serviceParameters.Amendments.Criteria.timeValue = "6,MONTH";  
          scope.serviceParameters.Amendments.Criteria.timeParam = "amendmentDate";
          scope.serviceParameters.Amendments.Criteria.sortByParam = "amendmentDate";
          scope.serviceParameters.Amendments.Criteria.sortOrder = "DESC";
        }
        scope.businessController.getMetaDataForAllObjects();             
        scope.setViewActions();
        //scope.getSegmentHeaderData(this.isNoRecordsAvailable);
        scope.initButtonActions();
        scope.view.imgCoulmnDrawingsTab1.src = "sortingfinal.png";
        scope.view.imgCoulmnDrawingsTab2.src = "sortingfinal.png";
        scope.view.imgCoulmnDrawingsTab3.src = "sortingfinal.png";
        scope.view.imgCoulmnDrawingsTab4.src = "sortingfinal.png";
        scope.view.imgCoulmnDrawingsTab5.src = "sortingfinal.png";
        scope.view.imgCoulmnDrawingsTab6.src = "sortingfinal.png";
        scope.view.imgColumnAmendmentsTab1.src = "sortingfinal.png";
        scope.view.imgColumnAmendmentsTab2.src = "sortingfinal.png";
        scope.view.imgColumnAmendmentsTab3.src = "sortingfinal.png";
        scope.view.imgColumnAmendmentsTab4.src = "sortingfinal.png";
        scope.view.imgColumnAmendmentsTab5.src = "sortingfinal.png";
        scope.view.imgColumnAmendmentsTab6.src = "sortingfinal.png";
        if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
          this.view.flxFooter.left = "-6%";
          this.view.flxFooter.setVisibility(true);	
        }
        else{
          this.view.flxFooter.setVisibility(false);	
        }
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
        scope.view.btnAmendLC.onClick = this.onClickAmendActions.bind(this, "AmendLC");
        scope.view.btnBack.onClick = this.onClickAmendActions.bind(this, "Back");
        scope.view.tbxSearch.text = "";
        scope.view.imgClear.setVisibility(false);
        scope.view.tbxSearch.onTextChange = function() {
          scope.view.imgClear.setVisibility(true);
        };
        scope.view.imgClear.onTouchEnd = function() {
          if(this.currentTab === "Drawings"){
            scope.serviceParameters.Transactions.Criteria.searchString = "";
            scope.fetchTransactions(scope.serviceParameters.Transactions);
          }else if(this.currentTab === "Amendments"){
            scope.serviceParameters.Amendments.Criteria.searchString = "";
            scope.fetchTransactions(scope.serviceParameters.Amendments);
          }     
          scope.view.tbxSearch.text = "";
          scope.isSearchEnabled = false;
          scope.view.imgClear.setVisibility(false);
        };
        if(!kony.sdk.isNullOrUndefined(scope.view.tbxSearch.text)){
          scope.view.imgClear.setVisibility(false);
        }
        scope.view.tbxSearch.onDone = scope.getSearchData;
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
    onClickAmendActions: function(buttonName){
      var scope = this;
      try{
        if(buttonName === "AmendLC") {  
          this.navAmend();
        }
        else if(buttonName === "Back"){
          new kony.mvc.Navigation({
            "appName": "TradeFinanceMA",
            "friendlyName": "ImportLCUIModule/frmImportLCDashboard"
          }).navigate();
        }
      }catch(err){
        var errorObj = {
          "level": "ComponentController",
          "method": "fetchTransactions",
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
    fetchTransactions: function(serviceParameters) {
      var scope = this;
      try {
        scope.businessController.getMetaData();
        scope.businessController.setProperties(serviceParameters, this.dataFormatting, this.breakpoints);
        if(serviceParameters.Verb === "generate"|| serviceParameters.Verb === "generateImportLCAmendment"){
          scope.businessController.downloadTransactions(scope.context, fileName);
        }else{
          scope.businessController.fetchTransactions(scope.context);
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
    render: function() {
      var scope = this;
      try {
        if(typeof this.dataMapping === 'string'){
          this.dataMapping = JSON.parse(this.dataMapping);
        }
        scope.collectionObj = ImportLCStore.getState();
        scope.previousIndex = '';
        if (scope.isSearchEnabled === false) {   
          scope.setRecentLCData();
        }        
        scope.performDataMapping();
        scope.performUIActions();
        scope.showPaginationContainer();
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "render",
          "error": err
        };
        scope.onError(errorObj);
      }
    },

    /**
      * @api : setRecentLCData
      * sets recent segment data for REcent LC Flex
      * @return : NA
      */
    setRecentLCData: function() {
      var scope = this;
      try {
        var count = 1;
        var dataLength;
        var collectionData = this.store.getState();
        scope.collectionDataLength = Object.keys(collectionData.Collection).length;
        if (scope.collectionDataLength > 0 && (!kony.sdk.isNullOrUndefined(scope.collectionDataLength)) && scope.collectionObj.Collection.Transactions) {
          if (scope.collectionObj.Collection.Transactions.length > 0) {
            var beneficiaryValue = this.businessController.getDataBasedOnDataMapping("lblBeneficiaryValue", scope.dataMapping);
            var statusValue = this.businessController.getDataBasedOnDataMapping("lblStatusValue", scope.dataMapping);
            var amountValue = this.businessController.getDataBasedOnDataMapping("lblAmountValue", scope.dataMapping);
            var btnViewDetails = this.businessController.getDataBasedOnDataMapping("btnViewDetails", scope.dataMapping);
            if(scope.collectionObj.Collection.Transactions.length > 3){
              dataLength = 3;
            }else{
              dataLength = scope.collectionObj.Collection.Transactions.length;
            }
            for (var i = 1; i <= dataLength; i++) {
              //eval("this.view.lblBeneficiary" + i).text = this.businessController.getDataBasedOnDataMapping("lblBeneficiary", scope.dataMapping);
              //eval("this.view.lblBeneficiaryValue" + i).text = scope.collectionObj.Collection.Transactions && scope.collectionObj.Collection.Transactions[i - 1][beneficiaryValue] ? scope.collectionObj.Collection.Transactions[i - 1][beneficiaryValue] : "NA";
              //eval("this.view.lblStatus" + i).text = this.businessController.getDataBasedOnDataMapping("lblStatus", scope.dataMapping);
              //eval("this.view.lblStatusValue" + i).text = scope.collectionObj.Collection.Transactions && scope.collectionObj.Collection.Transactions[i - 1][statusValue] ? scope.collectionObj.Collection.Transactions[i - 1][statusValue] : "NA";
              //eval("this.view.lblAmount" + i).text = this.businessController.getDataBasedOnDataMapping("lblAmount", scope.dataMapping);
              //eval("this.view.lblAmountValue" + i).text = scope.collectionObj.Collection.Transactions && scope.collectionObj.Collection.Transactions[i - 1][amountValue] ? scope.collectionObj.Collection.Transactions[i - 1][amountValue] : "NA";
              //eval("this.view.btnViewDetails" + i).text = this.businessController.getDataBasedOnDataMapping("btnViewDetails", scope.dataMapping);
              //eval("this.view.btnViewDetails" + i).toolTip = this.businessController.getDataBasedOnDataMapping("btnViewDetails", scope.dataMapping);
              btnViewDetails.onClick = this.onActionClick.bind(this, "RecentLCViewDetails", this.collectionObj.Collection.Transactions[i - 1]);
            }
          } 
        } 
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "setRecentLCData",
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
    setViewActions : function(){
      var scope = this;
      try{
        var imageName = "";
        if(scope.currentTab === "Drawings"){
          imageName = "imgCoulmnDrawingsTab";
        }else if(scope.currentTab === "Amendments"){
          imageName = "imgColumnAmendmentsTab";
        }
        this.view[imageName+1].onTouchStart = this.sortRecords.bind(this, 1);
        this.view[imageName+2].onTouchStart = this.sortRecords.bind(this, 2);
        this.view[imageName+3].onTouchStart = this.sortRecords.bind(this, 3);
        this.view[imageName+4].onTouchStart = this.sortRecords.bind(this, 4);
        this.view[imageName+5].onTouchStart = this.sortRecords.bind(this, 5);
        this.view[imageName+6].onTouchStart = this.sortRecords.bind(this, 6);
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setViewActions",
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
              if(this.isSearchEnabled === false){
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
            if(scope.currentTab === "Drawings"){
              this.view.imgCoulmnDrawingsTab4.src= "sorting_next.png";
            }else if(scope.currentTab === "Amendments"){
              this.view.imgColumnAmendmentsTab3.src= "sorting_next.png";
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
            if(scope.currentTab === "Drawings")
              this.view.imgCoulmnDrawingsTab4 = "sorting_final.png";  
            else if(scope.currentTab === "Amendments")
              this.view.imgColumnAmendmentsTab3 = "sorting_final.png"; 
          }
          this.view.flxPagination.setVisibility(false);
          this.isNoRecordsAvailable = false;
          this.view.segImportLCList.setVisibility(false);
          this.view.flxNoTransactions.setVisibility(true);
          this.view.imgNoTransaction.imageScaleMode = constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS;
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
        if (segMasterDataToken[0].indexOf("Collection") !== -1) {
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
            //var segRecord = JSON.parse(JSON.stringify(segDataJSON.segmentUI));
            if(scope.currentTab === "Drawings"){
              segRecord = JSON.parse(JSON.stringify(segDataJSON.drawings));
            }else  if(scope.currentTab === "Amendments"){
              segRecord = JSON.parse(JSON.stringify(segDataJSON.amendments));
            }
            for (key in segRecord) {
              segRecord[key] = scope.getFieldValueFromMapping(key, segRecord[key], conditionalMapping, record);
            }
            segRecord = scope.getUIMappings(segRecord, record, segId);
            var incoTermsKey = record.incoTerms;
            if(!kony.sdk.isNullOrUndefined(incoTermsKey)){
              incoTermsKey = incoTermsKey.toUpperCase();
              var incoTermsValue = scope.businessController.getDataBasedOnDataMapping(incoTermsKey, scope.dataMapping);
              record.incoTerms = incoTermsValue;
            }	
            var currentBreakpoint = kony.application.getCurrentBreakpoint();
            if(currentBreakpoint === 640){
              segRecord["btnPrint"] = scope.getFieldValueFromMapping("btnPrintOFF", scope.segUIMapping.segImportLCList["btnPrintOFF"], {}, record);
              segRecord["flxLCDrawingsExpandMobile"] = {"height" : "512dp"};
              segRecord["flxDetailsHighlighter"] = {"height" : "512dp"};
              segRecord["flxLCRowData6"] = {"isVisible" : true};
              segRecord["flxLCRowData7"] = {"isVisible" : false};
              segRecord["flxLCRowData8"] = {"isVisible" : false};
              segRecord["flxLCRowData9"] = {"isVisible" : false};
              segRecord["flxLCRowData10"] = {"isVisible" : false};
            }else{
              segRecord["btnPrint"] = scope.getFieldValueFromMapping("btnPrint", scope.segUIMapping.segImportLCList["btnPrint"], {}, record); 
            }
            segRecord["btnCreateNewLC"] = scope.getFieldValueFromMapping("btnCreateNewLCOFF", scope.segUIMapping.segImportLCList["btnCreateNewLCOFF"], {}, record);
            if(this.currentTab === "Amendments"){
              segRecord["btnAction"].setEnabled(false);
              segRecord["btnPrint"].setEnabled(false);
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
        if(scope.currentTab === "Drawings"){
          columnHeaderData = this.dataMapping.segmentHeader.drawings;
          buttonUIName = "btnCoulmnDrawings";
          imageUIName = "imgCoulmnDrawingsTab";
        } 
        else if(scope.currentTab === "Amendments"){
          columnHeaderData = this.dataMapping.segmentHeader.amendments;
          buttonUIName = "btnColumnAmendments";
          imageUIName = "imgColumnAmendmentsTab";
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
      * @api : getSearchData
      * Gets on search
      * @return : NA
      */
    getSearchData: function(){
      var scope = this;
      var searchString = this.view.tbxSearch.text;
      this.lowerLimit = 1;
      scope.view.PaginationContainer.setPageSize(10);
      if(searchString !== null && searchString !== undefined){
        this.isSearchEnabled = true;
        if(scope.currentTab === "Drawings"){          
          this.serviceParameters.Transactions.Criteria.pageSize  = "11";
          this.serviceParameters.Transactions.Criteria.pageOffset  = "0";
          this.serviceParameters.Transactions.Criteria.searchString = searchString;
          this.fetchTransactions(this.serviceParameters.Transactions);
        }
        else if(scope.currentTab === "Amendments"){          
          this.serviceParameters.Amendments.Criteria.pageSize  = "11";
          this.serviceParameters.Amendments.Criteria.pageOffset  = "0";
          this.serviceParameters.Amendments.Criteria.searchString = searchString;
          this.fetchTransactions(this.serviceParameters.Amendments);
        }
      }else{
        this.isSearchEnabled = false;
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
          if(conditionalMapping[record[conditionalMappingKey]] !== undefined){
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
          if(JSON.stringify(keys).indexOf("BP1") !== -1 || JSON.stringify(keys).indexOf("BP2") !== -1 || JSON.stringify(keys).indexOf("BP3") !== -1){
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
          return contractJSON["default"];
        }
        return value;
      }catch(err){
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "getBreakpointBasedValue",
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
      try{
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
          if(this.currentTab === "Amendments"){
            var collectionData = this.collectionObj.Collection.Transactions;
            data = collectionData[data.rowIndex];
            data["Tab"] = "Amendments";
          } else{          
            this.context["drawingsSrmsReqOrderID"] = this.collectionObj.Cache.Transactions.drawings[data.rowIndex].drawingsSrmsReqOrderID;
            this.context["isReportDrawingPrint"] = true;
            this.context["viewDetails"] = true;
            data = '';
            data = this.context;
          }

        } else if (id === "btnCreateNewLC" || id === "RecentLCViewDetails") {
          id = id;				
        } else {
          id = id.text;
          var collectionData = this.collectionObj.Collection.Transactions;
          var drawingSubmitPermission  = applicationManager.getConfigurationManager().checkUserPermission('IMPORT_LC_DRAWINGS_SUBMIT');
          data = collectionData[data.rowIndex];
          data["frmType"] = "DrawingsReport";
          data["drawingSubmitPermission"] = drawingSubmitPermission;
          if(this.currentTab === "Amendments") data["Tab"] = "Amendments";
        }
        scopeObj.contextualActionButtonOnClick(id, data, this.context);
      }catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "onActionClick",
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
      var scopeObj = this;
      try{
        var scope = this;
        var selectedData = '';
        if (typeof this.serviceParameters === 'string') {
          this.serviceParameters = JSON.parse(this.serviceParameters);
        }
        if(scope.currentTab === "Drawings"){
          selectedData = scopeObj.collectionObj.Collection.Transactions[data.rowIndex]["drawingsSrmsReqOrderID"];
          scope.serviceParameters.Download.Criteria.drawingsSrmsReqOrderID = selectedData;
          fileName = "Import Drawing";
          this.fetchTransactions(this.serviceParameters.Download);
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
        scopeObj.onError(errorObj);
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
      * @api : showPaginationContainer
       * This method set the visibility of pagination container
       * return NA
       */    
    showPaginationContainer: function() {
      var scope = this;
      try {
        if (scope.collectionDataLength > 0) {
          this.view.PaginationContainer.setVisibility(true);
          this.view.PaginationContainer.setLowerLimit(this.lowerLimit);
          if(scope.currentTab === "Drawings"){
            this.view.PaginationContainer.setPageHeader(this.geti18nText("${i18n{i18n.ImportLC.Drawings}}"));
          }
          this.view.PaginationContainer.setIntervalHeaderForBulkpayments();
          this.view.PaginationContainer.setServiceDelegate(this.updateSegmentData);
          this.updatePaginationContainerUI(this.segData);
          if (this.segRecords.length === this.view.PaginationContainer.getPageSize() + 1) {
            this.segRecords.pop();
          }
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

    /**
      * @api : updateSegmentData
       * This method will update segment data after pagination
       * return NA
       */ 
    updateSegmentData: function() {
      var scope = this;
      var pageOffSet = this.view.PaginationContainer.getPageOffset();
      var pageSize = this.view.PaginationContainer.getPageSize();
      if (pageOffSet === 0) {
        this.lowerLimit = 1;
      } else {
        if(pageOffSet <0){
          this.lowerLimit = pageSize - 20;	
        }else{
          this.lowerLimit = pageOffSet + 1;
        }
      }
      if (this.lowerLimit === 0) {
        this.lowerLimit = 1;
      }
      if(scope.currentTab === "Drawings"){
        this.serviceParameters.Transactions.Criteria.pageOffset = "" + (Math.abs(pageOffSet));
        this.fetchTransactions(this.serviceParameters.Transactions);
      }else if(scope.currentTab === "Amendments"){
        this.serviceParameters.Amendments.Criteria.pageOffset = "" + (Math.abs(pageOffSet));
        this.fetchTransactions(this.serviceParameters.Amendments);
      }
    },

    /**
      * @api : updatePaginationContainerUI
       * This method will update UI of pagination container
       * return NA
       */ 
    updatePaginationContainerUI: function(responseData) {
      var scope = this;
      try {
        scope.intitateFirst = false;
        var pageOffSet = this.view.PaginationContainer.getPageOffset();
        var pageSize = this.view.PaginationContainer.getPageSize();
        var isMaxLimitReached = responseData.length <= this.view.PaginationContainer.getPageSize();
        this.view.PaginationContainer.setIsMaxLimitReached(isMaxLimitReached);
        this.view.PaginationContainer.updateUI();
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
      var i18ntext = text.substring(text.indexOf("${i18n")+7,text.length-2);
      return kony.i18n.getLocalizedString(i18ntext);
    },

    /**
      * @api : getDisplayText
       * This method is used to get display text
       * return String
       */
    getDisplayText: function(text) {
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
        if(scope.currentTab === "Drawings"){
          imageName = "imgCoulmnDrawingsTab";
        }else if(scope.currentTab === "Amendments"){
          imageName = "imgColumnAmendmentsTab";
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
        if(this.currentTab === "Drawings"){
          this.serviceParameters.Transactions.Criteria.sortByParam = field;
          this.serviceParameters.Transactions.Criteria.sortOrder = sortType;
          this.fetchTransactions(this.serviceParameters.Transactions);
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
            src: "chevron_up.png"
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
          "method": "onSegmentRowToggle",
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
    setSegmentWidgetDataMap: function() {
      this.view.segImportLCList.widgetDataMap = {
        "flxLCDrawingsExpandMobile":"flxLCDrawingsExpandMobile",
        "flxDetailsHighlighter":"flxDetailsHighlighter",
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
        "flxLCRowData6": "flxLCRowData6",
        "flxLCRowData7": "flxLCRowData7",
        "flxLCRowData8": "flxLCRowData8",
        "flxLCRowData9": "flxLCRowData9",
        "flxLCRowData10": "flxLCRowData10",
        "btnViewDetails": "btnViewDetails",
        "btnCreateNewLC": "btnCreateNewLC",
        "btnDownload": "btnDownload",
        "btnPrint": "btnPrint"
      };
    },

    /**
      * @api : getSegmentTemplate
      * This metod will return segment template for breakpoint
      * @return : {JSON}
      */
    getSegmentTemplate: function() { 
      var scope = this;
      try{
        var segmentTemplate = {};
        var breakpoint = kony.application.getCurrentBreakpoint();
        if(breakpoint === 640){        
          segmentTemplate["row"] = "flxLCTransactionListCollapseMobile";
          segmentTemplate["expanded"] = "flxLCDrawingsExpandMobile";         
        }else if(breakpoint === 1024){
          if(scope.currentTab === "Drawings"){
            segmentTemplate["row"] = "flxLCDrawingsCollapseTablet";
            segmentTemplate["expanded"] = "flxLCDrawingsExpandTablet";
          }else if(scope.currentTab === "Amendments"){
            segmentTemplate["row"] = "flxLCAmendmentsCollapseTablet";
            segmentTemplate["expanded"] = "flxLCAmendmentsExpandTablet";
          }      
        }
        else{          
          if(scope.currentTab === "Drawings"){
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
        scope.render();
        if(this.currentTab === "Drawings")
          scope.view.tbxSearch.placeholder = this.businessController.getDataBasedOnDataMapping("drawingsPlaceHolderText", this.dataMapping);
        else{
          scope.view.tbxSearch.placeholder = kony.i18n.getLocalizedString("i18n.TradeFinance.searchForBeneficiaryAmendmentReferenceWithDots");
        }
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
      * @api : onError
      * Error thrown from catch block in component and shown on the form
      * @return : NA
      */
    onError: function(err) {
      var errMsg = JSON.stringify(err);
    }
  };
});