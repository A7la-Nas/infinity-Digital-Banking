define(['./manageBillerDAO','./ParserUtilsManager','./FormatUtils','./EntitlementUtils', 'CommonUtilities'],function(manageBillerDAO,ParserUtilsManager,FormatUtils,EntitlementUtils,CommonUtilities) {
  var sortingFlag = {};
  var eBillIndex = "";
  var deleteIndex = "";
  var payBillFlag = "";
  var deActivateEbillFlag = "";
  var deActivateIndex="";
  var searchClearFlag="";
	return {
      constructor: function(baseConfig, layoutConfig, pspConfig) {
        this.ManageBillerDAO = new manageBillerDAO();
        this.ParserUtilsManager = new ParserUtilsManager();
        this.FormatUtils = new FormatUtils();
        this.EntitlementUtils = new EntitlementUtils();

        //declaration for Row expanded skin in the group:Skins
        this._sknRowExpanded="";
        
        //declaration for title in the group:General
        this._title="";

        //declaration for Date Format in the group:Date
        this._dateFormat="";

        //declaration for Amount Format in the group:Amount
        this._amountFormat="";

        //declaration for Placeholder in the group:Search
        this._placeHolderSearch="";

        //declaration for Payee Icons Visibility in the group:General
        this._payeeIconVisibility="";

        //declaration for Row expand icon in the group:Images/Icons
        this._iconRowExpand="";

        //declaration for Response Path in the group:Data Grid
        this._responsePath="";
        
        //declaration for Response Path For Search in the group:Data Grid
        this._responsePathSearch="";

        //declaration for Field 1 Label in the group:Additional Details
        this._additionalDetailsLabel1="";

        //declaration for Breakpoints in the group:Component Configs
        this._BREAKPTS="";

        //declaration for Popup Title in the group:Activate Ebill PopUp
        this._ebillPopupTitle="";

        //declaration for Inplace search/sort in the group:General
        this._inPlaceHandling="";

        //declaration for Ebill Visibility in the group:General
        this._ebillVisibility="";

        //declaration for Field 1 in the group:Activate Ebill PopUp
        this._popupField1="";

        //declaration for Payee Object Service  in the group:Payee Management Services
        this._payeeObjectService="";

        //declaration for Row hover skin in the group:Skins
        this._sknRowHover="";

        //declaration for Backend Date Format in the group:Date
        this._backendDateFormat="";

        //declaration for Search Icon in the group:Search
        this._iconSearch="";

        //declaration for Row collapse icon in the group:Images/Icons
        this._iconRowCollapse="";

        //declaration for Column 1 in the group:Data Grid
        this._dataGridColumn1="";

        //declaration for Field 1 Value in the group:Additional Details
        this._additionalDetailsValue1="";

        //declaration for Field 1 Value in the group:Activate Ebill PopUp
        this._popupField1Value="";

        //declaration for Payee Object in the group:Payee Management Services
        this._payeeObject="";

        //declaration for Row Separator skin in the group:Skins
        this._sknRowSeperator="";

        //declaration for Pagination previous icon in the group:Images/Icons
        this._iconPaginationPrevious="";

        //declaration for Field 1 Type in the group:Additional Details
        this._additionalDetailsType1="";

        //declaration for Column Ebill  in the group:Data Grid
        this._dataGridEbill="";

        //declaration for Search Field List in the group:Search
        this._searchFieldList="";

        //declaration for Field 1 Type in the group:Activate Ebill PopUp
        this._popupField1Type="";

        //declaration for Column 2 in the group:Data Grid
        this._dataGridColumn2="";

        //declaration for Payee GET Operation in the group:Payee Management Services
        this._payeeGETOperation="";

        //declaration for Value field skin in the group:Skins
        this._sknValueField="";

        //declaration for Pagination next icon in the group:Images/Icons
        this._iconPaginationNext="";

        //declaration for Field 2 Label in the group:Additional Details
        this._additionalDetailsLabel2="";

        //declaration for Field 2 in the group:Activate Ebill PopUp
        this._popupField2="";

        //declaration for Column 3 in the group:Data Grid
        this._dataGridColumn3="";

        //declaration for Payee GET Criteria in the group:Payee Management Services
        this._payeeGETCriteria="";

        //declaration for Column sort default in the group:Images/Icons
        this._iconColumnSort="";

        //declaration for Field 2 Value in the group:Additional Details
        this._additionalDetailsValue2="";

        //declaration for Optional Value field skin in the group:Skins
        this._sknOptionalValueField="";

        //declaration for Field 2 Value in the group:Activate Ebill PopUp
        this._popupField2Value="";

        //declaration for Column 2 Row 2 in the group:Data Grid
        this._dataGridColumn2Row2="";

        //declaration for Action buttons skin in the group:Skins
        this._sknActionButtons="";

        //declaration for Payee GET Service Identifier in the group:Payee Management Services
        this._payeeGETIdentifier="";

        //declaration for Column Sort Asc in the group:Images/Icons
        this._iconColumnSortAsc="";

        //declaration for Field 2 Type in the group:Additional Details
        this._additionalDetailsType2="";

        //declaration for Field 2 Type in the group:Activate Ebill PopUp
        this._popupField2Type="";

        //declaration for Column 3 Row 2 in the group:Data Grid
        this._dataGridColumn3Row2="";

        //declaration for Additional details label skin in the group:Skins
        this._sknAdditionalDetailsLabel="";

        //declaration for Payee DELETE Operation in the group:Payee Management Services
        this._payeeDELETEOperation="";

        //declaration for Column Sort Desc in the group:Images/Icons
        this._iconColumnSortDsc="";

        //declaration for Field 3 Label in the group:Additional Details
        this._additionalDetailsLabel3="";

        //declaration for Field 3 in the group:Activate Ebill PopUp
        this._popupField3="";

        //declaration for Column Action in the group:Data Grid
        this._dataGridColumnAction="";

        //declaration for Additional details value skin in the group:Skins
        this._sknAdditionalDetailsValue="";

        //declaration for Field 3 Value in the group:Additional Details
        this._additionalDetailsValue3="";

        //declaration for Payee DELETE Criteria  in the group:Payee Management Services
        this._payeeDELETECriteria="";

        //declaration for Activate Ebill Popup Image in the group:Images/Icons
        this._activateEbillPopupImage="";

        //declaration for Field 3 Value in the group:Activate Ebill PopUp
        this._popupField3Value="";

        //declaration for Additional details Action buttons skin in the group:Skins
        this._sknAdditionalDetailsButton="";

        //declaration for Field 3 Type in the group:Additional Details
        this._additionalDetailsType3="";

        //declaration for Payee DELETE Service Identifier in the group:Payee Management Services
        this._payeeDELETEIdentifier="";

        //declaration for Field 3 Type in the group:Activate Ebill PopUp
        this._popupField3Type="";

        //declaration for Search TextBox Skin in the group:Skins
        this._sknSearchTextBox="";

        //declaration for Field 4 Label in the group:Additional Details
        this._additionalDetailsLabel4="";

        //declaration for Payee Search Object Service in the group:Payee Management Services
        this._payeeSearchObjectService="";

        //declaration for Additional Text 1 in the group:Activate Ebill PopUp
        this._additionalText1="";

        //declaration for Search TextBox Placeholder Skin in the group:Skins
        this._sknSearchPlaceHolderTextBox="";

        //declaration for Field 4 Value in the group:Additional Details
        this._additionalDetailsValue4="";

        //declaration for Payee Search Object in the group:Payee Management Services
        this._payeeSearchObject="";

        //declaration for Additional Text 2 in the group:Activate Ebill PopUp
        this._additionalText2="";

        //declaration for Search TextBox Focus Skin in the group:Skins
        this._sknSearchTextBoxFocus="";

        //declaration for Field 4 Type in the group:Additional Details
        this._additionalDetailsType4="";

        //declaration for Payee SEARCH Operation in the group:Payee Management Services
        this._payeeSEARCHOperation="";

        //declaration for Additional Text 3 in the group:Activate Ebill PopUp
        this._additionalText3="";

        //declaration for Ebill Button Enabled Skin in the group:Skins
        this._sknEbillButtonEnabledSkin="";
        
        //declaration for Tab Enabled Skin in the group:Skins
        this._sknActiveTab="";
        
        //declaration for Tab Disabled Skin in the group:Skins
        this._sknInactiveTab="";
        
        //declaration for Field 5 Label in the group:Additional Details
        this._additionalDetailsLabel5="";

        //declaration for Payee SEARCH Criteria in the group:Payee Management Services
        this._payeeSEARCHCriteria="";

        //declaration for Ebill Button Disabled Skin in the group:Skins
        this._sknEbillButtonDisabledSkin="";

        //declaration for Field 5 Value in the group:Additional Details
        this._additionalDetailsValue5="";

        //declaration for Payee SEARCH Service Identifier in the group:Payee Management Services
        this._payeeSEARCHIdentifier="";

        //declaration for Field 5 Type in the group:Additional Details
        this._additionalDetailsType5="";

        //declaration for Activate/Deactivate Ebill Object Service in the group:Payee Management Services
        this._payeeEbillObjectService="";

        //declaration for Field 6 Label in the group:Additional Details
        this._additionalDetailsLabel6="";

        //declaration for Activate/Deactivate Ebill  Object in the group:Payee Management Services
        this._payeeEbillObject="";

        //declaration for Field 6 Value in the group:Additional Details
        this._additionalDetailsValue6="";

        //declaration for Activate Ebill Operation in the group:Payee Management Services
        this._activateEbillOperation="";

        //declaration for Field 6 Type in the group:Additional Details
        this._additionalDetailsType6="";

        //declaration for Activate Ebill Criteria in the group:Payee Management Services
        this._activateEbillCriteria="";

        //declaration for Field 7 Label in the group:Additional Details
        this._additionalDetailsLabel7="";

        //declaration for Activate Ebill Service Identifier in the group:Payee Management Services
        this._activateEbillIdentifier="";

        //declaration for Field 7 Value in the group:Additional Details
        this._additionalDetailsValue7="";

        //declaration for Deactivate Ebill Operation in the group:Payee Management Services
        this._deactivateEbillOperation="";

        //declaration for Field 7 Type in the group:Additional Details
        this._additionalDetailsType7="";

        //declaration for Deactivate Ebill Criteria in the group:Payee Management Services
        this._deactivateEbillCriteria="";

        //declaration for Field 8 Label in the group:Additional Details
        this._additionalDetailsLabel8="";

        //declaration for Deactivate Ebill Serivce Identifier in the group:Payee Management Services
        this._deactivateEbillIdentifier="";

        //declaration for Field 8 Value in the group:Additional Details
        this._additionalDetailsValue8="";

        //declaration for Payee Get All Criteria in the group:Payee Management Services
        this._payeeGETALLCriteria="";

        //declaration for Field 8 Type in the group:Additional Details
        this._additionalDetailsType8="";

        //declaration for Field 9 Label in the group:Additional Details
        this._additionalDetailsLabel9="";

        //declaration for Field 9 Value in the group:Additional Details
        this._additionalDetailsValue9="";

        //declaration for Field 9 Type in the group:Additional Details
        this._additionalDetailsType9="";

        //declaration for Additional Details Action 1 in the group:Additional Details
        this._additionalDetailsAction1="";

        //declaration for Additional Details Action 2 in the group:Additional Details
        this._additionalDetailsAction2="";

        //declaration for Additional Details Action 3 in the group:Additional Details
        this._additionalDetailsAction3="";

        //declaration for Additional Details Action 4 in the group:Additional Details
        this._additionalDetailsAction4="";
        
        //declaration for Tab 1 in the group:Tabs
        this._tab1="";
        
        //declaration for Tab 2 in the group:Tabs
        this._tab2="";
        
        //declaration for Tab 3 in the group:Tabs
        this._tab3="";
        
        //declaration for Tab 4 in the group:Tabs
        this._tab4="";
        
        //declaration for Tab 5 in the group:Tabs
        this._tab5="";
        
        // CONTROLLER VARIABLES.
        this._context = "";
        this._maxColumnLimit = 3;
        this._parentScope = "";
        this._currentPage = 1;
        this._currentOrder = "asc";
        this._currentSorting = "default";
        this._currentSortByType = "string";
        this.formattingJSON = {};
        this._searchResult = false;
        this._refreshComponent=true;
        this.btnCount=0;
      },
      
      //Logic for getters/setters of custom properties
      initGettersSetters: function(){
        //setter method for Row expanded skin in the group:Skins
        defineSetter(this, "sknRowExpanded", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._sknRowExpanded=val;
          }
        });

        //getter method for Row expanded skin in the group:Skins
        defineGetter(this, "sknRowExpanded", function() {
          return this._sknRowExpanded;
        });
        
         //setter method for title in the group:General
        defineSetter(this, "title", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._title=val;
          }
        });

        //getter method for title in the group:General
        defineGetter(this, "title", function() {
          return this._title;
        });

        //setter method for Date Format in the group:Date
        defineSetter(this, "dateFormat", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._dateFormat=val;
          }
        });

        //getter method for Date Format in the group:Date
        defineGetter(this, "dateFormat", function() {
          return this._dateFormat;
        });

        //setter method for Amount Format in the group:Amount
        defineSetter(this, "amountFormat", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._amountFormat=val;
          }
        });

        //getter method for Amount Format in the group:Amount
        defineGetter(this, "amountFormat", function() {
          return this._amountFormat;
        });

        //setter method for Placeholder in the group:Search
        defineSetter(this, "placeHolderSearch", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._placeHolderSearch=val;
          }
        });

        //getter method for Placeholder in the group:Search
        defineGetter(this, "placeHolderSearch", function() {
          return this._placeHolderSearch;
        });

        //setter method for Payee Icons Visibility in the group:General
        defineSetter(this, "payeeIconVisibility", function(val) {
          if((typeof val==='boolean') && (val !== "")){
            this._payeeIconVisibility=val;
          }
        });

        //getter method for Payee Icons Visibility in the group:General
        defineGetter(this, "payeeIconVisibility", function() {
          return this._payeeIconVisibility;
        });

        //setter method for Row expand icon in the group:Images/Icons
        defineSetter(this, "iconRowExpand", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._iconRowExpand=val;
          }
        });

        //getter method for Row expand icon in the group:Images/Icons
        defineGetter(this, "iconRowExpand", function() {
          return this._iconRowExpand;
        });

        //setter method for Response Path in the group:Data Grid
        defineSetter(this, "responsePath", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._responsePath=val;
          }
        });

        //getter method for Response Path in the group:Data Grid
        defineGetter(this, "responsePath", function() {
          return this._responsePath;
        });
        
        //setter method for Response Path in the group:Data Grid
        defineSetter(this, "responsePathSearch", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._responsePathSearch=val;
          }
        });

        //getter method for Response Path in the group:Data Grid
        defineGetter(this, "responsePathSearch", function() {
          return this._responsePathSearch;
        });

        //setter method for Field 1 Label in the group:Additional Details
        defineSetter(this, "additionalDetailsLabel1", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._additionalDetailsLabel1=val;
          }
        });

        //getter method for Field 1 Label in the group:Additional Details
        defineGetter(this, "additionalDetailsLabel1", function() {
          return this._additionalDetailsLabel1;
        });

        //setter method for Breakpoints in the group:Component Configs
        defineSetter(this, "BREAKPTS", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._BREAKPTS=val;
          }
        });

        //getter method for Breakpoints in the group:Component Configs
        defineGetter(this, "BREAKPTS", function() {
          return this._BREAKPTS;
        });

        //setter method for Popup Title in the group:Activate Ebill PopUp
        defineSetter(this, "ebillPopupTitle", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._ebillPopupTitle=val;
          }
        });

        //getter method for Popup Title in the group:Activate Ebill PopUp
        defineGetter(this, "ebillPopupTitle", function() {
          return this._ebillPopupTitle;
        });

        //setter method for Inplace search/sort in the group:General
        defineSetter(this, "inPlaceHandling", function(val) {
          if((typeof val==='boolean') && (val !== "")){
            this._inPlaceHandling=val;
          }
        });

        //getter method for Inplace search/sort in the group:General
        defineGetter(this, "inPlaceHandling", function() {
          return this._inPlaceHandling;
        });

        //setter method for Ebill Visibility in the group:General
        defineSetter(this, "ebillVisibility", function(val) {
          if((typeof val==='boolean') && (val !== "")){
            this._ebillVisibility=val;
          }
        });

        //getter method for Ebill Visibility in the group:General
        defineGetter(this, "ebillVisibility", function() {
          return this._ebillVisibility;
        });

        //setter method for Field 1 in the group:Activate Ebill PopUp
        defineSetter(this, "popupField1", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._popupField1=val;
          }
        });

        //getter method for Field 1 in the group:Activate Ebill PopUp
        defineGetter(this, "popupField1", function() {
          return this._popupField1;
        });

        //setter method for Payee Object Service  in the group:Payee Management Services
        defineSetter(this, "payeeObjectService", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._payeeObjectService=val;
          }
        });

        //getter method for Payee Object Service  in the group:Payee Management Services
        defineGetter(this, "payeeObjectService", function() {
          return this._payeeObjectService;
        });

        //setter method for Row hover skin in the group:Skins
        defineSetter(this, "sknRowHover", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._sknRowHover=val;
          }
        });

        //getter method for Row hover skin in the group:Skins
        defineGetter(this, "sknRowHover", function() {
          return this._sknRowHover;
        });

        //setter method for Backend Date Format in the group:Date
        defineSetter(this, "backendDateFormat", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._backendDateFormat=val;
          }
        });

        //getter method for Backend Date Format in the group:Date
        defineGetter(this, "backendDateFormat", function() {
          return this._backendDateFormat;
        });

        //setter method for Search Icon in the group:Search
        defineSetter(this, "iconSearch", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._iconSearch=val;
          }
        });

        //getter method for Search Icon in the group:Search
        defineGetter(this, "iconSearch", function() {
          return this._iconSearch;
        });

        //setter method for Row collapse icon in the group:Images/Icons
        defineSetter(this, "iconRowCollapse", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._iconRowCollapse=val;
          }
        });

        //getter method for Row collapse icon in the group:Images/Icons
        defineGetter(this, "iconRowCollapse", function() {
          return this._iconRowCollapse;
        });

        //setter method for Column 1 in the group:Data Grid
        defineSetter(this, "dataGridColumn1", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._dataGridColumn1=val;
          }
        });

        //getter method for Column 1 in the group:Data Grid
        defineGetter(this, "dataGridColumn1", function() {
          return this._dataGridColumn1;
        });

        //setter method for Field 1 Value in the group:Additional Details
        defineSetter(this, "additionalDetailsValue1", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._additionalDetailsValue1=val;
          }
        });

        //getter method for Field 1 Value in the group:Additional Details
        defineGetter(this, "additionalDetailsValue1", function() {
          return this._additionalDetailsValue1;
        });

        //setter method for Field 1 Value in the group:Activate Ebill PopUp
        defineSetter(this, "popupField1Value", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._popupField1Value=val;
          }
        });

        //getter method for Field 1 Value in the group:Activate Ebill PopUp
        defineGetter(this, "popupField1Value", function() {
          return this._popupField1Value;
        });

        //setter method for Payee Object in the group:Payee Management Services
        defineSetter(this, "payeeObject", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._payeeObject=val;
          }
        });

        //getter method for Payee Object in the group:Payee Management Services
        defineGetter(this, "payeeObject", function() {
          return this._payeeObject;
        });

        //setter method for Row Separator skin in the group:Skins
        defineSetter(this, "sknRowSeperator", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._sknRowSeperator=val;
          }
        });

        //getter method for Row Separator skin in the group:Skins
        defineGetter(this, "sknRowSeperator", function() {
          return this._sknRowSeperator;
        });

        //setter method for Pagination previous icon in the group:Images/Icons
        defineSetter(this, "iconPaginationPrevious", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._iconPaginationPrevious=val;
          }
        });

        //getter method for Pagination previous icon in the group:Images/Icons
        defineGetter(this, "iconPaginationPrevious", function() {
          return this._iconPaginationPrevious;
        });

        //setter method for Field 1 Type in the group:Additional Details
        defineSetter(this, "additionalDetailsType1", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._additionalDetailsType1=val;
          }
        });

        //getter method for Field 1 Type in the group:Additional Details
        defineGetter(this, "additionalDetailsType1", function() {
          return this._additionalDetailsType1;
        });

        //setter method for Column Ebill  in the group:Data Grid
        defineSetter(this, "dataGridEbill", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._dataGridEbill=val;
          }
        });

        //getter method for Column Ebill  in the group:Data Grid
        defineGetter(this, "dataGridEbill", function() {
          return this._dataGridEbill;
        });

        //setter method for Search Field List in the group:Search
        defineSetter(this, "searchFieldList", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._searchFieldList=val;
          }
        });

        //getter method for Search Field List in the group:Search
        defineGetter(this, "searchFieldList", function() {
          return this._searchFieldList;
        });

        //setter method for Field 1 Type in the group:Activate Ebill PopUp
        defineSetter(this, "popupField1Type", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._popupField1Type=val;
          }
        });

        //getter method for Field 1 Type in the group:Activate Ebill PopUp
        defineGetter(this, "popupField1Type", function() {
          return this._popupField1Type;
        });

        //setter method for Column 2 in the group:Data Grid
        defineSetter(this, "dataGridColumn2", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._dataGridColumn2=val;
          }
        });

        //getter method for Column 2 in the group:Data Grid
        defineGetter(this, "dataGridColumn2", function() {
          return this._dataGridColumn2;
        });

        //setter method for Payee GET Operation in the group:Payee Management Services
        defineSetter(this, "payeeGETOperation", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._payeeGETOperation=val;
          }
        });

        //getter method for Payee GET Operation in the group:Payee Management Services
        defineGetter(this, "payeeGETOperation", function() {
          return this._payeeGETOperation;
        });

        //setter method for Value field skin in the group:Skins
        defineSetter(this, "sknValueField", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._sknValueField=val;
          }
        });

        //getter method for Value field skin in the group:Skins
        defineGetter(this, "sknValueField", function() {
          return this._sknValueField;
        });

        //setter method for Pagination next icon in the group:Images/Icons
        defineSetter(this, "iconPaginationNext", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._iconPaginationNext=val;
          }
        });

        //getter method for Pagination next icon in the group:Images/Icons
        defineGetter(this, "iconPaginationNext", function() {
          return this._iconPaginationNext;
        });

        //setter method for Field 2 Label in the group:Additional Details
        defineSetter(this, "additionalDetailsLabel2", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._additionalDetailsLabel2=val;
          }
        });

        //getter method for Field 2 Label in the group:Additional Details
        defineGetter(this, "additionalDetailsLabel2", function() {
          return this._additionalDetailsLabel2;
        });

        //setter method for Field 2 in the group:Activate Ebill PopUp
        defineSetter(this, "popupField2", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._popupField2=val;
          }
        });

        //getter method for Field 2 in the group:Activate Ebill PopUp
        defineGetter(this, "popupField2", function() {
          return this._popupField2;
        });

        //setter method for Column 3 in the group:Data Grid
        defineSetter(this, "dataGridColumn3", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._dataGridColumn3=val;
          }
        });

        //getter method for Column 3 in the group:Data Grid
        defineGetter(this, "dataGridColumn3", function() {
          return this._dataGridColumn3;
        });

        //setter method for Payee GET Criteria in the group:Payee Management Services
        defineSetter(this, "payeeGETCriteria", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._payeeGETCriteria=val;
          }
        });

        //getter method for Payee GET Criteria in the group:Payee Management Services
        defineGetter(this, "payeeGETCriteria", function() {
          return this._payeeGETCriteria;
        });

        //setter method for Column sort default in the group:Images/Icons
        defineSetter(this, "iconColumnSort", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._iconColumnSort=val;
          }
        });

        //getter method for Column sort default in the group:Images/Icons
        defineGetter(this, "iconColumnSort", function() {
          return this._iconColumnSort;
        });

        //setter method for Field 2 Value in the group:Additional Details
        defineSetter(this, "additionalDetailsValue2", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._additionalDetailsValue2=val;
          }
        });

        //getter method for Field 2 Value in the group:Additional Details
        defineGetter(this, "additionalDetailsValue2", function() {
          return this._additionalDetailsValue2;
        });

        //setter method for Optional Value field skin in the group:Skins
        defineSetter(this, "sknOptionalValueField", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._sknOptionalValueField=val;
          }
        });

        //getter method for Optional Value field skin in the group:Skins
        defineGetter(this, "sknOptionalValueField", function() {
          return this._sknOptionalValueField;
        });

        //setter method for Field 2 Value in the group:Activate Ebill PopUp
        defineSetter(this, "popupField2Value", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._popupField2Value=val;
          }
        });

        //getter method for Field 2 Value in the group:Activate Ebill PopUp
        defineGetter(this, "popupField2Value", function() {
          return this._popupField2Value;
        });

        //setter method for Column 2 Row 2 in the group:Data Grid
        defineSetter(this, "dataGridColumn2Row2", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._dataGridColumn2Row2=val;
          }
        });

        //getter method for Column 2 Row 2 in the group:Data Grid
        defineGetter(this, "dataGridColumn2Row2", function() {
          return this._dataGridColumn2Row2;
        });

        //setter method for Action buttons skin in the group:Skins
        defineSetter(this, "sknActionButtons", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._sknActionButtons=val;
          }
        });

        //getter method for Action buttons skin in the group:Skins
        defineGetter(this, "sknActionButtons", function() {
          return this._sknActionButtons;
        });

        //setter method for Payee GET Service Identifier in the group:Payee Management Services
        defineSetter(this, "payeeGETIdentifier", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._payeeGETIdentifier=val;
          }
        });

        //getter method for Payee GET Service Identifier in the group:Payee Management Services
        defineGetter(this, "payeeGETIdentifier", function() {
          return this._payeeGETIdentifier;
        });

        //setter method for Column Sort Asc in the group:Images/Icons
        defineSetter(this, "iconColumnSortAsc", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._iconColumnSortAsc=val;
          }
        });

        //getter method for Column Sort Asc in the group:Images/Icons
        defineGetter(this, "iconColumnSortAsc", function() {
          return this._iconColumnSortAsc;
        });

        //setter method for Field 2 Type in the group:Additional Details
        defineSetter(this, "additionalDetailsType2", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._additionalDetailsType2=val;
          }
        });

        //getter method for Field 2 Type in the group:Additional Details
        defineGetter(this, "additionalDetailsType2", function() {
          return this._additionalDetailsType2;
        });

        //setter method for Field 2 Type in the group:Activate Ebill PopUp
        defineSetter(this, "popupField2Type", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._popupField2Type=val;
          }
        });

        //getter method for Field 2 Type in the group:Activate Ebill PopUp
        defineGetter(this, "popupField2Type", function() {
          return this._popupField2Type;
        });

        //setter method for Column 3 Row 2 in the group:Data Grid
        defineSetter(this, "dataGridColumn3Row2", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._dataGridColumn3Row2=val;
          }
        });

        //getter method for Column 3 Row 2 in the group:Data Grid
        defineGetter(this, "dataGridColumn3Row2", function() {
          return this._dataGridColumn3Row2;
        });

        //setter method for Additional details label skin in the group:Skins
        defineSetter(this, "sknAdditionalDetailsLabel", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._sknAdditionalDetailsLabel=val;
          }
        });

        //getter method for Additional details label skin in the group:Skins
        defineGetter(this, "sknAdditionalDetailsLabel", function() {
          return this._sknAdditionalDetailsLabel;
        });

        //setter method for Payee DELETE Operation in the group:Payee Management Services
        defineSetter(this, "payeeDELETEOperation", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._payeeDELETEOperation=val;
          }
        });

        //getter method for Payee DELETE Operation in the group:Payee Management Services
        defineGetter(this, "payeeDELETEOperation", function() {
          return this._payeeDELETEOperation;
        });

        //setter method for Column Sort Desc in the group:Images/Icons
        defineSetter(this, "iconColumnSortDsc", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._iconColumnSortDsc=val;
          }
        });

        //getter method for Column Sort Desc in the group:Images/Icons
        defineGetter(this, "iconColumnSortDsc", function() {
          return this._iconColumnSortDsc;
        });

        //setter method for Field 3 Label in the group:Additional Details
        defineSetter(this, "additionalDetailsLabel3", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._additionalDetailsLabel3=val;
          }
        });

        //getter method for Field 3 Label in the group:Additional Details
        defineGetter(this, "additionalDetailsLabel3", function() {
          return this._additionalDetailsLabel3;
        });

        //setter method for Field 3 in the group:Activate Ebill PopUp
        defineSetter(this, "popupField3", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._popupField3=val;
          }
        });

        //getter method for Field 3 in the group:Activate Ebill PopUp
        defineGetter(this, "popupField3", function() {
          return this._popupField3;
        });

        //setter method for Column Action in the group:Data Grid
        defineSetter(this, "dataGridColumnAction", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._dataGridColumnAction=val;
          }
        });

        //getter method for Column Action in the group:Data Grid
        defineGetter(this, "dataGridColumnAction", function() {
          return this._dataGridColumnAction;
        });

        //setter method for Additional details value skin in the group:Skins
        defineSetter(this, "sknAdditionalDetailsValue", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._sknAdditionalDetailsValue=val;
          }
        });

        //getter method for Additional details value skin in the group:Skins
        defineGetter(this, "sknAdditionalDetailsValue", function() {
          return this._sknAdditionalDetailsValue;
        });

        //setter method for Field 3 Value in the group:Additional Details
        defineSetter(this, "additionalDetailsValue3", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._additionalDetailsValue3=val;
          }
        });

        //getter method for Field 3 Value in the group:Additional Details
        defineGetter(this, "additionalDetailsValue3", function() {
          return this._additionalDetailsValue3;
        });

        //setter method for Payee DELETE Criteria  in the group:Payee Management Services
        defineSetter(this, "payeeDELETECriteria", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._payeeDELETECriteria=val;
          }
        });

        //getter method for Payee DELETE Criteria  in the group:Payee Management Services
        defineGetter(this, "payeeDELETECriteria", function() {
          return this._payeeDELETECriteria;
        });

        //setter method for Activate Ebill Popup Image in the group:Images/Icons
        defineSetter(this, "activateEbillPopupImage", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._activateEbillPopupImage=val;
          }
        });

        //getter method for Activate Ebill Popup Image in the group:Images/Icons
        defineGetter(this, "activateEbillPopupImage", function() {
          return this._activateEbillPopupImage;
        });

        //setter method for Field 3 Value in the group:Activate Ebill PopUp
        defineSetter(this, "popupField3Value", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._popupField3Value=val;
          }
        });

        //getter method for Field 3 Value in the group:Activate Ebill PopUp
        defineGetter(this, "popupField3Value", function() {
          return this._popupField3Value;
        });

        //setter method for Additional details Action buttons skin in the group:Skins
        defineSetter(this, "sknAdditionalDetailsButton", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._sknAdditionalDetailsButton=val;
          }
        });

        //getter method for Additional details Action buttons skin in the group:Skins
        defineGetter(this, "sknAdditionalDetailsButton", function() {
          return this._sknAdditionalDetailsButton;
        });

        //setter method for Field 3 Type in the group:Additional Details
        defineSetter(this, "additionalDetailsType3", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._additionalDetailsType3=val;
          }
        });

        //getter method for Field 3 Type in the group:Additional Details
        defineGetter(this, "additionalDetailsType3", function() {
          return this._additionalDetailsType3;
        });

        //setter method for Payee DELETE Service Identifier in the group:Payee Management Services
        defineSetter(this, "payeeDELETEIdentifier", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._payeeDELETEIdentifier=val;
          }
        });

        //getter method for Payee DELETE Service Identifier in the group:Payee Management Services
        defineGetter(this, "payeeDELETEIdentifier", function() {
          return this._payeeDELETEIdentifier;
        });

        //setter method for Field 3 Type in the group:Activate Ebill PopUp
        defineSetter(this, "popupField3Type", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._popupField3Type=val;
          }
        });

        //getter method for Field 3 Type in the group:Activate Ebill PopUp
        defineGetter(this, "popupField3Type", function() {
          return this._popupField3Type;
        });

        //setter method for Search TextBox Skin in the group:Skins
        defineSetter(this, "sknSearchTextBox", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._sknSearchTextBox=val;
          }
        });

        //getter method for Search TextBox Skin in the group:Skins
        defineGetter(this, "sknSearchTextBox", function() {
          return this._sknSearchTextBox;
        });

        //setter method for Field 4 Label in the group:Additional Details
        defineSetter(this, "additionalDetailsLabel4", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._additionalDetailsLabel4=val;
          }
        });

        //getter method for Field 4 Label in the group:Additional Details
        defineGetter(this, "additionalDetailsLabel4", function() {
          return this._additionalDetailsLabel4;
        });

        //setter method for Payee Search Object Service in the group:Payee Management Services
        defineSetter(this, "payeeSearchObjectService", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._payeeSearchObjectService=val;
          }
        });

        //getter method for Payee Search Object Service in the group:Payee Management Services
        defineGetter(this, "payeeSearchObjectService", function() {
          return this._payeeSearchObjectService;
        });

        //setter method for Additional Text 1 in the group:Activate Ebill PopUp
        defineSetter(this, "additionalText1", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._additionalText1=val;
          }
        });

        //getter method for Additional Text 1 in the group:Activate Ebill PopUp
        defineGetter(this, "additionalText1", function() {
          return this._additionalText1;
        });

        //setter method for Search TextBox Placeholder Skin in the group:Skins
        defineSetter(this, "sknSearchPlaceHolderTextBox", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._sknSearchPlaceHolderTextBox=val;
          }
        });

        //getter method for Search TextBox Placeholder Skin in the group:Skins
        defineGetter(this, "sknSearchPlaceHolderTextBox", function() {
          return this._sknSearchPlaceHolderTextBox;
        });

        //setter method for Field 4 Value in the group:Additional Details
        defineSetter(this, "additionalDetailsValue4", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._additionalDetailsValue4=val;
          }
        });

        //getter method for Field 4 Value in the group:Additional Details
        defineGetter(this, "additionalDetailsValue4", function() {
          return this._additionalDetailsValue4;
        });

        //setter method for Payee Search Object in the group:Payee Management Services
        defineSetter(this, "payeeSearchObject", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._payeeSearchObject=val;
          }
        });

        //getter method for Payee Search Object in the group:Payee Management Services
        defineGetter(this, "payeeSearchObject", function() {
          return this._payeeSearchObject;
        });

        //setter method for Additional Text 2 in the group:Activate Ebill PopUp
        defineSetter(this, "additionalText2", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._additionalText2=val;
          }
        });

        //getter method for Additional Text 2 in the group:Activate Ebill PopUp
        defineGetter(this, "additionalText2", function() {
          return this._additionalText2;
        });

        //setter method for Search TextBox Focus Skin in the group:Skins
        defineSetter(this, "sknSearchTextBoxFocus", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._sknSearchTextBoxFocus=val;
          }
        });

        //getter method for Search TextBox Focus Skin in the group:Skins
        defineGetter(this, "sknSearchTextBoxFocus", function() {
          return this._sknSearchTextBoxFocus;
        });

        //setter method for Field 4 Type in the group:Additional Details
        defineSetter(this, "additionalDetailsType4", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._additionalDetailsType4=val;
          }
        });

        //getter method for Field 4 Type in the group:Additional Details
        defineGetter(this, "additionalDetailsType4", function() {
          return this._additionalDetailsType4;
        });

        //setter method for Payee SEARCH Operation in the group:Payee Management Services
        defineSetter(this, "payeeSEARCHOperation", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._payeeSEARCHOperation=val;
          }
        });

        //getter method for Payee SEARCH Operation in the group:Payee Management Services
        defineGetter(this, "payeeSEARCHOperation", function() {
          return this._payeeSEARCHOperation;
        });

        //setter method for Additional Text 3 in the group:Activate Ebill PopUp
        defineSetter(this, "additionalText3", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._additionalText3=val;
          }
        });

        //getter method for Additional Text 3 in the group:Activate Ebill PopUp
        defineGetter(this, "additionalText3", function() {
          return this._additionalText3;
        });

        //setter method for Ebill Button Enabled Skin in the group:Skins
        defineSetter(this, "sknEbillButtonEnabledSkin", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._sknEbillButtonEnabledSkin=val;
          }
        });

        //getter method for Ebill Button Enabled Skin in the group:Skins
        defineGetter(this, "sknEbillButtonEnabledSkin", function() {
          return this._sknEbillButtonEnabledSkin;
        });

        //setter method for Field 5 Label in the group:Additional Details
        defineSetter(this, "additionalDetailsLabel5", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._additionalDetailsLabel5=val;
          }
        });

        //getter method for Field 5 Label in the group:Additional Details
        defineGetter(this, "additionalDetailsLabel5", function() {
          return this._additionalDetailsLabel5;
        });

        //setter method for Payee SEARCH Criteria in the group:Payee Management Services
        defineSetter(this, "payeeSEARCHCriteria", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._payeeSEARCHCriteria=val;
          }
        });

        //getter method for Payee SEARCH Criteria in the group:Payee Management Services
        defineGetter(this, "payeeSEARCHCriteria", function() {
          return this._payeeSEARCHCriteria;
        });

        //setter method for Ebill Button Disabled Skin in the group:Skins
        defineSetter(this, "sknEbillButtonDisabledSkin", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._sknEbillButtonDisabledSkin=val;
          }
        });

        //getter method for Ebill Button Disabled Skin in the group:Skins
        defineGetter(this, "sknEbillButtonDisabledSkin", function() {
          return this._sknEbillButtonDisabledSkin;
        });
        
        //setter method for Tab Disabled Skin in the group:Skins
        defineSetter(this, "sknInactiveTab", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._sknInactiveTab=val;
          }
        });

        //getter method for Tab Disabled Skin in the group:Skins
        defineGetter(this, "sknInactiveTab", function() {
          return this._sknInactiveTab;
        });
        
        //setter method for Tab Enabled Skin in the group:Skins
        defineSetter(this, "sknActiveTab", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._sknActiveTab=val;
          }
        });

        //getter method for Tab Enabled Skin in the group:Skins
        defineGetter(this, "sknActiveTab", function() {
          return this._sknActiveTab;
        });

        //setter method for Field 5 Value in the group:Additional Details
        defineSetter(this, "additionalDetailsValue5", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._additionalDetailsValue5=val;
          }
        });

        //getter method for Field 5 Value in the group:Additional Details
        defineGetter(this, "additionalDetailsValue5", function() {
          return this._additionalDetailsValue5;
        });

        //setter method for Payee SEARCH Service Identifier in the group:Payee Management Services
        defineSetter(this, "payeeSEARCHIdentifier", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._payeeSEARCHIdentifier=val;
          }
        });

        //getter method for Payee SEARCH Service Identifier in the group:Payee Management Services
        defineGetter(this, "payeeSEARCHIdentifier", function() {
          return this._payeeSEARCHIdentifier;
        });

        //setter method for Field 5 Type in the group:Additional Details
        defineSetter(this, "additionalDetailsType5", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._additionalDetailsType5=val;
          }
        });

        //getter method for Field 5 Type in the group:Additional Details
        defineGetter(this, "additionalDetailsType5", function() {
          return this._additionalDetailsType5;
        });

        //setter method for Activate/Deactivate Ebill Object Service in the group:Payee Management Services
        defineSetter(this, "payeeEbillObjectService", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._payeeEbillObjectService=val;
          }
        });

        //getter method for Activate/Deactivate Ebill Object Service in the group:Payee Management Services
        defineGetter(this, "payeeEbillObjectService", function() {
          return this._payeeEbillObjectService;
        });

        //setter method for Field 6 Label in the group:Additional Details
        defineSetter(this, "additionalDetailsLabel6", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._additionalDetailsLabel6=val;
          }
        });

        //getter method for Field 6 Label in the group:Additional Details
        defineGetter(this, "additionalDetailsLabel6", function() {
          return this._additionalDetailsLabel6;
        });

        //setter method for Activate/Deactivate Ebill  Object in the group:Payee Management Services
        defineSetter(this, "payeeEbillObject", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._payeeEbillObject=val;
          }
        });

        //getter method for Activate/Deactivate Ebill  Object in the group:Payee Management Services
        defineGetter(this, "payeeEbillObject", function() {
          return this._payeeEbillObject;
        });

        //setter method for Field 6 Value in the group:Additional Details
        defineSetter(this, "additionalDetailsValue6", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._additionalDetailsValue6=val;
          }
        });

        //getter method for Field 6 Value in the group:Additional Details
        defineGetter(this, "additionalDetailsValue6", function() {
          return this._additionalDetailsValue6;
        });

        //setter method for Activate Ebill Operation in the group:Payee Management Services
        defineSetter(this, "activateEbillOperation", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._activateEbillOperation=val;
          }
        });

        //getter method for Activate Ebill Operation in the group:Payee Management Services
        defineGetter(this, "activateEbillOperation", function() {
          return this._activateEbillOperation;
        });

        //setter method for Field 6 Type in the group:Additional Details
        defineSetter(this, "additionalDetailsType6", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._additionalDetailsType6=val;
          }
        });

        //getter method for Field 6 Type in the group:Additional Details
        defineGetter(this, "additionalDetailsType6", function() {
          return this._additionalDetailsType6;
        });

        //setter method for Activate Ebill Criteria in the group:Payee Management Services
        defineSetter(this, "activateEbillCriteria", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._activateEbillCriteria=val;
          }
        });

        //getter method for Activate Ebill Criteria in the group:Payee Management Services
        defineGetter(this, "activateEbillCriteria", function() {
          return this._activateEbillCriteria;
        });

        //setter method for Field 7 Label in the group:Additional Details
        defineSetter(this, "additionalDetailsLabel7", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._additionalDetailsLabel7=val;
          }
        });

        //getter method for Field 7 Label in the group:Additional Details
        defineGetter(this, "additionalDetailsLabel7", function() {
          return this._additionalDetailsLabel7;
        });

        //setter method for Activate Ebill Service Identifier in the group:Payee Management Services
        defineSetter(this, "activateEbillIdentifier", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._activateEbillIdentifier=val;
          }
        });

        //getter method for Activate Ebill Service Identifier in the group:Payee Management Services
        defineGetter(this, "activateEbillIdentifier", function() {
          return this._activateEbillIdentifier;
        });

        //setter method for Field 7 Value in the group:Additional Details
        defineSetter(this, "additionalDetailsValue7", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._additionalDetailsValue7=val;
          }
        });

        //getter method for Field 7 Value in the group:Additional Details
        defineGetter(this, "additionalDetailsValue7", function() {
          return this._additionalDetailsValue7;
        });

        //setter method for Deactivate Ebill Operation in the group:Payee Management Services
        defineSetter(this, "deactivateEbillOperation", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._deactivateEbillOperation=val;
          }
        });

        //getter method for Deactivate Ebill Operation in the group:Payee Management Services
        defineGetter(this, "deactivateEbillOperation", function() {
          return this._deactivateEbillOperation;
        });

        //setter method for Field 7 Type in the group:Additional Details
        defineSetter(this, "additionalDetailsType7", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._additionalDetailsType7=val;
          }
        });

        //getter method for Field 7 Type in the group:Additional Details
        defineGetter(this, "additionalDetailsType7", function() {
          return this._additionalDetailsType7;
        });

        //setter method for Deactivate Ebill Criteria in the group:Payee Management Services
        defineSetter(this, "deactivateEbillCriteria", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._deactivateEbillCriteria=val;
          }
        });

        //getter method for Deactivate Ebill Criteria in the group:Payee Management Services
        defineGetter(this, "deactivateEbillCriteria", function() {
          return this._deactivateEbillCriteria;
        });

        //setter method for Field 8 Label in the group:Additional Details
        defineSetter(this, "additionalDetailsLabel8", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._additionalDetailsLabel8=val;
          }
        });

        //getter method for Field 8 Label in the group:Additional Details
        defineGetter(this, "additionalDetailsLabel8", function() {
          return this._additionalDetailsLabel8;
        });

        //setter method for Deactivate Ebill Serivce Identifier in the group:Payee Management Services
        defineSetter(this, "deactivateEbillIdentifier", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._deactivateEbillIdentifier=val;
          }
        });

        //getter method for Deactivate Ebill Serivce Identifier in the group:Payee Management Services
        defineGetter(this, "deactivateEbillIdentifier", function() {
          return this._deactivateEbillIdentifier;
        });

        //setter method for Field 8 Value in the group:Additional Details
        defineSetter(this, "additionalDetailsValue8", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._additionalDetailsValue8=val;
          }
        });

        //getter method for Field 8 Value in the group:Additional Details
        defineGetter(this, "additionalDetailsValue8", function() {
          return this._additionalDetailsValue8;
        });

        //setter method for Payee Get All Criteria in the group:Payee Management Services
        defineSetter(this, "payeeGETALLCriteria", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._payeeGETALLCriteria=val;
          }
        });

        //getter method for Payee Get All Criteria in the group:Payee Management Services
        defineGetter(this, "payeeGETALLCriteria", function() {
          return this._payeeGETALLCriteria;
        });

        //setter method for Field 8 Type in the group:Additional Details
        defineSetter(this, "additionalDetailsType8", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._additionalDetailsType8=val;
          }
        });

        //getter method for Field 8 Type in the group:Additional Details
        defineGetter(this, "additionalDetailsType8", function() {
          return this._additionalDetailsType8;
        });

        //setter method for Field 9 Label in the group:Additional Details
        defineSetter(this, "additionalDetailsLabel9", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._additionalDetailsLabel9=val;
          }
        });

        //getter method for Field 9 Label in the group:Additional Details
        defineGetter(this, "additionalDetailsLabel9", function() {
          return this._additionalDetailsLabel9;
        });

        //setter method for Field 9 Value in the group:Additional Details
        defineSetter(this, "additionalDetailsValue9", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._additionalDetailsValue9=val;
          }
        });

        //getter method for Field 9 Value in the group:Additional Details
        defineGetter(this, "additionalDetailsValue9", function() {
          return this._additionalDetailsValue9;
        });

        //setter method for Field 9 Type in the group:Additional Details
        defineSetter(this, "additionalDetailsType9", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._additionalDetailsType9=val;
          }
        });

        //getter method for Field 9 Type in the group:Additional Details
        defineGetter(this, "additionalDetailsType9", function() {
          return this._additionalDetailsType9;
        });

        //setter method for Additional Details Action 1 in the group:Additional Details
        defineSetter(this, "additionalDetailsAction1", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._additionalDetailsAction1=val;
          }
        });

        //getter method for Additional Details Action 1 in the group:Additional Details
        defineGetter(this, "additionalDetailsAction1", function() {
          return this._additionalDetailsAction1;
        });

        //setter method for Additional Details Action 2 in the group:Additional Details
        defineSetter(this, "additionalDetailsAction2", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._additionalDetailsAction2=val;
          }
        });

        //getter method for Additional Details Action 2 in the group:Additional Details
        defineGetter(this, "additionalDetailsAction2", function() {
          return this._additionalDetailsAction2;
        });

        //setter method for Additional Details Action 3 in the group:Additional Details
        defineSetter(this, "additionalDetailsAction3", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._additionalDetailsAction3=val;
          }
        });

        //getter method for Additional Details Action 3 in the group:Additional Details
        defineGetter(this, "additionalDetailsAction3", function() {
          return this._additionalDetailsAction3;
        });

        //setter method for Additional Details Action 4 in the group:Additional Details
        defineSetter(this, "additionalDetailsAction4", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._additionalDetailsAction4=val;
          }
        });

        //getter method for Additional Details Action 4 in the group:Additional Details
        defineGetter(this, "additionalDetailsAction4", function() {
          return this._additionalDetailsAction4;
        });
        
        //setter method for Tab 1 in the Tabs:Tab 1 
        defineSetter(this, "tab1", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._tab1=val;
          }
        });
        
        //getter method for Tab 1 in the Tabs:Tab 1 
        defineGetter(this, "tab1", function() {
          return this._tab1;
        });
        
        //setter method for Tab 2 in the Tabs:Tab 2 
        defineSetter(this, "tab2", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._tab2=val;
          }
        });
        
        //getter method for Tab 2 in the Tabs:Tab 2
        defineGetter(this, "tab2", function() {
          return this._tab2;
        });
        
        //setter method for Tab 3 in the Tabs:Tab 3 
        defineSetter(this, "tab3", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._tab3=val;
          }
        });
        
        //getter method for Tab 3 in the Tabs:Tab 3 
        defineGetter(this, "tab3", function() {
          return this._tab3;
        });
        
        //setter method for Tab 4 in the Tabs:Tab 4
        defineSetter(this, "tab4", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._tab4=val;
          }
        });
        
        //getter method for Tab 4 in the Tabs:Tab 4 
        defineGetter(this, "tab4", function() {
          return this._tab4;
        });
        
        //setter method for Tab 5 in the Tabs:Tab 5 
        defineSetter(this, "tab5", function(val) {
          if((typeof val==='string') && (val !== "")){
            this._tab5=val;
          }
        });
        
        //getter method for Tab 5 in the Tabs:Tab 5 
        defineGetter(this, "tab5", function() {
          return this._tab5;
        });
        
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
      * setParentScope.
      * This Method is exposed to the form to pass the Form Scope.
      */
      setParentScope: function(scope){
        this._parentScope = scope;
      },

      /**
     * Component setContext
     * To collect the context object required for the component 
     * context{JSONobject} - context params 
     */
      setContext: function(context){
        this._context=context;
        if(this._context.entryState && Object.keys(this._context.entryState).length !== 0){
          if(this._context.entryState.refreshComponent !== undefined && this._context.entryState.refreshComponent !== "" 
             && this._context.entryState.refreshComponent !== null){
            this._refreshComponent = this._context.entryState.refreshComponent;
          }
        }
      },
      
      /**
     *  getProcessedText.
     * Pass the text to parser util to obtain the processed value.
     * text {string} - value to be processed.
     * @return : {string} - processed value.
     */
      getProcessedText:function(text, responseArrayIndex){
        return this.ParserUtilsManager.getParsedValue(text, responseArrayIndex);
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
     * Component preShow.
     * Initialising set format value JSON.
     * Resetting images and values.
     */
      preShow: function(){
        try{
          if(this._refreshComponent){	
            this.view.onBreakpointChange = this.onBreakpointChange;
            this.togglePaginationVisibility(true);
            this.setPaginationIcons(true, false, true, false);
            this.setFormattingValueJSON();
            this.resetImages();
            this.noRecipients(false);
            this.resetSortAndSearchProperties();
            this.clearSearchText();
            this.setEntitlements();
            this.setComponentConfig();
            this.initActions();
          }
          this.view.height="";
          this.view.flxBillerDialogs.height="30dp";
          this.view.flxColumn1.accessibilityConfig = {
            "a11yLabel":this.view.lblColumnHeader1.text+" Column. sorted in ascending order . Click to Sort in descending order.",
            "a11yARIA":{
              "tabindex": 0,
              "role":"button"
            }
          };
          this.view.imgColumnHeader1.src="sorting_previous.png";
          this.view.btnBypass.onClick=function(){
            var frm=kony.application.getCurrentForm();
            if(frm.id==="frmManagePayees"){
              if(frm.flxTotalEbillAmountDue.isVisible===true){
                frm.lblTotalEbillAmountDue.setActive(true);
              }
              else{
              frm.flxAddPayee.setActive(true);
              }
            }
          }
          this.view.btnConfirm.accessibilityConfig={
            "a11yHidden":true,
            "a11yARIA":{
              "tabindex":-1
            }
          }
        }
        catch(err)
        {
          var errObj = {
            "errorInfo" : "Error in preshow method of the component.",
            "error": err
          };
          this.onError(errObj);
        }
      },
      lableSetActive : function(){
        this.view.lblPayABill.setActive(true);
      },
      /**
      * setTabs.
      * Responsible to set the visibility of the tabs.
      * Setting the text of the tabs based on breakpoint.
      */
      setTabs : function(){
        if(!this.isEmptyNullUndefined(this._tab1) && this.isEntitled(JSON.parse(this._tab1)["entitlement"])) {
          this.view.btnTab1.text=this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._tab1)["text"]));
          this.view.btnTab1.setVisibility(true);
        }
        else{
          this.view.btnTab1.setVisibility(false);
        }
        if(!this.isEmptyNullUndefined(this._tab2) && this.isEntitled(JSON.parse(this._tab2)["entitlement"])){
          this.view.btnTab2.text=this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._tab2)["text"]));
          this.view.btnTab2.setVisibility(true);
        }
        else{
          this.view.btnTab2.setVisibility(false);
        }
        if(!this.isEmptyNullUndefined(this._tab3) && this.isEntitled(JSON.parse(this._tab3)["entitlement"])){
          this.view.btnTab3.text=this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._tab3)["text"]));
          this.view.btnTab3.setVisibility(true);
        }
        else{
          this.view.btnTab3.setVisibility(false);
        }
        if(!this.isEmptyNullUndefined(this._tab4) && this.isEntitled(JSON.parse(this._tab4)["entitlement"])) {
          this.view.btnTab4.text=this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._tab4)["text"]));
          this.view.btnTab4.setVisibility(true);
        }
        else {
          this.view.btnTab4.setVisibility(false);
        }
        if(!this.isEmptyNullUndefined(this._tab5) && this.isEntitled(JSON.parse(this._tab5)["entitlement"])) {
          this.view.btnTab5.text=this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._tab5)["text"]));
          this.view.btnTab5.setVisibility(true);
        }
        else {
          this.view.btnTab5.setVisibility(false);
        }
      },
      
      /**
      * tabOnclick.
      * Responsible for calling methods assigned to Tabs.
      */
      tabOnclick : function(contract){
        contract = JSON.parse(contract);
        if(!this.isEmptyNullUndefined(contract.action.widget)){
            if(contract.action.level === "Form"){
              this._parentScope[contract.action.method]();
            }
            else if(contract.action.level === "Component"){
              this.onManagePayeeClick();
            } 
          }
      },
      
      /**
      * setTabsSkins.
      * Responsible for reseting and setting the skin to Tabs.
      */
      setTabsSkins : function(){
        this.view.btnTab5.skin = this.getBreakPointTypeBasedValue(this._sknActiveTab);
        this.view.btnTab1.skin = this.getBreakPointTypeBasedValue(this._sknInactiveTab);
        this.view.btnTab2.skin = this.getBreakPointTypeBasedValue(this._sknInactiveTab);
        this.view.btnTab3.skin = this.getBreakPointTypeBasedValue(this._sknInactiveTab);
        this.view.btnTab4.skin = this.getBreakPointTypeBasedValue(this._sknInactiveTab);
        if(kony.os.deviceInfo().screenHeight<200){
          this.view.btnTab5.skin = "ICSknBtnAccountSummarySelected10px";
          this.view.btnTab1.skin = "ICSknBtnAccountSummaryUnselected10px";
          this.view.btnTab2.skin = "ICSknBtnAccountSummaryUnselected10px";
          this.view.btnTab3.skin = "ICSknBtnAccountSummaryUnselected10px";
          this.view.btnTab4.skin = "ICSknBtnAccountSummaryUnselected10px";
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
        return this.EntitlementUtils.isEntitled(data);
      },
      
      /**
      * onManagePayeeClick.
      * responsible for the on click of manage payee tab
      */
      onManagePayeeClick: function(){
        try{
          var scope = this;
          this._searchResult = false;
          if(this._inPlaceHandling === true){
            scope.ManageBillerDAO.fetchPayeeList(this._payeeObjectService,
                                                 this._payeeGETOperation, this._payeeObject,
                                                 JSON.parse(this._payeeGETALLCriteria), scope.callBack, scope.onError, true);
          }else {
            scope.ManageBillerDAO.fetchPayeeList(this._payeeObjectService,
                                                 this._payeeGETOperation, this._payeeObject,
                                                 JSON.parse(this._payeeGETCriteria), scope.fetchPayeeListCallBack, scope.onError);
          }
          this.setStaticData();
          this.resetSortAndSearchProperties();
          this.setPaginationIcons(true, false, true, false);
          this.togglePaginationVisibility(true);
          this.setTabs();
          this.clearSearchText();
        }
        catch(err)
        {
          var errObj = {
            "errorInfo" : "Error in onManagePayeeClick method of the component.",
            "error": err
          };
          this.onError(errObj);
        }
      },
      
      callBack: function(){
        this.ManageBillerDAO.fetchLocalData(JSON.parse(this._payeeGETCriteria), this.fetchPayeeListCallBack);
      },
      /**
      * initActions.
      * Responsible to initialize all the actions required in the component.
      */
      initActions: function(){
        try{
          this.view.txtSearch.onDone = this.onSearch.bind(this);
          this.view.btnConfirm.onClick = this.onSearch.bind(this);
          this.view.flxClearBtn.onClick = this.onSearchClear.bind(this);
          this.view.txtSearch.onTextChange = this.onSearchTextChange.bind(this);
          this.view.flxPaginationPreviousEnabled.onClick = this.prevPageClick.bind(this);
          this.view.flxPaginationNextEnabled.onClick = this.nextPageClick.bind(this);
          this.view.flxColumn1.onClick = this.onColumnClick.bind(this, this.view.flxColumn1,this.view.lblColumnHeader1,this._dataGridColumn1, "imgColumnHeader1");
          this.view.btnTab1.onClick = this.tabOnclick.bind(this,this._tab1);
          this.view.btnTab2.onClick = this.tabOnclick.bind(this,this._tab2);
          this.view.btnTab3.onClick = this.tabOnclick.bind(this,this._tab3);
          this.view.btnTab4.onClick = this.tabOnclick.bind(this,this._tab4);
          this.view.btnTab5.onClick = this.tabOnclick.bind(this,this._tab5);
          if(!this.isEmptyNullUndefined(this._dataGridColumn2) && !this.isEmptyNullUndefined(JSON.parse(this._dataGridColumn2)["sortBy"])){
            this.view.flxColumn2.onClick = this.onColumnClick.bind(this, this.view.flxColumn2,this.view.lblColumnHeader2,this._dataGridColumn2, "imgColumnHeader2");
            this.view.imgColumnHeader2.setVisibility(true);
            this.view.flxColumn2.accessibilityConfig = {
              "a11yLabel":this.view.lblColumnHeader2.text+" Column. No Sort applied. Click to Sort in Ascending order.",
              "a11yARIA":{
                "tabindex": 0,
                "role":"button"
              }
            };
            this.view.lblColumnHeader2.accessibilityConfig = { 
              "a11yHidden":true,
              "a11yARIA":{
                tabindex:-1
              }
            }
          }else{
            this.view.imgColumnHeader2.setVisibility(false);
            this.view.flxColumn2.accessibilityConfig = { 
              "a11yARIA":{
                tabindex:-1
              }
            }
            this.view.lblColumnHeader2.accessibilityConfig = { 
              "a11yHidden":false,
              "a11yARIA":{
                tabindex:-1
              }
            }
          }
          if(!this.isEmptyNullUndefined(this._dataGridColumn3) && !this.isEmptyNullUndefined(JSON.parse(this._dataGridColumn3)["sortBy"])){
            this.view.flxColumn3.onClick = this.onColumnClick.bind(this, this.view.flxColumn3,this.view.lblColumnHeader3,this._dataGridColumn3, "imgColumnHeader3");
            this.view.imgColumnHeader3.setVisibility(true);
            this.view.flxColumn3.accessibilityConfig = {
              "a11yLabel":this.view.lblColumnHeader3.text+" Column. No Sort applied. Click to Sort in Ascending order.",
              "a11yARIA":{
                "tabindex": 0,
                "role":"button"
              }
            };
            this.view.lblColumnHeader3.accessibilityConfig = { 
              "a11yHidden":true,
              "a11yARIA":{
                tabindex:-1
              }
            }
          }else{
            this.view.imgColumnHeader3.setVisibility(false);
            this.view.flxColumn3.accessibilityConfig = {
              "a11yARIA":{
                tabindex:-1
              }
            };
            this.view.lblColumnHeader3.accessibilityConfig = { 
              "a11yHidden":false,
              "a11yARIA":{
                tabindex:-1
              }
            }
          }
        }
        catch(err)
        {
          var errObj = {
            "errorInfo" : "Error in initActions method of the component.",
            "error": err
          };
          this.onError(errObj);
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
      * resetSortAndSearchProperties.
      * responsible for resetting the class variables related to search and sort.
      */
      resetSortAndSearchProperties: function(){
        this.view.txtSearch.text = "";
        this._currentPage = 1;
        this._currentOrder = "asc";
        this._currentSorting = "default";
        this._currentSortByType = "string";
      },
      
      /**
      * onSearchClear.
      * This method is responsible to clear the search results from the segment.
      */
      onSearchClear: function() {
        try{
          var scope = this;
          this._searchResult = false;
          this.view.flxClearBtn.setVisibility(false);
          this.resetSortAndSearchProperties();
          this.setPaginationIcons(true, false, true, false);
          this.clearSearchText();
          this.resetImages();
          if(this._inPlaceHandling === true){
            scope.ManageBillerDAO.fetchLocalData(JSON.parse(this._payeeGETCriteria), scope.fetchPayeeListCallBack);
          }else{ 
            scope.ManageBillerDAO.fetchPayeeList(this._payeeObjectService,
                                                 this._payeeGETOperation, this._payeeObject,
                                                 JSON.parse(this._payeeGETCriteria), scope.fetchPayeeListCallBack, scope.onError);
          }
          this.togglePaginationVisibility(true);
          searchClearFlag=true;
        }
        catch(err)
        {
          var errObj = {
            "errorInfo" : "Error in onSearchClear method of the component.",
            "error": err
          };
          this.onError(errObj);
        }
      },
      
      /*
      * onSearch.
      * This method is used to call the search service with the given string. 
      * Service Callback - fetchPayeeListCallBack.
      */
      onSearch: function(){
        try{
          var scope = this;
          var searchString = scope.view.txtSearch.text;
          var criteria = JSON.parse(this._payeeSEARCHCriteria);
          criteria.searchString = searchString;
          this._searchResult = true;
          if(this._inPlaceHandling === true){
            scope.ManageBillerDAO.searchPayeesData(JSON.parse(this._searchFieldList), searchString, scope.fetchPayeeListCallBack);
          }else{ 
            scope.ManageBillerDAO.fetchPayeeList(this._payeeSearchObjectService,
                                                 this._payeeSEARCHOperation, this._payeeSearchObject,
                                                 criteria, scope.fetchPayeeListCallBack, scope.onError);
          }
          this.togglePaginationVisibility(false);
          this.resetImages();
        }
        catch(err)
        {
          var errObj = {
            "errorInfo" : "Error in onSearch method of the component.",
            "error": err
          };
          this.onError(errObj);
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
      
      /**
      * setPageCount.
      * This method is responsible for setting the record count for pagination.
      * length: the count of the records set in the segment.
      */
      setPageCount: function(length){
        try{
          var recordsPerPage = this.getRecordsPerPage();
          this.setPaginationIcons(false, true, true, false);
          if(length < recordsPerPage){
            if(this._currentPage === 1){
              this.setPaginationIcons(true, false, false, true);
            }else{
              this.setPaginationIcons(false, true, false, true);
            }
          }else if(length === recordsPerPage && this._currentPage === 1){
            this.setPaginationIcons(true, false, true, false);
          }
          if(length === 0){
            length = recordsPerPage;
          }
          var count = ((this._currentPage-1)*recordsPerPage + 1) + " - " + ((this._currentPage-1)*recordsPerPage + length);
          this.view.lblPagination.text = count +" "+ kony.i18n.getLocalizedString("i18n.billpay.payees");
          this.view.forceLayout();
        }
        catch(err)
        {
          var errObj = {
            "errorInfo" : "Error in setPageCount method of the component.",
            "error": err
          };
          this.onError(errObj);
        }
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
        this.view.flxPaginationPreviousDisabled.accessibilityConfig={
          "a11yLabel":"unavailable previous page",
          "a11yARIA":{
            "role":"button",
            "tabindex":-1
          }
        }
        this.view.flxPaginationPreviousEnabled.setVisibility(prevEnabledVisibility);
        this.view.flxPaginationPreviousEnabled.accessibilityConfig={
        "a11yLabel":"previous page",
        "a11yARIA":{
          "role":"button",
          "tabindex":0
        }
        }
        this.view.flxPaginationNextEnabled.setVisibility(nxtEnabledVisibilty);
        this.view.flxPaginationNextEnabled.accessibilityConfig={
          "a11yLabel":"Next page",
          "a11yARIA":{
            "role":"button",
            "tabindex":0
          }
          }
        this.view.flxPaginationNextDisabled.setVisibility(nxtDisabledVisibility);
        this.view.flxPaginationNextDisabled.accessibilityConfig={
          "a11yLabel":"unavailable next page",
          "a11yARIA":{
            "role":"button",
            "tabindex":-1
          }
          }
      },

      /**
      * nextPageClick.
      * This method is used to call the pagination service for next page with the offset and limit.
      * Service Callback - fetchPayeeListCallBack.
      */
      nextPageClick: function(){
        try{
          var scope = this;
          var criteria = JSON.parse(this._payeeGETCriteria);
          this.clearSearchText();
          this.setPaginationIcons(false, true, true, false);
          criteria.offset = (criteria.limit*(this._currentPage));
          if(this._currentSorting !== "default"){
            criteria.sortBy = this._currentSorting;
            criteria.order = this._currentOrder;
            criteria.sortByType = this._currentSortByType;
          }
          if(this._inPlaceHandling === true){
            scope.ManageBillerDAO.fetchLocalData(criteria, scope.fetchPayeeListCallBackForNextPage);
          }else{ 
            scope.ManageBillerDAO.fetchPayeeList(this._payeeObjectService,
                                                 this._payeeGETOperation, this._payeeObject,
                                                 criteria, scope.fetchPayeeListCallBackForNextPage, scope.onError);
          }
        }
        catch(err)
        {
          var errObj = {
            "errorInfo" : "Error in nextPageClick method of the component.",
            "error": err
          };
          this.onError(errObj);
        }
      },
      
      /**
      * fetchPayeeListCallBackForNextPage.
      * CallBack function for fetchPayeeList service call on Next Page Click and responsible for setting the segment based on the breakpoint.
      * backendResponse {Object} - object contains the service response.
      */
      fetchPayeeListCallBackForNextPage: function(backendResponse){
        var serviceResponse;
        if(this._searchResult === true){
          serviceResponse = this.getRecordsArray(this._responsePathSearch,backendResponse);
        }
        else{
          serviceResponse = this.getRecordsArray(this._responsePath,backendResponse);
        }
        if(!serviceResponse || serviceResponse.length < 1){
          kony.ui.Alert(kony.i18n.getLocalizedString("i18n.navigation.norecordsfound"));
          this.setPageCount(0);
          return;
        }else{
          this._currentPage += 1;
          this.fetchPayeeListCallBack(backendResponse);
        }
      },
      
      /**
      * prevPageClick.
      * This method is used to call the pagination service for previous page.
      * Service Callback - fetchPayeeListCallBack.
      */
      prevPageClick: function(){
        try{
          var scope = this;
          var criteria = JSON.parse(this._payeeGETCriteria);
          this.clearSearchText();
          if(this._currentSorting !== "default"){
            criteria.sortBy = this._currentSorting;
            criteria.order = this._currentOrder;
            criteria.sortByType = this._currentSortByType;
          }
          criteria.offset = (criteria.limit*(this._currentPage - 2));
          this._currentPage -= 1;
          if(criteria.offset === 0){
            this.setPaginationIcons(true, false, true, false);
          }else{
            this.setPaginationIcons(false, true, true, false);
          }
          if(this._inPlaceHandling === true){
            scope.ManageBillerDAO.fetchLocalData(criteria, scope.fetchPayeeListCallBack);
          }else{ 
            scope.ManageBillerDAO.fetchPayeeList(this._payeeObjectService,
                                                 this._payeeGETOperation, this._payeeObject,
                                                 criteria, scope.fetchPayeeListCallBack, scope.onError);
          }
        }
        catch(err)
        {
          var errObj = {
            "errorInfo" : "Error in prevPageClick method of the component.",
            "error": err
          };
          this.onError(errObj);
        }
      },
      
      /**
     * onColumnClick.
     * Deals with onClick of images.
     * This method is responsible for determining the critieria to be sent to sort service.
     */
      onColumnClick: function(widgetPath,lblPath,column, image){
        try{
          sortingFlag={
            "id":widgetPath
          };
          this._searchResult = false;
          var sortBy = JSON.parse(column)["sortBy"];
          var sortByType = JSON.parse(column)["sortByType"];
          var order;
          if(this.view[image].src === JSON.parse(this._iconColumnSort)["img"] || this.view[image].src === JSON.parse(this._iconColumnSortDsc)["img"]){
            order = "asc";
            widgetPath.accessibilityConfig = {
              "a11yLabel":lblPath.text+" Column. Sorted in Ascending order. Click to Sort in Descending order.",
              "a11yARIA":{
                "tabindex": 0,
                "role":"button"
              }
            };
            this.view[image].src = JSON.parse(this._iconColumnSortAsc)["img"];
          }else if(this.view[image].src === JSON.parse(this._iconColumnSortAsc)["img"]){
            order = "desc"
            widgetPath.accessibilityConfig = {
              "a11yLabel":lblPath.text+" Column. Sorted in Descending order. Click to Sort in Ascending order.",
              "a11yARIA":{
                "tabindex": 0,
                "role":"button"
              }
            };
            this.view[image].src = JSON.parse(this._iconColumnSortDsc)["img"];
          }
          if(widgetPath.id!=="flxColumn1"){
            this.view.flxColumn1.accessibilityConfig = {
              "a11yLabel":this.view.lblColumnHeader1.text+" Column. No Sort Applied. Click to Sort in Ascending order.",
              "a11yARIA":{
                "tabindex": 0,
                "role":"button"
              }
            };
          }
          if(widgetPath.id!=="flxColumn2"){
            if(this.view.flxColumn2.onClick!==null){
            this.view.flxColumn2.accessibilityConfig = {
              "a11yLabel":this.view.lblColumnHeader2.text+" Column. No Sort Applied. Click to Sort in Ascending order.",
              "a11yARIA":{
                "tabindex": 0,
                "role":"button"
              }
            };
            this.view.lblColumnHeader2.accessibilityConfig={
              "a11yHidden":true,
              "a11yARIA":{
                "tabindex":-1
              }
            }
          }
          else{
            this.view.flxColumn2.accessibilityConfig = {
              "a11yARIA":{
                "tabindex": -1
              }
            };
            this.view.lblColumnHeader2.accessibilityConfig={
              "a11yHidden":false,
              "a11yARIA":{
                "tabindex":-1
              }
            }
          }
          }
          if(widgetPath.id!=="flxColumn3"){
            if(this.view.flxColumn3.onClick!==null){
            this.view.flxColumn3.accessibilityConfig = {
              "a11yLabel":this.view.lblColumnHeader3.text+" Column. No Sort Applied. Click to Sort in Ascending order.",
              "a11yARIA":{
                "tabindex": 0,
                "role":"button"
              }
            };
            this.view.lblColumnHeader3.accessibilityConfig={
              "a11yHidden":true,
              "a11yARIA":{
                "tabindex":-1
              }
            }
          }
          else{
            this.view.flxColumn3.accessibilityConfig = {
              "a11yARIA":{
                "tabindex": -1
              }
            };
            this.view.lblColumnHeader3.accessibilityConfig={
              "a11yHidden":false,
              "a11yARIA":{
                "tabindex":-1
              }
            }
          }
          }
          this.resetImages(image);
          this.onSortClick(sortBy, order, sortByType);
          this.togglePaginationVisibility(true);
          this.clearSearchText();
        }
        catch(err)
        {
          var errObj = {
            "errorInfo" : "Error in onColumnClick method of the component.",
            "error": err
          };
          this.onError(errObj);
        }
      },
      
      /**
      * onSortClick.
      * This method is used to call the sort service with the given column value.
      * Service Callback - fetchPayeeListCallBack.
      */
      onSortClick: function(sortBy, order, sortByType){
        try{
          this._searchResult = false;
          var scope = this;
          var criteria = JSON.parse(this._payeeGETCriteria);
          criteria.sortBy = sortBy;
          criteria.order = order;
          criteria.sortByType = sortByType;
          this._currentOrder = order;
          this._currentSorting = sortBy;
          this._currentSortByType = sortByType;
          this._currentPage = 1;

          if(this._inPlaceHandling === true){
            scope.ManageBillerDAO.fetchLocalData(criteria, scope.fetchPayeeListCallBack);
          }else{ 
            scope.ManageBillerDAO.fetchPayeeList(this._payeeObjectService,
                                                 this._payeeGETOperation, this._payeeObject,
                                                 criteria, scope.fetchPayeeListCallBack, scope.onError);
          }
        }
        catch(err)
        {
          var errObj = {
            "errorInfo" : "Error in onSortClick method of the component.",
            "error": err
          };
          this.onError(errObj);
        }
      },

      /**
     * resetImages.
     * This method resets the sorting images.
     */
      resetImages: function(imageWidget){
        for(var i=1; i<=this._maxColumnLimit; i++){
          if(imageWidget === ("imgColumnHeader"+i)){
            continue;
          }
          this.view["imgColumnHeader"+i].src = JSON.parse(this._iconColumnSort)["img"];
          if(this.view["flxColumn"+i].onClick!==null){
            this.view["flxColumn"+i].accessibilityConfig = {
              "a11yLabel":this.view["lblColumnHeader"+i].text+" Column. No sort applied . Click to Sort in ascending order.",
              "a11yARIA":{
                "tabindex": 0,
                "role":"button"
              }
            };
          }
        }
      },

      /**
      * togglePaginationVisibility
      * boolean {Boolean}: Visibility of pagination
      * Responsible for toggling visibility of pagination UI
      */
      togglePaginationVisibility: function(boolean){
        this.view.flxPagination.setVisibility(boolean);
        this.view.forceLayout();
      },
      
      /**
      * getRecordsPerPage.
      * This method is for finding the record count per page for pagination.
      * @return: the count of the records per page.
      */
      getRecordsPerPage: function(){
        try{
          return JSON.parse(this._payeeGETCriteria)["limit"];
        }
        catch(err)
        {
          var errObj = {
            "errorInfo" : "Error in getRecordsPerPage method of the component.",
            "error": err
          };
          this.onError(errObj);
        }
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
      * Responsible to get the Payees Data by making call to DAO layer.
      * Function is triggered everytime when the breakpoint is changed.
      * Service Callback - 
      */
      onBreakpointChangeTemplate : function(width){
        var scope = this;
        if(this._refreshComponent){
          if(width<=640)
          {
            this.view.flxTableHeaders.isVisible=false;
          }
          else
          {
            this.view.flxTableHeaders.isVisible=true;
          }
          scope.onManagePayeeClick();
          scope.setTabsSkins();
        }
        this._refreshComponent = true;
      },
      
      /**
      * fetchPayeeListCallBack.
      * CallBack function for fetchPayeeList service call and responsible for setting the segment based on the breakpoint.
      * backendResponse {Object} - object contains the service response.
      */
      fetchPayeeListCallBack: function(backendResponse){
        this._backendResponse=backendResponse;
        if(kony.application.getCurrentBreakpoint() === 640){
          this.setPayeeListMobile(backendResponse);
        }
        else{
          this.setPayeeListDesktop(backendResponse);
        }
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
      * setFormattingJSON.
      * Responsible to set the formatting values by taking from contracts.
      */
      setFormattingValueJSON: function(){
        try{
          var DataFormat;
          var BackendDataFormat;
          var amountFormat;
          if(!this.isEmptyNullUndefined(this._dateFormat)){
            DataFormat = JSON.parse(this._dateFormat);
          }
          else{
            DataFormat = "";
          }
          if(!this.isEmptyNullUndefined(this._backendDateFormat)){
            BackendDataFormat = JSON.parse(this._backendDateFormat);
          }
          else{
            BackendDataFormat = "";
          }
          if(!this.isEmptyNullUndefined(this._amountFormat)){
            amountFormat = JSON.parse(this._amountFormat);
          }
          else{
            amountFormat = "";
          }
          this.formattingJSON = {
            "dateFormat" : DataFormat,
            "backenddateformat" : BackendDataFormat,
            "currencyCode" : "USD",
            "amountFormat" : amountFormat
          };
        }
        catch(err)
        {
          var errObj = {
            "errorInfo" : "Error in setFormattingValueJSON method of the component.",
            "error": err
          };
          this.onError(errObj);
        }
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
      * setStaticDataForAccounts.
      * Responsible to set the Table Column Header text on the click of Accounts Tab.
      */
      setStaticData: function(){
        try{
          this.view.lblPayABill.text = kony.i18n.getLocalizedString(this._title);
          this.view.lblColumnHeader1.text = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn1)["text"]));
          if(this._dataGridColumn3){
            this.view.flxColumn3.isVisible = true;
            this.view.lblColumnHeader3.text = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn3)["text"]));
          }
          else{
            this.view.flxColumn3.isVisible = false;
          }
          if(this._dataGridColumn2)
          {
            this.view.flxColumn2.isVisible = true;
            this.view.lblColumnHeader2.text = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn2)["text"]));
          }
          else
          {
            this.view.flxColumn2.isVisible = false;
          }
          if(this._dataGridColumnAction){
            this.view.lblActions.text = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumnAction)["title"]));
          }
          else{
            this.view.lblActions.text = "";
          }
          if(this._placeHolderSearch){
            this.view.txtSearch.placeholder=this.getBreakPointTypeBasedValue(this._placeHolderSearch);
          }
          if(this._sknSearchPlaceHolderTextBox){
            this.view.txtSearch.placeholderSkin=this.getBreakPointTypeBasedValue(this._sknSearchPlaceHolderTextBox);
          }
          
        }
        catch(err)
        {
          var errObj = {
            "errorInfo" : "Error in setStaticData method of the component.",
            "error": err
          };
          this.onError(errObj);
        }
      },

      /**
      * getRecordsArray.
      * responsible for getting the required service response from given responsePath.
      * responsePath {String} - contains the Response Route Path.
      * backendResponse {Object} - contains the serivce response.
      * @return : {Object} - Processed value. 
      */
      getRecordsArray: function(responsePath,backendResponse){
        try{
          var responseRoute = this.getProcessedText(responsePath);
          if(!this.isEmptyNullUndefined(responseRoute)){
            var res = backendResponse;
            var substr = responseRoute.split(".");
            if(substr.length > 1){
              var serviceResponse = "";
              for (i = 0 ; i < substr.length;i++){
                serviceResponse = res[substr[i]];
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
        }
        catch(err)
        {
          var errObj = {
            "errorInfo" : "Error in getRecordsArray method of the component.",
            "error": err
          };
          this.onError(errObj);
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
      * getFormattedData.
      * Responsible to get the formatted value from FormatUtils manager.
      * value{String} : value to be formatted.
      * type{String} : Type of the value.
      @return : {String} - returns the formatted value.
      */      
      getFormattedData: function(value, type){
        var data = this.FormatUtils.formatText(value, type, this.formattingJSON);
        return data?data.trim():kony.i18n.getLocalizedString("i18n.payments.nA");
      },

      /**
      * onToggle.
      * responsible for changing the templates from unselected view to selected view and viceversa.
      */
      onToggle: function(){
        try{
          var scope = this;
          var index =  scope.view.segmentBillPay.selectedRowIndex[1];
          var data = scope.view.segmentBillPay.data;
          for(var i=0;i<data.length;i++)
          {
            if(i===index)
            {
              if(!(data[i].template === "flxBillPayManagePayeesSelectedIC")){
                kony.print("index:" + index);
                data[i].imgDropdown = this.getImageOrIcon(this._iconRowCollapse);
                data[i].flxDropdown.accessibilityConfig={
                  "a11yLabel":"Hide details for "+data[i].lblColumn1.text,
                  "a11yARIA":{
                    "tabindex":0,
                    "role":"button",
                    "aria-expanded":true
                  }
                };
                data[i].template = "flxBillPayManagePayeesSelectedIC";
              }
              else{
                data[i].imgDropdown = this.getImageOrIcon(this._iconRowExpand);
                data[i].flxDropdown.accessibilityConfig={
                  "a11yLabel":"Show more details for "+data[i].lblColumn1.text,
                  "a11yARIA":{
                    "tabindex":0,
                    "role":"button",
                    "aria-expanded":false
                  }
                };
                data[i].template = "flxBillPayManagePayeesIC";
              }
            }
            else
            {
              data[i].imgDropdown = this.getImageOrIcon(this._iconRowExpand);
              data[i].flxDropdown.accessibilityConfig={
                "a11yLabel":"Show more details for "+data[i].lblColumn1.text,
                "a11yARIA":{
                  "tabindex":0,
                  "role":"button",
                  "aria-expanded":false
                }
              };
              data[i].template = "flxBillPayManagePayeesIC";
            }
          }
          scope.view.segmentBillPay.setData(data);
          if (scope.view.segmentBillPay.data[index].template === "flxBillPayManagePayeesIC") {
            scope.view.segmentBillPay.setActive(index, -1, "flxBillPayManagePayeesIC.flxMainGroup.flxGroup.flxBillPayAllPayeesWrapper.flxDropdown");
          }
          else {
            scope.view.segmentBillPay.setActive(index, -1, "flxBillPayManagePayeesSelectedIC.flxMainGroup.flxGroup.flxContent.flxBillPayManagePayees.flxBillPayAllPayeesWrapper.flxDropdown");
          }
        }
        catch(err)
        {
          var errObj = {
            "errorInfo" : "Error in onToggle method of the component.",
            "error": err
          };
          this.onError(errObj);
        }
      },

      /**
      * onToggleMobile.
      * responsible for changing the templates from unselected view to selected view and viceversa in mobile breakpoint.
      */
      onToggleMobile: function(){
        try{
          var scope = this;
          var index =  scope.view.segmentBillPay.selectedRowIndex[1];
          var data = scope.view.segmentBillPay.data;
          for(var i=0;i<data.length;i++)
          {
            if(i===index)
            {
              if(!(data[i].template === "flxBillPayManagePayeesSelectedMobileIC")){
                kony.print("index:" + index);
                data[i].imgDropdown = this.getImageOrIcon(this._iconRowCollapse);
                data[i].flxDropdown.accessibilityConfig={
                  "a11yLabel":"Hide details for "+data[i].lblField1.text,
                  "a11yARIA":{
                    "tabindex":0,
                    "role":"button",
                    "aria-expanded":true
                  }
                };
                data[i].template = "flxBillPayManagePayeesSelectedMobileIC";
              }
              else{
                data[i].imgDropdown = this.getImageOrIcon(this._iconRowExpand);
                data[i].flxDropdown.accessibilityConfig={
                  "a11yLabel":"Show more details for "+data[i].lblField1.text,
                  "a11yARIA":{
                    "tabindex":0,
                    "role":"button",
                    "aria-expanded":false
                  }
                };
                data[i].template = "flxBillPayManagePayeesMobileIC";
              }
            }
            else
            {
              data[i].imgDropdown = this.getImageOrIcon(this._iconRowExpand);
              data[i].flxDropdown.accessibilityConfig={
                "a11yLabel":"Show more details for "+data[i].lblField1.text,
                "a11yARIA":{
                  "tabindex":0,
                  "role":"button",
                  "aria-expanded":false
                }
              };
              data[i].template = "flxBillPayManagePayeesMobileIC";
            }
          }
          scope.view.segmentBillPay.setData(data);
          if (scope.view.segmentBillPay.data[index].template === "flxBillPayManagePayeesMobileIC") {
            scope.view.segmentBillPay.setActive(index, -1, "flxBillPayManagePayeesMobileIC.flxMainGroup.flxGroup.flxBillPayAllPayeesWrapper.flxDropdown");
          }
          else {
            scope.view.segmentBillPay.setActive(index, -1, "flxBillPayManagePayeesSelectedMobileIC.flxMainGroup.flxGroup.flxContent.flxBillPayManagePayees.flxBillPayAllPayeesWrapper.flxDropdown");
          }
        }
        catch(err)
        {
          var errObj = {
            "errorInfo" : "Error in onToggleMobile method of the component.",
            "error": err
          };
          this.onError(errObj);
        }
      },
      
      /**
      * getWidgetDataMap.
      * responsible for getting the widgetDataMap for both mobile and desktop breakpoint templates.
      * @return : {Object} - WidgetDataMap.
      */
      getWidgetDataMap: function(){
        return {
          //mobile
          "flxBillPayManagePayeesMobileIC":"flxBillPayManagePayeesMobileIC",
          "flxBillPayManagePayeesSelectedMobileIC":"flxBillPayManagePayeesSelectedMobileIC",
          "flxContent":"flxContent",
          "flxBillPayManagePayees":"flxBillPayManagePayees",
          "flxBillPayAllPayeesWrapper":"flxBillPayAllPayeesWrapper",
          "flxWrapper":"flxWrapper",
          "btnActions":"btnActions",
          "flxDetails":"flxDetails",
          "flxDetailsWrapper":"flxDetailsWrapper",
          "flxExpColumn2Field2":"flxExpColumn2Field2",
          "lblExpColumn2Field2":"lblExpColumn2Field2",
          "lblExpColumn2Field2Value":"lblExpColumn2Field2Value",
          "flxExpColumn3Field1":"flxExpColumn3Field1",
          "lblExpColumn3Field1":"lblExpColumn3Field1",
          "lblExpColumn3Field1Value":"lblExpColumn3Field1Value",
          "flxExpColumn3Field2":"flxExpColumn3Field2",
          "lblExpColumn3Field2":"lblExpColumn3Field2",
          "lblExpColumn3Field2Value":"lblExpColumn3Field2Value",
          "flxDetailsField1":"flxDetailsField1",
          "lblDetails1":"lblDetails1",
          "lblDetailsValue1":"lblDetailsValue1",
          "flxDetailsField2":"flxDetailsField2",
          "lblDetails2":"lblDetails2",
          "lblDetailsValue2":"lblDetailsValue2",
          "flxDetailsField3":"flxDetailsField3",
          "lblDetails3":"lblDetails3",
          "lblDetailsValue3":"lblDetailsValue3",
          "flxDetailsField4":"flxDetailsField4",
          "lblDetails4":"lblDetails4",
          "lblDetailsValue4":"lblDetailsValue4",
          "flxDetailsField5":"flxDetailsField5",
          "lblDetails5":"lblDetails5",
          "lblDetailsValue5":"lblDetailsValue5",
          "flxDetailsField6":"flxDetailsField6",
          "lblDetails6":"lblDetails6",
          "lblDetailsValue6":"lblDetailsValue6",
          "flxDetailsField7":"flxDetailsField7",
          "lblDetails7":"lblDetails7",
          "lblDetailsValue7":"lblDetailsValue7",
          "flxDetailsField8":"flxDetailsField8",
          "lblDetails8":"lblDetails8",
          "lblDetailsValue8":"lblDetailsValue8",
          "flxDetailsField9":"flxDetailsField9",
          "lblDetails9":"lblDetails9",
          "lblDetailsValue9":"lblDetailsValue9",
          "flxAction":"flxAction",
          "lblSeparator1":"lblSeparator1",
          "lblSeparator2":"lblSeparator2",
          "lblSeparator3":"lblSeparator3",
          
          //desktop
          "flxDropdown" : "flxDropdown",
          "imgDropdown" : "imgDropdown",
          "lblSeparator" : "lblSeparator",
          "lblSeparatorBottom" : "lblSeparatorBottom",
          "flxColumn1" : "flxColumn1",
          "flxColumn2" : "flxColumn2",
          "flxColumn3" : "flxColumn3",
          "flxColumnAction" : "flxColumnAction",
          "flxEbill":"flxEbill",
          "btnEbill" : "btnEbill",
          "flxColumn2Wrapper" : "flxColumn2Wrapper",
          "flxColumn3Wrapper" : "flxColumn2Wrapper",
          "lblColumn1" : "lblColumn1",
          "lblColumn1Accessibility":"lblColumn1Accessibility",
          "lblColumn2Accessibility":"lblColumn2Accessibility",
          "lblColumn3Accessibility":"lblColumn3Accessibility",
          "lblColumn2" : "lblColumn2",
          "lblColumn3" : "lblColumn3",
          "lblColumn2Row2" : "lblColumn2Row2",
          "lblColumn3Row2" : "lblColumn3Row2",
          "btnAction" : "btnAction",
          "flxField1" : "flxField1",
          "flxField2" : "flxField2",
          "flxField3" : "flxField3",
          "flxField4" : "flxField4",
          "flxField5" : "flxField5",
          "flxField6" : "flxField6",
          "flxField7" : "flxField7",
          "flxField8" : "flxField8",
          "flxField9" : "flxField9",
          "flxField1Wrapper" : "flxField1Wrapper",
          "flxField2Wrapper" : "flxField2Wrapper",
          "flxField3Wrapper" : "flxField3Wrapper",
          "flxField4Wrapper" : "flxField4Wrapper",
          "flxField5Wrapper" : "flxField5Wrapper",
          "flxField6Wrapper" : "flxField6Wrapper",
          "flxField7Wrapper" : "flxField7Wrapper",
          "flxField8Wrapper" : "flxField8Wrapper",
          "flxField9Wrapper" : "flxField9Wrapper",
          "flxActions" : "flxActions",
          "lblField1" : "lblField1",
          "lblField2" : "lblField2",
          "lblField3" : "lblField3",
          "lblField4" : "lblField4",
          "lblField5" : "lblField5",
          "lblField6" : "lblField6",
          "lblField7" : "lblField7",
          "lblField8" : "lblField8",
          "lblField9" : "lblField9",
          "lblField1Value" : "lblField1Value",
          "lblField2Value" : "lblField2Value",
          "lblField3Value" : "lblField3Value",
          "lblField4Value" : "lblField4Value",
          "lblField5Value" : "lblField5Value",
          "lblField6Value" : "lblField6Value",
          "lblField7Value" : "lblField7Value",
          "lblField8Value" : "lblField8Value",
          "lblField9Value" : "lblField9Value",
          "btn1" : "btn1",
          "btn2" : "btn2",
          "btn3" : "btn3",
          "btn4" : "btn4",
          "flxRow1" : "flxRow1",
          "flxRow2" : "flxRow2",
          "flxRow3" : "flxRow3",
//           "flxIdentifier" : "flxIdentifier",
          "lblIdentifier" : "lblIdentifier",
          "flxIcon" : "flxIcon",
          "imgIcon" : "imgIcon"
        };
      },
      
      /**
      * setPayeeListMobile.
      * responsible for setting the Payee data to the segment for Mobile breakpoint.
      * response {Object} - object contains service response data.
      */	
      setPayeeListMobile: function(response){
        try{
          var section = [];
          var scopeObj =this;
          var serviceResponse;
          if(this._searchResult === true){
            serviceResponse = this.getRecordsArray(this._responsePathSearch,response);
            this.ParserUtilsManager.setResponseData(this._payeeSEARCHIdentifier, serviceResponse);
          }
          else{
            serviceResponse = this.getRecordsArray(this._responsePath,response);
            this.ParserUtilsManager.setResponseData(this._payeeGETIdentifier, serviceResponse);
          }
          if(!serviceResponse || serviceResponse.length < 1){
            this.noRecipients(true);
            this.setPageCount(0);
            this.togglePaginationVisibility(false);
            return;
          }else{
            this.noRecipients(false);
          }
          var Field1Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel1) ? false : true;
          var Field2Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel2) ? false : true;
          var Field3Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel3) ? false : true;
          var Field4Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel4) ? false : true;
          var Field5Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel5) ? false : true;
          var Field6Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel6) ? false : true;
          var Field7Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel7) ? false : true;
          var Field8Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel8) ? false : true;
          var Field9Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel9) ? false : true;
          var btnActionVisibility = this.isEmptyNullUndefined(this._dataGridColumnAction) ? false : true;
          var btn1Visibility = this.isEmptyNullUndefined(this._additionalDetailsAction1) ? false : true;
          var btn2Visibility = this.isEmptyNullUndefined(this._additionalDetailsAction2) ? false : true;
          var btn3Visibility = this.isEmptyNullUndefined(this._additionalDetailsAction3) ? false : true;
          var btn4Visibility = this.isEmptyNullUndefined(this._additionalDetailsAction4) ? false : true;
          var payeeIconVisibility = this._payeeIconVisibility;
          var isCombinedUser = this.isCombinedUser();
          var Column2Visibility = this.isEmptyNullUndefined(this._dataGridColumn2) ? false : true;
          var Column3Visibility = this.isEmptyNullUndefined(this._dataGridColumn3) ? false : true;
          var Column2Row2Visibility = this.isEmptyNullUndefined(this._dataGridColumn2Row2) ? false : true;
          var Column3Row2Visibility = this.isEmptyNullUndefined(this._dataGridColumn3Row2) ? false : true;
          var EbillVisibility = this._ebillVisibility;
          for(var i = 0; i < serviceResponse.length; i++){
            this.btnCount=0;
            var record = {};
            if(payeeIconVisibility && isCombinedUser){
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
            record["lblSeparatorBottom"] = {
              "isVisible" : true
            };
            record["lblSeparator"] = {
              "isVisible" : true
            };
            record["flxDropdown"] = {
              "accessibilityConfig":{
                "a11yLabel":"Show more details for "+this.getFormattedData(this.getResponseValue(JSON.parse(this.dataGridColumn1)["mapping"], i), 
                JSON.parse(this.dataGridColumn1)["fieldType"]),
                "a11yARIA":{
                  "tabindex":0,
                  "role":"button",
                  "aria-expanded":false
                }
              },
              onClick : scopeObj.onToggleMobile.bind(scopeObj),
              "isVisible" : true
            };
            record["imgDropdown"] = {
              "src" : this.getImageOrIcon(this._iconRowExpand)
            };
            record["flxIdentifier"] = {
              "isVisible" : true,
              "skin" : "sknflx4a902",
              //"height" : "210dp"
            };
            record["lblIdentifier"] = {
              "text" : "I",
              "isVisible" : true
            };
            record["lblField1"] = {
              "text": this.getFormattedData(this.getResponseValue(JSON.parse(this.dataGridColumn1)["mapping"], i), 
                                            JSON.parse(this.dataGridColumn1)["fieldType"]),
              "skin": this.getBreakPointTypeBasedValue(this._sknValueField)
            };
            if(Column2Visibility){
              record["lblField2"] = {
                "text": this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn2)["text"])),
                "skin": this.getBreakPointTypeBasedValue(this._sknOptionalValueField)
              };
              record["lblField2Value"] = {
                "text": this.getFormattedData(this.getResponseValue(JSON.parse(this._dataGridColumn2)["mapping"], i), 
                                              JSON.parse(this._dataGridColumn2)["fieldType"]),
                "skin": this.getBreakPointTypeBasedValue(this._sknOptionalValueField)
              };
            }
            else{
              record["flxField2"] = {
                "isVisible" : false
              };
            }
            record["flxActions"] = {
              "isVisible" : true
            };
            var btnAction = this.getActionJSON(this._dataGridColumnAction, serviceResponse, i);
            if(btnActionVisibility && btnAction !== "" && this.isEntitled(btnAction["entitlement"])){
              record["btnActions"] = {
                "isVisible" : true,
                "accessibilityConfig":{
                  "a11yLabel":this.getBreakPointTypeBasedValue(this._sknActionButtons)+" for "+this.getFormattedData(this.getResponseValue(JSON.parse(this.dataGridColumn1)["mapping"], i), 
                  JSON.parse(this.dataGridColumn1)["fieldType"]),
                  "a11yARIA":{
                    "tabindex":0
                  }
                },
                "text": this.getBreakPointTypeBasedValue(JSON.stringify(btnAction["text"])), 
                "skin": this.getBreakPointTypeBasedValue(this._sknActionButtons),
                "onClick": scopeObj.btnActionOnClick.bind(scopeObj, serviceResponse, this._dataGridColumnAction)
              };
            }else{
              record["btnActions"] = {
                "isVisible" : false
              };
            }
            if(EbillVisibility){
              var ebillStatus = this.getEbillStatus(this._dataGridEbill, serviceResponse, i);
              if(ebillStatus === "Activate"){
                record["btnEbill"] = {
                  "isVisible" : true,
                  "skin" : this.getBreakPointTypeBasedValue(this._sknEbillButtonEnabledSkin),
                  "accessibilityConfig":{
                    "a11yHidden":true,
                    "a11yARIA":{
                      "tabindex":-1
                    }
                  }
                };
              }
              else{
                record["btnEbill"] = {
                  "isVisible" : true,
                  "skin" : this.getBreakPointTypeBasedValue(this._sknEbillButtonDisabledSkin),
                  "accessibilityConfig":{
                    "a11yHidden":true,
                    "a11yARIA":{
                      "tabindex":-1
                    }
                  }
                };
              }
            }
            else{
              record["btnEbill"] = {
                "isVisible" : false,
              };
            }
            if(Column2Row2Visibility){
              record["lblExpColumn2Field2"] = {
                "text": this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn2Row2)["text"])), 
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
              };
              record["lblExpColumn2Field2Value"] = {
                "text": this.getFormattedData(this.getResponseValue(JSON.parse(this._dataGridColumn2Row2)["mapping"], i), 
                                              JSON.parse(this._dataGridColumn2Row2)["fieldType"]),
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
              };
            }
            else{
              record["flxExpColumn2Field2"] = {
                "isVisible" : false
              };
            }
            if(Column3Visibility){
              record["lblExpColumn3Field1"] = {
                "text": this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn3)["text"])), 
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
              };
              record["lblExpColumn3Field1Value"] = {
                "text": this.getFormattedData(this.getResponseValue(JSON.parse(this.dataGridColumn3)["mapping"], i), 
                                              JSON.parse(this.dataGridColumn3)["fieldType"]),
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
              };
            }
            else{
              record["flxExpColumn3Field1"] = {
                "isVisible" : false
              };
            }
            if(Column3Row2Visibility){
              record["lblExpColumn3Field2"] = {
                "text": this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn3Row2)["text"])), 
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
              };
              record["lblExpColumn3Field2Value"] = {
                "text": this.getFormattedData(this.getResponseValue(JSON.parse(this._dataGridColumn3Row2)["mapping"], i), 
                                              JSON.parse(this._dataGridColumn3Row2)["fieldType"]),
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
              };
            }
            else{
              record["flxExpColumn3Field2"] = {
                "isVisible" : false
              };
            }
            if(Field1Visibility){
              record["lblDetails1"] = {
                "text": this.getBreakPointTypeBasedValue(this._additionalDetailsLabel1), 
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
              };
              record["lblDetailsValue1"] = {
                "text": this.getFormattedData(this.getResponseValue(this._additionalDetailsValue1, i),
                                              this._additionalDetailsType1),
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
              };
            }
            else{
              record["flxDetailsField1"] = {
                "isVisible" : false
              };
            }
            if(Field2Visibility){
              record["lblDetails2"] = {
                "text": this.getBreakPointTypeBasedValue(this._additionalDetailsLabel2), 
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
              };
              record["lblDetailsValue2"] = {
                "text": this.getFormattedData(this.getResponseValue(this._additionalDetailsValue2, i),
                                              this._additionalDetailsType2),
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
              };
            }
            else{
              record["flxDetailsField2"] = {
                "isVisible" : false
              };
            }
            if(Field3Visibility){
              record["lblDetails3"] = {
                "text": this.getBreakPointTypeBasedValue(this._additionalDetailsLabel3)+":", 
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
              };
              record["lblDetailsValue3"] = {
                "text": this.getFormattedData(this.getResponseValue(this._additionalDetailsValue3, i),
                                              this._additionalDetailsType3) + " " + kony.i18n.getLocalizedString("i18n.contracts.customers"),
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
              };
            }
            else{
              record["flxDetailsField3"] = {
                "isVisible" : false
              };
            }
            if(Field4Visibility){
              record["lblDetails4"] = {
                "text": this.getBreakPointTypeBasedValue(this._additionalDetailsLabel4), 
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
              };
              record["lblDetailsValue4"] = {
                "text": this.getFormattedData(this.getResponseValue(this._additionalDetailsValue4, i),
                                              this._additionalDetailsType4),
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
              };
            }
            else{
              record["flxDetailsField4"] = {
                "isVisible" : false
              };
            }
            if(Field5Visibility){
              record["lblDetails5"] = {
                "text": this.getBreakPointTypeBasedValue(this._additionalDetailsLabel5), 
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
              };
              record["lblDetailsValue5"] = {
                "text": this.getFormattedData(this.getResponseValue(this._additionalDetailsValue5, i),
                                              this._additionalDetailsType5),
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
              };
            }
            else{
              record["flxDetailsField5"] = {
                "isVisible" : false
              };
            }
            if(Field6Visibility){
              record["lblDetails6"] = {
                "text": this.getBreakPointTypeBasedValue(this._additionalDetailsLabel6), 
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
              };
              record["lblDetailsValue6"] = {
                "text": this.getFormattedData(this.getResponseValue(this._additionalDetailsValue6, i),
                                              this._additionalDetailsType6),
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
              };
            }
            else{
              record["flxDetailsField6"] = {
                "isVisible" : false
              };
            }
            if(Field7Visibility){
              record["lblDetails7"] = {
                "text": this.getBreakPointTypeBasedValue(this._additionalDetailsLabel7), 
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
              };
              record["lblDetailsValue7"] = {
                "text": this.getFormattedData(this.getResponseValue(this._additionalDetailsValue7, i),
                                              this._additionalDetailsType7),
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
              };
            }
            else{
              record["flxDetailsField7"] = {
                "isVisible" : false
              };
            }
            if(Field8Visibility){
              record["lblDetails8"] = {
                "text": this.getBreakPointTypeBasedValue(this._additionalDetailsLabel8), 
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
              };
              record["lblDetailsValue8"] = {
                "text": this.getFormattedData(this.getResponseValue(this._additionalDetailsValue8, i),
                                              this._additionalDetailsType8),
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
              };
            }
            else{
              record["flxDetailsField8"] = {
                "isVisible" : false
              };
            }
            if(Field9Visibility){
              record["lblDetails9"] = {
                "text": this.getBreakPointTypeBasedValue(this._additionalDetailsLabel9), 
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
              };
              record["lblDetailsValue9"] = {
                "text": this.getFormattedData(this.getResponseValue(this._additionalDetailsValue9, i),
                                              this._additionalDetailsType9),
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
              };
            }
            else{
              record["flxDetailsField9"] = {
                "isVisible" : false
              };
            }
            var btn1Action = this.getActionJSON(this._additionalDetailsAction1,serviceResponse, i);
            if(btn1Visibility && btn1Action !== "" && btn1Action.text && this.isEntitled(btn1Action.entitlement)){
              this.btnCount++;
              record["btn1"] = {
                "isVisible": true,
                "accessibilityConfig":{
                  "a11yLabel":this.getBreakPointTypeBasedValue(JSON.stringify(btn1Action.text))+" for "+this.getFormattedData(this.getResponseValue(JSON.parse(this.dataGridColumn1)["mapping"], i), 
                  JSON.parse(this.dataGridColumn1)["fieldType"]),
                  "a11yARIA":{
                    "tabindex":0
                  }
                },
                "text": this.getBreakPointTypeBasedValue(JSON.stringify(btn1Action.text)),
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsButton),
                "onClick": scopeObj.btnActionOnClick.bind(scopeObj, serviceResponse, this._additionalDetailsAction1)
              };
              record["lblSeparator1"] = {
                "isVisible": true
              };
            }
            else{
              record["btn1"] = {
                "isVisible": false
              };
              record["lblSeparator1"] = {
                "isVisible": false
              };
            }
            var btn2Action = this.getActionJSON(this._additionalDetailsAction2,serviceResponse, i);
            if(btn2Visibility && btn2Action !== "" && btn2Action.text && this.isEntitled(btn2Action.entitlement)){
              this.btnCount++;
              record["btn2"] = {
                "isVisible": true,
                "text": this.getBreakPointTypeBasedValue(JSON.stringify(btn2Action.text)), 
                "accessibilityConfig":{
                  "a11yLabel":this.getBreakPointTypeBasedValue(JSON.stringify(btn2Action.text))+" for "+this.getFormattedData(this.getResponseValue(JSON.parse(this.dataGridColumn1)["mapping"], i), 
                  JSON.parse(this.dataGridColumn1)["fieldType"]),
                  "a11yARIA":{
                    "tabindex":0
                  }
                },
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsButton),
                "onClick": scopeObj.btnActionOnClick.bind(scopeObj, serviceResponse, this._additionalDetailsAction2)
              };
              record["lblSeparator2"] = {
                "isVisible": true
              };
            }
            else{
              record["btn2"] = {
                "isVisible": false
              };
              record["lblSeparator2"] = {
                "isVisible": false
              };
            }
            var btn3Action = this.getActionJSON(this._additionalDetailsAction3,serviceResponse, i);
            if(btn3Visibility && btn3Action !== "" && btn3Action.text && this.isEntitled(btn3Action.entitlement)){
              this.btnCount++;
              record["btn3"] = {
                "isVisible": true,
                "text": this.getBreakPointTypeBasedValue(JSON.stringify(btn3Action.text)),
                "accessibilityConfig":{
                  "a11yLabel":this.getBreakPointTypeBasedValue(JSON.stringify(btn3Action.text))+" for "+this.getFormattedData(this.getResponseValue(JSON.parse(this.dataGridColumn1)["mapping"], i), 
                  JSON.parse(this.dataGridColumn1)["fieldType"]),
                  "a11yARIA":{
                    "tabindex":0
                  }
                }, 
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsButton),
                "onClick": scopeObj.btnActionOnClick.bind(scopeObj, serviceResponse, this._additionalDetailsAction3)
              };
              record["lblSeparator3"] = {
                "isVisible": true
              };
            }
            else{
              record["btn3"] = {
                "isVisible": false
              };
              record["lblSeparator3"] = {
                "isVisible": false
              };
            }
            var btn4Action = this.getActionJSON(this._additionalDetailsAction4,serviceResponse, i);
            if(btn4Visibility && btn4Action !== "" && btn4Action.text && this.isEntitled(btn4Action.entitlement)){
              this.btnCount++;
              record["btn4"] = {
                "isVisible": true,
                "text": this.getBreakPointTypeBasedValue(JSON.stringify(btn4Action.text)),
                "accessibilityConfig":{
                  "a11yLabel":this.getBreakPointTypeBasedValue(JSON.stringify(btn4Action.text))+" for "+this.getFormattedData(this.getResponseValue(JSON.parse(this.dataGridColumn1)["mapping"], i), 
                  JSON.parse(this.dataGridColumn1)["fieldType"]),
                  "a11yARIA":{
                    "tabindex":0
                  }
                }, 
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsButton),
                "onClick": scopeObj.btnActionOnClick.bind(scopeObj, serviceResponse, this._additionalDetailsAction4)
              };
            }
            else{
              record["btn4"] = {
                "isVisible": false
              };
            }
            record.template = "flxBillPayManagePayeesMobileIC";
            record["flxBillPayManagePayeesSelectedMobileIC "] = {
              "skin" : this.getBreakPointTypeBasedValue(this._sknRowExpanded) 
            };
            record["flxBillPayManagePayeesMobileIC "] = {
              "hoverSkin" : this.getBreakPointTypeBasedValue(this._sknRowHover) 
            };
            record["btnCount"] = this.btnCount;
            var btnWidth;
            if (this.btnCount === 1) { btnWidth = "100%" ;}
            else if (this.btnCount === 2) { btnWidth = "50%" ;}
            else if (this.btnCount === 3) { btnWidth = "33.33%" ;}
            else if (this.btnCount === 4) { btnWidth = "25%"; }
            record["flxActions"] = {
              "isVisible": this.btnCount > 0
            };
            for (var j = 1; j <= 4; j++) {
              if (record["btn" + j].isVisible) { record["btn" + j].width = btnWidth ;}
            }
            section.push(record);
          }
          //Sample code to enable the seperatorRequired property for a Segment 
          this.view.segmentBillPay.separatorRequired=false;
          this.view.segmentBillPay.widgetDataMap = this.getWidgetDataMap();
          this.view.segmentBillPay.removeAll();
          this.view.segmentBillPay.setData(section);
          if(kony.os.deviceInfo().screenHeight<200){
            var segList=this.view.segmentBillPay.data;
            for(var i=0;i<segList.length;i++){
              segList[i]["btnEbill"].isVisible = false;
            }
            this.view.segmentBillPay.setData(segList);
          }
          this.setPageCount(section.length);
          if(deActivateEbillFlag===true){
            this.view.segmentBillPay.setActive(deActivateIndex,-1,"flxBillPayManagePayeesMobileIC.flxMainGroup.flxGroup.flxBillPayAllPayeesWrapper.flxDropdown");
            deActivateEbillFlag="";
          }
          if(payBillFlag===true){
            this.view.segmentBillPay.setActive(eBillIndex, -1, "flxBillPayManagePayeesMobileIC.flxMainGroup.flxGroup.flxBillPayAllPayeesWrapper.flxWrapper.flxActions.btnActions");
            payBillFlag="";
          }
          if(searchClearFlag===true){
            this.view.txtSearch.setActive(true);
            searchClearFlag=false;
          }
        }
        catch(err)
        {
          var errObj = {
            "errorInfo" : "Error in setPayeeListMobile method of the component.",
            "error": err
          };
          this.onError(errObj);
        }
      },

      /**
      * noRecipients.
      * This method is responsible for showing no payees message.
      */
      noRecipients: function(boolean){
        this.view.flxSegmentContainer.setVisibility(!boolean);
        this.view.flxNoPayment.setVisibility(boolean);
      },

      /**
      * setPayeeListDesktop.
      * responsible for setting the Payee data to the segment for desktop breakpoint.
      * response {Object} - contains service response data.
      */
      setPayeeListDesktop: function(response){
        try{
          var section = [];
          var scopeObj =this;
          var serviceResponse;
          if(this._searchResult === true){
            serviceResponse = this.getRecordsArray(this._responsePathSearch,response);
            this.ParserUtilsManager.setResponseData(this._payeeSEARCHIdentifier, serviceResponse);
          }
          else{
            serviceResponse = this.getRecordsArray(this._responsePath,response);
            this.ParserUtilsManager.setResponseData(this._payeeGETIdentifier, serviceResponse);
          }
          if(!serviceResponse || serviceResponse.length < 1){
            this.noRecipients(true);
            this.setPageCount(0);
            this.togglePaginationVisibility(false);
            return;
          }else{
            this.noRecipients(false);
          }
          var Field2Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel2) ? false : true;
          var Field3Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel3) ? false : true;
          var Field4Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel4) ? false : true;
          var Field5Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel5) ? false : true;
          var Field6Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel6) ? false : true;
          var Field7Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel7) ? false : true;
          var Field8Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel8) ? false : true;
          var Field9Visibility = this.isEmptyNullUndefined(this._additionalDetailsLabel9) ? false : true;
          var btnActionVisibility = this.isEmptyNullUndefined(this._dataGridColumnAction) ? false : true;
          var btn1Visibility = this.isEmptyNullUndefined(this._additionalDetailsAction1) ? false : true;
          var btn2Visibility = this.isEmptyNullUndefined(this._additionalDetailsAction2) ? false : true;
          var btn3Visibility = this.isEmptyNullUndefined(this._additionalDetailsAction3) ? false : true;
          var btn4Visibility = this.isEmptyNullUndefined(this._additionalDetailsAction4) ? false : true;
          var Column2Visibility = this.isEmptyNullUndefined(this._dataGridColumn2) ? false : true;
          var Column3Visibility = this.isEmptyNullUndefined(this._dataGridColumn3) ? false : true;
          var Column2Row2Visibility = this.isEmptyNullUndefined(this._dataGridColumn2Row2) ? false : true;
          var Column3Row2Visibility = this.isEmptyNullUndefined(this._dataGridColumn3Row2) ? false : true;
          var EbillVisibility = this._ebillVisibility;
          var payeeIconVisibility = this._payeeIconVisibility;
          var isCombinedUser = this.isCombinedUser();
          for(var i = 0; i < serviceResponse.length; i++){
            var record = {};
//             record["lblSeparator"] = {
//               "isVisible" : true
//             };
//             record["lblSeparatorBottom"] = {
//               "isVisible" : true
//             };
            record["flxDropdown"] = {
              "accessibilityConfig":{
                "a11yLabel":"Show more details for "+this.getFormattedData(this.getResponseValue(JSON.parse(this.dataGridColumn1)["mapping"], i), 
                JSON.parse(this.dataGridColumn1)["fieldType"]),
                "a11yARIA":{
                  "tabindex":0,
                  "role":"button",
                  "aria-expanded":false
                }
              },
              onClick : scopeObj.onToggle.bind(scopeObj),
              "isVisible" : true
            };
            record["imgDropdown"] = {
              "src" : this.getImageOrIcon(this._iconRowExpand)
            };
            record["flxIdentifier"] = {
              "isVisible" : true,
              "skin" : "sknflx4a902",
              "height" : "210dp"
            };
            record["lblIdentifier"] = {
              "text" : "I",
              "isVisible" : true
            };
            if(payeeIconVisibility && isCombinedUser){
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
            record["lblColumn1Accessibility"] = {
              "text": this.view.lblColumnHeader1.text+" "+this.getFormattedData(this.getResponseValue(JSON.parse(this.dataGridColumn1)["mapping"], i), 
                                            JSON.parse(this.dataGridColumn1)["fieldType"])
            };
            record["lblColumn1"] = {
              "text": this.getFormattedData(this.getResponseValue(JSON.parse(this.dataGridColumn1)["mapping"], i), 
                                            JSON.parse(this.dataGridColumn1)["fieldType"]),
              "skin": this.getBreakPointTypeBasedValue(this._sknValueField)
            };
            if (EbillVisibility) {
              var ebillStatus = this.getEbillStatus(this._dataGridEbill, serviceResponse, i);
              if (ebillStatus === "Activate") {
                  record["flxEbill"] = {
                          "isVisible": true,
                          "skin":"slFbox",
                          "accessibilityConfig": {
                              "a11yARIA": {
                                  "tabindex": -1
                              }
                          }
                      },
                      record["btnEbill"] = {
                          "isVisible": true,
                          "src": "billpay_ebill_active.png",
                          "accessibilityConfig": {
                              "a11yLabel": "Ebill for " + this.getFormattedData(this.getResponseValue(JSON.parse(this.dataGridColumn1)["mapping"], i), JSON.parse(this.dataGridColumn1)["fieldType"]) + " Activated",
                              "a11yARIA": {
                                  "tabindex": -1
                              }
                          }
                      };
              } else {
                  record["flxEbill"] = {
                          "isVisible": true,
                          "skin":"slFbox",
                          "accessibilityConfig": {
                              "a11yARIA": {
                                  "tabindex": -1
                              }
                          }
                      },
                      record["btnEbill"] = {
                          "isVisible": true,
                          "src": "billpay_ebill_inactivate.png",
                          "accessibilityConfig": {
                              "a11yLabel": "Ebill for " + this.getFormattedData(this.getResponseValue(JSON.parse(this.dataGridColumn1)["mapping"], i), JSON.parse(this.dataGridColumn1)["fieldType"]) + " deactivated",
                              "a11yARIA": {
                                  "tabindex": -1
                              }
                          }
                      };
              }
            }
            else{
              record["btnEbill"] = {
                "isVisible" : false,
              },
              record["flxEbill"] = {
                "isVisible" : false,
              }
            }
            if(Column2Visibility){
              record["lblColumn2"] = {
                "text": this.getFormattedData(this.getResponseValue(JSON.parse(this.dataGridColumn2)["mapping"], i), 
                                              JSON.parse(this.dataGridColumn2)["fieldType"]),
                "skin": this.getBreakPointTypeBasedValue(this._sknValueField)
              };
              record["lblColumn2Accessibility"] = {
                "text": this.view.lblColumnHeader2.text+" "+this.getFormattedData(this.getResponseValue(JSON.parse(this.dataGridColumn2)["mapping"], i), 
                                              JSON.parse(this.dataGridColumn2)["fieldType"])
              };
            }
            else{
              record["flxColumn2"] = {
                "isVisible": false
              };
            }
            if(Column2Row2Visibility){
              var str1 = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn2Row2)["text"]));
              var str2 = this.getFormattedData(this.getResponseValue(JSON.parse(this._dataGridColumn2Row2)["mapping"], i), 
                                               JSON.parse(this._dataGridColumn2Row2)["fieldType"]);
              record["lblColumn2Row2"] = {
                "text": str1 + str2,
                "skin": this.getBreakPointTypeBasedValue(this._sknOptionalValueField)
              };
            }
            else{
              record["lblColumn2Row2"] = {
                "isVisible": false
              };
            }
            if(Column3Visibility){
              record["lblColumn3"] = {
                "text": this.getFormattedData(this.getResponseValue(JSON.parse(this.dataGridColumn3)["mapping"], i), 
                                              JSON.parse(this.dataGridColumn3)["fieldType"]),
                "skin": this.getBreakPointTypeBasedValue(this._sknValueField)
              };
              record["lblColumn3Accessibility"] = {
                "text": this.view.lblColumnHeader3.text+" "+this.getFormattedData(this.getResponseValue(JSON.parse(this.dataGridColumn3)["mapping"], i), 
                                              JSON.parse(this.dataGridColumn3)["fieldType"])
              };
            }
            else{
              record["flxColumn3"] = {
                "isVisible": false
              };
            }
            if(Column3Row2Visibility){
              var str3 = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._dataGridColumn3Row2)["text"]));
              var str4 = this.getFormattedData(this.getResponseValue(JSON.parse(this._dataGridColumn3Row2)["mapping"], i), 
                                               JSON.parse(this._dataGridColumn3Row2)["fieldType"]);
              record["lblColumn3Row2"] = {
                "text": str3 + str4,
                "skin": this.getBreakPointTypeBasedValue(this._sknOptionalValueField)
              };
            }
            else{
              record["lblColumn3Row2"] = {
                "isVisible": false
              };
            }
            record["flxColumnAction"] = {
              "isVisible" : true
            };
            var btnAction = this.getActionJSON(this._dataGridColumnAction, serviceResponse, i);
            if(btnActionVisibility && btnAction !== "" && this.isEntitled(btnAction.entitlement)){
              record["btnAction"] = {
                "isVisible" : true,
                "accessibilityConfig":{
                  "a11yLabel":this.getBreakPointTypeBasedValue(JSON.stringify(btnAction["text"]))+" for "+this.getFormattedData(this.getResponseValue(JSON.parse(this.dataGridColumn1)["mapping"], i), 
                  JSON.parse(this.dataGridColumn1)["fieldType"]),
                  "a11yARIA":{
                    "tabindex":0
                  }
                },
                "text": this.getBreakPointTypeBasedValue(JSON.stringify(btnAction["text"])),
                "skin": this.getBreakPointTypeBasedValue(this._sknActionButtons),
                "onClick": scopeObj.btnActionOnClick.bind(scopeObj, serviceResponse, this._dataGridColumnAction)
              };
            } else{
              record["btnAction"] = {
                "isVisible" : false
              };
            }
            record["lblField1"] = {
              "text": this.getBreakPointTypeBasedValue(this._additionalDetailsLabel1), 
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
            };
            record["lblField1Value"] = {
              "text": this.getFormattedData(this.getResponseValue(this._additionalDetailsValue1, i),
                                            this._additionalDetailsType1),
              "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
            };
            if(Field2Visibility){
              record["lblField2"] = {
                "text": this.getBreakPointTypeBasedValue(this._additionalDetailsLabel2), 
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
              };
              record["lblField2Value"] = {
                "text": this.getFormattedData(this.getResponseValue(this._additionalDetailsValue2, i),
                                              this._additionalDetailsType2),
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
              };
            }
            else{
              record["flxField2"] = {
                "isVisible": false
              };
            }
            if(Field3Visibility){
              record["lblField3"] = {
                "text": this.getBreakPointTypeBasedValue(this._additionalDetailsLabel3)+":",
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
              };
              record["lblField3Value"] = {
                "text": this.getFormattedData(this.getResponseValue(this._additionalDetailsValue3, i),
                                              this._additionalDetailsType3) + " " + kony.i18n.getLocalizedString("i18n.contracts.customers"),
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
              };
            }
            else{
              record["flxField3"] = {
                "isVisible": false
              };
            }
            if(Field4Visibility || Field5Visibility || Field6Visibility){
              if(Field4Visibility){
                record["lblField4"] = {
                  "text": this.getBreakPointTypeBasedValue(this._additionalDetailsLabel4),
                  "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
                };
                record["lblField4Value"] = {
                  "text": this.getFormattedData(this.getResponseValue(this._additionalDetailsValue4, i),
                                                this._additionalDetailsType4),
                  "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
                };
              }
              else{
                record["flxField4"] = {
                  "isVisible": false
                };
              }
              if(Field5Visibility){
                record["lblField5"] = {
                  "text": this.getBreakPointTypeBasedValue(this._additionalDetailsLabel5),
                  "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
                };
                record["lblField5Value"] = {
                  "text": this.getFormattedData(this.getResponseValue(this._additionalDetailsValue5, i),
                                                this._additionalDetailsType5),
                  "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
                };
              }
              else{
                record["flxField5"] = {
                  "isVisible": false
                };
              }
              if(Field6Visibility){
                record["lblField6"] = {
                  "text": this.getBreakPointTypeBasedValue(this._additionalDetailsLabel6),
                  "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
                };
                record["lblField6Value"] = {
                  "text": this.getFormattedData(this.getResponseValue(this._additionalDetailsValue6, i),
                                                this._additionalDetailsType6),
                  "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
                };
              }
              else{
                record["flxField6"] = {
                  "isVisible": false
                };
              }
              if(Field7Visibility || Field8Visibility || Field9Visibility){
                if(Field7Visibility){
                  record["lblField7"] = {
                    "text": this.getBreakPointTypeBasedValue(this._additionalDetailsLabel7),
                    "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
                  };
                  record["lblField7Value"] = {
                    "text": this.getFormattedData(this.getResponseValue(this._additionalDetailsValue7, i),
                                                  this._additionalDetailsType7),
                    "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
                  };
                }
                else{
                  record["flxField7"] = {
                    "isVisible": false
                  };
                }
                if(Field8Visibility){
                  record["lblField8"] = {
                    "text": this.getBreakPointTypeBasedValue(this._additionalDetailsLabel8),
                    "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
                  };
                  record["lblField8Value"] = {
                    "text": this.getFormattedData(this.getResponseValue(this._additionalDetailsValue8, i),
                                                  this._additionalDetailsType8),
                    "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
                  };
                }
                else{
                  record["flxField8"] = {
                    "isVisible": false
                  };
                }
                if(Field9Visibility){
                  record["lblField9"] = {
                    "text": this.getBreakPointTypeBasedValue(this._additionalDetailsLabel9),
                    "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsLabel)
                  };
                  record["lblField9Value"] = {
                    "text": this.getFormattedData(this.getResponseValue(this._additionalDetailsValue9, i),
                                                  this._additionalDetailsType9),
                    "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsValue)
                  };
                }
                else{
                  record["flxField9"] = {
                    "isVisible": false
                  };
                }
                record["flxIdentifier"] = {
                  "height" : "295dp"
                };
              }
              else {
                record["flxRow3"] = {
                  "isVisible": false
                };
                record["flxIdentifier"] = {
                  "height" : "242dp"
                };
              }
            }
            else{
              record["flxRow2"] = {
                "isVisible": false
              };
              record["flxRow3"] = {
                "isVisible": false
              };
              record["flxIdentifier"] = {
                "height" : "205dp"
              };
            }
            var btn1Action = this.getActionJSON(this._additionalDetailsAction1,serviceResponse, i);
            if(btn1Visibility && btn1Action !== "" && btn1Action.text && this.isEntitled(btn1Action.entitlement)){
              record["btn1"] = {
                "isVisible": true,
                "text": this.getBreakPointTypeBasedValue(JSON.stringify(btn1Action.text)),
                "accessibilityConfig":{
                  "a11yLabel":this.getBreakPointTypeBasedValue(JSON.stringify(btn1Action.text))+" for "+this.getFormattedData(this.getResponseValue(JSON.parse(this.dataGridColumn1)["mapping"], i), 
                  JSON.parse(this.dataGridColumn1)["fieldType"]),
                  "a11yARIA":{
                    "tabindex":0
                  }
                },
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsButton),
                "onClick": scopeObj.btnActionOnClick.bind(scopeObj, serviceResponse, this._additionalDetailsAction1)
              };
            }
            else{
              record["btn1"] = {
                "isVisible": false
              };
            }
            var btn2Action = this.getActionJSON(this._additionalDetailsAction2,serviceResponse, i);
            if(btn2Visibility && btn2Action !== "" &&btn2Action.text && this.isEntitled(btn2Action.entitlement)){
              record["btn2"] = {
                "isVisible": true,
                "text": this.getBreakPointTypeBasedValue(JSON.stringify(btn2Action.text)),
                "accessibilityConfig":{
                  "a11yLabel":this.getBreakPointTypeBasedValue(JSON.stringify(btn2Action.text))+" for "+this.getFormattedData(this.getResponseValue(JSON.parse(this.dataGridColumn1)["mapping"], i), 
                  JSON.parse(this.dataGridColumn1)["fieldType"]),
                  "a11yARIA":{
                    "tabindex":0
                  }
                },
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsButton),
                "onClick": scopeObj.btnActionOnClick.bind(scopeObj, serviceResponse, this._additionalDetailsAction2)
              };
            }
            else{
              record["btn2"] = {
                "isVisible": false
              };
            }
            var btn3Action = this.getActionJSON(this._additionalDetailsAction3,serviceResponse, i);
            if(btn3Visibility && btn3Action !== "" &&btn3Action.text && this.isEntitled(btn3Action.entitlement)){
              record["btn3"] = {
                "isVisible": true,
                "text": this.getBreakPointTypeBasedValue(JSON.stringify(btn3Action.text)),
                "accessibilityConfig":{
                  "a11yLabel":this.getBreakPointTypeBasedValue(JSON.stringify(btn3Action.text))+" for "+this.getFormattedData(this.getResponseValue(JSON.parse(this.dataGridColumn1)["mapping"], i), 
                  JSON.parse(this.dataGridColumn1)["fieldType"]),
                  "a11yARIA":{
                    "tabindex":0
                  }
                },
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsButton),
                "onClick": scopeObj.btnActionOnClick.bind(scopeObj, serviceResponse, this._additionalDetailsAction3)
              };
            }
            else{
              record["btn3"] = {
                "isVisible": false
              };
            }
            var btn4Action = this.getActionJSON(this._additionalDetailsAction4,serviceResponse, i);
            if(btn4Visibility && btn4Action !== "" && btn4Action.text && this.isEntitled(btn4Action.entitlement)){
              record["btn4"] = {
                "isVisible": true,
                "text": this.getBreakPointTypeBasedValue(JSON.stringify(btn4Action.text)),
                "accessibilityConfig":{
                  "a11yLabel":this.getBreakPointTypeBasedValue(JSON.stringify(btn4Action.text))+" for "+this.getFormattedData(this.getResponseValue(JSON.parse(this.dataGridColumn1)["mapping"], i), 
                  JSON.parse(this.dataGridColumn1)["fieldType"]),
                  "a11yARIA":{
                    "tabindex":0
                  }
                },
                "skin": this.getBreakPointTypeBasedValue(this._sknAdditionalDetailsButton),
                "onClick": scopeObj.btnActionOnClick.bind(scopeObj, serviceResponse, this._additionalDetailsAction4)
              }
            }
            else{
              record["btn4"] = {
                "isVisible": false
              }
            }
            record.template = "flxBillPayManagePayeesIC";
            record["flxBillPayManagePayeesSelectedIC "] = {
              "skin" : this.getBreakPointTypeBasedValue(this._sknRowExpanded) 
            };
            record["flxBillPayManagePayeesIC "] = {
              "hoverSkin" : this.getBreakPointTypeBasedValue(this._sknRowHover) 
            };
            section.push(record);
          }
          //Sample code to enable the seperatorRequired property for a Segment 
          this.view.segmentBillPay.separatorRequired=true;
          this.view.segmentBillPay.widgetDataMap = this.getWidgetDataMap();
          this.view.segmentBillPay.removeAll();
          this.view.segmentBillPay.setData(section);
          this.setPageCount(section.length);
          if(sortingFlag.id!==undefined){
            sortingFlag.id.setActive(true);
            sortingFlag={};
          }
          if(deActivateEbillFlag===true){
            this.view.segmentBillPay.setActive(deActivateIndex,-1,"flxBillPayManagePayeesIC.flxMainGroup.flxGroup.flxBillPayAllPayeesWrapper.flxDropdown");
            deActivateEbillFlag="";
          }
          if(payBillFlag===true){
            this.view.segmentBillPay.setActive(eBillIndex,-1,"flxBillPayManagePayeesIC.flxMainGroup.flxGroup.flxBillPayAllPayeesWrapper.flxWrapper.flxColumnAction.btnAction");
            payBillFlag="";
          }
          if(searchClearFlag===true){
            this.view.txtSearch.setActive(true);
            searchClearFlag=false;
          }
        }
        catch(err)
        {
          var errObj = {
            "errorInfo" : "Error in setPayeeListDesktop method of the component.",
            "error": err
          };
          this.onError(errObj);
        }
      },
      
      /**
      * getResponseValue
      * For Getting the response value by parsing the contract
      * value - contains the contract value
      * responseArrayIndex - Array Index
      * @return : {string} - Processed value
      */
      getResponseValue: function(value , responseArrayIndex){
        try{
          var string;
          if(this._searchResult === true){
            string = value.replace(/rootPath/g, this._payeeSEARCHIdentifier);
          }
          else{
            string = value.replace(/rootPath/g, this._payeeGETIdentifier);
          }
          return this.getProcessedText(string, responseArrayIndex);
        }
        catch(err)
        {
          var errObj = {
            "errorInfo" : "Error in getResponseValue method of the component.",
            "error": err
          };
          this.onError(errObj);
        }
      },

      /**
      * getEbillStatus
      * returns Ebill status by verifying the given Condition
      * contract - contract value
      * serviceResponse - service response object
      * index - Array Index
      * @return : {string} - Processed value
      */
      getEbillStatus: function(contract, serviceResponse, index){
        try{
          var scope = this;
          contract = JSON.parse(contract);
          if(!contract.hasOwnProperty("Condition1")){
            return contract["status"];
          }
          else{
            for(var key in contract){
              if(contract[key].hasOwnProperty("condition")){
                for(var responseValue in contract[key]["condition"]){
                  if(contract[key]["condition"][responseValue] == scope.getResponseValue(responseValue, index)){
                    var ActionJSON = "";
                    ActionJSON = contract[key]["status"];
                    return ActionJSON;
                  }
                }
              }
            }
          }
        }
        catch(err)
        {
          var errObj = {
            "errorInfo" : "Error in getEbillStatus method of the component.",
            "error": err
          };
          this.onError(errObj);
        }
      },

      /**
      * getActionJSON
      * returns Action Button JSON by verifying the given Condition
      * contract - contract value
      * serviceResponse - service response object
      * index - Array Index
      * @return : {JSON} - Processed json
      */
      getActionJSON: function(contract, serviceResponse, index){
        try{
          var scope = this;
          contract = JSON.parse(contract);
          if(!contract.hasOwnProperty("Condition1")){
            return contract;
          }
          else{
            for(var key in contract){
              if(contract[key].hasOwnProperty("condition")){
                for(var responseValue in contract[key]["condition"]){
                  if(contract[key]["condition"][responseValue] == scope.getResponseValue(responseValue, index)){
                    var ActionJSON = {};
                    ActionJSON.text = contract[key]["text"];
                    ActionJSON.action = contract[key]["action"];
                    ActionJSON.entitlement = contract[key]["entitlement"];
                    return ActionJSON;
                  }
                }
              }
            }
          }
        }
        catch(err)
        {
          return "";
        }
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
        try{
          var index = context.rowIndex;
          var scope = this;
          var propertyValue = scope.getActionJSON(property, responseData, index);
          var action = propertyValue["action"];
          if(action.level === "Form"){
            this._parentScope[action.method](responseData[index]);
          }
          else{
            if(action.method === "DEACTIVATE_EBILL"){
              this.deactivateEbill(responseData,index);
            }
            else if(action.method === "ACTIVATE_EBILL"){
              this.showActivateEbillPopup(responseData,index);
            }
            else{
              this.showDeletePopup(responseData,index);
            }
          }
        }
        catch(err)
        {
          var errObj = {
            "errorInfo" : "Error in btnActionOnClick method of the component.",
            "error": err
          };
          this.onError(errObj);
        }
      },

      /**
      * showActivateEbillPopup.
      * responsible for showing the popup for Activate Ebill confirmation.
      * data {Object} - object contains segment data.
      * index {Integer} - object contains seleted segment row index. 
      */
      showActivateEbillPopup: function(data,index){
        try{
          var scope = this;
          eBillIndex = index;
          this.view.lblHeaderIC.text = this.getBreakPointTypeBasedValue(this._ebillPopupTitle);
          this.view.imgWarningIC.src = this.getImageOrIcon(this._activateEbillPopupImage);
          if(!(this.isEmptyNullUndefined(this._popupField1))){
            this.view.flxField1.isVisible = true;
            this.view.lblField1.text = this.getBreakPointTypeBasedValue(this._popupField1);
            this.view.lblField1Value.text = this.getFormattedData(this.getResponseValue(this._popupField1Value, index),
                                                                  this._popupField1Type);
          }
          else{
            this.view.flxField1.isVisible = false;
          }
          if(!(this.isEmptyNullUndefined(this._popupField2))){
            this.view.flxField2.isVisible = true;
            this.view.lblField2.text = this.getBreakPointTypeBasedValue(this._popupField2);
            this.view.lblField2Value.text = this.getFormattedData(this.getResponseValue(this._popupField2Value, index),
                                                                  this._popupField2Type);
          }
          else{
            this.view.flxField2.isVisible = false;
          }
          if(!(this.isEmptyNullUndefined(this._popupField3))){
            this.view.flxField3.isVisible = true;
            this.view.lblField3.text = this.getBreakPointTypeBasedValue(this._popupField3);
            this.view.lblField3Value.text = this.getFormattedData(this.getResponseValue(this._popupField3Value, index),
                                                                  this._popupField3Type);
          }
          else{
            this.view.flxField3.isVisible = false;
          }
          if(!(this.isEmptyNullUndefined(this._additionalText1))){
            this.view.lblWarningOneIC.isVisible = true;
            this.view.lblWarningOneIC.text = this.getBreakPointTypeBasedValue(this._additionalText1);
          }
          else{
            this.view.lblWarningOneIC.isVisible = false;
          }
          if(!(this.isEmptyNullUndefined(this._additionalText2))){
            this.view.lblWarningTwoIC.isVisible = true;
            this.view.lblWarningTwoIC.text = this.getBreakPointTypeBasedValue(this._additionalText2);
          }
          else{
            this.view.lblWarningTwoIC.isVisible = false;
          }
          if(!(this.isEmptyNullUndefined(this._additionalText3))){
            this.view.lblWarningThreeIC.isVisible = true;
            this.view.lblWarningThreeIC.text = this.getBreakPointTypeBasedValue(this._additionalText3);
          }
          else{
            this.view.lblWarningThreeIC.isVisible = false;
          }
          var form = kony.application.getCurrentForm();
          var popupObjNew = this.view.flxBillerDialogs.clone();
          popupObjNew.height = "100%";
          popupObjNew.isVisible=true;
          popupObjNew.isModalContainer=true;
          popupObjNew.flxActivateBillerIC.isVisible=true;
          popupObjNew.flxDeletePopupIC.isVisible=false;
          var popupObj = popupObjNew.flxActivateBillerIC;
          form.add(popupObjNew);
          popupObj.flxActivateBillerContainerIC.doLayout = CommonUtilities.centerPopupFlex;
          popupObj.flxActivateBillerContainerIC.onKeyPress = this.activateEbillOnKeyPressCallBack;
          popupObj.isVisible = true;
          popupObj.top = "0dp";
          popupObj.left = "0dp";
          popupObj.height = "100%";
          popupObj.flxActivateBillerContainerIC.flxActivateHeaderIC.flxCrossIC.onClick = function() {
            popupObjNew.isModalContainer = false;
            form.remove(popupObjNew);
            scope.eBillFocusSetBack();
          }
          popupObj.flxActivateBillerContainerIC.flxButtonsIC.btnCancelIC.onClick = function() {
            popupObjNew.isModalContainer = false;
            form.remove(popupObjNew);
            scope.eBillFocusSetBack();
          }
          popupObj.flxActivateBillerContainerIC.flxButtonsIC.btnProceedIC.onClick = function() {
            popupObjNew.isModalContainer = false;
            scope.activateEbill(data,index);
            form.remove(popupObjNew);
          }
          this.view.forceLayout();
          popupObj.flxActivateBillerContainerIC.accessibilityConfig={
            //"a11yLabel":"Activate Ebill",
            "a11yARIA":{
                "role":"dialog",
                "tabindex":-1
            }
        }
        popupObj.flxActivateBillerContainerIC.flxActivateHeaderIC.flxCrossIC.accessibilityConfig={
            "a11yLabel":"Close this Popup",
            "a11yARIA":{
                "role":"button",
                "tabindex":0
            }
        }
        popupObj.flxActivateBillerContainerIC.flxActivateHeaderIC.lblHeaderIC.setActive(true);
        }
        catch(err)
        {
          var errObj = {
            "errorInfo" : "Error in showActivateEbillPopup method of the component.",
            "error": err
          };
          this.onError(errObj);
        }
      },
      activateEbillOnKeyPressCallBack: function (eventobject, eventPayload) {
        if (eventPayload.keyCode === 27) {
          var form = kony.application.getCurrentForm();
          if (form.id === "frmManagePayees"){
            form.flxBillerDialogs.isModalContainer = false;
            form.remove(form.flxBillerDialogs);
          }
          this.eBillFocusSetBack();
      }
      },
      eBillFocusSetBack : function(){
        if(kony.application.getCurrentBreakpoint()<=640){
          if (this.view.segmentBillPay.data[eBillIndex].template === "flxBillPayManagePayeesMobileIC") {
            this.view.segmentBillPay.setActive(eBillIndex, -1, "flxBillPayManagePayeesMobileIC.flxMainGroup.flxGroup.flxBillPayAllPayeesWrapper.flxWrapper.flxActions.btnActions");
          }
          else {
            this.view.segmentBillPay.setActive(eBillIndex, -1, "flxBillPayManagePayeesSelectedMobileIC.flxMainGroup.flxGroup.flxContent.flxBillPayManagePayees.flxBillPayAllPayeesWrapper.flxWrapper.flxActions.btnActions");
          }
        }
        else{
          if (this.view.segmentBillPay.data[eBillIndex].template === "flxBillPayManagePayeesIC") {
            this.view.segmentBillPay.setActive(eBillIndex,-1,"flxBillPayManagePayeesIC.flxMainGroup.flxGroup.flxBillPayAllPayeesWrapper.flxWrapper.flxColumnAction.btnAction");
          }
          else{
            this.view.segmentBillPay.setActive(eBillIndex,-1,"flxBillPayManagePayeesSelectedIC.flxMainGroup.flxGroup.flxContent.flxBillPayManagePayees.flxBillPayAllPayeesWrapper.flxWrapper.flxColumnAction.btnAction");
          }
        }
      },
      /**
      * showDeletePopup.
      * responsible for showing the popup for delete confirmation.
      * data {Object} - object contains segment data.
      * index {Integer} - object contains seleted segment row index. 
      */
      showDeletePopup: function(data,index){
        try{
        var scope = this;
        deleteIndex = index;
        var form = kony.application.getCurrentForm();
        var popupObjNew = this.view.flxBillerDialogs.clone();
        popupObjNew.height = "100%";
        popupObjNew.isVisible=true;
        popupObjNew.isModalContainer=true;
        popupObjNew.flxActivateBillerIC.isVisible=false;
        popupObjNew.flxDeletePopupIC.isVisible=true;
        var popupObj = popupObjNew.flxDeletePopupIC;
        form.add(popupObjNew);
        popupObj.CustomPopupIC.onKeyPress = scope.deleteOnkeyPress;
        popupObj.CustomPopupIC.doLayout = CommonUtilities.centerPopupFlex;
        popupObj.CustomPopupIC.accessibilityConfig={
          //"a11yLabel":"Delete",
          "a11yARIA":{
            "role":"dialog",
            "tabindex":-1
          }
        }
        popupObj.isVisible = true;
        popupObj.top = "0dp";
        popupObj.left = "0dp";
        popupObj.height = "100%";
        popupObj.CustomPopupIC.flxCross2IC.onClick = function() {
          popupObjNew.isModalContainer=false;
          form.remove(popupObjNew);
          scope.deleteFocusSetBack();
        }
        popupObj.CustomPopupIC.btnNoIC.onClick = function() {
          popupObjNew.isModalContainer=false;
          form.remove(popupObjNew);
          scope.deleteFocusSetBack();
        }
        popupObj.CustomPopupIC.btnYesIC.onClick = function() {
          popupObjNew.isModalContainer=false;
          scope.deletePayee(data,index);
          form.remove(popupObjNew);
          scope.deleteFocusSetBack();
        }
        this.view.forceLayout();
        popupObj.CustomPopupIC.flxHeaderIC.lblHeadingIC.setActive(true);
        }
        catch(err)
        {
          var errObj = {
            "errorInfo" : "Error in showActivateEbillPopup method of the component.",
            "error": err
          };
          this.onError(errObj);
        }
      },
      deleteOnkeyPress : function(eventObject, eventPayload){
        if(eventPayload.keyCode===27){
          var form = kony.application.getCurrentForm();
          form.flxBillerDialogs.isModalContainer=false;
          form.remove(form.flxBillerDialogs);
          this.deleteFocusSetBack();
        }
      },
      deleteFocusSetBack : function(){
        if (kony.application.getCurrentBreakpoint() <= 640) {
          this.view.segmentBillPay.setActive(deleteIndex, -1, "flxBillPayManagePayeesSelectedMobileIC.flxMainGroup.flxGroup.flxContent.flxDetails.flxAction.btn4");
        }
        else {
          this.view.segmentBillPay.setActive(deleteIndex, -1, "flxBillPayManagePayeesSelectedIC.flxMainGroup.flxGroup.flxContent.flxDetails.flxDetailsWrapper.flxActions.btn4");
        }
      },
      
      /**
      * deletePayee.
      * responsible for deleting payee by making call to DAO layer.
      * data {Object} - object contains segment data.
      * index {Integer} - object contains seleted segment row index. 
      */
      deletePayee: function(data,index){
        try{
          var scope = this;
          var payload={};
          var criteria = JSON.parse(this._payeeDELETECriteria);
          for(var key in criteria){
            payload[key] = data[index][key];
          }
          scope.ManageBillerDAO.deletePayee(this._payeeObjectService, 
                                            this._payeeDELETEOperation, this._payeeObject, payload, scope.deletePayeeCallBack, scope.onError);
        }
        catch(err)
        {
          var errObj = {
            "errorInfo" : "Error in deletePayee method of the component.",
            "error": err
          };
          this.onError(errObj);
        }
      },

      /**
      * activatePayee.
      * responsible for Activating payee by making call to DAO layer.
      * data {Object} - object contains segment data.
      * index {Integer} - object contains seleted segment row index. 
      */
      activateEbill: function(data,index){
        try{
          var scope = this;
          var payload={};
          var criteria = JSON.parse(this._activateEbillCriteria);
          for(var key in criteria){
            if(data[index][key] === undefined){
              payload[key] = criteria[key];
            }
            else{
              payload[key] = data[index][key];
            }
          }
          payBillFlag = true;
          scope.ManageBillerDAO.activateAndDeactivatePayee(this._payeeEbillObjectService, 
                                                           this._activateEbillOperation, this._payeeEbillObject, payload, scope.deletePayeeCallBack, scope.onError);
        }
        catch(err)
        {
          var errObj = {
            "errorInfo" : "Error in activateEbill method of the component.",
            "error": err
          };
          this.onError(errObj);
        }
      },

      /**
      * deactivateEbill.
      * responsible for deactivating payee by making call to DAO layer.
      * data {Object} - object contains segment data.
      * index {Integer} - object contains seleted segment row index. 
      */
      deactivateEbill: function(data,index){
        try{
          var scope = this;
          var payload={};
          var criteria = JSON.parse(this._deactivateEbillCriteria);
          for(var key in criteria){
            if(data[index][key] === undefined){
              payload[key] = criteria[key];
            }
            else{
              payload[key] = data[index][key];
            }
          }
          deActivateIndex = index;
          scope.ManageBillerDAO.activateAndDeactivatePayee(this._payeeEbillObjectService, 
                                                           this._deactivateEbillOperation, this._payeeEbillObject, payload, scope.deletePayeeCallBack, scope.onError);
                                                           deActivateEbillFlag=true;
        }
        catch(err)
        {
          var errObj = {
            "errorInfo" : "Error in deactivateEbill method of the component.",
            "error": err
          };
          this.onError(errObj);
        }
      },
      
      /**
      * deletePayeeCallBack.
      * CallBack function for deletePayee service call, responsible for fetching the updated payee list.
      * response {Object} - object contains the service response.
      */
      deletePayeeCallBack: function(response){
        this.onManagePayeeClick();
      },
    };
});