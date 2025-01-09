define(['./viewRequestsBusinessController','ParserUtilsManager','./viewRequestsStore'],function(BusinessController,ParserUtilsManager, ViewRequestsStore) {
  var orientationHandler = new OrientationHandler();
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {

      this._serviceParameters = {};
      this._dataMapping = {};
      this._dataFormatting = {};
      this.context = {};
      this.businessController = new BusinessController();
      this.businessController.store = ViewRequestsStore;
      ViewRequestsStore.subscribe(this.render.bind(this));
      var today = new Date();   
      this.serviceReqMaxPeriod = 1;
      this.initFromDate= [today.getDate(), today.getMonth() - this.serviceReqMaxPeriod + 1, today.getFullYear()];
      this.initToDate = [today.getDate(), today.getMonth() + 1 , today.getFullYear()];
      this.advancedSearch;
      this.simpleSearch;
      this.resetSearch;
      this.conditionalMappingKey;

      this.searchViewModel = {
        searchPerformed: false,
        simpleSearchPerformed: false,
        keywordSearchPerformed:false,
        anySearch:false,
        visible: false,
        searchResults: [],
        keyword: '',
        advSearch1: "",
        advSearch1Selected: kony.i18n.getLocalizedString("i18n.serviceRequests.AllRequestCategories"),
        advSearch4: "",
        advSearch4Selected: kony.i18n.getLocalizedString("i18n.serviceRequests.AllServiceRequests"),
        advSearch2: "",
        advSearch2Selected: kony.i18n.getLocalizedString("i18n.serviceRequests.AllStatus"),
        accountList: "",
        accountSelected: kony.i18n.getLocalizedString("i18n.serviceRequests.AllAccounts"),
        fromDate: [today.getDate(), today.getMonth() - this.serviceReqMaxPeriod + 1  , today.getFullYear()],
        toDate: [today.getDate(), today.getMonth() + 1 , today.getFullYear()],

        fromDateTablet: [today.getDate(), today.getMonth() - this.serviceReqMaxPeriod + 1, today.getFullYear()],
        toDateTablet: [today.getDate(), today.getMonth() +1 , today.getFullYear()]

      };
      this.tagState =  { 
        visible: 0,
        NUMBER_OF_TAGS: 6,
        decrement: function() {
          if (this.visible > 0) {
            this.visible--;
          }
        },
        increment: function() {
          if (this.visible < this.NUMBER_OF_TAGS) {
            this.visible++;
          }
        }
      };
      //Parser Util Object
      this.ParserUtilsManager = new ParserUtilsManager();

      //General Properties
      this._isFilterEnabled = "";

      //Component Config Properties
      this._BREAKPTS = "";

      //Filter Properties
      this._filterValues = "";
      this._filterHeading = "";
      this._selectedFilter = "";

      //Skins
      this._sknFilterValueText = "";
      this._sknFilterRowHover = "";
      this._sknFilterRowSelected = "";
      this._sknFilterRowUnselected = "";
      this._sknFilterList = "";
      this._sknSearchAndFilterBackground = "";
      this._sknFilterHeading="";

      //Icons
      this._iconFilterRowExpanded = "";
      this._iconFilterRowCollapsed = "";
      this._iconRadioButtonSelected = "";
      this._iconRadioButtonUnselected = "";

      //Controller Variables
      this._currIdx;
      this._prevIdx;

      this.segUIMapping = {
        "segServiceRequest" : {
          "flxDropdown": {
            onClick : this.onSegmentRowToggle.bind(this),
            accessibilityConfig:{
              "a11yLabel":"Show more details for service request with reference number",
              "a11yARIA":{
                "tabindex":0,
                "role":"button",
                "aria-labelledby":"lblColumn3",
                "aria-expanded":false
              }
            }
          },
          "imgDropdown": {text:"O", isVisible : true}
        }
      };

      this.segUIConditionalMapping = {
        "segServiceRequest" : {
          "Yes" : {
            "flxField4": {isVisible : true},
            "flxDropdown": {
              onClick : this.onSegmentRowToggle.bind(this),
              accessibilityConfig:{
                "a11yLabel":"Show more details for service request with reference number",
                "a11yARIA":{
                  "tabindex":0,
                  "role":"button",
                  "aria-labelledby":"lblColumn3",
                  "aria-expanded":false
                }
              }
            },
            "imgDropdown": {text:"O", isVisible : true}
          },
          "No" : {
            "flxField4": {isVisible : false},
            "flxDropdown": {
              onClick : this.onSegmentRowToggle.bind(this),
              accessibilityConfig:{
                "a11yLabel":"Hide details for service request with reference number",
                "a11yARIA":{
                  "tabindex":0,
                  "role":"button",
                  "aria-labelledby":"lblColumn3",
                  "aria-expanded":false
                }
              }
            },
            "imgDropdown": {text:"O", isVisible : true},
            "flxRequestsMobileSelected": {height : "210dp"}
          },
        }
      };

      this.sortFields = {
        "column1" : "",
        "column2" : "",
        "column3" : "",
        "column4" : ""
      };
      this.advancedSearchBtn = false;

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this, 'serviceParameters', () => {
        return this._serviceParameters;
      });
      defineSetter(this, 'serviceParameters', value => {
        this._serviceParameters = value;
      });
      defineGetter(this, 'dataMapping', () => {
        return this._dataMapping;
      });
      defineSetter(this, 'dataMapping', value => {
        this._dataMapping = value;
      });
      defineGetter(this, 'dataFormatting', () => {
        return this._dataFormatting;
      });
      defineSetter(this, 'dataFormatting', value => {
        this._dataFormatting = value;
      });
      defineGetter(this, 'conditionalMappingKey', () => {
        return this._conditionalMappingKey;
      });
      defineSetter(this, 'conditionalMappingKey', value => {
        this._conditionalMappingKey = value;
      });
      defineGetter(this, 'conditionalMapping', () => {
        return this._conditionalMapping;
      });
      defineSetter(this, 'conditionalMapping', value => {
        this._conditionalMapping = value;
      });
      defineGetter(this, 'filterValues', () => {
        return this._filterValues;
      });
      defineSetter(this, 'filterValues', value => {
        this._filterValues = value;
      });
      defineGetter(this, 'filterHeading', () => {
        return this._filterHeading;
      });
      defineSetter(this, 'filterHeading', value => {
        this._filterHeading = value;
      });
      defineGetter(this, 'selectedFilter', () => {
        return this._selectedFilter;
      });
      defineSetter(this, 'selectedFilter', value => {
        this._selectedFilter = value;
      });
      defineGetter(this, 'sknFilterValueText', () => {
        return this._sknFilterValueText;
      });
      defineSetter(this, 'sknFilterValueText', value => {
        this._sknFilterValueText = value;
      });
      defineGetter(this, 'sknFilterRowSelected', () => {
        return this._sknFilterRowSelected;
      });
      defineSetter(this, 'sknFilterRowSelected', value => {
        this._sknFilterRowSelected = value;
      });
      defineGetter(this, 'sknFilterRowUnselected', () => {
        return this._sknFilterRowUnselected;
      });
      defineSetter(this, 'sknFilterRowUnselected', value => {
        this._sknFilterRowUnselected = value;
      });
      defineGetter(this, 'sknFilterList', () => {
        return this._sknFilterList;
      });
      defineSetter(this, 'sknFilterList', value => {
        this._sknFilterList = value;
      });
      defineGetter(this, 'sknSearchAndFilterBackground', () => {
        return this._sknSearchAndFilterBackground;
      });
      defineSetter(this, 'sknSearchAndFilterBackground', value => {
        this._sknSearchAndFilterBackground = value;
      });
      defineGetter(this, 'sknFilterHeading', () => {
        return this._sknFilterHeading;
      });
      defineSetter(this, 'sknFilterHeading', value => {
        this._sknFilterHeading = value;
      });
      defineGetter(this, 'sknFilterRowHover', () => {
        return this._sknFilterRowHover;
      });
      defineSetter(this, 'sknFilterRowHover', value => {
        this._sknFilterRowHover = value;
      });
      defineGetter(this, 'BREAKPTS', () => {
        return this._BREAKPTS;
      });
      defineSetter(this, 'BREAKPTS', value => {
        this._BREAKPTS = value;
      });
      defineGetter(this, 'iconFilterRowExpanded', () => {
        return this._iconFilterRowExpanded;
      });
      defineSetter(this, 'iconFilterRowExpanded', value => {
        this._iconFilterRowExpanded = value;
      });
      defineGetter(this, 'iconFilterRowCollapsed', () => {
        return this._iconFilterRowCollapsed;
      });
      defineSetter(this, 'iconFilterRowCollapsed', value => {
        this._iconFilterRowCollapsed = value;
      });
      defineGetter(this, 'iconRadioButtonSelected', () => {
        return this._iconRadioButtonSelected;
      });
      defineSetter(this, 'iconRadioButtonSelected', value => {
        this._iconRadioButtonSelected = value;
      });
      defineGetter(this, 'iconRadioButtonUnselected', () => {
        return this._iconRadioButtonUnselected;
      });
      defineSetter(this, 'iconRadioButtonUnselected', value => {
        this._iconRadioButtonUnselected = value;
      });
      defineGetter(this, 'isFilterEnabled', () => {
        return this._isFilterEnabled;
      });
      defineSetter(this, 'isFilterEnabled', value => {
        this._isFilterEnabled = value;
      });
    },
    
    
   
    /**
     * Component preShow
     */
    preShow: function() {
      try {           
        this.view.onBreakpointChange = this.onBreakpointChange;
        this.businessController.setProperties(this.serviceParameters,this.dataFormatting);
        this.resetSearch = true;
        this.fetchServiceRequests();  
        this.initActions();
        this._prevIdx = undefined;
        this.renderCalendars();
        this.view.calDateFrom.calendarIconAlignment = constants.CALENDAR_ICON_ALIGN_AUTO;
        this.view.calDateTo.calendarIconAlignment = constants.CALENDAR_ICON_ALIGN_AUTO;
      } catch (err) {
        var errObj = {
          "errorInfo": "Error in preshow method of the component.",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**
	* @api : postShow
	* Performs the actions required before rendering component
	* @return : NA
	*/
    postShow: function() {
      var scope = this;
      try {
        this.setViewActions();     
        this.setComponentData();
        scope.view.btnAdvancedSearch.onClick = this.openAdvancedSearch;
        scope.view.btnCancelSearch.onClick = this.cancelAdvancedSearch;
        scope.view.btnClearSearch.onClick = function(){
          scope.clearSearch();
          kony.application.dismissLoadingScreen();
          scope.view.lblAdvancedSearchTitle.setActive(true);
        }
        scope.view.btnCancelSearchM.onClick = this.cancelAdvancedSearch;       
        scope.view.btnModifySearch.onClick = this.modifyAdvancedSearch;
// 		scope.view.flxSearchResults.height = "1dp";
//      scope.view.flxSearchResults.setVisibility(true);
        this.view.flxDropdown.accessibilityConfig={
          "a11yLabel":"Currently viewing "+this.view.lblSelectedFilterValue.text+". Click here to show list of views.",
          "a11yARIA":{
            "tabindex":0,
            "aria-expanded":false,
            "role":"button"
          }
        }
        this.view.flxAdvSearch1.accessibilityConfig={
          "a11yLabel":"search "+this.view.lblByRequestType.text.slice(0, -1)+". Currently selected "+this.view.lblSelectedAdvSearch1.text+". Click to show list of "+this.view.lblByRequestType.text.slice(0, -1),
          "a11yARIA":{
            "role":"button",
            "aria-expanded":false,
            "tabindex":0
          }
        }
        this.view.flxAdvSearch2.accessibilityConfig={
          "a11yLabel":"search "+this.view.lblByStatus.text.slice(0, -1)+". Currently selected "+this.view.lblSelectedAdvSearch2.text+". Click to show list of "+this.view.lblByStatus.text.slice(0, -1),
          "a11yARIA":{
            "role":"button",
            "aria-expanded":false,
            "tabindex":0
          }
        }
        this.view.flxAdvSearch4.accessibilityConfig={
          "a11yLabel":"search "+this.view.lblByServiceRequest.text.slice(0, -1)+". Currently selected "+this.view.lblSelectedAdvSearch4.text+". Click to show list of "+this.view.lblByServiceRequest.text.slice(0, -1),
          "a11yARIA":{
            "role":"button",
            "aria-expanded":false,
            "tabindex":0
          }
        }
        this.view.flxByAccount.accessibilityConfig={
          "a11yLabel":"search "+this.view.lblByAccount.text.slice(0, -1)+". Currently selected "+this.view.lblSelectedByAccount.text+". Click to show list of "+this.view.lblByAccount.text.slice(0, -1),
          "a11yARIA":{
            "role":"button",
            "tabindex":0,
            "aria-expanded":false
          }
        }
        this.view.segServiceRequest.accessibilityConfig={
          "a11yARIA":{
            "tabindex":-1
          }
        }
        this.view.txtSearch.skin="sknTextBoxSSP42424215PxNoBorder";
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "postShow",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    setLayoutForMobileRTL: function(){
      this.view.paginationFooter.setLayoutForMobileRTL();
    },
    setLayoutForMobile: function(){
      this.view.paginationFooter.setLayoutForMobile();
    },
    setLayoutForTabletRTL: function(){
      this.view.paginationFooter.setLayoutForTabletRTL();
    },
    setLayoutForTablet: function(){
      this.view.paginationFooter.setLayoutForTablet();
    },
    setLayoutForDesktopRTL: function(){
      this.view.paginationFooter.setLayoutForDesktopRTL();
    },
    setLayoutForDesktop: function(){
      this.view.paginationFooter.setLayoutForDesktop();
    },
    /**
     * @api : setContext
     * Method to set the context value 
     * @return : NA
     */
    setContext: function(context) {
      var scope = this;
      try{
        this.context = context;
        this.view.preShow = this.preShow;
        this.view.postShow = this.postShow;
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "SetContext",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    /**
     * @api : onBreakpointChange
     * Method invoked on chaning break points
     * @return : NA
     */
    onBreakpointChange: function() {
      var scope = this;
      try{
        this.render();
        if (this._isFilterEnabled) {
          this.view.flxFilter.setVisibility(true);
          this.setFilterField();
          this.clearSearch();
        } else {
          this.view.flxFilter.setVisibility(false);
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "onBreakpointChange",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    /**
     * Method to open Advanced Search section.
     */
    openAdvancedSearch: function(){ 
      this.onSearchClick();
      this.view.txtSearch.text = "";

      this.businessController.resetDataList();
      this.updateSearchViewModel();

      this.getFilterLists();
      this.setSearchProperties();

      this.view.lblSelectedFilterValue.text = kony.i18n.getLocalizedString("i18n.serviceRequests.AllServiceRequests");
      if(kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile){
				this.view.calDateFrom.height = "77%";
				this.view.calDateTo.height = "77%";
				this.view.lblToByDate.top = "6px";
			}
      this.view.flxAdvancedSearchContainer.isVisible = true;
      this.view.flxSearchContainer.isVisible = false;
      this.searchViewModel.visible = true;
      this.searchViewModel.simpleSearchPerformed = false;
      this.advancedSearchBtn = true;
      this.view.lblAdvancedSearchTitle.setActive(true);
    },
    /**
     * Method to cancel Advanced Search.
     */
    cancelAdvancedSearch: function(){
      this.clearSearch();
      this.view.flxAdvancedSearchContainer.isVisible = false;
      this.view.flxSearchContainer.isVisible = true;
      this.searchViewModel.visible = false;
      kony.application.dismissLoadingScreen();
      this.view.btnAdvancedSearch.setActive(true);
    },

    /**
     * Method to modify Advanced Search section.
     */
    modifyAdvancedSearch: function(){     
      this.view.flxAdvancedSearchContainer.isVisible = true;
      this.view.flxSearchContainer.isVisible = false;
      this.searchViewModel.visible = true;

      this.getFilterLists();
      this.setSearchProperties();
      this.view.lblAdvancedSearchTitle.setActive(true);
    },

    /**
     * Method responsible for getting the breakpoint specific value.
     * @param {JSONObject or String} value - Value that needs to be processed.
     * @return {string} - Processed value
     */
    getBreakPointTypeBasedValue: function (value) {
      try {
        var valueJson = JSON.parse(value);
        if (typeof (valueJson) === 'string') {
          value = valueJson;
        } else {
          value = this.ParserUtilsManager.getcomponentConfigValue(valueJson, kony.application.getCurrentBreakpoint());
        }
      } catch (e) {
        kony.print(e);
      }
      if (typeof (value) === 'string') {
        return this.getProcessedText(value);
      } else {
        return this.getProcessedText(JSON.stringify(value));
      }
    },
    /**
     * Method to pass the text to parser util to obtain the processed value.
     * @param {string} text - value to be processed.
     * @return {string} - processed value.
     */
    getProcessedText: function (text) {
      return this.ParserUtilsManager.getParsedValue(text);
    },
    /**
     * Method to initialize Filter Field
     */
    setFilterField: function () {
      try {

        //   this.view.lblDropdownIcon.text = JSON.parse(this._iconFilterRowCollapsed)["vizIcon"];
        //   this.view.lblDropdownIcon.skin = JSON.parse(this._iconFilterRowCollapsed)["skin"];
        this.view.flxSegmentFilter.setVisibility(false);
        
        this.view.flxSegmentFilter.skin = this._sknFilterList;
        // this.view.lblView.text = this.getProcessedText(this._filterHeading) + ":";
        this.view.lblView.skin = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._sknFilterHeading)));
        this.view.lblSelectedFilterValue.skin = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._sknFilterValueText)));
        var filterValues = this.getFilterDetails(this.simpleSearch.fieldKey, this.simpleSearch.fieldValue, true);
        var selectedFilter = JSON.parse(this._selectedFilter);
        // !this._prevIdx && (selectedFilter.id = "All");
        filterValues.forEach(function (filter) {
          if (filter.id === selectedFilter.id) {
            this.view.lblSelectedFilterValue.text = this.getProcessedText(filter.text);
          }
        }.bind(this));
        this.view.flxDropdown.accessibilityConfig={
          "a11yLabel":"Currently viewing "+this.view.lblSelectedFilterValue.text+". Click here to show list of views.",
          "a11yARIA":{
            "tabindex":0,
            "aria-expanded":false,
            "role":"button"
          }
        }
        var filterValuesTextSkin = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._sknFilterValueText)));
        var dataWidgetMap = {
          "lblRadioBtnIcon": "lblRadioBtnIcon",
          "lblFilterValue": "lblFilterValue",
          "flxFilterList": "flxFilterList",
          "btnFilterValue": "btnFilterValue",
        };
        var data = filterValues.map(function (filter, index) {
          var filterRow = {
            "id": filter.id,
            "lblFilterValue": {
              "text": this.getProcessedText(filter.text),
              "skin": filterValuesTextSkin
            },
            "flxFilterList": {
              "height": (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? "40dp" : "50dp",
            },
            "btnFilterValue": {
                "isVisible": false
            }
          };
          if (filter.id === selectedFilter.id) {
            this._prevIdx = index;
            filterRow["lblRadioBtnIcon"] = {
              "text": JSON.parse(this._iconRadioButtonSelected)["vizIcon"],
              "skin": JSON.parse(this._iconRadioButtonSelected)["skin"]
            };
            filterRow["flxFilterList"] = {
              "skin": this._sknFilterRowSelected,
              "onKeyPress":this.filterOnkeyPress,
              "accessibilityConfig":{
                "a11yARIA":{
                  "role":"radio",
                  "tabindex":0,
                  "aria-checked":true,
                  "aria-labelledby":"lblFilterValue",
                }
              }
            };
          } else {
            filterRow["lblRadioBtnIcon"] = {
              "text": JSON.parse(this._iconRadioButtonUnselected)["vizIcon"],
              "skin": JSON.parse(this._iconRadioButtonUnselected)["skin"]
            };
            filterRow["flxFilterList"] = {
              "skin": this._sknFilterRowUnselected,
              "onKeyPress":this.filterOnkeyPress,
              "accessibilityConfig":{
                "a11yARIA":{
                  "role":"radio",
                  "tabindex":0,
                  "aria-checked":false,
                  "aria-labelledby":"lblFilterValue",
                }
              }
            };
          }
          return filterRow;
        }.bind(this));
        this.view.segFilter.widgetDataMap = dataWidgetMap;
        this.view.segFilter.setData(data);
      } catch (err) { 
        var errObj = {
          "errorInfo": "Error while setting Filter field in the UI.",
          "error": err
        };
        this.onError(errObj);
      }
    },
    filterOnkeyPress:function(eventObject,eventPayload,context){
      if(eventPayload.keyCode===9){
        if(eventPayload.shiftKey){
          if(context.rowIndex===0){
            eventPayload.preventDefault();
            this.toggleFilterDropdown('flxSegmentFilter');
          }
        }
        else{
          if(context.rowIndex===context.widgetInfo.data.length-1){
            eventPayload.preventDefault();
            this.toggleFilterDropdown('flxSegmentFilter');
          }
        }
      }
      if(eventPayload.keyCode===27){
        eventPayload.preventDefault();
        this.toggleFilterDropdown('flxSegmentFilter');
      }
    },
    /**
     * Method to initialize component actions
     */
    initActions: function () {
      try {
        this.view.flxByAccountSegment.setVisibility(false);
        this.view.flxSearchContainer.setVisibility(true);
        this.view.flxDropdown.onClick = this.toggleFilterDropdown.bind(this, 'flxSegmentFilter');
        this.view.flxDropdown.onKeyPress=this.dropdownOnkeyPress;
        this.view.segFilter.onTouchStart = this.notHideSegment.bind(this);
        this.view.segFilter.onRowClick = this.onSegFilterRowClick.bind(this);
        this.view.flxByAccount.onKeyPress=this.onAccountKeyPress;
        this.view.flxByAccount.onClick = this.onSegAccountShow.bind(this, 'flxByAccountSegment');
     //   this.view.segByAccount.onTouchStart = this.notHideSegment.bind(this);
        this.view.segByAccount.onRowClick = this.onSegByAccountRowClick.bind(this);
        this.view.flxAllByAccounts.onClick = this.onSegByAccountAllRowClick.bind(this);
        this.view.flxAdvSearch4.onKeyPress = this.advSearch4OnKeyPress;
        this.view.flxAdvSearch4.onClick = this.getAdvSearch4List.bind(this,'flxSegmentAdvSearch4');
        this.view.segAdvSearch4.onRowClick = this.onSegAdvSearch4RowClick.bind(this);
      //  this.view.segAdvSearch4.onTouchStart = this.notHideSegment.bind(this);

        this.view.flxAdvSearch2.onClick = this.getAdvSearch2List.bind(this, 'flxSegmentAdvSearch2');
        this.view.segAdvSearch2.onRowClick = this.onSegAdvSearch2RowClick.bind(this);
     //   this.view.segAdvSearch2.onTouchStart = this.notHideSegment.bind(this);
        this.view.flxAdvSearch2.onKeyPress = this.advSearch2OnKeyPress;
        this.view.flxAdvSearch1.onClick = this.getAdvSearch1List.bind(this, 'flxSegmentAdvSearch1');
        this.view.flxAdvSearch1.onKeyPress = this.advSearch1OnKeyPress;
        this.view.segAdvSearch1.onRowClick = this.onSegAdvSearch1RowClick.bind(this);
     //   this.view.segAdvSearch1.onTouchStart = this.notHideSegment.bind(this);

        this.serviceReqMaxPeriod = this.businessController.getMaxPeriod();
        this.view.txtSearch.onKeyUp = this.onSearch.bind(this);
        this.view.flxClearBtn.onClick = this.onKeywordClearBtnClick.bind(this);
        this.view.flxClearBtnSearch.onClick = this.onSearchClearBtnClick.bind(this);
        this.advancedSearch = this.dataMapping.advancedSearch.default;
        this.simpleSearch = this.dataMapping.simpleSearch;
        this.computeDatesWithServiceReq = this.computeDatesWithServiceReq.bind(this);
        this.view.txtSearch.text = "";
      } catch (err) {
        var errObj = {
          "errorInfo": "Error while initialising Component Actions.",
          "error": err
        };
        this.onError(errObj);
      }
    },
    dropdownOnkeyPress:function(eventObject,eventPayload){
      if(eventPayload.keyCode===9){
        if(!eventPayload.shiftKey){
          if(this.view.flxSegmentFilter.isVisible===true){
          eventPayload.preventDefault();
          this.view.segFilter.setActive(0,-1,"flxFilterList");
        }
      }
      else{
        if(this.view.flxSegmentFilter.isVisible===true){
          this.toggleFilterDropdown('flxSegmentFilter');
          eventPayload.preventDefault();
          this.view.btnAdvancedSearch.setActive(true);
        }
      }
      }
      if(eventPayload.keyCode===27){
        if(this.view.flxSegmentFilter.isVisible===true){
          this.toggleFilterDropdown('flxSegmentFilter');
          eventPayload.preventDefault();
          this.view.flxDropdown.setActive(true);
        }
      }
    },
    advSearch1OnKeyPress:function(eventObject,eventPayload){
      if(eventPayload.keyCode===9){
        if(!eventPayload.shiftKey){
          if(this.view.flxSegmentAdvSearch1.isVisible===true){
          eventPayload.preventDefault();
          this.view.segAdvSearch1.setActive(0,-1,"flxListDropdown");
        }
      }
      else{
        if(this.view.flxSegmentAdvSearch1.isVisible===true){
          this.getAdvSearch1List('flxSegmentAdvSearch1');
          eventPayload.preventDefault();
          this.view.txtKeyword.setActive(true);
        }
      }
      }
      if(eventPayload.keyCode===27){
        if(this.view.flxSegmentAdvSearch1.isVisible===true){
          this.getAdvSearch1List('flxSegmentAdvSearch1');
          eventPayload.preventDefault();
          this.view.flxAdvSearch1.setActive(true);
        }
      }
    },
    advSearch2OnKeyPress:function(eventObject,eventPayload){
      if(eventPayload.keyCode===9){
        if(!eventPayload.shiftKey){
          if(this.view.flxSegmentAdvSearch2.isVisible===true){
          eventPayload.preventDefault();
          this.view.segAdvSearch2.setActive(0,-1,"flxListDropdown");
        }
      }
      else{
        if(this.view.flxSegmentAdvSearch2.isVisible===true){
          this.getAdvSearch2List('flxSegmentAdvSearch2');
          eventPayload.preventDefault();
          this.view.flxAdvSearch1.setActive(true);
        }
      }
      }
      if(eventPayload.keyCode===27){
        if(this.view.flxSegmentAdvSearch2.isVisible===true){
          this.getAdvSearch2List('flxSegmentAdvSearch2');
          eventPayload.preventDefault();
          this.view.flxAdvSearch2.setActive(true);
        }
      }
      
    },
    advSearch4OnKeyPress:function(eventObject,eventPayload){
      if(eventPayload.keyCode===9){
        if(!eventPayload.shiftKey){
          if(this.view.flxSegmentAdvSearch4.isVisible===true){
          eventPayload.preventDefault();
          this.view.segAdvSearch4.setActive(0,-1,"flxListDropdown");
        }
      }
      else{
        if(this.view.flxSegmentAdvSearch4.isVisible===true){
          this.getAdvSearch4List('flxSegmentAdvSearch4');
          eventPayload.preventDefault();
          this.view.flxByAccount.setActive(true);
        }
      }
      }
      if(eventPayload.keyCode===27){
        if(this.view.flxSegmentAdvSearch4.isVisible===true){
          this.getAdvSearch4List('flxSegmentAdvSearch4');
          eventPayload.preventDefault();
          this.view.flxAdvSearch4.setActive(true);
        }
      }

    },
    onAccountKeyPress : function(eventObject,eventPayload){
      if(eventPayload.keyCode===27){
        if(this.view.flxByAccountSegment.isVisible===true){
          this.onSegAccountShow('flxByAccountSegment');
          eventPayload.preventDefault();
          this.view.flxByAccount.setActive(true);
        }
      }
      if(eventPayload.keyCode===9){
        if(eventPayload.shiftKey){
          if(this.view.flxByAccountSegment.isVisible===true){
            this.onSegAccountShow('flxByAccountSegment');
            eventPayload.preventDefault();
            this.view.flxAdvSearch2.setActive(true);
          }
        }
      }
    },
    /**
     * Method to show or hide the filter list
     */
    toggleFilterDropdown: function (flexName) {
      if (this.view.lblDropdownIcon.text === JSON.parse(this._iconFilterRowCollapsed)["vizIcon"]) {
        this.view.lblDropdownIcon.text = JSON.parse(this._iconFilterRowExpanded)["vizIcon"];
        this.setFilterField();
        this.view.flxSegmentFilter.setVisibility(true);
        this.view.flxDropdown.accessibilityConfig={
          "a11yLabel":"Currently viewing "+this.view.lblSelectedFilterValue.text+". Click here to hide list of views.",
          "a11yARIA":{
            "tabindex":0,
            "aria-expanded":true,
            "role":"button"
          }
        }
        this.flagSegment = flexName;
      } else {
        this.view.lblDropdownIcon.text = JSON.parse(this._iconFilterRowCollapsed)["vizIcon"];
        this.view.flxSegmentFilter.setVisibility(false);
        this.view.flxDropdown.accessibilityConfig={
          "a11yLabel":"Currently viewing "+this.view.lblSelectedFilterValue.text+". Click here to show list of views.",
          "a11yARIA":{
            "tabindex":0,
            "aria-expanded":false,
            "role":"button"
          }
        }
        this.flagSegment = 'none';
      }
      this.view.flxDropdown.setActive(true);
    },
    /**
     * Method to set selected & unselected row in filter segment when a row is clicked
     */
    onSegFilterRowClick: function () {
      try {
        this.startSelect = false;
        this._currIdx = this.view.segFilter.selectedRowIndex[1];
        var filterValues = this.getFilterDetails(this.simpleSearch.fieldKey, this.simpleSearch.fieldValue, true);
        this._selectedFilter = JSON.stringify(filterValues[this._currIdx]);
        var data = this.view.segFilter.data;
        if (this._prevIdx === this._currIdx) {
          return;
        }
        if (this._prevIdx !== null && this._prevIdx !== undefined) {
          data[this._prevIdx].lblRadioBtnIcon.text = JSON.parse(this._iconRadioButtonUnselected)["vizIcon"];
          data[this._prevIdx].lblRadioBtnIcon.skin = JSON.parse(this._iconRadioButtonUnselected)["skin"];
          data[this._prevIdx].flxFilterList.skin = this._sknFilterRowUnselected;
          data[this._prevIdx].flxFilterList.accessibilityConfig={
            "a11yARIA":{
              "role":"radio",
              "tabindex":0,
              "aria-checked":false,
              "aria-labelledby":"lblFilterValue",
            }
          };
          this.view.segFilter.setDataAt(data[this._prevIdx], this._prevIdx);
        }
        data[this._currIdx].lblRadioBtnIcon.text = JSON.parse(this._iconRadioButtonSelected)["vizIcon"];
        data[this._currIdx].lblRadioBtnIcon.skin = JSON.parse(this._iconRadioButtonSelected)["skin"];
        data[this._currIdx].flxFilterList.skin = this._sknFilterRowSelected;
        data[this._prevIdx].flxFilterList.accessibilityConfig={
          "a11yARIA":{
            "role":"radio",
            "tabindex":0,
            "aria-checked":true,
            "aria-labelledby":"lblFilterValue",
          }
        };
        this.view.segFilter.setDataAt(data[this._currIdx], this._currIdx);
        this.view.lblSelectedFilterValue.text = data[this._currIdx].lblFilterValue.text;
        this._prevIdx = this._currIdx;
        //this.clearSearchText();
        this.toggleFilterDropdown();
        this.onFilterSelect(data[this._currIdx].id);

      } catch (err) {
        var errObj = {
          "errorInfo": "Error while selecting a Filter or while sending selected filter id to form.",
          "error": err
        };
        this.onError(errObj);
      }
    },

    onFilterSelect: function(searchValue){

      if (searchValue === 'all')
        this.clearSearch();      
      else{
        var searchCriteria = [];
        searchCriteria.push([this.simpleSearch.fieldKey, searchValue ]); 
        this.businessController.fetchServiceRequestsBySearch(searchCriteria);
        this.searchViewModel.searchPerformed = true;
        this.searchViewModel.simpleSearchPerformed = true;
      }

    },
    //click on by account label
    onSegAccountShow: function(flexName) {
            if (this.view.flxByAccountSegment.isVisible === true) {
                this.view.flxByAccountSegment.setVisibility(false);
				this.view.flxSegmentAdvSearch1.setVisibility(false);
				this.view.flxSegmentAdvSearch2.setVisibility(false);
				this.view.flxSegmentAdvSearch4.setVisibility(false);
                this.view.lblDropdown.text = "O";
				this.view.lblDropdownAdvSearch1.text = "O";
				this.view.lblDropdownAdvSearch2.text = "O";
				this.view.lblDropdownAdvSearch4.text = "O";
                this.view.flxByAccount.accessibilityConfig = {
                    "a11yLabel": "search " + this.view.lblByAccount.text.slice(0, -1) + ". Currently selected " + this.view.lblSelectedByAccount.text + ". Click to show list of " + this.view.lblByAccount.text.slice(0, -1),
                    "a11yARIA": {
                        "role": "button",
                        "tabindex": 0,
                        "aria-expanded": false
                    }
                }
                this.flagSegment = 'none';
            } else {
                this.view.flxByAccountSegment.setVisibility(true);
				this.view.flxSegmentAdvSearch1.setVisibility(false);
				this.view.flxSegmentAdvSearch2.setVisibility(false);
				this.view.flxSegmentAdvSearch4.setVisibility(false);
                this.view.lblDropdown.text = "P";
				this.view.lblDropdownAdvSearch1.text = "O";
				this.view.lblDropdownAdvSearch2.text = "O";
				this.view.lblDropdownAdvSearch4.text = "O";
                this.view.flxByAccount.accessibilityConfig = {
                    "a11yLabel": "Click to hide " + this.view.lblByAccount.text.slice(0, -1),
                    "a11yARIA": {
                        "role": "button",
                        "tabindex": 0,
                        "aria-expanded": true
                    }
                }
                this.flagSegment = flexName;
            }
            var list = [];
            list = this.businessController.getAccountList('accountId', 'accountName', 'accountType');
            var dataWidgetMap = {
                "headerAccountName": "headerAccountName",
                "lblUsers": "lblUsers",
                "flxAccountTypes": "flxAccountTypes"
            };
            var data = list.map(function(listData, listId) {
                var segRecord = JSON.parse(JSON.stringify(listData));
                var filterRow = {
                    "headerAccountName": listData[2],
                    "lblUsers": listData[1]
                };
                return filterRow;
            }.bind(this));
            this.view.segByAccount.widgetDataMap = dataWidgetMap;
            var typesList = data.reduce(function(r, a) {
                r[a.headerAccountName] = r[a.headerAccountName] || [];
                r[a.headerAccountName].push(a);
                return r;
            }, Object.create(null));
            var finalList = Object.values(typesList);
            var a = [];
            var b = [];
            for (key in finalList) {
                var af = [];
                for (keyk in finalList[key]) {
                    af.push({
                        "lblUsers": finalList[key][keyk].lblUsers,
                        "flxAccountTypes": {
                            "onKeyPress": this.accountsOnkeyPress,
                            "accessibilityConfig": {
                                "a11yARIA": {
                                    "tabindex": 0,
                                    "role": "button",
                                    "aria-labelledby": "lblUsers"
                                }
                            }
                        }
                    });
                }
                b.push([{
                    "headerAccountName": finalList[key][0].headerAccountName
                }, af]);
            }
            this.view.segByAccount.setData(b);
            this.view.flxByAccount.setActive(true);
        },
    accountsOnkeyPress: function (eventObject, eventPayload, context) {
      if (eventPayload.keyCode === 9) {
        if (eventPayload.shiftKey) {
          if (context.sectionIndex === 0 && context.rowIndex === 0) {
            eventPayload.preventDefault();
            this.onSegAccountShow('flxByAccountSegment');
          }
        }
        else {
          if (context.sectionIndex === context.widgetInfo.data.length - 1) {
            if (context.rowIndex === context.widgetInfo.data[length][1].length - 1) {
              eventPayload.preventDefault();
              this.onSegAccountShow('flxByAccountSegment');
              this.view.flxAdvSearch4.setActive(true);
            }
          }
        }
      }
      if (eventPayload.keyCode === 27) {
        eventPayload.preventDefault();
        this.onSegAccountShow('flxByAccountSegment');
      }
    },
    onSegByAccountRowClick: function(){
      this.startSelect = false;
      var index = this.view.segByAccount.selectedRowIndex;
      this.view.flxByAccountSegment.setVisibility(false);
      this.view.lblDropdown.text = "O";
      this.view.flxByAccount.accessibilityConfig={
        "a11yLabel":"search "+this.view.lblByAccount.text.slice(0, -1)+". Currently selected "+this.view.lblSelectedByAccount.text+". Click to show list of "+this.view.lblByAccount.text.slice(0, -1),
        "a11yARIA":{
          "role":"button",
          "tabindex":0,
          "aria-expanded":false
        }
      }
      this.view.lblSelectedByAccount.text = this.view.segByAccount.data[index[0]][1][index[1]].lblUsers;
      this.checkSearchButtonState();
      this.view.flxByAccount.setActive(true);
    },

    onSegByAccountAllRowClick : function(){
      this.startSelect = false;
      this.view.flxByAccountSegment.setVisibility(false);
      this.view.lblDropdown.text = "O";
      this.view.flxByAccount.accessibilityConfig={
        "a11yLabel":"search "+this.view.lblByAccount.text.slice(0, -1)+". Currently selected "+this.view.lblSelectedByAccount.text+". Click to show list of "+this.view.lblByAccount.text.slice(0, -1),
        "a11yARIA":{
          "role":"button",
          "tabindex":0,
          "aria-expanded":false
        }
      }
      this.view.lblSelectedByAccount.text = this.view.lblByAccountAll.text;
      this.checkSearchButtonState();
      this.view.flxByAccount.setActive(true);
    },
    /**
	* @api : fetchServiceRequests
	* To get meta data and get data from object model
	* @return : NA
	*/
    fetchServiceRequests : function(){
      var scope = this;
      try{
        this.businessController.getMetaData();
        this.businessController.fetchServiceRequests(this.context);
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "fetchTransactions",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    /**
     * Method used to call the search service with the entered search text 
     */
    onSearch: function () {
      try {
        this.searchViewModel.keywordSearchPerformed = true;
        this.resetPagination();
        var searchKeyword = this.view.txtSearch.text;
        if (searchKeyword.length >= 1) {  
          let searchCriteria = this.dataMapping.keywordSearch;
          this.businessController.filterData(searchKeyword,searchCriteria);
        }
        else {
          this.businessController.resetDataList();
          this.searchViewModel.keywordSearchPerformed = false;
        }
      } catch (err) {
        var errObj = {
          "errorInfo": "Error while sending Search text to form.",
          "error": err
        };
        this.onError(errObj);
      }
      this.onKeyUpTxtSearch();
    },      
    /**
	* @api : setViewActions
	* Set the default actions for component
	* @return : NA
	*/
    setViewActions : function(){
      var scope = this;
      try{
        this.view.flxColumn1Right.onClick = this.sortRecords.bind(this, 1);
        this.view.flxColumn1Right.accessibilityConfig={
          "a11yLabel":this.view.lblColumn1.text+" Column, sorted in ascending order. click to sort in descending order",
          "a11yARIA":{
            "tabindex":0,
            "role":"button"
          }
        }
        this.view.imgColumn1Right.src="sorting_previous.png";
        this.view.flxColumn2Right.onClick = this.sortRecords.bind(this, 2);
        this.view.flxColumn2Right.accessibilityConfig={
          "a11yLabel":this.view.lblColumn2.text+" Column, no sort applied. click to sort in ascending order",
          "a11yARIA":{
            "tabindex":0,
            "role":"button"
          }
        }
        this.view.flxColumn3Right.onClick = this.sortRecords.bind(this, 3);
        this.view.flxColumn3Right.accessibilityConfig={
          "a11yLabel":this.view.lblColumn3.text+" Column, no sort applied. click to sort in ascending order",
          "a11yARIA":{
            "tabindex":0,
            "role":"button"
          }
        }
        this.view.flxColumn4Right.onClick = this.sortRecords.bind(this, 4);
        this.view.flxColumn4Right.accessibilityConfig={
          "a11yLabel":this.view.lblColumn4.text+" Column, no sort applied. click to sort in ascending order",
          "a11yARIA":{
            "tabindex":0,
            "role":"button"
          }
        }
        this.view.paginationFooter.fetchPaginatedRecords = this.fetchPaginationFooter.bind(this);
        this.setColumnHeaderData();
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setViewActions",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    /**
	* @api : setSegmentWidgetDataMap
	* This method will set the widget data map for segServiceRequest segment
	* @return : NA
	*/
    setSegmentWidgetDataMap : function() {
      this.view.segServiceRequest.widgetDataMap = {
        "flxDropdown": "flxDropdown",
        "imgDropdown": "imgDropdown",
        "lblColumn1": "lblColumn1",
        "lblColumn1Accessibility": "lblColumn1Accessibility",
        "lblColumn2Accessibility": "lblColumn2Accessibility",
        "lblColumn3Accessibility": "lblColumn3Accessibility",
        "lblColumn4Accessibility": "lblColumn4Accessibility",
        "valueField1": "valueField1",
        "lblColumn2": "lblColumn2",
        "valueField2": "valueField2",
        "lblColumn3": "lblColumn3",
        "valueField3": "valueField3",
        "lblColumn4" : "lblColumn4",
        "lblColumn4l" : "lblColumn4l",
        "valueField4" : "valueField4",
        "lblField4":"lblField4",
        "flxLblField4":"flxLblField4",
        "flxField4":"flxField4",
        "flxField3":"flxField3",        
        "flxRequestsMobileSelected" : "flxRequestsMobileSelected"
      };
    },



    /**
	* @api : render
	* This method will be invoked when collection is updated to refresh UI
	* @return : NA
	*/
    renderCalendars: function () {
      if(kony.i18n.getCurrentLocale() === "ar_AE"){
        var context1 = {
          "widget": this.view.calDateFrom,
          "anchor": "bottom"
        };
        var context2 = {
          "widget": this.view.calDateTo,
          "anchor": "bottom"
        };
      }
      else {
        var context1 = {
          "widget": this.view.flxByDate,
          "anchor": "bottom"
        };
        var context2 = {
          "widget": this.view.flxToDate,
          "anchor": "bottom"
        };
        var context3 = {
          "widget": this.view.flxByDateTablet,
          "anchor": "bottom"
        };
		var context4 = {
          "widget": this.view.flxToDateTab,
          "anchor": "bottom"
        };
      }
      this.view.calDateFrom.setContext(context1);
      if(kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile)
		this.view.calDateTo.setContext(context1);
      else
		this.view.calDateTo.setContext(context2);
      this.view.calDateFromTablet.setContext(context3);
      this.view.calDateToTablet.setContext(context4);
    },
    render : function() {
      var scope = this;
      try{
        this.collectionObj = ViewRequestsStore.getState();
        this.performDataMapping();
        this.performUIActions();

      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "render",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    /**
	* @api : setComponentData
	* To perform actions required for component
	* @return : NA
	*/
    setComponentData : function() {  
      var scope = this;
      try{
        this.setOffsetLimit();
        this.setSearchProperties();
        this.setConditionalMappingKey();
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setComponentData",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
	* @api : performDataMapping
	* This method will do data mapping with collection
	* @return : NA
	*/
    performDataMapping : function() {
      var scope = this;
      try{
        var dataMapping = this.dataMapping;
        var conditionalDataMapping = this.conditionalMapping;
        for(key in dataMapping){
          if(key === "segments"){
            var widgets = dataMapping[key];
            for(key in widgets){
              var widgetId = key;
              var segData = scope.getSegmentDataFromMapping(widgets[widgetId], conditionalDataMapping[widgetId], widgetId);
              scope.view[widgetId].setData(segData);
            }
          }
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "performDataMapping",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
	* @api : getSegmentDataFromMapping
	* This method will return the segement data from data mapping property
	* @return : Array
	*/
    getSegmentDataFromMapping : function(segDataJSON, conditionalMapping, segId) {
      var scope = this;
      try{
        var segData = [];
        var segMasterDataToken = segDataJSON.segmentMasterData;
        segMasterDataToken = segMasterDataToken.split(".");
        if(segMasterDataToken[0].indexOf("Collection") !== -1){
          var segMasterData = [];
          var key = segMasterDataToken[1].replace("}","");
          if(this.collectionObj.Collection[key]){
            this.getData(this.collectionObj.Collection[key],function(records){
              segMasterData = records; 
            });
          }
          if(segMasterData.length > 0){
            this.totalRecords = segMasterData.length;
            segMasterData = this.getDataBasedOnOffsetLimit(segMasterData);
          }
          segMasterData.map(function(record){
            var segRecord = JSON.parse(JSON.stringify(segDataJSON.segmentUI));
            for(key in segRecord){
              segRecord[key] = scope.getFieldValueFromMapping(key, segRecord[key], conditionalMapping, record);
            }
            segRecord = scope.getUIMappings(segRecord, record, segId);
            segRecord = scope.setUpForDay(segRecord, record);
            segData.push(segRecord);
          });
        }
        return segData;
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "getSegmentDataFromMapping",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    
    //change repayment day integration changes
    setUpForDay: function (segRecord, record) {
      scope = this;
      if (record.type === "ManageAddress") {
        segRecord.flxField3 = {
          "isVisible": false
        };
      }
      if (record.subType == "ChangeRepaymentDate" || record.subType == "ChangeRepaymentAccount" || record.subType == "UpdatePrimaryAddress" || record.subType == "CurrentAccountClosure" || record.subType == "SavingAccountClosure") {
        segRecord.account = record;
        segRecord.lblField4 = { isVisible: true, text: "View More Details", skin: "sknLbl4176A4SSP15Px" };
        segRecord.flxLblField4={"accessibilityConfig":{
          "a11yARIA":{
            "role":"button",
            "tabindex":0,
            "aria-labelledby":"lblField4"
          }
        },
        "onClick": scope.onRequestSelection.bind(scope, record)
      }
        return segRecord;
      }
      return segRecord;
    },
    
    onRequestSelection: function(account){
      var navMan = applicationManager.getNavigationManager();
      navMan.setCustomInfo("frmRepaymentDayRequest",account);
      navMan.navigateTo({
        "appName": "ArrangementsMA",
        "friendlyName": "ServiceRequestsUIModule/frmRepaymentDayRequest"
      });
      
    },

    /**
	* @api : performUIActions
	* This method will do ui changes and actions to be taken before rendering view
	* @return : NA
	*/
    performUIActions : function() {
      var scope = this;
      try{
        var segRecords = this.view.segServiceRequest.data;
        var recordsLength = segRecords.length;
        if (kony.application.getCurrentBreakpoint() > 1024) {
          segRecords.forEach(function (segment, i) {
            segment.lblColumn1Accessibility = {
              text: scope.view.lblColumn1.text + " " + segment.lblColumn1
            };
            segment.lblColumn2Accessibility = {
              text: scope.view.lblColumn2.text + " " + segment.lblColumn2
            };
            segment.lblColumn3Accessibility = {
              text: scope.view.lblColumn3.text + " " + segment.lblColumn3
            };
            segment.lblColumn4Accessibility = {
              text: scope.view.lblColumn4.text + " " + segment.lblColumn4
            };
            scope.view.segServiceRequest.setDataAt(segment, i);
            });
        }
        //  this.setEntitlementsBasedVisibility();
        this.setColumnHeaderData();
        let brkpoint = kony.application.getCurrentBreakpoint();

        if (this.resetSearch){
          this.view.flxAdvancedSearchContainer.setVisibility(false);
          this.view.flxSearchResults.setVisibility(false);
          this.searchViewModel.anySearch = false;
          this.searchViewModel.searchPerformed = false;
          this.searchViewModel.simpleSearchPerformed = false;
          this.searchViewModel.visible = false;
          this.resetSearch = false;
        }

        if(recordsLength > 0){         

          this.view.paginationFooter.updatePaginationBar(recordsLength,this.totalRecords);
          this.view.flxSegmentContainer.setVisibility(true);
          this.view.flxNoResults.setVisibility(false);
          if(!this.searchViewModel.anySearch){
            this.view.flxSearchContainer.setVisibility(true);
            if(brkpoint === 640) {
              this.view.flxSortMobile.setVisibility(false); 
              var data = this.view.segServiceRequest.data;
              var segTemplate = this.getSegmentTemplate();
              var collapseAll = function(segments) {
               segments.forEach(function(segment, i) {
               segment.template =  segTemplate.row;
               segment.lblColumn1 = {
                    skin : "sknLbl727272SSP26pxTab",
                    text : segment.lblColumn1
               };
               segment.lblColumn4 = {
                    skin : "sknLbl727272SSP26pxTab",
                    text : segment.lblColumn4
               };
               scope.view.segServiceRequest.setDataAt(segment, i);
               });
              };
              collapseAll(data);
            } else {
              this.view.flxSort.setVisibility(true);
            }
          }else{
            if(brkpoint !== 640)
              this.view.flxSort.setVisibility(true); 
            else
              this.view.flxSortMobile.setVisibility(true);
          }
          this.view.flxSeparatorSort.setVisibility(true);
          this.view.flxSeparatorSearch.setVisibility(true);
          this.view.flxPaginationFooter.setVisibility(true);

          this.setSegmentWidgetDataMap();
          this.view.segServiceRequest.setData(segRecords);

        }else {
          if (!this.searchViewModel.keywordSearchPerformed){
            this.view.flxSegmentContainer.setVisibility(false);
            this.view.flxSearchContainer.setVisibility(false);
            this.view.flxSort.setVisibility(false);
            this.view.flxSortMobile.setVisibility(false);
            this.view.flxSeparatorSort.setVisibility(false);
            this.view.flxSeparatorSearch.setVisibility(false);

          }else{
            this.view.flxSegmentContainer.setVisibility(true);
            this.view.flxSearchContainer.setVisibility(true);   

            if(brkpoint !== 640)
              this.view.flxSort.setVisibility(true);              
            else
              this.view.flxSortMobile.setVisibility(true);

            this.view.flxSeparatorSort.setVisibility(true);
            this.view.flxSeparatorSearch.setVisibility(true);
          }

          this.view.flxPaginationFooter.setVisibility(false);
          this.view.flxNoResults.setVisibility(true);
        }
        if(this.view.flxSort.isVisible===false && this.view.flxSortMobile.isVisible===false && this.view.flxNoResults.isVisible===false){
          if(this.view.flxSeparatorSearch.isVisible===true){
            this.view.flxSeparatorSort.isVisible=false;
          }         
        }
        if(this.view.flxAdvancedSearchContainer.isVisible)
          this.updateSearchRequestsView();
        this.view.forceLayout();
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "performUIActions",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    getData: function(transactions, callBack){
      transactions.map(function(transaction){
        //   transaction["disputeVisibility"] = false;
        // transaction["viewRequestVisibility"] = false;
        return transaction;
      });
      callBack(transactions);
    },

    /**
	* @api : getFieldValueFromMapping
	* Returns the data in collection using data mapping and conditional data mapping
	* @return : String
	*/
    getFieldValueFromMapping : function(widget, fieldMapping, conditionalMapping, record) {
      var scope = this;
      try{
        var conditionalfieldMapping;
        if(conditionalMapping){
          var conditionalMappingKey = this.conditionalMappingKey;
          if(conditionalMapping[record[conditionalMappingKey]] !== undefined){
            conditionalfieldMapping = conditionalMapping[record[conditionalMappingKey]][widget]; 
          }
        }
        if(conditionalfieldMapping!== undefined) {
          fieldMapping = conditionalfieldMapping;
        }
        if(typeof fieldMapping === "string") {
          if(fieldMapping.indexOf("$") !== -1){
            if(fieldMapping.indexOf("${i18n") !== -1) {
              return this.geti18nText(fieldMapping);
            }
            else{
              fieldMapping = fieldMapping.split(".");
              fieldMapping = fieldMapping[fieldMapping.length - 1].replace("}","");
              return record[fieldMapping]; 
            }
          }
          else {
            return fieldMapping;
          }
        }
        else if(typeof fieldMapping === "object") {
          var keys = Object.keys(fieldMapping);
          if(JSON.stringify(keys).indexOf("BP1") != -1 || JSON.stringify(keys).indexOf("BP2") != -1 || JSON.stringify(keys).indexOf("BP3") != -1){
            var fieldValue = this.getBreakpointBasedValue(fieldMapping, kony.application.getCurrentBreakpoint());
            return this.getFieldValueFromMapping(widget, fieldValue,{}, record);
          }else{
            for(key in fieldMapping){
              if(typeof fieldMapping[key] === "string"){
                if(fieldMapping[key].indexOf("${") !== -1){
                  fieldMapping[key] = this.getFieldValueFromMapping(widget, fieldMapping[key], {}, record);
                } 
              }
            } 
          }
          return fieldMapping;
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "getFieldValueFromMapping",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    getBreakpointBasedValue : function(contractJSON, currbreakpoint) {
      var value; 
      var breakPointConfig = this._breakpoints;
      currbreakpoint = JSON.stringify(currbreakpoint);
      Object.keys(breakPointConfig).find(function(key){
        if(breakPointConfig[key] === currbreakpoint){
          value = contractJSON[key];
        }
      });
      if(value ===  undefined){
        return contractJSON["default"];
      }
      return value;
    },

    /**
	* @api : getUIMappings
	* This method will do ui mapping and return the segment record
	* @return : {JSON}
	*/
    getUIMappings : function(segRecord, record, segId) { 
      var scope = this;
      try{
        var segUIMappings = JSON.parse(JSON.stringify(this.segUIMapping[segId]));
        if (segId === 'segServiceRequest'){
          segUIMappings.flxDropdown.accessibilityConfig = {
            "a11yLabel": "Show more details for service request with reference number " + segRecord.lblColumn3,
            "a11yARIA": {
              "tabindex": 0,
              "role": "button",
              "aria-expanded": false
            }
          };
          segUIMappings.flxDropdown.onClick = this.onSegmentRowToggle.bind(this);
        }
        for(let key in segUIMappings) {
          segRecord[key] = this.getFieldValueFromMapping(key, segUIMappings[key], this.segUIConditionalMapping[segId], record);
        }
        return segRecord;
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "getUIMappings",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
	* @api : getSegmentTemplate
	* This metod will return segment template for breakpoint
	* @return : {JSON}
	*/
    getSegmentTemplate : function() { 
      var scope = this;
      try{
        var segmentTemplate = {};
        var brkpoint = kony.application.getCurrentBreakpoint();
        if(brkpoint === 640){
          segmentTemplate["row"] = "flxRequestsMobileHeader";
          segmentTemplate["expanded"] = "flxRequestsMobileSelected";
        }else{
          segmentTemplate["row"] = "flxRequests";
          segmentTemplate["expanded"] = "flxRequestsSelected";
        }
        return segmentTemplate;
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "getSegmentTemplate",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
	* @api : onSegmentRowToggle
	* This metod will show expand and collapse row to show detailed view
	* @return : NA
	*/
    onSegmentRowToggle : function() { 
      var scopeObj = this;
      try{
        var index = scopeObj.view.segServiceRequest.selectedRowIndex;
        var rowIndex = index[1];
        var data = scopeObj.view.segServiceRequest.data;
        var rowData = data[rowIndex];
        scopeObj.rowData = rowData;
        var segTemplate = this.getSegmentTemplate();
        scope.setAccessibility();
        var collapseAll = function(segments) {
          segments.forEach(function(segment, i) {
            segment.template =  segTemplate.row;
            segment.imgDropdown = {
              skin : "ICSknLblFontTypeIcon1a98ff14pxOther",
              text : "O"
            };
            segment.flxDropdown = {
                onClick : scopeObj.onSegmentRowToggle.bind(this),
                accessibilityConfig:{
                  "a11yLabel":"Show more details for service request with reference number "+segment.lblColumn3,
                  "a11yARIA":{
                    "tabindex":0,
                    "role":"button",
                    "aria-expanded":false
                  }
                }
            }
            if (rowData.lblField4 === "") {
              segment.flxRequestsMobileSelected = {
                height : "210dp"
              };
            }
              else {
                segment.flxRequestsMobileSelected = {
                height : "260dp"
              };
            }
            scopeObj.view.segServiceRequest.setDataAt(segment, i);
          });
        };
        if(rowData.template !== segTemplate.expanded){
          collapseAll(data);
          data[rowIndex].imgDropdown = {
            skin : "ICSknLblFontTypeIcon1a98ff14pxOther",
            text : "P"
          };
          data[rowIndex].flxDropdown = {
            onClick : scopeObj.onSegmentRowToggle.bind(this),
            accessibilityConfig:{
              "a11yLabel":"Hide details for service request with reference number "+data[rowIndex].lblColumn3,
              "a11yARIA":{
                "tabindex":0,
                "role":"button",
                "aria-expanded":true
              }
            }
        }
          if(!data[rowIndex].flxField3) {
            data[rowIndex].flxField3 = {};
          }
          data[rowIndex].flxField3.width = "23%";
          data[rowIndex].template = segTemplate.expanded;
          //  this.context.data["transactionId"] = scopeObj.rowData.transactionId;
          //  data[rowIndex]["btnDetails4"].text =  this.getDisplayText(this.segUIMapping.segServiceRequest.btnDetails4.text) + "(" + this.getAttachmentsFileLength() + ")";
          scopeObj.view.segServiceRequest.setDataAt(data[rowIndex], rowIndex); 
        }
        else{
          data[rowIndex].imgDropdown = {
            skin : "ICSknLblFontTypeIcon1a98ff14pxOther",
            text : "O"
          };
          data[rowIndex].flxDropdown = {
            onClick : scopeObj.onSegmentRowToggle.bind(this),
            accessibilityConfig:{
              "a11yLabel":"Show more details for service request with reference number "+data[rowIndex].lblColumn3,
              "a11yARIA":{
                "tabindex":0,
                "role":"button",
                "aria-expanded":false
              }
            }
          }
          data[rowIndex].template =  segTemplate.row;
          scopeObj.view.segServiceRequest.setDataAt(data[rowIndex], rowIndex);
        }
        var segData = scopeObj.view.segServiceRequest.data;
        if(kony.application.getCurrentBreakpoint()===640){
          if(segData[rowIndex].template==="flxRequestsMobileHeader"){
            this.view.segServiceRequest.setActive(rowIndex,-1,"flxRequestsMobileHeader.flxMainGroup.flxGroup.flxRequestsSelectedRowWrapper.flxRequestsMobile.flxRowHeading.flxDropdown");
          }
          else{
            this.view.segServiceRequest.setActive(rowIndex,-1,"flxRequestsMobileSelected.flxMainGroup.flxGroup.flxRequestsSelectedRowWrapper.flxRequestsMobile.flxRowHeading.flxDropdown");
          }
        }
        else{
        if(segData[rowIndex].template==="flxRequests"){
          this.view.segServiceRequest.setActive(rowIndex,-1,"flxRequests.flxMainGroup.flxGroup.flxSelectedRowWrapper.flxRequestsTitle.flxDropdown");
        }
        else{
        this.view.segServiceRequest.setActive(rowIndex,-1,"flxRequestsSelected.flxMainGroup.flxGroup.flxSelectedRowWrapper.flxRequestsTitle.flxDropdown");
        }
      }
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "getUIMappings",
              "error": err
            };
        scopeObj.onError(errorObj);
      }
    },
    setAccessibility: function () {
      if (kony.application.getCurrentBreakpoint() > 1024) {
        var segData = this.view.segServiceRequest.data;
        segData.forEach(function (segment, i) {
          segment.lblColumn1Accessibility = {
            text: scope.view.lblColumn1.text + " " + segment.lblColumn1
          };
          segment.lblColumn2Accessibility = {
            text: scope.view.lblColumn2.text + " " + segment.lblColumn2
          };
          segment.lblColumn3Accessibility = {
            text: scope.view.lblColumn3.text + " " + segment.lblColumn3
          };
          segment.lblColumn4Accessibility = {
            text: scope.view.lblColumn4.text + " " + segment.lblColumn4
          };
          scope.view.segServiceRequest.setDataAt(segment, i);
        });
      }
    },
    /**
	* @api : setColumnHeaderData
	* Triggerd on click of tab and trigger a action in business controller to fetch transactions based on type
	* @return : NA
	*/
    setColumnHeaderData : function() {
      var scope = this;
      try{
        var columnProps = {};
        columnProps = this.dataMapping.columnProps.default; 
        for(var i = 1; i <= 4; i++){
          this.view["lblColumn"+i].text = this.getDisplayText(columnProps["column"+i].text);
          this.view["flxColumn"+i+"Right"].isVisible = columnProps["column"+i].isSortable;
          if(columnProps["column"+i].isSortable){
            this.sortFields["column"+i] = columnProps["column"+i].sortField;
          }else{
            this.sortFields["column"+i] = "";
          }
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setColumnHeaderData",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    /**
	* @api : sortRecords
	* Update sort icons and trigger a action to business controller to sort
	* @return : NA
	*/
    sortRecords : function(columnNo) {
      var scope = this;
      try{
        var sortType = "";
        var field = this.sortFields["column"+columnNo];

        if(this.view["imgColumn"+columnNo+"Right"].src === "sorting_next.png"){
          this.view["imgColumn"+columnNo+"Right"].src = "sorting_previous.png";
          sortType = "ASC";
          this.view["flxColumn"+columnNo+"Right"].accessibilityConfig={
            "a11yLabel":this.view["lblColumn"+columnNo].text+" Column, sorted in ascending order. click to sort in descending order",
            "a11yARIA":{
              "tabindex":0,
              "role":"button"
            }
          }
        }else if(this.view["imgColumn"+columnNo+"Right"].src === "sorting_previous.png"){
          this.view["imgColumn"+columnNo+"Right"].src = "sorting_next.png";
          sortType = "DESC";
          this.view["flxColumn"+columnNo+"Right"].accessibilityConfig={
            "a11yLabel":this.view["lblColumn"+columnNo].text+" Column, sorted in descending order. click to sort in ascending order",
            "a11yARIA":{
              "tabindex":0,
              "role":"button"
            }
          }
        }else{
          this.view["imgColumn"+columnNo+"Right"].src = "sorting_previous.png";
          sortType = "ASC";
          this.view["flxColumn"+columnNo+"Right"].accessibilityConfig={
            "a11yLabel":this.view["lblColumn"+columnNo].text+" Column, sorted in ascending order. click to sort in descending order",
            "a11yARIA":{
              "tabindex":0,
              "role":"button"
            }
          }
        } 

        for (i = 1; i < 5; i++) {
          if(i !== columnNo){
            this.view["imgColumn"+i+"Right"].src = "sorting.png"; 
            this.view["flxColumn"+i+"Right"].accessibilityConfig={
              "a11yLabel":this.view["lblColumn"+i].text+" Column, no sort applied. click to sort in ascending order",
              "a11yARIA":{
                "tabindex":0,
                "role":"button"
              }
            }           
          }         
        }
        
        this.businessController.sortData(field,sortType);
        this.view.flxSearchContainer.isVisible = true;
        this.view["flxColumn"+columnNo+"Right"].setActive(true);
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "sortRecords",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    /**
	* @api : fetchPaginationFooter
	* Updates the offset and limit on pagination item actions
	* @return : NA
	*/
    fetchPaginationFooter : function(offset, noOfRecords) {
      this.noOfRecords = noOfRecords;
      this.offset = offset;
      this.render();
    },
    /**
	* @api : setOffsetLimit
	* Set the default offset and limit 
	* @return : NA
	*/
    setOffsetLimit : function(){
      var scope = this;
      try{
        var offsetLimit = this.view.paginationFooter.getDefaultOffsetAndLimit();
        this.offset = offsetLimit.offset;
        this.noOfRecords = offsetLimit.limit;
        this.totalRecords = 0;
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setOffsetLimit",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    /**
	* @api : getDataBasedOnOffsetLimit
	* returns the array based on the pagination
	* @return : Array
    */
    getDataBasedOnOffsetLimit :  function (data) {
      var startIndex = this.offset;
      var endIndex = this.offset + this.noOfRecords;
      return data.slice(startIndex, endIndex);
    },
    /**
	* @api : onSearchClick
	* Perform actions required on search icon clicked
	* @return : {JSON}
	*/
    onSearchClick : function() {
      var self = this;
      try{
        if(self.view.flxSearchResults.isVisible) {
          self.setSearchResultsVisible(false);
          self.businessController.fetchServiceRequests(this.context);
        }
        if (self.searchViewModel.visible === true) {
          self.searchViewModel.visible = false;
          self.setSearchVisible(false);
          self.clearSearch();
        } else {
          self.searchViewModel.visible = true;
          self.setSearchVisible(true);
        }

        self.view.lstByServiceRequest.setEnabled(false);  
        self.view.lstByServiceRequest.skin = "ICSknLbxSSP42424215PxBordere3e3e3Disabled";
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "onSearchClick",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
	* @api : setSearchProperties
	* Set the search related properties
	* @return : NA
	*/
    setSearchProperties : function(){
      var scope  = this;
      try{
        this.updateSearchRequestsView();
        this.renderSearchForm(this.searchViewModel);
        this.resetPagination();
        this.setOffsetLimit();
        //   if (this.view.flxNoResults.isVisible) {
        //      this.view.flxAdvancedSearchContainer.setVisibility(false);
        //    }
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setSearchProperties",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    /**
	* @api : updateSearchRequestsView
	* update the search model with choosen data
	* @return : {JSON}
	*/    
    updateSearchRequestsView : function() {
      var self = this;
      try{
        if (this.searchViewModel.visible && !this.searchViewModel.searchPerformed) {
          this.renderSearchForm(this.searchViewModel);
        } else if (this.searchViewModel.visible && this.searchViewModel.searchPerformed) {
          this.showSearchResults(this.searchViewModel);
        } else {
          this.hideSearchFlex();
        }
        self.bindSearchFormActions();
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "updateSearchRequestsView",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
	* @api : renderSearchForm
	* render the search fields
	* @return : NA
	*/
    renderSearchForm : function(searchViewModel) {
      this.setSearchVisible(true);
      this.setSearchResultsVisible(false);
      this.view.txtKeyword.text = searchViewModel.keyword;
      
      this.view.lblSelectedAdvSearch1.text = searchViewModel.advSearch1Selected;
      this.view.lblSelectedAdvSearch2.text = searchViewModel.advSearch2Selected;
      this.view.lblSelectedAdvSearch4.text = searchViewModel.advSearch4Selected;      
      this.view.lblSelectedByAccount.text = searchViewModel.accountSelected;
      
      this.view.calDateFrom.dateComponents = searchViewModel.fromDate;
      this.view.calDateTo.dateComponents = searchViewModel.toDate;
      this.view.calDateFromTablet.dateComponents = searchViewModel.fromDate;
      this.view.calDateToTablet.dateComponents = searchViewModel.toDate;
    },
    /**
	* @api : bindSearchFormActions
	* Set the search actions
	* @return : NA
	*/
    bindSearchFormActions : function() {
      var scope = this;
      this.view.btnSearch.onClick = function() {
        scope.updateSearchViewModel();
        scope.startSearch();
        scope.view.lblYouHaveSearchedFor.setActive(true);
      };
      this.view.btnSearchM.onClick = function() {
        scope.updateSearchViewModel();
        scope.startSearch();
        scope.view.lblYouHaveSearchedFor.setActive(true);
      };
      scope.view.lstByRequestType.onSelection = scope.checkServiceRequestState.bind(this);
      scope.view.lstByServiceRequest.onSelection = scope.checkSearchButtonState.bind(this);
      scope.view.lstByStatus.onSelection = scope.checkSearchButtonState.bind(this);
      scope.view.lstByAccount.onSelection = scope.checkSearchButtonState.bind(this);
      scope.view.txtKeyword.onKeyUp = scope.onKeyUpTxtKeyword.bind(this);
      scope.view.calDateFrom.onSelection = scope.checkSearchButtonState.bind(this);
      scope.view.calDateTo.onSelection = scope.checkSearchButtonState.bind(this);
      scope.view.calDateFromTablet.onSelection = scope.checkSearchButtonState.bind(this);
      scope.view.calDateToTablet.onSelection = scope.checkSearchButtonState.bind(this);

      this.disableOldDaySelection(scope.view.calDateFrom);
      this.disableOldDaySelection(scope.view.calDateTo);
      this.disableOldDaySelection(scope.view.calDateFromTablet);
      this.disableOldDaySelection(scope.view.calDateToTablet);
    },

    /**
     * Method to select only the last 3 months and sets the date range for a calendar widget.
     * @param {String} widgetId - calendar widget ID
     */
    disableOldDaySelection: function(widgetId) {
      var today = new Date();
     // widgetId.enableRangeOfDates([today.getDate(), today.getMonth() - this.serviceReqMaxPeriod + 1, today.getMonth() - this.serviceReqMaxPeriod + 1 > -1 ? today.getFullYear() : today.getFullYear() -1], [today.getDate(), today.getMonth() + 1, today.getFullYear()], "skn", true);
	  widgetId.enableRangeOfDates([today.getDate(), today.getMonth() + 1 - this.serviceReqMaxPeriod + 1, today.getFullYear() - 1], [today.getDate(), today.getMonth() + 1, today.getFullYear()], "skn", true);
    },

    /**
	* @api : setSearchVisible
	* Set the visibility for search container
	* @return : NA
	*/
    setSearchVisible : function (isVisible) {
      if (isVisible == true && this.advancedSearchBtn == true){
        this.view.flxAdvancedSearchContainer.setVisibility(isVisible);
      }
      if (isVisible == false) {
        this.view.flxAdvancedSearchContainer.setVisibility(isVisible);
      }

    },
    /**
	* @api : checkSearchButtonState
	* Check and set enable or disable property for button
	* @return : NA
	*/
    checkServiceRequestState : function() {
      var formData = this.updateSearchViewModel({});
      if(formData.categoryTypeSelected !== this.advancedSearch.advance1.defaultKey) {
        this.view.lstByServiceRequest.setEnabled(true);
        this.view.lstByServiceRequest.skin = "sknlbxaltoffffffB1R2";
        var list = [];
        list =  this.businessController.getAccountList(this.advancedSearch.advance2.fieldKey, this.advancedSearch.advance2.fieldValue,  this.advancedSearch.advance1.fieldKey);
        var resultReq = [];
        for (i in list) 
          if (list[i][2] == formData.categoryTypeSelected ) {resultReq.push(list[i]);}

        var listA =[];
        listA.push(["all", "All Service Requests"]);
        var newList =  listA.concat(resultReq);

        this.view.lstByServiceRequest.masterData = newList; 
        this.view.lstByServiceRequest.selectedKey = this.advancedSearch.advance2.defaultKey;


      }
      else {
        this.view.lstByServiceRequest.setEnabled(false);  
        this.view.lstByServiceRequest.skin = "ICSknLbxSSP42424215PxBordere3e3e3Disabled";
        this.view.lstByServiceRequest.selectedKey = this.advancedSearch.advance2.defaultKey;
      }
      if (this.userCanSearch(formData)) {
        this.enableSearchButton();
      } else {
        this.disableSearchButton();
      }
    },
    /**
	* @api : onKeyUpTxtKeyword
	* method used to enable or disable the clear button
	* @return : NA
	*/
    
    onKeyUpTxtKeyword : function() {
      this.checkServiceRequestState();
      var scopeObj = this;
      var searchKeyword = scopeObj.view.txtKeyword.text.trim();
      if (searchKeyword.length > 0) {
        scopeObj.view.flxClearBtn.setVisibility(true);
      } else {
        scopeObj.view.flxClearBtn.setVisibility(false);
      }
      this.view.flxByKeyword.forceLayout();
      scopeObj.view.forceLayout();
    },
    /**
    * method used to clear search
    */
    onKeywordClearBtnClick: function() {
      var scopeObj = this;
      scopeObj.view.txtKeyword.text = "";
      scopeObj.view.flxClearBtn.setVisibility(false);
      this.disableSearchButton();
      scopeObj.view.forceLayout();
      this.view.txtKeyword.setActive(true);
    },
 /**
	* @api : onKeyUpTxtSearch Advanced
	* method used to enable or disable the clear button
	* @return : NA
	*/
    
    onKeyUpTxtSearch: function() {
      this.checkServiceRequestState();
      var scopeObj = this;
      var searchSearch = scopeObj.view.txtSearch.text.trim();
      if (searchSearch.length > 0) {
        scopeObj.view.flxClearBtnSearch.setVisibility(true);
      } else {
        scopeObj.view.flxClearBtnSearch.setVisibility(false);
      }
      this.view.flxWithBorder.forceLayout();
      scopeObj.view.forceLayout();
    },
    /**
    * method used to clear search Advanced
    */
    onSearchClearBtnClick: function() {
      var scopeObj = this;
      scopeObj.view.txtSearch.text = "";
      scopeObj.view.flxClearBtnSearch.setVisibility(false);
      this.businessController.resetDataList();
      scopeObj.view.forceLayout();
      this.view.txtSearch.setActive(true);
    },
    
    checkSearchButtonState : function() {
      var formData = this.updateSearchViewModel({});
      if(formData.categoryTypeSelected !== this.advancedSearch.advance1.defaultKey) {
        this.view.lstByServiceRequest.setEnabled(true);
        this.view.lstByServiceRequest.skin = "sknlbxaltoffffffB1R2";}
      else {
        this.view.lstByServiceRequest.setEnabled(false);  
        this.view.lstByServiceRequest.skin = "ICSknLbxSSP42424215PxBordere3e3e3Disabled";
        this.view.lstByServiceRequest.selectedKey = this.advancedSearch.advance2.defaultKey;}
      if (this.userCanSearch(formData)) {
        this.enableSearchButton();
      } else {
        this.disableSearchButton();
      }
    },
    /**
	* @api : updateSearchViewModel
	* returns the updated search properties
	* @return : {JSON}
	*/
    updateSearchViewModel :  function () {      

      this.searchViewModel.keyword = this.view.txtKeyword.text;
      this.searchViewModel.advSearch1Selected = this.view.lblSelectedAdvSearch1.text;
      this.searchViewModel.advSearch2Selected = this.view.lblSelectedAdvSearch2.text;
      this.searchViewModel.advSearch4Selected = this.view.lblSelectedAdvSearch4.text;
      this.searchViewModel.accountSelected = this.view.lblSelectedByAccount.text;
      this.searchViewModel.fromDate = this.view.calDateFrom.dateComponents;
      this.searchViewModel.toDate = this.view.calDateTo.dateComponents;
      this.searchViewModel.fromDateTablet = this.view.calDateFromTablet.dateComponents;
      this.searchViewModel.toDateTablet = this.view.calDateToTablet.dateComponents;
      return this.searchViewModel;   
    },
    /**
	* @api : startSearch
	* returns the updated search properties
	* @return : {JSON}
	*/
    startSearch: function() { 
      this.searchViewModel.searchPerformed = true;
      this.searchViewModel.anySearch = true;
      this.resetPagination();
      this.searchViewModel.dateRange = this.getDateRangeForTimePeriod(this.searchViewModel);
      var startDate = this.searchViewModel.dateRange.startDateForSearch;
      var endDate = this.searchViewModel.dateRange.endDateForSearch;

      var searchCriteria = [];      

      if (this.searchViewModel.advSearch1Selected !== this.advancedSearch.advance1.defaultValue)
        searchCriteria.push([this.advancedSearch.advance1.fieldValue, this.searchViewModel.advSearch1Selected]);             
      if (this.searchViewModel.advSearch4Selected !== this.advancedSearch.advance4.defaultValue)
        searchCriteria.push([this.advancedSearch.advance4.fieldValue, this.searchViewModel.advSearch4Selected]); 
      if (this.searchViewModel.advSearch2Selected !== this.advancedSearch.advance2.defaultValue)
        searchCriteria.push([this.advancedSearch.advance2.fieldValue, this.searchViewModel.advSearch2Selected]); 
      if (this.searchViewModel.accountSelected !== kony.i18n.getLocalizedString("i18n.serviceRequests.AllAccounts"))
        searchCriteria.push(['accountName', this.searchViewModel.accountSelected]); 

      this.businessController.fetchServiceRequestsBySearch(searchCriteria, startDate, endDate, this.searchViewModel.keyword);


      //  this.setSearchResultsVisible(true);
      this.showSearchResults(this.searchViewModel);


    },
    /** sets the lists for search dropdowns
         */
    getFilterDetails: function(field, fieldLabel, simpleFilter) {

      var list = [];
      var defaultKey = "all";
      var defaultStatus;

      switch (field){
        case this.advancedSearch.advance1.fieldKey: defaultStatus = this.advancedSearch.advance1.defaultValue; break;
        case this.advancedSearch.advance2.fieldKey : defaultStatus = this.advancedSearch.advance2.defaultValue; break;
        case this.advancedSearch.advance4.fieldKey : defaultStatus = this.advancedSearch.advance4.defaultValue; break; 
        case 'accountId' : defaultStatus = kony.i18n.getLocalizedString("i18n.serviceRequests.AllAccounts"); break; 
      }

      list.push([defaultKey, defaultStatus]);

      var newList =  list.concat(this.businessController.getFilterList(field, fieldLabel));

      if (simpleFilter)  

        return newList.map(elem => ({id:elem[0], text:(elem[1].length>25?(elem[1].substring(0,25) + '...'):elem[1])}));
      else
        return newList;
    },

    /**
	* @api : userCanSearch
	* To allow the user to search
	* @return : NA
	*/
    userCanSearch : function(formData) {
      return formData.keyword !== "" ||
        formData.advSearch1Selected !== this.advancedSearch.advance1.defaultValue || 
        formData.advSearch2Selected !== this.advancedSearch.advance2.defaultValue ||
        formData.advSearch4Selected !== this.advancedSearch.advance4.defaultValue ||           
        formData.accountSelected !== kony.i18n.getLocalizedString("i18n.serviceRequests.AllAccounts") ||          
        JSON.stringify(formData.fromDate.slice(0,3)) !== JSON.stringify(this.initFromDate) ||
        JSON.stringify(formData.toDate.slice(0,3)) !== JSON.stringify(this.initToDate) ||
        JSON.stringify(formData.fromDate.slice(0,3)) !== JSON.stringify(this.initFromDate) ||
        JSON.stringify(formData.toDate.slice(0,3)) !== JSON.stringify(this.initToDate);
    },

    /**
	* @api : setSearchResultsVisible
	* set the search reults visibility
	* @return : NA
	*/
    setSearchResultsVisible : function (isVisible) { 
	  this.view.flxSearchResults.height = this.resizeSearch() + "Dp";
      this.view.flxWrapper.height = this.resizeSearch() + "Dp";
      this.view.flxSearchResults.setVisibility(isVisible);
      if(isVisible === true){
        this.view.lblYouHaveSearchedFor.setFocus(true);
        this.view.flxSearchContainer.setVisibility(false);
      }
    },
    /**
    * @api : resizeSearch
    * Resize the search flex
    * @return : NA
    */
    resizeSearch: function(){
      var height = 120;
      var propertyNames = [ "keyword", "advSearch1Selected", "advSearch2Selected","advSearch4Selected", "accountSelected" ];
      for (const property of propertyNames)
      {
        if (this.searchViewModel[property] && this.searchViewModel[property].length != 0 && !this.searchViewModel[property].startsWith("All ")) 
          height +=30;
      }	
      return height;
    },
    /**
	* @api : hideSearchFlex
	* Hide the search flex
	* @return : NA
	*/
    hideSearchFlex : function() {
      this.setSearchVisible(false);
      this.setSearchResultsVisible(false);
    },
    /**
	* @api : enableSearchButton
	* Enables the search button
	* @return : NA
	*/
    enableSearchButton :  function() { 
      this.view.btnSearch.skin = "sknbtnSSPffffff0278ee15pxbr3px";      
      this.view.btnSearch.setEnabled(true);
      this.view.btnSearchM.skin = "sknbtnSSPffffff0278ee15pxbr3px";      
      this.view.btnSearchM.setEnabled(true);
    },
    /**
	* @api : disableSearchButton
	* Disables the search button
	* @return : NA
	*/
    disableSearchButton :  function() { 
      this.view.btnSearch.setEnabled(false);
      this.view.btnSearch.skin = "sknBtnBlockedSSPFFFFFF15Px";
      this.view.btnSearchM.setEnabled(false);
      this.view.btnSearchM.skin = "sknBtnBlockedSSPFFFFFF15Px";
    },
    /**
	* @api : geti18nText
     * This method is used get the i18n text
     * return String
     */
    geti18nText : function(text) {
      var i18ntext = text.substring(text.indexOf("${i18n")+7,text.length-2);
      return kony.i18n.getLocalizedString(i18ntext);
    },
    /**
	* @api : getDisplayText
     * This method is used to get display text
     * return String
     */
    getDisplayText : function(text) {
      if(text.indexOf("${i18n") !== -1){
        return this.geti18nText(text);
      }
      return text;
    },

    getFilterLists: function(){

      this.view.lstByRequestType.masterData = this.getFilterDetails(this.advancedSearch.advance1.fieldKey, this.advancedSearch.advance1.fieldValue, false); 
      this.view.lstByServiceRequest.masterData = this.getFilterDetails(this.advancedSearch.advance2.fieldKey, this.advancedSearch.advance2.fieldValue, false); 
      this.view.lstByStatus.masterData = this.getFilterDetails(this.advancedSearch.advance4.fieldKey,this.advancedSearch.advance4.fieldValue, false);       
      this.view.lstByAccount.masterData = this.getFilterDetails('accountId', 'accountName', false); 


    },
    /**
	 * @api : computeDatesWithServiceReq
     * This method returns a date by subtracting a number of months from the current date
     * return String
     */
    computeDatesWithServiceReq: function(months) {
      var dateMinusServiceReq = new Date();
      var date = dateMinusServiceReq.getDate();
      dateMinusServiceReq.setMonth(dateMinusServiceReq.getMonth() - months);
      if (dateMinusServiceReq.getDate() !== date) {
        var month = dateMinusServiceReq.getMonth();
        while (dateMinusServiceReq.getMonth() === month) {
          dateMinusServiceReq.setDate(dateMinusServiceReq.getDate() - 1);
        }
      }
      return dateMinusServiceReq;
    },
    /**
	* @api : clearSearch
	* Clear the search data
	* @return : NA
	*/
    clearSearch : function() {
      var scope = this;
      try{
        var today = new Date();
        this.view.txtKeyword.text = "";

        this.view.lblSelectedAdvSearch1.text = this.advancedSearch.advance1.defaultValue; 
        this.view.lblSelectedAdvSearch2.text = this.advancedSearch.advance2.defaultValue; 
        this.view.lblSelectedAdvSearch4.text = this.advancedSearch.advance4.defaultValue; 
        //         this.view.lstByServiceRequest.selectedKey = this.advancedSearch.advance1.defaultKey;
        //         this.view.lstByServiceRequest.setEnabled(false);  
        //         this.view.lstByServiceRequest.skin = "ICSknLbxSSP42424215PxBordere3e3e3Disabled";

        //         this.view.lstByAccount.selectedKey = 'all'; 
        this._selectedFilter = JSON.stringify({'id':'all'});
        this.view.lblSelectedFilterValue.text = kony.i18n.getLocalizedString("i18n.serviceRequests.AllServiceRequests");
        this.view.lblSelectedByAccount.text = kony.i18n.getLocalizedString("i18n.serviceRequests.AllAccounts");
       
		var dateMinusServiceReq = this.computeDatesWithServiceReq(this.serviceReqMaxPeriod);
        var dateMinusServiceReqPlusOne = this.computeDatesWithServiceReq(this.serviceReqMaxPeriod - 1);
				
        this.view.calDateFrom.dateComponents = [dateMinusServiceReqPlusOne.getDate(), dateMinusServiceReqPlusOne.getMonth() + 1, dateMinusServiceReqPlusOne.getFullYear()];
        this.view.calDateTo.dateComponents = [dateMinusServiceReqPlusOne.getDate(), dateMinusServiceReqPlusOne.getMonth() + 1, dateMinusServiceReqPlusOne.getFullYear()];
        this.view.calDateFromTablet.dateComponents = [dateMinusServiceReq.getDate(), dateMinusServiceReq.getMonth()+1, dateMinusServiceReq.getFullYear()];
        this.view.calDateToTablet.dateComponents = [dateMinusServiceReqPlusOne.getDate(), dateMinusServiceReqPlusOne.getMonth() + 1, dateMinusServiceReqPlusOne.getFullYear()];

        if(this.searchViewModel.searchPerformed){
          if (this.searchViewModel.simpleSearchPerformed){
            this.view.flxAdvancedSearchContainer.isVisible = false;
            this.view.flxSearchContainer.isVisible = true;
            this.searchViewModel.simpleSearchPerformed = false;
          }
          else{
            this.view.flxAdvancedSearchContainer.isVisible = true;  
            this.view.flxSearchContainer.isVisible = false;
          }
          this.view.flxSearchResults.isVisible = false;
          this.businessController.fetchServiceRequests();
          this.searchViewModel.searchPerformed = false;
        }
        this.view.paginationFooter.setVisibility(true);
        this.disableSearchButton();
        this.view.flxClearBtnSearch.setVisibility(false);
        this.view.flxClearBtn.setVisibility(false);
        this.updateSearchViewModel();
        this.resetPagination();

      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "clearSearch",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    /**
	* @api : showSearchResults
	* Shows the search tags and results
	* @return : NA
	*/
    showSearchResults : function(searchViewModel) {
      var self = this;
      if (kony.i18n.getCurrentLocale() === "ar_AE") {
         this.view.flxCancelDateRange.skin = "sknFlxSearchItemRightArabic";
         this.view.lblDateRangeTitle.skin= "ICSknLblSearchItemRight1Arabic";
         this.view.flxCancelStatus.skin = "sknFlxSearchItemRightArabic";
         this.view.lblStatusTitle.skin = "ICSknLblSearchItemRight1Arabic";
         this.view.flxCancelServiceRequest.skin = "sknFlxSearchItemRightArabic";
         this.view.lblServiceRequestTitle.skin = "ICSknLblSearchItemRight1Arabic";
         this.view.lblKeywordTitle.skin = "ICSknLblSearchItemRight1Arabic";
         this.view.flxCancelKeyword.skin = "sknFlxSearchItemRightArabic";
         this.view.lblAccountTitle.skin = "ICSknLblSearchItemRight1Arabic";
         this.view.flxCancelAccount.skin = "sknFlxSearchItemRightArabic";
         this.view.lblRequestCategoryTitle.skin = "ICSknLblSearchItemRight1Arabic";
         this.view.flxCancelRequestCategory.skin = "sknFlxSearchItemRightArabic";
    }
      try{
        this.setSearchVisible(false);
        this.setSearchResultsVisible(true);
        this.configureActionsForTags(searchViewModel);
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "showSearchResults",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
	* @api : getTagConfig
	* get the search tag config
	* @return : NA
	*/
    getTagConfig : function(searchViewModel) {
      var scopeObj = this;
      var config;
      if (kony.application.getCurrentBreakpoint() === 640) {
        config = [{
          actionOn: 'flxCancelKeywordM',
          hide: ['flxKeywordWrapper'],
          clearPropertiesFromViewModel: [{
            propertyName: 'keyword',
            resetValue: ''
          }],
          value: {
            label: 'lblKeywordValueM',
            computedValue: function() {
              if (searchViewModel.keyword === "") {
                return null;
              }
              return searchViewModel.keyword;
            }.bind(scopeObj)
          }
        }, {
          actionOn: 'flxCancelAccountM',
          hide: ['flxAccountWrapper'],
          clearPropertiesFromViewModel: [{
            propertyName: 'accountSelected',
            resetValue: kony.i18n.getLocalizedString("i18n.serviceRequests.AllAccounts")
          }],
          value: {
            label: 'lblAccountValueM',
            computedValue: function() {
              if (searchViewModel.accountSelected === kony.i18n.getLocalizedString("i18n.serviceRequests.AllAccounts")) {
                return null;
              }
              return searchViewModel.accountSelected;
            }.bind(scopeObj)
          }
        }, {
          actionOn: 'flxCancelRequestCategoryM',
          hide: ['flxRequestCategoryWrapper'],
          clearPropertiesFromViewModel: [{
            propertyName: 'advSearch1Selected',
            resetValue: this.advancedSearch.advance1.defaultValue
          }],
          value: {
            label: 'lblRequestCategoryValueM',
            computedValue: function() {
              if (searchViewModel.advSearch1Selected === this.advancedSearch.advance1.defaultValue) {
                return null;
              }
              return searchViewModel.advSearch1Selected;
            }.bind(scopeObj)
          }
        }, {
          actionOn: 'flxCancelServiceRequestM',
          hide: ['flxServiceRequestWrapper'],
          clearPropertiesFromViewModel: [{
            propertyName: 'advSearch4Selected',
            resetValue: this.advancedSearch.advance4.defaultValue
          }],
          value: {
            label: 'lblServiceRequestValueM',
            computedValue: function() {
              if (searchViewModel.advSearch4Selected === this.advancedSearch.advance4.defaultValue) {
                return null;
              }
              return this.searchViewModel.advSearch4Selected;
            }.bind(scopeObj)
          }
        }, {
          actionOn: 'flxCancelDateRangeM',
          hide: ['lblDateRangeTitleM', 'lblDateRangeValueM'],
          clearPropertiesFromViewModel: [{
            propertyName: 'fromDate',
            resetValue: ''
          },{
            propertyName: 'toDate',
            resetValue: ''
          }],
          value: {
            label: 'lblDateRangeValueM',
            computedValue: function() { 
              if(this.searchViewModel.dateRange.startDate !== null && this.searchViewModel.dateRange.endDate)
              {
                var fromDate = this.searchViewModel.dateRange.startDate;
                var toDate = this.searchViewModel.dateRange.endDate;
                return fromDate + " " + kony.i18n.getLocalizedString("i18n.transfers.lblTo") + " " + toDate;
              }
              else
              {
                return null;
              }
            }.bind(scopeObj)
          }
        }, {
          actionOn: 'flxBFCancelStatusM',
          hide: ['flxStatusWrapper'],
          clearPropertiesFromViewModel: [{
            propertyName: 'advSearch2Selected',
            resetValue: this.advancedSearch.advance2.defaultValue
          }],
          value: {
            label: 'lblStatusValueM',
            computedValue: function() {
              if (searchViewModel.advSearch2Selected === this.advancedSearch.advance2.defaultValue) {
                return null;
              }
              return searchViewModel.advSearch2Selected;
            }.bind(scopeObj)
          }
        }];
      } else {

        config = [{
          actionOn: 'flxCancelKeyword',
          hide: ['lblKeywordTitle', 'lblKeywordValue'],
          clearPropertiesFromViewModel: [{
            propertyName: 'keyword',
            resetValue: ''
          }],
          value: {
            label: 'lblKeywordValue',
            computedValue: function() {
              if (searchViewModel.keyword === "") {
                return null;
              }
              return searchViewModel.keyword;
            }.bind(scopeObj)
          }
        },{
          actionOn: 'flxCancelAccount',
          hide: ['lblAccountTitle', 'lblAccountValue'],
          clearPropertiesFromViewModel: [{
            propertyName: 'accountSelected',
            resetValue: kony.i18n.getLocalizedString("i18n.serviceRequests.AllAccounts")
          }],
          value: {
            label: 'lblAccountValue',
            computedValue: function() {
              if (searchViewModel.accountSelected === kony.i18n.getLocalizedString("i18n.serviceRequests.AllAccounts")) {
                return null;
              }
              return searchViewModel.accountSelected;
            }.bind(scopeObj)
          }
        },  {
          actionOn: 'flxCancelRequestCategory',
          hide: ['lblRequestCategoryTitle', 'lblRequestCategoryValue'],
          clearPropertiesFromViewModel: [{
            propertyName: 'advSearch1Selected',
            resetValue: this.advancedSearch.advance1.defaultValue
          }],
          value: {
            label: 'lblRequestCategoryValue',
            computedValue: function() {
              if (searchViewModel.advSearch1Selected === this.advancedSearch.advance1.defaultValue) {
                return null;
              }
              return searchViewModel.advSearch1Selected;
            }.bind(scopeObj)
          }
        }, {
          actionOn: 'flxCancelServiceRequest',
          hide: ['lblServiceRequestTitle', 'lblServiceRequestValue'],
          clearPropertiesFromViewModel: [{
            propertyName: 'advSearch4Selected',
            resetValue: this.advancedSearch.advance4.defaultValue
          }],
          value: {
            label: 'lblServiceRequestValue',
            computedValue: function() {
              if (searchViewModel.advSearch4Selected === this.advancedSearch.advance4.defaultValue) {
                return null;
              }
              return this.searchViewModel.advSearch4Selected;
            }.bind(scopeObj)
          }
        }, {
          actionOn: 'flxCancelDateRange',
          hide: ['lblDateRangeTitle', 'lblDateRangeValue'],
          clearPropertiesFromViewModel: [{
            propertyName: 'fromDate',
            resetValue: ''
          },{
            propertyName: 'toDate',
            resetValue: ''
          }],
          value: {
            label: 'lblDateRangeValue',
            computedValue: function() { 
              if(this.searchViewModel.dateRange.startDate !== null && this.searchViewModel.dateRange.endDate)
              {
                var fromDate = this.searchViewModel.dateRange.startDate;
                var toDate = this.searchViewModel.dateRange.endDate;
                return fromDate + " " + kony.i18n.getLocalizedString("i18n.transfers.lblTo") + " " + toDate;
              }
              else
              {
                return null;
              }
            }.bind(scopeObj)
          }
        }, {
          actionOn: 'flxCancelStatus',
          hide: ['lblStatusTitle', 'lblStatusValue'],
          clearPropertiesFromViewModel: [{
            propertyName: 'advSearch2Selected',
            resetValue: this.advancedSearch.advance2.defaultValue
          }],
          value: {
            label: 'lblStatusValue',
            computedValue: function() {
              if (searchViewModel.advSearch2Selected === this.advancedSearch.advance2.defaultValue) {
                return null;
              }
              return searchViewModel.advSearch2Selected;
            }.bind(scopeObj)
          }
        }];
      }
      return config;
    },
    /**
	* @api : configurationActionsForTags
	* configure the action for the tags
	* @return : NA
	*/
    configureActionsForTags : function(searchViewModel) {
      var scopeObj = this;
      var tagConfig = scopeObj.getTagConfig(searchViewModel);
      function generateClickListenerForTag(config) {
        return function() {
          hideTag(config);
          scopeObj.tagState.decrement();
          config.clearPropertiesFromViewModel.forEach(function(property) {
            scopeObj.searchViewModel[property.propertyName] = property.resetValue;
          });
          if (scopeObj.tagState.visible === 0) {
            scopeObj.clearSearch();
            scopeObj.searchViewModel.visible = false;
            scopeObj.view.flxSearchContainer.isVisible = true;
            scopeObj.updateSearchRequestsView();
          } else {
            //  scopeObj.updateSearchViewModel();
            scopeObj.startSearch();
          }
          scopeObj.view.forceLayout();
        };
      }
      function hideTag(config) {
        scopeObj.view[config.actionOn].setVisibility(false);
        config.hide.forEach(function(widgetToHide) {
          scopeObj.view[widgetToHide].setVisibility(false);
        });
        scopeObj.view.forceLayout();
      }
      function showTag(config) {
        scopeObj.view[config.actionOn].setVisibility(true);
        config.hide.forEach(function(widgetToHide) {
          scopeObj.view[widgetToHide].setVisibility(true);
        });
        scopeObj.view.forceLayout();
        scopeObj.tagState.increment();
      }
      this.tagState.visible = 0;
      tagConfig.forEach(function(config) {
        if (config.value.computedValue() === null) {
          hideTag(config);
        } else {
          showTag(config);
          scopeObj.view[config.actionOn].onClick = generateClickListenerForTag(config);
          scopeObj.view[config.value.label].text = config.value.computedValue();
        }
      });
    },
    /**
	* @api : getDateRangeForTimePeriod
	* get date range for time period
	* @return : NA
	*/
    getDateRangeForTimePeriod :  function (searchviewmodel) { 
      var startDate = null;
      var endDate = null;
      var startDateForSearch = null;
      var endDateForSearch = null;
      var bfStartDate = null;
      var bfEndDate = null;
      var yyyy_mm_dd_startDate_forSearch, yyyy_mm_dd_endDate_forSearch, mm_dd_yyyy_startDate, mm_dd_yyyy_endDate;

      function padDigits(n) {
        n = n + '';
        return n.length >= 2 ? n : new Array(2 - n.length + 1).join('0') + n;
      }

      if (searchviewmodel.fromDate && searchviewmodel.toDate ) {
        yyyy_mm_dd_startDate_forSearch = searchviewmodel.fromDate[2]  + "-" + padDigits(searchviewmodel.fromDate[1]) + "-" + padDigits(searchviewmodel.fromDate[0]);
        yyyy_mm_dd_endDate_forSearch = searchviewmodel.toDate[2]  + "-" + padDigits(searchviewmodel.toDate[1]) + "-" + padDigits(searchviewmodel.toDate[0]) ;
        mm_dd_yyyy_startDate = padDigits(searchviewmodel.fromDate[1])  + "/" + padDigits(searchviewmodel.fromDate[0]) + "/" + searchviewmodel.fromDate[2];
        mm_dd_yyyy_endDate = padDigits(searchviewmodel.toDate[1])  + "/" + padDigits(searchviewmodel.toDate[0]) + "/" + searchviewmodel.toDate[2];
      }
      startDate = mm_dd_yyyy_startDate;
      endDate = mm_dd_yyyy_endDate;
      startDateForSearch = yyyy_mm_dd_startDate_forSearch;
      endDateForSearch = yyyy_mm_dd_endDate_forSearch;

      return {
        startDate: startDate,
        endDate: endDate,
        startDateForSearch: startDateForSearch,
        endDateForSearch: endDateForSearch
      };
    },

    validateDateSelection:function(startDate, endDate){
      let today = new Date();      
      today.setMonth(today.getMonth() - this.serviceReqMaxPeriod);
      return ((new Date(startDate)>today)&&(new Date(endDate)>today));
    },

    resetPagination: function() {
      this.view.paginationFooter.resetStartIndex();
      this.offset = "0";
    },

    onError: function(errObj) {
      alert(JSON.stringify(errObj));
    },

    /**
	* @api : setConditionalMappingKey
	* Set the conditional mapping in global variable
	* @return : NA
	*/
    setConditionalMappingKey : function() {
      var scope = this;
      try{
        var conditionalMappingKey = this.conditionalMappingKey;
        conditionalMappingKey = conditionalMappingKey.split(".");
        conditionalMappingKey = conditionalMappingKey[conditionalMappingKey.length - 1].replace("}",""); 
        this.conditionalMappingKey = conditionalMappingKey;
      }
      catch(err)
      {
        var errorObj =
            {
              "level" : "ComponentController",
              "method" : "setConditionalMappingKey",
              "error": err
            };
        scope.onError(errorObj);
      }

    },

    hideOpenSegments:function(){
      if(!this.startSelect){    
        if(this.flagSegment){
          this.view.flxSegmentFilter.isVisible = (this.flagSegment==='flxSegmentFilter');
          this.view.lblDropdownIcon.text =  this.flagSegment!=='flxSegmentFilter'? JSON.parse(this._iconFilterRowCollapsed)["vizIcon"]:JSON.parse(this._iconFilterRowExpanded)["vizIcon"];

          this.view.flxByAccountSegment.setVisibility(this.flagSegment==='flxByAccountSegment');
          this.view.lblDropdown.text = this.flagSegment==='flxByAccountSegment'?"P":"O";

          this.view.flxSegmentAdvSearch1.setVisibility(this.flagSegment==='flxSegmentAdvSearch1');
          this.view.lblDropdownAdvSearch1.text = this.flagSegment==='flxSegmentAdvSearch1'?"P":"O";

          this.view.flxSegmentAdvSearch2.setVisibility(this.flagSegment==='flxSegmentAdvSearch2');
          this.view.lblDropdownAdvSearch2.text = this.flagSegment==='flxSegmentAdvSearch2'?"P":"O";

          this.view.flxSegmentAdvSearch4.setVisibility(this.flagSegment==='flxSegmentAdvSearch4');
          this.view.lblDropdownAdvSearch4.text = this.flagSegment==='flxSegmentAdvSearch4'?"P":"O";
          this.flagSegment = 'none';
        }
      }
    },

    notHideSegment:function(){
      this.startSelect = true;
    },


    getAdvSearch1List: function(flexName) {
            if (this.view.flxSegmentAdvSearch1.isVisible === true) {
                this.view.flxSegmentAdvSearch1.setVisibility(false);
				this.view.flxSegmentAdvSearch2.setVisibility(false);
				this.view.flxSegmentAdvSearch4.setVisibility(false);
				this.view.flxByAccountSegment.setVisibility(false);
                this.view.flxAdvSearch1.accessibilityConfig = {
                    "a11yLabel": "search " + this.view.lblByRequestType.text.slice(0, -1) + ". Currently selected " + this.view.lblSelectedAdvSearch1.text + ". Click to show list of " + this.view.lblByRequestType.text.slice(0, -1),
                    "a11yARIA": {
                        "role": "button",
                        "aria-expanded": false,
                        "tabindex": 0
                    }
                }
                this.view.lblDropdownAdvSearch1.text = "O";
				this.view.lblDropdownAdvSearch4.text = "O";
				this.view.lblDropdownAdvSearch2.text = "O";
				 this.view.lblDropdown.text = "O";
                this.flagSegment = 'none';
            } else {
                this.view.flxSegmentAdvSearch1.setVisibility(true);
				this.view.flxSegmentAdvSearch2.setVisibility(false);
				this.view.flxSegmentAdvSearch4.setVisibility(false);
				this.view.flxByAccountSegment.setVisibility(false);
                this.view.flxAdvSearch1.accessibilityConfig = {
                    "a11yLabel": "Click to hide " + this.view.lblByRequestType.text.slice(0, -1),
                    "a11yARIA": {
                        "role": "button",
                        "aria-expanded": true,
                        "tabindex": 0
                    }
                }
                this.view.lblDropdownAdvSearch1.text = "P";
				this.view.lblDropdownAdvSearch4.text = "O";
				this.view.lblDropdownAdvSearch2.text = "O";
				 this.view.lblDropdown.text = "O";
                this.flagSegment = flexName;
            }
            var dataWidgetMap = {
                "lblListValue": "lblListValue",
                "flxListDropdown": "flxListDropdown"
            };
            this.view.segAdvSearch1.widgetDataMap = dataWidgetMap;
            var resultsList;
            resultsList = this.getSegmentDetails(this.advancedSearch.advance1.fieldKey, this.advancedSearch.advance1.fieldValue, false);
            this.view.segAdvSearch1.setData(resultsList);
            var data = this.view.segAdvSearch1.data;
            for (var i = 0; i < data.length; i++) {
                var val = data[i].lblListValue;
                data[i] = {
                    "lblListValue": val,
                    "flxListDropdown": {
                        "onKeyPress": this.listAdvSearch
                    }
                }
            }
            this.view.segAdvSearch1.setData(data);
            this.view.flxAdvSearch1.setActive(true);
        },
    listAdvSearch : function(eventObject,eventPayload,context){
      if(eventPayload.keyCode===9){
        if(eventPayload.shiftKey){
        if(context.rowIndex===0){
          if (context.widgetInfo.id === "segAdvSearch1") {
            this.getAdvSearch1List('flxSegmentAdvSearch1');
            eventPayload.preventDefault();
            this.view.flxAdvSearch1.setActive(true);
          }
          if (context.widgetInfo.id === "segAdvSearch2") {
            this.getAdvSearch2List('flxSegmentAdvSearch2');
            eventPayload.preventDefault();
            this.view.flxAdvSearch2.setActive(true);
          }
          if (context.widgetInfo.id === "segAdvSearch4") {
            this.getAdvSearch4List('flxSegmentAdvSearch4');
            eventPayload.preventDefault();
            this.view.flxAdvSearch4.setActive(true);
          }
        }
      }
      else{
        if(context.rowIndex===context.widgetInfo.data.length-1){
          if (context.widgetInfo.id === "segAdvSearch1") {
            this.getAdvSearch1List('flxSegmentAdvSearch1');
            eventPayload.preventDefault();
            this.view.flxAdvSearch2.setActive(true);
          }
          if (context.widgetInfo.id === "segAdvSearch2") {
            this.getAdvSearch2List('flxSegmentAdvSearch2');
            eventPayload.preventDefault();
            this.view.flxByAccount.setActive(true);
          }
          if (context.widgetInfo.id === "segAdvSearch4") {
            this.getAdvSearch4List('flxSegmentAdvSearch4');
            eventPayload.preventDefault();
            this.view.calDateFrom.setActive(true);
          }
        }
      }
      }
      if(eventPayload.keyCode===27){
        if (context.widgetInfo.id === "segAdvSearch1") {
          this.getAdvSearch1List('flxSegmentAdvSearch1');
          eventPayload.preventDefault();
          this.view.flxAdvSearch1.setActive(true);
        }
        if (context.widgetInfo.id === "segAdvSearch2") {
          this.getAdvSearch2List('flxSegmentAdvSearch2');
          eventPayload.preventDefault();
          this.view.flxAdvSearch2.setActive(true);
        }
        if (context.widgetInfo.id === "segAdvSearch4") {
          this.getAdvSearch4List('flxSegmentAdvSearch4');
          eventPayload.preventDefault();
          this.view.flxAdvSearch4.setActive(true);
        }
      }
    },


    getAdvSearch2List: function(flexName) {
            if (this.view.flxSegmentAdvSearch2.isVisible === true) {
                this.view.flxSegmentAdvSearch2.setVisibility(false);
				this.view.flxSegmentAdvSearch1.setVisibility(false);
				this.view.flxSegmentAdvSearch4.setVisibility(false);
				this.view.flxByAccountSegment.setVisibility(false);
                this.view.flxAdvSearch2.accessibilityConfig = {
                    "a11yLabel": "search " + this.view.lblByStatus.text.slice(0, -1) + ". Currently selected " + this.view.lblSelectedAdvSearch2.text + ". Click to show list of " + this.view.lblByStatus.text.slice(0, -1),
                    "a11yARIA": {
                        "role": "button",
                        "aria-expanded": false,
                        "tabindex": 0
                    }
                }
                this.view.lblDropdownAdvSearch2.text = "O";
				this.view.lblDropdownAdvSearch4.text = "O";
				this.view.lblDropdownAdvSearch1.text = "O";
				 this.view.lblDropdown.text = "O";
                this.flagSegment = 'none';
            } else {
                this.view.flxSegmentAdvSearch2.setVisibility(true);
				this.view.flxSegmentAdvSearch1.setVisibility(false);
				this.view.flxSegmentAdvSearch4.setVisibility(false);
				this.view.flxByAccountSegment.setVisibility(false);
                this.view.flxAdvSearch2.accessibilityConfig = {
                    "a11yLabel": "Click to hide " + this.view.lblByStatus.text.slice(0, -1),
                    "a11yARIA": {
                        "role": "button",
                        "aria-expanded": true,
                        "tabindex": 0
                    }
                }
                this.view.lblDropdownAdvSearch2.text = "P";
				this.view.lblDropdownAdvSearch4.text = "O";
				this.view.lblDropdownAdvSearch1.text = "O";
				this.view.lblDropdown.text = "O";
                this.flagSegment = flexName;
            }
            var dataWidgetMap = {
                "lblListValue": "lblListValue",
                "flxListDropdown": "flxListDropdown"
            };
            this.view.segAdvSearch2.widgetDataMap = dataWidgetMap;
            var resultsList;
            resultsList = this.getSegmentDetails(this.advancedSearch.advance2.fieldKey, this.advancedSearch.advance2.fieldValue, false);
            this.view.segAdvSearch2.setData(resultsList);
            var data = this.view.segAdvSearch2.data;
            for (var i = 0; i < data.length; i++) {
                var val = data[i].lblListValue;
                data[i] = {
                    "lblListValue": val,
                    "flxListDropdown": {
                        "onKeyPress": this.listAdvSearch
                    }
                }
            }
            this.view.segAdvSearch2.setData(data);
            this.view.flxAdvSearch2.setActive(true);
        },
        getAdvSearch4List: function(flexName) {
            if (this.view.flxSegmentAdvSearch4.isVisible === true) {
                this.view.flxSegmentAdvSearch4.setVisibility(false);
				this.view.flxSegmentAdvSearch2.setVisibility(false);
				this.view.flxSegmentAdvSearch1.setVisibility(false);
				this.view.flxByAccountSegment.setVisibility(false);
                this.view.flxAdvSearch4.accessibilityConfig = {
                    "a11yLabel": "search " + this.view.lblByServiceRequest.text.slice(0, -1) + ". Currently selected " + this.view.lblSelectedAdvSearch4.text + ". Click to show list of " + this.view.lblByServiceRequest.text.slice(0, -1),
                    "a11yARIA": {
                        "role": "button",
                        "aria-expanded": false,
                        "tabindex": 0
                    }
                }
                this.view.lblDropdownAdvSearch4.text = "O";
				this.view.lblDropdownAdvSearch2.text = "O";
				this.view.lblDropdownAdvSearch1.text = "O";
				 this.view.lblDropdown.text = "O";
                this.flagSegment = 'none';
            } else {
                this.view.flxSegmentAdvSearch4.setVisibility(true);
				this.view.flxSegmentAdvSearch2.setVisibility(false);
				this.view.flxSegmentAdvSearch1.setVisibility(false);
				this.view.flxByAccountSegment.setVisibility(false);
                this.view.flxAdvSearch4.accessibilityConfig = {
                    "a11yLabel": "Click to hide " + this.view.lblByServiceRequest.text.slice(0, -1),
                    "a11yARIA": {
                        "role": "button",
                        "aria-expanded": true,
                        "tabindex": 0
                    }
                }
                this.view.lblDropdownAdvSearch4.text = "P";
				this.view.lblDropdownAdvSearch2.text = "O";
				this.view.lblDropdownAdvSearch1.text = "O";
				 this.view.lblDropdown.text = "O";
                this.flagSegment = flexName;
            }
            var dataWidgetMap = {
                "lblListValue": "lblListValue",
                "flxListDropdown": "flxListDropdown"
            };
            this.view.segAdvSearch4.widgetDataMap = dataWidgetMap;
            var resultsList;
            resultsList = this.getSegmentDetails(this.advancedSearch.advance4.fieldKey, this.advancedSearch.advance4.fieldValue, false);
            this.view.segAdvSearch4.setData(resultsList);
            var data = this.view.segAdvSearch4.data;
            for (var i = 0; i < data.length; i++) {
                var val = data[i].lblListValue;
                data[i] = {
                    "lblListValue": val,
                    "flxListDropdown": {
                        "onKeyPress": this.listAdvSearch
                    }
                }
            }
            this.view.segAdvSearch4.setData(data);
            this.view.flxAdvSearch4.setActive(true);
        },

    getSegmentDetails: function(field, fieldLabel, simpleFilter) {

      var list = [];
      var defaultKey = "all";
      var defaultStatus;

      switch (field){
        case this.advancedSearch.advance1.fieldKey: defaultStatus = this.advancedSearch.advance1.defaultValue; break;
        case this.advancedSearch.advance2.fieldKey : defaultStatus = this.advancedSearch.advance2.defaultValue; break;
        case this.advancedSearch.advance4.fieldKey : defaultStatus = this.advancedSearch.advance4.defaultValue; break; 
        case 'accountId' : defaultStatus = kony.i18n.getLocalizedString("i18n.serviceRequests.AllAccounts"); break; 
      }

      list.push([defaultKey, defaultStatus]);

      var newList = list.concat(this.businessController.getFilterList(field, fieldLabel));

      return newList.map(elem => ({"lblListValue": elem[1]}));

    },

    onSegAdvSearch1RowClick: function(){
      this.startSelect = false;
      var index = this.view.segAdvSearch1.selectedRowIndex;
      this.view.flxSegmentAdvSearch1.setVisibility(false);
      this.view.lblDropdownAdvSearch1.text = "O";
      this.view.lblSelectedAdvSearch1.text = this.view.segAdvSearch1.data[index[1]].lblListValue;
      this.view.flxAdvSearch1.accessibilityConfig={
        "a11yLabel":"search "+this.view.lblByRequestType.text.slice(0, -1)+". Currently selected "+this.view.lblSelectedAdvSearch1.text+". Click to show list of "+this.view.lblByRequestType.text.slice(0, -1),
        "a11yARIA":{
          "role":"button",
          "aria-expanded":false,
          "tabindex":0
        }
      }
      this.checkSearchButtonState();
      this.view.flxAdvSearch1.setActive(true);
    },

    onSegAdvSearch2RowClick: function(){
      this.startSelect = false;
      var index = this.view.segAdvSearch2.selectedRowIndex;
      this.view.flxSegmentAdvSearch2.setVisibility(false);
      this.view.lblDropdownAdvSearch2.text = "O";
      this.view.lblSelectedAdvSearch2.text = this.view.segAdvSearch2.data[index[1]].lblListValue;
      this.view.flxAdvSearch2.accessibilityConfig={
        "a11yLabel":"search "+this.view.lblByStatus.text.slice(0, -1)+". Currently selected "+this.view.lblSelectedAdvSearch2.text+". Click to show list of "+this.view.lblByStatus.text.slice(0, -1),
        "a11yARIA":{
          "role":"button",
          "aria-expanded":false,
          "tabindex":0
        }
      }
      this.checkSearchButtonState();
      this.view.flxAdvSearch2.setActive(true);
    },

    onSegAdvSearch4RowClick: function(){
      this.startSelect = false;
      var index = this.view.segAdvSearch4.selectedRowIndex;
      this.view.flxSegmentAdvSearch4.setVisibility(false);
      this.view.lblDropdownAdvSearch4.text = "O";
      this.view.lblSelectedAdvSearch4.text = this.view.segAdvSearch4.data[index[1]].lblListValue;
      this.view.flxAdvSearch4.accessibilityConfig={
        "a11yLabel":"search "+this.view.lblByServiceRequest.text.slice(0, -1)+". Currently selected "+this.view.lblSelectedAdvSearch4.text+". Click to show list of "+this.view.lblByServiceRequest.text.slice(0, -1),
        "a11yARIA":{
          "role":"button",
          "aria-expanded":false,
          "tabindex":0
        }
      }
      this.checkSearchButtonState();
      this.view.flxAdvSearch4.setActive(true);
    },

  };

});
