var SCFBarChart = {
    /**
     * Initialises the widget.
     * @param {object} parentNode - Specifies parent node.
     * @param {object} widgetModel - Specifies the Widget info.
     * @param {object} config - Specifies configuration.
     */
    initializeWidget: function (parentNode, widgetModel, config) {
        parentNode.innerHTML = `<div id='${widgetModel.chartId}Legend' style='margin-left: 50%;'></div>
        <div id="${widgetModel.chartId}"></div>`;
        google.charts.load("45", { packages: ["corechart"] });
        this.modelChange(widgetModel);
    },
    /**
     * Handles the model change event.
     * @param {object} widgetModel - Specifies the Widget info.
     * @param {string} propertyChanged - Specifies the property that is changed.
     * @param {string} propertyValue - Specified the changed value.
     */
    modelChange: function (widgetModel, propertyChanged, propertyValue) {
        this.setBarChart(widgetModel);
    },
    /**
     * Sets the Bar Chart widget.
     * @param {object} widgetModel - Specifies the Widget info.
     */
    setBarChart: function (widgetModel) {
        const scope = this;
        const { chartData, chartId, chartProperties } = widgetModel;
        google.charts.load("45", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(drawBarChart);
        /**
         * Draws the Bar Chart.
         */
        function drawBarChart() {
            if (!chartData || !chartData.length) {
                return;
            }
            const data = google.visualization.arrayToDataTable(chartData),
                chart = new google.visualization.BarChart(document.getElementById(chartId));
            google.visualization.events.addListener(chart, "onmouseover", function () {
                document.getElementById(chartId).style.cursor = "pointer";
            }),
                google.visualization.events.addListener(chart, "onmouseout", function () {
                    var d = document.getElementById(chartId);
                    d.style.cursor = "default";
                    var g = d.getElementsByTagName('g');
                    var gLast = g[g.length - 1];
                    gLast.style.pointerEvents = "none";
                }),
                chart.draw(data, chartProperties);
            scope.generateBarChartLegend(widgetModel);
        }
    },
    /**
     * Generates the bar chart legend.
     * @param {object} widgetModel - Specifies the Widget info.
     * @returns {void} - If legend container is not present.
     */
    generateBarChartLegend: function (widgetModel) {
        const legendContainer = document.getElementById(`${widgetModel.chartId}Legend`);
        if (!legendContainer) return;
        let legendHTML = '<ul style="width: 100%; display: grid; grid-template-columns: repeat(2, 1fr);">';
        let chartData = JSON.parse(JSON.stringify(widgetModel.chartData[0]));
        chartColor = widgetModel.chartProperties.colors;
        chartData.shift();
        chartData.filter(item => (typeof(item) === 'string')).forEach((value, idx) => {
            legendHTML += `<li style='display: flex; align-items: center; font: normal 400 13px SourceSansPro-Regular; color: #727272;'>
            <span style="background-color: ${chartColor[idx]}; height: 12px; width: 12px; margin-right: 10px; border-radius: 6px;"></span>
            <p style="width: 80%;">${value}</p>
            </li>`;
        });
        legendHTML += '</ul>';
        legendContainer.innerHTML = legendHTML;
    }
};