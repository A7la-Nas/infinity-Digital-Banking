function AddInvestmentChart(labels, xData, data, percentages, yLabels, yMax, chartOptions = null,currencySymbol, interpolationFunc) {
  if (!chartOptions) {
    chartOptions = {
      lineColor: '#293276',
      areaColor: '#53A8E2'
    }
  };
  var jsonStr = [{ meta: labels[0], value: data[0] }];
  var plotObj = new Array();
  var i = 0;
  data.forEach((d, i) => {
//     let xDate = new Date(xData[i]);
//     xDate = (xDate.getMonth()+1) + '/' + xDate.getDate() + '/' + xDate.getFullYear();
   let percentageClass = "tooltip-text3";
    let percentage = percentages[i] ? (percentages[i] + '%') : '';
    if(percentage!=="")
      {
        if(percentages[i]>=0)
          percentage='+'+percentage;
        else
          percentageClass= "tooltip-text4";
         }
    plotObj.push({ meta: { xLabel: labels[i], xDate:xData[i], percentage,currencySymbol,percentageClass }, value: d });
  });
  var options = {
    showArea: true,
    showPoint: true,
    lineSmooth: false,
    width: "100%",
    height: "100%",
    stretch: true,
    fullWidth: true,
    chartPadding: {
      right: 50
    },
    plugins: [Chartist.plugins.tooltip2({ hideDelay: 1000 })],
    axisX: {
      showGrid: true,
      showLabel: true,
      labelInterpolationFnc: interpolationFunc
    },
    axisY: {
      showGrid: true,
      showLabel: true,
     // type: Chartist.FixedScaleAxis,
      divisor: 10,
      low: Math.min.apply(null, data),
      high: Math.max.apply(null, data),
      ticks: yLabels,
      labelInterpolationFnc: function (value) {
        var yAxisValue = value % 1 === 0 ? value : value.toFixed(2);
        return formatValue(yAxisValue);
      }
    },
  };
  function formatValue(number){
	  if(number >= 1000000) {
	  number = number / 1000000;
      return number.toFixed(1) + "m";
	}
    else if (number >= 1000) {
	  number = number / 1000;
      return number.toFixed(1) + "k";
		}
    else{
      return number;
    }
  }
  console.log(plotObj);
  var chart = new Chartist.Line('#linechart', {
    labels: labels,
    series: [plotObj],
  }, options);

  chart.on('draw', function (context) {
    if (context.type === 'label' && context.axis.units.pos === 'y') {
      context.element.attr({
        x: context.axis.chartRect.width() + parseInt("100")
      });
    }
    if (context.type === 'bar') {
      context.element.attr({
        x1: context.x1 + 0.001
      });
    }
  });


  chart.on('draw', function (context) {
    if (context.type === 'label' && context.axis.units.pos === 'y') {
      context.element.attr({
        x: context.axis.chartRect.width() + parseInt("60")
      });
    }
    if (context.type === 'point' && context.index == labels.length - 2) {

      var triangle = new Chartist.Svg('path', {
        d: ['M',
            context.x + 10,
            context.y + 10,
            'L',
            context.x + 100,
            context.y + 10,
            'L',
            context.x + 100,
            context.y - 10,
            'L',
            context.x + 10,
            context.y - 10,
            'L',
            context.x,
            context.y,
            'z'].join(' '),
        style: 'fill-opacity: 1'
      }, 'ct-area');

      // With data.element we get the Chartist SVG wrapper and we can replace the original point drawn by Chartist with our newly created triangle
      //  context.element.replace(triangle);
    }
  });


  // To Apply Chart Color
  chart.on('created', function (ctx) {
    var defs = ctx.svg.elem('defs');
    if(chartOptions && chartOptions.lineColor) {
		if (document.querySelector('.ct-series-a .ct-line') !== null) {
			document.querySelector('.ct-series-a .ct-line').style.stroke = chartOptions.lineColor;
		}
	}
    defs.elem('linearGradient', {
      id: 'gradient',
      x1: 0,
      y1: 1,
      x2: 0,
      y2: 0
    }).elem('stop', {
      offset: 0,
      'stop-color': chartOptions.areaColor
    }).parent().elem('stop', {
      offset: 1,
      'stop-color': chartOptions.areaColor
    });
	
	//////// Add last value chart sticker
	// get chart last value
	var myChart = chart.container;
	var cLastOr = data[data.length -1];
	
	// get chart div and actual chart plot elements
	//var myChart = document.getElementById("linechart");
	var myPlot = myChart.querySelector(".ct-series");
	var lastPoint = myPlot.getElementsByClassName("ct-point")[myPlot.getElementsByClassName("ct-point").length - 1];
	var lastPointPos = lastPoint.getBoundingClientRect().top;
	var plotPosition = myPlot.getBoundingClientRect().top;
	var pointPosFromTop = lastPointPos - plotPosition;

	// calculate "padding" of the chart div relative to actual chart plot
	var topChartPadding = myPlot.getBoundingClientRect().top - myChart.getBoundingClientRect().top+2;
	var rightChartPadding = myChart.getBoundingClientRect().right - myPlot.getBoundingClientRect().right+3;	
	var plotHeight = myPlot.getBoundingClientRect().height;

	//check if sticker allready created and otherwise create our sticker element
	var stickers = document.getElementById("myChartSticker");
	if (stickers === null) {
		var stickerContainer = document.createElement("span");
		stickerContainer.id = "myChartStickerContainer";
		myChart.appendChild(stickerContainer);
		var sticker = document.createElement("span");
		var tri = document.createElement("i");
		sticker.appendChild(tri);
		var txt = document.createElement("span");
		sticker.appendChild(txt);
		sticker.id = "myChartSticker";
		

		stickerContainer.appendChild(sticker);
	} else {
		var stickerContainer = document.getElementById("myChartStickerContainer");
		var sticker = document.getElementById("myChartSticker");
		var tri = sticker.querySelector("i");
	}
	var txtSpan = sticker.querySelector("span");
	var formUtilityMan = applicationManager.getFormatUtilManager();
    /*if (cLastOr >= 1000000) {
	  cLastOr = cLastOr / 1000000;
      cLastOr=cLastOr.toFixed(1);
	  //cLastOr=cLastOr+'M'
	}*/
	var fontsize ="8px";
    if(cLastOr.toString().length>8){
		fontsize="6px";
	//sticker.style.fontSize="6px !important";
}
	var formVal = formUtilityMan.formatAmount(cLastOr);
	cLastOr = currencySymbol + formVal;
	txtSpan.innerHTML = cLastOr;
	var stickerHeightAdj = sticker.offsetHeight / 2;
	var actualPosFromTop = pointPosFromTop - stickerHeightAdj;
	var offsetR = 13;
	var right = rightChartPadding + offsetR;
	// style the sticker container
	stickerContainer.setAttribute("style", "display: block; position: absolute; top: " + topChartPadding + "px; left: auto; right: 0; width: " + rightChartPadding + "px; height: " + plotHeight + "px;");
		
	//  style the sticker	
	sticker.setAttribute("style", "text-align: center; bottom: auto; padding: 3px 5px 3px 10px; line-height: 14px; font-size: "+ fontsize +"; background-color: #293276; color: #ffffff; position: absolute; width: " + right + "px; height: 20px; top: " + actualPosFromTop + "px;");
	//sticker.setAttribute("style", "text-align: right; bottom: auto; padding: 3px 3px 3px 10px; line-height: 14px; font-size: "+fontsize+"; left: auto; right: -" + offsetR + "px; background-color: #293276; color: #ffffff; position: absolute; width: " + right + "px; height: 20px; top: " + actualPosFromTop + "px;");
	
	// style the triangle
	tri.setAttribute("style", "position: absolute; left: 0; top: 0; height: " + sticker.style.height +"; width: 10px; border-bottom: 10px solid #ffffff; border-top: 10px solid #ffffff; border-right: 10px solid #293276;");
	
	
  });

}