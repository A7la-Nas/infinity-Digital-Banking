define(['JSONValidator', './FormatUtils', './ParserUtilsManager' , './EntitlementUtils' , './DataProcessorUtility'], function(JSONValidator, FormatUtils, ParserUtilsManager , EntitlementUtils , DataProcessorUtility) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this._sknHeaderLabel="";
      this._successTransactionIcon="";
      this._field1Label="";
      this._notesLabel="";
      this._failureTransactionTitle="";
      this._amountFormat="";
      this._headerLabel="";
      this._sknHeaderBackground="";
      this._failureTransactionIcon="";
      this._field1Value="";
      this._notesValue="";
      this._payeeStatus="";
      this._pngImage="";
      this._jpegImage="";
      this._failureTransactionDescription="";
      this._dateFormat="";
      this._transactionStatus="";
      this._sknRowSeparator="";
      this._field2Label="";
      this._supportingDocumentsLabel="";
      this._failureButtonAction1="";
      this._backendDateFormat="";
      this._backButtonIcon="";
      this._sknFieldLabel="";
      this._field2Value="";
      this._supportingDocumentsValue="";
      this._currencyCode="";
      this._sknFieldValue="";
      this._field3Label="";
      this._addressLabel="";
      this._sknTransactionSuccessLabel="";
      this._field3Value="";
      this._addressLine1Value="";
      this._sknTransactionFailureTitle="";
      this._field4Label="";
      this._addressLine2Value="";
      this._sknTransactionFailureDescription="";
      this._field4Value="";
      this._mobileLabel="";
      this._mobileValue="";
      this._field5Label="";
      this._field5Value="";
      this._emailLabel="";
      this._emailValue="";
      this._field6Label="";
      this._field6Value="";
      this._cityLabel="";
      this._cityValue="";
      this._field7Label="";
      this._field7Value="";
      this._stateLabel="";
      this._stateValue="";
      this._field8Label="";
      this._countryLabel="";
      this._field8Value="";
      this._countryValue="";
      this._field9Label="";
      this._postalCodeLabel="";
      this._field9Value="";
      this._postalCodeValue="";
      this._field10Label="";
      this._field10Value="";
      this._field11Label="";
      this._field11Value="";
      this._field12Label="";
      this._field12Value="";
      this._field13Label="";
      this._field13Value="";
      this._field14Label="";
      this._field14Value="";
      this._field15Label="";
      this._field15Value="";
      this._field16Label="";
      this._field16Value="";
      this._field17Label="";
      this._field17Value="";
      this._field18Label="";
      this._field18Value="";
      this._field19Label="";
      this._field19Value="";
      this._field20Label="";
      this._field20Value="";
      this._field21Label="";
      this._field21Value="";
      this._field22Label="";
      this._field22Value="";
      this._field23Label="";
      this._field23Value="";
      this._field24Label="";
      this._field24Value="";
      this._field25Label="";
      this._field25Value="";
      this._field26Label="";
      this._field26Value="";
      this._field27Label="";
      this._field27Value="";
      this._field28Label="";
      this._field28Value="";
      this._field29Label="";
      this._field29Value="";
      this._field30Label="";
      this._field30Value="";
      this._field31Label="";
      this._field31Value="";
      this._successButtonAction1="";
      this._successButtonAction2="";
      this._successButtonAction3="";
      this._successButtonAction4="";
      this._successTransactionTitle="";
      this.__successApprovalTitle="";
      //Parser Util Object
      this.parserUtilsManager = new ParserUtilsManager();
      //Entitlement util object
      this.EntitlementUtils = new EntitlementUtils();
      //Format util object
      this.formatUtils = new FormatUtils;
      //Json validator object
      this.jsonValidator = new JSONValidator();
      this.dataProcessorUtility = new DataProcessorUtility();
      //global variables
      this.invalidJSONLoggerArray = [];
      this.isValidJSONString = "";
      this.jsonError = "";
      this.currencyCode = "";
      this.transferStatus = "";
      this.payee = "";
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {
            defineSetter(this, 'sknHeaderLabel', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknHeaderLabel = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'sknHeaderLabel',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'sknHeaderLabel', function () {
                return this._sknHeaderLabel;
            });
            defineSetter(this, 'successTransactionIcon', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._successTransactionIcon = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'successTransactionIcon',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'successTransactionIcon', function () {
                return this._successTransactionIcon;
            });
            defineSetter(this, 'field1Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field1Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field1Label',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field1Label', function () {
                return this._field1Label;
            });
            defineSetter(this, 'notesLabel', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._notesLabel = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'notesLabel',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'notesLabel', function () {
                return this._notesLabel;
            });
            defineSetter(this, 'payeeStatus', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._payeeStatus = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'payeeStatus',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'payeeStatus', function () {
                return this._payeeStatus;
            });
            defineSetter(this, 'failureTransactionTitle', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._failureTransactionTitle = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'failureTransactionTitle',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'failureTransactionTitle', function () {
                return this._failureTransactionTitle;
            });
            defineSetter(this, 'amountFormat', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._amountFormat = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'amountFormat',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'amountFormat', function () {
                return this._amountFormat;
            });
            defineSetter(this, 'headerLabel', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._headerLabel = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'headerLabel',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'headerLabel', function () {
                return this._headerLabel;
            });
            defineSetter(this, 'sknHeaderBackground', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknHeaderBackground = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'sknHeaderBackground',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'sknHeaderBackground', function () {
                return this._sknHeaderBackground;
            });
            defineSetter(this, 'failureTransactionIcon', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._failureTransactionIcon = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'failureTransactionIcon',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'failureTransactionIcon', function () {
                return this._failureTransactionIcon;
            });
            defineSetter(this, 'field1Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field1Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field1Value',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field1Value', function () {
                return this._field1Value;
            });
            defineSetter(this, 'notesValue', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._notesValue = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'notesValue',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'notesValue', function () {
                return this._notesValue;
            });
            defineSetter(this, 'failureTransactionDescription', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._failureTransactionDescription = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'failureTransactionDescription',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'failureTransactionDescription', function () {
                return this._failureTransactionDescription;
            });
            defineSetter(this, 'pngImage', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._pngImage = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'pngImage',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'pngImage', function () {
                return this._pngImage;
            });
            defineSetter(this, 'jpegImage', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._jpegImage = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'jpegImage',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'jpegImage', function () {
                return this._jpegImage;
            });
            defineSetter(this, 'dateFormat', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._dateFormat = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'dateFormat',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'dateFormat', function () {
                return this._dateFormat;
            });
            defineSetter(this, 'transactionStatus', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._transactionStatus = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'transactionStatus',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'transactionStatus', function () {
                return this._transactionStatus;
            });
            defineSetter(this, 'sknRowSeparator', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknRowSeparator = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'sknRowSeparator',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'sknRowSeparator', function () {
                return this._sknRowSeparator;
            });
            defineSetter(this, 'field2Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field2Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field2Label',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field2Label', function () {
                return this._field2Label;
            });
            defineSetter(this, 'supportingDocumentsLabel', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._supportingDocumentsLabel = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'supportingDocumentsLabel',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'supportingDocumentsLabel', function () {
                return this._supportingDocumentsLabel;
            });
            defineSetter(this, 'failureButtonAction1', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._failureButtonAction1 = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'failureButtonAction1',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'failureButtonAction1', function () {
                return this._failureButtonAction1;
            });
            defineSetter(this, 'backendDateFormat', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._backendDateFormat = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'backendDateFormat',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'backendDateFormat', function () {
                return this._backendDateFormat;
            });
            defineSetter(this, 'backButtonIcon', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._backButtonIcon = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'backButtonIcon',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'backButtonIcon', function () {
                return this._backButtonIcon;
            });
            defineSetter(this, 'sknFieldLabel', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknFieldLabel = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'sknFieldLabel',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'sknFieldLabel', function () {
                return this._sknFieldLabel;
            });
            defineSetter(this, 'field2Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field2Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field2Value',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field2Value', function () {
                return this._field2Value;
            });
            defineSetter(this, 'supportingDocumentsValue', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._supportingDocumentsValue = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'supportingDocumentsValue',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'supportingDocumentsValue', function () {
                return this._supportingDocumentsValue;
            });
            defineSetter(this, 'currencyCode', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._currencyCode = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'currencyCode',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'currencyCode', function () {
                return this._currencyCode;
            });
            defineSetter(this, 'sknFieldValue', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknFieldValue = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'sknFieldValue',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'sknFieldValue', function () {
                return this._sknFieldValue;
            });
            defineSetter(this, 'field3Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field3Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field3Label',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field3Label', function () {
                return this._field3Label;
            });
            defineSetter(this, 'addressLabel', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._addressLabel = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'addressLabel',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'addressLabel', function () {
                return this._addressLabel;
            });
            defineSetter(this, 'sknTransactionSuccessLabel', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknTransactionSuccessLabel = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'sknTransactionSuccessLabel',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'sknTransactionSuccessLabel', function () {
                return this._sknTransactionSuccessLabel;
            });
            defineSetter(this, 'field3Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field3Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field3Value',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field3Value', function () {
                return this._field3Value;
            });
            defineSetter(this, 'addressLine1Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._addressLine1Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'addressLine1Value',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'addressLine1Value', function () {
                return this._addressLine1Value;
            });
            defineSetter(this, 'sknTransactionFailureTitle', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknTransactionFailureTitle = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'sknTransactionFailureTitle',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'sknTransactionFailureTitle', function () {
                return this._sknTransactionFailureTitle;
            });
            defineSetter(this, 'field4Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field4Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field4Label',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field4Label', function () {
                return this._field4Label;
            });
            defineSetter(this, 'addressLine2Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._addressLine2Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'addressLine2Value',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'addressLine2Value', function () {
                return this._addressLine2Value;
            });
            defineSetter(this, 'sknTransactionFailureDescription', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._sknTransactionFailureDescription = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'sknTransactionFailureDescription',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'sknTransactionFailureDescription', function () {
                return this._sknTransactionFailureDescription;
            });
            defineSetter(this, 'field4Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field4Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field4Value',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field4Value', function () {
                return this._field4Value;
            });
            defineSetter(this, 'mobileLabel', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._mobileLabel = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'mobileLabel',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'mobileLabel', function () {
                return this._mobileLabel;
            });
            defineSetter(this, 'mobileValue', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._mobileValue = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'mobileValue',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'mobileValue', function () {
                return this._mobileValue;
            });
            defineSetter(this, 'field5Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field5Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field5Label',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field5Label', function () {
                return this._field5Label;
            });
            defineSetter(this, 'field5Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field5Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field5Value',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field5Value', function () {
                return this._field5Value;
            });
            defineSetter(this, 'emailLabel', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._emailLabel = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'emailLabel',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'emailLabel', function () {
                return this._emailLabel;
            });
            defineSetter(this, 'emailValue', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._emailValue = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'emailValue',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'emailValue', function () {
                return this._emailValue;
            });
            defineSetter(this, 'field6Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field6Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field6Label',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field6Label', function () {
                return this._field6Label;
            });
            defineSetter(this, 'field6Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field6Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field6Value',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field6Value', function () {
                return this._field6Value;
            });
            defineSetter(this, 'cityLabel', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._cityLabel = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'cityLabel',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'cityLabel', function () {
                return this._cityLabel;
            });
            defineSetter(this, 'cityValue', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._cityValue = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'cityValue',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'cityValue', function () {
                return this._cityValue;
            });
            defineSetter(this, 'field7Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field7Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field7Label',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field7Label', function () {
                return this._field7Label;
            });
            defineSetter(this, 'field7Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field7Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field7Value',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field7Value', function () {
                return this._field7Value;
            });
            defineSetter(this, 'stateLabel', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._stateLabel = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'stateLabel',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'stateLabel', function () {
                return this._stateLabel;
            });
            defineSetter(this, 'stateValue', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._stateValue = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'stateValue',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'stateValue', function () {
                return this._stateValue;
            });
            defineSetter(this, 'field8Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field8Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field8Label',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field8Label', function () {
                return this._field8Label;
            });
            defineSetter(this, 'countryLabel', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._countryLabel = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'countryLabel',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'countryLabel', function () {
                return this._countryLabel;
            });
            defineSetter(this, 'field8Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field8Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field8Value',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field8Value', function () {
                return this._field8Value;
            });
            defineSetter(this, 'countryValue', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._countryValue = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'countryValue',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'countryValue', function () {
                return this._countryValue;
            });
            defineSetter(this, 'field9Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field9Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field9Label',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field9Label', function () {
                return this._field9Label;
            });
            defineSetter(this, 'postalCodeLabel', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._postalCodeLabel = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'postalCodeLabel',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'postalCodeLabel', function () {
                return this._postalCodeLabel;
            });
            defineSetter(this, 'field9Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field9Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field9Value',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field9Value', function () {
                return this._field9Value;
            });
            defineSetter(this, 'postalCodeValue', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._postalCodeValue = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'postalCodeValue',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'postalCodeValue', function () {
                return this._postalCodeValue;
            });
            defineSetter(this, 'field10Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field10Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field10Label',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field10Label', function () {
                return this._field10Label;
            });
            defineSetter(this, 'field10Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field10Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field10Value',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field10Value', function () {
                return this._field10Value;
            });
            defineSetter(this, 'field11Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field11Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field11Label',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field11Label', function () {
                return this._field11Label;
            });
            defineSetter(this, 'field11Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field11Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field11Value',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field11Value', function () {
                return this._field11Value;
            });
            defineSetter(this, 'field12Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field12Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field12Label',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field12Label', function () {
                return this._field12Label;
            });
            defineSetter(this, 'field12Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field12Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field12Value',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field12Value', function () {
                return this._field12Value;
            });
            defineSetter(this, 'field13Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field13Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field13Label',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field13Label', function () {
                return this._field13Label;
            });
            defineSetter(this, 'field13Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field13Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field13Value',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field13Value', function () {
                return this._field13Value;
            });
            defineSetter(this, 'field14Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field14Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field14Label',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field14Label', function () {
                return this._field14Label;
            });
            defineSetter(this, 'field14Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field14Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field14Value',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field14Value', function () {
                return this._field14Value;
            });
            defineSetter(this, 'field15Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field15Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field15Label',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field15Label', function () {
                return this._field15Label;
            });
            defineSetter(this, 'field15Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field15Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field15Value',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field15Value', function () {
                return this._field15Value;
            });
            defineSetter(this, 'field16Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field16Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field16Label',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field16Label', function () {
                return this._field16Label;
            });
            defineSetter(this, 'field16Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field16Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field16Value',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field16Value', function () {
                return this._field16Value;
            });
            defineSetter(this, 'field17Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field17Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field17Label',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field17Label', function () {
                return this._field17Label;
            });
            defineSetter(this, 'field17Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field17Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field17Value',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field17Value', function () {
                return this._field17Value;
            });
            defineSetter(this, 'field18Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field18Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field18Label',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field18Label', function () {
                return this._field18Label;
            });
            defineSetter(this, 'field18Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field18Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field18Value',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field18Value', function () {
                return this._field18Value;
            });
            defineSetter(this, 'field19Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field19Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field19Label',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field19Label', function () {
                return this._field19Label;
            });
            defineSetter(this, 'field19Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field19Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field19Value',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field19Value', function () {
                return this._field19Value;
            });
            defineSetter(this, 'field20Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field20Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field20Label',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field20Label', function () {
                return this._field20Label;
            });
            defineSetter(this, 'field20Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field20Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field20Value',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field20Value', function () {
                return this._field20Value;
            });
            defineSetter(this, 'field21Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field21Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field21Label',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field21Label', function () {
                return this._field21Label;
            });
            defineSetter(this, 'field21Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field21Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field21Value',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field21Value', function () {
                return this._field21Value;
            });
            defineSetter(this, 'field22Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field22Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field22Label',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field22Label', function () {
                return this._field22Label;
            });
            defineSetter(this, 'field22Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field22Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field22Value',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field22Value', function () {
                return this._field22Value;
            });
            defineSetter(this, 'field23Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field23Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field23Label',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field23Label', function () {
                return this._field23Label;
            });
            defineSetter(this, 'field23Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field23Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field23Value',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field23Value', function () {
                return this._field23Value;
            });
            defineSetter(this, 'field24Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field24Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field24Label',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field24Label', function () {
                return this._field24Label;
            });
            defineSetter(this, 'field24Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field24Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field24Value',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field24Value', function () {
                return this._field24Value;
            });
            defineSetter(this, 'field25Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field25Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field25Label',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field25Label', function () {
                return this._field25Label;
            });
            defineSetter(this, 'field25Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field25Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field25Value',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field25Value', function () {
                return this._field25Value;
            });
            defineSetter(this, 'field26Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field26Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field26Label',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field26Label', function () {
                return this._field26Label;
            });
            defineSetter(this, 'field26Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field26Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field26Value',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field26Value', function () {
                return this._field26Value;
            });
            defineSetter(this, 'field27Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field27Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field27Label',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field27Label', function () {
                return this._field27Label;
            });
            defineSetter(this, 'field27Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field27Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field27Value',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field27Value', function () {
                return this._field27Value;
            });
            defineSetter(this, 'field28Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field28Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field28Label',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field28Label', function () {
                return this._field28Label;
            });
            defineSetter(this, 'field28Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field28Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field28Value',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field28Value', function () {
                return this._field28Value;
            });
            defineSetter(this, 'field29Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field29Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field29Label',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field29Label', function () {
                return this._field29Label;
            });
            defineSetter(this, 'field29Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field29Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field29Value',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field29Value', function () {
                return this._field29Value;
            });
            defineSetter(this, 'field30Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field30Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field30Label',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field30Label', function () {
                return this._field30Label;
            });
            defineSetter(this, 'field30Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field30Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field30Value',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field30Value', function () {
                return this._field30Value;
            });
            defineSetter(this, 'field31Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field31Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field31Label',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field31Label', function () {
                return this._field31Label;
            });
            defineSetter(this, 'field31Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field31Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'field31Value',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'field31Value', function () {
                return this._field31Value;
            });
            defineSetter(this, 'successButtonAction1', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._successButtonAction1 = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'successButtonAction1',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'successButtonAction1', function () {
                return this._successButtonAction1;
            });
            defineSetter(this, 'successButtonAction2', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._successButtonAction2 = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'successButtonAction2',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'successButtonAction2', function () {
                return this._successButtonAction2;
            });
            defineSetter(this, 'successButtonAction3', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._successButtonAction3 = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'successButtonAction3',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'successButtonAction3', function () {
                return this._successButtonAction3;
            });
            defineSetter(this, 'successButtonAction4', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._successButtonAction4 = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'successButtonAction4',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'successButtonAction4', function () {
                return this._successButtonAction4;
            });
            defineSetter(this, 'successTransactionTitle', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._successTransactionTitle = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'successTransactionTitle',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, 'successTransactionTitle', function () {
                return this._successTransactionTitle;
            });
            defineGetter(this, 'successApprovalTitle', () => {
                return this._successApprovalTitle;
            });
            defineSetter(this, 'successApprovalTitle', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._successApprovalTitle = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === 'false') {
                        this.jsonError = {
                            fieldName: 'successApprovalTitle',
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
        },
    /**
         * Component preShow
         * Reponsible to retain the data for custom properties for multiple entries into the component
         */
    preshow:function()
    {
     
      try
      {
        this.currencyCode = this.getFieldValue(this._currencyCode);
        this.transferStatus = this.getFieldValue(this._transactionStatus);
        this.payee = this.getFieldValue(this._payeeStatus);
        if(!this.isEmptyNullUndefined(this.payee) && this.payee === "New")
          {
            this.payee = "New";
          }
        this.formattingJSON = {
          "amountFormat" : JSON.parse(this._amountFormat),
          "dateFormat" : this._dateFormat,
          "backenddateformat" : this._backendDateFormat,
          "currencyCode" : this.currencyCode
        };
        this.formatSkins = {
          TEXT_SKIN: "",
          POSITIVE_AMOUNT_SKIN: "",
          NEGATIVE_AMOUNT_SKIN: "",
          DATE_SKIN: "",
          PERCENTAGE_SKIN: ""
        };
        var deviceName= kony.os.deviceInfo()["name"];
        if(deviceName === "iPhone")
          {
            this.view.lblAcknowledgement.top = "10dp";
            this.view.flxMain.top = "60dp";
          }
        this.resetData();
        this.view.forceLayout();
        this.icons = {
          SUCCESS_ICON : this._successTransactionIcon,
          FAILURE_ICON : this._failureTransactionIcon,
          BACK_BUTTON_ICON : this._backButtonIcon,
          PNG_IMAGE : this._pngImage,
          JPEG_IMAGE : this._jpegImage
        };
        if (this.invalidJSONLoggerArray.length > 0) {
          this.printJSONValidator();
        }
        this.initActions();
        if(!this.isEmptyNullUndefined(this.transferStatus))
        {
          this.view.flxSuccess.setVisibility(true);
          this.view.flxFail.setVisibility(false);
          this.setSuccessAcknowledgementDetails();    
        }
        else
        {
          this.view.flxSuccess.setVisibility(false);
          this.view.flxFail.setVisibility(true);
          this.setFailureAcknowledgementDetails();
        }
        this.view.forceLayout();
      }
      catch (err) {
        var errorObj = {
          "errorInfo": "Error in preShow",
          "errorLevel": "Configuration",
          "error": err
        };
        this.onError(errorObj);
      }
    },
    /**
         * Component initActions
         * Reponsible to initialize the actions
         */
    initActions : function()
    {
      var scope = this;
      scope.view.lblAcknowledgement.text = scope.getFieldValue(scope._headerLabel);
      scope.view.lblAcknowledgement.skin = scope._sknHeaderLabel;
      scope.view.flxHeader.skin = scope._sknHeaderBackground;
      scope.view.imgBack.src = scope.icons.BACK_BUTTON_ICON;
      scope.view.imgBack.onTouchStart = function(){
        scope.onBack();
      };
      var btnId1 = scope.getFieldValue(scope._successButtonAction1, "id");
      scope.view.btnSuccessAction1.onClick = function() {
        scope.contextualActionButtonOnClick(btnId1,scope.context);
      };
      var btnId2 = scope.getFieldValue(scope._successButtonAction2, "id");
      scope.view.btnSuccessAction2.onClick = function() {
        scope.contextualActionButtonOnClick(btnId2,scope.context);
      };
      var btnId3 = scope.getFieldValue(scope._successButtonAction3, "id");
      scope.view.btnSuccessAction3.onClick = function() {
        scope.contextualActionButtonOnClick(btnId3,scope.context);
      };
      var btnId4 = scope.getFieldValue(scope._successButtonAction4, "id");
      scope.view.btnSuccessAction4.onClick = function() {
        scope.contextualActionButtonOnClick(btnId4,scope.context);
      };
      var btnId5 = scope.getFieldValue(scope._failureButtonAction1, "id");
      scope.view.btnFailureAction1.onClick = function() {
        scope.contextualActionButtonOnClick(btnId5,scope.context);
      };
    },
    /**
         * Component setSuccessAcknowledgementDetails
         * Reponsible to set the success scknowledgment details in segment
         */
    setSuccessAcknowledgementDetails:function()
    {
      var scope = this,data = [],fieldLabel = "",fieldValue = "",flxSeparator = "";
      try{
        scope.view.imgSuccess.src = scope.icons.SUCCESS_ICON;
        if(!scope.isEmptyNullUndefined(scope.context["transactionStatus"]) && scope.context["transactionStatus"] === "Pending") {
        scope.view.lblSuccess.text = scope.getFieldValue(scope._successApprovalTitle);  
        } else {
        scope.view.lblSuccess.text = scope.getFieldValue(scope._successTransactionTitle);
        }
        if(!scope.isEmptyNullUndefined(scope.context["faileduploads"]))
          {
            this.dataProcessorUtility.showToastMessageError(scope, "Failed to upload these documents "+scope.context["faileduploads"]);
          }
        if(!scope.isEmptyNullUndefined(scope.payee) && scope.payee === "New")
          {
            scope.context["successfulUploads"] = scope.context["originalDocuments"];
            scope.context["transactionsNotes"] = scope.context["notes"];
            this.parserUtilsManager.setContext(scope.context);
          }
        for (var i=1;i<=31;i++)
        {
          fieldLabel = scope.getFieldValue(scope['_field'+i+"Label"]);
          fieldValue = scope.getFieldValue(scope['_field'+i+"Value"],"text");
          if(!(scope.isEmptyNullUndefined(fieldLabel) || scope.isEmptyNullUndefined(fieldValue)))
          {
            fieldLabel = {
              "text" : fieldLabel,
              "skin" : scope._sknFieldLabel
            };
            flxSeparator = {
              "skin" : scope._sknRowSeparator,
              "isVisible" : true,
            };
            fieldValue = {
              "text" : fieldValue,
              "skin" : scope._sknFieldValue
            };
            scope.view.flxDetails.setVisibility(true);
            data.push(
              {
                "lblFieldLabel" : fieldLabel,
                "lblFieldValue" : fieldValue,
                "flxSeparator"  : flxSeparator
              }
            );
          }
        }
        var datamapping = {
          "lblFieldLabel" : "lblFieldLabel",
          "lblFieldValue" : "lblFieldValue",
          "flxSeparator" : "flxSeparator"
        };
        scope.view.segDetails.widgetDataMap = datamapping;
        scope.view.segDetails.setData(data);

        var documentsLabel = scope.getFieldValue(scope._supportingDocumentsLabel);
        var documentsValue = scope.getFieldValue(scope._supportingDocumentsValue);
        var documents = [],originalDocuments = {};
        if(!(scope.isEmptyNullUndefined(documentsLabel) || scope.isEmptyNullUndefined(documentsValue)))
        {
          scope.view.lblDocuementsLabel.text = documentsLabel;
          scope.view.lblDocuementsLabel.skin = scope._sknFieldLabel;
          scope.view.flxDocuments.setVisibility(true);
          documentsValue = documentsValue.split(',');
          originalDocuments = scope.context["originalDocuments"];
          for (var j=0; j<documentsValue.length; j++)
          {
            documents[j] = {
              "fileName" : {
                "text" : documentsValue[j],
                "skin" : scope._sknFieldValue
              },
              "imageName" : originalDocuments[documentsValue[j]].filetype,
              "flxAttachmentRemove" : {
                "isVisible" : false
              },
            };
          }
          var mapping = {
            "imgAttachment" : "imageName",
            "lblAttachment" : "fileName",
            "flxAttachmentRemove" : "flxAttachmentRemove"
          };
          scope.view.segAttachments.widgetDataMap = mapping;
          scope.view.segAttachments.setData(documents);
        }
        var notesLabel = scope.getFieldValue(scope._notesLabel);
        var notesValue = scope.getFieldValue(scope._notesValue,"text");
        if(!(scope.isEmptyNullUndefined(notesLabel) || scope.isEmptyNullUndefined(notesValue)))
        {
          scope.view.lblNotesLabel.text = notesLabel;
          scope.view.lblNotesLabel.skin = scope._sknFieldLabel;
          scope.view.lblNotesValue.text = notesValue;
          scope.view.lblNotesValue.skin = scope._sknFieldValue;
          scope.view.flxNotes.setVisibility(true);
        }
        var addressDetails = "";
		scope.view.lblAddressLabel.setVisibility(false);
        var addressLabel = scope.getFieldValue(scope._addressLabel,"text");
        if(!scope.isEmptyNullUndefined(addressLabel))
        {
          scope.view.lblAddressLabel.text = addressLabel;
          scope.view.lblAddressLabel.skin = scope._sknFieldLabel;
          scope.view.lblAddressLabel.setVisibility(true);
        }
        var mobileLabel = scope.getFieldValue(scope._mobileLabel);
        var mobileValue = scope.getFieldValue(scope._mobileValue,"text");
        this.view.flxMobile.setVisibility(false);
        if(!(scope.isEmptyNullUndefined(mobileLabel) || scope.isEmptyNullUndefined(mobileValue)))
        {
          scope.view.lblMobileLabel.text = mobileLabel;
          scope.view.lblMobileLabel.skin = scope._sknFieldLabel;
          scope.view.lblMobileValue.text = mobileValue;
          scope.view.lblMobileValue.skin = scope._sknFieldValue;
          scope.view.flxAddress.setVisibility(true);
          this.view.flxMobile.setVisibility(true);
        }
        var emailLabel = scope.getFieldValue(scope._emailLabel);
        var emailValue = scope.getFieldValue(scope._emailValue,"text");
        this.view.flxEmail.setVisibility(false);
        if(!(scope.isEmptyNullUndefined(emailLabel) || scope.isEmptyNullUndefined(emailValue)))
        {
          scope.view.lblEmailLabel.text = emailLabel;
          scope.view.lblEmailLabel.skin = scope._sknFieldLabel;
          scope.view.lblEmailValue.text = emailValue;
          scope.view.lblEmailValue.skin = scope._sknFieldValue;
          scope.view.flxAddress.setVisibility(true);
          this.view.flxEmail.setVisibility(true);
        }
        var address1Value = scope.getFieldValue(scope._addressLine1Value,"text");
        if(!scope.isEmptyNullUndefined(address1Value))
        {
         addressDetails = addressDetails+address1Value+", ";
        }
        var address2Value = scope.getFieldValue(scope._addressLine2Value,"text");
        if(!scope.isEmptyNullUndefined(address2Value))
        {
         addressDetails = addressDetails+address2Value+", ";
        }
        var cityValue = scope.getFieldValue(scope._cityValue,"text");
        if(!scope.isEmptyNullUndefined(cityValue))
        {
         addressDetails = addressDetails+cityValue+", ";
        }
        var stateValue = scope.getFieldValue(scope._stateValue,"text");
        if(!scope.isEmptyNullUndefined(stateValue))
        {
         addressDetails = addressDetails+stateValue+", ";
        }
        var countryValue = scope.getFieldValue(scope._countryValue,"text");
        if(!scope.isEmptyNullUndefined(countryValue))
        {
          addressDetails = addressDetails+countryValue+", ";
        }
        var postalCodeValue = scope.getFieldValue(scope._postalCodeValue,"text");
        if(!scope.isEmptyNullUndefined(postalCodeValue))
        {
          addressDetails = addressDetails+postalCodeValue+", ";
        }
        scope.view.lblAddress1.setVisibility(false);
        if(!scope.isEmptyNullUndefined(addressDetails))
        {
          addressDetails = addressDetails.slice(0,-2);
          scope.view.lblAddress1.text = addressDetails;
          scope.view.lblAddress1.skin = scope._sknFieldValue;
          scope.view.lblAddress1.setVisibility(true);
          scope.view.flxAddress.setVisibility(true);
        }
        try
        {
          let text = scope.getFieldValue(scope._successButtonAction1,"text");
          var data = scope.context;
          var btnId= scope.getFieldValue(scope._successButtonAction1,"id");
          if(!((!scope.isEmptyNullUndefined(text)) && (btnId === "SaveNewPayee" && scope.payee !== "New")) && scope.isEmptyNullUndefined(btnId)===false){
            scope.view.btnSuccessAction1.text = text;
            scope.view.btnSuccessAction1.skin= scope.getFieldValue(scope._successButtonAction1, "skin");    
            var entitlementKeys = scope.getFieldValue(scope._successButtonAction1, "entitlement_keys");
            var entitlementAction = scope.getFieldValue(scope._successButtonAction1, "entitlement_action");
            if(entitlementAction){
              scope.getBtnEntitlement(btnId,data,function(visibility){
                if(visibility === true){
                  scope.view.btnSuccessAction1.setVisibility(true);
                }
                else{
                  scope.view.btnSuccessAction1.setVisibility(false);
                }    
              });
            }
            else if(scope.EntitlementUtils.isEntitled(entitlementKeys)){
              scope.view.btnSuccessAction1.setVisibility(false);
            }          
            else{
              scope.view.btnSuccessAction1.setVisibility(true);
            }
          }
          else{
            scope.view.btnSuccessAction1.setVisibility(false);
          }
        }
        catch(err)
        {
          scope.view.btnSuccessAction1.setVisibility(false);
        }


        try
        {
          let text = scope.getFieldValue(scope._successButtonAction2,"text");
          var data = scope.context;
          var btnId= scope.getFieldValue(scope._successButtonAction2,"id");
          if(!((!scope.isEmptyNullUndefined(text)) && (btnId === "SaveNewPayee" && scope.payee !== "New")) && scope.isEmptyNullUndefined(btnId)===false){
            scope.view.btnSuccessAction2.text = text;
            scope.view.btnSuccessAction2.skin= scope.getFieldValue(scope._successButtonAction2, "skin");    
            var entitlementKeys = scope.getFieldValue(scope._successButtonAction2, "entitlement_keys");
            var entitlementAction = scope.getFieldValue(scope._successButtonAction2, "entitlement_action");
            if(entitlementAction){
              scope.getBtnEntitlement(btnId,data,function(visibility){
                if(visibility === true){
                  scope.view.btnSuccessAction2.setVisibility(true);
                }
                else{
                  scope.view.btnSuccessAction2.setVisibility(false);
                }    
              });
            }
            else if(scope.EntitlementUtils.isEntitled(entitlementKeys)){
              scope.view.btnSuccessAction2.setVisibility(false);
            }          
            else{
              scope.view.btnSuccessAction2.setVisibility(true);
            }
          }
          else{
            scope.view.btnSuccessAction2.setVisibility(false);
          }
        }
        catch(err)
        {
          scope.view.btnSuccessAction2.setVisibility(false);
        }


        try
        {
          let text = scope.getFieldValue(scope._successButtonAction3,"text");
          var data = scope.context;
          var btnId= scope.getFieldValue(scope._successButtonAction3,"id");
          if(!((!scope.isEmptyNullUndefined(text)) && (btnId === "SaveNewPayee" && scope.payee !== "New")) && scope.isEmptyNullUndefined(btnId)===false){
            scope.view.btnSuccessAction3.text = text;
            scope.view.btnSuccessAction3.skin= scope.getFieldValue(scope._successButtonAction3, "skin");    
            var entitlementKeys = scope.getFieldValue(scope._successButtonAction3, "entitlement_keys");
            var entitlementAction = scope.getFieldValue(scope._successButtonAction3, "entitlement_action");
            if(entitlementAction){
              scope.getBtnEntitlement(btnId,data,function(visibility){
                if(visibility === true){
                  scope.view.btnSuccessAction3.setVisibility(true);
                }
                else{
                  scope.view.btnSuccessAction3.setVisibility(false);
                }    
              });
            }
            else if(scope.EntitlementUtils.isEntitled(entitlementKeys)){
              scope.view.btnSuccessAction3.setVisibility(false);
            }          
            else{
              scope.view.btnSuccessAction3.setVisibility(true);
            }
          }
          else{
            scope.view.btnSuccessAction3.setVisibility(false);
          }
        }
        catch(err)
        {
          scope.view.btnSuccessAction3.setVisibility(false);
        }

        try
        {
          let text = scope.getFieldValue(scope._successButtonAction4,"text");
          var data = scope.context;
          var btnId= scope.getFieldValue(scope._successButtonAction4,"id");
          if(!((!scope.isEmptyNullUndefined(text)) && (btnId === "SaveNewPayee" && scope.payee !== "New")) && scope.isEmptyNullUndefined(btnId)===false){
            scope.view.btnSuccessAction4.text = text;
            scope.view.btnSuccessAction4.skin= scope.getFieldValue(scope._successButtonAction4, "skin");    
            var entitlementKeys = scope.getFieldValue(scope._successButtonAction4, "entitlement_keys");
            var entitlementAction = scope.getFieldValue(scope._successButtonAction4, "entitlement_action");
            if(entitlementAction){
              scope.getBtnEntitlement(btnId,data,function(visibility){
                if(visibility === true){
                  scope.view.btnSuccessAction4.setVisibility(true);
                }
                else{
                  scope.view.btnSuccessAction4.setVisibility(false);
                }    
              });
            }
            else if(scope.EntitlementUtils.isEntitled(entitlementKeys)){
              scope.view.btnSuccessAction4.setVisibility(false);
            }          
            else{
              scope.view.btnSuccessAction4.setVisibility(true);
            }
          }
          else{
            scope.view.btnSuccessAction4.setVisibility(false);
          }
        }
        catch(err)
        {
          scope.view.btnSuccessAction4.setVisibility(false);
        }
        
        let bottom = 25;
        for (let i = 0; i < this.view.flxSuccessButtons.widgets().length; i++) {
          if (this.view.flxSuccessButtons.widgets()[i].isVisible) {
            bottom = bottom+60;
          }
          
        }

        scope.view.flxDetails.bottom = bottom+"dp";
        
      }
      catch(err)
      {
        var errorObj = {
          "errorInfo": "Error in set success acknowledgement details",
          "errorLevel": "Configuration",
          "error": err
        };
        scope.onError(errorObj);
      }
      scope.view.forceLayout();
    },
    /**
         * Component setFailureAcknowledgementDetails
         * Reponsible to set the failure scknowledgment details in segment
         */
    setFailureAcknowledgementDetails : function()
    {
      var scope = this;
      try{
        scope.view.imgFail.src = scope.icons.FAILURE_ICON;
        scope.view.lblFailTitle.text = scope.getFieldValue(scope._failureTransactionTitle);
        scope.view.lblFailDescription.text = scope.getFieldValue(scope._failureTransactionDescription);
        try
        {
          let text = scope.getFieldValue(scope._failureButtonAction1,"text");
          var data = scope.context;
          if(!scope.isEmptyNullUndefined(text)){
            scope.view.btnFailureAction1.text = text;
            var btnId= scope.getFieldValue(scope._failureButtonAction1,"id");
            scope.view.btnFailureAction1.skin= scope.getFieldValue(scope._failureButtonAction1, "skin");    
            var entitlementKeys = scope.getFieldValue(scope._failureButtonAction1, "entitlement_keys");
            var entitlementAction = scope.getFieldValue(scope._failureButtonAction1, "entitlement_action");
            if(entitlementAction){
              scope.getBtnEntitlement(btnId,data,function(visibility){
                if(visibility === true){
                  scope.view.btnFailureAction1.setVisibility(true);
                }
                else{
                  scope.view.btnFailureAction1.setVisibility(false);
                }    
              });
            }
            else if(scope.EntitlementUtils.isEntitled(entitlementKeys)){
              scope.view.btnFailureAction1.setVisibility(false);
            }          
            else{
              scope.view.btnFailureAction1.setVisibility(true);
            }
          }
          else{
            scope.view.btnFailureAction1.setVisibility(false);
          }
        }
        catch(err)
        {
          scope.view.btnFailureAction1.setVisibility(false);
        }
      }
      catch(err)
      {
        var errorObj = {
          "errorInfo": "Error in set failure acknowledgement details",
          "errorLevel": "Configuration",
          "error": err
        };
        scope.onError(errorObj);
      }
      scope.view.forceLayout();
    },
    /**
         * Component printJSONValidator
         * prints the invalid JSON field and its syntaxError
         */
    printJSONValidator: function() {
    
      try {
        for (var i = 0; i < (this.invalidJSONLoggerArray.length); i++) {
          var invalidJSONString = "FieldName: " + this.invalidJSONLoggerArray[i].fieldName + "SyntaxError: " + this.invalidJSONLoggerArray[i].syntaxError;
          console.error(invalidJSONString);
        }
      } catch (err) {
        var errorObj = {
          "errorInfo": "Error in printJSONValidator",
          "errorLevel": "Configuration",
          "error": err
        };
        this.onError(errorObj);
      }
    },
    /**
         * Component getFieldValue
         * Parse the exposed contract value based on accountType selected and breakpoint consideration
         * @param: Value{string} - value collected from exposed contract
         * @param: key{string} - lookup key in the JSON string
         * @return : {string} - Processed value
         */
    getFieldValue: function(Value, key) {
      try {
        var value = Value;
        if (typeof(Value) === "string") {
          value = JSON.parse(Value);
        }
        if (value[this.currentTransactionType]) {
          value = value[this.currentTransactionType];
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
        } else return "";
      } catch (e) {
        kony.print(e);
      }
      return this.getProcessedText(Value);
    },
    /**
         * Component getProcessedText
         * Pass the text to format util to obtained the processed value.
         * text {string} - value to be processed
         * @return : {string} - processed value
         */
    getProcessedText: function(text) {
      return this.parserUtilsManager.getParsedValue(text);
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
         * Component setContext
         * To collect the context object required for the component
         * context{JSONobject} - account object
         */
    setContext: function(context) {
     
      try {
        this.context = context;
        this.parserUtilsManager.setContext(this.context);
      } catch (err) {
        var errorObj = {
          "errorInfo": "Error in the setContext of the component.",
          "errorLevel": "Configuration",
          "error": err
        };
        this.onError(errorObj);
      }
    },
   
        
    resetData : function()
    {
     
      this.view.segAttachments.removeAll();
      this.view.segDetails.removeAll();
      this.view.flxAddress.setVisibility(false);
      this.view.flxNotes.setVisibility(false);
      this.view.flxDocuments.setVisibility(false);
      this.view.flxDetails.setVisibility(false);
    }
  };
});