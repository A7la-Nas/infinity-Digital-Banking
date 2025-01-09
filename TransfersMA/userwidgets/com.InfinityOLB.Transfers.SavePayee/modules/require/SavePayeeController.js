define(['./ParserUtilsManager', './SavePayeeUtility', './SavePayeeDAO', 'CommonUtilities'],function(ParserUtilsManager, SavePayeeUtility, SavePayeeDAO ,CommonUtilities) {

  var flexToDisplay = "confirmflex";
  var trustedPayee = "No";
  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      //declaration for Object Service Name in the group:SAVE PAYEE SERVICE
      this._objectServiceName="";

      //declaration for P2P Object Service Name in the group:SAVE PAYEE SERVICE
      this._objectServiceNameP2P="";

      //declaration for Breakpoints in the group:COMPONENT CONFIGS
      this._BREAKPTS="";

      //declaration for Confirmation Header1 in the group:CONFIRMATION FIELDS
      this._confirmationHeader1="";

      //declaration for Success Image in the group:IMAGES
      this._successImage="";

      //declaration for Confirmation Header1 Skin in the group:SKINS
      this._sknConfirmationHeader1="";

      //declaration for Acknowledgement Header1 in the group:ACKNOWLEDGEMENT FIELDS
      this._acknowledgementHeader1="";

      //declaration for Pop-up Heading in the group:POPUP
      this._popupHead="";

      //declaration for Address Line1 in the group:ADDRESS
      this._addressLine1="";

      //declaration for Account Number in the group:General
      this._accountNumber="";

      //declaration for Object Name in the group:SAVE PAYEE SERVICE
      this._objectName="";

      //declaration for P2P Object Name in the group:SAVE PAYEE SERVICE
      this._objectNameP2P="";

      //declaration for Confirmation Header2 in the group:CONFIRMATION FIELDS
      this._confirmationHeader2="";

      //declaration for Error Image in the group:IMAGES
      this._errorImage="";

      //declaration for Confirmation Header2 Skin in the group:SKINS
      this._sknConfirmationHeader2="";

      //declaration for Acknowledgement Header2 in the group:ACKNOWLEDGEMENT FIELDS
      this._acknowledgementHeader2="";

      //declaration for Pop-up Label in the group:POPUP
      this._popupLabel="";

      //declaration for Address Line2 in the group:ADDRESS
      this._addressLine2="";

      //declaration for Transfer Type in the group:General
      this._transferType="";

      //declaration for Transfer Flow in the group:General
      this._transferFlow="";

      //declaration for Operation Name in the group:SAVE PAYEE SERVICE
      this._operationName="";

      //declaration for P2P Operation Name in the group:SAVE PAYEE SERVICE
      this._operationNameP2P="";

      //declaration for Close Image in the group:IMAGES
      this._closeImage="";

      //declaration for Acknowledgement Header1 Skin in the group:SKINS
      this._sknAcknowledgementHeader1="";

      //declaration for Acknowledgement Message in the group:ACKNOWLEDGEMENT FIELDS
      this._acknowledgementMessage="";

      //declaration for Field1 Label in the group:CONFIRMATION FIELDS
      this._conField1Label="";

      //declaration for Pop-up Close Image in the group:POPUP
      this._popupClose="";

      //declaration for City in the group:ADDRESS
      this._city="";

      //declaration for IBAN in the group:General
      this._isIBAN="";

      //declaration for Same Bank Transfer Criteria in the group:SAVE PAYEE SERVICE
      this._sameBankTransferCriteria="";

      //declaration for Domestic Transfer Criteria in the group:SAVE PAYEE SERVICE
      this._domesticTransferCriteria="";

      //declaration for International Transfer Criteria in the group:SAVE PAYEE SERVICE
      this._internationalTransferCriteria="";

      //declaration for P2P Criteria1 in the group:SAVE PAYEE SERVICE
      this._criteria1P2P="";
      
      //declaration for P2P Criteria2 in the group:SAVE PAYEE SERVICE
      this._criteria2P2P="";

      //declaration for Field Label Skin in the group:SKINS
      this._sknFieldLabel="";

      //declaration for Reference Number Label in the group:ACKNOWLEDGEMENT FIELDS
      this._referenceNumberLabel="";

      //declaration for Field1 Value in the group:CONFIRMATION FIELDS
      this._conField1Value="";

      //declaration for Yes Button in the group:POPUP
      this._buttonYes="";

      //declaration for State in the group:ADDRESS
      this._state="";

      //declaration for Swift Code in the group:General
      this._swiftCode="";

      //declaration for Service Response Identifier in the group:SAVE PAYEE SERVICE
      this._serviceResponseIdentifier="";

      //declaration for P2P Service Response Identifier in the group:SAVE PAYEE SERVICE
      this._serviceResponseIdentifierP2P="";

      //declaration for Field Value Skin in the group:SKINS
      this._sknFieldValue="";

      //declaration for Reference Number Value in the group:ACKNOWLEDGEMENT FIELDS
      this._referenceNumberValue="";

      //declaration for Field2 Label in the group:CONFIRMATION FIELDS
      this._conField2Label="";

      //declaration for No Button in the group:POPUP
      this._buttonNo="";

      //declaration for Country in the group:ADDRESS
      this._country="";

      //declaration for Beneficiary Name in the group:General
      this._beneficiaryName="";

      //declaration for Placeholder Skin in the group:SKINS
      this._sknPlaceholder="";

      //declaration for Field2 Value in the group:CONFIRMATION FIELDS
      this._conField2Value="";

      //declaration for Field1 Label in the group:ACKNOWLEDGEMENT FIELDS
      this._ackField1Label="";

      //declaration for Zip Code in the group:ADDRESS
      this._zipCode="";

      //declaration for Bank Name in the group:General
      this._bankName="";

      //declaration for Acknowledgement Message Skin in the group:SKINS
      this._sknAcknowledgementMessage="";

      //declaration for Field3 Label in the group:CONFIRMATION FIELDS
      this._conField3Label="";

      //declaration for Field1 Value in the group:ACKNOWLEDGEMENT FIELDS
      this._ackField1Value="";

      //declaration for Phone Number in the group:General
      this._phoneNumber="";

      //declaration for Reference Number Label Skin in the group:SKINS
      this._sknReferenceNumberLabel="";

      //declaration for Field3 Label in the group:CONFIRMATION FIELDS
      this._conField3Value="";

      //declaration for Field2 Label in the group:ACKNOWLEDGEMENT FIELDS
      this._ackField2Label="";

      //declaration for Email in the group:General
      this._email="";

      //declaration for Reference Number Value Skin in the group:SKINS
      this._sknReferenceNumberValue="";

      //declaration for Field4 Label in the group:CONFIRMATION FIELDS
      this._conField4Label="";

      //declaration for Field2 Value in the group:ACKNOWLEDGEMENT FIELDS
      this._ackField2Value="";

      //declaration for Error Message1 Skin in the group:SKINS
      this._sknErrorMessage1="";

      //declaration for Field4 Value in the group:CONFIRMATION FIELDS
      this._conField4Value="";

      //declaration for Field3 Label in the group:ACKNOWLEDGEMENT FIELDS
      this._ackField3Label="";

      //declaration for Error Message2 Skin in the group:SKINS
      this._sknErrorMessage2="";

      //declaration for Field5 Label in the group:CONFIRMATION FIELDS
      this._conField5Label="";

      //declaration for Field3 Value in the group:ACKNOWLEDGEMENT FIELDS
      this._ackField3Value="";

      //declaration for Confirmation Button1 Skin in the group:SKINS
      this._sknConfirmationButton1="";

      //declaration for Field5  Value in the group:CONFIRMATION FIELDS
      this._conField5Value="";

      //declaration for Field4 Label in the group:ACKNOWLEDGEMENT FIELDS
      this._ackField4Label="";

      //declaration for Confirmation Button1 Hover Skin in the group:SKINS
      this._sknHoverConfirmationButton1="";

      //declaration for Field6 Label in the group:CONFIRMATION FIELDS
      this._conField6Label="";

      //declaration for Field4 Value in the group:ACKNOWLEDGEMENT FIELDS
      this._ackField4Value="";

      //declaration for Confirmation Button1 Focus Skin in the group:SKINS
      this._sknFocusConfirmationButton1="";

      //declaration for Field6 Value in the group:CONFIRMATION FIELDS
      this._conField6Value="";

      //declaration for Field5 Label in the group:ACKNOWLEDGEMENT FIELDS
      this._ackField5Label="";

      //declaration for Confirmation Button2 Skin in the group:SKINS
      this._sknConfirmationButton2="";

      //declaration for Field7 Label in the group:CONFIRMATION FIELDS
      this._conField7Label="";

      //declaration for Field5 Value in the group:ACKNOWLEDGEMENT FIELDS
      this._ackField5Value="";

      //declaration for Confirmation Button2 Hover Skin in the group:SKINS
      this._sknHoverConfirmationButton2="";

      //declaration for Field7 Value in the group:CONFIRMATION FIELDS
      this._conField7Value="";

      //declaration for Field6 Label in the group:ACKNOWLEDGEMENT FIELDS
      this._ackField6Label="";

      //declaration for Confirmation Button2 Focus Skin in the group:SKINS
      this._sknFocusConfirmationButton2="";

      //declaration for Error Message1 in the group:CONFIRMATION FIELDS
      this._errorMessage1="";

      //declaration for Field6 Value in the group:ACKNOWLEDGEMENT FIELDS
      this._ackField6Value="";

      //declaration for Acknowledgement Button1 Skin in the group:SKINS
      this._sknAcknowledgementButton1="";

      //declaration for Error Message2 in the group:CONFIRMATION FIELDS
      this._errorMessage2="";

      //declaration for Field7 Label in the group:ACKNOWLEDGEMENT FIELDS
      this._ackField7Label="";

      //declaration for Acknowledgement Button1 Hover Skin in the group:SKINS
      this._sknHoverAcknowledgementButton1="";

      //declaration for Confirmation Button1 in the group:CONFIRMATION FIELDS
      this._confirmationButton1="";

      //declaration for Field7 Value in the group:ACKNOWLEDGEMENT FIELDS
      this._ackField7Value="";

      //declaration for Acknowledgement Button1 Focus Skin in the group:SKINS
      this._sknFocusAcknowledgementButton1="";

      //declaration for Confirmation Button2 in the group:CONFIRMATION FIELDS
      this._confirmationButton2="";

      //declaration for Field8 Label in the group:ACKNOWLEDGEMENT FIELDS
      this._ackField8Label="";

      //declaration for Acknowledgement Button2 Skin in the group:SKINS
      this._sknAcknowledgementButton2="";

      //declaration for Field8 Value in the group:ACKNOWLEDGEMENT FIELDS
      this._ackField8Value="";

      //declaration for Check Box Label in the group:CONFIRMATION FIELDS
      this._checkBoxLabel="";

      //declaration for Acknowledgement Button2 Hover Skin in the group:SKINS
      this._sknHoverAcknowledgementButton2="";

      //declaration for Acknowledgement Button1 in the group:ACKNOWLEDGEMENT FIELDS
      this._acknowledgementButton1="";

      //declaration for Check Box Value in the group:CONFIRMATION FIELDS
      this._checkBoxValue="";

      //declaration for Acknowledgement Button2 Focus Skin in the group:SKINS
      this._sknFocusAcknowledgementButton2="";

      //declaration for Acknowledgement Button2 in the group:ACKNOWLEDGEMENT FIELDS
      this._acknowledgementButton2="";

      //declaration for Textbox Skin in the group:SKINS
      this._sknTextBox="";

      //declaration for Acknowledgement Header3 in the group:ACKNOWLEDGEMENT FIELDS
      this._acknowledgementHeader3="";

      //declaration for Acknowledgement Header2 Skin in the group:SKINS
      this._sknAcknowledgementHeader2="";

      //declaration for Field9 Label in the group:ACKNOWLEDGEMENT FIELDS
      this._ackField9Label="";

      //declaration for Acknowledgement Header3 Skin in the group:SKINS
      this._sknAcknowledgementHeader3="";

      //declaration for Field9 Value in the group:ACKNOWLEDGEMENT FIELDS
      this._ackField9Value="";

      //To set transfer type from context
      this.transferTypeContext = "";
      
      // to set the approval message of Ben
      this._acknowlegmentApprovalMessage = "";

      // Contracts property instance variables.
      this.parserUtilsManager = new ParserUtilsManager();
      this.savePayeeUtility = new SavePayeeUtility();
      this.savePayeeDAO = new SavePayeeDAO();

      this.formScope="";
      this.context = {};
      this.textInputsMapping = {};
      this.componentContext = {};

      this.CHECBOX_SELECTED = "C";
      this.CHECBOX_UNSELECTED = "D";
      this.CHECKBOX_UNSELECTED_SKIN = 'ICSknUnselectedCheckBox';
      this.CHECKBOX_SELECTED_SKIN = "sknlblDelete20px";

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
      //setter method for Object Service Name in the group:SAVE PAYEE SERVICE
      defineSetter(this, 'objectServiceName', function (val) {
        if (typeof val == 'string' && val != '') {
          this._objectServiceName = val;
        }
      });
      //getter method for Object Service Name in the group:SAVE PAYEE SERVICE
      defineGetter(this, 'objectServiceName', function () {
        return this._objectServiceName;
      });
      //setter method for P2P Object Service Name in the group:SAVE PAYEE SERVICE
      defineSetter(this, 'objectServiceNameP2P', function (val) {
        if (typeof val == 'string' && val != '') {
          this._objectServiceNameP2P = val;
        }
      });
      //getter method for P2P Object Service Name in the group:SAVE PAYEE SERVICE
      defineGetter(this, 'objectServiceNameP2P', function () {
        return this._objectServiceNameP2P;
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
      //setter method for Confirmation Header1 in the group:CONFIRMATION FIELDS
      defineSetter(this, 'confirmationHeader1', function (val) {
        if (typeof val == 'string' && val != '') {
          this._confirmationHeader1 = val;
        }
      });
      //getter method for Confirmation Header1 in the group:CONFIRMATION FIELDS
      defineGetter(this, 'confirmationHeader1', function () {
        return this._confirmationHeader1;
      });
      //setter method for Success Image in the group:IMAGES
      defineSetter(this, 'successImage', function (val) {
        if (typeof val == 'string' && val != '') {
          this._successImage = val;
        }
      });
      //getter method for Success Image in the group:IMAGES
      defineGetter(this, 'successImage', function () {
        return this._successImage;
      });
      //setter method for Confirmation Header1 Skin in the group:SKINS
      defineSetter(this, 'sknConfirmationHeader1', function (val) {
        if (typeof val == 'string' && val != '') {
          this._sknConfirmationHeader1 = val;
        }
      });
      //getter method for Confirmation Header1 Skin in the group:SKINS
      defineGetter(this, 'sknConfirmationHeader1', function () {
        return this._sknConfirmationHeader1;
      });
      //setter method for Acknowledgement Header1 in the group:ACKNOWLEDGEMENT FIELDS
      defineSetter(this, 'acknowledgementHeader1', function (val) {
        if (typeof val == 'string' && val != '') {
          this._acknowledgementHeader1 = val;
        }
      });
      //getter method for Acknowledgement Header1 in the group:ACKNOWLEDGEMENT FIELDS
      defineGetter(this, 'acknowledgementHeader1', function () {
        return this._acknowledgementHeader1;
      });
      //setter method for Pop-up Heading in the group:POPUP
      defineSetter(this, 'popupHead', function (val) {
        if (typeof val == 'string' && val != '') {
          this._popupHead = val;
        }
      });
      //getter method for Pop-up Heading in the group:POPUP
      defineGetter(this, 'popupHead', function () {
        return this._popupHead;
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
      //setter method for Account Number in the group:General
      defineSetter(this, 'accountNumber', function (val) {
        if (typeof val == 'string' && val != '') {
          this._accountNumber = val;
        }
      });
      //getter method for Account Number in the group:General
      defineGetter(this, 'accountNumber', function () {
        return this._accountNumber;
      });
      //setter method for Object Name in the group:SAVE PAYEE SERVICE
      defineSetter(this, 'objectName', function (val) {
        if (typeof val == 'string' && val != '') {
          this._objectName = val;
        }
      });
      //getter method for Object Name in the group:SAVE PAYEE SERVICE
      defineGetter(this, 'objectName', function () {
        return this._objectName;
      });
      //setter method for P2P Object Name in the group:SAVE PAYEE SERVICE
      defineSetter(this, 'objectNameP2P', function (val) {
        if (typeof val == 'string' && val != '') {
          this._objectNameP2P = val;
        }
      });
      //getter method for P2P Object Name in the group:SAVE PAYEE SERVICE
      defineGetter(this, 'objectNameP2P', function () {
        return this._objectNameP2P;
      });
      //setter method for Confirmation Header2 in the group:CONFIRMATION FIELDS
      defineSetter(this, 'confirmationHeader2', function (val) {
        if (typeof val == 'string' && val != '') {
          this._confirmationHeader2 = val;
        }
      });
      //getter method for Confirmation Header2 in the group:CONFIRMATION FIELDS
      defineGetter(this, 'confirmationHeader2', function () {
        return this._confirmationHeader2;
      });
      //setter method for Error Image in the group:IMAGES
      defineSetter(this, 'errorImage', function (val) {
        if (typeof val == 'string' && val != '') {
          this._errorImage = val;
        }
      });
      //getter method for Error Image in the group:IMAGES
      defineGetter(this, 'errorImage', function () {
        return this._errorImage;
      });
      //setter method for Confirmation Header2 Skin in the group:SKINS
      defineSetter(this, 'sknConfirmationHeader2', function (val) {
        if (typeof val == 'string' && val != '') {
          this._sknConfirmationHeader2 = val;
        }
      });
      //getter method for Confirmation Header2 Skin in the group:SKINS
      defineGetter(this, 'sknConfirmationHeader2', function () {
        return this._sknConfirmationHeader2;
      });
      //setter method for Acknowledgement Header2 in the group:ACKNOWLEDGEMENT FIELDS
      defineSetter(this, 'acknowledgementHeader2', function (val) {
        if (typeof val == 'string' && val != '') {
          this._acknowledgementHeader2 = val;
        }
      });
      //getter method for Acknowledgement Header2 in the group:ACKNOWLEDGEMENT FIELDS
      defineGetter(this, 'acknowledgementHeader2', function () {
        return this._acknowledgementHeader2;
      });
      //setter method for Pop-up Label in the group:POPUP
      defineSetter(this, 'popupLabel', function (val) {
        if (typeof val == 'string' && val != '') {
          this._popupLabel = val;
        }
      });
      //getter method for Pop-up Label in the group:POPUP
      defineGetter(this, 'popupLabel', function () {
        return this._popupLabel;
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
      //setter method for Transfer Type in the group:General
      defineSetter(this, 'transferType', function (val) {
        if (typeof val == 'string' && val != '') {
          this._transferType = val;
        }
      });
      //getter method for Transfer Type in the group:General
      defineGetter(this, 'transferType', function () {
        return this._transferType;
      });
      //setter method for Operation Name in the group:SAVE PAYEE SERVICE
      defineSetter(this, 'operationName', function (val) {
        if (typeof val == 'string' && val != '') {
          this._operationName = val;
        }
      });
      //getter method for Operation Name in the group:SAVE PAYEE SERVICE
      defineGetter(this, 'operationName', function () {
        return this._operationName;
      });
      //setter method for P2P Operation Name in the group:SAVE PAYEE SERVICE
      defineSetter(this, 'operationNameP2P', function (val) {
        if (typeof val == 'string' && val != '') {
          this._operationNameP2P = val;
        }
      });
      //getter method for P2P Operation Name in the group:SAVE PAYEE SERVICE
      defineGetter(this, 'operationNameP2P', function () {
        return this._operationNameP2P;
      });
      //setter method for Close Image in the group:IMAGES
      defineSetter(this, 'closeImage', function (val) {
        if (typeof val == 'string' && val != '') {
          this._closeImage = val;
        }
      });
      //getter method for Close Image in the group:IMAGES
      defineGetter(this, 'closeImage', function () {
        return this._closeImage;
      });
      //setter method for Acknowledgement Header1 Skin in the group:SKINS
      defineSetter(this, 'sknAcknowledgementHeader1', function (val) {
        if (typeof val == 'string' && val != '') {
          this._sknAcknowledgementHeader1 = val;
        }
      });
      //getter method for Acknowledgement Header1 Skin in the group:SKINS
      defineGetter(this, 'sknAcknowledgementHeader1', function () {
        return this._sknAcknowledgementHeader1;
      });
      //setter method for Acknowledgement Message in the group:ACKNOWLEDGEMENT FIELDS
      defineSetter(this, 'acknowledgementMessage', function (val) {
        if (typeof val == 'string' && val != '') {
          this._acknowledgementMessage = val;
        }
      });
      //getter method for Acknowledgement Message in the group:ACKNOWLEDGEMENT FIELDS
      defineGetter(this, 'acknowledgementMessage', function () {
        return this._acknowledgementMessage;
      });
      //setter method for Field1 Label in the group:CONFIRMATION FIELDS
      defineSetter(this, 'conField1Label', function (val) {
        if (typeof val == 'string' && val != '') {
          this._conField1Label = val;
        }
      });
      //getter method for Field1 Label in the group:CONFIRMATION FIELDS
      defineGetter(this, 'conField1Label', function () {
        return this._conField1Label;
      });
      //setter method for Pop-up Close Image in the group:POPUP
      defineSetter(this, 'popupClose', function (val) {
        if (typeof val == 'string' && val != '') {
          this._popupClose = val;
        }
      });
      //getter method for Pop-up Close Image in the group:POPUP
      defineGetter(this, 'popupClose', function () {
        return this._popupClose;
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
      //setter method for IBAN in the group:General
      defineSetter(this, 'isIBAN', function (val) {
        if (typeof val == 'string' && val != '') {
          this._isIBAN = val;
        }
      });
      //getter method for IBAN in the group:General
      defineGetter(this, 'isIBAN', function () {
        return this._isIBAN;
      });
      //setter method for IBAN in the group:General
      defineSetter(this, 'transferFlow', function (val) {
        if (typeof val == 'string' && val != '') {
          this._transferFlow = val;
        }
      });
      //getter method for Transfer flow in the group:General
      defineGetter(this, 'transferFlow', function () {
        return this._transferFlow;
      });
      //setter method for Same Bank Transfer Criteria in the group:SAVE PAYEE SERVICE
      defineSetter(this, 'sameBankTransferCriteria', function (val) {
        if (typeof val == 'string' && val != '') {
          this._sameBankTransferCriteria = val;
        }
      });
      //getter method for Same Bank Transfer Criteria in the group:SAVE PAYEE SERVICE
      defineGetter(this, 'sameBankTransferCriteria', function () {
        return this._sameBankTransferCriteria;
      });
      //setter method for Domestic Transfer Criteria in the group:SAVE PAYEE SERVICE
      defineSetter(this, 'domesticTransferCriteria', function (val) {
        if (typeof val == 'string' && val != '') {
          this._domesticTransferCriteria = val;
        }
      });
      //getter method for Domestic Transfer Criteria in the group:SAVE PAYEE SERVICE
      defineGetter(this, 'domesticTransferCriteria', function () {
        return this._domesticTransferCriteria;
      });
      //setter method for International Transfer Criteria in the group:SAVE PAYEE SERVICE
      defineSetter(this, 'internationalTransferCriteria', function (val) {
        if (typeof val == 'string' && val != '') {
          this._internationalTransferCriteria = val;
        }
      });
      //getter method for International Transfer Criteria in the group:SAVE PAYEE SERVICE
      defineGetter(this, 'internationalTransferCriteria', function () {
        return this._internationalTransferCriteria;
      });
      //setter method for P2P Criteria1 in the group:SAVE PAYEE SERVICE
      defineSetter(this, 'criteria1P2P', function (val) {
        if (typeof val == 'string' && val != '') {
          this._criteria1P2P = val;
        }
      });
      //getter method for P2P Criteria1 in the group:SAVE PAYEE SERVICE
      defineGetter(this, 'criteria1P2P', function () {
        return this._criteria1P2P;
      });
      //setter method for P2P Criteria2 in the group:SAVE PAYEE SERVICE
      defineSetter(this, 'criteria2P2P', function (val) {
        if (typeof val == 'string' && val != '') {
          this._criteria2P2P = val;
        }
      });
      //getter method for P2P Criteria2 in the group:SAVE PAYEE SERVICE
      defineGetter(this, 'criteria2P2P', function () {
        return this._criteria2P2P;
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
      //setter method for Reference Number Label in the group:ACKNOWLEDGEMENT FIELDS
      defineSetter(this, 'referenceNumberLabel', function (val) {
        if (typeof val == 'string' && val != '') {
          this._referenceNumberLabel = val;
        }
      });
      //getter method for Reference Number Label in the group:ACKNOWLEDGEMENT FIELDS
      defineGetter(this, 'referenceNumberLabel', function () {
        return this._referenceNumberLabel;
      });
      //setter method for Field1 Value in the group:CONFIRMATION FIELDS
      defineSetter(this, 'conField1Value', function (val) {
        if (typeof val == 'string' && val != '') {
          this._conField1Value = val;
        }
      });
      //getter method for Field1 Value in the group:CONFIRMATION FIELDS
      defineGetter(this, 'conField1Value', function () {
        return this._conField1Value;
      });
      //setter method for Yes Button in the group:POPUP
      defineSetter(this, 'buttonYes', function (val) {
        if (typeof val == 'string' && val != '') {
          this._buttonYes = val;
        }
      });
      //getter method for Yes Button in the group:POPUP
      defineGetter(this, 'buttonYes', function () {
        return this._buttonYes;
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
      //setter method for Swift Code in the group:General
      defineSetter(this, 'swiftCode', function (val) {
        if (typeof val == 'string' && val != '') {
          this._swiftCode = val;
        }
      });
      //getter method for Swift Code in the group:General
      defineGetter(this, 'swiftCode', function () {
        return this._swiftCode;
      });
      //setter method for Service Response Identifier in the group:SAVE PAYEE SERVICE
      defineSetter(this, 'serviceResponseIdentifier', function (val) {
        if (typeof val == 'string' && val != '') {
          this._serviceResponseIdentifier = val;
        }
      });
      //getter method for Service Response Identifier in the group:SAVE PAYEE SERVICE
      defineGetter(this, 'serviceResponseIdentifier', function () {
        return this._serviceResponseIdentifier;
      });
      //setter method for P2P Service Response Identifier in the group:SAVE PAYEE SERVICE
      defineSetter(this, 'serviceResponseIdentifierP2P', function (val) {
        if (typeof val == 'string' && val != '') {
          this._serviceResponseIdentifierP2P = val;
        }
      });
      //getter method for P2P Service Response Identifier in the group:SAVE PAYEE SERVICE
      defineGetter(this, 'serviceResponseIdentifierP2P', function () {
        return this._serviceResponseIdentifierP2P;
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
      //setter method for Reference Number Value in the group:ACKNOWLEDGEMENT FIELDS
      defineSetter(this, 'referenceNumberValue', function (val) {
        if (typeof val == 'string' && val != '') {
          this._referenceNumberValue = val;
        }
      });
      //getter method for Reference Number Value in the group:ACKNOWLEDGEMENT FIELDS
      defineGetter(this, 'referenceNumberValue', function () {
        return this._referenceNumberValue;
      });
      //setter method for Field2 Label in the group:CONFIRMATION FIELDS
      defineSetter(this, 'conField2Label', function (val) {
        if (typeof val == 'string' && val != '') {
          this._conField2Label = val;
        }
      });
      //getter method for Field2 Label in the group:CONFIRMATION FIELDS
      defineGetter(this, 'conField2Label', function () {
        return this._conField2Label;
      });
      //setter method for No Button in the group:POPUP
      defineSetter(this, 'buttonNo', function (val) {
        if (typeof val == 'string' && val != '') {
          this._buttonNo = val;
        }
      });
      //getter method for No Button in the group:POPUP
      defineGetter(this, 'buttonNo', function () {
        return this._buttonNo;
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
      //setter method for Beneficiary Name in the group:General
      defineSetter(this, 'beneficiaryName', function (val) {
        if (typeof val == 'string' && val != '') {
          this._beneficiaryName = val;
        }
      });
      //getter method for Beneficiary Name in the group:General
      defineGetter(this, 'beneficiaryName', function () {
        return this._beneficiaryName;
      });
      //setter method for Placeholder Skin in the group:SKINS
      defineSetter(this, 'sknPlaceholder', function (val) {
        if (typeof val == 'string' && val != '') {
          this._sknPlaceholder = val;
        }
      });
      //getter method for Placeholder Skin in the group:SKINS
      defineGetter(this, 'sknPlaceholder', function () {
        return this._sknPlaceholder;
      });
      //setter method for Field2 Value in the group:CONFIRMATION FIELDS
      defineSetter(this, 'conField2Value', function (val) {
        if (typeof val == 'string' && val != '') {
          this._conField2Value = val;
        }
      });
      //getter method for Field2 Value in the group:CONFIRMATION FIELDS
      defineGetter(this, 'conField2Value', function () {
        return this._conField2Value;
      });
      //setter method for Field1 Label in the group:ACKNOWLEDGEMENT FIELDS
      defineSetter(this, 'ackField1Label', function (val) {
        if (typeof val == 'string' && val != '') {
          this._ackField1Label = val;
        }
      });
      //getter method for Field1 Label in the group:ACKNOWLEDGEMENT FIELDS
      defineGetter(this, 'ackField1Label', function () {
        return this._ackField1Label;
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
      //setter method for Bank Name in the group:General
      defineSetter(this, 'bankName', function (val) {
        if (typeof val == 'string' && val != '') {
          this._bankName = val;
        }
      });
      //getter method for Bank Name in the group:General
      defineGetter(this, 'bankName', function () {
        return this._bankName;
      });
      //setter method for Acknowledgement Message Skin in the group:SKINS
      defineSetter(this, 'sknAcknowledgementMessage', function (val) {
        if (typeof val == 'string' && val != '') {
          this._sknAcknowledgementMessage = val;
        }
      });
      //getter method for Acknowledgement Message Skin in the group:SKINS
      defineGetter(this, 'sknAcknowledgementMessage', function () {
        return this._sknAcknowledgementMessage;
      });
      //setter method for Field3 Label in the group:CONFIRMATION FIELDS
      defineSetter(this, 'conField3Label', function (val) {
        if (typeof val == 'string' && val != '') {
          this._conField3Label = val;
        }
      });
      //getter method for Field3 Label in the group:CONFIRMATION FIELDS
      defineGetter(this, 'conField3Label', function () {
        return this._conField3Label;
      });
      //setter method for Field1 Value in the group:ACKNOWLEDGEMENT FIELDS
      defineSetter(this, 'ackField1Value', function (val) {
        if (typeof val == 'string' && val != '') {
          this._ackField1Value = val;
        }
      });
      //getter method for Field1 Value in the group:ACKNOWLEDGEMENT FIELDS
      defineGetter(this, 'ackField1Value', function () {
        return this._ackField1Value;
      });
      //setter method for Phone Number in the group:General
      defineSetter(this, 'phoneNumber', function (val) {
        if (typeof val == 'string' && val != '') {
          this._phoneNumber = val;
        }
      });
      //getter method for Phone Number in the group:General
      defineGetter(this, 'phoneNumber', function () {
        return this._phoneNumber;
      });
      //setter method for Reference Number Label Skin in the group:SKINS
      defineSetter(this, 'sknReferenceNumberLabel', function (val) {
        if (typeof val == 'string' && val != '') {
          this._sknReferenceNumberLabel = val;
        }
      });
      //getter method for Reference Number Label Skin in the group:SKINS
      defineGetter(this, 'sknReferenceNumberLabel', function () {
        return this._sknReferenceNumberLabel;
      });
      //setter method for Field3 Label in the group:CONFIRMATION FIELDS
      defineSetter(this, 'conField3Value', function (val) {
        if (typeof val == 'string' && val != '') {
          this._conField3Value = val;
        }
      });
      //getter method for Field3 Label in the group:CONFIRMATION FIELDS
      defineGetter(this, 'conField3Value', function () {
        return this._conField3Value;
      });
      //setter method for Field2 Label in the group:ACKNOWLEDGEMENT FIELDS
      defineSetter(this, 'ackField2Label', function (val) {
        if (typeof val == 'string' && val != '') {
          this._ackField2Label = val;
        }
      });
      //getter method for Field2 Label in the group:ACKNOWLEDGEMENT FIELDS
      defineGetter(this, 'ackField2Label', function () {
        return this._ackField2Label;
      });
      //setter method for Email in the group:General
      defineSetter(this, 'email', function (val) {
        if (typeof val == 'string' && val != '') {
          this._email = val;
        }
      });
      //getter method for Email in the group:General
      defineGetter(this, 'email', function () {
        return this._email;
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
      //setter method for Field4 Label in the group:CONFIRMATION FIELDS
      defineSetter(this, 'conField4Label', function (val) {
        if (typeof val == 'string' && val != '') {
          this._conField4Label = val;
        }
      });
      //getter method for Field4 Label in the group:CONFIRMATION FIELDS
      defineGetter(this, 'conField4Label', function () {
        return this._conField4Label;
      });
      //setter method for Field2 Value in the group:ACKNOWLEDGEMENT FIELDS
      defineSetter(this, 'ackField2Value', function (val) {
        if (typeof val == 'string' && val != '') {
          this._ackField2Value = val;
        }
      });
      //getter method for Field2 Value in the group:ACKNOWLEDGEMENT FIELDS
      defineGetter(this, 'ackField2Value', function () {
        return this._ackField2Value;
      });
      //setter method for Error Message1 Skin in the group:SKINS
      defineSetter(this, 'sknErrorMessage1', function (val) {
        if (typeof val == 'string' && val != '') {
          this._sknErrorMessage1 = val;
        }
      });
      //getter method for Error Message1 Skin in the group:SKINS
      defineGetter(this, 'sknErrorMessage1', function () {
        return this._sknErrorMessage1;
      });
      //setter method for Field4 Value in the group:CONFIRMATION FIELDS
      defineSetter(this, 'conField4Value', function (val) {
        if (typeof val == 'string' && val != '') {
          this._conField4Value = val;
        }
      });
      //getter method for Field4 Value in the group:CONFIRMATION FIELDS
      defineGetter(this, 'conField4Value', function () {
        return this._conField4Value;
      });
      //setter method for Field3 Label in the group:ACKNOWLEDGEMENT FIELDS
      defineSetter(this, 'ackField3Label', function (val) {
        if (typeof val == 'string' && val != '') {
          this._ackField3Label = val;
        }
      });
      //getter method for Field3 Label in the group:ACKNOWLEDGEMENT FIELDS
      defineGetter(this, 'ackField3Label', function () {
        return this._ackField3Label;
      });
      //setter method for Error Message2 Skin in the group:SKINS
      defineSetter(this, 'sknErrorMessage2', function (val) {
        if (typeof val == 'string' && val != '') {
          this._sknErrorMessage2 = val;
        }
      });
      //getter method for Error Message2 Skin in the group:SKINS
      defineGetter(this, 'sknErrorMessage2', function () {
        return this._sknErrorMessage2;
      });
      //setter method for Field5 Label in the group:CONFIRMATION FIELDS
      defineSetter(this, 'conField5Label', function (val) {
        if (typeof val == 'string' && val != '') {
          this._conField5Label = val;
        }
      });
      //getter method for Field5 Label in the group:CONFIRMATION FIELDS
      defineGetter(this, 'conField5Label', function () {
        return this._conField5Label;
      });
      //setter method for Field3 Value in the group:ACKNOWLEDGEMENT FIELDS
      defineSetter(this, 'ackField3Value', function (val) {
        if (typeof val == 'string' && val != '') {
          this._ackField3Value = val;
        }
      });
      //getter method for Field3 Value in the group:ACKNOWLEDGEMENT FIELDS
      defineGetter(this, 'ackField3Value', function () {
        return this._ackField3Value;
      });
      //setter method for Confirmation Button1 Skin in the group:SKINS
      defineSetter(this, 'sknConfirmationButton1', function (val) {
        if (typeof val == 'string' && val != '') {
          this._sknConfirmationButton1 = val;
        }
      });
      //getter method for Confirmation Button1 Skin in the group:SKINS
      defineGetter(this, 'sknConfirmationButton1', function () {
        return this._sknConfirmationButton1;
      });
      //setter method for Field5  Value in the group:CONFIRMATION FIELDS
      defineSetter(this, 'conField5Value', function (val) {
        if (typeof val == 'string' && val != '') {
          this._conField5Value = val;
        }
      });
      //getter method for Field5  Value in the group:CONFIRMATION FIELDS
      defineGetter(this, 'conField5Value', function () {
        return this._conField5Value;
      });
      //setter method for Field4 Label in the group:ACKNOWLEDGEMENT FIELDS
      defineSetter(this, 'ackField4Label', function (val) {
        if (typeof val == 'string' && val != '') {
          this._ackField4Label = val;
        }
      });
      //getter method for Field4 Label in the group:ACKNOWLEDGEMENT FIELDS
      defineGetter(this, 'ackField4Label', function () {
        return this._ackField4Label;
      });
      //setter method for Confirmation Button1 Hover Skin in the group:SKINS
      defineSetter(this, 'sknHoverConfirmationButton1', function (val) {
        if (typeof val == 'string' && val != '') {
          this._sknHoverConfirmationButton1 = val;
        }
      });
      //getter method for Confirmation Button1 Hover Skin in the group:SKINS
      defineGetter(this, 'sknHoverConfirmationButton1', function () {
        return this._sknHoverConfirmationButton1;
      });
      //setter method for Field6 Label in the group:CONFIRMATION FIELDS
      defineSetter(this, 'conField6Label', function (val) {
        if (typeof val == 'string' && val != '') {
          this._conField6Label = val;
        }
      });
      //getter method for Field6 Label in the group:CONFIRMATION FIELDS
      defineGetter(this, 'conField6Label', function () {
        return this._conField6Label;
      });
      //setter method for Field4 Value in the group:ACKNOWLEDGEMENT FIELDS
      defineSetter(this, 'ackField4Value', function (val) {
        if (typeof val == 'string' && val != '') {
          this._ackField4Value = val;
        }
      });
      //getter method for Field4 Value in the group:ACKNOWLEDGEMENT FIELDS
      defineGetter(this, 'ackField4Value', function () {
        return this._ackField4Value;
      });
      //setter method for Confirmation Button1 Focus Skin in the group:SKINS
      defineSetter(this, 'sknFocusConfirmationButton1', function (val) {
        if (typeof val == 'string' && val != '') {
          this._sknFocusConfirmationButton1 = val;
        }
      });
      //getter method for Confirmation Button1 Focus Skin in the group:SKINS
      defineGetter(this, 'sknFocusConfirmationButton1', function () {
        return this._sknFocusConfirmationButton1;
      });
      //setter method for Field6 Value in the group:CONFIRMATION FIELDS
      defineSetter(this, 'conField6Value', function (val) {
        if (typeof val == 'string' && val != '') {
          this._conField6Value = val;
        }
      });
      //getter method for Field6 Value in the group:CONFIRMATION FIELDS
      defineGetter(this, 'conField6Value', function () {
        return this._conField6Value;
      });
      //setter method for Field5 Label in the group:ACKNOWLEDGEMENT FIELDS
      defineSetter(this, 'ackField5Label', function (val) {
        if (typeof val == 'string' && val != '') {
          this._ackField5Label = val;
        }
      });
      //getter method for Field5 Label in the group:ACKNOWLEDGEMENT FIELDS
      defineGetter(this, 'ackField5Label', function () {
        return this._ackField5Label;
      });
      //setter method for Confirmation Button2 Skin in the group:SKINS
      defineSetter(this, 'sknConfirmationButton2', function (val) {
        if (typeof val == 'string' && val != '') {
          this._sknConfirmationButton2 = val;
        }
      });
      //getter method for Confirmation Button2 Skin in the group:SKINS
      defineGetter(this, 'sknConfirmationButton2', function () {
        return this._sknConfirmationButton2;
      });
      //setter method for Field7 Label in the group:CONFIRMATION FIELDS
      defineSetter(this, 'conField7Label', function (val) {
        if (typeof val == 'string' && val != '') {
          this._conField7Label = val;
        }
      });
      //getter method for Field7 Label in the group:CONFIRMATION FIELDS
      defineGetter(this, 'conField7Label', function () {
        return this._conField7Label;
      });
      //setter method for Field5 Value in the group:ACKNOWLEDGEMENT FIELDS
      defineSetter(this, 'ackField5Value', function (val) {
        if (typeof val == 'string' && val != '') {
          this._ackField5Value = val;
        }
      });
      //getter method for Field5 Value in the group:ACKNOWLEDGEMENT FIELDS
      defineGetter(this, 'ackField5Value', function () {
        return this._ackField5Value;
      });
      //setter method for Confirmation Button2 Hover Skin in the group:SKINS
      defineSetter(this, 'sknHoverConfirmationButton2', function (val) {
        if (typeof val == 'string' && val != '') {
          this._sknHoverConfirmationButton2 = val;
        }
      });
      //getter method for Confirmation Button2 Hover Skin in the group:SKINS
      defineGetter(this, 'sknHoverConfirmationButton2', function () {
        return this._sknHoverConfirmationButton2;
      });
      //setter method for Field7 Value in the group:CONFIRMATION FIELDS
      defineSetter(this, 'conField7Value', function (val) {
        if (typeof val == 'string' && val != '') {
          this._conField7Value = val;
        }
      });
      //getter method for Field7 Value in the group:CONFIRMATION FIELDS
      defineGetter(this, 'conField7Value', function () {
        return this._conField7Value;
      });
      //setter method for Field6 Label in the group:ACKNOWLEDGEMENT FIELDS
      defineSetter(this, 'ackField6Label', function (val) {
        if (typeof val == 'string' && val != '') {
          this._ackField6Label = val;
        }
      });
      //getter method for Field6 Label in the group:ACKNOWLEDGEMENT FIELDS
      defineGetter(this, 'ackField6Label', function () {
        return this._ackField6Label;
      });
      //setter method for Confirmation Button2 Focus Skin in the group:SKINS
      defineSetter(this, 'sknFocusConfirmationButton2', function (val) {
        if (typeof val == 'string' && val != '') {
          this._sknFocusConfirmationButton2 = val;
        }
      });
      //getter method for Confirmation Button2 Focus Skin in the group:SKINS
      defineGetter(this, 'sknFocusConfirmationButton2', function () {
        return this._sknFocusConfirmationButton2;
      });
      //setter method for Error Message1 in the group:CONFIRMATION FIELDS
      defineSetter(this, 'errorMessage1', function (val) {
        if (typeof val == 'string' && val != '') {
          this._errorMessage1 = val;
        }
      });
      //getter method for Error Message1 in the group:CONFIRMATION FIELDS
      defineGetter(this, 'errorMessage1', function () {
        return this._errorMessage1;
      });
      //setter method for Field6 Value in the group:ACKNOWLEDGEMENT FIELDS
      defineSetter(this, 'ackField6Value', function (val) {
        if (typeof val == 'string' && val != '') {
          this._ackField6Value = val;
        }
      });
      //getter method for Field6 Value in the group:ACKNOWLEDGEMENT FIELDS
      defineGetter(this, 'ackField6Value', function () {
        return this._ackField6Value;
      });
      //setter method for Acknowledgement Button1 Skin in the group:SKINS
      defineSetter(this, 'sknAcknowledgementButton1', function (val) {
        if (typeof val == 'string' && val != '') {
          this._sknAcknowledgementButton1 = val;
        }
      });
      //getter method for Acknowledgement Button1 Skin in the group:SKINS
      defineGetter(this, 'sknAcknowledgementButton1', function () {
        return this._sknAcknowledgementButton1;
      });
      //setter method for Error Message2 in the group:CONFIRMATION FIELDS
      defineSetter(this, 'errorMessage2', function (val) {
        if (typeof val == 'string' && val != '') {
          this._errorMessage2 = val;
        }
      });
      //getter method for Error Message2 in the group:CONFIRMATION FIELDS
      defineGetter(this, 'errorMessage2', function () {
        return this._errorMessage2;
      });
      //setter method for Field7 Label in the group:ACKNOWLEDGEMENT FIELDS
      defineSetter(this, 'ackField7Label', function (val) {
        if (typeof val == 'string' && val != '') {
          this._ackField7Label = val;
        }
      });
      //getter method for Field7 Label in the group:ACKNOWLEDGEMENT FIELDS
      defineGetter(this, 'ackField7Label', function () {
        return this._ackField7Label;
      });
      //setter method for Acknowledgement Button1 Hover Skin in the group:SKINS
      defineSetter(this, 'sknHoverAcknowledgementButton1', function (val) {
        if (typeof val == 'string' && val != '') {
          this._sknHoverAcknowledgementButton1 = val;
        }
      });
      //getter method for Acknowledgement Button1 Hover Skin in the group:SKINS
      defineGetter(this, 'sknHoverAcknowledgementButton1', function () {
        return this._sknHoverAcknowledgementButton1;
      });
      //setter method for Confirmation Button1 in the group:CONFIRMATION FIELDS
      defineSetter(this, 'confirmationButton1', function (val) {
        if (typeof val == 'string' && val != '') {
          this._confirmationButton1 = val;
        }
      });
      //getter method for Confirmation Button1 in the group:CONFIRMATION FIELDS
      defineGetter(this, 'confirmationButton1', function () {
        return this._confirmationButton1;
      });
      //setter method for Field7 Value in the group:ACKNOWLEDGEMENT FIELDS
      defineSetter(this, 'ackField7Value', function (val) {
        if (typeof val == 'string' && val != '') {
          this._ackField7Value = val;
        }
      });
      //getter method for Field7 Value in the group:ACKNOWLEDGEMENT FIELDS
      defineGetter(this, 'ackField7Value', function () {
        return this._ackField7Value;
      });
      //setter method for Acknowledgement Button1 Focus Skin in the group:SKINS
      defineSetter(this, 'sknFocusAcknowledgementButton1', function (val) {
        if (typeof val == 'string' && val != '') {
          this._sknFocusAcknowledgementButton1 = val;
        }
      });
      //getter method for Acknowledgement Button1 Focus Skin in the group:SKINS
      defineGetter(this, 'sknFocusAcknowledgementButton1', function () {
        return this._sknFocusAcknowledgementButton1;
      });
      //setter method for Confirmation Button2 in the group:CONFIRMATION FIELDS
      defineSetter(this, 'confirmationButton2', function (val) {
        if (typeof val == 'string' && val != '') {
          this._confirmationButton2 = val;
        }
      });
      //getter method for Confirmation Button2 in the group:CONFIRMATION FIELDS
      defineGetter(this, 'confirmationButton2', function () {
        return this._confirmationButton2;
      });
      //setter method for Field8 Label in the group:ACKNOWLEDGEMENT FIELDS
      defineSetter(this, 'ackField8Label', function (val) {
        if (typeof val == 'string' && val != '') {
          this._ackField8Label = val;
        }
      });
      //getter method for Field8 Label in the group:ACKNOWLEDGEMENT FIELDS
      defineGetter(this, 'ackField8Label', function () {
        return this._ackField8Label;
      });
      //setter method for Acknowledgement Button2 Skin in the group:SKINS
      defineSetter(this, 'sknAcknowledgementButton2', function (val) {
        if (typeof val == 'string' && val != '') {
          this._sknAcknowledgementButton2 = val;
        }
      });
      //getter method for Acknowledgement Button2 Skin in the group:SKINS
      defineGetter(this, 'sknAcknowledgementButton2', function () {
        return this._sknAcknowledgementButton2;
      });
      //setter method for Field8 Value in the group:ACKNOWLEDGEMENT FIELDS
      defineSetter(this, 'ackField8Value', function (val) {
        if (typeof val == 'string' && val != '') {
          this._ackField8Value = val;
        }
      });
      //getter method for Field8 Value in the group:ACKNOWLEDGEMENT FIELDS
      defineGetter(this, 'ackField8Value', function () {
        return this._ackField8Value;
      });
      //setter method for Check Box Label in the group:CONFIRMATION FIELDS
      defineSetter(this, 'checkBoxLabel', function (val) {
        if (typeof val == 'string' && val != '') {
          this._checkBoxLabel = val;
        }
      });
      //getter method for Check Box Label in the group:CONFIRMATION FIELDS
      defineGetter(this, 'checkBoxLabel', function () {
        return this._checkBoxLabel;
      });
      //setter method for Acknowledgement Button2 Hover Skin in the group:SKINS
      defineSetter(this, 'sknHoverAcknowledgementButton2', function (val) {
        if (typeof val == 'string' && val != '') {
          this._sknHoverAcknowledgementButton2 = val;
        }
      });
      //getter method for Acknowledgement Button2 Hover Skin in the group:SKINS
      defineGetter(this, 'sknHoverAcknowledgementButton2', function () {
        return this._sknHoverAcknowledgementButton2;
      });
      //setter method for Acknowledgement Button1 in the group:ACKNOWLEDGEMENT FIELDS
      defineSetter(this, 'acknowledgementButton1', function (val) {
        if (typeof val == 'string' && val != '') {
          this._acknowledgementButton1 = val;
        }
      });
      //getter method for Acknowledgement Button1 in the group:ACKNOWLEDGEMENT FIELDS
      defineGetter(this, 'acknowledgementButton1', function () {
        return this._acknowledgementButton1;
      });
      //setter method for Check Box Value in the group:CONFIRMATION FIELDS
      defineSetter(this, 'checkBoxValue', function (val) {
        if (typeof val == 'string' && val != '') {
          this._checkBoxValue = val;
        }
      });
      //getter method for Check Box Value in the group:CONFIRMATION FIELDS
      defineGetter(this, 'checkBoxValue', function () {
        return this._checkBoxValue;
      });
      //setter method for Acknowledgement Button2 Focus Skin in the group:SKINS
      defineSetter(this, 'sknFocusAcknowledgementButton2', function (val) {
        if (typeof val == 'string' && val != '') {
          this._sknFocusAcknowledgementButton2 = val;
        }
      });
      //getter method for Acknowledgement Button2 Focus Skin in the group:SKINS
      defineGetter(this, 'sknFocusAcknowledgementButton2', function () {
        return this._sknFocusAcknowledgementButton2;
      });
      //setter method for Acknowledgement Button2 in the group:ACKNOWLEDGEMENT FIELDS
      defineSetter(this, 'acknowledgementButton2', function (val) {
        if (typeof val == 'string' && val != '') {
          this._acknowledgementButton2 = val;
        }
      });
      //getter method for Acknowledgement Button2 in the group:ACKNOWLEDGEMENT FIELDS
      defineGetter(this, 'acknowledgementButton2', function () {
        return this._acknowledgementButton2;
      });
      //setter method for Textbox Skin in the group:SKINS
      defineSetter(this, 'sknTextBox', function (val) {
        if (typeof val == 'string' && val != '') {
          this._sknTextBox = val;
        }
      });
      //getter method for Textbox Skin in the group:SKINS
      defineGetter(this, 'sknTextBox', function () {
        return this._sknTextBox;
      });
      //setter method for Acknowledgement Header3 in the group:ACKNOWLEDGEMENT FIELDS
      defineSetter(this, 'acknowledgementHeader3', function (val) {
        if (typeof val == 'string' && val != '') {
          this._acknowledgementHeader3 = val;
        }
      });
      //getter method for Acknowledgement Header3 in the group:ACKNOWLEDGEMENT FIELDS
      defineGetter(this, 'acknowledgementHeader3', function () {
        return this._acknowledgementHeader3;
      });
      //setter method for Acknowledgement Header2 Skin in the group:SKINS
      defineSetter(this, 'sknAcknowledgementHeader2', function (val) {
        if (typeof val == 'string' && val != '') {
          this._sknAcknowledgementHeader2 = val;
        }
      });
      //getter method for Acknowledgement Header2 Skin in the group:SKINS
      defineGetter(this, 'sknAcknowledgementHeader2', function () {
        return this._sknAcknowledgementHeader2;
      });
      //setter method for Field9 Label in the group:ACKNOWLEDGEMENT FIELDS
      defineSetter(this, 'ackField9Label', function (val) {
        if (typeof val == 'string' && val != '') {
          this._ackField9Label = val;
        }
      });
      //getter method for Field9 Label in the group:ACKNOWLEDGEMENT FIELDS
      defineGetter(this, 'ackField9Label', function () {
        return this._ackField9Label;
      });
      //setter method for Acknowledgement Header3 Skin in the group:SKINS
      defineSetter(this, 'sknAcknowledgementHeader3', function (val) {
        if (typeof val == 'string' && val != '') {
          this._sknAcknowledgementHeader3 = val;
        }
      });
      //getter method for Acknowledgement Header3 Skin in the group:SKINS
      defineGetter(this, 'sknAcknowledgementHeader3', function () {
        return this._sknAcknowledgementHeader3;
      });
      //setter method for Field9 Value in the group:ACKNOWLEDGEMENT FIELDS
      defineSetter(this, 'ackField9Value', function (val) {
        if (typeof val == 'string' && val != '') {
          this._ackField9Value = val;
        }
      });
      //getter method for Field9 Value in the group:ACKNOWLEDGEMENT FIELDS
      defineGetter(this, 'ackField9Value', function () {
        return this._ackField9Value;
      });
      defineGetter(this, 'acknowlegmentApprovalMessage', () => {
        return this._acknowlegmentApprovalMessage;
      });
      defineSetter(this, 'acknowlegmentApprovalMessage', value => {
        this._acknowlegmentApprovalMessage = value;
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
      try {
        this.setComponentConfigs();
        this.initActions();
        this.getTransferTypeFromContext();
        this.view.forceLayout();
        this.view.lblTrustPayeeIcon.text = this.CHECBOX_UNSELECTED;
        this.view.lblTrustPayeeIcon.skin = this.CHECKBOX_UNSELECTED_SKIN;
        this.view.flxAckContent.setVisibility(false);
        let form = kony.application.getCurrentForm();
        form.remove(form.flxPopup);
        this.view.btnAction1.accessibilityConfig = {
          "a11yLabel":"Confirm payee details"
        };
        this.view.btnAction2.accessibilityConfig = {
          "a11yLabel":"Cancel save payee process"
        };
        this.view.btnAck1.accessibilityConfig = {
          "a11yLabel":"Make a money transfer"
        };
        this.view.btnAck2.accessibilityConfig = {
          "a11yLabel":"Go to accounts overview"
        };

      }
      catch(err) {
        var errObj = {
          "errorInfo" : "Error in preshow method of the component.",
          "error": err
        };
        self.onError(errObj);	
      }
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
     * @api : toggleCheckBox
     * Toggles the check box
     * @return : NA
     */
    toggleCheckBox : function() {    
      var isSelected = this.setTrustedPayee();

      if(isSelected) {
        this.view.lblTrustPayeeIcon.text = this.CHECBOX_UNSELECTED;
        this.view.lblTrustPayeeIcon.skin = this.CHECKBOX_UNSELECTED_SKIN;
        this.setTrustedPayeeData("No");
        trustedPayee = "No";
      }
      else {
        this.view.lblTrustPayeeIcon.text = this.CHECBOX_SELECTED;
        this.view.lblTrustPayeeIcon.skin = this.CHECKBOX_SELECTED_SKIN;
        this.setTrustedPayeeData("Yes");
        trustedPayee = "Yes";
      }  
    },

    /**
     * @api : setTrustedPayeeData
     * upadtes the context of check box 
     * @return : NA
     */
    setTrustedPayeeData: function(data) {
      var scope = this;
      var isTrustedPayee = {trustedPayee : data}
      this.setContext(isTrustedPayee, scope);
      this.extractValuefromJSON(this._ackField9Value, "lblValue9");
    },

    /**
     * @api : postShow
     * event called after ui rendered on the screen, is a component life cycle event.
     * @return : NA
     */
    postShow: function() {      
      this.setSkins();
      this.setData();
      this.setImage();
      this.populateButtonTexts();
      this.populateTextInputs();
      this.setFlexHeight();
      this.view.flxClosePopup.doLayout = CommonUtilities.centerPopupFlex;
    },

    /**
     * @api : onBreakPointChange
     * It will trigger when break point change takes place.
     * @return : NA
     */
    onBreakPointChange: function()
    {
      this.setImage();
      this.setSkins();
      this.setData();
      this.populateButtonTexts();
      this.populateTextInputs();
      this.setFlexHeight();
      if(flexToDisplay == "ackFlex") {
        this.view.flxConfirmContent.setVisibility(false);
        this.view.flxAckContent.setVisibility(true);
      }
      else {
        this.view.flxConfirmContent.setVisibility(true);
        this.view.flxAckContent.setVisibility(false);
      }
    },

    /**
     * setComponentConfigs
     * @api : setComponentConfigs
     * responsible for sending componentContext passed into parserUtilManager.
     * @return : NA
     */
    setComponentConfigs: function() {
      this.parserUtilsManager.setBreakPointConfig(JSON.parse(this._BREAKPTS));
    },

    /**
     * getParsedTextValue
     * @api : getParsedTextValue
     * parses the property and fetches the corresponding Text.
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
     * setData
     * @api : setData
     * sets data in UI based on contract configurations
     * @return : NA
     */
    setData: function() {
      this.setErrorFlexData();
      this.setConfimationScreenData();
      this.setAcknowledgementScreenData();
    },

    /**
     * setErrorFlexData
     * @api : setErrorFlexData
     * sets data for error flex in confirmation screen based on contract configurations
     * @return : NA
     */
    setErrorFlexData: function() {
      this.view["lblError1"].text = this.getLabelText(this["_errorMessage1"]);
      this.view["lblError2"].text = this.getLabelText(this["_errorMessage2"]);
      this.view["lblClose"].text = this.getLabelText(this["_popupHead"]);
      this.view["lblCancel"].text = this.getLabelText(this["_popupLabel"]);
    },

    /**
     * setConfimationScreenData
     * @api : setConfimationScreenData
     * retrieves data for confimation screen provided on contract configurations
     * @return : NA
     */
    setConfimationScreenData :function() {
      //this.setTrustedPayeeData("No");
      //this.extractValuefromJSON(this._ackField9Value, "lblValue9");
      this.view["lblConfirmHeader1"].text = this.getLabelText(this["_confirmationHeader1"]);
      this.view["lblConfirmHeader2"].text = this.getLabelText(this["_confirmationHeader2"]);
      this.view["lblKey1"].text = this.getLabelText(this["_conField1Label"]);
      this.view["lblKey4"].text = this.getLabelText(this["_conField3Label"]);
      this.view["lblKey5"].text = this.getLabelText(this["_conField4Label"]);
      this.view["lblTrustedPayee"].text = this.getLabelText(this["_checkBoxLabel"]);

      var contextValue1 = this.getParsedValue(this._conField1Value);
      if (contextValue1) {
        this.getContextValue(contextValue1, "lblConfirmValue1");
      }

      if(this.getParsedValue(this._accountNumber) === "") {
        this.view["lblKey2"].text = this.getLabelText(this["_conField5Label"]);
        this.view["lblKey3"].text = this.getLabelText(this["_conField6Label"]);
        var contextValue5 = this.getParsedValue(this._conField5Value);
        var contextValue6 = this.getParsedValue(this._conField6Value);
        if (contextValue5) {
          this.getContextValue(contextValue5, "lblConfirmValue2");
        }
        if (contextValue6) {
          this.getContextValue(contextValue6, "lblConfirmValue3");
        }
        this.view.flxSection2.setVisibility(false);
        this.view.flxSeparator2.setVisibility(false);
      }
      else {
        this.view["lblKey2"].text = this.getLabelText(this["_conField2Label"]);
        this.view["lblKey6"].text = this.getLabelText(this["_conField5Label"]);
        this.view["lblKey7"].text = this.getLabelText(this["_conField6Label"]);
        this.view["lblKey8"].text = this.getLabelText(this["_conField7Label"]);
        var contextValue2 = this.getParsedValue(this._conField2Value);
        var contextValue5 = this.getParsedValue(this._conField5Value);
        var contextValue6 = this.getParsedValue(this._conField6Value);
        if (contextValue2) {
          this.getContextValue(contextValue2, "lblConfirmValue2");
        }        
        if (contextValue5) {
          this.getContextValue(contextValue5, "lblConfirmValue6");
        }
        if (contextValue6) {
          this.getContextValue(contextValue6, "lblConfirmValue7");
        }
        this.view.flxConfirmDetail3.setVisibility(false);
        this.populateAddressDetails();
      }
    },

    /**
     * getContextValue
     * @api : getContextValue
     * parses the context values in contracts and sets the same in the respective widgets
     * @return : NA
     */
    getContextValue: function(contextValue, widget) {
      var lblConfirmValue = this.getParsedValue(contextValue.text);
      if(lblConfirmValue)
        this.view[widget].text = lblConfirmValue;
      else
        this.view[widget].text = kony.i18n.getLocalizedString("i18n.common.none");
    },

    /**
     * setAcknowledgementScreenData
     * @api : setAcknowledgementScreenData
     * retrieves data for acknowledgement screen provided on contract configurations
     * @return : NA
     */
    setAcknowledgementScreenData :function() {
      this.view["lblSection1Header"].text = this.getLabelText(this["_acknowledgementHeader1"]);
      this.view["lblSection2Header"].text = this.getLabelText(this["_acknowledgementHeader2"]);
      this.view["lblAddressHeader"].text = this.getLabelText(this["_acknowledgementHeader3"]);
      this.view["lblReferenceNumber"].text = this.getLabelText(this["_referenceNumberLabel"]);
      this.view["lblAckMessage"].text = this.getLabelText(this["_acknowledgementMessage"]);
      this.view["lblField1Key"].text = this.getLabelText(this._ackField1Label);
      this.view["lblField2Key"].text = this.getLabelText(this._ackField2Label);
      //this.view["lblField9Key"].text = this.getLabelText(this._ackField9Label);
	   this.view.flxField9.isVisible = false;
      var contextValue1 = this.getParsedValue(this._ackField1Value);
      var contextValue2 = this.getParsedValue(this._ackField2Value);
      if (contextValue1) {
        this.extractValuefromJSON(contextValue1, "lblValue1", 1);
      }
      else {
        this.view.flxField1.isVisible = false;
      }
      if (contextValue2) {
        this.extractValuefromJSON(contextValue2, "lblValue2", 2);
      }
      else {
        this.view.flxField2.isVisible = false;
      }

      var referenceNumberContextValue = this.getParsedValue(this._referenceNumberValue);
      if(referenceNumberContextValue)
        this.extractValuefromJSON(this._referenceNumberValue, "lblReferenceNumberValue");
      else
        this.view.lblReferenceNumberValue.isVisible = false;

      if(this.getParsedValue(this._accountNumber) === "") {
        this.view.lblField3Key.text = this.getLabelText(this["_ackField6Label"]);
        this.view.lblField4Key.text = this.getLabelText(this["_ackField7Label"]);
        this.view.lblField5Key.text = this.getLabelText(this["_ackField4Label"]);
        this.view.lblField6Key.text = this.getLabelText(this["_ackField5Label"]);
        var contextValue6 = this.getParsedValue(this._ackField6Value);
        var contextValue7 = this.getParsedValue(this._ackField7Value);
        if (contextValue6) {
          this.extractValuefromJSON(contextValue6, "lblValue3", 3);
        }
        else{
          this.view.flxField3.isVisible = false;
        }
        if (contextValue7) {
          this.extractValuefromJSON(contextValue7, "lblValue4", 4);
        }
        else{
          this.view.flxField4.isVisible = false;
        }
        this.view.flxAddressHeader.setVisibility(false);
        this.view.flxField8.setVisibility(false);
        this.view.flxField7.setVisibility(false);
      }

      else {
        this.view.lblField3Key.text = this.getLabelText(this["_ackField3Label"]);
        this.view.lblField4Key.text = this.getLabelText(this["_ackField4Label"]);
        this.view.lblField5Key.text = this.getLabelText(this["_ackField5Label"]);
        this.view.lblField6Key.text = this.getLabelText(this["_ackField6Label"]);
        this.view.lblField7Key.text = this.getLabelText(this["_ackField7Label"]);
        this.view.lblField8Key.text = this.getLabelText(this["_ackField8Label"]);
        var contextValue3 = this.getParsedValue(this._ackField3Value);
        var contextValue6 = this.getParsedValue(this._ackField6Value);
        var contextValue7 = this.getParsedValue(this._ackField7Value);
        if (contextValue3) {
          this.extractValuefromJSON(contextValue3, "lblValue3", 3);
        }
        else {
          this.view.flxField3.isVisible = false;
        }
        if (contextValue6) {
          this.extractValuefromJSON(contextValue6, "lblValue6", 6);
        }
        else {
          this.view.flxField6.isVisible = false;
        }
        if (contextValue7) {
          this.extractValuefromJSON(contextValue7, "lblValue7", 7);
        }
        else {
          this.view.flxField7.isVisible = false;
        }
      }
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
     * setImage
     * @api : setImage
     * sets image based on contract configurations
     * @return : NA
     */
    setImage: function() {
      var ackSuccessImage = this.getParsedImgSource(this._successImage);
      if(ackSuccessImage) {
        this.view.imgSuccess.src = ackSuccessImage.img;
      }

      var ackErrorImg = this.getParsedImgSource(this._errorImage);
      if(ackErrorImg) {
        this.view.imgFail.src = ackErrorImg.img;
      }

      var ackCloseImg = this.getParsedImgSource(this._closeImage);
      if(ackCloseImg) {
        this.view.imgCloseIcon.src = ackCloseImg.img;
      }

      var popupCloseImg = this.getParsedImgSource(this._popupClose);
      if(popupCloseImg) {
        this.view.imgClose.src = popupCloseImg.img;
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
     * getParsedValue
     * @api : getParsedValue
     * parses the property and fetches the corresponding Value.
     * @return : NA
     */
    getParsedValue: function(property, selectedValue) {
      try{
        property = JSON.parse(property);
      }
      catch(e){
        property = property;
        kony.print(e);
      }
      if(typeof(property) === "string")
        return this.getProcessedText(property);
      else{
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
      if(this.formScope === "") {
        this.formScope = scope;
      }
      this.parserUtilsManager.setContext(this.context);
    },

    /**
     * setButtonText
     * @api : setButtonText
     * helper method for parsing button text.
     * @return : returns corresponding property for the respective breakpoints
     */
    setButtonText: function(value) {
      var self = this;
      try {
        var parsedValue=value;
        if (typeof(parsedValue !== "string")) {
          parsedValue = parsedValue.hasOwnProperty("text") ? parsedValue["text"] : parsedValue;
        }
        if ((typeof(parsedValue) !== "string" && Object.keys(parsedValue)[1].indexOf("$.BREAKPTS") > -1) || (typeof(parsedValue) === "string" && parsedValue.indexOf("$.BREAKPTS") > -1)) {
          parsedValue = this.getParsedTextValue(parsedValue, kony.application.getCurrentBreakpoint());
        } else parsedValue = this.getParsedTextValue(parsedValue, kony.application.getCurrentBreakpoint());
        return parsedValue;
      }
      catch(err) {
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
     * populates button texts based on contrats
     * @return : NA
     */
    populateButtonTexts: function() {
      var self = this;
      try {
        var parsedValue1 = this.savePayeeUtility.buttonParsedValue(this._confirmationButton1);
        if(parsedValue1) {
          var btn1Text = this.setButtonText(parsedValue1);
          this.view.btnAction1.text = btn1Text;
          this.view.btnAction1.setVisibility(true);
        }

        var parsedValue2 = this.savePayeeUtility.buttonParsedValue(this._confirmationButton2);
        if(parsedValue2) {
          var btn2Text = this.setButtonText(parsedValue2);
          this.view.btnAction2.text = btn2Text;
          this.view.btnAction2.setVisibility(true);
        }

        var parsedValue3 = this.savePayeeUtility.buttonParsedValue(this._acknowledgementButton1);
        if(parsedValue3) {
          var btn3Text = this.setButtonText(parsedValue3);
          this.view.btnAck1.text = btn3Text;
          this.view.btnAck1.setVisibility(true);
        }

        var parsedValue4 = this.savePayeeUtility.buttonParsedValue(this._acknowledgementButton2);
        if(parsedValue4) {
          var btn4Text = this.setButtonText(parsedValue4);
          this.view.btnAck2.text = btn4Text;
          this.view.btnAck2.setVisibility(true);
        }

        var parsedValue5 = this.savePayeeUtility.buttonParsedValue(this._buttonYes);
        if(parsedValue5) {
          var btn5Text = this.setButtonText(parsedValue5);
          this.view.btnYes.text = btn5Text;
          this.view.btnYes.setVisibility(true);
        }

        var parsedValue6 = this.savePayeeUtility.buttonParsedValue(this._buttonNo);
        if(parsedValue6) {
          var btn6Text = this.setButtonText(parsedValue6);
          this.view.btnNo.text = btn6Text;
          this.view.btnNo.setVisibility(true);
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
     * setSkins
     * @api : setSkins
     * event called to set the skins based on the contracts.
     * @return : NA
     */
    setSkins: function() {
      var self = this;
      try {
        for(var i=1 ; i<=9; i++) {          
          this.view["lblField" +i+"Key"].skin = this.getParsedValue(this._sknFieldLabel, kony.application.getCurrentBreakpoint());
        }
        for(var i=1 ; i<=8; i++) {          
          this.view["lblKey"+i].skin = this.getParsedValue(this._sknFieldLabel, kony.application.getCurrentBreakpoint());
        }
        for(var i=1 ; i<=9; i++) {          
          this.view["lblValue" +i].skin = this.getParsedValue(this._sknFieldValue, kony.application.getCurrentBreakpoint());
        }

        this.view.lblTrustedPayee.skin = this.getParsedValue(this._sknFieldLabel, kony.application.getCurrentBreakpoint());
        this.view.lblConfirmValue1.skin = this.getParsedValue(this._sknFieldValue, kony.application.getCurrentBreakpoint());
        this.view.lblConfirmValue2.skin = this.getParsedValue(this._sknFieldValue, kony.application.getCurrentBreakpoint());
        this.view.lblConfirmValue3.skin = this.getParsedValue(this._sknFieldValue, kony.application.getCurrentBreakpoint());
        this.view.lblConfirmValue6.skin = this.getParsedValue(this._sknFieldValue, kony.application.getCurrentBreakpoint());
        this.view.lblConfirmValue7.skin = this.getParsedValue(this._sknFieldValue, kony.application.getCurrentBreakpoint());
        this.view.lblConfirmValue8.skin = this.getParsedValue(this._sknFieldValue, kony.application.getCurrentBreakpoint());
        this.view.lblConfirmHeader1.skin = this.getParsedValue(this._sknConfirmationHeader1, kony.application.getCurrentBreakpoint());
        this.view.lblConfirmHeader2.skin = this.getParsedValue(this._sknConfirmationHeader2, kony.application.getCurrentBreakpoint());
        this.view.lblSection1Header.skin = this.getParsedValue(this._sknAcknowledgementHeader1, kony.application.getCurrentBreakpoint());
        this.view.lblSection2Header.skin = this.getParsedValue(this._sknAcknowledgementHeader2, kony.application.getCurrentBreakpoint());
        this.view.lblAddressHeader.skin = this.getParsedValue(this._sknAcknowledgementHeader3, kony.application.getCurrentBreakpoint());
        this.view.lblAckMessage.skin = this.getParsedValue(this._sknAcknowledgementMessage, kony.application.getCurrentBreakpoint());
        this.view.lblReferenceNumber.skin = this.getParsedValue(this._sknReferenceNumberLabel, kony.application.getCurrentBreakpoint());
        this.view.lblReferenceNumberValue.skin = this.getParsedValue(this._sknReferenceNumberValue, kony.application.getCurrentBreakpoint());
        this.view.tbxNickName.placeholderSkin = this.getParsedValue(this._sknPlaceholder, kony.application.getCurrentBreakpoint());
        this.view.tbxNote.placeholderSkin = this.getParsedValue(this._sknPlaceholder, kony.application.getCurrentBreakpoint());
        this.view.tbxNickName.skin = this.getParsedValue(this._sknTextBox, kony.application.getCurrentBreakpoint());
        this.view.tbxNote.skin = this.getParsedValue(this._sknTextBox, kony.application.getCurrentBreakpoint());
        this.view.lblError1.skin = this.getParsedValue(this._sknErrorMessage1, kony.application.getCurrentBreakpoint());
        this.view.lblError2.skin = this.getParsedValue(this._sknErrorMessage2, kony.application.getCurrentBreakpoint());
        this.view.btnAction1.skin = this.getParsedValue(this._sknConfirmationButton1, kony.application.getCurrentBreakpoint());
        this.view.btnAction1.hoverSkin = this.getParsedValue(this._sknHoverConfirmationButton1, kony.application.getCurrentBreakpoint());
        this.view.btnAction1.focusSkin = this.getParsedValue(this._sknFocusConfirmationButton1, kony.application.getCurrentBreakpoint());
        this.view.btnAction2.skin = this.getParsedValue(this._sknConfirmationButton2, kony.application.getCurrentBreakpoint());
        this.view.btnAction2.hoverSkin = this.getParsedValue(this._sknHoverConfirmationButton2, kony.application.getCurrentBreakpoint());
        this.view.btnAction2.focusSkin = this.getParsedValue(this._sknFocusConfirmationButton2, kony.application.getCurrentBreakpoint());
        this.view.btnAck1.skin = this.getParsedValue(this._sknAcknowledgementButton1, kony.application.getCurrentBreakpoint());
        this.view.btnAck1.hoverSkin = this.getParsedValue(this._sknHoverAcknowledgementButton1, kony.application.getCurrentBreakpoint());
        this.view.btnAck1.focusSkin = this.getParsedValue(this._sknFocusAcknowledgementButton1, kony.application.getCurrentBreakpoint());
        this.view.btnAck2.skin = this.getParsedValue(this._sknAcknowledgementButton2, kony.application.getCurrentBreakpoint());
        this.view.btnAck2.hoverSkin = this.getParsedValue(this._sknHoverAcknowledgementButton2, kony.application.getCurrentBreakpoint());
        this.view.btnAck2.focusSkin = this.getParsedValue(this._sknFocusAcknowledgementButton2, kony.application.getCurrentBreakpoint());
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
        this.view.flxAckSection2.doLayout = null;
        scope.view.flxAckSection1.height = undefined;
        this.view.flxMiddleContent.forceLayout();
      }

      else if(breakPointValue > 1024)
      {
        this.view.flxAckSection2.doLayout = function() {
          scope.view.flxAckSection1.height = scope.view.flxAckSection2.frame.height + "dp";
        };
      }
    },

    /**
     * mapTextBoxValueToContext
     * @api : mapTextBoxValueToContext
     * maps the value of textbox to the context assigned in contracts
     * @return : NA
     */
    mapTextBoxValueToContext: function(contractJSON, textBoxID) {
      if(!this.savePayeeUtility.isNullOrUndefinedOrEmpty(contractJSON) && !this.savePayeeUtility.isNullOrUndefinedOrEmpty(contractJSON.mapping)){
        var inputMapper = contractJSON.mapping.substring(5,contractJSON.mapping.length-1);
        this.textInputsMapping[textBoxID] = inputMapper;
      }
    },

    /**
     * setTextBoxPlaceHolder
     * @api : setTextBoxPlaceHolder
     * maps the value of textbox to the placeholder assigned in contracts
     * @return : NA
     */
    setTextBoxPlaceHolder: function(contractJSON, tbxWidget) {
      if(!this.savePayeeUtility.isNullOrUndefinedOrEmpty(contractJSON.placeHolder)) {
        var placeHolderValue = this.getParsedValue
        (contractJSON.placeHolder,kony.application.getCurrentBreakpoint());
        this.view[tbxWidget].placeholder =
          placeHolderValue ? placeHolderValue : "";
      }
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
     * populateTextInputs
     * @api : populateTextInputs
     * populates text box properties based on contrats
     * @return : NA
     */
    populateTextInputs: function()
    {
      var tbx1JSON = this.getParsedValue(this._conField3Value);
      if(tbx1JSON) {
        this.mapTextBoxValueToContext(tbx1JSON, "tbxNickName");
        this.setTextBoxPlaceHolder(tbx1JSON, "tbxNickName");
      }

      var tbx2JSON = this.getParsedValue(this._conField4Value);
      if(tbx2JSON) {
        this.mapTextBoxValueToContext(tbx2JSON, "tbxNote");
        this.setTextBoxPlaceHolder(tbx2JSON, "tbxNote");
      }
    },

    /**
     * actionHandler
     * @api : actionHandler
     * helper method used on initializing actions for the component, it retrieves the actionJSON from the property
     * context{JSON} - context object
     * property{String} - contains custom property defined
     */
    actionHandler :function(context,property){
      if(property !== null && property !== undefined){
        var propertyJSON = JSON.parse(property);
        var parsedValue = propertyJSON;
        if (typeof(parsedValue !== "string")) {
          parsedValue = parsedValue.hasOwnProperty("action") ? parsedValue["action"] : parsedValue;
        }
        if((typeof(parsedValue) !== "string" && Object.keys(parsedValue)[1].indexOf("$.BNFTYPES")>-1) || (typeof(parsedValue)==="string" && parsedValue.indexOf("$.BNFTYPES")>-1)) {
          parsedValue = this.getParsedValue(parsedValue,this.beneficiaryData["selectedBeneficiaryType"]); 
          if(typeof(parsedValue !== "string")){
            parsedValue = parsedValue.hasOwnProperty("action")?parsedValue["action"]:parsedValue;
          }
        }
        if((typeof(parsedValue) !== "string" && Object.keys(parsedValue)[1].indexOf("$.FLOWTYPES")>-1) || (typeof(parsedValue)==="string" && parsedValue.indexOf("$.FLOWTYPES")>-1)) {
          parsedValue = this.getParsedValue(parsedValue,this.beneficiaryData["selectedflowType"]);  
          if(typeof(parsedValue !== "string")){
            parsedValue = parsedValue.hasOwnProperty("action")?parsedValue["action"]:parsedValue;
          }
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
 	 * helper method to retrieve the form/component method.
 	 * levelInstance{String} -either form or component 
   	 * method {String} - method to be invoked
  	 * context{JSON} -context 
     */
    getInstanceAction:function(levelInstance, method, context) {  
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
     * @api : initActions
     * assigns actions to all the widgets.
     * @return : NA
     */
    initActions: function() {
      var scope = this;
      this.view.flxClick.onTouchEnd = scope.toggleCheckBox.bind();
      this.view.btnAction1.onClick =  this.actionHandler.bind(this,this.context,this._confirmationButton1);
      this.view.btnAction2.onClick =  this.actionHandler.bind(this,this.context,this._confirmationButton2);
      this.view.btnAck1.onClick =  this.actionHandler.bind(this,this.context,this._acknowledgementButton1);
      this.view.btnAck2.onClick =  this.actionHandler.bind(this,this.context,this._acknowledgementButton2);
      this.view.btnYes.onClick =  this.actionHandler.bind(this,this.context,this._buttonYes);
      //this.view.imgCloseIcon.onTouchStart = this.closeErrorFlex;
      this.view.flxCloseButton.onClick = this.closeErrorFlex;
    },

    /**
     * @api : closeErrorFlex
     * closes the error flex
     * @return : NA
     */
    closeErrorFlex: function() {
      this.view.flxError.setVisibility(false);
    },

    /**
     * confirmPayee
     * @api : confirmPayee
     * called on click of confirm button in confiramtion screen
     * @return : NA
     */    
    confirmPayee: function() {
      this.updateContext("tbxNickName",this.view.tbxNickName.text);
      this.updateContext("tbxNote",this.view.tbxNote.text);
      if(this.view.tbxNickName.text) {
        if(this.getParsedValue(this._accountNumber) === "")
          this.extractValuefromJSON(this._ackField4Value, "lblValue5");
        else
          this.extractValuefromJSON(this._ackField4Value, "lblValue4");
      }
      else {
        if(this.getParsedValue(this._accountNumber) === "")
          this.view.flxField5.setVisibility(false);
        else
          this.view.flxField4.setVisibility(false);
      }

      if(this.view.tbxNote.text) {
        if(this.getParsedValue(this._accountNumber) === "")
          this.extractValuefromJSON(this._ackField5Value, "lblValue6");
        else
          this.extractValuefromJSON(this._ackField5Value, "lblValue5");
      }
      else {
        if(this.getParsedValue(this._accountNumber) === "")
          this.view.flxField6.setVisibility(false);
        else
          this.view.flxField5.setVisibility(false);
      }
      this.view.flxConfirmContent.setVisibility(false);
      this.view.flxAckContent.setVisibility(true);
      flexToDisplay = "ackFlex";
    },

    /**
     * showCancelPopup
     * @api : showCancelPopup
     * displays confimartion popup on click of cancel button
     * @return : NA
     */
    showCancelPopup :function(context) {
      var form = kony.application.getCurrentForm();
      var popupObj = this.view.flxPopup.clone();
      form.add(popupObj); 
      popupObj.isVisible = true;
      popupObj.bottom = "0dp"; 
      popupObj.isModalContainer=true;
      popupObj.flxClosePopup.isModalContainer = true;
      popupObj.left = "0dp";  
      if (!(kony.application.getCurrentBreakpoint() === 640)) {
      popupObj.height = "100%"; 
      popupObj.flxClosePopup.centerY = "30%"; 
      }
      var scope = this;
      popupObj.flxClosePopup.btnNo.onClick = function() { 
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
      popupObj.flxClosePopup.onKeyPress = function(eventObject, eventPayload) {
        if (eventPayload.keyCode === 27) {
            popupObj.isModalContainer = false;
            popupObj.flxClosePopup.isModalContainer = false;
            form.remove(popupObj);
            scope.cancelButtonFocus();
        }
      };
      this.view.forceLayout(); 
      form.flxClosePopup.lblClose.setActive(true);
    },
    cancelButtonFocus: function() {
        var scope = this;
        scope.view.btnAction2.setActive(true);
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
      var phoneNumberJSON = this.getParsedValue(this._ackField5Value);
      var emailIdJSON = this.getParsedValue(this._ackField6Value);

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
        this.view.flxField8.setVisibility(false);
        this.view.lblConfirmValue8.text = "None";
      }
      else {
        this.view.lblConfirmValue8.text = address;
        this.view.lblValue8.text = address;
      }

      if (phoneNumberJSON)
        phoneNumber = this.getParsedValue(phoneNumberJSON.text);

      if (emailIdJSON)
        emailId = this.getParsedValue(emailIdJSON.text);

      if(addressLine1 == "" && addressLine2 == "" && city == "" && state == "" && country == "" && zipCode == "" && phoneNumber == "" && emailId == "")
        this.view.flxAddressHeader.setVisibility(false);
    },

    setTrustedPayee: function() {      
      return this.view.lblTrustPayeeIcon.text === this.CHECBOX_SELECTED ;
    },

    /**
     * @api : getCriteria
     * Parse the criteria based on accountType.
     * @param : criteria {string} - value collected from exposed contract
     * @return : {JSONObject} - jsonvalue for criteria
     */
    getCriteria: function(criteria) {
      var criteriaJSON = JSON.parse(criteria);
      for(var key in  criteriaJSON) {
        var key1 = "";
        if(key.indexOf("{$") > -1) {
          key1 = this.parserUtilsManager.getParsedValue(key);
        }
        if(criteriaJSON[key]!== true && (criteriaJSON[key])!==false) {
        criteriaJSON[key] = this.parserUtilsManager.getParsedValue(criteriaJSON[key]);
        criteriaJSON[key1] = criteriaJSON[key];
        if(key.indexOf("{$") > -1) {
          delete criteriaJSON[key];
        }
      }
      }
      return criteriaJSON;
    },
    
    /**
     * saveThisPayee
     * @api : saveThisPayee
     * calls service to save the details of the payee
     * @return : NA
     */
    saveThisPayee: function(data) {
            var self = this;
            var transferType = this.getParsedValue(this._transferType);
            this.updateContext("tbxNickName", this.view.tbxNickName.text);
            this.updateContext("tbxNote", this.view.tbxNote.text);
            if (this.transferTypeContext === this.getFieldValue(this._transferFlow, "T4")) {
                var objSvcName = this.getParsedValue(this._objectServiceNameP2P);
                var objName = this.getParsedValue(this._objectNameP2P);
                var operationName = this.getParsedValue(this._operationNameP2P);
                var identifier = this.getParsedValue(this._serviceResponseIdentifierP2P);
                var phoneNumber = this.getParsedValue(this._phoneNumber);
                var email = this.getParsedValue(this._email);
                var criteria = "";
                if (phoneNumber) criteria = this.getCriteria(this._criteria1P2P);
                else criteria = this.getCriteria(this._criteria2P2P);
                // criteria = this.getContract(criteria, data);
                // this.savePayeeDAO.saveP2PPayee(objSvcName, objName, operationName, criteria, onSuccessSavePayee.bind(this), identifier, this.onServiceError);
            } else {
                var objSvcName = this.getParsedValue(this._objectServiceName);
                var objName = this.getParsedValue(this._objectName);
                var operationName = this.getParsedValue(this._operationName);
                var identifier = this.getParsedValue(this._serviceResponseIdentifier);
                var criteria = "";
                if (this.transferTypeContext === this.getFieldValue(this._transferFlow, "T1")) {
                    criteria = this.getCriteria(this._sameBankTransferCriteria);
                } else if (this.transferTypeContext === this.getFieldValue(this._transferFlow, "T2")) {
                    criteria = this.getCriteria(this._domesticTransferCriteria);
                } else if (this.transferTypeContext === this.getFieldValue(this._transferFlow, "T3")) {
                    criteria = this.getCriteria(this._internationalTransferCriteria);
                }
                // criteria = this.getContract(criteria, data);
                // this.savePayeeDAO.savePayee(objSvcName, objName, operationName, criteria, onSuccessSavePayee.bind(this), identifier, this.onServiceError);
            }
            if (applicationManager.getUserPreferencesManager().isSingleCustomerProfile) {
              this.savePayeeDAO.savePayee(objSvcName, objName, operationName, criteria, onSuccessSavePayee.bind(this), identifier, this.onServiceError);
            } else {
                applicationManager.getRecipientsManager().fetchContractDetails(data.serviceName, function (response) {
                    var contracts = response.contracts;
                    var contractId;
                    var coreCustomerId = data.coreCustomerId;
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
                        criteria.cif = JSON.stringify([{ contractId: contractId, coreCustomerId: coreCustomerId }]);
                    }
                    if (self.transferTypeContext === self.getFieldValue(self._transferFlow, "T4")) {
                        self.savePayeeDAO.saveP2PPayee(objSvcName, objName, operationName, criteria, onSuccessSavePayee.bind(self), identifier, self.onServiceError);
                    } else {
                        self.savePayeeDAO.savePayee(objSvcName, objName, operationName, criteria, onSuccessSavePayee.bind(self), identifier, self.onServiceError);
                    }
                    // return criteria;
                }, function () {
                    if (self.transferTypeContext === this.getFieldValue(self._transferFlow, "T4")) {
                        self.savePayeeDAO.saveP2PPayee(objSvcName, objName, operationName, criteria, onSuccessSavePayee.bind(self), identifier, this.onServiceError);
                    } else {
                        self.savePayeeDAO.savePayee(objSvcName, objName, operationName, criteria, onSuccessSavePayee.bind(self), identifier, this.onServiceError);
                    }
                });
            }

            function onSuccessSavePayee(response, unicode) {
                kony.application.dismissLoadingScreen();
                var errorMessage = response.dbpErrMsg;
                var referenceId = response.Id || response.referenceId;
                var PayPersonId = response.PayPersonId;
                if (errorMessage) {
                    this.view.flxError.setVisibility(true);
                } else if (referenceId) {
                    if(response.transactionStatus === "Pending"){
                      this.view["lblAckMessage"].text = this.getLabelText(this["_acknowlegmentApprovalMessage"]);
                    }else{
                      this.view["lblAckMessage"].text = this.getLabelText(this["_acknowledgementMessage"]) ;
                    }
                    this.view.lblReferenceNumberValue.text = referenceId;
                    this.confirmPayee();
                } else if (PayPersonId) {
                    this.view.lblReferenceNumberValue.text = PayPersonId;
                    this.confirmPayee();
                }
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
     * onServiceError
     * @api : onServiceError
     * executes when service call fails
     * @return : NA
     */
    onServiceError: function() {
      kony.application.dismissLoadingScreen();
      this.view.flxError.setVisibility(true);
    },
  };
});