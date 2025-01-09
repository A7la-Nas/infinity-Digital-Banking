define(function() {
    var konyLoggerModule = require('com/konymp/chartjs/konyLogger');
    var konymp = {};
    konymp.logger = new konyLoggerModule("Chartjs Component");  	 
    return {
        /**
         * @function constructor
         * @private
         * @params {Object} baseConfig, layoutConfig, pspConfig
         */
        constructor: function(baseConfig, layoutConfig, pspConfig) {
			var analytics=require("com/konymp/"+"chartjs"+"/analytics");
            analytics.notifyAnalytics();
            konymp.logger.trace("----------Entering constructor---------", konymp.logger.FUNCTION_ENTRY);
            this._font = {};
            this._legends = {};
            this._title = {};
            this._fillType = false;
            this._propertyChartData = {};
            this._gridData = {};
            this._animation = {};
          	this.rendered = false;
          	this.view.brwsr.onPageFinished = this.render.bind(this);
          	konymp_chartjs_global_function = function(ready){
              	this.rendered = true;
          		this.render();
    		}.bind(this);
          
          	//#ifdef android
                //#define CHANNEL_CONDITION__device
                //#endif
                //#ifdef iphone
                //#define CHANNEL_CONDITION__device 
                //#endif  
                //#ifdef spaan
                //#define CHANNEL_CONDITION__device 
                //#endif
                //#ifdef spaip
                //#define CHANNEL_CONDITION__device 
                //#endif       
                //#ifdef desktopweb
                //#define CHANNEL_CONDITION__web
                //#endif
                //#ifdef ipad 
                //#define CHANNEL_CONDITION__web 
                //#endif
                //#ifdef tabrcandroid 
                //#define CHANNEL_CONDITION__web 
                //#endif
              	//#ifdef spaipad 
                //#define CHANNEL_CONDITION__web 
                //#endif
                //#ifdef spatabandroid
                //#define CHANNEL_CONDITION__web 
                //#endif 
            konymp.logger.trace("----------Exiting constructor---------", konymp.logger.FUNCTION_EXIT);
        },
		
        /**
         * @function initGetterSetters
         * @private
         * @description: Logic for getters/setters of custom properties
         */
        initGettersSetters: function() {
            //------------------General Porperties
          	defineSetter(this, "renderType", function(val) {
                konymp.logger.trace("----------Entering renderType Setter---------", konymp.logger.FUNCTION_ENTRY);
                this._renderType = val;
                konymp.logger.trace("----------Exiting renderType Setter---------", konymp.logger.FUNCTION_EXIT);
            });
            defineGetter(this, "renderType", function(val) {
                konymp.logger.trace("----------Entering renderType Getter---------", konymp.logger.FUNCTION_ENTRY);
                konymp.logger.trace("----------Exiting renderType Getter---------", konymp.logger.FUNCTION_EXIT);
                return this._renderType;
            }); 
            defineGetter(this, "renderType ", function(val) {
                konymp.logger.trace("----------Entering renderType Getter---------", konymp.logger.FUNCTION_ENTRY);
                konymp.logger.trace("----------Exiting renderType Getter---------", konymp.logger.FUNCTION_EXIT);
                return this._gridData.noOfColums;
            });
            defineSetter(this, "noOfColumns", function(val) {
                konymp.logger.trace("----------Entering renderType Setter---------", konymp.logger.FUNCTION_ENTRY);
                this._gridData.noOfColums = val;
                konymp.logger.trace("----------Exiting renderType Setter---------", konymp.logger.FUNCTION_EXIT);
            });

            defineGetter(this, "gridChartDataSet", function(val) {
                konymp.logger.trace("----------Entering gridChartDataSet Getter---------", konymp.logger.FUNCTION_ENTRY);
                konymp.logger.trace("----------Exiting gridChartDataSet Getter---------", konymp.logger.FUNCTION_EXIT);
                return this._gridData.gridChartDataSet;
            });
            defineSetter(this, "gridChartDataSet", function(val) {
                konymp.logger.trace("----------Entering gridChartDataSet Setter---------", konymp.logger.FUNCTION_ENTRY);
                this._gridData.gridChartDataSet = val.data;
                konymp.logger.trace("----------Exiting gridChartDataSet Setter---------", konymp.logger.FUNCTION_EXIT);
            });

            //---------Legends

            defineSetter(this, "enableLegend", function(val) {
                konymp.logger.trace("----------Entering enableLegend Setter---------", konymp.logger.FUNCTION_ENTRY);
                this._legends.enableLegend = val;
                konymp.logger.trace("----------Exiting enableLegend Setter---------", konymp.logger.FUNCTION_EXIT);
            });
            defineGetter(this, "enableLegend", function(val) {
                konymp.logger.trace("----------Entering enableLegend Getter---------", konymp.logger.FUNCTION_ENTRY);
                konymp.logger.trace("----------Exiting enableLegend Getter---------", konymp.logger.FUNCTION_EXIT);
                return this._legends.enableLegend;
            });

            defineSetter(this, "legendPosition", function(val) {
                konymp.logger.trace("----------Entering legendPosition Setter---------", konymp.logger.FUNCTION_ENTRY);
                this._legends.legendPosition = val;
                konymp.logger.trace("----------Exiting legendPosition Setter---------", konymp.logger.FUNCTION_EXIT);
            });
            defineGetter(this, "legendPosition", function(val) {
                konymp.logger.trace("----------Entering legendPosition Getter---------", konymp.logger.FUNCTION_ENTRY);
                konymp.logger.trace("----------Exiting legendPosition Getter---------", konymp.logger.FUNCTION_EXIT);
                return this._legends.legendPosition;
            });

            //---------Animation

            defineSetter(this, "duration", function(val) {
                konymp.logger.trace("----------Entering duration Setter---------", konymp.logger.FUNCTION_ENTRY);
                this._animation.duration = val;
                konymp.logger.trace("----------Exiting duration Setter---------", konymp.logger.FUNCTION_EXIT);
            });
            defineGetter(this, "duration", function(val) {
                konymp.logger.trace("----------Entering duration Getter---------", konymp.logger.FUNCTION_ENTRY);
                konymp.logger.trace("----------Exiting duration Getter---------", konymp.logger.FUNCTION_EXIT);
                return this._animation.duration;
            });

            defineSetter(this, "easing", function(val) {
                konymp.logger.trace("----------Entering easing Setter---------", konymp.logger.FUNCTION_ENTRY);
                this._animation.easing = val;
                konymp.logger.trace("----------Exiting easing Setter---------", konymp.logger.FUNCTION_EXIT);
            });
            defineGetter(this, "easing", function(val) {
                konymp.logger.trace("----------Entering easing Getter---------", konymp.logger.FUNCTION_ENTRY);
                konymp.logger.trace("----------Exiting easing Getter---------", konymp.logger.FUNCTION_EXIT);
                return this._animation.easing;
            });

            //------------------Ttitle
            defineSetter(this, "enableTitle", function(val) {
                konymp.logger.trace("----------Entering enableTitle Setter---------", konymp.logger.FUNCTION_ENTRY);
                this._title.display = val;
                konymp.logger.trace("----------Exiting enableTitle Setter---------", konymp.logger.FUNCTION_EXIT);
            });
            defineGetter(this, "enableTitle", function(val) {
                konymp.logger.trace("----------Entering enableTitle Getter---------", konymp.logger.FUNCTION_ENTRY);
                konymp.logger.trace("----------Exiting enableTitle Getter---------", konymp.logger.FUNCTION_EXIT);
                return this._title.display;
            });

            defineSetter(this, "titlePosition", function(val) {
                konymp.logger.trace("----------Entering titlePosition Setter---------", konymp.logger.FUNCTION_ENTRY);
                this._title.position = val;
                konymp.logger.trace("----------Exiting titlePosition Setter---------", konymp.logger.FUNCTION_EXIT);
            });
            defineGetter(this, "titlePosition", function(val) {
                konymp.logger.trace("----------Entering titlePosition Getter---------", konymp.logger.FUNCTION_ENTRY);
                konymp.logger.trace("----------Exiting titlePosition Getter---------", konymp.logger.FUNCTION_EXIT);
                return this._title.position;
            });

            // Font propertties
            defineSetter(this, "fontSize", function(val) {
                konymp.logger.trace("----------Entering fontSize Setter---------", konymp.logger.FUNCTION_ENTRY);
                this._font.fontSize = val;
                konymp.logger.trace("----------Exiting fontSize Setter---------", konymp.logger.FUNCTION_EXIT);
            });
            defineGetter(this, "fontSize", function(val) {
                konymp.logger.trace("----------Entering fontSize Getter---------", konymp.logger.FUNCTION_ENTRY);
                konymp.logger.trace("----------Exiting fontSize Getter---------", konymp.logger.FUNCTION_EXIT);
                return this._font.fontSize;
            });

            defineSetter(this, "fontColor", function(val) {
                konymp.logger.trace("----------Entering fontColor Setter---------", konymp.logger.FUNCTION_ENTRY);
                this._font.fontColor = val;
                konymp.logger.trace("----------Exiting fontColor Setter---------", konymp.logger.FUNCTION_EXIT);
            });
            defineGetter(this, "fontColor", function(val) {
                konymp.logger.trace("----------Entering fontColor Getter---------", konymp.logger.FUNCTION_ENTRY);
                konymp.logger.trace("----------Exiting fontColor Getter---------", konymp.logger.FUNCTION_EXIT);
                return this._font.fontColor;
            });

            defineSetter(this, "fontFamily", function(val) {
                konymp.logger.trace("----------Entering fontFamily Setter---------", konymp.logger.FUNCTION_ENTRY);
                this._font.fontFamily = val;
                konymp.logger.trace("----------Exiting fontFamily Setter---------", konymp.logger.FUNCTION_EXIT);
            });
            defineGetter(this, "fontFamily", function(val) {
                konymp.logger.trace("----------Entering fontFamily Getter---------", konymp.logger.FUNCTION_ENTRY);
                konymp.logger.trace("----------Exiting fontFamily Getter---------", konymp.logger.FUNCTION_EXIT);
                return this._font.fontFamily;
            });

            defineSetter(this, "fontStyle", function(val) {
                konymp.logger.trace("----------Entering fontStyle Setter---------", konymp.logger.FUNCTION_ENTRY);
                this._font.fontStyle = val;
                konymp.logger.trace("----------Exiting fontStyle Setter---------", konymp.logger.FUNCTION_EXIT);
            });
            defineGetter(this, "fontStyle", function(val) {
                konymp.logger.trace("----------Entering fontStyle Getter---------", konymp.logger.FUNCTION_ENTRY);
                konymp.logger.trace("----------Exiting fontStyle Getter---------", konymp.logger.FUNCTION_EXIT);
                return this._font.fontStyle;
            });
        },
        render : function() {
            try {
              	if(this.rendered){
               		if(this._renderType)
                		this.createCanvas();
                }
              	else
                  kony.timer.schedule("konympRenderCallback", this.timerCallback.bind(this), 0.5, false);
            } catch (exception) {
                if (this.errorCallback !== undefined && this.errorCallback !== null) {
                    this.errorCallback(exception);
                }
            }
        },
      	timerCallback : function(){
          try{
            kony.timer.cancel("konympRenderCallback");
            if(kony.os.deviceInfo().name.toLocaleLowerCase() !== 'thinclient')
                this.rendered = true;
            this.render();
          }
          catch(exception){
            konymp.logger.trace("----------Exception---------", konymp.logger.FUNCTION_EXIT);
            throw exception;
          }
        },
        createCanvas: function() {
            try {
              //#ifdef CHANNEL_CONDITION__web 
              this.forWeb();
              //#endif
              //#ifdef CHANNEL_CONDITION__device
              this.forDevice();
              //#endif                 
            } catch (exception) {
                konymp.logger.trace("----------Exception---------", konymp.logger.FUNCTION_EXIT);
                throw exception;
            }
        },
        forDevice: function() {
            try {
                var data = this.ValidateAndArrageForGrid();
                var globalData = this.getGlobalObject();
                var type = this.size;
                var config = {};
                if (data !== undefined && data !== null) {
                    config.data = data;
                    config.globalData = globalData;
                    this.view.brwsr.evaluateJavaScript('var chartObj = new konymp.charts(); chartObj.createCanvasForDevice(\'' + type + '\',\''+ this.numberOfCharts +'\');');
                    this.view.brwsr.evaluateJavaScript('var chartObj = new konymp.charts(); chartObj.createChart(\'' + type + '\',' + JSON.stringify(config) + ');');
                }
            } catch (exception) {
                konymp.logger.trace("----------Exception---------", konymp.logger.FUNCTION_EXIT);
                throw exception;
            }
        },
        forWeb: function() {
            try {
                var data = this.ValidateAndArrageForGrid();
                var globalData = this.getGlobalObject();
                var type = this.size;
                var config = {}; 
                if (data !== undefined && data !== null) {
                    config.data = data;
                    config.globalData = globalData;
                    this.view.brwsr.evaluateJavaScript('var chartObj = new konymp.charts(); chartObj.createCanvasForWeb(\'' + type + '\');');
                    this.view.brwsr.evaluateJavaScript('var chartObj = new konymp.charts(); chartObj.createChart(\'' + type + '\',' + JSON.stringify(config) + ');');
                }
            } catch (exception) {
                konymp.logger.trace("----------Exception---------", konymp.logger.FUNCTION_EXIT);
                throw exception;
            }
        },
        getChartType: function(type) {
            try {
              	type = type.toLowerCase();
                switch (true) {
                    case type.startsWith('line'):
                        return 'line';
                    case type.startsWith('vertical'):
                        return 'bar';
                    case type.startsWith('horizontal'):
                        return 'horizontalBar';
                    case type.startsWith('pie'):
                        return 'pie';
                    case type.startsWith('doughnut'):
                        return 'doughnut';
                    case type.startsWith('polar'):
                        return 'polarArea';
                    case type.startsWith('radar'):
                        return 'radar';
                    case type.startsWith('scatter'):
                        return 'scatter';
                    case type.startsWith('bubble'):
                        return 'bubble';
                    default :
                    	throw 'improper chart type ' + type;
                }              	
            } catch (exception) {
                konymp.logger.trace("----------Exception---------", konymp.logger.FUNCTION_EXIT);
                throw exception;
            }
        },
        getArray: function(labels) {
            try {
                var temp = labels;
                temp = temp.replace('[', '');
                temp = temp.replace(']', '');
                return temp.split(',');
            } catch (exception) {
                konymp.logger.trace("----------Exception---------", konymp.logger.FUNCTION_EXIT);
                throw {
                  "message" : "invalid data " + labels
                };
            }
        },
        ValidateAndArrageForGrid: function() {
            try {
                var dataset = this._gridData.gridChartDataSet;
                var noOfColums = this._gridData.noOfColums;
              	this.numberOfCharts = dataset.length;
                var numberOfCharts = dataset.length;
                var x = numberOfCharts / noOfColums;
                var noOfRows = Math.ceil(x);
              	if(parseInt(noOfColums) >= numberOfCharts)
                  this.size = "1*"+numberOfCharts;
              	else
                	this.size = noOfRows + "*" + noOfColums;
                var chartDatasets = {};
                for (var i = 0; i < numberOfCharts; i++) {
                    var record = dataset[i];
                    var chartObject = this.getChartObject(record);
                    chartDatasets[(i + 1) + ""] = chartObject;
                }
                return chartDatasets;
            } catch (exception) {
                konymp.logger.trace("----------Exception---------", konymp.logger.FUNCTION_EXIT);
                throw exception;
            }
        },
        getChartObject: function(record) {
            try {
                var chartObject = {
                    type: this.getChartType(record.chartType),
                    data: this.getDataObject(record),
                    options: this.getOptionObject(record)
                };
              	if(chartObject.type === 'line' || chartObject.type === 'horizontalBar' || chartObject.type === 'bar' || chartObject.type === 'radar')
                  chartObject = this.addLabelToChart(chartObject);
              return chartObject;
            } catch (exception) {
                konymp.logger.trace("----------Exception---------", konymp.logger.FUNCTION_EXIT);
                throw exception;
            }
        },
        getDataObject: function(record) {
            try {
                var dataObject = {
                    labels: this.getArray(record.labels),
                    datasets: this.getDataSetObject(record)
                };
                return dataObject;
            } catch (exception) {
                konymp.logger.trace("----------Exception---------", konymp.logger.FUNCTION_EXIT);
                throw exception;
            }
        },
        getDataSetObject: function(record) {
            try {
                var dataSets = [];
              	if(record.data.indexOf(':')>=0){
              		var getData = this.getDatasetsFromData(record);
                  	for(var i in getData){
                      var rec = getData[i];
                      var objects = {
                        data: rec.data,
                        label: rec.label,
                    	backgroundColor: this.getBackgroundColor(rec.color),
                  		borderColor : this.getBackgroundColor(rec.color) 
                      };
                      dataSets.push(objects);
                    }
                  	return dataSets;
                }
                var object = {
                    data: this.getArray(record.data),
                    backgroundColor: this.getBackgroundColor(record.color),
                  	borderColor : this.getBackgroundColor(record.color)
                };
                dataSets.push(object);
                return dataSets;
            } catch (exception) {
                konymp.logger.trace("----------Exception---------", konymp.logger.FUNCTION_EXIT);
                throw {
                  "message" : "Invalid dataset format for " + record
                }; 
            }
        },
      	getDatasetsFromData : function(record){
          try{
            var data = record.data;
            var datasets = data.replace('],',']=-,');
            datasets = datasets.split('=-,');
            var records = [];
            var color = record.color.replace('],',']=-,');
            var colors = color.split('=-,');
            var colorObject = {};
            for(var j in colors){
              var tempColor = colors[j];
              var temp = tempColor.split(':');
              colorObject[temp[0]] = temp[1];
            }
            for(var i in datasets){
              var dataset = datasets[i];
              var label = dataset.split(':')[0];
              var tempData = this.getArray(dataset.split(':')[1]);
              var col = colorObject[label];              
              col.replace('[','');
              col.replace(']','');
              records.push({
                "data" : tempData,
                "label" : label,
                "color" : col
              });
            }
            return records;
          }
          catch(exception){
            konymp.logger.trace("----------Exception---------", konymp.logger.FUNCTION_EXIT);
            throw {
                  "message" : "Invalid dataset format for " + record
                }; 
          }
        },
        getBackgroundColor: function(color) {
            try {
                if (color.indexOf('[') >= 0) {
                    return this.getArray(color);
                }
                return color;
            } catch (exception) {
                konymp.logger.trace("----------Exception---------", konymp.logger.FUNCTION_EXIT);
                throw {
                  "message" : "Invalid color format" + JSON.stringify(exception)
                }; 
            }
        },
        getOptionObject: function(record) {
            try {
                var options = {
                    legend: this.getLegendObject(record),
                    title: this.getTitleObject(record),
                    responsive: true,
                    chartArea: {
                        backgroundColor: record.bgColor || "#ffffff"
                    }
                };
                return options;
            } catch (exception) {
                konymp.logger.trace("----------Exception---------", konymp.logger.FUNCTION_EXIT);
                throw exception;
            }
        },
        getLegendObject: function(record) {
            try {              	
               	var legend = {
                    display: this._legends.enableLegend,
                    position: this._legends.legendPosition.trim()
                };
                return legend;
            } catch (exception) {
                konymp.logger.trace("----------Exception---------", konymp.logger.FUNCTION_EXIT);
                throw {
                  "message" : "Invalid Legend data" + JSON.stringify(exception)
                }; 
            }
        },
        getTitleObject: function(record) {
            try {
                var titleText = record.title;
                if (titleText !== undefined && titleText !== null) {
                    var title = {
                        display: this._title.display,
                        position: this._title.position.trim(),
                        text: titleText
                    };
                    return title;
                }
                return {};
            } catch (exception) {
                konymp.logger.trace("----------Exception---------", konymp.logger.FUNCTION_EXIT);
                throw {
                  "message" : "Invalid title format" + JSON.stringify(exception)
                };
            }
        },
      	addLabelToChart  : function(chartObject){
          if(chartObject.data.datasets[0].label === undefined || chartObject.data.datasets[0].label === null){
          	chartObject.data.datasets[0].label = "";
          	chartObject.data.datasets[0].fill = false;
          	chartObject.options.legend.display = false;
          }
          else{
            var datasets = chartObject.data.datasets;
            for(var i in datasets)
              chartObject.data.datasets[i].fill = false;
          }
          return chartObject;
        },
        getGlobalObject: function() {
            try {
                var font = this._font;
                var animation = this._animation;
                var global = {
                    "defaultFontColor": font.fontColor,
                    "defaultFontSize": parseInt(font.fontSize),
                    "defaultFontFamily": font.fontFamily.trim(),
                    "defaultFontStyle": font.fontStyle.trim(),
                    "animation": {
                        "duration": parseInt(animation.duration),
                        "easing": animation.easing.trim()
                    }
                };
                return global;
            } catch (exception) {
                konymp.logger.trace("----------Exception---------", konymp.logger.FUNCTION_EXIT);
                throw exception;
            }
        },
        createChart: function(noOfColums, dataObject, globalConfigurations) {
            try {
              	if(this.rendered){                   
                var keys = Object.keys(dataObject);
                var numberOfCharts = keys.length;
                var x = numberOfCharts / noOfColums;
                var noOfRows = Math.ceil(x);
              	var size = "";
              	if(parseInt(noOfColums) >= numberOfCharts)
                  	size = "1*"+numberOfCharts;
              	else
                	size = noOfRows + "*" + noOfColums; 
                var configParam = {};
                configParam.data = dataObject;
                configParam.globalData = globalConfigurations;
              	//#ifdef CHANNEL_CONDITION__web 
              	this.forAPIWeb(size, configParam);
              	//#endif
              	//#ifdef CHANNEL_CONDITION__device
              	this.forAPIDevice(size, configParam, numberOfCharts);
              	//#endif                  
                }
              	else{
                  kony.timer.schedule("konympAPITimer", this.apiTimerCallback.bind(this,noOfColums,dataObject,globalConfigurations), 0.5, false);
                }
            } catch (exception) {
                konymp.logger.trace("----------Exception---------", konymp.logger.FUNCTION_EXIT);
                if (this.errorCallback !== undefined && this.errorCallback !== null) {
                    this.errorCallback(exception);
                }
            }
        },
      	apiTimerCallback : function(noOfColums, dataObject, globalConfigurations){
          try{
            kony.timer.cancel("konympAPITimer");
            this.createChart(noOfColums, dataObject, globalConfigurations);
          }
          catch(exception){
            konymp.logger.trace("----------Exception---------", konymp.logger.FUNCTION_EXIT);
            throw exception;
          }
        },
        forAPIDevice: function(size, configParam, numberOfCharts) {
            try {
                this.view.brwsr.evaluateJavaScript('var chartObj = new konymp.charts(); chartObj.createCanvasForDevice(\'' + size + '\','+ numberOfCharts  +');');
                this.view.brwsr.evaluateJavaScript('var chartObj = new konymp.charts(); chartObj.createChart(\'' + size + '\',' + JSON.stringify(configParam) + ');');
            } catch (exception) {
                konymp.logger.trace("----------Exception---------", konymp.logger.FUNCTION_EXIT);
                throw exception;
            }
        },
        forAPIWeb: function(size, configParam) {
            try {
                this.view.brwsr.evaluateJavaScript('var chartObj = new konymp.charts(); chartObj.createCanvasForWeb(\'' + size + '\');');
                this.view.brwsr.evaluateJavaScript('var chartObj = new konymp.charts(); chartObj.createChart(\'' + size + '\',' + JSON.stringify(configParam) + ');');
            } catch (exception) {
                konymp.logger.trace("----------Exception---------", konymp.logger.FUNCTION_EXIT);
                throw exception;
            }
        }
    };
});  