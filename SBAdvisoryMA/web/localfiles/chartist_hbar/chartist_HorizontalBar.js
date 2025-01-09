/**
 * Created by Team Kony.
 * Copyright (c) 2017 Kony Inc. All rights reserved.
 */
konymp = {};
konymp.charts = konymp.charts || {};

konymp.charts.horizontalBar = function(){

};

konymp.charts.horizontalBar.prototype.createClass = function(name, rules) {
  var style = document.createElement('style');
  style.type = 'text/css';
  document.getElementsByTagName('head')[0].appendChild(style);
  if(!(style.sheet||{}).insertRule) 
    (style.styleSheet || style.sheet).addRule(name, rules);
  else
    style.sheet.insertRule(name+"{"+rules+"}",0);
};

konymp.charts.horizontalBar.prototype.createhorizontalCharts_UI = function(labels, series, colors, properties) {
  var currencyFormat = properties._labelFormat;
  var chart = new Chartist.Bar('#chart', {
    labels: labels,
    series: series
  }, {
    distributeSeries: true,
    horizontalBars: true,
    axisX: {
      showLabel: true,
      showGrid: true,
      scaleMinSpace: properties._scaleMinSpace,
      labelInterpolationFnc: function(value) {
       if(properties._labelFormat==="Currency"){
          var formatter = value.toLocaleString();
          return "$"+formatter;
        }else{
          return value;
        }
      }
    },
    axisY: {
      showLabel: true,
      showGrid: true,
      onlyInteger: true
    },
    low: parseFloat(properties._lowValue),
    high: parseFloat(properties._highValue),
    showArea: false,
    plugins: properties._enableGrid===true?[
      Chartist.plugins.ctAxisTitle({
        axisX: {
          axisTitle: properties._xAxisTitle,
          axisClass: 'ct-barlabelhzntl',
          offset: {
            x: 0,
            y: 35
          },
          textAnchor: 'middle'
        },
        axisY: {
          axisTitle: properties._yAxisTitle,
          axisClass: 'ct-barlabelhzntl',
          offset: {
            x: 35,
            y: 13.5
          },
          textAnchor: 'end',
          flipTitle: true
        }
      }),
     
        //  var formatter = value.toLocaleString();
          Chartist.plugins.tooltip({
             
            transformTooltipTextFnc: function(tooltip) {
              if(currencyFormat==="Currency"){
                var farmatter = Number(tooltip);
                farmatter = farmatter.toFixed(2);
                var tooltipvalue = farmatter.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,') ;
                return "$" + tooltipvalue;
              }
              else{
                return   tooltip;
              }
			}
            })
            //return "$"+formatter;
        
    ]:[],
    chartPadding: {
      top:10,
      right: 20
    }
  });
  var seq = 0, delay = 80, duration = 300;
  var i = 0;
  chart.on('created', function() {
    seq = 0;
  });
  chart.on('draw', function(context) {
    if(context.axis){
      if(context.axis.range){
        if(context.axis.ticks[context.index].toString().includes(".")){
          context.element.attr({
            style: 'visibility:hidden; '
          });
        }
      }
      else{
        if(context.type !== 'bar' && context.index !== 0 && context.type === 'grid') {
          context.element.attr({
            style: 'visibility:hidden; '
          });
        } 
      }
    }
    if(properties._enableGrid !== true && context.type === 'grid' && context.index !== 0) {
      context.element.remove();
    } 
    if(!properties._enableChartAnimation) {
      if(context.type === 'bar') {
        context.element.attr({
          style: 'stroke-width: '+properties._barWidth+'; '
        });
      }
      return;
    }
    if(properties._enableGrid === true && properties._enableGridAnimation === true) {
      seq++;
    }
    if(context.type === 'bar') {
      context.element.attr({
        style: 'stroke-width: '+properties._barWidth+'; '
      });
      var strokeWidth = 35;
      context.element.animate({
        x2: {
          begin: duration + (seq*duration)/3,
          dur: duration,
          from: context.x1,
          to: context.x2,
          easing: Chartist.Svg.Easing.easeOutSine
        },
        'stroke-width': {
          begin: duration + (seq*duration)/3,
          dur: 1,
          from: 0,
          to: strokeWidth,
          fill: 'freeze'
        }
      }, false);	
    }
    if(properties._enableGrid===true && properties._enableGridAnimation === true && context.type === 'grid') {
      var pos1Animation = {
        begin: seq * delay,
        dur: duration,
        from: context[context.axis.units.pos + '1'] - 30,
        to: context[context.axis.units.pos + '1'],
        easing: 'easeOutQuart'
      };
      var pos2Animation = {
        begin: seq * delay,
        dur: duration,
        from: context[context.axis.units.pos + '2'] - 100,
        to: context[context.axis.units.pos + '2'],
        easing: 'easeOutQuart'
      };
      var animations = {};
      animations[context.axis.units.pos + '1'] = pos1Animation;
      animations[context.axis.units.pos + '2'] = pos2Animation;
      animations['opacity'] = {
        begin: seq * delay,
        dur: duration,
        from: 0,
        to: 1,
        easing: 'easeOutQuart'
      };
      context.element.animate(animations);
    }
  });
  chart.on('created', function() {
    if(window.__exampleAnimateTimeout) {
      clearTimeout(window.__exampleAnimateTimeout);
      window.__exampleAnimateTimeout = null;
    } 	
  });
};

konymp.charts.horizontalBar.prototype.Updatecss = function(colors) {
  var regColorcode = /^(#)?([0-9a-fA-F]{3})([0-9a-fA-F]{3})?$/;
  try {
    for(var i in colors) {
      if(colors[i] !== "" && regColorcode.test(colors[i])) {
        var _char = String.fromCharCode(parseInt(97 + Number(i)));
        this.createClass('.ct-series-' + _char + ' .ct-bar', " stroke: " + colors[i] + ";");
      }
      else {
        throw {"Error": "InvalidColorCode", "message": "Color code for bars should be in hex format. Eg.:#000000"};
      }
    }
  }
  catch(exception) {
    if(exception.Error === "InvalidColorCode") {
      throw(exception);
    }
  }
};

konymp.charts.horizontalBar.prototype.Generate_HorizontalChart = function(title, labels, data, colors, properties){
  if(document.readyState === "complete") {
    document.ontouchmove = function (e) {
      e.preventDefault();
    };
    document.getElementById('lblTitle').style.color = properties._titleFontColor || '#000000';
    document.getElementById('lblTitle').style.fontSize = '15px';
    document.getElementById('lblTitle').style.fontWeight = '800';
    document.getElementById('lblTitle').style.fontFamily = 'CircularStd-Book';
    document.getElementById('lblTitle').innerHTML = title;
    document.body.style.backgroundColor = properties._bgColor; 
    this.Updatecss(colors);
    this.createhorizontalCharts_UI(labels, data, colors, properties);
    return true;
  }
  else {
    return false;
  }
};

var drawCanvasChart = function() {
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    return true;
  }
  var x = new konymp.charts.horizontalBar();
  var data = [
    {"colorCode": "#1B9ED9", "label": "d1", "value": "5"},
    {"colorCode": "#76C044", "label": "d2", "value": "8"},
    {"colorCode": "#E8672B", "label": "d3", "value": 12},
    {"colorCode": "#464648", "label": "d4", "value": 6},
    {"colorCode": "#FFC522", "label": "d5", "value": 7},
    {"colorCode": "#ED499A", "label": "d6", "value": 10},
    {"colorCode": "#7A54A3", "label": "d7", "value": "12"}
  ];
  var Data = data.map(function(obj){
    return Number(obj.Value||obj.value);
  });
  var labels = data.map(function(obj){
    return obj.label;
  });
  var colors = data.map(function(obj){
    return obj.colorCode;
  });
  var properties = {
    _titleFontSize: "15",
    _titleFontColor: "#000000",
    _bgColor: "#fff",
    _lowValue: "0",
    _highValue: "12",
    _xAxisTitle:'x-axis',
    _yAxisTitle:'y-axis',
    _enableGrid: true,
    _enableGridAnimation: true,
    _enableChartAnimation: true,
    _enableStaticPreview: true
  };
  x.Generate_HorizontalChart("", labels, data, colors, properties);
};
window.addEventListener("DOMContentLoaded", function() {
  setTimeout(onbodyload, 0);
}.bind(this), false);
onbodyload = function(){
  if(typeof kony !== "undefined") {
    kony.evaluateJavaScriptInNativeContext("chart_hBarDs_defined_global('ready')");
  } else {
    drawCanvasChart();
  }
}.bind(this);
