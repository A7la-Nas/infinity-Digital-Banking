define(['DataValidationFramework/DataValidationHandler','./AddPayeeDAO','./ParserUtilsManager'],function(DataValidationHandler,AddPayeeDAO,ParserUtilsManager) {


	return {
		constructor: function(baseConfig, layoutConfig, pspConfig) {
          
          this.addPayeeDAO = new AddPayeeDAO();
          
          this.ParserUtilsManager = new ParserUtilsManager();
          
          this._payeeObjectService = "";
          
          this._payeeEDITOperation = "";
          
          this._payeeEDITCriteria = "";
          
          this._payeeEDITIdentifier = "";
          
          this._customServiceOperation = "";
          
          this._customServiceCriteria = "";
          
          this._customServiceIdentifier = "";
          
          //declaration for Heading in the group:General
          this._lblHeading="";
          
          //declaration for ErrorPrompt in the group:General
          this._lblErrorPrompt="";

          //declaration for Label Field Word in the group:InputField
          this._lblWord="";
          
           //declaration for Label Field Word in the group:DynamicField
          this._lblDynamicWord = "";
          
           //declaration for tbxinput word in the group:DynamicField
          this._tbxDynamicInputWord = "";

          //declaration for Action Button 1 in the group:Buttons
          this._btn1="";

           //declaration for Action Button 1 Edit in the group:Buttons
          this._btn1Edit = "";
          
          //declaration for lookUp in the group:Buttons
          this._lookUp="";
          
          //declaration for Heading Skin in the group:Skins
          this._sknLblHeading="";
          
          //declaration for Error Prompt Skin in the group:Skins
          this._sknLblErrorPrompt="";

          //declaration for Input Field Value in the group:InputField
          this._tbxInputWord="";
          
          //declaration for Input Notice Value in the group:InputField
          this._tbxInputNotice="";
          
          //declaration for Label Checkbox Value in the group:InputField
          this._lblCheckBoxInfo="";

          //declaration for Label Field Word Skin in the group:Skins
          this._sknLblWord="";

          //declaration for Input Field Value Skin in the group:Skins
          this._skntbxInputWord="";

          //declaration for Input Field Value Focus  Skin in the group:Skins
          this._skntbxInputWordFocus="";

          //declaration for Action Button Skin in the group:Skins
          this._sknBtnAction="";

          //declaration for Action Button Focus Skin in the group:Skins
          this._sknBtnActionFocus="";
          
          //declaration for Input Notice Value Skin in the group:Skins
          this._skntbxInputNotice="";
          
          //declaration for Input Notice Value Focus Skin in the group:Skins
          this._skntbxInputNoticeFocus="";
          
          //declaration for Label Checkbox Value Skin in the group:Skins
          this._sknLblCheckBoxInfo="";
          
          //declaration for Image Selected Checkbox in the group:Images
          this._imgCheckBoxSelected = "";
          
          //declaration for Image UnSelected Checkbox in the group:Images
          this._imgCheckBoxUnSelected = "";
          
          this._checkBox = "";
          
          
          this._dvfConfig = "";
          
          this._minFillMapping = "";
          
          this._payeeObject="";
          
          this._sknInputWordError = "";
          
         this._sknActionButtonBlocked = "";
          
          this._sknLblLookUp = "";
          
          this._lblCode = "";
            
          this._maskingEnabled = "";
          
          this._countryCodeEnabled = "";
          this._parentScope = "";
          this._context ="";     
          this.ParserUtilsManager;
          this.dataValidationHandler = new DataValidationHandler();
          this.textInputsMapping = {};
          this.componentContext = {};

          
		},
		//Logic for getters/setters of custom properties
		initGettersSetters: function() {
          
          //setter method for payeeObjectService in the group:Payee Management Service
          defineSetter(this, "payeeObjectService", function(val) {
            if((typeof val=='string') && (val !== "")){
              this._payeeObjectService=val;
            }
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
          
            //setter method for customServiceOperation in the group:Payee Management Service
          defineSetter(this, "customServiceOperation", function(val) {
            if((typeof val=='string') && (val !== "")){
              this._customServiceOperation=val;
            }
          });

          //getter method for customServiceOperation in the group:Payee Management Service
          defineGetter(this, "customServiceOperation", function() {
            return this._customServiceOperation;
          });
          
             //setter method for customServiceCriteria in the group:Payee Management Service
          defineSetter(this, "customServiceCriteria", function(val) {
            if((typeof val=='string') && (val !== "")){
              this._customServiceCriteria=val;
            }
          });

          //getter method for customServiceCriteria in the group:Payee Management Service
          defineGetter(this, "customServiceCriteria", function() {
            return this._customServiceCriteria;
          });
          
              //setter method for customServiceIdentifier in the group:Payee Management Service
          defineSetter(this, "customServiceIdentifier", function(val) {
            if((typeof val=='string') && (val !== "")){
              this._customServiceIdentifier=val;
            }
          });

          //getter method for customServiceIdentifier in the group:Payee Management Service
          defineGetter(this, "customServiceIdentifier", function() {
            return this._customServiceIdentifier;
          });
          
          //setter method for Heading in the group:General
          defineSetter(this, "lblHeading", function(val) {
            if((typeof val=='string') && (val !== "")){
              this._lblHeading=val;
            }
          });

          //getter method for Heading in the group:General
          defineGetter(this, "lblHeading", function() {
            return this._lblHeading;
          });
          
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

          //setter method for Label Field Word in the group:InputField
          defineSetter(this, "lblWord", function(val) {
            if((typeof val=='string') && (val !== "")){
              this._lblWord=val;
            }
          });

          //getter method for Label Field Word in the group:InputField
          defineGetter(this, "lblWord", function() {
            return this._lblWord;
          });
          
           //setter method for Label Field Word in the group:InputField
          defineSetter(this, "lblDynamicWord", function(val) {
            if((typeof val=='string') && (val !== "")){
              this._lblDynamicWord=val;
            }
          });

          //getter method for Label Field Word in the group:InputField
          defineGetter(this, "lblDynamicWord", function() {
            return this._lblDynamicWord;
          });
          
            //setter method for Label Field Word in the group:InputField
          defineSetter(this, "tbxDynamicInputWord", function(val) {
            if((typeof val=='string') && (val !== "")){
              this._tbxDynamicInputWord=val;
            }
          });

          //getter method for Label Field Word in the group:InputField
          defineGetter(this, "tbxDynamicInputWord", function() {
            return this._tbxDynamicInputWord;
          });
          
          //setter method for Label ChexkBox Info in the group:InputField
          defineSetter(this, "lblCheckBoxInfo", function(val) {
            if((typeof val=='string') && (val !== "")){
              this._lblCheckBoxInfo=val;
            }
          });

          //getter method for _label CheckBox Info in the group:InputField
          defineGetter(this, "lblCheckBoxInfo", function() {
            return this._lblCheckBoxInfo;
          });
          
          //setter method for Input Notice Value in the group:InputField
          defineSetter(this, "tbxInputNotice", function(val) {
            if((typeof val=='string') && (val !== "")){
              this._tbxInputNotice=val;
            }
          });

          //getter method for Input Notice Value in the group:InputField
          defineGetter(this, "tbxInputNotice", function() {
            return this._tbxInputNotice;
          });
          
          //setter method for Action Button 1 in the group:Buttons
          defineSetter(this, "btn1", function(val) {
            if((typeof val=='string') && (val !== "")){
              this._btn1=val;
            }
          });

          //getter method for Action Button 1 in the group:Buttons
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
          
          //setter method for Action Button 1 in the group:Buttons
          defineSetter(this, "lookUp", function(val) {
            if((typeof val=='string') && (val !== "")){
              this._lookUp=val;
            }
          });

          //getter method for Action Button 1 in the group:Buttons
          defineGetter(this, "lookUp", function() {
            return this._lookUp;
          });

          //setter method for Heading Skin in the group:Skins
          defineSetter(this, "sknLblHeading", function(val) {
            if((typeof val=='string') && (val !== "")){
              this._sknLblHeading=val;
            }
          });

          //getter method for Heading Skin in the group:Skins
          defineGetter(this, "sknLblHeading", function() {
            return this._sknLblHeading;
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

          //setter method for Input Field Value in the group:InputField
          defineSetter(this, "tbxInputWord", function(val) {
            if((typeof val=='string') && (val !== "")){
              this._tbxInputWord=val;
            }
          });

          //getter method for Input Field Value in the group:InputField
          defineGetter(this, "tbxInputWord", function() {
            return this._tbxInputWord;
          });

          //setter method for Label Field Word Skin in the group:Skins
          defineSetter(this, "sknLblWord", function(val) {
            if((typeof val=='string') && (val !== "")){
              this._sknLblWord=val;
            }
          });

          //getter method for Label Field Word Skin in the group:Skins
          defineGetter(this, "sknLblWord", function() {
            return this._sknLblWord;
          });

          //setter method for Input Field Value Skin in the group:Skins
          defineSetter(this, "skntbxInputWord", function(val) {
            if((typeof val=='string') && (val !== "")){
              this._skntbxInputWord=val;
            }
          });

          //getter method for Input Field Value Skin in the group:Skins
          defineGetter(this, "skntbxInputWord", function() {
            return this._skntbxInputWord;
          });

          //setter method for Input Field Value Focus  Skin in the group:Skins
          defineSetter(this, "skntbxInputWordFocus", function(val) {
            if((typeof val=='string') && (val !== "")){
              this._skntbxInputWordFocus=val;
            }
          });

          //getter method for Input Field Value Focus  Skin in the group:Skins
          defineGetter(this, "skntbxInputWordFocus", function() {
            return this._skntbxInputWordFocus;
          });

          //setter method for Action Button Skin in the group:Skins
          defineSetter(this, "sknBtnAction", function(val) {
            if((typeof val=='string') && (val !== "")){
              this._sknBtnAction=val;
            }
          });

          //getter method for Action Button Skin in the group:Skins
          defineGetter(this, "sknBtnAction", function() {
            return this._sknBtnAction;
          });

          //setter method for Action Button Focus Skin in the group:Skins
          defineSetter(this, "sknBtnActionFocus", function(val) {
            if((typeof val=='string') && (val !== "")){
              this._sknBtnActionFocus=val;
            }
          });

          //getter method for Action Button Focus Skin in the group:Skins
          defineGetter(this, "sknBtnActionFocus", function() {
            return this._sknBtnActionFocus;
          });
          
          //setter method for Input Value Notice Skin in the group:Skins
          defineSetter(this, "skntbxInputNotice", function(val) {
            if((typeof val=='string') && (val !== "")){
              this._skntbxInputNotice=val;
            }
          });

          //getter method for Input Value Notice Skin in the group:Skins
          defineGetter(this, "skntbxInputNotice", function() {
            return this._skntbxInputNotice;
          });
          
          //setter method for Input Value Notice Focus Skin in the group:Skins
          defineSetter(this, "skntbxInputNoticeFocus", function(val) {
            if((typeof val=='string') && (val !== "")){
              this._skntbxInputNoticeFocus=val;
            }
          });

          //getter method for Input Value Notice Focus Skin in the group:Skins
          defineGetter(this, "skntbxInputNoticeFocus", function() {
            return this._skntbxInputNoticeFocus;
          });
          
          //setter method for Label CheckBox in the group:Skins
          defineSetter(this, "sknLblCheckBoxInfo", function(val) {
            if((typeof val=='string') && (val !== "")){
              this._sknLblCheckBoxInfo=val;
            }
          });

          //getter method for Label Checkbox in the group:Skins
          defineGetter(this, "sknLblCheckBoxInfo", function() {
            return this._sknLblCheckBoxInfo;
          });
          
          //setter method for Masking Enabled in the group:General
          defineSetter(this, "maskingEnabled", function(val) {
            if((typeof val=='boolean') && (val !== "")){
              this._maskingEnabled=val;
            }
          });

          //getter method for Masking Enabled in the group:General
          defineGetter(this, "maskingEnabled", function() {
            return this._maskingEnabled;
          });
          
           //setter method for countryCodeEnabled in the group:DynamicField
          defineSetter(this, "countryCodeEnabled", function(val) {
            if((typeof val=='boolean') && (val !== "")){
              this._countryCodeEnabled = val;
            }
          });

          //getter method for countryCodeEnabled in the group:DynamicField
          defineGetter(this, "countryCodeEnabled", function() {
            return this._countryCodeEnabled;
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

          //setter method for minFillMapping the group:Address
          defineSetter(this, "minFillMapping", function(val) {
            if((typeof val=='string') && (val !== "")){
              this._minFillMapping=val;
            }
          });

          //getter method for minFillMapping in the group:Address
          defineGetter(this, "minFillMapping", function() {
            return this._minFillMapping;
          });

          //setter method for minFillMapping the group:Address
          defineSetter(this, "sknInputWordError", function(val) {
            if((typeof val=='string') && (val !== "")){
              this._sknInputWordError=val;
            }
          });

          //getter method for minFillMapping in the group:Address
          defineGetter(this, "sknInputWordError", function() {
            return this._sknInputWordError;
          });

          //setter method for minFillMapping the group:Address
          defineSetter(this, "sknActionButtonBlocked", function(val) {
            if((typeof val=='string') && (val !== "")){
              this._sknActionButtonBlocked=val;
            }
          });

          //getter method for minFillMapping in the group:Address
          defineGetter(this, "sknActionButtonBlocked", function() {
            return this._sknActionButtonBlocked;
          });

          //setter method for minFillMapping the group:Address
          defineSetter(this, "sknLblLookUp", function(val) {
            if((typeof val=='string') && (val !== "")){
              this._sknLblLookUp=val;
            }
          });

          //getter method for minFillMapping in the group:Address
          defineGetter(this, "sknLblLookUp", function() {
            return this._sknLblLookUp;
          });

          //setter method for minFillMapping the group:Address
          defineSetter(this, "lblCode", function(val) {
            if((typeof val=='string') && (val !== "")){
              this._lblCode = val;
            }
          });

          //getter method for minFillMapping in the group:Address
          defineGetter(this, "lblCode", function() {
            return this._lblCode;
          });
          
          //setter method for Image CheckBox in the group:Images
          defineSetter(this, "imgCheckBoxSelected", function(val) {
            if((typeof val=='string') && (val !== "")){
              this._imgCheckBoxSelected=val;
            }
          });

          //getter method for Image CheckBox in the group:Images
          defineGetter(this, "imgCheckBoxSelected", function() {
            return this._imgCheckBoxSelected;
          });
          
          //setter method for Image CheckBox in the group:Images
          defineSetter(this, "imgCheckBoxUnSelected", function(val) {
            if((typeof val=='string') && (val !== "")){
              this._imgCheckBoxUnSelected=val;
            }
          });

          //getter method for Image CheckBox in the group:Images
          defineGetter(this, "imgCheckBoxUnSelected", function() {
            return this._imgCheckBoxUnSelected;
          });
  
  //setter method for Image CheckBox in the group:Images
          defineSetter(this, "checkBox", function(val) {
            if((typeof val=='string') && (val !== "")){
              this._checkBox=val;
            }
          });

          //getter method for Image CheckBox in the group:Images
          defineGetter(this, "checkBox", function() {
            return this._checkBox;
          });
          //setter method for payeeObject the group:General
          defineSetter(this, "payeeObject", function(val) {
            if((typeof val=='string') && (val !== "")){
              this._payeeObject=val;
            }
          });

          //getter method for payeeObject the group:General
          defineGetter(this, "payeeObject", function() {
            return this._payeeObject;
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
        if(context.hasOwnProperty("pManager")) {
               this.ParserUtilsManager = context['pManager'];
             }
   //     }
       if(context['pManager']){
        delete context['pManager'];
      }}
        this._context = context;
        var categoryId = "";
         if(context.hasOwnProperty('billerCategoryId')){
           categoryId = context.billerCategoryId;
         }
        if(this._context.hasOwnProperty('entitlement')){
          this.entitlementContext.features  = this.context.entitlement.features;
          this.entitlementContext.permissions = this.context.entitlement.permissions;
        }
        this.setParentScope(scope);
        this.ParserUtilsManager.setContext(context);
        this.setUIElementsVisibilityBasedOnContracts();
        if(categoryId !== null && categoryId !== undefined && categoryId !== ""){
          this.setDynamicFieldBasedOnCategory(categoryId);
        }
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

  /*  mapTextBoxValueToContext: function(contractJSON, textBoxID) {
    //  var contractJSON = JSON.parse(contractJSON);
      if(!this.isEmptyNullUndefined(contractJSON) && !this.isEmptyNullUndefined(contractJSON.mapping)){
        var inputMapper = contractJSON.mapping;
        this.textInputsMapping[textBoxID] = inputMapper;
      }
    },
    */
       mapTextBoxValueToContext: function(contractJSON, textBoxID) {
      if(!this.isEmptyNullUndefined(contractJSON) && !this.isEmptyNullUndefined(contractJSON.mapping)){
        var inputMapper = contractJSON.mapping.substring(5,contractJSON.mapping.length-1);
        this.textInputsMapping[textBoxID] = inputMapper;
      }
    },
    populateTextIntoTextInput: function(contractJSON,srcWidget){
      if(!this.isEmptyNullUndefined(contractJSON)) {
    //   var contractJSONValue =  JSON.parse(contractJSON);
        var contextValue =  this.ParserUtilsManager.getParsedValue(contractJSON.mapping);
         var placeHolderValue = this.ParserUtilsManager.geti18nText(contractJSON.placeHolder);
         var inputModeValue = this.ParserUtilsManager.getParsedValue(contractJSON.inputMode);
        var isMaskingEnabled = this._maskingEnabled;
        if(inputModeValue === "Numeric" && isMaskingEnabled === true)
        {
          inputModeValue = constants.TEXTBOX_INPUT_MODE_NUMERIC;
           this.view[srcWidget].restrictCharactersSet =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_-\\?/+={[]}:;,.<>'`|\"";
        }
        else if(inputModeValue === "Numeric" && isMaskingEnabled === false)
        {
          inputModeValue = constants.TEXTBOX_INPUT_MODE_NUMERIC;
        }
        else
          {
            inputModeValue = constants.TEXTBOX_INPUT_MODE_ANY;
          }
        this.view[srcWidget].text = contextValue;
        this.view[srcWidget].placeholder = placeHolderValue;
        this.view[srcWidget].textInputMode = inputModeValue
        this.view[srcWidget].secureTextEntry = isMaskingEnabled;
      }
    },
    setUIElementsVisibilityBasedOnContracts: function(){
      var navMan = applicationManager.getNavigationManager();
       if(!this.isEmptyNullUndefined(this._lblHeading)){
        this.view.lblHeading.parent.isVisible = true;
        this.view.lblHeading.text = this.ParserUtilsManager.geti18nText(this._lblHeading);
      }
      else{
        this.view.lblHeading.parent.isVisible = false;
      }

      if(!this.isEmptyNullUndefined(this._lblWord)){
        this.view.lblWord.isVisible = true;
        this.view.lblWord.text = this.ParserUtilsManager.geti18nText(this._lblWord);
      }
      else{
        this.view.lblWord.isVisible = false;
      }
      if(!this.isEmptyNullUndefined(this._tbxInputNotice)){
        this.view.tbxInputNotice.parent.isVisible = true;
        this.view.tbxInputNotice.text = this.getValue(this._tbxInputNotice);
      }
      else{
        this.view.tbxInputNotice.parent.isVisible = false;
        if (!kony.sdk.isNullOrUndefined(navMan.getCustomInfo("Back"))) {
          if (navMan.getCustomInfo("Back") === true) {
            this.view.tbxInputNotice.text = '';
          }
        }
        navMan.setCustomInfo("Back", false);
      }
      if(!this.isEmptyNullUndefined(this._lblCheckBoxInfo)){
        this.view.lblCheckboxInfo.parent.isVisible = true;
        this.view.lblCheckboxInfo.text = this.ParserUtilsManager.geti18nText(this._lblCheckBoxInfo);
      }
      else{
        this.view.lblCheckboxInfo.parent.isVisible = false;
      }
      if(!this.isEmptyNullUndefined(this._checkBox)){
        this.view.imgCheckbox.isVisible = true;
        this.view.imgCheckbox.src = this._imgCheckBoxUnSelected;
      }
      else{
        this.view.imgCheckbox.isVisible = false;
      }

      if(!this.isEmptyNullUndefined(this._tbxInputWord)){
        this.view.tbxInputWord.isVisible = true;
      //  var tbx1JSON = this.getValue(this._tbxInputWord);
        var tbx1JSON = JSON.parse(this._tbxInputWord);
        this.mapTextBoxValueToContext(tbx1JSON, "tbxInputWord");
        this.populateTextIntoTextInput(tbx1JSON, "tbxInputWord");
      }
      else{
        this.view.tbxInputWord.isVisible = false;
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
      if(!this.isEmptyNullUndefined(this._sknLblErrorPrompt)){
        this.view.lblErrorPrompt.skin = this.getValue(this._sknLblErrorPrompt);
      }
      this.view.flxError.isVisible = false;
      this.view.flxCode.isVisible = false;
    },
    preShow: function(){
      this.initActions();
      this.setSkins();
      this.resetErrorLabel();
    },
      
      
      resetErrorLabel: function(){
        this.view.lblErrorPrompt.isVisible = false;
        this.view.flxError.isVisible = false;
        this.view.lblErrorPrompt.text = "";
      },
      populateButtonText(param,widget){
      if(param !== null && param !== undefined && param !== ""){
        var text = this.ParserUtilsManager.geti18nText(param.text);
        this.view[widget].text = text;
      }
    },
      setSkins: function(){
        this.view.lblHeading.skin = this._sknLblHeading;
        this.view.lblWord.skin = this._sknLblWord;
        this.view.lblCode.skin =  this._sknLblWord;
        this.view.lblLookUp.skin = this._sknLblLookUp
        this.view.tbxInputWord.skin = this._skntbxInputWord;
        this.view.tbxInputWord.focusSkin = this._skntbxInputWordFocus;
        this.view.tbxInputCode.skin = this._skntbxInputWord;
        this.view.tbxInputCode.focusSkin = this._skntbxInputWordFocus;
        this.view.lblCheckboxInfo.skin = this._sknLblCheckBoxInfo;
        this.view.tbxInputNotice.skin = this._skntbxInputNotice;
        this.view.tbxInputNotice.focusSkin = this._skntbxInputNoticeFocus;
        if(this.view.tbxInputWord.text === ""){
          this.view.btn1.skin =  this._sknActionButtonBlocked;
		  this.view.btn1.focusSkin =  this._sknActionButtonBlocked;
        }
        else{
          this.view.btn1.skin =  this._sknBtnAction;
          this.minFillValidation("tbxInputWord");
		  this.view.btn1.focusSkin =  this._sknBtnActionFocus;
        }      
      },
    initActions: function(){
      this.view.tbxInputWord.secureTextEntry = this._maskingEnabled;
      this.view.btn1.onClick = this.performDataValidation.bind(this);
      this.view.lblLookUp.onTouchEnd = this.actionHandler.bind(this,this.ParserUtilsManager.context,this._lookUp);
       this.view.tbxInputWord.onTextChange = this.minFillValidation.bind
      (this,"tbxInputWord");
      this.view.tbxInputCode.onTextChange = this.updateContextForCountryCode.bind(this);
      this.view.tbxInputWord.setEnabled(true);
        if(!this.isEmptyNullUndefined(this._checkBox)){
          var checkBoxJson = JSON.parse(this._checkBox);
          checkBoxJson = checkBoxJson['action'];
          if(checkBoxJson.hasOwnProperty('level')){
             if(checkBoxJson.hasOwnProperty('method')){
            this.view.imgCheckbox.onTouchEnd = this.checkBoxSelection.bind(this,checkBoxJson);
          }
        }
    }
       if(this.view.imgCheckbox.src == this._imgCheckBoxSelected){
          this.view.tbxInputWord.setEnabled(false);
       }
    },
      checkBoxSelection: function(){
        this.view.imgCheckbox.src == this._imgCheckBoxUnSelected ? this.view.imgCheckbox.src = this._imgCheckBoxSelected: this.view.imgCheckbox.src =this._imgCheckBoxUnSelected ;
        if(this.view.imgCheckbox.src == this._imgCheckBoxSelected){
          this.view.tbxInputWord.setEnabled(false);
          this.view.flxNotice.isVisible = true;
          this.view.btn1.setEnabled(true);
          this.view.btn1.skin = this._sknBtnAction;
		  this.view.btn1.focusSkin = this._sknBtnActionFocus;
          this.ParserUtilsManager.context['accountNumberCheckbox'] = true;
          this.ParserUtilsManager.context['accountNumber'] = "";
          this.view.btn1.onClick =  this.actionHandler.bind(this,this.ParserUtilsManager.context,this._btn1);
          this.view.flxNotice.forceLayout();
        }
        else{
           this.view.tbxInputWord.setEnabled(true);
          this.minFillValidation("tbxInputWord");
          this.view.flxNotice.isVisible = false;
          this.view.btn1.onClick = this.performDataValidation.bind(this);
          this.ParserUtilsManager.context['accountNumberCheckbox'] = false;
        }
       
      },
      updateContextForCountryCode: function(){
        this.componentContext['countryCode'] = this.view.tbxInputCode.text;
        this.ParserUtilsManager.setContext(this.componentContext);
      },
    continuePayeeName: function(){
     kony.print("in continue of payeeName");
    },
      continueZipCode: function(){
       kony.print("in continue of zipCode");
      },
      continueReEnterAccountNumber: function(){
       kony.print("in continue of re enter account number")
      },
        continueAccountNumber: function(){
       kony.print("in continue of  account number")
      },
      setDynamicFieldBasedOnCategory:function(categoryId){
        if(this._context['reenteraccountNumber'] == null ||  this._context['reenteraccountNumber'] == undefined || this._context['reenteraccountNumber'] == ""){
          return;
        }
        var dynamicLabel = [];
        try{
          dynamicLabel = JSON.parse(this._lblDynamicWord);
        }
        catch(e){
          dynamicLabel = this._lblDynamicWord;
        }

        if(dynamicLabel) {
        dynamicLabel = dynamicLabel.filter((function(record){
          if(record["category"]){
            var categories = record["category"];
            if(categories.includes(categoryId))
              return true;
            return false;
          }
        }));
        }
        if(dynamicLabel.length > 0){
          this.view.lblWord.text = this.ParserUtilsManager.geti18nText(dynamicLabel[0].text);  
          this.view.lblWord.isVisible = true;
           this.view.lblHeading.text = this.ParserUtilsManager.geti18nText(dynamicLabel[0].heading);
           if(this._context['countryCode'] !== null && this._context['countryCode'] !== undefined && this._context['countryCode'] !== ""){
            this.view.tbxInputCode.text = this._context['countryCode'];        
            this.view.lblCode.text = this.ParserUtilsManager.geti18nText(this._lblCode);
          }
          else{ 
            this.view.tbxInputCode.text = "";
            this.view.lblCode.text = this.ParserUtilsManager.geti18nText(this._lblCode);
          }
          if(this._lookUp !== null &&  this._lookUp !== undefined &&  this._lookUp !== ""){
          this.view.lblLookUp.text = this.ParserUtilsManager.geti18nText(JSON.parse(this._lookUp)['text']);
  		  this.view.lblLookUp.isVisible = true;
          }
          else{
            this.view.lblLookUp.isVisible = false;
          }
          if(categoryId == "4"){
            this.view.lblWord.isVisible = false;   
            this.view.flxCode.isVisible = false;
            this.view.lblLookUp.isVisible = false;
           }
        }
        else{
          this.view.lblWord.isVisible = false;
          this.view.lblWord.isVisible = false;
        }

        var dynamicValue = [];
        try{
          dynamicValue = JSON.parse(this._tbxDynamicInputWord);
        }
        catch(e){
          dynamicValue = this._tbxDynamicInputWord;
        }
        if(dynamicValue) {
        dynamicValue = dynamicValue.filter((function(record){
          if(record["category"]){
            var categories = record["category"];
            if(categories.includes(categoryId))
              return true;
            return false;
          }
        }));
        }
        if(dynamicValue.length > 0){
          this.view.tbxInputWord.isVisible = true;
          var inputMapper5 = dynamicValue[0].mapping ? dynamicValue[0].mapping.substring(5,dynamicValue[0].mapping.length-1) : "";
          this.textInputsMapping["tbxInputWord"] = inputMapper5;
          var inputModeValue = this.ParserUtilsManager.getParsedValue(dynamicValue[0].inputMode);
          var isMaskingEnabled = this._maskingEnabled;
          if(inputModeValue === "Numeric" && isMaskingEnabled === true) { 
             inputModeValue = constants.TEXTBOX_INPUT_MODE_NUMERIC;
            this.view.tbxInputWord.restrictCharactersSet =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_-\\?/+={[]}:;,.<>'`|\"";
             }
             else if(inputModeValue === "Numeric" && isMaskingEnabled === false) { 
             inputModeValue = constants.TEXTBOX_INPUT_MODE_NUMERIC
             }else
             {
              inputModeValue = constants.TEXTBOX_INPUT_MODE_ANY;
             }
          this.view.tbxInputWord.textInputMode = inputModeValue;
          this.view.tbxInputWord.secureTextEntry = isMaskingEnabled;
          // this.mapTextBoxValueToContext(tbx1JSON, "tbxInputWord");
        }
        else{
          this.view.tbxInputWord.isVisible = true;
        }
        var isCountryCodeVisible = this._countryCodeEnabled;
        if(isCountryCodeVisible == true && categoryId == "2"){
          this.view.flxCode.isVisible = true;
          this.view.flxInputWord.left = '10dp';
        }
        else{
           this.view.flxCode.isVisible = false;
        }
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
      
      minFillValidation: function(tbxWidget) {
      var object = this._payeeObject;
      var minFillconfig = JSON.parse(this._minFillMapping); 
        if(tbxWidget == "tbxInputWord" && this.view.flxInputWord.isVisible){
          this.updateContext("tbxInputWord",this.view.tbxInputWord.text);
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
      this.view.tbxInputWord.skin =  this._skntbxInputWord;
      var dataValidator = this.dataValidationHandler.validateMinFill
      (tempJson,object,minFillconfig);  
      if(Object.keys(dataValidator).length ===0 &&
         dataValidator.constructor === Object){ 
        this.view.btn1.setEnabled(true);
        this.view.btn1.skin =   this._sknBtnAction;
		this.view.btn1.focusSkin = this._sknBtnActionFocus;
      }
      else{
        this.view.btn1.setEnabled(false);
        this.view.btn1.skin = this._sknActionButtonBlocked;
		this.view.btn1.focusSkin =  this._sknActionButtonBlocked;
      }
    },
      
       constructDVFInput: function(){         
         //dynamic field case
         var tbxInputWord = "";
         if(this._tbxDynamicInputWord!== null && this._tbxDynamicInputWord !==undefined){
           tbxInputWord = this.textInputsMapping["tbxInputWord"];
         }
         else{
           var tbxInputWord = JSON.parse(this._tbxInputWord);
           if(!this.isEmptyNullUndefined(tbxInputWord) && !this.isEmptyNullUndefined(tbxInputWord.mapping)){    
             tbxInputWord = this.mapTextInputContractToDvfKey(tbxInputWord.mapping); 
           }
         }
       
        var jsonToReturn = {
          "tbxInputWord": this.componentContext[tbxInputWord]
        }      
        if(tbxInputWord == "" || tbxInputWord == null || tbxInputWord == undefined){
          delete jsonToReturn['tbxInputWord'];
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
        var check = true;
        var currentFormName = kony.application.getCurrentForm().id;
        if(currentFormName != "frmBillPayEnterAccNo"){
        check = this.checkAccountReEnterAccountNumber();  
        }
        if(!check){
          this.view.lblErrorPrompt.text = kony.i18n.getLocalizedString("i18n.payments.accountentererror");
          this.view.lblErrorPrompt.isVisible = true;
          this.view.flxError.isVisible = true;
          this.view.flxGroup.top = "95dp";
  		  this.view.tbxInputWord.skin = this._sknInputWordError;
          return;
        }
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
          if(this._customServiceOperation !== null && this._customServiceOperation !== undefined && this._customServiceOperation !== ""){
          this.customServiceCall();
          }
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
      },
      
      customServiceCall: function(){
        var self = this;
        var objSvcName = this.getValue(this._payeeObjectService);
        var objName = this.getValue(this._payeeObject);
        var operationName = this.getValue(this._customServiceOperation);
        var criteria = this.getCriteria(this._customServiceCriteria);
        var identifier = this.getValue(this._customServiceIdentifier);
        this.addPayeeDAO.customPayee
        (objSvcName,objName,operationName,criteria,this.onSuccessCustomService,identifier,self.customServiceError);
      },
       
      onSuccessCustomService: function(){
        kony.print("custom service invoked successfully");
        kony.application.dismissLoadingScreen();
      },
      
      customServiceError: function(){
          kony.print("custom service failed");
         kony.application.dismissLoadingScreen();
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
      
      checkAccountReEnterAccountNumber: function(){
        var context = this.ParserUtilsManager.context
        var accNumberContext = context['accountNumber'];
        var reEnterAccNumberContext = context['reenteraccountNumber'];
        if((accNumberContext && reEnterAccNumberContext !== null) &&  (accNumberContext && reEnterAccNumberContext !== undefined) && (accNumberContext && reEnterAccNumberContext !== "" )){
          if(accNumberContext !== reEnterAccNumberContext){
            return false;
          }
        }
        return true;
      },
       resetTextBoxesSkins: function(){
      this.view.tbxInputWord.skin = this._sknTextValue;
    },
    /**
     * @api : showValidationErrors
     * displays errors on validation of the fields in add beneficiary screen.
     * @return : NA
     */
    showValidationErrors: function(response) {
      this.invokedvfFieldErrorParser(response);    
      if(!this.isEmptyNullUndefined(this._lblErrorPrompt)){
        this.view.lblErrorPrompt.text = this.ParserUtilsManager.geti18nText(this._lblErrorPrompt);
        this.view.flxError.isVisible = true;
        this.view.flxGroup.top = "90dp";
      }
      else{
        this.view.flxError.isVisible = false;
      }
    },
      
       invokedvfFieldErrorParser : function(dvfError){

        for(var iterator in dvfError){
          if("tbxInputWord" == iterator){ 
            this.view.tbxInputWord.skin = this._sknInputWordError;
            this.view.tbxInputWord.focusSkin = this._sknInputWordError;
          }         
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
       updateContext: function(key, value) {
      this.componentContext[this.textInputsMapping[key]] = value;
       this.ParserUtilsManager.setContext(this.componentContext);
    },

	};
});