var SBAMultiLineChart = {
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
    drawGraph: function (Chartdata, customContainerID) {
        var presenter = applicationManager.getModulesPresentationController({ appName: 'SBAdvisoryMA', moduleName: 'AcIntelligenceDashboardUIModule' });
        var ctx = document.getElementById(customContainerID).getContext('2d');
        var maxDataValue = Math.max(...Chartdata.data.datasets[0].data);
        var minDataValue = Math.min(...Chartdata.data.datasets[0].data);
        var dataRange = maxDataValue - minDataValue;
        var suggestedStepSize = Math.ceil(dataRange / 3);
        var chart = new Chart(ctx, {
            // const config = {
            type: 'line',
            data: Chartdata.data,
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
                    id: ['customLines', 'formatYaxis'],
                    tooltip: {
                        // Disable the on-canvas tooltip
                        enabled: false,
                        position: 'nearest',
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: true, // Set to false to hide the x-axis grid lines
                        },
                    },
                    y: {
                        grid: {
                            display: true,
                        },
                        ticks: {
                            stepSize: suggestedStepSize,
                            callback: function (value, index, values) {
                                return presenter.getFormateCurrency(value);
                            } // Set the step size between ticks on the x-axis
                        } // Set the maximum number of ticks on the Y-axis
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
                        if (Chartdata.data.datasets.length > 2) {
                            probableTooltip.style.left = (point[0].element.x - 326) + 'px';
                            probableTooltip.style.top = (point[0].element.y - 235) + 'px';
                        } else {
                            probableTooltip.style.left = (point[0].element.x - 135) + 'px';
                            probableTooltip.style.top = (point[0].element.y - 145) + 'px';
                        }
                        probableTooltip.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
                    }
                },
            }
        });
        var getOrCreateTooltip = (chart, context) => {
            var tooltipEl = chart.canvas.parentNode.querySelector('div');
            var dueDate = new Date(chart.data.labels[context[0].index]);
            var formattedDueDate = `${dueDate.getDate()}` + ` ${dueDate.toLocaleString('default', { month: 'short' })}` + ` ${dueDate.getFullYear()}`;
            if (!tooltipEl) {
                tooltipEl = document.createElement('div');
                tooltipEl.className = "probableMainContent";
                if (Chartdata.data.datasets.length > 2) {
                    tooltipEl.style.height = "225px";
                    tooltipEl.style.width = "655px";
                    tooltipEl.innerHTML = '<div class="outer-container"> <div> <p id="probableMainSubHeading"> ' + formattedDueDate + ' </p> </div> <div class="row"> <div class="col"> <div class="probableHeaderSubHeadCls"> <p id="probableSubHeadingBold">Expected</p> </div> </div> <div class="col"> <div class="probableHeaderSubHeadCls"> <p id="probableSubHeadingBold">Probable</p> </div> </div> <div class="col"> <div class="probableHeaderSubHeadCls"> <p id="probableSubHeadingBold">Short Fall</p> </div> </div> </div> <div class="row1"> <div class="col"> <div class="probableContentCls"> <div class="probableRowContentCls"> <div class="probableRowCls"> <div class="probabeLeftLabel"><span class="probableLabelCls">Amount</div> </span></span><span class="probableValue">' + chart.data.datasets[context[0].datasetIndex].data[context[0].index] + '</span> </div> </div> </div> </div> <div class="col"> <div class="probableContentCls"> <div class="probableRowContentCls"> <div class="probableRowCls"> <div class="probabeLeftLabel"><span class="probableLabelCls">Amount</div> </span></span><span class="probableValue">' + chart.data.datasets[context[0].datasetIndex].data[context[0].index] + '</span> </div> </div> </div> </div> <div class="col"> <div class="probableContentCls"> <div class="probableRowContentCls"> <div class="probableRowCls"> <div class="probabeLeftLabel"><span class="probableLabelCls">Amount</div> </span></span><span class="probableValue">' + chart.data.datasets[context[0].datasetIndex].data[context[0].index] + '</span> </div> </div> </div> </div> </div> <div class="row2"> <div class="col"> <div class="probableContentCls"> <div class="probableRowContentCls"> <div class="probableRowCls"> <div class="probabeLeftLabel"><span class="probableLabelCls">Invoice Count</span></div> <span class="probableValue">totalVal</span> </div> </div> </div> </div> <div class="col"> <div class="probableContentCls"> <div class="probableRowContentCls"> <div class="probableRowCls"> <div class="probabeLeftLabel"><span class="probableLabelCls">Invoice Count</span></div> <span class="probableValue">totalVal</span> </div> </div> </div> </div> <div class="col"> <div class="probableContentCls"> <div class="probableRowContentCls"> <div class="probableRowCls"> <div class="probabeLeftLabel"><span class="probableLabelCls">Invoice Count</span></div> <span class="probableValue">totalVal</span> </div> </div> </div> </div> </div> <div class="row"> <div class="col"> <div class="probableHeaderSubHeadCls"> <p id="probableSubHeadingBold">Expected</p> </div> </div> <div class="col"> <div class="probableHeaderSubHeadCls"> <p id="probableSubHeadingBold">Cash inflow with Incentives</p> </div> </div> <div class="col"> <div class="probableHeaderSubHeadCls"> <p id="probableSubHeadingBold">Short Fall</p> </div> </div> </div> <div class="row1"> <div class="col"> <div class="probableContentCls"> <div class="probableRowContentCls"> <div class="probableRowCls"> <div class="probabeLeftLabel"><span class="probableLabelCls">Amount</div> </span><span class="probableValue">' + chart.data.datasets[context[0].datasetIndex].data[context[0].index] + '</span> </div> </div> </div> </div> <div class="col"> <div class="probableContentCls"> <div class="probableRowContentCls"> <div class="probableRowCls"> <div class="probabeLeftLabel"><span class="probableLabelCls">Amount</div> </span><span class="probableValue">' + chart.data.datasets[context[0].datasetIndex].data[context[0].index] + '</span> </div> </div> </div> </div> <div class="col"> <div class="probableContentCls"> <div class="probableRowContentCls"> <div class="probableRowCls"> <div class="probabeLeftLabel"><span class="probableLabelCls">Amount</div> </span><span class="probableValue">' + chart.data.datasets[context[0].datasetIndex].data[context[0].index] + '</span> </div> </div> </div> </div> </div> <div class="row2"> <div class="col"> <div class="probableContentCls"> <div class="probableRowContentCls"> <div class="probableRowCls"> <div class="probabeLeftLabel"><span class="probableLabelCls">Invoice Count</span></div> <span class="probableValue">totalVal</span> </div> </div> </div> </div> <div class="col"> <div class="probableContentCls"> <div class="probableRowContentCls"> <div class="probableRowCls"> <div class="probabeLeftLabel"><span class="probableLabelCls">Invoice Count</span></div> <span class="probableValue">totalVal</span> </div> </div> </div> </div> <div class="col"> <div class="probableContentCls"> <div class="probableRowContentCls"> <div class="probableRowCls"> <div class="probabeLeftLabel"><span class="probableLabelCls">Invoice Count</span></div> <span class="probableValue">totalVal</span> </div> </div> </div> </div> </div> </div>';
                } else {
                    tooltipEl.style.height = "131px";
                    tooltipEl.style.width = "269px";
                    tooltipEl.innerHTML = '<div class="probableHeader"><p id="probableHeading"> Expected Receivable Amount </p></div><p id="probableSubHeading"> ' + formattedDueDate + ' </p><div class="probableContent"><div class="probableRowContent">        <div class="probableRow"><div class="probabeLeftLabel"><span class="probableLabel">Receivable Amount</div></span></span><span class="probableValue">' + '$'+chart.data.datasets[context[0].datasetIndex].data[context[0].index] +'.00' + '</span></div>        <div class="probableRow"><div class="probabeLeftLabel"><span class="probableLabel">totalReceivables</span></div><span class="probableValue">8</span></div> </div></div>';
                }
                tooltipEl.style.top = "1px";
                tooltipEl.style.zIndex = "8";
                chart.canvas.parentNode.appendChild(tooltipEl);
            } else {
                if (Chartdata.data.datasets.length > 2) {
                    tooltipEl.innerHTML = '<div class="outer-container"> <div> <p id="probableMainSubHeading"> ' + formattedDueDate + ' </p> </div> <div class="row"> <div class="col"> <div class="probableHeaderSubHeadCls"> <p id="probableSubHeadingBold">Expected</p> </div> </div> <div class="col"> <div class="probableHeaderSubHeadCls"> <p id="probableSubHeadingBold">Probable</p> </div> </div> <div class="col"> <div class="probableHeaderSubHeadCls"> <p id="probableSubHeadingBold">Short Fall</p> </div> </div> </div> <div class="row1"> <div class="col"> <div class="probableContentCls"> <div class="probableRowContentCls"> <div class="probableRowCls"> <div class="probabeLeftLabel"><span class="probableLabelCls">Amount</div> </span></span><span class="probableValue">' + chart.data.datasets[context[0].datasetIndex].data[context[0].index] + '</span> </div> </div> </div> </div> <div class="col"> <div class="probableContentCls"> <div class="probableRowContentCls"> <div class="probableRowCls"> <div class="probabeLeftLabel"><span class="probableLabelCls">Amount</div> </span></span><span class="probableValue">' + chart.data.datasets[context[0].datasetIndex].data[context[0].index] + '</span> </div> </div> </div> </div> <div class="col"> <div class="probableContentCls"> <div class="probableRowContentCls"> <div class="probableRowCls"> <div class="probabeLeftLabel"><span class="probableLabelCls">Amount</div> </span></span><span class="probableValue">' + chart.data.datasets[context[0].datasetIndex].data[context[0].index] + '</span> </div> </div> </div> </div> </div> <div class="row2"> <div class="col"> <div class="probableContentCls"> <div class="probableRowContentCls"> <div class="probableRowCls"> <div class="probabeLeftLabel"><span class="probableLabelCls">Invoice Count</span></div> <span class="probableValue">totalVal</span> </div> </div> </div> </div> <div class="col"> <div class="probableContentCls"> <div class="probableRowContentCls"> <div class="probableRowCls"> <div class="probabeLeftLabel"><span class="probableLabelCls">Invoice Count</span></div> <span class="probableValue">totalVal</span> </div> </div> </div> </div> <div class="col"> <div class="probableContentCls"> <div class="probableRowContentCls"> <div class="probableRowCls"> <div class="probabeLeftLabel"><span class="probableLabelCls">Invoice Count</span></div> <span class="probableValue">totalVal</span> </div> </div> </div> </div> </div> <div class="row"> <div class="col"> <div class="probableHeaderSubHeadCls"> <p id="probableSubHeadingBold">Expected</p> </div> </div> <div class="col"> <div class="probableHeaderSubHeadCls"> <p id="probableSubHeadingBold">Cash inflow with Incentives</p> </div> </div> <div class="col"> <div class="probableHeaderSubHeadCls"> <p id="probableSubHeadingBold">Short Fall</p> </div> </div> </div> <div class="row1"> <div class="col"> <div class="probableContentCls"> <div class="probableRowContentCls"> <div class="probableRowCls"> <div class="probabeLeftLabel"><span class="probableLabelCls">Amount</div> </span><span class="probableValue">' + chart.data.datasets[context[0].datasetIndex].data[context[0].index] + '</span> </div> </div> </div> </div> <div class="col"> <div class="probableContentCls"> <div class="probableRowContentCls"> <div class="probableRowCls"> <div class="probabeLeftLabel"><span class="probableLabelCls">Amount</div> </span><span class="probableValue">' + chart.data.datasets[context[0].datasetIndex].data[context[0].index] + '</span> </div> </div> </div> </div> <div class="col"> <div class="probableContentCls"> <div class="probableRowContentCls"> <div class="probableRowCls"> <div class="probabeLeftLabel"><span class="probableLabelCls">Amount</div> </span><span class="probableValue">' + chart.data.datasets[context[0].datasetIndex].data[context[0].index] + '</span> </div> </div> </div> </div> </div> <div class="row2"> <div class="col"> <div class="probableContentCls"> <div class="probableRowContentCls"> <div class="probableRowCls"> <div class="probabeLeftLabel"><span class="probableLabelCls">Invoice Count</span></div> <span class="probableValue">totalVal</span> </div> </div> </div> </div> <div class="col"> <div class="probableContentCls"> <div class="probableRowContentCls"> <div class="probableRowCls"> <div class="probabeLeftLabel"><span class="probableLabelCls">Invoice Count</span></div> <span class="probableValue">totalVal</span> </div> </div> </div> </div> <div class="col"> <div class="probableContentCls"> <div class="probableRowContentCls"> <div class="probableRowCls"> <div class="probabeLeftLabel"><span class="probableLabelCls">Invoice Count</span></div> <span class="probableValue">totalVal</span> </div> </div> </div> </div> </div> </div>';
                } else {
                    tooltipEl.innerHTML = '<div class="probableHeader"><p id="probableHeading"> Expected Receivable Amount </p></div><p id="probableSubHeading"> ' + formattedDueDate + ' </p><div class="probableContent"><div class="probableRowContent">        <div class="probableRow"><div class="probabeLeftLabel"><span class="probableLabel">Receivable Amount</div></span></span><span class="probableValue">' + '$'+ chart.data.datasets[context[0].datasetIndex].data[context[0].index]+'.00' +'</span></div>        <div class="probableRow"><div class="probabeLeftLabel"><span class="probableLabel">totalReceivables</span></div><span class="probableValue">8</span></div> </div></div>';
                }
            }
            return tooltipEl;
        };
    }
};