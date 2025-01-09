function AddLineChart(labels, data, yLabels, yMax,chartOptions=null){
  if(!chartOptions) {    
    chartOptions = {
      lineColor : '#293276',
      areaColor : '#53A8E2'
    }
  };
  var jsonStr = [{meta: labels[0], value: data[0]}];
  var plotObj = new Array();
  var i=0;
  for (i in data)
  {
    var firstLine = labels[i] + "\n"; 
    plotObj.push({meta: firstLine, value: data[i]});
  }
  var options = {
    showArea: true,
    showPoint: true,
    lineSmooth : false,
    width: "100%",
    height: "100%",
    fullWidth: true,
    chartPadding: {
      right: 40
    },
    plugins: [Chartist.plugins.tooltip2({hideDelay:1000})],
    axisX: {
      showGrid: true,
      showLabel: true
    },
    axisY: {
      showGrid: true,
      showLabel: true,
      low : Math.min.apply(null,data),
      high: Math.max.apply(null,data)+50,
      divisor : 40,
      ticks: yLabels,
    },
  };

  var chart = new Chartist.Line('.ct-chart', {
    labels: labels,
    series: [plotObj]
  }, options);

  chart.on('draw', function(context) {
    if(context.type === 'label' && context.axis.units.pos === 'y') {
      context.element.attr({
        x: context.axis.chartRect.width() + parseInt("100")
      });
    }
    if(context.type === 'bar') {
      context.element.attr({
        x1: context.x1 + 0.001
      });
    }
  });


  chart.on('draw', function(context) {
    if(context.type === 'label' && context.axis.units.pos === 'y') {
      context.element.attr({
        x: context.axis.chartRect.width() + parseInt("60")
      });
    }
    if(context.type === 'point' && context.index == labels.length-2) {

      var triangle = new Chartist.Svg('path', {
        d: ['M',
            context.x+10,
            context.y+10,
            'L',
            context.x +100,
            context.y + 10,
            'L',
            context.x +100,
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
  chart.on('created', function(ctx) {
    var defs = ctx.svg.elem('defs');
//     if(chartOptions && chartOptions.lineColor) 
    document.querySelector('.ct-series-a .ct-line').style.stroke=chartOptions.lineColor.replace('#','');
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
  });

}