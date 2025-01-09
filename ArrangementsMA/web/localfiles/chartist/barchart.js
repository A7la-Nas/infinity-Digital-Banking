function AddBarChart(labels, data, currencyFormat){
var series = [];
series.push(data);  
var depositBalances = new Chartist.Bar('#barchart', {
  labels: labels,
  series: series
}, {
  fullWidth: true,
  chartPadding: {
	right: 40
  },
   axisX: {
	 showGrid: false,
   },
  axisY:{
	labelInterpolationFnc: function(value) {
  
	return currencyFormat+""+formatMoney(value,0);
	}
  }
  
});


function formatMoney(number, decPlaces, decSep, thouSep) {
	  decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces;
	  decSep = typeof decSep === "undefined" ? "." : decSep;
	  thouSep = typeof thouSep === "undefined" ? "," : thouSep;
	  var sign = number < 0 ? "-" : "";
	  var i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
	  var j = (j = i.length) > 3 ? j % 3 : 0;

	  return sign +
		  (j ? i.substr(0, j) + thouSep : "") +
		  i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
		  (decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
}

depositBalances.on('draw', function(data) {
    if(data.type === 'bar') {
        data.element.animate({
            y2: {
                dur: 1000,
                from: data.y1,
                to: data.y2,
                easing: Chartist.Svg.Easing.easeOutQuint
            },
            opacity: {
        	dur: 1000,
        	from: 0,
        	to: 1,
        	easing: Chartist.Svg.Easing.easeOutQuint
      }
        });
    }
});
  
}