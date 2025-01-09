define(['./ParserUtilsManager', './TransferAcknowledgementUtility', './AcknowledgementDAO'],function(ParserUtilsManager, TransferAcknowledgementUtility, AcknowledgementDAO) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {

      //declaration for Object Service Name in the group:TRANSFER MANAGEMENT SERVICE
      this._objectServiceName="";

      //declaration for Breakpoints in the group:COMPONENT CONFIGS
      this._BREAKPTS="";

      //declaration for Payee Type in the group:General
      this._PAYEETYPES="";

      //declaration for Acknowledgement Image in the group:ACKNOWLEDGEMENT FIELDS
      this._ackImg="";

      //declaration for Section1 Title Skin in the group:SKINS
      this._sknSection1Title="";

      //declaration for Address Line1 in the group:ADDRESS
      this._addressLine1="";

      //declaration for Object Name in the group:TRANSFER MANAGEMENT SERVICE
      this._objectName="";

      //declaration for Section Title 1 in the group:ACKNOWLEDGEMENT FIELDS
      this._ackSectionTitle1="";

      //declaration for Payee Type in the group:General
      this._payeeType="";

      //declaration for Acknowledgement Text Skin in the group:SKINS
      this._sknAckText="";

      //declaration for Address Line2 in the group:ADDRESS
      this._addressLine2="";

      //declaration for Operation Name in the group:TRANSFER MANAGEMENT SERVICE
      this._operationName="";

      //declaration for Section Title 2 in the group:ACKNOWLEDGEMENT FIELDS
      this._ackSectionTitle2="";

      //declaration for Reference Number Text Skin in the group:SKINS
      this._sknReferenceNumberText="";

      //declaration for City in the group:ADDRESS
      this._city="";

      //declaration for Criteria in the group:TRANSFER MANAGEMENT SERVICE
      this._criteria="";

      //declaration for Field1 Label in the group:ACKNOWLEDGEMENT FIELDS
      this._field1Label="";

      //declaration for Reference Number Value Skin in the group:SKINS
      this._sknReferenceNumberValue="";

      //declaration for State in the group:ADDRESS
      this._state="";

      //declaration for Service Response Identifier in the group:TRANSFER MANAGEMENT SERVICE
      this._serviceResponseIdentifier="";

      //declaration for Field1 Value in the group:ACKNOWLEDGEMENT FIELDS
      this._field1Value="";

      //declaration for Country in the group:ADDRESS
      this._country="";

      //declaration for Field2 Label in the group:ACKNOWLEDGEMENT FIELDS
      this._field2Label="";

      //declaration for Reference Operation in the group:TRANSFER MANAGEMENT SERVICE
      this._referenceOperation="";

      //declaration for Zip Code in the group:ADDRESS
      this._zipCode="";

      //declaration for Field2 Value in the group:ACKNOWLEDGEMENT FIELDS
      this._field2Value="";

      //declaration for Reference Criteria in the group:TRANSFER MANAGEMENT SERVICE
      this._referenceCriteria="";

      //declaration for Header Visibility in the group:ADDRESS
      this._headerVisibility="";

      //declaration for Field3 Label in the group:ACKNOWLEDGEMENT FIELDS
      this._field3Label="";

      //declaration for Field Label Skin in the group:SKINS
      this._sknFieldLabel="";

      //declaration for Reference Identifier in the group:TRANSFER MANAGEMENT SERVICE
      this._referenceIdentifier="";

      //declaration for Field3 Value in the group:ACKNOWLEDGEMENT FIELDS
      this._field3Value="";

      //declaration for Field Value Skin in the group:SKINS
      this._sknFieldValue="";

      //declaration for Primary Button Skin in the group:SKINS
      this._sknPrimaryButton="";

      //declaration for Field4 Label in the group:ACKNOWLEDGEMENT FIELDS
      this._field4Label="";

      //declaration for Secondary Button Skin in the group:SKINS
      this._sknSecondaryButton="";

      //declaration for Field4 Value in the group:ACKNOWLEDGEMENT FIELDS
      this._field4Value="";

      //declaration for Field5 Label in the group:ACKNOWLEDGEMENT FIELDS
      this._field5Label="";

      //declaration for Primary Button Focus Skin in the group:SKINS
      this._sknFocusPrimaryButton="";

      //declaration for Field5 Value in the group:ACKNOWLEDGEMENT FIELDS
      this._field5Value="";

      //declaration for Secondary Button Focus Skin in the group:SKINS
      this._sknFocusSecondaryButton="";

      //declaration for Field6 Label in the group:ACKNOWLEDGEMENT FIELDS
      this._field6Label="";

      //declaration for Primary Button Hover Skin in the group:SKINS
      this._sknHoverPrimaryButton="";

      //declaration for Field6 Value in the group:ACKNOWLEDGEMENT FIELDS
      this._field6Value="";

      //declaration for Secondary Button Hover Skin in the group:SKINS
      this._sknHoverSecondaryButton="";

      //declaration for Field7 Label in the group:ACKNOWLEDGEMENT FIELDS
      this._field7Label="";

      //declaration for Section2 Title Skin in the group:SKINS
      this._sknSection2Title="";

      //declaration for Field7 Value in the group:ACKNOWLEDGEMENT FIELDS
      this._field7Value="";

      //declaration for Section3 Title Skin in the group:SKINS
      this._sknSection3Title="";

      //declaration for Field8 Label in the group:ACKNOWLEDGEMENT FIELDS
      this._field8Label="";

      //declaration for Field8 Value in the group:ACKNOWLEDGEMENT FIELDS
      this._field8Value="";

      //declaration for Field9 Label in the group:ACKNOWLEDGEMENT FIELDS
      this._field9Label="";

      //declaration for Field9 Value in the group:ACKNOWLEDGEMENT FIELDS
      this._field9Value="";

      //declaration for Field10 Label in the group:ACKNOWLEDGEMENT FIELDS
      this._field10Label="";

      //declaration for Field10 Value in the group:ACKNOWLEDGEMENT FIELDS
      this._field10Value="";

      //declaration for Field11 Label in the group:ACKNOWLEDGEMENT FIELDS
      this._field11Label="";

      //declaration for Field11 Value in the group:ACKNOWLEDGEMENT FIELDS
      this._field11Value="";

      //declaration for Field12 Label in the group:ACKNOWLEDGEMENT FIELDS
      this._field12Label="";

      //declaration for Field12 Value in the group:ACKNOWLEDGEMENT FIELDS
      this._field12Value="";

      //declaration for Field13 Label in the group:ACKNOWLEDGEMENT FIELDS
      this._field13Label="";

      //declaration for Field13 Value in the group:ACKNOWLEDGEMENT FIELDS
      this._field13Value="";

      //declaration for Field14 Label in the group:ACKNOWLEDGEMENT FIELDS
      this._field14Label="";

      //declaration for Field14 Value in the group:ACKNOWLEDGEMENT FIELDS
      this._field14Value="";

      //declaration for Field15 Label in the group:ACKNOWLEDGEMENT FIELDS
      this._field15Label="";

      //declaration for Field15 Value in the group:ACKNOWLEDGEMENT FIELDS
      this._field15Value="";

      //declaration for Field16 Label in the group:ACKNOWLEDGEMENT FIELDS
      this._field16Label="";

      //declaration for Field16 Value in the group:ACKNOWLEDGEMENT FIELDS
      this._field16Value="";

      //declaration for Field17 Label in the group:ACKNOWLEDGEMENT FIELDS
      this._field17Label="";

      //declaration for Field17 Value in the group:ACKNOWLEDGEMENT FIELDS
      this._field17Value="";

      //declaration for Field18 Label in the group:ACKNOWLEDGEMENT FIELDS
      this._field18Label="";

      //declaration for Field18 Value in the group:ACKNOWLEDGEMENT FIELDS
      this._field18Value="";

      //declaration for Field19 Label in the group:ACKNOWLEDGEMENT FIELDS
      this._field19Label="";

      //declaration for Field19 Value in the group:ACKNOWLEDGEMENT FIELDS
      this._field19Value="";

      //declaration for Field20 Label in the group:ACKNOWLEDGEMENT FIELDS
      this._field20Label="";

      //declaration for Field20 Value in the group:ACKNOWLEDGEMENT FIELDS
      this._field20Value="";

      //declaration for Field21 Label in the group:ACKNOWLEDGEMENT FIELDS
      this._field21Label="";

      //declaration for Field21 Value in the group:ACKNOWLEDGEMENT FIELDS
      this._field21Value="";

      //declaration for Field22 Label in the group:ACKNOWLEDGEMENT FIELDS
      this._field22Label="";

      //declaration for Field22 Value in the group:ACKNOWLEDGEMENT FIELDS
      this._field22Value="";

      //declaration for Field23 Label in the group:ACKNOWLEDGEMENT FIELDS
      this._field23Label="";

      //declaration for Field23 Value in the group:ACKNOWLEDGEMENT FIELDS
      this._field23Value="";
      
      //declaration for Field24 Label in the group:ACKNOWLEDGEMENT FIELDS
      this._field24Label="";
      
      //declaration for Field24 Value in the group:ACKNOWLEDGEMENT FIELDS
      this._field24Value="";

      //declaration for Field25 Label in the group:ACKNOWLEDGEMENT FIELDS
      this._field25Label="";

      //declaration for Field25 Value in the group:ACKNOWLEDGEMENT FIELDS
      this._field25Value="";

      //declaration for Field26 Label in the group:ACKNOWLEDGEMENT FIELDS
      this._field26Label="";

      //declaration for Field26 Value in the group:ACKNOWLEDGEMENT FIELDS
      this._field26Value="";

      //declaration for Field27 Label in the group:ACKNOWLEDGEMENT FIELDS
      this._field27Label="";

      //declaration for Field27 Value in the group:ACKNOWLEDGEMENT FIELDS
      this._field27Value="";

      //declaration for Charges Breakdown Label in the group:ACKNOWLEDGEMENT FIELDS
      this._chargesLabel="";

      //declaration for Charge Label1 in the group:ACKNOWLEDGEMENT FIELDS
      this._chargeLabel1="";

      //declaration for Charge Value1 in the group:ACKNOWLEDGEMENT FIELDS
      this._chargeValue1="";

      //declaration for Charge Label2 in the group:ACKNOWLEDGEMENT FIELDS
      this._chargeLabel2="";

      //declaration for Charge Value2 in the group:ACKNOWLEDGEMENT FIELDS
      this._chargeValue2="";

      //declaration for Charge Label3 in the group:ACKNOWLEDGEMENT FIELDS
      this._chargeLabel3="";

      //declaration for Charge Value3 in the group:ACKNOWLEDGEMENT FIELDS
      this._chargeValue3="";

      //declaration for Charge Label4 in the group:ACKNOWLEDGEMENT FIELDS
      this._chargeLabel4="";

      //declaration for Charge Value4 in the group:ACKNOWLEDGEMENT FIELDS
      this._chargeValue4="";

      //declaration for Supporting Documents Label in the group:ACKNOWLEDGEMENT FIELDS
      this._supportingDocsLabel="";

      //declaration for attachedFileList in the group:ACKNOWLEDGEMENT FIELDS
      this._attachedFileList="";


      //declaration for Acknowledgement Text in the group:ACKNOWLEDGEMENT FIELDS
      this._acknowledgementText="";

      //declaration for Reference Number Text in the group:ACKNOWLEDGEMENT FIELDS
      this._referenceNumberText="";

      //declaration for Reference Number Value  in the group:ACKNOWLEDGEMENT FIELDS
      this._referenceNumberValue="";

      //declaration for Button1 in the group:ACKNOWLEDGEMENT FIELDS
      this._button1="";

      //declaration for Button2 in the group:ACKNOWLEDGEMENT FIELDS
      this._button2="";

      //declaration for Button3 in the group:ACKNOWLEDGEMENT FIELDS
      this._button3="";

      //declaration for Button4 in the group:ACKNOWLEDGEMENT FIELDS
      this._button4="";

      //declaration for Section Title 3 in the group:ACKNOWLEDGEMENT FIELDS
      this._ackSectionTitle3="";
      
      //declaration for Row Expanded Skin in the group:Linked Payee Customer List Skins
      this._sknRowExpanded = "";
      
      //declaration for Row Hover Skin in the group:Linked Payee Customer List Skins
      this._sknRowHover = "";
      
      //declaration for Row separator Skin in the group:Linked Payee Customer List Skins
      this._sknRowSeperator = "";
      
      //declaration for Block Title Skin in the group:Linked Payee Customer List Skins
      this._sknBlockTitle = "";
      
      //declaration for User Contracts Label Skin in the group:Linked Payee Customer List Skins
      this._sknUserContractsLabel = "";
      
      //declaration for Contract Customers Label Skin in the group:Linked Payee Customer List Skins
      this._sknContractCustomersLabel = "";
      
      //declaration for Payee Icon Skin in the group:Linked Payee Customer List Skins
      this._sknPayeeIcon = "";
      
      //declaration for Row Icon Skin in the group:Linked Payee Customer List Skins
      this._rowIconSkin = "";
     
      this.formScope = "";
      this.context = {};
      this.payeeTypeContext = "";

      // Contracts property instance variables.
      this.parserUtilsManager = new ParserUtilsManager();
      this.transferAcknowledgementUtility = new TransferAcknowledgementUtility();
      this.acknowledgementDAO = new AcknowledgementDAO();

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
            //setter method for Object Service Name in the group:TRANSFER MANAGEMENT SERVICE
            defineSetter(this, 'objectServiceName', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._objectServiceName = val;
                }
            });
            //getter method for Object Service Name in the group:TRANSFER MANAGEMENT SERVICE
            defineGetter(this, 'objectServiceName', function () {
                return this._objectServiceName;
            });
            //setter method for Breakpoints in the group:COMPONENT CONFIGS
            defineSetter(this, 'BREAKPTS', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._BREAKPTS = val;
                }
            });
            //getter method for Breakpoints in the group:COMPONENT CONFIGS
            defineGetter(this, 'BREAKPTS', function () {
                return this._BREAKPTS;
            });
            //setter method for Payee Type in the group:General
            defineSetter(this, 'PAYEETYPES', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._PAYEETYPES = val;
                }
            });
            //getter method for Payee Type in the group:General
            defineGetter(this, 'PAYEETYPES', function () {
                return this._PAYEETYPES;
            });
            //setter method for Acknowledgement Image in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'ackImg', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._ackImg = val;
                }
            });
            //getter method for Acknowledgement Image in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'ackImg', function () {
                return this._ackImg;
            });
            //setter method for Section1 Title Skin in the group:SKINS
            defineSetter(this, 'sknSection1Title', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._sknSection1Title = val;
                }
            });
            //getter method for Section1 Title Skin in the group:SKINS
            defineGetter(this, 'sknSection1Title', function () {
                return this._sknSection1Title;
            });
            //setter method for Address Line1 in the group:ADDRESS
            defineSetter(this, 'addressLine1', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._addressLine1 = val;
                }
            });
            //getter method for Address Line1 in the group:ADDRESS
            defineGetter(this, 'addressLine1', function () {
                return this._addressLine1;
            });
            //setter method for Object Name in the group:TRANSFER MANAGEMENT SERVICE
            defineSetter(this, 'objectName', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._objectName = val;
                }
            });
            //getter method for Object Name in the group:TRANSFER MANAGEMENT SERVICE
            defineGetter(this, 'objectName', function () {
                return this._objectName;
            });
            //setter method for Section Title 1 in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'ackSectionTitle1', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._ackSectionTitle1 = val;
                }
            });
            //getter method for Section Title 1 in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'ackSectionTitle1', function () {
                return this._ackSectionTitle1;
            });
            //setter method for Acknowledgement Text Skin in the group:SKINS
            defineSetter(this, 'sknAckText', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._sknAckText = val;
                }
            });
            //getter method for Acknowledgement Text Skin in the group:SKINS
            defineGetter(this, 'sknAckText', function () {
                return this._sknAckText;
            });
            //setter method for Payee Type in the group:General
            defineSetter(this, 'payeeType', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._payeeType = val;
                }
            });
            //getter method for Payee Type in the group:General
            defineGetter(this, 'payeeType', function () {
                return this._payeeType;
            });
            //setter method for Address Line2 in the group:ADDRESS
            defineSetter(this, 'addressLine2', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._addressLine2 = val;
                }
            });
            //getter method for Address Line2 in the group:ADDRESS
            defineGetter(this, 'addressLine2', function () {
                return this._addressLine2;
            });
            //setter method for Operation Name in the group:TRANSFER MANAGEMENT SERVICE
            defineSetter(this, 'operationName', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._operationName = val;
                }
            });
            //getter method for Operation Name in the group:TRANSFER MANAGEMENT SERVICE
            defineGetter(this, 'operationName', function () {
                return this._operationName;
            });
            //setter method for Section Title 2 in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'ackSectionTitle2', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._ackSectionTitle2 = val;
                }
            });
            //getter method for Section Title 2 in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'ackSectionTitle2', function () {
                return this._ackSectionTitle2;
            });
            //setter method for Reference Number Text Skin in the group:SKINS
            defineSetter(this, 'sknReferenceNumberText', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._sknReferenceNumberText = val;
                }
            });
            //getter method for Reference Number Text Skin in the group:SKINS
            defineGetter(this, 'sknReferenceNumberText', function () {
                return this._sknReferenceNumberText;
            });
            //setter method for City in the group:ADDRESS
            defineSetter(this, 'city', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._city = val;
                }
            });
            //getter method for City in the group:ADDRESS
            defineGetter(this, 'city', function () {
                return this._city;
            });
            //setter method for Criteria in the group:TRANSFER MANAGEMENT SERVICE
            defineSetter(this, 'criteria', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._criteria = val;
                }
            });
            //getter method for Criteria in the group:TRANSFER MANAGEMENT SERVICE
            defineGetter(this, 'criteria', function () {
                return this._criteria;
            });
            //setter method for Field1 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field1Label', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field1Label = val;
                }
            });
            //getter method for Field1 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field1Label', function () {
                return this._field1Label;
            });
            //setter method for Reference Number Value Skin in the group:SKINS
            defineSetter(this, 'sknReferenceNumberValue', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._sknReferenceNumberValue = val;
                }
            });
            //getter method for Reference Number Value Skin in the group:SKINS
            defineGetter(this, 'sknReferenceNumberValue', function () {
                return this._sknReferenceNumberValue;
            });
            //setter method for State in the group:ADDRESS
            defineSetter(this, 'state', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._state = val;
                }
            });
            //getter method for State in the group:ADDRESS
            defineGetter(this, 'state', function () {
                return this._state;
            });
            //setter method for Service Response Identifier in the group:TRANSFER MANAGEMENT SERVICE
            defineSetter(this, 'serviceResponseIdentifier', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._serviceResponseIdentifier = val;
                }
            });
            //getter method for Service Response Identifier in the group:TRANSFER MANAGEMENT SERVICE
            defineGetter(this, 'serviceResponseIdentifier', function () {
                return this._serviceResponseIdentifier;
            });
            //setter method for Field1 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field1Value', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field1Value = val;
                }
            });
            //getter method for Field1 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field1Value', function () {
                return this._field1Value;
            });
            //setter method for Country in the group:ADDRESS
            defineSetter(this, 'country', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._country = val;
                }
            });
            //getter method for Country in the group:ADDRESS
            defineGetter(this, 'country', function () {
                return this._country;
            });
            //setter method for Field2 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field2Label', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field2Label = val;
                }
            });
            //getter method for Field2 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field2Label', function () {
                return this._field2Label;
            });
            //setter method for Reference Operation in the group:TRANSFER MANAGEMENT SERVICE
            defineSetter(this, 'referenceOperation', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._referenceOperation = val;
                }
            });
            //getter method for Reference Operation in the group:TRANSFER MANAGEMENT SERVICE
            defineGetter(this, 'referenceOperation', function () {
                return this._referenceOperation;
            });
            //setter method for Zip Code in the group:ADDRESS
            defineSetter(this, 'zipCode', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._zipCode = val;
                }
            });
            //getter method for Zip Code in the group:ADDRESS
            defineGetter(this, 'zipCode', function () {
                return this._zipCode;
            });
            //setter method for Field2 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field2Value', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field2Value = val;
                }
            });
            //getter method for Field2 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field2Value', function () {
                return this._field2Value;
            });
            //setter method for Reference Criteria in the group:TRANSFER MANAGEMENT SERVICE
            defineSetter(this, 'referenceCriteria', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._referenceCriteria = val;
                }
            });
            //getter method for Reference Criteria in the group:TRANSFER MANAGEMENT SERVICE
            defineGetter(this, 'referenceCriteria', function () {
                return this._referenceCriteria;
            });
            //setter method for Header Visibility in the group:ADDRESS
            defineSetter(this, 'headerVisibility', function (val) {
                if (typeof val == 'boolean' && val != '') {
                    this._headerVisibility = val;
                }
            });
            //getter method for Header Visibility in the group:ADDRESS
            defineGetter(this, 'headerVisibility', function () {
                return this._headerVisibility;
            });
            //setter method for Field3 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field3Label', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field3Label = val;
                }
            });
            //getter method for Field3 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field3Label', function () {
                return this._field3Label;
            });
            //setter method for Field Label Skin in the group:SKINS
            defineSetter(this, 'sknFieldLabel', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._sknFieldLabel = val;
                }
            });
            //getter method for Field Label Skin in the group:SKINS
            defineGetter(this, 'sknFieldLabel', function () {
                return this._sknFieldLabel;
            });
            //setter method for Reference Identifier in the group:TRANSFER MANAGEMENT SERVICE
            defineSetter(this, 'referenceIdentifier', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._referenceIdentifier = val;
                }
            });
            //getter method for Reference Identifier in the group:TRANSFER MANAGEMENT SERVICE
            defineGetter(this, 'referenceIdentifier', function () {
                return this._referenceIdentifier;
            });
            //setter method for Field3 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field3Value', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field3Value = val;
                }
            });
            //getter method for Field3 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field3Value', function () {
                return this._field3Value;
            });
            //setter method for Field Value Skin in the group:SKINS
            defineSetter(this, 'sknFieldValue', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._sknFieldValue = val;
                }
            });
            //getter method for Field Value Skin in the group:SKINS
            defineGetter(this, 'sknFieldValue', function () {
                return this._sknFieldValue;
            });
            //setter method for Primary Button Skin in the group:SKINS
            defineSetter(this, 'sknPrimaryButton', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._sknPrimaryButton = val;
                }
            });
            //getter method for Primary Button Skin in the group:SKINS
            defineGetter(this, 'sknPrimaryButton', function () {
                return this._sknPrimaryButton;
            });
            //setter method for Field4 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field4Label', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field4Label = val;
                }
            });
            //getter method for Field4 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field4Label', function () {
                return this._field4Label;
            });
            //setter method for Secondary Button Skin in the group:SKINS
            defineSetter(this, 'sknSecondaryButton', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._sknSecondaryButton = val;
                }
            });
            //getter method for Secondary Button Skin in the group:SKINS
            defineGetter(this, 'sknSecondaryButton', function () {
                return this._sknSecondaryButton;
            });
            //setter method for Field4 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field4Value', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field4Value = val;
                }
            });
            //getter method for Field4 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field4Value', function () {
                return this._field4Value;
            });
            //setter method for Field5 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field5Label', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field5Label = val;
                }
            });
            //getter method for Field5 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field5Label', function () {
                return this._field5Label;
            });
            //setter method for Primary Button Focus Skin in the group:SKINS
            defineSetter(this, 'sknFocusPrimaryButton', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._sknFocusPrimaryButton = val;
                }
            });
            //getter method for Primary Button Focus Skin in the group:SKINS
            defineGetter(this, 'sknFocusPrimaryButton', function () {
                return this._sknFocusPrimaryButton;
            });
            //setter method for Field5 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field5Value', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field5Value = val;
                }
            });
            //getter method for Field5 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field5Value', function () {
                return this._field5Value;
            });
            //setter method for Secondary Button Focus Skin in the group:SKINS
            defineSetter(this, 'sknFocusSecondaryButton', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._sknFocusSecondaryButton = val;
                }
            });
            //getter method for Secondary Button Focus Skin in the group:SKINS
            defineGetter(this, 'sknFocusSecondaryButton', function () {
                return this._sknFocusSecondaryButton;
            });
            //setter method for Field6 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field6Label', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field6Label = val;
                }
            });
            //getter method for Field6 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field6Label', function () {
                return this._field6Label;
            });
            //setter method for Primary Button Hover Skin in the group:SKINS
            defineSetter(this, 'sknHoverPrimaryButton', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._sknHoverPrimaryButton = val;
                }
            });
            //getter method for Primary Button Hover Skin in the group:SKINS
            defineGetter(this, 'sknHoverPrimaryButton', function () {
                return this._sknHoverPrimaryButton;
            });
            //setter method for Field6 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field6Value', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field6Value = val;
                }
            });
            //getter method for Field6 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field6Value', function () {
                return this._field6Value;
            });
            //setter method for Secondary Button Hover Skin in the group:SKINS
            defineSetter(this, 'sknHoverSecondaryButton', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._sknHoverSecondaryButton = val;
                }
            });
            //getter method for Secondary Button Hover Skin in the group:SKINS
            defineGetter(this, 'sknHoverSecondaryButton', function () {
                return this._sknHoverSecondaryButton;
            });
            //setter method for Field7 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field7Label', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field7Label = val;
                }
            });
            //getter method for Field7 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field7Label', function () {
                return this._field7Label;
            });
            //setter method for Section2 Title Skin in the group:SKINS
            defineSetter(this, 'sknSection2Title', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._sknSection2Title = val;
                }
            });
            //getter method for Section2 Title Skin in the group:SKINS
            defineGetter(this, 'sknSection2Title', function () {
                return this._sknSection2Title;
            });
            //setter method for Field7 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field7Value', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field7Value = val;
                }
            });
            //getter method for Field7 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field7Value', function () {
                return this._field7Value;
            });
            //setter method for Section3 Title Skin in the group:SKINS
            defineSetter(this, 'sknSection3Title', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._sknSection3Title = val;
                }
            });
            //getter method for Section3 Title Skin in the group:SKINS
            defineGetter(this, 'sknSection3Title', function () {
                return this._sknSection3Title;
            });
            //setter method for Field8 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field8Label', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field8Label = val;
                }
            });
            //getter method for Field8 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field8Label', function () {
                return this._field8Label;
            });
            //setter method for Field8 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field8Value', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field8Value = val;
                }
            });
            //getter method for Field8 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field8Value', function () {
                return this._field8Value;
            });
            //setter method for Field9 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field9Label', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field9Label = val;
                }
            });
            //getter method for Field9 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field9Label', function () {
                return this._field9Label;
            });
            //setter method for Field9 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field9Value', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field9Value = val;
                }
            });
            //getter method for Field9 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field9Value', function () {
                return this._field9Value;
            });
            //setter method for Field10 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field10Label', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field10Label = val;
                }
            });
            //getter method for Field10 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field10Label', function () {
                return this._field10Label;
            });
            //setter method for Field10 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field10Value', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field10Value = val;
                }
            });
            //getter method for Field10 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field10Value', function () {
                return this._field10Value;
            });
            //setter method for Field11 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field11Label', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field11Label = val;
                }
            });
            //getter method for Field11 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field11Label', function () {
                return this._field11Label;
            });
            //setter method for Field11 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field11Value', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field11Value = val;
                }
            });
            //getter method for Field11 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field11Value', function () {
                return this._field11Value;
            });
            //setter method for Field12 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field12Label', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field12Label = val;
                }
            });
            //getter method for Field12 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field12Label', function () {
                return this._field12Label;
            });
            //setter method for Field12 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field12Value', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field12Value = val;
                }
            });
            //getter method for Field12 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field12Value', function () {
                return this._field12Value;
            });
            //setter method for Field13 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field13Label', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field13Label = val;
                }
            });
            //getter method for Field13 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field13Label', function () {
                return this._field13Label;
            });
            //setter method for Field13 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field13Value', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field13Value = val;
                }
            });
            //getter method for Field13 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field13Value', function () {
                return this._field13Value;
            });
            //setter method for Field14 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field14Label', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field14Label = val;
                }
            });
            //getter method for Field14 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field14Label', function () {
                return this._field14Label;
            });
            //setter method for Field14 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field14Value', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field14Value = val;
                }
            });
            //getter method for Field14 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field14Value', function () {
                return this._field14Value;
            });
            //setter method for Field15 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field15Label', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field15Label = val;
                }
            });
            //getter method for Field15 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field15Label', function () {
                return this._field15Label;
            });
            //setter method for Field15 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field15Value', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field15Value = val;
                }
            });
            //getter method for Field15 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field15Value', function () {
                return this._field15Value;
            });
            //setter method for Field16 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field16Label', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field16Label = val;
                }
            });
            //getter method for Field16 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field16Label', function () {
                return this._field16Label;
            });
            //setter method for Field16 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field16Value', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field16Value = val;
                }
            });
            //getter method for Field16 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field16Value', function () {
                return this._field16Value;
            });
            //setter method for Field17 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field17Label', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field17Label = val;
                }
            });
            //getter method for Field17 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field17Label', function () {
                return this._field17Label;
            });
            //setter method for Field17 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field17Value', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field17Value = val;
                }
            });
            //getter method for Field17 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field17Value', function () {
                return this._field17Value;
            });
            //setter method for Field18 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field18Label', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field18Label = val;
                }
            });
            //getter method for Field18 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field18Label', function () {
                return this._field18Label;
            });
            //setter method for Field18 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field18Value', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field18Value = val;
                }
            });
            //getter method for Field18 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field18Value', function () {
                return this._field18Value;
            });
            //setter method for Field19 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field19Label', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field19Label = val;
                }
            });
            //getter method for Field19 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field19Label', function () {
                return this._field19Label;
            });
            //setter method for Field19 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field19Value', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field19Value = val;
                }
            });
            //getter method for Field19 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field19Value', function () {
                return this._field19Value;
            });
            //setter method for Field20 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field20Label', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field20Label = val;
                }
            });
            //getter method for Field20 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field20Label', function () {
                return this._field20Label;
            });
            //setter method for Field20 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field20Value', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field20Value = val;
                }
            });
            //getter method for Field20 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field20Value', function () {
                return this._field20Value;
            });
            //setter method for Field21 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field21Label', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field21Label = val;
                }
            });
            //getter method for Field21 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field21Label', function () {
                return this._field21Label;
            });
            //setter method for Field21 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field21Value', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field21Value = val;
                }
            });
            //getter method for Field21 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field21Value', function () {
                return this._field21Value;
            });
            //setter method for Field22 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field22Label', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field22Label = val;
                }
            });
            //getter method for Field22 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field22Label', function () {
                return this._field22Label;
            });
            //setter method for Field22 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field22Value', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field22Value = val;
                }
            });
            //getter method for Field22 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field22Value', function () {
                return this._field22Value;
            });
            //setter method for Field23 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field23Label', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field23Label = val;
                }
            });
            //getter method for Field23 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field23Label', function () {
                return this._field23Label;
            });
            //setter method for Field23 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field23Value', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field23Value = val;
                }
            });
            //getter method for Field23 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field23Value', function () {
                return this._field23Value;
            });
            //setter method for Field25 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field25Label', function (val) {
              if (typeof val == 'string' && val != '') {
                  this._field25Label = val;
              }
            });
            //getter method for Field25 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field25Label', function () {
                return this._field25Label;
            });
            //setter method for Field25 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field25Value', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field25Value = val;
                }
            });
            //getter method for Field25 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field25Value', function () {
                return this._field25Value;
            });
            //setter method for Field26 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field26Label', function (val) {
              if (typeof val == 'string' && val != '') {
                  this._field26Label = val;
              }
            });
            //getter method for Field26 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field26Label', function () {
                return this._field26Label;
            });
            //setter method for Field26 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field26Value', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field26Value = val;
                }
            });
            //getter method for Field26 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field26Value', function () {
                return this._field26Value;
            });
            //setter method for Field27 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field27Label', function (val) {
              if (typeof val == 'string' && val != '') {
                  this._field27Label = val;
              }
            });
            //getter method for Field27 Label in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field27Label', function () {
                return this._field27Label;
            });
            //setter method for Field27 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'field27Value', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._field27Value = val;
                }
            });
            //getter method for Field27 Value in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'field27Value', function () {
                return this._field27Value;
            });
            //setter method for Charges Breakdown Label in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'chargesLabel', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._chargesLabel = val;
                }
            });
            //getter method for Charges Breakdown Label in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'chargesLabel', function () {
                return this._chargesLabel;
            });
            //setter method for Charge Value in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'chargeValue', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._chargeValue = val;
                }
            });
            //getter method for Charge Value in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'chargeValue', function () {
                return this._chargeValue;
            });
            //setter method for Supporting Documents Label in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'supportingDocsLabel', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._supportingDocsLabel = val;
                }
            });
            //getter method for Supporting Documents Label in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'supportingDocsLabel', function () {
                return this._supportingDocsLabel;
            });
            //setter method for attachedFileList in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'attachedFileList', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._attachedFileList = val;
                }
            });
            //getter method for attachedFileList in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'attachedFileList', function () {
                return this._attachedFileList;
            });
            //setter method for Acknowledgement Text in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'acknowledgementText', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._acknowledgementText = val;
                }
            });
            //getter method for Acknowledgement Text in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'acknowledgementText', function () {
                return this._acknowledgementText;
            });
            //setter method for Reference Number Text in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'referenceNumberText', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._referenceNumberText = val;
                }
            });
            //getter method for Reference Number Text in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'referenceNumberText', function () {
                return this._referenceNumberText;
            });
            //setter method for Reference Number Value  in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'referenceNumberValue', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._referenceNumberValue = val;
                }
            });
            //getter method for Reference Number Value  in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'referenceNumberValue', function () {
                return this._referenceNumberValue;
            });
            //setter method for Button1 in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'button1', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._button1 = val;
                }
            });
            //getter method for Button1 in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'button1', function () {
                return this._button1;
            });
            //setter method for Button2 in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'button2', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._button2 = val;
                }
            });
            //getter method for Button2 in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'button2', function () {
                return this._button2;
            });
            //setter method for Button3 in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'button3', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._button3 = val;
                }
            });
            //getter method for Button3 in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'button3', function () {
                return this._button3;
            });
            //setter method for Button4 in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'button4', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._button4 = val;
                }
            });
            //getter method for Button4 in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'button4', function () {
                return this._button4;
            });
            //setter method for Section Title 3 in the group:ACKNOWLEDGEMENT FIELDS
            defineSetter(this, 'ackSectionTitle3', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._ackSectionTitle3 = val;
                }
            });
            //getter method for Section Title 3 in the group:ACKNOWLEDGEMENT FIELDS
            defineGetter(this, 'ackSectionTitle3', function () {
                return this._ackSectionTitle3;
            });
            //       		//setter method for Row Expanded Skin in the group:Linked Payee Customer List Skins
            //             defineSetter(this, 'sknRowExpanded', function (val) {
            //               if (typeof val === 'string' && val !== '') {
            //                 this._sknRowExpandedSkin = val;
            //               }
            //             });
            //             //getter method for Row Expanded Skin in the group:Linked Payee Customer List Skins
            //             defineGetter(this, 'sknRowExpanded', function () {
            //               return this._sknRowExpandedSkin;
            //             });
            //             //setter method for Row Hover Skin in the group:Linked Payee Customer List Skins
            //             defineSetter(this, 'sknRowHover', function (val) {
            //               if (typeof val === 'string' && val !== '') {
            //                 this._sknRowHover = val;
            //               }
            //             });
            //             //getter method for Row Hover Skin in the group:Linked Payee Customer List Skins
            //             defineGetter(this, 'sknRowHover', function () {
            //               return this._sknRowHover;
            //             });
            //             //setter method for Row separator Skin in the group:Linked Payee Customer List Skins
            //             defineSetter(this, 'sknRowSeperator', function (val) {
            //               if (typeof val === 'string' && val !== '') {
            //                 this._sknRowSeparator = val;
            //               }
            //             });
            //             //getter method for Row separator Skin in the group:Linked Payee Customer List Skins
            //             defineGetter(this, 'sknRowSeperator', function () {
            //               return this._sknRowSeparator;
            //             });
            //             //setter method for Block Title Skin in the group:Linked Payee Customer List Skins
            //             defineSetter(this, 'sknBlockTitle1', function (val) {
            //               if (typeof val === 'string' && val !== '') {
            //                 this._sknBlockTitle = val;
            //               }
            //             });
            //             //getter method for Block Title Skin in the group:Linked Payee Customer List Skins
            //             defineGetter(this, 'sknBlockTitle1', function () {
            //               return this._sknBlockTitle;
            //             });
            //             //setter method for User Contracts Label Skin in the group:Linked Payee Customer List Skins
            //             defineSetter(this, 'sknUserContractsLabel', function (val) {
            //               if (typeof val === 'string' && val !== '') {
            //                 this._sknUserContractsLabel = val;
            //               }
            //             });
            //             //getter method for User Contracts Label Skin in the group:Linked Payee Customer List Skins
            //             defineGetter(this, 'sknUserContractsLabel', function () {
            //               return this._sknUserContractsLabel;
            //             });
            //             //setter method for Contract Customers Label Skin in the group:Linked Payee Customer List Skins
            //             defineSetter(this, 'sknContractCustomersLabel', function (val) {
            //               if (typeof val === 'string' && val !== '') {
            //                 this._sknContractCustomersLabel = val;
            //               }
            //             });
            //             //getter method for Contract Customers Label Skin in the group:Linked Payee Customer List Skins
            //             defineGetter(this, 'sknContractCustomersLabel', function () {
            //               return this._sknContractCustomersLabel;
            //             });
            //             //setter method for Payee Icon Skin in the group:Linked Payee Customer List Skins
            //             defineSetter(this, 'sknPayeeIcon', function (val) {
            //               if (typeof val === 'string' && val !== '') {
            //                 this._sknPayeeIcon = val;
            //               }
            //             });
            //             //getter method for Payee Icon Skin in the group:Linked Payee Customer List Skins
            //             defineGetter(this, 'sknPayeeIcon', function () {
            //               return this._sknPayeeIcon;
            //             });
            //             //setter method for Row Icon Skin in the group:Linked Payee Customer List Skins
            //             defineSetter(this, 'rowIconSkin', function (val) {
            //               if (typeof val === 'string' && val !== '') {
            //                 this._sknRowIcon = val;
            //               }
            //             });
            //             //getter method for Row Icon Skin in the group:Linked Payee Customer List Skins
            //             defineGetter(this, 'rowIconSkin', function () {
            //               return this._sknRowIcon;
            //             });
            defineGetter(this, 'sknRowExpanded', () => {
                return this._sknRowExpanded;
            });
            defineSetter(this, 'sknRowExpanded', value => {
                this._sknRowExpanded = value;
            });
            defineGetter(this, 'sknRowHover', () => {
                return this._sknRowHover;
            });
            defineSetter(this, 'sknRowHover', value => {
                this._sknRowHover = value;
            });
            defineGetter(this, 'sknRowSeperator', () => {
                return this._sknRowSeperator;
            });
            defineSetter(this, 'sknRowSeperator', value => {
                this._sknRowSeperator = value;
            });
            defineGetter(this, 'sknBlockTitle1', () => {
                return this._sknBlockTitle1;
            });
            defineSetter(this, 'sknBlockTitle1', value => {
                this._sknBlockTitle1 = value;
            });
            defineGetter(this, 'sknUserContractsLabel', () => {
                return this._sknUserContractsLabel;
            });
            defineSetter(this, 'sknUserContractsLabel', value => {
                this._sknUserContractsLabel = value;
            });
            defineGetter(this, 'sknContractCustomersLabel', () => {
                return this._sknContractCustomersLabel;
            });
            defineSetter(this, 'sknContractCustomersLabel', value => {
                this._sknContractCustomersLabel = value;
            });
            defineGetter(this, 'sknPayeeIcon', () => {
                return this._sknPayeeIcon;
            });
            defineSetter(this, 'sknPayeeIcon', value => {
                this._sknPayeeIcon = value;
            });
            defineGetter(this, 'rowIconSkin', () => {
                return this._rowIconSkin;
            });
            defineSetter(this, 'rowIconSkin', value => {
                this._rowIconSkin = value;
            });
            defineGetter(this, 'field24Label', () => {
                return this._field24Label;
            });
            defineSetter(this, 'field24Label', value => {
                this._field24Label = value;
            });
            defineGetter(this, 'field24Value', () => {
                return this._field24Value;
            });
            defineSetter(this, 'field24Value', value => {
                this._field24Value = value;
            });
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
        this.setComponentConfigs();
        this.initActions();
        this.getPayeeTypeFromContext();
        this.view.forceLayout();
      }
      catch(err){
        var errObj = {
          "errorInfo" : "Error in preshow method of the component.",
          "error": err
        };
        self.onError(errObj);	
      }
    },
    setbtnFocus: function(){
      var scope= this;
      scope.view.button1.setFocus(true);   
      if(scope.view.screenConfirm.isVisible === true){
        scope.view.screenConfirm.setFocusData();
      }else{
      scope.view.button1.setFocus(true);  
      }   
    },

    /**
     * @api : postShow
     * event called after ui rendered on the screen, is a component life cycle event.
     * @return : NA
     */
    postShow: function() {      
      var scope = this;
      this.setLinkPayeeDetails(); 
      this.setSkins();
      this.setData();
      this.setImage();
      this.setFlexHeight();
      this.populateButtonTexts();
      this.enableSavePayeeButton();
      this.setButtonPosition();
    },

    /**
     * @api : onBreakPointChange
     * Triggers when break point change takes place.
     * @return : NA
     */
    onBreakPointChange: function()
    {
      var scope = this;
      var breakPointValue = kony.application.getCurrentBreakpoint();
      this.setSkins();
      this.setData();
      this.setImage();
      this.populateButtonTexts();
      this.enableSavePayeeButton();
      this.setButtonPosition();
      this.setFlexHeight();
      this.view.forceLayout();
    },

    /**
     * Component getPayeeTypeFromContext.
     * To set transfer type from the context object.
     * @return : NA
     */
    getPayeeTypeFromContext :function(){
      try {
        this.payeeTypeContext = this.parserUtilsManager.getParsedValue(this._payeeType);
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in getPayeeTypeFromContext method of the component.",
          "errorLevel" : "Configuration",
          "error": err
        };
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
        if (typeof(Value) === "string") {
          value = JSON.parse(Value);
        }
        if (value[this.context["accountType"]]) {
          value = value[this.context["accountType"]];
        }
        if (value["default"]) {
          value = value["default"];
        }
        if (!this.isEmptyNullUndefined(value) && !this.isEmptyNullUndefined(key)) {
          value = value[key];
        }
        if (value !== null && value !== "" && value !== undefined) {
          if (typeof(value) === "string") 
            return this.getProcessedText(value);
          else{
            //var text=this.breakPointParser(value,kony.application.getCurrentBreakpoint());
            return this.getProcessedText(value);
          }

        } else 
          return "";

      } catch (err) {
        kony.print(err);
      }
      return this.getProcessedText(value);
    },

    /**
     * setComponentConfigs
     * @api : setComponentConfigs
     * responsible for sending componentContext passed into parserUtilManager
     * @return : NA
     */
    setComponentConfigs: function() {
      this.parserUtilsManager.setBreakPointConfig(JSON.parse(this._BREAKPTS));
    },

    /**
     * setData
     * @api : setData
     * sets data in UI based on contract configurations
     * @return : NA
     */
    setData: function() {      
      this.setLabelData();
      this.setContextData();
      this.populateDocumentsName();
      this.populateChargesBreakdown();
      this.populateAddressDetails();
    },

    /**
     * getParsedValue
     * @api : getParsedValue
     * parses the property and fetches the corresponding value
     * @return : NA
     */
    getParsedValue: function(property, selectedValue) {
      try {
        property = JSON.parse(property);
      }
      catch(e) {
        property = property;
        kony.print(e);
      }
      if(typeof(property) === "string")
        return this.getProcessedText(property);
      else {
        if(selectedValue)
          return this.getProcessedText(this.parserUtilsManager.getComponentConfigParsedValue(property,selectedValue));
        else
          return property;
      }
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
     * getLabelText
     * @api : getLabelText
     * parses label texts based on contract configurations
     * @return : NA
     */
    getLabelText: function(contractJSON) {
      let labelText = this.getParsedValue(contractJSON,kony.application.getCurrentBreakpoint());
      return labelText ? labelText : "";
    },
    
     /**
         * Component isEmptyNullUndefined
         * Verifies if the value is empty, null or undefined
         * data {string} - value to be verified
         * @return : {boolean} - validity of the value passed
         */
    isEmptyNullUndefined: function(data) {
      if (data === null || data === undefined || data === "")
        return true;

      return false;
    },

    /**
     * setLabelData
     * @api : setLabelData
     * sets the data in corresponding labels provided in contracts
     * @return : NA
     */
    setLabelData: function() {
      for(var i=1 ; i<=27; i++) {
        this.view["lblField" +i+"Key"].text = this.getLabelText(this["_field" +i+"Label"]);
      }
      this.view["lblField24Key"].text = this.getLabelText(this["_field24Label"]);
      this.view["lblSection1Header"].text = this.getLabelText(this["_ackSectionTitle1"]);
      this.view["lblSection2Header"].text = this.getLabelText(this["_ackSectionTitle2"]);
      this.view["lblAddressHeader"].text = this.getLabelText(this["_ackSectionTitle3"]);
      this.view["lblRefrenceNumber"].text = this.getLabelText(this["_referenceNumberText"]);
      this.view["lblChargesBreakdown"].text = this.getLabelText(this["_chargesLabel"]);
    },

    /**
     * setContextData
     * @api : setContextData
     * sets the data based from contexts
     * @return : NA
     */
    setContextData: function() {
      var scope = this;
      scope.view.lblValue6.text = "";
      for(var j=1 ; j<=27; j++) {
        var contextValue = this.getParsedValue(this["_field" +j+"Value"]);
        if(contextValue){
          if(contextValue.fieldType === "Label") {
            this.view["lblValue"+j].isVisible = true;
            this.view["flxField"+j].isVisible = true;
            this.extractValuefromJSON(this["_field" +j+"Value"], "lblValue"+j, j);
          }       
        }
        else {
          this.view["flxField"+j].isVisible = false;
        }
      }
      var bankName;
      if(scope.context.transferType ===  "Domestic Transfer" || scope.context.transferType ===  "International Transfer"){
        bankName = scope.context["bankName"];
        if(bankName.length > 105){
          bankName = bankName.substr(0,104) + "....";
        }
        scope.view.lblValue7.text = bankName;
      }
      var value = this.getParsedValue(this["_field24Value"]);
        if(value){
          if(value.fieldType === "Label") {
            this.view["lblValue24"].isVisible = true;
            this.extractValuefromJSON(this["_field24Value"], "lblValue24", 24);
          }       
        }
        else {
          this.view["flxField24"].isVisible = false;
        }

      this.extractValuefromJSON(this._acknowledgementText, "lblSection1Message");
      this.extractValuefromJSON(this._referenceNumberValue, "lblRefrenceNumberValue");
    },

    /**
     * populateAddressDetails
     * @api : populateAddressDetails
     * populates address details based on contracts
     * @return : NA
     */
    populateAddressDetails: function() {
      var address = "";
      var phoneNumber = "";
      var emailId = "";
      var addressLine1 = this.getParsedValue(this._addressLine1);
      var addressLine2 = this.getParsedValue(this._addressLine2);
      var city = this.getParsedValue(this._city);
      var state = this.getParsedValue(this._state);
      var country = this.getParsedValue(this._country);
      var zipCode = this.getParsedValue(this._zipCode);

      if(addressLine1)
        address = addressLine1;

      if(addressLine2)
        if(address)
          address = address + ", " + addressLine2;
        else
          address = addressLine2;

      if(city)
        if(address)
          address = address + ", " + city;
        else
          address = city;

      if(state)
        if(address)
          address = address + ", " + state;
        else
          address = state;

      if(country)
        if(address)
          address = address + ", " + country;
        else
          address = country;

      if(zipCode)
        if(address)
          address = address + ", " + zipCode;
        else
          address = zipCode;

      if(address == "") {
        this.view.flxField22.setVisibility(false);
      }
      else {
        this.view.lblValue22.text = address;
      }

      if(this._headerVisibility) {
        var phoneNumberJSON = this.getParsedValue(this._field20Value);
        var emailIdJSON = this.getParsedValue(this._field21Value);
        if (phoneNumberJSON)
          phoneNumber = this.getParsedValue(phoneNumberJSON.text);

        if (emailIdJSON)
          emailId = this.getParsedValue(emailIdJSON.text);

        if(addressLine1 == "" && addressLine2 == "" && city == "" && state == "" && country == "" && zipCode == "" && phoneNumber == "" && emailId == "")
          this.view.flxAddressHeader.setVisibility(false);
      }

      else {
        this.view.flxAddressHeader.setVisibility(false);
      }
    },

    /**
     * @api : populateDocumentsName
     * To set the visibility of the flex for supporting documents  based on the input documents
     * @return : NA
     */
    populateDocumentsName: function()
    {
      this.view.lblSupportingDocuments.text = this.getLabelText(this.supportingDocsLabel);
      var containDocument = false;
      var listOfDocuments = {};
      var documentName = this.getParsedValue(this._attachedFileList);
      if(documentName){
        documentName = this.getParsedValue(documentName.text);
        if(documentName){
        listOfDocuments = documentName.split(",");
        for(var docIndex=0,j=1 ; j<=listOfDocuments.length/2; docIndex+=2,j++){
          this.view["lblDoc"+j].text = listOfDocuments[docIndex];
          this.view["imgDoc"+j].src = listOfDocuments[docIndex+1];
          containDocument = true;
           this.view["flxDoc"+j].isVisible = true;
        }
        }
      }
      if(containDocument === false) {
        this.view.flxSupportingDocuments.setVisibility(false);
      }
    },

    /**
     * @api : populateChargesBreakdown
     * To set the visibility of the flex for charges breakdown based on the input charges
     * @return : NA
     */
    populateChargesBreakdown : function(){
      try{
        this.view.flxChargesBreakdown.setVisibility(true);
        this.view.lblChargesBreakdown.text = this.getLabelText(this._chargesLabel);
        var chargeJSON = this.getParsedValue(this._chargeValue);
        var chargeList = {};
        if(chargeJSON){
          chargeList = this.getParsedValue(chargeJSON.text);         
          if(chargeList){
            chargeList = chargeList.split(",");
            for(var i=0,j=1 ; j<=chargeList.length/2; i+=2,j++){        
              var chargeLabel = chargeList[i];
              var chargeValue = chargeList[i+1];
              if(chargeValue){
                this.view["lblCharge"+j].text = chargeLabel;
                this.view["lblChargeValue"+j].text = chargeValue;
                this.view["flxCharge"+j].isVisible = true;
              }
              else
                this.view["flxCharge"+j].isVisible = false;
            }
          }else
            this.view.flxChargesBreakdown.isVisible = false;
        }else
          this.view.flxChargesBreakdown.setVisibility(false);

      } catch(err){
        var errorObj =
            {
              "errorInfo" : "Error in Charges breakdown method of the component",
              "errorLevel" : "Business",
              "error": err
            };
      }
    },

    /**
     * extractValuefromJSON
     * @api : extractValuefromJSON
     * extracts the value from contexts provided in contracts
     * @return : NA
     */
    extractValuefromJSON: function(JSON, widget, index) {
      var lblValueJSON = this.getParsedValue(JSON);
      if(lblValueJSON) {
        var lblValue = this.getParsedValue(lblValueJSON.text);
        if(lblValue)
          this.view[widget].text = lblValue;
        else
          this.view["flxField"+index].isVisible = false;
      }
      else {
        this.view["flxField"+index].isVisible = false;
      }
    },

    /**
     * @api : setContext
     * To collect the context object required for the component. 
     * @param : context{JSONobject} - account object 
     * @return : NA
     */
    setContext: function(context, scope) {
      this.context = context;     
      if(this.formScope === ""){
        this.formScope = scope;
      }
      this.parserUtilsManager.setContext(this.context);
    },

    /**
     * setImage
     * @api : setImage
     * sets image based on contract configurations
     * @return : NA
     */
    setImage: function() {
      var ackSuccessImage = this.getParsedImgSource(this._ackImg);
      if(ackSuccessImage) {
        this.view.imgSuccess.src = ackSuccessImage.img;
      }
    },

    /**
     * getParsedImgSource
     * @api : getParsedImgSource
     * parses the property and fetches the corresponding Value
     * @return : NA
     */
    getParsedImgSource: function(property) {
      try {
        property=JSON.parse(property);
      }
      catch(e) {        
        kony.print(e);
      }      
      return property;
    },

    /**
     * setFlexHeight
     * @api : setFlexHeight
     * event called to get and set the height of flexes dynamically
     * @return : NA
     */
    setFlexHeight: function()
    {
      var scope = this;
      var breakPointValue = kony.application.getCurrentBreakpoint();

      if(breakPointValue <= 1024) {
        this.view.flxSection2.doLayout = null;
        scope.view.flxSection1.height = undefined;
        this.view.flxMiddleContent.forceLayout();
      }

      else if(breakPointValue > 1024)
      {
        this.view.flxSection2.doLayout = function() {
          scope.view.flxSection1.height = scope.view.flxSection2.frame.height + "dp";
        };
       
      }
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
        for(var i=1 ; i<=27; i++) {       
          this.view["lblField" +i+"Key"].skin = this.getParsedValue(this._sknFieldLabel, kony.application.getCurrentBreakpoint());
        }
        this.view["lblField24Key"].skin = this.getParsedValue(this._sknFieldLabel, kony.application.getCurrentBreakpoint());
        this.view.lblChargesBreakdown.skin = this.getParsedValue(this._sknFieldLabel, kony.application.getCurrentBreakpoint());
        this.view.lblSupportingDocuments.skin = this.getParsedValue(this._sknFieldLabel, kony.application.getCurrentBreakpoint());
        for(var j=1 ; j<=27; j++) {         
          this.view["lblValue" +j].skin = this.getParsedValue(this._sknFieldValue, kony.application.getCurrentBreakpoint());
        }
        this.view["lblValue24"].skin = this.getParsedValue(this._sknFieldValue, kony.application.getCurrentBreakpoint());
        for(var j=1 ; j<=5; j++) {          
          this.view["lblDoc" +j].skin = this.getParsedValue(this._sknFieldValue, kony.application.getCurrentBreakpoint());
        }
        for(var j=1 ; j<=4; j++) {          
          this.view["lblCharge" +j].skin = this.getParsedValue(this._sknFieldValue, kony.application.getCurrentBreakpoint());
        }
        this.view.lblSection1Header.skin = this.getParsedValue(this._sknSection1Title, kony.application.getCurrentBreakpoint());
        this.view.lblSection2Header.skin = this.getParsedValue(this._sknSection2Title, kony.application.getCurrentBreakpoint());
        this.view.lblAddressHeader.skin = this.getParsedValue(this._sknSection3Title, kony.application.getCurrentBreakpoint());
        this.view.lblSection1Message.skin = this.getParsedValue(this._sknAckText, kony.application.getCurrentBreakpoint());
        this.view.lblRefrenceNumber.skin = this.getParsedValue(this._sknReferenceNumberText, kony.application.getCurrentBreakpoint());
        this.view.lblRefrenceNumberValue.skin = this.getParsedValue(this._sknReferenceNumberValue, kony.application.getCurrentBreakpoint());
        this.view.button1.skin = this.getParsedValue(this._sknPrimaryButton, kony.application.getCurrentBreakpoint());
        this.view.button2.skin = this.getParsedValue(this._sknSecondaryButton, kony.application.getCurrentBreakpoint());
        this.view.button3.skin = this.getParsedValue(this._sknSecondaryButton, kony.application.getCurrentBreakpoint());
        this.view.button4.skin = this.getParsedValue(this._sknSecondaryButton, kony.application.getCurrentBreakpoint());
        this.view.button1.hoverSkin = this.getParsedValue(this._sknPrimaryButton, kony.application.getCurrentBreakpoint());
        this.view.button2.hoverSkin = this.getParsedValue(this._sknSecondaryButton, kony.application.getCurrentBreakpoint());
        this.view.button3.hoverSkin = this.getParsedValue(this._sknSecondaryButton, kony.application.getCurrentBreakpoint());
        this.view.button4.hoverSkin = this.getParsedValue(this._sknSecondaryButton, kony.application.getCurrentBreakpoint());
        this.view.button1.focusSkin = this.getParsedValue(this._sknPrimaryButton, kony.application.getCurrentBreakpoint());
        this.view.button2.focusSkin = this.getParsedValue(this._sknSecondaryButton, kony.application.getCurrentBreakpoint());
        this.view.button3.focusSkin = this.getParsedValue(this._sknSecondaryButton, kony.application.getCurrentBreakpoint());
        this.view.button4.focusSkin = this.getParsedValue(this._sknSecondaryButton, kony.application.getCurrentBreakpoint());
      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in setSkins method of the component.",
          "error": err
        };
        self.onError(errObj);	
      }
    },

    /**
     * getParsedTextValue
     * @api : getParsedTextValue
     * parses the property and fetches the corresponding text
     * @return : returns corresponding property for the respective breakpoints
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
     * setButtonText
     * @api : setButtonText
     * helper method for parsing button text
     * @return : returns corresponding property for the respective breakpoints
     */
    setButtonText: function(value) {
      var self = this;
      try {
        var parsedValue = value;
        if (typeof(parsedValue !== "string")) {
          parsedValue = parsedValue.hasOwnProperty("text") ? parsedValue["text"] : parsedValue;
        }
        if ((typeof(parsedValue) !== "string" && Object.keys(parsedValue)[1].indexOf("$.BREAKPTS") > -1) || (typeof(parsedValue) === "string" && parsedValue.indexOf("$.BREAKPTS") > -1)) {
          parsedValue = this.getParsedTextValue(parsedValue, kony.application.getCurrentBreakpoint());
        } else parsedValue = this.getParsedTextValue(parsedValue, kony.application.getCurrentBreakpoint());
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
     * populateButtonTexts
     * @api : populateButtonTexts
     * populates button texts in add beneficiary view
     * @return : NA
     */
    populateButtonTexts: function() {
      var self = this;
      try{
        var parsedValue1 = this.transferAcknowledgementUtility.buttonParsedValue(this._button3);
        if(parsedValue1) {
          var btn3Text = this.setButtonText(parsedValue1);
          this.view.button1.text = btn3Text;
          this.view.button1.setVisibility(true);
        }else{
          this.view.button1.setVisibility(false);
        }

        var parsedValue2 = this.transferAcknowledgementUtility.buttonParsedValue(this._button2);
        if(parsedValue2) {
          var btn2Text = this.setButtonText(parsedValue2);
          this.view.button2.text = btn2Text;
          this.view.button2.setVisibility(true);
        }else{
          this.view.button2.setVisibility(false);
        }

        var parsedValue3 = this.transferAcknowledgementUtility.buttonParsedValue(this._button1);
        if(parsedValue3) {
          var btn1Text = this.setButtonText(parsedValue3);
          this.view.button3.text = btn1Text;
          this.view.button3.setVisibility(true);
        }else{
          this.view.button3.setVisibility(false);
        }
        var parsedValue4 = this.transferAcknowledgementUtility.buttonParsedValue(this._button4);
        if(parsedValue4) {
          var btn4Text = this.setButtonText(parsedValue4);
          this.view.button4.text = btn4Text;
          this.view.button4.setVisibility(true);
        }else{
          this.view.button4.setVisibility(false);
        }
      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in populateButtonTexts method of the component.",
          "error": err
        };
        self.onError(errObj);	
      }
    },
        /**
     * setButtonPosition
     * @api : setButtonPosition
     * Method to fix the  button position in 640 breakpoint
     * @return : NA
     */
    setButtonPosition : function(){
      var scope = this;
      if(kony.application.getCurrentBreakpoint() === 640){
        if(scope.view.button1.isVisible){
          scope.view.button1.top = "20dp";
          if(scope.view.button2.isVisible){
            scope.view.button2.top = "80dp";
            if(scope.view.button3.isVisible)           
              scope.view.button3.top = "140dp";
          }else{
            if(scope.view.button3.isVisible)
              scope.view.button3.top = "20px";
          }
        }else if(scope.view.button2.isVisible){
          scope.view.button2.top = "20dp";
          if(scope.view.button3.isVisible)
            scope.view.button3.top ="80dp";
        }else{
          scope.view.button3.top ="20dp";
        }
      }
    },
    /**
     * @api : initActions
     * assigns actions to all the widgets
     * @return : NA
     */
    initActions: function() {
      var scope = this;
      var payeeStatus = this.getParsedValue(this._payeeType);
      this.view.button3.onClick =  this.actionHandler.bind(this,this.context,this._button1);
      this.view.button2.onClick =  this.actionHandler.bind(this,this.context,this._button2);
      this.view.button1.onClick =  this.actionHandler.bind(this,this.context,this._button3);
      this.view.button4.onClick =  this.actionHandler.bind(this,this.context,this._button4);
      this.view.button3.accessibilityConfig = {
            a11yLabel: "View Transfer Activities"
        };
        this.view.button1.accessibilityConfig = {
            a11yLabel: "Make New Transfer"
        };
    },
    
    setScreenConfirmSkins : function(){
      try{
        this.context.screenConfirmSkins = {
          "sknRowExpanded" : this.getParsedValue(this._sknRowExpanded, kony.application.getCurrentBreakpoint()),
          "sknRowHover" : this.getParsedValue(this._sknRowHover, kony.application.getCurrentBreakpoint()),
          "sknRowSeparator" : this.getParsedValue(this._sknRowSeperator, kony.application.getCurrentBreakpoint()),
          "sknBlockTitle" : this.getParsedValue(this._sknBlockTitle, kony.application.getCurrentBreakpoint()),
          "sknUserContractsLabel" : this.getParsedValue(this._sknUserContractsLabel, kony.application.getCurrentBreakpoint()),
          "sknContractCustomersLabel" : this.getParsedValue(this._sknContractCustomersLabel, kony.application.getCurrentBreakpoint()),
          "sknPayeeIcon" : this.getParsedValue(this._sknPayeeIcon, kony.application.getCurrentBreakpoint()),
          "sknRowIcon" : this.getParsedValue(this._rowIconSkin, kony.application.getCurrentBreakpoint())
        };
      }catch(err){
        var errObj = {
          "errorInfo" : "Error in setscreenconfirmskins method of the component.",
          "error": err
        };
        self.onError(errObj);   
      }
    },

    /**
     * actionHandler
     * @api : actionHandler
     * helper method used on initializing actions for the component, it retrieves the actionJSON from the property
     * context{JSON} - context object
     * property{String} - contains custom property defined
     */
    actionHandler: function(context,property) {
      if(property !== null && property !== undefined) {
        var propertyJSON = JSON.parse(property);
        var parsedValue = propertyJSON;
        if (typeof(parsedValue !== "string")) {
          parsedValue = parsedValue.hasOwnProperty("action") ? parsedValue["action"] : parsedValue;
        }
        if((typeof(parsedValue) !== "string" && Object.keys(parsedValue)[1].indexOf("$.BNFTYPES")>-1) || (typeof(parsedValue) === "string" && parsedValue.indexOf("$.BNFTYPES")>-1)) {
          parsedValue = this.getParsedValue(parsedValue,this.beneficiaryData["selectedBeneficiaryType"]); 
          if(typeof(parsedValue !== "string")) {
            parsedValue = parsedValue.hasOwnProperty("action") ? parsedValue["action"]:parsedValue;
          }
        }
        if((typeof(parsedValue) !== "string" && Object.keys(parsedValue)[1].indexOf("$.FLOWTYPES")>-1) || (typeof(parsedValue) === "string" && parsedValue.indexOf("$.FLOWTYPES")>-1)) {
          parsedValue = this.getParsedValue(parsedValue,this.beneficiaryData["selectedflowType"]);  
          if(typeof(parsedValue !== "string")) {
            parsedValue = parsedValue.hasOwnProperty("action") ? parsedValue["action"]:parsedValue;
          }
        }

        var actionJSON = parsedValue;
        var level = actionJSON.level;  
        var method = actionJSON.method;
        this.getInstanceAction(level, method, context);
      }
    },

    /**
     * getInstanceAction
     * @api : getInstanceAction
     * helper method to retrieve the form/component method
     * method {String} - method to be invoked
     * context{JSON} -context
     */
    getInstanceAction: function(levelInstance, method, context) {  
      if(levelInstance.toLowerCase().trim() == "form")
      {
        this.formScope[method](context);
      }
      if(levelInstance.toLowerCase().trim() == "component")
      {
        this[method](context);
      }
    },

    /**
     * enableSavePayeeButton
     * @api : enableSavePayeeButton
     * enables Save this Payee button based on the type of payee 
     * @return : NA
     */
    enableSavePayeeButton: function() {
      if(this.payeeTypeContext === this.getFieldValue(this._PAYEETYPES, "PT1")) {
        var parsedValue2 = this.transferAcknowledgementUtility.buttonParsedValue(this._button2);
        if(parsedValue2) {
          this.view.button2.setVisibility(true);
        } else {
          this.view.button2.setVisibility(false);
        }
      }
      else {
        this.view.button2.setVisibility(false);
        var breakPointValue = kony.application.getCurrentBreakpoint();
        if(breakPointValue <= 640) {
          this.view.button3.top = "80dp";
        }
        else {
          this.view.button3.top = "30dp";
        }
      }
    },
    
    setPayeeData: function() {
      this.formScope["savePayee"](this.context);
    },
        /**
     * @api : setLinkPayeeDetails
     * Method to hide/Show Link Payee section and to initialize this link payee component if it is visible
     * @return : NA
     */
    setLinkPayeeDetails : function(){
	if(this.context.data){
      this.setScreenConfirmSkins();
      this.view.screenConfirm.setContext(this.context);
      this.view.screenConfirm.initializeComponent();
    }else{
      this.view.flxContractList.isVisible = false;
    }
    }
  };
});