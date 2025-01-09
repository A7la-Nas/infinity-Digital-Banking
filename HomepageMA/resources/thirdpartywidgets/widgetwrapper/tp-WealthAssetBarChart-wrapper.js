WealthAssetBarChart = {

   initializeWidget: function (parentNode, widgetModel) {
        var ele = document.createElement("div");
        var area = '<div id="assetLinechart"></div>';
        parentNode.innerHTML = area;
        var data = widgetModel.chartData;
        WealthAssetBarChart.modelChange(widgetModel, "Refresh", data);
        WealthAssetBarChart.setDataForWealthAssetBarChart(widgetModel);
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
        WealthAssetBarChart.setDataForWealthAssetBarChart(widgetModel);
    },

   /**
    * setDataForDonutChart : used to create a chart widget.
    * @member of {BarChart}
    * @param {widgetModel} /get All monthly data
    * @returns {} update the current chart
    * @throws {} 
    * value -- Used to display the bar width.
    * label --  Used to display the label.
    */

    setDataForWealthAssetBarChart: function (widgetModel) {
		var data = widgetModel.chartData;
		if (data && Object.keys(data).length > 0 && data != '') {
			// if(Object.keys(data).length !== 0){
			//addAssetLineChart(null,data.labels,data.data);
           $(document).ready(addAssetLineChart.bind(null,data.labels,data.data));
		}
    }
};