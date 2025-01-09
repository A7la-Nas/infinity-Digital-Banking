define(['./AddPayeeDAO','./ParserUtilsManager','./AddPayeeUtility','./EntitlementUtils','DataValidationFramework/DataValidationHandler','CommonUtilities'],function(AddPayeeDAO,ParserUtilsManager,AddPayeeUtility,EntitlementUtils,DataValidationHandler,CommonUtilities) {

  // To bind actions for the widgets only once throughout the component lifecycle.
  var firstTimeLoad = false;

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      //declaration for Payee Object Service in the group:Payee Management Service
      this._payeeObjectService="";

      //declaration for BillerSearch Object Service in the group:Biller Search Service
      this._billerSearchObjectService="";

      //declaration for Block Title in the group:General
      this._blockTitle="";

      //declaration for Masking Required in the group:Account Number
      this._masking="";

      //declaration for Title in the group:Add Payee Tab1
      this._tab1Title="";

      //declaration for Title in the group:Add Payee Tab2
      this._tab2Title="";

      //declaration for SectionTitle in the group:Payee Details - Edit NickName 
      this._editSectionTitle="";

      //declaration for Title in the group:Payee Add Category
      this._categoryTitle="";

      //declaration for SectionTitle in the group:Payee Details - Review
      this._reviewSectionTitle="";

      //declaration for Section1 Title in the group:Acknowledgement - Added Payee
      this._ackSection1Title="";

      //declaration for Block Title in the group:Edit Flow - Payee
      this._editblockTitle="";

      //declaration for Data Validation Config in the group:Data Validation Config
      this._dvfConfig="";

      //declaration for User Role Type in the group:Context
      this._userRoleType="";

      //declaration for Address Object Service in the group:Address Services ( State & Country Related Services)
      this._addressObjectService="";

      //declaration for Google auto fill enabled in the group:Google Place Autocomplete
      this._ADDRgoogleApiEnabled="";

      //declaration for AddLabel Skin in the group:Skins
      this._sknAddLabel="";

      //declaration for Payee Object in the group:Payee Management Service
      this._payeeObject="";

      //declaration for BillerSearch Object in the group:Biller Search Service
      this._billerSearchObject="";

      //declaration for Breakpoints in the group:General
      this._BREAKPTS="";

      //declaration for FlowTypes in the group:General
      this._FLOWTYPES="";

      //declaration for Account Number Format in the group:Account Number
      this._accountNumberFormat="";

      //declaration for Visibility in the group:Add Payee Tab1
      this._tab1Visibility="";

      //declaration for Visibility in the group:Add Payee Tab2
      this._tab2Visibility="";

      //declaration for Field1 Label in the group:Payee Details - Edit NickName 
      this._editField1Label="";

      //declaration for User Role Based Visibility in the group:Payee Add Category
      this._roleBasedVisibility="";

      //declaration for Field1 Label in the group:Payee Details - Review
      this._reviewField1Label="";

      //declaration for Acknowledgement Text in the group:Acknowledgement - Added Payee
      this._ackText="";

      //declaration for Section Title in the group:Edit Flow - Payee
      this._sectionTitle="";

      //declaration for Minimum Fill Mapping in the group:Data Validation Config
      this._minFillMapping="";

      //declaration for Payee Id in the group:Context
      this._payeeId="";

      //declaration for acknowledgement text in the edit flow in the group:acknowledgement - add payee
      this._editAckText = "";

      //declaration for Country Object in the group:Address Services ( State & Country Related Services)
      this._countryObject="";

      //declaration for Default Country in the group:Google Place Autocomplete
      this._ADDRdefaultCountry="";

      //declaration for AddTextBox EnabledSKin in the group:Skins
      this._sknAddTextBoxEnabled="";

      //declaration for AddTextBox PlaceHolderSkin in the group:Skins
      this._sknAddTextBoxPlaceHolder="";

      //declaration for AcknowledgementReferenceNumberLabel Skin in the group:Skins
      this._sknAcknowledgementReferenceNumberLabel="";

      //declaration for Payee Create Operation in the group:Payee Management Service
      this._payeeCREATEOperation="";

      //declaration for BillerSearch Operation in the group:Biller Search Service
      this._billerSearchOperation="";

      //declaration for Mask VizIcon in the group:Account Number
      this._maskeyeicon="";

      //declaration for Biller Label in the group:Add Payee Tab1
      this._Tab1Field1Label="";

      //declaration for Field1 Label in the group:Add Payee Tab2
      this._Tab2Field1Label="";

      //declaration for Field1 Value in the group:Payee Details - Edit NickName 
      this._editField1Value="";

      //declaration for Radio Icon1 in the group:Payee Add Category
      this._radioIcon1="";

      //declaration for Field1 Value in the group:Payee Details - Review
      this._reviewField1Value="";

      //declaration for Image in the group:Acknowledgement - Added Payee
      this._ackImage="";

      //declaration for Field1 Label in the group:Edit Flow - Payee
      this._editFlowField1Label="";

      //declaration for Payee NickName in the group:Context
      this._payeeNickName="";

      //declaration for selected flow type in the group:Context
      this._selectedflowType = "";

      //declaration for GetCountries Operation in the group:Address Services ( State & Country Related Services)
      this._getCountriesOperation="";

      //declaration for Number of chars to trigger auto fill api in the group:Google Place Autocomplete
      this._ADDRnumberOfCharsToTriggerAutoFill="";

      //declaration for AddTextBox FocusSkin in the group:Skins
      this._sknAddTextBoxFocus="";

      //declaration for AcknowledgementReferenceNumberValueSkin in the group:Skins
      this._sknAcknowledgementReferenceNumberValue="";

      //declaration for Payee Create Criteria in the group:Payee Management Service
      this._payeeCREATECriteria="";

      //declaration for Custom Create Criteria in the group:Payee Management Service
      this._customCREATECriteria="";

      //declaration for Custom Create Criteria in the group:Payee Management Service
      this._customCREATEOperation="";

      //declaration for Custom Create Criteria in the group:Payee Management Service
      this._customCREATEIdentifier="";

      //declaration for BillerSearch Criteria in the group:Biller Search Service
      this._billerSearchCriteria="";

      //declaration for Unmask VizIcon in the group:Account Number
      this._unmaskeyeicon="";

      //declaration for Biller Value in the group:Add Payee Tab1
      this._Tab1Field1Value="";

      //declaration for Field1 Value in the group:Add Payee Tab2
      this._Tab2Field1Value="";

      //declaration for Field2 Label in the group:Payee Details - Edit NickName 
      this._editField2Label="";

      //declaration for Radio Icon2 in the group:Payee Add Category
      this._radioIcon2="";

      //declaration for Field2 Label in the group:Payee Details - Review
      this._reviewField2Label="";

      //declaration for Reference Label in the group:Acknowledgement - Added Payee
      this._ackReferenceText="";

      //declaration for Field1 Value in the group:Edit Flow - Payee
      this._editFlowField1Value="";

      //declaration for AddressLine1 in the group:Context
      this._addressLine1="";

      //declaration for GetCountries Criteria in the group:Address Services ( State & Country Related Services)
      this._getCountriesCriteria="";

      //declaration for Display Long/Short Names-AutoFill in the group:Google Place Autocomplete
      this._ADDRdisplayAutoFillLongOrShortNames="";

      //declaration for AddTextBox HoverSkin in the group:Skins
      this._sknAddTextBoxHover="";

      //declaration for PrimaryButtonSkin in the group:Skins
      this._sknPrimaryButton="";

      //declaration for Payee Create Service Response Identifier in the group:Payee Management Service
      this._payeeCREATEIdentifier="";

      //declaration for BillerSearch Identifier in the group:Biller Search Service
      this._billerSearchIdentifier="";

      //declaration for AddressLine1 Label in the group:Add Payee Tab2
      this._Tab2AddressLine1="";

      //declaration for Field2 Value in the group:Payee Details - Edit NickName 
      this._editField2Value="";

      //declaration for Field2 Value with out address line 2in the group:Payee Details - Edit NickName 
      this._payeeDetailsField2Value="";

      //declaration for Radio Icon1 Criteria in the group:Payee Add Category
      this._radioIcon1Criteria="";

      //declaration for Field2 Value in the group:Payee Details - Review
      this._reviewField2Value="";

      //declaration for Field2 Value without address line2 in the group:Payee Details - Review
      this._reviewDetailsField2Value="";

      //declaration for Reference Value in the group:Acknowledgement - Added Payee
      this._ackReferenceValue="";

      //declaration for Field2 Label in the group:Edit Flow - Payee
      this._editFlowField2Label="";

      //declaration for AddressLine2 in the group:Context
      this._addressLine2="";

      //declaration for GetCountries Identifier in the group:Address Services ( State & Country Related Services)
      this._getCountriesIdentifier="";

      //declaration for Default State in the group:Google Place Autocomplete
      this._ADDRdefaultState="";

      //declaration for BlockTitle Skin in the group:Skins
      this._sknBlockTitle="";

      //declaration for PrimaryButtonDisabledSkin in the group:Skins
      this._sknPrimaryButtonDisabled="";

      //declaration for Biller Search Context Mapping in the group:Add Payee Tab1
      this._searchResultIntoContext="";

      //declaration for Field2 Label in the group:Add Payee Tab1
      this._Tab1Field2Label="";

      //declaration for Payee Edit Operation in the group:Payee Management Service
      this._payeeEDITOperation="";

      //declaration for AddressLine1 Value in the group:Add Payee Tab2
      this._Tab2AddressLine1Value="";

      //declaration for Field3 Label in the group:Payee Details - Edit NickName 
      this._editField3Label="";

      //declaration for Radio Icon2 Criteria in the group:Payee Add Category
      this._radioIcon2Criteria="";

      //declaration for Field3 Label in the group:Payee Details - Review
      this._reviewField3Label="";

      //declaration for Section2Title in the group:Acknowledgement - Added Payee
      this._ackSection2Title="";

      //declaration for Field2 Value in the group:Edit Flow - Payee
      this._editFlowField2Value="";

      //declaration for State in the group:Context
      this._state="";

      //declaration for States Object in the group:Address Services ( State & Country Related Services)
      this._statesObject="";

      //declaration for SectionHeader Skin in the group:Skins
      this._sknSectionHeader="";

      //declaration for PrimaryButtonFocusSkin in the group:Skins
      this._sknPrimaryButtonFocus="";

      //declaration for Field2 Value in the group:Add Payee Tab1
      this._Tab1Field2Value="";

      //declaration for Payee Edit Criteria in the group:Payee Management Service
      this._payeeEDITCriteria="";

      //declaration for AddressLine2 Label in the group:Add Payee Tab2
      this._Tab2AddressLine2="";

      //declaration for Field3 Value in the group:Payee Details - Edit NickName 
      this._editField3Value="";

      //declaration for Radio Value1 in the group:Payee Add Category
      this._categoryLabel1="";

      //declaration for Field3 Value in the group:Payee Details - Review
      this._reviewField3Value="";

      //declaration for Field1 Label in the group:Acknowledgement - Added Payee
      this._ackField1Label="";

      //declaration for AddressLine1 Label in the group:Edit Flow - Payee
      this._editFlowAddress1Label="";

      //declaration for ZipCode in the group:Context
      this._zipCode="";

      //declaration for GetStates Operation in the group:Address Services ( State & Country Related Services)
      this._getStatesOperation="";

      //declaration for ReviewLabel Skin in the group:Skins
      this._sknReviewLabel="";

      //declaration for PrimaryButtonHoverSkin in the group:Skins
      this._sknPrimaryButtonHover="";

      //declaration for Field3 Label in the group:Add Payee Tab1
      this._Tab1Field3Label="";

      //declaration for Payee Edit Service Response Identifier in the group:Payee Management Service
      this._payeeEDITIdentifier="";

      //declaration for AddressLine2 Value in the group:Add Payee Tab2
      this._Tab2AddressLine2Value="";

      //declaration for Field4 Label in the group:Payee Details - Edit NickName 
      this._editField4Label="";

      //declaration for Radio Value2 in the group:Payee Add Category
      this._categoryLabel2="";

      //declaration for Field4 Label in the group:Payee Details - Review
      this._reviewField4Label="";

      //declaration for Field1 Value in the group:Acknowledgement - Added Payee
      this._ackField1Value="";

      //declaration for AddressLine1 Value in the group:Edit Flow - Payee
      this._editFlowAddress1Value="";

      //declaration for CityName in the group:Context
      this._cityName="";

      //declaration for GetStates Criteria in the group:Address Services ( State & Country Related Services)
      this._getStatesCriteria="";

      //declaration for ReviewValue Skin in the group:Skins
      this._sknReviewValue="";

      //declaration for SecondaryButtonSkin in the group:Skins
      this._sknSecondaryButton="";

      //declaration for Field3 Value in the group:Add Payee Tab1
      this._Tab1Field3Value="";

      //declaration for Country Label in the group:Add Payee Tab2
      this._Tab2CountryLabel="";

      //declaration for Field4 Value in the group:Payee Details - Edit NickName 
      this._editField4Value="";

      //declaration for Button1 in the group:Payee Add Category
      this._categoryButton1="";

      //declaration for Field4 Value in the group:Payee Details - Review
      this._reviewField4Value="";

      //declaration for Field2 Label in the group:Acknowledgement - Added Payee
      this._ackField2Label="";

      //declaration for AddressLine2 Label in the group:Edit Flow - Payee
      this._editFlowAddress2Label="";

      //declaration for GetStates Identifier in the group:Address Services ( State & Country Related Services)
      this._getStatesIdentifier="";

      //declaration for AcknowledgementSuccess Skin in the group:Skins
      this._sknAcknowledgementSuccess="";

      //declaration for SecondaryButtonHoverSkin in the group:Skins
      this._sknSecondaryButtonHover="";

      //declaration for Field4 Label in the group:Add Payee Tab1
      this._Tab1Field4Label="";

      //declaration for Field6 Label in the group:Add Payee Tab1
      this._Tab1Field6Label="";

      //declaration for Field7 Label in the group:Add Payee Tab1
      this._Tab1Field7Label="";

      //declaration for Country Value in the group:Add Payee Tab2
      this._Tab2CountryValue="";

      //declaration for Field5 Label in the group:Payee Details - Edit NickName 
      this._editField5Label="";

      //declaration for Button2 in the group:Payee Add Category
      this._categoryButton2="";

      //declaration for Field5 Label in the group:Payee Details - Review
      this._reviewField5Label="";

      //declaration for Field2 Value in the group:Acknowledgement - Added Payee
      this._ackField2Value="";

      //declaration for Field2 Value with out address line2 in the group:Acknowledgement - Added Payee
      this._ackDetailsField2Value="";

      //declaration for AddressLine2 Value in the group:Edit Flow - Payee
      this._editFlowAddress2Value="";

      //declaration for SecondaryButtonFocusSkin in the group:Skins
      this._sknSecondaryButtonFocus="";

      //declaration for Field4 Value in the group:Add Payee Tab1
      this._Tab1Field4Value="";

      //declaration for Field6 Value in the group:Add Payee Tab1
      this._Tab1Field6Value="";

      //declaration for Field7 Value in the group:Add Payee Tab1
      this._Tab1Field7Value="";

      //declaration for State Label in the group:Add Payee Tab2
      this._Tab2StateLabel="";

      //declaration for Field5 Value in the group:Payee Details - Edit NickName 
      this._editField5Value="";

      //declaration for Button3 in the group:Payee Add Category
      this._categoryButton3="";

      //declaration for Field5 Value in the group:Payee Details - Review
      this._reviewField5Value="";

      //declaration for Field3 Label in the group:Acknowledgement - Added Payee
      this._ackField3Label="";

      //declaration for Country Label in the group:Edit Flow - Payee
      this._editFlowCountryLabel="";

      //declaration for Mask Icon Skin in the group:Skins
      this._maskeyeiconskin="";

      //declaration for Field5 Label in the group:Add Payee Tab1
      this._Tab1Field5Label="";

      //declaration for State Value in the group:Add Payee Tab2
      this._Tab2StateValue="";

      //declaration for Button1 in the group:Payee Details - Edit NickName 
      this._editButton1="";

      //declaration for Button1 in the group:Payee Details - Review
      this._reviewButton1="";

      //declaration for Field3 Value in the group:Acknowledgement - Added Payee
      this._ackField3Value="";

      //declaration for Country Value in the group:Edit Flow - Payee
      this._editFlowCountryValue="";

      //declaration for Unmask Icon Skin in the group:Skins
      this._unmaskeyeiconskin="";

      //declaration for Field5 Value in the group:Add Payee Tab1
      this._Tab1Field5Value="";

      //declaration for City Label in the group:Add Payee Tab2
      this._Tab2CityLabel="";

      //declaration for Button2 in the group:Payee Details - Edit NickName 
      this._editButton2="";

      //declaration for Button2 in the group:Payee Details - Review
      this._reviewButton2="";

      //declaration for Field4 Label in the group:Acknowledgement - Added Payee
      this._ackField4Label="";

      //declaration for State Label in the group:Edit Flow - Payee
      this._editFlowStateLabel="";

      //declaration for Account Number Skin in the group:Skins
      this._accountNumberSkin="";

      //declaration for Help Label in the group:Add Payee Tab1
      this._helpText="";

      //declaration for City Value in the group:Add Payee Tab2
      this._Tab2CityValue="";

      //declaration for Button3 in the group:Payee Details - Edit NickName 
      this._editButton3="";

      //declaration for Button3 in the group:Payee Details - Review
      this._reviewButton3="";

      //declaration for Field4 Value in the group:Acknowledgement - Added Payee
      this._ackField4Value="";

      //declaration for State Value in the group:Edit Flow - Payee
      this._editFlowStateValue="";

      //declaration for Add TextboxDisabled Skin in the group:Skins
      this._sknAddTextBoxDisabled="";

      //declaration for Help Action in the group:Add Payee Tab1
      this._helpAction="";

      //declaration for ZipCode Label in the group:Add Payee Tab2
      this._Tab2ZipCodeLabel="";

      //declaration for Field5 Label in the group:Acknowledgement - Added Payee
      this._ackField5Label="";

      //declaration for City Label in the group:Edit Flow - Payee
      this._editFlowCityLabel="";

      //declaration for Selected Tab Skin in the group:Skins
      this._sknSelectedTab="";

      //declaration for Button1 in the group:Add Payee Tab1
      this._Tab1Button1="";

      //declaration for ZipCode Value in the group:Add Payee Tab2
      this._Tab2ZipCodeValue="";

      //declaration for Field5 Value in the group:Acknowledgement - Added Payee
      this._ackField5Value="";

      //declaration for City Value in the group:Edit Flow - Payee
      this._editFlowCityValue="";

      //declaration for UnSelected Tab Skin in the group:Skins
      this._sknUnSelectedTab="";

      //declaration for List Box Skin in the group:Skins
      this._sknListBox="";

      //declaration for Button2 in the group:Add Payee Tab1
      this._tab1Button2="";

      //declaration for Field8 Label in the group:Add Payee Tab2
      this._Tab2Field8Label="";

      //declaration for Button1 in the group:Acknowledgement - Added Payee
      this._ackButton1="";

      //declaration for ZipCode Label in the group:Edit Flow - Payee
      this._editFlowZipCodeLabel="";

      //declaration for Tab Hover Skin in the group:Skins
      this._sknTabHover="";

      //declaration for Field8 Value in the group:Add Payee Tab2
      this._Tab2Field8Value="";

      //declaration for Button2 in the group:Acknowledgement - Added Payee
      this._ackButton2="";

      //declaration for ZipCode Value in the group:Edit Flow - Payee
      this._editFlowZipCodeValue="";

      //declaration for Field9 Label in the group:Add Payee Tab2
      this._Tab2Field9Label="";

      //declaration for Button1 in the group:Edit Flow - Payee
      this._editFlowButton1="";

      //declaration for Field9 Value in the group:Add Payee Tab2
      this._field9ValueTab2="";

      //declaration for Button2 in the group:Edit Flow - Payee
      this._editFlowButton2="";

      //declaration for Checkbox Label in the group:Add Payee Tab2
      this._Tab2CheckBoxLabel="";

      //declaration for CheckBox in the group:Add Payee Tab2
      this._Tab2CheckBox="";

      //declaration for Field10 Label in the group:Add Payee Tab2
      this._Tab2Field10Label="";

      //declaration for Field10 Value in the group:Add Payee Tab2
      this._Tab2Field10Value="";

      //declaration for Field11 Label in the group:Add Payee Tab2
      this._Tab2Field11Label="";

      //declaration for Field11 Value in the group:Add Payee Tab2
      this._Tab2Field11Value="";

      //declaration for Field12 Label in the group:Add Payee Tab2
      this._Tab2Field12Label="";

      //declaration for Field12 Value in the group:Add Payee Tab2
      this._Tab2Field12Value="";


      //declaration for Button1 in the group:Add Payee Tab2
      this._Tab2Button1="";

      //declaration for Button2 in the group:Add Payee Tab2 
      this._tab2Button2="";

      //declaration for Button Yes in the cancel popup in the group : PAyee Details - Review
      this._reviewCancelYesButton = ""; 

      this._enterInfoManuallyLink= "";

      this._characterDelay = "";
      this._isManuallyAdded = "";
      this._editFlowField3Label = "";
      this._editFlowField3Value = "";
      this._editFlowField4Label = "";
      this._editFlowField4Value = "";
      this._editFlowField5Label = "";
      this._editFlowField5Value = "";

      // Contracts property instance variables.
      this.addPayeeDAO = new AddPayeeDAO();
      this.parserUtilsManager = new ParserUtilsManager();
      this.dataValidationHandler = new DataValidationHandler();     
      this.addPayeeUtility = new AddPayeeUtility();
      this.EntitlementUtils = new EntitlementUtils();
      this.textInputsMapping = {};
      this.componentContext = {};
      this.beneficiaryData = {};
      this.rootPath = "";
      this.formatComponentValues = {};
      this.selectedReviewText = "";
      this.selectedReviewIcon = "";
      this.radioIcon1InitialValue = "";
      this.selectedReviewIcon = "";
      this.selectedReviewText = "";
      this.context = {};
      this.entitlementContext = {};
      this.fieldsEnabledMap = {};
      this.parentScope = "";
      this.addTab1tbx1SkinState = "";
      this.addTab1tbx2SkinState = "";
      this.addTab1tbx3SkinState = "";
      this.addTab1tbx4SkinState = "";
      this.addTab1tbx5SkinState = "";
      this.addTab2tbx1SkinState = "";
      this.addTab2tbx2SkinState = "";
      this.addTab2tbx3SkinState = "";
      this.addTab2tbx5SkinState = "";
      this.addTab2tbx6SkinState = "";
      this.addTab2tbx7SkinState = "";
      this.addTab2tbxZipCodeSkinState = "";
      this.payeeDetailstbx1SkinState = "";
      this.payeeDetailstbx2SkinState = "";

      this.eventTriggered = "";
      this._sknAddTextBoxError = "";
      this._countriesList = [];
      this._statesList = [];
      this._countryCode = [];
      this.serviceCounter = 0;
      this.resultAccNumberValidation =[];
      this.selCategoryID ="";
      this.countriesMasterData = [];
      this.statesMasterData = [];
      this.countryCodesMasterData = [];

      //Address Suggestions related properties
      this._suggestionsObjectService = "";
      this._suggestionsObject = "";
      this._getAddressSuggestionsOperation = "";
      this._getAddressSuggestionCritera = "";
      this._getAddressSuggestionIdentifier = "";
      this._getFormattedAddressOperation = "";
      this._getFormattedAddressCriteria = "";
      this._getFormattedAddressIdentifier = "";

      //Contract customers related properties
      this._contractObjectService = "";
      this._contractObject = "";
      this._contractOperation = "";
      
      //Country Code related properties
      this._isCodeVisible = "";
      this._countryObjectServiceName = "";
      this._countryObjectName = "";
      this._countryOperationName = "";
      this._countryCriteria = "";
      this._CountryIdentifier = "";

      this.CHECBOX_SELECTED = "C";
      this.CHECBOX_UNSELECTED = "D";
      this.CHECKBOX_UNSELECTED_SKIN = "sknlblOLBFonts0273E420pxOlbFontIcons";
      this.CHECKBOX_SELECTED_SKIN = "sknlblDelete20px";
      this.FlowType = "";
      //this.setContextFlag = false;

      this.locationObj ={
        "currLatitude": "",
        "currLongitude": "",
        "query": ""
      },

      this.tbxFlag = false;
      this.flagg = false;

        // component global variables.
        this.screens = ["flxContainer", "flxEditPayeeDetails", "flxDBXAccountType", "flxConfirmation", "flxAcknowledgement", "flxEditPayee", "flxContractList"];
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {           
      defineSetter(this, "selectedflowType", function(val) {
        if((typeof val=='string') && (val != "")){
          this._selectedflowType = val;
        }
      });

      defineGetter(this, "selectedflowType", function() {
        return this._selectedflowType;
      }); 

      defineSetter(this, "enterInfoManuallyLink", function(val) {
        if((typeof val=='string') && (val != "")){
          this._enterInfoManuallyLink = val;
        }
      });

      defineGetter(this, "enterInfoManuallyLink", function() {
        return this._enterInfoManuallyLink;
      });   
      defineSetter(this, "reviewCancelYesButton", function(val) {
        if((typeof val=='string') && (val != "")){
          this._reviewCancelYesButton = val;
        }
      });

      defineGetter(this, "reviewCancelYesButton", function() {
        return this._reviewCancelYesButton;
      });   

      defineSetter(this, "customCREATECriteria", function(val) {
        if((typeof val=='string') && (val != "")){
          this._customCREATECriteria = val;
        }
      });

      defineGetter(this, "customCREATECriteria", function() {
        return this._customCREATECriteria;
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

      defineSetter(this, "editFlowField3Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._editFlowField3Label = val;
        }
      });

      defineGetter(this, "editFlowField3Label", function() {
        return this._editFlowField3Label;
      });

      defineSetter(this, "editFlowField3Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._editFlowField3Value = val;
        }
      });

      defineGetter(this, "editAckText", function() {
        return this._editAckText;
      });

      defineSetter(this, "editAckText", function(val) {
        if((typeof val=='string') && (val != "")){
          this._editAckText = val;
        }
      });

      defineGetter(this, "editFlowField3Value", function() {
        return this._editFlowField3Value;
      });

      defineSetter(this, "editFlowField4Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._editFlowField4Label = val;
        }
      });

      defineGetter(this, "editFlowField4Label", function() {
        return this._editFlowField4Label;
      });

      defineSetter(this, "editFlowField4Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._editFlowField4Value = val;
        }
      });

      defineGetter(this, "editFlowField4Value", function() {
        return this._editFlowField4Value;
      });

      defineSetter(this, "editFlowField5Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._editFlowField5Label = val;
        }
      });

      defineGetter(this, "editFlowField5Label", function() {
        return this._editFlowField5Label;
      });

      defineSetter(this, "editFlowField5Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._editFlowField5Value = val;
        }
      });

      defineGetter(this, "editFlowField5Value", function() {
        return this._editFlowField5Value;
      });

      defineSetter(this, "isManuallyAdded", function(val) {
        if((typeof val=='string') && (val != "")){
          this._isManuallyAdded = val;
        }
      });

      defineGetter(this, "isManuallyAdded", function() {
        return this._isManuallyAdded;
      });

      defineSetter(this, "characterDelay", function(val) {
        if((typeof val=='number') && (val != "")){
          this._characterDelay=val;
        }
      });

      defineGetter(this, "characterDelay", function() {
        return this._characterDelay;
      });

      //setter method for Payee Object Service in the group:Payee Management Service
      defineSetter(this, "payeeObjectService", function(val) {
        if((typeof val=='string') && (val != "")){
          this._payeeObjectService=val;
        }
      });

      //getter method for Payee Object Service in the group:Payee Management Service
      defineGetter(this, "payeeObjectService", function() {
        return this._payeeObjectService;
      });

      //setter method for BillerSearch Object Service in the group:Biller Search Service
      defineSetter(this, "billerSearchObjectService", function(val) {
        if((typeof val=='string') && (val != "")){
          this._billerSearchObjectService=val;
        }
      });

      //getter method for BillerSearch Object Service in the group:Biller Search Service
      defineGetter(this, "billerSearchObjectService", function() {
        return this._billerSearchObjectService;
      });

      //setter method for Block Title in the group:General
      defineSetter(this, "blockTitle", function(val) {
        if((typeof val=='string') && (val != "")){
          this._blockTitle=val;
        }
      });

      //getter method for Block Title in the group:General
      defineGetter(this, "blockTitle", function() {
        return this._blockTitle;
      });

      //setter method for Masking Required in the group:Account Number
      defineSetter(this, "masking", function(val) {
        if((typeof val=='string') && (val != "")){
          this._masking=val;
        }
      });

      //getter method for Masking Required in the group:Account Number
      defineGetter(this, "masking", function() {
        return this._masking;
      });

      //setter method for Title in the group:Add Payee Tab1
      defineSetter(this, "tab1Title", function(val) {
        if((typeof val=='string') && (val != "")){
          this._tab1Title=val;
        }
      });

      //getter method for Title in the group:Add Payee Tab1
      defineGetter(this, "tab1Title", function() {
        return this._tab1Title;
      });

      //setter method for Title in the group:Add Payee Tab2
      defineSetter(this, "tab2Title", function(val) {
        if((typeof val=='string') && (val != "")){
          this._tab2Title=val;
        }
      });

      //getter method for Title in the group:Add Payee Tab2
      defineGetter(this, "tab2Title", function() {
        return this._tab2Title;
      });

      //setter method for SectionTitle in the group:Payee Details - Edit NickName 
      defineSetter(this, "editSectionTitle", function(val) {
        if((typeof val=='string') && (val != "")){
          this._editSectionTitle=val;
        }
      });

      //getter method for SectionTitle in the group:Payee Details - Edit NickName 
      defineGetter(this, "editSectionTitle", function() {
        return this._editSectionTitle;
      });

      //setter method for Title in the group:Payee Add Category
      defineSetter(this, "categoryTitle", function(val) {
        if((typeof val=='string') && (val != "")){
          this._categoryTitle=val;
        }
      });

      //getter method for Title in the group:Payee Add Category
      defineGetter(this, "categoryTitle", function() {
        return this._categoryTitle;
      });

      //setter method for SectionTitle in the group:Payee Details - Review
      defineSetter(this, "reviewSectionTitle", function(val) {
        if((typeof val=='string') && (val != "")){
          this._reviewSectionTitle=val;
        }
      });

      //getter method for SectionTitle in the group:Payee Details - Review
      defineGetter(this, "reviewSectionTitle", function() {
        return this._reviewSectionTitle;
      });

      //setter method for Section1 Title in the group:Acknowledgement - Added Payee
      defineSetter(this, "ackSection1Title", function(val) {
        if((typeof val=='string') && (val != "")){
          this._ackSection1Title=val;
        }
      });

      //getter method for Section1 Title in the group:Acknowledgement - Added Payee
      defineGetter(this, "ackSection1Title", function() {
        return this._ackSection1Title;
      });

      //setter method for Block Title in the group:Edit Flow - Payee
      defineSetter(this, "editblockTitle", function(val) {
        if((typeof val=='string') && (val != "")){
          this._editblockTitle=val;
        }
      });

      //getter method for Block Title in the group:Edit Flow - Payee
      defineGetter(this, "editblockTitle", function() {
        return this._editblockTitle;
      });

      //setter method for Data Validation Config in the group:Data Validation Config
      defineSetter(this, "dvfConfig", function(val) {
        if((typeof val=='string') && (val != "")){
          this._dvfConfig=val;
        }
      });

      //getter method for Data Validation Config in the group:Data Validation Config
      defineGetter(this, "dvfConfig", function() {
        return this._dvfConfig;
      });

      //setter method for User Role Type in the group:Context
      defineSetter(this, "userRoleType", function(val) {
        if((typeof val=='string') && (val != "")){
          this._userRoleType=val;
        }
      });

      //getter method for User Role Type in the group:Context
      defineGetter(this, "userRoleType", function() {
        return this._userRoleType;
      });

      //setter method for Address Object Service in the group:Address Services ( State & Country Related Services)
      defineSetter(this, "addressObjectService", function(val) {
        if((typeof val=='string') && (val != "")){
          this._addressObjectService=val;
        }
      });

      //getter method for Address Object Service in the group:Address Services ( State & Country Related Services)
      defineGetter(this, "addressObjectService", function() {
        return this._addressObjectService;
      });

      //setter method for Google auto fill enabled in the group:Google Place Autocomplete
      defineSetter(this, "ADDRgoogleApiEnabled", function(val) {
        if((typeof val=='string') && (val != "")){
          this._ADDRgoogleApiEnabled=val;
        }
      });

      //getter method for Google auto fill enabled in the group:Google Place Autocomplete
      defineGetter(this, "ADDRgoogleApiEnabled", function() {
        return this._ADDRgoogleApiEnabled;
      });

      //setter method for AddLabel Skin in the group:Skins
      defineSetter(this, "sknAddLabel", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknAddLabel=val;
        }
      });

      //getter method for AddLabel Skin in the group:Skins
      defineGetter(this, "sknAddLabel", function() {
        return this._sknAddLabel;
      });

      //setter method for Payee Object in the group:Payee Management Service
      defineSetter(this, "payeeObject", function(val) {
        if((typeof val=='string') && (val != "")){
          this._payeeObject=val;
        }
      });

      //getter method for Payee Object in the group:Payee Management Service
      defineGetter(this, "payeeObject", function() {
        return this._payeeObject;
      });

      //setter method for BillerSearch Object in the group:Biller Search Service
      defineSetter(this, "billerSearchObject", function(val) {
        if((typeof val=='string') && (val != "")){
          this._billerSearchObject=val;
        }
      });

      //getter method for BillerSearch Object in the group:Biller Search Service
      defineGetter(this, "billerSearchObject", function() {
        return this._billerSearchObject;
      });

      //setter method for Breakpoints in the group:General
      defineSetter(this, "BREAKPTS", function(val) {
        if((typeof val=='string') && (val != "")){
          this._BREAKPTS=val;
        }
      });

      //getter method for Breakpoints in the group:General
      defineGetter(this, "BREAKPTS", function() {
        return this._BREAKPTS;
      });

      //setter method for Flowtypes in the group:General
      defineSetter(this, "FLOWTYPES", function(val) {
        if((typeof val=='string') && (val != "")){
          this._FLOWTYPES=val;
        }
      });

      //getter method for Flowtypes in the group:General
      defineGetter(this, "FLOWTYPES", function() {
        return this._FLOWTYPES;
      });

      //setter method for Account Number Format in the group:Account Number
      defineSetter(this, "accountNumberFormat", function(val) {
        if((typeof val=='string') && (val != "")){
          this._accountNumberFormat=val;
        }
      });

      //getter method for Account Number Format in the group:Account Number
      defineGetter(this, "accountNumberFormat", function() {
        return this._accountNumberFormat;
      });

      //setter method for Visibility in the group:Add Payee Tab1
      defineSetter(this, "tab1Visibility", function(val) {
        if((typeof val=='boolean') && (val != "")){
          this._tab1Visibility=val;
        }
      });

      //getter method for Visibility in the group:Add Payee Tab1
      defineGetter(this, "tab1Visibility", function() {
        return this._tab1Visibility;
      });

      //setter method for Visibility in the group:Add Payee Tab2
      defineSetter(this, "tab2Visibility", function(val) {
        if((typeof val=='boolean') && (val != "")){
          this._tab2Visibility=val;
        }
      });

      //getter method for Visibility in the group:Add Payee Tab2
      defineGetter(this, "tab2Visibility", function() {
        return this._tab2Visibility;
      });

      //setter method for Field1 Label in the group:Payee Details - Edit NickName 
      defineSetter(this, "editField1Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._editField1Label=val;
        }
      });

      //getter method for Field1 Label in the group:Payee Details - Edit NickName 
      defineGetter(this, "editField1Label", function() {
        return this._editField1Label;
      });

      //setter method for User Role Based Visibility in the group:Payee Add Category
      defineSetter(this, "roleBasedVisibility", function(val) {
        if((typeof val=='string') && (val != "")){
          this._roleBasedVisibility=val;
        }
      });

      //getter method for User Role Based Visibility in the group:Payee Add Category
      defineGetter(this, "roleBasedVisibility", function() {
        return this._roleBasedVisibility;
      });

      //setter method for Field1 Label in the group:Payee Details - Review
      defineSetter(this, "reviewField1Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._reviewField1Label=val;
        }
      });

      //getter method for Field1 Label in the group:Payee Details - Review
      defineGetter(this, "reviewField1Label", function() {
        return this._reviewField1Label;
      });

      //setter method for Acknowledgement Text in the group:Acknowledgement - Added Payee
      defineSetter(this, "ackText", function(val) {
        if((typeof val=='string') && (val != "")){
          this._ackText=val;
        }
      });

      //getter method for Acknowledgement Text in the group:Acknowledgement - Added Payee
      defineGetter(this, "ackText", function() {
        return this._ackText;
      });

      //setter method for Section Title in the group:Edit Flow - Payee
      defineSetter(this, "sectionTitle", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sectionTitle=val;
        }
      });

      //getter method for Section Title in the group:Edit Flow - Payee
      defineGetter(this, "sectionTitle", function() {
        return this._sectionTitle;
      });

      //setter method for Minimum Fill Mapping in the group:Data Validation Config
      defineSetter(this, "minFillMapping", function(val) {
        if((typeof val=='string') && (val != "")){
          this._minFillMapping=val;
        }
      });

      //getter method for Minimum Fill Mapping in the group:Data Validation Config
      defineGetter(this, "minFillMapping", function() {
        return this._minFillMapping;
      });

      //setter method for Payee Id in the group:Context
      defineSetter(this, "payeeId", function(val) {
        if((typeof val=='string') && (val != "")){
          this._payeeId=val;
        }
      });

      //getter method for Payee Id in the group:Context
      defineGetter(this, "payeeId", function() {
        return this._payeeId;
      });

      //setter method for Country Object in the group:Address Services ( State & Country Related Services)
      defineSetter(this, "countryObject", function(val) {
        if((typeof val=='string') && (val != "")){
          this._countryObject=val;
        }
      });

      //getter method for Country Object in the group:Address Services ( State & Country Related Services)
      defineGetter(this, "countryObject", function() {
        return this._countryObject;
      });

      //setter method for Default Country in the group:Google Place Autocomplete
      defineSetter(this, "ADDRdefaultCountry", function(val) {
        if((typeof val=='string') && (val != "")){
          this._ADDRdefaultCountry=val;
        }
      });

      //getter method for Default Country in the group:Google Place Autocomplete
      defineGetter(this, "ADDRdefaultCountry", function() {
        return this._ADDRdefaultCountry;
      });

      //setter method for AddTextBox EnabledSKin in the group:Skins
      defineSetter(this, "sknAddTextBoxEnabled", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknAddTextBoxEnabled=val;
        }
      });

      //getter method for AddTextBox EnabledSKin in the group:Skins
      defineGetter(this, "sknAddTextBoxEnabled", function() {
        return this._sknAddTextBoxEnabled;
      });

      //setter method for AddTextBox PlaceHolderSkin in the group:Skins
      defineSetter(this, "sknAddTextBoxPlaceHolder", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknAddTextBoxPlaceHolder=val;
        }
      });

      //getter method for AddTextBox PlaceHolderSkin in the group:Skins
      defineGetter(this, "sknAddTextBoxPlaceHolder", function() {
        return this._sknAddTextBoxPlaceHolder;
      });

      //setter method for AcknowledgementReferenceNumberLabel Skin in the group:Skins
      defineSetter(this, "sknAcknowledgementReferenceNumberLabel", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknAcknowledgementReferenceNumberLabel=val;
        }
      });

      //getter method for AcknowledgementReferenceNumberLabel Skin in the group:Skins
      defineGetter(this, "sknAcknowledgementReferenceNumberLabel", function() {
        return this._sknAcknowledgementReferenceNumberLabel;
      });

      //setter method for Payee Create Operation in the group:Payee Management Service
      defineSetter(this, "payeeCREATEOperation", function(val) {
        if((typeof val=='string') && (val != "")){
          this._payeeCREATEOperation=val;
        }
      });

      //getter method for Payee Create Operation in the group:Payee Management Service
      defineGetter(this, "payeeCREATEOperation", function() {
        return this._payeeCREATEOperation;
      });

      //setter method for BillerSearch Operation in the group:Biller Search Service
      defineSetter(this, "billerSearchOperation", function(val) {
        if((typeof val=='string') && (val != "")){
          this._billerSearchOperation=val;
        }
      });

      //getter method for BillerSearch Operation in the group:Biller Search Service
      defineGetter(this, "billerSearchOperation", function() {
        return this._billerSearchOperation;
      });

      //setter method for Mask VizIcon in the group:Account Number
      defineSetter(this, "maskeyeicon", function(val) {
        if((typeof val=='string') && (val != "")){
          this._maskeyeicon=val;
        }
      });

      //getter method for Mask VizIcon in the group:Account Number
      defineGetter(this, "maskeyeicon", function() {
        return this._maskeyeicon;
      });

      //setter method for Biller Label in the group:Add Payee Tab1
      defineSetter(this, "Tab1Field1Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._Tab1Field1Label=val;
        }
      });

      //getter method for Biller Label in the group:Add Payee Tab1
      defineGetter(this, "Tab1Field1Label", function() {
        return this._Tab1Field1Label;
      });

      //setter method for Field1 Label in the group:Add Payee Tab2
      defineSetter(this, "Tab2Field1Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._Tab2Field1Label=val;
        }
      });

      //getter method for Field1 Label in the group:Add Payee Tab2
      defineGetter(this, "Tab2Field1Label", function() {
        return this._Tab2Field1Label;
      });

      //setter method for Field1 Value in the group:Payee Details - Edit NickName 
      defineSetter(this, "editField1Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._editField1Value=val;
        }
      });

      //getter method for Field1 Value in the group:Payee Details - Edit NickName 
      defineGetter(this, "editField1Value", function() {
        return this._editField1Value;
      });

      //setter method for Radio Icon1 in the group:Payee Add Category
      defineSetter(this, "radioIcon1", function(val) {
        if((typeof val=='string') && (val != "")){
          this._radioIcon1=val;
        }
      });

      //getter method for Radio Icon1 in the group:Payee Add Category
      defineGetter(this, "radioIcon1", function() {
        return this._radioIcon1;
      });

      //setter method for Field1 Value in the group:Payee Details - Review
      defineSetter(this, "reviewField1Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._reviewField1Value=val;
        }
      });

      //getter method for Field1 Value in the group:Payee Details - Review
      defineGetter(this, "reviewField1Value", function() {
        return this._reviewField1Value;
      });

      //setter method for Image in the group:Acknowledgement - Added Payee
      defineSetter(this, "ackImage", function(val) {
        if((typeof val=='string') && (val != "")){
          this._ackImage=val;
        }
      });

      //getter method for Image in the group:Acknowledgement - Added Payee
      defineGetter(this, "ackImage", function() {
        return this._ackImage;
      });

      //setter method for Field1 Label in the group:Edit Flow - Payee
      defineSetter(this, "editFlowField1Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._editFlowField1Label=val;
        }
      });

      //getter method for Field1 Label in the group:Edit Flow - Payee
      defineGetter(this, "editFlowField1Label", function() {
        return this._editFlowField1Label;
      });

      //setter method for Payee NickName in the group:Context
      defineSetter(this, "payeeNickName", function(val) {
        if((typeof val=='string') && (val != "")){
          this._payeeNickName=val;
        }
      });

      //getter method for Payee NickName in the group:Context
      defineGetter(this, "payeeNickName", function() {
        return this._payeeNickName;
      });

      //setter method for GetCountries Operation in the group:Address Services ( State & Country Related Services)
      defineSetter(this, "getCountriesOperation", function(val) {
        if((typeof val=='string') && (val != "")){
          this._getCountriesOperation=val;
        }
      });

      //getter method for GetCountries Operation in the group:Address Services ( State & Country Related Services)
      defineGetter(this, "getCountriesOperation", function() {
        return this._getCountriesOperation;
      });

      //setter method for Number of chars to trigger auto fill api in the group:Google Place Autocomplete
      defineSetter(this, "ADDRnumberOfCharsToTriggerAutoFill", function(val) {
        if((typeof val=='string') && (val != "")){
          this._ADDRnumberOfCharsToTriggerAutoFill=val;
        }
      });

      //getter method for Number of chars to trigger auto fill api in the group:Google Place Autocomplete
      defineGetter(this, "ADDRnumberOfCharsToTriggerAutoFill", function() {
        return this._ADDRnumberOfCharsToTriggerAutoFill;
      });

      //setter method for AddTextBox FocusSkin in the group:Skins
      defineSetter(this, "sknAddTextBoxFocus", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknAddTextBoxFocus=val;
        }
      });

      //getter method for AddTextBox FocusSkin in the group:Skins
      defineGetter(this, "sknAddTextBoxFocus", function() {
        return this._sknAddTextBoxFocus;
      });

      //setter method for AcknowledgementReferenceNumberValueSkin in the group:Skins
      defineSetter(this, "sknAcknowledgementReferenceNumberValue", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknAcknowledgementReferenceNumberValue=val;
        }
      });

      //getter method for AcknowledgementReferenceNumberValueSkin in the group:Skins
      defineGetter(this, "sknAcknowledgementReferenceNumberValue", function() {
        return this._sknAcknowledgementReferenceNumberValue;
      });

      //setter method for Payee Create Criteria in the group:Payee Management Service
      defineSetter(this, "payeeCREATECriteria", function(val) {
        if((typeof val=='string') && (val != "")){
          this._payeeCREATECriteria=val;
        }
      });

      //getter method for Payee Create Criteria in the group:Payee Management Service
      defineGetter(this, "payeeCREATECriteria", function() {
        return this._payeeCREATECriteria;
      });

      //setter method for BillerSearch Criteria in the group:Biller Search Service
      defineSetter(this, "billerSearchCriteria", function(val) {
        if((typeof val=='string') && (val != "")){
          this._billerSearchCriteria=val;
        }
      });

      //getter method for BillerSearch Criteria in the group:Biller Search Service
      defineGetter(this, "billerSearchCriteria", function() {
        return this._billerSearchCriteria;
      });

      //setter method for Unmask VizIcon in the group:Account Number
      defineSetter(this, "unmaskeyeicon", function(val) {
        if((typeof val=='string') && (val != "")){
          this._unmaskeyeicon=val;
        }
      });

      //getter method for Unmask VizIcon in the group:Account Number
      defineGetter(this, "unmaskeyeicon", function() {
        return this._unmaskeyeicon;
      });

      //setter method for Biller Value in the group:Add Payee Tab1
      defineSetter(this, "Tab1Field1Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._Tab1Field1Value=val;
        }
      });

      //getter method for Biller Value in the group:Add Payee Tab1
      defineGetter(this, "Tab1Field1Value", function() {
        return this._Tab1Field1Value;
      });

      //setter method for Field1 Value in the group:Add Payee Tab2
      defineSetter(this, "Tab2Field1Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._Tab2Field1Value=val;
        }
      });

      //getter method for Field1 Value in the group:Add Payee Tab2
      defineGetter(this, "Tab2Field1Value", function() {
        return this._Tab2Field1Value;
      });

      //setter method for Field2 Label in the group:Payee Details - Edit NickName 
      defineSetter(this, "editField2Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._editField2Label=val;
        }
      });

      //getter method for Field2 Label in the group:Payee Details - Edit NickName 
      defineGetter(this, "editField2Label", function() {
        return this._editField2Label;
      });

      //setter method for Radio Icon2 in the group:Payee Add Category
      defineSetter(this, "radioIcon2", function(val) {
        if((typeof val=='string') && (val != "")){
          this._radioIcon2=val;
        }
      });

      //getter method for Radio Icon2 in the group:Payee Add Category
      defineGetter(this, "radioIcon2", function() {
        return this._radioIcon2;
      });

      //setter method for Field2 Label in the group:Payee Details - Review
      defineSetter(this, "reviewField2Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._reviewField2Label=val;
        }
      });

      //getter method for Field2 Label in the group:Payee Details - Review
      defineGetter(this, "reviewField2Label", function() {
        return this._reviewField2Label;
      });

      //setter method for Reference Label in the group:Acknowledgement - Added Payee
      defineSetter(this, "ackReferenceText", function(val) {
        if((typeof val=='string') && (val != "")){
          this._ackReferenceText=val;
        }
      });

      //getter method for Reference Label in the group:Acknowledgement - Added Payee
      defineGetter(this, "ackReferenceText", function() {
        return this._ackReferenceText;
      });

      //setter method for Field1 Value in the group:Edit Flow - Payee
      defineSetter(this, "editFlowField1Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._editFlowField1Value=val;
        }
      });

      //getter method for Field1 Value in the group:Edit Flow - Payee
      defineGetter(this, "editFlowField1Value", function() {
        return this._editFlowField1Value;
      });

      //setter method for AddressLine1 in the group:Context
      defineSetter(this, "addressLine1", function(val) {
        if((typeof val=='string') && (val != "")){
          this._addressLine1=val;
        }
      });

      //getter method for AddressLine1 in the group:Context
      defineGetter(this, "addressLine1", function() {
        return this._addressLine1;
      });

      //setter method for GetCountries Criteria in the group:Address Services ( State & Country Related Services)
      defineSetter(this, "getCountriesCriteria", function(val) {
        if((typeof val=='string') && (val != "")){
          this._getCountriesCriteria=val;
        }
      });

      //getter method for GetCountries Criteria in the group:Address Services ( State & Country Related Services)
      defineGetter(this, "getCountriesCriteria", function() {
        return this._getCountriesCriteria;
      });

      //setter method for Display Long/Short Names-AutoFill in the group:Google Place Autocomplete
      defineSetter(this, "ADDRdisplayAutoFillLongOrShortNames", function(val) {
        if((typeof val=='string') && (val != "")){
          this._ADDRdisplayAutoFillLongOrShortNames=val;
        }
      });

      //getter method for Display Long/Short Names-AutoFill in the group:Google Place Autocomplete
      defineGetter(this, "ADDRdisplayAutoFillLongOrShortNames", function() {
        return this._ADDRdisplayAutoFillLongOrShortNames;
      });

      //setter method for AddTextBox HoverSkin in the group:Skins
      defineSetter(this, "sknAddTextBoxHover", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknAddTextBoxHover=val;
        }
      });

      //getter method for AddTextBox HoverSkin in the group:Skins
      defineGetter(this, "sknAddTextBoxHover", function() {
        return this._sknAddTextBoxHover;
      });

      //setter method for PrimaryButtonSkin in the group:Skins
      defineSetter(this, "sknPrimaryButton", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknPrimaryButton=val;
        }
      });

      //getter method for PrimaryButtonSkin in the group:Skins
      defineGetter(this, "sknPrimaryButton", function() {
        return this._sknPrimaryButton;
      });

      //setter method for Payee Create Service Response Identifier in the group:Payee Management Service
      defineSetter(this, "payeeCREATEIdentifier", function(val) {
        if((typeof val=='string') && (val != "")){
          this._payeeCREATEIdentifier=val;
        }
      });

      //getter method for Payee Create Service Response Identifier in the group:Payee Management Service
      defineGetter(this, "payeeCREATEIdentifier", function() {
        return this._payeeCREATEIdentifier;
      });

      //setter method for BillerSearch Identifier in the group:Biller Search Service
      defineSetter(this, "billerSearchIdentifier", function(val) {
        if((typeof val=='string') && (val != "")){
          this._billerSearchIdentifier=val;
        }
      });

      //getter method for BillerSearch Identifier in the group:Biller Search Service
      defineGetter(this, "billerSearchIdentifier", function() {
        return this._billerSearchIdentifier;
      });

      //setter method for AddressLine1 Label in the group:Add Payee Tab2
      defineSetter(this, "Tab2AddressLine1", function(val) {
        if((typeof val=='string') && (val != "")){
          this._Tab2AddressLine1=val;
        }
      });

      //getter method for AddressLine1 Label in the group:Add Payee Tab2
      defineGetter(this, "Tab2AddressLine1", function() {
        return this._Tab2AddressLine1;
      });

      //setter method for Field2 Value in the group:Payee Details - Edit NickName 
      defineSetter(this, "editField2Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._editField2Value=val;
        }
      });

      //getter method for Field2 Value in the group:Payee Details - Edit NickName 
      defineGetter(this, "editField2Value", function() {
        return this._editField2Value;
      });

      //setter method for Field2 Value with out address line 2 in the group:Payee Details - Edit NickName 
      defineSetter(this, "payeeDetailsField2Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._payeeDetailsField2Value=val;
        }
      });

      //getter method for Field2 Value with out address line 2in the group:Payee Details - Edit NickName 
      defineGetter(this, "payeeDetailsField2Value", function() {
        return this._payeeDetailsField2Value;
      });

      //setter method for Radio Icon1 Criteria in the group:Payee Add Category
      defineSetter(this, "radioIcon1Criteria", function(val) {
        if((typeof val=='string') && (val != "")){
          this._radioIcon1Criteria=val;
        }
      });

      //getter method for Radio Icon1 Criteria in the group:Payee Add Category
      defineGetter(this, "radioIcon1Criteria", function() {
        return this._radioIcon1Criteria;
      });

      //setter method for Field2 Value in the group:Payee Details - Review
      defineSetter(this, "reviewField2Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._reviewField2Value=val;
        }
      });

      //getter method for Field2 Value in the group:Payee Details - Review
      defineGetter(this, "reviewField2Value", function() {
        return this._reviewField2Value;
      });

      //setter method for Field2 Value with out address line 2in the group:Payee Details - Review
      defineSetter(this, "reviewDetailsField2Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._reviewDetailsField2Value=val;
        }
      });

      //getter method for Field2 Value with out address line 2 in the group:Payee Details - Review
      defineGetter(this, "reviewDetailsField2Value", function() {
        return this._reviewDetailsField2Value;
      });

      //setter method for Reference Value in the group:Acknowledgement - Added Payee
      defineSetter(this, "ackReferenceValue", function(val) {
        if((typeof val=='string') && (val != "")){
          this._ackReferenceValue=val;
        }
      });

      //getter method for Reference Value in the group:Acknowledgement - Added Payee
      defineGetter(this, "ackReferenceValue", function() {
        return this._ackReferenceValue;
      });

      //setter method for Field2 Label in the group:Edit Flow - Payee
      defineSetter(this, "editFlowField2Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._editFlowField2Label=val;
        }
      });

      //getter method for Field2 Label in the group:Edit Flow - Payee
      defineGetter(this, "editFlowField2Label", function() {
        return this._editFlowField2Label;
      });

      //setter method for AddressLine2 in the group:Context
      defineSetter(this, "addressLine2", function(val) {
        if((typeof val=='string') && (val != "")){
          this._addressLine2=val;
        }
      });

      //getter method for AddressLine2 in the group:Context
      defineGetter(this, "addressLine2", function() {
        return this._addressLine2;
      });

      //setter method for GetCountries Identifier in the group:Address Services ( State & Country Related Services)
      defineSetter(this, "getCountriesIdentifier", function(val) {
        if((typeof val=='string') && (val != "")){
          this._getCountriesIdentifier=val;
        }
      });

      //getter method for GetCountries Identifier in the group:Address Services ( State & Country Related Services)
      defineGetter(this, "getCountriesIdentifier", function() {
        return this._getCountriesIdentifier;
      });

      //setter method for Default State in the group:Google Place Autocomplete
      defineSetter(this, "ADDRdefaultState", function(val) {
        if((typeof val=='string') && (val != "")){
          this._ADDRdefaultState=val;
        }
      });

      //getter method for Default State in the group:Google Place Autocomplete
      defineGetter(this, "ADDRdefaultState", function() {
        return this._ADDRdefaultState;
      });

      //setter method for BlockTitle Skin in the group:Skins
      defineSetter(this, "sknBlockTitle", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknBlockTitle=val;
        }
      });

      //getter method for BlockTitle Skin in the group:Skins
      defineGetter(this, "sknBlockTitle", function() {
        return this._sknBlockTitle;
      });

      //setter method for PrimaryButtonDisabledSkin in the group:Skins
      defineSetter(this, "sknPrimaryButtonDisabled", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknPrimaryButtonDisabled=val;
        }
      });

      //getter method for PrimaryButtonDisabledSkin in the group:Skins
      defineGetter(this, "sknPrimaryButtonDisabled", function() {
        return this._sknPrimaryButtonDisabled;
      });


      //setter method for List Box in the group:Skins
      defineSetter(this, "sknListBox", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknListBox=val;
        }
      });

      //getter method for List Box Skin in the group:Skins
      defineGetter(this, "sknListBox", function() {
        return this._sknListBox;
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

      //setter method for Field2 Label in the group:Add Payee Tab1
      defineSetter(this, "Tab1Field2Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._Tab1Field2Label=val;
        }
      });

      //getter method for Field2 Label in the group:Add Payee Tab1
      defineGetter(this, "Tab1Field2Label", function() {
        return this._Tab1Field2Label;
      });

      //setter method for Payee Edit Operation in the group:Payee Management Service
      defineSetter(this, "payeeEDITOperation", function(val) {
        if((typeof val=='string') && (val != "")){
          this._payeeEDITOperation=val;
        }
      });

      //getter method for Payee Edit Operation in the group:Payee Management Service
      defineGetter(this, "payeeEDITOperation", function() {
        return this._payeeEDITOperation;
      });

      //setter method for AddressLine1 Value in the group:Add Payee Tab2
      defineSetter(this, "Tab2AddressLine1Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._Tab2AddressLine1Value=val;
        }
      });

      //getter method for AddressLine1 Value in the group:Add Payee Tab2
      defineGetter(this, "Tab2AddressLine1Value", function() {
        return this._Tab2AddressLine1Value;
      });

      //setter method for Field3 Label in the group:Payee Details - Edit NickName 
      defineSetter(this, "editField3Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._editField3Label=val;
        }
      });

      //getter method for Field3 Label in the group:Payee Details - Edit NickName 
      defineGetter(this, "editField3Label", function() {
        return this._editField3Label;
      });

      //setter method for Radio Icon2 Criteria in the group:Payee Add Category
      defineSetter(this, "radioIcon2Criteria", function(val) {
        if((typeof val=='string') && (val != "")){
          this._radioIcon2Criteria=val;
        }
      });

      //getter method for Radio Icon2 Criteria in the group:Payee Add Category
      defineGetter(this, "radioIcon2Criteria", function() {
        return this._radioIcon2Criteria;
      });

      //setter method for Field3 Label in the group:Payee Details - Review
      defineSetter(this, "reviewField3Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._reviewField3Label=val;
        }
      });

      //getter method for Field3 Label in the group:Payee Details - Review
      defineGetter(this, "reviewField3Label", function() {
        return this._reviewField3Label;
      });

      //setter method for Section2Title in the group:Acknowledgement - Added Payee
      defineSetter(this, "ackSection2Title", function(val) {
        if((typeof val=='string') && (val != "")){
          this._ackSection2Title=val;
        }
      });

      //getter method for Section2Title in the group:Acknowledgement - Added Payee
      defineGetter(this, "ackSection2Title", function() {
        return this._ackSection2Title;
      });

      //setter method for Field2 Value in the group:Edit Flow - Payee
      defineSetter(this, "editFlowField2Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._editFlowField2Value=val;
        }
      });

      //getter method for Field2 Value in the group:Edit Flow - Payee
      defineGetter(this, "editFlowField2Value", function() {
        return this._editFlowField2Value;
      });

      //setter method for State in the group:Context
      defineSetter(this, "state", function(val) {
        if((typeof val=='string') && (val != "")){
          this._state=val;
        }
      });

      //getter method for State in the group:Context
      defineGetter(this, "state", function() {
        return this._state;
      });

      //setter method for States Object in the group:Address Services ( State & Country Related Services)
      defineSetter(this, "statesObject", function(val) {
        if((typeof val=='string') && (val != "")){
          this._statesObject=val;
        }
      });

      //getter method for States Object in the group:Address Services ( State & Country Related Services)
      defineGetter(this, "statesObject", function() {
        return this._statesObject;
      });

      //setter method for SectionHeader Skin in the group:Skins
      defineSetter(this, "sknSectionHeader", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknSectionHeader=val;
        }
      });

      //getter method for SectionHeader Skin in the group:Skins
      defineGetter(this, "sknSectionHeader", function() {
        return this._sknSectionHeader;
      });

      //setter method for PrimaryButtonFocusSkin in the group:Skins
      defineSetter(this, "sknPrimaryButtonFocus", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknPrimaryButtonFocus=val;
        }
      });

      //getter method for PrimaryButtonFocusSkin in the group:Skins
      defineGetter(this, "sknPrimaryButtonFocus", function() {
        return this._sknPrimaryButtonFocus;
      });

      //setter method for Field2 Value in the group:Add Payee Tab1
      defineSetter(this, "Tab1Field2Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._Tab1Field2Value=val;
        }
      });

      //getter method for Field2 Value in the group:Add Payee Tab1
      defineGetter(this, "Tab1Field2Value", function() {
        return this._Tab1Field2Value;
      });

      //setter method for Payee Edit Criteria in the group:Payee Management Service
      defineSetter(this, "payeeEDITCriteria", function(val) {
        if((typeof val=='string') && (val != "")){
          this._payeeEDITCriteria=val;
        }
      });

      //getter method for Payee Edit Criteria in the group:Payee Management Service
      defineGetter(this, "payeeEDITCriteria", function() {
        return this._payeeEDITCriteria;
      });

      //setter method for AddressLine2 Label in the group:Add Payee Tab2
      defineSetter(this, "Tab2AddressLine2", function(val) {
        if((typeof val=='string') && (val != "")){
          this._Tab2AddressLine2=val;
        }
      });

      //getter method for AddressLine2 Label in the group:Add Payee Tab2
      defineGetter(this, "Tab2AddressLine2", function() {
        return this._Tab2AddressLine2;
      });

      //setter method for Field3 Value in the group:Payee Details - Edit NickName 
      defineSetter(this, "editField3Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._editField3Value=val;
        }
      });

      //getter method for Field3 Value in the group:Payee Details - Edit NickName 
      defineGetter(this, "editField3Value", function() {
        return this._editField3Value;
      });

      //setter method for Radio Value1 in the group:Payee Add Category
      defineSetter(this, "categoryLabel1", function(val) {
        if((typeof val=='string') && (val != "")){
          this._categoryLabel1=val;
        }
      });

      //getter method for Radio Value1 in the group:Payee Add Category
      defineGetter(this, "categoryLabel1", function() {
        return this._categoryLabel1;
      });

      //setter method for Field3 Value in the group:Payee Details - Review
      defineSetter(this, "reviewField3Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._reviewField3Value=val;
        }
      });

      //getter method for Field3 Value in the group:Payee Details - Review
      defineGetter(this, "reviewField3Value", function() {
        return this._reviewField3Value;
      });

      //setter method for Field1 Label in the group:Acknowledgement - Added Payee
      defineSetter(this, "ackField1Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._ackField1Label=val;
        }
      });

      //getter method for Field1 Label in the group:Acknowledgement - Added Payee
      defineGetter(this, "ackField1Label", function() {
        return this._ackField1Label;
      });

      //setter method for AddressLine1 Label in the group:Edit Flow - Payee
      defineSetter(this, "editFlowAddress1Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._editFlowAddress1Label=val;
        }
      });

      //getter method for AddressLine1 Label in the group:Edit Flow - Payee
      defineGetter(this, "editFlowAddress1Label", function() {
        return this._editFlowAddress1Label;
      });

      //setter method for ZipCode in the group:Context
      defineSetter(this, "zipCode", function(val) {
        if((typeof val=='string') && (val != "")){
          this._zipCode=val;
        }
      });

      //getter method for ZipCode in the group:Context
      defineGetter(this, "zipCode", function() {
        return this._zipCode;
      });

      //setter method for GetStates Operation in the group:Address Services ( State & Country Related Services)
      defineSetter(this, "getStatesOperation", function(val) {
        if((typeof val=='string') && (val != "")){
          this._getStatesOperation=val;
        }
      });

      //getter method for GetStates Operation in the group:Address Services ( State & Country Related Services)
      defineGetter(this, "getStatesOperation", function() {
        return this._getStatesOperation;
      });

      //setter method for ReviewLabel Skin in the group:Skins
      defineSetter(this, "sknReviewLabel", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknReviewLabel=val;
        }
      });

      //getter method for ReviewLabel Skin in the group:Skins
      defineGetter(this, "sknReviewLabel", function() {
        return this._sknReviewLabel;
      });

      //setter method for PrimaryButtonHoverSkin in the group:Skins
      defineSetter(this, "sknPrimaryButtonHover", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknPrimaryButtonHover=val;
        }
      });

      //getter method for PrimaryButtonHoverSkin in the group:Skins
      defineGetter(this, "sknPrimaryButtonHover", function() {
        return this._sknPrimaryButtonHover;
      });

      //setter method for Field3 Label in the group:Add Payee Tab1
      defineSetter(this, "Tab1Field3Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._Tab1Field3Label=val;
        }
      });

      //getter method for Field3 Label in the group:Add Payee Tab1
      defineGetter(this, "Tab1Field3Label", function() {
        return this._Tab1Field3Label;
      });

      //setter method for Payee Edit Service Response Identifier in the group:Payee Management Service
      defineSetter(this, "payeeEDITIdentifier", function(val) {
        if((typeof val=='string') && (val != "")){
          this._payeeEDITIdentifier=val;
        }
      });

      //getter method for Payee Edit Service Response Identifier in the group:Payee Management Service
      defineGetter(this, "payeeEDITIdentifier", function() {
        return this._payeeEDITIdentifier;
      });

      //setter method for AddressLine2 Value in the group:Add Payee Tab2
      defineSetter(this, "Tab2AddressLine2Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._Tab2AddressLine2Value=val;
        }
      });

      //getter method for AddressLine2 Value in the group:Add Payee Tab2
      defineGetter(this, "Tab2AddressLine2Value", function() {
        return this._Tab2AddressLine2Value;
      });

      //setter method for Field4 Label in the group:Payee Details - Edit NickName 
      defineSetter(this, "editField4Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._editField4Label=val;
        }
      });

      //getter method for Field4 Label in the group:Payee Details - Edit NickName 
      defineGetter(this, "editField4Label", function() {
        return this._editField4Label;
      });

      //setter method for Radio Value2 in the group:Payee Add Category
      defineSetter(this, "categoryLabel2", function(val) {
        if((typeof val=='string') && (val != "")){
          this._categoryLabel2=val;
        }
      });

      //getter method for Radio Value2 in the group:Payee Add Category
      defineGetter(this, "categoryLabel2", function() {
        return this._categoryLabel2;
      });

      //setter method for Field4 Label in the group:Payee Details - Review
      defineSetter(this, "reviewField4Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._reviewField4Label=val;
        }
      });

      //getter method for Field4 Label in the group:Payee Details - Review
      defineGetter(this, "reviewField4Label", function() {
        return this._reviewField4Label;
      });

      //setter method for Field1 Value in the group:Acknowledgement - Added Payee
      defineSetter(this, "ackField1Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._ackField1Value=val;
        }
      });

      //getter method for Field1 Value in the group:Acknowledgement - Added Payee
      defineGetter(this, "ackField1Value", function() {
        return this._ackField1Value;
      });

      //setter method for AddressLine1 Value in the group:Edit Flow - Payee
      defineSetter(this, "editFlowAddress1Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._editFlowAddress1Value=val;
        }
      });

      //getter method for AddressLine1 Value in the group:Edit Flow - Payee
      defineGetter(this, "editFlowAddress1Value", function() {
        return this._editFlowAddress1Value;
      });

      //setter method for CityName in the group:Context
      defineSetter(this, "cityName", function(val) {
        if((typeof val=='string') && (val != "")){
          this._cityName=val;
        }
      });

      //getter method for CityName in the group:Context
      defineGetter(this, "cityName", function() {
        return this._cityName;
      });

      //setter method for GetStates Criteria in the group:Address Services ( State & Country Related Services)
      defineSetter(this, "getStatesCriteria", function(val) {
        if((typeof val=='string') && (val != "")){
          this._getStatesCriteria=val;
        }
      });

      //getter method for GetStates Criteria in the group:Address Services ( State & Country Related Services)
      defineGetter(this, "getStatesCriteria", function() {
        return this._getStatesCriteria;
      });

      //setter method for ReviewValue Skin in the group:Skins
      defineSetter(this, "sknReviewValue", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknReviewValue=val;
        }
      });

      //getter method for ReviewValue Skin in the group:Skins
      defineGetter(this, "sknReviewValue", function() {
        return this._sknReviewValue;
      });

      //setter method for SecondaryButtonSkin in the group:Skins
      defineSetter(this, "sknSecondaryButton", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknSecondaryButton=val;
        }
      });

      //getter method for SecondaryButtonSkin in the group:Skins
      defineGetter(this, "sknSecondaryButton", function() {
        return this._sknSecondaryButton;
      });

      //setter method for Field3 Value in the group:Add Payee Tab1
      defineSetter(this, "Tab1Field3Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._Tab1Field3Value=val;
        }
      });

      //getter method for Field3 Value in the group:Add Payee Tab1
      defineGetter(this, "Tab1Field3Value", function() {
        return this._Tab1Field3Value;
      });

      //setter method for Country Label in the group:Add Payee Tab2
      defineSetter(this, "Tab2CountryLabel", function(val) {
        if((typeof val=='string') && (val != "")){
          this._Tab2CountryLabel=val;
        }
      });

      //getter method for Country Label in the group:Add Payee Tab2
      defineGetter(this, "Tab2CountryLabel", function() {
        return this._Tab2CountryLabel;
      });

      //setter method for Field4 Value in the group:Payee Details - Edit NickName 
      defineSetter(this, "editField4Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._editField4Value=val;
        }
      });

      //getter method for Field4 Value in the group:Payee Details - Edit NickName 
      defineGetter(this, "editField4Value", function() {
        return this._editField4Value;
      });

      //setter method for Button1 in the group:Payee Add Category
      defineSetter(this, "categoryButton1", function(val) {
        if((typeof val=='string') && (val != "")){
          this._categoryButton1=val;
        }
      });

      //getter method for Button1 in the group:Payee Add Category
      defineGetter(this, "categoryButton1", function() {
        return this._categoryButton1;
      });

      //setter method for Field4 Value in the group:Payee Details - Review
      defineSetter(this, "reviewField4Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._reviewField4Value=val;
        }
      });

      //getter method for Field4 Value in the group:Payee Details - Review
      defineGetter(this, "reviewField4Value", function() {
        return this._reviewField4Value;
      });

      //setter method for Field2 Label in the group:Acknowledgement - Added Payee
      defineSetter(this, "ackField2Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._ackField2Label=val;
        }
      });

      //getter method for Field2 Label in the group:Acknowledgement - Added Payee
      defineGetter(this, "ackField2Label", function() {
        return this._ackField2Label;
      });

      //setter method for AddressLine2 Label in the group:Edit Flow - Payee
      defineSetter(this, "editFlowAddress2Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._editFlowAddress2Label=val;
        }
      });

      //getter method for AddressLine2 Label in the group:Edit Flow - Payee
      defineGetter(this, "editFlowAddress2Label", function() {
        return this._editFlowAddress2Label;
      });

      //setter method for GetStates Identifier in the group:Address Services ( State & Country Related Services)
      defineSetter(this, "getStatesIdentifier", function(val) {
        if((typeof val=='string') && (val != "")){
          this._getStatesIdentifier=val;
        }
      });

      //getter method for GetStates Identifier in the group:Address Services ( State & Country Related Services)
      defineGetter(this, "getStatesIdentifier", function() {
        return this._getStatesIdentifier;
      });

      //setter method for AcknowledgementSuccess Skin in the group:Skins
      defineSetter(this, "sknAcknowledgementSuccess", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknAcknowledgementSuccess=val;
        }
      });

      //getter method for AcknowledgementSuccess Skin in the group:Skins
      defineGetter(this, "sknAcknowledgementSuccess", function() {
        return this._sknAcknowledgementSuccess;
      });

      //setter method for SecondaryButtonHoverSkin in the group:Skins
      defineSetter(this, "sknSecondaryButtonHover", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknSecondaryButtonHover=val;
        }
      });

      //getter method for SecondaryButtonHoverSkin in the group:Skins
      defineGetter(this, "sknSecondaryButtonHover", function() {
        return this._sknSecondaryButtonHover;
      });

      //setter method for Field4 Label in the group:Add Payee Tab1
      defineSetter(this, "Tab1Field4Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._Tab1Field4Label=val;
        }
      });

      //getter method for Field4 Label in the group:Add Payee Tab1
      defineGetter(this, "Tab1Field4Label", function() {
        return this._Tab1Field4Label;
      });

      //setter method for Field6 Label in the group:Add Payee Tab1
      defineSetter(this, "Tab1Field6Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._Tab1Field6Label=val;
        }
      });

      //getter method for Field6 Label in the group:Add Payee Tab1
      defineGetter(this, "Tab1Field6Label", function() {
        return this._Tab1Field6Label;
      });

      //setter method for Field7 Label in the group:Add Payee Tab1
      defineSetter(this, "Tab1Field7Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._Tab1Field7Label=val;
        }
      });

      //getter method for Field7 Label in the group:Add Payee Tab1
      defineGetter(this, "Tab1Field7Label", function() {
        return this._Tab1Field7Label;
      });

      //setter method for Country Value in the group:Add Payee Tab2
      defineSetter(this, "Tab2CountryValue", function(val) {
        if((typeof val=='string') && (val != "")){
          this._Tab2CountryValue=val;
        }
      });

      //getter method for Country Value in the group:Add Payee Tab2
      defineGetter(this, "Tab2CountryValue", function() {
        return this._Tab2CountryValue;
      });

      //setter method for Field5 Label in the group:Payee Details - Edit NickName 
      defineSetter(this, "editField5Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._editField5Label=val;
        }
      });

      //getter method for Field5 Label in the group:Payee Details - Edit NickName 
      defineGetter(this, "editField5Label", function() {
        return this._editField5Label;
      });

      //setter method for Button2 in the group:Payee Add Category
      defineSetter(this, "categoryButton2", function(val) {
        if((typeof val=='string') && (val != "")){
          this._categoryButton2=val;
        }
      });

      //getter method for Button2 in the group:Payee Add Category
      defineGetter(this, "categoryButton2", function() {
        return this._categoryButton2;
      });

      //setter method for Field5 Label in the group:Payee Details - Review
      defineSetter(this, "reviewField5Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._reviewField5Label=val;
        }
      });

      //getter method for Field5 Label in the group:Payee Details - Review
      defineGetter(this, "reviewField5Label", function() {
        return this._reviewField5Label;
      });

      //setter method for Field2 Value in the group:Acknowledgement - Added Payee
      defineSetter(this, "ackField2Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._ackField2Value=val;
        }
      });

      //getter method for Field2 Value in the group:Acknowledgement - Added Payee
      defineGetter(this, "ackField2Value", function() {
        return this._ackField2Value;
      });

      //setter method for Field2 Value with out address line2in the group:Acknowledgement - Added Payee
      defineSetter(this, "ackDetailsField2Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._ackDetailsField2Value=val;
        }
      });

      //getter method for Field2 Value with out address line2 in the group:Acknowledgement - Added Payee
      defineGetter(this, "ackDetailsField2Value", function() {
        return this._ackDetailsField2Value;
      });

      //setter method for AddressLine2 Value in the group:Edit Flow - Payee
      defineSetter(this, "editFlowAddress2Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._editFlowAddress2Value=val;
        }
      });

      //getter method for AddressLine2 Value in the group:Edit Flow - Payee
      defineGetter(this, "editFlowAddress2Value", function() {
        return this._editFlowAddress2Value;
      });

      //setter method for SecondaryButtonFocusSkin in the group:Skins
      defineSetter(this, "sknSecondaryButtonFocus", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknSecondaryButtonFocus=val;
        }
      });

      //getter method for SecondaryButtonFocusSkin in the group:Skins
      defineGetter(this, "sknSecondaryButtonFocus", function() {
        return this._sknSecondaryButtonFocus;
      });

      //setter method for Field4 Value in the group:Add Payee Tab1
      defineSetter(this, "Tab1Field4Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._Tab1Field4Value=val;
        }
      });

      //getter method for Field4 Value in the group:Add Payee Tab1
      defineGetter(this, "Tab1Field4Value", function() {
        return this._Tab1Field4Value;
      });

      //setter method for Field6 Value in the group:Add Payee Tab1
      defineSetter(this, "Tab1Field6Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._Tab1Field6Value=val;
        }
      });

      //getter method for Field6 Value in the group:Add Payee Tab1
      defineGetter(this, "Tab1Field6Value", function() {
        return this._Tab1Field6Value;
      });

      //setter method for Field7 Value in the group:Add Payee Tab1
      defineSetter(this, "Tab1Field7Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._Tab1Field7Value=val;
        }
      });

      //getter method for Field7 Value in the group:Add Payee Tab1
      defineGetter(this, "Tab1Field7Value", function() {
        return this._Tab1Field7Value;
      });

      //setter method for State Label in the group:Add Payee Tab2
      defineSetter(this, "Tab2StateLabel", function(val) {
        if((typeof val=='string') && (val != "")){
          this._Tab2StateLabel=val;
        }
      });

      //getter method for State Label in the group:Add Payee Tab2
      defineGetter(this, "Tab2StateLabel", function() {
        return this._Tab2StateLabel;
      });

      //setter method for Field5 Value in the group:Payee Details - Edit NickName 
      defineSetter(this, "editField5Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._editField5Value=val;
        }
      });

      //getter method for Field5 Value in the group:Payee Details - Edit NickName 
      defineGetter(this, "editField5Value", function() {
        return this._editField5Value;
      });

      //setter method for Button3 in the group:Payee Add Category
      defineSetter(this, "categoryButton3", function(val) {
        if((typeof val=='string') && (val != "")){
          this._categoryButton3=val;
        }
      });

      //getter method for Button3 in the group:Payee Add Category
      defineGetter(this, "categoryButton3", function() {
        return this._categoryButton3;
      });

      //setter method for Field5 Value in the group:Payee Details - Review
      defineSetter(this, "reviewField5Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._reviewField5Value=val;
        }
      });

      //getter method for Field5 Value in the group:Payee Details - Review
      defineGetter(this, "reviewField5Value", function() {
        return this._reviewField5Value;
      });

      //setter method for Field3 Label in the group:Acknowledgement - Added Payee
      defineSetter(this, "ackField3Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._ackField3Label=val;
        }
      });

      //getter method for Field3 Label in the group:Acknowledgement - Added Payee
      defineGetter(this, "ackField3Label", function() {
        return this._ackField3Label;
      });

      //setter method for Country Label in the group:Edit Flow - Payee
      defineSetter(this, "editFlowCountryLabel", function(val) {
        if((typeof val=='string') && (val != "")){
          this._editFlowCountryLabel=val;
        }
      });

      //getter method for Country Label in the group:Edit Flow - Payee
      defineGetter(this, "editFlowCountryLabel", function() {
        return this._editFlowCountryLabel;
      });

      //setter method for Mask Icon Skin in the group:Skins
      defineSetter(this, "maskeyeiconskin", function(val) {
        if((typeof val=='string') && (val != "")){
          this._maskeyeiconskin=val;
        }
      });

      //getter method for Mask Icon Skin in the group:Skins
      defineGetter(this, "maskeyeiconskin", function() {
        return this._maskeyeiconskin;
      });

      //setter method for Field5 Label in the group:Add Payee Tab1
      defineSetter(this, "Tab1Field5Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._Tab1Field5Label=val;
        }
      });

      //getter method for Field5 Label in the group:Add Payee Tab1
      defineGetter(this, "Tab1Field5Label", function() {
        return this._Tab1Field5Label;
      });

      //setter method for State Value in the group:Add Payee Tab2
      defineSetter(this, "Tab2StateValue", function(val) {
        if((typeof val=='string') && (val != "")){
          this._Tab2StateValue=val;
        }
      });

      //getter method for State Value in the group:Add Payee Tab2
      defineGetter(this, "Tab2StateValue", function() {
        return this._Tab2StateValue;
      });

      //setter method for Button1 in the group:Payee Details - Edit NickName 
      defineSetter(this, "editButton1", function(val) {
        if((typeof val=='string') && (val != "")){
          this._editButton1=val;
        }
      });

      //getter method for Button1 in the group:Payee Details - Edit NickName 
      defineGetter(this, "editButton1", function() {
        return this._editButton1;
      });

      //setter method for Button1 in the group:Payee Details - Review
      defineSetter(this, "reviewButton1", function(val) {
        if((typeof val=='string') && (val != "")){
          this._reviewButton1=val;
        }
      });

      //getter method for Button1 in the group:Payee Details - Review
      defineGetter(this, "reviewButton1", function() {
        return this._reviewButton1;
      });

      //setter method for Field3 Value in the group:Acknowledgement - Added Payee
      defineSetter(this, "ackField3Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._ackField3Value=val;
        }
      });

      //getter method for Field3 Value in the group:Acknowledgement - Added Payee
      defineGetter(this, "ackField3Value", function() {
        return this._ackField3Value;
      });

      //setter method for Country Value in the group:Edit Flow - Payee
      defineSetter(this, "editFlowCountryValue", function(val) {
        if((typeof val=='string') && (val != "")){
          this._editFlowCountryValue=val;
        }
      });

      //getter method for Country Value in the group:Edit Flow - Payee
      defineGetter(this, "editFlowCountryValue", function() {
        return this._editFlowCountryValue;
      });

      //setter method for Unmask Icon Skin in the group:Skins
      defineSetter(this, "unmaskeyeiconskin", function(val) {
        if((typeof val=='string') && (val != "")){
          this._unmaskeyeiconskin=val;
        }
      });

      //getter method for Unmask Icon Skin in the group:Skins
      defineGetter(this, "unmaskeyeiconskin", function() {
        return this._unmaskeyeiconskin;
      });

      //setter method for Field5 Value in the group:Add Payee Tab1
      defineSetter(this, "Tab1Field5Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._Tab1Field5Value=val;
        }
      });

      //getter method for Field5 Value in the group:Add Payee Tab1
      defineGetter(this, "Tab1Field5Value", function() {
        return this._Tab1Field5Value;
      });

      //setter method for City Label in the group:Add Payee Tab2
      defineSetter(this, "Tab2CityLabel", function(val) {
        if((typeof val=='string') && (val != "")){
          this._Tab2CityLabel=val;
        }
      });

      //getter method for City Label in the group:Add Payee Tab2
      defineGetter(this, "Tab2CityLabel", function() {
        return this._Tab2CityLabel;
      });

      //setter method for Button2 in the group:Payee Details - Edit NickName 
      defineSetter(this, "editButton2", function(val) {
        if((typeof val=='string') && (val != "")){
          this._editButton2=val;
        }
      });

      //getter method for Button2 in the group:Payee Details - Edit NickName 
      defineGetter(this, "editButton2", function() {
        return this._editButton2;
      });

      //setter method for Button2 in the group:Payee Details - Review
      defineSetter(this, "reviewButton2", function(val) {
        if((typeof val=='string') && (val != "")){
          this._reviewButton2=val;
        }
      });

      //getter method for Button2 in the group:Payee Details - Review
      defineGetter(this, "reviewButton2", function() {
        return this._reviewButton2;
      });

      //setter method for Field4 Label in the group:Acknowledgement - Added Payee
      defineSetter(this, "ackField4Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._ackField4Label=val;
        }
      });

      //getter method for Field4 Label in the group:Acknowledgement - Added Payee
      defineGetter(this, "ackField4Label", function() {
        return this._ackField4Label;
      });

      //setter method for State Label in the group:Edit Flow - Payee
      defineSetter(this, "editFlowStateLabel", function(val) {
        if((typeof val=='string') && (val != "")){
          this._editFlowStateLabel=val;
        }
      });

      //getter method for State Label in the group:Edit Flow - Payee
      defineGetter(this, "editFlowStateLabel", function() {
        return this._editFlowStateLabel;
      });

      //setter method for Account Number Skin in the group:Skins
      defineSetter(this, "accountNumberSkin", function(val) {
        if((typeof val=='string') && (val != "")){
          this._accountNumberSkin=val;
        }
      });

      //getter method for Account Number Skin in the group:Skins
      defineGetter(this, "accountNumberSkin", function() {
        return this._accountNumberSkin;
      });

      //setter method for Help Label in the group:Add Payee Tab1
      defineSetter(this, "helpText", function(val) {
        if((typeof val=='string') && (val != "")){
          this._helpText=val;
        }
      });

      //getter method for Help Label in the group:Add Payee Tab1
      defineGetter(this, "helpText", function() {
        return this._helpText;
      });

      //setter method for City Value in the group:Add Payee Tab2
      defineSetter(this, "Tab2CityValue", function(val) {
        if((typeof val=='string') && (val != "")){
          this._Tab2CityValue=val;
        }
      });

      //getter method for City Value in the group:Add Payee Tab2
      defineGetter(this, "Tab2CityValue", function() {
        return this._Tab2CityValue;
      });

      //setter method for Button3 in the group:Payee Details - Edit NickName 
      defineSetter(this, "editButton3", function(val) {
        if((typeof val=='string') && (val != "")){
          this._editButton3=val;
        }
      });

      //getter method for Button3 in the group:Payee Details - Edit NickName 
      defineGetter(this, "editButton3", function() {
        return this._editButton3;
      });

      //setter method for Button3 in the group:Payee Details - Review
      defineSetter(this, "reviewButton3", function(val) {
        if((typeof val=='string') && (val != "")){
          this._reviewButton3=val;
        }
      });

      //getter method for Button3 in the group:Payee Details - Review
      defineGetter(this, "reviewButton3", function() {
        return this._reviewButton3;
      });

      //setter method for Field4 Value in the group:Acknowledgement - Added Payee
      defineSetter(this, "ackField4Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._ackField4Value=val;
        }
      });

      //getter method for Field4 Value in the group:Acknowledgement - Added Payee
      defineGetter(this, "ackField4Value", function() {
        return this._ackField4Value;
      });

      //setter method for State Value in the group:Edit Flow - Payee
      defineSetter(this, "editFlowStateValue", function(val) {
        if((typeof val=='string') && (val != "")){
          this._editFlowStateValue=val;
        }
      });

      //getter method for State Value in the group:Edit Flow - Payee
      defineGetter(this, "editFlowStateValue", function() {
        return this._editFlowStateValue;
      });

      //setter method for Add TextboxDisabled Skin in the group:Skins
      defineSetter(this, "sknAddTextBoxDisabled", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknAddTextBoxDisabled=val;
        }
      });

      //getter method for Add TextboxDisabled Skin in the group:Skins
      defineGetter(this, "sknAddTextBoxDisabled", function() {
        return this._sknAddTextBoxDisabled;
      });

      //setter method for Help Action in the group:Add Payee Tab1
      defineSetter(this, "helpAction", function(val) {
        if((typeof val=='string') && (val != "")){
          this._helpAction=val;
        }
      });

      //getter method for Help Action in the group:Add Payee Tab1
      defineGetter(this, "helpAction", function() {
        return this._helpAction;
      });

      //setter method for ZipCode Label in the group:Add Payee Tab2
      defineSetter(this, "Tab2ZipCodeLabel", function(val) {
        if((typeof val=='string') && (val != "")){
          this._Tab2ZipCodeLabel=val;
        }
      });

      //getter method for ZipCode Label in the group:Add Payee Tab2
      defineGetter(this, "Tab2ZipCodeLabel", function() {
        return this._Tab2ZipCodeLabel;
      });

      //setter method for Field5 Label in the group:Acknowledgement - Added Payee
      defineSetter(this, "ackField5Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._ackField5Label=val;
        }
      });

      //getter method for Field5 Label in the group:Acknowledgement - Added Payee
      defineGetter(this, "ackField5Label", function() {
        return this._ackField5Label;
      });

      //setter method for City Label in the group:Edit Flow - Payee
      defineSetter(this, "editFlowCityLabel", function(val) {
        if((typeof val=='string') && (val != "")){
          this._editFlowCityLabel=val;
        }
      });

      //getter method for City Label in the group:Edit Flow - Payee
      defineGetter(this, "editFlowCityLabel", function() {
        return this._editFlowCityLabel;
      });

      //setter method for Selected Tab Skin in the group:Skins
      defineSetter(this, "sknSelectedTab", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknSelectedTab=val;
        }
      });

      //getter method for Selected Tab Skin in the group:Skins
      defineGetter(this, "sknSelectedTab", function() {
        return this._sknSelectedTab;
      });

      //setter method for Button1 in the group:Add Payee Tab1
      defineSetter(this, "Tab1Button1", function(val) {
        if((typeof val=='string') && (val != "")){
          this._Tab1Button1=val;
        }
      });

      //getter method for Button1 in the group:Add Payee Tab1
      defineGetter(this, "Tab1Button1", function() {
        return this._Tab1Button1;
      });

      //setter method for ZipCode Value in the group:Add Payee Tab2
      defineSetter(this, "Tab2ZipCodeValue", function(val) {
        if((typeof val=='string') && (val != "")){
          this._Tab2ZipCodeValue=val;
        }
      });

      //getter method for ZipCode Value in the group:Add Payee Tab2
      defineGetter(this, "Tab2ZipCodeValue", function() {
        return this._Tab2ZipCodeValue;
      });

      //setter method for Field5 Value in the group:Acknowledgement - Added Payee
      defineSetter(this, "ackField5Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._ackField5Value=val;
        }
      });

      //getter method for Field5 Value in the group:Acknowledgement - Added Payee
      defineGetter(this, "ackField5Value", function() {
        return this._ackField5Value;
      });

      //setter method for City Value in the group:Edit Flow - Payee
      defineSetter(this, "editFlowCityValue", function(val) {
        if((typeof val=='string') && (val != "")){
          this._editFlowCityValue=val;
        }
      });

      //getter method for City Value in the group:Edit Flow - Payee
      defineGetter(this, "editFlowCityValue", function() {
        return this._editFlowCityValue;
      });

      //setter method for UnSelected Tab Skin in the group:Skins
      defineSetter(this, "sknUnSelectedTab", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknUnSelectedTab=val;
        }
      });

      //getter method for UnSelected Tab Skin in the group:Skins
      defineGetter(this, "sknUnSelectedTab", function() {
        return this._sknUnSelectedTab;
      });

      //setter method for Button2 in the group:Add Payee Tab1
      defineSetter(this, "tab1Button2", function(val) {
        if((typeof val=='string') && (val != "")){
          this._tab1Button2=val;
        }
      });

      //getter method for Button2 in the group:Add Payee Tab1
      defineGetter(this, "tab1Button2", function() {
        return this._tab1Button2;
      });

      //setter method for Field8 Label in the group:Add Payee Tab2
      defineSetter(this, "Tab2Field8Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._Tab2Field8Label=val;
        }
      });

      //getter method for Field8 Label in the group:Add Payee Tab2
      defineGetter(this, "Tab2Field8Label", function() {
        return this._Tab2Field8Label;
      });

      //setter method for Button1 in the group:Acknowledgement - Added Payee
      defineSetter(this, "ackButton1", function(val) {
        if((typeof val=='string') && (val != "")){
          this._ackButton1=val;
        }
      });

      //getter method for Button1 in the group:Acknowledgement - Added Payee
      defineGetter(this, "ackButton1", function() {
        return this._ackButton1;
      });

      //setter method for ZipCode Label in the group:Edit Flow - Payee
      defineSetter(this, "editFlowZipCodeLabel", function(val) {
        if((typeof val=='string') && (val != "")){
          this._editFlowZipCodeLabel=val;
        }
      });

      //getter method for ZipCode Label in the group:Edit Flow - Payee
      defineGetter(this, "editFlowZipCodeLabel", function() {
        return this._editFlowZipCodeLabel;
      });

      //setter method for Tab Hover Skin in the group:Skins
      defineSetter(this, "sknTabHover", function(val) {
        if((typeof val=='string') && (val != "")){
          this._sknTabHover=val;
        }
      });

      //getter method for Tab Hover Skin in the group:Skins
      defineGetter(this, "sknTabHover", function() {
        return this._sknTabHover;
      });

      //setter method for Field8 Value in the group:Add Payee Tab2
      defineSetter(this, "Tab2Field8Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._Tab2Field8Value=val;
        }
      });

      //getter method for Field8 Value in the group:Add Payee Tab2
      defineGetter(this, "Tab2Field8Value", function() {
        return this._Tab2Field8Value;
      });

      //setter method for Button2 in the group:Acknowledgement - Added Payee
      defineSetter(this, "ackButton2", function(val) {
        if((typeof val=='string') && (val != "")){
          this._ackButton2=val;
        }
      });

      //getter method for Button2 in the group:Acknowledgement - Added Payee
      defineGetter(this, "ackButton2", function() {
        return this._ackButton2;
      });

      //setter method for ZipCode Value in the group:Edit Flow - Payee
      defineSetter(this, "editFlowZipCodeValue", function(val) {
        if((typeof val=='string') && (val != "")){
          this._editFlowZipCodeValue=val;
        }
      });

      //getter method for ZipCode Value in the group:Edit Flow - Payee
      defineGetter(this, "editFlowZipCodeValue", function() {
        return this._editFlowZipCodeValue;
      });

      //setter method for Field9 Label in the group:Add Payee Tab2
      defineSetter(this, "Tab2Field9Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._Tab2Field9Label=val;
        }
      });

      //getter method for Field9 Label in the group:Add Payee Tab2
      defineGetter(this, "Tab2Field9Label", function() {
        return this._Tab2Field9Label;
      });

      //setter method for Button1 in the group:Edit Flow - Payee
      defineSetter(this, "editFlowButton1", function(val) {
        if((typeof val=='string') && (val != "")){
          this._editFlowButton1=val;
        }
      });

      //getter method for Button1 in the group:Edit Flow - Payee
      defineGetter(this, "editFlowButton1", function() {
        return this._editFlowButton1;
      });

      //setter method for Field9 Value in the group:Add Payee Tab2
      defineSetter(this, "field9ValueTab2", function(val) {
        if((typeof val=='string') && (val != "")){
          this._field9ValueTab2=val;
        }
      });

      //getter method for Field9 Value in the group:Add Payee Tab2
      defineGetter(this, "field9ValueTab2", function() {
        return this._field9ValueTab2;
      });

      //setter method for Button2 in the group:Edit Flow - Payee
      defineSetter(this, "editFlowButton2", function(val) {
        if((typeof val=='string') && (val != "")){
          this._editFlowButton2=val;
        }
      });

      //getter method for Button2 in the group:Edit Flow - Payee
      defineGetter(this, "editFlowButton2", function() {
        return this._editFlowButton2;
      });

      //setter method for Checkbox Label in the group:Add Payee Tab2
      defineSetter(this, "Tab2CheckBoxLabel", function(val) {
        if((typeof val=='string') && (val != "")){
          this._Tab2CheckBoxLabel=val;
        }
      });

      //getter method for Checkbox Label in the group:Add Payee Tab2
      defineGetter(this, "Tab2CheckBoxLabel", function() {
        return this._Tab2CheckBoxLabel;
      });

      //setter method for CheckBox in the group:Add Payee Tab2
      defineSetter(this, "Tab2CheckBox", function(val) {
        if((typeof val=='string') && (val != "")){
          this._Tab2CheckBox=val;
        }
      });

      //getter method for CheckBox in the group:Add Payee Tab2
      defineGetter(this, "Tab2CheckBox", function() {
        return this._Tab2CheckBox;
      });

      //setter method for Field10 Label in the group:Add Payee Tab2
      defineSetter(this, "Tab2Field10Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._Tab2Field10Label=val;
        }
      });

      //getter method for Field10 Label in the group:Add Payee Tab2
      defineGetter(this, "Tab2Field10Label", function() {
        return this._Tab2Field10Label;
      });

      //setter method for Field11 Label in the group:Add Payee Tab2
      defineSetter(this, "Tab2Field11Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._Tab2Field11Label=val;
        }
      });

      //getter method for Field11 Label in the group:Add Payee Tab2
      defineGetter(this, "Tab2Field11Label", function() {
        return this._Tab2Field11Label;
      });

      //setter method for Field11 Value in the group:Add Payee Tab2
      defineSetter(this, "Tab2Field11Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._Tab2Field11Value=val;
        }
      });

      //getter method for Field11 Value in the group:Add Payee Tab2
      defineGetter(this, "Tab2Field11Value", function() {
        return this._Tab2Field11Value;
      });

      //setter method for Field12 Label in the group:Add Payee Tab2
      defineSetter(this, "Tab2Field12Label", function(val) {
        if((typeof val=='string') && (val != "")){
          this._Tab2Field12Label=val;
        }
      });

      //getter method for Field12 Label in the group:Add Payee Tab2
      defineGetter(this, "Tab2Field12Label", function() {
        return this._Tab2Field12Label;
      });

      //setter method for Field12 Value in the group:Add Payee Tab2
      defineSetter(this, "Tab2Field12Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._Tab2Field12Value=val;
        }
      });

      //getter method for Field12 Value in the group:Add Payee Tab2
      defineGetter(this, "Tab2Field12Value", function() {
        return this._Tab2Field12Value;
      });

      //setter method for Field10 Value in the group:Add Payee Tab2
      defineSetter(this, "Tab2Field10Value", function(val) {
        if((typeof val=='string') && (val != "")){
          this._Tab2Field10Value=val;
        }
      });

      //getter method for Field10 Value in the group:Add Payee Tab2
      defineGetter(this, "Tab2Field10Value", function() {
        return this._Tab2Field10Value;
      });

      //setter method for Button1 in the group:Add Payee Tab2
      defineSetter(this, "Tab2Button1", function(val) {
        if((typeof val=='string') && (val != "")){
          this._Tab2Button1=val;
        }
      });

      //getter method for Button1 in the group:Add Payee Tab2
      defineGetter(this, "Tab2Button1", function() {
        return this._Tab2Button1;
      });

      //setter method for Button2 in the group:Add Payee Tab2
      defineSetter(this, "tab2Button2", function(val) {
        if((typeof val=='string') && (val != "")){
          this._tab2Button2=val;
        }
      });

      //getter method for Button2 in the group:Add Payee Tab2
      defineGetter(this, "tab2Button2", function() {
        return this._tab2Button2;
      });

      defineSetter(this, "sknAddTextBoxError", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._sknAddTextBoxError=val;
        }
      });
      defineGetter(this, "sknAddTextBoxError", function() {
        return this._sknAddTextBoxError;
      });

      defineSetter(this, "suggestionsObjectService", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._suggestionsObjectService=val;
        }
      });
      defineGetter(this, "suggestionsObjectService", function() {
        return this._suggestionsObjectService;
      });

      defineSetter(this, "suggestionsObject", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._suggestionsObject=val;
        }
      });
      defineGetter(this, "suggestionsObject", function() {
        return this._suggestionsObject;
      });

      defineSetter(this, "getAddressSuggestionsOperation", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._getAddressSuggestionsOperation=val;
        }
      });
      defineGetter(this, "getAddressSuggestionsOperation", function() {
        return this._getAddressSuggestionsOperation;
      });

      defineSetter(this, "getAddressSuggestionCritera", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._getAddressSuggestionCritera=val;
        }
      });
      defineGetter(this, "getAddressSuggestionCritera", function() {
        return this._getAddressSuggestionCritera;
      });

      defineSetter(this, "getAddressSuggestionIdentifier", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._getAddressSuggestionIdentifier=val;
        }
      });
      defineGetter(this, "getAddressSuggestionIdentifier", function() {
        return this._getAddressSuggestionIdentifier;
      });

      defineSetter(this, "getFormattedAddressOperation", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._getFormattedAddressOperation=val;
        }
      });
      defineGetter(this, "getFormattedAddressOperation", function() {
        return this._getFormattedAddressOperation;
      });

      defineSetter(this, "getFormattedAddressCriteria", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._getFormattedAddressCriteria=val;
        }
      });
      defineGetter(this, "getFormattedAddressCriteria", function() {
        return this._getFormattedAddressCriteria;
      });

      defineSetter(this, "getFormattedAddressIdentifier", function(val) {
        if((typeof val==='string') && (val !== "")){
          this._getFormattedAddressIdentifier=val;
        }
      });
      defineGetter(this, "getFormattedAddressIdentifier", function() {
        return this._getFormattedAddressIdentifier;
      });

      defineSetter(this, "contractObjectService", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._contractObjectService = val;
        }
      });
      defineGetter(this, "contractObjectService", function() {
        return this._contractObjectService;
      });

      defineSetter(this, "contractObject", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._contractObject = val;
        }
      });
      defineGetter(this, "contractObject", function() {
        return this._contractObject;
      });

      defineSetter(this, "contractOperation", function(val) {
        if((typeof val === 'string') && (val !== "")){
          this._contractOperation = val;
        }
      });
      defineGetter(this, "contractOperation", function() {
        return this._contractOperation;
      });
      
      defineSetter(this, "isCodeVisible", function(val) {
        if((typeof val=='boolean')){
          this._isCodeVisible=val;
        }
      });

      defineGetter(this, "isCodeVisible", function() {
        return this._isCodeVisible;
      });
      
      //setter method for Country Object Service Properties in the group:Country Service
      defineSetter(this, "countryObjectServiceName", function(val) {
        if((typeof val=='string') && (val != "")){
          this._countryObjectServiceName=val;
        }
      });

      //getter method for Country Object Service Properties in the group:Country Code
      defineGetter(this, "countryObjectServiceName", function() {
        return this._countryObjectServiceName;
      });
      
      //setter method for Country Object Name Properties in the group:Country Service
      defineSetter(this, "countryObjectName", function(val) {
        if((typeof val=='string') && (val != "")){
          this._countryObjectName=val;
        }
      });

      //getter method for Country Object Name Properties in the group:Country Code
      defineGetter(this, "countryObjectName", function() {
        return this._countryObjectName;
      });

      //setter method for Country Operation Name Properties in the group:Country Service
      defineSetter(this, "countryOperationName", function(val) {
        if((typeof val=='string') && (val != "")){
          this._countryOperationName=val;
        }
      });

      //getter method for Country Operation Name Properties in the group:Country Code
      defineGetter(this, "countryOperationName", function() {
        return this._countryOperationName;
      });

      //setter method for Country Criteria Properties in the group:Country Service
      defineSetter(this, "countryCriteria", function(val) {
        if((typeof val=='string') && (val != "")){
          this._countryCriteria=val;
        }
      });

      //getter method for Country criteria Properties in the group:Country Code
      defineGetter(this, "countryCriteria", function() {
        return this._countryCriteria;
      });

      //setter method for Country Criteria Properties in the group:Country Service
      defineSetter(this, "countryIdentifier", function(val) {
        if((typeof val=='string') && (val != "")){
          this._countryIdentifier=val;
        }
      });

      //getter method for Country criteria Properties in the group:Country Code
      defineGetter(this, "countryIdentifier", function() {
        return this._countryIdentifier;
      });
    },

    /**
     * @api : preShow
     * Reponsible to retain the data for custom properties for multiple entries into the component
     * Invoke the DAO layer to collect information from the service.
     * @return : NA
     */
    lblsetActive: function(){
     this.view.lblBlockTitle.setActive(true);
     
    },
    preShow: function() {
      var scope = this;
      
      this.view.flxPopup.onKeyPress = this.onKeyPressCallBack;
	  this.view.tbx1Tab1.onKeyPress=this.onKeyPressCallBack1;
      this.view.tbx2Tab1.onKeyPress=this.onKeyPressCallBack2;
      this.view.btnEnterPayeeInfo.onKeyPress = this.onKeyPressCallBack3;
      if(!firstTimeLoad){
        this.initActions();
        firstTimeLoad = true;
      }     
     if(this.parserUtilsManager.context.flowType === "ADD"){
        this.screen1BtnRight2OnClick();
        this.setContentVisiblityBasedOnTabName("btnSearchPayee");
      }
      else
      {
	     this.componentContext = this.parserUtilsManager.context;
         this.beneficiaryData["selectedflowType"] === "EDIT";
      }
      var entitlementJson = this.constructEntitlmentJson();
      this.EntitlementUtils.setEntitlements(entitlementJson);
      this.parserUtilsManager.setBreakPointConfig(JSON.parse(this._BREAKPTS));
      this.parserUtilsManager.setFlowTypeConfig(JSON.parse(this._FLOWTYPES));
      this.FlowType = this.parserUtilsManager.getParsedValue(this._selectedflowType);      
      this.resetComponentData();
      this.resetValidationFields();                 
      this.view.lblRememberMeIcon.text = this.CHECBOX_UNSELECTED;
      this.view.lblRememberMeIcon.skin = this.CHECKBOX_UNSELECTED_SKIN;
      this.view.lblField8Tab2.isVisible = false;
      this.view.tbx8Tab2.isVisible = false;
      this.view.flxSegment.isVisible = false;
      this.view.btnNewTransfer.onClick = function() {
        scope.hideRightFlx();
        if (scope.parserUtilsManager.context.flowType === "ADD") {
          scope.navigateToViewAllPayees(scope.componentContext);
        } else if (scope.parserUtilsManager.context.flowType === "EDIT") {
          scope.navigateToManagePayees(scope.componentContext);
        }
      }
      this.view.btnBypass.onClick=function() {
        if(kony.application.getCurrentForm().id==="frmAddPayee1"){
      kony.application.getCurrentForm().lblMyRegisteredPayees.setActive(true);
        }
          }; 
    this.view.flxClick.setVisibility(false);
         
    },
    onKeyPressCallBack1: function(eventObject, eventPayload) {
            if (eventPayload.keyCode === 9 && !eventPayload.shiftKey) {
                eventPayload.preventDefault();
                if(this.view.flxField1List.isVisible){
                this.view.segField1Values.setActive(0, -1, "flxNewPayees");
                }
                else{
                    this.view.tbx2Tab1.setActive(true);
                    
                }
            }
        },
        onKeyPressCallBack2: function(eventObject, eventPayload) {
            if (eventPayload.keyCode === 9 && eventPayload.shiftKey) {
                this.tbxFlag = true;
            }
        },
        onKeyPressCallBack3: function(eventObject, eventPayload) {
            if (eventPayload.keyCode === 9 && !eventPayload.shiftKey) {
                this.tbxFlag = true;
            }
        },
        SetTbxActive: function() {
            this.view.tbx1Tab1.setActive(true);
            this.view.flxField1List.isVisible = false;
            this.tbxFlag = true;
        },
    SetTbx2Active:function(){
        this.view.tbx2Tab1.setActive(true);
        this.view.flxField1List.isVisible = false;
    },
    
    
      onKeyPressCallBack: function(eventObject, eventPayload) {
       
            if (eventPayload.keyCode === 27) {
                var frm = kony.application.getCurrentForm();
                if (frm.flxPopup.isVisible === true) {
                    frm.flxClosePopup.isModalContainer = false;
                    //frm.flxPopup.isVisible = false;
                    //this.view.flxDialogs.setVisibility(false);
                    frm.remove(frm.flxPopup);
                    this.view.editDetailsBtnRight3.setFocus(true);
                }
            }
        },
    /**
     * @api : getEditBillerScreen
     * Reponsible to show edit screen
     * @return : NA
     */
	getEditBillerScreen : function(data) {
      this.view.flxEditPayee.isVisible = true;
      this.view.flxContainer.isVisible = false;
    },
    /**
     * @api : toggleCheckBox
     * Reponsible to change UI with respective to checkbox
     * @return : NA
     */
    toggleCheckBox : function() {    
      var isSelected = this.isRememberMe(); 
      const breakPoint = kony.application.getCurrentBreakpoint();
      this.view.lblRememberMeIcon.text = isSelected ? this.CHECBOX_UNSELECTED : this.CHECBOX_SELECTED;
      this.view.lblRememberMeIcon.skin = isSelected ?  this.CHECKBOX_UNSELECTED_SKIN : this.CHECKBOX_SELECTED_SKIN;
      this.minFillValidation();
    if(isSelected){
                this.view.flexcheckuncheck.accessibilityConfig = {
                "a11yARIA": {
                    "role": "checkbox",
                    "aria-checked": false,
                    "aria-labelledby": "lblRememberMe",
                    "tabindex":0
                }
            };
                } else {
                    
                    this.view.flexcheckuncheck.accessibilityConfig = {
                        "a11yARIA": {
                            "role": "checkbox",
                            "aria-checked": true,
                            "aria-labelledby": "lblRememberMe",
                            "tabindex":0
                        }
                    };
                }
      if (isSelected) {
        this.view.tbx6Tab2.setEnabled(true);
        this.view.tbx7Tab2.setEnabled(true);
        this.view.tbx6Tab2.skin = this.addPayeeUtility.breakPointParser(this._sknAddTextBoxEnabled, breakPoint);
        this.view.tbx7Tab2.skin = this.addPayeeUtility.breakPointParser(this._sknAddTextBoxEnabled, breakPoint);
        this.view.tbx6Tab2.placeholderSkin = this.addPayeeUtility.breakPointParser(this._sknAddTextBoxPlaceHolder, breakPoint);
        this.view.tbx7Tab2.placeholderSkin = this.addPayeeUtility.breakPointParser(this._sknAddTextBoxPlaceHolder, breakPoint);
      } else {
        this.view.tbx6Tab2.setEnabled(false);
        this.view.tbx7Tab2.setEnabled(false);
        this.view.tbx6Tab2.skin = this.addPayeeUtility.breakPointParser(this._sknAddTextBoxDisabled, breakPoint);
        this.view.tbx7Tab2.skin = this.addPayeeUtility.breakPointParser(this._sknAddTextBoxDisabled, breakPoint);
        this.view.tbx6Tab2.placeholderSkin = "";
        this.view.tbx7Tab2.placeholderSkin = "";
      }
      this.view.flexcheckuncheck.setActive(true);
    },
	/**
     * @api : isRememberMe
     * Reponsible to get checkbox.
     * @return : NA
     */
    isRememberMe: function(){      
      return this.view.lblRememberMeIcon.text === this.CHECBOX_SELECTED ;
    },
	/**
     * @api : initialContentVisibility
     * Reponsible to show the initial UI for the component.
     * @return : NA
     */
    initialContentVisibility: function() {
      if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(this.getParsedValue(this._payeeId))){
        this.clearEditValidationErrors();
        this.populateEditScreen();
        this.showScreen(this.screens[5]);
        if(this.screens[5]){
            this.view.title= kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement");
            this.view.lblBlockTitle.text = kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement");
        }
        
        if(this.serviceCounter !== 3){
          if(this.eventTriggered !== "BP"){
            this.invokeAddressCountryServiceMasterData();
            this.invokeAddressStateServiceMasterData();
            this.invokeCountryCodeServiceMasterData();
          }
        }
        return;
      }
      this.showScreen(this.screens[0]);
      this.view.btnSearchPayee.isVisible = false;
      this.view.btnEnterPayeeInfo.isVisible = false;
      if(this._tab1Visibility){
        this.setScreen1Tab1Data();
      }
      else{
        this.setScreen1Tab2Data();
      }
      this.view.btnSearchPayee.isVisible = this._tab1Visibility;
      this.view.btnEnterPayeeInfo.isVisible = this._tab2Visibility;
      if(this._tab2Visibility){
        if(this.serviceCounter !== 3){
          this.invokeAddressCountryServiceMasterData();
          this.invokeAddressStateServiceMasterData();
          this.invokeCountryCodeServiceMasterData();
        }
      }
    },
    /**
     * @api : populateEditScreen
     * Reponsible to show the initial UI for the Edit screen.
     * @return : NA
     */
    populateEditScreen: function() {
      this.view.lblBlockTitle.text = this.getLabelText(this._editblockTitle);
       //this.view.lblBlockTitle.setActive(true);
      this.view.lblSectionTitle.text = this.getLabelText(this._sectionTitle);
      this.view.lblName.text = this.getLabelText(this._editFlowField1Label);
      this.view.lblAddressLine1.text = this.getLabelText(this._editFlowField2Label);
      this.view.lblEditField4.text = this.getLabelText(this._editFlowField4Label);
      this.view.lblEditField5.text = this.getLabelText(this._editFlowField5Label);
      this.view.lblDetail1.text = this.getLabelText(this._editFlowAddress1Label);
      this.view.lblDetail2.text = this.getLabelText(this._editFlowAddress2Label);
      this.view.lblCountry.text = this.getLabelText(this._editFlowCountryLabel);
      this.view.lblState.text = this.getLabelText(this._editFlowStateLabel);
      this.view.lblCity.text = this.getLabelText(this._editFlowCityLabel);
      this.view.lblZipCode.text = this.getLabelText(this._editFlowZipCodeLabel);

      this.populateEditTextInputs();
      this.populateButtonTexts();
      this.view.btnSave.setEnabled(true);
      this.view.btnSave.skin = "sknBtnNormalSSPFFFFFF4vs";
      if (kony.application.getCurrentBreakpoint() === 640) {
        this.view.lblHeader2.setActive(true);
      } else {
        this.view.lblBlockTitle.setActive(true);
      }
      this.view.forceLayout();
    },
     /**
     * @api : populateEditTextInputs
     * Reponsible to populate text fields from edit screen.
     * @return : NA
     */
    populateEditTextInputs: function() {
      var tbx1JSON = this.getParsedValue(this._editFlowField1Value);
      if(tbx1JSON) {
        this.mapTextBoxValueToContext(tbx1JSON, "tbxName");
        this.setTextBoxPlaceHolder(tbx1JSON, "tbxName");
        this.setTextBoxInputModeAndMasking(tbx1JSON, "tbxName");
        this.setTextBoxInfoIcon(tbx1JSON, "imgInfoName", "lblInfoHeader1Tab2", "lblInfoText1Tab2");
        this.setTextBoxToolTip(tbx1JSON, "tbxName");
        this.enableOrDisableTextInput(tbx1JSON, "tbxName");
        this.populateTextIntoTextInput(tbx1JSON, "tbxName");
        this.updateContext("tbxName",this.view.tbxName.text)
      }
      else {
        this.toggleVisibilty("flxName", "tbxName");
      }
      var tbx2JSON = this.getParsedValue(this._editFlowField2Value);
      if(tbx2JSON) {
        this.mapTextBoxValueToContext(tbx2JSON, "tbxAddress");
        this.setTextBoxPlaceHolder(tbx2JSON, "tbxAddress");
        this.setTextBoxInputModeAndMasking(tbx2JSON, "tbxAddress");
        this.setTextBoxInfoIcon(tbx2JSON, "imgInfoAddress", "lblInfoHeader2Tab2", "lblInfoText2Tab2");
        this.setTextBoxToolTip(tbx2JSON, "tbxAddress");
        this.enableOrDisableTextInput(tbx2JSON, "tbxAddress");
        this.populateTextIntoTextInput(tbx2JSON, "tbxAddress");
        this.updateContext("tbxAddress",this.view.tbxAddress.text)
      }
      else {
        this.toggleVisibilty("flxAddress", "tbxAddress");
      }
      var tbx4JSON = this.getParsedValue(this._editFlowField4Value);
      if(tbx4JSON) {
        this.mapTextBoxValueToContext(tbx4JSON, "tbxEditValue4");
        this.setTextBoxPlaceHolder(tbx4JSON, "tbxEditValue4");
        this.setTextBoxInputModeAndMasking(tbx4JSON, "tbxEditValue4");
        this.setTextBoxInfoIcon(tbx4JSON, "imgEditField4", "lblInfoHeader3Tab2", "lblInfoText3Tab2");
        this.setTextBoxToolTip(tbx4JSON, "tbxEditValue4");
        this.enableOrDisableTextInput(tbx4JSON, "tbxEditValue4");
        this.populateTextIntoTextInput(tbx4JSON, "tbxEditValue4");
      }
      else {
        this.toggleVisibilty("flxEditField4", "tbxEditValue4");
      }
      var tbx5JSON = this.getParsedValue(this._editFlowField5Value);
      if(tbx5JSON) {
        this.mapTextBoxValueToContext(tbx5JSON, "tbxEditValue5");
        this.setTextBoxPlaceHolder(tbx5JSON, "tbxEditValue5");
        this.setTextBoxInputModeAndMasking(tbx5JSON, "tbxEditValue5");
        this.setTextBoxInfoIcon(tbx5JSON, "imgEditField5", "lblInfoHeader3Tab2", "lblInfoText3Tab2");
        this.setTextBoxToolTip(tbx5JSON, "tbxEditValue5");
        this.enableOrDisableTextInput(tbx5JSON, "tbxEditValue5");
        this.populateTextIntoTextInput(tbx5JSON, "tbxEditValue5");
      }
      else {
        this.toggleVisibilty("flxEditField5", "tbxEditValue5");
      }
      var address1JSON = this.getParsedValue(this._editFlowAddress1Value);
      if(address1JSON) {
        this.mapTextBoxValueToContext(address1JSON, "tbxDetail1");
        this.setTextBoxPlaceHolder(address1JSON, "tbxDetail1");
        this.setTextBoxInputModeAndMasking(address1JSON, "tbxDetail1");
        this.setTextBoxInfoIcon(address1JSON, "imgInfoDetail1", "lblInfoHeader3Tab2", "lblInfoText3Tab2");
        this.setTextBoxToolTip(address1JSON, "tbxDetail1");
        this.enableOrDisableTextInput(address1JSON, "tbxDetail1");
        this.populateTextIntoTextInput(address1JSON, "tbxDetail1");
        this.updateContext("tbxDetail1",this.view.tbxDetail1.text);
      }
      else {
        this.toggleVisibilty("flxEditDetail1", "tbxDetail1");
      }
      var address2JSON = this.getParsedValue(this._editFlowAddress2Value);
      if(address2JSON) {
        this.mapTextBoxValueToContext(address2JSON, "tbxDetail2");
        this.setTextBoxPlaceHolder(address2JSON, "tbxDetail2");
        this.setTextBoxInputModeAndMasking(address2JSON, "tbxDetail2");
        this.setTextBoxInfoIcon(address2JSON, "imgInfoDetail2", "lblInfoHeader3Tab2", "lblInfoText3Tab2");
        this.setTextBoxToolTip(address2JSON, "tbxDetail2");
        this.enableOrDisableTextInput(address2JSON, "tbxDetail2");
        this.populateTextIntoTextInput(address2JSON, "tbxDetail2");
        this.updateContext("tbxDetail2",this.view.tbxDetail2.text);
      }
      else {
        this.toggleVisibilty("flxEditDetail2", "tbxDetail2");
      }
      var lbxCountryJSON = this.getParsedValue(this._editFlowCountryValue);
      if(lbxCountryJSON) {
        this.mapTextBoxValueToContext(lbxCountryJSON, "listCountry");
		if(!kony.sdk.isNullOrUndefined(this.view.listCountry.selectedKeyValue))
			this.updateContext("country",this.view.listCountry.selectedKeyValue[1]);
      }
      else {
        this.toggleVisibilty("flxCountry");
      }
      var lbxStateJSON = this.getParsedValue(this._editFlowStateValue);
      if(lbxStateJSON) {
        this.mapTextBoxValueToContext(lbxStateJSON, "listState");
		if(!kony.sdk.isNullOrUndefined(this.view.listState.selectedKeyValue))
			this.updateContext("state",this.view.listState.selectedKeyValue[1]);
      }
      else {
        this.toggleVisibilty("flxState");
      }
      var tbxCityJSON = this.getParsedValue(this._editFlowCityValue);
      if(tbxCityJSON) {
        this.mapTextBoxValueToContext(tbxCityJSON, "tbxCity");
        this.setTextBoxPlaceHolder(tbxCityJSON, "tbxCity");
        this.setTextBoxInputModeAndMasking(tbxCityJSON, "tbxCity");
        this.setTextBoxInfoIcon(tbxCityJSON, "imgCity", "lblInfoHeader5Tab2", "lblInfoText5Tab2");
        this.setTextBoxToolTip(tbxCityJSON, "tbxCity");
        this.populateTextIntoTextInput(tbxCityJSON, "tbxCity");
        this.updateContext("tbxCity",this.view.tbxCity.text);
      }
      else {
        this.toggleVisibilty("flxCity");
      }
      var tbxZipCodeJSON = this.getParsedValue(this._editFlowZipCodeValue);
      if(tbxZipCodeJSON) {
        this.mapTextBoxValueToContext(tbxZipCodeJSON, "tbxZipCode");
        this.setTextBoxPlaceHolder(tbxZipCodeJSON, "tbxZipCode");
        this.setTextBoxInputModeAndMasking(tbxZipCodeJSON, "tbxZipCode");
        this.setTextBoxInfoIcon(tbxZipCodeJSON, "imgInfoZipCode", "lblInfoHeaderZipTab2", "lblInfoTextZipTab2");
        this.setTextBoxToolTip(tbxZipCodeJSON, "tbxZipCode");
        this.populateTextIntoTextInput(tbxZipCodeJSON, "tbxZipCode");
        this.updateContext("tbxZipCode",this.view.tbxZipCode.text);
      }
      else {
        this.toggleVisibilty("flxZipCode");
      }
      this.setEditAdditionalFieldBasedOnBillerCategory();
    },
    /**
         * @api : highlightSelectedCountry
         * Reponsible to highlight the selected country from drop down
         * @Params : "srcWidget" used to set the values.
         * @return : NA
         */
    highlightSelectedCountry: function(srcWidget) {
      var contractJSON = this.getParsedValue(this._editFlowCountryValue);
      if (!this.addPayeeUtility.isNullOrUndefinedOrEmpty(contractJSON)) {
        var contractJSONValue = this.getParsedValue(contractJSON);
        var contextValue = this.getParsedValue(contractJSONValue.mapping);
        if (!this.addPayeeUtility.isNullOrUndefinedOrEmpty(this.countriesMasterData)) {
          var selectedCountryData = this.countriesMasterData.filter(function(country) {
            return country[1] == contextValue; // Later after service enhancement needs to be matched with Country_id
          });
        }
        if(selectedCountryData.length !== 0) {
          this.view[srcWidget].selectedKey = selectedCountryData[0][0];
        } else {
          var countrySelected = this.countriesMasterData[0][0];
          this.view[srcWidget].selectedKey = countrySelected;
        }
      }
    },
    /**
         * @api : highlightSelectedState
         * Reponsible to highlight the selected state from drop down
         * @Params : "srcWidget" used to set the values.
         * @return : NA
         */
    highlightSelectedState: function(srcWidget) {
      var contractJSON = this.getParsedValue(this._editFlowStateValue);
      if (!this.addPayeeUtility.isNullOrUndefinedOrEmpty(contractJSON)) {
        var contractJSONValue = this.getParsedValue(contractJSON);
        var contextValue = this.getParsedValue(contractJSONValue.mapping);
        if (!this.addPayeeUtility.isNullOrUndefinedOrEmpty(this.statesMasterData)) {
          var selectedStateData = this.statesMasterData.filter(function(state) {
            return state[1] == contextValue; // Later after service enhancement needs to be matched with Region_id
          });
        }
        if(selectedStateData.length !== 0) {
          this.view[srcWidget].selectedKey = selectedStateData[0][0];
        } else {
          var stateSelected = this.statesMasterData[0][0];
          this.view[srcWidget].selectedKey = stateSelected;
        }
      }
    },
	/**
     * @api : populateTextIntoTextInput
     * Used to populate text into text box.
	 * @Params : "contractJSON" contains text to be populate.
	 * @Params : "srcWidget" widget in which text will be populated.
     * @return : NA
     */
    populateTextIntoTextInput: function(contractJSON,srcWidget){
      if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(contractJSON)) {
        var contractJSONValue = this.getParsedValue
        (contractJSON);
        var contextValue = this.getParsedValue(contractJSONValue.mapping);
        this.view[srcWidget].text = contextValue;
      }
    },
	/**
     * @api : enableOrDisableTextInput
     * Used to enable or disable a text box
	 * @Params : "contractJSON" contains valueenable or disable.
	 * @Params : "srcWidget" widget which will be enabled or disabled.
     * @return : NA
     */
    enableOrDisableTextInput(contractJSON,srcWidget){
      if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(contractJSON)) {
        var enabledOrDisabled = this.getParsedValue
        (contractJSON);
        var value = enabledOrDisabled.isEnabled;
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(value)){
          this.view[srcWidget].setEnabled(value);
        }
        else{
          this.view[srcWidget].setEnabled(true);
        }
      }
    },
	/**
     * @api : toggleVisibilty
     * Used to toggle visibility of widgets.
	 * @return : NA
     */
    toggleVisibilty: function(){
      if(this.eventTriggered !== "BP"){
        var args = arguments;
        var scope = this;
        args = [...args];
        args.forEach(function(widget){
            scope.view[widget].isVisible = false;
        });
      }
    },
	/**
     * @api : invokeAddressCountryServiceMasterData
     * Responsible to invoke fetch countries service call.
	 * @return : NA
     */
    invokeAddressCountryServiceMasterData: function() {
      var self = this;
      var objSvcName = this.getParsedValue(this._addressObjectService);
      var objName = this.getParsedValue(this._countryObject);
      var operationName = this.getParsedValue(this._getCountriesOperation);
      var criteria = this.getCriteria(this._getCountriesCriteria);
      var identifier = this.getParsedValue(this._getCountriesIdentifier);
      this.addPayeeDAO.fetchCountriesList
      (objSvcName,objName,operationName,criteria,this.onSuccessFetchCountriesList,identifier,self.onError);
    },
	/**
     * @api : invokeAddressStateServiceMasterData
     * Responsible to invoke fetch states service call.
	 * @return : NA
     */
    invokeAddressStateServiceMasterData: function() {
      var self = this;
      var objSvcName = this.getParsedValue(this._addressObjectService);
      var objName = this.getParsedValue(this._statesObject);
      var operationName = this.getParsedValue(this._getStatesOperation);
      var criteria = this.getCriteria(this._getStatesCriteria);
      var identifier = this.getParsedValue(this._getStatesIdentifier);
      this.addPayeeDAO.fetchStatesList
      (objSvcName,objName,operationName,criteria,this.onSuccessFetchStatesList,identifier,self.onError);
    },
    /**
     * @api : invokeCountryCodeServiceMasterData
     * Responsible to invoke fetch country codes service call.
	 * @return : NA
     */
    invokeCountryCodeServiceMasterData: function() {
      try {
        var self = this;
        var objSvcName = this.getParsedValue(this._countryObjectServiceName);
        var objName = this.getParsedValue(this._countryObjectName);
        var operationName = this.getParsedValue(this._countryOperationName);
        var criteria = this.getParsedValue(this._countryCriteria);
        var identifier = this.getParsedValue(this._countryIdentifier);
        this.addPayeeDAO.fetchCountriesList(objSvcName,objName,operationName,criteria,this.onSuccessFetchCountryCodeList,identifier,self.onError);
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in getCountryCode method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        self.onError(errObj);
      }
    },
    /**
     * @api : onSuccessFetchCountryCodeList
     * Used to get success response of country code service call.
	 * @Params : "response" contains response of the service.
	 * @Params : "unicode" identifier to store service response.
     * @return : NA
     */
    onSuccessFetchCountryCodeList: function(response, unicode) {
      this._countryCode = response;
      this.serviceCounter++;
      if(this.serviceCounter == 3)
        this.setCountryAndStateMasterData();
    },
    /**
     * @api : onSuccessFetchCountriesList
     * Used to get success response of country List service call.
	 * @Params : "response" contains response of the service.
	 * @Params : "unicode" identifier to store service response.
     * @return : NA
     */
    onSuccessFetchCountriesList: function(response, unicode) {
      this._countriesList = response;
      this.serviceCounter++;
      if(this.serviceCounter == 3)
        this.setCountryAndStateMasterData();    
    },
	/**
     * @api : setCountryAndStateMasterData
     * Used to set the master data for countries and states.
	 * @return : NA
     */
    setCountryAndStateMasterData: function() {
      var countryWidget = "";
      var stateWidget = "";
      var countryCodeWidget = "";
      if(this.view.flxEditPayee.isVisible){
        countryWidget = "listCountry";
        stateWidget = "listState";
        countryCodeWidget = "listCode";
      }
      else{
        countryWidget = "lbxCountry";
        stateWidget = "lbxStateValue";
        countryCodeWidget = "lbxCode";
      }

      kony.application.dismissLoadingScreen();
      if(!this.view[countryWidget].isVisible){
        return;
      }
      this.serviceCounter = 0;
      var countryNew = [];
      countryNew.push(["0", kony.i18n.getLocalizedString("i18n.ProfileManagement.selectCountry")]);
      this._countriesList.map(function(country) {
        return countryNew.push([country.id, country.Name]);
      });
      var stateNew = [];
      stateNew.push(["1", kony.i18n.getLocalizedString("i18n.ProfileManagement.selectState")]);
      this._statesList.map(function(state) {
        return stateNew.push([state.id, state.Name, state.Country_id]);
      });
      
       var countryCodeNew = [];
      //this.view.lblCode.text = "Country Code";
      //countryCodeNew.push(["0", "Country Code"]);
      this._countryCode.map(function(codes) {
        var code = codes.Name + "("+ codes.phoneCountryCode +")";
        return countryCodeNew.push({"lblCountryCode": code, "lblKeyCode" : codes.phoneCountryCode});
      });
	  var segCountry = this.view.segCountryCode;
            segCountry.widgetDataMap = {
                "flxCountryCode": "flxCountryCode",
                "lblCountryCode": "lblCountryCode",
                "lblKeyCode" : "lblKeyCode"
            };
                    segCountry.setData(countryCodeNew);
            //});

      
     
      
      this.view[countryWidget].masterData = countryNew;
      this.countriesMasterData = countryNew;
      //this.view[countryCodeWidget].masterData = countryCodeNew;
      //this.countryCodesMasterData = countryCodeNew;
      var countrySelected = countryNew[0][0];
      var stateSelected = stateNew[0][0];
      var codeSelected = countryCodeNew[0][0];
      this.view[stateWidget].masterData = stateNew;
      this.statesMasterData = stateNew;
      this.countryMasterData = countryNew;
      this.countryCodesMasterData = countryCodeNew;
      if(countryWidget == "lbxCountry"){
        this.view[countryWidget].selectedKey = countrySelected;  
      }
      else{
        this.highlightSelectedCountry(countryWidget);  
      }
      var countryId = this.view[countryWidget].selectedKeyValue[0];
      if (countryId == "0") {
        this.view[stateWidget].setEnabled(false);
      }
      if(stateWidget == "listState"){
        var data = this.getSpecifiedStates(countryId);
        this.statesMasterData = data.states;
        this.view[stateWidget].masterData = this.statesMasterData;
        this.highlightSelectedState(stateWidget);
      }
      
//       this.view[countryWidget].selectedKey = codeSelected;
      if(countryCodeWidget == "listCode"){
        if (!this.addPayeeUtility.isNullOrUndefinedOrEmpty(codeSelected))
        this.view[countryCodeWidget].selectedKey = codeSelected;
      }
      var self = this;
      /*this.view[countryCodeWidget].onSelection = function() {
        var codeId = self.view[countryCodeWidget].selectedKey[0];
        self.view[countryCodeWidget].selectedKey = codeId;    
      };*/
      
      this.view[countryWidget].onSelection = function() {
        var data = [];
        var countryId = self.view[countryWidget].selectedKeyValue[0];
        if (countryId == "0") {
          self.view[stateWidget].masterData = stateNew;
          self.view[stateWidget].selectedKey = stateSelected;
          self.view[countryWidget].selectedKey = countryId;
          self.view[stateWidget].setEnabled(false);
        } else {
          self.view[stateWidget].setEnabled(true);
          self.view[countryWidget].selectedKey = countryId;
          if(stateWidget == "listState"){
            self.updateContext("listCountry",self.view[countryWidget].selectedKeyValue[1]);
          }
          else{
            self.updateContext("country",self.view[countryWidget].selectedKeyValue[1]);
          }
          data = self.getSpecifiedStates(countryId);
          self.view[stateWidget].masterData = data.states;
          self.view[stateWidget].selectedKey = data.stateSelected;
          var stateId = self.view[stateWidget].selectedKeyValue[0];
          if (stateId == "1") {
            self.view[countryWidget].masterData = countryNew;
            self.view[countryWidget].selectedKey = countryId;
          }              
        }
        self.minFillValidation();
      };
      this.view[stateWidget].onSelection = function(){
        if(stateWidget == "listState"){
          self.updateContext("listState",self.view[stateWidget].selectedKeyValue[1]);
        }
        else{
          self.updateContext("state",self.view[stateWidget].selectedKeyValue[1]);  
        }
        self.minFillValidation();
      };
    },
	/**
     * @api : onSuccessFetchStatesList
     * Used to get success response of state service call.
	 * @Params : "response" contains response of the service.
	 * @Params : "unicode" identifier to store service response.
     * @return : NA
     */
    onSuccessFetchStatesList: function(response, unicode) {
      this._statesList = response;
      this.serviceCounter++;
      if(this.serviceCounter == 3)
        this.setCountryAndStateMasterData();
    },
	/**
     * @api : getSpecifiedStates
     * Used to get specfic states based on address id.
	 * @Params : "addressId" contains the address id for filtering
     * @return : "data" this contains states list.
     */
    getSpecifiedStates: function(addressId) {
      var self = this;
      var data = [];
      var statesList = [];
      statesList.push(["1", kony.i18n.getLocalizedString("i18n.ProfileManagement.selectState")]);
      for (var i = 0; i < this._statesList.length; ++i) {
        if (this._statesList[i]["Country_id"] === addressId) {
          statesList.push([this._statesList[i]["id"], this._statesList[i]["Name"], this._statesList[i]["Country_id"]]);
        }
      }
      data = {
        "states": statesList,
        "stateSelected" : statesList[0][0]
      };
      return data;
    },
	/**
     * @api : resetComponentData
     * used to reset entire component data.
     * @return : "data" this contains states list.
     */
    resetComponentData: function() {
      this.parserUtilsManager.clearContext(this.textInputsMapping);
      this.textInputsMapping = {};
      if(this.parserUtilsManager.context.flowType === "ADD")
        {
           this.componentContext = {};
        }
      this.rootPath = "";
      this.formatComponentValues = {};
      this.selectedReviewText = "";
      this.selectedReviewIcon = "";
      this.radioIcon1InitialValue = "";
      this.selectedReviewIcon = "";
      this.selectedReviewText = "";
      this.context = {};
      this.entitlementContext = {};
      this.fieldsEnabledMap = {};
      this.serviceCounter = 0;
      this.eventTriggered = "";
    },

    /**
     * @api : postShow
     * event called after ui rendered on the screen, is a component life cycle event.
     * @return : NA
     */
    postShow: function() {
      this.initialContentVisibility(); 
      this.setTabsData();
      this.setSkins();
      this.view.flxClosePopup.doLayout = CommonUtilities.centerPopupFlex;
      this.view.editflxClosePopup.doLayout = CommonUtilities.centerPopupFlex;
    },
	/**
     * @api : populateButtonTexts
     * Responsible to populate texts of the buttons.
     * @return : "data" this contains states list.
     */
    populateButtonTexts:function(){
      var parsedValue1=this.addPayeeUtility.buttonParsedValue(this._Tab1Button1);
      if(parsedValue1){
        var btn1Text=this.setButtonText(parsedValue1);
        this.view.btnRight2.text=btn1Text;
        this.view.btnRight2.setVisibility(true);
      }
      else{
        this.view.btnRight2.setVisibility(false);
      }
      var parsedValue2=this.addPayeeUtility.buttonParsedValue(this._tab1Button2);
      if(parsedValue2){
        var btn2Text=this.setButtonText(parsedValue2);
        this.view.btnRight1.text=btn2Text;
        this.view.btnRight1.setVisibility(true);
		
      }
      else{
        this.view.btnRight1.setVisibility(false);
      }
      var parsedValue3=this.addPayeeUtility.buttonParsedValue(this._editButton1);
      if(parsedValue3){
        var btn3Text=this.setButtonText(parsedValue3);
        this.view.editDetailsBtnRight3.text=btn3Text;
        this.view.editDetailsBtnRight3.setVisibility(true);
      }
      else{
        this.view.editDetailsBtnRight3.setVisibility(false);
      }
      var parsedValue4=this.addPayeeUtility.buttonParsedValue(this._editButton2);
      if(parsedValue4){
        var btn4Text=this.setButtonText(parsedValue4);
        this.view.editDetailsBtnRight2.text=btn4Text;
        this.view.editDetailsBtnRight2.setVisibility(true);
      }
      else{
        this.view.editDetailsBtnRight2.setVisibility(false);
      }
      var parsedValue5=this.addPayeeUtility.buttonParsedValue(this._editButton3);
      if(parsedValue5){
        var btn5Text=this.setButtonText(parsedValue5);
        this.view.editDetailsBtnRight1.text=btn5Text;
        this.view.editDetailsBtnRight1.setVisibility(true);
      }
      else{
        this.view.editDetailsBtnRight1.setVisibility(false);
      }
      var parsedValue6=this.addPayeeUtility.buttonParsedValue(this._categoryButton1);
      if(parsedValue6){
        var btn6Text=this.setButtonText(parsedValue6);
        this.view.btnCancelAccount.text=btn6Text;
        this.view.btnCancelAccount.setVisibility(true);
      }
      else{
        this.view.btnCancelAccount.setVisibility(false);
      }
      var parsedValue7=this.addPayeeUtility.buttonParsedValue(this._categoryButton2);
      if(parsedValue7){
        var btn7Text=this.setButtonText(parsedValue7);
        this.view.btnModify.text=btn7Text;
        this.view.btnModify.setVisibility(true);
      }
      else{
        this.view.btnModify.setVisibility(false);
      }
      var parsedValue8=this.addPayeeUtility.buttonParsedValue(this._categoryButton3);
      if(parsedValue8){
        var btn8Text=this.setButtonText(parsedValue8);
        this.view.btnConfirm.text=btn8Text;
        this.view.btnConfirm.setVisibility(true);
      }
      else{
        this.view.btnConfirm.setVisibility(false);
      }
      var parsedValue9=this.addPayeeUtility.buttonParsedValue(this._reviewButton1);
      if(parsedValue9){
        var btn9Text=this.setButtonText(parsedValue9);
        this.view.btnAction4.text=btn9Text;
        this.view.btnAction4.setVisibility(true);
      }
      else{
        this.view.btnAction4.setVisibility(false);
      }
      var parsedValue10=this.addPayeeUtility.buttonParsedValue(this._reviewButton2);
      if(parsedValue10){
        var btn10Text=this.setButtonText(parsedValue10);
        this.view.btnAction5.text=btn10Text;
        this.view.btnAction5.setVisibility(true);
      }
      else{
        this.view.btnAction5.setVisibility(false);
      }
      var parsedValue11=this.addPayeeUtility.buttonParsedValue(this._reviewButton3);
      if(parsedValue11){
        var btn11Text=this.setButtonText(parsedValue11);
        this.view.btnAction6.text=btn11Text;
        this.view.btnAction6.setVisibility(true);
      }
      else{
        this.view.btnAction6.setVisibility(false);
      }
      var parsedValue12=this.ackButtonsHandler(this._ackButton1);
      if(parsedValue12){
        var retrieveEntitlement = parsedValue12.entitlement;
        retrieveEntitlement = this.EntitlementUtils.isEntitled(retrieveEntitlement);
        if(retrieveEntitlement){        
          this.view.btnAddAnotherRecipient.text=parsedValue12.text;
          this.view.btnAddAnotherRecipient.setVisibility(true);
        }else{
          this.view.btnAddAnotherRecipient.setVisibility(false);
        }
      }
      else{
        this.view.btnAddAnotherRecipient.setVisibility(false);
      }
      var parsedValue13=this.ackButtonsHandler(this._ackButton2);
      if(parsedValue13){
        var retrieveEntitlement = parsedValue13.entitlement;
        retrieveEntitlement = this.EntitlementUtils.isEntitled(retrieveEntitlement);
        if(retrieveEntitlement){        
          this.view.btnNewTransfer.text=parsedValue13.text;
          this.view.btnNewTransfer.setVisibility(true);
        } else{
          this.view.btnNewTransfer.setVisibility(false);
        }
      }
      else{
        this.view.btnNewTransfer.setVisibility(false);
      }
      var parsedValue14=this.addPayeeUtility.buttonParsedValue(this._editFlowButton1);
      if(parsedValue14){
        var btn14Text=this.setButtonText(parsedValue14);
        this.view.btnCancel.text=btn14Text;
        this.view.btnCancel.setVisibility(true);
      }
      else{
        this.view.btnCancel.setVisibility(false);
      }
      var parsedValue15=this.addPayeeUtility.buttonParsedValue(this._editFlowButton2);
      if(parsedValue15){
        var btn15Text=this.setButtonText(parsedValue15);
        this.view.btnSave.text=btn15Text;
        this.view.btnSave.setVisibility(true);
      }
      else{
        this.view.btnSave.setVisibility(false);
      }
      var parsedValue16=this.addPayeeUtility.buttonParsedValue(this._reviewCancelYesButton);
      if(parsedValue16){
        var btn16Text=this.setButtonText(parsedValue16);
        this.view.btnYes.text=btn16Text;
        this.view.btnYes.setVisibility(true);
      }
      else{
        this.view.btnYes.setVisibility(false);
      }
    },  

    /**
     * @api : ackButtonsAction
     * Responsible to assign actions to acknowledge page buttons.
	 * @params : "context" data of all inputs maintained locally.
     * @params : "property" is the button for which action should be assigned.
	 * @return : NA
     */
    ackButtonsAction : function(context,property) {
      if (property !== null && property !== undefined) {
        var propertyJSON = JSON.parse(property);
        var parsedValue = propertyJSON;                              
        if ((typeof(parsedValue) !== "string" && Object.keys(parsedValue)[1].indexOf("$.FLOWTYPES") > -1) || (typeof(parsedValue) === "string" && parsedValue.indexOf("$.FLOWTYPES") > -1)) {
          parsedValue = this.getParsedValueForAckButtons(parsedValue, this.FlowType);
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

    /**
     * @api : ackButtonsHandler
     * Responsible to assign handlers to acknowledge page buttons.
	 * @params : "context" data of all inputs maintained locally.
     * @return : NA.
     */
    ackButtonsHandler : function(property){ 
      if (property !== null && property !== undefined && property !== "") {
        var propertyJSON = JSON.parse(property);
        var parsedValue = propertyJSON;            
        if ((typeof(parsedValue) !== "string" && Object.keys(parsedValue)[1].indexOf("$.FLOWTYPES") > -1) || (typeof(parsedValue) === "string" && parsedValue.indexOf("$.FLOWTYPES") > -1)) {
          parsedValue = this.getParsedValueForAckButtons(parsedValue, this.FlowType);                             
        }
      }
      if (parsedValue.hasOwnProperty("text")){
        parsedValue.text = this.getProcessedText(parsedValue.text);
      }
      return parsedValue;
    },

    /**
     * @api : getParsedValueForAckButtons
     * Responsible to set properties for selected values.
	 * @params : "selectedValue" the value which is selected
	 * @params : "property" is the property which need to be proocessed.
     * @return : NA.
     */
    getParsedValueForAckButtons: function(property, selectedValue) {
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
     * @api : setButtonText
     * Responsible to set text to buttons.
	 * @params : "value" the value which needs to text.
     * @return : NA.
     */
    setButtonText: function(value) {
      var self = this;
      try {
        var parsedValue = value;
        if (typeof(parsedValue !== "string")) {
          parsedValue = parsedValue.hasOwnProperty("text") ? parsedValue["text"] : parsedValue;
        }
        if ((typeof(parsedValue) !== "string" && Object.keys(parsedValue)[1].indexOf("$.FLOWTYPES") > -1) || (typeof(parsedValue) === "string" && parsedValue.indexOf("$.FLOWTYPES") > -1)) {
          parsedValue = this.getParsedTextValue(parsedValue, this.beneficiaryData["selectedflowType"]);
          if (typeof(parsedValue !== "string")) {
            parsedValue = parsedValue.hasOwnProperty("text") ? parsedValue["text"] : parsedValue;
          }
        }
        if ((typeof(parsedValue) !== "string" && Object.keys(parsedValue)[1].indexOf("$.BREAKPTS") > -1) || (typeof(parsedValue) === "string" && parsedValue.indexOf("$.BREAKPTS") > -1)) {
          parsedValue = this.getParsedTextValue(parsedValue, kony.application.getCurrentBreakpoint());
        } else parsedValue = this.getParsedTextValue(parsedValue, kony.application.getCurrentBreakpoint());
        return parsedValue;
      } catch (err) {
        var errObj = {
          "errorInfo": "Error in setButtonText method of the component.",
          "error": err
        };
        self.onError(errObj);
      }
    },

    /**
     * @api : getParsedTextValue
     * Responsible to set text to buttons.
	 * @params : "property" the property which needs to be parsed.
	 * @params : "selectedValue" the selected value in property.
     * @return : NA.
     */
    getParsedTextValue: function(property, selectedValue) {
      try {
        property = JSON.parse(property);
      } catch (e) {
        property = property;
        kony.print(e);
      }
      if (typeof(property) === "string") return this.getProcessedText(property);
      else return this.parserUtilsManager.getComponentConfigParsedValue(property, selectedValue);
    },


    /**
     * @api : setSkins
     * Responsible to set skins from contract properties.
     * @return : NA.
     */
    setSkins: function() {
      this.view.lbxCountry.skin = this.addPayeeUtility.breakPointParser
      (this._sknListBox, kony.application.getCurrentBreakpoint());
      this.view.lbxStateValue.skin = this.addPayeeUtility.breakPointParser
      (this._sknListBox, kony.application.getCurrentBreakpoint());
      this.view.lblBlockTitle.skin = this.addPayeeUtility.breakPointParser
      (this._sknBlockTitle, kony.application.getCurrentBreakpoint());
      this.view.lblField1Tab1.skin = this.addPayeeUtility.breakPointParser
      (this._sknAddLabel, kony.application.getCurrentBreakpoint());
      this.view.tbx1Tab1.skin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());
      this.view.tbx1Tab1.focusSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxFocus, kony.application.getCurrentBreakpoint());
      this.view.tbx1Tab1.placeholderSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxPlaceHolder, kony.application.getCurrentBreakpoint());
      this.view.tbx1Tab1.hoverSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxHover, kony.application.getCurrentBreakpoint());
      this.view.lblField2Tab1.skin = this.addPayeeUtility.breakPointParser
      (this._sknAddLabel, kony.application.getCurrentBreakpoint());
      this.view.tbx2Tab1.skin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());
      this.view.tbx2Tab1.focusSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxFocus, kony.application.getCurrentBreakpoint());
      this.view.tbx2Tab1.placeholderSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxPlaceHolder, kony.application.getCurrentBreakpoint());
      this.view.tbx2Tab1.hoverSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxHover, kony.application.getCurrentBreakpoint());
      this.view.lblField3Tab1.skin = this.addPayeeUtility.breakPointParser
      (this._sknAddLabel, kony.application.getCurrentBreakpoint());
      this.view.tbx3Tab1.skin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());
      this.view.tbx3Tab1.focusSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxFocus, kony.application.getCurrentBreakpoint());
      this.view.tbx3Tab1.placeholderSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxPlaceHolder, kony.application.getCurrentBreakpoint());
      this.view.tbx3Tab1.hoverSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxHover, kony.application.getCurrentBreakpoint());
      this.view.lblField4Tab1.skin = this.addPayeeUtility.breakPointParser
      (this._sknAddLabel, kony.application.getCurrentBreakpoint());
      this.view.tbx4Tab1.skin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());
      this.view.tbx4Tab1.focusSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxFocus, kony.application.getCurrentBreakpoint());
      this.view.tbx4Tab1.placeholderSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxPlaceHolder, kony.application.getCurrentBreakpoint());
      this.view.tbx4Tab1.hoverSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxHover, kony.application.getCurrentBreakpoint());
      this.view.lblField5Tab1.skin = this.addPayeeUtility.breakPointParser
      (this._sknAddLabel, kony.application.getCurrentBreakpoint());
      this.view.tbx5Tab1.skin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());
      this.view.tbx5Tab1.focusSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxFocus, kony.application.getCurrentBreakpoint());
      this.view.tbx5Tab1.placeholderSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxPlaceHolder, kony.application.getCurrentBreakpoint());
      this.view.tbx5Tab1.hoverSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxHover, kony.application.getCurrentBreakpoint());
      this.view.lblField6Tab1.skin = this.addPayeeUtility.breakPointParser
      (this._sknAddLabel, kony.application.getCurrentBreakpoint());
      this.view.tbx6Tab1.skin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());
      this.view.tbx6Tab1.focusSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxFocus, kony.application.getCurrentBreakpoint());
      this.view.tbx6Tab1.placeholderSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxPlaceHolder, kony.application.getCurrentBreakpoint());
      this.view.tbx6Tab1.hoverSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxHover, kony.application.getCurrentBreakpoint());      
      this.view.lblField7Tab1.skin = this.addPayeeUtility.breakPointParser
      (this._sknAddLabel, kony.application.getCurrentBreakpoint());
      this.view.tbx7Tab1.skin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());
      this.view.tbx7Tab1.focusSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxFocus, kony.application.getCurrentBreakpoint());
      this.view.tbx7Tab1.placeholderSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxPlaceHolder, kony.application.getCurrentBreakpoint());
      this.view.tbx7Tab1.hoverSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxHover, kony.application.getCurrentBreakpoint());
      this.view.lblField1Tab2.skin = this.addPayeeUtility.breakPointParser
      (this._sknAddLabel, kony.application.getCurrentBreakpoint());
      this.view.tbx1Tab2.skin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());
      this.view.tbx1Tab2.focusSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxFocus, kony.application.getCurrentBreakpoint());
      this.view.tbx1Tab2.placeholderSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxPlaceHolder, kony.application.getCurrentBreakpoint());
      this.view.tbx1Tab2.hoverSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxHover, kony.application.getCurrentBreakpoint());
      this.view.lblField2Tab2.skin = this.addPayeeUtility.breakPointParser
      (this._sknAddLabel, kony.application.getCurrentBreakpoint());
      this.view.tbx2Tab2.skin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());
      this.view.tbx2Tab2.focusSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxFocus, kony.application.getCurrentBreakpoint());
      this.view.tbx2Tab2.placeholderSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxPlaceHolder, kony.application.getCurrentBreakpoint());
      this.view.tbx2Tab2.hoverSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxHover, kony.application.getCurrentBreakpoint());
      this.view.lblField3Tab2.skin = this.addPayeeUtility.breakPointParser
      (this._sknAddLabel, kony.application.getCurrentBreakpoint());
      this.view.tbx3Tab2.skin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());
      this.view.tbx3Tab2.focusSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxFocus, kony.application.getCurrentBreakpoint());
      this.view.tbx3Tab2.placeholderSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxPlaceHolder, kony.application.getCurrentBreakpoint());
      this.view.tbx3Tab2.hoverSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxHover, kony.application.getCurrentBreakpoint());
      this.view.lblField4Tab2.skin = this.addPayeeUtility.breakPointParser
      (this._sknAddLabel, kony.application.getCurrentBreakpoint());
      this.view.tbx4Tab2.skin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());
      this.view.tbx4Tab2.focusSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxFocus, kony.application.getCurrentBreakpoint());
      this.view.tbx4Tab2.placeholderSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxPlaceHolder, kony.application.getCurrentBreakpoint());
      this.view.tbx4Tab2.hoverSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxHover, kony.application.getCurrentBreakpoint());
      this.view.lblFieldCity.skin = this.addPayeeUtility.breakPointParser
      (this._sknAddLabel, kony.application.getCurrentBreakpoint());
      this.view.tbx5Tab2.skin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());
      this.view.tbx5Tab2.focusSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxFocus, kony.application.getCurrentBreakpoint());
      this.view.tbx5Tab2.placeholderSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxPlaceHolder, kony.application.getCurrentBreakpoint());
      this.view.tbx5Tab2.hoverSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxHover, kony.application.getCurrentBreakpoint());
      this.view.lblFieldZipCode.skin = this.addPayeeUtility.breakPointParser
      (this._sknAddLabel, kony.application.getCurrentBreakpoint());
      this.view.tbxZipCodeTab2.skin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());
      this.view.tbxZipCodeTab2.focusSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxFocus, kony.application.getCurrentBreakpoint());
      this.view.tbxZipCodeTab2.placeholderSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxPlaceHolder, kony.application.getCurrentBreakpoint());
      this.view.tbxZipCodeTab2.hoverSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxHover, kony.application.getCurrentBreakpoint());
      this.view.lblField6Tab2.skin = this.addPayeeUtility.breakPointParser
      (this._sknAddLabel, kony.application.getCurrentBreakpoint());
      this.view.tbx6Tab2.skin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());
      this.view.tbx6Tab2.focusSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxFocus, kony.application.getCurrentBreakpoint());
      this.view.tbx6Tab2.placeholderSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxPlaceHolder, kony.application.getCurrentBreakpoint());
      this.view.tbx6Tab2.hoverSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxHover, kony.application.getCurrentBreakpoint());
      this.view.lblField7Tab2.skin = this.addPayeeUtility.breakPointParser
      (this._sknAddLabel, kony.application.getCurrentBreakpoint());
      this.view.tbx7Tab2.skin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());
      this.view.tbx7Tab2.focusSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxFocus, kony.application.getCurrentBreakpoint());
      this.view.tbx7Tab2.placeholderSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxPlaceHolder, kony.application.getCurrentBreakpoint());
      this.view.tbx7Tab2.hoverSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxHover, kony.application.getCurrentBreakpoint());
      //       this.view.lblRememberMeIcon.skin = this.addPayeeUtility.breakPointParser
      //       (this._sknAddLabel, kony.application.getCurrentBreakpoint());
      this.view.tbx8Tab2.skin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());
      this.view.tbx8Tab2.focusSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxFocus, kony.application.getCurrentBreakpoint());
      this.view.tbx8Tab2.placeholderSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxPlaceHolder, kony.application.getCurrentBreakpoint());
      this.view.tbx8Tab2.hoverSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxHover, kony.application.getCurrentBreakpoint());
      this.view.btnRight1.skin = this.addPayeeUtility.breakPointParser
      (this._sknPrimaryButtonDisabled, kony.application.getCurrentBreakpoint());
      this.view.btnRight1.focusSkin = this.addPayeeUtility.breakPointParser
      (this._sknPrimaryButtonFocus, kony.application.getCurrentBreakpoint());
      this.view.btnRight1.hoverSkin = this.addPayeeUtility.breakPointParser
      (this._sknPrimaryButtonHover, kony.application.getCurrentBreakpoint());
      this.view.btnRight2.skin = this.addPayeeUtility.breakPointParser
      (this._sknSecondaryButton, kony.application.getCurrentBreakpoint());
      this.view.btnRight2.focusSkin = this.addPayeeUtility.breakPointParser
      (this._sknSecondaryButtonFocus, kony.application.getCurrentBreakpoint());
      this.view.btnRight2.hoverSkin = this.addPayeeUtility.breakPointParser
      (this._sknSecondaryButtonHover, kony.application.getCurrentBreakpoint());
      this.view.editlblHeader.skin =  this.addPayeeUtility.breakPointParser
      (this._sknSectionHeader, kony.application.getCurrentBreakpoint());
      this.view.editlblKey1.skin = this.addPayeeUtility.breakPointParser
      (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
      this.view.editFormatValue1.skin = this.addPayeeUtility.breakPointParser
      (this._sknReviewValue, kony.application.getCurrentBreakpoint());
      this.view.editlblKey2.skin = this.addPayeeUtility.breakPointParser
      (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
      this.view.editFormatValue2.skin = this.addPayeeUtility.breakPointParser
      (this._sknReviewValue, kony.application.getCurrentBreakpoint());
      this.view.editlblKey3.skin = this.addPayeeUtility.breakPointParser
      (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
      this.view.editFormatValue3.skin = this.addPayeeUtility.breakPointParser
      (this._sknReviewValue, kony.application.getCurrentBreakpoint());
      this.view.editlblKey6.skin = this.addPayeeUtility.breakPointParser
      (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
      this.view.editFormatValue6.skin = this.addPayeeUtility.breakPointParser
      (this._sknReviewValue, kony.application.getCurrentBreakpoint());
      this.view.editlblKey4.skin = this.addPayeeUtility.breakPointParser
      (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
      this.view.editlblKey5.skin = this.addPayeeUtility.breakPointParser
      (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
      this.view.tbx4.skin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());
      this.view.tbx4.focusSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxFocus, kony.application.getCurrentBreakpoint());
      this.view.tbx4.placeholderSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxPlaceHolder, kony.application.getCurrentBreakpoint());
      this.view.tbx4.hoverSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxHover, kony.application.getCurrentBreakpoint());
      this.view.tbx5.skin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());
      this.view.tbx5.focusSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxFocus, kony.application.getCurrentBreakpoint());
      this.view.tbx5.placeholderSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxPlaceHolder, kony.application.getCurrentBreakpoint());
      this.view.tbx5.hoverSkin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxHover, kony.application.getCurrentBreakpoint());
      this.view.editDetailsBtnRight3.skin = this.addPayeeUtility.breakPointParser
      (this._sknSecondaryButton, kony.application.getCurrentBreakpoint());
      this.view.editDetailsBtnRight3.focusSkin = this.addPayeeUtility.breakPointParser
      (this._sknSecondaryButtonFocus, kony.application.getCurrentBreakpoint());
      this.view.editDetailsBtnRight3.hoverSkin = this.addPayeeUtility.breakPointParser
      (this._sknSecondaryButtonHover, kony.application.getCurrentBreakpoint());
      this.view.editDetailsBtnRight2.skin = this.addPayeeUtility.breakPointParser
      (this._sknSecondaryButton, kony.application.getCurrentBreakpoint());
      this.view.editDetailsBtnRight2.focusSkin = this.addPayeeUtility.breakPointParser
      (this._sknSecondaryButtonFocus, kony.application.getCurrentBreakpoint());
      this.view.editDetailsBtnRight2.hoverSkin = this.addPayeeUtility.breakPointParser
      (this._sknSecondaryButtonHover, kony.application.getCurrentBreakpoint());
      this.view.editDetailsBtnRight1.skin = this.addPayeeUtility.breakPointParser
      (this._sknPrimaryButton, kony.application.getCurrentBreakpoint());
      this.view.editDetailsBtnRight1.focusSkin = this.addPayeeUtility.breakPointParser
      (this._sknPrimaryButtonFocus, kony.application.getCurrentBreakpoint());
      this.view.editDetailsBtnRight1.hoverSkin = this.addPayeeUtility.breakPointParser
      (this._sknPrimaryButtonHover, kony.application.getCurrentBreakpoint());
      this.view.editbtnNo.skin = this.addPayeeUtility.breakPointParser
      (this._sknSecondaryButton, kony.application.getCurrentBreakpoint());
      this.view.editbtnNo.focusSkin = this.addPayeeUtility.breakPointParser
      (this._sknSecondaryButtonFocus, kony.application.getCurrentBreakpoint());
      this.view.editbtnNo.hoverSkin = this.addPayeeUtility.breakPointParser
      (this._sknSecondaryButtonHover, kony.application.getCurrentBreakpoint());
      this.view.editbtnYes.skin = this.addPayeeUtility.breakPointParser
      (this._sknPrimaryButton, kony.application.getCurrentBreakpoint());
      this.view.editbtnYes.focusSkin = this.addPayeeUtility.breakPointParser
      (this._sknPrimaryButtonFocus, kony.application.getCurrentBreakpoint());
      this.view.editbtnYes.hoverSkin = this.addPayeeUtility.breakPointParser
      (this._sknPrimaryButtonHover, kony.application.getCurrentBreakpoint());
      this.view.lblHeader.skin = this.addPayeeUtility.breakPointParser
      (this._sknSectionHeader, kony.application.getCurrentBreakpoint());      
      this.view.btnCancelAccount.skin = this.addPayeeUtility.breakPointParser
      (this._sknSecondaryButton, kony.application.getCurrentBreakpoint());
      this.view.btnCancelAccount.focusSkin = this.addPayeeUtility.breakPointParser
      (this._sknSecondaryButtonFocus, kony.application.getCurrentBreakpoint());
      this.view.btnCancelAccount.hoverSkin = this.addPayeeUtility.breakPointParser
      (this._sknSecondaryButtonHover, kony.application.getCurrentBreakpoint());
      this.view.btnModify.skin = this.addPayeeUtility.breakPointParser
      (this._sknSecondaryButton, kony.application.getCurrentBreakpoint());
      this.view.btnModify.focusSkin = this.addPayeeUtility.breakPointParser
      (this._sknSecondaryButtonFocus, kony.application.getCurrentBreakpoint());
      this.view.btnModify.hoverSkin = this.addPayeeUtility.breakPointParser
      (this._sknSecondaryButtonHover, kony.application.getCurrentBreakpoint());
      this.view.btnConfirm.skin = this.addPayeeUtility.breakPointParser
      (this._sknPrimaryButton, kony.application.getCurrentBreakpoint());
      this.view.btnConfirm.focusSkin = this.addPayeeUtility.breakPointParser
      (this._sknPrimaryButtonFocus, kony.application.getCurrentBreakpoint());
      this.view.btnConfirm.hoverSkin = this.addPayeeUtility.breakPointParser
      (this._sknPrimaryButtonHover, kony.application.getCurrentBreakpoint());
      this.view.btnAction4.skin = this.addPayeeUtility.breakPointParser
      (this._sknSecondaryButton, kony.application.getCurrentBreakpoint());
      this.view.btnAction4.focusSkin = this.addPayeeUtility.breakPointParser
      (this._sknSecondaryButtonFocus, kony.application.getCurrentBreakpoint());
      this.view.btnAction4.hoverSkin = this.addPayeeUtility.breakPointParser
      (this._sknSecondaryButtonHover, kony.application.getCurrentBreakpoint());
      this.view.btnAction5.skin = this.addPayeeUtility.breakPointParser
      (this._sknSecondaryButton, kony.application.getCurrentBreakpoint());
      this.view.btnAction5.focusSkin = this.addPayeeUtility.breakPointParser
      (this._sknSecondaryButtonFocus, kony.application.getCurrentBreakpoint());
      this.view.btnAction5.hoverSkin = this.addPayeeUtility.breakPointParser
      (this._sknSecondaryButtonHover, kony.application.getCurrentBreakpoint());
      this.view.btnAction6.skin = this.addPayeeUtility.breakPointParser
      (this._sknPrimaryButton, kony.application.getCurrentBreakpoint());
      this.view.btnAction6.focusSkin = this.addPayeeUtility.breakPointParser
      (this._sknPrimaryButtonFocus, kony.application.getCurrentBreakpoint());
      this.view.btnAction6.hoverSkin = this.addPayeeUtility.breakPointParser
      (this._sknPrimaryButtonHover, kony.application.getCurrentBreakpoint());
      this.view.btnYes.skin = this.addPayeeUtility.breakPointParser
      (this._sknPrimaryButton, kony.application.getCurrentBreakpoint());
      this.view.btnYes.focusSkin = this.addPayeeUtility.breakPointParser
      (this._sknPrimaryButtonFocus, kony.application.getCurrentBreakpoint());
      this.view.btnYes.hoverSkin = this.addPayeeUtility.breakPointParser
      (this._sknPrimaryButtonHover, kony.application.getCurrentBreakpoint());
      this.view.btnNo.skin = this.addPayeeUtility.breakPointParser
      (this._sknSecondaryButton, kony.application.getCurrentBreakpoint());
      this.view.btnNo.focusSkin = this.addPayeeUtility.breakPointParser
      (this._sknSecondaryButtonFocus, kony.application.getCurrentBreakpoint());
      this.view.btnNo.hoverSkin = this.addPayeeUtility.breakPointParser
      (this._sknSecondaryButtonHover, kony.application.getCurrentBreakpoint());
      this.view.lblHeader2.skin = this.addPayeeUtility.breakPointParser
      (this._sknSectionHeader, kony.application.getCurrentBreakpoint());
      this.view.FormatValue.skin = this.addPayeeUtility.breakPointParser
      (this._sknReviewValue, kony.application.getCurrentBreakpoint());
      this.view.FormatValue1.skin = this.addPayeeUtility.breakPointParser
      (this._sknReviewValue, kony.application.getCurrentBreakpoint());
      this.view.FormatValue2.skin = this.addPayeeUtility.breakPointParser
      (this._sknReviewValue, kony.application.getCurrentBreakpoint());
      this.view.FormatValue3.skin = this.addPayeeUtility.breakPointParser
      (this._sknReviewValue, kony.application.getCurrentBreakpoint());
      this.view.FormatValue4.skin = this.addPayeeUtility.breakPointParser
      (this._sknReviewValue, kony.application.getCurrentBreakpoint());
      this.view.FormatValue5.skin = this.addPayeeUtility.breakPointParser
      (this._sknReviewValue, kony.application.getCurrentBreakpoint());
      this.view.lblPersonalBanking.skin = this.addPayeeUtility.breakPointParser
      (this._sknAddLabel, kony.application.getCurrentBreakpoint());   
      this.view.lblBusinessBanking.skin = this.addPayeeUtility.breakPointParser
      (this._sknAddLabel, kony.application.getCurrentBreakpoint());
      this.view.lblKey1.skin =  this.addPayeeUtility.breakPointParser
      (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
      this.view.lblKey2.skin =  this.addPayeeUtility.breakPointParser
      (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
      this.view.lblKey3.skin =  this.addPayeeUtility.breakPointParser
      (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
      this.view.lblKey4.skin =  this.addPayeeUtility.breakPointParser
      (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
      this.view.lblKey5.skin =  this.addPayeeUtility.breakPointParser
      (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
      this.view.lblKey6.skin =  this.addPayeeUtility.breakPointParser
      (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
      this.view.lblSection1Header.skin = this.addPayeeUtility.breakPointParser
      (this._sknReviewValue, kony.application.getCurrentBreakpoint());
      this.view.lblSection1Message.skin = this.addPayeeUtility.breakPointParser
      (this._sknAcknowledgementSuccess, kony.application.getCurrentBreakpoint());
      this.view.lblRefrenceNumber.skin = this.addPayeeUtility.breakPointParser
      (this._sknAcknowledgementReferenceNumberLabel, kony.application.getCurrentBreakpoint());
      this.view.lblRefrenceNumberValue.skin = this.addPayeeUtility.breakPointParser
      (this._sknAcknowledgementReferenceNumberValue, kony.application.getCurrentBreakpoint());
      this.view.lblConfirmHeader.skin = this.addPayeeUtility.breakPointParser
      (this._sknReviewValue, kony.application.getCurrentBreakpoint());
      this.view.FormatValue6.skin = this.addPayeeUtility.breakPointParser
      (this._sknReviewValue, kony.application.getCurrentBreakpoint());
      this.view.FormatValue7.skin = this.addPayeeUtility.breakPointParser
      (this._sknReviewValue, kony.application.getCurrentBreakpoint());
      this.view.FormatValue8.skin = this.addPayeeUtility.breakPointParser
      (this._sknReviewValue, kony.application.getCurrentBreakpoint());
      this.view.FormatValue9.skin = this.addPayeeUtility.breakPointParser
      (this._sknReviewValue, kony.application.getCurrentBreakpoint());
      this.view.FormatValue10.skin = this.addPayeeUtility.breakPointParser
      (this._sknReviewValue, kony.application.getCurrentBreakpoint());
      this.view.FormatValue11.skin = this.addPayeeUtility.breakPointParser
      (this._sknReviewValue, kony.application.getCurrentBreakpoint());
      this.view.lblField1Key.skin = this.addPayeeUtility.breakPointParser
      (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
      this.view.lblField2Key.skin = this.addPayeeUtility.breakPointParser
      (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
      this.view.lblField3KEy.skin = this.addPayeeUtility.breakPointParser
      (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
      this.view.lblField4KEy.skin = this.addPayeeUtility.breakPointParser
      (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
      this.view.lblField5Key.skin = this.addPayeeUtility.breakPointParser
      (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
      this.view.lblField6Key.skin = this.addPayeeUtility.breakPointParser
      (this._sknReviewLabel, kony.application.getCurrentBreakpoint());
      this.view.btnAddAnotherRecipient.skin = this.addPayeeUtility.breakPointParser
      (this._sknPrimaryButton, kony.application.getCurrentBreakpoint());
      this.view.btnAddAnotherRecipient.focusSkin = this.addPayeeUtility.breakPointParser
      (this._sknPrimaryButtonFocus, kony.application.getCurrentBreakpoint());
      this.view.btnAddAnotherRecipient.hoverSkin = this.addPayeeUtility.breakPointParser
      (this._sknPrimaryButtonHover, kony.application.getCurrentBreakpoint());
      this.view.btnNewTransfer.skin = this.addPayeeUtility.breakPointParser
      (this._sknSecondaryButton, kony.application.getCurrentBreakpoint());
      this.view.btnNewTransfer.focusSkin = this.addPayeeUtility.breakPointParser
      (this._sknSecondaryButtonFocus, kony.application.getCurrentBreakpoint());
      this.view.btnNewTransfer.hoverSkin = this.addPayeeUtility.breakPointParser
      (this._sknSecondaryButtonHover, kony.application.getCurrentBreakpoint());
      this.view.btn3.skin = this.addPayeeUtility.breakPointParser
      (this._sknPrimaryButton, kony.application.getCurrentBreakpoint());
      this.view.btn3.focusSkin = this.addPayeeUtility.breakPointParser
      (this._sknPrimaryButtonFocus, kony.application.getCurrentBreakpoint());
      this.view.btn3.hoverSkin = this.addPayeeUtility.breakPointParser
      (this._sknPrimaryButtonHover, kony.application.getCurrentBreakpoint());
      this.view.tbxAddress.skin = this.addPayeeUtility.breakPointParser
      (this._sknAddTextBoxDisabled, kony.application.getCurrentBreakpoint());
    },
    /**
     * @api : toggleCountryCodeSegment
     * Responsible to toggle country code segment visibility.
     * @return : NA.
     */
    toggleCountryCodeSegment : function(){
      var codeVisibility = this.view.flxSegment.isVisible;
      if(codeVisibility == true){
        this.view.flxSegment.isVisible = false;
      }
      else{
        this.view.flxSegment.isVisible = true;
      }
    },
    /**
     * @api : handlingCountryCodeDropdown
     * Responsible to get text for textbox.
	 * @params : "rowNumber" which value need to be modified.
     * @return : NA.
     */
    handlingCountryCodeDropdown : function(rowNumber){
      var rowItem = rowNumber.selectedRowItems;
      this.view.tbxCodeTab1.text = "("+rowItem[0].lblKeyCode+")";
      this.view.flxSegment.isVisible = false;
    },
    /**
     * @api : searchCountryCode
     * used to search for country code.
     * @return : NA.
     */
    searchCountryCode: function() {
            var code = this._countryCode;
            var searchText = this.view.tbxCodeTab1.text.toLowerCase();
			var searchResult = [];
			
			for(var i=0; i<code.length; i++)
			{
			var name = code[i].Name.toLowerCase();
			var countryCode = code[i].phoneCountryCode.toLowerCase();
				if(name.includes(searchText) || countryCode.includes(searchText)) {
					var value = code[i].Name + "( "+code[i].phoneCountryCode+ " )";
				  searchResult.push({"lblKeyCode":code[i].phoneCountryCode,"lblCountryCode": value});
				}
			}
			if(searchResult.length > 0){
			this.view.segCountryCode.setData(searchResult);
			}
			else{
			 this._countryCode.map(function(codes) {
					var code = codes.Name + "("+ codes.phoneCountryCode +")";
					return searchResult.push({"lblCountryCode": code, "lblKeyCode" : codes.phoneCountryCode});
					});
				this.view.segCountryCode.setData(searchResult);	
			}
			this.view.flxSegment.isVisible = true;
        },
    
    /**
     * @api : setScreen1Tab1Data
     * used to set screen1 tab1 data.
     * @return : NA.
     */
    setScreen1Tab1Data: function() {
      this.clearTab1ValidationErrors();
      if(this._tab1Visibility){
        this.view.tbxCodeTab1.onTouchStart = this.toggleCountryCodeSegment;
        this.view.tbxCodeTab1.onTextChange = this.searchCountryCode;
        this.view.segCountryCode.onRowClick = this.handlingCountryCodeDropdown;
        this.view.flxContent1.isVisible = this._tab1Visibility;
        this.view.flxContent2.isVisible = false;
        this.view.lblBlockTitle.text = this.getLabelText(this._blockTitle);
        //this.view.lblBlockTitle.setActive(true);
        this.view.lblField1Tab1.text = this.getLabelText(this._Tab1Field1Label);
        this.view.lblField2Tab1.text = this.getLabelText(this._Tab1Field2Label);
        this.view.lblField3Tab1.text = this.getLabelText(this._Tab1Field3Label);
        this.view.lblField4Tab1.text = this.getLabelText(this._Tab1Field4Label);
        this.view.lblField6Tab1.text = this.getLabelText(this._Tab1Field6Label);
        this.view.lblField7Tab1.text = this.getLabelText(this._Tab1Field7Label);
        this.view.lblLinkText.text = this.getLabelText(this._helpText);
        this.view.btnLink.text = this.setButtonText(this.addPayeeUtility.buttonParsedValue(this._helpAction));
        //this.view.btnLink.toolTip = this.view.btnLink.text;
        var tbx1JSON = this.getParsedValue(this._Tab1Field1Value);
        if(tbx1JSON) {
          this.rootPath = tbx1JSON.rootPath;
          this.textInputsMapping["tbx1Text"] = tbx1JSON["text"];

          this.mapTextBoxValueToContext(tbx1JSON, "tbx1");
          this.setTextBoxPlaceHolder(tbx1JSON, "tbx1Tab1");
          this.setTextBoxInputModeAndMasking(tbx1JSON, "tbx1Tab1");
          this.setTextBoxInfoIcon(tbx1JSON, "imgInfo1", "lblInfoHeader1", "lblInfoText1");
          this.setTextBoxToolTip(tbx1JSON, "tbx1Tab1");
        }
        else {
          this.view.flxTab1Field1.isVisible = false;
          this.view.flxField1Tab1.isVisible = false;
        }
        var tbx2JSON = this.getParsedValue(this._Tab1Field2Value);
        if(tbx2JSON) {
          this.mapTextBoxValueToContext(tbx2JSON, "tbx2");
          this.setTextBoxPlaceHolder(tbx2JSON, "tbx2Tab1");
          this.setTextBoxInputModeAndMasking(tbx2JSON, "tbx2Tab1");
          this.setTextBoxInfoIcon(tbx2JSON, "imgInfo2", "lblInfoHeader2", "lblInfoText2");
          this.setTextBoxToolTip(tbx2JSON, "tbx2Tab1");
        }
        else {
          this.view.flxTab1Field2.isVisible = false;
          this.view.tbx2Tab1.isVisible = false;
        }
        var tbx3JSON = this.getParsedValue(this._Tab1Field3Value);
        if(tbx3JSON) {
          this.mapTextBoxValueToContext(tbx3JSON, "tbx3");
          this.setTextBoxPlaceHolder(tbx3JSON, "tbx3Tab1");
          this.setTextBoxInputModeAndMasking(tbx3JSON, "tbx3Tab1");
          this.setTextBoxInfoIcon(tbx3JSON, "imgInfo3", "lblInfoHeader3", "lblInfoText3");
         this.setTextBoxToolTip(tbx3JSON, "tbx3Tab1");
        }
        else {
          this.view.flxTab1Field3.isVisible = false;
          this.view.tbx3Tab1.isVisible = false;
        }
        var tbx4JSON = this.getParsedValue(this._Tab1Field4Value);
        if(tbx4JSON) {
          this.mapTextBoxValueToContext(tbx4JSON, "tbx4");
          this.setTextBoxPlaceHolder(tbx4JSON, "tbx4Tab1");
          this.setTextBoxInputModeAndMasking(tbx4JSON, "tbx4Tab1");
          this.setTextBoxInfoIcon(tbx4JSON, "imgInfo4", "lblInfoHeader4", "lblInfoText4");
          this.setTextBoxToolTip(tbx4JSON, "tbx4Tab1");
        }
        else {
          this.view.flxTab1Field4.isVisible = false;
          this.view.tbx4Tab1.isVisible = false;
        }
        var tbx6JSON = this.getParsedValue(this._Tab1Field6Value);
        if(tbx6JSON) {          
          this.mapTextBoxValueToContext(tbx6JSON, "tbx6");
          this.setTextBoxPlaceHolder(tbx6JSON, "tbx6Tab1");
          this.setTextBoxInputModeAndMasking(tbx6JSON, "tbx6Tab1");
          this.setTextBoxInfoIcon(tbx6JSON, "imgInfo6Tab1", "lblInfoHeader6Tab1", "lblInfoText6Tab1");
          this.setTextBoxToolTip(tbx6JSON, "tbx6Tab1");
        }
        else {
          this.view.flxTab1Filed6.isVisible = false;
          this.view.tbx6Tab1.isVisible = false;
        }
        var tbx7JSON = this.getParsedValue(this._Tab1Field7Value);
        if(tbx7JSON) {
          this.mapTextBoxValueToContext(tbx7JSON, "tbx7");
          this.setTextBoxPlaceHolder(tbx7JSON, "tbx7Tab1");
          this.setTextBoxInputModeAndMasking(tbx7JSON, "tbx7Tab1");
          this.setTextBoxInfoIcon(tbx7JSON, "imgInfo7Tab1", "lblInfoHeader7Tab1", "lblInfoText7Tab1");
         this.setTextBoxToolTip(tbx7JSON, "tbx7Tab1");
        }
        else {
          this.view.flxTab1Field7.isVisible = false;
          this.view.tbx7Tab1.isVisible = false;
        }
        
        /*var lbxCode = this.getParsedValue(this._isCodeVisible);
        if(lbxCode) {
          this.view.lbxCode.isVisible = true;
        }
        else {
          this.view.lbxCode.isVisible = false;
        }*/
      this.resultAccNumberValidation = [];
      if(this.view.flxContent1.isVisible) {
        this.updateContext("tbx1",this.view.flxField1Tab1.tbx1Tab1.text);
        this.updateContext("tbx2",this.view.tbx2Tab1.text);
        this.updateContext("tbx3",this.view.tbx3Tab1.text);
        this.updateContext("tbx4",this.view.tbx4Tab1.text);
        this.sendDynamicFieldAddFlowIntoContext();
      }
      this.populateButtonTexts();

    this.view.btnSearchPayee.setActive(true);
    this.view.forceLayout();
    }},
	/**
     * @api : enterInformationManuallyLinkOnClick
     * used to navigate to tab2
     * @return : NA.
     */
    enterInformationManuallyLinkOnClick: function(){
      this.setScreen1Tab2Data();
      var scope = this;
      this.view.flxDowntimeWarning.setVisibility(false);
      this.highlightTabSkins("btnEnterPayeeInfo");
      scope.actionHandler.call(this,this.context,this._enterInfoManuallyLink);
    },
	/**
     * @api : setScreen1Tab2Data
     * used to set screen1 tab 2 data.
     * @return : NA.
     */
    setScreen1Tab2Data: function() {
      this.getLatitudeAndLongitude();
      this.clearTab2ValidationErrors();
      if(this._tab2Visibility){
        this.view.flxContent2.isVisible = this._tab2Visibility;
        this.view.flxContent1.isVisible = false;
        this.view.lblBlockTitle.text = this.getLabelText(this._blockTitle);
         //this.view.lblBlockTitle.setActive(true);
        this.view.lblField1Tab2.text = this.getLabelText(this._Tab2Field1Label);
        this.view.lblField2Tab2.text = this.getLabelText(this._Tab2AddressLine1);
        this.view.lblField3Tab2.text = this.getLabelText(this._Tab2AddressLine2);
        this.view.lblField4Tab2.text = this.getLabelText(this._Tab2CountryLabel);
        this.view.lblFieldState.text = this.getLabelText(this._Tab2StateLabel);
        this.view.lblFieldCity.text = this.getLabelText(this._Tab2CityLabel);
        this.view.lblFieldZipCode.text = this.getLabelText(this._Tab2ZipCodeLabel);
        this.view.lblField6Tab2.text = this.getLabelText(this._Tab2Field8Label);
        this.view.lblField7Tab2.text = this.getLabelText(this._Tab2Field9Label);
        this.view.lblField8Tab2.text = this.getLabelText(this._Tab2Field10Label);
        this.view.lblField10Tab2.text = this.getLabelText(this._Tab2Field11Label);
        this.view.lblField11Tab2.text = this.getLabelText(this._Tab2Field12Label);
        this.view.lblRememberMe.text = this.getLabelText(this._Tab2CheckBoxLabel);

        var tbx1JSON = this.getParsedValue(this._Tab2Field1Value);
        if(tbx1JSON) {
          this.mapTextBoxValueToContext(tbx1JSON, "tbx1Tab2");
          this.setTextBoxPlaceHolder(tbx1JSON, "tbx1Tab2");
          this.setTextBoxInputModeAndMasking(tbx1JSON, "tbx1Tab2");
          this.setTextBoxInfoIcon(tbx1JSON, "imgInfo6", "lblInfoHeader1Tab2", "lblInfoText1Tab2");
          this.setTextBoxToolTip(tbx1JSON, "tbx1Tab2");
        }
        else {
          this.view.flxTab2Field1.isVisible = false;
          this.view.tbx1Tab2.isVisible = false;
        }
        var tbx2JSON = this.getParsedValue(this._Tab2AddressLine1Value);
        if(tbx2JSON) {
          this.mapTextBoxValueToContext(tbx2JSON, "tbx2Tab2");
          this.setTextBoxPlaceHolder(tbx2JSON, "tbx2Tab2");
          this.setTextBoxInputModeAndMasking(tbx2JSON, "tbx2Tab2");
          this.setTextBoxInfoIcon(tbx2JSON, "imgInfo7", "lblInfoHeader2Tab2", "lblInfoText2Tab2");
          this.setTextBoxToolTip(tbx2JSON, "tbx2Tab2");
        }
        else {
          this.view.flxTab2Field2.isVisible = false;
          this.view.tbx2Tab2.isVisible = false;
        }
        var tbx3JSON = this.getParsedValue(this._Tab2AddressLine2Value);
        if(tbx3JSON) {
          this.mapTextBoxValueToContext(tbx3JSON, "tbx3Tab2");
          //this.setTextBoxPlaceHolder(tbx3JSON, "tbx3Tab2");
          this.setTextBoxInputModeAndMasking(tbx3JSON, "tbx3Tab2");
          this.setTextBoxInfoIcon(tbx3JSON, "imgInfo8", "lblInfoHeader3Tab2", "lblInfoText3Tab2");
          this.setTextBoxToolTip(tbx3JSON, "tbx3Tab2");
        }
        else {
          this.view.flxTab2Field3.isVisible = false;
          this.view.tbx3Tab2.isVisible = false;
        }
        var lbxCountryJSON = this.getParsedValue(this._Tab2CountryValue);
        if(lbxCountryJSON) {
          this.mapTextBoxValueToContext(lbxCountryJSON, "country");
        }
        else {
          this.view.flxField4.isVisible = false;
        }
        var lbxStateJSON = this.getParsedValue(this._Tab2StateValue);
        if(lbxStateJSON) {
          this.mapTextBoxValueToContext(lbxStateJSON, "state");
        }
        else {
          this.view.flxFieldState.isVisible = false;
        }
        var tbxCityJSON = this.getParsedValue(this._Tab2CityValue);
        if(tbxCityJSON) {
          this.mapTextBoxValueToContext(tbxCityJSON, "tbx5Tab2");
          this.setTextBoxPlaceHolder(tbxCityJSON, "tbx5Tab2");
          this.setTextBoxInputModeAndMasking(tbxCityJSON, "tbx5Tab2");
          this.setTextBoxInfoIcon(tbxCityJSON, "imgInfo10", "lblInfoHeader5Tab2", "lblInfoText5Tab2");
          this.setTextBoxToolTip(tbxCityJSON, "tbx5Tab2");
        }
        else {
          this.view.flxFieldCity.isVisible = false;
        }
        var tbxZipCodeJSON = this.getParsedValue(this._Tab2ZipCodeValue);
        if(tbxZipCodeJSON) {
          this.mapTextBoxValueToContext(tbxZipCodeJSON, "tbxZipCodeTab2");
          this.setTextBoxPlaceHolder(tbxZipCodeJSON, "tbxZipCodeTab2");
          this.setTextBoxInputModeAndMasking(tbxZipCodeJSON, "tbxZipCodeTab2");
          this.setTextBoxInfoIcon(tbxZipCodeJSON, "imgInfo12", "lblInfoHeaderZipTab2", "lblInfoTextZipTab2");
          this.setTextBoxToolTip(tbxZipCodeJSON, "tbxZipCodeTab2");
        }
        else {
          this.view.flxFieldZipCode.isVisible = false;
        }
        var tbx6JSON = this.getParsedValue(this._Tab2Field8Value);
        if(tbx6JSON) {
          this.mapTextBoxValueToContext(tbx6JSON, "tbx6Tab2");
          this.setTextBoxPlaceHolder(tbx6JSON, "tbx6Tab2");
          this.setTextBoxInputModeAndMasking(tbx6JSON, "tbx6Tab2");
          this.setTextBoxInfoIcon(tbx6JSON, "imgInfo13", "lblInfoHeader6", "lblInfoText6");
          this.setTextBoxToolTip(tbx6JSON, "tbx6Tab2");
        }
        else {
          this.view.flxTab2Field8.isVisible = false;
          this.view.tbx6Tab2.isVisible = false;
        }
        var tbx7JSON = this.getParsedValue(this._field9ValueTab2);
        if(tbx7JSON) {
          this.mapTextBoxValueToContext(tbx7JSON, "tbx7Tab2");
          this.setTextBoxPlaceHolder(tbx7JSON, "tbx7Tab2");
          this.setTextBoxInputModeAndMasking(tbx7JSON, "tbx7Tab2");
          this.setTextBoxInfoIcon(tbx7JSON, "imgInfo15", "lblInfoHeader7Tab2", "lblInfoText7Tab2");
          this.setTextBoxToolTip(tbx7JSON, "tbx7Tab2");
        }
        else {
          this.view.flxTab2Field9.isVisible = false;
          this.view.tbx7Tab2.isVisible = false;
        }
        var tbx8JSON = this.getParsedValue(this._Tab2Field10Value);
        if(tbx8JSON) {
          this.mapTextBoxValueToContext(tbx8JSON, "tbx8Tab2");
          this.setTextBoxPlaceHolder(tbx8JSON, "tbx8Tab2");
          this.setTextBoxInputModeAndMasking(tbx8JSON, "tbx8Tab2");
          this.setTextBoxInfoIcon(tbx8JSON, "imgInfo14", "lblInfoHeader8Tab2", "lblInfoText8Tab2");
          this.setTextBoxToolTip(tbx8JSON, "tbx8Tab2");
        }
        else {
          this.view.lblField8Tab2.isVisible = false;
          this.view.tbx8Tab2.isVisible = false;
        }
        var tbx10JSON = this.getParsedValue(this._Tab2Field11Value);
        if(tbx10JSON) {
          this.mapTextBoxValueToContext(tbx10JSON, "tbx10Tab2");
          this.setTextBoxPlaceHolder(tbx10JSON, "tbx10Tab2");
          this.setTextBoxInputModeAndMasking(tbx10JSON, "tbx10Tab2");
          this.setTextBoxInfoIcon(tbx10JSON, "imgInfo15", "lblInfoHeader8Tab2", "lblInfoText8Tab2");
          this.setTextBoxToolTip(tbx10JSON, "tbx10Tab2");
        }
        else {
          this.view.flxTab2Field10.isVisible = false;
          this.view.tbx10Tab2.isVisible = false;
        }
        var tbx11JSON = this.getParsedValue(this._Tab2Field11Value);
        if(tbx11JSON) {
          this.mapTextBoxValueToContext(tbx11JSON, "tbx11Tab2");
          this.setTextBoxPlaceHolder(tbx11JSON, "tbx11Tab2");
          this.setTextBoxInputModeAndMasking(tbx11JSON, "tbx11Tab2");
          this.setTextBoxInfoIcon(tbx11JSON, "imgInfo16", "lblInfoHeader8Tab2", "lblInfoText8Tab2");
          this.setTextBoxToolTip(tbx11JSON, "tbx11Tab2");
        }
        else {
          this.view.flxTab2Field11.isVisible = false;
          this.view.tbx11Tab2.isVisible = false;
        }
        this.updateContext("tbx1Tab2",this.view.tbx1Tab2.text);
        this.updateContext("tbx2Tab2",this.view.tbx2Tab2.text.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/=/g,"&eq;")); 
        this.updateContext("tbx3Tab2",this.view.tbx3Tab2.text);  
        this.updateContext("tbx5Tab2",this.view.tbx5Tab2.text);
        this.updateContext("tbxZipCodeTab2",this.view.tbxZipCodeTab2.text);
        this.updateContext("tbx6Tab2",this.view.tbx6Tab2.text); 
        this.updateContext("tbx7Tab2",this.view.tbx7Tab2.text);
        this.view.btnEnterPayeeInfo.setActive(true);

        this.view.forceLayout();
      }
    },
    /**
     * @api : mapTextBoxValueToContext
     * used to map text box value to context
	 * @params : "contractJSON" contract json having all contracts for the widget.
	 * @params : "textBoxID" is the id of textbox to map value in context.
     * @return : NA.
     */
    mapTextBoxValueToContext: function(contractJSON, textBoxID) {
      if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(contractJSON) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(contractJSON.mapping)){
        var inputMapper = contractJSON.mapping.substring(5,contractJSON.mapping.length-1);
        this.textInputsMapping[textBoxID] = inputMapper;
      }
    },
	/**
     * @api : setTextBoxInputModeAndMasking
     * used to change input mode to masking.
	 * @params : "contractJSON" contract json having all contracts for the widget.
	 * @params : "srcWidget" is the id of textbox to change input mode.
     * @return : NA.
     */
    setTextBoxInputModeAndMasking: function (contractJSON, srcWidget) {
      if (!this.addPayeeUtility.isNullOrUndefinedOrEmpty(contractJSON.inputMode)) {
        this.view[srcWidget].textInputMode = constants.TEXTBOX_INPUT_MODE_ANY;
        if (contractJSON.inputMode === "NUMERIC") {
          this.view[srcWidget].restrictCharactersSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_-\\?/+={[]}:;,.<>'`|\"";
        } else {
          this.view[srcWidget].restrictCharactersSet = "";
        }
        this.view[srcWidget].secureTextEntry = contractJSON.isMaskingEnabled ? contractJSON.isMaskingEnabled : false;
        return;
      }
      this.view[srcWidget].restrictCharactersSet = "";
      this.view[srcWidget].textInputMode = constants.TEXTBOX_INPUT_MODE_ANY;
      this.view[srcWidget].secureTextEntry = contractJSON.isMaskingEnabled ? contractJSON.isMaskingEnabled : false;
    },
	/**
     * @api : setTextBoxInfoIcon
     * used to set the info icon for a text box.
	 * @params : "contractJSON" contract json having all contracts for the widget.
	 * @params : "imgWidget" is the id of image widget.
	 * @params : "headerWidget" is the id of the header widget.
	 * @params : "labelWidget" is the id of the label widget.
     * @return : NA.
     */
    setTextBoxInfoIcon: function(contractJSON, imgWidget, headerWidget, labelWidget) {
      if(contractJSON.infoIconText) {        
        this.view[imgWidget] ? this.view[imgWidget].isVisible = true : kony.print("widget not present");
        var infoIconHeader = this.getParsedValue
        (contractJSON.infoIconText.header,kony.application.getCurrentBreakpoint());
        var infoIconText = this.getParsedValue
        (contractJSON.infoIconText.text,kony.application.getCurrentBreakpoint());
        this.view[headerWidget] ? this.view[headerWidget].text = infoIconHeader : kony.print("widget not present");
        this.view[labelWidget] ? this.view[labelWidget].text = infoIconText : kony.print("widget not present");
      }
      else {
        this.view[imgWidget] ? this.view[imgWidget].isVisible = false : kony.print("widget not present");
      }
    },
    /**
     * @api : setTextBoxToolTip
     * used to set the tool tip for text box.
	 * @params : "contractJSON" contract json having all contracts for the widget.
	 * @params : "tbxWidget" is the id of textbox widget.
     * @return : NA.
     */
    setTextBoxToolTip: function(contractJSON, tbxWidget) {
      if(contractJSON.tooltip) {
        this.view[tbxWidget].toolTip = "";
      }
    },
	/**
     * @api : setTextBoxPlaceHolder
     * used to set the place holder text box.
	 * @params : "contractJSON" contract json having all contracts for the widget.
	 * @params : "tbxWidget" is the id of textbox widget.
     * @return : NA.
     */
    setTextBoxPlaceHolder: function(contractJSON, tbxWidget) {
      if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(contractJSON.placeHolder)) {
        var placeHolderValue = this.getParsedValue
        (contractJSON.placeHolder,kony.application.getCurrentBreakpoint());
        this.view[tbxWidget].placeholder =
          placeHolderValue ? placeHolderValue : "";
        // this.view[tbxWidget].accessibilityConfig = {
        //   "a11yLabel": "",
        //   "a11yARIA": {
        //     "tabindex": 0,
        //     "aria-autocomplete": "none"
        //   }
        // }
      }
    },
	/**
     * @api : extractValuefromJSON
     * used to extract value from JSON.
	 * @params : "JSON" contract json having all contracts for the widget.
	 * @params : "widget" is the id of textbox widget.
     * @return : NA.
     */
    extractValuefromJSON : function(JSON, widget) {
      var lblValueJSON = this.getParsedValue(JSON);
      if(lblValueJSON) {
        var lblValue = this.getParsedValue(lblValueJSON.text);
        this.view[widget].text = lblValue;
      }
    },
    /**
     * @api : formatAddressvalue
     * used to format address value.
	 * @params : "widget" is the id of textbox widget.
     * @return : NA.
     */
    formatAddressvalue : function(widget)
    {
      var format = this.view[widget].text
      format = format.replace(/, , , , ,|, ,|, , ,|, , , ,/g,',');
      format = format.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/=/g,"&eq;");
      if(format.startsWith(","))
      {format = format.replace(format.charAt(0), "");}
      if(format.charAt(format.length-1) == ",")
      {
        format = format.replace(format.charAt(format.length-1), "");
      }
      this.view[widget].text = format;
    },
	/**
     * @api : setScreen2Data
     * used to set screen 2 data.
     * @return : NA.
     */
    setScreen2Data: function() {
      this.clearPayeeDetailsValidationErrors();
      this.view.editlblHeader.text = this.getLabelText(this._editSectionTitle);
      this.view.editlblKey1.text = this.getLabelText(this._editField1Label);
      this.view.editlblKey2.text = this.getLabelText(this._editField2Label);
      this.view.editlblKey3.text = this.getLabelText(this._editField3Label);
      this.view.editlblKey4.text = this.getLabelText(this._editField4Label);
      this.view.editlblKey5.text = this.getLabelText(this._editField5Label);

      var editValue1 = this.getParsedValue(this._editField1Value);
      if(editValue1.fieldType == "Label") {
        this.view.lblEditValue1.isVisible = true;
        this.view.editFormatValue1.isVisible = false;
        this.extractValuefromJSON(this._editField1Value, "lblEditValue1");
      }
      else {
        this.view.lblEditValue1.isVisible = false;
        this.view.editFormatValue1.isVisible = true;
        this.setFormatValueText(this._editField1Value, "editFormatValue1");
      } 
      var editValue2 = this.getParsedValue(this._editField2Value);
      if(this.componentContext['addressLine2'] === "") {
        if(editValue2.fieldType == "Label") {
          this.view.lblEditValue2.isVisible = true;
          this.view.editFormatValue2.isVisible = false;
          this.extractValuefromJSON(this._payeeDetailsField2Value, "lblEditValue2");
          this.formatAddressvalue("lblEditValue2");
        }
        else {
          this.view.lblEditValue2.isVisible = false;
          this.view.editFormatValue2.isVisible = true;
          this.setFormatValueText(this._payeeDetailsField2Value, "editFormatValue2");
        } 
      }
      else {
        if(editValue2.fieldType == "Label") {
          this.view.lblEditValue2.isVisible = true;
          this.view.editFormatValue2.isVisible = false;
          this.extractValuefromJSON(this._editField2Value, "lblEditValue2");
        }
        else {
          this.view.lblEditValue2.isVisible = false;
          this.view.editFormatValue2.isVisible = true;
          this.setFormatValueText(this._editField2Value, "editFormatValue2");
        } 
      }
      var editValue3 = this.getParsedValue(this._editField3Value);
      if(this.view.btnEnterPayeeInfo.skin === "ICSknsknBtnAccountSummarySelected17Px" && this.view.lblRememberMeIcon.skin === "sknlblDelete20px") {
        this.view.editFormatValue3.isVisible = false;
        this.view.lblEditValue3.text = kony.i18n.getLocalizedString("i18n.payments.notApplicable");
        this.view.lblEditValue3.isVisible = true;
      }
      else {
        if(editValue3.fieldType == "Label") {
          this.view.lblEditValue3.isVisible = true;
          this.view.editFormatValue3.isVisible = false;
          this.extractValuefromJSON(this._editField3Value, "lblEditValue3");
        }
        else {
          this.view.lblEditValue3.isVisible = false;
          this.view.editFormatValue3.isVisible = true;
          this.setFormatValueText(this._editField3Value, "editFormatValue3");
        }
      }

      var tbx1JSON = this.getParsedValue(this._editField4Value);
      this.mapTextBoxValueToContext(tbx1JSON, "tbx4Edit");
      this.setTextBoxPlaceHolder(tbx1JSON, "tbx4");
      this.setTextBoxInputModeAndMasking(tbx1JSON, "tbx4");
      this.setTextBoxInfoIcon(tbx1JSON, "imgInfo8", "lblInfoHeader8", "lblInfoText8");
     this.setTextBoxToolTip(tbx1JSON, "tbx4");

      if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx1JSON) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx1JSON.text)){
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(this.parserUtilsManager.getContextValue(this.textInputsMapping["tbx4Edit"])))
          this.view.tbx4.text = this.getParsedValue(tbx1JSON.text);
      }

      var tbx2JSON = this.getParsedValue(this._editField5Value);
      this.mapTextBoxValueToContext(tbx2JSON, "tbx5Edit");
      this.setTextBoxPlaceHolder(tbx2JSON, "tbx5");
      this.setTextBoxInputModeAndMasking(tbx2JSON, "tbx5");
      this.setTextBoxInfoIcon(tbx2JSON, "imgInfo9", "lblInfoHeader9", "lblInfoText9");
      this.setTextBoxToolTip(tbx2JSON, "tbx5");

      if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx2JSON) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx2JSON.text)){
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(this.parserUtilsManager.getContextValue(this.textInputsMapping["tbx4Edit"])))
          this.view.tbx5.text = this.getParsedValue(tbx2JSON.text);
      }

    },
	/**
     * @api : setScreen4Data
     * used to set screen 4 data.
     * @return : NA.
     */
    setScreen4Data: function(data) {
      this.view.lblBlockTitle.text = kony.i18n.getLocalizedString("infinity.addPayee.addPayeeConfirmationTitle");
       //this.view.lblBlockTitle.setActive(true);
      this.view.lblHeader2.text = this.getLabelText(this._reviewSectionTitle);
      this.view.lblKey1.text = this.getLabelText(this._reviewField1Label);
      this.view.lblKey2.text = this.getLabelText(this._reviewField2Label);
      this.view.lblKey3.text = this.getLabelText(this._reviewField3Label);
      this.view.lblKey4.text = this.getLabelText(this._reviewField4Label);
      this.view.lblKey5.text = this.getLabelText(this._reviewField5Label);

      var reviewValue1 = this.getParsedValue(this._reviewField1Value);
      if(reviewValue1.fieldType == "Label") {
        this.view.lblValue1.isVisible = true;
        this.view.FormatValue.isVisible = false; 
        this.extractValuefromJSON(this._reviewField1Value, "lblValue1");
      }
      else {
        this.view.lblValue1.isVisible = false;
        this.view.FormatValue.isVisible = true; 
        this.setFormatValueText(this._reviewField1Value, "FormatValue");
      }
      var reviewValue2 = this.getParsedValue(this._reviewField2Value);
      if(this.componentContext['addressLine2'] === "") {
        if(reviewValue2.fieldType == "Label") {
          this.view.lblValue2.isVisible = true;
          this.view.FormatValue1.isVisible = false; 
          this.extractValuefromJSON(this._reviewDetailsField2Value, "lblValue2");
          this.formatAddressvalue("lblValue2");
        }
        else {
          this.view.lblValue2.isVisible = false;
          this.view.FormatValue1.isVisible = true; 
          this.setFormatValueText(this._reviewDetailsField2Value, "FormatValue1");
        }
      }
      else {
        if(reviewValue2.fieldType == "Label") {
          this.view.lblValue2.isVisible = true;
          this.view.FormatValue1.isVisible = false; 
          this.extractValuefromJSON(this._reviewField2Value, "lblValue2");
        }
        else {
          this.view.lblValue2.isVisible = false;
          this.view.FormatValue1.isVisible = true; 
          this.setFormatValueText(this._reviewField2Value, "FormatValue1");
        }
      }
      var reviewValue3 = this.getParsedValue(this._reviewField3Value);
      if(this.view.btnEnterPayeeInfo.skin === "ICSknsknBtnAccountSummarySelected17Px" && this.view.lblRememberMeIcon.skin === "sknlblDelete20px") {
        this.view.FormatValue2.isVisible = false;
        this.view.lblValue3.text = "Not Applicable";
        this.view.lblValue3.isVisible = true;
      }
      else {
        if(reviewValue3.fieldType == "Label") {
          this.view.lblValue3.isVisible = true;
          this.view.FormatValue2.isVisible = false;   
          this.extractValuefromJSON(this._reviewField3Value, "lblValue3");
        }
        else {
          this.view.lblValue3.isVisible = false;
          this.view.FormatValue2.isVisible = true; 
          this.setFormatValueText(this._reviewField3Value, "FormatValue2");
        }
      }
      var reviewValue4 = this.getParsedValue(this._reviewField4Value);
      if(reviewValue4.fieldType == "Label") {
        this.view.lblValue4.isVisible = true;
        this.view.FormatValue3.isVisible = false;        
        this.extractValuefromJSON(this._reviewField4Value, "lblValue4");
      }
      else {
        this.view.lblValue4.isVisible = false;
        this.view.FormatValue3.isVisible = true; 
        this.setFormatValueText(this._reviewField4Value, "FormatValue3");
      }
      var reviewValue5 = this.getParsedValue(this._reviewField5Value);
      if(reviewValue5.fieldType == "Label") {
        this.view.lblValue5.isVisible = true;
        this.view.FormatValue4.isVisible = false;        
        this.extractValuefromJSON(this._reviewField5Value, "lblValue5");
      }
      else {
        this.view.lblValue5.isVisible = false;
        this.view.FormatValue4.isVisible = true; 
        this.setFormatValueText(this._reviewField5Value, "FormatValue4");
      }
      if(data != null){
        var profileAccess = this.profileAccess;
        if(Array.isArray(data)){
          this.view.screenConfirmContract.setContext({"data":data, "profileAccess": profileAccess});
        }else if(data.hasOwnProperty("contracts")){
          this.view.screenConfirmContract.setContext({"serverData":data, "profileAccess": profileAccess});
        }
      }
      this.view.screenConfirmContract.setParentScope(this);
      this.view.screenConfirmContract.initializeComponent();
      if (kony.application.getCurrentBreakpoint() === 640) {
                this.view.lblHeader2.setActive(true);
            }
            else{
                this.view.lblBlockTitle.setActive(true);
            }
            this.view.forceLayout();
    },
   
	/**
     * @api : setScreen5Data
     * used to set screen 5 data.
     * @return : NA.
     */
    setScreen5Data: function(data) {
      this.view.lblBlockTitle.text = kony.i18n.getLocalizedString("infinity.addPayeeAcknowledgementHeader");
      this.setScreen5Section1Data();
      this.setScreen5Section2Data();
      if(data.serverData) { 
        this.view.flxScreenAckComp.setVisibility(false);
      }
      else if(data.data && data["data"][0] && data["data"][0].length >1){
        this.view.screenAckContract.setContext(data);
        this.view.screenAckContract.setParentScope(this);
        this.view.screenAckContract.initializeComponent();
        this.view.flxScreenAckComp.setVisibility(true);	
      } 
      else{
        this.view.flxScreenAckComp.setVisibility(false);
      }

    },
	/**
     * @api : setScreen5Section2Data
     * used to set screen 5  section 2data.
     * @return : NA.
     */
    setScreen5Section2Data: function() {
      this.view.lblConfirmHeader.text = this.getLabelText(this._ackSection2Title);
      this.view.lblField1Key.text = this.getLabelText(this._ackField1Label);
      this.view.lblField2Key.text = this.getLabelText(this._ackField2Label);
      this.view.lblField3KEy.text = this.getLabelText(this._ackField3Label);
      this.view.lblField4KEy.text = this.getLabelText(this._ackField4Label);
      this.view.lblField5Key.text = this.getLabelText(this._ackField5Label);

      var ackValue1 = this.getParsedValue(this._ackField1Value);
      if(ackValue1.fieldType == "Label") {
        this.view.lblField1Value.isVisible = true;
        this.view.FormatValue6.isVisible = false;   
        this.extractValuefromJSON(this._ackField1Value, "lblField1Value");
      }
      else {
        this.view.lblField1Value.isVisible = false;
        this.view.FormatValue6.isVisible = true; 
        this.setFormatValueText(this._ackField1Value, "FormatValue6");
      }
      var ackValue2 = this.getParsedValue(this._ackField2Value);
      if(this.componentContext['addressLine2'] === "") {
        if(ackValue2.fieldType == "Label") {
          this.view.lblField2Value.isVisible = true;
          this.view.FormatValue7.isVisible = false;        
          this.extractValuefromJSON(this._ackDetailsField2Value, "lblField2Value");
		  this.formatAddressvalue("lblField2Value");
        }
        else {
          this.view.lblField2Value.isVisible = false;
          this.view.FormatValue7.isVisible = true; 
          this.setFormatValueText(this._ackDetailsField2Value, "FormatValue7");
        }
      }
      else {
        if(ackValue2.fieldType == "Label") {
          this.view.lblField2Value.isVisible = true;
          this.view.FormatValue7.isVisible = false;        
          this.extractValuefromJSON(this._ackField2Value, "lblField2Value");
		  this.formatAddressvalue("lblField2Value");
        }
        else {
          this.view.lblField2Value.isVisible = false;
          this.view.FormatValue7.isVisible = true; 
          this.setFormatValueText(this._ackField2Value, "FormatValue7");
        }
      }
      var ackValue3 = this.getParsedValue(this._ackField3Value);
     if(this.view.btnEnterPayeeInfo.skin === "ICSknsknBtnAccountSummarySelected17Px" && this.view.lblRememberMeIcon.skin === "sknlblDelete20px") {
        this.view.FormatValue8.isVisible = false;
        this.view.lblField3Value.text = "Not Applicable";
        this.view.lblField3Value.isVisible = true;
      }
      else {
        if(ackValue3.fieldType == "Label") {
          this.view.lblField3Value.isVisible = true;
          this.view.FormatValue8.isVisible = false;        
          this.extractValuefromJSON(this._ackField3Value, "lblField3Value");
        }
        else {
          this.view.lblField3Value.isVisible = false;
          this.view.FormatValue8.isVisible = true; 
          this.setFormatValueText(this._ackField3Value, "FormatValue8");        
        }
      }
      var ackValue4 = this.getParsedValue(this._ackField4Value);
      if(ackValue4.fieldType == "Label") {
        this.view.lblField4Value.isVisible = true;
        this.view.FormatValue9.isVisible = false;        
        this.extractValuefromJSON(this._ackField4Value, "lblField4Value");
      }
      else {
        this.view.lblField4Value.isVisible = false;
        this.view.FormatValue9.isVisible = true; 
        this.setFormatValueText(this._ackField4Value, "FormatValue9");
      }
      var ackValue5 = this.getParsedValue(this._ackField5Value);
      if(ackValue5.fieldType == "Label") {
        this.view.lblField5Value.isVisible = true;
        this.view.FormatValue10.isVisible = false;
        this.extractValuefromJSON(this._ackField5Value, "lblField5Value");
      }
      else {
        this.view.lblField5Value.isVisible = false;
        this.view.FormatValue10.isVisible = true; 
        this.setFormatValueText(this._ackField5Value, "FormatValue10");
      }
    },
	/**
     * @api : setScreen5Section2Data
     * used to set screen 5  section 2data.
     * @return : NA.
     */
    setScreen5Section1Data: function() {
      var self = this;
      try{
        this.view.lblSection1Header.text = this.getLabelText(this._ackSection1Title);
        this.view.lblRefrenceNumberValue.text = this.getLabelText(this._ackReferenceValue);
        this.view.lblRefrenceNumber.text = this.getLabelText(this._ackReferenceText);
        if(this.FlowType === "ADD") {
          this.view.lblSection1Message.text = JSON.stringify(this.getLabelText(this._ackText)).replace(/"/g, "'") + " " + kony.i18n.getLocalizedString("i18n.common.HasBeenAddedSuccessfully");
          this.view.lblBlockTitle.text = kony.i18n.getLocalizedString("infinity.addPayeeAcknowledgementHeader");
          if (kony.application.getCurrentBreakpoint() === 640) {
                        this.view.lblSection1Header.setActive(true);
                    }
                    else{
                        this.view.lblBlockTitle.setActive(true);
                    }
        var frm=kony.application.getCurrentForm();
					frm.title= kony.i18n.getLocalizedString("infinity.addPayeeAcknowledgementHeader");
        }
        else {
          this.view.lblSection1Message.text = JSON.stringify(this.getLabelText(this._editAckText)).replace(/"/g, "'") + " " + kony.i18n.getLocalizedString("i18n.common.HasBeenAddedSuccessfully");
          this.view.lblBlockTitle.text = kony.i18n.getLocalizedString("infinity.editPayeeAcknowledgementHeader");
           //this.view.lblBlockTitle.setActive(true);
           if (kony.application.getCurrentBreakpoint() === 640) {
                        this.view.lblSection1Header.setActive(true);
                    }
                    else{
                        this.view.lblBlockTitle.setActive(true);
                    }
          this.view.lblRefrenceNumberValue.text = this.componentContext.payeeId;
        }
        var ackImage = this.getParsedImgSource(this._ackImage);
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
     * @api : getParsedImgSource
     * used to parse image sourse.
	 * @params : "property" is the property that needs to be parsed.
     * @return : NA.
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
     * @api : getLabelText
     * used to text to label.
	 * @params : "contractJSON" is the property that contains text.
     * @return : NA.
     */
    getLabelText: function(contractJSON) {
      let labelText = this.getParsedValue
      (contractJSON,kony.application.getCurrentBreakpoint());
      return labelText ? labelText : "";
    },
	/**
     * @api : setFormatValueText
     * used to text to label.
	 * @params : "contractJSON" is the property that contains all contracts.
	 * @params : "srcWidget" is widget id whose text to be formatted.
     * @return : NA.
     */
    setFormatValueText: function(contractJSON, srcWidget) {
      var formatValues = this.getFormatValueConfig();
      var lblValueJSON = this.getParsedValue(contractJSON);
      if(contractJSON !== null){
        var lblValue = this.getParsedValue(lblValueJSON.text);
        var lblType = this.getParsedValue(lblValueJSON.fieldType);
        this.view[srcWidget].UpdateCustomProperties
        (this.addPayeeUtility.setFormattedData(formatValues,lblValue,lblType));
        this.view[srcWidget].formatText();
      }
    },
	/**
     * @api : getFormatValueConfig
     * used to get config for format value.
     * @return : NA.
     */
    getFormatValueConfig: function() {
      var currentBreakPoint = kony.application.getCurrentBreakpoint();
      var formatConfig={
        "accountNumberformat" : this._accountNumberFormat,
        "masking" : this._masking,
        "maskeyeicon" : this._maskeyeicon,
        "unmaskeyeicon" : this._unmaskeyeicon,
        "maskeyeiconskin" : JSON.stringify
        (this.addPayeeUtility.breakPointParser(JSON.parse(this._maskeyeiconskin), currentBreakPoint)),
        "unmaskeyeiconskin" : JSON.stringify
        (this.addPayeeUtility.breakPointParser(JSON.parse(this._unmaskeyeiconskin), currentBreakPoint)),
        "accountNumberSkin" : JSON.stringify
        (this.addPayeeUtility.breakPointParser(JSON.parse(this._accountNumberSkin), currentBreakPoint)),
        "textSkin" : JSON.stringify
        (this.addPayeeUtility.breakPointParser(JSON.parse(this._accountNumberSkin), currentBreakPoint))
      };
      for(var key in formatConfig){
        this.formatComponentValues[key]=formatConfig[key];
      }
      return this.formatComponentValues;
    },
    /**
     * @api : setTabsData
     * used to set tabs data.
     * @return : NA.
     */
    setTabsData: function() {
      this.view.btnSearchPayee.text = this.getParsedValue(this._tab1Title, kony.application.getCurrentBreakpoint());
      this.view.btnEnterPayeeInfo.text = this.getParsedValue(this._tab2Title, kony.application.getCurrentBreakpoint());
    },
	/**
     * @api : initActions
     * used to set actions for all widgets.
     * @return : NA.
     */
    initActions: function() {
      var scope = this;
//       this.view.btnYes.onClick =  this.actionHandler.bind(this,this.context,this._reviewCancelYesButton);
      this.view.btnYes.onClick = function() {
        var form = kony.application.getCurrentForm();
        scope.hideRightFlx();
        form.remove(form.flxPopup);
        scope.navigateToViewAllPayees(scope.componentContext);

      };
      this.view.flexcheckuncheck.onClick = scope.toggleCheckBox.bind();
      this.view.tbx1Tab1.onKeyUp = scope.debounce(scope.callOnKeyUp.bind(scope),this._characterDelay);
      //this.view.tbx1Tab1.onKeyUp = scope.updateSearchString;      
      this.view.btnCancel.onClick = scope.actionHandler.bind(this,this.context,this._editFlowButton1);
      this.view.btnSave.onClick = function(){
        scope.actionHandler(scope.context,scope._editFlowButton2);
        scope.hideRightFlx();
      };
      this.view.btnSearchPayee.onClick = scope.setContentVisiblityBasedOnTabName.bind(this,"btnSearchPayee");
      this.view.btnEnterPayeeInfo.onClick = scope.setContentVisiblityBasedOnTabName.bind(this,"btnEnterPayeeInfo");
      this.view.btnRight1.onClick = function(){
        scope.actionHandler(scope.context,scope._tab1Button2);
		scope.view.btnBypass.setVisibility(false);
        if(scope.view.flxEditPayeeDetails.isVisible){
        if (kony.application.getCurrentBreakpoint() === 640) {
                    scope.view.editlblHeader.setActive(true);
                }
                else{
                    scope.view.lblBlockTitle.setActive(true);
                }
        scope.view.forceLayout();
        }
		       // scope.view.lblBlockTitle.setActive(true);
      }
      this.view.btnRight2.onClick = scope.actionHandler.bind(this,this.context,this._Tab1Button1);
     // this.view.editDetailsBtnRight1.onClick = scope.actionHandler.bind(this,this.context,this._editButton3);
     this.view.editDetailsBtnRight1.onClick = function() {
        scope.actionHandler(scope.context, scope._editButton3);
        scope.view.forceLayout();
        if(scope.view.flxContractList.isVisible) {
          scope.view.lblBlockTitle.setActive(true);
        } else {
            scope.view.tbx5.setActive(true);
        }
      }
      
      //this.view.editDetailsBtnRight2.onClick = scope.actionHandler.bind(this,this.context,this._editButton2);
	  this.view.editDetailsBtnRight2.onClick = function() {
			scope.actionHandler(scope.context, scope._editButton2);
			scope.view.btnBypass.setVisibility(true);
            }
      //this.view.editDetailsBtnRight3.onClick = scope.actionHandler.bind(this,this.context,this._editButton1);
	  this.view.editDetailsBtnRight3.onClick = function() {
			scope.actionHandler(scope.context, scope._editButton1);
			scope.view.btnBypass.setVisibility(false);
    }
      //this.view.btnAction6.onClick = scope.actionHandler.bind(this,this.context,this._reviewButton3);
	  this.view.btnAction6.onClick = function() {
			scope.actionHandler(scope.context, scope._reviewButton3);
			scope.view.btnBypass.setVisibility(false);
            scope.view.forceLayout();
			scope.view.lblBlockTitle.setActive(true);
            }
      //this.view.btnAction5.onClick = scope.actionHandler.bind(this,this.context,this._reviewButton2);
	    this.view.btnAction5.onClick = function() {
			scope.actionHandler(scope.context, scope._reviewButton2);
			scope.view.btnBypass.setVisibility(true);
            if (kony.application.getCurrentBreakpoint() === 640) {
                    scope.view.btnSearchPayee.setActive(true);
                }
                
            }
      this.view.btnAction4.onClick = scope.actionHandler.bind(this,this.context,this._reviewButton1);
      this.view.btnConfirm.onClick = scope.actionHandler.bind(this,this.context,this._categoryButton3);
      this.view.btnModify.onClick = scope.actionHandler.bind(this,this.context,this._categoryButton2);
      this.view.btnCancelAccount.onClick = scope.actionHandler.bind(this,this.context,this._categoryButton1);
      this.view.btnAddAnotherRecipient.onClick = function(){
        scope.hideRightFlx();
        scope.navigateToPayABill(scope.makePaymentContext);
      }
      this.view.btnNewTransfer.onClick = scope.ackButtonsAction.bind(this,this.context,this._ackButton2);
      this.view.btn3.onClick = scope.actionHandler.bind(this,this.context,this._editFlowButton2);
      this.view.imgInfo1.onTouchEnd = this.showInfoPopup.bind(this,this.view.flxinfo1);
      this.view.imgInfo2.onTouchEnd = this.showInfoPopup.bind(this,this.view.flxInfo2);
      this.view.imgInfo3.onTouchEnd = this.showInfoPopup.bind(this,this.view.flxInfo3);
      this.view.imgInfo4.onTouchEnd = this.showInfoPopup.bind(this,this.view.flxInfo4);
      this.view.imgInfo5.onTouchEnd = this.showInfoPopup.bind(this,this.view.flxInfo5);
      this.view.imgInfo6.onTouchEnd = this.showInfoPopup.bind(this,this.view.flxInfo6);
      this.view.imgInfo7.onTouchEnd = this.showInfoPopup.bind(this,this.view.flxInfo7);
      this.view.imgInfo8.onTouchEnd = this.showInfoPopup.bind(this,this.view.flxInfo8);
      this.view.imgInfo9.onTouchEnd = this.showInfoPopup.bind(this,this.view.flxInfo9);
      this.view.imgInfo10.onTouchEnd = this.showInfoPopup.bind(this,this.view.flxInfo10);
      this.view.imgInfo11.onTouchEnd = this.showInfoPopup.bind(this,this.view.flxInfo11);
      this.view.imgInfo12.onTouchEnd = this.showInfoPopup.bind(this,this.view.flxInfo12);
      this.view.imgInfo13.onTouchEnd = this.showInfoPopup.bind(this,this.view.flxInfo13);
      this.view.imgInfo14.onTouchEnd = this.showInfoPopup.bind(this,this.view.flxInfo14);
      this.view.imgCross1.onTouchEnd = this.hideInfoPopup.bind(this,this.view.flxinfo1);
      this.view.imgCross2.onTouchEnd = this.hideInfoPopup.bind(this,this.view.flxInfo2);
      this.view.imgCross3.onTouchEnd = this.hideInfoPopup.bind(this,this.view.flxInfo3);
      this.view.imgCross4.onTouchEnd = this.hideInfoPopup.bind(this,this.view.flxInfo4);
      this.view.imgCross5.onTouchEnd = this.hideInfoPopup.bind(this,this.view.flxInfo5);
      this.view.imgCross6.onTouchEnd = this.hideInfoPopup.bind(this,this.view.flxInfo6);
      this.view.imgCross7.onTouchEnd = this.hideInfoPopup.bind(this,this.view.flxInfo7);
      this.view.imgCross8.onTouchEnd = this.hideInfoPopup.bind(this,this.view.flxInfo8);
      this.view.imgCross9.onTouchEnd = this.hideInfoPopup.bind(this,this.view.flxInfo9);
      this.view.imgCross10.onTouchEnd = this.hideInfoPopup.bind(this,this.view.flxInfo10);
      this.view.imgCross11.onTouchEnd = this.hideInfoPopup.bind(this,this.view.flxInfo11);
      this.view.imgCross12.onTouchEnd = this.hideInfoPopup.bind(this,this.view.flxInfo12);
      this.view.imgCross13.onTouchEnd = this.hideInfoPopup.bind(this,this.view.flxInfo13);
      this.view.imgCross14.onTouchEnd = this.hideInfoPopup.bind(this,this.view.flxInfo14);   
      //tab1
      this.view.tbx2Tab1.onKeyUp = this.minFillValidation.bind
      (this,"tbx2");
      this.view.tbx3Tab1.onKeyUp = this.minFillValidation.bind
      (this,"tbx3");
      this.view.tbx4Tab1.onKeyUp = this.minFillValidation.bind
      (this,"tbx4");
      this.view.tbx5Tab1.onKeyUp = this.addFlowDynamicFieldKeyUp.bind(this);
      //tab2
      this.view.tbx1Tab2.onKeyUp = this.minFillValidation.bind
      (this,"tbx1");
      //this.view.tbx2Tab2.onKeyUp = this.addressLine1TextChange.bind
      //(this);
      this.view.tbx2Tab2.onKeyUp = this.minFillValidation.bind
      (this,"tbx2");
      this.view.tbx3Tab2.onKeyUp = this.minFillValidation.bind
      (this,"tbx3");
      this.view.tbx5Tab2.onKeyUp = this.minFillValidation.bind
      (this,"tbx4");
      this.view.tbxZipCodeTab2.onKeyUp = this.minFillValidation.bind
      (this,"tbx5");
      this.view.tbx6Tab2.onKeyUp = this.minFillValidation.bind
      (this,"tbx6");
      this.view.tbx7Tab2.onKeyUp = this.minFillValidation.bind
      (this,"tbx7");  
      //edit tab
      this.view.tbxName.onKeyUp = this.minFillValidation.bind
      (this,"tbx1");
      this.view.tbxAddress.onKeyUp = this.minFillValidation.bind
      (this,"tbx2");
      this.view.tbxDetail1.onKeyUp = this.minFillValidation.bind
      (this,"tbx3");
      this.view.tbxDetail2.onKeyUp = this.minFillValidation.bind
      (this,"tbx4");
      this.view.tbxCity.onKeyUp = this.minFillValidation.bind
      (this,"tbx5");
      this.view.tbxZipCode.onKeyUp = this.minFillValidation.bind
      (this,"tbx6");
      this.view.btnLink.onClick = this.enterInformationManuallyLinkOnClick.bind(this);
      this.view.tbxAddressLine2.onKeyUp = this.editFlowDynamicFieldKeuUp.bind(this);
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
     * @api : reviewCancelAction
     * used to review cancel actions.
     * @return : NA.
     */
  reviewCancelAction: function() {
    var scope = this;
    var form = kony.application.getCurrentForm();
    var popupObj = this.view.flxPopup.clone();
    popupObj.flxClosePopup.isModalContainer = true;
    form.add(popupObj);
    popupObj.isVisible = true;
    popupObj.top = "0dp";
    popupObj.left = "0dp";
    popupObj.height = "100%";
    popupObj.flxClosePopup.centerY = "50%";
    popupObj.flxClosePopup.lblClose.text = "Cancel";
    popupObj.flxClosePopup.lblClose.setActive(true);
    popupObj.flxClosePopup.btnNo.onClick = function() {
      popupObj.flxClosePopup.isModalContainer = false;
      form.remove(popupObj);	
      if(scope.view.flxContractList.isVisible){
        scope.view.contractList.btnSetActive();
      }
      scope.view.editDetailsBtnRight3.setActive(true);
      if(scope.view.btnAction4.isVisible) {
        scope.view.btnAction4.setActive(true);
       }

    }
    popupObj.flxClosePopup.flxClose.onClick = function() {
      popupObj.flxClosePopup.isModalContainer = false;
      form.remove(popupObj);
      if(scope.view.flxContractList.isVisible){
        scope.view.contractList.btnSetActive();
      }
      scope.view.editDetailsBtnRight3.setActive(true);
      if(scope.view.btnAction4.isVisible) {
        scope.view.btnAction4.setActive(true);
       }
    }
    popupObj.flxClosePopup.onKeyPress = function(eventObject, eventPayload) {
          if (eventPayload.keyCode === 27) {
            eventPayload.preventDefault();
            popupObj.flxClosePopup.isModalContainer = false;
            form.remove(popupObj);
            if(scope.view.flxContractList.isVisible){
              scope.view.contractList.btnSetActive();
            }
            scope.view.editDetailsBtnRight3.setActive(true);
            if(scope.view.btnAction4.isVisible) {
              scope.view.btnAction4.setActive(true);
            }
        }
      }
        // popupObj.flxClosePopup.flxClose.onKeyPress=function(eventObject, eventPayload){
        //   if (eventPayload.keyCode === 9) {
        //           if (eventPayload.shiftKey) {
        //       popupObj.isVisible = false;	
        //       scope.view.contractList.btnSetActive();
        //   }
        // }
        // }
      this.view.forceLayout();
    },

    /**
     * @api : actionHandler
     * used to to handle all actions and navigations.
	 * @params : "context" have the all internal data.
	 * @params : "property" have the contracts for flows.
     * @return : NA.
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
     * @api : invokeInstaceAction
     * used to to functions in controller.
	 * @params : "context" have the all internal data.
	 * @params : "levelInstance" to check for form method or component method.
	 * @params : "method" is the name of the method to be invoked.
     * @return : NA.
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
     * @api : debounce
     * used to to functions in controller.
	 * @params : "delay" time to invoke function.
	 * @params : "func" is the name of the method to be invoked.
     * @return : NA.
     */
	 debounce : function(func, delay) {
      var timer;
      return function() {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer=setTimeout(function(){
          func.apply(context, args)
        },delay);
      };
    },
	/**
     * @api : callOnKeyUp
     * invoked on key change to search for billers.
     * @return : NA.
     */
    callOnKeyUp: function() {
      var searchStr = this.updateSearchString();
      if(searchStr === ""){
        this.view.flxField1List.isVisible = false;
      }
      if(searchStr.length > 2){
      if(this.view.tbx1Tab1.text.trim() === "" ){
        this.view.flxField1List.isVisible = false;
        return;
      }
      let billerObjService = this._billerSearchObjectService;
      let billerObj = this._billerSearchObject;
      let billerOperation = this._billerSearchOperation;
      let billerCriteria = this.getCriteria(this._billerSearchCriteria);
      let billerIdentifier = this._billerSearchIdentifier;
      this.addPayeeDAO.fetchBillerList(billerObjService, billerObj, billerOperation, billerCriteria, this.onFetchBillerSuccess, billerIdentifier, this.onFetchBillerError);
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
          criteriaJSON[key] = this.parserUtilsManager.getParsedValue(criteriaJSON[key]);
        else
          criteriaJSON[key] = criteriaJSON[key];
      }
      return criteriaJSON;
    },
	/**
     * @api : updateSearchString
     * invoked to update the search string in context.
     * @return : NA.
     */
    updateSearchString: function() {
      let tbxValue = this.view.tbx1Tab1.text.trim();
      this.updateContext("tbx1",this.view.tbx1Tab1.text);
      this.parserUtilsManager.setContext(this.componentContext);
      return tbxValue;
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
     * @api : onFetchBillerSuccess
     * invoked to on success of fetch billers service call.
	 * @params : "response" is the service response.
	 * @params : "unicode" is the service identifier.
     * @return : NA.
     */
    onFetchBillerSuccess: function(response, unicode) {
      kony.application.dismissLoadingScreen();
      var self = this;
      this.addPayeeUtility.readObject(response);
      this.parserUtilsManager.setResponseData(unicode,this.addPayeeUtility.map);
      this.showBillersList(response[this.rootPath]); 
    },
	/**
     * @api : updateBillerDetails
     * invoked to update the biller details.
	 * @params : "billerObj" the object which consists of billers details.
     * @return : NA.
     */
    updateBillerDetails: function(billerObj) {
      this.view.tbx1Tab1.text = billerObj.lblNewPayees.text;
      this.view.flxField1List.isVisible = false;
      //this.checkIfAllSearchFieldsAreFilled();
      this.updateContext("tbx1",this.view.tbx1Tab1.text);
      this.parserUtilsManager.setContext(billerObj.data);
      this.setAdditionalFieldBasedOnCategory(billerObj.selectedCategoryID);
      this.selCategoryID =billerObj.selectedCategoryID;
      this.view.forceLayout();
      this.minFillValidation.bind(this,"tbx1");
      kony.application.dismissLoadingScreen();
      this.view.tbx1Tab1.setActive(true);
    },
	/**
     * @api : addFlowDynamicFieldKeyUp
     * invoked on key up of add flow dynamic field
     * @return : NA.
     */
    addFlowDynamicFieldKeyUp:function(){
      var categoryId = this.selCategoryID;
      var text = this.view.tbx5Tab1.text;
      var textLength = this.view.tbx5Tab1.text.length;
      var phoneNoFormatted = "";
      if(categoryId == "2"){
        var phoneNo = text;
        phoneNo = phoneNo.replace(/\(/g, "");
        phoneNo = phoneNo.replace(/\)/g, "");
        phoneNo = phoneNo.replace(/-/g, "");
        phoneNo = phoneNo.replace(/ /g, "");
        phoneNoFormatted= "(" + phoneNo.slice(0, 3) + ") " + phoneNo.slice(3, 6) + "-" + phoneNo.slice(6, 10);
        if(phoneNoFormatted =="() -" || phoneNoFormatted == "() "){
          phoneNoFormatted = "";
        }
        this.view.tbx5Tab1.text = phoneNoFormatted;
      }
      else{
        this.view.tbx5Tab1.text = text;
      }
      this.minFillValidation.call
      (this,"tbx5");
    },
	/**
     * @api : sendDynamicFieldAddFlowIntoContext
     * invoked to send dynamic field add flow content to context
     * @return : NA.
     */
    sendDynamicFieldAddFlowIntoContext: function(){
      var categoryId = this.selCategoryID;
            var text = this.view.tbx5Tab1.text;
            var code = this.view.tbxCodeTab1.text;
            if (categoryId == "2") {
                var phoneNo = code+text;
                phoneNo = phoneNo.replace(/\(/g, "");
                phoneNo = phoneNo.replace(/\)/g, "");
                phoneNo = phoneNo.replace(/-/g, "");
                phoneNo = phoneNo.replace(/ /g, "");
				phoneNo = phoneNo.replace("+", "");
                this.updateContext("tbx5", phoneNo);
      }
      else{
        this.updateContext("tbx5",this.view.tbx5Tab1.text);
      }
    },
	/**
     * @api : sendDynamicFieldEditFlowIntoContext
     * invoked to send dynamic field edit flow content to context
     * @return : NA.
     */
    sendDynamicFieldEditFlowIntoContext: function(){
      var context = this.parserUtilsManager.context;
      var phoneNoFormatted = "";
      var text =  this.view.tbxAddressLine2.text;
      var billerCategory = context['billerCategory'];
      if(billerCategory !== null && billerCategory !== undefined && billerCategory =="Phone"){
       var phoneNo = text;
        phoneNo = phoneNo.replace(/\(/g, "");
        phoneNo = phoneNo.replace(/\)/g, "");
        phoneNo = phoneNo.replace(/-/g, "");
        phoneNo = phoneNo.replace(/ /g, "");
       this.updateContext("tbxAddressLine2", phoneNo);
      }
      else{
      this.updateContext("tbxAddressLine2", this.view.tbxAddressLine2.text);
      }
    },
	/**
     * @api : editFlowDynamicFieldKeuUp
     * invoked on key up of edit flow dynamic field
     * @return : NA.
     */
    editFlowDynamicFieldKeuUp:function(){
      var context = this.parserUtilsManager.context;
      var phoneNoFormatted = "";
      var text =  this.view.tbxAddressLine2.text;
      var billerCategory = context['billerCategory'];
      if(billerCategory !== null && billerCategory !== undefined && billerCategory =="Phone"){
       var phoneNo = text;
        phoneNo = phoneNo.replace(/\(/g, "");
        phoneNo = phoneNo.replace(/\)/g, "");
        phoneNo = phoneNo.replace(/-/g, "");
        phoneNo = phoneNo.replace(/ /g, "");
        phoneNoFormatted= "(" + phoneNo.slice(0, 3) + ") " + phoneNo.slice(3, 6) + "-" + phoneNo.slice(6, 10);
        if(phoneNoFormatted =="() -" || phoneNoFormatted == "() "){
          phoneNoFormatted = "";
        }
         this.view.tbxAddressLine2.text = phoneNoFormatted;
      }
      else{
         this.view.tbxAddressLine2.text = text;
      }
       this.minFillValidation.call
      (this,"tbx7");
    },
    /**
     * @api : setEditAdditionalFieldBasedOnBillerCategory
     * seting edit additional fields based on biller category.
     * @return : NA.
     */
    setEditAdditionalFieldBasedOnBillerCategory:function(){
      var field5Label = [];
      try{
        field5Label = JSON.parse(this._editFlowField3Label);
      }
      catch(e){
        field5Label = this._editFlowField3Label;
      }
      var context = this.parserUtilsManager.context;
      var billerCategory = context['billerCategory'];
      if(billerCategory !== null && billerCategory !== undefined){
        field5Label = field5Label.filter((function(record){
          if(record["category"]){
            var categories = record["category"];
            if(categories.includes(billerCategory))
              return true;
            return false;
          }
        }));

        if(field5Label.length > 0){
          this.view.lblAddressLine2.text = this.getParsedValue(field5Label[0].text, kony.application.getCurrentBreakpoint());  
          this.view.flxAddressLine2.isVisible = true;
          this.view.tbxAddressLine2.isVisible = true;
        }
        else{
          this.view.flxAddressLine2.isVisible = false;
          this.view.tbxAddressLine2.isVisible = false;
        }
        //textbox setting
        var field5Value = [];
        try{
          field5Value = JSON.parse(this._editFlowField3Value);
        }
        catch(e){
          field5Value = this._editFlowField3Value;
        }
        field5Value = field5Value.filter((function(record){
          if(record["category"]){
            var categories = record["category"];
            if(categories.includes(billerCategory))
              return true;
            return false;
          }
        }));
        if(field5Value.length > 0){
          this.view.tbxAddressLine2.placeholder = this.getParsedValue(field5Value[0].placeholder, kony.application.getCurrentBreakpoint());  
          this.view.tbxAddressLine2.text = context['phone'];
          this.view.flxAddressLine2.isVisible = true;
          this.view.tbxAddressLine2.isVisible = true;
          var inputMapper5 = field5Value[0].mapping ? field5Value[0].mapping.substring(5,field5Value[0].mapping.length-1) : "";
          this.textInputsMapping["tbxAddressLine2"] = inputMapper5;
          this.editFlowDynamicFieldKeuUp();
        }
        else{
          this.view.flxAddressLine2.isVisible = false;
          this.view.tbxAddressLine2.isVisible = false;
        }

      }
      else{
        this.view.flxAddressLine2.isVisible = false;
        this.view.tbxAddressLine2.isVisible = false;  
      }
      
    },
	/**
     * @api : setAdditionalFieldBasedOnCategory
     * seting edit additional fields based on biller category.
	 * @params : "categoryId" is the id of the category.
     * @return : NA.
     */
    setAdditionalFieldBasedOnCategory:function(categoryId){
      var field5Label = [];
      try{
        field5Label = JSON.parse(this._Tab1Field5Label);
      }
      catch(e){
        field5Label = this._Tab1Field5Label;
      }

      field5Label = field5Label.filter((function(record){
        if(record["category"]){
          var categories = record["category"];
          if(categories.includes(categoryId))
            return true;
          return false;
        }
      }));
      if(field5Label.length > 0){
        this.view.lblField5Tab1.text = this.getParsedValue(field5Label[0].text, kony.application.getCurrentBreakpoint());  
        this.view.flxTab1Field5.isVisible = true;
        this.view.flxTab1Field5Phone.isVisible = true;
        this.view.tbx5Tab1.isVisible = true;
      }
      else{
        this.view.flxTab1Field5.isVisible = false;
        this.view.flxTab1Field5Phone.isVisible = false;
        this.view.tbx5Tab1.isVisible = false;
      }

      var field5Value = [];
      try{
        field5Value = JSON.parse(this._Tab1Field5Value);
      }
      catch(e){
        field5Value = this._Tab1Field5Value;
      }
      field5Value = field5Value.filter((function(record){
        if(record["category"]){
          var categories = record["category"];
          if(categories.includes(categoryId))
            return true;
          return false;
        }
      }));
      if(field5Value.length > 0){
        this.view.tbx5Tab1.placeholder = this.getParsedValue(field5Value[0].placeholder, kony.application.getCurrentBreakpoint());  
        this.view.flxTab1Field5.isVisible = true;
        this.view.flxTab1Field5Phone.isVisible = true;
        this.view.tbx5Tab1.isVisible = true;
        var inputMapper5 = field5Value[0].mapping ? field5Value[0].mapping.substring(5,field5Value[0].mapping.length-1) : "";
        this.textInputsMapping["tbx5"] = inputMapper5;
        var lbxCode = this.getParsedValue(this._isCodeVisible);
                if (lbxCode && categoryId == 2) {
                  this.view.tbxCodeTab1.isVisible = true;
				  this.view.tbx5Tab1.left = "10px";
                  if(kony.application.getCurrentBreakpoint() == 640){
                    this.view.tbx5Tab1.width = "94%";
                  }
                  else if(kony.application.getCurrentBreakpoint() == 1024){
                   this.view.tbx5Tab1.width = "74%"; 
                   
                  }
                   else{
                     this.view.tbx5Tab1.width = "69.5%";
                   } 
                  	
                } else {
					this.view.tbxCodeTab1.isVisible = false;
					if (kony.application.getCurrentBreakpoint() == 640) {
                        this.view.tbx5Tab1.width = "93.7%";
						this.view.tbx5Tab1.left = "12px";
                    } else if (kony.application.getCurrentBreakpoint() == 1024) {
                        this.view.tbx5Tab1.width = "91.44%";
						this.view.tbx5Tab1.left = "1px";
                    } else {
						this.view.tbx5Tab1.width = "89.5%";
						this.view.tbx5Tab1.left = "28px";
                    }
                }
      }
      else{
        this.view.flxTab1Field5.isVisible = false;
        this.view.tbx5Tab1.isVisible = false;
        this.view.flxTab1Field5Phone.isVisible = false;
        this.view.tbxCodeTab1.isVisible = false;
      }
    },
	/**
     * @api : showBillersList
     * this is used to show the list of billers.
	 * @params : "billersList" is the list of billers.
     * @return : NA.
     */
    showBillersList: function(billersList) {
      var scope = this;
      this.view.segField1Values.widgetDataMap = {
        "lblNewPayees": "lblNewPayees"
      };
      if(billersList !==null && billersList !== undefined ){
        if (billersList.length > 0) {
          this.view.segField1Values.setData(this.createNewPayeeModel(billersList));
          this.view.segField1Values.onRowClick = function(){
            let rowindex = Math.floor(scope.view.segField1Values.selectedRowIndex[1]);
            let billerdata = scope.view.segField1Values.data[rowindex];
            scope.updateBillerDetails(billerdata);
          };
          this.view.flxField1List.isVisible = true;
          if(this.tbxFlag){
            this.view.tbx1Tab1.setActive(true);
            this.tbxFlag = false;
          }
          else{
          this.view.segField1Values.setActive(0, -1, "flxNewPayees");
          }
          this.view.forceLayout();
        }
        else {
          this.view.flxField1List.isVisible = false;
          this.view.forceLayout();
        }
      }
    },

    /**
     * @api : createNewPayeeModel
     * this is used to create new payee model.
	 * @params : "billersList" is the list of billers.
     * @return : NA.
     */
    createNewPayeeModel: function (billerList) {
      var i=0;
      var scope = this;
      var searchContext = this.getParsedValue(this._searchResultIntoContext);
      const payeeLabelSkin = kony.application.getCurrentBreakpoint() === 640 ? "ICSknSSP42424213Px" : "ICSknSSP42424215Px";
      return billerList.map(function (biller) {
        var data={};
        for(let key in searchContext){
          data[key] = scope.getParsedValue(searchContext[key].replace("rootPath",scope.rootPath+'['+(i)+']'));
        }
        var lblNewPayees = {
          "text": scope.getParsedValue(scope.textInputsMapping["tbx1Text"].replace("rootPath", scope.rootPath + '[' + (i) + ']')),
          "skin": payeeLabelSkin
        };
        var tbx1JSON=scope.getParsedValue(scope._Tab1Field1Value);
        var selectedCategoryID = scope.getParsedValue(tbx1JSON["selectedCategoryID"].replace("rootPath",scope.rootPath+'['+(i)+']'));
        i++;
        return {
          "lblNewPayees": lblNewPayees,
          "data":data,
          "selectedCategoryID" :selectedCategoryID
        };
      });
    },
	
	/**
     * @api : onFetchBillerError
     * this method is invoked on error of service call.
     * @return : NA.
     */
    onFetchBillerError: function() {
      kony.print("search biller service failed");
      kony.application.dismissLoadingScreen();
    },
	
	/**
     * @api : setContentVisiblityBasedOnTabName
     * this is used to set the visibility of tab name
	 * @params : "selectedTabName" is the name of the selected tab
     * @return : NA.
     */
    setContentVisiblityBasedOnTabName: function(selectedTabName) {
      var showFlexName = (selectedTabName === "btnSearchPayee" ? "flxContent1" : "flxContent2");
      var hideFlexName = (showFlexName === "flxContent1" ? "flxContent2" : "flxContent1");
      this.view[showFlexName].isVisible = true;
      this.view[hideFlexName].isVisible = false;
      this.view.btnRight1.setEnabled(false);
      this.view.btnRight1.skin = "sknBtnBlockedSSPFFFFFF15Px";
      this.view.flxDowntimeWarning.setVisibility(false);
      this.highlightTabSkins(selectedTabName);
      if(showFlexName === "flxContent1"){
        this.setScreen1Tab1Data();
        this.clearFieldsContent1();
      }
      else{
        this.setScreen1Tab2Data();
        this.clearFieldsContent2();
      }
if("btnSearchPayee"===selectedTabName){
this.view.btnSearchPayee.accessibilityConfig={
"a11yLabel":"Search by Company Name",
"a11yARIA":{
"role":"tab",
"aria-selected":true,
"tabindex":0
}
}
this.view.btnEnterPayeeInfo.accessibilityConfig={
"a11yLabel":"Enter Payee Information",
"a11yARIA":{
"role":"tab",
"aria-selected":false,
"tabindex":0
}
}
}
 else{
   
this.view.btnEnterPayeeInfo.accessibilityConfig={
"a11yLabel":"Enter Payee Information",
"a11yARIA":{
"role":"tab",
"aria-selected":true,
"tabindex":0
}
}
this.view.btnSearchPayee.accessibilityConfig={
"a11yLabel":"Search by Company Name",
"a11yARIA":{
"role":"tab",
"aria-selected":false,
"tabindex":0
}
}
}
      
    },

	/**
     * @api : highlightTabSkins
     * this is used to highlight the tab skins.
	 * @params : "selectedTab" is the name of the selected tab
     * @return : NA.
     */
    highlightTabSkins: function(selectedTab){
      var tab1 = "btnSearchPayee";
      var tab2 = "btnEnterPayeeInfo";
      var unselectedTab = "";
      if(selectedTab === tab1) {
        unselectedTab = tab2;
      }
      else {
        unselectedTab = tab1;
      }
      this.view[selectedTab].skin = "ICSknsknBtnAccountSummarySelected17Px";   
      this.view[unselectedTab].skin = "ICSknsknBtnAccountSummaryUnselected17Px";    
    },
	
	/**
     * @api : showScreen
     * this is used to show a particular screen.
	 * @params : "screenName" is the name of the screen.
     * @return : NA. 
     */
    showScreen: function(screenName, param) {
      var scope = this;
      if(kony.sdk.isNullOrUndefined(param) || param === "") {
        this.view.rtxDowntimeWarning.text = "";
        this.view.flxDowntimeWarning.setVisibility(false);
      }
      this.screens.forEach(function(screenValue) {
        if (screenValue === screenName) {
          scope.view[screenValue].isVisible = true;
        } else {
          scope.view[screenValue].isVisible = false;
        }
      });
    },
	 
	/**
     * @api : clearTab1ValidationErrors
     * this is used to clear tab1 validation errors.
     * @return : NA. 
     */
    clearTab1ValidationErrors: function(){
      this.view.flxContentWrapper.flxContent1.lblField1Error.isVisible = false;
      this.view.flxContentWrapper.flxContent1.lblField1Error.text = "";
      this.setAddTextBoxesSkinsBasedOnPreviousStoredSkinsState();
    },
	
	/**
     * @api : clearTab2ValidationErrors
     * this is used to clear tab1 validation errors.
     * @return : NA. 
     */
    clearTab2ValidationErrors: function(){
      this.view.flxContentWrapper.flxContent2.lblError.isVisible = false;
      this.view.flxContentWrapper.flxContent2.lblError.text = "";
      this.setAddTextBoxesSkinsBasedOnPreviousStoredSkinsState();
    },
	
	/**
     * @api : clearPayeeDetailsValidationErrors
     * this is used to clear payee details validation errors.
     * @return : NA. 
     */
    clearPayeeDetailsValidationErrors: function(){
      this.view.lblFieldErrorPayeeDetails.isVisible = false;
      this.view.lblFieldErrorPayeeDetails.text = "";
      this.setAddTextBoxesSkinsBasedOnPreviousStoredSkinsState();
    },
	
	/**
     * @api : clearEditValidationErrors
     * this is used to clear Edit details validation errors.
     * @return : NA. 
     */
    clearEditValidationErrors: function(){
      this.view.lblEditError.isVisible = false;
      this.view.lblEditError.text = "";
      this.setAddTextBoxesSkinsBasedOnPreviousStoredSkinsState();
    },


    /**
     * @api : setAddTextBoxesSkinsBasedOnPreviousStoredSkinsState
     * this is used to set text box skins.
     * @return : NA. 
     */
    setAddTextBoxesSkinsBasedOnPreviousStoredSkinsState:function() {
      //tab1
      this.view.flxContentWrapper.flxContent1.flxField1Tab1.tbx1Tab1.skin = this.addPayeeUtility.breakPointParser(this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());
      this.view.flxContentWrapper.flxContent1.tbx2Tab1.skin = this.addPayeeUtility.breakPointParser(this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());
      this.view.flxContentWrapper.flxContent1.tbx3Tab1.skin = this.addPayeeUtility.breakPointParser(this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());
      this.view.flxContentWrapper.flxContent1.tbx4Tab1.skin  = this.addPayeeUtility.breakPointParser(this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());
      this.view.flxContentWrapper.flxContent1.flxTab1Field5Phone.tbx5Tab1.skin  = this.addPayeeUtility.breakPointParser(this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());
      //tab2
      this.view.flxContentWrapper.flxContent2.tbx1Tab2.skin = this.addPayeeUtility.breakPointParser(this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());
      this.view.flxContentWrapper.flxContent2.tbx2Tab2.skin = this.addPayeeUtility.breakPointParser(this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());
      this.view.flxContentWrapper.flxContent2.tbx3Tab2.skin = this.addPayeeUtility.breakPointParser(this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());
      this.view.tbx5Tab2.skin = this.addPayeeUtility.breakPointParser(this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());
      this.view.flxContentWrapper.flxContent2.tbx6Tab2.skin = this.addPayeeUtility.breakPointParser(this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());
      this.view.flxContentWrapper.flxContent2.tbx7Tab2.skin =this.addPayeeUtility.breakPointParser(this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());
      this.view.tbxZipCodeTab2.skin = this.addPayeeUtility.breakPointParser(this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());
      //payee details
      this.view.tbx4.skin = this.addPayeeUtility.breakPointParser(this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());
      this.view.tbx5.skin = this.addPayeeUtility.breakPointParser(this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());
      //edit screen
      this.view.tbxName.skin = this.addPayeeUtility.breakPointParser(this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint()) ;
      this.view.tbxDetail1.skin = this.addPayeeUtility.breakPointParser(this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());
      this.view.tbxDetail2.skin = this.addPayeeUtility.breakPointParser(this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());
      this.view.tbxCity.skin = this.addPayeeUtility.breakPointParser(this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());
      this.view.tbxZipCode.skin = this.addPayeeUtility.breakPointParser(this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());
    },

    /**
     * @api : validateAccountAndConfirmAccountNumber
     * validates account and confirm account number.
     * @return : NA
     */
    validateAccountAndConfirmAccountNumber: function() {
      this.resultAccNumberValidation = [];
      var uiWidgets = [];
      var tab = this.view.flxContent1.isVisible ? "tab1": "tab2";
      if(tab == "tab1"){
        var tbxArray = [{"tbx1":"tbx1Tab1"},{"tbx2":"tbx2Tab1"},{"tbx3":"tbx3Tab1"},{"tbx4":"tbx4Tab1"},{"tbx5":"tbx5Tab1"}];
      }
      if(tab == "tab2"){
        var tbxArray = [{"tbx1":"tbx1Tab2"},{"tbx2":"tbx2Tab2"},{"tbx3":"tbx3Tab2"},{"tbx5":"tbx5Tab2"},{"tbx6":"tbx6Tab2"},{"tbx7":"tbx7Tab2"}]; 
      }
      for(var key in this.textInputsMapping){
        if(this.textInputsMapping[key] =="accountNumber"){
          uiWidgets.push(key);
        }
      }
      if(tab == "tab1"){
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
      }
      if(tab == "tab2"){
        for(var i=0;i<uiWidgets.length;i++){
          if(uiWidgets[i] == "tbx1Tab2" ){
            this.resultAccNumberValidation.push(tbxArray[0]['tbx1']);
          }
          if(uiWidgets[i] == "tbx2Tab2" ){
            this.resultAccNumberValidation.push(tbxArray[1]['tbx2']);
          }
          if(uiWidgets[i] == "tbx3Tab2" ){
            this.resultAccNumberValidation.push(tbxArray[2]['tbx3']);
          }
          if(uiWidgets[i] == "tbx5Tab2" ){
            this.resultAccNumberValidation.push(tbxArray[3]['tbx5']);
          }
          if(uiWidgets[i] == "tbx6Tab2" ){
            this.resultAccNumberValidation.push(tbxArray[4]['tbx6']);
          } 
          if(uiWidgets[i] == "tbx7Tab2" ){
            this.resultAccNumberValidation.push(tbxArray[5]['tbx7']);
          } 
        }
      }

      if(Array.isArray(this.resultAccNumberValidation) && this.resultAccNumberValidation.length ==2){
        if(this.view[this.resultAccNumberValidation[0]].text == this.view[this.resultAccNumberValidation[1]].text)
          return true;
      }
      return false;
    },
	
    /**
     * @api : constructDVFInput
     * this is used to construct DV input.
	 * @params : "view" gives us the tab name.
     * @return : NA. 
     */
    constructDVFInput: function(view){
      if(view ==="tab1"){                 
        var tbx1 = this.getParsedValue(this._Tab1Field1Value)
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx1) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx1.mapping)){    
          tbx1 = this.mapTextInputContractToDvfKey(tbx1.mapping); 
        }
        var tbx2 = this.getParsedValue(this._Tab1Field2Value)
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx2) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx2.mapping)){
          tbx2 = this.mapTextInputContractToDvfKey(tbx2.mapping);
        }
        var tbx3 = this.getParsedValue(this._Tab1Field3Value);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx3) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx3.mapping)){
          tbx3 = this.mapTextInputContractToDvfKey(tbx3.mapping);
        }
        var tbx4 = this.getParsedValue(this._Tab1Field4Value);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx4) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx4.mapping)){  
          tbx4 = this.mapTextInputContractToDvfKey(tbx4.mapping);
        }
        var field5 = [];
        try{
          field5 = JSON.parse(this._Tab1Field5Value);
        }
        catch(e){
          field5 = this._Tab1Field5Value;
        }
        var categoryId = this.selCategoryID
        field5 = field5.filter((function(record){
          if(record["category"]){
            var categories = record["category"];
            if(categories.includes(categoryId))
              return true;
            return false;
          }
        }));
        if(field5.length > 0){
          var field5Mapping = field5[0].mapping;
          var tbx5 = field5Mapping;
          tbx5 = this.mapTextInputContractToDvfKey(tbx5);
        }
        var jsonToReturn = {
          "tbx1": this.componentContext[tbx1],
          "tbx2" :this.componentContext[tbx2],
          "tbx3": this.componentContext[tbx3],
          "tbx4": this.componentContext[tbx4],
          "tbx5": this.componentContext[tbx5]
        }      
        if(tbx1 == "" || tbx1 == null || tbx1 == undefined){
          delete jsonToReturn['tbx1'];
        }
        if(tbx2 == "" || tbx2 == null || tbx2 == undefined){
          delete jsonToReturn['tbx2'];
        }
        if(tbx3 == "" || tbx3 == null || tbx3 == undefined){
          delete jsonToReturn['tbx3'];
        }
        if(tbx4== "" || tbx4 == null || tbx4 == undefined){
          delete jsonToReturn['tbx4'];
        }       
        if(!this.componentContext[tbx5] && !this.view.tbx5Tab1.isVisible){
          delete jsonToReturn['tbx5'];
        }
        return jsonToReturn;         
      }
      if(view ==="tab2"){
        var tbx1 = this.getParsedValue(this._Tab2Field1Value);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx1) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx1.mapping)){ 
          tbx1 = this.mapTextInputContractToDvfKey(tbx1.mapping); 
        }
        var tbx2 = this.getParsedValue(this._Tab2AddressLine1Value);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx2) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx2.mapping)){ 
          tbx2 = this.mapTextInputContractToDvfKey(tbx2.mapping);
        }
        var tbx3 = this.getParsedValue(this._Tab2AddressLine2Value);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx3) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx3.mapping)){ 
          tbx3 = this.mapTextInputContractToDvfKey(tbx3.mapping);
        }
        var tbx4 = this.getParsedValue(this._Tab2CityValue);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx4) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx4.mapping)){ 
          tbx4 = this.mapTextInputContractToDvfKey(tbx4.mapping);
        }
        var tbx5 = this.getParsedValue(this._Tab2ZipCodeValue);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx5) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx5.mapping)){ 
          tbx5 = this.mapTextInputContractToDvfKey(tbx5.mapping);     
        }
        var tbx6 = this.getParsedValue(this._Tab2Field8Value);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx6) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx6.mapping)){ 
          tbx6 = this.mapTextInputContractToDvfKey(tbx6.mapping);
        }
        var tbx7 = this.getParsedValue(this._field9ValueTab2);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx7) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx7.mapping)){ 
          tbx7 = this.mapTextInputContractToDvfKey(tbx7.mapping);    
        }


        var jsonToReturn = {
          "tbx1": this.componentContext[tbx1],
          "tbx2":  this.componentContext[tbx2],
          "tbx3":this.componentContext[tbx3],
          "tbx4":this.componentContext[tbx4],
          "tbx5":this.componentContext[tbx5],
          "tbx6":this.componentContext[tbx6],
          "tbx7":this.componentContext[tbx7]
        } 

        if(tbx1 == "" || tbx1 == null || tbx1 == undefined){
          delete jsonToReturn['tbx1'];
        }
        if(tbx2 == "" || tbx2 == null || tbx2 == undefined){
          delete jsonToReturn['tbx2'];
        }
        if(tbx3 == "" || tbx3 == null || tbx3 == undefined){
          delete jsonToReturn['tbx3'];
        }
        if(tbx4== "" || tbx4 == null || tbx4 == undefined){
          delete jsonToReturn['tbx4'];
        }
        if(tbx5== "" || tbx5 == null || tbx5 == undefined){
          delete jsonToReturn['tbx5'];
        }
        if(tbx6== "" || tbx6 == null || tbx6 == undefined){
          delete jsonToReturn['tbx6'];
        }
        if(tbx7== "" || tbx7 == null || tbx7 == undefined){
          delete jsonToReturn['tbx7'];
        }

        //handling case when accountNumber does not exist is selected in UI  
        var isSelected = this.isRememberMe();
        if(isSelected){   
          delete jsonToReturn['tbx6'];
          delete jsonToReturn['tbx7'];
        }
        return jsonToReturn;
      }
      if(view =="payeeDetails"){
        var tbx1 = this.getParsedValue(this._editField4Value);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx1) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx1.mapping)){ 
          tbx1 = this.mapTextInputContractToDvfKey(tbx1.mapping); 
        }
        var tbx2 = this.getParsedValue(this._editField5Value);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx2) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx2.mapping)){
          tbx2 = this.mapTextInputContractToDvfKey(tbx2.mapping); 
        }
        var jsonToReturn = {
          "tbx1": this.componentContext[tbx1],
          "tbx2":  this.componentContext[tbx2],
        } 
        if(tbx1 == "" || tbx1 == null || tbx1 == undefined){
          delete jsonToReturn['tbx1'];
        }
        if(tbx2 == "" || tbx2 == null || tbx2 == undefined){
          delete jsonToReturn['tbx2'];
        }
        return jsonToReturn;   
      }
      if(view == "edit"){
        var tbx1 = this.getParsedValue(this._editFlowField1Value);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx1) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx1.mapping)){ 
          tbx1 = this.mapTextInputContractToDvfKey(tbx1.mapping); 
        }
        var tbx2 = this.getParsedValue(this._editFlowField2Value);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx2) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx2.mapping)){ 
          tbx2 = this.mapTextInputContractToDvfKey(tbx2.mapping); 
        }
        var tbx3 = this.getParsedValue(this._editFlowAddress1Value);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx3) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx3.mapping)){ 
          tbx3 = this.mapTextInputContractToDvfKey(tbx3.mapping); 
        }
        var tbx4 = this.getParsedValue(this._editFlowAddress2Value);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx4) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx4.mapping)){ 
          tbx4 = this.mapTextInputContractToDvfKey(tbx4.mapping); 
        }
        var tbx5 = this.getParsedValue(this._editFlowCityValue);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx5) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx5.mapping)){ 
          tbx5 = this.mapTextInputContractToDvfKey(tbx5.mapping); 
        }
        var tbx6 = this.getParsedValue(this._editFlowZipCodeValue);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx6) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx6.mapping)){ 
          tbx6 = this.mapTextInputContractToDvfKey(tbx6.mapping); 
        }
       
        var dynamicFieldEdit = [];
        try{
          dynamicFieldEdit = JSON.parse(this._editFlowField3Value);
        }
        catch(e){
          dynamicFieldEdit = this._editFlowField3Value;
        }
        var context = this.parserUtilsManager.context;
        var billerCategory = context['billerCategory'];
        var phoneNoFormatted = "";
        dynamicFieldEdit = dynamicFieldEdit.filter((function(record){
          if(record["category"]){
            var categories = record["category"];
            if(categories.includes(billerCategory))
              return true;
            return false;
          }
        }));
        if(dynamicFieldEdit.length > 0){
          var field5Mapping = dynamicFieldEdit[0].mapping;
          var tbx7 = field5Mapping;
          tbx7 = this.mapTextInputContractToDvfKey(tbx7);
        }
            
        var jsonToReturn = {
          "tbx1": this.componentContext[tbx1],
          "tbx2":  this.componentContext[tbx2],
          "tbx3":  this.componentContext[tbx3],
          "tbx4":  this.componentContext[tbx4],
          "tbx5":  this.componentContext[tbx5],
          "tbx6":  this.componentContext[tbx6],
          "tbx7": this.componentContext[tbx7]
        } 
        if( !this.view.tbxAddressLine2.isVisible){
          delete jsonToReturn['tbx7'];
        }
        if(tbx1 == "" || tbx1 == null || tbx1 == undefined){
          delete jsonToReturn['tbx1'];
        }
        if(tbx2 == "" || tbx2 == null || tbx2 == undefined){
          delete jsonToReturn['tbx2'];
        }
        if(tbx3 == "" || tbx3 == null || tbx3 == undefined){
          delete jsonToReturn['tbx3'];
        }
        if(tbx4 == "" || tbx4 == null || tbx4 == undefined){
          delete jsonToReturn['tbx4'];
        }
        if(tbx5 == "" || tbx5 == null || tbx5 == undefined){
          delete jsonToReturn['tbx5'];
        }
        if(tbx6 == "" || tbx6 == null || tbx6 == undefined){
          delete jsonToReturn['tbx6'];
        }
        return jsonToReturn; 
      }
    },
    
    /**
     * @api : invokedvfFieldErrorParser
     * this is used to parse error for dvf input.
	 * @params : "dvfError" gives us the error.
     * @return : NA. 
     */
    invokedvfFieldErrorParser : function(dvfError){
      var view;
      if(this.view.flxContent1.isVisible){
        view = "tab1"
      }
      if(this.view.flxContent2.isVisible){
        view = "tab2"
      }
      if( this.view.flxEditPayeeDetails.isVisible){
        view = "payeeDetails";
      }
      if(this.view.flxEditPayee.isVisible){
        view = "edit";
      }

      if(view =="tab1"){
        var tbx1 = this.getParsedValue(this._Tab1Field1Value)
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx1) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx1.mapping)){    
          tbx1 = this.mapTextInputContractToDvfKey(tbx1.mapping); 
        }
        var tbx2 = this.getParsedValue(this._Tab1Field2Value)
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx2) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx2.mapping)){
          tbx2 = this.mapTextInputContractToDvfKey(tbx2.mapping);
        }
        var tbx3 = this.getParsedValue(this._Tab1Field3Value);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx3) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx3.mapping)){
          tbx3 = this.mapTextInputContractToDvfKey(tbx3.mapping);
        }
        var tbx4 = this.getParsedValue(this._Tab1Field4Value);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx4) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx4.mapping)){  
          tbx4 = this.mapTextInputContractToDvfKey(tbx4.mapping);
        }

        var field5 = [];
        try{
          field5 = JSON.parse(this._Tab1Field5Value);
        }
        catch(e){
          field5 = this._Tab1Field5Value;
        }
        var categoryId = this.selCategoryID
        field5 = field5.filter((function(record){
          if(record["category"]){
            var categories = record["category"];
            if(categories.includes(categoryId))
              return true;
            return false;
          }
        }));
        if(field5.length > 0){
          var field5Mapping = field5[0].mapping;
          var tbx5 = field5Mapping;
          tbx5 = this.mapTextInputContractToDvfKey(tbx5);
        }


        for(var iterator in dvfError){
          if("tbx1" == iterator){
            this.view.flxContentWrapper.flxContent1.flxField1Tab1.tbx1Tab1.skin = this.addPayeeUtility.breakPointParser
            (this._sknAddTextBoxError, kony.application.getCurrentBreakpoint());
          }
          if("tbx2" == iterator){
            this.view.flxContentWrapper.flxContent1.tbx2Tab1.skin = this.addPayeeUtility.breakPointParser
            (this._sknAddTextBoxError, kony.application.getCurrentBreakpoint());
          }
          if("tbx3" == iterator){
            this.view.flxContentWrapper.flxContent1.tbx3Tab1.skin = this.addPayeeUtility.breakPointParser
            (this._sknAddTextBoxError, kony.application.getCurrentBreakpoint());
          }
          if("tbx4" == iterator){
            this.view.flxContentWrapper.flxContent1.tbx4Tab1.skin= this.addPayeeUtility.breakPointParser
            (this._sknAddTextBoxError, kony.application.getCurrentBreakpoint());
          }
          if("tbx5" == iterator){
            this.view.flxContentWrapper.flxContent1.tbx5Tab1.skin  = this.addPayeeUtility.breakPointParser
            (this._sknAddTextBoxError, kony.application.getCurrentBreakpoint());
          }
        }
      }
      if(view =="tab2"){
        var tbx1 = this.getParsedValue(this._Tab2Field1Value);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx1) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx1.mapping)){ 
          tbx1 = this.mapTextInputContractToDvfKey(tbx1.mapping); 
        }
        var tbx2 = this.getParsedValue(this._Tab2AddressLine1Value);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx2) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx2.mapping)){ 
          tbx2 = this.mapTextInputContractToDvfKey(tbx2.mapping);
        }
        var tbx3 = this.getParsedValue(this._Tab2AddressLine2Value);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx3) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx3.mapping)){ 
          tbx3 = this.mapTextInputContractToDvfKey(tbx3.mapping);
        }
        var tbx4 = this.getParsedValue(this._Tab2CityValue);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx4) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx4.mapping)){ 
          tbx4 = this.mapTextInputContractToDvfKey(tbx4.mapping);
        }
        var tbx5 = this.getParsedValue(this._Tab2ZipCodeValue);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx5) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx5.mapping)){ 
          tbx5 = this.mapTextInputContractToDvfKey(tbx5.mapping);     
        }
        var tbx6 = this.getParsedValue(this._Tab2Field8Value);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx6) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx6.mapping)){ 
          tbx6 = this.mapTextInputContractToDvfKey(tbx6.mapping);
        }
        var tbx7 = this.getParsedValue(this._field9ValueTab2);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx7) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx7.mapping)){ 
          tbx7 = this.mapTextInputContractToDvfKey(tbx7.mapping);    
        }

        for(var iterator in dvfError){
          if("tbx1" == iterator){
            this.view.flxContentWrapper.flxContent2.tbx1Tab2.skin = this.addPayeeUtility.breakPointParser
            (this._sknAddTextBoxError, kony.application.getCurrentBreakpoint());
          }
          if("tbx2" == iterator){
            this.view.flxContentWrapper.flxContent2.tbx2Tab2.skin = this.addPayeeUtility.breakPointParser
            (this._sknAddTextBoxError, kony.application.getCurrentBreakpoint());
          }
          if("tbx3" == iterator){
            this.view.flxContentWrapper.flxContent2.tbx3Tab2.skin = this.addPayeeUtility.breakPointParser
            (this._sknAddTextBoxError, kony.application.getCurrentBreakpoint());
          }
          if("tbx4" == iterator){
            this.view.tbx5Tab2.skin= this.addPayeeUtility.breakPointParser
            (this._sknAddTextBoxError, kony.application.getCurrentBreakpoint());
          }
          if("tbx5" == iterator){
            this.view.tbxZipCodeTab2.skin  = this.addPayeeUtility.breakPointParser
            (this._sknAddTextBoxError, kony.application.getCurrentBreakpoint());
          }
          if("tbx6" == iterator){
            this.view.flxContentWrapper.flxContent2.tbx6Tab2.skin  = this.addPayeeUtility.breakPointParser
            (this._sknAddTextBoxError, kony.application.getCurrentBreakpoint());
          }
          if("tbx7" == iterator){
            this.view.flxContentWrapper.flxContent2.tbx7Tab2.skin  = this.addPayeeUtility.breakPointParser
            (this._sknAddTextBoxError, kony.application.getCurrentBreakpoint());
          }       
        }
      }
      if(view == "payeeDetails"){
        var tbx1 = this.getParsedValue(this._editField4Value);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx1) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx1.mapping)){ 
          tbx1 = this.mapTextInputContractToDvfKey(tbx1.mapping); 
        }
        var tbx2 = this.getParsedValue(this._editField5Value);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx2) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx2.mapping)){
          tbx2 = this.mapTextInputContractToDvfKey(tbx2.mapping); 
        }

        for(var iterator in dvfError){
          if("tbx1" == iterator){
            this.view.tbx4.skin = this.addPayeeUtility.breakPointParser
            (this._sknAddTextBoxError, kony.application.getCurrentBreakpoint());
          }
          if("tbx2" == iterator){
            this.view.tbx5.skin = this.addPayeeUtility.breakPointParser
            (this._sknAddTextBoxError, kony.application.getCurrentBreakpoint());
          }
        }
      }
      if(view == "edit"){
        var tbx1 = this.getParsedValue(this._editFlowField1Value);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx1) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx1.mapping)){ 
          tbx1 = this.mapTextInputContractToDvfKey(tbx1.mapping); 
        }

        var tbx2 = this.getParsedValue(this._editFlowField2Value);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx2) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx2.mapping)){ 
          tbx2 = this.mapTextInputContractToDvfKey(tbx2.mapping); 
        }
        var tbx3 = this.getParsedValue(this._editFlowAddress1Value);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx3) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx3.mapping)){ 
          tbx3 = this.mapTextInputContractToDvfKey(tbx3.mapping); 
        }
        var tbx4 = this.getParsedValue(this._editFlowAddress2Value);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx4) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx4.mapping)){ 
          tbx4 = this.mapTextInputContractToDvfKey(tbx4.mapping); 
        }
        var tbx5 = this.getParsedValue(this._editFlowCityValue);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx5) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx5.mapping)){ 
          tbx5 = this.mapTextInputContractToDvfKey(tbx5.mapping); 
        }
        var tbx6 = this.getParsedValue(this._editFlowZipCodeValue);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx6) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx6.mapping)){ 
          tbx6 = this.mapTextInputContractToDvfKey(tbx6.mapping); 
        }
        for(var iterator in dvfError){
          if("tbx1" == iterator){
            this.view.tbxName.skin = this.addPayeeUtility.breakPointParser
            (this._sknAddTextBoxError, kony.application.getCurrentBreakpoint());
          }
          if("tbx2" == iterator){
            this.view.tbxAddress.skin = this.addPayeeUtility.breakPointParser
            (this._sknAddTextBoxError, kony.application.getCurrentBreakpoint());
          }
          if("tbx3" == iterator){
            this.view.tbxDetail1.skin = this.addPayeeUtility.breakPointParser
            (this._sknAddTextBoxError, kony.application.getCurrentBreakpoint());
          }
          if("tbx4" == iterator){
            this.view.tbxDetail2.skin = this.addPayeeUtility.breakPointParser
            (this._sknAddTextBoxError, kony.application.getCurrentBreakpoint());
          }
          if("tbx5" == iterator){
            this.view.tbxCity.skin = this.addPayeeUtility.breakPointParser
            (this._sknAddTextBoxError, kony.application.getCurrentBreakpoint());
          }
          if("tbx6" == iterator){
            this.view.tbxZipCode.skin = this.addPayeeUtility.breakPointParser
            (this._sknAddTextBoxError, kony.application.getCurrentBreakpoint());
          }
        }
      }
    },

    /**
     * @api : mapTextInputContractToDvfKey
     * this is used map input text to dvf key.
	 * @params : "tbxJson" used to map text input to dvf key.
     * @return : NA. 
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
     * @api : resetValidationFields
     * this is used to reset validation fields.
     * @return : NA. 
     */
    resetValidationFields: function(){
      this.selCategoryID = "";
      if(this.parserUtilsManager.context.flowType === "ADD")
        {
           this.componentContext = {};
        }
      this.resultAccNumberValidation = [];
    },

    /**
     * @api : minFillValidation
     * this is used to check for minimum field validation.
	 * @params : "tbxWidget" is the text box widget id.
     * @return : NA. 
     */
    minFillValidation: function(tbxWidget) {

      var object =  this.getParsedValue(this._payeeObject);
      var minFillconfig = JSON.parse(this._minFillMapping); 
      var config;
      var tab;
      if(this.view.flxContent1.isVisible){
        config =minFillconfig['tab1'];
      } 
      if(this.view.flxContent2.isVisible){
        config = minFillconfig['tab2'];
      } 
      if(this.view.flxEditPayee.isVisible){
        config = minFillconfig['edit'];
      }
      if(this.view.flxContent1.isVisible ) {
        if(tbxWidget == "tbx1" && this.view.flxField1Tab1.tbx1Tab1.isVisible){
          this.updateContext("tbx1",this.view.flxField1Tab1.tbx1Tab1.text);
        }
        if(tbxWidget == "tbx2" && this.view.tbx2Tab1.isVisible)
          this.updateContext("tbx2",this.view.tbx2Tab1.text);
        if(tbxWidget == "tbx3" && this.view.tbx3Tab1.isVisible)
        {
          this.view.tbx3Tab1.skin = this.addPayeeUtility.breakPointParser(this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());;
          this.view.tbx4Tab1.skin = this.addPayeeUtility.breakPointParser(this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());;
          this.updateContext("tbx3",this.view.tbx3Tab1.text);
        }
        if(tbxWidget == "tbx4" && this.view.tbx4Tab1.isVisible)
        {
          this.view.tbx3Tab1.skin = this.addPayeeUtility.breakPointParser(this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());;
          this.view.tbx4Tab1.skin = this.addPayeeUtility.breakPointParser(this._sknAddTextBoxEnabled, kony.application.getCurrentBreakpoint());;
          this.updateContext("tbx4",this.view.tbx4Tab1.text);
        }
        if(tbxWidget == "tbx5" && this.view.tbx5Tab1.isVisible)
          this.sendDynamicFieldAddFlowIntoContext();
        tab ="tab1"
      }
      if(this.view.flxContent2.isVisible){
        if(tbxWidget == "tbx1" && this.view.tbx1Tab2.isVisible){
          this.updateContext("tbx1Tab2",this.view.tbx1Tab2.text);
        }
        if(tbxWidget == "tbx2" && this.view.tbx2Tab2.isVisible)
          this.updateContext("tbx2Tab2",this.view.tbx2Tab2.text.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/=/g,"&eq;"));
        if(tbxWidget == "tbx3" && this.view.tbx3Tab2.isVisible)
          this.updateContext("tbx3Tab2",this.view.tbx3Tab2.text);
        if(tbxWidget == "tbx4" && this.view.tbx5Tab2.isVisible)
          this.updateContext("tbx5Tab2",this.view.tbx5Tab2.text);
        if(tbxWidget == "tbx5" && this.view.tbxZipCodeTab2.isVisible)
          this.updateContext("tbxZipCodeTab2",this.view.tbxZipCodeTab2.text);
        if(tbxWidget == "tbx6" && this.view.tbx6Tab2.isVisible)
          this.updateContext("tbx6Tab2",this.view.tbx6Tab2.text);   
        if(tbxWidget == "tbx7" && this.view.tbx6Tab2.isVisible)
          this.updateContext("tbx7Tab2",this.view.tbx6Tab2.text);
        tab ="tab2";
      }
      if(this.view.flxEditPayee.isVisible){  
        if(tbxWidget == "tbx1"&& this.view.tbxName.isVisible){
          this.updateContext("tbxName", this.view.tbxName.text);
        }
        if(tbxWidget == "tbx2"&& this.view.lblAddressLine1.isVisible){
          this.updateContext("tbxAddress", this.view.tbxAddress.text);
        }
        if(tbxWidget == "tbx3"&& this.view.lblDetail1.isVisible){
          this.updateContext("tbxDetail1", this.view.tbxDetail1.text);
        }
        if(tbxWidget == "tbx4"&& this.view.lblDetail2.isVisible){
          this.updateContext("tbxDetail2", this.view.tbxDetail2.text);
        }
        if(tbxWidget == "tbx5"&& this.view.lblCity.isVisible){
          this.updateContext("tbxCity", this.view.tbxCity.text);
        }
        if(tbxWidget == "tbx6"&& this.view.lblZipCode.isVisible){
          this.updateContext("tbxZipCode", this.view.tbxZipCode.text);
        }
         if(tbxWidget == "tbx7" && this.view.tbxAddressLine2.isVisible)
          this.sendDynamicFieldEditFlowIntoContext();
        tab = "edit"; 
      }     
      var dataJson = this.constructDVFInput(tab);

      var uiWidgets = [];
      var accountNumberMappingFields =[];
      if(tab == "tab1"){
        var tbxArray = [{"tbx1":"tbx1Tab1"},{"tbx2":"tbx2Tab1"},{"tbx3":"tbx3Tab1"},{"tbx4":"tbx4Tab1"},{"tbx5":"tbx5Tab1"}];
      }
      if(tab =="tab2"){
        var tbxArray = [{"tbx1":"tbx1Tab2"},{"tbx2":"tbx2Tab2"},{"tbx3":"tbx3Tab2"},{"tbx5":"tbx5Tab2"},{"tbx6":"tbx6Tab2"},{"tbx7":"tbx7Tab2"}]; 
      }
      for(var key in this.textInputsMapping){
        if(this.textInputsMapping[key] =="accountNumber"){
          uiWidgets.push(key);
        }
      }
      if(tab == "tab1"){
        for(var i=0;i<uiWidgets.length;i++){
          if(uiWidgets[i] == "tbx1" ){
            accountNumberMappingFields.push(tbxArray[0]['tbx1']);
          }
          if(uiWidgets[i] == "tbx2" ){
            accountNumberMappingFields.push(tbxArray[1]['tbx2']);
          }
          if(uiWidgets[i] == "tbx3" ){
            accountNumberMappingFields.push(tbxArray[2]['tbx3']);
          }
          if(uiWidgets[i] == "tbx4" ){
            accountNumberMappingFields.push(tbxArray[3]['tbx4']);
          }
          if(uiWidgets[i] == "tbx5" ){
            accountNumberMappingFields.push(tbxArray[4]['tbx5']);
          }    
        }
      }
      if(tab == "tab2"){
        accountNumberMappingFields = [];
        for(var i=0;i<uiWidgets.length;i++){
          if(uiWidgets[i] == "tbx1Tab2" ){
            accountNumberMappingFields.push(tbxArray[0]['tbx1']);
          }
          if(uiWidgets[i] == "tbx2Tab2" ){
            accountNumberMappingFields.push(tbxArray[1]['tbx2']);
          }
          if(uiWidgets[i] == "tbx3Tab2" ){
            accountNumberMappingFields.push(tbxArray[2]['tbx3']);
          }
          if(uiWidgets[i] == "tbx5Tab2" ){
            accountNumberMappingFields.push(tbxArray[3]['tbx5']);
          }
          if(uiWidgets[i] == "tbx6Tab2" ){
            accountNumberMappingFields.push(tbxArray[4]['tbx6']);
          } 
          if(uiWidgets[i] == "tbx7Tab2" ){
            accountNumberMappingFields.push(tbxArray[5]['tbx7']);
          } 
        }
      }
      if(tab == "edit"){
        accountNumberMappingFields = "";
      }
      var tempJson = {};
      for(var key in dataJson){
        if(dataJson[key]){
          tempJson[key] = dataJson[key];
        }
        else{tempJson[key] = "";
            }
      }
      var dataValidator = this.dataValidationHandler.validateMinFill
      (tempJson,object,config);  
      this.enableDisablePrimaryButton(dataValidator,tab);
      if(this.flowType !== undefined && this.flowType !== null && this.flowType !=="EDIT"){
      this.minimumAccountAndConfirmAccountNumberCheck(accountNumberMappingFields,uiWidgets,config,object,tab);
      }
      this.minFillCountryStateValidate();
    },
	
	/**
     * @api : enableDisablePrimaryButton
     * this is used to enable or disable primary button
	 * @params : "tab" checks whether its edit or normal.
	 * @params : "dataValidator" is the data validator object.
     * @return : NA. 
     */
    enableDisablePrimaryButton: function(dataValidator,tab){
      if(tab !=="edit"){
        if(Object.keys(dataValidator).length ===0 &&
           dataValidator.constructor === Object){ 
          this.view.btnRight1.setEnabled(true);
          this.view.btnRight1.skin = "sknBtnNormalSSPFFFFFF4vs";
          this.view.btnRight1.hoverSkin = "ICSknsknBtnNormalSSPFFFFFFHover15Px-hover";
        }
        else{
          this.view.btnRight1.setEnabled(false);
          this.view.btnRight1.skin = "sknBtnBlockedSSPFFFFFF15Px";
          this.view.btnRight1.hoverSkin = "sknBtnBlockedSSPFFFFFF15Px";
        }
      }
      else{
        if(Object.keys(dataValidator).length ===0 &&
           dataValidator.constructor === Object){ 
          this.view.btnSave.setEnabled(true);
          this.view.btnSave.skin = "sknBtnNormalSSPFFFFFF4vs";
        }
        else{
          this.view.btnSave.setEnabled(true);
          this.view.btnSave.skin = "sknBtnNormalSSPFFFFFF4vs";
        }
      }
    },
	/**
     * @api : minFillCountryStateValidate
     * this is used to evalidate country and state fields.
     * @return : NA. 
     */
    minFillCountryStateValidate: function(){
      var countryWidget = "";
      var stateWidget = "";
      if(this.view.flxEditPayee.isVisible){
        countryWidget = "listCountry";
        stateWidget = "listState";
        var countryId = this.view[countryWidget].selectedKeyValue[0];
        var stateId = this.view[stateWidget].selectedKeyValue[0];
        if(countryId == "0" || stateId == "1"){
          this.view.btnSave.setEnabled(false);
          this.view.btnSave.skin = "sknBtnBlockedSSPFFFFFF15Px";
        }
      }
      if(this.view.flxContent2.isVisible){
        countryWidget = "lbxCountry";
        stateWidget = "lbxStateValue";
        var countryId = this.view[countryWidget].selectedKeyValue[0];
        var stateId = this.view[stateWidget].selectedKeyValue[0];
        if(countryId == "0" || stateId == "1"){
          this.view.btnRight1.setEnabled(false);
          this.view.btnRight1.skin = "sknBtnBlockedSSPFFFFFF15Px";     
        }
      }
    },
	
	/**
     * @api : minimumAccountAndConfirmAccountNumberCheck
     * this is used to check minmum account number and reenter account number length.
	 * @params : "accountNumberMappingFields" has the account numbers in a json.
	 * @params : "uiWidgets" have the UI widget ids.
	 * @params : "config" is the config od widgets.
	 * @params : "object" is the object in config.
	 * @params : "tab" is the anme of the tab.
     * @return : NA. 
     */
    minimumAccountAndConfirmAccountNumberCheck:function(accountNumberMappingFields,uiWidgets,config,object,tab){
      var accountNumberMappedField;
      var charsForAccountNumber;
      var isSelected = this.isRememberMe(); 
      if(accountNumberMappingFields){
        var min = Math.min((this.view[accountNumberMappingFields[0]].text).length ,(this.view[accountNumberMappingFields[1]].text).length);
        if(tab == "tab2"){
          accountNumberMappedField = uiWidgets[3];
          charsForAccountNumber = config[object]['tbx6'];
        }
        else{
          accountNumberMappedField = uiWidgets[0];
          charsForAccountNumber = config[object][accountNumberMappedField];  
        }
        if(accountNumberMappedField){ 
          if(tab == "tab2" && isSelected == true)
            return;
          else{
            if(min < charsForAccountNumber){
              this.view.btnRight1.setEnabled(false);
              this.view.btnRight1.skin = "sknBtnBlockedSSPFFFFFF15Px";
            }
          } 
        }
      }
    },
	
	/**
     * @api : performDataValidation
     * this is used to perform data validation.
	 * @params : "successOnValidation" is the method to be invoked on validation success.
     * @return : NA. 
     */
    performDataValidation: function(successOnValidation) {
      var self = this;
      try{
        var dataJson = "";
        var object =  this.getParsedValue(this._payeeObject);
        var view;
        if(this.view.flxContent1.isVisible){
          view ="tab1";
          var fieldMapper = JSON.parse(this._dvfConfig);
          fieldMapper = fieldMapper['tab1'];                                  
        }
        if(this.view.flxContent2.isVisible){
          view ="tab2";
          var fieldMapper = JSON.parse(this._dvfConfig);
          fieldMapper = fieldMapper['tab2'];
        } 
        if(this.view.flxEditPayeeDetails.isVisible){
          view = "payeeDetails";
          var fieldMapper = JSON.parse(this._dvfConfig);
          fieldMapper = fieldMapper['payeeDetails'];
        }
        if(this.view.flxEditPayee.isVisible){
          view = "edit";
          var fieldMapper = JSON.parse(this._dvfConfig);
          fieldMapper = fieldMapper['edit'];
        }
        dataJson = this.constructDVFInput(view);
        if(view =="tab1" || view == "tab2"){
          var isAccountNumberAndReEnterAccountNumberValidated = this.validateAccountAndConfirmAccountNumber();
          if(!isAccountNumberAndReEnterAccountNumberValidated){
            var error = "The Account Number entered does not match";
            if(view == "tab1"){
              this.view.flxContentWrapper.flxContent1.lblField1Error.isVisible = true;
              this.view.flxContentWrapper.flxContent1.lblField1Error.text = error;
              this.view.flxContentWrapper.flxContent1.lblField1Error.setActive(true);
            }
            if(view == "tab2"){
              this.view.flxContentWrapper.flxContent2.lblError.isVisible = true;
              this.view.flxContentWrapper.flxContent2.lblError.text = error;
              this.view.flxContentWrapper.flxContent2.lblError.setActive(true);
            }
            this.enableDisablePrimaryButton({error:error},view)
            this.view[this.resultAccNumberValidation[0]].skin = this.addPayeeUtility.breakPointParser(this._sknAddTextBoxError, kony.application.getCurrentBreakpoint());
            this.view[this.resultAccNumberValidation[1]].skin = this.addPayeeUtility.breakPointParser(this._sknAddTextBoxError, kony.application.getCurrentBreakpoint());
            return ;
          }
        }
        var dataValidator = this.dataValidationHandler.validateData(dataJson,object,fieldMapper);
        if(Object.keys(dataValidator).length === 0 && dataValidator.constructor === Object){
          this.setAddTextBoxesSkinsBasedOnPreviousStoredSkinsState();
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
     * this is used to show validation errors.
	 * @params : "response" is the JSON with error.
     * @return : NA. 
     */
    showValidationErrors: function(response) {
      this.setAddTextBoxesSkinsBasedOnPreviousStoredSkinsState();
      this.invokedvfFieldErrorParser(response);
      var error = "";
      var uiErrorToBeDisplayed = "";
      var clientFieldName = "";    
      error = this.dvfToClientSideErrorMapping(response);
      for(var iterator in error){
        uiErrorToBeDisplayed  += error[iterator] + "\n";
      }
      if(this.view.flxContent1.isVisible){
        this.view.flxContentWrapper.flxContent1.lblField1Error.isVisible = true;
        this.view.flxContentWrapper.flxContent1.lblField1Error.text = uiErrorToBeDisplayed;
      }
      if(this.view.flxContent2.isVisible){
        this.view.flxContentWrapper.flxContent2.lblError.isVisible = true;
        this.view.flxContentWrapper.flxContent2.lblError.text = uiErrorToBeDisplayed;
      }
      if(this.view.flxEditPayeeDetails.isVisible){
        this.view.lblFieldErrorPayeeDetails.isVisible = true;
        this.view.lblFieldErrorPayeeDetails.text = uiErrorToBeDisplayed;
        this.view.tbx5.setActive(true);
      }
      if(this.view.flxEditPayee.isVisible){
        this.view.lblEditError.isVisible = true;
        this.view.lblEditError.text = uiErrorToBeDisplayed;
      }
    },

    /**
     * @api : dvfToClientSideErrorMapping
     * mapper between dvfFields and error fields to  display a meaningful errorMessage on UI.
     * @return : NA
     */
    dvfToClientSideErrorMapping: function(dvfError) {
      if(this.view.flxContent1.isVisible){
        var tbx1 = this.getParsedValue(this._Tab1Field1Value)
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx1) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx1.mapping)){    
          tbx1 = this.mapTextInputContractToDvfKey(tbx1.mapping); 
        }
        var tbx2 = this.getParsedValue(this._Tab1Field2Value)
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx2) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx2.mapping)){
          tbx2 = this.mapTextInputContractToDvfKey(tbx2.mapping);
        }
        var tbx3 = this.getParsedValue(this._Tab1Field3Value);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx3) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx3.mapping)){
          tbx3 = this.mapTextInputContractToDvfKey(tbx3.mapping);
        }
        var tbx4 = this.getParsedValue(this._Tab1Field4Value);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx4) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx4.mapping)){  
          tbx4 = this.mapTextInputContractToDvfKey(tbx4.mapping);
        }
        var field5 = [];
        try{
          field5 = JSON.parse(this._Tab1Field5Value);
        }
        catch(e){
          field5 = this._Tab1Field5Value;
        }
        var categoryId = this.selCategoryID
        field5 = field5.filter((function(record){
          if(record["category"]){
            var categories = record["category"];
            if(categories.includes(categoryId))
              return true;
            return false;
          }
        }));
        if(field5.length > 0){
          var field5Mapping = field5[0].mapping;
          var tbx5 = field5Mapping;
          tbx5 = this.mapTextInputContractToDvfKey(tbx5);
        }     
        var errorMapper ={
          "tbx1": tbx1,
          "tbx2" : tbx2,
          "tbx3":tbx3,
          "tbx4": tbx4,
          "tbx5": tbx5
        };
      }
      if(this.view.flxContent2.isVisible){
        var tbx1 = this.getParsedValue(this._Tab2Field1Value);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx1) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx1.mapping)){ 
          tbx1 = this.mapTextInputContractToDvfKey(tbx1.mapping); 
        }
        var tbx2 = this.getParsedValue(this._Tab2AddressLine1Value);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx2) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx2.mapping)){ 
          tbx2 = this.mapTextInputContractToDvfKey(tbx2.mapping);
        }
        var tbx3 = this.getParsedValue(this._Tab2AddressLine2Value);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx3) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx3.mapping)){ 
          tbx3 = this.mapTextInputContractToDvfKey(tbx3.mapping);
        }
        var tbx4 = this.getParsedValue(this._Tab2CityValue);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx4) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx4.mapping)){ 
          tbx4 = this.mapTextInputContractToDvfKey(tbx4.mapping);
        }
        var tbx5 = this.getParsedValue(this._Tab2ZipCodeValue);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx5) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx5.mapping)){ 
          tbx5 = this.mapTextInputContractToDvfKey(tbx5.mapping);     
        }
        var tbx6 = this.getParsedValue(this._Tab2Field8Value);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx6) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx6.mapping)){ 
          tbx6 = this.mapTextInputContractToDvfKey(tbx6.mapping);
        }
        var tbx7 = this.getParsedValue(this._field9ValueTab2);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx7) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx7.mapping)){ 
          tbx7 = this.mapTextInputContractToDvfKey(tbx7.mapping);    
        }
        var errorMapper ={
          "tbx1": tbx1,
          "tbx2": tbx2,
          "tbx3": tbx3,
          "tbx4": tbx4,
          "tbx5": tbx5,
          "tbx6": tbx6,
          "tbx7": tbx7
        };
      }

      if(this.view.flxEditPayeeDetails.isVisible){
        var tbx1 = this.getParsedValue(this._editField4Value);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx1) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx1.mapping)){ 
          tbx1 = this.mapTextInputContractToDvfKey(tbx1.mapping); 
        }
        var tbx2 = this.getParsedValue(this._editField5Value);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx2) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx2.mapping)){
          tbx2 = this.mapTextInputContractToDvfKey(tbx2.mapping); 
        }
        var errorMapper ={
          "tbx1": tbx1,
          "tbx2" : tbx2
        };
      }
      if(this.view.flxEditPayee.isVisible){
        var tbx1 = this.getParsedValue(this._editFlowField1Value);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx1) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx1.mapping)){ 
          tbx1 = this.mapTextInputContractToDvfKey(tbx1.mapping); 
        }

        var tbx2 = this.getParsedValue(this._editFlowField2Value);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx2) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx2.mapping)){ 
          tbx2 = this.mapTextInputContractToDvfKey(tbx2.mapping); 
        }
        var tbx3 = this.getParsedValue(this._editFlowAddress1Value);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx3) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx3.mapping)){ 
          tbx3 = this.mapTextInputContractToDvfKey(tbx3.mapping); 
        }
        var tbx4 = this.getParsedValue(this._editFlowAddress2Value);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx4) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx4.mapping)){ 
          tbx4 = this.mapTextInputContractToDvfKey(tbx4.mapping); 
        }
        var tbx5 = this.getParsedValue(this._editFlowCityValue);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx5) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx5.mapping)){ 
          tbx5 = this.mapTextInputContractToDvfKey(tbx5.mapping); 
        }
        var tbx6 = this.getParsedValue(this._editFlowZipCodeValue);
        if(!this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx6) && !this.addPayeeUtility.isNullOrUndefinedOrEmpty(tbx6.mapping)){ 
          tbx6 = this.mapTextInputContractToDvfKey(tbx6.mapping); 
        }
        var errorMapper ={
          "tbx1": tbx1,
          "tbx2" : tbx2,
          "tbx3": tbx3,
          "tbx4": tbx4,
          "tbx5": tbx5,
          "tbx6": tbx6
        };
      }
      var clientNameToDisplay = {
        "companyName": "Name",
        "zipCode": "Zip Code",
        "accountNumber":"Account Number",
        "street":"Address Line 1",
        "addressLine2": "Address Line 2",
        "cityName":"City",
        "payeeNickName" :"Nickname",
        "nameOnBill":"Name On Bill",
        "phone":"phone"
      };
      var categoryId = this.selCategoryID;
      if(categoryId =="2"){
        clientNameToDisplay['phone'] ="Phone Number";
      }
      if(categoryId =="4"){
        clientNameToDisplay['phone'] ="Policy Number";
      }
      for(var i in errorMapper){
        for(var j in clientNameToDisplay)
          if(errorMapper[i] ==j){
            errorMapper[i] = clientNameToDisplay[j];
          }
      }

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
     * @api : addPayeeValidationSuccess
     * this is used to update context on successful validation.
     * @return : NA. 
     */
    addPayeeValidationSuccess: function(){
      if(this.view.flxContent1.isVisible) {
        this.updateContext("tbx1",this.view.flxField1Tab1.tbx1Tab1.text);
        this.updateContext("tbx2",this.view.tbx2Tab1.text);
        this.updateContext("tbx3",this.view.tbx3Tab1.text);
        this.updateContext("tbx4",this.view.tbx4Tab1.text);
        this.sendDynamicFieldAddFlowIntoContext();
      }
      else{
        this.updateContext("tbx1Tab2",this.view.tbx1Tab2.text);
        this.updateContext("tbx2Tab2",this.view.tbx2Tab2.text.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/=/g,"&eq;"));
        this.updateContext("tbx3Tab2",this.view.tbx3Tab2.text);
        this.updateContext("tbx5Tab2",this.view.tbx5Tab2.text);
        this.updateContext("tbx6Tab2",this.view.tbx6Tab2.text);
        this.updateContext("tbx7Tab2",this.view.tbx7Tab2.text);
        this.updateContext("tbxZipCodeTab2",this.view.tbxZipCodeTab2.text);
        this.updateContext("tbx8Tab2",this.view.tbx8Tab2.text);
      }  
      var self = this;
      this.hideRightFlx();
      var objSvcName = this.getParsedValue(this._payeeObjectService);
      var objName = this.getParsedValue(this._payeeObject);
      var operationName = this.getParsedValue(this._customCREATEOperation);
      var criteria = this.getCriteria(this._customCREATECriteria);
      var identifier = this.getParsedValue(this._customCREATEIdentifier);
      if(operationName && criteria && identifier) {
        this.addPayeeDAO.customPayee
        (objSvcName,objName,operationName,criteria,this.onSuccessCustomPayee,identifier,self.onErrorCustomPayee);
      }
      else {
        this.showScreen(this.screens[1]);
        this.setScreen2Data();
      }
    },
	
	/**
     * @api : onSuccessCustomPayee
     * this is invoked on success of add payee.
	 * @params : "response" is the service response.
	 * @params : "unicode" is the service identifier.
     * @return : NA. 
     */
    onSuccessCustomPayee: function(response, unicode) {
      kony.application.dismissLoadingScreen();
      this.addPayeeUtility.readObject(response);
      this.parserUtilsManager.setResponseData(unicode,this.addPayeeUtility.map);
      this.showScreen(this.screens[1]);
      this.setScreen2Data();
    },
	
	/**
     * @api : onErrorCustomPayee
     * this is invoked on error of add payee.
     * @return : NA. 
     */
    onErrorCustomPayee: function() {
      this.showScreen(this.screens[1]);
      this.setScreen2Data();
    },
	
	/**
     * @api : screen1BtnRight1OnClick
     * this is invoked on screen 1 right 1st button click to do data validation.
     * @return : NA. 
     */
    screen1BtnRight1OnClick: function() {
      this.performDataValidation(this.addPayeeValidationSuccess.bind(this));

    },

	/**
     * @api : screen1BtnRight1OnClick
     * this is invoked on screen 1 right 2nd button click to clear data.
     * @return : NA. 
     */
    screen1BtnRight2OnClick: function() {
      if(this.view.flxContent1.isVisible) {	
        this.clearTab1ValidationErrors();
        this.clearFieldsContent1();
      }
      else{
        this.clearTab2ValidationErrors();
        this.clearFieldsContent2();
      }
      this.setAddTextBoxesSkinsBasedOnPreviousStoredSkinsState();
      this.view.btnRight1.setEnabled(false);
      this.view.btnRight1.skin = "sknBtnBlockedSSPFFFFFF15Px";
    },

	/**
     * @api : clearFieldsContent1
     * this is invoked to clear content1 fields.
     * @return : NA. 
     */
    clearFieldsContent1: function() {
      var scope = this;
      var textInputs = ["tbx1Tab1", "tbx2Tab1", "tbx3Tab1", "tbx4Tab1", "tbx5Tab1"];
      textInputs.forEach(function(srcWidget){
        scope.view[srcWidget].text = "";
      });
      this.view.flxTab1Field5.isVisible = false;
      this.view.tbx5Tab1.isVisible = false;
      this.view.flxTab1Field5Phone.isVisible = false;
      this.parserUtilsManager.clearContext(this.textInputsMapping);
    },
	
	/**
     * @api : clearFieldsContent2
     * this is invoked to clear content2 fields.
     * @return : NA. 
     */
    clearFieldsContent2: function() {
      var scope = this;
      var textInputs = ["tbx1Tab2", "tbx2Tab2", "tbx3Tab2", "tbx5Tab2", "tbx6Tab2","tbx7Tab2","tbxZipCodeTab2","tbx8Tab2"];
      textInputs.forEach(function(srcWidget){
        scope.view[srcWidget].text = "";
      });
      this.view.lbxCountry.selectedKey = this.countriesMasterData[0][0];
      this.view.lbxStateValue.selectedKey = this.statesMasterData[0][0];
      this.view.lbxStateValue.setEnabled(false);
      this.parserUtilsManager.clearContext(this.textInputsMapping);
    },
	
	/**
     * @api : cancelEditPayee
     * this is invoked to cancel edit payee
     * @return : NA. 
     */
    cancelEditPayee: function(){
      this.clearEditValidationErrors();
      this.navigateToViewAllPayees(this.componentContext);
    },
	
	/**
     * @api : cancelEditPayee
     * this is invoked to cancel edit payee
     * @return : NA. 
     */
    editDetailsBtnRight1OnClick: function() {
      this.updateContext("tbx4Edit",this.view.tbx4.text);
      this.updateContext("tbx5Edit",this.view.tbx5.text);
      this.performDataValidation(this.contractBasedNavigation.bind(this));
    },
	
	/**
     * @api : contractBasedNavigation
     * this is invoked to cancel edit payee
     * @return : NA. 
     */
    contractBasedNavigation: function() {
      this.showScreen(this.screens[6]);
      this.setScreen6Data();
    },
	
	/**
     * @api : setScreen6Data
     * this methos is used to set screen 6 data.
     * @return : NA. 
     */
    setScreen6Data: function() {
      var self = this;
      var objSvc = self.getParsedValue(self._contractObjectService);
      var obj = self.getParsedValue(self._contractObject);
      var operation = self.getParsedValue(self._contractOperation);
      var profileAccess = self.profileAccess;
      self.addPayeeDAO.getCustomerContracts(objSvc, obj, operation, "", self.getContractCustomersSuccessCallback.bind(self, profileAccess), "", self.getContractCustomersFailureCallback);
    },
    
	/**
     * @api : getContractCustomersSuccessCallback
     * this methos is invoked on success of contracts service call.
	 * @params : "profileAccess" says what access is to be given to profile.
	 * @params : "res" gives the response of service.
	 * @params : "unicode: is the service identifier to store service response.
     * @return : NA. 
     */
    getContractCustomersSuccessCallback: function(profileAccess, res, unicode) {
      var lenContracts = res["contracts"].length;
      var cifData = this.parserUtilsManager.context.cif;
      if(lenContracts === 1) {
        var lenCCustomers = res["contracts"][0]["contractCustomers"].length;
        if(lenCCustomers <= 1) {
          var self = this;
		  self.view.contractList.initialiseComponent(res);
          this.selectContractCustomersContinue(res);
        } else {
          var self = this;
          self.view.contractList.setContext({"profileAccess": profileAccess});
          self.view.contractList.setParentScope(self);
          if(this.FlowType === "EDIT" && (!kony.sdk.isNullOrUndefined(cifData)) && cifData !== "" && cifData.length > 0) {
            self.view.contractList.initialiseComponent(res, cifData);
          }else{
            self.view.contractList.initialiseComponent(res);
          }
        }
      } else if(lenContracts === 0) {
        this.selectContractCustomersContinue([]);
      } else {
        var self = this;
        self.view.contractList.setContext();
        self.view.contractList.setParentScope(self);
        if(this.FlowType === "EDIT" && (!kony.sdk.isNullOrUndefined(cifData)) && cifData !== "" && cifData.length > 0) {
          self.view.contractList.initialiseComponent(res, cifData);
       } else{
          self.view.contractList.initialiseComponent(res);
       }
       this.showScreen(this.screens[6]);
      }
      kony.application.dismissLoadingScreen();
    },
    
	/**
     * @api : selectContractCustomersContinue
     * this method is used to decide the continue button.
	 * @params : "data" says what access is to be given to profile.
     * @return : NA. 
     */
    selectContractCustomersContinue: function(data) {
      if(this.FlowType === "ADD"){
        this.showScreen(this.screens[3]);
        this.setScreen4Data(data);
      }else {
        this.editPayeeInvocationAfterValidation(data);
      }
    },
	
	/**
     * @api : contractCustomersCancel
     * this method is used to navigate on click of cancel.
     * @return : NA. 
     */
    contractCustomersCancel: function() {
      this.reviewCancelAction();
    },
	
	/**
     * @api : contractCustomersBack
     * this method is used for customers screen back.
     * @return : NA. 
     */
    contractCustomersBack: function() {
      if(this.FlowType === "ADD"){
      this.clearTab1ValidationErrors();
      this.clearTab2ValidationErrors();
      this.showScreen(this.screens[1]);
      } else {
        this.getEditBillerScreen();
        this.view.flxContractList.setVisibility(false);
        this.hideRightFlx();
      }
    },
	
	/**
     * @api : getContractCustomersFailureCallback
     * this method is invoked on error call back 
     * @return : NA. 
     */
    getContractCustomersFailureCallback: function(err) {
     kony.print("get contracts service call failed");
  	},
	
	/**
     * @api : editDetailsBtnRight2OnClick
     * this method is invoked on edit details right 2nd button.
     * @return : NA. 
     */
    editDetailsBtnRight2OnClick: function() {
      this.clearTab1ValidationErrors();
      this.clearTab2ValidationErrors();
      this.showScreen(this.screens[0]); 
      this.hideRightFlx();
    },
	
	/**
     * @api : editDetailsBtnRight3OnClick
     * this method is invoked on edit details right 3rd button.
     * @return : NA. 
     */
    editDetailsBtnRight3OnClick: function() {
      this.reviewCancelAction();         
    },
	
	/**
     * @api : formCIFData
     * this method is used to set CIF Data.
     * @return : NA. 
     */
    formCIFData: function (segData) {
      let cif = [];
      segData.forEach(x => {
        let coreCustomerIdArray = [];
        x[1].forEach(y => {
          if(y.lblCustomerCheckbox.text === "C"){
            coreCustomerIdArray.push(y.lblCustomerNumber.text)
          }});
        cif.push({
          "contractId": x[0].lblIdentityNumber.text,
          "coreCustomerId": coreCustomerIdArray.join(',')
        });
      });
      return JSON.stringify(cif);
    },
	
	/**
     * @api : confirmBtnRight1OnClick
     * this method is invoked on confirm right button 1 on click.
     * @return : NA. 
     */
    confirmBtnRight1OnClick: function() {
      var self = this;
      this.parserUtilsManager.setCIFIntoContext(self.view.screenConfirmContract.getCIFData(),"cif");
      var objSvcName = this.getParsedValue(this._payeeObjectService);
      var objName = this.getParsedValue(this._payeeObject);
      var operationName = this.getParsedValue(this._payeeCREATEOperation);
      var criteria = this.getCriteria(this._payeeCREATECriteria);
      this.makePaymentContext = criteria;
      var data = this.view.screenConfirmContract.getContext();
      if(this.view.btnEnterPayeeInfo.skin === "sknBtnSSP42424217PxSelectedTab" && this.view.lblRememberMeIcon.skin === "sknlblDelete20px") {
        if(criteria["accountNumber"]) {
          criteria["accountNumber"] = "";
        }
      }
      if (criteria["isBusinessPayee"] === "") {
        criteria["isBusinessPayee"] = "0";
      }
      var identifier = this.getParsedValue(this._payeeCREATEIdentifier);
      this.addPayeeDAO.createPayee
      (objSvcName,objName,operationName,criteria,this.onSuccessCreatePayee.bind(this, data),identifier,self.onError);

    },
	
	/**
     * @api : onSuccessCreatePayee
     * this method is invoked on success of create payee.
	 * @params : "data" is the data for screen 5
	 * @params : "response" is the data from service call.
	 * @params : "unicode" is the identifier to store service data.
     * @return : NA. 
     */
    onSuccessCreatePayee: function(data, response, unicode) {
      kony.application.dismissLoadingScreen();
      this.addPayeeUtility.readObject(response);
      if(response.dbpErrMsg) {
        this.view.rtxDowntimeWarning.text = response.dbpErrMsg;
        this.view.flxDowntimeWarning.setVisibility(true);
        this.showScreen(this.screens[0], "error");
        this.clearTbxAndSetFocus(response.dbpErrCode);
      } else {
        this.view.rtxDowntimeWarning.text = "";
        this.view.flxDowntimeWarning.setVisibility(false);
        this.makePaymentContext.payeeId = response.payeeId;
        this.parserUtilsManager.setResponseData(unicode, this.addPayeeUtility.map);
        this.showScreen(this.screens[4]);
        this.setScreen5Data(data);
      }
    },
    clearTbxAndSetFocus : function(dbpErrCode){
      if (dbpErrCode === "12062") {
        // this.view.tbx3Tab1.text = "";
        // this.view.tbx4Tab1.text = "";
        this.view.tbx3Tab1.skin = this.addPayeeUtility.breakPointParser(this._sknAddTextBoxError, kony.application.getCurrentBreakpoint());
        this.view.tbx4Tab1.skin = this.addPayeeUtility.breakPointParser(this._sknAddTextBoxError, kony.application.getCurrentBreakpoint());
        this.enableDisablePrimaryButton({dbpErrCode:dbpErrCode},"save");
        // this.view.tbx3Tab1.setFocus(true);
      }
    },
	
    onError: function() {

    },
	
	/**
     * @api : editPayee
     * this method is invoked on edit payee
	 * @return : NA. 
     */
    editPayee: function() {
      this.contractBasedNavigation();
    },
	
	/**
     * @api : editPayeeInvocationAfterValidation
     * this method is invoked on edit payee after validation.
	 * @params : "segData" is used to get contracts.
	 * @return : NA. 
     */
    editPayeeInvocationAfterValidation:function(segData){
      var self = this;
      let cif = [];
      if(segData.contracts!==undefined && segData.contracts!== null)
      {
        segData = segData.contracts;
        segData.forEach(x => {
          let coreCustomerIdArray = [];
          x.contractCustomers.forEach(y => coreCustomerIdArray.push(y.coreCustomerId));
          cif.push({
            "contractId": x.contractId,
            "coreCustomerId": coreCustomerIdArray.join(',')
          });
        });
      } else {
        cif = self.view.contractList.getCIFDataForEdit(segData);
      }
      this.parserUtilsManager.setCIFIntoContext(JSON.stringify(cif),"cif");
      this.populateContext();
      var objSvcName = this.getParsedValue(this._payeeObjectService);
      var objName = this.getParsedValue(this._payeeObject);
      var operationName = this.getParsedValue(this._payeeEDITOperation);
      var criteria = this.getCriteria(this._payeeEDITCriteria);
      var identifier = this.getParsedValue(this._payeeEDITIdentifier);
      if(criteria['phone'] == null || criteria['phone'] == undefined  || criteria['phone'] == ""){
        delete criteria['phone'];
      }
      this.addPayeeDAO.updatePayee
      (objSvcName,objName,operationName,criteria,this.onSuccessEditPayee.bind(this, segData),identifier,self.onEditError);
    },
	
	
	/**
     * @api : populateContext
     * this method is invoked to populate context.
	 * @return : NA. 
     */
    populateContext: function() {
      this.updateContext("tbxName", this.view.tbxName.text);
      this.updateContext("tbxAddress", this.view.tbxAddress.text);
      this.sendDynamicFieldEditFlowIntoContext();
      this.updateContext("tbxEditValue4", this.view.tbxEditValue4.text);
      this.updateContext("tbxEditValue5", this.view.tbxEditValue5.text);
      this.updateContext("tbxDetail1", this.view.tbxDetail1.text);
      this.updateContext("tbxDetail2", this.view.tbxDetail2.text);
      this.updateContext("tbxCity", this.view.tbxCity.text);
      this.updateContext("tbxZipCode", this.view.tbxZipCode.text);
	  if(!kony.sdk.isNullOrUndefined(this.view.lbxCountry.selectedKeyValue))
		this.updateContext("country",this.view.lbxCountry.selectedKeyValue[1]);
	  if(!kony.sdk.isNullOrUndefined(this.view.lbxStateValue.selectedKeyValue))
		this.updateContext("state",this.view.lbxStateValue.selectedKeyValue[1]);
    },

	/**
     * @api : onSuccessEditPayee
     * this method is invoked on success of edit payee service call.
	 * @params : "data" is passed to success of edit payee.
	 * @params : "response" is the service response.
	 * @params : "unicode" is the service response handler.
	 * @return : NA. 
     */
    onSuccessEditPayee: function(data, response, unicode) {
      kony.application.dismissLoadingScreen();
      var profileAccess = this.profileAccess;
      this.addPayeeUtility.readObject(response);
      this.parserUtilsManager.setResponseData(unicode,this.addPayeeUtility.map);
      this.showScreen(this.screens[4]);
      this.setScreen5Data({"data":data, "profileAccess": profileAccess});
    },
    onEditError: function() {

    },
	
	/**
     * @api : confirmBtnRight2OnClick
     * this method is invoked on confirm of 2nd right button.
	 * @return : NA. 
     */
    confirmBtnRight2OnClick: function() {
      this.clearTab1ValidationErrors();
      this.clearTab2ValidationErrors();
	  this.view.lblBlockTitle.text = this.getLabelText(this._blockTitle);
       //this.view.lblBlockTitle.setActive(true);
       if (kony.application.getCurrentBreakpoint() === 640) {
                this.view.lblHeader2.setActive(true);
            }
            else{
                this.view.lblBlockTitle.setActive(true);
            }
      this.showScreen(this.screens[0]);
      this.hideRightFlx();
    },
	
	/**
     * @api : confirmBtnRight3OnClick
     * this method is invoked on confirm of 3rd right button.
	 * @return : NA. 
     */
    confirmBtnRight3OnClick: function() {
      this.reviewCancelAction();
      this.clearTab1ValidationErrors();
      this.clearTab2ValidationErrors();     
    },
	
	/**
     * @api : confirmBtnRight3OnClick
     * this method is invoked on confirm of 3rd right button.
	 * @return : NA. 
     */
    ackBtnRight1OnClick: function() {
      this.clearTab1ValidationErrors();
      this.clearTab2ValidationErrors();
      this.showScreen(this.screens[0]); 
      this.hideRightFlx();
      this.screen1BtnRight2OnClick();
    },

    ackBtnRight2OnClick: function() {

    },

    ackBtnRight3OnClick: function() {

    },
    
	/**
     * @api : categoryBtnRight2Onclick
     * used to excute methods in category btn right2 on click.
     * @return : parsed value result
     */
    categoryBtnRight2Onclick: function() {
      this.clearTab1ValidationErrors();
      this.clearTab2ValidationErrors();
      this.showScreen(this.screens[0]);
      this.hideRightFlx();
    },
    
	/**
     * @api : categoryBtnRight3Onclick
     * used to excute methods in category btn right3 on click.
     * @return : parsed value result
     */
    categoryBtnRight3Onclick: function() {
      this.reviewCancelAction();
    },

    /**
     * @api :  constructEntitlmentJson.
     * constructs the Json format required for setting the entitlements.
     * @return : entitilementJSON
     */
    constructEntitlmentJson: function(){
      var entitlementJson = {};
      entitlementJson.entitlement = {};
      entitlementJson.entitlement.features = this.entitlementContext.features;
      entitlementJson.entitlement.permissions = this.entitlementContext.permissions;
      return entitlementJson;
    },

    /**
     * @api :  getParsedValue.
     * used to parse the given property for required value.
     * @params : "property" to be parsed.
     * @params : "selectedValue" used to get the required property.
     * @return : "property" parsed value.
     */
    getParsedValue: function(property, selectedValue) {
      try{
        property = JSON.parse(property);
      }
      catch(e){
        property = property;
        kony.print(e);
      }
      if(typeof(property) === "string"){
        return this.getProcessedText(property);
      }

      else{
        if(selectedValue)
          return this.getProcessedText(this.parserUtilsManager.getComponentConfigParsedValue(property,selectedValue));
        else
          return property;
      }

    },
    
	/**
     * @api :  categoryBtnRight1Onclick.
     * nvoked on continue button in beneficiary category screen.
     * @return : NA
     */
    categoryBtnRight1Onclick: function() {
      if(!this.formatComponentValues["startIconText"]){
        this.formatComponentValues["startIconText"] = this.selectedReviewText;
        this.formatComponentValues["startIconSkin"] = this.selectedReviewIcon;
      }
      var criteria1Context = this.getParsedValueForSelectedKey(this._radioIcon1Criteria);
      var criteria2Context = this.getParsedValueForSelectedKey(this._radioIcon2Criteria);
      if(this.view.lblBtnPersonal.text === this.radioIcon1InitialValue){
        this.parserUtilsManager.setContext(criteria1Context);
      }
      else{
        this.parserUtilsManager.setContext(criteria2Context);
      }    
      this.showScreen(this.screens[3]);
      this.setScreen4Data();
    },
    
	/**
     * @api :  populateScreen2LabelsBasedOnContracts.
     *  populates account type view based on contracts.
     * @return : NA
     */
    setScreen3Data: function() {
      try{
        var scope=this;
        if(!this.radioIcon1InitialValue){
          this.view.lblPersonalBanking.top = "15dp";
          this.view.lblBusinessBanking.top = "45dp";

          this.view.lblHeader.text = this.getLabelText(this._categoryTitle)
          this.view.lblPersonalBanking.text = this.getLabelText(this._categoryLabel1);
          this.view.lblBusinessBanking.text = this.getLabelText(this._categoryLabel2);

          var radioValue1 = this.getParsedValueForSelectedKey(this._radioIcon1);
          if(radioValue1 && radioValue1.hasOwnProperty("icon")){
            this.view.lblBtnPersonal.skin = radioValue1.icon.skin;
            this.view.lblBtnPersonal.text = radioValue1.icon.vizIcon;
            this.radioIcon1InitialValue = this.view.lblBtnPersonal.text;
          }
          var radioValue2 = this.getParsedValueForSelectedKey(this._radioIcon2);
          if(radioValue2 && radioValue2.hasOwnProperty("icon")){
            this.view.lblBtnBusiness.skin = radioValue2.icon.skin;  
            this.view.lblBtnBusiness.text = radioValue2.icon.vizIcon;
          }
          var reviewIcon1={};
          var reviewIcon2={};
          if(radioValue1 && radioValue1.hasOwnProperty("reviewIcon")){
            reviewIcon1["skin"] = radioValue1.reviewIcon.skin;
            reviewIcon1["text"] = radioValue1.reviewIcon.vizIcon;
            if(radioValue1.selected){
              this.selectedReviewIcon = radioValue1.reviewIcon.skin;
              this.selectedReviewText = radioValue1.reviewIcon.vizIcon;
            }
          }
          if(radioValue2 && radioValue2.hasOwnProperty("reviewIcon")){
            reviewIcon2["skin"] = radioValue2.reviewIcon.skin;
            reviewIcon2["text"] = radioValue2.reviewIcon.vizIcon;
            if(radioValue2.selected){
              this.selectedReviewIcon = radioValue2.reviewIcon.skin;
              this.selectedReviewText = radioValue2.reviewIcon.vizIcon;
            }
          }
          this.view.lblBtnPersonal.onTouchEnd = scope.lblPersonalTouchEnd.bind
          (this,reviewIcon1,this.view.lblBtnPersonal.text,this.view.lblBtnBusiness.text);
          this.view.lblBtnBusiness.onTouchEnd = scope.lblBusinessTouchEnd.bind
          (this,reviewIcon2,this.view.lblBtnBusiness.text,this.view.lblBtnPersonal.text);
        }
      }
      catch(err){
        var errObj = {
          "errorInfo" : "Error in setScreen3Data method of the component.",
          "error": err
        };
        scope.onError(errObj);	
      }
    },

    /**
     * @api : lblPersonalTouchEnd
     * renders the ui on accounttype view based on the radio selection.
     * @return : NA
     */
    lblPersonalTouchEnd: function(reviewIcon, option1, option2) {
      this.formatComponentValues["startIconText"] = reviewIcon["text"];
      this.formatComponentValues["startIconSkin"] = reviewIcon["skin"];
      if(this.view.lblBtnPersonal.text === option1){
        this.view.lblBtnPersonal.text = option2;
        this.view.lblBtnBusiness.text = option1;
      }
      else{
        this.view.lblBtnPersonal.text = option1;
        this.view.lblBtnBusiness.text = option2;
      }
    },

    /**
     * @api : lblBusinessTouchEnd
     * renders the ui on accounttype view based on the radio selection.
     */
    lblBusinessTouchEnd: function(reviewIcon ,option1, option2) {
      this.formatComponentValues["startIconText"] = reviewIcon["text"];
      this.formatComponentValues["startIconSkin"] = reviewIcon["skin"];
      if(this.view.lblBtnBusiness.text === option1){
        this.view.lblBtnPersonal.text = option1;
        this.view.lblBtnBusiness.text = option2;
      }
      else{
        this.view.lblBtnPersonal.text = option2;
        this.view.lblBtnBusiness.text = option1;
      }
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
      var parsedValue = {};
      try{
        parsedValue = JSON.parse(value);
        if(parsedValue.hasOwnProperty(key)){
          parsedValue = parsedValue[key];
        }
      }
      catch(e){
        kony.print(e);
        return parsedValue;
      }
      return parsedValue;
    },

    /**
     * @api : setContext
     * To collect the context object required for the component. 
     * @param : context{JSONobject} - account object 
     * @return : NA
     */
    setContext: function(context, scope) {
      this.context = context;
      if(this.context.hasOwnProperty('entitlement')){
        this.entitlementContext.features  = this.context.entitlement.features;
        this.entitlementContext.permissions = this.context.entitlement.permissions;
      }
      if(this.parentScope ==""){
        this.parentScope = scope;
      }
      if(this.context.hasOwnProperty('profileAccess')){
        this.profileAccess = this.context.profileAccess;
      }
      this.parserUtilsManager.setContext(this.context);
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
     * @api : onBreakPointChange
     * method invoked on change of breakpoint
     * @return : NA
     */
    onBreakPointChange: function() {
      var self = this;
      this.setTabsData();
      this.resetComponentData();
      this.resetValidationFields();
      this.eventTriggered = "BP";
      this.initialContentVisibility();
      this.eventTriggered = "";
    },
    
    /**
     * @api : getLatitudeAndLongitude
     * method invoked to get logitude and latitude.
     * @return : NA
     */
    getLatitudeAndLongitude: function(){
      var self = this;
      self.locationObj.currLatitude = "";
      self.locationObj.currLongitude = "";
      var locationPermissionSuccess = function(location) {
        if (location.coords) {
          self.locationObj.currLatitude = location.coords.latitude +"";
          self.locationObj.currLongitude = location.coords.longitude + "";
        }
      };
      var locationPermissionDenied = function(res) {
        kony.print("User denied location access");
      };
      navigator.geolocation.getCurrentPosition(locationPermissionSuccess, locationPermissionDenied);
    },
    
     /**
     * @api : addressLine1TextChange
     * method invoked on text change of address 1
     * @return : NA
     */
    addressLine1TextChange: function(){
      var self = this;
      var criteria = self.locationObj;
      var text = this.view.tbx2Tab2.text.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/=/g,"&eq;");
      var length = this.view.tbx2Tab2.text.length;
      criteria['query'] = text;
      this._ADDRgoogleApiEnabled = true; // need to remove this, currently value is empty- TODO
      if(this._ADDRgoogleApiEnabled){
        if(this._ADDRnumberOfCharsToTriggerAutoFill <= length){
          var objSvcName = this.getParsedValue(this._suggestionsObjectService);
          var objName = this.getParsedValue(this._suggestionsObject);
          var operationName = this.getParsedValue(this._getAddressSuggestionsOperation);
          var identifier = this.getParsedValue(this._getAddressSuggestionIdentifier);
          this.addPayeeDAO.getAddressSuggestions
          (objSvcName,objName,operationName,criteria,self.getAddressSuggestionSuccess,identifier,self.getAddressSuggestionError);
        }
        else{

        }
      }
    },
    
    /**
     * @api : getAddressSuggestionSuccess
     * method invoked on success of address suggestion success.
     * @params : "addressSuggestions" is the service response
     * @return : NA
     */
    getAddressSuggestionSuccess: function(addressSuggestions){
      var self = this;

      this.view.segAddress.widgetDataMap = {
        "lblCountryNameKA": "lblAddress",
        "flxDropdownKA": "flxDropdownKA"
      };
      if (!addressSuggestions.length || addressSuggestions.length == 0 ) {
        this.view.flxAddressSuggestions.setVisibility(false);
      } else {
        var formattedData = addressSuggestions.map(self.constructAddressSuggestionsData);
        this.view.segAddress.setData(formattedData);
        this.view.flxAddressSuggestions.setVisibility(true);
      }
      kony.application.dismissLoadingScreen()
    },
    
     /**
     * @api : getAddressSuggestionSuccess
     * method invoked on success of address suggestion success.
     * @params : "addressSuggestions" is the service response
     * @return : NA
     */
    getAddressSuggestionError: function(){
      kony.application.dismissLoadingScreen()

    },
    
     /**
     * @api : constructAddressSuggestionsData
     * method used to used to construct address service data
     * @params : "data" is used to construct address service data
     * @return : "locationRecord" the record of location.
     */
    constructAddressSuggestionsData: function(data) {
      var place_id = data.place_id;
      var locationRecord = {};
      locationRecord["lblAddress"] = data["formattedAddress"];
      locationRecord["flxDropdownKA"] = {
        "onClick": this.fetchLocation.bind(this, data)
      };
      return locationRecord;
    },
    
     /**
     * @api : fetchLocation
     * method invoked to fetch location.
     * @params : "record" is the is the record to get location.
     * @return : NA
     */
    fetchLocation: function(record) {
      var self = this;
      var payload = {"placeID":""};
      payload['placeID'] = record['place_id'];
      this.view.flxAddressSuggestions.setVisibility(false);
      var addressLine1 = record["formattedAddress"].split(",")[0];
      kony.application.showLoadingScreen("loadingskin","Data is still Loading");
      var objSvcName = this.getParsedValue(this._suggestionsObjectService);
      var objName = this.getParsedValue(this._suggestionsObject);
      var operationName = this.getParsedValue(this._getFormattedAddressOperation);
      var identifier = this.getParsedValue(this._getFormattedAddressIdentifier);
      this.addPayeeDAO.getFormattedAddress
      (objSvcName,objName,operationName,payload,self.getFormatAddressSuccess.bind(this,addressLine1),identifier,self.getFormattedAddressError);
    },
    
     /**
     * @api : getFormattedAddressError
     * method invoked on error format address.
     * @return : NA
     */
    getFormattedAddressError: function(){
      kony.application.dismissLoadingScreen()
    },
    
     /**
     * @api : getFormatAddressSuccess
     * method invoked to format the address.
     * @params : "addressLine1" address passed to format.
     * @params : "response" is the response of the service.
     * @return : NA
     */
    getFormatAddressSuccess: function(addressLine1, response) {
      var self = this;
      var scopeObj = this;
      response[0].address_components = JSON.parse(response[0].address_components);

      var indexStreet;
      var indexApartment;
      var flag = 0;
      var addressObj = {};
      var addressForStreetandApartment = {};
      for (var i = 0; i < response[0].address_components.length; i += 1) {
        var currentType = response[0].address_components[i].types;
        if (currentType.includes("postal_code") && (response[0].address_components[i].long_name).length > 2) {
          addressObj.zipcode = response[0].address_components[i].long_name;
        } else if (currentType.includes("country")) {
          addressObj.country = response[0].address_components[i].long_name;
        } else if (currentType.includes("administrative_area_level_1")) {
          if(response[0].address_components[i].long_name !== undefined && response[0].address_components[i].long_name !== ""){
            addressObj.state = response[0].address_components[i].long_name;
          }
          else if(response[0].address_components[i].short_name !== undefined && response[0].address_components[i].short_name !== ""){
            addressObj.state = response[0].address_components[i].short_name;
          }
        } else if (currentType.includes("sublocality") || currentType.includes("locality")) {
          addressObj.city = response[0].address_components[i].long_name;
        } else if (currentType.includes("subpremise")) {
          addressObj.apartments = response[0].address_components[i].long_name;
        } else if (currentType.includes("street_number")) {
          addressForStreetandApartment.streetNumber = response[0].address_components[i].long_name;
        } else if (currentType.includes("route")) {
          addressForStreetandApartment.route = response[0].address_components[i].long_name;
        }
      }
      if (addressForStreetandApartment.streetNumber && addressForStreetandApartment.route) {
        addressObj.street = addressForStreetandApartment.streetNumber + " " + addressForStreetandApartment.route;
      } else if (addressForStreetandApartment.route) {
        addressObj.street = addressForStreetandApartment.route;
      }

      this.populateSelectedAddress(addressObj);

    },

     /**
     * @api : populateSelectedAddress
     * method invoked to populate the selected address.
     * @params : "locationRecord" is the service response
     * @return : NA
     */
    populateSelectedAddress: function(locationRecord) {
      var self = this;     
      var selectedCountryID = "";
      var country = locationRecord["country"] || "";
      country = country.trim();
      for(var i in this.countriesMasterData){
        if(this.countriesMasterData[i][1] == country ){      
          this.view.lbxCountry.selectedKey = this.countriesMasterData[i][0];
          selectedCountryID = this.countriesMasterData[i][0];;
        }
      }  
      var data = this.getSpecifiedStates(selectedCountryID);
      var temp = data.states;
      this.view.lbxStateValue.masterData = temp;  
      var state = locationRecord["state"];
      if(state && state !== "") {
        state = state.trim();

        for(var i in this.statesMasterData){
          if(this.statesMasterData[i][1] == state ){      
            self.view.lbxStateValue.selectedKey = this.statesMasterData[i][0];
          }
        }
      }
      if (selectedCountryID  !== "0"){ 
        self.view["lbxStateValue"].setEnabled(true);
      } 

      if(locationRecord["city"] && locationRecord["city"] !== "") {
        self.view.tbx5Tab2.text = locationRecord["city"];
      }
      if(locationRecord["zipcode"] && locationRecord["zipcode"] !== "") {
        self.view.tbxZipCodeTab2.text = locationRecord["zipcode"];
      }
      if(locationRecord["street"] && locationRecord["street"] !== "") {
        self.view.tbx2Tab2.text = locationRecord["street"];
      }
      if(locationRecord["apartments"] && locationRecord["apartments"] !== "") {
        self.view.tbx3Tab2.text =locationRecord["apartments"];
      }
      this.updateContext("tbx1Tab2",this.view.tbx1Tab2.text);
      this.updateContext("tbx2Tab2",this.view.tbx2Tab2.text.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/=/g,"&eq;"));
      this.updateContext("tbx3Tab2",this.view.tbx3Tab2.text);
      this.updateContext("tbx5Tab2",this.view.tbx5Tab2.text);
      this.updateContext("tbx6Tab2",this.view.tbx6Tab2.text);
      this.updateContext("tbx7Tab2",this.view.tbx7Tab2.text);
      this.updateContext("tbxZipCodeTab2",this.view.tbxZipCodeTab2.text);
      this.updateContext("tbx8Tab2",this.view.tbx8Tab2.text);
      this.view.flxAddressSuggestions.setVisibility(false);
      kony.application.dismissLoadingScreen();
      self.minFillValidation();
    }

  };
});