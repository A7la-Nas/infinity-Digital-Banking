var ProbableChart = {

  /**
   * initializeWidget : Method for used to Initilize the chart widget.
   * @member of {BarChart}
   * @param {parentNode,widgetModel} 
   * @returns {} draw the chart
   * @throws {} 
   */
  initializeWidget: function (parentNode, widgetModel) {
    //Assign custom DOM to parentNode to render this widget.  
    parentNode.innerHTML = '<div class="accountsIntelligenceDashboard" style="width: 100%; height: 100%;"><canvas id="' + this.getCustomContainerID(widgetModel) + '"></canvas></div>';
    probableTooltip = "";
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
   * @param {widgetModel, propertyChanged} 
   * @returns {} update the current chart
   * @throws {} 
   */
  modelChange: function (widgetModel, propertyChanged) {
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
  drawGraph: function (chartData, customContainerID) {
    var ctx = document.getElementById(customContainerID).getContext('2d');
    var customLines = {
      id: 'customLines',
      afterDraw: function (chart) {
        var ctx = chart.ctx;
        var datasetMeta = chart.getDatasetMeta(0);
        var dataset = chart.data.datasets[0];
        var data = dataset.data;
        // Define line width
        for (var i = 1; i <= data.length - 1;) {
          // Draw lines between candles
          var candle1 = data[i - 1];
          var candle2 = data[i];
          var middle1 = datasetMeta.data[i - 1].getCenterPoint();
          var middle2 = datasetMeta.data[i].getCenterPoint();

          //var gradient = ctx.createLinearGradient(x1, y1, x2, y2);
          var gradient = ctx.createLinearGradient(middle1.x, middle1.y, middle2.x, middle2.y);
          gradient.addColorStop(candle1.o < candle2.o ? 0 : 1, 'rgba(219, 17, 17, 1)');  // end red color for the gradient line
          gradient.addColorStop(candle1.o < candle2.o ? 1 : 0, 'rgba(20, 193, 48, 1)'); // Start green color for the gradient line
          ctx.save();
          ctx.strokeStyle = gradient; // Define line color
          ctx.lineWidth = 1;

          ctx.beginPath();
          ctx.moveTo(middle1.x, middle1.y);
          ctx.lineTo(middle2.x, middle2.y);
          ctx.stroke();
          i += 2;
        }
        ctx.restore();
      }
    };

    var formatYaxis = {
      id: 'formatYaxis',
      afterDraw: function (chart) {
        var ctx = chart.ctx;
        ctx.save();
        var yAxis = chart.scales['y'];
        yAxis.ticks.forEach(function (label, index) {
          var y = yAxis.getPixelForTick(index);
          ctx.fillStyle = '#424242';
          ctx.font = 'bold 13px Source Sans Pro';
          ctx.fillText(`$${label.value}`, parseInt(chart.scales.y.right) - 40, y + 20);
        });
        ctx.restore();
      }
    };

    var chart = new Chart(ctx, {
      type: 'candlestick',
      data: {
        datasets: [{
          label: '',
          data: chartData.data,
          barPercentage: 0.2, // Adjust this value to control the width
          borderWidth: 2,
          borderColor: {
            up: 'rgba(21, 193, 49, 0.4)',
            down: 'rgba(220, 18, 18, 0.4)',
            unchanged: 'rgba(21, 193, 49, 0.4)'
          },
          categoryPercentage: 0.4,
          color: {
            up: 'rgba(21, 193, 49, 1)',
            down: 'rgba(220, 18, 18, 1)',
            unchanged: 'rgba(21, 193, 49, 1)'
          }
        }]
      },
      plugins: [customLines, formatYaxis],
      options: {
        plugins: {
          legend: {
            display: false,
          },
          zoom: {
            display: false,
          },
          interaction: {
            mode: 'index',
            intersect: false
          },
          tooltip: {
            // Disable the on-canvas tooltip
            enabled: false,
            position: 'nearest',
          }
        },
        scales: {
          x: {
            font: {
              size: 15,
              color: '#424242',
            },
            time: {
              unit: 'month', // Set the time unit to 'month'
              displayFormats: {
                month: 'MMM' // Display short month name (e.g., Jan, Feb, etc.)
              },
            },
            //for showing grid from axis
            // grid: {
            //   offset: true
            // }
          },
          y: {
            ticks: {
              callback: function (value, index) {
                // Display string labels based on the y-value
                if (index % 2) {
                  return chartData.data[index].label; // Use the 'label' property from the data
                }
              },
            },
            suggestedMax: chartData.data[chartData.data.length - 1].o + 10,
          }
        },

        onHover: (event) => {
          var chartInstance = event.chart;
          var tooltip = event.chart.tooltip;
          var point = chartInstance.getElementsAtEventForMode(event, 'nearest', chartInstance.options);

          if (point.length > 0) {
            // Show external tooltip if hovering over a data point
            probableTooltip = getOrCreateTooltip(chart, point);

            // Display, position, and set styles for font
            probableTooltip.style.opacity = 1;
            probableTooltip.style.left = (point[0].element.x - 135) + 'px';
            probableTooltip.style.top = (point[0].element.y - 179) + 'px';
            probableTooltip.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
          }
        },
      }
    });

    var getOrCreateTooltip = (chart, context) => {
      var tooltipEl = chart.canvas.parentNode.querySelector('div');
      var hoveredData = chart.data.datasets[context[0].datasetIndex].data[context[0].index];
      var dueDate = new Date(hoveredData.dueDate);
      var probableDate = new Date(hoveredData.probableDate);
      var formattedDueDate = formatDate(dueDate);
      var formattedProbableDate = formatDate(probableDate);
      if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.className = "probableMainContent";
        tooltipEl.style.height = "159px";
        tooltipEl.style.width = "269px";
        tooltipEl.style.zIndex = "10";
        tooltipEl.innerHTML = '<div class="probableHeader"><p id="probableHeading">' + hoveredData.business + '</p></div><p id="probableSubHeading"> Average Payment Days ' + hoveredData.paymentDays + ' </p><div class="probableContent"><div class="probableRowContent">        <div class="probableRow"><div class="probabeLeftLabel"><span class="probableLabel">Receivable Amount</div></span></span><span class="probableValue">' + `$${hoveredData.amount}.00` + '</span></div>        <div class="probableRow"><div class="probabeLeftLabel"><span class="probableLabel">Invoice Count</span></div><span class="probableValue">' + hoveredData.invoiceCount + '</span></div>        <div class="probableRow"><div class="probabeLeftLabel"><span class="probableLabel">Due Date</div></span></span><span class="probableValue">' + formattedDueDate + '</span></div>        <div class="probableRow"><div class="probabeLeftContent"><span class="probableLabel">Probale payment date</span></div><span class="probableValue">' + formattedProbableDate + '</span></div>        </div></div>';
        chart.canvas.parentNode.appendChild(tooltipEl);
      } else {
        tooltipEl.innerHTML = '<div class="probableHeader"><p id="probableHeading">' + hoveredData.business + '</p></div><p id="probableSubHeading"> Average Payment Days ' + hoveredData.paymentDays + ' </p><div class="probableContent"><div class="probableRowContent">        <div class="probableRow"><div class="probabeLeftLabel"><span class="probableLabel">Receivable Amount</div></span></span><span class="probableValue">' + `$${hoveredData.amount}.00` + '</span></div>        <div class="probableRow"><div class="probabeLeftLabel"><span class="probableLabel">Invoice Count</span></div><span class="probableValue">' + hoveredData.invoiceCount + '</span></div>        <div class="probableRow"><div class="probabeLeftLabel"><span class="probableLabel">Due Date</div></span></span><span class="probableValue">' + formattedDueDate + '</span></div>        <div class="probableRow"><div class="probabeLeftContent"><span class="probableLabel">Probale payment date</span></div><span class="probableValue">' + formattedProbableDate + '</span></div>        </div></div>';
      }
      return tooltipEl;
    };

    formatDate = function (date) {
      return `${date.getDate()}` + ` ${date.toLocaleString('default', { month: 'short' })}` + `, ${date.toLocaleDateString('en', { year: '2-digit' })}`;
    };

    // Disable zoom events for the chart canvas
    chart.canvas.addEventListener('wheel', function (event) {
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault(); // Prevent default zoom behavior
      }
    });

    chart.canvas.addEventListener('mousemove', function (event) {
      if (probableTooltip) {
        var chartArea = chart.chartArea;
        if (Math.abs(event.offsetX) >= Math.abs(chartArea.left - 20) && Math.abs(event.offsetX) <= Math.abs(chartArea.right - 20) &&
          Math.abs(event.offsetY) >= Math.abs(chartArea.top - 20) && Math.abs(event.offsetY) <= Math.abs(chartArea.bottom - 20)) {
          // Mouse is inside the chart area
          probableTooltip.style.display = 'block';
        } else {
          // Mouse is outside the chart area
          probableTooltip.style.display = 'none';
        }
      }
    });
  }
};