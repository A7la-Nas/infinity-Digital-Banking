/**
 * Created by Team Kony.
 * Copyright (c) 2017 Kony Inc. All rights reserved.
 */
konymp = {};
konymp.charts = konymp.charts || {};

konymp.charts.sHbar = function(){

};

konymp.charts.sHbar.prototype.createClass = function(name, rules) {
  var style = document.createElement('style');
  style.type = 'text/css';
  document.getElementsByTagName('head')[0].appendChild(style);
  if(!(style.sheet||{}).insertRule) 
    (style.styleSheet || style.sheet).addRule(name, rules);
  else
    style.sheet.insertRule(name+"{"+rules+"}",0);
};

konymp.charts.sHbar.prototype.createShBarChart_UI = function(labels, series, colors, properties) {
  var myNode = document.getElementById("legends");
  var currencyFormat = properties._xAxisLabel;
  while(myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
  var pluginSet = [];
  pluginSet[0] = Chartist.plugins.ctAxisTitle({
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
        x: 0,
        y: 13.5
      },
      textAnchor: 'end',
      flipTitle: true
    }
  });
  
  if(properties._enableLegends) {
    pluginSet[1] = Chartist.plugins.legend({
      horizontalAlign: "right",
      clickable: false,
      position: document.getElementById('legends')
    });
  }
  //pluginSet[2] = Chartist.plugins.tooltip();
  pluginSet[2] = Chartist.plugins.tooltip({             
            transformTooltipTextFnc: function(tooltip) {
			if(currencyFormat=="Currency"){
             var farmatter = Number(tooltip);
              var tooltipvalue = farmatter.toLocaleString() ;
              return "$" + tooltipvalue;
            }
             else{
             return   tooltip;
             }
			}
       })
  
  
  var chart = new Chartist.Bar('#chart', {
    labels: labels,
    series: series
  }, {
    stackBars: true,
    horizontalBars: true,
    axisX: {
      showLabel: true,
      showGrid: true,
      onlyInteger: false,
      scaleMinSpace: 80,
      labelInterpolationFnc: function(value) {
       if(properties._xAxisLabel==="Currency"){
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
    },
    low: parseFloat(properties._lowValue),
    high: parseFloat(properties._highValue),
    showArea: false,
    plugins: pluginSet,
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
    if(properties._enableGrid !== true && context.type === 'grid' && context.index !== 0) {
      context.element.remove();
    } 
//      if(context.type !== 'bar' && context.index !== 0 && context.type === 'grid') {
//           context.element.attr({
//             style: 'visibility:hidden; '
//           });
//         } 
    if(!properties._enableChartAnimation) {
      if(context.type === 'bar') {
      context.element.attr({
        style: 'stroke-width: 25px; '
      });
      }
      return;
    }
    if(properties._enableGrid === true && properties._enableGridAnimation === true) {
      seq++;
    }
    if(context.type === 'bar') {
      if(properties._enableGridAnimation === false) {
        seq++;
      }
      context.element.attr({
        style: 'stroke-width: 0px; '
      });
      var strokeWidth = 12;
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

konymp.charts.sHbar.prototype.Updatecss = function(colors, properties) {
  var regColorcode = /^(#)?([0-9a-fA-F]{3})([0-9a-fA-F]{3})?$/;
  try {
    for(var i in colors) {
      if(colors[i] !== "" && regColorcode.test(colors[i])) {
        this.createClass('.ct-legend .ct-series-'+i,'font-family:Arial, Helvetica, sans-serif; color:'+ properties._legendFontColor+'; font-size:'+ properties._legendFontSize + ';');
        this.createClass('.ct-legend .ct-series-'+i+':before',"  background-color:"+colors[i]+"; border-color:"+colors[i]+";");
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

konymp.charts.sHbar.prototype.Generate_stackHbarChart = function(title, labels, data, colors, properties){
  if(document.readyState === "complete") {
    document.ontouchmove = function (e) {
      e.preventDefault();
    };
    document.getElementById('lblTitle').style.color = properties._titleFontColor || '#000000';
    document.getElementById('lblTitle').style.fontSize = '16px';
    document.getElementById('lblTitle').style.fontFamily = 'CircularStd-Bold';
    document.getElementById('lblTitle').innerHTML = title;
    document.body.style.backgroundColor = properties._bgColor || '#FFFFFF'; 
    this.Updatecss(colors, properties);
    this.createShBarChart_UI(labels, data, colors, properties);
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
  var x = new konymp.charts.sHbar();
  var data = [
    {"colorCode": "#1B9ED9", "label": "d1"},
    {"colorCode": "#76C044", "label": "d2"},
    {"colorCode": "#E8672B", "label": "d3"}
  ];
  var series = [
    {name: "blue", data: [5, 1, 4, 3]},
    {name: "green", data: [2, 4, 5, 3]},
    {name: "orange", data: [1, 2, 4, 6]}
  ];
  var labels = data.map(function(obj){
    return obj.label;
  });
  labels.push("d4");
  var colors = data.map(function(obj){
    return obj.colorCode;
  });
  var properties = {
    _titleFontSize: 15,
    _titleFontColor: "#000000",
    _bgColor: "#fff",
    _lowValue: 0,
    _highValue: 15,
    _xAxisTitle: 'value',
    _yAxisTitle: 'data',
    _enableGrid: true,
     _scaleMinSpace: 40,
    _enableGridAnimation: false,
    _enableChartAnimation: true,
    _enableLegends: true,
    _legendFontColor: "#000000",
    _legendFontSize: "95%",
    _enableStaticPreview: true
  };
  x.Generate_stackHbarChart("Stack Horizontal Chart", labels, series, colors, properties);
};
window.addEventListener("DOMContentLoaded", function() {
  setTimeout(onbodyload, 0);
}.bind(this), false);

onbodyload = function(){
  if(typeof kony !== "undefined") {
    kony.evaluateJavaScriptInNativeContext("chart_hBarSB_defined_global('ready')");
  } else {
    drawCanvasChart();
  }
}.bind(this);
