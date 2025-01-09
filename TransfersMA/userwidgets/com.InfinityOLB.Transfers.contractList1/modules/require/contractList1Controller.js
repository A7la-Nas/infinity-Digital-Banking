define(['./ParserUtilsManager'], function (ParserUtilsManager) {

  return {
    
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.parserUtilsManager = new ParserUtilsManager();
      this._context="";
      this._parentScope="";

      //declaration for Block Title in the group:General
      this._blockTitle="";

      //declaration for Sub Title in the group:General
      this._subTitle="";

      //declaration for Row expanded skin in the group:Skins
      this._sknRowExpanded="";

      //declaration for Placeholder  in the group:Search 
      this._placeholderSearch="";

      //declaration for Row expand icon in the group:Images/Icons
      this._iconRowExpand="";

      //declaration for Breakpoints in the group:Component Config
      this._BREAKPTS="";

      //declaration for Button 1 in the group:Action Buttons
      this._button1="";

      //declaration for Response Path in the group:Data Grid
      this._responsePathDataGrid="";

      //declaration for Response Path in the group:Customer Info
      this._responsePathCustomerInfo="";

      //declaration for Column 1 in the group:Data Grid
      this._column1="";

      //declaration for Row hover skin in the group:Skins
      this._sknRowHover="";

      //declaration for Search icon in the group:Search 
      this._iconSearch="";

      //declaration for Row collapse icon in the group:Images/Icons
      this._iconRowCollapse="";

      //declaration for Button 2 in the group:Action Buttons
      this._button2="";

      //declaration for Field 1 in the group:Customer Info
      this._field1="";

      //declaration for Column 2 in the group:Data Grid
      this._column2="";

      //declaration for Row separator skin in the group:Skins
      this._sknRowSeperator="";

      //declaration for Column sort default in the group:Images/Icons
      this._iconColumnSort="";

      //declaration for Button 3 in the group:Action Buttons
      this._button3="";

      //declaration for Field 2 in the group:Customer Info
      this._field2="";

      //declaration for Column 3 in the group:Data Grid
      this._column3="";

      //declaration for Block Title Skin in the group:Skins
      this._sknBlockTitle="";

      //declaration for Column Sort Asc in the group:Images/Icons
      this._iconColumnSortAsc="";

      //declaration for Field 3 in the group:Customer Info
      this._field3="";

      //declaration for Sub Title Skin in the group:Skins
      this._sknSubTitle="";

      //declaration for Column Sort Desc in the group:Images/Icons
      this._iconColumnSortDsc="";

      //declaration for Checkbox Selected Icon in the group:Images/Icons
      this._iconCheckboxSelected="";

      //declaration for Column Header Skin in the group:Skins
      this._sknColumnHeader="";

      //declaration for Data Grid Label Skin in the group:Skins
      this._sknDataGridLabel="";

      //declaration for Checkbox Unselected Icon in the group:Images/Icons
      this._iconCheckboxUnselected="";

      //declaration for Customer Info Label Skin in the group:Skins
      this._sknCustomerInfoLabel="";

      //declaration for Search Textbox Skin in the group:Skins
      this._sknSearchTextbox="";

      //declaration for Search Placeholder Skin in the group:Skins
      this._sknSearchPlaceholder="";

      //declaration for Business Payee Icon in the group:Skins
      this._sknBusinessPayeeIcon="";

      //declaration for Personal Payee Icon in the group:Skins
      this._sknPersonalPayeeIcon="";

      //declaration for Action Button 1 Skin in the group:Skins
      this._sknActionButton1="";

      //declaration for Action Button 2 Skin in the group:Skins
      this._sknActionButton2="";

      //declaration for Action Button 3 Skin in the group:Skins
      this._sknActionButton3="";

    },

    initGettersSetters: function() { 
      //setter method for Block Title in the group:General
      defineSetter(this, "blockTitle", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._blockTitle=val;
        }
      });

      //getter method for Block Title in the group:General
      defineGetter(this, "blockTitle", function() {
        return this._blockTitle;
      });

      //setter method for Sub Title in the group:General
      defineSetter(this, "subTitle", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._subTitle=val;
        }
      });

      //getter method for Sub Title in the group:General
      defineGetter(this, "subTitle", function() {
        return this._subTitle;
      });

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

      //setter method for Placeholder  in the group:Search 
      defineSetter(this, "placeholderSearch", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._placeholderSearch=val;
        }
      });

      //getter method for Placeholder  in the group:Search 
      defineGetter(this, "placeholderSearch", function() {
        return this._placeholderSearch;
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

      //setter method for Breakpoints in the group:Component Config
      defineSetter(this, "BREAKPTS", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._BREAKPTS=val;
        }
      });

      //getter method for Breakpoints in the group:Component Config
      defineGetter(this, "BREAKPTS", function() {
        return this._BREAKPTS;
      });

      //setter method for Button 1 in the group:Action Buttons
      defineSetter(this, "button1", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._button1=val;
        }
      });

      //getter method for Button 1 in the group:Action Buttons
      defineGetter(this, "button1", function() {
        return this._button1;
      });

      //setter method for Response Path in the group:Data Grid
      defineSetter(this, "responsePathDataGrid", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._responsePathDataGrid=val;
        }
      });

      //getter method for Response Path in the group:Data Grid
      defineGetter(this, "responsePathDataGrid", function() {
        return this._responsePathDataGrid;
      });

      //setter method for Response Path in the group:Customer Info
      defineSetter(this, "responsePathCustomerInfo", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._responsePathCustomerInfo=val;
        }
      });

      //getter method for Response Path in the group:Customer Info
      defineGetter(this, "responsePathCustomerInfo", function() {
        return this._responsePathCustomerInfo;
      });

      //setter method for Column 1 in the group:Data Grid
      defineSetter(this, "column1", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._column1=val;
        }
      });

      //getter method for Column 1 in the group:Data Grid
      defineGetter(this, "column1", function() {
        return this._column1;
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

      //setter method for Search icon in the group:Search 
      defineSetter(this, "iconSearch", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._iconSearch=val;
        }
      });

      //getter method for Search icon in the group:Search 
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

      //setter method for Button 2 in the group:Action Buttons
      defineSetter(this, "button2", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._button2=val;
        }
      });

      //getter method for Button 2 in the group:Action Buttons
      defineGetter(this, "button2", function() {
        return this._button2;
      });

      //setter method for Field 1 in the group:Customer Info
      defineSetter(this, "field1", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field1=val;
        }
      });

      //getter method for Field 1 in the group:Customer Info
      defineGetter(this, "field1", function() {
        return this._field1;
      });

      //setter method for Column 2 in the group:Data Grid
      defineSetter(this, "column2", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._column2=val;
        }
      });

      //getter method for Column 2 in the group:Data Grid
      defineGetter(this, "column2", function() {
        return this._column2;
      });

      //setter method for Row separator skin in the group:Skins
      defineSetter(this, "sknRowSeperator", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknRowSeperator=val;
        }
      });

      //getter method for Row separator skin in the group:Skins
      defineGetter(this, "sknRowSeperator", function() {
        return this._sknRowSeperator;
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

      //setter method for Button 3 in the group:Action Buttons
      defineSetter(this, "button3", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._button3=val;
        }
      });

      //getter method for Button 3 in the group:Action Buttons
      defineGetter(this, "button3", function() {
        return this._button3;
      });

      //setter method for Field 2 in the group:Customer Info
      defineSetter(this, "field2", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field2=val;
        }
      });

      //getter method for Field 2 in the group:Customer Info
      defineGetter(this, "field2", function() {
        return this._field2;
      });

      //setter method for Column 3 in the group:Data Grid
      defineSetter(this, "column3", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._column3=val;
        }
      });

      //getter method for Column 3 in the group:Data Grid
      defineGetter(this, "column3", function() {
        return this._column3;
      });

      //setter method for Block Title Skin in the group:Skins
      defineSetter(this, "sknBlockTitle", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknBlockTitle=val;
        }
      });

      //getter method for Block Title Skin in the group:Skins
      defineGetter(this, "sknBlockTitle", function() {
        return this._sknBlockTitle;
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

      //setter method for Field 3 in the group:Customer Info
      defineSetter(this, "field3", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field3=val;
        }
      });

      //getter method for Field 3 in the group:Customer Info
      defineGetter(this, "field3", function() {
        return this._field3;
      });

      //setter method for Sub Title Skin in the group:Skins
      defineSetter(this, "sknSubTitle", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknSubTitle=val;
        }
      });

      //getter method for Sub Title Skin in the group:Skins
      defineGetter(this, "sknSubTitle", function() {
        return this._sknSubTitle;
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

      //setter method for Checkbox Selected Icon in the group:Images/Icons
      defineSetter(this, "iconCheckboxSelected", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._iconCheckboxSelected=val;
        }
      });

      //getter method for Checkbox Selected Icon in the group:Images/Icons
      defineGetter(this, "iconCheckboxSelected", function() {
        return this._iconCheckboxSelected;
      });

      //setter method for Column Header Skin in the group:Skins
      defineSetter(this, "sknColumnHeader", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknColumnHeader=val;
        }
      });

      //getter method for Column Header Skin in the group:Skins
      defineGetter(this, "sknColumnHeader", function() {
        return this._sknColumnHeader;
      });

      //setter method for Data Grid Label Skin in the group:Skins
      defineSetter(this, "sknDataGridLabel", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknDataGridLabel=val;
        }
      });

      //getter method for Data Grid Label Skin in the group:Skins
      defineGetter(this, "sknDataGridLabel", function() {
        return this._sknDataGridLabel;
      });

      //setter method for Checkbox Unselected Icon in the group:Images/Icons
      defineSetter(this, "iconCheckboxUnselected", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._iconCheckboxUnselected=val;
        }
      });

      //getter method for Checkbox Unselected Icon in the group:Images/Icons
      defineGetter(this, "iconCheckboxUnselected", function() {
        return this._iconCheckboxUnselected;
      });

      //setter method for Customer Info Label Skin in the group:Skins
      defineSetter(this, "sknCustomerInfoLabel", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknCustomerInfoLabel=val;
        }
      });

      //getter method for Customer Info Label Skin in the group:Skins
      defineGetter(this, "sknCustomerInfoLabel", function() {
        return this._sknCustomerInfoLabel;
      });

      //setter method for Search Textbox Skin in the group:Skins
      defineSetter(this, "sknSearchTextbox", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknSearchTextbox=val;
        }
      });

      //getter method for Search Textbox Skin in the group:Skins
      defineGetter(this, "sknSearchTextbox", function() {
        return this._sknSearchTextbox;
      });

      //setter method for Search Placeholder Skin in the group:Skins
      defineSetter(this, "sknSearchPlaceholder", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknSearchPlaceholder=val;
        }
      });

      //getter method for Search Placeholder Skin in the group:Skins
      defineGetter(this, "sknSearchPlaceholder", function() {
        return this._sknSearchPlaceholder;
      });

      //setter method for Business Payee Icon in the group:Skins
      defineSetter(this, "sknBusinessPayeeIcon", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknBusinessPayeeIcon=val;
        }
      });

      //getter method for Business Payee Icon in the group:Skins
      defineGetter(this, "sknBusinessPayeeIcon", function() {
        return this._sknBusinessPayeeIcon;
      });

      //setter method for Personal Payee Icon in the group:Skins
      defineSetter(this, "sknPersonalPayeeIcon", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknPersonalPayeeIcon=val;
        }
      });

      //getter method for Personal Payee Icon in the group:Skins
      defineGetter(this, "sknPersonalPayeeIcon", function() {
        return this._sknPersonalPayeeIcon;
      });

      //setter method for Action Button 1 Skin in the group:Skins
      defineSetter(this, "sknActionButton1", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknActionButton1=val;
        }
      });

      //getter method for Action Button 1 Skin in the group:Skins
      defineGetter(this, "sknActionButton1", function() {
        return this._sknActionButton1;
      });

      //setter method for Action Button 2 Skin in the group:Skins
      defineSetter(this, "sknActionButton2", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknActionButton2=val;
        }
      });

      //getter method for Action Button 2 Skin in the group:Skins
      defineGetter(this, "sknActionButton2", function() {
        return this._sknActionButton2;
      });

      //setter method for Action Button 3 Skin in the group:Skins
      defineSetter(this, "sknActionButton3", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknActionButton3=val;
        }
      });

      //getter method for Action Button 3 Skin in the group:Skins
      defineGetter(this, "sknActionButton3", function() {
        return this._sknActionButton3;
      });

    },
    
    /**
     * @api : setContext
     * To collect the context object required for the component. 
     * @param : context{JSONobject} - account object 
     * @return : NA
     */
    setContext: function(context) {
      this._context=context;
      if(this._context && this._context.hasOwnProperty('entitlement')){
        this.entitlementContext.features  = this.context.entitlement.features;
        this.entitlementContext.permissions = this.context.entitlement.permissions;
      }
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
          value = this.parserUtilsManager.getComponentConfigParsedValue(valueJson, kony.application.getCurrentBreakpoint());
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
    getProcessedText:function(text, responseArrayIndex){
      return this.parserUtilsManager.getParsedValue(text, responseArrayIndex);
    },

    setStaticData: function(){
        this.view.btnAction6.accessibilityConfig = {
            a11yLabel:"Continue to confirmation screen"
        };
        this.view.btnAction5.accessibilityConfig = {
            a11yLabel:"Back to add new account details"
        };
        this.view.btnAction4.accessibilityConfig = {
            a11yLabel:"Cancel add new account process"
        };
      if(this._blockTitle){
        this.view.lblHeader.text = this.getBreakPointTypeBasedValue(this._blockTitle);
      }
      if(this._subTitle){
        this.view.lblDescription.text = this.getBreakPointTypeBasedValue(this._subTitle);
      }
      if(this._placeHolderSearch){
        this.view.txtSearch.placeholder=this.getBreakPointTypeBasedValue(this._placeHolderSearch);
      }
      if(this._sknSearchPlaceholder){
        this.view.txtSearch.placeholderSkin=this.getBreakPointTypeBasedValue(this._sknSearchPlaceholder);
      }
      if(this._column1){
        this.view.lblCol1.text = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._column1)["text"]));
      }
      if(this._column2){
        this.view.lblCol2.text = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._column2)["text"]));
      }
      if(this._column3){
        this.view.lblColumn3.text = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._column3)["text"]));
      }
      if(this._button1){
        this.view.btnAction4.text = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._button1)["text"]));
        //this.view.btnAction4.toolTip = this.view.btnAction4.text;
      } else {
        this.view.btnAction4.setVisibility(false);
      }
      if(this._button2){
        this.view.btnAction5.text = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._button2)["text"]));
        //this.view.btnAction5.toolTip=this.view.btnAction5.text;
      } else {
        this.view.btnAction5.setVisibility(false);
      }
      if(this._button3){
        this.view.btnAction6.text = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._button3)["text"]));
        //this.view.btnAction6.toolTip=this.view.btnAction6.text;
      } else {
        this.view.btnAction6.setVisibility(false);
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
    
    getSkinForCurrentBreakpoint: function(input) {
      var breakpoint = kony.application.getCurrentBreakpoint();
      try {
        input = JSON.parse(input);
      } catch(e) {
        input = input;     
      }
      if(input.hasOwnProperty(breakpoint)) {
        return input[breakpoint]["skin"];
      } else if(input["default"]) {
        return input["default"]["skin"];
      }
      return input;
    },
    
    setSkins: function(){
      if(this._sknBlockTitle){
        this.view.lblHeader.skin = this.getSkinForCurrentBreakpoint(this._sknBlockTitle);
      }
      if(this._sknSubTitle){
        this.view.lblDescription.skin = this.getSkinForCurrentBreakpoint(this._sknSubTitle);
      }
      if(this._sknSearchTextbox){
        this.view.txtSearch.skin = this.getSkinForCurrentBreakpoint(this._sknSearchTextbox);
      }
      if(this._sknSearchPlaceholder){
        this.view.txtSearch.placeholderSkin = this.getSkinForCurrentBreakpoint(this._sknSearchPlaceholder);
      }
      if(this._sknColumnHeader){
        this.view.lblCol1.skin = this.getSkinForCurrentBreakpoint(this._sknColumnHeader);
        this.view.lblCol2.skin = this.getSkinForCurrentBreakpoint(this._sknColumnHeader);
        this.view.lblColumn3.skin = this.getSkinForCurrentBreakpoint(this._sknColumnHeader);
        this.view.lblCol4.skin = this.getSkinForCurrentBreakpoint(this._sknColumnHeader);
      }
      if(this._sknActionButton1){
        this.view.btnAction4.skin = this.getSkinForCurrentBreakpoint(this._sknActionButton1);
      }
      if(this._sknActionButton2){
        this.view.btnAction5.skin = this.getSkinForCurrentBreakpoint(this._sknActionButton2);
      }
      if(this._sknActionButton3){
        this.view.btnAction6.skin = this.getSkinForCurrentBreakpoint(this._sknActionButton3);
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
    btnActionOnClick : function(property, eventobject, context){
      try{
//         var index = context.rowIndex;
        var scope = this;
        var propertyValue = JSON.parse(property);
        var action = propertyValue["action"];
//         if(action.level === "Form"){
          this._parentScope[action.method](scope.view.segContract.data);
//         }
//         else{}
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

    preshow: function (data, editData) {
      this.initialiseComponent(data, editData);
      this.initializeSearchActions();
      this.initializeSortActions();
      //this.view
      //this.view.lblCheckBoxSelectAll.onTouchStart = this.toogleSelectAllCheckBox;
      this.view.flxCol4.onClick = this.toogleSelectAllCheckBox;

    },
    
    initializeSearchActions: function() {
      this.view.txtSearch.text = "";
      /*if(this._placeholderSearch) {
        if(this._placeholderSearch.includes("i18n")) {
          this.view.txtSearch.placeholder = kony.i18n.getLocalizedString(this._placeholderSearch);
        } else {
          this.view.txtSearch.placeholder = this._placeholderSearch;
        }
      }*/
      this.view.txtSearch.placeholder="Search by Contract or Identity Number";
      this.view.flxClear.setVisibility(false);
      this.view.flxClear.onClick = this.onSearchClearBtnClick.bind(this);
      this.view.txtSearch.onKeyUp = this.onTxtSearchKeyUp.bind(this);
      this.view.txtSearch.onDone = this.onSearchBtnClick.bind(this);
      this.view.flxSearchBtn.onClick = this.onSearchBtnClick.bind(this);
      this.view.btnAction4.onClick = this.btnActionOnClick.bind(this, this._button1);
      this.view.btnAction5.onClick = this.btnActionOnClick.bind(this, this._button2);
      this.view.btnAction6.onClick = this.btnActionOnClick.bind(this,this._button3);
    },
    
    initializeSortActions: function() {
      this.view.imgCol1.src = "sorting_previous.png";
      this.view.imgCol1.onTouchEnd = this.sortByContractName.bind(this);
      this.view.flxCol1.onClick = this.sortByContractName.bind(this);
      this.view.imgCol2.src = "sorting.png";
      this.view.imgCol2.onTouchEnd = this.sortByIdentityNumber.bind(this);
      this.view.flxCol2.onClick = this.sortByIdentityNumber.bind(this);
    },

    initialiseComponent: function (data, editData) {
      this.initializeSearchActions();
      this.initializeSortActions();
      //this.view.lblCheckBoxSelectAll.onTouchStart = this.toogleSelectAllCheckBox;
      this.view.flxCol4.onClick = this.toogleSelectAllCheckBox;
      this.setStaticData();
      this.setSkins();
      this.view.flxNoResultsFound.setVisibility(false);
      this.setDataForContracts(data, editData);
      this.setDataForSelecAllCheckBox();

    },

    disableConfirmButton: function (value) {
      if (value === true) {
        this.view.btnAction6.setEnabled(false);
        this.view.btnAction6.skin = "sknBtnBlockedSSPFFFFFF15Px";
      } else if (value === false) {
        this.view.btnAction6.setEnabled(true);
        this.view.btnAction6.skin = "sknBtnNormalSSPFFFFFF4vs";
      } else {
        this.disableConfirmButton(this.view.segContract.data.every(x => {
          return x[0].lblCheckBoxSelect.text === "D";
        }));
      }

    },

    setSegWidgetDataMap: function () {
      return {
        "flxDropdown": "flxDropdown",
        "imgDropdown": "imgDropdown",
        "lblDropdown": "lblDropdown",
        "flxContract": "flxContract",
        "lblContract": "lblContract",
        "lblContract1": "lblContract1",
        "flxIdnetityNumber": "flxIdnetityNumber",
        "lblIdentityNumber": "lblIdentityNumber",
        "lblIdentityNumber1": "lblIdentityNumber1",
        "flxCIF": "flxCIF",
        "lblCIF": "lblCIF",
        "lblCIF1": "lblCIF1",
        "flxRowCheckBox": "flxRowCheckBox",
        "lblCheckBoxSelect": "lblCheckBoxSelect",
        "flxCustomer": "flxCustomer",
        "flxCustomerDetails": "flxCustomerDetails",
        "lblCustomerCheckbox": "lblCustomerCheckbox",
        "lblCutomerName": "lblCutomerName",
        "lblCustomerName1": "lblCustomerName1",
        "lblCustomerNumber": "lblCustomerNumber",
        "lblCustomerNumber1": "lblCustomerNumber1",
        "flxRow": "flxRow",
        "flxCol1": "flxCol1",
        "flxCol2": "flxCol2",
        "flxCol3": "flxCol3",
        "flxCol4": "flxCol4",
        "lblCol1": "lblCol1",
        "lblCol2": "lblCol2",
        "lblColumn3": "lblColumn3",
        "lblCol4": "lblCol4",
        "imgCol1": "imgCol1",
        "imgCol2": "imgCol2",
        "lblCheckBoxSelectAll": "lblCheckBoxSelectAll",
        "flxContractsCollapsed": "flxContractsCollapsed",
        "imgRowCheckBox": "imgRowCheckBox",
        "flxContractsCollapsedWrapper": "flxContractsCollapsedWrapper",
        "flxSeparatorVertical": "flxSeparatorVertical",
        "lblCustomerName": "lblCustomerName",
        "flxCustomerCheckbox": "flxCustomerCheckbox",
        "flxCIFDetails": "flxCIFDetails",
        "lblUserType": "lblUserType",
        "flxCheckBox": "flxCheckBox"
      };
    },

    setDataForContracts: function (data, editData) {
      var scope = this;
      let segData = [];
      let dataGridResponse = this.getRecordsArray(this._responsePathDataGrid,data);
      var column1Visibility = this.isEmptyNullUndefined(this._column1) ? false : true;
      var column2Visibility = this.isEmptyNullUndefined(this._column2) ? false : true;
      var column3Visibility = this.isEmptyNullUndefined(this._column3) ? false : true;
      var Field1Visibility = this.isEmptyNullUndefined(this._field1) ? false : true;
      var Field2Visibility = this.isEmptyNullUndefined(this._field2) ? false : true;
      if(this._context)
        var userIconVisibility = this._context.profileAccess === "both" ? true : false;
      //       var Field3Visibility = this.isEmptyNullUndefined(this._field3) ? false : true; 	
      for (var i = 0; i < dataGridResponse.length; i++) {
        var headerData = [];
        var rowData = [];
        var headerDataRecord = {};
        let customerInfoResponse = dataGridResponse[i];
        customerInfoResponse = this.getRecordsArray(this._responsePathCustomerInfo, customerInfoResponse);
        //         for(var j = 0; j < x[customerInfoResponsePath].length; j++){
        for (var j = 0; j < customerInfoResponse.length; j++) {
          //           let y = x[customerInfoResponsePath][j];
          let y = customerInfoResponse[j];
          let rowRecord = {};
          if (Field1Visibility) {
            rowRecord["lblCustomerName"] = {
              "text": y[JSON.parse(scope._field1)["mapping"]],
              "isVisible": true,
              "skin": scope.getSkinForCurrentBreakpoint(this._sknDataGridLabel)
            };
            rowRecord["lblCustomerName1"] = {
              "text": "Account Name " + (y[JSON.parse(scope._field1)["mapping"]])
            };
          } else {
            rowRecord["lblCustomerName"] = {
              "isVisible": false
            };
          }
          if (Field2Visibility) {
            rowRecord["lblCustomerNumber"] = {
              "text": y[JSON.parse(scope._field2)["mapping"]],
              "isVisible": true,
              "skin": scope.getSkinForCurrentBreakpoint(this._sknDataGridLabel)
            };
            rowRecord["lblCustomerNumber1"] = {
              "text": "Account Number " + (y[JSON.parse(scope._field2)["mapping"]])
            };
          } else {
            rowRecord["lblCustomerNumber"] = {
              "isVisible": false
            };
          }
          rowRecord["lblCustomerCheckbox"] = {
            "text": "D",
            "accessibilityConfig": {
              "a11yARIA": {
                "tabindex": -1,
                "aria-hidden": true
              }
            }
          };
          rowRecord["flxContractsCollapsedWrapper"] = {
            "isVisible": false
          };
          rowRecord["flxCustomerDetails"] = {
            "isVisible": false
          };
          rowRecord["flxContractsCollapsed"] = {
            "skin": "sknFlxffffffBorder0"
          };
          rowRecord["flxCustomerCheckbox"] = {
            "onClick": this.toogleCustomerCheckBox
          };
          rowRecord["flxCIFDetails"] = {
            "isVisible": false
          };
          rowRecord["lblUserType"] = {
            "text": y.isBusiness === true ? "r" : "s",
            //             "isVisible": data.isCombinedUser
            "isVisible": userIconVisibility
          };
          if (kony.application.getCurrentBreakpoint() === 640) {
            rowRecord.template = "flxContractsCollapsedMobile";
          } else {
            rowRecord.template = "flxContractsCollapsed";
          }
          rowData.push(rowRecord);
        }
        headerDataRecord["flxDropdown"] = {
          "onClick": this.toogleExpandRow,
          "accessibilityConfig": {
                    "a11yLabel": "show more details for contract" + dataGridResponse[i].contractName,
                    "a11yARIA": {
                        "aria-expanded": false
                    }
                }
        };
        headerDataRecord["flxCheckBox"] = {
          "onClick": this.toogleRowCheckBox
        };
        if (column1Visibility) {
          headerDataRecord["lblContract"] = {
            "text": dataGridResponse[i][JSON.parse(scope._column1)["mapping"]],
            "isVisible": true,
            "skin": scope.getSkinForCurrentBreakpoint(this._sknDataGridLabel)
          };
          headerDataRecord["lblContract1"] = {
            "text":  this.view.lblCol1.text + " " + (dataGridResponse[i][JSON.parse(scope._column1)["mapping"]])
        };
        } else {
          headerDataRecord["lblContract"] = {
            "isVisible": false
          };
        }
        if (column2Visibility) {
          headerDataRecord["lblIdentityNumber"] = {
            "text": dataGridResponse[i][JSON.parse(scope._column2)["mapping"]],
            "isVisible": true,
            "skin": scope.getSkinForCurrentBreakpoint(this._sknCustomerInfoLabel)
          };
          headerDataRecord["lblIdentityNumber1"] = {
            "text": this.view.lblCol2.text + " " + (dataGridResponse[i][JSON.parse(scope._column2)["mapping"]])
        };
        } else {
          headerDataRecord["lblIdentityNumber"] = {
            "isVisible": false
          };
        }
        headerDataRecord["lblCIF"] = {
          "text": "0 "+ kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " "  + dataGridResponse[i].contractCustomers.length
        };
        headerDataRecord["lblCIF1"] = {
          "text": this.view.lblColumn3.text + " " + ("0 " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " " + dataGridResponse[i].contractCustomers.length)
      };
        headerDataRecord["lblDropdown"] = {
          "text": "O",
          "accessibilityConfig": {
            "a11yARIA": {
              "tabindex": -1,
              "aria-hidden": true
            }
          }
        };
        headerDataRecord["lblCheckBoxSelect"] = {
          "text": "D",
          "accessibilityConfig": {
            "a11yARIA": {
              "tabindex": -1,
              "aria-hidden": true
            }
          }
        };
        headerDataRecord["flxContractsCollapsedWrapper"] = {
          "isVisible": true
        };
        headerDataRecord["flxCustomerDetails"] = {
          "isVisible": false
        };
        headerDataRecord["flxContractsCollapsed"] = {
            "skin": "sknFlxffffffBorder0"
        };
        headerDataRecord["flxSeparatorVertical"] = {
          "isVisible": false
        };
        headerDataRecord["flxCIFDetails"] = {
          "isVisible": false
        };
        if (kony.application.getCurrentBreakpoint() === 640) {
          headerDataRecord.template = "flxContractsCollapsedMobile";
        } else {
          headerDataRecord.template = "flxContractsCollapsed";
        }
        headerData.push(headerDataRecord, rowData);
        segData.push(headerData);
      }

      this.view.segContract.widgetDataMap = this.setSegWidgetDataMap();
      segData = this.getSortedData(segData, "lblContract", "ASC");

      if (editData) {
        segData.forEach(x => {
          let contractId = x[0].lblIdentityNumber.text;
          let contractIdDetails = this.findContractIdforEdit(contractId, JSON.parse(editData));
          if (contractIdDetails[0]) {
            x[0].lblCheckBoxSelect.text = "C";
            x[0].lblCIF.text = contractIdDetails[1].length + x[0].lblCIF.text.substr(x[0].lblCIF.text.indexOf(kony.i18n.getLocalizedString("i18n.konybb.Common.of")) - 1);
            x[1].forEach(y => {
              let coreCustomerId = y.lblCustomerNumber.text;
              let coreCustomerIdDetails = this.findcoreCustomerIdforEdit(coreCustomerId, contractIdDetails[1]);
              if (coreCustomerIdDetails) {
                y.lblCustomerCheckbox.text = "C";
              }
            })
          }
        });
        this.disableConfirmButton(false);
      }
      this.view.segContract.setData(segData);
      kony.application.dismissLoadingScreen();
      this.view.forceLayout();
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

    findContractIdforEdit: function (contractId, arr) {

      let returnArr = [];
      arr.forEach(x => {
        if (x.contractId === contractId) {
          returnArr.push(true);
          returnArr.push(x.coreCustomerId.split(','));
        }
      })

      return returnArr;

    },

    findcoreCustomerIdforEdit: function (coreCustomerId, arr) {
      return arr.includes(coreCustomerId);
    },

    toogleExpandRow: function (widgetInfo, context) {

      let data = this.view.segContract.data;
      let selectedRowIndex = this.view.segContract.selectedRowIndex[0];
      if (data[selectedRowIndex][0].lblDropdown.text === "O") {
        data[selectedRowIndex][0].lblDropdown.text = "P";
        data[selectedRowIndex][0].flxContractsCollapsedWrapper.skin = this.getSkinForCurrentBreakpoint(this._sknRowExpanded);        
        data[selectedRowIndex][0].flxSeparatorVertical.isVisible = true;
        data[selectedRowIndex][1].forEach(x => x.flxCustomerDetails.isVisible = true);
        kony.application.getCurrentBreakpoint() === 640 ? data[selectedRowIndex][0].flxCIFDetails.isVisible = true : ""
        data[selectedRowIndex][0].flxContractsCollapsed.skin = "ICSknFlxfbfbfb";
        data[selectedRowIndex][0].flxDropdown.accessibilityConfig={          
            "a11yLabel":"Hide details for contract "+data[selectedRowIndex][0].lblContract.text,          
          "a11yARIA": {
            "role": "button",
            //"aria-labelledby": "lblContract",
            "aria-expanded":false
          }
        };
      } else {
        data[selectedRowIndex][0].flxDropdown.accessibilityConfig={           
            "a11yLabel":"show more details for contract "+data[selectedRowIndex][0].lblContract.text,         
          "a11yARIA": {
            "role": "button", 
            //"aria-labelledby": "lblContract",
            "aria-expanded":true
          }
        };
        data[selectedRowIndex][0].lblDropdown.text = "O";
        data[selectedRowIndex][0].flxContractsCollapsed.skin = "sknFlxffffffBorder0";
        data[selectedRowIndex][0].flxContractsCollapsedWrapper.skin = "slFbox";
        data[selectedRowIndex][0].flxSeparatorVertical.isVisible = false;
        data[selectedRowIndex][1].forEach(x => x.flxCustomerDetails.isVisible = false);
        kony.application.getCurrentBreakpoint() === 640 ? data[selectedRowIndex][0].flxCIFDetails.isVisible = false : ""
      }

      // data = this.getSortedData(data, "lblContract", "ASC");
      this.view.segContract.setData(data);
      this.view.segContract.sectionHeaderTemplate = "flxContractsCollapsed";   
      this.view.segContract.setActive(context.rowIndex, context.sectionIndex, "flxContractsCollapsed.FlxGroup1.flxContractsCollapsedWrapper.flxHeader.flxDropdown");
      
    },

    toogleRowCheckBox: function (index, context) {

      let data = this.view.segContract.data;
      let selectedRowIndex;

      if (index != undefined && index >= 0) {
        selectedRowIndex = index;
      } else {
        selectedRowIndex = this.view.segContract.selectedRowIndex[0];
      }
      let customerLength = data[selectedRowIndex][1].length;

      if (data[selectedRowIndex][0].lblCheckBoxSelect.text === "D") {
        data[selectedRowIndex][0].flxCheckBox.accessibilityConfig={                    
          "a11yARIA": {
            "role": "checkbox", 
            "aria-labelledby": "lblContract",
            "aria-checked":true
          }
        };
        data[selectedRowIndex][1][0].flxCustomerCheckbox.accessibilityConfig = {
          "a11yARIA": {
              "role": "checkbox",
              "aria-labelledby": "lblCustomerName",
              "aria-checked": true
          }
      };
        data[selectedRowIndex][0].lblCheckBoxSelect.text = "C";
        data[selectedRowIndex][0].lblCIF.text = customerLength + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " " + customerLength;
        data[selectedRowIndex][1].forEach(x => {x.lblCustomerCheckbox.text = "C";
        x.flxCustomerCheckbox.accessibilityConfig = {
          "a11yARIA": {
              "role": "checkbox",
              "aria-labelledby": "lblCustomerName",
              "aria-checked": true
          }
      };
      });
      } else {
        data[selectedRowIndex][0].flxCheckBox.accessibilityConfig={                    
          "a11yARIA": {
            "role": "checkbox", 
            "aria-labelledby": "lblContract",
            "aria-checked":false
          }
        };
        data[selectedRowIndex][0].lblCheckBoxSelect.text = "D";
        data[selectedRowIndex][0].lblCIF.text = 0 + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " " + customerLength;
        data[selectedRowIndex][1].forEach(x => {x.lblCustomerCheckbox.text = "D";
      x.flxCustomerCheckbox.accessibilityConfig = {
        "a11yARIA": {
            "role": "checkbox",
            "aria-labelledby": "lblCustomerName",
            "aria-checked": false
        }
    };})
        this.view.lblCheckBoxSelectAll.text = "D"
      }
      // data = this.getSortedData(data, "lblContract", "ASC");
      this.view.segContract.setData(data);
	  this.view.segContract.sectionHeaderTemplate = "flxContractsCollapsed";  
      this.view.segContract.setActive(context.rowIndex, context.sectionIndex, "flxContractsCollapsed.FlxGroup1.flxContractsCollapsedWrapper.flxHeader.flxCheckBox");
      this.setDataForSelecAllCheckBox();
    },

    toogleCustomerCheckBox: function (widgetInfo, context) {

      let data = this.view.segContract.data;
      let selectedRowIndex = this.view.segContract.selectedRowIndex[0];
      let selectedSectionIndex = this.view.segContract.selectedRowIndices[0][1][0];

      let length = 0;
      let customerLength = data[selectedRowIndex][1].length;

      data[selectedRowIndex][1][selectedSectionIndex].lblCustomerCheckbox.text === "D"
        ? data[selectedRowIndex][1][selectedSectionIndex].lblCustomerCheckbox.text = "C"
        : data[selectedRowIndex][1][selectedSectionIndex].lblCustomerCheckbox.text = "D",
        this.view.lblCheckBoxSelectAll.text = "D";

      data[selectedRowIndex][1].forEach(x => {
        x.lblCustomerCheckbox.text === "C"
          ? data[selectedRowIndex][0].lblCheckBoxSelect.text !== "C"
            ? data[selectedRowIndex][0].lblCheckBoxSelect.text = "C"
            : ""
          : length++
      });
      if (data[selectedRowIndex][1][selectedSectionIndex].lblCustomerCheckbox.text === "D") {
                data[selectedRowIndex][1][selectedSectionIndex].flxCustomerCheckbox.accessibilityConfig = {
                    "a11yARIA": {
                        "role": "checkbox",
                        "aria-labelledby": "lblCustomerName",
                        "aria-checked": false
                    }
                };
                data[selectedRowIndex][0].flxCheckBox.accessibilityConfig = {
                    "a11yARIA": {
                        "role": "checkbox",
                        "aria-labelledby": "lblContract",
                        "aria-checked": false
                    }};
            } else if (data[selectedRowIndex][1][selectedSectionIndex].lblCustomerCheckbox.text === "C") {
                data[selectedRowIndex][1][selectedSectionIndex].flxCustomerCheckbox.accessibilityConfig = {
                    "a11yARIA": {
                        "role": "checkbox",
                        "aria-labelledby": "lblCustomerName",
                        "aria-checked": true
                    }
                };
                data[selectedRowIndex][0].flxCheckBox.accessibilityConfig = {
                    "a11yARIA": {
                        "role": "checkbox",
                        "aria-labelledby": "lblContract",
                        "aria-checked": true
                    }};
            }

      length == customerLength
        ? data[selectedRowIndex][0].lblCheckBoxSelect.text = "D"
        : ""

      data[selectedRowIndex][0].lblCIF.text = customerLength - length + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " " + customerLength;
      // data = this.getSortedData(data, "lblContract", "ASC");
      this.view.segContract.setData(data);
	  this.view.segContract.sectionHeaderTemplate = "flxContractsCollapsed";  
      this.view.segContract.setActive(context.rowIndex, context.sectionIndex, "flxContractsCollapsed.FlxGroup1.flxCustomer.flxCustomerDetails.flxCustomerCheckbox");
      this.setDataForSelecAllCheckBox();
    },

    toogleSelectAllCheckBox: function() {
      let data = this.view.segContract.data;
      let checkBox = this.view.lblCheckBoxSelectAll.text === "D" ? "C" : "D";
      let flag = this.view.lblCheckBoxSelectAll.text === "D" ? false : true;
      this.disableConfirmButton(flag);
      this.view.lblCheckBoxSelectAll.text = checkBox;
      if(this.view.lblCheckBoxSelectAll.text === "D"){
        this.view.flxCol4.accessibilityConfig = {
          "a11yARIA": {
              "role": "checkbox",              
              "aria-checked": false
          }
      };
      }
      else {
        this.view.flxCol4.accessibilityConfig = {
          "a11yARIA": {
              "role": "checkbox",              
              "aria-checked": true
          }
      };
      }
      for (let key in data) {
        data[key][0].lblCheckBoxSelect.text = checkBox;
        if(data[key][0].lblCheckBoxSelect.text === "D"){
          data[key][0].flxCheckBox.accessibilityConfig = {
            "a11yARIA": {
                "role": "checkbox",
                "aria-labelledby": "lblContract",
                "aria-checked": false
            }};
        }
        else if(data[key][0].lblCheckBoxSelect.text === "C"){
          data[key][0].flxCheckBox.accessibilityConfig = {
            "a11yARIA": {
                "role": "checkbox",
                "aria-labelledby": "lblContract",
                "aria-checked": true
            }};
        }
        for(i = 0; i<data[key][1].length; i++){
          data[key][1][i].lblCustomerCheckbox.text = checkBox;
          if(data[key][1][i].lblCustomerCheckbox.text === "D"){
            data[key][1][i].flxCustomerCheckbox.accessibilityConfig = {
              "a11yARIA": {
                  "role": "checkbox",
                  "aria-labelledby": "lblCustomerName",
                  "aria-checked": false
              }
          };
          }
          else if(data[key][1][i].lblCustomerCheckbox.text === "C"){
            data[key][1][i].flxCustomerCheckbox.accessibilityConfig = {
              "a11yARIA": {
                  "role": "checkbox",
                  "aria-labelledby": "lblCustomerName",
                  "aria-checked": true
              }
          };
          }
      }
       var count = !flag ? data[key][1].length : 0
        data[key][0].lblCIF.text = count + " " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " " + data[key][1].length;
    }
      this.view.segContract.setData(data);
  },

    setDataForSelecAllCheckBox: function () {

      if (this.view.segContract.data.every(x => {
        return x[0].lblCheckBoxSelect.text === "C"
      })) {
        this.view.lblCheckBoxSelectAll.text = "C";
        this.view.lblCheckBoxSelectAll.accessibilityConfig = {          
            "a11yARIA": {
              "tabindex": -1,
              "aria-hidden": true
            }          
      };
        this.view.flxCol4.accessibilityConfig = {
          "a11yARIA": {
              "role": "checkbox",
              "aria-checked": true
          }
      };
      } else {
        this.view.lblCheckBoxSelectAll.text = "D";
        this.view.lblCheckBoxSelectAll.accessibilityConfig = {          
          "a11yARIA": {
            "tabindex": -1,
            "aria-hidden": true
          }          
    };
        this.view.flxCol4.accessibilityConfig = {
          "a11yARIA": {
              "role": "checkbox",
              "aria-checked": false
          }
      };
      }
      this.disableConfirmButton();
    },

    onTxtSearchKeyUp: function () {
      var scopeObj = this;
      var searchKeyword = scopeObj.view.txtSearch.text.trim();
      if (searchKeyword.length > 0) {
        scopeObj.view.flxClear.setVisibility(true);
      } else {
        scopeObj.view.flxClear.setVisibility(false);
      }
      scopeObj.view.flxSearch.forceLayout();
    },
		
    onSearchClearBtnClick: function () {
      var scopeObj = this;      
      scopeObj.view.txtSearch.text = "";
      scopeObj.view.flxClear.setVisibility(false);    
      scopeObj.view.txtSearch.setActive(true);  
      scopeObj.clearSearch();     
    },
    
    onSearchBtnClick: function () {
      var scopeObj = this;    
      var searchQuery = scopeObj.view.txtSearch.text.trim();      
      if (kony.sdk.isNullOrUndefined(searchQuery) || searchQuery === "") {
        scopeObj.clearSearch();
      }
      else{
        scopeObj.setSearchData(searchQuery);  
      }
    }, 
    
    setSearchData: function(searchQuery) {
      var scopeObj = this; 
      var data = scopeObj.view.segContract.data;
      var resultsFound = false;
      for (var i = 0; i < data.length; i++) { 
        data[i][0].flxContractsCollapsedWrapper.height = "0dp";
        for(var j = 0; j < data[i][1].length ; j++){
          if((data[i][0].lblContract && data[i][0].lblContract.text && data[i][0].lblContract.text.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1)
             || (data[i][0].lblIdentityNumber && data[i][0].lblIdentityNumber.text && data[i][0].lblIdentityNumber.text.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1)
             || (data[i][1][j].lblCustomerName && data[i][1][j].lblCustomerName.text && data[i][1][j].lblCustomerName.text.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1)
             || (data[i][1][j].lblCustomerNumber && data[i][1][j].lblCustomerNumber.text && data[i][1][j].lblCustomerNumber.text.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1)
            ){
            resultsFound = true;
            data[i][1][j].flxCustomerDetails.height = "50dp";
            data[i][0].flxContractsCollapsedWrapper.height = "51dp";
          }
          else{
            data[i][1][j].flxCustomerDetails.height = "0dp";
          }
        }
      }
      if(resultsFound){
        scopeObj.view.flxNoResultsFound.setVisibility(false);
      }
      else{
        scopeObj.view.flxNoResultsFound.setVisibility(true);
      }
      scopeObj.view.segContract.setData(data);
      scopeObj.view.forceLayout(); 
    },

    clearSearch: function() {
      var scopeObj = this;
      var data = scopeObj.view.segContract.data;
      for (var i = 0; i < data.length; i++) { 
         data[i][0].flxContractsCollapsedWrapper.height = "51dp";
         for(var j = 0; j < data[i][1].length ; j++){
            data[i][1][j].flxCustomerDetails.height = "50dp";
         }
      }
      scopeObj.view.flxNoResultsFound.setVisibility(false);
      scopeObj.view.segContract.setData(data);
      scopeObj.view.forceLayout();
    },
    
    sortByContractName: function() {
      var scopeObj = this;
      var sortType = "ASC";
      if(scopeObj.view.imgCol1.src === "sorting_previous.png") {
        scopeObj.view.imgCol1.src = "sorting_next.png";
        sortType = "DESC";
        scopeObj.view.flxCol1.accessibilityConfig={
          "a11yARIA": {
            "role": "button",
            "aria-label":"Contract Column. Sorted in Descending order. Click to Sort in Ascending order."
          }
        }
      }
      else{
        scopeObj.view.imgCol1.src = "sorting_previous.png";
        scopeObj.view.flxCol1.accessibilityConfig={
          "a11yARIA": {
            "role": "button",
            "aria-label":"Contract Column. Sorted in Ascending order. Click to Sort in Descending order."
          }
        }
      }
      scopeObj.view.imgCol2.src = "sorting.png";
      scopeObj.view.flxCol2.accessibilityConfig={
        "a11yARIA": {
          "role": "button",
          "aria-label":"Identity Number Column. No Sort applied. Click to Sort in Ascending order."
        }
      }
      
      var data = scopeObj.view.segContract.data;
      data = scopeObj.getSortedData(data, "lblContract",sortType);
      scopeObj.view.segContract.setData(data);
      scopeObj.view.forceLayout();
    },
    
    sortByIdentityNumber: function() {
      var scopeObj = this;
      var sortType = "ASC";
      if(scopeObj.view.imgCol2.src === "sorting_previous.png") {
        scopeObj.view.imgCol2.src = "sorting_next.png";
        sortType = "DESC";
        scopeObj.view.flxCol2.accessibilityConfig={
          "a11yARIA": {
            "role": "button",
            "aria-label":"Identity Number Column. Sorted in Descending order. Click to Sort in Ascending order."
          }
        }
      }
      else{
        scopeObj.view.imgCol2.src = "sorting_previous.png";
        scopeObj.view.flxCol2.accessibilityConfig={
          "a11yARIA": {
            "role": "button",
            "aria-label":"Identity Number Column. Sorted in Ascending order. Click to Sort in Descending order."
          }
        }
      }
      scopeObj.view.imgCol1.src = "sorting.png";
      scopeObj.view.flxCol1.accessibilityConfig={
        "a11yARIA": {
          "role": "button",
          "aria-label":"Contract Column. No Sort applied. Click to Sort in Ascending order."
        }
      }
      
      var data = scopeObj.view.segContract.data;
      data = scopeObj.getSortedData(data, "lblIdentityNumber",sortType);
      scopeObj.view.segContract.setData(data);
      scopeObj.view.forceLayout();
    },
    
    getSortedData: function(data, sortField, sortType) {
      data.sort(function(a, b) {
        var data1 = a[0][sortField].text;
        var data2 = b[0][sortField].text;
        if(sortField === "lblIdentityNumber"){
          data1 = parseInt(data1);
          data2 = parseInt(data2);
        }
        else{
          data1 = data1.toLowerCase();
          data2 = data2.toLowerCase();
        }
        if (data1 > data2) {
          if (sortType === "ASC") return 1;
          else if (sortType === "DESC") return -1;
        } else if (data1 < data2) {
          if (sortType === "ASC") return -1;
          else if (sortType === "DESC") return 1;
        } else return 0;
      });
      return data;
    },
    
    getCIFDataForEdit: function (segData) {
        let cif = [];
        segData.forEach(x => {
          if(x[0].lblCheckBoxSelect.text === "C") {
          let coreCustomerIdArray = [];
          x[1].forEach(y => {
            if(y.lblCustomerCheckbox.text === "C"){
            coreCustomerIdArray.push(y.lblCustomerNumber.text);
            }
          });
          cif.push({
            "contractId": x[0].lblIdentityNumber.text,
            "coreCustomerId": coreCustomerIdArray.join(',')
          });
          }
        });        
        return cif;
    }
  };
});