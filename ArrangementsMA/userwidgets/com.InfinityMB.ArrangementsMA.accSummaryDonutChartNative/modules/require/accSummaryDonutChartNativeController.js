define(['./AccountsDAO', './ParserUtilsManager'], function(AccountsDAO, ParserUtilsManager) {
    return {
        constructor: function(baseConfig, layoutConfig, pspConfig) {

            // Service properties
            this._objectServiceName1 = "";
            this._operationName1 = "";
            this._objectName1 = "";
            this._criteria1 = "";
            this._identifier1 = "";
            // Format Values
            this._legendSkin = "";
            this._dataSkin = "";
            this._totalNumberSkin = "";
            this._totalTextSkin = "";

            // Installment Details
            this._installmentDetailField1 = "";
            this._installmentDetailField2 = "";
            this._installmentDetailField3 = "";
            this._installmentDetailField4 = "";
            this._installmentDetailField5 = "";
            this._installmentDetailField6 = "";
            this.accountsDAO = new AccountsDAO();
            this.parserUtilsManager = new ParserUtilsManager();
            this._backUpDataExist = false;
            this._noOfFieldsInTab1LeftPanel = 0;
            this.map = {};
            this.skins = {};
            this.context = {};
            this.servicesCalled = 0;
            this.servicesCompleted = 0;
            this._accountTypeContextPath;
            this._currencyCodeContextPath;
        },
        //Logic for getters/setters of custom properties
        initGettersSetters: function() {
            // Service properties setters and getters
            defineSetter(this, "objectServiceName", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._objectServiceName1 = val;
                }
            });
            defineGetter(this, "objectServiceName", function() {
                return this._objectServiceName1;
            });

            defineSetter(this, "operationName", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._operationName1 = val;
                }
            });
            defineGetter(this, "operationName", function() {
                return this._operationName1;
            });

            defineSetter(this, "objectName", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._objectName1 = val;
                }
            });
            defineGetter(this, "objectName", function() {
                return this._objectName1;
            });

            defineSetter(this, "criteria", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._criteria1 = val;
                }
            });
            defineGetter(this, "criteria", function() {
                return this._criteria1;
            });

            defineSetter(this, "serviceIdentifier", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._identifier1 = val;
                }
            });
            defineGetter(this, "serviceIdentifier", function() {
                return this._identifier1;
            });

            //Skin properties and format values setters and getters
            defineSetter(this, "legendSkin", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._legendSkin = val;
                }
            });
            defineGetter(this, "legendSkin", function() {
                return this._legendSkin;
            });

            defineSetter(this, "dataSkin", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._dataSkin = val;
                }
            });
            defineGetter(this, "dataSkin", function() {
                return this._dataSkin;
            });

            defineSetter(this, "totalNumberSkin", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._totalNumberSkin = val;
                }
            });
            defineGetter(this, "totalNumberSkin", function() {
                return this._totalNumberSkin;
            });

            defineSetter(this, "totalTextSkin", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._totalTextSkin = val;
                }
            });
            defineGetter(this, "totalTextSkin", function() {
                return this._totalTextSkin;
            });



            // Installment details properties setters and getters

            defineSetter(this, "field1", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._installmentDetailField1 = val;
                }
            });
            defineGetter(this, "field1", function() {
                return this._installmentDetailField1;
            });

            defineSetter(this, "field2", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._installmentDetailField2 = val;
                }
            });
            defineGetter(this, "field2", function() {
                return this._installmentDetailField2;
            });

            defineSetter(this, "field3", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._installmentDetailField3 = val;
                }
            });
            defineGetter(this, "field3", function() {
                return this._installmentDetailField3;
            });

            defineSetter(this, "field4", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._installmentDetailField4 = val;
                }
            });
            defineGetter(this, "field4", function() {
                return this._installmentDetailField4;
            });

            defineSetter(this, "field5", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._installmentDetailField5 = val;
                }
            });
            defineGetter(this, "field5", function() {
                return this._installmentDetailField5;
            });

            defineSetter(this, "field6", function(val) {
                if ((typeof val === 'string') && (val !== "")) {
                    this._installmentDetailField6 = val;
                }
            });
            defineGetter(this, "field6", function() {
                return this._installmentDetailField6;
            });
        },
        /**
         * Component getCriteria
         * Parse the criteria from configuration
         * @param: criteria{string} - service criteria collected from exposed contract
         * @return : {JSONObject} - jsonvalue for criteria
         */
        getCriteria: function(criteria) {
            var criteriaJSON = JSON.parse(criteria);
            for (var key in criteriaJSON) {
                criteriaJSON[key] = this.parserUtilsManager.getParsedValue(criteriaJSON[key]);
            }
            return criteriaJSON;
        },

        /**
         * Component setContext
         * To collect the context object required for the component 
         * @param: context{JSONobject} - account object 
         */
        setContext: function(context) {
            this.context = context;
        },

        /**
         * Component parseJsonAndGetValue
         * Parse the value and returns the processed value for given account type
         * @param: Value{String} - String taken from configuration
         * @return: {String} - Processed value
         */
        parseJsonAndGetValue: function(Value) {
            try {
                //         var valueJson = Value;
                if (typeof(Value) == "string") {
                    valueJson = JSON.parse(Value);
                }
                if (valueJson[this.default]) {
                    if (typeof(valueJson[this.default]) == "string")
                        return this.getProcessedText(valueJson[this.default]);
                    else {
                        return "";
                    }
                }
            } catch (e) {
                kony.print(e);
            }
            return this.getProcessedText(Value);
        },

        /**
         * Component getProcessedText
         * Get the processed text from parser util
         * @param: text{String}/{Object} - text to be parsed
         * @return: {String}/{Object} - parsed text
         */
        getProcessedText: function(text) {
            return this.parserUtilsManager.getParsedValue(text);
        },

        /**
         * Component postShow
         * Reponsible to retain the data for custom properties for multiple entries into the component
                          Invoke the DAO layer to collect information from the service
         */
        postShow: function() {
            var scopeObj = this;
            this.parserUtilsManager.setContext(this.context);
            if (this._objectServiceName1 && this._operationName1 && this._objectName1) {
                //         this.requestStart();
                scopeObj.accountsDAO.fetchAccountDetails(
                    this._objectServiceName1, this._operationName1, this._objectName1,
                    this.getCriteria(this._criteria1), scopeObj._identifier1, scopeObj.prepareObjectForTheView, scopeObj.errorCallback);

            } else {
                this.setInstallmentDetailTabData();
                //       this.requestEnd();
            }
        },



        /**
         * Component prepareObjectForTheView
         * Assign the backend response to identifier and bind data to UI
         * @param: backendResponse{JSONObject} - backend service response
         * @param: unicode{string} - identifier string
         */
        prepareObjectForTheView: function(backendResponse, unicode) {
            this.readObject(backendResponse);
            this.parserUtilsManager.setResponseData(unicode, this.map);
            this.setInstallmentDetailTabData();
            this.view.forceLayout();
        },
        /**
         * Component readArray
         * Parse the array in response and add it to the map
         * @param: array{Array} - array in the response
         * @param: jsonPath{string} - JSON path in the map
         */
        readArray: function(array, jsonPath) {
            var parentPath = jsonPath;
            for (var i = 0; i < array.length; i++) {
                var value = array[i];
                jsonPath = parentPath + "[" + i + "]";
                if (value instanceof Array) {
                    this.readArray(value, jsonPath);
                } else if (value instanceof Object) {
                    this.readObject(value, jsonPath);
                } else { // is a value
                    if (isNaN(value) && (value.indexOf("{") > -1 || value.indexOf("[") > -1)) {
                        value = eval('(' + value + ')');
                    }
                    if (value instanceof Array) {
                        this.readArray(value, jsonPath);
                    } else if (value instanceof Object) {
                        this.readObject(value, jsonPath);
                    } else {
                        this.map[jsonPath] = value;
                    }
                }
            }
        },

        /**
         * Component readObject
         * Parse the object in response and add it to the map
         * @param: obj{Object} - object in the response
         * @param: jsonPath{string} - JSON path in the map
         */
        readObject: function(obj, jsonPath) {
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
                } else { // is a value
                    if (isNaN(value) && (value.indexOf("{") > -1 || value.indexOf("[") > -1)) {
                        value = eval('(' + value + ')');
                    }
                    if (value instanceof Array) {
                        this.readArray(value, jsonPath);
                    } else if (value instanceof Object) {
                        this.readObject(value, jsonPath);
                    } else {
                        this.map[jsonPath] = value;
                    }
                }
            }
        },

        /**
         * Component setInstallmentDetailTabData
         * Set UI and data for installment details tab
         */
        setInstallmentDetailTabData: function() {
            var scope = this;
            let legendSkin = scope.parseJsonAndGetValue(scope._legendSkin);
            if (legendSkin) {
                scope.setLegendSkin(legendSkin);
            }
            let dataSkin = scope.parseJsonAndGetValue(scope._dataSkin);
            if (dataSkin) {
                scope.setLegendDataSkin(dataSkin);
            }
            let totalNumberSkin = scope.parseJsonAndGetValue(scope._totalNumberSkin);
            if (totalNumberSkin) {
                scope.view.lblTotalValue.skin = totalNumberSkin;
            }
            let totalTextSkin = scope.parseJsonAndGetValue(scope._totalTextSkin);
            if (totalTextSkin) {
                scope.view.lblTotalText.skin = totalTextSkin;
            }
            scope.setGraphData();
            scope.setLegendData();

        },

        /**
         * Component setLegendSkin
         * Set skins to legend labels
         */
        //     setLegendSkin: function(skin) {
        setLegendSkin: function(skin) {
            this.view.lblLegendText1.skin = skin;
            this.view.lblLegendText2.skin = skin;
            this.view.lblLegendText3.skin = skin;
            this.view.lblLegendText4.skin = skin;
            this.view.lblLegendText5.skin = skin;
            this.view.lblLegendText6.skin = skin;
        },

        /**
         * Component setLegendDataSkin
         * Set skins to legend values
         */
        setLegendDataSkin: function(skin) {
            this.view.lblLegendValue1.skin = skin;
            this.view.lblLegendValue2.skin = skin;
            this.view.lblLegendValue3.skin = skin;
            this.view.lblLegendValue4.skin = skin;
            this.view.lblLegendValue5.skin = skin;
            this.view.lblLegendValue6.skin = skin;
        },

        /**
         * Component setLegendData
         * Set data to legend labels and values
         */
        setLegendData: function() {
            var scope = this;
            var total = 0;
            for (var i = 1; i < 7; i++) {
                var fieldData = eval("scope._installmentDetailField" + i);
                if (fieldData && typeof(fieldData) == "string") {
                    fieldData = JSON.parse(fieldData);
                }
                if (fieldData) {                  
                    scope.view["lblLegendText" + i].text = scope.getParsedI18nValue(fieldData.legend);
                    scope.view["lblLegendValue" + i].text = scope.parseJsonAndGetValue(fieldData.data);
                    scope.view["flxLegendColor" + i].backgroundColor = scope.parseJsonAndGetValue(fieldData.color);
                    if (scope.view["lblLegendValue" + i].text) {
                        total = total + parseInt(scope.view["lblLegendValue" + i].text);
                        scope.view["flxLegend" + i].setVisibility(true);
                    } else {
                        scope.view["flxLegend" + i].setVisibility(false);
                    }
                } else {
                    scope.view["flxLegend" + i].setVisibility(false);
                }
            }
            scope.view.lblTotalValue.text = total + "";
        },

        /**
         * Component setGraphData
         * Create Dounut chart and bind data
         */
        setGraphData: function() {
            var donutData = this.formatDonutChartData();
            this.view.donutchart.createChart(donutData);
        },
      
      
              /**
         * Component getParsedI18nValue.
         * get i18n translated text .
         */
  		getParsedI18nValue: function(fieldValue) {
           try {
        		var i18ntext = kony.i18n.getLocalizedString(fieldValue.substring(fieldValue.indexOf("${i18n{")+7, fieldValue.length-2));
        		fieldValue = i18ntext;
        		return fieldValue;
          } catch (err) {
                var errObj = {
                    "errorInfo": "Error in getParsedI18nValue method of the component.",
                    "errorLevel": "Configuration",
                    "error": err
                };
                scope.onError(errObj);
           }
 		 },


        /**
         * Component formatDonutChartData
         * Process the data for the chart
         * @return: {Array} - chart data
         */
        formatDonutChartData: function() {
            var scope = this;
            var donutChartData = {};
            var installmentData = [];
            for (var i = 1; i < 7; i++) {
                var fieldData = eval("scope._installmentDetailField" + i);
                if (fieldData && typeof(fieldData) == "string") {
                    fieldData = JSON.parse(fieldData);
                }
                if (fieldData) {
                    fieldData.color = "#" + fieldData.color;
                    installmentData.push(fieldData)
                }
            }

            function addRequireDonutChartFields(installment) {
                installment.label = scope.parseJsonAndGetValue(installment.legend);
                installment.Value = scope.parseJsonAndGetValue(installment.data);
                installment.colorCode = scope.parseJsonAndGetValue(installment.color);
                return installment;
            }
            var donutChartData = installmentData.map(addRequireDonutChartFields);
            return donutChartData;
        }
    };
});