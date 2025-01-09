function AddDonutChart(labels, series, assetClass, marketValue, flag = true ){
const container = document.getElementsByClassName('bgContainer')
container[0].style.background = flag ? 'linear-gradient(180deg, rgba(41,50,118,1) 0%, rgba(117,80,109,1) 100%)' : 'linear-gradient(180deg, rgba(41,50,118,1) 0%, rgba(61,58,114,1) 100%)'
var maskData=[];
maskData.push(series[0] /2);
var sum =0;
for(var i=1;i<series.length;i++){
var maskValue = series[0] +sum+ (series[i] /2);
sum = sum + series[i];
maskData.push(maskValue);
}
console.log(maskData);
	var chart = new Chartist.Pie('#donutchart', {
		 labels: assetClass,
	  series: series
	}, {
		donut: true,
        donutWidth: 28,
        startAngle: 0,
        total: 100,
	    showLabel: true,
        chartPadding: 30,
        labelOffset: 30,
        labelDirection: 'explode',
	  	plugins: [
	    ctDonutMarks({
	      marks: maskData
	    })
	  ]
	});
}

$(document).on('click', '.ct-series', function() {
$(".ct-lable-hypen").hide();
$(".ct-label").hide();
let nthClild= $(this).index();
$(".ct-lable-hypen:nth-of-type(" + (parseInt(nthClild)+1) + ")").show();
$(".ct-label:nth-child(" + (parseInt(nthClild) + 1) + ")").show();
});

function ctDonutMarks(options) {

  return function ctDonutMarksPlugin(chart) {
    var defaultOptions = {
      marks: [],
      offset: 1,
      lineAttributes: {
        stroke: '#B8DCFF',
        'stroke-width': '2px'
      }
    };

    options = Chartist.extend({}, defaultOptions, options);
    
    if(chart instanceof Chartist.Pie && chart.options.donut) {

      chart.on('created', function(context) {
        if (context.options.donut) {
          var radius = 
            Math.min(context.chartRect.width() / 2, 
                     context.chartRect.height() / 2) - 
              context.options.donutWidth / 2;
    
          var center = {
            x: context.chartRect.x1 + context.chartRect.width() / 2,
            y: context.chartRect.y2 + context.chartRect.height() / 2
          };
          
          var data = Chartist.getDataArray(chart.data);
    
          var totalDataSum = context.options.total || data.reduce(function(total, value) {
            return total + value;
          }, 0);
          options.marks.forEach(function(mark) {
            var angle = context.options.startAngle + mark / totalDataSum * 360;
            var position = Chartist.polarToCartesian(center.x, center.y, radius+17, angle);
            
            var offset = context.options.donutWidth / 10 + options.offset;
            var p1 = Chartist.polarToCartesian(position.x, position.y, offset, angle);
            var p2 = Chartist.polarToCartesian(position.x, position.y, offset, angle - 180);
            context.svg.append(new Chartist.Svg('line', Chartist.extend({
              x1: p1.x,
              y1: p1.y,
              x2: p2.x,
              y2: p2.y,
              stroke: 'black',
              class:"ct-lable-hypen"
            }, options.lineAttributes)));
          });
        }
      });
    }
  };
}
 



  