define(['./manageBillerDAO','./ParserUtilsManager','./FormatUtils','./EntitlementUtils','./CacheUtils'], function(manageBillerDAO,ParserUtilsManager,FormatUtils,EntitlementUtils,CacheUtils) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.ManageBillerDAO = new manageBillerDAO();
      this.ParserUtilsManager = new ParserUtilsManager();
      this.FormatUtils = new FormatUtils();
      this.EntitlementUtils = new EntitlementUtils();
      this._context = "";
      this.formattingJSON = {};
      this._searchResult = false;
      this._deletePayeeData = {};
      this._deletePayee = false;
      this.rowIndexForSwipe = -1;
      this.previousSection = -1;
	  this.sortedResData;
      this.swipeObj = {};
      this.cacheUtils = "";
      //Variables for client side cached list
      this.globalState = "";
      this.pageCount = 1;
      this.globalOffset = "";
      this.noMoreRecordsInCache = false;
      
      //declaration for Inplace search/sort in the group:General
      this._inPlaceHandling="";
      
      //declaration for Search Field List in the group:Search
      this._searchFieldList="";


      //declaration for Payee icons Visibility in the group:General
      this._payeeIconVisibility="";

      //declaration for Payee Object Service  in the group:Payee Management Services
      this._payeeObjectService="";

      //declaration for Date Format in the group:Date
      this._dateFormat="";

      //declaration for Amount Format in the group:Amount
      this._amountFormat="";

      //declaration for Response Path in the group:Data Grid 
      this._responsePath="";

      //declaration for Placeholder in the group:Search
      this._placeHolderSearch="";

      //declaration for Row skin in the group:Skins
      this._sknRow="";

      //declaration for Ebill Visibility in the group:General
      this._ebillVisibility="";

      //declaration for Payee Object in the group:Payee Management Services
      this._payeeObject="";

      //declaration for Backend Date Format in the group:Date
      this._backendDateFormat="";

      //declaration for Field 1 in the group:Data Grid 
      this._field1="";

      //declaration for Search icon in the group:Search
      this._iconSearch="";

      //declaration for Row hover skin in the group:Skins
      this._sknRowHover="";

      //declaration for Payee GET Operation in the group:Payee Management Services
      this._payeeGETOperation="";

      //declaration for Field 2 in the group:Data Grid 
      this._field2="";

      //declaration for Empty Payee List Display Label in the group:General
      this._emptyPayeesDisplayLabel="";

      //declaration for Row seperator skin in the group:Skins
      this._sknRowSeperator="";

      //declaration for Payee GET Criteria  in the group:Payee Management Services
      this._payeeGETCriteria="";

      //declaration for Field eBill in the group:Data Grid 
      this._fieldEbill="";

      //declaration for Field 1 Skin in the group:Skins
      this._sknField1="";

      //declaration for Payee GET Service Identifier  in the group:Payee Management Services
      this._payeeGETIdentifier="";

      //declaration for Swipe Box 1 in the group:Data Grid 
      this._swipeBox1="";

      //declaration for Field 2 Skin in the group:Skins
      this._sknField2="";

      //declaration for Payee Search Object Service  in the group:Payee Management Services
      this._payeeSearchObjectService="";

      //declaration for Swipe Box 2 in the group:Data Grid 
      this._swipeBox2="";

      //declaration for Action Buttons skin in the group:Skins
      this._sknActionButtons="";

      //declaration for Payee Search Object in the group:Payee Management Services
      this._payeeSearchObject="";

      //declaration for Swipe Box 3 in the group:Data Grid 
      this._swipeBox3="";

      //declaration for Payee SEARCH Operation in the group:Payee Management Services
      this._payeeSEARCHOperation="";

      //declaration for Search TextBox Skin in the group:Skins
      this._sknSearchTextBox="";

      //declaration for Action Button in the group:Data Grid 
      this._actionButton="";

      //declaration for Payee SEARCH Criteria  in the group:Payee Management Services
      this._payeeSEARCHCriteria="";

      //declaration for Search TextBox Placeholder Skin in the group:Skins
      this._sknSearchPlaceHolderTextBox="";

      //declaration for Response Path For Search in the group:Data Grid 
      this._responsePathSearch="";

      //declaration for Payee SEARCH Service Identifier  in the group:Payee Management Services
      this._payeeSEARCHIdentifier="";

      //declaration for Search TextBox Focus Skin in the group:Skins
      this._sknSearchTextBoxFocus="";

      //declaration for Row onClick Action in the group:Data Grid 
      this._rowonClickaction="";

      //declaration for Ebill Enabled Skin in the group:Skins
      this._sknEbillEnabledSkin="";

      //declaration for Ebill Disabled Skin in the group:Skins
      this._sknEbillDisabledSkin="";

      //declaration for SwipeBox1 Skin in the group:Skins
      this._sknSwipeBox1="";

      //declaration for SwipeBox2 Skin in the group:Skins
      this._sknSwipeBox2="";

      //declaration for SwipeBox3 Skin in the group:Skins
      this._sknSwipeBox3="";

      //declaration for Swipe Box Label Skin in the group:Skins
      this._sknSwipeBoxText="";

      //declaration for Payee DELETE Service Identifier in the group:Payee Management Services
      this._payeeDELETEIdentifier="";

      //declaration for Payee DELETE Criteria  in the group:Payee Management Services
      this._payeeDELETECriteria="";
      
      //declaration for Payee DELETE Operation in the group:Payee Management Services
      this._payeeDELETEOperation="";
      
      //declaration for Page Size in the group:General
      this._pageSize="";

    },
    
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      
      //setter method for Page Size in the group:General
      defineSetter(this, "pageSize", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._pageSize=val;
        }
      });

      //getter method for Payee DELETE Operation in the group:Payee Management Services
      defineGetter(this, "pageSize", function() {
        return this._pageSize;
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
      
      //setter method for Payee icons Visibility in the group:General
      defineSetter(this, "payeeIconVisibility", function(val) {
        if((typeof val=='boolean') && (val != "")){
          this._payeeIconVisibility=val;
        }
      });

      //getter method for Payee icons Visibility in the group:General
      defineGetter(this, "payeeIconVisibility", function() {
        return this._payeeIconVisibility;
      });

      //setter method for Payee Object Service  in the group:Payee Management Services
      defineSetter(this, "payeeObjectService", function(val) {
        if((typeof val=='string') && (val != "")){
          this._payeeObjectService=val;
        }
      });

      //getter method for Payee Object Service  in the group:Payee Management Services
      defineGetter(this, "payeeObjectService", function() {
        return this._payeeObjectService;
      });

      //setter method for Date Format in the group:Date
      defineSetter(this, "dateFormat", function(val) {
        if((typeof val=='string') && (val != "")){
          this._dateFormat=val;
        }
      });

      //getter method for Date Format in the group:Date
      defineGetter(this, "dateFormat", function() {
        return this._dateFormat;
      });

      //setter method for Amount Format in the group:Amount
      defineSetter(this, "amountFormat", function(val) {
        if((typeof val=='string') && (val != "")){
          this._amountFormat=val;
        }
      });

      //getter method for Amount Format in the group:Amount
      defineGetter(this, "amountFormat", function() {
        return this._amountFormat;
      });

      //setter method for Response Path in the group:Data Grid 
      defineSetter(this, "responsePath", function(val) {
        if((typeof val=='string') && (val != "")){
          this._responsePath=val;
        }
      });

      //getter method for Response Path in the group:Data Grid 
      defineGetter(this, "responsePath", function() {
        return this._responsePath;
      });

      //setter method for Placeholder in the group:Search
      defineSetter(this, "placeHolderSearch", function(val) {
        if((typeof val=='string') && (val != "")){
          this._placeHolderSearch=val;
        }
      });

      //getter method for Placeholder in the group:Search
      defineGetter(this, "placeHolderSearch", function() {
        return this._placeHolderSearch;
      });

      //setter method for Row skin in the group:Skins
      defineSetter(this, "sknRow", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknRow=val;
        }
      });

      //getter method for Row skin in the group:Skins
      defineGetter(this, "sknRow", function() {
        return this._sknRow;
      });

      //setter method for Ebill Visibility in the group:General
      defineSetter(this, "ebillVisibility", function(val) {
        if((typeof val=='boolean') && (val != "")){
          this._ebillVisibility=val;
        }
      });

      //getter method for Ebill Visibility in the group:General
      defineGetter(this, "ebillVisibility", function() {
        return this._ebillVisibility;
      });

      //setter method for Payee Object in the group:Payee Management Services
      defineSetter(this, "payeeObject", function(val) {
        if((typeof val=='string') && (val != "")){
          this._payeeObject=val;
        }
      });

      //getter method for Payee Object in the group:Payee Management Services
      defineGetter(this, "payeeObject", function() {
        return this._payeeObject;
      });

      //setter method for Backend Date Format in the group:Date
      defineSetter(this, "backendDateFormat", function(val) {
        if((typeof val=='string') && (val != "")){
          this._backendDateFormat=val;
        }
      });

      //getter method for Backend Date Format in the group:Date
      defineGetter(this, "backendDateFormat", function() {
        return this._backendDateFormat;
      });

      //setter method for Field 1 in the group:Data Grid 
      defineSetter(this, "field1", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field1=val;
        }
      });

      //getter method for Field 1 in the group:Data Grid 
      defineGetter(this, "field1", function() {
        return this._field1;
      });

      //setter method for Search icon in the group:Search
      defineSetter(this, "iconSearch", function(val) {
        if((typeof val=='string') && (val != "")){
          this._iconSearch=val;
        }
      });

      //getter method for Search icon in the group:Search
      defineGetter(this, "iconSearch", function() {
        return this._iconSearch;
      });

      //setter method for Row hover skin in the group:Skins
      defineSetter(this, "sknRowHover", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknRowHover=val;
        }
      });

      //getter method for Row hover skin in the group:Skins
      defineGetter(this, "sknRowHover", function() {
        return this._sknRowHover;
      });

      //setter method for Payee GET Operation in the group:Payee Management Services
      defineSetter(this, "payeeGETOperation", function(val) {
        if((typeof val=='string') && (val != "")){
          this._payeeGETOperation=val;
        }
      });

      //getter method for Payee GET Operation in the group:Payee Management Services
      defineGetter(this, "payeeGETOperation", function() {
        return this._payeeGETOperation;
      });

      //setter method for Field 2 in the group:Data Grid 
      defineSetter(this, "field2", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field2=val;
        }
      });

      //getter method for Field 2 in the group:Data Grid 
      defineGetter(this, "field2", function() {
        return this._field2;
      });

      //setter method for Empty Payee List Display Label in the group:General
      defineSetter(this, "emptyPayeesDisplayLabel", function(val) {
        if((typeof val=='string') && (val != "")){
          this._emptyPayeesDisplayLabel=val;
        }
      });

      //getter method for Empty Payee List Display Label in the group:General
      defineGetter(this, "emptyPayeesDisplayLabel", function() {
        return this._emptyPayeesDisplayLabel;
      });

      //setter method for Row seperator skin in the group:Skins
      defineSetter(this, "sknRowSeperator", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknRowSeperator=val;
        }
      });

      //getter method for Row seperator skin in the group:Skins
      defineGetter(this, "sknRowSeperator", function() {
        return this._sknRowSeperator;
      });

      //setter method for Payee GET Criteria  in the group:Payee Management Services
      defineSetter(this, "payeeGETCriteria", function(val) {
        if((typeof val=='string') && (val != "")){
          this._payeeGETCriteria=val;
        }
      });

      //getter method for Payee GET Criteria  in the group:Payee Management Services
      defineGetter(this, "payeeGETCriteria", function() {
        return this._payeeGETCriteria;
      });

      //setter method for Field eBill in the group:Data Grid 
      defineSetter(this, "fieldEbill", function(val) {
        if((typeof val=='string') && (val != "")){
          this._fieldEbill=val;
        }
      });

      //getter method for Field eBill in the group:Data Grid 
      defineGetter(this, "fieldEbill", function() {
        return this._fieldEbill;
      });

      //setter method for Field 1 Skin in the group:Skins
      defineSetter(this, "sknField1", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknField1=val;
        }
      });

      //getter method for Field 1 Skin in the group:Skins
      defineGetter(this, "sknField1", function() {
        return this._sknField1;
      });

      //setter method for Payee GET Service Identifier  in the group:Payee Management Services
      defineSetter(this, "payeeGETIdentifier", function(val) {
        if((typeof val=='string') && (val != "")){
          this._payeeGETIdentifier=val;
        }
      });

      //getter method for Payee GET Service Identifier  in the group:Payee Management Services
      defineGetter(this, "payeeGETIdentifier", function() {
        return this._payeeGETIdentifier;
      });

      //setter method for Swipe Box 1 in the group:Data Grid 
      defineSetter(this, "swipeBox1", function(val) {
        if((typeof val=='string') && (val != "")){
          this._swipeBox1=val;
        }
      });

      //getter method for Swipe Box 1 in the group:Data Grid 
      defineGetter(this, "swipeBox1", function() {
        return this._swipeBox1;
      });

      //setter method for Field 2 Skin in the group:Skins
      defineSetter(this, "sknField2", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknField2=val;
        }
      });

      //getter method for Field 2 Skin in the group:Skins
      defineGetter(this, "sknField2", function() {
        return this._sknField2;
      });

      //setter method for Payee Search Object Service  in the group:Payee Management Services
      defineSetter(this, "payeeSearchObjectService", function(val) {
        if((typeof val=='string') && (val != "")){
          this._payeeSearchObjectService=val;
        }
      });

      //getter method for Payee Search Object Service  in the group:Payee Management Services
      defineGetter(this, "payeeSearchObjectService", function() {
        return this._payeeSearchObjectService;
      });

      //setter method for Swipe Box 2 in the group:Data Grid 
      defineSetter(this, "swipeBox2", function(val) {
        if((typeof val=='string') && (val != "")){
          this._swipeBox2=val;
        }
      });

      //getter method for Swipe Box 2 in the group:Data Grid 
      defineGetter(this, "swipeBox2", function() {
        return this._swipeBox2;
      });

      //setter method for Action Buttons skin in the group:Skins
      defineSetter(this, "sknActionButtons", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknActionButtons=val;
        }
      });

      //getter method for Action Buttons skin in the group:Skins
      defineGetter(this, "sknActionButtons", function() {
        return this._sknActionButtons;
      });

      //setter method for Payee Search Object in the group:Payee Management Services
      defineSetter(this, "payeeSearchObject", function(val) {
        if((typeof val=='string') && (val != "")){
          this._payeeSearchObject=val;
        }
      });

      //getter method for Payee Search Object in the group:Payee Management Services
      defineGetter(this, "payeeSearchObject", function() {
        return this._payeeSearchObject;
      });

      //setter method for Swipe Box 3 in the group:Data Grid 
      defineSetter(this, "swipeBox3", function(val) {
        if((typeof val=='string') && (val != "")){
          this._swipeBox3=val;
        }
      });

      //getter method for Swipe Box 3 in the group:Data Grid 
      defineGetter(this, "swipeBox3", function() {
        return this._swipeBox3;
      });

      //setter method for Payee SEARCH Operation in the group:Payee Management Services
      defineSetter(this, "payeeSEARCHOperation", function(val) {
        if((typeof val=='string') && (val != "")){
          this._payeeSEARCHOperation=val;
        }
      });

      //getter method for Payee SEARCH Operation in the group:Payee Management Services
      defineGetter(this, "payeeSEARCHOperation", function() {
        return this._payeeSEARCHOperation;
      });

      //setter method for Search TextBox Skin in the group:Skins
      defineSetter(this, "sknSearchTextBox", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknSearchTextBox=val;
        }
      });

      //getter method for Search TextBox Skin in the group:Skins
      defineGetter(this, "sknSearchTextBox", function() {
        return this._sknSearchTextBox;
      });

      //setter method for Action Button in the group:Data Grid 
      defineSetter(this, "actionButton", function(val) {
        if((typeof val=='string') && (val != "")){
          this._actionButton=val;
        }
      });

      //getter method for Action Button in the group:Data Grid 
      defineGetter(this, "actionButton", function() {
        return this._actionButton;
      });

      //setter method for Payee SEARCH Criteria  in the group:Payee Management Services
      defineSetter(this, "payeeSEARCHCriteria", function(val) {
        if((typeof val=='string') && (val != "")){
          this._payeeSEARCHCriteria=val;
        }
      });

      //getter method for Payee SEARCH Criteria  in the group:Payee Management Services
      defineGetter(this, "payeeSEARCHCriteria", function() {
        return this._payeeSEARCHCriteria;
      });

      //setter method for Search TextBox Placeholder Skin in the group:Skins
      defineSetter(this, "sknSearchPlaceHolderTextBox", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknSearchPlaceHolderTextBox=val;
        }
      });

      //getter method for Search TextBox Placeholder Skin in the group:Skins
      defineGetter(this, "sknSearchPlaceHolderTextBox", function() {
        return this._sknSearchPlaceHolderTextBox;
      });

      //setter method for Response Path For Search in the group:Data Grid 
      defineSetter(this, "responsePathSearch", function(val) {
        if((typeof val=='string') && (val != "")){
          this._responsePathSearch=val;
        }
      });

      //getter method for Response Path For Search in the group:Data Grid 
      defineGetter(this, "responsePathSearch", function() {
        return this._responsePathSearch;
      });

      //setter method for Payee SEARCH Service Identifier  in the group:Payee Management Services
      defineSetter(this, "payeeSEARCHIdentifier", function(val) {
        if((typeof val=='string') && (val != "")){
          this._payeeSEARCHIdentifier=val;
        }
      });

      //getter method for Payee SEARCH Service Identifier  in the group:Payee Management Services
      defineGetter(this, "payeeSEARCHIdentifier", function() {
        return this._payeeSEARCHIdentifier;
      });

      //setter method for Search TextBox Focus Skin in the group:Skins
      defineSetter(this, "sknSearchTextBoxFocus", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknSearchTextBoxFocus=val;
        }
      });

      //getter method for Search TextBox Focus Skin in the group:Skins
      defineGetter(this, "sknSearchTextBoxFocus", function() {
        return this._sknSearchTextBoxFocus;
      });

      //setter method for Row onClick Action in the group:Data Grid 
      defineSetter(this, "rowonClickaction", function(val) {
        if((typeof val=='string') && (val != "")){
          this._rowonClickaction=val;
        }
      });

      //getter method for Row onClick Action in the group:Data Grid 
      defineGetter(this, "rowonClickaction", function() {
        return this._rowonClickaction;
      });

      //setter method for Ebill Enabled Skin in the group:Skins
      defineSetter(this, "sknEbillEnabledSkin", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknEbillEnabledSkin=val;
        }
      });

      //getter method for Ebill Enabled Skin in the group:Skins
      defineGetter(this, "sknEbillEnabledSkin", function() {
        return this._sknEbillEnabledSkin;
      });

      //setter method for Ebill Disabled Skin in the group:Skins
      defineSetter(this, "sknEbillDisabledSkin", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknEbillDisabledSkin=val;
        }
      });

      //getter method for Ebill Disabled Skin in the group:Skins
      defineGetter(this, "sknEbillDisabledSkin", function() {
        return this._sknEbillDisabledSkin;
      });

      //setter method for SwipeBox1 Skin in the group:Skins
      defineSetter(this, "sknSwipeBox1", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknSwipeBox1=val;
        }
      });

      //getter method for SwipeBox1 Skin in the group:Skins
      defineGetter(this, "sknSwipeBox1", function() {
        return this._sknSwipeBox1;
      });

      //setter method for SwipeBox2 Skin in the group:Skins
      defineSetter(this, "sknSwipeBox2", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknSwipeBox2=val;
        }
      });

      //getter method for SwipeBox2 Skin in the group:Skins
      defineGetter(this, "sknSwipeBox2", function() {
        return this._sknSwipeBox2;
      });

      //setter method for SwipeBox3 Skin in the group:Skins
      defineSetter(this, "sknSwipeBox3", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknSwipeBox3=val;
        }
      });

      //getter method for SwipeBox3 Skin in the group:Skins
      defineGetter(this, "sknSwipeBox3", function() {
        return this._sknSwipeBox3;
      });

      //setter method for Swipe Box Label Skin in the group:Skins
      defineSetter(this, "sknSwipeBoxText", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknSwipeBoxText=val;
        }
      });

      //getter method for Swipe Box Label Skin in the group:Skins
      defineGetter(this, "sknSwipeBoxText", function() {
        return this._sknSwipeBoxText;
      });

    },	
    
    /**
     * Component preShow.
     * Initialising set format value JSON.
     * Resetting images and values.
     */
    preShow: function(){
      try{
        if(this._context.isDeactivateBill === true){
          this._context.isDeactivateBill = false;
          this.showDeactivateBillSuccessPopup();
        }
        else if(!this._deletePayee){
          this.setFormattingValueJSON();
          this.noRecipients(false);
          this.clearSearchText();
          this.setEntitlements();
          this.fetchPayeeData();
          this.setStaticData();
          this.view.tbxSearch.onTextChange=this.tbxSearchOnTextChange;
        }
        else{
          this.deleteFromDetailsForm(this._deletePayeeData, true);
        }
        this.pageCount = 1;
        this.globalState = "";
        this.globalOffset = 0;
        this.noMoreRecordsInCache = false;
        var defaultParams = {};
        defaultParams.sortBy = JSON.parse(this._payeeGETCriteria)["sortBy"];
        defaultParams.onUpdate = this.updateCallBack;
//         defaultParams.filterParam = "payeeId";
        defaultParams.filterValue = "All";
        defaultParams.pageSize = Number(this._pageSize);
        defaultParams.offset = 0;
        defaultParams.order = JSON.parse(this._payeeGETCriteria)["order"];
        this.cacheUtils = new CacheUtils(defaultParams);
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
    
    /**
     * Component updateCallBack.
     * Callback function for CacheUtils
     */
    updateCallBack : function(serviceResponse, additionalParams){
      if (additionalParams.state === "pagination") {
        if(!serviceResponse || serviceResponse.length < 1){
          this.noMoreRecordsInCache = true;
          return;
        }else{
          this.setPayeeListData(serviceResponse, additionalParams);
        }
      }
      else {
        this.setPayeeListData(serviceResponse, additionalParams);
      }
    },

    /**
     * Component onScrollEnd.
     * Function is invoked when we reach to the end of the segment
     */
    onScrollEnd: function() {
      if(this._inPlaceHandling === true && !this.noMoreRecordsInCache){
        var self = this;
        if (self.globalState === "search")
          return;
        self.pageCount++;
        self.globalOffset = self.globalOffset + Number(self._pageSize);
        self.cacheUtils.applyPagination(self.globalOffset, (Number(this._pageSize))*this.pageCount);
      }
    },
    
    tbxSearchOnTextChange: function(){
      var scope = this;
      var searchString = scope.view.tbxSearch.text
      if(this.isEmptyNullUndefined(searchString)){
        scope.fetchPayeeData();
      }
      else{
        scope.onSearch();
      }
    },
    
    /*
      * onSearch.
      * This method is used to call the search service with the given string. 
      * Service Callback - fetchPayeeDataCallBack.
      */
    onSearch: function(){
      try{
        var scope = this;
        var searchString = scope.view.tbxSearch.text;
        var criteria = JSON.parse(this._payeeSEARCHCriteria);
        criteria.searchString = searchString;
        var searchFieldArray = this._searchFieldList.split(",");
        this._searchResult = true;
        if(this._inPlaceHandling === true){
//           scope.ManageBillerDAO.searchPayeesData(this._searchFieldList, searchString, scope.fetchPayeeDataCallBack);
          this.cacheUtils.applySearch(searchFieldArray, searchString);
        }else{
          scope.ManageBillerDAO.fetchPayeeList(this._payeeSearchObjectService,
                                               this._payeeSEARCHOperation, this._payeeSearchObject,
                                               criteria, scope.fetchPayeeDataCallBack, scope.onError);
        }
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
      * onSearchClear.
      * This method is responsible to clear the search results from the segment.
      */
    onSearchClear: function() {
      this.clearSearchText();
      var searchFieldArray = this._searchFieldList.split(",");
      this.cacheUtils.applySearch(searchFieldArray,"");
    },
    
    /**
     * Component setContext
     * To collect the context object required for the component 
     * context{JSONobject} - context params 
     */
    setContext: function(context){
      this._context=context;
      if(this._context.entryState && this._context.entryState.deletePayee){
        this._deletePayee = true;
        this._deletePayeeData = this._context.entryState.deletePayee;
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
      * setEntitlements.
      * Responsible to set the entitlements.
      */
    setEntitlements: function(){
      this.EntitlementUtils.setEntitlements(this._context);
    },
      
    /**
      * setStaticDataForAccounts.
      * Responsible to set the Table Column Header text on the click of Accounts Tab.
      */
    setStaticData: function(){
      try{
        var scope = this;
        if(this._actionButton){
          var propertyValue = this.getActionJSON(this._actionButton);
          if(this.isEntitled(propertyValue.entitlement)){
            var action = propertyValue["action"];
            this.view.btnAllPayees.text = this.ParserUtilsManager.geti18nText(propertyValue.text);
            this.view.btnAllPayees.onClick = function() {
              scope._parentScope[action.method]();
            }
          }
          else{
            this.view.btnAllPayees.isVisible = false;
          }
        }
        else{
          this.view.btnAllPayees.text = "";
          this.view.btnAllPayees.isVisible = false;
        }
        if(this._placeHolderSearch){
          this.view.tbxSearch.placeholder = this.ParserUtilsManager.geti18nText(this._placeHolderSearch);
        }
        
        if(this._emptyPayeesDisplayLabel){
          this.view.lblNoTransaction.text = this.ParserUtilsManager.geti18nText(this._emptyPayeesDisplayLabel);
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
      * clearSearchText
      * This method is responsible for clearing the search text
      */
    clearSearchText: function(){
      this.view.tbxSearch.text = "";
      this._searchResult = false;
    },
    
    /**
      * fetchPayeeData.
      * responsible for the on retrieving the payee data
      */
    fetchPayeeData: function(){
      try{
        var scope = this;
        this._searchResult = false;
        this.globalOffset = 0;
        this.pageCount = 1;
        this.cacheUtils.pageSize = Number(this._pageSize);
        this.cacheUtils.offset = 0;
        this.noMoreRecordsInCache = false;
        scope.ManageBillerDAO.fetchPayeeList(this._payeeObjectService,
                                             this._payeeGETOperation, this._payeeObject,
                                             JSON.parse(this._payeeGETCriteria), scope.fetchPayeeDataCallBack, scope.onError);
        this.clearSearchText();
      }
      catch(err)
      {
        var errObj = {
          "errorInfo" : "Error in fetchPayeeData method of the component.",
          "error": err
        };
        this.onError(errObj);
      }
    },
    
    /**
      * fetchPayeeDataCallBackSearch.
      * CallBack function for fetchPayeeList service call and responsible for setting the segment based on the breakpoint.
      * backendResponse {Object} - object contains the service response.
      */
    fetchPayeeDataCallBackSearch: function(){
      this.ManageBillerDAO.fetchLocalData(JSON.parse(this._payeeGETCriteria), this.fetchPayeeDataCallBack);
    },
    
    /**
      * fetchPayeeDataCallBack.
      * CallBack function for fetchPayeeList service call and responsible for setting the segment based on the breakpoint.
      * backendResponse {Object} - object contains the service response.
      */
    fetchPayeeDataCallBack: function(backendResponse){
      var scopeObj = this;
      this._backendResponse=backendResponse;
      var serviceResponse;
	  var selectIndex;
      var sectionIndex;
      if(this._searchResult === true){
        serviceResponse = this.getRecordsArray(this._responsePathSearch,backendResponse);
      }
      else{
        serviceResponse = this.getRecordsArray(this._responsePath,backendResponse);
      }
      //this.view.segPayeesList.onRowClick = scopeObj.onRowClick.bind(scopeObj, serviceResponse, this._rowonClickaction);
	 this.view.segPayeesList.onRowClick = function(){
      selectIndex = scopeObj.view.segPayeesList.selectedRowIndex[1];
      sectionIndex = scopeObj.view.segPayeesList.selectedRowIndex[0];
      scopeObj.onRowClick(scopeObj.sortedResData,scopeObj._rowonClickaction,scopeObj,sectionIndex,selectIndex);
     };
      if(this._inPlaceHandling === true){
        this.cacheUtils.setData(serviceResponse);
      }
      else{
        this.setPayeeListData(serviceResponse);
      }
    },
    
    /**
      * noRecipients.
      * This method is responsible for showing no payees message.
      */
    noRecipients: function(boolean){
      this.view.segPayeesList.setVisibility(!boolean);
      this.view.flxNoTransactions.setVisibility(boolean);
      this.view.forceLayout();
    },
    
    /**
      * setPayeeListData.
      * responsible for setting the Payee data to the segment for desktop breakpoint.
      * response {Object} - contains service response data.
      */
    setPayeeListData: function(response, additionalParams){
      try{
        var section = [];
        var scopeObj =this;
        var serviceResponse = response;
		this.sortedResData = response;
        if (additionalParams){
          if(additionalParams.state === "search") {
            scopeObj.globalState = "search";
          }
          else {
            scopeObj.globalState = additionalParams.state;
          }
        }
        if(this._searchResult === true){
          this.ParserUtilsManager.setResponseData(this._payeeSEARCHIdentifier, serviceResponse);
        }
        else{
          this.ParserUtilsManager.setResponseData(this._payeeGETIdentifier, serviceResponse);
        }
        if(!serviceResponse || serviceResponse.length < 1){
          this.noRecipients(true);
          return;
        }else{
          this.noRecipients(false);
        }
        var Column2Visibility = this.isEmptyNullUndefined(this._field2) ? false : true;
        var Column1Visibility = this.isEmptyNullUndefined(this._field1) ? false : true;
        var EbillVisibility = this.isEmptyNullUndefined(this._ebillVisibility) ? false : true;
        var swipeBox1Visibility = this.isEmptyNullUndefined(this._swipeBox1) ? false : true;
        var swipeBox2Visibility = this.isEmptyNullUndefined(this._swipeBox2) ? false : true;
        var swipeBox3Visibility = this.isEmptyNullUndefined(this._swipeBox3) ? false : true;
        var payeeIconVisibility = this._payeeIconVisibility;
//         var isCombinedUser = this.isCombinedUser();
        for(var i = 0; i < serviceResponse.length; i++){
          var record = {};
//           record["flxIdentifier"] = {
//             "isVisible" : true,
//             "skin" : "ICSknflx4a902",
//             "height" : "210dp"
//           };
//           record["lblIdentifier"] = {
//             "text" : "I",
//             "isVisible" : true
//           };
//           if(payeeIconVisibility && isCombinedUser){
//             record["flxIcon"] = {
//               "isVisible": true
//             };
//             if(serviceResponse[i]["isBusinessPayee"] === "0"){
//               record["imgIcon"] = {
//                 "text": "s"
//               };
//             }else{
//               record["imgIcon"] = {
//                 "text": "r"
//               };
//             }
//           }else{
//             record["flxIcon"] = {
//               "isVisible": false
//             };
//           }
          if(Column1Visibility){
            record["lblField1"] = {
              "text": this.getFormattedData(this.getResponseValue(JSON.parse(this._field1)["mapping"], i), 
                                            JSON.parse(this._field1)["fieldType"]),
              "skin": this._sknField1
            };
          }
          else{
            record["lblField1"] = {
              "isVisible": false
            };
          }
          if(EbillVisibility){
            var ebillJSON = this.getEbillStatus(this._fieldEbill, serviceResponse, i);
            record["imgebill"] = {
              "isVisible" : true,
              "src" : ebillJSON["image"]
            };
          }
          else{
            record["imgebill"] = {
              "isVisible" : false,
            };
          }
          if(Column2Visibility){
            record["lblField2"] = {
              "text": this.getFormattedData(this.getResponseValue(JSON.parse(this._field2)["mapping"], i), 
                                            JSON.parse(this._field2)["fieldType"]),
              "skin": this._sknField2
            };
          }
          else{
            record["lblField2"] = {
              "isVisible": false
            };
          }
          var swipeBoxCount = 3;
          var swipeBox1Action = this.getActionJSON(this._swipeBox1, serviceResponse, i);
          if(swipeBox1Visibility && swipeBox1Action !== "" && this.isEntitled(swipeBox1Action.entitlement)){
            record["flxBox1"] = {
              "isVisible" : true,
              "skin": this._sknSwipeBox1,
              "onClick": scopeObj.btnActionOnClick.bind(scopeObj, serviceResponse, this._swipeBox1)
            };
            record["lblBox1"] = {
              "text": this.ParserUtilsManager.geti18nText(swipeBox1Action["text"]),
              "skin": this._sknSwipeBoxText,
            };
            record["imgBox1"] = {
              "src": swipeBox1Action["image"]
            };
          } else{
            swipeBoxCount--;
            record["flxBox1"] = {
              "isVisible" : false
            };
          }
          var swipeBox2Action = this.getActionJSON(this._swipeBox2,serviceResponse, i);
          if(swipeBox2Visibility && swipeBox2Action !== "" && swipeBox2Action.text && this.isEntitled(swipeBox2Action.entitlement)){
            record["flxBox2"] = {
              "isVisible": true,
              "skin": this._sknSwipeBox2,
              "onClick": scopeObj.btnActionOnClick.bind(scopeObj, serviceResponse, this._swipeBox2)
            };
            record["lblBox2"] = {
              "text": this.ParserUtilsManager.geti18nText(swipeBox2Action["text"]),
              "skin": this._sknSwipeBoxText,
            };
            record["imgBox2"] = {
              "src": swipeBox2Action["image"]
            };
          }
          else{
            swipeBoxCount--;
            record["flxBox2"] = {
              "isVisible": false
            };
          }
          var swipeBox3Action = this.getActionJSON(this._swipeBox3,serviceResponse, i);
          if(swipeBox3Visibility && swipeBox3Action !== "" &&swipeBox3Action.text && this.isEntitled(swipeBox3Action.entitlement)){
            record["flxBox3"] = {
              "isVisible": true,
              "skin": this._sknSwipeBox3,
              "onClick": scopeObj.btnActionOnClick.bind(scopeObj, serviceResponse, this._swipeBox3)
            };
            record["lblBox3"] = {
              "text": this.ParserUtilsManager.geti18nText(swipeBox3Action["text"]),
              "skin": this._sknSwipeBoxText,
            };
            record["imgBox3"] = {
              "isVisible": true,
              "src": swipeBox3Action["image"]
            };
          }
          else{
            swipeBoxCount--;
            record["flxBox3"] = {
              "isVisible": false
            };
          }
          if(swipeBoxCount === 0){
            record["flxRightContainer"] = {
              "isVisible": false
            };
          }
          else if(swipeBoxCount === 1){
            record["flxRightContainer"] = {
              "isVisible": true,
              "width" : "70dp"
            };
          }
          else if(swipeBoxCount === 2){
            record["flxRightContainer"] = {
              "isVisible": true,
              "width" : "140dp"
            };
          }
          record["flxSeparator"] = {
              "isVisible": true,
              "skin" : this._sknRowSeperator
            };
          record.template = "flxSwipe";
          record["flxSwipe"] = {
            "skin" : this.getProcessedText(this._sknRow),
          };

          section.push(record);
        }
        this.view.segPayeesList.widgetDataMap = this.getWidgetDataMap();
        if (additionalParams && additionalParams.state === "pagination") {
          this.view.segPayeesList.addAll(section);
        }
        else {
          this.view.segPayeesList.setData(section);
        }
        this.view.forceLayout();
      }
      catch(err)
      {
        var errObj = {
          "errorInfo" : "Error in setPayeeListData method of the component.",
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
        "flxAccountsNoImageBillPay" : "flxAccountsNoImageBillPay",
        "flxSwipe" : "flxSwipe",
        "flxBox1" : "flxBox1",
        "flxBox2" : "flxBox2",
        "flxBox3" : "flxBox3",
        "swipeContainer" : "swipeContainer",
        "flxmainContainer" : "flxmainContainer",
        "flxMain" : "flxMain",
        "flxSeparator" : "flxSeparator",
        "flxRow1" : "flxRow1",
        "lblField1" : "lblField1",
        "flxRow2" : "flxRow2",
        "flxAccountType" : "flxAccountType",
        "imgAccountType" : "imgAccountType",
        "imgebill" : "imgebill",
        "lblField2" : "lblField2",
        "flxrightContainer" : "flxrightContainer",
        "imgBox1" : "imgBox1",
        "lblBox1" : "lblBox1",
        "imgBox2" : "imgBox2",
        "lblBox2" : "lblBox2",
        "imgBox3" : "imgBox3",
        "lblBox3" : "lblBox3",
        "lblTrashIcon" : "lblTrashIcon"
      };
    },

    /**
     * Component swipeRowOption
     * swipe the segment row and show options
     * widgetInfo {object} - this will be details about the segment
     * swipeInfo {object} - this will be swipe row information like swiped left or right
     */

    swipeRowOption: function (widgetInfo, swipeInfo) {
      var self = this;
      if(self.rowIndexForSwipe >= 0 && self.previousSection >= 0){
        self.animateRight(self.rowIndexForSwipe, self.previousSection);
      }
      self.rowIndexForSwipe = swipeInfo.row;
      self.previousSection = swipeInfo.section;
      if (swipeInfo.swipeDirection === 1) {
        self.animateLeft(swipeInfo.row, swipeInfo.section);
      }
      else if (swipeInfo.swipeDirection === 2) {
        self.animateRight(swipeInfo.row, swipeInfo.section);
      }
    },
	/**
     * Component animateLeft
     * To animate the row to left side
     * rowNumber {Number} - Row Mumber
     * swipeInfo {object} - section Number
     */
    animateLeft: function(rowNumber, sectionNumber) {
      var self = this;
      var shiftPixels = this.getShiftPixels(rowNumber);
      if (sectionNumber === 0) {
        this.getTransAnimDefinition(shiftPixels);
        this.view.segPayeesList.animateRows({
          rows: [{
            sectionIndex: sectionNumber,
            rowIndex: rowNumber
          }],
          widgets: ['flxMain'],
          animation: self.swipeObj
        })
      }
    },
	/**
     * Component animateRight
     * To animate the row to right side
     * rowNumber {Number} - Row Mumber
     * swipeInfo {object} - section Number
     */
    animateRight: function(rowNumber, sectionNumber) {
      var self = this;
      if (sectionNumber === 0) {
        this.getTransAnimDefinition("0dp");
        this.view.segPayeesList.animateRows({
          rows: [{
            sectionIndex: sectionNumber,
            rowIndex: rowNumber
          }],
          widgets: ['flxMain'],
          animation: self.swipeObj
        })
      }
    },		
	/**
     * Component getTransAnimDefinition
     * Animation definition
     * leftVal {Number} - Widget left Value
     */
    getTransAnimDefinition : function(leftVal) {
      var transAnimDef1 = {
        "100": {
          "left": leftVal,
          "stepConfig": {
            "timingFunction": kony.anim.LINEAR
          },
          "rectified": true
        }
      };
      var animConf = {
        "delay": 0,
        "iterationCount": 1,
        "fillMode": kony.anim.FILL_MODE_FORWARDS,
        "duration": 0.5
      };
      this.swipeObj = {
        definition: kony.ui.createAnimation(transAnimDef1),
        config :animConf,
        callbacks:null
      };
    },
	/**
     * Component getShiftPixels
     * Returns the widget left value based on Swipe Boxes visibility
     * rowNumber {Number} - Row Number
     */
    getShiftPixels: function(rowNumber) {
      var swipeBox1Visibility = this.isEmptyNullUndefined(this._swipeBox1) ? false : true;
      var swipeBox2Visibility = this.isEmptyNullUndefined(this._swipeBox2) ? false : true;
      var swipeBox3Visibility = this.isEmptyNullUndefined(this._swipeBox3) ? false : true;
      var count = 0;
      if (swipeBox1Visibility){
        count++;
      }
      if (swipeBox2Visibility){
        count++;
      }
      if (swipeBox3Visibility){
        count++;
      }
      if(count === 0){
		return "0dp";
      }
      else if(count === 1){
		return "-70dp";
      }
      else if(count === 2){
        return "-140dp";
      }
      else{
        return "-210dp";
      }
    },
    
    /**
      * isEntitled.
      * Verifies if the user is entitled for respective features & permissions.
      */
    isEntitled: function(data){
      return this.EntitlementUtils.isEntitled(data);
    },

    /**
      * onRowClick
      * Definition for the Action Button Click
      * responseData - Object contains the backend resposne data
      * property{stringified json} - Object Contains the contract property- 
      * eventobject {Object} - object contains widget Instance
      * context {Object} - object contains the segment Template data 
      */
    onRowClick : function(responseData, property, eventobject, sectionIndex, rowIndex){
      try{
        var scope = this;
        var propertyValue = scope.getActionJSON(property, responseData, rowIndex);
        var action = propertyValue["action"];
        this._parentScope[action.method](responseData[rowIndex]);
      }
      catch(err)
      {
        var errObj = {
          "errorInfo" : "Error in onRowClick method of the component.",
          "error": err
        };
        this.onError(errObj);
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
      * showDeletePopup.
      * Responsible for showing the native delete popup
      */
    showDeletePopup: function(responseData,index){
      var scope = this;
      var basicConfig = {message: kony.i18n.getLocalizedString("kony.mb.common.deleteRecipient"),
                         alertIcon:null,
                         alertType: constants.ALERT_TYPE_CONFIRMATION,
                         yesLabel:kony.i18n.getLocalizedString("kony.mb.common.Yes"),
                         noLabel: kony.i18n.getLocalizedString("kony.mb.common.No"),
                         alertHandler: scope.deleteHandler.bind(scope,responseData,index)
                        };
      var pspConfig = {};
//       applicationManager.getPresentationUtility().showAlertMessage(basicConfig, pspConfig);
//       if(applicationManager.getPresentationFormUtility().getDeviceName() === "android"){
//         basicConfig.alertIcon="transparentbox.png";
//       }
      kony.ui.Alert(basicConfig, pspConfig);
    },

    /**
      * deleteHandler.
      * responsible for deleting payee by making call to DAO layer.
      * data {Object} - object contains segment data.
      * index {Integer} - object contains seleted segment row index. \
      */
    deleteHandler: function(data,index, response){
      try{
        if(response === true){
          var scope = this;
          var payload={};
          var criteria = JSON.parse(this._payeeDELETECriteria);
          for(var key in criteria){
            payload[key] = data[index][key];
          }
          scope.ManageBillerDAO.deletePayee(this._payeeObjectService, 
                                            this._payeeDELETEOperation, this._payeeObject, payload, scope.showDeleteConfirmationPopup, scope.onError);
        }
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
      * deleteFromDetailsForm.
      * responsible for deleting payee by making call to DAO layer.
      * data {Object} - object contains record data.
      */
    deleteFromDetailsForm: function(data, response){
      try{
        if(response === true){
          var scope = this;
          var payload={};
          var criteria = JSON.parse(this._payeeDELETECriteria);
          for(var key in criteria){
            payload[key] = data[key];
          }
          scope.ManageBillerDAO.deletePayee(this._payeeObjectService, 
                                            this._payeeDELETEOperation, this._payeeObject, payload, scope.showDeleteConfirmationPopup, scope.onError);
          scope._deletePayee = false;
        }
      }
      catch(err)
      {
        var errObj = {
          "errorInfo" : "Error in deleteFromDetailsForm method of the component.",
          "error": err
        };
        this.onError(errObj);
      }
    },
    
    /**
      * showDeleteConfirmationPopup.
      * CallBack function for deletePayee service call, responsible for Showing 
      	and Confirmation popup and fetching the updated payee list.
      */
    showDeleteConfirmationPopup: function(){
      try{
        var scope = this;
        var form = kony.application.getCurrentForm();
        var popupObj = this.view.flxCustomGroupPopup.clone();
        popupObj.isVisible = true;
        popupObj.top = "0dp";
        popupObj.left = "0dp";
        popupObj.height = "100%";
        popupObj.zIndex = 20;
        popupObj.flxContainer.lblMessage.text = kony.i18n.getLocalizedString('i18n.payments.deletePayeeSuccessMsg');
        form.add(popupObj);
        popupObj.flxContainer.btn1.onClick = function() {
          form.remove(popupObj);
          scope.fetchPayeeData();
        }
        this.view.forceLayout();
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
    /**
      * showDeactivateBillSuccessPopup.
      * Responsible for Showing 
      	the  Confirmation popup for bill deactivate and fetching the updated payee list.
      */
    showDeactivateBillSuccessPopup : function(){
       try{
        var scope = this;
        var form = kony.application.getCurrentForm();
        var popupObj = this.view.flxCustomGroupPopup.clone();
        popupObj.isVisible = true;
        popupObj.top = "0dp";
        popupObj.left = "0dp";
        popupObj.height = "100%";
        popupObj.zIndex = 20;
        popupObj.flxContainer.lblMessage.text = kony.i18n.getLocalizedString('i18n.payments.deactivatePayeeSuccessMsg');
        form.add(popupObj);
        popupObj.flxContainer.btn1.onClick = function() {
          form.remove(popupObj);
          scope.fetchPayeeData();
        }
        this.view.forceLayout();
      }
      catch(err)
      {
        var errObj = {
          "errorInfo" : "Error in showDeactivateBillSuccessPopup method of the component.",
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
     *  getProcessedText.
     * Pass the text to parser util to obtain the processed value.
     * text {string} - value to be processed.
     * @return : {string} - processed value.
     */
    getProcessedText:function(text, responseArrayIndex){
      return this.ParserUtilsManager.getParsedValue(text, responseArrayIndex);
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
      * getFormattedData.
      * Responsible to get the formatted value from FormatUtils manager.
      * value{String} : value to be formatted.
      * type{String} : Type of the value.
      @return : {String} - returns the formatted value.
      */      
    getFormattedData: function(value, type){
      try{
        var data = this.FormatUtils.formatText(value, type, this.formattingJSON);
        return data?data.trim():"-";
      }
      catch(err)
      {
        var errObj = {
          "errorInfo" : "Error in getFormattedData method of the component.",
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
        var ActionJSON = {};
        if(!contract.hasOwnProperty("Condition1")){
          ActionJSON["image"] = contract["image"];
          return ActionJSON;
        }
        else{
          for(var key in contract){
            if(contract[key].hasOwnProperty("condition")){
              for(var responseValue in contract[key]["condition"]){
                if(contract[key]["condition"][responseValue] == scope.getResponseValue(responseValue, index)){
                  ActionJSON["image"] = contract[key]["image"];
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

  };
});