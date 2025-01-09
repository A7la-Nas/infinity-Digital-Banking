define(['./FormatValueUtils', './ParserUtilsManager', './liteActivationDAO'],function(FormatValueUtils, ParserUtilsManager, liteActivationDAO) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.formatValueUtils = new FormatValueUtils();
      this.parserUtilsManager = new ParserUtilsManager();
      this.liteActivationDAO = new liteActivationDAO();

      //contracts declarations

      //Activation service
      this._objectService = "";
      this._object = "";
      this._activateOperation = "";
      this._activateCriteria = "";
      this._activateIdentifier = "";
      
      //Activation Info
      this._infoImage = "";
      this._infoText = "";

      //Terms & Conditions
      this._tncText = "";
      this._tncButton = "";

      //Skins
      this._keySkin = "";
      this._valueSkin = "";
      this._actionButtonActiveSkin = "";
      this._actionButtonInactiveSkin = "";

      //Images
      this._tncCheckedImg = "";
      this._tncUncheckedImg = "";

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
      
      //Pop Up
      this._successPopUp = "";
      this._errPopUp = "";
      
      //Controller variables
      this._context = "";
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      //setter method for tncCheck in the group:General
      defineSetter(this, "tncCheck", function(val) {
        if((typeof val==='boolean') && (val !== "")){
          this._tncCheck=val;
        }
      });
      //getter method for tncCheck in the group:Genseral
      defineGetter(this, "tncCheck", function() {
        return this._tncCheck;
      });        

      //setter method for objectService in the group:Activation service
      defineSetter(this, "objectService", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._objectService=val;
        }
      });
      //getter method for objectService in the group:Activation service
      defineGetter(this, "objectService", function() {
        return this._objectService;
      });
      
      //setter method for object in the group:Activation service
      defineSetter(this, "object", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._object=val;
        }
      });
      //getter method for object in the group:Activation service
      defineGetter(this, "object", function() {
        return this._object;
      });
      
      //setter method for activateOperation in the group:Activation service
      defineSetter(this, "activateOperation", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._activateOperation=val;
        }
      });
      //getter method for activateOperation in the group:Activation service
      defineGetter(this, "activateOperation", function() {
        return this._activateOperation;
      });
      
      //setter method for activateCriteria in the group:Activation service
      defineSetter(this, "activateCriteria", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._activateCriteria=val;
        }
      });
      //getter method for activateCriteria in the group:Activation service
      defineGetter(this, "activateCriteria", function() {
        return this._activateCriteria;
      });

      //setter method for activateIdentifier in the group:Activation service
      defineSetter(this, "activateIdentifier", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._activateIdentifier=val;
        }
      });
      //getter method for activateIdentifier in the group:Activation service
      defineGetter(this, "activateIdentifier", function() {
        return this._activateIdentifier;
      });

      //setter method for infoImage in the group:Activation Info
      defineSetter(this, "infoImage", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._infoImage=val;
        }
      });
      //getter method for infoImage in the group:Activation Info
      defineGetter(this, "infoImage", function() {
        return this._infoImage;
      });

      //setter method for infoText in the group:Activation Info
      defineSetter(this, "infoText", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._infoText=val;
        }
      });
      //getter method for infoText in the group:Activation Info
      defineGetter(this, "infoText", function() {
        return this._infoText;
      });

      //setter method for tncText in the group:Terms & Conditions
      defineSetter(this, "tncText", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tncText=val;
        }
      });
      //getter method for tncText in the group:Terms & Conditions
      defineGetter(this, "tncText", function() {
        return this._tncText;
      });

      //setter method for tncButton in the group:Terms & Conditions
      defineSetter(this, "tncButton", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tncButton=val;
        }
      });
      //getter method for tncButton in the group:Terms & Conditions
      defineGetter(this, "tncButton", function() {
        return this._tncButton;
      });

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
      
      //setter method for actionButtonActiveSkin in the group:Skins
      defineSetter(this, "actionButtonActiveSkin", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._actionButtonActiveSkin=val;
        }
      });
      //getter method for actionButtonActiveSkin in the group:Skins
      defineGetter(this, "actionButtonActiveSkin", function() {
        return this._actionButtonActiveSkin;
      });
      
      //setter method for actionButtonInactiveSkin in the group:Skins
      defineSetter(this, "actionButtonInactiveSkin", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._actionButtonInactiveSkin=val;
        }
      });
      //getter method for actionButtonInactiveSkin in the group:Skins
      defineGetter(this, "actionButtonInactiveSkin", function() {
        return this._actionButtonInactiveSkin;
      });

      //setter method for tncCheckedImg in the group:Images
      defineSetter(this, "tncCheckedImg", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tncCheckedImg=val;
        }
      });
      //getter method for tncCheckedImg in the group:Images
      defineGetter(this, "tncCheckedImg", function() {
        return this._tncCheckedImg;
      });

      //setter method for tncUncheckedImg in the group:Images
      defineSetter(this, "tncUncheckedImg", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._tncUncheckedImg=val;
        }
      });
      //getter method for tncUncheckedImg in the group:Images
      defineGetter(this, "tncUncheckedImg", function() {
        return this._tncUncheckedImg;
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

      //setter method for successPopUp in the group:Pop Up
      defineSetter(this, "successPopUp", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._successPopUp=val;
        }
      });
      //getter method for successPopUp in the group:Pop Up
      defineGetter(this, "successPopUp", function() {
        return this._successPopUp;
      });

     //setter method for errPopUp in the group:Pop Up
      defineSetter(this, "errPopUp", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._errPopUp=val;
        }
      });
      //getter method for errPopUp in the group:Pop Up
      defineGetter(this, "errPopUp", function() {
        return this._errPopUp;
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
        this.view.lblField1.skin = this.getContractJSON(this._keySkin)["skin"];
        this.view.lblField2.skin = this.getContractJSON(this._keySkin)["skin"];
        if(this._context.payeeData){
          this.parserUtilsManager.setContext(this._context.payeeData);
        }
        this.setStaticData();
        this.initActions();
        this.setData();
        this.toggleActionButton();
        this.view.forceLayout();
      }catch(err){
        var errObj = {
          "errorInfo" : "Error in preShow method of the component.",
          "error": err
        };
        this.onError(errObj);
      }
    },
    
    /**
     * toggleActionButton
     * Responsible for enabling/disabling action button
     */
    toggleActionButton: function(){
      var status = this.checkActionButtonStatus();
      if(status){
        this.enableActionButton();
      }else{
        this.disableActionButton();
      }
    },
    
    checkActionButtonStatus: function(){
      if(this._tncCheck){
        if(this._context && this._context.hasNavigatedToTNC && this.isCheckBoxClicked()){
          return true;
        }
      }else if(this.isCheckBoxClicked()){
        return true;
      }
      return false;
    },
    
    /**
     * enableActionButton
     * Responsible for enabling action button
     */
    enableActionButton: function(){
      this.view.btnAction.setEnabled(true);
      this.view.btnAction.skin = this.getContractJSON(this._actionButtonActiveSkin)["skin"];
    },
    
    /**
     * disableActionButton
     * Responsible for disabling action button
     */
    disableActionButton: function(){
      this.view.btnAction.setEnabled(false);
      this.view.btnAction.skin = this.getContractJSON(this._actionButtonInactiveSkin)["skin"]; 
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
     * setStaticData
     * Responsible for setting all the static texts and images
     */
    setStaticData: function(){
      try{
        var navMan = applicationManager.getNavigationManager();
        this.view.flxCustomGroupPopup.setVisibility(false);
        this.view.imgInfo.src = this.getContractJSON(this._infoImage)["img"];
        let infoTextParser = JSON.parse(this._infoText);
        this.view.lblText.text = 
          this.parserUtilsManager.geti18nText(infoTextParser["text"]);
        if (!kony.sdk.isNullOrUndefined(navMan.getCustomInfo("Back"))) {
          if (navMan.getCustomInfo("Back") === true) {
            if(this.view.imgCheckBox.src !== "checkboxtick.png"){
              this.view.imgCheckBox.src = this.getContractJSON(this._tncUncheckedImg)["img"];
            }
            navMan.setCustomInfo("Back", false);
          }
          else{
            this.view.imgCheckBox.src = this.getContractJSON(this._tncUncheckedImg)["img"];
          }
        }else{
          this.view.imgCheckBox.src = this.getContractJSON(this._tncUncheckedImg)["img"];
        }
        let tncParser = JSON.parse(this._tncText);
        this.view.lblTC.text = 
          this.parserUtilsManager.geti18nText(tncParser["text"]);
        let tncButtonParser = JSON.parse(this._tncButton);
        this.view.btnTC.text = 
          this.parserUtilsManager.geti18nText(tncButtonParser["text"]);
      }catch(err){
        var errObj = {
          "errorInfo" : "Error in setStaticData method of the component.",
          "error": err
        };
        this.onError(errObj);
      }
    },
    
     /**
      * initActions
      * Responsible to initialize all the actions
      */
    initActions: function(){
      try{
        this.view.flxImgCheckBox.onTouchStart = this.checkBoxClick.bind(this);
        this.view.btnTC.onClick = this.btnActionOnClick.bind(this, this._context.payeeData, this.getContractJSON(this._tncButton));
        if(this._actionButton){
          var actionBtnJSON = this.getContractJSON(this._actionButton);
          this.view.btnAction.setVisibility(true);
          this.view.btnAction.text = 
            this.parserUtilsManager.geti18nText(actionBtnJSON["text"]);
          this.view.btnAction.onClick = this.btnActionOnClick.bind(this, this._context.payeeData, actionBtnJSON);
        }
        else{
          this.view.btnAction.setVisibility(false);
        }
      }catch(err){
        var errObj = {
          "errorInfo" : "Error in initActions method of the component.",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
      * checkBoxClick
      * Responsible for changing the check box image
      */
    checkBoxClick: function(){
      if(!this.isCheckBoxClicked()){
        this.view.imgCheckBox.src = this.getContractJSON(this._tncCheckedImg)["img"];
      } else{
        this.view.imgCheckBox.src = this.getContractJSON(this._tncUncheckedImg)["img"];
      }
      this.toggleActionButton();
    },

    /**
      * checkBoxClick
      * Returns if the check box is clicked
      */
    isCheckBoxClicked: function(){
      var currentImg = this.view.imgCheckBox.src;
      if(currentImg === this.getContractJSON(this._tncCheckedImg)["img"]){
        return true;
      }else{
        return false;
      }
    },

    /**
      * btnActionOnClick
      * Definition for the Action Button Click
      * data - Object contains the backend resposne data
      * property{json} - Object Contains the contract property
      */
    btnActionOnClick: function(data, property){
      try{
        var action = property["action"];
        if(action.level === "Form"){
          this._parentScope[action.method](data);
        }else {
          this.activateEBill(property);
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
      * activateEBill
      * Responsible for making the service call for eBill activation
      */
    activateEBill: function(){
      try{
        var scopeObj = this;
        var criteria = this.getContractJSON(this._activateCriteria);
        criteria.payeeId = this._context.payeeData.payeeId;
        var onSuccess = function(){
          scopeObj.onActivationSuccess();
        };
        var onError = function(){
          scopeObj.onActivationError();
         kony.print("Error in activation");
        };
        scopeObj.liteActivationDAO.activatePayee(this._objectService, this._activateOperation, this._object, criteria, onSuccess, onError);
      }catch(err){
        var errObj = {
          "errorInfo" : "Error in activateEBill method of the component.",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
      * onActivationSuccess
      * Callback for activation service call success, responsible for success pop up
      */
    onActivationSuccess: function(){
      var scopeObj = this;
      var successJSON = scopeObj.getContractJSON(scopeObj._successPopUp);
      scopeObj.view.imgConfirm.src = successJSON.image;
      scopeObj.view.lblMessage.text = 
        this.parserUtilsManager.geti18nText(successJSON.message1);
      scopeObj.view.btn1.text = 
        this.parserUtilsManager.geti18nText(successJSON.btn1Text);
      scopeObj.view.btn1.onClick = 
        scopeObj._parentScope[successJSON.callback].bind(scopeObj._parentScope, scopeObj._context);
      scopeObj.view.lblMessage2.setVisibility(false);
      scopeObj.view.btn2.setVisibility(false);
      scopeObj.view.flxCustomGroupPopup.setVisibility(true);
      scopeObj.view.forceLayout();
    },

    /**
      * onActivationError
      * Callback for activation service call failure, responsible for error pop up
      */
    onActivationError: function(){
      var scopeObj = this;
      var errJSON = scopeObj.getContractJSON(scopeObj._errPopUp);
      scopeObj.view.imgConfirm.src = errJSON.image;
      scopeObj.view.lblMessage.text = 
        this.parserUtilsManager.geti18nText(errJSON.message1);
      scopeObj.view.lblMessage2.text = 
        this.parserUtilsManager.geti18nText(errJSON.message2);
      scopeObj.view.btn1.text = 
        this.parserUtilsManager.geti18nText(errJSON.btn1Text);
      scopeObj.view.btn2.text = 
        this.parserUtilsManager.geti18nText(errJSON.btn2Text);
      scopeObj.view.lblMessage2.setVisibility(true);
      scopeObj.view.btn2.setVisibility(true);
      scopeObj.view.btn1.onClick = function() {
        scopeObj.view.flxCustomGroupPopup.setVisibility(false);
        scopeObj.activateEBill();
      };
      scopeObj.view.btn2.onClick = function() {
        scopeObj.view.flxCustomGroupPopup.setVisibility(false);
      };
      scopeObj.view.flxCustomGroupPopup.setVisibility(true);
      scopeObj.view.forceLayout();
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
            this.view["lblField"+i].text = 
              this.parserUtilsManager.geti18nText(keyProperties["text"]);
            this.view["flxValueField" + i].addAt(this.formatValueUtils.formatText(dataJSON, this._formatValues), 1); 
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
              this.view["flxValueField" + i].remove(widgets[j].id);
            }
          }
        }
      }
    }
  };
});