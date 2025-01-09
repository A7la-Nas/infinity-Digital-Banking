var CustomerStackedBarChart = {

  /**
   * initializeWidget : Method for used to Initilize the chart widget.
   * @member of {BarChart}
   * @param {parentNode,widgetModel} 
   * @returns {} draw the chart
   * @throws {} 
   */
  initializeWidget: function (parentNode, widgetModel, config) {
    //Assign custom DOM to parentNode to render this widget.  
    parentNode.innerHTML = "<div id='" + this.getCustomContainerID(widgetModel) + "' class='AccountingIntelligenceDashboard'></div>";

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
   * @member of {BarChart}
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
      var chart = new google.visualization.BarChart(container);

      google.visualization.events.addListener(chart, 'onmouseover', function (e) {
        scope.handleTooltip(customData, false);
      });
	  
      google.visualization.events.addListener(chart, 'select', function () {
        scope.handleTooltip(customData, true);
      });

      google.visualization.events.addListener(chart, 'onmouseout', function () {
        chart.setSelection([]);
      }); 
      var observer = new MutationObserver(function () {
        Array.prototype.forEach.call(container.getElementsByTagName('rect'), function (rect) {
          //hiding gridlines between point lines
          if (rect.getAttribute('fill') === '#ebebeb') {
            rect.setAttribute('fill', 'none');
          }
          if (rect.getAttribute('fill') === '#333333') {
            rect.setAttribute('fill', '#ebebeb');
          }
          //setting the annotation as x axis line,since in horizontal graph limited to have only one axis
          if (rect.getAttribute('fill') === '#999999') {
            rect.setAttribute('fill', 'none');
          }
          if (rect.getAttribute('fill') === '#cccccc') {
            rect.setAttribute('fill', '#e3e3e3');
          }
          if (rect.getAttribute('fill') === '#ffffff') {
            rect.setAttribute('fill', 'none');
          }
            if (rect.getAttribute('fill') === 'none' && rect.getAttribute('x') === '0' && rect.getAttribute('y') === '0' && rect.getAttribute('width') === customData.chartProperties.width) {
              rect.setAttribute('width', (parseInt(rect.getAttribute('width')) - 100).toString());
              //Update SVG
              var svg = document.querySelector('#' + customContainerID + ' svg');
              svg.setAttribute('width', (parseInt(svg.getAttribute('width')) - 100).toString());
              svg.setAttribute('style', 'overflow:visible');
          }
          var xaxisValues = document.querySelectorAll('#' + customData.chartProperties.id + ' text[text-anchor="middle"]');
          xaxisValues.forEach((text, index) => {
              if (index % 2 == 1) {
                  text.textContent = '';
              }
          });
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

  handleTooltip: function (customData, isUserAction) {
    // Get the tooltip element
    var tooltip = document.querySelector('.google-visualization-tooltip');
    if (isUserAction) {
      var strokeRect = document.querySelectorAll('#' + customData.chartProperties.id + ' rect[stroke="#ffffff"]')[0];
      if (strokeRect) {
        strokeRect.setAttribute("stroke", 'none');
      }
    }
    var barUI = document.querySelectorAll('#' + customData.chartProperties.id + ' rect');
    Array.prototype.forEach.call(barUI, function (bar) {
      if (bar.getAttribute('fill') != 'none' && bar.getAttribute('fill') != null && bar.getAttribute('fill') != '#e3e3e3' && !(bar.hasOwnProperty("logicalname")) && bar.getAttribute('stroke-width') == "0") {
        tooltip.style.top = bar.getAttribute("y") - 110 + "px";
        tooltip.style.left = (parseInt(bar.getAttribute("x")) + ((parseInt(bar.getAttribute("width")) / 2) - 125)) + "px";
      }
    });   
  }
};