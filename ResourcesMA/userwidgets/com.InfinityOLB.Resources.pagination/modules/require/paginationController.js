define(['./ParserUtilsManager'],function(ParserUtilsManager) {
  // Responsible for rendering and handling business logic for pagination component
  // Shared variables across the multiple instance of the component and will be destroyed once component is hidden.
  var currentPage = 0;
  var totalPages = 0;
  var currentPageSize = 0;
  var totalRecordsCount = 0;
  var startIndex = 1;
  var endIndex = 0;
  var isMaxLimitReached = false;
  var tokens = {
    "currentPage" :"",
    "totalPages":"",
    "currentPageSize":"",
    "totalRecords":"",
    "startIndex":"",
    "endIndex":""
  };				  
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {     
      this.parserUtilsManager = new ParserUtilsManager();

      //declaration for Bar Enabled Previous Icon  in the group:Icons
      this._iconPaginationPreviousEnabled="";

      //declaration for Bar Enabled Next Icon in the group:Icons
      this._iconPaginationNextEnabled="";

      //declaration for Bar Enabled Last Icon in the group:Icons
      this._iconPaginationLastEnabled="";

      //declaration for Bar Enabled First Icon in the group:Icons
      this._iconPaginationFirstEnabled="";

      //declaration for Bar Disabled Previous Icon  in the group:Icons
      this._iconPaginationPreviousDisabled="";

      //declaration for Bar Disabled Next icon in the group:Icons
      this._iconPaginationNextDisabled="";

      //declaration for Bar Disabled Last Icon in the group:Icons
      this._iconPaginationLastDisabled="";

      //declaration for Bar Disabled First Icon in the group:Icons
      this._iconPaginationFirstDisabled="";

      //declaration for Pagination bar label in the group:General
      this._paginationText="";

      //declaration for Pagination bar text skin in the group:Skins
      this._sknPaginationText="";

      //declaration for Dropdown Label in the group:General
      this._recordsPerPageLabel="";

      //declaration for Dropdown label skin in the group:Skins
      this._sknRecordsPerPageLabel="";
	  
	  this._sknRecordsPerPageSelected="";								 

      //declaration for Dropdown list value skin in the group:Skins
      this._sknRecordsPerPageListItems="";

      //declaration for Dropdown Icon in the group:Icons
      this._dropdownExpandIcon="";

      this._dropdownCollapseIcon="";

      //declaration for Visibility in the group:General
      this._componentVisibility="";

      //declaration for Default records per page  in the group:General
      this._recordsPerPage="";

      //declaration for Dropdown values  in the group:General
      this._recordsPerPageList="";

      //declaration for Default Page Number in the group:General
      this._defaultPageNumber="";

      //declaration for Break Point configuration in the group:General
      this._BREAKPTS="";

      // component global to store the respective skins for icons.
      this.Icons = {
        "nextActiveSkin" : "",
        "nextInActiveSkin" : "",
        "prevActiveSkin" : "",
        "prevInActiveSkin" : "",
        "firstActiveSkin" : "",
        "firstInActiveSkin" : "",
        "lastActiveSkin" : "",
        "lastInActiveSkin" : "",
        "dropdownExpandSkin":"",
        "dropdownCollapseSkin":""
      };
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

      //setter method for Bar Enabled Previous Icon  in the group:Icons
      defineSetter(this, "iconPaginationPreviousEnabled", function(val) {
        if((typeof val=='string') && (val != "")){
          this._iconPaginationPreviousEnabled=val;
        }
      });

      //getter method for Bar Enabled Previous Icon  in the group:Icons
      defineGetter(this, "iconPaginationPreviousEnabled", function() {
        return this._iconPaginationPreviousEnabled;
      });

      //setter method for Pagination bar text skin in the group:Skins
      defineSetter(this, "sknPaginationText", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknPaginationText=val;
        }
      });

      //getter method for Pagination bar text skin in the group:Skins
      defineGetter(this, "sknPaginationText", function() {
        return this._sknPaginationText;
      });

      //setter method for Visibility in the group:General
      defineSetter(this, "componentVisibility", function(val) {
        if((typeof val=='string') && (val != "")){
          this._componentVisibility=val;
        }
      });
	  
      //setter method for Dropdown selected value skin in the group:Skins
      defineSetter(this, "sknRecordsPerPageSelected", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknRecordsPerPageSelected=val;
        }
      });

      //getter method for Dropdown selected value skin in the group:Skins
      defineGetter(this, "sknRecordsPerPageSelected", function() {
        return this._sknRecordsPerPageSelected;
      });
	  
      //getter method for Visibility in the group:General
      defineGetter(this, "componentVisibility", function() {
        return this._componentVisibility;
      });

      //setter method for Bar Enabled Next Icon in the group:Icons
      defineSetter(this, "iconPaginationNextEnabled", function(val) {
        if((typeof val=='string') && (val != "")){
          this._iconPaginationNextEnabled=val;
        }
      });

      //getter method for Bar Enabled Next Icon in the group:Icons
      defineGetter(this, "iconPaginationNextEnabled", function() {
        return this._iconPaginationNextEnabled;
      });

      //setter method for Dropdown label skin in the group:Skins
      defineSetter(this, "sknRecordsPerPageLabel", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknRecordsPerPageLabel=val;
        }
      });

      //getter method for Dropdown label skin in the group:Skins
      defineGetter(this, "sknRecordsPerPageLabel", function() {
        return this._sknRecordsPerPageLabel;
      });

      //setter method for Break Point configuration in the group:General
      defineSetter(this, "BREAKPTS", function(val) {
        if((typeof val=='string') && (val != "")){
          this._BREAKPTS=val;
        }
      });

      //getter method for Break Point configuration in the group:General
      defineGetter(this, "BREAKPTS", function() {
        return this._BREAKPTS;
      });

      //setter method for Default records per page  in the group:General
      defineSetter(this, "recordsPerPage", function(val) {
        if((typeof val=='string') && (val != "")){
          this._recordsPerPage=val;
        }
      });

      //getter method for Default records per page  in the group:General
      defineGetter(this, "recordsPerPage", function() {
        return this._recordsPerPage;
      });

      //setter method for Bar Enabled Last Icon in the group:Icons
      defineSetter(this, "iconPaginationLastEnabled", function(val) {
        if((typeof val=='string') && (val != "")){
          this._iconPaginationLastEnabled=val;
        }
      });

      //getter method for Bar Enabled Last Icon in the group:Icons
      defineGetter(this, "iconPaginationLastEnabled", function() {
        return this._iconPaginationLastEnabled;
      });

      //setter method for Dropdown list value skin in the group:Skins
      defineSetter(this, "sknRecordsPerPageListItems", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknRecordsPerPageListItems=val;
        }
      });

      //getter method for Dropdown list value skin in the group:Skins
      defineGetter(this, "sknRecordsPerPageListItems", function() {
        return this._sknRecordsPerPageListItems;
      });

      //setter method for Bar Enabled First Icon in the group:Icons
      defineSetter(this, "iconPaginationFirstEnabled", function(val) {
        if((typeof val=='string') && (val != "")){
          this._iconPaginationFirstEnabled=val;
        }
      });

      //getter method for Bar Enabled First Icon in the group:Icons
      defineGetter(this, "iconPaginationFirstEnabled", function() {
        return this._iconPaginationFirstEnabled;
      });

      //setter method for Default Page Number in the group:General
      defineSetter(this, "defaultPageNumber", function(val) {
        if((typeof val=='string') && (val != "")){
          this._defaultPageNumber=val;
        }
      });

      //getter method for Default Page Number in the group:General
      defineGetter(this, "defaultPageNumber", function() {
        return this._defaultPageNumber;
      });

      //setter method for Pagination bar label in the group:General
      defineSetter(this, "paginationText", function(val) {
        if((typeof val=='string') && (val != "")){
          this._paginationText=val;
        }
      });

      //getter method for Pagination bar label in the group:General
      defineGetter(this, "paginationText", function() {
        return this._paginationText;
      });

      //setter method for Dropdown Icon in the group:Icons
      defineSetter(this, "dropdownExpandIcon", function(val) {
        if((typeof val=='string') && (val != "")){
          this._dropdownExpandIcon=val;
        }
      });

      //getter method for Dropdown Icon in the group:Icons
      defineGetter(this, "dropdownExpandIcon", function() {
        return this._dropdownExpandIcon;
      });


      defineSetter(this, "dropdownCollapseIcon", function(val) {
        if((typeof val=='string') && (val != "")){
          this._dropdownCollapseIcon=val;
        }
      });

      //getter method for Dropdown Icon in the group:Icons
      defineGetter(this, "dropdownCollapseIcon", function() {
        return this._dropdownCollapseIcon;
      });

      //setter method for Dropdown Label in the group:General
      defineSetter(this, "recordsPerPageLabel", function(val) {
        if((typeof val=='string') && (val != "")){
          this._recordsPerPageLabel=val;
        }
      });

      //getter method for Dropdown Label in the group:General
      defineGetter(this, "recordsPerPageLabel", function() {
        return this._recordsPerPageLabel;
      });

      //setter method for Bar Disabled Previous Icon  in the group:Icons
      defineSetter(this, "iconPaginationPreviousDisabled", function(val) {
        if((typeof val=='string') && (val != "")){
          this._iconPaginationPreviousDisabled=val;
        }
      });

      //getter method for Bar Disabled Previous Icon  in the group:Icons
      defineGetter(this, "iconPaginationPreviousDisabled", function() {
        return this._iconPaginationPreviousDisabled;
      });

      //setter method for Dropdown values  in the group:General
      defineSetter(this, "recordsPerPageList", function(val) {
        if((typeof val=='string') && (val != "")){
          this._recordsPerPageList=val;
        }
      });

      //getter method for Dropdown values  in the group:General
      defineGetter(this, "recordsPerPageList", function() {
        return this._recordsPerPageList;
      });

      //setter method for Bar Disabled Next icon in the group:Icons
      defineSetter(this, "iconPaginationNextDisabled", function(val) {
        if((typeof val=='string') && (val != "")){
          this._iconPaginationNextDisabled=val;
        }
      });

      //getter method for Bar Disabled Next icon in the group:Icons
      defineGetter(this, "iconPaginationNextDisabled", function() {
        return this._iconPaginationNextDisabled;
      });

      //setter method for Bar Disabled Last Icon in the group:Icons
      defineSetter(this, "iconPaginationLastDisabled", function(val) {
        if((typeof val=='string') && (val != "")){
          this._iconPaginationLastDisabled=val;
        }
      });

      //getter method for Bar Disabled Last Icon in the group:Icons
      defineGetter(this, "iconPaginationLastDisabled", function() {
        return this._iconPaginationLastDisabled;
      });

      //setter method for Bar Disabled First Icon in the group:Icons
      defineSetter(this, "iconPaginationFirstDisabled", function(val) {
        if((typeof val=='string') && (val != "")){
          this._iconPaginationFirstDisabled=val;
        }
      });

      //getter method for Bar Disabled First Icon in the group:Icons
      defineGetter(this, "iconPaginationFirstDisabled", function() {
        return this._iconPaginationFirstDisabled;
      });

    },

    /*
     * Component preShow
     * Initialises actions, initalise component specific values,calculate component specific values
     */
    preshow: function(){
      var self = this;
      try
      {
        this.initActions();
        this.parserUtilsManager.setBreakPointConfig(JSON.parse(this.BREAKPTS));
        this.initializeComponentValues();
        this.storeIconValues();
        this.setPageSize();
        this.setCurrentPage(parseInt(this._defaultPageNumber));
        this.setLowerLimit(1);
        this.setVisibilityBasedOnContracts();
        this.setAccessibility();
      }
      catch(err){
        var errorObj =
            {
              "errorInfo" : "Error in the preshow of the component.",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
      this.view.onKeyPress = this.onKeyPressCallBack;
    },
    onKeyPressCallBack: function (eventObject, eventPayload) {
      var self = this;
      if (eventPayload.keyCode === 27) {
        if(self.view.flxDropdownValues.isVisible === true || self.view.flxMobileDropdownValues.isVisible === true)
          self.toggleSegmentVisibility();
      }
    },
    /*
     * Component setVisibilityBasedOnContracts
     * sets the visiblity of flxRecordsPerPage and flxPaginationWrapper based on componentVisibility contract.
     */
    setVisibilityBasedOnContracts: function() {
      var currentVisibilityState = this._componentVisibility;
      this.view.flxDropDownWrapper.width = "150dp";
      this.view.flxDropdownValues.width = "140dp";
      if(currentVisibilityState == "Show all"){
        this.view.flxMain.isVisible = true;
        this.view.flxRecordsPerPage.isVisible = true;
        this.view.flxPaginationWrapper.isVisible = true;
        this.view.flxRecordsPerPage.right = "320dp";
        this.view.flxPaginationWrapper.right = "0dp";
        if (kony.i18n.getCurrentLocale() === "ar_AE") {
          this.view.flxPickList.right = "0dp";
          this.view.flxRecordsPerPage.right = "300dp";
        }
      }
      else if(currentVisibilityState == "Hide dropdown"){
        this.view.flxMain.isVisible = true;
        this.view.flxRecordsPerPage.isVisible = false;
        this.view.flxPaginationWrapper.isVisible = true;
        this.view.flxRecordsPerPage.right="300dp";
      }
      else if (currentVisibilityState == "Hide pagination bar") {
        this.view.flxMain.isVisible = true;
        this.view.flxRecordsPerPage.isVisible = true;
        this.view.flxPaginationWrapper.isVisible = false;
        if (kony.application.getCurrentBreakpoint() > "640") {
          if (kony.i18n.getCurrentLocale() === "ar_AE") {
            this.view.flxRecordsPerPage.right = "20dp";
            this.view.flxPickList.right = "0dp"
          }
          else {
            this.view.flxRecordsPerPage.right = "20dp";
          }
        }
      }
      else{
        this.view.flxMain.isVisible = false;
        this.view.flxRecordsPerPage.isVisible = true;
        this.view.flxPaginationWrapper.isVisible = true;
        this.view.flxRecordsPerPage.right="18dp";	 
      }
    },

    /*
     * Component setIcons
     * sets the skins/image values to the pagination widgets.
     */
    setIcons: function(){
      var self = this;
      try
      {
        this.view.imgPaginationFirst.src = this.Icons.firstInActiveSkin;
        this.view.imgPaginationLast.src = this.Icons.lastActiveSkin;
        this.view.imgPaginationNext.src = this.Icons.nextActiveSkin;
        this.view.imgPaginationPrevious.src = this.Icons.prevInActiveSkin;
        this.view.imgDropdownIcon.src = this.Icons.dropdownExpandSkin;
      }
      catch(err){
        var errorObj =
            {
              "errorInfo" : "Error in setting the skins to the pagination.",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },

    /*
     * Component postShow
     * 
     */
    postshow: function(){
      var self = this;
      try
      {
        this.setSkins();	
        this.setDropDownSelectedKey();
        this.setIcons();
        this.setComponentText();	  
        this.setDropdownHeight();
        this.setAccessibility();
      }
      catch(err) {
        var errorObj =
            {
              "errorInfo" : "Error in the postshow of the component.",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },

    /*
     * Component setComponentText
     * to set the parsed component text to label widgets of the component.
     */
    setComponentText: function(){
      var self = this;
      try
      {
        this.view.lblPickList.text = this.getParsedValue(this._recordsPerPageLabel, kony.application.getCurrentBreakpoint());
        this.setIntervalText();
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in the setting the parsed component text.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },

    /*
     * getParsedValue
     * @param: property{JSONObject} - Property
     * @param: selectedValue{string} - Selected value
     * parses the property and fetches the corresponding Value.
     * @return : parsed value result
     */
    getParsedValue: function(property, selectedValue) {
      try{
        property=JSON.parse(property);
      }
      catch(e){
        property=property;
      }
      if(typeof(property)==="string")
        return this.getProcessedText(property);
      else
        return this.parserUtilsManager.getComponentConfigParsedValue(property,selectedValue);
    },

    /*
     * @api : getProcessedText
     * helper method to invoke parser utility functions to get the parsed value.
     * @param : text{object} -value collected from exposed contract
     * @return : parsed value result
     */
    getProcessedText: function(text) {
      return this.parserUtilsManager.getParsedValue(text);
    },

    /*
     * Component storeIconValues
     * Stores icons for the respective skin based on the contract definition.
     */
    storeIconValues: function(){
      var self = this;
      try{
        this.Icons = {
          "nextActiveSkin" : this.getParsedImageValue(this._iconPaginationNextEnabled),
          "nextInActiveSkin" : this.getParsedImageValue(this._iconPaginationNextDisabled),
          "prevActiveSkin" : this.getParsedImageValue(this._iconPaginationPreviousEnabled),
          "prevInActiveSkin" : this.getParsedImageValue(this._iconPaginationPreviousDisabled),
          "firstActiveSkin" : this.getParsedImageValue(this._iconPaginationFirstEnabled),
          "firstInActiveSkin" : this.getParsedImageValue(this._iconPaginationFirstDisabled),
          "lastActiveSkin" : this.getParsedImageValue(this._iconPaginationLastEnabled),
          "lastInActiveSkin" : this.getParsedImageValue(this._iconPaginationLastDisabled),
          "dropdownExpandSkin": this.getParsedImageValue(this._dropdownExpandIcon),
          "dropdownCollapseSkin":this.getParsedImageValue(this._dropdownCollapseIcon)
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the parsed icon value",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },

    /*
     * Component getParsedImageValue
     * To get the parsed image value using the contractJSON
     * @param : contractJSON{JSONObject} - JSON contract
     * @return : returns contractJSON
     */
    getParsedImageValue: function(contractJSON){
      try{
        contractJSON = JSON.parse(contractJSON);
        if(contractJSON.hasOwnProperty("img")){
          contractJSON = contractJSON["img"];
        }
      }
      catch(e){
        kony.print(e);
      }
      return contractJSON;
    },

    /*
     * Component initializeComponentValues
     * initializes the component values - currentPageSize, endIndex
     */
    initializeComponentValues: function(){
      var self = this;
      try
      {
        currentPageSize = parseInt(this._recordsPerPage);
        endIndex = currentPageSize;
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in the initializing the component values.",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },

    /*
     * Component setContext
     * To collect the totalRecordsCountValue required for the component 
     * @param: totalRecordsCountValue{integer} - total records count value
     */
    setContext: function(totalRecordsCountValue) {
      totalRecordsCount = totalRecordsCountValue;
      this.setPagesCount();
    },

    /*
     * Component setCurrentPage
     * to set the current page token value from currentPageIndex
     * @param: currentPageIndex{integer} - the current page index is passed
     */
    setCurrentPage: function(currentPageIndex){
      currentPage = currentPageIndex;
    },

    /*
     * Component getCurrentPage
     * to get the current page token value
     * @return : current page
     */
    getCurrentPage: function(){
      return currentPage;
    },

    /*
     * Component setPagesCount
     * to set the total pages count token.
     */
    setPagesCount: function(){
      var self =this;
      try
      {
        if(totalRecordsCount % currentPageSize === 0){
          totalPages = totalRecordsCount/currentPageSize;
        }
        else{
          totalPages = Math.floor(totalRecordsCount/currentPageSize) + 1;
        }
        if(totalPages === 0){
          totalPages = 1;
        }
      }
      catch(err){
        var errorObj =
            {
              "errorInfo" : "Error in setting the total pages count",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },

    /*
     * Component setLowerLimit
     * to set the lower or starting limit token from the startIndexValue
     * @param: startIndexValue{integer} - start index value
     */
    setLowerLimit : function(startIndexValue){
      startIndex = startIndexValue;
    },

    /*
     * Component setPageSize
     * to set the endIndex value token.
     */
    setPageSize : function(){
      var self =this;
      try
      {
        currentPageSize = parseInt(this._recordsPerPage);
        endIndex = currentPageSize;
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the endIndex value",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },

    /*
     * Component getPageSize
     * return the number of records per page
     * @return : parsed recorde per page
     */
    getPageSize : function(){
      return parseInt(this._recordsPerPage);
    },

    /*
     * Component getPageOffset
     * returns the page offset value
     * @return : returns the page offset
     */
    getPageOffset : function(){
      return endIndex - currentPageSize;
    },

    /*
     * Component setIsMaxLimitReached
     * to set if the maximum limit is reached
     * @param : isMaxLimitReachedVal{Boolean} - if the maximum limit as been reached
     */
    setIsMaxLimitReached : function(isMaxLimitReachedVal){
      isMaxLimitReached = isMaxLimitReachedVal;
    },

    /*
     * Component setIsMaxLimitReached
     * to check if the maximum limit is reached
     * @return : isMaxLimitReachedVal{Boolean} - returns if the maximum limit as been reached
     */
    getIsMaxLimitReached : function(){
      return isMaxLimitReached;
    },

    /*
     * Component updatePaginationLimitsForPreviousData
     * to update the pagination limits based on the previous page's data.
     */
    updatePaginationLimitsForPreviousData : function(){
      var self =this;
      try
      {
        if(endIndex !== 1 && endIndex !== totalRecordsCount){
          startIndex -= currentPageSize;
          endIndex -= currentPageSize;
          currentPage -= 1;
        }
        else{
          if(endIndex === totalRecordsCount){
            startIndex -= currentPageSize;
            endIndex = startIndex + currentPageSize - 1;
            currentPage -= 1;
          }
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in updating the pagination limits of the current page",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },

    /*
     * Component updatePaginationLimitsForNextData
     * to update the pagination limits based on the next page's data.
     */
    updatePaginationLimitsForNextData : function(){
      var self =this;
      try
      {
        if(!isMaxLimitReached){
          startIndex += currentPageSize;
          endIndex += currentPageSize;
          currentPage += 1;
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in updating the pagination limits of the current page",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },

    /*
     * Component updatePaginationBar
     * to update the pagination bar and set active/inactive status of pagination bar icons
     * @param : paginatedRecordsLength{integer} - Length of paginated records
     * @param : totalRecordsLength{integer} - Total length of records
     */
    updatePaginationBar: function(paginatedRecordsLength , totalRecordsLength){
      var self =this;
      try
      {
        if(totalRecordsLength || totalRecordsLength ==0){
          totalRecordsCount = parseInt(totalRecordsLength);
          if(totalRecordsCount == 0){
            startIndex = 0;
          }
          this.calculateEndIndex();
          this.setIsMaxLimitReached(endIndex >= totalRecordsLength);
          this.setPagesCount();
          this.view.flxPaginationLast.isVisible = true;
          this.view.flxPaginationFirst.isVisible = true;
        }
        else{
          this.calculateEndIndex(paginatedRecordsLength);
          this.view.flxPaginationLast.isVisible = false;
          this.view.flxPaginationFirst.isVisible = false;
          this.setIsMaxLimitReached(paginatedRecordsLength + 1 < currentPageSize);
        }
        this.setIntervalText();
        var previous = this.Icons.prevActiveSkin;
        this.view.flxPaginationPrevious.accessibilityConfig = {
          "a11yLabel": "Enabled Previous page",
          "a11yARIA": {
            tabindex: 0,
            "role": "button"
          }
        }
        var next = this.Icons.nextActiveSkin;
        this.view.flxPaginationNext.accessibilityConfig = {
          "a11yLabel": "Enabled Next page",
          "a11yARIA": {
            tabindex: 0,
            "role": "button"
          }
        }
        var first = this.Icons.firstActiveSkin;
        this.view.flxPaginationFirst.accessibilityConfig = {
          "a11yLabel": "Enabled First page",
          "a11yARIA": {
            tabindex: 0,
            "role": "button"
          }
        }
        var last = this.Icons.lastActiveSkin;
        this.view.flxPaginationLast.accessibilityConfig = {
          "a11yLabel": "Enabled Last page",
          "a11yARIA": {
            tabindex: 0,
            "role": "button"
          }
        }
        if(startIndex === 1) {
          previous = this.Icons.prevInActiveSkin;
          this.view.flxPaginationPrevious.accessibilityConfig = {
            "a11yLabel": "Disabled Previous page",
            "a11yARIA": { tabindex:-1,
              "role": "button"
            }
          }
          first = this.Icons.firstInActiveSkin;
          this.view.flxPaginationFirst.accessibilityConfig = {
            "a11yLabel": "Disabled First page",
            "a11yARIA": { tabindex:-1,
              "role": "button"
            }
          }
        }
        if(isMaxLimitReached) {
          next = this.Icons.nextInActiveSkin;
          this.view.flxPaginationNext.accessibilityConfig = {
            "a11yLabel": "Disabled Next page",
            "a11yARIA": { tabindex:-1,
              "role": "button"
            }
          }
          last = this.Icons.lastInActiveSkin;
          this.view.flxPaginationLast.accessibilityConfig = {
            "a11yLabel": "Disabled Last page",
            "a11yARIA": { tabindex:-1,
              "role": "button"
            }
          }
        }
        this.view.imgPaginationPrevious.src = previous;
        this.view.imgPaginationNext.src = next;
        this.view.imgPaginationFirst.src = first;
        this.view.imgPaginationLast.src = last;
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in updating the pagination bar and setting visiblity",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },

    /*
     * Component collapseDropDown
     * collapses the dropdown UI on shuffling b/w various tabs
     */
    collapseDropDown: function() {
      var dropdownFlex,dropdownSegment;
      if(kony.application.getCurrentBreakpoint() == "640"){
        dropdownFlex = this.view.flxMobileDropdownValues;
        dropdownSegment = this.view.segMobilePages;
      }
      else{
        dropdownFlex = this.view.flxDropdownValues;
        dropdownSegment = this.view.segPages;
      }
      if(dropdownFlex.isVisible){
        dropdownFlex.isVisible = false;
        dropdownSegment.isVisible = false;
        this.view.imgDropdownIcon.src = this.Icons.dropdownExpandSkin;
      }
    },

    /*
     * Component onNextClick
     * updates the pagination and records on next click.
     */
    onNextClick : function(){
      var scope = this;
      try
      {
        if(this.view.imgPaginationNext.src !== this.Icons.nextInActiveSkin){
          this.updatePaginationLimitsForNextData();


          if(!kony.sdk.isNullOrUndefined(this.fetchPaginatedRecords)){
            this.fetchPaginatedRecords(startIndex - 1,currentPageSize);
          }
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in updating pagination and records per page",
              "errorLevel" : "Business",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /*
     * Component onFirstClick
     * updates the pagination and records initially.
     */
    onFirstClick: function(){
      var scope = this;
      try
      {
        if(this.view.imgPaginationFirst.src !== this.Icons.firstInActiveSkin){
          this.resetStartIndex();
          if(!kony.sdk.isNullOrUndefined(this.fetchPaginatedRecords)){
            this.fetchPaginatedRecords(startIndex - 1,currentPageSize);
          }
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in updating pagination and records per page",
              "errorLevel" : "Business",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /*
     * Component onLastClick
     * updates the pagination and records on the last click.
     */
    onLastClick: function(){
      var scope = this;
      try
      {
        if(this.view.imgPaginationLast.src !== this.Icons.lastInActiveSkin){
          this.calculateStartIndexFromLast();
          currentPage = totalPages;
          if(!kony.sdk.isNullOrUndefined(this.fetchPaginatedRecords)){
            this.fetchPaginatedRecords(startIndex - 1,currentPageSize);
          }
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in updating pagination and records per page",
              "errorLevel" : "Business",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /*
     * Component calculateStartIndexFromLast
     * Calculates the start index value using the total pages and current pagesize. 
     */
    calculateStartIndexFromLast: function(){
      startIndex = (totalPages - 1) * currentPageSize + 1;
    },

    /*
     * Component onPreviousClick
     * updates the pagination and records on the click of previous button 
     */
    onPreviousClick : function(){
      var scope = this;
      try
      {
        if(this.view.imgPaginationPrevious.src !== this.Icons.prevInActiveSkin){
          this.updatePaginationLimitsForPreviousData();
          if(!kony.sdk.isNullOrUndefined(this.fetchPaginatedRecords)){
            this.fetchPaginatedRecords(startIndex - 1,currentPageSize);
          }
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in updating pagination and records per page",
              "errorLevel" : "Business",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /*
     * Component setIntervalText
     * sets the interval text of pagination bar
     */
    setIntervalText: function(){
      var self =this;
      try
      {
        tokens = {
          "currentPage" : currentPage,
          "totalPages": totalPages,
          "currentPageSize": currentPageSize,
          "totalRecords": totalRecordsCount,
          "startIndex": startIndex,
          "endIndex": endIndex
        };
        this.parserUtilsManager.setTokens(tokens);
        var paginationText = this.getParsedValue(this._paginationText, kony.application.getCurrentBreakpoint());
        this.view.lblPagination.text = this.getParsedValue(paginationText);
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the interval text of pagination bar",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },

    /*
     * Component initActions
     * Reponsible to initialize actions of the component
     */
    initActions: function(){
      var scope = this;
      try
      {
        this.view.flxDropdown.onKeyPress=scope.setFocusBack;
        this.view.flxDropdown.onClick = scope.toggleSegmentVisibility;
        this.view.flxPaginationNext.onClick = scope.onNextClick;
        this.view.flxPaginationPrevious.onClick = scope.onPreviousClick;
        this.view.flxPaginationFirst.onClick = scope.onFirstClick;
        this.view.flxPaginationLast.onClick = scope.onLastClick;														
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the actions to columns.",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    setFocusBack: function(eventObject,eventPayload) { 
      if(eventPayload.keyCode==9 && eventPayload.shiftKey)
      {
        var scope=this;
        scope.closePageSelection();
      }
    },
    /*
     * Component onBreakPointChange
     * Set UI based on breakpoint
     */
    onBreakPointChange: function() { 
      this.setSkins();
      this.setDropDownSelectedKey();
      this.setComponentText();	  
      this.setDropdownHeight();
      this.setVisibilityBasedOnContracts();
    },

    /*
     * Component toggleSegmentVisibility
     * Set the visiblity of flxDropdownValues and segPages.
     */
    toggleSegmentVisibility: function() {
      var self = this;
      try{
        var dropdownFlex,dropdownSegment;
        if(kony.application.getCurrentBreakpoint() == "640"){
          dropdownFlex=this.view.flxMobileDropdownValues;
          dropdownSegment=this.view.segMobilePages;
        }
        else{
          dropdownFlex=this.view.flxDropdownValues;
          dropdownSegment=this.view.segPages;
        }
        if(dropdownFlex.isVisible){
          dropdownFlex.isVisible = false;
          dropdownSegment.isVisible = false;
          this.view.imgDropdownIcon.src=this.Icons.dropdownExpandSkin;
        }
        else{
          dropdownFlex.isVisible = true;
          dropdownSegment.isVisible = true;
          this.view.imgDropdownIcon.src = this.Icons.dropdownCollapseSkin;
        }         
        if(dropdownFlex.isVisible === true) {
          this.view.flxDropdown.accessibilityConfig = {
            "a11yLabel" : "Currently viewing"+ this.view.lblDropdownSelectedValue.text+" . Choose number of transactions displayed",
            "a11yARIA" : {
              "role": "button",
              "aria-expanded": true,
              "aria-live": "off"
            }
          }
        } else {
          this.view.flxDropdown.accessibilityConfig = {
            "a11yLabel" : "Currently viewing"+ this.view.lblDropdownSelectedValue.text+" . Choose number of transactions displayed",
            "a11yARIA" : {
              "role": "button",
              "aria-expanded" : false
            }
          }
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the dropdownFlex visibility",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },

    /*
     * Component pageSelection
     * event on click of dropdown calculate pagination bar values and bubbles to the parent event
     */
    pageSelection: function(widgetInfo, segInfo) {
      var scope = this;
      try{
        var dropdownFlex,dropdownSegment;
        if(kony.application.getCurrentBreakpoint() == "640"){
          dropdownFlex=this.view.flxMobileDropdownValues;
          dropdownSegment=this.view.segMobilePages;
        }
        else{
          dropdownFlex=this.view.flxDropdownValues;
          dropdownSegment=this.view.segPages;
        }
        this.view.imgDropdownIcon.src=this.Icons.dropdownExpandSkin;
        this.view.lblDropdownSelectedValue.text = dropdownSegment.data[segInfo.rowIndex]["pageCount"]["text"];
        currentPageSize = (parseInt)(dropdownSegment.data[segInfo.rowIndex]["key"]);
        currentPage = 1;				   
        this.reCalculatePages();
        this.resetStartIndex();
        dropdownFlex.isVisible = false;
        dropdownSegment.isVisible = false;
        if(!kony.sdk.isNullOrUndefined(this.fetchPaginatedRecords)){
          this.fetchPaginatedRecords(startIndex - 1,currentPageSize);
          this.view.flxDropdown.setActive(true);
        }
        this.view.flxDropdown.accessibilityConfig = {
          "a11yLabel": "Currently viewing"+ this.view.lblDropdownSelectedValue.text+" . Choose number of transactions displayed",
          "a11yARIA": {
            "aria-live": "polite",
              "role": "button",
              "aria-expanded": false
          }
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the dropdown values and segment data",
              "errorLevel" : "Configuration",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /*
     * Component reCalculatePages
     * calls the setPagesCount function
     */
    reCalculatePages: function(){
      this.setPagesCount();
    },

    /*
     * Component resetStartIndex
     * sets the startIndex and currentPage to 1.
     */
    resetStartIndex: function(){
      startIndex = 1;
      currentPage = 1;
    },

    /*
     * Component calculateEndIndex
     * Identifies the end index based on the recordsLength
     * @param : recordsLength{integer} - Pagination record length
     */
    calculateEndIndex: function(recordsLength){
      if(recordsLength){
        endIndex = startIndex + recordsLength - 1;  
      }
      else{
        endIndex = startIndex + currentPageSize -1 > totalRecordsCount ? totalRecordsCount : startIndex + currentPageSize -1;
      }
    },

    /*
     * Component setDropDownSelectedKey
     * Responsible to set the selectedKey to the Dropdown segment and selected value text
     */
    setDropDownSelectedKey: function(){
      var self =this;
      try
      {
        var dropdownSegment;
        if(kony.application.getCurrentBreakpoint() == "640"){
          dropdownSegment=this.view.segMobilePages;
        }
        else{
          dropdownSegment=this.view.segPages;
        }
        dropdownSegment.widgetDataMap = this.getWidgetDataMap();
        var data = this.prepareSegmentData();
        var i = 0;
        for(;i<data.length;i++){
          if((parseInt)(data[i]["key"]) === currentPageSize)
            break;
        }
        this.view.lblDropdownSelectedValue.text = data[i]["pageCount"]["text"];
        dropdownSegment.setData(data);
        this.view.flxDropdown.accessibilityConfig = {
          "a11yLabel" :"Currently viewing"+ this.view.lblDropdownSelectedValue.text+" . Choose number of transactions displayed",
          "a11yARIA" : {
            "role": "button",
            "aria-expanded" : false
          }
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in updating the segment data",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },

    /*
     * Component prepareSegmentData
     * Responsible to prepare and return the processed data.
     * @return : segmentData {Array} 
     */
    prepareSegmentData: function(){
      var segmentData = [];
      var scope = this;
      try{
        var segmentContractArray = [];
        try{
          segmentContractArray = JSON.parse(this._recordsPerPageList);
        }
        catch(e){
          segmentContractArray = this._recordsPerPageList;
        }
        segmentContractArray.forEach(function(object){
          for(var key in object){
            object["pageCount"]={};
            object["pageCount"]["text"] = object[key];
            object["pageCount"]["skin"] = scope.getDropdownLabelSkin();
            object["pageCount"]["onClick"] = scope.pageSelection;
            object["pageCount"]["onKeyPress"] = scope.onKeyPressPageCount;
            object["key"] = key;

          } 
          segmentData.push(object);
        });
      }
      catch(e){
        {
          var errorObj =
              {
                "errorInfo" : "Error in setting the segment data",
                "errorLevel" : "Business",
                "error": e
              };
          scope.onError(errorObj);
        }
      }
      return segmentData;
    },

    onKeyPressPageCount: function(eventobject, eventPayload, context) {
      var scopeObj = this;
      if (eventPayload.keyCode === 9 && !eventPayload.shiftKey&& context.sectionIndex === 0 && context.rowIndex === context.widgetInfo.data.length - 1) {
          eventPayload.preventDefault();
          scopeObj.closePageSelection();
          if (scopeObj.view.imgPaginationPrevious.src == this.Icons.prevActiveSkin || scopeObj.view.imgPaginationFirst.src == this.Icons.firstActiveSkin) {
              eventPayload.preventDefault();
              scopeObj.view.flxPaginationPrevious.setActive(true);
              scopeObj.view.flxPaginationFirst.setActive(true);
          }
          if (scopeObj.view.imgPaginationNext.src == this.Icons.nextActiveSkin || scopeObj.view.imgPaginationLast.src == this.Icons.lastActiveSkin) {
              eventPayload.preventDefault();
              scopeObj.view.flxPaginationLast.setActive(true);
              scopeObj.view.flxPaginationNext.setActive(true);
          }
           eventPayload.preventDefault();
             scopeObj.view.flxDropdown.setActive(true);
    }
      if (eventPayload.shiftKey && eventPayload.keyCode === 9) {
          if (context.sectionIndex === 0) {
              if(context.rowIndex === 0 ){
              eventPayload.preventDefault();
              scopeObj.closePageSelection();
              scopeObj.view.flxDropdown.setActive(true);
          }
          if(context.rowIndex > 0 ){
              eventPayload.preventDefault();
              //scopeObj.closePageSelection();
              context.widgetInfo.rowTemplate="flxPages";
              context.widgetInfo.setActive(context.rowIndex-1,0,"flxPages.btnPageCount");
          }
      }
      }
      if (eventPayload.keyCode === 27) {
          eventPayload.preventDefault();
          scopeObj.closePageSelection();
          scopeObj.view.flxDropdown.setActive(true);
      }
  },

    closePageSelection: function () {
      var dropdownFlex, dropdownSegment;
      if (kony.application.getCurrentBreakpoint() == "640") {
        dropdownFlex = this.view.flxMobileDropdownValues;
        dropdownSegment = this.view.segMobilePages;
      }
      else {
        dropdownFlex = this.view.flxDropdownValues;
        dropdownSegment = this.view.segPages;
      }
      dropdownFlex.isVisible = false;
      dropdownSegment.isVisible = false;
      this.view.imgDropdownIcon.src = this.Icons.dropdownExpandSkin;
      this.view.flxDropdown.accessibilityConfig = {
        "a11yLabel": "Currently viewing"+ this.view.lblDropdownSelectedValue.text+" . Choose number of transactions displayed",
        "a11yARIA": {
          "role": "button",
          "aria-expanded": false
        }
      }
    },

    /*
     * Component getWidgetDataMap
     * defines the data mapping values and key
     * returns the widgetDataMap
     */
    getWidgetDataMap: function() {
      var widgetDataMap = {
        "btnPageCount" : "pageCount",
        "selectedKey" : "key",
        "flxPages" :"flxPages"
      };
      return widgetDataMap;
    },

    /*
     * Component setDropdownHeight
     * sets the height of the dropdown flex with respective to breakpoint and length
     */
    setDropdownHeight: function(){
      var dropdownFlex,dropdownSegment;
      var self =this;
      try{
        if(kony.application.getCurrentBreakpoint() == "640"){
          dropdownFlex=this.view.flxMobileDropdownValues;
          dropdownSegment = this.view.segMobilePages.data;
        }
        else{
          dropdownFlex = this.view.flxDropdownValues;
          dropdownSegment = this.view.segPages.data;
        }
        if(dropdownSegment.length < 5){
          dropdownFlex.height=(dropdownSegment.length * 29 ) + 2;
        }  
      }

      catch(e){
        {
          var errorObj =
              {
                "errorInfo" : "Error in updating the height based on the breakpoint",
                "errorLevel" : "Business",
                "error": e
              };
          self.onError(errorObj);
        }
      }
    },

    /*
     * Component setSkins
     * sets the skin for labels
     */
    setSkins: function(){
      var self = this;
      try
      {
        this.view.lblPagination.skin=this.getParsedValue(this._sknPaginationText,kony.application.getCurrentBreakpoint());
        this.view.lblPickList.skin=this.getParsedValue(this._sknRecordsPerPageLabel,kony.application.getCurrentBreakpoint());
        this.view.lblDropdownSelectedValue.skin=this.getParsedValue(this._sknRecordsPerPageSelected,kony.application.getCurrentBreakpoint());
      }
      catch(e){
        var errorObj =
            {
              "errorInfo" : "Error in setting the skins",
              "errorLevel" : "Configuration",
              "error": e
            };
        self.onError(errorObj);
      }
    },

    /*
     * Component getDropdownLabelSkin
     * Returns the dropdown skin - sknRecordsPerPageListItems
     */
    getDropdownLabelSkin : function(){
      return this.getParsedValue(this._sknRecordsPerPageListItems,kony.application.getCurrentBreakpoint());
    } ,

    /*
     * Component getDefaultOffsetAndLimit
     * Returns the default offset and limit of the component.
     */
    getDefaultOffsetAndLimit : function(){
      return {"offset": startIndex - 1,
              "limit": parseInt(this._recordsPerPage)
             }
    },

    /**
      * sets the accessibility for widgets
      */
    setAccessibility: function() {
      this.view.flxPaginationLast.accessibilityConfig = {
        "a11yLabel": "Last page",
        "a11yARIA": {
          "role": "button"
        }
      },
        this.view.imgPaginationLast.accessibilityConfig = {
        "a11yARIA": {
        }
      },
        this.view.flxPaginationNext.accessibilityConfig = {
        "a11yLabel": "Next page",
        "a11yARIA" : {
          "role" : "button"
        }
      },
        this.view.imgPaginationNext.accessibilityConfig = {
        "a11yARIA": {
        }
      }
      this.view.flxPaginationPrevious.accessibilityConfig = {
        "a11yLabel": "Previous page",
        "a11yARIA": {
          "role": "button"
        }
      },
        this.view.imgPaginationPrevious.accessibilityConfig = {
        "a11yARIA": {
        }
      },
        this.view.flxPaginationFirst.accessibilityConfig = {
        "a11yLabel": "First page",
        "a11yARIA": {
          "role": "button"
        }
      },
        this.view.imgPaginationFirst.accessibilityConfig = {
        "a11yARIA": {
        }
      },
        this.view.flxDropdown.accessibilityConfig = {
        "a11yLabel" : "Currently viewing"+ this.view.lblDropdownSelectedValue.text+" . Choose number of transactions displayed",
        "a11yARIA" : {
          "role": "button",
          "aria-expanded" : false
        }
      },
        this.view.lblDropdownSelectedValue.accessibilityConfig = {
        "a11yHidden": true,
        "a11yARIA": {
          "tabindex": -1
        }
      },
        this.view.lblPickList.accessibilityConfig = {
        "a11yHidden" : true,
        "a11yARIA" : {
          "role": "span",
          "tabindex": -1
        }
      }
    }    
  };
});