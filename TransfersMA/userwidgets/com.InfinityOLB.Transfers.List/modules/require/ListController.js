define(['CacheUtils','./TransferListDAO','./ParserUtilsManager','./FormatUtils','./EntitlementUtils','CommonUtilities'],function(CacheUtils,TransferListDAO,ParserUtilsManager,FormatUtils,EntitlementUtils,CommonUtilities) {
  var criteria
  var orientationHandler = new OrientationHandler();
  var globalContext = null;
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.TransferListDAO = new TransferListDAO();
      this.ParserUtilsManager = new ParserUtilsManager();
      this.FormatUtils = new FormatUtils();
      this.EntitlementUtils = new EntitlementUtils();

      // Transaction Management Services.
      this._Object = "";
      this._ObjectService = "";
      this._GETOperation = "";
      this._GETCriteria = "";
      this._GETIdentifier = "";
      this._DELETEOperation = "";
      this._DELETECriteria = "";
      this._DELETEIdentifier = "";
      this._SearchObjectService = "",
      this._SearchObject = "";
      this._SearchOperation = "";
      this._SearchCriteria = "";
      this._SearchIdentifier = "";
      this._SKIPOperation = "";
      this._SKIPCriteria = "";
      this._SKIPIdentifier = "";
      this._DELETEObject = "";
      this._DELETEObjectService = "";

      // Component Configs.
      this._BREAKPTS = "";

      // General Properties.
      this._popupDescription = "";
      this._emptyListLabel = "";
      this._noSearchResult = "";
      this._cancelPopup = "";
      this._viewAttachmentService = "";
      this._skipDescription = "";
    
      // Icons & Images.
      this._iconRowExpand = "";
      this._iconRowCollapse = "";
      this._iconColumnSort = "";
      this._iconColumnSortAsc = "";
      this._iconColumnSortDsc = "";
      this._retailUser = "";
      this._businessUser = "";

      // Date Properties.
      this._dateFormat = "";
      this._backendDateFormat = "";
      this._amountFormat = "";
      this._accountNumberLength = "";
      
      //Mobile
      
      this._mobileField1 = "";
      this._mobileField2 = "";
      this._mobileField3 = "";
      this._mobileField4 = "";
      
      //template height
      
      this._expandedHeight = "";
      this._collapsedHeight = "";
      this._expandedHeightMobile = "";
      this._collapsedHeightMobile = "";

      // Data Grid-Tab1. 
      this._dataGridColumn1Tab1 = "";
      this._dataGridColumn2Tab1 = "";
      this._dataGridColumn3Tab1 = "";
      this._dataGridColumn4Tab1 = "";
      this._dataGridColumn5Tab1 = "";

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
      this._additionalDetailsLabel10Tab1 = "";
      this._additionalDetailsLabel11Tab1 = "";
      this._additionalDetailsLabel12Tab1 = "";
      this._additionalDetailsValue1Tab1 = "";
      this._additionalDetailsValue2Tab1 = "";
      this._additionalDetailsValue3Tab1 = "";
      this._additionalDetailsValue4Tab1 = "";
      this._additionalDetailsValue5Tab1 = "";
      this._additionalDetailsValue6Tab1 = "";
      this._additionalDetailsValue7Tab1 = "";
      this._additionalDetailsValue8Tab1 = "";
      this._additionalDetailsValue9Tab1 = "";
      this._additionalDetailsValue10Tab1 = "";
      this._additionalDetailsValue11Tab1 = "";
      this._additionalDetailsValue12Tab1 = "";
      this._additionalDetailsType1Tab1 = "";
      this._additionalDetailsType2Tab1 = "";
      this._additionalDetailsJson2Tab1 = "";
      this._additionalDetailsType3Tab1 = "";
      this._additionalDetailsType4Tab1 = "";
      this._additionalDetailsType5Tab1 = "";
      this._additionalDetailsType6Tab1 = "";
      this._additionalDetailsType7Tab1 = "";
      this._additionalDetailsType8Tab1 = "";
      this._additionalDetailsType9Tab1 = "";
      this._additionalDetailsType10Tab1 = "";
      this._additionalDetailsType11Tab1 = "";
      this._additionalDetailsType12Tab1 = "";
      this._additionalDetailsAction1Tab1 = "";
      this._additionalDetailsAction2Tab1 = "";
      this._additionalDetailsAction3Tab1 = "";
      this._additionalDetailsAction4Tab1 = "";
      this._additionalDetailsAction5Tab1 = "";

      // SKINS.
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
      this._sknColumn3Mobile = "";
      this._sknColumn4Mobile = "";
      this._sknStatusActive = "";
      this._sknStatusExpired = "";
      this._sknStatusPending = "";
      this._sknStatusRejected = "";
      this._sknRowNormal = "sknFFFFFFnoBor";

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


      //global variables
      this.rowTemplate = "";
      this.template_height = "";
      this.expandedTemplate_height = "";
      this.files;
      this.btnCount = 0;
      this._prevIdx;

      //cache params
      this._SearchFields = "";
      this._FilterParams = "";
      this._SortParams = "";
      this.sectionIdx="";
      this.rowIdx="";
      this.btndropdownIndex = "";
      this.dropdown = "";
    },

    // Logic for getters/setters of custom properties.
    initGettersSetters: function() {
      defineSetter(this, "GETOperation", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._GETOperation=val;
        }
      });
      defineGetter(this, "GETOperation", function() {
        return this._GETOperation;
      });

      defineSetter(this, "Object", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._Object=val;
        }
      });
      defineGetter(this, "Object", function() {
        return this._Object;
      });

      defineSetter(this, "ObjectService", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._ObjectService=val;
        }
      });
      defineGetter(this, "ObjectService", function() {
        return this._ObjectService;
      });

      defineSetter(this, "GETCriteria", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._GETCriteria=val;
        }
      });
      defineGetter(this, "GETCriteria", function() {
        return this._GETCriteria;
      });

      defineSetter(this, "GETIdentifier", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._GETIdentifier=val;
        }
      });
      defineGetter(this, "GETIdentifier", function() {
        return this._GETIdentifier;
      });

      defineSetter(this, "DELETEOperation", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._DELETEOperation=val;
        }
      });
      defineGetter(this, "DELETEOperation", function() {
        return this._DELETEOperation;
      });

      defineSetter(this, "DELETEIdentifier", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._DELETEIdentifier=val;
        }
      });
      defineGetter(this, "DELETEIdentifier", function() {
        return this._DELETEIdentifier;
      });

      defineSetter(this, "DELETECriteria", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._DELETECriteria=val;
        }
      });
      defineGetter(this, "DELETECriteria", function() {
        return this._DELETECriteria;
      }); 
      defineSetter(this, "SearchObjectService", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._SearchObjectService=val;
        }
      });
      defineGetter(this, "SearchObjectService", function() {
        return this._SearchObjectService;
      });

      defineSetter(this, "SearchObject", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._SearchObject=val;
        }
      });
      defineGetter(this, "SearchObject", function() {
        return this._SearchObject;
      });

      defineSetter(this, "SearchOperation", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._SearchOperation=val;
        }
      });
      defineGetter(this, "SearchOperation", function() {
        return this._SearchOperation;
      });

      defineSetter(this, "SearchCriteria", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._SearchCriteria=val;
        }
      });
      defineGetter(this, "SearchCriteria", function() {
        return this._SearchCriteria;
      });

      defineSetter(this, "SearchIdentifier", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._SearchIdentifier=val;
        }
      });
      defineGetter(this, "SearchIdentifier", function() {
        return this._SearchIdentifier;
      });
       defineSetter(this, "SKIPOperation", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._SKIPOperation=val;
        }
      });
      defineGetter(this, "SKIPOperation", function() {
        return this._SKIPOperation;
      });

      defineSetter(this, "SKIPIdentifier", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._SKIPIdentifier=val;
        }
      });
      defineGetter(this, "SKIPIdentifier", function() {
        return this._SKIPIdentifier;
      });

      defineSetter(this, "SKIPCriteria", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._SKIPCriteria=val;
        }
      });
      defineGetter(this, "SKIPCriteria", function() {
        return this._SKIPCriteria;
      });     
      defineSetter(this, "SearchFields", function(val) {
        if((typeof val === 'string') && (val !== "")){
          return this._SearchFields = "";
        }
      });
      defineGetter(this, "SearchFields", function() {
        return this._SearchFields = "";
      });
      defineSetter(this, "BREAKPTS", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._BREAKPTS=val;
        }
      });
      defineGetter(this, "BREAKPTS", function() {
        return this._BREAKPTS;
      });
      defineSetter(this, "noSearchResult", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._noSearchResult = val;
        }
      });
      defineGetter(this, "noSearchResult", function () {
        return this._noSearchResult;
      });

      defineSetter(this, "popupDescription", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._popupDescription=val;
        }
      });
      defineGetter(this, "popupDescription", function() {
        return this._popupDescription;
      });
      defineSetter(this, "skipDescription", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._skipDescription=val;
        }
      });
      defineGetter(this, "skipDescription", function() {
        return this._skipDescription;
      }); 
      defineSetter(this, "cancelPopup", function(val) {
        if((typeof val === 'boolean') && (val !== "")){
          this._cancelPopup=val;
        }
      });
      defineGetter(this, "cancelPopup", function() {
        return this._cancelPopup;
      });

      defineSetter(this, "emptyListLabel", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._emptyListLabel=val;
        }
      });
      defineGetter(this, "emptyListLabel", function() {
        return this._emptyListLabel;
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
      defineSetter(this, "retailUser", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._retailUser=val;
        }
      });
      defineGetter(this, "retailUser", function() {
        return  this._retailUser;
      });
      defineSetter(this, "businessUser", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._businessUser=val;
        }
      });
      defineGetter(this, "businessUser", function() {
        return  this._businessUser;
      });
      defineSetter(this, "blockTitle", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._blockTitle=val;
        }
      });
      defineGetter(this, "blockTitle", function() {
        return this._blockTitle;
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
      
       defineSetter(this, "mobileField1", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._mobileField1=val;
        }
      });
      defineGetter(this, "mobileField1", function() {
        return this._mobileField1;
      });
      defineSetter(this, "mobileField2", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._mobileField2=val;
        }
      });
      defineGetter(this, "mobileField2", function() {
        return this._mobileField2;
      });
      defineSetter(this, "mobileField3", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._mobileField3=val;
        }
      });
      defineGetter(this, "mobileField3", function() {
        return this._mobileField3;
      });
      defineSetter(this, "mobileField4", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._mobileField4=val;
        }
      });
      defineGetter(this, "mobileField4", function() {
        return this._mobileField4;
      });
      
      defineSetter(this, "expandedHeight", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._expandedHeight=val;
        }
      });
      defineGetter(this, "expandedHeight", function() {
        return this._expandedHeight;
      });

      defineSetter(this, "collapsedHeight", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._collapsedHeight=val;
        }
      });
      defineGetter(this, "collapsedHeight", function() {
        return this._collapsedHeight;
      });

      defineSetter(this, "expandedHeightMobile", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._expandedHeightMobile=val;
        }
      });
      defineGetter(this, "expandedHeightMobile", function() {
        return this._expandedHeightMobile;
      });

      defineSetter(this, "collapsedHeightMobile", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._collapsedHeightMobile=val;
        }
      });
      defineGetter(this, "collapsedHeightMobile", function() {
        return this._collapsedHeightMobile;
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



      defineSetter(this, "additionalDetailsLabel10Tab1", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._additionalDetailsLabel10Tab1=val;
        }
      });
      defineGetter(this, "additionalDetailsLabel10Tab1", function() {
        return this._additionalDetailsLabel10Tab1;
      });

      defineSetter(this, "additionalDetailsLabel11Tab1", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._additionalDetailsLabel11Tab1=val;
        }
      });
      defineGetter(this, "additionalDetailsLabel11Tab1", function() {
        return this._additionalDetailsLabel11Tab1;
      });

      defineSetter(this, "additionalDetailsLabel12Tab1", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._additionalDetailsLabel12Tab1=val;
        }
      });
      defineGetter(this, "additionalDetailsLabel12Tab1", function() {
        return this._additionalDetailsLabel12Tab1;
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
      defineSetter(this, "additionalDetailsJson2Tab1", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._additionalDetailsJson2Tab1=val;
        }
      });
      defineGetter(this, "additionalDetailsJson2Tab1", function() {
        return this._additionalDetailsJson2Tab1;
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
      defineSetter(this, "sknBusinessPayee", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._sknBusinessPayee=val;
        }
      });
      defineGetter(this, "sknBusinessPayee", function() {
        return this._sknBusinessPayee;
      });          
      defineSetter(this, "sknColumn3Mobile", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._sknColumn3Mobile=val;
        }
      });
      defineGetter(this, "sknColumn3Mobile", function() {
        return this._sknColumn3Mobile;
      });

      defineSetter(this, "sknColumn4Mobile", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._sknColumn4Mobile=val;
        }
      });
      defineGetter(this, "sknColumn4Mobile", function() {
        return this._sknColumn4Mobile;
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
      defineSetter(this, "SearchFields", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._SearchFields =val;
        }
      });
      defineGetter(this, "SearchFields", function() {
        return this._SearchField;
      });
      defineSetter(this, "filterParam", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._FilterParams=val;
        }
      });
      defineGetter(this, "filterParam", function() {
        return this._FilterParams;
      });

      defineSetter(this, "sortParams", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._SortParams=val;
        }
      });
      defineGetter(this, "sortParams", function() {
        return this._SortParams;
      });

      defineSetter(this, "accountNumberLength", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._accountNumberLength = val;
        }
      });
      defineGetter(this, "accountNumberLength", function () {
        return this._accountNumberLength;
      });

      defineSetter(this, "sknStatusActive", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._sknStatusActive = val;
        }
      });
      defineGetter(this, "sknStatusActive", function () {
        return this._sknStatusActive;
      });

      defineSetter(this, "sknStatusExpired", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._sknStatusExpired = val;
        }
      });
      defineGetter(this, "sknStatusExpired", function () {
        return this._sknStatusExpired;
      });

      defineSetter(this, "sknStatusPending", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._sknStatusPending = val;
        }
      });
      defineGetter(this, "sknStatusPending", function () {
        return this._sknStatusPending;
      });

      defineSetter(this, "sknStatusRejected", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._sknStatusRejected = val;
        }
      });
      defineGetter(this, "sknStatusRejected", function () {
        return this._sknStatusRejected;
      });

      defineSetter(this, "amountFormat", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._amountFormat = val;
        }
      });
      defineGetter(this, "amountFormat", function () {
        return this._amountFormat;
      });

      defineSetter(this, "sknRowNormal", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._sknRowNormal = val;
        }
      });
      defineGetter(this, "sknRowNormal", function () {
        return this._sknRowNormal;
      });
      defineSetter(this, "viewAttachmentService", function (val) {
        if ((typeof val === 'boolean') && (val !== "")) {
          this._viewAttachmentService = val;
        }
      });
      defineGetter(this, "viewAttachmentService", function () {
        return this._viewAttachmentService;
      });
      defineSetter(this, "DELETEObject", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._DELETEObject = val;
        }
      });
      defineGetter(this, "DELETEObject", function () {
        return this._DELETEObject;
      });
      defineSetter(this, "DELETEObjectService", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._DELETEObjectService = val;
        }
      });
      defineGetter(this, "DELETEObjectService", function () {
        return this._DELETEObjectService;
      });
    },

    /**
     * Component preShow.
     * Initialising set format value JSON.
     * Resetting images and values.
     */
    preShow: function() {
      this.view.onBreakpointChange = this.onBreakpointChange;
      this.setFormattingValueJSON();
      this.resetImages();
      this.noRecipients(false);
      this.setEntitlements();
      this.setComponentConfig();
      var defaultParams = {};
      var frm=kony.application.getCurrentForm();
      defaultParams.sortBy = !this.isEmptyNullUndefined(this._SortParams) ? this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._SortParams)["sortBy"])) : '';
      defaultParams.onUpdate = this.setTransactionListDesktop;
      defaultParams.filterParam = this._FilterParams;
      //defaultParams.filterValue = this._context.filterValue 
      defaultParams.filterValue = "All"; //get from filter component
      defaultParams.pageSize = this._context.limit; // get from pagination component
      defaultParams.order = !this.isEmptyNullUndefined(this._SortParams) ? this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._SortParams)["sortOrder"])) : '';
      cacheUtils = new CacheUtils(defaultParams);
      if (frm.id === "frmScheduledPaymentsNew" || frm.id === "frmPastPaymentsNew"|| frm.id==="frmPastPaymentsEurNew"|| frm.id==="frmScheduledPaymentsEurNew"|| frm.id==="frmDirectDebitsEur") {
                this.view.imgColumn1.src = "sorting_next.png";
                this.view.Column1.accessibilityConfig = {
                  "a11yARIA" : {
                    "role": "button",
                    "tabindex": 0
                  },
                "a11yLabel" :"Date"+" "+"Column. Sorted in Descending order. Click to Sort in Ascending order."
          }
    //       this.view.flxImage1.accessibilityConfig = {
    //         "a11yARIA" : {
    //           "role": "button",
    //           "tabindex": 0
    //         },
    //       "a11yLabel" :"Date"+" "+"Column. Sorted in Descending order. Click to Sort in Ascending order."
    // }
        }
      this.setAccessibility();
      this.view.imgColumn1.accessibilityConfig = {
        "a11yARIA": {
          "tabindex": -1
        },
        "a11yHidden": true
      };
      this.view.imgColumn2.accessibilityConfig = {
        "a11yARIA": {
          "tabindex": -1
        },
        "a11yHidden": true
      };
      this.view.imgColumn3.accessibilityConfig = {
        "a11yARIA": {
          "tabindex": -1
        },
        "a11yHidden": true
      };
      var scope=this;
      if(frm.id === "frmDirectDebitsEur"){
        this.view.imgColumn1.src="sorting_previous.png";
      }
      
      if (frm.id === "frmDirectDebits") {
              this.view.imgColumn1.setVisibility(false);
              this.view.imgColumn2.setVisibility(false);
              this.view.imgColumn3.setVisibility(false);
              this.view.Column1.accessibilityConfig = {
                  "a11yLabel" :  this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn1Tab1)["title"])),
                  "a11yARIA" : {
                    "tabindex": -1
                  }
                },
              this.view.Column2.accessibilityConfig = {
                  "a11yLabel" :  this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn2Tab1)["title"])),
                  "a11yARIA" : {
                    "tabindex": -1
                  }
                },
                this.view.Column3.accessibilityConfig = {
                  "a11yLabel" :  this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn3Tab1)["title"])),
                  "a11yARIA" : {
                    "tabindex": -1
                  }
                }
          }
      this.view.Column3.onKeyPress = function(eventObject,eventPayload){
        if (eventPayload.keyCode === 9 && eventPayload.shiftKey === false) {
          scope.view.segmentTransfers.setActive(0,-1);
        }
      }
      this.view.flxPopUpIC.doLayout = CommonUtilities.centerPopupFlex;
    },
    /**
     * Method to set the entitlements.
     */
    setEntitlements: function () {
      this.EntitlementUtils.setEntitlements(this._context);
    },
    /**
      * onBreakpointChange.
      * Function is triggered everytime when the breakpoint is changed.
      */
    onBreakpointChange : function(eventObj,width){
      this.onBreakpointChangeTemplate(width);
    },
    
    /**
        * setComponentConfig.
        * Responsible to set the component config data of beneficiary types and breakpoints in ParserUtilsManager.
        */
    setComponentConfig: function(){
      try{
        this.ParserUtilsManager.setbreakPointConfig(JSON.parse(this._BREAKPTS));
      }
      catch(err)
      {
        var errObj = {
          "errorInfo" : "Error in setComponentConfig method of the component.",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
      * onBreakpointChangeTemplate.
      * Responsible to get the Account Beneficiaries Data by making call to DAO layer.
      * Function is triggered everytime when the breakpoint is changed.
      * Service Callback - fetchBeneficiaryListCallBack.
      */
    onBreakpointChangeTemplate : function(width){
      if(this._refreshComponent){
        this.setStaticWidgetSkins();
        this.tabOnClick();
        this.view.rtxNoPaymentMessage.text = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._emptyListLabel)["text"]));
      }
      this._refreshComponent = true;
    },
    /**
      * setStaticWidgetSkins.
      * Responsible to assign the skins for static widgets.
      * 
      */
    setStaticWidgetSkins: function(){
      this.view.Row1.skin = this.getBreakPointTypeBasedValue(this._sknTableHeader);
      this.view.lblColumn1.skin = this.getBreakPointTypeBasedValue(this._sknTableHeaderText);
      this.view.lblColumn2.skin = this.getBreakPointTypeBasedValue(this._sknTableHeaderText);  
      this.view.lblColumn3.skin = this.getBreakPointTypeBasedValue(this._sknTableHeaderText); 
      this.view.lblColumn4.skin = this.getBreakPointTypeBasedValue(this._sknTableHeaderText);
      this.view.lblColumnAction.skin = this.getBreakPointTypeBasedValue(this._sknTableHeaderText);
    },
    /**
      * setStaticDataForRows.
      * Responsible to set the Table Column Header text on the click of particular Tab.
      */
    setStaticDataForRows: function () {
      var form =kony.application.getCurrentForm();
      if((form.id === "frmDirectDebitsEur" || form.id === "frmDirectDebits") && (this.view.lblColumn3.text === "Beneficiary Name" || "Status") && (kony.application.getCurrentBreakpoint() >= 1366)){
        this.view.Column2.width = "25%";
        this.view.Column3.width = "22%";
        this.view.Column4.left = "5%"
        this.view.ColumnAction.left = "2.3%"
      }
      if((form.id === "frmDirectDebitsEur" || form.id === "frmDirectDebits") && (this.view.lblColumn3.text === "Beneficiary Name" || "Status") && (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet)){        
                this.view.Column3.width = "20%";
                this.view.Column2.width = "27%";
                this.view.Column4.width = "11%";
                this.view.Column4.left = "4%";
                this.view.ColumnAction.left  = "5%";
              }
      this.view.lblColumn1.text = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn1Tab1)["title"]));
            //this.view.imgColumn1.toolTip = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn1Tab1)["title"]));
      if (!this.isEmptyNullUndefined(this._dataGridColumn2Tab1)) {
        this.view.Column2.isVisible = true;
        this.view.lblColumn2.text = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn2Tab1)["title"]));
                if (JSON.parse(this._dataGridColumn2Tab1).hasOwnProperty("sortBy")) {
          if(form.id === "frmDirectDebits"){
            this.view.imgColumn2.setVisibility(false);
          }else{
            this.view.imgColumn2.setVisibility(true);
          }
          //this.view.imgColumn2.toolTip = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn2Tab1)["title"]));
        } else {
          this.view.imgColumn2.setVisibility(false);
        }
      } else {
        this.view.Column2.isVisible = false;
      }
      if (!this.isEmptyNullUndefined(this._dataGridColumn3Tab1)) {
        this.view.Column3.isVisible = true;
        this.view.lblColumn3.text = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn3Tab1)["title"]));
                if (JSON.parse(this._dataGridColumn3Tab1).hasOwnProperty("sortBy")) {
          if(form.id === "frmDirectDebits"){
            this.view.imgColumn3.setVisibility(false);
          }else{
          this.view.imgColumn3.setVisibility(true);
          }
          //this.view.imgColumn3.toolTip = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn3Tab1)["title"]));
        } else {
          this.view.imgColumn3.setVisibility(false);
        }
      } else {
        this.view.Column3.isVisible = false;
      }
      if (!this.isEmptyNullUndefined(this._dataGridColumn4Tab1)) {
        this.view.Column4.isVisible = true;
        this.view.lblColumn4.text = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn4Tab1)["title"]));
        if (JSON.parse(this._dataGridColumn4Tab1).hasOwnProperty("sortBy")) {
          this.view.imgColumn4.setVisibility(true);
         // this.view.imgColumn4.toolTip = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn4Tab1)["title"]));
        } else {
          this.view.imgColumn4.setVisibility(false);
        }
      } else {
        this.view.Column4.isVisible = false;
      }
      this.view.lblColumnAction.text = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn5Tab1)["title"]));
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
     *  getProcessedText.r
     * Pass the text to parser util to obtain the processed value.
     * text {string} - value to be processed.
     * @return : {string} - processed value.
     */
    getProcessedText:function(text){
      return this.ParserUtilsManager.getParsedValue(text);
    },
    /**
      * tabOnClick.
      * Responsible to get to list of transactions from DAO layers on click of specified Tab. 
      * Deals with setting the data. 
      */
    tabOnClick: function(){
      var scope = this;
      var form =kony.application.getCurrentForm();
      this.addOrRemoveExtraColumn();
      this.view.Column1.onClick = this.onColumnClick.bind(this, this._dataGridColumn1Tab1, "imgColumn1");
      //this.view.flxImage1.onClick = this.onColumnClick.bind(this, this._dataGridColumn1Tab1, "imgColumn1");
      if(!this.isEmptyNullUndefined(this._dataGridColumn2Tab1) && !this.isEmptyNullUndefined(JSON.parse(this._dataGridColumn2Tab1)["sortBy"])){
        if(form.id === "frmDirectDebits"){
          this.view.imgColumn2.setVisibility(false);
        }else{
        this.view.Column2.onClick = this.onColumnClick.bind(this, this._dataGridColumn2Tab1, "imgColumn2");
        this.view.imgColumn2.setVisibility(true);
        }
      }else{
        this.view.imgColumn2.setVisibility(false);
      }
      if(!this.isEmptyNullUndefined(this._dataGridColumn3Tab1) && !this.isEmptyNullUndefined(JSON.parse(this._dataGridColumn3Tab1)["sortBy"])){
        if(form.id === "frmDirectDebits"){
          this.view.imgColumn2.setVisibility(false);
        }else{
        this.view.Column3.onClick = this.onColumnClick.bind(this, this._dataGridColumn3Tab1, "imgColumn3");
        this.view.imgColumn3.setVisibility(true);
        }
      }else{
        this.view.imgColumn3.setVisibility(false);
      }
      scope.TransferListDAO.fetchTransactionList(this._ObjectService, this._GETOperation, this._Object, this._GETCriteria !== "" ? JSON.parse (this._GETCriteria) : this._GETCriteria, scope.fetchTransactionListCallBack, scope.onError);
      scope.setStaticDataForRows();
    },
    /**
     * Component addOrRemoveExtraColumn.
     * Adjusts the left position and width value of the header flex container.
     */
    addOrRemoveExtraColumn : function(){        
      if(this.isEmptyNullUndefined(this._dataGridColumn4Tab1))
      {
        this.view.Column3.width="25%";
      }
      else
      {
        this.view.Column3.width="11%";
      }
    },
    /*
      * onSearch.
      * This method is used to call the search service with the given string. 
      */
    onSearch: function(searchString){
      this.onResetPagination();       
      var fields = JSON.parse(this._SearchFields)["fields"];
      cacheUtils.applySearch(fields,searchString);


    },
    
    /*
      * onFilter.
      * This method is used to call the filter service with the given param. 
      */
    onFilter: function(filterValue){
      this.onResetPagination();
      cacheUtils.applyFilter(this._FilterParams,filterValue);
    },
    /*
      *onPagination
   		offset -  starting index of the page
  		 pageSize - size of the page
  		*/
    onPagination: function (offset, pageSize) {
      cacheUtils.applyPagination(offset, pageSize);
    },
    /**
      * fetchBeneficiaryListCallBack.
      * CallBack function for fetchBeneficiaryList service call and responsible for setting the segment based on the breakpoint.
      * backendResponse {Object} - object contains the service response.
      */
    fetchTransactionListCallBack: function(backendResponse) {
      this._backendResponse = backendResponse;
      if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
        this.rowTemplate = "flxTransferActivitiesMobileIC";
        this.template_height = this._collapsedHeightMobile;
        this.expandedTemplate_height = this._expandedHeightMobile;
      } else {
        this.rowTemplate = "flxTransferActivitiesIC";
        this.template_height = this._collapsedHeight;
		this.expandedTemplate_height = this._expandedHeight;
      }
      var serviceResponse = this.getRecordsArray(this._responseRoutePathTab1, backendResponse);
      var scopeObj = this;
      if (!serviceResponse || serviceResponse.length < 1) {
        this.noRecipients(true);
        this.hidePagination();
      }
      cacheUtils.setData(serviceResponse);
      if (!this.isEmptyNullUndefined(this._SortParams)) this.setDefaultSortIcon();
      // this.setTransactionListDesktop(backendResponse);
    },
    /**
      * setTransactionListMobile.
      * responsible for setting the Transactions data to the segment for Mobile breakpoint.
      * response {Object} - contains service response data.
      */
    setTransactionListDesktop: function(serviceResponse, params) {
            var section = [];
            var scopeObj = this;
            var frm=kony.application.getCurrentForm();
            if (params.state === "search" || params.searchState == true) {
                this.hidePagination();
            } else {
                this.showPagination();
            }
            if (!serviceResponse || serviceResponse.length < 1) {
                this.noRecipients(true, params.state);
                this.hidePagination();
                kony.application.dismissLoadingScreen();
                return;
            } else {
                this.noRecipients(false);
            }
            this._prevIdx = undefined;
            var currentBreakPoint = kony.application.getCurrentBreakpoint();
            var btnActionVisibility = this.isEmptyNullUndefined(this._dataGridColumn5Tab1) ? false : true;
            var column3SkinMobile = this.isEmptyNullUndefined(this._sknColumn3Mobile) ? false : true;
            var column4SkinMobile = this.isEmptyNullUndefined(this._sknColumn4Mobile) ? false : true;
            var isCombinedUser = this.isCombinedUser();
            var flag;
            for (var i = 0; i < serviceResponse.length; i++) {
                this.btnCount = 0;
                var record = {};
                record["transactionType"] = serviceResponse[i]["transactionType"] ? serviceResponse[i]["transactionType"] : kony.i18n.getLocalizedString("i18n.common.none");
                record["beneficiaryType"] = serviceResponse[i]["beneficiaryType"] ? serviceResponse[i]["beneficiaryType"] : kony.i18n.getLocalizedString("i18n.common.none");
                record["isScheduled"] = serviceResponse[i]["isScheduled"] ? serviceResponse[i]["isScheduled"] : kony.i18n.getLocalizedString("i18n.common.none");
                record["personId"] = serviceResponse[i]["personId"] ? serviceResponse[i]["personId"] : kony.i18n.getLocalizedString("i18n.common.none");
                record["transactionId"] = serviceResponse[i]["transactionId"] ? serviceResponse[i]["transactionId"] : kony.i18n.getLocalizedString("i18n.common.none");
                record["flxDetail"] = {
                  "isVisible" : false
                }
                if(frm.id === "frmDirectDebitsEur" || frm.id === "frmDirectDebits"){
                  record["btnDropdown"] = {
                    onClick: scopeObj.onToggle.bind(scopeObj),
                    "accessibilityConfig": {
                      "a11yLabel": "show more details for reference number" + serviceResponse[i]["mandateReference"],
                      "a11yARIA": {
                          "aria-expanded": false
                      }
                  }
                  }
                }
                else{
                  record["btnDropdown"] = {
                    onClick: scopeObj.onToggle.bind(scopeObj),
                    "accessibilityConfig": {
                      "a11yLabel": "show more details for reference number" + serviceResponse[i]["transactionId"],
                      "a11yARIA": {
                          "aria-expanded": false
                      }
                  }
                  }
                }                
                record["imgDropdown"] = {
                    "src": this.getImageOrIcon(this._iconRowExpand)
                };
                if (serviceResponse[i].frequencyType !== kony.i18n.getLocalizedString("i18n.transfers.frequency.once") && this.isEmptyNullUndefined(serviceResponse[i].frequencyEndDate)) {
                    serviceResponse[i]["endDate"] = kony.i18n.getLocalizedString("i18n.transfers.lblUntilICancel");
                } else if (serviceResponse[i].frequencyType !== kony.i18n.getLocalizedString("i18n.transfers.frequency.once") && !this.isEmptyNullUndefined(serviceResponse[i].frequencyEndDate)) {
                    serviceResponse[i]["endDate"] = serviceResponse[i].frequencyEndDate ? this.getFormattedData(serviceResponse[i].frequencyEndDate, "date") : "None";
                }
                if (!this.isEmptyNullUndefined(this._retailUser) && !this.isEmptyNullUndefined(this._businessUser)) {
                    record["flxIcon"] = {
                        "isVisible": isCombinedUser ? true : false
                    };
                }
                if (this._context.accounts) {
                    flag = (this._context.accounts[serviceResponse[i].fromAccountNumber] === true || this._context.accounts[serviceResponse[i].fromAccountNumber] === "true") ? this._businessUser : this._retailUser;
                }
                record["imgIcon"] = {
                    "text": flag
                };
                record["lblColumn1"] = {
                        "text": this.getDataGridColumnValue(JSON.parse(this._dataGridColumn1Tab1), serviceResponse[i]),
                        "skin": this.getBreakPointTypeBasedValue(this._sknValueField),
                        "accessibilityConfig" : {
                          "a11yHidden" : true,
                          "a11yARIA" : {
                            "tabindex" : -1
                          }
                        },
                    };
                record["lblColumn1Dupilicate"] = {
                      "text": this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn1Tab1)["title"])) + " " + (this.getDataGridColumnValue(JSON.parse(this._dataGridColumn1Tab1), serviceResponse[i]))
  
                  };
                    //loop to set data grid values config from column 2 to 4
                    for (var j = 2; j <= 4; j++) {
                      var contract = this["_dataGridColumn" + j + "Tab1"];
                      if (!this.isEmptyNullUndefined(contract)) {
                        var label = "";
                        switch (j) {
                          case 2:
                            label = "To";
                            break;
                          case 3:
                            label = "Amount";
                            break;
                          case 4:
                            label = "Status";
                            break;
                        }
                        record["lblColumn" + j] = {
                          "isVisible": true,
                          "text": this.getDataGridColumnValue(JSON.parse(contract), serviceResponse[i]),
                          "skin": this.getBreakPointTypeBasedValue(this._sknValueField),
                          "accessibilityConfig": {
                            "a11yLabel": label +" "+ this.getDataGridColumnValue(JSON.parse(contract), serviceResponse[i]),
                            "a11yHidden" : true,
                            "a11yARIA": {
                              "tabindex": -1
                            }
                          }
                        };
                        record["lblColumn" + j+"Dupilicate"] = {
                          "text": this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(contract)["title"])) + " " + (this.getDataGridColumnValue(JSON.parse(contract), serviceResponse[i]))
                        };
                      }
                     }
                if (record["lblColumn4"] && record["lblColumn4"].isVisible) {
                    record["flxColumn3"] = {
                        "width": "14%"
                    }
                    record["flxColumn2"] = {
                      "width": "27.5%"
                  }
                record["lblColumn2"].width = "60%";
                    record["lblColumn3"].right = "4%";
                    record["flxColumn4"] = {
                      "isVisible": true,
                      "width": kony.application.getCurrentForm().id === "frmDirectDebitsEur" || kony.application.getCurrentForm().id === "frmDirectDebits" ? "11%" : "17%",
                      "left": kony.application.getCurrentForm().id === "frmDirectDebitsEur" || kony.application.getCurrentForm().id === "frmDirectDebits" ? "11.5%" : "3.5%",
                  }
                    if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                        record["lblColumn3"].right = "0%";
                    }
                } else {
                    record["flxColumn3"] = {
                        "width": "30.5%",
                        "reverseLayoutDirection": false
                    }
                    record["lblColumn3"].left = "7.2%";
                    record["flxColumn4"] = {
                        "isVisible": false
                    }
                }
                //loop to set status icon config in data grid
                for (var j = 1; j <= 4; j++) {
                    var contract = this["_dataGridColumn" + j + "Tab1"];
                    if (!this.isEmptyNullUndefined(contract) && JSON.parse(contract).hasOwnProperty("iconSkin")) {
                        contract = JSON.parse(contract);
                        var status = this.getDataGridColumnValue(contract, serviceResponse[i]);
                        if (!this.isEmptyNullUndefined(contract["iconSkin"][status])) {
                            record["flxIcon" + j] = {
                                "isVisible": true
                            }
                            record["imgIcon" + j] = {
                                "isVisible": true,
                                "skin": contract["iconSkin"][status]
                            }
                        } else {
                            record["flxIcon" + j] = {
                                "isVisible": false
                            }
                        }
                    } else {
                        record["flxIcon" + j] = {
                            "isVisible": false
                        }
                    }
                }
              if (btnActionVisibility) {
                record["btnAction"] = this.getButtonConfig(JSON.parse(this._dataGridColumn5Tab1), this._sknActionButtons, serviceResponse[i]);
                var form = kony.application.getCurrentForm();
                 if (record["btnAction"].btnId === "Edit") {
                  if(frm.id === "frmDirectDebitsEur"||frm.id === "frmDirectDebits"){
                    record["btnAction"].accessibilityConfig = {
                      "a11yARIA": {
                        "aria-label": "Edit for reference Number" + serviceResponse[i]["mandateReference"],
                          tabindex: 0,
                          "role": "link"
                      }
                    };
                  }
                  else{
                    record["btnAction"].accessibilityConfig = {
                      "a11yARIA": {
                        "aria-label": "Edit for reference Number" + serviceResponse[i]["transactionId"],
                          tabindex: 0,
                          "role": "link"
                      }
              };
                  }
                  
              };
              if (record["btnAction"].btnId === "Repeat") {
              record["btnAction"].accessibilityConfig = {
                "a11yLabel": "repeat transaction for reference number" + " "+serviceResponse[i]["transactionId"],
                "a11yARIA": {                        
                    tabindex: 0,
                    "role": "link"
                }   
              };
            };
                if (frm.id === "frmDirectDebitsEur"||frm.id === "frmDirectDebits") {
                  record["btnAction"].accessibilityConfig = {
                    "a11yLabel": "Cancel transaction for reference number" + serviceResponse[i]["mandateReference"],
                    "a11yARIA": {                        
                        tabindex: 0,
                        "role": "button"
                    }   
                  };
                }
                if (record.lblColumn2.text.includes("Mortgage Loan") && record["btnAction"].btnId === "Repeat") {
                    record["btnAction"].isVisible = false;
                  }
                    var visibility = record["btnAction"].isVisible;
                    record["flxAction"] = {
                        "isVisible": visibility
                    }
                    if (kony.application.getCurrentBreakpoint() === 1024 || orientationHandler.isTablet) {
                        record["flxAction"] = {
                            "width": "10.2%"
                        }
                        record["flxActions"] = {
                            "width": "18%"
                        }
                    }
                } else {
                    record["flxAction"] = {
                        "isVisible": false
                    }
                    record["btnAction"] = {
                        "isVisible": false
                    }
                }
                //loop to set additional details action button config
                for (var j = 1; j <= 3; j++) {
                    var contract = this["_additionalDetailsAction" + j + "Tab1"];
                    if (!this.isEmptyNullUndefined(contract)) {
                        record["btn" + j] = this.getButtonConfig(JSON.parse(contract), this._sknAdditionalDetailsButton, serviceResponse[i]);
                        if (record["btn" + j].btnId === "Cancel"){
                          record["btn" + j].accessibilityConfig = {
                              a11yARIA: {
                                  tabindex: 0,
                                  "role":"button",
                                  "aria-label":"Cancel series for reference Number" +" " + serviceResponse[i]["transactionId"],
                              }
                          };
                        };
                        if(record["btn" + j].btnId === "Skip"){
                          if(form.id === "frmDirectDebitsEur" || form.id === "frmDirectDebits"){
                            record["btn" + j].accessibilityConfig = {
                              "a11yLabel": "Skip next occurrence for transaction reference number" +" " + serviceResponse[i]["mandateReference"],
                                a11yARIA: {
                                    tabindex: 0,
                                    "role":"button"                               
                                }
                            };
                          }
                          else{
                            record["btn" + j].accessibilityConfig = {
                              "a11yLabel": "Skip next occurrence for transaction reference number" +" " + serviceResponse[i]["transactionId"],
                                a11yARIA: {
                                    tabindex: 0,
                                    "role":"button"                               
                                }
                            };
                          }                          
                        };
                        if(record["btn" + j].btnId === "Download Report"){
                          record["btn" + j].accessibilityConfig = {
                            "a11yLabel": "Download Report for transaction reference number" +" " + serviceResponse[i]["transactionId"],
                              a11yARIA: {
                                  tabindex: 0,
                                  "role":"button"                               
                              }
                          };
                        };
                        var visibility = record["btn" + j].isVisible;
                        record["flxbtn" + j] = {
                            "isVisible": visibility
                        }
                        record["lblSeparatorLineAction" + j] = {
                            "isVisible": visibility
                        }
                    } else {
                        record["flxbtn" + j] = {
                            "isVisible": false
                        }
                        record["lblSeparatorLineAction" + j] = {
                            "isVisible": false
                        }
                        record["btn" + j] = {
                            "isVisible": false
                        }
                    }
                }
                //loop to set additional details config from field 2 to field 12
                var height = 130;
                for (var j = 1; j <= 12; j++) {
                    var labelContract = this["_additionalDetailsLabel" + j + "Tab1"];
                    var valueContract = this["_additionalDetailsValue" + j + "Tab1"];
                    var valueType = this["_additionalDetailsType" + j + "Tab1"];
                    if (!this.isEmptyNullUndefined(labelContract) && !this.isEmptyNullUndefined(valueContract)) {
                        var value = this.getAdditionalDetailsValue(valueContract, valueType, serviceResponse[i]);
                        if (!this.isEmptyNullUndefined(value)) {
                            height = height + 49;
                            record["flxField" + j] = {
                                "isVisible": true
                            };
                            record["lblField" + j] = {
                                "isVisible": true,
                                "text": this.getBreakPointTypeBasedValue(labelContract),
                                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
                            }
                            record["valueField" + j] = {
                                "isVisible": true,
                                "text": value,
                                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
                            }
                        } else {
                            record["flxField" + j] = {
                                "isVisible": false
                            };
                        }
                    } else {
                        record["flxField" + j] = {
                            "isVisible": false
                        };
                    }
                }
                record["height"] = {
                    "expandedHeight": height
                };
                record["flxIdentifier"] = {
                    "height": "0dp"
                }
                record.template = this.rowTemplate
                record[this.rowTemplate] = {
                    "skin": this.getBreakPointTypeBasedValue(this._sknRowNormal)===""?"sknFFFFFFnoBor":this.getBreakPointTypeBasedValue(this._sknRowNormal),
                    "height": this.template_height,
                    "hoverSkin": this.getBreakPointTypeBasedValue(this._sknRowHover)
                }
                if (currentBreakPoint === 640 || orientationHandler.isMobile) {
                    record["flxTransfers"] = {
                        "skin": this.getBreakPointTypeBasedValue(this._sknRowNormal)
                    }
                    record["flxDetail"] = {
                        "skin": this.getBreakPointTypeBasedValue(this._sknRowExpanded),
                         "isVisible": false
                    }
                    for (var j = 1; j <= 4; j++) {
                        var labelContract = this["_mobileField" + j];
                        if (!this.isEmptyNullUndefined(labelContract)) {
                          var label = "";
                          switch (j) {
                            case 1:
                              label = "Date";
                              break;
                            case 2:
                              label = "To";
                              break;
                            case 3:
                              label = "Amount";
                              break;
                            case 4:
                              label = "Status";
                              break;
                          }
                            record["lblColumn" + j] = {
                                "text": this.getDataGridColumnValue(JSON.parse(labelContract), serviceResponse[i]),
                                "skin": this.getBreakPointTypeBasedValue(this._sknValueField),
     "accessibilityConfig": {
       "a11yHidden": true,
       "a11yLabel": label + " "+this.getDataGridColumnValue(JSON.parse(labelContract), serviceResponse[i]),
       "a11yARIA": {
         "tabindex": -1
       }
     }
                            }
                            record["flxColumn" + j] = {
                                "isVisible": true
                            }
                            if (column3SkinMobile) {
                                record["lblColumn1"].skin = this.getBreakPointTypeBasedValue(this._sknColumn3Mobile)
                            }
                            if (column4SkinMobile && record["lblColumn4"]) {
                                record["lblColumn4"].skin = this.getBreakPointTypeBasedValue(this._sknColumn4Mobile)
                            }
                        } else {
                            record["lblColumn" + j] = {
                                "isVisible": false
                            }
                            record["flxColumn" + j] = {
                                "isVisible": false
                            }
                        }
                    }
                    record["btnCount"] = this.btnCount;
                    var btnWidth;
                    if (this.btnCount === 1) {
                        btnWidth = "100%"
                    } else if (this.btnCount === 2) {
                        btnWidth = "45%"
                    } else if (this.btnCount === 3) {
                        btnWidth = "33.33%"
                    } else if (this.btnCount === 4) {
                        btnWidth = "25%"
                    }
                    record["flxActions"] = {
                        "isVisible": this.btnCount > 0
                    }
                    for (var j = 1; j <= 3; j++) {
                        if (record["btn" + j].isVisible) {
                            record["flxbtn" + j].width = btnWidth
                        }
                    }
                    if (record["btnAction"].isVisible) {
                        record["flxAction"].width = btnWidth
                    }
                }
                if(kony.application.getCurrentForm().id === "frmDirectDebitsEur" || kony.application.getCurrentForm().id === "frmDirectDebits"){
                    if(kony.application.getCurrentBreakpoint() === 1366 || orientationHandler.isDesktop){
                        record["flxAction"].left = "-55dp";
                    }
                    if(kony.application.getCurrentBreakpoint() === 1366 || orientationHandler.isDesktop){
                        record["flxColumn3"].left = "-50dp";
                    }
                }
                section.push(record);
            }
            this.view.segmentTransfers.widgetDataMap = this.getWidgetDataMap();
            this.view.segmentTransfers.skin = "sknSegScrollHide";
            this.view.segmentTransfers.setData(section);
            this.updatePaginationBar(serviceResponse.length, params.pagination.totalSize);
        },
    /**
      * onToggle.
      * responsible for changing the templates from unselected view to selected view and viceversa.
      */
    onToggle: function (widgetInfo, segInfo) {
      var currentBreakPoint = kony.application.getCurrentBreakpoint();
      var scope = this;
      var data = scope.view.segmentTransfers.data;
      var index = segInfo.rowIndex;
      sectionIdx=segInfo.sectionIndex;
      rowIdx=segInfo.rowIndex;
      data[index].flxDetail.isVisible = true;
      data[index].btnDropdown.text = "P";
      var form =kony.application.getCurrentForm();
      if(form.id === "frmDirectDebitsEur" || form.id === "frmDirectDebits")
      {
        data[index].btnDropdown.accessibilityConfig = {
          "a11yLabel": "Hide details for reference number" + data[index].valueField2.text,
          "a11yARIA": {
              "tabindex": 0,
              "aria-expanded": true
          }
      }
      }
      else{
      data[index].btnDropdown.accessibilityConfig = {
          "a11yLabel": "Hide details for reference number" + data[index].valueField1.text,
          "a11yARIA": {
              "tabindex": 0,
              "aria-expanded": true
          }
      }
    }
      if (data[index][this.rowTemplate].height === this.template_height) {
        data[index].imgDropdown = this.getImageOrIcon(this._iconRowCollapse);
        data[index].template = this.rowTemplate;
        data[index][this.rowTemplate].height = this.expandedTemplate_height;
        data[index].flxIdentifier.height = this.expandedTemplate_height;
        if (currentBreakPoint === 640 || orientationHandler.isMobile) {
          var tempHeight = data[index].height.expandedHeight;
          data[index][this.rowTemplate].height = kony.flex.USE_PREFERRED_SIZE;
          data[index].flxIdentifier.height = tempHeight + "dp";
          data[index].flxDetail.isVisible = true;
          data[index].flxTransfers.skin = this.getBreakPointTypeBasedValue(this._sknRowNormal);
          data[index].flxDetail.skin = this.getBreakPointTypeBasedValue(this._sknRowExpanded);
        } else {
          data[index][this.rowTemplate].skin = this.getBreakPointTypeBasedValue(this._sknRowExpanded);
        }
        if (this._viewAttachmentService && this.viewAttachment) {
          this.viewAttachment(data[index].transactionId, this.viewAttachmentCallback.bind(this, data[index], index));
        }
      } else {
        data[index].btnDropdown.text = "O";
        data[index].btnDropdown.accessibilityConfig = {
          "a11yLabel": "Show more details for reference number" +  data[index].valueField1.text,
          "a11yARIA": {
              "tabindex": 0,
              "aria-expanded": false
          }
      }
        data[index].imgDropdown = this.getImageOrIcon(this._iconRowExpand);
        data[index].template = this.rowTemplate;
        data[index][this.rowTemplate].height = this.template_height;
        data[index].flxIdentifier.height = "0dp";
        data[index].flxDetail.isVisible = false;
        data[index][this.rowTemplate].skin = this.getBreakPointTypeBasedValue(this._sknRowNormal);
      }
      scope.view.segmentTransfers.setDataAt(data[index], index);
      if (this._prevIdx !== null && this._prevIdx !== undefined && this._prevIdx !== index) {
        data[this._prevIdx].btnDropdown.text = "O";
        data[this._prevIdx].btnDropdown.accessibilityConfig = {
          a11yLabel: "show more Details for reference number" + data[index].valueField1.text,
          a11yARIA: {
              "tabindex": 0,
              "aria-expanded": false
          }
      }
        data[this._prevIdx].template = this.rowTemplate;
        data[this._prevIdx][this.rowTemplate].height = this.template_height;
        data[this._prevIdx].flxIdentifier.height = "0dp";
        data[this._prevIdx].flxDetail.isVisible = false;
        data[this._prevIdx][this.rowTemplate].skin = this.getBreakPointTypeBasedValue(this._sknRowNormal);
        scope.view.segmentTransfers.setDataAt(data[this._prevIdx], this._prevIdx);
      }
    kony.timer.schedule("setTime", this.setDropdownFocus, 1.5, false) ;
            this.btndropdownIndex = index;
            this.dropdown = segInfo.sectionIndex;
      this._prevIdx = index;

    },
    setDropdownFocus:function(){
            this.view.segmentTransfers.rowTemplate = "flxTransferActivitiesIC";
            this.view.segmentTransfers.setActive(this.btndropdownIndex,this.dropdown,"flxTransferActivitiesIC.flxGroup1.flxGroup2.flxSelectedRowWrapper.flxTransfers.flxDropdown.btnDropdown");
        },
    
    /**
      * getWidgetDataMap.
      * responsible for getting the widgetDataMap for both mobile and desktop breakpoint templates.
      * @return : {Object} - WidgetDataMap.
      */
    getWidgetDataMap: function(){
      return {
        "flxTransferActivitiesIC":"flxTransferActivitiesIC",
        "flxTransferActivitiesMobileIC":"flxTransferActivitiesMobileIC",
        "flxIdentifier": "flxIdentifier",
        "lblIdentifier": "lblIdentifier",
        "flxSelectedRowWrapper": "flxSelectedRowWrapper",
        "flxTransfers": "flxTransfers",
        "flxColumn1": "flxColumn1",
        "flxColumn2": "flxColumn2",
        "flxColumn3": "flxColumn3",
       "flxColumn4":"flxColumn4",
        "flxIcon": "flxIcon",
        "flxIcon1":"flxIcon1",
        "flxIcon3":"flxIcon3",
        "flxIcon4":"flxIcon4",
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
        "imgIcon": "imgIcon",
        "imgIcon1": "imgIcon1",
        "imgIcon3": "imgIcon3",
        "imgIcon4": "imgIcon4",
        //"imgDropdown": "imgDropdown",
        "btnDropdown": "btnDropdown",
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
        "flxImage1":"flxImage1",
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
        "lblSeparatorLineAction3": "lblSeparatorLineAction3",
        "lblColumn1Dupilicate": "lblColumn1Dupilicate",
        "lblColumn2Dupilicate": "lblColumn2Dupilicate",
        "lblColumn3Dupilicate": "lblColumn3Dupilicate",
        "lblColumn4Dupilicate": "lblColumn4Dupilicate"
      };
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
     *  getProcessedText.
     * Pass the text to parser util to obtain the processed value.
     * text {string} - value to be processed.
     * @return : {string} - processed value.
     */
    getProcessedText:function(text){
      return this.ParserUtilsManager.getParsedValue(text);
    },
    /**
      * getBreakPointTypeBasedValue.
      * responsible for getting the beneficiary type specific value.
      * value {JSONObject or String} - Value that needs to be processed.
      * type {String} - Beneficiary Type.
      * @return : {string} - Processed value.
      */
    getBeneficiaryTypeBasedValue: function(value){
      var value 
      if(this.isJSON(value)){
        value = JSON.parse(value);
      }
      if (typeof (value) === 'string') {
        return this.getProcessedText(value);
      }
      else if (typeof (value) === "object" && Array.isArray(value)) {
        var processedArray = [];
        value.forEach(function (item, index) {
          processedArray[index] = {};
          for (var property in item) {
            processedArray[index][property] = this.getProcessedText(item[property]);
          }
        }.bind(this));
        return processedArray;
      }
      else return this.getProcessedText(JSON.stringify(value));
    },
    /**
      * setFormattingJSON.
      * Responsible to set the formatting values by taking from contracts.
      */
    setFormattingValueJSON: function(){
      var DataFormat;
      var BackendDataFormat;
      var AmountFormat;
      if (!this.isEmptyNullUndefined(this._dateFormat)) {
        DataFormat = JSON.parse(this._dateFormat);
      } else {
        DataFormat = "";
      }
      if (!this.isEmptyNullUndefined(this._dateFormat)) {
        BackendDataFormat = JSON.parse(this._backendDateFormat);
      } else {
        BackendDataFormat = "";
      }
      if (!this.isEmptyNullUndefined(this._amountFormat)) {
        AmountFormat = JSON.parse(this._amountFormat);
      } else {
        AmountFormat = "";
      }
      this.formattingJSON = {
        "dateFormat": DataFormat,
        "backenddateformat": BackendDataFormat,
        "accountNumberLength": this._accountNumberLength,
        "amountFormat": AmountFormat
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
      return data ? data : "None";
    },
    /**
      * noRecipients.
      * This method is responsible for showing no beneficiary message.
      */
    noRecipients: function (boolean, state) {
      this.view.flxsegment.setVisibility(!boolean);
      this.view.flxNoTransactions.setVisibility(boolean);
      if (state && state === "search")
        this.view.rtxNoPaymentMessage.text = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._noSearchResult)["text"]));
      else
        this.view.rtxNoPaymentMessage.text = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._emptyListLabel)["text"]));
    },
    /**
     * onColumnClick.
     * Deals with onClick of images.
     * This method is responsible for determining the critieria to be sent to sort service.
     */
    onColumnClick: function(column, image, buttonInfo){
      var sortBy = JSON.parse(column)["sortBy"];
      var order;
      this.view["Column1"].accessibilityConfig = {
        "a11yLabel":this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn1Tab1)["title"])) + " "+"Column.No Sort applied. Click to Sort in Ascending order" 
       }
      //  this.view["flxImage1"].accessibilityConfig = {
      //   "a11yLabel":this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn1Tab1)["title"])) + " "+"Column.No Sort applied. Click to Sort in Ascending order" 
      //  }
      this.view["Column2"].accessibilityConfig = {
        "a11yLabel": this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn2Tab1)["title"])) + " "+ "Column.No Sort applied. Click to Sort in Ascending order" 
       }
      this.view["Column3"].accessibilityConfig = {
         "a11yLabel": this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn3Tab1)["title"])) + " "+"Column.No Sort applied. Click to Sort in Ascending order" 
       }
      if(this.view[image].src === JSON.parse(this._iconColumnSort)["img"] || this.view[image].src === JSON.parse(this._iconColumnSortDsc)["img"]){
        order = "asc";
        if(image === "imgColumn1") {
          buttonInfo.accessibilityConfig = {
            "a11yLabel" :this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn1Tab1)["title"]))+" "+"Column. Sorted in Ascending order. Click to Sort in Descending order."
          }
        } else if(image === "imgColumn2") {
          buttonInfo.accessibilityConfig = {
            "a11yLabel" :this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn2Tab1)["title"]))+" "+ "Column. Sorted in Ascending order. Click to Sort in Descending order."
          } 
        } else if(image === "imgColumn3") {
          buttonInfo.accessibilityConfig = {
            "a11yLabel" : this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn3Tab1)["title"]))+" "+"Column. Sorted in Ascending order. Click to Sort in Descending order."
          } 
        }
        this.view[image].src = JSON.parse(this._iconColumnSortAsc)["img"];
      }else if(this.view[image].src === JSON.parse(this._iconColumnSortAsc)["img"]){
        order = "desc"
        if(image === "imgColumn1") {
          buttonInfo.accessibilityConfig = {
            "a11yLabel" : this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn1Tab1)["title"]))+" "+"Column. Sorted in Descending order. Click to Sort in Ascending order."
          }
        } else if(image === "imgColumn2") {
          buttonInfo.accessibilityConfig = {
            "a11yLabel" : this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn2Tab1)["title"]))+" "+" Column. Sorted in Descending order. Click to Sort in Ascending order."
          } 
        } else if(image === "imgColumn3") {
          buttonInfo.accessibilityConfig = {
            "a11yLabel" : this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn3Tab1)["title"]))+" "+" Column. Sorted in Descending order. Click to Sort in Ascending order."
          } 
        }
        this.view[image].src = JSON.parse(this._iconColumnSortDsc)["img"];
      }
      this.resetImages(image);
      this.onResetPagination();
      cacheUtils.applySorting(sortBy,order);
      if(sortBy==="scheduledDate" || sortBy==="lastPaymentDate")
      {
        this.view.Column1.setActive(true);
        //this.view.flxImage1.setActive(true);
      }
      else if (sortBy==="toAccountName" || sortBy==="beneficiaryName")
      {
        this.view.Column2.setActive(true); 
      }
      else{
        this.view.Column3.setActive(true); 
      }
      //this.onSortClick(sortBy, order);
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
      * onSortClick.
      * This method is used to call the sort service with the given column value.
      * Service Callback - fetchBeneficiaryListCallBack, fetchP2PListCallback.
      */
    onSortClick: function(sortBy, order){
      var scope = this;
      var criteria = JSON.parse(this._GETCriteria);
      criteria.sortBy = sortBy;
      criteria.order = order;
      scope.TransferListDAO.fetchTransactionList(this._ObjectService,
                                                 this._GETOperation, this._Object,
                                                 criteria, scope.fetchTransactionListCallBack, scope.onError);
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
    showDeletePopup: function(data,buttonId){
      var scope = this;
      var form = kony.application.getCurrentForm();
      var popupObj = this.view.flxPopupsIC.clone();
      var headerText = buttonId === "Skip" ? this._skipDescription : this._popupDescription;
      form.add(popupObj);
      popupObj.flxPopUpIC.lblDescriptionIC.text = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(headerText)["text"]));
      popupObj.flxPopUpIC.flxTopIC.lblHeaderIC.text = kony.i18n.getLocalizedString("i18n.konybb.common.cancel");
      popupObj.isVisible = true;
      popupObj.top = "0dp";
      popupObj.left = "0dp";
      popupObj.height = "100%";
      popupObj.flxPopUpIC.flxCloseIC.accessibilityConfig = {
        a11yLabel: "Close this" +" "+buttonId + "dialog",
        a11yARIA: {
          tabindex: 0,
          role: "button"
        }
      };
      popupObj.flxPopUpIC.btnNoIC.accessibilityConfig = {
        a11yLabel: "No, don't"+" "+buttonId+" the process",
        a11yARIA: {
          tabindex: 0,
          role: "button"
        }
      };
      popupObj.flxPopUpIC.btnYesIC.accessibilityConfig = {
        a11yLabel: "yes,"+" "+buttonId+"this process",
        a11yARIA: {
          tabindex: 0,
          role: "button"
        }
      };
      popupObj.flxPopUpIC.flxCloseIC.onClick = function() {
        form.remove(popupObj);
        var frm=kony.application.getCurrentForm();
        scope.view.segmentTransfers.rowTemplate="flxTransferActivitiesIC";
        if(frm.id === "frmDirectDebitsEur"|| frm.id === "frmDirectDebits"){
          if(buttonId === "Skip"){
            scope.view.segmentTransfers.setActive(globalContext.rowIndex, globalContext.sectionIndex,"flxTransferActivitiesIC.flxGroup1.flxGroup2.flxSelectedRowWrapper.flxDetail.flxbtn1.btn1");
            }else{
              scope.view.segmentTransfers.setActive(globalContext.rowIndex, globalContext.sectionIndex,"flxTransferActivitiesIC.flxGroup1.flxGroup2.flxSelectedRowWrapper.flxTransfers.flxAction.btnAction");
            }
        }
        else{
          if(buttonId === "Skip"||buttonId === "Cancel"){
            scope.view.segmentTransfers.setActive(globalContext.rowIndex, globalContext.sectionIndex,"flxTransferActivitiesIC.flxGroup1.flxGroup2.flxSelectedRowWrapper.flxDetail.flxbtn1.btn1");
            }else{
              scope.view.segmentTransfers.setActive(globalContext.rowIndex, globalContext.sectionIndex,"flxTransferActivitiesIC.flxGroup1.flxGroup2.flxSelectedRowWrapper.flxTransfers.flxAction.btnAction");
            }
        }        
      }
      popupObj.flxPopUpIC.btnNoIC.onClick = function() {
        form.remove(popupObj);
        var frm=kony.application.getCurrentForm();
        scope.view.segmentTransfers.rowTemplate="flxTransferActivitiesIC";
        if(frm.id === "frmDirectDebitsEur" || frm.id === "frmDirectDebits"){
          if(buttonId === "Skip"){
            scope.view.segmentTransfers.setActive(globalContext.rowIndex, globalContext.sectionIndex,"flxTransferActivitiesIC.flxGroup1.flxGroup2.flxSelectedRowWrapper.flxDetail.flxbtn1.btn1");
            }else{
              scope.view.segmentTransfers.setActive(globalContext.rowIndex, globalContext.sectionIndex,"flxTransferActivitiesIC.flxGroup1.flxGroup2.flxSelectedRowWrapper.flxTransfers.flxAction.btnAction");
            }
        }
        else{
          if(buttonId === "Skip" ||buttonId === "Cancel"){
            scope.view.segmentTransfers.setActive(globalContext.rowIndex, globalContext.sectionIndex,"flxTransferActivitiesIC.flxGroup1.flxGroup2.flxSelectedRowWrapper.flxDetail.flxbtn1.btn1");
          }else{
            scope.view.segmentTransfers.setActive(globalContext.rowIndex, globalContext.sectionIndex,"flxTransferActivitiesIC.flxGroup1.flxGroup2.flxSelectedRowWrapper.flxTransfers.flxAction.btnAction");
          }
        }        
      }
      popupObj.flxPopUpIC.btnYesIC.onClick = function() {
        if(buttonId === "Skip"){scope.skipNextPayment(data);}
        else{scope.deleteExternalAccount(data);}
        form.remove(popupObj);
      }
      popupObj.onKeyPress = function(eventObject, eventPayload){
        var self = this;
        var frm=kony.application.getCurrentForm();
        if (eventPayload.keyCode === 27) {
          if(popupObj.isVisible === true){
            form.remove(popupObj);
            scope.view.segmentTransfers.rowTemplate="flxTransferActivitiesIC";
            if(frm.id === "frmDirectDebitsEur"||frm.id==="frmDirectDebits"){
              if(buttonId === "Skip"){
                scope.view.segmentTransfers.setActive(globalContext.rowIndex, globalContext.sectionIndex,"flxTransferActivitiesIC.flxGroup1.flxGroup2.flxSelectedRowWrapper.flxDetail.flxbtn1.btn1");
                }else{
                  scope.view.segmentTransfers.setActive(globalContext.rowIndex, globalContext.sectionIndex,"flxTransferActivitiesIC.flxGroup1.flxGroup2.flxSelectedRowWrapper.flxTransfers.flxAction.btnAction");
                }
            }
            else{
              if(buttonId === "Skip"||buttonId === "Cancel" ){
                scope.view.segmentTransfers.setActive(globalContext.rowIndex, globalContext.sectionIndex,"flxTransferActivitiesIC.flxGroup1.flxGroup2.flxSelectedRowWrapper.flxDetail.flxbtn1.btn1");
              }else{
                scope.view.segmentTransfers.setActive(globalContext.rowIndex, globalContext.sectionIndex,"flxTransferActivitiesIC.flxGroup1.flxGroup2.flxSelectedRowWrapper.flxTransfers.flxAction.btnAction");
              }
            }            
          }
        }
      }
      this.view.forceLayout();
      popupObj.flxPopUpIC.flxCloseIC.setActive(true);
      popupObj.flxPopUpIC.flxTopIC.lblHeaderIC.setActive(true);
    },

        /**
      * skipNextPayment.
      * responsible for deleting the Accounts Beneficiary by making call to deleteBeneficiary method in DAO layer.
      * data {Object} - object contains segment data.
      * index {Integer} - object contains seleted segment row index.
      */
    skipNextPayment: function(data){
      var scope = this;
      var payload={};
      criteria = JSON.parse(this._SKIPCriteria);
      for(var key in criteria){
        payload[key] =data[criteria[key]];
      }
      scope.TransferListDAO.deleteBeneficiary(this._ObjectService,
                                              this._SKIPOperation, this._Object,
                                              payload, scope.skipNextPaymentCallBack, scope.onError);
    },
    /**
         * skipNextPaymentCallBack.
         * CallBack function for skipNextPayment service call, responsible for fetching the updated transaction list.
         * response {Object} - object contains the service response.
         */
    skipNextPaymentCallBack: function(response) {
      var scope = this;
      scope.TransferListDAO.fetchTransactionList(this._ObjectService, this._GETOperation, this._Object, this._GETCriteria !== "" ? JSON.parse (this._GETCriteria): this._GETCriteria, scope.fetchTransactionListCallBack, scope.onError);
      this.showSkipPopup(response);

    },
    /**
      * deleteExternalAccount.
      * responsible for deleting the Accounts Beneficiary by making call to deleteBeneficiary method in DAO layer.
      * data {Object} - object contains segment data.
      * index {Integer} - object contains seleted segment row index.
      */
    deleteExternalAccount: function (data) {
      var scope = this;
      var payload = {};
      criteria = JSON.parse(this._DELETECriteria);
      for (var key in criteria) {
        payload[key] = data[criteria[key]];
      }
      var operationName;
      if (this.isJSON(this._DELETEOperation)) {
        var serviceName = data[this.getBeneficiaryTypeBasedValue(JSON.parse(this._DELETEOperation)["mapping"])];
        operationName = JSON.parse(this._DELETEOperation)[serviceName];
      } else {
        operationName = this._DELETEOperation;
      }
      scope.TransferListDAO.deleteBeneficiary(this._DELETEObjectService, operationName, this._DELETEObject, payload, scope.deleteBeneficiaryCallBack, scope.onError);
    },
    /**
      * deleteBeneficiaryCallBack.
      * CallBack function for deleteExternalAccount service call, responsible for fetching the updated beneficiary list.
      * response {Object} - object contains the service response.
      */
    deleteBeneficiaryCallBack: function(response){
      var scope = this;
      scope.TransferListDAO.fetchTransactionList(this._ObjectService,
                                                 this._GETOperation, this._Object,
                                                 this._GETCriteria !== "" ? JSON.parse (this._GETCriteria): this._GETCriteria, scope.fetchTransactionListCallBack, scope.onError);
      if(this._cancelPopup){
        this.showCancelPopup(response);
      }
    },
    /**
      * setParentScope.
      * This Method is exposed to the form to pass the Form Scope.
      */
    setFormScope: function(scope){
      this._parentScope = scope;
    },

    /**
     * Component setContext
     * To collect the context object required for the component 
     * context{JSONobject} - account object 
     */
    setFormContext: function(context){
      this._context=context;
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
      * isEntitled.
      * Verifies if the user is entitled for respective features & permissions.
      */
    isEntitled: function(data){
      return this.EntitlementUtils.isEntitled(data["entitlement"]);
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
     * Method to get formatted data grid column values
     * @param {Object} contract - contains contract field data
     * @param {Object} responseData - contains service response data
     */
    getDataGridColumnValue: function (contract, responseData) {
      var dataColumnKey = this.getBeneficiaryTypeBasedValue(contract["mapping"] || contract["statusMapping"]);
      var dataColumnValue;
      if (Array.isArray(dataColumnKey)) {
        dataColumnValue = [];
        dataColumnKey.forEach(function (item, index) {
          dataColumnValue[index] = {};
          for (var property in item) {
            dataColumnValue[index][property] = responseData[item[property]];
          }
        });
      } else if (this.isJSON(dataColumnKey)) {
        dataColumnKey = JSON.parse(dataColumnKey);
        dataColumnValue = {};
        for (var property in dataColumnKey) {
          dataColumnValue[property] = responseData[dataColumnKey[property]];
        }
      } else {
        dataColumnValue = responseData[dataColumnKey];
      }
      return this.getFormattedData(dataColumnValue, contract["fieldType"]);
    },
    /**
     * Method to check whether a string is JSON object or not
     * @param {String} string - contains value to be checked
     */
    isJSON: function (string) {
      try {
        return (JSON.parse(string) && !!string);
      } catch (e) {
        return false;
      }
    },
    /**
     * Method to get formatted additional details values
     * @param {Object} contract - contains contract field data
     * @param {Object} responseData - contains service response data
     */
    getAdditionalDetailsValue: function (mapping, fieldType, responseData) {
      var dataColumnKey = this.getBeneficiaryTypeBasedValue(mapping);
      var dataColumnValue;
      if (Array.isArray(dataColumnKey)) {
        dataColumnValue = [];
        dataColumnKey.forEach(function (item, index) {
          dataColumnValue[index] = {};
          for (var property in item) {
            dataColumnValue[index][property] = responseData[item[property]];
          }
        });
      } else if (this.isJSON(dataColumnKey)) {
        dataColumnKey = JSON.parse(dataColumnKey);
        dataColumnValue = {};
        if (dataColumnKey.UIMapping) {
          dataColumnValue = dataColumnKey.UIMapping[responseData[dataColumnKey.mapping]];
          if (!dataColumnValue) return;
        } else {
          for (var property in dataColumnKey) {
            dataColumnValue[property] = responseData[dataColumnKey[property]];
          }
        }
      } else {
        dataColumnValue = responseData[dataColumnKey];
      }
      return this.getFormattedData(dataColumnValue, fieldType);
    },
    /**
     * Method to get button configuration data
     * @param {Object} contract - contains contract field data
     * @param {Object} skin - contains skin contract data
     * @param {Object} responseData - contains service response data
     */
    getButtonConfig: function(contract, skin, responseData) {
      var data = {};
      if(contract.hasOwnProperty("restrictActions")){
        if(responseData[this.getBeneficiaryTypeBasedValue(contract["restrictActions"])]){
          data["isVisible"] = false;
          return data;
        }
      }
      var type = this.getDataGridColumnValue(contract, responseData);
      var scope = this;
      var typeProperties = contract[type];
      if (!this.isEmptyNullUndefined(typeProperties)) {
        var status = this.getDataGridColumnValue(typeProperties, responseData);
        var buttonProperties = typeProperties[status];
        if (!this.isEmptyNullUndefined(buttonProperties)) {
            if (this.isEntitled(buttonProperties) || buttonProperties["buttonId"] === "View Attachment") {
              data = {
                "text": this.getBreakPointTypeBasedValue(JSON.stringify(buttonProperties["title"])),
                "skin": this.getBreakPointTypeBasedValue(skin),
                "isVisible": buttonProperties["buttonId"] === "View Attachment" ? false : true,
                "btnId": buttonProperties["buttonId"],
                "onClick": function(widgetInfo, context){
                  globalContext = context;
                  scope.onButtonClick(buttonProperties["buttonId"], responseData);
                }
                //"toolTip": this.getBreakPointTypeBasedValue(JSON.stringify(buttonProperties["title"]))
              };
              buttonProperties["buttonId"] !== "View Attachment" && this.btnCount++;
              if(buttonProperties["buttonId"] === "Repeat" || buttonProperties["buttonId"] === "View Attachment" || buttonProperties["buttonId"] === "Download Report") return data;
            } else {
              data["isVisible"] = false;
            }
        } else { 
          data["isVisible"] = false; 
        }
      } 
      else {
        if (contract.nostatus && this.isEntitled(contract.nostatus)) {
          data = {
            "text": this.getBreakPointTypeBasedValue(JSON.stringify(contract["nostatus"]["title"])),
            "skin": this.getBreakPointTypeBasedValue(skin),
            "isVisible": true,
            "btnId": contract["nostatus"]["buttonId"],
            "onClick": function(widgetInfo, context){
              globalContext = context;
              scope.onButtonClick(contract["nostatus"]["buttonId"], responseData)
            }
            //"toolTip": this.getBreakPointTypeBasedValue(JSON.stringify(contract["nostatus"]["title"]))
          };
          this.btnCount++;
        } else { 
          data["isVisible"] = false; 
        }
      }
      return data;
    },
    setbackPopupFocus: function(){
      currForm = kony.application.getCurrentForm();
      if(currForm.id === "frmPastPaymentsEurNew"){
        this.view.segmentTransfers.rowTemplate="flxTransferActivitiesIC";
        this.view.segmentTransfers.setActive(globalContext.rowIndex, globalContext.sectionIndex, "flxTransferActivitiesIC.flxGroup1.flxGroup2.flxSelectedRowWrapper.flxDetail.flxActions.flxbtn3.btn3");
      }
    },
    /**
     * Method to handle button onClick Event
     * @param {String} buttonId - contains selected button id
     * @param {Object} responseData - contains service response data
     */
    onButtonClick: function (buttonId, responseData) {
      if (buttonId === "Cancel" || buttonId === "Skip") {
        this.showDeletePopup(responseData,buttonId);
      }
      else if (buttonId === "View Attachment") {
        this.onButtonAction(buttonId, this.files);
      } else {
        this.onButtonAction(buttonId, responseData);
      }
    },
    /**
     * Method to show view attachment
     * @param {Object} data - contains selected row data
     * @param {Number} index - selected row index
     * @param {Object} response - contains view attachment response data
     */
    viewAttachmentCallback: function (data, index, response) {
      var flag = false;
      for (var i = 1; i <= 3; i++) {
        var widget = data["btn" + i];
        if (widget && widget.btnId && widget.btnId === "View Attachment") {
          if (widget.isVisible === true) return;
          if (!response.fileNames || response.fileNames.length < 1) {
            data["btn" + i]["isVisible"] = false;
            data["flxbtn"+i]["isVisible"] = false;
          } else {
            data["btn" + i]["isVisible"] = true;
            data["flxbtn"+i]["isVisible"] = true;
            data["btn" + i]["text"] = kony.i18n.getLocalizedString("i18n.payments.viewAttachments"); + "(" + response.fileNames.length + ")";
            this.files = response.fileNames;
            flag = true;
          }
          break;
        }
      }
      if (flag && (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile)) {
        data["btnCount"]++;
        var btnWidth;
        if (data["btnCount"] === 1) { btnWidth = "100%" }
        else if (data["btnCount"] === 2) { btnWidth = "50%" }
        else if (data["btnCount"] === 3) { btnWidth = "33.33%" }
        else if (data["btnCount"] === 4) { btnWidth = "25%" }
        data["flxActions"] = {
          "isVisible": data["btnCount"] > 0
        }
        for (var j = 1; j <= 3; j++) {
          if (data["btn" + j].isVisible) { data["flxbtn" + j].width = btnWidth }
        }
        if (data["btnAction"].isVisible) { data["flxAction"].width = btnWidth }
      }
      this.view.segmentTransfers.setDataAt(data, index);
    },
    /**
     * Method to set default sort icon image
     */
    setDefaultSortIcon: function () {
      for (let i = 1; i <= 4; i++) {
        const contract = this['_dataGridColumn' + i + 'Tab1'];
        if (this.isEmptyNullUndefined(contract)) continue;
        const sortBy = JSON.parse(contract)["sortBy"];
        if (sortBy && sortBy === cacheUtils.sortBy) {
          this.view['imgColumn' + i].src = (cacheUtils.order === 'asc') ? JSON.parse(this._iconColumnSortAsc)["img"] : JSON.parse(this._iconColumnSortDsc)["img"];
          break;
        }
      }
    },
 
    /**
      * sets the accessibility for widgets
      */
    setAccessibility: function () {
      this.view.imgInfo.accessibilityConfig = {
        a11yARIA : {
          "tabindex" : -1
        }
      };

      if(kony.application.getCurrentForm().id==="frmPastPaymentsNew"){
        this.view.Column1.accessibilityConfig = {
        "a11yLabel" : this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn1Tab1)["title"]))+" "+"Column. Sorted in Descending order. Click to Sort in Ascending order.",
        "a11yARIA" : {
          "role": "button",
          "tabindex": 0
        }
      }
    }
    //   this.view.flxImage1.accessibilityConfig = {
    //     "a11yLabel" : this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn1Tab1)["title"]))+" "+"Column. Sorted in Descending order. Click to Sort in Ascending order.",
    //     "a11yARIA" : {
    //       "role": "button",
    //       "tabindex": 0
    //     }
    //   }
    // }
  
      
      this.view.Column2.accessibilityConfig = {
        "a11yLabel" :  this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn2Tab1)["title"]))+ " "+"Column.No Sort applied. Click to Sort in Ascending order",
        "a11yARIA" : {
          "role": "button",
          "tabindex": 0
        }
      },
      this.view.Column3.accessibilityConfig = {
        "a11yLabel" :  this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn3Tab1)["title"]))+" "+ "Column.No Sort applied. Click to Sort in Ascending order",
        "a11yARIA" : {
          "role": "button",
          "tabindex": 0
        }
      },
        this.view.rtxNoPaymentMessage.accessibilityConfig = {
        a11yARIA: {
          "tabindex": -1
        }
      },
        this.view.lblColumn1.accessibilityConfig = {
        "a11yARIA" : {
          "tabindex" : -1
        }
      },
        this.view.imgColumn1.accessibilityConfig = {
        "a11yARIA" : {
        }
      },
        this.view.Column2.accessibilityConfig = {
        "a11yLabel" :this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn2Tab1)["title"]))+" "+ "Column. No Sort applied. Click to Sort in Ascending order.",
        "a11yARIA" : {
          "role": "button",
          "tabindex": 0
        }
      },
        this.view.lblColumn2.accessibilityConfig = {
        "a11yARIA" : {
          "tabindex" : -1
        }
      },
      
        this.view.imgColumn2.accessibilityConfig = {
        "a11yARIA" : {
        }
      },
        this.view.Column3.accessibilityConfig = {
        "a11yLabel" :this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn3Tab1)["title"]))+" "+ "Column. No Sort applied. Click to Sort in Ascending order.",
        "a11yARIA" : {
          "role": "button",
          "tabindex": 0
        }
      },
        this.view.lblColumn3.accessibilityConfig = {
        "a11yARIA" : {
          "tabindex" : -1
        }
      },
        this.view.imgColumn3.accessibilityConfig = {
        "a11yARIA" : {
        }
      },         
        this.view.imgColumn4.accessibilityConfig = {
        "a11yARIA" : {
        }
      },
        this.view.lblColumn4.accessibilityConfig = {
        "a11yARIA" : {
          "tabindex" : -1
        }
      },
        this.view.lblColumnAction.accessibilityConfig = {
        "a11yARIA" : {
          "tabindex" : -1
        }
      },
       this.view.segmentTransfers.accessibilityConfig = {
          "a11yARIA" : {
          "tabindex" : -1
        }
      } 
    }
  };
});
