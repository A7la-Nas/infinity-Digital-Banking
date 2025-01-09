WealthBarChart = {

   initializeWidget: function (parentNode, widgetModel) {
        var ele = document.createElement("div");
        var area = '<div id="multiLinechart" style="height:100%"></div>';
        parentNode.innerHTML = area;
        var data = widgetModel.chartData;
        WealthBarChart.modelChange(widgetModel, "Refresh", data);
        WealthBarChart.setDataForWealthBarChart(widgetModel);
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
        WealthBarChart.setDataForWealthBarChart(widgetModel);
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

    setDataForWealthBarChart: function (widgetModel) {
		  var data = widgetModel.chartData;
		 if (data && Object.keys(data).length > 0 && data != '') {
         $(document).ready(addMultiLineBarChart.bind(null,data.labels,data.data));
            //if(Object.keys(data).length !== 0){
              //  addMultiLineBarChart(null,data.labels,data.data);
		  }
    }
};