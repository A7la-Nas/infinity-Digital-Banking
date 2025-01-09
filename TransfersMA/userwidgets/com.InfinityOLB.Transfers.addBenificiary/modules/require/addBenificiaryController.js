define(['./BeneficiaryManagementDAO','./ParserUtilsManager','./AddBeneficiaryUtility','./EntitlementUtils','DataValidationFramework/DataValidationHandler'],function(BeneficiaryManagementDAO,ParserUtilsManager,AddBeneficiaryUtility,EntitlementUtils,DataValidationHandler) {

  return {

    constructor: function(baseConfig, layoutConfig, pspConfig) {
      // Contracts property names under Beneficiary Management Service group.
      this._beneficiaryobjectService = "";
      this._beneficiaryObject = "";
      this._beneficiaryCREATEOperation = "";
      this._beneficiaryCREATECriteria = "";
      this._beneficiaryCREATEIdentifier = "";
      this._beneficiaryEDITOperation = "";
      this._beneficiaryEDITCriteria = "";
      this._beneficiaryEDITIdentifier = "";
      this._beneficiaryGETOperation = "";
      this._beneficiaryGETCriteria = "";
      this._beneficiaryGETIdentifier = "";

      // Contracts property names under P2P Management Service group.
      this._payeeObjectService = "";
      this._payeeObject = "";
      this._payeeCREATEOperation = "";
      this._payeeCREATECriteria = "";
      this._payeeCREATEIdentifier = "";
      this._payeeEDITOperation = "";
      this._payeeEDITCriteria = "";
      this._payeeEDITIdentifier = "";

      // Contracts property names under Component Configs group.
      this._BNFTYPES = "";
      this._BREAKPTS = "";
      this._FLOWTYPES = "";

      // Contracts property names under Context group.
      this._selectedflowType = "";
      this._accountNumber = "";
      this._swiftCode = "";
      this._routingNumber = "";
      this._nickName = "";
      this._recepientName = "";
      this._selectedUserRoleType = "";
      this._selectedBeneficiaryType = "";
      this._selectedRadioTextInputValue = "";
      this._selectedRadioBackendValue = "";

      // Contracts property names under Account Number group.
      this._masking = "";
      this._accountNumberFormat = "";
      this._maskeyeicon = "";
      this._unmaskeyeicon = "";
      
      // Contracts property names under Account Number Validation group.
      this._objName = "";
      this._operationName = "";
      this._serviceName = "";
      this._criteria = "";

      // Contracts property names under Add Beneficiary group.
      this._textInput1Label = "";
      this._textInput1Value = "";
      this._textInput1Enabled = "";
      this._textInput2Label = "";
      this._textInput2Value = "";
      this._textInput2Enabled = "";
      this._textInput3Label = "";
      this._textInput3Value = "";
      this._textInput3Enabled = "";
      this._textInput4Label = "";
      this._textInput4Value = "";
      this._textInput4Enabled = "";
      this._textInput5Label = "";
      this._textInput5Value = "";
      this._textInput5Enabled = "";
      this._radioInput1Label = "";
      this._radioInput1Value = "";
      this._radioInputTextLabel = "";
      this._radioInputTextValue = "";
      this._addBeneficiaryButton1 = "";
      this._addBeneficiaryButton2 = "";
      this._addBeneficiaryButton3 = "";
      this._section1Title = "";

      // Contracts property names under Review - Added Beneficiary group.
      this._reviewSectionTitle = "";
      this._reviewRow1Label = "";
      this._reviewRow1Value = "";
      this._reviewRow2Label = "";
      this._reviewRow2Value = "";
      this._reviewRow3Label = "";
      this._reviewRow3Value = "";
      this._reviewRow4Label = "";
      this._reviewRow4Value = "";
      this._reviewRow5Label = "";
      this._reviewRow5Value = "";
      this._reviewButton1 = "";
      this._reviewButton2 = "";
      this._reviewButton3 = "";
      this._reviewCancelYesButton = "";

      // Contracts property names under Acknowledgement - Added Beneficiary group.
      this._acknowledgementTitle = "";
      this._acknowledgementReferenceLabel = "";
      this._acknowledgementReferenceValue = "";
      this._acknowledgementText = "";
      this._acknowledgementImage = "";
      this._acknowledgementButton1 = "";
      this._acknowledgementButton2 = "";
      this._acknowledgmentButton3 = "";
      this._acknowledgementSection2Title = "";
      this._acknowledgementRow1Label = "";
      this._acknowledgementRow1Value = "";
      this._acknowledgementRow2Label = "";
      this._acknowledgementRow2Value = "";
      this._acknowledgementRow3Label = "";
      this._acknowledgementRow3Value = "";
      this._acknowledgementRow4Label = "";
      this._acknowledgementRow4Value = "";
      this._acknowledgementRow5Label = "";
      this._acknowledgementRow5Value = "";

      // Contracts property names under Skins group.
      this._sknAddTextBoxHover = "";
      this._sknBlockTitle = "";
      this._sknSectionHeader = "";
      this._sknReviewLabel = "";
      this._sknReviewValue = "";
      this._sknAcknowledgementSuccess = "";
      this._sknAcknowledgementReferenceNumberLabel = "";
      this._sknAcknowledgementReferenceNumberValue = "";
      this._sknPrimaryButton = "";
      this._sknPrimaryButtonDisabled = "";
      this._sknPrimaryButtonFocus = "";
      this._sknPrimaryButtonHover = "";
      this._sknSecondaryButton = "";
      this._unmaskeyeiconskin = "";
      this._maskeyeiconskin = "";
      this._accountNumberSkin = "";
      this._sknSecondaryButtonHover = "";
      this._sknSecondaryButtonFocus = "";
      this._sknAddLabel = "";
      this._sknAddTextBoxEnabled = "";
      this._sknAddTextBoxDisabled = "";
      this._sknAddTextBoxPlaceHolder = "";
      this._sknAddTextBoxFocus = "";

      // Contracts property names under Beneficiary Add Category group.
      this._selectionTitle = "";
      this._beneficiaryTypeSelectionVisibility1 = "";
      this._beneficiaryTypeSelectionVisibility2 = "";
      this._radioIcon1 = "";
      this._radioIcon2 = "";
      this._radioIcon1Criteria = "";
      this._radioIcon2Criteria = "";
      this._selectionLabel1 = "";
      this._selectionLabel2 = "";
      this._selectionButton1 = "";
      this._selectionButton2 = "";
      this._selectionButton3 = "";

      // Contracts under Quick Links.
      this._quickLink1 = "";
      this._quickLink2 = "";
      this._quickLink3 = "";
      this._quickLink4 = "";
      this._quickLinkTextSkin = "";
	  
	  // Contracts under P2P Quick Links.
      this._p2pQuickLink1 = "";
      this._p2pQuickLink2 = "";

      // Contracts property instance variables.
      this.beneficiaryManagementDAO = new BeneficiaryManagementDAO();
      this.parserUtilsManager = new ParserUtilsManager();
      this.dataValidationHandler = new DataValidationHandler();     
      this.addBenefificaryUtility = new AddBeneficiaryUtility();
      this.EntitlementUtils = new EntitlementUtils();

      this.beneficiaryData = {};
      this.context = {};
      this.entitlementContext = {};
      this.fieldsEnabledMap = {};
      this.parentScope = "";
      this.textInputsMapping = {};
      this.componentContext = {};
      this.map = {};
      this.radioMappings = {};
      this._dvfConfig = "";
      this._minFillMapping = "";
      this.formatComponentValues={};
      this.radioIcon1InitialValue="";
      this.selectedReviewIcon="";
      this.selectedReviewText="";
      this.addtbx1SkinState ="";
      this.addtbx2SkinState ="";
      this.addtbx3SkinState ="";
      this.addtbx4SkinState ="";
      this.addtbx5SkinState ="";
      this._sknAddTextBoxError = "";
      this.resultAccNumberValidation =[];
      this.isAccNumValid = "";
    },

    // getters and setters of contract definitions.
    initGettersSetters: function() {
	
	   defineSetter(this, "p2pQuickLink1", function(val) {
        if((typeof val ==='string') && (val !== "")){
          this._p2pQuickLink1 = val;          
        }
      });
      defineGetter(this, "p2pQuickLink1", function() {
        return this._p2pQuickLink1;
      });
      
      defineSetter(this, "p2pQuickLink2", function(val) {
        if((typeof val ==='string') && (val !== "")){
          this._p2pQuickLink2 = val;          
        }
      });
      defineGetter(this, "p2pQuickLink2", function() {
        return this._p2pQuickLink2;
      });
	  
      defineSetter(this, "beneficiaryTypeSelectionVisibility1", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._beneficiaryTypeSelectionVisibility1=val;          
        }
      });
      defineGetter(this, "beneficiaryTypeSelectionVisibility1", function() {
        return this._beneficiaryTypeSelectionVisibility1;
      });

      defineSetter(this, "beneficiaryTypeSelectionVisibility2", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._beneficiaryTypeSelectionVisibility2=val;          
        }
      });
      defineGetter(this, "beneficiaryTypeSelectionVisibility2", function() {
        return this._beneficiaryTypeSelectionVisibility2;
      });

      defineSetter(this, "radioIcon1", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._radioIcon1=val;          
        }
      });
      defineGetter(this, "radioIcon1", function() {
        return this._radioIcon1;
      });

      defineSetter(this, "radioIcon2", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._radioIcon2=val;          
        }
      });
      defineGetter(this, "radioIcon2", function() {
        return this._radioIcon2;
      });

      defineSetter(this, "radioIcon3", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._radioIcon3=val;          
        }
      });
      defineGetter(this, "radioIcon3", function() {
        return this._radioIcon3;
      });

      defineSetter(this, "radioIcon1Criteria", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._radioIcon1Criteria=val;          
        }
      });
      defineGetter(this, "radioIcon1Criteria", function() {
        return this._radioIcon1Criteria;
      });

      defineSetter(this, "radioIcon2Criteria", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._radioIcon2Criteria=val;          
        }
      });
      defineGetter(this, "radioIcon2Criteria", function() {
        return this._radioIcon2Criteria;
      });

      defineSetter(this, "selectionLabel1", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._selectionLabel1=val;          
        }
      });
      defineGetter(this, "selectionLabel1", function() {
        return this._selectionLabel1;
      });

      defineSetter(this, "selectionLabel2", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._selectionLabel2=val;          
        }
      });
      defineGetter(this, "selectionLabel2", function() {
        return this._selectionLabel2;
      });

      defineSetter(this, "selectionButton1", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._selectionButton1=val;          
        }
      });
      defineGetter(this, "selectionButton1", function() {
        return this._selectionButton1;
      });

      defineSetter(this, "selectionButton2", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._selectionButton2=val;          
        }
      });
      defineGetter(this, "selectionButton2", function() {
        return this._selectionButton2;
      });

      defineSetter(this, "selectionButton3", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._selectionButton3=val;          
        }
      });
      defineGetter(this, "selectionButton3", function() {
        return this._selectionButton3;
      });

      defineSetter(this, "selectionTitle", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._selectionTitle=val;          
        }
      });
      defineGetter(this, "selectionTitle", function() {
        return this._selectionTitle;
      });

      defineSetter(this, "selectedUserRoleType", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._selectedUserRoleType=val;
        }
      });
      defineGetter(this, "selectedUserRoleType", function() {
        return this._selectedUserRoleType;
      });

      defineSetter(this, "beneficiaryobjectService", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._beneficiaryobjectService=val;          
        }
      });
      defineGetter(this, "beneficiaryobjectService", function() {
        return this._beneficiaryobjectService;
      });

      defineSetter(this, "selectedRadioBackendValue", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._selectedRadioBackendValue=val;          
        }
      });
      defineGetter(this, "selectedRadioBackendValue", function() {
        return this._selectedRadioBackendValue;
      });

      defineSetter(this, "payeeObjectService", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._payeeObjectService=val;          
        }
      });
      defineGetter(this, "payeeObjectService", function() {
        return this._payeeObjectService;
      });

      defineSetter(this, "payeeObject", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._payeeObject=val;          
        }
      });
      defineGetter(this, "payeeObject", function() {
        return this._payeeObject;
      });

      defineSetter(this, "payeeCREATEOperation", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._payeeCREATEOperation=val;          
        }
      });
      defineGetter(this, "payeeCREATEOperation", function() {
        return this._payeeCREATEOperation;
      });

      defineSetter(this, "payeeCREATECriteria", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._payeeCREATECriteria=val;          
        }
      });
      defineGetter(this, "payeeCREATECriteria", function() {
        return this._payeeCREATECriteria;
      });

      defineSetter(this, "payeeCREATEIdentifier", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._payeeCREATEIdentifier=val;          
        }
      });
      defineGetter(this, "payeeCREATEIdentifier", function() {
        return this._payeeCREATEIdentifier;
      });

      defineSetter(this, "payeeEDITOperation", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._payeeEDITOperation=val;          
        }
      });
      defineGetter(this, "payeeEDITOperation", function() {
        return this._payeeEDITOperation;
      });

      defineSetter(this, "payeeEDITCriteria", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._payeeEDITCriteria=val;          
        }
      });
      defineGetter(this, "payeeEDITCriteria", function() {
        return this._payeeEDITCriteria;
      });

      defineSetter(this, "payeeEDITIdentifier", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._payeeEDITIdentifier=val;          
        }
      });
      defineGetter(this, "payeeEDITIdentifier", function() {
        return this._payeeEDITIdentifier;
      });

      defineSetter(this, "BNFTYPES", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._BNFTYPES=val;
        }
      });
      defineGetter(this, "BNFTYPES", function() {
        return this._BNFTYPES;
      });

      defineSetter(this, "blockTitle", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._blockTitle=val;
        }
      });
      defineGetter(this, "blockTitle", function() {
        return this._blockTitle;
      });

      defineSetter(this, "sknAddLabel", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknAddLabel=val;
        }
      });
      defineGetter(this, "sknAddLabel", function() {
        return this._sknAddLabel;
      });

      defineSetter(this, "textInput1Label", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._textInput1Label=val;
        }
      });
      defineGetter(this, "textInput1Label", function() {
        return this._textInput1Label;
      });

      defineSetter(this, "reviewSectionTitle", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._reviewSectionTitle=val;
        }
      });
      defineGetter(this, "reviewSectionTitle", function() {
        return this._reviewSectionTitle;
      });

      defineSetter(this, "acknowledgementTitle", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._acknowledgementTitle=val;
        }
      });
      defineGetter(this, "acknowledgementTitle", function() {
        return this._acknowledgementTitle;
      });

      defineSetter(this, "selectedflowType", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._selectedflowType=val;
        }
      });
      defineGetter(this, "selectedflowType", function() {
        return this._selectedflowType;
      });

      defineSetter(this, "section1Title", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._section1Title=val;
        }
      });
      defineGetter(this, "section1Title", function() {
        return this._section1Title;
      });

      defineSetter(this, "masking", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._masking=val;
        }
      });
      defineGetter(this, "masking", function() {
        return this._masking;
      });

      defineSetter(this, "beneficiaryObject", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._beneficiaryObject=val;
        }
      });
      defineGetter(this, "beneficiaryObject", function() {
        return this._beneficiaryObject;
      });

      defineSetter(this, "sknAddTextBoxEnabled", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknAddTextBoxEnabled=val;
        }
      });
      defineGetter(this, "sknAddTextBoxEnabled", function() {
        return this._sknAddTextBoxEnabled;
      });

      defineSetter(this, "sknAddTextBoxDisabled", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknAddTextBoxDisabled=val;
        }
      });
      defineGetter(this, "sknAddTextBoxDisabled", function() {
        return this._sknAddTextBoxDisabled;
      });

      defineSetter(this, "textInput1Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._textInput1Value=val;
        }
      });
      defineGetter(this, "textInput1Value", function() {
        return this._textInput1Value;
      });

      defineSetter(this, "reviewRow1Label", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._reviewRow1Label=val;
        }
      });
      defineGetter(this, "reviewRow1Label", function() {
        return this._reviewRow1Label;
      });

      defineSetter(this, "acknowledgementText", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._acknowledgementText=val;
        }
      });
      defineGetter(this, "acknowledgementText", function() {
        return this._acknowledgementText;
      });

      defineSetter(this, "accountNumber", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._accountNumber=val;
        }
      });
      defineGetter(this, "accountNumber", function() {
        return this._accountNumber;
      });

      defineSetter(this, "BREAKPTS", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._BREAKPTS=val;
        }
      });
      defineGetter(this, "BREAKPTS", function() {
        return this._BREAKPTS;
      });

      defineSetter(this, "accountNumberFormat", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._accountNumberFormat=val;
        }
      });
      defineGetter(this, "accountNumberFormat", function() {
        return this._accountNumberFormat;
      });

      defineSetter(this, "beneficiaryCREATEOperation", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._beneficiaryCREATEOperation=val;
        }
      });
      defineGetter(this, "beneficiaryCREATEOperation", function() {
        return this._beneficiaryCREATEOperation;
      });

      defineSetter(this, "sknAddTextBoxPlaceHolder", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknAddTextBoxPlaceHolder=val;
        }
      });
      defineGetter(this, "sknAddTextBoxPlaceHolder", function() {
        return this._sknAddTextBoxPlaceHolder;
      });

      defineSetter(this, "textInput1Enabled", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._textInput1Enabled=val;
        }
      });
      defineGetter(this, "textInput1Enabled", function() {
        return this._textInput1Enabled;
      });

      defineSetter(this, "reviewRow1Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._reviewRow1Value=val;
        }
      });
      defineGetter(this, "reviewRow1Value", function() {
        return this._reviewRow1Value;
      });

      defineSetter(this, "acknowledgementImage", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._acknowledgementImage=val;
        }
      });
      defineGetter(this, "acknowledgementImage", function() {
        return this._acknowledgementImage;
      });

      defineSetter(this, "swiftCode", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._swiftCode=val;
        }
      });
      defineGetter(this, "swiftCode", function() {
        return this._swiftCode;
      });

      defineSetter(this, "FLOWTYPES", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._FLOWTYPES=val;
        }
      });
      defineGetter(this, "FLOWTYPES", function() {
        return this._FLOWTYPES;
      });

      defineSetter(this, "maskeyeicon", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._maskeyeicon=val;
        }
      });
      defineGetter(this, "maskeyeicon", function() {
        return this._maskeyeicon;
      });

      defineSetter(this, "beneficiaryCREATECriteria", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._beneficiaryCREATECriteria=val;
        }
      });
      defineGetter(this, "beneficiaryCREATECriteria", function() {
        return this._beneficiaryCREATECriteria;
      });

      defineSetter(this, "sknAddTextBoxFocus", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknAddTextBoxFocus=val;
        }
      });
      defineGetter(this, "sknAddTextBoxFocus", function() {
        return this._sknAddTextBoxFocus;
      });

      defineSetter(this, "radioInput1Label", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._radioInput1Label=val;
        }
      });
      defineGetter(this, "radioInput1Label", function() {
        return this._radioInput1Label;
      });

      defineSetter(this, "reviewButton1", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._reviewButton1=val;
        }
      });
      defineGetter(this, "reviewButton1", function() {
        return this._reviewButton1;
      });

      defineSetter(this, "acknowledgementReferenceLabel", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._acknowledgementReferenceLabel=val;
        }
      });
      defineGetter(this, "acknowledgementReferenceLabel", function() {
        return this._acknowledgementReferenceLabel;
      });

      defineSetter(this, "routingNumber", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._routingNumber=val;
        }
      });
      defineGetter(this, "routingNumber", function() {
        return this._routingNumber;
      });

      defineSetter(this, "unmaskeyeicon", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._unmaskeyeicon=val;
        }
      });
      defineGetter(this, "unmaskeyeicon", function() {
        return this._unmaskeyeicon;
      });

      defineSetter(this, "beneficiaryCREATEIdentifier", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._beneficiaryCREATEIdentifier=val;
        }
      });
      defineGetter(this, "beneficiaryCREATEIdentifier", function() {
        return this._beneficiaryCREATEIdentifier;
      });

      defineSetter(this, "sknAddTextBoxHover", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknAddTextBoxHover=val;
        }
      });
      defineGetter(this, "sknAddTextBoxHover", function() {
        return this._sknAddTextBoxHover;
      });

      defineSetter(this, "radioInput1Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._radioInput1Value=val;
        }
      });
      defineGetter(this, "radioInput1Value", function() {
        return this._radioInput1Value;
      });

      defineSetter(this, "reviewButton2", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._reviewButton2=val;
        }
      });
      defineGetter(this, "reviewButton2", function() {
        return this._reviewButton2;
      });

      defineSetter(this, "acknowledgementReferenceValue", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._acknowledgementReferenceValue=val;
        }
      });
      defineGetter(this, "acknowledgementReferenceValue", function() {
        return this._acknowledgementReferenceValue;
      });

      defineSetter(this, "nickName", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._nickName=val;
        }
      });
      defineGetter(this, "nickName", function() {
        return this._nickName;
      });

      defineSetter(this, "beneficiaryEDITOperation", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._beneficiaryEDITOperation=val;
        }
      });   
      defineGetter(this, "beneficiaryEDITOperation", function() {
        return this._beneficiaryEDITOperation;
      });

      defineSetter(this, "sknBlockTitle", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknBlockTitle=val;
        }
      });
      defineGetter(this, "sknBlockTitle", function() {
        return this._sknBlockTitle;
      });

      defineSetter(this, "reviewButton3", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._reviewButton3=val;
        }
      });
      defineGetter(this, "reviewButton3", function() {
        return this._reviewButton3;
      });

      defineSetter(this, "recepientName", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._recepientName=val;
        }
      });
      defineGetter(this, "recepientName", function() {
        return this._recepientName;
      });

      defineSetter(this, "textInput2Label", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._textInput2Label=val;
        }
      });
      defineGetter(this, "textInput2Label", function() {
        return this._textInput2Label;
      });

      defineSetter(this, "beneficiaryEDITCriteria", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._beneficiaryEDITCriteria=val;
        }
      });
      defineGetter(this, "beneficiaryEDITCriteria", function() {
        return this._beneficiaryEDITCriteria;
      });

      defineSetter(this, "sknSectionHeader", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknSectionHeader=val;
        }
      });
      defineGetter(this, "sknSectionHeader", function() {
        return this._sknSectionHeader;
      });

      defineSetter(this, "acknowledgementSection2Title", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._acknowledgementSection2Title=val;
        }
      });
      defineGetter(this, "acknowledgementSection2Title", function() {
        return this._acknowledgementSection2Title;
      });

      defineSetter(this, "textInput2Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._textInput2Value=val;
        }
      });
      defineGetter(this, "textInput2Value", function() {
        return this._textInput2Value;
      });

      defineSetter(this, "reviewRow2Label", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._reviewRow2Label=val;
        }
      });
      defineGetter(this, "reviewRow2Label", function() {
        return this._reviewRow2Label;
      });

      defineSetter(this, "beneficiaryEDITIdentifier", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._beneficiaryEDITIdentifier=val;
        }
      });
      defineGetter(this, "beneficiaryEDITIdentifier", function() {
        return this._beneficiaryEDITIdentifier;
      });

      defineSetter(this, "sknReviewLabel", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknReviewLabel=val;
        }
      });
      defineGetter(this, "sknReviewLabel", function() {
        return this._sknReviewLabel;
      });
      defineSetter(this, "acknowledgementRow1Label", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._acknowledgementRow1Label=val;
        }
      });
      defineGetter(this, "acknowledgementRow1Label", function() {
        return this._acknowledgementRow1Label;
      });

      defineSetter(this, "selectedBeneficiaryType", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._selectedBeneficiaryType=val;
        }
      });
      defineGetter(this, "selectedBeneficiaryType", function() {
        return this._selectedBeneficiaryType;
      });

      defineSetter(this, "selectedRadioTextInputValue", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._selectedRadioTextInputValue=val;
        }
      });
      defineGetter(this, "selectedRadioTextInputValue", function() {
        return this._selectedRadioTextInputValue;
      });

      defineSetter(this, "textInput2Enabled", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._textInput2Enabled=val;
        }
      });
      defineGetter(this, "textInput2Enabled", function() {
        return this._textInput2Enabled;
      });

      defineSetter(this, "reviewRow2Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._reviewRow2Value=val;
        }
      });
      defineGetter(this, "reviewRow2Value", function() {
        return this._reviewRow2Value;
      });

      defineSetter(this, "beneficiaryGETOperation", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._beneficiaryGETOperation=val;
        }
      });
      defineGetter(this, "beneficiaryGETOperation", function() {
        return this._beneficiaryGETOperation;
      });

      defineSetter(this, "sknReviewValue", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknReviewValue=val;
        }
      });
      defineGetter(this, "sknReviewValue", function() {
        return this._sknReviewValue;
      });

      defineSetter(this, "acknowledgementRow1Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._acknowledgementRow1Value=val;
        }
      });
      defineGetter(this, "acknowledgementRow1Value", function() {
        return this._acknowledgementRow1Value;
      });

      defineSetter(this, "textInput3Label", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._textInput3Label=val;
        }
      });
      defineGetter(this, "textInput3Label", function() {
        return this._textInput3Label;
      });

      defineSetter(this, "reviewRow3Label", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._reviewRow3Label=val;
        }
      });
      defineGetter(this, "reviewRow3Label", function() {
        return this._reviewRow3Label;
      });

      defineSetter(this, "beneficiaryGETCriteria", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._beneficiaryGETCriteria=val;
        }
      });
      defineGetter(this, "beneficiaryGETCriteria", function() {
        return this._beneficiaryGETCriteria;
      });

      defineSetter(this, "sknAcknowledgementSuccess", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknAcknowledgementSuccess=val;
        }
      });
      defineGetter(this, "sknAcknowledgementSuccess", function() {
        return this._sknAcknowledgementSuccess;
      });

      defineSetter(this, "acknowledgementButton1", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._acknowledgementButton1=val;
        }
      });
      defineGetter(this, "acknowledgementButton1", function() {
        return this._acknowledgementButton1;
      });

      defineSetter(this, "textInput3Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._textInput3Value=val;
        }
      });
      defineGetter(this, "textInput3Value", function() {
        return this._textInput3Value;
      });

      defineSetter(this, "reviewRow3Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._reviewRow3Value=val;
        }
      });
      defineGetter(this, "reviewRow3Value", function() {
        return this._reviewRow3Value;
      });

      defineSetter(this, "beneficiaryGETIdentifier", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._beneficiaryGETIdentifier=val;
        }
      });
      defineGetter(this, "beneficiaryGETIdentifier", function() {
        return this._beneficiaryGETIdentifier;
      });

      defineSetter(this, "sknAcknowledgementReferenceNumberLabel", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknAcknowledgementReferenceNumberLabel=val;
        }
      });
      defineGetter(this, "sknAcknowledgementReferenceNumberLabel", function() {
        return this._sknAcknowledgementReferenceNumberLabel;
      });

      defineSetter(this, "acknowledgementButton2", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._acknowledgementButton2=val;
        }
      });
      defineGetter(this, "acknowledgementButton2", function() {
        return this._acknowledgementButton2;
      });

      defineSetter(this, "textInput3Enabled", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._textInput3Enabled=val;
        }
      });
      defineGetter(this, "textInput3Enabled", function() {
        return this._textInput3Enabled;
      });

      defineSetter(this, "reviewRow4Label", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._reviewRow4Label=val;
        }
      });
      defineGetter(this, "reviewRow4Label", function() {
        return this._reviewRow4Label;
      });

      defineSetter(this, "sknAcknowledgementReferenceNumberValue", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknAcknowledgementReferenceNumberValue=val;
        }
      });
      defineGetter(this, "sknAcknowledgementReferenceNumberValue", function() {
        return this._sknAcknowledgementReferenceNumberValue;
      });

      defineSetter(this, "acknowledgmentButton3", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._acknowledgmentButton3=val;
        }
      });
      defineGetter(this, "acknowledgmentButton3", function() {
        return this._acknowledgmentButton3;
      });

      defineSetter(this, "textInput4Label", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._textInput4Label=val;
        }
      });
      defineGetter(this, "textInput4Label", function() {
        return this._textInput4Label;
      });

      defineSetter(this, "reviewRow4Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._reviewRow4Value=val;
        }
      });
      defineGetter(this, "reviewRow4Value", function() {
        return this._reviewRow4Value;
      });

      defineSetter(this, "sknPrimaryButton", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknPrimaryButton=val;
        }
      });
      defineGetter(this, "sknPrimaryButton", function() {
        return this._sknPrimaryButton;
      });

      defineSetter(this, "textInput4Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._textInput4Value=val;
        }
      });
      defineGetter(this, "textInput4Value", function() {
        return this._textInput4Value;
      });

      defineSetter(this, "reviewRow5Label", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._reviewRow5Label=val;
        }
      });
      defineGetter(this, "reviewRow5Label", function() {
        return this._reviewRow5Label;
      });

      defineSetter(this, "acknowledgementRow2Label", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._acknowledgementRow2Label=val;
        }
      });
      defineGetter(this, "acknowledgementRow2Label", function() {
        return this._acknowledgementRow2Label;
      });

      defineSetter(this, "sknPrimaryButtonDisabled", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknPrimaryButtonDisabled=val;
        }
      });
      defineGetter(this, "sknPrimaryButtonDisabled", function() {
        return this._sknPrimaryButtonDisabled;
      });

      defineSetter(this, "textInput4Enabled", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._textInput4Enabled=val;
        }
      });
      defineGetter(this, "textInput4Enabled", function() {
        return this._textInput4Enabled;
      });

      defineSetter(this, "reviewRow5Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._reviewRow5Value=val;
        }
      });
      defineGetter(this, "reviewRow5Value", function() {
        return this._reviewRow5Value;
      });

      defineSetter(this, "acknowledgementRow2Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._acknowledgementRow2Value=val;
        }
      });
      defineGetter(this, "acknowledgementRow2Value", function() {
        return this._acknowledgementRow2Value;
      });

      defineSetter(this, "sknPrimaryButtonFocus", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknPrimaryButtonFocus=val;
        }
      });
      defineGetter(this, "sknPrimaryButtonFocus", function() {
        return this._sknPrimaryButtonFocus;
      });

      defineSetter(this, "textInput5Label", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._textInput5Label=val;
        }
      });
      defineGetter(this, "textInput5Label", function() {
        return this._textInput5Label;
      });

      defineSetter(this, "acknowledgementRow3Label", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._acknowledgementRow3Label=val;
        }
      });
      defineGetter(this, "acknowledgementRow3Label", function() {
        return this._acknowledgementRow3Label;
      });

      defineSetter(this, "sknPrimaryButtonHover", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknPrimaryButtonHover=val;
        }
      });
      defineGetter(this, "sknPrimaryButtonHover", function() {
        return this._sknPrimaryButtonHover;
      });

      defineSetter(this, "textInput5Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._textInput5Value=val;
        }
      });
      defineGetter(this, "textInput5Value", function() {
        return this._textInput5Value;
      });

      defineSetter(this, "acknowledgementRow3Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._acknowledgementRow3Value=val;
        }
      });
      defineGetter(this, "acknowledgementRow3Value", function() {
        return this._acknowledgementRow3Value;
      });

      defineSetter(this, "sknSecondaryButton", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknSecondaryButton=val;
        }
      });
      defineGetter(this, "sknSecondaryButton", function() {
        return this._sknSecondaryButton;
      });

      defineSetter(this, "textInput5Enabled", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._textInput5Enabled=val;
        }
      });
      defineGetter(this, "textInput5Enabled", function() {
        return this._textInput5Enabled;
      });

      defineSetter(this, "acknowledgementRow4Label", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._acknowledgementRow4Label=val;
        }
      });
      defineGetter(this, "acknowledgementRow4Label", function() {
        return this._acknowledgementRow4Label;
      });

      defineSetter(this, "sknSecondaryButtonHover", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknSecondaryButtonHover=val;
        }
      });
      defineGetter(this, "sknSecondaryButtonHover", function() {
        return this._sknSecondaryButtonHover;
      });

      defineSetter(this, "radioInputTextLabel", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._radioInputTextLabel=val;
        }
      });
      defineGetter(this, "radioInputTextLabel", function() {
        return this._radioInputTextLabel;
      });

      defineSetter(this, "radioInputTextValue", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._radioInputTextValue=val;
        }
      });
      defineGetter(this, "radioInputTextValue", function() {
        return this._radioInputTextValue;
      });

      defineSetter(this, "acknowledgementRow4Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._acknowledgementRow4Value=val;
        }
      });
      defineGetter(this, "acknowledgementRow4Value", function() {
        return this._acknowledgementRow4Value;
      });

      defineSetter(this, "sknSecondaryButtonFocus", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknSecondaryButtonFocus=val;
        }
      });
      defineGetter(this, "sknSecondaryButtonFocus", function() {
        return this._sknSecondaryButtonFocus;
      });

      defineSetter(this, "addBeneficiaryButton1", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._addBeneficiaryButton1=val;
        }
      });
      defineGetter(this, "addBeneficiaryButton1", function() {
        return this._addBeneficiaryButton1;
      });

      defineSetter(this, "acknowledgementRow5Label", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._acknowledgementRow5Label=val;
        }
      });
      defineGetter(this, "acknowledgementRow5Label", function() {
        return this._acknowledgementRow5Label;
      });

      defineSetter(this, "addBeneficiaryButton2", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._addBeneficiaryButton2=val;
        }
      });
      defineGetter(this, "addBeneficiaryButton2", function() {
        return this._addBeneficiaryButton2;
      });

      defineSetter(this, "acknowledgementRow5Value", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._acknowledgementRow5Value=val;
        }
      });
      defineGetter(this, "acknowledgementRow5Value", function() {
        return this._acknowledgementRow5Value;
      });

      defineSetter(this, "addBeneficiaryButton3", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._addBeneficiaryButton3=val;
        }
      });
      defineGetter(this, "addBeneficiaryButton3", function() {
        return this._addBeneficiaryButton3;
      });

      defineSetter(this, "reviewCancelYesButton", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._reviewCancelYesButton=val;
        }
      });
      defineGetter(this, "reviewCancelYesButton", function() {
        return this._reviewCancelYesButton;
      });

      defineSetter(this, "maskeyeiconskin", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._maskeyeiconskin=val;
        }
      });
      defineGetter(this, "maskeyeiconskin", function() {
        return this._maskeyeiconskin;
      });

      defineSetter(this, "accountNumberSkin", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._accountNumberSkin=val;
        }
      });
      defineGetter(this, "accountNumberSkin", function() {
        return this._accountNumberSkin;
      });

      defineSetter(this, "unmaskeyeiconskin", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._unmaskeyeiconskin=val;
        }
      });
      defineGetter(this, "unmaskeyeiconskin", function() {
        return this._unmaskeyeiconskin;
      });

      defineSetter(this, "dvfConfig", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._dvfConfig=val;          
        }
      });
      defineGetter(this, "dvfConfig", function() {
        return this._dvfConfig;
      });

      defineSetter(this, "minFillMapping", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._minFillMapping=val;          
        }
      });
      defineGetter(this, "minFillMapping", function() {
        return this._minFillMapping;
      });

      defineSetter(this, "quickLink1", function(val) {
        if((typeof val === 'string') && (val != "")){
          this._quickLink1 = val;          
        }
      });
      defineGetter(this, "quickLink1", function() {
        return this._quickLink1;
      });

      defineSetter(this, "quickLink2", function(val) {
        if((typeof val === 'string') && (val != "")){
          this._quickLink2 = val;          
        }
      });
      defineGetter(this, "quickLink2", function() {
        return this._quickLink2;
      });

      defineSetter(this, "quickLink3", function(val) {
        if((typeof val === 'string') && (val != "")){
          this._quickLink3 = val;          
        }
      });
      defineGetter(this, "quickLink3", function() {
        return this._quickLink3;
      });

      defineSetter(this, "quickLink4", function(val) {
        if((typeof val === 'string') && (val != "")){
          this._quickLink4 = val;          
        }
      });
      defineGetter(this, "quickLink4", function() {
        return this._quickLink4;
      });

      defineSetter(this, "quickLinkTextSkin", function(val) {
        if((typeof val === 'string') && (val != "")){
          this._quickLinkTextSkin = val;          
        }
      });
      defineGetter(this, "quickLinkTextSkin", function() {
        return this._quickLinkTextSkin;
      });

      defineSetter(this, "sknAddTextBoxError", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknAddTextBoxError=val;
        }
      });
      defineGetter(this, "sknAddTextBoxError", function() {
        return this._sknAddTextBoxError;
      });
      defineSetter(this, "objName", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._objName=val;
        }
      });
      defineGetter(this, "objName", function() {
        return this._objName;
      });
      
       defineSetter(this, "operationName", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._operationName=val;
        }
      });
      
      defineGetter(this, "operationName", function() {
        return this._operationName;
      });
      
       defineSetter(this, "serviceName", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._serviceName=val;
        }
      });
      defineGetter(this, "serviceName", function() {
        return this._serviceName;
      });
      
       defineSetter(this, "criteria", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._criteria=val;
        }
      });
      defineGetter(this, "criteria", function() {
        return this._criteria;
      });
    },

    /**
     *  constructEntitlmentJson
     * constructs the Json format required for setting the entitlements
     */
    constructEntitlmentJson: function(){
      var entitlementJson = {};
      entitlementJson.entitlement = {};
      entitlementJson.entitlement.features = this.entitlementContext.features;
      entitlementJson.entitlement.permissions = this.entitlementContext.permissions;
      return entitlementJson;
    },
    /**
     * @api : preShow
     * Reponsible to retain the data for custom properties for multiple entries into the component
     * Invoke the DAO layer to collect information from the service.
     * @return : NA
     */
    preShow: function() {  
      var self = this;
      try{
        this.resetData();
        var entitlementJson = this.constructEntitlmentJson();        
        this.EntitlementUtils.setEntitlements(entitlementJson);        
        this.parserUtilsManager.clearContext(); 
        this.setComponentConfigs();  
        this.setContextIntoParser();   
        this.populateBlockTitleAndScreen1Details();
        this.initActions();     
        this.turnOffSecondaryScreenContainers();
        this.resetValidationFields();      
        this.removeCancelPopup();
        this.view.flxContractList.setVisibility(false);
        this.view.flxContractsComponentAck.setVisibility(false);
        this.view.flxContractsComponent.setVisibility(false);
        this.view.lblSeparator7.width = "96%";
        this.view.flxDowntimeWarning.setVisibility(false);
        kony.application.getCurrentForm().title = this.view.lblTransfers.text;
        this.h1Value = '';
      }
      catch(err){
        var errObj = {
          "errorInfo" : "Error in preshow method of the component.",
          "error": err
        };
        self.onError(errObj);	
      }
    },


    /**
     * @api : removeCancelPopup
     * Removes the cancel popup
     */
    removeCancelPopup: function() {
      var form = kony.application.getCurrentForm();
      if(form['flxPopup']){
        form.remove(form.flxPopup);
      }
    },

    /**
     * @api : resetData
     * Reponsible to reset the data for subsequent visits.
     * @return : NA
     */
    resetData: function() {
      this.radioCategoryValues = {};
      this.formatComponentValues  = {};
      this.textInputsMapping = {};
      this.beneficiaryData = {};
      this.radioIcon1InitialValue = "";
      this.selectedReviewIcon = "";
      this.selectedReviewText = "";
      this.view.flxDetails.flxRecipientDetails.flxDetail1.lblDetailValue1.text = "";
      this.view.flxDetails.flxRecipientDetails.flxDetail2.lblDetailValue2.text = "";
      this.view.flxDetails.flxRecipientDetails.flxDetail3.lblDetailValue3.text = "";
      this.view.flxDetails.flxRecipientDetails.flxDetail4.lblDetailValue4.text = "";
      this.view.flxDetails.flxRecipientDetails.flxDetail5.lblDetailValue5.text = "";
      this.componentContext = {};
    },
	
	setFlowSpecificUI: function() {
      if(kony.application.getCurrentBreakpoint() == 640 || kony.application.getCurrentBreakpoint() == 1024)
        return;
      this.view.flxContent.flxAddInternationalAccount.flxRight.flxP2PQuickLinks.top = "20dp";
      if(this.beneficiaryData["selectedflowType"] === "EDIT" && !this.context["phone"] && !this.context["email"]) {
        this.view.flxLeft.width = "87.49%";
        this.view.lblDetailValue1.width = "65%";
        this.view.lblDetailValue2.width = "65%";
        this.view.lblDetailValue3.width = "65%";
        this.view.lblDetailValue4.width = "65%";
        this.view.lblDetailValue5.width = "65%";    
        this.view.flxDetailValue6.width = "65%";
        this.view.flxContent.flxAddInternationalAccount.flxRight.flxQuickLinks.isVisible = false;
        this.view.flxContent.flxAddInternationalAccount.flxRight.flxP2PQuickLinks.isVisible = false;
        this.view.forceLayout();
      }
      else if(this.beneficiaryData["selectedflowType"] === "EDIT" && (this.context["phone"] || this.context["email"])) {
        this.view.flxLeft.width = "58.12%";
        this.view.lblDetailValue1.width = "99%";
        this.view.lblDetailValue2.width = "99%";
        this.view.lblDetailValue3.width = "99%";
        this.view.lblDetailValue4.width = "99%";
        this.view.lblDetailValue5.width = "99%";    
        this.view.flxDetailValue6.width = "99%";
        this.view.flxContent.flxAddInternationalAccount.flxRight.flxQuickLinks.isVisible = false;
        this.view.flxContent.flxAddInternationalAccount.flxRight.flxP2PQuickLinks.top = "0dp";
        this.view.flxContent.flxAddInternationalAccount.flxRight.flxP2PQuickLinks.isVisible = true;
        this.view.forceLayout();
      }
      else if(this.beneficiaryData["selectedflowType"] === "ADD") {
        this.view.flxLeft.width = "58.12%";
        this.view.lblDetailValue1.width = "99%";
        this.view.lblDetailValue2.width = "99%";
        this.view.lblDetailValue3.width = "99%";
        this.view.lblDetailValue4.width = "99%";
        this.view.lblDetailValue5.width = "99%";
        this.view.flxDetailValue6.width = "99%";
        this.view.flxContent.flxAddInternationalAccount.flxRight.flxQuickLinks.isVisible = true;
        if((this.context["phone"] || this.context["email"])){
          this.view.flxContent.flxAddInternationalAccount.flxRight.flxP2PQuickLinks.isVisible = true;
        }
        else{
          this.view.flxContent.flxAddInternationalAccount.flxRight.flxP2PQuickLinks.isVisible = false;
        }
        this.view.forceLayout();
      }
    },
	
    /**
     * @api : onBreakPointChange
     * It will trigger when break point change takes place.
     * @return : NA
     */
    onBreakPointChange: function() {
      var self = this;
      try{
		this.setFlowSpecificUI();
        this.setQuickLinksVisible(this.beneficiaryData["selectedBeneficiaryType"]);
        this.populateLabelsBasedOnContracts();      
        this.populateScreen2LabelsBasedOnContracts();
        this.populateScreen3LabelsBasedOnContracts();
        this.populateScreen3ValuesBasedOnContracts();
        this.populateScreen4Section1BasedOnContracts();
        this.populateScreen4Section2LabelsBasedOnContracts();
        this.populateScreen4Section2ValuesBasedOnContracts();
        this.populateTextInputsBasedOnContracts();
        this.view.flxContractList.setVisibility(false);
        this.view.flxDBXAccountType.isVisible=false;
        if(this.view.lblDetailValue1.enable) {
          this.view.lblDetailValue1.skin = this.addBenefificaryUtility.breakPointParser
          (this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());       
        }
        else {
          this.view.lblDetailValue1.skin = this.addBenefificaryUtility.breakPointParser
          (this._sknAddTextBoxDisabled, kony.application.getCurrentBreakpoint());       
        }
        if(this.view.lblDetailValue2.enable) {
          this.view.lblDetailValue2.skin = this.addBenefificaryUtility.breakPointParser
          (this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());       
        }
        else {
          this.view.lblDetailValue2.skin = this.addBenefificaryUtility.breakPointParser
          (this._sknAddTextBoxDisabled, kony.application.getCurrentBreakpoint());       
        }
        if(this.view.lblDetailValue3.enable) {
          this.view.lblDetailValue3.skin = this.addBenefificaryUtility.breakPointParser
          (this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());       
        }
        else {
          this.view.lblDetailValue3.skin = this.addBenefificaryUtility.breakPointParser
          (this._sknAddTextBoxDisabled, kony.application.getCurrentBreakpoint());       
        }
        if(this.view.lblDetailValue4.enable) {
          this.view.lblDetailValue4.skin = this.addBenefificaryUtility.breakPointParser
          (this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());       
        }
        else {
          this.view.lblDetailValue4.skin = this.addBenefificaryUtility.breakPointParser
          (this._sknAddTextBoxDisabled, kony.application.getCurrentBreakpoint());       
        }
        if(this.view.lblDetailValue5.skin) {
          this.view.lblDetailValue5.skin = this.addBenefificaryUtility.breakPointParser
          (this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());       
        }
        else {
          this.view.lblDetailValue5.skin = this.addBenefificaryUtility.breakPointParser
          (this._sknAddTextBoxDisabled, kony.application.getCurrentBreakpoint());       
        }
      }
      catch(err){
        var errObj = {
          "errorInfo" : "Error in onBreakPointChange method of the component.",
          "error": err
        };
        self.onError(errObj);	
      }
    },

    /**
     * @api : postShow
     * event called after ui rendered on the screen, is a component life cycle event.
     * @return : NA
     */
    postShow: function() {
      var scope=this;
      this.populateBlockTitleAndScreen1Details();
      this.setSkins();
      this.view.contractList.lblHeader.text = 'Link Payee';
      this.view.contractList.lblDescription.text = 'Select the contracts that you would like to link this payee with';
      this.view.contractList.btnAction4.text = 'Cancel';
      this.view.contractList.btnAction5.text = 'Modify';
      this.view.btnBypass.onClick = function() {
            scope.view.flxQuickLink1.setActive(true);
        };
         scope.view.btnNo.accessibilityConfig = {
                a11yLabel:"No, don't cancel add account process",
                a11yARIA: {
                    "tabindex": 0,
                    "role": "button"
                }
            }
      this.view.contractList.btnAction6.accessibilityConfig = {
        a11yLabel:"Continue to Confirmation",
        a11yARIA : {
            "tabindex":0,
            "role":"button"
        }
      }
      this.view.flxQuickLink1.accessibilityConfig = {
        a11yLabel:this.view.lblQuickLink1.text,
        a11yARIA : {
            "tabindex":0,
            "role":"link"
        }
      }
        this.view.flxQuickLink2.accessibilityConfig = {
        a11yLabel:this.view.lblQuickLink2.text,
        a11yARIA : {
            "tabindex":0,
            "role":"link"
        }
    }
        this.view.flxQuickLink3.accessibilityConfig = {
        a11yLabel:this.view.lblQuickLink3.text,
        a11yARIA : {
            "tabindex":0,
            "role":"link"
        }
      }
      this.view.flxQuickLink4.accessibilityConfig = {
        a11yLabel:this.view.lblQuickLink4.text,
        a11yARIA : {
            "tabindex":0,
            "role":"link"
        }
      }
      if(kony.application.getCurrentBreakpoint() <= 1024)
      this.view.btnBypass.setVisibility(false);
      if(kony.application.getCurrentBreakpoint() <= 640){
        this.view.flxConfirmDetail1.height = '45px';
        this.view.flxConfirmDetail2.height = '45px';
        this.view.flxConfirmDetail3.height = '45px';
        this.view.flxConfirmDetail4.height = '45px';
        this.view.flxConfirmDetail5.height = '45px';
      }
      this.view.lblDetailValue1.toolTip = "";
      this.view.lblDetailValue3.toolTip = "";
      this.view.lblDetailValue4.toolTip = "";
      this.view.lblDetailValue5.toolTip = "";
      this.view.btnAction4.toolTip = "";
      this.view.btnAction5.toolTip = "";
      this.view.flxPopup.onKeyPress = this.onKeyPressCallBack;
      //this.view.lblDetailValue5.placeHolder="Enter account nickname (optional)";
      this.view.flxNote.isVisible=false;
      this.view.flxPopup.skin="ICSknScrlFlx000000OP40";
    },
    onKeyPressCallBack: function(eventObject, eventPayload) {
            var self = this;
            if (eventPayload.keyCode === 27) {
                if(this.view.flxPopup.isVisible)
                this.view.flxPopup.isVisible = false;
            }
    },
    lblsetActive: function() {
        this.view.lblTransfers.setActive(true);
    },
    byPassCheck: function(){
      this.view.btnBypass.setVisibility(this.view.flxAddInternationalAccount.isVisible);
      if(kony.application.getCurrentBreakpoint()<=1024)this.view.btnBypass.setVisibility(false);
    },
    resetSkinstoOriginalValues: function(){
       if(this.view.lblDetailValue1.enable) {
          this.view.lblDetailValue1.skin = this.addBenefificaryUtility.breakPointParser
          (this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());       
        }
        else {
          this.view.lblDetailValue1.skin = this.addBenefificaryUtility.breakPointParser
          (this._sknAddTextBoxDisabled, kony.application.getCurrentBreakpoint());       
        }
        if(this.view.lblDetailValue2.enable) {
          this.view.lblDetailValue2.skin = this.addBenefificaryUtility.breakPointParser
          (this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());       
        }
        else {
          this.view.lblDetailValue2.skin = this.addBenefificaryUtility.breakPointParser
          (this._sknAddTextBoxDisabled, kony.application.getCurrentBreakpoint());       
        }
        if(this.view.lblDetailValue3.enable) {
          this.view.lblDetailValue3.skin = this.addBenefificaryUtility.breakPointParser
          (this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());       
        }
        else {
          this.view.lblDetailValue3.skin = this.addBenefificaryUtility.breakPointParser
          (this._sknAddTextBoxDisabled, kony.application.getCurrentBreakpoint());       
        }
        if(this.view.lblDetailValue4.enable) {
          this.view.lblDetailValue4.skin = this.addBenefificaryUtility.breakPointParser
          (this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());       
        }
        else {
          this.view.lblDetailValue4.skin = this.addBenefificaryUtility.breakPointParser
          (this._sknAddTextBoxDisabled, kony.application.getCurrentBreakpoint());       
        }
        if(this.view.lblDetailValue5.skin) {
          this.view.lblDetailValue5.skin = this.addBenefificaryUtility.breakPointParser
          (this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());       
        }
        else {
          this.view.lblDetailValue5.skin = this.addBenefificaryUtility.breakPointParser
          (this._sknAddTextBoxDisabled, kony.application.getCurrentBreakpoint());       
        }
      
       this.view.lblDetailValue1.focusSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknAddTextBoxFocus, kony.application.getCurrentBreakpoint());
        this.view.lblDetailValue1.hoverSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknAddTextBoxHover, kony.application.getCurrentBreakpoint());
        this.view.lblDetailValue1.placeholderSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknAddTextBoxPlaceHolder, kony.application.getCurrentBreakpoint());      
        this.view.lblDetailValue2.focusSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknAddTextBoxFocus, kony.application.getCurrentBreakpoint());
        this.view.lblDetailValue2.hoverSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknAddTextBoxHover, kony.application.getCurrentBreakpoint());
        this.view.lblDetailValue2.placeholderSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknAddTextBoxPlaceHolder, kony.application.getCurrentBreakpoint());      
        this.view.lblDetailValue3.focusSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknAddTextBoxFocus, kony.application.getCurrentBreakpoint());
        this.view.lblDetailValue3.hoverSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknAddTextBoxHover, kony.application.getCurrentBreakpoint());
        this.view.lblDetailValue3.placeholderSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknAddTextBoxPlaceHolder, kony.application.getCurrentBreakpoint());      
        this.view.lblDetailValue4.focusSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknAddTextBoxFocus, kony.application.getCurrentBreakpoint());
        this.view.lblDetailValue4.hoverSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknAddTextBoxHover, kony.application.getCurrentBreakpoint());
        this.view.lblDetailValue4.placeholderSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknAddTextBoxPlaceHolder, kony.application.getCurrentBreakpoint());      
        this.view.lblDetailValue5.focusSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknAddTextBoxFocus, kony.application.getCurrentBreakpoint());
        this.view.lblDetailValue5.hoverSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknAddTextBoxHover, kony.application.getCurrentBreakpoint());
        this.view.lblDetailValue5.placeholderSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknAddTextBoxPlaceHolder, kony.application.getCurrentBreakpoint());
    },

    /**
     * setSkins
     * @api : setSkins
     * event called to set the skins based on the contracts.
     * @return : NA
     */
    setSkins: function() {
      var self = this;
      try{
        this.view.FormatValue.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknReviewValue, kony.application.getCurrentBreakpoint());
        this.view.FormatValue1.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknReviewValue, kony.application.getCurrentBreakpoint());
        this.view.FormatValue2.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknReviewValue, kony.application.getCurrentBreakpoint());
        this.view.FormatValue3.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknReviewValue, kony.application.getCurrentBreakpoint());
        this.view.FormatValue4.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknReviewValue, kony.application.getCurrentBreakpoint());
        this.view.FormatValue5.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknReviewValue, kony.application.getCurrentBreakpoint());
        this.view.FormatValue6.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknReviewValue, kony.application.getCurrentBreakpoint());
        this.view.FormatValue7.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknReviewValue, kony.application.getCurrentBreakpoint());
        this.view.FormatValue8.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknReviewValue, kony.application.getCurrentBreakpoint());
        this.view.FormatValue9.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknReviewValue, kony.application.getCurrentBreakpoint());
        this.view.FormatValue10.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknReviewValue, kony.application.getCurrentBreakpoint());
        this.view.FormatValue11.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknReviewValue, kony.application.getCurrentBreakpoint());
        this.view.lblDetailKey1.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknAddLabel, kony.application.getCurrentBreakpoint());   
        this.view.lblDetailKey2.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknAddLabel, kony.application.getCurrentBreakpoint());
        this.view.lblDetailKey3.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknAddLabel, kony.application.getCurrentBreakpoint());   
        this.view.lblDetailKey4.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknAddLabel, kony.application.getCurrentBreakpoint());   
        this.view.lblDetailKey5.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknAddLabel, kony.application.getCurrentBreakpoint());   
        this.view.lblDetailKey6.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknAddLabel, kony.application.getCurrentBreakpoint());         
        this.view.lblPersonalBanking.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknAddLabel, kony.application.getCurrentBreakpoint());   
        this.view.lblBusinessBanking.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknAddLabel, kony.application.getCurrentBreakpoint());
        this.view.lblDetailValue1.focusSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknAddTextBoxFocus, kony.application.getCurrentBreakpoint());
        this.view.lblDetailValue1.hoverSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknAddTextBoxHover, kony.application.getCurrentBreakpoint());
        this.view.lblDetailValue1.placeholderSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknAddTextBoxPlaceHolder, kony.application.getCurrentBreakpoint());      
        this.view.lblDetailValue2.focusSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknAddTextBoxFocus, kony.application.getCurrentBreakpoint());
        this.view.lblDetailValue2.hoverSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknAddTextBoxHover, kony.application.getCurrentBreakpoint());
        this.view.lblDetailValue2.placeholderSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknAddTextBoxPlaceHolder, kony.application.getCurrentBreakpoint());      
        this.view.lblDetailValue3.focusSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknAddTextBoxFocus, kony.application.getCurrentBreakpoint());
        this.view.lblDetailValue3.hoverSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknAddTextBoxHover, kony.application.getCurrentBreakpoint());
        this.view.lblDetailValue3.placeholderSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknAddTextBoxPlaceHolder, kony.application.getCurrentBreakpoint());      
        this.view.lblDetailValue4.focusSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknAddTextBoxFocus, kony.application.getCurrentBreakpoint());
        this.view.lblDetailValue4.hoverSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknAddTextBoxHover, kony.application.getCurrentBreakpoint());
        this.view.lblDetailValue4.placeholderSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknAddTextBoxPlaceHolder, kony.application.getCurrentBreakpoint());      
        this.view.lblDetailValue5.focusSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknAddTextBoxFocus, kony.application.getCurrentBreakpoint());
        this.view.lblDetailValue5.hoverSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknAddTextBoxHover, kony.application.getCurrentBreakpoint());
        this.view.lblDetailValue5.placeholderSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknAddTextBoxPlaceHolder, kony.application.getCurrentBreakpoint());
        this.view.lblTransfers.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknBlockTitle, kony.application.getCurrentBreakpoint());
        this.view.lblHeader1.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknSectionHeader, kony.application.getCurrentBreakpoint());
        this.view.lblHeader2.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknSectionHeader, kony.application.getCurrentBreakpoint());
        this.view.lblSection1Header.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknSectionHeader, kony.application.getCurrentBreakpoint());
        this.view.lblConfirmHeader.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknSectionHeader, kony.application.getCurrentBreakpoint());
        this.view.btnAction2.focusSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknPrimaryButtonFocus, kony.application.getCurrentBreakpoint());
        this.view.btnAction2.hoverSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknPrimaryButtonHover, kony.application.getCurrentBreakpoint());
        this.view.btnAction6.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknPrimaryButton, kony.application.getCurrentBreakpoint());
        this.view.btnAction6.focusSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknPrimaryButtonFocus, kony.application.getCurrentBreakpoint());
        this.view.btnAction6.hoverSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknPrimaryButtonHover, kony.application.getCurrentBreakpoint());
        this.view.btnAddAnotherRecipient.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknPrimaryButton, kony.application.getCurrentBreakpoint());
        this.view.btnAddAnotherRecipient.focusSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknPrimaryButtonFocus, kony.application.getCurrentBreakpoint());
        this.view.btnAddAnotherRecipient.hoverSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknPrimaryButtonHover, kony.application.getCurrentBreakpoint());
        this.view.btn3.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknPrimaryButton, kony.application.getCurrentBreakpoint());
        this.view.btn3.focusSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknPrimaryButtonFocus, kony.application.getCurrentBreakpoint());
        this.view.btn3.hoverSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknPrimaryButtonHover, kony.application.getCurrentBreakpoint());
        this.view.btnNewTransfer.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknPrimaryButton, kony.application.getCurrentBreakpoint());
        this.view.btnNewTransfer.focusSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknPrimaryButtonFocus, kony.application.getCurrentBreakpoint());
        this.view.btnNewTransfer.hoverSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknPrimaryButtonHover, kony.application.getCurrentBreakpoint());
        this.view.btnAction4.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknSecondaryButton, kony.application.getCurrentBreakpoint());
        this.view.btnAction4.focusSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknSecondaryButtonFocus, kony.application.getCurrentBreakpoint());
        this.view.btnAction4.hoverSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknSecondaryButtonHover, kony.application.getCurrentBreakpoint());
        this.view.btnAction5.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknSecondaryButton, kony.application.getCurrentBreakpoint());
        this.view.btnAction5.focusSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknSecondaryButtonFocus, kony.application.getCurrentBreakpoint());
        this.view.btnAction5.hoverSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknSecondaryButtonHover, kony.application.getCurrentBreakpoint());
        this.view.btnAction1.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknSecondaryButton, kony.application.getCurrentBreakpoint());
        this.view.btnAction1.focusSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknSecondaryButtonFocus, kony.application.getCurrentBreakpoint());
        this.view.btnAction1.hoverSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknSecondaryButtonHover, kony.application.getCurrentBreakpoint());
        this.view.btnAction3.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknSecondaryButton, kony.application.getCurrentBreakpoint());
        this.view.btnAction3.focusSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknSecondaryButtonFocus, kony.application.getCurrentBreakpoint());
        this.view.btnAction3.hoverSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknSecondaryButtonHover, kony.application.getCurrentBreakpoint());
        this.view.btnConfirm.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknPrimaryButton, kony.application.getCurrentBreakpoint());
        this.view.btnConfirm.focusSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknPrimaryButtonFocus, kony.application.getCurrentBreakpoint());
        this.view.btnConfirm.hoverSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknPrimaryButtonHover, kony.application.getCurrentBreakpoint());
        this.view.btnModify.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknSecondaryButton, kony.application.getCurrentBreakpoint());
        this.view.btnModify.focusSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknSecondaryButtonFocus, kony.application.getCurrentBreakpoint());
        this.view.btnModify.hoverSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknSecondaryButtonHover, kony.application.getCurrentBreakpoint());
        this.view.btnCancelAccount.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknSecondaryButton, kony.application.getCurrentBreakpoint());
        this.view.btnCancelAccount.focusSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknSecondaryButtonFocus, kony.application.getCurrentBreakpoint());
        this.view.btnCancelAccount.hoverSkin = this.addBenefificaryUtility.breakPointParser
        (this._sknSecondaryButtonHover, kony.application.getCurrentBreakpoint());
        this.view.lblKey1.skin =  this.addBenefificaryUtility.breakPointParser
        (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
        this.view.lblKey2.skin =  this.addBenefificaryUtility.breakPointParser
        (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
        this.view.lblKey3.skin =  this.addBenefificaryUtility.breakPointParser
        (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
        this.view.lblKey4.skin =  this.addBenefificaryUtility.breakPointParser
        (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
        this.view.lblKey5.skin =  this.addBenefificaryUtility.breakPointParser
        (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
        this.view.lblKey6.skin =  this.addBenefificaryUtility.breakPointParser
        (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
        this.view.lblField1Key.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
        this.view.lblField2Key.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
        this.view.lblField3KEy.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
        this.view.lblField4KEy.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
        this.view.lblField5Key.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
        this.view.lblField6Key.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
        this.view.lblSection1Message.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknAcknowledgementSuccess, kony.application.getCurrentBreakpoint());
        this.view.lblRefrenceNumber.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknAcknowledgementReferenceNumberLabel, kony.application.getCurrentBreakpoint());
        this.view.lblRefrenceNumberValue.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknAcknowledgementReferenceNumberValue, kony.application.getCurrentBreakpoint());
        this.view.lblQuickLink1.skin = this.addBenefificaryUtility.breakPointParser
        (this._quickLinkTextSkin , kony.application.getCurrentBreakpoint());
        this.view.lblQuickLink2.skin = this.addBenefificaryUtility.breakPointParser
        (this._quickLinkTextSkin , kony.application.getCurrentBreakpoint());
        this.view.lblQuickLink3.skin = this.addBenefificaryUtility.breakPointParser
        (this._quickLinkTextSkin , kony.application.getCurrentBreakpoint());
        this.view.lblQuickLink4.skin = this.addBenefificaryUtility.breakPointParser
        (this._quickLinkTextSkin , kony.application.getCurrentBreakpoint());
      }
      catch(err){
        var errObj = {
          "errorInfo" : "Error in setSkins method of the component.",
          "error": err
        };
        self.onError(errObj);	
      }
    },


    /**
     * @api : turnOffSecondaryScreenContainers
     * turns off confirmation and acknowledgement views.
     * @return : NA
     */

    turnOffSecondaryScreenContainers: function() {
      this.view.flxContent.flxDBXAccountType.isVisible=false; 
      this.view.flxContent.flxConfirmation1.isVisible = false;
      this.view.flxContent.flxAcknowledgement.isVisible = false;
      this.view.flxContent.flxConfirmation1.flxConfirmation.flxPopup.isVisible = false;
     this.view.flxContent.flxNote.isVisible = false;
    },

    /**
     * @api : updateContext
     * updates context.
     * @return : NA
     */
    updateContext: function(key, value) {
      this.componentContext[this.textInputsMapping[key]] = value;
      this.parserUtilsManager.setContext(this.componentContext);
    },

    /**
     * @api : initActions
     * assigns actions to all the widgets.
     * @return : NA
     */
    initActions: function() {
      this.view.btnAction1.onClick =   this.actionHandler.bind
      (this,this.context,this._addBeneficiaryButton1);
      this.view.btnAction2.onClick =   this.actionHandler.bind
      (this,this.context,this._addBeneficiaryButton2);
      this.view.btnAction4.onClick =   this.actionHandler.bind
      (this,this.context,this._reviewButton1);
      this.view.btnAction5.onClick =   this.actionHandler.bind
      (this,this.context,this._reviewButton2);
      this.view.btnAction6.onClick =   this.actionHandler.bind
      (this,this.context,this._reviewButton3);
      this.view.btnYes.onClick =  this.actionHandler.bind
      (this,this.context,this._reviewCancelYesButton);
      this.view.btnAddAnotherRecipient.onClick =this.actionHandler.bind
      (this,this.context,this._acknowledgementButton1);
      this.view.btnNewTransfer.onClick =   this.actionHandler.bind
      (this,this.context,this._acknowledgementButton2);
      this.view.lblDetailValue1.onKeyUp = this.minFillValidation.bind
      (this,"tbx1");
      this.view.lblDetailValue2.onKeyUp = this.minFillValidation.bind
      (this,"tbx2");
      this.view.lblDetailValue3.onKeyUp = this.minFillValidation.bind
      (this,"tbx3");
      this.view.lblDetailValue4.onKeyUp = this.minFillValidation.bind
      (this,"tbx4");
      this.view.lblDetailValue5.onKeyUp = this.minFillValidation.bind
      (this,"tbx5");
      this.view.btnConfirm.onClick =   this.actionHandler.bind
      (this,this.context,this._selectionButton3);
      this.view.btnModify.onClick =   this.actionHandler.bind
      (this,this.context,this._selectionButton2);
      this.view.btnCancelAccount.onClick =   this.actionHandler.bind
      (this,this.context,this._selectionButton1);
      this.view.btnAddAnotherRecipient.onClick = this.ackButtonsAction.bind(this, this.context, this._acknowledgementButton1);
      this.view.btnNewTransfer.onClick = this.ackButtonsAction.bind(this, this.context, this._acknowledgementButton2);
      this.view.imgInfo1.onTouchEnd = this.showInfoPopup.bind(this,this.view.flxInfo1);
      this.view.imgInfo2.onTouchEnd = this.showInfoPopup.bind(this,this.view.flxInfo2);
      this.view.imgInfo3.onTouchEnd = this.showInfoPopup.bind(this,this.view.flxInfo3);
      this.view.imgInfo4.onTouchEnd = this.showInfoPopup.bind(this,this.view.flxInfo4);
      this.view.imgInfo5.onTouchEnd = this.showInfoPopup.bind(this,this.view.flxInfo5);
      this.view.imgInfo6.onTouchEnd = this.showInfoPopup.bind(this,this.view.flxInfo6);
      this.view.imgCross1.onTouchEnd = this.hideInfoPopup.bind(this,this.view.flxInfo1);
      this.view.imgCross2.onTouchEnd = this.hideInfoPopup.bind(this,this.view.flxInfo2);
      this.view.imgCross3.onTouchEnd = this.hideInfoPopup.bind(this,this.view.flxInfo3);
      this.view.imgCross4.onTouchEnd = this.hideInfoPopup.bind(this,this.view.flxInfo4);
      this.view.imgCross5.onTouchEnd = this.hideInfoPopup.bind(this,this.view.flxInfo5);
      this.view.imgCross6.onTouchEnd = this.hideInfoPopup.bind(this,this.view.flxInfo6);
      var beneficiaryType =  this.beneficiaryData["selectedBeneficiaryType"];
      if (beneficiaryType === "Same Bank") {
        this.view.lblDetailValue1.onEndEditing = this.validateAccountNumber;
        this.view.lblDetailValue2.onEndEditing = this.validateAccountNumber;
      } else {
        this.view.lblDetailValue1.onEndEditing = null;
        this.view.lblDetailValue2.onEndEditing = null;
      }
      const specialCharactersSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\";
      this.view.lblDetailValue2.restrictCharactersSet = specialCharactersSet;
      this.view.lblDetailValue3.restrictCharactersSet = specialCharactersSet;
      this.view.lblDetailValue4.restrictCharactersSet = "0123456789~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\";
    },
	
    /**
     * validateAccountNumber
     * @api : validateAccountNumber
     * validates the account number entered in text box 
     * @return : NA
     */
   validateAccountNumber: function() {
      var scope = this;
      try {
        this.view.flxAddInternationalAccount.flxLeft.flxDetails.flxWarning.isVisible = false;
        //this.view.flxAddInternationalAccount.flxLeft.flxDetails.rtxtWarning.isVisible = false;
        this.view.flxAddInternationalAccount.flxLeft.flxDetails.rtxtWarning.text = "";
        scope.isAccNumValid = "";
        var accNumber = this.view.lblDetailValue1.text;
        var reenterAccNumber = this.view.lblDetailValue2.text;
        if ((accNumber !== "" && accNumber !== undefined) && (reenterAccNumber !== "" && reenterAccNumber !== undefined)) {
          if (accNumber === reenterAccNumber) {
            scope.isAccNumValid = 1;
            this.view.flxAddInternationalAccount.flxLeft.flxDetails.flxWarning.isVisible = false;
            //this.view.flxAddInternationalAccount.flxLeft.flxDetails.rtxtWarning.isVisible = false;
            this.view.flxAddInternationalAccount.flxLeft.flxDetails.rtxtWarning.text = "";
            this.minFillValidation("tbx3");
            //             var objSvcName = this.getParsedValue(this._serviceName);
            //             var objName = this.getParsedValue(this._objName);
            //             var operationName = this.getParsedValue(this._operationName);
            //             var criteria = this.getCriteria(this._criteria);
            //             this.beneficiaryManagementDAO.validateAccountNumber(objSvcName, objName, operationName, criteria, onSuccess.bind(this), self.onError);
            //             function onSuccess(response) {
            //               kony.application.dismissLoadingScreen();
            //               if (response.beneficiaryName == "") {
            //                 var error = kony.i18n.getLocalizedString("i18n.payments.validAccountNumber");
            //                 this.view.flxAddInternationalAccount.flxLeft.flxDetails.rtxtWarning.isVisible = true;
            //                 this.view.flxAddInternationalAccount.flxLeft.flxDetails.rtxtWarning.text = error;
            //                 scope.isAccNumValid = 0;
            //               } else {
            //                  scope.isAccNumValid = 1;
            //                  this.view.lblDetailValue3.text = response.beneficiaryName;
            //                  this.componentContext['recipientName'] = response.beneficiaryName;
            //                  this.view.flxAddInternationalAccount.flxLeft.flxDetails.rtxtWarning.isVisible = false;
            //                  this.view.flxAddInternationalAccount.flxLeft.flxDetails.rtxtWarning.text = "";
            //                  this.minFillValidation("tbx3");
            //               }
            //             }
          } 
          else {
            scope.isAccNumValid = 0;
            var error = "Account Number and Re-Enter Account Number do not match";
            this.view.flxAddInternationalAccount.flxLeft.flxDetails.flxWarning.isVisible = true;
            //this.view.flxAddInternationalAccount.flxLeft.flxDetails.rtxtWarning.isVisible = true;
            this.view.flxAddInternationalAccount.flxLeft.flxDetails.rtxtWarning.text = error;
            //this.view.flxAddInternationalAccount.flxLeft.flxDetails.rtxtWarning.setActive(true);
            this.view.lblDetailValue1.text = '';
            this.view.lblDetailValue2.text = '';
            this.view.lblDetailValue1.setActive(true);
            this.minFillValidation();
          }
        }
      } catch (e) {
        var errorObj = {
          "errorInfo": "Error in validating account number",
          "errorLevel": "Component",
          "error": e
        };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : hideInfoPopup
     * turns off flxInfo.
     * @return : NA
     */
    hideInfoPopup: function(flxInfo) {
      flxInfo.isVisible = false;
    },

    /**
     * @api : showInfoPopup
     * turns on flxInfo.
     * @return : NA
     */
    showInfoPopup: function(flxInfo) {
      flxInfo.isVisible = true;
    },

    /**
     * @api : resetValidationFields
     * resets error label and other validation fields.
     * @return : NA
     */
    resetValidationFields: function() {
      this.beneficiaryData["selectedflowType"] = this.parserUtilsManager.getParsedValue(this._selectedflowType);
      if(this.beneficiaryData["selectedflowType"] === "ADD") {
      this.componentContext = {};
      }
      this.resultAccNumberValidation = [];
      this.view.flxWarning.isVisible = false;
      //this.view.rtxtWarning.isVisible = false;
      this.view.btnAction2.setEnabled(false);
      this.view.btnAction2.skin = "sknBtnBlockedSSPFFFFFF15Px";

      if (this.beneficiaryData["selectedflowType"] === "EDIT" && this.beneficiaryData["selectedBeneficiaryType"] === "P2P") {
        this.view.btnAction2.setEnabled(true);
        this.view.btnAction2.skin = "sknBtnNormalSSPFFFFFF4vs";
      }
    },

    /**
     * @api : minFillValidation
     * minimum field level validation to enable continue button.
     * @return : NA
     */
    minFillValidation: function(tbxWidget) {
      var beneficiaryType = this.beneficiaryData["selectedBeneficiaryType"];
      var object ="";
      var scope = this;
      beneficiaryType === "P2P" ? object = "PayPerson" : object = "Recipients";
      var config = JSON.parse(this._minFillMapping);    
      if(tbxWidget == "tbx1" && this.view.lblDetailValue1.isVisible){
        this.updateContext("tbx1",this.view.lblDetailValue1.text);
      }
      if(tbxWidget == "tbx2" && this.view.lblDetailValue2.isVisible){
        this.updateContext("tbx2",this.view.lblDetailValue2.text);
      }
      if(tbxWidget == "tbx3" && this.view.lblDetailValue3.isVisible){
        this.updateContext("tbx3",this.view.lblDetailValue3.text);
      }
      if(tbxWidget == "tbx4" && this.view.lblDetailValue4.isVisible){
        this.updateContext("tbx4",this.view.lblDetailValue4.text);
      }
      if(tbxWidget == "tbx5" && this.view.lblDetailValue5.isVisible){
        this.updateContext("tbx5",this.view.lblDetailValue5.text);
      }
      var dataJson = this.constructDVFInput(beneficiaryType);
       var jsonToBeSent = {};
      for(var key in dataJson){
        if(dataJson[key]){
          jsonToBeSent[key] = dataJson[key];
        }
        else{jsonToBeSent[key] = "";
            }
      }
      
      var minFillDvfConfig = {
        "Recipients":"",
        "PayPerson": ""
      };
      var tempJson = {};
      for (var key in config) {
        for(var innerkey in config[key]){
          var valueArray = [];
          var valueJSON = {
            "BusinessRuleType": "VALUE_MIN_LENGTH",
            "BusinessRule": config[key][innerkey]
          }
          valueArray.push(valueJSON);
          tempJson[innerkey] = valueArray;    
        }
        minFillDvfConfig[key] = tempJson;
        tempJson = {};
      }
      var dataValidator = this.dataValidationHandler.validateData(jsonToBeSent,object,minFillDvfConfig);   
      if (Object.keys(dataValidator).length === 0 && dataValidator.constructor === Object ) {
        if (beneficiaryType === "Same Bank" && this.beneficiaryData["selectedflowType"] === "ADD" && this.view.lblDetailValue1.text !== "" && this.view.lblDetailValue2.text !== "" && this.view.lblDetailValue3.text !== "") {
            if (scope.isAccNumValid === 1) {
                this.view.btnAction2.setEnabled(true);
                this.view.btnAction2.skin = "sknBtnNormalSSPFFFFFF4vs";
            }
        } else if ((beneficiaryType === "External" || beneficiaryType === "International") && this.view.lblDetailValue1.text !== "" && this.view.lblDetailValue2.text !== "" && this.view.lblDetailValue3.text !== "" && this.view.lblDetailValue4.text !== "" && this.view.lblDetailValue5.text !== ""){
            this.view.btnAction2.setEnabled(true);
            this.view.btnAction2.skin = "sknBtnNormalSSPFFFFFF4vs";
        } else if (beneficiaryType === "P2P" && this.view.lblDetailValue1.text !== "" && this.view.lblDetailValue2.text !== "" && this.view.lblDetailValue5.text !== "") {
            this.view.btnAction2.setEnabled(true);
            this.view.btnAction2.skin = "sknBtnNormalSSPFFFFFF4vs";
        } else if (beneficiaryType === "Same Bank" && this.beneficiaryData["selectedflowType"] === "EDIT" && this.view.lblDetailValue4.text !== ""){
            this.view.btnAction2.setEnabled(true);
            this.view.btnAction2.skin = "sknBtnNormalSSPFFFFFF4vs";
        }
         else {
            this.view.btnAction2.setEnabled(false);
            this.view.btnAction2.skin = "sknBtnBlockedSSPFFFFFF15Px";
        }
    } else {
        this.view.btnAction2.setEnabled(false);
        this.view.btnAction2.skin = "sknBtnBlockedSSPFFFFFF15Px";
    }

},

     /**
     * @api : validateAccountAndReEnterAccountNumber
     * validates account and re-enter account number.
     * @return : NA
     */
    validateAccountAndReEnterAccountNumber: function() {
      this.resultAccNumberValidation = [];
      var uiWidgets = [];
      var tbxArray = [{"tbx1":"lblDetailValue1"},{"tbx2":"lblDetailValue2"},{"tbx3":"lblDetailValue3"},{"tbx4":"lblDetailValue4"},{"tbx5":"lblDetailValue5"}];
      var beneficiaryType = this.beneficiaryData["selectedBeneficiaryType"];
      if(beneficiaryType == "P2P"){
        return true;
      }
      for(var key in this.textInputsMapping){
 
        if(this.textInputsMapping[key] =="accountNumber"){
          uiWidgets.push(key);
        }
      }
      for(var i=0;i<uiWidgets.length;i++){
        if(uiWidgets[i] == "tbx1" ){
          this.resultAccNumberValidation.push(tbxArray[0]['tbx1']);
        }
          if(uiWidgets[i] == "tbx2" ){
          this.resultAccNumberValidation.push(tbxArray[1]['tbx2']);
        }
          if(uiWidgets[i] == "tbx3" ){
          this.resultAccNumberValidation.push(tbxArray[2]['tbx3']);
        }
          if(uiWidgets[i] == "tbx4" ){
          this.resultAccNumberValidation.push(tbxArray[3]['tbx4']);
        }
          if(uiWidgets[i] == "tbx5" ){
          this.resultAccNumberValidation.push(tbxArray[4]['tbx5']);
        }    
      }
     
      if(Array.isArray(this.resultAccNumberValidation) && this.resultAccNumberValidation.length ==2){
     if(this.view[this.resultAccNumberValidation[0]].text == this.view[this.resultAccNumberValidation[1]].text)
       return true;
     }
return false;
    },
    /**
   * cancelAction
   *
   * invoked on the cancel button on add beneficiary view.
   *
   * @param : JSON inputJSON
   *   object containing the context
   * @return : function 
   *   form or component method invoked for action
   */
    cancelAction: function(param) {
      this.parentScope['navigateToBeneficiaryTypes'](param);   
    },

    /**
  * addBeneficiary
  *
  * invoked on the continue button on add beneficiary view.
  *
  * @param : JSON inputJSON
  *   object containing the context
  * @return : function 
  *   form or component method invoked for action
  */

    addBeneficiary: function(param) {
      this.performDataValidation(this.addBeneficiaryValidationSuccess.bind(this));
    },
    addBeneficiaryValidationSuccess: function() {
      this.preparePayload(); 
      this.view.flxAddInternationalAccount.isVisible = false;
      this.view.flxAcknowledgement.isVisible = false;
      this.view.flxDBXAccountType.isVisible=false;
      this.view.flxConfirmation1.isVisible = false;

      if (!this.componentContext.cifDataForModify) {
        this.getContracts(true);
      } else {
        this.contractBasedNavigation();
      }
    },

    getContracts: function (isAddFlow) {
      isAddFlow === true
        ? this.beneficiaryManagementDAO.getContracts
          ("ExternalUserManagement", "ExternalUsers_1", "getInfinityUserContractCustomers", {}, this.onSuccessGetContractsAddFlow, "", self.onError)
        : this.beneficiaryManagementDAO.getContracts
          ("ExternalUserManagement", "ExternalUsers_1", "getInfinityUserContractCustomers", {}, this.onSuccessGetContractsEditFlow, "", self.onError);
    },

    onSuccessGetContractsAddFlow: function (response, unicode) {

      kony.application.dismissLoadingScreen();
      var beneficiaryType = this.beneficiaryData["selectedBeneficiaryType"];

      response.contracts = this.filterContractsByFeatureAction(this.getFeatureActionByBeneficiaryType(beneficiaryType), response.contracts);

      if (response.contracts.length > 0) {
        if (response.contracts.length == 1 && response.contracts[0].contractCustomers.length == 1) {
          this.view.contractList.segContract.data = [];
          this.populateScreen3Data()
          this.componentContext.singleCIFContractsData = [{
            "contractId": response.contracts[0].contractId,
            "coreCustomerId": response.contracts[0].contractCustomers[0].coreCustomerId
          }]
        } else {
          response.isCombinedUser = applicationManager.getUserPreferencesManager().profileAccess == "both" ? true : false;
          this.contractBasedNavigation(response);
        }
      } else {
        
      }

    },

    onSuccessGetContractsEditFlow: function (response, unicode) {

      kony.application.dismissLoadingScreen();
      var beneficiaryType = this.beneficiaryData["selectedBeneficiaryType"];

      response.contracts = this.filterContractsByFeatureAction(this.getFeatureActionByBeneficiaryType(beneficiaryType), response.contracts);

      if (response.contracts.length > 0) {
        if (response.contracts.length == 1 && response.contracts[0].contractCustomers.length == 1) {

          this.view.contractList.segContract.data = [];
          this.componentContext.singleCIFContractsData = [{
            "contractId": response.contracts[0].contractId,
            "coreCustomerId": response.contracts[0].contractCustomers[0].coreCustomerId
          }];

          beneficiaryType === "P2P"
            ? this.editP2PValidationSuccess()
            : this.editBeneficiaryValidationSuccess();

        } else {
          response.isCombinedUser = applicationManager.getUserPreferencesManager().profileAccess == "both" ? true : false;

          beneficiaryType === "P2P"
            ? this.setDataForEditP2PBeneficiaryContracts(response)
            : this.setDataForEditBeneficiaryContracts(response);
        }
      } else {
       
      }

    },

    getFeatureActionByBeneficiaryType: function (beneficiaryType) {

      switch (beneficiaryType) {
        case "Same Bank":
          return "INTRA_BANK_FUND_TRANSFER_CREATE_RECEPIENT"
        case "External":
          return "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT"
        case "International":
          return "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE_RECEPIENT"
        case "P2P":
          return "P2P_CREATE_RECEPIENT"

        default:
          break;
      }
    },

    filterContractsByFeatureAction: function (featureAction, data) {

      if (data.length == 0) {
        return data;
      }

      let filteredContractsList = [];

      data.forEach(x => {
        let filteredCustomersList = [];

        x.contractCustomers.forEach(y => {
          if (y.actions.includes(featureAction)) {
            filteredCustomersList.push(y);
          }
        })
        if (filteredCustomersList.length > 0) {
          x.contractCustomers = filteredCustomersList;
          filteredContractsList.push(x);
        }
      })

      return filteredContractsList;
    },

    performDataValidation: function(successOnValidation) {
      var self = this;
      try{
        var fieldMapper = JSON.parse(this._dvfConfig);
        var dataJson = "";
        var object = "";
        var beneficiaryType =  this.beneficiaryData["selectedBeneficiaryType"];
        dataJson = this.constructDVFInput(beneficiaryType);
        beneficiaryType ==="P2P" ? object = "PayPerson" : object = "Recipients";
        if(beneficiaryType !== "P2P"){
          var isAccountNumberAndReEnterAccountNumberValidated =
              this.validateAccountAndReEnterAccountNumber();
          if(!isAccountNumberAndReEnterAccountNumberValidated){
            var error = "Account Number and Re-Enter Account Number do not match";
            this.view.flxAddInternationalAccount.flxLeft.flxDetails.flxWarning.isVisible = true;
            //this.view.flxAddInternationalAccount.flxLeft.flxDetails.rtxtWarning.isVisible = true;
            this.view.flxAddInternationalAccount.flxLeft.flxDetails.rtxtWarning.text = error;
            //this.view.flxAddInternationalAccount.flxLeft.flxDetails.rtxtWarning.setActive(true);
            
            this.view[this.resultAccNumberValidation[0]].skin = this.breakPointParser(this._sknAddTextBoxError, kony.application.getCurrentBreakpoint());
            this.view[this.resultAccNumberValidation[1]].skin = this.breakPointParser(this._sknAddTextBoxError, kony.application.getCurrentBreakpoint());
            this.view.lblDetailValue2.text = '';
            this.view.lblDetailValue3.text = '';
            this.view.lblDetailValue2.setActive(true);
            return ;
          }
        }
        var dataValidator = this.dataValidationHandler.validateData(dataJson,object,fieldMapper);
        if(Object.keys(dataValidator).length === 0 && dataValidator.constructor === Object){
          successOnValidation();
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
        self.onError(errObj);	
      }
    },
    /**
     * @api : showValidationErrors
     * displays errors on validation of the fields in add beneficiary screen.
     * @return : NA
     */
    showValidationErrors: function(response) {
      this.resetSkinstoOriginalValues();
      this.invokedvfFieldErrorParser(response);
      var error = "";
      var uiErrorToBeDisplayed = "";
      var clientFieldName = "";    
      error = this.dvfToClientSideErrorMapping(response);
      for(var iterator in error){
        uiErrorToBeDisplayed  += error[iterator] + "</br>";
        clientFieldName=iterator;
      }
      if(clientFieldName === 'swiftCode'){
            this.view.lblDetailValue1.setActive(true);
        }else if(clientFieldName === 'routingNumber'){
            this.view.lblDetailValue1.setActive(true);
        }else if(clientFieldName === 'recipientName'){
            if(this.view.lblTransfers.text === 'Add Infinity Bank Account')
                this.view.lblDetailValue3.setActive(true);
            if(this.view.lblTransfers.text === 'Add Person-To-Person Recipient')
                this.view.lblDetailValue1.setActive(true);
            this.view.lblDetailValue4.setActive(true);
        }else if(clientFieldName === 'nickName'){
            if(this.view.lblTransfers.text === 'Add Infinity Bank Account')
                this.view.lblDetailValue4.setActive(true);
            if(this.view.lblTransfers.text === 'Add Person-To-Person Recipient')
                this.view.lblDetailValue2.setActive(true);
            this.view.lblDetailValue5.setActive(true);
        }
      this.view.flxAddInternationalAccount.flxLeft.flxDetails.flxWarning.isVisible = true;
      //this.view.flxAddInternationalAccount.flxLeft.flxDetails.rtxtWarning.isVisible = true;
      this.view.flxAddInternationalAccount.flxLeft.flxDetails.rtxtWarning.text = uiErrorToBeDisplayed;
      //this.view.flxAddInternationalAccount.flxLeft.flxDetails.rtxtWarning.setActive(true);
    },

    /**
     * @api : dvfToClientSideErrorMapping
     * mapper between dvfFields and error fields to  display a meaningful errorMessage on UI.
     * @return : NA
     */
    dvfToClientSideErrorMapping: function(dvfError) {
      var errorMapper ={
        "accountNumber": "Account Number",
        "reAccountNumber": "Account Number",
        "recipientName" : "Recipient Name",
        "nickName": "Account Nickname",
        "routingNumber" : "Routing Number",
        "swiftCode" : "Swift Code",
        "name" : "Recipient Name",
        "phone": "Phone Number",
        "email": "Email ID"
      };
      for(var iterator in dvfError){
        for(var mapperIterator in errorMapper){
          if(dvfError[iterator].includes(mapperIterator)){
            dvfError[iterator] = dvfError[iterator].replace(iterator,errorMapper[mapperIterator]);
          }
        }
      }
      return dvfError;
    },

    /**
     * @api : contractBasedNavigation
     * navigates to review or account type screen based on contracts.
     * @return : NA
     */
    contractBasedNavigation: function (data) {
    var userTypeSelectionVisibility = this.getParsedValue(this._beneficiaryTypeSelectionVisibility2);
      if(userTypeSelectionVisibility){
        var beneficiaryTypeSelectionVisibility=this.getParsedValue
        (this.beneficiaryTypeSelectionVisibility1,this.beneficiaryData["selectedBeneficiaryType"]);
        if(beneficiaryTypeSelectionVisibility){
          // this.populateScreen2LabelsBasedOnContracts();
          // this.view.flxDBXAccountType.isVisible=true;
          this.view.flxContent.flxNote.isVisible = false;
        }
      }
      if(!this.view.flxDBXAccountType.isVisible){
        // this.populateScreen3Data();
        // this.view.flxConfirmation1.isVisible = true;
         this.view.flxContent.flxNote.isVisible = false;
        if (!this.componentContext.singleCIFContractsData) {
          this.view.flxContractList.setVisibility(true);
          if (this.componentContext.cifDataForModify) {
            this.componentContext.cifDataForModify = false;
          } else {
            this.view.contractList.preshow(data);
          }
          this.view.contractList.btnAction6.text=kony.i18n.getLocalizedString("i18n.common.proceed");
          this.view.contractList.btnAction6.onClick = this.populateScreen3Data;
          this.view.contractList.btnAction5.onClick = this.reviewModifyAction;
          this.view.contractList.btnAction4.onClick = this.reviewCancelAction;
        } else {
          this.populateScreen3Data();
        }
      }
    },

    /**
    * getParsedImgSource
    *
    * parses the property and fetches the corresponding Value.
    */

    getParsedImgSource: function(property) {
      try{
        property=JSON.parse(property);
      }
      catch(e){        
        kony.print(e);
      }      
      return property;
    },

    /**
     * @api : getParsedValueForSelectedKey
     * retrieves the associated value for the selected key
     * @param : {value}-JSON
      @param : {key}-String
     *@return : String key
     *returns the value associated to the selected key
     */
    getParsedValueForSelectedKey: function(value, key) {
      var parsedValue={};
      try{
        parsedValue=JSON.parse(value);
        if(parsedValue.hasOwnProperty(key)){
          parsedValue=parsedValue[key];
        }
      }
      catch(e){
        kony.print(e);
        return parsedValue;
      }
      return parsedValue;
    },


    /**
     * @api : populateScreen2LabelsBasedOnContracts
     * populates account type view based on contracts.
     */
    populateScreen2LabelsBasedOnContracts: function() {
      try{
        var scope=this;
        if(!this.radioIcon1InitialValue){
          this.view.lblPersonalBanking.top="15dp";
          this.view.lblBusinessBanking.top="45dp";
          var headerText=this.getParsedValue
          (this._selectionTitle,this.beneficiaryData["selectedBeneficiaryType"]);
          var headerVal=this.getParsedValue
          (headerText,kony.application.getCurrentBreakpoint());
          if(headerVal){
            this.view.lblHeader.text=headerVal;
          }
          var lbl1Text=this.getParsedValue
          (this._selectionLabel1,this.beneficiaryData["selectedBeneficiaryType"]);
          var lbl1TextValue=this.getParsedValue
          (lbl1Text,kony.application.getCurrentBreakpoint());
          if(lbl1TextValue){
            this.view.flxDBXAccountType.flxAccount.flxMainAccount.lblPersonalBanking.text=lbl1TextValue;        
          }     
          var lbl2Text=this.getParsedValue
          (this._selectionLabel2,this.beneficiaryData["selectedBeneficiaryType"]);
          var lbl2TextValue=this.getParsedValue
          (lbl2Text,kony.application.getCurrentBreakpoint());
          if(lbl2TextValue){
            this.view.flxDBXAccountType.flxAccount.flxMainAccount.lblBusinessBanking.text=lbl2TextValue;
          }
          var radioValue1=this.getParsedValueForSelectedKey(this._radioIcon1);
          if(radioValue1 && radioValue1.hasOwnProperty("icon")){
            this.view.lblBtnPersonal.skin=radioValue1.icon.skin;
            this.view.lblBtnPersonal.text=radioValue1.icon.vizIcon;
            this.radioIcon1InitialValue=this.view.lblBtnPersonal.text;
          }
          var radioValue2=this.getParsedValueForSelectedKey(this._radioIcon2);
          if(radioValue2 && radioValue2.hasOwnProperty("icon")){
            this.view.lblBtnBusiness.skin=radioValue2.icon.skin;  
            this.view.lblBtnBusiness.text=radioValue2.icon.vizIcon;
          }
          var reviewIcon1={};
          var reviewIcon2={};
          if(radioValue1 && radioValue1.hasOwnProperty("reviewIcon")){
            reviewIcon1["skin"]=radioValue1.reviewIcon.skin;
            reviewIcon1["text"]=radioValue1.reviewIcon.vizIcon;
            if(radioValue1.selected){
              this.selectedReviewIcon=radioValue1.reviewIcon.skin;
              this.selectedReviewText=radioValue1.reviewIcon.vizIcon;
            }
          }
          if(radioValue2 && radioValue2.hasOwnProperty("reviewIcon")){
            reviewIcon2["skin"]=radioValue2.reviewIcon.skin;
            reviewIcon2["text"]=radioValue2.reviewIcon.vizIcon;
            if(radioValue2.selected){
              this.selectedReviewIcon=radioValue2.reviewIcon.skin;
              this.selectedReviewText=radioValue2.reviewIcon.vizIcon;
            }
          }
          this.view.lblBtnPersonal.onTouchEnd=scope.lblPersonalTouchEnd.bind
          (this,reviewIcon1,this.view.lblBtnPersonal.text,this.view.lblBtnBusiness.text);
          this.view.lblBtnBusiness.onTouchEnd=scope.lblBusinessTouchEnd.bind
          (this,reviewIcon2,this.view.lblBtnBusiness.text,this.view.lblBtnPersonal.text);
        }
      }
      catch(err){
        var errObj = {
          "errorInfo" : "Error in populateScreen2LabelsBasedOnContracts method of the component.",
          "error": err
        };
        scope.onError(errObj);	
      }
    },

    /**
     * @api : lblPersonalTouchEnd
     * renders the ui on accounttype view based on the radio selection.
     */
    lblPersonalTouchEnd: function(reviewIcon, option1, option2) {
      this.formatComponentValues["startIconText"]=reviewIcon["text"];
      this.formatComponentValues["startIconSkin"]=reviewIcon["skin"];
      if(this.view.lblBtnPersonal.text===option1){
        this.view.lblBtnPersonal.text=option2;
        this.view.lblBtnBusiness.text=option1;
      }
      else{
        this.view.lblBtnPersonal.text=option1;
        this.view.lblBtnBusiness.text=option2;
      }
    },

    /**
     * @api : lblBusinessTouchEnd
     * renders the ui on accounttype view based on the radio selection.
     */
    lblBusinessTouchEnd: function(reviewIcon ,option1, option2) {
      this.formatComponentValues["startIconText"]=reviewIcon["text"];
      this.formatComponentValues["startIconSkin"]=reviewIcon["skin"];
      if(this.view.lblBtnBusiness.text===option1){
        this.view.lblBtnPersonal.text=option1;
        this.view.lblBtnBusiness.text=option2;
      }
      else{
        this.view.lblBtnPersonal.text=option2;
        this.view.lblBtnBusiness.text=option1;
      }
    },

   /**
     * @api : constructDVFInput
     * fetches the entered data on the ui based on beneficiary type.
     * @param - {beneficiaryType}- String
     * return - N/A
     */
    constructDVFInput: function(beneficiaryType) {
      var self = this;
      try{
        if(beneficiaryType == "Same Bank"){
          return {
            "accountNumber": this.componentContext['accountNumber'],
            "reAccountNumber": this.componentContext['accountNumber'],
            "recipientName": this.componentContext['recipientName'],
            "nickName": this.componentContext['nickName'],         
          }     
        }

        if(beneficiaryType == "External"){
          return {
            "accountNumber": this.componentContext['accountNumber'],
            "reAccountNumber": this.componentContext['accountNumber'],
            "recipientName": this.componentContext['recipientName'],
            "nickName": this.componentContext['nickName'],
            "routingNumber" :  this.componentContext['routingNumber'],         

          }}
        if(beneficiaryType == "International"){
          return {
            "accountNumber": this.componentContext['accountNumber'],
            "reAccountNumber": this.componentContext['accountNumber'],
            "recipientName": this.componentContext['recipientName'],
            "nickName": this.componentContext['nickName'],
            "swiftCode" :  this.componentContext['swiftCode'],       
          }
        }
        if(beneficiaryType ==="P2P"){
          var radioValue = this.beneficiaryData["selectedradioButtonValue"];
          var p2pJson = {
            "recipientName" : this.componentContext['recipientName'],     
            "nickName": this.componentContext['nickName'],
          }
          radioValue === kony.i18n.getLocalizedString("i18n.payments.eMail") ? p2pJson[kony.i18n.getLocalizedString("i18n.payments.eMail")] = this.view.lblDetailValue5.text : 
          p2pJson[kony.i18n.getLocalizedString("i18n.payments.P2pPhoneNumber")] = this.view.lblDetailValue5.text;
          return p2pJson;
        }
      }
      catch(err){
        var errObj = {
            "errorInfo" : "Error in constructDvfInput method of the component.",
            "error": err
          };
          self.onError(errObj);	
      }
    },

    /**
     * @api : editBeneficiary
     * invokes service call on click of continue in edit flow for non p2p beneficiary type.
     */
    editBeneficiary: function () {
      this.performDataValidation(this.editBeneficiaryDataValidationSuccess);
    },

    editBeneficiaryDataValidationSuccess: function () {
      if (!this.componentContext.cifDataForModify) {
        this.getContracts(false);
      } else {
        this.setDataForEditBeneficiaryContracts();
      }
    },

    editP2PDataValidationSuccess: function () {
      if (!this.componentContext.cifDataForModify) {
        this.getContracts(false);
      } else {
        this.setDataForEditP2PBeneficiaryContracts();
      }
    },

    setDataForEditBeneficiaryContracts: function (data) {

      this.view.flxContractList.setVisibility(true);

      if (this.componentContext.cifDataForModify) {
        this.componentContext.cifDataForModify = false;
      } else {
        this.view.contractList.preshow(data, this.context.cif);
      }
    
      this.view.flxAddInternationalAccount.setVisibility(false);

      this.view.contractList.btnAction6.text = kony.i18n.getLocalizedString("i18n.payaperson.savereciepient");

      this.view.contractList.btnAction6.onClick = this.editBeneficiaryValidationSuccess.bind(this);
      this.view.contractList.btnAction5.onClick = this.reviewModifyAction;
      this.view.contractList.btnAction4.onClick = this.parentScope["cancelClick"];
    },

    setDataForEditP2PBeneficiaryContracts: function (data) {

      this.view.flxContractList.setVisibility(true);

      if (this.componentContext.cifDataForModify) {
        this.componentContext.cifDataForModify = false;
      } else {
        this.view.contractList.preshow(data, this.context.cif);
      }

      this.view.flxAddInternationalAccount.setVisibility(false);

      this.view.contractList.btnAction6.text = kony.i18n.getLocalizedString("i18n.payaperson.savereciepient");

      this.view.contractList.btnAction6.onClick = this.editP2PValidationSuccess.bind(this);
      this.view.contractList.btnAction5.onClick = this.reviewModifyAction;
      this.view.contractList.btnAction4.onClick = this.parentScope["cancelClick"];
    },

    /**
     * @api : editBeneficiaryValidationSuccess
     * invoked on successful validation on continue in edit beneficiary flow.
     */
    editBeneficiaryValidationSuccess: function() {
      var self = this;
      this.view.flxContractList.setVisibility(false);
      if(applicationManager.getConfigurationManager().isCombinedUser === "true") {
        if(this.beneficiaryData["isBusinessPayee"]){
          var criteria1Context=this.getParsedValueForSelectedKey(this._radioIcon1Criteria);
          var criteria2Context=this.getParsedValueForSelectedKey(this._radioIcon2Criteria);
          for(var key in criteria1Context){
            if(criteria1Context[key]===this.beneficiaryData["isBusinessPayee"]){
              var radioValue1=this.getParsedValueForSelectedKey(this._radioIcon1);
              this.formatComponentValues["startIconText"]=radioValue1.reviewIcon.vizIcon;
              this.formatComponentValues["startIconSkin"]=radioValue1.reviewIcon.skin;
            }
            else{
              var radioValue2=this.getParsedValueForSelectedKey(this._radioIcon2);
              this.formatComponentValues["startIconText"]=radioValue2.reviewIcon.vizIcon;
              this.formatComponentValues["startIconSkin"]=radioValue2.reviewIcon.skin;
            }
          }
        }
      }
      else {
        delete this.formatComponentValues["startIconText"];
        delete this.formatComponentValues["startIconSkin"];
      }
      this.preparePayload();
      var objSvcName=this.getParsedValue(this._beneficiaryobjectService);
      var objName=this.getParsedValue(this._beneficiaryObject);
      var operationName=this.getParsedValue(this._beneficiaryEDITOperation);
      var criteria=this.getCriteria(this._beneficiaryEDITCriteria);
      var identifier=this.getParsedValue(this._beneficiaryEDITIdentifier);

      if (this.view.contractList.segContract.data.length > 0) {
        this.view.screenConfirm.setConfirmScreenContractsData(this.view.contractList.segContract.data);
        if (this.view.screenConfirm.isVisible) {
          this.view.flxContractsComponent.setVisibility(true);
          this.view.lblSeparator7.width = "100%";
          criteria.cif = this.view.screenConfirm.createCIFDataForAddBenificiary(this.view.screenConfirm.segContracts.data);
        }
      } else {
        criteria.cif = JSON.stringify(this.componentContext.singleCIFContractsData);
        // delete this.componentContext.singleCIFContractsData;
      }
      this.beneficiaryManagementDAO.updateBeneficiary
      (objSvcName,objName,operationName,criteria,this.onSuccessCreateBeneficiary,identifier,self.onError);
    },

    /**
     * @api : editP2PValidationSuccess
     * invoked after successful validation on continue in edit p2p
     */
    editP2PValidationSuccess: function() {
      var self = this;
      this.view.flxContractList.setVisibility(false);
      this.preparePayload();
      var objSvcName=this.getParsedValue(this._payeeObjectService);
      var objName=this.getParsedValue(this._payeeObject);
      var operationName=this.getParsedValue(this._payeeEDITOperation);
      var criteria=this.getCriteria(this._payeeEDITCriteria);
      var identifier=this.getParsedValue(this._payeeEDITIdentifier);
      if (this.view.contractList.segContract.data.length > 0) {
        this.view.screenConfirm.setConfirmScreenContractsData(this.view.contractList.segContract.data);
        if (this.view.screenConfirm.isVisible) {
          this.view.flxContractsComponent.setVisibility(true);
          this.view.lblSeparator7.width = "100%";
          criteria.cif = this.view.screenConfirm.createCIFDataForAddBenificiary(this.view.screenConfirm.segContracts.data);
        }
      } else {
        criteria.cif = JSON.stringify(this.componentContext.singleCIFContractsData);
        // delete this.componentContext.singleCIFContractsData;
      }
      this.beneficiaryManagementDAO.editPayee
      (objSvcName,objName,operationName,criteria,this.onSuccessCreateBeneficiary,identifier,self.onError);  
    },

    /**
     * @api : editP2P
     * invokes service call on click of continue in edit flow for p2p beneficiary type.
     */
    editP2P: function() {
      this.performDataValidation(this.editP2PDataValidationSuccess);
    },

    /**
  * preparePayload
  *
  * Responsible to set the context before invoking service call.
  */
    preparePayload: function() {
      if(this.view.lblDetailValue1.isVisible)
        this.updateContext("tbx1",this.view.lblDetailValue1.text);
      if(this.view.lblDetailValue2.isVisible)
        this.updateContext("tbx2",this.view.lblDetailValue2.text);
      if(this.view.lblDetailValue3.isVisible)
        this.updateContext("tbx3",this.view.lblDetailValue3.text);
      if(this.view.lblDetailValue4.isVisible)
        this.updateContext("tbx4",this.view.lblDetailValue4.text);
      if(this.view.lblDetailValue5.isVisible)
        this.updateContext("tbx5",this.view.lblDetailValue5.text);
      this.componentContext["radioValue"]=this.beneficiaryData["selectedradioButtonValue"];
      this.componentContext["radioTextValue"]=this.view.lblDetailValue5.text;
      this.componentContext["selectedRadioBackendValue"]=this.beneficiaryData["selectedRadioBackendValue"];
      this.parserUtilsManager.setContext(this.componentContext);
    },

    /**
  * populateScreen3Data
  *
  * method that is invoked on the continue button on add beneficiary view, it populates the review screen fields.
  */
    populateScreen3Data: function() {
      kony.application.getCurrentForm().flxHeader.setActive(true);
      this.view.flxConfirmation1.isVisible = true;
      this.view.flxContent.flxNote.isVisible = false;
      this.view.flxContractList.setVisibility(false);
      if (this.view.contractList.segContract.data.length > 0) {
        this.view.flxContractsComponent.setVisibility(true);
        this.view.lblSeparator7.width = "100%";
        this.view.screenConfirm.setConfirmScreenContractsData(this.view.contractList.segContract.data);
      } else {
        this.view.flxContractsComponent.setVisibility(false);
        this.view.lblSeparator7.width = "96%";
        kony.application.getCurrentBreakpoint() === 640
          ? this.view.flxConfirmMain.height = "450dp"
          : this.view.flxConfirmMain.height = "297dp";
      }
      this.view.lblTransfers.text = this.h1Value +" - Confirmation";
      this.byPassCheck();
      this.populateScreen3LabelsBasedOnContracts();
      this.populateScreen3ValuesBasedOnContracts();
    },

    /**
  * populateScreen4Data
  *
  * method that is invoked on the add account button on review screen, it populates the fields for section2 of acknowledgement screen.
  */
    populateScreen4Data: function() {
      this.view.lblTransfers.text = this.h1Value + " - acknowledgement";
      this.view.btnNewTransfer.accessibilityConfig ={
        a11yLabel:"Transfer to Recipient." + this.componentContext.recipientName,
        a11yARIA :{
            "tabindex":0,
            "role":"button"
        }
      }
      this.populateScreen4Section1BasedOnContracts();
      this.populateScreen4Section2LabelsBasedOnContracts();
      this.populateScreen4Section2ValuesBasedOnContracts();

      if (this.view.flxContractsComponent.isVisible) {
        this.view.flxContractsComponentAck.setVisibility(true);

        let data = this.view.screenConfirm.segContracts.data;
        data.forEach(x => {
          x[0].flxDropDown.onClick = this.view.screenConfirm1.onClickRowExpand
        })
        this.view.screenConfirm1.setAckScreenContractsData(data);
        this.view.screenConfirm1.flxHorizontalLine1.setVisibility(false);
      } else {
        this.view.flxContractsComponentAck.setVisibility(false);
      }
    },

    /**
  * populateScreen4Section1BasedOnContracts
  *
  * method which populates the fields based on the contracts in section1 of acknowledgement screen.
  */
    populateScreen4Section1BasedOnContracts: function() {
      var self = this;
      try{
        var headerText=this.getParsedValue
        (this._acknowledgementTitle,this.beneficiaryData["selectedBeneficiaryType"]);
        var headerVal=this.getParsedValue
        (headerText,kony.application.getCurrentBreakpoint());
        if(headerVal){
          this.view.lblSection1Header.text=headerVal;
        }
        var name = this.getParsedValue(this._recepientName,this.beneficiaryData["selectedBeneficiaryType"]);
        var ref=this.getParsedValue
        (this._acknowledgementReferenceValue,this.beneficiaryData["selectedBeneficiaryType"]);
        var refVal=this.getParsedValue
        (ref,this.beneficiaryData["selectedflowType"]);
        refVal=this.getParsedValue(refVal);
        if(refVal){
          this.view.lblRefrenceNumberValue.text=refVal;
        }
        var refLabelText=this.getParsedValue
        (this._acknowledgementReferenceLabel,this.beneficiaryData["selectedBeneficiaryType"]);
        var refLabelVal=this.getParsedValue
        (refLabelText,kony.application.getCurrentBreakpoint());
        if(refLabelVal){
          this.view.lblRefrenceNumber.text=refLabelVal;
        }
        var ackText=this.getParsedValue
        (this._acknowledgementText,this.beneficiaryData["selectedBeneficiaryType"]);
        var ackVal=this.getParsedValue
        (ackText,this.beneficiaryData["selectedflowType"]);
        ackVal=this.getParsedValue(ackVal);
        if(ackVal){
          if(this.beneficiaryData["selectedflowType"]==="EDIT")
          	this.view.lblSection1Message.text=name+" "+kony.i18n.getLocalizedString("i18n.billPay.updateMsg");
          else
            this.view.lblSection1Message.text=ackVal;
         
        }

        var ackImage = this.getParsedImgSource
        (this._acknowledgementImage);
        if(ackImage) {
          this.view.imgAcknowledge.src = ackImage.img;
        }
      }
      catch(err){
        var errObj = {
          "errorInfo" : "Error in populateScreen4Section1BasedOnContracts method of the component.",
          "error": err
        };
        self.onError(errObj);	
      }
    },

    /**
  * populateScreen4Section2LabelsBasedOnContracts
  *
  * populates label fields based on the contracts in section2 of acknowledgement screen.
  */
    populateScreen4Section2LabelsBasedOnContracts: function() {
      var self = this;
      try{
        var headerText=this.getParsedValue
        (this._acknowledgementSection2Title,this.beneficiaryData["selectedBeneficiaryType"]);
        var headerVal=this.getParsedValue
        (headerText,kony.application.getCurrentBreakpoint());
        if(headerVal){
          this.view.lblConfirmHeader.text=headerVal;
        }
        var lbl1Text=this.getParsedValue
        (this._acknowledgementRow1Label,this.beneficiaryData["selectedBeneficiaryType"]);
        var lbl1TextValue=this.getParsedValue
        (lbl1Text,kony.application.getCurrentBreakpoint());
        if(lbl1TextValue){
          this.view.lblField1Key.text=lbl1TextValue +":";
          this.view.flxField1.setVisibility(true);
          this.view.lblField1Key.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
        }
        else
          this.view.flxField1.setVisibility(false);
        var lbl2Text=this.getParsedValue
        (this._acknowledgementRow2Label,this.beneficiaryData["selectedBeneficiaryType"]);
        var lbl2TextValue=this.getParsedValue
        (lbl2Text,kony.application.getCurrentBreakpoint());
        if(lbl2TextValue){
          this.view.lblField2Key.text=lbl2TextValue +":";
          this.view.flxField2.setVisibility(true);
          this.view.lblField2Key.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
        }
        else
          this.view.flxField2.setVisibility(false);
        var lbl3Text=this.getParsedValue
        (this._acknowledgementRow3Label,this.beneficiaryData["selectedBeneficiaryType"]);
        var lbl3TextValue=this.getParsedValue
        (lbl3Text,kony.application.getCurrentBreakpoint());
        if(lbl3TextValue){
          this.view.lblField3KEy.text=lbl3TextValue;
          this.view.flxField3.setVisibility(true);
           this.view.lblField3KEy.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
        }
        else
          this.view.flxField3.setVisibility(false);
        var lbl4Text=this.getParsedValue
        (this._acknowledgementRow4Label,this.beneficiaryData["selectedBeneficiaryType"]);
        var lbl4TextValue=this.getParsedValue
        (lbl4Text,kony.application.getCurrentBreakpoint());
        if(lbl4TextValue){
          this.view.lblField4KEy.text=lbl4TextValue +":";
          this.view.flxField4.setVisibility(true);
          this.view.lblField4KEy.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
        }
        else
          this.view.flxField4.setVisibility(false);
        var lbl5Text=this.getParsedValue
        (this._acknowledgementRow5Label,this.beneficiaryData["selectedBeneficiaryType"]);
        var lbl5TextValue=this.getParsedValue
        (lbl5Text,kony.application.getCurrentBreakpoint());
        if(lbl5TextValue){
          this.view.lblField5Key.text=lbl5TextValue +":";
          this.view.flxField5.setVisibility(true);
          this.view.lblField5Key.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
        }
        else
          this.view.flxField5.setVisibility(false);
        var lbl6Text=this.getParsedValue
        (this._acknowledgementRow6Label,this.beneficiaryData["selectedBeneficiaryType"]);
        var lbl6TextValue=this.getParsedValue
        (lbl6Text,kony.application.getCurrentBreakpoint());
        if(lbl6TextValue){
          this.view.lblField6Key.text=lbl6TextValue +":";
          this.view.flxField6.setVisibility(true);
           this.view.lblField6Key.skin = this.addBenefificaryUtility.breakPointParser
        (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
        }
        else
          this.view.flxField6.setVisibility(false);
      }
      catch(err){
        var errObj = {
          "errorInfo" : "Error in populateScreen4Section2LabelsBasedOnContracts method of the component.",
          "error": err
        };
        self.onError(errObj);	
      }
    },

    /**
  * populateScreen4Section2ValuesBasedOnContracts
  *
  * populates the values for fields based on the contracts in section2 of acknowledgement screen.
  */
    populateScreen4Section2ValuesBasedOnContracts: function() {
      var self = this;
      try{
        var currentBreakPoint = kony.application.getCurrentBreakpoint();
        var formatConfig={
          "accountNumberformat" : this._accountNumberFormat,
          "masking" : this._masking,
          "maskeyeicon" : this._maskeyeicon,
          "unmaskeyeicon" : this._unmaskeyeicon,
          "maskeyeiconskin" : JSON.stringify
          (this.addBenefificaryUtility.breakPointParser(JSON.parse(this._maskeyeiconskin), currentBreakPoint)),
          "unmaskeyeiconskin" : JSON.stringify
          (this.addBenefificaryUtility.breakPointParser(JSON.parse(this._unmaskeyeiconskin), currentBreakPoint)),
          "accountNumberSkin" : JSON.stringify
          (this.addBenefificaryUtility.breakPointParser(JSON.parse(this._accountNumberSkin), currentBreakPoint)),
          "textSkin" : JSON.stringify
          (this.addBenefificaryUtility.breakPointParser(JSON.parse(this._sknReviewValue), currentBreakPoint))
        };
        for(var key in formatConfig){
          this.formatComponentValues[key]=formatConfig[key];
        }
        var formatValues = this.formatComponentValues;
        var lbl1=this.getParsedValue
        (this._acknowledgementRow1Value,this.beneficiaryData["selectedBeneficiaryType"]);
        if(lbl1!=null){
          var lbl1Value=this.getParsedValue(lbl1.text);
          var lbl1Type=this.getParsedValue(lbl1.fieldType);
          this.view.FormatValue6.UpdateCustomProperties
          (this.addBenefificaryUtility.setFormattedData(formatValues,lbl1Value,lbl1Type));
          this.view.FormatValue6.formatText();
        }
        var lbl2=this.getParsedValue
        (this._acknowledgementRow2Value,this.beneficiaryData["selectedBeneficiaryType"]);
        if(lbl2!=null){
          var lbl2Value=this.getParsedValue(lbl2.text);
          var lbl2Type=this.getParsedValue(lbl2.fieldType);
          this.view.FormatValue7.UpdateCustomProperties
          (this.addBenefificaryUtility.setFormattedData(formatValues,lbl2Value,lbl2Type));
          this.view.FormatValue7.formatText();
        }
        var lbl3=this.getParsedValue(this._acknowledgementRow3Value,this.beneficiaryData["selectedBeneficiaryType"]);
        if(lbl3!=null){
          var lbl3Value=this.getParsedValue(lbl3.text);
          var lbl3Type=this.getParsedValue(lbl3.fieldType);
          this.view.FormatValue8.UpdateCustomProperties
          (this.addBenefificaryUtility.setFormattedData(formatValues,lbl3Value,lbl3Type));
          this.view.FormatValue8.formatText();
        }
        var lbl4=this.getParsedValue
        (this._acknowledgementRow4Value,this.beneficiaryData["selectedBeneficiaryType"]);
        if(lbl4!=null){
          var lbl4Value=this.getParsedValue(lbl4.text);
          var lbl4Type=this.getParsedValue(lbl4.fieldType);
          this.view.FormatValue9.UpdateCustomProperties
          (this.addBenefificaryUtility.setFormattedData(formatValues,lbl4Value,lbl4Type));
          this.view.FormatValue9.formatText();
        }
        var lbl5=this.getParsedValue
        (this._acknowledgementRow5Value,this.beneficiaryData["selectedBeneficiaryType"]);
        if(lbl5!=null){
          var lbl5Value=this.getParsedValue(lbl5.text);
          var lbl5Type=this.getParsedValue(lbl5.fieldType);
          this.view.FormatValue10.UpdateCustomProperties
          (this.addBenefificaryUtility.setFormattedData(formatValues,lbl5Value,lbl5Type));
          this.view.FormatValue10.formatText();
        }
        var lbl6=this.getParsedValue
        (this._acknowledgementRow6Value,this.beneficiaryData["selectedBeneficiaryType"]);
        if(lbl6!=null){
          var lbl6Value=this.getParsedValue(lbl6.text);
          var lbl6Type=this.getParsedValue(lbl6.fieldType);
          this.view.FormatValue11.UpdateCustomProperties
          (this.addBenefificaryUtility.setFormattedData(formatValues,lbl6Value,lbl6Type));
          this.view.FormatValue11.formatText();
        }
      }
      catch(err){
        var errObj = {
          "errorInfo" : "Error in populateScreen4Section2ValuesBasedOnContracts method of the component.",
          "error": err
        };
        self.onError(errObj);	
      }
    },

    /**
  * populateScreen3LabelsBasedOnContracts
  *
  * populates label fields based on the contracts for review screen  */
    populateScreen3LabelsBasedOnContracts: function() {
      var self = this;
      try{
        var headerText=this.getParsedValue
        (this._reviewSectionTitle,this.beneficiaryData["selectedBeneficiaryType"]);
        var headerVal=this.getParsedValue
        (headerText,kony.application.getCurrentBreakpoint());
        if(headerVal){
          this.view.lblHeader2.text=headerVal;
        }
        var lbl1Text=this.getParsedValue
        (this._reviewRow1Label,this.beneficiaryData["selectedBeneficiaryType"]);
        var lbl1TextValue=this.getParsedValue
        (lbl1Text,kony.application.getCurrentBreakpoint());
        if(lbl1TextValue){
          this.view.flxConfirmation1.flxConfirmation.flxConfirmMain.flxConfirmDetail1.flxKey1.lblKey1.text=lbl1TextValue;
          this.view.flxConfirmation1.flxConfirmation.flxConfirmMain.flxConfirmDetail1.setVisibility(true);
          this.view.lblKey1.skin =  this.addBenefificaryUtility.breakPointParser
        (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
        }
        else
          this.view.flxConfirmation1.flxConfirmation.flxConfirmMain.flxConfirmDetail1.setVisibility(false);
        var lbl2Text=this.getParsedValue
        (this._reviewRow2Label,this.beneficiaryData["selectedBeneficiaryType"]);
        var lbl2TextValue=this.getParsedValue
        (lbl2Text,kony.application.getCurrentBreakpoint());
        if(lbl2TextValue){
          this.view.flxConfirmation1.flxConfirmation.flxConfirmMain.flxConfirmDetail2.flxKey2.lblKey2.text=lbl2TextValue;
          this.view.flxConfirmation1.flxConfirmation.flxConfirmMain.flxConfirmDetail2.setVisibility(true);
          this.view.lblKey2.skin =  this.addBenefificaryUtility.breakPointParser
        (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
        }
        else
          this.view.flxConfirmation1.flxConfirmation.flxConfirmMain.flxConfirmDetail2.setVisibility(false);
        var lbl3Text=this.getParsedValue
        (this._reviewRow3Label,this.beneficiaryData["selectedBeneficiaryType"]);
        lbl3Text = kony.i18n.getCurrentLocale() === "ar_AE" ? ":" + lbl3Text : lbl3Text + ":";
        var lbl3TextValue=this.getParsedValue
        (lbl3Text,kony.application.getCurrentBreakpoint());
        if(lbl3TextValue){
          this.view.flxConfirmation1.flxConfirmation.flxConfirmMain.flxConfirmDetail3.flxKey3.lblKey3.text = lbl3TextValue;
          this.view.flxConfirmation1.flxConfirmation.flxConfirmMain.flxConfirmDetail3.setVisibility(true);
           this.view.lblKey3.skin =  this.addBenefificaryUtility.breakPointParser
        (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
        }
        else
          this.view.flxConfirmation1.flxConfirmation.flxConfirmMain.flxConfirmDetail3.setVisibility(false);
        var lbl4Text=this.getParsedValue
        (this._reviewRow4Label,this.beneficiaryData["selectedBeneficiaryType"]);
        var lbl4TextValue=this.getParsedValue
        (lbl4Text,kony.application.getCurrentBreakpoint());
        if(lbl4TextValue){
          this.view.flxConfirmation1.flxConfirmation.flxConfirmMain.flxConfirmDetail4.flxKey4.lblKey4.text=lbl4TextValue;
          this.view.flxConfirmation1.flxConfirmation.flxConfirmMain.flxConfirmDetail4.setVisibility(true);
          this.view.lblKey4.skin =  this.addBenefificaryUtility.breakPointParser
        (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
        }
        else
          this.view.flxConfirmation1.flxConfirmation.flxConfirmMain.flxConfirmDetail4.setVisibility(false);
        var lbl5Text=this.getParsedValue
        (this._reviewRow5Label,this.beneficiaryData["selectedBeneficiaryType"]);
        var lbl5TextValue=this.getParsedValue
        (lbl5Text,kony.application.getCurrentBreakpoint());
        if(lbl5TextValue){
          this.view.flxConfirmation1.flxConfirmation.flxConfirmMain.flxConfirmDetail5.flxKey5.lblKey5.text=lbl5TextValue;
          this.view.flxConfirmation1.flxConfirmation.flxConfirmMain.flxConfirmDetail5.setVisibility(true);
          this.view.lblKey5.skin =  this.addBenefificaryUtility.breakPointParser
        (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
        }
        else
          this.view.flxConfirmation1.flxConfirmation.flxConfirmMain.flxConfirmDetail5.setVisibility(false);
        var lbl6Text=this.getParsedValue
        (this._reviewRow6Label,this.beneficiaryData["selectedBeneficiaryType"]);
        var lbl6TextValue=this.getParsedValue
        (lbl6Text,kony.application.getCurrentBreakpoint());
        if(lbl6TextValue){
          this.view.flxConfirmation1.flxConfirmation.flxConfirmMain.flxConfirmDetail6.flxKey6.lblKey6.text=lbl6TextValue;
          this.view.flxConfirmation1.flxConfirmation.flxConfirmMain.flxConfirmDetail6.setVisibility(true);
           this.view.lblKey6.skin =  this.addBenefificaryUtility.breakPointParser
        (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
        }
        else
          this.view.flxConfirmation1.flxConfirmation.flxConfirmMain.flxConfirmDetail6.setVisibility(false);
      }
      catch(err){
        var errObj = {
          "errorInfo" : "Error in populateScreen3LabelsBasedOnContracts method of the component.",
          "error": err
        };
        self.onError(errObj);	
      }
    },

    /**
     * @api : breakPointParser
     * Helper method to parse the exposed contract based on the current breakpoint.
     * @param : inputJSON {JSONObject} - object containing information about various breakpoints and associated texts
     * @param : lookUpKey {string}     - current breakpoint value to be looked upon the above object
     * @return : value of the lookup key in the input object
     */
    breakPointParser: function(inputJSON, lookUpKey) {
      try{
        inputJSON = JSON.parse(inputJSON);
      }
      catch(e){
        inputJSON = inputJSON;       
      }
      if(inputJSON.hasOwnProperty(lookUpKey)){
        return inputJSON[lookUpKey];
      }
      else if(inputJSON["default"]){
        return inputJSON["default"];
      }
      return inputJSON;
    },

    /**
  * populateScreen3ValuesBasedOnContracts
  *
  * populates values for fields based on the contracts of review screen.
  */
    populateScreen3ValuesBasedOnContracts: function() {
      var self = this;
      try{
        var currentBreakPoint = kony.application.getCurrentBreakpoint();
        var formatConfig={
          "accountNumberformat" : this._accountNumberFormat,
          "masking" : this._masking,
          "maskeyeicon" : this._maskeyeicon,
          "unmaskeyeicon" : this._unmaskeyeicon,
          "maskeyeiconskin" : JSON.stringify
          (this.addBenefificaryUtility.breakPointParser(JSON.parse(this._maskeyeiconskin), currentBreakPoint)),
          "unmaskeyeiconskin" : JSON.stringify
          (this.addBenefificaryUtility.breakPointParser(JSON.parse(this._unmaskeyeiconskin), currentBreakPoint)),
          "accountNumberSkin" : JSON.stringify
          (this.addBenefificaryUtility.breakPointParser(JSON.parse(this._accountNumberSkin), currentBreakPoint)),
          "textSkin" : JSON.stringify({
		  "skin": this.addBenefificaryUtility.breakPointParser(JSON.parse(this._sknReviewValue), currentBreakPoint)})
        };
        for(var key in formatConfig){
          this.formatComponentValues[key]=formatConfig[key];
        }
        var formatValues = this.formatComponentValues;
        var lbl1=this.getParsedValue(this._reviewRow1Value,this.beneficiaryData["selectedBeneficiaryType"]);
        if(lbl1!=null){
          var lbl1Value=this.getParsedValue(lbl1.text);
          var lbl1Type=this.getParsedValue(lbl1.fieldType);
          this.view.FormatValue.UpdateCustomProperties
          (this.addBenefificaryUtility.setFormattedData(formatValues,lbl1Value,lbl1Type));
          this.view.FormatValue.formatText();
        }
        var lbl2=this.getParsedValue(this._reviewRow2Value,this.beneficiaryData["selectedBeneficiaryType"]);
        if(lbl2!=null){
          var lbl2Value=this.getParsedValue(lbl2.text);
          var lbl2Type=this.getParsedValue(lbl2.fieldType);
          this.view.FormatValue1.UpdateCustomProperties
          (this.addBenefificaryUtility.setFormattedData(formatValues,lbl2Value,lbl2Type));
          this.view.FormatValue1.formatText();
        }
        var lbl3=this.getParsedValue(this._reviewRow3Value,this.beneficiaryData["selectedBeneficiaryType"]);
        if(lbl3!=null){
          var lbl3Value=this.getParsedValue(lbl3.text);
          var lbl3Type=this.getParsedValue(lbl3.fieldType);
          this.view.FormatValue2.UpdateCustomProperties
          (this.addBenefificaryUtility.setFormattedData(formatValues,lbl3Value,lbl3Type));
          this.view.FormatValue2.formatText();
        }
        var lbl4=this.getParsedValue(this._reviewRow4Value,this.beneficiaryData["selectedBeneficiaryType"]);
        if(lbl4!=null){
          var lbl4Value=this.getParsedValue(lbl4.text);
          var lbl4Type=this.getParsedValue(lbl4.fieldType);
          this.view.FormatValue3.UpdateCustomProperties
          (this.addBenefificaryUtility.setFormattedData(formatValues,lbl4Value,lbl4Type));
          this.view.FormatValue3.formatText();
        }
        var lbl5=this.getParsedValue(this._reviewRow5Value,this.beneficiaryData["selectedBeneficiaryType"]);
        if(lbl5!=null){
          var lbl5Value=this.getParsedValue(lbl5.text);
          var lbl5Type=this.getParsedValue(lbl5.fieldType);
          this.view.FormatValue4.UpdateCustomProperties
          (this.addBenefificaryUtility.setFormattedData(formatValues,lbl5Value,lbl5Type));
          this.view.FormatValue4.formatText();
        }
        var lbl6=this.getParsedValue(this._reviewRow6Value,this.beneficiaryData["selectedBeneficiaryType"]);
        if(lbl6!=null){
          var lbl6Value=this.getParsedValue(lbl6.text);
          var lbl6Type=this.getParsedValue(lbl6.fieldType);
          this.view.FormatValue5.UpdateCustomProperties
          (this.addBenefificaryUtility.setFormattedData(formatValues,lbl6Value,lbl6Type));
          this.view.FormatValue5.formatText();
        }
      }
      catch(err){
        var errObj = {
          "errorInfo" : "Error in populateScreen3ValuesBasedOnContracts method of the component.",
          "error": err
        };
        self.onError(errObj);	
      }
    },

    /**
  * reviewCancelAction
  *
  * invoked on the cancel button on review screen.
  *
  * @param : JSON inputJSON
  *   object containing the context
  * @return : function 
  *   form or component method invoked for action
  */
    reviewCancelAction: function(param) {
      var scopeObj = this;
      var form = kony.application.getCurrentForm();
      var popupObj = this.view.flxPopup.clone();
      form.add(popupObj);
      popupObj.isVisible = true;
      popupObj.top = "0dp";
      popupObj.left = "0dp";
      popupObj.height = "100%";
      popupObj.flxClosePopup.centerY = "50%";
      popupObj.flxClosePopup.lblClose.setActive(true);
      popupObj.flxClosePopup.btnNo.onClick = function() {
        form.remove(popupObj);
        scopeObj.view.btnAction4.setActive(true);
      }
      popupObj.flxClosePopup.flxClose.onClick = function() {
        form.remove(popupObj);
        scopeObj.view.btnAction4.setActive(true);
      }
      popupObj.isModalContainer = true;
      this.view.forceLayout();
    },

    /**
  * reviewModifyAction
  *
  * invoked on modify button in review screen.
  *
  * @param : JSON inputJSON
  *   object containing the context
  */
    reviewModifyAction: function(param) {
      this.view.lblTransfers.text = this.h1Value;
      this.resultAccNumberValidation = [];
      this.view.flxWarning.isVisible = false;
      //this.view.rtxtWarning.isVisible = false;
      this.view.flxAddInternationalAccount.isVisible = true;
      this.view.flxConfirmation1.isVisible = false;
      this.view.flxAcknowledgement.isVisible = false; 
      this.view.flxDBXAccountType.isVisible=false;	
      this.view.flxContent.flxNote.isVisible = false;
      this.resetSkinstoOriginalValues();   
      this.componentContext.cifDataForModify = true;   
      this.view.flxContractList.setVisibility(false);
      this.view.flxDowntimeWarning.setVisibility(false);
      this.byPassCheck();
    },
    /**
     * @api : getCriteria
     * Parse the criteria based on accountType.
     * @param : criteria {string} - value collected from exposed contract
     * @return : {JSONObject} - jsonvalue for criteria
     */
    getCriteria: function(criteria) {
      var criteriaJSON = JSON.parse(criteria);
      for(var key in  criteriaJSON){
        var key1="";
        if(key.indexOf("{$") > -1){
          key1=this.parserUtilsManager.getParsedValue(key);
        }
        criteriaJSON[key] = this.parserUtilsManager.getParsedValue(criteriaJSON[key]);
        criteriaJSON[key1] = criteriaJSON[key];
        if(key.indexOf("{$") > -1){
          delete criteriaJSON[key];
        }
      }
      return criteriaJSON;
    },

    /**
  * reviewContinueAction
  *
  *invoked on continue button in review screen.
  *
  * @param : JSON inputJSON
  *   object containing the context
  */
    reviewContinueBeneficiary: function(param) { 
      var self = this;
      var objSvcName=this.getParsedValue(this._beneficiaryobjectService);
      var objName=this.getParsedValue(this._beneficiaryObject);
      var operationName=this.getParsedValue(this._beneficiaryCREATEOperation);
      var criteria=this.getCriteria(this._beneficiaryCREATECriteria);
      var identifier=this.getParsedValue(this._beneficiaryCREATEIdentifier);
      if (criteria["isBusinessPayee"] === "") {
        criteria["isBusinessPayee"] = "0";
      }
      if (this.view.flxContractsComponent.isVisible) {
        criteria.cif = this.view.screenConfirm.createCIFDataForAddBenificiary(this.view.screenConfirm.segContracts.data);
      } else {
        criteria.cif = JSON.stringify(this.componentContext.singleCIFContractsData);
        // delete this.componentContext.singleCIFContractsData;
      }
      this.beneficiaryManagementDAO.createBeneficiary
      (objSvcName,objName,operationName,criteria,this.onSuccessCreateBeneficiary,identifier,self.onError);
    },
    /**
  * categoryContinueBeneficiary
  *
  * invoked on continue button in beneficiary category screen.
  *
  * @return : NA
  */
    categoryContinueBeneficiary: function() {
      if(!this.formatComponentValues["startIconText"]){
        this.formatComponentValues["startIconText"]=this.selectedReviewText;
        this.formatComponentValues["startIconSkin"]=this.selectedReviewIcon;
      }
      var criteria1Context=this.getParsedValueForSelectedKey(this._radioIcon1Criteria);
      var criteria2Context=this.getParsedValueForSelectedKey(this._radioIcon2Criteria);
      if(this.view.lblBtnPersonal.text===this.radioIcon1InitialValue){
        this.parserUtilsManager.setContext(criteria1Context);
      }
      else{
        this.parserUtilsManager.setContext(criteria2Context);
      }
      this.populateScreen3Data();
      this.view.flxConfirmation1.isVisible = true;
      this.view.flxAddInternationalAccount.isVisible = false;
      this.view.flxAcknowledgement.isVisible = false;
      this.view.flxDBXAccountType.isVisible=false; 
      this.view.flxContent.flxNote.isVisible = false;
    },

    /**
  * reviewContinueP2P
  *
  * invoked on continue button in review screen.
  *
  * @param : JSON inputJSON
  *   object containing the context
  */
    reviewContinueP2P: function(param) {  
      var self = this;
      var objSvcName=this.getParsedValue(this._payeeObjectService);
      var objName=this.getParsedValue(this._payeeObject);
      var operationName=this.getParsedValue(this._payeeCREATEOperation);
      var criteria=this.getCriteria(this._payeeCREATECriteria);
      var identifier=this.getParsedValue(this._payeeCREATEIdentifier);
      if (this.view.flxContractsComponent.isVisible) {
        criteria.cif = this.view.screenConfirm.createCIFDataForAddBenificiary(this.view.screenConfirm.segContracts.data);
      } else {
        criteria.cif = JSON.stringify(this.componentContext.singleCIFContractsData);
        // delete this.componentContext.singleCIFContractsData;
      }
      this.beneficiaryManagementDAO.createPayee
      (objSvcName,objName,operationName,criteria,this.onSuccessCreateBeneficiary,identifier,self.onError);    
    },

    /**
  * onSuccessCreateBeneficiary
  *
  * invoked on success of service call on continue button in review screen.
  *
  * @param : JSON inputJSON
  *   object containing the context
  */
    onSuccessCreateBeneficiary: function(response, unicode) {
      if (response.dbpErrCode && response.dbpErrMsg) {
        this.view.flxDowntimeWarning.setVisibility(true);
        this.view.rtxDowntimeWarning.text = response.dbpErrMsg;
        //this.view.rtxDowntimeWarning.setActive(true);
        //this.view.flxConfirmation1.setVisibility(true);
      } else {
        this.addBenefificaryUtility.readObject(response);
        this.parserUtilsManager.setResponseData(unicode, this.addBenefificaryUtility.map);
        this.view.flxAddInternationalAccount.isVisible = false;
        this.view.flxConfirmation1.isVisible = false;
        this.view.flxDBXAccountType.isVisible = false;
        this.view.flxContent.flxAcknowledgement.isVisible = true;
        this.view.flxContent.flxNote.isVisible = false;
        this.populateScreen4Data();
        this.view.flxDowntimeWarning.setVisibility(false);
      } 
      kony.application.dismissLoadingScreen();   
      this.view.forceLayout();
    },
    
    getContext : function(param) {
      if(param == "cancel"){
        var flowType=this.getParsedValue(this.beneficiaryData["selectedflowType"]);
        return flowType;
      }
      var ref=this.getParsedValue
      (this._acknowledgementReferenceValue,this.beneficiaryData["selectedBeneficiaryType"]);
      var refVal=this.getParsedValue
      (ref,this.beneficiaryData["selectedflowType"]);
      refVal=this.getParsedValue(refVal);
      var accountNumber = this.parserUtilsManager.getParsedValue(this._accountNumber);
      var beneficiaryType =  this.beneficiaryData["selectedBeneficiaryType"];
      if(beneficiaryType =="Same Bank"){
        var payeeCreate = {"accountTo" :accountNumber,"Id":refVal, "displayName" : this.view.flxAddInternationalAccount.flxLeft.flxDetails.flxRecipientDetails.flxDetail3.lblDetailValue3.text};
      }
      if(beneficiaryType =="External" ||beneficiaryType =="International"){
        var payeeCreate = {"accountTo" :accountNumber,"Id":refVal, "displayName" : this.view.flxAddInternationalAccount.flxLeft.flxDetails.flxRecipientDetails.flxDetail4.lblDetailValue4.text};
      }
      if(beneficiaryType =="P2P"){
        var payeeCreate = {"PayPersonId" :refVal, "name" : this.view.flxAddInternationalAccount.flxLeft.flxDetails.flxRecipientDetails.flxDetail1.lblDetailValue1.text};
    }
       return payeeCreate;
    },

    /**
  * actionHandler
  *
  * helpter method used on initializing actions for the component, it retrieves the actionJSON from the property.
  *
  *context{JSON} - context object
  * property{String} - contains custom property defined

  */
    actionHandler: function(context, property) {
      var self = this;
      try{
        if(property!==null && property !== undefined){
          var propertyJSON = JSON.parse(property);
          var parsedValue=propertyJSON;
          if (typeof(parsedValue !== "string")) {
            parsedValue = parsedValue.hasOwnProperty("action") ? parsedValue["action"] : parsedValue;
          }
          if((typeof(parsedValue)!=="string" && Object.keys(parsedValue)[1].indexOf("$.BNFTYPES")>-1) ||
             (typeof(parsedValue)==="string" && parsedValue.indexOf("$.BNFTYPES")>-1)) {
            parsedValue=this.getParsedValue(parsedValue,this.beneficiaryData["selectedBeneficiaryType"]); 
            if(typeof(parsedValue!=="string")){
              parsedValue=parsedValue.hasOwnProperty("action")?parsedValue["action"]:parsedValue;
            }
          }
          if((typeof(parsedValue)!=="string" && Object.keys(parsedValue)[1].indexOf("$.FLOWTYPES")>-1) ||
             (typeof(parsedValue)==="string" && parsedValue.indexOf("$.FLOWTYPES")>-1)) {
            parsedValue=this.getParsedValue(parsedValue,this.beneficiaryData["selectedflowType"]);  
            if(typeof(parsedValue!=="string")){
              parsedValue=parsedValue.hasOwnProperty("action")?parsedValue["action"]:parsedValue;
            }
          }
          var actionJSON = parsedValue;
          var level = actionJSON.level;  
          var method = actionJSON.method;
          this.invokeInstaceAction(level,method,context);
          this.byPassCheck();
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

    /**
  * invokeInstaceAction
  *
  * helper method to retrieve the form/component method.
  * levelInstance{String} -either form or component 
  * method {String} - method to be invoked
  * context{JSON} -context 
  */
    invokeInstaceAction: function(levelInstance, method, context) {     
      if(levelInstance.toLowerCase().trim() === "form")
      {  
        this.parentScope[method](context);
      }
      if(levelInstance.toLowerCase().trim() === "component")
      {
        this[method](context);
      } 
    },

    /**
  * removeError
  *
  * responsible for removing error label.
  */ 
    removeError: function() {
      this.resultAccNumberValidation = [];
      this.view.flxWarning.isVisible = false;
      //this.view.rtxtWarning.isVisible = false;
      this.view.forceLayout();
    },

    /**
  * setComponentConfigs
  *
  * responsible for sending componentContext passed into parserUtilManager.
  */
    setComponentConfigs: function() {
      this.parserUtilsManager.setBeneficiaryTypeConfig(JSON.parse(this._BNFTYPES));
      this.parserUtilsManager.setBreakPointConfig(JSON.parse(this._BREAKPTS));
      this.parserUtilsManager.setFlowTypeConfig(JSON.parse(this._FLOWTYPES));
    },

    /**
  * quickLinkAction1
  *
  * responsible for setting context via quicklinks.
  */
    quickLinkAction1: function() {
      var params={
        "flowType":"ADD",
        "beneficiaryType":"Same Bank",
        "accountNumber":"",
        "recipientName":"",
        "nickName":"",
        "routingNumber":"",
        "swiftCode":"",
        "radioTextValue":"",
        "radioValue":"",
        "bankName":"Infinity",
        "isBusinessPayee":"0",
        "displayName":"OTHER_INTERNAL_MEMBER",
        "isSameBankAccount":"true",
        "isInternationalAccount":"false",
        "isVerified":"true",
        "userRoleType":"TYPE_ID_BUSINESS"
      };
      this.setContext(params,this);
      this.preShow();
    },

    /**
  * quickLinkAction2
  *
  * context via quicklinks.
  */
    quickLinkAction2: function() {
      var params={
        "flowType":"ADD",
        "beneficiaryType":"External",
        "accountNumber":"",
        "recipientName":"",
        "nickName":"",
        "routingNumber":"",
        "swiftCode":"",
        "radioTextValue":"",
        "radioValue":"",
        "bankName":"Axis Bank",
        "isBusinessPayee":"0",
        "displayName":"OTHER_EXTERNAL_ACCOUNT",
        "isSameBankAccount":"false",
        "isInternationalAccount":"false",
        "isVerified":"true",
        "userRoleType":"TYPE_ID_BUSINESS"
      };      
      this.setContext(params,this);
      this.preShow();
    },

    /**
  * quickLinkAction3
  *
  * context via quicklinks.
  */
    quickLinkAction3: function() {
      var params={
        "flowType":"ADD",
        "beneficiaryType":"International",
        "accountNumber":"",
        "recipientName":"",
        "nickName":"",
        "routingNumber":"",
        "swiftCode":"",
        "radioTextValue":"",
        "radioValue":"",
        "bankName":"Chase Bank",
        "isBusinessPayee":"0",
        "displayName":"INTERNATIONAL_ACCOUNT",
        "isSameBankAccount":"false",
        "isInternationalAccount":"true",
        "isVerified":"true",
        "userRoleType":"TYPE_ID_BUSINESS"
      };      
      this.setContext(params,this);     
      this.preShow();
    },

    /**
  * quickLinkAction4
  *
  * context via quicklinks.
  */
    quickLinkAction4: function() {
      var params={
        "flowType":"ADD",
        "beneficiaryType":"P2P",
        "accountNumber":"",
        "recipientName":"",
        "nickName":"",
        "routingNumber":"",
        "swiftCode":"",
        "radioTextValue":"",
        "radioValue":"",
        "userRoleType":"TYPE_ID_BUSINESS"
      };      
      this.setContext(params,this);     
      this.preShow();
    },

    /**
  * setContextIntoParser
  *
  * context into parserUtilManacger.
  */
    setContextIntoParser: function() {  
      this.parserUtilsManager.setContext(this.context);
      this.beneficiaryData["selectedflowType"] = 
        this.parserUtilsManager.getParsedValue(this._selectedflowType);
      this.beneficiaryData["selectedBeneficiaryType"] = 
        this.parserUtilsManager.getParsedValue(this._selectedBeneficiaryType);
      this.beneficiaryData["isBusinessPayee"]=this.context.isBusinessPayee;
      this.beneficiaryData["accountNumber"] =
        this.parserUtilsManager.getParsedValue(this._accountNumber);
      this.beneficiaryData["swiftCode"] =
        this.parserUtilsManager.getParsedValue(this._swiftCode);
      this.beneficiaryData["routingNumber"]=this.parserUtilsManager.getParsedValue(this._routingNumber);
      this.beneficiaryData["nickName"] =
        this.parserUtilsManager.getParsedValue(this._nickName);
      this.beneficiaryData["recepientName"] =
        this.parserUtilsManager.getParsedValue(this._recepientName);
      this.beneficiaryData["selectedBeneficiaryType"] =
        this.parserUtilsManager.getParsedValue(this._selectedBeneficiaryType);     
      this.beneficiaryData["selectedRadioTextInputValue"] =
        this.parserUtilsManager.getParsedValue(this._selectedRadioTextInputValue);
      this.beneficiaryData["selectedRadioBackendValue"] =
        this.parserUtilsManager.getParsedValue(this._selectedRadioBackendValue);
      this.beneficiaryData["userRoleType"] =
        this.parserUtilsManager.getParsedValue(this._selectedUserRoleType);
    },

    /**
  * setQuickLinksVisible
  *
  * Making the selected account quick link as invisible and others as visible.
  */
    setQuickLinksVisible: function(selectedAccount) {
      if(selectedAccount === "Same Bank") {
       var quickLink2=this.addBenefificaryUtility.buttonParsedValue(this._quickLink2);
        var entitlementQuickLink2 = this.addBenefificaryUtility.retrieveEntitlement(this._quickLink2);
        var retrieveEntitlementQuickLink2 = this.EntitlementUtils.isEntitled(entitlementQuickLink2);
        if(quickLink2 && retrieveEntitlementQuickLink2){
          var quickLink2Text=this.setButtonText(quickLink2);
          this.view.flxQuickLinks.flxQuickLink1.lblQuickLink1.text=quickLink2Text;
          this.view.flxQuickLinks.flxQuickLink1.setVisibility(true);
          this.view.flxQuickLink1.onClick =  this.actionHandler.bind
      (this,this.context,this._quickLink2);
        }
        else{
          this.view.flxQuickLinks.flxQuickLink1.setVisibility(false);
        } 
        var quickLink3=this.addBenefificaryUtility.buttonParsedValue(this._quickLink3);
        var entitlementQuickLink3 = this.addBenefificaryUtility.retrieveEntitlement(this._quickLink3);
        var retrieveEntitlementQuickLink3 = this.EntitlementUtils.isEntitled(entitlementQuickLink3);
        if(quickLink3 && retrieveEntitlementQuickLink3){
          var quickLink3Text=this.setButtonText(quickLink3);
          this.view.flxQuickLinks.flxQuickLink2.lblQuickLink2.text = quickLink3Text;
          this.view.flxQuickLinks.flxQuickLink2.setVisibility(true);
          this.view.flxQuickLink2.onClick =  this.actionHandler.bind
      (this,this.context,this._quickLink3);
        }
        else{
          this.view.flxQuickLinks.flxQuickLink2.setVisibility(false);
        }     

        var quickLink4=this.addBenefificaryUtility.buttonParsedValue(this._quickLink4);
        var entitlementQuickLink4= this.addBenefificaryUtility.retrieveEntitlement(this._quickLink4);
        var retrieveEntitlementQuickLink4 = this.EntitlementUtils.isEntitled(entitlementQuickLink4)
        if(quickLink4 && retrieveEntitlementQuickLink4){
          var quickLink4Text=this.setButtonText(quickLink4);
          this.view.flxQuickLinks.flxQuickLink3.lblQuickLink3.text = quickLink4Text;
          this.view.flxQuickLinks.flxQuickLink3.setVisibility(true);
          this.view.flxQuickLink3.onClick =  this.actionHandler.bind
      (this,this.context,this._quickLink4);
        }
        else{
          this.view.flxQuickLinks.flxQuickLink3.setVisibility(false);
        }

        this.view.flxQuickLinks.flxQuickLink4.isVisible = false;
        this.view.flxQuickLinks.flxQuickLink3.lblSeperator5.isVisible = false;
        
        this.view.flxContent.flxAddInternationalAccount.flxRight.flxP2PQuickLinks.isVisible = false;
      }
      else if(selectedAccount === "External") {
        var quickLink1=this.addBenefificaryUtility.buttonParsedValue(this._quickLink1);
        var entitlementQuickLink1 = this.addBenefificaryUtility.retrieveEntitlement(this._quickLink1);
        var retrieveEntitlementQuickLink1 = this.EntitlementUtils.isEntitled(entitlementQuickLink1)
        if(quickLink1 && retrieveEntitlementQuickLink1){
          var quickLink1Text=this.setButtonText(quickLink1);
          this.view.flxQuickLinks.flxQuickLink1.lblQuickLink1.text=quickLink1Text;
          this.view.flxQuickLinks.flxQuickLink1.setVisibility(true);
            this.view.flxQuickLink1.onClick =  this.actionHandler.bind
      (this,this.context,this._quickLink1);
        }
        else{
          this.view.flxQuickLinks.flxQuickLink1.setVisibility(false);
        }

        var quickLink3=this.addBenefificaryUtility.buttonParsedValue(this._quickLink3);
        var entitlementQuickLink3 = this.addBenefificaryUtility.retrieveEntitlement(this._quickLink3);
        var retrieveEntitlementQuickLink3 = this.EntitlementUtils.isEntitled(entitlementQuickLink3);
        if(quickLink3 && retrieveEntitlementQuickLink3){
          var quickLink3Text=this.setButtonText(quickLink3);
          this.view.flxQuickLinks.flxQuickLink2.lblQuickLink2.text = quickLink3Text;
          this.view.flxQuickLinks.flxQuickLink2.setVisibility(true);
           this.view.flxQuickLink2.onClick =  this.actionHandler.bind
      (this,this.context,this._quickLink3);
        }
        else{
          this.view.flxQuickLinks.flxQuickLink2.setVisibility(false);
        }     

        var quickLink4=this.addBenefificaryUtility.buttonParsedValue(this._quickLink4);
        var entitlementQuickLink4= this.addBenefificaryUtility.retrieveEntitlement(this._quickLink4);
        var retrieveEntitlementQuickLink4 = this.EntitlementUtils.isEntitled(entitlementQuickLink4)
        if(quickLink4 && retrieveEntitlementQuickLink4){
          var quickLink4Text=this.setButtonText(quickLink4);
          this.view.flxQuickLinks.flxQuickLink3.lblQuickLink3.text = quickLink4Text;
          this.view.flxQuickLinks.flxQuickLink3.setVisibility(true);
           this.view.flxQuickLink3.onClick =  this.actionHandler.bind
      (this,this.context,this._quickLink4);
        }
        else{
          this.view.flxQuickLinks.flxQuickLink3.setVisibility(false);
        }
        this.view.flxQuickLinks.flxQuickLink4.isVisible = false;
        this.view.flxQuickLinks.flxQuickLink3.lblSeperator5.isVisible = false;
        this.view.flxContent.flxAddInternationalAccount.flxRight.flxP2PQuickLinks.isVisible = false;
      }
      else if(selectedAccount === "International") {
        var quickLink1=this.addBenefificaryUtility.buttonParsedValue(this._quickLink1);
        var entitlementQuickLink1 = this.addBenefificaryUtility.retrieveEntitlement(this._quickLink1);
        var retrieveEntitlementQuickLink1 = this.EntitlementUtils.isEntitled(entitlementQuickLink1)
        if(quickLink1 && retrieveEntitlementQuickLink1){
          var quickLink1Text=this.setButtonText(quickLink1);
          this.view.flxQuickLinks.flxQuickLink1.lblQuickLink1.text=quickLink1Text;
          this.view.flxQuickLinks.flxQuickLink1.setVisibility(true);
           this.view.flxQuickLink1.onClick =  this.actionHandler.bind
      (this,this.context,this._quickLink1);
        }
        else{
          this.view.flxQuickLinks.flxQuickLink1.setVisibility(false);
        }

        var quickLink2=this.addBenefificaryUtility.buttonParsedValue(this._quickLink2);
        var entitlementQuickLink2 = this.addBenefificaryUtility.retrieveEntitlement(this._quickLink2);
        var retrieveEntitlementQuickLink2 = this.EntitlementUtils.isEntitled(entitlementQuickLink2);
        if(quickLink2 && retrieveEntitlementQuickLink2){
          var quickLink2Text=this.setButtonText(quickLink2);
          this.view.flxQuickLinks.flxQuickLink2.lblQuickLink2.text=quickLink2Text;
          this.view.flxQuickLinks.flxQuickLink2.setVisibility(true);
           this.view.flxQuickLink2.onClick =  this.actionHandler.bind
      (this,this.context,this._quickLink2);
        }
        else{
          this.view.flxQuickLinks.flxQuickLink2.setVisibility(false);
        } 

        var quickLink4=this.addBenefificaryUtility.buttonParsedValue(this._quickLink4);
        var entitlementQuickLink4= this.addBenefificaryUtility.retrieveEntitlement(this._quickLink4);
        var retrieveEntitlementQuickLink4 = this.EntitlementUtils.isEntitled(entitlementQuickLink4)
        if(quickLink4 && retrieveEntitlementQuickLink4){
          var quickLink4Text=this.setButtonText(quickLink4);
          this.view.flxQuickLinks.flxQuickLink3.lblQuickLink3.text = quickLink4Text;
          this.view.flxQuickLinks.flxQuickLink3.setVisibility(true);
           this.view.flxQuickLink3.onClick =  this.actionHandler.bind
      (this,this.context,this._quickLink4);
        }
        else{
          this.view.flxQuickLinks.flxQuickLink3.setVisibility(false);
        }
        this.view.flxQuickLinks.flxQuickLink4.isVisible = false;
        this.view.flxQuickLinks.flxQuickLink3.lblSeperator5.isVisible = false;
        this.view.flxContent.flxAddInternationalAccount.flxRight.flxP2PQuickLinks.isVisible = false;
      }
      else if(selectedAccount === "P2P") {
        this.view.flxContent.flxAddInternationalAccount.flxRight.flxP2PQuickLinks.isVisible = true;
        var quickLink1=this.addBenefificaryUtility.buttonParsedValue(this._quickLink1);
        var entitlementQuickLink1 = this.addBenefificaryUtility.retrieveEntitlement(this._quickLink1);
        var retrieveEntitlementQuickLink1 = this.EntitlementUtils.isEntitled(entitlementQuickLink1)
        if(quickLink1 && retrieveEntitlementQuickLink1){
          var quickLink1Text=this.setButtonText(quickLink1);
          this.view.flxQuickLinks.flxQuickLink1.lblQuickLink1.text=quickLink1Text;
          this.view.flxQuickLinks.flxQuickLink1.setVisibility(true);      
           this.view.flxQuickLink1.onClick =  this.actionHandler.bind
      (this,this.context,this._quickLink1);
        }
        else{
          this.view.flxQuickLinks.flxQuickLink1.setVisibility(false);
        }

        var quickLink2=this.addBenefificaryUtility.buttonParsedValue(this._quickLink2);
        var entitlementQuickLink2 = this.addBenefificaryUtility.retrieveEntitlement(this._quickLink2);
        var retrieveEntitlementQuickLink2 = this.EntitlementUtils.isEntitled(entitlementQuickLink2);
        if(quickLink2 && retrieveEntitlementQuickLink2){
          var quickLink2Text=this.setButtonText(quickLink2);
          this.view.flxQuickLinks.flxQuickLink2.lblQuickLink2.text=quickLink2Text;
          this.view.flxQuickLinks.flxQuickLink2.setVisibility(true);
           this.view.flxQuickLink2.onClick =  this.actionHandler.bind
      (this,this.context,this._quickLink2);
        }
        else{
          this.view.flxQuickLinks.flxQuickLink2.setVisibility(false);
        } 

        var quickLink3=this.addBenefificaryUtility.buttonParsedValue(this._quickLink3);
        var entitlementQuickLink3 = this.addBenefificaryUtility.retrieveEntitlement(this._quickLink3);
        var retrieveEntitlementQuickLink3 = this.EntitlementUtils.isEntitled(entitlementQuickLink3);
        if(quickLink3 && retrieveEntitlementQuickLink3){
          var quickLink3Text=this.setButtonText(quickLink3);
          this.view.flxQuickLinks.flxQuickLink3.lblQuickLink3.text = quickLink3Text;
          this.view.flxQuickLinks.flxQuickLink3.setVisibility(true);
           this.view.flxQuickLink3.onClick =  this.actionHandler.bind
      (this,this.context,this._quickLink3);
        }
        else{
          this.view.flxQuickLinks.flxQuickLink3.setVisibility(false);
        }    
        this.view.flxQuickLinks.flxQuickLink4.isVisible = false;
        this.view.flxQuickLinks.flxQuickLink3.lblSeperator5.isVisible = false;
        
        var p2pQuickLink1=this.addBenefificaryUtility.buttonParsedValue(this._p2pQuickLink1);
        var entitlementQuickLink1P2P = this.addBenefificaryUtility.retrieveEntitlement(this._p2pQuickLink1);
        var retrieveEntitlementQuickLink1P2P = this.EntitlementUtils.isEntitled(entitlementQuickLink1P2P);
        if(p2pQuickLink1 && retrieveEntitlementQuickLink1P2P){
          var quickLink1P2PText=this.setButtonText(p2pQuickLink1);
          this.view.flxP2PQuickLinks.flxP2PQuickLink1.lblP2PQuickLink1.text = quickLink1P2PText;
          this.view.flxP2PQuickLink1.onClick =  this.actionHandler.bind
          (this,this.context,this._p2pQuickLink1);
          this.view.flxP2PQuickLinks.flxP2PQuickLink1.setVisibility(true);
          
          this.view.flxP2PQuickLinks.flxP2PQuickLink1.accessibilityConfig = {
            a11yLabel : quickLink1P2PText,
                a11yARIA : {
                    tabindex : 0,
                    role : "link"
                }
            }
        }
        else{
          this.view.flxP2PQuickLinks.flxP2PQuickLink1.setVisibility(false);
        }

        var p2pQuickLink2=this.addBenefificaryUtility.buttonParsedValue(this._p2pQuickLink2);
        var entitlementQuickLink2P2P = this.addBenefificaryUtility.retrieveEntitlement(this._p2pQuickLink2);
        var retrieveEntitlementQuickLink2P2P = this.EntitlementUtils.isEntitled(entitlementQuickLink2P2P);
        if(p2pQuickLink2 && retrieveEntitlementQuickLink2P2P){
          var quickLink2P2PText=this.setButtonText(p2pQuickLink2);
          this.view.flxP2PQuickLinks.flxP2PQuickLink2.lblP2PQuickLink2.text = quickLink2P2PText;
          this.view.flxP2PQuickLink2.onClick =  this.actionHandler.bind
          (this,this.context,this._p2pQuickLink2);
          this.view.flxP2PQuickLinks.flxP2PQuickLink2.setVisibility(true);
          
          this.view.flxP2PQuickLinks.flxP2PQuickLink2.accessibilityConfig = {
            a11yLabel : quickLink2P2PText,
                a11yARIA : {
                    tabindex : 0,
                    role : "link"
                }
            }

          }
        }
        else{
          this.view.flxP2PQuickLinks.flxP2PQuickLink2.setVisibility(false);
          
        }
      this.view.forceLayout();
    },


    /**
  * populateBlockTitleAndScreen1Details
  *
  * initial function for setting data into UI in pre-show.
  */
    populateBlockTitleAndScreen1Details: function() {
      var self = this;
      try{
        var headerText=this.getParsedValue
        (this._blockTitle,this.beneficiaryData["selectedBeneficiaryType"]);
        if(typeof(headerText)!=="string" && Object.keys(headerText)[0].indexOf("$.FLOWTYPES")>-1){
          headerText=this.getParsedValue(headerText,this.beneficiaryData["selectedflowType"]);  
        }
        var headerVal=this.getParsedValue(headerText,kony.application.getCurrentBreakpoint());
        headerVal=this.getParsedValue(headerVal);
        if(headerVal){
          this.view.lblTransfers.text=headerVal;
          this.h1Value = headerVal;
        }
        this.populateScreen1Data();
      }
      catch(err){
        var errObj = {
          "errorInfo" : "Error in populateBlockTitleAndScreen1Details method of the component.",
          "error": err
        };
        self.onError(errObj);	
      }
    },


    /**
  * populateScreen1Data
  *
  * responsible for populating add beneficiary fields data based on contracts.
  */
    populateScreen1Data: function() {
      this.populateLabelsBasedOnContracts();
      this.populateTextInputsBasedOnContracts();
      this.enableOrDisableTextInputsBasedOnContracts();
      this.p2pcontactInfoRadio();
      this.populateButtonTexts();
      this.setQuickLinksVisible(this.beneficiaryData["selectedBeneficiaryType"]);
      if(this.beneficiaryData["selectedBeneficiaryType"] === 'Same Bank')
       this.view.lblDetailValue2.placeholder = kony.i18n.getLocalizedString("i18n.UnifiedAddBeneficiary.ReenterAccountNumber");
      if(this.beneficiaryData["selectedBeneficiaryType"] === 'External' || this.beneficiaryData["selectedBeneficiaryType"] === 'International')
        this.view.lblDetailValue3.placeholder = kony.i18n.getLocalizedString("i18n.UnifiedAddBeneficiary.ReenterAccountNumber");
    },

    /**
  * populateButtonTexts
  *
  *  populates button texts in add beneficiary view.
  */
    populateButtonTexts: function() {
      var self = this;
      try{        
        var parsedValue1=this.addBenefificaryUtility.buttonParsedValue(this._addBeneficiaryButton1);
        if(parsedValue1){
          var btn1Text=this.setButtonText(parsedValue1);
          this.view.btnAction1.text=btn1Text;
          this.view.btnAction1.setVisibility(true);
        }
        else{
          this.view.btnAction1.setVisibility(false);
        }
        var parsedValue2=this.addBenefificaryUtility.buttonParsedValue(this._addBeneficiaryButton2);
        if(parsedValue2){
          var btn2Text=this.setButtonText(parsedValue2);
          this.view.btnAction2.text=btn2Text;
          this.view.btnAction2.setVisibility(true);
        }
        else{
          this.view.btnAction2.setVisibility(false);
        }
        var parsedValue3=this.addBenefificaryUtility.buttonParsedValue(this._addBeneficiaryButton3);
        if(parsedValue3){
          var btn3Text=this.setButtonText(parsedValue3);
          this.view.btnAction3.text=btn3Text;
          this.view.btnAction3.setVisibility(true);
        }
        else{
          this.view.btnAction3.setVisibility(false);
        }
        var parsedValue4=this.addBenefificaryUtility.buttonParsedValue(this._reviewButton1);
        if(parsedValue4){
          var btn4Text=this.setButtonText(parsedValue4);
          this.view.btnAction4.text=btn4Text;
          this.view.btnAction4.setVisibility(true);
        }
        else{
          this.view.btnAction4.setVisibility(false);
        }
        var parsedValue5=this.addBenefificaryUtility.buttonParsedValue(this._reviewButton2);
        if(parsedValue5){
          var btn5Text=this.setButtonText(parsedValue5);
          this.view.btnAction5.text=btn5Text;
          this.view.btnAction5.setVisibility(true);
        }
        else{
          this.view.btnAction5.setVisibility(false);
        }
        var parsedValue6=this.addBenefificaryUtility.buttonParsedValue(this._reviewButton3);
        if(parsedValue6){
          var btn6Text=this.setButtonText(parsedValue6);
          this.view.btnAction6.text=btn6Text;
          this.view.btnAction6.setVisibility(true);
        }
        else{
          this.view.btnAction6.setVisibility(false);
        }
        var parsedValue7=this.addBenefificaryUtility.buttonParsedValue(this._reviewCancelYesButton);
        if(parsedValue7){
          var btn7Text=this.setButtonText(parsedValue7);
          this.view.btnYes.text=btn7Text;
          this.view.btnYes.setVisibility(true);
        }
        else{
          this.view.btnYes.setVisibility(false);
        }
        var parsedValue8 = this.ackButtonsHandler(this._acknowledgementButton1);
        if (parsedValue8) {
          var retrieveEntitlement = parsedValue8.entitlement;
          retrieveEntitlement = this.EntitlementUtils.isEntitled(retrieveEntitlement);
          if (parsedValue8 && retrieveEntitlement) {                        
            this.view.btnAddAnotherRecipient.text = parsedValue8.text.indexOf("{i.") != -1 ? this.parserUtilsManager.getDecoratorText(parsedValue8.text) : parsedValue8.text;
            this.view.btnAddAnotherRecipient.setVisibility(true);
          } else {
            this.view.btnAddAnotherRecipient.setVisibility(false);
          }
        }
        var parsedValue9 = this.ackButtonsHandler(this._acknowledgementButton2);
        if (parsedValue9) {
          var retrieveEntitlement = parsedValue9.entitlement;
          retrieveEntitlement = this.EntitlementUtils.isEntitled(retrieveEntitlement);
          if (parsedValue9 && retrieveEntitlement) {                        
            this.view.btnNewTransfer.text = parsedValue9.text.indexOf("{i.") != -1 ? this.parserUtilsManager.getDecoratorText(parsedValue9.text) : parsedValue9.text ;
            this.view.btnNewTransfer.setVisibility(true);
          } else {
            this.view.btnNewTransfer.setVisibility(false);
          }
        }
        var parsedValue10=this.addBenefificaryUtility.buttonParsedValue(this._acknowledgmentButton3);
        if(parsedValue10){
          var btn10Text=this.setButtonText(parsedValue10);
          this.view.btn3.text=btn10Text;
          this.view.btn3.setVisibility(true);
        }
        else{
          this.view.btn3.setVisibility(false);
        }
        var parsedValue11=this.addBenefificaryUtility.buttonParsedValue(this._selectionButton1);
        if(parsedValue11){
          var btn11Text=this.setButtonText(parsedValue11);
          this.view.btnCancelAccount.text=btn11Text;
          this.view.btnCancelAccount.setVisibility(true);
        }
        else{
          this.view.btnCancelAccount.setVisibility(false);
        }
        var parsedValue12=this.addBenefificaryUtility.buttonParsedValue(this._selectionButton2);
        if(parsedValue12){
          var btn12Text=this.setButtonText(parsedValue12);
          this.view.btnModify.text=btn12Text;
          this.view.btnModify.setVisibility(true);
        }
        else{
          this.view.btnModify.setVisibility(false);
        }
        var parsedValue13=this.addBenefificaryUtility.buttonParsedValue(this._selectionButton3);
        if(parsedValue13){
          var btn13Text=this.setButtonText(parsedValue13);
          this.view.btnConfirm.text=btn13Text;
          this.view.btnConfirm.setVisibility(true);
        }
        else{
          this.view.btnConfirm.setVisibility(false);
        }
      }
      catch(err){
        var errObj = {
          "errorInfo" : "Error in populateButtonTexts method of the component.",
          "error": err
        };
        self.onError(errObj);	
      }
    },

    /**
  * setButtonText
  *
  *  helper method for parsing button text.
  */
    setButtonText: function(value) {
      var self = this;
      try{
        var parsedValue=value;
        if (typeof(parsedValue !== "string")) {
          parsedValue = parsedValue.hasOwnProperty("text") ? parsedValue["text"] : parsedValue;
        }
        if((typeof(parsedValue)!=="string" && Object.keys(parsedValue)[1].indexOf("$.BNFTYPES")>-1) ||
           (typeof(parsedValue)==="string" && parsedValue.indexOf("$.BNFTYPES")>-1)) {
          parsedValue=this.getParsedValue
          (parsedValue,this.beneficiaryData["selectedBeneficiaryType"]); 
          if(typeof(parsedValue!=="string")){
            parsedValue=parsedValue.hasOwnProperty("text")?parsedValue["text"]:parsedValue;
          }
        }
        if((typeof(parsedValue)!=="string" && Object.keys(parsedValue)[1].indexOf("$.FLOWTYPES")>-1) ||
           (typeof(parsedValue)==="string" && parsedValue.indexOf("$.FLOWTYPES")>-1)) {
          parsedValue=this.getParsedValue
          (parsedValue,this.beneficiaryData["selectedflowType"]);  
          if(typeof(parsedValue!=="string")){
            parsedValue=parsedValue.hasOwnProperty("text")?parsedValue["text"]:parsedValue;
          }
        }
        if((typeof(parsedValue)!=="string" && Object.keys(parsedValue)[1].indexOf("$.BREAKPTS")>-1)|| 
           (typeof(parsedValue)==="string" && parsedValue.indexOf("$.BREAKPTS")>-1)){
          parsedValue=this.getParsedValue
          (parsedValue,kony.application.getCurrentBreakpoint());
        }
        else
          parsedValue=this.getParsedValue(parsedValue,kony.application.getCurrentBreakpoint());
        return parsedValue;
      }
      catch(err){
        var errObj = {
          "errorInfo" : "Error in setButtonText method of the component.",
          "error": err
        };
        self.onError(errObj);	
      }
    },

    /**
  * p2pcontactInfoRadio
  *
  * displays radioButtons in add Beneficary screen for p2p beneficiary type.
  */
    p2pcontactInfoRadio: function() {
      try{
        var scope=this;
        var lbl6Text=this.getParsedValue
        (this._radioInput1Label,this.beneficiaryData["selectedBeneficiaryType"]);
        var lbl6TextValue=this.getParsedValue
        (lbl6Text,kony.application.getCurrentBreakpoint());
        if(lbl6TextValue){
          this.view.flxDetails.flxRecipientDetails.flxDetail6.flxDetailKey6.lblDetailKey6.text = lbl6TextValue;
          this.view.flxDetails.flxRecipientDetails.flxDetail6.setVisibility(true);
          var radioText=this.getParsedValue
          (this._radioInput1Value,this.beneficiaryData["selectedBeneficiaryType"]);
          if(radioText.infoIconText) {
            this.view.flxDetails.flxRecipientDetails.flxDetail6.flxDetailKey6.imgInfo6.isVisible = true;
            var infoIconHeader = this.getParsedValue
            (radioText.infoIconText.header, kony.application.getCurrentBreakpoint());
            this.view.lblInfoHeader6.text = infoIconHeader;
            var infoIconText = this.getParsedValue
            (radioText.infoIconText.text, kony.application.getCurrentBreakpoint());
            this.view.lblInfoText6.text = infoIconText;
          }
          else {
            this.view.flxDetails.flxRecipientDetails.flxDetail6.flxDetailKey6.imgInfo6.isVisible = false;
          }
          var textInputRequired=radioText.textInputRequired;
          var options=radioText.optionValues;
          var optionValues=options.split(",");
          var optionBackendValues=radioText.optionBackendValues;
          optionBackendValues=optionBackendValues.split(",");
          if(optionBackendValues!=null && optionValues!=null){
            optionValues[0] = optionValues[0].indexOf("{i.") != -1 ? this.parserUtilsManager.getDecoratorText(optionValues[0]) : optionValues[0];
            optionValues[1] = optionValues[1].indexOf("{i.") != -1 ? this.parserUtilsManager.getDecoratorText(optionValues[1]) : optionValues[1];
            this.radioMappings[optionValues[0]]=optionBackendValues[0];
            this.radioMappings[optionValues[1]]=optionBackendValues[1];
          }
          this.view.flxDetails.flxRecipientDetails.flxDetail6.flxDetailValue6.img1.src = "radio_btn_inactive.png";
          this.view.flxDetails.flxRecipientDetails.flxDetail6.flxDetailValue6.img2.src = "radio_btn_inactive.png";
          this.view.flxDetails.flxRecipientDetails.flxDetail6.flxDetailValue6.flxBtn1.accessibilityConfig = {
                        a11yARIA: {
                        "tabindex": 0,
                        "role": "radio",
                        "aria-labelledby": this.view.flxDetails.flxRecipientDetails.flxDetail6.flxDetailValue6.lbl1.id,
                        "aria-checked": false
                    },
            }
        this.view.flxDetails.flxRecipientDetails.flxDetail6.flxDetailValue6.flxBtn2.accessibilityConfig = {
                        a11yARIA: {
                        "tabindex": 0,
                        "role": "radio",
                        "aria-labelledby": this.view.flxDetails.flxRecipientDetails.flxDetail6.flxDetailValue6.lbl2.id,
                        "aria-checked": false
                    },
            }
          this.view.flxDetails.flxRecipientDetails.flxDetail6.flxDetailValue6.lbl1.text ? kony.i18n.getLocalizedString("Kony.mb.userdetail.PhoneNumber") : optionValues[0];
          this.view.flxDetails.flxRecipientDetails.flxDetail6.flxDetailValue6.lbl2.text ? kony.i18n.getLocalizedString("i18n.ProfileManagement.EmailId") : optionValues[1];
          if(textInputRequired){
            if(this.beneficiaryData["selectedRadioTextInputValue"]){
              this.p2pRadioValues();
            }
            this.view.flxDetails.flxRecipientDetails.flxDetail6.flxDetailValue6.flxBtn1.onClick = this.p2pRadioSelection.bind(scope,this.view.flxDetails.flxRecipientDetails.flxDetail6.flxDetailValue6.img1,optionValues[0],this.view.flxDetails.flxRecipientDetails.flxDetail6.flxDetailValue6.lbl1,this.view.flxDetails.flxRecipientDetails.flxDetail6.flxDetailValue6.flxBtn1);
            this.view.flxDetails.flxRecipientDetails.flxDetail6.flxDetailValue6.flxBtn2.onClick = this.p2pRadioSelection.bind(scope,this.view.flxDetails.flxRecipientDetails.flxDetail6.flxDetailValue6.img2,optionValues[1],this.view.flxDetails.flxRecipientDetails.flxDetail6.flxDetailValue6.lbl2,this.view.flxDetails.flxRecipientDetails.flxDetail6.flxDetailValue6.flxBtn2);
          }
        }
        else
          this.view.flxDetails.flxRecipientDetails.flxDetail6.setVisibility(false);
      }
      catch(err){
        var errObj = {
          "errorInfo" : "Error in p2pContactInforRadio method of the component.",
          "error": err
        };
        scope.onError(errObj);	
      }
    },

    /**
  * populateLabelsBasedOnContracts
  *
  * populates label text in add beneficiary view.
  */
    populateLabelsBasedOnContracts: function() {
      var self = this;
      try{
        var headerText=this.getParsedValue
        (this._section1Title,this.beneficiaryData["selectedBeneficiaryType"]);
        var headerVal=this.getParsedValue
        (headerText,kony.application.getCurrentBreakpoint());
        if(headerVal){
          this.view.lblHeader1.text=headerVal;
        }
        var lbl1Text=this.getParsedValue
        (this._textInput1Label,this.beneficiaryData["selectedBeneficiaryType"]);
        var lbl1TextValue=this.getParsedValue
        (lbl1Text,kony.application.getCurrentBreakpoint());
        if(lbl1TextValue){
          this.view.flxDetails.flxRecipientDetails.flxDetail1.flxDetail1KeyandInfo.lblDetailKey1.text=lbl1TextValue;
          this.view.flxDetails.flxRecipientDetails.flxDetail1.setVisibility(true);
        }
        else
          this.view.flxDetails.flxRecipientDetails.flxDetail1.setVisibility(false);

        var lbl2Text=this.getParsedValue
        (this._textInput2Label,this.beneficiaryData["selectedBeneficiaryType"]);
        var lbl2TextValue=this.getParsedValue
        (lbl2Text,kony.application.getCurrentBreakpoint());
        if(lbl2TextValue){
          this.view.flxDetails.flxRecipientDetails.flxDetail2.flxDetail2KeyandInfo.lblDetailKey2.text=lbl2TextValue;
          this.view.flxDetails.flxRecipientDetails.flxDetail2.setVisibility(true);
        }
        else
          this.view.flxDetails.flxRecipientDetails.flxDetail2.setVisibility(false);


        var lbl3Text=this.getParsedValue
        (this._textInput3Label,this.beneficiaryData["selectedBeneficiaryType"]);
        var lbl3TextValue=this.getParsedValue
        (lbl3Text,kony.application.getCurrentBreakpoint());
        if(lbl3TextValue){
          this.view.flxDetails.flxRecipientDetails.flxDetail3.flxDetail3KeyandInfo.lblDetailKey3.text=lbl3TextValue;
          this.view.flxDetails.flxRecipientDetails.flxDetail3.setVisibility(true);
        }
        else
          this.view.flxDetails.flxRecipientDetails.flxDetail3.setVisibility(false);

        var lbl4Text=this.getParsedValue
        (this._textInput4Label,this.beneficiaryData["selectedBeneficiaryType"]);
        var lbl4TextValue=this.getParsedValue
        (lbl4Text,kony.application.getCurrentBreakpoint());
        if(lbl4TextValue){
          this.view.flxDetails.flxRecipientDetails.flxDetail4.flxDetail4KeyandInfo.lblDetailKey4.text=lbl4TextValue;
          this.view.flxDetails.flxRecipientDetails.flxDetail4.setVisibility(true);
        }
        else
          this.view.flxDetails.flxRecipientDetails.flxDetail4.setVisibility(false);

        var lbl5Text=this.getParsedValue
        (this._textInput5Label,this.beneficiaryData["selectedBeneficiaryType"]);
        var lbl5TextValue=this.getParsedValue
        (lbl5Text,kony.application.getCurrentBreakpoint());
        if(lbl5TextValue || this.view.flxDetails.flxRecipientDetails.flxDetail5.flxDetail5KeyandInfo.lblDetailKey5.text){
          if(this.beneficiaryData["selectedBeneficiaryType"] === "Same Bank") {
            this.view.flxDetails.flxRecipientDetails.flxDetail5.setVisibility(false);
          }
          else if(this.beneficiaryData["selectedBeneficiaryType"] === "P2P" && this.beneficiaryData["selectedflowType"] === "ADD" && lbl5TextValue === "") {
            this.view.flxDetails.flxRecipientDetails.flxDetail5.setVisibility(false);
          }
          else {
            this.view.flxDetails.flxRecipientDetails.flxDetail5.flxDetail5KeyandInfo.lblDetailKey5.text=lbl5TextValue ? lbl5TextValue : this.view.flxDetails.flxRecipientDetails.flxDetail5.flxDetail5KeyandInfo.lblDetailKey5.text;
            this.view.flxDetails.flxRecipientDetails.flxDetail5.setVisibility(true);
          }
        }
        else
          this.view.flxDetails.flxRecipientDetails.flxDetail5.setVisibility(false);
      }
      catch(err){
        var errObj = {
          "errorInfo" : "Error in populateLabelsBasedOnContracts method of the component.",
          "error": err
        };
        self.onError(errObj);	
      }
    },

    /**
  * p2pRadioValues
  *
  * populates radio button values for p2p beneficiary type in add view.
  */
    p2pRadioValues: function() {
      var self = this;
      try{
        if(this.beneficiaryData["selectedRadioBackendValue"]){
          for(var key in this.radioMappings){
            if(this.radioMappings[key]===this.beneficiaryData["selectedRadioBackendValue"])
              this.beneficiaryData["selectedradioButtonValue"]=key;
          }

        }
        if(this.beneficiaryData["selectedradioButtonValue"] === kony.i18n.getLocalizedString("i18n.payments.P2pPhoneNumber")) {
          this.view.flxDetails.flxRecipientDetails.flxDetail6.flxDetailValue6.img1.src = "radiobtn_active.png";
          this.view.flxDetails.flxRecipientDetails.flxDetail6.flxDetailValue6.img2.src = "radio_btn_inactive.png";
        }
        else if(this.beneficiaryData["selectedradioButtonValue"] === kony.i18n.getLocalizedString("i18n.payments.eMail")) {
          this.view.flxDetails.flxRecipientDetails.flxDetail6.flxDetailValue6.img2.src = "radiobtn_active.png";
          this.view.flxDetails.flxRecipientDetails.flxDetail6.flxDetailValue6.img1.src = "radio_btn_inactive.png";
        }
        var radioLabelConfig=this.getParsedValue
        (this._radioInputTextLabel,this.beneficiaryData["selectedBeneficiaryType"]);
        var text=radioLabelConfig[this.beneficiaryData["selectedradioButtonValue"]];
        this.beneficiaryData["selectedRadioBackendValue"]=
          this.radioMappings[this.beneficiaryData["selectedradioButtonValue"]];
        var lbl5TextValue=this.getParsedValue
        (text,kony.application.getCurrentBreakpoint());
        
        var tbx5PlaceHolder=this.getParsedValue
        (this._radioInputTextValue,this.beneficiaryData["selectedBeneficiaryType"]);
        var tbx5PlaceHolderValue=this.getParsedValue
        (tbx5PlaceHolder.placeHolder[this.beneficiaryData["selectedradioButtonValue"]],kony.application.getCurrentBreakpoint());
        var tbx5InputMode = this.getParsedValue
        (tbx5PlaceHolder.inputMode[this.beneficiaryData["selectedradioButtonValue"]]);
        if(tbx5InputMode === "NUMERIC") {
          this.view.flxDetails.flxRecipientDetails.flxDetail5.lblDetailValue5.textInputMode = 
            constants.TEXTBOX_INPUT_MODE_NUMERIC;
        }
        else {
          this.view.flxDetails.flxRecipientDetails.flxDetail5.lblDetailValue5.textInputMode = 
            constants.TEXTBOX_INPUT_MODE_ANY;
        }
        if(tbx5PlaceHolder.infoIconText) {
          this.view.flxDetails.flxRecipientDetails.flxDetail5.flxDetail5KeyandInfo.imgInfo5.isVisible = true;
          var infoIconHeader = this.getParsedValue(tbx5PlaceHolder.infoIconText.header,kony.application.getCurrentBreakpoint());
          var infoIconText = this.getParsedValue(tbx5PlaceHolder.infoIconText.text,kony.application.getCurrentBreakpoint());
          this.view.lblInfoHeader5.text = infoIconHeader;
          this.view.lblInfoText5.text = infoIconText;
        }
        else {
          this.view.flxDetails.flxRecipientDetails.flxDetail5.flxDetail5KeyandInfo.imgInfo5.isVisible = false;
        }
        var tbx5ToolTip = this.getParsedValue(tbx5PlaceHolder.tooltip[this.beneficiaryData["selectedradioButtonValue"]]);
        this.view.flxDetails.flxRecipientDetails.flxDetail5.lblDetailValue5.toolTip =
          tbx5ToolTip ? tbx5ToolTip : "";
        this.view.flxDetails.flxRecipientDetails.flxDetail5.lblDetailValue5.placeholder =
          tbx5PlaceHolderValue?tbx5PlaceHolderValue:"";
        
        if(lbl5TextValue){
          this.view.flxDetails.flxRecipientDetails.flxDetail5.flxDetail5KeyandInfo.lblDetailKey5.text=lbl5TextValue;
          this.view.flxDetails.flxRecipientDetails.flxDetail5.lblDetailValue5.text= 
            this.beneficiaryData["selectedRadioTextInputValue"]?this.beneficiaryData["selectedRadioTextInputValue"]:"";  
          this.view.flxDetails.flxRecipientDetails.flxDetail5.setVisibility(true);
        }
        this.view.forceLayout();
      }
      catch(err){
        var errObj = {
          "errorInfo" : "Error in p2pRadioValues method of the component.",
          "error": err
        };
        self.onError(errObj);	
      }
    },

    /**
  * p2pRadioSelection
  *
  * responsible for changing textbox related to email/phoneNumber when the radio button is selected on add benficiary screen.
  */
    p2pRadioSelection: function(Button, Key, ariaText, accessibleBtn) {
      var self = this;
      try{
        var specialCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\";
        var numbersSet = "0123456789";
        var alphabetsSet = "abcdefghijklmnopqrstuvwxyz";
        var radioLabelConfig=this.getParsedValue
        (this._radioInputTextLabel,this.beneficiaryData["selectedBeneficiaryType"]);
        this.view.flxDetails.flxRecipientDetails.flxDetail6.flxDetailValue6.img1.src = "radio_btn_inactive.png";
        this.view.flxDetails.flxRecipientDetails.flxDetail6.flxDetailValue6.img2.src = "radio_btn_inactive.png";
        this.view.flxDetails.flxRecipientDetails.flxDetail6.flxDetailValue6.flxBtn1.accessibilityConfig = {
                    a11yARIA: {
                    "tabindex": 0,
                    "role": "radio",
                    "aria-labelledby": this.view.flxDetails.flxRecipientDetails.flxDetail6.flxDetailValue6.lbl1.id,
                    "aria-checked": false
                },
        }
        this.view.flxDetails.flxRecipientDetails.flxDetail6.flxDetailValue6.flxBtn2.accessibilityConfig = {
                    a11yARIA: {
                    "tabindex": 0,
                    "role": "radio",
                    "aria-labelledby": this.view.flxDetails.flxRecipientDetails.flxDetail6.flxDetailValue6.lbl2.id,
                    "aria-checked": false
                },
        }            
        Button.src = "radiobtn_active.png";
        accessibleBtn.accessibilityConfig = {
                    a11yARIA: {
                        "tabindex": 0,
                        "role": "radio",
                        "aria-labelledby": ariaText.id,
                        "aria-checked": true
                    },
                }
        var selectedKeyValue = Key; 
        this.view.lblDetailValue5.text = "";
        this.minFillValidation("tbx5");    
        this.beneficiaryData["selectedRadioTextInputValue"] = "";
        this.beneficiaryData["selectedradioButtonValue"] = selectedKeyValue;
        this.beneficiaryData["selectedRadioBackendValue"] = this.radioMappings[selectedKeyValue];
        var lbl5TextValue = selectedKeyValue;
        if(lbl5TextValue){
          this.view.flxDetails.flxRecipientDetails.flxDetail5.flxDetail5KeyandInfo.lblDetailKey5.text= lbl5TextValue;
          this.view.flxDetails.flxRecipientDetails.flxDetail5.setVisibility(true);
          //this.view.flxDetails.flxRecipientDetails.flxDetail5.lblDetailValue5.setActive(true);
        }
        else
          this.view.flxDetails.flxRecipientDetails.flxDetail5.setVisibility(false);
        var tbx5PlaceHolder=this.getParsedValue
        (this._radioInputTextValue,this.beneficiaryData["selectedBeneficiaryType"]);
        var tbx5PlaceHolderValue=this.getParsedValue
        (tbx5PlaceHolder.placeHolder[selectedKeyValue],kony.application.getCurrentBreakpoint());
        var tbx5InputMode = this.getParsedValue
        (tbx5PlaceHolder.inputMode[selectedKeyValue]);
        if(tbx5InputMode === "NUMERIC") {
          this.view.flxDetails.flxRecipientDetails.flxDetail5.lblDetailValue5.restrictCharactersSet = specialCharactersSet + alphabetsSet + alphabetsSet.toUpperCase();
        }
        else {
          this.view.flxDetails.flxRecipientDetails.flxDetail5.lblDetailValue5.textInputMode = 
            constants.TEXTBOX_INPUT_MODE_ANY;
          this.view.flxDetails.flxRecipientDetails.flxDetail5.lblDetailValue5.restrictCharactersSet = "";
        }
        if(tbx5PlaceHolder.infoIconText) {
          this.view.flxDetails.flxRecipientDetails.flxDetail5.flxDetail5KeyandInfo.imgInfo5.isVisible = true;
          var infoIconHeader = this.getParsedValue(tbx5PlaceHolder.infoIconText.header,kony.application.getCurrentBreakpoint());
          var infoIconText = this.getParsedValue(tbx5PlaceHolder.infoIconText.text,kony.application.getCurrentBreakpoint());
          this.view.lblInfoHeader5.text = infoIconHeader;
          this.view.lblInfoText5.text = infoIconText;
        }
        else {
          this.view.flxDetails.flxRecipientDetails.flxDetail5.flxDetail5KeyandInfo.imgInfo5.isVisible = false;
        }
        var tbx5ToolTip = this.getParsedValue(tbx5PlaceHolder.tooltip[selectedKeyValue]);
        this.view.flxDetails.flxRecipientDetails.flxDetail5.lblDetailValue5.toolTip =
          tbx5ToolTip ? tbx5ToolTip : "";
        this.view.flxDetails.flxRecipientDetails.flxDetail5.lblDetailValue5.placeholder =
          tbx5PlaceHolderValue?tbx5PlaceHolderValue:"";
        if(tbx5PlaceHolder!=null && tbx5PlaceHolder.text!=null && tbx5PlaceHolder.text!=undefined){
          var inputMapper5=tbx5PlaceHolder.text.substring(5,tbx5PlaceHolder.text.length-1);
          this.textInputsMapping["tbx5"]=inputMapper5;
        }
        this.view.flxDetails.flxRecipientDetails.flxDetail5.lblDetailValue5.text =
          this.beneficiaryData["selectedRadioTextInputValue"]?this.beneficiaryData["this._selectedRadioTextInputValue"]:"";
        this.view.flxDetails.flxRecipientDetails.flxDetail5.lblDetailValue5.secureTextEntry =
          tbx5PlaceHolder && tbx5PlaceHolder.isMaskingEnabled?tbx5PlaceHolder.isMaskingEnabled:false;
      }
      catch(err){
        var errObj = {
          "errorInfo" : "Error in p2pRadioSelection method of the component.",
          "error": err
        };
        self.onError(errObj);	
      }
    },

    /**
   * storeAddTextBoxesPreviousSkinsState
   *
   * stores previous textbox skins
   */
    storeAddTextBoxesPreviousSkinsState :function() {
      if(this.addtbx1SkinState == ""){
        this.addtbx1SkinState = this.view.flxDetails.flxRecipientDetails.flxDetail1.lblDetailValue1.skin;
      }
      if(this.addtbx2SkinState == "" ){
        this.addtbx2SkinState =  this.view.flxDetails.flxRecipientDetails.flxDetail2.lblDetailValue2.skin;
      }
      if(this.addtbx3SkinState == "" ){
        this.addtbx3SkinState =  this.view.flxDetails.flxRecipientDetails.flxDetail3.lblDetailValue3.skin;
      }
      if(this.addtbx4SkinState == "" ){
        this.addtbx4SkinState =  this.view.flxDetails.flxRecipientDetails.flxDetail4.lblDetailValue4.skin;
      }
      if(this.addtbx5SkinState == "" ){
        this.addtbx5SkinState =  this.view.flxDetails.flxRecipientDetails.flxDetail5.lblDetailValue5.skin;
      }
    },

    /**
   * invokedvfFieldErrorParser
   *
   * displays field level error after validing against dvf
   */
    invokedvfFieldErrorParser : function(dvfError){
      var tbx1 = this.getParsedValue(this._textInput1Value,this.beneficiaryData["selectedBeneficiaryType"]);
      tbx1 = this.mapTextInputContractToDvfKey(tbx1); 
      var tbx2 = this.getParsedValue(this._textInput2Value,this.beneficiaryData["selectedBeneficiaryType"]);
      tbx2 = this.mapTextInputContractToDvfKey(tbx2);
      var tbx3 = this.getParsedValue(this._textInput3Value,this.beneficiaryData["selectedBeneficiaryType"]);
      tbx3 = this.mapTextInputContractToDvfKey(tbx3);
      var tbx4 = this.getParsedValue(this._textInput4Value,this.beneficiaryData["selectedBeneficiaryType"]);
      tbx4 = this.mapTextInputContractToDvfKey(tbx4);
      var tbx5 = this.getParsedValue(this._textInput5Value,this.beneficiaryData["selectedBeneficiaryType"]);
      tbx5 = this.mapTextInputContractToDvfKey(tbx5);
      var selectedKeyValue = ""; 
      var radioLabelConfig=this.getParsedValue
      (this._radioInputTextLabel,this.beneficiaryData["selectedBeneficiaryType"]);
      if(this.view.flxDetails.flxRecipientDetails.flxDetail6.flxDetailValue6.img1.src === "radiobtn_active.png") {
        selectedKeyValue=this.view.flxDetails.flxRecipientDetails.flxDetail6.flxDetailValue6.lbl1.text;
      }
      else if(this.view.flxDetails.flxRecipientDetails.flxDetail6.flxDetailValue6.img2.src === "radiobtn_active.png") {
        selectedKeyValue=this.view.flxDetails.flxRecipientDetails.flxDetail6.flxDetailValue6.lbl2.text;
      }
      if(selectedKeyValue){
        var text=radioLabelConfig[selectedKeyValue];
        var tbxp2pRadioSelection=this.getParsedValue
        (text,kony.application.getCurrentBreakpoint());
        tbxp2pRadioSelection = tbxp2pRadioSelection.replace(":","").trim();
      } 

      for(var iterator in dvfError){
        if(tbx1 == iterator){
          this.view.flxDetails.flxRecipientDetails.flxDetail1.lblDetailValue1.skin = this.breakPointParser
          (this._sknAddTextBoxError, kony.application.getCurrentBreakpoint());
        }
        if(tbx2 == iterator){
          this.view.flxDetails.flxRecipientDetails.flxDetail2.lblDetailValue2.skin = this.breakPointParser
          (this._sknAddTextBoxError, kony.application.getCurrentBreakpoint());
        }
        if(tbx3 == iterator){
          this.view.flxDetails.flxRecipientDetails.flxDetail3.lblDetailValue3.skin = this.breakPointParser
          (this._sknAddTextBoxError, kony.application.getCurrentBreakpoint());
        }
        if(tbx4 == iterator){
          this.view.flxDetails.flxRecipientDetails.flxDetail4.lblDetailValue4.skin = this.breakPointParser
          (this._sknAddTextBoxError, kony.application.getCurrentBreakpoint());
        }
        if(tbx5 == iterator){
          this.view.flxDetails.flxRecipientDetails.flxDetail5.lblDetailValue5.skin = this.breakPointParser
          (this._sknAddTextBoxError, kony.application.getCurrentBreakpoint());
        }
        if(tbxp2pRadioSelection == iterator){
          this.view.flxDetails.flxRecipientDetails.flxDetail5.lblDetailValue5.skin = this.breakPointParser
          (this._sknAddTextBoxError, kony.application.getCurrentBreakpoint());
        }
      }
    },
    ackButtonsAction : function(context,property) {
      if (property !== null && property !== undefined) {
        var propertyJSON = JSON.parse(property);
        var parsedValue = propertyJSON;                              
        if ((typeof(parsedValue) !== "string" && Object.keys(parsedValue)[1].indexOf("$.FLOWTYPES") > -1) || (typeof(parsedValue) === "string" && parsedValue.indexOf("$.FLOWTYPES") > -1)) {
          parsedValue = this.getParsedValue(parsedValue, this.beneficiaryData["selectedflowType"]);
          if (typeof(parsedValue !== "string")) {
            parsedValue = parsedValue.hasOwnProperty("action") ? parsedValue["action"] : parsedValue;
          }
        }
        var actionJSON = parsedValue;
        var level = actionJSON.level;
        var method = actionJSON.method;
        this.invokeInstaceAction(level, method, context);
      }
    },
    ackButtonsHandler : function(property){ 
              if (property !== null && property !== undefined) {
            var propertyJSON = JSON.parse(property);
            var parsedValue = propertyJSON;            
            if ((typeof(parsedValue) !== "string" && Object.keys(parsedValue)[1].indexOf("$.FLOWTYPES") > -1) || (typeof(parsedValue) === "string" && parsedValue.indexOf("$.FLOWTYPES") > -1)) {
                parsedValue = this.getParsedValue(parsedValue, this.beneficiaryData["selectedflowType"]);                             
            }
           }
           return parsedValue;
        },

    /**
  * mapTextInputContractToDvfKey
  *
  * retrieves the value required from textbox contracts to compare with dvf response error
  */
    mapTextInputContractToDvfKey: function(tbxJson) {
      var textJson  = tbxJson;
      var encodedText = textJson.text;
      if(encodedText !== null && encodedText !== undefined && encodedText !==""){
        requiredText = encodedText.split('{$.c.')[1];
        requiredText = requiredText.split('}')[0];  
        return requiredText;
      }
    },
    /**
  * populateTextInputsBasedOnContracts
  *
  * populates textboxes in add beneficiary view.
  */
    populateTextInputsBasedOnContracts: function() {
      var self = this;
      try{
        var tbx1PlaceHolder=this.getParsedValue
        (this._textInput1Value,this.beneficiaryData["selectedBeneficiaryType"]);
        var tbx1PlaceHolderValue=this.getParsedValue
        (tbx1PlaceHolder.placeHolder,kony.application.getCurrentBreakpoint());
        this.view.flxDetails.flxRecipientDetails.flxDetail1.lblDetailValue1.placeholder =
          tbx1PlaceHolderValue?tbx1PlaceHolderValue:"";
        if(tbx1PlaceHolder!=null && tbx1PlaceHolder.text!=null && tbx1PlaceHolder.text!=undefined){
          var inputMapper1=tbx1PlaceHolder.text.substring(5,tbx1PlaceHolder.text.length-1);
          this.textInputsMapping["tbx1"]=inputMapper1;
          if(tbx1PlaceHolder.inputMode) {
            if(tbx1PlaceHolder.inputMode === "NUMERIC") {
              this.view.flxDetails.flxRecipientDetails.flxDetail1.lblDetailValue1.restrictCharactersSet
                ="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_-\\?/+={[]}:;,.<>'`|\"";
            }       
            else {
              this.view.flxDetails.flxRecipientDetails.flxDetail1.lblDetailValue1.restrictCharactersSet
                = "";           
            }
          }
          if(tbx1PlaceHolder.infoIconText) {
            this.view.flxDetails.flxRecipientDetails.flxDetail1.flxDetail1KeyandInfo.imgInfo1.isVisible = true;
            var infoIconHeader = this.getParsedValue
            (tbx1PlaceHolder.infoIconText.header,kony.application.getCurrentBreakpoint());
            var infoIconText = this.getParsedValue
            (tbx1PlaceHolder.infoIconText.text,kony.application.getCurrentBreakpoint());
            this.view.lblInfoHeader1.text = infoIconHeader;
            this.view.lblInfoText1.text = infoIconText;
          }
          else {
            this.view.flxDetails.flxRecipientDetails.flxDetail1.flxDetail1KeyandInfo.imgInfo1.isVisible = false;
          }
          if(tbx1PlaceHolder.tooltip) {
            this.view.flxDetails.flxRecipientDetails.flxDetail1.lblDetailValue1.toolTip = this.parserUtilsManager.getDecoratorText(tbx1PlaceHolder.tooltip);
          }
        }	 
        if(!this.view.flxDetails.flxRecipientDetails.flxDetail1.lblDetailValue1.text) {
          this.view.flxDetails.flxRecipientDetails.flxDetail1.lblDetailValue1.text =
           this.getParsedValue(tbx1PlaceHolder.text)?this.getParsedValue(tbx1PlaceHolder.text):"";
          this.updateContext("tbx1", this.view.lblDetailValue1.text);
        }
        this.view.flxDetails.flxRecipientDetails.flxDetail1.lblDetailValue1.secureTextEntry =
          tbx1PlaceHolder.isMaskingEnabled?tbx1PlaceHolder.isMaskingEnabled:false;
        var tbx2PlaceHolder=this.getParsedValue
        (this._textInput2Value,this.beneficiaryData["selectedBeneficiaryType"]);
        var tbx2PlaceHolderValue=this.getParsedValue
        (tbx2PlaceHolder.placeHolder,kony.application.getCurrentBreakpoint());
        this.view.flxDetails.flxRecipientDetails.flxDetail2.lblDetailValue2.placeholder
          = tbx2PlaceHolderValue?tbx2PlaceHolderValue:"";
        if(tbx2PlaceHolder!=null && tbx2PlaceHolder.text!=null && tbx2PlaceHolder.text!=undefined){
          var inputMapper2=tbx2PlaceHolder.text.substring(5,tbx2PlaceHolder.text.length-1);
          this.textInputsMapping["tbx2"]=inputMapper2;
          if(tbx2PlaceHolder.inputMode) {
            if(tbx2PlaceHolder.inputMode === "NUMERIC") {
              this.view.flxDetails.flxRecipientDetails.flxDetail2.lblDetailValue2.restrictCharactersSet
                ="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_+={[]}";
            }
            else {
              this.view.flxDetails.flxRecipientDetails.flxDetail2.lblDetailValue2.restrictCharactersSet
                = "";
            }
          }
          if(tbx2PlaceHolder.infoIconText) {
            this.view.flxDetails.flxRecipientDetails.flxDetail2.flxDetail2KeyandInfo.imgInfo2.isVisible = true;
            var infoIconHeader = this.getParsedValue
            (tbx2PlaceHolder.infoIconText.header,kony.application.getCurrentBreakpoint());
            var infoIconText = this.getParsedValue
            (tbx2PlaceHolder.infoIconText.text,kony.application.getCurrentBreakpoint());
            this.view.lblInfoHeader2.text = infoIconHeader;
            this.view.lblInfoText2.text = infoIconText;
          }
          else {
            this.view.flxDetails.flxRecipientDetails.flxDetail2.flxDetail2KeyandInfo.imgInfo2.isVisible = false;
          }
          if(tbx2PlaceHolder.tooltip) {
            this.view.flxDetails.flxRecipientDetails.flxDetail2.lblDetailValue2.toolTip = this.parserUtilsManager.getDecoratorText(tbx2PlaceHolder.tooltip);
          }
        }	  
        if(!this.view.flxDetails.flxRecipientDetails.flxDetail2.lblDetailValue2.text) {
          this.view.flxDetails.flxRecipientDetails.flxDetail2.lblDetailValue2.text =
            this.getParsedValue(tbx2PlaceHolder.text)?this.getParsedValue(tbx2PlaceHolder.text):"";	 
          this.updateContext("tbx2", this.view.lblDetailValue2.text);
        }
        this.view.flxDetails.flxRecipientDetails.flxDetail2.lblDetailValue2.secureTextEntry =
          tbx2PlaceHolder.isMaskingEnabled?tbx2PlaceHolder.isMaskingEnabled:false;
        var tbx3PlaceHolder=this.getParsedValue
        (this._textInput3Value,this.beneficiaryData["selectedBeneficiaryType"]);
        var tbx3PlaceHolderValue=this.getParsedValue
        (tbx3PlaceHolder.placeHolder,kony.application.getCurrentBreakpoint());
        this.view.flxDetails.flxRecipientDetails.flxDetail3.lblDetailValue3.placeholder = 
          tbx3PlaceHolderValue?tbx3PlaceHolderValue:"";
        if(tbx3PlaceHolder!=null && tbx3PlaceHolder.text!=null && tbx3PlaceHolder.text!=undefined){
          var inputMapper3=tbx3PlaceHolder.text.substring(5,tbx3PlaceHolder.text.length-1);
          this.textInputsMapping["tbx3"]=inputMapper3;
          if(tbx3PlaceHolder.inputMode) {
            if(tbx3PlaceHolder.inputMode === "NUMERIC") {
              this.view.flxDetails.flxRecipientDetails.flxDetail3.lblDetailValue3.restrictCharactersSet =
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_+={[]}";
            }
            else {
              this.view.flxDetails.flxRecipientDetails.flxDetail3.lblDetailValue3.restrictCharactersSet
                = "";
            }
          }
          if(tbx3PlaceHolder.infoIconText) {
            this.view.flxDetails.flxRecipientDetails.flxDetail3.flxDetail3KeyandInfo.imgInfo3.isVisible = true;
            var infoIconHeader = this.getParsedValue
            (tbx3PlaceHolder.infoIconText.header,kony.application.getCurrentBreakpoint());
            var infoIconText = this.getParsedValue
            (tbx3PlaceHolder.infoIconText.text,kony.application.getCurrentBreakpoint());
            this.view.lblInfoHeader3.text = infoIconHeader;
            this.view.lblInfoText3.text = infoIconText;
          }
          else {
            this.view.flxDetails.flxRecipientDetails.flxDetail3.flxDetail3KeyandInfo.imgInfo3.isVisible = false;
          }
          if(tbx3PlaceHolder.tooltip) {
            this.view.flxDetails.flxRecipientDetails.flxDetail3.lblDetailValue3.toolTip = this.parserUtilsManager.getDecoratorText(tbx3PlaceHolder.tooltip);
          }
        }
        if(!this.view.flxDetails.flxRecipientDetails.flxDetail3.lblDetailValue3.text) {
          this.view.flxDetails.flxRecipientDetails.flxDetail3.lblDetailValue3.text =
            this.getParsedValue(tbx3PlaceHolder.text)?this.getParsedValue(tbx3PlaceHolder.text):"";	  
            this.updateContext("tbx3", this.view.lblDetailValue3.text);
        }
        this.view.flxDetails.flxRecipientDetails.flxDetail3.lblDetailValue3.secureTextEntry =
          tbx3PlaceHolder.isMaskingEnabled?tbx3PlaceHolder.isMaskingEnabled:false;
        var tbx4PlaceHolder=this.getParsedValue
        (this._textInput4Value,this.beneficiaryData["selectedBeneficiaryType"]);
        var tbx4PlaceHolderValue=this.getParsedValue
        (tbx4PlaceHolder.placeHolder,kony.application.getCurrentBreakpoint());
        this.view.flxDetails.flxRecipientDetails.flxDetail4.lblDetailValue4.placeholder
          = tbx4PlaceHolderValue?tbx4PlaceHolderValue:"";
        if(tbx4PlaceHolder!=null && tbx4PlaceHolder.text!=null && tbx4PlaceHolder.text!=undefined){
          var inputMapper4=tbx4PlaceHolder.text.substring(5,tbx4PlaceHolder.text.length-1);
          this.textInputsMapping["tbx4"]=inputMapper4;
          if(tbx4PlaceHolder.inputMode) {
            if(tbx4PlaceHolder.inputMode === "NUMERIC") {
              this.view.flxDetails.flxRecipientDetails.flxDetail4.lblDetailValue4.restrictCharactersSet 
                = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_+={[]}";
            }
            else {
              this.view.flxDetails.flxRecipientDetails.flxDetail4.lblDetailValue4.restrictCharactersSet
                = "";
            }
          }
          if(tbx4PlaceHolder.infoIconText) {
            this.view.flxDetails.flxRecipientDetails.flxDetail4.flxDetail4KeyandInfo.imgInfo4.isVisible = true;
            var infoIconHeader = this.getParsedValue
            (tbx4PlaceHolder.infoIconText.header,kony.application.getCurrentBreakpoint());
            var infoIconText = this.getParsedValue
            (tbx4PlaceHolder.infoIconText.text,kony.application.getCurrentBreakpoint());
            this.view.lblInfoHeader4.text = infoIconHeader;
            this.view.lblInfoText4.text = infoIconText;
          }
          else {
            this.view.flxDetails.flxRecipientDetails.flxDetail4.flxDetail4KeyandInfo.imgInfo4.isVisible = false;
          }
          if(tbx4PlaceHolder.tooltip) {
            this.view.flxDetails.flxRecipientDetails.flxDetail4.lblDetailValue4.toolTip = this.parserUtilsManager.getDecoratorText(tbx4PlaceHolder.tooltip);
          }
        }	
        if(!this.view.flxDetails.flxRecipientDetails.flxDetail4.lblDetailValue4.text) {
          this.view.flxDetails.flxRecipientDetails.flxDetail4.lblDetailValue4.text = 
            this.getParsedValue(tbx4PlaceHolder.text)?this.getParsedValue(tbx4PlaceHolder.text):"";	  
          this.updateContext("tbx4", this.view.lblDetailValue4.text);
          if(this.view.lblDetailValue4.placeholder === 'Default: Beneficiary Name')
             this.view.lblDetailValue4.placeholder = 'Enter account nickname (optional)';
        }
        this.view.flxDetails.flxRecipientDetails.flxDetail4.lblDetailValue4.secureTextEntry = 
          tbx4PlaceHolder.isMaskingEnabled?tbx4PlaceHolder.isMaskingEnabled:false;
        var tbx5PlaceHolder=this.getParsedValue
        (this._textInput5Value,this.beneficiaryData["selectedBeneficiaryType"]);
        var tbx5PlaceHolderValue=this.getParsedValue
        (tbx5PlaceHolder.placeHolder,kony.application.getCurrentBreakpoint());
        this.view.flxDetails.flxRecipientDetails.flxDetail5.lblDetailValue5.placeholder
          = tbx5PlaceHolderValue?tbx5PlaceHolderValue:"";
        if(tbx5PlaceHolder!=null && tbx5PlaceHolder.text!=null && tbx5PlaceHolder.text!=undefined){
          var inputMapper5=tbx5PlaceHolder.text.substring(5,tbx5PlaceHolder.text.length-1);
          this.textInputsMapping["tbx5"]=inputMapper5;
          if(tbx5PlaceHolder.inputMode) {
            if(tbx5PlaceHolder.inputMode === "NUMERIC") {
              this.view.flxDetails.flxRecipientDetails.flxDetail5.lblDetailValue5.restrictCharactersSet
                ="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_+={[]}";
            }
            else {
              this.view.flxDetails.flxRecipientDetails.flxDetail5.lblDetailValue5.restrictCharactersSet
                = "";
            }
          }
          if(tbx5PlaceHolder.infoIconText) {
            this.view.flxDetails.flxRecipientDetails.flxDetail5.flxDetail5KeyandInfo.imgInfo5.isVisible = true;
            var infoIconHeader = this.getParsedValue
            (tbx5PlaceHolder.infoIconText.header,kony.application.getCurrentBreakpoint());
            var infoIconText = this.getParsedValue
            (tbx5PlaceHolder.infoIconText.text,kony.application.getCurrentBreakpoint());
            this.view.lblInfoHeader5.text = infoIconHeader;
            this.view.lblInfoText5.text = infoIconText;
          }
          else {
            this.view.flxDetails.flxRecipientDetails.flxDetail5.flxDetail5KeyandInfo.imgInfo5.isVisible = false;
          }
          if(tbx5PlaceHolder.tooltip) {
            this.view.flxDetails.flxRecipientDetails.flxDetail5.lblDetailValue5.toolTip = this.parserUtilsManager.getDecoratorText(tbx5PlaceHolder.tooltip);
          }
        }	  
        if(!this.view.flxDetails.flxRecipientDetails.flxDetail5.lblDetailValue5.text) {
          this.view.flxDetails.flxRecipientDetails.flxDetail5.lblDetailValue5.text =
            this.getParsedValue(tbx5PlaceHolder.text)?this.getParsedValue(tbx5PlaceHolder.text):"";	  
            this.updateContext("tbx5", this.view.lblDetailValue5.text);
            if(this.view.lblDetailValue5.placeholder === 'Default: Beneficiary Name')
             this.view.lblDetailValue5.placeholder = 'Enter account nickname (optional)';
        }
        this.view.flxDetails.flxRecipientDetails.flxDetail5.lblDetailValue5.secureTextEntry = 
          tbx5PlaceHolder && tbx5PlaceHolder.isMaskingEnabled?tbx5PlaceHolder.isMaskingEnabled:false;  
      }
      catch(err){
        var errObj = {
          "errorInfo" : "Error in populateTextInputsBasedOnContracts method of the component.",
          "error": err
        };
        self.onError(errObj);	
      }
    },


    /**
  * enableOrDisableTextInputsBasedOnContracts
  *
  * enables/disables textboxes in add beneficiary view.
  */
    enableOrDisableTextInputsBasedOnContracts: function() {
      var self = this;
      try{
        var tbx1Enabled=this.getParsedValue
        (this._textInput1Enabled,this.beneficiaryData["selectedBeneficiaryType"]);
        var tbx1EnabledValue=this.getParsedValue
        (tbx1Enabled,this.beneficiaryData["selectedflowType"]);
        this.view.flxDetails.flxRecipientDetails.flxDetail1.lblDetailValue1.setEnabled
        (typeof(tbx1EnabledValue)==="boolean"?tbx1EnabledValue:true);
        var tbx2Enabled=this.getParsedValue
        (this._textInput2Enabled,this.beneficiaryData["selectedBeneficiaryType"]);
        var tbx2EnabledValue=this.getParsedValue
        (tbx2Enabled,this.beneficiaryData["selectedflowType"]);
        this.view.flxDetails.flxRecipientDetails.flxDetail2.lblDetailValue2.setEnabled
        (typeof(tbx2EnabledValue)==="boolean"?tbx2EnabledValue:true);
        var tbx3Enabled=this.getParsedValue
        (this._textInput3Enabled,this.beneficiaryData["selectedBeneficiaryType"]);
        var tbx3EnabledValue=this.getParsedValue
        (tbx3Enabled,this.beneficiaryData["selectedflowType"]);
        this.view.flxDetails.flxRecipientDetails.flxDetail3.lblDetailValue3.setEnabled
        (typeof(tbx3EnabledValue)==="boolean"?tbx3EnabledValue:true);
        var tbx4Enabled=this.getParsedValue
        (this._textInput4Enabled,this.beneficiaryData["selectedBeneficiaryType"]);
        var tbx4EnabledValue=this.getParsedValue
        (tbx4Enabled,this.beneficiaryData["selectedflowType"]);
        this.view.flxDetails.flxRecipientDetails.flxDetail4.lblDetailValue4.setEnabled
        (typeof(tbx4EnabledValue)==="boolean"?tbx4EnabledValue:true);
        var tbx5Enabled=this.getParsedValue(this._textInput5Enabled,this.beneficiaryData["selectedBeneficiaryType"]);
        var tbx5EnabledValue=this.getParsedValue(tbx5Enabled,this.beneficiaryData["selectedflowType"]);
        this.view.flxDetails.flxRecipientDetails.flxDetail5.lblDetailValue5.setEnabled
        (typeof(tbx5EnabledValue)==="boolean"?tbx5EnabledValue:true);
      }
      catch(err){
        var errObj = {
          "errorInfo" : "Error in enableOrDisableTextInputsBasedOnContracts method of the component.",
          "error": err
        };
        self.onError(errObj);	
      }
    },

    /**
  * getParsedValue
  *
  * parses the property and fetches the corresponding Value.
  */
    getParsedValue: function(property, selectedValue) {
      try{
        property=JSON.parse(property);
      }
      catch(e){
        property=property;
        kony.print(e);
      }
      if(typeof(property)==="string")
        return this.getProcessedText(property);
      else
        return this.parserUtilsManager.getComponentConfigParsedValue(property,selectedValue);
    },

    /**
     * @api : getProcessedText
     * helper method to invoke parser utility functions to get the parsed value.
     * @param : text{object} -value collected from exposed contract
     * @return : parsed value result
     */
    getProcessedText: function(text) {
      return this.parserUtilsManager.getParsedValue(text);
    },
    /**
     * @api : setContext
     * To collect the context object required for the component. 
     * @param : context{JSONobject} - account object 
     * @return : NA
     */
    setContext: function(context, scope) {
      this.context=context;
      if(this.context.hasOwnProperty('entitlement')){
       this.entitlementContext.features  = this.context.entitlement.features;
       this.entitlementContext.permissions = this.context.entitlement.permissions;
      }
      if(this.parentScope ==""){
      this.parentScope = scope;
      }
    }
  };
});