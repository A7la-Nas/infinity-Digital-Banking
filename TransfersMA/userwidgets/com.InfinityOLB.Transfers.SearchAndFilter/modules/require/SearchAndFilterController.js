define(['ParserUtilsManager'], function (ParserUtilsManager) {
  var orientationHandler = new OrientationHandler();
  return {
    constructor: function (baseConfig, layoutConfig, pspConfig) {
      //Parser Util Object
      this.ParserUtilsManager = new ParserUtilsManager();

      //General Properties
      this._isComponentEnabled = "";
      this._isSearchEnabled = "";
      this._isFilterEnabled = "";

      //Component Config Properties
      this._BREAKPTS = "";

      //Search Properties
      this._searchPlaceholder = "";

      //Filter Properties
      this._filterValues = "";
      this._filterHeading = "";
      this._selectedFilter = "";

      //Skins
      this._sknSearchTextBoxNormal = "";
      this._sknSearchPlaceHolder = "";
      this._sknSearchText = "";
      this._sknSearchTextBoxFocus = "";
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
      this._iconSearch = "";
      this._iconClear = "";

      //Controller Variables
      this._currIdx;
      this._prevIdx;

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function () {
      //setter and getter method for Component Enabled in the group:General
      defineSetter(this, "isComponentEnabled", function (val) {
        if ((typeof val == 'boolean') && (val != "")) {
          this._isComponentEnabled = val;
        }
      });
      defineGetter(this, "isComponentEnabled", function () {
        return this._isComponentEnabled;
      });

      //setter and getter method for Breakpoints in the group:Component Config
      defineSetter(this, "BREAKPTS", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._BREAKPTS = val;
        }
      });
      defineGetter(this, "BREAKPTS", function () {
        return this._BREAKPTS;
      });

      //setter and getter method for Search Placeholder in the group:Search
      defineSetter(this, "searchPlaceholder", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._searchPlaceholder = val;
        }
      });
      defineGetter(this, "searchPlaceholder", function () {
        return this._searchPlaceholder;
      });

      //setter and getter method for Filter Values in the group:Filter
      defineSetter(this, "filterValues", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._filterValues = val;
        }
      });
      defineGetter(this, "filterValues", function () {
        return this._filterValues;
      });

      //setter and getter method for Search TextBox Normal Skin in the group:Skins
      defineSetter(this, "sknSearchTextBoxNormal", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._sknSearchTextBoxNormal = val;
        }
      });
      defineGetter(this, "sknSearchTextBoxNormal", function () {
        return this._sknSearchTextBoxNormal;
      });

      //setter and getter method for Filter Row Expanded Icon in the group:Icons
      defineSetter(this, "iconFilterRowExpanded", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._iconFilterRowExpanded = val;
        }
      });
      defineGetter(this, "iconFilterRowExpanded", function () {
        return this._iconFilterRowExpanded;
      });

      //setter and getter method for Search Enabled in the group:General
      defineSetter(this, "isSearchEnabled", function (val) {
        if ((typeof val == 'boolean') && (val != "")) {
          this._isSearchEnabled = val;
        }
      });
      defineGetter(this, "isSearchEnabled", function () {
        return this._isSearchEnabled;
      });

      //setter and getter method for Search Placeholder Skin in the group:Skins
      defineSetter(this, "sknSearchPlaceHolder", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._sknSearchPlaceHolder = val;
        }
      });
      defineGetter(this, "sknSearchPlaceHolder", function () {
        return this._sknSearchPlaceHolder;
      });

      //setter and getter method for Filter Row Collapsed Icon in the group:Icons
      defineSetter(this, "iconFilterRowCollapsed", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._iconFilterRowCollapsed = val;
        }
      });
      defineGetter(this, "iconFilterRowCollapsed", function () {
        return this._iconFilterRowCollapsed;
      });

      //setter and getter method for Filter Enabled in the group:General
      defineSetter(this, "isFilterEnabled", function (val) {
        if ((typeof val == 'boolean') && (val != "")) {
          this._isFilterEnabled = val;
        }
      });
      defineGetter(this, "isFilterEnabled", function () {
        return this._isFilterEnabled;
      });

      //setter and getter method for Search Text Skin in the group:Skins
      defineSetter(this, "sknSearchText", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._sknSearchText = val;
        }
      });
      defineGetter(this, "sknSearchText", function () {
        return this._sknSearchText;
      });

      //setter and getter method for RadioButton Selected Icon in the group:Icons
      defineSetter(this, "iconRadioButtonSelected", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._iconRadioButtonSelected = val;
        }
      });
      defineGetter(this, "iconRadioButtonSelected", function () {
        return this._iconRadioButtonSelected;
      });

      //setter and getter method for Search TextBox Focus Skin in the group:Skins
      defineSetter(this, "sknSearchTextBoxFocus", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._sknSearchTextBoxFocus = val;
        }
      });
      defineGetter(this, "sknSearchTextBoxFocus", function () {
        return this._sknSearchTextBoxFocus;
      });

      //setter and getter method for RadioButton Unselected Icon in the group:Icons
      defineSetter(this, "iconRadioButtonUnselected", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._iconRadioButtonUnselected = val;
        }
      });
      defineGetter(this, "iconRadioButtonUnselected", function () {
        return this._iconRadioButtonUnselected;
      });

      //setter and getter method for Filter Value Text Skin in the group:Skins
      defineSetter(this, "sknFilterValueText", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._sknFilterValueText = val;
        }
      });
      defineGetter(this, "sknFilterValueText", function () {
        return this._sknFilterValueText;
      });

      //setter and getter method for Search Icon in the group:Icons
      defineSetter(this, "iconSearch", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._iconSearch = val;
        }
      });
      defineGetter(this, "iconSearch", function () {
        return this._iconSearch;
      });

      //setter and getter method for Filter Row Hover Skin in the group:Skins
      defineSetter(this, "sknFilterRowHover", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._sknFilterRowHover = val;
        }
      });
      defineGetter(this, "sknFilterRowHover", function () {
        return this._sknFilterRowHover;
      });

      //setter and getter method for Clear Icon in the group:Icons
      defineSetter(this, "iconClear", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._iconClear = val;
        }
      });
      defineGetter(this, "iconClear", function () {
        return this._iconClear;
      });

      //setter and getter method for Filter Row Selected Skin in the group:Skins
      defineSetter(this, "sknFilterRowSelected", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._sknFilterRowSelected = val;
        }
      });
      defineGetter(this, "sknFilterRowSelected", function () {
        return this._sknFilterRowSelected;
      });

      //setter and getter method for Filter Row Unselected Skin in the group:Skins
      defineSetter(this, "sknFilterRowUnselected", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._sknFilterRowUnselected = val;
        }
      });
      defineGetter(this, "sknFilterRowUnselected", function () {
        return this._sknFilterRowUnselected;
      });

      //setter and getter method for Filter List Skin in the group:Skins
      defineSetter(this, "sknFilterList", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._sknFilterList = val;
        }
      });
      defineGetter(this, "sknFilterList", function () {
        return this._sknFilterList;
      });

      //setter and getter method for Search and Filter Background Skin in the group:Skins
      defineSetter(this, "sknSearchAndFilterBackground", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._sknSearchAndFilterBackground = val;
        }
      });
      defineGetter(this, "sknSearchAndFilterBackground", function () {
        return this._sknSearchAndFilterBackground;
      });

      //setter and getter method for Filter Heading in the group:Filter
      defineSetter(this, "filterHeading", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._filterHeading = val;
        }
      });
      defineGetter(this, "filterHeading", function () {
        return this._filterHeading;
      });

      //setter and getter method for Filter Heading Skin in the group:Skins
      defineSetter(this, "sknFilterHeading", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._sknFilterHeading = val;
        }
      });
      defineGetter(this, "sknFilterHeading", function () {
        return this._sknFilterHeading;
      });

      //setter and getter method for Selected Filter in the group:Filter
      defineSetter(this, "selectedFilter", function (val) {
        if ((typeof val == 'string') && (val != "")) {
          this._selectedFilter = val;
        }
      });
      defineGetter(this, "selectedFilter", function () {
        return this._selectedFilter;
      });

    },
    /**
     * Component preShow
     */
    preShow: function() {
      try {
        var scope = this;
        this.view.onBreakpointChange = this.onBreakpointChange;
        this.setComponentConfig();
        this.clearSearchText();
        this.initActions();
        this._prevIdx = undefined;
        this.setAccessibility();
        document.addEventListener('keydown', function(event) {
          if (event.which === 27) {
            scope.hideFilterDropdown();
          }
        });
        var currentForm = kony.application.getCurrentForm().id;
        if (currentForm === "frmScheduledPaymentsEurNew") {
          this.view.lblSelectedFilterValue.accessibilityConfig = {
            "a11yLabel": "Currently viewing " + kony.i18n.getLocalizedString("i18n.accounts.allTransactions") + ". Click here to show list of views.",
            "a11yARIA": {
              "tabindex": -1
            }
          };
        }
        if (currentForm === "frmScheduledPaymentsNew") {
                    this.view.lblSelectedFilterValue.accessibilityConfig = {
                        "a11yLabel": "Currently viewing 10 transactions per page. Choose number of transactions displayed.",
                        "a11yARIA": {
                            "tabindex": -1
                        }
                    };
                }
      } catch (err) {
        var errObj = {
          "errorInfo": "Error in preshow method of the component.",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**
     * Function is triggered everytime when the breakpoint is changed.
     */
    onBreakpointChange: function (eventObj, width) {
      if (this._isComponentEnabled) {
        this.view.flxMain.setVisibility(true);
      } else {
        this.view.flxMain.setVisibility(false);
        return;
      }
      if (this._isSearchEnabled) {
        this.view.flxSearch.setVisibility(true);
        this.setSearchField();
        this.searchFocusSetup();
      } else {
        this.view.flxSearch.setVisibility(false);
      }
      if (this._isFilterEnabled) {
        this.view.flxFilter.setVisibility(true);
        this.setFilterField();
      } else {
        this.view.flxFilter.setVisibility(false);
      }
    },
    /**
     * Method to set the Component Config properties in ParserUtilsManager.
     */
    setComponentConfig: function () {
      this.ParserUtilsManager.setBreakPointConfig(JSON.parse(this._BREAKPTS));
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
     * Method to initialize Search Field
     */
    setSearchField: function () {
      try {
        if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
          this.view.flxSearch.width = "93.74%";
          this.view.flxMain.height = this._isFilterEnabled ? "110dp" : "60dp";
          this.view.txtSearch.width = "78%";
        } else {
          this.view.flxSearch.width = this._isFilterEnabled ? "63%" : "95.6%";
          this.view.flxMain.height = "91dp";
          this.view.txtSearch.width = this._isFilterEnabled ? "82%" : "88%";
        }
        this.view.flxContainer.skin = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._sknSearchAndFilterBackground)));
        this.view.flxSearch.skin = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._sknSearchTextBoxNormal)));
        this.view.txtSearch.placeholder = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._searchPlaceholder)));
        this.view.txtSearch.placeholderSkin = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._sknSearchPlaceHolder)));
        this.view.txtSearch.skin = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._sknSearchText)));
        this.view.lblSearchIcon.text = JSON.parse(this._iconSearch)["vizIcon"];
        this.view.lblSearchIcon.skin = JSON.parse(this._iconSearch)["skin"];
        this.view.lblClearIcon.text = JSON.parse(this._iconClear)["vizIcon"];
        this.view.lblClearIcon.skin = JSON.parse(this._iconClear)["skin"];
      } catch (err) {
        var errObj = {
          "errorInfo": "Error while setting Search field in the UI.",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**
     * Method to initialize Filter Field
     */
    setFilterField: function () {
      try {
        if (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) {
          this.view.flxMain.height = this._isSearchEnabled ? "110dp" : "60dp";
          this.view.flxFilter.left = "3.13%";
          this.view.flxFilter.width = "93.74%";
          this.view.flxSegmentFilter.left = "3.13%";
          this.view.flxSegmentFilter.width = "93.74%";
          this.view.flxSegmentFilter.top = this._isSearchEnabled ? "100dp" : "50dp";
        } else {
          this.view.flxMain.height = "91dp";
          this.view.flxFilter.left = this._isSearchEnabled ? "1.46%" : "2.2%";
          this.view.flxFilter.width = this._isSearchEnabled ? "31%" : "95.6%";
          this.view.flxSegmentFilter.left = this._isSearchEnabled ? "66.8%" : "2.2%";
          this.view.flxSegmentFilter.width = this._isSearchEnabled ? "31%" : "95.6%";
          this.view.flxSegmentFilter.top = "69dp";
        }
        this.view.lblDropdownIcon.text = JSON.parse(this._iconFilterRowCollapsed)["vizIcon"];
        this.view.lblDropdownIcon.skin = JSON.parse(this._iconFilterRowCollapsed)["skin"];
        this.hideFilterDropdown();
        this.view.flxSegmentFilter.skin = this._sknFilterList;
        this.view.lblView.text = this.getProcessedText(this._filterHeading) + ":";
        this.view.lblView.skin = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._sknFilterHeading)));
        this.view.lblSelectedFilterValue.skin = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._sknFilterValueText)));
        var filterValues = JSON.parse(this._filterValues);
        var selectedFilter = JSON.parse(this._selectedFilter);
        !this._prevIdx && (selectedFilter.id = "All");
        filterValues.forEach(function (filter) {
          if (filter.id === selectedFilter.id) {
            this.view.lblSelectedFilterValue.text = this.getProcessedText(filter.text);
          }
        }.bind(this));
        var filterValuesTextSkin = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._sknFilterValueText)));
        var dataWidgetMap = {
          "lblRadioBtnIcon": "lblRadioBtnIcon",
          "lblFilterValue": "lblFilterValue",
          "flxFilterList": "flxFilterList",
          "flxFilterValue": "flxFilterValue",
		  "btnFilterValue" : "btnFilterValue"
        };
        var data = filterValues.map(function (filter, index) {
          var filterRow = {
            "id": filter.id,
            "lblFilterValue": {
              "text": this.getProcessedText(filter.text),
              "skin": filterValuesTextSkin,
              "accessibilityConfig": {
                "a11yHidden": true
              }
            },
            "flxFilterList": {
              "height": (kony.application.getCurrentBreakpoint() === 640 || orientationHandler.isMobile) ? "40dp" : "50dp",
              "accessibilityConfig": {
                "a11yARIA": {
                  "tabindex": -1
                }
              }
            },
            "btnFilterValue": {
                "onClick": this.onSegFilterRowClick.bind(this, true),
                "accessibilityConfig": {
                  "a11yARIA": {
                   "aria-labelledby": "lblFilterValue"
                  }
                }
            }
          };
          if (filter.id === selectedFilter.id) {
            this._prevIdx = index;
            filterRow["lblRadioBtnIcon"] = {
              "text": JSON.parse(this._iconRadioButtonSelected)["vizIcon"],
              "skin": JSON.parse(this._iconRadioButtonSelected)["skin"],
              "accessibilityConfig" : {
                "a11yHidden" : true
              }
            };
            filterRow["flxFilterList"] = {
              "skin": this._sknFilterRowSelected,
              "accessibilityConfig" : {
                "a11yARIA": {
                  "role": "radio",
                  "aria-checked": true
                }
              }
            };
          } else {
            filterRow["lblRadioBtnIcon"] = {
              "text": JSON.parse(this._iconRadioButtonUnselected)["vizIcon"],
              "skin": JSON.parse(this._iconRadioButtonUnselected)["skin"],
               "accessibilityConfig" : {
                "a11yHidden" : true
              }
            };
            filterRow["flxFilterList"] = {
              "skin": this._sknFilterRowUnselected,
              "accessibilityConfig" : {
                "a11yARIA": {
                  "role": "radio",
                  "aria-checked": false
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
    /**
     * Method to clear search text and hide clear icon
     */
    clearSearchText: function () {
      this.view.txtSearch.text = "";
      this.view.flxClearBtn.setVisibility(false);
    },
    
    closeSegmentDropDown: function(params) {
      var eventPayload=params[1];
      // this.view.flxSegmentFilter.setVisibility(false);
      // this.toggleFilterDropdown();
      this.hideFilterDropdown();
      eventPayload.preventDefault();
      this.view.flxFilter.setActive(true);
  },
    /**
     * Method to initialize component actions
     */
    initActions: function () {
      try {
        this.view.txtSearch.onDone = this.onSearch.bind(this);
        this.view.flxSearchBtn.onClick = this.onSearch.bind(this);
        this.view.txtSearch.onTextChange = this.onSearchTextChange.bind(this);
        this.view.flxClearBtn.onClick = this.onSearchClear.bind(this);
        this.view.flxFilter.onClick = this.toggleFilterDropdown.bind(this);
        this.view.flxFilter.onKeyPress = this.shiftTabFocus;
        if (this.subscribeToTouchEnd === undefined) {
          this.subscribeToTouchEnd = function() {
            kony.print("subscribeToTouchEnd is not assigned");
          }
        }
        this.subscribeToTouchEnd("flxSegmentFilter",{
          widget: this.view.flxSegmentFilter,
          hideFunction : this.hideFilterDropdown,
          shouldBeVisible: false
        })
       // this.view.segFilter.onRowClick = this.onSegFilterRowClick.bind(this, true);
      } catch (err) {
        var errObj = {
          "errorInfo": "Error while initialising Component Actions.",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Method used to call the search service with the entered search text 
     */
    onSearch: function () {
      try {
        var searchKeyword = this.view.txtSearch.text;
        if (searchKeyword.length >= 3) {
          this.onSearchDone(searchKeyword);
        }
        else if(searchKeyword.length === 0){
          this.onSearchDone("");
        }
      } catch (err) {
        var errObj = {
          "errorInfo": "Error while sending Search text to form.",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**
     * Method to change the visibility of clear icon
     */
    onSearchTextChange: function () {
      var searchText = this.view.txtSearch.text;
      if (searchText.length >= 3) {
        this.view.flxClearBtn.setVisibility(true);
      } else {
        this.view.flxClearBtn.setVisibility(false);
      }
    },
    /**
     * Method used to clear the search text from search textbox
     */
    onSearchClear: function () {
      try {
        this.view.txtSearch.text = "";
        this.view.flxClearBtn.setVisibility(false);
        this.onSearchDone("");
        this.view.txtSearch.setFocus(true);
      } catch (err) {
        var errObj = {
          "errorInfo": "Error while clear Search text from Search textbox.",
          "error": err
        };
        this.onError(errObj);
      }
    },
    
    /**
     * Method to handle the Shift+Tab functionality of the filter list as per the accessibility guidelines
     */
    shiftTabFocus:function(eventObj, eventPayload){
      if (eventPayload.keyCode === 9) {
        if (eventPayload.shiftKey) {
          if(this.view.flxSegmentFilter.isVisible === true) {   
            this.hideFilterDropdown();
            eventPayload.preventDefault();
            this.view.txtSearch.setActive(true);
          }
        }
      }  
    },

    /**
     * Method to show or hide the filter list
     */
    toggleFilterDropdown: function () {
      if (this.view.lblDropdownIcon.text === JSON.parse(this._iconFilterRowCollapsed)["vizIcon"]) {
        this.showFilterDropdown();
      } else {
        this.hideFilterDropdown();
      }
      this.view.flxFilter.setActive(true);
    },

    showFilterDropdown : function(){
      this.view.lblDropdownIcon.text = JSON.parse(this._iconFilterRowExpanded)["vizIcon"];
      this.view.flxSegmentFilter.setVisibility(true);
      this.view.flxSegmentFilter.height=(this.view.segFilter.data.length)*50+"dp";
      this.view.flxFilter.accessibilityConfig ={
        "a11yARIA" : {
          "aria-expanded" : true,
          "tabindex": 0,
          "role":"button",
          "aria-labelledby": "lblSelectedFilterValue"
        }
      }
      this.updateTouchEndSubscriber("flxSegmentFilter",{
        widget: this.view.flxSegmentFilter,
        hideFunction : this.hideFilterDropdown,
        shouldBeVisible: true
      })
      this.view.flxFilter.setActive(true);
    },
    
    hideFilterDropdown : function(){
      this.view.lblDropdownIcon.text = JSON.parse(this._iconFilterRowCollapsed)["vizIcon"];
      this.view.flxSegmentFilter.setVisibility(false);
      this.view.flxFilter.accessibilityConfig = {
        "a11yARIA" : {
          "aria-expanded" :false,
          "tabindex": 0,
          "role":"button",
          "aria-labelledby": "lblSelectedFilterValue"
        }
      }
      this.view.flxFilter.setActive(true);
    },

    /**
     * Method to set selected & unselected row in filter segment when a row is clicked
     */
    onSegFilterRowClick: function (triggerEvent, widgetInfo, segInfo) {
      try {
        this._currIdx = segInfo.rowIndex;
        var filterValues = JSON.parse(this._filterValues);
        this._selectedFilter = JSON.stringify(filterValues[this._currIdx]);
        var data = this.view.segFilter.data;
        if (this._prevIdx === this._currIdx) {
          return;
        }
        if (this._prevIdx !== null && this._prevIdx !== undefined) {
          data[this._prevIdx].lblRadioBtnIcon.text = JSON.parse(this._iconRadioButtonUnselected)["vizIcon"];
          data[this._prevIdx].lblRadioBtnIcon.skin = JSON.parse(this._iconRadioButtonUnselected)["skin"];
          data[this._prevIdx].flxFilterList.skin = this._sknFilterRowUnselected;
          data[this._prevIdx].flxFilterList.accessibilityConfig = {
            "a11yARIA": {
              "role": "radio",
              "aria-checked": false 
            }
          }
          this.view.segFilter.setDataAt(data[this._prevIdx], this._prevIdx);
        }
        data[this._currIdx].lblRadioBtnIcon.text = JSON.parse(this._iconRadioButtonSelected)["vizIcon"];
        data[this._currIdx].lblRadioBtnIcon.skin = JSON.parse(this._iconRadioButtonSelected)["skin"];
        data[this._currIdx].flxFilterList.skin = this._sknFilterRowSelected;
        data[this._currIdx].flxFilterList.accessibilityConfig = {
          "a11yARIA": {
            "role": "radio",
            "aria-checked": true 
          }
        }
        this.view.segFilter.setDataAt(data[this._currIdx], this._currIdx);
        this.view.lblSelectedFilterValue.text = data[this._currIdx].lblFilterValue.text;
        this.view.lblDropdownIcon.text = JSON.parse(this._iconFilterRowCollapsed)["vizIcon"];
        this.view.lblSelectedFilterValue.accessibilityConfig = {
          "a11yLabel": "Currently viewing"+" "+ this.view.lblSelectedFilterValue.text +"transactions. Click here to show list of views.",
          "a11yARIA": {
            "tabindex": -1
          }
        }
        this.hideFilterDropdown();
        this._prevIdx = this._currIdx;
        this.clearSearchText();
        if (triggerEvent) {
          this.onFilterSelect(data[this._currIdx].id);
        }
      } catch (err) {
        var errObj = {
          "errorInfo": "Error while selecting a Filter or while sending selected filter id to form.",
          "error": err
        };
        this.onError(errObj);
      }
      this.view.flxFilter.setActive(true);
    },
    /**
     * Set foucs handlers for skin of Search flex on input focus 
     */
    searchFocusSetup: function () {
      try {
        var textbox = this.view.txtSearch;
        var flex = this.view.flxSearch;
        textbox.onBeginEditing = function () {
          flex.skin = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._sknSearchTextBoxFocus)));
        }.bind(this);
        textbox.onEndEditing = function () {
          flex.skin = this.getBreakPointTypeBasedValue(JSON.stringify(JSON.parse(this._sknSearchTextBoxNormal)));
        }.bind(this);
      } catch (err) {
        var errObj = {
          "errorInfo": "Error while setting up search textbox focus handler.",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**
     * resets the search and filter fields
     */
    resetComponent: function() {
      try {
        if (!this._isFilterEnabled || !this._currIdx || this._currIdx === 0) {
          this.clearSearchText();
        } else {
          this.view.segFilter.selectedRowIndex = [0, 0];
          this.onSegFilterRowClick(false);
        }
      } catch (err) {
        var errObj = {
          "errorInfo": "Error while resetting component",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
      * sets the accessibility for widgets
      */
    setAccessibility: function() {
      this.view.flxSearchBtn.accessibilityConfig = {
        "a11yHidden": true,
        "a11yARIA": {
          "tabindex": -1
        }
      },
        this.view.flxFilter.accessibilityConfig = {
        "a11yARIA": {
          "tabindex": 0,
          "role":"button",                     
          "aria-labelledby" : "lblSelectedFilterValue",
          "aria-expanded" : false
        }
      },
        this.view.lblView.accessibilityConfig={
        "tagName": "span",
        "a11yARIA":{
          "tabindex":-1
        }
      },
        this.view.lblDropdownIcon.accessibilityConfig={
        "a11yHidden":true,
        "a11yARIA":{
          "tabindex":-1
        }
      },
        this.view.lblSelectedFilterValue.accessibilityConfig = {        
        "a11yLabel": "Currently viewing"+" "+ this.getProcessedText(JSON.parse(this._selectedFilter)["text"]) +"transactions. Click here to show list of views." ,
        "a11yARIA":{
          "tabindex":-1
        }
      },
        this.view.flxClearBtn.accessibilityConfig = {
        "a11yLabel": "clear",
        "a11yARIA": {
          "role": "button"
        }
      },
        this.view.lblClearIcon.accessibilityConfig = {
        "a11yHidden": true,
        "a11yARIA": {
          "tabindex": -1
        }
      }
      this.view.segFilter.accessibilityConfig = {
        "a11yARIA" : {
		  "tabindex" : -1
        }
      },
	    this.view.flxSegmentFilter.accessibilityConfig = {
        "a11yARIA" : {
          "tabindex" : -1
        }
      }
    }
  };
});