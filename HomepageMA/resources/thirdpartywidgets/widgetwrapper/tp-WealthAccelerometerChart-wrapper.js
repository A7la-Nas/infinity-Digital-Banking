WealthAccelerometerChart = {

   initializeWidget: function (parentNode, widgetModel) {
        var ele = document.createElement("div");
     //   var area = '<div id="WealthAccelerometerChart" style = "height:100%;  width:100%;"></div>';
		var area ='<div id="parent" style="height:100%; margin: auto; width: 100%;"><canvas id="canvas" ></canvas><span id="needle"></span></div>	';
        parentNode.innerHTML = area;
        var data = widgetModel.chartData;
        WealthAccelerometerChart.modelChange(widgetModel, "Refresh", data);
        WealthAccelerometerChart.setDataForWealthAccelerometerChart(widgetModel);
    },

     /**
    * modelChange : Method for used to update the chart widget.
    *  Event faired widgetModel propertyChanged
    * @member of {BarChart}
    * @param {widgetModel, propertyChanged, propertyValue} /get All monthly data
    * @returns {} update the current chart
    * @throws {} 
    */

    modelChange: function (widgetModel, propertyChanged, propertyValue) {
      WealthAccelerometerChart.setDataForWealthAccelerometerChart(widgetModel);
    },

   /**
    * setDataForWealthRiskAnalysisGraph : used to create a chart widget.
    * @member of {DonutChart}
    * @param {widgetModel} /get All monthly data
    * @returns {} update the current chart
    * @throws {} 
    * value -- Used to display the bar width.
    * label --  Used to display the label.
    */

    setDataForWealthAccelerometerChart: function (widgetModel) {
      var data = widgetModel.chartData;
      if(Object.keys(data).length !== 0){
		
		$(document).ready(document.getElementById('parent') ?	setArc.bind(null,data) : null);
		//$(document).ready(setArc.bind(null,data) );
      }
    }
};