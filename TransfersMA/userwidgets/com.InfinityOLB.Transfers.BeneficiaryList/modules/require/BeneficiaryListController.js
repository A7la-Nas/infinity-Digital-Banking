define(['CacheUtils','./BeneficiaryListDAO','./ParserUtilsManager','./FormatUtils','./EntitlementUtils','CommonUtilities'],function(CacheUtils,BeneficiaryListDAO,ParserUtilsManager,FormatUtils,EntitlementUtils,CommonUtilities) {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
          this.BeneficiaryListDAO = new BeneficiaryListDAO();
          this.ParserUtilsManager = new ParserUtilsManager();
          this.FormatUtils = new FormatUtils();
          this.EntitlementUtils = new EntitlementUtils();

          // Beneficiary Management Services.
          this._accountsObject = "";
          this._accountsObjectService = "";
          this._accountsGETOperation = "";
          this._accountsGETCriteria = "";
          this._accountsGETIdentifier = "";
          this._accountsDELETEOperation = "";
          this._accountsDELETECriteria = "";
          this._accountsDELETEIdentifier = "";
          this._p2pObjectService = "";
          this._p2pObject = "";
          this._p2pGETOperation = "";
          this._p2pGETCriteria = "";
          this._p2pGETIdentifier = "";
          this._p2pDELETEOperation = "";
          this._p2pDELETECriteria = "";
          this._p2pDELETEIdentifier = "";
          this._p2pSearchCriteria = "";
          this._accountsSearchObjectService = "",
          this._accountsSearchObject = "";
          this._accountsSearchOperation = "";
          this._accountsSearchCriteria = "";
          this._accountsSearchIdentifier = "";

          // Component Configs.
          this._BNFTYPES = "";
          this._BREAKPTS = "";

          // General Properties.
          this._blockTitle = "";
          this._isP2PVisible = "";
          this._isSearchEnabled = "";
          this._recordsPerPage = "";
          this._isBeneficiaryTypeIconVisible = "";
          this._emptyListAction = "";
          this._emptyListLabel = "";

          // Filter Tab Properties.
          this._filterTab1 = "";
          this._filterTab2 = "";

          // Search Properties.
          this._placeHolderSearch = "";
          this._iconSearch = "";

          // Icons & Images.
          this._iconRowExpand = "";
          this._iconRowCollapse = "";
          this._iconPaginationPrevious = "";
          this._iconPaginationNext = "";
          this._iconColumnSort = "";
          this._iconColumnSortAsc = "";
          this._iconColumnSortDsc = "";
          this._isp2pActive = "";
          this._isp2pEntitled = "";

          // Date Properties.
          this._dateFormat = "";
          this._backendDateFormat = "";

          // Data Grid-Tab1. 
          this._dataGridColumn1Tab1 = "";
          this._dataGridColumn2Tab1 = "";
          this._dataGridColumn3Tab1 = "";
          this._dataGridColumn4Tab1 = "";
          this._dataGridColumn5Tab1 = "";
          this._dataGridColumn6Tab1 = "";

          // Data Grid-Tab2.
          this._dataGridColumn1Tab2 = "";
          this._dataGridColumn2Tab2 = "";
          this._dataGridColumn3Tab2 = "";
          this._dataGridColumn4Tab2 = "";
          this._dataGridColumn5Tab2 = "";
          this._dataGridColumn6Tab2 = "";

          // Additional Details Tab1 Properties.
          this._additionalDetailsLabel1Tab1 = "";
          this._additionalDetailsLabel2Tab1 = "";
          this._additionalDetailsLabel3Tab1 = "";
          this._additionalDetailsLabel4Tab1 = "";
          this._additionalDetailsLabel5Tab1 = "";
          this._additionalDetailsLabel6Tab1 = "";
          this._additionalDetailsLabel7Tab1 = "";
          this._additionalDetailsLabel8Tab1 = "";
          this._additionalDetailsLabel9Tab1 = "";
          this._additionalDetailsValue1Tab1 = "";
          this._additionalDetailsValue2Tab1 = "";
          this._additionalDetailsValue3Tab1 = "";
          this._additionalDetailsValue4Tab1 = "";
          this._additionalDetailsValue5Tab1 = "";
          this._additionalDetailsValue6Tab1 = "";
          this._additionalDetailsValue7Tab1 = "";
          this._additionalDetailsValue8Tab1 = "";
          this._additionalDetailsValue9Tab1 = "";
          this._additionalDetailsType1Tab1 = "";
          this._additionalDetailsType2Tab1 = "";
          this._additionalDetailsType3Tab1 = "";
          this._additionalDetailsType4Tab1 = "";
          this._additionalDetailsType5Tab1 = "";
          this._additionalDetailsType6Tab1 = "";
          this._additionalDetailsType7Tab1 = "";
          this._additionalDetailsType8Tab1 = "";
          this._additionalDetailsType9Tab1 = "";
          this._additionalDetailsAction1Tab1 = "";
          this._additionalDetailsAction2Tab1 = "";
          this._additionalDetailsAction3Tab1 = "";
          this._additionalDetailsAction4Tab1 = "";
          this._additionalDetailsAction5Tab1 = "";
          this._additionalDetailsAction6Tab1 = "";
          this._additionalDetailsAction7Tab1 = "";
          this._additionalDetailsAction8Tab1 = "";
          this._additionalDetailsAction9Tab1 = "";

          // Additional Details Tab2 Properties.
          this._additionalDetailsLabel1Tab2 = "";
          this._additionalDetailsLabel2Tab2 = "";
          this._additionalDetailsLabel3Tab2 = "";
          this._additionalDetailsLabel4Tab2 = "";
          this._additionalDetailsLabel5Tab2 = "";
          this._additionalDetailsLabel6Tab2 = "";
          this._additionalDetailsLabel7Tab2 = "";
          this._additionalDetailsLabel8Tab2 = "";
          this._additionalDetailsLabel9Tab2 = "";
          this._additionalDetailsValue1Tab2 = "";
          this._additionalDetailsValue2Tab2 = "";
          this._additionalDetailsValue3Tab2 = "";
          this._additionalDetailsValue4Tab2 = "";
          this._additionalDetailsValue5Tab2 = "";
          this._additionalDetailsValue6Tab2 = "";
          this._additionalDetailsValue7Tab2 = "";
          this._additionalDetailsValue8Tab2 = "";
          this._additionalDetailsValue9Tab2 = "";
          this._additionalDetailsType1Tab2 = "";
          this._additionalDetailsType2Tab2 = "";
          this._additionalDetailsType3Tab2 = "";
          this._additionalDetailsType4Tab2 = "";
          this._additionalDetailsType5Tab2 = "";
          this._additionalDetailsType6Tab2 = "";
          this._additionalDetailsType7Tab2 = "";
          this._additionalDetailsType8Tab2 = "";
          this._additionalDetailsType9Tab2 = "";
          this._additionalDetailsAction1Tab2 = "";
          this._additionalDetailsAction2Tab2 = "";
          this._additionalDetailsAction3Tab2 = "";
          this._additionalDetailsAction4Tab2 = "";
          this._additionalDetailsAction5Tab2 = "";
          this._additionalDetailsAction6Tab2 = "";
          this._additionalDetailsAction7Tab2 = "";
          this._additionalDetailsAction8Tab2 = "";
          this._additionalDetailsAction9Tab2 = "";

          // SKINS.
          this._sknFilterActiveTab = "";
          this._sknFilterActiveTabHover = "";
          this._sknFilterInactiveTab = "";
          this._sknFilterInactiveTabHover = "";
          this._sknTableHeader = "";
          this._sknTableHeaderText = "";
          this._sknRowExpanded = "";
          this._sknRowHover = "";
          this._sknRowSeperator = "";
          this._sknValueField = "";
          this._sknActionButtons = "";
          this._sknAdditionalDetailsLabel = "";
          this._sknAdditionalDetailsValue = "";
          this._sknAdditionalDetailsButton = "";
          this._sknBlockTitle = "";
          this._sknSearchTextBox = "";
          this._sknSearchPlaceHolderTextBox = "";
          this._sknSearchTextBoxFocus = "";
          this._sknBusinessPayee = "";
          this._sknPersonalPayee = "";
          this._sknSearchIcon = "";
          this._sknValueField1Mobile = "";
          this._sknValueField2Mobile = "";

          // CONTROLLER VARIABLES.
          this._context = "";
          this._parentScope = "";
          this._currentTab = "";
          this._currentPage = 1;
          this._currentOrder = "asc";
          this._currentSorting = "default";
          this._maxColumnLimit = 4;
          this._backendResponse = {};
          this._backendResponseP2P = {};
          this.formattingJSON = {};
          this._responseRoutePathTab1 = "";
          this._responseRoutePathTab2 = "";
          this._refreshComponent=true;
          this._showTab="Tab1";
          this._searchResult = false;
          
          //cache params
          this._AccountSearchFields = "";
          this._AccountfilterParam = "";
          this._AccountSortParams="";
          this._P2PSearchField=""
          this._P2PFilterParams="";
          this._P2PSortParams="";
          this._searchPerformed=false;
    },
    
		// Logic for getters/setters of custom properties.
		initGettersSetters: function() {
          defineSetter(this, "accountsGETOperation", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._accountsGETOperation=val;
            }
          });
          defineGetter(this, "accountsGETOperation", function() {
            return this._accountsGETOperation;
          });

          defineSetter(this, "accountsObject", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._accountsObject=val;
            }
          });
          defineGetter(this, "accountsObject", function() {
            return this._accountsObject;
          });

          defineSetter(this, "accountsObjectService", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._accountsObjectService=val;
            }
          });
          defineGetter(this, "accountsObjectService", function() {
            return this._accountsObjectService;
          });

          defineSetter(this, "accountsGETCriteria", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._accountsGETCriteria=val;
            }
          });
          defineGetter(this, "accountsGETCriteria", function() {
            return this._accountsGETCriteria;
          });

          defineSetter(this, "accountsGETIdentifier", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._accountsGETIdentifier=val;
            }
          });
          defineGetter(this, "accountsGETIdentifier", function() {
            return this._accountsGETIdentifier;
          });

          defineSetter(this, "accountsDELETEOperation", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._accountsDELETEOperation=val;
            }
          });
          defineGetter(this, "accountsDELETEOperation", function() {
            return this._accountsDELETEOperation;
          });

          defineSetter(this, "accountsDELETEIdentifier", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._accountsDELETEIdentifier=val;
            }
          });
          defineGetter(this, "accountsDELETEIdentifier", function() {
            return this._accountsDELETEIdentifier;
          });

          defineSetter(this, "accountsDELETECriteria", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._accountsDELETECriteria=val;
            }
          });
          defineGetter(this, "accountsDELETECriteria", function() {
            return this._accountsDELETECriteria;
          });

          defineSetter(this, "p2pObjectService", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._p2pObjectService=val;
            }
          });
          defineGetter(this, "p2pObjectService", function() {
            return this._p2pObjectService;
          });

          defineSetter(this, "p2pObject", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._p2pObject=val;
            }
          });
          defineGetter(this, "p2pObject", function() {
            return this._p2pObject;
          });

          defineSetter(this, "p2pGETOperation", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._p2pGETOperation=val;
            }
          });
          defineGetter(this, "p2pGETOperation", function() {
            return this._p2pGETOperation;
          });

          defineSetter(this, "p2pGETCriteria", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._p2pGETCriteria=val;
            }
          });
          defineGetter(this, "p2pGETCriteria", function() {
            return this._p2pGETCriteria;
          });

          defineSetter(this, "p2pGETIdentifier", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._p2pGETIdentifier=val;
            }
          });
          defineGetter(this, "p2pGETIdentifier", function() {
            return this._p2pGETIdentifier;
          });

          defineSetter(this, "p2pDELETEOperation", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._p2pDELETEOperation=val;
            }
          });
          defineGetter(this, "p2pDELETEOperation", function() {
            return this._p2pDELETEOperation;
          });

          defineSetter(this, "p2pDELETECriteria", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._p2pDELETECriteria=val;
            }
          });
          defineGetter(this, "p2pDELETECriteria", function() {
            return this._p2pDELETECriteria;
          });

          defineSetter(this, "p2pDELETEIdentifier", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._p2pDELETEIdentifier=val;
            }
          });
          defineGetter(this, "p2pDELETEIdentifier", function() {
            return this._p2pDELETEIdentifier;
          });

          defineSetter(this, "p2pSearchCriteria", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._p2pSearchCriteria=val;
            }
          });
          defineGetter(this, "p2pSearchCriteria", function() {
            return this._p2pSearchCriteria;
          });
          
          defineSetter(this, "accountsSearchObjectService", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._accountsSearchObjectService=val;
            }
          });
          defineGetter(this, "accountsSearchObjectService", function() {
            return this._accountsSearchObjectService;
          });
          
          defineSetter(this, "accountsSearchObject", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._accountsSearchObject=val;
            }
          });
          defineGetter(this, "accountsSearchObject", function() {
            return this._accountsSearchObject;
          });
          
          defineSetter(this, "accountsSearchOperation", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._accountsSearchOperation=val;
            }
          });
          defineGetter(this, "accountsSearchOperation", function() {
            return this._accountsSearchOperation;
          });
          
          defineSetter(this, "accountsSearchCriteria", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._accountsSearchCriteria=val;
            }
          });
          defineGetter(this, "accountsSearchCriteria", function() {
            return this._accountsSearchCriteria;
          });
          
          defineSetter(this, "accountsSearchIdentifier", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._accountsSearchIdentifier=val;
            }
          });
          defineGetter(this, "accountsSearchIdentifier", function() {
            return this._accountsSearchIdentifier;
          });
          
          defineSetter(this, "BNFTYPES", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._BNFTYPES=val;
            }
          });
          defineGetter(this, "BNFTYPES", function() {
            return this._BNFTYPES;
          });

          defineSetter(this, "BREAKPTS", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._BREAKPTS=val;
            }
          });
          defineGetter(this, "BREAKPTS", function() {
            return this._BREAKPTS;
          });

          defineSetter(this, "isP2PVisible", function(val) {
            if((typeof val === 'boolean') && (val !== "")){
              this._isP2PVisible=val;
            }
          });
          defineGetter(this, "isP2PVisible", function() {
            return this._isP2PVisible;
          });

          defineSetter(this, "isBeneficiaryTypeIconVisible", function(val) {
            if((typeof val === 'boolean') && (val !== "")){
              this._isBeneficiaryTypeIconVisible=val;
            }
          });
          defineGetter(this, "isBeneficiaryTypeIconVisible", function() {
            return this._isBeneficiaryTypeIconVisible;
          });

          defineSetter(this, "emptyListAction", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._emptyListAction=val;
            }
          });
          defineGetter(this, "emptyListAction", function() {
            return this._emptyListAction;
          });

          defineSetter(this, "emptyListLabel", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._emptyListLabel=val;
            }
          });
          defineGetter(this, "emptyListLabel", function() {
            return this._emptyListLabel;
          });

          defineSetter(this, "filterTab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._filterTab1=val;
            }
          });
          defineGetter(this, "filterTab1", function() {
            return this._filterTab1;
          });

          defineSetter(this, "filterTab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._filterTab2=val;
            }
          });
          defineGetter(this, "filterTab2", function() {
            return this._filterTab2;
          });

          defineSetter(this, "placeHolderSearch", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._placeHolderSearch=val;
            }
          });
          defineGetter(this, "placeHolderSearch", function() {
            return this._placeHolderSearch;
          });

          defineSetter(this, "iconSearch", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._iconSearch=val;
            }
          });
          defineGetter(this, "iconSearch", function() {
            return this._iconSearch;
          });

          defineSetter(this, "iconRowExpand", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._iconRowExpand=val;
            }
          });
          defineGetter(this, "iconRowExpand", function() {
            return this._iconRowExpand;
          });

          defineSetter(this, "iconRowCollapse", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._iconRowCollapse=val;
            }
          });
          defineGetter(this, "iconRowCollapse", function() {
            return this._iconRowCollapse;
          });

          defineSetter(this, "iconPaginationPrevious", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._iconPaginationPrevious=val;
            }
          });
          defineGetter(this, "iconPaginationPrevious", function() {
            return this._iconPaginationPrevious;
          });

          defineSetter(this, "iconPaginationNext", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._iconPaginationNext=val;
            }
          });
          defineGetter(this, "iconPaginationNext", function() {
            return this._iconPaginationNext;
          });

          defineSetter(this, "iconColumnSort", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._iconColumnSort=val;
            }
          });
          defineGetter(this, "iconColumnSort", function() {
            return this._iconColumnSort;
          });

          defineSetter(this, "iconColumnSortAsc", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._iconColumnSortAsc=val;
            }
          });
          defineGetter(this, "iconColumnSortAsc", function() {
            return this._iconColumnSortAsc;
          });

          defineSetter(this, "iconColumnSortDsc", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._iconColumnSortDsc=val;
            }
          });
          defineGetter(this, "iconColumnSortDsc", function() {
            return this._iconColumnSortDsc;
          });

          defineSetter(this, "isp2pActive", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._isp2pActive=val;
            }
          });
          defineGetter(this, "isp2pActive", function() {
            return this._isp2pActive;
          });

          defineSetter(this, "isp2pEntitled", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._isp2pEntitled=val;
            }
          });
          defineGetter(this, "isp2pEntitled", function() {
            return this._isp2pEntitled;
          });

          defineSetter(this, "blockTitle", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._blockTitle=val;
            }
          });
          defineGetter(this, "blockTitle", function() {
            return this._blockTitle;
          });

          defineSetter(this, "isp2pEnabled", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._isp2pEnabled=val;
            }
          });
          defineGetter(this, "isp2pEnabled", function() {
            return this._isp2pEnabled;
          });

          defineSetter(this, "isSearchEnabled", function(val) {
            if((typeof val === 'boolean') && (val !== "")){
              this._isSearchEnabled=val;
            }
          });
          defineGetter(this, "isSearchEnabled", function() {
            return this._isSearchEnabled;
          });

          defineSetter(this, "recordsPerPage", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._recordsPerPage=val;
            }
          });
          defineGetter(this, "recordsPerPage", function() {
            return this._recordsPerPage;
          });

          defineSetter(this, "dateFormat", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._dateFormat=val;
            }
          });
          defineGetter(this, "dateFormat", function() {
            return this._dateFormat;
          });

          defineSetter(this, "backendDateFormat", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._backendDateFormat=val;
            }
          });
          defineGetter(this, "backendDateFormat", function() {
            return this._backendDateFormat;
          });

          defineSetter(this, "dataGridColumn1Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._dataGridColumn1Tab1=val;
            }
          });
          defineGetter(this, "dataGridColumn1Tab1", function() {
            return this._dataGridColumn1Tab1;
          });

          defineSetter(this, "dataGridColumn2Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._dataGridColumn2Tab1=val;
            }
          });
          defineGetter(this, "dataGridColumn2Tab1", function() {
            return this._dataGridColumn2Tab1;
          });

          defineSetter(this, "dataGridColumn3Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._dataGridColumn3Tab1=val;
            }
          });
          defineGetter(this, "dataGridColumn3Tab1", function() {
            return this._dataGridColumn3Tab1;
          });

          defineSetter(this, "dataGridColumn4Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._dataGridColumn4Tab1=val;
            }
          });
          defineGetter(this, "dataGridColumn4Tab1", function() {
            return this._dataGridColumn4Tab1;
          });

          defineSetter(this, "dataGridColumn5Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._dataGridColumn5Tab1=val;
            }
          });
          defineGetter(this, "dataGridColumn5Tab1", function() {
            return this._dataGridColumn5Tab1;
          });

          defineSetter(this, "dataGridColumn6Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._dataGridColumn6Tab1=val;
            }
          });
          defineGetter(this, "dataGridColumn6Tab1", function() {
            return this._dataGridColumn6Tab1;
          });

          defineSetter(this, "dataGridColumn1Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._dataGridColumn1Tab2=val;
            }
          });
          defineGetter(this, "dataGridColumn1Tab2", function() {
            return this._dataGridColumn1Tab2;
          });

          defineSetter(this, "dataGridColumn2Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._dataGridColumn2Tab2=val;
            }
          });
          defineGetter(this, "dataGridColumn2Tab2", function() {
            return this._dataGridColumn2Tab2;
          });

          defineSetter(this, "dataGridColumn3Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._dataGridColumn3Tab2=val;
            }
          });
          defineGetter(this, "dataGridColumn3Tab2", function() {
            return this._dataGridColumn3Tab2;
          });

          defineSetter(this, "dataGridColumn4Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._dataGridColumn4Tab2=val;
            }
          });
          defineGetter(this, "dataGridColumn4Tab2", function() {
            return this._dataGridColumn4Tab2;
          });

          defineSetter(this, "dataGridColumn5Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._dataGridColumn5Tab2=val;
            }
          });
          defineGetter(this, "dataGridColumn5Tab2", function() {
            return this._dataGridColumn5Tab2;
          });

          defineSetter(this, "dataGridColumn6Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._dataGridColumn6Tab2=val;
            }
          });
          defineGetter(this, "dataGridColumn6Tab2", function() {
            return this._dataGridColumn6Tab2;
          });

          defineSetter(this, "additionalDetailsLabel1Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsLabel1Tab1=val;
            }
          });
          defineGetter(this, "additionalDetailsLabel1Tab1", function() {
            return this._additionalDetailsLabel1Tab1;
          });

          defineSetter(this, "additionalDetailsLabel2Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsLabel2Tab1=val;
            }
          });
          defineGetter(this, "additionalDetailsLabel2Tab1", function() {
            return this._additionalDetailsLabel2Tab1;
          });

          defineSetter(this, "additionalDetailsLabel3Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsLabel3Tab1=val;
            }
          });
          defineGetter(this, "additionalDetailsLabel3Tab1", function() {
            return this._additionalDetailsLabel3Tab1;
          });

          defineSetter(this, "additionalDetailsLabel4Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsLabel4Tab1=val;
            }
          });
          defineGetter(this, "additionalDetailsLabel4Tab1", function() {
            return this._additionalDetailsLabel4Tab1;
          });

          defineSetter(this, "additionalDetailsLabel5Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsLabel5Tab1=val;
            }
          });
          defineGetter(this, "additionalDetailsLabel5Tab1", function() {
            return this._additionalDetailsLabel5Tab1;
          });

          defineSetter(this, "additionalDetailsLabel6Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsLabel6Tab1=val;
            }
          });
          defineGetter(this, "additionalDetailsLabel6Tab1", function() {
            return this._additionalDetailsLabel6Tab1;
          });

          defineSetter(this, "additionalDetailsLabel7Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsLabel7Tab1=val;
            }
          });
          defineGetter(this, "additionalDetailsLabel7Tab1", function() {
            return this._additionalDetailsLabel7Tab1;
          });

          defineSetter(this, "additionalDetailsLabel8Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsLabel8Tab1=val;
            }
          });
          defineGetter(this, "additionalDetailsLabel8Tab1", function() {
            return this._additionalDetailsLabel8Tab1;
          });

          defineSetter(this, "additionalDetailsLabel9Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsLabel9Tab1=val;
            }
          });
          defineGetter(this, "additionalDetailsLabel9Tab1", function() {
            return this._additionalDetailsLabel9Tab1;
          });

          defineSetter(this, "additionalDetailsValue1Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsValue1Tab1=val;
            }
          });
          defineGetter(this, "additionalDetailsValue1Tab1", function() {
            return this._additionalDetailsValue1Tab1;
          });

          defineSetter(this, "additionalDetailsValue2Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsValue2Tab1=val;
            }
          });
          defineGetter(this, "additionalDetailsValue2Tab1", function() {
            return this._additionalDetailsValue2Tab1;
          });

          defineSetter(this, "additionalDetailsValue3Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsValue3Tab1=val;
            }
          });
          defineGetter(this, "additionalDetailsValue3Tab1", function() {
            return this._additionalDetailsValue3Tab1;
          });

          defineSetter(this, "additionalDetailsValue4Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsValue4Tab1=val;
            }
          });
          defineGetter(this, "additionalDetailsValue4Tab1", function() {
            return this._additionalDetailsValue4Tab1;
          });

          defineSetter(this, "additionalDetailsValue5Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsValue5Tab1=val;
            }
          });
          defineGetter(this, "additionalDetailsValue5Tab1", function() {
            return this._additionalDetailsValue5Tab1;
          });

          defineSetter(this, "additionalDetailsValue6Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsValue6Tab1=val;
            }
          });
          defineGetter(this, "additionalDetailsValue6Tab1", function() {
            return this._additionalDetailsValue6Tab1;
          });

          defineSetter(this, "additionalDetailsValue7Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsValue7Tab1=val;
            }
          });
          defineGetter(this, "additionalDetailsValue7Tab1", function() {
            return this._additionalDetailsValue7Tab1;
          });

          defineSetter(this, "additionalDetailsValue8Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsValue8Tab1=val;
            }
          });
          defineGetter(this, "additionalDetailsValue8Tab1", function() {
            return this._additionalDetailsValue8Tab1;
          });

          defineSetter(this, "additionalDetailsValue9Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsValue9Tab1=val;
            }
          });
          defineGetter(this, "additionalDetailsValue9Tab1", function() {
            return this._additionalDetailsValue9;
          });

          defineSetter(this, "additionalDetailsType1Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsType1Tab1=val;
            }
          });
          defineGetter(this, "additionalDetailsType1Tab1", function() {
            return this._additionalDetailsType1Tab1;
          });

          defineSetter(this, "additionalDetailsType2Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsType2Tab1=val;
            }
          });
          defineGetter(this, "additionalDetailsType2Tab1", function() {
            return this._additionalDetailsType2Tab1;
          });

          defineSetter(this, "additionalDetailsType3Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsType3Tab1=val;
            }
          });
          defineGetter(this, "additionalDetailsType3Tab1", function() {
            return this._additionalDetailsType3Tab1;
          });

          defineSetter(this, "additionalDetailsType4Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsType4Tab1=val;
            }
          });
          defineGetter(this, "additionalDetailsType4Tab1", function() {
            return this._additionalDetailsType4Tab1;
          });

          defineSetter(this, "additionalDetailsType5Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsType5Tab1=val;
            }
          });
          defineGetter(this, "additionalDetailsType5Tab1", function() {
            return this._additionalDetailsType5Tab1;
          });

          defineSetter(this, "additionalDetailsType6Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsType6Tab1=val;
            }
          });
          defineGetter(this, "additionalDetailsType6Tab1", function() {
            return this._additionalDetailsType6Tab1;
          });

          defineSetter(this, "additionalDetailsType7Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsType7Tab1=val;
            }
          });
          defineGetter(this, "additionalDetailsType7Tab1", function() {
            return this._additionalDetailsType7Tab1;
          });

          defineSetter(this, "additionalDetailsType8Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsType8Tab1=val;
            }
          });
          defineGetter(this, "additionalDetailsType8Tab1", function() {
            return this._additionalDetailsType8Tab1;
          });

          defineSetter(this, "additionalDetailsType9Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsType9Tab1=val;
            }
          });
          defineGetter(this, "additionalDetailsType9Tab1", function() {
            return this._additionalDetailsType9Tab1;
          });

          defineSetter(this, "additionalDetailsAction1Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsAction1Tab1=val;
            }
          });
          defineGetter(this, "additionalDetailsAction1Tab1", function() {
            return this._additionalDetailsAction1Tab1;
          });

          defineSetter(this, "additionalDetailsAction2Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsAction2Tab1=val;
            }
          });
          defineGetter(this, "additionalDetailsAction2Tab1", function() {
            return this._additionalDetailsAction2Tab1;
          });

          defineSetter(this, "additionalDetailsAction3Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsAction3Tab1=val;
            }
          });
          defineGetter(this, "additionalDetailsAction3Tab1", function() {
            return this._additionalDetailsAction3Tab1;
          });

          defineSetter(this, "additionalDetailsAction4Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsAction4Tab1=val;
            }
          });
          defineGetter(this, "additionalDetailsAction4Tab1", function() {
            return this._additionalDetailsAction4Tab1;
          });

          defineSetter(this, "additionalDetailsAction5Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsAction5Tab1=val;
            }
          });
          defineGetter(this, "additionalDetailsAction5Tab1", function() {
            return this._additionalDetailsAction5Tab1;
          });

          defineSetter(this, "additionalDetailsAction6Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsAction6Tab1=val;
            }
          });
          defineGetter(this, "additionalDetailsAction6Tab1", function() {
            return this._additionalDetailsAction6Tab1;
          });

          defineSetter(this, "additionalDetailsAction7Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsAction7Tab1=val;
            }
          });
          defineGetter(this, "additionalDetailsAction7Tab1", function() {
            return this._additionalDetailsAction7Tab1;
          });

          defineSetter(this, "additionalDetailsAction8Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsAction8Tab1=val;
            }
          });
          defineGetter(this, "additionalDetailsAction8Tab1", function() {
            return this._additionalDetailsAction8Tab1;
          });

          defineSetter(this, "additionalDetailsAction9Tab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsAction9Tab1=val;
            }
          });
          defineGetter(this, "additionalDetailsAction9Tab1", function() {
            return this._additionalDetailsAction9Tab1;
          });

          defineSetter(this, "additionalDetailsLabel1Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsLabel1Tab2=val;
            }
          });
          defineGetter(this, "additionalDetailsLabel1Tab2", function() {
            return this._additionalDetailsLabel1Tab2;
          });

          defineSetter(this, "additionalDetailsLabel2Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsLabel2Tab2=val;
            }
          });
          defineGetter(this, "additionalDetailsLabel2Tab2", function() {
            return this._additionalDetailsLabel2Tab2;
          });

          defineSetter(this, "additionalDetailsLabel3Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsLabel3Tab2=val;
            }
          });
          defineGetter(this, "additionalDetailsLabel3Tab2", function() {
            return this._additionalDetailsLabel3Tab2;
          });

          defineSetter(this, "additionalDetailsLabel4Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsLabel4Tab2=val;
            }
          });
          defineGetter(this, "additionalDetailsLabel4Tab2", function() {
            return this._additionalDetailsLabel4Tab2;
          });

          defineSetter(this, "additionalDetailsLabel5Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsLabel5Tab2=val;
            }
          });
          defineGetter(this, "additionalDetailsLabel5Tab2", function() {
            return this._additionalDetailsLabel5Tab2;
          });

          defineSetter(this, "additionalDetailsLabel6Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsLabel6Tab2=val;
            }
          });
          defineGetter(this, "additionalDetailsLabel6Tab2", function() {
            return this._additionalDetailsLabel6Tab2;
          });

          defineSetter(this, "additionalDetailsLabel7Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsLabel7Tab2=val;
            }
          });
          defineGetter(this, "additionalDetailsLabel7Tab2", function() {
            return this._additionalDetailsLabel7Tab2;
          });

          defineSetter(this, "additionalDetailsLabel8Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsLabel8Tab2=val;
            }
          });
          defineGetter(this, "additionalDetailsLabel8Tab2", function() {
            return this._additionalDetailsLabel8Tab2;
          });

          defineSetter(this, "additionalDetailsLabel9Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsLabel9Tab2=val;
            }
          });
          defineGetter(this, "additionalDetailsLabel9Tab2", function() {
            return this._additionalDetailsLabel9Tab2;
          });

          defineSetter(this, "additionalDetailsValue1Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsValue1Tab2=val;
            }
          });
          defineGetter(this, "additionalDetailsValue1Tab2", function() {
            return this._additionalDetailsValue1Tab2;
          });

          defineSetter(this, "additionalDetailsValue2Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsValue2Tab2=val;
            }
          });
          defineGetter(this, "additionalDetailsValue2Tab2", function() {
            return this._additionalDetailsValue2Tab2;
          });

          defineSetter(this, "additionalDetailsValue3Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsValue3Tab2=val;
            }
          });
          defineGetter(this, "additionalDetailsValue3Tab2", function() {
            return this._additionalDetailsValue3Tab2;
          });

          defineSetter(this, "additionalDetailsValue4Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsValue4Tab2=val;
            }
          });
          defineGetter(this, "additionalDetailsValue4Tab2", function() {
            return this._additionalDetailsValue4Tab1;
          });

          defineSetter(this, "additionalDetailsValue5Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsValue5Tab2=val;
            }
          });
          defineGetter(this, "additionalDetailsValue5Tab2", function() {
            return this._additionalDetailsValue5Tab2;
          });

          defineSetter(this, "additionalDetailsValue6Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsValue6Tab2=val;
            }
          });
          defineGetter(this, "additionalDetailsValue6Tab2", function() {
            return this._additionalDetailsValue6Tab2;
          });

          defineSetter(this, "additionalDetailsValue7Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsValue7Tab2=val;
            }
          });
          defineGetter(this, "additionalDetailsValue7Tab2", function() {
            return this._additionalDetailsValue7Tab1;
          });

          defineSetter(this, "additionalDetailsValue8Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsValue8Tab2=val;
            }
          });
          defineGetter(this, "additionalDetailsValue8Tab2", function() {
            return this._additionalDetailsValue8Tab2;
          });

          defineSetter(this, "additionalDetailsValue9Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsValue9Tab2=val;
            }
          });
          defineGetter(this, "additionalDetailsValue9Tab2", function() {
            return this._additionalDetailsValue9Tab2;
          });

          defineSetter(this, "additionalDetailsType1Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsType1Tab2=val;
            }
          });
          defineGetter(this, "additionalDetailsType1Tab2", function() {
            return this._additionalDetailsType1Tab2;
          });

          defineSetter(this, "additionalDetailsType2Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsType2Tab2=val;
            }
          });
          defineGetter(this, "additionalDetailsType2Tab2", function() {
            return this._additionalDetailsType2Tab2;
          });

          defineSetter(this, "additionalDetailsType3Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsType3Tab2=val;
            }
          });
          defineGetter(this, "additionalDetailsType3Tab2", function() {
            return this._additionalDetailsType3Tab2;
          });

          defineSetter(this, "additionalDetailsType4Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsType4Tab12val;
            }
          });
          defineGetter(this, "additionalDetailsType4Tab2", function() {
            return this._additionalDetailsType4Tab2;
          });

          defineSetter(this, "additionalDetailsType5Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsType5Tab2=val;
            }
          });
          defineGetter(this, "additionalDetailsType5Tab2", function() {
            return this._additionalDetailsType5Tab2;
          });

          defineSetter(this, "additionalDetailsType6Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsType6Tab2=val;
            }
          });
          defineGetter(this, "additionalDetailsType6Tab2", function() {
            return this._additionalDetailsType6Tab2;
          });

          defineSetter(this, "additionalDetailsType7Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsType7Tab2=val;
            }
          });
          defineGetter(this, "additionalDetailsType7Tab2", function() {
            return this._additionalDetailsType7Tab2;
          });

          defineSetter(this, "additionalDetailsType8Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsType8Tab2=val;
            }
          });
          defineGetter(this, "additionalDetailsType8Tab2", function() {
            return this._additionalDetailsType8Tab2;
          });

          defineSetter(this, "additionalDetailsType9Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsType9Tab2=val;
            }
          });
          defineGetter(this, "additionalDetailsType9Tab2", function() {
            return this._additionalDetailsType9Tab2;
          });

          defineSetter(this, "additionalDetailsAction1Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsAction1Tab2=val;
            }
          });
          defineGetter(this, "additionalDetailsAction1Tab2", function() {
            return this._additionalDetailsAction1Tab2;
          });

          defineSetter(this, "additionalDetailsAction2Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsAction2Tab2=val;
            }
          });
          defineGetter(this, "additionalDetailsAction2Tab2", function() {
            return this._additionalDetailsAction2Tab2;
          });

          defineSetter(this, "additionalDetailsAction3Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsAction3Tab2=val;
            }
          });
          defineGetter(this, "additionalDetailsAction3Tab2", function() {
            return this._additionalDetailsAction3Tab2;
          });

          defineSetter(this, "additionalDetailsAction4Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsAction4Tab2=val;
            }
          });
          defineGetter(this, "additionalDetailsAction4Tab2", function() {
            return this._additionalDetailsAction4Tab2;
          });

          defineSetter(this, "additionalDetailsAction5Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsAction5Tab2=val;
            }
          });
          defineGetter(this, "additionalDetailsAction5Tab2", function() {
            return this._additionalDetailsAction5Tab2;
          });

          defineSetter(this, "additionalDetailsAction6Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsAction6Tab2=val;
            }
          });
          defineGetter(this, "additionalDetailsAction6Tab2", function() {
            return this._additionalDetailsAction6Tab2;
          });

          defineSetter(this, "additionalDetailsAction7Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsAction7Tab2=val;
            }
          });
          defineGetter(this, "additionalDetailsAction7Tab2", function() {
            return this._additionalDetailsAction7Tab2;
          });

          defineSetter(this, "additionalDetailsAction8Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsAction8Tab2=val;
            }
          });
          defineGetter(this, "additionalDetailsAction8Tab2", function() {
            return this._additionalDetailsAction8Tab2;
          });

          defineSetter(this, "additionalDetailsAction9Tab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._additionalDetailsAction9Tab2=val;
            }
          });
          defineGetter(this, "additionalDetailsAction9Tab2", function() {
            return this._additionalDetailsAction9Tab2;
          });

          defineSetter(this, "sknFilterActiveTab", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._sknFilterActiveTab=val;
            }
          });
          defineGetter(this, "sknFilterActiveTab", function() {
            return this._sknFilterActiveTab;
          });

          defineSetter(this, "sknFilterActiveTabHover", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._sknFilterActiveTabHover=val;
            }
          });
          defineGetter(this, "sknFilterActiveTabHover", function() {
            return this._sknFilterActiveTabHover;
          });

          defineSetter(this, "sknFilterInactiveTab", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._sknFilterInactiveTab=val;
            }
          });
          defineGetter(this, "sknFilterInactiveTab", function() {
            return this._sknFilterInactiveTab;
          });

          defineSetter(this, "sknFilterInactiveTabHover", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._sknFilterInactiveTabHover=val;
            }
          });
          defineGetter(this, "sknFilterInactiveTabHover", function() {
            return this._sknFilterInactiveTabHover;
          });

          defineSetter(this, "sknTableHeader", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._sknTableHeader=val;
            }
          });
          defineGetter(this, "sknTableHeader", function() {
            return this._sknTableHeader;
          });

          defineSetter(this, "sknTableHeaderText", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._sknTableHeaderText=val;
            }
          });
          defineGetter(this, "sknTableHeaderText", function() {
            return this._sknTableHeaderText;
          });

          defineSetter(this, "sknRowExpanded", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._sknRowExpanded=val;
            }
          });
          defineGetter(this, "sknRowExpanded", function() {
            return this._sknRowExpanded;
          });

          defineSetter(this, "sknRowHover", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._sknRowHover=val;
            }
          });
          defineGetter(this, "sknRowHover", function() {
            return this._sknRowHover;
          });

          defineSetter(this, "sknRowSeperator", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._sknRowSeperator=val;
            }
          });
          defineGetter(this, "sknRowSeperator", function() {
            return this._sknRowSeperator;
          });

          defineSetter(this, "sknValueField", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._sknValueField=val;
            }
          });
          defineGetter(this, "sknValueField", function() {
            return this._sknValueField;
          });

          defineSetter(this, "sknActionButtons", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._sknActionButtons=val;
            }
          });
          defineGetter(this, "sknActionButtons", function() {
            return this._sknActionButtons;
          });

          defineSetter(this, "sknAdditionalDetailsButton", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._sknAdditionalDetailsButton=val;
            }
          });
          defineGetter(this, "sknAdditionalDetailsButton", function() {
            return this._sknAdditionalDetailsButton;
          });

          defineSetter(this, "sknAdditionalDetailsLabel", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._sknAdditionalDetailsLabel=val;
            }
          });
          defineGetter(this, "sknAdditionalDetailsLabel", function() {
            return this._sknAdditionalDetailsLabel;
          });

          defineSetter(this, "sknAdditionalDetailsValue", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._sknAdditionalDetailsValue=val;
            }
          });
          defineGetter(this, "sknAdditionalDetailsValue", function() {
            return this._sknAdditionalDetailsValue;
          });

          defineSetter(this, "sknBlockTitle", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._sknBlockTitle=val;
            }
          });
          defineGetter(this, "sknBlockTitle", function() {
            return this._sknBlockTitle;
          });

          defineSetter(this, "sknSearchTextBox", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._sknSearchTextBox=val;
            }
          });
          defineGetter(this, "sknSearchTextBox", function() {
            return this._sknSearchTextBox;
          });

          defineSetter(this, "sknSearchPlaceHolderTextBox", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._sknSearchPlaceHolderTextBox=val;
            }
          });
          defineGetter(this, "sknSearchPlaceHolderTextBox", function() {
            return this._sknSearchPlaceHolderTextBox;
          });

          defineSetter(this, "sknSearchTextBoxFocus", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._sknSearchTextBoxFocus=val;
            }
          });
          defineGetter(this, "sknSearchTextBoxFocus", function() {
            return this._sknSearchTextBoxFocus;
          });

          defineSetter(this, "sknBusinessPayee", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._sknBusinessPayee=val;
            }
          });
          defineGetter(this, "sknBusinessPayee", function() {
            return this._sknBusinessPayee;
          });

          defineSetter(this, "sknPersonalPayee", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._sknPersonalPayee=val;
            }
          });
          defineGetter(this, "sknPersonalPayee", function() {
            return this._sknPersonalPayee;
          });
          
          defineSetter(this, "sknSearchIcon", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._sknSearchIcon=val;
            }
          });
          defineGetter(this, "sknSearchIcon", function() {
            return this._sknSearchIcon;
          });
          
          defineSetter(this, "sknValueField1Mobile", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._sknValueField1Mobile=val;
            }
          });
          defineGetter(this, "sknValueField1Mobile", function() {
            return this._sknValueField1Mobile;
          });
          
          defineSetter(this, "sknValueField2Mobile", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._sknValueField2Mobile=val;
            }
          });
          defineGetter(this, "sknValueField2Mobile", function() {
            return this._sknValueField2Mobile;
          });

          defineSetter(this, "responseRoutePathTab1", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._responseRoutePathTab1=val;
            }
          });
          defineGetter(this, "responseRoutePathTab1", function() {
            return this._responseRoutePathTab1;
          });

          defineSetter(this, "responseRoutePathTab2", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._responseRoutePathTab2=val;
            }
          });
          defineGetter(this, "responseRoutePathTab2", function() {
            return this._responseRoutePathTab2;
          });
          defineSetter(this, "accountSearchFields", function(val) {
            if((typeof val === 'string') && (val !== "")){
             this._AccountSearchFields =val;
            }
          });
          defineGetter(this, "accountSearchFields", function() {
            return this._AccountSearchFields;
          });
           defineSetter(this, "accountfilterParam", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._AccountfilterParam=val;
            }
          });
          defineGetter(this, "accountfilterParam", function() {
            return this._AccountfilterParam;
          });
          
           defineSetter(this, "accountsortParams", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._AccountSortParams=val;
            }
          });
          defineGetter(this, "accountsortParams", function() {
            return this._AccountSortParams;
          });
          defineSetter(this, "p2pSearchFields", function(val) {
            if((typeof val === 'string') && (val !== "")){
             this._P2PSearchFields =val;
            }
          });
          defineGetter(this, "p2pSearchFields", function() {
            return this._P2PSearchField;
          });
           defineSetter(this, "p2pfilterParam", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._P2PFilterParams=val;
            }
          });
          defineGetter(this, "p2pfilterParam", function() {
            return this._P2PFilterParams;
          });
          
           defineSetter(this, "p2psortParams", function(val) {
            if((typeof val === 'string') && (val !== "")){
              this._P2PSortParams=val;
            }
          });
          defineGetter(this, "p2psortParams", function() {
            return this._P2PSortParams;
          });

    },

    /**
     * Component addOrRemoveExtraColumn.
     * Adjusts the left position and width value of the header flex container.
     */
    addOrRemoveExtraColumn : function(){
      this.view.ColumnAction.left="19.6%";
      if(this._currentTab === "Tab1"){
        
        if(this.isEmptyNullUndefined(this._dataGridColumn4Tab1))
        {
          this.view.Column4.isVisible=false;
          this.view.Column1.left="7.7%";
          this.view.Column2.left="0%";
          this.view.Column3.left="0%";
          this.view.Column4.left="0%";
          this.view.ColumnAction.left="0%";

          this.view.Column1.width="27.5%";
          this.view.Column2.width="28.6%";
          this.view.Column3.width="19.6%";
          this.view.ColumnAction.width="15%";
        }
        else
        {
          this.view.Column4.isVisible=true;
          this.view.Column1.left="7.7%";
          this.view.Column2.left="0%";
          this.view.Column3.left="0%";
          this.view.Column4.left="0%";
          this.view.ColumnAction.left="0%";

          this.view.Column1.width="20%";
          this.view.Column2.width="20%";
          this.view.Column3.width="20%";
          this.view.Column4.width="16%";
          this.view.ColumnAction.width="15%";
        }

      }
      else if(this._currentTab === "Tab2"){

        if(this.isEmptyNullUndefined(this._dataGridColumn4Tab2))
        {
          this.view.Column4.isVisible = false;
          this.view.Column1.left="7.7%";
          this.view.Column2.left="0%";
          this.view.Column3.left="0%";
          this.view.Column4.left="0%";
          this.view.ColumnAction.left="0%";

          this.view.Column1.width="27.5%";
          this.view.Column2.width="28.6%";
          this.view.Column3.width="19.6%";
          this.view.ColumnAction.width="15%";
        }
        else
        {
          this.view.Column4.isVisible = true;
          this.view.Column1.left="7.7%";
          this.view.Column2.left="0%";
          this.view.Column3.left="0%";
          this.view.Column4.left="0%";
          this.view.ColumnAction.left="0%";

          this.view.Column1.width="20%";
          this.view.Column2.width="20%";
          this.view.Column3.width="20%";
          this.view.Column4.width="16%";
          this.view.ColumnAction.width="15%";
        }

      }
    },

     /**
     * Component preShow.
     * Initialising set format value JSON.
     * Resetting images and values.
     */
      preShow: function(){
        try{
          var scope = this;
          if(this._refreshComponent){	
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.view.txtSearch.placeholder = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._placeHolderSearch)));
            this.view.txtSearch.placeholderSkin = this._sknSearchPlaceHolderTextBox;
            this.view.rtxNoPaymentMessage.text = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._emptyListLabel)["text"]));
            this.view.lblSearch.skin = this.getBreakPointTypeBasedValue(this._sknSearchIcon);
            this.setFormattingValueJSON();
            this.clearSearchText();
            this.togglePaginationVisibility(false);
            this.setComponentConfig();
            this.resetImages();
            this.resetSortAndSearchProperties();
            this.setPaginationIcons(true, false, true, false);
            this.noRecipients(false);
            this.setEntitlements();
            this.initActions();
            var defaultParams = {};
            defaultParams.sortBy = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._AccountSortParams)["sortBy"]));
            defaultParams.onUpdate = this.updateCallBack;
            defaultParams.filterParam = this._AccountfilterParam;
            //defaultParams.filterValue = this._context.filterValue 
            defaultParams.filterValue = "All"; //get from filter component
            defaultParams.pageSize = this._context.limit; // get from pagination component
            defaultParams.order = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._AccountSortParams)["sortOrder"]));
            cacheUtils = new CacheUtils(defaultParams);
          }
          else {
            scope.onBreakpointChange();
            scope.onToggle();
            }
          this.view.flxPopUpIC.doLayout = CommonUtilities.centerPopupFlex;
        }
        
        catch(err)
        {
          var errObj = {
            "errorInfo" : "Error in preshow method of the component.",
            "error": err
          };
          this.onError(errObj);
        }
        frm.customheadernew.btnSkipNav.onClick = function() {
                scope.view.lblTitle.setActive(true);
            };
          //   this.view.Column1.accessibilityConfig = {
          //     a11yLabel: "Recipient Column. No sort applied. Click to sort in ascending order",
          //     "a11yARIA": {
          //         "tabindex": 0,
          //         "role": "button"
          //     }};
          //     this.view.Column2.accessibilityConfig = {
          //         a11yLabel: "Bank Name Column. No sort applied. Click to sort in ascending order",
          //         "a11yARIA": {
          //             "tabindex": 0,
          //             "role": "button"
          //         }
          // };
          //   this.view.Column3.accessibilityConfig = {
          //     a11yLabel: "Status Column. No sort applied. Click to sort in ascending order",
          //     "a11yARIA": {
          //         "tabindex": 0,
          //         "role": "button"
          //     }};
            this.view.btnByPass.onClick = function() {
                var navManager = applicationManager.getNavigationManager();
                navManager.setCustomInfo('Focus',true)
                var frm = kony.application.getCurrentForm();
                frm.quicklinks.setContext();
            };
            if(this._showTab === "Tab1"){
              this.view.btnTab1.accessibilityConfig = {
                "a11yARIA": {
                    "aria-selected": true,
                    "role" : "tab"
                }
                };
                this.view.btnTab2.accessibilityConfig = {
                  "a11yARIA": {
                      "aria-selected": false,
                      "role" : "tab"
                  }
                  };
            } else {
              this.view.btnTab2.accessibilityConfig = {
                "a11yARIA": {
                    "aria-selected": true,
                    "role" : "tab"
                }
                };
              this.view.btnTab1.accessibilityConfig = {
                  "a11yARIA": {
                      "aria-selected": true,
                      "role" : "tab"
                  }
                  };
            }
      },
      /**
      * isCombinedUser.
      * This method returns usertype from context.
      */
      isCombinedUser: function(){
        if(this._context.isCombinedUser && this._context.isCombinedUser === "true"){
          return true;
        }else{
          return false;
        }
        
      },
      
      /**
      * setEntitlements.
      * Responsible to set the entitlements.
      */
      setEntitlements: function(){
        this.EntitlementUtils.setEntitlements(this._context);
      },
      
      /**
      * isEntitled.
      * Verifies if the user is entitled for respective features & permissions.
      */
      isEntitled: function(data){
        return this.EntitlementUtils.isEntitled(data["entitlement"]);
      },

      /**
      * initActions.
      * Responsible to initialize all the actions required in the component.
      */
      initActions: function(){
        this.view.txtSearch.onDone = this.onSearch.bind(this);
        this.view.btnConfirm.onClick  = this.onSearch.bind(this);
        this.view.btnTab1.onClick = this.accountsOnClick.bind(this);
        this.view.flxClearBtn.onClick = this.onSearchClear.bind(this);
        this.view.txtSearch.onTextChange = this.onSearchTextChange.bind(this);
        this.view.flxPaginationNextEnabled.onTouchStart = this.nextPageClick.bind(this);
        this.view.flxPaginationPreviousEnabled.onTouchStart = this.prevPageClick.bind(this);
        this.view.btnAddRecipient.onClick = this._parentScope[JSON.parse(this._emptyListAction)["action"]["method"]];
        if(this.isEntitled(JSON.parse(this._filterTab1))){
          this.view.btnTab1.setVisibility(true);
          this.view.btnTab1.onClick = this.accountsOnClick.bind(this);
          this.view.btnTab1.text = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._filterTab1)["title"]));
        } else{
          this.view.btnTab1.setVisibility(false);
        }
        if(this._isP2PVisible && this.isEntitled(JSON.parse(this._filterTab2))){
          this.view.btnTab2.setVisibility(true);
          this.view.btnTab2.onClick = this.p2pOnClick.bind(this);
          this.view.btnTab2.text = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._filterTab2)["title"]));
        } else{
          this.view.btnTab2.setVisibility(false);
        }
        if(this._isSearchEnabled){
          this.view.flxSearch.setVisibility(true);
        }
        else{
          this.view.flxSearch.setVisibility(false);
        }
      },
      
      /**
      * onSearchTextChange
      * This method is responsible for changing the visibility of clear icon
      */
      onSearchTextChange: function(){
        var searchText = this.view.txtSearch.text;
        if(searchText === ""){
          this.onSearchClear();
          this.view.flxClearBtn.setVisibility(false);
        }else{
          this.view.flxClearBtn.setVisibility(true);
        }
      },
       /*
      * onSearch.
      * This method is used to call the search service with the given string. 
      */
      onSearch: function(){
        var scope = this;
        this._searchPerformed=true;
        var searchString = scope.view.txtSearch.text;
        this.onResetPagination();
        if(this._currentTab === "Tab1"){
          var fields = JSON.parse(this._AccountSearchFields)["fields"];
          cacheUtils.applySearch(fields,searchString);
        }
        else if(this._currentTab === "Tab2"){
          var fields = JSON.parse(this._P2PSearchFields)["fields"];
          cacheUtils.applySearch(fields,searchString);
        }
      },
      onPagination: function (offset, pageSize) {
        cacheUtils.applyPagination(offset, pageSize);
      },
      /**
      * clearSearchText
      * This method is responsible for clearing the search text
      */
      clearSearchText: function(){
        this.view.txtSearch.text = "";
        this.view.flxClearBtn.setVisibility(false);
      },
      
      /**
      * togglePaginationVisibility
      * boolean {Boolean}: Visibility of pagination
      * Responsible for toggling visibility of pagination UI
      */
      togglePaginationVisibility: function(boolean){
        this.view.flxPaginationMain.setVisibility(boolean);
      },

      /**
      * setFormattingJSON.
      * Responsible to set the formatting values by taking from contracts.
      */
      setFormattingValueJSON: function(){
        var DataFormat;
        var BackendDataFormat;
        if(!this.isEmptyNullUndefined(this._dateFormat)){
          DataFormat = JSON.parse(this._dateFormat);
        }
        else{
          DataFormat = "";
        }
        if(!this.isEmptyNullUndefined(this._dateFormat)){
          BackendDataFormat = JSON.parse(this._backendDateFormat);
        }
        else{
          BackendDataFormat = "";
        }
        this.formattingJSON = {
          "dateFormat" : DataFormat,
          "backenddateformat" : BackendDataFormat
        };
      },

      /**
      * getFormattedData.
      * Responsible to get the formatted value from FormatUtils manager.
      * value{String} : value to be formatted.
      * type{String} : Type of the value.
      @return : {String} - returns the formatted value.
      */      
      getFormattedData: function(value, type){
        var data = this.FormatUtils.formatText(value, type, this.formattingJSON);
        return data?data:"-";
      },

      /**
      * setPaginationIcons.
      * Responsible to set the Pagination icons.
      * prevDisabledVisibility{boolean}: Visibilty of Previous Disabled Icon.
      * prevEnabledVisibility{boolean}: Visibilty of Previous Enabled Icon.
      * nxtEnabledVisibilty{boolean}: Visibilty of Next Enabled Icon.
      * nxtDisabledVisibility{boolean}: Visibilty of Next Disabled Icon.
      */
      setPaginationIcons: function(prevDisabledVisibility, prevEnabledVisibility, nxtEnabledVisibilty, nxtDisabledVisibility){
        this.view.flxPaginationPreviousDisabled.setVisibility(prevDisabledVisibility);
        this.view.flxPaginationPreviousEnabled.setVisibility(prevEnabledVisibility);
        this.view.flxPaginationNextEnabled.setVisibility(nxtEnabledVisibilty);
        this.view.flxPaginationNextDisabled.setVisibility(nxtDisabledVisibility);
      },

     /**
     * onColumnClick.
     * Deals with onClick of images.
     * This method is responsible for determining the critieria to be sent to sort service.
     */
      onColumnClick: function(column, image){
        var sortBy = JSON.parse(column)["sortBy"];
        var order;
        if(this.view[image].src === JSON.parse(this._iconColumnSort)["img"] || this.view[image].src === JSON.parse(this._iconColumnSortDsc)["img"]){
          order = "asc";
          this.view[image].src = JSON.parse(this._iconColumnSortAsc)["img"];
        }else if(this.view[image].src === JSON.parse(this._iconColumnSortAsc)["img"]){
          order = "desc";
          this.view[image].src = JSON.parse(this._iconColumnSortDsc)["img"];
        }
        this.resetImages(image);
        this.onResetPagination();
        cacheUtils.applySorting(sortBy,order);
        this.setPaginationIcons(true, false, true, false);
      },

    /**
     * resetImages.
     * This method resets the sorting images.
     */
      resetImages: function(imageWidget){
        for(var i=1; i<=this._maxColumnLimit; i++){
          if(imageWidget === ("imgColumn"+i)){
            continue;
          }
          this.view["imgColumn"+i].src = JSON.parse(this._iconColumnSort)["img"];
        }
      },

      /**
      * onSearchClear.
      * This method is responsible to clear the search results from the segment.
      */
      onSearchClear: function() {
        this.view.txtSearch.text = "";
        this._searchPerformed=false;
        this.clearSearchText();
        this.resetImages();
        if(this._currentTab === "Tab1"){
          var fields = JSON.parse(this._AccountSearchFields)["fields"];
          cacheUtils.applySearch(fields,"");
        }
        else if(this._currentTab === "Tab2"){
        var fields = JSON.parse(this._P2PSearchFields)["fields"];
        cacheUtils.applySearch(fields,"");
        }
        this.view.txtSearch.setActive(true);
      },

     /**
      * onSortClick.
      * This method is used to call the sort service with the given column value.
      * Service Callback - fetchBeneficiaryListCallBack, fetchP2PListCallback.
      */
      onSortClick: function(sortBy, order){
        var scope = this;
        if(this._currentTab === "Tab1"){
          var criteria = JSON.parse(this._accountsGETCriteria);
          criteria.sortBy = sortBy;
          criteria.order = order;
          scope.BeneficiaryListDAO.fetchBeneficiaryList(this._accountsObjectService,
            this._accountsGETOperation, this._accountsObject,
            criteria, scope.fetchBeneficiaryListCallBack, scope.onError);
        }else if(this._currentTab === "Tab2"){
          var criteria = JSON.parse(this._p2pGETCriteria);
          criteria.sortBy = sortBy;
          criteria.order = order;
          scope.BeneficiaryListDAO.fetchP2PBeneficiaryList(this._p2pObjectService,
            this._p2pGETOperation, this._p2pObject,
            criteria, scope.fetchP2PListCallback, scope.onError);
        }
        this._currentOrder = order;
        this._currentSorting = sortBy;
        this._currentPage = 1;
      },

      /**
      * nextPageClick.
      * This method is used to call the pagination service for next page with the offset and limit.
      * Service Callback - fetchBeneficiaryListCallBack, fetchP2PListCallback.
      */
      nextPageClick: function(){
        var scope = this;
        this.clearSearchText();
        if(this._currentTab === "Tab1"){
          var criteria = JSON.parse(this._accountsGETCriteria);
          if(this._currentSorting !== "default"){
            criteria.sortBy = this._currentSorting;
            criteria.order = this._currentOrder;
          }
          criteria.offset = (criteria.limit*(this._currentPage));
          scope.BeneficiaryListDAO.fetchBeneficiaryList(this._accountsObjectService,
            this._accountsGETOperation, this._accountsObject,
            criteria, scope.fetchBeneficiaryListCallBack, scope.onError);
        } else if(this._currentTab === "Tab2"){
          var criteria = JSON.parse(this._p2pGETCriteria);
          if(this._currentSorting !== "default"){
            criteria.sortBy = this._currentSorting;
            criteria.order = this._currentOrder;
          }
          criteria.offset = (criteria.limit*(this._currentPage));
          scope.BeneficiaryListDAO.fetchP2PBeneficiaryList(this._p2pObjectService,
            this._p2pGETOperation, this._p2pObject,
            criteria, scope.fetchP2PListCallback, scope.onError);
        }
        this._currentPage += 1;
        this.setPaginationIcons(false, true, true, false);
      },

      /**
      * prevPageClick.
      * This method is used to call the pagination service for previous page.
      * Service Callback - fetchBeneficiaryListCallBack, fetchP2PListCallback.
      */
      prevPageClick: function(){
        var scope = this;
        this.clearSearchText();
        if(this._currentTab === "Tab1"){
          var criteria = JSON.parse(this._accountsGETCriteria);
          if(this._currentSorting !== "default"){
            criteria.sortBy = this._currentSorting;
            criteria.order = this._currentOrder;
          }
          criteria.offset = (criteria.limit*(this._currentPage - 2));
          scope.BeneficiaryListDAO.fetchBeneficiaryList(this._accountsObjectService,
            this._accountsGETOperation, this._accountsObject,
            criteria, scope.fetchBeneficiaryListCallBack, scope.onError);
        } else if(this._currentTab === "Tab2"){
          var criteria = JSON.parse(this._p2pGETCriteria);
          if(this._currentSorting !== "default"){
            criteria.sortBy = this._currentSorting;
            criteria.order = this._currentOrder;
          }
          criteria.offset = (criteria.limit*(this._currentPage - 2));
          scope.BeneficiaryListDAO.fetchP2PBeneficiaryList(this._p2pObjectService,
            this._p2pGETOperation, this._p2pObject,
            criteria, scope.fetchP2PListCallback, scope.onError);
        }
        this._currentPage -= 1;
        if(criteria.offset === 0){
          this.setPaginationIcons(true, false, true, false);
        }else{
          this.setPaginationIcons(false, true, true, false);
        }
      },
      /**
      * setPageCount.
      * This method is responsible for setting the record count for pagination.
      * length: the count of the records set in the segment.
      */
      setPageCount: function(length){
        var recordsPerPage = this.getRecordsPerPage();
        if(length < recordsPerPage){
          this.setPaginationIcons(false, true, false, true);
        }
        if(length < recordsPerPage && this._currentPage === 1){
          this.setPaginationIcons(true, false, false, true);
        }
        if(length === 0){
          length = recordsPerPage;
        }
        var count = ((this._currentPage-1)*recordsPerPage + 1) + " - " + ((this._currentPage-1)*recordsPerPage + length);
        this.view.lblPagination.text = count + " Recipients";
      },
      
      /**
      * getRecordsPerPage.
      * This method is for finding the record count per page for pagination.
      * @return: the count of the records per page.
      */
      getRecordsPerPage: function(){
        if(this._currentTab === "Tab1"){
          return JSON.parse(this._accountsGETCriteria)["limit"];
        } else if(this._currentTab === "Tab2"){
          	return JSON.parse(this._p2pGETCriteria)["limit"];
        }
      },

      /**
      * setParentScope.
      * This Method is exposed to the form to pass the Form Scope.
      */
      setParentScope: function(scope){
        this._parentScope = scope;
      },
      
    /**
     * Component setContext
     * To collect the context object required for the component 
     * context{JSONobject} - account object 
     */
      setContext: function(context){
        this._context=context;
        if(this._context.entryState && Object.keys(this._context.entryState).length !== 0){
          if(this._context.entryState.refreshComponent !== undefined && this._context.entryState.refreshComponent !== "" 
             && this._context.entryState.refreshComponent !== null){
            this._refreshComponent = this._context.entryState.refreshComponent;
          }
          this._showTab = this._context.entryState.activeTab || '';
          if(this._context.entryState.showPreviousTab !== undefined && this._context.entryState.showPreviousTab === true){
            this._showTab = ICBenefLastSelectedTab;
          }
        }
      },

      /**
      * p2pOnClick.
      * Responsible to get the P2P Beneficiary data from DAO layers on click of p2p Tab.
      * Deals with setting the data.
      * Service Callback - fetchP2PListCallback.
      */
      p2pOnClick :function(){
        var scope = this;
        this.setP2PTabActive();
        var action = JSON.parse(this._filterTab2)["action"]
        this._parentScope[action.method]();
        this.addOrRemoveExtraColumn();
        this.togglePaginationVisibility(false);
        this.clearSearchText();
        this.view.Column1.onClick = this.onColumnClick.bind(this, this._dataGridColumn1Tab2, "imgColumn1");
        if(!this.isEmptyNullUndefined(this._dataGridColumn2Tab2) && !this.isEmptyNullUndefined(JSON.parse(this._dataGridColumn2Tab2)["sortBy"])){
          this.view.Column2.onClick = this.onColumnClick.bind(this, this._dataGridColumn2Tab2, "imgColumn2");
          //this.view.imgColumn2.setVisibility(true);
         // this.view.imgColumn2.toolTip = kony.i18n.getLocalizedString("i18n.payment.sortByPrimaryContact");
          }else{
          this.view.imgColumn2.setVisibility(false);
        }
        if(!this.isEmptyNullUndefined(this._dataGridColumn3Tab2) && !this.isEmptyNullUndefined(JSON.parse(this._dataGridColumn3Tab2)["sortBy"])){
          this.view.Column3.onClick = this.onColumnClick.bind(this, this._dataGridColumn3Tab2, "imgColumn3");
        // this.view.imgColumn3.setVisibility(true);
        }else{
          this.view.imgColumn3.setVisibility(false);
        }
        if(!this.isEmptyNullUndefined(this._dataGridColumn4Tab2) && !this.isEmptyNullUndefined(JSON.parse(this._dataGridColumn4Tab2)["sortBy"])){
          this.view.Column4.onClick = this.onColumnClick.bind(this, this._dataGridColumn4Tab2, "imgColumn4");
          //this.view.imgColumn4.setVisibility(true);
        }else{
          this.view.imgColumn4.setVisibility(false);
        }
        scope.BeneficiaryListDAO.fetchP2PBeneficiaryList(this._p2pObjectService,
          this._p2pGETOperation, this._p2pObject,
          JSON.parse(this._p2pGETCriteria), scope.fetchP2PListCallback, scope.onError);
        scope.setStaticDataForP2P();
        this._searchPerformed=false;
        this.resetSortAndSearchProperties();
        this.resetImages();
        this.view.btnTab2.accessibilityConfig = {
          "a11yARIA": {
              "aria-selected": true,
              "role" : "tab"
          }
          };
         this.view.btnTab1.accessibilityConfig = {
              "a11yARIA": {
                  "aria-selected": false,
                  "role" : "tab"
              }
              };
      },

      /**
      * accountsOnClick.
      * Responsible to get to Accounts Beneficiary data from DAO layers on click of Accounts Tab. 
      * Deals with setting the data. 
      */
      accountsOnClick: function(){
        var scope = this;
        this.setAccountTabActive();
        this.addOrRemoveExtraColumn();
        this.togglePaginationVisibility(false);
        this.clearSearchText();
        var action = JSON.parse(this._filterTab1)["action"]
        this._parentScope[action.method]();
        this.view.Column1.onClick = this.onColumnClick.bind(this, this._dataGridColumn1Tab1, "imgColumn1");
        if(!this.isEmptyNullUndefined(this._dataGridColumn2Tab1) && !this.isEmptyNullUndefined(JSON.parse(this._dataGridColumn2Tab1)["sortBy"])){
          this.view.Column2.onClick = this.onColumnClick.bind(this, this._dataGridColumn2Tab1, "imgColumn2");
         // this.view.imgColumn2.setVisibility(true);
          //this.view.imgColumn2.toolTip = kony.i18n.getLocalizedString("i18n.payment.sortByBankName");
        }else{
          this.view.imgColumn2.setVisibility(false);
        }
        if(!this.isEmptyNullUndefined(this._dataGridColumn3Tab1) && !this.isEmptyNullUndefined(JSON.parse(this._dataGridColumn3Tab1)["sortBy"])){
          this.view.Column3.onClick = this.onColumnClick.bind(this, this._dataGridColumn3Tab1, "imgColumn3");
          //this.view.imgColumn3.setVisibility(true);
        }else{
          this.view.imgColumn3.setVisibility(false);
        }
        if(!this.isEmptyNullUndefined(this._dataGridColumn4Tab1) && !this.isEmptyNullUndefined(JSON.parse(this._dataGridColumn4Tab1)["sortBy"])){
          this.view.Column4.onClick = this.onColumnClick.bind(this, this._dataGridColumn4Tab1, "imgColumn4");
          //this.view.imgColumn4.setVisibility(true);
        }else{
          this.view.imgColumn4.setVisibility(false);
        }
        scope.BeneficiaryListDAO.fetchBeneficiaryList(this._accountsObjectService,
          this._accountsGETOperation, this._accountsObject,
          JSON.parse(this._accountsGETCriteria), scope.fetchBeneficiaryListCallBack, scope.onError);
        scope.setStaticDataForAccounts();
        this._searchPerformed=false;
        this.resetSortAndSearchProperties();
        this.resetImages();
        this.view.btnTab1.accessibilityConfig = {
          "a11yARIA": {
              "aria-selected": true,
              "role" : "tab"
          }
          };
      this.view.btnTab2.accessibilityConfig = {
              "a11yARIA": {
                  "aria-selected": false,
                  "role" : "tab"
              }
              };
      },

      /**
      * resetSortAndSearchProperties.
      * responsible for resetting the class variables related to search and sort.
      */
      resetSortAndSearchProperties: function(){
        this.view.txtSearch.text = "";
        this._currentPage = 1;
        this._currentOrder = "asc";
        this._currentSorting = "default";
      },

      /**
      * setAccountTabActive.
      * Responsible to set the UI for Tabs on Accounts Tab Click.
      */
      setAccountTabActive: function(){
        this._currentTab = "Tab1";
        ICBenefLastSelectedTab = "Tab1";
        this.view.btnTab2.skin = this.getBreakPointTypeBasedValue(this._sknFilterInactiveTab);
        this.view.btnTab1.skin = this.getBreakPointTypeBasedValue(this._sknFilterActiveTab);
      },

      /**
      * setP2PTabActive.
      * Responsible to set the UI for Tabs on P2p Tab Click.
      */
      setP2PTabActive: function(){
        this._currentTab = "Tab2";
        ICBenefLastSelectedTab = "Tab2";
      	this.view.btnTab2.skin = this.getBreakPointTypeBasedValue(this._sknFilterActiveTab);
        this.view.btnTab1.skin = this.getBreakPointTypeBasedValue(this._sknFilterInactiveTab);
      },

      /**
      * setComponentConfig.
      * Responsible to set the component config data of beneficiary types and breakpoints in ParserUtilsManager.
      */
      setComponentConfig: function(){
        this.ParserUtilsManager.setbreakPointConfig(JSON.parse(this._BREAKPTS));
        this.ParserUtilsManager.setbeneficiaryTypesConfig(JSON.parse(this._BNFTYPES));
      },

      /**
      * setStaticDataForAccounts.
      * Responsible to set the Table Column Header text on the click of Accounts Tab.
      */
      setStaticDataForAccounts: function(){
      	this.view.lblColumn1.text = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn1Tab1)["title"]));
        if(this._dataGridColumn4Tab1){
          this.view.Column4.isVisible = true;
          this.view.lblColumn4.text = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn4Tab1)["title"]));
        }
        else{
          this.view.Column4.isVisible = false;
        }
        if(this._dataGridColumn3Tab1){
          this.view.Column3.isVisible = true;
          this.view.lblColumn3.text = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn3Tab1)["title"]));
        }
        else{
          this.view.Column3.isVisible = false;
          this.view.ColumnAction.left="19.6%";
        }
        if(this._dataGridColumn2Tab1)
        {
          this.view.Column2.isVisible = true;
          this.view.lblColumn2.text = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn2Tab1)["title"]));
        }
        else
        {
          this.view.Column2.isVisible = false;
          this.view.ColumnAction.left="48.4%";
        }
        this.view.lblColumnAction.text = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn5Tab1)["title"]));
      },

      /**
      * setStaticDataForP2P.
      * Responsible to set the Table Column Header text on the click of P2P Tab.
      */
      setStaticDataForP2P: function(){
      	this.view.lblColumn1.text = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn1Tab2)["title"]));
        if(this._dataGridColumn4Tab2){
		  this.view.Column4.isVisible = true;	
          this.view.lblColumn4.text = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn4Tab2)["title"]));
        }
        else{
          this.view.Column4.isVisible = false;
        }
        if(this._dataGridColumn3Tab2){
          this.view.Column3.isVisible = true;
          this.view.lblColumn3.text = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn3Tab2)["title"]));
        }
        else{
          this.view.Column3.isVisible = false;
          this.view.ColumnAction.left="19.6%";
        }
        if(this._dataGridColumn2Tab2){
          this.view.Column2.isVisible = true;
          this.view.lblColumn2.text = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn2Tab2)["title"]));
        }
        else{
          this.view.Column2.isVisible = false;
          this.view.ColumnAction.left="48.6%";
        }
        this.view.lblColumnAction.text = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn5Tab1)["title"]));
      },

      /**
      * onBreakpointChange.
      * Function is triggered everytime when the breakpoint is changed.
      */
      onBreakpointChange : function(eventObj,width){
        this.onBreakpointChangeTemplate(width);
      },

      /**
      * onBreakpointChangeTemplate.
      * Responsible to get the Account Beneficiaries Data by making call to DAO layer.
      * Function is triggered everytime when the breakpoint is changed.
      * Service Callback - fetchBeneficiaryListCallBack.
      */
      onBreakpointChangeTemplate : function(width){
        var scope = this;
        var params = "";
        if(this._refreshComponent){
          this._currentTab = "Tab1";
          this.setStaticWidgetSkins();
          if(this.isEntitled(JSON.parse(this._filterTab1)) && !(this._showTab == "Tab2")){
            this.accountsOnClick();
            this.view.btnTab1.text = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._filterTab1)["title"]));
          }else if(this._isP2PVisible && this.isEntitled(JSON.parse(this._filterTab2))){
            this.view.btnTab2.text = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._filterTab2)["title"]));
            this.p2pOnClick();
          }
          this.view.rtxNoPaymentMessage.text = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._emptyListLabel)["text"]));
          this.view.lblTitle.text = this.getBreakPointTypeBasedValue(this._blockTitle);
          this.view.lblTitle.skin = this.getBreakPointTypeBasedValue(this._sknBlockTitle);
          this.view.txtSearch.placeholder = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._placeHolderSearch)));
        }
        this._refreshComponent = true;
        this._showTab = "Tab1";
      },
      updateCallBack : function(serviceResponse,params){
        if(this._currentTab === "Tab1"){
          if(kony.application.getCurrentBreakpoint() === 640){
            this.setBeneficiaryListMobile(serviceResponse,params);
          }
          else{
            this.setBeneficiaryListDesktop(serviceResponse,params);
          }
        }else if(this._currentTab === "Tab2"){
          if(kony.application.getCurrentBreakpoint() === 640){
            this.setP2PListDataMobile(serviceResponse,params);
          }
          else{
            this.setP2PListDataDesktop(serviceResponse,params);
          }
        }
      },
      /**
      * setStaticWidgetSkins.
      * Responsible to assign the skins for static widgets.
      * 
      */
      setStaticWidgetSkins: function(){
        this.view.lblSearch.skin = this.getBreakPointTypeBasedValue(this._sknSearchIcon);
        this.view.Row1.skin = this.getBreakPointTypeBasedValue(this._sknTableHeader);
        this.view.lblColumn1.skin = this.getBreakPointTypeBasedValue(this._sknTableHeaderText);
        this.view.lblColumn2.skin = this.getBreakPointTypeBasedValue(this._sknTableHeaderText);  
        this.view.lblColumn3.skin = this.getBreakPointTypeBasedValue(this._sknTableHeaderText); 
        this.view.lblColumn4.skin = this.getBreakPointTypeBasedValue(this._sknTableHeaderText);
        this.view.lblColumnAction.skin = this.getBreakPointTypeBasedValue(this._sknTableHeaderText);
      },

      /**
      * fetchBeneficiaryListCallBack.
      * CallBack function for fetchBeneficiaryList service call and responsible for setting the segment based on the breakpoint.
      * backendResponse {Object} - object contains the service response.
      */
      fetchBeneficiaryListCallBack: function(backendResponse){
        this._backendResponse=backendResponse;
        var serviceResponse = this.getRecordsArray(this._responseRoutePathTab1,backendResponse);
        if(!serviceResponse || serviceResponse.length < 1){
          this.noRecipients(true);
          this.hidePagination();
          return;
        }else{
          this.noRecipients(false);
        }
          serviceResponse = this.getModifiedResponseData(serviceResponse);
          var defaultParams={};
          defaultParams.sortBy = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._AccountSortParams)["sortBy"]));
          defaultParams.onUpdate = this.updateCallBack;
          defaultParams.filterParam = "All"
          defaultParams.filterValue = "All"; //get from filter component
          defaultParams.pageSize = this._context.limit; // get from pagination component
          defaultParams.order = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._AccountSortParams)["sortOrder"]));
          cacheUtils = new CacheUtils(defaultParams);
          this.onResetPagination();
          cacheUtils.setData(serviceResponse);
      },

      /**
      * fetchBeneficiaryListCallBack.
      * CallBack function for fetchP2PListCallback service call.
      * response {Object} - object contains the service response.
      */
      fetchP2PListCallback: function(response){
        this._backendResponseP2P=response;
        var serviceResponse = this.getRecordsArray(this._responseRoutePathTab2,response);
        if(!serviceResponse || serviceResponse.length < 1){
          this.noRecipients(true);
          this.hidePagination();
          return;
        }else{
          this.noRecipients(false);
        }
          var defaultParams={};
          defaultParams.sortBy = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._P2PSortParams)["sortBy"]));
          defaultParams.onUpdate = this.updateCallBack;
          defaultParams.filterParam = this._P2PfilterParam;
          defaultParams.filterValue = "All"; //get from filter component
          defaultParams.pageSize = this._context.limit; // get from pagination component
          defaultParams.order = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._P2PSortParams)["order"]));
          cacheUtils = new CacheUtils(defaultParams);
          this.onResetPagination();
          cacheUtils.setData(serviceResponse);
      },

      /**
      * btnActionOnClick
      * Definition for the Action Button Click
      * responseData - Object contains the backend resposne data
      * property{stringified json} - Object Contains the contract property- 
      * eventobject {Object} - object contains widget Instance
      * context {Object} - object contains the segment Template data 
      */
      btnActionOnClick : function(responseData, property, eventobject, context){
        var scope = this;
        var data = context.widgetInfo.data;
        var index = context.rowIndex;
        var action = JSON.parse(property)["action"];
        if(action.level === "Form"){
          this._parentScope[action.method](responseData[index]); 
        }
        else{
          this.showDeletePopup(responseData,index);
        }
      },

      /**
      * showDeletePopup.
      * responsible for showing the popup for delete confirmation.
      * data {Object} - object contains segment data.
      * index {Integer} - object contains seleted segment row index. 
      */
      showDeletePopup: function(data,index){
        var scope = this;
        var form = kony.application.getCurrentForm();
        var popupObj = this.view.flxPopupsIC.clone();
        form.add(popupObj);
        popupObj.isVisible = true;
        popupObj.top = "0dp";
        popupObj.left = "0dp";
        popupObj.height = "100%";
        popupObj.width = "100%";
        popupObj.flxPopUpIC.flxCloseIC.accessibilityConfig = {
          a11yLabel: "Close this pop-up",
          a11yARIA: {
              tabindex: 0,
              role: "button"
          }
      };
      popupObj.flxPopUpIC.btnNoIC.accessibilityConfig = {
          a11yLabel: "No, don’t remove recipient",
          a11yARIA: {
              tabindex: 0,
              role: "button"
          }
      };
      popupObj.flxPopUpIC.btnYesIC.accessibilityConfig = {
          a11yLabel: "Yes, remove recipient",
          a11yARIA: {
              tabindex: 0,
              role: "button"
          }
      };
        popupObj.flxPopUpIC.flxCloseIC.onClick = function() {
          form.remove(popupObj);
          scope.view.segmentTransfers.setActive(index, 0,"flxExternalAccountsFastTransfersSelectedIC.flxSelectedRowWrapper.flxDetail.flxActions.flxbtn3.btn3")
        }
        popupObj.flxPopUpIC.btnNoIC.onClick = function() {
          form.remove(popupObj);
          scope.view.segmentTransfers.setActive(index, 0,"flxExternalAccountsFastTransfersSelectedIC.flxSelectedRowWrapper.flxDetail.flxActions.flxbtn3.btn3")
        }
        popupObj.flxPopUpIC.btnYesIC.onClick = function() {
          scope.deleteAccount(data,index);
          form.remove(popupObj);
        }
        popupObj.onKeyPress = function(eventObject, eventPayload) {
          var self = this;
          var frm = kony.application.getCurrentForm();
          if (eventPayload.keyCode === 27) {
              if (popupObj.isVisible === true) {
                  form.remove(popupObj);
                  scope.view.segmentTransfers.setActive(index, 0, "flxExternalAccountsFastTransfersSelectedIC.flxSelectedRowWrapper.flxDetail.flxActions.flxbtn3.btn3");
                      
                  }
              }
          }
        this.view.forceLayout();
        popupObj.flxPopUpIC.flxTopIC.lblHeaderIC.setActive(true);
      },

      /**
      * deleteAccount.
      * responsible for calling the delete methods based on Beneficiary Type.
      * data {Object} - object contains segment data.
      * index {Integer} - object contains seleted segment row index. 
      */
      deleteAccount: function(data,index){
        if (this._currentTab === "Tab1"){
          this.deleteExternalAccount(data,index);
        }
        else if (this._currentTab === "Tab2"){
          this.deleteP2PRecipient(data,index);
        }
      },

      /**
      * getImageOrIcon.
      * responsible for getting the img src from given contract.
      * value {JSONObject or String} - Contains the contract property.
      * @return : {string} - Processed value.
      */
      getImageOrIcon: function(value){
        try{
          var JSONValue = JSON.parse(value);
          if(JSONValue.img){
            return JSONValue.img;
          }
        }
        catch(e){
          kony.print(e);
        }
        return value;
      },

      /**
      * getRecordsArray.
      * responsible for getting the required service response from given responsePath.
      * responsePath {String} - contains the Response Route Path.
      * backendResponse {Object} - contains the serivce response.
      * @return : {Object} - Processed value. 
      */
     getRecordsArray: function(responsePath,backendResponse){
        var responseRoute = this.getProcessedText(responsePath);
        if(!this.isEmptyNullUndefined(responseRoute)){
          var res = backendResponse;
          var substr = responseRoute.split(".");
          if(substr.length > 1){
            for (i = 0 ; i < substr.length;i++){
              var serviceResponse = res[substr[i]];
              res = res[substr[i]];
            }
            return serviceResponse;
          }
          else{
            return backendResponse[responseRoute];
          }
        }
        else{
          return backendResponse;
        }
      },

      /**
      * getWidgetDataMap.
      * responsible for getting the widgetDataMap for both mobile and desktop breakpoint templates.
      * @return : {Object} - WidgetDataMap.
      */
      getWidgetDataMap: function(){
        return {
          "flxExternalAccountsFastTransfersSelectedIC": "flxExternalAccountsFastTransfersSelectedIC",
          "flxFastExternalAccountsTransfersUnselectedIC": "flxFastExternalAccountsTransfersUnselectedIC",
          "flxExternalAccountsFastTransfersMobileIC": "flxExternalAccountsFastTransfersMobileIC",
          "flxExternalAccountsFastTransfersSelectedMobileIC": "flxExternalAccountsFastTransfersSelectedMobileIC",
          "flxFastExternalAccountsTransfersUnselectedNewIC": "flxFastExternalAccountsTransfersUnselectedNewIC",
          "flxExternalAccountsFastTransfersSelectedNewIC": "flxExternalAccountsFastTransfersSelectedNewIC",
          "flxIdentifier": "flxIdentifier",
          "lblIdentifier": "lblIdentifier",
          "flxSelectedRowWrapper": "flxSelectedRowWrapper",
          "flxExternalAccountsTransfers": "flxExternalAccountsTransfers",
          "flxColumn1": "flxColumn1",
          "flxColumn2": "flxColumn2",
          "flxColumn3": "flxColumn3",
          "flxIcon": "flxIcon",
          "btnAction": "btnAction",
          "lblSeparator": "lblSeparator",
          "flxDetail": "flxDetail",
          "flxRow": "flxRow",
          "flxRow1": "flxRow1",
          "flxField1": "flxField1",
          "flxField2": "flxField2",
          "flxField3": "flxField3",
          "flxRow2": "flxRow2",
          "flxField4": "flxField4",
          "flxField5": "flxField5",
          "flxField6": "flxField6",
          "flxRow3": "flxRow3",
          "flxField7": "flxField7",
          "flxField8": "flxField8",
          "flxField9": "flxField9",
          "lblColumn1": "lblColumn1",
          "lblColumn2": "lblColumn2",
          "lblColumn3": "lblColumn3",
          "lblColumnA": "lblColumnA",
          "lblColumnB": "lblColumnB",
          "lblColumnC": "lblColumnC",
          "imgIcon": "imgIcon",
          "imgDropdown": "imgDropdown",
          "flxDropdown": "flxDropdown",
          "lblField1": "lblField1",
          "lblField2": "lblField2",
          "lblField3": "lblField3",
          "lblField4": "lblField4",
          "lblField5": "lblField5",
          "lblField6": "lblField6",
          "lblField7": "lblField7",
          "lblField8": "lblField8",
          "lblField9": "lblField9",
          "valueField1": "valueField1",
          "valueField2": "valueField2",
          "valueField3": "valueField3",
          "valueField4": "valueField4",
          "valueField5": "valueField5",
          "valueField6": "valueField6",
          "valueField7": "valueField7",
          "valueField8": "valueField8",
          "valueField9": "valueField9",
          "flxActions": "flxActions",
          "btn1": "btn1",
          "btn2": "btn2",
          "btn3": "btn3",
          "btn4": "btn4",
          "flxbtn1": "flxbtn1",
          "flxbtn2": "flxbtn2",
          "flxbtn3": "flxbtn3",
          "flxbtn4": "flxbtn4",
          "Column1": "Column1",
          "Column2": "Column2",
          "Column3": "Column3",
          "flxAction": "flxAction",
          "Column4": "Column4",
          "lblColumn4": "lblColumn4",
          "flxField10": "flxField10",
          "lblField10": "lblField10",
          "valueField10": "valueField10",
          "flxField11": "flxField11",
          "lblField11": "lblField11",
          "valueField11": "valueField11",
          "flxField12": "flxField12",
          "lblField12": "lblField12",
          "valueField12": "valueField12",
          "flxColumn1Wrapper": "flxColumn1Wrapper",
          "lblColumn1Row1": "lblColumn1Row1",
          "lblColumn1Row2": "lblColumn1Row2",
          "valuelblRowField1": "valuelblRowField1",
          "valuelblRowField2": "valuelblRowField2",
          "valuelblRowField3": "valuelblRowField3",
          "valuelblRowField4": "valuelblRowField4",
          "valuelblRowField5": "valuelblRowField5",
          "valuelblRowField6": "valuelblRowField6",
          "valuelblRowField7": "valuelblRowField7",
          "valuelblRowField8": "valuelblRowField8",
          "valuelblRowField9": "valuelblRowField9",
          "flxRowField1": "flxRowField1",
          "flxRowField2": "flxRowField2",
          "flxRowField3": "flxRowField3",
          "flxRowField4": "flxRowField4",
          "flxRowField5": "flxRowField5",
          "flxRowField6": "flxRowField6",
          "flxRowField7": "flxRowField7",
          "flxRowField8": "flxRowField8",
          "flxRowField9": "flxRowField9",
          "lblSeparator1": "lblSeparator1",
          "lblRowField1": "lblRowField1",
          "lblRowField2": "lblRowField2",
          "lblRowField3": "lblRowField3",
          "lblRowField4": "lblRowField4",
          "lblRowField5": "lblRowField5",
          "lblRowField6": "lblRowField6",
          "lblRowField7": "lblRowField7",
          "lblRowField8": "lblRowField8",
          "lblRowField9": "lblRowField9",
          "flxRowColumn4": "flxRowColumn4",
          "lblRowColumn4": "lblRowColumn4",
          "valuelblRowColumn4": "valuelblRowColumn4",
          "lblSeparatorLineAction1": "lblSeparatorLineAction1",
          "btnEdit": "btnEdit",
          "lblSeparatorLineAction2": "lblSeparatorLineAction2",
          "btnRemoveRecipient": "btnRemoveRecipient",
          "lblSeparatorLineAction3": "lblSeparatorLineAction3"
        };
      },

      /**
      * noRecipients.
      * This method is responsible for showing no beneficiary message.
      */
      noRecipients: function(boolean){
        this.view.flxsegment.setVisibility(!boolean);
        this.view.flxNoTransactions.setVisibility(boolean);
        if(this._searchResult){
          this.view.flxSearch.setVisibility(true);
          this.view.Row1.setVisibility(true);
          this.view.rtxNoPaymentMessage.text = kony.i18n.getLocalizedString('i18n.transfers.searchNoPayees');
        }
        else{
          this.view.flxSearch.setVisibility(!boolean);
          this.view.Row1.setVisibility(!boolean);
          if(this._currentTab === "Tab2"){
			this.view.rtxNoPaymentMessage.text = kony.i18n.getLocalizedString('i18n.FastTransfers.NoP2PAccounts');
          }
          else{
            this.view.rtxNoPaymentMessage.text = kony.i18n.getLocalizedString('i18n.FastTransfers.NoAccounts');
          }
        }
        this._searchResult = false;
      },

	  /**
      * setBeneficiaryListDesktop.
      * responsible for setting the Accounts Beneficiary data to the segment for desktop and tablet breakpoint.
      * response {Object} - object contains service response data.
      */	
      setBeneficiaryListDesktop: function(serviceResponse,params){
        var scope = this;
        var section = [];
        var BNFType = "";
        if(params.state === "search" || this._searchPerformed){
          this.hidePagination();
        }else{
          this.showPagination();
        }
        this.updatePaginationBar(serviceResponse.length,params.pagination.totalSize);
        if(!serviceResponse || serviceResponse.length < 1){
        	this.noRecipients(true);
            this.hidePagination();
          	return;
        }else{
          this.noRecipients(false);
        }
        var beneficiaryTypeIconVisibility = this._isBeneficiaryTypeIconVisible;
        var Field2Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel2Tab1) ? false : true;
        var Field3Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel3Tab1) ? false : true;
        var Field4Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel4Tab1) ? false : true;
        var Field5Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel5Tab1) ? false : true;
        var Field6Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel6Tab1) ? false : true;
        var Field7Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel7Tab1) ? false : true;
        var Field8Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel8Tab1) ? false : true;
        var Field9Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel9Tab1) ? false : true;
        var btn1Visibility = this.isEmptyNullUndefined(this._additionalDetailsAction1Tab1) ? false : true;
        var btn2Visibility = this.isEmptyNullUndefined(this._additionalDetailsAction2Tab1) ? false : true;
        var btn3Visibility = this.isEmptyNullUndefined(this._additionalDetailsAction3Tab1) ? false : true;
        var Column2Visibility = this.isEmptyNullUndefined(this._dataGridColumn2Tab1) ? false : true;
        var Column3Visibility = this.isEmptyNullUndefined(this._dataGridColumn3Tab1) ? false : true;
        var Column4Visibility = this.isEmptyNullUndefined(this._dataGridColumn4Tab1) ? false : true;
        var isCombinedUser = this.isCombinedUser();
        var btnActionEntitlement = this.isEntitled(JSON.parse(this._dataGridColumn5Tab1));
        var btn1Entitlement = this.isEntitled(JSON.parse(this._additionalDetailsAction1Tab1));
        var btn2Entitlement = this.isEntitled(JSON.parse(this._additionalDetailsAction2Tab1));
        var btn3Entitlement = this.isEntitled(JSON.parse(this._additionalDetailsAction3Tab1));
        for(var i = 0; i < serviceResponse.length; i++){
          var record = {};
          record["Id"] = serviceResponse[i]["Id"];
          record["isInternationalAccount"] = serviceResponse[i]["isInternationalAccount"];
          record["isSameBankAccount"] = serviceResponse[i]["isSameBankAccount"];
          record["accountNumber"] = serviceResponse[i]["accountNumber"];
          record["IBAN"] = serviceResponse[i]["IBAN"];
          record["imgDropdown"] = {
            "src" : this.getImageOrIcon(this._iconRowExpand)
          };
          if(beneficiaryTypeIconVisibility && isCombinedUser){
            record["flxIcon"] = {
            	"isVisible": true
          	};
            if(serviceResponse[i]["isBusinessPayee"] === "0"){
              record["imgIcon"] = {
            	"text": "s"
          	  };
            }else{
              record["imgIcon"] = {
            	"text": "r"
          	  };
            }
          }else{
            record["flxIcon"] = {
            	"isVisible": false
          	};
          }
          var BNFType = serviceResponse[i].beneficiaryType;
          record["lblColumn1"] = {
            "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(JSON.parse(this._dataGridColumn1Tab1)["mapping"], BNFType)], 
            this.getBeneficiaryTypeBasedValue(JSON.parse(this._dataGridColumn1Tab1)["fieldType"], BNFType)),
            "skin": this.getBreakPointTypeBasedValue(this._sknValueField)
          }
          record["lblColumnA"] = {
            "text": this.view.lblColumn1.text + " " + (this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(JSON.parse(this._dataGridColumn1Tab1)["mapping"], BNFType)], 
            this.getBeneficiaryTypeBasedValue(JSON.parse(this._dataGridColumn1Tab1)["fieldType"], BNFType)))
          }
          if(Column2Visibility){
              record["lblColumn2"] = {
              "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(JSON.parse(this._dataGridColumn2Tab1)["mapping"], BNFType)], 
              this.getBeneficiaryTypeBasedValue(JSON.parse(this._dataGridColumn2Tab1)["fieldType"], BNFType)),
              "skin": this.getBreakPointTypeBasedValue(this._sknValueField)
            }
            record["lblColumnB"] = {
              "text": this.view.lblColumn2.text + " " + (this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(JSON.parse(this._dataGridColumn2Tab1)["mapping"], BNFType)], 
              this.getBeneficiaryTypeBasedValue(JSON.parse(this._dataGridColumn2Tab1)["fieldType"], BNFType)))
            }
            record["flxColumn2"] = {
              "isVisible": true
            }
          }
          else{
            record["flxColumn2"] = {
              "isVisible": false
            }
          }
          
          record["flxDropdown"] = {
            accessibilityConfig: {
                        "a11yLabel" : "show more details for recipient" + record["lblColumn1"].text,
                        "a11yARIA": {
                            "tabindex": 0,
                            "aria-hidden" : false,
                            "role" : "button"
                        }
                    },
            onClick : scope.onToggle.bind(scope)
          }
          if(Column3Visibility){
              record["lblColumn3"] = {
              "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(JSON.parse(this._dataGridColumn3Tab1)["mapping"], BNFType)], 
              this.getBeneficiaryTypeBasedValue(JSON.parse(this._dataGridColumn3Tab1)["fieldType"], BNFType)),
              "skin": this.getBreakPointTypeBasedValue(this._sknValueField)
            }
            record["lblColumnC"] = {
              "text": this.view.lblColumn3.text + " " + (this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(JSON.parse(this._dataGridColumn3Tab1)["mapping"], BNFType)], 
              this.getBeneficiaryTypeBasedValue(JSON.parse(this._dataGridColumn3Tab1)["fieldType"], BNFType)))
            }
            record["flxColumn3"] = {
              "isVisible": true
            }
          }
          else{
            record["flxColumn3"] = {
              "isVisible": false
            }
          }
          if(Column4Visibility){
            record["lblColumn4"] = {
              "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(JSON.parse(this._dataGridColumn4Tab1)["mapping"], BNFType)], 
              this.getBeneficiaryTypeBasedValue(JSON.parse(this.dataGridColumn4Tab1)["fieldType"], BNFType)),
              "skin": this.getBreakPointTypeBasedValue(this._sknValueField)
            }
            record["flxColumn4"] = {
              "isVisible": true
            }
          }
          else{
            record["flxColumn4"] = {
              "isVisible": false
            }
          }
          if(btnActionEntitlement){
            record["btnAction"] = {
              accessibilityConfig: {
                "a11yLabel": "send money to recipient " + record["lblColumn1"].text,
                "a11yARIA": {
                    "tabindex": 0
                }
            },
            "text": this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn5Tab1)["text"])), 
            "skin": this.getBreakPointTypeBasedValue(this._sknActionButtons),
            "onClick": scope.btnActionOnClick.bind(scope, serviceResponse, this._dataGridColumn5Tab1)
          	}
          }else{
             record["btnAction"] = {
              "isVisible": false
            }
          }

          if(btn1Visibility && btn1Entitlement){
            record["btn1"] = {
              accessibilityConfig: {
                "a11yLabel": "view activity of recipient " + record["lblColumn1"].text,
                "a11yARIA": {
                    "tabindex": 0,
                    "role" : "link"
                }
            },
              "text": this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._additionalDetailsAction1Tab1)["title"])), 
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsButton),
              "onClick": scope.btnActionOnClick.bind(scope, serviceResponse, this._additionalDetailsAction1Tab1)
            }
            record["flxbtn1"] = {
              "isVisible": true
            }
          }
          else{
            record["flxbtn1"] = {
              "isVisible": false
            }
          }
          if(btn2Visibility && btn2Entitlement){
            record["btn2"] = {
              accessibilityConfig: {
                "a11yLabel": "edit recipient " + record["lblColumn1"].text,
                "a11yARIA": {
                    "tabindex": 0,
                    "role" : "link"
                }
            },
              "text": this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._additionalDetailsAction2Tab1)["title"])), 
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsButton),
              "onClick": scope.btnActionOnClick.bind(scope, serviceResponse, this._additionalDetailsAction2Tab1)
            }
            record["flxbtn2"] = {
              "isVisible": true
            }
          }
          else{
            record["flxbtn2"] = {
              "isVisible": false
            }
          }
          if(btn3Visibility && btn3Entitlement){
            record["btn3"] = {
              accessibilityConfig: {
                "a11yLabel": "remove recipient " + record["lblColumn1"].text,
                "a11yARIA": {
                    "tabindex": 0
                }
            },
              "text": this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._additionalDetailsAction3Tab1)["title"])), 
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsButton),
              "onClick": scope.btnActionOnClick.bind(scope, serviceResponse, this._additionalDetailsAction3Tab1)
            }
            record["flxbtn3"] = {
              "isVisible": true
            }
          }
          else{
            record["flxbtn3"] = {
              "isVisible": false
            }
          }
          record["lblField1"] = {
            "text": this.getBreakPointTypeBasedValue(this.getBeneficiaryTypeBasedValue(this._additionalDetailsLabel1Tab1, BNFType)),
            "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
          }
          record["valueField1"] = {
            "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(this._additionalDetailsValue1Tab1, BNFType)],
             this.getBeneficiaryTypeBasedValue(this._additionalDetailsType1Tab1, BNFType)),
            "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
          }
          if(Field2Visibility){
            record["lblField2"] = {
              "text": this.getBreakPointTypeBasedValue(this.getBeneficiaryTypeBasedValue(this._additionalDetailsLabel2Tab1, BNFType)),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
            }
            record["valueField2"] = {
              "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(this._additionalDetailsValue2Tab1, BNFType)],
               this.getBeneficiaryTypeBasedValue(this._additionalDetailsType2Tab1, BNFType)),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
            }
          }
          else{
            record["flxField2"] = {
              "isVisible": false
            }
          }
          if(Field3Visibility){
            record["lblField3"] = {
              "text": this.getBreakPointTypeBasedValue(this.getBeneficiaryTypeBasedValue(this._additionalDetailsLabel3Tab1, BNFType)),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
            }
            record["valueField3"] = {
              "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(this._additionalDetailsValue3Tab1, BNFType)],
               this.getBeneficiaryTypeBasedValue(this._additionalDetailsType3Tab1, BNFType)),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
            }

            record["valueField3"].text === "-" ? "" : record["valueField3"].text += " " + kony.i18n.getLocalizedString("i18n.contracts.customers");
          }
          else{
            record["flxField3"] = {
              "isVisible": false
            }
          }
          if(Field4Visibility || Field5Visibility || Field6Visibility){
            if(Field4Visibility){
              record["lblField4"] = {
                "text": this.getBreakPointTypeBasedValue(this.getBeneficiaryTypeBasedValue(this._additionalDetailsLabel4Tab1, BNFType)),
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
              }
              record["valueField4"] = {
                "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(this._additionalDetailsValue4Tab1, BNFType)], 
                this.getBeneficiaryTypeBasedValue(this._additionalDetailsType4Tab1, BNFType)),
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
              }
            }
            else{
              record["flxField4"] = {
                "isVisible": false
              }
            }
            if(Field5Visibility){
              record["lblField5"] = {
                "text": this.getBreakPointTypeBasedValue(this.getBeneficiaryTypeBasedValue(this._additionalDetailsLabel5Tab1, BNFType)),
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
              }
              record["valueField5"] = {
                "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(this._additionalDetailsValue5Tab1, BNFType)], 
                this.getBeneficiaryTypeBasedValue(this._additionalDetailsType5Tab1, BNFType)),
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
              }
            }
            else{
              record["flxField5"] = {
                "isVisible": false
              }
            }
            if(Field6Visibility){
              record["lblField6"] = {
                "text": this.getBreakPointTypeBasedValue(this.getBeneficiaryTypeBasedValue(this._additionalDetailsLabel6Tab1, BNFType)),
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
              }
              record["valueField6"] = {
                "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(this._additionalDetailsValue6Tab1, BNFType)],
                 this.getBeneficiaryTypeBasedValue(this._additionalDetailsType6Tab1, BNFType)),
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
              }
            }
            else{
              record["flxField6"] = {
                "isVisible": false
              }
            }
            if(Field7Visibility || Field8Visibility || Field9Visibility){
              if(Field7Visibility){
                record["lblField7"] = {
                  "text": this.getBreakPointTypeBasedValue(this.getBeneficiaryTypeBasedValue(this._additionalDetailsLabel7Tab1, BNFType)),
                  "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
                }
                record["valueField7"] = {
                  "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(this._additionalDetailsValue7Tab1, BNFType)], 
                  this.getBeneficiaryTypeBasedValue(this._additionalDetailsType7Tab1, BNFType)),
                  "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
                }
              }
              else{
                record["flxField7"] = {
                  "isVisible": false
                }
              }
              if(Field8Visibility){
                record["lblField8"] = {
                  "text": this.getBreakPointTypeBasedValue(this.getBeneficiaryTypeBasedValue(this._additionalDetailsLabel8Tab1, BNFType)),
                  "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
                }
                record["valueField8"] = {
                  "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(this._additionalDetailsValue8Tab1, BNFType)], 
                  this.getBeneficiaryTypeBasedValue(this._additionalDetailsType8Tab1, BNFType)),
                  "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
                }
              }
              else{
                record["flxField8"] = {
                  "isVisible": false
                }
              }
              if(Field9Visibility){
                record["lblField9"] = {
                  "text": this.getBreakPointTypeBasedValue(this.getBeneficiaryTypeBasedValue(this._additionalDetailsLabel9Tab1, BNFType)),
                  "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
                }
                record["valueField9"] = {
                  "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(this._additionalDetailsValue9Tab1, BNFType)],
                   this.getBeneficiaryTypeBasedValue(this._additionalDetailsType9Tab1, BNFType)),
                  "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
                }
              }
              else{
                record["flxField9"] = {
                  "isVisible": false
                }
              }
              record["flxIdentifier"] = {
                "height" : "262dp"
              }
            }
            else {
              record["flxRow3"] = {
                "isVisible": false
              }
              record["flxIdentifier"] = {
                "height" : "217dp"
              }
            }
          }
          else{
            record["flxRow2"] = {
              "isVisible": false
            }
            record["flxRow3"] = {
              "isVisible": false
            }
            record["flxIdentifier"] = {
              "height" : "158dp"
            }
          }
          if(this.isEmptyNullUndefined(this._dataGridColumn4Tab1))
          {
            record.template = "flxFastExternalAccountsTransfersUnselectedIC";
            record["flxExternalAccountsFastTransfersSelectedIC"] = {
              "skin" : this.getBreakPointTypeBasedValue(this._sknRowExpanded) 
            }
            record["flxFastExternalAccountsTransfersUnselectedIC"] = {
              "hoverSkin" : this.getBreakPointTypeBasedValue(this._sknRowHover) 
            }
          }
          else
          {
            record.template = "flxFastExternalAccountsTransfersUnselectedNewIC";
            record["flxExternalAccountsFastTransfersSelectedNewIC"] = {
              "skin" : this.getBreakPointTypeBasedValue(this._sknRowExpanded) 
            }
            record["flxFastExternalAccountsTransfersUnselectedNewIC"] = {
              "hoverSkin" : this.getBreakPointTypeBasedValue(this._sknRowHover) 
            }
          }
          section.push(record);
        }
        this.view.segmentTransfers.widgetDataMap = this.getWidgetDataMap();
        this.view.segmentTransfers.setData(section);
      },
      
      /**
      * setP2PListDataMobile.
      * responsible for setting the P2P Beneficiary data to the segment for desktop and tablet breakpoint.
      * response {Object} - contains service response data.
      */
      setP2PListDataMobile: function(serviceResponse,params){     
        var scope = this;
        var section = [];
        var scopeObj =this;
        if(params.state === "search" || this._searchPerformed){
          this.hidePagination();
        }else{
          this.showPagination();
        }
        this.updatePaginationBar(serviceResponse.length,params.pagination.totalSize);
		if(!serviceResponse || serviceResponse.length < 1){
            this.noRecipients(true);
            this.hidePagination();
            return;
          }else{
            this.noRecipients(false);
          }
        var Column2Visibility = this.isEmptyNullUndefined(this.dataGridColumn2Tab2) ? false : true;
        var Column3Visibility = this.isEmptyNullUndefined(this.dataGridColumn3Tab2) ? false : true;
        var Column4Visibility = this.isEmptyNullUndefined(this.dataGridColumn4Tab2) ? false : true;
        var Field1Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel1Tab2) ? false : true;
        var Field2Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel2Tab2) ? false : true;
        var Field3Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel3Tab2) ? false : true;
        var Field4Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel4Tab2) ? false : true;
        var Field5Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel5Tab2) ? false : true;
        var Field6Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel6Tab2) ? false : true;
        var Field7Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel7Tab2) ? false : true;
        var Field8Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel8Tab2) ? false : true;
        var Field9Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel9Tab2) ? false : true;
        var btn1Visibility = this.isEmptyNullUndefined(this._additionalDetailsAction1Tab2) ? false : true;
        var btn2Visibility = this.isEmptyNullUndefined(this._additionalDetailsAction2Tab2) ? false : true;
        var btn3Visibility = this.isEmptyNullUndefined(this._additionalDetailsAction3Tab2) ? false : true;
        var btn1Entitlement = this.isEntitled(JSON.parse(this._additionalDetailsAction1Tab2));
        var btn2Entitlement = this.isEntitled(JSON.parse(this._additionalDetailsAction2Tab2));
        var btn3Entitlement = this.isEntitled(JSON.parse(this._additionalDetailsAction3Tab2));
        var btn4Entitlement = this.isEntitled(JSON.parse(this._dataGridColumn5Tab2));
        for(var i = 0; i < serviceResponse.length; i++){
          var noOfAdditonalFields = 0;
          var record = {};
          record["PayPersonId"] = serviceResponse[i]["PayPersonId"];
          record["lblColumn1Row1"] = {
            "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(JSON.parse(this.dataGridColumn1Tab2)["mapping"])], 
            JSON.parse(this.dataGridColumn1Tab2)["fieldType"]),
            "skin": this._sknValueField1Mobile
          }
          record["imgDropdown"] = {
            "src" : this.getImageOrIcon(this._iconRowExpand)
          };
          if(Column2Visibility){
            record["lblColumn1Row2"] = {
              "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(JSON.parse(this.dataGridColumn2Tab2)["mapping"])], 
              JSON.parse(this.dataGridColumn2Tab2)["fieldType"]),
              "skin": this._sknValueField2Mobile
            }
          }
          else{
            record["lblColumn1Row2"] = {
              "isVisible": false
            }
          }	
          if(Column3Visibility){
            record["lblColumn2"] = {
              "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(JSON.parse(this.dataGridColumn3Tab2)["mapping"])], 
              JSON.parse(this.dataGridColumn3Tab2)["fieldType"]),
              "skin": this._sknValueField1Mobile
            }
          }
          else{
            record["Column2"] = {
              "isVisible": false
            }
          }
          record["flxDropdown"] = {
            accessibilityConfig: {
                        "a11yLabel" : "Show more details for recipient" + record["lblColumn1"].text,
                        "a11yARIA": {
                            "tabindex": 0,
                            "aria-hidden" : false,
                            "role" : "button"
                        }
                    },
            onClick : scopeObj.onToggleMobile.bind(scopeObj)
          }
          
          if(btn4Entitlement){
            record["btn4"] = {
              "text": this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn5Tab2)["text"])), 
              "skin": this.getBreakPointTypeBasedValue(this._sknActionButtons),
              "onClick": scope.btnActionOnClick.bind(scope, serviceResponse, this._dataGridColumn5Tab2)
            }
          } else{
             record["btn4"] = {
              "isVisible": false
            }
          }
          
          if(btn1Visibility && btn1Entitlement){
            record["btn1"] = {
              "text": this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._additionalDetailsAction1Tab2)["title"])), 
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsButton),
              "onClick": scope.btnActionOnClick.bind(scope, serviceResponse, this._additionalDetailsAction1Tab2)
            }
            record["flxbtn1"] = {
              "isVisible": true
            }
          }
          else{
            record["flxbtn1"] = {
              "isVisible": false
            }
          }
          if(btn2Visibility && btn2Entitlement){
            record["btn2"] = {
              "text": this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._additionalDetailsAction2Tab2)["title"])), 
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsButton),
              "onClick": scope.btnActionOnClick.bind(scope, serviceResponse, this._additionalDetailsAction2Tab2)
            }
            record["flxbtn2"] = {
              "isVisible": true
            }
          }
          else{
            record["flxbtn2"] = {
              "isVisible": false
            }
          }
          if(btn3Visibility && btn3Entitlement){
            record["btn3"] = {
              "text": this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._additionalDetailsAction3Tab2)["title"])), 
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsButton),
              "onClick": scope.btnActionOnClick.bind(scope, serviceResponse, this._additionalDetailsAction3Tab2)
            }
            record["flxbtn3"] = {
              "isVisible": true
            }
          }
          else{
            record["flxbtn3"] = {
              "isVisible": false
            }
          }
          if(Column4Visibility){
            noOfAdditonalFields++;
            record["lblRowColumn4"] = {
              "text": this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn4Tab2)["title"])),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
            }
            record["valuelblRowColumn4"] = {
              "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(JSON.parse(this._dataGridColumn4Tab2)["mapping"])],
              JSON.parse(this._dataGridColumn4Tab2)["fieldType"]),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
            }
            record["flxRowColumn4"] = {
              "isVisible": true
            }
          }
          else{
            record["flxRowColumn4"] = {
              "isVisible": false
            }
          }
          if(Field1Visibility){
            noOfAdditonalFields++;
            record["lblRowField1"] = {
              "text": this.getBreakPointTypeBasedValue(this._additionalDetailsLabel1Tab2),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
            }
            record["valuelblRowField1"] = {
              "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(this._additionalDetailsValue1Tab2)],
              this._additionalDetailsType1Tab2),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
            }
            record["flxRowField1"] = {
              "isVisible": true
            }
          }
          else{
            record["flxRowField1"] = {
              "isVisible": false
            }
          }
          if(Field2Visibility){
            noOfAdditonalFields++;
            record["lblRowField2"] = {
              "text": this.getBreakPointTypeBasedValue(this._additionalDetailsLabel2Tab2),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
            }
            record["valuelblRowField2"] = {
              "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(this._additionalDetailsValue2Tab2)], 
              this._additionalDetailsType2Tab2),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
            }
            record["flxRowField2"] = {
              "isVisible": true
            }
          }
          else{
            record["flxRowField2"] = {
              "isVisible": false
            }
          }
          if(Field3Visibility){
            noOfAdditonalFields++;
            record["lblRowField3"] = {
              "text": this.getBreakPointTypeBasedValue(this._additionalDetailsLabel3Tab2),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
            }
            record["valuelblRowField3"] = {
              "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(this._additionalDetailsValue3Tab2)],
               this._additionalDetailsType3Tab2),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
            }
            record["flxRowField3"] = {
              "isVisible": true
            }
          }
          else{
            record["flxRowField3"] = {
              "isVisible": false
            }
          }
          if(Field4Visibility){
            noOfAdditonalFields++;
            record["lblRowField4"] = {
              "text": this.getBreakPointTypeBasedValue(this._additionalDetailsLabel4Tab2),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
            }
            record["valuelblRowField4"] = {
              "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(this._additionalDetailsValue4Tab2)],
               this._additionalDetailsType4Tab2),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
            }
            record["flxRowField4"] = {
              "isVisible": true
            }
          }
          else{
            record["flxRowField4"] = {
              "isVisible": false
            }
          }
          if(Field5Visibility){
            noOfAdditonalFields++;
            record["lblRowField5"] = {
              "text": this.getBreakPointTypeBasedValue(this._additionalDetailsLabel5Tab2),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
            }
            record["valuelblRowField5"] = {
              "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(this._additionalDetailsValue5Tab2)],
               this._additionalDetailsType5Tab2),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
            }
            record["flxRowField5"] = {
              "isVisible": true
            }

            record["valuelblRowField5"].text === "-" ? "" : record["valuelblRowField5"].text += " " + kony.i18n.getLocalizedString("i18n.contracts.customers");
          }
          else{
            record["flxRowField5"] = {
              "isVisible": false
            }
          }
          if(Field6Visibility){
            noOfAdditonalFields++;
            record["lblRowField6"] = {
              "text": this.getBreakPointTypeBasedValue(this._additionalDetailsLabel6Tab2),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
            }
            record["valuelblRowField6"] = {
              "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(this._additionalDetailsValue6Tab2)],
               this._additionalDetailsType6Tab2),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
            }
            record["flxRowField6"] = {
              "isVisible": true
            }
          }
          else{
            record["flxRowField6"] = {
              "isVisible": false
            }
          }
          if(Field7Visibility){
            noOfAdditonalFields++;
            record["lblRowField7"] = {
              "text": this.getBreakPointTypeBasedValue(this._additionalDetailsLabel7Tab2),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
            }
            record["valuelblRowField7"] = {
              "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(this._additionalDetailsValue7Tab2)],
               this._additionalDetailsType7Tab2),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
            }
            record["flxRowField7"] = {
              "isVisible": true
            }
          }
          else{
            record["flxRowField7"] = {
              "isVisible": false
            }
          }
          if(Field8Visibility){
            noOfAdditonalFields++;
            record["lblRowField8"] = {
              "text": this.getBreakPointTypeBasedValue(this._additionalDetailsLabel8Tab2),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
            }
            record["valuelblRowField8"] = {
              "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(this._additionalDetailsValue8Tab2)],
               this._additionalDetailsType8Tab2),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
            }
            record["flxRowField8"] = {
              "isVisible": true
            }
          }
          else{
            record["flxRowField8"] = {
              "isVisible": false
            }
          }
          if(Field9Visibility){
            noOfAdditonalFields++;
            record["lblRowField9"] = {
              "text": this.getBreakPointTypeBasedValue(this._additionalDetailsLabel9Tab2),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
            }
            record["valuelblRowField9"] = {
              "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(this._additionalDetailsValue9Tab2)],
               this._additionalDetailsType9Tab2),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
            }
            record["flxRowField9"] = {
              "isVisible": true
            }
          }
          else{
            record["flxRowField9"] = {
              "isVisible": false
            }
          }
          var height = 140 + 46*noOfAdditonalFields 
          record["flxIdentifier"] = {
            "height": height + "dp"
          }
          record.template = "flxExternalAccountsFastTransfersMobileIC";
          record["flxExternalAccountsFastTransfersSelectedMobileIC"] = {
            "skin" : this.getBreakPointTypeBasedValue(this._sknRowExpanded) 
          }
          record["flxExternalAccountsFastTransfersMobileIC"] = {
            "hoverSkin" : this.getBreakPointTypeBasedValue(this._sknRowHover) 
          }
          section.push(record);
        }

        this.view.segmentTransfers.widgetDataMap = this.getWidgetDataMap();
        this.view.segmentTransfers.setData(section);
        this.setPageCount(section.length);
        this.view.forceLayout();
      },
      
      /**
      * setP2PListDataDesktop.
      * responsible for setting the P2P Beneficiary data to the segment for desktop and tablet breakpoint.
      * response {Object} - contains service response data.
      */
      setP2PListDataDesktop: function(serviceResponse,params){
          var scope = this;
          var section = [];
          var scopeObj =this;
          if(params.state === "search" || this._searchPerformed){
            this.hidePagination();
          }else{
            this.showPagination();
          }
          this.updatePaginationBar(serviceResponse.length,params.pagination.totalSize);
          if(!serviceResponse || serviceResponse.length < 1){
            this.noRecipients(true);
            this.hidePagination();
            return;
          }else{
            this.noRecipients(false);
          }
          var Column2Visibility = this.isEmptyNullUndefined(this.dataGridColumn2Tab2) ? false : true;
          var Column3Visibility = this.isEmptyNullUndefined(this.dataGridColumn3Tab2) ? false : true;
          var Field2Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel2Tab2) ? false : true;
          var Field3Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel3Tab2) ? false : true;
          var Field4Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel4Tab2) ? false : true;
          var Field5Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel5Tab2) ? false : true;
          var Field6Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel6Tab2) ? false : true;
          var Field7Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel7Tab2) ? false : true;
          var Field8Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel8Tab2) ? false : true;
          var Field9Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel9Tab2) ? false : true;
          var btn1Visibility = this.isEmptyNullUndefined(this._additionalDetailsAction1Tab2) ? false : true;
          var btn2Visibility = this.isEmptyNullUndefined(this._additionalDetailsAction2Tab2) ? false : true;
          var btn3Visibility = this.isEmptyNullUndefined(this._additionalDetailsAction3Tab2) ? false : true;
          var Column2Visibility = this.isEmptyNullUndefined(this._dataGridColumn2Tab2) ? false : true;
          var Column3Visibility = this.isEmptyNullUndefined(this._dataGridColumn3Tab2) ? false : true;
          var Column4Visibility = this.isEmptyNullUndefined(this._dataGridColumn4Tab2) ? false : true;
          var btnActionEntitlement = this.isEntitled(JSON.parse(this._dataGridColumn5Tab2));
          var btn1Entitlement = this.isEntitled(JSON.parse(this._additionalDetailsAction1Tab2));
          var btn2Entitlement = this.isEntitled(JSON.parse(this._additionalDetailsAction2Tab2));
          var btn3Entitlement = this.isEntitled(JSON.parse(this._additionalDetailsAction3Tab2));
          for(var i = 0; i < serviceResponse.length; i++){
              var record = {};
              record["PayPersonId"] = serviceResponse[i]["PayPersonId"];
              record["lblColumn1"] = {
                "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(JSON.parse(this.dataGridColumn1Tab2)["mapping"])], 
                JSON.parse(this.dataGridColumn1Tab2)["fieldType"]),
                "skin": this.getBreakPointTypeBasedValue(this._sknValueField)
              }
              record["lblColumnA"] = {
                "text": this.view.lblColumn1.text + " " + (this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(JSON.parse(this.dataGridColumn1Tab2)["mapping"])], 
                JSON.parse(this.dataGridColumn1Tab2)["fieldType"]))
              }
              record["imgDropdown"] = {
                "src" : this.getImageOrIcon(this._iconRowExpand)
              };
              if(Column2Visibility){
                record["lblColumn2"] = {
                  "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(JSON.parse(this.dataGridColumn2Tab2)["mapping"])], 
                  JSON.parse(this.dataGridColumn2Tab2)["fieldType"]),
                  "skin": this.getBreakPointTypeBasedValue(this._sknValueField)
                }
                record["lblColumnB"] = {
                  "text": this.view.lblColumn2.text + " " + (this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(JSON.parse(this.dataGridColumn2Tab2)["mapping"])], 
                  JSON.parse(this.dataGridColumn2Tab2)["fieldType"]))
                }
              }
              else{
                record["Column2"] = {
                  "isVisible": false
                }
                record["flxColumn2"] = {
                  "isVisible": false
                }
              }	
              if(Column3Visibility){
                record["lblColumn3"] = {
                  "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(JSON.parse(this.dataGridColumn3Tab2)["mapping"])], 
                  JSON.parse(this.dataGridColumn3Tab2)["fieldType"]),
                  "skin": this.getBreakPointTypeBasedValue(this._sknValueField)
                }
                record["lblColumnC"] = {
                  "text": this.view.lblColumn3.text + " " + (this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(JSON.parse(this.dataGridColumn3Tab2)["mapping"])], 
                  JSON.parse(this.dataGridColumn3Tab2)["fieldType"]))
                }
              }
              else{
                record["Column3"] = {
                  "isVisible": false
                }
                record["flxColumn3"] = {
                  "isVisible": false
                }
              }
              if(Column4Visibility){
                record["lblColumn4"] = {
                  "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(JSON.parse(this._dataGridColumn4Tab2)["mapping"])], 
                  JSON.parse(this.dataGridColumn4Tab2)["fieldType"]),
                  "skin": this.getBreakPointTypeBasedValue(this._sknValueField)
                }
                record["flxColumn4"] = {
                  "isVisible": true
                }
              }
              else{
                record["flxColumn4"] = {
                  "isVisible": false
                }
              }
              record["flxDropdown"] = {
                accessibilityConfig: {
                        "a11yLabel" : "show more details for recipient" + record["lblColumn1"].text,
                        "a11yARIA": {
                            "tabindex": 0,
                            "aria-hidden" : false,
                            "role" : "button"
                        }
                    },
                onClick : scopeObj.onToggle.bind(scopeObj)
              }
              if(btnActionEntitlement){
                record["btnAction"] = {
                  accessibilityConfig: {
                    "a11yLabel": "send money to recipient " + record["lblColumn1"].text,
                    "a11yARIA": {
                        "tabindex": 0
                    }
                },
                  "text": this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn5Tab2)["text"])),
                  "skin": this.getBreakPointTypeBasedValue(this._sknActionButtons),
                  "onClick": scope.btnActionOnClick.bind(scope, serviceResponse, this._dataGridColumn5Tab2)
                }
              } else{
                record["btnAction"] = {
                  "isVisible": false
                }
              }
              
              if(btn1Visibility && btn1Entitlement){
                record["btn1"] = {
                  accessibilityConfig: {
                    "a11yLabel": "view activity of recipient" + record["lblColumn1"].text,
                    "a11yARIA": {
                        "tabindex": 0,
                        "role": "link"
                    }
                },
                  "text": this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._additionalDetailsAction1Tab2)["title"])), 
                  "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsButton),
                  "onClick": scope.btnActionOnClick.bind(scope, serviceResponse, this._additionalDetailsAction1Tab2)
                }
                record["flxbtn1"] = {
                  "isVisible": true
                }
              }
            else{
              record["flxbtn1"] = {
                "isVisible": false
              }
            }
            if(btn2Visibility && btn2Entitlement){
              record["btn2"] = {
                accessibilityConfig: {
                  "a11yLabel": "edit recipient" + record["lblColumn1"].text,
                  "a11yARIA": {
                      "tabindex": 0,
                      "role": "link"
                  }
                },
                "text": this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._additionalDetailsAction2Tab2)["title"])), 
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsButton),
                "onClick": scope.btnActionOnClick.bind(scope, serviceResponse, this._additionalDetailsAction2Tab2)
              }
              record["flxbtn2"] = {
                "isVisible": true
              }
            }
            else{
              record["flxbtn2"] = {
                "isVisible": false
              }
            }
            if(btn3Visibility && btn3Entitlement){
              record["btn3"] = {
                accessibilityConfig: {
                  "a11yLabel": "remove recipient " + record["lblColumn1"].text,
                  "a11yARIA": {
                      "tabindex": 0
                  }
              },
                "text": this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._additionalDetailsAction3Tab2)["title"])), 
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsButton),
                "onClick": scope.btnActionOnClick.bind(scope, serviceResponse, this._additionalDetailsAction3Tab2)
              }
              record["flxbtn3"] = {
                "isVisible": true
              }
            }
            else{
              record["flxbtn3"] = {
                "isVisible": false
              }
            }
              record["lblField1"] = {
                "text": this.getBreakPointTypeBasedValue(this._additionalDetailsLabel1Tab2), 
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
              }
              record["valueField1"] = {
                "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(this._additionalDetailsValue1Tab2)],
                this._additionalDetailsType1Tab2),
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
              }
              if(Field2Visibility){
                record["lblField2"] = {
                  "text": this.getBreakPointTypeBasedValue(this._additionalDetailsLabel2Tab2), 
                  "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
                }
                record["valueField2"] = {
                  "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(this._additionalDetailsValue2Tab2)],
                  this._additionalDetailsType2Tab2),
                  "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
                }
              }
              else{
                record["flxField2"] = {
                  "isVisible": false
                }
              }
              if(Field3Visibility){
                record["lblField3"] = {
                  "text": this.getBreakPointTypeBasedValue(this._additionalDetailsLabel3Tab2),
                  "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
                }
                record["valueField3"] = {
                  "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(this._additionalDetailsValue3Tab2)],
                  this._additionalDetailsType3Tab2),
                  "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
                }
              }
              else{
                record["flxField3"] = {
                  "isVisible": false
                }
              }
              if(Field4Visibility || Field5Visibility || Field6Visibility){
                if(Field4Visibility){
                  record["lblField4"] = {
                    "text": this.getBreakPointTypeBasedValue(this._additionalDetailsLabel4Tab2),
                    "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
                  }
                  record["valueField4"] = {
                    "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(this._additionalDetailsValue4Tab2)],
                    this._additionalDetailsType4Tab2),
                    "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
                  }
                }
                else{
                  record["flxField4"] = {
                    "isVisible": false
                  }
                }
                if(Field5Visibility){
                  record["lblField5"] = {
                    "text": this.getBreakPointTypeBasedValue(this._additionalDetailsLabel5Tab2),
                    "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
                  }
                  record["valueField5"] = {
                    "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(this._additionalDetailsValue5Tab2)],
                    this._additionalDetailsType5Tab2),
                    "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
                  }

                  record["valueField5"].text === "-" ? "" : record["valueField5"].text += " " + kony.i18n.getLocalizedString("i18n.contracts.customers");
                }
                else{
                  record["flxField5"] = {
                    "isVisible": false
                  }
                }
                if(Field6Visibility){
                  record["lblField6"] = {
                    "text": this.getBreakPointTypeBasedValue(this._additionalDetailsLabel6Tab2),
                    "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
                  }
                  record["valueField6"] = {
                    "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(this._additionalDetailsValue6Tab2)],
                    this._additionalDetailsType6Tab2),
                    "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
                  }
                }
                else{
                  record["flxField6"] = {
                    "isVisible": false
                  }
                }
                if(Field7Visibility || Field8Visibility || Field9Visibility){
                  if(Field7Visibility){
                    record["lblField7"] = {
                      "text": this.getBreakPointTypeBasedValue(this._additionalDetailsLabel7Tab2),
                      "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
                    }
                    record["valueField7"] = {
                      "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(this._additionalDetailsValue7Tab2)],
                      this._additionalDetailsType7Tab2),
                      "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
                    }
                  }
                  else{
                    record["flxField7"] = {
                      "isVisible": false
                    }
                  }
                  if(Field8Visibility){
                    record["lblField8"] = {
                      "text": this.getBreakPointTypeBasedValue(this._additionalDetailsLabel8Tab2),
                      "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
                    }
                    record["valueField8"] = {
                      "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(this._additionalDetailsValue8Tab2)],
                      this._additionalDetailsType8Tab2),
                      "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
                    }
                  }
                  else{
                    record["flxField8"] = {
                      "isVisible": false
                    }
                  }
                  if(Field9Visibility){
                    record["lblField9"] = {
                      "text": this.getBreakPointTypeBasedValue(this._additionalDetailsLabel9Tab2),
                      "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
                    }
                    record["valueField9"] = {
                      "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(this._additionalDetailsValue9Tab2)],
                      this._additionalDetailsType9Tab2),
                      "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
                    }
                  }
                  else{
                    record["flxField9"] = {
                      "isVisible": false
                    }
                  }
                  record["flxIdentifier"] = {
                    "height" : "262dp"
                  }
                }
                else {
                  record["flxRow3"] = {
                    "isVisible": false
                  }
                  record["flxIdentifier"] = {
                    "height" : "217dp"
                  }
                }
              }
              else{
                record["flxRow2"] = {
                  "isVisible": false
                }
                record["flxRow3"] = {
                  "isVisible": false
                }
                record["flxIdentifier"] = {
                  "height" : "158dp"
                }
              }
              if(this.isEmptyNullUndefined(this._dataGridColumn4Tab2))
              {
                record.template = "flxFastExternalAccountsTransfersUnselectedIC";
                record["flxExternalAccountsFastTransfersSelectedIC"] = {
                  "skin" : this.getBreakPointTypeBasedValue(this._sknRowExpanded) 
                }
                record["flxFastExternalAccountsTransfersUnselectedIC"] = {
                  "hoverSkin" : this.getBreakPointTypeBasedValue(this._sknRowHover) 
                }
              }
              else
              {
                record.template = "flxFastExternalAccountsTransfersUnselectedNewIC";
                record["flxExternalAccountsFastTransfersSelectedNewIC"] = {
                  "skin" : this.getBreakPointTypeBasedValue(this._sknRowExpanded) 
                }
                record["flxFastExternalAccountsTransfersUnselectedNewIC"] = {
                  "hoverSkin" : this.getBreakPointTypeBasedValue(this._sknRowHover) 
                }
              }
              section.push(record);
        }
        this.view.segmentTransfers.widgetDataMap = this.getWidgetDataMap();
        this.view.segmentTransfers.setData(section);
        this.view.forceLayout();
      },

      /**
      * onToggle.
      * responsible for changing the templates from unselected view to selected view and viceversa.
      */
      onToggle: function(){
        var scope = this;
        var index;
        scope.view.segmentTransfers.selectedRowIndex !== null ? index = scope.view.segmentTransfers.selectedRowIndex[1] : index = "";
        var data = scope.view.segmentTransfers.data;
        if(this._currentTab === "Tab1"){
          
        if(this.isEmptyNullUndefined(this._dataGridColumn4Tab1))
          {
        for(i=0;i<data.length;i++)
         {
           if(i===index)
             {
               if(!(data[i].template === "flxExternalAccountsFastTransfersSelectedIC")){
                 kony.print("index:" + index);
                 data[i].imgDropdown = this.getImageOrIcon(this._iconRowCollapse);
                 data[i].flxDropdown.accessibilityConfig = {
                                    a11yLabel: "Hide details for recipient" + data[i].lblColumn1.text,
                                    "a11yARIA": {
                                            "tabindex" : 0,
                                                "role": "button",
                                                "aria-expanded": true,
                                                }
                                        };
                 data[i].template = "flxExternalAccountsFastTransfersSelectedIC";
               }
               else{
                    data[i].imgDropdown = this.getImageOrIcon(this._iconRowExpand);
                    data[i].flxDropdown.accessibilityConfig = {
                                    a11yLabel: "show more details for recipient" + data[i].lblColumn1.text,
                                    "a11yARIA": {
                                                "tabindex" : 0,
                                                "role": "button",
                                                "aria-expanded": false,
                                                }
                                     };
                    data[i].template = "flxFastExternalAccountsTransfersUnselectedIC";
               }
             }
           else
             {
                  data[i].imgDropdown = this.getImageOrIcon(this._iconRowExpand);
                  data[i].flxDropdown.accessibilityConfig = {
                                a11yLabel: "show more details for recipient" + data[i].lblColumn1.text,
                                "a11yARIA": {
                                            "tabindex" : 0,
                                            "role": "button",
                                            "aria-expanded": false,
                                             }
                                 };
                  data[i].template = "flxFastExternalAccountsTransfersUnselectedIC";
             }
         }
       scope.view.segmentTransfers.setData(data);
        if(scope.view.segmentTransfers.data[index].template === "flxExternalAccountsFastTransfersSelectedIC"){
                scope.view.segmentTransfers.setActive(index,0,"flxExternalAccountsFastTransfersSelectedIC.flxSelectedRowWrapper.flxExternalAccountsTransfers.flxDropdown");
            } else {
                scope.view.segmentTransfers.setActive(index,0,"flxFastExternalAccountsTransfersUnselectedIC.flxRow.flxDropdown");
            }
          }
          
        else
          {
            for(i=0;i<data.length;i++)
            {
              if(i===index)
              {
                if(!(data[i].template === "flxExternalAccountsFastTransfersSelectedNewIC")){
                  kony.print("index:" + index);
                  data[i].imgDropdown = this.getImageOrIcon(this._iconRowCollapse);
                  data[i].template = "flxExternalAccountsFastTransfersSelectedNewIC";
                }
                else{
                  data[i].imgDropdown = this.getImageOrIcon(this._iconRowExpand);
                  data[i].template = "flxFastExternalAccountsTransfersUnselectedNewIC";
                }
              }
              else
              {
                data[i].imgDropdown = this.getImageOrIcon(this._iconRowExpand);
                data[i].template = "flxFastExternalAccountsTransfersUnselectedNewIC";
              }
            }
            scope.view.segmentTransfers.setData(data);
          }
        }
        else if(this._currentTab === "Tab2"){
        if(this.isEmptyNullUndefined(this._dataGridColumn4Tab2))
          {
        for(i=0;i<data.length;i++)
         {
           if(i===index)
             {
               if(!(data[i].template === "flxExternalAccountsFastTransfersSelectedIC")){
                 kony.print("index:" + index);
                    data[i].imgDropdown = this.getImageOrIcon(this._iconRowCollapse);
                    data[i].flxDropdown.accessibilityConfig = {
                                    a11yLabel: "Hide details for recipient" + data[i].lblColumn1.text,
                                    "a11yARIA": {
                                        "tabindex": 0,
                                        "role": "button",
                                        "aria-expanded": true,
                                    }
                                };
                 data[i].template = "flxExternalAccountsFastTransfersSelectedIC";
               }
               else{
                    data[i].imgDropdown = this.getImageOrIcon(this._iconRowExpand);
                    data[i].flxDropdown.accessibilityConfig = {
                                    a11yLabel: "Show more details for recipient" + data[i].lblColumn1.text,
                                    "a11yARIA": {
                                        "tabindex": 0,
                                        "role": "button",
                                        "aria-expanded": false,
                                    }
                                };
                 data[i].template = "flxFastExternalAccountsTransfersUnselectedIC";
               }
             }
           else
             {
                  data[i].imgDropdown = this.getImageOrIcon(this._iconRowExpand);
                  data[i].flxDropdown.accessibilityConfig = {
                                    a11yLabel: "show more details for recipient" + data[i].lblColumn1.text,
                                    "a11yARIA": {
                                        "tabindex": 0,
                                        "role": "button",
                                        "aria-expanded": false,
                                    }
                                };
               data[i].template = "flxFastExternalAccountsTransfersUnselectedIC";
             }
         }
       scope.view.segmentTransfers.setData(data);
       if (scope.view.segmentTransfers.data[index].template === "flxExternalAccountsFastTransfersSelectedIC") {
                        scope.view.segmentTransfers.setActive(index, 0, "flxExternalAccountsFastTransfersSelectedIC.flxSelectedRowWrapper.flxExternalAccountsTransfers.flxDropdown");
                    } else {
                        scope.view.segmentTransfers.setActive(index, 0, "flxFastExternalAccountsTransfersUnselectedIC.flxRow.flxDropdown");
                    }
          }
        else
          {
            for(i=0;i<data.length;i++)
            {
              if(i===index)
              {
                if(!(data[i].template === "flxExternalAccountsFastTransfersSelectedNewIC")){
                  kony.print("index:" + index);
                  data[i].imgDropdown = this.getImageOrIcon(this._iconRowCollapse);
                  data[i].template = "flxExternalAccountsFastTransfersSelectedNewIC";
                }
                else{
                  data[i].imgDropdown = this.getImageOrIcon(this._iconRowExpand);
                  data[i].template = "flxFastExternalAccountsTransfersUnselectedNewIC";
                }
              }
              else
              {
                data[i].imgDropdown = this.getImageOrIcon(this._iconRowExpand);
                data[i].template = "flxFastExternalAccountsTransfersUnselectedNewIC";
              }
            }
            scope.view.segmentTransfers.setData(data);
          }
        }
      },

      /**
      * onToggleMobile.
      * responsible for changing the templates from unselected view to selected view and viceversa in mobile breakpoint.
      */
      onToggleMobile: function(){
        var scope = this;
       var index =  scope.view.segmentTransfers.selectedRowIndex[1];
      var data = scope.view.segmentTransfers.data;
        for(i=0;i<data.length;i++)
         {
           if(i===index)
             {
               if(!(data[i].template === "flxExternalAccountsFastTransfersSelectedMobileIC")){
                 kony.print("index:" + index);
                 data[i].imgDropdown = this.getImageOrIcon(this._iconRowCollapse);
                 data[i].flxDropdown.accessibilityConfig = {
                  a11yLabel: "Hide details for recipient" + data[i].lblColumn1Row1.text,
                  "a11yARIA": {
                      "tabindex": 0,
                      "role": "button",
                      "aria-expanded": true,
                  }
              };
                 data[i].template = "flxExternalAccountsFastTransfersSelectedMobileIC";
               }
               else{
                 data[i].imgDropdown = this.getImageOrIcon(this._iconRowExpand);
                 data[i].flxDropdown.accessibilityConfig = {
                  a11yLabel: "show More details for recipient" + data[i].lblColumn1Row1.text,
                  "a11yARIA": {
                      "tabindex": 0,
                      "role": "button",
                      "aria-expanded": false,
                  }
              };
                 data[i].template = "flxExternalAccountsFastTransfersMobileIC";
               }
             }
           else
             {
               data[i].imgDropdown = this.getImageOrIcon(this._iconRowExpand);
               data[i].flxDropdown.accessibilityConfig = {
                a11yLabel: "show more details for recipient" + data[i].lblColumn1Row1.text,
                "a11yARIA": {
                    "tabindex": 0,
                    "role": "button",
                    "aria-expanded": false,
                }
            };
               data[i].template = "flxExternalAccountsFastTransfersMobileIC";
             }
         }
       scope.view.segmentTransfers.setData(data);
      },

      /**
      * setBeneficiaryListMobile.
      * responsible for setting the Accounts Beneficiary data to the segment for Mobile breakpoint.
      * response {Object} - contains service response data.
      */
      setBeneficiaryListMobile: function(serviceResponse,params){
        var section = [];
        var scopeObj =this;
        var scope = this;
        if(params.state === "search" || this._searchPerformed){
          this.hidePagination();
        }else{
          this.showPagination();
        }
        this.updatePaginationBar(serviceResponse.length,params.pagination.totalSize);
        if(!serviceResponse || serviceResponse.length < 1){
          this.noRecipients(true);
          this.hidePagination();
          return;
        }else{
          this.noRecipients(false);
        }
        var beneficiaryTypeIconVisibility = this._isBeneficiaryTypeIconVisible;
        var btn1Visibility = this.isEmptyNullUndefined(this._additionalDetailsAction1Tab1) ? false : true;
        var btn2Visibility = this.isEmptyNullUndefined(this._additionalDetailsAction2Tab1) ? false : true;
        var btn3Visibility = this.isEmptyNullUndefined(this._additionalDetailsAction3Tab1) ? false : true;
        var Field1Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel1Tab1) ? false : true;
        var Field2Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel2Tab1) ? false : true;
        var Field3Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel3Tab1) ? false : true;
        var Field4Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel4Tab1) ? false : true;
        var Field5Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel5Tab1) ? false : true;
        var Field6Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel6Tab1) ? false : true;
        var Field7Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel7Tab1) ? false : true;
        var Field8Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel8Tab1) ? false : true;
        var Field9Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel9Tab1) ? false : true;
        var btn1Visibility = this.isEmptyNullUndefined(this._additionalDetailsAction1Tab1) ? false : true;
        var btn2Visibility = this.isEmptyNullUndefined(this._additionalDetailsAction2Tab1) ? false : true;
        var btn3Visibility = this.isEmptyNullUndefined(this._additionalDetailsAction3Tab1) ? false : true;
        var Column2Visibility = this.isEmptyNullUndefined(this._dataGridColumn2Tab1) ? false : true;
        var Column3Visibility = this.isEmptyNullUndefined(this._dataGridColumn3Tab1) ? false : true;
        var Column4Visibility = this.isEmptyNullUndefined(this._dataGridColumn4Tab1) ? false : true;
        var isCombinedUser = this.isCombinedUser();
        var btn1Entitlement = this.isEntitled(JSON.parse(this._additionalDetailsAction1Tab1));
        var btn2Entitlement = this.isEntitled(JSON.parse(this._additionalDetailsAction2Tab1));
        var btn3Entitlement = this.isEntitled(JSON.parse(this._additionalDetailsAction3Tab1));
        var btn4Entitlement = this.isEntitled(JSON.parse(this._dataGridColumn5Tab1));
        for(var i = 0; i < serviceResponse.length; i++){
          var noOfAdditonalFields = 0;
          var record = {};
          record["Id"] = serviceResponse[i]["Id"];
          record["isInternationalAccount"] = serviceResponse[i]["isInternationalAccount"];
          record["isSameBankAccount"] = serviceResponse[i]["isSameBankAccount"];
          record["accountNumber"] = serviceResponse[i]["accountNumber"];
          record["IBAN"] = serviceResponse[i]["IBAN"];
          var BNFType = serviceResponse[i].beneficiaryType;
          // record["flxDropdown"] = {
          //   accessibilityConfig: {
          //               "a11yLabel" : "Hide details for recipient" + data[i].lblColumn1Row1.text,
          //               "a11yARIA": {
          //                   "tabindex": 0,
          //                   "aria-hidden" : false,
          //                   "role" : "button"
          //               }
          //           },
          //   onClick : scopeObj.onToggleMobile.bind(scopeObj)
          // }
          record["imgDropdown"] = {
            "src" : this.getImageOrIcon(this._iconRowExpand)
          };
          if(beneficiaryTypeIconVisibility && isCombinedUser){
            record["flxIcon"] = {
            	"isVisible": true
          	};
            if(serviceResponse[i]["isBusinessPayee"] === "0"){
              record["imgIcon"] = {
            	"text": "s"
          	  };
            }else{
              record["imgIcon"] = {
            	"text": "r"
          	  };
            }
          }else{
            record["flxIcon"] = {
            	"isVisible": false
          	};
          }
          record["lblColumn1Row1"] = {
            "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(JSON.parse(this._dataGridColumn1Tab1)["mapping"], BNFType)], 
            this.getBeneficiaryTypeBasedValue(JSON.parse(this._dataGridColumn1Tab1)["fieldType"], BNFType)),
            "skin": this._sknValueField1Mobile
          }
          if(Column2Visibility){
            record["lblColumn1Row2"] = {
              "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(JSON.parse(this._dataGridColumn2Tab1)["mapping"], BNFType)], 
              this.getBeneficiaryTypeBasedValue(JSON.parse(this._dataGridColumn2Tab1)["fieldType"], BNFType)),
              "skin": this._sknValueField2Mobile
            }
          }
          else{
            record["lblColumn1Row2"] = {
              "isVisible": false
            }
          }
          //record["lblColumn1"]
          record["flxDropdown"] = {
            accessibilityConfig: {
                        "a11yLabel" : "show more details for recipient" + record["lblColumn1Row1"].text,
                        "a11yARIA": {
                            "tabindex": 0,
                            "aria-hidden" : false,
                            "role" : "button"
                        }
                    },
            onClick : scopeObj.onToggleMobile.bind(scopeObj)
          }
          if(Column3Visibility){
            record["lblColumn2"] = {
              "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(JSON.parse(this._dataGridColumn3Tab1)["mapping"], BNFType)], 
              this.getBeneficiaryTypeBasedValue(JSON.parse(this._dataGridColumn3Tab1)["fieldType"], BNFType)),
              "skin": this._sknValueField1Mobile
            }
          }
          else{
            record["lblColumn2"] = {
              "isVisible": false
            }
          }
          
          if(btn4Entitlement){
            record["btn4"] = {
            "text": this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn5Tab1)["text"])), 
            "skin": this.getBreakPointTypeBasedValue(this._sknActionButtons),
            "onClick": scope.btnActionOnClick.bind(scope, serviceResponse, this._dataGridColumn5Tab1)
          	}
          } else{
            record["btn4"] = {
              "isVisible": false
            }
          }
          
          if(btn1Visibility && btn1Entitlement){
            record["btn1"] = {
              "text": this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._additionalDetailsAction1Tab1)["title"])), 
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsButton),
              "onClick": scope.btnActionOnClick.bind(scope, serviceResponse, this._additionalDetailsAction1Tab1)
            }
            record["flxbtn1"] = {
              "isVisible": true
            }
          }
          else{
            record["flxbtn1"] = {
              "isVisible": false
            }
          }
          if(btn2Visibility && btn2Entitlement){
            record["btn2"] = {
              "text": this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._additionalDetailsAction2Tab1)["title"])), 
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsButton),
              "onClick": scope.btnActionOnClick.bind(scope, serviceResponse, this._additionalDetailsAction2Tab1)
            }
            record["flxbtn2"] = {
              "isVisible": true
            }
          }
          else{
            record["flxbtn2"] = {
              "isVisible": false
            }
          }
          if(btn3Visibility && btn3Entitlement){
            record["btn3"] = {
              "text": this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._additionalDetailsAction3Tab1)["title"])), 
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsButton),
              "onClick": scope.btnActionOnClick.bind(scope, serviceResponse, this._additionalDetailsAction3Tab1)
            }
            record["flxbtn3"] = {
              "isVisible": true
            }
          }
          else{
            record["flxbtn3"] = {
              "isVisible": false
            }
          }
          if(Column4Visibility){
            noOfAdditonalFields++;
            record["lblRowColumn4"] = {
              "text": this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn4Tab1)["title"])),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
            }
            record["valuelblRowColumn4"] = {
              "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(JSON.parse(this._dataGridColumn4Tab1)["mapping"], BNFType)], 
              this.getBeneficiaryTypeBasedValue(JSON.parse(this._dataGridColumn4Tab1)["fieldType"], BNFType)),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
            }
            record["flxRowColumn4"] = {
              "isVisible": true
            }
          }
          else{
            record["flxRowColumn4"] = {
              "isVisible": false
            }
          }
          if(Field1Visibility){
            noOfAdditonalFields++;
            record["lblRowField1"] = {
              "text": this.getBreakPointTypeBasedValue(this.getBeneficiaryTypeBasedValue(this._additionalDetailsLabel1Tab1, BNFType)),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
            }
            record["valuelblRowField1"] = {
              "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(this._additionalDetailsValue1Tab1, BNFType)], 
              this.getBeneficiaryTypeBasedValue(this._additionalDetailsType1Tab1, BNFType)),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
            }
            record["flxRowField1"] = {
              "isVisible": true
            }
          }
          else{
            record["flxRowField1"] = {
              "isVisible": false
            }
          }
          if(Field2Visibility){
            noOfAdditonalFields++;
            record["lblRowField2"] = {
              "text": this.getBreakPointTypeBasedValue(this.getBeneficiaryTypeBasedValue(this._additionalDetailsLabel2Tab1, BNFType)),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
            }
            record["valuelblRowField2"] = {
              "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(this._additionalDetailsValue2Tab1, BNFType)], 
              this.getBeneficiaryTypeBasedValue(this._additionalDetailsType2Tab1, BNFType)),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
            }
            record["flxRowField2"] = {
              "isVisible": true
            }
          }
          else{
            record["flxRowField2"] = {
              "isVisible": false
            }
          }
          if(Field3Visibility){
            noOfAdditonalFields++;
            record["lblRowField3"] = {
              "text": this.getBreakPointTypeBasedValue(this.getBeneficiaryTypeBasedValue(this._additionalDetailsLabel3Tab1, BNFType)),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
            }
            record["valuelblRowField3"] = {
              "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(this._additionalDetailsValue3Tab1, BNFType)], 
              this.getBeneficiaryTypeBasedValue(this._additionalDetailsType3Tab1, BNFType)),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
            }
            record["flxRowField3"] = {
              "isVisible": true
            }

            record["valuelblRowField3"].text === "-" ? "" : record["valuelblRowField3"].text += " " + kony.i18n.getLocalizedString("i18n.contracts.customers");
          }
          else{
            record["flxRowField3"] = {
              "isVisible": false
            }
          }
          if(Field4Visibility){
            noOfAdditonalFields++;
            record["lblRowField4"] = {
              "text": this.getBreakPointTypeBasedValue(this.getBeneficiaryTypeBasedValue(this._additionalDetailsLabel4Tab1, BNFType)),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
            }
            record["valuelblRowField4"] = {
              "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(this._additionalDetailsValue4Tab1, BNFType)],
               this.getBeneficiaryTypeBasedValue(this._additionalDetailsType4Tab1, BNFType)),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
            }
            record["flxRowField4"] = {
              "isVisible": true
            }
          }
          else{
            record["flxRowField4"] = {
              "isVisible": false
            }
          }
          if(Field5Visibility){
            noOfAdditonalFields++;
            record["lblRowField5"] = {
              "text": this.getBreakPointTypeBasedValue(this.getBeneficiaryTypeBasedValue(this._additionalDetailsLabel5Tab1, BNFType)),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
            }
            record["valuelblRowField5"] = {
              "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(this._additionalDetailsValue5Tab1, BNFType)], 
              this.getBeneficiaryTypeBasedValue(this._additionalDetailsType5Tab1, BNFType)),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
            }
            record["flxRowField5"] = {
              "isVisible": true
            }
          }
          else{
            record["flxRowField5"] = {
              "isVisible": false
            }
          }
          if(Field6Visibility){
            noOfAdditonalFields++;
            record["lblRowField6"] = {
              "text": this.getBreakPointTypeBasedValue(this.getBeneficiaryTypeBasedValue(this._additionalDetailsLabel6Tab1, BNFType)),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
            }
            record["valuelblRowField6"] = {
              "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(this._additionalDetailsValue6Tab1, BNFType)], 
              this.getBeneficiaryTypeBasedValue(this._additionalDetailsType6Tab1, BNFType)),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
            }
            record["flxRowField6"] = {
              "isVisible": true
            }
          }
          else{
            record["flxRowField6"] = {
              "isVisible": false
            }
          }
          if(Field7Visibility){
            noOfAdditonalFields++;
            record["lblRowField7"] = {
              "text": this.getBreakPointTypeBasedValue(this.getBeneficiaryTypeBasedValue(this._additionalDetailsLabel7Tab1, BNFType)),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
            }
            record["valuelblRowField7"] = {
              "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(this._additionalDetailsValue7Tab1, BNFType)], 
              this.getBeneficiaryTypeBasedValue(this._additionalDetailsType7Tab1, BNFType)),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
            }
            record["flxRowField7"] = {
              "isVisible": true
            }
          }
          else{
            record["flxRowField7"] = {
              "isVisible": false
            }
          }
          if(Field8Visibility){
            noOfAdditonalFields++;
            record["lblRowField8"] = {
              "text": this.getBreakPointTypeBasedValue(this.getBeneficiaryTypeBasedValue(this._additionalDetailsLabel8Tab1, BNFType)),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
            }
            record["valuelblRowField8"] = {
              "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(this._additionalDetailsValue8Tab1, BNFType)],
               this.getBeneficiaryTypeBasedValue(this._additionalDetailsType8Tab1, BNFType)),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
            }
            record["flxRowField8"] = {
              "isVisible": true
            }
          }
          else{
            record["flxRowField8"] = {
              "isVisible": false
            }
          }
          if(Field9Visibility){
            noOfAdditonalFields++;
            record["lblRowField9"] = {
              "text": this.getBreakPointTypeBasedValue(this.getBeneficiaryTypeBasedValue(this._additionalDetailsLabel9Tab1, BNFType)),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
            }
            record["valuelblRowField9"] = {
              "text": this.getFormattedData(serviceResponse[i][this.getBeneficiaryTypeBasedValue(this._additionalDetailsValue9Tab1, BNFType)], 
              this.getBeneficiaryTypeBasedValue(this._additionalDetailsType9Tab1, BNFType)),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
            }
            record["flxRowField9"] = {
              "isVisible": true
            }
          }
          else{
            record["flxRowField9"] = {
              "isVisible": false
            }
          }
          var height = 140 + 46*noOfAdditonalFields 
          record["flxIdentifier"] = {
              "height": height + "dp"
            }
          record.template = "flxExternalAccountsFastTransfersMobileIC";
          record["flxExternalAccountsFastTransfersSelectedMobileIC"] = {
            "skin" : this.getBreakPointTypeBasedValue(this._sknRowExpanded) 
          }
          record["flxExternalAccountsFastTransfersMobileIC"] = {
            "hoverSkin" : this.getBreakPointTypeBasedValue(this._sknRowHover) 
          }
          section.push(record);
        }
          
        this.view.segmentTransfers.widgetDataMap = this.getWidgetDataMap();
        this.view.segmentTransfers.setData(section);
        this.setPageCount(section.length);
      },

      /**
      * getBreakPointTypeBasedValue.
      * responsible for getting the breakpoint specific value.
      * value {JSONObject or String} - Value that needs to be processed.
      * @return : {string} - Processed value
      */
      getBreakPointTypeBasedValue: function(value){
        try {
          var valueJson = JSON.parse(value);
          if(typeof(valueJson) === 'string'){
            value = valueJson;
          }
          else
          value = this.ParserUtilsManager.getcomponentConfigValue(valueJson, kony.application.getCurrentBreakpoint());
        }
        catch(e){
          kony.print(e);
        }
        if(typeof(value) === 'string'){
          return this.getProcessedText(value);
        }
        else
        return this.getProcessedText(JSON.stringify(value));
      },

      /**
      * getBreakPointTypeBasedValue.
      * responsible for getting the beneficiary type specific value.
      * value {JSONObject or String} - Value that needs to be processed.
      * type {String} - Beneficiary Type.
      * @return : {string} - Processed value.
      */
      getBeneficiaryTypeBasedValue: function(value,type){
        try {
          var valueJson = JSON.parse(value);
          if(typeof(valueJson) === 'string'){
            value = valueJson;
          }
          else{
            var count = 0;
            for(var key in valueJson){
              if(key.includes("$.BNFTYPES.")){
                count++;
              }
            }
            if(count >= 1){
              value = this.ParserUtilsManager.getcomponentConfigValue(valueJson, type);
            }
            else
              value = this.ParserUtilsManager.getcomponentConfigValue(valueJson, kony.application.getCurrentBreakpoint());
          }
        }
        catch(e){
          kony.print(e);
        }
          
        if(typeof(value) === 'string'){
         return this.getProcessedText(value);
        }
        else
        return this.getProcessedText(JSON.stringify(value));
      },

      /**
     *  getProcessedText.
     * Pass the text to parser util to obtain the processed value.
     * text {string} - value to be processed.
     * @return : {string} - processed value.
     */
      getProcessedText:function(text){
        return this.ParserUtilsManager.getParsedValue(text);
      },

      /**
      * deleteExternalAccount.
      * responsible for deleting the Accounts Beneficiary by making call to deleteBeneficiary method in DAO layer.
      * data {Object} - object contains segment data.
      * index {Integer} - object contains seleted segment row index.
      */
      deleteExternalAccount: function(data,index){
        var scope = this;
        var payload={};
        var criteria = JSON.parse(this._accountsDELETECriteria);
        for(var key in criteria){
          payload[key] = data[index][key];
        }
        scope.BeneficiaryListDAO.deleteBeneficiary(this._accountsObjectService,
          this._accountsDELETEOperation, this._accountsObject,
          payload, scope.deleteBeneficiaryCallBack, scope.onError);
      },

      /**
      * deleteBeneficiaryCallBack.
      * CallBack function for deleteExternalAccount service call, responsible for fetching the updated beneficiary list.
      * response {Object} - object contains the service response.
      */
      deleteBeneficiaryCallBack: function(response){
        var scope = this;
        scope.BeneficiaryListDAO.fetchBeneficiaryList(this._accountsObjectService,
          this._accountsGETOperation, this._accountsObject,
          JSON.parse(this._accountsGETCriteria), scope.fetchBeneficiaryListCallBack, scope.onError);
      },

      /**
      * deleteP2PRecipient.
      * responsible for deleting the P2P Beneficiary by making call to deleteP2PBeneficiary method in DAO layer.
      * data {Object} - object contains segment data.
      * index {Integer} - object contains seleted segment row index. 
      */
      deleteP2PRecipient: function(data,index){
        var scope = this;
        var payload={};
        var criteria = JSON.parse(this._p2pDELETECriteria);
        for(var key in criteria){
          payload[key] = data[index][key];
        }
        scope.BeneficiaryListDAO.deleteP2PBeneficiary(this._p2pObjectService, 
          this._p2pDELETEOperation, this._p2pObject, payload, scope.deleteP2PBeneficiaryCallBack, scope.onError);
      },

      /**
      * deleteP2PBeneficiaryCallBack.
      * CallBack function for deleteP2PBeneficiary service call, responsible for fetching the updated p2p beneficiary list.
      * response {Object} - object contains the service response.
      */
      deleteP2PBeneficiaryCallBack: function(response){
        var scope = this;
        scope.BeneficiaryListDAO.fetchP2PBeneficiaryList(this._p2pObjectService,
          this._p2pGETOperation, this._p2pObject,
          JSON.parse(this._p2pGETCriteria), scope.fetchP2PListCallback, scope.onError);
      },
      
      /**
      * Component isEmptyNullUndefined.
      * Verifies if the value is empty, null or undefined.
      * data {string} - value to be verified.
      * @return : {boolean} - validity of the value passed.
      */
      isEmptyNullUndefined:function(data){
        if(data === null || data === undefined || data === "")
          return true;
        return false;
      },
      /**
     * getModifiedResponseData
     * Modifies the backend response to component supported format
     * response {Object} - service response object
     * @return : {Object} - returns modified response
     */
      getModifiedResponseData: function(response){
        if(response){
          for(var record in response){
            if(response[record].isInternationalAccount === "true"){
              response[record]["beneficiaryType"] = "International";
            }
            else if(response[record].isSameBankAccount === "true"){
              response[record]["beneficiaryType"] = "SameBank";
            }
            else
              response[record]["beneficiaryType"] = "External";
            if(response[record].isVerified === "true"){
              response[record]["isVerified"] = "Verified";
            }
            else
              response[record]["isVerified"] = "Pending";
            if(response[record].routingNumber === undefined || response[record].routingNumber === null 
               || response[record].isSameBankAccount == "true"){
              response[record]["routingNumber"] = "N/A";
            }
            if(response[record].swiftCode === undefined || response[record].swiftCode === null
               || response[record].isInternationalAccount == "false"){
              response[record]["swiftCode"] = "N/A";
            }
          }
          return response;
        }
      }
	};
});