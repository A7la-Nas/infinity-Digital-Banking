function AddWealthChart(labels, series,donutColor,color){
	// Prepare chart params
	
	var percent1 = series;
	var strengthColor = color;
		
	var bgColor = donutColor;		
	//var chartWidth = '20';
	var percent = 100;
	var seriesArray = [];

	var arc=0;
	var arc1=0;
	
	
	if(percent<percent1){
		chartColors = [bgColor, strengthColor];
	} else {
		chartColors = [strengthColor, bgColor];
	}
	
	if(percent>percent1){
		var arc = (percent-percent1) ? 100 * (percent-percent1) / 100 : 0;
		var arc1 = percent1 ? percent1 : 0;
		seriesArray = [arc1, arc]
	} else if(percent1===100) {
		seriesArray = [100]
	}

	// Create chart
	var chart = new Chartist.Pie('#wealthHealthChart', {
	  series: seriesArray,
	  labels: [percent + '%'],
	}, {
	  donut: true,
	  donutWidth: 60,
	  startAngle: 218,
	  total: 125,
	  showLabel: false
	});

	// Set chart color
	chart.on('draw', function(data) {
	  if(data.type === 'slice') {
		  var chartWidth = data.radius/5;
		data.element._node.setAttribute('style','stroke: ' + chartColors[data.index] + '; stroke-width: ' + chartWidth + 'px; stroke-linecap:round;');
		}
		
		
		if(data.index===0){
			data.group.elem('circle', {
				cx: '50%',
				cy: '50%',
				r: data.radius/1.3,
				style:"fill:#FFF;stroke:#AAA;stroke-width:1;fill-opacity:0.5;stroke-opacity:0.5"
			});	
			data.group.elem('text', {
				x: '50%',
				y: '50%',
				style:"fill: #555; font: bold " + (data.radius/5) + "px sans-serif;text-anchor:middle; dominant-baseline:central"
			});
			
		}
	});
	

	chart.on('created', function(data) {
		try {
			var grpTag = document.getElementById('wealthHealthChart').getElementsByTagName("g");   // order: first, second, third
			if(grpTag[1]){	
			grpTag[1].parentNode.insertBefore(grpTag[1], grpTag[0]);
			}
			document.getElementsByTagName("text")[0].textContent = labels;
		}
		catch(err) {
		  console.log(err);
		}
		
	});
}