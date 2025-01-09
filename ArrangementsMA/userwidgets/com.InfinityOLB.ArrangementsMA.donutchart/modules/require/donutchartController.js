/**
 * Created by Team Kony.
 * Copyright (c) 2017 Kony Inc. All rights reserved.
 */
/**
 * @controller: Doughnut Chart UDW
 * @author: Sumeet Bartha and Tejaswini Tubati
 * @category: Reusable Component
 * @componentVersion: 1.0
 * @description: Generates doughnut chart by taking the data as input
 */
define(function() {
  var konyLoggerModule = require('com/InfinityOLB/ArrangementsMA/donutchart/konyLogger');
  konymp = {};
  konymp.logger = new konyLoggerModule("Donut Chart Component");
  return {
    /**
		 * @function constructor
         * @private
		 * @params {Object} baseConfig, layoutConfig, pspConfig
		 */
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      konymp.logger.trace("----------Entering constructor---------", konymp.logger.FUNCTION_ENTRY);
      this._chartProperties = {
        _titleFontSize:12,
        _titleFontColor:"#000000",
        _enableLegend:true,
        _legendFontSize:10,
        _legendFontColor:"#000000",
        _bgColor:"#ffffff",
        _enableChartAnimation:true   
      };
      this._data = [];
      this._chartTitle = "";
      this._enableStaticPreview = true;
      chart_donut_defined_global = function(state){       
        if(state ==='ready'){
          this.myPostShow();
        }
      }.bind(this);
      konymp.logger.trace("----------Exiting constructor---------", konymp.logger.FUNCTION_EXIT);
    },
    /**
		 * @function initGetterSetters
		 * @private
         * @description: Logic for getters/setters of custom properties
		 */
    initGettersSetters: function() {
      konymp.logger.trace("----------Entering initGettersSetters Function---------", konymp.logger.FUNCTION_ENTRY);
      this.hexCodeFormat = /^(#)?([0-9a-fA-F]{3})([0-9a-fA-F]{3})?$/;
      defineSetter(this, "chartData", function(val) {
        konymp.logger.trace("----------Entering data Setter---------", konymp.logger.FUNCTION_ENTRY);
        this._data = val.data;
        konymp.logger.trace("----------Exiting data Setter---------", konymp.logger.FUNCTION_EXIT);
      });
      defineSetter(this, "enableStaticPreview", function(val) {
        konymp.logger.trace("----------Entering enableStaticPreview Setter---------", konymp.logger.FUNCTION_ENTRY);
        this._enableStaticPreview = val;
        konymp.logger.trace("----------Exiting enableStaticPreview Setter---------", konymp.logger.FUNCTION_EXIT);
      });
      defineSetter(this, "chartTitle", function(val) {
        konymp.logger.trace("----------Entering chartTitle Setter---------", konymp.logger.FUNCTION_ENTRY);
        this._chartTitle = val;
        konymp.logger.trace("----------Exiting chartTitle Setter---------", konymp.logger.FUNCTION_EXIT);
      });
      defineSetter(this, "titleFontSize", function(val) {
        konymp.logger.trace("----------Entering titleFontSize Setter---------", konymp.logger.FUNCTION_ENTRY);
        try {
          if(!isNaN(parseInt(val))) {
            this._chartProperties._titleFontSize = val;
          }
          else {
            throw {"Error": "NotNumber", "message": "Title font size value should be a number"};
          }
        }
        catch(exception) {
          konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
          if(exception.Error === "NotNumber") {
            throw(exception);
          }
        }
        konymp.logger.trace("----------Exiting titleFontSize Setter---------", konymp.logger.FUNCTION_EXIT);
      });
      defineSetter(this, "titleFontColor", function(val) {
        konymp.logger.trace("----------Entering titleFontColor Setter---------", konymp.logger.FUNCTION_ENTRY);
        try {
          if(this.hexCodeFormat.test(val)) {
            this._chartProperties._titleFontColor = val;
          }
          else {
            throw {"Error": "InvalidTitleFontColorCode", "message": "Title font color code must be in hex format. Eg.:#000000"};
          }
        }
        catch(exception) {
          konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
          if(exception.Error === "InvalidTitleFontColorCode") {
            throw(exception);
          }
        }
        konymp.logger.trace("----------Exiting titleFontColor Setter---------", konymp.logger.FUNCTION_EXIT);
      });
      defineSetter(this, "enableLegend", function(val) {
        konymp.logger.trace("----------Entering enableLegend Setter---------", konymp.logger.FUNCTION_ENTRY);
        this._chartProperties._enableLegend = val;
        konymp.logger.trace("----------Exiting enableLegend Setter---------", konymp.logger.FUNCTION_EXIT);
      });
      defineSetter(this, "legendFontSize", function(val) {
        konymp.logger.trace("----------Entering legendFontSize Setter---------", konymp.logger.FUNCTION_ENTRY);
        try {
          if(!isNaN(parseInt(val))) {
            this._chartProperties._legendFontSize = val;
          }
          else {
            throw {"Error": "NotNumber", "message": "Legend font size value should be a number"};
          }
        }
        catch(exception) {
          konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
          if(exception.Error === "NotNumber") {
            throw(exception);
          }
        }
        konymp.logger.trace("----------Exiting legendFontSize Setter---------", konymp.logger.FUNCTION_EXIT);
      });
      defineSetter(this, "legendFontColor", function(val) {
        konymp.logger.trace("----------Entering legendFontColor Setter---------", konymp.logger.FUNCTION_ENTRY);
        try {
          if(this.hexCodeFormat.test(val)) {
            this._chartProperties._legendFontColor = val;
          }
          else {
            throw {"Error": "InvalidLegendFontColorCode", "message": "Legend font color code must be in hex format. Eg.:#000000"};
          }
        }
        catch(exception) {
          konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
          if(exception.Error === "InvalidLegendFontColorCode") {
            throw(exception);
          }
        }
        konymp.logger.trace("----------Exiting legendFontColor Setter---------", konymp.logger.FUNCTION_EXIT);
      });
      defineSetter(this, "bgColor", function(val) {
        konymp.logger.trace("----------Entering bgColor Setter---------", konymp.logger.FUNCTION_ENTRY);
        try {
          if(this.hexCodeFormat.test(val)) {
            this._chartProperties._bgColor = val;
          }
          else {
            throw {"Error": "InvalidBackgroundColorCode", "message": "Background color code must be in hex format. Eg.:#000000"};
          }
        }
        catch(exception) {
          konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
          if(exception.Error === "InvalidBackgroundColorCode") {
            throw(exception);
          }
        }
        konymp.logger.trace("----------Exiting bgColor Setter---------", konymp.logger.FUNCTION_EXIT);
      });
      defineSetter(this, "enableChartAnimation", function(val) {
        konymp.logger.trace("----------Entering enableChartAnimation Setter---------", konymp.logger.FUNCTION_ENTRY);
        this._chartProperties._enableChartAnimation = val;
        konymp.logger.trace("----------Exiting enableChartAnimation Setter---------", konymp.logger.FUNCTION_EXIT);
      });
      this.view.doughnutBrowser.onPageFinished = this.myPostShow.bind(this);  
      konymp.logger.trace("----------Exiting initGettersSetters Function---------", konymp.logger.FUNCTION_EXIT);
    },
    /**
       	 * @function createDonutChart         
       	 * @param {JSON array} dataSet - data for the chart
         * @description: initiates the creation of doughnut chart
       	 */
    createChart: function(dataSet) {
      var scope = this;
      konymp.logger.trace("----------Entering createDonutChart Function---------", konymp.logger.FUNCTION_ENTRY);
      try {
        this.view.doughnutBrowser.isVisible = true;
        if (dataSet === undefined) {
          if (this._data.length < 0) throw {
            Error: 'No Data',
            message: "no data assigned for chart"
          };
          else dataSet = this._data;
        } else {
          this._data = dataSet;
        }
        var data = dataSet.map(function(obj) {
          return Number(obj.Value || obj.value);
        });
        var labels = dataSet.map(function(obj) {
          return obj.label;
        });
        var colors = dataSet.map(function(obj) {
          var regColorcode = /^(#)?([0-9a-fA-F]{3})([0-9a-fA-F]{3})?$/;
          if (obj.color === null || obj.color === "" || (!regColorcode.test(obj.color))) {
            throw {
              error: "wrong dataType",
              message: "wrong colorCode for data " + JSON.stringify(obj.colorCode)
            };
          }
          return obj.color;
        });
        if (this.validateAllParams(this._chartTitle, data, labels, colors)) {
          scope.generateDonuChart(data, labels, colors);
        }
      } catch (exception) {
        konymp.logger.error(JSON.stringify(exception), konymp.logger.EXCEPTION);
        if (exception.error === "wrong dataType") {
          throw exception;
        }
      }
    },
    generateDonuChart: function(data, labels, colors) {
      var scope = this;
      for(var i in data) {
        if(isNaN(data[i]) || data[i] === null || data[i] === undefined || data[i] === "") {
          data[i] = "0";
        }
      }
      var urlConf = {
        URL: "DonutChartist/donutChart.html?t=" + encodeURIComponent(JSON.stringify(data)) + "&w=" + encodeURIComponent(JSON.stringify(labels)) + "&h=" + encodeURIComponent(JSON.stringify(colors)),
        requestMethod: constants.BROWSER_REQUEST_METHOD_GET
      };
      scope.view.doughnutBrowser.requestURLConfig = urlConf;
    },
    /**
         * @function _validationData
         * @private
         * @param {String/js array} data - the paramater to be validated
         * @param {String} type - the type in which the parameter should be
         * @description: validates the datatype of a single paramater passed
         */
    _validationData: function(data, type) {
      konymp.logger.trace("----------Entering _validationData Function---------", konymp.logger.FUNCTION_ENTRY);
      if(type === 'array') {
        konymp.logger.trace("----------Exiting _validationData Function---------", konymp.logger.FUNCTION_EXIT);
        return Array.isArray(data);
      }
      else if(typeof data === type) {
        konymp.logger.trace("----------Exiting _validationData Function---------", konymp.logger.FUNCTION_EXIT);
        return true;
      }
      else {
        konymp.logger.trace("----------Exiting _validationData Function---------", konymp.logger.FUNCTION_EXIT);
        return false;
      }
    },
    /**
       	 * @function validateAllParams
       	 * @private
       	 * @param {String} title 
       	 * @param {js array} data 
       	 * @param {js array} labels 
       	 * @param {js array} colors 
         * @description: validates the datatypes of all the paramaters
       	 */
    validateAllParams: function(title, data, labels, colors) {
      konymp.logger.trace("----------Entering validateAllParams Function---------", konymp.logger.FUNCTION_ENTRY);
      if(!this._validationData(title,'string')) {
        throw {error:"wrong dataType",message:"wrong dataType for title " + title};
      }
      if(!this._validationData(data,'array')) {
        throw {error:"wrong dataType",message:"wrong dataType for data " + JSON.stringify(data)};
      }
      if(!this._validationData(labels,'array')) {
        throw {error:"wrong dataType",message:"wrong dataType for labels " + JSON.stringify(labels)};
      }
      if(!this._validationData(colors,'array')) {
        throw {error:"wrong dataType",message:"wrong dataType for bgColor " + JSON.stringify(colors)};
      }
      konymp.logger.trace("----------Exiting validateAllParams Function---------", konymp.logger.FUNCTION_EXIT);
      return true;
    },
    /**
       * @function
       *@description: called to create using data
       */
    myPostShow: function(){
      try {
        if(this._enableStaticPreview)
        {
          this.createChart(this._data);
          return;
        }
      }
      catch(exception) {
        konymp.logger.error(JSON.stringify(exception),konymp.logger.EXCEPTION);
      }
    }
  };
});