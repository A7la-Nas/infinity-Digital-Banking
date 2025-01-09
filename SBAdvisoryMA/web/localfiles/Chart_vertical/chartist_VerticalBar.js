/**
 * Created by Team Kony.
 * Copyright (c) 2017 Kony Inc. All rights reserved.
 */
konymp = {};
konymp.charts = konymp.charts || {};

konymp.charts.verticalBar = function(){

};

konymp.charts.verticalBar.prototype.createClass = function(name, rules) {
  var style = document.createElement('style');
  style.type = 'text/css';
  document.getElementsByTagName('head')[0].appendChild(style);
  if(!(style.sheet||{}).insertRule) 
    (style.styleSheet || style.sheet).addRule(name, rules);
  else
    style.sheet.insertRule(name+"{"+rules+"}",0);
};

konymp.charts.verticalBar.prototype.createVerticalChart_UI = function(labels, series, colors, properties) {
  var chart = new Chartist.Bar('#chart', {
    labels: labels,
    series: series
  }, {
    distributeSeries: true,
    axisX: {
      showLabel: false,
      showGrid: false,
    },
    axisY: {
      showLabel: true,
      showGrid: true,
      onlyInteger: false,
      scaleMinSpace: properties._scaleMinSpace,
      labelInterpolationFnc: function(value) {
        var formatter = value.toLocaleString();
        return "$"+formatter;
          }
    },
    low: parseInt(properties._lowValue),
    high: parseInt(properties._highValue),
    showArea: false,
    plugins: [
      Chartist.plugins.ctAxisTitle({
        axisX: {
          //axisTitle: properties._xAxisTitle,
          axisClass: 'ct-axis-title',
          offset: {
            x: 0,
            y: 35
          },
          textAnchor: 'middle'
        },
        axisY: {
          //axisTitle: properties._yAxisTitle,
          axisClass: 'ct-axis-title',
          offset: {
            x: 0,
            y: 13.5
          },
          textAnchor: 'middle',
          flipTitle: true
        }
      }),
      Chartist.plugins.tooltip(),
      /*Chartist.plugins.legend({
        position: "bottom"
      })*/
    ],
    chartPadding: { 	  
      right: 10
    }
  });
  var seq = 0, delay = 80, duration = 300;
  
  chart.on('created', function() {
    seq = 0;
  });
  chart.on('draw', function(context) {
    if(!properties._enableGrid) {
      if(context.type === 'grid' && context.index !== 0) {
        context.element.remove();
      } 
    }
    if(context.type === 'grid' && context.index === 0) {
      context.element.attr({
        style: 'opacity:1'
      });
    }
    if(properties._enableGridAnimation===true && properties._enableGrid===true)
    {
      seq++;
    }
    if(!properties._enableChartAnimation)
    {
      if(context.type === 'bar') {
        context.element.attr({
          style: 'stroke-width: '+properties._strokeWidth
        });
      }
      return;
    }
    if(context.type === 'bar') {
      context.element.attr({
        style: 'stroke-width: 0px;'
      });

      var strokeWidth = 40;
      context.element.animate({
        y2: {
          begin: duration + (seq*duration)/3,
          dur: duration,
          from: context.y1,
          to: context.y2,
          easing: Chartist.Svg.Easing.easeOutSine
        },
        'stroke-width': {
          begin:  duration + (seq*duration)/3,
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

konymp.charts.verticalBar.prototype.Updatecss = function(colors) {
  var regColorcode = /^(#)?([0-9a-fA-F]{3})([0-9a-fA-F]{3})?$/;
  for(var i in colors)
  {
    if(colors[i]!==""&&regColorcode.test(colors[i]))
    {  
      //this.createClass('.ct-legend .ct-series-'+i,'font-family:Arial, Helvetica, sans-serif; color:'+ properties._legendFontColor+'; font-size:'+ properties._legendFontSize + ';');
      this.createClass('.ct-legend .ct-series-'+i+':before',"  background-color:"+colors[i]+"; border-color:"+colors[i]+";");
      var _char = String.fromCharCode(parseInt(97+Number(i)));
      this.createClass('.ct-series-'+_char+' .ct-bar',"  stroke:"+colors[i]+";");
    }
  }
};

konymp.charts.verticalBar.prototype.Generate_verticalChart = function(title, labels, data, colors, properties, titleAlignment) {
  if(document.readyState === "complete") {
    document.ontouchmove = function(e) {
      e.preventDefault();
    };
    if(titleAlignment === "Left"){
      document.getElementById('lblTitle').style.position = "absolute";
      document.getElementById('lblTitle').style.left = "5px";
      document.getElementById('lblTitle').style.top = "0px";
    }
    document.getElementById('lblTitle').style.color = properties._titleFontColor || '#000000';
    document.getElementById('lblTitle').style.fontSize = '16px';
    document.getElementById('lblTitle').style.fontFamily = 'CircularStd-Bold';
    document.getElementById('lblTitle').innerHTML = title;
    document.body.style.backgroundColor = properties._bgColor; 
    this.Updatecss(colors);
    this.createVerticalChart_UI(labels, data, colors, properties);
    return true;
  }
  else {
    return false;
  }
};

var drawCanvasChart = function() {
  console.log(navigator.userAgent);
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    return true;
  }
  var x = new konymp.charts.verticalBar();
  var data = [
    {"colorCode": "#1B9ED9", "label": "data1", "value": "25"},
    {"colorCode": "#76C044", "label": "data2", "value": "20"},
    {"colorCode": "#E8672B", "label": "data3", "value": 30},
    {"colorCode": "#464648", "label": "data4", "value": 10},
    {"colorCode": "#FFC522", "label": "data5", "value": 40}
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
    _titleFontSize: 0,
    _titleFontColor: "#000000",
    _bgColor: "#fff",
    _lowValue: 0,
    _highValue: 40,
    _xAxisTitle: '',
    _yAxisTitle: '',
    _enableGrid: true,
    _enableGridAnimation: false,
    _enableChartAnimation : false,
  };
  x.Generate_verticalChart("Vertical Bar", labels, data, colors, properties);
};

window.addEventListener("DOMContentLoaded", function() {
  setTimeout(onbodyload, 0);
}.bind(this), false);


onbodyload = function(){
   if(typeof kony=='object' && kony!==null) {
    kony.evaluateJavaScriptInNativeContext("chart_barDS_defined_global('ready')");
  }  
  else{
    drawCanvasChart();
  }
}.bind(this);