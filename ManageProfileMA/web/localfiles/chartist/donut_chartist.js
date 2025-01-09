/**
 * Created by Team Kony.
 * Copyright (c) 2017 Kony Inc. All rights reserved.
 */
konymp = {};
konymp.charts = konymp.charts || {};

konymp.charts.donut = function(){

};

konymp.charts.donut.prototype.createClass = function(name, rules) {
  var style = document.createElement('style');
  style.type = 'text/css';
  document.getElementsByTagName('head')[0].appendChild(style);
  if(!(style.sheet||{}).insertRule) 
    (style.styleSheet || style.sheet).addRule(name, rules);
  else
    style.sheet.insertRule(name+"{"+rules+"}",0);
};

konymp.charts.donut.prototype.createDonutChart = function(id,labels,series,options,opacity,enableAnimation){
  var ptr=0;
  var chart = new Chartist.Pie(id, {
    labels:labels,
    series: series[0]

  }, options, [
    ['screen and (min-width: 640px)', {
      chartPadding: 60,
      labelOffset: 40
      //labelDirection: 'implode',
      //labelInterpolationFnc: function(value) {
        //return value;
      //}
    }],
    ['screen and (min-width: 1024px)', {
      labelOffset: 40,
      chartPadding: 20
    }]
  ]);
  
};

konymp.charts.donut.prototype.createDonutCharts_UI = function(lbls,srs,legends,enableAnimation)
{
  var myNode = document.getElementById("legends");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
  var sum = function(a, b) { return a + b;};
  var offset  = document.getElementById('pie1').offsetWidth;
  var width = parseInt(offset/6);
  this.createDonutChart.call(this,'#pie1',lbls,srs,{
    showLabel:false,
    labelInterpolationFnc: function(srs,sum,value, idx) {
      return  srs[0][idx].value || srs[0][idx];
    }.bind(this,srs,sum),
    plugins:legends===true? [
      Chartist.plugins.legend( {
        horizontalAlign: "right",
        clickable:false,
        position: document.getElementById('legends')
      })
    ]:[],
    donut: true,
    donutWidth: 5,
  },0.9,enableAnimation);

};

konymp.charts.donut.prototype.Updatecss = function(colors)
{
  var regColorcode = /^(#)?([0-9a-fA-F]{3})([0-9a-fA-F]{3})?$/;
  for(var i in colors)
  {
    if(colors[i]!==""&&regColorcode.test(colors[i]))
    {  
      this.createClass('.ct-legend .ct-series-'+i+':before',"  background-color:"+colors[i]+"; border-color:"+colors[i]+";"); 
      var _char = String.fromCharCode(parseInt(97+Number(i)));
      this.createClass('.ct-series-'+_char+' .ct-slice-donut',"  stroke:"+colors[i]+";");
    }
  }
};

konymp.charts.donut.prototype.setProperties = function(properties){
  this.createClass(".ct-legend.ct-legend-inside","position: absolute;top: 0;left: 0;margin-left:0px;"+
                   "font-family :Arial, Helvetica, sans-serif;"+
                   " font-size : "+parseInt(properties._legendFontSize)*10+"%; color : "+properties._legendFontColor+";"
                  );
};

konymp.charts.donut.prototype.Generate_DoughnutChart = function(title,labels,data,colors,properties){
  if(document.readyState === "complete")
  {
    this.setProperties(properties);
    document.getElementById('lblTitle').style.color = properties._titleFontColor||'#000000';
    document.getElementById('lblTitle').style.fontSize =properties._titleFontSize!==undefined? parseInt(properties._titleFontSize)*10+'%':'120%'; 
    document.getElementById('lblTitle').style.fontFamily = 'Arial, Helvetica, sans-serif';
    document.getElementById('lblTitle').innerHTML = title;
    document.body.style.backgroundColor = properties._bgColor;
    this.Updatecss(colors);
    this.createDonutCharts_UI(labels,[data],properties._enableLegend,properties._enableChartAnimation);
    return true;
  }
  else
  {
    return false;
  }
};

var drawCanvasChart = function(){
  console.log(navigator.userAgent);
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    return true;
  }
  var x = new konymp.charts.donut();
  var data = [
    {
      "colorCode": "#1B9ED9",
      "label": "Data1",
      "value": "40"
    },
    {
      "colorCode": "#E8672B",
      "label": "data2",
      "value": "20"
    },
    {
      "colorCode": "#76C044",
      "label": "data3",
      "value": 20
    },
    {
      "colorCode": "#FFC522",
      "label": "data4",
      "value": 10
    },
    {
      "colorCode": "#97CDED",
      "label": "data5",
      "value": 10        
    }
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
  var properties = {_titleFontSize:12,
                    _titleFontColor:"#000000",
                    _enableLegend:true,
                    _legendFontSize:10,
                    _legendFontColor:"#000000",
                    _bgColor:"#ffffff",
                    _enableChartAnimation:true,
                    _enableStaticPreview: true
                   };
  x.Generate_DoughnutChart("Donut Chart",labels,data,colors,properties);
};


window.addEventListener("DOMContentLoaded", function() {
  setTimeout(onbodyload, 0);
}.bind(this), false);


onbodyload = function(){
 if(typeof kony=='object' && kony!==null) {
    kony.evaluateJavaScriptInNativeContext("chart_donut_defined_global('ready')");
  }  
  else{
	  drawCanvasChart();
  }
}.bind(this);
