var chartCashBalance = {

  initializeWidget: function(parentNode, widgetModel, config) {
    //Assign custom DOM to parentNode to render this widget.  
    parentNode.innerHTML = "<div id='" + this.getCustomContainerID(widgetModel) + "' class='visualizationCashflow'></div>";

    if (this.crossCheckVariables(widgetModel)) {
      this.drawGraph(
        this.getData(widgetModel),
        this.getCustomContainerID(widgetModel)
      );
    }
  },
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
  drawGraph: function(customData, customContainerID) {
    var Options = customData.chartProperties;
    google.charts.load('current', {
      packages: ['corechart']
    });
    google.setOnLoadCallback(drawVisualization);

    function drawVisualization() {
      //This hard coded value is removed,once after integration
      var data = new google.visualization.arrayToDataTable(customData.data);

      // Create and draw the visualization.
      var container = document.getElementById(customContainerID);
      var chart = new google.visualization.ComboChart(container);

      var observer = new MutationObserver(function() {
        Array.prototype.forEach.call(container.getElementsByTagName('rect'), function(rect) {
          if (rect.getAttribute('fill') === '#4287f5') {
            rect.setAttribute('y', '0');
            rect.setAttribute('height', '200');
            rect.setAttribute('fill', 'none');
            rect.setAttribute('stroke', '#b7c5b8');
            rect.setAttribute('stroke-dasharray', '3,2');
            rect.setAttribute('stroke-width', '1');
          }
        });

        Array.prototype.forEach.call(
          container.getElementsByTagName('text'),
          function(annotation) {
            if (
              annotation.getAttribute('text-anchor') === 'middle' &&
              annotation.getAttribute('fill') === '#646464'
            ) {
              var chartLayout = chart.getChartLayoutInterface();
              annotation.setAttribute('transform', 'rotate(0)');
              annotation.setAttribute('pointer-events', 'none');
              annotation.setAttribute(
                'y',
                chartLayout.getChartAreaBoundingBox().top -
                parseInt(annotation.getAttribute('font-size')) / 2
              );

              //set sibling
              var pathSibling = annotation.parentElement;
              pathSibling = pathSibling.nextSibling ? pathSibling.nextSibling : pathSibling;
              pathSibling.setAttribute('transform', 'rotate(0)');
              pathSibling.setAttribute('pointer-events', 'none');
              pathSibling.setAttribute(
                'y',
                chartLayout.getChartAreaBoundingBox().top -
                parseInt(pathSibling.getAttribute('font-size')) / 2
              );
            }
          }
        );
      });

      observer.observe(container, {
        childList: true,
        subtree: true
      });


      google.visualization.events.addListener(chart, 'click', clearSelection);
      document.body.addEventListener('click', clearSelection, false);

      if (window.innerWidth <= 585) {
        google.visualization.events.addListener(chart, 'ready', function() {
          var axisLabels = container.getElementsByTagName('text');
          for (var i = 0; i < axisLabels.length; i++) {
            if (axisLabels[i].getAttribute('text-anchor') === 'end') {
              axisLabels[i].innerHTML = '$' + axisLabels[i].innerHTML;
            }
          }
        });
        chart.draw(data, mobileOptions);
      } else {
        chart.draw(data, Options);
      }

      function clearSelection(e) {
        if (!container.contains(e.srcElement)) {
          chart.setSelection();
        }
      }
    }
  }
};