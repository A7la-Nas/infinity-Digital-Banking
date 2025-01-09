define(['./FormatValueUtils', './ParserUtilsManager', './EntitlementUtils'],function(FormatValueUtils, ParserUtilsManager, EntitlementUtils) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.formatValueUtils = new FormatValueUtils();
      this.parserUtilsManager = new ParserUtilsManager();
      this.EntitlementUtils = new EntitlementUtils();

      //contracts declarations

      //Skins
      this._keySkin = "";
      this._valueSkin = "";
      this._actionButtonSkin = "";

      //Formats
      this._amountFormat = "";
      this._dateFormat = "";
      this._backendDateFormat = "";
      this._accountNumberFormat = "";
      this._accountNumberMasking = "";

      //Datagrid 
      this._fieldCount = "";
      this._field1Key = "";
      this._field1Value = "";
      this._field2Key = "";
      this._field2Value = "";
      this._field3Key = "";
      this._field3Value = "";
      this._field4Key = "";
      this._field4Value = "";
      this._field5Key = "";
      this._field5Value = "";
      this._field6Key = "";
      this._field6Value = "";
      this._field7Key = "";
      this._field7Value = "";
      this._field8Key = "";
      this._field8Value = "";
      this._actionButton = "";

      //Controller variables
      this._context = "";
    },

    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

      //setter method for keySkin in the group:Skins
      defineSetter(this, "keySkin", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._keySkin=val;
        }
      });
      //getter method for keySkin in the group:Skins
      defineGetter(this, "keySkin", function() {
        return this._keySkin;
      });

      //setter method for valueSkin in the group:Skins
      defineSetter(this, "valueSkin", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._valueSkin=val;
        }
      });
      //getter method for valueSkin in the group:Skins
      defineGetter(this, "valueSkin", function() {
        return this._valueSkin;
      });
      
      //setter method for actionButtonSkin in the group:Skins
      defineSetter(this, "actionButtonSkin", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._actionButtonSkin=val;
        }
      });
      //getter method for actionButtonSkin in the group:Skins
      defineGetter(this, "actionButtonSkin", function() {
        return this._actionButtonSkin;
      });

      //setter method for amountFormat in the group:Format
      defineSetter(this, "amountFormat", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._amountFormat=val;
        }
      });
      //getter method for amountFormat in the group:Format
      defineGetter(this, "amountFormat", function() {
        return this._amountFormat;
      });

      //setter method for dateFormat in the group:Format
      defineSetter(this, "dateFormat", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._dateFormat=val;
        }
      });
      //getter method for dateFormat in the group:Format
      defineGetter(this, "dateFormat", function() {
        return this._dateFormat;
      });

      //setter method for backendDateFormat in the group:Format
      defineSetter(this, "backendDateFormat", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._backendDateFormat=val;
        }
      });
      //getter method for backendDateFormat in the group:Format
      defineGetter(this, "backendDateFormat", function() {
        return this._backendDateFormat;
      });

      //setter method for accountNumberFormat in the group:Format
      defineSetter(this, "accountNumberFormat", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._accountNumberFormat=val;
        }
      });
      //getter method for accountNumberFormat in the group:Format
      defineGetter(this, "accountNumberFormat", function() {
        return this._accountNumberFormat;
      });

      //setter method for accountNumberMasking in the group:Format
      defineSetter(this, "accountNumberMasking", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._accountNumberMasking=val;
        }
      });
      //getter method for accountNumberMasking in the group:Format
      defineGetter(this, "accountNumberMasking", function() {
        return this._accountNumberMasking;
      });

      //setter method for fieldCount in the group:Data Grid
      defineSetter(this, "fieldCount", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._fieldCount=val;
        }
      });
      //getter method for fieldCount in the group:Data Grid
      defineGetter(this, "fieldCount", function() {
        return this._fieldCount;
      });

      //setter method for field1Key in the group:Data Grid
      defineSetter(this, "field1Key", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field1Key=val;
        }
      });
      //getter method for field1Key in the group:Data Grid
      defineGetter(this, "field1Key", function() {
        return this._field1Key;
      });

      //setter method for field1Value in the group:Data Grid
      defineSetter(this, "field1Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field1Value=val;
        }
      });
      //getter method for field1Value in the group:Data Grid
      defineGetter(this, "field1Value", function() {
        return this._field1Value;
      });

      //setter method for field2Key in the group:Data Grid
      defineSetter(this, "field2Key", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field2Key=val;
        }
      });
      //getter method for field2Key in the group:Data Grid
      defineGetter(this, "field2Key", function() {
        return this._field2Key;
      });

      //setter method for field2Value in the group:Data Grid
      defineSetter(this, "field2Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field2Value=val;
        }
      });
      //getter method for field2Value in the group:Data Grid
      defineGetter(this, "field2Value", function() {
        return this._field2Value;
      });

      //setter method for field3Key in the group:Data Grid
      defineSetter(this, "field3Key", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field3Key=val;
        }
      });
      //getter method for field3Key in the group:Data Grid
      defineGetter(this, "field3Key", function() {
        return this._field3Key;
      });

      //setter method for field3Value in the group:Data Grid
      defineSetter(this, "field3Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field3Value=val;
        }
      });
      //getter method for field3Value in the group:Data Grid
      defineGetter(this, "field3Value", function() {
        return this._field3Value;
      });

      //setter method for field4Key in the group:Data Grid
      defineSetter(this, "field4Key", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field4Key=val;
        }
      });
      //getter method for field4Key in the group:Data Grid
      defineGetter(this, "field4Key", function() {
        return this._field4Key;
      });

      //setter method for field4Value in the group:Data Grid
      defineSetter(this, "field4Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field4Value=val;
        }
      });
      //getter method for field4Value in the group:Data Grid
      defineGetter(this, "field4Value", function() {
        return this._field4Value;
      });

      //setter method for field5Key in the group:Data Grid
      defineSetter(this, "field5Key", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field5Key=val;
        }
      });
      //getter method for field5Key in the group:Data Grid
      defineGetter(this, "field5Key", function() {
        return this._field5Key;
      });

      //setter method for field5Value in the group:Data Grid
      defineSetter(this, "field5Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field5Value=val;
        }
      });
      //getter method for field5Value in the group:Data Grid
      defineGetter(this, "field5Value", function() {
        return this._field5Value;
      });

      //setter method for field6Key in the group:Data Grid
      defineSetter(this, "field6Key", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field6Key=val;
        }
      });
      //getter method for field6Key in the group:Data Grid
      defineGetter(this, "field6Key", function() {
        return this._field6Key;
      });

      //setter method for field6Value in the group:Data Grid
      defineSetter(this, "field6Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field6Value=val;
        }
      });
      //getter method for field6Value in the group:Data Grid
      defineGetter(this, "field6Value", function() {
        return this._field6Value;
      });

      //setter method for field7Key in the group:Data Grid
      defineSetter(this, "field7Key", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field7Key=val;
        }
      });
      //getter method for field7Key in the group:Data Grid
      defineGetter(this, "field7Key", function() {
        return this._field7Key;
      });

      //setter method for field7Value in the group:Data Grid
      defineSetter(this, "field7Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field7Value=val;
        }
      });
      //getter method for field7Value in the group:Data Grid
      defineGetter(this, "field7Value", function() {
        return this._field7Value;
      });

      //setter method for field8Key in the group:Data Grid
      defineSetter(this, "field8Key", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field8Key=val;
        }
      });
      //getter method for field8Key in the group:Data Grid
      defineGetter(this, "field8Key", function() {
        return this._field8Key;
      });

      //setter method for field8Value in the group:Data Grid
      defineSetter(this, "field8Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._field8Value=val;
        }
      });
      //getter method for field8Value in the group:Data Grid
      defineGetter(this, "field8Value", function() {
        return this._field8Value;
      });

      //setter method for actionButton in the group:Data Grid
      defineSetter(this, "actionButton", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._actionButton=val;
        }
      });
      //getter method for actionButton in the group:Data Grid
      defineGetter(this, "actionButton", function() {
        return this._actionButton;
      });
    },

    /**
     * Component setContext.
     * Responsible to setting the context
     */
    setContext: function(context){
      this._context = context;
    },

    /**
      * setParentScope.
      * This Method is exposed to the form to pass the Form Scope.
      */
    setParentScope: function(scope){
      this._parentScope = scope;
    },

    /**
      * setEntitlements.
      * Responsible to set the entitlements.
      */
    setEntitlements: function(entitlements){
      var data = {};
      data.entitlement = entitlements;
      this.EntitlementUtils.setEntitlements(data);
    },

    /**
      * isEntitled.
      * Verifies if the user is entitled for respective features & permissions.
      */
    isEntitled: function(data){
      return this.EntitlementUtils.isEntitled(data);
    },

    /**
     * Component preShow.
     * Initialising set format value JSON.
     * Resetting images and values.
     */
    preShow: function(){
      try{
        this._formatValues = {
          "AMOUNT_SKIN":  this._valueSkin,
          "DATE_SKIN": this._valueSkin,
          "TEXT_SKIN": this._valueSkin,
          "AMOUNT_FORMAT": this._amountFormat,
          "DATE_FORMAT": this._dateFormat,
          "BACKEND_DATE_FORMAT": this._backendDateFormat,
          "ACCOUNT_NUMBER_FORMAT": this._accountNumberFormat,
          "MASKING": this._accountNumberMasking
        };
        if(this._context.payeeData){
          this.parserUtilsManager.setContext(this._context.payeeData);
        }
        this.setStaticData();
        this.setData();
      }catch(err){
        var errObj = {
          "errorInfo" : "Error in preShow method of the component.",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
      * setStaticData
      * Responsible to set the statuc Data
      */
    setStaticData: function(){
      try{
        if(!this.isEmptyNullUndefined(this._actionButton) && this.isEntitled(this.getContractJSON(this._actionButton)["entitlement"])) {
          var actionBtnJSON = this.getContractJSON(this._actionButton);
          this.view.btnAction.text = 
            this.parserUtilsManager.geti18nText(actionBtnJSON["text"]);
          this.view.btnAction.skin = JSON.parse(this._actionButtonSkin)["skin"];
          this.view.btnAction.onClick = this.btnActionOnClick.bind(this, this._context.payeeData, actionBtnJSON);
        } else{
          this.view.btnAction.setVisibility(false);
        }
      }catch(err){
        var errObj = {
          "errorInfo" : "Error in setStaticData method of the component.",
          "error": err
        };
        this.onError(errObj);
      }
    },
    
	/**
      * btnActionOnClick
      * Definition for the Action Button Click
      * data - Object contains the backend resposne data
      * property{json} - Object Contains the contract property
      */
    btnActionOnClick : function(data, property){
      try{
        var action = property["action"];
        if(action.level === "Form"){
          this._parentScope[action.method](data);
        }
      }catch(err){
        var errObj = {
          "errorInfo" : "Error in btnActionOnClick method of the component.",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * isEmptyNullUndefined
     * Returns if a specific value is empty or null or undefined
     */
    isEmptyNullUndefined:function(data){
      if(data === null || data === undefined || data === "")
        return true;
      return false;
    },

    /**
     * setData
     * Responsible for setting data 
     */
    setData: function(){
      try{
        for(var i=1; i <= this._fieldCount; i++){
          var keyProperties = this.getContractJSON(this["_field"+i+"Key"]);
          var valueProperties = this.getContractJSON(this["_field"+i+"Value"]);
          if(keyProperties && valueProperties){
            this.view["flxGroup" + i].setVisibility(true);
            var dataJSON = {
              "text": this.parserUtilsManager.getParsedValue(valueProperties["mapping"]),
              "type": valueProperties["type"],
              "widgetProp": valueProperties["widgetProps"]?valueProperties["widgetProps"]:"",
              "widgetPropLabel": valueProperties["widgetPropLabel"]?valueProperties["widgetPropLabel"]:""
            };
            if(!this.isEmptyNullUndefined(valueProperties["image"])){
              this.view["flximg"+i].setVisibility(true);
              this.view["imgFieldValue"+i].src = valueProperties.image;
            }else{
              this.view["flximg"+i].setVisibility(false);
            }
            if(this.parserUtilsManager.geti18nText(keyProperties["text"]) ===
                kony.i18n.getLocalizedString('i18n.payments.linkedWithColon')){
              dataJSON.text = 
                dataJSON.text + " " + 
                kony.i18n.getLocalizedString('kony.mb.FilterAccounts.OptMultiCustomers');
            }
            if(valueProperties["type"] === "eBill"){
              dataJSON.text = 
                this.parserUtilsManager.geti18nText(valueProperties.text);
              dataJSON.type = "Label";
            }
            this.view["lblField"+i].text = 
              this.parserUtilsManager.geti18nText(keyProperties["text"]);
            this.view["flxValueField" + i].addAt(this.formatValueUtils.formatText(dataJSON, this._formatValues), 2); 
          }else {
            this.view["flxGroup" + i].setVisibility(false);
          }
        }
        this.view.forceLayout();
      }catch(err){
        var errObj = {
          "errorInfo" : "Error in setData method of the component.",
          "error": err
        };
        this.onError(errObj);
      }
    },
    
    /**
      * getContractJSON
      * returns Action Button JSON by verifying the given Condition
      * contract - contract value
      * @return : {JSON} - Processed json
      */
    getContractJSON: function(contract){
      try{
        if(this.isEmptyNullUndefined(contract)){
          return "";
        }
        contract = JSON.parse(contract);
        if(!contract.hasOwnProperty("Condition1")){
          return contract;
        }
        else{
          for(var key in contract){
            if(contract[key].hasOwnProperty("condition")){
              for(var responseValue in contract[key]["condition"]){
                if(contract[key]["condition"][responseValue] === this.parserUtilsManager.getParsedValue(responseValue)){
                  return contract[key];
                }
              }
            }
          }
        }
      }catch(err){
        var errObj = {
          "errorInfo" : "Error in getContractJSON method of the component.",
          "error": err
        };
        this.onError(errObj);
      }
    },

    //temporary fix to remove all the dynamically generated widgets
    onHideOrDestroy: function(){
      for(var i=1; i <= this._fieldCount; i++){
        if(!this.isEmptyNullUndefined(this["_field"+i+"Key"])){
          var widgets = this.view["flxValueField" + i].widgets();
          for(var j=0; j < widgets.length ; j++){
            if(widgets[j].id.startsWith("flxMBPayee")){
               this.view["flxValueField" + i].removeAt(j);
            }
          }
        }
      }
    },
  };
});