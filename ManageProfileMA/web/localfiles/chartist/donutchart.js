function AddDonutChart(labels, series, assetClass, marketValue ){
var colors = ["#3E75A6", "#2C82BE", "#24BFEC", "#76DDFB", "#C7CCD5", "#3E75A6", "#2C82BE", "#24BFEC"];
var plotObj = new Array();
var i=0;
for (i in series)
{
var firstLine = colors[i] + "@" +assetClass[i] + "  " + marketValue[i] ;
plotObj.push({meta: firstLine, value: series[i]});
}

	var donutChart = new Chartist.Pie('#donutchart', {
		labels: labels,
		series: plotObj
		}, {
		  donut: true,
		  donutWidth: 40,
		  startAngle: 0,
		  showLabel: true,
		  labelOffset: 2,
		  plugins: [Chartist.plugins.tooltip2()],
		}
	);

}
  