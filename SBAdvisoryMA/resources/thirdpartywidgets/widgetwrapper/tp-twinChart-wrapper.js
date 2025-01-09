
twinChart = {

    /**
  * initializeWidget : Method for used to Initilize the chart widget.
  * @member of {twinChart}
  * @param {parentNode,widgetModel} /get All monthly data
  * @returns {} draw the chart
  * @throws {} 
  */

    initializeWidget: function (parentNode, widgetModel) {
		if(window.innerWidth <=640){
        var area = '<div id="comboChart_div" style="width: 660px;"></div>';
		}else
		var area = '<div id="comboChart_div"></div>';	
        parentNode.innerHTML = area;
        google.charts.load('45', { packages: ["corechart"] });
        var data = widgetModel.chartData;
        twinChart.modelChange(widgetModel, "Refresh", data);
        twinChart.setDataFortwinChart(widgetModel);
    },

    /**
    * modelChange : Method for used to update the chart widget.
    * @member of {twinChart}
    * @param {widgetModel, propertyChanged, propertyValue} /get All monthly data
    * @returns {} update the current chart
    * @throws {} 
    */

    modelChange: function (widgetModel, propertyChanged, propertyValue) {
        twinChart.setDataFortwinChart(widgetModel);
    },

    /**
    * setDataFortwinChart : used to create a chart widget.
    * @member of {twinChart}
    * @param {widgetModel} /get All monthly data
    * @returns {} update the current chart
    * @throws {} 
    * value -- Used to display the bar width.
    * label --  Used to display the label.
    */

    setDataFortwinChart: function (widgetModel) {
        google.charts.load('45', { packages: ["corechart"] });
        var data = widgetModel.chartData;
        var selectedBarData = data;
        var dataToShow = data;
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var data = google.visualization.arrayToDataTable(dataToShow);
            var options = widgetModel.chartProperties;
            var chart = new google.visualization.ComboChart(document.getElementById('comboChart_div'));
			var container = document.getElementById('comboChart_div');
  
        var observer = new MutationObserver(function () {
          Array.prototype.forEach.call(container.getElementsByTagName('rect'), function(rect) {
				if (rect.getAttribute('fill') === '#4287f5') {
					rect.setAttribute('y','0');
					rect.setAttribute('height','200');
					rect.setAttribute('fill','none');
					rect.setAttribute('stroke','#b7c5b8');
					rect.setAttribute('stroke-dasharray','3,2');
					rect.setAttribute('stroke-width','1');
				}
			});
			Array.prototype.forEach.call(
            container.getElementsByTagName('text'),
            function (annotation) {
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
                pathSibling = pathSibling.nextSibling;
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
  
        observer.observe(container, { childList: true, subtree: true });
            var listner = function () {
                var selectedItem = chart.getSelection()[0];
                if (selectedItem) {
                    widgetModel.onClickOfBar(selectedBarData[selectedItem.row+1]);
                }
            }
            var getMousePointer = function () {
                 document.getElementById('comboChart_div').style.cursor = "pointer";
            }
            var getMouseDefaultPointer = function () {
                document.getElementById('comboChart_div').style.cursor = "default";
            }
            google.visualization.events.addListener(chart, 'select', listner);
            google.visualization.events.addListener(chart, 'onmouseover', getMousePointer);
            google.visualization.events.addListener(chart, 'onmouseout', getMouseDefaultPointer);
            if(data.Tf)
            {
              if(data.Tf.length !==0)
              chart.draw(data, options);
            }
        }
    }
}