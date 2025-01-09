define(['./AddPayeeDAO','DataValidationFramework/DataValidationHandler'],function(AddPayeeDAO,DataValidationHandler) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.addPayeeDAO = new AddPayeeDAO();

      //declaration for LabelField1 in the group:Acknowledgement Screen
      this._lblField1="";

      //declaration for LabelField2 in the group:Acknowledgement Screen
      this._lblField2="";

      //declaration for LabelField3 in the group:Acknowledgement Screen
      this._lblField3="";

      //declaration for LabelField4 in the group:Acknowledgement Screen
      this._lblField4="";

      //declaration for LabelField5 in the group:Acknowledgement Screen
      this._lblField5="";

      //declaration for LabelField6 in the group:Acknowledgement Screen
      this._lblField6="";
      
       //declaration for LabelField7 in the group:Acknowledgement Screen
      this._lblField7="";
      
      //declaration for LabelField1Edit in the group:EditData
      this._lblField1Edit="";
      
      //declaration for LabelField2Edit in the group:EditData
      this._lblField2Edit="";
      
      //declaration for LabelField3Edit in the group:EditData
      this._lblField3Edit="";
      
      //declaration for LabelField4Edit in the group:EditData
      this._lblField4Edit="";
      
      //declaration for LabelField5Edit in the group:EditData
      this._lblField5Edit="";
      
      //declaration for LabelField6Edit in the group:EditData
      this._lblField6Edit="";
      
      //declaration for LabelField7Edit in the group:EditData
      this._lblField7Edit="";

      //declaration for LabelField1 Value in the group:Acknowledgement Screen
      this._lblFieldValue1="";

      //declaration for LabelField2 Value in the group:Acknowledgement Screen
      this._lblFieldValue2="";

      //declaration for LabelField3 Value in the group:Acknowledgement Screen
      this._lblFieldValue3="";

      //declaration for LabelField4 Value in the group:Acknowledgement Screen
      this._lblFieldValue4="";

      //declaration for LabelField5 Value in the group:Acknowledgement Screen
      this._lblFieldValue5="";

      //declaration for LabelField6 Value in the group:Acknowledgement Screen
      this._lblFieldValue6="";
      
      //declaration for LabelField7 Value in the group:Acknowledgement Screen
      this._lblFieldValue7="";
      
      this._lblEditField1 = "";
      
      this._txtEditValue1 = "";
      
      this._lblEditField2 = "";
      
      this._txtEditValue2 = "";

      //declaration for Button1 in the group:Acknowledgement Screen
      this._btn1="";

      //declaration for Button2 in the group:Acknowledgement Screen
      this._btn2="";

      //declaration for Image Acknowledgement in the group:Acknowledgement Screen
      this._imgAcknowledgementSuccess="";

      //declaration for Label Acknowdlegement in the group:Acknowledgement Screen
      this._lblAcknowledgementSuccess="";
      
      //declaration for Image Acknowledgement in the group:Acknowledgement Screen
      this._imgAcknowledgementError="";

      //declaration for Label Acknowdlegement in the group:Acknowledgement Screen
      this._lblAcknowledgementError="";

      //declaration for Label Reference in the group:Acknowledgement Screen
      this._lblReference="";

      //declaration for Label Reference Value in the group:Acknowledgement Screen
      this._lblReferenceValue="";
      
      //declaration for Label Separator Skin in the group:Skins
      this._sknlblSeparator="";
        
      //declaration for Label Field Skin in the group:Skins        
      this._sknlblField="";
        
      //declaration for Label Field Value Skin in the group:Skins        
      this._sknlblFieldValue="";
        
      //declaration for Action Button 1 Skin in the group:Skins        
      this._sknBtnAction1="";
        
      //declaration for Action Button 1 Focus Skin in the group:Skins        
      this._sknBtnActionFocus1="";
       
      //declaration for Action Button 2 Skin in the group:Skins        
      this._sknBtnAction2="";
      
      //declaration for Error Button  Skin in the group:Skins     
      this._sknBtnError = "";
        
      //declaration for Action Button 2 Focus Skin in the group:Skins        
      this._sknBtnActionFocus2="";
        
      //declaration for Edit Label Field Skin in the group:Skins        
      this._sknEditLblField="";
        
      //declaration for Input Text Value Skin in the group:Skins        
      this._sknTxtValue="";
        
      //declaration for Non-Editable Conatiner Skin in the group:Skins        
      this._sknNonEditbaleContainer="";
      
      //declaration for Acknowledgment Skin in the group:Skins        
      this._sknlblAcknowledgment="";
      
      //declaration for Reference Label Skin in the group:Skins        
      this._sknlblReference="";
      
      //declaration for Reference Value Skin in the group:Skins        
      this._sknlblReferenceValue="";
      
      //declaration for Acknowledgment Screen toggle in the group:Acknowledgment Screen        
      this._ackPage="";
      
       //declaration for Acknowledgment Screen Button Error when the service call fails  in the group:Acknowledgment Screen  
      this._btnError = "";
      
      this._payeeObjectService="";
      
      this._payeeObject="";
      
      this._payeeCREATEOperation="";
      
      this._payeeCREATECriteria="";
      
      this._payeeCREATEIdentifier="";
      
      this._payeeEDITOperation="";
      
      this._payeeEDITCriteria="";
      
      this._payeeEDITIdentifier="";
      
      this._customCREATEOperation="";
      
      this._customCREATECriteria="";
      
      this._customCREATEIdentifier="";
      
      this._sknTextBoxError = "";
      
      this._parentScope = "";
      
      this._maxNonEditFields=6;
      
      this._maxEditFields=2;

      this._context ="";
	  
	  this._sknTxtboxFocus="";

      this.ParserUtilsManager;
      
      this.dataValidationHandler = new DataValidationHandler();

      this.textInputsMapping = {};
      this.componentContext = {};
      this.isAckScreenVisible=false;

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

      //setter method for LabelField1 in the group:Acknowledgement Screen
      defineSetter(this, "lblField1", function(val) {
        if((typeof val=='string') && (val != "")){
          this._lblField1=val;
        }
      });

      //getter method for LabelField1 in the group:Acknowledgement Screen
      defineGetter(this, "lblField1", function() {
        return this._lblField1;
      });

      //setter method for LabelField2 in the group:Acknowledgement Screen
      defineSetter(this, "lblField2", function(val) {
        if((typeof val=='string') && (val != "")){
          this._lblField2=val;
        }
      });

      //getter method for LabelField2 in the group:Acknowledgement Screen
      defineGetter(this, "lblField2", function() {
        return this._lblField2;
      });

      //setter method for LabelField3 in the group:Acknowledgement Screen
      defineSetter(this, "lblField3", function(val) {
        if((typeof val=='string') && (val != "")){
          this._lblField3=val;
        }
      });

      //getter method for LabelField3 in the group:Acknowledgement Screen
      defineGetter(this, "lblField3", function() {
        return this._lblField3;
      });

      //setter method for LabelField4 in the group:Acknowledgement Screen
      defineSetter(this, "lblField4", function(val) {
        if((typeof val=='string') && (val != "")){
          this._lblField4=val;
        }
      });

      //getter method for LabelField4 in the group:Acknowledgement Screen
      defineGetter(this, "lblField4", function() {
        return this._lblField4;
      });

      //setter method for LabelField5 in the group:Acknowledgement Screen
      defineSetter(this, "lblField5", function(val) {
        if((typeof val=='string') && (val != "")){
          this._lblField5=val;
        }
      });

      //getter method for LabelField5 in the group:Acknowledgement Screen
      defineGetter(this, "lblField5", function() {
        return this._lblField5;
      });

      //setter method for LabelField6 in the group:Acknowledgement Screen
      defineSetter(this, "lblField6", function(val) {
        if((typeof val=='string') && (val != "")){
          this._lblField6=val;
        }
      });

      //getter method for LabelField6 in the group:Acknowledgement Screen
      defineGetter(this, "lblField6", function() {
        return this._lblField6;
      });
      
      //setter method for LabelField7 in the group:Acknowledgement Screen
      defineSetter(this, "lblField7", function(val) {
        if((typeof val=='string') && (val != "")){
          this._lblField7=val;
        }
      });

      //getter method for LabelField7 in the group:Acknowledgement Screen
      defineGetter(this, "lblField7", function() {
        return this._lblField7;
      });
      
      //setter method for lblField1Edit in the group:Edit Data
      defineSetter(this, "lblField1Edit", function(val) {
        if((typeof val=='string') && (val != "")){
          this._lblField1Edit=val;
        }
      });

      //getter method for lblField1Edit in the group:Edit Data
      defineGetter(this, "lblField1Edit", function() {
        return this._lblField1Edit;
      });
      
      //setter method for lblField2Edit in the group:Edit Data
      defineSetter(this, "lblField2Edit", function(val) {
        if((typeof val=='string') && (val != "")){
          this._lblField2Edit=val;
        }
      });

      //getter method for lblField2Edit in the group:Edit Data
      defineGetter(this, "lblField2Edit", function() {
        return this._lblField2Edit;
      });
      
      //setter method for lblField3Edit in the group:Edit Data
      defineSetter(this, "lblField3Edit", function(val) {
        if((typeof val=='string') && (val != "")){
          this._lblField3Edit=val;
        }
      });

      //getter method for lblField3Edit in the group:Edit Data
      defineGetter(this, "lblField3Edit", function() {
        return this._lblField3Edit;
      });
      
      //setter method for lblField1Edit in the group:Edit Data
      defineSetter(this, "lblField4Edit", function(val) {
        if((typeof val=='string') && (val != "")){
          this._lblField4Edit=val;
        }
      });

      //getter method for lblField4Edit in the group:Edit Data
      defineGetter(this, "lblField4Edit", function() {
        return this._lblField4Edit;
      });
      
      //setter method for lblField5Edit in the group:Edit Data
      defineSetter(this, "lblField5Edit", function(val) {
        if((typeof val=='string') && (val != "")){
          this._lblField5Edit=val;
        }
      });

      //getter method for lblField5Edit in the group:Edit Data
      defineGetter(this, "lblField5Edit", function() {
        return this._lblField5Edit;
      });
      
      //setter method for lblField6Edit in the group:Edit Data
      defineSetter(this, "lblField6Edit", function(val) {
        if((typeof val=='string') && (val != "")){
          this._lblField6Edit=val;
        }
      });

      //getter method for lblField6Edit in the group:Edit Data
      defineGetter(this, "lblField6Edit", function() {
        return this._lblField6Edit;
      });
      
      //setter method for lblField7Edit in the group:Edit Data
      defineSetter(this, "lblField7Edit", function(val) {
        if((typeof val=='string') && (val != "")){
          this._lblField7Edit=val;
        }
      });

      //getter method for lblField7Edit in the group:Edit Data
      defineGetter(this, "lblField7Edit", function() {
        return this._lblField7Edit;
      });
      
      //setter method for LabelField1 Value in the group:Edit Data
      defineSetter(this, "lblFieldValue1", function(val) {
        if((typeof val=='string') && (val != "")){
          this._lblFieldValue1=val;
        }
      });

      //getter method for LabelField1 Value in the group:Acknowledgement Screen
      defineGetter(this, "lblFieldValue1", function() {
        return this._lblFieldValue1;
      });

      //setter method for LabelField2 Value in the group:Acknowledgement Screen
      defineSetter(this, "lblFieldValue2", function(val) {
        if((typeof val=='string') && (val != "")){
          this._lblFieldValue2=val;
        }
      });

      //getter method for LabelField2 Value in the group:Acknowledgement Screen
      defineGetter(this, "lblFieldValue2", function() {
        return this._lblFieldValue2;
      });

      //setter method for LabelField3 Value in the group:Acknowledgement Screen
      defineSetter(this, "lblFieldValue3", function(val) {
        if((typeof val=='string') && (val != "")){
          this._lblFieldValue3=val;
        }
      });

      //getter method for LabelField3 Value in the group:Acknowledgement Screen
      defineGetter(this, "lblFieldValue3", function() {
        return this._lblFieldValue3;
      });

      //setter method for LabelField4 Value in the group:Acknowledgement Screen
      defineSetter(this, "lblFieldValue4", function(val) {
        if((typeof val=='string') && (val != "")){
          this._lblFieldValue4=val;
        }
      });

      //getter method for LabelField4 Value in the group:Acknowledgement Screen
      defineGetter(this, "lblFieldValue4", function() {
        return this._lblFieldValue4;
      });

      //setter method for LabelField5 Value in the group:Acknowledgement Screen
      defineSetter(this, "lblFieldValue5", function(val) {
        if((typeof val=='string') && (val != "")){
          this._lblFieldValue5=val;
        }
      });

      //getter method for LabelField5 Value in the group:Acknowledgement Screen
      defineGetter(this, "lblFieldValue5", function() {
        return this._lblFieldValue5;
      });

      //setter method for LabelField6 Value in the group:Acknowledgement Screen
      defineSetter(this, "lblFieldValue6", function(val) {
        if((typeof val=='string') && (val != "")){
          this._lblFieldValue6=val;
        }
      });

       //getter method for LabelField5 Value in the group:Acknowledgement Screen
      defineGetter(this, "lblEditField1", function() {
        return this._lblEditField1;
      });

      //setter method for LabelField6 Value in the group:Acknowledgement Screen
      defineSetter(this, "lblEditField1", function(val) {
        if((typeof val=='string') && (val != "")){
          this._lblEditField1=val;
        }
      });  
      
          //getter method for LabelField5 Value in the group:Acknowledgement Screen
      defineGetter(this, "txtEditValue1", function() {
        return this._txtEditValue1;
      });

      //setter method for LabelField6 Value in the group:Acknowledgement Screen
      defineSetter(this, "txtEditValue1", function(val) {
        if((typeof val=='string') && (val != "")){
          this._txtEditValue1=val;
        }
      });
           //getter method for LabelField5 Value in the group:Acknowledgement Screen
      defineGetter(this, "lblEditField2", function() {
        return this._lblEditField2;
      });

      //setter method for LabelField6 Value in the group:Acknowledgement Screen
      defineSetter(this, "lblEditField2", function(val) {
        if((typeof val=='string') && (val != "")){
          this._lblEditField2=val;
        }
      });
      
           //getter method for LabelField5 Value in the group:Acknowledgement Screen
      defineGetter(this, "txtEditValue2", function() {
        return this._txtEditValue2;
      });

      //setter method for LabelField6 Value in the group:Acknowledgement Screen
      defineSetter(this, "txtEditValue2", function(val) {
        if((typeof val=='string') && (val != "")){
          this._txtEditValue2=val;
        }
      });
      
      
      //getter method for LabelField6 Value in the group:Acknowledgement Screen
      defineGetter(this, "lblFieldValue6", function() {
        return this._lblFieldValue6;
      });
      
      //setter method for LabelField7 Value in the group:Acknowledgement Screen
      defineSetter(this, "lblFieldValue7", function(val) {
        if((typeof val=='string') && (val != "")){
          this._lblFieldValue7=val;
        }
      });
      
      //getter method for LabelField7 Value in the group:Acknowledgement Screen
      defineGetter(this, "lblFieldValue7", function() {
        return this._lblFieldValue7;
      });
      
      //setter method for Button1 in the group:Acknowledgement Screen
      defineSetter(this, "btn1", function(val) {
        if((typeof val=='string') && (val != "")){
          this._btn1=val;
        }
      });

      //getter method for Button1 in the group:Acknowledgement Screen
      defineGetter(this, "btn1", function() {
        return this._btn1;
      });

      //setter method for Button2 in the group:Acknowledgement Screen
      defineSetter(this, "btn2", function(val) {
        if((typeof val=='string') && (val != "")){
          this._btn2=val;
        }
      });

      //getter method for Button2 in the group:Acknowledgement Screen
      defineGetter(this, "btn2", function() {
        return this._btn2;
      });
      
        //setter method for Button2 in the group:Acknowledgement Screen
      defineSetter(this, "btnError", function(val) {
        if((typeof val=='string') && (val != "")){
          this._btnError=val;
        }
      });

      //getter method for Button2 in the group:Acknowledgement Screen
      defineGetter(this, "btnError", function() {
        return this._btnError;
      });


      //setter method for Image Acknowledgement in the group:Acknowledgement Screen
      defineSetter(this, "imgAcknowledgementSuccess", function(val) {
        if((typeof val=='string') && (val != "")){
          this._imgAcknowledgementSuccess=val;
        }
      });

      //getter method for Image Acknowledgement in the group:Acknowledgement Screen
      defineGetter(this, "imgAcknowledgementSuccess", function() {
        return this._imgAcknowledgementSuccess;
      });
      
      //setter method for Image Acknowledgement in the group:Acknowledgement Screen
      defineSetter(this, "imgAcknowledgementError", function(val) {
        if((typeof val=='string') && (val != "")){
          this._imgAcknowledgementError=val;
        }
      });

      //getter method for Image Acknowledgement in the group:Acknowledgement Screen
      defineGetter(this, "imgAcknowledgementError", function() {
        return this._imgAcknowledgementError;
      });
      
      //setter method for Label Acknowdlegement in the group:Acknowledgement Screen
      defineSetter(this, "lblAcknowledgementSuccess", function(val) {
        if((typeof val=='string') && (val != "")){
          this._lblAcknowledgementSuccess=val;
        }
      });

      //getter method for Label Acknowdlegement in the group:Acknowledgement Screen
      defineGetter(this, "lblAcknowledgementSuccess", function() {
        return this._lblAcknowledgementSuccess;
      });
      
      //setter method for Label Acknowdlegement in the group:Acknowledgement Screen
      defineSetter(this, "lblAcknowledgementError", function(val) {
        if((typeof val=='string') && (val != "")){
          this._lblAcknowledgementError=val;
        }
      });

      //getter method for Label Acknowdlegement in the group:Acknowledgement Screen
      defineGetter(this, "lblAcknowledgementError", function() {
        return this._lblAcknowledgementError;
      });

      //setter method for Label Reference in the group:Acknowledgement Screen
      defineSetter(this, "lblReference", function(val) {
        if((typeof val=='string') && (val != "")){
          this._lblReference=val;
        }
      });

      //getter method for Label Reference in the group:Acknowledgement Screen
      defineGetter(this, "lblReference", function() {
        return this._lblReference;
      });

      //setter method for Label Reference Value in the group:Acknowledgement Screen
      defineSetter(this, "lblReferenceValue", function(val) {
        if((typeof val=='string') && (val != "")){
          this._lblReferenceValue=val;
        }
      });

      //getter method for Label Reference Value in the group:Acknowledgement Screen
      defineGetter(this, "lblReferenceValue", function() {
        return this._lblReferenceValue;
      });
      
      //setter method for Label Skin in the group:Skins
      defineSetter(this, "sknlblSeparator", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknlblSeparator=val;
        }
      });

      //getter method for Label Skin in the group:Skins
      defineGetter(this, "sknlblSeparator", function() {
        return this._sknlblSeparator;
      });
      
      //setter method for Label Field Skin in the group:Skins
      defineSetter(this, "sknlblField", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknlblField=val;
        }
      });

      //getter method for Label Field Skin in the group:Skins
      defineGetter(this, "sknlblField", function() {
        return this._sknlblField;
      });
      
      //setter method for Label Field Value Skin in the group:Skins
      defineSetter(this, "sknlblFieldValue", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknlblFieldValue=val;
        }
      });

      //getter method for Label Field Value Skin in the group:Skins
      defineGetter(this, "sknlblFieldValue", function() {
        return this._sknlblFieldValue;
      });
      
      //setter method for Action Button 1 Skin in the group:Skins
      defineSetter(this, "sknBtnAction1", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknBtnAction1=val;
        }
      });

      //getter method for Action Button 1 Skin in the group:Skins
      defineGetter(this, "sknBtnAction1", function() {
        return this._sknBtnAction1;
      });
      
      //setter method for Action Button 2 Skin in the group:Skins
      defineSetter(this, "sknBtnAction2", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknBtnAction2=val;
        }
      });

      //getter method for Action Button 2 Skin in the group:Skins
      defineGetter(this, "sknBtnAction2", function() {
        return this._sknBtnAction2;
      });
      
      
       //setter method for Error Button 2 Skin in the group:Skins
      defineSetter(this, "sknBtnError", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknBtnError=val;
        }
      });

      //getter method for Error Button Skin in the group:Skins
      defineGetter(this, "sknBtnError", function() {
        return this._sknBtnError;
      });
      
      //setter method for Action Button 1 Focus Skin in the group:Skins
      defineSetter(this, "sknBtnActionFocus1", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknBtnActionFocus1=val;
        }
      });

      //getter method for Action Button 1 Focus Skin in the group:Skins
      defineGetter(this, "sknBtnActionFocus1", function() {
        return this._sknBtnActionFocus1;
      });
      
      //setter method for Action Button 2 Focus Skin in the group:Skins
      defineSetter(this, "sknBtnActionFocus2", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknBtnActionFocus2=val;
        }
      });

      //getter method for Action Button 2 Focus Skin in the group:Skins
      defineGetter(this, "sknBtnActionFocus2", function() {
        return this._sknBtnActionFocus2;
      });
      
      //setter method for Edit Label Field Skin in the group:Skins
      defineSetter(this, "sknEditLblField", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknEditLblField=val;
        }
      });

      //getter method for Edit Label Field Skin in the group:Skins
      defineGetter(this, "sknEditLblField", function() {
        return this._sknEditLblField;
      });
      
      //setter method for Input Text Value Skin in the group:Skins
      defineSetter(this, "sknTxtValue", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknTxtValue=val;
        }
      });

      //getter method for Input Text Value Skin in the group:Skins
      defineGetter(this, "sknTxtValue", function() {
        return this._sknTxtValue;
      });
      
      //setter method for Non-Editable Container Skin in the group:Skins
      defineSetter(this, "sknNonEditbaleContainer", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknNonEditbaleContainer=val;
        }
      });

      //getter method for  Non-Editable Container Skin in the group:Skins
      defineGetter(this, "sknNonEditbaleContainer", function() {
        return this._sknNonEditbaleContainer;
      });
      
      //setter method for Acknowledgment Skin in the group:Skins
      defineSetter(this, "sknlblAcknowledgment", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknlblAcknowledgment=val;
        }
      });

      //getter method for Acknowledgment Skin Skin in the group:Skins
      defineGetter(this, "sknlblAcknowledgment", function() {
        return this._sknlblAcknowledgment;
      });
      
      //setter method for Reference Label Skin in the group:Skins
      defineSetter(this, "sknlblReference", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknlblReference=val;
        }
      });

      //getter method for Reference Label Skin Skin in the group:Skins
      defineGetter(this, "sknlblReference", function() {
        return this._sknlblReference;
      });
      
      //setter method for Reference Value Skin in the group:Skins
      defineSetter(this, "sknlblReferenceValue", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknlblReferenceValue=val;
        }
      });

      //getter method for Reference Value Skin Skin in the group:Skins
      defineGetter(this, "sknlblReferenceValue", function() {
        return this._sknlblReferenceValue;
      });
      
      //setter method for Acknowledgment Page in the group:Acknowledgment Screen
      defineSetter(this, "ackPage", function(val) {
        if((typeof val==='boolean') && (val !== "")){
          this._ackPage=val;
        }
      });

      //getter method for Acknowledgment Page in the group:Acknowledgment Screen
      defineGetter(this, "ackPage", function() {
        return this._ackPage;
      });
      
        
      
      //setter method for Payee Object Service in the group:AddPayeeServices
      defineSetter(this, "payeeObjectService", function(val) {
        if((typeof val=='string') && (val != "")){
          this._payeeObjectService=val;
        }
      });

      //getter method for Payee Object Service in the group:AddPayeeServices
      defineGetter(this, "payeeObjectService", function() {
        return this._payeeObjectService;
      });
      
      //setter method for Payee Object in the group:AddPayeeServices
      defineSetter(this, "payeeObject", function(val) {
        if((typeof val=='string') && (val != "")){
          this._payeeObject=val;
        }
      });

      //getter method for Payee Object in the group:AddPayeeServices
      defineGetter(this, "payeeObject", function() {
        return this._payeeObject;
      });
      
      //setter method for Payee Create Operation in the group:AddPayeeServices
      defineSetter(this, "payeeCREATEOperation", function(val) {
        if((typeof val=='string') && (val != "")){
          this._payeeCREATEOperation=val;
        }
      });

      //getter method for Payee Create Operation in the group:AddPayeeServices
      defineGetter(this, "payeeCREATEOperation", function() {
        return this._payeeCREATEOperation;
      });
      
      //setter method for Payee Create Criteria in the group:AddPayeeServices
      defineSetter(this, "payeeCREATECriteria", function(val) {
        if((typeof val=='string') && (val != "")){
          this._payeeCREATECriteria=val;
        }
      });

      //getter method for Payee Create Criteria in the group:AddPayeeServices
      defineGetter(this, "payeeCREATECriteria", function() {
        return this._payeeCREATECriteria;
      });
      
      //setter method for Payee Create Service Response Identifier in the group:AddPayeeServices
      defineSetter(this, "payeeCREATEIdentifier", function(val) {
        if((typeof val=='string') && (val != "")){
          this._payeeCREATEIdentifier=val;
        }
      });

      //getter method for Payee Create Service Response Identifier in the group:AddPayeeServices
      defineGetter(this, "payeeCREATEIdentifier", function() {
        return this._payeeCREATEIdentifier;
      });
      
      //setter method for Payee Edit Operation in the group:AddPayeeServices
      defineSetter(this, "payeeEDITOperation", function(val) {
        if((typeof val=='string') && (val != "")){
          this._payeeEDITOperation=val;
        }
      });

      //getter method for Payee Edit Operation in the group:AddPayeeServices
      defineGetter(this, "payeeEDITOperation", function() {
        return this._payeeEDITOperation;
      });
      
      //setter method for Payee Edit Criteria in the group:AddPayeeServices
      defineSetter(this, "payeeEDITCriteria", function(val) {
        if((typeof val=='string') && (val != "")){
          this._payeeEDITCriteria=val;
        }
      });

      //getter method for Payee Edit Criteria in the group:AddPayeeServices
      defineGetter(this, "payeeEDITCriteria", function() {
        return this._payeeEDITCriteria;
      });
      
      //setter method for Payee Edit Service Response Identifier in the group:AddPayeeServices
      defineSetter(this, "payeeEDITIdentifier", function(val) {
        if((typeof val=='string') && (val != "")){
          this._payeeEDITIdentifier=val;
        }
      });

      //getter method for Payee Edit Service Response Identifier in the group:AddPayeeServices
      defineGetter(this, "payeeEDITIdentifier", function() {
        return this._payeeEDITIdentifier;
      });
      
      defineSetter(this, "customCREATEOperation", function(val) {
        if((typeof val=='string') && (val != "")){
          this._customCREATEOperation = val;
        }
      });

      defineGetter(this, "customCREATEOperation", function() {
        return this._customCREATEOperation;
      }); 

      defineSetter(this, "customCREATEIdentifier", function(val) {
        if((typeof val=='string') && (val != "")){
          this._customCREATEIdentifier = val;
        }
      });

      defineGetter(this, "customCREATEIdentifier", function() {
        return this._customCREATEIdentifier;
      });
      
      defineSetter(this, "customCREATECriteria", function(val) {
        if((typeof val=='string') && (val != "")){
          this._customCREATECriteria = val;
        }
      });

      defineGetter(this, "customCREATECriteria", function() {
        return this._customCREATECriteria;
      });
      
      defineSetter(this, "customCREATEIdentifier", function(val) {
        if((typeof val=='string') && (val != "")){
          this._customCREATEIdentifier = val;
        }
      });

      defineGetter(this, "customCREATEIdentifier", function() {
        return this._customCREATEIdentifier;
      });
      
      defineSetter(this, "sknTextBoxError", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknTextBoxError=val;
        }
      });
      defineGetter(this, "sknTextBoxError", function() {
        return this._sknTextBoxError;
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
	  
	  defineGetter(this, 'sknTxtboxFocus', () => {
                return this._sknTxtboxFocus;
            });
      defineSetter(this, 'sknTxtboxFocus', value => {
                this._sknTxtboxFocus = value;
            });

    },
    /**
      * setParentScope.
      * This Method is exposed to the form to pass the Form Scope.
      */
    setParentScope: function(scope){
      this._parentScope = scope;
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

    setContext: function(context, scope) {
       if(context){
 //    if(!this.ParserUtilsManager){
        this.ParserUtilsManager = context['pManager'];
  //      }
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

    setUIElementsVisibilityBasedOnContracts: function(){
      if(!this.isEmptyNullUndefined(this._lblField1)){
        this.view.lblField1.isVisible = true;
        this.view.flx1.isVisible = true;
        this.view.lblField1.text = this.geti18nText(this._lblField1);
      }
      else{
        this.view.lblField1.isVisible = false;
        this.view.flx1.isVisible = false;
      }

      if(!this.isEmptyNullUndefined(this._lblField2)){
        this.view.lblField2.isVisible = true;
        this.view.flx2.isVisible = true;
        this.view.lblField2.text = this.geti18nText(this._lblField2);

      }
      else{
        this.view.lblField2.isVisible = false;
        this.view.flx2.isVisible = false;
      }
      
      if(!this.isEmptyNullUndefined(this._lblField3)){
        var dynamicLabel = [];
        var categoryId = this._context['billerCategoryId'];
        try{
          dynamicLabel = JSON.parse(this._lblField3);
        }
        catch(e){
          dynamicLabel = this._lblField3;
        }

        dynamicLabel = dynamicLabel.filter((function(record){
          if(record["category"]){
            var categories = record["category"];
            if(categories.includes(categoryId))
              return true;
            return false;
          }
        }));
        if(dynamicLabel.length > 0){
          this.view.lblField3.text = kony.i18n.getLocalizedString(dynamicLabel[0].text);  
          this.view.lblField3.isVisible = true;
        }
        else{
          this.view.lblField3.isVisible = false;
        }     
      }
      if(!this.isEmptyNullUndefined(this._lblField4)){
        this.view.lblField4.isVisible = true;
        this.view.flx4.isVisible = true;
        this.view.lblField4.text = this.geti18nText(this._lblField4);
      }
      else{
        this.view.lblField4.isVisible = false;
        this.view.flx4.isVisible = false;
      }
      if(!this.isEmptyNullUndefined(this._lblField5)){
        this.view.lblField5.isVisible = true;
        this.view.flx5.isVisible = true;
        this.view.lblField5.text = this.geti18nText(this._lblField5);
      }
      else{
        this.view.flx5.isVisible = false;
        this.view.lblField5.isVisible = false;
      }
      if(!this.isEmptyNullUndefined(this._lblField6)){
        this.view.lblField6.isVisible = true;
        this.view.flx6.isVisible = true;
        this.view.lblField6.text = this.geti18nText(this._lblField6);
      }
      else{
        this.view.flx6.isVisible = false;
        this.view.lblField6.isVisible = false;
      }
      if(!this.isEmptyNullUndefined(this._lblField7)){
        this.view.lblField7.isVisible = true;
        this.view.flx7.isVisible = true;
        this.view.lblField7.text = this.geti18nText(this._lblField7);
      }
      else{
        this.view.flx7.isVisible = false;
        this.view.lblField7.isVisible = false;
      }
      if(!this.isEmptyNullUndefined(this._lblEditField1)){
        this.view.lblEditField1.isVisible = true;
        this.view.lblEditField1.text = this.geti18nText(this._lblEditField1);
      }
      else{
        this.view.lblEditField1.isVisible = false;
      }
      
      if(!this.isEmptyNullUndefined(this._lblEditField2)){
        this.view.lblEditField2.isVisible = true;
        this.view.lblEditField2.text = this.geti18nText(this._lblEditField2);
      }
      else{
        this.view.lblEditField2.isVisible = false;
      }

      if(!this.isEmptyNullUndefined(this._lblFieldValue1)){
        this.view.flx1.isVisible = true;
        var tbx1JSON = this.getValue(this._lblFieldValue1);
        this.populateTextIntoLabelValue(tbx1JSON, "lblFieldValue1");
      }
      else{
        this.view.flx1.isVisible = false;
      }
      if(!this.isEmptyNullUndefined(this._lblFieldValue2)){
        this.view.flx2.isVisible = true;
        var tbx2JSON = this.getValue(this._lblFieldValue2);
        this.populateTextIntoLabelValue(tbx2JSON, "lblFieldValue2");

      }
      else{
        this.view.flx2.isVisible = false;
      }
      if(!this.isEmptyNullUndefined(this._lblFieldValue3)){
        this.view.flx3.isVisible = true;
        var tbx3JSON = this.getValue(this._lblFieldValue3);
       
        this.populateTextIntoLabelValue(tbx3JSON, "lblFieldValue3");
      }
      else{
        this.view.flx3.isVisible = false;
      }
      if(!this.isEmptyNullUndefined(this._lblFieldValue4)){
        this.view.flx4.isVisible = true;
        var tbx4JSON = this.getValue(this._lblFieldValue4);
        this.populateTextIntoLabelValue(tbx4JSON, "lblFieldValue4");
      }
      else{
        this.view.flx4.isVisible = false;
      }
      if(!this.isEmptyNullUndefined(this._lblFieldValue5)){
        this.view.flx5.isVisible = true;
        var tbx5JSON = this.getValue(this._lblFieldValue5);
        this.populateTextIntoLabelValue(tbx5JSON, "lblFieldValue5");
      }
      else{
        this.view.flx5.isVisible = false;
      }
      if(!this.isEmptyNullUndefined(this._lblFieldValue6)){
        this.view.flx6.isVisible = true;
        var tbx6JSON = this.getValue(this._lblFieldValue6);
        this.populateTextIntoLabelValue(tbx6JSON, "lblFieldValue6");
      }
      else{
        this.view.flx6.isVisible = false;
      }
      if(!this.isEmptyNullUndefined(this._lblFieldValue7)){
        this.view.flx7.isVisible = true;
        var tbx7JSON = this.getValue(this._lblFieldValue7);
        this.populateTextIntoLabelValue(tbx7JSON, "lblFieldValue7");
      }
      else{
        this.view.flx7.isVisible = false;
      }
      
      if(!this.isEmptyNullUndefined(this._txtEditValue1)){
        this.view.txtEditValue1.isVisible = true;
        this.view.txtEditValue1.parent.isVisible = true;    
        var tbx7JSON = JSON.parse(this._txtEditValue1);
        this.mapVerifyTextBoxValueToContext(tbx7JSON, "txtEditValue1");
        this.populateVerifyTextIntoTextInput(tbx7JSON, "txtEditValue1");
        this.updateContext("txtEditValue1",this.view.txtEditValue1.text);

      }
      else{
        this.view.txtEditValue1.isVisible = false;
        this.view.txtEditValue1.parent.isVisible = false;
      }
      
        if(!this.isEmptyNullUndefined(this._txtEditValue2)){
        this.view.txtEditValue2.isVisible = true;
        this.view.txtEditValue2.parent.isVisible = true;
           var tbx8JSON = JSON.parse(this._txtEditValue2);
        this.mapVerifyTextBoxValueToContext(tbx8JSON, "txtEditValue2");
        this.populateVerifyTextIntoTextInput(tbx8JSON, "txtEditValue2");
        this.updateContext("txtEditValue2",this.view.txtEditValue2.text);
      }
      else{
        this.view.txtEditValue2.isVisible = false;
        this.view.txtEditValue2.parent.isVisible = false;
      }
      
      if(!this.isEmptyNullUndefined(this._lblReferenceValue)){
        this.view.lblReferenceValue.isVisible = true;
        var lblReferenceValueJSON = this.getValue(this._lblReferenceValue);
        this.populateTextIntoLabelValue(lblReferenceValueJSON, "lblReferenceValue");
      }
      else{
        this.view.lblReferenceValue.isVisible = false;
      }
      if(!this.isEmptyNullUndefined(this._lblReference)){
        this.view.lblReference.isVisible = true;
         this.view.lblReference.text = this.geti18nText(this._lblReference);
      }
      else{
        this.view.lblReference.isVisible = false;
      }
      if(!this.isEmptyNullUndefined(this._lblAcknowledgementSuccess)){
        this.view.lblAcknowledgmentSuccess.isVisible = true;
         this.view.lblAcknowledgmentSuccess.text = this.geti18nText(this._lblAcknowledgementSuccess);
      }
      else{
        this.view.lblAcknowledgmentSuccess.isVisible = false;
      }
      this.visibilityOfDynamicFieldInAckVerifyScreens();    
    },
    
    visibilityOfDynamicFieldInAckVerifyScreens:function(){
      var billerCategory = this._context['billerCategoryId'];
      if(billerCategory == "2" || billerCategory == "4"){
        this.view.flx3.isVisible = true;
      }
      else{
         this.view.flx3.isVisible = false;
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
      var contractJSON = JSON.parse(contractJSON);
      if(!this.isEmptyNullUndefined(contractJSON) && !this.isEmptyNullUndefined(contractJSON.mapping)){
        var inputMapper = contractJSON.mapping;
        this.textInputsMapping[textBoxID] = inputMapper;
      }
    },
    
        mapVerifyTextBoxValueToContext: function(contractJSON, textBoxID) {
      if(!this.isEmptyNullUndefined(contractJSON) && !this.isEmptyNullUndefined(contractJSON.mapping)){
        var inputMapper = contractJSON.mapping.substring(5,contractJSON.mapping.length-1);
        this.textInputsMapping[textBoxID] = inputMapper;
      }
    },
    
    populateTextIntoLabelValue: function (contractJSON, srcWidget) {
      if (!this.isEmptyNullUndefined(contractJSON)) {
        var contractJSONValue = JSON.parse(contractJSON);
        if (contractJSONValue.hasOwnProperty('mask')) {
          if (contractJSONValue.mask  === "true" || contractJSONValue.mask  === "True" || contractJSONValue.mask  === "TRUE") {
            if(contractJSONValue.mapping.length>=5){
              var maskValueLength = contractJSONValue.mapping.length;
              var maskLabelValue = "";
              for(var i=0;i<maskValueLength-4;i++){
                maskLabelValue = maskLabelValue + "X";
              }
              maskLabelValue = maskLabelValue + contractJSONValue.mapping.substr(contractJSONValue.mapping.length - 4);
              this.view[srcWidget].text = maskLabelValue
            }
            else{
              this.view[srcWidget].text = contractJSONValue.mapping;
            }
          }
          else {
            this.view[srcWidget].text = contractJSONValue.mapping;
          }
        }
        else{
          this.view[srcWidget].text = contractJSONValue.mapping;
        }
        //dynamic field - formatting
        if(srcWidget == "lblFieldValue3"){
          if(this._context['countryCode'] !== null && this._context['countryCode'] !== undefined && this._context['countryCode'] !== null  !== "" && this._context['billerCategoryId'] == "2"){
            this.view[srcWidget].text = "(" + this._context['countryCode'] + ")" + " " +"-" + " "+contractJSONValue.mapping;                                 
          }
        }
        
     /*   if(this.view[srcWidget].text!== "" && this.view[srcWidget].text.length>=36){
          this.view[srcWidget].parent.height = "70dp";
          //this.view[srcWidget].top = "4dp";
        }*/
         if(this.view[srcWidget].text == "" || this.view[srcWidget].text == null  || this.view[srcWidget].text == undefined){
          this.view[srcWidget].parent.isVisible  = false;            
      }
        
      }

    },
  

    populateVerifyTextIntoTextInput: function(contractJSON,srcWidget){
      if(!this.isEmptyNullUndefined(contractJSON)) {
        var contextValue =  this.ParserUtilsManager.getParsedValue(contractJSON.mapping);
        var i18nValueForPlaceholder = kony.i18n.getLocalizedString(contractJSON.placeHolder);
        var placeHolderValue = i18nValueForPlaceholder !== null ?
            i18nValueForPlaceholder:contractJSON.placeHolder;
        var inputModeValue = this.ParserUtilsManager.getParsedValue(contractJSON.inputMode);
        if(inputModeValue === "Numeric")
        {
          inputModeValue = constants.TEXTBOX_INPUT_MODE_NUMERIC;
        }
        else{
          inputModeValue = constants.TEXTBOX_INPUT_MODE_ANY;
        }
        if (contractJSON.hasOwnProperty('mask')) {
          if (contractJSON.mask  === "true" || contractJSON.mask  === "True" || contractJSON.mask  === "TRUE") {
            this.view[srcWidget].secureTextEntry = true;
            if (contractJSON.hasOwnProperty('inputMode')) {
              if (contractJSON.inputMode === 'Numeric') {
                this.view[srcWidget].restrictCharactersSet =
                  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_-\\?/+={[]}:;,.<>'`|\"";
              }
            }
          }
          else {
            this.view[srcWidget].secureTextEntry = false;
          }
        }
        this.view[srcWidget].text = contextValue;
        this.view[srcWidget].placeholder = placeHolderValue;
        this.view[srcWidget].textInputMode = inputModeValue
      }
    },
    
   
    confirmAddPayeeAction:function(){
     kony.print("in confirm add payee");
    },
    makeBillPayment: function(){
     kony.print("in makeBillPayment");
      
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
    resetComponentData: function() {
      this.ParserUtilsManager.clearContext(this.textInputsMapping);
      this.textInputsMapping = {};
      this.componentContext = {};
    
  },
    initActions: function(){
      var scope = this;
      this.view.btn1.onClick = this.performDataValidationOrAction.bind(this);
      this.view.btn2.onClick = this.actionHandlerVerifyAckScreen.bind(this,this.ParserUtilsManager.context,this._btn2);
      this.view.btnError.onClick = this.actionHandlerVerifyAckScreen.bind(this,this.ParserUtilsManager.context,this._btnError);
      this.view.txtEditValue1.onTextChange =  this.minFillValidation.bind(this,"txtEditValue1");
      this.view.txtEditValue2.onTextChange = this.minFillValidation.bind(this,"txtEditValue2");
      this.view.lblField1Edit.onTouchEnd =this.actionHandler.bind(this,this.ParserUtilsManager.context,this._lblField1Edit);
      this.view.lblField2Edit.onTouchEnd = this.actionHandler.bind(this,this.ParserUtilsManager.context,this._lblField2Edit);
      this.view.lblField3Edit.onTouchEnd = this.actionHandler.bind(this,this.ParserUtilsManager.context,this._lblField3Edit);
      this.view.lblField4Edit.onTouchEnd = this.actionHandler.bind(this,this.ParserUtilsManager.context,this._lblField4Edit);
      this.view.lblField5Edit.onTouchEnd = this.actionHandler.bind(this,this.ParserUtilsManager.context,this._lblField5Edit);
      this.view.lblField6Edit.onTouchEnd = this.actionHandler.bind(this,this.ParserUtilsManager.context,this._lblField6Edit);
      this.view.lblField7Edit.onTouchEnd = this.actionHandler.bind(this,this.ParserUtilsManager.context,this._lblField7Edit);
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
    
    confirmBtnRight1OnClick: function() {
      var self = this;
      var objSvcName = this.getValue(this._payeeObjectService);
      var objName = this.getValue(this._payeeObject);
      var operationName = this.getValue(this._payeeCREATEOperation);
      var criteria=this.getCriteria(this._payeeCREATECriteria);
   //   if (criteria["isBusinessPayee"] === "") {
        criteria["isBusinessPayee"] = "0";
   //   }
      if(typeof(this.ParserUtilsManager.context['cif']) !== "string" )
      criteria['cif'] = JSON.stringify(this.ParserUtilsManager.context['cif']);
      var identifier = this.getValue(this._payeeCREATEIdentifier);
      this.addPayeeDAO.createPayee
      (objSvcName,objName,operationName,criteria,this.onSuccessCreatePayee,identifier,self.onError);

    },
    
    onSuccessCreatePayee: function(response, unicode) {
      
       var tempContext = this.ParserUtilsManager.context;
      if(response.hasOwnProperty("dbpErrCode")){ 
        tempContext['serviceSuccess'] = false;
        this.actionHandlerVerifyAckScreenNavigate(tempContext,this._btn1);
      }
      else{
         tempContext['serviceSuccess'] = true;
         tempContext['response'] = response;
      this.actionHandlerVerifyAckScreenNavigate(tempContext,this._btn1);     
      }
      var contextToBeCleared = ["street","addressLine2","cityName","state","countryName","zipCode","companyName","phone","accountNumber","reenteraccountNumber","zipCode"];
      this.ParserUtilsManager.clearContext(contextToBeCleared);
      kony.application.dismissLoadingScreen();
    },

    onError: function() {
       var tempContext = this.ParserUtilsManager.context;
        tempContext['serviceSuccess'] = false;
      this.actionHandlerVerifyAckScreenNavigate(tempContext,this._btn1);
      var contextToBeCleared = ["street","addressLine2","cityName","state","countryName","zipCode","companyName","phone","accountNumber","reenteraccountNumber","zipCode"];
      this.ParserUtilsManager.clearContext(contextToBeCleared);
     kony.application.dismissLoadingScreen();
    },
    
    actionHandlerVerifyAckScreenNavigate:function(context, property){
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
    
    actionHandlerVerifyAckScreen: function(context, property) {	
      
      if(this._ackPage === false){
        this.confirmBtnRight1OnClick();
      }
      else{
        this.actionHandlerVerifyAckScreenNavigate(context,property);
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
    
    setSkins : function(){
      if(!this.isEmptyNullUndefined(this._sknNonEditbaleContainer)){
        this.view.flxDetailContainer.skin=this._sknNonEditbaleContainer;
      }
      for(var i=1;i<=this._maxNonEditFields;i++)
      {
        if(!this.isEmptyNullUndefined(this._sknlblField)){
          this.view["lblField"+i].skin=this._sknlblField;
        }
        if(!this.isEmptyNullUndefined(this._sknlblFieldValue)){
          this.view["lblFieldValue"+i].skin=this._sknlblFieldValue;
        }
      }
      for(var i=1;i<=this._maxEditFields;i++){
        if(!this.isEmptyNullUndefined(this._sknEditLblField)){
          this.view["lblEditField"+i].skin=this._sknEditLblField;
        }
        if(!this.isEmptyNullUndefined(this._sknTxtValue)){
          this.view["txtEditValue"+i].skin=this._sknTxtValue;
        }
      }
      if(!this.isEmptyNullUndefined(this._sknBtnAction1)){
        this.view.btn1.skin=this._sknBtnAction1;
      }
      if(!this.isEmptyNullUndefined(this._sknBtnActionFocus1)){
        this.view.btn1.focusSkin=this._sknBtnActionFocus1;
      }
      if(!this.isEmptyNullUndefined(this._sknBtnAction2)){
        this.view.btn2.skin=this._sknBtnAction2;
      }
      if(!this.isEmptyNullUndefined(this._sknBtnActionFocus2)){
        this.view.btn2.focusSkin=this._sknBtnActionFocus2;
      }
      if(!this.isEmptyNullUndefined(this._sknlblAcknowledgment)){
        this.view.lblAcknowledgmentSuccess.skin=this._sknlblAcknowledgment;
      }
      if(!this.isEmptyNullUndefined(this._sknlblAcknowledgment)){
        this.view.lblAcknowledgmentError.skin=this._sknlblAcknowledgment;
      }
      if(!this.isEmptyNullUndefined(this._sknlblReference)){
        this.view.lblReference.skin=this._sknlblReference;
      }
      if(!this.isEmptyNullUndefined(this._sknlblReferenceValue)){
        this.view.lblReferenceValue.skin=this._sknlblReferenceValue;
      }
      
       if(!this.isEmptyNullUndefined(this._sknBtnError)){
       this.view.btnError.skin = this._sknBtnError;        
       this.view.btn1.skin = this._sknBtnError;
      this.view.btn1.focusSkin = this._sknBtnError;
       }
	   
	   
    },
    
    setImagesButtons : function(){
      if(!this.isEmptyNullUndefined(this._ackPage) && this._ackPage === true){
        this.view.imgAcknowledgmentSuccess.parent.isVisible=true;
      }
      else
        {
          this.view.imgAcknowledgmentSuccess.parent.isVisible=false;
        }
      if(!this.isEmptyNullUndefined(this._imgAcknowledgementSuccess)){
        this.view.imgAcknowledgmentSuccess.src = this.getValue(this._imgAcknowledgementSuccess);
        this.view.imgAcknowledgmentSuccess.isVisible=true;
      }
      else
        {
          this.view.imgAcknowledgmentSuccess.isVisible=false;
        }
      if(!this.isEmptyNullUndefined(this._btn1)){
        this.view.btn1.isVisible=true;
        var btn1Json = JSON.parse(this._btn1);
        this.populateButtonText(btn1Json, "btn1");
      }
      else
        {
          this.view.btn1.isVisible=false;
        }
      if(!this.isEmptyNullUndefined(this._btn2)){
        this.view.btn2.isVisible=true;
        var btn2Json = JSON.parse(this._btn2);
        this.populateButtonText(btn2Json, "btn2");
      }
      else
        {
          this.view.btn2.isVisible=false;
        }
      this.view.btnError.isVisible=false;
    },
    
    populateButtonText(param,widget){
      if(param !== null && param !== undefined && param !== ""){
        var text = this.geti18nText(param.text);
        this.view[widget].text = text;
      }
    },
    
    setImagesError:function(){
      if(!this.isEmptyNullUndefined(this._ackPage) && this._ackPage === true  && this._context['serviceSuccess'] == false){
        this.view.flxAcknowledgmentError.isVisible=true;
        this.view.flxAcknowledgmentSuccess.isVisible=false;
        this.view.flxDetailContainer.isVisible=false;
        this.view.flxEditFields.isVisible=false;  
        this.view.flxButtons.isVisible=true;
        
        if(!this.isEmptyNullUndefined(this._btnError)){
          this.view.btn1.isVisible = false;
          this.view.btn2.isVisible = false;
          this.view.btnError.isVisible=true;
          var btn1Json = JSON.parse(this._btnError);
          this.populateButtonText(btn1Json, "btnError");
        }
        if(!this.isEmptyNullUndefined(this._sknBtnAction1)){
          this.view.btn1.skin=this._sknBtnAction1;
        }
        if(!this.isEmptyNullUndefined(this._imgAcknowledgementError)){
          this.view.imgAcknowledgmentError.src = this.getValue(this._imgAcknowledgementError);
          this.view.imgAcknowledgmentError.isVisible=true;
        }
        else
        {
          this.view.imgAcknowledgmentError.isVisible=false;
        }
        if(!this.isEmptyNullUndefined(this._lblAcknowledgementError)){
          this.view.lblAcknowledgmentError.isVisible = true;
          this.view.lblAcknowledgmentError.text = this.geti18nText(this._lblAcknowledgementError);
        }
        else{
          this.view.lblAcknowledgmentError.isVisible = false;
        }
      }
      else
      {
        this.view.flxAcknowledgmentError.isVisible=false;
		this.view.flxDetailContainer.isVisible=true;
      }
    },
    
    setEditData : function(){
      if(!this.isEmptyNullUndefined(this._lblField1Edit)){
        this.view.lblField1Edit.isVisible = true;
      }
      else{
        this.view.lblField1Edit.isVisible = false;
      }
      if(!this.isEmptyNullUndefined(this._lblField2Edit)){
        this.view.lblField2Edit.isVisible = true;
      }
      else{
        this.view.lblField2Edit.isVisible = false;
      }
      if(!this.isEmptyNullUndefined(this._lblField3Edit)){
        this.view.lblField3Edit.isVisible = true;
      }
      else{
        this.view.lblField3Edit.isVisible = false;
      }
      if(!this.isEmptyNullUndefined(this._lblField4Edit)){
        this.view.lblField4Edit.isVisible = true;
      }
      else{
        this.view.lblField4Edit.isVisible = false;
      }
      if(!this.isEmptyNullUndefined(this._lblField5Edit)){
        this.view.lblField5Edit.isVisible = true;
      }
      else{
        this.view.lblField5Edit.isVisible = false;
      }
      if(!this.isEmptyNullUndefined(this._lblField6Edit)){
        this.view.lblField6Edit.isVisible = true;
      }
      else{
        this.view.lblField6Edit.isVisible = false;
      }
      if(!this.isEmptyNullUndefined(this._lblField7Edit)){
        this.view.lblField7Edit.isVisible = true;
      }
      else{
        this.view.lblField7Edit.isVisible = false;
      }
    },
    
    preShow: function(){
    if(this.isEmptyNullUndefined(this.ParserUtilsManager.getContextValue("verifyFlowType"))){
        this.resetComponentData();
      var flowType = {"verifyFlowType":"True"};
         this.ParserUtilsManager.setContext(flowType);
      }
      this.setUIElementsVisibilityBasedOnContracts();
      this.setEditData();
      this.initActions();
      this.setSkins();
      this.setImagesButtons();
      this.setImagesError();
      this.resetTextBoxesSkins();
      
    },
    
    postShow: function(){
      this.view.flxMainWrapper.minHeight = this.view.flxMainContainer.frame.height - this.view.flxButtons.frame.height - Number(this.view.flxButtons.top.substring(0,this.view.flxButtons.top.length-2)) + "dp";
    },
    
       /**
     * @api : minFillValidation
     * minimum field level validation to enable continue button.
     * @return : NA
     */
    minFillValidation: function(tbxWidget) {
      var object = this._payeeObject;
      var minFillconfig = JSON.parse(this._minFillMapping); 
        if(tbxWidget == "txtEditValue1" && this.view.txtEditValue1.isVisible){
          this.updateContext("txtEditValue1",this.view.txtEditValue1.text);
        }
        if(tbxWidget == "txtEditValue2" && this.view.txtEditValue2.isVisible){
          this.updateContext("txtEditValue2",this.view.txtEditValue2.text);
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
        this.view.btn1.skin = this._sknBtnAction1;
      }
      else{
        this.view.btn1.setEnabled(false);
        this.view.btn1.skin = this._sknBtnError;
      }
    },
    
     constructDVFInput: function(){                  
        var txtValue1 = JSON.parse(this._txtEditValue1)
        if(!this.isEmptyNullUndefined(txtValue1) && !this.isEmptyNullUndefined(txtValue1.mapping)){    
          txtValue1 = this.mapTextInputContractToDvfKey(txtValue1.mapping); 
        }
        var txtValue2 = JSON.parse(this._txtEditValue2)
        if(!this.isEmptyNullUndefined(txtValue2) && !this.isEmptyNullUndefined(txtValue2.mapping)){
          txtValue2 = this.mapTextInputContractToDvfKey(txtValue2.mapping);
        }
       
       
        var jsonToReturn = {
          "txtEditValue1": this.componentContext[txtValue1],
          "txtEditValue2" :this.componentContext[txtValue2]
        }      
        if(txtValue1 == "" || txtValue1 == null || txtValue1 == undefined){
          delete jsonToReturn['txtEditValue1'];
        }
        if(txtValue2 == "" || txtValue2 == null || txtValue2 == undefined){
          delete jsonToReturn['txtEditValue2'];
        }
        
        return jsonToReturn;         
      
    
    },
    
    performDataValidationOrAction: function(){
      if(this.view.txtEditValue1.isVisible && this.view.txtEditValue2.isVisible && this._ackPage === false){
        this.performDataValidation.call(this,this.actionHandlerVerifyAckScreen.bind(this,this.ParserUtilsManager.context,this._btn1));
      }
      else{
        this.actionHandlerVerifyAckScreen.call(this,this.ParserUtilsManager.context,this._btn1);
      }
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
         successOnValidation.call(this);
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
    
     resetTextBoxesSkins: function(){
      this.view.txtEditValue1.skin = this._sknTxtValue;
      this.view.txtEditValue2.skin = this._sknTxtValue;
	  this.view.txtEditValue1.focusSkin = this._sknTxtboxFocus;
      this.view.txtEditValue2.focusSkin = this._sknTxtboxFocus;
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
    
  invokedvfFieldErrorParser : function(dvfError){

        for(var iterator in dvfError){
          if("txtEditValue1" == iterator){
            this.view.txtEditValue1.skin = this._sknTextBoxError
          }
          if("txtEditValue2" == iterator){
            this.view.txtEditValue2.skin = this._sknTextBoxError
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
    
     /**
   * get i18n value for the String.
   *
   * @param {String} text
   * 
   * @return {String} - i18n value for string
   */
  geti18nText: function(text){
    var i18ntext = "";
    try{
      i18ntext = kony.i18n.getLocalizedString(text);
      if(i18ntext != "" && i18ntext != undefined && i18ntext != null){
        return i18ntext;
      }
    return text;
    }catch(e){
      kony.print(e);
    }
  }

  }

});