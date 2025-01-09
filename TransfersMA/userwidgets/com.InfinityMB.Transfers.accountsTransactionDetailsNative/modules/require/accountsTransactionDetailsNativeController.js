define(['./transactionDetailsDAO', './ParserUtilsManager', './FormatUtils', './EntitlementUtils', 'JSONValidator'], function(transactionDetailsDAO, ParserUtilsManager, FormatUtils, EntitlementUtils, JSONValidator) {

    return {
        constructor: function(baseConfig, layoutConfig, pspConfig) {
            //Check Image Service
            this._objectServiceName = "";
            this._objectName = "";
            this._operationName = "";
            this._criteria = "";
            //Context
            this._transactionType = "";
            this.currentTransactionType = "";
            //skins
            this._sknTransDetails = "";
            this._sknTransDetailsLabel = "";
            this._sknTransDetailsValue = "";
			this._enableAttachments="";
            this._sknTransType = "";
            this._sknTransDetailsAmount = "";
            this._sknTransDetailsStatus = "";
            this._sknTransDetailsSeparator = "";
            this._sknTransStatusSuccess = "";
            this._sknTransStatusPending = "";
            //Data Format
            this._amountFormat = "";
            this._dateFormat = "";
            this._backendDateFormat = "";
            this._currencyCode = "";
            //Transaction Types
            this._transactionTypes = "";
            this._transactionTypeIdentifier = "";
            this._currentTransactionType = "";
            //DataVisibility
            this._statusFieldVisibility = "";
            this._statusIndicatorVisibility = "";
			//Retrive Attachments
			this._objectServiceNameAttachments = "";
            this._objectNameAttachments = "";
            this._operationNameAttachments = "";
            this._criteriaAttachments = ""; 
          
            //Transaction Details
            this._fieldStatus = "";
            this._field1Label = "";
            this._field1Value = "";
            this._field1Type = "";
            this._field2Label = "";
            this._field2Value = "";
            this._field2Type = "";
            this._field3Label = "";
            this._field3Value = "";
            this._field3Type = "";
            this._field4Label = "";
            this._field4Value = "";
            this._field4Type = "";
            this._field5Label = "";
            this._field5Value = "";
            this._field5Type = "";
            this._field6Label = "";
            this._field6Value = "";
            this._field6Type = "";
            this._field7Label = "";
            this._field7Value = "";
            this._field7Type = "";
            this._field8Label = "";
            this._field8Value = "";
            this._field8Type = "";
            this._field9Label = "";
            this._field9Value = "";
            this._field9Type = "";
            this._field10Label = "";
            this._field10Value = "";
            this._field10Type = "";
            this._field11Label = "";
            this._field11Value = "";
            this._field11Type = "";
            this._field12Label = "";
            this._field12Value = "";
            this._field12Type = "";
            this._btnContextualAction1 = "";
            this._btnContextualAction2 = "";
            this._btnContextualAction3 = "";
            this._btnContextualAction4 = "";
			this._btnContextualAction5 = "";								
            //Checks and swift Transactions
            this._checkNumberLabel = "";
            this._checkNumberValue = "";
            this._swiftTransaction = "";
            this._swiftTransactionSkin = "";
            //DAO Object
            this.transactionDetailsDAO = new transactionDetailsDAO();
            //Parser Util Object
            this.parserUtilsManager = new ParserUtilsManager();
            //Format util object
            this.FormatUtils = new FormatUtils();
            //Entitlement util object
            this.EntitlementUtils = new EntitlementUtils();
            //JSONValidator object
            this.jsonValidator = new JSONValidator();
            //global variables
            this.skins = {};
            this.formatSkins = {};
            this.context = {};
            this.formattingJSON = {};
            this.criteriaCheque = {};
			this.criteriaAttachment = {};
            this.invalidJSONLoggerArray = [];
            this.isValidJSONString = "";
            this.jsonError = "";
			this.attachmentsList="";
        },


        //Logic for getters/setters of custom properties
        initGettersSetters: function() {
            //Custom property - Object Sevice Name
            defineSetter(this, "objectServiceName", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._objectServiceName = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "objectServiceName",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "objectServiceName", function() {
                return this._objectServiceName;
            });
			defineSetter(this, "enableAttachments", function(val) {
                if ((typeof val === 'boolean') && (val !== "")) {
                    this._enableAttachments = val;

                }
            });
            defineGetter(this, "enableAttachments", function() {
                return this._enableAttachments;
            });            //Custom property - Object Name
            defineSetter(this, "objectName", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._objectName = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "objectName",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "objectName", function() {
                return this._objectName;
            });
            //Custom property - Operation Name
            defineSetter(this, "operationName", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._operationName = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "operationName",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "operationName", function() {
                return this._operationName;
            });
            //Custom property - criteria
            defineSetter(this, "criteria", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._criteria = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "criteria",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "criteria", function() {
                return this._criteria;
            });
// For Retrive Attachments
            defineSetter(this, "objectServiceNameAttachments", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._objectServiceNameAttachments = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "objectServiceNameAttachments",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "objectServiceNameAttachments", function() {
                return this._objectServiceNameAttachments;
            });
            //Custom property - Object Name
            defineSetter(this, "objectNameAttachments", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._objectNameAttachments = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "objectNameAttachments",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "objectNameAttachments", function() {
                return this._objectNameAttachments;
            });
            //Custom property - Operation Name
            defineSetter(this, "operationNameAttachments", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._operationNameAttachments = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "operationNameAttachments",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "operationNameAttachments", function() {
                return this._operationNameAttachments;
            });
            //Custom property - criteria
            defineSetter(this, "criteriaAttachments", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._criteriaAttachments = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "criteriaAttachments",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "criteriaAttachments", function() {
                return this._criteriaAttachments;
            });
                      //Custom property - TransactionType
            defineSetter(this, "transactionType", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._transactionType = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "transactionType",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "transactionType", function() {
                return this._transactionType;
            });
            //Custom property - sknTransDetails
            defineSetter(this, "sknTransDetails", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._sknTransDetails = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "sknTransDetails",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "sknTransDetails", function() {
                return this._sknTransDetails;
            });
            //Custom property - sknTransDetailsLabel
            defineSetter(this, "sknTransDetailsLabel", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._sknTransDetailsLabel = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "sknTransDetailsLabel",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "sknTransDetailsLabel", function() {
                return this._sknTransDetailsLabel;
            });
            //Custom property - sknTransDetailsValue
            defineSetter(this, "sknTransDetailsValue", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._sknTransDetailsValue = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "sknTransDetailsValue",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "sknTransDetailsValue", function() {
                return this._sknTransDetailsValue;
            });
            //Custom property - sknTransType
            defineSetter(this, "sknTransType", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._sknTransType = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "sknTransType",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "sknTransType", function() {
                return this._sknTransType;
            });
            //Custom property - sknTransDetailsAmount
            defineSetter(this, "sknTransDetailsAmount", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._sknTransDetailsAmount = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "sknTransDetailsAmount",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "sknTransDetailsAmount", function() {
                return this._sknTransDetailsAmount;
            });
            //Custom property - sknTransDetailsStatus
            defineSetter(this, "sknTransDetailsStatus", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._sknTransDetailsStatus = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "sknTransDetailsStatus",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "sknTransDetailsStatus", function() {
                return this._sknTransDetailsStatus;
            });
            //Custom property - sknTransDetailsSeparator										  
            defineSetter(this, "sknTransDetailsSeparator", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._sknTransDetailsSeparator = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "sknTransDetailsSeparator",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "sknTransDetailsSeparator", function() {
                return this._sknTransDetailsSeparator;
            });
            //Custom property - sknTransStatusSuccess
            defineSetter(this, "sknTransStatusSuccess", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._sknTransStatusSuccess = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "sknTransStatusSuccess",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "sknTransStatusSuccess", function() {
                return this._sknTransStatusSuccess;
            });
            //Custom property - sknTransStatusPending
            defineSetter(this, "sknTransStatusPending", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._sknTransStatusPending = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "sknTransStatusPending",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "sknTransStatusPending", function() {
                return this._sknTransStatusPending;
            });
            //Custom property - amountFormat
            defineSetter(this, "amountFormat", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._amountFormat = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "amountFormat",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "amountFormat", function() {
                return this._amountFormat;
            });
            //Custom property - dateFormat
            defineSetter(this, "dateFormat", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._dateFormat = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "dateFormat",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "dateFormat", function() {
                return this._dateFormat;
            });
            //Custom property - backendDateFormat
            defineSetter(this, "backendDateFormat", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._backendDateFormat = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "backendDateFormat",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "backendDateFormat", function() {
                return this._backendDateFormat;
            });
            //Custom property - currencyCode
            defineSetter(this, "currencyCode", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._currencyCode = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "currencyCode",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "currencyCode", function() {
                return this._currencyCode;
            });
            //Custom property - transactionTypes
            defineSetter(this, "transactionTypes", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._transactionTypes = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "transactionTypes",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "transactionTypes", function() {
                return this._transactionTypes;
            });
            //Custom property - transactionTypeIdentifier
            defineSetter(this, "transactionTypeIdentifier", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._transactionTypeIdentifier = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "transactionTypeIdentifier",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "transactionTypeIdentifier", function() {
                return this._transactionTypeIdentifier;
            });
            //Custom property - statusFieldVisibility 
            defineSetter(this, "statusFieldVisibility", function(val) {
                if ((typeof val === 'boolean')) {
                    this._statusFieldVisibility = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "statusFieldVisibility",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "statusFieldVisibility", function() {
                return this._statusFieldVisibility;
            });
            //Custom property - statusIndicatorVisibility 
            defineSetter(this, "statusIndicatorVisibility", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._statusIndicatorVisibility = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "statusIndicatorVisibility",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "statusIndicatorVisibility", function() {
                return this._statusIndicatorVisibility;
            });
            //Custom property - fieldStatus
            defineSetter(this, "fieldStatus", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._fieldStatus = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "fieldStatus",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "fieldStatus", function() {
                return this._fieldStatus;
            });
            //Custom property - field1Label
            defineSetter(this, "field1Label", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._field1Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "field1Label",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "field1Label", function() {
                return this._field1Label;
            });
            //Custom property - field1Value
            defineSetter(this, "field1Value", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._field1Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "field1Value",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "field1Value", function() {
                return this._field1Value;
            });
            //Custom property - field1Type
            defineSetter(this, "field1Type", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._field1Type = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "field1Type",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "field1Type", function() {
                return this._field1Type;
            });
            //Custom property - field2Label
            defineSetter(this, "field2Label", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._field2Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "field2Label",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "field2Label", function() {
                return this._field2Label;
            });
            //Custom property - field2Value
            defineSetter(this, "field2Value", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._field2Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "field2Value",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "field2Value", function() {
                return this._field2Value;
            });
            //Custom property - field2Type
            defineSetter(this, "field2Type", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._field2Type = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "field2Type",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "field2Type", function() {
                return this._field2Type;
            });
            // Custom property - field3Label
            defineSetter(this, "field3Label", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._field3Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "field3Label",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "field3Label", function() {
                return this._field3Label;
            });
            // Custom property - field3Value
            defineSetter(this, "field3Value", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._field3Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "field3Value",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "field3Value", function() {
                return this._field3Value;
            });
            // Custom property - field3Type
            defineSetter(this, "field3Type", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._field3Type = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "field3Type",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "field3Type", function() {
                return this._field3Type;
            });
            // Custom property - field4Label      
            defineSetter(this, "field4Label", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._field4Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "field4Label",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "field4Label", function() {
                return this._field4Label;
            });
            // Custom property - field4Value
            defineSetter(this, "field4Value", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._field4Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "field4Value",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "field4Value", function() {
                return this._field4Value;
            });
            // Custom property - field4Type
            defineSetter(this, "field4Type", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._field4Type = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "field4Type",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "field4Type", function() {
                return this._field4Type;
            });
            // Custom property - field5Label
            defineSetter(this, "field5Label", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._field5Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "field5Label",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "field5Label", function() {
                return this._field5Label;
            });
            // Custom property - field5Value
            defineSetter(this, "field5Value", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._field5Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "field5Value",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "field5Value", function() {
                return this._field5Value;
            });
            // Custom property - field5Type
            defineSetter(this, "field5Type", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._field5Type = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "field5Type",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "field5Type", function() {
                return this._field5Type;
            });
            // Custom property - field6Label
            defineSetter(this, "field6Label", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._field6Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "field6Label",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "field6Label", function() {
                return this._field6Label;
            });
            // Custom property - field6Value
            defineSetter(this, "field6Value", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._field6Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "field6Value",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "field6Value", function() {
                return this._field6Value;
            });
            // Custom property - field6Type
            defineSetter(this, "field6Type", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._field6Type = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "field6Type",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "field6Type", function() {
                return this._field6Type;
            });
            // Custom property - field7Label
            defineSetter(this, "field7Label", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._field7Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "field7Label",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "field7Label", function() {
                return this._field7Label;
            });
            // Custom property - field7Value
            defineSetter(this, "field7Value", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._field7Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "field7Value",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "field7Value", function() {
                return this._field7Value;
            });
            // Custom property - field7Type
            defineSetter(this, "field7Type", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._field7Type = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "field7Type",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "field7Type", function() {
                return this._field7Type;
            });
            // Custom property - field8Label
            defineSetter(this, "field8Label", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._field8Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "field8Label",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "field8Label", function() {
                return this._field8Label;
            });
            // Custom property - field8Value
            defineSetter(this, "field8Value", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._field8Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "field8Value",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "field8Value", function() {
                return this._field8Value;
            });
            // Custom property - field8Type
            defineSetter(this, "field8Type", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._field8Type = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "field8Type",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "field8Type", function() {
                return this._field8Type;
            });
            // Custom property - field9Label
            defineSetter(this, "field9Label", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._field9Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "field9Label",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "field9Label", function() {
                return this._field9Label;
            });
            // Custom property - field9Value
            defineSetter(this, "field9Value", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._field9Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "field9Value",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "field9Value", function() {
                return this._field9Value;
            });
            // Custom property - field9Type
            defineSetter(this, "field9Type", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._field9Type = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "field9Type",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "field9Type", function() {
                return this._field9Type;
            });
            // Custom property - field10Label
            defineSetter(this, "field10Label", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._field10Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "field10Label",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "field10Label", function() {
                return this._field10Label;
            });
            // Custom property - field10Value
            defineSetter(this, "field10Value", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._field10Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "field10Value",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "field10Value", function() {
                return this._field10Value;
            });
            // Custom property - field10Type
            defineSetter(this, "field10Type", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._field10Type = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "field10Type",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "field10Type", function() {
                return this._field10Type;
            });
            // Custom property - field11Label
            defineSetter(this, "field11Label", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._field11Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "field11Label",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "field11Label", function() {
                return this._field11Label;
            });
            // Custom property - field11Value
            defineSetter(this, "field11Value", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._field11Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "field11Value",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "field11Value", function() {
                return this._field11Value;
            });
            // Custom property - field11Type
            defineSetter(this, "field11Type", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._field11Type = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "field11Type",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "field11Type", function() {
                return this._field11Type;
            });
            // Custom property - field12Label
            defineSetter(this, "field12Label", function(val) {
                if ((typeof val == 'string') && (val != "")) {
                    this._field12Label = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "field12Label",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "field12Label", function() {
                return this._field12Label;
            });
            // Custom property - field12Value
            defineSetter(this, "field12Value", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._field12Value = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "field12Value",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "field12Value", function() {
                return this._field12Value;
            });
            // Custom property - field12Type
            defineSetter(this, "field12Type", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._field12Type = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "field12Type",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "field12Type", function() {
                return this._field12Type;
            });
            //Custom property -  btnContextualAction1
            defineSetter(this, "btnContextualAction1", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._btnContextualAction1 = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "btnContextualAction1",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "btnContextualAction1", function() {
                return this._btnContextualAction1;
            });
            //Custom property -  btnContextualAction2
            defineSetter(this, "btnContextualAction2", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._btnContextualAction2 = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "btnContextualAction2",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "btnContextualAction2", function() {
                return this._btnContextualAction2;

            });
            //Custom property -  btnContextualAction3
            defineSetter(this, "btnContextualAction3", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._btnContextualAction3 = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "btnContextualAction3",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "btnContextualAction3", function() {
                return this._btnContextualAction3;
            });
            //Custom property -  btnContextualAction4
            defineSetter(this, "btnContextualAction4", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._btnContextualAction4 = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "btnContextualAction4",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "btnContextualAction4", function() {
                return this._btnContextualAction4;
            });
			//Custom property -  btnContextualAction5
            defineSetter(this, "btnContextualAction5", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._btnContextualAction5 = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "btnContextualAction5",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "btnContextualAction5", function() {
                return this._btnContextualAction5;
            });
            //Custom property-checkNumberLabel
            defineSetter(this, "checkNumberLabel", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._checkNumberLabel = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "checkNumberLabel",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "checkNumberLabel", function() {
                return this._checkNumberLabel;
            });

            //Custom property -  checkNumberValue
            defineSetter(this, "checkNumberValue", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._checkNumberValue = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "checkNumberValue",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "checkNumberValue", function() {
                return this._checkNumberValue;
            });

            //Custom property -  swiftTransaction
            defineSetter(this, "swiftTransaction", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._swiftTransaction = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "swiftTransaction",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "swiftTransaction", function() {
                return this._swiftTransaction;
            });

            //Custom property -  swiftTransactionSkin
            defineSetter(this, "swiftTransactionSkin", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._swiftTransactionSkin = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "swiftTransactionSkin",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "swiftTransactionSkin", function() {
                return this._swiftTransactionSkin;
            });

        },
        /**
         * Component preShow
         * Reponsible to retain the data for custom properties for multiple entries into the component
         */
        preShow: function() {
            var scopeObj = this;
            try {
                this.formattingJSON = {
                    "amountFormat": JSON.parse(this._amountFormat),
                    "dateFormat": this._dateFormat,
                    "backenddateformat": this._backendDateFormat,
                };
                //var transactionData= JSON.parse(this._transactionData);
                this.setCriteria();
				this.setCriteriaAttachments(this._criteriaAttachments);
                this.setTransactionTypeFromContext();
                this.view.flxMain.setVisibility(true);
                this.view.flxMain.skin = this._sknTransDetails;
				if(this._enableAttachments)
                {
                  this.getAttachments();
                }
                this.flxCrossOnClick();
                this.updateTransactionDetails(this.context);
                var btnId1 = scopeObj.getFieldValue(this.getTransactionTypeValue(scopeObj._btnContextualAction1), "id");
                scopeObj.view.btnContextualAction1.onClick = function() {
                    scopeObj.contextualActionButtonOnClick(btnId1);
                };
                var btnId2 = scopeObj.getFieldValue(this.getTransactionTypeValue(scopeObj._btnContextualAction2), "id");
                scopeObj.view.btnContextualAction2.onClick = function() {
                    scopeObj.contextualActionButtonOnClick(btnId2);
                };
                var btnId3 = scopeObj.getFieldValue(this.getTransactionTypeValue(scopeObj._btnContextualAction3), "id");
                scopeObj.view.btnContextualAction3.onClick = function() {
                    scopeObj.contextualActionButtonOnClick(btnId3);
                };
                var btnId4 = scopeObj.getFieldValue(this.getTransactionTypeValue(scopeObj._btnContextualAction4), "id");
                scopeObj.view.btnContextualAction4.onClick = function() {
                    scopeObj.contextualActionButtonOnClick(btnId4);
                };
                var btnId5 = scopeObj.getFieldValue(this.getTransactionTypeValue(scopeObj._btnContextualAction5), "id");
                scopeObj.view.btnContextualAction5.onClick = function() {
                    scopeObj.contextualActionButtonOnClick(btnId5);
                };
            } catch (err) {
                var errorObj = {
                    "errorInfo": "Error in the preshow of the component.",
                    "errorLevel": "Business",
                    "error": err
                };
                scopeObj.onError(errorObj);
            }
        },
        /**
         * Component setCriteria
         * Update the criteria based on accountType ans filter
         * criteria {string} - value collected from exposed contract
         */
        setCriteria: function(criteria) {
            var self = this;
            try {
                var criteriaObject = JSON.parse(this._criteria);
                for (var key in criteriaObject) {
                    criteriaObject[key] = this.getFieldValue(criteriaObject[key]);
                }
                var criteriaJSON = criteria;
                if (typeof(criteria) === "string") {
                    criteriaJSON = JSON.parse(criteria);
                }
                for (var key in criteriaJSON) {
                    criteriaObject[key] = this.getFieldValue(criteriaJSON[key]);
                }
                this.criteriaCheque = criteriaObject;
            } catch (err) {
                var errorObj = {
                    "errorInfo": "Error in setting the criteria",
                    "errorLevel": "Configuration",
                    "error": err
                };
                self.onError(errorObj);
            }
        },
 
      /**
         * Component setCriteria
         * Update the criteria based on accountType ans filter
         * criteria {string} - value collected from exposed contract
         */
        setCriteriaAttachments: function(criteria) {
            var self = this;
            try {
                var criteriaObject = JSON.parse(this._criteriaAttachments);
                for (var key in criteriaObject) {
                    criteriaObject[key] = this.getFieldValue(criteriaObject[key]);
                }
                var criteriaJSON = criteria;
                if (typeof(criteria) === "string") {
                    criteriaJSON = JSON.parse(criteria);
                }
                for (var key in criteriaJSON) {
                    criteriaObject[key] = this.getFieldValue(criteriaJSON[key]);
                }
                this.criteriaAttachment = criteriaObject;
            } catch (err) {
                var errorObj = {
                    "errorInfo": "Error in setting the criteria",
                    "errorLevel": "Configuration",
                    "error": err
                };
                self.onError(errorObj);
            }
        },        /**
         * Component setContext
         * To collect the context object required for the component 
         * context{JSONobject} - transactionData object 
         */
        setContext: function(context) {
            var self = this;
            try {
                this.context = context;
                this.parserUtilsManager.setContext(this.context);
                //var EntitlementFeatures = applicationManager.getConfigurationManager().getUserFeatures();
       // var EntitlementPermissions = applicationManager.getConfigurationManager().getUserPermissions();
        var entitlement = {
          "features": this.context.userFeatures,
          "permissions": this.context.userPermissions
        }
        context["entitlement"] = entitlement;
        this.EntitlementUtils.setEntitlements(context);
            } catch (err) {
                var errorObj = {
                    "errorInfo": "Error in the setContext of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                self.onError(errorObj);
            }
        },
/**
         * Component getAttachments
         */
      getAttachments:function()
      {
        this.transactionDetailsDAO.getAttachments(this._objectServiceNameAttachments, this._operationNameAttachments, this._objectNameAttachments, this.criteriaAttachment, this.successResponse, this.failureResponse);
      },
      navigateToAttachments:function()
      {
        this.navigateToViewAttachments(this.attachmentsList);
      },
      successResponse:function(response)
      {
        var scope = this;
        var files=[];
        this.attachmentsList=response.fileNames;
        if(response.fileNames.length>0)
        {
          for(i in response.fileNames)
            files.push(response.fileNames[i].fileName);
          if(files.toString().length>30)
            files= files.toString().substring(0, 30) + '...';
          scope.context["fileNames"]=files.toString();
          this.updateTransactionDetails();
        }
      },
      
      failureResponse:function()
      {
        this.updateTransactionDetails();
      },        /**
         * Component setAccountTypeFromContext
         * Set account type from the context object
         */
        setTransactionTypeFromContext: function() {
            var transactionTypeIdentifier = JSON.parse(this._transactionTypeIdentifier);
            var jsonObjectArray = this.context;
            currentTransactionType = "";
            for (var key in transactionTypeIdentifier) {
                currentTransactionType = transactionTypeIdentifier[key];
                if (jsonObjectArray.hasOwnProperty(currentTransactionType)) {
                    currentTransactionType = key;
                    break;
                }
            }
            var type = transactionTypeIdentifier[currentTransactionType];
            this.currentTransactionType = this.context[type];
        },
        /**
         * Component breakPointParser
         * Parse the value and returns the processed value for the transactionType
         * @param: inputJSON{JSON} - Json with transaction type
         * @param: lookUpKey{String} - transaction type
         * @return: {String} - value for  the given transaction type
         */
        transactionTypeParser: function(inputJSON, lookUpKey) {
            inputJSON = this.getTransactionTypeValue(inputJSON);
            if (inputJSON.hasOwnProperty(lookUpKey)) {
                return inputJSON[lookUpKey];
            } else if (inputJSON["default"]) {
                return inputJSON["default"];
            }
            return inputJSON;
        },
        /**
         * Component getTransactionTypeValue
         * Reponsible for parsing the value for TransactionType configured
         */
        getTransactionTypeValue: function(contractJSON) {
            try {
                if (typeof(this._transactionTypes) === "string")
                    this._transactionTypes = JSON.parse(this._transactionTypes);
                if (typeof(contractJSON) === "string") {
                    contractJSON = JSON.parse(contractJSON);
                }
                for (var key in contractJSON) {
                    if (key.includes("$.TRANSTYPE.")) {
                        keyValue = key.split("$.TRANSTYPE.");
                        var newKey = this._transactionTypes[keyValue[1]];
                        var prevValue = contractJSON[key];
                        delete(contractJSON[key]);
                        contractJSON[newKey] = prevValue;
                    }
                }
                return contractJSON;
            } catch (err) {
                return contractJSON;
            }
        },
        /**
         * Component getFieldValue
         * Parse the exposed contract value based on transactionType
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
                   if(typeof(value) ==="string"){
                 return this.getProcessedText(value);
               }
                else if(typeof(value) === "boolean"){
                  return value;
                }
                 else if(typeof(value) === "object"){
                  return value;
                }
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
         * Component updateTransactions
         * Responsible to set the data and UI to the segment.
         */
        updateTransactionDetails: function(transactionData) {
            var scopeObj = this;
      this.view.lblStatus.setVisibility(scopeObj._statusFieldVisibility);
	  var statusIndicatorVisibility= JSON.parse(this._statusIndicatorVisibility);
      var currentVisibilityStatus = "";
      for (var key in statusIndicatorVisibility) {
               if(currentTransactionType == key){
                currentVisibilityStatus = statusIndicatorVisibility[key];
                 break;
                }
            }
      this.view.lblStatusIndicator.setVisibility(currentVisibilityStatus);
	  var status = scopeObj.getFieldValue(this.getTransactionTypeValue(this['_fieldStatus']), "text");
      if(status === "Successful"){
        this.view.lblStatusIndicator.skin= scopeObj._sknTransStatusSuccess;
      }
      if(status === "Pending"){
        this.view.lblStatusIndicator.skin= scopeObj._sknTransStatusPending;
      }
      scopeObj.view.lblStatus.text= scopeObj.getFieldValue(this.getTransactionTypeValue(scopeObj._fieldStatus),"text");
      scopeObj.view.lblStatus.skin = scopeObj.getFieldValue(this.getTransactionTypeValue(scopeObj._fieldStatus),"skin");
      for(var j = 1; j <= 12; j++){
        var title = scopeObj.getFieldValue(this.getTransactionTypeValue(this['_field'+j+"Label"]), "text");      
        if(typeof(title) != "string" && title != null && title != ""){
          title = scopeObj.getFieldValue(title[this.currentTransactionType]);
        }
        if(!scopeObj.isEmptyNullUndefined(title)){
          this.view['lblDetailsTitle'+j].text= title;
          this.view['lblDetailsTitle'+j].skin= scopeObj._sknTransDetailsLabel;
        }
        else{
          this.view['lblDetailsTitle'+j].text= "";
        }
        var value = scopeObj.getFieldValue(this.getTransactionTypeValue(this['_field'+j+'Value']), "text");
        value = scopeObj.getFormattedData(value,scopeObj.getFieldValue(this.getTransactionTypeValue(this['_field'+j+"Type"])),scopeObj.getFieldValue(this.getTransactionTypeValue(this['_field'+j+'Value']), "currencycode"));
        var fieldType = scopeObj.getFieldValue(this.getTransactionTypeValue(this['_field'+j+"Type"]));  
        if(!scopeObj.isEmptyNullUndefined(value)){
         this.view['lblDetailsValue'+j].text= value.text;
          if(fieldType === "amount"){
            var amountFieldTypeSkin = JSON.parse(scopeObj._sknTransDetailsAmount);
            var currentFieldValueSkin = "";
            for(var key in amountFieldTypeSkin){
              if(key.split(" ")[1] == j){
                currentFieldValueSkin = amountFieldTypeSkin[key];
              }
            }
            if(currentFieldValueSkin === ""){
              currentFieldValueSkin = amountFieldTypeSkin["default"];
            }
           this.view['lblDetailsValue'+j].skin = currentFieldValueSkin;
          }
          else{
           this.view['lblDetailsValue'+j].skin= scopeObj._sknTransDetailsValue;
          }
        }
        else{
         this.view['lblDetailsValue'+j].text= "";
        }
        if(this.view['lblDetailsTitle'+j].text == "" ||this.view['lblDetailsValue'+j].text== ""){
          this.view['flxDetails'+j].setVisibility(false);
        }
        else{
          this.view['flxSeparator'+j].skin= scopeObj._sknTransDetailsSeparator;
          this.view['flxDetails'+j].setVisibility(true);
        }  
      }
      try
      { 
        let text = scopeObj.getFieldValue(this.getTransactionTypeValue(scopeObj._btnContextualAction1),"text");
        var data = scopeObj.context;
        var transaction = this.currentTransactionType;
        if(!scopeObj.isEmptyNullUndefined(text)){ 
          scopeObj.view.btnContextualAction1.text= text;
          var btnId= scopeObj.getFieldValue(this.getTransactionTypeValue(scopeObj._btnContextualAction1),"id");
          /*scopeObj.view.btnContextualAction1.onClick= function(){   
            scopeObj.contextualActionButtonOnClick(btnId);
          };*/
          scopeObj.view.btnContextualAction1.skin= scopeObj.getFieldValue(this.getTransactionTypeValue(scopeObj._btnContextualAction1), "skin");     
          var entitlementKeys = scopeObj.getFieldValue(this.getTransactionTypeValue(scopeObj._btnContextualAction1), "entitlement_keys"); 
          var entitlementAction = scopeObj.getFieldValue(this.getTransactionTypeValue(scopeObj._btnContextualAction1), "entitlement_action");
          if(entitlementAction){
            scopeObj.getBtnEntitlement(btnId,entitlementKeys,function(visibility){
              if(visibility === true){
                scopeObj.view.btnContextualAction1.setVisibility(true);
              }
              else{
                scopeObj.view.btnContextualAction1.setVisibility(false);
              }     
            });
          }
          else if(scopeObj.isEmptyNullUndefined(entitlementKeys) && scopeObj.EntitlementUtils.isEntitled(entitlementKeys)){
            scopeObj.view.btnContextualAction1.setVisibility(true);
          }           
          else{
            scopeObj.view.btnContextualAction1.setVisibility(false);
          }
        }
        else{
          scopeObj.view.btnContextualAction1.setVisibility(false);
        }
      }
      catch(err)
      {
        scopeObj.view.btnContextualAction1.setVisibility(false);
      }
      try
      { 
        let text = scopeObj.getFieldValue(this.getTransactionTypeValue(scopeObj._btnContextualAction2),"text");
        var data = scopeObj.context;
        var transaction = this.currentTransactionType;
        if(!scopeObj.isEmptyNullUndefined(text)){ 
          scopeObj.view.btnContextualAction2.text= text;
          var btnId= scopeObj.getFieldValue(this.getTransactionTypeValue(scopeObj._btnContextualAction2),"id");
          /*scopeObj.view.btnContextualAction2.onClick= function(){   
            scopeObj.contextualActionButtonOnClick(btnId);
          };*/
          scopeObj.view.btnContextualAction2.skin= scopeObj.getFieldValue(this.getTransactionTypeValue(scopeObj._btnContextualAction2), "skin");     
          var entitlementKeys = scopeObj.getFieldValue(this.getTransactionTypeValue(scopeObj._btnContextualAction2), "entitlement_keys"); 
          var entitlementAction = scopeObj.getFieldValue(this.getTransactionTypeValue(scopeObj._btnContextualAction2), "entitlement_action");
           if(entitlementAction){
            scopeObj.getBtnEntitlement(btnId,entitlementKeys,function(visibility){
              if(visibility === true){
                scopeObj.view.btnContextualAction2.setVisibility(true);
              }
              else{
                scopeObj.view.btnContextualAction2.setVisibility(false);
              }     
            });
          }
          else if(scopeObj.EntitlementUtils.isEntitled(entitlementKeys)){
            scopeObj.view.btnContextualAction2.setVisibility(true);
          }           
          else{
            scopeObj.view.btnContextualAction2.setVisibility(false);
          }
        }
        else{
          scopeObj.view.btnContextualAction2.setVisibility(false);
        }
      }
      catch(err)
      {
        scopeObj.view.btnContextualAction2.setVisibility(false);
      }
      try
      { 
        let text = scopeObj.getFieldValue(this.getTransactionTypeValue(scopeObj._btnContextualAction3),"text");
        var data = scopeObj.context;
        var transaction = this.currentTransactionType;
        if(!scopeObj.isEmptyNullUndefined(text)){ 
          scopeObj.view.btnContextualAction3.text= text;
          var btnId= scopeObj.getFieldValue(this.getTransactionTypeValue(scopeObj._btnContextualAction3),"id");
          /*scopeObj.view.btnContextualAction3.onClick= function(){   
            scopeObj.contextualActionButtonOnClick(btnId);
          };*/
          scopeObj.view.btnContextualAction3.skin= scopeObj.getFieldValue(this.getTransactionTypeValue(scopeObj._btnContextualAction3), "skin");     
          var entitlementKeys = scopeObj.getFieldValue(this.getTransactionTypeValue(scopeObj._btnContextualAction3), "entitlement_keys"); 
          var entitlementAction = scopeObj.getFieldValue(this.getTransactionTypeValue(scopeObj._btnContextualAction3), "entitlement_action");
           if(entitlementAction){
            scopeObj.getBtnEntitlement(btnId,entitlementKeys,function(visibility){
              if(visibility === true){
                scopeObj.view.btnContextualAction3.setVisibility(true);
              }
              else{
                scopeObj.view.btnContextualAction3.setVisibility(false);
              }     
            });
          }
          else if(scopeObj.EntitlementUtils.isEntitled(entitlementKeys)){
            scopeObj.view.btnContextualAction3.setVisibility(true);
          }           
          else{
            scopeObj.view.btnContextualAction3.setVisibility(false);
          }
        }
        else{
          scopeObj.view.btnContextualAction3.setVisibility(false);
        }
      }
      catch(err)
      {
        scopeObj.view.btnContextualAction3.setVisibility(false);
      }
      try
      { 
        let text = scopeObj.getFieldValue(this.getTransactionTypeValue(scopeObj._btnContextualAction4),"text");
        var data = scopeObj.context;
        var transaction = this.currentTransactionType;
        if(!scopeObj.isEmptyNullUndefined(text)){ 
          scopeObj.view.btnContextualAction4.text= text;
          var btnId= scopeObj.getFieldValue(this.getTransactionTypeValue(scopeObj._btnContextualAction4),"id");
          /*scopeObj.view.btnContextualAction4.onClick= function(){   
            scopeObj.contextualActionButtonOnClick(btnId);
          };*/
          scopeObj.view.btnContextualAction4.skin= scopeObj.getFieldValue(this.getTransactionTypeValue(scopeObj._btnContextualAction4), "skin");     
          var entitlementKeys = scopeObj.getFieldValue(this.getTransactionTypeValue(scopeObj._btnContextualAction4), "entitlement_keys"); 
          var entitlementAction = scopeObj.getFieldValue(this.getTransactionTypeValue(scopeObj._btnContextualAction4), "entitlement_action");
           if(entitlementAction){
            scopeObj.getBtnEntitlement(btnId,entitlementKeys,function(visibility){
              if(visibility === true){
                scopeObj.view.btnContextualAction4.setVisibility(true);
              }
              else{
                scopeObj.view.btnContextualAction4.setVisibility(false);
              }     
            });
          }
          else if(scopeObj.EntitlementUtils.isEntitled(entitlementKeys)){
            scopeObj.view.btnContextualAction4.setVisibility(true);
          }           
          else{
            scopeObj.view.btnContextualAction4.setVisibility(false);
          }
        }
        else{
          scopeObj.view.btnContextualAction4.setVisibility(false);
        }
      }
      catch(err)
      {
        scopeObj.view.btnContextualAction4.setVisibility(false);
      }  
      try
      { 
        let text = scopeObj.getFieldValue(this.getTransactionTypeValue(scopeObj._btnContextualAction5),"text");
        var data = scopeObj.context;
        var transaction = this.currentTransactionType;
        if(!scopeObj.isEmptyNullUndefined(text)){ 
          scopeObj.view.btnContextualAction5.text= text;
          var btnId= scopeObj.getFieldValue(this.getTransactionTypeValue(scopeObj._btnContextualAction5),"id");
          /*scopeObj.view.btnContextualAction5.onClick= function(){   
            scopeObj.contextualActionButtonOnClick(btnId);
          };*/
          scopeObj.view.btnContextualAction5.skin= scopeObj.getFieldValue(this.getTransactionTypeValue(scopeObj._btnContextualAction5), "skin");     
          var entitlementKeys = scopeObj.getFieldValue(this.getTransactionTypeValue(scopeObj._btnContextualAction5), "entitlement_keys"); 
          var entitlementAction = scopeObj.getFieldValue(this.getTransactionTypeValue(scopeObj._btnContextualAction5), "entitlement_action");
          if(entitlementAction){
            scopeObj.getBtnEntitlement(btnId,entitlementKeys,function(visibility){
              if(visibility === true){
                scopeObj.view.btnContextualAction5.setVisibility(true);
              }
              else{
                scopeObj.view.btnContextualAction5.setVisibility(false);
              }     
            });
          }
          else if(scopeObj.EntitlementUtils.isEntitled(entitlementKeys)){
            scopeObj.view.btnContextualAction5.setVisibility(true);
          }           
          else{
            scopeObj.view.btnContextualAction5.setVisibility(false);
          }
        }
        else{
          scopeObj.view.btnContextualAction5.setVisibility(false);
        }
      }
      catch(err)
      {
        scopeObj.view.btnContextualAction5.setVisibility(false);
      }
      if(this.currentTransactionType === "Cheque" || this.currentTransactionType === "Draft" || this.currentTransactionType === "CheckWithdrawal" || this.currentTransactionType === "CheckDeposit") {
        this.view.flxCheckNo.setVisibility(true);
        this.view.segCheckImages.setVisibility(true);
        this.view.flxCheckSeperator.setVisibility(true);
		this.view.lblCheckNumber.text = "Cheque Number: ";
        var value = scopeObj.getFieldValue(this._checkNumberValue);
        if(value == null || value == undefined || value == "")
          this.view.lblCheckNumberValue.text = "NA"
        else
          this.view.lblCheckNumberValue.text = value;
        this.criteriaCheque.mediaType = "png";
        this.criteriaCheque.page = "0";
        this.segmentCheckdata=[{}];
        this.transactionDetailsDAO.getBaseImage(this._objectServiceName,this._operationName,this._objectName,this.criteriaCheque,this.processResponse,this.onErrorResponse);
        if(this.currentTransactionType !== "Draft") {
          this.criteriaCheque.page = "1";
          this.transactionDetailsDAO.getBaseImage(this._objectServiceName,this._operationName,this._objectName,this.criteriaCheque,this.processResponse2ndimage,this.onErrorResponse);
        }
        this.view.flxCross.onTouchEnd = this.flxCrossOnClick;
        this.view.forceLayout();
      }
      else
      {
        this.view.flxCheckNo.setVisibility(false);
        this.view.segCheckImages.setVisibility(false);
        this.view.flxCheckSeperator.setVisibility(false);
      }
      if(this.currentTransactionType === "SwiftPayment") {
        var j = this._swiftTransaction.split(" ")[1];
       this.view['lblDetailsValue'+j].skin = this._swiftTransactionSkin;  
        this.view.forceLayout();
        this.criteriaCheque.mediaType = "pdf";
        this.criteriaCheque.page = "0";
        var params = this.criteriaCheque;
       this.view['lblDetailsValue'+j].onTouchEnd= function(){
          scopeObj.downloadCheck(params);
        }
      }
      else
        {
          var j = this._swiftTransaction.split(" ")[1];
         this.view['lblDetailsValue'+j].onTouchEnd= function(){
              
          }
        }
        },
        /**
         * Component processResponse
         * To process the response
         * backendResponse{JSONObject} - response received from the backend
         * param{JSONObject} - to decide the flow after service call.
         */
        processResponse: function(backendResponse, param) {
            var self = this;
            try {
              
                  this.checkDraftFrontImgEnable(backendResponse, param);
               
            } catch (err) {
                var errorObj = {
                    "errorInfo": "Error in processing the service responce",
                    "errorLevel": "Business",
                    "error": err
                };
                self.onError(errorObj);
            }
        }, /**
         * Component processResponse2ndimage
         * To process the response
         * backendResponse{JSONObject} - response received from the backend
         * param{JSONObject} - to decide the flow after service call.
         */
        processResponse2ndimage: function(backendResponse, param) {
            var self = this;
            try {
                if (param.transactionType === "Cheque") {
                    this.checkBackImgEnable(backendResponse, param);
                }
               
            } catch (err) {
                var errorObj = {
                    "errorInfo": "Error in processing the service responce",
                    "errorLevel": "Business",
                    "error": err
                };
                self.onError(errorObj);
            }
        },
        /**
         * Component onErrorResponse
         * To process the error response
         * backendResponse{JSONObject} - response received from the backend
         * param{JSONObject} - to decide the flow after service call.
         */
        onErrorResponse: function(backendResponse, param) {
            var self = this;
            try {
                if (param.transactionType === "Cheque") {
                    if (param.page === "0") {
                        this.checkDraftFrontImgDisable();
                    } else {
                        this.checkBackImgDisable();
                    }
                }
                if (param.transactionType === "Draft") {
                    this.checkDraftFrontImgDisable();
                }
                if (param.transactionType === "SwiftPayment") {
                    this.ExternalTransferRefernceBtnDisable();
                }
            } catch (err) {
                var errorObj = {
                    "errorInfo": "Error in processing the service error responce",
                    "errorLevel": "Business",
                    "error": err
                };
                self.onError(errorObj);
            }
        },

        /**
         * Component checkDraftFrontImgEnable
         * Responsible to enable check front image
         * @param response{string} - value to be assigned to check.
         * @param param{JSON} - contains params for downnload.
         */
        checkDraftFrontImgEnable: function(response, reqParams) {
            var self = this;
            try {
                if(response.base64 == undefined || response.base64 == null)
                  {
                     this.checkDraftFrontImgDisable();
                  }
               else
                 {
                    this.base64Front = response.base64;
                    this.frontImageParams = reqParams;
                    this.segmentCheckdata[0]["lblFront"] = "Front Image";
                    this.segmentCheckdata[0]["imgFront"] = {
                        "src": "checksmall.png",
                        "onTouchEnd": self.imgCheckDraftFrontOnTouchEnd.bind(self, {}),
                        "isVisible": true
                    };
                    this.segmentCheckdata[0]["flxFrontDownload"] = {
                        "onClick": this.frontCheckDownload
                    };
                    this.segmentCheckdata[0]["imgFrontDownload"] = {
                        "src": "download.png"
                    };
                    if (this.currentTransactionType == "Draft") {
                        this.segmentCheckdata[0]["flxBackImg"] = {
                            "isVisible": false
                        };
                    }
                    this.segmentCheckdata[0]["lblFrontCheckNotAvailable"] = {
                        "isVisible": false
                    };
                    this.view.segCheckImages.setData(this.segmentCheckdata);
                 }
            } catch (err) {
                var errorObj = {
                    "errorInfo": "Error in enabling front image.",
                    "errorLevel": "Business",
                    "error": err
                };
                self.onError(errorObj);
            }
        },
		/**
         * Component frontCheckDownload
         * Responsible to download front image
         */
	     frontCheckDownload: function(){
          var reqParams = this.frontImageParams;
          var mfURL = KNYMobileFabric.mainRef.config.services_meta.TransactionAdvice.url;
          var authToken = KNYMobileFabric.currentClaimToken;
          var serviceURL = mfURL + "/objects/TransactionAdviceObject?Auth_Token=" + authToken;
          serviceURL = serviceURL + "&customerId=" + reqParams.customerId + "&accountId=" + reqParams.accountId + "&transactionRef=" + reqParams.transactionRef + "&mediaType=" + reqParams.mediaType + "&transactionType=" + reqParams.transactionType + "&page=" + reqParams.page;
          kony.application.openURL(serviceURL);
        },												
        /**
         * Component checkBackImgEnable
         * Responsible to enable the back image
         * @param response{string} - value to be assigned to check.
         * @param param{JSON} - contains params for downnload.
         */
        checkBackImgEnable: function(response, reqParams) {
            var self = this;
            try {
                if(response.base64 == undefined || response.base64 == null)
                  {
                    this.checkBackImgDisable();
                  }
                else
                  {
                    this.base64Back = response.base64;
                    this.backImageParams = reqParams;
                    this.segmentCheckdata[0]["flxBackImg"] = {
                        "isVisible": true
                    };
                    this.segmentCheckdata[0]["lblBack"] = "Back Image";
                    this.segmentCheckdata[0]["imgBack"] = {
                        "src": "checksmall.png",
                        "onTouchEnd": self.imgCheckDraftBackOnTouchEnd.bind(self, {}),
                        "isVisible": true
                    };
                    this.segmentCheckdata[0]["flxBackDownload"] = {
                         "onClick": this.backCheckDownload
                    };
                    this.segmentCheckdata[0]["imgBackDownload"] = {
                        "src": "download.png"
                    };
                    this.segmentCheckdata[0]["lblBackCheckNotAvailable"] = {
                        "isVisible": false
                    };
                    this.view.segCheckImages.setData(this.segmentCheckdata);
                  }
                  
            } catch (err) {
                var errorObj = {
                    "errorInfo": "Error in Enabling back check image.",
                    "errorLevel": "Business",
                    "error": err
                };
                self.onError(errorObj);
            }
        },
		/**
         * Component backCheckDownload
         * Responsible to download back image
         */
		backCheckDownload: function(){
          var reqParams = this.backImageParams;
          var mfURL = KNYMobileFabric.mainRef.config.services_meta.TransactionAdvice.url;
          var authToken = KNYMobileFabric.currentClaimToken;
          var serviceURL = mfURL + "/objects/TransactionAdviceObject?Auth_Token=" + authToken;
          serviceURL = serviceURL + "&customerId=" + reqParams.customerId + "&accountId=" + reqParams.accountId + "&transactionRef=" + reqParams.transactionRef + "&mediaType=" + reqParams.mediaType + "&transactionType=" + reqParams.transactionType + "&page=" + reqParams.page;
          kony.application.openURL(serviceURL);
        },

        /**
         * Component checkDraftFrontImgDisable
         * Responsible to get the formatted data to be assigned.
         */
        checkDraftFrontImgDisable: function() {
            var self = this;
            try {
                this.segmentCheckdata[0]["lblFront"] = "Front Image";

                this.segmentCheckdata[0]["imgFront"] = {
                    "isVisible": false
                };
                this.segmentCheckdata[0]["lblFrontCheckNotAvailable"] = {
                    "isVisible": true
                };
                this.segmentCheckdata[0]["lblFrontCheckNotAvailable"] = this.currentTransactionType + kony.i18n.getLocalizedString("i18n.payments.imageNotAvailable");
                if (this.currentTransactionType === "Draft") {
                    this.segmentCheckdata[0]["flxBackImg"] = {
                        "isVisible": false
                    };
                }
                this.view.segCheckImages.setData(this.segmentCheckdata);
            } catch (err) {
                var errorObj = {
                    "errorInfo": "Error in Formating the data.",
                    "errorLevel": "Business",
                    "error": err
                };
                self.onError(errorObj);
            }
        },

        /**
         * Component checkBackImgDisable
         * Responsible to get the formatted data to be assigned.
         */
        checkBackImgDisable: function() {
            var self = this;
            try {
                this.segmentCheckdata[0]["flxBackImg"] = {
                    "isVisible": true
                };
                this.segmentCheckdata[0]["lblBack"] = "Back Image";

                this.segmentCheckdata[0]["imgBack"] = {
                    "isVisible": false
                };
                this.segmentCheckdata[0]["lblBackCheckNotAvailable"] = {
                    "isVisible": true
                };
                this.segmentCheckdata[0]["lblBackCheckNotAvailable"] = this.currentTransactionType + " Image not available";

                this.view.segCheckImages.setData(this.segmentCheckdata);
            } catch (err) {
                var errorObj = {
                    "errorInfo": "Error in Disabling back check image",
                    "errorLevel": "Business",
                    "error": err
                };
                self.onError(errorObj);
            }
        },


        /**
         * Component imgCheckDraftBackOnTouchEnd
         * Responsible to display back check Image.
         */
        imgCheckDraftBackOnTouchEnd: function() {
            var self = this;
            try {
                this.view.imgCheckZoom.base64 = this.base64Back;
                this.view.flxCheckZoomView.setVisibility(true);
                this.view.flxMain.setEnabled(false);
            } 
			catch (err) {
                var errorObj = {
                    "errorInfo": "Error in displaying back chek image.",
                    "errorLevel": "Business",
                    "error": err
                };
                self.onError(errorObj);
            }
        },


        /**
         * Component imgCheckDraftFrontOnTouchEnd
         * Responsible to show the front image check
         */
        imgCheckDraftFrontOnTouchEnd: function() {
            var self = this;
            try {
                this.view.imgCheckZoom.base64 = this.base64Front;
                this.view.flxCheckZoomView.setVisibility(true);
                this.view.flxMain.setEnabled(false);
            } 
			catch (err) {
                var errorObj = 
				{
                    "errorInfo": "Error in displaying check front image.",
                    "errorLevel": "Business",
                    "error": err
                };
                self.onError(errorObj);
            }
        },

        /**
         * Component flxCrossOnClick
         * Responsible to disabe check image.
         */
        flxCrossOnClick: function() {
            var self = this;
            try {
                this.view.flxCheckZoomView.setVisibility(false);
                this.view.flxMain.setEnabled(true);
                this.view.forceLayout();
            } 
			catch (err) {
                var errorObj = 
				{
                    "errorInfo": "Error in disabling checkmimage",
                    "errorLevel": "Business",
                    "error": err
                };
                self.onError(errorObj);
            }
        },

        /**
         * Component getFormattedData
         * Responsible to get the formatted data to be assigned.
         * @param value{string} - value to be be formatted
         * @param type{string} - type of the value passed
         * @param currencyCode{string} - currency code to be appended for amount
         * @return : {JSONObject} - jsonvalue of formatted value and skin
         */
        getFormattedData: function(value, type, currencyCode) {
            var self = this;
            try {
                if (this.isEmptyNullUndefined(currencyCode))
                    currencyCode = this.getFieldValue(this._currencyCode);
                return this.FormatUtils.formatText(value, type, this.formatSkins, this.formattingJSON, currencyCode);
            } 
			catch (err) {
                var errorObj = 
				{			 
                    "errorInfo": "Error in Formating the data.",
                    "errorLevel": "Business",
                    "error": err
                };
                self.onError(errorObj);
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

        /*Error object to print error
         */
        onError: function(errorObj) {
            kony.print("Failed to fetch Transaction Details:" + JSON.stringify(errorObj));
        },
        /**
         * This method is used to throw error in console if the input JSON is in valid in structure
         * @param : this.jsonError - consists of all the JSON Error in the component stated with its FieldName and SyntaxError
         */
        printJSONValidator: function() {
            for (var i = 0; i < (this.invalidJSONLoggerArray.length); i++) {
                var invalidJSONString = "FieldName: " + this.invalidJSONLoggerArray[i].fieldName + " SyntaxError: " + this.invalidJSONLoggerArray[i].syntaxError;
                console.error(invalidJSONString);
            }
        }
    };
});