function AddDonutChart(labels, series){
	var donutChart = new Chartist.Pie('#donutchart', {
		series: series
		}, {
		  donut: true,
		  donutWidth: 10,
		   startAngle: 250,
			total: 165,
		  showLabel: false,
      	  width: "100%",
          height: "100%",
      	  chartPadding: 10
		}
	);
}