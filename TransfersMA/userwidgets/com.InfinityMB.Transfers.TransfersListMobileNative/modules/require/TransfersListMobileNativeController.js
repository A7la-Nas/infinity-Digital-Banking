define(['./TransfersListDAO', './ParserUtilsManager', './FormatUtils', './EntitlementUtils', 'CacheUtils'], function(TransfersListDAO, ParserUtilsManager, FormatUtils, EntitlementUtils, CacheUtils) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      //declaration for Object Service Name in the group:List Service
      this._serviceName="";

      //declaration for Object Service Name Delete in the group:Cancel Transfer Service
      this._serviceNameDel="";

      //declaration for Field1 Label in the group:Row Data
      this._field1Label="";

      //declaration for Separator Skin in the group:Skins
      this._separatorSkin="";

      //declaration for Retail Icon in the group:Icons
      this._retailIcon="";

      //declaration for Swipeable Action Button 1 in the group:Swipable Button Properties
      this._btnSwipableAction1="";

      //declaration for Alert Message Text in the group:Alert Box Properties
      this._alertMessageText="";

      //declaration for No Records Found Text in the group:General
      this._noRecordsText="";

      //declaration for Object Name in the group:List Service
      this._objectName="";

      //declaration for Object Name Delete in the group:Cancel Transfer Service
      this._objectNameDel="";

      //declaration for Field1 Type in the group:Row Data
      this._field1Type="";

      //declaration for Primary Field Skin in the group:Skins
      this._primaryFieldSkin="";

      //declaration for Combined User Icon in the group:Icons
      this._combinedUserIcon="";

      //declaration for Swipeable Action Button 2 in the group:Swipable Button Properties
      this._btnSwipableAction2="";

      //declaration for Yes Label Text in the group:Alert Box Properties
      this._yesLabelText="";

      //declaration for No Search Results Found Text in the group:General
      this._noSearchResultsFoundText="";

      //declaration for Operation Name in the group:List Service
      this._operationName="";

      //declaration for Operation Name Delete in the group:Cancel Transfer Service
      this._operationNameDel="";

      //declaration for Field2 Label in the group:Row Data
      this._field2Label="";

      //declaration for Secondary Field Skin in the group:Skins
      this._secondaryFieldSkin="";

      //declaration for Status Image in the group:Icons
      this._statusImage="";

      //declaration for No Label Text in the group:Alert Box Properties
      this._noLabelText="";

      //declaration for Criteria in the group:List Service
      this._getCriteria="";

      //declaration for Criteria Delete in the group:Cancel Transfer Service
      this._getCriteriaDel="";

      //declaration for Field2 Type in the group:Row Data
      this._field2Type="";

      //declaration for No Records Icon in the group:Icons
      this._noRecordsIcon="";

      //declaration for Service Response Identifier in the group:List Service
      this._serviceIdentifier="";

      //declaration for Service ResponseDelete Identifier in the group:Cancel Transfer Service
      this._serviceIdentifierDel="";

      //declaration for Field3 Label in the group:Row Data
      this._field3Label="";

      //declaration for Data Availability in the group:List Service
      this._dataAvailability="";

      //declaration for Field3 Type in the group:Row Data
      this._field3Type="";

      //declaration for Field4 Label in the group:Row Data
      this._field4Label="";

      //declaration for Field4 Type in the group:Row Data
      this._field4Type="";

      //declaration for No records found Text Skin in the group:Skins
      this._noRecordsFoundSkin="";
      
      //declaration for Amount Format  in the group:Data Format
      this._amountFormat="";
      
      //declaration for Date Format in the group:Data Format
      this._dateFormat="";
      
      //declaration for Backend Date Format  in the group:Data Format
      this._backendDateFormat="";
      
      //declaration for Percentage Format  in the group:Data Format
      this._percentageFormat="";
      
      //declaration for Currency Code in the group:Data Format
      this._currencyCode="";
      
      //declaration for Account Number Length in the group:Data Format
      this._accountNumberLength="";
      
      //declaration for List Array in the group:Data Grid
      this._listArray = "";
      
      //declaration for List Identifier in the group:Data Grid
      this._listIdentifier = "";
      
      //declaration for No. of Paginated Records in the group:List Service
      this._paginatedRecords="";
      
      //declaration for Time period Upto With Records Are Fetched in the group:List Service
      this._months="";
      
      //declaration for Max Records Fetched in the group:List Service
      this._maxRecords="";
      
      //declaration for Sort By Param in the group:Cache Params
      this._sortBy="";
      
      //declaration for Filter Parameters in the group:Cache Params
      this._filterParams="";
      
      //declaration for Search Fields in the group:Cache Params
      this._searchFields="";
	
      //DAO object
      this.transfersListDAO = new TransfersListDAO();
      
      //Parser Util Object
      this.parserUtilsManager = new ParserUtilsManager();
      
      //Format util object
      this.formatUtils = new FormatUtils();
      
      //Entitlement util object
      this.EntitlementUtils = new EntitlementUtils();
      
      //Global Context Variable
      this.context = "";
      
      //Object to store the request payload for fetching List of Transactions
      this.criteriaObjectValue = {};
      
      //Object to store the format values defined by the user in the contract
      this.formattingJSON = {};
      
      //This stores the label dimentions inside segmentRowTemplate, to be manipulated later based on the number of labels in the segmentRow
      this.fitData = {};
      
      //Client side cache for storing all the list elements
      this.completeList = [];
      
      //Offset for client side cached list
      this.globalOffset = 0;
      
      //Limit for client side cached list
      this.limit = 20;
      
      this.fieldValue = {};
      
      this.rowIndexForSwipe = -1;
      
      this.previousSection = -1;
      
      this.swipeObj = {};
      
      this.sorting = "desc";
      
      this.isDeleteTriggered = false;
      
      this.cacheUtils;
      
      this.globalState="";

      this.searchVariable = 0;

      this.response = "";

      this.additionalParams = "";
      
      this.accountNumberBusinessAccountMap = null;
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      //setter method for Object Service Name in the group:List Service
      defineSetter(this, "serviceName", function(val) {
        if((typeof val=='string') && (val != "")){
          this._serviceName=val;
        }
      });

      //getter method for Object Service Name in the group:List Service
      defineGetter(this, "serviceName", function() {
        return this._serviceName;
      });

      //setter method for Object Service Name Delete in the group:Cancel Transfer Service
      defineSetter(this, "serviceNameDel", function(val) {
        if((typeof val=='string') && (val != "")){
          this._serviceNameDel=val;
        }
      });

      //getter method for Object Service Name Delete in the group:Cancel Transfer Service
      defineGetter(this, "serviceNameDel", function() {
        return this._serviceNameDel;
      });

      //setter method for Field1 Label in the group:Row Data
      defineSetter(this, "field1Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field1Label=val;
        }
      });

      //getter method for Field1 Label in the group:Row Data
      defineGetter(this, "field1Label", function() {
        return this._field1Label;
      });

      //setter method for Separator Skin in the group:Skins
      defineSetter(this, "separatorSkin", function(val) {
        if((typeof val=='string') && (val != "")){
          this._separatorSkin=val;
        }
      });

      //getter method for Separator Skin in the group:Skins
      defineGetter(this, "separatorSkin", function() {
        return this._separatorSkin;
      });

      //setter method for Retail Icon in the group:Icons
      defineSetter(this, "retailIcon", function(val) {
        if((typeof val=='string') && (val != "")){
          this._retailIcon=val;
        }
      });

      //getter method for Retail Icon in the group:Icons
      defineGetter(this, "retailIcon", function() {
        return this._retailIcon;
      });

      //setter method for Swipeable Action Button 1 in the group:Swipable Button Properties
      defineSetter(this, "btnSwipableAction1", function(val) {
        if((typeof val=='string') && (val != "")){
          this._btnSwipableAction1=val;
        }
      });

      //getter method for Swipeable Action Button 1 in the group:Swipable Button Properties
      defineGetter(this, "btnSwipableAction1", function() {
        return this._btnSwipableAction1;
      });

      //setter method for Alert Message Text in the group:Alert Box Properties
      defineSetter(this, "alertMessageText", function(val) {
        if((typeof val=='string') && (val != "")){
          this._alertMessageText=val;
        }
      });

      //getter method for Alert Message Text in the group:Alert Box Properties
      defineGetter(this, "alertMessageText", function() {
        return this._alertMessageText;
      });

      //setter method for No Records Found Text in the group:General
      defineSetter(this, "noRecordsText", function(val) {
        if((typeof val=='string') && (val != "")){
          this._noRecordsText=val;
        }
      });

      //getter method for No Records Found Text in the group:General
      defineGetter(this, "noRecordsText", function() {
        return this._noRecordsText;
      });

      //setter method for Object Name in the group:List Service
      defineSetter(this, "objectName", function(val) {
        if((typeof val=='string') && (val != "")){
          this._objectName=val;
        }
      });

      //getter method for Object Name in the group:List Service
      defineGetter(this, "objectName", function() {
        return this._objectName;
      });

      //setter method for Object Name Delete in the group:Cancel Transfer Service
      defineSetter(this, "objectNameDel", function(val) {
        if((typeof val=='string') && (val != "")){
          this._objectNameDel=val;
        }
      });

      //getter method for Object Name Delete in the group:Cancel Transfer Service
      defineGetter(this, "objectNameDel", function() {
        return this._objectNameDel;
      });

      //setter method for Field1 Type in the group:Row Data
      defineSetter(this, "field1Type", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field1Type=val;
        }
      });

      //getter method for Field1 Type in the group:Row Data
      defineGetter(this, "field1Type", function() {
        return this._field1Type;
      });

      //setter method for Primary Field Skin in the group:Skins
      defineSetter(this, "primaryFieldSkin", function(val) {
        if((typeof val=='string') && (val != "")){
          this._primaryFieldSkin=val;
        }
      });

      //getter method for Primary Field Skin in the group:Skins
      defineGetter(this, "primaryFieldSkin", function() {
        return this._primaryFieldSkin;
      });

      //setter method for Combined User Icon in the group:Icons
      defineSetter(this, "combinedUserIcon", function(val) {
        if((typeof val=='string') && (val != "")){
          this._combinedUserIcon=val;
        }
      });

      //getter method for Combined User Icon in the group:Icons
      defineGetter(this, "combinedUserIcon", function() {
        return this._combinedUserIcon;
      });

      //setter method for Swipeable Action Button 2 in the group:Swipable Button Properties
      defineSetter(this, "btnSwipableAction2", function(val) {
        if((typeof val=='string') && (val != "")){
          this._btnSwipableAction2=val;
        }
      });

      //getter method for Swipeable Action Button 2 in the group:Swipable Button Properties
      defineGetter(this, "btnSwipableAction2", function() {
        return this._btnSwipableAction2;
      });

      //setter method for Yes Label Text in the group:Alert Box Properties
      defineSetter(this, "yesLabelText", function(val) {
        if((typeof val=='string') && (val != "")){
          this._yesLabelText=val;
        }
      });

      //getter method for Yes Label Text in the group:Alert Box Properties
      defineGetter(this, "yesLabelText", function() {
        return this._yesLabelText;
      });

      //setter method for No Search Results Found Text in the group:General
      defineSetter(this, "noSearchResultsFoundText", function(val) {
        if((typeof val=='string') && (val != "")){
          this._noSearchResultsFoundText=val;
        }
      });

      //getter method for No Search Results Found Text in the group:General
      defineGetter(this, "noSearchResultsFoundText", function() {
        return this._noSearchResultsFoundText;
      });

      //setter method for Operation Name in the group:List Service
      defineSetter(this, "operationName", function(val) {
        if((typeof val=='string') && (val != "")){
          this._operationName=val;
        }
      });

      //getter method for Operation Name in the group:List Service
      defineGetter(this, "operationName", function() {
        return this._operationName;
      });

      //setter method for Operation Name Delete in the group:Cancel Transfer Service
      defineSetter(this, "operationNameDel", function(val) {
        if((typeof val=='string') && (val != "")){
          this._operationNameDel=val;
        }
      });

      //getter method for Operation Name Delete in the group:Cancel Transfer Service
      defineGetter(this, "operationNameDel", function() {
        return this._operationNameDel;
      });

      //setter method for Field2 Label in the group:Row Data
      defineSetter(this, "field2Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field2Label=val;
        }
      });

      //getter method for Field2 Label in the group:Row Data
      defineGetter(this, "field2Label", function() {
        return this._field2Label;
      });

      //setter method for Secondary Field Skin in the group:Skins
      defineSetter(this, "secondaryFieldSkin", function(val) {
        if((typeof val=='string') && (val != "")){
          this._secondaryFieldSkin=val;
        }
      });

      //getter method for Secondary Field Skin in the group:Skins
      defineGetter(this, "secondaryFieldSkin", function() {
        return this._secondaryFieldSkin;
      });

      //setter method for Status Image in the group:Icons
      defineSetter(this, "statusImage", function(val) {
        if((typeof val=='string') && (val != "")){
          this._statusImage=val;
        }
      });

      //getter method for Status Image in the group:Icons
      defineGetter(this, "statusImage", function() {
        return this._statusImage;
      });

      //setter method for No Label Text in the group:Alert Box Properties
      defineSetter(this, "noLabelText", function(val) {
        if((typeof val=='string') && (val != "")){
          this._noLabelText=val;
        }
      });

      //getter method for No Label Text in the group:Alert Box Properties
      defineGetter(this, "noLabelText", function() {
        return this._noLabelText;
      });

      //setter method for Criteria in the group:List Service
      defineSetter(this, "getCriteria", function(val) {
        if((typeof val=='string') && (val != "")){
          this._getCriteria=val;
        }
      });

      //getter method for Criteria in the group:List Service
      defineGetter(this, "getCriteria", function() {
        return this._getCriteria;
      });

      //setter method for Criteria Delete in the group:Cancel Transfer Service
      defineSetter(this, "getCriteriaDel", function(val) {
        if((typeof val=='string') && (val != "")){
          this._getCriteriaDel=val;
        }
      });

      //getter method for Criteria Delete in the group:Cancel Transfer Service
      defineGetter(this, "getCriteriaDel", function() {
        return this._getCriteriaDel;
      });

      //setter method for Field2 Type in the group:Row Data
      defineSetter(this, "field2Type", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field2Type=val;
        }
      });

      //getter method for Field2 Type in the group:Row Data
      defineGetter(this, "field2Type", function() {
        return this._field2Type;
      });

      //setter method for No Records Icon in the group:Icons
      defineSetter(this, "noRecordsIcon", function(val) {
        if((typeof val=='string') && (val != "")){
          this._noRecordsIcon=val;
        }
      });

      //getter method for No Records Icon in the group:Icons
      defineGetter(this, "noRecordsIcon", function() {
        return this._noRecordsIcon;
      });

      //setter method for Service Response Identifier in the group:List Service
      defineSetter(this, "serviceIdentifier", function(val) {
        if((typeof val=='string') && (val != "")){
          this._serviceIdentifier=val;
        }
      });

      //getter method for Service Response Identifier in the group:List Service
      defineGetter(this, "serviceIdentifier", function() {
        return this._serviceIdentifier;
      });

      //setter method for Service ResponseDelete Identifier in the group:Cancel Transfer Service
      defineSetter(this, "serviceIdentifierDel", function(val) {
        if((typeof val=='string') && (val != "")){
          this._serviceIdentifierDel=val;
        }
      });

      //getter method for Service ResponseDelete Identifier in the group:Cancel Transfer Service
      defineGetter(this, "serviceIdentifierDel", function() {
        return this._serviceIdentifierDel;
      });

      //setter method for Field3 Label in the group:Row Data
      defineSetter(this, "field3Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field3Label=val;
        }
      });

      //getter method for Field3 Label in the group:Row Data
      defineGetter(this, "field3Label", function() {
        return this._field3Label;
      });

      //setter method for Data Availability in the group:List Service
      defineSetter(this, "dataAvailability", function(val) {
        if((typeof val=='string') && (val != "")){
          this._dataAvailability=val;
        }
      });

      //getter method for Data Availability in the group:List Service
      defineGetter(this, "dataAvailability", function() {
        return this._dataAvailability;
      });

      //setter method for Field3 Type in the group:Row Data
      defineSetter(this, "field3Type", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field3Type=val;
        }
      });

      //getter method for Field3 Type in the group:Row Data
      defineGetter(this, "field3Type", function() {
        return this._field3Type;
      });


      //setter method for Field4 Label in the group:Row Data
      defineSetter(this, "field4Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field4Label=val;
        }
      });

      //getter method for Field4 Label in the group:Row Data
      defineGetter(this, "field4Label", function() {
        return this._field4Label;
      });

      //setter method for Field4 Type in the group:Row Data
      defineSetter(this, "field4Type", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field4Type=val;
        }
      });

      //getter method for Field4 Type in the group:Row Data
      defineGetter(this, "field4Type", function() {
        return this._field4Type;
      });

      //setter method for No records found Text Skin in the group:Skins
      defineSetter(this, "noRecordsFoundSkin", function(val) {
        if((typeof val=='string') && (val != "")){
          this._noRecordsFoundSkin=val;
        }
      });

      //getter method for No records found Text Skin in the group:Skins
      defineGetter(this, "noRecordsFoundSkin", function() {
        return this._noRecordsFoundSkin;
      });
      
       //setter method for Amount Format in the group:Data Format
      defineSetter(this, "amountFormat", function(val) {
        if((typeof val=='string') && (val != "")){
          this._amountFormat=val;
        }
      });
      
      //getter method for Amount Format in the group:Data Format
      defineGetter(this, "amountFormat", function() {
        return this._amountFormat;
      });
      
      //setter method for Date Format in the group:Data Format
      defineSetter(this, "dateFormat", function(val) {
        if((typeof val=='string') && (val != "")){
          this._dateFormat=val;
        }
      });
      
      //getter method for Date Format in the group:Data Format
      defineGetter(this, "dateFormat", function() {
        return this._dateFormat;
      });
      
      //setter method for Backend Date Format in the group:Data Format
      defineSetter(this, "backendDateFormat", function(val) {
        if((typeof val=='string') && (val != "")){
          this._backendDateFormat=val;
        }
      });
      
      //getter method for Backend Date Format in the group:Data Format
      defineGetter(this, "backendDateFormat", function() {
        return this._backendDateFormat;
      });
      
      //setter method for Percentage Format in the group:Data Format
      defineSetter(this, "percentageFormat", function(val) {
        if((typeof val=='string') && (val != "")){
          this._percentageFormat=val;
        }
      });
      
      //getter method for Percentage Format in the group:Data Format
      defineGetter(this, "percentageFormat", function() {
        return this._percentageFormat;
      });
      
      //setter method for Currency Code in the group:Data Format
      defineSetter(this, "currencyCode", function(val) {
        if((typeof val=='string') && (val != "")){
          this._currencyCode=val;
        }
      });
      
      //getter method for Currency Code in the group:Data Format
      defineGetter(this, "currencyCode", function() {
        return this._currencyCode;
      });
      
      //setter method for List Array in the group:Data Grid
      defineSetter(this, "listArray", function(val) {
        if((typeof val=='string') && (val != "")){
          this._listArray=val;
        }
      });
      
      //getter method for List Array in the group:Data Grid
      defineGetter(this, "listArray", function() {
        return this._listArray;
      });
      
      //setter method for List Identifier in the group:Data Grid
      defineSetter(this, "listIdentifier", function(val) {
        if((typeof val=='string') && (val != "")){
          this._listIdentifier=val;
        }
      });
      
      //getter method for List Identifier in the group:Data Grid
      defineGetter(this, "listIdentifier", function() {
        return this._listIdentifier;
      });
      
       //setter method for No. of Paginated Records in the group:List Service
      defineSetter(this, "paginatedRecords", function(val) {
        if((typeof val=='string') && (val != "")){
          this._paginatedRecords=val;
        }
      });

      //getter method for No. of Paginated Records in the group:List Service
      defineGetter(this, "paginatedRecords", function() {
        return this._paginatedRecords;
      });
      
      //setter method for Time period Upto Which Records are Fetched in the group:List Service
      defineSetter(this, "months", function(val) {
        if((typeof val=='string') && (val != "")){
          this._months=val;
        }
      });

      //getter method for No. of Paginated Records in the group:List Service
      defineGetter(this, "months", function() {
        return this._months;
      });
      
      //setter method for Max Records Fetched in the group:List Service
      defineSetter(this, "maxRecords", function(val) {
        if((typeof val=='string') && (val != "")){
          this._maxRecords=val;
        }
      });

      //getter method for No. of Paginated Records in the group:List Service
      defineGetter(this, "maxRecords", function() {
        return this._maxRecords;
      });
      
       //setter method for Account Number Length Fetched in the group:Data Format
      defineSetter(this, "accountNumberLength", function(val) {
        if((typeof val=='string') && (val != "")){
          this._accountNumberLength=val;
        }
      });

      //getter method for No. of Paginated Records in the group:List Service
      defineGetter(this, "accountNumberLength", function() {
        return this._accountNumberLength;
      });
      
       //setter method for Sort By Param in the group:Cache Params
      defineSetter(this, "sortBy", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sortBy=val;
        }
      });

      //getter method for Sort By Param in the group:Cache Params
      defineGetter(this, "sortBy", function() {
        return this._sortBy;
      });
      
      //setter method for Filter Params in the group:Cache Params
      defineSetter(this, "filterParams", function(val) {
        if((typeof val=='string') && (val != "")){
          this._filterParams=val;
        }
      });

      //getter method for Filter Params in the group:Cache Params
      defineGetter(this, "filterParams", function() {
        return this._filterParams;
      });
      
      //setter method for Search Fields in the group:Cache Params
      defineSetter(this, "searchFields", function(val) {
        if((typeof val=='string') && (val != "")){
          this._searchFields=val;
        }
      });

      //getter method for Filter Params in the group:Cache Params
      defineGetter(this, "searchFields", function() {
        return this._searchFields;
      });
      
    },
    
    preShow: function() {
      var scope = this;
      try {
        this.globalOffset = 0;
        this.globalState = "";
        this.EntitlementUtils.setEntitlements(this.context);
        this.accountNumberBusinessAccountMap = this.context.accountNumberBusinessAccountMap;
        this.skins = {
          PRIMARY_FIELD: scope._primaryFieldSkin,
          SECONDARY_FIELD: scope._secondaryFieldSkin,
          NO_RECORDS_TEXT: scope._noRecordsFoundSkin
        };
        this.formattingJSON = {
          "amountFormat" : JSON.parse(this._amountFormat),
          "dateFormat" : this._dateFormat,
          "backenddateformat" : this._backendDateFormat,
          "accountLength" : this._accountNumberLength
        };
        this.formatSkins = {
          TEXT_SKIN : "",
          POSITIVE_AMOUNT_SKIN : "",
          NEGATIVE_AMOUNT_SKIN : "",
          DATE_SKIN : "",
          PERCENTAGE_SKIN : "",
          ACCOUNT_NUMBER_SKIN: ""
        };
        this.setCriteriaList(this._getCriteria);
        this.fitData = {
          FIELD3: {"top": "15dp","original": "0dp"},
          FIELD4: {"top": "27dp","original": "15dp"},
          FIELD1: {"top": "25dp","original": "40dp"},
          FIELD2: {"top": "8dp","original": "23dp"}
        };
        this.fieldValue = {
          "1" : {"label" : scope._field1Label, "type": scope._field1Type},
          "2" : {"label" : scope._field2Label, "type": scope._field2Type},
          "3" : {"label" : scope._field3Label, "type": scope._field3Type},
          "4" : {"label" : scope._field4Label, "type": scope._field4Type},
        };
        this.icons = {
          RETAIL_ICON: this.getFieldValue(scope._retailIcon),
          COMBINED_USER_ICON: this.getFieldValue(scope._combinedUserIcon),
          STATUS_IMAGE: this.getFieldValue(scope._statusImage),
          NO_RECORDS_ICON: this.getFieldValue(scope._noRecordsIcon)         
        };
        this.view.segTransfersList.onRowClick = this.segTransferListRowClick;
        var defaultParams = {} ;
        defaultParams.sortBy = this.getFieldValue(scope._sortBy, "sortParam");
        defaultParams.pageSize = this.getFieldValue(scope._paginatedRecords);
        defaultParams.onUpdate = scope.setTransfersList;
        defaultParams.filterParam = this.getFieldValue(scope._filterParams);
        defaultParams.filterValue = "All";
        defaultParams.order = this.getFieldValue(scope._sortBy, "sortOrder");
        scope.cacheUtils = new CacheUtils(defaultParams);
        //To-do Add cache utility
        //this.criteriaObjectValue.offset = 0;
        this.view.segTransfersList.isVisible = false;
        if (scope._dataAvailability === "Service calls by component") {
          scope.getTransfersList();
        }
        else {
          scope.dataRequestCallback();
        }
      } catch(err) {
        var errorObj = {
          "errorInfo": "Error in preShow",
          "errorLevel": "Configuration",
          "error": err
        }; 
      }
    },
    
    segTransferListRowClick: function() {
      var rowindex, frmaccdata;
      rowindex = Math.floor(this.view.segTransfersList.selectedRowIndex[1]);
      frmaccdata = this.view.segTransfersList.data[rowindex];
      this.onRowClick(frmaccdata);
    },

    /**
     * Component getFieldValue
     * Parse the exposed contract value based on accountType selected and breakpoint consideration
     * @param: Value{string} - value collected from exposed contract
     * @param: key{string} - lookup key in the JSON string
     * @return : {string} - Processed value
     */
    getFieldValue: function(Value,key) {
      try 
      {
        var value = Value;
        if(typeof(Value) == "string"){
          value = JSON.parse(Value);
        }
        if(value[this.accountType]){
          value = value[this.accountType];
        }
        if(!this.isEmptyNullUndefined(value) && !this.isEmptyNullUndefined(key)){
          value = value[key];
        }
        if (value !== null && value !== "" && value !== undefined) {
          if(typeof(value)=="string")
            return this.getProcessedText(value);
          else{
            //var text=this.breakPointParser(value,kony.application.getCurrentBreakpoint());
            return this.getProcessedText(value);
          }
        } else return "";
      }  
      catch(err)
      {
        kony.print(err);
      }
      return this.getProcessedText(Value);
    },
    
    /**
     * Component getProcessedText
     * Pass the text to format util to obtained the processed value.
     * text {string} - value to be processed
     * @return : {string} - processed value
     */
    getProcessedText: function (text) {
      return this.parserUtilsManager.getParsedValue(text);
    },

    /**
     * Component getFormattedData
     * Responsible to get the formatted data to be assigned.
     * @param value{string} - value to be be formatted
     * @param type{string} - type of the value passed
     * @param currencyCode{string} - currency code to be appended for amount
     * @return : {JSONObject} - jsonvalue of formatted value and skin
     */
    getFormattedData : function(value,type,currencyCode){
      var self = this;
      try
      {
        if(this.isEmptyNullUndefined(currencyCode))
          currencyCode = this.getFieldValue(this._currencyCode);
        return this.formatUtils.formatText(value,type,this.formatSkins,this.formattingJSON,currencyCode);
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in Formating the data.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    
    /**
     * Component setCriteriaList
     * Update the request payload based on contract provided by the user
     * criteria {string} - value collected from exposed contract
     */
    setCriteriaList: function(criteria){
      var self = this;
      try
      {
        var criteriaObject = JSON.parse(this._getCriteria);
        for(var key in  criteriaObject){
          criteriaObject[key] = this.getFieldValue(criteriaObject[key]);
        }
        var criteriaJSON = criteria;
        if(typeof(criteria) == "string"){
          criteriaJSON = JSON.parse(criteria);
        }
        for(var key in  criteriaJSON){
          criteriaObject[key] = this.getFieldValue(criteriaJSON[key]);
        }
        if(self._months) {
          var mappedKey = this.getFieldValue(self._months, "mapping");
          criteriaObject[mappedKey] = this.getFieldValue(self._months, mappedKey);
        }
        if (self._maxRecords) {
          var mappedKey = this.getFieldValue(self._maxRecords, "mapping");
          criteriaObject[mappedKey] = this.getFieldValue(self._maxRecords, mappedKey);
        }
        this.criteriaObjectValue = criteriaObject;
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the criteria",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    
    /**
     * Component getCriteriaList
     * Get the parsed criteria stred in criteriaObjectValue
     * @return : {JSONObject} - jsonvalue for criteria
     */
    getCriteriaList: function(){
      var self = this;
      try{
        return this.criteriaObjectValue;
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in returning criteria",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
      return "";
    },
    
    /**
     * Component getTransfersList
     * Reponsible to call the DAO method for invoking service api.
     */
    getTransfersList: function (delResponse) {
      var self = this;
      this.onRequestStart();
      try {
        this.transfersListDAO.fetchTransfersList(this._serviceName, this._operationName, this._objectName, this.getCriteriaList(), this._serviceIdentifier, this.processResponse.bind(this, delResponse), this.onError);
      } catch (err) {
        this.onRequestEnd();
        var errorObj = {
          "errorInfo": "Error in doing service call to fetch transactions",
          "errorLevel": "Business",
          "error": err
        };
        self.onError(errorObj);
      }
    },
    
    dataRequestCallback: function(delResponse) {
      var scopeObj = this;
      try{
		var dataObj = {
          "firstRecordNumber" : scopeObj.globalOffset,
          "lastRecordNumber" : scopeObj.getFieldValue(scopeObj._paginatedRecords),
          "order" : scopeObj.sorting	
        };
        scopeObj.getTransactionsData(dataObj, scopeObj.processResponse.bind(scopeObj, delResponse));
      } catch (err) {
        var errorObj =
            {
              "errorInfo" : "Error in setting the citeria to get Data from form",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    
    /**
     * Component processResponse
     * To generate the JSONpath for service response
     * backendResponse{JSONObject} - response received from the backend
     * unicode{string}             - unique code to identify the service response in case of multiple service calls.
     */
    processResponse: function (delResponse, response) {
      var self = this;
      try{
        if(response[self.getFieldValue(self._listArray)]){
          self.cacheUtils.setData(response[self.getFieldValue(self._listArray)]);
          self.globalOffset = self.globalOffset + Number(self._paginatedRecords);
          if (self.isDeleteTriggered) {
            self.onDeleteSuccess(delResponse);
            self.isDeleteTriggered = false;
          }
        }else{
          self.cacheUtils.setData([]);    
        }
      } catch (err) {
        this.onRequestEnd();
        var errorObj = {
          "errorInfo": "Error in processResponse",
          "errorLevel": "Configuration",
          "error": err
        };
        self.onError(errorObj);
      }
    },
    
    
    //Callback method for error response
    onError: function (error) {
      //alert(JSON.stringify(response));
      if (error.error) {
        error = error.error;
      }
      var errMsg, isServiceFailure, resError, res;
      if (error.opstatus == 1011 || error.errcode == 1011 || error.opstatus == 1023 || error.errcode == 1023)
      {
        if(kony.os.deviceInfo().name === "thinclient" && kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)===false){
          location.reload(); //todo later so that it can be in sync with RB
        }
        else{
          isServiceFailure = true;
          if(error.errmsg){
            errMsg = error.errmsg;
          }
          else if(error.dbpErrMsg)
          	errMsg = error.dbpErrMsg;
          else{
            errMsg = kony.i18n.getLocalizedString("kony.mb.An.error.occurred.while.making.the.request.");
          }
        }
      }
      else
      {
        isServiceFailure = false;
        if(error.errmsg)
          errMsg = error.errmsg;
        else if(error.dbpErrMsg)
          errMsg = error.dbpErrMsg;
        else
          errMsg = kony.i18n.getLocalizedString("kony.mb.An.Internal.Error.occured.Please.try.after.sometime.");
      }
      resError={"errorMessage":errMsg,"isServerUnreachable":isServiceFailure,"serverErrorRes":error};
      res={"status":false,"errmsg":resError};
      this.onFetchError(res.errmsg);
    },
    
    /** 
     * Fetching records from the global cache based on offset and limit
     * @Return : Array - Array of records
    */
    fetchRecordsFromCache: function(offset) {
      var self = this;
      var records = this.completeList.slice(offset, offset + Number(self._paginatedRecords));
      self.globalOffset = self.globalOffset + Number(self._paginatedRecords);
      return records;
    },
    
    /**
     * Component setTransactionsList
     * Responsible to set the data and UI to the segment.
     */
    setTransfersList: function (response, additionalParams) {
      var self = this;
      try{
        if (typeof response != "undefined" && response != null && response.length != null && response.length > 0) {
          response = this.modifySegmentData(response);
          if(this.searchVariable === 1){
            this.response = response;
            this.additionalParams = additionalParams;
          }
          this.view.segTransfersList.widgetDataMap = self.getWidgetDataMap();
          if (additionalParams.state === "pagination") {
            this.view.segTransfersList.addAll(response);
          }
          else {
            this.view.segTransfersList.setData(response);
            if (additionalParams.state === "search") {
              self.globalState = "search";
            }
            else {
              self.globalState = additionalParams.state;
            }
          }  
          this.view.flxTransfersList.isVisible = true;
          this.view.segTransfersList.isVisible = true;
          this.view.flxNoTransactions.isVisible = false;
          this.view.forceLayout();
          this.onRequestEnd();
        }
        else {
          if (additionalParams.state !== "pagination") {
            var noResultText = (additionalParams.state === "search") ? this.getFieldValue(self._noSearchResultsFoundText) : this.getFieldValue(self._noRecordsText)
            this.view.lblNoRecords.text = noResultText;
            this.view.lblNoRecords.skin = self.skins.NO_RECORDS_TEXT;
            this.view.imgExclamation.src = self._noRecordsIcon;
            this.view.flxTransfersList.isVisible = false;
            this.view.flxNoTransactions.isVisible = true;
          }
          this.onRequestEnd();
        }
      } catch(err) {
        var errorObj = {
          "errorInfo": "Error in getTransactionsDetails",
          "errorLevel": "Configuration",
          "error": err
        };
        self.onError(errorObj);
      }
    },
    
     /**
     * Component modifySegmentData
     * modifies the data according to the segment and the contract provided by the User
     *  data{object} - response param should be passed
     * @return : {object} corresponding modified segment data
     */
    modifySegmentData: function(response) {
      var self = this;
      for (var i = 0; i < response.length; i++) {
        var count = 1, //To keep the count of the field labels. If count > 2 then Secondary Skin will be assigned to the labels otherwise primary skin
            currentValue, //The current field value which is being processed.     
            oppositeValue; //The value opposite to the current field which is being processed. Eg. If FieldValue1 is being processed then the oppositeValue for this will be FieldValue3 and vice versa. 
        for (var j = 0; j < 4; j++) { // Looping through all the 4(max 4) field values to process the data
          currentValue = this.getFieldValue(self.fieldValue[j + 1]["label"]);
          if (!this.isEmptyNullUndefined(currentValue)) {
            currentValue = this.getFormattedData(this.fetchFieldData(currentValue, response, i), self.fieldValue[j + 1]["type"], this.fetchFieldData(this.getFieldValue(self._currencyCode), response, i));
          }
          if ((j + 1) < 3) { // This implies that the current value lies at the top half of the segment row
            oppositeValue = this.getFieldValue(self.fieldValue[j + 3]["label"]);
            if (!this.isEmptyNullUndefined(oppositeValue)) {
              oppositeValue = this.getFormattedData(this.fetchFieldData(oppositeValue, response, i), self.fieldValue[j + 3]["type"],this.fetchFieldData(this.getFieldValue(self._currencyCode), response, i));
            }
            else {
              oppositeValue = {};
            }
          }
          else {
            oppositeValue = this.getFieldValue(self.fieldValue[j - 1]["label"]);
            if (!this.isEmptyNullUndefined(oppositeValue)) {
              oppositeValue = this.getFormattedData(this.fetchFieldData(oppositeValue, response, i), self.fieldValue[j - 1]["type"], this.fetchFieldData(this.getFieldValue(self._currencyCode), response, i));
            }
            else {
              oppositeValue = {};
            }
          }
          if (typeof(oppositeValue["text"]) === "undefined" || oppositeValue["text"] === "" || oppositeValue === undefined) {
            oppositeValue["isVisible"] = false;
          }
          else {
            oppositeValue["isVisible"] = true;
          }
          if (currentValue !== undefined || !this.isEmptyNullUndefined(currentValue["text"])) {
            if ((j + 1) < 3) {
              response[i]["lblField" + (j + 1)] = {
                "text": currentValue["text"],
                "skin": (count > 2) ? self.skins.SECONDARY_FIELD : self.skins.PRIMARY_FIELD,
                "top": (oppositeValue["isVisible"] === false) ? self.fitData["FIELD" + (j + 3)]["top"] : self.fitData["FIELD" + (j + 3)]["original"]
              };
              var img = self.imageToBeAssignedToLabel(response[i]["lblField" + (j + 1)], self.fieldValue[j + 1]["type"], response, i);
              if (!this.isEmptyNullUndefined(img)) {
                response[i]["imgIcon" + (j + 1)] = {
                  "src" : img,
                  "top" : (oppositeValue["isVisible"] === false) ? self.fitData["FIELD" + (j + 3)]["top"] : self.fitData["FIELD" + (j + 3)]["original"]
                }
                response[i]["flxIcon" + (j + 1)] = {
                  "isVisible": true
                };
              }
              else {
                response[i]["flxIcon" + (j + 1)] = {
                  "isVisible": false
                };
              }
            }

            else {
              response[i]["lblField" + (j + 1)] = {
                "text": currentValue["text"],
                "skin": (count > 2) ? self.skins.SECONDARY_FIELD : self.skins.PRIMARY_FIELD,
                "top": (oppositeValue["isVisible"] === false) ? self.fitData["FIELD" + (j - 1)]["top"] : self.fitData["FIELD" + (j - 1)]["original"]
              };
              var img = self.imageToBeAssignedToLabel(response[i]["lblField" + (j + 1)], self.fieldValue[j + 1]["type"], response, i);
              if (!this.isEmptyNullUndefined(img)) {
                response[i]["imgIcon" + (j + 1)] = {
                  "src" : img,
                  "top" : (oppositeValue["isVisible"] === false) ? self.fitData["FIELD" + (j - 1)]["top"] : self.fitData["FIELD" + (j - 1)]["original"]
                }
                response[i]["flxIcon" + (j + 1)] = {
                  "isVisible": true
                };
              }
              else {
                response[i]["flxIcon" + (j + 1)] = {
                  "isVisible": false
                };
              }   
            }
            ++count;
          }
        }
        //Swipe contracts settings
        
        //Swipe Button 1
        let swipeConfigurationObject1 = this.returnObjectValueBasedOnMapping(self._btnSwipableAction1, response[i]);
        if (!this.isEmptyNullUndefined(swipeConfigurationObject1)) {
          let swipeStatusConfigObject1 = this.returnObjectValueBasedOnMapping(swipeConfigurationObject1, response[i]);
          if (swipeStatusConfigObject1 && this.EntitlementUtils.isEntitled(swipeStatusConfigObject1["entitlement_keys"])) {
            response[i]["flxSwipeBtn1"] = {
              "isVisible": true,
              "skin": swipeStatusConfigObject1["backgroundSkin"],
              "onClick": function() {
                var RowData = self.view.segTransfersList.data[self.rowIndexForSwipe];
                if (swipeStatusConfigObject1["id"] === "delete") {
                  self.deleteRow(self.rowIndexForSwipe);
                }
                else {
                  RowData.id = swipeStatusConfigObject1["id"];
                  self.onSwipeButtonClick(RowData);
                }
              }
            };
            response[i]["lblSwipeBtn1Text"] = {
              "text": swipeStatusConfigObject1["text"],
              "skin": swipeStatusConfigObject1["txtSkin"]
            };
            response[i]["imgSwipeBtn1"] = { "src" : swipeStatusConfigObject1["icon"]};
            if(scope_configManager.TransferFlowType === "UTF" && (swipeStatusConfigObject1["text"] === "Edit" || swipeStatusConfigObject1["text"] === "Cancel"))
              response[i]["flxSwipeBtn1"] = {"isVisible" : false}
          }
          else {
            response[i]["flxSwipeBtn1"] = {"isVisible" : false}
          }
        } else {
          response[i]["flxSwipeBtn1"] = {"isVisible" : false}
        }
        
        
        //Swipe button 2
         let swipeConfigurationObject2 = this.returnObjectValueBasedOnMapping(self._btnSwipableAction2, response[i]);
        if (!this.isEmptyNullUndefined(swipeConfigurationObject2)) {
          let swipeStatusConfigObject2 = this.returnObjectValueBasedOnMapping(swipeConfigurationObject2, response[i]);
          if ( swipeStatusConfigObject2 && this.EntitlementUtils.isEntitled(swipeStatusConfigObject2["entitlement_keys"])) {
            response[i]["flxSwipeBtn2"] = {
              "isVisible": true,
              "skin": swipeStatusConfigObject2["backgroundSkin"],
              "onClick": function() {
                var RowData = self.view.segTransfersList.data[self.rowIndexForSwipe];
                if (swipeStatusConfigObject2["id"] === "delete") {
                  self.deleteRow(self.rowIndexForSwipe);
                }
                else {
                  RowData.id = swipeStatusConfigObject2["id"];
                  self.onSwipeButtonClick(RowData);
                }
              }
            };
            response[i]["lblSwipeBtn2Text"] = {
              "text": swipeStatusConfigObject2["text"],
              "skin": swipeStatusConfigObject2["txtSkin"]
            };
            response[i]["imgSwipeBtn2"] = {"src" : swipeStatusConfigObject2["icon"]};
            if(scope_configManager.TransferFlowType === "UTF" && (swipeStatusConfigObject2["text"] === "Edit" || swipeStatusConfigObject2["text"] === "Cancel"))
              response[i]["flxSwipeBtn2"] = {"isVisible" : false}
          }
          else {
            response[i]["flxSwipeBtn2"] = {"isVisible" : false};
          }
        } else {
          response[i]["flxSwipeBtn2"] = {"isVisible" : false};
        }

        response[i]["flxSeparator"] = {"skin" : self._separatorSkin}
      }
      this.searchVariable++;
      return response;
    },
    
     /**
     * Component fetchFieldData
     * Returns the actual value at the given index from the response for the key provided 
     * value {object/String} - The key or object of keys for which the value needs to be returned from the array of records
     * data {array} - The array of records which will be queried
     * index {number} - The index in the array of records at which the value will be retrieved
     * @return : {String/Object} - The value retrieved from the array of records for a key at a particular index 
     */
    fetchFieldData: function(value, data, index) {
      if (typeof value === "string") {
        return data[index][value];
      }
      else if (typeof value === "object") {
        for (var property in value) {
          if (value.hasOwnProperty(property)){
            //osama to split toaccount name get arabic name
            if(property == "name" && data[index][value[property]].includes('\n'))
            {
                var fieldValue = data[index][value[property]];
                var before_n = "";
                var after_n = "";
                var parts = fieldValue.split('\n');
                before_n = parts[0];  // The part before the newline
                after_n = parts[1];
                value[property] = after_n;

            }
            else
            {
                value[property] = data[index][value[property]];
            }
            
          }
        }
        return value;
      }
    },
      
   	 /**
     * Component isEmptyNullUndefined
     * Verifies if the value is empty, null or undefined
     * data {string} - value to be verified
     * @return : {boolean} - validity of the value passed
     */
    isEmptyNullUndefined: function (data) {
      if (data === null || data === undefined || data === "") 
        return true;

      return false;
    },
    
    
    /**
     * Component imageToBeAssignedToLabel
     * Returns the image to be assigned to a field depending on the type of field
     * fieldObject {object} - The field for which the image has to be assigned
     * fieldType {String} - The type of field specified in the contract
     * @return : {String} - The Value of the image specified in the contract
     */
    imageToBeAssignedToLabel: function(fieldObject, fieldType, transactionArray, index) {
      var self = this;
      if (!self.isEmptyNullUndefined(self.icons.STATUS_IMAGE) && self.icons.STATUS_IMAGE.hasOwnProperty(fieldObject.text)) {
        //Return Image based on Status Type specified in contract
        return self.icons.STATUS_IMAGE[fieldObject.text];
      }
      else if (fieldType === "AccountNumberWithNicknameAndIcon") {
        //Return Image based on type of account Business or Retail
        if (self.context["isCombinedUser"] === "true" || self.context["isCombinedUser"] === true) {
          if (this.accountNumberBusinessAccountMap) {
            transactionArray[index]["isBusinessAccount"] = this.accountNumberBusinessAccountMap[transactionArray[index].fromAccountNumber];
            return (this.accountNumberBusinessAccountMap[transactionArray[index].fromAccountNumber] === true || this.accountNumberBusinessAccountMap[transactionArray[index].fromAccountNumber] === "true") ? self.icons.COMBINED_USER_ICON : self.icons.RETAIL_ICON;
          }
          else {
            return null;
          }
        }
        return null;
      }
      else {
        return null;
      }
    },
    
    
    /**
     * Component returnObjectValueBasedOnMapping
     * Returns the appropriate configuration for the mapping provided in the contract if the contract is "mapping" based
     * contract {Object/string} - Contract provided by the user
     * objectToSearch {Object} - An object from response array from which the mapped value has to be extracted
     * @return : {Object} - The data from response in the form of an object according to the mapping in the contract
     */
    returnObjectValueBasedOnMapping: function(contract, objectToSearch) {
      var configurationObject;
      var contractObject = this.getFieldValue(contract);
	  if (contractObject.hasOwnProperty("restrictActions")) {
        var mappingString = contractObject["restrictActions"];
        if (objectToSearch[mappingString]) 
          return null;
      }
      if (contractObject.hasOwnProperty("mapping")) {
        var mappingString = contractObject["mapping"];
        configurationObject = contractObject[objectToSearch[mappingString]];
      }
      else {
        configurationObject = contractObject;
      }
      return configurationObject;
    },
    
    /**
     * Component swipeRowOption
     * swipe the segment row and show options
     * widgetInfo {object} - this will be details about the segment
     * swipeInfo {object} - this will be swipe row information like swiped left or right
     */

	  swipeRowOption: function (widgetInfo, swipeInfo) {
        var self = this;
        if (self.rowIndexForSwipe >= 0 && self.previousSection >= 0) {
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
      
      
      animateLeft: function(rowNumber, sectionNumber) {
        var self = this;
        var shiftPixels = this.getShiftPixels(rowNumber);
        if (sectionNumber === 0) {
          this.getTransAnimDefinition(shiftPixels);
          this.view.segTransfersList.animateRows({
            rows: [{
              sectionIndex: sectionNumber,
              rowIndex: rowNumber
            }],
            widgets: ['flxRow'],
            animation: self.swipeObj
          })
        }
      },
    
      animateRight: function(rowNumber, sectionNumber) {
        var self = this;
        if (sectionNumber === 0) {
          this.getTransAnimDefinition("0dp");
          this.view.segTransfersList.animateRows({
            rows: [{
              sectionIndex: sectionNumber,
              rowIndex: rowNumber
            }],
            widgets: ['flxRow'],
            animation: self.swipeObj
          })
        }
      },		
    
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
    
    getShiftPixels: function(rowNumber) {
      var isSwipeButton1Visible = this.view.segTransfersList.data[rowNumber]["flxSwipeBtn1"]["isVisible"];
      var isSwipeButton2Visible = this.view.segTransfersList.data[rowNumber]["flxSwipeBtn2"]["isVisible"];
      if (isSwipeButton1Visible && isSwipeButton2Visible) {
        return "-140dp";
      }
      else if (!isSwipeButton1Visible && !isSwipeButton2Visible) {
        return "0dp";
      }
      return "-70dp";
    },
    
    getWidgetDataMap: function() {
      return {
        "flxRow" : "flxRow",
        "flxSeparator":"flxSeparator",
        "flxGroup1" : "flxGroup1",
        "flxGroup2" : "flxGroup2",
        "flxGroup3" : "flxGroup3",
        "flxGroup4" : "flxGroup4",
        "flxIcon1" : "flxIcon1",
        "flxIcon2" : "flxIcon2",
        "flxIcon3" : "flxIcon3",
        "flxIcon4" : "flxIcon4",
        "imgIcon1" : "imgIcon1",
        "imgIcon2" : "imgIcon2",
        "imgIcon3" : "imgIcon3",
        "imgIcon4" : "imgIcon4",
        "lblField1" : "lblField1",
        "lblField2" : "lblField2",
        "lblField3" : "lblField3",
        "lblField4" : "lblField4",
        "flxSwipeBtn1" : "flxSwipeBtn1",
        "flxSwipeBtn2" : "flxSwipeBtn2",
        "imgSwipeBtn1" : "imgSwipeBtn1",
        "imgSwipeBtn2" : "imgSwipeBtn2",
        "lblSwipeBtn1Text" : "lblSwipeBtn1Text",
        "lblSwipeBtn2Text" : "lblSwipeBtn2Text"
      };
    },
    
    onScrollEnd: function() {
      var self = this;
      if (self.globalState === "search")
        return;
      this.onRequestStart();
      self.cacheUtils.applyPagination(self.globalOffset, self.getFieldValue(self._paginatedRecords));
      self.globalOffset = self.globalOffset + Number(self._paginatedRecords);
      //var records = self.fetchRecordsFromCache(self.globalOffset);
      //this.appendTransfersList(records);
    },
    
        /**
     * Component setContext
     * To collect the context object required for the component 
     * context{JSONobject} - account object 
     */
    setContext:function(context){
      var self = this;
      try
      {
        this.context=context;
        this.response = "";
        this.additionalParams = "";
        this.searchVariable = 0;
        this.parserUtilsManager.setContext(this.context);
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in the preshow of the component.",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    
    appendTransfersList: function(response) {
      var self = this;
      try{
        response = this.modifySegmentData(response);
        this.view.segTransfersList.widgetDataMap = self.getWidgetDataMap();
        this.view.segTransfersList.addAll(response);
        this.view.forceLayout();
        this.onRequestEnd();
      } catch(err) {
        var errorObj = {
          "errorInfo": "Error in getTransactionsDetails",
          "errorLevel": "Configuration",
          "error": err
        };
        self.onError(errorObj);
      }
    },
    
    deleteRow: function(rowIndex) {
      var scope = this;
      var basicProperties = {
        "message": scope.getFieldValue(scope._alertMessageText),
        "alertType": constants.ALERT_TYPE_CONFIRMATION,
        "yesLabel": scope.getFieldValue(scope._yesLabelText),
        "noLabel": scope.getFieldValue(scope._noLabelText),
        "alertHandler": scope.deleteHandler.bind(scope, rowIndex)
      };
      var pspConfig = {};
      kony.ui.Alert(basicProperties, pspConfig);   
    },
    
    deleteHandler: function(rowIndex, response) {
      var scope = this;
      if (response === true) {
        scope.onRequestStart();
        try {
          var deleteOperationName = this.getDeleteOperationName(rowIndex);
          this.transfersListDAO.deleteTransaction(scope._serviceNameDel, deleteOperationName, scope._objectNameDel, scope.getCriteriaDelete(rowIndex), scope.processResponseDel, scope.onDeleteFailure);
        } catch (err) {
          this.onRequestEnd();
          var errorObj = {
            "errorInfo": "Error in doing service call to fetch transactions",
            "errorLevel": "Business",
            "error": err
          };
          scope.onError(errorObj);
        }
      }
    },
    
    getDeleteOperationName: function(rowIndex) {
      var contractObject = this.getFieldValue(this._operationNameDel);
      if (typeof(contractObject) == "string") return contractObject;
      else {
        if (contractObject.hasOwnProperty("mapping")) {
        	var mappingString = contractObject["mapping"];
          	return contractObject[this.view.segTransfersList.data[rowIndex][mappingString]];
        }
        else {
          kony.print("Invalid Contract");
        }
      }
    },
    
    getCriteriaDelete: function(rowIndex) {
      var scope = this;
      try{
		var criteriaObject = JSON.parse(scope._getCriteriaDel);
        for (var key in criteriaObject) {
          var keyToBeSearched = scope.getFieldValue(criteriaObject[key]);
          if (scope.view.segTransfersList.data[rowIndex][keyToBeSearched]) {
          	criteriaObject[key] = scope.view.segTransfersList.data[rowIndex][keyToBeSearched];
          }
          else {
            criteriaObject[key] = keyToBeSearched;
          }
        }
        return criteriaObject;
      }catch(err) {
        var errorObj =
            {
              "errorInfo" : "Error in setting the criteria",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    
    processResponseDel: function(response) {
      var scope = this;
      if (response.hasOwnProperty("errcode") || response.hasOwnProperty("dbpErrCode")) {
        scope.onDeleteFailure(response);
      }
      else {
      	scope.isDeleteTriggered = true;
      	scope.globalOffset = 0;
      	scope.cacheUtils.offset = 0;
      	if (scope._dataAvailability === "Service calls by component") {
        	scope.getTransfersList(response);
      	}
      	else {
        	scope.dataRequestCallback(response);
      	}
      }  
    },
    
    onDeleteFailure: function(error) {
      this.onRequestEnd();
      if (error.error) {
        error = error.error;
      }
      var errMsg, isServiceFailure, resError, res;
      if (error.opstatus == 1011 || error.errcode == 1011 || error.opstatus == 1023 || error.errcode == 1023)
      {
        if(kony.os.deviceInfo().name === "thinclient" && kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY)===false){
          location.reload(); //todo later so that it can be in sync with RB
        }
        else{
          isServiceFailure = true;
          if(error.errmsg){
            errMsg = error.errmsg;
          }
          else if(error.dbpErrMsg)
          	errMsg = error.dbpErrMsg;
          else{
            errMsg = kony.i18n.getLocalizedString("kony.mb.An.error.occurred.while.making.the.request.");
          }
        }
      }
      else
      {
        isServiceFailure = false;
        if(error.errmsg)
          errMsg = error.errmsg;
        else if(error.dbpErrMsg)
          errMsg = error.dbpErrMsg;
        else
          errMsg = kony.i18n.getLocalizedString("kony.mb.An.Internal.Error.occured.Please.try.after.sometime.");
      }
      resError={"errorMessage":errMsg,"isServerUnreachable":isServiceFailure,"serverErrorRes":error};
      res={"status":false,"errmsg":resError};
      this.onDeleteError(res.errmsg);
    },
    
    onSearch: function(searchText) {
      var self = this;
      if (!this.isEmptyNullUndefined(searchText)) {
      	self.globalOffset = 0;
      	self.cacheUtils.offset = 0;  
      	self.onRequestStart();
      	self.cacheUtils.applySearch(self.getFieldValue(self._searchFields), searchText);
      }
      else {
        self.onRequestStart();
      	//self.cacheUtils.applySearch(self.getFieldValue(self._searchFields), searchText);
        if(this.response !== "" && this.additionalParams !== ""){
          this.view.flxNoTransactions.isVisible= false;
          this.view.flxTransfersList.isVisible = true;
          this.view.segTransfersList.setData(this.response);
          self.globalState = this.additionalParams.state;
          } else {
            self.cacheUtils.applySearch(self.getFieldValue(self._searchFields), searchText);
          }
          self.globalOffset = self.globalState + Number(self._paginatedRecords); 
          self.onRequestEnd();
      }
    },
    
    onFilterSelect: function(filterValue) {
       var self = this;
      self.globalOffset = 0;
      self.cacheUtils.offset = 0;
      self.onRequestStart();
      self.cacheUtils.applyFilter(self._filterParams, filterValue);
      self.globalOffset = self.globalOffset + Number(self._paginatedRecords); 
    }
    
    
    
    
    
    
    

  };
});