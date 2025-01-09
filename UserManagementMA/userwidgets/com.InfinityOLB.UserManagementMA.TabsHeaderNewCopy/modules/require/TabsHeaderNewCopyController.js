define(function() {
	
  	constants.DEFAULT_TAB_COUNT = 6;
  	
	return {
      
      	constructor: function(baseConfig, layoutConfig, pspConfig) {
          	this._tabCount = constants.DEFAULT_TAB_COUNT;
          	this._isI18nEnabled = true;
          	this._tab1Name = "Tab1";
            this._tab2Name = "Tab2";
            this._tab3Name = "Tab3";
            this._tab4Name = "Tab4";
            this._tab5Name = "Tab5";
            this._tab6Name = "Tab6";
			this._activeTabName = "Tab1";
			this._activeTab = "btnTab1";
			this.invokePreShow();
        },
      
        initGettersSetters: function() {
            defineGetter(this, "tabsCount", function() {
              return this._tabCount;
            });
          
            defineSetter(this,"tabsCount", function(val){
              this._tabCount = val;
            });
          
            defineGetter(this, "tab1Name", function() {
              return this._tab1Name;
            });

            defineSetter(this,"tab1Name", function(val){
              this._tab1Name = val;
            });
          
            defineGetter(this, "tab2Name", function() {
              return this._tab2Name;
            });

            defineSetter(this,"tab2Name", function(val){
              this._tab2Name = val;
            });
          
            defineGetter(this, "tab3Name", function() {
              return this._tab3Name;
            });

            defineSetter(this,"tab3Name", function(val){
              this._tab3Name = val;
            });
          
          	defineGetter(this, "tab4Name", function() {
              return this._tab4Name;
            });

            defineSetter(this,"tab4Name", function(val){
              this._tab4Name = val;
            });
          
          	defineGetter(this, "tab5Name", function() {
              return this._tab5Name;
            });

            defineSetter(this,"tab5Name", function(val){
              this._tab5Name = val;
            });
          
          	defineGetter(this, "tab6Name", function() {
              return this._tab6Name;
            });

            defineSetter(this,"tab6Name", function(val){
              this._tab6Name = val;
            });
          
            defineGetter(this, "isI18nEnabled", function() {
              return this._isI18nEnabled;
            });

            defineSetter(this,"isI18nEnabled", function(val){
              this._isI18nEnabled = val;
            });
          
        },
      
        invokePreShow : function(){
			this.setupTabs(this._tabCount);
        },
      
		clickTab : function(eventobject) {
            if (eventobject.skin == "sknBtnSSP72727217PxUnSelectedTab") {
              var tabs = this.view.widgets();
              for (var i = 0; i < tabs.length; i++ ) {
                tabs[i].skin = "sknBtnSSP72727217PxUnSelectedTab";
                tabs[i].focusSkin = "sknBtnSSP72727217PxUnSelectedTab";
              }
              eventobject.skin = "sknBtnSSP42424217PxSelectedTab";
              eventobject.focusSkin = "sknBtnSSP42424217PxSelectedTab";
            }
          	this._activeTabName = eventobject.text;
           // if(this.onHeaderTabClick !== null && this.onHeaderTabClick !== undefined)
			//	this.onHeaderTabClick(eventobject);
        },
      
      
        setupTabs : function(noOfTabs) {

          var widgetName = "btnTab";
          
          for (i = 1; i <= noOfTabs; i++) {
            var name = this["_tab"+i+"Name"];
            if(this._isI18nEnabled) {
                this.view[widgetName + i].text = kony.i18n.getLocalizedString(name);
            }
            else {
              	this.view[widgetName + i].text = name;
            }
          }
          
          for (i = constants.DEFAULT_TAB_COUNT; i > noOfTabs; i--) {
            this.view[widgetName + i].isVisible = false;
          }
          this.clickTab(this.view[this._activeTab]);
        },
      
        getActiveTabName: function() {
			return this._activeTabName;
        },
      
        focusTab: function(tabNo) {
          this._activeTab="btnTab"+tabNo;
		  this.clickTab(this.view[this._activeTab]);
        }
      
	};
});