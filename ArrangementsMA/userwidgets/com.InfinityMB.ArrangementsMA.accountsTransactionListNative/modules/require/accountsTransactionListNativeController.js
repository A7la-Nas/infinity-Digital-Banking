define(['CacheUtils','./TransactionListDAO', 'JSONValidator', './FormatUtils', './ParserUtilsManager', './CacheUtils'], function(cacheUtilities,TransactionListDAO, JSONValidator, FormatUtils, ParserUtilsManager, CacheUtils) {
    return {
        constructor: function(baseConfig, layoutConfig, pspConfig) {
            this._objectServiceName = "";
            this._accountId = "";
            this._transDetailsVisibility = "";
            this._sknGroupHeaderLabel = "";
            this.context = "";
            this._ListArray = "";
            this._amountFormat = "";
            this._field1Value = "";
            this.skins = {};
            this.formattingJSON = {};
            this.formatSkins = {};
            this.accountType = "";
            this._displayDisputeIcon = "";
            this._iconDisputedTransaction = "";
            this.transactionsListTypes = "";
            this._objectName = "";
            this._accountType = "";
            this._defaultSort = "";
            this._sknPrimaryField1 = "";
            this._ListIdentifier = "";
            this._dateFormat = "";
            this._field2Value = "";
            this._disputeProperty = "";
            this._iconNoRecordsAvailable = "";
            this._operationName = "";
            this._sknPrimaryField2 = "";
            this._segregationDecider = "";
            this._backendDateFormat = "";
            this._field3Value = "";
            this._iconGroupExpand = "";
            this._criteria = "";
            this._sknRowSeparator = "";
            this._segregationTypes = "";
            this._currencyCode = "";
            this._field4Value = "";
            this._iconGroupCollapse = "";
            this._serviceResponseIdentifier = "";
            this._sknGroupHeaderBackground = "";
            this._noRecordsAvailable = "";
            this._dataAvailability = "";
            this._sknRow = "";
            this._sknSegmentShadow = "";
            this._sknAmount = "";
            this._TLaccountType = "";
            this._sknSecondaryFields = "";
            this._btnSwipeableAction1 = "";
            this._btnSwipeableAction2 = "";
            this._btnSwipeableAction3 = "";
            this._serviceType = "";
            this.serviceOffset=1;
            //DAO object
            this.transactionListDAO = new TransactionListDAO();
            //Parser Util Object
            this.parserUtilsManager = new ParserUtilsManager();
            //Format util object
            this.formatUtils = new FormatUtils;
            //Json validator object
            this.jsonValidator = new JSONValidator();
          
            //Blocked funds properties.
            this._blockedDataAvailability = "";
            this._blockedObjServiceName = "";
            this._blockedObjName = "";
            this._blockedOperationName = "";
            this._blockedCriteria = "";
            this._blockedServiceIdentifier = "";
          
            //global variables
            this.invalidJSONLoggerArray = [];
          	this.loanSchedule = [];
            this.isValidJSONString = "";
            this.getsegregationTypes = "";
            this.jsonError = "";
            this.segmentData = "";
            this.lastRow = {};
            this.segregatedValues = {};
            this.criteriaObjectValue = {};
            this.blockedCriteriaValue={};
            this.segDataBackup = {};
            this.searchResult = false;
            this.isTransactionSuccess = "";
            this.isBlockedSuccess = "";
            this.transactionsResponse = {};
            this.blockedResponse = {};
            this.renderPagination=0;
            this.backupData=[];
        },
        //Logic for getters/setters of custom properties
        initGettersSetters: function() {
             defineSetter(this, "serviceType", function(val) {
            if ((typeof val === 'string') && (val !== "")) {
              this._serviceType = val;
              this.isValidJSONString = this.jsonValidator.isValidJson(val);
              if (this.isValidJSONString.returnType === "false") {
                this.jsonError = {
                fieldName: "serviceType",
                syntaxError: this.isValidJSONString.syntaxError
                };
                this.invalidJSONLoggerArray.push(this.jsonError);
              }
            }
          });

            defineSetter(this, "TLaccountType", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._TLaccountType = val;

                }
            });
            defineGetter(this, "TLaccountType", function() {
                return this._TLaccountType;
            });


            defineSetter(this, "recordsPerPage", function(val) {
                if ((typeof val === 'number') && (val !== "")) {
                    this._recordsPerPage = val;

                }
            });
            defineGetter(this, "recordsPerPage", function() {
                return this._recordsPerPage;
            });

            defineSetter(this, "btnSwipeableAction1", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._btnSwipeableAction1 = val;
                }
            });

            defineGetter(this, "btnSwipeableAction1", function() {
                return this._btnSwipeableAction1;
            });
            defineSetter(this, "btnSwipeableAction2", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._btnSwipeableAction2 = val;
                }
            });

            defineGetter(this, "btnSwipeableAction2", function() {
                return this._btnSwipeableAction2;
            });

            defineSetter(this, "btnSwipeableAction3", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._btnSwipeableAction3 = val;
                }
            });

            defineGetter(this, "btnSwipeableAction3", function() {
                return this._btnSwipeableAction3;
            });

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
          
          defineSetter(this, "blockedObjServiceName", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._blockedObjServiceName = val;
          this.isValidJSONString = this.jsonValidator.isValidJson(val);
          if (this.isValidJSONString.returnType === "false") {
            this.jsonError = {
              fieldName: "blockedObjServiceName",
              syntaxError: this.isValidJSONString.syntaxError
            };
            this.invalidJSONLoggerArray.push(this.jsonError);
          }
        }
      });
      defineGetter(this, "blockedObjServiceName", function () {
        return this._blockedObjServiceName;
      });
      
      defineSetter(this, "blockedObjName", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._blockedObjName = val;
          this.isValidJSONString = this.jsonValidator.isValidJson(val);
          if (this.isValidJSONString.returnType === "false") {
            this.jsonError = {
              fieldName: "blockedObjName",
              syntaxError: this.isValidJSONString.syntaxError
            };
            this.invalidJSONLoggerArray.push(this.jsonError);
          }
        }
      });
      defineGetter(this, "blockedObjName", function () {
        return this._blockedObjName;
      });
      
      defineSetter(this, "blockedOperationName", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._blockedOperationName = val;
          this.isValidJSONString = this.jsonValidator.isValidJson(val);
          if (this.isValidJSONString.returnType === "false") {
            this.jsonError = {
              fieldName: "blockedOperationName",
              syntaxError: this.isValidJSONString.syntaxError
            };
            this.invalidJSONLoggerArray.push(this.jsonError);
          }
        }
      });
      defineGetter(this, "blockedOperationName", function () {
        return this._blockedOperationName;
      });
      
      defineSetter(this, "blockedCriteria", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._blockedCriteria = val;
          this.isValidJSONString = this.jsonValidator.isValidJson(val);
          if (this.isValidJSONString.returnType === "false") {
            this.jsonError = {
              fieldName: "blockedCriteria",
              syntaxError: this.isValidJSONString.syntaxError
            };
            this.invalidJSONLoggerArray.push(this.jsonError);
          }
        }
      });
      defineGetter(this, "blockedCriteria", function () {
        return this._blockedCriteria;
      });
      
      defineSetter(this, "blockedServiceIdentifier", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._blockedServiceIdentifier = val;
          this.isValidJSONString = this.jsonValidator.isValidJson(val);
          if (this.isValidJSONString.returnType === "false") {
            this.jsonError = {
              fieldName: "blockedServiceIdentifier",
              syntaxError: this.isValidJSONString.syntaxError
            };
            this.invalidJSONLoggerArray.push(this.jsonError);
          }
        }
      });
      defineGetter(this, "blockedServiceIdentifier", function () {
        return this._blockedServiceIdentifier;
      });
      
      defineSetter(this, "blockedDataAvailability", function (val) {
        if ((typeof val === 'string') && (val !== "")) {
          this._blockedDataAvailability = val;
          this.isValidJSONString = this.jsonValidator.isValidJson(val);
          if (this.isValidJSONString.returnType === "false") {
            this.jsonError = {
              fieldName: "blockedDataAvailability",
              syntaxError: this.isValidJSONString.syntaxError
            };
            this.invalidJSONLoggerArray.push(this.jsonError);
          }
        }
      });
      defineGetter(this, "blockedDataAvailability", function () {
        return this._blockedDataAvailability;
      }); 
            defineGetter(this, "objectServiceName", function() {
                return this._objectServiceName;
            });
            defineSetter(this, "accountId", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._accountId = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "accountId",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "accountId", function() {
                return this._accountId;
            });
            defineSetter(this, "transDetailsVisibility", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._transDetailsVisibility = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "transDetailsVisibility",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "transDetailsVisibility", function() {
                return this._transDetailsVisibility;
            });
            defineSetter(this, "sknGroupHeaderLabel", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._sknGroupHeaderLabel = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "sknGroupHeaderLabel",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "sknGroupHeaderLabel", function() {
                return this._sknGroupHeaderLabel;
            });
            defineSetter(this, "ListArray", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._ListArray = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "ListArray",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "ListArray", function() {
                return this._ListArray;
            });
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
            defineSetter(this, "field1Value", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
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
            defineSetter(this, "displayDisputeIcon", function(val) {
                if ((typeof val === 'boolean') && (val !== "")) {
                    this._displayDisputeIcon = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "displayDisputeIcon",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "displayDisputeIcon", function() {
                return this._displayDisputeIcon;
            });
            defineSetter(this, "iconDisputedTransaction", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._iconDisputedTransaction = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "iconDisputedTransaction",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "iconDisputedTransaction", function() {
                return this._iconDisputedTransaction;
            });
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
            defineSetter(this, "accountType", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._accountType = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "accountType",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "accountType", function() {
                return this._accountType;
            });
            defineSetter(this, "defaultSort", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._defaultSort = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "defaultSort",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "defaultSort", function() {
                return this._defaultSort;
            });
            defineSetter(this, "sknPrimaryField1", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._sknPrimaryField1 = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "sknPrimaryField1",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "sknPrimaryField1", function() {
                return this._sknPrimaryField1;
            });
            defineSetter(this, "ListIdentifier", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._ListIdentifier = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "ListIdentifier",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "ListIdentifier", function() {
                return this._ListIdentifier;
            });
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
            defineSetter(this, "disputeProperty", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._disputeProperty = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "disputeProperty",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "disputeProperty", function() {
                return this._disputeProperty;
            });
            defineSetter(this, "iconNoRecordsAvailable", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._iconNoRecordsAvailable = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "iconNoRecordsAvailable",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "iconNoRecordsAvailable", function() {
                return this._iconNoRecordsAvailable;
            });
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
            defineSetter(this, "sknPrimaryField2", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._sknPrimaryField2 = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "sknPrimaryField2",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "sknPrimaryField2", function() {
                return this._sknPrimaryField2;
            });
            defineSetter(this, "segregationDecider", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._segregationDecider = val
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "segregationDecider",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "segregationDecider", function() {
                return this._segregationDecider;
            });
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
            defineSetter(this, "iconGroupExpand", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._iconGroupExpand = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "iconGroupExpand",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "iconGroupExpand", function() {
                return this._iconGroupExpand;
            });
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
            defineSetter(this, "sknRowSeparator", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._sknRowSeparator = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "sknRowSeparator",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "sknRowSeparator", function() {
                return this._sknRowSeparator;
            });
            defineSetter(this, "segregationTypes", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._segregationTypes = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "segregationTypes",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "segregationTypes", function() {
                return this._segregationTypes;
            });
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
            defineSetter(this, "iconGroupCollapse", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._iconGroupCollapse = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "iconGroupCollapse",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "iconGroupCollapse", function() {
                return this._iconGroupCollapse;
            });
            defineSetter(this, "serviceResponseIdentifier", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._serviceResponseIdentifier = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "serviceResponseIdentifier",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "serviceResponseIdentifier", function() {
                return this._serviceResponseIdentifier;
            });
            defineSetter(this, "sknGroupHeaderBackground", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._sknGroupHeaderBackground = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "sknGroupHeaderBackground",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "sknGroupHeaderBackground", function() {
                return this._sknGroupHeaderBackground;
            });
            defineSetter(this, "noRecordsAvailable", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._noRecordsAvailable = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "noRecordsAvailable",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "noRecordsAvailable", function() {
                return this._noRecordsAvailable;
            });
            defineSetter(this, "dataAvailability", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._dataAvailability = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "dataAvailability",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "dataAvailability", function() {
                return this._dataAvailability;
            });
            defineSetter(this, "sknRow", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._sknRow = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "sknRow",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "sknRow", function() {
                return this._sknRow;
            });
            defineSetter(this, "sknSegmentShadow", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._sknSegmentShadow = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "sknSegmentShadow",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "sknSegmentShadow", function() {
                return this._sknSegmentShadow;
            });
            defineSetter(this, "sknAmount", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._sknAmount = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "sknAmount",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "sknAmount", function() {
                return this._sknAmount;
            });
            defineSetter(this, "sknSecondaryFields", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._sknSecondaryFields = val;
                    this.isValidJSONString = this.jsonValidator.isValidJson(val);
                    if (this.isValidJSONString.returnType === "false") {
                        this.jsonError = {
                            fieldName: "sknSecondaryFields",
                            syntaxError: this.isValidJSONString.syntaxError
                        };
                        this.invalidJSONLoggerArray.push(this.jsonError);
                    }
                }
            });
            defineGetter(this, "sknSecondaryFields", function() {
                return this._sknSecondaryFields;
            });
          defineSetter(this, "backendTransLimit", function(val) {
            if ((typeof val === 'boolean') && (val !== "")) {
              this._backendTransLimit = val;

            }
          });
          defineGetter(this, "backendTransLimit", function() {
            return this._backendTransLimit;
          });
          defineSetter(this, "transactionCount", function(val) {
            if ((typeof val === 'string') && (val !== "")) {
              this._transactionCount = val;

            }
          });
          defineGetter(this, "transactionCount", function() {
            return this._transactionCount;
          });
          defineSetter(this, "blockedCount", function(val) {
            if ((typeof val === 'string') && (val !== "")) {
              this._blockedCount = val;

            }
          });
          defineGetter(this, "blockedCount", function() {
            return this._blockedCount;
          });
          defineSetter(this, "backendBlockedLimit", function(val) {
            if ((typeof val === 'boolean') && (val !== "")) {
              this._backendBlockedLimit = val;

            }
          });
          defineGetter(this, "backendBlockedLimit", function() {
            return this._backendBlockedLimit;
          });
        },
        rowExpandCollapse: function(context) {
            var self = this;
            try {
                var sectionIndex = context.section;
                if (this.segmentData === '')
                    this.segmentData = JSON.parse(JSON.stringify(this.view.segTransactionsList.data));

                var data = this.view.segTransactionsList.data;
                var selectedHeaderData = data[sectionIndex][0];
                if (!JSON.stringify(data).includes("flxNoRecords")) {
                    if (selectedHeaderData["imgChevron"] === this.icons.GROUP_EXPAND_ICON) {
                        selectedHeaderData["imgChevron"] = this.icons.GROUP_COLLAPSE_ICON;
                        data[sectionIndex][1] = [];
                        this.view.segTransactionsList.setData(data);
                    } else {
                        selectedHeaderData["imgChevron"] = this.icons.GROUP_EXPAND_ICON;
                        data[sectionIndex][1] = this.segmentData[sectionIndex][1];
                        this.view.segTransactionsList.setData(data);
                    }
                }
            } catch (err) {
                var errorObj = {
                    "errorInfo": "Error in rowExpandCollapse",
                    "errorLevel": "Configuration",
                    "error": err
                };
                self.onError(errorObj);
            }
        },
        /**
         * Component preShow
         * Reponsible to retain the data for custom properties for multiple entries into the component
                          Invoke the DAO layer to collect information from the service
         */
        preShow: function() {
            var scope = this;
            var previousFormName = (kony.application.getPreviousForm());
            this.renderPagination=0;
             this.serviceOffset=1;
          if(kony.application.getCurrentForm().id==="frmAdvanceSearchResults")
            this._serviceType="search";
            try {
                if (previousFormName.id !== "frmAccountTransactionDetails" && previousFormName.id !== "frmLoanTransactionDetails") {

                    this.skins = {
                        PRIMARY_FIELD_1: scope._sknPrimaryField1,
                        PRIMARY_FIELD_2: scope._sknPrimaryField2,
                        SECONDARY_FIELDS: scope._sknSecondaryFields,
                        GROUP_HEADER_LABEL: scope._sknGroupHeaderLabel,
                        GROUP_HEADER_BACKGROUND: scope._sknGroupHeaderBackground,
                        ROW_SKIN: scope._sknRow,
                        ROW_SEPARATOR: scope._sknRowSeparator,
                        AMOUNT: scope._sknAmount,
                        SEGMENT_SHADOW: scope._sknSegmentShadow
                    };
                    if (typeof(this._segregationDecider) === "string") {
                        this._segregationDecider = JSON.parse(this._segregationDecider);
                    }
                    //CacheUtils object
                    var defaultParams = {
                        "sortBy": "",
                        "pageSize": this._recordsPerPage,
                        "onUpdate": this.cacheCallback,
                        "filterParam": "",
                        "filterValue": "All",
                        "sortOrder": "desc",
                        "segregationTypes": JSON.parse(this._segregationTypes),
                        "segregationField": this._segregationDecider[this.context["transactionType"]]
                    };
                    this.cacheUtils = new CacheUtils(defaultParams);
                    cacheUtils = new cacheUtilities({});
                    this.formattingJSON = {
                        "amountFormat": JSON.parse(this._amountFormat),
                        "dateFormat": this._dateFormat,
                        "backenddateformat": this._backendDateFormat,
                    };
                    this.formatSkins = {
                        TEXT_SKIN: "",
                        POSITIVE_AMOUNT_SKIN: "",
                        NEGATIVE_AMOUNT_SKIN: "",
                        DATE_SKIN: "",
                        PERCENTAGE_SKIN: ""
                    };
                    this.getsegregationTypes = JSON.parse(this._segregationTypes);
                    if (typeof(this._segregationDecider) === "string")
                        this._segregationDecider = JSON.parse(this._segregationDecider);
                    this.setCriteria(this._criteria, "Transactions");
                    this.setCriteria(this._blockedCriteria, "Blocked Funds");
                    this.fitData = {
                        FIELD3: {
                            "top": "15dp",
                            "original": "0dp"
                        },
                        FIELD4: {
                            "top": "27dp",
                            "original": "15dp"
                        },
                        FIELD1: {
                            "top": "25dp",
                            "original": "40dp"
                        },
                        FIELD2: {
                            "top": "8dp",
                            "original": "23dp"
                        }
                    };
                    this.icons = {
                        GROUP_EXPAND_ICON: scope._iconGroupExpand,
                        GROUP_COLLAPSE_ICON: scope._iconGroupCollapse,
                        NO_RECORDS_ICON: scope._iconNoRecordsAvailable
                    };
                    this.getSegregatedValues();
                    this.backupData = [];
                    this.segmentData = "";
                    this.criteriaObjectValue.offset = 0;
                    this.isTransactionSuccess = 0;
                    this.isBlockedSuccess = 0;
                    this.cacheUtils.offset = 1;
                    this.searchResult = false;
                    this.view.segTransactionsList.setVisibility(false);
                   // this.view.flxListLoading.setVisibility(true);

                    this.getTransactionList();
                    if (this.invalidJSONLoggerArray.length > 0) {
                        this.printJSONValidator();
                    }

                }
            } catch (err) {
                var errorObj = {
                    "errorInfo": "Error in preShow",
                    "errorLevel": "Configuration",
                    "error": err
                };
                scope.onError(errorObj);
            }
        },
        /**
         * Component getTransactionList
         * Reponsible to call the DAO method for invoking service api.
         */
        getTransactionList: function() {
           var self = this;
      this.onRequestStart();
      try {
         if ((this._dataAvailability === "Service calls by component" && this._blockedDataAvailability === "Service calls by component") && (this._serviceType != "search")) {
        this.transactionListDAO.fetchTransactionList(this._objectServiceName, this._operationName, this._objectName, this.getCriteria("Transactions"), this._serviceResponseIdentifier, this.transactionsSuccess, this.onError);
        if((this.context["accountType"] === "Savings" ||  this.context["accountType"] === "Checking")) {
        this.transactionListDAO.fetchTransactionList(this._blockedObjServiceName, this._blockedOperationName, this._blockedObjName, this.getCriteria("Blocked Funds"), this._blockedServiceIdentifier, this.blockedFundsSuccess, this.onError);
        }
        }
        else {
          if(this.context["selectedType"] === kony.i18n.getLocalizedString("kony.mb.PFMCategorisedTransactions.Title")) {
             if(this._dataAvailability === "Service calls by component")
                         {
                           this.transactionListDAO.fetchTransactionList(this._objectServiceName, this._operationName, this._objectName, this.getCriteria("Transactions"), this._serviceResponseIdentifier, this.transactionsSuccess, this.onError);
                         }
                      else
             self.startSearch(self.context);
          } else if(this.context["selectedType"] === kony.i18n.getLocalizedString("kony.mb.accdetails.blockedFunds")){
            if(this._serviceType == "search")
                      {
                        this.transactionListDAO.fetchTransactionList(this._blockedObjServiceName, this._blockedOperationName, this._blockedObjName, this.getCriteria("Blocked Funds"), this._blockedServiceIdentifier, this.blockedFundsSuccess, this.onError);
                      }
                      else
             self.startBFSearch(self.context);
          }
        }
        } catch (err) {
        var errorObj = {
          "errorInfo": "Error in doing service call to fetch transactions",
          "errorLevel": "Business",
          "error": err
        };
        self.onError(errorObj);
      }

        },
      
    transactionsSuccess: function(response) {
      var scope = this;
      this.loanSchedule=response;
      scope.isTransactionSuccess = 1;
      response = response[this.getFieldValue(this._ListArray)];
      if(response === undefined || response === null){
        response=[];
      }
      var transactionValues = {
          "Transactions" : response
      };
      var navMan = applicationManager.getNavigationManager();
      navMan.setCustomInfo("frmAdvanceSearchResults",transactionValues);
      scope.transactionsResponse = response;
      scope.setResponseToCache();
    },
    
    blockedFundsSuccess: function(response) {
      var scope = this;
      scope.isBlockedSuccess = 1;
      response = response[this.getFieldValue(this._ListArray)];
      if(response === undefined || response === null){
        response=[];
      }
      for(var key in response) {
      response[key].statusDescription = "BLOCKED";
      response[key].transactionType = "BlockedFund";
      }
      var blockedFundsValues = {
          "Blockedfunds" : response
      };
      var navMan = applicationManager.getNavigationManager();
      navMan.setCustomInfo("frmAdvanceSearchResults_Bf",blockedFundsValues);
      scope.blockedResponse = response;
      scope.setResponseToCache();
    },

    setResponseToCache: function() {
        var scope = this;
        var backendResponse = {};
        if((this.context["accountType"] === "Savings" ||  this.context["accountType"] === "Checking")) {
          if (scope.isTransactionSuccess === 1 && scope.isBlockedSuccess === 1 && scope.blockedResponse!== null && scope.blockedResponse!==undefined) {           
            backendResponse = (scope.transactionsResponse).concat(scope.blockedResponse);
            scope.processResponse(backendResponse);
          }
          else if(scope.isTransactionSuccess === 1){
            backendResponse = scope.transactionsResponse;
            scope.processResponse(backendResponse);
          } 
          else if(this.context["selectedType"] === kony.i18n.getLocalizedString("kony.mb.accdetails.blockedFunds") && scope.isBlockedSuccess == 1) {
                  backendResponse = scope.blockedResponse;
                  scope.processResponse(backendResponse);
        }
        }
        else
          scope.processResponse(scope.transactionsResponse);
      },

        /**
         * Component modifySegmentData
         * modifies the data according to the segment
         *  data{object} - response param should be passed
         * @return : {object} corresponding modified segment data
         */
        modifySegmentData: function(data) {
            var self = this;
            try {
                if (data !== undefined)
                    for (var i = 0; i < Object.keys(data).length; i++) {
                        var count = 1,
                            fieldValue, value, flag = 0,
                            text;
                        var displayDisputeIcon = this._displayDisputeIcon;
                        data[i]["flxSeparator"] = {
                            "skin": this.skins.ROW_SEPARATOR
                        };
                        var amountSkin = JSON.parse(this.skins.AMOUNT);
                        var amountField = String(amountSkin["amountField"]).toLowerCase().replace(/\s/g, "");
                        for (j = 0; j < 4; j++) {
                            var isDisputed = data[i][this._disputeProperty];
                            value = this.getFieldValue((eval("this._field" + (j + 1) + "Value")));
                            if (!this.isEmptyNullUndefined(value)) {
                                text = (value[this.segregatedValues[data[i][this._segregationDecider[this.context["transactionType"]]]]] === undefined) ? value["default"] : value[this.segregatedValues[data[i][this._segregationDecider[this.context["transactionType"]]]]];
                                value = this.getFormattedData(data[i][text["text"]], text["fieldType"]);
                            }

                            if ((j + 1) < 3) {
                                fieldValue = this.getFieldValue((eval("this._field" + (j + 3) + "Value")));
                                if (!this.isEmptyNullUndefined(fieldValue)) {
                                    text = (fieldValue[this.segregatedValues[data[i][this._segregationDecider[this.context["transactionType"]]]]] === undefined) ? fieldValue["default"] : fieldValue[this.segregatedValues[data[i][this._segregationDecider[this.context["transactionType"]]]]];
                                    fieldValue = this.getFormattedData(data[i][text["text"]], text["fieldType"]);
                                } else
                                    fieldValue = {};
                            } else {
                                fieldValue = this.getFieldValue((eval("this._field" + (j - 1) + "Value")));
                                if (!this.isEmptyNullUndefined(fieldValue)) {
                                    text = (fieldValue[this.segregatedValues[data[i][this._segregationDecider[this.context["transactionType"]]]]] === undefined) ? fieldValue["default"] : fieldValue[this.segregatedValues[data[i][this._segregationDecider[this.context["transactionType"]]]]];
                                    fieldValue = this.getFormattedData(data[i][text["text"]], text["fieldType"]);
                                } else
                                    fieldValue = {};
                            }
                            if (typeof(fieldValue["text"]) === "undefined" || (fieldValue["text"]) === "" || fieldValue === undefined)
                                fieldValue["isVisible"] = false;
                            else
                                fieldValue["isVisible"] = true;
                            if (!this.isEmptyNullUndefined(value["text"]) || value !== undefined) {

                                if ((j + 1) < 3) {

                                    data[i]["lblField" + (j + 1)] = {
                                        "text": this.makeLineDotted([value["text"]]),
                                        "skin": (amountField === ("field" + (j + 1))) ? this.getAmountValueSkin([value["text"]]) : ((count > 2) ? this.skins.SECONDARY_FIELDS : this.skins["PRIMARY_FIELD_" + count]),
                                        "top": (fieldValue["isVisible"] === false) ? this.fitData["FIELD" + ((j + 3))]["top"] : this.fitData["FIELD" + ((j + 3))]["original"]
                                    };
                                    if (j % 2 === 0 && isDisputed === true && displayDisputeIcon === true) {
                                        data[i]["imgIcon" + (j + 1)] = {
                                            "top": (fieldValue["isVisible"] === false) ? this.fitData["FIELD" + ((j + 3))]["top"] : this.fitData["FIELD" + ((j + 3))]["original"]
                                        };
                                        data[i]["flxIcon" + (j + 1)] = {
                                            "isVisible": (!fieldValue["isVisible"])
                                        };
                                        if (fieldValue["isVisible"]) {
                                            data[i]["flxIcon" + (j + 3)] = {
                                                "isVisible": (fieldValue["isVisible"])
                                            };
                                            data[i]["imgIcon" + (j + 3)] = {
                                                "top": (fieldValue["isVisible"] === false) ? this.fitData["FIELD" + ((j + 3))]["top"] : this.fitData["FIELD" + ((j + 1))]["original"]
                                            };
                                            flag = 1;
                                        }
                                    }
                                } else {

                                    data[i]["lblField" + (j + 1)] = {
                                        "text": this.makeLineDotted([value["text"]]),
                                        "skin": (amountField === ("field" + (j + 1))) ? this.getAmountValueSkin([value["text"]]) : ((count > 2) ? this.skins.SECONDARY_FIELDS : this.skins["PRIMARY_FIELD_" + count]),
                                        "top": (fieldValue["isVisible"] === false) ? this.fitData["FIELD" + ((j - 1))]["top"] : this.fitData["FIELD" + ((j - 1))]["original"]
                                    };
                                    if (j % 2 === 0 && isDisputed === true && flag === 0 && displayDisputeIcon === true) {
                                        data[i]["imgIcon" + (j + 1)] = {
                                            "top": (fieldValue["isVisible"] === false) ? this.fitData["FIELD" + ((j - 1))]["top"] : this.fitData["FIELD" + ((j - 1))]["original"],

                                        };
                                        data[i]["flxIcon" + (j + 1)] = {
                                            "isVisible": (!fieldValue["isVisible"])
                                        };
                                    }

                                }
                                ++count;
                            }
                        }
                        //Swipe contract details setting
                        var selectedType = this.segregatedValues[data[i][this._segregationDecider[this.context["transactionType"]]]];
                        text = self.getFieldValue(self._btnSwipeableAction1, "text");
                        text = self.getFieldValue(text[selectedType]);
                        let flxskin = self.getFieldValue(self.getFieldValue(self._btnSwipeableAction1, "skin")[selectedType]);

                        data[i]["flxSwipeBtn1"] = {
                            "skin": flxskin,
                            "width": self.getFieldValue(self.getFieldValue(self._btnSwipeableAction1, "width")[selectedType]),
                            "onClick": function() {
                                var RowData = self.rowData;
                                RowData.id = self.getFieldValue(self._btnSwipeableAction1, "id")[selectedType];
                                self.swipeActionBtn(RowData);
                            }
                        };
                        if (!this.isEmptyNullUndefined(flxskin) && self.getFieldValue(self._btnSwipeableAction1, "entitlement_action")[selectedType]) {
                            data[i]["flxSwipeBtn1"]["isVisible"] = true;
                        } else {
                            data[i]["flxSwipeBtn1"]["isVisible"] = false;
                        }
                        data[i]["lblSwipeBtn1Text"] = {
                            "text": text,
                            "skin": self.getFieldValue(self.getFieldValue(self._btnSwipeableAction1, "txtSkin")[selectedType])
                        };
                        data[i]["imgSwipeBtn1"] = {
                            "src": self.getFieldValue(self.getFieldValue(self._btnSwipeableAction1, "btnImage")[selectedType])
                        };

                        text = self.getFieldValue(self._btnSwipeableAction2, "text");
                        text = self.getFieldValue(text[selectedType]);
                        flxskin = self.getFieldValue(self.getFieldValue(self._btnSwipeableAction2, "skin")[selectedType]);

                        data[i]["flxSwipeBtn2"] = {
                            "skin": flxskin,
                            "width": self.getFieldValue(self.getFieldValue(self._btnSwipeableAction2, "width")[selectedType]),
                            "onClick": function() {
                                var RowData = self.rowData;
                                RowData.id = self.getFieldValue(self._btnSwipeableAction2, "id")[selectedType];
                                self.swipeActionBtn(RowData);
                            }
                        };
                        if (!this.isEmptyNullUndefined(flxskin) && self.getFieldValue(self._btnSwipeableAction2, "entitlement_action")[selectedType]) {
                            data[i]["flxSwipeBtn2"]["isVisible"] = true;
                        } else {
                            data[i]["flxSwipeBtn2"]["isVisible"] = false;
                        }
                        data[i]["lblSwipeBtn2Text"] = {
                            "text": text,
                            "skin": self.getFieldValue(self.getFieldValue(self._btnSwipeableAction2, "txtSkin")[selectedType])
                        };
                        data[i]["imgSwipeBtn2"] = {
                            "src": self.getFieldValue(self.getFieldValue(self._btnSwipeableAction2, "btnImage")[selectedType])
                        };

                        text = self.getFieldValue(self._btnSwipeableAction3, "text");
                        text = self.getFieldValue(text[selectedType]);
                        flxskin = self.getFieldValue(self.getFieldValue(self._btnSwipeableAction3, "skin")[selectedType]);

                        data[i]["flxSwipeBtn3"] = {
                            "skin": flxskin,
                            "width": self.getFieldValue(self.getFieldValue(self._btnSwipeableAction3, "width")[selectedType]),
                            "onClick": function() {
                                var RowData = self.rowData;
                                RowData.id = self.getFieldValue(self._btnSwipeableAction3, "id")[selectedType];
                                self.swipeActionBtn(RowData);
                            }
                        };
                        if (!this.isEmptyNullUndefined(flxskin) && self.getFieldValue(self._btnSwipeableAction3, "entitlement_action")[selectedType]) {
                            data[i]["flxSwipeBtn3"]["isVisible"] = true;
                        } else {
                            data[i]["flxSwipeBtn3"]["isVisible"] = false;
                        }
                        data[i]["lblSwipeBtn3Text"] = {
                            "text": text,
                            "skin": self.getFieldValue(self.getFieldValue(self._btnSwipeableAction3, "txtSkin")[selectedType])
                        };
                        data[i]["imgSwipeBtn3"] = {
                            "src": self.getFieldValue(self.getFieldValue(self._btnSwipeableAction3, "btnImage")[selectedType])
                        };
                        data[i]["flxRow"] = "flxRow";
                        data[i]["flxRow"] = {
                            "skin": this.skins.ROW_SKIN
                        };
                        data[i]["curntView"] = 1;


                    }
                return data;
            } catch (err) {
                var errorObj = {
                    "errorInfo": "Error in modifySegmentData",
                    "errorLevel": "Configuration",
                    "error": err
                };
                self.onError(errorObj);
            }
        },
        /**
         * Component getTransactionDetails
         * Returns the data of selected row
         */
        getTransactionsDetails: function() {
            var self = this;
            try {
                var selectedRow = this.view.segTransactionsList.selectedRowItems;

                this.getTransactionDetails(selectedRow[0]);
            } catch (err) {
                var errorObj = {
                    "errorInfo": "Error in getTransactionsDetails",
                    "errorLevel": "Configuration",
                    "error": err
                };
                self.onError(errorObj);
            }
        },
        /**
         * Component onscrollEnd
         * Responsible to scroll and set the data and UI to the segment.
         */
        onscrollEnd: function() {
            var self = this;
             if(this.context["selectedType"] === kony.i18n.getLocalizedString("kony.mb.accdetails.blockedFunds"))
            return;
             if(this.backupData.length==0)  return;
            try {            
              if(this._serviceType=="search") {
                this.renderPagination=1;
                this.serviceOffset++;
                this.getTransactionList();
              }
              else            
                {
                this.renderPagination=1;
                this.searchResult = false;
                this.cacheUtils.offset = this.cacheUtils.offset + this._recordsPerPage;
                this.getCacheData();
            }
            } catch (err) {
                var errorObj = {
                    "errorInfo": "Error in onscrollEnd",
                    "errorLevel": "Configuration",
                    "error": err
                };
                self.onError(errorObj);
            }
        },
		getParsedValue: function(fieldValue) {
			var i18ntext = kony.i18n.getLocalizedString(fieldValue.substring(fieldValue.indexOf("${i18n{")+7, fieldValue.length-2));
			fieldValue = i18ntext;
			return fieldValue;
		},
        /**
         * Component setTransactionsList
         * Responsible to set the data and UI to the segment.
         */
        setTransactionsList: function(response) {
            var self = this;
            try {
                var data = [];
                var updatedResponse = response;
                var olddatalength = this.backupData.length;
                if (!this.searchResult) {

                    response = this.modifySegmentData(response);
                    /*if (Object.keys(this.backupData).length) {
                      response = this.backupData.concat(response);
                    }
                    this.backupData = response;*/
                  
                  this.backupData = this.backupData.concat(response);
                } else {
                    this.backupData = response;
                    response = this.modifySegmentData(JSON.parse(JSON.stringify(this.backupData)));
                }
                if (!(this.context["accountType"] === "Loan" && this.context["transactionType"] === "All")) {
                    var transactions = this.groupResponseData(response, this._segregationDecider[this.context["transactionType"]]);
                  transactions = Object.keys(transactions).reduce((c, k) => (c[k.toUpperCase().trim()] = transactions[k], c), {});
                    var keys = Object.keys(transactions);
                  if(keys.length > 0) {
                  keys = String.prototype.toUpperCase.apply(keys).split(",");
                  }
                    if (keys.length !== 0)
                        for (key = 0; key < keys.length; key++)
                            for (var type in this.getsegregationTypes) {
                            if (this.getsegregationTypes[type].value.toUpperCase() === keys[key].toUpperCase()) {
                                var textFromI18n = "";   
                                switch(type){
                                    case "ST1": textFromI18n = kony.i18n.getLocalizedString("i18n.accounts.blockedFunds"); break;
                                    case "ST2": textFromI18n = kony.i18n.getLocalizedString("i18n.bulkWire.pendingTransactions"); break;
                                    case "ST3": textFromI18n = kony.i18n.getLocalizedString("i18n.AccountSummary.overdueInstallments"); break;
                                    case "ST4": textFromI18n = kony.i18n.getLocalizedString("i18n.AccountSummary.paidInstallments"); break;
                                    case "ST5": textFromI18n = kony.i18n.getLocalizedString("kony.mb.accountdetails.postedTransactions"); break;
                                   }
                                    data[this.getsegregationTypes[type].weight - 1] = ([{
                                            "lblHeaderName": {
											"text": (this.context["accountType"] !== "Loan") ? textFromI18n : textFromI18n + "  (" + transactions[keys[key]].length + ")",

                                              "skin": this.skins.GROUP_HEADER_LABEL
                                            },
                                            "imgChevron": this.icons.GROUP_EXPAND_ICON,
                                            "flxTransactionsHeader": {
                                                "skin": this.skins.GROUP_HEADER_BACKGROUND
                                            },
                                            "flxUpShadow": {
                                                "skin": this.skins.SEGMENT_SHADOW
                                            }
                                        },
                                        transactions[keys[key]]
                                    ]);
                            }
                            }

                    else {
                        var textFromI18n = kony.i18n.getLocalizedString("i18n.bulkWire.pendingTransactions");
                         if(kony.application.getCurrentForm().id==="frmAdvanceSearchResults")
                        textFromI18n = kony.i18n.getLocalizedString("kony.mb.accountdetails.postedTransactions");
                        data[0] = [{
                                "lblHeaderName": {
                                    "text": textFromI18n,
                                   // "text": this.getsegregationTypes["ST2"]["displayText"],
                                    "skin": this.skins.GROUP_HEADER_LABEL
                                },
                                "imgChevron": this.icons.GROUP_COLLAPSE_ICON,
                                "flxTransactionsHeader": {
                                    "skin": this.skins.GROUP_HEADER_BACKGROUND,
                                  	"isVisible": false
                                },
                                "flxUpShadow": {
                                    "skin": this.skins.SEGMENT_SHADOW
                                }
                            },
                            [{
                                "flxNoRecords": {
                                    "isVisible": true
                                },
                               "flxSwipeContainer": {
                                 "isVisible": false
                               },
                                "lblNoRecords": kony.i18n.getLocalizedString(this._noRecordsAvailable),
//                                 "lblNoRecords": "No Records Available",
                                "imgIcon": this.icons.NO_RECORDS_ICON
                            }]
                        ];
                    }
                } else {
                    if (response !== undefined && response.length > 0)
                        data[0] = [{
                            "lblHeaderName": {
                                "text": kony.i18n.getLocalizedString("kony.mb.achtransactions.AllTransactions"),
                                //"text": "All Transactions  " + "(" + this.loanSchedule.Transactions.length + ")", // changing response to loanSchedule for counting the No of Records in Loan Accounts - ARB-33623
                                "skin": this.skins.GROUP_HEADER_LABEL
                            },
                            "imgChevron": this.icons.GROUP_EXPAND_ICON,
                            "flxTransactionsHeader": {
                                "skin": this.skins.GROUP_HEADER_BACKGROUND
                            },
                            "flxUpShadow": {
                                "skin": this.skins.SEGMENT_SHADOW
                            }
                        }, response];
                    else
                        data[0] = [{
                                "lblHeaderName": {
                                    //"text":kony.i18n.getLocalizedString("kony.mb.achtransactions.AllTransactions"),
                                    "text": "All Transactions",
                                    "skin": this.skins.GROUP_HEADER_LABEL
                                },
                                "imgChevron": this.icons.GROUP_COLLAPSE_ICON,
                                "flxTransactionsHeader": {
                                    "skin": this.skins.GROUP_HEADER_BACKGROUND,
                                  "isVisible": false
                                },
                                "flxUpShadow": {
                                    "skin": this.skins.SEGMENT_SHADOW
                                }
                            },
                            [{
                                "flxNoRecords": {
                                    "isVisible": true
                                },
                              "flxSwipeContainer": {
                                 "isVisible": false
                               },
                                "lblNoRecords": kony.i18n.getLocalizedString(this._noRecordsAvailable),
//                                 "lblNoRecords": "No Records Available",
                                "imgIcon": this.icons.NO_RECORDS_ICON
                            }]
                        ];
                }

                dataMapping = {
                    "flxTransactionsHeader": "flxTransactionsHeader",
                    "flxUpShadow": "flxUpShadow",
                    "flxIcon1": "flxIcon1",
                    "flxIcon2": "flxIcon2",
                    "flxIcon3": "flxIcon3",
                    "flxIcon4": "flxIcon4",
                    "imgIcon1": "imgIcon1",
                    "imgIcon2": "imgIcon2",
                    "imgIcon3": "imgIcon3",
                    "imgIcon4": "imgIcon4",
                    "lblHeaderName": "lblHeaderName",
                    "lblField1": "lblField1",
                    "flxSwipeContainer": "flxSwipeContainer",
                    "lblField2": "lblField2",
                    "lblField3": "lblField3",
                    "lblField4": "lblField4",
                    "flxGroup1": "flxGroup1",
                    "flxGroup2": "flxGroup2",
                    "flxGroup3": "flxGroup3",
                    "flxGroup4": "flxGroup4",
                    "lblCount": "lblCount",
                    "flxSeparator": "flxSeparator",
                    "transactionId": "transactionId",
                    "flxNoRecords": "flxNoRecords",
                    "imgChevron": "imgChevron",
                    "lblNoRecords": "lblNoRecords",
                    "imgIcon": "imgIcon",
                    "curntView": "curntView",
                    "flxRow": "flxRow",
                    "imgSwipeBtn1": "imgSwipeBtn1",
                    "imgSwipeBtn2": "imgSwipeBtn2",
                    "imgSwipeBtn3": "imgSwipeBtn3",
                    "lblSwipeBtn1Text": "lblSwipeBtn1Text",
                    "lblSwipeBtn3Text": "lblSwipeBtn3Text",
                    "lblSwipeBtn2Text": "lblSwipeBtn2Text",
                    "flxSwipeBtn1": "flxSwipeBtn1",
                    "flxSwipeBtn2": "flxSwipeBtn2",
                    "flxSwipeBtn3": "flxSwipeBtn3"
                    

                };
                data = data.filter(function(x) {
                    return x !== null;
                });
                this.view.segTransactionsList.widgetDataMap = dataMapping;
                if (this.renderPagination > 0) {
                  var segData = this.view.segTransactionsList.data;
                  for (var latestRecords = 0; latestRecords < data.length; latestRecords++) {
                    for (var previousRecords = 0; previousRecords < segData.length; previousRecords++) {
                      if (data[latestRecords][0].lblHeaderName.text.includes('All Transactions')) {
                        if (data[latestRecords][0].lblHeaderName.text.includes('All Transactions') == segData[previousRecords][0].lblHeaderName.text.includes('All Transactions')) {
                          var newData = json = data[latestRecords][1].reduce((json, value, key) => {
                            json[key] = value;
                            this.view.segTransactionsList.addDataAt(value, segData[previousRecords][1].length, previousRecords);
                            return json;
                          }, {});
                          data.splice(latestRecords, 1)
                          break;
                        }
                      } else {
                        if (data[latestRecords][0].lblHeaderName.text == segData[previousRecords][0].lblHeaderName.text) {
                          var newData = json = data[latestRecords][1].reduce((json, value, key) => { json[key] = value;
                                                                                                    this.view.segTransactionsList.addDataAt(value, segData[previousRecords][1].length, previousRecords); return json; }, {});
                          data.splice(latestRecords, 1)
                          break;
                        }
                      }
                    }
                    if(data.length>0){
                      this.view.segTransactionsList.addAll(data);
                      break;
                    }
                  }
                }
              else{
                this.view.segTransactionsList.setData(data);
              }
                this.view.segTransactionsList.setVisibility(true);

                this.view.forceLayout();
                this.onRequestEnd();
            } catch (err) {
                this.onRequestEnd();
                var errorObj = {
                    "errorInfo": "Error in setTransactionsList",
                    "errorLevel": "Configuration",
                    "error": err
                };
                self.onError(errorObj);
            }
        },
        /**
         * Component set Cache data
         * To set data to the cache from service response
         */
        setCacheData: function(data) {
            var self = this;
            try {
                this.cacheUtils.setData(data);
            } catch (err) {
                var errorObj = {
                    "errorInfo": "Error in set cache data",
                    "errorLevel": "Configuration",
                    "error": err
                };
                self.onError(errorObj);
            }
        },
        /**
         * Component get Cache data
         * To get data to the cache from service response
         */
        getCacheData: function() {
            var self = this;
            try {
                //this.setCacheContext();
                this.cacheUtils.applyPagination(this.cacheUtils.offset, this._recordsPerPage);
            } catch (err) {
                var errorObj = {
                    "errorInfo": "Error in set cache data",
                    "errorLevel": "Configuration",
                    "error": err
                };
                self.onError(errorObj);
            }
        },

        /**     * Component processResponse
         * To generate the JSONpath for service response
         * backendResponse{JSONObject} - response received from the backend
         * unicode{string}             - unique code to identify the service response in case of multiple service calls.
         */
        processResponse: function(response) {
            var self = this;
            try {
              if(this.isEmptyNullUndefined(response[0]))
                {
                       if(this.backupData.length==0)
                  this.setTransactionsList([]);
                       else
                       {
                        this.backupData=[];
                         self.onRequestEnd();
                       }

                }
              else
                {
                  this.setCacheData(response);
                }
              //this.onRequestEnd();
            } catch (err) {
                var errorObj = {
                    "errorInfo": "Error in processResponse",
                    "errorLevel": "Configuration",
                    "error": err
                };
                self.onError(errorObj);
            }
        },
      onError: function() {
        var data=[];
        this.onRequestEnd();
        data[0] = [{
          "lblHeaderName": {
            "text": "Error",
            "skin": this.skins.GROUP_HEADER_LABEL,
          },
          "flxTransactionsHeader": {
            "skin": this.skins.GROUP_HEADER_BACKGROUND,
            "isVisible":true
          },
          "flxUpShadow": {
            "skin": this.skins.SEGMENT_SHADOW
          }
        },
                   [{
                     "flxNoRecords": {
                       "isVisible": true
                     },
                     "flxSwipeContainer": {
                       "isVisible": false
                     },
                     "lblNoRecords": "Something went wrong! please try again later",
                     "imgIcon": this.icons.NO_RECORDS_ICON
                   }]
                  ];
                   
        var dataMapping = {
          "flxTransactionsHeader":"flxTransactionsHeader",
          "lblHeaderName":"lblHeaderName",
          "flxSwipeContainer": "flxSwipeContainer",
          "flxNoRecords": "flxNoRecords",
          "lblNoRecords": "lblNoRecords",
          "imgIcon": "imgIcon",
        };
        this.view.segTransactionsList.widgetDataMap = dataMapping;
        this.view.segTransactionsList.setVisibility(true);
        this.view.segTransactionsList.setData(data);
      },
        /**
         * Component printJSONValidator
         * prints the invalid JSON field and its syntaxError
         */
        printJSONValidator: function() {
            var self = this;
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
                self.onError(errorObj);
            }
        },
        /**
         * Component makeLineDotted
         * modify the lenghty string as dotted
         * string {string} - should be a string
         * @return : {string} - corresponding dotted line
         */
        makeLineDotted: function(string) {
            var self = this;
            try {
                string = String(string);
                if (string.length < 20)
                    return string;
                else
                    return (string.substring(0, 20) + '...');
            } catch (err) {
                var errorObj = {
                    "errorInfo": "Error in makeLineDotted",
                    "errorLevel": "Configuration",
                    "error": err
                };
                self.onError(errorObj);
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
                if (value[this.context["accountType"]]) {
                    value = value[this.context["accountType"]];
                }
                if (!this.isEmptyNullUndefined(value) && !this.isEmptyNullUndefined(key)) {
                    value = value[key];
                }
                if (value !== null && value !== "" && value !== undefined) {
                    if (typeof(value) === "string")
                        return this.getProcessedText(value);
                    else {
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
            var self = this;
            try {
                this.context = context;
                this.parserUtilsManager.setContext(this.context);
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
         * Component setCriteria
         * Update the criteria based on accountType ans filter
         * criteria {string} - value collected from exposed contract
         */
        setCriteria:function(criteria, keyValue){
      var self = this;
      try
      {
        var criteriaObject = JSON.parse(this._criteria);
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
        if(keyValue === "Transactions") {
        this.criteriaObjectValue = criteriaObject; 
        } else if(keyValue === "Blocked Funds") {
        this.blockedCriteriaValue = criteriaObject;
        }
      }
      catch(err)
      {
        var errorObj =
            {
              "errorInfo" : "Error in setting the criteria",
              "errorLevel" : "Configuration",
              "error": err
            };
        self.onError(errorObj);
      }
    },
        /**
         * Component getCriteria
         * Parse the criteria from configuration
         * @return : {JSONObject} - jsonvalue for criteria
         */
        getCriteria: function(key) {
            var self = this;
            try {
              if(key === "Transactions") {
                 if(this._serviceType=="search")
                  {
                    this.criteriaObjectValue.offset=this.serviceOffset;
                    var searchData = self.context;
                    this.criteriaObjectValue.searchMinAmount= (self.isEmptyNullUndefined(searchData.searchMinAmount) === false ? searchData.searchMinAmount : "");
                    this.criteriaObjectValue.searchMaxAmount= (self.isEmptyNullUndefined(searchData.searchMaxAmount) === false ? searchData.searchMaxAmount : "");
                    this.criteriaObjectValue.searchStartDate= (self.isEmptyNullUndefined(searchData.searchStartDate) === false ? searchData.searchStartDate : "");
                    this.criteriaObjectValue.searchEndDate= (self.isEmptyNullUndefined(searchData.searchEndDate) === false ? searchData.searchEndDate : "");
                    this.criteriaObjectValue.searchDescription= (self.isEmptyNullUndefined(searchData.searchValue) === false ? searchData.searchValue : "");
                    this.criteriaObjectValue.searchDateRange= (self.isEmptyNullUndefined(searchData.searchDateRange) === false ? searchData.searchDateRange : "");
                    this.criteriaObjectValue.transactionType = (self.isEmptyNullUndefined(searchData.searchTransactionType) === false ? searchData.searchTransactionType : "ALL");
                  }
                if(self._backendTransLimit && !(isNaN(self.getFieldValue(self._transactionCount)))){
                  this.criteriaObjectValue.limit = parseInt(self.getFieldValue(self._transactionCount));        
                }
                return this.criteriaObjectValue;
              } else if(key === "Blocked Funds") {
                if(self._backendBlockedLimit && !(isNaN(self.getFieldValue(self._blockedCount)))){
                  this.blockedCriteriaValue.limit = parseInt(self.getFieldValue(self._blockedCount));
                }
                 if (this._serviceType == "search") {
                        this.blockedCriteriaValue.offset = this.serviceOffset;
                        var searchData = self.context;

                        this.blockedCriteriaValue.lockedEventId = (self.isEmptyNullUndefined(searchData.lockedEventId) === false ? searchData.lockedEventId : "");

                          this.blockedCriteriaValue.searchStartDate = (self.isEmptyNullUndefined(searchData.searchStartDate) === false ? searchData.searchStartDate : "");
                        this.blockedCriteriaValue.searchEndDate = (self.isEmptyNullUndefined(searchData.searchEndDate) === false ? searchData.searchEndDate : "");
                        this.blockedCriteriaValue.lockReason = (self.isEmptyNullUndefined(searchData.searchValue) === false ? searchData.searchValue : "");
                        this.blockedCriteriaValue.searchDateRange = (self.isEmptyNullUndefined(searchData.searchDateRange) === false ? searchData.searchDateRange : "");
                        this.blockedCriteriaValue.transactionType = (self.isEmptyNullUndefined(searchData.searchTransactionType) === false ? searchData.searchTransactionType : "ALL");
                      }

                return this.blockedCriteriaValue;
              }
            } catch (err) {
                var errorObj = {
                    "errorInfo": "Error in returning criteria",
                    "errorLevel": "Configuration",
                    "error": err
                };
                self.onError(errorObj);
            }
            return "";
        },
        /**
         * Component getAmountValueSkin
         * get the corresponding skin value from the amount skin given in contracts
         * amount {number} - should be a number
         * @return : {string} - corresponding color of amount as skin
         */
        getAmountValueSkin: function(amount) {
            var self = this;
            amount = String(amount);
            amount = Number(amount.replace(/[^0-9\.-]+/g, ""));
            try {
                var data = JSON.parse(this.skins.AMOUNT);
                for (i = 0; i < data.skin.length; i++) {
                    if ((data.skin[i].min === undefined) && (amount < data.skin[i].max))
                        return data.skin[i].skin;
                    else if ((data.skin[i].max === undefined) && (amount > data.skin[i].min))
                        return data.skin[i].skin;
                    else if (amount >= data.skin[i].min && amount <= data.skin[i].max)
                        return data.skin[i].skin;

                }
            } catch (err) {
                var errorObj = {
                    "errorInfo": "Error in getAmountValueSkin",
                    "errorLevel": "Configuration",
                    "error": err
                };
                self.onError(errorObj);
            }
        },
        /**
         * Component groupResponseData
         * group the service response by status decider
         * data {object} - should be array of objects
         * key {string} - should be a string 
         * @return : {boolean} - grouped response datas will be passed
         */
        groupResponseData: function(data, key) {
            var self = this;
            try {
                if (data !== undefined)
                    return data.reduce(function(value, obj) {
                        (value[obj[key]] = value[obj[key]] || []).push(obj);
                        return value;
                    }, {});
                else return {};
            } catch (err) {
                var errorObj = {
                    "errorInfo": "Error in setting groupResponseData",
                    "errorLevel": "Configuration",
                    "error": err
                };
                self.onError(errorObj);
            }
        },
        /**
         * Component segregatedValues
         * Grouping the values based on the segregationTypes
         */
        getSegregatedValues: function() {
            var self = this;
            try {
                var keys = Object.keys(this.getsegregationTypes);
                for (i = 0; i < keys.length; i++)
                    this.segregatedValues[this.getsegregationTypes[keys[i]]["value"]] = keys[i];
              this.segregatedValues = Object.keys(this.segregatedValues).reduce((c, k) => (c[k.toUpperCase().trim()] = this.segregatedValues[k], c), {});
            } catch (err) {
                var errorObj = {
                    "errorInfo": "Error in setting the segregatedValues",
                    "errorLevel": "Configuration",
                    "error": err
                };
                self.onError(errorObj);
            }
        },


        /**
         * Component swipeRowOption
         * swipe the segment row and show options
         * widgetInfo {object} - this will be details about the segment
         * swipeInfo {object} - this will be swipe row information like swiped left or right
         * @return : set the swipe properties with animation
         */

        swipeRowOption: function(widgetInfo, swipeInfo) {
            var self = this;
            try {
                var needToAnimate = false;
                var curRowData = this.view.segTransactionsList.data[swipeInfo.section][1][swipeInfo.row];
                self.rowData = curRowData;
                var currentView = curRowData.curntView;
                var swipeDirec = swipeInfo.swipeDirection;
                var count = 0;
                //Reset swiped row 
                   if(self.rowData.flxNoRecords && self.rowData.flxNoRecords.isVisible==true)
                    return;
                if (this.lastRow.row === undefined) {
                    this.lastRow["row"] = swipeInfo;
                    this.lastRow["data"] = curRowData;
                } else {
                    var lastRowData = this.lastRow.data;
                    lastRowData.curntView = 1;
                    lastRowData.flxRow = {
                        left: "0%"
                    };

                    this.view.segTransactionsList.setDataAt(lastRowData, this.lastRow.row.row, this.lastRow.row.section);
                    if (swipeDirec == 1) {
                        this.lastRow["row"] = swipeInfo;
                        this.lastRow["data"] = curRowData;
                    }
                }

                var fstStepConfig = {
                    "left": "-20%",
                    "stepConfig": {
                        "timingFunction": kony.anim.EASE
                    }
                };

                var lstStepConfig = {
                    "left": "-20%",
                    "stepConfig": {
                        "timingFunction": kony.anim.EASE
                    }
                };
                //Count the number of buttons displaying in the row

                if (curRowData.flxSwipeBtn1.isVisible) {
                    count++;
                }
                if (curRowData.flxSwipeBtn2.isVisible) {
                    count++;
                }
                if (curRowData.flxSwipeBtn3.isVisible) {
                    count++;
                }
                //Based on the swiped direction setting the with of the row
                if (swipeDirec == 1 && currentView == 1) {
                    fstStepConfig.left = "-20%";
                    lstStepConfig.left = "-40%";
                    curRowData.curntView = 2;
                    if (count === 1) {
                        curRowData["flxRow"] = {
                            left: "-70dp"
                        };
                    }
                    if (count === 2) {
                        curRowData["flxRow"] = {
                            left: "-140dp"
                        };
                    }
                    if (count === 3) {
                        curRowData["flxRow"] = {
                            left: "-210dp"
                        };
                    }
                    needToAnimate = true;
                } else if (swipeDirec == 2 && currentView == 2) {
                    fstStepConfig.left = "-40%";
                    lstStepConfig.left = "-20%";
                    curRowData["flxRow"] = {
                        left: "0%"
                    };
                    curRowData.curntView = 1;
                    needToAnimate = true;
                }

                //Animate the row 
                if (needToAnimate) {
                    this.view.segTransactionsList.animateRows({
                        rows: [{
                            sectionIndex: swipeInfo.section,
                            rowIndex: swipeInfo.row
                        }],
                        widgets: ["flxRow"],
                        animation: {
                            definition: kony.ui.createAnimation({
                                "0": fstStepConfig,
                                "100": lstStepConfig
                            }),
                            config: {
                                "delay": 0,
                                "iterationCount": 1,
                                "fillMode": kony.anim.FILL_MODE_FORWARDS,
                                "duration": 0.5,
                                "direction": kony.anim.DIRECTION_ALTERNATE
                            },
                            callbacks: {
                                animationEnd: function() {
                                    this.view.segTransactionsList.setDataAt(curRowData, swipeInfo.row, swipeInfo.section);
                                }.bind(this)
                            }
                        }
                    });
                }


            } catch (exc) {
                alert("exception in swipeHandler!!!!");
            }
        },
        /**
     * Component constructSearchCriteriaForTransactions
     * This method is used to create the transactions criteria for advanced search
     */
    constructSearchCriteriaForTransactions: function(commandObj){
        var searchCriteria = [];
        if(commandObj.searchTransactionType){
        if((commandObj.searchTransactionType != "Both") && (commandObj.searchTransactionType != "All")){
            var criteriaObject = {
              "fields" : ["transactionType"],
              "value" : commandObj.searchTransactionType,
              "type" : "completeMatch",
            };
            searchCriteria.push(criteriaObject);
        }
        }
        if(commandObj.searchDescription){ 
          var criteriaObject = {
            "fields" : ["description","transactionsNotes","transactionId"],
            "value" : commandObj.searchDescription,
            "type" : "substringMatch",
          };
          searchCriteria.push(criteriaObject);
        }
        if(commandObj.searchMinAmount && commandObj.searchMaxAmount && !isNaN(commandObj.searchMinAmount) && !isNaN(commandObj.searchMaxAmount)){
          var criteriaObject = {
            "fields" : ["amount"],
            "type" : "rangeBetween",
            "minimum" : commandObj.searchMinAmount,
            "maximum" : commandObj.searchMaxAmount,
          };
          searchCriteria.push(criteriaObject);
        }
        if(commandObj.searchStartDate && commandObj.searchEndDate){
          var criteriaObject = {
            "fields" : ["transactionDate"],
            "type" : "dateBetween",
            "minimum" : commandObj.searchStartDate,
            "maximum" : commandObj.searchEndDate,
          };
          searchCriteria.push(criteriaObject);
        }
        if (commandObj.fromCheckNumber){
            if (commandObj.fromCheckNumber == commandObj.toCheckNumber) {
                var criteriaObject = {
                    "fields": ["checkNumber"],
                    "type": "completeMatch",
                    "value": commandObj.fromCheckNumber,
                };
            } else {
                var criteriaObject = {
                    "fields": ["checkNumber"],
                    "type": "rangeBetween",
                    "minimum": commandObj.fromCheckNumber,
                    "maximum": commandObj.toCheckNumber,
                };
            }
            searchCriteria.push(criteriaObject);
        }
        return searchCriteria;
      },
/**
     * Component constructSearchCriteriaForBF
     * This method is used to create the blocked funds criteria for advanced search
     */
      constructSearchCriteriaForBF : function(commandObj){
        var searchCriteria = [];
        if(commandObj.lockedEventId){
          var criteriaObject = {
            "fields" : ["lockedEventId"],
            "value" : commandObj.lockedEventId,
            "type" : "completeMatch",
          };
          searchCriteria.push(criteriaObject);
        }
        if(commandObj.searchStartDate && commandObj.searchEndDate){
          var criteriaObject = {
            "fields" : ["fromDate","toDate"],
            "type" : "dateBetween",
            "minimum" : commandObj.searchStartDate,
            "maximum" : commandObj.searchEndDate,
          };
          searchCriteria.push(criteriaObject);
        }
        if(commandObj.lockReason){
          var criteriaObject = {
            "fields" : ["lockReason"],
            "value" : commandObj.lockReason,
            "type" : "substringMatch",
          };
          searchCriteria.push(criteriaObject);
        }
        return searchCriteria;
      },

      //new code
      startBothSearch: function(searchData) {
            var scopeObj = this;
            var navMan = applicationManager.getNavigationManager();
            var getTransactionList = navMan.getCustomInfo("frmAdvanceSearchResults");
			var getTransactionListBF=navMan.getCustomInfo("frmAdvanceSearchResults_Bf");
            scopeObj.renderPagination = 0;
            //this.onRequestStart();
            //try {
            var commandObj = {
                accountNumber: (scopeObj.isEmptyNullUndefined(searchData.accountID) === false ? searchData.accountID : ""),
				lockedEventId: (scopeObj.isEmptyNullUndefined(searchData.lockedEventId) === false ? searchData.lockedEventId : ""),
                lockReason: (scopeObj.isEmptyNullUndefined(searchData.searchValue) === false ? searchData.searchValue : ""),
                searchStartDate: (scopeObj.isEmptyNullUndefined(searchData.searchStartDate) === false ? searchData.searchStartDate : ""),
                searchEndDate: (scopeObj.isEmptyNullUndefined(searchData.searchEndDate) === false ? searchData.searchEndDate : ""),
				searchTransactionType: (scopeObj.isEmptyNullUndefined(searchData.searchTransactionType) === false ? searchData.searchTransactionType : "Both"),
                searchDescription: (scopeObj.isEmptyNullUndefined(searchData.searchValue) === false ? searchData.searchValue : ""),
                searchMinAmount: (scopeObj.isEmptyNullUndefined(searchData.searchMinAmount) === false ? searchData.searchMinAmount : ""),
                searchMaxAmount: (scopeObj.isEmptyNullUndefined(searchData.searchMaxAmount) === false ? searchData.searchMaxAmount : ""),
          //      searchStartDate: (scopeObj.isEmptyNullUndefined(searchData.searchStartDate) === false ? searchData.searchStartDate : ""),
              //  searchEndDate: (scopeObj.isEmptyNullUndefined(searchData.searchEndDate) === false ? searchData.searchEndDate : ""),
                isScheduled: 0,
                fromCheckNumber: (scopeObj.isEmptyNullUndefined(searchData.fromCheckNumber) === false ? searchData.fromCheckNumber : ""),
                toCheckNumber: (scopeObj.isEmptyNullUndefined(searchData.toCheckNumber) === false ? searchData.toCheckNumber : ""),
                searchType: (scopeObj.isEmptyNullUndefined(searchData.searchType) === false ? searchData.searchType : ""),
            };
            var criteria = kony.mvc.Expression.and(kony.mvc.Expression.eq("searchTransactionType", commandObj.searchTransactionType), kony.mvc.Expression.eq("searchDescription", commandObj.searchDescription), kony.mvc.Expression.eq("searchMinAmount", commandObj.searchMinAmount), kony.mvc.Expression.eq("searchMaxAmount", commandObj.searchMaxAmount), kony.mvc.Expression.eq("searchStartDate", commandObj.searchStartDate), kony.mvc.Expression.eq("searchEndDate", commandObj.searchEndDate), kony.mvc.Expression.eq("fromCheckNumber", commandObj.fromCheckNumber), kony.mvc.Expression.eq("toCheckNumber", commandObj.toCheckNumber), kony.mvc.Expression.eq("accountNumber", commandObj.accountNumber), kony.mvc.Expression.eq("isScheduled", commandObj.isScheduled), kony.mvc.Expression.eq("searchType", "Search"));
            //this.transactionListDAO.fetchTransactionsByCriteria(criteria, this.processSearchData, this.onError);
            var transactions = getTransactionList.Transactions;
            if (searchData.accountType != 'Loan'){
                var transactionsBF = getTransactionListBF.Blockedfunds;
            }
			//var totalTransactions=transactions.concat(transactionsBF);
            if (transactions === undefined || transactions === null) {
                transactions = [];
            }
            if (transactionsBF === undefined || transactionsBF === null) {
                transactionsBF = [];
            }
            var criteriaForTransactions = this.constructSearchCriteriaForTransactions(commandObj);
            var criteriaForBF = this.constructSearchCriteriaForBF(commandObj);
            var searchResultsForTransactions = cacheUtils.advancedSearch(transactions, criteriaForTransactions);
            var searchResultsForBF=cacheUtils.advancedSearch(transactionsBF, criteriaForBF);
            var searchResults=searchResultsForTransactions.concat(searchResultsForBF);
            this.processSearchData(searchResults);
            //             } catch (err) {
            //                 this.onRequestEnd();
            //                 var errorObj = {
            //                     "errorInfo": "Error in the creating search criteria and invoking search service call",
            //                     "errorLevel": "Business",
            //                     "error": err
            //                 };
            //                 scopeObj.onError(errorObj);
            //             }
        },
        /**
         * Component startSearch
         * process the search value based on given key value
         * commandObj {object} - this will be search key
         * @return : set the values to segment
         */
        startSearch: function(searchData) {
            var scopeObj = this;
            var navMan = applicationManager.getNavigationManager();
            var getTransactionList=navMan.getCustomInfo("frmAdvanceSearchResults");
            scopeObj.renderPagination=0;
            //this.onRequestStart();
            //try {
                var commandObj = {
                    searchTransactionType: (scopeObj.isEmptyNullUndefined(searchData.searchTransactionType) === false ? searchData.searchTransactionType : "Both"),
                    searchDescription: (scopeObj.isEmptyNullUndefined(searchData.searchValue) === false ? searchData.searchValue : ""),
                    searchMinAmount: (scopeObj.isEmptyNullUndefined(searchData.searchMinAmount) === false ? searchData.searchMinAmount : ""),
                    searchMaxAmount: (scopeObj.isEmptyNullUndefined(searchData.searchMaxAmount) === false ? searchData.searchMaxAmount : ""),
                    searchStartDate: (scopeObj.isEmptyNullUndefined(searchData.searchStartDate) === false ? searchData.searchStartDate : ""),
                    searchEndDate:(scopeObj.isEmptyNullUndefined(searchData.searchEndDate) === false ? searchData.searchEndDate : ""),
                    isScheduled: 0,
                    fromCheckNumber: (scopeObj.isEmptyNullUndefined(searchData.fromCheckNumber) === false ? searchData.fromCheckNumber : ""),
                    toCheckNumber: (scopeObj.isEmptyNullUndefined(searchData.toCheckNumber) === false ? searchData.toCheckNumber : ""),
                    accountNumber: (scopeObj.isEmptyNullUndefined(searchData.accountID) === false ? searchData.accountID : ""),
                    searchType: (scopeObj.isEmptyNullUndefined(searchData.searchType) === false ? searchData.searchType : ""),
                };
                var criteria = kony.mvc.Expression.and(kony.mvc.Expression.eq("searchTransactionType", commandObj.searchTransactionType), kony.mvc.Expression.eq("searchDescription", commandObj.searchDescription), kony.mvc.Expression.eq("searchMinAmount", commandObj.searchMinAmount), kony.mvc.Expression.eq("searchMaxAmount", commandObj.searchMaxAmount), kony.mvc.Expression.eq("searchStartDate", commandObj.searchStartDate), kony.mvc.Expression.eq("searchEndDate", commandObj.searchEndDate), kony.mvc.Expression.eq("fromCheckNumber", commandObj.fromCheckNumber), kony.mvc.Expression.eq("toCheckNumber", commandObj.toCheckNumber), kony.mvc.Expression.eq("accountNumber", commandObj.accountNumber), kony.mvc.Expression.eq("isScheduled", commandObj.isScheduled), kony.mvc.Expression.eq("searchType", "Search"));
                //this.transactionListDAO.fetchTransactionsByCriteria(criteria, this.processSearchData, this.onError);
                var transactions = getTransactionList.Transactions;
                if(transactions === undefined || transactions === null){
                  transactions=[];
                }
              var criteria = this.constructSearchCriteriaForTransactions(commandObj);
              var searchResults = cacheUtils.advancedSearch(transactions,criteria);
              this.processSearchData(searchResults);
//             } catch (err) {
//                 this.onRequestEnd();
//                 var errorObj = {
//                     "errorInfo": "Error in the creating search criteria and invoking search service call",
//                     "errorLevel": "Business",
//                     "error": err
//                 };
//                 scopeObj.onError(errorObj);
//             }
        },
      
      /**
     * Component startBFSearch
     * This method is used to create the criteria and do search service call and
     * fetch search results for blocked funds.
     */
    startBFSearch: function(searchData)
    {
      var scopeObj = this;
      var navMan = applicationManager.getNavigationManager();
      var getTransactionList=navMan.getCustomInfo("frmAdvanceSearchResults_Bf");
//       try
//       {
//         this.onRequestStart();  
        var commandObj = {
          accountID : (scopeObj.isEmptyNullUndefined(searchData.accountID) === false ? searchData.accountID : ""),
          lockedEventId :(scopeObj.isEmptyNullUndefined(searchData.lockedEventId) === false ? searchData.lockedEventId : ""),
          lockReason: (scopeObj.isEmptyNullUndefined(searchData.searchValue) === false ? searchData.searchValue : ""),
          searchStartDate : (scopeObj.isEmptyNullUndefined(searchData.searchStartDate) === false ? searchData.searchStartDate : ""),
          searchEndDate : (scopeObj.isEmptyNullUndefined(searchData.searchEndDate) === false ? searchData.searchEndDate : "")
        }
         //var criteria = commandObj;
        //this.transactionListDAO.fetchTransactionList(this._blockedObjServiceName, this._blockedOperationName, this._blockedObjName, criteria, this._blockedServiceIdentifier, this.processSearchData, this.onError);
		  var transactions = [];
		  if(getTransactionList === undefined || getTransactionList === null){
			  getTransactionList = [];
		  }
		  else transactions = getTransactionList.Blockedfunds;
        if(transactions === undefined || transactions === null){
          transactions=[];
        }	
        var criteria = this.constructSearchCriteriaForBF(commandObj);
        var searchResults = cacheUtils.advancedSearch(transactions,criteria);
        var data = {
          "Transactions" : searchResults
        };
        this.processSearchData(data);
//             } catch (err) {
//                 this.onRequestEnd();
//                 var errorObj = {
//                     "errorInfo": "Error in the creating search criteria and invoking search service call",
//                     "errorLevel": "Business",
//                     "error": err
//                 };
//                 scopeObj.onError(errorObj);
//             }
    },
        processSearchData: function(searchData, key) {
            var searchResults = {};
            for(var key in searchData) {
                if(key === "Transactions") {
                  searchData = searchData[this.getFieldValue(this._ListArray)];
                }
              }
            searchData = JSON.parse(JSON.stringify(searchData));
            if (this.segDataBackup.length === undefined) {
                this.segDataBackup = this.view.segTransactionsList.data;
                this.view.segTransactionsList.removeAll();
            }
            this.cacheUtils.offset = 1;
            searchResults[this.getFieldValue(this._ListArray)] = searchData;
            if (this.context["selectedType"] === undefined)
                this.searchResult = true;
            searchResults = searchResults[this.getFieldValue(this._ListArray)];
          if(this.context["selectedType"] === "Blocked Funds") {
             for(var key in searchResults) {
                searchResults[key].statusDescription = "BLOCKED";
                searchResults[key].transactionType = "BlockedFund";
             }
          }
            this.processResponse(searchResults);

        },
        cacheCallback: function(data) {
            if(data.length>0)
            this.setTransactionsList(data);
        },
        onCancelSearch: function() {
            if (this.segDataBackup.length > 0) {
                this.view.segTransactionsList.removeAll();
                this.view.segTransactionsList.setData(this.segDataBackup);
                this.segDataBackup = {};
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
                return this.formatUtils.formatText(value, type, this.formatSkins, this.formattingJSON, currencyCode);
            } catch (err) {
                var errorObj = {
                    "errorInfo": "Error in Formating the data.",
                    "errorLevel": "Business",
                    "error": err
                };
                self.onError(errorObj);
            }
        }
    };
});
