define(['./ImportLCBusinessController','./ImportLCStore'],function(BusinessController,ImportLCStore) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._dataMappingDashboard = {};
      this._DataMappingViewDetails = {};
      this._serviceParametersDashboard = {};
      this._ServiceParametersViewDetails = {};
      this._dataFormattingDashboard = {};
      this._DataFormattingViewDetails = {};
      this.context = {};
      this.isSearchEnabled = '';
      this.status = "Deleted";
      ImportLCStore.subscribe(this.render.bind(this));
      this.store = ImportLCStore;
      this.collectionObj = ImportLCStore.getState();
      this.businessController = new BusinessController();
      this.businessController.store = this.store;
      this.view.txtSearchBox.text = "";
      this.view.tbxSearch.text = "";
      this.frmType;
      this.flexName;
      this.exportLCMockData;
      this.filtervalues = [];
      this.timefiltervalues = [];
      this.currencyFiltervalues = [];
      this.exportData = [];
      this.exportLCData;
      this.isFilterApplied = false;
      this.isPermissionEnabled = false;
      this.drawingTabStatus = "NewPending";
      this.frmFlow = "";
      this.importDrawingsData = {};
      this.drawingsFlow = false;
    },

    initGettersSetters: function() {
      defineGetter(this, 'dataMappingDashboard', () => {
        return this._dataMappingDashboard;
      });
      defineSetter(this, 'dataMappingDashboard', value => {
        this._dataMappingDashboard = value;
      });
      defineGetter(this, 'serviceParametersDashboard', () => {
        return this._serviceParametersDashboard;
      });
      defineSetter(this, 'serviceParametersDashboard', value => {
        this._serviceParametersDashboard = value;
      });
      defineGetter(this, 'dataFormattingDashboard', () => {
        return this._dataFormattingDashboard;
      });
      defineSetter(this, 'dataFormattingDashboard', value => {
        this._dataFormattingDashboard = value;
      });
      defineGetter(this, 'ServiceParametersViewDetails', () => {
        return this._ServiceParametersViewDetails;
      });
      defineSetter(this, 'ServiceParametersViewDetails', value => {
        this._ServiceParametersViewDetails = value;
      });
      defineGetter(this, 'DataMappingViewDetails', () => {
        return this._DataMappingViewDetails;
      });
      defineSetter(this, 'DataMappingViewDetails', value => {
        this._DataMappingViewDetails = value;
      });
      defineGetter(this, 'DataFormattingViewDetails', () => {
        return this._DataFormattingViewDetails;
      });
      defineSetter(this, 'DataFormattingViewDetails', value => {
        this._DataFormattingViewDetails = value;
      });
      defineGetter(this, 'dataMappingSearchFilter', () => {
        return this._dataMappingSearchFilter;
      });
      defineSetter(this, 'dataMappingSearchFilter', value => {
        this._dataMappingSearchFilter = value;
      });
    },

    /**
      * @api : preShow
      * Gets invoked initiapostShowlly after rendering of UI
      * @return : NA
      */
    preShow: function(){
      var scope = this;
      try {      
        scope.view.tbxSearch.text = "";
        scope.view.tbxSearchBoxExportLC.text = "";
        scope.view.txtSearchBox.text = "";
        if(scope.context.frmType === "ImportDrawings" && scope.context.hasOwnProperty("ImportDrawingsList"))
          scope.importLCDrawingsActions();
        if(scope.context.frmType === "ImportLC" && scope.context.flexName === "ImportLCViewDetails"){
          scope.drawingsFlow = true;          
          scope.importLCActions();       
        }
        if(scope.context.hasOwnProperty("frmFlow"))
          scope.drawingsFlow = true;
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "preShow",
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
    postShow: function() {
      var scope = this;
      try { 	
        if(kony.os.deviceInfo().name === "iPhone"){
          if(scope.context.flexName === "ImportLCDashboard"){
            scope.flxIOSFooterVisibility(true);
            scope.view.flxDashboardFooterDocking.setVisibility(true);
          }
          else if(scope.context.flexName === "ImportLCViewDetails" && (scope.frmType === "ExportLC" || scope.frmType === "ImportDrawings")){
            scope.flxIOSFooterVisibility(true);
            scope.view.flxViewDetailsFooterDocking.setVisibility(true);
          }
        }       
        else if(scope.context.flexName === "ImportLCDashboard"){
          scope.visibilityHamburger(true);
          scope.view.ImportLCViewDetails.setVisibility(false);
          scope.view.ImportLCSearchFilters.setVisibility(false);
          scope.flxFilterBottomVisibility(false);
        }
        else
          scope.visibilityHamburger(false);
        scope.setDashboardUIStaticData();
        scope.handleNavigation();
        scope.initButtonActions(); 
        scope.businessController.setProperties(scope.serviceParametersDashboard, scope.dataFormattingDashboard);
        scope.fetchTransactions(); 
        scope.businessController.getMetaDataForAllObjects();
        scope.setRecentLCWidgetDataMap(); 
        scope.showTradeFinanceBasedOnEntitlement();
        scope.view.flxDashboardScrollContainer.showFadingEdges = false;
        scope.view.flxViewDetailsScrollContainer.showFadingEdges = false;
        scope.view.flxFilterScrollContainer.showFadingEdges = false;   
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "postShow",
              "error": err
            };
        scope.onError(err);
      }
    },

    /**
      * @api : applyFilterOnclick
      * This will be invoked on click of Apply Filter in form level
      * @return : NA
      */
    applyFilterOnclick: function(){
      var scope = this;
      try {
        if(scope.frmType === "ExportLC")
          scope.exportLCSelectedFilterData();
        else if(scope.frmType === "ImportLC")
          scope.importLCSelectedFilterData();
        else if(scope.frmType === "ImportDrawings")
          scope.importDrawingsSelectedFilterData();
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "applyFilterOnclick",
              "error": err
            };
        scope.onError(err);
      }
    },

    /**
      * @api : showExportLCBasedOnEntitlement
      * method handles entitlements
      * @return : NA
      */
    showTradeFinanceBasedOnEntitlement: function(){ 
      var scope = this;
      try {
        var tradeFinanceEntitilement = applicationManager.getConfigurationManager().checkUserPermission("IMPORT_LC_VIEW");
        var exportTradeFinanceEntitilement = applicationManager.getConfigurationManager().checkUserPermission("EXPORT_LC_VIEW");
        var importDrawingTradeFinanceEntitilement = applicationManager.getConfigurationManager().checkUserPermission("IMPORT_LC_DRAWINGS_VIEW");
        if(tradeFinanceEntitilement && exportTradeFinanceEntitilement && importDrawingTradeFinanceEntitilement){
          scope.view.flxExportLC.setVisibility(true);
          scope.view.flxImportLC.setVisibility(true);
          scope.view.flxImportDrawings.setVisibility(true);
          scope.view.flxBack.setVisibility(true);
          scope.view.flxImportLC.left = "11%";
        }
        else if(tradeFinanceEntitilement && exportTradeFinanceEntitilement){
          scope.view.flxExportLC.setVisibility(true);
          scope.view.flxImportLC.setVisibility(true);
          scope.view.flxImportDrawings.setVisibility(false);
          scope.view.flxBack.setVisibility(true);
          scope.view.flxImportLC.left = "25%";
        }
        else if(tradeFinanceEntitilement && importDrawingTradeFinanceEntitilement){
          scope.view.flxExportLC.setVisibility(false);
          scope.view.flxImportLC.setVisibility(true);
          scope.view.flxImportDrawings.setVisibility(true);
          scope.view.flxBack.setVisibility(true);
          scope.view.flxImportLC.left = "22%";
        }
        else if(tradeFinanceEntitilement){
          scope.view.flxExportLC.setVisibility(false);
          scope.view.flxImportLC.setVisibility(true);
          scope.view.flxImportDrawings.setVisibility(false);
          scope.view.flxBack.setVisibility(true);
          scope.view.flxImportLC.left = "37.3%";
        }
        else if(exportTradeFinanceEntitilement){
          scope.view.flxExportLC.setVisibility(true);
          scope.view.flxImportLC.setVisibility(false);
          scope.view.flxImportDrawings.setVisibility(false);
          scope.handlePermissions();
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "showTradeFinanceBasedOnEntitlement",
              "error": err
            };
        scope.onError(err);
      }
    },

    /**
      * @api : handlePermissions
      * Method will handle the navigation based on permissions
      * @return : NA
      */
    handlePermissions: function(){
      var scope = this;
      try{
        scope.isPermissionEnabled = true;    
        scope.exportLCActions();
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "handlePermissions",
              "error": err
            };
        scope.onError(err);
      }
    },

    /**
      * @api : handleNavigation
      * Method will handle the navigation between dashboard and viewDetails screen
      * @return : NA
      */
    handleNavigation: function(){
      var scope = this;
      try{
        if(scope.context.flexName === "ImportLCDashboard"){
          scope.view.ImportLCDashboard.setVisibility(true);
          scope.view.ImportLCViewDetails.setVisibility(false);
        }
        else{
          scope.view.ImportLCDashboard.setVisibility(false);
          scope.view.ImportLCViewDetails.setVisibility(true);
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "handleNavigation",
              "error": err
            };
        scope.onError(err);
      }
    },

    /**
      * @api : filterRowOnClick
      * Will be invoked on row click of Recent LC and sends the data to form
      * @return : NA
      */
    filterRowOnClick: function(){
      var scope=this;
      try
      {
        var selectedRow = scope.view.segRecentLC.selectedRowIndex;
        var selectedData = scope.collectionObj.Collection.Transactions[selectedRow[1]];
        selectedData["frmType"] = "ImportLC";
        selectedData["flexName"] = "ImportLCDashboard";
        scope.frmFlow = "ImportLCDashboard";
        //selectedData["screensName"] = scope.context.screensName;
        scope.sendImportLCData(selectedData);
      } 
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "filterRowOnClick",
              "error": err
            };
        scope.onError(err);
      }
    },

    /**
      * @api : setDashboardUIStaticData
      * Prepares UI for Dashboard Screen
      * @return : NA
      */
    setDashboardUIStaticData: function(){
      var scope = this;
      try{
        scope.view.lblHeader.text = scope.businessController.getDataBasedOnDataMapping("lblHeader", scope.dataMappingDashboard);
        scope.view.tbxSearch.placeholder = scope.businessController.getDataBasedOnDataMapping("tbxSearch", scope.dataMappingDashboard);
        scope.view.lblImportLC.text = scope.businessController.getDataBasedOnDataMapping("lblImportLC", scope.dataMappingDashboard);
        scope.view.lblImportDrawings.text = scope.businessController.getDataBasedOnDataMapping("lblImportDrawings", scope.dataMappingDashboard);
        scope.view.lblExportLC.text = scope.businessController.getDataBasedOnDataMapping("lblExportLC", scope.dataMappingDashboard);
        scope.view.lblMore.text = scope.businessController.getDataBasedOnDataMapping("lblMore", scope.dataMappingDashboard);
        scope.view.lblImportLCOverView.text = scope.businessController.getDataBasedOnDataMapping("lblImportLCOverView", scope.dataMappingDashboard);
        scope.view.lblAmountHeader.text = scope.businessController.getDataBasedOnDataMapping("lblAmoutHeader", scope.dataMappingDashboard);
        scope.view.lblPendingLCHeader.text = scope.businessController.getDataBasedOnDataMapping("lblPendingLCHeader", scope.dataMappingDashboard) + ":";
        scope.view.lblDraftLCHeader.text = scope.businessController.getDataBasedOnDataMapping("lblDraftLCHeader", scope.dataMappingDashboard) + ":";
        scope.view.lblCompletedLCHeader.text = scope.businessController.getDataBasedOnDataMapping("lblCompletedLCHeader", scope.dataMappingDashboard) + ":";
        scope.view.lblRecentLC.text = scope.businessController.getDataBasedOnDataMapping("lblRecentLC", scope.dataMappingDashboard);
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setDashboardUIStaticData",
              "error": err
            };
      }
    },

    /**
      * @api : importLCActions
      * Actions and events for ImportLC flow
      * @return : NA
      */
    importLCActions: function(){
      var scope = this;
      scope.frmType = "ImportLC";
      try{
        scope.view.flxHeaderContainer.skin = "ICSknFlx003E75BlueMb";
        scope.view.flxSearchContainer.skin = "ICSknbgf9f9f9bor4pxe3e3e3";
        scope.view.txtSearchBox.width = 81.5 + "%";
        scope.view.flxClearSearchImportLC.right = 16 + "%";
        scope.view.imgFilter.setVisibility(true);
        scope.view.flxNewPending.setVisibility(false);
        scope.view.flxPosted.setVisibility(false);
        scope.view.flxPending.setVisibility(true);
        scope.view.flxStrip1.setVisibility(true);
        scope.view.flxDrafts.setVisibility(true);
        scope.view.flxStrip2.setVisibility(true);
        scope.view.flxClosed.setVisibility(true);
        scope.view.flxMenuContent.setVisibility(true);
        scope.view.txtSearchBox.setVisibility(true);
        scope.view.imgSearchIcon.setVisibility(true);
        scope.view.flxExportLCSearch.setVisibility(false);
        scope.view.lblAll.setVisibility(false);
        scope.view.flxSeparatorBody.setVisibility(false);
        scope.view.flxNoTransactionAvailable.setVisibility(false);
        scope.view.flxBodyContent.setVisibility(false);
        scope.setViewDetailsData();
        scope.drawingsFlow = false; 
        scope.isFilterApplied = false;
        scope.tabNavigationForViewDetails("Deleted",false);
        scope.view.flxPending.onClick = scope.tabNavigationForViewDetails.bind(this,"Deleted",true);
        scope.view.flxDrafts.onClick = scope.tabNavigationForViewDetails.bind(this,"Draft",true);
        scope.view.flxClosed.onClick = scope.tabNavigationForViewDetails.bind(this,"Self Approved",true);
        scope.view.flxClearSearchImportLC.onClick = scope.clearSearchData;
        scope.view.txtSearchBox.text = "";
        scope.view.txtSearchBox.onDone = scope.fetchTransactions.bind(this);
        scope.changeFlexVisibility("ImportLCDashboard", "ImportLCViewDetails");
        scope.view.imgFilter.onTouchEnd = scope.frontNavigationOfViewDetails;
        scope.view.SegmentList.onRowClick = scope.filterRowOnClickViewDetails.bind(this);
        scope.view.flxArrowupImg1.onClick = scope.filterSegmentExpandCollapse.bind(this, "filterSegment1", "flxArrowupImg1", "imgArrowup1");
        scope.view.flxArrowupImg2.onClick = scope.filterSegmentExpandCollapse.bind(this, "filterSegment2", "flxArrowupImg2", "imgArrowup2");
        scope.view.flxArrowupImg3.onClick = scope.filterSegmentExpandCollapse.bind(this, "filterSegment3", "flxArrowupImg3", "imgArrowup3");
        scope.view.filterSegment1.onRowClick =  scope.searchFilterRowOnClick.bind(this, "filterSegment1");
        scope.view.filterSegment2.onRowClick =  scope.searchFilterRowOnClick.bind(this, "filterSegment2");
        scope.view.filterSegment3.onRowClick =  scope.searchFilterRowOnClick.bind(this, "filterSegment3");
        scope.view.flxFilterBack.setVisibility(false);
        scope.view.flxFilterReset.setVisibility(false);
        scope.view.flxCancelImg.setVisibility(true);
        scope.view.flxCancelImg.onClick = scope.cancelNavigationForFilter;
        scope.SegmentListWidgetDataMap();
        scope.view.flxSubHeader.setVisibility(true);
        scope.view.flxMain2.setVisibility(false);
        scope.setSearchFilterUIData();
        scope.setFilterWidgetDataMap();
        scope.setLCTypeFilterData();
        scope.setTimePeriodData();
        scope.view.txtbxCustomStartDate.onTouchStart = scope.customStartDateSkinChange;
        scope.view.txtbxCustomEndDate.onTouchStart = scope.customEndDateFocusSkinChange;
        scope.view.flxFilterScrollContainer.height = 85.4 + "%";
        scope.applyFilterButtonEnable();
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "importLCActions",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
      * @api : exportLCActions
      * Actions and events for ExportLC flow
      * @return : NA
      */
    exportLCActions: function(){
      var scope = this;
      scope.frmType = "ExportLC";
      try{
        scope.view.flxHeaderContainer.skin = "ICSknFlx003E75Grd1E588b";
        scope.view.flxMenuContent.setVisibility(false);
        scope.view.imgFilter.setVisibility(true);
        scope.view.txtSearchBox.setVisibility(false);
        scope.view.imgSearchIcon.setVisibility(false);
        scope.view.flxExportLCSearch.setVisibility(true);
        scope.view.lblAll.setVisibility(true);
        scope.view.flxSeparatorBody.setVisibility(true);
        scope.view.flxNoTransactionAvailable.setVisibility(false);
        scope.view.flxBodyContent.setVisibility(false);
        scope.view.lblHeading.text = scope.businessController.getDataBasedOnDataMapping("lblExportLCHeading", scope.DataMappingViewDetails);
        scope.view.tbxSearchBoxExportLC.placeholder = scope.businessController.getDataBasedOnDataMapping("tbxSearchBoxExportLC", scope.DataMappingViewDetails);
        scope.exportLCData = [{
          "lcReferenceNo": "LC0000100001",
          "lcAmount": "$ 50,000.00",
          "lcType": "Sight",
          "applicantDetails": "Vincent",
          "applicantAddress": "NA",
          "issuingbankName": "American Bank",
          "issuingBankAddress": "425 Walnut St, Cincinnati, OH 45202",
          "expiryDate": "09/13/2021",
          "issueDate": "05/11/2021",
          "beneficiaryName": "George",
          "beneficiaryAddress": "180 Oxford St, London, Greater London",
          "descriptionOfGoods": "Tonnes of Cotton",
          "additionalConditions": "Flammable",
          "latestShippingDate": "05/24/2021",
          "confirmationInstruction": "Confirm",
          "documentName": "KYC",
          "fileToUpload": "tets",
          "messageType": "L00U99V18",
          "deliveredToFrom": "Joesph",
          "deliveredDate": "05/24/2021",
          "messageCategory": "Inward",
          "Currency": "USD"
        }, {
          "lcReferenceNo": "LC0000100002",
          "lcAmount": "€ 1,33,000.00",
          "lcType": "Acceptance",
          "applicantDetails": "Mc Daniel",
          "applicantAddress": "NA",
          "issuingbankName": "Standard Chartered",
          "issuingBankAddress": "Five Brindleyplace. B1 2HP Birmingham. United Kingdom.",
          "expiryDate": "09/16/2021",
          "issueDate": "03/15/2022",
          "beneficiaryName": "Jithendra",
          "beneficiaryAddress": "217 Ford House Office Building, Washington, DC 20515",
          "descriptionOfGoods": "Tonnes of woods",
          "additionalConditions": "Flammable",
          "latestShippingDate": "01/15/2022",
          "confirmationInstruction": "Without",
          "documentName": "Passport",
          "fileToUpload": "",
          "messageType": "P00A77P",
          "deliveredToFrom": "Brandon",
          "deliveredDate": "01/15/2022",
          "messageCategory": "Outward",
          "Currency": "EUR"
        }, {
          "lcReferenceNo": "LC0000100003",
          "lcAmount": "₹ 4,89,700.00",
          "lcType": "Deferred",
          "applicantDetails": "Jessie",
          "applicantAddress": "NA",
          "issuingbankName": "Bank of America",
          "issuingBankAddress": "Head Office. 234 Wellington Street. Ottawa, ON, K1A 0G9",
          "expiryDate": "11/13/2021",
          "issueDate": "5/25/2021",
          "beneficiaryName": "Helen",
          "beneficiaryAddress": "Alybakova St., 167, Karakol 722360",
          "descriptionOfGoods": "coal and tar",
          "additionalConditions": "Flammable",
          "latestShippingDate": "3/24/2021",
          "confirmationInstruction": "Confirm",
          "documentName": "Goods clearance certificate",
          "fileToUpload": "",
          "messageType": "D11A22D55",
          "deliveredToFrom": "John",
          "deliveredDate": "3/24/2021",
          "messageCategory": "Inward",
          "Currency": "INR"
        }, {
          "lcReferenceNo": "LC0000100004",
          "lcAmount": "Fr. 65,000.00 ",
          "lcType": "Negotiation Sight",
          "applicantDetails": "Cindrella",
          "applicantAddress": "NA",
          "issuingbankName": "Bank of scotland",
          "issuingBankAddress": "No 224, N S C Bose Road, Ymca Building, Opposite High Court",
          "expiryDate": "10/24/2021",
          "issueDate": "1/27/2022",
          "beneficiaryName": "Hendry",
          "beneficiaryAddress": "Frisco3231 Preston Road Ste: 6Frisco, Texas 75034",
          "descriptionOfGoods": "Glass pots and cups",
          "additionalConditions": "Handle with care on glass products",
          "latestShippingDate": "10/27/2021",
          "confirmationInstruction": "Confirm",
          "documentName": "Quality control doc",
          "fileToUpload": "",
          "messageType": "MA2510MU",
          "deliveredToFrom": "Steve",
          "deliveredDate": "10/27/2021",
          "messageCategory": "Outward",
          "Currency": "CHF"
        }, {
          "lcReferenceNo": "LC0000100005",
          "lcAmount": "€ 1,34,500.00",
          "lcType": "Negotiation Acceptance",
          "applicantDetails": "Casper",
          "applicantAddress": "NA",
          "issuingbankName": "Standard Chartered",
          "issuingBankAddress": "Five Brindleyplace. B1 2HP Birmingham. United Kingdom.",
          "expiryDate": "10/13/2021",
          "issueDate": "7/18/2021",
          "beneficiaryName": "Jack",
          "beneficiaryAddress": " Building No - S 14, Solitaire Corporate Park",
          "descriptionOfGoods": "Cloth material - unstitched",
          "additionalConditions": "Flammable",
          "latestShippingDate": "4/26/2021",
          "confirmationInstruction": "Without",
          "documentName": "Shoppment evidence",
          "fileToUpload": "",
          "messageType": "NALL99TH0U",
          "deliveredToFrom": "Chigozie",
          "deliveredDate": "4/26/2021",
          "messageCategory": "Inward",
          "Currency": "EUR"
        }, {
          "lcReferenceNo": "LC0000100003",
          "lcAmount": "$ 9,89,700.00",
          "lcType": "Sight",
          "applicantDetails": "Karthik",
          "applicantAddress": "NA",
          "issuingbankName": "Bank of America",
          "issuingBankAddress": "Head Office. 234 Wellington Street. Ottawa, ON, K1A 0G9",
          "expiryDate": "10/18/2021",
          "issueDate": "5/25/2021",
          "beneficiaryName": "Lily",
          "beneficiaryAddress": "2495 Lyric Avenue,Heliopolis",
          "descriptionOfGoods": "Tea,Coffee,Nuts and fruits",
          "additionalConditions": "Edible items",
          "latestShippingDate": "3/24/2021",
          "confirmationInstruction": "Confirm",
          "documentName": "Doc of goods",
          "fileToUpload": "",
          "messageType": "MA1515A",
          "deliveredToFrom": "Amoah",
          "deliveredDate": "3/24/2021",
          "messageCategory": "Inward",
          "Currency": "USD"
        }, {
          "lcReferenceNo": "LC0000100011",
          "lcAmount": "₹ 50,078.00",
          "lcType": "Deferred",
          "applicantDetails": "Ronald",
          "applicantAddress": "NA",
          "issuingbankName": "Bank of Baroda",
          "issuingBankAddress": "45 Hazel St, Cincinnati, OH 45202",
          "expiryDate": "10/13/2021",
          "issueDate": "6/11/2021",
          "beneficiaryName": "Kate",
          "beneficiaryAddress": "180 Oxford St, London, Greater London",
          "descriptionOfGoods": "Tonnes of Cotton",
          "additionalConditions": "Flammable",
          "latestShippingDate": "2/4/2021",
          "confirmationInstruction": "Confirm",
          "documentName": "KYC",
          "fileToUpload": "",
          "messageType": "L00U969J",
          "deliveredToFrom": "Joseph",
          "deliveredDate": "5/24/2021",
          "messageCategory": "Inward",
          "Currency": "INR"
        }, {
          "lcReferenceNo": "LC0000100015",
          "lcAmount": "Fr. 1,89,070.00",
          "lcType": "Negotiation Sight",
          "applicantDetails": "Amend",
          "applicantAddress": "NA",
          "issuingbankName": "Standard Chartered",
          "issuingBankAddress": "Five Brindleyplace. B1 2HP Birmingham. United Kingdom.",
          "expiryDate": "09/13/2021",
          "issueDate": "03/25/2022",
          "beneficiaryName": "Lily",
          "beneficiaryAddress": "217 Ford House Office Building, Washington, DC 20515",
          "descriptionOfGoods": "Tonnes of woods",
          "additionalConditions": "Flammable",
          "latestShippingDate": "01/5/2022",
          "confirmationInstruction": "Without",
          "documentName": "Passport",
          "fileToUpload": "",
          "messageType": "KW5DN7",
          "deliveredToFrom": "Brandon",
          "deliveredDate": "01/15/2022",
          "messageCategory": "Outward",
          "Currency": "CHF"
        }, {
          "lcReferenceNo": "LC0000100018",
          "lcAmount": "$ 1,89,700.00",
          "lcType": "Acceptance",
          "applicantDetails": "Jessica",
          "applicantAddress": "NA",
          "issuingbankName": "Bank of Russia",
          "issuingBankAddress": "Head Office. 234 Wellington Street. Ottawa, ON, K1A 0G9",
          "expiryDate": "09/12/2021",
          "issueDate": "7/5/2022",
          "beneficiaryName": "Suraj",
          "beneficiaryAddress": "Alybakova St., 167, Karakol 722360",
          "descriptionOfGoods": "coal and tar",
          "additionalConditions": "Flammable",
          "latestShippingDate": "3/4/2022",
          "confirmationInstruction": "Confirm",
          "documentName": "Goods clearance certificate",
          "fileToUpload": "",
          "messageType": "59WNIDR",
          "deliveredToFrom": "Barack",
          "deliveredDate": "3/24/2022",
          "messageCategory": "Outward",
          "Currency": "USD"
        }, {
          "lcReferenceNo": "LC0000100025",
          "lcAmount": "$ 65,099.00",
          "lcType": "Negotiation Acceptance",
          "applicantDetails": "Cathy",
          "applicantAddress": "NA",
          "issuingbankName": "Bank of scotland",
          "issuingBankAddress": "No 224, N S C Bose Road, Ymca Building, Opposite High Court",
          "expiryDate": "10/13/2021",
          "issueDate": "1/27/2022",
          "beneficiaryName": "Rob",
          "beneficiaryAddress": "Frisco3231 Preston Road Ste: 6Frisco, Texas 75034",
          "descriptionOfGoods": "Glass pots and cups",
          "additionalConditions": "Handle with care on glass products",
          "latestShippingDate": "10/27/2021",
          "confirmationInstruction": "Confirm",
          "documentName": "Quality control doc",
          "fileToUpload": "",
          "messageType": "JS972KD",
          "deliveredToFrom": "Pluto",
          "deliveredDate": "10/27/2021",
          "messageCategory": "Outward",
          "Currency": "USD"
        }, {
          "lcReferenceNo": "LC0000100007",
          "lcAmount": "$ 1,34,600.00",
          "lcType": "Acceptance",
          "applicantDetails": "Lenin",
          "applicantAddress": "NA",
          "issuingbankName": "Standard Chartered",
          "issuingBankAddress": "Five Brindleyplace. B1 2HP Birmingham. United Kingdom.",
          "expiryDate": "10/6/2021",
          "issueDate": "7/8/2021",
          "beneficiaryName": "Sofie",
          "beneficiaryAddress": " Building No - S 14, Solitaire Corporate Park",
          "descriptionOfGoods": "Cloth material - unstitched",
          "additionalConditions": "Flammable",
          "latestShippingDate": "04/4/2021",
          "confirmationInstruction": "Without",
          "documentName": "Shoppment evidence",
          "fileToUpload": "",
          "messageType": "QYUEW58",
          "deliveredToFrom": "Benazir",
          "deliveredDate": "4/26/2021",
          "messageCategory": "Inward",
          "Currency": "USD"
        }, {
          "lcReferenceNo": "LC0000100027",
          "lcAmount": "$ 2,89,700.00",
          "lcType": "Negotiation Acceptance",
          "applicantDetails": "Mary John",
          "applicantAddress": "NA",
          "issuingbankName": "Bank of America",
          "issuingBankAddress": "Head Office. 234 Wellington Street. Ottawa, ON, K1A 0G9",
          "expiryDate": "9/5/2021",
          "issueDate": "5/5/2021",
          "beneficiaryName": "Louis",
          "beneficiaryAddress": "2495 Lyric Avenue,Heliopolis",
          "descriptionOfGoods": "Tea,Coffee,Nuts and fruits",
          "additionalConditions": "Edible items",
          "latestShippingDate": "3/4/2021",
          "confirmationInstruction": "Confirm",
          "documentName": "Doc of goods",
          "fileToUpload": "",
          "messageType": "MZOUA34",
          "deliveredToFrom": "santhosh",
          "deliveredDate": "3/24/2021",
          "messageCategory": "Inward",
          "Currency": "USD"
        }];
        scope.businessController.setDataInCollectionExportLC(scope.exportLCData);
        scope.changeFlexVisibility("ImportLCDashboard", "ImportLCViewDetails");
        scope.view.imgFilter.onTouchEnd = scope.frontNavigationOfViewDetails;
        scope.view.flxClearSearchImportLC.setVisibility(false);
        scope.view.flxClearSearchExportLC.setVisibility(false);
        scope.view.flxClearSearchExportLC.onClick = scope.clearSearchData;
        scope.view.tbxSearchBoxExportLC.text = "";
        scope.view.SegmentList.onRowClick = scope.filterRowOnClickViewDetails.bind(this);
        scope.view.flxArrowupImg1.onClick = scope.filterSegmentExpandCollapse.bind(this, "filterSegment1", "flxArrowupImg1", "imgArrowup1");
        scope.view.flxArrowupImg2.onClick = scope.filterSegmentExpandCollapse.bind(this, "filterSegment2", "flxArrowupImg2", "imgArrowup2");
        scope.view.flxArrowupImg3.onClick = scope.filterSegmentExpandCollapse.bind(this, "filterSegment3", "flxArrowupImg3", "imgArrowup3");
        scope.view.filterSegment1.onRowClick =  scope.searchFilterRowOnClick.bind(this, "filterSegment1");
        scope.view.filterSegment2.onRowClick =  scope.searchFilterRowOnClick.bind(this, "filterSegment2");
        scope.view.filterSegment3.onRowClick =  scope.searchFilterRowOnClick.bind(this, "filterSegment3");
        scope.view.flxFilterBack.setVisibility(false);
        scope.view.flxFilterReset.setVisibility(false);
        scope.view.flxCancelImg.setVisibility(true);
        scope.view.flxCancelImg.onClick = scope.cancelNavigationForFilter;
        scope.SegmentListWidgetDataMap();
        scope.view.flxSubHeader.setVisibility(false);
        scope.view.flxMain2.setVisibility(true);
        scope.setSearchFilterUIData();
        scope.setFilterWidgetDataMap();
        scope.setExportLCTypeFilterData();
        scope.setCurrencyData();
        scope.setExportLCTimePeriodData(); 
        scope.setfilterMockData(scope.collectionObj.Collection.ExportLC);
        scope.view.txtbxCustomStartDate.onTouchStart = scope.customStartDateSkinChange;
        scope.view.txtbxCustomEndDate.onTouchStart = scope.customEndDateFocusSkinChange;
        scope.view.tbxSearchBoxExportLC.onTextChange = scope.fetchTransactions.bind(this);
        scope.view.flxFilterScrollContainer.height = (85.4) + (scope.view.flxSubHeader.height.replace(/\D/g, '') / scope.view.ImportLCSearchFilters.height.replace(/\D/g,'')) + "%";
        scope.view.lblRequired2.left = 23 + "%";
        scope.applyFilterButtonEnable();

      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "exportLCActions",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
      * @api : importDrawingsActions
      * Actions and events for common Drawings flow
      * @return : NA
      */
    importDrawingsActions: function(){
      var scope = this;
      scope.frmType = "ImportDrawings";
      try{
        scope.view.flxHeaderContainer.skin = "ICSknFlx003E75BlueMb";
        scope.view.flxSearchContainer.skin = "ICSknbgf9f9f9bor4pxe3e3e3";
        scope.view.txtSearchBox.width = 81.5 + "%";
        scope.view.flxClearSearchImportLC.right = 16 + "%";
        scope.view.imgFilter.setVisibility(true);
        scope.view.flxPending.setVisibility(false);
        scope.view.flxStrip1.setVisibility(false);
        scope.view.flxDrafts.setVisibility(false);
        scope.view.flxStrip2.setVisibility(false);
        scope.view.flxClosed.setVisibility(false);
        scope.view.flxNewPending.setVisibility(true);
        scope.view.flxPosted.setVisibility(true);
        scope.view.flxMenuContent.setVisibility(true);
        scope.view.txtSearchBox.setVisibility(true);
        scope.view.imgSearchIcon.setVisibility(true);
        scope.view.flxExportLCSearch.setVisibility(false);
        scope.view.lblAll.setVisibility(false);
        scope.view.flxSeparatorBody.setVisibility(false);
        scope.view.flxNoTransactionAvailable.setVisibility(false);
        scope.view.flxBodyContent.setVisibility(false);
        scope.setViewDetailsData();
        scope.tabNavigationForViewDetails("NewPending",false);
        scope.view.flxClearSearchImportLC.onClick = scope.clearSearchData.bind(this);
        scope.view.txtSearchBox.text = "";
        scope.view.txtSearchBox.onDone = scope.fetchTransactions.bind(this);
        scope.view.flxNewPending.onClick = scope.tabNavigationForViewDetails.bind(this,"NewPending",true);
        scope.view.flxPosted.onClick = scope.tabNavigationForViewDetails.bind(this,"Completed",true);
        scope.drawingsFlow = false;
        scope.isFilterApplied = false;
        scope.changeFlexVisibility("ImportLCDashboard", "ImportLCViewDetails");
        scope.view.imgFilter.onTouchEnd = scope.frontNavigationOfViewDetails;
        scope.view.SegmentList.onRowClick = scope.filterRowOnClickViewDetails.bind(this);
        scope.SegmentListWidgetDataMap();
        scope.view.flxFilterBack.setVisibility(true);
        scope.view.flxFilterReset.setVisibility(false);
        scope.view.flxCancelImg.setVisibility(false);
        scope.view.flxSubHeader.setVisibility(true);
        scope.view.flxMain2.setVisibility(true);
        scope.setSearchFilterUIData();
        scope.setFilterWidgetDataMap();
        scope.setLCTypeFilterData();
        scope.setDrawingsFilterByStatus();
        scope.setTimePeriodData();
        scope.view.flxFilterScrollContainer.height = 85.4 + "%";
        scope.view.flxArrowupImg1.onClick = scope.filterSegmentExpandCollapse.bind(this, "filterSegment1", "flxArrowupImg1", "imgArrowup1");
        scope.view.flxArrowupImg2.onClick = scope.filterSegmentExpandCollapse.bind(this, "filterSegment2", "flxArrowupImg2", "imgArrowup2");
        scope.view.flxArrowupImg3.onClick = scope.filterSegmentExpandCollapse.bind(this, "filterSegment3", "flxArrowupImg3", "imgArrowup3");
        scope.view.filterSegment1.onRowClick =  scope.searchFilterRowOnClick.bind(this, "filterSegment1");
        scope.view.filterSegment2.onRowClick =  scope.searchFilterRowOnClick.bind(this, "filterSegment2");
        scope.view.filterSegment3.onRowClick =  scope.searchFilterRowOnClick.bind(this, "filterSegment3");
        scope.view.flxFilterBack.onClick = scope.cancelNavigationForFilter;
        scope.view.flxFilterReset.onClick = scope.filterReset;
        scope.applyFilterButtonEnable();
        scope.view.lblRequired2.left = 34 + "%";
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "importDrawingsActions",
              "error": err
            };
        scope.onError(errorObj);     
      }
    },

    /**
      * @api : importLCDrawingsActions
      * Actions and events for Import LC Associated Drawings flow
      * @return : NA
      */
    importLCDrawingsActions: function(){
      var scope = this;
      scope.frmType = "ImportDrawings";
      scope.drawingsFlow = true;
      try{
        scope.view.flxHeaderContainer.skin = "ICSknFlx003E75BlueMb";
        scope.view.flxPending.setVisibility(false);
        scope.view.flxStrip1.setVisibility(false);
        scope.view.flxDrafts.setVisibility(false);
        scope.view.flxStrip2.setVisibility(false);
        scope.view.flxClosed.setVisibility(false);
        scope.view.flxNewPending.setVisibility(true);
        scope.view.flxPosted.setVisibility(true);
        scope.view.flxMenuContent.setVisibility(true);
        scope.view.txtSearchBox.setVisibility(true);
        scope.view.imgSearchIcon.setVisibility(true);
        scope.view.flxExportLCSearch.setVisibility(false);
        scope.view.lblAll.setVisibility(false);
        scope.view.flxSeparatorBody.setVisibility(false);
        scope.view.flxNoTransactionAvailable.setVisibility(false);
        scope.view.flxBodyContent.setVisibility(false);
        scope.view.txtSearchBox.width = 89.7 + "%";
        scope.view.flxClearSearchImportLC.right = 8 + "%";
        scope.view.imgFilter.setVisibility(false);
        scope.setViewDetailsData();
        scope.tabNavigationForViewDetails("NewPending",false);
        scope.view.flxClearSearchImportLC.onClick = scope.clearSearchData.bind(this);
        scope.view.txtSearchBox.text = "";
        scope.view.txtSearchBox.onDone = scope.fetchTransactions.bind(this);     
        scope.view.flxNewPending.onClick = scope.tabNavigationForViewDetails.bind(this,"NewPending",true);
        scope.view.flxPosted.onClick = scope.tabNavigationForViewDetails.bind(this,"Completed",true);
        scope.view.ImportLCDashboard.setVisibility(false);
        scope.view.ImportLCViewDetails.setVisibility(true);         
        scope.importDrawingsData = scope.context.importLCData.srmsReqOrderID;
        scope.fetchTransactions();
        scope.view.SegmentList.onRowClick = scope.filterRowOnClickViewDetails.bind(this);
        scope.SegmentListWidgetDataMap();
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "importLCDrawingsActions",
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
    initButtonActions: function(){
      var scope = this;
      try{
        scope.view.flxImportLC.onClick = scope.importLCActions;
        scope.view.flxExportLC.onClick = scope.exportLCActions;
        scope.view.flxImportDrawings.onClick = scope.importDrawingsActions;
        scope.view.segRecentLC.onRowClick = scope.filterRowOnClick.bind(this);
        scope.view.tbxSearch.onDone = scope.fetchTransactions;
        scope.view.flxBack.onClick = scope.viewDetailsBackNavigation.bind(this);
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
      * @api : viewDetailsBackNavigation
      * To handle back navigation for view details screens
      * @return : NA
      */
    viewDetailsBackNavigation: function(){
      var scope = this;
      try{
        if(scope.frmType === "ImportDrawings" && scope.context.hasOwnProperty("ImportDrawingsList")){
          var data = {};
          var check = scope.context.hasOwnProperty("ImportDrawingsList");
          data = scope.context.importLCData;
          if(check){
            data["flexName"] = scope.context.previousFlexName;
            data["frmType"] = "ImportLC";
            //data["screensName"] = scope.context.screensName;
          }
          scope.sendImportLCData(data);
          if(scope.context.previousFlexName === "ImportLCViewDetails"){
            this.view.ImportLCDashboard.setVisibility(false);
            this.view.ImportLCViewDetails.setVisibility(true);
          }
          else{
            this.view.ImportLCViewDetails.setVisibility(false);
            this.view.ImportLCDashboard.setVisibility(true);
          }
          check = false;          
        }
        else if(scope.context.frmFlow === "ImportLCViewDetails" && !(scope.context.hasOwnProperty("ImportDrawingsList"))){
          var importdata = {};
          importdata = scope.context.importLCData;
          importdata["flexName"] = "ImportLCViewDetails";
          importdata["frmType"] = "ImportLC";
          importdata["frmFlow"] = "";
          scope.sendImportLCData(importdata);
        }
        else if(scope.context.frmFlow === "ImportLCDashboard" && !(scope.context.hasOwnProperty("ImportDrawingsList"))){
          var importdashboarddata = {};
          importdashboarddata = scope.context.importLCData;
          importdashboarddata["flexName"] = "ImportLCDashboard";
          importdashboarddata["frmType"] = "ImportLC";
          importdashboarddata["frmFlow"] = "";
          scope.sendImportLCData(importdashboarddata);
        }
        else
          scope.changeFlexVisibility("ImportLCViewDetails", "ImportLCDashboard");
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "viewDetailsBackNavigation",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
      * @api : changeFlexVisibility
      * Takes flexNames as params and sets their visibility
      * @return : NA
      */
    changeFlexVisibility: function(fromFlex, toFlex){
      var scope = this;
      try{
        if(scope.isPermissionEnabled)
          scope.view.flxBack.setVisibility(false);
        else
          scope.view.flxBack.setVisibility(true);
        if(kony.os.deviceInfo().name === "iPhone"){
          if(toFlex === "ImportLCDashboard"){
            scope.view.flxDashboardFooterDocking.setVisibility(true); 
            scope.flxIOSFooterVisibility(true);
          }
          else if(toFlex === "ImportLCViewDetails" && (scope.frmType === "ExportLC" || scope.frmType === "ImportDrawings")){
            scope.flxIOSFooterVisibility(true);
            scope.view.flxViewDetailsFooterDocking.setVisibility(true);
          }
          else{
            scope.flxIOSFooterVisibility(false);
            scope.view.flxViewDetailsFooterDocking.setVisibility(false);
            scope.view.flxDashboardFooterDocking.setVisibility(false); 
          }
        }
        else{
          if(toFlex === "ImportLCViewDetails" && scope.frmType === "ExportLC" && scope.isPermissionEnabled ){
            scope.view.flxBack.setVisibility(false);
            scope.visibilityHamburger(true);
          }
          else if(toFlex === "ImportLCViewDetails" || toFlex === "ImportLCSearchFilters" ){
            scope.view.flxBack.setVisibility(true);
            scope.visibilityHamburger(false);
          }
          else if(toFlex === "ImportLCDashboard")
            scope.visibilityHamburger(true);
          scope.view.flxDashboardFooterDocking.setVisibility(false);
          scope.view.flxViewDetailsFooterDocking.setVisibility(false);
        }
        scope.view[fromFlex].setVisibility(false);
        scope.view[toFlex].setVisibility(true);
        if(!scope.view.ImportLCSearchFilters.isVisible){
          if(scope.frmType === "ImportLC" || scope.frmType === "ImportDrawings" || toFlex === "ImportLCDashboard")
            scope.fetchTransactions();
        }
        if((toFlex === "ImportLCViewDetails" && scope.frmType === "ImportLC") || toFlex === "ImportLCSearchFilters" )
          scope.visibilityHamburger(false);
        else if(toFlex === "ImportLCDashboard")
          scope.visibilityHamburger(true);
        if(fromFlex === "ImportLCViewDetails" && toFlex === "ImportLCSearchFilters")
          scope.flxFilterBottomVisibility(true); 
        else if(toFlex === "ImportLCViewDetails" || toFlex === "ImportLCDashboard")
          scope.flxFilterBottomVisibility(false);  
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "changeFlexVisibility",
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
      try{
        scope.collectionObj = ImportLCStore.getState();
        if(scope.view.ImportLCDashboard.isVisible){
          if(scope.collectionObj.Collection.hasOwnProperty("Transactions") && scope.collectionObj.Collection.Transactions.length){
            if(scope.isSearchEnabled !== true){
              scope.setDashboardUIDynamicData();
              scope.importCharts();
            }
            scope.setRecentLCData(scope.collectionObj.Collection.Transactions);
            scope.view.flxDashboardNoTransactions.setVisibility(false);
            scope.view.flxRecentLC.setVisibility(true);
          }
          else{
            scope.view.flxDashboardNoTransactions.setVisibility(true);
            scope.view.flxRecentLC.setVisibility(false);
          }
        }
        if(scope.collectionObj.Collection.hasOwnProperty("Transactions") && scope.collectionObj.Collection.Transactions.length){
          if(scope.frmType === "ImportLC"){
            if(scope.view.ImportLCViewDetails.isVisible)
              scope.setLCViewDetailsData(scope.collectionObj.Collection.Transactions,scope.status);
          }
          else if(scope.frmType === "ImportDrawings"){
            if(scope.view.ImportLCViewDetails.isVisible && scope.collectionObj.Collection.Transactions[0].hasOwnProperty("drawingsSrmsReqOrderID") && scope.collectionObj.Collection.Transactions.length >0){
              scope.setSegDrawingsData(scope.collectionObj.Collection.Transactions,scope.drawingTabStatus);
            }        
            else{
              scope.view.flxBodyContent.setVisibility(false);
              scope.view.flxNoTransactionAvailable.setVisibility(true);
            }          
          }
        }
        else{
          scope.view.flxBodyContent.setVisibility(false);
          scope.view.flxNoTransactionAvailable.setVisibility(true);
        }
        if(scope.frmType === "ExportLC"){
          var filterValues = ['Sight', 'Acceptance', 'Deferred', 'Negotiation Sight', 'Negotiation Acceptance'];
          var currencyValues = ['USD', 'EUR', 'CHF', 'INR'];
          var timeFilterValues = ['05/15/2021', '11/15/2021'];
          var filteredData = scope.getFilterResult(scope.exportLCData, filterValues, currencyValues, timeFilterValues);
          scope.setSegExportLCViewDetailsData(filteredData);
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "render",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
      * @api : onError
      * Stores the error messgae in this contoller
      * @return : NA
      */
    onError: function(err){
      var scope = this;
      kony.application.dismissLoadingScreen();
      var errMsg = JSON.stringify(err);
    },

    /**
      * @api : clearSearchData
      * Clears the text in Search box
      * @return : NA
      */
    clearSearchData: function(){
      var scope = this;
      try {
        if(scope.frmType === "ImportLC" || scope.frmType === "ImportDrawings")
          scope.view.txtSearchBox.text = "";
        else
          scope.view.tbxSearchBoxExportLC.text = "";
        scope.fetchTransactions();
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "clearSearchData",
              "error": err
            };
        scope.onError(err);
      }
    },

    /**
      * @api : fetchTransactions
      * To get meta data and get data from object model
      * @return : NA
      */
    fetchTransactions: function(){
      var scope = this;
      try{
        if(scope.view.ImportLCDashboard.isVisible){
          scope.businessController.getMetaData(); 
          scope.serviceParametersDashboard.Transactions.Criteria.searchString = scope.view.tbxSearch.text ? scope.view.tbxSearch.text : "" ;
          scope.businessController.setProperties(scope.serviceParametersDashboard, scope.dataFormattingDashboard);
          scope.businessController.fetchTransactions(scope.context);
        }
        if(scope.frmType === "ImportLC"){
          scope.businessController.getMetaData(); 
          scope._ServiceParametersViewDetails.Transactions.Object = "LetterOfCredit";
          scope._ServiceParametersViewDetails.Transactions.Verb = "getImportLCs";
          scope.ServiceParametersViewDetails.Transactions.Criteria.timeParam = "lcCreatedOn";
          scope.ServiceParametersViewDetails.Transactions.Criteria.sortByParam = "lcCreatedOn";
          if(!scope.isFilterApplied){
            scope.ServiceParametersViewDetails.Transactions.Criteria.filterByValue = "";
            scope.ServiceParametersViewDetails.Transactions.Criteria.filterByParam = "";
          }
          if(scope.view.ImportLCViewDetails.isVisible){
            var word = scope.view.txtSearchBox.text;
            if(word !== "" && word !== undefined)
              scope.view.flxClearSearchImportLC.setVisibility(true);
            else
              scope.view.flxClearSearchImportLC.setVisibility(false);
            scope._ServiceParametersViewDetails.Transactions.Criteria.searchString = word;
            scope.businessController.setProperties(scope._ServiceParametersViewDetails, scope._DataFormattingViewDetails);
          }
          scope.businessController.fetchTransactions(scope.context);
        }
        else if(scope.frmType === "ExportLC"){
          if(scope.view.ImportLCViewDetails.isVisible){
            var exportVDSearchString;
            if(scope.frmType === "ExportLC")
              exportVDSearchString = scope.view.tbxSearchBoxExportLC.text ? scope.view.tbxSearchBoxExportLC.text : "" ;
            if(exportVDSearchString !== "" && exportVDSearchString !== undefined)
              scope.view.flxClearSearchExportLC.setVisibility(true);
            else
              scope.view.flxClearSearchExportLC.setVisibility(false);
            if(scope.frmType === "ExportLC")
              scope.getSearchResultViewDetails(scope.exportLCData,exportVDSearchString);
          }
        }
        else if(scope.frmType === "ImportDrawings"){
          scope.businessController.getMetaData(); 
          scope._ServiceParametersViewDetails.Transactions.Object = "LCImportDrawing";
          scope._ServiceParametersViewDetails.Transactions.Verb = "getImportLCDrawings";
          scope.ServiceParametersViewDetails.Transactions.Criteria.timeParam = "drawingCreationDate";
          scope.ServiceParametersViewDetails.Transactions.Criteria.sortByParam = "drawingCreationDate";
          if(!scope.isFilterApplied){
            scope.ServiceParametersViewDetails.Transactions.Criteria.filterByValue = "";
            scope.ServiceParametersViewDetails.Transactions.Criteria.filterByParam = "";
          }
          if(scope.drawingsFlow){
            scope.ServiceParametersViewDetails.Transactions.Criteria.filterByValue = scope.importDrawingsData;
            scope.ServiceParametersViewDetails.Transactions.Criteria.filterByParam = "lcSrmsReqOrderID";
          }            
          if(scope.view.ImportLCViewDetails.isVisible){
            var drawingword = scope.view.txtSearchBox.text;
            if(drawingword !== "" && drawingword !== undefined)
              scope.view.flxClearSearchImportLC.setVisibility(true);
            else
              scope.view.flxClearSearchImportLC.setVisibility(false);
            scope._ServiceParametersViewDetails.Transactions.Criteria.searchString = drawingword;
            scope.businessController.setProperties(scope._ServiceParametersViewDetails, scope._DataFormattingViewDetails);
          }
          scope.businessController.fetchTransactions(scope.context);
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "fetchTransactions",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
      * @api : setDashboardUIDynamicData
      * Sets the amount values from the collection
      * @return : NA
      */
    setDashboardUIDynamicData: function(){
      var scope = this;
      try{ 
        var collectionData = scope.store.getState();
        if(Object.keys(collectionData.Collection).length){
          scope.view.lblAmount.text = collectionData.Collection.Transactions[0].totalAmount ? collectionData.Collection.Transactions[0].totalAmount : "NA";
          scope.view.lblPendingLCAmount.text = collectionData.Collection.Transactions[0].deletedAmount ? collectionData.Collection.Transactions[0].deletedAmount : "NA";
          scope.view.lblDraftLCAmount.text = collectionData.Collection.Transactions[0].draftAmount ? collectionData.Collection.Transactions[0].draftAmount : "NA";
          scope.view.lblCompletedLCAmount.text = collectionData.Collection.Transactions[0].selfApprovedAmount ? collectionData.Collection.Transactions[0].selfApprovedAmount : "NA";
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setDashboardUIDynamicData",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
      * @api : importCharts
      * Method to create and set values to chart
      * @return : NA
      */
    importCharts: function() {
      var scope = this;
      try{
        var labelPendingLC = scope.businessController.getDataBasedOnDataMapping("lblPending", scope.dataMappingDashboard);
        var barColorPendingLC = scope.businessController.getDataBasedOnDataMapping("barColorPending", scope.dataMappingDashboard);
        var pendingLCAmount = parseInt(scope.collectionObj.Cache.Transactions.LetterOfCredits[0].deletedAmount);
        var labelDraftLC = scope.businessController.getDataBasedOnDataMapping("lblDrafts", scope.dataMappingDashboard);
        var barColorDraftLC = scope.businessController.getDataBasedOnDataMapping("barColorDraft", scope.dataMappingDashboard);
        var draftLCAmount = parseInt(scope.collectionObj.Cache.Transactions.LetterOfCredits[0].draftAmount);
        var labelApproveRejectLC = scope.businessController.getDataBasedOnDataMapping("lblApprovedReject", scope.dataMappingDashboard);
        var barColorApproveRejectLC = scope.businessController.getDataBasedOnDataMapping("barColorApproveReject", scope.dataMappingDashboard);
        var approveRejectAmount = parseInt(scope.collectionObj.Cache.Transactions.LetterOfCredits[0].selfApprovedAmount);
        var labelTotalLC = scope.businessController.getDataBasedOnDataMapping("lblTotal", scope.dataMappingDashboard);
        var barColorlTotalLC = scope.businessController.getDataBasedOnDataMapping("barColorTotal", scope.dataMappingDashboard);
        var totalAmount = parseInt(scope.collectionObj.Cache.Transactions.LetterOfCredits[0].totalAmount);
        const labels = ['Deleted', 'Draft', 'Approved', 'Total'];
        const data = {
          labels: labels,
          datasets: [{
            label: '',
            data: [pendingLCAmount, draftLCAmount, approveRejectAmount, totalAmount],
            backgroundColor: [barColorPendingLC, barColorDraftLC, barColorApproveRejectLC, barColorlTotalLC],
            borderColor: [barColorPendingLC, barColorDraftLC, barColorApproveRejectLC, barColorlTotalLC],
            borderWidth: 1
          }]
        };
        const config = {
          type: 'bar',
          data: data,
          options: {
            scales: {
              y: {
                beginAtZero: true,
                ticks: {          
                  legend: {
                    display: false
                  }
                }
              },
              xAxes: [{
                gridLines: {
                  color: "rgba(0, 0, 0, 0)",
                }
              }]       
            }
          },
        };
        scope.view.chartjs.createChart(1, { '1': config }, {});
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "ImportCharts",
              "error": err
            };
        scope.onError(errorObj);
      }
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
        scope.frmType = context.frmType;
        scope.flexName = context.flexName;
        if(context.hasOwnProperty("importLCData"))
          scope.importLCData = context.importLCData;
      }
      catch(err){
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setContext",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /** 
      * @api : setRecentLCWidgetDataMap
      * Widget data map for Recent LC Segment
      * @return : NA
      */
    setRecentLCWidgetDataMap: function(){
      var scope = this;
      try{
        scope.view.segRecentLC.widgetDataMap = {
          "lblName" : "lblName",
          "lblSight" : "lblSight",
          "lblStatus" : "lblStatus",
          "lblDate" : "lblDate"
        };
      } 
      catch(err){
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setRecentLCWidgetDataMap",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
      * @api : setRecentLCData
      * Sets Data for Recent LC Segment
      * @return : NA
      */
    setRecentLCData: function(arrayData){
      var scope = this;
      try{
        var array = [];
        arrayData.forEach(function(data){
          var obj = {
            "lblName" : "",
            "lblSight" : "",
            "lblStatus" : "",
            "lblDate" : ""
          };
          obj.lblName = data.beneficiaryName ? data.beneficiaryName : "-";
          obj.lblSight = data.paymentTerms ? data.paymentTerms : "-";
          obj.lblStatus = data.status ? data.status : "-";
          obj.lblDate = data.lcCreatedOn ? data.lcCreatedOn : "-";
          array.push(obj);
        });
        scope.view.segRecentLC.setData(array);
      } 
      catch(err){
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setRecentLCData",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
      * @api : getSearchResultViewDetails 
      * This method will fetch and send searched data to segment
      * @return : NA
      */
    getSearchResultViewDetails: function(exportMockData, searchString){
      var i, j, scope = this;
      try{
        var searchFilterData = [];
        for (i = 0; i < exportMockData.length; i++) {
          if (exportMockData[i] !== null || exportMockData[i] !== undefined) {
            var mockOObj = "";
            if (exportMockData[i] !== null && exportMockData[i] !== undefined)
              mockOObj = exportMockData[i];
            var pattern = searchString;
            if (JSON.stringify(mockOObj).toLowerCase().search(pattern.trim().toLowerCase()) !== -1)
              searchFilterData.push(exportMockData[i]);
          }
        }
        scope.setSegExportLCViewDetailsData(searchFilterData);
      }
      catch(err){
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "getSearchResultViewDetails",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
      * @api : filterRowOnClickViewDetails 
      * This method will invoked on onRowClick of segment
      * @return : NA
      */
    filterRowOnClickViewDetails: function(){
      var scope = this;
      try{
        if(scope.frmType === "ExportLC" || scope.frmType === "ImportDrawings"){
          scope.flxIOSFooterVisibility(false);
        }			
        var index = scope.view.SegmentList.selectedRowIndex;
        var selectedItem = scope.view.SegmentList.selectedRowItems;
        var data = {};
        if(scope.frmType === "ImportLC"){
          for(var i = 0; i < scope.collectionObj.Collection.Transactions.length; i++){
            if(selectedItem[0].lblSRMSId === scope.collectionObj.Collection.Transactions[i]["srmsReqOrderID"]){
              data = scope.collectionObj.Collection.Transactions[i];
              break;
            }
          }
          data["flexName"] = "ImportLCViewDetails";
          data["frmType"] = "ImportLC";
          scope.frmFlow = "ImportLCViewDetails";
          //data["screensName"] = scope.context.screensName;
          scope.sendImportLCData(data);
        }
        else if(scope.frmType === "ExportLC"){
          var selectedExportData = scope.collectionObj.Collection.ExportLC[index[1]];
          selectedExportData["flexName"] = "ImportLCViewDetails";
          selectedExportData["frmType"] =  "ExportLC";
          //selectedExportData["screensName"] = scope.context.screensName;
          scope.sendImportLCData(selectedExportData);
        }
        else{
          for(var j = 0; j < scope.collectionObj.Collection.Transactions.length; j++){
            if(selectedItem[0].lblSRMSId === scope.collectionObj.Collection.Transactions[j]["drawingsSrmsReqOrderID"]){
              data = scope.collectionObj.Collection.Transactions[j];
              break;
            }
          }
          if(scope.context.hasOwnProperty("ImportDrawingsList")){
            data["frmFlow"] = scope.frmFlow;
            data["flexName"] = scope.context.previousFlexName;
            data["importLCData"] = scope.importLCData;
          }
          data["flexName"] = "ImportLCViewDetails";
          data["frmType"] = "ImportDrawings";
          //data["screensName"] = scope.context.screensName;
          scope.sendImportLCData(data);
        }
      }
      catch(err){
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "filterRowOnClickViewDetails",
              "error": err
            };
        scope.onError(err);
      }
    },

    /**
      * @api : frontNavigationOfViewDetails
      * This method will invoked onClick of imgFilter
      * @return : String
      */
    frontNavigationOfViewDetails: function(){
      var scope = this;
      try{
        scope.view.ImportLCViewDetails.isVisible = false;
        scope.view.ImportLCSearchFilters.isVisible = true;
        scope.changeFlexVisibility("ImportLCViewDetails", "ImportLCSearchFilters");
      }
      catch(err){
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "frontNavigationOfViewDetails",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
      * @api : tabNavigationForViewDetails
      * This method will do navigate between the tabs 
      * @return : String
      */
    tabNavigationForViewDetails: function(tabStatus,status){
      var scope = this;
      try{
        if(!scope.drawingsFlow && status)
          scope.setDefaultData();
        if(scope.frmType === "ImportLC"){
          if(tabStatus === "Deleted"){
            scope.view.flxPending.skin = "ICSknFlxBgFFFFFFRounded7px";
            scope.view.lblPending.skin = "sknlbl003E7536px";
            scope.view.lblDrafts.skin = "ICSknLblFFFFFF13PX";
            scope.view.flxDrafts.skin = "ICSknFlx2f506eRounded7px";
            scope.view.lblClosed.skin = "ICSknLblFFFFFF13PX";
            scope.view.flxClosed.skin = "ICSknFlx2f506eRounded7px";
            scope.view.flxStrip2.setVisibility(true);            
          }
          else if(tabStatus === "Draft"){
            scope.view.lblPending.skin = "ICSknLblFFFFFF13PX";
            scope.view.flxPending.skin = "ICSknFlx2f506eRounded7px";
            scope.view.lblDrafts.skin = "sknlbl003E75";
            scope.view.flxDrafts.skin = "ICSknFlxBgFFFFFFRounded7px";
            scope.view.flxClosed.skin = "ICSknFlx2f506eRounded7px";
            scope.view.lblClosed.skin = "ICSknLblFFFFFF13PX";
            scope.view.flxStrip2.setVisibility(false);
          }
          else if(tabStatus === "Self Approved"){
            scope.view.lblPending.skin = "ICSknLblFFFFFF13PX";
            scope.view.flxPending.skin = "ICSknFlx2f506eRounded7px";
            scope.view.flxDrafts.skin = "ICSknFlx2f506eRounded7px";
            scope.view.lblDrafts.skin = "ICSknLblFFFFFF13PX";
            scope.view.lblClosed.skin = "sknlbl003E7536px";
            scope.view.flxClosed.skin = "ICSknFlxBgFFFFFFRounded7px";
            scope.view.flxStrip2.setVisibility(false);
          }   
          scope.status = tabStatus;
          scope.setLCTypeFilterData();
          scope.setTimePeriodData();
          scope.applyFilterButtonEnable();
          if(!scope.isFilterApplied)
            scope.setLCViewDetailsData(scope.collectionObj.Collection.Transactions,scope.status);
        }
        else{
          if(tabStatus === "NewPending"){
            scope.view.flxNewPending.skin = "ICSknFlxBgFFFFFFRounded7px";
            scope.view.lblNewPending.skin = "sknlbl003E7536px";
            scope.view.flxPosted.skin = "ICSknFlx2f506eRounded7px";
            scope.view.lblPosted.skin = "ICSknLblFFFFFF13PX";
          }
          else if(tabStatus === "Completed"){
            scope.view.flxPosted.skin = "ICSknFlxBgFFFFFFRounded7px";
            scope.view.lblPosted.skin = "sknlbl003E7536px";
            scope.view.flxNewPending.skin = "ICSknFlx2f506eRounded7px";
            scope.view.lblNewPending.skin = "ICSknLblFFFFFF13PX";
          }
          scope.drawingTabStatus = tabStatus;
          scope.setDrawingsFilterByStatus();
          scope.setLCTypeFilterData();
          scope.setTimePeriodData();
          scope.applyFilterButtonEnable();
          if(scope.collectionObj.Collection.Transactions.length > 0 && scope.collectionObj.Collection.Transactions[0].hasOwnProperty("drawingsSrmsReqOrderID"))
            scope.setSegDrawingsData(scope.collectionObj.Collection.Transactions,scope.drawingTabStatus);
        }
      }
      catch(err){
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "tabNavigationForViewDetails",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
      * @api : setDefaultData
      * This method will set the default data map for SegmentList segment
      * @return : NA
      */
    setDefaultData: function()
    {
      var scope = this;
      try {
        scope.ServiceParametersViewDetails.Transactions.Criteria.filterByValue = "";
        scope.ServiceParametersViewDetails.Transactions.Criteria.filterByParam = "";
        scope.ServiceParametersViewDetails.Transactions.Criteria.fromDateFilter = "";
        scope.ServiceParametersViewDetails.Transactions.Criteria.toDateFilter = "";
        scope.ServiceParametersViewDetails.Transactions.Criteria.timeValue = "6,MONTH";
        if(scope.frmType === "ImportLC"){
          scope.ServiceParametersViewDetails.Transactions.Criteria.sortByParam = "lcCreatedOn";
          scope.ServiceParametersViewDetails.Transactions.Criteria.timeParam = "lcCreatedOn";
        }
        else{
          scope.ServiceParametersViewDetails.Transactions.Criteria.sortByParam = "drawingCreationDate"; 
          scope.ServiceParametersViewDetails.Transactions.Criteria.timeParam = "drawingCreationDate";
        }
        scope.businessController.setProperties(scope._ServiceParametersViewDetails, scope._DataFormattingViewDetails);
        scope.businessController.fetchTransactions(scope.context);
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setDefaultData",
              "error": err
            };
        scope.onError(err);
      }
    },

    /**
      * @api : SegmentListWidgetDataMap
      * This method will set the widget data map for SegmentList segment
      * @return : NA
      */
    SegmentListWidgetDataMap: function(){
      var scope = this;
      try{
        scope.view.SegmentList.widgetDataMap = {
          "lblHeading" : "lblName",
          "lblHeading2" : "lblAmount",
          "lblDescription" : "lblpaymentTerms",
          "lblDescription2" : "lblDate"
        };
      }
      catch(err){
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "SegmentListWidgetDataMap",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
      * @api : setLCViewDetailsData
      * This method will sets ImportLC segment data
      * @return : Array
      */
    setLCViewDetailsData: function(arrayData, status){
      var scope = this;
      try{
        var array = [];
        if(arrayData.length > 0){
          scope.view.flxNoTransactionAvailable.setVisibility(false);
          scope.view.flxBodyContent.setVisibility(true);
          arrayData.forEach(function(data){
            if(data.status === status){
              var obj = {
                "lblName" : "",
                "lblAmount" : "",
                "lblpaymentTerms" : "",
                "lblDate" : "",
                "lblSRMSId" : ""
              };
              obj.lblName = data.beneficiaryName ? data.beneficiaryName : "-";
              obj.lblAmount = data.lcAmount ? data.lcAmount : "-";
              obj.lblpaymentTerms = data.paymentTerms ? data.paymentTerms : "-";
              obj.lblDate = data.lcCreatedOn ? data.lcCreatedOn : "-";
              obj.lblSRMSId = data.srmsReqOrderID;
              array.push(obj);
            }
          });
          if(array.length > 0)
            scope.view.SegmentList.setData(array);
          else{
            scope.view.flxBodyContent.setVisibility(false);
            scope.view.flxNoTransactionAvailable.setVisibility(true);
          }
        }
        else{
          scope.view.flxBodyContent.setVisibility(false);
          scope.view.flxNoTransactionAvailable.setVisibility(true);
        }
      }
      catch(err){
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setLCViewDetailsData",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
      * @api : setSegExportLCViewDetailsData
      * This method will set the ExportLC mock data for SegmentList segment
      * @return : NA
      */
    setSegExportLCViewDetailsData: function(ExportLCData){
      var scope = this;
      try{
        var array = [];
        scope.view.lblAll.text = scope.businessController.getDataBasedOnDataMapping("lblAll", scope.DataMappingViewDetails);
        if(ExportLCData.length > 0){
          scope.view.flxNoTransactionAvailable.setVisibility(false);
          scope.view.flxBodyContent.setVisibility(true);
          ExportLCData.forEach(function(data){
            var obj = {
              "lblName" : "",
              "lblAmount" : "",
              "lblpaymentTerms" : "",
              "lblDate" : ""
            };
            obj.lblName = data.applicantDetails  ? data.applicantDetails  : "-";
            obj.lblpaymentTerms = data.lcReferenceNo ? data.lcReferenceNo : "-";
            obj.lblAmount = data.lcAmount ? data.lcAmount : "-";
            obj.lblDate = data.expiryDate ? "Exp. "+ data.expiryDate : "-";
            array.push(obj);
          });
          scope.view.lblAll.text = scope.view.lblAll.text.concat(" ("+ array.length+")");
          scope.view.SegmentList.setData(array);
        }
        else{
          scope.view.lblAll.text = scope.view.lblAll.text.concat(" ("+ array.length+")");
          scope.view.flxBodyContent.setVisibility(false);
          scope.view.flxNoTransactionAvailable.setVisibility(true);
        }
      }
      catch(err){
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setSegExportLCViewDetailsData",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
      * @api : setSegDrawingsData
      * This method will set the Drawings data for SegmentList segment
      * @return : NA
      */
    setSegDrawingsData: function(DrawingsData,tabName){
      var scope = this;
      var newpending = ["New","Pending with Bank"];
      try{
        var array = [];
        if(DrawingsData.length > 0){
          scope.view.flxNoTransactionAvailable.setVisibility(false);
          scope.view.flxBodyContent.setVisibility(true);
          if(tabName === "NewPending"){
            DrawingsData.forEach(function(data){
              if(newpending.includes(data.status)){
                var obj = {
                  "lblName" : "",
                  "lblAmount" : "",
                  "lblpaymentTerms" : "",
                  "lblDate" : "",
                  "lblSRMSId" : ""
                };
                obj.lblName = data.beneficiaryName ? data.beneficiaryName : "-";
                obj.lblAmount = data.lcAmount ? data.lcAmount : "-";
                obj.lblpaymentTerms = data.status ? data.status : "-";
                obj.lblDate = data.drawingCreationDate ? data.drawingCreationDate : "-";
                obj.lblSRMSId = data.drawingsSrmsReqOrderID;
                array.push(obj);
              }});            
          }
          else{
            DrawingsData.forEach(function(data){
              if(!(newpending.includes(data.status))){  
                var completedobj = {
                  "lblName" : "",
                  "lblAmount" : "",
                  "lblpaymentTerms" : "",
                  "lblDate" : "",
                  "lblSRMSId" : ""
                };
                completedobj.lblName = data.beneficiaryName ? data.beneficiaryName : "-";
                completedobj.lblAmount = data.lcAmount ? data.lcAmount : "-";
                completedobj.lblpaymentTerms = data.paymentStatus ? "Pay. Status: " + data.paymentStatus : "-";
                completedobj.lblDate = data.drawingCreationDate ? data.drawingCreationDate : "-";
                completedobj.lblSRMSId = data.drawingsSrmsReqOrderID;
                array.push(completedobj);
              }});            
          }
          if(array.length > 0)
            scope.view.SegmentList.setData(array);
          else{
            scope.view.flxBodyContent.setVisibility(false);
            scope.view.flxNoTransactionAvailable.setVisibility(true);
          }
        }
        else{
          scope.view.flxBodyContent.setVisibility(false);
          scope.view.flxNoTransactionAvailable.setVisibility(true);
        }
      }
      catch(err){
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setSegDrawingsData",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    
    /**
      * @api : setViewDetailsData
      * This method will sets data from data mapping property
      * @return : NA
      */
    setViewDetailsData: function(){
      var scope = this;
      try{
        if(scope.frmType === "ImportLC"){
          scope.view.lblHeading.text = scope.businessController.getDataBasedOnDataMapping("lblHeading", scope.DataMappingViewDetails);
          scope.view.lblPending.text = scope.businessController.getDataBasedOnDataMapping("lblPending", scope.DataMappingViewDetails);
          scope.view.lblDrafts.text = scope.businessController.getDataBasedOnDataMapping("lblDrafts", scope.DataMappingViewDetails);
          scope.view.lblClosed.text = scope.businessController.getDataBasedOnDataMapping("lblClosed", scope.DataMappingViewDetails);
          scope.view.txtSearchBox.placeholder = scope.businessController.getDataBasedOnDataMapping("txtSearchBox", scope.DataMappingViewDetails);
        }
        else if(scope.frmType === "ImportDrawings"){
          scope.view.lblHeading.text = scope.businessController.getDataBasedOnDataMapping("drawingsHeading", scope.DataMappingViewDetails);
          scope.view.lblNewPending.text = scope.businessController.getDataBasedOnDataMapping("lblNewPending", scope.DataMappingViewDetails);
          scope.view.lblPosted.text = scope.businessController.getDataBasedOnDataMapping("lblPosted", scope.DataMappingViewDetails);
          scope.view.txtSearchBox.placeholder = scope.businessController.getDataBasedOnDataMapping("drawingsTxtboxPlaceholder", scope.DataMappingViewDetails);
        }
      }
      catch(err){
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setViewDetailstData",
              "error": err
            };
        scope.onError(errorObj);
      }
    }, 

    /**
      * @api : cancelNavigationForFilter
      * Method to navigate back to ImportLCViewDetails
      * @return : NA
      */
    cancelNavigationForFilter: function() {
      var scope = this;
      try {
        scope.view.ImportLCSearchFilters.isVisible = false;
        scope.view.ImportLCViewDetails.isVisible = true;
        scope.flxFilterBottomVisibility(false);
        if (scope.frmType === "ExportLC") {
          scope.view.filterSegment1.setData(scope.selectedLCFilterData);
          scope.view.filterSegment2.setData(scope.selectedStatusFilterData);
          scope.filterSegment2DataCount = scope.selectedStatusFilterData.length;
          scope.view.filterSegment3.setData(scope.selectedTimeFilterData);
        }
        else if (scope.frmType === "ImportDrawings") {
          scope.view.filterSegment1.setData(scope.selectedLCFilterData);
          if (scope.drawingTabStatus === "NewPending") {
            scope.view.filterSegment2.setData(scope.selectedStatusFilterData);
            scope.filterSegment2DataCount = scope.selectedStatusFilterData.length;
          }
          scope.view.filterSegment3.setData(scope.selectedTimeFilterData);
        }
        else {
          scope.view.filterSegment1.setData(scope.selectedLCFilterData);
          scope.view.filterSegment3.setData(scope.selectedTimeFilterData);
        }
        scope.filterSegment1DataCount = scope.selectedLCFilterData.length;
        scope.filterSegment3DataCount = scope.selectedTimeFilterData.length;
        scope.applyFilterButtonEnable();
      }
      catch (err) {
        var errorObj =
            {
              "level": "ComponentController",
              "method": "cancelNavigationForFilter",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    
    /**
      * @api : filterReset
      * Method to reset the search filter values
      * @return : NA
      */
    filterReset: function(){
      var scope = this;
      try{
        scope.setLCTypeFilterData();
        //scope.setDrawingsFilterByStatus();
        scope.setTimePeriodData();
      }
      catch(err){
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "filterReset",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
      * @api : setSearchFilterUIData
      * prepares UI for Import and Export SearchFilter Screen
      * @return : NA
      */
    setSearchFilterUIData: function(){
      var scope = this;
      try{
        if(scope.frmType === "ImportLC"){
          scope.view.lblSeachFilters.text = scope.businessController.getDataBasedOnDataMapping("lblSearchFilters", scope.dataMappingSearchFilter);
          scope.view.lblSubHeader.text = scope.businessController.getDataBasedOnDataMapping("lblSubHeader", scope.dataMappingSearchFilter);
          scope.view.lblLcType.text = scope.businessController.getDataBasedOnDataMapping("lblLcType", scope.dataMappingSearchFilter);
          scope.view.lblFilterByStatus.text = scope.businessController.getDataBasedOnDataMapping("lblFilterByStatus", scope.dataMappingSearchFilter);
          scope.view.lblCurrency.text = scope.businessController.getDataBasedOnDataMapping("lblCurrency", scope.dataMappingSearchFilter);
          scope.view.lblCustomStartDate.text = scope.businessController.getDataBasedOnDataMapping("lblCustomStartDate", scope.dataMappingSearchFilter);
          scope.view.lblCustomEndDate.text = scope.businessController.getDataBasedOnDataMapping("lblCustomEndDate", scope.dataMappingSearchFilter);
          scope.view.lblRequired1.text = `(${scope.businessController.getDataBasedOnDataMapping("lblRequired", scope.dataMappingSearchFilter)})`;
          scope.view.lblRequired2.text = `(${scope.businessController.getDataBasedOnDataMapping("lblRequired", scope.dataMappingSearchFilter)})`;
        }
        else if(scope.frmType === "ExportLC"){
          scope.view.lblFilterByStatus.text = scope.businessController.getDataBasedOnDataMapping("Currency", scope.dataMappingSearchFilter);
          scope.view.lblSeachFilters.text = scope.businessController.getDataBasedOnDataMapping("lblSearchFilters", scope.dataMappingSearchFilter);
          scope.view.lblLcType.text = scope.businessController.getDataBasedOnDataMapping("lblLcType", scope.dataMappingSearchFilter);
          scope.view.lblCurrency.text = scope.businessController.getDataBasedOnDataMapping("lblCurrency", scope.dataMappingSearchFilter);
          scope.view.lblCustomStartDate.text = scope.businessController.getDataBasedOnDataMapping("lblCustomStartDate", scope.dataMappingSearchFilter);
          scope.view.lblCustomEndDate.text = scope.businessController.getDataBasedOnDataMapping("lblCustomEndDate", scope.dataMappingSearchFilter);
          scope.view.lblRequired1.text = `(${scope.businessController.getDataBasedOnDataMapping("lblRequired", scope.dataMappingSearchFilter)})`;
          scope.view.lblRequired2.text = `(${scope.businessController.getDataBasedOnDataMapping("lblRequired", scope.dataMappingSearchFilter)})`;          
        }
        else if(scope.frmType === "ImportDrawings"){
          scope.view.lblSubHeader.text = scope.businessController.getDataBasedOnDataMapping("Drawing SubHeader", scope.dataMappingSearchFilter);
          scope.view.lblFilterByStatus.text = scope.businessController.getDataBasedOnDataMapping("lblFilterByStatus", scope.dataMappingSearchFilter);
          scope.view.lblSeachFilters.text = scope.businessController.getDataBasedOnDataMapping("lblSearchFilters", scope.dataMappingSearchFilter);
          scope.view.lblLcType.text = scope.businessController.getDataBasedOnDataMapping("lblLcType", scope.dataMappingSearchFilter);
          scope.view.lblCurrency.text = scope.businessController.getDataBasedOnDataMapping("lblCurrency", scope.dataMappingSearchFilter);
          scope.view.lblRequired1.text = `(${scope.businessController.getDataBasedOnDataMapping("lblRequired", scope.dataMappingSearchFilter)})`;
          scope.view.lblRequired2.text = `(${scope.businessController.getDataBasedOnDataMapping("lblRequired", scope.dataMappingSearchFilter)})`;
        }
      }
      catch(err){
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setSearchFilterUIData",
              "error": err
            };
      }
    },

    /**
      * @api : setFilterWidgetDataMap
      * Maps widgetdata to segments
      * @return : NA
      */
    setFilterWidgetDataMap: function(){
      var scope = this;
      try{
        scope.view.filterSegment1.widgetDataMap = {
          "lblSegRowName": "lblSegRowName",
          "imgActiveCheckBox": "imgActiveCheckBox",
          "flxLCType": "flxLCType",
          "flxSegSep": "flxSegSep"
        };
        scope.view.filterSegment2.widgetDataMap = {
          "lblSegRowName": "lblSegRowName",
          "imgActiveCheckBox": "imgActiveCheckBox",
          "flxFilterByStatus": "flxFilterByStatus",
          "flxSegSep": "flxSegSep"
        };
        scope.view.filterSegment3.widgetDataMap = {
          "lblSegRowName": "lblSegRowName",
          "imgActiveCheckBox": "imgActiveCheckBox",
          "flxSegSep": "flxSegSep",
          "flxSegTimePeriod": "flxSegTimePeriod"
        };
      } 
      catch(err){
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setFilterWidgetDataMap",
              "error": err
            };
      }
    },

    /**
      * @api : setLCTypeFilterData
      * set segmentdata for ImportLC SearchFilter
      * @return : NA
      */
    setLCTypeFilterData: function(){
      var scope = this;
      try{
        scope.selectedLCFilterData = [];
        var importLCTypeSegmentData = [
          {lblSegRowName:{text :scope.businessController.getDataBasedOnDataMapping("Select All",scope.dataMappingSearchFilter), isVisible:true},
           imgActiveCheckBox:{src:"activecheckbox.png", isVisible:true},
           flxLCType:{onClick:scope.searchFilterRowOnClick.bind(this, "filterSegment1", "selectAll")}
          },{lblSegRowName:{text :scope.businessController.getDataBasedOnDataMapping("Sight",scope.dataMappingSearchFilter), isVisible:true, left:35},
             imgActiveCheckBox:{src:"activecheckbox.png", isVisible:true},
             flxLCType:{onClick:scope.searchFilterRowOnClick.bind(this, "filterSegment1", "widgetLabel")}
            },{lblSegRowName:{text :scope.businessController.getDataBasedOnDataMapping("Acceptance",scope.dataMappingSearchFilter), isVisible:true, left:35},
               imgActiveCheckBox:{src:"activecheckbox.png", isVisible:true},
               flxLCType:{onClick:scope.searchFilterRowOnClick.bind(this, "filterSegment1", "widgetLabel")}
              },{lblSegRowName:{text :scope.businessController.getDataBasedOnDataMapping("Deferred",scope.dataMappingSearchFilter), isVisible:true, left:35},
                 imgActiveCheckBox:{src:"activecheckbox.png", isVisible:true},
                 flxLCType:{onClick:scope.searchFilterRowOnClick.bind(this, "segment1", "widgetLabel")}
                },{lblSegRowName:{text :scope.businessController.getDataBasedOnDataMapping("Negotiation Sight",scope.dataMappingSearchFilter), isVisible:true, left:35},
                   imgActiveCheckBox:{src:"activecheckbox.png", isVisible:true},
                   flxLCType:{onClick:scope.searchFilterRowOnClick.bind(this, "filterSegment1", "widgetLabel")}
                  },{lblSegRowName:{text :scope.businessController.getDataBasedOnDataMapping("Negotiation Acceptance",scope.dataMappingSearchFilter), isVisible:true, left:35},
                     imgActiveCheckBox:{src:"activecheckbox.png", isVisible:true},
                     flxLCType:{onClick:scope.searchFilterRowOnClick.bind(this, "filterSegment1", "widgetLabel")},
                     flxSegSep:{isVisible:false}
                    }
        ];
        scope.view.filterSegment1.setData(importLCTypeSegmentData);
        scope.filterSegment1DataCount = importLCTypeSegmentData.length;
        scope.selectedLCFilterData = importLCTypeSegmentData;
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setLCTypeFilterData",
              "error": err
            };
      }
    },

    /**
      * @api : setDrawingsFilterByStatus
      * set segmentdata for ImportLC Drawings SearchFilter
      * @return : NA
      */
    setDrawingsFilterByStatus: function(){
      var scope = this;
      try{
        scope.selectedStatusFilterData = [];
        if(scope.drawingTabStatus === "NewPending"){
          scope.view.flxMain2.setVisibility(true);
          var importDrawingsStatusSegmentData = [
            {lblSegRowName:{text :scope.businessController.getDataBasedOnDataMapping("Select All",scope.dataMappingSearchFilter), isVisible:true},
             imgActiveCheckBox:{src:"activecheckbox.png", isVisible:true},
             flxFilterByStatus:{onClick:scope.searchFilterRowOnClick.bind(this, "filterSegment2", "selectAll")}
            },{lblSegRowName:{text :scope.businessController.getDataBasedOnDataMapping("New",scope.dataMappingSearchFilter), isVisible:true, left:35},
               imgActiveCheckBox:{src:"activecheckbox.png", isVisible:true},
               flxFilterByStatus:{onClick:scope.searchFilterRowOnClick.bind(this, "filterSegment2", "widgetLabel")}
              },{lblSegRowName:{text:scope.businessController.getDataBasedOnDataMapping("Pending with Bank",scope.dataMappingSearchFilter), isVisible:true, left:35},
                 imgActiveCheckBox:{src:"activecheckbox.png", isVisible:true},
                 flxFilterByStatus:{onClick:scope.searchFilterRowOnClick.bind(this, "filterSegment2", "widgetLabel")},
                 flxSegSep:{isVisible:false}
                }
          ];
          scope.view.filterSegment2.setData(importDrawingsStatusSegmentData);
          scope.filterSegment2DataCount = importDrawingsStatusSegmentData.length;
          scope.selectedStatusFilterData = importDrawingsStatusSegmentData;
        }
        else if(scope.drawingTabStatus === "Completed"){
          scope.view.flxMain2.setVisibility(false);
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setDrawingsFilterByStatus",
              "error": err
            };
      }
    },

    /**
      * @api : setTimePeriodData
      * set segmentdata for ImportLC SearchFilter
      * @return : NA
      */
    setTimePeriodData: function(){
      var scope = this;
      try{
        scope.selectedTimeFilterData = [];
        var importLCTimePeriodSegmentData = [
          {lblSegRowName:{text :scope.businessController.getDataBasedOnDataMapping("Last Six Months",scope.dataMappingSearchFilter), isVisible:true},
           imgActiveCheckBox:{src:"tickmark_green.png", isVisible:true, height : 18, width : 18 },flxSegSep :{isVisible:true},
           flxSegTimePeriod:{onClick:scope.searchFilterRowOnClick.bind(scope, "filterSegment3", "widgetLabel")}
          },{lblSegRowName:{text :scope.businessController.getDataBasedOnDataMapping("Today",scope.dataMappingSearchFilter), isVisible:true },
             imgActiveCheckBox:{src:"", isVisible:false, height : 18, width : 18},flxSegSep :{isVisible:true},
             flxSegTimePeriod:{onClick:scope.searchFilterRowOnClick.bind(scope, "filterSegment3", "widgetLabel")}
            },{lblSegRowName:{text :scope.businessController.getDataBasedOnDataMapping("Last One Month",scope.dataMappingSearchFilter), isVisible:true},
               imgActiveCheckBox:{src:"", isVisible:false, height : 18, width : 18},flxSegSep :{isVisible:true},
               flxSegTimePeriod:{onClick:scope.searchFilterRowOnClick.bind(scope, "filterSegment3", "widgetLabel")}
              },{lblSegRowName:{text :scope.businessController.getDataBasedOnDataMapping("Last One Year",scope.dataMappingSearchFilter), isVisible:true},
                 imgActiveCheckBox:{src:"", isVisible:false, height : 18, width : 18},flxSegSep :{isVisible:true},
                 flxSegTimePeriod:{onClick:scope.searchFilterRowOnClick.bind(scope, "filterSegment3", "widgetLabel")}
                }
        ];
        scope.view.filterSegment3.removeAll();
        scope.view.filterSegment3.setData(importLCTimePeriodSegmentData);
        scope.view.forceLayout();
        scope.selectedTimeFilterData = importLCTimePeriodSegmentData;
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setTimePeriodData",
              "error": err
            };
      }
    },

    /**
      * @api : filterSegmentExpandCollapse
      * To Expand and Collapse filterrows
      * @return : NA
      */
    filterSegmentExpandCollapse: function(segmentName, imgFlex, imgName){
      var scope = this;
      try{
        if (scope.view[imgFlex][imgName].src === "arrowup.png") {
          if(segmentName === "filterSegment1") {
            scope.view.flxHeaderSep1.setVisibility(true);
            scope.view.flxTopShadow1.setVisibility(false);
          }
          if(segmentName === "filterSegment2") {
            scope.view.flxHeaderSep2.setVisibility(true);
            scope.view.flxTopShadow2.setVisibility(false);
          }
          if(segmentName === "filterSegment3") {
            scope.view.flxTopShadow3.setVisibility(false);
          }
          scope.view[segmentName].setVisibility(false);
          scope.view[imgFlex][imgName].src = "arrowdown.png";
        }
        else{
          if(segmentName === "filterSegment1") {
            scope.view.flxHeaderSep1.setVisibility(true);
            scope.view.flxTopShadow1.setVisibility(true);
          }
          if(segmentName === "filterSegment2") {
            scope.view.flxHeaderSep2.setVisibility(true);
            scope.view.flxTopShadow2.setVisibility(true);
          }
          if(segmentName === "filterSegment3") {
            scope.view.flxTopShadow3.setVisibility(true);
          }
          scope.view[segmentName].setVisibility(true);
          scope.view[imgFlex][imgName].src = "arrowup.png";
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "filterSegmentExpandCollapse",
              "error": err
            };
      }
    },

    /**
      * @api : searchFilterRowOnClick
      * This method will be invoked on onRowClick of Filter
      * @return : NA
      */
    searchFilterRowOnClick: function(segName, widgetName) {
      var scope = this;
      try{
        var data = scope.view[segName].data;
        var index = scope.view[segName].selectedRowIndex;
        var sectionIndex = index[0];
        var rowIndex = index[1];
        if(segName === "filterSegment1" || segName === "filterSegment2"){
          if(segName === "filterSegment1"){
            if (data[rowIndex].imgActiveCheckBox.src === "inactivecheckbox.png") 
              data[rowIndex].imgActiveCheckBox.src = "activecheckbox.png";
            else 
              data[rowIndex].imgActiveCheckBox.src = "inactivecheckbox.png";
            if (data[rowIndex].lblSegRowName.text !== "Select All" && data[rowIndex].lblSegRowName.text !== "All") {
              if (data[0].imgActiveCheckBox.src === "activecheckbox.png")
                data[0].imgActiveCheckBox.src = "inactivecheckbox.png";
            }
            if(data[rowIndex].lblSegRowName.text === "Select All" || data[rowIndex].lblSegRowName.text === "All"){
              if(data[rowIndex].imgActiveCheckBox.src === "activecheckbox.png"){
                for(var i = 1; i < data.length; i++)
                  data[i].imgActiveCheckBox.src = "activecheckbox.png";               
              }
              else{
                for(var i = 1; i < data.length; i++)
                  data[i].imgActiveCheckBox.src = "inactivecheckbox.png"; 
              }
            }
            var selectAll1=0;
            for(var z = 0; z < data.length; z++){
              if(data[1].lblSegRowName.text === "Sight"){
                if( data[z].imgActiveCheckBox.src === "activecheckbox.png" && data[0].imgActiveCheckBox.src === "inactivecheckbox.png"){
                  selectAll1++;
                }
              }
            }
            if(selectAll1 === 5){
              data[0].imgActiveCheckBox.src = "activecheckbox.png";
            }
            scope.view[segName].setData(data);
            scope.filterSegment1DataCount = 0;
            for(i=0; i < data.length; i++){
              if(data[i].imgActiveCheckBox.src === "activecheckbox.png")
                scope.filterSegment1DataCount ++;
            }
          }
          else if(segName === "filterSegment2"){
            if (data[rowIndex].imgActiveCheckBox.src === "inactivecheckbox.png") 
              data[rowIndex].imgActiveCheckBox.src = "activecheckbox.png";
            else 
              data[rowIndex].imgActiveCheckBox.src = "inactivecheckbox.png";
            if (data[rowIndex].lblSegRowName.text !== "Select All" && data[rowIndex].lblSegRowName.text !== "All") {
              if (data[0].imgActiveCheckBox.src === "activecheckbox.png")
                data[0].imgActiveCheckBox.src = "inactivecheckbox.png";
            }
            if(data[rowIndex].lblSegRowName.text === "Select All" || data[rowIndex].lblSegRowName.text === "All"){
              if(data[rowIndex].imgActiveCheckBox.src === "activecheckbox.png"){
                for(var i = 1; i < data.length; i++)
                  data[i].imgActiveCheckBox.src = "activecheckbox.png";               
              }
              else{
                for(var i = 1; i < data.length; i++)
                  data[i].imgActiveCheckBox.src = "inactivecheckbox.png"; 
              }
            }
            var selectAll2=0;
            var selectAll3=0;
            for(var z = 0;z < data.length; z++){
              if(data[1].lblSegRowName.text === "New"){
                if( data[z].imgActiveCheckBox.src === "activecheckbox.png" && data[0].imgActiveCheckBox.src === "inactivecheckbox.png"){
                  selectAll2++;
                }
              }
              else if(data[1].lblSegRowName.text === "USD"){
                if( data[z].imgActiveCheckBox.src === "activecheckbox.png" && data[0].imgActiveCheckBox.src === "inactivecheckbox.png"){
                  selectAll3++;
                }
              }
            }
            if(selectAll2 === 2){
              data[0].imgActiveCheckBox.src = "activecheckbox.png";
            }
            if(selectAll3 === 4){
              data[0].imgActiveCheckBox.src = "activecheckbox.png";
            }
            scope.view[segName].setData(data);
            scope.filterSegment2DataCount = 0;
            for(i=0; i < data.length; i++){
              if(data[i].imgActiveCheckBox.src === "activecheckbox.png")
                scope.filterSegment2DataCount ++;
            }
          }
          scope.applyFilterButtonEnable();
        }
        else{
          if(data[rowIndex].imgActiveCheckBox.src === ""){
            data[rowIndex].imgActiveCheckBox.src = "tickmark_green.png";
            data[rowIndex].imgActiveCheckBox.isVisible = true;
            for(var i = 0; i < data.length; i++){
              if(i !== rowIndex){
                data[i].imgActiveCheckBox.isVisible = false;
                data[i].imgActiveCheckBox.src = "";
              }
            }
          }
          if(data[rowIndex].lblSegRowName.text === "Custom Period" || data[rowIndex].lblSegRowName.text === "Custom Date Range"){
            if(data[rowIndex].imgActiveCheckBox.src === "tickmark_green.png"){
              data[rowIndex].flxSegSep.isVisible = false;
              scope.view.flxCustomPeriod.setVisibility(true);
            }
          }
          else
            scope.view.flxCustomPeriod.setVisibility(false);
          scope.view[segName].setData(data);
        }

      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "searchFilterRowOnClick",
              "error": err
            };
      }
    },

    /**
      * @api : applyFilterButtonEnable
      * This method will enable and disable applyfilter button
      * @return : NA
      */
    applyFilterButtonEnable: function(){
      var scope = this;
      try{
        if (scope.frmType === "ExportLC" || (scope.frmType === "ImportDrawings" && scope.drawingTabStatus === "NewPending")){
          if (scope.filterSegment1DataCount > 0 && scope.filterSegment2DataCount > 0) 
            scope.filterButtonEnable(true);
          else 
            scope.filterButtonEnable(false);
        } 
        else if (scope.frmType === "ImportLC" || (scope.frmType === "ImportDrawings" && scope.drawingTabStatus === "Completed")) {
          if (scope.filterSegment1DataCount > 0) 
            scope.filterButtonEnable(true);
          else 
            scope.filterButtonEnable(false);
        }
      }
      catch(err){
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "applyFilterButtonEnable",
              "error": err
            };
      }

    },

    /**
      * @api : importLCSelectedFilterData
      * This method will update selected filterdata in service criteria
      * @return : NA
      */
    importLCSelectedFilterData: function(){
      var scope = this;
      try{
        scope.selectedLCFilterData = [];
        scope.selectedTimeFilterData = [];
        var filtersData = scope.ServiceParametersViewDetails.Transactions.Criteria;
        var filterSegment1 = scope.view.filterSegment1.data;
        var filterSegment2 = scope.view.filterSegment2.data;
        var filterSegment3 = scope.view.filterSegment3.data;
        scope.ServiceParametersViewDetails.Transactions.Criteria.sortByParam = "lcCreatedOn";
        scope.ServiceParametersViewDetails.Transactions.Criteria.filterByValue = "";
        scope.ServiceParametersViewDetails.Transactions.Criteria.filterByParam = "";
        scope.ServiceParametersViewDetails.Transactions.Criteria.fromDateFilter = "";
        scope.ServiceParametersViewDetails.Transactions.Criteria.toDateFilter = "";
        scope.ServiceParametersViewDetails.Transactions.Criteria.timeValue = "";
        scope.ServiceParametersViewDetails.Transactions.Criteria.timeParam = "";
        for(var z = 0; z < filterSegment1.length; z++){
          if(filterSegment1[z].lblSegRowName.text !== "Select All" && filterSegment1[z].imgActiveCheckBox.src === "activecheckbox.png"){
            filtersData.filterByValue += filterSegment1[z].lblSegRowName.text + ",";
            filtersData.filterByParam += "paymentTerms" + ",";
          }
        }
        if(filtersData.filterByValue !== ""){
          filtersData.filterByValue = filtersData.filterByValue.slice(0, -1);
          filtersData.filterByParam = filtersData.filterByParam.slice(0, -1);
        }
        var selectedTimeFilter;
        var currentDate = new Date();
        var startDate,endDate;
        for(var l=0; l < filterSegment3.length; l++){
          if(filterSegment3[l].imgActiveCheckBox.src === "tickmark_green.png"){
            selectedTimeFilter = filterSegment3[l].lblSegRowName.text;
            if(filterSegment3[l].lblSegRowName.text === "Custom Period"){
              startDate = scope.view.txtbxCustomStartDate.text;
              endDate = scope.view.txtbxCustomEndDate.text;
              filtersData.fromDateFilter = new Date(startDate).toLocaleDateString('fr-CA');
              filtersData.toDateFilter = new Date(endDate).toLocaleDateString('fr-CA');
            }
          }
        }
        switch(selectedTimeFilter){     
          case "Today":
            endDate = scope.dateFormatting(currentDate);
            startDate = scope.dateFormatting(new Date(currentDate.setDate(currentDate.getDate() - 1)));
            filtersData.timeValue = "1,DAY";
            filtersData.timeParam = "lcCreatedOn";
            break;
          case "Last One Month":
            endDate = scope.dateFormatting(currentDate);
            startDate = scope.dateFormatting(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
            filtersData.timeValue = "1,MONTH";
            filtersData.timeParam = "lcCreatedOn";
            break;
          case "Last Six Months":
            endDate = scope.dateFormatting(currentDate);
            startDate = scope.dateFormatting(new Date(currentDate.setMonth(currentDate.getMonth() - 6)));
            filtersData.timeParam = "lcCreatedOn";
            filtersData.timeValue = "6,MONTH";
            break;
          case "Last One Year":
            endDate = scope.dateFormatting(currentDate);
            startDate = scope.dateFormatting(new Date(currentDate.setYear(currentDate.getYear() - 1)));
            filtersData.timeParam = "lcCreatedOn";
            filtersData.timeValue = "1,YEAR";
            break;
        }
        scope.isFilterApplied = true;
        scope.selectedLCFilterData = scope.view.filterSegment1.data
        scope.selectedTimeFilterData = scope.view.filterSegment3.data;
        scope.changeFlexVisibility("ImportLCSearchFilters", "ImportLCViewDetails");
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "importLCSelectedFilterData",
              "error": err
            };
      }
    },

    /**
      * @api : dateFormatting
      * Method to check correct date formate
      * @return : valid date formate
      */
    dateFormatting: function(dateInput){
      var scope = this;
      try{
        var dd = dateInput.getDate();
        var mm = dateInput.getMonth() + 1;
        var yyyy = dateInput.getFullYear();
        if (dd < 10) 
          dd = '0' + dd;
        if (mm < 10) 
          mm = '0' + mm;
        return dateInput = yyyy + '-' + mm + '-' + dd;
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "dateFormatting",
              "error": err
            };
      }
    },

    /**
      * @api : setExportLCTypeFilterData
      * set segmentdata for ExportLC SearchFilter
      * @return : NA
      */
    setExportLCTypeFilterData: function(){
      var scope = this;
      try{
        scope.selectedLCFilterData =[];
        var exportLCTypeSegmentData = [
          {lblSegRowName:{text :scope.businessController.getDataBasedOnDataMapping("All",scope.dataMappingSearchFilter),isVisible:true},
           imgActiveCheckBox:{src:"activecheckbox.png", isVisible:true},
           flxLCType:{onClick:scope.searchFilterRowOnClick.bind(this, "filterSegment1", "selectAll")}
          },{lblSegRowName:{text :scope.businessController.getDataBasedOnDataMapping("Sight",scope.dataMappingSearchFilter), isVisible:true},
             imgActiveCheckBox:{src:"activecheckbox.png", isVisible:true},
             flxLCType:{onClick:scope.searchFilterRowOnClick.bind(this, "filterSegment1", "widgetLabel")}
            },{lblSegRowName:{text :scope.businessController.getDataBasedOnDataMapping("Acceptance",scope.dataMappingSearchFilter), isVisible:true},
               imgActiveCheckBox:{src:"activecheckbox.png", isVisible:true},
               flxLCType:{onClick:scope.searchFilterRowOnClick.bind(this, "filterSegment1", "widgetLabel")}
              },{lblSegRowName:{text : scope.businessController.getDataBasedOnDataMapping("Deferred",scope.dataMappingSearchFilter), isVisible:true},
                 imgActiveCheckBox:{src:"activecheckbox.png", isVisible:true},
                 flxLCType:{onClick:scope.searchFilterRowOnClick.bind(this, "filterSegment1", "widgetLabel")}
                },{lblSegRowName:{text :scope.businessController.getDataBasedOnDataMapping("Negotiation Sight",scope.dataMappingSearchFilter), isVisible:true},
                   imgActiveCheckBox:{src:"activecheckbox.png", isVisible:true},
                   flxLCType:{onClick:scope.searchFilterRowOnClick.bind(this, "filterSegment1", "widgetLabel")}
                  },{lblSegRowName:{text :scope.businessController.getDataBasedOnDataMapping("Negotiation Acceptance",scope.dataMappingSearchFilter), isVisible:true},
                     imgActiveCheckBox:{src:"activecheckbox.png", isVisible:true},
                     flxLCType:{onClick:scope.searchFilterRowOnClick.bind(this, "filterSegment1", "widgetLabel")},
                     flxSegSep:{isVisible:false}
                    }
        ];
        scope.view.filterSegment1.setData(exportLCTypeSegmentData);
        scope.filterSegment1DataCount = exportLCTypeSegmentData.length;
        scope.selectedLCFilterData = exportLCTypeSegmentData;
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setExportLCTypeFilterData",
              "error": err
            };
      }
    },

    /**
      * @api : setCurrencyData
      * set segmentdata for ExportLC SearchFilter
      * @return : NA
      */
    setCurrencyData: function(){
      var scope = this;
      try{
        scope.selectedStatusFilterData =[];
        var exportLCCurrencySegmentData = [
          {lblSegRowName:{text :scope.businessController.getDataBasedOnDataMapping("All",scope.dataMappingSearchFilter), isVisible:true},
           imgActiveCheckBox:{src:"activecheckbox.png", isVisible:true},
           flxFilterByStatus:{onClick:scope.searchFilterRowOnClick.bind(this, "filterSegment2", "selectAll")}
          },{lblSegRowName:{text :"USD", isVisible:true},
             imgActiveCheckBox:{src:"activecheckbox.png", isVisible:true},
             flxFilterByStatus:{onClick:scope.searchFilterRowOnClick.bind(this, "filterSegment2", "widgetLabel")}
            },{lblSegRowName:{text :"EUR", isVisible:true},
               imgActiveCheckBox:{src:"activecheckbox.png", isVisible:true},
               flxFilterByStatus:{onClick:scope.searchFilterRowOnClick.bind(this, "filterSegment2", "widgetLabel")}
              },{lblSegRowName:{text :"CHF", isVisible:true},
                 imgActiveCheckBox:{src:"activecheckbox.png", isVisible:true},
                 flxFilterByStatus:{onClick:scope.searchFilterRowOnClick.bind(this, "filterSegment2", "widgetLabel")}
                },{lblSegRowName:{text :"INR", isVisible:true},
                   imgActiveCheckBox:{src:"activecheckbox.png", isVisible:true},
                   flxFilterByStatus:{onClick:scope.searchFilterRowOnClick.bind(this, "filterSegment2", "widgetLabel")},
                   flxSegSep:{isVisible:false}
                  }
        ];
        scope.view.filterSegment2.setData(exportLCCurrencySegmentData);
        scope.filterSegment2DataCount = exportLCCurrencySegmentData.length;
        scope.selectedStatusFilterData = exportLCCurrencySegmentData;
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setCurrencyData",
              "error": err
            };
      }
    },

    /**
      * @api : setExportLCTimePeriodData
      * set segmentdata for ExportLC SearchFilter
      * @return : NA
      */
    setExportLCTimePeriodData: function(){
      var scope = this;
      try{
        scope.selectedTimeFilterData = [];
        var exportLCTimePeriodSegmentData = [
          {lblSegRowName:{text :scope.businessController.getDataBasedOnDataMapping("Last Six Months",scope.dataMappingSearchFilter), isVisible:true},
           imgActiveCheckBox:{src:"tickmark_green.png", isVisible:true, height : 18, width : 18},flxSegSep :{isVisible:true},
           flxSegTimePeriod:{onClick:scope.searchFilterRowOnClick.bind(scope, "filterSegment3", "widgetLabel")}
          },{lblSegRowName:{text :scope.businessController.getDataBasedOnDataMapping("Today",scope.dataMappingSearchFilter), isVisible:true },
             imgActiveCheckBox:{src:"", isVisible:false, height : 18, width : 18},flxSegSep :{isVisible:true},
             flxSegTimePeriod:{onClick:scope.searchFilterRowOnClick.bind(scope, "filterSegment3", "widgetLabel")}
            },{lblSegRowName:{text :scope.businessController.getDataBasedOnDataMapping("Last One Month",scope.dataMappingSearchFilter), isVisible:true},
               imgActiveCheckBox:{src:"", isVisible:false, height : 18, width : 18},flxSegSep :{isVisible:true},
               flxSegTimePeriod:{onClick:scope.searchFilterRowOnClick.bind(scope, "filterSegment3", "widgetLabel")}
              },{lblSegRowName:{text :scope.businessController.getDataBasedOnDataMapping("Last One Year",scope.dataMappingSearchFilter), isVisible:true},
                 imgActiveCheckBox:{src:"", isVisible:false, height : 18, width : 18},flxSegSep :{isVisible:true},
                 flxSegTimePeriod:{onClick:scope.searchFilterRowOnClick.bind(scope, "filterSegment3", "widgetLabel")}
                }
        ];
        scope.view.filterSegment3.removeAll();
        scope.view.filterSegment3.setData(exportLCTimePeriodSegmentData);
        scope.view.forceLayout();
        scope.selectedTimeFilterData = exportLCTimePeriodSegmentData;
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setExportLCTimePeriodData",
              "error": err
            };
      }
    },

    /**
      * @api : exportLCSelectedFilterData
      * This method will be invoke on Apply filter button
      * @return : NA
      */
    exportLCSelectedFilterData: function(){
      var scope = this;
      try{
        scope.selectedLCFilterData = [];
        scope.selectedStatusFilterData = [];
        scope.selectedTimeFilterData = [];
        scope.filtervalues = [];
        scope.currencyFiltervalues = [];
        scope.timefiltervalues = [];
        for (var i = 0; i < scope.view.filterSegment1.data.length; i++) {
          if (scope.view.filterSegment1.data[i].imgActiveCheckBox.src === "activecheckbox.png" && scope.view.filterSegment1.data[i].lblSegRowName.text !== "All")
            scope.filtervalues.push(scope.view.filterSegment1.data[i].lblSegRowName.text);
        }
        for (var i = 0; i < scope.view.filterSegment2.data.length; i++) {
          if (scope.view.filterSegment2.data[i].imgActiveCheckBox.src === "activecheckbox.png" && scope.view.filterSegment2.data[i].lblSegRowName.text !== "All")
            scope.currencyFiltervalues.push(scope.view.filterSegment2.data[i].lblSegRowName.text);
        }
        for (var i = 0; i < scope.view.filterSegment3.data.length; i++) {
          if (scope.view.filterSegment3.data[i].imgActiveCheckBox.src === "tickmark_green.png") {
            var currdate = new Date();
            currdate = scope.getCurrentDate();
            if(scope.view.filterSegment3.data[i].lblSegRowName.text === "Last Six Months")
              scope.timefiltervalues.push(scope.formatDate(scope.addMonths(currdate,-6)),currdate);
            else if(scope.view.filterSegment3.data[i].lblSegRowName.text === "Today")
              scope.timefiltervalues.push(scope.formatDate(scope.addMonths(currdate,0)),currdate);
            else if(scope.view.filterSegment3.data[i].lblSegRowName.text === "Last One Month")
              scope.timefiltervalues.push(scope.formatDate(scope.addMonths(currdate,-1)),currdate);
            else if(scope.view.filterSegment3.data[i].lblSegRowName.text === "Last One Year")
              scope.timefiltervalues.push(scope.formatDate(scope.addMonths(currdate,-12)),currdate);
            else if(scope.view.filterSegment3.data[i].lblSegRowName.text === "Custom Date Range")
              scope.timefiltervalues.push(scope.view.txtbxCustomStartDate.text,scope.view.txtbxCustomEndDate.text);
          }
        }
        var filteredData=scope.getFilterResult(scope.exportData, scope.filtervalues, scope.currencyFiltervalues, scope.timefiltervalues);
        scope.setSegExportLCViewDetailsData(filteredData);
        scope.selectedLCFilterData = scope.view.filterSegment1.data;
        scope.selectedStatusFilterData = scope.view.filterSegment2.data;
        scope.selectedTimeFilterData = scope.view.filterSegment3.data;
        scope.changeFlexVisibility("ImportLCSearchFilters", "ImportLCViewDetails");
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "exportLCSelectedFilterData",
              "error": err
            }
        }
    },

      /**
      * @api : importDrawingsSelectedFilterData
      * This method will be invoke on Apply filter button
      * @return : NA
      */
    importDrawingsSelectedFilterData: function(){
      var scope = this;
      try{
        scope.selectedLCFilterData = [];
        scope.selectedTimeFilterData = [];
        scope.selectedStatusFilterData = [];
        scope.filtervalues = [];
        scope.timefiltervalues = [];
        scope.ServiceParametersViewDetails.Transactions.Object = "LCImportDrawing";
        scope.ServiceParametersViewDetails.Transactions.Verb = "getImportLCDrawings";
        var filtersData = scope.ServiceParametersViewDetails.Transactions.Criteria;
        var filterSegment1 = scope.view.filterSegment1.data;
        var filterSegment2 = scope.view.filterSegment2.data;
        var filterSegment3 = scope.view.filterSegment3.data;
        scope.ServiceParametersViewDetails.Transactions.Criteria.sortByParam = "drawingCreationDate";
        scope.ServiceParametersViewDetails.Transactions.Criteria.filterByValue = "";
        scope.ServiceParametersViewDetails.Transactions.Criteria.filterByParam = "";
        scope.ServiceParametersViewDetails.Transactions.Criteria.fromDateFilter = "";
        scope.ServiceParametersViewDetails.Transactions.Criteria.toDateFilter = "";
        scope.ServiceParametersViewDetails.Transactions.Criteria.timeValue = "";
        scope.ServiceParametersViewDetails.Transactions.Criteria.timeParam = "";
        for(var z = 0; z < filterSegment1.length; z++){
          if(filterSegment1[z].lblSegRowName.text !== "Select All" && filterSegment1[z].imgActiveCheckBox.src === "activecheckbox.png"){
            filtersData.filterByValue += filterSegment1[z].lblSegRowName.text + ",";
            filtersData.filterByParam += "lcType" + ",";
          }
        }
        if(scope.drawingTabStatus === "NewPending"){
          for(var k = 0; k < filterSegment2.length; k++){
            if(filterSegment2[k].lblSegRowName.text !== "Select All" && filterSegment2[k].imgActiveCheckBox.src === "activecheckbox.png"){
              filtersData.filterByValue += filterSegment2[k].lblSegRowName.text + ",";
              filtersData.filterByParam += "status" + ",";                      
            }
          }
        }
        if(filtersData.filterByValue !== ""){
          filtersData.filterByValue = filtersData.filterByValue.slice(0, -1);
          filtersData.filterByParam = filtersData.filterByParam.slice(0, -1);
        }
        var selectedTimeFilter;
        var currentDate = new Date();
        var startDate,endDate;
        for(var l=0; l < filterSegment3.length; l++){
          if(filterSegment3[l].imgActiveCheckBox.src === "tickmark_green.png"){
            selectedTimeFilter = filterSegment3[l].lblSegRowName.text;
            if(filterSegment3[l].lblSegRowName.text === "Custom Period"){
              startDate = scope.view.txtbxCustomStartDate.text;
              endDate = scope.view.txtbxCustomEndDate.text;
              filtersData.fromDateFilter = new Date(startDate).toLocaleDateString('fr-CA');
              filtersData.toDateFilter = new Date(endDate).toLocaleDateString('fr-CA');
            }
          }
        }
        switch(selectedTimeFilter){     
          case "Today":
            endDate = scope.dateFormatting(currentDate);
            startDate = scope.dateFormatting(new Date(currentDate.setDate(currentDate.getDate() - 1)));
            filtersData.timeValue = "1,DAY";
            filtersData.timeParam = "drawingCreationDate";
            break;
          case "Last One Month":
            endDate = scope.dateFormatting(currentDate);
            startDate = scope.dateFormatting(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
            filtersData.timeValue = "1,MONTH";
            filtersData.timeParam = "drawingCreationDate";
            break;
          case "Last Six Months":
            endDate = scope.dateFormatting(currentDate);
            startDate = scope.dateFormatting(new Date(currentDate.setMonth(currentDate.getMonth() - 6)));
            filtersData.timeParam = "drawingCreationDate";
            filtersData.timeValue = "6,MONTH";
            break;
          case "Last One Year":
            endDate = scope.dateFormatting(currentDate);
            startDate = scope.dateFormatting(new Date(currentDate.setYear(currentDate.getYear() - 1)));
            filtersData.timeParam = "drawingCreationDate";
            filtersData.timeValue = "1,YEAR";
            break;
        }
        scope.isFilterApplied = true;
        scope.selectedLCFilterData = scope.view.filterSegment1.data;
        scope.selectedStatusFilterData = scope.view.filterSegment2.data;
        scope.selectedTimeFilterData = scope.view.filterSegment3.data;
        scope.changeFlexVisibility("ImportLCSearchFilters", "ImportLCViewDetails");
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "importDrawingsSelectedFilterData",
              "error": err
            }
        }
    },

    /**
      * @api : getCurrentDate
      * This method used to get current date
      * @return : current date
      */
    getCurrentDate: function() {
      var scope = this;
      try{
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        return today;
      }
      catch(err){
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "getCurrentDate",
              "error": err
            }
        }
    },

    /**
      * @api : addMonths
      * Adds specfied number of months to current date
      * @return : current date
      */
    addMonths: function(date,months){
      var scope = this;
      try{
        var date = new Date();
        date.setMonth(date.getMonth() + months);
        return date;
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "addMonths",
              "error": err
            }
        }
    },

    /**
      * @api : formatDate
      * Method to formate date in required foramt
      * @return : formated date
      */
    formatDate: function(date) {
      var scope = this;
      try{
        var formatdate = new Date();
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0');
        var yyyy = date.getFullYear();
        formatdate = mm + '/' + dd + '/' + yyyy;
        return formatdate;
      }
     catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "formatDate",
              "error": err
            }
        }
    },

    /**
      * @api : checkIfDateinBetween
      * Method to check given date in between dates
      * @return : boolean value
      */
    checkIfDateinBetween: function(issueDate,expiryDate,dateToCheck) {
      var scope = this;
      try{
        var splittedIssueDate = issueDate.split("/");
        var splittedExpiryDateList = expiryDate.split("/");
        var splittedDateToCheck = dateToCheck.split("/");
        var formattedIssueDate = new Date(parseInt(splittedIssueDate[2]),splittedIssueDate[0]-1, splittedIssueDate[1]);
        var formattedExpiryDate = new Date(parseInt(splittedExpiryDateList[2]),splittedExpiryDateList[0]-1, splittedExpiryDateList[1]);
        var formattedDateToCheck = new Date(parseInt(splittedDateToCheck[2]),splittedDateToCheck[0]-1, splittedDateToCheck[1]);
        if (formattedDateToCheck >= formattedIssueDate && formattedDateToCheck <= formattedExpiryDate) 
          return true;
        else 
          return false;
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "checkIfDateinBetween",
              "error": err
            }
        }
    },  

    /**
      * @api : setfilterMockData
      * Method to set Mockdata for ExportLC filters 
      * @return : NA
      */
    setfilterMockData: function(ExportLCData){
      var scope = this;
      try{
        scope.exportData = [];
        var data = {};
        for (var i = 0; i < 12; i++) {
          data[i] = {
            "applicantDetails": ExportLCData[i].applicantDetails,
            "lcReferenceNo": ExportLCData[i].lcReferenceNo,
            "lcType": ExportLCData[i].lcType,
            "expiryDate": ExportLCData[i].expiryDate,
            "lcAmount": ExportLCData[i].lcAmount,
            "lcCreatedOn": ExportLCData[i].lcCreatedOn,
            "beneficiaryName": ExportLCData[i].beneficiaryName,
            "lblLCDataValue2": ExportLCData[i].issueDate,
            "lblLCDataValue3": ExportLCData[i].latestShippingDate,
            "lblLCDataValue4": ExportLCData[i].descriptionOfGoods,
            "applicantAddress": ExportLCData[i].applicantAddress,
            "issuingbankName": ExportLCData[i].issuingbankName,
            "issuingBankAddress": ExportLCData[i].issuingBankAddress,
            "beneficiaryAddress": ExportLCData[i].beneficiaryAddress,
            "additionalConditions": ExportLCData[i].additionalConditions,
            "confirmationInstruction": ExportLCData[i].confirmationInstruction,
            "documentName": ExportLCData[i].documentName,
            "messageType": ExportLCData[i].messageType,
            "deliveredToFrom": ExportLCData[i].deliveredToFrom,
            "deliveredDate": ExportLCData[i].deliveredDate,
            "messageCategory": ExportLCData[i].messageCategory,
            "Currency": ExportLCData[i].Currency,
            "paymentTerms" : ExportLCData[i].paymentTerms
          }
          scope.exportData.push(data[i]);
        }
      }
      catch(err){
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setfilterMockData",
              "error": err
            }
        }
    },

    /**
      * @api : getFilterResult
      * This method is used to store ExportLC filtered Data
      * @return : filtered data
      */
    getFilterResult: function(exportData, searchValues, currencyValues, timeValues) {
      var scope = this;
      try{
        if(searchValues.length > 0 || timeValues.length > 0 || currencyValues.length > 0){
          var lcTypeFilterOutput = exportData.filter(el => {
            return searchValues.find(element => {
              return element === el.lcType;
            });
          });
          if(searchValues.length === 0)  
            lcTypeFilterOutput = exportData;
          var currencyFilterOutput = lcTypeFilterOutput.filter(el => {
            return currencyValues.find(element => {
              return element === el.Currency;
            });
          });
          if(currencyValues.length === 0) 
            currencyFilterOutput = lcTypeFilterOutput;
          var timeFilterOutput;
          if(timeValues.length === 0)   
            timeFilterOutput = currencyFilterOutput;  
          else{
            timeFilterOutput = currencyFilterOutput.filter(el => {
              return scope.checkIfDateinBetween(timeValues[0],timeValues[1],el.expiryDate);
            });
          }                  
          return timeFilterOutput;
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "getFilterResult",
              "error": err
            }
        }
    },    

    /**
      * @api : customStartDateSkinChange
      * Method to change StartDate textbox skins
      * @return : NA
      */
    customStartDateSkinChange: function(){
      var scope = this;
      try{
        scope.view.txtbxCustomStartDate.skin = "ICSknTxtBox424242NoBorderSSPRegular28PX";
        scope.view.flxStartDateSeparator.skin = "ICSknFlx003E75BlueMb";
        scope.view.txtbxCustomEndDate.skin = "ICSknTxtBoxPlaceholder727272NoBorderSSPRegular64PX";
        scope.view.flxCustomEndDateSeparator.skin = "sknFlxe3e3e3Shadow";
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "customStartDateSkinChange",
              "error": err
            }
        }
    },

    /**
      * @api : customEndDateFocusSkinChange
      * Method to change EndDate textbox skins
      * @return : NA
      */
    customEndDateFocusSkinChange: function(){
      var scope = this;
      try{
        scope.view.txtbxCustomEndDate.skin = "ICSknTxtBox424242NoBorderSSPRegular28PX";
        scope.view.flxCustomEndDateSeparator.skin = "ICSknFlx003E75BlueMb";
        scope.view.txtbxCustomStartDate.skin = "ICSknTxtBoxPlaceholder727272NoBorderSSPRegular64PX";
        scope.view.flxStartDateSeparator.skin = "sknFlxe3e3e3Shadow";
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "customEndDateFocusSkinChange",
              "error": err
            }
        }
    }
  };
});