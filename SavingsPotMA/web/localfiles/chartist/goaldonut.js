function AddDonutChart(labels, series){
	var donutChart = new Chartist.Pie('#donutchart', {
		series: series
		}, {
		  donut: true,
		  donutWidth: 10,
		  startAngle: 0,
		  showLabel: false,
      	  width: "100%",
          height: "100%",
      	  chartPadding: 10
		}
	);
}