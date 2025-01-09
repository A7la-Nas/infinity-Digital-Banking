function AddDonutChart(labels, series, assetClass, marketValue, colours, Mytooltip){
var colors = colours;
var plotObj = new Array();
var i=0;
for (i in series)
{
	if(Mytooltip.includes("marketValue"))
	{
		if(Mytooltip.includes("percentage"))
		{
var firstLine = colors[i] + "@" +assetClass[i] + "  "+ labels[i] +" <br> <b>" + "&nbsp &nbsp &nbsp" +marketValue[i] ;
	}
	else{
		var firstLine = colors[i] + "@" +assetClass[i] +" <br> <b>" + "&nbsp &nbsp &nbsp" +marketValue[i] ;
	}
	}
	else if(Mytooltip.includes("percentage")){
		var firstLine = colors[i] + "@" +assetClass[i] + "  "+ labels[i];
	}
	else{
		var firstLine = colors[i] + "@" +assetClass[i];
	}
plotObj.push({meta: firstLine, value: series[i]});
}
	var donutChart = new Chartist.Pie('#donutchart', {
		labels: labels,
		series: plotObj
		}, {
			  width: '100%',
			height: '100%',
		  donut: true,
		  donutWidth: 50,
		  startAngle: 0,
		  showLabel: false,
		  labelOffset: 2,
		  plugins: [Chartist.plugins.tooltip2()],
		}
	);

}
  