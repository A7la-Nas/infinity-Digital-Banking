define(['./ParserUtilsManager'], function(ParserUtilsManager) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig){
      this.parserUtilsManager = new ParserUtilsManager();

      //contracts declarations

      //General
      this._blockTitle1 = "";
      this._defaultSort = "";

      //Skins
      this._sknRowExpanded = "";
      this._sknRowHover = "";
      this._sknRowSeperator = "";
      this._sknBlockTitle1 = "";
      this._sknUserContractsLabel = "";
      this._sknContractCustomersLabel = "";
      this._sknPayeeIcon = "";
      this._rowIconSkin = "";

      //Images
      this._iconColumnSort = "";
      this._iconColumnSortAsc = "";
      this._iconColumnSortDsc = "";

      //Component Config
      this._BREAKPTS="";

      //User Contracts
      this._column1 = "";
      this._column2 = "";
      this._column3 = "";

      //Contract Customers
      this._field1 = "";
      this._field2 = "";
      this._field3 = "";

      //Controller variables
      //Controller variables
      this._context = "";
      this._parentScope = "";
      this._maxColumnCount = 3;
      this._profileAccess = "";
    },

    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      //setter method for blockTitle1 in the group:General
      defineSetter(this, "blockTitle1", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._blockTitle1=val;
        }
      });
      //getter method for blockTitle1 in the group:General
      defineGetter(this, "blockTitle1", function() {
        return this._blockTitle1;
      });

      //setter method for defaultSort in the group:General
      defineSetter(this, "defaultSort", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._defaultSort=val;
        }
      });
      //getter method for defaultSort in the group:General
      defineGetter(this, "defaultSort", function() {
        return this._defaultSort;
      });

      //setter method for sknRowExpanded in the group:Skins
      defineSetter(this, "sknRowExpanded", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknRowExpanded=val;
        }
      });
      //getter method for sknRowExpanded in the group:Skins
      defineGetter(this, "sknRowExpanded", function() {
        return this._sknRowExpanded;
      });

      //setter method for sknRowHover in the group:Skins
      defineSetter(this, "sknRowHover", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknRowHover=val;
        }
      });
      //getter method for sknRowHover in the group:Skins
      defineGetter(this, "sknRowHover", function() {
        return this._sknRowHover;
      });

      //setter method for sknRowSeperator in the group:Skins
      defineSetter(this, "sknRowSeperator", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknRowSeperator=val;
        }
      });
      //getter method for sknRowSeperator in the group:Skins
      defineGetter(this, "sknRowSeperator", function() {
        return this._sknRowSeperator;
      });

      //setter method for sknBlockTitle1 in the group:Skins
      defineSetter(this, "sknBlockTitle1", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknBlockTitle1=val;
        }
      });
      //getter method for sknBlockTitle1 in the group:Skins
      defineGetter(this, "sknBlockTitle1", function() {
        return this._sknBlockTitle1;
      });

      //setter method for sknUserContractsLabel in the group:Skins
      defineSetter(this, "sknUserContractsLabel", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknUserContractsLabel=val;
        }
      });
      //getter method for sknUserContractsLabel in the group:Skins
      defineGetter(this, "sknUserContractsLabel", function() {
        return this._sknUserContractsLabel;
      });

      //setter method for sknContractCustomersLabel in the group:Skins
      defineSetter(this, "sknContractCustomersLabel", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknContractCustomersLabel=val;
        }
      });
      //getter method for sknContractCustomersLabel in the group:Skins
      defineGetter(this, "sknContractCustomersLabel", function() {
        return this._sknContractCustomersLabel;
      });

      //setter method for sknPayeeIcon in the group:Skins
      defineSetter(this, "sknPayeeIcon", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknPayeeIcon=val;
        }
      });
      //getter method for sknPayeeIcon in the group:Skins
      defineGetter(this, "sknPayeeIcon", function() {
        return this._sknPayeeIcon;
      });

      //setter method for rowIconSkin in the group:Skins
      defineSetter(this, "rowIconSkin", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._rowIconSkin=val;
        }
      });
      //getter method for rowIconSkin in the group:Skins
      defineGetter(this, "rowIconSkin", function() {
        return this._rowIconSkin;
      });

      //setter method for iconColumnSort in the group:Images
      defineSetter(this, "iconColumnSort", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._iconColumnSort=val;
        }
      });
      //getter method for iconColumnSort in the group:Images
      defineGetter(this, "iconColumnSort", function() {
        return this._iconColumnSort;
      });

      //setter method for iconColumnSortAsc in the group:Images
      defineSetter(this, "iconColumnSortAsc", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._iconColumnSortAsc=val;
        }
      });
      //getter method for iconColumnSortAsc in the group:Images
      defineGetter(this, "iconColumnSortAsc", function() {
        return this._iconColumnSortAsc;
      });

      //setter method for iconColumnSortDsc in the group:Images
      defineSetter(this, "iconColumnSortDsc", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._iconColumnSortDsc=val;
        }
      });
      //getter method for iconColumnSortDsc in the group:Images
      defineGetter(this, "iconColumnSortDsc", function() {
        return this._iconColumnSortDsc;
      });

      //setter method for BREAKPTS in the group:Component Config
      defineSetter(this, "BREAKPTS", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._BREAKPTS=val;
        }
      });
      //getter method for BREAKPTS in the group:Component Config
      defineGetter(this, "BREAKPTS", function() {
        return this._BREAKPTS;
      });

      //setter method for column1 in the group:Data Grid
      defineSetter(this, "column1", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._column1=val;
        }
      });
      //getter method for column1 in the group:Data Grid
      defineGetter(this, "column1", function() {
        return this._column1;
      });

      //setter method for column2 in the group:Data Grid
      defineSetter(this, "column2", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._column2=val;
        }
      });
      //getter method for column2 in the group:Data Grid
      defineGetter(this, "column2", function() {
        return this._column2;
      });

      //setter method for column3 in the group:Data Grid
      defineSetter(this, "column3", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._column3=val;
        }
      });
      //getter method for column3 in the group:Data Grid
      defineGetter(this, "column3", function() {
        return this._column3;
      });

      //setter method for field1 in the group:Customer Details
      defineSetter(this, "field1", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field1=val;
        }
      });
      //getter method for field1 in the group:Customer Details
      defineGetter(this, "field1", function() {
        return this._field1;
      });

      //setter method for field2 in the group:Customer Details
      defineSetter(this, "field2", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field2=val;
        }
      });
      //getter method for field2 in the group:Customer Details
      defineGetter(this, "field2", function() {
        return this._field2;
      });

      //setter method for field3 in the group:Customer Details
      defineSetter(this, "field3", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field3=val;
        }
      });
      //getter method for field3 in the group:Customer Details
      defineGetter(this, "field3", function() {
        return this._field3;
      });      
    },

    /**
	   * Component setContext.
	   * Responsible to setting the context for the component
	   */
    setContext: function(context){
      this._context = context;
    },

    /**
	   * getContext.
	   * Responsible to returning the context for the component
	   */
    getContext: function(){
      return this._context;
    },

    /**
		* setParentScope.
		* This Method is exposed to the form to pass the parent Scope.
		*/
    setParentScope: function(scope){
      this._parentScope = scope;
    },

    /**
		* preshow.
		* component pre show function
		*/
    preshow: function () {
      var scopeObj = this;
      scopeObj.setStaticData();
      scopeObj.initializeSortActions();
      scopeObj.sortAccessibility();
    },

    sortAccessibility: function () {
      var scopeObj = this;
      if (scopeObj.view.imgSortColumn1.src === scopeObj._iconColumnSortAsc) {
        scopeObj.view.flxColumn1.accessibilityConfig = {
          "a11yLabel":"Contract Column. Sorted in Ascending order. Click to Sort in Descending order",
          "a11yARIA": {
            role: "button",
          }
        }
      } else if (scopeObj.view.imgSortColumn1.src === scopeObj._iconColumnSortDsc) {
        scopeObj.view.flxColumn1.accessibilityConfig = {
          "a11yLabel":"Contract Column. Sorted in Descending order. Click to Sort in Ascending order",
          "a11yARIA": {
            role : "button",
          }
        }
      } else {
        scopeObj.view.flxColumn1.accessibilityConfig = {
          "a11yLabel": "Contract Column. No Sort applied. Click to Sort in Ascending order",
          "a11yARIA": {
            role: "button"
          }
        }
      }

      if (scopeObj.view.imgSortColumn2.src === scopeObj._iconColumnSortAsc) {
        scopeObj.view.flxColumn2.accessibilityConfig = {
          "a11yLabel":"Identity Number Column. Sorted in Ascending order. Click to Sort in Descending order",
          "a11yARIA": {
            role: "button",
          }
        }
      } else if (scopeObj.view.imgSortColumn2.src === scopeObj._iconColumnSortDsc) {
        scopeObj.view.flxColumn2.accessibilityConfig = {
          "a11yLabel":"Identity Number Column. Sorted in Descending order. Click to Sort in Ascending order",
          "a11yARIA": {
            role: "button",
          }
        }
      } else {
        scopeObj.view.flxColumn2.accessibilityConfig = {
          "a11yLabel": "Identity Number Column. No Sort applied. Click to Sort in Ascending order",
          "a11yARIA": {
            role: "button"
          }
        }
      }
    },
    
     /**
	   * initializeComponent.
	   * Responsible to intialiaze the data for the component
	   */
    initializeComponent: function(){
      var scopeObj = this;
      scopeObj.parserUtilsManager.setContext(scopeObj._context);
      if(scopeObj._context.screenConfirmSkins){
        this.setSkinsFromParentScope(scopeObj._context.screenConfirmSkins);
      }
      if(scopeObj._context.profileAccess){
        scopeObj._profileAccess = scopeObj._context.profileAccess;
      }
      if(scopeObj._context.data){
        scopeObj.setConfirmScreenContractsData(scopeObj._context.data);
      }else if(scopeObj._context.serverData){
        scopeObj.view.setVisibility(false);
        scopeObj._context.CIF = [{
          "contractId": scopeObj._context.serverData["contracts"][0].contractId,
          "coreCustomerId": scopeObj._context.serverData["contracts"][0]["contractCustomers"][0].coreCustomerId
        }];
      }
    },
    
    /** 
    	* setSkinsFromParentScope
        * Set Skins from its parent component
        */
    setSkinsFromParentScope: function(skins){
      this._sknRowExpanded = skins.sknRowExpanded;
      this._sknRowHover = skins.sknRowHover;
      this._sknRowSeperator = skins.sknRowSeparator;
      this._sknBlockTitle1 = skins.sknBlockTitle;
      this._sknUserContractsLabel = skins.sknUserContractsLabel;
      this._sknContractCustomersLabel = skins.sknContractCustomersLabel;
      this._sknPayeeIcon = skins.sknPayeeIcon;
      this._rowIconSkin = skins.sknRowIcon;
    },
    
    /**
	   * getSegData.
	   * Responsible to return the segment data
	   */
    getSegData: function(){
      return this.view.segContracts.data;
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
	   * setStaticData.
	   * Responsible to setting the static segment data
	   */
    setStaticData:function(){
      var scopeObj = this;
      if(scopeObj._blockTitle1){
        scopeObj.view.lblHeaderContracts.setVisibility(true);
        scopeObj.view.lblHeaderContracts.text = kony.i18n.getLocalizedString(scopeObj._blockTitle1);
        scopeObj.view.lblHeaderContracts.skin = scopeObj._sknBlockTitle1;
      }else{
        scopeObj.view.lblHeaderContracts.setVisibility(false);
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

    /**
	   * initializeSortActions.
	   * Responsible to setting the sort actions
	   */
    initializeSortActions: function() {
      var scopeObj = this;
      scopeObj.view.imgSortColumn1.src = scopeObj._defaultSort === "ASC"?scopeObj._iconColumnSortAsc:scopeObj._iconColumnSortDsc;
      scopeObj.view.imgSortColumn2.src = scopeObj._iconColumnSort;
      scopeObj.view.flxColumn1.onClick = scopeObj.onSortClick.bind(scopeObj, scopeObj.view.imgSortColumn1, JSON.parse(scopeObj._column1).sortBy, JSON.parse(scopeObj._column1).sortByType);
      scopeObj.view.flxColumn2.onClick = scopeObj.onSortClick.bind(scopeObj, scopeObj.view.imgSortColumn2, JSON.parse(scopeObj._column2).sortBy, JSON.parse(scopeObj._column2).sortByType);
    },

    /**
	   * setContractsWidgetDataMap.
	   * Responsible to return the widget datamap
	   */
    setContractsWidgetDataMap: function () {
      return {
        "flxDropDown": "flxDropDown",
        "imgDropDown": "imgDropDown",
        "lblDropdown": "lblDropdown",
        "lblColumn1": "lblColumn1",
        "lblColumn2": "lblColumn2",
        "lblColumn3": "lblColumn3",
        "lblColumn1dummy": "lblColumn1dummy",
        "lblColumn2dummy": "lblColumn2dummy",
        "lblColumn3dummy": "lblColumn3dummy",
        "flxSeparatorVertical": "flxSeparatorVertical",
        "lblContractName": "lblContractName",
        "lblContractIdentityNum": "lblContractIdentityNum",
        "flxUserCommonRowHeader": "flxUserCommonRowHeader",
        "flxRowDetails": "flxRowDetails",
        "flxUserDetails": "flxUserDetails",
        "flxCIFDetails": "flxCIFDetails",
        "lblUserType": "lblUserType",
        "flxContent":"flxContent",
        "lblSample1":"lblSample1",
        "lblSample2":"lblSample2"
      };
    },

    setFocusData : function(){
      this.view.flxColumn1.setActive(true);
    },

    /**
	   * setConfirmScreenContractsData.
	   * Responsible to set the segment data
	   */
    setConfirmScreenContractsData: function (data) {
      var scopeObj = this;
      let segData = [];
      var column1Visibility = !scopeObj.isEmptyNullUndefined(scopeObj._column1);
      var column2Visibility = !scopeObj.isEmptyNullUndefined(scopeObj._column2);
      var column3Visibility = !scopeObj.isEmptyNullUndefined(scopeObj._column3);
      var field1Visibility = !scopeObj.isEmptyNullUndefined(scopeObj._field1);
      var field2Visibility = !scopeObj.isEmptyNullUndefined(scopeObj._field2);
      var field3Visibility = !scopeObj.isEmptyNullUndefined(scopeObj._field3);
      var userIconVisibility = scopeObj._profileAccess === "both" ? true : false;
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        let headerData = [];
        let rowData = [];
        if (element[0].lblCheckBoxSelect.text === "C") {
          for(let j=0;j<element[1].length;j++){
            let val = element[1][j];
            if (val.lblCustomerCheckbox.text === "C") {
              rowData.push({
                "flxUserCommonRowHeader": {
                  "isVisible": false
                },
                "flxUserDetails": {
                  "isVisible": false
                },
                "flxRowDetails": {
                  "isVisible": false
                },
                "flxCIFDetails": {
                  "isVisible": false
                },
                "lblContractName": {
                  "text": field1Visibility?val[JSON.parse(scopeObj._field1)["mapping"]].text:"",
                  "isVisible": field1Visibility,
                  "skin": scopeObj._sknContractCustomersLabel,
                  "accessibilityConfig":{
                    a11yARIA:{
                        "tabindex":-1,
                        "aria-hidden":true
                    }
                  }
                },
                "lblSample1":{
                  "text": field1Visibility?"Account name "+ " " + val[JSON.parse(scopeObj._field1)["mapping"]].text:"",
                  "isVisible": field1Visibility,
                  "accessibilityConfig":{
                    a11yARIA:{
                        "tabindex":-1
                    }
                  }
                },
                "lblContractIdentityNum": {
                  "text": field2Visibility?val[JSON.parse(scopeObj._field2)["mapping"]].text:"",
                  "isVisible": field2Visibility,
                  "skin": scopeObj._sknContractCustomersLabel,
                  "accessibilityConfig":{
                    a11yARIA:{
                        "tabindex":-1,
                        "aria-hidden":true
                    }
                }
                },
                "lblSample2":{
                  "text": field2Visibility?"Account number "+ " " +  val[JSON.parse(scopeObj._field2)["mapping"]].text:"",
                  "isVisible": field2Visibility,
                  "accessibilityConfig":{
                    a11yARIA:{
                        "tabindex":-1
                    }
                  }
                },
                "lblUserType": {
                  "text": field3Visibility?val[JSON.parse(scopeObj._field3)["mapping"]].text:"",
                  "isVisible": (field3Visibility && userIconVisibility),
                  "skin": scopeObj._sknPayeeIcon
                },
                "template": kony.application.getCurrentBreakpoint() === 640
                ? "flxContractConfirmScreenRowTemplateMobile"
                : "flxContractConfirmScreenRowTemplate",
              });
            }
          }
          headerData.push({
            "flxDropDown": {
              "onClick": scopeObj.onClickRowExpand,
              "accessibilityConfig" : {
                a11yLabel: column1Visibility?"show more details for contract "+ element[0][JSON.parse(scopeObj._column1)["mapping"]].text:"",
                a11yARIA :{
                  "tabindex": 0,
                  "aria-expanded":false,
                  "role":"button",
                }
              }
            },
            "lblColumn1": {
              "text": column1Visibility?element[0][JSON.parse(scopeObj._column1)["mapping"]].text:"",
              "isVisible": column1Visibility,
              "skin": scopeObj._sknUserContractsLabel,
              "accessibilityConfig":{
                a11yARIA:{
                    "tabindex":-1,
                    "aria-hidden": true 
                  }
              }
            },
            "lblColumn1dummy": {
              "text": column1Visibility? "Contract" + " " + element[0][JSON.parse(scopeObj._column1)["mapping"]].text:"",
              "isVisible": column1Visibility,
              "accessibilityConfig":{
                a11yARIA:{
                    "tabindex":-1,
                }
              }
            },
            "lblColumn2": {
              "text": column2Visibility?element[0][JSON.parse(scopeObj._column2)["mapping"]].text:"",
              "isVisible": column2Visibility,
              "skin": scopeObj._sknUserContractsLabel,
              "accessibilityConfig":{
                a11yARIA:{
                    "tabindex":-1,
                    "aria-hidden": true                
                  }
              }
            },
            "lblColumn2dummy": {
              "text": column2Visibility?"Identity Number" + " " + element[0][JSON.parse(scopeObj._column2)["mapping"]].text:"",
              "isVisible": column2Visibility,
              "accessibilityConfig":{
                a11yARIA:{
                    "tabindex":-1,
                }
              }
            },
            "lblColumn3": {
              "text": column3Visibility?element[0][JSON.parse(scopeObj._column3)["mapping"]].text:"",
              "isVisible": column3Visibility,
              "skin": scopeObj._sknUserContractsLabel,
              "accessibilityConfig":{
                a11yARIA:{
                    "tabindex":-1,
                    "aria-hidden": true                
                  }
              }
            }, 
            "lblColumn3dummy": {
              "text": column3Visibility?"Selected CIF" + " " + element[0][JSON.parse(scopeObj._column3)["mapping"]].text:"",
              "isVisible": column3Visibility,
              "accessibilityConfig":{
                a11yARIA:{
                    "tabindex":-1,
                }
              }
            },                     
            "template": kony.application.getCurrentBreakpoint() === 640
            ? "flxContractConfirmScreenRowTemplateMobile"
            : "flxContractConfirmScreenRowTemplate",
            "lblDropdown": {
              "text": "O",
              "skin": scopeObj._rowIconSkin
            },
            "flxSeparatorVertical": {
              "isVisible": false,
              "accessibilityConfig":{
                a11yARIA:{
                    "tabindex":-1,
                    "aria-hidden":true
                }
            }
            },
            "flxUserDetails": {
              "isVisible": false
            },
            "flxRowDetails": {
              "isVisible": false
            },
            "flxUserCommonRowHeader": {
              "isVisible": true
            },
            "flxCIFDetails": {
              "isVisible": false
            },
          }, rowData);
          segData.push(headerData);
        }
      }
      if (segData.length === 0) {
        scopeObj.view.setVisibility(false);
      } else {
        scopeObj.view.setVisibility(true);
        scopeObj.view.segContracts.widgetDataMap = scopeObj.setContractsWidgetDataMap();
        segData = scopeObj.getSortedData(segData, JSON.parse(scopeObj._column1).sortBy, scopeObj._defaultSort, JSON.parse(scopeObj._column1).sortByType);
        scopeObj.view.segContracts.setData(segData);
      }
    },

    /**
	   * onClickRowExpand.
	   * Responsible to show the expanded data
	   */
    onClickRowExpand: function (widgetInfo, context) {
      var scopeObj = this;
      var data = scopeObj.getSegData();
      var selectedRowIndex = scopeObj.view.segContracts.selectedRowIndex[0];
      if (data[selectedRowIndex][0].lblDropdown.text === "O") {
        data[selectedRowIndex][0].lblDropdown.text = "P";
        data[selectedRowIndex][0].flxSeparatorVertical.isVisible = true;
        data[selectedRowIndex][1].forEach(x => x.flxUserDetails.isVisible = true);
        data[selectedRowIndex][1].forEach(x => x.flxRowDetails.isVisible = true);
        data[selectedRowIndex][0].flxUserCommonRowHeader.skin = "sknFlxfbfbfb";
        data[selectedRowIndex][0].flxDropDown.accessibilityConfig = {
          a11yLabel:"Hide details for contract " + data[selectedRowIndex][0].lblColumn1.text,
          a11yARIA :{
            "tabindex": 0,
            "aria-expanded":true,
            "role":"button",
          }
        }
        kony.application.getCurrentBreakpoint() === 640 ? data[selectedRowIndex][0].flxCIFDetails.isVisible = true : "";
        kony.application.getCurrentBreakpoint() === 640 ? data[selectedRowIndex][0].flxRowDetails.isVisible = true : "";
      } else {
        data[selectedRowIndex][0].lblDropdown.text = "O";
        data[selectedRowIndex][0].flxSeparatorVertical.isVisible = false;
        data[selectedRowIndex][0].flxUserCommonRowHeader.skin = "sknFlxffffffBorder0";
        data[selectedRowIndex][0].flxDropDown.accessibilityConfig = {
          a11yLabel:"Show more details for contract " + data[selectedRowIndex][0].lblColumn1.text,
          a11yARIA :{
            "tabindex": 0,
            "aria-expanded":false,
            "role":"button",
          }
        }
        data[selectedRowIndex][1].forEach(x => x.flxUserDetails.isVisible = false);
        data[selectedRowIndex][1].forEach(x => x.flxRowDetails.isVisible = false);
        kony.application.getCurrentBreakpoint() === 640 ? data[selectedRowIndex][0].flxCIFDetails.isVisible = false : "";
        kony.application.getCurrentBreakpoint() === 640 ? data[selectedRowIndex][0].flxRowDetails.isVisible = false : "";
      }
      data = scopeObj.getSortedData(data,"lblColumn1",scopeObj._defaultSort);
      scopeObj.view.segContracts.setData(data);
      if(kony.application.getCurrentBreakpoint() === 640){
        scopeObj.view.segContracts.sectionHeaderTemplate = "flxContractConfirmScreenRowTemplateMobile";
        this.view.segContracts.setActive(-1, context.sectionIndex, "flxContractConfirmScreenRowTemplateMobile.flxGroup1.flxUserCommonRowHeader.flxContent.flxDropDown");
      }
      else{
        scopeObj.view.segContracts.sectionHeaderTemplate = "flxContractConfirmScreenRowTemplate";
        this.view.segContracts.setActive(-1, context.sectionIndex, "flxContractConfirmScreenRowTemplate.flxGroup1Mobile.flxUserCommonRowHeader.flxDropDown");
      }
    },

    /**
	   * onSortClick.
	   * Responsible to show the sorted data
	   */
    onSortClick: function(widget, sortColumn, sortByType){
      var scopeObj = this;
      var data = this.getSegData();
      var sortOrder;
      if(sortColumn === "lblColumn1"){
        scopeObj.view.imgSortColumn2.src = scopeObj._iconColumnSort;
      }else{
        scopeObj.view.imgSortColumn1.src = scopeObj._iconColumnSort;
      }
      if(widget.src === scopeObj._iconColumnSortAsc) {
        widget.src = scopeObj._iconColumnSortDsc;
        sortOrder = "DESC";
      } else if(widget.src === scopeObj._iconColumnSortDsc){
        widget.src = scopeObj._iconColumnSortAsc;
        sortOrder = "ASC";
      } else{
        sortOrder = scopeObj._defaultSort;
        widget.src = scopeObj._defaultSort === "ASC"?scopeObj._iconColumnSortAsc:scopeObj._iconColumnSortDsc;
      }
      scopeObj.sortAccessibility();
      data = scopeObj.getSortedData(data, sortColumn, sortOrder, sortByType);
      scopeObj.view.segContracts.setData(data);
      scopeObj.view.forceLayout();
    },

    /**
	   * getSortedData.
	   * Responsible to sort the data
	   */
    getSortedData: function(data, sortField, sortOrder, sortByType) {
      data.sort(function(a, b) {
        var data1 = a[0][sortField].text;
        var data2 = b[0][sortField].text;
        if(sortByType === "number"){
          data1 = parseInt(data1);
          data2 = parseInt(data2);
        }
        else{
          data1 = data1.toLowerCase();
          data2 = data2.toLowerCase();
        }
        if (data1 > data2) {
          if (sortOrder === "ASC") return 1;
          else if (sortOrder === "DESC") return -1;
        } else if (data1 < data2) {
          if (sortOrder === "ASC") return -1;
          else if (sortOrder === "DESC") return 1;
        } else return 0;
      });
      return data;
    },

    /**
	   * getCIFData.
	   * Responsible to return the selected CIF data for service call
	   */
    getCIFData: function () {
      if(this._context.serverData){
        return JSON.stringify(this._context.CIF);
      }else{
        let cif = [];
        let segData = this.getSegData();
        segData.forEach(x => {
          let coreCustomerIdArray = [];
          x[1].forEach(y => coreCustomerIdArray.push(y.lblContractIdentityNum.text));
          cif.push({
            "contractId": x[0].lblColumn2.text,
            "coreCustomerId": coreCustomerIdArray.join(',')
          });
        });
        return JSON.stringify(cif);
      }
    }
  };
});