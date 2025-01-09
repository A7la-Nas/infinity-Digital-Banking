define(['./countryCodeControllerIC','./AddPayeeDAO','./AddPayeeUtility'],function(countryCodeControllerIC,AddPayeeDAO,AddPayeeUtility) {

	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
          
          this.countryCodeControllerIC = new countryCodeControllerIC();
          this.ParserUtilsManager;
          this.AddPayeeDAO = new AddPayeeDAO();
          this.AddPayeeUtility = new AddPayeeUtility();
          
          //declaration for Search Icon in the group:Search
          this._imgSearchIcon="";
          
          //declaration for Label field Icon in the group:Search
          this._imgLabelFieldIcon = "";

          //declaration for BillerSearch Object Service in the group:Search Service
          this._billerSearchObjectService="";

          //declaration for Search Enabled in the group:General
          this._isSearchEnabled="";
          
          //declaration for Label Field 1 in the group:Search
          this._lblField1="";

          //declaration for Label Field 2 in the group:Manual Addition
          this._lblField2="";

          //declaration for Label Field Skin 1 in the group:Skins
          this._sknLblField1="";

          //declaration for Search Input Textbox  in the group:Search
          this._tbxSearch="";
          
          //declaration for Search Input Textbox Mapping in the group:Search
          this._searchJSON="";

          //declaration for Biller Search Context Mapping in the group:Search Service
          this._searchResultIntoContext="";
          
          //declaration for BillerSearch Object in the group:Search Service
          this._billerSearchObject="";

          //declaration for Manual Addition Enabled in the group:General
          this._isManualAdditionEnabled="";

          //declaration for Label Field 3 in the group:Manual Addition
          this._lblField3="";
          
          //declaration for Button Search Clear in the group:Search
          this._btnSearchClear="";
          
          //declaration for Button Search Clear Skin in the group:Skins
          this._sknBtnSearchClear="";

          //declaration for Label Field Focus Skin 1 in the group:Skins
          this._sknLblFocusSkin1="";

          //declaration for BillerSearch Operation in the group:Search Service
          this._billerSearchOperation="";

          //declaration for Label Field Skin 2 in the group:Skins
          this._sknLblField2="";

          //declaration for BillerSearch Criteria in the group:Search Service
          this._billerSearchCriteria="";

          //declaration for Label Field Focus Skin 2 in the group:Skins
          this._sknLblFocusSkin2="";

          //declaration for BillerSearch Identifier in the group:Search Service
          this._billerSearchIdentifier="";

          //declaration for Label Field Skin 3 in the group:Skins
          this._sknLblField3="";

          //declaration for Label Field Focus Skin 3 in the group:Skins
          this._sknLblFocusSkin3="";

          //declaration for Search Input Textbox Skin in the group:Skins
          this._skntbxSearchInput="";

          //declaration for Search Conatiner Skin in the group:Skins
          this._skntbxSearch="";
          
          //declaration for Navigation to form in the group:General
          this._navigateToForm="";
                   
          //declaration for Navigation from country code in the group:General
          this._navigateFromCountryCode = "";
          
          //declaration for NavigateToManualFlow in the group:General
          this._navigateToManualFlow = "";
          
          this._context="";
          
          this.componentContext = {};

    },
    
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {

      //setter method for Search Icon in the group:Search
      defineSetter(this, "imgSearchIcon", function(val) {
        if((typeof val=='string') && (val != "")){
          this._imgSearchIcon=val;
        }
      });

      //getter method for Search Icon in the group:Search
      defineGetter(this, "imgSearchIcon", function() {
        return this._imgSearchIcon;
      });
          
      //setter method for Label field Icon in the group:Search
      defineSetter(this, "imgLabelFieldIcon", function(val) {
        if((typeof val=='string') && (val != "")){
          this._imgLabelFieldIcon=val;
        }
      });

      //getter method for Label field Icon in the group:Search
      defineGetter(this, "imgLabelFieldIcon", function() {
        return this._imgLabelFieldIcon;
      });
      
      //setter method for BillerSearch Object Service in the group:Search Service
      defineSetter(this, "billerSearchObjectService", function(val) {
        if((typeof val=='string') && (val != "")){
          this._billerSearchObjectService=val;
        }
      });

      //getter method for BillerSearch Object Service in the group:Search Service
      defineGetter(this, "billerSearchObjectService", function() {
        return this._billerSearchObjectService;
      });

      //setter method for Search Enabled in the group:General
      defineSetter(this, "isSearchEnabled", function(val) {
        if((typeof val=='boolean') && (val != "")){
          this._isSearchEnabled=val;
        }
      });

      //getter method for Search Enabled in the group:General
      defineGetter(this, "isSearchEnabled", function() {
        return this._isSearchEnabled;
      });
          
          //setter method for Label Field 2 in the group:Manual Addition
      defineSetter(this, "lblField1", function(val) {
        if((typeof val=='string') && (val != "")){
          this._lblField1=val;
        }
      });

      //getter method for Label Field 2 in the group:Manual Addition
      defineGetter(this, "lblField1", function() {
        return this._lblField1;
      });

      //setter method for Label Field 2 in the group:Manual Addition
      defineSetter(this, "lblField2", function(val) {
        if((typeof val=='string') && (val != "")){
          this._lblField2=val;
        }
      });

      //getter method for Label Field 2 in the group:Manual Addition
      defineGetter(this, "lblField2", function() {
        return this._lblField2;
      });

      //setter method for Label Field Skin 1 in the group:Skins
      defineSetter(this, "sknLblField1", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknLblField1=val;
        }
      });

      //getter method for Label Field Skin 1 in the group:Skins
      defineGetter(this, "sknLblField1", function() {
        return this._sknLblField1;
      });

      //setter method for Search Input Textbox  in the group:Search
      defineSetter(this, "tbxSearch", function(val) {
        if((typeof val=='string') && (val != "")){
          this._tbxSearch=val;
        }
      });

      //getter method for Search Input Textbox  in the group:Search
      defineGetter(this, "tbxSearch", function() {
        return this._tbxSearch;
      });

       //setter method for Biller Search Context Mapping in the group:Add Payee Tab1
       defineSetter(this, "searchResultIntoContext", function(val) {
        if((typeof val=='string') && (val != "")){
          this._searchResultIntoContext=val;
        }
      });

      //getter method for Biller Search Context Mapping in the group:Add Payee Tab1
      defineGetter(this, "searchResultIntoContext", function() {
        return this._searchResultIntoContext;
      });

      //setter method for BillerSearch Object in the group:Search Service
      defineSetter(this, "billerSearchObject", function(val) {
        if((typeof val=='string') && (val != "")){
          this._billerSearchObject=val;
        }
      });

      //getter method for BillerSearch Object in the group:Search Service
      defineGetter(this, "billerSearchObject", function() {
        return this._billerSearchObject;
      });

      //setter method for Manual Addition Enabled in the group:General
      defineSetter(this, "isManualAdditionEnabled", function(val) {
        if((typeof val=='boolean') && (val != "")){
          this._isManualAdditionEnabled=val;
        }
      });

      //getter method for Manual Addition Enabled in the group:General
      defineGetter(this, "isManualAdditionEnabled", function() {
        return this._isManualAdditionEnabled;
      });
          
      //setter method for Manual Addition Enabled in the group:General
      defineSetter(this, "navigateToForm", function(val) {
        if((typeof val=='string') && (val != "")){
          this._navigateToForm=val;
        }
      });

      //getter method for Manual Addition Enabled in the group:General
      defineGetter(this, "navigateToForm", function() {
        return this._navigateToForm;
      });
          
          //setter method for Manual Addition Enabled in the group:General
      defineSetter(this, "navigateFromCountryCode", function(val) {
        if((typeof val=='string') && (val != "")){
          this._navigateFromCountryCode=val;
        }
      });

      //getter method for Manual Addition Enabled in the group:General
      defineGetter(this, "navigateFromCountryCode", function() {
        return this._navigateFromCountryCode;
      });
          
      //setter method for Manual Addition Enabled in the group:General
      defineSetter(this, "navigateToManualFlow", function(val) {
        if((typeof val=='string') && (val != "")){
          this._navigateToManualFlow=val;
        }
      });

      //getter method for Manual Addition Enabled in the group:General
      defineGetter(this, "navigateToManualFlow", function() {
        return this._navigateToManualFlow;
      });
          
      //setter method for Label Field 3 in the group:Manual Addition
      defineSetter(this, "lblField3", function(val) {
        if((typeof val=='string') && (val != "")){
          this._lblField3=val;
        }
      });

      //getter method for Label Field 3 in the group:Manual Addition
      defineGetter(this, "lblField3", function() {
        return this._lblField3;
      });
          
      //setter method for Button Search Clear in the group:Search
      defineSetter(this, "btnSearchClear", function(val) {
        if((typeof val=='string') && (val != "")){
          this._btnSearchClear=val;
        }
      });

      //getter method for Button Search Clear in the group:Search
      defineGetter(this, "btnSearchClear", function() {
        return this._btnSearchClear;
      });

      //setter method for Label Field Focus Skin 1 in the group:Skins
      defineSetter(this, "sknLblFocusSkin1", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknLblFocusSkin1=val;
        }
      });

      //getter method for Label Field Focus Skin 1 in the group:Skins
      defineGetter(this, "sknLblFocusSkin1", function() {
        return this._sknLblFocusSkin1;
      });
          
          //setter method for Button Search Clear Skin in the group:Skins
      defineSetter(this, "sknBtnSearchClear", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknBtnSearchClear=val;
        }
      });

      //getter method for Button Search Clear Skin in the group:Skins
      defineGetter(this, "sknBtnSearchClear", function() {
        return this._sknBtnSearchClear;
      });

      //setter method for BillerSearch Operation in the group:Search Service
      defineSetter(this, "billerSearchOperation", function(val) {
        if((typeof val=='string') && (val != "")){
          this._billerSearchOperation=val;
        }
      });

      //getter method for BillerSearch Operation in the group:Search Service
      defineGetter(this, "billerSearchOperation", function() {
        return this._billerSearchOperation;
      });

      //setter method for Label Field Skin 2 in the group:Skins
      defineSetter(this, "sknLblField2", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknLblField2=val;
        }
      });

      //getter method for Label Field Skin 2 in the group:Skins
      defineGetter(this, "sknLblField2", function() {
        return this._sknLblField2;
      });

      //setter method for BillerSearch Criteria in the group:Search Service
      defineSetter(this, "billerSearchCriteria", function(val) {
        if((typeof val=='string') && (val != "")){
          this._billerSearchCriteria=val;
        }
      });

      //getter method for BillerSearch Criteria in the group:Search Service
      defineGetter(this, "billerSearchCriteria", function() {
        return this._billerSearchCriteria;
      });

      //setter method for Label Field Focus Skin 2 in the group:Skins
      defineSetter(this, "sknLblFocusSkin2", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknLblFocusSkin2=val;
        }
      });

      //getter method for Label Field Focus Skin 2 in the group:Skins
      defineGetter(this, "sknLblFocusSkin2", function() {
        return this._sknLblFocusSkin2;
      });

      //setter method for BillerSearch Identifier in the group:Search Service
      defineSetter(this, "billerSearchIdentifier", function(val) {
        if((typeof val=='string') && (val != "")){
          this._billerSearchIdentifier=val;
        }
      });

      //getter method for BillerSearch Identifier in the group:Search Service
      defineGetter(this, "billerSearchIdentifier", function() {
        return this._billerSearchIdentifier;
      });

      //setter method for Label Field Skin 3 in the group:Skins
      defineSetter(this, "sknLblField3", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknLblField3=val;
        }
      });

      //getter method for Label Field Skin 3 in the group:Skins
      defineGetter(this, "sknLblField3", function() {
        return this._sknLblField3;
      });

      //setter method for Label Field Focus Skin 3 in the group:Skins
      defineSetter(this, "sknLblFocusSkin3", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknLblFocusSkin3=val;
        }
      });

      //getter method for Label Field Focus Skin 3 in the group:Skins
      defineGetter(this, "sknLblFocusSkin3", function() {
        return this._sknLblFocusSkin3;
      });

      //setter method for Search Input Textbox Skin in the group:Skins
      defineSetter(this, "skntbxSearchInput", function(val) {
        if((typeof val=='string') && (val != "")){
          this._skntbxSearchInput=val;
        }
      });

      //getter method for Search Input Textbox Skin in the group:Skins
      defineGetter(this, "skntbxSearchInput", function() {
        return this._skntbxSearchInput;
      });

      //setter method for Search Conatiner Skin in the group:Skins
      defineSetter(this, "skntbxSearch", function(val) {
        if((typeof val=='string') && (val != "")){
          this._skntbxSearch=val;
        }
      });

      //getter method for Search Conatiner Skin in the group:Skins
      defineGetter(this, "skntbxSearch", function() {
        return this._skntbxSearch;
      });

		},
      preShow : function(){
        var scope = this;
        this.setDataList();
        this.view.segCodeNoList.onRowClick = this.setScrolling.bind(scope);
        this.view.segCodeNameList.onRowClick =  this.getContextFromSegment.bind(scope);
        this.initActions();
        this.setUIElementsVisibilityBasedOnContracts();
      },
      setUIElementsVisibilityBasedOnContracts: function(){
        if(this._lblField1 !== null &&  this._lblField1!== undefined && this._lblField1 !== ""){
          this.view.lblField1.isVisible = true;
          this.view.lblField1.text = this.AddPayeeUtility.geti18nText(this._lblField1);
        }
        else{
           this.view.lblField1.isVisible = false;
          this.view.lblField1.text = "";
        }
        if(this._lblField2 !== null &&  this._lblField2!== undefined && this._lblField2 !== ""){
          this.view.lblField2.isVisible = true;
          this.view.lblField2.text = this.AddPayeeUtility.geti18nText(this._lblField2);
        }
        if(this._lblField3 !== null &&  this._lblField3!== undefined && this._lblField3 !== ""){
          this.view.lblField3.isVisible = true;
          this.view.lblField3.text = this.AddPayeeUtility.geti18nText(this._lblField3);
        }
      },
      getContextFromSegment: function(){
        var scope = this;
        let rowindex = Math.floor(scope.view.segCodeNameList.selectedRowIndex[1]);
        let segData = scope.view.segCodeNameList.data[rowindex];
        var countryCode = segData['code'];
        this.componentContext['countryCode'] = countryCode;
        this.ParserUtilsManager.setContext(this.componentContext);
        this.actionHandler.call(this,this.ParserUtilsManager.context,this._navigateFromCountryCode);
      },
        
        onManuallyAddedAction: function(){
         this.ParserUtilsManager.context.isSearchFlow = false;
         this.actionHandler.call(this,this.ParserUtilsManager.context,this._navigateToManualFlow); 
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
      
      /**
      * setParentScope.
      * This Method is exposed to the form to pass the Form Scope.
      */
    setParentScope: function(scope){
      this._parentScope = scope;
    },
      clearContext:function(){
         this.ParserUtilsManager.clearContext();
      },
      setContext: function(context, scope) {
         if(context){
   //     if(!this.ParserUtilsManager){
        this.ParserUtilsManager = context['pManager'];
   //     }
       if(context['pManager']){
        delete context['pManager'];
      }
        this._context = context;
        if(this._context.hasOwnProperty('entitlement')){
          this.entitlementContext.features  = this.context.entitlement.features;
          this.entitlementContext.permissions = this.context.entitlement.permissions;
        }
        this.setParentScope(scope);
        this.ParserUtilsManager.setContext(context);
         }
      },
            
      setSkins : function(){
        if(!this.isEmptyNullUndefined(this._sknLblField1)){
          this.view.lblField1.skin = this.getValue(this._sknLblField1);
        }
        if(!this.isEmptyNullUndefined(this._sknLblFocusSkin1)){
          this.view.lblField1.focusSkin = this.getValue(this._sknLblFocusSkin1);
        }
        if(!this.isEmptyNullUndefined(this._sknLblField2)){
          this.view.lblField2.skin = this.getValue(this._sknLblField2);
        }
        if(!this.isEmptyNullUndefined(this._sknLblFocusSkin2)){
          this.view.lblField2.focusSkin = this.getValue(this._sknLblFocusSkin2);
        }
        if(!this.isEmptyNullUndefined(this._sknLblField3)){
          this.view.lblField3.skin = this.getValue(this._sknLblField3);
        }
        if(!this.isEmptyNullUndefined(this._sknLblFocusSkin3)){
          this.view.lblField3.focusSkin = this.getValue(this._sknLblFocusSkin3);
        }
        if(!this.isEmptyNullUndefined(this._sknBtnSearchClear)){
          this.view.btnSearchClear.skin = this.getValue(this._sknBtnSearchClear);
        }
        if(!this.isEmptyNullUndefined(this._skntbxSearchInput)){
          this.view.tbxSearch.skin = this.getValue(this._skntbxSearchInput);
        }
        if(!this.isEmptyNullUndefined(this._skntbxSearch)){
          this.view.flxSearch.skin = this.getValue(this._skntbxSearch);
        }
        
      },
      
      getValue: function(value){
      try {
        var valueJson = JSON.parse(value);      
        value = valueJson;     
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
      
      initActions : function(){
        this.onSearchClear();
        this.setSkins();
        if(!this.isEmptyNullUndefined(this._imgLabelFieldIcon)){
          this.view.imgIcon.src = this._imgLabelFieldIcon;
          this.view.imgIcon.isVisible = true;
        }
        else{
          this.view.imgIcon.isVisible = false;
        }
        if(!this.isEmptyNullUndefined(this._tbxSearch)){
          var searchVar = JSON.parse(this._tbxSearch);
          if(searchVar.hasOwnProperty('placeHolder')){
            this.view.tbxSearch.placeholder = this.AddPayeeUtility.geti18nText(searchVar.placeHolder);
          }
        }
        if(this._context["countryLookUp"] === true){
          this.view.tbxSearch.onTextChange = this.onSearchLocally.bind(this);
        }
        else{
          this.view.tbxSearch.onTextChange = this.onSearch.bind(this);
        }
        if(!this.isEmptyNullUndefined(this._btnSearchClear)){
          var btnSearchClearJSON = JSON.parse(this._btnSearchClear);
          this.populateButtonText(btnSearchClearJSON,"btnSearchClear");
          this.view.btnSearchClear.onClick = this.navigateToDesiredFunction.bind(this,this.ParserUtilsManager.context, this._btnSearchClear);
        }
        else{
          this.view.btnSearchClear.isVisible = false;
        }
        this.view.lblField3.onTouchEnd = this.onManuallyAddedAction.bind(this);
        if(!this.isEmptyNullUndefined(this._isManualAdditionEnabled)){
          this.view.flxBottomWrapper.setVisibility(true);
          this.view.flxMainContainer.bottom = '80dp';
        }
        else{
          this.view.flxMainContainer.bottom = '0dp';
          this.view.flxBottomWrapper.setVisibility(false);
        }
        if(!this.isEmptyNullUndefined(this._isSearchEnabled)){
          this.view.flxSearch.setVisibility(true);
          //this.view.flx2.setVisibility(true);
          this.view.segCodeNoList.setVisibility(false);
        }
        else{
          this.view.flxSearch.setVisibility(false);
          this.view.flx2.setVisibility(false);
          this.view.flxBottomWrapper.setVisibility(true);
        }
        if(this._context["countryLookUp"] === true){
          this.view.flx2.setVisibility(false);
          this.view.flx3.setVisibility(true);
          this.view.segCodeNoList.setVisibility(true);
          this.view.flxMainContainer.bottom = '0dp';
          this.view.flxBottomWrapper.setVisibility(false);   
        }
        else
          {
            this.view.flx3.setVisibility(false);
          }
        
        if(!this.isEmptyNullUndefined(this._imgSearchIcon)){
          this.view.imgSearchIcon.setVisibility(true);
        }
        else{
          this.view.imgSearchIcon.setVisibility(false);
        }
        
      },
      
      populateButtonText(param,widget){
      if(param !== null && param !== undefined && param !== ""){
        var text = this.AddPayeeUtility.geti18nText(param.text);
        this.view[widget].text = text;
      }
    },

      /**
      * onSearchTextChange
      * This method is responsible for changing the visibility of clear icon
      */
     onSearchTextChange: function(){
      var searchText = this.view.tbxSearch.text;
      if(searchText === ""){
        this.onSearchClear();
        //this.view.flxClearBtn.setVisibility(false);
      }else{
        //this.view.flxClearBtn.setVisibility(true);
      }
    },

    /**
      * onSearchClear.
      * This method is responsible to clear the search results from the segment.
      */
     onSearchClear: function() {
      this.view.tbxSearch.text = "";
       this.view.tbxSearch.right = "20dp";
        this.view.btnSearchClear.isVisible = false;
      if(this._context["countryLookUp"] === true){     
        this.view.segCodeNoList.isVisible = true;
        this.setDataList();
      }
      else{
        this.view.flx2.isVisible = false;
        this.view.flx1.isVisible = true;
        this.view.flxBottomWrapper.isVisible = true;
        this.view.flxMainContainer.bottom = "80dp";
      }
      this.view.forceLayout();
    },

      /**
     * @api : getCriteria
     * Parse the criteria based on accountType.
     * @param : criteria {string} - value collected from exposed contract
     * @return : {JSONObject} - jsonvalue for criteria
     */
    getCriteria: function(criteria) {
      var criteriaJSON = {};
      try{
        criteriaJSON = JSON.parse(criteria);
      }
      catch(e){
        criteriaJSON = criteria;
        kony.print(e);
      }      
      for(var key in  criteriaJSON){
        if(typeof(criteriaJSON[key]) === "string" )
          criteriaJSON[key] = this.ParserUtilsManager.getParsedValue(criteriaJSON[key]);
        else
          criteriaJSON[key] = criteriaJSON[key];
      }
      return criteriaJSON;
    },
      
      
      onSearchLocally : function(){
        var scope = this;
        var tempCountryList = new countryCodeControllerIC();
        if(this.view.tbxSearch.text === ""){
          this.onSearchTextChange();
          return;
        }
        else{
           kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {});
          if(!this.isEmptyNullUndefined(this._btnSearchClear)){
            this.view.tbxSearch.right = "81dp";
            this.view.btnSearchClear.isVisible = true;
          }
          this.view.segCodeNoList.setVisibility(false);
          //County Code - denotes Codes
          var sectionDataCountryCode = [];
          var recordCountryCode = {};
          var searchString = this.view.tbxSearch.text;
          searchString = searchString.toLowerCase();
          for(var i=0;i<tempCountryList.countryCodeList.countries.length;i++){
            tempCountryList.countryCodeList.countries[i].name = tempCountryList.countryCodeList.countries[i].name.toLowerCase();
          }
          for(var i=0;i<tempCountryList.countryCodeList.countries.length;i++){
            if(!this.isEmptyNullUndefined(searchString)){
              if(tempCountryList.countryCodeList.countries[i].name.includes(searchString) || tempCountryList.countryCodeList.countries[i].code.includes(searchString)){
                recordCountryCode = {"lblCountryCode" : this.countryCodeControllerIC.countryCodeList.countries[i].name + " ("+this.countryCodeControllerIC.countryCodeList.countries[i].code+")",code : this.countryCodeControllerIC.countryCodeList.countries[i].code};
                sectionDataCountryCode.push(recordCountryCode);
              }
            } 
          }
          if(sectionDataCountryCode.length>0){
            //this.view.segCodeNameList.removeAll();
            //this.view.segCodeNameList.widgetDataMap = this.getWidgetDataMap();
            this.view.segCodeNameList.setData(sectionDataCountryCode);
          }
          else{
           kony.print("Please enter proper data");
          }
          this.view.forceLayout();
          kony.application.dismissLoadingScreen();

        }

      },

      onSearch: function() {
        if(this.view.tbxSearch.text === ""){
          this.onSearchTextChange();
          return;
        }
        else{
          var scope = this;
           kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {});
          if(!this.isEmptyNullUndefined(this._btnSearchClear)){
            this.view.tbxSearch.right = "81dp";
            this.view.btnSearchClear.isVisible = true;
          }
          this._searchJSON = JSON.parse(this._tbxSearch);
          var searchString = scope.view.tbxSearch.text;
          let billerObjService = this._billerSearchObjectService;
          let billerObj = this._billerSearchObject;
          let billerOperation = this._billerSearchOperation;
          let billerCriteria = this.getCriteria(this._billerSearchCriteria);
          billerCriteria.searchString = searchString;
          let billerIdentifier = this._billerSearchIdentifier;
          this.AddPayeeDAO.fetchBillerList(billerObjService, billerObj, billerOperation, billerCriteria, this.onFetchBillerSuccess, billerIdentifier, this.onFetchBillerError);
        }


      },

      onFetchBillerSuccess: function(response, unicode) {
        if(!this.view.flx2.isVisible){
          this.view.flx2.setVisibility(true);
        }
        this.AddPayeeUtility.readObject(response);
        this.ParserUtilsManager.setResponseData(unicode,this.AddPayeeUtility.map);
        this.setSegFlx2Data(response[this._searchJSON.rootPath]); 
      },

      onFetchBillerError: function() {
        kony.print("search biller service failed");
        kony.application.dismissLoadingScreen();
      }
      ,
      /**
      * used to create the new payee
      *  @param {list} billerList list of billers
      * @returns {object} list of billers
      */
     createNewPayeeModel: function (billerList) {
       var i=0;
       var scope = this;
       var searchContext = JSON.parse(this._searchResultIntoContext);
       return billerList.map(function (biller) {
         var data={};
         for(let key in searchContext){
           data[key] = scope.ParserUtilsManager.getParsedValue(searchContext[key].replace("rootPath",scope._searchJSON.rootPath+'['+(i)+']'));
         }
         var lblNewPayees = data.billerName;
         var selectedCategoryID = data.billerCategoryId;
         i++;
         return {
           "lblPayeeName": lblNewPayees,
           "data":data,
           "selectedCategoryID" : selectedCategoryID
         };
       });
     },
      
      updateDetails : function(){
        var scope = this;
        let rowindex = Math.floor(scope.view.segPayee.selectedRowIndex[1]);
        let billerdata = scope.view.segPayee.data[rowindex];
        if(billerdata.hasOwnProperty("data")){
          if(billerdata.data.hasOwnProperty("billerName")) {
            billerdata.data["companyName"] = billerdata.data["billerName"];
            delete billerdata.data["billerName"];
          }
        }
        scope.updateBillerDetails(billerdata);
      },
      
      updateBillerDetails: function(billerObj) {
      this.ParserUtilsManager.setContext(billerObj.data);
      this.ParserUtilsManager.context.isSearchFlow = true;
      this.navigateToDesiredFunction(this.ParserUtilsManager.context,this._navigateToForm);
      //this.setAdditionalFieldBasedOnCategory(billerObj.selectedCategoryID);
      //this.selCategoryID =billerObj.selectedCategoryID;
      this.view.forceLayout();
    },
      
      navigateToDesiredFunction:function(context, property){
      var self = this;	
      try{
        if(property!==null && property !== undefined){	
          var propertyJSON = JSON.parse(property);	
          var parsedValue=propertyJSON;	        
          if (typeof(parsedValue) !== "string") {	
            parsedValue = parsedValue.hasOwnProperty("action") ? parsedValue["action"] : parsedValue;	
          }	
          var actionJSON = parsedValue;	
          var level = actionJSON.level;  	
          var method = actionJSON.method;
          context['pManager'] = this.ParserUtilsManager;
          this.invokeInstaceAction(level,method,context);
        }	
      }	
      catch(err){	
        var errObj = {	
          "errorInfo" : "Error in actionHandler method of the component.",	
          "error": err	
        };	
        self.onError(errObj);		
      }	
    },
      
      invokeInstaceAction: function(levelInstance, method, context) {     	
      if(levelInstance.toLowerCase().trim() === "form")	
      {  	
        this._parentScope[method](context);	
      }	
      if(levelInstance.toLowerCase().trim() === "component")	
      {	
        this[method](context);	
      } 	
    },	
      
      setSegFlx2Data : function(billersList){
        var scope = this;
        this.view.segPayee.widgetDataMap = this.getWidgetDataMap();
        this.view.segPayee.onRowClick = this.updateDetails.bind(this);
        if(billersList !==null && billersList !== undefined ){
          if (billersList.length > 0) {
            this.view.segPayee.setData(this.createNewPayeeModel(billersList));
            this.view.flx1.isVisible = false;
            this.view.flx2.isVisible = true;
            this.view.forceLayout();
          }
          else {
            this.view.flx2.isVisible = false;
            this.view.flx1.isVisible = true;
            this.view.forceLayout();
          }
        }
        kony.application.dismissLoadingScreen();
      },

      actionHandler: function(context, property) {	
      var self = this;	
      try{
        if(property!==null && property !== undefined){	
          var propertyJSON = JSON.parse(property);	
          var parsedValue=propertyJSON;	        
          if (typeof(parsedValue) !== "string") {	
            parsedValue = parsedValue.hasOwnProperty("action") ? parsedValue["action"] : parsedValue;	
          }	
          var actionJSON = parsedValue;	
          var level = actionJSON.level;  	
          var method = actionJSON.method;	
          context['pManager'] = this.ParserUtilsManager;
          this.invokeInstaceAction(level,method,context);	
        }	
      }	
      catch(err){	
        var errObj = {	
          "errorInfo" : "Error in actionHandler method of the component.",	
          "error": err	
        };	
     //   self.onError(errObj);		
      }	
    },
      
      setDataList : function(){
        this.view.segCodeNameList.widgetDataMap = this.getWidgetDataMap();
        this.view.segCodeNoList.widgetDataMap = this.getWidgetDataMap();

        //County Code - denotes Codes
        var sectionDataCountryCode = [];
        var recordCountryCode = {};
        for(var i=0;i<this.countryCodeControllerIC.countryCodeList.countries.length;i++){
          recordCountryCode = {"lblCountryCode" : this.countryCodeControllerIC.countryCodeList.countries[i].name + " ("+this.countryCodeControllerIC.countryCodeList.countries[i].code+")",code : this.countryCodeControllerIC.countryCodeList.countries[i].code};
          sectionDataCountryCode.push(recordCountryCode);
        }
        this.view.segCodeNameList.setData(sectionDataCountryCode);
        this.view.forceLayout();
        
        //Country Code No - denotes Alphabets (A-Z)
        var sectionDataCountryCodeNo = [];
        var recordCountryCodeNo = {};
        for(var i=0;i<this.countryCodeControllerIC.CountryCode.length;i++){
          recordCountryCodeNo = {"lblCountryCodeNo" : this.countryCodeControllerIC.CountryCode[i]};
          sectionDataCountryCodeNo.push(recordCountryCodeNo);
        }
        this.view.segCodeNoList.setData(sectionDataCountryCodeNo);
      },
      
      setScrolling : function(){
        try{
          var selectedCodeNo = this.view.segCodeNoList.selectedRowItems;
          if(selectedCodeNo !== null){
            var contentOffsetY=0;
            for(var i=0;this.countryCodeControllerIC.countryCodeList.countries[i].name.charAt(0)!==selectedCodeNo[0].lblCountryCodeNo;i++){
              contentOffsetY=contentOffsetY+52;
            }
            this.view.flx3.setContentOffset({x:0,y:contentOffsetY});
          }
        }
        catch(e){
          kony.print(e);
        }
        
      },
      
      getWidgetDataMap : function(){
        return{
          "flxCountryCodeListIC" : "flxCountryCodeListIC",
          "lblCountryCode" : "lblCountryCode",
          "lblCountryCodeNo" : "lblCountryCodeNo",
          "flxCountryCodeNoListIC" : "flxCountryCodeNoListIC",
          "lblPayeeName" : "lblPayeeName",
          "flxPayeeListAutoIC" : "flxPayeeListAutoIC"
        };
          
      }
      
	};
});