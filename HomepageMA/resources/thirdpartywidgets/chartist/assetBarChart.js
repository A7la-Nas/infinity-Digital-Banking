function addAssetLineChart(labels, response) {
  try{
  this.y=[];
  this.gridFlag=true;
  var data = {
    labels: labels,
    series: response
  };
  let arr = response[0];
  this.flag = false;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < 0) {
      this.flag = true;
      break;
    }
  }
  var options = {
    seriesBarDistance: 0,
    horizontalBars: true,
	reverseData: true,
    axisX: {
      showGrid: true,
    },
    axisY: {
      showGrid: false,
      offset:100,
    }
  };

  var chartColors =  ["#54D75D","#77BC43","#008495","#23A8B1","#7BCCC4","#3BE2B2","#E7417A","#E8705B",
  "#FF8600","#F7EA3A","#7E04C4","#BF0404","#B9SEE8","#6753EC","#3897D6","#4176A4",
   "#3645A7","#0273E3","#646E83","#BDBDBD"];;

  var responsiveOptions = [
    [{
      axisX: {
        labelInterpolationFnc: function (value) {
          return value[0];
        }
      }
    }]
  ];

  let chart = new Chartist.Bar('#assetLinechart', data, options, responsiveOptions);
  chart.on('draw', function (data) {
    if( data.type==="grid" && this.gridFlag)
    {
        //this.gridVal-=700;
        //data.element._node.setAttribute('axis','gridOffset: ' + this.gridVal + '; ');
        //data.element._node.setAttribute('x2',this.gridVal);
        this.xe= data.x1-10;
        this.gridFlag=false;
    }
    if (data.type !== 'grid') {
      if (chartColors[data.index]) {
        data.element._node.setAttribute('style', 'stroke: ' + chartColors[data.index] + '; ');
      }
    }
    if(data.type === 'grid'){
      this.gridheight=data.y2-data.y1;
      this.gridy=data.y1;
    }
    if (data.type === 'label' && data.text === 0 && this.flag) {
      data.group.elem('rect', {
        x: data.x,
        y: this.gridy,
        width: 1.5,
        height: this.gridheight,
        style: "fill:black;stroke:yellow;stroke-width:0;fill-opacity:0.5;stroke-opacity:0.5"
      }, 'ct-tick');
    }
    if (data.type === 'label' && data.axis.units.pos === 'y') {
      //console.log(data);
      if (this.yflag) {
        this.y = [];
        this.yflag = false;
      }
      data.element._node.setAttribute('style', 'x:0; ');
      this.y.push(data.y + data.height / 2);
      console.log(this.y)
    }
    if (data.type === 'label' && data.axis.units.pos === "x") {
      data.element._node.setAttribute('height', '40');
      
    }
    if(data.type==='grid' && this.y.length){
      console.log(data);
      this.yflag=true;
      data.group.elem('rect', {
          x: this.xe,
          y: this.y.pop(),
          width: 10,
          height: 2,
          style:"fill:#E3E3E3;stroke:yellow;stroke-width:0;fill-opacity:5;stroke-opacity:0.5"
          }, 'ct-tick');
      // console.log(data.x1);
      // console.log(data.y1);
      // console.log(data.x2);
      // console.log(data.y2);
      //data.element._node.setAttribute('style','stroke: ' + chartColors[data.index] + '; ');
  }
  });

}
catch(err){
	return err;
}
}