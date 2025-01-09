var DoughnutChart = {

    /**
     * initializeWidget : Method for used to Initilize the chart widget.
     * @member of {BarChart}
     * @param {parentNode,widgetModel} 
     * @returns {} draw the chart
     * @throws {} 
     */
    initializeWidget: function(parentNode, widgetModel, config) {
        //Assign custom DOM to parentNode to render this widget.  
        parentNode.innerHTML = '<div class="visualizationDashboard" style="width: 100%; height: 100%;"><canvas id="'+ this.getCustomContainerID(widgetModel) + '"></canvas></div>';

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
        var chartFill = customData.healthScore;
        var chartRemainder = 100 - chartFill;
        //It holds the chart UI properties
        var config = {
            type: "doughnut",
            customContainerID: customContainerID,
            data: {
                datasets: [
                    {
                        data: [chartFill, chartRemainder],
                        backgroundColor: ["#008392", "rgba(220,226,233,0.6)"],
                        hoverBackgroundColor: ["#008392", "rgba(220,226,233,0.6)"],
                        borderWidth: [0, 0]
                    }
                ]
            },
            options: {
                elements: {
                    arc: { roundedCornersFor: 0 },
                    center: {
                        maxText: "100",
                        text: chartFill,
                        fontColor: "#424242",
                        fontFamily: "CircularStd-Book",
                        fontStyle: "normal",
                    }
                },
                cutoutPercentage: 80,
                rotation: Math.PI * 0.5,
                legend: { display: false },
                tooltips: { enabled: false },
                responsive: true,
                maintainAspectRatio: false
            }
        };

        // DONUT CHART ITSELF
        Chart.pluginService.register({
            afterUpdate: function (chart) {
                if (chart.config.options.elements.arc.roundedCornersFor !== undefined) {
                    var arc = chart.getDatasetMeta(0).data[
                        chart.config.options.elements.arc.roundedCornersFor
                    ];
                    arc.round = {
                        x: (chart.chartArea.left + chart.chartArea.right) / 2,
                        y: (chart.chartArea.top + chart.chartArea.bottom) / 2,
                        radius: (chart.outerRadius + chart.innerRadius) / 2,
                        thickness: (chart.outerRadius - chart.innerRadius) / 2 - 1,
                        backgroundColor: arc._model.backgroundColor
                    };
                }
            },
            afterDraw: function (chart) {
                if (chart.config.options.elements.arc.roundedCornersFor !== undefined) {
                    var ctx = chart.chart.ctx;
                    var arc = chart.getDatasetMeta(0).data[
                        chart.config.options.elements.arc.roundedCornersFor
                    ];
                    var startAngle = Math.PI / 2 - arc._view.startAngle;
                    var endAngle = Math.PI / 2 - arc._view.endAngle;

                    ctx.save();
                    ctx.translate(arc.round.x, arc.round.y);
                    ctx.fillStyle = arc.round.backgroundColor;
                    ctx.beginPath();
                    ctx.arc(
                        arc.round.radius * Math.sin(startAngle),
                        arc.round.radius * Math.cos(startAngle),
                        arc.round.thickness,
                        0,
                        2 * Math.PI
                    );
                    ctx.arc(
                        arc.round.radius * Math.sin(endAngle),
                        arc.round.radius * Math.cos(endAngle),
                        arc.round.thickness,
                        0,
                        2 * Math.PI
                    );
                    ctx.closePath();
                    ctx.fill();
                    ctx.restore();
                }
            }
        }); 

        // TEXT IN CENTER
        Chart.pluginService.register({
            afterUpdate: function (chart) {
                if (chart.config.options.elements.center) {
                    var helpers = Chart.helpers;
                    var centerConfig = chart.config.options.elements.center;
                    var globalConfig = Chart.defaults.global;

                    var fontStyle = helpers.getValueOrDefault(
                        centerConfig.fontStyle,
                        globalConfig.defaultFontStyle
                    );
                    var fontFamily = helpers.getValueOrDefault(
                        centerConfig.fontFamily,
                        globalConfig.defaultFontFamily
                    );

                    var fontSize = centerConfig.fontSize ? centerConfig.fontSize : ((chart.chartArea.bottom - chart.chartArea.top) / 3);

                    chart.center = {
                        font: helpers.fontString(fontSize, fontStyle, fontFamily),
                        fillStyle: helpers.getValueOrDefault(
                            centerConfig.fontColor,
                            globalConfig.defaultFontColor
                        )
                    };
                }
            },
            afterDraw: function (chart) {
                if (chart.center) {
                    var centerConfig = chart.config.options.elements.center;
                    var ctx = chart.chart.ctx;

                    ctx.save();
                    ctx.font = chart.center.font;
                    ctx.fillStyle = chart.center.fillStyle;
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
                    var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
                    ctx.fillText(centerConfig.text, centerX, centerY);
                    ctx.restore();
                }
            }
        });
        var container = document.getElementById(customContainerID).getContext("2d");
        this.myDoughnut = new Chart(container, config);
      }
};