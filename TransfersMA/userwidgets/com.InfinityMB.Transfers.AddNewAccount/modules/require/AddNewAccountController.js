define([ './ParserUtilsManager','./UnifiedTransferDAO','./ValidationUtilManager','FormatUtil','./DataProcessorUtility','JSONValidator','DataValidationFramework/DataValidationHandler'], function (ParserUtilsManager, UnifiedTransferDAO, ValidationUtilManager,FormatUtil,DataProcessorUtility,JSONValidator,DataValidationHandler)  {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      // Field Properties.
      this._gsknHeaderLbl="";
      this._adsSectionHeader="";
      this._ctsSectionHeader="";
      this._ctsContactSelectionSkn="";
      this._ctsContactTypeSkn="";
      this._accValidationService="";
      this._sbssSwiftLookupService="";
      this._sbssResultItemFlexSkin="";
      this._annSectionHeader="";
      this._annSubHeader="";
      this._annTextbox="";
      this._annCTAButton="";
      this._rcsVisibility="";
      this._cfcsNoRecords="";
      this._cccsNoRecordsSkin="";
      this._cfcssNoRecordsSkin="";
      this._cccsNoRecords="";
      this._phnosTbxValueSkn="";
      this._phnosLabelValueSkn="";
      this._rcsSwiftLookupBtnSkn="";
      this._linkPayeeSectionTitle="";
      this._vfsObject="";
      this._vfssLabelSkin="";
      this._easSectionHeader="";
      this._cfcSectionHeader="";
      this._cfcssSearchboxFlx="";
      this._cfcSearchbox="";
      this._cfcssSearchBoxSkin="";
      this._cfcEmailContactsData="";
      this._cfcssResultItemFlex="";
      this._cfcPhoneNoContactsData="";
      this._cfcssResultItemFlexSelected="";
      this._cfcssSegLabelSkin="";
      this._cfcssSegAlphabetBG="";
      this._cfcssSegSortAlphabetSkin="";
      this._ccsCountryListService="";
      this._ccssSearchboxFlx="";
      this._phnoSectionHeader="";
      this._pynsSectionHeader="";
      this._phnoLookupSkin="";
      this._accNumericInputBottomSkin="";
      this._iconBack="";
      this._dvfConfig="";
      this._nisSectionHeader="";
      this._eassOROptionFlexSkin="";
      this._sbssResultItemFlexSelectSkin="";
      this._ccssSearchBoxSkin="";
      this._adsSubHeader="";
      this._gsknHeaderFlex="";
      this._ctsValues="";
      this._accValidationObject="";
      this._accNumericInputBottomErrorSkin="";
      this._sbssSwiftLookupObject="";
      this._sbssCriteria = "";
      this._rcsGetSwiftService="";
      this._rcsGetBankDetailsService="";
      this._vfssValueEditableSkin="";
      this._pynsSubHeader="";
      this._easSubHeader="";
      this._ccsCountryListOperation="";
      this._phnosFieldValue="";
      this._phnoSubheader="";
      this._accInputFieldMaskedSkin="";
      this._minFillMapping="";
      this._nisSubHeader="";
      this._eassOROptionLabelSkin="";
      this._pynsVisibility="";
      this._sbssResultItemLabel1Skin="";
      this._ccssResultItemFlex="";
      this._gsknCancelBtn="";
      this._accValidationOperation="";
      this._sbssSwiftLookupOperation="";
      this._rcsSwiftObject="";
      this._rcsBankDetailsObject="";
      this._vfssValueReadonlySkin="";
      this._easTextBoxInput="";
      this._ccsCountryListObject="";
      this._phnoKeypadClearIcon="";
      this._accInputFieldUnmaskedSkin="";
      this._adsTextBox1Label="";
      this._maxFillMapping="";
      this._nisTextBoxInput="";
      this._phnosOROptionFlexSkin="";
      this._eassPickEmailSkin="";
      this._pynsTextbox="";
      this._sbssResultItemLabel2Skin="";
      this._ccssResultItemFlexSelected="";
      this._accValidationCriteria="";
      this._sbssSearchResultsIdentifier="";
      this._rcsSwiftOperation="";
      this._rcsBankDetailsOperation="";
      this._vfssRowSkin="";
      this._easErrorMessage="";
      this._ccsCountryListCriteria="";
      this._phnoCCVisibility="";
      this._adsTextBox1Value="";
      this._jsonObjName="";
      this._nisErrorMessage="";
      this._phnosOROptionLabelSkin="";
      this._pynsErrorMessage="";
      this._phnoTxtbox1Label="";
      this._sbssResultItemLabel3Skin="";
      this._ccssSegSortAlphabetSkin="";
      this._beneficiaryTypes="";
      this._accSectionHeader="";
      this._inputValuesPool="";
      this._rcsSwiftCriteria="";
      this._rcsBankDetailsCriteria="";
      this._rcsOROption="";
      this._rcsOROptionLabelSkin="";
      this._rcsOROptionFlexSkin="";
      this._vfssRowSeparator="";
      this._easCTAButton2="";
      this._ccsCListReponseIdentifier="";
      this._adsTextBox2Label="";
      this._nisCTAButton="";
      this._phnosPickPhoneNoSkin="";
      this._pynsCTAButton="";
      this._phnoTxtbox1="";
      this._sbssEnableCache="";
      this._ccssSegAlphabetBG="";
      this._gsknSubHeaderFlex="";
      this._accScreen1SubHeader="";
      this._cancelButton="";
      this._rcsSwiftResponseIdentifier="";
      this._rcsBankDetailsResponseIdentifier="";
      this._ccsCountryListMasterData="";
      this._adsTextBox2Value="";
      this._easCTAButton1="";
      this._phnoTxtbox2Label="";
      this._sbssSectionHeader="";
      this._ccssSegLabelSkin="";
      this._rcsAcceptBICSwift="";
      this._gsknSubHeaderLabel="";
      this._accScreen2SubHeader="";
      this._ccsCountryListSource="";
      this._adsTextBox3Label="";
      this._easOROption="";
      this._phnoTxtbox2="";
      this._sbssSubHeaderTitle1="";
      this._rcsAcceptClearcode="";
      this._gsknSubHeaderseparator="";
      this._accTxtInput="";
      this._ccsSectionHeader="";
      this._adsTextBox3Value="";
      this._rcsHdr="";
      this._accReTxtInput="";
      this._ccsSearchbox="";
      this._adsTextBox4Label="";
      this._phnoOROption="";
      this._phnoCTABtn1="";
      this._adsTextBox4Value="";
      this._rcsSubhdr="";
      this._accCTAButton1="";
      this._vfsObjectService="";
      this._sbssTextbox1Label="";
      this._rcsTextbox1Label="";
      this._accCTAButton2="";
      this._vfsOperation="";
      this._adsTextBox5Label="";
      this._phnoCTABtn2="";
      this._phnoCTABtn3="";
      this._adsTextBox5Value="";
      this._sbssTextbox1="";
      this._rcsTextbox1="";
      this._accErrorMessage="";
      this._vfsCriteria="";
      this._sbssTextbox2Label="";
      this._vfsSectionTitle="";
      this._rcsTextbox2Label="";
      this._accReEnterErrorMessage="";
      this._adsTextBox6Label="";
      this._adsTextBox6Value="";
      this._sbssTextbox2="";
      this._rcsTextbox2="";
      this._accExistMsg="";
      this._vfsIconEdit="";
      this._sbssTextbox3Label="";
      this._vfsField1Lbl="";
      this._rcsTextbox3Label="";
      this._accInvalidMsg="";
      this._adsErrorMessage="";
      this._adsCTAButton="";
      this._sbssTextbox3="";
      this._vfsField1Value="";
      this._rcsTextbox3="";
      this._accKeypadClearIcon="";
      this._sbssTextbox4Label="";
      this._vfsField2Lbl="";
      this._gsknPrimaryContexualBtn="";
      this._sbssTextbox4="";
      this._vfsField2Value="";
      this._sbssCTA1="";
      this._rcsCTAButton1="";
      this._vfsField3Lbl="";
      this._gsknDisabledContexualBtn="";
      this._resultScreenSubHeader="";
      this._rcsCTAButton2="";
      this._vfsField3Value="";
      this._resultItemLabel1="";
      this._vfsField4Lbl="";
      this._resultItemLabel2="";
      this._vfsField4Value="";
      this._resultItemLabel3="";
      this._vfsField5Lbl="";
      this._vfsField5Value="";
      this._sbssSelectedTickImg="";
      this._verifyField5Value="";
      this._gsknTextBoxNormal="";
      this._sbssCTA2="";
      this._vfsField6Lbl="";
      this._sbssCTA3="";
      this._vfsField6Value="";
      this._gsknTextBoxFocus="";
      this._vfsField7Lbl="";
      this._gsknTextBoxError="";
      this._vfsField7Value="";
      this._vfsField8Lbl="";
      this._gsknErrorTextMessage="";
      this._vfsField8Value="";
      this._vfsField9Lbl="";
      this._vfsField9Value="";
      this._vfsField10Lbl="";
      this._vfsField10Value="";
      this._vfsField11Lbl="";
      this._gsknInputFieldLabel="";
      this._vfsField11Value="";
      this._vfsField12Lbl="";
      this._vfsField12Value="";
      this._vfsField13Lbl="";
      this._gsknContentFlex="";
      this._vfsField13Value="";
      this._vfsField14Lbl="";
      this._vfsField14Value="";
      this._vfsField15Lbl="";
      this._vfsField15Value="";
      this._vfsPayeeAddLbl="";
      this._vfsField1Address="";
      this._vfsField2Address="";
      this._vfsField3Address="";
      this._vfsField4Address="";
      this._vfsField5Address="";
      this._vfsField6Address="";
      this._vfsCTAButton1="";
      this._vfsCTAButton2="";
      this._textBox1Visibility="";
      this._textBox2Visibility="";
      this._textBox3Visibility="";   
      this._textBox4Visibility="";
      this._textBox5Visibility="";
      this._textBox6Visibility="";
      this._gsknSecondaryContexualBtn="";
      this._sbssResponseObj="";
      this.rcsLabel1 = "";
      this.rcsLabel2 = "";
      this.rcsLabel3 = "";
      this.rcsLabel4 = "";
      this.rcsLabel5 = "";
      this.rcsLabel6 = "";
      this.rcsValue1 = "";
      this.rcsValue2 = "";
      this.rcsValue3 = "";
      this.rcsValue4 = "";
      this.rcsValue5 = "";
      this.rcsValue6 = "";
      this._cicService = "";
      this._cicObject = "";
      this._cicVerb = "";
      this._cicCriteria = "";
      this._getAllCountriesService = "";
      this._getAllCountriesObject = "";
      this._getAllCountriesVerb = "";
      this._getAllCountriesCriteria = "";
      this._pbsHeader = "";
      this._pbsSubHeader = "";
      this._pbsTextBox = "";
      this._pbsCTA = "";
      this._pbtHeader = "";
      this._pbtSubHeader = "";
      this._pbtTextBox = "";
      this._pbtCTA = "";
      this._pbnHeader = "";
      this._pbnSubHeader = "";
      this._pbnTextBox = "";
      this._pbnCTA = "";
      this._intermediaryBICHeader = "";
      this._intermediaryBICSubHeader = "";
      this._intermediaryBICTextBox = "";
      this._intermediaryBICCTA = "";
      this._pbcHeader = "";
      this._cicHeader = "";
      this._bccBankClearingLookupService="";
      this._bccBankClearingLookupObject="";
      this._bccBankClearingLookupOperation="";
      this._bccSearchresultidentifier="";
      this._bccEnableCache="";
      this._bccSectionHeader="";
      this._bccSubHeader="";
      this._bccTextbox1Label="";
      this._bccTextbox2Label="";
      this._bccTextbox3Label="";
      this._bccTextbox1="";
      this._bccTextbox2="";
      this._bccTextbox3="";
      this._bccCta1="";
      this._bccCta2="";
      this._bccCta3="";
      this._bccResultsubHeader="";
      this._bccResultItemLabel1="";
      this._bccResultItemLabel2="";
      this._bccResultItemLabel3="";
      this._bccSelectedTick="";
      this._bccLookupCriteria="";
      this._bccresponse="";
      // Object.
      this.UnifiedTransferDAO = new UnifiedTransferDAO();
      this.dataValidationHandler = new DataValidationHandler();
      this.validationUtilManager = new ValidationUtilManager();
      this.dataProcessorUtility = new DataProcessorUtility();
      this.parserUtilsManager = new ParserUtilsManager();
      this.FormatUtils = new FormatUtil();
      this.jsonValidator = new JSONValidator();
      // Global Variables.
      this.context = {};
      this.payeeFlow = "";
      this.transferTypeContext = "";
      this.stack = [];
      this.headerTitleStack = [];
      this.ContactNumberkeypadString = "";
      this.countryDetails = []; 
      this._countryFlagVisibility = "";
      this.keypadString = "",
        this.isPeriodUsed = false;
      this.newPayee = "";
      this.processFlowType = "";
      this.selectedFlowType = "";
      this.disableOptions = "";
      this.serviceCounter = 0;
      this.countriesMasterData = [];
      this.statesMasterData = [];
      this.selectedCountry = "";
      this.selectedState = "";
      this.addressPhoneNumber = "";
      this.invalidJSONLoggerArray = [];
      this.jsonError = "";
      this.isIBANValid = "";
      this.bicCode = "";
      this.validAddress = "";
      this.inputPool = {};
      this.mandatoryInputs = 0;
      this.mandatoryInputsValue = 0;
      this.payeeNameTextChange=false;
      this.selectedFlow="ADD";
      this.getswift = "";
      this.swiftCodeData = "";
      this.getBCC = "";
      this.BCCCodeData = "";
      parent_scope = this;
      parent_scope.contactTypeForContacts = "";
      parent_scope.contactPickerObject = null;
      this.isSingleUser = false;
    },

    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      defineGetter(this,  'annSectionHeader', () => {
        return this._annSectionHeader;
      });
      defineSetter(this,  'annSectionHeader', value => {
        this._annSectionHeader = value;
      });
      defineGetter(this,  'annSubHeader', () => {
        return this._annSubHeader;
      });
      defineSetter(this,  'annSubHeader', value => {
        this._annSubHeader = value;
      });
      defineGetter(this,  'annTextbox', () => {
        return this._annTextbox;
      });
      defineSetter(this,  'annTextbox', value => {
        this._annTextbox = value;
      });
      defineGetter(this,  'annCTAButton', () => {
        return this._annCTAButton;
      });
      defineSetter(this,  'annCTAButton', value => {
        this._annCTAButton = value;
      });
      defineGetter(this,  'cfcsNoRecords', () => {
        return this._cfcsNoRecords;
      });
      defineSetter(this,  'cfcsNoRecords', value => {
        this._cfcsNoRecords = value;
      });
      defineGetter(this,  'cccsNoRecordsSkin', () => {
        return this._cccsNoRecordsSkin;
      });
      defineSetter(this,  'cccsNoRecordsSkin', value => {
        this._cccsNoRecordsSkin = value;
      });

      defineGetter(this,  'cfcssNoRecordsSkin', () => {
        return this._cfcssNoRecordsSkin;
      });
      defineSetter(this,  'cfcssNoRecordsSkin', value => {
        this._cfcssNoRecordsSkin = value;
      });
      defineGetter(this,  'cccsNoRecords', () => {
        return this._cccsNoRecords;
      });
      defineSetter(this,  'cccsNoRecords', value => {
        this._cccsNoRecords = value;
      });
      defineGetter(this,  'vfsField5Value', () => {
        return this._vfsField5Value;
      });
      defineSetter(this,  'vfsField5Value', value => {
        this._vfsField5Value = value;
      });

      defineGetter(this,  'gsknHeaderLbl', () => {
        return this._gsknHeaderLbl;
      });
      defineSetter(this,  'gsknHeaderLbl', value => {
        this._gsknHeaderLbl = value;
      });
      defineGetter(this,  'cfcSectionHeader', () => {
        return this._cfcSectionHeader;
      });
      defineSetter(this,  'cfcSectionHeader', value => {
        this._cfcSectionHeader = value;
      });

      defineGetter(this,  'cfcssSearchboxFlx', () => {
        return this._cfcssSearchboxFlx;
      });
      defineSetter(this,  'cfcssSearchboxFlx', value => {
        this._cfcssSearchboxFlx = value;
      });
      defineGetter(this,  'cfcSearchbox', () => {
        return this._cfcSearchbox;
      });
      defineSetter(this,  'cfcSearchbox', value => {
        this._cfcSearchbox = value;
      });

      defineGetter(this,  'cfcssSearchBoxSkin', () => {
        return this._cfcssSearchBoxSkin;
      });
      defineSetter(this,  'cfcssSearchBoxSkin', value => {
        this._cfcssSearchBoxSkin = value;
      });

      defineGetter(this,  'cfcEmailContactsData', () => {
        return this._cfcEmailContactsData;
      });
      defineSetter(this,  'cfcEmailContactsData', value => {
        this._cfcEmailContactsData = value;
      });
      defineGetter(this,  'cfcssResultItemFlex', () => {
        return this._cfcssResultItemFlex;
      });
      defineSetter(this,  'cfcssResultItemFlex', value => {
        this._cfcssResultItemFlex = value;
      });

      defineGetter(this,  'cfcPhoneNoContactsData', () => {
        return this._cfcPhoneNoContactsData;
      });
      defineSetter(this,  'cfcPhoneNoContactsData', value => {
        this._cfcPhoneNoContactsData = value;
      });
      defineGetter(this,  'cfcssResultItemFlexSelected', () => {
        return this._cfcssResultItemFlexSelected;
      });
      defineSetter(this,  'cfcssResultItemFlexSelected', value => {
        this._cfcssResultItemFlexSelected = value;
      });
      defineGetter(this,  'cfcssSegLabelSkin', () => {
        return this._cfcssSegLabelSkin;
      });
      defineSetter(this,  'cfcssSegLabelSkin', value => {
        this._cfcssSegLabelSkin = value;
      });
      defineGetter(this,  'cfcssSegAlphabetBG', () => {
        return this._cfcssSegAlphabetBG;
      });
      defineSetter(this,  'cfcssSegAlphabetBG', value => {
        this._cfcssSegAlphabetBG = value;
      });
      defineGetter(this,  'cfcssSegSortAlphabetSkin', () => {
        return this._cfcssSegSortAlphabetSkin;
      });
      defineSetter(this,  'cfcssSegSortAlphabetSkin', value => {
        this._cfcssSegSortAlphabetSkin = value;
      });
      defineGetter(this,  'phnosTbxValueSkn', () => {
        return this._phnosTbxValueSkn;
      });
      defineSetter(this,  'phnosTbxValueSkn', value => {
        this._phnosTbxValueSkn = value;
      });
      defineGetter(this,  'phnosLabelValueSkn', () => {
        return this._phnosLabelValueSkn;
      });
      defineSetter(this,  'phnosLabelValueSkn', value => {
        this._phnosLabelValueSkn = value;
      });
      defineGetter(this,  'adsSectionHeader', () => {
        return this._adsSectionHeader;
      });
      defineSetter(this,  'adsSectionHeader', value => {
        this._adsSectionHeader = value;
      });

      defineGetter(this,  'ctsSectionHeader', () => {
        return this._ctsSectionHeader;
      });
      defineSetter(this,  'ctsSectionHeader', value => {
        this._ctsSectionHeader = value;
      });

      defineGetter(this,  'accValidationService', () => {
        return this._accValidationService;
      });
      defineSetter(this,  'accValidationService', value => {
        this._accValidationService = value;
      });

      defineGetter(this,  'sbssSwiftLookupService', () => {
        return this._sbssSwiftLookupService;
      });
      defineSetter(this,  'sbssSwiftLookupService', value => {
        this._sbssSwiftLookupService = value;
      });

      defineGetter(this,  'sbssResultItemFlexSkin', () => {
        return this._sbssResultItemFlexSkin;
      });
      defineSetter(this,  'sbssResultItemFlexSkin', value => {
        this._sbssResultItemFlexSkin = value;
      });
      defineGetter(this,  'rcsOROptionFlexSkin', () => {
        return this._rcsOROptionFlexSkin;
      });
      defineSetter(this,  'rcsOROptionFlexSkin', value => {
        this._rcsOROptionFlexSkin = value;
      });
      defineGetter(this,  'rcsOROptionLabelSkin', () => {
        return this._rcsOROptionLabelSkin;
      });
      defineSetter(this,  'rcsOROptionLabelSkin', value => {
        this._rcsOROptionLabelSkin = value;
      });

      defineGetter(this,  'rcsVisibility', () => {
        return this._rcsVisibility;
      });
      defineSetter(this,  'rcsVisibility', value => {
        this._rcsVisibility = value;
      });

      defineGetter(this,  'rcsSwiftLookupBtnSkn', () => {
        return this._rcsSwiftLookupBtnSkn;
      });
      defineSetter(this,  'rcsSwiftLookupBtnSkn', value => {
        this._rcsSwiftLookupBtnSkn = value;
      });

      defineGetter(this,  'linkPayeeSectionTitle', () => {
        return this._linkPayeeSectionTitle;
      });
      defineSetter(this,  'linkPayeeSectionTitle', value => {
        this._linkPayeeSectionTitle = value;
      });

      defineGetter(this,  'vfsObject', () => {
        return this._vfsObject;
      });
      defineSetter(this,  'vfsObject', value => {
        this._vfsObject = value;
      });

      defineGetter(this,  'vfssLabelSkin', () => {
        return this._vfssLabelSkin;
      });
      defineSetter(this,  'vfssLabelSkin', value => {
        this._vfssLabelSkin = value;
      });

      defineGetter(this,  'easSectionHeader', () => {
        return this._easSectionHeader;
      });
      defineSetter(this,  'easSectionHeader', value => {
        this._easSectionHeader = value;
      });

      defineGetter(this,  'ccsCountryListService', () => {
        return this._ccsCountryListService;
      });
      defineSetter(this,  'ccsCountryListService', value => {
        this._ccsCountryListService = value;
      });

      defineGetter(this,  'ccssSearchboxFlx', () => {
        return this._ccssSearchboxFlx;
      });
      defineSetter(this,  'ccssSearchboxFlx', value => {
        this._ccssSearchboxFlx = value;
      });

      defineGetter(this,  'phnoSectionHeader', () => {
        return this._phnoSectionHeader;
      });
      defineSetter(this,  'phnoSectionHeader', value => {
        this._phnoSectionHeader = value;
      });

      defineGetter(this,  'pynsSectionHeader', () => {
        return this._pynsSectionHeader;
      });
      defineSetter(this,  'pynsSectionHeader', value => {
        this._pynsSectionHeader = value;
      });

      defineGetter(this,  'phnoLookupSkin', () => {
        return this._phnoLookupSkin;
      });
      defineSetter(this,  'phnoLookupSkin', value => {
        this._phnoLookupSkin = value;
      });

      defineGetter(this,  'accNumericInputBottomSkin', () => {
        return this._accNumericInputBottomSkin;
      });
      defineSetter(this,  'accNumericInputBottomSkin', value => {
        this._accNumericInputBottomSkin = value;
      });

      defineGetter(this,  'iconBack', () => {
        return this._iconBack;
      });
      defineSetter(this,  'iconBack', value => {
        this._iconBack = value;
      });

      defineGetter(this,  'dvfConfig', () => {
        return this._dvfConfig;
      });
      defineSetter(this,  'dvfConfig', value => {
        this._dvfConfig = value;
      });

      defineGetter(this,  'nisSectionHeader', () => {
        return this._nisSectionHeader;
      });
      defineSetter(this,  'nisSectionHeader', value => {
        this._nisSectionHeader = value;
      });

      defineGetter(this,  'eassOROptionFlexSkin', () => {
        return this._eassOROptionFlexSkin;
      });
      defineSetter(this,  'eassOROptionFlexSkin', value => {
        this._eassOROptionFlexSkin = value;
      });

      defineGetter(this,  'sbssResultItemFlexSelectSkin', () => {
        return this._sbssResultItemFlexSelectSkin;
      });
      defineSetter(this,  'sbssResultItemFlexSelectSkin', value => {
        this._sbssResultItemFlexSelectSkin = value;
      });

      defineGetter(this,  'ccssSearchBoxSkin', () => {
        return this._ccssSearchBoxSkin;
      });
      defineSetter(this,  'ccssSearchBoxSkin', value => {
        this._ccssSearchBoxSkin = value;
      });

      defineGetter(this,  'adsSubHeader', () => {
        return this._adsSubHeader;
      });
      defineSetter(this,  'adsSubHeader', value => {
        this._adsSubHeader = value;
      });

      defineGetter(this,  'gsknHeaderFlex', () => {
        return this._gsknHeaderFlex;
      });
      defineSetter(this,  'gsknHeaderFlex', value => {
        this._gsknHeaderFlex = value;
      });

      defineGetter(this,  'ctsValues', () => {
        return this._ctsValues;
      });
      defineSetter(this,  'ctsValues', value => {
        this._ctsValues = value;
      });

      defineGetter(this,  'ctsContactSelectionSkn', () => {
        return this._ctsContactSelectionSkn;
      });
      defineSetter(this,  'ctsContactSelectionSkn', value => {
        this._ctsContactSelectionSkn = value;
      });

      defineGetter(this,  'ctsContactTypeSkn', () => {
        return this._ctsContactTypeSkn;
      });
      defineSetter(this,  'ctsContactTypeSkn', value => {
        this._ctsContactTypeSkn = value;
      });

      defineGetter(this,  'accValidationObject', () => {
        return this._accValidationObject;
      });
      defineSetter(this,  'accValidationObject', value => {
        this._accValidationObject = value;
      });

      defineGetter(this,  'sbssSwiftLookupObject', () => {
        return this._sbssSwiftLookupObject;
      });
      defineSetter(this,  'sbssSwiftLookupObject', value => {
        this._sbssSwiftLookupObject = value;
      });

      defineGetter(this,  'sbssCriteria', () => {
        return this._sbssCriteria;
      });
      defineSetter(this,  'sbssCriteria', value => {
        this._sbssCriteria = value;
      });

      defineGetter(this,  'rcsGetSwiftService', () => {
        return this._rcsGetSwiftService;
      });
      defineSetter(this,  'rcsGetSwiftService', value => {
        this._rcsGetSwiftService = value;
      });
      
      defineGetter(this,  'rcsGetBankDetailsService', () => {
        return this._rcsGetBankDetailsService;
      });
      defineSetter(this,  'rcsGetBankDetailsService', value => {
        this._rcsGetBankDetailsService = value;
      });

      defineGetter(this,  'vfssValueEditableSkin', () => {
        return this._vfssValueEditableSkin;
      });
      defineSetter(this,  'vfssValueEditableSkin', value => {
        this._vfssValueEditableSkin = value;
      });

      defineGetter(this,  'pynsSubHeader', () => {
        return this._pynsSubHeader;
      });
      defineSetter(this,  'pynsSubHeader', value => {
        this._pynsSubHeader = value;
      });

      defineGetter(this,  'easSubHeader', () => {
        return this._easSubHeader;
      });
      defineSetter(this,  'easSubHeader', value => {
        this._easSubHeader = value;
      });

      defineGetter(this,  'ccsCountryListOperation', () => {
        return this._ccsCountryListOperation;
      });
      defineSetter(this,  'ccsCountryListOperation', value => {
        this._ccsCountryListOperation = value;
      });

      defineGetter(this,  'phnosFieldValue', () => {
        return this._phnosFieldValue;
      });
      defineSetter(this,  'phnosFieldValue', value => {
        this._phnosFieldValue = value;
      });

      defineGetter(this,  'phnoSubheader', () => {
        return this._phnoSubheader;
      });
      defineSetter(this,  'phnoSubheader', value => {
        this._phnoSubheader = value;
      });

      defineGetter(this,  'accInputFieldMaskedSkin', () => {
        return this._accInputFieldMaskedSkin;
      });
      defineSetter(this,  'accInputFieldMaskedSkin', value => {
        this._accInputFieldMaskedSkin = value;
      });

      defineGetter(this,  'minFillMapping', () => {
        return this._minFillMapping;
      });
      defineSetter(this,  'minFillMapping', value => {
        this._minFillMapping = value;
      });

      defineGetter(this,  'nisSubHeader', () => {
        return this._nisSubHeader;
      });
      defineSetter(this,  'nisSubHeader', value => {
        this._nisSubHeader = value;
      });

      defineGetter(this,  'eassOROptionLabelSkin', () => {
        return this._eassOROptionLabelSkin;
      });
      defineSetter(this,  'eassOROptionLabelSkin', value => {
        this._eassOROptionLabelSkin = value;
      });

      defineGetter(this,  'pynsVisibility', () => {
        return this._pynsVisibility;
      });
      defineSetter(this,  'pynsVisibility', value => {
        this._pynsVisibility = value;
      });

      defineGetter(this,  'sbssResultItemLabel1Skin', () => {
        return this._sbssResultItemLabel1Skin;
      });
      defineSetter(this,  'sbssResultItemLabel1Skin', value => {
        this._sbssResultItemLabel1Skin = value;
      });

      defineGetter(this,  'ccssResultItemFlex', () => {
        return this._ccssResultItemFlex;
      });
      defineSetter(this,  'ccssResultItemFlex', value => {
        this._ccssResultItemFlex = value;
      });

      defineGetter(this,  'gsknCancelBtn', () => {
        return this._gsknCancelBtn;
      });
      defineSetter(this,  'gsknCancelBtn', value => {
        this._gsknCancelBtn = value;
      });

      defineGetter(this,  'accValidationOperation', () => {
        return this._accValidationOperation;
      });
      defineSetter(this,  'accValidationOperation', value => {
        this._accValidationOperation = value;
      });

      defineGetter(this,  'sbssSwiftLookupOperation', () => {
        return this._sbssSwiftLookupOperation;
      });
      defineSetter(this,  'sbssSwiftLookupOperation', value => {
        this._sbssSwiftLookupOperation = value;
      });

      defineGetter(this,  'rcsSwiftObject', () => {
        return this._rcsSwiftObject;
      });
      defineSetter(this,  'rcsSwiftObject', value => {
        this._rcsSwiftObject = value;
      });
      
      defineGetter(this,  'rcsBankDetailsObject', () => {
        return this._rcsBankDetailsObject;
      });
      defineSetter(this,  'rcsBankDetailsObject', value => {
        this._rcsBankDetailsObject = value;
      });

      defineGetter(this,  'vfssValueReadonlySkin', () => {
        return this._vfssValueReadonlySkin;
      });
      defineSetter(this,  'vfssValueReadonlySkin', value => {
        this._vfssValueReadonlySkin = value;
      });

      defineGetter(this,  'easTextBoxInput', () => {
        return this._easTextBoxInput;
      });
      defineSetter(this,  'easTextBoxInput', value => {
        this._easTextBoxInput = value;
      });

      defineGetter(this,  'ccsCountryListObject', () => {
        return this._ccsCountryListObject;
      });
      defineSetter(this,  'ccsCountryListObject', value => {
        this._ccsCountryListObject = value;
      });

      defineGetter(this,  'phnoKeypadClearIcon', () => {
        return this._phnoKeypadClearIcon;
      });
      defineSetter(this,  'phnoKeypadClearIcon', value => {
        this._phnoKeypadClearIcon = value;
      });

      defineGetter(this,  'accInputFieldUnmaskedSkin', () => {
        return this._accInputFieldUnmaskedSkin;
      });
      defineSetter(this,  'accInputFieldUnmaskedSkin', value => {
        this._accInputFieldUnmaskedSkin = value;
      });

      defineGetter(this,  'adsTextBox1Label', () => {
        return this._adsTextBox1Label;
      });
      defineSetter(this,  'adsTextBox1Label', value => {
        this._adsTextBox1Label = value;
      });

      defineGetter(this,  'maxFillMapping', () => {
        return this._maxFillMapping;
      });
      defineSetter(this,  'maxFillMapping', value => {
        this._maxFillMapping = value;
      });

      defineGetter(this,  'nisTextBoxInput', () => {
        return this._nisTextBoxInput;
      });
      defineSetter(this,  'nisTextBoxInput', value => {
        this._nisTextBoxInput = value;
      });

      defineGetter(this,  'phnosOROptionFlexSkin', () => {
        return this._phnosOROptionFlexSkin;
      });
      defineSetter(this,  'phnosOROptionFlexSkin', value => {
        this._phnosOROptionFlexSkin = value;
      });

      defineGetter(this,  'eassPickEmailSkin', () => {
        return this._eassPickEmailSkin;
      });
      defineSetter(this,  'eassPickEmailSkin', value => {
        this._eassPickEmailSkin = value;
      });

      defineGetter(this,  'pynsTextbox', () => {
        return this._pynsTextbox;
      });
      defineSetter(this,  'pynsTextbox', value => {
        this._pynsTextbox = value;
      });

      defineGetter(this,  'sbssResultItemLabel2Skin', () => {
        return this._sbssResultItemLabel2Skin;
      });
      defineSetter(this,  'sbssResultItemLabel2Skin', value => {
        this._sbssResultItemLabel2Skin = value;
      });

      defineGetter(this,  'ccssResultItemFlexSelected', () => {
        return this._ccssResultItemFlexSelected;
      });
      defineSetter(this,  'ccssResultItemFlexSelected', value => {
        this._ccssResultItemFlexSelected = value;
      });

      defineGetter(this,  'accValidationCriteria', () => {
        return this._accValidationCriteria;
      });
      defineSetter(this,  'accValidationCriteria', value => {
        this._accValidationCriteria = value;
      });

      defineGetter(this,  'sbssSearchResultsIdentifier', () => {
        return this._sbssSearchResultsIdentifier;
      });
      defineSetter(this,  'sbssSearchResultsIdentifier', value => {
        this._sbssSearchResultsIdentifier = value;
      });

      defineGetter(this,  'rcsSwiftOperation', () => {
        return this._rcsSwiftOperation;
      });
      defineSetter(this,  'rcsSwiftOperation', value => {
        this._rcsSwiftOperation = value;
      });  
      
      defineGetter(this,  'rcsBankDetailsOperation', () => {
        return this._rcsBankDetailsOperation;
      });
      defineSetter(this,  'rcsBankDetailsOperation', value => {
        this._rcsBankDetailsOperation = value;
      });

      defineGetter(this,  'vfssRowSkin', () => {
        return this._vfssRowSkin;
      });
      defineSetter(this,  'vfssRowSkin', value => {
        this._vfssRowSkin = value;
      });

      defineGetter(this,  'easErrorMessage', () => {
        return this._easErrorMessage;
      });
      defineSetter(this,  'easErrorMessage', value => {
        this._easErrorMessage = value;
      });

      defineGetter(this,  'ccsCountryListCriteria', () => {
        return this._ccsCountryListCriteria;
      });
      defineSetter(this,  'ccsCountryListCriteria', value => {
        this._ccsCountryListCriteria = value;
      });

      defineGetter(this,  'phnoCCVisibility', () => {
        return this._phnoCCVisibility;
      });
      defineSetter(this,  'phnoCCVisibility', value => {
        this._phnoCCVisibility = value;
      });

      defineGetter(this,  'accNumericInputBottomErrorSkin', () => {
        return this._accNumericInputBottomErrorSkin;
      });
      defineSetter(this,  'accNumericInputBottomErrorSkin', value => {
        this._accNumericInputBottomErrorSkin = value;
      });

      defineGetter(this,  'jsonObjName', () => {
        return this._jsonObjName;
      });
      defineSetter(this,  'jsonObjName', value => {
        this._jsonObjName = value;
      });

      defineGetter(this,  'nisErrorMessage', () => {
        return this._nisErrorMessage;
      });
      defineSetter(this,  'nisErrorMessage', value => {
        this._nisErrorMessage = value;
      });

      defineGetter(this,  'phnosOROptionLabelSkin', () => {
        return this._phnosOROptionLabelSkin;
      });
      defineSetter(this,  'phnosOROptionLabelSkin', value => {
        this._phnosOROptionLabelSkin = value;
      });

      defineGetter(this,  'pynsErrorMessage', () => {
        return this._pynsErrorMessage;
      });
      defineSetter(this,  'pynsErrorMessage', value => {
        this._pynsErrorMessage = value;
      });

      defineGetter(this,  'phnoTxtbox1Label', () => {
        return this._phnoTxtbox1Label;
      });
      defineSetter(this,  'phnoTxtbox1Label', value => {
        this._phnoTxtbox1Label = value;
      });

      defineGetter(this,  'sbssResultItemLabel3Skin', () => {
        return this._sbssResultItemLabel3Skin;
      });
      defineSetter(this,  'sbssResultItemLabel3Skin', value => {
        this._sbssResultItemLabel3Skin = value;
      });

      defineGetter(this,  'ccssSegSortAlphabetSkin', () => {
        return this._ccssSegSortAlphabetSkin;
      });
      defineSetter(this,  'ccssSegSortAlphabetSkin', value => {
        this._ccssSegSortAlphabetSkin = value;
      });

      defineGetter(this,  'beneficiaryTypes', () => {
        return this._beneficiaryTypes;
      });
      defineSetter(this,  'beneficiaryTypes', value => {
        this._beneficiaryTypes = value;
      });

      defineGetter(this,  'accSectionHeader', () => {
        return this._accSectionHeader;
      });
      defineSetter(this,  'accSectionHeader', value => {
        this._accSectionHeader = value;
      });

      defineGetter(this,  'inputValuesPool', () => {
        return this._inputValuesPool;
      });
      defineSetter(this,  'inputValuesPool', value => {
        this._inputValuesPool = value;
      });

      defineGetter(this,  'rcsSwiftCriteria', () => {
        return this._rcsSwiftCriteria;
      });
      defineSetter(this,  'rcsSwiftCriteria', value => {
        this._rcsSwiftCriteria = value;
      });
      
      defineGetter(this,  'rcsBankDetailsCriteria', () => {
        return this._rcsBankDetailsCriteria;
      });
      defineSetter(this,  'rcsBankDetailsCriteria', value => {
        this._rcsBankDetailsCriteria = value;
      });

      defineGetter(this,  'vfssRowSeparator', () => {
        return this._vfssRowSeparator;
      });
      defineSetter(this,  'vfssRowSeparator', value => {
        this._vfssRowSeparator = value;
      });

      defineGetter(this,  'easCTAButton2', () => {
        return this._easCTAButton2;
      });
      defineSetter(this,  'easCTAButton2', value => {
        this._easCTAButton2 = value;
      });

      defineGetter(this,  'ccsCListReponseIdentifier', () => {
        return this._ccsCListReponseIdentifier;
      });
      defineSetter(this,  'ccsCListReponseIdentifier', value => {
        this._ccsCListReponseIdentifier = value;
      });

      defineGetter(this,  'adsTextBox2Label', () => {
        return this._adsTextBox2Label;
      });
      defineSetter(this,  'adsTextBox2Label', value => {
        this._adsTextBox2Label = value;
      });

      defineGetter(this,  'nisCTAButton', () => {
        return this._nisCTAButton;
      });
      defineSetter(this,  'nisCTAButton', value => {
        this._nisCTAButton = value;
      });

      defineGetter(this,  'phnosPickPhoneNoSkin', () => {
        return this._phnosPickPhoneNoSkin;
      });
      defineSetter(this,  'phnosPickPhoneNoSkin', value => {
        this._phnosPickPhoneNoSkin = value;
      });

      defineGetter(this,  'pynsCTAButton', () => {
        return this._pynsCTAButton;
      });
      defineSetter(this,  'pynsCTAButton', value => {
        this._pynsCTAButton = value;
      });

      defineGetter(this,  'phnoTxtbox1', () => {
        return this._phnoTxtbox1;
      });
      defineSetter(this,  'phnoTxtbox1', value => {
        this._phnoTxtbox1 = value;
      });

      defineGetter(this,  'sbssEnableCache', () => {
        return this._sbssEnableCache;
      });
      defineSetter(this,  'sbssEnableCache', value => {
        this._sbssEnableCache = value;
      });

      defineGetter(this,  'ccssSegAlphabetBG', () => {
        return this._ccssSegAlphabetBG;
      });
      defineSetter(this,  'ccssSegAlphabetBG', value => {
        this._ccssSegAlphabetBG = value;
      });

      defineGetter(this,  'gsknSubHeaderFlex', () => {
        return this._gsknSubHeaderFlex;
      });
      defineSetter(this,  'gsknSubHeaderFlex', value => {
        this._gsknSubHeaderFlex = value;
      });

      defineGetter(this,  'accScreen1SubHeader', () => {
        return this._accScreen1SubHeader;
      });
      defineSetter(this,  'accScreen1SubHeader', value => {
        this._accScreen1SubHeader = value;
      });

      defineGetter(this,  'cancelButton', () => {
        return this._cancelButton;
      });
      defineSetter(this,  'cancelButton', value => {
        this._cancelButton = value;
      });

      defineGetter(this,  'rcsSwiftResponseIdentifier', () => {
        return this._rcsSwiftResponseIdentifier;
      });
      defineSetter(this,  'rcsSwiftResponseIdentifier', value => {
        this._rcsSwiftResponseIdentifier = value;
      });
      
      defineGetter(this,  'rcsBankDetailsResponseIdentifier', () => {
        return this._rcsBankDetailsResponseIdentifier;
      });
      defineSetter(this,  'rcsBankDetailsResponseIdentifier', value => {
        this._rcsBankDetailsResponseIdentifier = value;
      });

      defineGetter(this,  'ccsCountryListMasterData', () => {
        return this._ccsCountryListMasterData;
      });
      defineSetter(this,  'ccsCountryListMasterData', value => {
        this._ccsCountryListMasterData = value;
      });

      defineGetter(this,  'adsTextBox2Value', () => {
        return this._adsTextBox2Value;
      });
      defineSetter(this,  'adsTextBox2Value', value => {
        this._adsTextBox2Value = value;
      });

      defineGetter(this,  'easCTAButton1', () => {
        return this._easCTAButton1;
      });
      defineSetter(this,  'easCTAButton1', value => {
        this._easCTAButton1 = value;
      });

      defineGetter(this,  'phnoTxtbox2Label', () => {
        return this._phnoTxtbox2Label;
      });
      defineSetter(this,  'phnoTxtbox2Label', value => {
        this._phnoTxtbox2Label = value;
      });

      defineGetter(this,  'sbssSectionHeader', () => {
        return this._sbssSectionHeader;
      });
      defineSetter(this,  'sbssSectionHeader', value => {
        this._sbssSectionHeader = value;
      });

      defineGetter(this,  'ccssSegLabelSkin', () => {
        return this._ccssSegLabelSkin;
      });
      defineSetter(this,  'ccssSegLabelSkin', value => {
        this._ccssSegLabelSkin = value;
      });

      defineGetter(this,  'rcsAcceptBICSwift', () => {
        return this._rcsAcceptBICSwift;
      });
      defineSetter(this,  'rcsAcceptBICSwift', value => {
        this._rcsAcceptBICSwift = value;
      });

      defineGetter(this,  'gsknSubHeaderLabel', () => {
        return this._gsknSubHeaderLabel;
      });
      defineSetter(this,  'gsknSubHeaderLabel', value => {
        this._gsknSubHeaderLabel = value;
      });

      defineGetter(this,  'accScreen2SubHeader', () => {
        return this._accScreen2SubHeader;
      });
      defineSetter(this,  'accScreen2SubHeader', value => {
        this._accScreen2SubHeader = value;
      });

      defineGetter(this,  'ccsCountryListSource', () => {
        return this._ccsCountryListSource;
      });
      defineSetter(this,  'ccsCountryListSource', value => {
        this._ccsCountryListSource = value;
      });

      defineGetter(this,  'adsTextBox3Label', () => {
        return this._adsTextBox3Label;
      });
      defineSetter(this,  'adsTextBox3Label', value => {
        this._adsTextBox3Label = value;
      });

      defineGetter(this,  'easOROption', () => {
        return this._easOROption;
      });
      defineSetter(this,  'easOROption', value => {
        this._easOROption = value;
      });

      defineGetter(this,  'phnoTxtbox2', () => {
        return this._phnoTxtbox2;
      });
      defineSetter(this,  'phnoTxtbox2', value => {
        this._phnoTxtbox2 = value;
      });

      defineGetter(this,  'sbssSubHeaderTitle1', () => {
        return this._sbssSubHeaderTitle1;
      });
      defineSetter(this,  'sbssSubHeaderTitle1', value => {
        this._sbssSubHeaderTitle1 = value;
      });

      defineGetter(this,  'rcsAcceptClearcode', () => {
        return this._rcsAcceptClearcode;
      });
      defineSetter(this,  'rcsAcceptClearcode', value => {
        this._rcsAcceptClearcode = value;
      });

      defineGetter(this,  'gsknSubHeaderseparator', () => {
        return this._gsknSubHeaderseparator;
      });
      defineSetter(this,  'gsknSubHeaderseparator', value => {
        this._gsknSubHeaderseparator = value;
      });

      defineGetter(this,  'accTxtInput', () => {
        return this._accTxtInput;
      });
      defineSetter(this,  'accTxtInput', value => {
        this._accTxtInput = value;
      });

      defineGetter(this,  'ccsSectionHeader', () => {
        return this._ccsSectionHeader;
      });
      defineSetter(this,  'ccsSectionHeader', value => {
        this._ccsSectionHeader = value;
      });

      defineGetter(this,  'adsTextBox3Value', () => {
        return this._adsTextBox3Value;
      });
      defineSetter(this,  'adsTextBox3Value', value => {
        this._adsTextBox3Value = value;
      });

      defineGetter(this,  'rcsHdr', () => {
        return this._rcsHdr;
      });
      defineSetter(this,  'rcsHdr', value => {
        this._rcsHdr = value;
      });

      defineGetter(this,  'accReTxtInput', () => {
        return this._accReTxtInput;
      });
      defineSetter(this,  'accReTxtInput', value => {
        this._accReTxtInput = value;
      });

      defineGetter(this,  'ccsSearchbox', () => {
        return this._ccsSearchbox;
      });
      defineSetter(this,  'ccsSearchbox', value => {
        this._ccsSearchbox = value;
      });

      defineGetter(this,  'adsTextBox4Label', () => {
        return this._adsTextBox4Label;
      });
      defineSetter(this,  'adsTextBox4Label', value => {
        this._adsTextBox4Label = value;
      });

      defineGetter(this,  'phnoOROption', () => {
        return this._phnoOROption;
      });
      defineSetter(this,  'phnoOROption', value => {
        this._phnoOROption = value;
      });

      defineGetter(this,  'phnoCTABtn1', () => {
        return this._phnoCTABtn1;
      });
      defineSetter(this,  'phnoCTABtn1', value => {
        this._phnoCTABtn1 = value;
      });

      defineGetter(this,  'adsTextBox4Value', () => {
        return this._adsTextBox4Value;
      });
      defineSetter(this,  'adsTextBox4Value', value => {
        this._adsTextBox4Value = value;
      });

      defineGetter(this,  'rcsSubhdr', () => {
        return this._rcsSubhdr;
      });
      defineSetter(this,  'rcsSubhdr', value => {
        this._rcsSubhdr = value;
      });

      defineGetter(this,  'accCTAButton1', () => {
        return this._accCTAButton1;
      });
      defineSetter(this,  'accCTAButton1', value => {
        this._accCTAButton1 = value;
      });

      defineGetter(this,  'vfsObjectService', () => {
        return this._vfsObjectService;
      });
      defineSetter(this,  'vfsObjectService', value => {
        this._vfsObjectService = value;
      });

      defineGetter(this,  'sbssTextbox1Label', () => {
        return this._sbssTextbox1Label;
      });
      defineSetter(this,  'sbssTextbox1Label', value => {
        this._sbssTextbox1Label = value;
      });

      defineGetter(this,  'rcsTextbox1Label', () => {
        return this._rcsTextbox1Label;
      });
      defineSetter(this,  'rcsTextbox1Label', value => {
        this._rcsTextbox1Label = value;
      });

      defineGetter(this,  'accCTAButton2', () => {
        return this._accCTAButton2;
      });
      defineSetter(this,  'accCTAButton2', value => {
        this._accCTAButton2 = value;
      });

      defineGetter(this,  'vfsOperation', () => {
        return this._vfsOperation;
      });
      defineSetter(this,  'vfsOperation', value => {
        this._vfsOperation = value;
      });

      defineGetter(this,  'adsTextBox5Label', () => {
        return this._adsTextBox5Label;
      });
      defineSetter(this,  'adsTextBox5Label', value => {
        this._adsTextBox5Label = value;
      });

      defineGetter(this,  'phnoCTABtn2', () => {
        return this._phnoCTABtn2;
      });
      defineSetter(this,  'phnoCTABtn2', value => {
        this._phnoCTABtn2 = value;
      });

      defineGetter(this,  'phnoCTABtn3', () => {
        return this._phnoCTABtn3;
      });
      defineSetter(this,  'phnoCTABtn3', value => {
        this._phnoCTABtn3 = value;
      });

      defineGetter(this,  'adsTextBox5Value', () => {
        return this._adsTextBox5Value;
      });
      defineSetter(this,  'adsTextBox5Value', value => {
        this._adsTextBox5Value = value;
      });

      defineGetter(this,  'sbssTextbox1', () => {
        return this._sbssTextbox1;
      });
      defineSetter(this,  'sbssTextbox1', value => {
        this._sbssTextbox1 = value;
      });

      defineGetter(this,  'rcsTextbox1', () => {
        return this._rcsTextbox1;
      });
      defineSetter(this,  'rcsTextbox1', value => {
        this._rcsTextbox1 = value;
      });

      defineGetter(this,  'accErrorMessage', () => {
        return this._accErrorMessage;
      });
      defineSetter(this,  'accErrorMessage', value => {
        this._accErrorMessage = value;
      });

      defineGetter(this,  'vfsCriteria', () => {
        return this._vfsCriteria;
      });
      defineSetter(this,  'vfsCriteria', value => {
        this._vfsCriteria = value;
      });

      defineGetter(this,  'sbssTextbox2Label', () => {
        return this._sbssTextbox2Label;
      });
      defineSetter(this,  'sbssTextbox2Label', value => {
        this._sbssTextbox2Label = value;
      });

      defineGetter(this,  'vfsSectionTitle', () => {
        return this._vfsSectionTitle;
      });
      defineSetter(this,  'vfsSectionTitle', value => {
        this._vfsSectionTitle = value;
      });

      defineGetter(this,  'rcsTextbox2Label', () => {
        return this._rcsTextbox2Label;
      });
      defineSetter(this,  'rcsTextbox2Label', value => {
        this._rcsTextbox2Label = value;
      });
      defineGetter(this,  'rcsOROption', () => {
        return this._rcsOROption;
      });
      defineSetter(this,  'rcsOROption', value => {
        this._rcsOROption = value;
      });

      defineGetter(this,  'accReEnterErrorMessage', () => {
        return this._accReEnterErrorMessage;
      });
      defineSetter(this,  'accReEnterErrorMessage', value => {
        this._accReEnterErrorMessage = value;
      });

      defineGetter(this,  'adsTextBox6Label', () => {
        return this._adsTextBox6Label;
      });
      defineSetter(this,  'adsTextBox6Label', value => {
        this._adsTextBox6Label = value;
      });

      defineGetter(this,  'adsTextBox6Value', () => {
        return this._adsTextBox6Value;
      });
      defineSetter(this,  'adsTextBox6Value', value => {
        this._adsTextBox6Value = value;
      });

      defineGetter(this,  'sbssTextbox2', () => {
        return this._sbssTextbox2;
      });
      defineSetter(this,  'sbssTextbox2', value => {
        this._sbssTextbox2 = value;
      });

      defineGetter(this,  'rcsTextbox2', () => {
        return this._rcsTextbox2;
      });
      defineSetter(this,  'rcsTextbox2', value => {
        this._rcsTextbox2 = value;
      });

      defineGetter(this,  'accExistMsg', () => {
        return this._accExistMsg;
      });
      defineSetter(this,  'accExistMsg', value => {
        this._accExistMsg = value;
      });

      defineGetter(this,  'vfsIconEdit', () => {
        return this._vfsIconEdit;
      });
      defineSetter(this,  'vfsIconEdit', value => {
        this._vfsIconEdit = value;
      });

      defineGetter(this,  'sbssTextbox3Label', () => {
        return this._sbssTextbox3Label;
      });
      defineSetter(this,  'sbssTextbox3Label', value => {
        this._sbssTextbox3Label = value;
      });

      defineGetter(this,  'vfsField1Lbl', () => {
        return this._vfsField1Lbl;
      });
      defineSetter(this,  'vfsField1Lbl', value => {
        this._vfsField1Lbl = value;
      });

      defineGetter(this,  'rcsTextbox3Label', () => {
        return this._rcsTextbox3Label;
      });
      defineSetter(this,  'rcsTextbox3Label', value => {
        this._rcsTextbox3Label = value;
      });

      defineGetter(this,  'accInvalidMsg', () => {
        return this._accInvalidMsg;
      });
      defineSetter(this,  'accInvalidMsg', value => {
        this._accInvalidMsg = value;
      });

      defineGetter(this,  'adsErrorMessage', () => {
        return this._adsErrorMessage;
      });
      defineSetter(this,  'adsErrorMessage', value => {
        this._adsErrorMessage = value;
      });

      defineGetter(this,  'adsCTAButton', () => {
        return this._adsCTAButton;
      });
      defineSetter(this,  'adsCTAButton', value => {
        this._adsCTAButton = value;
      });

      defineGetter(this,  'sbssTextbox3', () => {
        return this._sbssTextbox3;
      });
      defineSetter(this,  'sbssTextbox3', value => {
        this._sbssTextbox3 = value;
      });

      defineGetter(this,  'vfsField1Value', () => {
        return this._vfsField1Value;
      });
      defineSetter(this,  'vfsField1Value', value => {
        this._vfsField1Value = value;
      });

      defineGetter(this,  'rcsTextbox3', () => {
        return this._rcsTextbox3;
      });
      defineSetter(this,  'rcsTextbox3', value => {
        this._rcsTextbox3 = value;
      });

      defineGetter(this,  'accKeypadClearIcon', () => {
        return this._accKeypadClearIcon;
      });
      defineSetter(this,  'accKeypadClearIcon', value => {
        this._accKeypadClearIcon = value;
      });

      defineGetter(this,  'sbssTextbox4Label', () => {
        return this._sbssTextbox4Label;
      });
      defineSetter(this,  'sbssTextbox4Label', value => {
        this._sbssTextbox4Label = value;
      });

      defineGetter(this,  'vfsField2Lbl', () => {
        return this._vfsField2Lbl;
      });
      defineSetter(this,  'vfsField2Lbl', value => {
        this._vfsField2Lbl = value;
      });

      defineGetter(this,  'gsknPrimaryContexualBtn', () => {
        return this._gsknPrimaryContexualBtn;
      });
      defineSetter(this,  'gsknPrimaryContexualBtn', value => {
        this._gsknPrimaryContexualBtn = value;
      });

      defineGetter(this,  'gsknSecondaryContexualBtn', () => {
        return this._gsknSecondaryContexualBtn;
      });
      defineSetter(this,  'gsknSecondaryContexualBtn', value => {
        this._gsknSecondaryContexualBtn = value;
      });


      defineGetter(this,  'sbssTextbox4', () => {
        return this._sbssTextbox4;
      });
      defineSetter(this,  'sbssTextbox4', value => {
        this._sbssTextbox4 = value;
      });

      defineGetter(this,  'vfsField2Value', () => {
        return this._vfsField2Value;
      });
      defineSetter(this,  'vfsField2Value', value => {
        this._vfsField2Value = value;
      });

      defineGetter(this,  'sbssCTA1', () => {
        return this._sbssCTA1;
      });
      defineSetter(this,  'sbssCTA1', value => {
        this._sbssCTA1 = value;
      });

      defineGetter(this,  'rcsCTAButton1', () => {
        return this._rcsCTAButton1;
      });
      defineSetter(this,  'rcsCTAButton1', value => {
        this._rcsCTAButton1 = value;
      });

      defineGetter(this,  'vfsField3Lbl', () => {
        return this._vfsField3Lbl;
      });
      defineSetter(this,  'vfsField3Lbl', value => {
        this._vfsField3Lbl = value;
      });

      defineGetter(this,  'gsknDisabledContexualBtn', () => {
        return this._gsknDisabledContexualBtn;
      });
      defineSetter(this,  'gsknDisabledContexualBtn', value => {
        this._gsknDisabledContexualBtn = value;
      });

      defineGetter(this,  'resultScreenSubHeader', () => {
        return this._resultScreenSubHeader;
      });
      defineSetter(this,  'resultScreenSubHeader', value => {
        this._resultScreenSubHeader = value;
      });

      defineGetter(this,  'rcsCTAButton2', () => {
        return this._rcsCTAButton2;
      });
      defineSetter(this,  'rcsCTAButton2', value => {
        this._rcsCTAButton2 = value;
      });

      defineGetter(this,  'sbssResponseObj', () => {
        return this._sbssResponseObj;
      });
      defineSetter(this,  'sbssResponseObj', value => {
        this._sbssResponseObj = value;
      });

      defineGetter(this,  'vfsField3Value', () => {
        return this._vfsField3Value;
      });
      defineSetter(this,  'vfsField3Value', value => {
        this._vfsField3Value = value;
      });

      defineGetter(this,  'resultItemLabel1', () => {
        return this._resultItemLabel1;
      });
      defineSetter(this,  'resultItemLabel1', value => {
        this._resultItemLabel1 = value;
      });

      defineGetter(this,  'vfsField4Lbl', () => {
        return this._vfsField4Lbl;
      });
      defineSetter(this,  'vfsField4Lbl', value => {
        this._vfsField4Lbl = value;
      });

      defineGetter(this,  'resultItemLabel2', () => {
        return this._resultItemLabel2;
      });
      defineSetter(this,  'resultItemLabel2', value => {
        this._resultItemLabel2 = value;
      });

      defineGetter(this,  'vfsField4Value', () => {
        return this._vfsField4Value;
      });
      defineSetter(this,  'vfsField4Value', value => {
        this._vfsField4Value = value;
      });

      defineGetter(this,  'resultItemLabel3', () => {
        return this._resultItemLabel3;
      });
      defineSetter(this,  'resultItemLabel3', value => {
        this._resultItemLabel3 = value;
      });

      defineGetter(this,  'vfsField5Lbl', () => {
        return this._vfsField5Lbl;
      });
      defineSetter(this,  'vfsField5Lbl', value => {
        this._vfsField5Lbl = value;
      });

      defineGetter(this,  'sbssSelectedTickImg', () => {
        return this._sbssSelectedTickImg;
      });
      defineSetter(this,  'sbssSelectedTickImg', value => {
        this._sbssSelectedTickImg = value;
      });

      defineGetter(this,  'verifyField5Value', () => {
        return this._verifyField5Value;
      });
      defineSetter(this,  'verifyField5Value', value => {
        this._verifyField5Value = value;
      });

      defineGetter(this,  'gsknTextBoxNormal', () => {
        return this._gsknTextBoxNormal;
      });
      defineSetter(this,  'gsknTextBoxNormal', value => {
        this._gsknTextBoxNormal = value;
      });

      defineGetter(this,  'sbssCTA2', () => {
        return this._sbssCTA2;
      });
      defineSetter(this,  'sbssCTA2', value => {
        this._sbssCTA2 = value;
      });

      defineGetter(this,  'vfsField6Lbl', () => {
        return this._vfsField6Lbl;
      });
      defineSetter(this,  'vfsField6Lbl', value => {
        this._vfsField6Lbl = value;
      });

      defineGetter(this,  'sbssCTA3', () => {
        return this._sbssCTA3;
      });
      defineSetter(this,  'sbssCTA3', value => {
        this._sbssCTA3 = value;
      });

      defineGetter(this,  'vfsField6Value', () => {
        return this._vfsField6Value;
      });
      defineSetter(this,  'vfsField6Value', value => {
        this._vfsField6Value = value;
      });

      defineGetter(this,  'gsknTextBoxFocus', () => {
        return this._gsknTextBoxFocus;
      });
      defineSetter(this,  'gsknTextBoxFocus', value => {
        this._gsknTextBoxFocus = value;
      });

      defineGetter(this,  'vfsField7Lbl', () => {
        return this._vfsField7Lbl;
      });
      defineSetter(this,  'vfsField7Lbl', value => {
        this._vfsField7Lbl = value;
      });

      defineGetter(this,  'gsknTextBoxError', () => {
        return this._gsknTextBoxError;
      });
      defineSetter(this,  'gsknTextBoxError', value => {
        this._gsknTextBoxError = value;
      });

      defineGetter(this,  'vfsField7Value', () => {
        return this._vfsField7Value;
      });
      defineSetter(this,  'vfsField7Value', value => {
        this._vfsField7Value = value;
      });

      defineGetter(this,  'vfsField8Lbl', () => {
        return this._vfsField8Lbl;
      });
      defineSetter(this,  'vfsField8Lbl', value => {
        this._vfsField8Lbl = value;
      });

      defineGetter(this,  'gsknErrorTextMessage', () => {
        return this._gsknErrorTextMessage;
      });
      defineSetter(this,  'gsknErrorTextMessage', value => {
        this._gsknErrorTextMessage = value;
      });

      defineGetter(this,  'vfsField8Value', () => {
        return this._vfsField8Value;
      });
      defineSetter(this,  'vfsField8Value', value => {
        this._vfsField8Value = value;
      });

      defineGetter(this,  'vfsField9Lbl', () => {
        return this._vfsField9Lbl;
      });
      defineSetter(this,  'vfsField9Lbl', value => {
        this._vfsField9Lbl = value;
      });

      defineGetter(this,  'vfsField9Value', () => {
        return this._vfsField9Value;
      });
      defineSetter(this,  'vfsField9Value', value => {
        this._vfsField9Value = value;
      });

      defineGetter(this,  'vfsField10Lbl', () => {
        return this._vfsField10Lbl;
      });
      defineSetter(this,  'vfsField10Lbl', value => {
        this._vfsField10Lbl = value;
      });

      defineGetter(this,  'vfsField10Value', () => {
        return this._vfsField10Value;
      });
      defineSetter(this,  'vfsField10Value', value => {
        this._vfsField10Value = value;
      });

      defineGetter(this,  'vfsField11Lbl', () => {
        return this._vfsField11Lbl;
      });
      defineSetter(this,  'vfsField11Lbl', value => {
        this._vfsField11Lbl = value;
      });

      defineGetter(this,  'gsknInputFieldLabel', () => {
        return this._gsknInputFieldLabel;
      });
      defineSetter(this,  'gsknInputFieldLabel', value => {
        this._gsknInputFieldLabel = value;
      });

      defineGetter(this,  'vfsField11Value', () => {
        return this._vfsField11Value;
      });
      defineSetter(this,  'vfsField11Value', value => {
        this._vfsField11Value = value;
      });

      defineGetter(this,  'vfsField12Lbl', () => {
        return this._vfsField12Lbl;
      });
      defineSetter(this,  'vfsField12Lbl', value => {
        this._vfsField12Lbl = value;
      });

      defineGetter(this,  'vfsField12Value', () => {
        return this._vfsField12Value;
      });
      defineSetter(this,  'vfsField12Value', value => {
        this._vfsField12Value = value;
      });

      defineGetter(this,  'vfsField13Lbl', () => {
        return this._vfsField13Lbl;
      });
      defineSetter(this,  'vfsField13Lbl', value => {
        this._vfsField13Lbl = value;
      });

      defineGetter(this,  'gsknContentFlex', () => {
        return this._gsknContentFlex;
      });
      defineSetter(this,  'gsknContentFlex', value => {
        this._gsknContentFlex = value;
      });

      defineGetter(this,  'vfsField13Value', () => {
        return this._vfsField13Value;
      });
      defineSetter(this,  'vfsField13Value', value => {
        this._vfsField13Value = value;
      });

      defineGetter(this,  'vfsField14Lbl', () => {
        return this._vfsField14Lbl;
      });
      defineSetter(this,  'vfsField14Lbl', value => {
        this._vfsField14Lbl = value;
      });

      defineGetter(this,  'vfsField14Value', () => {
        return this._vfsField14Value;
      });
      defineSetter(this,  'vfsField14Value', value => {
        this._vfsField14Value = value;
      });

      defineGetter(this,  'vfsField15Lbl', () => {
        return this._vfsField15Lbl;
      });
      defineSetter(this,  'vfsField15Lbl', value => {
        this._vfsField15Lbl = value;
      });

      defineGetter(this,  'vfsField15Value', () => {
        return this._vfsField15Value;
      });
      defineSetter(this,  'vfsField15Value', value => {
        this._vfsField15Value = value;
      });

      defineGetter(this,  'vfsPayeeAddLbl', () => {
        return this._vfsPayeeAddLbl;
      });
      defineSetter(this,  'vfsPayeeAddLbl', value => {
        this._vfsPayeeAddLbl = value;
      });

      defineGetter(this,  'vfsField1Address', () => {
        return this._vfsField1Address;
      });
      defineSetter(this,  'vfsField1Address', value => {
        this._vfsField1Address = value;
      });

      defineGetter(this,  'vfsField2Address', () => {
        return this._vfsField2Address;
      });
      defineSetter(this,  'vfsField2Address', value => {
        this._vfsField2Address = value;
      });

      defineGetter(this,  'vfsField3Address', () => {
        return this._vfsField3Address;
      });
      defineSetter(this,  'vfsField3Address', value => {
        this._vfsField3Address = value;
      });

      defineGetter(this,  'vfsField4Address', () => {
        return this._vfsField4Address;
      });
      defineSetter(this,  'vfsField4Address', value => {
        this._vfsField4Address = value;
      });

      defineGetter(this,  'vfsField5Address', () => {
        return this._vfsField5Address;
      });
      defineSetter(this,  'vfsField5Address', value => {
        this._vfsField5Address = value;
      });

      defineGetter(this,  'vfsField6Address', () => {
        return this._vfsField6Address;
      });
      defineSetter(this,  'vfsField6Address', value => {
        this._vfsField6Address = value;
      });

      defineGetter(this,  'vfsCTAButton1', () => {
        return this._vfsCTAButton1;
      });
      defineSetter(this,  'vfsCTAButton1', value => {
        this._vfsCTAButton1 = value;
      });

      defineGetter(this,  'vfsCTAButton2', () => {
        return this._vfsCTAButton2;
      });
      defineSetter(this,  'vfsCTAButton2', value => {
        this._vfsCTAButton2 = value;
      });
      defineGetter(this,  'textBox1Visibility', () => {
        return this._textBox1Visibility;
      });
      defineSetter(this,  'textBox1Visibility', value => {
        this._textBox1Visibility = value;
      });

      defineGetter(this,  'textBox2Visibility', () => {
        return this._textBox2Visibility;
      });
      defineSetter(this,  'textBox2Visibility', value => {
        this._textBox2Visibility = value;
      });

      defineGetter(this,  'textBox3Visibility', () => {
        return this._textBox3Visibility;
      });
      defineSetter(this,  'textBox3Visibility', value => {
        this._textBox3Visibility = value;
      });

      defineGetter(this,  'textBox4Visibility', () => {
        return this._textBox4Visibility;
      });
      defineSetter(this,  'textBox4Visibility', value => {
        this._textBox4Visibility = value;
      });

      defineGetter(this,  'textBox5Visibility', () => {
        return this._textBox5Visibility;
      });
      defineSetter(this,  'textBox5Visibility', value => {
        this._textBox5Visibility = value;
      });

      defineGetter(this,  'textBox6Visibility', () => {
        return this._textBox6Visibility;
      });
      defineSetter(this,  'textBox6Visibility', value => {
        this._textBox6Visibility = value;
      });

      defineGetter(this,  'adsTextBox1Value', () => {
        return this._adsTextBox1Value;
      });
      defineSetter(this,  'adsTextBox1Value', value => {
        this._adsTextBox1Value = value;
      });
      defineGetter(this,  'rcsLabel1', () => {
        return this._rcsLabel1;
      });
      defineSetter(this,  'rcsLabel1', value => {
        this._rcsLabel1 = value;
      });
      defineGetter(this,  'rcsLabel2', () => {
        return this._rcsLabel2;
      });
      defineSetter(this,  'rcsLabel2', value => {
        this._rcsLabel2 = value;
      });
      defineGetter(this,  'rcsLabel3', () => {
        return this._rcsLabel3;
      });
      defineSetter(this,  'rcsLabel3', value => {
        this._rcsLabel3 = value;
      });
      defineGetter(this,  'rcsLabel4', () => {
        return this._rcsLabel4;
      });
      defineSetter(this,  'rcsLabel4', value => {
        this._rcsLabel4 = value;
      });
      defineGetter(this,  'rcsLabel5', () => {
        return this._rcsLabel5;
      });
      defineSetter(this,  'rcsLabel5', value => {
        this._rcsLabel5 = value;
      });
      defineGetter(this,  'rcsLabel6', () => {
        return this._rcsLabel6;
      });
      defineSetter(this,  'rcsLabel6', value => {
        this._rcsLabel6 = value;
      });
      defineGetter(this,  'rcsValue1', () => {
        return this._rcsValue1;
      });
      defineSetter(this,  'rcsValue1', value => {
        this._rcsValue1 = value;
      });
      defineGetter(this,  'rcsValue2', () => {
        return this._rcsValue2;
      });
      defineSetter(this,  'rcsValue2', value => {
        this._rcsValue2 = value;
      });
      defineGetter(this,  'rcsValue3', () => {
        return this._rcsValue3;
      });
      defineSetter(this,  'rcsValue3', value => {
        this._rcsValue3 = value;
      });
      defineGetter(this,  'rcsValue4', () => {
        return this._rcsValue4;
      });
      defineSetter(this,  'rcsValue4', value => {
        this._rcsValue4 = value;
      });
      defineGetter(this,  'rcsValue5', () => {
        return this._rcsValue5;
      });
      defineSetter(this,  'rcsValue5', value => {
        this._rcsValue5 = value;
      });
      defineGetter(this,  'rcsValue6', () => {
        return this._rcsValue6;
      });
      defineSetter(this,  'rcsValue6', value => {
        this._rcsValue6 = value;
      });
      defineGetter(this,  'cicService', () => {
        return this._cicService;
      });
      defineSetter(this,  'cicService', value => {
        this._cicService = value;
      });
      defineGetter(this,  'cicObject', () => {
        return this._cicObject;
      });
      defineSetter(this,  'cicObject', value => {
        this._cicObject = value;
      });
      defineGetter(this,  'cicVerb', () => {
        return this._cicVerb;
      });
      defineSetter(this,  'cicVerb', value => {
        this._cicVerb = value;
      });
      defineGetter(this,  'cicCriteria', () => {
        return this._cicCriteria;
      });
      defineSetter(this,  'cicCriteria', value => {
        this._cicCriteria = value;
      });
      defineGetter(this,  'getAllCountriesService', () => {
        return this._getAllCountriesService;
      });
      defineSetter(this,  'getAllCountriesService', value => {
        this._getAllCountriesService = value;
      });
      defineGetter(this,  'getAllCountriesObject', () => {
        return this._getAllCountriesObject;
      });
      defineSetter(this,  'getAllCountriesObject', value => {
        this._getAllCountriesObject = value;
      });
      defineGetter(this,  'getAllCountriesVerb', () => {
        return this._getAllCountriesVerb;
      });
      defineSetter(this,  'getAllCountriesVerb', value => {
        this._getAllCountriesVerb = value;
      });
      defineGetter(this,  'getAllCountriesCriteria', () => {
        return this._getAllCountriesCriteria;
      });
      defineSetter(this,  'getAllCountriesCriteria', value => {
        this._getAllCountriesCriteria = value;
      });
      
      defineGetter(this,  'pbsHeader', () => {
        return this._pbsHeader;
      });
      defineSetter(this,  'pbsHeader', value => {
        this._pbsHeader = value;
      });

      defineGetter(this,  'pbsSubHeader', () => {
        return this._pbsSubHeader;
      });
      defineSetter(this,  'pbsSubHeader', value => {
        this._pbsSubHeader = value;
      });

      defineGetter(this,  'pbsTextBox', () => {
        return this._pbsTextBox;
      });
      defineSetter(this,  'pbsTextBox', value => {
        this._pbsTextBox = value;
      });

      defineGetter(this,  'pbsCTA', () => {
        return this._pbsCTA;
      });
      defineSetter(this,  'pbsCTA', value => {
        this._pbsCTA = value;
      });

      defineGetter(this,  'pbtHeader', () => {
        return this._pbtHeader;
      });
      defineSetter(this,  'pbtHeader', value => {
        this._pbtHeader = value;
      });

      defineGetter(this,  'pbtSubHeader', () => {
        return this._pbtSubHeader;
      });
      defineSetter(this,  'pbtSubHeader', value => {
        this._pbtSubHeader = value;
      });

      defineGetter(this,  'pbtTextBox', () => {
        return this._pbtTextBox;
      });
      defineSetter(this,  'pbtTextBox', value => {
        this._pbtTextBox = value;
      });

      defineGetter(this,  'pbtCTA', () => {
        return this._pbtCTA;
      });
      defineSetter(this,  'pbtCTA', value => {
        this._pbtCTA = value;
      });

      defineGetter(this,  'pbcHeader', () => {
        return this._pbcHeader;
      });
      defineSetter(this,  'pbcHeader', value => {
        this._pbcHeader = value;
      });

      defineGetter(this,  'cicHeader', () => {
        return this._cicHeader;
      });
      defineSetter(this,  'cicHeader', value => {
        this._cicHeader = value;
      });

      defineGetter(this,  'pbnHeader', () => {
        return this._pbnHeader;
      });
      defineSetter(this,  'pbnHeader', value => {
        this._pbnHeader = value;
      });

      defineGetter(this,  'pbnSubHeader', () => {
        return this._pbnSubHeader;
      });
      defineSetter(this,  'pbnSubHeader', value => {
        this._pbnSubHeader = value;
      });

      defineGetter(this,  'pbnTextBox', () => {
        return this._pbnTextBox;
      });
      defineSetter(this,  'pbnTextBox', value => {
        this._pbnTextBox = value;
      });

      defineGetter(this,  'pbnCTA', () => {
        return this._pbnCTA;
      });
      defineSetter(this,  'pbnCTA', value => {
        this._pbnCTA = value;
      });

      defineGetter(this,  'intermediaryBICHeader', () => {
        return this._intermediaryBICHeader;
      });
      defineSetter(this,  'intermediaryBICHeader', value => {
        this._intermediaryBICHeader = value;
      });

      defineGetter(this,  'intermediaryBICSubHeader', () => {
        return this._intermediaryBICSubHeader;
      });
      defineSetter(this,  'intermediaryBICSubHeader', value => {
        this._intermediaryBICSubHeader = value;
      });

      defineGetter(this,  'intermediaryBICTextBox', () => {
        return this._intermediaryBICTextBox;
      });
      defineSetter(this,  'intermediaryBICTextBox', value => {
        this._intermediaryBICTextBox = value;
      });

      defineGetter(this,  'intermediaryBICCTA', () => {
        return this._intermediaryBICCTA;
      });
      defineSetter(this,  'intermediaryBICCTA', value => {
        this._intermediaryBICCTA = value;
      });
      defineGetter(this,  'bccBankClearingLookupService', () => {
        return this._bccBankClearingLookupService;
      });
      defineSetter(this,  'bccBankClearingLookupService', value => {
        this._bccBankClearingLookupService = value;
      });

      defineGetter(this,  'bccBankClearingLookupObject', () => {
        return this._bccBankClearingLookupObject;
      });
      defineSetter(this,  'bccBankClearingLookupObject', value => {
        this._bccBankClearingLookupObject = value;
      });

      defineGetter(this,  'bccBankClearingLookupOperation', () => {
        return this._bccBankClearingLookupOperation;
      });
      defineSetter(this,  'bccBankClearingLookupOperation', value => {
        this._bccBankClearingLookupOperation = value;
      });

      defineGetter(this,  'bccSearchresultidentifier', () => {
        return this._bccSearchresultidentifier;
      });
      defineSetter(this,  'bccSearchresultidentifier', value => {
        this._bccSearchresultidentifier = value;
      });

      defineGetter(this,  'bccEnableCache', () => {
        return this._bccEnableCache;
      });
      defineSetter(this,  'bccEnableCache', value => {
        this._bccEnableCache = value;
      });

      defineGetter(this,  'bccSectionHeader', () => {
        return this._bccSectionHeader;
      });
      defineSetter(this,  'bccSectionHeader', value => {
        this._bccSectionHeader = value;
      });

      defineGetter(this,  'bccSubHeader', () => {
        return this._bccSubHeader;
      });
      defineSetter(this,  'bccSubHeader', value => {
        this._bccSubHeader = value;
      });

      defineGetter(this,  'bccTextbox1Label', () => {
        return this._bccTextbox1Label;
      });
      defineSetter(this,  'bccTextbox1Label', value => {
        this._bccTextbox1Label = value;
      });

      defineGetter(this,  'bccTextbox2Label', () => {
        return this._bccTextbox2Label;
      });
      defineSetter(this,  'bccTextbox2Label', value => {
        this._bccTextbox2Label = value;
      });

      defineGetter(this,  'bccTextbox3Label', () => {
        return this._bccTextbox3Label;
      });
      defineSetter(this,  'bccTextbox3Label', value => {
        this._bccTextbox3Label = value;
      });

      defineGetter(this,  'bccTextbox1', () => {
        return this._bccTextbox1;
      });
      defineSetter(this,  'bccTextbox1', value => {
        this._bccTextbox1 = value;
      });

      defineGetter(this,  'bccTextbox2', () => {
        return this._bccTextbox2;
      });
      defineSetter(this,  'bccTextbox2', value => {
        this._bccTextbox2 = value;
      });

      defineGetter(this,  'bccTextbox3', () => {
        return this._bccTextbox3;
      });
      defineSetter(this,  'bccTextbox3', value => {
        this._bccTextbox3 = value;
      });

      defineGetter(this,  'bccCta1', () => {
        return this._bccCta1;
      });
      defineSetter(this,  'bccCta1', value => {
        this._bccCta1 = value;
      });

      defineGetter(this,  'bccCta2', () => {
        return this._bccCta2;
      });
      defineSetter(this,  'bccCta2', value => {
        this._bccCta2 = value;
      });

      defineGetter(this,  'bccCta3', () => {
        return this._bccCta3;
      });
      defineSetter(this,  'bccCta3', value => {
        this._bccCta3 = value;
      });

      defineGetter(this,  'bccResultsubHeader', () => {
        return this._bccResultsubHeader;
      });
      defineSetter(this,  'bccResultsubHeader', value => {
        this._bccResultsubHeader = value;
      });

      defineGetter(this,  'bccResultItemLabel1', () => {
        return this._bccResultItemLabel1;
      });
      defineSetter(this,  'bccResultItemLabel1', value => {
        this._bccResultItemLabel1 = value;
      });

      defineGetter(this,  'bccResultItemLabel2', () => {
        return this._bccResultItemLabel2;
      });
      defineSetter(this,  'bccResultItemLabel2', value => {
        this._bccResultItemLabel2 = value;
      });

      defineGetter(this,  'bccResultItemLabel3', () => {
        return this._bccResultItemLabel3;
      });
      defineSetter(this,  'bccResultItemLabel3', value => {
        this._bccResultItemLabel3 = value;
      });

      defineGetter(this,  'bccSelectedTick', () => {
        return this._bccSelectedTick;
      });
      defineSetter(this,  'bccSelectedTick', value => {
        this._bccSelectedTick = value;
      });

      defineGetter(this,  'bccLookupCriteria', () => {
        return this._bccLookupCriteria;
      });
      defineSetter(this,  'bccLookupCriteria', value => {
        this._bccLookupCriteria = value;
      });

      defineGetter(this,  'bccresponse', () => {
        return this._bccresponse;
      });
      defineSetter(this,  'bccresponse', value => {
        this._bccresponse = value;
      });

    },

    /**
     * Component setContext.
     * To collect the context object required for the component. 
     * @param: context{JSONobject} - account object.
     */
    setContext: function(context) {
      try{
        
        this.context = context;
        this.parserUtilsManager.setContext(context);
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setContext method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    
    
    /**
     * Component preShow
     * Reponsible to retain the data for custom properties for multiple entries into the component
     * Invoke the DAO layer to collect information from the service
     */
    preShow: function() {
      try {
          
        this.keypadString = '';
        this.inputPool = {}; 
        this.mandatoryInputs = 0;
        this.mandatoryInputsValue = 0;
        this.payeeNameTextChange=false;
        this.setFlexVisibilty();
        this.newPayee = false;
        this.payeeFlow = ""; 
        this.isSingleUser = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
        this.inputPool["flowType"] = "AddPayeeFlow";
        if(Object.keys(this.context).length === 0)
        {
          this.setPayeeName("ADD");    
          this.view.LinkPayeeCustomer.onLinkPayeeContinue=this.onLinkPayeeContinue;
          if(this._beneficiaryTypes==="SameBank" && this._pynsVisibility===false)
          {
            this.setAccountNumber("ADD");
            this.navigateTo("flxAccountNumber", "flxAccountNumberTop", this.getFieldValue(this._accSectionHeader));          
          }
          else{       
            this.setPayeeName("ADD");
            this.navigateTo("flxPayeeName", "flxPayeeNameTop", this.getFieldValue(this._pynsSectionHeader));                      
          }     
        }
        else
        {
          
          this.inputPool = Object.assign(this.inputPool,this.context);
          this.inputPool["flowType"] = "SavePayeeFlow";
          this.setVerifyDetails();
          this.navigateTo("flxVerifyDetails", "flxVfsHeaderTop", this.getFieldValue(this._vfsSectionTitle));
        }
        if (this.view.info === undefined || this.view.info === null) {
          this.view.info = {};
        }
        this.view.doLayout = function(){
          this.view.info.frame = this.view.frame;
        }.bind(this);
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in preshow method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },    
    

    
    /**
     * Component setFlexVisibilty
     * To set all the flex visbility as off.
     **/
    setFlexVisibilty: function() {
      try {
       
        var widgets = this.view.widgets();
         for(var i=0; i<widgets.length; i++) {
          widgets[i].isVisible = false;
        }
        this.stack = [];
        this.headerTitleStack  = [];
        this.fileNames = [];
        this.fileContents = [];
        this.fileTypes= [];
        this.selectedFlowType = "";
        this.view.forceLayout();
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setFlexVisibilty method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * @Component : enableButton
     * To set skin and enable specific button.
     * @return : NA
     */
    enableButton: function(btnName) {
      try {
       
        this.view[btnName].setEnabled(true);
        this.view[btnName].skin = this.getFieldValue(this._gsknPrimaryContexualBtn);
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in enableButton method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * @Component : disableButton
     * To set skin and disable specific button.
     * @return : NA
     */
    disableButton: function(btnName) {
      try {
        
        this.view[btnName].setEnabled(false);
        this.view[btnName].skin = this.getFieldValue(this._gsknDisabledContexualBtn);
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in disableButton method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component getFieldValue
     * Parse the exposed contract value based on accountType selected and breakpoint consideration
     * @param: Value{string} - value collected from exposed contract
     * @param: key{string} - lookup key in the JSON string
     * @return : {string} - Processed value
     */
    getFieldValue: function (Value, key) {
      try {
        var value = Value;
        if (value["default"]) {
          value = value["default"];
        }  
        if (!this.isEmptyNullUndefined(value) && !this.isEmptyNullUndefined(key)) {
          value = value[key];
        }
        if (value.includes("inputPool")){
          value = value.split(".")[2];
          value=value.slice(0,-1);
          if(!this.isEmptyNullUndefined(this.inputPool[value]))
          {
            return this.inputPool[value];
          }
          else
          {
            return "";
          }
        }
        if (value !== null && value !== "" && value !== undefined) {
          return this.getProcessedText(value);
        } else
          return "";
      } catch (err) {
        kony.print(err);
      }
      return this.getProcessedText(value);
    },

    /**
     * Component setHeaderProperties
     * To make custom header visibility based on platform.
     */
    setHeaderProperties: function(headerFlex) {
      try {
        
        if(kony.os.deviceInfo().name === "iPhone") {
          this.view[headerFlex].setVisibility(false);
        } else {
          this.view[headerFlex].setVisibility(true);
        }
        this.view.forceLayout();
      } catch (err) {
        var errorObj = {
          "errorInfo": "Error in setHeaderProperties method of the component.",
          "errorLevel": "Configuration",
          "error": err
        };
        this.onError(errorObj);
      } 
    },
     
   
    /*
    * component setAddAddress
    * Contains the default function of Add Address Screen
    */
    setAddAddress(){
      
      this.setAddAddressDefaultText();
      this.setAddAddressSkins();
      this.setAddAddressActions();
      this.setAddAddressData();
    },
    /*
    * component setAddAddressDefaultText
    * Setting default text for Add Address Screen
    */
    setAddAddressDefaultText: function(){
      
      this.view.imgAddAddressBack.src = this.getFieldValue(this._iconBack);
      this.view.btnAddAddressCancel.text = this.getFieldValue(this._cancelButton);
      this.view.lblAddAddressHeader.text = this.getFieldValue(this._adsSectionHeader);
      this.view.lblAddAddressSubHeader.text = this.getFieldValue(this._adsSubHeader);
      for(var i=1;i<=6;i++){
        this.view["lblAddressField"+i].text = this.getFieldValue(this["_adsTextBox"+i+"Label"]);
        this.view["txtAddressFieldValue"+i].placeholder = this.getFieldValue(this["_adsTextBox"+i+"Value"], "placeHolder");
      }
      this.view.txtAddressFieldValue1.maxTextLength = parseInt(this.getFieldValue(this._maxFillMapping)[this._jsonObjName]["txtBoxAddressLine01"]);
      this.view.txtAddressFieldValue2.maxTextLength = parseInt(this.getFieldValue(this._maxFillMapping)[this._jsonObjName]["txtBoxAddressLine02"]);
      this.view.txtAddressFieldValue3.maxTextLength = parseInt(this.getFieldValue(this._maxFillMapping)[this._jsonObjName]["txtBoxCountry"]);
      this.view.txtAddressFieldValue4.maxTextLength = parseInt(this.getFieldValue(this._maxFillMapping)[this._jsonObjName]["txtBoxState"]);
      this.view.txtAddressFieldValue5.maxTextLength = parseInt(this.getFieldValue(this._maxFillMapping)[this._jsonObjName]["txtBoxCity"]);
      this.view.txtAddressFieldValue6.maxTextLength = parseInt(this.getFieldValue(this._maxFillMapping)[this._jsonObjName]["txtBoxPostalCode"]);
      this.view.txtAddressFieldValue3.restrictCharactersSet = this.getFieldValue(this._adsTextBox3Value,"restrictChar");
      this.view.lblAddAddressErrorMsg.text = this.getFieldValue(this._adsErrorMessage);
      this.view.btnSave.text= this.getFieldValue(this._adsCTAButton, "text");
    },
    /*
    * component setAddAddressSkins
    * Setting default skins for Add Address Screen
    */
    setAddAddressSkins: function(){
      
      this.view.flxAddAddressHeader.skin = this.getFieldValue(this._gsknHeaderFlex);
      this.view.btnAddAddressCancel.skin = this.getFieldValue(this._gsknCancelBtn);
      this.view.lblAddAddressHeader.skin = this.getFieldValue(this._gsknHeaderLbl);
      this.view.lblAddAddressSubHeader.skin = this.getFieldValue(this._gsknSubHeaderTitle);
      this.view.flxAddAddressSeparator.skin = this.getFieldValue(this._gsknSubHeaderseparator);
      this.view.lblAddAddressErrorMsg.skin = this.getFieldValue(this._gsknErrorTextMessage);
      for(var i=1;i<=6;i++){																											
        this.view["txtAddressFieldValue"+i].skin = this.getFieldValue(this._gsknTextBoxNormal);
        this.view["txtAddressFieldValue"+i].focusSkin = this.getFieldValue(this._gsknTextBoxFocus);
      }
      this.view.btnSave.skin = this.getFieldValue(this._gsknDisabledContexualBtn);
    },
    /*
    * component setAddAddressActions
    * Setting default actions for Add Address Screen
    */
    setAddAddressActions: function(){
      var scope = this;
      scope.view.btnSave.onClick = scope.addAddressInputValidation;
      scope.view.flxAddAddressBack.onTouchEnd = scope.goBack;
      scope.view.btnAddAddressCancel.onClick = scope.onBackButtonClick;
      scope.view.txtAddressFieldValue1.onTextChange = scope.onAddAddressTextChange;
      scope.view.txtAddressFieldValue2.onTextChange = scope.onAddAddressTextChange;
      scope.view.txtAddressFieldValue3.onTextChange = scope.onAddAddressTextChange;
      //scope.view.txtAddressFieldValue4.onTextChange = scope.onAddAddressTextChange;
      scope.view.txtAddressFieldValue5.onTextChange = scope.onAddAddressTextChange;
      scope.view.txtAddressFieldValue6.onTextChange = scope.onAddAddressTextChange;

      scope.view.txtAddressFieldValue1.onEndEditing = scope.onAddAddressEndEditing.bind(this, "txtBoxAddressLine01");
      scope.view.txtAddressFieldValue2.onEndEditing = scope.onAddAddressEndEditing.bind(this, "txtBoxAddressLine02");
      scope.view.txtAddressFieldValue3.onEndEditing = scope.onAddAddressEndEditing.bind(this, "txtBoxCountry");
      //scope.view.txtAddressFieldValue4.onEndEditing = scope.onAddAddressEndEditing.bind(this, "txtBoxState");
      scope.view.txtAddressFieldValue5.onEndEditing = scope.onAddAddressEndEditing.bind(this, "txtBoxCity");
      scope.view.txtAddressFieldValue6.onEndEditing = scope.onAddAddressEndEditing.bind(this, "txtBoxPostalCode");
    },   
    /*
    * onAddAddressTextChange
    * sets onTextChange actions
    */
    onAddAddressTextChange: function(){
      try{
        		   											 											 
        for(var i=1;i<=6;i++){        
          this.view["txtAddressFieldValue"+i].skin = this.getFieldValue(this._gsknTextBoxNormal);
          this.view["txtAddressFieldValue"+i].focusSkin = this.getFieldValue(this._gsknTextBoxFocus);
        }
        this.view.lblAddAddressErrorMsg.setVisibility(false);
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in onAddAddressTextChange method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
      }
    },
    /*
    * onAddAddressEndEditing
    * logic for onEndEditing in address screen
    */
    onAddAddressEndEditing: function(textBoxName){
      try{
        
        var errorText = "";
        var addAddress={
          "txtBoxAddressLine01":  this.view.txtAddressFieldValue1.text,
          "txtBoxAddressLine02":  this.view.txtAddressFieldValue2.text,
          "txtBoxCountry":  this.view.txtAddressFieldValue3.text,
          /*"txtBoxState":  this.view.txtAddressFieldValue4.text,*/
          "txtBoxCity":  this.view.txtAddressFieldValue5.text,
          "txtBoxPostalCode":  this.view.txtAddressFieldValue6.text
        };       
        var minlength = this.minFillValidate(addAddress);
        var maxlength = this.maxFillValidate(addAddress);
        if(Object.keys(minlength).length === 0 && minlength.constructor === Object && Object.keys(maxlength).length === 0 && maxlength.constructor === Object){
          this.enableButton("btnSave");           
        } else{
          this.disableButton("btnSave");
          var fieldText = addAddress[textBoxName];
          var minimumLength = minlength[textBoxName];
          if(!this.isEmptyNullUndefined(minimumLength)) {
            minimumLength = minimumLength.slice(minimumLength.lastIndexOf(' '));
          }
          var maximumLength = maxlength[textBoxName];
          if(!this.isEmptyNullUndefined(maximumLength)) {
            maximumLength = maximumLength.slice(maximumLength.lastIndexOf(' '));
          }
          if((this.isEmptyNullUndefined(maximumLength)) && (!this.isEmptyNullUndefined(minimumLength)) && (!this.isEmptyNullUndefined(fieldText))) {
            errorText = "minimum "+minimumLength;
          }
          else if((this.isEmptyNullUndefined(minimumLength)) && (!this.isEmptyNullUndefined(maximumLength))&& (!this.isEmptyNullUndefined(fieldText))) {
            errorText = "maximum "+maximumLength;
          }
          else{
            errorText = "";
          }
          if(!this.isEmptyNullUndefined(errorText)){
            if(!this.isEmptyNullUndefined(textBoxName)){
              switch(textBoxName){
                case "txtBoxAddressLine01":
                  this.view.lblAddAddressErrorMsg.setVisibility(true);
                  this.view.txtAddressFieldValue1.skin = this._gsknTextBoxError;
                  this.view.txtAddressFieldValue1.focusSkin = this._gsknTextBoxError;
                  this.view.lblAddAddressErrorMsg.text = "Length of AddressLine1 should be "+errorText;
                  break;
                case "txtBoxAddressLine02":
                  this.view.lblAddAddressErrorMsg.setVisibility(true);
                  this.view.txtAddressFieldValue2.skin = this._gsknTextBoxError;
                  this.view.txtAddressFieldValue2.focusSkin = this._gsknTextBoxError;
                  this.view.lblAddAddressErrorMsg.text = "Length of AddressLine2 should be "+errorText;
                  break;
                case "txtBoxCountry":
                  this.view.lblAddAddressErrorMsg.setVisibility(true);
                  this.view.txtAddressFieldValue3.skin = this._gsknTextBoxError;
                  this.view.txtAddressFieldValue3.focusSkin = this._gsknTextBoxError;
                  this.view.lblAddAddressErrorMsg.text = "Length of Country should be "+errorText;
                  break;
//                 case "txtBoxState":
//                   this.view.lblAddAddressErrorMsg.setVisibility(true);
//                   this.view.txtAddressFieldValue4.skin = this._gsknTextBoxError;
//                   this.view.txtAddressFieldValue4.focusSkin = this._gsknTextBoxError;
//                   this.view.lblAddAddressErrorMsg.text = "Length of State should be "+errorText;
//                   break;
                case "txtBoxCity":
                  this.view.lblAddAddressErrorMsg.setVisibility(true);
                  this.view.txtAddressFieldValue5.skin = this._gsknTextBoxError;
                  this.view.txtAddressFieldValue5.focusSkin = this._gsknTextBoxError;
                  this.view.lblAddAddressErrorMsg.text = "Length of City should be "+errorText;
                  break;
                case "txtBoxPostalCode":
                  this.view.lblAddAddressErrorMsg.setVisibility(true);
                  this.view.txtAddressFieldValue6.skin = this._gsknTextBoxError;
                  this.view.txtAddressFieldValue6.focusSkin = this._gsknTextBoxError;
                  this.view.lblAddAddressErrorMsg.text = "Length of PostalCode should be "+errorText;
                  break;
              }
            }
          }
        }
        for(var i=1; i<=6; i++){
          var isTextBoxEmpty = this.view["txtAddressFieldValue"+i].text;
          if((this.isEmptyNullUndefined(isTextBoxEmpty)) && (this.isEmptyNullUndefined(errorText))){
            this.view["txtAddressFieldValue"+i].skin = this.getFieldValue(this._gsknTextBoxNormal);
            this.view["txtAddressFieldValue"+i].focusSkin = this.getFieldValue(this._gsknTextBoxFocus);
            this.view.lblAddAddressErrorMsg.setVisibility(false);						   						   
          }else{
            this.view.lblAddAddressErrorMsg.setVisibility(true);
            break;
          }
        }
        if(this.isEmptyNullUndefined(errorText)){
          this.view.lblAddAddressErrorMsg.setVisibility(false); 
        }
        this.view.flxAddfAddress.forceLayout();
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in onAddAddressTextChange method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
      }
    },
    /**
     * Component setAddAddressData
     * To set data for textboxes
     */
    setAddAddressData: function(){
      
      for(var i=1; i<=6; i++){
        var texboxVisibility = "this._textBox"+i+"Visibility";
        if(texboxVisibility === false){
          this.view['lblAddressField'+i].setVisibility(false);
          this.view['flxAddressFieldValue'+i].setVisibility(false);
        }
      }
      for(var i=1;i<=6;i++){
        this.view["txtAddressFieldValue"+i].text = this.getFieldValue(this["_adsTextBox"+i+"Value"], "value");
      }
      var addAddress={
        "txtBoxAddressLine01":  this.view.txtAddressFieldValue1.text,
        "txtBoxAddressLine02":  this.view.txtAddressFieldValue2.text,
        "txtBoxCountry":  this.view.txtAddressFieldValue3.text,
        /*"txtBoxState":  this.view.txtAddressFieldValue4.text,*/
        "txtBoxCity":  this.view.txtAddressFieldValue5.text,
        "txtBoxPostalCode":  this.view.txtAddressFieldValue6.text
      };         
      
      var minlength = this.minFillValidate(addAddress);
      var maxlength = this.maxFillValidate(addAddress); 
      if(Object.keys(minlength).length === 0 && minlength.constructor === Object && Object.keys(maxlength).length === 0 && maxlength.constructor === Object){
        this.enableButton("btnSave");            
      } else{
        this.disableButton("btnSave");
      }
      this.view.flxAddAddressWrapper.forceLayout();
    },
    /**
     * Component addAddressInputValidation
     * To validate the inputs and show error then continue to next screen if all the inputs are valid
     */
    addAddressInputValidation: function(){
      
      var dataJSON = {
        "txtBoxAddressLine01":  this.view.txtAddressFieldValue1.text,
        "txtBoxAddressLine02":  this.view.txtAddressFieldValue2.text,
        "txtBoxCountry":  this.view.txtAddressFieldValue3.text,
        /*"txtBoxState":  this.view.txtAddressFieldValue4.text,*/
        "txtBoxCity":  this.view.txtAddressFieldValue5.text,
        "txtBoxPostalCode":  this.view.txtAddressFieldValue6.text
      }; 
      var dataValidator = this.performDataValidation(dataJSON);
      if(Object.keys(dataValidator).length === 0 && dataValidator.constructor === Object){
        this.resetAddAddressErrors();    
        this.onAddAddressContinue();
      }
      else{
        this.setAddAddressErrors(dataValidator);  
      }
    },
    /**
     * Component resetAddAddressErrors
     * Reponsible to reset textbox skin
     */
    resetAddAddressErrors: function(){
      try{
        
        for(var i=1;i<=6;i++){        
          this.view["txtAddressFieldValue"+i].skin = this.getFieldValue(this._gsknTextBoxNormal);
          this.view["txtAddressFieldValue"+i].focusSkin = this.getFieldValue(this._gsknTextBoxFocus);
        }
        this.view.lblAddAddressErrorMsg.setVisibility(false);
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in resetAddAddressErrors method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**
     * @api : setAddAddressErrors
     * displays errors on validation of the fields in add address screen.
     * @return : NA
     */
    setAddAddressErrors: function(dvfError) {
      this.resetAddAddressErrors();
      for(var iterator in dvfError){
        if("txtBoxAddressLine01" === iterator){
          this.view.txtAddressFieldValue1.skin = this._gsknTextBoxError;
          this.view.txtAddressFieldValue1.focusSkin = this._gsknTextBoxError;
          this.view.lblAddAddressErrorMsg.text = this.getFieldValue(this._adsErrorMessage);
        }
        if("txtBoxAddressLine02" === iterator){
          this.view.txtAddressFieldValue2.skin = this._gsknTextBoxError;
          this.view.txtAddressFieldValue2.focusSkin = this._gsknTextBoxError;
          this.view.lblAddAddressErrorMsg.text = this.getFieldValue(this._adsErrorMessage);
        }
        if("txtBoxCountry" === iterator){
          this.view.txtAddressFieldValue3.skin = this._gsknTextBoxError;
          this.view.txtAddressFieldValue3.focusSkin = this._gsknTextBoxError;
          this.view.lblAddAddressErrorMsg.text = this.getFieldValue(this._adsErrorMessage);
        }                
//         if("txtBoxState" === iterator){
//           this.view.txtAddressFieldValue4.skin = this._gsknTextBoxError;
//           this.view.txtAddressFieldValue4.focusSkin = this._gsknTextBoxError;
//           this.view.lblAddAddressErrorMsg.text = this.getFieldValue(this._adsErrorMessage);
//         }
        if("txtBoxCity" === iterator){
          this.view.txtAddressFieldValue5.skin = this._gsknTextBoxError;
          this.view.txtAddressFieldValue5.focusSkin = this._gsknTextBoxError;
          this.view.lblAddAddressErrorMsg.text = this.getFieldValue(this._adsErrorMessage);
        }
        if("txtBoxPostalCode" === iterator){
          this.view.txtAddressFieldValue6.skin = this._gsknTextBoxError;
          this.view.txtAddressFieldValue6.focusSkin = this._gsknTextBoxError;
          this.view.lblAddAddressErrorMsg.text = this.getFieldValue(this._adsErrorMessage);
        }
      }         
      this.view.lblAddAddressErrorMsg.setVisibility(true);
    },
    /**
     * Component onAddAddressContinue
     * Navigate to next form based on flow type.
     */
    onAddAddressContinue: function(){
      try {
           
        for(var i=1; i<=6; i++)
          if(!kony.sdk.isNullOrUndefined((this.view['txtAddressFieldValue'+i].text)) && this.view['txtAddressFieldValue'+i].text !== "") {
            this.inputPool[this.getFieldValue(this["_adsTextBox"+i+"Value"],"inputPoolKey")] = this.view['txtAddressFieldValue' + i].text;
          }
        this.setVerifyDetails();
        this.navigateTo("flxVerifyDetails", "flxVfsHeaderTop", this.getFieldValue(this._vfsSectionTitle));
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in onNationalIDContinue method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /*
    * Component Account Number
    * Functions for Account Number
    */
    setAccountNumber: function(flow){
      
      if(flow === "ADD"){
        this.setAccountNumberDefaultText();
        this.setAccountNumberSkins();
        this.setAccountNumberActions();
        this.setAccountNumberData(flow);
      }else{
        this.setAccountNumberData(flow); 
      }
    },
    /*
    * component setAccountNumberDefaultText
    * Setting default text for Account Number Screen
    */
    setAccountNumberDefaultText: function(){
     
      this.view.imgAccountNumberBack.src = this.getFieldValue(this._iconBack);
      this.view.btnAccountNumberCancel.text = this.getFieldValue(this._cancelButton);
      this.view.lblAccountNumberHeader.text = this.getFieldValue(this._accSectionHeader);	
      this.view.lblAccountNumberSubHeader.text = this.getFieldValue(this._accScreen1SubHeader);
      this.view.btnAccountNumberContinue.text = this.getFieldValue(this._accCTAButton1, "text");
	  this.view.txtAccountNumberorIBAN.restrictCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\ ";
      this.view.txtAccountNumberorIBAN.placeholder = this.getFieldValue(this._accTxtInput, "placeHolder"); 
      this.view.txtAccountNumberorIBAN.secureTextEntry = this.getFieldValue(this._accTxtInput, "mask");
      this.view.txtAccountNumberorIBAN.maxTextLength = parseInt(this.getFieldValue(this._maxFillMapping)[this._jsonObjName]["txtBoxNewAccountNumber"]);
      this.view.imgClearOption.src = this.getFieldValue(this._accKeypadClearIcon);
    },
    /*
    * component setAccountNumberSkins
    * Setting default skins for Account Number Screen
    */
    setAccountNumberSkins: function(){
      
      this.view.flxAccountNumberHeader.skin = this.getFieldValue(this._gsknHeaderFlex);
      this.view.btnAccountNumberCancel.skin = this.getFieldValue(this._gsknCancelBtn);
      this.view.lblAccountNumberHeader.skin = this.getFieldValue(this._gsknHeaderLbl);
      this.view.lblAccountNumberSubHeader.skin = this.getFieldValue(this._gsknSubHeaderTitle);
      this.view.flxAccountNumberSeparator.skin = this.getFieldValue(this._gsknSubHeaderseparator);
      this.view.lblAccountNumberErrorMsg.skin = this.getFieldValue(this._gsknErrorTextMessage);
      /*for(var i=1; i<=12; i++){
        this.view['lblDigit'+i].skin = this.getFieldValue(this._accInputFieldUnmaskedSkin);
      }*/
      this.view.flxAccountNumberInputLine.skin = this.getFieldValue(this._accNumericInputBottomSkin);
      this.view.txtAccountNumberorIBAN.skin = this.getFieldValue(this._gsknTextBoxNormal);
      this.view.txtAccountNumberorIBAN.focusSkin = this.getFieldValue(this._gsknTextBoxFocus);            
      //this.view.btnAccountNumberContinue.skin = this.getFieldValue(this._gsknDisabledContexualBtn);
    },
    /*
    * component setAccountNumberActions
    * Setting default actions for Account Number Screen
    */
    setAccountNumberActions: function(){
      var scope = this;
      scope.accountNumberKeyboardDataSetting();
      scope.view.btnAccountNumberCancel.isVisible = !scope.isEmptyNullUndefined(scope.getFieldValue(scope._cancelButton)) ? true : false;  
      scope.view.btnAccountNumberContinue.onClick = scope.accountNumberInputValidation;
      scope.view.flxAccountNumberBack.onTouchEnd = scope.btnAccountNumberBackOnClick;
      scope.view.txtAccountNumberorIBAN.onTextChange = scope.accountNumberorReEnterAccountNumberTextChange;
      scope.view.btnAccountNumberCancel.onClick = scope.onBackButtonClick;     
    },
    /*
    * component setAccountNumberData
    * Data actions for Account Number Screen
    */
    setAccountNumberData: function(flow){
      try{
       
        this.isAccountNumberEmptyorNot = this.getFieldValue(this._accTxtInput, "value"); 
		if(!this.isEmptyNullUndefined(this.isAccountNumberEmptyorNot)){
          this.payeeFlow = "EDIT";
        }else{
          this.payeeFlow = "ADD";
        }																 	 
        this.keypadStringAccountNumber = '';
        this.initialAccountNumber = '';
        this.flxNameAccountNumberScreen = "flxAccountNumberInput";         
        this.incompleteCodeView();
        if(this._beneficiaryTypes === "DomesticBank" || this._beneficiaryTypes === "InternationalBank") {
          this.view.flxAccountNumberWrapper.setVisibility(false);
          this.view.flxAccountNumberInputLine.setVisibility(false);
          this.view.flxAccountNumberKeyboard.setVisibility(false);
          this.view.flxAccountNumberorIBANWrapper.setVisibility(true);
          this.view.txtAccountNumberorIBAN.setFocus(true);
          if(flow === "EDIT") {
            this.view.txtAccountNumberorIBAN.text = this.getFieldValue(this._accTxtInput, "value");
            this.accountNumberorReEnterAccountNumberTextChange();
          } else {
            this.view.txtAccountNumberorIBAN.text = "";
          }
        }      
        else if(this._beneficiaryTypes === "SameBank") {
            this.view.txtAccountNo.setFocus(true);
          if(flow === "EDIT") {          
            var accountNumberEdit = this.getFieldValue(this._accTxtInput, "value");
            for(var i=1; i<= 12; i++){
              if(i <= (accountNumberEdit.length)){
                for(var j=1; j<= accountNumberEdit.length; j++){
                  this.view['lblDigit'+j].text = accountNumberEdit[j-1];
                  this.keypadStringAccountNumber = accountNumberEdit;
                }
              }else{
                this.view['lblDigit'+i].text = "";
              }
            }
            this.enterCodePostAction();
            this.updateInputBulletsAccountNumber(this.flxNameAccountNumberScreen);
          }else{
            for(var i=1; i<=12;i++){
              this.view['lblDigit'+i].text = "";
            }
          }
          this.view.flxAccountNumberWrapper.setVisibility(true);
          this.view.flxAccountNumberInputLine.setVisibility(false);
          this.view.flxAccountNumberKeyboard.setVisibility(false);
          this.view.flxAccountNumberorIBANWrapper.setVisibility(false);
        }    
        this.view.flxAccountNumber.forceLayout();
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setAccountNumberData method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**     
	 * Component accountNumberTextChange
     * Enabling continue button based on characters.
    **/
    accountNumberorReEnterAccountNumberTextChange: function() {
      try {
        
        if(this.flxNameAccountNumberScreen === "flxAccountNumberInput") {
          this.view.txtAccountNumberorIBAN.skin = this._gsknTextBoxNormal;
          this.view.txtAccountNumberorIBAN.focusSkin = this.getFieldValue(this._gsknTextBoxFocus); 
          var title = this.view.txtAccountNumberorIBAN.text;
          var accountNumberEntered={
            "txtBoxNewAccountNumber":this.view.txtAccountNumberorIBAN.text
          }; 
          var minlength = this.minFillValidate(accountNumberEntered);
          var maxlength = this.maxFillValidate(accountNumberEntered); 
          if(Object.keys(minlength).length === 0 && minlength.constructor === Object){
            this.enableButton("btnAccountNumberContinue");            
          } else{
            this.enableButton("btnAccountNumberContinue");
          } 
          this.view.lblAccountNumberErrorMsg.setVisibility(false);          
        }
        if(this.flxNameAccountNumberScreen === "flxReEnterAccountNumberInput") {
          this.view.txtReEnterAccountNumberorIBAN.skin = this.getFieldValue(this._gsknTextBoxNormal);
          this.view.txtReEnterAccountNumberorIBAN.focusSkin = this.getFieldValue(this._gsknTextBoxFocus);
          var title = this.view.txtReEnterAccountNumberorIBAN.text;
          var accountNumberEntered={
            "txtBoxReenterAccountNumber":this.view.txtReEnterAccountNumberorIBAN.text
          };           
          var minlength = this.minFillValidate(accountNumberEntered);
          var maxlength = this.maxFillValidate(accountNumberEntered); 
          if(Object.keys(minlength).length === 0 && minlength.constructor === Object){
            this.enableButton("btnReEnterAccountNumberContinue");            
          } else{
            this.enableButton("btnReEnterAccountNumberContinue");
          } 
          this.view.lblReEnterAccountNumberErrorMsg.setVisibility(false);        
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in accountNumberTextChange method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**   
	* Component accountNumberInputValidation
     * To validate the inputs and show error then continue to next screen if all the inputs are valid
     */
    accountNumberInputValidation:function(){
     
      if(this._beneficiaryTypes === "DomesticBank" || this._beneficiaryTypes === "InternationalBank"){
        var dataJSON = {
          "txtBoxNewAccountNumber": this.view.txtAccountNumberorIBAN.text
        }; 
        var dataValidator = this.performDataValidation(dataJSON);
		var iBAN = dataJSON.txtBoxNewAccountNumber;
        var iBANCode = dataJSON.txtBoxNewAccountNumber.slice(0,2);
        if(isNaN(iBAN)){
          if(!(/^[a-z]{2}/i.test(iBANCode)) || iBAN.length>34) {
            dataValidator.txtBoxNewAccountNumber = kony.i18n.getLocalizedString("kony.mb.transferEurope.invalidIBAN");
            this.setAccountNumberErrors(dataValidator); 
          } else if(Object.keys(dataValidator).length === 0 && dataValidator.constructor === Object){
            this.resetAccountNumberErrors();    
            this.onAccountNumberContinue();
          }  else {
            this.setAccountNumberErrors(dataValidator);     }
        } else if(Object.keys(dataValidator).length === 0 && dataValidator.constructor === Object){
          this.resetAccountNumberErrors();    
          this.onAccountNumberContinue();
        }
        else{
          this.setAccountNumberErrors(dataValidator);  
        }
      }else{
        this.onAccountNumberContinue();
      }
    },
    /**
     * Component resetAccountNumberErrors
     * Reponsible to reset textbox skin
     */
    resetAccountNumberErrors: function(){
      try{
        //this.view.txtAccountNumberorIBAN.skin = this._gsknTextBoxNormal;
        //this.view.txtAccountNumberorIBAN.focusSkin = this.getFieldValue(this._gsknTextBoxFocus); 
        this.view.lblAccountNumberErrorMsg.setVisibility(false);
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in resetAccountNumberErrors method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**
     * @api : setAccountNumberErrors
     * displays errors on validation of the fields in account number screen.
     * @return : NA
     */
    setAccountNumberErrors: function(dvfError) {
      this.resetAccountNumberErrors();
      for(var iterator in dvfError){
        if("txtBoxNewAccountNumber" == iterator){
          this.view.txtAccountNumberorIBAN.skin = this.getFieldValue(this._gsknTextBoxError);
          this.view.txtAccountNumberorIBAN.focusSkin = this.getFieldValue(this._gsknTextBoxError);
          this.view.lblAccountNumberErrorMsg.text = this.getFieldValue(this._accInvalidMsg);
          this.view.txtAccountNumberorIBAN.text = "";
        }
      }
      this.enableButton("btnAccountNumberContinue");
      this.view.lblAccountNumberErrorMsg.setVisibility(true);
    },
    /**   
	 * Component onAccountNumberContinue
     * To navigate next page 
     * Validation for input account number
    **/
    onAccountNumberContinue: function() {
      
      try{ 
        this.view.lblAccountNumberErrorMsg.setVisibility(false);
        if(this._beneficiaryTypes === "DomesticBank" || this._beneficiaryTypes === "InternationalBank") {             
          //scope.view.txtAccountNumberorIBAN.skin = scope.getFieldValue(scope._gsknTextBoxNormal);
          //scope.view.txtAccountNumberorIBAN.focusSkin = scope.getFieldValue(scope._gsknTextBoxFocus);
          this.view.lblAccountNumberErrorMsg.setVisibility(false);
		  this.setReEnterAccountNumber(this.payeeFlow);
          this.navigateTo("flxReEnterAccountNumber", "flxReEnterAccountNumberTop", this.getFieldValue(this._accSectionHeader));														   																           											   
        } else { 
            //osama 
            this.keypadStringAccountNumber = this.view.txtAccountNo.text;         																											
          if(!kony.sdk.isNullOrUndefined(this.keypadStringAccountNumber) && this.keypadStringAccountNumber !== "") {
            this.inputPool[this.getFieldValue(this._accTxtInput,"inputPoolKey")] = this.keypadStringAccountNumber;																	
          }            																								
          this.initialAccountNumber = this.keypadStringAccountNumber;
          this.view.lblAccountNumberErrorMsg.setVisibility(false);
          this.setReEnterAccountNumber(this.payeeFlow);	
          this.navigateTo("flxReEnterAccountNumber", "flxReEnterAccountNumberTop", this.getFieldValue(this._titleAccountNumber));															 																             																												
        }		 
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in onAccountNumberContinue method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**  
	 * Component accountNumberKeyboardDataSetting
     * To bind the functions for each keybroad butttons
     */
    accountNumberKeyboardDataSetting:function(){
      try{
        this.view.flxRowOne.btnNumber1.onClick = this.setKeypadCharAccountNumber.bind(this, 1);
        this.view.flxRowOne.btnNumber2.onClick = this.setKeypadCharAccountNumber.bind(this, 2);
        this.view.flxRowOne.btnNumber3.onClick = this.setKeypadCharAccountNumber.bind(this, 3);
        this.view.flxRowTwo.btnNumber4.onClick = this.setKeypadCharAccountNumber.bind(this, 4);
        this.view.flxRowTwo.btnNumber5.onClick = this.setKeypadCharAccountNumber.bind(this, 5);
        this.view.flxRowTwo.btnNumber6.onClick = this.setKeypadCharAccountNumber.bind(this, 6);
        this.view.flxRowThree.btnNumber7.onClick = this.setKeypadCharAccountNumber.bind(this, 7);
        this.view.flxRowThree.btnNumber8.onClick = this.setKeypadCharAccountNumber.bind(this, 8);
        this.view.flxRowThree.btnNumber9.onClick = this.setKeypadCharAccountNumber.bind(this, 9);
        this.view.flxRowFour.btnNumber0.onClick = this.setKeypadCharAccountNumber.bind(this, 0);
        this.view.flxRowFour.imgKeypadClear.onTouchEnd = this.clearKeypadCharAccountNumber;
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in accountNumberKeyboardDataSetting method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
      }
    },
    /*
    * Component ReEnter Account Number
    * Functions for ReEnter Account Number
    */
    setReEnterAccountNumber(flow){
     
      if(flow=="ADD"){
        this.setReEnterAccountNumberDefaultText();
        this.setReEnterAccountNumberSkins();
        this.setReEnterAccountNumberActions();
        this.setReEnterAccountNumberData(flow);
      }else{
        this.setReEnterAccountNumberData(flow); 
      }
    },
    /*
    * component setReEnterAccountNumberDefaultText
    * Setting default text for ReEnter Account Number Screen
    */
    setReEnterAccountNumberDefaultText: function(){
      
      this.view.imgReEnterAccountNumberBack.src = this.getFieldValue(this._iconBack);
      this.view.btnReEnterAccountNumberCancel.text = this.getFieldValue(this._cancelButton);
      this.view.lblReEnterAccountNumberHeader.text = this.getFieldValue(this._accSectionHeader);	
      this.view.lblReEnterAccountNumberSubHeader.text = this.getFieldValue(this._accScreen2SubHeader);
      this.view.btnReEnterAccountNumberContinue.text = this.getFieldValue(this._accCTAButton2, "text");
	  this.view.txtReEnterAccountNumberorIBAN.restrictCharactersSet = "~#^|$%&*!@()_-+=}{][/|?,.><`':;\"\\ ";
      this.view.txtReEnterAccountNumberorIBAN.placeholder = this.getFieldValue(this._accReTxtInput, "placeHolder"); 
      this.view.txtReEnterAccountNumberorIBAN.secureTextEntry = this.getFieldValue(this._accReTxtInput, "mask");
      this.view.txtReEnterAccountNumberorIBAN.maxTextLength = parseInt(this.getFieldValue(this._maxFillMapping)[this._jsonObjName]["txtBoxReenterAccountNumber"]);
      this.view.imgClearButton.src = this.getFieldValue(this._accKeypadClearIcon);
    },
    /*
    * component setReEnterAccountNumberSkins
    * Setting default skins for ReEnter Account Number Screen
    */
    setReEnterAccountNumberSkins: function(){
      
      this.view.flxReEnterAccountNumberHeader.skin = this.getFieldValue(this._gsknHeaderFlex);
      this.view.btnReEnterAccountNumberCancel.skin = this.getFieldValue(this._gsknCancelBtn);
      this.view.lblReEnterAccountNumberHeader.skin = this.getFieldValue(this._gsknHeaderLbl);
      this.view.lblReEnterAccountNumberSubHeader.skin = this.getFieldValue(this._gsknSubHeaderTitle);
      this.view.flxReEnterAccountNumberSeparator.skin = this.getFieldValue(this._gsknSubHeaderseparator);
      this.view.lblReEnterAccountNumberErrorMsg.skin = this.getFieldValue(this._gsknErrorTextMessage);
      for(var i=1; i<=12; i++){
        this.view['lblDigit0'+i].skin = this.getFieldValue(this._accInputFieldMaskedSkin);
      }
      this.view.flxReEnterAccountNumberInputLine.skin = this.getFieldValue(this._accNumericInputBottomSkin);
      this.view.txtReEnterAccountNumberorIBAN.skin = this.getFieldValue(this._gsknTextBoxNormal);
      this.view.txtReEnterAccountNumberorIBAN.focusSkin = this.getFieldValue(this._gsknTextBoxFocus);            
     // this.view.btnReEnterAccountNumberContinue.skin = this.getFieldValue(this._gsknPrimaryContexualBtn);
    },
    /*
    * component setAccountNumberActions
    * Setting default actions for Account Number Screen
    */
    setReEnterAccountNumberActions: function(){
      var scope = this;
      scope.reEnterAccountNumberKeyboardDataSetting();
      scope.view.btnReEnterAccountNumberCancel.isVisible = !scope.isEmptyNullUndefined(scope.getFieldValue(scope._cancelButton)) ? true : false;  
      scope.view.btnReEnterAccountNumberContinue.onClick = scope.reEnterAccountNumberInputValidation;
      scope.view.flxReEnterAccountNumberBack.onTouchEnd = scope.btnReEnterAccountNumberBackOnClick;
      scope.view.txtReEnterAccountNumberorIBAN.onTextChange = scope.accountNumberorReEnterAccountNumberTextChange;
      scope.view.btnReEnterAccountNumberCancel.onClick = scope.onBackButtonClick;																						   
    },
    /**     
	 * Component reEnterAccountNumberKeyboardDataSetting
     * To bind the functions for each keybroad butttons
     */
    reEnterAccountNumberKeyboardDataSetting:function(){
      try{
        this.view.flxRow1.btnNumberOne.onClick = this.setKeypadCharAccountNumber.bind(this, 1);
        this.view.flxRow1.btnNumberTwo.onClick = this.setKeypadCharAccountNumber.bind(this, 2);
        this.view.flxRow1.btnNumberThree.onClick = this.setKeypadCharAccountNumber.bind(this, 3);
        this.view.flxRow2.btnNumberFour.onClick = this.setKeypadCharAccountNumber.bind(this, 4);
        this.view.flxRow2.btnNumberFive.onClick = this.setKeypadCharAccountNumber.bind(this, 5);
        this.view.flxRow2.btnNumberSix.onClick = this.setKeypadCharAccountNumber.bind(this, 6);
        this.view.flxRow3.btnNumberSeven.onClick = this.setKeypadCharAccountNumber.bind(this, 7);
        this.view.flxRow3.btnNumberEight.onClick = this.setKeypadCharAccountNumber.bind(this, 8);
        this.view.flxRow3.btnNumberNine.onClick = this.setKeypadCharAccountNumber.bind(this, 9);
        this.view.flxRow4.btnNumberZero.onClick = this.setKeypadCharAccountNumber.bind(this, 0);
        this.view.flxRow4.imgKeypadClearButton.onTouchEnd = this.clearKeypadCharAccountNumber;
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in reEnterAccountNumberKeyboardDataSetting method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
      }
    },   
    /**     
	 * Component setReEnterAccountNumberData
     * Re-entering account number for verification
     * Enabling default parameters
    **/
    setReEnterAccountNumberData: function(flow){
      try {
                
        this.keypadStringAccountNumber = '';
        this.flxNameAccountNumberScreen = "flxReEnterAccountNumberInput";  
        this.isAccountNumberMasked = this.getFieldValue(this._accReTxtInput, "mask");
        this.incompleteCodeView();
        this.view.lblReEnterAccountNumberErrorMsg.setVisibility(false);
        if(this._beneficiaryTypes === "DomesticBank" || this._beneficiaryTypes === "InternationalBank") {
          this.view.flxReEnterAccountNumberWrapper.setVisibility(false);
          this.view.flxReEnterAccountNumberInputLine.setVisibility(false);
          this.view.flxReEnterAccountNumberKeypad.setVisibility(false);
          this.view.flxReAccountNumberorIBANWrapper.setVisibility(true);
          this.view.txtReEnterAccountNumberorIBAN.setFocus(true);
          if(flow === "EDIT") {
            this.view.txtReEnterAccountNumberorIBAN.text = this.getFieldValue(this._accReTxtInput, "value");
            this.accountNumberorReEnterAccountNumberTextChange();
          } else {
            this.view.txtReEnterAccountNumberorIBAN.text = "";
          }
        } else if(this._beneficiaryTypes === "SameBank") {
            //osama
            this.view.txtReAccountNo.setFocus(true);
          if(flow === "EDIT") {   
            var accountNumberEdit = this.getFieldValue(this._accReTxtInput, "value");
            for(var i=1; i<=12;i++){
              if(i <= (accountNumberEdit.length)){
                for(var j=1; j<= accountNumberEdit.length; j++){
                  this.view['lblDigit0'+j].text = accountNumberEdit[j-1];
                  this.keypadStringAccountNumber = accountNumberEdit;
                }
              }else{
                this.view['lblDigit0'+i].text = "";
              }
            }
            this.enterCodePostAction();																						  														   
          }else{
            for(var i=1; i<=12;i++){
              this.view['lblDigit0'+i].text = "";
            }
          }
          this.view.flxReEnterAccountNumberWrapper.setVisibility(true);
          this.view.flxReEnterAccountNumberInputLine.setVisibility(false);
          this.view.flxReEnterAccountNumberKeypad.setVisibility(false);
          this.view.flxReAccountNumberorIBANWrapper.setVisibility(false);
        }   
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setReEnterAccountNumberData method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
      }
    },
    /**     
	 * Component setKeypadCharAccountNumber
     * Input parameter of char is passed from keyboard
     * Function to add input from keyboard to string
    **/
    setKeypadCharAccountNumber: function(char) {
      try{
        this.keypadStringAccountNumber = this.keypadStringAccountNumber + char;
        if (this.keypadStringAccountNumber.length > 0 && this.keypadStringAccountNumber.length < 13) {         
        } else if (this.keypadStringAccountNumber.length < 1) {
          this.incompleteCodeView();
        } else if (this.keypadStringAccountNumber.length > 12) {
          this.keypadStringAccountNumber = this.keypadStringAccountNumber.slice(0, 12);
          return;
        }
        this.updateInputBulletsAccountNumber(this.flxNameAccountNumberScreen);
        this.enterCodePostAction();
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setKeypadCharAccountNumber method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
      }
    },
    /**     
	 * Component clearKeypadCharAccountNumber
     * To clear char from keyboard
    **/
    clearKeypadCharAccountNumber: function() {
      try{
        if (this.keypadStringAccountNumber.length === 1) {
          this.keypadStringAccountNumber = '';
          this.updateInputBulletsAccountNumber(this.flxNameAccountNumberScreen);
        }
        if (this.keypadStringAccountNumber.length !== 0) {
          this.keypadStringAccountNumber = this.keypadStringAccountNumber.substr(0, this.keypadStringAccountNumber.length - 1);
          if (this.keypadStringAccountNumber.length < 1) {
            this.incompleteCodeView();
          }
          this.updateInputBulletsAccountNumber(this.flxNameAccountNumberScreen);
        }
        if (this.keypadStringAccountNumber.length < 1) {
          this.incompleteCodeView();
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in clearKeypadCharAccountNumber method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
      }
    },
    /**     
	 * Component updateInputBulletsAccountNumber
     * Update field with underscore
    **/
    updateInputBulletsAccountNumber: function(inputFlx) {
      try{
        var widgets = this.view[inputFlx].widgets();
        if(inputFlx === "flxAccountNumberInput"){
          var isAccountNumberMasked = this.getFieldValue(this._accTxtInput, "mask");
          for (var i = 0; i < this.keypadStringAccountNumber.length; i++) {
            if(isAccountNumberMasked === true){
              this.view.flxAccountNumberInputLine.skin = this.getFieldValue(this._accNumericInputBottomSkin);
              this.view.lblAccountNumberErrorMsg.setVisibility(false);
              widgets[i].text = ".";
              widgets[i].skin = this.getFieldValue(this._accInputFieldMaskedSkin)
            }else{
              this.view.flxAccountNumberInputLine.skin = this.getFieldValue(this._accNumericInputBottomSkin);
              this.view.lblAccountNumberErrorMsg.setVisibility(false);
              widgets[i].skin =  this.getFieldValue(this._accInputFieldUnmaskedSkin);
              widgets[i].text = this.keypadStringAccountNumber[i];
            }
          }
        }
        if(inputFlx === "flxReEnterAccountNumberInput"){
          var isReEnterAccountNumberMasked = this.getFieldValue(this._accReTxtInput, "mask");
          for (var i = 0; i < this.keypadStringAccountNumber.length; i++) {
            if(isReEnterAccountNumberMasked === true){
              this.view.flxReEnterAccountNumberInputLine.skin = this.getFieldValue(this._accNumericInputBottomSkin);
              this.view.lblReEnterAccountNumberErrorMsg.setVisibility(false);
              widgets[i].text = ".";
              widgets[i].skin = this.getFieldValue(this._accInputFieldMaskedSkin)
            }else{
              this.view.flxReEnterAccountNumberInputLine.skin = this.getFieldValue(this._accNumericInputBottomSkin);
              this.view.lblReEnterAccountNumberErrorMsg.setVisibility(false);
              widgets[i].skin =  this.getFieldValue(this._accInputFieldUnmaskedSkin);
              widgets[i].text = this.keypadStringAccountNumber[i];
            }
          }
        }
        for (var i = this.keypadStringAccountNumber.length; i < widgets.length; i++) {
          widgets[i].text = '';
        }
        this.enterCodePostAction();
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in updateInputBulletsAccountNumber method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
      }
    },
    /**     
	 * Component enterCodePostAction
     * To enable button 
    **/
    enterCodePostAction: function() {
      try{
        if(this.flxNameAccountNumberScreen === "flxAccountNumberInput"){                   
          var title = this.keypadStringAccountNumber;
          var accountNumberEnteredSameBank={
            "txtBoxNewAccountNumber": this.keypadStringAccountNumber
          };																			           
          var minlength = this.minFillValidate(accountNumberEnteredSameBank);
          var maxlength = this.maxFillValidate(accountNumberEnteredSameBank); 
          if(Object.keys(minlength).length === 0 && minlength.constructor === Object){
            this.enableButton("btnAccountNumberContinue");            
          } else{
            this.enableButton("btnAccountNumberContinue");
          } 
        }
        if(this.flxNameAccountNumberScreen === "flxReEnterAccountNumberInput"){
          var title = this.keypadStringAccountNumber;
          var reEnterAccountNumberEnteredSameBank={
            "txtBoxReenterAccountNumber": this.keypadStringAccountNumber
          };        
          var minlength = this.minFillValidate(reEnterAccountNumberEnteredSameBank);
          var maxlength = this.maxFillValidate(reEnterAccountNumberEnteredSameBank); 
          if(Object.keys(minlength).length === 0 && minlength.constructor === Object){
            this.enableButton("btnReEnterAccountNumberContinue");            
          } else{
            this.enableButton("btnReEnterAccountNumberContinue");
          } 
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in enterCodePostAction method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
      }
    },
    /**     
	 * Component incompleteCodeView
     * To disable button 
    **/
    incompleteCodeView: function() {
      try{
        if(this.flxNameAccountNumberScreen === "flxAccountNumberInput"){
          this.enableButton("btnAccountNumberContinue");														 
        }
        if(this.flxNameAccountNumberScreen === "flxReEnterAccountNumberInput"){
          this.enableButton("btnReEnterAccountNumberContinue");																
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in incompleteCodeView method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
      }
    },   
    /**
     * Component requiredCodeInputValidation
     * To validate the inputs and show error then continue to next screen if all the inputs are valid
     */
    reEnterAccountNumberInputValidation:function(){
     
      if(this._beneficiaryTypes === "DomesticBank" || this._beneficiaryTypes === "InternationalBank"){
        var dataJSON = {
          "txtBoxReenterAccountNumber": this.view.txtReEnterAccountNumberorIBAN.text
        }; 
        var dataValidator = this.performDataValidation(dataJSON);
        if(Object.keys(dataValidator).length === 0 && dataValidator.constructor === Object){
          this.resetReEnterAccountNumberErrors();    
          this.onReEnterAccountNumberContinue();
        }
        else{
          this.setReEnterAccountNumberErrors(dataValidator);  
        }
      }else{
        this.onReEnterAccountNumberContinue();
      }
    },
    /**
     * Component resetReEnterAccountNumberErrors
     * Reponsible to reset textbox skin
     */
    resetReEnterAccountNumberErrors: function(){
      try{
        //this.view.txtReEnterAccountNumberorIBAN.skin = this._gsknTextBoxNormal;
        //this.view.txtReEnterAccountNumberorIBAN.focusSkin = this.getFieldValue(this._gsknTextBoxFocus);       
        this.view.lblReEnterAccountNumberErrorMsg.setVisibility(false);
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in resetReEnterAccountNumberErrors method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**
     * @api : showRequiredCodeValidationErrors
     * displays errors on validation of the fields in add beneficiary screen.
     * @return : NA
     */
    setReEnterAccountNumberErrors: function(dvfError) {
      this.resetReEnterAccountNumberErrors();
      for(var iterator in dvfError){
        if("txtBoxReenterAccountNumber" == iterator){
          this.view.txtReEnterAccountNumberorIBAN.skin = this.getFieldValue(this._gsknTextBoxError);
          this.view.txtReEnterAccountNumberorIBAN.focusSkin = this.getFieldValue(this._gsknTextBoxError);
          this.view.lblReEnterAccountNumberErrorMsg.text = this.getFieldValue(this._accInvalidMsg);
          this.view.txtReEnterAccountNumberorIBAN.text = "";
        }
      }         
      this.view.lblReEnterAccountNumberErrorMsg.setVisibility(true);
    },
    /**   
	 * Component onReEnterAccountNumberContinue
     * To navigate to next page 
     * Validation for input account number
     * Verifying both inputs are same
    **/
    onReEnterAccountNumberContinue: function() {
      
      try {
        this.view.lblReEnterAccountNumberErrorMsg.setVisibility(false);
        //osama
        this.keypadStringAccountNumber = this.view.txtReAccountNo.text;
        var isValidAccNo = this.isValidAccountNumberOrNot();
        if(isValidAccNo) {
          if(this._beneficiaryTypes === "DomesticBank" || this._beneficiaryTypes === "InternationalBank"){  
            if(!kony.sdk.isNullOrUndefined(this.view.txtAccountNumberorIBAN.text) && this.view.txtAccountNumberorIBAN.text !== "") {																						 
              this.inputPool[this.getFieldValue(this._accTxtInput,"inputPoolKey")] = this.view.txtAccountNumberorIBAN.text;
            }
            var existingToAccounts = this.isExistingAccount(this.view.txtAccountNumberorIBAN.text);
            if(existingToAccounts.length === 0) {
               if (/^[a-z]/i.test(this.view.txtAccountNumberorIBAN.text.charAt(0))) {
                this.invokeValidateIBANService();
               } else {
                this.onReEnterAccountNumberContinueNavigation();
               }
            } else {
              this.view.lblReEnterAccountNumberErrorMsg.text =this.getFieldValue(this._accExistMsg); 
              this.view.lblReEnterAccountNumberErrorMsg.setVisibility(true);
              this.view.txtReEnterAccountNumberorIBAN.skin = this.getFieldValue(this._gsknTextBoxError);
              this.view.txtReEnterAccountNumberorIBAN.focusSkin = this.getFieldValue(this._gsknTextBoxError);
              this.view.txtReEnterAccountNumberorIBAN.text = "";
              this.incompleteCodeView();
            }																						   
          } else {
            if(!kony.sdk.isNullOrUndefined(this.keypadStringAccountNumber) && this.view.txtAccountNumberorIBAN.text !== "") {																						 
              this.inputPool[this.getFieldValue(this._accTxtInput,"inputPoolKey")] = this.keypadStringAccountNumber;																										   																			 
            }
            var results = this.isExistingAccount(this.initialAccountNumber);
            if(results.length === 0) {            
              this.onRequestStart();
              this.setCriteria(this._accValidationCriteria)
              var objSvcName = this.getFieldValue(this._accValidationService);
              var objName = this.getFieldValue(this._accValidationObject);
              var operationName = this.getFieldValue(this._accValidationOperation);
              var criteria = this.getCriteria();
              var unicode = "";
              this.UnifiedTransferDAO.invokeService
              (objSvcName,objName,operationName,criteria,unicode,this.onAccountNumberSuccess,this.failureValidation);
            } else {
              this.view.lblReEnterAccountNumberErrorMsg.text =this.getFieldValue(this._accExistMsg);               
              this.view.lblReEnterAccountNumberErrorMsg.setVisibility(true);
              this.keypadStringAccountNumber = '';
              this.updateInputBulletsAccountNumber(this.flxNameAccountNumberScreen);
              this.incompleteCodeView();
            }
          }
        }
        else {
          if(this._beneficiaryTypes === "DomesticBank" || this._beneficiaryTypes === "InternationalBank"){ 
            this.incompleteCodeView();																	 
            this.view.lblReEnterAccountNumberErrorMsg.text = this.getFieldValue(this._accReEnterErrorMessage, "IBANNumber");
            this.view.txtReEnterAccountNumberorIBAN.skin = this.getFieldValue(this._gsknTextBoxError);
            this.view.txtReEnterAccountNumberorIBAN.focusSkin = this.getFieldValue(this._gsknTextBoxError);
            this.view.txtReEnterAccountNumberorIBAN.text = "";
            this.view.lblReEnterAccountNumberErrorMsg.setVisibility(true);
          }else{
            this.keypadStringAccountNumber = '';
            this.updateInputBulletsAccountNumber(this.flxNameAccountNumberScreen);
            this.incompleteCodeView();
            this.view.lblReEnterAccountNumberErrorMsg.skin = this._gsknErrorTextMessage;
            this.view.flxReEnterAccountNumberInputLine.skin = this._accNumericInputBottomErrorSkin;
            this.view.lblReEnterAccountNumberErrorMsg.text = this.getFieldValue(this._accReEnterErrorMessage, "accountNumber");
            this.view.lblReEnterAccountNumberErrorMsg.setVisibility(true);
          }
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in onReEnterAccountNumberContinue method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
      }
      //osama
      this.view.txtReAccountNo.text="";
      this.view.txtAccountNo.text="";
    },
    /**     
	 * Component isValidAccountNumberOrNot
     * Verifying both inputs are same
    **/
    isValidAccountNumberOrNot: function() {
      try {
        
        if(this._beneficiaryTypes === "DomesticBank" || this._beneficiaryTypes === "InternationalBank") {
           if(this.view.txtAccountNumberorIBAN.text === this.view.txtReEnterAccountNumberorIBAN.text) {
            //scope.view.txtReEnterAccountNumberorIBAN.skin = scope.getFieldValue(scope._textBoxNormalSkin);																				  
            //scope.view.txtReEnterAccountNumberorIBAN.focusSkin = scope.getFieldValue(scope._gsknTextBoxFocus);    
            var accountName = this.getFieldValue(this._pynsTextbox, "value") +"...."+ this.getLastNDigits(this.view.txtAccountNumberorIBAN.text, 4);
            this.inputPool["toAccountName"] = accountName;
            this.inputPool["IBAN"] =  this.view.txtReEnterAccountNumberorIBAN.text;
            this.inputPool["toAccountNumber"] =  this.view.txtReEnterAccountNumberorIBAN.text;
            this.inputPool["payeeAccountNumberOrIBAN"] =  this.view.txtReEnterAccountNumberorIBAN.text;
            this.inputPool["accountNumber"] =  this.view.txtReEnterAccountNumberorIBAN.text;
            if(!kony.sdk.isNullOrUndefined(this.view.txtAccountNumberorIBAN.text) && this.view.txtAccountNumberorIBAN.text !== "") {
              this.inputPool[this.getFieldValue(this._accTxtInput,"inputPoolKey")] = this.view.txtAccountNumberorIBAN.text;
            }
            return true; 
          } else {
             return false; 
          } 
        } else {
            //osama
            //this.keypadStringAccountNumber = this.view.txtReAccountNo.text;
          if(this.initialAccountNumber === this.keypadStringAccountNumber) {
            var accountName = this.getFieldValue(this.__pynsTextbox, "text") +"...."+ this.getLastNDigits(this.initialAccountNumber, 12);
            this.inputPool["toAccountName"] = accountName;
            this.inputPool["toAccountNumber"] = this.initialAccountNumber;
            this.inputPool["accountNumber"] = this.initialAccountNumber;
            if(!kony.sdk.isNullOrUndefined(this.initialAccountNumber) && this.initialAccountNumber !== "") {
              this.inputPool[this.getFieldValue(this._accTxtInput,"inputPoolKey")] = this.initialAccountNumber;
            }
            return true;
          } else {
            this.updateInputBulletsAccountNumber("flxReEnterAccountNumberInput");
            return false;
          }
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in isValidAccountNumberOrNot method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**     
	 * Component getLastNDigits
     * To get last n number of digits
    **/
    getLastNDigits: function(string, n){
      return string.substring(string.length - n)
    },
    /**     
	 * Component onReEnterAccountNumberContinueNavigation
     * Navigate to next screen based on flow type.
    **/
    onReEnterAccountNumberContinueNavigation: function() {
      try {
        
        if(this.payeeFlow === "EDIT") {            							 
          this.setVerifyDetails();
          this.navigateTo("flxVerifyDetails", "flxVfsHeaderTop", this.getFieldValue(this._vfsSectionTitle));
        }
        else if(this._beneficiaryTypes === "DomesticBank" || this._beneficiaryTypes === "InternationalBank") {
          if(this._rcsVisibility === true){
            this.setRequiredCode();
            this.navigateTo("flxRequiredCode","flxRequiredCodeTop",this.getFieldValue(this._rcsHdr));
          }else{
            this.setLinkPayee("ADD");
            if(!this.isSingleUser)
              this.navigateTo("flxLinkPayee", "flxLinkPayeeTop", this.getFieldValue(this._linkPayeeSectionTitle));
          }        
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in onReEnterAccountNumberContinueNavigation method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**     
	 * Component onIBANSuccess
     * Method to be invoke on IBAN success call back.
    **/
    onIBANSuccess: function(response) {
      try {
        																
        this.onRequestEnd();
        this.isIBANValid = response.isIBANValid;
        if(this.payeeFlow === "EDIT") {															   
          this.setVerifyDetails();
          this.navigateTo("flxVerifyDetails", "flxVfsHeaderTop", this.getFieldValue(this._vfsSectionTitle));         
        } else {				
          if(this.isIBANValid === "YES") {
            this.inputPool["accountNumber"] = response.iban;
            this.inputPool["IBANCountryCode"] = response.iban.slice(0,2);
            this.invokeSwiftServiceFromIBAN();
          } else {
            this.onIBANFailure();
          }
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in onIBANSuccess method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**     
	 * Component invokeSwiftServiceFromIBAN
     * Invoke service to get swift code for IBAN.
    **/
    invokeSwiftServiceFromIBAN : function(){
      try {
       
        this.onRequestStart();
        this.setCriteria(this._rcsSwiftCriteria);
        var objSvcName = this.getFieldValue(this._rcsGetSwiftService);
        var objName = this.getFieldValue(this._rcsSwiftObject);
        var operationName = this.getFieldValue(this._rcsSwiftOperation);
        var criteria = this.getCriteria();
        this.UnifiedTransferDAO.invokeService
        (objSvcName,objName,operationName,criteria,"",this.setSwiftCodeForNewPayee,this.onSwiftServiceFailure);
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in invokeSwiftServiceFromIBAN method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }																							 
    },
    /**     
	 * Component onSwiftServiceFailure
    **/
    onSwiftServiceFailure: function() {
      try {
       
        this.failureValidation();
        this.onReEnterAccountNumberContinueNavigation();    
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in onSwiftServiceFailure method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**     
	 * Component setSwiftCodeForNewPayee
     * Get swift code anad bank Name from response and set to the context.
    **/
    setSwiftCodeForNewPayee : function(response) {
      try {
        
        var bic = response[this.getFieldValue("bic")];
        var bankName = response[this.getFieldValue("bankName")];
        if(!this.isEmptyNullUndefined(bic))  {       
           this.inputPool[this.getFieldValue(this._rcsTextbox1, "inputPoolKey")] = bic;
        } 
        this.view.flxField6.height = "54dp";
        if(!this.isEmptyNullUndefined(bankName)) {       
         this.inputPool["bankName"] = bankName;
         this.inputPool["ibanBankName"] = bankName;
         if(bankName.length > 105) {
           this.view.flxField6.height = "80dp";
           bankName = bankName.substr(0,104) + "....";
           this.inputPool["ibanBankName"] = bankName;
          }
        }
        this.onRequestEnd();
        this.onReEnterAccountNumberContinueNavigation();  
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setSwiftCodeForNewPayee method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**     
	 * Component onAccountNumberSuccess
     * Method to be invoke on Account Number success call back.
    **/
    onAccountNumberSuccess: function(response) {
      try {
        
        this.onRequestEnd();																
        if(!response.beneficiaryName) {                    
          this.view.lblReEnterAccountNumberErrorMsg.text = this.getFieldValue(this._accExistMsg);																											   
          this.view.lblReEnterAccountNumberErrorMsg.setVisibility(true);
          this.keypadStringAccountNumber = '';
          this.updateInputBulletsAccountNumber("flxReEnterAccountNumberInput");
          this.incompleteCodeView();
        } else {
          this.inputPool["payeeName"] = response.beneficiaryName;			
          this.inputPool["toAvailableBalance"] =response.beneficiaryName;
          this.inputPool["beneficiaryName"] =response.beneficiaryName;
          if(this.payeeFlow === "EDIT") {
            this.setVerifyDetails();
            this.navigateTo("flxVerifyDetails", "flxVfsHeaderTop", this.getFieldValue(this._vfsSectionTitle));
          }
          else{
            if(this._beneficiaryTypes === "SameBank"){
              this.setLinkPayee("ADD");
              if(!this.isSingleUser)
                this.navigateTo("flxLinkPayee", "flxLinkPayeeTop", this.getFieldValue(this._linkPayeeSectionTitle));													 
            } 
          }
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in onAccountNumberSuccess method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**         
	 * Component isExistingAccount
     * Checking whether it is existing account Number.
    **/
    isExistingAccount: function(accountNumber) {
      try {
       
        var existingAccounts = this.existToAccounts;
        for(var index in existingAccounts) {
          if(!this.isEmptyNullUndefined(existingAccounts[index].accountNumber)) {
            if(accountNumber.toUpperCase() === existingAccounts[index].accountNumber.toUpperCase()) {
              return accountNumber;
            }
          }
          else if(!this.isEmptyNullUndefined(existingAccounts[index].accountID)) {
            if(accountNumber.toUpperCase() === existingAccounts[index].accountID.toUpperCase()) {
              return accountNumber;
            }
          }
        }
        return "";
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in isExistingAccount method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**     
	 * Component invokeValidateIBANService
     * Invoke validate IBAN service to check valid or not.
    **/
    invokeValidateIBANService : function() {
      try {
       
        this.onRequestStart();
        this.setCriteria(this._accValidationCriteria);
        var objSvcName = this.getFieldValue(this._accValidationService);
        var objName = this.getFieldValue(this._accValidationObject);
        var operationName = this.getFieldValue(this._accValidationOperation);
        var criteria = this.getCriteria();
        this.UnifiedTransferDAO.invokeService
        (objSvcName,objName,operationName,criteria,"",this.onIBANSuccess,this.failureValidation); 
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in invokeValidateIBANService method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },    
    /**     
	 * Component btnAccountNumberBackOnClick
     * Function for back navigation - Account Number 
    **/
    btnAccountNumberBackOnClick: function(){
      try {
          
        if(this.stack.length>1)
        {
          this.goBack();	
        }
        else
        {
          this.onBackButtonClick();
        }

      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in btnAccountNumberBackOnClick method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
      }
    },
    /**     
	 * Component btnReEnterAccountNumberBackOnClick
     * Function for back navigation - Re-enter Account Number
    **/
    btnReEnterAccountNumberBackOnClick: function(){
      try{
        
        this.flxNameAccountNumberScreen = "flxAccountNumberInput";
        this.keypadStringAccountNumber = this.initialAccountNumber;
        this.goBack();														
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in btnReEnterAccountNumberBackOnClick method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
      }
    },
    /**     
	 * Component setRequiredCode
     * To call default text, skins and actions methods for required code screen
     */  
    setRequiredCode:function(){
      this.setRequiredCodeDefaultText();
      this.setRequiredCodeSkins();
      this.setRequiredCodeData();
      this.setRequiredCodeActions();
      this.setScrollHeight(this.view.flxRequiredCodeContainer, 80, 90);
    },

    setScrollHeight : function(scrollWidget,subHeaderHeight,buttonHeight){
      if (kony.os.deviceInfo().name === "iPhone") {
        scrollWidget.height = "75%";
        return;
      }
      let screenSize = this.view.info.frame.height;
      if(kony.os.deviceInfo().name !== "iPhone") {
        screenSize = screenSize - 110;
      }
      //removing subHeader and shadow
      if (subHeaderHeight) {
        screenSize = screenSize - subHeaderHeight - 15;
      }
      //removing button
      if (buttonHeight) {
        screenSize = screenSize - buttonHeight;
      }
      scrollWidget.height = screenSize + "dp";
    },

    /**     
	 * Component setRequiredCodeData
     * To set values for required code fields
     */  
    setRequiredCodeData:function(){
      
      this.view.lblErrorMsgRequirecode.setVisibility(false);
      if(!this.isEmptyNullUndefined(this.inputPool[this.getFieldValue(this._rcsTextbox1,"inputPoolKey")])){
        this.view.txtRequiredBICSwift.text = this.getFieldValue(this._rcsTextbox1,"value");
      }else{
        this.view.txtRequiredBICSwift.text = "";
      }
      if(!this.isEmptyNullUndefined(this.inputPool[this.getFieldValue(this._rcsTextbox2,"inputPoolKey")])){
        this.view.txtRequiredClearingCode1.text = this.getFieldValue(this._rcsTextbox2,"value");  
      }else{
        this.view.txtRequiredClearingCode1.text = "";
      }
      if(!this.isEmptyNullUndefined(this.inputPool[this.getFieldValue(this._rcsTextbox3,"inputPoolKey")])){
        this.view.txtRequiredClearingCode2.text = this.getFieldValue(this._rcsTextbox3,"value");  
      }else{
        this.view.txtRequiredClearingCode2.text = "";
      }
      let fieldValue = this.getFieldValue(this._rcsValue1);
      if(!this.isEmptyNullUndefined(fieldValue)){
        this.view.lblSelectValue1.text = fieldValue;
      } else{
        this.view.lblSelectValue1.text = "";
      }

      fieldValue = this.getFieldValue(this._rcsValue2);
      if(!this.isEmptyNullUndefined(fieldValue)){
        this.view.lblSelectValue2.text = fieldValue;
      } else{
        this.view.lblSelectValue2.text = "";
      }

      fieldValue = this.getFieldValue(this._rcsValue3);
      if(!this.isEmptyNullUndefined(fieldValue)){
        this.view.lblSelectValue3.text = fieldValue;
      } else{
        this.view.lblSelectValue3.text = "";
      }

      fieldValue = this.getFieldValue(this._rcsValue4);
      if(!this.isEmptyNullUndefined(fieldValue)){
        this.view.lblSelectValue4.text = fieldValue;
      } else{
        this.view.lblSelectValue4.text = "";
      }

      fieldValue = this.getFieldValue(this._rcsValue5);
      if(!this.isEmptyNullUndefined(fieldValue)){
        this.view.lblSelectValue5.text = fieldValue;
      } else{
        this.view.lblSelectValue5.text = "";
      }

      fieldValue = this.getFieldValue(this._rcsValue6);
      if(!this.isEmptyNullUndefined(fieldValue)){
        this.view.lblSelectValue6.text = fieldValue;
      } else{
        this.view.lblSelectValue6.text = "";
      }
      this.validateIntNewPayeeBankDetails();
    },

    /**     
	 * Component setRequiredCodeDefaultText
     * To set default text for required code screen
     */  
    setRequiredCodeDefaultText:function(){
     
      if(!this.isEmptyNullUndefined(this.getFieldValue(this._rcsHdr))){
        this.view.lblRequiredCodeHeader.text = this.getFieldValue(this._rcsHdr);
        this.view.lblRequiredCodeHeader.setVisibility(true);
      }else{
        this.view.lblRequiredCodeHeader.setVisibility(false);
      }
      if(!this.isEmptyNullUndefined(this.getFieldValue(this._rcsSubhdr))){
        this.view.lblRequiredCodeDescription.text = this.getFieldValue(this._rcsSubhdr);
        this.view.flxRequiredCodeDescription.setVisibility(true);
      }else{
        this.view.flxRequiredCodeDescription.setVisibility(false);
      }

      if(!this.isEmptyNullUndefined(this.getFieldValue(this._rcsTextbox1Label))){
        this.view.lblRequiredBICSwift.text = this.getFieldValue(this._rcsTextbox1Label);
        this.view.lblRequiredBICSwift.setVisibility(true);
      }else{
        this.view.lblRequiredBICSwift.setVisibility(false);
      }

      if(!this.isEmptyNullUndefined(this._rcsTextbox1)){
        this.view.txtRequiredBICSwift.placeholder = this.getFieldValue(this._rcsTextbox1,"placeHolder");
        this.view.flxRequiredBICwrapper.setVisibility(true);
      }else{
        this.view.flxRequiredBICwrapper.setVisibility(false);
      }

      if(!this.isEmptyNullUndefined(this.getFieldValue(this._rcsTextbox2Label))){
        this.view.lblRequiredClearingCode1.text = this.getFieldValue(this._rcsTextbox2Label);
        this.view.flxHeading1.setVisibility(true);
      }else{
        this.view.flxHeading1.setVisibility(false);
      }

      if(!this.isEmptyNullUndefined(this._rcsTextbox2)){
        this.view.txtRequiredClearingCode1.placeholder = this.getFieldValue(this._rcsTextbox2,"placeHolder");
        this.view.flxClearingCode1.setVisibility(true);
      }else{
        this.view.flxClearingCode1.setVisibility(false);
      }

      if(!this.isEmptyNullUndefined(this.getFieldValue(this._rcsTextbox3Label))){
        this.view.lblRequiredClearingCode2.text = this.getFieldValue(this._rcsTextbox3Label);
        this.view.flxHeading2.setVisibility(true);
      }else{
        this.view.flxHeading2.setVisibility(false);
      }

      if(!this.isEmptyNullUndefined(this._rcsTextbox3)){
        this.view.txtRequiredClearingCode2.placeholder = this.getFieldValue(this._rcsTextbox3,"placeHolder");
        this.view.flxClearingCode2.setVisibility(true);
      }else{
        this.view.flxClearingCode2.setVisibility(false);
      }

      if(!this.isEmptyNullUndefined(this.getFieldValue(this._rcsCTAButton1))){
        this.view.btnRequiredBICSwiftCodeLookUp.text = this.getFieldValue(this._rcsCTAButton1,"text");
        this.view.btnRequiredBICSwiftCodeLookUp.setVisibility(true);
      }else{
        this.view.btnRequiredBICSwiftCodeLookUp.setVisibility(false);
      }

      if(!this.isEmptyNullUndefined(this.getFieldValue(this._rcsCTAButton2))){
        this.view.btnRequiredCodeContinue.text = this.getFieldValue(this._rcsCTAButton2,"text");
        this.view.flxRequiredCodeBtncontinue.setVisibility(true);
      }else{
        this.view.flxRequiredCodeBtncontinue.setVisibility(false);
      }

      if(this.getFieldValue(this._rcsAcceptBICSwift)){
        this.view.flcRequiredBicSwift.setVisibility(true);
      }else{
        this.view.flcRequiredBicSwift.setVisibility(false);
      }
      if(this.getFieldValue(this._rcsAcceptClearcode)){
        this.view.flxClearingCode1.setVisibility(true);
        this.view.flxClearingCode2.setVisibility(false);
      }else{
        this.view.flxClearingCode1.setVisibility(false);
        this.view.flxClearingCode2.setVisibility(false);
      }  

      let fieldValue = "";
      fieldValue = this.getFieldValue(this._rcsLabel1);
      if(!this.isEmptyNullUndefined(fieldValue)){
        this.view.lblSelectLabel1.text = fieldValue;
        this.view.flxSelect1.setVisibility(true);
      }else{
        this.view.flxSelect1.setVisibility(false);
      }
      
      fieldValue = this.getFieldValue(this._rcsLabel2);
      if(!this.isEmptyNullUndefined(fieldValue)){
        this.view.lblSelectLabel2.text = fieldValue;
        this.view.flxSelect2.setVisibility(true);
      }else{
        this.view.flxSelect2.setVisibility(false);
      }
      
      fieldValue = this.getFieldValue(this._rcsLabel3);
      if(!this.isEmptyNullUndefined(fieldValue)){
        this.view.lblSelectLabel3.text = fieldValue;
        this.view.flxSelect3.setVisibility(true);
      }else{
        this.view.flxSelect3.setVisibility(false);
      }
      
      fieldValue = this.getFieldValue(this._rcsLabel4);
      if(!this.isEmptyNullUndefined(fieldValue)){
        this.view.lblSelectLabel4.text = fieldValue;
        this.view.flxSelect4.setVisibility(true);
      }else{
        this.view.flxSelect4.setVisibility(false);
      }
      
      fieldValue = this.getFieldValue(this._rcsLabel5);
      if(!this.isEmptyNullUndefined(fieldValue)){
        this.view.lblSelectLabel5.text = fieldValue;
        this.view.flxSelect5.setVisibility(true);
      }else{
        this.view.flxSelect5.setVisibility(false);
      }
      
      fieldValue = this.getFieldValue(this._rcsLabel6);
      if(!this.isEmptyNullUndefined(fieldValue)){
        this.view.lblSelectLabel6.text = fieldValue;
        this.view.flxSelect6.setVisibility(true);
      }else{
        this.view.flxSelect6.setVisibility(false);
      }
    },

    /**     
	 * Component setRequiredCodeSkins
     * To set skins for required code screen
     */
    setRequiredCodeSkins:function(){
      
      this.view.flxRequiredCodeHeader.skin = this.getFieldValue(this._gsknHeaderFlex);
      this.view.btnRequireCodeCancel.skin = this.getFieldValue(this._gsknCancelBtn);
      this.view.lblRequiredCodeHeader.skin = this.getFieldValue(this._gsknHeaderLbl);
      this.view.flxRequiredCodeDescription.skin = this.getFieldValue(this._gsknSubHeaderFlex);
      this.view.lblRequiredCodeDescription.skin = this.getFieldValue(this._gsknSubHeaderLabel);
      this.view.flxRequireCodeBtnSeparator.skin = this.getFieldValue(this._gsknSubHeaderseparator);
      this.view.lblRequiredBICSwift.skin = this.getFieldValue(this._gsknInputFieldLabel);
      this.view.txtRequiredBICSwift.skin = this.getFieldValue(this._gsknTextBoxNormal);
      this.view.txtRequiredBICSwift.focusSkin = this.getFieldValue(this._gsknTextBoxFocus);
      this.view.btnRequiredBICSwiftCodeLookUp.skin = this.getFieldValue(this._rcsSwiftLookupBtnSkn);
      this.view.flxRequiredBICSeparator.skin = this.getFieldValue(this._gsknSubHeaderseparator);
      this.view.lblRequiredClearingCode1.skin = this.getFieldValue(this._gsknInputFieldLabel);
      this.view.txtRequiredClearingCode1.skin = this.getFieldValue(this._gsknTextBoxNormal);
      this.view.txtRequiredClearingCode1.focusSkin = this.getFieldValue(this._gsknTextBoxFocus);
      this.view.flxRequiredClearingCode1Separator.skin = this.getFieldValue(this._gsknSubHeaderseparator);
      this.view.lblRequiredClearingCode2.skin = this.getFieldValue(this._gsknInputFieldLabel);
      this.view.txtRequiredClearingCode2.skin = this.getFieldValue(this._gsknTextBoxNormal);
      this.view.txtRequiredClearingCode2.focusSkin = this.getFieldValue(this._gsknTextBoxFocus);
      this.view.flxRequiredClearingCode2Separator.skin = this.getFieldValue(this._gsknSubHeaderseparator); 
      this.view.flxRequireCodeBtnSeparator.skin = this.getFieldValue(this._gsknSubHeaderseparator);
      this.view.btnRequiredCodeContinue.focusSkin = this.getFieldValue(this._gsknPrimaryContexualBtn);
      this.disableButton("btnRequiredCodeContinue");
    },

    /**     
	 * Component setRequiredCodeSkins
     * To declare the actions for required code screen buttons
     */
    setRequiredCodeActions:function(){
      var scope = this;
      scope.view.btnRequiredCodeContinue.onClick = scope.requiredCodeInputValidation;
      scope.view.btnRequiredBICSwiftCodeLookUp.onClick= scope.setSwiftSearchInput;
      scope.view.btnCCLookUp.onClick= scope.setBCCSearchInput;
      scope.view.imgRequireCodeBack.onTouchEnd= scope.goBack;
      scope.view.btnRequireCodeCancel.onClick = scope.onBackButtonClick;

      if(!scope.isEmptyNullUndefined(scope.view.txtRequiredBICSwift.text)||!scope.isEmptyNullUndefined(scope.view.txtRequiredClearingCode1.text)||!scope.isEmptyNullUndefined(scope.view.txtRequiredClearingCode2.text)){
        scope.enableButton("btnRequiredCodeContinue");
      }else{
        scope.disableButton("btnRequiredCodeContinue");
      }

      scope.view.txtRequiredBICSwift.onTextChange = function(){
        scope.inputPool["bic"] = scope.view.txtRequiredBICSwift.text;
        scope.view.txtRequiredBICSwift.skin = scope.getFieldValue(scope._gsknTextBoxNormal);
        scope.view.txtRequiredBICSwift.focusSkin = scope.getFieldValue(scope._gsknTextBoxFocus);
        scope.view.lblErrorMsgRequirecode.setVisibility(false);
        var dataJSON = {
          "txtRequiredBICSwift": scope.view.txtRequiredBICSwift.text,
          "txtRequiredClearingCode1": scope.view.txtRequiredClearingCode1.text,
          "txtRequiredClearingCode2": scope.view.txtRequiredClearingCode2.text
        }; 
        var dataValidator = scope.maxFillValidate(dataJSON);
        if(!scope.isEmptyNullUndefined(scope.view.txtRequiredBICSwift.text)||!scope.isEmptyNullUndefined(scope.view.txtRequiredClearingCode1.text)||!scope.isEmptyNullUndefined(scope.view.txtRequiredClearingCode2.text)){
          scope.enableButton("btnRequiredCodeContinue");
        }else{
          scope.disableButton("btnRequiredCodeContinue");
        }
        if(Object.keys(dataValidator).length === 0 && dataValidator.constructor === Object){
          scope.enableButton("btnRequiredCodeContinue");
        }
        else{
          scope.disableButton("btnRequiredCodeContinue");
        }
        scope.validateIntNewPayeeBankDetails();
      };
      scope.view.txtRequiredBICSwift.onEndEditing = scope.getBankDetailsFromSwift;
      scope.view.txtRequiredBICSwift.onDone = scope.getBankDetailsFromSwift;

      scope.view.txtRequiredClearingCode1.onTextChange = function(){
        scope.inputPool["clearingCode1"] = scope.view.txtRequiredClearingCode1.text;
        scope.view.lblErrorMsgRequirecode.setVisibility(false);
        scope.view.txtRequiredClearingCode1.skin = scope.getFieldValue(scope._gsknTextBoxNormal);
        scope.view.txtRequiredClearingCode1.focusSkin = scope.getFieldValue(scope._gsknTextBoxFocus);
        var dataJSON = {
          "txtRequiredBICSwift": scope.view.txtRequiredBICSwift.text,
          "txtRequiredClearingCode1": scope.view.txtRequiredClearingCode1.text,
          "txtRequiredClearingCode2": scope.view.txtRequiredClearingCode2.text
        }; 
        var dataValidator = scope.maxFillValidate(dataJSON);
        if(!scope.isEmptyNullUndefined(scope.view.txtRequiredBICSwift.text)||!scope.isEmptyNullUndefined(scope.view.txtRequiredClearingCode1.text)||!scope.isEmptyNullUndefined(scope.view.txtRequiredClearingCode2.text)){
          scope.enableButton("btnRequiredCodeContinue");
        }else{
          scope.disableButton("btnRequiredCodeContinue");
        }
        if(Object.keys(dataValidator).length === 0 && dataValidator.constructor === Object){
          scope.enableButton("btnRequiredCodeContinue");
        }
        else{
          scope.disableButton("btnRequiredCodeContinue");
        }
        scope.validateIntNewPayeeBankDetails();

      };

      scope.view.txtRequiredClearingCode2.onTextChange = function(){
        scope.view.lblErrorMsgRequirecode.setVisibility(false);
        scope.view.txtRequiredClearingCode2.skin = scope.getFieldValue(scope._gsknTextBoxNormal);
        scope.view.txtRequiredClearingCode2.focusSkin = scope.getFieldValue(scope._gsknTextBoxFocus);
        var dataJSON = {
          "txtRequiredBICSwift": scope.view.txtRequiredBICSwift.text,
          "txtRequiredClearingCode1": scope.view.txtRequiredClearingCode1.text,
          "txtRequiredClearingCode2": scope.view.txtRequiredClearingCode2.text
        }; 
        var dataValidator = scope.maxFillValidate(dataJSON);
        if(!scope.isEmptyNullUndefined(scope.view.txtRequiredBICSwift.text)||!scope.isEmptyNullUndefined(scope.view.txtRequiredClearingCode1.text)||!scope.isEmptyNullUndefined(scope.view.txtRequiredClearingCode2.text)){
          scope.enableButton("btnRequiredCodeContinue");
        }else{
          scope.disableButton("btnRequiredCodeContinue");
        }
        if(Object.keys(dataValidator).length === 0 && dataValidator.constructor === Object){
          scope.enableButton("btnRequiredCodeContinue");
        }
        else{
          scope.disableButton("btnRequiredCodeContinue");
        }
        scope.validateIntNewPayeeBankDetails();

      };
      this.view.flxSelect1.onClick = this.selectClicked.bind(this,1);
      this.view.flxSelect2.onClick = this.selectClicked.bind(this,2);
      this.view.flxSelect3.onClick = this.selectClicked.bind(this,3);
      this.view.flxSelect4.onClick = this.selectClicked.bind(this,4);
      this.view.flxSelect5.onClick = this.selectClicked.bind(this,5);
      this.view.flxSelect6.onClick = this.selectClicked.bind(this,6);
    },
    validateIntNewPayeeBankDetails : function(){
      if (this._beneficiaryTypes =="SameBank" || this._beneficiaryTypes=="PayAPerson") {
        return;
      }
      if(this.view.txtRequiredBICSwift.text !== ""){
        //swift bic is present
        this.enableButton("btnRequiredCodeContinue");
        return;
      }
      if(this.view.txtRequiredClearingCode1.text !== "" && !this.isEmptyNullUndefined(this.inputPool["clearingIdentifierCode"])){
        //bank's Clearing code with Clearing Identifier code is present
        this.enableButton("btnRequiredCodeContinue");
        return;
      }
      if (!this.isEmptyNullUndefined(this.inputPool["bankName"]) && !this.isEmptyNullUndefined(this.inputPool["payeeBankTown"]) && !this.isEmptyNullUndefined(this.inputPool["payeeBankCountry"])) {
        // bank's name with Town and Country is present
        this.enableButton("btnRequiredCodeContinue");
        return;
      }
      if (!this.isEmptyNullUndefined(this.inputPool["bankName"]) && !this.isEmptyNullUndefined(this.inputPool["intermediaryBIC"])) {
        //Bank's name and Intermediary BIC is present
        this.enableButton("btnRequiredCodeContinue");
        return;
      }
      //mandatory combination of feilds are not filled
      this.disableButton("btnRequiredCodeContinue");
    },

    selectClicked : function(linkID){
      switch (linkID) {
        case 1:
          // nav to CIC
          this.navToCIC();
          break;
        case 2:
          // nav to Bank Name
          this.navToPayeeBankName();
          break;
        case 3:
          // nav to Street name
          this.navToPayeeBankStreet();
          break;
        case 4:
          // nav to Town
          this.navToPayeeBankTown();
          break;
        case 5:
          // nav to Country
          this.navToPayeeBankCountry();
          break;
        case 6:
          // nav to Intermediary BIC
          this.navToIntermediaryBIC();
          break;
      
        default:
          break;
      }

    },
    //CIC
    navToCIC : function(){
      if (this.inputPool.cicCodes === null || this.inputPool.cicCodes === undefined) {
        this.inputPool.cicCodes = [];
        this.onRequestStart();
        this.setCriteria(this._cicCriteria)
        var objSvcName = this.getFieldValue(this._cicService);
        var objName = this.getFieldValue(this._cicObject);
        var operationName = this.getFieldValue(this._cicVerb);
        var criteria = this.getCriteria();
        var unicode = "";
        this.UnifiedTransferDAO.invokeService
        (objSvcName,objName,operationName,criteria,unicode,this.onCICSuccess,this.failureValidation);
      } else{
        this.setupCICUI();
        this.navigateTo("flxCIC", "flxCICTop", this.getFieldValue(this._cicHeader));
      }
    },
    onCICSuccess : function(response){
      this.onRequestEnd();
      this.inputPool.cicCodes = response.PurposeCodes;
      this.setupCICUI();
      this.navigateTo("flxCIC", "flxCICTop", this.getFieldValue(this._cicHeader));
    },
    setupCICUI : function(){
      if(!this.isEmptyNullUndefined(this.getFieldValue(this._cicHeader))){
        this.view.lblCICHeader.text = this.getFieldValue(this._cicHeader);
        this.view.lblCICHeader.setVisibility(true);
      }else{
        this.view.lblCICHeader.setVisibility(false);
      }
      if (this.inputPool.cicCodes !== undefined) {
        var segData=[];
        for(var i = 0; i < this.inputPool.cicCodes.length;i++){
          var rowData={};
          rowData["lblContactType"] = {
            "skin" : this._ctsContactTypeSkn,
            "text": this.inputPool.cicCodes[i]
          }
          if (this.inputPool["clearingIdentifierCode"] !== undefined && this.inputPool["clearingIdentifierCode"] === this.inputPool.cicCodes[i]) {
            rowData["flxContactTypeMain"] = {
              "skin" : this._ctsContactSelectionSkn
            }
          } else{
            rowData["flxContactTypeMain"] = {
              "skin" : ""
            }
          }
          segData.push(rowData);
        };  
        var widgetMap = {
          "flxContactTypeMain":"flxContactTypeMain",
          "lblContactType":"lblContactType"
        };
        this.view.segCIC.widgetDataMap = widgetMap;
        this.view.segCIC.setData(segData);
      }

      this.view.segCIC.onRowClick = this.onSegCICRowClick;
      this.view.flxCICback.onClick = this.goBack;
      this.view.btnCICCancel.onClick = this.onBackButtonClick;
      this.setScrollHeight(this.view.flxCICList);
    },
    onSegCICRowClick : function(){
      var rowIndex = this.view.segCIC.selectedRowIndex[1];
      let segData = this.view.segCIC.data;
      let selectedCIC = segData[rowIndex].lblContactType.text;
      for (let i = 0; i < segData.length; i++) {
        segData[i].flxContactTypeMain.skin = "";
      }
      segData[rowIndex].flxContactTypeMain.skin = this._ctsContactSelectionSkn;
      this.view.segCIC.setData(segData);
      this.inputPool["clearingIdentifierCode"] = selectedCIC;
      this.inputPool["clearingIdentifierCodePayload"] = selectedCIC.split("-")[0].trim();
      if (this.stack[this.stack.length - 2] === "flxVerifyDetails") {
        this.setVerifyDetails();
      } else{
        this.setRequiredCodeData();
      }
      this.goBack();
    },
    //Payee Bank Street
    navToPayeeBankStreet : function(){
      if(!this.isEmptyNullUndefined(this.getFieldValue(this._pbsHeader))){
        this.view.lblPayeeBankStreetHeader.text = this.getFieldValue(this._pbsHeader);
        this.view.lblPayeeBankStreetHeader.setVisibility(true);
      }else{
        this.view.lblPayeeBankStreetHeader.setVisibility(false);
      }

      if(!this.isEmptyNullUndefined(this.getFieldValue(this._pbsSubHeader))){
        this.view.lblPayeeBankStreetSubHeader.text = this.getFieldValue(this._pbsSubHeader);
        this.view.lblPayeeBankStreetSubHeader.setVisibility(true);
      }else{
        this.view.lblPayeeBankStreetSubHeader.setVisibility(false);
      }

      if(!this.isEmptyNullUndefined(this.getFieldValue(this._pbsTextBox))){
        this.view.tbxPayeeBankStreet.placeholder = this.getFieldValue(this._pbsTextBox,"placeHolder");
      }
      if (this.inputPool.payeeBankStreet !== undefined) {
        this.view.tbxPayeeBankStreet.text = this.inputPool.payeeBankStreet;
      }

      if(!this.isEmptyNullUndefined(this.getFieldValue(this._pbsCTA))){
        this.view.btnPayeeBankStreetContinue.text = this.getFieldValue(this._pbsCTA,"text");
      }
      this.view.flxPayeeBankStreetBack.onClick = this.goBack;
      this.view.btnPayeeBankStreetCancel.onClick = this.onBackButtonClick;
      this.view.btnPayeeBankStreetContinue.onClick = this.savePBSAndGoBack;
      this.enableButton("btnPayeeBankStreetContinue");
      this.navigateTo("flxPayeeBankStreet", "flxPayeeBankStreetTop", this.getFieldValue(this._pbsHeader));
    },
    savePBSAndGoBack : function(){
      this.inputPool["payeeBankStreet"] = this.view.tbxPayeeBankStreet.text;
      if (this.stack[this.stack.length - 2] === "flxVerifyDetails") {
        this.setVerifyDetails();
      } else{
        this.setRequiredCodeData();
      }
      this.goBack();
    },
    //Payee Bank Town
    navToPayeeBankTown : function(){
      if(!this.isEmptyNullUndefined(this.getFieldValue(this._pbtHeader))){
        this.view.lblPayeeBankTownHeader.text = this.getFieldValue(this._pbtHeader);
        this.view.lblPayeeBankTownHeader.setVisibility(true);
      }else{
        this.view.lblPayeeBankTownHeader.setVisibility(false);
      }

      if(!this.isEmptyNullUndefined(this.getFieldValue(this._pbtSubHeader))){
        this.view.lblPayeeBankTownSubHeader.text = this.getFieldValue(this._pbtSubHeader);
        this.view.lblPayeeBankTownSubHeader.setVisibility(true);
      }else{
        this.view.lblPayeeBankTownSubHeader.setVisibility(false);
      }

      if(!this.isEmptyNullUndefined(this.getFieldValue(this._pbtTextBox))){
        this.view.tbxPayeeBankTown.placeHolder = this.getFieldValue(this._pbtTextBox,"placeHolder");
      }
      if (this.inputPool.payeeBankTown !== undefined) {
        this.view.tbxPayeeBankTown.text = this.inputPool.payeeBankTown;
      }

      if(!this.isEmptyNullUndefined(this.getFieldValue(this._pbtCTA))){
        this.view.btnPayeeBankTownContinue.text = this.getFieldValue(this._pbtCTA,"text");
      }
      this.view.flxPayeeBankTownBack.onClick = this.goBack;
      this.view.btnPayeeBankTownCancel.onClick = this.onBackButtonClick;
      this.view.btnPayeeBankTownContinue.onClick = this.savePBTAndGoBack;
      this.enableButton("btnPayeeBankTownContinue");
      this.navigateTo("flxPayeeBankTown", "flxPayeeBankTownTop", this.getFieldValue(this._pbtHeader));
    },
    savePBTAndGoBack : function(){
      this.inputPool["payeeBankTown"] = this.view.tbxPayeeBankTown.text;
      if (this.stack[this.stack.length - 2] === "flxVerifyDetails") {
        this.setVerifyDetails();
      } else{
        this.setRequiredCodeData();
      }
      this.goBack();
    },
    //Payee Bank Country
    navToPayeeBankCountry : function(){
      if (this.inputPool.countryNames === null || this.inputPool.countryNames === undefined) {
        this.inputPool.countryNames = [];
        this.onRequestStart();
        this.setCriteria(this._getAllCountriesCriteria)
        var objSvcName = this.getFieldValue(this._getAllCountriesService);
        var objName = this.getFieldValue(this._getAllCountriesObject);
        var operationName = this.getFieldValue(this._getAllCountriesVerb);
        var criteria = this.getCriteria();
        var unicode = "";
        this.UnifiedTransferDAO.invokeService
        (objSvcName,objName,operationName,criteria,unicode,this.onCountrySuccess,this.failureValidation);
      } else{
        this.setupPayeeBankCountryUI();
        this.navigateTo("flxPayeeBankCountry", "flxPayeeBankCountryTop", this.getFieldValue(this._pbcHeader));
      }
    },
    onCountrySuccess : function(response){
      this.onRequestEnd();
      this.inputPool.countryNames = response.records;
      this.setupPayeeBankCountryUI();
      this.navigateTo("flxPayeeBankCountry", "flxPayeeBankCountryTop", this.getFieldValue(this._pbcHeader));
    },
    setupPayeeBankCountryUI : function(){
      if(!this.isEmptyNullUndefined(this.getFieldValue(this._pbcHeader))){
        this.view.lblPayeeBankCountryHeader.text = this.getFieldValue(this._pbcHeader);
        this.view.lblPayeeBankCountryHeader.setVisibility(true);
      }else{
        this.view.lblPayeeBankCountryHeader.setVisibility(false);
      }

      if (this.inputPool.countryNames !== undefined) {
        var segData=[];
        for(var i = 0; i < this.inputPool.countryNames.length;i++){
          var rowData={};
          rowData["lblContactType"] = {
            "skin" : this._ctsContactTypeSkn,
            "text": this.inputPool.countryNames[i].Name
          }
          if (this.inputPool["payeeBankCountry"] !== undefined && this.inputPool["payeeBankCountry"] === this.inputPool.countryNames[i].Name) {
            rowData["flxContactTypeMain"] = {
              "skin" : this._ctsContactSelectionSkn
            }
          } else{
            rowData["flxContactTypeMain"] = {
              "skin" : ""
            }
          }
          segData.push(rowData);
        };  
        var widgetMap = {
          "flxContactTypeMain":"flxContactTypeMain",
          "lblContactType":"lblContactType"
        };
        this.view.segPayeeBankCountry.widgetDataMap = widgetMap;
        this.view.segPayeeBankCountry.setData(segData);
      }

      this.view.segPayeeBankCountry.onRowClick = this.onSegPayeeBankCountryRowClick;
      this.view.flxPayeeBankCountryBack.onClick = this.goBack;
      this.view.btnPayeeBankCountryCancel.onClick = this.onBackButtonClick;
      this.setScrollHeight(this.view.flxPayeeBankCountryList);
    },
    onSegPayeeBankCountryRowClick : function(){
      var rowIndex = this.view.segPayeeBankCountry.selectedRowIndex[1];
      let segData = this.view.segPayeeBankCountry.data;
      let selectedPBC = segData[rowIndex].lblContactType.text;
      for (let i = 0; i < segData.length; i++) {
        segData[i].flxContactTypeMain.skin = "";
      }
      segData[rowIndex].flxContactTypeMain.skin = this._ctsContactSelectionSkn;
      this.view.segPayeeBankCountry.setData(segData);
      this.inputPool["payeeBankCountry"] = selectedPBC;
      if (this.stack[this.stack.length - 2] === "flxVerifyDetails") {
        this.setVerifyDetails();
      } else{
        this.setRequiredCodeData();
      }
      this.goBack();
    },
    //Payee Bank Name
    navToPayeeBankName : function(){
      if(!this.isEmptyNullUndefined(this.getFieldValue(this._pbnHeader))){
        this.view.lblBankNameHeader.text = this.getFieldValue(this._pbnHeader);
        this.view.lblBankNameHeader.setVisibility(true);
      }else{
        this.view.lblBankNameHeader.setVisibility(false);
      }

      if(!this.isEmptyNullUndefined(this.getFieldValue(this._pbnSubHeader))){
        this.view.lblBankNameSubHeader.text = this.getFieldValue(this._pbnSubHeader);
        this.view.lblBankNameSubHeader.setVisibility(true);
      }else{
        this.view.lblBankNameSubHeader.setVisibility(false);
      }

      if(!this.isEmptyNullUndefined(this.getFieldValue(this._pbnTextBox))){
        this.view.tbxBankName.placeholder = this.getFieldValue(this._pbnTextBox,"placeHolder");
      }
      if (this.inputPool.bankName !== undefined) {
        this.view.tbxBankName.text = this.inputPool.bankName;
      }

      if(!this.isEmptyNullUndefined(this.getFieldValue(this._pbnCTA))){
        this.view.btnBankNameContinue.text = this.getFieldValue(this._pbnCTA,"text");
      }
      this.view.flxBankNameBack.onClick = this.goBack;
      this.view.btnBankNameCancel.onClick = this.onBackButtonClick;
      this.view.btnBankNameContinue.onClick = this.savePBNAndGoBack;
      this.enableButton("btnBankNameContinue");
      this.navigateTo("flxBankName", "flxBankNameTop", this.getFieldValue(this._pbnHeader));
    },
    savePBNAndGoBack : function(){
      this.inputPool["bankName"] = this.view.tbxBankName.text;
      this.inputPool["ibanBankName"] = this.view.tbxBankName.text;
      if(this.view.tbxBankName.text.length > 105) {
        this.inputPool["ibanBankName"] = this.view.tbxBankName.text.substr(0,104) + "....";
      }
      if (this.stack[this.stack.length - 2] === "flxVerifyDetails") {
        this.setVerifyDetails();
      } else{
        this.setRequiredCodeData();
      }
      this.goBack();
    },
    //Intermediary BIC
    navToIntermediaryBIC : function(){
      if(!this.isEmptyNullUndefined(this.getFieldValue(this._intermediaryBICHeader))){
        this.view.lblIntermediaryBICHeader.text = this.getFieldValue(this._intermediaryBICHeader);
        this.view.lblIntermediaryBICHeader.setVisibility(true);
      }else{
        this.view.lblIntermediaryBICHeader.setVisibility(false);
      }

      if(!this.isEmptyNullUndefined(this.getFieldValue(this._intermediaryBICSubHeader))){
        this.view.lblIntermediaryBICSubHeader.text = this.getFieldValue(this._intermediaryBICSubHeader);
        this.view.lblIntermediaryBICSubHeader.setVisibility(true);
      }else{
        this.view.lblIntermediaryBICSubHeader.setVisibility(false);
      }

      if(!this.isEmptyNullUndefined(this.getFieldValue(this._intermediaryBICTextBox))){
        this.view.tbxIntermediaryBIC.placeholder = this.getFieldValue(this._intermediaryBICTextBox,"placeHolder");
      }
      if (this.inputPool.intermediaryBIC !== undefined) {
        this.view.tbxIntermediaryBIC.text = this.inputPool.intermediaryBIC;
      }

      if(!this.isEmptyNullUndefined(this.getFieldValue(this._intermediaryBICCTA))){
        this.view.btnIntermediaryBICContinue.text = this.getFieldValue(this._intermediaryBICCTA,"text");
      }
      this.view.flxIntermediaryBICBack.onClick = this.goBack;
      this.view.btnIntermediaryBICCancel.onClick = this.onBackButtonClick;
      this.view.btnIntermediaryBICContinue.onClick = this.saveIntermediaryAndGoBack;
      this.enableButton("btnIntermediaryBICContinue");
      this.navigateTo("flxIntermediaryBIC", "flxIntermediaryBICTop", this.getFieldValue(this._intermediaryBICHeader));
    },
    saveIntermediaryAndGoBack : function(){
      this.inputPool["intermediaryBIC"] = this.view.tbxIntermediaryBIC.text;
      if (this.stack[this.stack.length - 2] === "flxVerifyDetails") {
        this.setVerifyDetails();
      } else{
        this.setRequiredCodeData();
      }
      this.goBack();
    },

    /**
     * Component requiredCodeInputValidation
     * To validate the inputs and show error then continue to next screen if all the inputs are valide
     */
    requiredCodeInputValidation:function(){
     
      var dataJSON = {
        "txtRequiredBICSwift": this.view.txtRequiredBICSwift.text,
        "txtRequiredClearingCode1": this.view.txtRequiredClearingCode1.text,
        "txtRequiredClearingCode2": this.view.txtRequiredClearingCode2.text
      }; 
      var dataValidator = this.performDataValidation(dataJSON);
      if(Object.keys(dataValidator).length === 0 && dataValidator.constructor === Object){
        this.resetRequiredCodeErrors();    
        this.onRequireCodeContinue();
      }
      else{
        this.setRequiredCodeErrors(dataValidator);
        
      }

    },

    /**
     * Component resetRequiredCodeErrors
     * Reponsible to reset skin fot textbox
     */
    resetRequiredCodeErrors: function(){
      try{
        this.view.txtRequiredBICSwift.skin = this._gsknTextBoxNormal;
        this.view.txtRequiredClearingCode1.skin = this._gsknTextBoxNormal;
        this.view.txtRequiredClearingCode2.skin = this._gsknTextBoxNormal;
        this.view.lblErrorMsgRequirecode.setVisibility(false);
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in resetTextBoxesSkins method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component: setRequiredCodeErrors
     * Set error message for required code field
     * @return : NA
     */
    setRequiredCodeErrors: function(dvfError) {
      this.resetRequiredCodeErrors();
      for(var iterator in dvfError){
        if("txtRequiredBICSwift" == iterator){
          this.view.txtRequiredBICSwift.skin = this._gsknTextBoxError;
          this.view.txtRequiredBICSwift.focusSkin = this._gsknTextBoxError;
          this.view.lblErrorMsgRequirecode.text = "Please enter a valid Bic/Swift code";
        }
        if("txtRequiredClearingCode1" == iterator){
          this.view.txtRequiredClearingCode1.skin = this._gsknTextBoxError;
           this.view.txtRequiredClearingCode1.focusSkin = this._gsknTextBoxError;
          this.view.lblErrorMsgRequirecode.text = "Please enter a valid Clearing Code1";
        }
        if("txtRequiredClearingCode2" == iterator){
          this.view.txtRequiredClearingCode2.skin = this._gsknTextBoxError;
           this.view.txtRequiredClearingCode1.focusSkin = this._gsknTextBoxError;
          this.view.lblErrorMsgRequirecode.text = "Please enter a valid Clearing Code2";
        }
      }      
      this.view.lblErrorMsgRequirecode.setVisibility(true);														  
    },

    /**     
	 * Component enableRequireCodeContinue
     * To enable the continue button based on the data
     */
    
    /**     
	 * Component setSwiftSearchInput
     * To call default text, skins and actions methods for swift input screen
     */
    setSwiftSearchInput:function(){
      this.navigateTo("flxSwiftBICSearch","flxSwiftBICSearchHeaderTop",this.getFieldValue(this._sbssSectionHeader));
      this.setSwiftSearchInputDefaultText();
      this.setSwiftSearchInputSkins();
      this.setSwiftSearchInputActions();
      if(this._sbssEnableCache && this.getswift == "") {
        this.getswift = "Yes"; 
        this.getSwiftResult();
      }
    },

     /**     
	 * Component setBCCSearchInput
     * To call default text, skins and actions methods for BCC input screen
     */
     setBCCSearchInput:function(){
       this.setBCCSearchInputDefaultText();
       this.setBCCSearchInputSkins();
       this.setBCCSearchInputActions();
        this.navigateTo("flxBCCLookUp","flxBCCSearchHeaderTop",this.getFieldValue(this._bccSectionHeader));
    },

        /**     
	 * Component setBCCSearchInputDefault
     * To set default text for search input screen
     */
        setBCCSearchInputDefaultText:function(){

          if(!this.isEmptyNullUndefined(this.getFieldValue(this._bccSectionHeader))){
            this.view.lblBCCSearchHeader.text = this.getFieldValue(this._bccSectionHeader);
            this.view.lblBCCSearchHeader.setVisibility(true);
          }else{
            this.view.lblBCCSearchHeader.setVisibility(false);
          }
    
          if(!this.isEmptyNullUndefined(this.getFieldValue(this._bccSubHeader))){
            this.view.lblBCCSearchDescription.text =this.getFieldValue(this._bccSubHeader);
            this.view.flxBCCSearchDescription.setVisibility(true);
          }else{
            this.view.flxBCCSearchDescription.setVisibility(false);
          }
    
          for(var i=1 ; i<=3 ;i++){
            if(!this.isEmptyNullUndefined(this.getFieldValue(this["_bccTextbox"+i+"Label"]))){
              this.view["lblBCCSearchField"+i].text = this.getFieldValue(this["_bccTextbox"+i+"Label"]);
              this.view["lblBCCSearchField"+i].setVisibility(true);
            }else{
              this.view["lblBCCSearchField"+i].setVisibility(false);
            }
    
            if(!this.isEmptyNullUndefined(this.getFieldValue(this["_bccTextbox"+i]))){
              this.view["txtBCCSearchValue"+i].placeholder = this.getFieldValue(this["_bccTextbox"+i],"placeHolder");
              this.view["lblBCCSearchField"+i].setVisibility(true);
              this.view["txtBCCSearchValue"+i].setVisibility(true);
            }else{
              this.view["lblBCCSearchField"+i].setVisibility(false);
              this.view["txtBCCSearchValue"+i].setVisibility(false);
            }
          }
    
          if(!this.isEmptyNullUndefined(this.getFieldValue(this._bccCta1))){
            this.view.btnBCCGetDetails.text = this.getFieldValue(this._bccCta1,"text");
            this.view.flxBCCBtnGetDetails.setVisibility(true);
          }else{
            this.view.flxBCCBtnGetDetails.setVisibility(false);
          }
        },

            /**     
	 * Component setBCCSearchInputSkins
     * To set skins for search input screen
     */
    setBCCSearchInputSkins:function(){
     
      this.view.imgBCCSearchBack.src = this.getFieldValue(this._iconBack);
      this.view.flxBCCSearchHeader.skin = this.getFieldValue(this._gsknHeaderFlex);
      this.view.btnBCCSearchCancel.skin = this.getFieldValue(this._gsknCancelBtn);
      this.view.lblBCCSearchHeader.skin = this.getFieldValue(this._gsknHeaderLbl);
      this.view.flxBCCSearchDescription.skin = this.getFieldValue(this._gsknSubHeaderFlex);
      this.view.lblBCCSearchDescription.skin = this.getFieldValue(this._gsknSubHeaderLabel);
      this.view.flxBCCSearchSeparator.skin = this.getFieldValue(this._gsknSubHeaderseparator);
      for(var i=1 ; i<=3 ;i++){
        this.view["lblBCCSearchField"+i].skin = this.getFieldValue(this._gsknInputFieldLabel);
        this.view["txtBCCSearchValue"+i].skin = this.getFieldValue(this._gsknTextBoxNormal);
        this.view["txtBCCSearchValue"+i].focusSkin = this.getFieldValue(this._gsknTextBoxFocus);
      }
      this.view.flxBCCGetDetailsSeparator.skin = this.getFieldValue(this._gsknSubHeaderseparator);

      if(this.getFieldValue(this._bccCta1,"actionType") === "primary"){
        this.view.btnBCCGetDetails.skin = this.getFieldValue(this._gsknPrimaryContexualBtn);
        this.view.btnBCCGetDetails.focusSkin = this.getFieldValue(this._gsknPrimaryContexualBtn);
      }else{
        this.view.btnBCCGetDetails.skin = this.getFieldValue(this._gsknSecondaryContexualBtn);
        this.view.btnBCCGetDetails.focusSkin = this.getFieldValue(this._gsknSecondaryContexualBtn);
      }
    },

        /**     
	 * Component setBCCSearchInputActions
     * To declare the actions for search input screen buttons
     */
        setBCCSearchInputActions:function(){
          var scope = this;
          scope.view.btnBCCGetDetails.onClick = scope.bccSearchInputValidation;
          scope.view.imgBCCSearchBack.onTouchEnd= scope.goBack;
          scope.view.txtBCCSearchValue1.onTextChange = function(){
            var dataJSON = {
              "txtBCCSearchValue1": scope.view.txtBCCSearchValue1.text
            }; 
            var maxLength = scope.maxFillValidate(dataJSON);
            var minLength = scope.maxFillValidate(dataJSON);
            if(Object.keys(maxLength).length === 0 && maxLength.constructor === Object){
              scope.enableButton("btnBCCGetDetails");
            }
            else{
              scope.disableButton("btnBCCGetDetails");
            }
            if(Object.keys(minLength).length === 0 && minLength.constructor === Object){
              scope.enableButton("btnBCCGetDetails");
            }
            else{
              scope.disableButton("btnBCCGetDetails");
            }
          };
          scope.view.txtBCCSearchValue2.onTextChange = function(){
            var dataJSON = {
              "txtBCCSearchValue2": scope.view.txtBCCSearchValue2.text
            }; 
            var maxLength = scope.maxFillValidate(dataJSON);
            var minLength = scope.maxFillValidate(dataJSON);
            if(Object.keys(maxLength).length === 0 && maxLength.constructor === Object){
              scope.enableButton("btnBCCGetDetails");
            }
            else{
              scope.disableButton("btnBCCGetDetails");
            }
            if(Object.keys(minLength).length === 0 && minLength.constructor === Object){
              scope.enableButton("btnBCCGetDetails");
            }
            else{
              scope.disableButton("btnBCCGetDetails");
            }
          };
          scope.view.txtBCCSearchValue3.onTextChange = function(){
            var dataJSON = {
              "txtBCCSearchValue3": scope.view.txtBCCSearchValue3.text
            }; 
            var maxLength = scope.maxFillValidate(dataJSON);
            var minLength = scope.maxFillValidate(dataJSON);
            if(Object.keys(maxLength).length === 0 && maxLength.constructor === Object){
              scope.enableButton("btnBCCGetDetails");
            }
            else{
              scope.disableButton("btnBCCGetDetails");
            }
            if(Object.keys(minLength).length === 0 && minLength.constructor === Object){
              scope.enableButton("btnBCCGetDetails");
            }
            else{
              scope.disableButton("btnBCCGetDetails");
            }
          };
          scope.validateBCCLookup();
        },

        validateBCCLookup: function(){
          if(this.view.txtBCCSearchValue1.text !== "" && this.view.txtBCCSearchValue1.text !== null) {
            //BCC is present
            this.view.btnBCCGetDetails.setEnabled(true);
          }
          else if((this.view.txtBCCSearchValue2.text !== "" && this.view.txtBCCSearchValue2.text !== null) && (this.view.txtBCCSearchValue3.text !== "" && this.view.txtBCCSearchValue3.text !== null)) {
            //Bank and branch/city is present
            this.view.btnBCCGetDetails.setEnabled(true);
          }
          else {
            this.view.btnBCCGetDetails.setEnabled(false);
          }
        },

    /**     
	 * Component setSwiftSearchInputDefault
     * To set default text for search input screen
     */
    setSwiftSearchInputDefaultText:function(){

      if(!this.isEmptyNullUndefined(this.getFieldValue(this._sbssSectionHeader))){
        this.view.lblSwiftBICSearchHeader.text = this.getFieldValue(this._sbssSectionHeader);
        this.view.lblSwiftBICSearchHeader.setVisibility(true);
      }else{
        this.view.lblSwiftBICSearchHeader.setVisibility(false);
      }

      if(!this.isEmptyNullUndefined(this.getFieldValue(this._sbssSubHeaderTitle1))){
        this.view.lblSwiftBICSearchSubHeading.text =this.getFieldValue(this._sbssSubHeaderTitle1);
        this.view.flxSwiftBICSearchSubHearding.setVisibility(true);
      }else{
        this.view.flxSwiftBICSearchSubHearding.setVisibility(false);
      }

      for(var i=1 ; i<=4 ;i++){
        if(!this.isEmptyNullUndefined(this.getFieldValue(this["_sbssTextbox"+i+"Label"]))){
          this.view["lblSwiftBICSearchField"+i].text = this.getFieldValue(this["_sbssTextbox"+i+"Label"]);
          this.view["lblSwiftBICSearchField"+i].setVisibility(true);
        }else{
          this.view["lblSwiftBICSearchField"+i].setVisibility(false);
        }

        if(!this.isEmptyNullUndefined(this.getFieldValue(this["_sbssTextbox"+i]))){
          this.view["txtSwiftBICSearchValue"+i].placeholder = this.getFieldValue(this["_sbssTextbox"+i],"placeHolder");
          this.view["lblSwiftBICSearchField"+i].setVisibility(true);
          this.view["txtSwiftBICSearchValue"+i].setVisibility(true);
        }else{
          this.view["lblSwiftBICSearchField"+i].setVisibility(false);
          this.view["txtSwiftBICSearchValue"+i].setVisibility(false);
        }
      }

      if(!this.isEmptyNullUndefined(this.getFieldValue(this._sbssCTA1))){
        this.view.btnGetDetails.text = this.getFieldValue(this._sbssCTA1,"text");
        this.view.flxBtnGetDetails.setVisibility(true);
      }else{
        this.view.flxBtnGetDetails.setVisibility(false);
      }
    },

    /**     
	 * Component setSwiftSearchInputSkins
     * To set skins for search input screen
     */
    setSwiftSearchInputSkins:function(){
     
      this.view.imgSwiftBICSearchBack.src = this.getFieldValue(this._iconBack);
      this.view.flxSwiftBICSearchHeader.skin = this.getFieldValue(this._gsknHeaderFlex);
      this.view.btnSwiftBICSearchCancel.skin = this.getFieldValue(this._gsknCancelBtn);
      this.view.lblSwiftBICSearchHeader.skin = this.getFieldValue(this._gsknHeaderLbl);
      this.view.flxSwiftBICSearchSubHearding.skin = this.getFieldValue(this._gsknSubHeaderFlex);
      this.view.lblSwiftBICSearchSubHeading.skin = this.getFieldValue(this._gsknSubHeaderLabel);
      this.view.flxSwiftBICSearchSeparator.skin = this.getFieldValue(this._gsknSubHeaderseparator);
      for(var i=1 ; i<=4 ;i++){
        this.view["lblSwiftBICSearchField"+i].skin = this.getFieldValue(this._gsknInputFieldLabel);
        this.view["txtSwiftBICSearchValue"+i].skin = this.getFieldValue(this._gsknTextBoxNormal);
        this.view["txtSwiftBICSearchValue"+i].focusSkin = this.getFieldValue(this._gsknTextBoxFocus);
      }
      this.view.flxGetDetailsSeparator.skin = this.getFieldValue(this._gsknSubHeaderseparator);

      if(this.getFieldValue(this._sbssCTA1,"actionType") === "primary"){
        this.view.btnGetDetails.skin = this.getFieldValue(this._gsknPrimaryContexualBtn);
        this.view.btnGetDetails.focusSkin = this.getFieldValue(this._gsknPrimaryContexualBtn);
      }else{
        this.view.btnGetDetails.skin = this.getFieldValue(this._gsknSecondaryContexualBtn);
        this.view.btnGetDetails.focusSkin = this.getFieldValue(this._gsknSecondaryContexualBtn);
      }
    },

    /**     
	 * Component setSwiftSearchInputActions
     * To declare the actions for search input screen buttons
     */
    setSwiftSearchInputActions:function(){
      var scope = this;
      scope.view.btnGetDetails.onClick = scope.swiftSearchInputValidation;
      scope.view.imgSwiftBICSearchBack.onTouchEnd= scope.goBack;
      scope.view.txtSwiftBICSearchValue1.onTextChange = function(){
        var dataJSON = {
          "txtSwiftBICSearchValue1": scope.view.txtSwiftBICSearchValue1.text
        }; 
        var maxLength = scope.maxFillValidate(dataJSON);
        var minLength = scope.maxFillValidate(dataJSON);
        if(Object.keys(maxLength).length === 0 && maxLength.constructor === Object){
          scope.enableButton("btnGetDetails");
        }
        else{
          scope.disableButton("btnGetDetails");
        }
        if(Object.keys(minLength).length === 0 && minLength.constructor === Object){
          scope.enableButton("btnGetDetails");
        }
        else{
          scope.disableButton("btnGetDetails");
        }
      };
      scope.view.txtSwiftBICSearchValue2.onTextChange = function(){
        var dataJSON = {
          "txtSwiftBICSearchValue2": scope.view.txtSwiftBICSearchValue2.text
        }; 
        var maxLength = scope.maxFillValidate(dataJSON);
        var minLength = scope.maxFillValidate(dataJSON);
        if(Object.keys(maxLength).length === 0 && maxLength.constructor === Object){
          scope.enableButton("btnGetDetails");
        }
        else{
          scope.disableButton("btnGetDetails");
        }
        if(Object.keys(minLength).length === 0 && minLength.constructor === Object){
          scope.enableButton("btnGetDetails");
        }
        else{
          scope.disableButton("btnGetDetails");
        }
      };
      scope.view.txtSwiftBICSearchValue3.onTextChange = function(){
        var dataJSON = {
          "txtSwiftBICSearchValue3": scope.view.txtSwiftBICSearchValue3.text
        }; 
        var maxLength = scope.maxFillValidate(dataJSON);
        var minLength = scope.maxFillValidate(dataJSON);
        if(Object.keys(maxLength).length === 0 && maxLength.constructor === Object){
          scope.enableButton("btnGetDetails");
        }
        else{
          scope.disableButton("btnGetDetails");
        }
        if(Object.keys(minLength).length === 0 && minLength.constructor === Object){
          scope.enableButton("btnGetDetails");
        }
        else{
          scope.disableButton("btnGetDetails");
        }
      };
      scope.view.txtSwiftBICSearchValue4.onTextChange = function(){
        var dataJSON = {
          "txtSwiftBICSearchValue4": scope.view.txtSwiftBICSearchValue4.text
        }; 
        var maxLength = scope.maxFillValidate(dataJSON);
        var minLength = scope.maxFillValidate(dataJSON);
        if(Object.keys(maxLength).length === 0 && maxLength.constructor === Object){
          scope.enableButton("btnGetDetails");
        }
        else{
          scope.disableButton("btnGetDetails");
        }
        if(Object.keys(minLength).length === 0 && minLength.constructor === Object){
          scope.enableButton("btnGetDetails");
        }
        else{
          scope.disableButton("btnGetDetails");
        }
      };
    },

    /**
     * Component resetRequiredCodeErrors
     * Reponsible to reset skin fot textbox
     */
    resetSwiftInputCodeErrors:function(){
      try{
        this.view.txtSwiftBICSearchValue1.skin = this._gsknTextBoxNormal;
        this.view.txtSwiftBICSearchValue2.skin = this._gsknTextBoxNormal;
        this.view.txtSwiftBICSearchValue3.skin = this._gsknTextBoxNormal;
        this.view.txtSwiftBICSearchValue4.skin = this._gsknTextBoxNormal;
        this.view.lblSwiftBICInputError.setVisibility(false);
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in resetTextBoxesSkins method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component resetRequiredCodeErrors
     * Reponsible to reset skin fot textbox
     */
    resetBCCInputCodeErrors:function(){
      try{
        this.view.txtBCCSearchValue1.skin = this._gsknTextBoxNormal;
        this.view.txtBCCSearchValue2.skin = this._gsknTextBoxNormal;
        this.view.txtBCCSearchValue3.skin = this._gsknTextBoxNormal;
        this.view.lblBCCInputError.setVisibility(false);
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in resetTextBoxesSkins method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component onSwiftGetDetails
     * To set the values to inputpool on click of get details
     */
    onSwiftGetDetails:function(){
      try {
        
        if(!kony.sdk.isNullOrUndefined(this.view.txtSwiftBICSearchValue1.text)) {
          this.inputPool[this.getFieldValue(this._sbssTextbox1,"inputPoolKey")]=this.view.txtSwiftBICSearchValue1.text;
        }else{
          this.inputPool[this.getFieldValue(this._sbssTextbox1,"inputPoolKey")]="";
        }
        if(!kony.sdk.isNullOrUndefined(this.view.txtSwiftBICSearchValue2.text)) {
          this.inputPool[this.getFieldValue(this._sbssTextbox2,"inputPoolKey")]=this.view.txtSwiftBICSearchValue2.text;
        }else{
          this.inputPool[this.getFieldValue(this._sbssTextbox2,"inputPoolKey")]="";
        }
        if(!kony.sdk.isNullOrUndefined(this.view.txtSwiftBICSearchValue3.text)) {
          this.inputPool[this.getFieldValue(this._sbssTextbox3,"inputPoolKey")]=this.view.txtSwiftBICSearchValue3.text;
        }else{
          this.inputPool[this.getFieldValue(this._sbssTextbox3,"inputPoolKey")]="";
        }
        if(!kony.sdk.isNullOrUndefined(this.view.txtSwiftBICSearchValue4.text)) {
          this.inputPool[this.getFieldValue(this._sbssTextbox4,"inputPoolKey")]=this.view.txtSwiftBICSearchValue4.text;
        }else{
          this.inputPool[this.getFieldValue(this._sbssTextbox4,"inputPoolKey")]="";
        }
        this.setSwiftBICSearchResult();
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in onSwiftGetDetails method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }      

    },

        /**
     * Component onBCCGetDetails
     * To set the values to inputpool on click of get details
     */
        onBCCGetDetails:function(){
          try {
            
            if(!kony.sdk.isNullOrUndefined(this.view.txtBCCSearchValue1.text)) {
              this.inputPool[this.getFieldValue(this._bccTextbox1,"inputPoolKey")]=this.view.txtBCCSearchValue1.text;
            }else{
              this.inputPool[this.getFieldValue(this._bccTextbox1,"inputPoolKey")]="";
            }
            if(!kony.sdk.isNullOrUndefined(this.view.txtBCCSearchValue2.text)) {
              this.inputPool[this.getFieldValue(this._bccTextbox2,"inputPoolKey")]=this.view.txtBCCSearchValue2.text;
            }else{
              this.inputPool[this.getFieldValue(this._bccTextbox2,"inputPoolKey")]="";
            }
            if(!kony.sdk.isNullOrUndefined(this.view.txtBCCSearchValue3.text)) {
              this.inputPool[this.getFieldValue(this._bccTextbox3,"inputPoolKey")]=this.view.txtBCCSearchValue3.text;
            }else{
              this.inputPool[this.getFieldValue(this._bccTextbox3,"inputPoolKey")]="";
            }
            this.inputPool.bccSearchResults = [];
            this.onRequestStart();
            this.setCriteria(this._bccLookupCriteria)
            var objSvcName = this.getFieldValue(this._bccBankClearingLookupService);
            var objName = this.getFieldValue(this._bccBankClearingLookupObject);
            var operationName = this.getFieldValue(this._bccBankClearingLookupOperation);
            var criteria = this.getCriteria();
            var unicode = "";
            this.UnifiedTransferDAO.invokeService
            (objSvcName,objName,operationName,criteria,unicode,this.setBCCSearchResultData,this.failureValidation);
          } catch(err) {
            var errObj = {
              "errorInfo" : "Error in onSwiftGetDetails method of the component.",
              "errorLevel" : "Configuration",
              "error": err
            };
            this.onError(errObj);
          }      
    
        },

    /**     
	 * Component swiftSearchInputValidation
     * To show the error messages for swift input fields
     */
    swiftSearchInputValidation:function(){
     
      var dataJSON = {
        "txtSwiftBICSearchValue1": this.view.txtSwiftBICSearchValue1.text,
        "txtSwiftBICSearchValue2": this.view.txtSwiftBICSearchValue2.text,
        "txtSwiftBICSearchValue3": this.view.txtSwiftBICSearchValue3.text,
        "txtSwiftBICSearchValue4": this.view.txtSwiftBICSearchValue4.text
      }; 
      var dataValidator = this.performDataValidation(dataJSON);
      if(Object.keys(dataValidator).length === 0 && dataValidator.constructor === Object){
        this.resetSwiftInputCodeErrors();    
        this.onSwiftGetDetails();
      }
      else{
        this.setSwiftInputErrors(dataValidator);  
      }
    },

        /**     
	 * Component bccSearchInputValidation
     * To show the error messages for BCC input fields
     */
        bccSearchInputValidation:function(){
     
          var dataJSON = {
            "txtBCCSearchValue1": this.view.txtBCCSearchValue1.text,
            "txtBCCSearchValue2": this.view.txtBCCSearchValue2.text,
            "txtBCCSearchValue3": this.view.txtBCCSearchValue3.text
          }; 
          var dataValidator = this.performDataValidation(dataJSON);
          if(Object.keys(dataValidator).length === 0 && dataValidator.constructor === Object){
            this.resetBCCInputCodeErrors();    
            this.onBCCGetDetails();
          }
          else{
            this.setBCCInputErrors(dataValidator);  
          }
        },

    /**
     * @api : setSwiftInputErrors
     * To show the error input field in swift screen
     * @return : NA
     */
    setSwiftInputErrors: function(dvfError) {
      this.resetSwiftInputCodeErrors();
      for(var iterator in dvfError){
        if("txtSwiftBICSearchValue1" == iterator){
          this.view.txtSwiftBICSearchValue1.skin = this._gsknTextBoxError;
          this.view.txtSwiftBICSearchValue1.focusSkin = this._gsknTextBoxError;
          this.view.lblSwiftBICInputError.text = "Please enter a valid bank name";
        }
        if("txtSwiftBICSearchValue2" == iterator){
          this.view.txtSwiftBICSearchValue2.skin = this._gsknTextBoxError;
          this.view.txtSwiftBICSearchValue2.focusSkin = this._gsknTextBoxError;
          this.view.lblSwiftBICInputError.text = "Please enter a valid branch name";
        }
        if("txtSwiftBICSearchValue3" == iterator){
          this.view.txtSwiftBICSearchValue3.skin = this._gsknTextBoxError;
          this.view.txtSwiftBICSearchValue3.focusSkin = this._gsknTextBoxError;
          this.view.lblSwiftBICInputError.text = "Please enter a valid city";
        }
        if("txtSwiftBICSearchValue4" == iterator){
          this.view.txtSwiftBICSearchValue4.skin = this._gsknTextBoxError;
          this.view.txtSwiftBICSearchValue4.focusSkin = this._gsknTextBoxError;
          this.view.lblSwiftBICInputError.text = "Please enter a valid country";
        }
      }      																   
      this.view.lblSwiftBICInputError.setVisibility(true);	
      this.disableButton("btnGetDetails");
    },

        /**
     * @api : setBCCInputErrors
     * To show the error input field in bcc screen
     * @return : NA
     */
        setBCCInputErrors: function(dvfError) {
          this.resetBCCInputCodeErrors();
          for(var iterator in dvfError){
            if("txtBCCSearchValue1" == iterator){
              this.view.txtBCCSearchValue1.skin = this._gsknTextBoxError;
              this.view.txtBCCSearchValue1.focusSkin = this._gsknTextBoxError;
              this.view.lblBCCInputError.text = "Please enter a valid bank clearing code";
            }
            if("txtBCCSearchValue2" == iterator){
              this.view.txtBCCSearchValue2.skin = this._gsknTextBoxError;
              this.view.txtBCCSearchValue2.focusSkin = this._gsknTextBoxError;
              this.view.lblBCCInputError.text = "Please enter a valid bank name";
            }
            if("txtBCCSearchValue3" == iterator){
              this.view.txtBCCSearchValue3.skin = this._gsknTextBoxError;
              this.view.txtBCCSearchValue3.focusSkin = this._gsknTextBoxError;
              this.view.lblBCCInputError.text = "Please enter a valid branch/city";
            }
          }      																   
          this.view.lblBCCInputError.setVisibility(true);	
          this.disableButton("btnBCCGetDetails");
        },

    /**
     * Component setSwiftBICSearchResult
     * To call funtions of set default text, skin and actions of swift search result screen
     */
    setSwiftBICSearchResult:function(){
      this.setSwiftBICSearchResultDefaultText();
      this.setSwiftBICSearchResultSkins();
      this.setSwiftSearchResultAction();
      this.getSwiftResult();
    },

        /**
     * Component setBCCSearchResult
     * To call funtions of set default text, skin and actions of bcc search result screen
     */
    setBCCSearchResult:function(){
      this.setBCCSearchResultDefaultText();
      this.setBCCSearchResultSkins();
      this.setBCCSearchResultAction();
      this.navigateTo("flxBCCSearchResult","flxBCCSearchTop",this.getFieldValue(this._bccSectionHeader));
    },

            /**
     * Component setBCCSearchResultDefaultText
     * To set default text of bcc search result screen
     */
    setBCCSearchResultDefaultText:function(){
      if(!this.isEmptyNullUndefined(this.getFieldValue(this._bccSectionHeader))){
        this.view.lblBCCSearchListHeader.text = this.getFieldValue(this._bccSectionHeader);
        this.view.lblBCCSearchListHeader.setVisibility(true);
      }else{
        this.view.lblBCCSearchListHeader.setVisibility(false);
      }

      if(!this.isEmptyNullUndefined(this.getFieldValue(this._bccResultsubHeader))){
        this.view.lblBCCSearchListDescription.text = this.getFieldValue(this._bccResultsubHeader);
        this.view.flxBCCSearchListDescription.setVisibility(true);
      }else{
        this.view.flxBCCSearchListDescription.setVisibility(false);
      }

      if(!this.isEmptyNullUndefined(this.getFieldValue(this._bccCta2))){
        this.view.btnUseBCC.text = this.getFieldValue(this._bccCta2,"text");
        this.view.btnUseBCC.setVisibility(true);
      }else{
        this.view.btnUseBCC.setVisibility(false);
      }

      if(!this.isEmptyNullUndefined(this.getFieldValue(this._bccCta3))){
        this.view.btnBCCSearchAgain.text = this.getFieldValue(this._bccCta3,"text");
        this.view.btnBCCSearchAgain.setVisibility(true);
      }else{
        this.view.btnBCCSearchAgain.setVisibility(false);
      }

    },

    /**
     * Component setBCCSearchResultSkins
     * To set skins of swift search result screen
     */
    setBCCSearchResultSkins:function(){
     
      this.view.flxBCCSearchListHeader.skin = this.getFieldValue(this._gsknHeaderFlex);
      this.view.btnBCCSearchListCancel.skin = this.getFieldValue(this._gsknCancelBtn);
      this.view.lblBCCSearchListHeader.skin = this.getFieldValue(this._gsknHeaderLbl);
      this.view.flxBCCSearchListDescription.skin = this.getFieldValue(this._gsknSubHeaderFlex);
      this.view.lblBCCSearchListDescription.skin = this.getFieldValue(this._gsknSubHeaderLabel);
      this.view.flxBCCSearchListSeparator.skin = this.getFieldValue(this._gsknSubHeaderseparator);
      this.disableButton("btnUseBCC");
      if(this.getFieldValue(this._bccCta3,"actionType") === "primary"){
        this.view.btnBCCSearchAgain.skin = this.getFieldValue(this._gsknPrimaryContexualBtn);
        this.view.btnBCCSearchAgain.focusSkin = this.getFieldValue(this._gsknPrimaryContexualBtn);
      }else{
        this.view.btnBCCSearchAgain.skin = this.getFieldValue(this._gsknSecondaryContexualBtn);
        this.view.btnBCCSearchAgain.focusSkin = this.getFieldValue(this._gsknSecondaryContexualBtn);

      }
    },

        /**
     * Component setBCCSearchResultAction
     * To set actions of bcc search result screen
     */
        setBCCSearchResultAction:function(){
          this.view.btnBCCSearchAgain.onClick = this.researchClearingCode;
          this.view.imgBCCSearchListBack.onTouchEnd = this.goBack;
        },

    /**
     * Component setSwiftBICSearchResultDefaultText
     * To set default text of swift search result screen
     */
    setSwiftBICSearchResultDefaultText:function(){
      if(!this.isEmptyNullUndefined(this.getFieldValue(this._sbssSectionHeader))){
        this.view.lblSwiftBICSearchListHeader.text = this.getFieldValue(this._sbssSectionHeader);
        this.view.lblSwiftBICSearchListHeader.setVisibility(true);
      }else{
        this.view.lblSwiftBICSearchListHeader.setVisibility(false);
      }

      if(!this.isEmptyNullUndefined(this.getFieldValue(this._resultScreenSubHeader))){
        this.view.lblSwiftBICSearchListDescription.text = this.getFieldValue(this._resultScreenSubHeader);
        this.view.flxSwiftBICSearchListDescription.setVisibility(true);
      }else{
        this.view.flxSwiftBICSearchListDescription.setVisibility(false);
      }

      if(!this.isEmptyNullUndefined(this.getFieldValue(this._sbssCTA2))){
        this.view.btnUseSwift.text = this.getFieldValue(this._sbssCTA2,"text");
        this.view.btnUseSwift.setVisibility(true);
      }else{
        this.view.btnUseSwift.setVisibility(false);
      }

      if(!this.isEmptyNullUndefined(this.getFieldValue(this._sbssCTA3))){
        this.view.btnSearchAgain.text = this.getFieldValue(this._sbssCTA3,"text");
        this.view.btnSearchAgain.setVisibility(true);
      }else{
        this.view.btnSearchAgain.setVisibility(false);
      }

    },

    /**
     * Component setSwiftBICSearchResultSkins
     * To set skins of swift search result screen
     */
    setSwiftBICSearchResultSkins:function(){
     
      this.view.flxSwiftBICSearchListHeader.skin = this.getFieldValue(this._gsknHeaderFlex);
      this.view.btnSwiftBICSearchListCancel.skin = this.getFieldValue(this._gsknCancelBtn);
      this.view.lblSwiftBICSearchListHeader.skin = this.getFieldValue(this._gsknHeaderLbl);
      this.view.flxSwiftBICSearchListDescription.skin = this.getFieldValue(this._gsknSubHeaderFlex);
      this.view.lblSwiftBICSearchListDescription.skin = this.getFieldValue(this._gsknSubHeaderLabel);
      this.view.flxSwiftBICSearchListSeparator.skin = this.getFieldValue(this._gsknSubHeaderseparator);
      this.disableButton("btnUseSwift");
      if(this.getFieldValue(this._sbssCTA3,"actionType") === "primary"){
        this.view.btnSearchAgain.skin = this.getFieldValue(this._gsknPrimaryContexualBtn);
        this.view.btnSearchAgain.focusSkin = this.getFieldValue(this._gsknPrimaryContexualBtn);
      }else{
        this.view.btnSearchAgain.skin = this.getFieldValue(this._gsknSecondaryContexualBtn);
        this.view.btnSearchAgain.focusSkin = this.getFieldValue(this._gsknSecondaryContexualBtn);

      }
    },
    /**
     * Component setSwiftSearchResultAction
     * To set actions of swift search result screen
     */
    setSwiftSearchResultAction:function(){
      this.view.btnSearchAgain.onClick = this.researchSwiftCode;
      this.view.imgSwiftBICSearchListBack.onTouchEnd = this.goBack;
    },

    /**
     * Component getSwiftResult
     * Reponsible to call the DAO method for invoking service api.
     */
    getSwiftResult:function(){
      var dataJson="";
      if(typeof(this._sbssCriteria) ==="string"){
        dataJson =JSON.parse(this._sbssCriteria);
      }else{
        dataJson = this._sbssCriteria;
      }
      if(!this._sbssEnableCache){
        for(var key in dataJson){
          if(dataJson[key]){
            dataJson[key] = this.getFieldValue(dataJson[key]);
          }
          else{
            dataJson[key] = "";
          }
        }
        this.UnifiedTransferDAO.invokeService(this._sbssSwiftLookupService, this._sbssSwiftLookupObject, this._sbssSwiftLookupOperation, dataJson, this._sbssSearchResultsIdentifier, this.setSwiftSearchResultData, this.failureValidation);
      }
      if(this._sbssEnableCache){
        if(this.getswift === "Yes"){
          for(var key in dataJson){
            dataJson[key] = "";
          }
          this.UnifiedTransferDAO.invokeService(this._sbssSwiftLookupService, this._sbssSwiftLookupObject, this._sbssSwiftLookupOperation, dataJson, this._sbssSearchResultsIdentifier, this.setSwiftCacheData, this.failureValidation);
        }else if(this.getswift === "No"){
          var searchResult=[];
          for(var key in dataJson){
            if(dataJson[key]){
              dataJson[key] = this.getFieldValue(dataJson[key]);
            }
            else{
              dataJson[key] = "";
            }
          }
          searchResult[this._sbssResponseObj] =  this.getSearchData(this.swiftCodeData[this._sbssResponseObj],dataJson,this.getFieldValue(this._resultItemLabel2));
          this.setSwiftSearchResultData(searchResult);
        }
      }
    },

    /**
     * Component setSwiftCacheData
     * To store the cache data for reuse.
     */
    setSwiftCacheData:function(swiftResponse){
      this.swiftCodeData = swiftResponse;
      this.getswift= "No";
    },

    /**
     * Component setBCCCacheData
     * To store the cache data for reuse.
     */
    setBCCCacheData:function(swiftResponse){
      this.BCCCodeData = swiftResponse;
      this.getBCC= "No";
    },

    /**     
	 * Component setSwiftSearchResultData
     * To generate the JSONpath for service response
     * backendResponse{JSONObject} - response received from the backend
     * unicode{string}             - unique code to identify the service response in case of multiple service calls.
     */

    setSwiftSearchResultData:function(swiftResponse){
      var scope = this;
      scope.navigateTo("flxSwiftBICSearchList","flxSwiftBICSearchTop",this.getFieldValue(this._sbssSectionHeader));
      this.lastSelectedRow = "";
      this.disableButton("btnUseSwift");
      if(!this.isEmptyNullUndefined(swiftResponse[this._sbssResponseObj]) && swiftResponse[this._sbssResponseObj].length != 0){
        this.view.flxSwiftBICSearchListScroll.setVisibility(true);
        var swiftCodes = swiftResponse[this._sbssResponseObj];
        var swiftCodeSeg= [];
        for(var i = 0; i < swiftCodes.length;i++){
          if(!this.isEmptyNullUndefined(swiftCodes[i][this.getFieldValue(this._resultItemLabel2)])){
            if(!this.isEmptyNullUndefined(this.getFieldValue(this._resultItemLabel1))){
              swiftCodes[i]["lblSwiftBICSearchListName"]={
                "text":this.getFieldValue(this._resultItemLabel1),
                "skin":this.getFieldValue(this._sbssResultItemLabel1Skin),
                "isVisible":true
              };
            }else{
              swiftCodes[i]["lblSwiftBICSearchListName"]={
                "isVisible":false
              };
            }

            if(!this.isEmptyNullUndefined(this.getFieldValue(this._resultItemLabel2))){
              swiftCodes[i]["lblSwiftBICSearchListHeader"]={
                "text":swiftCodes[i][this.getFieldValue(this._resultItemLabel2)],
                "skin":this.getFieldValue(this._sbssResultItemLabel2Skin),
                "isVisible":true
              };
            }else{
              swiftCodes[i]["lblSwiftBICSearchListHeader"]={
                "isVisible":false
              };
            }
            if(!this.isEmptyNullUndefined(this.getFieldValue(this._resultItemLabel3))){
              var swiftDescDetails = "";
              var descContract = this.getFieldValue(this._resultItemLabel3).split("+");
              for(var j=0;j<descContract.length;j++){
                if(!this.isEmptyNullUndefined(swiftCodes[i][descContract[j]])){
                  swiftDescDetails = swiftDescDetails+swiftCodes[i][descContract[j]]; 
                }else{
                  swiftDescDetails = swiftDescDetails+descContract[j];
                }
              }
              swiftCodes[i]["lblBICSwiftBICSearchListDescription"]={
                "text":swiftDescDetails,
                "skin":this.getFieldValue(this._sbssResultItemLabel3Skin),
                "isVisible":true
              };
            }else{
              swiftCodes[i]["lblBICSwiftBICSearchListDescription"]={
                "isVisible":false
              };
            }
            swiftCodes[i]["flxSwiftBICSearchOptions"]={
              "skin":this.getFieldValue(this._sbssResultItemFlexSkin)
            };

            swiftCodes[i]["imgSwiftBICSearchListTick"]={
              "src":this.getFieldValue(this._sbssSelectedTickImg),
              "isVisible":false
            };
            swiftCodeSeg.push(swiftCodes[i]);
          }
        }

        var widgetMap = {
          "lblSwiftBICSearchListName":"lblSwiftBICSearchListName",
          "lblSwiftBICSearchListHeader":"lblSwiftBICSearchListHeader",
          "lblBICSwiftBICSearchListDescription":"lblBICSwiftBICSearchListDescription",
          "flxSwiftBICSearchOptions":"flxSwiftBICSearchOptions",
          "imgSwiftBICSearchListTick":"imgSwiftBICSearchListTick"
        };

        this.view.segSwiftBICSearchList.widgetDataMap = widgetMap;
        this.view.segSwiftBICSearchList.setData(swiftCodeSeg);
        this.view.flxSwiftBICSearchList.forceLayout();
        this.view.segSwiftBICSearchList.onRowClick = this.selectSwiftCode.bind(this,swiftCodeSeg);
      }else{
        this.view.flxSwiftBICSearchListScroll.setVisibility(false);
        this.view.flxNoSearchResult.setVisibility(true);
      }
    },

    /**     
	 * Component setBCCSearchResultData
     * To generate the JSONpath for service response
     * backendResponse{JSONObject} - response received from the backend
     * unicode{string}             - unique code to identify the service response in case of multiple service calls.
     */

    setBCCSearchResultData:function(swiftResponse){
      this.onRequestEnd();
      this.lastSelectedRow = "";
      this.disableButton("btnUseBCC");
      if(!this.isEmptyNullUndefined(swiftResponse) && swiftResponse.length != 0){
        this.view.flxBCCSearchListScroll.setVisibility(true);
        var swiftCodeSeg= [];
        swiftCodeSeg = [
          {
            "lblSwiftBICSearchListName": "Bank Clearing Code:",
            "lblSwiftBICSearchListHeader": "123456",
            "lblBICSwiftBICSearchListDescription": "Bank of Moscow, Lake Gardens,Odintsovo, Block 1, Moscow, Russia",
            "flxSwiftBICSearchOptions": {
                "skin": "ICSknFlxE3E3E3NotSelected"
            },
            "imgSwiftBICSearchListTick": {
                "src": "selectedtick.png",
                "isVisible": false
            }
          },
          {
            "lblSwiftBICSearchListName": "Bank Clearing Code:",
            "lblSwiftBICSearchListHeader": "678912",
            "lblBICSwiftBICSearchListDescription": "Bank of Moscow, Lake Gardens,Odintsovo, Block 1, Moscow, Russia",
            "flxSwiftBICSearchOptions": {
                "skin": "ICSknFlxE3E3E3NotSelected"
            },
            "imgSwiftBICSearchListTick": {
                "src": "selectedtick.png",
                "isVisible": false
            }
          },
          {
            "lblSwiftBICSearchListName": "Bank Clearing Code:",
            "lblSwiftBICSearchListHeader": "345678",
            "lblBICSwiftBICSearchListDescription": "Bank of Moscow, Lake Gardens,Odintsovo, Block 1, Moscow, Russia",
            "flxSwiftBICSearchOptions": {
                "skin": "ICSknFlxE3E3E3NotSelected"
            },
            "imgSwiftBICSearchListTick": {
                "src": "selectedtick.png",
                "isVisible": false
            }
          }
        ];
        var widgetMap = {
          "lblSwiftBICSearchListName":"lblSwiftBICSearchListName",
          "lblSwiftBICSearchListHeader":"lblSwiftBICSearchListHeader",
          "lblBICSwiftBICSearchListDescription":"lblBICSwiftBICSearchListDescription",
          "flxSwiftBICSearchOptions":"flxSwiftBICSearchOptions",
          "imgSwiftBICSearchListTick":"imgSwiftBICSearchListTick"
        };

        this.view.segBCCSearchList.widgetDataMap = widgetMap;
        this.view.segBCCSearchList.setData(swiftCodeSeg);
        this.view.flxBCCSearchResult.forceLayout();
        this.view.segBCCSearchList.onRowClick = this.selectClearingCode.bind(this,swiftCodeSeg);
      }else{
        this.view.flxBCCSearchListScroll.setVisibility(false);
        this.view.flxNoBCCSearchResult.setVisibility(true);
      }
      this.setBCCSearchResult();
    },

    /**     
	 * Component confirmSwiftCode
     * To set the swift/bic code to the text box
     */
    confirmSwiftCode:function(selectedSwift){
    
      if(this.getFieldValue(this._beneficiaryTypes) === "DomesticBank"){
        this.inputPool[this.getFieldValue(this._resultItemLabel2)]=selectedSwift[this.getFieldValue(this._resultItemLabel2)];
        var descContract = this.getFieldValue(this._resultItemLabel3).split("+");
        for(var j=0;j<descContract.length;j++){
          if(!this.isEmptyNullUndefined(selectedSwift[descContract[j]])){
            this.inputPool[descContract[j]]=selectedSwift[descContract[j]]; 
          }
        }
        this.setRequiredCodeData();
        this.enableButton("btnRequiredCodeContinue");
        this.navigateTo("flxRequiredCode","flxRequiredCodeTop",this.getFieldValue(this._rcsHdr));
      }
      if(this.getFieldValue(this._beneficiaryTypes) === "InternationalBank"){
        this.inputPool[this.getFieldValue(this._resultItemLabel2)]=selectedSwift[this.getFieldValue(this._resultItemLabel2)];
        var descContract = this.getFieldValue(this._resultItemLabel3).split("+");
        for(var j=0;j<descContract.length;j++){
          if(!this.isEmptyNullUndefined(selectedSwift[descContract[j]])){
            this.inputPool[descContract[j]]=selectedSwift[descContract[j]]; 
          }
        }
        this.setRequiredCodeData();
        this.enableButton("btnRequiredCodeContinue");
        this.navigateTo("flxRequiredCode","flxRequiredCodeTop",this.getFieldValue(this._rcsHdr));
      }
    },

        /**     
	 * Component confirmClearingCode
     * To set the ClearingCode code to the text box
     */
        confirmClearingCode:function(selectedSwift){
    
          if(this.getFieldValue(this._beneficiaryTypes) === "DomesticBank"){
            this.inputPool[this.getFieldValue(this._bccResultItemLabel2)]=selectedSwift[this.getFieldValue(this._bccResultItemLabel2)];
            var descContract = this.getFieldValue(this._bccResultItemLabel3).split("+");
            for(var j=0;j<descContract.length;j++){
              if(!this.isEmptyNullUndefined(selectedSwift[descContract[j]])){
                this.inputPool[descContract[j]]=selectedSwift[descContract[j]]; 
              }
            }
            this.setRequiredCodeData();
            this.enableButton("btnRequiredCodeContinue");
            this.navigateTo("flxRequiredCode","flxRequiredCodeTop",this.getFieldValue(this._rcsHdr));
          }
          if(this.getFieldValue(this._beneficiaryTypes) === "InternationalBank"){
            this.inputPool[this.getFieldValue(this._bccResultItemLabel2)]=selectedSwift[this.getFieldValue(this._bccResultItemLabel2)];
            var descContract = this.getFieldValue(this._bccResultItemLabel3).split("+");
            for(var j=0;j<descContract.length;j++){
              if(!this.isEmptyNullUndefined(selectedSwift[descContract[j]])){
                this.inputPool[descContract[j]]=selectedSwift[descContract[j]]; 
              }
            }
            this.enableButton("btnRequiredCodeContinue");
            this.view.txtRequiredClearingCode1.text = selectedSwift.lblSwiftBICSearchListHeader;
            this.inputPool.clearingCode1 = selectedSwift.lblSwiftBICSearchListHeader;
            this.setRequiredCodeData();
            this.navigateTo("flxRequiredCode","flxRequiredCodeTop",this.getFieldValue(this._rcsHdr));
          }
        },

    /**     
	 * Component researchSwiftCode
     * To go back to search input page
     */
    researchSwiftCode:function(){
      this.navigateTo("flxSwiftBICSearch","flxSwiftBICSearchHeaderTop",this.getFieldValue(this._sbssSectionHeader));
    },

    /** 
    * Component researchClearingCode
    * To go back to search input page
    */
   researchClearingCode:function(){
     this.navigateTo("flxBCCLookUp","flxBCCSearchHeaderTop",this.getFieldValue(this._bccSectionHeader));
   },

    /**     
	 * Component selectSwiftCode
     * To select the swift/bic code highlight and use the swift/bic code
     */
    selectSwiftCode:function(swiftCodes){
      var rowIndex = this.view.segSwiftBICSearchList.selectedRowIndex[1];
      if(rowIndex !== this.lastSelectedRow){
        swiftCodes[rowIndex].flxSwiftBICSearchOptions.skin = this.getFieldValue(this._sbssResultItemFlexSelectSkin);
        swiftCodes[rowIndex].imgSwiftBICSearchListTick.isVisible = true;
        this.view.segSwiftBICSearchList.setDataAt(swiftCodes[rowIndex], rowIndex);
        this.view.flxSwiftBICSearchList.forceLayout();
        if(this.lastSelectedRow === "" || this.lastSelectedRow === null || this.lastSelectedRow.length === 0){
          this.lastSelectedRow =rowIndex;
        }else{
          var lastSwift = this.lastSelectedRow;
          swiftCodes[lastSwift].flxSwiftBICSearchOptions.skin = this.getFieldValue(this._sbssResultItemFlexSkin);
          swiftCodes[lastSwift].imgSwiftBICSearchListTick.isVisible = false;
          this.view.segSwiftBICSearchList.setDataAt(swiftCodes[lastSwift], lastSwift);
          this.lastSelectedRow =rowIndex;
        }
        //this.view.btnUseSwift.skin = this.getFieldValue(this._sknEnableContexualBtn);
        //this.view.btnUseSwift.setEnabled(true);
        this.enableButton("btnUseSwift");
        this.view.flxSwiftBICSearchButtons.forceLayout();
        this.view.btnUseSwift.onClick = this.confirmSwiftCode.bind(this,swiftCodes[rowIndex]);
      }
    },

        /**     
	 * Component selectClearingCode
     * To select the ClearingCode code highlight and use the ClearingCode code
     */
        selectClearingCode:function(swiftCodes){
          var rowIndex = this.view.segBCCSearchList.selectedRowIndex[1];
          if(rowIndex !== this.lastSelectedRow){
            swiftCodes[rowIndex].flxSwiftBICSearchOptions.skin = this.getFieldValue(this._sbssResultItemFlexSelectSkin);
            swiftCodes[rowIndex].imgSwiftBICSearchListTick.isVisible = true;
            this.view.segBCCSearchList.setDataAt(swiftCodes[rowIndex], rowIndex);
            this.view.flxBCCSearchResult.forceLayout();
            if(this.lastSelectedRow === "" || this.lastSelectedRow === null || this.lastSelectedRow.length === 0){
              this.lastSelectedRow =rowIndex;
            }else{
              var lastSwift = this.lastSelectedRow;
              swiftCodes[lastSwift].flxSwiftBICSearchOptions.skin = this.getFieldValue(this._sbssResultItemFlexSkin);
              swiftCodes[lastSwift].imgSwiftBICSearchListTick.isVisible = false;
              this.view.segBCCSearchList.setDataAt(swiftCodes[lastSwift], lastSwift);
              this.lastSelectedRow =rowIndex;
            }
            //this.view.btnUseSwift.skin = this.getFieldValue(this._sknEnableContexualBtn);
            //this.view.btnUseSwift.setEnabled(true);
            this.enableButton("btnUseBCC");
            this.view.flxBCCSearchButtons.forceLayout();
            this.view.btnUseBCC.onClick = this.confirmClearingCode.bind(this,swiftCodes[rowIndex]);
          }
        },

    /**     
	 * Component onRequireCodeContinue
     * To set swift/bic and go to next page
     */
    onRequireCodeContinue:function(){
   
      if(!kony.sdk.isNullOrUndefined(this.view.txtRequiredBICSwift.text)) {
        if(this.inputPool.bic){
          if(this.view.txtRequiredBICSwift.text !== this.inputPool.bic){
            this.bicCode = this.view.txtRequiredBICSwift.text;
          } else {
            this.bicCode = "";
          }
        }
        this.inputPool[this.getFieldValue(this._rcsTextbox1,"inputPoolKey")]=this.view.txtRequiredBICSwift.text;
      }
      if(!kony.sdk.isNullOrUndefined(this.view.txtRequiredClearingCode1.text)) {
        this.inputPool[this.getFieldValue(this._rcsTextbox2,"inputPoolKey")]=this.view.txtRequiredClearingCode1.text;
      }
      if(!kony.sdk.isNullOrUndefined(this.view.txtRequiredClearingCode2.text)) {
        this.inputPool[this.getFieldValue(this._rcsTextbox3,"inputPoolKey")]=this.view.txtRequiredClearingCode2.text;
      }
      if(!kony.sdk.isNullOrUndefined(this.bicCode) || this.isEmptyNullUndefined(this.inputPool["bankName"])) { 
//         this.inputPool["bankName"] =  this.getFieldValue(this._rcsTextbox1,"defaultBankName");
//         this.inputPool["ibanBankName"] = this.getFieldValue(this._rcsTextbox1,"defaultBankName");
        this.getBankDetailsFromSwiftAndNav();
      } else {
      this.setLinkPayee("ADD");
      if(!this.isSingleUser)
        this.navigateTo("flxLinkPayee", "flxLinkPayeeTop", this.getFieldValue(this._linkPayeeSectionTitle));
      }
    },

    /**     
         * Component getBankDetailsFromSwift
         * Invoke api service to fetch the bank details from bic code.
         **/
    getBankDetailsFromSwift: function() {
      try {
        this.inputPool["bic"] = this.view.txtRequiredBICSwift.text;
        this.onRequestStart();
        this.setCriteria(this._rcsBankDetailsCriteria);
        var objSvcName = this.getFieldValue(this._rcsGetBankDetailsService);
        var objName = this.getFieldValue(this._rcsBankDetailsObject);
        var operationName = this.getFieldValue(this._rcsBankDetailsOperation);
        var criteria = this.getCriteria();
        this.UnifiedTransferDAO.invokeService(objSvcName, objName, operationName, criteria, "", this.setBankDetailsForNewPayee, this.setErrorBankDetailsForNewPayee);
      } catch (err) {
        var errObj = {
          "errorInfo": "Error in invokeValidateIBANService method of the component.",
          "errorLevel": "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**     
         * Component getBankDetailsFromSwiftAndNav
         * Invoke api service to fetch the bank details from bic code.
         **/
    getBankDetailsFromSwiftAndNav: function() {
      try {
        this.onRequestStart();
        this.setCriteria(this._rcsBankDetailsCriteria);
        var objSvcName = this.getFieldValue(this._rcsGetBankDetailsService);
        var objName = this.getFieldValue(this._rcsBankDetailsObject);
        var operationName = this.getFieldValue(this._rcsBankDetailsOperation);
        var criteria = this.getCriteria();
        this.UnifiedTransferDAO.invokeService(objSvcName, 
          objName, 
          operationName, 
          criteria, "", 
          function(response){
            this.setBankDetailsForNewPayee(response);
            this.setLinkPayee("ADD");
            if(!this.isSingleUser) {
              this.navigateTo("flxLinkPayee", "flxLinkPayeeTop", this.getFieldValue(this._linkPayeeSectionTitle));
            }
          }.bind(this), 
          this.setErrorBankDetailsForNewPayee);
      } catch (err) {
        var errObj = {
          "errorInfo": "Error in invokeValidateIBANService method of the component.",
          "errorLevel": "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    
    /**     
	 * Component setBankDetailsForNewPayee
     * Get bank Name from response and set to the context.
    **/
    setBankDetailsForNewPayee : function(response) {
      try {
        if(response.isBICValid !== "NO"){
          var bankName = response[this.getFieldValue("bankName")];
          if(!this.isEmptyNullUndefined(bankName)) {       
            this.inputPool["bankName"] = bankName;
            this.inputPool["ibanBankName"] = bankName;
            if(bankName.length > 105) {
              bankName = bankName.substr(0,104) + "....";
              this.inputPool["ibanBankName"] = bankName;
            }
          }
          this.onRequestEnd();
          this.setRequiredCodeData();
        } else {
          this.setErrorBankDetailsForNewPayee(response)
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setSwiftCodeForNewPayee method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**     
	 * Component setErrorBankDetailsForNewPayee
     * Notify the error details from response
    **/
	setErrorBankDetailsForNewPayee : function(response) {
	try {
        this.failureValidation();
        this.disableButton("btnRequiredCodeContinue");   
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setErrorBankDetailsForNewPayee method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
	},

    /**     

    /**
   ** Component getSearchData
   *  Filter by json search value.
   *  @param {json} serviceData ,searchValue.
   *  return searchData, Search results.
   */
    getSearchData: function(serviceData, searchValue,uniParam) {
      try {
         
        var emptyCount = 0;
        var searchData = [];
        for(var key in searchValue){
          searchValue[key] = searchValue[key].toLocaleLowerCase();
          if(!this.isEmptyNullUndefined(serviceData) && !this.isEmptyNullUndefined(searchValue[key]))
          {
            for (var i = 0; i < serviceData.length; i++) 
            {
              if(serviceData[i][key] !== undefined){
                if(serviceData[i][key].toString().toLocaleLowerCase().includes(searchValue[key]))
                {
                  var existingCount = 0;
                  for(var j=0;j<searchData.length;j++){
                    if(serviceData[i][uniParam] === searchData[j][uniParam]){
                      existingCount++;
                    }
                  }
                  if(!existingCount > 0){
                    searchData.push(serviceData[i]);
                  }
                }
              }else{
                delete searchValue[key];
              }
            }
          }
          if(searchValue[key] === ""){
            emptyCount++;
          }
        }
        if(Object.keys(searchValue).length === emptyCount){
          searchData = serviceData;
        }
        return searchData; 
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in getSearchData method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },


    /**
     * Component setPayeeName
     * Declaration of all for set Payee name
     */
    setPayeeName: function(selectedFlow){
      try {
       

        if(this._beneficiaryTypes=="DomesticBank"|| this._beneficiaryTypes=="InternationalBank" ||this._beneficiaryTypes=="PayAPerson")
        {
          if(selectedFlow!="EDIT")
          {
            this.setPayeeNameDefaultText();
            this.setPayeeNameSkins();
            this.setPayeeNameActions(selectedFlow);
          }
          if(this.payeeNameTextChange==true)
          {
             this.setPayeeNameActions(selectedFlow);
             this.view.txtPayeeName.text = this.getFieldValue(this.pynsTextbox, "value");            
            this.setPayeeNameDataTextChange();
          }
        }
        else if(this._beneficiaryTypes=="SameBank" && this._pynsVisibility==true)
        {
          if(selectedFlow!="EDIT")
          {
          this.setPayeeNameDefaultText();
          this.setPayeeNameSkins();
          this.setPayeeNameActions(selectedFlow);
          }
          if(this.payeeNameTextChange==true)
          {
             this.setPayeeNameActions(selectedFlow);
             this.view.txtPayeeName.text = this.getFieldValue(this.pynsTextbox, "value");                    
            this.setPayeeNameDataTextChange();
          }
        }
        else if(this._beneficiaryTypes=="SameBank" && this._pynsVisibility==false)
        {          
          this.navigateTo("flxAccountNumber");
          this.setAccountNumber("ADD");
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setPayeeName method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component setPayeeNameDefaultText
     * set default text for set Payee name
     */
    setPayeeNameDefaultText: function(){
      try {
        
        this.view.btnPayeeNameCancel.text = this.getFieldValue(this._cancelButton);
        this.view.btnPayeeNameCancel.isVisible = !this.isEmptyNullUndefined(this.getFieldValue(this._cancelButton)) ? true : false;
        this.view.lblPynsSectionHeader.text = this.getFieldValue(this._pynsSectionHeader);
        this.view.lblPynsSubHeader.text = this.getFieldValue(this._pynsSubHeader);       
        this.view.txtPayeeName.restrictCharactersSet = this.getFieldValue(this._pynsTextbox,"restrictChar");
        this.view.txtPayeeName.placeholder = this.getFieldValue(this._pynsTextbox, "placeHolder");
        this.view.txtPayeeName.maxTextLength = parseInt(this.getFieldValue(this._maxFillMapping)[this._jsonObjName]["txtBoxPayeeName"]);
        this.view.btnPayeeNameContinue.text = this.getFieldValue(this._pynsCTAButton, "text");
        this.view.lblPayeeNameErrMsg.setVisibility(false);
        this.view.txtPayeeName.text = "";
        this.disableButton("btnPayeeNameContinue");
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setRecipientNameWidgetProps method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component setPayeeNameSkins
     * set skins for set Payee name
     */
    setPayeeNameSkins: function()
    {
      try {
               
        this.view.flxPayeeName.skin = this.getFieldValue(this._gsknContentFlex);
        this.view.flxPayeeNameMain.skin = this.getFieldValue(this._gsknContentFlex);
        this.view.flxPayeeNameHeader.skin = this.getFieldValue(this._gsknHeaderFlex);		
        //scope.view.flxPayeeNameTop.skin = scope.getFieldValue(scope._gsknHeaderFlex);		
        this.view.imgPayeesNameBack.src = this.getFieldValue(this._iconBack);		
        this.view.btnPayeeNameCancel.skin = this.getFieldValue(this._gsknCancelBtn);		
        this.view.lblPynsSectionHeader.skin = this.getFieldValue(this._gsknHeaderLbl);		 
        this.view.flxPayeeNameSubHeader.skin = this.getFieldValue(this._gsknSubHeaderFlex);		
        this.view.lblPynsSubHeader.skin = this.getFieldValue(this._gsknSubHeaderLabel);		
        this.view.flxPayeenameSeparator.skin = this.getFieldValue(this._gsknSubHeaderseparator);		 
        this.view.flxPayeeNameMainContainer.skin = this.getFieldValue(this._gsknContentFlex);		 
        this.view.txtPayeeName.skin = this.getFieldValue(this._gsknTextBoxNormal);
        this.view.txtPayeeName.focusSkin = this.getFieldValue(this._gsknTextBoxFocus);       
        this.view.btnPayeeNameContinue.skin = this.getFieldValue(this._gsknDisabledContexualBtn);
        this.disableButton("btnPayeeNameContinue");
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setPayeeNameSkins method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component setPayeeNameActions
     * set actions for set Payee name
     */
    setPayeeNameActions: function(flow)
    {
      try {
        var scope = this;
        scope.view.btnPayeeNameContinue.onClick = scope.onPayeeNameContinue.bind(this,flow);
        scope.view.txtPayeeName.onTextChange = function(){
          scope.payeeNameTextChange=true;
          scope.setPayeeNameDataTextChange();
        };
        scope.view.flxPayeeNameBack.onTouchStart = scope.onBackButtonClick;
        scope.view.btnPayeeNameCancel.onClick = scope.onBackButtonClick;       
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setPayeeNameActions method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        scope.onError(errObj);
      }
    },

    /**
     * Component setPayeeNameDataTextChange
     * Continue button Validation based on payee name limit.
     */
    setPayeeNameDataTextChange: function() {
      try {
       
        if( this.payeeNameTextChange==true){
          this.view.txtPayeeName.setFocus(true);
          var payeeNameEntered={
            "txtBoxPayeeName":this.view.txtPayeeName.text
          };
          var minlength = this.minFillValidate(payeeNameEntered);
          var maxlength = this.maxFillValidate(payeeNameEntered);
          if(Object.keys(minlength).length === 0 && minlength.constructor === Object && Object.keys(maxlength).length === 0 && maxlength.constructor === Object){
            this.setPayeeNameResetTextBoxesSkins();
            this.view.lblPayeeNameErrMsg.setVisibility(false);
          }
          else{
            this.setPayeeNameValidationErrors(minlength);
          } 
          var payeeTextInput=this.performDataValidation(payeeNameEntered);
          if(Object.keys(payeeTextInput).length === 0 && payeeTextInput.constructor === Object){
            this.setPayeeNameResetTextBoxesSkins(); 
            this.enableButton("btnPayeeNameContinue");
          }
          else{
            this.disableButton("btnPayeeNameContinue");
            this.view.txtPayeeName.skin = this._gsknTextBoxError;
            this.setPayeeNameValidationErrors(payeeTextInput);
          }    
          var  title = this.view.txtPayeeName.text;
          if(Object.keys(minlength).length === 0 && minlength.constructor === Object &&
             Object.keys(maxlength).length === 0 && maxlength.constructor === Object &&
             Object.keys(payeeTextInput).length === 0 && payeeTextInput.constructor === Object){
            this.enableButton("btnPayeeNameContinue");
          } else {
            this.disableButton("btnPayeeNameContinue");
          }
        }
        this.view.forceLayout();
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setPayeeNameDataTextChange method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component onPayeeNameContinue
     * Navigate to next form based on transferType.
     */
    onPayeeNameContinue: function(flow) {
      try {
        
        this.view.txtPayeeName.skin = this.getFieldValue(this._gsknTextBoxNormal);
        if(!kony.sdk.isNullOrUndefined(this.view.txtPayeeName.text) && this.view.txtPayeeName.text !== "") {
          this.inputPool[this.getFieldValue(this._pynsTextbox,"inputPoolKey")]=this.view.txtPayeeName.text;
        }
        if(flow==="ADD"){
          if(!(this._beneficiaryTypes === "PayAPerson")){
            this.navigateTo("flxAccountNumber", "flxAccountNumberTop", this.getFieldValue(this._accSectionHeader));
            this.setAccountNumber("ADD");
          }else{
            this.setContactType("ADD");
            this.navigateTo("flxContactType", "flxContactTypeTop", this.getFieldValue(this._ctsSectionHeader));         
          }
       }
        else
        {
          this.setVerifyDetails();
          this.navigateTo("flxVerifyDetails", "flxVfsHeaderTop", this.getFieldValue(this._vfsSectionTitle));
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in onPayeeNameContinue method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component minFillValidate
     * Validation for minimum length
     */
    minFillValidate: function(dataJson) {
      try{
        
        var object = this.getFieldValue(this._jsonObjName);
        var minFillconfig = this.getFieldValue(this._minFillMapping);      
        var tempJson = {};
        for(var key in dataJson){
          if(dataJson[key]){
            tempJson[key] = dataJson[key];
          }
          else{
            tempJson[key] = "";
          }
        }
        var dataValidator = this.dataValidationHandler.validateMinFill
        (tempJson,object,minFillconfig);        
        return dataValidator;      
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in minFillValidate method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component maxFillValidate
     * Validation for minimum length
     */
    maxFillValidate: function(dataJson) {
      try{
       
        var object = this.getFieldValue(this._jsonObjName);
        var maxFillconfig = this.getFieldValue(this._maxFillMapping);      
        var tempJson = {};
        for(var key in dataJson){
          if(dataJson[key]){
            tempJson[key] = dataJson[key];
          }
          else{
            tempJson[key] = "";
          }
        }
        var dataValidator = this.dataValidationHandler.validateMaxFill
        (tempJson,object,maxFillconfig);  
        return dataValidator;      
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in maxFillValidate method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component performDataValidation
     * Validation forinput mode
     */
    performDataValidation: function(dataJSON) {
      try{
        
        var object = this.getFieldValue(this._jsonObjName);
        var fieldMapper = this.getFieldValue(this._dvfConfig);     
        var dataValidator = this.dataValidationHandler.validateData(dataJSON, object, fieldMapper);     
        return dataValidator;
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in performDataValidation method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component setPayeeNameResetTextBoxesSkins
     * Reponsible to reset skin fot textbox
     */
    setPayeeNameResetTextBoxesSkins: function(){
      try{
       
        this.view.txtPayeeName.focusSkin = this.getFieldValue(this._gsknTextBoxFocus); 
        this.view.txtPayeeName.skin = this._gsknTextBoxNormal;
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setPayeeNameResetTextBoxesSkins method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * @api : setPayeeNameValidationErrors
     * displays errors on validation of the fields in add beneficiary screen.
     * @return : NA
     */
    setPayeeNameValidationErrors: function(response) {
      try{
              
        if( this.payeeNameTextChange==true)
        {
          this.setPayeeNameInvokedvfFieldErrorParser(response);    
        }     
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setPayeeNameValidationErrors method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component setPayeeNameInvokedvfFieldErrorParser
     * Reponsible to set error message for payee name
     */
    setPayeeNameInvokedvfFieldErrorParser : function(dvfError){
      try {
               
        for(var iterator in dvfError){
          if("txtBoxPayeeName" == iterator){
            errorMsg=dvfError[iterator];             
            this.view.txtPayeeName.focusSkin = this._gsknTextBoxError; 
            this.view.txtPayeeName.skin = this._gsknTextBoxError;
          }           
        }         
        this.view.lblPayeeNameErrMsg.text = this.getFieldValue(this._pynsErrorMessage);
        this.view.lblPayeeNameErrMsg.setVisibility(true);       
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setPayeeNameInvokedvfFieldErrorParser method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component setLinkPayee
     * Declaration of all for set Payee name
     */
    setLinkPayee: function(flow){
      try {
             

        this.setLinkPayeeDefaultText(flow);
        this.setLinkPayeeSkins();
        this.setLinkPayeeActions();    

      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setLinkPayee method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component setPayeeNameDefaultText
     * set default text for set Payee name
     */
    setLinkPayeeDefaultText: function(flow){
      try {
           
        this.view.btnLinkPayeeCancel.text = this.getFieldValue(this._cancelButton);		
        this.view.lblLinkPayeeHeader.text = this.getFieldValue(this._linkPayeeSectionTitle);
        if(flow=="EDIT")
        {
          this.view.LinkPayeeCustomer.setContext(this.inputPool["cifId"]);

        }
        else
        {
          this.view.LinkPayeeCustomer.setContext();
        }

        this.view.forceLayout();
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setLinkPayeeDefaultText method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component setLinkPayeeSkins
     * set default skins for Link payee 
     */
    setLinkPayeeSkins: function(){
      try {
           
        this.view.flxLinkPayeeMain.skin = this.getFieldValue(this._gsknContentFlex);
        this.view.flxLinkPayeeHeader.skin = this.getFieldValue(this._gsknHeaderFlex);		
        this.view.flxLinkPayeeTop.skin = this.getFieldValue(this._gsknHeaderFlex);		
        this.view.imgLinkPayeeBack.src = this.getFieldValue(this._iconBack);		
        this.view.btnLinkPayeeCancel.skin = this.getFieldValue(this._gsknCancelBtn);
        this.view.lblLinkPayeeHeader.skin = this.getFieldValue(this._gsknHeaderLbl);

      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setLinkPayeeSkins method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component setLinkPayeeSkins
     * set default skins for Link payee 
     */
    setLinkPayeeActions: function(){
      try {
        var scope = this;   
        scope.view.btnLinkPayeeCancel.onClick = scope.onBackButtonClick;  
        scope.view.flxLinkPayeeBack.onClick = scope.goBack;
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setLinkPayeeSkins method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        scope.onError(errObj);
      }
    },

    /**
         * Component setLinkPayeeSkins
         * on continue click of Link payee 
         */
    onLinkPayeeContinue: function(selectedData,totalCustomers) {
      
      var contractId,customerValue ,totalCustomerSelectedCount = 0,dataLength = "",cif = [];
      try {
        if(this.isEmptyNullUndefined(totalCustomers))
        {  contractId = Object.keys(selectedData);  
         customerValue = selectedData[contractId];
         cif.push({
           "contractId": contractId[0],
           "coreCustomerId": customerValue
         });
         this.inputPool["cifId"] = JSON.stringify(cif);
         // totalCustomerSelectedCount=totalCustomerSelectedCount+dataLength;
         //  scope.stack.pop();
         this.setVerifyDetails();
         this.navigateTo("flxVerifyDetails", "flxVfsHeaderTop", this.getFieldValue(this._vfsSectionTitle));
         this.stack.splice(this.stack.length - 2, 1);
         return;
        }
        else if(!this.isEmptyNullUndefined(totalCustomers) && !this.isEmptyNullUndefined(selectedData))
        {
          this.createLinkPayeeCIFData(selectedData,totalCustomers);
          this.setVerifyDetails();
          this.navigateTo("flxVerifyDetails", "flxVfsHeaderTop", this.getFieldValue(this._vfsSectionTitle));
        }
      } catch (err) {
        var errObj = {
          "errorInfo": "Error in onLinkPayeeContinue method of the component.",
          "errorLevel": "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**
         * Component createLinkPayeeCIFData
         * set cif data for Link payee 
         */
    createLinkPayeeCIFData: function(selectedData,totalCustomers) {
     
      try {
        var cif = [];
        var  data, coreCustomerId = "";
        var totalCustomerSelectedCount=0;
        var contractIds = Object.keys(selectedData);
        for (var i = 0; i < contractIds.length; i++) {
          if (!this.isEmptyNullUndefined(selectedData[contractIds[i]])) {
            if (selectedData[contractIds[i]].includes("&&")) {
              data = selectedData[contractIds[i]].split('&&');
            }
            var dataLength = (data.length) - 1;
            var dataLastValue = (data.length) - 2;
            coreCustomerId = "";
            for (var j = 0; j < dataLength; j++) {
              coreCustomerId = coreCustomerId + data[j] + ",";
              if (j == dataLastValue) {
                coreCustomerId = coreCustomerId.slice(0, -1);
              }
            }
            cif.push({
              "contractId": contractIds[i],
              "coreCustomerId": coreCustomerId
            });
          }
          totalCustomerSelectedCount=totalCustomerSelectedCount+dataLength;
        }

        this.inputPool["cifId"] = JSON.stringify(cif);
        this.inputPool["linkedWith"]=totalCustomerSelectedCount+ " " + kony.i18n.getLocalizedString("i18n.konybb.Common.of") + " " + totalCustomers + " " + kony.i18n.getLocalizedString("i18n.payments.customerIDs")
      } catch (err) {
        var errObj = {
          "errorInfo": "Error in onLinkPayeeContinue method of the component.",
          "errorLevel": "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    
   
    /**
     * Component navigateToContacts.
     * Validation based on Access permissions.
     */
    navigateToContacts: function(type) {
      try {
        var scope = this;
        parent_scope.contactTypeForContacts = type;
        var options = {
          isAccessModeAlways:true
        };
        var result = kony.application.checkPermission(kony.os.RESOURCE_CONTACTS,options);
        if(result.status === kony.application.PERMISSION_DENIED) {
          kony.application.requestPermission(kony.os.RESOURCE_CONTACTS,function success(response){
            if(response.status === kony.application.PERMISSION_GRANTED) {
              parent_scope.pickContact();
            }
            else if(response.status === kony.application.PERMISSION_DENIED) {
              parent_scope.showToastMessageforContacts();
            }
          });
        }
        else if(result.status === kony.application.PERMISSION_GRANTED ) {
          this.pickContact();
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in navigateToContacts method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        scope.onError(errObj);
      }
    },

    showToastMessageforContacts: function() {
      
      this.dataProcessorUtility.showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.cardLess.permissionContacts"));
    },

    pickContact: function() {
      try {
        var scope = this;
        var contactsAPI = java.import("com.konyffi.contacts.ContactPicker");
        if(!parent_scope.contactPickerObject) {
          parent_scope.contactPickerObject = new contactsAPI();
        }
        if(parent_scope.contactTypeForContacts === "phone") {
          parent_scope.contactPickerObject.selectSinglePhoneNumber(parent_scope.contactCallBack);
        } else {
          parent_scope.contactPickerObject.selectSingleEmail(parent_scope.contactCallBack);
        } } catch(err){
          var errObj = {
            "errorInfo" : "Error in pickContact method of the component.",
            "errorLevel" : "Configuration",
            "error": err
          };
          scope.onError(errObj);
        }
    },

    contactCallBack:function(object) {
      try {
        var scope = this;
        var resultContact=(JSON.parse(object));
        if(parent_scope.contactTypeForContacts === "phone") {
          if(resultContact["phone"])
            scope.view.lblMobileNumber.text = resultContact["phone"];
          scope.onContactTypeEmailDone();
        } else {
          if(resultContact["email"])
            scope.view.txtContactTypeEmail.text = resultContact["email"];
          scope.onContactTypeEmailDone();
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in contactCallBack method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        scope.onError(errObj);
      }
    },

    /**
     * Component setContactTypeWidgetProps
     * Setting the field label and skin properties of contact type screen.
     */
    setContactTypeWidgetProps: function() {
      try {
        
        this.view.flxContactTypeHeader.skin = this.getFieldValue(this._sknHeaderBg);
        this.view.imgContactTypeBack.src = this.getFieldValue(this._iconBack);
        this.view.btnContactTypeCancel.skin = this.getFieldValue(this._sknCancelBtn);
        this.view.lblContactTypeHeader.skin = this.getFieldValue(this._sknHeaderLbl);
        this.view.lblContactTypeDescription.skin = this.getFieldValue(this._sknDescriptionLbl);
        this.view.flxContactTypeSeparator.skin = this.getFieldValue(this._sknDescriptionSeparator);
        this.view.lblEmailErrorMsg.skin = this.getFieldValue(this._errorValidationSkn);
        this.view.lblContactTypePhoneNumber.skin = this.getFieldValue(this._subTitleSkin);
        this.view.flxFlagAndCodeContainer.skin = this.getFieldValue(this._sknFlexNormal);
        this.view.lblMobileNumber.skin = this.getFieldValue(this._sknDescriptionLbl);
        this.view.lblContactCode.skin = this.getFieldValue(this._sknDescriptionLbl);
        this.view.flxMobileNumber.skin = this.getFieldValue(this._sknFlexNormal);
        this.view.lblContactTypeOr.skin = this.getFieldValue(this._subTitleSkin);
        this.view.flxContactTypeNumberSeparator.skin = this.getFieldValue(this._sknFlexNormal);
        this.view.txtContactTypeEmail.skin = this.getFieldValue(this._textBoxNormalSkin);
        this.view.lblContactTypeEmailOr.skin = this.getFieldValue(this._subTitleSkin);
        this.view.lblContactTypeEmailAddress.skin = this.getFieldValue(this._subTitleSkin);
        this.view.btnChooseContactList.skin = this.getFieldValue(this._lookUpSkn);
        this.view.lblContactTypeEmailAddress.skin = this.getFieldValue(this._sknQuestionLbl);
        this.view.btnChooseFromContactsEmail.skin = this.getFieldValue(this._lookUpSkn);
        this.view.btnContactTypeCancel.skin = this.getFieldValue(this._sknCancelBtn);
        // Text Properties.
        this.view.lblContactTypeHeader.text = this.getFieldValue(this._contactTypeTitle);
        this.view.btnContactTypeCancel.isVisible = !this.isEmptyNullUndefined(this.getFieldValue(this._cancelButton)) ? true : false;
        this.view.btnContactTypeCancel.text = this.getFieldValue(this._cancelButton);
        this.view.lblContactTypeDescription.text = this.getFieldValue(this._contactTypeDescription);
        this.view.lblEmailErrorMsg.text = this.getFieldValue(this._contactEmailError);
        this.view.lblContactTypePhoneNumber.text = this.getFieldValue(this._lblMobileNumber);
        this.view.lblContactCode.text = this.getFieldValue(this._txtInputMobileNumber, "defaultCountryCode");
        this.view.lblMobileNumber.text = this.getFieldValue(this._txtInputMobileNumber, "placeHolder");
        this.view.lblContactTypeOr.text = this.getFieldValue(this._contactOROption);
        this.view.btnChooseContactList.text = this.getFieldValue(this._phoneNumberChooseBtn, "text");
        this.view.lblContactTypeEmailAddress.text = this.getFieldValue(this._lblEmail);
        this.view.txtContactTypeEmail.placeholder = this.getFieldValue(this._txtInputEmail, "placeHolder");
        this.view.btnChooseFromContactsEmail.text = this.getFieldValue(this._emailChooseBtn, "text");
        this.view.btnContactTypeContinue.text = this.getFieldValue(this._contactTypeBtn, "text");
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setContactTypeWidgetProps method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component onContactTypeContinueClick
     * Navigate to next screen.
     */
    onContactTypeContinueClick: function() {
      try {
       
        var phoneNumber = this.view.lblMobileNumber.text;
        var placeholder = this.getFieldValue(this._txtInputMobileNumber, "placeHolder");
        if(phoneNumber !== placeholder) {
          var value = this.view.lblContactCode.text + "-" +this.view.lblMobileNumber.text;
          this.updateContext("mobileNumber", value);
          this.updateContext("toAvailableBalance", value);
        }
        if(!kony.sdk.isNullOrUndefined(this.view.txtContactTypeEmail.text) && this.view.txtContactTypeEmail.text !== "") {
          this.updateContext("emailId", this.view.txtContactTypeEmail.text);
          this.updateContext("toAvailableBalance", this.view.txtContactTypeEmail.text);
        } 
        var transferType = this.getFieldValue(this._flowType);
        if(transferType[this.selectedFlowType] === "EDIT") {
          this.setVerifyDetails();
          this.navigateTo("flxVerifyDetails", "flxVerifyHeaderTop", this.getFieldValue(this._verifySectionTitle));
        } else {
          if(this.transferTypeContext == this.getFieldValue(this._transferTypes,"T4")) {
            this.setTransferAmount();
            this.navigateTo("flxAmount","flxAmountTop",this.getFieldValue(this._transferAmountHeader));
          } 
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in onContactTypeContinueClick method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component onFlagandCodeFlexClick
     * Responsible to set Country code field properties.
     * Navigate to Country code screen.
     */
    onFlagandCodeFlexClick: function() {
      try {
       
        this.setCountryCode();
        this.getCountryCode();
        this.navigateTo("flxCountryCode", "flxCountryCodeTop", this.getFieldValue(this._countryCodeTitle));
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in onFlagandCodeFlexClick method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component getCountryCode
     * Invoke the country service to fetch response.
     */
    getCountryCode: function() {
      try {
       
        var objSvcName = this.getFieldValue(this._countryObjectServiceName);
        var objName = this.getFieldValue(this._countryObjectName);
        var operationName = this.getFieldValue(this._countryOperationName);
        var criteria = this.getCriteria(this._countryCriteria);
        var identifier = this.getFieldValue(this._countryIdentifier);
        this.onRequestStart();
        this.UnifiedTransferDAO.fetchCountriesList(objSvcName,objName,operationName,criteria,this.onSuccessFetchCountriesList,identifier,this.failureValidation);
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in getCountryCode method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component onSuccessFetchCountriesList
     * Setting the country name and country code to segment..
     */
    onSuccessFetchCountriesList: function(response, unicode) {
      try{
       
        var countryList = [];
        if(!this.isEmptyNullUndefined(this._countryServiceIdentifier)) {
          response = response[this.getFieldValue(this._countryServiceIdentifier)];
        }
        for (var each in response) {
          var segmentData = {
            "imgCountryCodeFlag" : this.getFieldValue(this._countryFlagVisibility) ? {"src":"french.png","isVisible": true} : {"isVisible":false},
            "lblCountryName" : response[each].Name,
            "lblCountryCode" : response[each].phoneCountryCode,
            "imgRightArrow" : this.getFieldValue(this._iconRightArrow)
          }
          countryList.push(segmentData);
        }
        this.view.segCountryCode.setData(countryList);
        this.countryDetails = this.view.segCountryCode.data;
        this.onRequestEnd();
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in onSuccessFetchCountriesList method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      } 
    },

    /**
   ** Component getSearchResult
   *  Filter by search value.
   *  @param {string} segData ,searchValue.
   *  return searchData, Search results.
   */
    getSearchResults: function(segData, searchValue) {
      try {
       
        var searchData = [];
        searchValue = searchValue.toLocaleLowerCase();
        if(!this.isEmptyNullUndefined(segData) && !this.isEmptyNullUndefined(searchValue))
        {
          for (var i = 0; i < segData.length; i++) 
          {
            if(Object.values(segData[i]).toString().toLocaleLowerCase().includes(searchValue))
            {
              searchData.push(segData[i]);
            }
          }
        }
        else
        {
          return ""; 
        }
        return searchData; 
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in getSearchResults method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**     
	 * Component setVerifyDetails
     * To bind the events,default field properties for verify Details.
     * flow denotes the edit flow or add flow
     */
    setVerifyDetails: function() {
      try {
      
        this.setVerifyDetailsDefaultText();
        this.setVerifyDetailsSkins();
        this.setVerifyDetailsActions();
        this.setVerifyDetailsData();
        this.view.forceLayout();
      }catch(err) {
        var errObj = {
          "errorInfo" : "Error in VerifyDetails method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**     
	 * Component setVerifyDetails
     * To bind the default text for verify Details.
     */
    setVerifyDetailsDefaultText : function()
    {
      try{
      
        if(this._beneficiaryTypes=="SameBank"){this.inputPool["accountType"] = "Same Bank Account"}
        if(this._beneficiaryTypes=="DomesticBank"){this.inputPool["accountType"] = "Domestic Account"}
        if(this._beneficiaryTypes=="InternationalBank"){this.inputPool["accountType"] = "International Account"}
        if(this._beneficiaryTypes=="PayAPerson"){this.inputPool["accountType"] = "Pay a Person"}
        if(this.isEmptyNullUndefined(this._cancelButton))
        {
          this.view.btnVfsCancel.setVisibility(false);
        }
        if(this.isEmptyNullUndefined(this._vfsSectionTitle))
        {
          this.view.lblVfsHeader.setVisibility(false);
        }
        this.view.btnVfsCancel.text = this.getFieldValue(this._cancelButton);
        this.view.lblVfsHeader.text = this.getFieldValue(this._vfsSectionTitle);
        this.view.imgVfsBack.src = this._iconBack;
        this.view.forceLayout();
      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in setVerifyDetailsDefaultText method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**     
	 * Component setVerifyDetails
     * To bind the default skins for verify Details.
     */
    setVerifyDetailsSkins : function()
    {
      try{
       
        this.view.flxVfsHeader.skin = this._gsknHeaderFlex;
        this.view.btnVfsCancel.skin = this._gsknCancelBtn;
        this.view.lblVfsHeader.skin = this._gsknHeaderLbl;
      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in setVerifyDetailsSkins method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**     
	 * Component setVerifyDetails
     * To bind the default Actions for verify Details.
     */
    setVerifyDetailsActions : function()
    {
      try{
        var scope = this;
        if(Object.keys(scope.context).length === 0){
          scope.view.imgVfsBack.onTouchStart = scope.goBack;
        }
        else
        {
          scope.view.imgVfsBack.onTouchStart = scope.onBackButtonClick;
        }
        scope.view.btnVfsCancel.onClick = scope.onBackButtonClick;
      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in setVerifyDetailsActions method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        scope.onError(errObj);
      } 
    },

    /**     
	 * Component setVerifyDetails
     * To bind the data for verify Details.
     */
    setVerifyDetailsData: function() {
            try {
                var scope = this;
                scope.mandatoryInputs = 0;
                scope.mandatoryInputsValue = 0;
                scope.inputPool["swiftCode"] = scope.inputPool["bic"];
                for (var i = 1; i < 16; i++) {
                    scope.view["flxField" + i].setVisibility(false);
                    var editIcon = scope._vfsIconEdit;
                    var fieldi18nLabel = scope['_vfsField' + i + "Lbl"];
                    var fieldLabel = scope.getFieldValue(scope['_vfsField' + i + "Lbl"]);
                    var fieldLabelSkin = scope._vfssLabelSkin;
                    var fieldValue = scope.getFieldValue(scope['_vfsField' + i + "Value"], "value");
                    var optionalField = scope.getFieldValue(scope['_vfsField' + i + "Value"], "optional");
                    var isEmpty = (optionalField === "");
                    if (isEmpty) {
                      optionalField = false;
                    }
                    if (fieldLabel === 'Clearing Code 2:' && fieldValue === '') {
                      continue;
                    }
                    if (fieldLabel === 'Bank Name:' && fieldValue === '') {
                      continue;
                    }
                    if (!scope.isEmptyNullUndefined(fieldLabel) && !scope.isEmptyNullUndefined(fieldValue)) {
                        scope.view["flxField" + i].setVisibility(true);
                        var readOnlyField = scope.getFieldValue(scope['_vfsField' + i + "Value"], "readOnly")[scope.inputPool["flowType"]];
                        var fieldValueSkin = (readOnlyField === true) ? scope._vfssValueReadonlySkin : scope._vfssValueEditableSkin;
                        scope.view["lblField" + i + "Label"].text = fieldLabel;
                        scope.view["lblField" + i + "Label"].skin = fieldLabelSkin;
                        scope.view["lblField" + i + "Label"].width = "40%";
                        scope.view["lblField" + i + "Value"].text = fieldValue;
                        scope.view["lblField" + i + "Value"].skin = fieldValueSkin;
                        scope.view["lblField" + i + "Value"].width = "45%";
                        scope.view["imgArrow" + i].src = editIcon;
                        if (readOnlyField) {
                            scope.view["imgArrow" + i].setVisibility(false);
                            scope.view["lblField" + i + "Value"].right = "20dp";
                            if (!scope.isEmptyNullUndefined(fieldValue)) {
                                scope.view["flxField" + i].setVisibility(true);
                            } else {
                                scope.view["flxField" + i].setVisibility(true);
                                scope.view["lblField" + i + "Value"].text = "None";
                            }
                        }
                      if(scope.inputPool["ibanBankName"]) {
                       if(scope.inputPool["ibanBankName"].length > 100) {
                        scope.view.flxField6.height = "80dp";
                        } else {
                        scope.view.flxField6.height = "54dp";
                        }
                      }
                        if (!isEmpty && !optionalField && !readOnlyField && !scope.isEmptyNullUndefined(readOnlyField) && !scope.isEmptyNullUndefined(optionalField)) {
                            scope.mandatoryInputs++;
                            if (!scope.isEmptyNullUndefined(fieldValue)) {
                                scope.mandatoryInputsValue++;
                            }
                        }
                        if (scope.view["lblField" + i + "Optional"] !== null) {
                          scope.view["lblField" + i + "Optional"].setVisibility(false);
                        }
                        if (optionalField && scope.view["lblField" + i + "Optional"] !== null) {
                            scope.view["lblField" + i + "Optional"].text = scope.getFieldValue("{i.i18n.payments.optionalWithColon}");
                            scope.view["lblField" + i + "Optional"].skin = fieldLabelSkin;
                            scope.view["lblField" + i + "Optional"].setVisibility(true);
                            scope.view["flxField" + i].height = "65dp";
                            scope.view["lblField" + i + "Optional"].centerY = "60%";
                            scope.view["lblField" + i + "Label"].centerY = "35%";
                        }
                    }
                    switch (fieldi18nLabel) {
                        case "{i.i18n.verifyDetails.payeeName}:":
                            if (!readOnlyField) {
                                scope.view["flxField" + i].onClick = function() {
                                    scope.setPayeeName("EDIT");
                                    scope.navigateTo("flxPayeeName", "flxPayeeNameTop", scope.getFieldValue(scope._pynsSectionHeader));
                                }
                            } else scope.view["flxField" + i].onClick = function() {}
                            break;
                        case "{i.kony.i18n.verifyDetails.accountNumber}":
                            if (!readOnlyField) {
                                scope.view["flxField" + i].onClick = function() {
                                    scope.setAccountNumber("EDIT");
                                    scope.navigateTo("flxAccountNumber", "flxAccountNumberTop", scope.getFieldValue(scope._accSectionHeader));
                                }
                            } else scope.view["flxField" + i].onClick = function() {}
                            break;
                        case "{i.kony.i18n.verifyDetails.bicSwift}":
                            if (!readOnlyField) {
                                scope.view["flxField" + i].onClick = function() {
                                    scope.setRequiredCode();
                                    scope.navigateTo("flxRequiredCode", "flxRequiredCodeTop", scope.getFieldValue(scope._rcsHdr));
                                }
                            } else scope.view["flxField" + i].onClick = function() {}
                            break;
                        case "{i.i18n.unifiedTransfers.bankClearingCode}:":
                            scope.view["flxField" + i].height = "80dp";
                            if (!readOnlyField) {
                                scope.view["flxField" + i].onClick = function() {
                                    scope.setRequiredCode();
                                    scope.navigateTo("flxRequiredCode", "flxRequiredCodeTop", scope.getFieldValue(scope._rcsHdr));
                                }
                            } else scope.view["flxField" + i].onClick = function() {}
                            break;
                        case "{i.kony.i18n.verifyDetails.clearingCode2}":
                            scope.view["flxField" + i].onClick = function() {
                                scope.setRequiredCode();
                                scope.navigateTo("flxRequiredCode", "flxRequiredCodeTop", scope.getFieldValue(scope._rcsHdr));
                            }
                            break;
                        case "{i.i18n.verifyDetails.accountNicknameOptional}":
                            if (!readOnlyField) {
                                scope.view["flxField" + i].onClick = function() {
                                    scope.setPayeeNickname();
                                    scope.navigateTo("flxPayeeNickname", "flxNicknameTopContainer", scope.getFieldValue(scope._annSectionHeader));
                                }
                            } else scope.view["flxField" + i].onClick = function() {}
                            break;
                        case "{i.i18n.verifyDetails.phoneNumberOptional}":
                            if (!readOnlyField) {
                                if (scope._beneficiaryTypes === "PayAPerson") {
                                    if (scope.inputPool["contactType"] !== kony.i18n.getLocalizedString("i18n.payments.P2pPhoneNumber")) {
                                        scope.view["flxField" + i].setVisibility(false);
                                        scope.mandatoryInputs--;
                                        scope.view["flxField" + i].onClick = function() {};
                                    } else {
                                        scope.inputPool["primaryContact"] = scope.inputPool["phoneNumber"];
                                        scope.inputPool["primaryValue"] = scope.inputPool["phoneNumber"];
                                        scope.view["flxField" + i].onClick = function() {
                                            scope.setPhoneNumber("EDIT");
                                            scope.navigateTo("flxPhoneNumber", "flxPhoneNumberTop", scope.getFieldValue(scope._phnoSectionHeader));
                                        }
                                    }
                                } else {
                                    scope.view["flxField" + i].onClick = function() {
                                        scope.setPhoneNumber();
                                        scope.navigateTo("flxPhoneNumber", "flxPhoneNumberTop", scope.getFieldValue(scope._phnoSectionHeader));
                                    }
                                }
                            } else scope.view["flxField" + i].onClick = function() {}
                            break;
                        case "{i.i18n.verifyDetails.emailAddressOptional}":
                            if (!readOnlyField) {
                                if (scope._beneficiaryTypes === "PayAPerson") {
                                    if (scope.inputPool["contactType"] !== kony.i18n.getLocalizedString("i18n.login.CantSignIn.EmailAddress")) {
                                        scope.view["flxField" + i].setVisibility(false);
                                        scope.mandatoryInputs--;
                                        scope.view["flxField" + i].onClick = function() {};
                                    } else {
                                        scope.inputPool["primaryContact"] = scope.inputPool["emailAddress"];
                                        scope.view["flxField" + i].onClick = function() {
                                            scope.setEmailAddress("EDIT");
                                            scope.navigateTo("flxEmailAddress", "flxEmailAddressTop", scope.getFieldValue(scope._easSectionHeader));
                                        }
                                    }
                                } else {
                                    scope.view["flxField" + i].onClick = function() {
                                        scope.setEmailAddress();
                                        scope.navigateTo("flxEmailAddress", "flxEmailAddressTop", scope.getFieldValue(scope._easSectionHeader));
                                    }
                                }
                            } else scope.view["flxField" + i].onClick = function() {}
                            break;
                        case "{i.i18n.verifyDetails.linkedWith}:":
                            if (!readOnlyField) {
                                if (!scope.isEmptyNullUndefined(fieldValue)) {
                                    scope.view["lblField" + i + "Optional"].setVisibility(false);
                                    scope.view["lblField" + i + "Label"].centerY = "50%";
                                    scope.view["flxField" + i].onClick = function() {
                                        scope.setLinkPayee("EDIT");
                                        scope.navigateTo("flxLinkPayee", "flxLinkPayeeTop", scope.getFieldValue(scope._linkPayeeSectionTitle));
                                    }
                                } else {
                                    scope.view["flxField" + i].setVisibility(false);
                                }
                            } else scope.view["flxField" + i].onClick = function() {}
                            break;
                        case "{i.i18n.unifiedBeneficiary.nationalID}:":
                            if (!readOnlyField) {
                                if (scope._beneficiaryTypes === "PayAPerson") {
                                    if (scope.inputPool["contactType"] !== kony.i18n.getLocalizedString("i18n.payments.nationalID")) {
                                        scope.view["flxField" + i].setVisibility(false);
                                        scope.mandatoryInputs--;
                                        scope.view["flxField" + i].onClick = function() {};
                                    } else {
                                        scope.inputPool["primaryContact"] = scope.inputPool["nationalID"];
                                        scope.inputPool["primaryValue"] = scope.inputPool["nationalID"];
                                        scope.view["flxField" + i].onClick = function() {
                                            scope.setNationalID("EDIT");
                                            scope.navigateTo("flxNationalID", "flxNationalIDTop", scope.getFieldValue(scope._nisSectionHeader));
                                        }
                                    }
                                } else {
                                    scope.view["flxField" + i].onClick = function() {
                                        scope.setNationalID("EDIT");
                                        scope.navigateTo("flxNationalID", "flxNationalIDTop", scope.getFieldValue(scope._nisSectionHeader));
                                    }
                                }
                            } else scope.view["flxField" + i].onClick = function() {}
                            break;
                        case "{i.i18n.UnifiedTransfers.StreetName}:":
                          if (!readOnlyField) {
                            scope.view["flxField" + i].onClick = scope.navToPayeeBankStreet;
                          } else{ 
                            scope.view["flxField" + i].onClick = function() {}
                          }
                          break;
                        case "{i.i18n.UnifiedTransfers.TownName}:":
                          if (!readOnlyField) {
                            scope.view["flxField" + i].onClick = scope.navToPayeeBankTown;
                          } else{ 
                            scope.view["flxField" + i].onClick = function() {}
                          }
                          break;
                        case "{i.i18n.UnifiedTransfers.CountryName}:":
                          if (!readOnlyField) {
                            scope.view["flxField" + i].onClick = scope.navToPayeeBankCountry;
                          } else{ 
                            scope.view["flxField" + i].onClick = function() {}
                          }
                          break;
                        case "{i.i18n.UnifiedTransfer.ClearingIdentifierCode}:":
                          if (!readOnlyField) {
                            scope.view["flxField" + i].onClick = scope.navToCIC;
                          } else{ 
                            scope.view["flxField" + i].onClick = function() {}
                          }
                          break;
                        case "{i.i18n.UnifiedTransfer.IntermediaryBIC}:":
                          if (!readOnlyField) {
                            scope.view["flxField" + i].onClick = scope.navToIntermediaryBIC;
                          } else{ 
                            scope.view["flxField" + i].onClick = function() {}
                          }
                          break;
                        case "{i.i18n.verifyDetails.bankName}:":
                          if (!readOnlyField) {
                            scope.view["flxField" + i].onClick = scope.navToPayeeBankName;
                          } else{ 
                            scope.view["flxField" + i].onClick = function() {}
                          }
                          break;
                    }
                }
                var addressDetails = "";
                scope.view.flxAddress.setVisibility(false);
                if (!scope.isEmptyNullUndefined(scope._vfsPayeeAddLbl) && Object.keys(scope._vfsPayeeAddLbl).length > 0) {
                    scope.view.flxAddress.setVisibility(true);
                    var optionalAddress = scope.getFieldValue(scope._vfsPayeeAddLbl, "optional");
                    var addressLabel = scope.getFieldValue(scope._vfsPayeeAddLbl, "text");
                    scope.view.lblAddressDetails.setVisibility(false);
                    for (var j = 1; j < 7; j++) {
                        var fieldAddress = scope.getFieldValue(scope['_vfsField' + j + "Address"]);
                        if (!scope.isEmptyNullUndefined(fieldAddress)) {
                            addressDetails = addressDetails + fieldAddress + ', ';
                        }
                    }
                    scope.view.flxAddress.onClick = function() {
                        scope.setAddAddress();
                        scope.navigateTo("flxAddAddress", "flxAddAddressHeaderTop", scope.getFieldValue(scope._adsSectionHeader));
                    }
                    if (!scope.isEmptyNullUndefined(addressDetails)) {
                        var readOnlyAddress = scope.getFieldValue(scope._vfsPayeeAddLbl, "readOnly")[scope.inputPool["flowType"]];
                        var fieldValueSkin = (readOnlyAddress === true) ? scope._vfssValueReadonlySkin : scope._vfssValueEditableSkin;
                        scope.view.lblAddressDetails.text = addressDetails.slice(0, -1);
                        scope.view.lblAddressDetails.skin = fieldValueSkin;
                        scope.view.lblAddressDetails.setVisibility(true);
                    }
                    if (readOnlyAddress) {
                        scope.view.flxRight.setVisibility(false);
                        scope.view.flxAddress.onClick = function() {}
                    }
                    if (optionalAddress) {
                        scope.view.flxRight.setVisibility(true);
                        var editIcon = scope._vfsIconEdit;
                        scope.view.imgBeneArrow.src = editIcon;
                        var optional = scope.getFieldValue("{i.i18n.payments.optionalWithColon}");
                        addressLabel = addressLabel + " " + optional;
                        scope.view.lblAddressLabel.text = addressLabel;
                        scope.view.lblAddressLabel.skin = scope._vfssLabelSkin;
                        scope.inputPool["payeeAddressLabel"] = addressLabel;
                    } else {
                        scope.mandatoryInputs++;
                        if (!scope.isEmptyNullUndefined(addressDetails)) {
                            scope.mandatoryInputsValue++;
                        }
                        scope.view.lblAddressLabel.text = addressLabel;
                        scope.view.lblAddressLabel.skin = scope._vfssLabelSkin;
                        scope.inputPool["payeeAddressLabel"] = addressLabel;
                    }
                }
                for (var i = 1; i < 3; i++) {
                    scope.view["btnCTAButton" + i].setVisibility(false);
                    var buttonLabel = scope.getFieldValue(scope['_vfsCTAButton' + i], "text");
                    if (!scope.isEmptyNullUndefined(buttonLabel)) {
                        var buttonId = scope.getFieldValue(scope['_vfsCTAButton' + i], "id");
                        var buttonAction = scope.getFieldValue(scope['_vfsCTAButton' + i], "actionType");
                        scope.view["btnCTAButton" + i].setVisibility(true);
                        scope.view["btnCTAButton" + i].text = buttonLabel;
                        if (buttonAction === "primary" && buttonId === "AddAccount") {
                            scope.view["btnCTAButton" + i].skin = scope._gsknPrimaryContexualBtn;
                            scope.view["btnCTAButton" + i].onClick = function() {
                                scope.createAccount();
                            };
                        } else {
                            scope.view["btnCTAButton" + i].skin = scope._gsknPrimaryContexualBtn;
                        }
                    }
                }
                if (scope.mandatoryInputsValue !== scope.mandatoryInputs) {
                    for (var i = 1; i < 3; i++) {
                        scope.disableButton("btnCTAButton" + i);
                    }
                } else {
                    for (var i = 1; i < 3; i++) {
                        scope.enableButton("btnCTAButton" + i);
                    }
                }
                scope.view.forceLayout();
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in setVerifyDetailsData method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                scope.onError(errObj);
            }
        },

    /**
     * Component createAccount
     * Responsible to create the Account
     */
     createAccount : function()
     {
       var scope = this;
       try{
       if(!applicationManager.getUserPreferencesManager().isSingleCustomerProfile && scope.context["Membership_id"]){
 
           applicationManager.getRecipientsManager().fetchContractDetails(scope._vfsCriteria.feature, function (response) {
             var cif = [];
             var contracts = response.contracts;
             var contractId;
             
             var coreCustomerId = scope.context["Membership_id"];
             for (const contract of contracts) {
               for (const contractCustomer of contract.contractCustomers){
                 if (contractCustomer.coreCustomerId === coreCustomerId) {
                   contractId = contract.contractId;
                   break;
                 }
               }
               if (contractId) break;
             }
             if (contractId) {
               cif.push({
                            "contractId": contractId,
                            "coreCustomerId": coreCustomerId
                        });
               scope.inputPool["cifId"] = JSON.stringify(cif);
               scope.onRequestStart();
               scope.setCriteria(scope._vfsCriteria);
               scope.UnifiedTransferDAO.invokeService(scope._vfsObjectService, scope._vfsObject, scope._vfsOperation, scope.getCriteria(), "", scope.successfulAccountCreation, scope.failureAccountCreation);       
 
             }             }, function () {
             scope.onRequestStart();
             scope.setCriteria(scope._vfsCriteria);
 
             scope.UnifiedTransferDAO.invokeService(scope._vfsObjectService, scope._vfsObject, scope._vfsOperation, scope.getCriteria(), "", scope.successfulAccountCreation, scope.failureAccountCreation);
           });
         }
       else {
           scope.onRequestStart();
           scope.setCriteria(scope._vfsCriteria);
           scope.UnifiedTransferDAO.invokeService(scope._vfsObjectService, scope._vfsObject, scope._vfsOperation, scope.getCriteria(), "", scope.successfulAccountCreation, scope.failureAccountCreation);}
        }
 catch(err) {
     scope.onRequestEnd();
     var errObj = {
     "errorInfo" : "Error in createAccount method of the component.",
     "errorLevel" : "Configuration",
     "error": err
   };
   scope.onError(errObj);
 }
        },


    /**
     * Component successfulAccountCreation
     * Responsible to navigate to successful acknowledgment
     */
    successfulAccountCreation : function(response)
    {
      var scope = this;
      if(!scope.isEmptyNullUndefined(response.transactionStatus) && response.transactionStatus === "Pending") {
        response.Id = response.referenceId;
      }
      response = Object.assign(this.inputPool, response);
      this.createAccountCallback(response);
      this.onRequestEnd();
    },

    /**
     * Component failureAccountCreation
     * Responsible to navigate to failure acknowledgment
     */
    failureAccountCreation : function(response)
    {
      
      this.createAccountCallback(response);
      this.onRequestEnd();
    },

    /**     
	 * Component PhoneNumKeyboardDataSetting
     * To bind the functions for each keybroad butttons
     */
    PhoneNumKeyboardDataSetting:function(){
      try
      {
        var scope = this;
        this.view.btnContactType1.onClick = this.setPhoneNumKeypadChar.bind(this, 1);
        this.view.btnContactType2.onClick = this.setPhoneNumKeypadChar.bind(this, 2);
        this.view.btnContactType3.onClick = this.setPhoneNumKeypadChar.bind(this, 3);
        this.view.btnContactType4.onClick = this.setPhoneNumKeypadChar.bind(this, 4);
        this.view.btnContactType5.onClick = this.setPhoneNumKeypadChar.bind(this, 5);
        this.view.btnContactType6.onClick = this.setPhoneNumKeypadChar.bind(this, 6);
        this.view.btnContactType7.onClick = this.setPhoneNumKeypadChar.bind(this, 7);
        this.view.btnContactType8.onClick = this.setPhoneNumKeypadChar.bind(this, 8);
        this.view.btnContactType9.onClick = this.setPhoneNumKeypadChar.bind(this, 9);
        this.view.btnContactType0.onClick = this.setPhoneNumKeypadChar.bind(this, 0);
        this.view.imgContactTypeKeypadClear.onTouchEnd = this.clearPhoneNumKeypadChar;
      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in PhoneNumKeyboardDataSetting method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        scope.onError(errObj);
      }
    },

    /**     
   * Component setPhoneNumKeypadChar
     * To set the key and update the value based on clicked button in keyboard
     * char - parameter contain the clicked keyboard button value
     */
    setPhoneNumKeypadChar: function (char) {
      try
      {
        
        if(this.keypadString.length < parseInt(this.getFieldValue(this._maxFillMapping)[this._jsonObjName]["lblMobileNumber"]))
        {
          this.keypadString = this.keypadString + char;
          this.updatePhoneNumValue();
          this.setPhoneNumberData();
        }
      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in setPhoneNumKeypadChar method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**     
   * Component clearPhoneNumKeypadChar
     * To clear the data one by one while clicking on clear button from keyboard
     */  
    clearPhoneNumKeypadChar: function () {
      try
      {
        
        if (this.keypadString === '') return;
        this.keypadString = this.keypadString.slice(0, -1);
        this.updatePhoneNumValue();
        this.setPhoneNumberData();
      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in clearPhoneNumKeypadChar method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**     
   * Component clearPhoneNumKeypad
     * To clear all the data while clicking on clear image
     */ 
    
    /**     
   * Component updatePhoneNumValue
     * To updating values by clicking the value from keyborad 
     */  
    updatePhoneNumValue: function () {
      try
      {
      
        if(!this.isEmptyNullUndefined(this.keypadString))
        {
          this.view.lblMobileNumber.text = this.keypadString;
          this.view.lblMobileNumber.skin = this._phnosLabelValueSkn;
          this.enableButton("btnPhonerNumberContinue");
        }
        else
        {
          this.view.lblMobileNumber.text = this.getFieldValue(this._phnoTxtbox2,"placeHolder");
          this.view.lblMobileNumber.skin = this._gsknSubHeaderLabel;
          this.disableButton("btnPhonerNumberContinue");
        }
      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in updatePhoneNumValue method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**     
	 * Component setPhoneNumber
     * To bind the events,default field properties for Phone Number.
     * * @param {string} flow denotes the edit flow or add flow
     */
    setPhoneNumber: function(flow) {
      try {
       
        this.PhoneNumKeyboardDataSetting();
        this.setPhoneNumberDefaultText();
        this.setPhoneNumberSkins();
        this.setPhoneNumberActions(flow);
        this.view.forceLayout();
      }catch(err) {
        var errObj = {
          "errorInfo" : "Error in setPhoneNumber method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**     
	 * Component setPhoneNumberDefaultText
     * To bind the default text for Phone number.
     */
    setPhoneNumberDefaultText : function()
    {
      try{
       
        if(this._beneficiaryTypes === "PayAPerson")
        {
          this.view.flxContactsLookup.setVisibility(true);
        }
        else
          this.view.flxContactsLookup.setVisibility(false);
        this.disableButton("btnPhonerNumberContinue");
        if(this.isEmptyNullUndefined(this.getFieldValue(this._cancelButton)))
        {
          this.view.btnPhoneNumberCancel.setVisibility(false);
        }
        if(this.isEmptyNullUndefined(this.getFieldValue(this._phnoSectionHeader)))
        {
          this.view.lblPhoneNumberHeader.setVisibility(false);
        }
        if(this.isEmptyNullUndefined(this.getFieldValue(this._phnoSubheader)))
        {
          this.view.lblPhnoSubHeader.setVisibility(false);
        }
        if(this.isEmptyNullUndefined(this.getFieldValue(this._phnoCTABtn1)))
        {
          this.view.flxPhoneNumberLookup.setVisibility(false);
        }
        if(this.isEmptyNullUndefined(this.getFieldValue(this._phnoOROption)))
        {
          this.view.lblPhoneNumberOrLabel.setVisibility(false);
          this.view.flxPhoneNumberOrLabel.setVisibility(false);
        }
        if(this.isEmptyNullUndefined(this.getFieldValue(this._phnoCTABtn2)))
        {
          this.view.btnPhoneNumberlookupContacts.setVisibility(false);
        }
        if(this.isEmptyNullUndefined(this.getFieldValue(this._phnoCTABtn3)))
        {
          this.view.btnPhonerNumberContinue.setVisibility(false);
        }
        this.view.btnPhoneNumberCancel.text = this.getFieldValue(this._cancelButton);
        this.view.lblPhoneNumberHeader.text = this.getFieldValue(this._phnoSectionHeader);
        this.view.imgPhoneNumberBack.src = this._iconBack;
        this.view.lblField2.text = this.getFieldValue(this._phnoTxtbox1Label);
        this.view.lblField1.text = this.getFieldValue(this._phnoTxtbox2Label);
        this.view.lblPhnoSubHeader.text = this.getFieldValue(this._phnoSubheader);
        this.view.flxPhoneNumberLookup.text = this.getFieldValue(this._phnoCTABtn1,"text");
        this.view.lblPhoneNumberOrLabel.text = this.getFieldValue(this._phnoOROption).toLocaleLowerCase();
        this.view.btnPhoneNumberlookupContacts.text = this.getFieldValue(this._phnoCTABtn2,"text");
        this.view.btnPhonerNumberContinue.text = this.getFieldValue(this._phnoCTABtn3,"text");
        this.view.imgContactTypeKeypadClear.src = this.getFieldValue(this._phnoKeypadClearIcon);
        if(!this.isEmptyNullUndefined(this[this._inputValuesPool][this.getFieldValue(this._phnoTxtbox2, "inputPoolKey")]))
        {
          this.view.lblMobileNumber.text = this[this._inputValuesPool][this.getFieldValue(this._phnoTxtbox2, "inputPoolKey")];
          this.view.lblMobileNumber.skin = this._phnosLabelValueSkn;
          this.enableButton("btnPhonerNumberContinue");
        }
        else
        {
          this.view.lblMobileNumber.text = this.getFieldValue(this._phnoTxtbox2,"placeHolder");
          this.view.lblMobileNumber.skin = this._gsknSubHeaderLabel;

        }
        if(!this.isEmptyNullUndefined(this[this._inputValuesPool][this.getFieldValue(this._phnoTxtbox1, "inputPoolKey")]))
        {
          this.view.tbxContactCode.text = this[this._inputValuesPool][this.getFieldValue(this._phnoTxtbox1, "inputPoolKey")];
          //scope.enableButton("btnPhonerNumberContinue");
        }
        else
        {
          this.view.tbxContactCode.text = "";
          //scope.disableButton("btnPhonerNumberContinue");
        }
        if(!this.getFieldValue(this._phnoCCVisibility))
        {
          this.view.flxCountryCodeContainer.setVisibility(false);
          this.view.lblField2.setVisibility(false);
          this.view.flxPhoneNumberLookup.setVisibility(false);
          this.view.flxTypePhoneNumber.left = "15%";
        }
        if(!this.isEmptyNullUndefined(this.keypadString) && !this.isEmptyNullUndefined(this.view.tbxContactCode.text))
        {
          this.view.lblMobileNumber.text = this.keypadString;
          this.view.lblMobileNumber.skin = this._phnosLabelValueSkn;
          this.enableButton("btnPhonerNumberContinue");
        }
        if(this.keypadString.length !== Number(this._minFillMapping.Recipients.lblMobileNumber)){
          this.disableButton("btnPhonerNumberContinue");
        }
        // scope.view.tbxContactCode.maxTextLength = parseInt(scope.getFieldValue(scope._maxFillMapping)[scope._jsonObjName]["tbxContactCode"]);
        this.view.forceLayout();
      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in setPhoneNumberDefaultText method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**     
	 * Component setPhoneNumberSkins
     * To bind the default skins for Phone number.
     */
    setPhoneNumberSkins : function()
    {
      try{
       
        this.view.flxPhoneNumberHeader.skin = this._gsknHeaderFlex;
        this.view.btnPhoneNumberCancel.skin = this._gsknCancelBtn;
        this.view.lblPhoneNumberHeader.skin = this._gsknHeaderLbl;
        this.view.tbxContactCode.skin = this._phnosTbxValueSkn;
        this.view.tbxContactCode.focusSkin = this._phnosTbxValueSkn;
        //scope.view.lblMobileNumber.skin = scope._gsknSubHeaderLabel;
        this.view.flxPhoneNumberSubHeader.skin = this._gsknSubHeaderFlex;
        this.view.flxPhoneNumberSeparator.skin = this._gsknSubHeaderseparator;
        this.view.lblPhnoSubHeader.skin = this._gsknSubHeaderLabel;
        this.view.btnPhoneNumberlookupContacts.skin = this._phnosPickPhoneNoSkin;
        this.view.flxPhoneNumberLookup.skin = this._phnosPickPhoneNoSkin;
        this.view.flxPhoneNumberOrLabel.skin = this._phnosOROptionFlexSkin;
        this.view.lblPhoneNumberOrLabel.skin = this._phnosOROptionLabelSkin;
        //scope.view.btnPhonerNumberContinue.skin = scope._gsknPrimaryContexualBtn;
        this.view.lblFieldErrorMsg.skin = this._gsknErrorTextMessage;
      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in setPhoneNumberSkins method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**     
	 * Component setPhoneNumberActions
     * To bind the default Actions for Phone number
     */
    setPhoneNumberActions : function(flow)
    {
      try{
        var scope = this;
        scope.view.imgPhoneNumberBack.onTouchStart = scope.goBack;
        scope.view.btnPhoneNumberCancel.onClick = scope.onBackButtonClick;
        scope.view.flxPhoneNumberLookup.onClick = function()
        {
          scope.setCountryCode();
          scope.navigateTo("flxCountryCode", "flxCountryCodeTop", scope.getFieldValue(scope._ccsSectionHeader));
        }
        scope.view.btnPhoneNumberlookupContacts.onClick = function()
        {
          scope.setChooseFromContacts("phone");
          scope.navigateTo("flxChooseFromContacts", "flxCfcTop", scope.getFieldValue(scope._cfcSectionHeader));
        }
        scope.view.btnPhonerNumberContinue.onClick = scope.onPhoneNumberContinue.bind(this,flow);
		scope.view.flxMobileNumberContainer.onClick = function(){
          scope.view.lblMobileNumber.setFocus(true);
        };
        scope.view.tbxContactCode.onTouchStart = function(){
          scope.view.tbxContactCode.setFocus(true);
        };
        scope.view.tbxContactCode.onEndEditing = function(){
          scope.setPhoneNumberData();
        };
        scope.view.tbxContactCode.onDone = function(){
          scope.setPhoneNumberData();
        };
      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in setPhoneNumberActions method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        scope.onError(errObj);
      } 
    },

    /**     
	 * Component setPhoneNumberData
     * To bind the default Actions for Phone number
     */
    setPhoneNumberData : function()
    {
      try{
        
        var phone = this.view.lblMobileNumber.text;
        var phoneJSON = {
          "lblMobileNumber" : phone
        };
        var maxlength = this.maxFillValidate(phoneJSON); 
        if(Object.keys(maxlength).length === 0 && maxlength.constructor === Object){
          this.enableButton("btnPhonerNumberContinue");            
        } else{
          this.disableButton("btnPhonerNumberContinue");
        } 
        var minlength = this.minFillValidate(phoneJSON);
        if(Object.keys(minlength).length === 0 && minlength.constructor === Object){            
          this.enableButton("btnPhonerNumberContinue");            
        } else{
          this.disableButton("btnPhonerNumberContinue");
        }
        if(this.isEmptyNullUndefined(this.view.tbxContactCode.text)){
          this.disableButton("btnPhonerNumberContinue");          
        }
        this.view.forceLayout(); 
      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in setPhoneNumberData method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      } 
    },

    /**     
	 * Component onPhoneNumberContinue
     * To bind the default Actions for Phone number
     */
    onPhoneNumberContinue : function(flow)
    {
      try{
        
        var phone = this.view.lblMobileNumber.text;
        var code = this.view.tbxContactCode.text;
        this[this._inputValuesPool][this.getFieldValue(this._phnoTxtbox2, "inputPoolKey")] = phone;
        this.inputPool["formattedPhoneNumber"] = code+phone;
        this[this._inputValuesPool][this.getFieldValue(this._phnoTxtbox1, "inputPoolKey")] = code;
        if(this._beneficiaryTypes === "PayAPerson" && flow !== "EDIT")
        {
          this.setLinkPayee("ADD");
          if(!this.isSingleUser)
            this.navigateTo("flxLinkPayee", "flxLinkPayeeTop", this.getFieldValue(this._linkPayeeSectionTitle));
        }
        else
        {
          this.setVerifyDetails();
          this.navigateTo("flxVerifyDetails", "flxVfsHeaderTop", this.getFieldValue(this._vfsSectionTitle));
        }

      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in onPhoneNumberContinue method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      } 
    },

    /**     
	 * Component setCountryCode
     * To bind the events,default field properties for Country Code
     * * @param {string} flow denotes the edit flow or add flow
     */
    setCountryCode : function() {
      try {
        
        this.setCountryCodeDefaultText();
        this.setCountryCodeSkins();
        this.setCountryCodeActions();
        this.setCountryCodeData();
        this.view.forceLayout();
      }catch(err) {
        var errObj = {
          "errorInfo" : "Error in setCountryCode method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**     
	 * Component setCountryCodeDefaultText
     * To bind the default text for Email Address
     */
    setCountryCodeDefaultText : function()
    {
      try{
       

        if(this.isEmptyNullUndefined(this.getFieldValue(this._cancelButton)))
        {
          this.view.btnCountryCodeCancel.setVisibility(false);
        }
        if(this.isEmptyNullUndefined(this.getFieldValue(this._ccsSectionHeader)))
        {
          this.view.lblCountryCodeHeader.setVisibility(false);
        }
        if(this.isEmptyNullUndefined(this.getFieldValue(this._ccsSearchbox)))
        {
          this.view.tbxCountrySearch.setVisibility(false);
        }
        this.view.btnCountryCodeCancel.text = this.getFieldValue(this._cancelButton);
        this.view.lblCountryCodeHeader.text = this.getFieldValue(this._ccsSectionHeader);
        this.view.imgCountryCodeBack.src = this._iconBack;
        this.view.lblCountryCodeNoResults.text = this.getFieldValue(this._cccsNoRecords);
        this.view.tbxCountrySearch.placeholder = this.getFieldValue(this._ccsSearchbox,"placeHolder");
        this.view.imgCountryCodeSearch.src = this.getFieldValue(this._ccsSearchbox,"searchicon");
        this.view.imgCountryCodeCloseIcon.src = this.getFieldValue(this._ccsSearchbox,"clearSearchicon");

      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in setCountryCodeDefaultText method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**     
	 * Component setCountryCodeSkins
     * To bind the default skins for Email Address.
     */
    setCountryCodeSkins : function()
    {
      try{
       
        this.view.flxCountryCodeHeader.skin = this._gsknHeaderFlex;
        this.view.btnCountryCodeCancel.skin = this._gsknCancelBtn;
        this.view.lblCountryCodeHeader.skin = this._gsknHeaderLbl;
        this.view.lblCountryCodeNoResults.skin = this._cccsNoRecordsSkin;
        this.view.tbxCountrySearch.skin = this._ccssSearchBoxSkin;
        this.view.segCountryList.rowFocusSkin = this._ccssResultItemFlexSelected;
        this.view.segCountryList.rowSkin = this._ccssResultItemFlex;
        this.view.flxAlphabetsList.skin = this._ccssSegAlphabetBG;
      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in setCountryCodeSkins method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**     
	 * Component setCountryCodeActions
     * To bind the default Actions for Email Address
     */
    setCountryCodeActions : function()
    {
      try{
        var scope = this;
        scope.view.imgCountryCodeBack.onTouchStart = scope.goBack;
        scope.view.btnCountryCodeCancel.onClick = scope.onBackButtonClick;
        scope.view.tbxCountrySearch.onTextChange = function(){
          var searchedKey = scope.view.flxCountryCodeHeader.flxCountryCodeSearch.flxCountryCodeContents.tbxCountrySearch.text;
          if(searchedKey.length >0)
          {
            scope.setCountryCodeSegmentData(scope.getSearchResults(scope.countriesList, searchedKey));
          }
          else
          {
            scope.setCountryCodeSegmentData(scope.countriesList);
          }
        };
        scope.view.imgCountryCodeCloseIcon.onTouchStart = function(){
          scope.view.tbxCountrySearch.text = "";
          scope.view.imgCountryCodeCloseIcon.setVisibility(false);
          scope.setCountryCodeData();
        };
        scope.view.segCountryList.onRowClick = function(){
          var selectedCountryCode = scope.view.segCountryList.selectedRowItems;
          scope[scope._inputValuesPool][scope.getFieldValue(scope._phnoTxtbox1, "inputPoolKey")] = selectedCountryCode[0].code.replace(/\s/g, "");

          scope.setPhoneNumber();
          scope.goBack();
        };
        scope.view.segCountryAlphabet.onRowClick = function()
        {
          var selectedCodeNo = scope.view.segCountryAlphabet.selectedRowItems;
          if(selectedCodeNo !== null){
            var contentOffsetY=0;
            for(var i=0;scope.countriesList[i].name[0]!==selectedCodeNo[0].alphabet;i++){
              contentOffsetY=contentOffsetY+52;
            }
            scope.view.flxCountryList.setContentOffset({x:0,y:contentOffsetY});
          }
        }
        scope.view.forceLayout();
      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in setCountryCodeActions method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        scope.onError(errObj);
      } 
    },

    /**     
	 * Component setCountryCodeData
     * To bind the default Actions for Country code
     */
    setCountryCodeData : function()
    {
    
      var data = this._ccsCountryListMasterData["countries"];
      this.view.imgCountryCodeCloseIcon.setVisibility(false);
      this.countriesList = data;
      this.setCountryCodeSegmentData(data);
      this.view.forceLayout();
    },

    /**     
	 * Component setCountryCodeSegmentData
     * set the data for Country code
     */
    setCountryCodeSegmentData : function(data)
    {
      try{
        
        var alphabetsArray = [];
        if(!this.isEmptyNullUndefined(data) && data.length>0)
        {
          for(var i=0;i<data.length;i++)
          {
            data[i].countryname = data[i].name + "  ( " + data[i].code + " )";
            if(!JSON.stringify(alphabetsArray).includes(data[i].name[0]))
            {
              alphabetsArray.push({"alphabet" : data[i].name[0]});
            }
          }
          var countryCodeMapping = {
            "countryCode" : "code",
            "lblCountryCode" : "countryname"
          };
          var alphabetsMapping = {
            "lblCountryCodeNo" : "alphabet"
          };
          this.view.segCountryList.widgetDataMap = countryCodeMapping;
          this.view.segCountryList.setData(data);
          this.view.segCountryAlphabet.widgetDataMap = alphabetsMapping;
          this.view.segCountryAlphabet.setData(alphabetsArray);
          this.view.flxCountryListContainer.setVisibility(true);
        }
        else
        {
          this.view.flxCountryListContainer.setVisibility(false);
          this.view.flxCountryCodeNoResults.setVisibility(true);
        }
        this.view.forceLayout(); 
      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in setCountryCodeSegmentData method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      } 
    },

    /**     
   * Component setEmailAddress
     * To bind the events,default field properties for Email Address.
     */
    setEmailAddress : function(flow) {
      try {
       
        this.setEmailAddressDefaultText();
        this.setEmailAddressSkins();
        this.setEmailAddressActions(flow);
        this.setEmailAddressData();
        this.view.forceLayout();
      }catch(err) {
        var errObj = {
          "errorInfo" : "Error in setEmailAddress method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**     
   * Component setEmailAddressDefaultText
     * To bind the default text for Email Address
     */
    setEmailAddressDefaultText : function()
    {
      try{
        
        if(this._beneficiaryTypes === "PayAPerson")
        {
          this.view.flxEmailLookup.setVisibility(true);
        }
        else
          this.view.flxEmailLookup.setVisibility(false);
        if(this.isEmptyNullUndefined(this.getFieldValue(this._cancelButton)))
        {
          this.view.btnEmailAddressCancel.setVisibility(false);
        }
        if(this.isEmptyNullUndefined(this.getFieldValue(this._easSectionHeader)))
        {
          this.view.lblEmailAddressHeader.setVisibility(false);
        }
        if(this.isEmptyNullUndefined(this.getFieldValue(this._easSubHeader)))
        {
          this.view.lblEmailAddressDescription.setVisibility(false);
        }
        if(this.isEmptyNullUndefined(this.getFieldValue(this._easCTAButton1)))
        {
          this.view.btnEmailLookup.setVisibility(false);
          this.view.flxEmailLookup.setVisibility(false);
        }
        if(this.isEmptyNullUndefined(this.getFieldValue(this._easOROption)))
        {
          this.view.lblEmailAddressLookup.setVisibility(false);
          this.view.flxEmailLookup.setVisibility(false);
        }
        if(this.isEmptyNullUndefined(this.getFieldValue(this._easCTAButton2)))
        {
          this.view.btnEmailAddressContinue.setVisibility(false);
        }
        this.view.btnEmailAddressCancel.text = this.getFieldValue(this._cancelButton);
        this.view.lblEmailAddressHeader.text = this.getFieldValue(this._easSectionHeader);
        this.view.imgEmailAddressBack.src = this._iconBack;
        this.view.lblEmailAddressDescription.text = this.getFieldValue(this._easSubHeader);
        this.view.btnEmailLookup.text = this.getFieldValue(this._easCTAButton1,"text");
        this.view.lblEmailAddressLookup.text = this.getFieldValue(this._easOROption);
        this.view.btnEmailAddressContinue.text = this.getFieldValue(this._easCTAButton2,"text");
        this.view.lblEmailAddressErrorMsg.text = this.getFieldValue(this._easErrorMessage);
        this.view.txtEmailAddress.maxTextLength = parseInt(this.getFieldValue(this._maxFillMapping)[this._jsonObjName]["txtEmailAddress"]);
        if(!this.isEmptyNullUndefined(this[this._inputValuesPool][this.getFieldValue(this._easTextBoxInput, "inputPoolKey")]))
        {
          this.view.txtEmailAddress.text = this[this._inputValuesPool][this.getFieldValue(this._easTextBoxInput, "inputPoolKey")];
        }
        else
        {
          this.view.txtEmailAddress.text = "";
        }
      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in setEmailAddressDefaultText method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**     
   * Component setEmailAddressSkins
     * To bind the default skins for Email Address.
     */
    setEmailAddressSkins : function()
    {
      try{
       
        this.view.flxEmailAddressHeaderContainer.skin = this._gsknHeaderFlex;
        this.view.btnEmailAddressCancel.skin = this._gsknCancelBtn;
        this.view.lblEmailAddressHeader.skin = this._gsknHeaderLbl;
        this.view.flxEmailAddressSubheader.skin = this._gsknSubHeaderFlex;
        this.view.flxEmailAddressSeperator.skin = this._gsknSubHeaderseparator;
        this.view.lblEmailAddressDescription.skin = this._gsknSubHeaderLabel;
        this.view.btnEmailLookup.skin = this._eassPickEmailSkin;
        this.view.flxEmailAddressLookup.skin = this._eassOROptionFlexSkin;
        this.view.lblEmailAddressLookup.skin = this._eassOROptionLabelSkin;
        this.view.btnEmailAddressContinue.skin = this._gsknPrimaryContexualBtn;
        this.view.lblEmailAddressErrorMsg.skin = this._gsknErrorTextMessage;
      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in setEmailAddressSkins method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**     
   * Component setEmailAddressActions
     * To bind the default Actions for Email Address
     */
    setEmailAddressActions : function(flow)
    {
      try{
        var scope = this;
        scope.view.imgEmailAddressBack.onTouchStart = scope.goBack;
        scope.view.btnEmailAddressCancel.onClick = scope.onBackButtonClick;
        scope.view.btnEmailAddressContinue.onClick = scope.onEmailAddressContinue.bind(this,flow);
        scope.view.txtEmailAddress.onTextChange = scope.setEmailAddressData;
        scope.view.btnEmailLookup.onClick = function(){
          scope.setChooseFromContacts("email"); //email
          scope.navigateTo("flxChooseFromContacts", "flxCfcTop", scope.getFieldValue(scope._cfcSectionHeader));
        };
      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in setEmailAddressActions method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        scope.onError(errObj);
      } 
    },

    /**     
   * Component setEmailAddressData
     * To bind the default Actions for Email Address
     */
    setEmailAddressData : function()
    {
      try{
        
        this.view.lblEmailAddressErrorMsg.setVisibility(false);
        this.view.txtEmailAddress.skin.skin = this._gsknTextBoxNormal;
        this.view.txtEmailAddress.focusSkin = this._gsknTextBoxFocus;
        var email = this.view.txtEmailAddress.text;
        var emailJSON = {
          "txtEmailAddress" : email
        };
        var maxlength = this.maxFillValidate(emailJSON); 
        if(Object.keys(maxlength).length === 0 && maxlength.constructor === Object){
          this.enableButton("btnEmailAddressContinue");            
        } else{
          this.disableButton("btnEmailAddressContinue");
        } 
        var minlength = this.minFillValidate(emailJSON);
        if(Object.keys(minlength).length === 0 && minlength.constructor === Object){            
          this.enableButton("btnEmailAddressContinue");            
        } else{
          this.disableButton("btnEmailAddressContinue");
        }
        this.view.forceLayout();
      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in setEmailAddressData method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      } 
    },

    /**     
   * Component onEmailAddressContinue
     * To validate and process to next screen
     */
    onEmailAddressContinue : function(flow)
    {
      try{
        
        this.view.lblEmailAddressErrorMsg.setVisibility(false);
        var email = this.view.txtEmailAddress.text;
        var emailJSON = {
          "txtEmailAddress" : email
        };
        var dataValidator = this.performDataValidation(emailJSON);
        if(Object.keys(dataValidator).length === 0 && dataValidator.constructor === Object)
        {
          this[this._inputValuesPool][this.getFieldValue(this._easTextBoxInput, "inputPoolKey")] = email;
          if(this._beneficiaryTypes === "PayAPerson" && flow !== "EDIT")
          {
            this.setLinkPayee("ADD");
            if(!this.isSingleUser)
              this.navigateTo("flxLinkPayee", "flxLinkPayeeTop", this.getFieldValue(this._linkPayeeSectionTitle));
          }
          else
          {
            this.setVerifyDetails();
            this.navigateTo("flxVerifyDetails", "flxVfsHeaderTop", this.getFieldValue(this._vfsSectionTitle));
          }

        }
        else
        {
          this.view.lblEmailAddressErrorMsg.setVisibility(true);
          this.view.txtEmailAddress.skin = this._gsknTextBoxError;
          this.view.txtEmailAddress.focusSkin = this._gsknTextBoxError;
          this.disableButton("btnEmailAddressContinue");
        }
        this.view.forceLayout();
      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in onEmailAddressContinue method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      } 
    },

    /**     
   * Component setPayeeNickname
     * To bind the events,default field properties for Nickname
     */
    setPayeeNickname : function() {
      try {
       
        this.setPayeeNicknameDefaultText();
        this.setPayeeNicknameSkins();
        this.setPayeeNicknameActions();
        this.setPayeeNicknameData();
        this.view.forceLayout();
      }catch(err) {
        var errObj = {
          "errorInfo" : "Error in setPayeeNickname method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**     
   * Component setPayeeNicknameDefaultText
     * To bind the default text for Nickanme
     */
    setPayeeNicknameDefaultText : function()
    {
      try{
     
        if(this.isEmptyNullUndefined(this.getFieldValue(this._cancelButton)))
        {
          this.view.btnNicknameCancel.setVisibility(false);
        }
        if(this.isEmptyNullUndefined(this.getFieldValue(this._annSectionHeader)))
        {
          this.view.lblPnsSectionHeader.setVisibility(false);
        }
        if(this.isEmptyNullUndefined(this.getFieldValue(this._annSubHeader)))
        {
          this.view.lblPnsSubHeader.setVisibility(false);
        }
        if(this.isEmptyNullUndefined(this.getFieldValue(this._annCTAButton)))
        {
          this.view.btnNicknameContinue.setVisibility(false);
        }
        this.view.btnNicknameCancel.text = this.getFieldValue(this._cancelButton);
        this.view.lblPnsSectionHeader.text = this.getFieldValue(this._annSectionHeader);
        this.view.imgNicknameBack.src = this._iconBack;
        this.view.lblPnsSubHeader.text = this.getFieldValue(this._annSubHeader);
        this.view.btnNicknameContinue.text = this.getFieldValue(this._annCTAButton,"text");
        this.view.txtNickName.maxTextLength = parseInt(this.getFieldValue(this._maxFillMapping)[this._jsonObjName]["txtNickName"]);
        if(!this.isEmptyNullUndefined(this[this._inputValuesPool][this.getFieldValue(this._annTextbox, "inputPoolKey")]))
        {
          this.view.txtNickName.text = this[this._inputValuesPool][this.getFieldValue(this._annTextbox, "inputPoolKey")];
        }
        else
        {
          this.view.txtNickName.text = "";
        }
      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in setPayeeNicknameDefaultText method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**     
   * Component setPayeeNicknameSkins
     * To bind the default skins for payee Nickaname
     */
    setPayeeNicknameSkins : function()
    {
      try{
        
        this.view.flxNicknameSectionHeader.skin = this._gsknHeaderFlex;
        this.view.btnNicknameCancel.skin = this._gsknCancelBtn;
        this.view.lblPnsSectionHeader.skin = this._gsknHeaderLbl;
        this.view.flxNicknameSubheader.skin = this._gsknSubHeaderFlex;
        this.view.flxSubHeaderSeperator.skin = this._gsknSubHeaderseparator;
        this.view.lblPnsSubHeader.skin =this._gsknSubHeaderLabel;
        this.view.btnNicknameContinue.skin = this._gsknPrimaryContexualBtn;
        this.view.txtNickName.skin = this._gsknTextBoxNormal;
        this.view.txtNickName.focusSkin = this._gsknTextBoxFocus;
      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in setPayeeNicknameSkins method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**     
   * Component setPayeeNicknameActions
     * To bind the default Actions for Nickname
     */
    setPayeeNicknameActions : function()
    {
      try{
        var scope = this;
        scope.view.imgNicknameBack.onTouchStart = scope.goBack;
        scope.view.btnNicknameCancel.onClick = scope.onBackButtonClick;
        scope.view.btnNicknameContinue.onClick = scope.onPayeeNicknameContinue;
        scope.view.txtNickName.onTextChange = scope.setPayeeNicknameData;
      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in setPayeeNicknameActions method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        scope.onError(errObj);
      } 
    },

    /**     
   * Component setPayeeNicknameData
     * To bind the default Actions for Nickname
     */
    setPayeeNicknameData : function()
    {
      try{
       
        this.view.txtNickName.skin = this._gsknTextBoxNormal;
        this.view.txtNickName.focusSkin = this._gsknTextBoxFocus;
        this.view.lblPayeeNicknameError.setVisibility(false);
        var nick = this.view.txtNickName.text;
        var nickJSON = {
          "txtNickName" : nick
        };
        var minlength = this.minFillValidate(nickJSON);
        var maxlength = this.maxFillValidate(nickJSON); 
        if(Object.keys(minlength).length === 0 && minlength.constructor === Object && Object.keys(maxlength).length === 0 && maxlength.constructor === Object){  
          this.enableButton("btnNicknameContinue");            
        } else{
          this.disableButton("btnNicknameContinue");
        }
        this.view.forceLayout();
      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in setPayeeNicknameData method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      } 
    },

    /**     
   * Component onPayeeNicknameContinue
     * To validate and process to next screen
     */
    onPayeeNicknameContinue : function()
    {
      try{
       
        var payeeNickName = {
          "txtNickName":this.view.txtNickName.text
        };
        var payeeNickNameInput=this.performDataValidation(payeeNickName);
        if(Object.keys(payeeNickNameInput).length === 0 && payeeNickNameInput.constructor === Object){
          this.view.txtNickName.skin = this._gsknTextBoxNormal;
          this.view.txtNickName.focusSkin = this._gsknTextBoxFocus;
          this.view.lblPayeeNicknameError.setVisibility(false);
          this[this._inputValuesPool][this.getFieldValue(this._annTextbox, "inputPoolKey")] = this.view.txtNickName.text;
          this.setVerifyDetails();
          this.navigateTo("flxVerifyDetails", "flxVfsHeaderTop", this.getFieldValue(this._vfsSectionTitle));             
        }
        else{
          this.view.lblPayeeNicknameError.text = "Please enter a valid Nickname";
          this.view.txtNickName.skin = this._gsknTextBoxError;
          this.view.txtNickName.focusSkin = this._gsknTextBoxError;
          this.view.lblPayeeNicknameError.setVisibility(true);	
          this.disableButton("btnNicknameContinue");
        }
       this.view.forceLayout(); 
      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in onPayeeNicknameContinue method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      } 
    },

    /**     
   * Component setChooseFromContacts
     * To bind the events,default field properties for Country Code
     * * @param {string} flow denotes the edit flow or add flow
     */
    setChooseFromContacts : function(flow) {
      try {
        
        this.setChooseFromContactsDefaultText();
        this.setChooseFromContactsSkins();
        this.setChooseFromContactsActions(flow);
        this.setChooseFromContactsData(flow);
        this.view.forceLayout();
      }catch(err) {
        var errObj = {
          "errorInfo" : "Error in setChooseFromContacts method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**     
   * Component setChooseFromContactsDefaultText
     * To bind the default text for Email Address
     */
    setChooseFromContactsDefaultText : function()
    {
      try{
       
        if(this.isEmptyNullUndefined(this.getFieldValue(this._cancelButton)))
        {
          this.view.btnCfcCancel.setVisibility(false);
        }
        if(this.isEmptyNullUndefined(this.getFieldValue(this._cfcSectionHeader)))
        {
          this.view.lblCfcHeaderLabel.setVisibility(false);
        }
        if(this.isEmptyNullUndefined(this.getFieldValue(this._cfcSearchbox)))
        {
          this.view.tbxPickContactsSearch.setVisibility(false);
        }
        this.view.btnCfcCancel.text = this.getFieldValue(this._cancelButton);
        this.view.lblCfcHeaderLabel.text = this.getFieldValue(this._cfcSectionHeader);
        this.view.imgCfcBack.src = this._iconBack;
        this.view.lblCfcNoResults.text = this.getFieldValue(this._cfcsNoRecords);
        this.view.tbxPickContactsSearch.placeholder = this.getFieldValue(this._cfcSearchbox,"placeHolder");
        this.view.imgCfcSearch.src = this.getFieldValue(this._cfcSearchbox,"searchicon");
        this.view.imgCfcSearchBoxClose.src = this.getFieldValue(this._cfcSearchbox,"clearSearchicon");

      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in setChooseFromContactsDefaultText method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**     
   * Component setChooseFromContactsSkins
     * To bind the default skins for Email Address.
     */
    setChooseFromContactsSkins : function()
    {
      try{
        
        this.view.flxcfcHeader.skin = this._gsknHeaderFlex;
        this.view.btnCfcCancel.skin = this._gsknCancelBtn;
        this.view.lblCfcHeaderLabel.skin = this._gsknHeaderLbl;
        this.view.lblCfcNoResults.skin = this._cfcssNoRecordsSkin;
        this.view.tbxPickContactsSearch.skin = this._cfcssSearchBoxSkin;
        this.view.segCfcContactsList.rowFocusSkin = this._cfcssResultItemFlexSelected;
        this.view.segCfcAlphabetsList.rowSkin = this._cfcssResultItemFlex;
        this.view.flxCfcAlphbetsList.skin = this._cfcssSegAlphabetBG;
      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in setChooseFromContactsSkins method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**     
   * Component setChooseFromContactsActions
     * To bind the default Actions for Email Address
     */
    setChooseFromContactsActions : function(flow)
    {
      try{
        var scope = this;
        scope.view.imgCfcBack.onTouchStart = scope.goBack;
        scope.view.btnCfcCancel.onClick = scope.onBackButtonClick;
        scope.view.tbxPickContactsSearch.onTextChange = function(){
          var searchedKey = scope.view.flxcfcHeader.flxCfcSearch.flxCfcSearchContents.tbxPickContactsSearch.text;
          if(searchedKey.length > 0)
          {
            scope.setChooseFromContactsSegmentData(scope.getSearchResults(scope.contactsListBackup, searchedKey),flow);
          }
          else
          {
            scope.setChooseFromContactsSegmentData(scope.contactsListBackup,flow);
          }
        };
        scope.view.imgCfcSearchBoxClose.onTouchStart = function(){
          scope.view.tbxPickContactsSearch.text = "";
          scope.view.imgCfcSearchBoxClose.setVisibility(false);
          scope.setChooseFromContactsSegmentData(scope.contactsListBackup,flow);
        };
        scope.view.segCfcContactsList.onRowClick = function(){
          var selectedContact = scope.view.segCfcContactsList.selectedRowItems;
          if(flow === "phone")
          {
            scope[scope._inputValuesPool][scope.getFieldValue(scope._phnoTxtbox2, "inputPoolKey")] = selectedContact[0].id.replace(/\s/g, "");
            scope.keypadString = selectedContact[0].id.replace(/\s/g, "");
            scope.setPhoneNumber();
            scope.goBack();
          }
          else
          {
            scope[scope._inputValuesPool][scope.getFieldValue(scope._easTextBoxInput, "inputPoolKey")] = selectedContact[0].id.replace(/\s/g, "");
            scope.setEmailAddress(); 
            scope.goBack();	
          }
        };
        scope.view.segCfcAlphabetsList.onRowClick = function()
        {
          var selectedCodeNo = scope.view.segCfcAlphabetsList.selectedRowItems;
          if(selectedCodeNo !== null){
            var contentOffsetY=0;
            for(var i=0;scope.contactsList[i].contactName[0]!==selectedCodeNo[0].alphabet;i++){
              contentOffsetY=contentOffsetY+52;
            }
            scope.view.flxCfcContactsList.setContentOffset({x:0,y:contentOffsetY});
          }
        }
        scope.view.forceLayout();
      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in setChooseFromContactsActions method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        scope.onError(errObj);
      } 
    },

    /**     
   * Component setChooseFromContactsData
     * To bind the default Actions for Country code
     */
    setChooseFromContactsData : function(flow)
    {
     
      var data = kony.contact.find("*", true);
      this.view.imgCountryCodeCloseIcon.setVisibility(false);
      this.contactsList = data;this.contactsListBackup = data;
      this.setChooseFromContactsSegmentData(data,flow);
      this.view.forceLayout();
    },

    /**     
   * Component setChooseFromContactsSegmentData
     * set the data for Country code
     */
    setChooseFromContactsSegmentData : function(data,flow)
    {
      try{
        
        var alphabetsArray = [] , contactsArray = [];
        var id = (flow === "phone") ? "number" : "id";
        if(!this.isEmptyNullUndefined(data) && data.length>0)
        {
          for(var i=0;i<data.length;i++)
          {
            if(!this.isEmptyNullUndefined(data[i][[flow]]) && data[i][[flow]].length>0)
            {
              data[i].contactName = data[i].displayname[0].toUpperCase()+data[i].displayname.slice(1).toLowerCase() + "  ( " + data[i][[flow]][0][[id]] + " )";
              data[i].id = data[i][[flow]][0][[id]];
              if(!JSON.stringify(alphabetsArray).includes(data[i].contactName[0]))
              {
                alphabetsArray.push({"alphabet" : data[i].contactName[0]});
              }
              contactsArray.push(data[i]);
            }
          }
          var contactsMapping = {
            "contact" : "id",
            "lblCountryCode" : "contactName"
          };
          var alphabetsMapping = {
            "lblCountryCodeNo" : "alphabet"
          };
          this.view.segCfcContactsList.widgetDataMap = contactsMapping;
          this.view.segCfcContactsList.setData(contactsArray);
          this.view.segCfcAlphabetsList.widgetDataMap = alphabetsMapping;
          this.view.segCfcAlphabetsList.setData(alphabetsArray);
          this.contactsList = contactsArray;
          this.view.flxCfcContactsSegList.setVisibility(true);
        }
        else
        {
          this.view.flxCfcContactsSegList.setVisibility(false);
          this.view.flxCfcNoResults.setVisibility(true);
        }
        this.view.forceLayout(); 
      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in setChooseFromContactsSegmentData method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      } 
    },

    /**
   ** Component navigateTo
   * Using navigateTo we navigate one form to another form in that we store formName in a stack
   * @param {string} flxName , navigates to that form.
   * @param {string} flxHeaderName , Custom Header name.
   * @param {string} headerTitle , Header title.
   */
    navigateTo: function(flxName, flxHeaderName, headerTitle) {
      try {
        
        if(flxName) {
          this.stack.push(flxName);
          var stackLength = this.stack.length;
          var nextScreen = this.stack[stackLength - 1];
          var currentScreen = this.stack[stackLength - 2];
          if(!this.isEmptyNullUndefined(flxHeaderName)) {
            this.setHeaderProperties(flxHeaderName);
          }
          if(currentScreen!=null && currentScreen!=undefined){
            this.view[currentScreen].setVisibility(false);
          }          
          this.view[nextScreen].setVisibility(true);
          if(kony.os.deviceInfo().name === "iPhone" && !this.isEmptyNullUndefined(headerTitle)) {
            this.headerTitleStack.push(headerTitle);
            var properties ={
              "stack" : this.stack,
              "headerTitle": headerTitle,
              "cancelText" : !this.isEmptyNullUndefined(this.getFieldValue(this._cancelButton)) ? this.getFieldValue(this._cancelButton) : "",
              "backButtonImage" : this.getFieldValue(this._iconBack)
            }
            this.iPhoneHeaderProps(properties);
          }
          this.view.forceLayout();
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in navigateTo method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
   * Using goBack we navigates to previous form from the current form
   * @param {string} navDetails , which contains all the details about current form
   */
    goBack: function() {
      try{
       
        var stackLength = this.stack.length;
        var currentScreen = this.stack[stackLength - 1];
        var previousScreen = this.stack[stackLength - 2];
        if(previousScreen === "flxAccountNumber")
        {
          this.flxNameAccountNumberScreen = "flxAccountNumberInput";
        }
        this.view[previousScreen].setVisibility(true);
        this.view[currentScreen].setVisibility(false);
        this.stack.pop();
        if(kony.os.deviceInfo().name === "iPhone") {
          this.headerTitleStack.pop();
          var nativeTitle = this.headerTitleStack[this.headerTitleStack.length - 1];
          var properties ={
            "stack" : this.stack,
            "headerTitle": nativeTitle,
            "cancelText" : !this.isEmptyNullUndefined(this.getFieldValue(this._cancelButton)) ? this.getFieldValue(this._cancelButton) : "",
            "backButtonImage" : this.getFieldValue(this._iconBack)
          }
          this.iPhoneHeaderProps(properties);
        }
        this.view.forceLayout();
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in goBack method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component setContactNumberKeyboardChar.
     * To append keypad string to the label.
     */
    setContactNumberKeyboardChar: function(char) {
      try {
        
        this.ContactNumberkeypadString = this.ContactNumberkeypadString + char;
        this.view.lblMobileNumber.text = this.ContactNumberkeypadString;
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in setContactNumberKeyboardChar method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component onContactNumberKeyboardDone.
     * To set the visbility of Number keypad.
     */
    onContactNumberKeyboardDone: function() {
      try {
       
        var length = this.getFieldValue(this.txtInputMobileNumber, "length");
        var minlength = length["min"], maxlength = length["max"];
        var phoneNumber = this.view.lblMobileNumber.text;
        var placeholder = this.getFieldValue(this._txtInputMobileNumber, "placeHolder");
        var email = this.view.txtContactTypeEmail.text;
        this.view.flxContactTypeNumberKeypad.setVisibility(false);
        this.view.flxMobileNumber.skin = this.getFieldValue(this._sknFlexNormal);
        if(this.view.lblMobileNumber.text.length > minlength && this.view.lblMobileNumber.text.length < maxlength && phoneNumber !== placeholder) {
          this.enableButton("btnContactTypeContinue");
          this.view.txtContactTypeEmail.setEnabled(false);
        } else {
          if(this.view.lblMobileNumber.text.length === 0) {
            this.view.lblMobileNumber.text = placeholder;
            this.view.txtContactTypeEmail.setEnabled(true);
            this.disableButton("btnContactTypeContinue");
          } else {
            this.view.txtContactTypeEmail.setEnabled(false);
          }
        }
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in onContactNumberKeyboardDone method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component clearContactNumberKeypadChar.
     * To Clear last character of entered digits.
     */
    clearContactNumberKeypadChar: function() {
      try {
       
        if(this.ContactNumberkeypadString.length >= 1)
        {
          this.ContactNumberkeypadString = this.ContactNumberkeypadString.substr(0, this.ContactNumberkeypadString.length - 1);
        }
        this.view.lblMobileNumber.text = this.ContactNumberkeypadString;
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in clearContactNumberKeypadChar method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component onContactNumberTouch.
     * set the visibility of contact number keypad.
     */
    onContactNumberTouch: function(){
      try {
       
        this.view.flxContactTypeNumberKeypad.setVisibility(true);
        this.view.flxMobileNumber.skin = this.getFieldValue(this._sknHighlightedFlex);
        this.view.flxContactType.forceLayout();
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in onContactNumberTouch method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component onContactEmailTextChange.
     * Email Vaidation.
     */
    onContactEmailTextChange: function() {
      try{
      
        this.view.lblEmailErrorMsg.setVisibility(false);
        this.view.txtContactTypeEmail.skin = this.getFieldValue(this._sknInputBoxBorder); 
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in onContactEmailTextChange method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component onContactTypeEmailDone.
     * Email Vaidation.
     */
    onContactTypeEmailDone: function() {
      try {
       
        var email = this.view.txtContactTypeEmail.text;
        var phoneNumber = this.view.lblMobileNumber.text;
        var placeholder = this.getFieldValue(this._txtInputMobileNumber, "placeHolder");
        if(!this.isEmptyNullUndefined(email)) {
          if(this.validationUtilManager.isValidEmail(email)) {
            this.view.txtContactTypeEmail.skin = this.getFieldValue(this._textBoxNormalSkin);
            this.enableButton("btnContactTypeContinue");
          } else {
            this.view.lblEmailErrorMsg.setVisibility(true);
            this.view.txtContactTypeEmail.skin = this.getFieldValue(this._textBoxErrorSkin);
            this.disableButton("btnContactTypeContinue");
          }
          this.view.flxMobileNumber.setEnabled(false);
          this.view.flxFlagAndCodeContainer.setEnabled(false);
        } 
        else {
          this.view.flxMobileNumber.setEnabled(true);
          this.view.flxFlagAndCodeContainer.setEnabled(true);
          this.enableButton("btnContactTypeContinue");
        }
      }  catch(err) {
        var errObj = {
          "errorInfo" : "Error in onContactTypeEmailDone method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**
    * component contactType
    **/
    setContactType: function(flow){
     
      this.setContactTypeDefaultText();
      this.setContactTypeSkins();
      this.setContactTypeActions();
      this.setContactTypeData(flow);
    },
    /*
    * component setContactTypeDefaultText
    * Setting default text for Contact Type Screen
    */
    setContactTypeDefaultText: function(){
     
      this.view.imgContactTypeBack.src = this.getFieldValue(this._iconBack);
      this.view.btnContactTypeCancel.text = this.getFieldValue(this._cancelButton);
      this.view.lblContactTypeSectionHeader.text = this.getFieldValue(this._ctsSectionHeader);

    },
    /*
    * component setContactTypeSkins
    * Setting default skins for Contact Type Screen
    */
    setContactTypeSkins: function(){
     
      this.view.flxContactTypeHeader.skin = this.getFieldValue(this._gsknHeaderFlex);
      this.view.btnContactTypeCancel.skin = this.getFieldValue(this._gsknCancelBtn);
      this.view.lblContactTypeSectionHeader.skin = this.getFieldValue(this._gsknHeaderLbl);
    },
    /*
    * component setContactTypeActions
    * Setting default actions for Contact Type Screen
    */
    setContactTypeActions: function(){
      var scope = this;
      scope.view.btnContactTypeCancel.isVisible = !scope.isEmptyNullUndefined(scope.getFieldValue(scope._cancelButton)) ? true : false;  
      scope.view.flxContactTypeBack.onTouchEnd = scope.goBack;
      scope.view.btnContactTypeCancel.onClick = scope.onBackButtonClick;
    },
    /*
    * component setContactTypeData
    * Data actions for Contact Type Screen
    */
    setContactTypeData: function(flow){
      var scope = this;
      var contactTypeOptions = scope.getFieldValue(scope._ctsValues);   
      var contactTypeOptionsArray = (contactTypeOptions.optionValues).split(',');
      scope.contactFlowType = flow;
      for(var i = 0; i < contactTypeOptionsArray.length; i++) {
        contactTypeOptionsArray[i] = contactTypeOptionsArray[i].replace(/^\s*/, "").replace(/\s*$/, "");
        contactTypeOptionsArray[i] = kony.i18n.getLocalizedString(contactTypeOptionsArray[i]);
      }
      var contactTypeList=[];
      for(var i = 0; i < contactTypeOptionsArray.length;i++){
        var contactTypeArray={};
        contactTypeArray["lblContactType"] = {
          "skin" : scope._ctsContactTypeSkn,
          "text": contactTypeOptionsArray[i]
        }
        if(scope.inputPool[scope.getFieldValue(scope._ctsValues,"inputPoolKey")] !=null && scope.inputPool[scope.getFieldValue(scope._ctsValues,"inputPoolKey")]  != undefined && scope.inputPool[scope.getFieldValue(scope._ctsValues,"inputPoolKey")]  == contactTypeOptionsArray[i])
        {
          contactTypeArray["flxContactTypeMain"] = {
            "skin" : scope._ctsContactSelectionSkn      
          }
        }else{
          contactTypeArray["flxContactTypeMain"] = {
            "skin" : ""
          }
        }
        contactTypeList.push(contactTypeArray);          
      };  
      var widgetMap = {
        "flxContactTypeMain":"flxContactTypeMain",
        "lblContactType":"lblContactType"
      };
      scope.view.segContactType.widgetDataMap = widgetMap;
      scope.view.segContactType.setData(contactTypeList);
      var selectedContactType = scope.view.segContactType.onRowClick = scope.onContactTypeSelection;
      scope.view.flxContactTypeMainContainer.forceLayout();
      if(selectedContactType != "")
      {
        return selectedContactType;
      }        
    },
    /**
     * Component onContactTypeSelection
     * function to invoke on contact type row selection
     */
    onContactTypeSelection: function(){
      
      var segmentData = JSON.parse(JSON.stringify(this.view.segContactType.data));
      var selectedData = this.view.segContactType.selectedRowItems;   
      var selectedRow = this.view.segContactType.selectedRowIndex[1];            
      for(var i=0; i<segmentData.length; i++){         
        segmentData[i]["flxContactTypeMain"] = {
          "skin" :""            
        };                    
      }
      selectedData[0]["flxContactTypeMain"] = {
        "skin" :  this._ctsContactSelectionSkn              
      };
      this.view.segContactType.setData(segmentData);       
      this.view.segContactType.setDataAt(selectedData[0], selectedRow);   
      this.contactType = selectedData[0].lblContactType.text;
      if(!kony.sdk.isNullOrUndefined(this.contactType) && this.contactType !== "") {
        this.inputPool[this.getFieldValue(this._ctsValues,"inputPoolKey")] = this.contactType;
      }
      if(this.contactFlowType === "ADD"){
        if(this.contactType === kony.i18n.getLocalizedString("i18n.payments.P2pPhoneNumber")){
          this.setPhoneNumber();
          this.navigateTo("flxPhoneNumber", "flxPhoneNumberTop", this.getFieldValue(this._phnoSectionHeader));
        }
        if(this.contactType === kony.i18n.getLocalizedString("i18n.login.CantSignIn.EmailAddress")){
          this.setEmailAddress();
          this.navigateTo("flxEmailAddress", "flxEmailAddressTop", this.getFieldValue(this._easSectionHeader));
        }
        if(this.contactType === kony.i18n.getLocalizedString("i18n.payments.nationalID")){
          this.setNationalID("ADD");
          this.navigateTo("flxNationalID", "flxNationalIDTop", this.getFieldValue(this._nisSectionHeader));
        }
      }else{
        this.setVerifyDetails();
        this.navigateTo("flxVerifyDetails", "flxVfsHeaderTop", this.getFieldValue(this._vfsSectionTitle));
      }
    },
    /**
     * Component setNationalID
     */
    setNationalID: function(flow){
     
      if(flow === "ADD")
      {
        this.setNationalIDDefaultText();
        this.setNationalIDSkins();
        this.setNationalIDActions();
        this.setNationalIDData(flow)
      }
      else
      {
        this.setNationalIDData(flow); 
      }
    },
    /*
    * component setNationalIDDefaultText
    * Setting default text for National ID Screen
    */
    setNationalIDDefaultText: function(){
     
      this.view.imgNationalIDBack.src = this.getFieldValue(this._iconBack);
      this.view.btnNationalIDCancel.text = this.getFieldValue(this._cancelButton);
      this.view.lblNationalIDSectionHeader.text = this.getFieldValue(this._nisSectionHeader);	
      this.view.lblNationalIDSubHeader.text = this.getFieldValue(this._nisSubHeader);
      this.view.btnNationalIDContinue.text = this.getFieldValue(this._nisCTAButton, "text");
      this.view.txtNationalID.placeholder = this.getFieldValue(this._nisTextBoxInput, "placeHolder"); 
      this.view.txtNationalID.textInputMode = this.getFieldValue(this._nisTextBoxInput, "inputMode"); 
      this.view.txtNationalID.maxTextLength = parseInt(this.getFieldValue(this._maxFillMapping)[this._jsonObjName]["txtBoxNationalID"]); 
    },
    /*
    * component setNationalIDSkins
    * Setting default skins for NationalID Screen
    */
    setNationalIDSkins: function(){
      
      this.view.flxNationalIDHeader.skin = this.getFieldValue(this._gsknHeaderFlex);
      this.view.btnNationalIDCancel.skin = this.getFieldValue(this._gsknCancelBtn);
      this.view.lblNationalIDSectionHeader.skin = this.getFieldValue(this._gsknHeaderLbl);
      this.view.lblNationalIDSubHeader.skin = this.getFieldValue(this._gsknSubHeaderTitle);
      this.view.flxNationalIDSeparator.skin = this.getFieldValue(this._gsknSubHeaderseparator);
      this.view.lblNationalIDErrorMsg.skin = this.getFieldValue(this._gsknErrorTextMessage);
      this.view.txtNationalID.skin = this.getFieldValue(this._gsknTextBoxNormal);
      this.view.txtNationalID.focusSkin = this.getFieldValue(this._gsknTextBoxFocus);            
      this.view.btnNationalIDContinue.skin =this.getFieldValue(this._gsknPrimaryContexualBtn);
    },
    /*
    * component setNationalIDActions
    * Setting default actions for NationalID Screen
    */
    setNationalIDActions: function(){
      var scope = this;
      scope.view.btnNationalIDCancel.isVisible = !scope.isEmptyNullUndefined(scope.getFieldValue(scope._cancelButton)) ? true : false;  
      scope.view.btnNationalIDContinue.onClick = scope.nationalIDInputValidation;
      scope.view.flxNationalIDBack.onTouchEnd = scope.goBack;
      scope.view.txtNationalID.onTextChange = scope.onNationalIDTextChange;
      scope.view.btnNationalIDCancel.onClick = scope.onBackButtonClick;
    },
    /* component setNationalIDData
    * Data actions for NationalID Screen
    */
    setNationalIDData: function(flow){
      
      if(flow === "EDIT"){
        this.view.txtNationalID.text = this.getFieldValue(this._nisTextBoxInput, "value");
        var nationalIDEntered={
          "txtBoxNationalID":  this.getFieldValue(this._nisTextBoxInput, "value")
        }; 
        var minlength = this.minFillValidate(nationalIDEntered);
        var maxlength = this.maxFillValidate(nationalIDEntered); 
        if(Object.keys(minlength).length === 0 && minlength.constructor === Object && Object.keys(maxlength).length === 0 && maxlength.constructor === Object){
          this.enableButton("btnNationalIDContinue");            
        } else{
          this.disableButton("btnNationalIDContinue");
        }        
      }else{
        this.view.txtNationalID.text = '';
        this.disableButton("btnNationalIDContinue");
      }
    },
    /*
    * component onNationalIDTextChange
    * onTextChange actions
    */
    onNationalIDTextChange: function(){
      try{
       
        this.view.txtNationalID.skin = this._gsknTextBoxNormal;
        this.view.txtNationalID.focusSkin = this._gsknTextBoxFocus;
        this.nationalIDText = this.view.txtNationalID.text;
        this.nationalIDText = this.nationalIDText.replace(/ /g,'');
        var nationalIDEntered={
          "txtBoxNationalID":  this.nationalIDText
        }; 
        var minlength = this.minFillValidate(nationalIDEntered);
        var maxlength = this.maxFillValidate(nationalIDEntered); 
        if(Object.keys(minlength).length === 0 && minlength.constructor === Object && Object.keys(maxlength).length === 0 && maxlength.constructor === Object){
          this.enableButton("btnNationalIDContinue");            
        } else{
          this.disableButton("btnNationalIDContinue");
        }        
        var formattedResult = '';
        var valueEntered = this.view.txtNationalID.text;
        valueEntered  = valueEntered .toUpperCase();
        valueEntered  = valueEntered .replace(/\s/g, '');
        for(var i = 0; i < valueEntered .length; i++) {
          if(i%4 == 0 && i > 0) formattedResult = formattedResult.concat(' ');
          formattedResult = formattedResult.concat(valueEntered [i]);
        }
        this.view.txtNationalID.text = formattedResult;                
        this.view.lblNationalIDErrorMsg.setVisibility(false)
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in onNationalIDTextChange method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**
     * Component nationalIDInputValidation
     * To validate the inputs and show error then continue to next screen if all the inputs are valid
     */
    nationalIDInputValidation: function(){
     
      var dataJSON = {
        "txtBoxNationalID": this.nationalIDText
      }; 
      var dataValidator = this.performDataValidation(dataJSON);
      if(Object.keys(dataValidator).length === 0 && dataValidator.constructor === Object){
        this.resetNationalIDErrors();    
        this.onNationalIDContinue();
      }
      else{
        this.setNationalIDErrors(dataValidator);  
      }
    },
    /**
     * Component resetNationalIDErrors
     * Reponsible to reset textbox skin
     */
    resetNationalIDErrors: function(){
      try{
        this.view.txtNationalID.skin = this._gsknTextBoxNormal;
        this.view.txtNationalID.focusSkin = this._gsknTextBoxFocus;
        this.view.lblNationalIDErrorMsg.setVisibility(false);
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in resetNationalIDErrors method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**
     * @api : setNationalIDErrors
     * displays errors on validation of the fields in national ID screen.
     * @return : NA
     */
    setNationalIDErrors: function(dvfError) {
      this.resetNationalIDErrors();
      for(var iterator in dvfError){
        if("txtBoxNationalID" == iterator){
          this.view.txtNationalID.skin = this._gsknTextBoxError;
          this.view.txtNationalID.focusSkin = this._gsknTextBoxError;
          this.view.lblNationalIDErrorMsg.text = this.getFieldValue(this._nisErrorMessage);
        }
      }         
      this.view.lblNationalIDErrorMsg.setVisibility(true);
    },
    /**
     * Component onNationalIDContinue
     * Navigate to next form based on flow type.
     */
    onNationalIDContinue: function() {
      try {
            
        if(!kony.sdk.isNullOrUndefined(this.view.txtNationalID.text) && this.view.txtNationalID.text !== "") {
          this.inputPool[this.getFieldValue(this._nisTextBoxInput,"inputPoolKey")] = this.view.txtNationalID.text;
        }
        this.setVerifyDetails();
        this.navigateTo("flxVerifyDetails", "flxVfsHeaderTop", this.getFieldValue(this._vfsSectionTitle));
        this.setLinkPayee("ADD");
        if(!this.isSingleUser)
          this.navigateTo("flxLinkPayee", "flxLinkPayeeTop", this.getFieldValue(this._linkPayeeSectionTitle));

      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in onNationalIDContinue method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    /**  
     * Component getProcessedText
     * Pass the text to format util to obtained the processed value.
     * text {string} - value to be processed
     * @return : {string} - processed value
     */
    getProcessedText: function (text) {
      return this.parserUtilsManager.getParsedValue(text);
    },

    /**
     * Component isEmptyNullUndefined
     * Verifies if the value is empty, null or undefined
     * data {string} - value to be verified
     * @return : {boolean} - validity of the value passed
     */
    isEmptyNullUndefined: function (data) {
      if (data === null || data === undefined || data === "") 
        return true;

      return false;
    },

    /**
     * Component setCriteria
     * Update the criteria based on accountType ans filter
     * criteria {string} - value collected from exposed contract
     */
    setCriteria:function(criteria){
      
      try
      {
        //var criteriaObject = JSON.parse(criteria);
        var criteriaObject = JSON.parse(JSON.stringify(criteria));
        for(var key in  criteriaObject){
          criteriaObject[key] = this.getFieldValue(criteriaObject[key]);
        }
        var criteriaJSON = criteria;
        if(typeof(criteria) == "string"){
          criteriaJSON = JSON.parse(criteria);
        }
        for(var key in  criteriaJSON){
          criteriaObject[key] = this.getFieldValue(criteriaJSON[key]);
        }
        this.criteriaObjectValue = criteriaObject;
      }
      catch(err)
      {
        var errorObj = {
          "errorInfo" : "Error in setting the criteria",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.Error(errorObj);
      }
    },
    /**
     * Component getCriteria
     * Parse the criteria from configuration
     * @return : {JSONObject} - jsonvalue for criteria
     */
    getCriteria:function(){
     
      try{
        return this.criteriaObjectValue;
      }
      catch(err)
      {
        var errorObj = {
          "errorInfo" : "Error in returning criteria",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errorObj);
      }
      return "";
    },

    onError: function (response) {
     kony.print(JSON.stringify(response));
    },
    /**  
     * Component failureValidation
     * Responsible to process the failureValidation
     */
    failureValidation : function()
    {
    
      try{
        this.onRequestEnd();
        this.dataProcessorUtility.showToastMessageError(this, kony.i18n.getLocalizedString("kony.error.StandardErrorMessage"));
        this.resetParams();
      }
      catch(err) {
        this.onRequestEnd();
        var errObj = {
          "errorInfo" : "Error in failureValidation method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },
    
     /**  
     * Component IBANOnFailure
     * Responsible to process the IBANOnFailure
     */
    onIBANFailure : function()
    {
    
      try{
        this.onRequestEnd();
        this.dataProcessorUtility.showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.transferEurope.invalidIBAN"));
        this.resetParams();
      }
      catch(err) {
        this.onRequestEnd();
        var errObj = {
          "errorInfo" : "Error in IBANOnFailure method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
        this.onError(errObj);
      }
    },

    /**
     * Component resetParams
     * Responsible to reset the params
     */
    resetParams : function()
    {
     
      this.inputPool["dbpErrCode", ""];
      this.inputPool["dbpErrMsg", ""];
      this.inputPool["message", ""];
      this.inputPool["referenceId", ""];
      this.inputPool["status", ""];
      this.inputPool["accountNumber", ""];
      this.inputPool["IBANCountryCode", ""];
      this.view.forceLayout();
    }
  };
});