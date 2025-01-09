define(['./ParserUtilsManager','./EntitlementUtils'],function(ParserUtilsManager,EntitlementUtils) {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
          this.ParserUtilsManager = new ParserUtilsManager();
          this.EntitlementUtils = new EntitlementUtils();
          //declaration for Tab2 in the group:Tabs
          this._btnTab2="";

          //declaration for sknSepartor in the group:Skins
          this._separtorSkin="";

          //declaration for defaultTab in the group:Component Config
          this._defaultTab="";

          //declaration for Tab3 in the group:Tabs
          this._btnTab3="";

          //declaration for sknUnSelectedTab in the group:Skins
          this._uselectedTabSkin="";

          //declaration for Tab4 in the group:Tabs
          this._btnTab4="";

          //declaration for sknSelectedTab in the group:Skins
          this._selectedTabSkin="";

          //declaration for Tab1 in the group:Tabs
          this._btnTab1="";

          //declaration for sknBackGround in the group:Skins
          this._backgroundSkin="";
          
          //declaration for tab count
          this._tabCount=4;
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {
          //setter method for Tab2 in the group:Tabs
          defineSetter(this, "btnTab2", function(val) {
            if((typeof val==='string') && (val !== "")){
              this._btnTab2=val;
            }
          });

          //getter method for Tab2 in the group:Tabs
          defineGetter(this, "btnTab2", function() {
            return this._btnTab2;
          });

          //setter method for sknSepartor in the group:Skins
          defineSetter(this, "separtorSkin", function(val) {
            if((typeof val==='string') && (val !== "")){
              this._separtorSkin=val;
            }
          });

          //getter method for sknSepartor in the group:Skins
          defineGetter(this, "separtorSkin", function() {
            return this._separtorSkin;
          });

          //setter method for defaultTab in the group:Component Config
          defineSetter(this, "defaultTab", function(val) {
            if((typeof val==='string') && (val !== "")){
              this._defaultTab=val;
            }
          });

          //getter method for defaultTab in the group:Component Config
          defineGetter(this, "defaultTab", function() {
            return this._defaultTab;
          });

          //setter method for Tab3 in the group:Tabs
          defineSetter(this, "btnTab3", function(val) {
            if((typeof val==='string') && (val !== "")){
              this._btnTab3=val;
            }
          });

          //getter method for Tab3 in the group:Tabs
          defineGetter(this, "btnTab3", function() {
            return this._btnTab3;
          });

          //setter method for sknUnSelectedTab in the group:Skins
          defineSetter(this, "uselectedTabSkin", function(val) {
            if((typeof val==='string') && (val !== "")){
              this._uselectedTabSkin=val;
            }
          });

          //getter method for sknUnSelectedTab in the group:Skins
          defineGetter(this, "uselectedTabSkin", function() {
            return this._uselectedTabSkin;
          });

          //setter method for Tab4 in the group:Tabs
          defineSetter(this, "btnTab4", function(val) {
            if((typeof val==='string') && (val !== "")){
              this._btnTab4=val;
            }
          });

          //getter method for Tab4 in the group:Tabs
          defineGetter(this, "btnTab4", function() {
            return this._btnTab4;
          });

          //setter method for sknSelectedTab in the group:Skins
          defineSetter(this, "selectedTabSkin", function(val) {
            if((typeof val==='string') && (val !== "")){
              this._selectedTabSkin=val;
            }
          });

          //getter method for sknSelectedTab in the group:Skins
          defineGetter(this, "selectedTabSkin", function() {
            return this._selectedTabSkin;
          });

          //setter method for Tab1 in the group:Tabs
          defineSetter(this, "btnTab1", function(val) {
            if((typeof val==='string') && (val !== "")){
              this._btnTab1=val;
            }
          });

          //getter method for Tab1 in the group:Tabs
          defineGetter(this, "btnTab1", function() {
            return this._btnTab1;
          });

          //setter method for sknBackGround in the group:Skins
          defineSetter(this, "backgroundSkin", function(val) {
            if((typeof val==='string') && (val !== "")){
              this._backgroundSkin=val;
            }
          });

          //getter method for sknBackGround in the group:Skins
          defineGetter(this, "backgroundSkin", function() {
            return this._backgroundSkin;
          });
		},
      /**
         * Component preShow.
         * Initialising set format value JSON.
         * Resetting images and values.
         */
      preShow: function(){
        try{
          this.setEntitlements();
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
          this.view.btnTab1.onClick = this.tabOnclick.bind(this,this._btnTab1);
          this.view.btnTab2.onClick = this.tabOnclick.bind(this,this._btnTab2);
          this.view.btnTab3.onClick = this.tabOnclick.bind(this,this._btnTab3);
          this.view.btnTab4.onClick = this.tabOnclick.bind(this,this._btnTab4);
          this.setDefault();
          this.setTabs();
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
        * setDefault.
        * Initialising the deafult tab.
        * Resetting the tabs if deafult value is not present.
        */
      setDefault : function(){
        var tabDef = this._defaultTab;
        switch(tabDef){
          case "Tab1": this.setTabsSkins("btnTab1");
            break;
          case "Tab2": this.setTabsSkins("btnTab2");
            break;
          case "Tab3": this.setTabsSkins("btnTab3");
            break;
          case "Tab4": this.setTabsSkins("btnTab4");
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
            this.view["btnTab"+i].skin=this._uselectedTabSkin;
          }
          if(widgetID!==null){
            this.view[widgetID].skin=this._selectedTabSkin;
          }
        },
          /**
        * setTabs.
        * Responsible to set the visibility of the tabs.
        * Setting the text of the tabs based on breakpoint.
        */
          setTabs : function(){
            var visibleTabCount = 0;
            for(var i=1; i<=this._tabCount; i++){
              var tab = this["_btnTab"+i];
              var widget = "btnTab"+i;
              if(!this.isEmptyNullUndefined(tab) && this.isEntitled(JSON.parse(tab))) {
                this.view[widget].text=this.getTypeBasedValue(JSON.parse(tab)["text"]);
                this.view[widget].setVisibility(true);
                visibleTabCount++;
              }
              else{
                this.view[widget].setVisibility(false);
              }
            }
            this.setTabsWidth (visibleTabCount);
          },
       /**
        * setTabsWidth.
        * Responsible to set the width of the tabs.
        */
      setTabsWidth : function(count)
      {
        var width = 100/count;
        for(var i=1; i<=count; i++){
          var widget = "btnTab"+i;
          this.view[widget].width = width+"%";
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
       *  getProcessedText.
       * Pass the text to parser util to obtain the processed value.
       * text {string} - value to be processed.
       * @return : {string} - processed value.
       */
        getProcessedText:function(text, responseArrayIndex){
        return this.ParserUtilsManager.getParsedValue(text, responseArrayIndex);
        },
         /**
        * getTypeBasedValue.
        * value {JSONObject or String} - Value that needs to be processed.
        * @return : {string} - Processed value
        */
        getTypeBasedValue: function(value){
        if(typeof(value) === 'string'){
          return this.getProcessedText(value);
         }
        else
          return this.getProcessedText(JSON.stringify(value));
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