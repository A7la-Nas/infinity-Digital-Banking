define(['./ParserUtilsManager','./swiftLookupUtility','./SwiftLookUpDAO'],function(ParserUtilsManager,swiftLookupUtility,SwiftLookUpDAO) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      //declaration for Breakpoints in the group:Config
      this._BREAKPTS="";
      //declaration for Description in the group:Context
      this._swiftLookupDescription="";
      //declaration for Header in the group:Context
      this._swiftLookupHeader="";
      //declaration for Object Name in the group:Swift Lookup Service
      this._lookupObjectName="";
      //declaration for Operation Name in the group:Swift Lookup Service
      this._lookupOperationName="";

      //declaration for lookupIdentifier in the group:Swift Lookup Service
      this._lookupIdentifier="";
      //declaration for Search Field 1 Label in the group:Context
      this._searchField1Label="";
      //declaration for Search Field 1 Value in the group:Context
      this._searchField1Value="";
      //declaration for Search Field 2 Label in the group:Context
      this._searchField2Label="";

      //declaration for Search Field 2 Value in the group:Context
      this._searchField2Value="";

      //declaration for Search Field 3 Label in the group:Context
      this._searchField3Label="";

      //declaration for Search Field 3 Value in the group:Context
      this._searchField3Value="";

      //declaration for Search Field 4 Label in the group:Context
      this._searchField4Label="";

      //declaration for Search Field 4 Value in the group:Context
      this._searchField4Value="";

      //declaration for Column1 Label in the group:Context
      this._lblColumn1="";

      //declaration for Column2 Label in the group:Context
      this._lblColumn2="";

      //declaration for Column1 Label Value in the group:Context
      this._lblColumn1Value="";

      //declaration for Column2 Label Value in the group:Context
      this._lblColumn2Value="";

      //declaration for Column3 Label Value in the group:Context
      this._lblColumn3Value="";

      this._emptyResponseMessage = "";
      this._infoIcon = "";

      this._cacheEnabled = "";
      this.searchData = [];
	  
      //declaration for Search Button in the group:Context
      this._btnSearch="";

      //declaration for Swift lookup select Label in the group:Context
      this._sknSelectLabel="";
      this._txtBoxSkn = "";
      this._fieldLabelSkn = "";
      this._fieldValueSkn = "";
      this.txtBoxMandatorySkn = "";
      this.parserUtilsManager = new ParserUtilsManager();
      this.swiftLookupUtility = new swiftLookupUtility();
      this.swiftLookUpDAO = new SwiftLookUpDAO();
      this.formScope = "";
      this.context = {};
      this.textInputsMapping = {};
      this.componentContext = {};
      this.ParsedValues = {
        "SearchField1Label" : "",
        "SearchField2Label" : "",
        "SearchField3Label" : "",
        "SearchField4Label" : "",
        "SearchField1Value" : "",
        "SearchField2Value" : "",
        "SearchField3Value" : "",
        "SearchField4Value" : "",
        "Column1Label" : "",
        "Column2Label" : "",
        "EmptySearchResultMessage" : "",
        "Description" : "",
        "Header" : "",
        "SearchButtonLabel" : "",
        "Column1Value" : "",        
        "Column2Value" : "",
        "Column3Value" : "",
        "InfoIcon" : "",
        "TextBoxSkn" : "",
        "TextBoxMantatorySkin" : "",
        "FieldLabelSkin" : ""       
      };

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {     
      //setter method for Breakpoints in the group:Config
      defineSetter(this, "BREAKPTS", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._BREAKPTS=val;
        }
      });

      //getter method for Breakpoints in the group:Config
      defineGetter(this, "BREAKPTS", function() {
        return this._BREAKPTS;
      });
      //setter method for Description in the group:Context
      defineSetter(this, "swiftLookupDescription", function(val) {
        if((typeof val=='string') && (val != "")){
          this._swiftLookupDescription=val;
        }
      });

      //getter method for Description in the group:Context
      defineGetter(this, "swiftLookupDescription", function() {
        return this._swiftLookupDescription;
      });

      //setter method for Object Name in the group:Swift Lookup Service
      defineSetter(this, "lookupObjectName", function(val) {
        if((typeof val=='string') && (val != "")){
          this._lookupObjectName=val;
        }
      });

      //getter method for Object Name in the group:Swift Lookup Service
      defineGetter(this, "lookupObjectName", function() {
        return this._lookupObjectName;
      }); 
      //setter method for lookupServiceName in the group:Swift Lookup Service
      defineSetter(this, "lookupServiceName", function(val) {
        if((typeof val=='string') && (val != "")){
          this._lookupServiceName=val;
        }
      });

      //getter method for lookupServiceName in the group:Swift Lookup Service
      defineGetter(this, "lookupServiceName", function() {
        return this._lookupServiceName;
      }); 

      //setter method for Header in the group:Context
      defineSetter(this, "swiftLookupHeader", function(val) {
        if((typeof val=='string') && (val != "")){
          this._swiftLookupHeader=val;
        }
      });

      //getter method for Header in the group:Context
      defineGetter(this, "swiftLookupHeader", function() {
        return this._swiftLookupHeader;
      });

      //setter method for Operation Name in the group:Swift Lookup Service
      defineSetter(this, "lookupOperationName", function(val) {
        if((typeof val=='string') && (val != "")){
          this._lookupOperationName=val;
        }
      });

      //getter method for Operation Name in the group:Swift Lookup Service
      defineGetter(this, "lookupOperationName", function() {
        return this._lookupOperationName;
      });

      //setter method for Search Field 1 Label in the group:Context
      defineSetter(this, "searchField1Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._searchField1Label=val;
        }
      });

      //getter method for Search Field 1 Label in the group:Context
      defineGetter(this, "searchField1Label", function() {
        return this._searchField1Label;
      });

      //setter method for lookupIdentifier in the group:Swift Lookup Service
      defineSetter(this, "lookupIdentifier", function(val) {
        if((typeof val=='string') && (val != "")){
          this._lookupIdentifier=val;
        }
      });

      //getter method for lookupIdentifier in the group:Swift Lookup Service
      defineGetter(this, "lookupIdentifier", function() {
        return this._lookupIdentifier;
      });

      //setter method for Search Field 2 Label in the group:Context
      defineSetter(this, "searchField2Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._searchField2Label=val;
        }
      });

      //getter method for Search Field 2 Label in the group:Context
      defineGetter(this, "searchField2Label", function() {
        return this._searchField2Label;
      });

      //setter method for Search Field 2 Value in the group:Context
      defineSetter(this, "searchField2Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._searchField2Value=val;
        }
      });

      //getter method for Search Field 2 Value in the group:Context
      defineGetter(this, "searchField2Value", function() {
        return this._searchField2Value;
      });

      //setter method for Search Field 3 Label in the group:Context
      defineSetter(this, "searchField3Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._searchField3Label=val;
        }
      });

      //getter method for Search Field 3 Label in the group:Context
      defineGetter(this, "searchField3Label", function() {
        return this._searchField3Label;
      });

      //setter method for Search Field 3 Value in the group:Context
      defineSetter(this, "searchField3Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._searchField3Value=val;
        }
      });

      //getter method for Search Field 3 Value in the group:Context
      defineGetter(this, "searchField3Value", function() {
        return this._searchField3Value;
      });

      //setter method for Search Field 4 Label in the group:Context
      defineSetter(this, "searchField4Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._searchField4Label=val;
        }
      });

      //getter method for Search Field 4 Label in the group:Context
      defineGetter(this, "searchField4Label", function() {
        return this._searchField4Label;
      });

      //setter method for Search Field 4 Value in the group:Context
      defineSetter(this, "searchField4Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._searchField4Value=val;
        }
      });

      //getter method for Search Field 4 Value in the group:Context
      defineGetter(this, "searchField4Value", function() {
        return this._searchField4Value;
      });

      //setter method for Search Field 1 Value in the group:Context
      defineSetter(this, "searchField1Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._searchField1Value=val;
        }
      });

      //getter method for Search Field 1 Value in the group:Context
      defineGetter(this, "searchField1Value", function() {
        return this._searchField1Value;
      });

      //setter method for Column1 Label in the group:Context
      defineSetter(this, "lblColumn1", function(val) {
        if((typeof val=='string') && (val != "")){
          this._lblColumn1=val;
        }
      });

      //getter method for Column1 Label in the group:Context
      defineGetter(this, "lblColumn1", function() {
        return this._lblColumn1;
      });

      //setter method for Column2 Label in the group:Context
      defineSetter(this, "lblColumn2", function(val) {
        if((typeof val=='string') && (val != "")){
          this._lblColumn2=val;
        }
      });

      //getter method for Column2 Label in the group:Context
      defineGetter(this, "lblColumn2", function() {
        return this._lblColumn2;
      });

      //setter method for Column1 Label Value in the group:Context
      defineSetter(this, "lblColumn1Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._lblColumn1Value=val;
        }
      });

      //getter method for Column1 Label Value in the group:Context
      defineGetter(this, "lblColumn1Value", function() {
        return this._lblColumn1Value;
      });

      //setter method for Column2 Label Value in the group:Context
      defineSetter(this, "lblColumn2Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._lblColumn2Value=val;
        }
      });

      //getter method for Column2 Label Value in the group:Context
      defineGetter(this, "lblColumn2Value", function() {
        return this._lblColumn2Value;
      });

      //setter method for Column3 Label Value in the group:Context
      defineSetter(this, "lblColumn3Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._lblColumn3Value=val;
        }
      });

      //getter method for Column3 Label Value in the group:Context
      defineGetter(this, "lblColumn3Value", function() {
        return this._lblColumn3Value;
      });
      //setter method for emptyResponseMessage Label Value in the group:Context
      defineSetter(this, "emptyResponseMessage", function(val) {
        if((typeof val=='string') && (val != "")){
          this._emptyResponseMessage=val;
        }
      });

      //getter method for emptyResponseMessage Label Value in the group:Context
      defineGetter(this, "emptyResponseMessage", function() {
        return this._emptyResponseMessage;
      });
      //setter method for infoIcon Label Value in the group:Icon
      defineSetter(this, "infoIcon", function(val) {
        if((typeof val=='string') && (val != "")){
          this._infoIcon=val;
        }
      });

      //getter method for infoIcon Label Value in the group:Icon
      defineGetter(this, "infoIcon", function() {
        return this._infoIcon;
      });

      //setter method for Search Button in the group:Context
      defineSetter(this, "btnSearch", function(val) {
        if((typeof val=='string') && (val != "")){
          this._btnSearch=val;
        }
      });

      //getter method for Search Button in the group:Context
      defineGetter(this, "btnSearch", function() {
        return this._btnSearch;
      });

      //setter method for Swift lookup select Label in the group:Context
      defineSetter(this, "sknSelectLabel", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknSelectLabel=val;
        }
      });

      //getter method for Swift lookup select Label in the group:Context
      defineGetter(this, "sknSelectLabel", function() {
        return this._sknSelectLabel;
      });
      //setter method for txtBoxSkn in the group:Skin
      defineSetter(this, "txtBoxSkn", function(val) {
        if((typeof val=='string') && (val != "")){
          this._txtBoxSkn=val;
        }
      });

      //getter method for txtBoxSkn in the group:Skin
      defineGetter(this, "txtBoxSkn", function() {
        return this._txtBoxSkn;
      });
      //setter method for txtBoxMandatorySkn in the group:Skin
      defineSetter(this, "txtBoxMandatorySkn", function(val) {
        if((typeof val=='string') && (val != "")){
          this._txtBoxMandatorySkn=val;
        }
      });

      //getter method for txtBoxSkn in the group:Skin
      defineGetter(this, "txtBoxMandatorySkn", function() {
        return this._txtBoxMandatorySkn;
      });
      //setter method for fieldLabelSkn in the group:Skin
      defineSetter(this, "fieldLabelSkn", function(val) {
        if((typeof val=='string') && (val != "")){
          this._fieldLabelSkn=val;
        }
      });

      //getter method for fieldLabelSkn in the group:Skin
      defineGetter(this, "fieldLabelSkn", function() {
        return this._fieldLabelSkn;
      });
      //setter method for fieldValueSkn in the group:Skin
      defineSetter(this, "fieldValueSkn", function(val) {
        if((typeof val=='string') && (val != "")){
          this._fieldValueSkn=val;
        }
      });

      //getter method for fieldValueSkn in the group:Skin
      defineGetter(this, "fieldValueSkn", function() {
        return this._fieldValueSkn;
      });
      defineGetter(this, 'cacheEnabled', () => {
        return this._cacheEnabled;
      });
      defineSetter(this, 'cacheEnabled', value => {
        this._cacheEnabled = value;
      });
    },
    preshow : function(){
     
      this.initActions();

    },
    postshow : function(){

    },
    onBreakPointChange : function(){
       this.storeParsedValues();
      this.setUI();
      this.populateTextInputs();
    },
    setComponentConfigs: function() {
     
      this.parserUtilsManager.setBreakPointConfig(this.getParsedValue(this.getParsedValue(this._BREAKPTS)));
    },
    setUI : function(){

      this.view.lblLookupTitle.text = this.ParsedValues.Header;
      this.view.lblLookupDescription.text = this.ParsedValues.Description;
      this.view.lblSearchField1.text = this.ParsedValues.SearchField1Label;
      this.view.lblSearchField2.text = this.ParsedValues.SearchField2Label;
      this.view.lblSearchField3.text = this.ParsedValues.SearchField3Label;
      this.view.lblSearchField4.text = this.ParsedValues.SearchField4Label; 
    },

    setFocusToClose: function(){
      this.view.flxLookupClose.setActive(true);
    },

    initializePopup : function(context){
      this.setContext(this, context);
       this.setComponentConfigs();
      this.storeParsedValues();
      this.setUI();  
      this.populateTextInputs();    
      this.setSkins();
      this.view.txtBoxSearchField1.text = "";
      this.view.txtBoxSearchField2.text = "";
      this.view.txtBoxSearchField3.text = "";
      this.view.txtBoxSearchField4.text = "";
      if(this.getParsedValue(this._cacheEnabled) && this.searchData.length === 0)
          {
            this.setCacheData();
          }
       if(kony.application.getCurrentBreakpoint() ===640){
           this.view.flxMobLookupHeader.setVisibility(true);
          this.view.flxLookupHeader.setVisibility(false);
        }else{
         
           this.view.flxMobLookupHeader.setVisibility(false);
          this.view.flxLookupHeader.setVisibility(true);
        }
      this.view.segLookupRecords.setData([]);
      this.view.lblLookupTitle.setActive(true);
    },
    /**
     * storeParsedValues
     * @api : storeParsedValues
     * Method to parse contract from parent component and assign it in ParsedValues array.
     * @return : NA
     */
    storeParsedValues : function(){
      try{
        this.ParsedValues.SearchField1Label  = this.getLabelText(this.getParsedValue(this._searchField1Label));
        this.ParsedValues.SearchField2Label = this.getLabelText(this.getParsedValue(this._searchField2Label));
        this.ParsedValues.SearchField3Label = this.getLabelText(this.getParsedValue(this._searchField3Label));
        this.ParsedValues.SearchField4Label = this.getLabelText(this.getParsedValue(this._searchField4Label));
        this.ParsedValues.SearchField1Value = this.getParsedValue(this.getParsedValue(this._searchField1Value));
        this.ParsedValues.SearchField2Value = this.getParsedValue(this.getParsedValue(this._searchField2Value));
        this.ParsedValues.SearchField3Value = this.getParsedValue(this.getParsedValue(this._searchField3Value));
        this.ParsedValues.SearchField4Value =this.getParsedValue(this.getParsedValue(this._searchField4Value));
        this.ParsedValues.Column1Label = this.getLabelText(this.getParsedValue(this._lblColumn1));
        this.ParsedValues.Column2Label = this.getLabelText(this.getParsedValue(this._lblColumn2));
        this.ParsedValues.Header = this.getLabelText(this.getParsedValue(this._swiftLookupHeader));
        this.ParsedValues.Description = this.getLabelText(this.getParsedValue(this._swiftLookupDescription));
        this.ParsedValues.EmptySearchResultMessage = this.getLabelText(this.getParsedValue(this._emptyResponseMessage));
        this.ParsedValues.InfoIcon = this.getParsedImgSource(this.getParsedValue(this._infoIcon)).img;
      } catch(err){
        var errorObj =
            {
              "errorInfo" : "Error in getting the parsed value from contracts",
              "errorLevel" : "",
              "error": err
            };

      }
    },
    setSkins : function(){
      this.view.lblLookupTitle.skin = this.getParsedSkin(this.getParsedSkin(this._fieldValueSkn)); 
      this.view.lblLookupDescription.skin = this.getParsedSkin(this.getParsedSkin(this._fieldValueSkn)); 
      this.view.lblLookupColumn1.skin = this.getParsedSkin(this.getParsedSkin(this._fieldLabelSkn));
      this.view.lblLookupColumn2.skin = this.getParsedSkin(this.getParsedSkin(this._fieldLabelSkn));
      this.view.lblSearchField1.skin = this.getParsedSkin(this.getParsedSkin(this._fieldLabelSkn)); 
      this.view.lblSearchField2.skin = this.getParsedSkin(this.getParsedSkin(this._fieldLabelSkn));
      this.view.lblSearchField3.skin = this.getParsedSkin(this.getParsedSkin(this._fieldLabelSkn));
      this.view.lblSearchField4.skin = this.getParsedSkin(this.getParsedSkin(this._fieldLabelSkn));
      this.view.txtBoxSearchField1.skin = this.getParsedSkin(this.getParsedSkin(this._txtBoxSkn));
      this.view.txtBoxSearchField2.skin = this.getParsedSkin(this.getParsedSkin(this._txtBoxSkn));
      this.view.txtBoxSearchField3.skin = this.getParsedSkin(this.getParsedSkin(this._txtBoxSkn));
      this.view.txtBoxSearchField4.skin = this.getParsedSkin(this.getParsedSkin(this._txtBoxSkn));
    },
    getLabelText: function(contractJSON) {

      let labelText = this.getParsedValue(contractJSON,kony.application.getCurrentBreakpoint());
      return labelText ? labelText : "";
    },
    getParsedSkin: function(contractJSON) {

      let sknValue = this.getParsedValue(contractJSON,kony.application.getCurrentBreakpoint());
      return sknValue ? sknValue : "";
    },
    getParsedValue: function(property, selectedValue) {
      try{
        property = JSON.parse(property);
      }
      catch(e){
        property = property;
        kony.print(e);
      }
      if(typeof(property) === "string"){
        return this.getProcessedText(property);
      }
      else{
        if(selectedValue)
          return this.getProcessedText(this.parserUtilsManager.getComponentConfigParsedValue(property,selectedValue));
        else
          return property;
      }
    },
    getProcessedText: function(text) {
      return this.parserUtilsManager.getParsedValue(text);
    },
    initActions: function() {
      this.view.flxLookupClose.accessibilityConfig = {
        a11yLabel: "Close this lookup dialog",
        a11yARIA: {
          tabindex: 0,
          role: "button"
        }
      };
      this.view.flxLookupClose.onClick = this.getOnClick;
      this.view.btnBankClearingLookupSearch.onClick = this.searchSwiftCode;
  },
  getOnClick: function() {
      var form = kony.application.getCurrentForm();
      this.removeSwiftLookup();
      form.unifiedAddBeneficiary.setLookupFocus();
  },  

    setCacheData : function()
    {
      var scope = this;
      var searchCriteria = { "bankName":"", "country":"", "city":"","branch":""};
      var objSvcName = this.getParsedValue(this._lookupServiceName);
      var objName = this.getParsedValue(this._lookupObjectName);
      var operationName = this.getParsedValue(this._lookupOperationName);
      this.swiftLookUpDAO.fetchSwiftData
      (objSvcName,objName,operationName,searchCriteria,storeCacheData.bind(this),onError.bind(this));
   
      function storeCacheData(response)
      {     
        scope.searchData.push(response.swiftCodes);
        kony.application.dismissLoadingScreen();
      }
      
       function onError(onError){ 
        kony.application.dismissLoadingScreen();
        var method = "swiftLookupError";
        this.formScope[method](onError.errmsg);
      }
      },

    /**
     * searchSwiftCode
     * @api : searchSwiftCode
     * Method to get  swift code to the value which was entered in lookup popup text boxs
     * @return : NA
     */
    searchSwiftCode : function(){
      var scope = this;
      var searchCriteria = { "bankName":"", "bankClearingCode":"", "city":"","branch":""
                           };
        var self = this;
      var objSvcName = this.getParsedValue(this._lookupServiceName);
      var objName = this.getParsedValue(this._lookupObjectName);
      var operationName = this.getParsedValue(this._lookupOperationName);
      var identifier = this.getParsedValue(this._lookupIdentifier);
      searchCriteria.bankName = this.view.tbxBankClearingLookupSearch2.text;
      searchCriteria.branch = this.view.tbxBankClearingLookupSearch3.text;
      searchCriteria.bankClearingCode = this.view.tbxBankClearingLookupSearch1.text;
      // searchCriteria.city = this.view.txtBoxSearchField4.text;
    
    var cacheEnabled = this.getParsedValue(this._cacheEnabled);
      if (this.searchData.length > 0 && cacheEnabled === "true") {
				var searchResult = [];
                searchResult["swiftCodes"] = this.getSearchResults(this.searchData[0], searchCriteria, "bic");
                this.onSuccessFetchSwifcode(searchResult, identifier)
            } else {
                this.swiftLookUpDAO.fetchSwiftData(objSvcName, objName, operationName, searchCriteria, this.onSuccessFetchSwifcode.bind(this), onError.bind(this),identifier);
            }
      function onError(onError){ 
        kony.application.dismissLoadingScreen();
        var method = "swiftLookupError";
        this.formScope[method](onError.errmsg);
      }
    },
    onSuccessFetchSwifcode : function(response,unicode){

      kony.application.dismissLoadingScreen();
      var list = response.swiftCodes;
      var formattedSearchArray=[];
      if(list != undefined){
        for(var i=0;i<list.length;i++){
          list[i]["bankAddress"] = list[i]["bankName"]+", "+list[i]["city"]+", "+list[i]["country"];
        }         

        this.parserUtilsManager.setResponseData(unicode, list);   

        var scope = this;

        var column1Value = this.getParsedValue(scope.getParsedValue(this._lblColumn1Value),kony.application.getCurrentBreakpoint());
        var column2Value = this.getParsedValue(scope.getParsedValue(this._lblColumn2Value),kony.application.getCurrentBreakpoint());
        var column3Value = this.getParsedValue(scope.getParsedValue(this._lblColumn3Value),kony.application.getCurrentBreakpoint());
        var  fieldValueSkn = this.getParsedValue(this.getParsedValue(this._fieldValueSkn),kony.application.getCurrentBreakpoint());
        var fieldLabelSkn = this.getParsedValue(this.getParsedValue(this._fieldLabelSkn),kony.application.getCurrentBreakpoint());

        if(kony.application.getCurrentBreakpoint() ===640){
          this.view.segLookupRecords.rowTemplate = "flxMobLookupRecord";
          this.view.flxMobLookupHeader.setVisibility(true);
          this.view.flxLookupHeader.setVisibility(false);
          this.view.segLookupRecords.widgetDataMap  =  {
            "lblLookupColumn1Value" : column1Value,
            "lblLookupColumnValue2" : column2Value,
            "lblLookupColumnValue3" : column3Value,
            "lblColumn1" : "lblColumn1",
            "lblColumn2" : "lblColumn2",
            "flxLookupRow" : "flxLookupRow"
          };
        }else{
          this.view.segLookupRecords.rowTemplate =  "flxLookupRecordList";
          this.view.flxMobLookupHeader.setVisibility(false);
          this.view.flxLookupHeader.setVisibility(true);
          this.view.segLookupRecords.widgetDataMap  =  {
            "lblLookupColumn1Value" : column1Value,
            "lblLookupColumnValue2" : column2Value,
            "lblLookupColumnValue3" : column3Value,
            "flxColumn3Value":"flxColumn3Value"
          };
        }
        for(var i=0;i<list.length;i++){
          var temp ={};         
          temp[column1Value] = {};
          temp[column2Value] = {};
          temp[column3Value] = {};
          temp[column1Value]["text"] = list[i][column1Value];
          temp[column1Value]["skin"] = fieldValueSkn;
          temp[column2Value]["text"] = list[i][column2Value];
          temp[column2Value]["skin"] = fieldValueSkn;
          temp[column3Value]["text"] = column3Value;
          temp["bankName"] = list[i]["bankName"];
          temp["flxColumn3Value"] = {"onClick": this.getSwiftData};
          if(kony.application.getCurrentBreakpoint() === 640){
            temp["lblColumn1"] = {};
            temp["lblColumn2"] = {};
            temp["lblColumn1"]["text"] = this.ParsedValues.Column1Label;
            temp["lblColumn1"]["skin"] = fieldLabelSkn;
            temp["lblColumn2"]["text"] = this.ParsedValues.Column2Label;
            temp["lblColumn2"]["skin"] = fieldLabelSkn;
            temp["flxLookupRow"] = {"onClick": this.getSwiftData};
          }
          formattedSearchArray.push(temp);
        }    
      }
      if(formattedSearchArray.length>0){
        this.view.segLookupRecords.setData(formattedSearchArray);

      }
      else{
        //logic to show empty message if search returns null
        this.view.segLookupRecords.rowTemplate = 'flxNoResultsFound';
        this.view.segLookupRecords.widgetDataMap = {"lblEmptyRecordMsg":"lblEmptyRecordMsg",
                                                    "imgInfoIcon":"imgInfoIcon"
                                                   };
        var noDataFound=[ 
          {lblEmptyRecordMsg: this.ParsedValues.EmptySearchResultMessage,imgInfoIcon :this.ParsedValues.InfoIcon }
        ];  
        this.view.segLookupRecords.setData(noDataFound);
        this.view.flxLookups.forceLayout();
      }     
    },
      
    getSearchResults: function(serviceData, searchValue,uniParam) {
      try {
        var scope = this;
        var emptyCount = 0;
        var searchData = [];
        for(var key in searchValue){
          searchValue[key] = searchValue[key].toLocaleLowerCase();
          if(!scope.isEmptyNullUndefined(serviceData) && !scope.isEmptyNullUndefined(searchValue[key]))
          {
            for (var i = 0; i < serviceData.length; i++)
            {
              if(serviceData[i][key] !== undefined){
                if(serviceData[i][key].toString().toLocaleLowerCase().includes(searchValue[key]))
                {
                  var existingCount = 0;
                  for(var j=0;j<searchData.length;j++){
                    if(serviceData[i][uniParam] === searchData[j][uniParam]){
                      existingCount++;
                    }
                  }
                  if(!existingCount > 0){
                    searchData.push(serviceData[i]);
                  }
                }
              }else{
                delete searchValue[key];
              }
            }
          }
          if(searchValue[key] === ""){
            emptyCount++;
          }
        }
        if(Object.keys(searchValue).length === emptyCount){
          searchData = serviceData;
        }
        return searchData;
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in getSearchData method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        scope.onError(errObj);
      }
    },
    /**
         * Component isEmptyNullUndefined
         * Verifies if the value is empty, null or undefined
         * data {string} - value to be verified
         * @return : {boolean} - validity of the value passed
         */
    isEmptyNullUndefined: function(data) {
      if (data === null || data === undefined || data === "")
        return true;

      return false;
    },

    getParsedImgSource: function(property) {
      try{
        property=JSON.parse(property);
      }
      catch(e){        
        kony.print(e);
      }      
      return property;
    },
    setContext: function(scope,context) {          
      this.context = context;
      if(this.formScope === ""){
        this.formScope = scope;
      }
      this.parserUtilsManager.setContext(this.context);
    },
    /**
     * getSwiftData
     * @api : getSwiftData
     * Method to get selected data from lookup table once row cliked in look up table
     * @return : NA
     */
    getSwiftData : function(){
      var method = "getLookupData";
      this.formScope[method](this.view.segLookupRecords.selectedRowItems);


    },
    /**
     * populateTextInputs
     * @api : populateTextInputs
     * Method to populate search text box fileds values
     * @return : NA
     */
    populateTextInputs: function()
    {

      var tbx1JSON = this.ParsedValues.SearchField1Value;
      if(tbx1JSON) {
        this.mapTextBoxValueToContext(tbx1JSON, "txtBoxSearchField1");
        this.setTextBoxPlaceHolder(tbx1JSON, "txtBoxSearchField1");
      }
      var tbx2JSON = this.ParsedValues.SearchField2Value;
      if(tbx2JSON) {
        this.mapTextBoxValueToContext(tbx2JSON, "txtBoxSearchField2");
        this.setTextBoxPlaceHolder(tbx2JSON, "txtBoxSearchField2");
      }
      var tbx3JSON = this.ParsedValues.SearchField3Value;
      if(tbx3JSON) {
        this.mapTextBoxValueToContext(tbx3JSON, "txtBoxSearchField3");
        this.setTextBoxPlaceHolder(tbx3JSON, "txtBoxSearchField3");
      }
      var tbx4JSON = this.ParsedValues.SearchField4Value;
      if(tbx4JSON) {
        this.mapTextBoxValueToContext(tbx4JSON, "txtBoxSearchField4");
        this.setTextBoxPlaceHolder(tbx4JSON, "txtBoxSearchField4");
      }            

    },
    /**
     * mapTextBoxValueToContext
     * @api : mapTextBoxValueToContext
     * maps the value of textbox to the context assigned in contracts
     * @return : NA
     */
    mapTextBoxValueToContext: function(contractJSON, textBoxID) {
      if(!this.swiftLookupUtility.isNullOrUndefinedOrEmpty(contractJSON) && !this.swiftLookupUtility.isNullOrUndefinedOrEmpty(contractJSON.mapping)){
        var inputMapper = contractJSON.mapping.substring(5,contractJSON.mapping.length-1);
        this.textInputsMapping[textBoxID] = inputMapper;
      }

    },
    /**
     * setTextBoxPlaceHolder
     * @api : setTextBoxPlaceHolder
     * maps the value of textbox to the placeholder assigned in contracts
     * @return : NA
     */
    setTextBoxPlaceHolder: function(contractJSON, tbxWidget) {
      if(!this.swiftLookupUtility.isNullOrUndefinedOrEmpty(contractJSON.placeHolder)) {
        var placeHolderValue = this.getParsedValue
        (contractJSON.placeHolder,kony.application.getCurrentBreakpoint());
        this.view[tbxWidget].placeholder =
          placeHolderValue ? placeHolderValue : "";

      }
    }

  };
});