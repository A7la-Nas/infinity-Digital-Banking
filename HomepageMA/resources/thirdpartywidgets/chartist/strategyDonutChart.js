function drawStrategyDonutChart(series,id,radius){
/* var colors = ["#3E75A6", "#2C82BE", "#24BFEC", "#76DDFB", "#C7CCD5", "#3E75A6", "#2C82BE", "#24BFEC"];
var plotObj = new Array();
var i=0;
for (i in series)
{
var firstLine = colors[i] + "@" +assetClass[i] + "  " + marketValue[i] ;
plotObj.push({meta: firstLine, value: series[i]});
} */
	id = (id === undefined ? "#StrategyDonutChart": id);
	radius = (radius === undefined ? 35 : radius);
	var donutChart = new Chartist.Pie(id, {
		//labels: labels,
		series: series
		}, {
		  donut: true,
		  donutWidth: radius,
		  startAngle: 0,
		  showLabel: false,
		  labelOffset: 2,
		  //plugins: [Chartist.plugins.tooltip2()],
		  chartPadding: 11
		}
	);

}
  