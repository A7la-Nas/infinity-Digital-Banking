define(['./ParserUtilsManager','./EntitlementUtils'],function(ParserUtilsManager,EntitlementUtils) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.ParserUtilsManager = new ParserUtilsManager();
      this.EntitlementUtils = new EntitlementUtils();
      //declaration for Tab 1 in the group:Tabs
      this._tab1="";

      //declaration for Active Tab Skin in the group:Skins
      this._sknActiveTab="";

      //declaration for Breakpoints in the group:Component Config
      this._BREAKPTS="";

      //declaration for Tab 2 in the group:Tabs
      this._tab2="";

      //declaration for Inactive Tab Skin in the group:Skins
      this._sknInactiveTab="";

      //declaration for Default Selected Tab  in the group:Component Config
      this._tabDefaultSelected="";

      //declaration for Tab 3 in the group:Tabs
      this._tab3="";

      //declaration for Active Tab Hover Skin in the group:Skins
      this._sknActiveTabHover="";

      //declaration for Inactive Tab Hover Skin in the group:Skins
      this._sknInactiveTabHover="";

      //declaration for Tab 4 in the group:Tabs
      this._tab4="";

      //declaration for Border skin in the group:Skins
      this._sknBorder="";

      //declaration for tab count
      this._tabCount=4;

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      //setter method for Tab 1 in the group:Tabs
      defineSetter(this, "tab1", function(val) {
        if((typeof val=='string') && (val != "")){
          this._tab1=val;
        }
      });

      //getter method for Tab 1 in the group:Tabs
      defineGetter(this, "tab1", function() {
        return this._tab1;
      });

      //setter method for Active Tab Skin in the group:Skins
      defineSetter(this, "sknActiveTab", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknActiveTab=val;
        }
      });

      //getter method for Active Tab Skin in the group:Skins
      defineGetter(this, "sknActiveTab", function() {
        return this._sknActiveTab;
      });

      //setter method for Breakpoints in the group:Component Config
      defineSetter(this, "BREAKPTS", function(val) {
        if((typeof val=='string') && (val != "")){
          this._BREAKPTS=val;
        }
      });

      //getter method for Breakpoints in the group:Component Config
      defineGetter(this, "BREAKPTS", function() {
        return this._BREAKPTS;
      });

      //setter method for Tab 2 in the group:Tabs
      defineSetter(this, "tab2", function(val) {
        if((typeof val=='string') && (val != "")){
          this._tab2=val;
        }
      });

      //getter method for Tab 2 in the group:Tabs
      defineGetter(this, "tab2", function() {
        return this._tab2;
      });

      //setter method for Inactive Tab Skin in the group:Skins
      defineSetter(this, "sknInactiveTab", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknInactiveTab=val;
        }
      });

      //getter method for Inactive Tab Skin in the group:Skins
      defineGetter(this, "sknInactiveTab", function() {
        return this._sknInactiveTab;
      });

      //setter method for Default Selected Tab  in the group:Component Config
      defineSetter(this, "tabDefaultSelected", function(val) {
        if((typeof val=='string') && (val != "")){
          this._tabDefaultSelected=val;
        }
      });

      //getter method for Default Selected Tab  in the group:Component Config
      defineGetter(this, "tabDefaultSelected", function() {
        return this._tabDefaultSelected;
      });

      //setter method for Tab 3 in the group:Tabs
      defineSetter(this, "tab3", function(val) {
        if((typeof val=='string') && (val != "")){
          this._tab3=val;
        }
      });

      //getter method for Tab 3 in the group:Tabs
      defineGetter(this, "tab3", function() {
        return this._tab3;
      });

      //setter method for Active Tab Hover Skin in the group:Skins
      defineSetter(this, "sknActiveTabHover", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknActiveTabHover=val;
        }
      });

      //getter method for Active Tab Hover Skin in the group:Skins
      defineGetter(this, "sknActiveTabHover", function() {
        return this._sknActiveTabHover;
      });

      //setter method for Inactive Tab Hover Skin in the group:Skins
      defineSetter(this, "sknInactiveTabHover", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknInactiveTabHover=val;
        }
      });

      //getter method for Inactive Tab Hover Skin in the group:Skins
      defineGetter(this, "sknInactiveTabHover", function() {
        return this._sknInactiveTabHover;
      });

      //setter method for Tab 4 in the group:Tabs
      defineSetter(this, "tab4", function(val) {
        if((typeof val=='string') && (val != "")){
          this._tab4=val;
        }
      });

      //getter method for Tab 4 in the group:Tabs
      defineGetter(this, "tab4", function() {
        return this._tab4;
      });

      //setter method for Border skin in the group:Skins
      defineSetter(this, "sknBorder", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknBorder=val;
        }
      });

      //getter method for Border skin in the group:Skins
      defineGetter(this, "sknBorder", function() {
        return this._sknBorder;
      });
    },
    /**
         * Component preShow.
         * Initialising set format value JSON.
         * Resetting images and values.
         */
    preShow: function(){
      try{
        this.view.onBreakpointChange = this.onBreakpointChange;
        this.setEntitlements();
        this.setComponentConfig();
        this.initActions();
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
        * initActions.
        * Responsible to initialize all the actions required in the component.
        */
    initActions: function(){
      try{
        this.view.btnTab1.onClick = this.tabOnclick.bind(this,this._tab1);
        this.view.btnTab2.onClick = this.tabOnclick.bind(this,this._tab2);
        this.view.btnTab3.onClick = this.tabOnclick.bind(this,this._tab3);
        this.view.btnTab4.onClick = this.tabOnclick.bind(this,this._tab4);
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
        * onBreakpointChange.
        * Function is triggered everytime when the breakpoint is changed.
        */
    onBreakpointChange : function(eventObj,width){
      this.setTabs();
      this.setDefault();
    },
    /**
        * setDefault.
        * Initialising the deafult tab.
        * Resetting the tabs if deafult value is not present.
        */
    setDefault : function(){
      var tabDef = this._tabDefaultSelected;
      switch(tabDef){
        case "Tab 1": this.setTabsSkins("btnTab1");
          break;
        case "Tab 2": this.setTabsSkins("btnTab2");
          break;
        case "Tab 3": this.setTabsSkins("btnTab3");
          break;
        case "Tab 4": this.setTabsSkins("btnTab4");
          break;
        default: this.setTabsSkins(null);
          break;
      }
    },
    /**
        * setTabsSkins.
        * Responsible for reseting and setting the skin to Tabs.
        */
    setTabsSkins : function(widgetID){
      for(var i=1;i<=this._tabCount;i++)
      {
        this.view["btnTab"+i].skin=this.getBreakPointTypeBasedValue(this._sknInactiveTab);
        this.view["btnTab"+i].hoverSkin=this.getBreakPointTypeBasedValue(this._sknInactiveTabHover);
        this.view["btnTab"+i].accessibilityConfig = {
            "a11yARIA" : {
              "role": "tab",
              "aria-selected": false,
            }
          }
      }
      if(widgetID!==null){
        this.view[widgetID].skin=this.getBreakPointTypeBasedValue(this._sknActiveTab);
        this.view[widgetID].hoverSkin=this.getBreakPointTypeBasedValue(this._sknActiveTabHover);
        this.view[widgetID].accessibilityConfig = {
            "a11yARIA" : {
              "role": "tab",
              "aria-selected": true,
            }
          }
      }
    },
    /**
        * setTabs.
        * Responsible to set the visibility of the tabs.
        * Setting the text of the tabs based on breakpoint.
        */
    setTabs : function(){
      for(var i=1; i<=this._tabCount; i++){
        var tab = this["_tab"+i];
        var widget = "btnTab"+i;
        if(!this.isEmptyNullUndefined(tab) && this.isEntitled(JSON.parse(tab))) {
          this.view[widget].text=this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(tab)["text"]));
         // this.view[widget].toolTip = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(tab)["text"]));
          this.view[widget].setVisibility(true);
        }
        else{
          this.view[widget].setVisibility(false);
        }
      }
    },
    /**
        * tabOnclick.
        * Responsible for calling methods assigned to Tabs.
        */
    tabOnclick:function(contract){
      this.onTabClick(JSON.parse(contract)["id"]);
    },
    /**
       * Component setContext
       * To collect the context object required for the component 
       * context{JSONobject} - context params 
       */
    setContext: function(context){
      this._context=context;
    },
    /**
       * Component setSelectedTab
       * To collect the selected tab required for the component 
       * selectedTab{String} - selectedTab params
       */
    setSelectedTab: function(selectedTab){
      this._selectedTab=selectedTab;
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
       *  getProcessedText.
       * Pass the text to parser util to obtain the processed value.
       * text {string} - value to be processed.
       * @return : {string} - processed value.
       */
    getProcessedText:function(text, responseArrayIndex){
      return this.ParserUtilsManager.getParsedValue(text, responseArrayIndex);
    },
    setFocustToFirstTab:function(){
      this.view.btnTab1.setFocus(true);
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