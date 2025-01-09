var SCFDonutChart = {
    /**
     * Initialises the widget.
     * @param {object} parentNode - Specifies parent node.
     * @param {object} widgetModel - Specifies the Widget info.
     * @param {object} config - Specifies configuration.
     */
    initializeWidget: function (parentNode, widgetModel, config) {
        parentNode.innerHTML = `<div id="${widgetModel.chartId}"></div>
        <div id='${widgetModel.chartId}Legend'></div>`;
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
        this.setDonutChart(widgetModel);
    },
    /**
     * Sets the Donut Chart widget.
     * @param {object} widgetModel - Specifies the Widget info.
     */
    setDonutChart: function (widgetModel) {
        const scope = this;
        const { chartData, chartId, chartProperties } = widgetModel;
        google.charts.load("45", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(drawDonutChart);
        /**
         * Draws the Donut Chart.
         */
        function drawDonutChart() {
            if (!chartData || !chartData.length) {
                return;
            }
            const data = google.visualization.arrayToDataTable(chartData),
                chartContainer = document.getElementById(chartId),
                chart = new google.visualization.PieChart(chartContainer);
            google.visualization.events.addListener(chart, "onmouseover", function () {
                chartContainer.style.cursor = "pointer";
            }),
                google.visualization.events.addListener(chart, "onmouseout", function () {
                    var d = chartContainer;
                    d.style.cursor = "default";
                    var g = d.getElementsByTagName('g');
                    var gLast = g[g.length - 1];
                    gLast.style.pointerEvents = "none";
                }),
                chart.draw(data, chartProperties);
            let totalCount = 0;
            chartData.slice(1).forEach(val => totalCount += val[1] || 0);
            const chartSVG = chartContainer.getElementsByTagName('svg')[0];
            if (chartSVG) {
                const textElement1 = scope.createText({
                    'x': '60%',
                    'y': '47%',
                    'text': chartProperties.centerText || 'Total',
                    'fontSize': 13,
                    'fill': '#727272',
                    'fontWeight': 400
                });
                const textElement2 = scope.createText({
                    'x': '60%',
                    'y': '55%',
                    'text': String(totalCount),
                    'fontSize': 24,
                    'fill': '#424242',
                    'fontWeight': 600
                });
                chartSVG.appendChild(textElement1);
                chartSVG.appendChild(textElement2);
            }
            scope.generateDonutLegend(widgetModel);
        }
    },
    /**
     * Creates the text element.
     * @param {object} param0 - Specifies the element info.
     * @returns {object} - Text element.
     */
    createText: function ({ x, y, text, fontSize, fill, fontWeight }) {
        const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textElement.setAttribute('x', x);
        textElement.setAttribute('y', y);
        textElement.setAttribute('text-anchor', 'middle');
        textElement.setAttribute('dominant-baseline', 'middle');
        textElement.setAttribute('fill', fill);
        textElement.setAttribute('font-family', 'SourceSansPro-Regular');
        textElement.setAttribute('font-size', fontSize);
        textElement.setAttribute('font-weight', fontWeight);
        textElement.textContent = text;
        return textElement;
    },
    /**
     * Generates the donut chart legend.
     * @param {object} widgetModel - Specifies the Widget info.
     * @returns {void} - If legend container is not present.
     */
    generateDonutLegend: function (widgetModel) {
        const legendContainer = document.getElementById(`${widgetModel.chartId}Legend`);
        if (!legendContainer) return;
        let legendHTML = '<ul style="width: 100%; display: grid; grid-template-columns: repeat(2, 1fr); grid-row-gap: 12px;">';
        let chartData = widgetModel.chartData,
            chartColor = widgetModel.chartProperties.colors;
        chartData.shift();
        chartData.forEach((value, idx) => {
            if (value[1]) {
                legendHTML += `<li style='display: flex; align-items: center; font: normal 400 13px SourceSansPro-Regular; color: #000;'>
                                <span style="background-color: ${chartColor[idx]}; height: 12px; width: 12px; margin-right: 5px; border-radius: 6px;"></span>
                                <p style ="width: 80%;">${value.join(' - ')}</p>
                               </li>`;
            }
        });
        legendHTML += '</ul>';
        legendContainer.innerHTML = legendHTML;
    }
};