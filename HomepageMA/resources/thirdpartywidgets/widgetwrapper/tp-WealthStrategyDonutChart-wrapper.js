WealthStrategyDonutChart = {
   parentId:"",
   initializeWidget: function (parentNode, widgetModel) {
	   debugger;
	   //alert("wrapper");
        var ele = document.createElement("div");
        var id= "StrategyDonutChart"+ parentNode.id;
        this.parentId="#"+id;
        var area = '<div id=' + id +'  style = "height:100%;  width:100%;"></div>';
        parentNode.innerHTML = area;
        var data = widgetModel.chartData;
        WealthStrategyDonutChart.modelChange(widgetModel, "Refresh", data);
        WealthStrategyDonutChart.setDataForStrategyDonutChart(widgetModel);
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
		debugger;
        WealthStrategyDonutChart.setDataForStrategyDonutChart(widgetModel);
    },

   /**
    * setDataForStrategyDonutChart : used to create a chart widget.
    * @member of {DonutChart}
    * @param {widgetModel} /get All monthly data
    * @returns {} update the current chart
    * @throws {} 
    * value -- Used to display the bar width.
    * label --  Used to display the label.
    */

    setDataForStrategyDonutChart: function (widgetModel) {
		debugger;
		
      var data = widgetModel.chartData;
	  var radius=widgetModel.chartDonutWidth;
      if(Object.keys(data).length !== 0){
		var temp = this.parentId.substring(1);
		$(document).ready(
			document.getElementById(temp) ?
				drawStrategyDonutChart.bind(null, data,this.parentId,radius) : null
        );
      }
    }
};
