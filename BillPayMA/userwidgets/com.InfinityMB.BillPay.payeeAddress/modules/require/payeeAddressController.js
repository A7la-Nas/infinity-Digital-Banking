define(['DataValidationFramework/DataValidationHandler','./AddPayeeDAO','./ParserUtilsManager'],function(DataValidationHandler,AddPayeeDAO,ParserUtilsManager) {
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      
       this.addPayeeDAO = new AddPayeeDAO();
      
      this.ParserUtilsManager = new ParserUtilsManager();
        
        this._payeeObjectService = "";
      
        this._payeeObject="";
          
        this._payeeEDITOperation = "";
          
        this._payeeEDITCriteria = "";
          
        this._payeeEDITIdentifier = "";
          

      //declaration for Label Field 1 in the group:Address
      this._lblField1="";

      //declaration for Button 1 in the group:Button
      this._btn1="";
      
      //declaration for Action Button 1 Edit in the group:Buttons
      this._btn1Edit = "";

      //declaration for Action Button Skin in the group:Skins
      this._sknActionButton="";
      
      //declaration for Label Skin in the group:Skins
      this._sknTextValue="";

      //declaration for Label Field 3 in the group:Address
      this._lblField3="";

      //declaration for Action Button Focus Skin in the group:Skins
      this._sknActionButtonFocus="";

      //declaration for Label Field 2 in the group:Address
      this._lblField2="";

      //declaration for Text Value Skin in the group:Skins
      this._sknTextValue="";

      //declaration for Label Field 4 in the group:Address
      this._lblField4="";

      //declaration for Text Value Focus Skin in the group:Skins
      this._sknTextValueFocus="";

      //declaration for Label Field 5 in the group:Address
      this._lblField5="";

      //declaration for Label Field 6 in the group:Address
      this._lblField6="";

      //declaration for Text Value 1 in the group:Address
      this._txtValue1="";

      //declaration for Text Value 2 in the group:Address
      this._txtValue2="";

      //declaration for Text Value 3 in the group:Address
      this._txtValue3="";

      //declaration for Text Value 4 in the group:Address
      this._txtValue4="";

      //declaration for Text Value 5 in the group:Address
      this._txtValue5="";

      //declaration for Text Value 6 in the group:Address
      this._txtValue6="";
      
      this._dvfConfig = "";
      
      this._minFillMapping = "";
      
      //declaration for maximum data entry counts in the group:General
      this._maxDataEntries="";
      
      //declaration for Error Prompt Label in the group:General
      this._lblErrorPrompt="";
      
      //declaration for Error Prompt Label Skin in the group:Skins
      this._sknLblErrorPrompt="";
      
      this._sknTextBoxError = "";
      
      this._sknActionButtonBlocked = "";
      
      this._parentScope = "";
      this._context ="";     
      this.ParserUtilsManager;
      this.dataValidationHandler = new DataValidationHandler();
      this.textInputsMapping = {};
      this.componentContext = {};

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      
      //setter method for ErrorPrompt in the group:General
      defineSetter(this, "lblErrorPrompt", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._lblErrorPrompt=val;
        }
      });

      //getter method for ErrorPrompt in the group:General
      defineGetter(this, "lblErrorPrompt", function() {
        return this._lblErrorPrompt;
      });

      //setter method for payeeObjectService in the group:Payee Management Service
      defineSetter(this, "payeeObjectService", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._payeeObjectService=val;
        }
      });
      
         //setter method for Payee Object in the group:Payee Management Service
      defineSetter(this, "payeeObject", function(val) {
        if((typeof val=='string') && (val != "")){
          this._payeeObject=val;
        }
      });

      //getter method for Payee Object in the  group:Payee Management Service
      defineGetter(this, "payeeObject", function() {
        return this._payeeObject;
      });

      //getter method for payeeObjectService in the group:Payee Management Service
      defineGetter(this, "payeeObjectService", function() {
        return this._payeeObjectService;
      });

      //setter method for payeeEDITOperation in the group:Payee Management Service
      defineSetter(this, "payeeEDITOperation", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._payeeEDITOperation=val;
        }
      });

      //getter method for payeeEDITOperation in the group:Payee Management Service
      defineGetter(this, "payeeEDITOperation", function() {
        return this._payeeEDITOperation;
      });

      //setter method for payeeEDITCriteria in the group:Payee Management Service
      defineSetter(this, "payeeEDITCriteria", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._payeeEDITCriteria=val;
        }
      });

      //getter method for payeeEDITCriteria in the group:Payee Management Service
      defineGetter(this, "payeeEDITCriteria", function() {
        return this._payeeEDITCriteria;
      });

      //setter method for payeeEDITIdentifier in the group:Payee Management Service
      defineSetter(this, "payeeEDITIdentifier", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._payeeEDITIdentifier=val;
        }
      });

      //getter method for payeeEDITIdentifier in the group:Payee Management Service
      defineGetter(this, "payeeEDITIdentifier", function() {
        return this._payeeEDITIdentifier;
      });

      defineSetter(this, "sknTextBoxError", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknTextBoxError=val;
        }
      });
      defineGetter(this, "sknTextBoxError", function() {
        return this._sknTextBoxError;
      });

      //setter method for Error Prompt Skin in the group:Skins
      defineSetter(this, "sknLblErrorPrompt", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._sknLblErrorPrompt=val;
        }
      });

      //getter method for Error Prompt Skin in the group:Skins
      defineGetter(this, "sknLblErrorPrompt", function() {
        return this._sknLblErrorPrompt;
      });
      
       //setter method for dvfConfig in the group:General
      defineSetter(this, "dvfConfig", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._dvfConfig=val;
        }
      });

      //getter method for dvfConfig in the group:General
      defineGetter(this, "dvfConfig", function() {
        return this._dvfConfig;
      });
      
       //setter method for Label Field 1 in the group:Address
      defineSetter(this, "minFillMapping", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._minFillMapping=val;
        }
      });
      
      //getter method for Label Field 1 in the group:Address
      defineGetter(this, "minFillMapping", function() {
        return this._minFillMapping;
      });
      
      //setter method for Label Field 1 in the group:Address
      defineSetter(this, "lblField1", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._lblField1=val;
        }
      });

      //getter method for Label Field 1 in the group:Address
      defineGetter(this, "lblField1", function() {
        return this._lblField1;
      });

      //setter method for Button 1 in the group:Button
      defineSetter(this, "btn1", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._btn1=val;
        }
      });

      //getter method for Button 1 in the group:Button
      defineGetter(this, "btn1", function() {
        return this._btn1;
      });

      //setter method for Action Button 1 in the group:Buttons
      defineSetter(this, "btn1Edit", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._btn1Edit=val;
        }
      });

      //getter method for Action Button 1 in the group:Buttons
      defineGetter(this, "btn1Edit", function() {
        return this._btn1Edit;
      });
      //setter method for Action Button Skin in the group:Skins
      defineSetter(this, "sknActionButton", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._sknActionButton=val;
        }
      });

      //getter method for Action Button Skin in the group:Skins
      defineGetter(this, "sknActionButton", function() {
        return this._sknActionButton;
      });

      //setter method for Label Field 3 in the group:Address
      defineSetter(this, "lblField3", function(val) {
        if((typeof val=='string') && (val != "")){
          this._lblField3=val;
        }
      });

      //getter method for Label Field 3 in the group:Address
      defineGetter(this, "lblField3", function() {
        return this._lblField3;
      });

      //setter method for Action Button Focus Skin in the group:Skins
      defineSetter(this, "sknActionButtonFocus", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._sknActionButtonFocus=val;
        }
      });

      //getter method for Action Button Focus Skin in the group:Skins
      defineGetter(this, "sknActionButtonFocus", function() {
        return this._sknActionButtonFocus;
      });

      //setter method for Label Field 2 in the group:Address
      defineSetter(this, "lblField2", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._lblField2=val;
        }
      });

      //getter method for Label Field 2 in the group:Address
      defineGetter(this, "lblField2", function() {
        return this._lblField2;
      });

      //setter method for Text Value Skin in the group:Skins
      defineSetter(this, "sknTextValue", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._sknTextValue=val;
        }
      });

      //getter method for Text Value Skin in the group:Skins
      defineGetter(this, "sknTextValue", function() {
        return this._sknTextValue;
      });

      //setter method for Label Field 4 in the group:Address
      defineSetter(this, "lblField4", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._lblField4=val;
        }
      });

      //getter method for Label Field 4 in the group:Address
      defineGetter(this, "lblField4", function() {
        return this._lblField4;
      });

      //setter method for Text Value Focus Skin in the group:Skins
      defineSetter(this, "sknTextValueFocus", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._sknTextValueFocus=val;
        }
      });

      //getter method for Text Value Focus Skin in the group:Skins
      defineGetter(this, "sknTextValueFocus", function() {
        return this._sknTextValueFocus;
      });
      
      //setter method for Label Skin in the group:Skins
      defineSetter(this, "sknLabel", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._sknLabel=val;
        }
      });

      //getter method for Label Skin in the group:Skins
      defineGetter(this, "sknLabel", function() {
        return this._sknLabel;
      });
      
      
      //setter method for Label Field 5 in the group:Address
      defineSetter(this, "lblField5", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._lblField5=val;
        }
      });

      //getter method for Label Field 5 in the group:Address
      defineGetter(this, "lblField5", function() {
        return this._lblField5;
      });

      //setter method for Label Field 6 in the group:Address
      defineSetter(this, "lblField6", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._lblField6=val;
        }
      });

      //getter method for Label Field 6 in the group:Address
      defineGetter(this, "lblField6", function() {
        return this._lblField6;
      });

      //setter method for Text Value 1 in the group:Address
      defineSetter(this, "txtValue1", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._txtValue1=val;
        }
      });

      //getter method for Text Value 1 in the group:Address
      defineGetter(this, "txtValue1", function() {
        return this._txtValue1;
      });

      //setter method for Text Value 2 in the group:Address
      defineSetter(this, "txtValue2", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._txtValue2=val;
        }
      });

      //getter method for Text Value 2 in the group:Address
      defineGetter(this, "txtValue2", function() {
        return this._txtValue2;
      });

      //setter method for Text Value 3 in the group:Address
      defineSetter(this, "txtValue3", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._txtValue3=val;
        }
      });

      //getter method for Text Value 3 in the group:Address
      defineGetter(this, "txtValue3", function() {
        return this._txtValue3;
      });

      //setter method for Text Value 4 in the group:Address
      defineSetter(this, "txtValue4", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._txtValue4=val;
        }
      });

      //getter method for Text Value 4 in the group:Address
      defineGetter(this, "txtValue4", function() {
        return this._txtValue4;
      });

      //setter method for Text Value 5 in the group:Address
      defineSetter(this, "txtValue5", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._txtValue5=val;
        }
      });

      //getter method for Text Value 5 in the group:Address
      defineGetter(this, "txtValue5", function() {
        return this._txtValue5;
      });

      //setter method for Text Value 6 in the group:Address
      defineSetter(this, "txtValue6", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._txtValue6=val;
        }
      });

      //getter method for Text Value 6 in the group:Address
      defineGetter(this, "txtValue6", function() {
        return this._txtValue6;
      });
      
      //setter method for max data entry in the group:General
      defineSetter(this, "maxDataEntries", function(val) {
        if((typeof val=='string') && (val !== "")){
          this._maxDataEntries=val;
        }
      });

      //getter method for max data entry in the group:General
      defineGetter(this, "maxDataEntries", function() {
        return parseInt(this._maxDataEntries);
      });
      
        //setter method for sknActionButtonBlocked in the group: skins
      defineSetter(this, "sknActionButtonBlocked", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknActionButtonBlocked=val;
        }
      });

      //getter method for sknActionButtonBlocked in the  group: skins
      defineGetter(this, "sknActionButtonBlocked", function() {
        return this._sknActionButtonBlocked;
      });

      

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

    setContext: function(context, scope) {
      if(context){
   //     if(!this.ParserUtilsManager){
        if(context.flowType !== "EDIT") {
        this.ParserUtilsManager = context['pManager'];
  //      }
       if(context['pManager']){
        delete context['pManager'];
      }}
        this._context = context;
      if(this._context.hasOwnProperty('entitlement')){
        this.entitlementContext.features  = this.context.entitlement.features;
        this.entitlementContext.permissions = this.context.entitlement.permissions;
      }
      this.setParentScope(scope);
      this.ParserUtilsManager.setContext(context);
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

    mapTextBoxValueToContext: function(contractJSON, textBoxID) {
      if(!this.isEmptyNullUndefined(contractJSON) && !this.isEmptyNullUndefined(contractJSON.mapping)){
        var inputMapper = contractJSON.mapping.substring(5,contractJSON.mapping.length-1);
        this.textInputsMapping[textBoxID] = inputMapper;
      }
    },
    populateTextIntoTextInput: function(contractJSON,srcWidget){
      if(!this.isEmptyNullUndefined(contractJSON)) {
      //  var contractJSONValue =  JSON.parse(contractJSON);
        var contextValue =  this.ParserUtilsManager.getParsedValue(contractJSON.mapping);
        var placeHolderValue = this.ParserUtilsManager.geti18nText(contractJSON.placeHolder);
        var inputModeValue = this.ParserUtilsManager.getParsedValue(contractJSON.inputMode);
        if(inputModeValue === "Numeric")
        {
          inputModeValue = constants.TEXTBOX_INPUT_MODE_NUMERIC;
        }
        else{
          inputModeValue = constants.TEXTBOX_INPUT_MODE_ANY;
        }
        this.view[srcWidget].text = contextValue;
        this.view[srcWidget].placeholder = placeHolderValue;
        this.view[srcWidget].textInputMode = inputModeValue
      }
    },
    setUIElementsVisibilityBasedOnContracts: function(){
      if(!this.isEmptyNullUndefined(this._lblField1)){
        this.view.lblField1.isVisible = true;
        this.view.lblField1.text = this.ParserUtilsManager.geti18nText(this._lblField1);
      }
      else{
        this.view.lblField1.isVisible = false;
      }

      if(!this.isEmptyNullUndefined(this._lblField2)){
        this.view.lblField2.isVisible = true;
        this.view.lblField2.text = this.ParserUtilsManager.geti18nText(this._lblField2);

      }
      else{
        this.view.lblField2.isVisible = false;
      }
      
      if(!this.isEmptyNullUndefined(this._lblField3)){
        this.view.lblField3.isVisible = true;
         this.view.lblField3.text = this.ParserUtilsManager.geti18nText(this._lblField3);
      }
      else{
        this.view.lblField3.isVisible = false;
      }
      
      if(!this.isEmptyNullUndefined(this._lblField4)){
        this.view.lblField4.isVisible = true;
        this.view.lblField4.text = this.ParserUtilsManager.geti18nText(this._lblField4);
      }
      else{
        this.view.lblField4.isVisible = false;
      }
      if(!this.isEmptyNullUndefined(this._lblField5)){
        this.view.lblField5.isVisible = true;
        this.view.lblField5.text = this.ParserUtilsManager.geti18nText(this._lblField5);
      }
      else{
        this.view.lblField5.isVisible = false;
      }
      if(!this.isEmptyNullUndefined(this._lblField6)){
        this.view.lblField6.isVisible = true;
        this.view.lblField6.text = this.ParserUtilsManager.geti18nText(this._lblField6);
      }
      else{
        this.view.lblField6.isVisible = false;
      }


      if(!this.isEmptyNullUndefined(this._txtValue1)){
        this.view.flx1.isVisible = true;
     //   var tbx1JSON = this.getValue(this._txtValue1);
        var tbx1JSON = JSON.parse(this._txtValue1);
        this.mapTextBoxValueToContext(tbx1JSON, "txtValue1");
        this.populateTextIntoTextInput(tbx1JSON, "txtValue1");
        this.updateContext("txtValue1",this.view.txtValue1.text);
      }
      else{
        this.view.flx1.isVisible = false;
      }
      if(!this.isEmptyNullUndefined(this._txtValue2)){
        this.view.flx2.isVisible = true;
        //var tbx2JSON = this.getValue(this._txtValue2);
        var tbx2JSON = JSON.parse(this._txtValue2);
        this.mapTextBoxValueToContext(tbx2JSON, "txtValue2");
        this.populateTextIntoTextInput(tbx2JSON, "txtValue2");
         this.updateContext("txtValue2",this.view.txtValue2.text);

      }
      else{
        this.view.flx2.isVisible = false;
      }
      if(!this.isEmptyNullUndefined(this._txtValue3)){
        this.view.flx3.isVisible = true;
     //   var tbx3JSON = this.getValue(this._txtValue3);
        var tbx3JSON = JSON.parse(this._txtValue3);
        this.mapTextBoxValueToContext(tbx3JSON, "txtValue3");
        this.populateTextIntoTextInput(tbx3JSON, "txtValue3");
         this.updateContext("txtValue3",this.view.txtValue3.text);
      }
      else{
        this.view.flx3.isVisible = false;
      }
      if(!this.isEmptyNullUndefined(this._txtValue4)){
        this.view.flx4.isVisible = true;
     //   var tbx4JSON = this.getValue(this._txtValue4);
        var tbx4JSON = JSON.parse(this._txtValue4);
        this.mapTextBoxValueToContext(tbx4JSON, "txtValue4");
        this.populateTextIntoTextInput(tbx4JSON, "txtValue4");
         this.updateContext("txtValue4",this.view.txtValue4.text);
        
      }
      else{
        this.view.flx4.isVisible = false;
      }
      if(!this.isEmptyNullUndefined(this._txtValue5)){
        this.view.flx5.isVisible = true;
     //   var tbx5JSON = this.getValue(this._txtValue5);
        var tbx5JSON = JSON.parse(this._txtValue5);
        this.mapTextBoxValueToContext(tbx5JSON, "txtValue5");
        this.populateTextIntoTextInput(tbx5JSON, "txtValue5");
         this.updateContext("txtValue5",this.view.txtValue5.text);
      }
      else{
        this.view.flx5.isVisible = false;
      }
      if(!this.isEmptyNullUndefined(this._txtValue6)){
        this.view.flx6.isVisible = true;
     //   var tbx6JSON = this.getValue(this._txtValue6);
        var tbx6JSON = JSON.parse(this._txtValue6);
        this.mapTextBoxValueToContext(tbx6JSON, "txtValue6");
        this.populateTextIntoTextInput(tbx6JSON, "txtValue6");
         this.updateContext("txtValue6",this.view.txtValue6.text);
      }
      else{
        this.view.flx6.isVisible = false;
      }
      if(this._context.flowType =="ADD"){
        if(!this.isEmptyNullUndefined(this._btn1)){
          this.view.btn1.isVisible = true;
          var btn1Json = JSON.parse(this._btn1);
          this.populateButtonText(btn1Json,"btn1");
        }
        else{
          this.view.btn1.isVisible = false;
        }  
      }
      if(this._context.flowType =="EDIT"){
        if(!this.isEmptyNullUndefined(this._btn1Edit)){
          this.view.btn1.isVisible = true;
          var btn1Json = JSON.parse(this._btn1Edit);
          this.populateButtonText(btn1Json,"btn1");
        }
        else{
          this.view.btn1.isVisible = false;
        }
      }

    },
    populateButtonText(param,widget){
      if(param !== null && param !== undefined && param !== ""){
        var text = this.ParserUtilsManager.geti18nText(param.text);
        this.view[widget].text = text;
      }
    },
    
    setSkins : function(){
      for(var i=1;i<=this._maxDataEntries;i++)
        {
          if(!this.isEmptyNullUndefined( this._sknLabel))
          {
            this.view["lblField"+i].focusSkin =  this._sknLabel;
          }
          if(!this.isEmptyNullUndefined(this._sknTextValueFocus))
          {
            this.view["txtValue"+i].focusSkin = this._sknTextValueFocus;
          }
          if(!this.isEmptyNullUndefined(this._sknTextValue))
          {
            this.view["txtValue"+i].skin = this._sknTextValue;
          }
        }
      if(!this.isEmptyNullUndefined(this._sknActionButton))
        {
          this.view.btn1.skin = this._sknActionButton;
        }
      if(!this.isEmptyNullUndefined(this._sknActionButtonFocus))
        {
          this.view.btn1.focusSkin = this._sknActionButtonFocus;
        }
      if(!this.isEmptyNullUndefined(this._sknLblErrorPrompt))
        {
          this.view.lblErrorPrompt.skin = this.getValue(this._sknLblErrorPrompt);
        }
      this.initialButtonDisabledCheck();
        
    },
    initialButtonDisabledCheck: function(){
     if((this.view.txtValue1.text === ""|| this.view.txtValue1.text == null || this.view.txtValue1.text == undefined ) && (this.view.txtValue2.text === ""|| this.view.txtValue2.text == null || this.view.txtValue2.text == undefined) && (this.view.txtValue3.text === ""|| this.view.txtValue3.text == null || this.view.txtValue3.text == undefined) && (this.view.txtValue4.text === ""|| this.view.txtValue4.text == null || this.view.txtValue4.text == undefined) && (this.view.txtValue5.text === ""|| this.view.txtValue5.text == null || this.view.txtValue5.text == undefined) && (this.view.txtValue6.text === ""|| this.view.txtValue6.text == null || this.view.txtValue6.text == undefined)){
          this.view.btn1.skin =  this._sknActionButtonBlocked;
		  this.view.btn1.focusSkin =  this._sknActionButtonBlocked;
       }
    },
    
    preShow: function(){
	  this.setFieldContextData();
      this.initActions();
      this.setSkins();
      this.setUIElementsVisibilityBasedOnContracts();
      
    },
    initActions: function(){
	  this.view.flxSearch.setVisibility(false);
      this.view.btn1.onClick = this.performDataValidation.bind(this);
      this.view.flxError.setVisibility(false);
    //  this.view.btn1.onClick = this.actionHandler.bind(this,this._context,this._btn1);   
      this.view.txtValue1.onTextChange = this.minFillValidation.bind
      (this,"txtValue1");
      this.view.txtValue2.onTextChange  = this.minFillValidation.bind
      (this,"txtValue2");
      this.view.txtValue3.onTextChange  = this.minFillValidation.bind
      (this,"txtValue3");
      this.view.txtValue4.onTextChange  = this.minFillValidation.bind
      (this,"txtValue4");
      this.view.txtValue5.onTextChange  = this.minFillValidation.bind
      (this,"txtValue5");
      this.view.txtValue6.onTextChange  = this.minFillValidation.bind
      (this,"txtValue6");
    },
    continueAddressAction: function(){
     kony.print("in continue of address");
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
    
    /**
     * @api : updateContext
     * updates context.
     * @return : NA
     */
    updateContext: function(key, value) {
      this.componentContext[this.textInputsMapping[key]] = value;
       this.ParserUtilsManager.setContext(this.componentContext);
    },
    
       /**
     * @api : minFillValidation
     * minimum field level validation to enable continue button.
     * @return : NA
     */
    minFillValidation: function(tbxWidget) {
      var object = this._payeeObject;
      var minFillconfig = JSON.parse(this._minFillMapping); 
        if(tbxWidget == "txtValue1" && this.view.flx1.isVisible){
          this.updateContext("txtValue1",this.view.txtValue1.text);
        }
        if(tbxWidget == "txtValue2" && this.view.flx2.isVisible){
          this.updateContext("txtValue2",this.view.txtValue2.text);
        }
       if(tbxWidget == "txtValue3" && this.view.flx3.isVisible){
          this.updateContext("txtValue3",this.view.txtValue3.text);
        }
       if(tbxWidget == "txtValue4" && this.view.flx4.isVisible){
          this.updateContext("txtValue4",this.view.txtValue4.text);
        }
       if(tbxWidget == "txtValue5" && this.view.flx5.isVisible){
          this.updateContext("txtValue5",this.view.txtValue5.text);
        }
       if(tbxWidget == "txtValue6" && this.view.flx6.isVisible){
          this.updateContext("txtValue6",this.view.txtValue6.text);
        }
        
      var dataJson = this.constructDVFInput();
  
      var tempJson = {};
      for(var key in dataJson){
        if(dataJson[key]){
          tempJson[key] = dataJson[key];
        }
        else{tempJson[key] = "";
            }
      }
      var dataValidator = this.dataValidationHandler.validateMinFill
      (tempJson,object,minFillconfig);  
      if(Object.keys(dataValidator).length ===0 &&
         dataValidator.constructor === Object){ 
        this.view.btn1.setEnabled(true);
        this.view.btn1.skin = this._sknActionButton;
		this.view.btn1.focusSkin = this._sknActionButtonFocus;
      }
      else{
        this.view.btn1.setEnabled(false);
        this.view.btn1.skin = this._sknActionButtonBlocked;
		this.view.btn1.focusSkin =  this._sknActionButtonBlocked;
      }
    },
    
   setFieldContextData: function(){  
        this.componentContext={};
         var tbx1JSON = JSON.parse(this._txtValue1);
        if(!this.isEmptyNullUndefined(tbx1JSON.mapping)){
          if(!kony.sdk.isNullOrUndefined(tbx1JSON.mapping)){
            
        this.mapTextBoxValueToContext(tbx1JSON, "txtValue1");
        this.populateTextIntoTextInput(tbx1JSON, "txtValue1");
        this.updateContext("txtValue1",this.view.txtValue1.text);
            }
        }
     
      var tbx2JSON = JSON.parse(this._txtValue2);
        if(!this.isEmptyNullUndefined(tbx2JSON.mapping)){
          if(!kony.sdk.isNullOrUndefined(tbx2JSON.mapping)){
            
        this.mapTextBoxValueToContext(tbx2JSON, "txtValue2");
        this.populateTextIntoTextInput(tbx2JSON, "txtValue2");
            this.updateContext("txtValue2",this.view.txtValue2.text);
            }
        }
      var tbx3JSON = JSON.parse(this._txtValue3);
        if(!this.isEmptyNullUndefined(tbx3JSON.mapping)){
          if(!kony.sdk.isNullOrUndefined(tbx3JSON.mapping)){
            
        this.mapTextBoxValueToContext(tbx3JSON, "txtValue3");
        this.populateTextIntoTextInput(tbx3JSON, "txtValue3");
            this.updateContext("txtValue3",this.view.txtValue3.text);
            }
        }
      var tbx4JSON = JSON.parse(this._txtValue4);
        if(!this.isEmptyNullUndefined(tbx4JSON.mapping)){
          if(!kony.sdk.isNullOrUndefined(tbx4JSON.mapping)){
            
        this.mapTextBoxValueToContext(tbx4JSON, "txtValue4");
        this.populateTextIntoTextInput(tbx4JSON, "txtValue4");
        this.updateContext("txtValue4",this.view.txtValue4.text);
            }
        }
      var tbx5JSON = JSON.parse(this._txtValue5);
        if(!this.isEmptyNullUndefined(tbx5JSON.mapping)){
          if(!kony.sdk.isNullOrUndefined(tbx5JSON.mapping)){
            
        this.mapTextBoxValueToContext(tbx5JSON, "txtValue5");
        this.populateTextIntoTextInput(tbx5JSON, "txtValue5");
       this.updateContext("txtValue5",this.view.txtValue5.text);
            }
        }
      var tbx6JSON = JSON.parse(this._txtValue6);
        if(!this.isEmptyNullUndefined(tbx6JSON.mapping)){
          if(!kony.sdk.isNullOrUndefined(tbx6JSON.mapping)){
            
        this.mapTextBoxValueToContext(tbx6JSON, "txtValue6");
        this.populateTextIntoTextInput(tbx6JSON, "txtValue6");
       this.updateContext("txtValue6",this.view.txtValue6.text);
            }
        }
     this.view.flxScrollMain.forceLayout();
    },
	
    constructDVFInput: function(){                  
        var txtValue1 = JSON.parse(this._txtValue1)
        if(!this.isEmptyNullUndefined(txtValue1) && !this.isEmptyNullUndefined(txtValue1.mapping)){    
          txtValue1 = this.mapTextInputContractToDvfKey(txtValue1.mapping); 
        }
        var txtValue2 = JSON.parse(this._txtValue2)
        if(!this.isEmptyNullUndefined(txtValue2) && !this.isEmptyNullUndefined(txtValue2.mapping)){
          txtValue2 = this.mapTextInputContractToDvfKey(txtValue2.mapping);
        }
        var txtValue3 = JSON.parse(this._txtValue3);
        if(!this.isEmptyNullUndefined(txtValue3) && !this.isEmptyNullUndefined(txtValue3.mapping)){
          txtValue3 = this.mapTextInputContractToDvfKey(txtValue3.mapping);
        }
        var txtValue4 =JSON.parse(this._txtValue4);
        if(!this.isEmptyNullUndefined(txtValue4) && !this.isEmptyNullUndefined(txtValue4.mapping)){  
          txtValue4 = this.mapTextInputContractToDvfKey(txtValue4.mapping);
        }
        var txtValue5 = JSON.parse(this._txtValue5);
        if(!this.isEmptyNullUndefined(txtValue5) && !this.isEmptyNullUndefined(txtValue5.mapping)){  
          txtValue5 = this.mapTextInputContractToDvfKey(txtValue5.mapping);
        }
        var txtValue6 = JSON.parse(this._txtValue6);
        if(!this.isEmptyNullUndefined(txtValue6) && !this.isEmptyNullUndefined(txtValue6.mapping)){  
          txtValue6 = this.mapTextInputContractToDvfKey(txtValue6.mapping);
        }
       
        var jsonToReturn = {
          "txtValue1": this.componentContext[txtValue1],
          "txtValue2" :this.componentContext[txtValue2],
          "txtValue3": this.componentContext[txtValue3],
          "txtValue4": this.componentContext[txtValue4],
          "txtValue5": this.componentContext[txtValue5],
          "txtValue6": this.componentContext[txtValue6]
        }      
        if(txtValue1 == "" || txtValue1 == null || txtValue1 == undefined){
          delete jsonToReturn['txtValue1'];
        }
        if(txtValue2 == "" || txtValue2 == null || txtValue2 == undefined){
          delete jsonToReturn['txtValue2'];
        }
        if(txtValue3 == "" || txtValue3 == null || txtValue3 == undefined){
          delete jsonToReturn['txtValue3'];
        }
        if(txtValue4== "" || txtValue4 == null || txtValue4 == undefined){
          delete jsonToReturn['txtValue4'];
        }       
       if(txtValue5== "" || txtValue5 == null || txtValue5 == undefined){
          delete jsonToReturn['txtValue5'];
        }  
       if(txtValue6== "" || txtValue6 == null || txtValue6 == undefined){
          delete jsonToReturn['txtValue6'];
        }
        return jsonToReturn;         
      
    
    },
 performDataValidation: function(successOnValidation) {
   
      var self = this;
      try{
        var dataJson = "";
        var object = this._payeeObject
        var fieldMapper = JSON.parse(this._dvfConfig);
        
        dataJson = this.constructDVFInput();
        var dataValidator = this.dataValidationHandler.validateData(dataJson,object,fieldMapper);
        if(Object.keys(dataValidator).length === 0 && dataValidator.constructor === Object){
          this.resetTextBoxesSkins();
         this.navigateBasedOnFlowType();
        }
        else{
          this.showValidationErrors(dataValidator);
        }
      }
      catch(err){
        var errObj = {
          "errorInfo" : "Error in PerformValidation method of the component.",
          "error": err
        };
     //   self.onError(errObj);	
      }
      
    },
    navigateBasedOnFlowType: function(){
        var context = this._context;
        if(context['flowType'] == "EDIT"){
          this.ParserUtilsManager.setContext(this.componentContext);
          this.editServiceCall();
        }

        else{
          this.actionHandler.call(this,this.ParserUtilsManager.context,this._btn1);
        }
      },
     onSuccessEditPayee: function(response, unicode) {
        kony.application.dismissLoadingScreen();
        this.actionHandler.call(this,this.ParserUtilsManager.context,this._btn1Edit);
        // this.addPayeeUtility.readObject(response);
        // this.parserUtilsManager.setResponseData(unicode,this.addPayeeUtility.map);
        // this.showScreen(this.screens[4]);
        //  this.setScreen5Data();

      },
      
      editServiceCall: function(){
        var self = this;
        var objSvcName = this.getValue(this._payeeObjectService);
        var objName = this.getValue(this._payeeObject);
        var operationName = this.getValue(this._payeeEDITOperation);
        var criteria = this.getCriteria(this._payeeEDITCriteria);
        var identifier = this.getValue(this._payeeEDITIdentifier);
        if(criteria['phone'] == null || criteria['phone'] == undefined  || criteria['phone'] == ""){
          delete criteria['phone'];
        }
        this.addPayeeDAO.updatePayee
        (objSvcName,objName,operationName,criteria,this.onSuccessEditPayee,identifier,self.onEditError);
      },
      
      onEditError: function() {
       kony.print("edit service call failed");
      },
       
       /**
     * @api : getCriteria
     * Parse the criteria based on accountType.
     * @param : criteria {string} - value collected from exposed contract
     * @return : {JSONObject} - jsonvalue for criteria
     */
    getCriteria: function(criteria) {
      try{
        var criteriaJSON = JSON.parse(criteria);
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
    resetTextBoxesSkins: function(){
      this.view.txtValue1.skin = this._sknTextValue;
      this.view.txtValue2.skin = this._sknTextValue;
      this.view.txtValue3.skin = this._sknTextValue;
      this.view.txtValue4.skin = this._sknTextValue;
      this.view.txtValue5.skin = this._sknTextValue;
      this.view.txtValue6.skin = this._sknTextValue;
    },
    /**
     * @api : showValidationErrors
     * displays errors on validation of the fields in add beneficiary screen.
     * @return : NA
     */
    showValidationErrors: function(response) {
      this.resetTextBoxesSkins();
      this.invokedvfFieldErrorParser(response);
    
    },
    
    isEmptyNullUndefined:function(data){
      if(data === null || data === undefined || data === "")
        return true;
      return false;
    },
    
  
  invokedvfFieldErrorParser : function(dvfError){

        for(var iterator in dvfError){
          if("txtValue1" == iterator){
            this.view.txtValue1.skin = this._sknTextBoxError
          }
          if("txtValue2" == iterator){
            this.view.txtValue2.skin = this._sknTextBoxError
          }
          if("txtValue3" == iterator){
            this.view.txtValue3.skin = this._sknTextBoxError
          }
          if("txtValue4" == iterator){
            this.view.txtValue4.skin = this._sknTextBoxError
          }
          if("txtValue5" == iterator){
            this.view.txtValue5.skin = this._sknTextBoxError
          }
          if("txtValue6" == iterator){
            this.view.txtValue6.skin = this._sknTextBoxError
          }          
        }  
        if(!this.isEmptyNullUndefined(this._lblErrorPrompt)){
          this.view.lblErrorPrompt.text = this.ParserUtilsManager.geti18nText(this._lblErrorPrompt);
          this.view.flxError.setVisibility(true);
        }
    
    },
    
       /**
  * mapTextInputContractToDvfKey
  *
  * retrieves the value required from textbox contracts to compare with dvf response error
  */
    mapTextInputContractToDvfKey: function(tbxJson) {
      var encodedText  = tbxJson;

      if(encodedText !== null && encodedText !== undefined && encodedText !==""){
        requiredText = encodedText.split('{$.c.')[1];
        requiredText = requiredText.split('}')[0];  
        return requiredText;
      }
    },


  };
});