var PieChart = {
    /**
     * initializeWidget : Method for used to Initilize the chart widget.
     * @member of {BarChart}
     * @param {parentNode,widgetModel} 
     * @returns {} draw the chart
     * @throws {} 
     */
    initializeWidget: function(parentNode, widgetModel, config) {
      //Assign custom DOM to parentNode to render this widget.  
      parentNode.innerHTML = "<div id='" + this.getCustomContainerID(widgetModel) + "' class='visualizationOverdue'></div>";
  
      if (this.crossCheckVariables(widgetModel)) {
        this.drawGraph(
          this.getData(widgetModel),
          this.getCustomContainerID(widgetModel)
        );
      }
    },
  
    /**
     * modelChange : Method for used to update the chart widget.
     * @member of {BarChart}
     * @param {widgetModel, propertyChanged, propertyValue} 
     * @returns {} update the current chart
     * @throws {} 
     */
    modelChange: function(widgetModel, propertyChanged, propertyValue) {
      //Handle widget property changes to update widget's view and
      //trigger custom events based on widget state.
  
      if (propertyChanged === 'data') {
        if (this.crossCheckVariables(widgetModel)) {
          this.drawGraph(
            this.getData(widgetModel),
            this.getCustomContainerID(widgetModel)
          );
        }
      }
    },
    crossCheckVariables: function(widgetModel) {
      return (
        this.getDataAsString(widgetModel) !== '' &&
        this.getCustomContainerID(widgetModel) !== ''
      );
    },
    getDataAsString: function(widget) {
      return widget.data;
    },
    getData: function(widget) {
      return JSON.parse(widget.data || '{}');
    },
    getCustomContainerID: function(widget) {
      return widget.customContainerID;
    },
  
    /**
     * drawGraph : used to create a chart widget.
     * @member of {BarChart}
     * @param {} 
     * @returns {} update the current chart
     * @throws {} 
     */
    drawGraph: function(customData, customContainerID) {
      //Options - defines the chart UI properties
      var Options = customData.chartProperties;
  
      //this is used to load current packages needed for charts
      google.charts.load('current', {
        packages: ['corechart']
      });
      google.setOnLoadCallback(drawVisualization);
  
      function drawVisualization() {
        // Create and draw the visualization.
        var container = document.getElementById(customContainerID);
        var chart = new google.visualization.PieChart(container);
  
        var data = new google.visualization.arrayToDataTable(customData.data);
        chart.draw(data, Options);
      }
    }
  };