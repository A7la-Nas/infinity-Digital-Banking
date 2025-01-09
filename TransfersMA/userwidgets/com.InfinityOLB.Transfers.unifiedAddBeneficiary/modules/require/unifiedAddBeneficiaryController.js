define(['./countryCodeControllerIC','./ParserUtilsManager','./UnifiedTransferDAO','./UnifiedTransfersUtility','FormatUtil','CommonUtilities','DataValidationFramework/DataValidationHandler'],function(countryCodeControllerIC, ParserUtilsManager, UnifiedTransferDAO, UnifiedTransfersUtility, FormatUtil,CommonUtilities, DataValidationHandler) {
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.countryCodeControllerIC = new countryCodeControllerIC();
      this.dataValidationHandler = new DataValidationHandler();
      this.formatUtil = new FormatUtil();
      this._BREAKPTS="";
      this._accValidationService="";
      this._ctlblContactType="";
      this._sluHeader="";
      this._adfTextBox1="";
      this._utfCTAbutton1="";
      this._sknFieldLabel="";
      this._dropdownExpandIcon="";
      this._dvfConfig="";
      this._lookupServiceName="";
      this._addressObjectService="";
      this._stateObjectService="";
      this._contractObjectService="";
      this._ifTextBox1Label="";
      this._IBANSwiftObjectServiceName="";
      this._accValidationObject="";
      this._ctOption1="";
      this._sluDescription="";
      this._adfTextBox2Label="";
      this._utfCTAbutton2="";
      this._sknErrorTextInput="";
      this._dropdownCollapseIcon="";
      this._recipientFlow="";
      this._maxFillMapping="";
      this._lookupOperationName="";
      this._countryObject="";
      this._statesObject="";
      this._contractObject="";
      this._ifTextBox1="";
      this._IBANSwiftObjectName="";
      this._accValidationOperation="";
      this._ctOption2="";
      this._sluTextBox1Label="";
      this._adfTextBox2="";
      this._sknFieldValue="";
      this._payeeInfoIcon="";
      this._minFillMapping="";
      this._lookupObjectName="";
      this._getCountriesOperation="";
      this._getStatesOperation="";
      this._contractOperation="";
      this._contractCriteria="";
      this._ifTextBox2Label="";
      this._IBANSwiftOperationName="";
      this._accValidationCriteria="";
      this._ctOption3="";
      this._sluTextBox1="";
      this._adfTextBox3Label="";
      this._sknTextBoxPlaceholder="";
      this._jsonObjName="";
      this._lookupServiceResponse="";
      this._getCountriesCriteria="";
      this._getStatesCriteria="";
      this._contractResponse="";
      this._ifTextBox2="";
      this._IBANSwiftCriteria="";
      this._ctTextBox1="";
      this._sluTextBox2Label="";
      this._adfTextBox3="";
      this._sknFieldReadOnlyValue="";
      this._getCountriesIdentifier="";
      this._getStatesIdentifier="";
      this._ifReenterTextBox2Label="";
      this._IBANBankNameId="";
      this._sluTextBox2="";
      this._adfTextBox4Label="";
      this._sknTxtBoxFocus="";
      this._ifReenterTextBox2="";
      this._IBANBICId="";
      this._ctTextBox2="";
      this._sluTextBox3Label="";
      this._adfTextBox4="";
      this._sknLookupLabel="";
      this._ifTextBox3Label="";
      this._sluTextBox3="";
      this._adfTextBox5Label="";
      this._sknDropdownText="";
      this._ifTextBox3="";
      this._ctTextBox3Label="";
      this._sluTextBox4Label="";
      this._adfTextBox5="";
      this._sknSecondaryBtn="";
      this._ifsubHeaderTxt="";
      this._ctTextBox3="";
      this._sluTextBox4="";
      this._countryLabel="";
      this._sknSecondaryBtnHover="";
      this._iflblLookup="";
      this._ctTextBox4Label="";
      this._sluResultItemLabel1="";
      this._countryValue="";
      this._bankCountryValue="";
      this._clearingIDCode="";
      this._sknSecondaryBtnFocus="";
      this._ifTextBox4Label="";
      this._ctTextBox4="";
      this._sluResultItemLabel2="";
      this._stateLabel="";
      this._sknSecondaryBtnDisabled="";
      this._ifTextBox4="";
      this._sluResultItem1="";
      this._stateValue="";
      this._sknPrimaryBtnDisabled="";
      this._ifTextBox5Label="";
      this._sluResultItem2="";
      this._adfTextBox6Label="";
      this._sknPrimaryBtn="";
      this._ifTextBox5="";
      this._sluResultItem3="";
      this._adfTextBox6="";
      this._sknPrimaryBtnHover="";
      this._ifTextBox6Label="";
      this._sluCTAButton="";
      this._adfTextBox7Label="";
      this._sknPrimaryBtnFocus="";
      this._ifTextBox6="";
      this._sluEmptySearchResult="";
      this._adfTextBox7="";
      this._sknSelectLabel="";
      this._ifTextBox7Label="";
      this._sknPayeeDetailInfoText="";
      this._ifTextBox7="";
      this._sknMandatoryTextBox="";
      this._sknRadioButtonText="";
      this._sknRadioSelected="";
      this._sknRadioUnselected="";
      this._ctLabel1="";
      this._ctLabel2="";
      this._ctLabel3="";
      this._sknFieldValueLookUp="";
      this._isDVFValidated="";
      this._cacheEnabled="";
      this._sknTextBoxDisabled="";
      this._utfButtonYes="";
      this._ifTextBox8Label="";
      this._ifTextBox9Label="";
      this._ifTextBox10Label="";
      this._ifTextBox8="";
      this._ifTextBox9="";
      this._ifTextBox10="";
      this.parserUtilsManager = new ParserUtilsManager();
      this.unifiedTransferDAO = new UnifiedTransferDAO();

      //To map text box context with textbox id
      this.textInputsMapping = {};

      //To store collected user input data from form fields
      this.dataContext = {};
      //To store the bank name widget id
      this.bankFieldWidgetId = "";
      //To store the scope of the form 
      this.formScope = "";
      //To store the context
      this.context = "";
      this.newCountryList = [];
      this.newStateList = [];
      this.serviceCounter = 0;
      //AddNEwAccount
      //this.countryWidget = "lbxCountry";
      this.countryWidget = "lbxState";
      //this.stateWidget = "lbxState";
      this.countryId = "";
      this.stateId = "";
      this._countriesList = [];
      this._statesList = [];
      this._contractList = [];
      this.isSingleCustomerProfile = true;
      this.accessibleCustomerIds = [];
      this.profileAccess = "";
      this.isSegVisible = true;
      this.isContactDetailsSegVisible = true;
      this.accNumberValidated = "";
      this.isError = 0;
      this._bankDetailsServiceName= "";
      this._bankDetailsObjectName="";
      this._bankDetailsOperationName = "";
      this._bankDetailsCriteria= "";
      this._lookUpBCCService="";
      this._lookUpBCCObject="";
      this._lookUpBCCOperation="";
      this._lookUpBCCCriteria={};
    },

    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this, 'BREAKPTS', () => {
        return this._BREAKPTS;
      });
      defineSetter(this, 'BREAKPTS', value => {
        this._BREAKPTS = value;
      });
      defineGetter(this, 'accValidationService', () => {
        return this._accValidationService;
      });
      defineSetter(this, 'accValidationService', value => {
        this._accValidationService = value;
      });
      defineGetter(this, 'ctlblContactType', () => {
        return this._ctlblContactType;
      });
      defineSetter(this, 'ctlblContactType', value => {
        this._ctlblContactType = value;
      });
      defineGetter(this, 'sluHeader', () => {
        return this._sluHeader;
      });
      defineSetter(this, 'sluHeader', value => {
        this._sluHeader = value;
      });
      defineGetter(this, 'adfTextBox1', () => {
        return this._adfTextBox1;
      });
      defineSetter(this, 'adfTextBox1', value => {
        this._adfTextBox1 = value;
      });
      defineGetter(this, 'utfCTAbutton1', () => {
        return this._utfCTAbutton1;
      });
      defineSetter(this, 'utfCTAbutton1', value => {
        this._utfCTAbutton1 = value;
      });
      defineGetter(this, 'sknFieldLabel', () => {
        return this._sknFieldLabel;
      });
      defineSetter(this, 'sknFieldLabel', value => {
        this._sknFieldLabel = value;
      });
      defineGetter(this, 'dropdownExpandIcon', () => {
        return this._dropdownExpandIcon;
      });
      defineSetter(this, 'dropdownExpandIcon', value => {
        this._dropdownExpandIcon = value;
      });
      defineGetter(this, 'dvfConfig', () => {
        return this._dvfConfig;
      });
      defineSetter(this, 'dvfConfig', value => {
        this._dvfConfig = value;
      });
      defineGetter(this, 'lookupServiceName', () => {
        return this._lookupServiceName;
      });
      defineSetter(this, 'lookupServiceName', value => {
        this._lookupServiceName = value;
      });
      defineGetter(this, 'addressObjectService', () => {
        return this._addressObjectService;
      });
      defineSetter(this, 'addressObjectService', value => {
        this._addressObjectService = value;
      });
      defineGetter(this, 'stateObjectService', () => {
        return this._stateObjectService;
      });
      defineSetter(this, 'stateObjectService', value => {
        this._stateObjectService = value;
      });
      defineGetter(this, 'contractObjectService', () => {
        return this._contractObjectService;
      });
      defineSetter(this, 'contractObjectService', value => {
        this._contractObjectService = value;
      });
      defineGetter(this, 'contractCriteria', () => {
        return this._contractCriteria;
      });
      defineSetter(this, 'contractCriteria', value => {
        this._contractCriteria = value;
      });
      defineGetter(this, 'ifTextBox1Label', () => {
        return this._ifTextBox1Label;
      });
      defineSetter(this, 'ifTextBox1Label', value => {
        this._ifTextBox1Label = value;
      });
      defineGetter(this, 'IBANSwiftObjectServiceName', () => {
        return this._IBANSwiftObjectServiceName;
      });
      defineSetter(this, 'IBANSwiftObjectServiceName', value => {
        this._IBANSwiftObjectServiceName = value;
      });
      defineGetter(this, 'accValidationObject', () => {
        return this._accValidationObject;
      });
      defineSetter(this, 'accValidationObject', value => {
        this._accValidationObject = value;
      });
      defineGetter(this, 'ctOption1', () => {
        return this._ctOption1;
      });
      defineSetter(this, 'ctOption1', value => {
        this._ctOption1 = value;
      });
      defineGetter(this, 'sluDescription', () => {
        return this._sluDescription;
      });
      defineSetter(this, 'sluDescription', value => {
        this._sluDescription = value;
      });
      defineGetter(this, 'adfTextBox2Label', () => {
        return this._adfTextBox2Label;
      });
      defineSetter(this, 'adfTextBox2Label', value => {
        this._adfTextBox2Label = value;
      });
      defineGetter(this, 'utfCTAbutton2', () => {
        return this._utfCTAbutton2;
      });
      defineSetter(this, 'utfCTAbutton2', value => {
        this._utfCTAbutton2 = value;
      });
      defineGetter(this, 'sknErrorTextInput', () => {
        return this._sknErrorTextInput;
      });
      defineSetter(this, 'sknErrorTextInput', value => {
        this._sknErrorTextInput = value;
      });
      defineGetter(this, 'dropdownCollapseIcon', () => {
        return this._dropdownCollapseIcon;
      });
      defineSetter(this, 'dropdownCollapseIcon', value => {
        this._dropdownCollapseIcon = value;
      });
      defineGetter(this, 'recipientFlow', () => {
        return this._recipientFlow;
      });
      defineSetter(this, 'recipientFlow', value => {
        this._recipientFlow = value;
      });
      defineGetter(this, 'maxFillMapping', () => {
        return this._maxFillMapping;
      });
      defineSetter(this, 'maxFillMapping', value => {
        this._maxFillMapping = value;
      });
      defineGetter(this, 'lookupOperationName', () => {
        return this._lookupOperationName;
      });
      defineSetter(this, 'lookupOperationName', value => {
        this._lookupOperationName = value;
      });
      defineGetter(this, 'countryObject', () => {
        return this._countryObject;
      });
      defineSetter(this, 'countryObject', value => {
        this._countryObject = value;
      });
      defineGetter(this, 'statesObject', () => {
        return this._statesObject;
      });
      defineSetter(this, 'statesObject', value => {
        this._statesObject = value;
      });
      defineGetter(this, 'contractObject', () => {
        return this._contractObject;
      });
      defineSetter(this, 'contractObject', value => {
        this._contractObject = value;
      });
      defineGetter(this, 'ifTextBox1', () => {
        return this._ifTextBox1;
      });
      defineSetter(this, 'ifTextBox1', value => {
        this._ifTextBox1 = value;
      });
      defineGetter(this, 'IBANSwiftObjectName', () => {
        return this._IBANSwiftObjectName;
      });
      defineSetter(this, 'IBANSwiftObjectName', value => {
        this._IBANSwiftObjectName = value;
      });
      defineGetter(this, 'accValidationOperation', () => {
        return this._accValidationOperation;
      });
      defineSetter(this, 'accValidationOperation', value => {
        this._accValidationOperation = value;
      });
      defineGetter(this, 'ctOption2', () => {
        return this._ctOption2;
      });
      defineSetter(this, 'ctOption2', value => {
        this._ctOption2 = value;
      });
      defineGetter(this, 'sluTextBox1Label', () => {
        return this._sluTextBox1Label;
      });
      defineSetter(this, 'sluTextBox1Label', value => {
        this._sluTextBox1Label = value;
      });
      defineGetter(this, 'adfTextBox2', () => {
        return this._adfTextBox2;
      });
      defineSetter(this, 'adfTextBox2', value => {
        this._adfTextBox2 = value;
      });
      defineGetter(this, 'sknFieldValue', () => {
        return this._sknFieldValue;
      });
      defineSetter(this, 'sknFieldValue', value => {
        this._sknFieldValue = value;
      });
      defineGetter(this, 'payeeInfoIcon', () => {
        return this._payeeInfoIcon;
      });
      defineSetter(this, 'payeeInfoIcon', value => {
        this._payeeInfoIcon = value;
      });
      defineGetter(this, 'minFillMapping', () => {
        return this._minFillMapping;
      });
      defineSetter(this, 'minFillMapping', value => {
        this._minFillMapping = value;
      });
      defineGetter(this, 'lookupObjectName', () => {
        return this._lookupObjectName;
      });
      defineSetter(this, 'lookupObjectName', value => {
        this._lookupObjectName = value;
      });
      defineGetter(this, 'getCountriesOperation', () => {
        return this._getCountriesOperation;
      });
      defineSetter(this, 'getCountriesOperation', value => {
        this._getCountriesOperation = value;
      });
      defineGetter(this, 'getStatesOperation', () => {
        return this._getStatesOperation;
      });
      defineSetter(this, 'getStatesOperation', value => {
        this._getStatesOperation = value;
      });
      defineGetter(this, 'contractOperation', () => {
        return this._contractOperation;
      });
      defineSetter(this, 'contractOperation', value => {
        this._contractOperation = value;
      });
      defineGetter(this, 'ifTextBox2Label', () => {
        return this._ifTextBox2Label;
      });
      defineSetter(this, 'ifTextBox2Label', value => {
        this._ifTextBox2Label = value;
      });
      defineGetter(this, 'IBANSwiftOperationName', () => {
        return this._IBANSwiftOperationName;
      });
      defineSetter(this, 'IBANSwiftOperationName', value => {
        this._IBANSwiftOperationName = value;
      });
      defineGetter(this, 'accValidationCriteria', () => {
        return this._accValidationCriteria;
      });
      defineSetter(this, 'accValidationCriteria', value => {
        this._accValidationCriteria = value;
      });
      defineGetter(this, 'ctOption3', () => {
        return this._ctOption3;
      });
      defineSetter(this, 'ctOption3', value => {
        this._ctOption3 = value;
      });
      defineGetter(this, 'sluTextBox1', () => {
        return this._sluTextBox1;
      });
      defineSetter(this, 'sluTextBox1', value => {
        this._sluTextBox1 = value;
      });
      defineGetter(this, 'adfTextBox3Label', () => {
        return this._adfTextBox3Label;
      });
      defineSetter(this, 'adfTextBox3Label', value => {
        this._adfTextBox3Label = value;
      });
      defineGetter(this, 'sknTextBoxPlaceholder', () => {
        return this._sknTextBoxPlaceholder;
      });
      defineSetter(this, 'sknTextBoxPlaceholder', value => {
        this._sknTextBoxPlaceholder = value;
      });
      defineGetter(this, 'jsonObjName', () => {
        return this._jsonObjName;
      });
      defineSetter(this, 'jsonObjName', value => {
        this._jsonObjName = value;
      });
      defineGetter(this, 'lookupServiceResponse', () => {
        return this._lookupServiceResponse;
      });
      defineSetter(this, 'lookupServiceResponse', value => {
        this._lookupServiceResponse = value;
      });
      defineGetter(this, 'getCountriesCriteria', () => {
        return this._getCountriesCriteria;
      });
      defineSetter(this, 'getCountriesCriteria', value => {
        this._getCountriesCriteria = value;
      });
      defineGetter(this, 'getStatesCriteria', () => {
        return this._getStatesCriteria;
      });
      defineSetter(this, 'getStatesCriteria', value => {
        this._getStatesCriteria = value;
      });
      defineGetter(this, 'contractResponse', () => {
        return this._contractResponse;
      });
      defineSetter(this, 'contractResponse', value => {
        this._contractResponse = value;
      });
      defineGetter(this, 'ifTextBox2', () => {
        return this._ifTextBox2;
      });
      defineSetter(this, 'ifTextBox2', value => {
        this._ifTextBox2 = value;
      });
      defineGetter(this, 'IBANSwiftCriteria', () => {
        return this._IBANSwiftCriteria;
      });
      defineSetter(this, 'IBANSwiftCriteria', value => {
        this._IBANSwiftCriteria = value;
      });
      defineGetter(this, 'ctTextBox1', () => {
        return this._ctTextBox1;
      });
      defineSetter(this, 'ctTextBox1', value => {
        this._ctTextBox1 = value;
      });
      defineGetter(this, 'sluTextBox2Label', () => {
        return this._sluTextBox2Label;
      });
      defineSetter(this, 'sluTextBox2Label', value => {
        this._sluTextBox2Label = value;
      });
      defineGetter(this, 'adfTextBox3', () => {
        return this._adfTextBox3;
      });
      defineSetter(this, 'adfTextBox3', value => {
        this._adfTextBox3 = value;
      });
      defineGetter(this, 'sknFieldReadOnlyValue', () => {
        return this._sknFieldReadOnlyValue;
      });
      defineSetter(this, 'sknFieldReadOnlyValue', value => {
        this._sknFieldReadOnlyValue = value;
      });
      defineGetter(this, 'getCountriesIdentifier', () => {
        return this._getCountriesIdentifier;
      });
      defineSetter(this, 'getCountriesIdentifier', value => {
        this._getCountriesIdentifier = value;
      });
      defineGetter(this, 'getStatesIdentifier', () => {
        return this._getStatesIdentifier;
      });
      defineSetter(this, 'getStatesIdentifier', value => {
        this._getStatesIdentifier = value;
      });
      defineGetter(this, 'ifReenterTextBox2Label', () => {
        return this._ifReenterTextBox2Label;
      });
      defineSetter(this, 'ifReenterTextBox2Label', value => {
        this._ifReenterTextBox2Label = value;
      });
      defineGetter(this, 'IBANBankNameId', () => {
        return this._IBANBankNameId;
      });
      defineSetter(this, 'IBANBankNameId', value => {
        this._IBANBankNameId = value;
      });
      defineGetter(this, 'ctTextBox2Label', () => {
        return this._ctTextBox2Label;
      });
      defineSetter(this, 'ctTextBox2Label', value => {
        this._ctTextBox2Label = value;
      });
      defineGetter(this, 'sluTextBox2', () => {
        return this._sluTextBox2;
      });
      defineSetter(this, 'sluTextBox2', value => {
        this._sluTextBox2 = value;
      });
      defineGetter(this, 'adfTextBox4Label', () => {
        return this._adfTextBox4Label;
      });
      defineSetter(this, 'adfTextBox4Label', value => {
        this._adfTextBox4Label = value;
      });
      defineGetter(this, 'sknTxtBoxFocus', () => {
        return this._sknTxtBoxFocus;
      });
      defineSetter(this, 'sknTxtBoxFocus', value => {
        this._sknTxtBoxFocus = value;
      });
      defineGetter(this, 'ifReenterTextBox2', () => {
        return this._ifReenterTextBox2;
      });
      defineSetter(this, 'ifReenterTextBox2', value => {
        this._ifReenterTextBox2 = value;
      });
      defineGetter(this, 'IBANBICId', () => {
        return this._IBANBICId;
      });
      defineSetter(this, 'IBANBICId', value => {
        this._IBANBICId = value;
      });
      defineGetter(this, 'ctTextBox2', () => {
        return this._ctTextBox2;
      });
      defineSetter(this, 'ctTextBox2', value => {
        this._ctTextBox2 = value;
      });
      defineGetter(this, 'sluTextBox3Label', () => {
        return this._sluTextBox3Label;
      });
      defineSetter(this, 'sluTextBox3Label', value => {
        this._sluTextBox3Label = value;
      });
      defineGetter(this, 'adfTextBox4', () => {
        return this._adfTextBox4;
      });
      defineSetter(this, 'adfTextBox4', value => {
        this._adfTextBox4 = value;
      });
      defineGetter(this, 'sknLookupLabel', () => {
        return this._sknLookupLabel;
      });
      defineSetter(this, 'sknLookupLabel', value => {
        this._sknLookupLabel = value;
      });
      defineGetter(this, 'ifTextBox3Label', () => {
        return this._ifTextBox3Label;
      });
      defineSetter(this, 'ifTextBox3Label', value => {
        this._ifTextBox3Label = value;
      });
      defineGetter(this, 'sluTextBox3', () => {
        return this._sluTextBox3;
      });
      defineSetter(this, 'sluTextBox3', value => {
        this._sluTextBox3 = value;
      });
      defineGetter(this, 'adfTextBox5Label', () => {
        return this._adfTextBox5Label;
      });
      defineSetter(this, 'adfTextBox5Label', value => {
        this._adfTextBox5Label = value;
      });
      defineGetter(this, 'sknDropdownText', () => {
        return this._sknDropdownText;
      });
      defineSetter(this, 'sknDropdownText', value => {
        this._sknDropdownText = value;
      });
      defineGetter(this, 'ifTextBox3', () => {
        return this._ifTextBox3;
      });
      defineSetter(this, 'ifTextBox3', value => {
        this._ifTextBox3 = value;
      });
      defineGetter(this, 'sluTextBox4Label', () => {
        return this._sluTextBox4Label;
      });
      defineSetter(this, 'sluTextBox4Label', value => {
        this._sluTextBox4Label = value;
      });
      defineGetter(this, 'adfTextBox5', () => {
        return this._adfTextBox5;
      });
      defineSetter(this, 'adfTextBox5', value => {
        this._adfTextBox5 = value;
      });
      defineGetter(this, 'sknSecondaryBtn', () => {
        return this._sknSecondaryBtn;
      });
      defineSetter(this, 'sknSecondaryBtn', value => {
        this._sknSecondaryBtn = value;
      });
      defineGetter(this, 'ifsubHeaderTxt', () => {
        return this._ifsubHeaderTxt;
      });
      defineSetter(this, 'ifsubHeaderTxt', value => {
        this._ifsubHeaderTxt = value;
      });
      defineGetter(this, 'sluTextBox4', () => {
        return this._sluTextBox4;
      });
      defineSetter(this, 'sluTextBox4', value => {
        this._sluTextBox4 = value;
      });
      defineGetter(this, 'countryLabel', () => {
        return this._countryLabel;
      });
      defineSetter(this, 'countryLabel', value => {
        this._countryLabel = value;
      });
      defineGetter(this, 'sknSecondaryBtnHover', () => {
        return this._sknSecondaryBtnHover;
      });
      defineSetter(this, 'sknSecondaryBtnHover', value => {
        this._sknSecondaryBtnHover = value;
      });
      defineGetter(this, 'iflblLookup', () => {
        return this._iflblLookup;
      });
      defineSetter(this, 'iflblLookup', value => {
        this._iflblLookup = value;
      });
      defineGetter(this, 'sluResultItemLabel1', () => {
        return this._sluResultItemLabel1;
      });
      defineSetter(this, 'sluResultItemLabel1', value => {
        this._sluResultItemLabel1 = value;
      });
      defineGetter(this, 'countryValue', () => {
        return this._countryValue;
      });
      defineSetter(this, 'countryValue', value => {
        this._countryValue = value;
      });
      defineGetter(this, 'bankCountryValue', () => {
        return this._bankCountryValue;
      });
      defineSetter(this, 'bankCountryValue', value => {
        this._bankCountryValue = value;
      });
      defineGetter(this, 'clearingIDCode', () => {
        return this._clearingIDCode;
      });
      defineSetter(this, 'clearingIDCode', value => {
        this._clearingIDCode = value;
      });
      defineGetter(this, 'sknSecondaryBtnFocus', () => {
        return this._sknSecondaryBtnFocus;
      });
      defineSetter(this, 'sknSecondaryBtnFocus', value => {
        this._sknSecondaryBtnFocus = value;
      });
      defineGetter(this, 'ifTextBox4Label', () => {
        return this._ifTextBox4Label;
      });
      defineSetter(this, 'ifTextBox4Label', value => {
        this._ifTextBox4Label = value;
      });
      defineGetter(this, 'sluResultItemLabel2', () => {
        return this._sluResultItemLabel2;
      });
      defineSetter(this, 'sluResultItemLabel2', value => {
        this._sluResultItemLabel2 = value;
      });
      defineGetter(this, 'stateLabel', () => {
        return this._stateLabel;
      });
      defineSetter(this, 'stateLabel', value => {
        this._stateLabel = value;
      });
      defineGetter(this, 'sknSecondaryBtnDisabled', () => {
        return this._sknSecondaryBtnDisabled;
      });
      defineSetter(this, 'sknSecondaryBtnDisabled', value => {
        this._sknSecondaryBtnDisabled = value;
      });
      defineGetter(this, 'ifTextBox4', () => {
        return this._ifTextBox4;
      });
      defineSetter(this, 'ifTextBox4', value => {
        this._ifTextBox4 = value;
      });
      defineGetter(this, 'sluResultItem1', () => {
        return this._sluResultItem1;
      });
      defineSetter(this, 'sluResultItem1', value => {
        this._sluResultItem1 = value;
      });
      defineGetter(this, 'stateValue', () => {
        return this._stateValue;
      });
      defineSetter(this, 'stateValue', value => {
        this._stateValue = value;
      });
      defineGetter(this, 'sknPrimaryBtnDisabled', () => {
        return this._sknPrimaryBtnDisabled;
      });
      defineSetter(this, 'sknPrimaryBtnDisabled', value => {
        this._sknPrimaryBtnDisabled = value;
      });
      defineGetter(this, 'ifTextBox5Label', () => {
        return this._ifTextBox5Label;
      });
      defineSetter(this, 'ifTextBox5Label', value => {
        this._ifTextBox5Label = value;
      });
      defineGetter(this, 'sluResultItem2', () => {
        return this._sluResultItem2;
      });
      defineSetter(this, 'sluResultItem2', value => {
        this._sluResultItem2 = value;
      });
      defineGetter(this, 'adfTextBox6Label', () => {
        return this._adfTextBox6Label;
      });
      defineSetter(this, 'adfTextBox6Label', value => {
        this._adfTextBox6Label = value;
      });
      defineGetter(this, 'sknPrimaryBtn', () => {
        return this._sknPrimaryBtn;
      });
      defineSetter(this, 'sknPrimaryBtn', value => {
        this._sknPrimaryBtn = value;
      });
      defineGetter(this, 'ifTextBox5', () => {
        return this._ifTextBox5;
      });
      defineSetter(this, 'ifTextBox5', value => {
        this._ifTextBox5 = value;
      });
      defineGetter(this, 'sluResultItem3', () => {
        return this._sluResultItem3;
      });
      defineSetter(this, 'sluResultItem3', value => {
        this._sluResultItem3 = value;
      });
      defineGetter(this, 'adfTextBox6', () => {
        return this._adfTextBox6;
      });
      defineSetter(this, 'adfTextBox6', value => {
        this._adfTextBox6 = value;
      });
      defineGetter(this, 'sknPrimaryBtnHover', () => {
        return this._sknPrimaryBtnHover;
      });
      defineSetter(this, 'sknPrimaryBtnHover', value => {
        this._sknPrimaryBtnHover = value;
      });
      defineGetter(this, 'ifTextBox6Label', () => {
        return this._ifTextBox6Label;
      });
      defineSetter(this, 'ifTextBox6Label', value => {
        this._ifTextBox6Label = value;
      });
      defineGetter(this, 'sluCTAButton', () => {
        return this._sluCTAButton;
      });
      defineSetter(this, 'sluCTAButton', value => {
        this._sluCTAButton = value;
      });
      defineGetter(this, 'adfTextBox7Label', () => {
        return this._adfTextBox7Label;
      });
      defineSetter(this, 'adfTextBox7Label', value => {
        this._adfTextBox7Label = value;
      });
      defineGetter(this, 'sknPrimaryBtnFocus', () => {
        return this._sknPrimaryBtnFocus;
      });
      defineSetter(this, 'sknPrimaryBtnFocus', value => {
        this._sknPrimaryBtnFocus = value;
      });
      defineGetter(this, 'ifTextBox6', () => {
        return this._ifTextBox6;
      });
      defineSetter(this, 'ifTextBox6', value => {
        this._ifTextBox6 = value;
      });
      defineGetter(this, 'sluEmptySearchResult', () => {
        return this._sluEmptySearchResult;
      });
      defineSetter(this, 'sluEmptySearchResult', value => {
        this._sluEmptySearchResult = value;
      });
      defineGetter(this, 'adfTextBox7', () => {
        return this._adfTextBox7;
      });
      defineSetter(this, 'adfTextBox7', value => {
        this._adfTextBox7 = value;
      });
      defineGetter(this, 'sknSelectLabel', () => {
        return this._sknSelectLabel;
      });
      defineSetter(this, 'sknSelectLabel', value => {
        this._sknSelectLabel = value;
      });
      defineGetter(this, 'ifTextBox7Label', () => {
        return this._ifTextBox7Label;
      });
      defineSetter(this, 'ifTextBox7Label', value => {
        this._ifTextBox7Label = value;
      });
      defineGetter(this, 'sknPayeeDetailInfoText', () => {
        return this._sknPayeeDetailInfoText;
      });
      defineSetter(this, 'sknPayeeDetailInfoText', value => {
        this._sknPayeeDetailInfoText = value;
      });
      defineGetter(this, 'ifTextBox7', () => {
        return this._ifTextBox7;
      });
      defineSetter(this, 'ifTextBox7', value => {
        this._ifTextBox7 = value;
      });
      defineGetter(this, 'sknMandatoryTextBox', () => {
        return this._sknMandatoryTextBox;
      });
      defineSetter(this, 'sknMandatoryTextBox', value => {
        this._sknMandatoryTextBox = value;
      });
      defineGetter(this, 'sknBoldFieldLabel', () => {
        return this._sknBoldFieldLabel;
      });
      defineSetter(this, 'sknBoldFieldLabel', value => {
        this._sknBoldFieldLabel = value;
      });
      defineGetter(this, 'sknRadioUnselected', () => {
        return this._sknRadioUnselected;
      });
      defineSetter(this, 'sknRadioUnselected', value => {
        this._sknRadioUnselected = value;
      });
      defineGetter(this, 'ctLabel1', () => {
        return this._ctLabel1;
      });
      defineSetter(this, 'ctLabel1', value => {
        this._ctLabel1 = value;
      });
      defineGetter(this, 'ctLabel2', () => {
        return this._ctLabel2;
      });
      defineSetter(this, 'ctLabel2', value => {
        this._ctLabel2 = value;
      });
      defineGetter(this, 'ctLabel3', () => {
        return this._ctLabel3;
      });
      defineSetter(this, 'ctLabel3', value => {
        this._ctLabel3 = value;
      });
      defineGetter(this, 'sknRadioButtonText', () => {
        return this._sknRadioButtonText;
      });
      defineSetter(this, 'sknRadioButtonText', value => {
        this._sknRadioButtonText = value;
      });
      defineGetter(this, 'ctTextBox3', () => {
        return this._ctTextBox3;
      });
      defineSetter(this, 'ctTextBox3', value => {
        this._ctTextBox3 = value;
      }); 
      defineGetter(this, 'ctTextBox4', () => {
        return this._ctTextBox4;
      });
      defineSetter(this, 'ctTextBox4', value => {
        this._ctTextBox4 = value;
      });
      defineGetter(this, 'sknRadioSelected', () => {
        return this._sknRadioSelected;
      });
      defineSetter(this, 'sknRadioSelected', value => {
        this._sknRadioSelected = value;
      });
      defineGetter(this, 'sknBtnSecondaryEnabled', () => {
        return this._sknBtnSecondaryEnabled;
      });
      defineSetter(this, 'sknBtnSecondaryEnabled', value => {
        this._sknBtnSecondaryEnabled = value;
      });
      defineGetter(this, 'sknPrimaryBtnEnabled', () => {
        return this._sknPrimaryBtnEnabled;
      });
      defineSetter(this, 'sknPrimaryBtnEnabled', value => {
        this._sknPrimaryBtnEnabled = value;
      });
      defineGetter(this, 'cacheEnabled', () => {
        return this._cacheEnabled;
      });
      defineSetter(this, 'cacheEnabled', value => {
        this._cacheEnabled = value;
      });
      defineGetter(this, 'sknFieldValueLookUp', () => {
        return this._sknFieldValueLookUp;
      });
      defineSetter(this, 'sknFieldValueLookUp', value => {
        this._sknFieldValueLookUp = value;
      });
      defineGetter(this, 'sknTextBoxDisabled', () => {
        return this._sknTextBoxDisabled;
      });
      defineSetter(this, 'sknTextBoxDisabled', value => {
        this._sknTextBoxDisabled = value;
      });
      defineGetter(this, 'utfButtonYes', () => {
        return this._utfButtonYes;
      });
      defineSetter(this, 'utfButtonYes', value => {
        this._utfButtonYes = value;
      });
      defineGetter(this, 'bankDetailsServiceName', () => {
        return this._bankDetailsServiceName;
      });
      defineSetter(this, 'bankDetailsServiceName', value => {
        this._bankDetailsServiceName = value;
      });
      defineGetter(this, 'bankDetailsObjectName', () => {
        return this._bankDetailsObjectName;
      });
      defineSetter(this, 'bankDetailsObjectName', value => {
        this._bankDetailsObjectName = value;
      });
      defineGetter(this, 'bankDetailsOperationName', () => {
        return this._bankDetailsOperationName;
      });
      defineSetter(this, 'bankDetailsOperationName', value => {
        this._bankDetailsOperationName = value;
      });
      defineGetter(this, 'bankDetailsCriteria', () => {
        return this._bankDetailsCriteria;
      });
      defineSetter(this, 'bankDetailsCriteria', value => {
        this._bankDetailsCriteria = value;
      });
      defineGetter(this, 'lookUpBCCService', () => {
        return this._lookUpBCCService;
      });
      defineSetter(this, 'lookUpBCCService', value => {
        this._lookUpBCCService = value;
      });
      defineGetter(this, 'lookUpBCCObject', () => {
        return this._lookUpBCCObject;
      });
      defineSetter(this, 'lookUpBCCObject', value => {
        this._lookUpBCCObject = value;
      });
      defineGetter(this, 'lookUpBCCOperation', () => {
        return this._lookUpBCCOperation;
      });
      defineSetter(this, 'lookUpBCCOperation', value => {
        this._lookUpBCCOperation = value;
      });
      defineGetter(this, 'lookUpBCCCriteria', () => {
        return this._lookUpBCCCriteria;
      });
      defineSetter(this, 'lookUpBCCCriteria', value => {
        this._lookUpBCCCriteria = value;
      });
      defineGetter(this, 'ifTextBox8', () => {
        return this._ifTextBox8;
      });
      defineSetter(this, 'ifTextBox8', value => {
        this._ifTextBox8 = value;
      });
      defineGetter(this, 'ifTextBox8Label', () => {
        return this._ifTextBox8Label;
      });
      defineSetter(this, 'ifTextBox8Label', value => {
        this._ifTextBox8Label = value;
      });
      defineGetter(this, 'ifTextBox9Label', () => {
        return this._ifTextBox9Label;
      });
      defineSetter(this, 'ifTextBox9Label', value => {
        this._ifTextBox9Label = value;
      });
      defineGetter(this, 'ifTextBox9', () => {
        return this._ifTextBox9;
      });
      defineSetter(this, 'ifTextBox9', value => {
        this._ifTextBox9 = value;
      });
      defineGetter(this, 'ifTextBox10Label', () => {
        return this._ifTextBox10Label;
      });
      defineSetter(this, 'ifTextBox10Label', value => {
        this._ifTextBox10Label = value;
      });
      defineGetter(this, 'ifTextBox10', () => {
        return this._ifTextBox10;
      });
      defineSetter(this, 'ifTextBox10', value => {
        this._ifTextBox10 = value;
      });
    },

    /**
	* @api : preShow
	* Reponsible to retain the data for custom properties for multiple entries into the component
	* Invoke the DAO layer to collect information from the service.
	* @return : NA
	*/
    preshow: function() {
      var self = this;
      this.labelSkin = "ICSknLblSSP72727215px";
      this.valueSkin = "ICSknLbl42424215PX";
      try {
        this.setComponentConfigs();
      }
      catch(e)
      {
        var errorObj =
            {
              "errorInfo" : "Error in preshow method" ,
              "errorLevel" : "Business",
              "error": e
            };
        self.onError(errorObj);
      }
    },

    /**
	* @api : postShow
	* event called after ui rendered on the screen, is a component life cycle event.
	* @return : NA
	*/
    postShow: function() {
      var self = this;
      try {
        this.view.btnContinue.accessibilityConfig = {
            a11yLabel:"Continue to Confirmation Screen"
        };
        this.view.btnCancel.accessibilityConfig = {
            a11yLabel:"Cancel add new account process"
        };
        if(this.context.flowType !== "edit" && this.context.flowType !== "modify"){
          this.setDefaultPayeeDetailsText();
          this.setDefaultPayeeDetailsSkins();
          this.setDefaultPayeeDetailsActions();
          this.setDefaultCTAActions();
          this.setDefaultCTAText();
          this.setDefaultCTASkins();
          this.setDefaultAddressDetailsText();
          this.setDefaultAddressDetailsSkins();
          this.setDefaultAddressDetailsActions();
          this.setDefaultContactTypeDetails();
          this.setDefaultContactDetailsActions();
          this.setDefaultContactDetailsSkin();
          this.setDefaultBICSwiftText();
          this.setDefaultBICSwiftSkins();
          this.setDefaultBICSwiftActions();
          this.setClearingIdentifierCodesUI();
        } else if(this.context.flowType === "modify"){
          this.setPayeeDetailsData();
          this.setBICSwiftData();this.setContactTypeData();
          this.setAddressDetailsData();
          this.enableButton();
        } else if(this.context.flowType === "edit"){
          this.setPayeeDetailsData();
          this.setBICSwiftData();
          this.setContactTypeData();
          this.setAddressDetailsData();
        }
        this.view.flxLookUp2.onClick = this.showClearingCodeLookupPopup;
        this.disableButton();
        this.view.flxRadioButton1.accessibilityConfig={
          a11yARIA : {
          "tabindex": 0,
          "role": "radio",
          "aria-checked": false,
          "aria-labelledby": "lblRadioValue1"
          }
      };
      this.view.flxRadioButton2.accessibilityConfig={
        a11yARIA : {
        "tabindex": 0,
        "role": "radio",
        "aria-checked": false,
        "aria-labelledby": "lblRadioValue2"
        }
    };
    this.view.flxContactTypes.accessibilityConfig={
      "a11yLabel":"Choose your Contact Type",
      "a11yARIA":{
        "tabindex":-1,
        "role":"radiogroup"
      }
    }
    this.view.flxRadioButton3.accessibilityConfig={
      a11yARIA : {
      "tabindex": 0,
      "role": "radio",
      "aria-checked": false,
      "aria-labelledby": "lblRadioValue3"
      }
    };
      this.view.flxCountryCodes.width="300dp";
      this.view.flxMobileNumberValue.clipBounds=false;
      }
      catch(e)
      {
        var errorObj =
            {
              "errorInfo" : "Error in postShow method" ,
              "errorLevel" : "Business",
              "error": e
            };
        self.onError(errorObj);
      }
    },

    setLookupFocus: function(){
      this.view.flxLookup.setActive(true);
    },

    /**
     * @api : onBreakPointChange
     * Triggers when break point change takes place.
     * @return : NA
     */
    onBreakPointChange: function() {
      var self = this;
      try {
        if(this.context.flowType !== "edit" && this.context.flowType !== "modify"){
          this.setDefaultPayeeDetailsText();
          this.setDefaultPayeeDetailsSkins();
          this.setDefaultCTAText();
          this.setDefaultCTASkins();
          this.setDefaultAddressDetailsActions();
          this.setDefaultAddressDetailsText();
          this.setDefaultAddressDetailsSkins();
          this.setDefaultContactTypeDetails();
          this.setDefaultContactDetailsSkin();
          this.setDefaultBICSwiftText();
          this.setDefaultBICSwiftSkins();
          this.setDefaultBICSwiftActions();
          this.setUpFormOnTouchEnd();
        } else if(this.context.flowType === "modify"){
          this.setPayeeDetailsData();
          this.setBICSwiftData();
          this.setContactTypeData();
          this.setAddressDetailsData();
          this.enableButton();
        } else if(this.context.flowType === "edit"){
          this.setPayeeDetailsData();
          this.setBICSwiftData();
          this.setContactTypeData();
          this.setAddressDetailsData();
        }
      }
      catch(e)
      {
        var errorObj =
            {
              "errorInfo" : "Error in onBreakPoinChange method" ,
              "errorLevel" : "Business",
              "error": e
            };
        self.onError(errorObj);
      }
    },
     /**
         * @api : shiftTab
         * Method initialize the on touch end event of the form
         * @return : NA
         */
     shiftTab: function(param) {
      var scope = this;
      var eventPayload=param[1];
      var context = param[2];
      try {
          if (eventPayload.keyCode == 27) {
              this.hideCountryCodeSegment();
              eventPayload.preventDefault();
              if(this.view.flxPhoneNumberEmailId.isVisible)
              this.view.tbxCode.setActive(true);
              else if(this.view.flxContactDetails.isVisible)
              this.view.tbxCountryCode.setActive(true);
          }
          if (eventPayload.keyCode == 9) {
              if (eventPayload.shiftKey) {
                  if (context.rowIndex === 0) {
                    this.hideCountryCodeSegment();
                    eventPayload.preventDefault();
                    if (this.view.flxPhoneNumberEmailId.isVisible)
                      this.view.tbxCode.setActive(true);
                    else if (this.view.flxContactDetails.isVisible)
                      this.view.tbxCountryCode.setActive(true);
                  }
              }
          };
          if (eventPayload.keyCode == 9 && !eventPayload.shiftKey) {
              if (context.rowIndex === context.widgetInfo.data.length - 1) {
                  this.hideCountryCodeSegment();
                  eventPayload.preventDefault();
                  if(this.view.flxPhoneNumberEmailId.isVisible)
                  this.view.tbxPhoneNumber.setActive(true);
                  else if(this.view.flxContactDetails.isVisible)
                  this.view.tbxMobileNumber.setActive(true);
              }
          };
      } catch (e) {
          var errorObj = {
              "errorInfo": "Error in shifttab method",
              "errorLevel": "controller",
              "error": e
          };
          scope.onError(errorObj);
      }
  },
    /**
     * @api : setUpFormOnTouchEnd
     * Method initialize the on touch end event of the form
     * @return : NA
     */
    setUpFormOnTouchEnd: function() {
      var scope = this;
      try {
        this.view.onTouchEnd = function() {
          scope.hideCountryCodeSegment();
        };
      } catch(e)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setUpFormOnTouchEnd method" ,
              "errorLevel" : "Business",
              "error": e
            };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : hideCountryCodeSegment
     * Method to hide the country code segment on touch end
     * @return : NA
     */
    hideCountryCodeSegment: function() {
      var scope = this;
      try {
        if(this.view.flxCountryCode.isVisible === true && scope.isSegVisible === true) {
          scope.isSegVisible = false;
        } else if(this.view.flxCountryCode.isVisible === true && scope.isSegVisible === false) {
          setTimeout(function() {
            scope.view.flxCountryCode.setVisibility(false);
            scope.view.flxCountryCode.accessibilityConfig = {
              "a11yLabel": "Hide country details",
                                "a11yARIA" : {
                "tabindex" : -1,
                "aria-haspopup": "true"
              }
            }
            scope.isSegVisible = true;
          }, "17ms");
        }
        if(this.view.flxCountryCodes.isVisible === true && scope.isContactDetailsSegVisible === true) {
          scope.isContactDetailsSegVisible = false;
        } else if(this.view.flxCountryCodes.isVisible === true && scope.isContactDetailsSegVisible === false) {
          setTimeout(function() {
            scope.view.flxCountryCodes.setVisibility(false);
            scope.isContactDetailsSegVisible = true;
          }, "17ms");
        }
        this.view.flxCountryCode.accessibilityConfig = {
          "a11yLabel": "Hide country details",
                            "a11yARIA" : {
            "tabindex" : -1,
            "aria-haspopup": "true"
          }
        }
        this.view.flxCountryCodes.accessibilityConfig = {
          "a11yLabel": "Hide country details",
                            "a11yARIA" : {
            "tabindex" : -1,
            "aria-haspopup": "true"
          }
        }
      }  
      catch(e)
      {
        var errorObj =
            {
              "errorInfo" : "Error in hideCountryCodeSegment method" ,
              "errorLevel" : "Business",
              "error": e
            };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : setContext
     * Method to set the context value and scope of the form
     * @return : NA
     */
    setContext: function(scope,context) {
      this.context = context;     
      this.accNumberValidated = ""; 
      if(this.formScope === ""){
        this.formScope = scope;
      }
      this.dataContext = this.context;
      this.parserUtilsManager.setContext(this.context);
    },

    /**
	* @api : getProcessedText
	* helper method to invoke parser utility functions to get the parsed value.
	* @param : text{object} -value collected from exposed contract
	* @return : parsed value result
	*/
    getProcessedText: function(text) {
      var self = this;
      try {
        return this.parserUtilsManager.getParsedValue(text);
      }
      catch(e)
      {
        var errorObj =
            {
              "errorInfo" : "Error in getProcessedText method" ,
              "errorLevel" : "Business",
              "error": e
            };
        self.onError(errorObj);
      }
    },

    /**
	* setComponentConfigs
	* @api : setComponentConfigs
	* responsible for sending componentContext passed into parserUtilManager.
	* @return : NA
	*/
    setComponentConfigs: function() {
      var self = this;
      try {
        this.parserUtilsManager.setBreakPointConfig(this._BREAKPTS);
      }
      catch(e)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setComponentConfigs method" ,
              "errorLevel" : "Business",
              "error": e
            };
        self.onError(errorObj);
      }
    },

    /**
	* getParsedValue
	* @api : getParsedValue
	* parses the property and fetches the corresponding value
	* @return : NA
	*/
    getParsedValue: function(property, selectedValue) {
      var self = this;
      try
      {
        if(typeof(property) === "string")
        {
          return this.getProcessedText(property);
        }
        else{
          if(selectedValue)
            return this.getProcessedText(this.parserUtilsManager.getComponentConfigParsedValue(property,selectedValue));
          else
            return property;
        }
      }
      catch(e)
      {
        var errorObj =
            {
              "errorInfo" : "Error in parsing the value" ,
              "errorLevel" : "Business",
              "error": e
            };
        self.onError(errorObj);
      }
    },

    /**
     * isEmptyNullUndefined
     * Verifies if the value is empty, null or undefined
     * data {string} - value to be verified
     * @return : {boolean} - validity of the value passed
     */
    isEmptyNullUndefined: function(data) {
      var self = this;
      try {
        if (data === null || data === undefined || data === "")
          return true;
        return false;
      }
      catch(e)
      {
        var errorObj =
            {
              "errorInfo" : "Error in isEmptyNullUndefined method" ,
              "errorLevel" : "Business",
              "error": e
            };
        self.onError(errorObj);
      }
    },

    /**
     * @api : minFillValidation
     * minimum field level validation to enable continue button.
     * @return : NA
     */
    minFillValidation: function(tbxWidget, minJSON, maxJSON) {
      var scope = this;
      var minConfig, maxConfig, inputData;
      var tbxNationalIdNew = this.view.tbxNationalId.text.replace(/\s+/g, '');
      try {
        var object = this.getParsedValue(this._jsonObjName);
        if(!this.isEmptyNullUndefined(minJSON) && !this.isEmptyNullUndefined(maxJSON)) {
          minConfig = minJSON;
          maxConfig = maxJSON;
        } else {
          minConfig = this.getParsedValue(this._minFillMapping); 
          maxConfig = this.getParsedValue(this._maxFillMapping);
        }
        if(tbxWidget === "if_txtValue1" && this.view.flxPayeeName.isVisible){
          this.updateContext("tbxPayeeName",this.view.tbxPayeeName.text);
          inputData = this.view.tbxPayeeName.text;
        }
        if(tbxWidget === "if_txtValue2" && this.view.flxEnterAccountNumber.isVisible){
          this.updateContext("tbxNewAccountNumber",this.view.tbxNewAccountNumber.text);
          inputData = this.view.tbxNewAccountNumber.text;
        }
        if(tbxWidget === "if_txtValue3" && this.view.flxReEnterAccountNumber.isVisible){
          this.updateContext("tbxReenterAccountNumber",this.view.tbxReenterAccountNumber.text);
          inputData = this.view.tbxReenterAccountNumber.text;
        }
        if(tbxWidget === "if_txtValue4" && this.view.flxField1.isVisible){
          this.updateContext("tbxPayeeDetailField1",this.view.tbxPayeeDetailField1.text);
          inputData = this.view.tbxPayeeDetailField1.text;
        }
        if(tbxWidget === "if_txtValue5" && this.view.flxField2.isVisible){
          this.updateContext("tbxPayeeDetailField2",this.view.tbxPayeeDetailField2.text);
          inputData = this.view.tbxPayeeDetailField2.text;
        }
        if(tbxWidget === "if_txtValue6" && this.view.flxField3.isVisible){
          this.updateContext("tbxPayeeDetailField3",this.view.tbxPayeeDetailField3.text);
          inputData = this.view.tbxPayeeDetailField3.text;
        }
        if(tbxWidget === "if_txtValue7" && this.view.flxField4.isVisible){
          this.updateContext("tbxPayeeDetailField4",this.view.tbxPayeeDetailField4.text);
          inputData = this.view.tbxPayeeDetailField4.text;
        }
        if(tbxWidget === "if_txtValue8" && this.view.flxAccountNickName.isVisible){
          this.updateContext("tbxNickName",this.view.tbxNickName.text);
          inputData = this.view.tbxNickName.text;
        }
        if(tbxWidget === "if_txtValue9" && this.view.flxField6.isVisible){
          this.updateContext("tbxPayeeDetailField5",this.view.tbxPayeeDetailField5.text);
          inputData = this.view.tbxPayeeDetailField5.text;
        }
        if(tbxWidget === "if_txtValue10" && this.view.flxField7.isVisible){
          this.updateContext("tbxPayeeDetailField6",this.view.tbxPayeeDetailField6.text);
          inputData = this.view.tbxPayeeDetailField6.text;
        }
        if(tbxWidget === "if_txtValue11" && this.view.flxIntermediaryBIC.isVisible){
          this.updateContext("tbxIntermediaryBIC",this.view.tbxIntermediaryBIC.text);
          inputData = this.view.tbxIntermediaryBIC.text;
        }
        if(tbxWidget === "ct_txtValue1" && this.view.flxCountryCodeParent.isVisible){
          this.updateContext("tbxCountryCode",this.view.tbxCountryCode.text);
          inputData = this.view.tbxCountryCode.text;
        }
        if(tbxWidget === "ct_txtValue2" && this.view.flxMobileNumberParent.isVisible){
          this.updateContext("tbxMobileNumber",this.view.tbxMobileNumber.text);
          inputData = this.view.tbxMobileNumber.text;
        }
        if(tbxWidget === "ct_txtValue3" && this.view.flxEmailAddress.isVisible){
          this.updateContext("tbxEmailAddress",this.view.tbxEmailAddress.text);
          inputData = this.view.tbxEmailAddress.text;
        }
        if(tbxWidget === "ct_txtValue4" && this.view.flxNationalId.isVisible){
          this.updateContext("tbxNationalId", tbxNationalIdNew);
          inputData = tbxNationalIdNew;
        }
        if(tbxWidget === "adf_txtValue1" && this.view.flxCode.isVisible){
          this.updateContext("tbxCode",this.view.tbxCode.text);
          inputData = this.view.tbxCode.text;
        }
        if(tbxWidget === "adf_txtValue2" && this.view.flxNumber.isVisible){
          this.updateContext("tbxPhoneNumber",this.view.tbxPhoneNumber.text);
          inputData = this.view.tbxPhoneNumber.text;
        }
        if(tbxWidget === "adf_txtValue3" && this.view.flxEmailId.isVisible){
          this.updateContext("tbxEmailId",this.view.tbxEmailId.text);
          inputData = this.view.tbxEmailId.text;
        }
        if(tbxWidget === "adf_txtValue4" && this.view.flxAddressLine1.isVisible){
          this.updateContext("tbxAddressLine1",this.view.tbxAddressLine1.text);
          inputData = this.view.tbxAddressLine1.text;
        }
        if(tbxWidget === "adf_txtValue5" && this.view.flxAddressLine2.isVisible){
          this.updateContext("tbxAddressLine2",this.view.tbxAddressLine2.text);
          inputData = this.view.tbxAddressLine2.text;
        }
        if(tbxWidget === "adf_txtValue6" && this.view.flxCityField.isVisible){
          this.updateContext("tbxCity",this.view.tbxCity.text);
          inputData = this.view.tbxCity.text;
        }
        if(tbxWidget === "adf_txtValue7" && this.view.flxZipCodeField.isVisible){
          this.updateContext("tbxZipCode",this.view.tbxZipCode.text);
          inputData = this.view.tbxZipCode.text;
        }
        var dataJson = this.constructDVFInput();
        var tempJson = {};
        for(var key in dataJson){
          if(dataJson[key]){
            tempJson[key] = dataJson[key];
          }
          else {
            tempJson[key] = "";
          }
        }
        var mindataValidator = this.dataValidationHandler.validateMinFill
        (tempJson,object,minConfig);
        var tmpMinDataValidator = this.dataValidationHandler.validateMinFill
        (tempJson,object,minConfig);
        for(var i in tmpMinDataValidator) {
          if(i !== tbxWidget) {
            delete tmpMinDataValidator[i];
          }}
        var maxdataValidator = this.dataValidationHandler.validateMaxFill
        (tempJson,object,maxConfig);
        var tmpMaxDataValidator = this.dataValidationHandler.validateMaxFill
        (tempJson,object,maxConfig);
        for(var j in tmpMaxDataValidator) {
          if(j !== tbxWidget) {
            delete tmpMaxDataValidator[j];
          }}
        if(!(Object.keys(tmpMinDataValidator).length ===0 &&
             tmpMinDataValidator.constructor === Object) && (!scope.isEmptyNullUndefined(inputData))) {
          scope.showValidationErrors(tmpMinDataValidator);
          scope.disableButton();
        } else if(!(Object.keys(tmpMaxDataValidator).length ===0 &&
                    tmpMaxDataValidator.constructor === Object) && (!scope.isEmptyNullUndefined(inputData))) {
          scope.showValidationErrors(tmpMaxDataValidator);
          scope.disableButton();
        } else {
          if(scope.isError === 0)
            scope.resetErrors();
        }
        if((Object.keys(mindataValidator).length ===0 && mindataValidator.constructor === Object) && (Object.keys(maxdataValidator).length ===0 && maxdataValidator.constructor === Object) && (!scope.view.flxErrorWarning.isVisible)){                                              
          scope.enableButton();
          if(scope.view.flxMobileNumber.isVisible)   {
              if(this.view.tbxCountryCode.text !== ""){
                  scope.enableButton();
              }                                            
              else
                  scope.disableButton();
            }
            if (this.dataContext.BICCode === "" && (this.dataContext.clearingCode1 === "" || this.dataContext.clearingIdentifierCode === "") && (this.dataContext.bankName ==="" || this.dataContext.townName === "" || this.dataContext.countryName === "") &&(this.dataContext.bankName === "" || this.dataContext.intermediaryBIC === "")) {
            scope.disableButton();
          }
      } else {
          scope.disableButton();
      }
  } catch(e)
      {
        var errorObj =
            {
              "errorInfo" : "Error in minFillValidation method" ,
              "errorLevel" : "Business",
              "error": e
            };
        scope.onError(errorObj);
      }
    },

    /**
      * Component disableButton.
      * disable the button action
      */
    disableButton: function() {
      this.isDVFValidated = "NO";
       this.view.btnContinue.setEnabled(false);
       this.view.btnContinue.skin = "sknBtnBlockedSSPFFFFFF15Px";
       this.view.btnContinue.hoverSkin = "sknBtnBlockedSSPFFFFFF15Px";
       this.view.btnContinue.focusSkin = "sknBtnBlockedSSPFFFFFF15Px";
   },
  /**
   * Component enableButton
   * enables primary button
   * @return : JSON
   */
   
  enableButton: function() {
      this.isDVFValidated = "YES";
     this.view.btnContinue.setEnabled(true);
     this.view.btnContinue.skin = "sknbtnSSPffffff0278ee15pxbr3px";
     this.view.btnContinue.hoverSkin = "sknBtnHoverSSPFFFFFF15Px";
     this.view.btnContinue.focusSkin = "sknBtnFocusSSPFFFFFF15Px0273e3";
  },

    /**
      * Component constructDVFInput.
      * construcs the input for data validation framework
      * @return : JSON
      */
    constructDVFInput: function(){ 
      var self = this;
      try {
        var tbxPayeeName = this.getParsedValue(this._ifTextBox1);
        if(!this.isEmptyNullUndefined(tbxPayeeName) && !this.isEmptyNullUndefined(tbxPayeeName.mapping)){    
          tbxPayeeName = this.mapTextInputContractToDvfKey(tbxPayeeName.mapping); 
        }
        var tbxNewAccountNumber = this.getParsedValue(this._ifTextBox2);
        if(!this.isEmptyNullUndefined(tbxNewAccountNumber) && !this.isEmptyNullUndefined(tbxNewAccountNumber.mapping)){
          tbxNewAccountNumber = this.mapTextInputContractToDvfKey(tbxNewAccountNumber.mapping);
        }
        var tbxReenterAccountNumber = this.getParsedValue(this._ifReenterTextBox2);
        if(!this.isEmptyNullUndefined(tbxReenterAccountNumber) && !this.isEmptyNullUndefined(tbxReenterAccountNumber.mapping)){
          tbxReenterAccountNumber = this.mapTextInputContractToDvfKey(tbxReenterAccountNumber.mapping);
        }
        var tbxPayeeDetailField1 = this.getParsedValue(this._ifTextBox4);
        if(!this.isEmptyNullUndefined(tbxPayeeDetailField1) && !this.isEmptyNullUndefined(tbxPayeeDetailField1.mapping)){  
          tbxPayeeDetailField1 = this.mapTextInputContractToDvfKey(tbxPayeeDetailField1.mapping);
        }
        var tbxPayeeDetailField2 = this.getParsedValue(this._ifTextBox5);
        if(!this.isEmptyNullUndefined(tbxPayeeDetailField2) && !this.isEmptyNullUndefined(tbxPayeeDetailField2.mapping)){  
          tbxPayeeDetailField2 = this.mapTextInputContractToDvfKey(tbxPayeeDetailField2.mapping);
        }
        var tbxPayeeDetailField3 = this.getParsedValue(this._ifTextBox6);
        if(!this.isEmptyNullUndefined(tbxPayeeDetailField3) && !this.isEmptyNullUndefined(tbxPayeeDetailField3.mapping)){  
          tbxPayeeDetailField3 = this.mapTextInputContractToDvfKey(tbxPayeeDetailField3.mapping);
        }
        var tbxPayeeDetailField4 = this.getParsedValue(this._ifTextBox7);
        if(!this.isEmptyNullUndefined(tbxPayeeDetailField4) && !this.isEmptyNullUndefined(tbxPayeeDetailField4.mapping)){  
          tbxPayeeDetailField4 = this.mapTextInputContractToDvfKey(tbxPayeeDetailField4.mapping);
        }
        var tbxPayeeDetailField5 = this.getParsedValue(this._ifTextBox8);
        if(!this.isEmptyNullUndefined(tbxPayeeDetailField5) && !this.isEmptyNullUndefined(tbxPayeeDetailField5.mapping)){  
          tbxPayeeDetailField5 = this.mapTextInputContractToDvfKey(tbxPayeeDetailField5.mapping);
        }
        var tbxPayeeDetailField6 = this.getParsedValue(this._ifTextBox9);
        if(!this.isEmptyNullUndefined(tbxPayeeDetailField6) && !this.isEmptyNullUndefined(tbxPayeeDetailField6.mapping)){  
          tbxPayeeDetailField6 = this.mapTextInputContractToDvfKey(tbxPayeeDetailField6.mapping);
        }
        var tbxIntermediaryBIC = this.getParsedValue(this._ifTextBox10);
        if(!this.isEmptyNullUndefined(tbxIntermediaryBIC) && !this.isEmptyNullUndefined(tbxIntermediaryBIC.mapping)){  
          tbxIntermediaryBIC = this.mapTextInputContractToDvfKey(tbxIntermediaryBIC.mapping);
        }
        var tbxNickName = this.getParsedValue(this._ifTextBox3);
        if(!this.isEmptyNullUndefined(tbxNickName) && !this.isEmptyNullUndefined(tbxNickName.mapping)){  
          tbxNickName = this.mapTextInputContractToDvfKey(tbxNickName.mapping);
        }
        var tbxCountryCode = this.getParsedValue(this._ctTextBox1);
        if(!this.isEmptyNullUndefined(tbxCountryCode) && !this.isEmptyNullUndefined(tbxCountryCode.mapping)){  
          tbxCountryCode = this.mapTextInputContractToDvfKey(tbxCountryCode.mapping);
        }
        var tbxMobileNumber = this.getParsedValue(this._ctTextBox2);
        if(!this.isEmptyNullUndefined(tbxMobileNumber) && !this.isEmptyNullUndefined(tbxMobileNumber.mapping)){  
          tbxMobileNumber = this.mapTextInputContractToDvfKey(tbxMobileNumber.mapping);
        }
        var tbxEmailAddress = this.getParsedValue(this._ctTextBox3);
        if(!this.isEmptyNullUndefined(tbxEmailAddress) && !this.isEmptyNullUndefined(tbxEmailAddress.mapping)){  
          tbxEmailAddress = this.mapTextInputContractToDvfKey(tbxEmailAddress.mapping);
        }
        var tbxNationalId = this.getParsedValue(this._ctTextBox4);
        if(!this.isEmptyNullUndefined(tbxNationalId) && !this.isEmptyNullUndefined(tbxNationalId.mapping)){  
          tbxNationalId = this.mapTextInputContractToDvfKey(tbxNationalId.mapping);
        }
        var tbxCode = this.getParsedValue(this._adfTextBox1);
        if(!this.isEmptyNullUndefined(tbxCode) && !this.isEmptyNullUndefined(tbxCode.mapping)){  
          tbxCode = this.mapTextInputContractToDvfKey(tbxCode.mapping);
        }
        var tbxPhoneNumber = this.getParsedValue(this._adfTextBox2);
        if(!this.isEmptyNullUndefined(tbxPhoneNumber) && !this.isEmptyNullUndefined(tbxPhoneNumber.mapping)){  
          tbxPhoneNumber = this.mapTextInputContractToDvfKey(tbxPhoneNumber.mapping);
        }
        var tbxEmailId = this.getParsedValue(this._adfTextBox3);
        if(!this.isEmptyNullUndefined(tbxEmailId) && !this.isEmptyNullUndefined(tbxEmailId.mapping)){  
          tbxEmailId = this.mapTextInputContractToDvfKey(tbxEmailId.mapping);
        }
        var tbxAddressLine1 = this.getParsedValue(this._adfTextBox4);
        if(!this.isEmptyNullUndefined(tbxAddressLine1) && !this.isEmptyNullUndefined(tbxAddressLine1.mapping)){  
          tbxAddressLine1 = this.mapTextInputContractToDvfKey(tbxAddressLine1.mapping);
        }
        var tbxAddressLine2 = this.getParsedValue(this._adfTextBox5);
        if(!this.isEmptyNullUndefined(tbxAddressLine2) && !this.isEmptyNullUndefined(tbxAddressLine2.mapping)){  
          tbxAddressLine2 = this.mapTextInputContractToDvfKey(tbxAddressLine2.mapping);
        }
        var tbxCity = this.getParsedValue(this._adfTextBox6);
        if(!this.isEmptyNullUndefined(tbxCity) && !this.isEmptyNullUndefined(tbxCity.mapping)){  
          tbxCity = this.mapTextInputContractToDvfKey(tbxCity.mapping);
        }
        var tbxZipCode = this.getParsedValue(this._adfTextBox7);
        if(!this.isEmptyNullUndefined(tbxZipCode) && !this.isEmptyNullUndefined(tbxZipCode.mapping)){  
          tbxZipCode = this.mapTextInputContractToDvfKey(tbxZipCode.mapping);
        }
        var jsonToReturn = {
          "if_txtValue1": this.dataContext[tbxPayeeName],
          "if_txtValue2" :this.dataContext[tbxNewAccountNumber],
          "if_txtValue3": this.dataContext[tbxReenterAccountNumber],
          "if_txtValue4": this.dataContext[tbxPayeeDetailField1],
          "if_txtValue5": this.dataContext[tbxPayeeDetailField2],
          "if_txtValue6": this.dataContext[tbxPayeeDetailField3],
          "if_txtValue7": this.dataContext[tbxPayeeDetailField4],
          "if_txtValue9": this.dataContext[tbxPayeeDetailField5],
          "if_txtValue10": this.dataContext[tbxPayeeDetailField6],
          "if_txtValue11": this.dataContext[tbxIntermediaryBIC],
          "if_txtValue8" :this.dataContext[tbxNickName],
          "ct_txtValue1" :this.dataContext[tbxCountryCode],
          "ct_txtValue2" :this.dataContext[tbxMobileNumber],
          "ct_txtValue3" :this.dataContext[tbxEmailAddress],
          "ct_txtValue4" :this.dataContext[tbxNationalId],
          "adf_txtValue1" :this.dataContext[tbxCode],
          "adf_txtValue2" :this.dataContext[tbxPhoneNumber],
          "adf_txtValue3" :this.dataContext[tbxEmailId],
          "adf_txtValue4" :this.dataContext[tbxAddressLine1],
          "adf_txtValue5" :this.dataContext[tbxAddressLine2],
          "adf_txtValue6" :this.dataContext[tbxCity],
          "adf_txtValue7" :this.dataContext[tbxZipCode],
        };      
        if(tbxPayeeName === "" || tbxPayeeName === null || tbxPayeeName === undefined){
          delete jsonToReturn['if_txtValue1'];
        }
        if(tbxNewAccountNumber === "" || tbxNewAccountNumber === null || tbxNewAccountNumber === undefined){
          delete jsonToReturn['if_txtValue2'];
        }
        if(tbxReenterAccountNumber === "" || tbxReenterAccountNumber === null || tbxReenterAccountNumber === undefined){
          delete jsonToReturn['if_txtValue3'];
        }
        if(tbxPayeeDetailField1 === "" || tbxPayeeDetailField1 === null || tbxPayeeDetailField1 === undefined){
          delete jsonToReturn['if_txtValue4'];
        }       
        if(tbxPayeeDetailField2 === "" || tbxPayeeDetailField2 === null || tbxPayeeDetailField2 === undefined){
          delete jsonToReturn['if_txtValue5'];
        }  
        if(tbxPayeeDetailField3 === "" || tbxPayeeDetailField3 === null || tbxPayeeDetailField3 === undefined){
          delete jsonToReturn['if_txtValue6'];
        }
        if(tbxPayeeDetailField4 === "" || tbxPayeeDetailField4 === null || tbxPayeeDetailField4 === undefined){
          delete jsonToReturn['if_txtValue7'];
        }
        if(tbxPayeeDetailField5 === "" || tbxPayeeDetailField5 === null || tbxPayeeDetailField5 === undefined){
          delete jsonToReturn['if_txtValue9'];
        }
        if(tbxPayeeDetailField6 === "" || tbxPayeeDetailField6 === null || tbxPayeeDetailField6 === undefined){
          delete jsonToReturn['if_txtValue10'];
        }
        if(tbxIntermediaryBIC === "" || tbxIntermediaryBIC === null || tbxIntermediaryBIC === undefined){
          delete jsonToReturn['if_txtValue11'];
        }
        if(tbxNickName === "" || tbxNickName === null || tbxNickName === undefined){
          delete jsonToReturn['if_txtValue8'];
        }
        if(tbxCountryCode === "" || tbxCountryCode === null || tbxCountryCode === undefined){
          delete jsonToReturn['ct_txtValue1'];
        }
        if(tbxMobileNumber === "" || tbxMobileNumber === null || tbxMobileNumber === undefined){
          delete jsonToReturn['ct_txtValue2'];
        }
        if(tbxEmailAddress === "" || tbxEmailAddress === null || tbxEmailAddress === undefined){
          delete jsonToReturn['ct_txtValue3'];
        }
        if(tbxNationalId === "" || tbxNationalId === null || tbxNationalId === undefined){
          delete jsonToReturn['ct_txtValue4'];
        }
        if(tbxCode === "" || tbxCode === null || tbxCode === undefined){
          delete jsonToReturn['adf_txtValue1'];
        }
        if(tbxPhoneNumber === "" || tbxPhoneNumber === null || tbxPhoneNumber === undefined){
          delete jsonToReturn['adf_txtValue2'];
        }
        if(tbxEmailId === "" || tbxEmailId === null || tbxEmailId === undefined){
          delete jsonToReturn['adf_txtValue3'];
        }
        if(tbxAddressLine1 === "" || tbxAddressLine1 === null || tbxAddressLine1 === undefined){
          delete jsonToReturn['adf_txtValue4'];
        }
        if(tbxAddressLine2 === "" || tbxAddressLine2 === null || tbxAddressLine2 === undefined){
          delete jsonToReturn['adf_txtValue5'];
        }
        if(tbxCity === "" || tbxCity === null || tbxCity === undefined){
          delete jsonToReturn['adf_txtValue6'];
        }
        if(tbxZipCode === "" || tbxZipCode === null || tbxZipCode === undefined){
          delete jsonToReturn['adf_txtValue7'];
        }
        return jsonToReturn;    
      } catch(e)
      {
        var errorObj =
            {
              "errorInfo" : "Error in constructDVFInput method" ,
              "errorLevel" : "Business",
              "error": e
            };
        self.onError(errorObj);
      }
    },

    /**
      * Component performDataValidation.
      * performs data validation
      * @return : NA
      */
    performDataValidation: function(successOnValidation) {
      var scope = this;
      try {
        var object = this.getParsedValue(this._jsonObjName);
        var config = this.getParsedValue(this._dvfConfig);
        var dataJson = this.constructDVFInput();
        var tempJson = {};
        for(var key in dataJson){
          if(dataJson[key]){
            tempJson[key] = dataJson[key];
          }
          else{tempJson[key] = "";
              }
        }
        var dataValidator = this.dataValidationHandler.validateData(dataJson,object,config);
        if(Object.keys(dataValidator).length === 0 && dataValidator.constructor === Object){
          this.resetErrors();
          this.callContractListApi();
        }
        else{
          this.showValidationErrors(dataValidator);
        } } catch(e)
        {
          var errorObj =
              {
                "errorInfo" : "Error in performDataValidation method" ,
                "errorLevel" : "Business",
                "error": e
              };
          scope.onError(errorObj);
        }
    },

    /**
     * @api : resetErrors
     * resets the error skins and texts
     * @return : NA
     */
    resetErrors: function() {
      var self = this;
      try {
        this.view.txtErrormessage.text = "";
        this.setErrorFlexVisibility(false);
        this.resetTextBoxesSkins();
      } catch(e)
      {
        var errorObj =
            {
              "errorInfo" : "Error in resetErrors method" ,
              "errorLevel" : "Business",
              "error": e
            };
        self.onError(errorObj);
      }
    },

    /**
     * resetTextBoxesSkins
     * @api : resetTextBoxesSkins
     * sets skin for text boxes
     * @return : NA
     */
    resetTextBoxesSkins: function() {
      var self = this;
      try {
        this.view.tbxPayeeName.skin = this.getParsedValue(this._sknFieldValue, kony.application.getCurrentBreakpoint());
        this.view.tbxNewAccountNumber.skin = this.getParsedValue(this._sknFieldValue, kony.application.getCurrentBreakpoint());
        this.view.tbxReenterAccountNumber.skin = this.getParsedValue(this._sknFieldValue, kony.application.getCurrentBreakpoint());
        this.view.tbxPayeeDetailField1.skin = this.getParsedValue(this._sknFieldValue, kony.application.getCurrentBreakpoint());
        this.view.tbxPayeeDetailField2.skin = this.getParsedValue(this._sknFieldValue, kony.application.getCurrentBreakpoint());
        this.view.tbxPayeeDetailField3.skin = this.getParsedValue(this._sknFieldValue, kony.application.getCurrentBreakpoint());
        this.view.tbxNickName.skin = this.getParsedValue(this._sknFieldValue, kony.application.getCurrentBreakpoint());
      } catch(e)
      {
        var errorObj =
            {
              "errorInfo" : "Error in resetTextBoxesSkins method" ,
              "errorLevel" : "Business",
              "error": e
            };
        self.onError(errorObj);
      }
    },

    /**
     * @api : showValidationErrors
     * displays errors on validation of the fields in unified transfers screen.
     * @return : NA
     */
    showValidationErrors: function(response) {
      var self = this;
      try {
        this.resetTextBoxesSkins();
        this.invokedvfFieldErrorParser(response);
      } catch(e)
      {
        var errorObj =
            {
              "errorInfo" : "Error in showValidationErrors method" ,
              "errorLevel" : "Business",
              "error": e
            };
        self.onError(errorObj);
      }
    },

    /**
     * invokedvfFieldErrorParser
     * @api : invokedvfFieldErrorParser
     * gets invoked when validation fails
     * @return : NA
     */
    invokedvfFieldErrorParser : function(dvfError){
      var self = this; 
      try {
        var txtField;
        var transferType = this.getParsedValue(this._recipientFlow);
        for(var iterator in dvfError){
          if("if_txtValue1" === iterator){
            this.view.tbxPayeeName.skin =this.getParsedValue(this._sknErrorTextInput, kony.application.getCurrentBreakpoint());
            txtField = "Payee Name";
          }
          if("if_txtValue2" === iterator){
            this.view.tbxNewAccountNumber.skin = this.getParsedValue(this._sknErrorTextInput, kony.application.getCurrentBreakpoint());
            txtField = "Account Number";
          }
          if("if_txtValue3" === iterator){
            this.view.tbxReenterAccountNumber.skin = this.getParsedValue(this._sknErrorTextInput, kony.application.getCurrentBreakpoint());
            txtField = "Account Number";
          }
          if("if_txtValue4" === iterator){
            this.view.tbxPayeeDetailField1.skin = this.getParsedValue(this._sknErrorTextInput, kony.application.getCurrentBreakpoint());
            txtField = "BIC/SWIFT";
          }
          if("if_txtValue5" === iterator){
            this.view.tbxPayeeDetailField2.skin = this.getParsedValue(this._sknErrorTextInput, kony.application.getCurrentBreakpoint());
            txtField = "Clearing Code1";
          }
          if("if_txtValue6" === iterator){
            this.view.tbxPayeeDetailField3.skin = this.getParsedValue(this._sknErrorTextInput, kony.application.getCurrentBreakpoint());
            txtField = "Clearing Code2";
          } 
          if("if_txtValue7" === iterator){
            this.view.tbxPayeeDetailField4.skin = this.getParsedValue(this._sknErrorTextInput, kony.application.getCurrentBreakpoint());
            txtField = "Clearing Code2";
          } 
          if("if_txtValue9" === iterator){
            this.view.tbxPayeeDetailField5.skin = this.getParsedValue(this._sknErrorTextInput, kony.application.getCurrentBreakpoint());
            txtField = "Street Name";
          }
          if("if_txtValue10" === iterator){
            this.view.tbxPayeeDetailField6.skin = this.getParsedValue(this._sknErrorTextInput, kony.application.getCurrentBreakpoint());
            txtField = "Town";
          }
          if("if_txtValue11" === iterator){
            this.view.tbxIntermediaryBIC.skin = this.getParsedValue(this._sknErrorTextInput, kony.application.getCurrentBreakpoint());
            txtField = "Intermediary BIC";
          }
          if("if_txtValue8" === iterator){
            this.view.tbxNickName.skin = this.getParsedValue(this._sknErrorTextInput, kony.application.getCurrentBreakpoint());
            txtField = "Nickname";
          }
          if("ct_txtValue1" === iterator){
            this.view.tbxCountryCode.skin = this.getParsedValue(this._sknErrorTextInput, kony.application.getCurrentBreakpoint());
            txtField = "Country Code";
          }
          if("ct_txtValue2" === iterator){
            this.view.tbxMobileNumber.skin = this.getParsedValue(this._sknErrorTextInput, kony.application.getCurrentBreakpoint());
            txtField = "Mobile Number";
          }
          if("ct_txtValue3" === iterator){
            this.view.tbxEmailAddress.skin = this.getParsedValue(this._sknErrorTextInput, kony.application.getCurrentBreakpoint());
            txtField = "Email Address";
          }
          if("ct_txtValue4" === iterator){
            this.view.tbxNationalId.skin = this.getParsedValue(this._sknErrorTextInput, kony.application.getCurrentBreakpoint());
            txtField = "National ID";
          }
          if("adf_txtValue1" === iterator){
            this.view.tbxCode.skin = this.getParsedValue(this._sknErrorTextInput, kony.application.getCurrentBreakpoint());
            txtField = "Country Code";
          }
          if("adf_txtValue2" === iterator){
            this.view.tbxPhoneNumber.skin = this.getParsedValue(this._sknErrorTextInput, kony.application.getCurrentBreakpoint());
            txtField = "Phone Number";
          }
          if("adf_txtValue3" === iterator){
            this.view.tbxEmailId.skin = this.getParsedValue(this._sknErrorTextInput, kony.application.getCurrentBreakpoint());
            txtField = "Email Address";
          }
          if("adf_txtValue4" === iterator){
            this.view.tbxAddressLine1.skin = this.getParsedValue(this._sknErrorTextInput, kony.application.getCurrentBreakpoint());
            txtField = "Address Line1";
          }
          if("adf_txtValue5" === iterator){
            this.view.tbxAddressLine2.skin = this.getParsedValue(this._sknErrorTextInput, kony.application.getCurrentBreakpoint());
            txtField = "Address Line2";
          }
          if("adf_txtValue6" === iterator){
            this.view.tbxCity.skin = this.getParsedValue(this._sknErrorTextInput, kony.application.getCurrentBreakpoint());
            txtField = "City";
          }
          if("adf_txtValue7" === iterator){
            this.view.tbxZipCode.skin = this.getParsedValue(this._sknErrorTextInput, kony.application.getCurrentBreakpoint());
            txtField = "Zip Code";
          }
        }  
        var errorTxt = dvfError[iterator];
        errorTxt = errorTxt.replace(iterator, txtField);
        this.view.txtErrormessage.text = errorTxt;
        if(txtField = "Account Number"){
          this.view.tbxNewAccountNumber.text = "";
          this.view.tbxReenterAccountNumber.text = "";
          this.view.tbxNewAccountNumber.setFocus(true);
        }
        this.setErrorFlexVisibility(true);
      } catch(e)
      {
        var errorObj =
            {
              "errorInfo" : "Error in invokedvfFieldErrorParser method" ,
              "errorLevel" : "Business",
              "error": e
            };
        self.onError(errorObj);
      }
    },

    /**
     * onSearchCountryCode
     * search for the country code
     * @return : NA
      */
    onSearchCountryCode : function(param) {
      var scope = this;
      var searchString;
      try {
        var tempCountryList = new countryCodeControllerIC();
        if(this.view.tbxCode.text === "" && this.view.tbxCountryCode.text === ""){
          if(param === "address")
            this.view.tbxCode.text = "";
          else
            this.view.tbxCountryCode.text = "";
        } 
        else {
          kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {});
          var sectionDataCountryCode = [];
          var recordCountryCode = {};
          if(param === "address")
            searchString = this.view.tbxCode.text;
          else
            searchString = this.view.tbxCountryCode.text;
          searchString = searchString.toLowerCase();
          for(var i=0;i<tempCountryList.countryCodeList.countries.length;i++) {
            tempCountryList.countryCodeList.countries[i].name = tempCountryList.countryCodeList.countries[i].name.toLowerCase();
          }
          for(var i=0;i<tempCountryList.countryCodeList.countries.length;i++) {
            if(!this.isEmptyNullUndefined(searchString)) {
              if(tempCountryList.countryCodeList.countries[i].name.includes(searchString) || tempCountryList.countryCodeList.countries[i].code.includes(searchString)){
                recordCountryCode = {"lblCountryCode" : this.countryCodeControllerIC.countryCodeList.countries[i].name + " ("+this.countryCodeControllerIC.countryCodeList.countries[i].code+")",code : this.countryCodeControllerIC.countryCodeList.countries[i].code};
                sectionDataCountryCode.push(recordCountryCode);
              }
            } 
          }
          if(sectionDataCountryCode.length>0) {
            if(param === "address")
              this.view.segCodeNameList.setData(sectionDataCountryCode);
            else
              this.view.segCountryCodeList.setData(sectionDataCountryCode);
          }
          this.view.forceLayout();
          kony.application.dismissLoadingScreen();
        }
        this.view.flxCountryCodes.accessibilityConfig = {
          "a11yLabel": "show country details",
                            "a11yARIA" : {
            "tabindex" : -1,
            "aria-haspopup": "true"
          }
        }
        this.view.flxCountryCode.accessibilityConfig = {
          "a11yLabel": "show country details",
                            "a11yARIA" : {
            "tabindex" : -1,
            "aria-haspopup": "true"
          }
        }
      } catch(err){
        var errorObj =
            {
              "errorInfo" : "Error in onSearchCountryCode method" ,
              "errorLevel" : "Business",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
     * getContextFromSegment
     * Sets the country code to the widget
     * @return : NA
      */
    getContextFromSegment: function(param){
      var scope = this;
      var countryCode;
      try {
        if(param === "address") {
          let rowindex = Math.floor(scope.view.segCodeNameList.selectedRowIndex[1]);
          let segData = scope.view.segCodeNameList.data[rowindex];
          countryCode = segData['code'];
          this.view.tbxCode.text = countryCode;
          this.view.flxCountryCode.setVisibility(false);
          this.view.flxCountryCode.accessibilityConfig = {
            "a11yLabel": "Hide country details",
                              "a11yARIA" : {
              "tabindex" : -1,
              "aria-haspopup": "false"
            }
          }
          this.updateContext("tbxCode", countryCode);
          this.view.forceLayout();
        }
        else {
          let rowindex = Math.floor(scope.view.segCountryCodeList.selectedRowIndex[1]);
          let segData = scope.view.segCountryCodeList.data[rowindex];
          countryCode = segData['code'];
          this.view.tbxCountryCode.text = countryCode;
          this.view.flxCountryCodes.setVisibility(false);
          this.updateContext("tbxCountryCode", countryCode);
          this.view.forceLayout();
          this.view.tbxCountryCode.setActive(true);
        }
      } catch(err){
        var errorObj =
            {
              "errorInfo" : "Error in getContextFromSegment method" ,
              "errorLevel" : "Business",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
     * setDataList
     * Sets the country code to the segment
     * @return : NA
      */
    setCountryCodeList : function(){
      var self = this;
      try {
        this.view.segCodeNameList.widgetDataMap = this.getCountryCodeWidgetDataMap();
        this.view.segCountryCodeList.widgetDataMap = this.getCountryCodeWidgetDataMap();
        var sectionDataCountryCode = [];
        var recordCountryCode = {};
        for(var i=0;i<this.countryCodeControllerIC.countryCodeList.countries.length;i++){
          recordCountryCode = {"lblCountryCode" : this.countryCodeControllerIC.countryCodeList.countries[i].name + " ("+this.countryCodeControllerIC.countryCodeList.countries[i].code+")",code : this.countryCodeControllerIC.countryCodeList.countries[i].code};
          sectionDataCountryCode.push(recordCountryCode);
        }
        this.view.segCodeNameList.setData(sectionDataCountryCode);
        this.view.segCountryCodeList.setData(sectionDataCountryCode);
        this.view.forceLayout();
      } catch(err){
        var errorObj =
            {
              "errorInfo" : "Error in setDataList method" ,
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },

    /**
     * getCountryCodeWidgetDataMap
     * Sets the data to the segment
     * @return : NA
      */
    getCountryCodeWidgetDataMap : function(){
      var self = this;
      try {
        return {
          "flxCountryCodeList" : "flxCountryCodeList",
          "lblCountryCode" : "lblCountryCode"
        };
      } catch(err){
        var errorObj =
            {
              "errorInfo" : "Error in getCountryCodeWidgetDataMap method" ,
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },

    /**
     * setDefaultCTAText
     * Sets the details provided in the contracts for widgets related to basic button detatils
     * @return : NA
      */
    setDefaultCTAText : function(){
      var self = this;
      try{
        if(this.isEmptyNullUndefined(this._utfCTAbutton1.text))
          this.view.btnCancel.setVisibility(false);
        else {
          this.view.btnCancel.text = this.getParsedValue(this._utfCTAbutton1.text, kony.application.getCurrentBreakpoint());
        }
        if(this.isEmptyNullUndefined(this._utfCTAbutton2.text))
          this.view.btnContinue.setVisibility(false);
        else {
          this.view.btnContinue.text = this.getParsedValue(this._utfCTAbutton2.text, kony.application.getCurrentBreakpoint());
        }
      } catch(err){
        var errorObj =
            {
              "errorInfo" : "Error in setDefaultCTAText method" ,
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },

    /**
     * setDefaultAddressDetailsActions
     * Sets the default address details actions
     * @return : NA
     */
    setDefaultAddressDetailsActions: function() {
      var self = this;
      var inputData;
      try {
        this.setCountryCodeList();
        this.invokeAddressCountryListService();
        //this.invokeAddressStateListService();
        self.view.tbxCode.onTextChange = function() {
          self.view.flxCountryCode.setVisibility(true);
          self.view.flxCountryCode.accessibilityConfig = {
            "a11yLabel": "show country details",
                              "a11yARIA" : {
              "tabindex" : -1,
              "aria-haspopup": "true"
            }
          }
          self.isSegVisible = false;
          self.onSearchCountryCode("address");
        };
        this.view.segCodeNameList.onRowClick = this.getContextFromSegment.bind(this, "address");
        self.view.tbxCode.onEndEditing = function() {
          self.updateContext("tbxCode", self.view.tbxCode.text); 
        };
        self.view.tbxPhoneNumber.onEndEditing = function() {
          if(!self.isEmptyNullUndefined(self.dataContext["displayPhoneNumber"]) || !self.isEmptyNullUndefined(self.view.tbxPhoneNumber.text))
            self.minFillValidation("adf_txtValue2");
          self.updateContext("tbxPhoneNumber", self.view.tbxPhoneNumber.text); 
          self.dataContext["phoneNumber"] = self.getDeformattedPhoneNumber(self.view.tbxPhoneNumber.text);
        };
        self.view.tbxEmailId.onEndEditing = function() {
          if(!self.isEmptyNullUndefined(self.dataContext["emailID"]) || !self.isEmptyNullUndefined(self.view.tbxEmailId.text))
            self.minFillValidation("adf_txtValue3");
          self.updateContext("tbxEmailId", self.view.tbxEmailId.text); 
          if(!self.isEmptyNullUndefined(self._adfTextBox3.formatType))
            self.setFrontEndFormatType(self._adfTextBox3.formatType, self.view.tbxEmailId);
        };
        self.view.tbxAddressLine1.onEndEditing = function() {
          if(!self.isEmptyNullUndefined(self.dataContext["addressLine1"]) || !self.isEmptyNullUndefined(self.view.tbxAddressLine1.text))
            self.minFillValidation("adf_txtValue4");
          self.updateContext("tbxAddressLine1", self.view.tbxAddressLine1.text); 
        };
        self.view.tbxAddressLine2.onEndEditing = function() {
          if(!self.isEmptyNullUndefined(self.dataContext["addressLine2"]) || !self.isEmptyNullUndefined(self.view.tbxAddressLine2.text))
            self.minFillValidation("adf_txtValue5");
          self.updateContext("tbxAddressLine2", self.view.tbxAddressLine2.text); 
        };
        self.view.tbxCity.onEndEditing = function() {
          if(!self.isEmptyNullUndefined(self.dataContext["city"]) || !self.isEmptyNullUndefined(self.view.tbxCity.text))
            self.minFillValidation("adf_txtValue6");
          self.updateContext("tbxCity", self.view.tbxCity.text); 
        };
        self.view.tbxZipCode.onEndEditing = function() {
          if(!self.isEmptyNullUndefined(self.dataContext["zipCode"]) || !self.isEmptyNullUndefined(self.view.tbxZipCode.text))
            self.minFillValidation("adf_txtValue7");
          self.updateContext("tbxZipCode", self.view.tbxZipCode.text); 
        };
        self.view.tbxCode.onKeyUp = function() {
          if(self.view.tbxCode.text === "")
            self.view.flxCountryCode.setVisibility(false);
            self.view.flxCountryCode.accessibilityConfig = {
              "a11yLabel": "Hide country details",
                                "a11yARIA" : {
                "tabindex" : -1,
                "aria-haspopup": "true"
              }
            }
        };
        if (!this.isEmptyNullUndefined(this._adfTextBox2.formatType))
          this.view.tbxPhoneNumber.onKeyUp = this.setFrontEndFormatType.bind(this, this._adfTextBox2.formatType, this.view.tbxPhoneNumber);
      } catch(err){
        var errorObj =
            {
              "errorInfo" : "Error in setDefaultAddressDetailsActions method" ,
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },

    /**
     * setDefaultAddressDetailsText
     * Sets the details provided in the contracts for widgets related to basic button detatils
     * @return : NA
     */
    setDefaultAddressDetailsText: function(){
      var self = this;
      try {
        if((this.isEmptyNullUndefined(this._adfTextBox1.mapping) || this.isEmptyNullUndefined(this._adfTextBox1.placeHolder)) && 
           ((this.isEmptyNullUndefined(this._adfTextBox2.mapping) || this.isEmptyNullUndefined(this._adfTextBox2.placeHolder))) && 
           (this.isEmptyNullUndefined(this._adfTextBox2Label.text)))
          this.view.flxPhoneNumber.setVisibility(false);
        else {
          if((this.isEmptyNullUndefined(this._adfTextBox1.mapping) || this.isEmptyNullUndefined(this._adfTextBox1.placeHolder))) {
            this.view.flxCode.setVisibility(false);
            this.view.flxNumber.left = "0dp";
            this.view.flxNumber.width = "100%";
          }
          else {
            this.view.tbxCode.placeholder = this.getParsedValue(this._adfTextBox1.placeHolder, kony.application.getCurrentBreakpoint());
            this.view.tbxCode.text = "";
            this.view.lblPhoneNumber.text = this.getParsedValue(this._adfTextBox2Label.text, kony.application.getCurrentBreakpoint());
            this.view.tbxPhoneNumber.placeholder = this.getParsedValue(this._adfTextBox2.placeHolder, kony.application.getCurrentBreakpoint());
            this.view.tbxPhoneNumber.text = "";
            this.mapTextBoxWithContext(this._adfTextBox1.mapping, "tbxCode");
            this.mapTextBoxWithContext(this._adfTextBox2.mapping, "tbxPhoneNumber");
            this.setInputMode(this._adfTextBox2.inputMode, "tbxPhoneNumber");
          }
        }
        if((this.isEmptyNullUndefined(this._adfTextBox3.mapping) || this.isEmptyNullUndefined(this._adfTextBox3.placeHolder)) && (this.isEmptyNullUndefined(this._adfTextBox3Label.text)))
          this.view.flxEmailId.setVisibility(false);
        else {
          this.view.lblEmailId.text = this.getParsedValue(this._adfTextBox3Label.text, kony.application.getCurrentBreakpoint());
          this.view.tbxEmailId.placeholder = this.getParsedValue(this._adfTextBox3.placeHolder, kony.application.getCurrentBreakpoint());
          this.view.tbxEmailId.text = "";
          this.mapTextBoxWithContext(this._adfTextBox3.mapping, "tbxEmailId");
          this.setInputMode(this._adfTextBox3.inputMode, "tbxEmailId");
        }
        if((this.isEmptyNullUndefined(this._adfTextBox4.mapping) || this.isEmptyNullUndefined(this._adfTextBox4.placeHolder)) && (this.isEmptyNullUndefined(this._adfTextBox4Label.text)))
          this.view.flxAddressLine1.setVisibility(false);
        else {
          this.view.lblAddressLine1.text = this.getParsedValue(this._adfTextBox4Label.text, kony.application.getCurrentBreakpoint());
          this.view.tbxAddressLine1.placeholder = this.getParsedValue(this._adfTextBox4.placeHolder, kony.application.getCurrentBreakpoint());
          this.view.tbxAddressLine1.text = "";
          this.mapTextBoxWithContext(this._adfTextBox4.mapping, "tbxAddressLine1");
          this.setInputMode(this._adfTextBox4.inputMode, "tbxAddressLine1");
        }
        if((this.isEmptyNullUndefined(this._adfTextBox5.mapping) || this.isEmptyNullUndefined(this._adfTextBox5.placeHolder)) && (this.isEmptyNullUndefined(this._adfTextBox5Label.text)))
          this.view.flxAddressLine2.setVisibility(false);
        else {
          this.view.lblAddressLine2.text = this.getParsedValue(this._adfTextBox5Label.text, kony.application.getCurrentBreakpoint());
          this.view.tbxAddressLine2.placeholder = this.getParsedValue(this._adfTextBox5.placeHolder, kony.application.getCurrentBreakpoint());
          this.view.tbxAddressLine2.text = "";
          this.mapTextBoxWithContext(this._adfTextBox5.mapping, "tbxAddressLine2");
          this.setInputMode(this._adfTextBox5.inputMode, "tbxAddressLine2");
        }
        if((this.isEmptyNullUndefined(this._countryValue.mapping) || this.isEmptyNullUndefined(this._countryValue.placeHolder)) &&
           (this.isEmptyNullUndefined(this._countryLabel.text)))
          //AddNEwAccount
          //this.view.flxCountry.setVisibility(false);
          this.view.flxState.setVisibility(false);
        else {
//           this.view.lblCountry.text = this.getParsedValue(this._countryLabel.text, kony.application.getCurrentBreakpoint());
//           this.view.lbxCountry.placeholder = this.getParsedValue(this._countryValue.placeHolder, kony.application.getCurrentBreakpoint());
//           this.mapTextBoxWithContext(this._countryValue.mapping, "lbxCountry");
          this.view.lblState.text = this.getParsedValue(this._countryLabel.text, kony.application.getCurrentBreakpoint());
          this.view.lbxState.placeholder = this.getParsedValue(this._countryValue.placeHolder, kony.application.getCurrentBreakpoint());
          this.mapTextBoxWithContext(this._countryValue.mapping, "lbxState");
        }
//         if((this.isEmptyNullUndefined(this._stateValue.mapping) || this.isEmptyNullUndefined(this._stateValue.placeHolder)) &&
//            (this.isEmptyNullUndefined(this._stateLabel.text)))
//           this.view.flxState.setVisibility(false);
//         else {
//           this.view.lblState.text = this.getParsedValue(this._stateLabel.text, kony.application.getCurrentBreakpoint());
//           this.view.lbxState.placeholder = this.getParsedValue(this._stateValue.placeHolder, kony.application.getCurrentBreakpoint());
//           this.mapTextBoxWithContext(this._stateValue.mapping, "lbxState");
//         }
        if((this.isEmptyNullUndefined(this._adfTextBox6.mapping) || this.isEmptyNullUndefined(this._adfTextBox6.placeHolder)) && (this.isEmptyNullUndefined(this._adfTextBox6Label.text)))
          this.view.flxCityField.setVisibility(false);
        else {
          this.view.lblCity.text = this.getParsedValue(this._adfTextBox6Label.text, kony.application.getCurrentBreakpoint());
          this.view.tbxCity.placeholder = this.getParsedValue(this._adfTextBox6.placeHolder, kony.application.getCurrentBreakpoint());
          this.view.tbxCity.text = "";
          this.mapTextBoxWithContext(this._adfTextBox6.mapping, "tbxCity");
          this.setInputMode(this._adfTextBox6.inputMode, "tbxCity");
        }
        if((this.isEmptyNullUndefined(this._adfTextBox7.mapping) || this.isEmptyNullUndefined(this._adfTextBox7.placeHolder)) && (this.isEmptyNullUndefined(this._adfTextBox7Label.text)))
          this.view.flxZipCodeField.setVisibility(false);
        else {
          this.view.lblZipCode.text = this.getParsedValue(this._adfTextBox7Label.text, kony.application.getCurrentBreakpoint());
          this.view.tbxZipCode.placeholder = this.getParsedValue(this._adfTextBox7.placeHolder, kony.application.getCurrentBreakpoint());
          this.view.tbxZipCode.text = "";
          this.mapTextBoxWithContext(this._adfTextBox7.mapping, "tbxZipCode");
          this.setInputMode(this._adfTextBox7.inputMode, "tbxZipCode");
        }
        if(((this.isEmptyNullUndefined(this._adfTextBox2Label.text)) || (this.isEmptyNullUndefined(this._adfTextBox2.placeHolder))) && ((this.isEmptyNullUndefined(this._adfTextBox3Label.text)) || (this.isEmptyNullUndefined(this._adfTextBox3.placeHolder))))
          this.view.flxPhoneNumberEmailId.setVisibility(false);
        if(((this.isEmptyNullUndefined(this._countryLabel.text)) || (this.isEmptyNullUndefined(this._countryValue.placeHolder))) && ((this.isEmptyNullUndefined(this._stateLabel.text)) || (this.isEmptyNullUndefined(this._stateValue.placeHolder))))
          this.view.flxCountryandState.setVisibility(false);
        if(((this.isEmptyNullUndefined(this._adfTextBox6Label.text)) || (this.isEmptyNullUndefined(this._adfTextBox6.placeHolder))) && ((this.isEmptyNullUndefined(this._adfTextBox7Label.text)) || (this.isEmptyNullUndefined(this._adfTextBox7.placeHolder))))
          this.view.flxCityZipCodeField.setVisibility(false);
        if((this.isEmptyNullUndefined(this._adfTextBox2Label.text)) && (this.isEmptyNullUndefined(this._adfTextBox3Label.text)) && (this.isEmptyNullUndefined(this._adfTextBox4Label.text)) && (this.isEmptyNullUndefined(this._adfTextBox5Label.text)) && (this.isEmptyNullUndefined(this._countryLabel.text)) && (this.isEmptyNullUndefined(this._stateLabel.text)) && (this.isEmptyNullUndefined(this._adfTextBox6Label.text)) && (this.isEmptyNullUndefined(this._adfTextBox7Label.text))) {
          this.view.flxAddressLabel.setVisibility(false);
          this.view.flxButtonSeparator.setVisibility(false);
        }
      } 
      catch(err) {
        var errorObj =
            {
              "errorInfo" : "Error in setDefaultAddressDetailsText method" ,
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },

    /**
     * setDefaultCTASkins
     * Sets the skins to the buttons from respective contracts
     * @return : NA
     */
    setDefaultCTASkins: function() {
      var self = this;
      try {
        this.view.btnContinue.skin = this.getParsedValue(this._sknPrimaryBtnDisabled, kony.application.getCurrentBreakpoint());
        this.view.btnContinue.hoverSkin = this.getParsedValue(this._sknPrimaryBtnDisabled, kony.application.getCurrentBreakpoint());
        this.view.btnContinue.focusSkin = this.getParsedValue(this._sknPrimaryBtnDisabled, kony.application.getCurrentBreakpoint());
        this.view.btnCancel.skin = this.getParsedValue(this._sknSecondaryBtn, kony.application.getCurrentBreakpoint());
        this.view.btnCancel.hoverSkin = this.getParsedValue(this._sknSecondaryBtnHover, kony.application.getCurrentBreakpoint());
        this.view.btnCancel.focusSkin = this.getParsedValue(this._sknSecondaryBtnFocus, kony.application.getCurrentBreakpoint());
      }
      catch(err) {
        var errorObj =
            {
              "errorInfo" : "Error in setDefaultCTAActions method" ,
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },

    /**
     * setDefaultAddressDetailsSkins
     * Sets the skins to the buttons from respective contracts
     * @return : NA
     */
    setDefaultAddressDetailsSkins : function(){
      var self = this;
      try {
        this.view.tbxCode.skin = this.getParsedValue(this._sknFieldValue, kony.application.getCurrentBreakpoint());
        this.view.tbxCode.placeholderSkin = this.getParsedValue(this._sknTextBoxPlaceholder, kony.application.getCurrentBreakpoint());
        this.view.lblPayeeAddress.skin = this.getParsedValue(this._sknBoldFieldLabel, kony.application.getCurrentBreakpoint());
        this.view.lblPayeeAddressOptional.skin = this.getParsedValue(this._sknFieldLabel, kony.application.getCurrentBreakpoint());
        this.view.lblPhoneNumber.skin = this.getParsedValue(this._sknFieldLabel, kony.application.getCurrentBreakpoint());
        this.view.tbxPhoneNumber.skin = this.getParsedValue(this._sknFieldValue, kony.application.getCurrentBreakpoint());
        this.view.tbxPhoneNumber.placeholderSkin = this.getParsedValue(this._sknTextBoxPlaceholder, kony.application.getCurrentBreakpoint());
        this.view.lblEmailId.skin = this.getParsedValue(this._sknFieldLabel, kony.application.getCurrentBreakpoint());
        this.view.tbxEmailId.skin = this.getParsedValue(this._sknFieldValue, kony.application.getCurrentBreakpoint());
        this.view.tbxEmailId.placeholderSkin = this.getParsedValue(this._sknTextBoxPlaceholder, kony.application.getCurrentBreakpoint());
        this.view.lblAddressLine1.skin = this.getParsedValue(this._sknFieldLabel, kony.application.getCurrentBreakpoint());
        this.view.tbxAddressLine1.skin = this.getParsedValue(this._sknFieldValue, kony.application.getCurrentBreakpoint());
        this.view.tbxAddressLine1.placeholderSkin = this.getParsedValue(this._sknTextBoxPlaceholder, kony.application.getCurrentBreakpoint());
        this.view.lblAddressLine2.skin = this.getParsedValue(this._sknFieldLabel, kony.application.getCurrentBreakpoint());
        this.view.tbxAddressLine2.skin = this.getParsedValue(this._sknFieldValue, kony.application.getCurrentBreakpoint());
        this.view.tbxAddressLine2.placeholderSkin = this.getParsedValue(this._sknTextBoxPlaceholder, kony.application.getCurrentBreakpoint());
        this.view.lblCity.skin = this.getParsedValue(this._sknFieldLabel, kony.application.getCurrentBreakpoint());
        this.view.tbxCity.skin = this.getParsedValue(this._sknFieldValue, kony.application.getCurrentBreakpoint());
        this.view.tbxCity.placeholderSkin = this.getParsedValue(this._sknTextBoxPlaceholder, kony.application.getCurrentBreakpoint());
        this.view.lblZipCode.skin = this.getParsedValue(this._sknFieldLabel, kony.application.getCurrentBreakpoint());
        this.view.tbxZipCode.skin = this.getParsedValue(this._sknFieldValue, kony.application.getCurrentBreakpoint());
        this.view.tbxZipCode.placeholderSkin = this.getParsedValue(this._sknTextBoxPlaceholder, kony.application.getCurrentBreakpoint());
       //AddNewAccount
        //this.view.lblCountry.skin = this.getParsedValue(this._sknFieldLabel, kony.application.getCurrentBreakpoint());
        //this.view.lbxCountry.skin = this.getParsedValue(this._sknFieldValue, kony.application.getCurrentBreakpoint());
        //this.view.lbxCountry.placeholderSkin = this.getParsedValue(this._sknTextBoxPlaceholder, kony.application.getCurrentBreakpoint());
        this.view.lblState.skin = this.getParsedValue(this._sknFieldLabel, kony.application.getCurrentBreakpoint());
       // this.view.lbxState.skin = this.getParsedValue(this._sknFieldValue, kony.application.getCurrentBreakpoint());
       this.view.lbxState.skin="ICSknlbxSSPR72727215px";
        this.view.lbxState.placeholderSkin = this.getParsedValue(this._sknTextBoxPlaceholder, kony.application.getCurrentBreakpoint());
//      this.view.lblState.skin = this.getParsedValue(this._sknFieldLabel, kony.application.getCurrentBreakpoint());
//      this.view.lbxState.skin = this.getParsedValue(this._sknFieldValue, kony.application.getCurrentBreakpoint());
//      this.view.lbxState.placeholderSkin = this.getParsedValue(this._sknTextBoxPlaceholder, kony.application.getCurrentBreakpoint());
      }  
      catch(err){
        var errorObj =
            {
              "errorInfo" : "Error in setDefaultAddressDetailsSkins method" ,
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },

    /**
     * setDefaultPayeeDetailsText
     * Sets the details provided in the contracts for widgets related to basic payee details
     * @return : NA
     */
    setDefaultPayeeDetailsText: function() {
      var self = this;
      try {
        if(this.isEmptyNullUndefined(this._ifTextBox1Label.text) || this.isEmptyNullUndefined(this._ifTextBox1.placeHolder))
          this.view.flxPayeeName.setVisibility(false);
        else {
          this.view.lblPayeeName.text = this.getParsedValue(this._ifTextBox1Label.text, kony.application.getCurrentBreakpoint());        
          this.view.tbxPayeeName.placeholder = this.getParsedValue(this._ifTextBox1.placeHolder,kony.application.getCurrentBreakpoint());
          this.view.tbxPayeeName.text = "";
          this.mapTextBoxWithContext(this._ifTextBox1.mapping, "tbxPayeeName");
          this.setInputMode(this._ifTextBox1.inputMode, "tbxPayeeName");
        }

        if(this.isEmptyNullUndefined(this._ifTextBox2Label.text) || this.isEmptyNullUndefined(this._ifTextBox2.placeHolder))
          this.view.flxEnterAccountNumber.setVisibility(false);
        else {
          this.view.lblAccountNumber.text = this.getParsedValue(this._ifTextBox2Label.text, kony.application.getCurrentBreakpoint());        
          this.view.tbxNewAccountNumber.placeholder = this.getParsedValue(this._ifTextBox2.placeHolder,kony.application.getCurrentBreakpoint());   
          this.view.tbxNewAccountNumber.text = "";
          if(this.getParsedValue(this._ifTextBox2.isMaskingEnabled) === true)
            this.view.tbxNewAccountNumber.secureTextEntry = true;
          this.mapTextBoxWithContext(this._ifTextBox2.mapping, "tbxNewAccountNumber");
          this.setInputMode(this._ifTextBox2.inputMode, "tbxNewAccountNumber");
        }

        if(this.isEmptyNullUndefined(this._ifReenterTextBox2Label.text) || this.isEmptyNullUndefined(this._ifReenterTextBox2.placeHolder))
          this.view.flxReEnterAccountNumber.setVisibility(false);
        else {
          this.view.lblReenterAccountNumber.text = this.getParsedValue(this._ifReenterTextBox2Label.text, kony.application.getCurrentBreakpoint());        
          this.view.tbxReenterAccountNumber.placeholder = this.getParsedValue(this._ifReenterTextBox2.placeHolder,kony.application.getCurrentBreakpoint());  
          this.view.tbxReenterAccountNumber.text = "";
          if(this.getParsedValue(this._ifReenterTextBox2.isMaskingEnabled) === true)
            this.view.tbxReenterAccountNumber.secureTextEntry = true;
          this.mapTextBoxWithContext(this._ifReenterTextBox2.mapping, "tbxReenterAccountNumber");
          this.setInputMode(this._ifReenterTextBox2.inputMode, "tbxReenterAccountNumber");
        }

        if(this.isEmptyNullUndefined(this._ifTextBox10Label.text) || this.isEmptyNullUndefined(this._ifTextBox10.placeHolder))
          this.view.flxIntermediaryBIC.setVisibility(false);
        else {
          this.view.lblIntermediaryBIC.text = this.getParsedValue(this._ifTextBox10Label.text, kony.application.getCurrentBreakpoint());        
          this.view.tbxIntermediaryBIC.placeholder = this.getParsedValue(this._ifTextBox10.placeHolder,kony.application.getCurrentBreakpoint());   
          this.view.tbxIntermediaryBIC.text = "";
          this.mapTextBoxWithContext(this._ifTextBox10.mapping, "tbxIntermediaryBIC");
        }
        if (this.isEmptyNullUndefined(this._ifTextBox3Label.text) || this.isEmptyNullUndefined(this._ifTextBox3.placeHolder))
          this.view.flxAccountNickName.setVisibility(false);
        else {
          this.view.lblNickName.text = this.getParsedValue(this._ifTextBox3Label.text, kony.application.getCurrentBreakpoint());
          this.view.tbxNickName.placeholder = this.getParsedValue(this._ifTextBox3.placeHolder, kony.application.getCurrentBreakpoint());
          this.view.tbxNickName.text = "";
          this.mapTextBoxWithContext(this._ifTextBox3.mapping, "tbxNickName");
          this.setInputMode(this._ifTextBox3.inputMode, "tbxNickName");
        }
        if((this.view.flxEnterAccountNumber.isVisible === false) && (this.view.flxReEnterAccountNumber.isVisible === false))
          this.view.flxPayeeAccountNumber.setVisibility(false);
      }
      catch(e)
      {
        var errorObj =
            {
              "errorInfo" : "Error while setting default payee details" ,
              "errorLevel" : "Business",
              "error": e
            };
        self.onError(errorObj);
      }
    },

    /**
     * setDefaultPayeeDetailsActions
     * updates the context with the data entered in text boxes
     * @return : NA
     */
    setDefaultPayeeDetailsActions: function() {
      var scope = this;
      scope.view.tbxNickName.textCopyable = false;
      scope.view.tbxPayeeName.textCopyable = false;
      var inputData;
      try {
        scope.view.tbxPayeeName.onEndEditing = function() {
          if(!scope.isEmptyNullUndefined(scope.dataContext["payeeName"]) || !scope.isEmptyNullUndefined(scope.view.tbxPayeeName.text))
            scope.minFillValidation("if_txtValue1");
          scope.updateContext("tbxPayeeName", scope.view.tbxPayeeName.text);
        };
        scope.view.tbxNewAccountNumber.onEndEditing = function() {
          if(!scope.isEmptyNullUndefined(scope.dataContext["accountNumber"]) || !scope.isEmptyNullUndefined(scope.view.tbxNewAccountNumber.text))
            scope.minFillValidation("if_txtValue2");
          scope.updateContext("tbxNewAccountNumber", scope.view.tbxNewAccountNumber.text);
          scope.validateAccountNumber();
        };
        scope.view.tbxReenterAccountNumber.onEndEditing = function() {
          if(!scope.isEmptyNullUndefined(scope.dataContext["newPayeeAccountNumberReenter"]) || !scope.isEmptyNullUndefined(scope.view.tbxReenterAccountNumber.text))
            scope.minFillValidation("if_txtValue3");
          scope.updateContext("tbxReenterAccountNumber", scope.view.tbxReenterAccountNumber.text);
          scope.validateAccountNumber();
        };
        scope.view.tbxNickName.onEndEditing = function() {
          if(!scope.isEmptyNullUndefined(scope.dataContext["nickName"]) || !scope.isEmptyNullUndefined(scope.view.tbxNickName.text))
            scope.minFillValidation("if_txtValue8");
          scope.updateContext("tbxNickName", scope.view.tbxNickName.text);
        };
        scope.view.tbxIntermediaryBIC.onEndEditing = function() {
          if(!scope.isEmptyNullUndefined(scope.dataContext["intermediaryBIC"]) || !scope.isEmptyNullUndefined(scope.view.tbxIntermediaryBIC.text))
            scope.minFillValidation("if_txtValue11");
          scope.updateContext("tbxIntermediaryBIC", scope.view.tbxIntermediaryBIC.text);
        };
        scope.view.tbxNickName.onKeyUp = function(){
          if(scope.view.tbxNickName.text.replace(/\d/g,'') == ""){
            scope.view.tbxNickName.text="";
          }
          else{
            return scope.view.tbxNickName.text;
          };
        };
        scope.view.tbxPayeeName.onKeyUp = function() {
          if (scope.view.tbxPayeeName.text.replace(/\d/g, '') == "") {
              scope.view.tbxPayeeName.text = "";
          } else {
              return scope.view.tbxPayeeName.text;
          };
      };
      }
      catch(e)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setDefaultPayeeDetailsActions method" ,
              "errorLevel" : "Business",
              "error": e
            };
        scope.onError(errorObj);
      }
    },

    /**
     * setDefaultPayeeDetailsSkins
     * Sets the skins provided in the contracts for widgets related to basic payee details
     * @return : NA
     */
    setDefaultPayeeDetailsSkins: function() {
      var self = this;
      try {
        this.view.lblPayeeName.skin = this.getParsedValue(this._sknFieldLabel, kony.application.getCurrentBreakpoint());
        this.view.tbxPayeeName.skin = this.getParsedValue(this._sknFieldValue, kony.application.getCurrentBreakpoint());
        this.view.tbxPayeeName.placeholderSkin = this.getParsedValue(this._sknTextBoxPlaceholder, kony.application.getCurrentBreakpoint());
        this.view.lblAccountNumber.skin = this.getParsedValue(this._sknFieldLabel, kony.application.getCurrentBreakpoint());
        this.view.tbxNewAccountNumber.skin = this.getParsedValue(this._sknFieldValue, kony.application.getCurrentBreakpoint());
        this.view.tbxNewAccountNumber.placeholderSkin = this.getParsedValue(this._sknTextBoxPlaceholder, kony.application.getCurrentBreakpoint());
        this.view.lblReenterAccountNumber.skin = this.getParsedValue(this._sknFieldLabel, kony.application.getCurrentBreakpoint());
        this.view.tbxReenterAccountNumber.skin = this.getParsedValue(this._sknFieldValue, kony.application.getCurrentBreakpoint());
        this.view.tbxReenterAccountNumber.placeholderSkin = this.getParsedValue(this._sknTextBoxPlaceholder, kony.application.getCurrentBreakpoint());
        this.view.lblNickName.skin = this.getParsedValue(this._sknFieldLabel, kony.application.getCurrentBreakpoint());
        this.view.tbxNickName.skin = this.getParsedValue(this._sknFieldValue, kony.application.getCurrentBreakpoint());
        this.view.tbxNickName.placeholderSkin = this.getParsedValue(this._sknTextBoxPlaceholder, kony.application.getCurrentBreakpoint());
      }
      catch(e)
      {
        var errorObj =
            {
              "errorInfo" : "Error while setting skins of default payee details" ,
              "errorLevel" : "Business",
              "error": e
            };
        self.onError(errorObj);
      }
    },

    /**
    * mapTextInputContractToDvfKey
    * retrieves the value required from textbox contracts to compare with dvf response error
    */
    mapTextInputContractToDvfKey: function(tbxJson) {
      var self = this;
      try {
        var encodedText  = tbxJson;
        var requiredText;
        if(encodedText !== null && encodedText !== undefined && encodedText !==""){
          requiredText = encodedText.split('{$.c.')[1];
          requiredText = requiredText.split('}')[0];  
          return requiredText;
        }} catch(e)
        {
          var errorObj =
              {
                "errorInfo" : "Error while setting skins of default payee details" ,
                "errorLevel" : "Business",
                "error": e
              };
          self.onError(errorObj);
        }
    },

    /**
     * mapTextBoxValueToContext
     * @api : mapTextBoxValueToContext
     * maps the value of textbox to the context assigned in contracts
     * @return : NA
     */
    mapTextBoxWithContext: function(mappingValue, widgetId) {
      var self = this;
      try {
        var inputMapper = mappingValue.substring(5, mappingValue.length-1);
        this.textInputsMapping[widgetId] = inputMapper;
        this.dataContext[this.textInputsMapping[widgetId]] = this.getParsedValue(mappingValue);
      }
      catch(e)
      {
        var errorObj =
            {
              "errorInfo" : "Error while mapping text box with context" ,
              "errorLevel" : "Business",
              "error": e
            };
        self.onError(errorObj);
      }
    },

    /**
     * setInputMode
     * @api : setInputMode
     * sets input mode based on contract config
     * @return : NA
     */
    setInputMode: function(inputMode, widgetId) {
      var self = this;
      try{
        if(inputMode === "NUMERIC")
          this.view[widgetId].restrictCharactersSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%^&*()_-\\?/+={[]}:;,.<>'`|\" ";
        else if(inputMode === "ALPHANUMERIC")
          this.view[widgetId].restrictCharactersSet = "~!@#$%^&*()_-\\?/+={[]}:;,.<>'`|\" ";
        else if(inputMode === "ALPHACHAR")
          this.view[widgetId].restrictCharactersSet = "1234567890";
        else if(inputMode === "EMAIL")
          this.view[widgetId].restrictCharactersSet = "~!#$%^&*()_-\\?/+={[]}:;,<>'`|\" ";
        else if(inputMode === "ALPHABET")
          this.view[widgetId].restrictCharactersSet = "1234567890~!#$%^&*()_-\\?/+={[]}:;,<>'`|\"";
        else
          this.view[widgetId].textInputMode = constants.TEXTBOX_INPUT_MODE_ANY;
      }
      catch(e)
      {
        var errorObj =
            {
              "errorInfo" : "Error while setting input mode" ,
              "errorLevel" : "Business",
              "error": e
            };
        self.onError(errorObj);
      }
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
        this.setErrorFlexVisibility(false);
        this.view.txtErrormessage.text = "";
        this.updateContext("tbxPayeeDetailField1","");
        this.updateContext("tbxPayeeDetailField2","");
        this.updateContext("tbxPayeeDetailField3","");
        this.updateContext("tbxPayeeDetailField4","");
        this.updateContext("tbxPayeeDetailField5","");
        this.updateContext("tbxPayeeDetailField6","");
        this.setBICSwiftData();
        var accNumber = this.view.tbxNewAccountNumber.text;
        var reenterAccNumber = this.view.tbxReenterAccountNumber.text;
        if((accNumber !== "" && accNumber !== undefined)&&(reenterAccNumber !== "" && reenterAccNumber !== undefined )){
          if(accNumber === reenterAccNumber){
            this.view.tbxNewAccountNumber.skin = this.getParsedValue(this._sknFieldValue,kony.application.getCurrentBreakpoint());
            this.view.tbxReenterAccountNumber.skin = this.getParsedValue(this._sknFieldValue,kony.application.getCurrentBreakpoint());
            if(this._accValidationService != "" && accNumber != scope.accNumberValidated){
              var objSvcName = this.getParsedValue(this._accValidationService);
              var objName = this.getParsedValue(this._accValidationObject);
              var operationName = this.getParsedValue(this._accValidationOperation);
              var criteria = this.getCriteria(JSON.stringify(this._accValidationCriteria));
			  if((this._recipientFlow == "Domestic" || this._recipientFlow == "International")&& isNaN(accNumber) && (!/^[a-z]{2}/i.test(accNumber.slice(0, 2)) || !(accNumber.length < 35))){
					  this.inValidIbanError();
			  }
			  else{
              this.unifiedTransferDAO.validateAccountNumber
              (objSvcName,objName,operationName,criteria,onSuccess.bind(this),self.onError);
              function onSuccess(response) {
                scope.accNumberValidated = accNumber;
                kony.application.dismissLoadingScreen();
                if(this._recipientFlow == "SameBank"){
                  scope.view.tbxNickName.setActive(true);
                  if (!response.beneficiaryName) {
                    this.setErrorFlexVisibility(true);
                    this.disableButton();
                    this.view.txtErrormessage.text = kony.i18n.getLocalizedString("i18n.payments.validAccountNumber");
                    //if(this.view.tbxPayeeName.text)this.view.tbxPayeeName.text="";
                    this.view.tbxNewAccountNumber.text = "";
                    this.view.tbxReenterAccountNumber.text = "";
                    this.view.tbxNewAccountNumber.setFocus(true);
                    this.view.tbxNewAccountNumber.skin = this.getParsedValue(this._sknErrorTextInput,kony.application.getCurrentBreakpoint());
                    this.view.tbxReenterAccountNumber.skin = this.getParsedValue(this._sknErrorTextInput,kony.application.getCurrentBreakpoint());
                    scope.isError = 2;
                  } else {
                    this.view.tbxPayeeName.text = response.beneficiaryName;
                    this.updateContext("tbxPayeeName", this.view.tbxPayeeName.text);
                  }
                }else if(this._recipientFlow == "Domestic" || this._recipientFlow == "International"){
              this.view.flxLookup.setActive(true);
               if(response.isIBANValid === "YES"){
                    this.getSwiftForIBAN();
                  }
                }                     
              }
            }
			}
            else if (response!="" && (!response.beneficiaryName||accNumber== scope.accNumberValidated)){
              this.setErrorFlexVisibility(true);
              this.disableButton();
              this.view.txtErrormessage.text = kony.i18n.getLocalizedString("i18n.payments.validAccountNumber");
              this.view.tbxNewAccountNumber.text = "";
			  this.view.tbxReenterAccountNumber.text = "";
			  this.view.tbxNewAccountNumber.setFocus(true);
              this.view.tbxNewAccountNumber.skin = this.getParsedValue(this._sknErrorTextInput,kony.application.getCurrentBreakpoint());
              this.view.tbxReenterAccountNumber.skin = this.getParsedValue(this._sknErrorTextInput,kony.application.getCurrentBreakpoint());
              scope.isError = 2;
            }
          } else {
            this.setErrorFlexVisibility(true);
            this.disableButton();
            this.view.tbxNewAccountNumber.skin = this.getParsedValue(this._sknErrorTextInput,kony.application.getCurrentBreakpoint());
            this.view.tbxReenterAccountNumber.skin = this.getParsedValue(this._sknErrorTextInput,kony.application.getCurrentBreakpoint());
            this.view.txtErrormessage.text = kony.i18n.getLocalizedString("i18n.UnifiedTransfer.AccountNumberMismatchMessage");
            this.view.tbxNewAccountNumber.text = "";
            this.view.tbxReenterAccountNumber.text = "";
            this.view.tbxNewAccountNumber.setFocus(true);
            scope.isError = 3;
          }
        }
      }
      catch(e)
      {
        var errorObj =
            {
              "errorInfo" : "Error in validating account number" ,
              "errorLevel" : "Component",
              "error": e
            };
        scope.onError(errorObj);
      }
    },
	
	inValidIbanError: function () {
	  this.setErrorFlexVisibility(true);
	  this.disableButton();
	  this.view.tbxNewAccountNumber.skin = this.getParsedValue(this._sknErrorTextInput,kony.application.getCurrentBreakpoint());
      this.view.tbxReenterAccountNumber.skin = this.getParsedValue(this._sknErrorTextInput,kony.application.getCurrentBreakpoint());
      this.view.tbxNewAccountNumber.text = "";
      this.view.tbxReenterAccountNumber.text = "";
      this.view.tbxNewAccountNumber.setFocus(true);
      this.view.txtErrormessage.text = kony.i18n.getLocalizedString("i18n.UnifiedTransfer.InvalidIBANFormatMessage");
    }, 

    /**
     * setDefaultBICSwiftActions
     * Actions related to Swift BIC fields
     * @return : NA
      */

    setDefaultBICSwiftActions : function(){
      var scope = this;
      var inputData;
      try {
        this.context = this.setSwiftLookupContext();
        this.view.flxLookup.onClick = this.actionHandler.bind(this,this.context,this._iflblLookup);
        scope.view.tbxPayeeDetailField1.onKeyUp = function() {
          if(!scope.isEmptyNullUndefined(scope._ifTextBox4.formatType))
            scope.setFrontEndFormatType(scope._ifTextBox4.formatType, scope.view.tbxPayeeDetailField1);
        };
        scope.view.tbxPayeeDetailField1.onBeginEditing = function() {
          scope.view[scope.bankFieldWidgetId].setEnabled(true);
          scope.view[scope.bankFieldWidgetId].skin = scope.getParsedValue(scope.sknFieldValue, kony.application.getCurrentBreakpoint());	
        };
       
        scope.view.tbxPayeeDetailField1.onEndEditing = function() {
          if(!scope.isEmptyNullUndefined(scope.dataContext["BICCode"]) || !scope.isEmptyNullUndefined(scope.view.tbxPayeeDetailField1.text)) {
            scope.minFillValidation("if_txtValue4");
          scope.updateContext("tbxPayeeDetailField1", scope.view.tbxPayeeDetailField1.text);
          scope.getBankNamefromBic();
          }
        };
        scope.view.tbxPayeeDetailField1.onKeyPress=function(eventObject,eventPayload){
          if(eventPayload.keyCode==9){
            if(eventPayload.shiftKey){
              eventPayload.preventDefault();
              scope.view.flxLookup.setActive(true);
            }
            else{
              if(!scope.isEmptyNullUndefined(scope.dataContext["BICCode"]) || !scope.isEmptyNullUndefined(scope.view.tbxPayeeDetailField1.text)) {
                scope.minFillValidation("if_txtValue4");
              scope.updateContext("tbxPayeeDetailField1", scope.view.tbxPayeeDetailField1.text);
              scope.getBankNamefromBic();
              }
            };
          }
      },
        scope.view.tbxPayeeDetailField2.onEndEditing = function() {
          if(!scope.isEmptyNullUndefined(scope.dataContext["clearingCode1"]) || !scope.isEmptyNullUndefined(scope.view.tbxPayeeDetailField2.text))
            scope.minFillValidation("if_txtValue5");
          scope.updateContext("tbxPayeeDetailField2", scope.view.tbxPayeeDetailField2.text);
        };
        scope.view.tbxPayeeDetailField3.onEndEditing = function() {
          if(!scope.isEmptyNullUndefined(scope.dataContext["clearingCode2"]) || !scope.isEmptyNullUndefined(scope.view.tbxPayeeDetailField3.text))
            scope.minFillValidation("if_txtValue6");
          scope.updateContext("tbxPayeeDetailField3", scope.view.tbxPayeeDetailField3.text);
        };
        scope.view.tbxPayeeDetailField4.onEndEditing = function() {
          if(!scope.isEmptyNullUndefined(scope.dataContext["bankName"]) || !scope.isEmptyNullUndefined(scope.view.tbxPayeeDetailField4.text))
            scope.minFillValidation("if_txtValue7");
          scope.updateContext("tbxPayeeDetailField4", scope.view.tbxPayeeDetailField4.text);
        };
        scope.view.tbxPayeeDetailField5.onEndEditing = function() {
          if(!scope.isEmptyNullUndefined(scope.dataContext["streetName"]) || !scope.isEmptyNullUndefined(scope.view.tbxPayeeDetailField5.text))
            scope.minFillValidation("if_txtValue9");
          scope.updateContext("tbxPayeeDetailField5", scope.view.tbxPayeeDetailField5.text);
        };
        scope.view.tbxPayeeDetailField6.onEndEditing = function() {
          if(!scope.isEmptyNullUndefined(scope.dataContext["town"]) || !scope.isEmptyNullUndefined(scope.view.tbxPayeeDetailField6.text))
            scope.minFillValidation("if_txtValue10");
          scope.updateContext("tbxPayeeDetailField6", scope.view.tbxPayeeDetailField6.text);
        };
      }
      catch(e)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setDefaultBICSwiftActions method" ,
              "errorLevel" : "Component",
              "error": e
            };
        scope.onError(errorObj);
      }
    },

    /**
     * setDefaultBICSwiftText
     * Sets the details provided in the contracts for widgets related to Swift BIC fields
     * @return : NA
      */

    setDefaultBICSwiftText : function(){
      try {
        if(this.isEmptyNullUndefined(this._ifsubHeaderTxt.text) && this.isEmptyNullUndefined(this._ifTextBox4Label.text) && this.isEmptyNullUndefined(this._ifTextBox6Label.text) && this.isEmptyNullUndefined(this._ifTextBox7Label.text))
          this.view.flxPayeeDetailFields.setVisibility(false);
        else {
          this.view.flxPayeeDetailFields.setVisibility(true);
        }
        if(this.isEmptyNullUndefined(this._ifsubHeaderTxt.text))
          this.view.flxPayeeDetailFieldInfo.setVisibility(false);
        else {
          this.view.lblPayeeDetailFieldInfo.text = this.getParsedValue(this._ifsubHeaderTxt.text,kony.application.getCurrentBreakpoint());
        }

        if(this.isEmptyNullUndefined(this._ifTextBox4Label.text) && this.isEmptyNullUndefined(this._ifTextBox5Label.text)) 
        {
          this.view.flxPayeeDetailFieldRow1.setVisibility(false);
        }
        else
        {
          if(this.isEmptyNullUndefined(this._ifTextBox4Label.text) || this.isEmptyNullUndefined(this._ifTextBox4.placeHolder))
            this.view.flxField1.setVisibility(false);
          else {
            this.view.lblLookup.text = this.getParsedValue(this._iflblLookup.text,kony.application.getCurrentBreakpoint());
            this.view.lblPayeeDetailField1.text = this.getParsedValue(this._ifTextBox4Label.text,kony.application.getCurrentBreakpoint());
            this.view.tbxPayeeDetailField1.placeholder = this.getParsedValue(this._ifTextBox4.placeHolder,kony.application.getCurrentBreakpoint());
            this.view.tbxPayeeDetailField1.text = "";
            this.mapTextBoxWithContext(this._ifTextBox4.mapping, "tbxPayeeDetailField1"); 
          }
          if(this.isEmptyNullUndefined(this._ifTextBox5Label.text) || this.isEmptyNullUndefined(this._ifTextBox5.placeHolder))
            this.view.flxField2.setVisibility(false);
          else {
            this.checkForSwiftBankName(this._ifTextBox5.mapping, "tbxPayeeDetailField2");
            this.view.lblPayeeDetailField2.text = this.getParsedValue(this._ifTextBox5Label.text,kony.application.getCurrentBreakpoint());
            this.view.tbxPayeeDetailField2.placeholder = this.getParsedValue(this._ifTextBox5.placeHolder,kony.application.getCurrentBreakpoint());
            this.view.tbxPayeeDetailField2.text = "";
            this.mapTextBoxWithContext(this._ifTextBox5.mapping, "tbxPayeeDetailField2"); 
          }
        }


        if(this.isEmptyNullUndefined(this._ifTextBox6Label.text) && this.isEmptyNullUndefined(this._ifTextBox7Label.text)) 
        {
          this.view.flxPayeeDetailFieldRow2.setVisibility(false);
        }
        else
        {
          if(this.isEmptyNullUndefined(this._ifTextBox6Label.text) || this.isEmptyNullUndefined(this._ifTextBox6.placeHolder))
            this.view.flxField3.setVisibility(false);
          else {
            this.checkForSwiftBankName(this._ifTextBox6.mapping, "tbxPayeeDetailField3");
            this.view.lblPayeeDetailField3.text = this.getParsedValue(this._ifTextBox6Label.text,kony.application.getCurrentBreakpoint());
            this.view.tbxPayeeDetailField3.placeholder = this.getParsedValue(this._ifTextBox6.placeHolder,kony.application.getCurrentBreakpoint());
            this.view.tbxPayeeDetailField3.text = "";
            this.mapTextBoxWithContext(this._ifTextBox6.mapping, "tbxPayeeDetailField3"); 
          }
          if(this.isEmptyNullUndefined(this._ifTextBox7Label.text) || this.isEmptyNullUndefined(this._ifTextBox7.placeHolder))
            this.view.flxField4.setVisibility(false);
          else {
            this.checkForSwiftBankName(this._ifTextBox7.mapping, "tbxPayeeDetailField4");
            this.view.lblPayeeDetailField4.text = this.getParsedValue(this._ifTextBox7Label.text,kony.application.getCurrentBreakpoint());     
            this.view.tbxPayeeDetailField4.placeholder = this.getParsedValue(this._ifTextBox7.placeHolder,kony.application.getCurrentBreakpoint());
            this.view.tbxPayeeDetailField4.text = "";
            this.mapTextBoxWithContext(this._ifTextBox7.mapping, "tbxPayeeDetailField4");
          }
        }

        if(this.isEmptyNullUndefined(this._ifTextBox8Label.text) && this.isEmptyNullUndefined(this._ifTextBox9Label.text)) 
        {
          this.view.flxPayeeDetailFieldRow3.setVisibility(false);
        }
        else
        {
          if(this.isEmptyNullUndefined(this._ifTextBox8Label.text) || this.isEmptyNullUndefined(this._ifTextBox8.placeHolder))
            this.view.flxField6.setVisibility(false);
          else {
            this.view.lblPayeeDetailField5.text = this.getParsedValue(this._ifTextBox8Label.text,kony.application.getCurrentBreakpoint());
            this.view.tbxPayeeDetailField5.placeholder = this.getParsedValue(this._ifTextBox8.placeHolder,kony.application.getCurrentBreakpoint());
            this.view.tbxPayeeDetailField5.text = "";
            this.mapTextBoxWithContext(this._ifTextBox8.mapping, "tbxPayeeDetailField5"); 
          }
          if(this.isEmptyNullUndefined(this._ifTextBox9Label.text) || this.isEmptyNullUndefined(this._ifTextBox9.placeHolder))
            this.view.flxField7.setVisibility(false);
          else {
            //this.checkForSwiftBankName(this._ifTextBox9.mapping, "tbxPayeeDetailField6");
            this.view.lblPayeeDetailField6.text = this.getParsedValue(this._ifTextBox9Label.text,kony.application.getCurrentBreakpoint());
            this.view.tbxPayeeDetailField6.placeholder = this.getParsedValue(this._ifTextBox9.placeHolder,kony.application.getCurrentBreakpoint());
            this.view.tbxPayeeDetailField6.text = "";
            this.mapTextBoxWithContext(this._ifTextBox9.mapping, "tbxPayeeDetailField6"); 
          }
        }

        if((this.isEmptyNullUndefined(this._bankCountryValue.mapping) || this.isEmptyNullUndefined(this._bankCountryValue.placeHolder)))
       this.view.flxField8.setVisibility(false);
     else {
       this.view.lblCountryField6.text = this.getParsedValue(this._countryLabel.text, kony.application.getCurrentBreakpoint());
       this.view.lbxCountryField6.placeholder = this.getParsedValue(this._bankCountryValue.placeHolder, kony.application.getCurrentBreakpoint());
       this.mapTextBoxWithContext(this._bankCountryValue.mapping, "lbxCountryField6");
     }
      }
      catch(e)
      {
        var errorObj =
            {
              "errorInfo" : "Error while setting SWIFT BIC details" ,
              "errorLevel" : "Business",
              "error": e
            };
        self.onError(errorObj);
      }
    },

    /**
     * setDefaultBICSwiftSkins
     * Sets the skins provided in the contracts for widgets related to SWIFT Lookup
     * @return : NA
     */
    setDefaultBICSwiftSkins : function(){
      try{
        this.view.flxPayeeDetailFields.skin = this.getParsedValue(this._sknMandatoryTextBox,kony.application.getCurrentBreakpoint());
        this.view.lblLookup.skin = this.getParsedValue(this._sknSelectLabel,kony.application.getCurrentBreakpoint());
        this.view.lblPayeeDetailFieldInfo.skin = this.getParsedValue(this._sknPayeeDetailInfoText,kony.application.getCurrentBreakpoint());

        this.view.lblPayeeDetailField1.skin = this.getParsedValue(this._sknFieldLabel,kony.application.getCurrentBreakpoint());
        this.view.lblPayeeDetailField2.skin = this.getParsedValue(this._sknFieldLabel,kony.application.getCurrentBreakpoint());
        this.view.lblPayeeDetailField3.skin = this.getParsedValue(this._sknFieldLabel,kony.application.getCurrentBreakpoint());
        this.view.lblPayeeDetailField4.skin = this.getParsedValue(this._sknFieldLabel,kony.application.getCurrentBreakpoint());

        this.view.tbxPayeeDetailField1.placeholderSkin = this.getParsedValue(this._sknTextBoxPlaceholder,kony.application.getCurrentBreakpoint());
        this.view.tbxPayeeDetailField2.placeholderSkin = this.getParsedValue(this._sknTextBoxPlaceholder,kony.application.getCurrentBreakpoint());
        this.view.tbxPayeeDetailField3.placeholderSkin = this.getParsedValue(this._sknTextBoxPlaceholder,kony.application.getCurrentBreakpoint());
        this.view.tbxPayeeDetailField4.placeholderSkin = this.getParsedValue(this._sknTextBoxPlaceholder,kony.application.getCurrentBreakpoint());
        this.view.tbxPayeeDetailField5.placeholderSkin = this.getParsedValue(this._sknTextBoxPlaceholder,kony.application.getCurrentBreakpoint());
        this.view.tbxPayeeDetailField6.placeholderSkin = this.getParsedValue(this._sknTextBoxPlaceholder,kony.application.getCurrentBreakpoint());
        this.view.lbxCountryField6.skin="ICSknlbxSSPR72727215px";
        this.view.lbxCountryField6.placeholderSkin = this.getParsedValue(this._sknTextBoxPlaceholder, kony.application.getCurrentBreakpoint());
      }
      catch(e)
      {
        var errorObj =
            {
              "errorInfo" : "Error while setting skins of SWIFT BIC details" ,
              "errorLevel" : "Business",
              "error": e
            };
        self.onError(errorObj);
      }
    },

    /**
     * setSwiftLookupContext
     * @api : setSwiftLookupContext
     * sets swift lookup context
     * @return : NA
     */
    setSwiftLookupContext: function() {
      var params  = {
        "BREAKPTS" : JSON.stringify(this._BREAKPTS),
        "swiftLookupDescription" : JSON.stringify(this._sluDescription),
        "swiftLookupHeader" : JSON.stringify(this._sluHeader),
        "searchField1Label" : JSON.stringify(this._sluTextBox1Label),
        "searchField1Value" : JSON.stringify(this._sluTextBox1),
        "searchField2Label" : JSON.stringify(this._sluTextBox2Label),
        "searchField2Value" : JSON.stringify(this._sluTextBox2),
        "searchField3Label" : JSON.stringify(this._sluTextBox3Label),
        "searchField3Value" : JSON.stringify(this._sluTextBox3),
        "searchField4Label" : JSON.stringify(this._sluTextBox4Label),
        "searchField4Value" : JSON.stringify(this._sluTextBox4),
        "lblColumn1" : JSON.stringify(this._sluResultItemLabel1),
        "lblColumn2" : JSON.stringify(this._sluResultItemLabel2),
        "lblColumn1Value" : JSON.stringify(this._sluResultItem1),
        "lblColumn2Value" : JSON.stringify(this._sluResultItem2),
        "lblColumn3Value" : JSON.stringify(this._sluResultItem3),
        "btnSearch" : JSON.stringify(this._sluCTAButton),
        "sknSelectLabel" : "",
        "emptyResponseMessage" : JSON.stringify(this._sluEmptySearchResult),
        "lookupServiceName" : this._lookupServiceName,
        "lookupObjectName" : this._lookupObjectName,
        "lookupOperationName" : this._lookupOperationName,
        "cacheEnabled" : this._cacheEnabled,
        //   "lookupCriteria" : this._lookupCriteria,
        "lookupIdentifier" : this._lookupServiceResponse,
        "infoIcon" : JSON.stringify(this._payeeInfoIcon),
        "txtBoxSkn" : JSON.stringify(this._sknFieldValueLookUp),
        "txtBoxMandatorySkn" : "",
        "fieldValueSkn" : JSON.stringify(this._sknFieldReadOnlyValue),
        "fieldLabelSkn" : JSON.stringify(this._sknFieldLabel)
      };
      return params;

    },

    /**
     * setLookupData
     * @api : setLookupData
     * sets swift look up data
     * @return : NA
     */
    setLookupData : function(selectedSwiftData){
      var scope = this;
      this.dataContext["BICCode"] = selectedSwiftData[0].bic.text;
      this.dataContext["bankName"] = selectedSwiftData[0].bankName;
      this.parserUtilsManager.setContext(this.dataContext);    
      this.setBICSwiftData();
      scope.view[this.bankFieldWidgetId].setEnabled(false);
      scope.view[this.bankFieldWidgetId].skin = this.getParsedValue(this._sknTextBoxDisabled, kony.application.getCurrentBreakpoint());	
    },

    checkForSwiftBankName : function(mapping, widget)
    {
      var mappingValue = mapping.substring(5, mapping.length-1);
      if(mappingValue === "bankName")
      {
        this.bankFieldWidgetId = widget;
      }
    },
    /**
     * getSwiftFromIBAN
     * @api : getSwiftFromIBAN
     * get Swift code for IBAN
     * @return : NA
     */
    getSwiftForIBAN: function() {
      var self = this;
      var objSvcName = this.getParsedValue(this._IBANSwiftObjectServiceName);
      var objName = this.getParsedValue(this._IBANSwiftObjectName);
      var operationName = this.getParsedValue(this._IBANSwiftOperationName);
      var criteria = this.getCriteria(JSON.stringify(this._IBANSwiftCriteria));
	  if (!criteria["countryCode"]) criteria["countryCode"] = criteria["iban"].slice(0, 2);
      var identifier = this.getParsedValue(this._IBANSwiftResponseIdentifier);
      this.unifiedTransferDAO.getSwiftCode
      (objSvcName,objName,operationName,criteria,this.setSwiftCodeBankName,this.setSwiftCodeBankName);
    },

     /**
     * getBankNamefromBic
     * @api : getBankNamefromBic
     * set Bank Name returned from api to context
     * @return : NA
     */
    getBankNamefromBic: function() {
      var self = this;
      var objSvcName = this.getParsedValue(this._bankDetailsServiceName);
      var objName = this.getParsedValue(this._bankDetailsObjectName);
      var operationName = this.getParsedValue(this._bankDetailsOperationName);
      var criteria = this.getCriteria(JSON.stringify(this._bankDetailsCriteria));
      this.unifiedTransferDAO.getBankNamefromBic
      (objSvcName,objName,operationName,criteria,this.setBankNamefromBic,this.setBankNamefromBic);
    },

    
    /**
     * setSwiftCodeForNewPayee
     * @api : setSwiftCodeForNewPayee
     * set swift code returned from api to context
     * @return : NA
     */
    setSwiftCodeBankName: function(response) {
      var self = this;
      try{
        var BIC= response[this.getParsedValue(this._IBANBICId)];
        if(!this.isEmptyNullUndefined(BIC)){
          this.dataContext["BICCode"] = BIC;
        }
        var bankName = response[this.getParsedValue(this._IBANBankNameId)];
        if(!this.isEmptyNullUndefined(bankName)){
          this.dataContext["bankName"] = bankName;
        }
        this.parserUtilsManager.setContext(this.dataContext);
        this.setBICSwiftData();
        kony.application.dismissLoadingScreen();
        this.view.tbxPayeeDetailField2.setActive(true);
      }
      catch(e)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting BIC and bank name for IBAN" ,
              "errorLevel" : "Component",
              "error": e
            };
        self.onError(errorObj);
      }
    },
    
     /**
     * setSwiftCodeForNewPayee
     * @api : setSwiftCodeForNewPayee
     * set swift code returned from api to context
     * @return : NA
     */
     setBankNamefromBic: function(response) {
      var self = this;
      try{
        var bankName = response[this.getParsedValue(this._IBANBankNameId)];
        this.dataContext["bankName"] = bankName;
        this.dataContext["ibanBankName"] = bankName;
        if (bankName.length > 105) {
          bankName = bankName.substr(0, 104) + "....";
          this.dataContext["ibanBankName"] = bankName;
        }
        this.parserUtilsManager.setContext(this.dataContext);
        this.setBICSwiftData();
        if (response.isBICValid === "YES" && !this.isEmptyNullUndefined(bankName)) {
          this.view["tbxPayeeDetailField4"].setEnabled(false);
          this.view["tbxPayeeDetailField4"].skin = "ICSknTbxDisabledSSPreg42424215px";
        } else {
          this.view["tbxPayeeDetailField4"].setEnabled(true);
          this.view["tbxPayeeDetailField4"].skin = "ICSknTextBoxSSPR42424215px";
        }
        kony.application.dismissLoadingScreen();
        this.view.tbxPayeeDetailField2.setActive(true);
      }
      catch(e)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting BIC and bank name for IBAN" ,
              "errorLevel" : "Component",
              "error": e
            };
        self.onError(errorObj);
        kony.application.dismissLoadingScreen();
      }
    },
    /**
     * @api : updateContext
     * updates context.
     * @return : NA
     */
    updateContext: function(key, value) {
      var self = this;
      try {
        this.dataContext[this.textInputsMapping[key]] = value;
        this.parserUtilsManager.setContext(this.dataContext);																   
      }
      catch(e)
      {
        var errorObj =
            {
              "errorInfo" : "Error in updating context" ,
              "errorLevel" : "Component",
              "error": e
            };
        self.onError(errorObj);
      }
    },

    /**
     * @api : getCriteria
     * Parse the criteria based on accountType.
     * @param : criteria {JSON} - value collected from exposed contract
     * @return : {JSONObject} - jsonvalue for criteria
     */
    getCriteria: function(criteria) {
      var criteriaJSON;
      if(Object.keys(criteria).length === 0 && criteria.constructor === Object) {
        criteriaJSON = criteria;
      } else {
        criteriaJSON = JSON.parse(criteria);
      }
      for(var key in  criteriaJSON){
        var key1="";
        if(key.indexOf("{$") > -1){
          key1=this.parserUtilsManager.getParsedValue(key);
        }
        criteriaJSON[key] = this.parserUtilsManager.getParsedValue(criteriaJSON[key]);
        if(key.indexOf("{$") > -1){
          delete criteriaJSON[key];
        }
      }
      return criteriaJSON;
    },

    /**
     * setDefaultCTAActions
     * @api : setDefaultCTAActions
     * sets button actions based on contract config
     * @return : NA
     */
    setDefaultCTAActions: function() {
      var self = this;
      try {
        this.view.btnCancel.onClick =  this.actionHandler.bind(this,this.context,this._utfCTAbutton1);
        this.view.btnContinue.onClick = this.performDataValidation.bind(this);
      }
      catch(err) {
        var errorObj =
            {
              "errorInfo" : "Error in setDefaultCTAActions method" ,
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },

    /**actionHandle
     * actionHandler
     * @api : actionHandler
     * Method to get button value from contract and pass level,context and method name accortingly
     * @return : NA
     */
    actionHandler: function(context,propertyValue){
      var self = this;
      try {
        if(propertyValue!==null && propertyValue !== undefined){        
          if (typeof(propertyValue) !== "string") {
            propertyValue = propertyValue.hasOwnProperty("action") ? propertyValue["action"] : propertyValue;
          }  
          var actionJSON = propertyValue;
          var level = actionJSON.level;  
          var callBackMethod = actionJSON.callBack;
          this.invokeMethodBasedOnLevel(level,callBackMethod,context);
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in actionHandler method" ,
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },

    /**
     * invokeMethodBasedOnLevel
     * @api : invokeMethodBasedOnLevel
     * Navigate to form or component based on levelInstance
     * @return : NA
     */
    invokeMethodBasedOnLevel: function(levelInstance, callBackMethod, context){   
      var self = this;
      try {
        if(levelInstance.toLowerCase().trim() === "form")
        {  
          this.formScope[callBackMethod](context);
        }
        if(levelInstance.toLowerCase().trim() === "component")
        {
          this[callBackMethod](context);
        } 
      }
      catch(err) {
        var errorObj =
            {
              "errorInfo" : "Error in getInstanceAction method",
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }    
    },

    /**
     * showCancelPopup
     * @api : showCancelPopup
     * displays cancel popup
     * @return : NA
     */
    showCancelPopup: function() {
      var scope = this;
      var form = kony.application.getCurrentForm();
      var popupObj = this.view.flxPopup.clone();
      popupObj.isModalContainer = true;
      popupObj.flxClosePopup.isModalContainer = true;
      form.add(popupObj);
      popupObj.isVisible = true;
      popupObj.top = "0dp";
      popupObj.left = "0dp";
      if (!(kony.application.getCurrentBreakpoint() === 640)) {
      popupObj.height = "100%";
      popupObj.flxClosePopup.centerY = "50%";
      }
      var scope = this;
      popupObj.flxClosePopup.doLayout=CommonUtilities.centerPopupFlex;
      popupObj.flxClosePopup.btnCancelNo.onClick = function() {
        popupObj.isModalContainer = false;
        popupObj.flxClosePopup.isModalContainer = false;
        form.remove(popupObj);
        scope.cancelButtonFocus();
      };
      popupObj.flxClosePopup.flxClose.onClick = function() {
        popupObj.isModalContainer = false;
        popupObj.flxClosePopup.isModalContainer = false;
        form.remove(popupObj);
        scope.cancelButtonFocus();
      };
      popupObj.flxClosePopup.onKeyPress = function(eventObject,eventPayload){
        if(eventPayload.keyCode===27){
        popupObj.isModalContainer = false;
        popupObj.flxClosePopup.isModalContainer = false;
        form.remove(popupObj);
        scope.cancelButtonFocus();
        }
      }
      popupObj.flxClosePopup.btnCancelYes.onClick = function() {
        popupObj.isModalContainer = false;
        popupObj.flxClosePopup.isModalContainer = false;
        form.remove(popupObj);
        scope.actionHandler(scope.context, scope._utfButtonYes);
      };
      popupObj.flxClosePopup.imgClose.width="30dp";
      popupObj.flxClosePopup.imgClose.height="30dp";
      popupObj.flxClosePopup.flxClose.accessibilityConfig = {
        a11yLabel: "Close this cancel dialog",
        a11yARIA: {
          tabindex: 0,
          role: "button"
        }
      };
      popupObj.flxClosePopup.btnCancelYes.accessibilityConfig = {
        a11yLabel: "Yes, cancel this process",
        a11yARIA: {
          tabindex: 0,
          role: "button"
        }
      };
      popupObj.flxClosePopup.btnCancelNo.accessibilityConfig = {
        a11yLabel: "No, don't cancel this process",
        a11yARIA: {
          tabindex: 0,
          role: "button"
        }
      };
      this.view.forceLayout();
      popupObj.lblClose.setActive(true);
    },
    cancelButtonFocus: function() {
      this.view.btnCancel.setFocus(true);
    },
    /**
     * onClickEmailRadioButton
     * @api : onClickEmailRadioButton
     * gets invoked on click of email radio button
     * @return : NA
     */
    onClickEmailRadioButton: function() {
      var self = this;
      try {
        self.view.flxErrorWarning.setVisibility(false);
        self.view.tbxEmailAddress.skin = self.getParsedValue(self._sknFieldValue, kony.application.getCurrentBreakpoint());
        if(this.view.tbxCountryCode.isVisible) {
          this.view.tbxCountryCode.text = "";
          self.updateContext("tbxCountryCode", self.view.tbxCountryCode.text);
        }
        if(this.view.tbxMobileNumber.isVisible) {
          this.view.tbxMobileNumber.text = "";
          self.updateContext("tbxMobileNumber", self.view.tbxMobileNumber.text);
          self.dataContext["phoneNumber"] = "";
          self.dataContext["phoneNumberData"] = "";
        }
        if(this.view.tbxNationalId.isVisible) {
          this.view.tbxNationalId.text = "";
          self.updateContext("tbxNationalId", self.view.tbxNationalId.text);
          self.dataContext["nationalID"] = "";
        }
        this.disableButton();
        this.view.lblRadioButton2.text = this.getParsedValue(this._sknRadioSelected.text);
        this.view.lblRadioButton2.skin = this.getParsedValue(this._sknRadioSelected.skin, kony.application.getCurrentBreakpoint());
        this.view.flxEmailAddress.setVisibility(true);
        this.view.lblRadioButton1.text = this.getParsedValue(this._sknRadioUnselected.text);
        this.view.lblRadioButton1.skin = this.getParsedValue(this._sknRadioUnselected.skin, kony.application.getCurrentBreakpoint());
        this.view.flxMobileNumber.setVisibility(false);
        this.view.lblRadioButton3.text = this.getParsedValue(this._sknRadioUnselected.text);
        this.view.lblRadioButton3.skin = this.getParsedValue(this._sknRadioUnselected.skin, kony.application.getCurrentBreakpoint());
        this.view.flxNationalId.setVisibility(false);
        this.view.flxRadioButton1.accessibilityConfig={
          a11yARIA : {
          "tabindex": 0,
          "role": "radio",
          "aria-checked": false,
          "aria-labelledby": "lblRadioValue1"
          }
      };
      this.view.flxRadioButton2.accessibilityConfig={
        a11yARIA : {
        "tabindex": 0,
        "role": "radio",
        "aria-checked": true,
        "aria-labelledby": "lblRadioValue2"
        }
    };
    this.view.flxRadioButton3.accessibilityConfig={
      a11yARIA : {
      "tabindex": 0,
      "role": "radio",
      "aria-checked": false,
      "aria-labelledby": "lblRadioValue3"
      }
  };
  this.view.flxRadioButton2.setActive(true);
      }
      catch(e)
      {
        var errorObj =
            {
              "errorInfo" : "Error in onClickEmailRadioButton method" ,
              "errorLevel" : "Component",
              "error": e
            };
        self.onError(errorObj);
      }
    },

    /**
     * onClickPhoneRadioButton
     * @api : onClickPhoneRadioButton
     * gets invoked on click of phone radio button
     * @return : NA
     */
    onClickPhoneRadioButton: function() {
      var self = this;
      try {
        self.view.flxErrorWarning.setVisibility(false);
        self.view.tbxMobileNumber.skin = self.getParsedValue(self._sknFieldValue, kony.application.getCurrentBreakpoint());
        if(this.view.tbxEmailAddress.isVisible) {
          this.view.tbxEmailAddress.text = "";
          self.updateContext("tbxEmailAddress", self.view.tbxEmailAddress.text);
        }
        if(this.view.tbxNationalId.isVisible) {
          this.view.tbxNationalId.text = "";
          self.updateContext("tbxNationalId", self.view.tbxNationalId.text);
          self.dataContext["nationalID"] = "";
        }
        this.disableButton();
        this.view.lblRadioButton1.text = this.getParsedValue(this._sknRadioSelected.text);
        this.view.lblRadioButton1.skin = this.getParsedValue(this._sknRadioSelected.skin, kony.application.getCurrentBreakpoint());
        this.view.flxMobileNumber.setVisibility(true);
        this.view.lblRadioButton2.text = this.getParsedValue(this._sknRadioUnselected.text);
        this.view.lblRadioButton2.skin = this.getParsedValue(this._sknRadioUnselected.skin, kony.application.getCurrentBreakpoint());
        this.view.flxEmailAddress.setVisibility(false);
        this.view.lblRadioButton3.text = this.getParsedValue(this._sknRadioUnselected.text);
        this.view.lblRadioButton3.skin = this.getParsedValue(this._sknRadioUnselected.skin, kony.application.getCurrentBreakpoint());
        this.view.flxNationalId.setVisibility(false);
        this.view.flxRadioButton1.accessibilityConfig={
          a11yARIA : {
          "tabindex": 0,
          "role": "radio",
          "aria-checked": true,
          "aria-labelledby": "lblRadioValue1"
          }
      };
      this.view.flxRadioButton2.accessibilityConfig={
        a11yARIA : {
        "tabindex": 0,
        "role": "radio",
        "aria-checked": false,
        "aria-labelledby": "lblRadioValue2"
        }
    };
    this.view.flxRadioButton3.accessibilityConfig={
      a11yARIA : {
      "tabindex": 0,
      "role": "radio",
      "aria-checked": false,
      "aria-labelledby": "lblRadioValue3"
      }
  };
  this.view.flxRadioButton1.setActive(true);
      }
      catch(e)
      {
        var errorObj =
            {
              "errorInfo" : "Error in onClickPhoneRadioButton method" ,
              "errorLevel" : "Component",
              "error": e
            };
        self.onError(errorObj);
      }
    },

    /**
     * onClickNationalIdRadioButton
     * @api : onClickNationalIdRadioButton
     * gets invoked on click of email national id button
     * @return : NA
     */
    onClickNationalIdRadioButton: function() {
      var self = this;
      try {
        self.view.flxErrorWarning.setVisibility(false);
        self.view.tbxNationalId.skin = self.getParsedValue(self._sknFieldValue, kony.application.getCurrentBreakpoint());
        if(this.view.tbxCountryCode.isVisible) {
          this.view.tbxCountryCode.text = "";
          self.updateContext("tbxCountryCode", self.view.tbxCountryCode.text);
        }
        if(this.view.tbxMobileNumber.isVisible) {
          this.view.tbxMobileNumber.text = "";
          self.updateContext("tbxMobileNumber", self.view.tbxMobileNumber.text);
          self.dataContext["phoneNumber"] = "";
          self.dataContext["phoneNumberData"] = "";
        }
        if(this.view.tbxEmailAddress.isVisible) {
          this.view.tbxEmailAddress.text = "";
          self.updateContext("tbxEmailAddress", self.view.tbxEmailAddress.text);
        }
        this.disableButton();
        this.view.lblRadioButton3.text = this.getParsedValue(this._sknRadioSelected.text);
        this.view.lblRadioButton3.skin = this.getParsedValue(this._sknRadioSelected.skin, kony.application.getCurrentBreakpoint());
        this.view.flxNationalId.setVisibility(true);
        this.view.lblRadioButton1.text = this.getParsedValue(this._sknRadioUnselected.text);
        this.view.lblRadioButton1.skin = this.getParsedValue(this._sknRadioUnselected.skin, kony.application.getCurrentBreakpoint());
        this.view.flxMobileNumber.setVisibility(false);
        this.view.lblRadioButton2.text = this.getParsedValue(this._sknRadioUnselected.text);
        this.view.lblRadioButton2.skin = this.getParsedValue(this._sknRadioUnselected.skin, kony.application.getCurrentBreakpoint());
        this.view.flxEmailAddress.setVisibility(false);
        this.view.flxRadioButton1.accessibilityConfig={
          a11yARIA : {
          "tabindex": 0,
          "role": "radio",
          "aria-checked": false,
          "aria-labelledby": "lblRadioValue1"
          }
      };
      this.view.flxRadioButton2.accessibilityConfig={
        a11yARIA : {
        "tabindex": 0,
        "role": "radio",
        "aria-checked": false,
        "aria-labelledby": "lblRadioValue2"
        }
    };
    this.view.flxRadioButton3.accessibilityConfig={
      a11yARIA : {
      "tabindex": 0,
      "role": "radio",
      "aria-checked": true,
      "aria-labelledby": "lblRadioValue3"
      }
  };
  this.view.flxRadioButton3.setActive(true);
      }
      catch(e)
      {
        var errorObj =
            {
              "errorInfo" : "Error in onClickNationalIdRadioButton method" ,
              "errorLevel" : "Component",
              "error": e
            };
        self.onError(errorObj);
      }
    },

    /**
     * disableContactTypeRadioButtons
     * @api : disableContactTypeRadioButtons
     * disables the radio buttons of contact type
     * @return : NA
     */
    disableContactTypeRadioButtons: function() {
      var self = this;
      try {
        this.view.lblRadioButton1.text = this.getParsedValue(this._sknRadioUnselected.text);
        this.view.lblRadioButton1.skin = this.getParsedValue(this._sknRadioUnselected.skin, kony.application.getCurrentBreakpoint());
        this.view.flxMobileNumber.setVisibility(false);
        this.view.lblRadioButton2.text = this.getParsedValue(this._sknRadioUnselected.text);
        this.view.lblRadioButton2.skin = this.getParsedValue(this._sknRadioUnselected.skin, kony.application.getCurrentBreakpoint());
        this.view.flxEmailAddress.setVisibility(false);
        this.view.lblRadioButton3.text = this.getParsedValue(this._sknRadioUnselected.text);
        this.view.lblRadioButton3.skin = this.getParsedValue(this._sknRadioUnselected.skin, kony.application.getCurrentBreakpoint());
        this.view.flxNationalId.setVisibility(false);
      }
      catch(e)
      {
        var errorObj =
            {
              "errorInfo" : "Error in disableContactTypeRadioButtons method" ,
              "errorLevel" : "Component",
              "error": e
            };
        self.onError(errorObj);
      }
    },

    /**
     * setDefaultContactDetailsActions
     * @api : setDefaultContactDetailsActions
     * sets default contact details actions
     * @return : NA
     */
    setDefaultContactDetailsActions: function() {
      var scope = this;
      var object = this.getParsedValue(this._jsonObjName);
      var tmpMinConfig = this.getParsedValue(this._minFillMapping);
      var tmpMaxConfig = this.getParsedValue(this._maxFillMapping);
      var minConfig = this.getParsedValue(this._minFillMapping); 
      var maxConfig = this.getParsedValue(this._maxFillMapping);
      var inputData;
      try {
        scope.view.flxRadioButton1.onClick = scope.onClickPhoneRadioButton;
        scope.view.flxRadioButton2.onClick = scope.onClickEmailRadioButton;
        scope.view.flxRadioButton3.onClick = scope.onClickNationalIdRadioButton;
        scope.view.tbxCountryCode.onTextChange = function() {
          scope.view.flxCountryCodes.setVisibility(true);

          scope.isContactDetailsSegVisible = false;
          scope.onSearchCountryCode("p2p");
        }
        this.view.segCountryCodeList.onRowClick = this.getContextFromSegment.bind(this, "p2p");
        if(this.getParsedValue(this._ctOption1.optionSelected) === true && this.getParsedValue(this._ctOption2.optionSelected) === false && this.getParsedValue(this._ctOption3.optionSelected) === false) {
          this.onClickPhoneRadioButton();
        }
        else if(this.getParsedValue(this._ctOption1.optionSelected) === false && this.getParsedValue(this._ctOption2.optionSelected) === true && this.getParsedValue(this._ctOption3.optionSelected) === false) {
          this.onClickEmailRadioButton();
        }
        else if(this.getParsedValue(this._ctOption1.optionSelected) === false && this.getParsedValue(this._ctOption2.optionSelected) === false && this.getParsedValue(this._ctOption3.optionSelected) === true) {
          this.onClickNationalIdRadioButton();
        }
        else {
          this.disableContactTypeRadioButtons();
        }
        scope.view.tbxCountryCode.onEndEditing = function() {
          scope.updateContext("tbxCountryCode", scope.view.tbxCountryCode.text);
          scope.minFillValidation();
        };
        scope.view.tbxMobileNumber.onEndEditing = function() {
          minConfig = tmpMinConfig;
          maxConfig = tmpMaxConfig;
          for(var i in minConfig[object]) {
            if((i.startsWith("ct")) && (i !== "ct_txtValue2")) {
              delete minConfig[object][i];
            }}
          for(var i in maxConfig[object]) {
            if((i.startsWith("ct")) && (i !== "ct_txtValue2")) {
              delete maxConfig[object][i];
            }}
          if(!scope.isEmptyNullUndefined(scope.dataContext["displayPhoneNumber"]) || !scope.isEmptyNullUndefined(scope.view.tbxMobileNumber.text))
            scope.minFillValidation("ct_txtValue2", minConfig, maxConfig);
          scope.updateContext("tbxMobileNumber", scope.view.tbxMobileNumber.text);
          scope.dataContext["phoneNumber"] = scope.getDeformattedPhoneNumber(scope.view.tbxMobileNumber.text);
        };
        scope.view.tbxEmailAddress.onEndEditing = function() {
          minConfig = tmpMinConfig;
          maxConfig = tmpMaxConfig;
          for(var i in minConfig[object]) {
            if((i.startsWith("ct")) && (i !== "ct_txtValue3")) {
              delete minConfig[object][i];
            }}
          for(var i in maxConfig[object]) {
            if((i.startsWith("ct")) && (i !== "ct_txtValue3")) {
              delete maxConfig[object][i];
            }}
          if(!scope.isEmptyNullUndefined(scope._ctTextBox3.formatType))
            scope.setFrontEndFormatType(scope._ctTextBox3.formatType, scope.view.tbxEmailAddress);
          //commented as per the suggestions of yogish
          // if(!scope.isEmptyNullUndefined(scope.dataContext["emailID"]) || !scope.isEmptyNullUndefined(scope.view.tbxEmailAddress.text))
          //   scope.minFillValidation("ct_txtValue3", minConfig, maxConfig);
          scope.updateContext("tbxEmailAddress", scope.view.tbxEmailAddress.text); 
        };
        scope.view.tbxNationalId.onEndEditing = function() {
          minConfig = tmpMinConfig;
          maxConfig = tmpMaxConfig;
          for(var i in minConfig[object]) {
            if((i.startsWith("ct")) && (i !== "ct_txtValue4")) {
              delete minConfig[object][i];
            }}
          for(var i in maxConfig[object]) {
            if((i.startsWith("ct")) && (i !== "ct_txtValue4")) {
              delete maxConfig[object][i];
            }}
          if(!scope.isEmptyNullUndefined(scope.dataContext["displayNationalId"]) || !scope.isEmptyNullUndefined(scope.view.tbxNationalId.text))
            scope.minFillValidation("ct_txtValue4", minConfig, maxConfig);
          scope.updateContext("tbxNationalId", scope.view.tbxNationalId.text);
          scope.dataContext["nationalID"] = scope.getDeformattedNationalId(scope.view.tbxNationalId.text);
        };
        if(!this.isEmptyNullUndefined(this._ctTextBox2.formatType))
          this.view.tbxMobileNumber.onKeyUp = this.setFrontEndFormatType.bind(this, this._ctTextBox2.formatType, this.view.tbxMobileNumber);
        if(!this.isEmptyNullUndefined(this._ctTextBox4.formatType))
          this.view.tbxNationalId.onKeyUp = this.setFrontEndFormatType.bind(this, this._ctTextBox4.formatType, this.view.tbxNationalId);        
        scope.view.tbxCountryCode.onKeyUp = function() {
          if(scope.view.tbxCountryCode.text === "")
            scope.view.flxCountryCodes.setVisibility(false);
        };
      } 
      catch(e)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setDefaultContactDetailsActions method" ,
              "errorLevel" : "Component",
              "error": e
            };
        scope.onError(errorObj);
      }
    },

    /**
     * setDefaultContactTypeDetails
     * @api : setDefaultContactTypeDetails
     * sets default contact details and types of contacts
     * @return : NA
     */
    setDefaultContactTypeDetails: function() {
      var self = this;
      try{
        if(this.isEmptyNullUndefined(this._ctlblContactType.text))
          this.view.flxContactType.setVisibility(false);
        else
          this.view.lblContactType.text = this.getParsedValue(this._ctlblContactType.text, kony.application.getCurrentBreakpoint())+":";

        if(this.isEmptyNullUndefined(this._ctOption1.optionValue))
          this.view.flxRadioButton1.setVisibility(false);
        else
          this.view.lblRadioValue1.text = this.getParsedValue(this._ctOption1.optionValue, kony.application.getCurrentBreakpoint());      

        if(this.isEmptyNullUndefined(this._ctOption2.optionValue))
          this.view.flxRadioButton2.setVisibility(false);
        else
          this.view.lblRadioValue2.text = this.getParsedValue(this._ctOption2.optionValue, kony.application.getCurrentBreakpoint());         

        if(this.isEmptyNullUndefined(this._ctOption3.optionValue))
          this.view.flxRadioButton3.setVisibility(false);
        else
          this.view.lblRadioValue3.text = this.getParsedValue(this._ctOption3.optionValue, kony.application.getCurrentBreakpoint());      

        if(this.isEmptyNullUndefined(this._ctLabel1.text) || this.isEmptyNullUndefined(this._ctTextBox2.placeHolder))
          this.view.flxMobileNumber.setVisibility(false);
        else {
          this.view.lblMobileNumber.text = this.getParsedValue(this._ctLabel1.text, kony.application.getCurrentBreakpoint());
          if(this.isEmptyNullUndefined(this._ctTextBox1.placeHolder)) {
            this.view.flxCountryCodeParent.setVisibility(false);
            this.view.flxMobileNumberParent.left = "0dp";
            this.view.flxMobileNumberParent.width = "100%";
          }
          else {
            this.view.tbxCountryCode.placeholder = this.getParsedValue(this._ctTextBox1.placeHolder,kony.application.getCurrentBreakpoint());
            this.view.tbxCountryCode.text = "";
            this.mapTextBoxWithContext(this._ctTextBox1.mapping, "tbxCountryCode");  
            this.setInputMode(this._ctTextBox1.inputMode, "tbxCountryCode");
          }
          this.view.tbxMobileNumber.placeholder = this.getParsedValue(this._ctTextBox2.placeHolder,kony.application.getCurrentBreakpoint());
          this.view.tbxMobileNumber.text = "";
          this.mapTextBoxWithContext(this._ctTextBox2.mapping, "tbxMobileNumber");
          this.setInputMode(this._ctTextBox2.inputMode, "tbxMobileNumber");
        }

        if(this.isEmptyNullUndefined(this._ctLabel2.text) || this.isEmptyNullUndefined(this._ctTextBox3.placeHolder))
          this.view.flxEmailAddress.setVisibility(false);
        else {
          this.view.lblEmailAddress.text = this.getParsedValue(this._ctLabel2.text, kony.application.getCurrentBreakpoint());  
          this.view.tbxEmailAddress.placeholder = this.getParsedValue(this._ctTextBox3.placeHolder,kony.application.getCurrentBreakpoint());
          this.view.tbxEmailAddress.text = "";
          this.mapTextBoxWithContext(this._ctTextBox3.mapping, "tbxEmailAddress");
          this.setInputMode(this._ctTextBox3.inputMode, "tbxEmailAddress");
        } 
        if(this.isEmptyNullUndefined(this._ctLabel3.text) || this.isEmptyNullUndefined(this._ctTextBox4.placeHolder))
          this.view.flxNationalId.setVisibility(false);
        else {
          this.view.lblNationalId.text = this.getParsedValue(this._ctLabel3.text, kony.application.getCurrentBreakpoint());      
          this.view.tbxNationalId.placeholder = this.getParsedValue(this._ctTextBox4.placeHolder,kony.application.getCurrentBreakpoint());
          this.view.tbxNationalId.text = "";
          this.mapTextBoxWithContext(this._ctTextBox4.mapping, "tbxNationalId");
          this.setInputMode(this._ctTextBox4.inputMode, "tbxNationalId");
        }         
        this.view.lblRadioButton1.text = this.getParsedValue(this._sknRadioUnselected.text);        
        this.view.lblRadioButton2.text = this.getParsedValue(this._sknRadioUnselected.text);
        this.view.lblRadioButton3.text = this.getParsedValue(this._sknRadioUnselected.text);
      }
      catch(e)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setDefaultContactTypeDetails method" ,
              "errorLevel" : "Component",
              "error": e
            };
        self.onError(errorObj);
      }
    },

    /**
     * setDefaultContactDetailsSkin
     * @api : setDefaultContactDetailsSkin
     * sets default skins for contact details
     * @return : NA
     */
    setDefaultContactDetailsSkin: function() {
      var self = this;
      try{
        this.view.lblContactType.skin = this.getParsedValue(this._sknFieldLabel, kony.application.getCurrentBreakpoint());
        this.view.lblRadioValue1.skin = this.getParsedValue(this._sknRadioButtonText, kony.application.getCurrentBreakpoint());
        this.view.lblRadioValue2.skin = this.getParsedValue(this._sknRadioButtonText, kony.application.getCurrentBreakpoint());
        this.view.lblRadioValue3.skin = this.getParsedValue(this._sknRadioButtonText, kony.application.getCurrentBreakpoint());
        this.view.lblMobileNumber.skin = this.getParsedValue(this._sknFieldLabel, kony.application.getCurrentBreakpoint());
        this.view.lblEmailAddress.skin = this.getParsedValue(this._sknFieldLabel, kony.application.getCurrentBreakpoint());
        this.view.lblNationalId.skin = this.getParsedValue(this._sknFieldLabel, kony.application.getCurrentBreakpoint());
        this.view.tbxCountryCode.skin = this.getParsedValue(this._sknFieldValue,kony.application.getCurrentBreakpoint());  
        this.view.tbxMobileNumber.skin = this.getParsedValue(this._sknFieldValue,kony.application.getCurrentBreakpoint());
        this.view.tbxEmailAddress.skin = this.getParsedValue(this._sknFieldValue,kony.application.getCurrentBreakpoint());
        this.view.tbxNationalId.skin = this.getParsedValue(this._sknFieldValue,kony.application.getCurrentBreakpoint());
        this.view.tbxCountryCode.placeholderSkin = this.getParsedValue(this._sknTextBoxPlaceholder,kony.application.getCurrentBreakpoint());  
        this.view.tbxMobileNumber.placeholderSkin = this.getParsedValue(this._sknTextBoxPlaceholder,kony.application.getCurrentBreakpoint());
        this.view.tbxEmailAddress.placeholderSkin = this.getParsedValue(this._sknTextBoxPlaceholder,kony.application.getCurrentBreakpoint());
        this.view.tbxNationalId.placeholderSkin = this.getParsedValue(this._sknTextBoxPlaceholder,kony.application.getCurrentBreakpoint());
        this.view.lblRadioButton1.skin = this.getParsedValue(this._sknRadioUnselected.skin, kony.application.getCurrentBreakpoint());        
        this.view.lblRadioButton2.skin = this.getParsedValue(this._sknRadioUnselected.skin, kony.application.getCurrentBreakpoint());
        this.view.lblRadioButton3.skin = this.getParsedValue(this._sknRadioUnselected.skin, kony.application.getCurrentBreakpoint());       
      }
      catch(e)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setDefaultContactDetailsSkin method" ,
              "errorLevel" : "Component",
              "error": e
            };
        self.onError(errorObj);
      }
    },
    /**
     * @api : invokeAddressCountryListService
     * invoke service for retrieving list of countries
     * @return : NA
     */
    invokeAddressCountryListService : function() {
      var self = this;
      try{
        var objSvcName = this.getParsedValue(this._addressObjectService);
        var objName = this.getParsedValue(this._countryObject);
        var operationName = this.getParsedValue(this._getCountriesOperation);
        var criteria = this.getCriteria(this._getCountriesCriteria);
        var identifier = this.getParsedValue(this._getCountriesIdentifier);
        this.unifiedTransferDAO.fetchCountriesList
        (objSvcName,objName,operationName,criteria,this.onSuccessFetchCountriesList,identifier,self.onError);
      }catch(err){
        var errorObj =
            {
              "errorInfo" : "Error in invokeAddressCountryListService method" ,
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },

    /**
     * @api : onSuccessFetchCountriesList
     * success callback for retrieving countries list
     * @return : NA
     */
    onSuccessFetchCountriesList: function(response, unicode) {   
      var scope = this;
      this._countriesList = response;
      this.serviceCounter++;
      if(this.serviceCounter === 1){
        this.setCountryAndStateMasterData("lbxState");
        this.setCountryAndStateMasterData("lbxCountryField6");
      }
    },

    /**
     * @api : callContractListApi
     * invoke service for retrieving list of contracts
     * @return : NA
     */
    callContractListApi : function() {
      var self = this;
      try{
        var objSvcName = this.getParsedValue(this._contractObjectService);
        var objName = this.getParsedValue(this._contractObject);
        var operationName = this.getParsedValue(this._contractOperation);
        var criteria = this.getCriteria(this._contractCriteria);
        var identifier = this.getParsedValue(this._contractResponse);
        this.unifiedTransferDAO.fetchContractsList
        (objSvcName,objName,operationName,criteria,this.onSuccessFetchContractList,identifier,self.onError);
      } catch(err){
        var errorObj =
            {
              "errorInfo" : "Error in callContractListApi method" ,
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },

    /**
     * @api : onSuccessFetchContractList
     * success callback for retrieving contracts list
     * @return : NA
     */
    onSuccessFetchContractList: function(response, unicode) {   
      var scope = this;
      try {
        this._contractList = response;
        this.validateProfileAccess(this._contractList);
        var contextParams = {
          "contractList": this._contractList,
          "isSingleProfile": scope.isSingleCustomerProfile,
          "profileAccess": scope.profileAccess,
          "transferType": this.getParsedValue(this._recipientFlow)
        };
        this.dataContext["contractListData"] = contextParams;
        this.parserUtilsManager.setContext(this.dataContext);
        kony.application.dismissLoadingScreen();
        this.actionHandler(this.dataContext,this._utfCTAbutton2);
      } catch(err){
        var errorObj =
            {
              "errorInfo" : "Error in onSuccessFetchContractList method" ,
              "errorLevel" : "Business",
              "error": err
            };
        scope.onError(errorObj);
      }
    },

    /**
     * @api : validateProfileAccess
     * validation for the user profile access
     * @return : NA
     */
    validateProfileAccess: function(data) {
      var scope = this;
      try {
         var profiles = [];
        data = data["contracts"];
        if (data[0]["contractCustomers"]){
          scope.isSingleCustomerProfile =data.length > 1 || data[0]["contractCustomers"].length  > 1  ? false : true;
          for(var i = 0;i< data.length; i++){
          data[i]["contractCustomers"].forEach(function(item){
            scope.accessibleCustomerIds.push({
              id : item.coreCustomerID,
              type : item.isBusiness === "true" ? 'business' : 'personal',
              name : item.coreCustomerName || "",
              contractId : item.contractId || "",
              contractName : item.contractName || ""
            });
            if(item.isPrimary === "true")
              scope.primaryCustomerId = {
                id : item.coreCustomerID,
                type : item.isBusiness === "true" ? 'business' : 'personal',
                name : item.coreCustomerName || "",
                contractId : item.contractId || "",
                contractName : item.contractName || ""
              };
          });
          }
          scope.accessibleCustomerIds.forEach(function(item){
            if(!profiles.includes(item.type))
              profiles.push(item.type);
          });
          if(profiles.length>1)
            scope.profileAccess = "both";
          else
            scope.profileAccess = profiles[0];
        }} catch(err){
          var errorObj =
              {
                "errorInfo" : "Error in validateProfileAccess method" ,
                "errorLevel" : "Business",
                "error": err
              };
          scope.onError(errorObj);
        }
    },

    /**
     * @api : setCountryAndStateMasterData
     * populates the list of countries and states
     * @return : NA
     */
    setCountryAndStateMasterData: function(widgetId) { 
      var scope = this;
      scope.countryWidget=widgetId;
      try{
        kony.application.dismissLoadingScreen();      
        if(!this.view[scope.countryWidget].isVisible){
          return;
        }
        this.serviceCounter = 0;    
        scope.newCountryList.push(["0",  kony.i18n.getLocalizedString("i18n.ProfileManagement.selectCountry")]);
        this._countriesList.map(function(country) {
          return scope.newCountryList.push([country.id, country.Name]);
        });
        //AddnewAccount
//         scope.newStateList.push(["1", kony.i18n.getLocalizedString("i18n.ProfileManagement.selectState")]);
//         this._statesList.map(function(state) {
//           return scope.newStateList.push([state.id, state.Name, state.Country_id]);
//         });
        this.view[this.countryWidget].masterData = scope.newCountryList;
        this.countriesMasterData = scope.newCountryList;
        //this.view[this.stateWidget].masterData = scope.newStateList;
        //this.statesMasterData = scope.newStateList;
        var countrySelected = scope.newCountryList[0][0];
        //var stateSelected = scope.newStateList[0][0];
        this.countryMasterData = scope.newCountryList;
        if(this.countryWidget === "lbxState" || this.countryWidget === "lbxCountryField6"){
          this.view[this.countryWidget].selectedKey = countrySelected;  
        }
        else{
          this.highlightSelectedCountry(this.countryWidget);  
        }
        this.countryId = this.view[this.countryWidget].selectedKeyValue[0];
//         if (this.countryId === "0") {
//           this.view[this.stateWidget].setEnabled(false);
//         }
//         if(this.stateWidget === "listState"){
//           var specifiedStateList = this.getSpecifiedStates(scope.countryId);
//           this.statesMasterData = specifiedStateList.states;
//           this.view[this.stateWidget].masterData = this.statesMasterData;
//           this.highlightSelectedState(this.stateWidget);
//         } else {
//           this.view[this.stateWidget].selectedKey = stateSelected;
//         }
        this.view[scope.countryWidget].onSelection = function() {
          var data = [];
          scope.countryId = scope.view[this.id].selectedKeyValue[0];
          if (scope.countryId === "0") {
            scope.view[this.id].skin = "ICSknlbxSSPR72727215px";
//             scope.view[scope.stateWidget].masterData = scope.newStateList;
//             scope.view[scope.stateWidget].selectedKey = stateSelected;
            scope.view[this.id].selectedKey = scope.countryId;
//             scope.view[scope.stateWidget].setEnabled(false);
          } else {
              scope.view[this.id].skin = "ICSknTextBoxSSPR42424215px";
//             scope.view[scope.stateWidget].setEnabled(true);
            scope.view[this.id].selectedKey = scope.countryId;
//             if(scope.stateWidget === "listState"){
//               scope.updateContext("listCountry",scope.view[scope.countryWidget].selectedKeyValue[1]);
//             }
//             else{
              if(this.id === "lbxState")
              scope.updateContext("lbxState",scope.view[this.id].selectedKeyValue[1]);
              else if(this.id === "lbxCountryField6"){
              scope.updateContext("lbxCountryField6",scope.view[this.id].selectedKeyValue[1]);
              scope.minFillValidation("");
              }
//             }
//             data = scope.getSpecifiedStates(scope.countryId);
//             scope.view[scope.stateWidget].masterData = data.states;
//             scope.view[scope.stateWidget].selectedKey = data.stateSelected;
//             scope.stateId = scope.view[scope.stateWidget].selectedKeyValue[0];
//             if (scope.stateId === "1") {
              scope.view[this.id].masterData = scope.newCountryList;
              scope.view[this.id].selectedKey = scope.countryId;
//             }              
          }        
        };
//         this.view[scope.stateWidget].onSelection = function(){
//           if(scope.stateWidget === "listState"){
//             scope.updateContext("listState",scope.view[scope.stateWidget].selectedKeyValue[1]);
//           }
//           else{
//             scope.updateContext("lbxState",scope.view[scope.stateWidget].selectedKeyValue[1]);  
//           }        
//         };
      }
      catch(err) {
        var errorObj =
            {
              "errorInfo" : "Error in setCountryAndStateMasterData method" ,
              "errorLevel" : "Business",
              "error": err
            };
        scope.onError(errorObj);
      }
    },
    /**
     * @api : invokeAddressStateListService
     * invoke service for retrieving list of countries
     * @return : NA
     */
    invokeAddressStateListService : function() {
      var self = this;
      try{
        var objSvcName = this.getParsedValue(this._addressObjectService);
        var objName = this.getParsedValue(this._statesObject);
        var operationName = this.getParsedValue(this._getStatesOperation);
        var criteria = this.getCriteria(this._getStatesCriteria);
        var identifier = this.getParsedValue(this._getStatesIdentifier);
        this.unifiedTransferDAO.fetchStatesList
        (objSvcName,objName,operationName,criteria,this.onSuccessFetchStatesList,identifier,self.onError);
      }catch(err){
        var errorObj =
            {
              "errorInfo" : "Error in invokeAddressStateListService method" ,
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }  
    },
    /**
     * @api : onSuccessFetchStatesList
     * success callback for retrieving state list
     * @return : NA
     */
    onSuccessFetchStatesList: function(response, unicode) {
      var scope = this;
      this._statesList = response;
      this.serviceCounter++;
      if(this.serviceCounter === 2)
        this.setCountryAndStateMasterData();
    },
    /**
     * @api : getSpecifiedStates
     * Method  for retrieving states list for the selected Country
     * @return : NA
     */    
    getSpecifiedStates: function(addressId) {
      var self = this;
      try{       
        var data = [];
        var statesList = [];
        statesList.push(["1", "Select a state"]);
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
      }
      catch(err){
        var errorObj =
            {
              "errorInfo" : "Error in getSpecifiedStates method" ,
              "errorLevel" : "Business",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
       * setPayeeDetailsData
       * @api : setPayeeDetailsData
       *  set payee detail fields data on modify flow
      */  
    setPayeeDetailsData : function(){
      var mapText;
      var self = this;
      try{
        if(this.getParsedValue(this._ifTextBox1.mapping) != undefined )
        {
          mapText = "";
          mapText = this.getParsedValue(this._ifTextBox1.mapping);
          this.view["tbxPayeeName"].text = mapText;
        }
        if(this.getParsedValue(this._ifTextBox2.mapping) != undefined )
        {
          mapText = "";
          mapText = this.getParsedValue(this._ifTextBox2.mapping);
          this.view["tbxNewAccountNumber"].text = mapText;
        }
        if(this.getParsedValue(this._ifReenterTextBox2.mapping) != undefined )
        {
          mapText = "";
          mapText = this.getParsedValue(this._ifReenterTextBox2.mapping);
          this.view["tbxReenterAccountNumber"].text = mapText;
        }
        if(this.getParsedValue(this._ifTextBox3.mapping) != undefined )
        {
          mapText = "";
          mapText = this.getParsedValue(this._ifTextBox3.mapping);
          this.view["tbxNickName"].text = mapText;
        }
        if(this.getParsedValue(this._ifTextBox10.mapping) != undefined )
        {
          mapText = "";
          mapText = this.getParsedValue(this._ifTextBox10.mapping);
          this.view["tbxIntermediaryBIC"].text = mapText;
        }
        if (this.getParsedValue(this._clearingIDCode.mapping) != undefined) {
          mapText = "";
          mapText = this.getParsedValue(this._clearingIDCode.mapping);
          this.view["lblSelectedClearingCode"].text = mapText;
      }
      }
      catch(err){
        var errorObj =
            {
              "errorInfo" : "Error in setPayeeDetailsData method" ,
              "errorLevel" : "Component",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
       * setBICSwiftData
       * @api : setBICSwiftData
       *  set BIC and other code fields data on modify flow
      */  
    setBICSwiftData : function(){
      var mapText;
      var self = this;
      try{
        if(this.getParsedValue(this._ifTextBox4.mapping) != undefined )
        {
          mapText = "";
          mapText = this.getParsedValue(this._ifTextBox4.mapping);
          this.view["tbxPayeeDetailField1"].text = mapText;
          self.minFillValidation("if_txtValue4");
        }
        if(this.getParsedValue(this._ifTextBox5.mapping) != undefined )
        {
          mapText = "";
          mapText = this.getParsedValue(this._ifTextBox5.mapping);
          this.view["tbxPayeeDetailField2"].text = mapText;
          self.minFillValidation("if_txtValue5");
        }
        if(this.getParsedValue(this._ifTextBox6.mapping) != undefined )
        {
          mapText = "";
          mapText = this.getParsedValue(this._ifTextBox6.mapping);
          this.view["tbxPayeeDetailField3"].text = mapText;
          self.minFillValidation("if_txtValue6");
        }
        if(this.getParsedValue(this._ifTextBox7.mapping) != undefined )
        {
          mapText = "";
          mapText = this.getParsedValue(this._ifTextBox7.mapping);
          this.view["tbxPayeeDetailField4"].text = mapText;
          self.minFillValidation("if_txtValue7");
        }
        if(this.getParsedValue(this._ifTextBox8.mapping) != undefined )
        {
          mapText = "";
          mapText = this.getParsedValue(this._ifTextBox8.mapping);
          this.view["tbxPayeeDetailField5"].text = mapText;
          self.minFillValidation("if_txtValue9");
        }
        if(this.getParsedValue(this._ifTextBox9.mapping) != undefined )
        {
          mapText = "";
          mapText = this.getParsedValue(this._ifTextBox9.mapping);
          this.view["tbxPayeeDetailField6"].text = mapText;
          self.minFillValidation("if_txtValue10");
        }
      }
      catch(err){
        var errorObj =
            {
              "errorInfo" : "Error in setBICSwiftData method" ,
              "errorLevel" : "Component",
              "error": err
            };
        self.onError(errorObj);
      }
    },
    /**
       * setContactTypeData
       * @api : setContactTypeData
       *  set BIC and other code fields data on modify flow
      */  
    setContactTypeData : function(){
      var mapText;
      var self = this;
      try{
        if(this.getParsedValue(this._ctTextBox1.mapping) != undefined )
        {
          mapText = "";
          mapText = this.getParsedValue(this._ctTextBox1.mapping);
          this.view["tbxCountryCode"].text = mapText;
        }
        if(this.getParsedValue(this._ctTextBox2.mapping) != undefined )
        {
          mapText = "";
          mapText = this.getParsedValue(this._ctTextBox2.mapping);
          this.view["tbxMobileNumber"].text = mapText;
        }
        if(this.getParsedValue(this._ctTextBox3.mapping) != undefined )
        {
          mapText = "";
          mapText = this.getParsedValue(this._ctTextBox3.mapping);
          this.view["tbxEmailAddress"].text = mapText;
        }
        if(this.getParsedValue(this._ctTextBox4.mapping) != undefined )
        {
          mapText = "";
          mapText = this.getParsedValue(this._ctTextBox4.mapping);
          this.view["tbxNationalId"].text = mapText;
        }
        if(this.view.flxContactType.isVisible) {
          if(self.context.displayPhoneNumber !== ""){
            this.onClickPhoneRadioButton();
          }else if(self.context.emailID !== ""){
            this.onClickEmailRadioButton();
          }else if(self.context.displayNationalId !== ""){
            this.onClickNationalIdRadioButton();
          }
        }
      }
      catch(err){
        var errorObj =
            {
              "errorInfo" : "Error in setContactTypeData method" ,
              "errorLevel" : "Component",
              "error": err
            };
        self.onError(errorObj);
      }
    },

    /**
       * setAddressDetailsData
       * @api : setAddressDetailsData
       *  set address fields data on modify flow
      */  
    setAddressDetailsData : function(){
      var mapText;
      var self = this;
      try{
        if(this.getParsedValue(this._adfTextBox1.mapping) != undefined )
        {
          mapText = "";
          mapText = this.getParsedValue(this._adfTextBox1.mapping);
          this.view["tbxCode"].text = mapText;
        }
        if(this.getParsedValue(this._adfTextBox2.mapping) != undefined )
        {
          mapText = "";
          mapText = this.getParsedValue(this._adfTextBox2.mapping);
          this.view["tbxPhoneNumber"].text = mapText;
        }
        if(this.getParsedValue(this._adfTextBox3.mapping) != undefined )
        {
          mapText = "";
          mapText = this.getParsedValue(this._adfTextBox3.mapping);
          this.view["tbxEmailId"].text = mapText;
        }
        if(this.getParsedValue(this._adfTextBox4.mapping) != undefined )
        {
          mapText = "";
          mapText = this.getParsedValue(this._adfTextBox4.mapping);
          this.view["tbxAddressLine1"].text = mapText;
        }
        if(this.getParsedValue(this._adfTextBox5.mapping) != undefined )
        {
          mapText = "";
          mapText = this.getParsedValue(this._adfTextBox5.mapping);
          this.view["tbxAddressLine2"].text = mapText;
        }
        if(this.getParsedValue(this._adfTextBox6.mapping) != undefined )
        {
          mapText = "";
          mapText = this.getParsedValue(this._adfTextBox6.mapping);
          this.view["tbxCity"].text = mapText;
        }
        if(this.getParsedValue(this._adfTextBox7.mapping) != undefined )
        {
          mapText = "";
          mapText = this.getParsedValue(this._adfTextBox7.mapping);
          this.view["tbxZipCode"].text = mapText;
        }
      }
      catch(err){
        var errorObj =
            {
              "errorInfo" : "Error in setAddressDetailsData method" ,
              "errorLevel" : "Component",
              "error": err
            };
        self.onError(errorObj);
      }	  
    },

    /**
     * @api : setFrontEndFormatType
     * formats the data in front end
     * @return : NA
     */
    setFrontEndFormatType: function(formatType, data) {
      var self = this;
      var valueEntered = data.text;
      var formattedResult = "";
      try {
       if(formatType === "NATIONALID") {
          var formattedResult = '';
          valueEntered = valueEntered.toUpperCase();
          valueEntered = valueEntered.replace(/\s/g, '');
          for(var i = 0; i < valueEntered.length; i++) {
            if(i%4 == 0 && i > 0) formattedResult = formattedResult.concat(' ');
            formattedResult = formattedResult.concat(valueEntered[i]);
          }
          data.text = formattedResult;
        }
        else if (formatType === "EMAIL") {
          if ((valueEntered.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) && valueEntered.includes(".")) {
            self.view.flxErrorWarning.setVisibility(false);
            data.skin = self.getParsedValue(self._sknFieldValue, kony.application.getCurrentBreakpoint());
          } else {
            if(!this.isEmptyNullUndefined(this.view.tbxEmailId.text)) {
            this.setErrorFlexVisibility(true);
            this.view.txtErrormessage.text = kony.i18n.getLocalizedString("i18n.payments.validEmailMessage");
            self.isError = 1;
            data.skin = self.getParsedValue(self._sknErrorTextInput, kony.application.getCurrentBreakpoint());
            } else {
              this.setErrorFlexVisibility(false);
              this.view.txtErrormessage.text = "";
              data.skin = self.getParsedValue(self._sknFieldValue, kony.application.getCurrentBreakpoint());
            }
          }
        }
        else if(formatType === "SWIFT") {
          data.text = valueEntered.toUpperCase();
        }
      }
      catch(err){
        var errorObj =
            {
              "errorInfo" : "Error while formatting front end data" ,
              "errorLevel" : "Component",
              "error": err
            };
        self.onError(errorObj);
      }   
    },

    /**
     * @api : setMinimumLenghtError
     * sets error message in flex when minimum length of data is not provided
     * @return : NA
     */
    setMinimumLenghtError: function(minimumLength) {
      var self = this;
      try {
        this.setErrorFlexVisibility(true);
        this.view.txtErrormessage.text = kony.i18n.getLocalizedString("i18n.payments.validData")+ minimumLength +".";
      }
      catch(err){
        var errorObj =
            {
              "errorInfo" : "Error while setting minimum length error" ,
              "errorLevel" : "Component",
              "error": err
            };
        self.onError(errorObj);
      }	
    },
    
     /**
     * @api : setErrorFlexVisibility
     * sets error flex visibility as true
     * @return : NA
     */
    setErrorFlexVisibility: function(param) {
      var self = this;
      try {
        this.view.flxErrorWarning.setVisibility(param);
      }
      catch(err){
        var errorObj =
            {
              "errorInfo" : "Error in setErrorFlexVisibility method" ,
              "errorLevel" : "Component",
              "error": err
            };
        self.onError(errorObj);
      }	
    },

    /**
    * @api : getDeformattedPhoneNumber
    * Get formatted phone number and returns phone number without format
    * @return : Deformatted Phone number
    */
    getDeformattedPhoneNumber : function(phoneNumber){
      return phoneNumber.replace(/\D/g,"");
    },

    /**
	* @api : getDeformattedNationalId
	* Get formatted national id and returns national id without format
	* @return : Deformatted Phone number
	*/
    getDeformattedNationalId : function(nationalId){
      return nationalId.replace(/ /g,"");
    },
    setClearingIdentifierCodesUI: function(){
      this.view.lblSelectedClearingCode.text = kony.i18n.getLocalizedString("i18n.payments.selectIdentifierCode");
      this.dataContext["clearingIdentifierCode"] = "";
      this.view.flxClearingCodeDropdown.onClick = this.toggleClearingIdentifierDropdown;
      this.view.segClearingCodeList.onRowClick = this.onClearingIdentifierSelection.bind(this);
      this.unifiedTransferDAO.getClearingIdentifierCodes(this.setClearingIdentifierDropdownValues,this.onError);
    },
    toggleClearingIdentifierDropdown: function(){
      if (this.view.flxClearingCodeList.isVisible) {
        this.hideClearingIdentifierDropdown();
      } else {
        this.showClearingIdentifierDropdown();
      }
    },
    showClearingIdentifierDropdown: function(){
      this.view.flxClearingCodeList.isVisible = true;
      // this.updateTouchEndSubscriber("flxClearingCodeList", { shouldBeVisible: true });
      this.view.flxClearingCodeList.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1,
        },
      };
      this.view.lblClearingCodeDropdownIcon.text = "P";
      this.view.flxClearingCodeDropdown.accessibilityConfig = {
        a11yARIA: {
          "aria-expanded": true,
          "role": "button",
          "aria-labelledby": "lblSelectedClearingCode"
        },
      };
    },
    hideClearingIdentifierDropdown: function(){
      this.view.flxClearingCodeList.isVisible = false;
      this.view.flxClearingCodeList.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1,
        },
      };
      this.view.lblClearingCodeDropdownIcon.text = "O";
      this.view.flxClearingCodeDropdown.accessibilityConfig = {
        a11yARIA: {
          "aria-expanded": false,
          "role": "button",
          "aria-labelledby": "lblSelectedClearingCode"
        },
      };
    },
    onClearingIdentifierSelection : function(){
      try{
        let selectedData = this.view.segClearingCodeList.selectedRowItems[0];
        this.view.lblSelectedClearingCode.text = selectedData["value"].length>40?selectedData["value"].substr(0,39)+"...":selectedData["value"];
        this.view.lblSelectedClearingCode.skin = this.valueSkin;
        this.hideClearingIdentifierDropdown();
        this.mapTextBoxWithContext(this._clearingIDCode.mapping, "lblSelectedClearingCode");
        // this.businessController.storeInCollection({
        //   "clearingIdentifier": selectedData["value"]
        // });
        this.updateContext("lblSelectedClearingCode",selectedData["value"].split('-')[0].trim());
        this.minFillValidation("");
        this.view.flxClearingCodeDropdown.setActive(true);
      }
      catch (err) {
        var errorObj = {
          "errorInfo" : "Error in onClearingIdentifierSelection method" ,
          "errorLevel" : "Component",
          "error": err
        };
        this.onError(errorObj);
      }
    },
    setClearingIdentifierDropdownValues: function (clearingIdentifierCodes) {
      try {
        kony.application.dismissLoadingScreen();
        this.view.flxClearingCodeDropdown.setEnabled(true);
        this.view.flxClearingCodeDropdown.skin = "ICSknFlxffffffBordere3e3e31pxRadius3px";
        this.view.lblSelectedClearingCode.skin = this.labelSkin;
        var segmentData = [];
        if (!this.isEmptyNullOrUndefined(clearingIdentifierCodes)) {
          this.view.segClearingCodeList.rowTemplate = "flxListDropdown";
          this.view.segClearingCodeList.widgetDataMap = {
            "lblListValue": "value",
            "selectedKey": "key"
          };
          clearingIdentifierCodes.forEach((clrIdCode) => {
            segmentData.push({
                key: clrIdCode,
                value: clrIdCode,
            });
          });
          this.view.segClearingCodeList.setData(segmentData);
          let dropdownHeight = clearingIdentifierCodes.length*40;
          if (dropdownHeight > 200) {
            dropdownHeight = 200;
          }
          this.view.flxClearingCodeList.height = dropdownHeight+"px";
          if (clearingIdentifierCodes.length === 1) {
            this.view.flxClearingCodeDropdown.setEnabled(false);
            this.view.flxClearingCodeDropdown.skin = "ICSknFlxDisabled";
            this.view.lblSelectedClearingCode.text = segmentData[0].value;
            this.view.lblSelectedClearingCode.skin = this.valueSkin;
            this.mapTextBoxWithContext(this._clearingIDCode.mapping, "lblSelectedClearingCode");
            // this.businessController.storeInCollection({
            //   "clearingIdentifier": selectedData["value"]
            // });
            this.updateContext("lblSelectedClearingCode",segmentData[0].value);
          }
        }
        this.view.lblClearingCode.accessibilityConfig = {
          a11yLabel: this.view.lblClearingCode.text + " " + this.view.lblSelectedClearingCode.text,
          a11yARIA: {
            tabindex: -1
          },
        };
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "setClearingIdentifierDropdownValues",
          "error": err
        };
        this.onError(errorObj);
      }
    },
    //popup
    showClearingCodeLookupPopup: function () {
      var scope = this;
      try {
        var form = kony.application.getCurrentForm();
        this.view.segBankClearingLookup.contentOffset = { "x": "0%", "y": "0%" };
        this.view.segBankClearingLookup.removeAll();
        // this.businessController.storeInCollection({
        //   "tbxBankClearingLookupSearch1": "",
        //   "tbxBankClearingLookupSearch2": "",
        //   "tbxBankClearingLookupSearch3": ""
        // });
        var popupObj = this.view.flxBankClearingLookup.clone();
        popupObj.isVisible = true;
        popupObj.top = "0dp";
        popupObj.left = "0dp";
        popupObj.height = "100%";
        popupObj.zIndex = 1001;
        popupObj.flxBankClearingPopup.top = "100px";
        popupObj.accessibilityConfig = {
          a11yARIA:{
            "tabindex":-1,
            "role":"dialog"
          }
        };
        popupObj.btnBankClearingLookupClose.accessibilityConfig = {
          a11yARIA:{
            "tabindex":0,
            "role":"button"
          },
          a11yLabel: "Close this pop-up"
        };
        document.addEventListener('keydown', function (event) {
          if (event.which === 27) {
            popupObj.isVisible = false;
            form.remove(popupObj);
            scope.view.flxLookUp2.setActive(true);
          }
        });
        popupObj.flxBankClearingPopup.flxBankClearingLookupTitle.flxBankClearingLookupClose.btnBankClearingLookupClose.onClick = function(){
          popupObj.isVisible = false;
          form.remove(popupObj);
          scope.view.flxLookUp2.setActive(true);
        }
        popupObj.flxBankClearingPopup.flxBankClearingLookupSearchBtn.btnBankClearingLookupSearch.onClick = () => {
          scope.searchForBCC();
        };
        form.add(popupObj);
        popupObj.lblBankClearingLookupTitle.setActive(true);
        // this.setClearingCodeLookupData();
        this.view.forceLayout();
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "showClearingCodeLookupPopup",
          "error": err
        };
        this.onError(errorObj);
      }
    },
    searchForBCC: function() {
      var scope = this;
      try {
          this.updateContext("tbxBankClearingLookupSearch1", this.view.tbxBankClearingLookupSearch1.text);
          this.updateContext("tbxBankClearingLookupSearch2", this.view.tbxBankClearingLookupSearch2.text);
          this.updateContext("tbxBankClearingLookupSearch3", this.view.tbxBankClearingLookupSearch3.text);
          if (this._lookUpBCCService != "") {
              var objSvcName = this.getParsedValue(this._lookUpBCCService);
              var objName = this.getParsedValue(this._lookUpBCCObject);
              var operationName = this.getParsedValue(this._lookUpBCCOperation);
              var criteria = this.getCriteria(JSON.stringify(this._lookUpBCCCriteria));
              this.unifiedTransferDAO.searchClearingCode(objSvcName, objName, operationName, criteria, this.setClearingCodeLookupData, self.setClearingCodeLookupData);
          }
      } catch (e) {
          var errorObj = {
              errorInfo: "Error in fetching searched Bank clearing code service",
              errorLevel: "Component",
              error: e,
          };
          scope.onError(errorObj);
      }
    },
    setClearingCodeLookupData: function (response) {
      var scope = this;
      var form = kony.application.getCurrentForm();
      if (form.segBankClearingLookup === undefined || form.segBankClearingLookup === null) {
        return;
      }
      try {
        if (kony.application.getCurrentBreakpoint() === 640) {
          form.segBankClearingLookup.rowTemplate = "flxMobClearingCodeLookup";
          form.flxBankClearingLookupMobHeader.setVisibility(true);
          form.flxBankClearingLookupHeader.setVisibility(false);
          form.segBankClearingLookup.widgetDataMap = {
            "lblLookupColumn1Value": "lblLookupColumn1Value",
            "lblLookupColumnValue2": "lblLookupColumnValue2",
            "lblLookupColumnValue3": "lblLookupColumnValue3",
            "lblColumn1": "lblColumn1",
            "lblColumn2": "lblColumn2",
            "flxLookupRow": "flxLookupRow"
          };
        } else {
          form.segBankClearingLookup.rowTemplate = "flxLookupRecordList";
          form.flxBankClearingLookupMobHeader.setVisibility(false);
          form.flxBankClearingLookupHeader.setVisibility(true);
          form.segBankClearingLookup.widgetDataMap = {
            "lblLookupColumn1Value": "lblLookupColumn1Value",
            "lblLookupColumnValue2": "lblLookupColumnValue2",
            "lblLookupColumnValue3": "lblLookupColumnValue3",
            "flxColumn3Value": "flxColumn3Value",
            "flxLookupRecordList": "flxLookupRecordList",
            "flxLookupRecordValues": "flxLookupRecordValues",
            "flxColumn1Value": "flxColumn1Value",
            "flxColumn2Value": "flxColumn2Value"
          };
        }
        var segData = this.getClearingCodeLookupSegData(response);
        for (var i = 0; i < segData.length; i++) {
          segData[i]["flxColumn3Value"] = {
            "onClick": scope.setClearingCodeData.bind(scope.view.segBankClearingLookup.selectedRowItems)
          };
        }
        if (kony.application.getCurrentForm().segBankClearingLookup) {
          kony.application.getCurrentForm().segBankClearingLookup.setData(segData);
        }
        kony.application.dismissLoadingScreen();
      } catch (err) {
        var errorObj = {
          "level": "ComponentController",
          "method": "setClearingCodeLookupData",
          "error": err
        };
        this.onError(errorObj);
      }
    },
    /**
     * @api : setClearingCodeData
     * Method to get selected data from lookup table once row cliked in look up table
     * @return : NA
     */
    setClearingCodeData: function (flxWidget, args) {
      var form = kony.application.getCurrentForm();
      form.flxBankClearingLookup.isVisible = false;
      var selectedRowItem = form.segBankClearingLookup.data[args.rowIndex]
      var bankName = selectedRowItem.bankName;
      var clearingCode = selectedRowItem.clearingCode;
      this.view.tbxPayeeDetailField4.text = bankName || "";
      // this.view.tbxPayeeDetailField4.skin = "ICSknTbxDisabledSSPreg42424215px";
      this.view.tbxPayeeDetailField2.text = clearingCode || "";
      this.view.tbxPayeeDetailField4.onEndEditing();
      this.view.tbxPayeeDetailField2.onEndEditing();
      // this.businessController.storeInCollection({
      //   "tbxPayeeDetail2": this.view.tbxPayeeDetail2.text,
      //   "tbxPayeeDetail3": this.view.tbxPayeeDetail3.text
      // });
      form.remove(form.flxBankClearingLookup);
    },
    getClearingCodeLookupSegData:function(response){
      //get the clearing codes from response
      let clearingCodesLookup = [
        {
          clearingCode:"123456",
          bankName:"Bank of Moscow",
          addressLine1:"Lake Gardens",
          city:"Moscow",
          country:"Russia",
        },
        {
          clearingCode:"678912",
          bankName:"Bank of India",
          addressLine1:"Route 1",
          city:"Hyderabad",
          country:"India",
        },
        {
          clearingCode:"345678",
          bankName:"Bank of America",
          addressLine1:"High Hills",
          city:"New York",
          country:"USA",
        }
      ]
      var segData = [];
      if (clearingCodesLookup.length>0) {
        clearingCodesLookup.forEach(code=>{
          let rowData = {};
          rowData.clearingCode = code.clearingCode;
          rowData.bankName = code.bankName;
          rowData.city = code.city;
          rowData.country = code.country;
          rowData.lblLookupColumnValue1 = {
            "text": code.clearingCode
          };
          let address = code.bankName;
          if (code.addressLine1) {
            address = address+", "+code.addressLine1;
          }
          if (code.city) {
            address = address+", "+code.city;
          }
          if (code.country) {
            address = address+", "+code.country;
          }
          rowData.lblLookupColumnValue2 = {
            "text": address
          };
          rowData.lblLookupColumnValue3 = {
            "text": kony.i18n.getLocalizedString("i18n.UnifiedTransfer.selectCode")
          };
          rowData.flxColumn3Value= {
            "onClick": this.setClearingCodeData.bind(this,this.view.segBankClearingLookup.selectedRowItems)
          };
          segData.push(rowData);
        })
      }
      return segData;
    },
    isEmptyNullOrUndefined: function (data) {
      if (data === null || data === undefined || data === "") return true;
      if (typeof data === "object") {
        if (Array.isArray(data)) return data.length === 0;
        return Object.keys(data).length === 0;
      }
      return false;
    },
  };
});