konymp = {};
konymp.charts = function() {};

konymp.charts.count = 0;
konymp.charts.rendered = 0;
konymp.charts.isGrid = false;

konymp.charts.prototype.createCanvasForDevice = function(size,numberCharts) {
    try {
        var div = document.getElementById('konymp_browser_div');
        div.setAttribute('style', 'width: 100%; height: 100%;');
      	while (div.firstChild) {
    		div.removeChild(div.firstChild);
		}
      	konymp.charts.count = 0;
      	konymp.charts.rendered = 0;
        if (size === '1*1') {
            var dynamicDiv = this.getCanvas(100, 100, 0, 0);
            div.appendChild(dynamicDiv);
        } else {
            konymp.charts.isGrid = true;
            var values = size.split('*');
            var b = parseInt(values[0]);
            var length = parseInt(values[1]);
            var noOfcharts = b * length;
            var top = 0;
          	numberCharts = parseInt(numberCharts);
          	var chartsNo = (numberCharts<noOfcharts)? numberCharts : noOfcharts;
            for (var i = 0; i < chartsNo; i++) {
                top = top + (i * 40);
                var dynamicDiv1 = this.getCanvas(100, 40, top, 0);
                div.appendChild(dynamicDiv1);
            }
        }
    } catch (exception) {
        console.log(exception);
        throw exception;
    }
};

konymp.charts.prototype.createCanvasForWeb = function(size) {
    try {
        var div = document.getElementById('konymp_browser_div');
        div.setAttribute('style', 'width: 100%; height: 100%;');
      	while (div.firstChild) {
    		div.removeChild(div.firstChild);
		} 
      	konymp.charts.count = 0;
      	konymp.charts.rendered = 0;
        if (size === '1*1') {
            var dynamicDiv = this.getCanvas(100, 100, 0, 0);
            div.appendChild(dynamicDiv);
        } else {
            konymp.charts.isGrid = true;
            var values = size.split('*');
            var b = parseInt(values[0]);
            var length = parseInt(values[1]);
            var width = parseInt(100 / length);
            var height = parseInt(100 / b);
            var noOfRows = parseInt(100 / width);
            var noOfCloumns = parseInt(100 / height);
            var top = 0;
          	width = width-(noOfCloumns*2);
          	height = height-(noOfRows*2);
            for (var i = 0; i < noOfRows; i++) {
                top = top + (i * height);              	
                var left = 0;
                for (var j = 0; j < noOfCloumns; j++) {
                    left = left + (j * width);                  	
                    var dynamicDiv1 = this.getCanvas(width, height, top, left);
                    div.appendChild(dynamicDiv1);
                }
            }
        }
    } catch (exception) {
        console.log(exception);
        throw exception;
    }
};

konymp.charts.prototype.getCanvas = function(width, height, top, left) {
    try {
        var canvas = document.createElement('canvas');
        var dynamicDiv = document.createElement('div');
        dynamicDiv.appendChild(canvas);
        konymp.charts.count++;
        canvas.setAttribute('id', 'myChart' + konymp.charts.count);
        dynamicDiv.setAttribute('style', 'margin-top: 2%;margin-left: 2%; width: ' + width + '%; height: ' + height + '%; top: ' + top + '%; left: ' + left + '%; float: left');
        canvas.setAttribute('style', 'width: 100%; height: 100%;');
        return dynamicDiv;
    } catch (exception) {
        console.log(exception);
        throw exception;
    }
};

konymp.charts.prototype.createChart = function(type, configParam) {
    try {
        this.configParam = configParam;        
        this.global = configParam.globalData;
        this.data = configParam.data;
        var keys = Object.keys(this.data);
        this.addGlobalConfiguration(configParam.globalData);
        for (var i = 0; i < keys.length; i++) {
            var record = this.data[keys[i]];
            var ctype = record.type;
            this.addCharts(ctype, 'myChart' + (konymp.charts.rendered + 1), record);
          	konymp.charts.rendered++;
        }
    } catch (exception) {
        console.log(exception);
        throw exception;
    }
};

konymp.charts.prototype.addCharts = function(type, id, record) {
    try {
        var ctx = document.getElementById(id).getContext('2d');
        Chart.pluginService.register({
            beforeDraw: function(chart, easing) {
                if (chart.config.options.chartArea && chart.config.options.chartArea.backgroundColor) {
                    var helpers = Chart.helpers;
                    var ctx = chart.chart.ctx;
                    var chartArea = chart.chartArea;

                    ctx.save();
                    ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
                    ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
                    ctx.restore();
                }
            }
        });
        var myChart = new Chart(ctx, record);
    } catch (exception) {
        console.log(exception);
        throw exception;
    }
};
konymp.charts.prototype.addGlobalConfiguration = function(global) {
    try {
        var keys = Object.keys(global);
        var customGlobal = ["animation"];
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (customGlobal.indexOf(key) >= 0) {
                var customValue = global[key];
                switch (key) {
                    case 'animation':
                        this.setConfiguration(customValue, 'animation');
                        break;
                    case 'elements':
                        this.setConfiguration(customValue, 'elements');
                        break;
                    case 'events':
                        this.setEventsConfiguration(customValue);
                        break;
                    case 'hover':
                        this.setConfiguration(customValue, 'hover');
                        break;
                    case 'legend':
                        this.setLegendsConfiguration(customValue);
                        break;
                    case 'layout':
                        this.setLayoutConfiguration(customValue);
                        break;
                    case 'plugins':
                        this.setConfiguration(customValue, 'plugins');
                        break;
                    case 'title':
                        this.setConfiguration(customValue, 'title');
                        break;
                    case 'tooltips':
                        this.setConfiguration(customValue, 'tooltips');
                        break;
                }
            } else {
                var value = global[key];              	
                Chart.defaults.global[key] = value;
            }
        }
    } catch (exception) {
        console.log(exception);
        throw exception;
    }
};
konymp.charts.prototype.setConfiguration = function(customValue, key) {
    var customKeys = Object.keys(customValue);
    for (var j = 0; j < customKeys.length; j++)
        Chart.defaults.global[key][customKeys[j]] = customValue[customKeys[j]];
};
konymp.charts.prototype.setEventsConfiguration = function(customValue) {
    Chart.defaults.global.events = customValue;
};
konymp.charts.prototype.setLegendsConfiguration = function(customValue) {
    var customKeys = Object.keys(customValue);
    for (var j = 0; j < customKeys.length; j++) {
        var key = customKeys[j];
        if (key !== 'labels')
            Chart.defaults.global.legend[key] = customValue[key];
        else {
            var labels = customValue[key];
            var labelKeys = Object.keys(labels);
            for (var k = 0; k < labelKeys.length; k++)
                 Chart.defaults.global.legend.labels[labelKeys[k]] = labels[labelKeys[k]];
        }
    }
};
konymp.charts.prototype.setLayoutConfiguration = function(customValue) {
    var customKeys = Object.keys(customValue.padding);
    for (var j = 0; j < customKeys.length; j++)
        Chart.defaults.global.layout.padding[customKeys[j]] = customValue[customKeys[j]];
};
window.addEventListener("DOMContentLoaded", function() {
 	setTimeout(onbodyload, 0);
}.bind(this), false);
onbodyload = function(){
  try{
 if(kony !== undefined && kony !== null) {
   var div = document.getElementById('konymp_browser_div');
   while (div.firstChild) {
   	div.removeChild(div.firstChild);
	} 
   //kony.evaluateJavaScriptInNativeContext("konymp_chartjs_global_function('ready')");
   kony.evaluateJavaScriptInNativeContext("konymp_chartjs_global_function",JSON.stringify(['ready']));
 }
  }
  catch(exception){
    
  }
}.bind(this); 