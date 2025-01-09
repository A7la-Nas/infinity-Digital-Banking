define(['./AccountDetailsDAO', './ParserUtilsManager', 'FormatValueUtils', 'JSONValidator','./EntitlementUtils'], function(AccountDetailsDAO, ParserUtilsManager, FormatValueUtils, JSONValidator, EntitlementUtils) {

    return {
        constructor: function(baseConfig, layoutConfig, pspConfig) {
            // Field label properties.
            this._field1Label = "";
            this._field2Label = "";
            this._field3Label = "";
            this._field4Label = "";
            this._field5Label = "";

            // Field value properties.
            this._field1Value = "";
            this._field2Value = "";
            this._field3Value = "";
            this._field4Value = "";
            this._field5Value = "";

            // Field type properties.
            this._field1type = "";
            this._field2type = "";
            this._field3type = "";
            this._field4type = "";
            this._field5type = "";

            // Service properties.
            this._objectServiceName = "";
            this._operationName = "";
            this._objectName = "";
            this._criteria = "";
            this._identifier = "";

            // Format values.
            this._textSkin = "";
            this._amountFormat = "";
            this._positiveAmountSkin = "";
            this._negativeAmountSkin = "";
            this._highlightedValueSkin = "";
            this._highlightedLabelSkin = "";
            this._labelSkin = "";
            this._dateFormat = "";
            this._backenddateformat = "";
            this._dateSkin = "";
            this._backgroundSkin = "";

            // Context Properties.
            this.accountType = "";
            this.availableBalance = "";
            this.currencyCode = "";
            this.userType = "";
            this._accountTypeContextPath = "";
            this._currencyCodeContextPath = "";
            this._userTypeContextPath = "";

            // Header Label Properties.
            this._accountName = "";
            this._nickName = "";
            this._noOfEllipsis = "";
            this._noOfCharacters = "";
            this._businessAccount = "";
            this._loanEntitlementKeys = "";

            // JSONValidator object.
            this.jsonValidator = new JSONValidator();

            // AccountsDetailsDAO object.      
            this.accountDetailsDAO = new AccountDetailsDAO();

            // ParserUtils object.
            this.parserUtilsManager = new ParserUtilsManager();

            // FormatValueUtils Object.
            this.formatValueUtils = new FormatValueUtils();
            
            //EntitlementUtils Object.
            this.EntitlementUtils = new EntitlementUtils();

            // Global Variables.
            this.map = {};
            this.skins = {};
            this.context = {};
            this.servicesCalled = 0;
            this.servicesCompleted = 0;
            this.showIndication = "";
        },

        // Logic for getters/setters of custom properties.
        initGettersSetters: function() {
            //Field 1 setters and getters.
            defineSetter(this, 'field1Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field1Label = val;
                    isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (isValidJSONString.returnType === 'false') {
                        jsonError = {
                            fieldName: 'field1Label',
                            syntaxError: isValidJSONString.syntaxError
                        };
                        invalidJSONLoggerArray.push(jsonError);
                    }
                }
            });
            defineGetter(this, 'field1Label', function () {
                return this._field1Label;
            });
            defineSetter(this, 'field1Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field1Value = val;
                    isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (isValidJSONString.returnType === 'false') {
                        jsonError = {
                            fieldName: 'field1Value',
                            syntaxError: isValidJSONString.syntaxError
                        };
                        invalidJSONLoggerArray.push(jsonError);
                    }
                }
            });
            defineGetter(this, 'field1Value', function () {
                return this._field1Value;
            });
            defineSetter(this, 'field1Type', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field1Type = val;
                    isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (isValidJSONString.returnType === 'false') {
                        jsonError = {
                            fieldName: 'field1Type',
                            syntaxError: isValidJSONString.syntaxError
                        };
                        invalidJSONLoggerArray.push(jsonError);
                    }
                }
            });
            defineGetter(this, 'field1Type', function () {
                return this._field1Type;
            });
            //Field 2 setters and getters.
            defineSetter(this, 'field2Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field2Label = val;
                    isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (isValidJSONString.returnType === 'false') {
                        jsonError = {
                            fieldName: 'field2Label',
                            syntaxError: isValidJSONString.syntaxError
                        };
                        invalidJSONLoggerArray.push(jsonError);
                    }
                }
            });
            defineGetter(this, 'field2Label', function () {
                return this._field2Label;
            });
            defineSetter(this, 'field2Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field2Value = val;
                    isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (isValidJSONString.returnType === 'false') {
                        jsonError = {
                            fieldName: 'field2Value',
                            syntaxError: isValidJSONString.syntaxError
                        };
                        invalidJSONLoggerArray.push(jsonError);
                    }
                }
            });
            defineGetter(this, 'field2Value', function () {
                return this._field2Value;
            });
            defineSetter(this, 'field2Type', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field2Type = val;
                    isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (isValidJSONString.returnType === 'false') {
                        jsonError = {
                            fieldName: 'field2Type',
                            syntaxError: isValidJSONString.syntaxError
                        };
                        invalidJSONLoggerArray.push(jsonError);
                    }
                }
            });
            defineGetter(this, 'field2Type', function () {
                return this._field2Type;
            });
            //Field 3 setters and getters.
            defineSetter(this, 'field3Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field3Label = val;
                    isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (isValidJSONString.returnType === 'false') {
                        jsonError = {
                            fieldName: 'field3Label',
                            syntaxError: isValidJSONString.syntaxError
                        };
                        invalidJSONLoggerArray.push(jsonError);
                    }
                }
            });
            defineGetter(this, 'field3Label', function () {
                return this._field3Label;
            });
            defineSetter(this, 'field3Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field3Value = val;
                    isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (isValidJSONString.returnType === 'false') {
                        jsonError = {
                            fieldName: 'field3Value',
                            syntaxError: isValidJSONString.syntaxError
                        };
                        invalidJSONLoggerArray.push(jsonError);
                    }
                }
            });
            defineGetter(this, 'field3Value', function () {
                return this._field3Value;
            });
            defineSetter(this, 'field3Type', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field3Type = val;
                    isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (isValidJSONString.returnType === 'false') {
                        jsonError = {
                            fieldName: 'field3Type',
                            syntaxError: isValidJSONString.syntaxError
                        };
                        invalidJSONLoggerArray.push(jsonError);
                    }
                }
            });
            defineGetter(this, 'field3Type', function () {
                return this._field3Type;
            });
            //Field 4 setters and getters.
            defineSetter(this, 'field4Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field4Label = val;
                    isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (isValidJSONString.returnType === 'false') {
                        jsonError = {
                            fieldName: 'field4Label',
                            syntaxError: isValidJSONString.syntaxError
                        };
                        invalidJSONLoggerArray.push(jsonError);
                    }
                }
            });
            defineGetter(this, 'field4Label', function () {
                return this._field4Label;
            });
            defineSetter(this, 'field4Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field4Value = val;
                    isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (isValidJSONString.returnType === 'false') {
                        jsonError = {
                            fieldName: 'field4Value',
                            syntaxError: isValidJSONString.syntaxError
                        };
                        invalidJSONLoggerArray.push(jsonError);
                    }
                }
            });
            defineGetter(this, 'field4Value', function () {
                return this._field4Value;
            });
            defineSetter(this, 'field4Type', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field4Type = val;
                    isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (isValidJSONString.returnType === 'false') {
                        jsonError = {
                            fieldName: 'field4Type',
                            syntaxError: isValidJSONString.syntaxError
                        };
                        invalidJSONLoggerArray.push(jsonError);
                    }
                }
            });
            defineGetter(this, 'field4Type', function () {
                return this._field4Type;
            });
            //Field 5 setters and getters.
            defineSetter(this, 'field5Label', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field5Label = val;
                    isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (isValidJSONString.returnType === 'false') {
                        jsonError = {
                            fieldName: 'field5Label',
                            syntaxError: isValidJSONString.syntaxError
                        };
                        invalidJSONLoggerArray.push(jsonError);
                    }
                }
            });
            defineGetter(this, 'field5Label', function () {
                return this._field5Label;
            });
            defineSetter(this, 'field5Value', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field5Value = val;
                    isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (isValidJSONString.returnType === 'false') {
                        jsonError = {
                            fieldName: 'field5Value',
                            syntaxError: isValidJSONString.syntaxError
                        };
                        invalidJSONLoggerArray.push(jsonError);
                    }
                }
            });
            defineGetter(this, 'field5Value', function () {
                return this._field5Value;
            });
            defineSetter(this, 'field5Type', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._field5Type = val;
                    isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (isValidJSONString.returnType === 'false') {
                        jsonError = {
                            fieldName: 'field5Type',
                            syntaxError: isValidJSONString.syntaxError
                        };
                        invalidJSONLoggerArray.push(jsonError);
                    }
                }
            });
            defineGetter(this, 'field5Type', function () {
                return this._field5Type;
            });
            //Skin properties and format values setters and getters.
            defineSetter(this, 'labelSkin', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._labelSkin = val;
                    isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (isValidJSONString.returnType === 'false') {
                        jsonError = {
                            fieldName: 'labelSkin',
                            syntaxError: isValidJSONString.syntaxError
                        };
                        invalidJSONLoggerArray.push(jsonError);
                    }
                }
            });
            defineGetter(this, 'labelSkin', function () {
                return this._labelSkin;
            });
            defineSetter(this, 'highlightedValueSkin', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._highlightedValueSkin = val;
                    isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (isValidJSONString.returnType === 'false') {
                        jsonError = {
                            fieldName: 'highlightedValueSkin',
                            syntaxError: isValidJSONString.syntaxError
                        };
                        invalidJSONLoggerArray.push(jsonError);
                    }
                }
            });
            defineGetter(this, 'highlightedValueSkin', function () {
                return this._highlightedValueSkin;
            });
            defineSetter(this, 'highlightedLabelSkin', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._highlightedLabelSkin = val;
                    isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (isValidJSONString.returnType === 'false') {
                        jsonError = {
                            fieldName: 'highlightedLabelSkin',
                            syntaxError: isValidJSONString.syntaxError
                        };
                        invalidJSONLoggerArray.push(jsonError);
                    }
                }
            });
            defineGetter(this, 'highlightedLabelSkin', function () {
                return this._highlightedLabelSkin;
            });
            defineSetter(this, 'textSkin', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._textSkin = val;
                    isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (isValidJSONString.returnType === 'false') {
                        jsonError = {
                            fieldName: 'textSkin',
                            syntaxError: isValidJSONString.syntaxError
                        };
                        invalidJSONLoggerArray.push(jsonError);
                    }
                }
            });
            defineGetter(this, 'textSkin', function () {
                return this._textSkin;
            });
            defineSetter(this, 'positiveAmountSkin', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._positiveAmountSkin = val;
                    isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (isValidJSONString.returnType === 'false') {
                        jsonError = {
                            fieldName: 'positiveAmountSkin',
                            syntaxError: isValidJSONString.syntaxError
                        };
                        invalidJSONLoggerArray.push(jsonError);
                    }
                }
            });
            defineGetter(this, 'positiveAmountSkin', function () {
                return this._positiveAmountSkin;
            });
            defineSetter(this, 'negativeAmountSkin', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._negativeAmountSkin = val;
                    isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (isValidJSONString.returnType === 'false') {
                        jsonError = {
                            fieldName: 'negativeAmountSkin',
                            syntaxError: isValidJSONString.syntaxError
                        };
                        invalidJSONLoggerArray.push(jsonError);
                    }
                }
            });
            defineGetter(this, 'negativeAmountSkin', function () {
                return this._negativeAmountSkin;
            });
            defineSetter(this, 'dateFormat', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._dateFormat = val;
                    isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (isValidJSONString.returnType === 'false') {
                        jsonError = {
                            fieldName: 'dateFormat',
                            syntaxError: isValidJSONString.syntaxError
                        };
                        invalidJSONLoggerArray.push(jsonError);
                    }
                }
            });
            defineGetter(this, 'dateFormat', function () {
                return this._dateFormat;
            });
            defineSetter(this, 'backenddateformat', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._backenddateformat = val;
                    isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (isValidJSONString.returnType === 'false') {
                        jsonError = {
                            fieldName: 'backendDateFormat',
                            syntaxError: isValidJSONString.syntaxError
                        };
                        invalidJSONLoggerArray.push(jsonError);
                    }
                }
            });
            defineGetter(this, 'backenddateformat', function () {
                return this._backenddateformat;
            });
            defineSetter(this, 'dateSkin', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._dateSkin = val;
                    isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (isValidJSONString.returnType === 'false') {
                        jsonError = {
                            fieldName: 'dateSkin',
                            syntaxError: isValidJSONString.syntaxError
                        };
                        invalidJSONLoggerArray.push(jsonError);
                    }
                }
            });
            defineGetter(this, 'dateSkin', function () {
                return this._dateSkin;
            });
            defineSetter(this, 'backgroundSkin', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._backgroundSkin = val;
                    isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (isValidJSONString.returnType === 'false') {
                        jsonError = {
                            fieldName: 'backgroundSkin',
                            syntaxError: isValidJSONString.syntaxError
                        };
                        invalidJSONLoggerArray.push(jsonError);
                    }
                }
            });
            defineGetter(this, 'backgroundSkin', function () {
                return this._backgroundSkin;
            });
            defineSetter(this, 'amountFormat', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._amountFormat = val;
                    isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (isValidJSONString.returnType === 'false') {
                        jsonError = {
                            fieldName: 'amountFormat',
                            syntaxError: isValidJSONString.syntaxError
                        };
                        invalidJSONLoggerArray.push(jsonError);
                    }
                }
            });
            defineGetter(this, 'amountFormat', function () {
                return this._amountFormat;
            });
            // Service properties setters and getters.
            defineSetter(this, 'objectServiceName', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._objectServiceName = val;
                    isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (isValidJSONString.returnType === 'false') {
                        jsonError = {
                            fieldName: 'objectServiceName',
                            syntaxError: isValidJSONString.syntaxError
                        };
                        invalidJSONLoggerArray.push(jsonError);
                    }
                }
            });
            defineGetter(this, 'objectServiceName', function () {
                return this._objectServiceName;
            });
            defineSetter(this, 'objectName', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._objectName = val;
                    isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (isValidJSONString.returnType === 'false') {
                        jsonError = {
                            fieldName: 'objectName',
                            syntaxError: isValidJSONString.syntaxError
                        };
                        invalidJSONLoggerArray.push(jsonError);
                    }
                }
            });
            defineGetter(this, 'objectName', function () {
                return this._objectName;
            });
            defineSetter(this, 'operationName', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._operationName = val;
                    isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (isValidJSONString.returnType === 'false') {
                        jsonError = {
                            fieldName: 'operationName',
                            syntaxError: isValidJSONString.syntaxError
                        };
                        invalidJSONLoggerArray.push(jsonError);
                    }
                }
            });
            defineGetter(this, 'operationName', function () {
                return this._operationName;
            });
            defineSetter(this, 'criteria', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._criteria = val;
                    isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (isValidJSONString.returnType === 'false') {
                        jsonError = {
                            fieldName: 'criteria',
                            syntaxError: isValidJSONString.syntaxError
                        };
                        invalidJSONLoggerArray.push(jsonError);
                    }
                }
            });
            defineGetter(this, 'criteria', function () {
                return this._criteria;
            });
            defineSetter(this, 'identifier', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._identifier = val;
                    isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (isValidJSONString.returnType === 'false') {
                        jsonError = {
                            fieldName: 'serviceIdentifier',
                            syntaxError: isValidJSONString.syntaxError
                        };
                        invalidJSONLoggerArray.push(jsonError);
                    }
                }
            });
            defineGetter(this, 'identifier', function () {
                return this._identifier;
            });
            // Context Search Properties.
            defineSetter(this, 'accountName', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._accountName = val;
                    isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (isValidJSONString.returnType === 'false') {
                        jsonError = {
                            fieldName: 'serviceIdentifier',
                            syntaxError: isValidJSONString.syntaxError
                        };
                        invalidJSONLoggerArray.push(jsonError);
                    }
                }
            });
            defineGetter(this, 'accountName', function () {
                return this._accountName;
            });
            defineSetter(this, 'nickName', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._nickName = val;
                    isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (isValidJSONString.returnType === 'false') {
                        jsonError = {
                            fieldName: 'serviceIdentifier',
                            syntaxError: isValidJSONString.syntaxError
                        };
                        invalidJSONLoggerArray.push(jsonError);
                    }
                }
            });
            defineGetter(this, 'nickName', function () {
                return this._nickName;
            });
            defineSetter(this, 'noOfEllipsis', function (val) {
                if (typeof val === 'number' && val !== '') {
                    this._noOfEllipsis = val;
                    isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (isValidJSONString.returnType === 'false') {
                        jsonError = {
                            fieldName: 'noOfEllipsis',
                            syntaxError: isValidJSONString.syntaxError
                        };
                        invalidJSONLoggerArray.push(jsonError);
                    }
                }
            });
            defineGetter(this, 'noOfEllipsis', function () {
                return this._noOfEllipsis;
            });
            defineSetter(this, 'businessAccount', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._businessAccount = val;
                    isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (isValidJSONString.returnType === 'false') {
                        jsonError = {
                            fieldName: 'businessAccount',
                            syntaxError: isValidJSONString.syntaxError
                        };
                        invalidJSONLoggerArray.push(jsonError);
                    }
                }
            });
            defineGetter(this, 'businessAccount', function () {
                return this._businessAccount;
            });
            defineSetter(this, 'noOfCharacters', function (val) {
                if (typeof val === 'number' && val !== '') {
                    this._noOfCharacters = val;
                    isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (isValidJSONString.returnType === 'false') {
                        jsonError = {
                            fieldName: 'noOfCharacters',
                            syntaxError: isValidJSONString.syntaxError
                        };
                        invalidJSONLoggerArray.push(jsonError);
                    }
                }
            });
            defineGetter(this, 'noOfCharacters', function () {
                return this._noOfCharacters;
            });
            // Context properties setters and getters.  
            defineSetter(this, 'accountTypeContextPath', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._accountTypeContextPath = val;
                    isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (isValidJSONString.returnType === 'false') {
                        jsonError = {
                            fieldName: 'accountType',
                            syntaxError: isValidJSONString.syntaxError
                        };
                        invalidJSONLoggerArray.push(jsonError);
                    }
                }
            });
            defineGetter(this, 'accountTypeContextPath', function () {
                return this._accountTypeContextPath;
            });
            defineSetter(this, 'userTypeContextPath', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._userTypeContextPath = val;
                    isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (isValidJSONString.returnType === 'false') {
                        jsonError = {
                            fieldName: 'userType',
                            syntaxError: isValidJSONString.syntaxError
                        };
                        invalidJSONLoggerArray.push(jsonError);
                    }
                }
            });
            defineGetter(this, 'userTypeContextPath', function () {
                return this._userTypeContextPath;
            });
            defineSetter(this, 'currencyCodeContextPath', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._currencyCodeContextPath = val;
                    isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (isValidJSONString.returnType === 'false') {
                        jsonError = {
                            fieldName: 'currencyCode',
                            syntaxError: isValidJSONString.syntaxError
                        };
                        invalidJSONLoggerArray.push(jsonError);
                    }
                }
            });
            defineGetter(this, 'currencyCodeContextPath', function () {
                return this._currencyCodeContextPath;
            });
            defineGetter(this, 'loanEntitlementKeys', () => {
                return this._loanEntitlementKeys;
            });
            defineSetter(this, 'loanEntitlementKeys', value => {
                this._loanEntitlementKeys = value;
            });
            defineGetter(this, 'customerName', () => {
                return this._customerName;
            });
            defineSetter(this, 'customerName', function (val) {
                if (typeof val === 'string' && val !== '') {
                    this._customerName = val;
                    isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (isValidJSONString.returnType === 'false') {
                        jsonError = {
                            fieldName: 'customerName',
                            syntaxError: isValidJSONString.syntaxError
                        };
                        invalidJSONLoggerArray.push(jsonError);
                    }
                }
            });
        },

        /**
         * Component getCriteria.
         * Parse the criteria from configuration.
         * @param: criteria{string} - service criteria collected from exposed contract.
         * @return : {JSONObject} - jsonvalue for criteria.
         */
        getCriteria: function(criteria) {
            var criteriaJSON = JSON.parse(criteria);
            for (var key in criteriaJSON) {
                criteriaJSON[key] = this.parserUtilsManager.getParsedValue(criteriaJSON[key]);
            }
            return criteriaJSON;
        },

        /**
         * Component setContext.
         * To collect the context object required for the component. 
         * @param: context{JSONobject} - account object.
         */
        setContext: function(context) {
            this.context = context;
            this.parserUtilsManager.setContext(this.context);
        },

        /**
         * Component setAccountTypeFromContext.
         * To set account type from the context object.
         */
        setAccountTypeFromContext: function() {
            this.accountType = this.parserUtilsManager.getParsedValue(this._accountTypeContextPath);
        },

        /**
         * Component setCurrencyCodeFromContext.
         * To set currency code from the context object.
         */
        setCurrencyCodeFromContext: function() {
            this.currencyCode = this.parserUtilsManager.getParsedValue(this._currencyCodeContextPath);
        },

        /**
         * Component setUserTypeFromContext.
         * To set User Type from the context object.
         */
        setUserTypeFromContext: function() {
            this.userType = this.parserUtilsManager.getParsedValue(this._userTypeContextPath);
        },
      
      	/**
         * Component setCustomerName.
         * To set Customer Name from the context object.
         */
        setCustomerName: function() {
            this.customerName = this.parserUtilsManager.getParsedValue(this._customerName);
        },

        /**
         * Component preShow.
         */
        preShow: function() {
            var scopeObj = this;
            try {
                if(kony.os.deviceInfo().name === "iPhone") {
                  this.view.flxHeader.setVisibility(true);
                } else {
                  this.view.flxHeader.setVisibility(false);
                }
                scopeObj.view.search.onError = scopeObj.onError;
                scopeObj.view.search.onFilterClick = function(response) {
                    scopeObj.onFilterClickAction(response, scopeObj.showIndication);
                };
                scopeObj.view.search.onSearchClick = function(searchData) {
                    scopeObj.setSearchText(searchData);
                };
                scopeObj.view.search.onCancelClick = function() {
                    scopeObj.onResetSearch();
                };
                scopeObj.EntitlementUtils.setEntitlements(this.context);
                scopeObj.resetBackupResponseData();
                scopeObj.setAccountTypeFromContext();
                scopeObj.setCurrencyCodeFromContext();
                scopeObj.setUserTypeFromContext();
                scopeObj.setCustomerName();
                if (scopeObj._objectServiceName && scopeObj._operationName && scopeObj._objectName) {
                    scopeObj.servicesCalled++;
                    scopeObj.requestStart();
                    scopeObj.accountDetailsDAO.fetchAccountDetails(
                        scopeObj._objectServiceName, scopeObj._operationName, scopeObj._objectName,
                        scopeObj.getCriteria(scopeObj._criteria), scopeObj.identifier, scopeObj.onSuccessCallback, scopeObj.onErrorCallback);
                }
                if (scopeObj.servicesCalled === 0) {
                    scopeObj.bindData();
                }
                scopeObj.view.forceLayout();
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in preShow method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                scopeObj.onError(errObj);
            }
        },

        /**
         * Component bindData.
         * Reponsible to read the format values from configuration and 
         * set data to fields.
         */
        bindData: function() {
            var scope = this;
            try {
                var formatValues = {
                    "BALANCE_AMOUNT_SKIN": scope._highlightedValueSkin,
                    "AMOUNT_SKIN": scope._positiveAmountSkin,
                    "DATE_SKIN": scope._dateSkin,
                    "TEXT_SKIN": scope._textSkin,
                    "AMOUNT_FORMAT": scope._amountFormat,
                    "POSITIVE_AMOUNT_SKIN": scope._positiveAmountSkin,
                    "NEGATIVE_AMOUNT_SKIN": scope._negativeAmountSkin,
                    "DATE_FORMAT": scope._dateFormat,
                    "BACKEND_DATE_FORMAT": scope._backenddateformat,
                    "CURRENCY_SYMBOL_CODE": scope.currencyCode
                };
                scope.setHeaderLabelText();
                scope.setIndicationsVisible();
                scope.bindAccountTypeLabelData();
                scope.setFormatValue(formatValues);
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in bindData method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                scope.onError(errObj);
            }
        },

        /**
         * Component setFormatValue.
         * Set the formatvalues.
         * @param: formatValues{JSONObject} - format values taken from configuration.
         */
        setFormatValue: function(formatValues) {
            try {
                this.setFlexVisibility();
                var backupSkin = "";
                if (this.view.flxField1.isVisible) {
                    if (this.parseAndGetValue(this._field1Type) === "Date" || this.parseAndGetValue(this._field1Type) === "Label") {
                        backupSkin = (this.parseAndGetValue(this._field1Type) === "Date") ? formatValues["DATE_SKIN"] : formatValues["TEXT_SKIN"];
                        this.setFormattedSkin(formatValues, this._highlightedValueSkin);
                    }
                    var field1Properties = {
                        "text": this.parseAndGetValue(this._field1Value),
                        "type": this.parseAndGetValue(this._field1Type),
                        "widgetPropLabel": {
                            "width": this.parseAndGetValue(this._field1Value, "lblwidth"),
                            "contentAlignment": constants[this.parseAndGetValue(this._field1Value, "contentAlign")],
                        },
                    };
                    if (this.view.flxFormatValue1.widgets().length > 0) {
                        this.formatValueUtils.formatText(field1Properties, formatValues, this.view.flxFormatValue1);
                    } else {
                        this.view.flxFormatValue1.addAt(this.formatValueUtils.formatText(field1Properties, formatValues, this.view.flxFormatValue1), 1);
                    }
                }
                this.setFormattedSkin(formatValues, backupSkin);
                if (this.view.flxField2.isVisible) {
                    var field2Properties = {
                        "text": this.parseAndGetValue(this._field2Value),
                        "type": this.parseAndGetValue(this._field2Type)
                    };
                    var field2 = this.formatValueUtils.getFormattedValue(field2Properties, formatValues);
                    field2 = field2["text"];
                    this.view.lblField2.text = this.view.lblField2.text + " " + "<b>" + field2 + "</b>";
                }
                if (this.view.flxField3.isVisible) {
                    var field3Properties = {
                        "text": this.parseAndGetValue(this._field3Value),
                        "type": this.parseAndGetValue(this._field3Type)
                    };
                    var field3 = this.formatValueUtils.getFormattedValue(field3Properties, formatValues);
                    field3 = field3["text"];
                    this.view.lblField3.text = this.view.lblField3.text + " " + "<b>" + field3 + "</b>";
                }
                if (this.view.flxField4.isVisible) {
                    var field4Properties = {
                        "text": this.parseAndGetValue(this._field4Value),
                        "type": this.parseAndGetValue(this._field4Type)
                    };
                    var field4 = this.formatValueUtils.getFormattedValue(field4Properties, formatValues);
                    field4 = field4["text"];
                    this.view.lblField4.text = this.view.lblField4.text + " " + "<b>" + field4 + "</b>";
                }
                this.view.flxField5.isVisible = true;
                if (this.accountType === "Checking" || this.accountType === "Savings") {
                    if (this.view.flxField5.isVisible) {
                        var field5Properties = {
                            "text": this.parseAndGetValue(this._field5Value),
                            "type": this.parseAndGetValue(this._field5Type)
                        };
                        if (this.isEmptyNullUndefined(field5Properties.text)) {
                            if (this.availableBalance < 0) {
                                field5Properties.text = this.availableBalance;
                                var field5 = this.formatValueUtils.getFormattedValue(field5Properties, formatValues);
                                field5 = field5["text"];
                                this.view.lblField5.text = this.view.lblField5.text + " " + "<b>" + field5 + "</b>";
                            } else {
                                this.view.flxField5.isVisible = false;
                            }
                        } else {
                            var field5 = this.formatValueUtils.getFormattedValue(field5Properties, formatValues);
                            field5 = field5["text"];
                            this.view.lblField5.text = this.view.lblField5.text + " " + "<b>" + field5 + "</b>";
                        }
                    }
                } else {
                    this.view.flxField5.isVisible = false;
                }
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in setFormatValue method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                this.onError(errObj);
            }
        },

        /**
         * Component setFormattedSkin.
         * Set the formatvalue Skin.
         * @param: formatValues{JSONObject} - format values taken from configuration.
         * @param: Skin - Skins Value.
         */
        setFormattedSkin: function(formatValues, Skin) {
            try {
                if (!(this.isEmptyNullUndefined(Skin))) {
                    if (this.parseAndGetValue(this._field1Type) === "Date") {
                        formatValues["DATE_SKIN"] = Skin;
                    }
                    if (this.parseAndGetValue(this._field1Type) === "Label") {
                        formatValues["TEXT_SKIN"] = Skin;
                    }
                }
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in setFormattedSkin method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                this.onError(errObj);
            }
        },

        /**
         * Component isEmptyNullUndefined
         * Verifies if the value is empty, null or undefined
         * data {string} - value to be verified
         * @return : {boolean} - validity of the value passed
         */
        isEmptyNullUndefined: function(data) {
            try {
                if (data === null || data === undefined || data === "")
                    return true;
                return false;
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in isEmptyNullUndefined method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                this.onError(errObj);
            }
        },

        /**
         * Component setHeaderLabelText.
         * This function is to set the header label text.
         */
        setHeaderLabelText: function() {
            var scope = this;
            try {
                var accNo = "";
                var ending = ".";
                accNo = scope.getCriteria(scope._criteria);
                for (var key in accNo) {
                    accNo = accNo[key];
                }

                if (!scope.isEmptyNullUndefined(this._nickName) && !scope.isEmptyNullUndefined(scope.getProcessedText(this._nickName))) {
                    //var nickName = scope.getProcessedText(this._nickName);
                    var accountDetails = applicationManager.getAccountManager().getInternalAccountByID(accNo);
                    var nickName=accountDetails.nickName;
                    ending = ending.repeat(this._noOfEllipsis);
                    accNo = (accNo.slice(accNo.length - 4));
                    if (nickName.length > this._noOfCharacters) {
                        nickName = nickName.substring(0, this._noOfCharacters) + ending;
                    } else
                        nickName = nickName + ending;
                    scope.view.lblAccountName.text = nickName + accNo;
                } else if (!scope.isEmptyNullUndefined(this._accountName) && !this.isEmptyNullUndefined(scope.getProcessedText(this._accountName))) {
                    var accName = scope.getProcessedText(this._accountName);
                    ending = ending.repeat(this._noOfEllipsis);
                    accNo = (accNo.slice(accNo.length - 4));
                    if (accName.length > this._noOfCharacters) {
                        accName = accName.substring(0, this._noOfCharacters) + ending;
                    } else
                        accName = accName + ending;
                    scope.view.lblAccountName.text = accName + accNo;
                }
                this.map["headerText"] = scope.view.lblAccountName.text;
              	if (!scope.isEmptyNullUndefined(this.customerName) && !this.isEmptyNullUndefined(scope.getProcessedText(this._customerName))) {
                  	scope.view.lblCustomerName.isVisible = true;
                    scope.view.lblCustomerName.text = scope.customerName; 
                  }else{
                      scope.view.lblCustomerName.isVisible = false;
                  }
           //   }
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in setHeaderLabelText method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                this.onError(errObj);
            }
        },
        /**
         * Component setIndicationsVisible.
         * show the user profile account indication.
         */
        setIndicationsVisible: function() {
            var scope = this;
            try {
                var isSingleProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
                var profileStatus = applicationManager.getUserPreferencesManager().profileAccess;
                if (!isSingleProfile && profileStatus === "both") {
                    if (!scope.isEmptyNullUndefined(this._businessAccount) && !scope.isEmptyNullUndefined(scope.getProcessedText(this._businessAccount))) {
                        var isBusinessPayee = scope.getProcessedText(this._businessAccount);
                        scope.view.imgIndicator.src = isBusinessPayee === "false" ? "personal.png" : "business.png";
                        scope.view.lblAccountName.width = "80%";
                        scope.view.imgIndicator.setVisibility(true);
                    }
                } else {
                    scope.view.imgIndicator.setVisibility(false);
                    scope.view.lblAccountName.width = "100%";
                }
                scope.view.forceLayout();
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in setIndicationsVisible method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                this.onError(errObj);
            }
        },

        /**
         * Component resetBackupResponseData.
         * reset the response data from backup variables.
         */
        resetBackupResponseData: function() {
            var scope = this;
            scope.map = {};
        },

        /**
         * Component onSuccessCallback.
         * Assign the backend response to identifier and bind data to UI.
         * @param: backendResponse{JSONObject} - backend service response.
         * @param: unicode{string} - identifier string.
         */
        onSuccessCallback: function(backendResponse, unicode) {
            var scope = this;
            try {
                scope.readObject(backendResponse);
                scope.view.search.setContext(scope.map);
                scope.servicesCompleted++;
                scope.parserUtilsManager.setResponseData(unicode, scope.map);
                if (scope.servicesCompleted === scope.servicesCalled) {
                    scope.servicesCompleted = 0;
                    scope.servicesCalled = 0;
                    this.availableBalance = backendResponse.Accounts[0].availableBalance;
                    this.view.lblAccountId.text=backendResponse.Accounts[0].accountID;
                    scope.bindData();
                }
                scope.requestEnd(scope.map);
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in onSuccessCallback method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                this.onError(errObj);
            }
        },
        /**
         * Component getContext.
         * Assign the backend response to the specified form controller.
         * @return: object - backend response.
         */
        getContext: function() {
            var scope = this;
            try {
                return scope.map;
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in getContext method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                this.onError(errObj);
            }
        },

        /**
         * Component readArray.
         * Parse the array in response and add it to the map.
         * @param: array{Array} - array in the response.
         * @param: jsonPath{string} - JSON path in the map.
         */
        readArray: function(array, jsonPath) {
            var scope = this;
            try {
                var parentPath = jsonPath;
                for (var i = 0; i < array.length; i++) {
                    var value = array[i];
                    jsonPath = parentPath + "[" + i + "]";
                    if (value instanceof Array) {
                        this.readArray(value, jsonPath);
                    } else if (value instanceof Object) {
                        this.readObject(value, jsonPath);
                    } else {
                        if (isNaN(value) && (value.indexOf("{") > -1 || value.indexOf("[") > -1)) {
                            value = eval('(' + value + ')');
                        }
                        if (value instanceof Array) {
                            this.readArray(value, jsonPath);
                        } else if (value instanceof Object) {
                            this.readObject(value, jsonPath);
                        } else {
                            scope.map[jsonPath] = value;
                        }
                    }
                }
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in readArray method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                this.onError(errObj);
            }
        },

        /**
         * Component readObject.
         * Parse the object in response and add it to the map.
         * @param: obj{Object} - object in the response.
         * @param: jsonPath{string} - JSON path in the map.
         */
        readObject: function(obj, jsonPath) {
            var scope = this;
            try {
                var keysItr = Object.keys(obj);
                var parentPath = jsonPath;
                for (var i = 0; i < keysItr.length; i++) {
                    var key = keysItr[i];
                    var value = obj[key]
                    if (parentPath) {
                        jsonPath = parentPath + "." + key;
                    } else {
                        jsonPath = key;
                    }
                    if (value instanceof Array) {
                        this.readArray(value, jsonPath);
                    } else if (value instanceof Object) {
                        this.readObject(value, jsonPath);
                    } else {
                        if (isNaN(value) && (value.indexOf("{") > -1 || value.indexOf("[") > -1)) {
                            value = eval('(' + value + ')');
                        }
                        if (value instanceof Array) {
                            this.readArray(value, jsonPath);
                        } else if (value instanceof Object) {
                            this.readObject(value, jsonPath);
                        } else {
                            scope.map[jsonPath] = value;
                        }
                    }
                }
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in readObject method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                this.onError(errObj);
            }
        },

        /**
         * Component parseAndGetValue.
         * Parse the value and returns the processed value for given account type.
         * @param: Value{String} - String taken from configuration.
         * @return: {String} - Processed value.
         */
        parseAndGetValue: function(Value, key) {
            try {
                var value = Value;
                if (typeof(Value) === "string") {
                    value = JSON.parse(Value);
                }
                if (value[this.accountType]) {
                    value = value[this.accountType];
                } else {
                    value = value["default"] ? value["default"] : "";
                }
                if (value[key]) {
                    value = value[key];
                }
                if (value !== null && value !== "" && value !== undefined) {
                    if (typeof(value) === "string")
                        return this.getProcessedText(value);
                    else {
                        var text = this.UserTypeParser(value, this.userType);
                        return this.getProcessedText(text);
                    }
                } else return "";
            } catch (err) {
                var errObj = {
                    "errorInfo": "Error in parseAndGetValue method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                this.onError(errObj);
            }
            return this.getProcessedText(Value);
        },

        /**
         * Component UserTypeParser.
         * Helper method to parse the exposed contract based on the current user type.
         * inputJSON {JSONObject} - object containing information about various usertypes and associated texts.
         * lookUpKey {string}     - current usertype value to be looked upon the above object.
         * @return : value of the lookup key in the input object.
         */
        UserTypeParser: function(inputJSON, lookUpKey) {
            try {
                if (inputJSON.hasOwnProperty(lookUpKey)) {
                    return inputJSON[lookUpKey];
                } else if (inputJSON.hasOwnProperty("default")) {
                    return inputJSON["default"];
                }
                return inputJSON;
            } catch (err) {
                var errorObj = {
                    "errorInfo": "Error in UserTypeParser method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                this.onError(errorObj);
            }
        },

        /**
         * Component setFlexVisibility.
         * Set flex visibility based on value.
         */
        setFlexVisibility: function() {
            try {
                for (var i = 1; i <= 5; i++) {
                    if (!(this.isEmptyNullUndefined(this["_field" + i + "Value"]))) {
                        if (!(this.isEmptyNullUndefined(this.parseAndGetValue(this["_field" + i + "Value"])))) {
                            this.view["flxField" + i].setVisibility(true);
                        } else {
                            this.view["flxField" + i].setVisibility(false);
                        }
                    } else {
                        this.view["flxField" + i].setVisibility(false);
                    }
                }
                this.view.forceLayout();
            } catch (err) {
                var errorObj = {
                    "errorInfo": "Error in SetFlexVisibility method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                this.onError(errorObj);
            }
        },

        /**
         * Component bindAccountTypeLabelData.
         * Bind static data to labels.
         * Set skin to label.
         */
        bindAccountTypeLabelData: function() {
            var scopeObj = this;
            try {
                scopeObj.view.flxAccountLandingMain.skin = JSON.parse(scopeObj._backgroundSkin).skin;
                for (var i = 1; i <= 5; i++) {
                    if (!(this.isEmptyNullUndefined(scopeObj["_field" + i + "Label"]))) {
                        scopeObj.view["lblField" + i].skin = (i === 1) ? JSON.parse(scopeObj._highlightedLabelSkin).skin : JSON.parse(scopeObj._labelSkin).skin;
                        scopeObj.view["lblField" + i].text = scopeObj.parseAndGetValue(scopeObj["_field" + i + "Label"]);
                    }
                }
            } catch (err) {
                var errorObj = {
                    "errorInfo": "Error in bindAccountTypeLabelData method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                this.onError(errorObj);
            }
        },

        /**
         * Component getProcessedText.
         * Get the processed text from parser util.
         * @param: text{String}/{Object} - text to be parsed.
         * @return: {String}/{Object} - parsed text.
         */
        getProcessedText: function(text) {
            try {
                return this.parserUtilsManager.getParsedValue(text);
            } catch (err) {
                var errorObj = {
                    "errorInfo": "Error in getProcessedText method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                this.onError(errorObj);
            }
        },

        /**
         * Component errorCallback.
         * @param: errObj{object} - Error object.
         * Handles errors in the comonent.
         */
        onErrorCallback: function(errObj) {
            kony.print("componenet error called");
            this.onError(errObj);
        },

        /**
         * Component invokeLoanSchedule.
         */
        invokeLoanSchedule: function() {
            var scope = this;
            try {
                scope.onLoanScheduleClick(scope.map);
            } catch (err) {
                var errorObj = {
                    "errorInfo": "Error in invokeLoanSchedule method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
      
      /**
         * Component isLoanEntitled.
         */
      isLoanEntitled: function() {
        var scope = this;
         var entitlements = {};
        try {
          if(scope._loanEntitlementKeys!== "" && scope._loanEntitlementKeys!== undefined && scope._loanEntitlementKeys!== null)
          {
            var valueJson = JSON.parse(scope._loanEntitlementKeys);
            valueJson = valueJson[this.accountType] ? valueJson[this.accountType] : "";
            for(var i in valueJson) {
               if(scope.EntitlementUtils.isEntitled([valueJson[i]])) {
                 if(valueJson[i] === "VIEW_INSTALLMENT_SUMMARY") {
                   entitlements["chartVisibility"] = true;
                 } else if(valueJson[i] === "VIEW_LOAN_SCHEDULE") {
                   entitlements["transactionsVisibility"] = true;
                 }
               } else {
                 if(valueJson[i] === "VIEW_INSTALLMENT_SUMMARY") {
                   entitlements["chartVisibility"] = false;
                 } else if(valueJson[i] === "VIEW_LOAN_SCHEDULE") {
                   entitlements["transactionsVisibility"] = false;
                 }
               }
            }
          }
          return entitlements;
        } catch (err) {
          var errorObj = {
            "errorInfo": "Error in isLoanEntitled method of the component.",
            "errorLevel": "Configuration",
            "error": err
          };
          scope.onError(errorObj);
        }
      }

    };
});