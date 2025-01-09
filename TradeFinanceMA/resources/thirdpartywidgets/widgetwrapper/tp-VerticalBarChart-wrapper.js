VerticalBarChart = {
    initializeWidget: function (e, t) {
        (e.innerHTML = `<div id="${t.chartProperties.widgetId}"></div>`), google.charts.load("45", { packages: ["corechart"] }), VerticalBarChart.setDataForStackedBarChart(t);
        var a = t.chartData;
        VerticalBarChart.modelChange(t, "Refresh", a);
    },
    modelChange: function (e, t, a) {
        VerticalBarChart.setDataForStackedBarChart(e);
    },
    setDataForStackedBarChart: function (e) {
        var t = e.chartData,
            a = [];
        a.push(["", "", { role: "style" }, { role: "tooltip" }, "", { role: "style" }, { role: "tooltip" }, "", { role: "style" }, { role: "tooltip" }]);
        for (i in t) {
            function r() {
                var t = google.visualization.arrayToDataTable(a),
                    r = e.chartProperties,
                    o = new google.visualization.ColumnChart(document.getElementById(r.widgetId));
                google.visualization.events.addListener(o, "onmouseover", function () {
                    document.getElementById(r.widgetId).style.cursor = "pointer";
                }),
                    google.visualization.events.addListener(o, "onmouseout", function () {
                        var d = document.getElementById(r.widgetId);
                        d.style.cursor = "default";
                        var g = d.getElementsByTagName('g');
                        var gLast = g[g.length - 1];
                        gLast.style.pointerEvents = "none";
                    }),
                    google.visualization.events.addListener(o, "select", function () {
                        var a = o.getSelection()[0];
                        if (a) {
                            var r = t.getValue(a.row, 0);
                            e.OnClickOfBar(r);
                        }
                    }),
                    o.draw(t, r);
            }
            a.push([t[i].categoryName, t[i].budget1, t[i].budget1ColorCode, t[i].budget1TooltipText, t[i].budget2, t[i].budget2ColorCode, t[i].budget2TooltipText, t[i].budget3, t[i].budget3ColorCode, t[i].budget3TooltipText]),
                google.charts.load("45", { packages: ["corechart"] }),
                google.charts.setOnLoadCallback(r);
        }
    },
};
