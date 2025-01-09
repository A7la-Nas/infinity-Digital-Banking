var BreakdownDoughnutChart = {

  /**
   * initializeWidget : Method for used to Initilize the chart widget.
   * @member of {PieChart}
   * @param {parentNode,widgetModel} 
   * @returns {} draw the chart
   * @throws {} 
   */
  initializeWidget: function (parentNode, widgetModel) {
    //Assign custom DOM to parentNode to render this widget.  
    parentNode.innerHTML = "<div id='" + this.getCustomContainerID(widgetModel) + "' class='AccountingIntelligenceDashboard'></div>";
    this.selectedSlice;
    if (this.crossCheckVariables(widgetModel)) {
      this.drawGraph(
        this.getData(widgetModel),
        this.getCustomContainerID(widgetModel)
      );
    }
  },

  /**
   * modelChange : Method for used to update the chart widget.
   * @member of {PieChart}
   * @param {widgetModel, propertyChanged, propertyValue} 
   * @returns {} update the current chart
   * @throws {} 
   */
  modelChange: function (widgetModel, propertyChanged, propertyValue) {
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
  crossCheckVariables: function (widgetModel) {
    return (
      this.getDataAsString(widgetModel) !== '' &&
      this.getCustomContainerID(widgetModel) !== ''
    );
  },
  getDataAsString: function (widget) {
    return widget.data;
  },
  getData: function (widget) {
    return JSON.parse(widget.data || '{}');
  },
  getCustomContainerID: function (widget) {
    return widget.customContainerID;
  },

  /**
   * drawGraph : used to create a chart widget.
   * @member of {PieChart}
   * @param {} 
   * @returns {} update the current chart
   * @throws {} 
   */
  drawGraph: function (customData, customContainerID) {
    var scope = this;
    //Options - defines the chart UI properties
    var Options = customData.chartProperties;

    //this is used to load current packages needed for charts
    google.charts.load('current', {
      packages: ['corechart']
    });
    google.charts.setOnLoadCallback(drawVisualization);

    function drawVisualization() {
      // Create and draw the visualization.
      var container = document.getElementById(customContainerID);
      var chart = new google.visualization.PieChart(container);

      google.visualization.events.addListener(chart, 'onmouseover', function (e) {
        selectedSlice = e;
        scope.handleTooltip();
      });

      google.visualization.events.addListener(chart, 'select', function (e) {
        scope.handleTooltip();
      });

      google.visualization.events.addListener(chart, 'onmouseout', function () {
        chart.setSelection([]);
      });
      var observer = new MutationObserver(function () {
        Array.prototype.forEach.call(container.getElementsByTagName('rect'), function (rect) {
          if (rect.getAttribute('fill') === '#ffffff') {
            rect.setAttribute('fill', 'none')
          }
        });
      });

      observer.observe(container, {
        childList: true,
        subtree: true
      });
      var data = new google.visualization.arrayToDataTable(customData.data);
      chart.draw(data, Options);
    }
  },
  handleTooltip: function () {
    // Get the tooltip element
    var tooltip = document.querySelector('.google-visualization-tooltip');
    var barUI = document.querySelectorAll('#BreakdownDoughnutChart path');
    Array.prototype.forEach.call(barUI, function (bar) {
      if (bar.parentElement.logicalname.slice(-1) == selectedSlice.row && bar.getAttribute('stroke-width') === "1") {
        // Customize the tooltip's position
        tooltip.style.top = (bar.getBBox().y - 50) + "px";
        tooltip.style.left = ((bar.getBBox().x + (bar.getBoundingClientRect().width / 2)) - 100) + "px";
      } else {
        if (bar.getAttribute('stroke-opacity') === "0.3") {
          bar.setAttribute('stroke', '#ffffff');
        } else if (bar.getAttribute('stroke-width') !== 1) {
          bar.setAttribute('stroke', '#ffffff');
        }
      }
    });
  }
};