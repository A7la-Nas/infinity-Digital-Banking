chartDoughnutBusinessHealth = {
    initializeWidget: function (parentNode, widgetModel, config) {
        //Assign custom DOM to parentNode to render this widget.
        parentNode.innerHTML = '<div class="bhsGraphContainer" style="width: 100%; height: 100%;"><canvas id="'+ this.getCustomContainerID(widgetModel) + '"></canvas></div>';

        if(this.crossCheckVariables(widgetModel)) {
            this.drawDonut(this.getData(widgetModel), this.getCustomContainerID(widgetModel));
        }
    },
    modelChange: function (widgetModel, propertyChanged, propertyValue) {
        //Handle widget property changes to update widget's view and
        //trigger custom events based on widget state.

        if(propertyChanged === 'data') {
            if(this.crossCheckVariables(widgetModel)) {
                this.drawDonut(this.getData(widgetModel), this.getCustomContainerID(widgetModel));
            }
        }
    },
    crossCheckVariables: function (widgetModel) {
        return this.getData(widgetModel) !== '' && this.getCustomContainerID(widgetModel) !== '';
    },
    getData: function (widget) {
        return widget.data;
    },
    getCustomContainerID: function (widget) {
        return widget.customContainerID;
    },
    drawDonut: function (customData, customContainerID) {
        var chartFill = Math.round(parseFloat(customData));
        var chartRemainder = 100 - chartFill;

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
                if (chart.config.options.elements.bhsText) {
                    var helpers = Chart.helpers;
                    var centerConfig = chart.config.options.elements.bhsText;
                    var globalConfig = Chart.defaults.global;

                    var fontStyle = helpers.getValueOrDefault(
                        centerConfig.fontStyle,
                        globalConfig.defaultFontStyle
                    );
                    var fontFamily = helpers.getValueOrDefault(
                        centerConfig.fontFamily,
                        globalConfig.defaultFontFamily
                    );

                    var fontSize = centerConfig.fontSize ? centerConfig.fontSize : ((chart.chartArea.bottom - chart.chartArea.top) / 12);

                    chart.bhsText = {
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
                    var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);//*0.85;
                    ctx.fillText(centerConfig.text, centerX, centerY);
                    ctx.restore();
                }
                if (chart.bhsText) {
                    var centerConfig = chart.config.options.elements.bhsText;
                    var ctx = chart.chart.ctx;

                    ctx.save();
                    ctx.font = chart.bhsText.font;
                    ctx.fillStyle = chart.bhsText.fillStyle;
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
                    var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2)*1.35;
                    ctx.fillText(centerConfig.text, centerX, centerY);
                    ctx.restore();
                }
            }
        });

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
                        fontColor: "#707070",
                        fontFamily: "CircularStd-Book",
                        fontStyle: "normal",
                    }//,
                    // bhsText: {
                    //     text: "Health Score",
                    //     fontColor: "#707070",
                    //     fontFamily: "CircularStd-Book",
                    //     fontStyle: "normal",
                    // }
                },
                cutoutPercentage: 80,
                rotation: Math.PI * 0.5,
                legend: { display: false },
                tooltips: { enabled: false },
                responsive: true,
                maintainAspectRatio: false
            }
        };

        if(this.myDoughnut && this.myDoughnut.config.customContainerID === customContainerID) {
            this.myDoughnut.destroy();
        }
        var element = document.getElementById(customContainerID);
        if(element) {
            var ctx = document.getElementById(customContainerID).getContext("2d");
            this.myDoughnut = new Chart(ctx, config);
        }
    }
};