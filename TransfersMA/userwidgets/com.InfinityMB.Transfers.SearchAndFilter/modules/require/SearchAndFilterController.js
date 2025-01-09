define(['./ParseUtilsManager'],function(ParseUtilsManager) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.parserUtilsManager = new ParseUtilsManager();
      // Visibility Property for Search bar and Filter Icon.
      this._componentVisibility="";

      //Group : Search - Placeholder Text and the criterias to Search on.
      this._placeholderText = "";
      this._searchCriteria = "";

      //Group : Skins - Skin names for Search box, Filter heading and Options.
      this._sknSearchText = "";
      this._sknSearchTextPlaceholderBox = "";
      this._sknFilterHeading = "";
      this._sknSearchTextboxFocus = "";
      this._sknFilterListData = "";
      this._sknSearchAndFilterBackground = "";
      this._sknFilteredDataHeaderBackground = "";
      this._sknFilterListHeaderBackground = "";
      this._sknFilterListItemsBackground = "";

      //Group : Icons - Search, Close, Filter and Selected filter Icons
      this._imgSearchIcon = "";
      this._closeFilterIcon = "";
      this._imgFilterIcon = "";
      this._AdvancedFilterselectedDataIcon = "";
      this._cancelSearchIcon = "";

      //Group : Advanced Filter - Values and two Header Texts.
      this._advancedFilterValues = "";
      this._filterSelected = "";
      this._showAllButton = "";
    },

    initGettersSetters: function() {
            //GROUP : General.
            //Getter and Setter methods for Component Visibility in the group:General
            defineSetter(this, 'componentVisibility', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._componentVisibility = val;
                }
            });
            defineGetter(this, 'componentVisibility', function () {
                return this._componentVisibility;
            });
            //GROUP : Search.
            //Getter and Setter methods method for Placeholder Text in the group:Search
            defineSetter(this, 'placeholderText', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._placeholderText = val;
                }
            });
            defineGetter(this, 'placeholderText', function () {
                return this._placeholderText;
            });
            //Getter and Setter methods method for Search Criteria in the group:Search
            defineSetter(this, 'searchCriteria', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._searchCriteria = val;
                }
            });
            defineGetter(this, 'searchCriteria', function () {
                return this._searchCriteria;
            });
            //GROUP : Skins.
            //Getter and Setter methods for Search Text Skin in the group:Skins
            defineSetter(this, 'sknSearchText', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknSearchText = val;
                }
            });
            defineGetter(this, 'sknSearchText', function () {
                return this._sknSearchText;
            });
            //Getter and Setter methods for Search Text box Placeholder Skin in the group:Skins
            defineSetter(this, 'sknSearchTextPlaceholderBox', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknSearchTextPlaceholderBox = val;
                }
            });
            defineGetter(this, 'sknSearchTextPlaceholderBox', function () {
                return this._sknSearchTextPlaceholderBox;
            });
            //Getter and Setter methods for Filter Heading Skin in the group:Skins
            defineSetter(this, 'sknFilterHeading', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknFilterHeading = val;
                }
            });
            defineGetter(this, 'sknFilterHeading', function () {
                return this._sknFilterHeading;
            });
            //Getter and Setter methods for Search Text box Focus Skin in the group:Skins
            defineSetter(this, 'sknSearchTextboxFocus', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknSearchTextboxFocus = val;
                }
            });
            defineGetter(this, 'sknSearchTextboxFocus', function () {
                return this._sknSearchTextboxFocus;
            });
            //Getter and Setter methods for Filter List Data Skin in the group:Skins
            defineSetter(this, 'sknFilterListData', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknFilterListData = val;
                }
            });
            defineGetter(this, 'sknFilterListData', function () {
                return this._sknFilterListData;
            });
            //Getter and Setter methods for Search and Filter Background Skin in the group:Skins
            defineSetter(this, 'sknSearchAndFilterBackground', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknSearchAndFilterBackground = val;
                }
            });
            defineGetter(this, 'sknSearchAndFilterBackground', function () {
                return this._sknSearchAndFilterBackground;
            });
            //Getter and Setter methods for Filtered Data Header Background Skin in the group:Skins
            defineSetter(this, 'sknFilteredDataHeaderBackground', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknFilteredDataHeaderBackground = val;
                }
            });
            defineGetter(this, 'sknFilteredDataHeaderBackground', function () {
                return this._sknFilteredDataHeaderBackground;
            });
            //Getter and Setter methods for Filter List Header Background Skin in the group:Skins
            defineSetter(this, 'sknFilterListHeaderBackground', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknFilterListHeaderBackground = val;
                }
            });
            defineGetter(this, 'sknFilterListHeaderBackground', function () {
                return this._sknFilterListHeaderBackground;
            });
            //Getter and Setter methods for Filter List Items Background Skin in the group:Skins
            defineSetter(this, 'sknFilterListItemsBackground', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknFilterListItemsBackground = val;
                }
            });
            defineGetter(this, 'sknFilterListItemsBackground', function () {
                return this._sknFilterListItemsBackground;
            });
            //GROUP : Icons.
            //Getter and Setter methods for Seach Icon in the group:Icons
            defineSetter(this, 'imgSearchIcon', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._imgSearchIcon = val;
                }
            });
            defineGetter(this, 'imgSearchIcon', function () {
                return this._imgSearchIcon;
            });
            //Getter and Setter methods for Close Filter Icon in the group:Icons
            defineSetter(this, 'closeFilterIcon', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._closeFilterIcon = val;
                }
            });
            defineGetter(this, 'closeFilterIcon', function () {
                return this._closeFilterIcon;
            });
            //Getter and Setter methods for Filter Icon in the group:Icons
            defineSetter(this, 'imgFilterIcon', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._imgFilterIcon = val;
                }
            });
            defineGetter(this, 'imgFilterIcon', function () {
                return this._imgFilterIcon;
            });
            //Getter and Setter methods for Advanced Filter Selected Data Icon in the group:Icons
            defineSetter(this, 'AdvancedFilterselectedDataIcon', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._AdvancedFilterselectedDataIcon = val;
                }
            });
            defineGetter(this, 'AdvancedFilterselectedDataIcon', function () {
                return this._AdvancedFilterselectedDataIcon;
            });
            //Getter and Setter methods for Cancel Search Icon in the group:Icons
            defineSetter(this, 'cancelSearchIcon', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._cancelSearchIcon = val;
                }
            });
            defineGetter(this, 'cancelSearchIcon', function () {
                return this._cancelSearchIcon;
            });
            //GROUP : Advanced Filter.
            //Getter and Setter methods for Advanced Filter Values in the group:Advanced Filter
            defineSetter(this, 'advancedFilterValues', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._advancedFilterValues = val;
                }
            });
            defineGetter(this, 'advancedFilterValues', function () {
                return this._advancedFilterValues;
            });
            //Getter and Setter methods for Filter Selected in the group:Advanced Filter
            defineSetter(this, 'filterSelected', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._filterSelected = val;
                }
            });
            defineGetter(this, 'filterSelected', function () {
                return this._filterSelected;
            });
            //Getter and Setter methods for Show All Button in the group:Advanced Filter
            defineSetter(this, 'showAllButton', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._showAllButton = val;
                }
            });
            defineGetter(this, 'showAllButton', function () {
                return this._showAllButton;
            });
            defineGetter(this, 'navigateTo', () => {
                return this._navigateTo;
            });
            defineSetter(this, 'navigateTo', value => {
                this._navigateTo = value;
            });
        },

    /**
     * Component getProcessedText.
     * To Process the i18n Key through ParserUtilManager.js and return the required
     text as an out parameter.
     */
    getProcessedText: function(text) {
      return this.parserUtilsManager.getParsedValue(text);
    },

    /**
     * Component preShow.
     * To set values and perform required actions on 'Preshow' event of 
     SearchAndFilter component.
     */
    preShow: function() {
      this.view.txtSearchBox.text = "";
      this.view.flxCloseSearchIcon.setVisibility(false);
      this.setSearchAndFilterTitle();
      this.setIdBasedValueFromArray("All");
      this.view.flxAdvancedFilter.onClick = this.setAdvancedFilterValues.bind(this);
      this.view.sgmtFilterOptions.onRowClick = this.setSelectedFilter.bind(this);
      this.view.flxShowAll.onClick = this.clearFilter.bind(this);
      this.view.flxCloseSearchIcon.onClick = this.clearSearch.bind(this);
    },

    /**
     * Component setIdBasedValueFromArray.
     * To set values to Filter Options and Filter headers according to the ID
     selected from the Array given in contracts.
     * @param: id{String} - ID for the Selected Filter. 
     */
    setIdBasedValueFromArray: function(id) {
      try {
        var scope = this;
        var selectedRowHeaders = JSON.parse("[" + this._filterSelected + "]");
        var filterOption = [];
        var filterValues = JSON.parse("[" + this._advancedFilterValues + "]");
        var selectedFilter = id;
        var FilterSkinData = this._sknFilterListData;
        var selectedFilterIcon = this._AdvancedFilterselectedDataIcon;
        selectedRowHeaders[0].forEach(function(item) {
          var filterHeaderText = scope.getProcessedText(item["headerText"]);
          if(item["id"] === id) {
            scope.view.lblFilteredHeader.text = filterHeaderText;
            scope.view.lblFiltersListHeading.text = filterHeaderText;
          }
        });
        if(id === "All") {
          this.view.flxFilteredListHeader.setVisibility(false);
        }
        filterValues[0].forEach(function(item) {
          var filterOptionName = scope.getProcessedText(item.text);
          var filter = {
            "lblFilterOption" : {text:filterOptionName,skin:FilterSkinData},
            "imgFilterSelectedIcon" : {"src": item.id===selectedFilter?selectedFilterIcon:""},
            "id":item.id
          };
          filterOption.push(filter);
        });
        this.view.sgmtFilterOptions.setData(filterOption);
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error while setting Filter Headers and Options List in the UI.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component setAdvancedFilterValues.
     * To set values and modify Visibility settings on click of the Advanced Filter
     Button.
     */
    setAdvancedFilterValues: function() {
      if(this._navigateTo){
        var navMan = applicationManager.getNavigationManager();
        navMan.navigateTo(this._navigateTo);
      } else {
        this.view.flxFiltersList.setVisibility(true);
      }
    },

    /**
     * Component setSearchAndFilterTitle.
     * To set Skins, Texts, Images, Visibility Settings on initial loading of the 
     component.
     */
    setSearchAndFilterTitle: function() {
      try {
        var ShowAllButtonProperties = JSON.parse(this._showAllButton);
        if(this._componentVisibility === "Show All") {
          this.view.flxSearchAndFilter.setVisibility(true);
        }
        if(this._componentVisibility === "Hide All") {
          this.view.flxSearchAndFilter.setVisibility(false);
        }
        if(this._componentVisibility === "Hide Search") {
          this.view.flxSearchBoxHolder.setVisibility(false);
        }
        if(this._componentVisibility === "Hide Advanced Filter") {
          this.view.flxAdvancedFilter.setVisibility(false);
          this.view.flxSearchBoxHolder.width = "90%";
        }
        this.view.txtSearchBox.placeholder = this.getProcessedText(this._placeholderText);
        this.view.lblShowAllBtn.text = this.getProcessedText(ShowAllButtonProperties.text);
        this.view.txtSearchBox.skin = this._sknSearchText;
        this.view.txtSearchBox.placeholder.skin = this._sknSearchText;
        this.view.lblShowAllBtn.skin = ShowAllButtonProperties.skin;
        this.view.lblFilteredHeader.skin = this._sknFilterHeading;
        this.view.lblFiltersListHeading.skin = this._sknFilterHeading;
        this.view.txtSearchBox.focusSkin = this._sknSearchTextboxFocus;
        this.view.flxSearchAndFilter.skin = this._sknSearchAndFilterBackground;
        this.view.flxFilteredListHeader.skin = this._sknFilteredDataHeaderBackground;
        this.view.flxFiltersListHeader.skin = this._sknFilterListHeaderBackground;
        this.view.imgSearchIcon.src = this._imgSearchIcon;
        this.view.imgAdvancedFilter.src = this._imgFilterIcon;
        this.view.imgFilterCollpase.src = this._closeFilterIcon;
        this.view.imgCloseSearchIcon.src = this._cancelSearchIcon;
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setting contract Elements to the component UI.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component setSelectedFilter.
     * To set Filter Heading text and required Visibility settings on Selection
     of a particular Filter option.
     * @param: seguiWidget{JSONObject} - Object with Data from the Segment pointed.
     * @param: sectionIndex{String} - Integer with the Sectional Index
     (In this case, single section for Filter List).
     * @param: rowIndex{String} - Integer with Selected Row number Index.
     */
    setSelectedFilter: function(seguiWidget, sectionIndex, rowIndex) {
      try {
        this.clearSearch();
        this.view.flxFilteredListHeader.setVisibility(true);
        this.view.flxFiltersList.setVisibility(false);
        var segmentData = this.view.sgmtFilterOptions.data[rowIndex].id;
        this.setIdBasedValueFromArray(segmentData);
        if(segmentData === "All") {
          this.onFilterSelect("All",false,"66");
        }
        else {
          this.onFilterSelect(segmentData,true,"66");
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error while selecting Filter type from the List.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component searchTextChange.
     * To manage actions that occur on Search textbox onChange Event.
     */
    searchTextChange: function() {
      try {
        var SearchText = this.view.txtSearchBox.text;
        if(SearchText.length >= 3) {
          this.onSearchTextChange(SearchText);
          this.view.flxCloseSearchIcon.setVisibility(true);
          this.view.forceLayout();
        }
        else {
          if(SearchText.length === 2) {
            this.onSearchTextChange("");
             }
          this.view.flxCloseSearchIcon.setVisibility(false);
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error while Search Text is Done and submitted.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component clearFilter.
     * To manage actions that occur on selection of Show All Button.
     */
    clearFilter: function() {
      try {
        this.setIdBasedValueFromArray("All");
        this.view.flxFilteredListHeader.setVisibility(false);
        this.onFilterSelect("All",false,"66");
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error while Show All is clicked and Filter is set to Clear.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component clearSearch.
     * To manage actions that occur on selection of Cancel Search Button.
     */
    clearSearch: function() {
      try {
        this.view.flxCloseSearchIcon.setVisibility(false);
        this.view.txtSearchBox.text = "";
        this.onSearchTextChange(this.view.txtSearchBox.text);
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error while Show All is clicked and Filter is set to Clear.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    }
  };
});