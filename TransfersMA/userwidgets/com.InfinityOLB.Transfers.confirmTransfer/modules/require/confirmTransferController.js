define(['./ParserUtilsManager','./ConfirmationUtility','./ConfirmationDAO', 'CommonUtilities'],function(ParserUtilsManager,ConfirmationUtility,ConfirmationDAO, CommonUtilities) {
  var frequencyType = "";
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {

      //declaration for Transfer Type in the group:general
      this._accountType ="";
      //declaration for Transfer Type in the group:General
      this._transferType="";
      //declaration for Transfer Flow in the group:General
      this._transferFlow="";
      //declaration for payeeType  Flow in the group:General
      this._payeeType = "";
      //declaration for transactionSuccessMsg  Flow in the group:General
      this._transactionSuccessMsg = "";
      //declaration for transactionPendingMsg  Flow in the group:General
      this._transactionPendingMsg = "";
      //declaration for Breakpoints in the group:Config
      this._BREAKPTS="";
      //declaration for Block Title in the group:Confirmation Context
      this._reviewBlockTitle="";
      //declaration for Section Title in the group:Confirmation Context
      this._reviewSectionTitle="";
      //declaration for Field 1 Label in the group:Confirmation Context
      this._field1Label="";
      //declaration for Field  1 Value in the group:Confirmation Context
      this._field1Value="";
      //declaration for Field 2 Label  in the group:Confirmation Context
      this._field2Label="";
      //declaration for Field 2 Value  in the group:Confirmation Context
      this._field2Value="";
      //declaration for Field 3 Label  in the group:Confirmation Context
      this._field3Label="";
      //declaration for Field 3 Value  in the group:Confirmation Context
      this._field3Value="";
      //declaration for Field 4  Label  in the group:Confirmation Context
      this._field4Label="";
      //declaration for Field 4 Value  in the group:Confirmation Context
      this._field4Value="";
      //declaration for Field 5 Label  in the group:Confirmation Context
      this._field5Label="";
      //declaration for Field 5 Value  in the group:Confirmation Context
      this._field5Value="";
      //declaration for Field 6 Label  in the group:Confirmation Context
      this._field6Label="";
      //declaration for Field 6 Value  in the group:Confirmation Context
      this._field6Value="";
      //declaration for  Field 7 Label  in the group:Confirmation Context
      this._field7Label="";
      //declaration for Field 7 Value   in the group:Confirmation Context
      this._field7Value="";
      //declaration for Field 8 Label  in the group:Confirmation Context
      this._field8Label="";
      //declaration for  Field 8 Value  in the group:Confirmation Context
      this._field8Value="";
      //declaration for Field 9 Label   in the group:Confirmation Context
      this._field9Label="";
      //declaration for Field 9 Value    in the group:Confirmation Context
      this._field9Value="";
      //declaration for Field 10 Label in the group:Confirmation Context
      this._field10Label="";
      //declaration for Field 10 Value    in the group:Confirmation Context
      this._field10Value="";
      //declaration for Field 11 Label  in the group:Confirmation Context
      this._field11Label="";
      //declaration for Field 11 Value  in the group:Confirmation Context
      this._field11Value="";
      //declaration for  Field 12 Label   in the group:Confirmation Context
      this._field12Label="";
      //declaration for Field 12 Value  in the group:Confirmation Context
      this._field12Value="";
      //declaration for Field 13 Label   in the group:Confirmation Context
      this._field13Label="";
      //declaration for Field 13 Value  in the group:Confirmation Context
      this._field13Value="";
      //declaration for  Field 14 Label     in the group:Confirmation Context
      this._field14Label="";
      //declaration for Field 14 Value in the group:Confirmation Context
      this._field14Value="";
      //declaration for Field 15 Label   in the group:Confirmation Context
      this._field15Label="";
      //declaration for Field 15 Value  in the group:Confirmation Context
      this._field15Value="";
      //declaration for Field 16 Label  in the group:Confirmation Context
      this._field16Label="";
      //declaration for Field 16 Value     in the group:Confirmation Context
      this._field16Value="";
      //declaration for Field 17 Label   in the group:Confirmation Context
      this._field17Label="";
      //declaration for Field 17 Value in the group:Confirmation Context
      this._field17Value="";
      //declaration for Field 18 Label    in the group:Confirmation Context
      this._field18Label="";
      //declaration for Field 18 Value in the group:Confirmation Context
      this._field18Value="";
      //declaration for Field 19 Label  in the group:Confirmation Context
      this._field19Label="";
      //declaration for Field 19 Value  in the group:Confirmation Context
      this._field19Value="";
      //declaration for Field 20 Label  in the group:Confirmation Context
      this._field20Label="";
      //declaration for Field 20 Value in the group:Confirmation Context
      this._field20Value="";
      //declaration for Field 25 Label  in the group:Confirmation Context
      this._field25Label="";
      //declaration for Field 25 Value in the group:Confirmation Context
      this._field25Value="";
      //declaration for Field 26 Label  in the group:Confirmation Context
      this._field26Label="";
      //declaration for Field 26 Value in the group:Confirmation Context
      this._field26Value="";
      //declaration for Field 27 Label  in the group:Confirmation Context
      this._field27Label="";
      //declaration for Field 27 Value in the group:Confirmation Context
      this._field27Value="";
      //declaration for Charges Breakdown Label  in the group:Confirmation Context
      this._chargesBreakdownLabel="";
      //declaration for Charge 1 Label  in the group:Confirmation Context
      this._chargeValue="";
      //declaration for Button1 in the group:Confirmation Context
      this._button1="";
      //declaration for Button2 in the group:Confirmation Context
      this._button2="";
      //declaration for Button3 in the group:Confirmation Context
      this._button3="";
      //declaration for Button4 in the group:Confirmation Context
      this._button4="";

      //Payee address

      //declaration for Field 21 Label in the group:Payee Address Details
      this._field21Label="";
      //declaration for Field 21 Value in the group:Payee Address Details
      this._field21Value="";
      //declaration for Field 22 Label in the group:Payee Address Details
      this._field22Label="";
      //declaration for Field 22 Value in the group:Payee Address Details
      this._field22Value="";
      //declaration for Field 24 Label in the group:Confirmation
      this._field24Label="";
      //declaration for Field 24 Value in the group:Confirmation
      this._field24Value="";
      //declaration for Address Label in the group:Payee Address Details
      this._addressLabel="";
      //declaration for Address Value1 in the group:Payee Address Details
      this._addressValue1="";
      //declaration for Address Value2 in the group:Payee Address Details
      this._addressValue2="";
      //declaration for Address Value3 in the group:Payee Address Details
      this._addressValue3="";
      //declaration for Address Value4 in the group:Payee Address Details
      this._addressValue4="";
      //declaration for Address Value5 in the group:Payee Address Details
      this._addressValue5="";
      //declaration for Address Value6 in the group:Payee Address Details
      this._addressValue6="";
      //Supporting documents
      //declaration for Supporting Document1 in the group:Confirmation Context
      this._supportingDocumentLabel="";
      //declaration for attachedFileList in the group:Confirmation Context
      this._attachedFileList="";

      //Popup
      //declaration for Close Text in the group:Popup 
      this._closeText="";
      //declaration for Button Yes in the group:Popup 
      this._buttonYes="";
      //declaration for Button No in the group:Popup 
      this._buttonNo="";
      //declaration for Cancel Review Text in the group:Popup 
      this._cancelReviewText="";

      //Services
      //declaration for Object Service Name in the group:Transfer Management Service
      this._ObjectServiceName="";
      //declaration for Object Name in the group:Transfer Management Service
      this._ObjectName="";
      //declaration for Operation Name in the group:Transfer Management Service
      this._OperationName="";
      //declaration for Criteria in the group:Transfer Management Service
      this._Criteria="";
      //declaration for Identifier in the group:Transfer Management Service
      this._Identifier="";

      //Skins
      //declaration for Close Text Skin in the group:Skins
      this._sknCloseText="";
      //declaration for Cancel Review Skin in the group:Skins
      this._sknCancelReview="";
      //declaration for Section TitleSkin in the group:Skins
      this._sknsectionTitle="";
      //declaration for FieldLabelSkin in the group:Skins
      this._sknfieldLabel="";
      //declaration for FieldValueSkin in the group:Skins
      this._sknfieldValue="";
      //declaration for PrimaryBtnSkin in the group:Skins
      this._sknPrimaryBtn="";
      //declaration for PrimaryBtnHoverSkin in the group:Skins
      this._sknPrimaryBtnHover="";
      //declaration for PrimaryBtnFocusSkin in the group:Skins
      this._primaryBtnFocusSkin="";
      //declaration for PrimaryBtnDisabledSkin in the group:Skins
      this._primaryBtnDisabledSkin="";
      //declaration for SecondaryBtnFocusSkin in the group:Skins
      this._secondaryBtnFocus="";
      //declaration for SecondaryBtnHoverSkin in the group:Skins
      this._sknsecondaryBtnHover="";
      //declaration for SecondayBtnSkin in the group:Skins
      this._sknsecondayBtn="";
      //declaration for BlockTitleSkin in the group:Skins
      this._sknBlockTitle="";    
      //declaration for JPEGIcon in the group: Icons
      this._JPEGIcon = "";
      //declaration for PDFIcon in the group: Icons
      this._PDFIcon = "";
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
      this.context = {};
      this.formScope="";
      this.parserUtilsManager = new ParserUtilsManager();
      this.ConfirmationUtility = new ConfirmationUtility();
      this.ConfirmationDAO = new ConfirmationDAO();

      //To set transfer type from context
      this.transferTypeContext = "";
      //To set Account type from context
      this.accountTypeContext = "";
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
            //setter method for Breakpoints in the group:Config
            defineSetter(this, 'BREAKPTS', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._BREAKPTS = val;
                }
            });
            //getter method for Breakpoints in the group:Config
            defineGetter(this, 'BREAKPTS', function () {
                return this._BREAKPTS;
            });
            //setter method for transferType Type  in the group:General
            defineSetter(this, 'transferType', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._transferType = val;
                }
            });
            //getter method for Transfer Type  in the group:General
            defineGetter(this, 'transferType', function () {
                return this._transferType;
            });
            //setter method for Transfer Flow in the group:General
            defineSetter(this, 'transferFlow', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._transferFlow = val;
                }
            });
            //getter method for Transfer Flow in the group:General
            defineGetter(this, 'transferFlow', function () {
                return this._transferFlow;
            });
            //setter method for payeeType Flow in the group:General
            defineSetter(this, 'payeeType', function (val) {
                if (typeof val == 'string' && val != '') {
                    this._payeeType = val;
                }
            });
            //getter method for payeeType Flow in the group:General
            defineGetter(this, 'payeeType', function () {
                return this._payeeType;
            });
            //setter method for TransferType in the group:general
            defineSetter(this, 'accountType', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._accountType = val;
                }
            });
            //getter method for TransferType in the group:general
            defineGetter(this, 'accountType', function () {
                return this._accountType;
            });
            //setter method for transactionSuccessMsg in the group:general
            defineSetter(this, 'transactionSuccessMsg', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._transactionSuccessMsg = val;
                }
            });
            //getter method for transactionSuccessMsg in the group:general
            defineGetter(this, 'transactionSuccessMsg', function () {
                return this._transactionSuccessMsg;
            });
            //setter method for transactionPendingMsg in the group:general
            defineSetter(this, 'transactionPendingMsg', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._transactionPendingMsg = val;
                }
            });
            //getter method for transactionPendingMsg in the group:general
            defineGetter(this, 'transactionPendingMsg', function () {
                return this._transactionPendingMsg;
            });
            //setter method for Block Title in the group:Confirmation Context
            defineSetter(this, 'reviewBlockTitle', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._reviewBlockTitle = val;
                }
            });
            //getter method for Block Title in the group:Confirmation Context
            defineGetter(this, 'reviewBlockTitle', function () {
                return this._reviewBlockTitle;
            });
            //setter method for Section Title in the group:Confirmation Context
            defineSetter(this, 'reviewSectionTitle', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._reviewSectionTitle = val;
                }
            });
            //getter method for Section Title in the group:Confirmation Context
            defineGetter(this, 'reviewSectionTitle', function () {
                return this._reviewSectionTitle;
            });
            //setter method for Field 1 Label in the group:Confirmation Context
            defineSetter(this, 'field1Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field1Label = val;
                }
            });
            //getter method for Field 1 Label in the group:Confirmation Context
            defineGetter(this, 'field1Label', function () {
                return this._field1Label;
            });
            //setter method for Field  1 Value in the group:Confirmation Context
            defineSetter(this, 'field1Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field1Value = val;
                }
            });
            //getter method for Field  1 Value in the group:Confirmation Context
            defineGetter(this, 'field1Value', function () {
                return this._field1Value;
            });
            //setter method for Field 2 Label  in the group:Confirmation Context
            defineSetter(this, 'field2Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field2Label = val;
                }
            });
            //getter method for Field 2 Label  in the group:Confirmation Context
            defineGetter(this, 'field2Label', function () {
                return this._field2Label;
            });
            //setter method for Field 2 Value  in the group:Confirmation Context
            defineSetter(this, 'field2Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field2Value = val;
                }
            });
            //getter method for Field 2 Value  in the group:Confirmation Context
            defineGetter(this, 'field2Value', function () {
                return this._field2Value;
            });
            //setter method for Field 3 Label  in the group:Confirmation Context
            defineSetter(this, 'field3Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field3Label = val;
                }
            });
            //getter method for Field 3 Label  in the group:Confirmation Context
            defineGetter(this, 'field3Label', function () {
                return this._field3Label;
            });
            //setter method for Field 3 Value  in the group:Confirmation Context
            defineSetter(this, 'field3Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field3Value = val;
                }
            });
            //getter method for Field 3 Value  in the group:Confirmation Context
            defineGetter(this, 'field3Value', function () {
                return this._field3Value;
            });
            //setter method for Field 4  Label  in the group:Confirmation Context
            defineSetter(this, 'field4Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field4Label = val;
                }
            });
            //getter method for Field 4  Label  in the group:Confirmation Context
            defineGetter(this, 'field4Label', function () {
                return this._field4Label;
            });
            //setter method for Field 4 Value  in the group:Confirmation Context
            defineSetter(this, 'field4Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field4Value = val;
                }
            });
            //getter method for Field 4 Value  in the group:Confirmation Context
            defineGetter(this, 'field4Value', function () {
                return this._field4Value;
            });
            //setter method for Field 5 Label  in the group:Confirmation Context
            defineSetter(this, 'field5Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field5Label = val;
                }
            });
            //getter method for Field 5 Label  in the group:Confirmation Context
            defineGetter(this, 'field5Label', function () {
                return this._field5Label;
            });
            //setter method for Field 5 Value  in the group:Confirmation Context
            defineSetter(this, 'field5Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field5Value = val;
                }
            });
            //getter method for Field 5 Value  in the group:Confirmation Context
            defineGetter(this, 'field5Value', function () {
                return this._field5Value;
            });
            //setter method for Field 6 Label  in the group:Confirmation Context
            defineSetter(this, 'field6Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field6Label = val;
                }
            });
            //getter method for Field 6 Label  in the group:Confirmation Context
            defineGetter(this, 'field6Label', function () {
                return this._field6Label;
            });
            //setter method for Field 6 Value  in the group:Confirmation Context
            defineSetter(this, 'field6Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field6Value = val;
                }
            });
            //getter method for Field 6 Value  in the group:Confirmation Context
            defineGetter(this, 'field6Value', function () {
                return this._field6Value;
            });
            //setter method for  Field 7 Label  in the group:Confirmation Context
            defineSetter(this, 'field7Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field7Label = val;
                }
            });
            //getter method for  Field 7 Label  in the group:Confirmation Context
            defineGetter(this, 'field7Label', function () {
                return this._field7Label;
            });
            //setter method for Field 7 Value   in the group:Confirmation Context
            defineSetter(this, 'field7Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field7Value = val;
                }
            });
            //getter method for Field 7 Value   in the group:Confirmation Context
            defineGetter(this, 'field7Value', function () {
                return this._field7Value;
            });
            //setter method for Field 8 Label  in the group:Confirmation Context
            defineSetter(this, 'field8Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field8Label = val;
                }
            });
            //getter method for Field 8 Label  in the group:Confirmation Context
            defineGetter(this, 'field8Label', function () {
                return this._field8Label;
            });
            //setter method for  Field 8 Value  in the group:Confirmation Context
            defineSetter(this, 'field8Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field8Value = val;
                }
            });
            //getter method for  Field 8 Value  in the group:Confirmation Context
            defineGetter(this, 'field8Value', function () {
                return this._field8Value;
            });
            //setter method for Field 9 Label   in the group:Confirmation Context
            defineSetter(this, 'field9Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field9Label = val;
                }
            });
            //getter method for Field 9 Label   in the group:Confirmation Context
            defineGetter(this, 'field9Label', function () {
                return this._field9Label;
            });
            //setter method for Field 9 Value    in the group:Confirmation Context
            defineSetter(this, 'field9Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field9Value = val;
                }
            });
            //getter method for Field 9 Value    in the group:Confirmation Context
            defineGetter(this, 'field9Value', function () {
                return this._field9Value;
            });
            //setter method for Field 10 Label in the group:Confirmation Context
            defineSetter(this, 'field10Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field10Label = val;
                }
            });
            //getter method for Field 10 Label in the group:Confirmation Context
            defineGetter(this, 'field10Label', function () {
                return this._field10Label;
            });
            //setter method for Field 10 Value    in the group:Confirmation Context
            defineSetter(this, 'field10Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field10Value = val;
                }
            });
            //getter method for Field 10 Value    in the group:Confirmation Context
            defineGetter(this, 'field10Value', function () {
                return this._field10Value;
            });
            //setter method for Field 11 Label  in the group:Confirmation Context
            defineSetter(this, 'field11Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field11Label = val;
                }
            });
            //getter method for Field 11 Label  in the group:Confirmation Context
            defineGetter(this, 'field11Label', function () {
                return this._field11Label;
            });
            //setter method for Field 11 Value  in the group:Confirmation Context
            defineSetter(this, 'field11Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field11Value = val;
                }
            });
            //getter method for Field 11 Value  in the group:Confirmation Context
            defineGetter(this, 'field11Value', function () {
                return this._field11Value;
            });
            //setter method for  Field 12 Label   in the group:Confirmation Context
            defineSetter(this, 'field12Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field12Label = val;
                }
            });
            //getter method for  Field 12 Label   in the group:Confirmation Context
            defineGetter(this, 'field12Label', function () {
                return this._field12Label;
            });
            //setter method for Field 12 Value  in the group:Confirmation Context
            defineSetter(this, 'field12Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field12Value = val;
                }
            });
            //getter method for Field 12 Value  in the group:Confirmation Context
            defineGetter(this, 'field12Value', function () {
                return this._field12Value;
            });
            //setter method for Field 13 Label   in the group:Confirmation Context
            defineSetter(this, 'field13Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field13Label = val;
                }
            });
            //getter method for Field 13 Label   in the group:Confirmation Context
            defineGetter(this, 'field13Label', function () {
                return this._field13Label;
            });
            //setter method for Field 13 Value  in the group:Confirmation Context
            defineSetter(this, 'field13Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field13Value = val;
                }
            });
            //getter method for Field 13 Value  in the group:Confirmation Context
            defineGetter(this, 'field13Value', function () {
                return this._field13Value;
            });
            //setter method for  Field 14 Label     in the group:Confirmation Context
            defineSetter(this, 'field14Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field14Label = val;
                }
            });
            //getter method for  Field 14 Label     in the group:Confirmation Context
            defineGetter(this, 'field14Label', function () {
                return this._field14Label;
            });
            //setter method for Field 14 Value in the group:Confirmation Context
            defineSetter(this, 'field14Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field14Value = val;
                }
            });
            //getter method for Field 14 Value in the group:Confirmation Context
            defineGetter(this, 'field14Value', function () {
                return this._field14Value;
            });
            //setter method for Field 15 Label   in the group:Confirmation Context
            defineSetter(this, 'field15Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field15Label = val;
                }
            });
            //getter method for Field 15 Label   in the group:Confirmation Context
            defineGetter(this, 'field15Label', function () {
                return this._field15Label;
            });
            //setter method for Field 15 Value  in the group:Confirmation Context
            defineSetter(this, 'field15Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field15Value = val;
                }
            });
            //getter method for Field 15 Value  in the group:Confirmation Context
            defineGetter(this, 'field15Value', function () {
                return this._field15Value;
            });
            //setter method for Field 16 Label  in the group:Confirmation Context
            defineSetter(this, 'field16Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field16Label = val;
                }
            });
            //getter method for Field 16 Label  in the group:Confirmation Context
            defineGetter(this, 'field16Label', function () {
                return this._field16Label;
            });
            //setter method for Field 16 Value     in the group:Confirmation Context
            defineSetter(this, 'field16Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field16Value = val;
                }
            });
            //getter method for Field 16 Value     in the group:Confirmation Context
            defineGetter(this, 'field16Value', function () {
                return this._field16Value;
            });
            //setter method for Field 17 Label   in the group:Confirmation Context
            defineSetter(this, 'field17Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field17Label = val;
                }
            });
            //getter method for Field 17 Label   in the group:Confirmation Context
            defineGetter(this, 'field17Label', function () {
                return this._field17Label;
            });
            //setter method for Field 17 Value in the group:Confirmation Context
            defineSetter(this, 'field17Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field17Value = val;
                }
            });
            //getter method for Field 17 Value in the group:Confirmation Context
            defineGetter(this, 'field17Value', function () {
                return this._field17Value;
            });
            //setter method for Field 18 Label    in the group:Confirmation Context
            defineSetter(this, 'field18Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field18Label = val;
                }
            });
            //getter method for Field 18 Label    in the group:Confirmation Context
            defineGetter(this, 'field18Label', function () {
                return this._field18Label;
            });
            //setter method for Field 18 Value in the group:Confirmation Context
            defineSetter(this, 'field18Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field18Value = val;
                }
            });
            //getter method for Field 18 Value in the group:Confirmation Context
            defineGetter(this, 'field18Value', function () {
                return this._field18Value;
            });
            //setter method for Field 19 Label  in the group:Confirmation Context
            defineSetter(this, 'field19Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field19Label = val;
                }
            });
            //getter method for Field 19 Label  in the group:Confirmation Context
            defineGetter(this, 'field19Label', function () {
                return this._field19Label;
            });
            //setter method for Field 19 Value  in the group:Confirmation Context
            defineSetter(this, 'field19Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field19Value = val;
                }
            });
            //getter method for Field 19 Value  in the group:Confirmation Context
            defineGetter(this, 'field19Value', function () {
                return this._field19Value;
            });
            //setter method for Field 20 Label  in the group:Confirmation Context
            defineSetter(this, 'field20Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field20Label = val;
                }
            });
            //getter method for Field 20 Label  in the group:Confirmation Context
            defineGetter(this, 'field20Label', function () {
                return this._field20Label;
            });
            //setter method for Field 20 Value in the group:Confirmation Context
            defineSetter(this, 'field20Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field20Value = val;
                }
            });
            //getter method for Field 20 Value in the group:Confirmation Context
            defineGetter(this, 'field20Value', function () {
                return this._field20Value;
            });
            //setter method for Field 25 Label  in the group:Confirmation Context
            defineSetter(this, 'field25Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field25Label = val;
                }
            });
            //getter method for Field 25 Label  in the group:Confirmation Context
            defineGetter(this, 'field25Label', function () {
                return this._field25Label;
            });
            //setter method for Field 25 Value in the group:Confirmation Context
            defineSetter(this, 'field25Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field25Value = val;
                }
            });
            //getter method for Field 25 Value in the group:Confirmation Context
            defineGetter(this, 'field25Value', function () {
                return this._field25Value;
            });
            //setter method for Field 26 Label  in the group:Confirmation Context
            defineSetter(this, 'field26Label', function (val) {
              if (typeof val === 'string' && val !== '') {
                  this._field26Label = val;
              }
          });
          //getter method for Field 26 Label  in the group:Confirmation Context
          defineGetter(this, 'field26Label', function () {
              return this._field26Label;
          });
          //setter method for Field 26 Value in the group:Confirmation Context
          defineSetter(this, 'field26Value', function (val) {
              if (typeof val === 'string' && val !== '') {
                  this._field26Value = val;
              }
          });
          //getter method for Field 26 Value in the group:Confirmation Context
          defineGetter(this, 'field26Value', function () {
              return this._field26Value;
          });
          //setter method for Field 27 Label  in the group:Confirmation Context
          defineSetter(this, 'field27Label', function (val) {
            if (typeof val === 'string' && val !== '') {
                this._field27Label = val;
            }
        });
        //getter method for Field 27 Label  in the group:Confirmation Context
        defineGetter(this, 'field27Label', function () {
            return this._field27Label;
        });
        //setter method for Field 27 Value in the group:Confirmation Context
        defineSetter(this, 'field27Value', function (val) {
            if (typeof val === 'string' && val !== '') {
                this._field27Value = val;
            }
        });
        //getter method for Field 27 Value in the group:Confirmation Context
        defineGetter(this, 'field27Value', function () {
            return this._field27Value;
        });
            //setter method for Charges Breakdown Label  in the group:Confirmation Context
            defineSetter(this, 'chargesBreakdownLabel', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._chargesBreakdownLabel = val;
                }
            });
            //getter method for Charges Breakdown Label  in the group:Confirmation Context
            defineGetter(this, 'chargesBreakdownLabel', function () {
                return this._chargesBreakdownLabel;
            });
            //setter method for charges  in the group:Confirmation Context
            defineSetter(this, 'chargeValue', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._chargeValue = val;
                }
            });
            //getter method for charges  in the group:Confirmation Context
            defineGetter(this, 'chargeValue', function () {
                return this._chargeValue;
            });
            //setter method for Button1 in the group:Confirmation Context
            defineSetter(this, 'button1', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._button1 = val;
                }
            });
            //getter method for Button1 in the group:Confirmation Context
            defineGetter(this, 'button1', function () {
                return this._button1;
            });
            //setter method for Button2 in the group:Confirmation Context
            defineSetter(this, 'button2', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._button2 = val;
                }
            });
            //getter method for Button2 in the group:Confirmation Context
            defineGetter(this, 'button2', function () {
                return this._button2;
            });
            //setter method for Button3 in the group:Confirmation Context
            defineSetter(this, 'button3', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._button3 = val;
                }
            });
            //getter method for Button3 in the group:Confirmation Context
            defineGetter(this, 'button3', function () {
                return this._button3;
            });
            //setter method for Button4 in the group:Confirmation Context
            defineSetter(this, 'button4', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._button4 = val;
                }
            });
            //getter method for Button4 in the group:Confirmation Context
            defineGetter(this, 'button4', function () {
                return this._button4;
            });
            //setter method for Field 21 Label     in the group:Payee Address Details
            defineSetter(this, 'field21Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field21Label = val;
                }
            });
            //getter method for Field 21 Label     in the group:Payee Address Details
            defineGetter(this, 'field21Label', function () {
                return this._field21Label;
            });
            //setter method for Field 21 Value  in the group:Payee Address Details
            defineSetter(this, 'field21Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field21Value = val;
                }
            });
            //getter method for Field 21 Value  in the group:Payee Address Details
            defineGetter(this, 'field21Value', function () {
                return this._field21Value;
            });
            //setter method for Field 22 Label   in the group:Payee Address Details
            defineSetter(this, 'field22Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field22Label = val;
                }
            });
            //getter method for Field 22 Label   in the group:Payee Address Details
            defineGetter(this, 'field22Label', function () {
                return this._field22Label;
            });
            //setter method for Field 22 Value    in the group:Payee Address Details
            defineSetter(this, 'field22Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field22Value = val;
                }
            });
            //getter method for Field 22 Value    in the group:Payee Address Details
            defineGetter(this, 'field22Value', function () {
                return this._field22Value;
            });
            //setter method for Field 24 Label in the group:Confirmation
            defineSetter(this, "field24Label", function(val) {
              if((typeof val==='string') && (val !== "")){
                this._field24Label=val;
              }
            });

          //getter method for Field 24 Label in the group:Confirmation
          defineGetter(this, "field24Label", function() {
            return this._field24Label;
          });

          //setter method for Field 24 Value in the group:Confirmation
          defineSetter(this, "field24Value", function(val) {
            if((typeof val==='string') && (val !== "")){
              this._field24Value=val;
            }
          });

          //getter method for Field 24 Value in the group:Confirmation
          defineGetter(this, "field24Value", function() {
            return this._field24Value;
          });
            //setter method for Address Label in the group:Payee Address Details
            defineSetter(this, 'addressLabel', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._addressLabel = val;
                }
            });
            //getter method for Address Label in the group:Payee Address Details
            defineGetter(this, 'addressLabel', function () {
                return this._addressLabel;
            });
            //setter method for Address Value1 in the group:Payee Address Details
            defineSetter(this, 'addressValue1', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._addressValue1 = val;
                }
            });
            //getter method for Address Value1 in the group:Payee Address Details
            defineGetter(this, 'addressValue1', function () {
                return this._addressValue1;
            });
            //setter method for Address Value2 in the group:Payee Address Details
            defineSetter(this, 'addressValue2', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._addressValue2 = val;
                }
            });
            //getter method for Address Value2 in the group:Payee Address Details
            defineGetter(this, 'addressValue2', function () {
                return this._addressValue2;
            });
            //setter method for Address Value3 in the group:Payee Address Details
            defineSetter(this, 'addressValue3', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._addressValue3 = val;
                }
            });
            //getter method for Address Value3 in the group:Payee Address Details
            defineGetter(this, 'addressValue3', function () {
                return this._addressValue3;
            });
            //setter method for Address Value4 in the group:Payee Address Details
            defineSetter(this, 'addressValue4', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._addressValue4 = val;
                }
            });
            //getter method for Address Value4 in the group:Payee Address Details
            defineGetter(this, 'addressValue4', function () {
                return this._addressValue4;
            });
            //setter method for Address Value5 in the group:Payee Address Details
            defineSetter(this, 'addressValue5', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._addressValue5 = val;
                }
            });
            //getter method for Address Value5 in the group:Payee Address Details
            defineGetter(this, 'addressValue5', function () {
                return this._addressValue5;
            });
            //setter method for Address Value6 in the group:Payee Address Details
            defineSetter(this, 'addressValue6', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._addressValue6 = val;
                }
            });
            //getter method for Address Value6 in the group:Payee Address Details
            defineGetter(this, 'addressValue6', function () {
                return this._addressValue6;
            });
            //setter method for Section TitleSkin in the group:Skins
            defineSetter(this, 'sknsectionTitle', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknsectionTitle = val;
                }
            });
            //Supporting documents
            //setter method for Supporting Document1 in the group:Confirmation Context
            defineSetter(this, 'supportingDocumentLabel', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._supportingDocumentLabel = val;
                }
            });
            //getter method for Supporting Document1 in the group:Confirmation Context
            defineGetter(this, 'supportingDocumentLabel', function () {
                return this._supportingDocumentLabel;
            });
            //getter method for attachedFileList in the group:Confirmation Context
            defineSetter(this, 'attachedFileList', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._attachedFileList = val;
                }
            });
            //getter method for attachedFileList in the group:Confirmation Context
            defineGetter(this, 'attachedFileList', function () {
                return this._attachedFileList;
            });
            //Popup
            //setter method for Close Text in the group:Popup 
            defineSetter(this, 'closeText', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._closeText = val;
                }
            });
            //getter method for Close Text in the group:Popup 
            defineGetter(this, 'closeText', function () {
                return this._closeText;
            });
            //setter method for Button Yes in the group:Popup 
            defineSetter(this, 'buttonYes', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._buttonYes = val;
                }
            });
            //getter method for Button Yes in the group:Popup 
            defineGetter(this, 'buttonYes', function () {
                return this._buttonYes;
            });
            //setter method for Button No in the group:Popup 
            defineSetter(this, 'buttonNo', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._buttonNo = val;
                }
            });
            //getter method for Button No in the group:Popup 
            defineGetter(this, 'buttonNo', function () {
                return this._buttonNo;
            });
            //setter method for Cancel Review Text in the group:Popup 
            defineSetter(this, 'cancelReviewText', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._cancelReviewText = val;
                }
            });
            //getter method for Cancel Review Text in the group:Popup 
            defineGetter(this, 'cancelReviewText', function () {
                return this._cancelReviewText;
            });
            //setter method for Object Service Name in the group:Transfer Management Service
            defineSetter(this, 'ObjectServiceName', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._ObjectServiceName = val;
                }
            });
            //getter method for Object Service Name in the group:Transfer Management Service
            defineGetter(this, 'ObjectServiceName', function () {
                return this._ObjectServiceName;
            });
            //setter method for Object Name in the group:Transfer Management Service
            defineSetter(this, 'ObjectName', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._ObjectName = val;
                }
            });
            //getter method for Object Name in the group:Transfer Management Service
            defineGetter(this, 'ObjectName', function () {
                return this._ObjectName;
            });
            //setter method for Operation Name in the group:Transfer Management Service
            defineSetter(this, 'OperationName', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._OperationName = val;
                }
            });
            //getter method for Operation Name in the group:Transfer Management Service
            defineGetter(this, 'OperationName', function () {
                return this._OperationName;
            });
            //setter method for Criteria in the group:Transfer Management Service
            defineSetter(this, 'Criteria', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._Criteria = val;
                }
            });
            //getter method for Criteria in the group:Transfer Management Service
            defineGetter(this, 'Criteria', function () {
                return this._Criteria;
            });
            //setter method for Identifier in the group:Transfer Management Service
            defineSetter(this, 'Identifier', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._Identifier = val;
                }
            });
            //getter method for Identifier in the group:Transfer Management Service
            defineGetter(this, 'Identifier', function () {
                return this._Identifier;
            });
            //setter method for Cancel Review Skin in the group:Skins
            defineSetter(this, 'sknCancelReview', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknCancelReview = val;
                }
            });
            //getter method for Cancel Review Skin in the group:Skins
            defineGetter(this, 'sknCancelReview', function () {
                return this._sknCancelReview;
            });
            //setter method for Close Text Skin in the group:Skins
            defineSetter(this, 'sknCloseText', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknCloseText = val;
                }
            });
            //getter method for Close Text Skin in the group:Skins
            defineGetter(this, 'sknCloseText', function () {
                return this._sknCloseText;
            });
            //getter method for Section TitleSkin in the group:Skins
            defineGetter(this, 'sknsectionTitle', function () {
                return this._sknsectionTitle;
            });
            //setter method for FieldLabelSkin in the group:Skins
            defineSetter(this, 'sknfieldLabel', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknfieldLabel = val;
                }
            });
            //getter method for FieldLabelSkin in the group:Skins
            defineGetter(this, 'sknfieldLabel', function () {
                return this._sknfieldLabel;
            });
            //setter method for FieldValueSkin in the group:Skins
            defineSetter(this, 'sknfieldValue', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknfieldValue = val;
                }
            });
            //getter method for FieldValueSkin in the group:Skins
            defineGetter(this, 'sknfieldValue', function () {
                return this._sknfieldValue;
            });
            //setter method for PrimaryBtnSkin in the group:Skins
            defineSetter(this, 'sknPrimaryBtn', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknPrimaryBtn = val;
                }
            });
            //getter method for PrimaryBtnSkin in the group:Skins
            defineGetter(this, 'sknPrimaryBtn', function () {
                return this._sknPrimaryBtn;
            });
            //setter method for PrimaryBtnHoverSkin in the group:Skins
            defineSetter(this, 'sknPrimaryBtnHover', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknPrimaryBtnHover = val;
                }
            });
            //getter method for PrimaryBtnHoverSkin in the group:Skins
            defineGetter(this, 'sknPrimaryBtnHover', function () {
                return this._sknPrimaryBtnHover;
            });
            //setter method for PrimaryBtnFocusSkin in the group:Skins
            defineSetter(this, 'primaryBtnFocusSkin', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._primaryBtnFocusSkin = val;
                }
            });
            //getter method for PrimaryBtnFocusSkin in the group:Skins
            defineGetter(this, 'primaryBtnFocusSkin', function () {
                return this._primaryBtnFocusSkin;
            });
            //setter method for PrimaryBtnDisabledSkin in the group:Skins
            defineSetter(this, 'primaryBtnDisabledSkin', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._primaryBtnDisabledSkin = val;
                }
            });
            //getter method for PrimaryBtnDisabledSkin in the group:Skins
            defineGetter(this, 'primaryBtnDisabledSkin', function () {
                return this._primaryBtnDisabledSkin;
            });
            //setter method for SecondayBtnSkin in the group:Skins
            defineSetter(this, 'sknsecondayBtn', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknsecondayBtn = val;
                }
            });
            //getter method for SecondayBtnSkin in the group:Skins
            defineGetter(this, 'sknsecondayBtn', function () {
                return this._sknsecondayBtn;
            });
            //setter method for SecondaryBtnHoverSkin in the group:Skins
            defineSetter(this, 'sknsecondaryBtnHover', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknsecondaryBtnHover = val;
                }
            });
            //getter method for SecondaryBtnHoverSkin in the group:Skins
            defineGetter(this, 'sknsecondaryBtnHover', function () {
                return this._sknsecondaryBtnHover;
            });
            //setter method for SecondaryBtnFocusSkin in the group:Skins
            defineSetter(this, 'secondaryBtnFocus', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._secondaryBtnFocus = val;
                }
            });
            //getter method for SecondaryBtnFocusSkin in the group:Skins
            defineGetter(this, 'secondaryBtnFocus', function () {
                return this._secondaryBtnFocus;
            });
            //setter method for BlockTitleSkin in the group:Skins
            defineSetter(this, 'sknBlockTitle', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknBlockTitle = val;
                }
            });
            //getter method for BlockTitleSkin in the group:Skins
            defineGetter(this, 'sknBlockTitle', function () {
                return this._sknBlockTitle;
            });
            //setter method for PDFIcon in the group: Icons
            defineSetter(this, 'PDFIcon', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._PDFIcon = val;
                }
            });
            //getter method for PDFIcon in the group:Icons
            defineGetter(this, 'PDFIcon', function () {
                return this._PDFIcon;
            });
            //setter method for JPEGIcon in the group: Icons
            defineSetter(this, 'JPEGIcon', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._JPEGIcon = val;
                }
            });
            //getter method for JPEGIcon in the group:Icons
            defineGetter(this, 'JPEGIcon', function () {
                return this._JPEGIcon;
            });
//             //setter method for Row Expanded Skin in the group:Linked Payee Customer List Skins
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
        },

    /**
  * @api : preShow
  * Reponsible to retain the data for custom properties for multiple entries into the component
  * Invoke the DAO layer to collect information from the service.
  * @return : NA
  */
    preShow: function() {  
      //this.view.btnNo.toolTip = kony.i18n.getLocalizedString("i18n.SignatoryMatrix.No");
      //this.view.btnYes.toolTip = kony.i18n.getLocalizedString("i18n.SignatoryMatrix.Yes");
      this.setComponentConfigs();
      this.getTransferTypeFromContext();
      this.initActions();
    },
       /**
   * @api : on Key press 
   * Gets invoked when click on key and setfocus
   * @return : NA
   */
    onKeyPressCallBack: function(eventObject, eventPayload){
      if (eventPayload.keyCode === 27) {
        frm=kony.application.getCurrentForm();
        if (frm.flxPopup.isVisible === true) {
          frm.flxPopup.flxClosePopup.isModalContainer = false;
          frm.flxDialogs.setVisibility(false);
          frm.remove(frm.flxPopup);
          this.view.btnAction1.setFocus(true);
        }      
      }
    },
    
     /**
   * @api : setFocus
   * Gets invoked when click on skip to main content
   * @return : NA
   */
    setbtnFocus: function(){
      var scope = this;
      try {
        if (this.view.screenConfirm.isVisible === true) {
          this.view.screenConfirm.setFocusData();
        }
        else {
          this.view.btnAction3.setFocus(true);
        }
      } catch (err) {
        var errorObj = {
          "errorInfo" : "Error in setbtnFocus Method.",
          "error": err
        };
        scope.onError(errorObj);
      }    
    }, 
    /**
  * @api : postShow
  * event called after ui rendered on the screen, is a component life cycle event.
  * @return : NA
  */
    postShow : function(){         
      this.setUI();
      this.setSkins();
      this.setLinkPayeeDetails(); 
    },

    /**
  * @api : initActions
  * assigns actions to all the widgets
  * @return : NA
  */
    initActions: function() {      
      this.accountTypeContext = this.context["accountType"];
       this.view.btnAction1.accessibilityConfig =   {
        a11yLabel:"Cancel add new account process"
      };
      this.view.btnAction2.accessibilityConfig =   {
        a11yLabel:"Modify new account details"
      };
      this.view.btnAction3.accessibilityConfig = {
        a11yLabel:"Confirm new account details"
      };
      this.view.btnAction1.onClick =  this.actionHandler.bind(this,this.context,this._button1);
      this.view.btnAction2.onClick =  this.actionHandler.bind(this,this.context,this._button2);
      this.view.btnAction3.onClick =  this.actionHandler.bind(this,this.context,this._button3);
      this.view.btnAction4.onClick =  this.actionHandler.bind(this,this.context,this._button4);
      this.view.btnNo.onClick =  this.cancelReviewNo;
      this.view.btnNo.onClick = this.cancelReviewYes;   
      this.view.flxValueDocName1.isVisible = false;
      this.view.flxValueDocName2.isVisible = false;
      this.view.flxValueDocName3.isVisible = false;
      this.view.flxValueDocName4.isVisible = false;
      this.view.flxValueDocName5.isVisible = false;
    },

    /**
     * Component getTransferTypeFromContext.
     * To set transfer type from the context object.
     */
    getTransferTypeFromContext :function(){
      try {
        this.transferTypeContext = this.parserUtilsManager.getParsedValue(this._transferType);
      } catch(err) {
        var errObj = {
          "errorInfo" : "Error in getTransferTypeFromContext method of the component.",
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
          else {
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
  * setUI
  *
  * parses the property and fetches the corresponding Value.
  */
    setUI :function (){
      var scope = this;
      this.view.lblHeader2.text = this.getLabelText(this._reviewBlockTitle);
      this.view.lblConfirmHeader.text = this.getLabelText(this._reviewSectionTitle);
      this.view.lblClose.text = this.getLabelText(this._closeText);
      this.view.lblCancel.text = this.getLabelText(this._cancelReviewText);
      // this.accountType = this.getParsedValue(this.getParsedValue(this._accountType).text);
      //Parse label question part
      for(var i=1 ; i<=27; i++){
        if(i === 23)continue;
        this.view["lblKey" +i].text = this.getLabelText(this["_field" +i+"Label"]);
      }//for label value part
      for(var j=1 ; j<=27; j++){
        if(j === 23)continue;
        var reviewValue = this.getParsedValue(this["_field" +j+"Value"]);
        if(reviewValue){
          this.view["lblValue"+j].isVisible = true;
          this.extractValuefromJSON(this["_field" +j+"Value"], "lblValue"+j,j);
        }
        //contract is empty,then hide that particular field flex
        else{
          this.view["flxConfirmDetail"+j].isVisible = false;
        }
      }
      var bankName;
      if(scope.context.transferType === this.getFieldValue(this._transferFlow, "T2")){
       bankName = scope.view.lblValue8.text;
      } else {
       bankName = scope.view.lblValue6.text
      }
      if(bankName.length > 105){
           bankName = bankName.substr(0,104) + "....";
       }
      if(scope.context.transferType === this.getFieldValue(this._transferFlow, "T2")){
        scope.view.lblValue8.text = bankName;
      } else if(scope.context.transferType === this.getFieldValue(this._transferFlow, "T3")){
        scope.view.lblValue6.text = bankName;
      }
      if(this.accountTypeContext!== this.getFieldValue(this._accountType, "AT1")){
        this.setDocumentsValue();  
        this.setAddress();
      }
      else{
        this.view.flxConfirmSupportingDocs.isVisible=false;
        this.view.flxSection2.isVisible = false;
        this.view.flxSeparator2.isVisible=false;
      }
      this.setChargesBreakdown();      
      this.populateButtonTexts();

    },
    /**
  * setDocumentsValue
  *@return : NA
  * Function to set the documents value to documents label
  */

    setDocumentsValue : function(){
      this.view.lblKeyDocumentName.text = this.getLabelText(this._supportingDocumentLabel);
      this.view.lblValueDocName1.text = kony.i18n.getLocalizedString("i18n.common.none");
      this.view.icon1.isVisible =  true;
      var documentName = this.getParsedValue(this._attachedFileList);
      var listOfDocuments = {};
      if(documentName){
        documentName = this.getParsedValue(documentName.text);
        if(documentName){
          listOfDocuments = documentName.split(",");
          for(var docIndex=0,j=1 ; j<=5; docIndex+=2,j++){
            if(j<=listOfDocuments.length/2){
              //  this.view["icon"+j].isVisible = true;
              this.view["lblValueDocName"+j].text = listOfDocuments[docIndex];
              this.view["icon"+j].src = listOfDocuments[docIndex+1];
              this.view["flxValueDocName"+j].isVisible = true;
            }else{
              this.view["flxValueDocName"+j].isVisible = false;
            }
          }
        }
        else{
          this.view.flxValueDocName1.isVisible = true;
          this.view.icon1.isVisible =  false;
          this.view.lblValueDocName1.left = "0dp";
          this.view.flxValueDocName1.top = "0dp";
          this.view.flxValue21.top = "0dp";
        }
      } 
      else{this.view.flxConfirmSupportingDocs = false;}
    },

    /**
     * setAddress
     * @api : setAddress
     * Set address details based on contracts
     * @return : NA
     */
    setAddress : function(){
      var address = "";
      var showAddress = false;     
      this.view.lblKey23.text = this.getLabelText(this._addressLabel);
      for(var i=1;i<=6;i++){
        var parsedJSON = this.getParsedValue(this["addressValue"+i]);
        if (parsedJSON){
          showAddress = true;
          var parsedText = this.getParsedValue(parsedJSON.text);
          if(parsedText){
            if(address) {
              if(i%2==1)
                 address = address + "\n" + parsedText;
              else
                address = address + ", " + parsedText;
            }
            else 
              address= parsedText;
          }
        }
      }
      if(address === "") 
        this.view.lblValue23.text = kony.i18n.getLocalizedString("i18n.common.none");
      else 
        this.view.lblValue23.text = address; 
      if(!showAddress)
        this.view.flxConfirmDetail23.isVisible = false;
      if(!showAddress && this.getParsedValue(this._field21Value)==="" && this.getParsedValue(this._field22Value)===""){
        this.view.flxSection2.isVisible = false;
        this.view.flxSeparator2.isVisible=false;
      }
    },
    /**
     * setChargesBreakdown
     * @api : setChargesBreakdown
     * Set charges breakdown field values based on contracts
     * @return : NA
     */
    setChargesBreakdown : function(){
      try{
        this.view.flxConfirmChargesBreakdown.setVisibility(true);
        this.view.lblKeyCharges.text = this.getLabelText(this._chargesBreakdownLabel);
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
                this.view["flxValueField"+j].isVisible = true;
              }
              else
                this.view["flxValueField"+j].isVisible = false;
            }
          }else
            this.view.flxConfirmChargesBreakdown.isVisible = false;
        }else
          this.view.flxConfirmChargesBreakdown.setVisibility(false);

      } catch(err){
        var errorObj =
            {
              "errorInfo" : "Error in Charges breakdown method of the component",
              "errorLevel" : "Business",
              "error": err
            };

      }
    },

    getLabelText: function(contractJSON) {

      let labelText = this.getParsedValue(contractJSON,kony.application.getCurrentBreakpoint());
      return labelText ? labelText : "";
    },
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
    setContext: function(context, scope) {
      this.context = context;      
      if(this.formScope === ""){
        this.formScope = scope;
      }
      this.parserUtilsManager.clearContext();
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
    getParsedImageValue: function(contractJSON){
      try{
        contractJSON = JSON.parse(contractJSON);
        if(contractJSON.hasOwnProperty("img")){
          contractJSON = contractJSON["img"];
        }
      }
      catch(err){
        var errorObj =
            {
              "errorInfo" : "Error in getting the parsed icon value",
              "errorLevel" : "Business",
              "error": err
            };

      }
      return contractJSON;
    },
    /**
     * @api : extractValuefromJSON
     * Parse the value from contract and set the  value to respective widget and hide the widget if returns undefined.
     * 
     * @return : NA
     */
    extractValuefromJSON : function(JSON, widget,index) {
      this.view["flxConfirmDetail"+index].isVisible = true;
      var lblValueJSON = this.getParsedValue(JSON);
      var lblValue,isOptionalField;
      if(lblValueJSON) {
        lblValue = this.getParsedValue(lblValueJSON.text);
        isOptionalField = this.getParsedValue(lblValueJSON.isOptionalField);                
        if(lblValue === "" && isOptionalField){
          this.view["flxConfirmDetail"+index].isVisible = true;
          this.view[widget].text = kony.i18n.getLocalizedString("i18n.common.none");
        }
        else if(lblValue === ""){
          this.view["flxConfirmDetail"+index].isVisible = false;
        }
        else if(lblValue){
          this.view[widget].text = lblValue;
          this.view["flxConfirmDetail"+index].isVisible = true;
        }
      }
      else
        this.view["flxConfirmDetail"+index].isVisible = false; 
    },

    /**
  * setComponentConfigs
  *
  * responsible for sending componentContext passed into parserUtilManager.
  */
    setComponentConfigs: function() {
      this.parserUtilsManager.setBreakPointConfig(JSON.parse(this._BREAKPTS));
    },
    /**
  * populateButtonTexts
  *
  *  populates button texts from contracts
  */
    populateButtonTexts: function() {
      var self = this;
      try{
        var parsedValue6 = this.ConfirmationUtility.buttonParsedValue(this._button4);
        if(parsedValue6){
          var btn4Text = this.setButtonText(parsedValue6);
          this.view.btnAction4.text = btn4Text;
          //this.view.btnAction4.toolTip = btn4Text;
          this.view.btnAction4.setVisibility(true);
        }else{
          this.view.btnAction4.setVisibility(false);
        }
        var parsedValue1 = this.ConfirmationUtility.buttonParsedValue(this._button3);
        if(parsedValue1){
          var btn3Text = this.setButtonText(parsedValue1);
          this.view.btnAction3.text = btn3Text;
          //this.view.btnAction3.toolTip = btn3Text;
          this.view.btnAction3.setVisibility(true);
        }else{
          this.view.btnAction3.setVisibility(false);
        }
        var parsedValue2 = this.ConfirmationUtility.buttonParsedValue(this._button2);
        if(parsedValue2){
          var btn2Text = this.setButtonText(parsedValue2);
          this.view.btnAction2.text = btn2Text;
          //this.view.btnAction2.toolTip = btn2Text;
          this.view.btnAction2.setVisibility(true);
        }else{
          this.view.btnAction2.setVisibility(false);
        }
        var parsedValue3 = this.ConfirmationUtility.buttonParsedValue(this._button1);
        if(parsedValue3){
          var btn1Text = this.setButtonText(parsedValue3);
          this.view.btnAction1.text = btn1Text;
          //this.view.btnAction1.toolTip = btn1Text;
          this.view.btnAction1.setVisibility(true);
        }else{
          this.view.btnAction1.setVisibility(false);
        }
        var parsedValue4 = this.ConfirmationUtility.buttonParsedValue(this._buttonYes);
        if(parsedValue4){
          var btnYesText = this.setButtonText(parsedValue4);
          this.view.btnYes.text = btnYesText;

        }
        var parsedValue5 = this.ConfirmationUtility.buttonParsedValue(this._buttonNo);
        if(parsedValue5){
          var btnNoText = this.setButtonText(parsedValue5);
          this.view.btnNo.text = btnNoText;
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
  *  setButtonText method for parsing button text.
  */
    setButtonText: function(value) {
      var self = this;
      try{
        var parsedValue=value;
        if (typeof(parsedValue) !== "string") {
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
         * getParsedTextValue
         *
         * parses the property and fetches the corresponding Text.
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
         * setSkins
         *
         * Method to get the skin value from contract and assign values to widgets
         */
    setSkins : function(){
      try{
        for(var i=1 ; i<=27; i++){ 
          this.view["lblKey" +i].skin = this.getParsedValue(this._sknfieldLabel, kony.application.getCurrentBreakpoint());   
          this.view["lblValue" +i].skin = this.getParsedValue(this._sknfieldValue, kony.application.getCurrentBreakpoint());
        }
        this.view.lblKeyCharges.skin = this.getParsedValue(this._sknfieldLabel, kony.application.getCurrentBreakpoint());
        for(var k=1 ; k<=4; k++){
          this.view["lblCharge" +k].skin = this.getParsedValue(this._sknfieldValue, kony.application.getCurrentBreakpoint());
          this.view["lblChargeValue" +k].skin = this.getParsedValue(this._sknfieldValue, kony.application.getCurrentBreakpoint());
        }
        this.view.lblKeyDocumentName.skin = this.getParsedValue(this._sknfieldLabel, kony.application.getCurrentBreakpoint());
        for(var index=1 ; index<=5; index++){
          this.view["lblValueDocName" +index].skin = this.getParsedValue(this._sknfieldValue, kony.application.getCurrentBreakpoint());
        }

        this.view.lblHeader2.skin = this.getParsedValue(this._sknBlockTitle, kony.application.getCurrentBreakpoint());
        this.view.lblConfirmHeader.skin = this.getParsedValue(this._sknsectionTitle, kony.application.getCurrentBreakpoint());
        this.view.btnAction3.skin = this.ConfirmationUtility.breakPointParser
        (this._sknPrimaryBtn, kony.application.getCurrentBreakpoint());
        this.view.btnAction4.skin = this.ConfirmationUtility.breakPointParser
        (this._sknPrimaryBtn, kony.application.getCurrentBreakpoint());

        this.view.btnAction4.focusSkin = this.ConfirmationUtility.breakPointParser
        (this._primaryBtnFocusSkin, kony.application.getCurrentBreakpoint());
        this.view.btnAction3.focusSkin = this.ConfirmationUtility.breakPointParser
        (this._primaryBtnFocusSkin, kony.application.getCurrentBreakpoint());
        this.view.btnAction3.hoverSkin = this.ConfirmationUtility.breakPointParser
        (this._sknPrimaryBtnHover, kony.application.getCurrentBreakpoint());
        this.view.btnAction2.skin = this.ConfirmationUtility.breakPointParser
        (this._sknsecondayBtn, kony.application.getCurrentBreakpoint());
        this.view.btnAction2.focusSkin = this.ConfirmationUtility.breakPointParser
        (this._secondaryBtnFocus, kony.application.getCurrentBreakpoint());
        this.view.btnAction2.hoverSkin = this.ConfirmationUtility.breakPointParser
        (this._sknsecondaryBtnHover, kony.application.getCurrentBreakpoint());
        this.view.btnAction1.skin = this.ConfirmationUtility.breakPointParser
        (this._sknsecondayBtn, kony.application.getCurrentBreakpoint());
        this.view.btnAction1.focusSkin = this.ConfirmationUtility.breakPointParser
        (this._secondaryBtnFocus, kony.application.getCurrentBreakpoint());
        this.view.btnAction1.hoverSkin = this.ConfirmationUtility.breakPointParser
        (this._sknsecondaryBtnHover, kony.application.getCurrentBreakpoint());
      }catch(err){
        var errObj = {
          "errorInfo" : "Error in setskins method of the component.",
          "error": err
        };
        self.onError(errObj);   
      }
    },
    /**
         * setScreenConfirmSkins
         *
         * Method to get the skin value from contract and send values to screen confirm component
         */
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
         *
         * Method to get button value from contract and pass level,context and method name accortingly
         */
    actionHandler : function(context,property){
      if(property!==null && property !== undefined){
        var propertyJSON = JSON.parse(property);
        var parsedValue=propertyJSON;
        if (typeof(parsedValue) !== "string") {
          parsedValue = parsedValue.hasOwnProperty("action") ? parsedValue["action"] : parsedValue;
        }  
        var actionJSON = parsedValue;
        var level = actionJSON.level;  
        var method = actionJSON.method;
        this.getInstanceAction(level,method,context);
      }
    },
    /**
         * getInstanceAction
         *
         *  Navigate to form or component based on levelInstance
         */
    getInstanceAction: function(levelInstance, method, context){     
      if(levelInstance.toLowerCase().trim() === "form")
      {  
        this.formScope[method](context);
      }
      if(levelInstance.toLowerCase().trim() === "component")
      {
        this[method](context);
      } 
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
         * showCancelPopup
         *
         *  Display cancel confirmation popup
         */
    showCancelPopup :function(){
      var scope = this;
      var form = kony.application.getCurrentForm();
      var popupObj = this.view.flxPopup.clone();
      form.flxDialogs.add(popupObj);
      form.flxDialogs.isVisible = true;
      form.flxLogout.isVisible = false;
      popupObj.flxClosePopup.accessibilityConfig = {
        "a11yARIA": {
          "tabindex": -1,
          "role": "dialog",
        }
      };
      popupObj.isVisible = true;  
      popupObj.top = "0dp";
      popupObj.left = "0dp";  
      popupObj.height = "100%";
      popupObj.flxClosePopup.doLayout = CommonUtilities.centerPopupFlex;
      //popupObj.flxClosePopup.centerY = "50%"; 
      popupObj.flxClosePopup.isModalContainer = true;
      popupObj.flxClosePopup.lblClose.setActive(true);
      popupObj.flxClosePopup.onKeyPress = this.onKeyPressCallBack;
      
      popupObj.flxClosePopup.flxClose.accessibilityConfig = {
        a11yLabel: "Close this cancel dialog",
        a11yARIA: {
          tabindex: 0,
          role: "button"
        }
      };
      popupObj.flxClosePopup.btnYes.accessibilityConfig = {
        a11yLabel: "Yes, cancel the process",
        a11yARIA: {
          tabindex: 0,
          role: "button"
        }
      };
      popupObj.flxClosePopup.btnNo.accessibilityConfig = {
        a11yLabel: "No, don't cancel the process",
        a11yARIA: {
          tabindex: 0,
          role: "button"
        }
      };
      popupObj.flxClosePopup.btnNo.onClick = function() { 
        popupObj.flxClosePopup.isModalContainer = false;
        form.flxDialogs.remove(popupObj);
        form.flxDialogs.isVisible = false;  
        form.flxLogout.isVisible = true;
        scope.view.btnAction1.setFocus(true);
      };
      popupObj.flxClosePopup.flxClose.onClick = function() {  
        popupObj.flxClosePopup.isModalContainer = false;
        form.flxDialogs.remove(popupObj);
        form.flxDialogs.isVisible = false;
        form.flxLogout.isVisible = true;
        scope.view.btnAction1.setFocus(true);
      };
      popupObj.flxClosePopup.btnYes.onClick = function() {   
        popupObj.flxClosePopup.isModalContainer = false;
        form.flxDialogs.remove(popupObj);
        form.flxDialogs.isVisible = false; 
        form.flxLogout.isVisible = true;
        scope.cancelReviewYes();
      };
      this.view.forceLayout(); 
  },

    modifyTransfer : function(){
      this.context.flowType = "edit";
      this.formScope["modifyTransfer"](this.context);
    },
    navToAck : function(context){
      this.formScope["navToack"](context);
    },
    confirmTransfer:function(context){  
      var self = this;
      var mfaParams = {"mfaFlowtType":"","mfaServiceID" : ""};
      var objSvcName = this.getParsedValue(this._ObjectServiceName);
      var objName = this.getParsedValue(this._ObjectName);
      var operationName = this.getParsedValue(this._OperationName);
      var criteria = this.getCriteria(this._Criteria);
      if(context.payeeType === this.getFieldValue(this._payeeType, "PT1")){
        objSvcName = objSvcName["New Payee"];
        objName = objName["New Payee"];
        operationName = operationName["New Payee"];
      }else{
        if(this.accountTypeContext!== this.getFieldValue(this._accountType, "AT1")){
        objSvcName = objSvcName["Existing Payee"];
        objName = objName["Existing Payee"];
        }
        operationName = operationName["Existing Payee"];
      }
      if (context.transferType === this.getFieldValue(this._transferFlow, "T1")) {  
        if(context.payeeType !== this.getFieldValue(this._payeeType, "PT1")){
          if(context.IsExternalAccount === true){
            operationName = operationName["external"];
            mfaParams.mfaServiceID = "INTRA_BANK_FUND_TRANSFER_CREATE";
            mfaParams.mfaFlowtType = "INTRA_BANK_FUND_TRANSFER_CREATE";
          }
          else{  
              if(this.accountTypeContext === this.getFieldValue(this._accountType, "AT1")){
                objSvcName = objSvcName["creditCard"];
                objName = objName["creditCard"];
                operationName = operationName["creditCard"];
              }
              else
                operationName = operationName["default"];  
          }
        } }
      else if (context.transferType === this.getFieldValue(this._transferFlow, "T2")) {       
        mfaParams.mfaServiceID = "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE";
        mfaParams.mfaFlowtType = "INTER_BANK_ACCOUNT_FUND_TRANSFER_CREATE";
      }
      else if (context.transferType === this.getFieldValue(this._transferFlow, "T3")) {
        mfaParams.mfaServiceID = "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE";
        mfaParams.mfaFlowtType = "INTERNATIONAL_ACCOUNT_FUND_TRANSFER_CREATE";
      }
      else if (context.transferType === this.getFieldValue(this._transferFlow, "T4")) {
        mfaParams.mfaServiceID = "";
        mfaParams.mfaFlowtType = "";
      }
      if(this.context.data){
      criteria.cif = this.view.screenConfirm.getCIFData();
      } else if(this.context.contractListData){
        var cif = [{
          "contractId": this.context.contractListData.contractList["contracts"][0].contractId,
          "coreCustomerId": this.context.contractListData.contractList["contracts"][0]["contractCustomers"][0].coreCustomerId
       }];
       criteria.cif = JSON.stringify(cif);
      }
      this.ConfirmationDAO.createServiceLogic(objSvcName,objName,operationName,criteria,onSuccess.bind(this),onError.bind(this));
      function onSuccess(response){
        var chargesList = [];
        if (response.charges) {
          chargesList = JSON.parse(response.charges);
          for(var i=0;i<chargesList.length ;i++){
            response["charge"+i+"Label"] = chargesList[i].chargeName;
            response["charge"+i+"Value"] = chargesList[i].chargeCurrency+ " "+chargesList[i].chargeAmount;
          }
        }
        var successMessage = this.getLabelText(this._transactionSuccessMsg);
        if (response.backendReferenceId && (response.status === "Sent" || response.status === "success")) {
          this.context.referenceId = response.backendReferenceId;
          this.context.acknowledgementText = response.message ? response.message : successMessage;
          this.context.serviceName = mfaParams.mfaServiceID;
          this.context.status = "Done";
          this.context.chargesDetails = chargesList;
          this.context.exchangeRate = response.exchangeRate;      
          this.formScope["confirmTransferSuccess"](this.context);
        } else if (response.referenceId &&  (response.status === "Sent" || response.status === "success")) {
          this.context.acknowledgementText = response.message ? response.message : successMessage;
          this.context.referenceId = response.referenceId;
          this.context.serviceName = mfaParams.mfaServiceID;
          this.context.status = "Done";
          this.context.chargesDetails = chargesList;
          this.context.exchangeRate = response.exchangeRate;
          this.formScope["confirmTransferSuccess"](this.context);

        }  else if(response.Id || response.PayPersonId){
          this.context.referenceId = response.Id ? response.Id : response.PayPersonId;
          this.context.acknowledgementText = response.message ? response.message : successMessage;
          this.context.serviceName = mfaParams.mfaServiceID;
          this.context.status = "Done";       
          this.formScope["confirmTransferSuccess"](this.context);
        } else if (response.status === "Pending") {
          var pendingMessage = this.getLabelText(this._transactionPendingMsg);
          this.context.referenceId = response.referenceId;
          //  this.transferData.serviceName = mfaManager.mfaServiceID();
          this.context.serviceName = mfaParams.mfaServiceID;
          this.context.acknowledgementText = response.message ? response.message : pendingMessage;
          this.context.status = response.status;
          this.context.chargesDetails = chargesList;
          this.context.exchangeRate = response.exchangeRate;      
          this.formScope["confirmTransferSuccess"](this.context);
        }else if(response.referenceId && response.transactionStatus === "Pending" ) {
          this.context.referenceId = response.referenceId;
          successMessage = kony.i18n.getLocalizedString("i18n.transfers.addNewAccountApprovalTitle");
          this.context.acknowledgementText = response.message ? response.message : successMessage;
          this.context.serviceName = mfaParams.mfaServiceID;
          this.context.status = "Done";       
          this.formScope["confirmTransferSuccess"](this.context);
        } else if (response.status === "Denied") {
          this.context.transferFail = response.message;         
          this.context.status = response.status;
          this.context.flowType = "edit";
          this.formScope["confirmTransferError"](this.context);
        } else if (response.errmsg) {
          this.context.transferFail = response.errmsg; 
          this.context.flowType = "edit";
          this.formScope["confirmTransferError"](this.context);
        }
        else if (response.dbpErrMsg) {
          this.context.transferFail = response.dbpErrMsg;  
          this.context.flowType = "edit";
          this.formScope["confirmTransferError"](this.context);
        }
        else if (response.MFAAttributes) {
          this.context.status = "Done";
          //    response["serviceName"] = operationName;
          this.context["serviceName"] = operationName;
          this.context["MFAAttributes"] = response.MFAAttributes;
          this.formScope["confirmTransferMFA"](this.context);		  
        }
      }
      function onError(errObj){
         kony.application.dismissLoadingScreen();
         this.formScope["onError"](errObj);
      }
    },

    cancelReviewNo : function(){
      this.view.flxPopup.isVisible = false;
      this.view.flxConfirmation.isVisible = true;
    },
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
     * @api : setLinkPayeeDetails
     * Method to hide/Show Link Payee section and to initialize this link payee component if it is visible
     * @return : NA
     */
    setLinkPayeeDetails : function(){
       if(this.context.data){
       this.setScreenConfirmSkins();
       this.view.screenConfirm.setContext(this.context);
       this.view.screenConfirm.initializeComponent();
       } else {
         this.view.screenConfirm.isVisible = false;
       }
    }

  };
});