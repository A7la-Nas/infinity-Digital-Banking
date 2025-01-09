function drawWealthAllocationChart(labelsArray, seriesArray,chartColors,offSetVal) {


	this.isFirstLine = true;
	this.xpos = 0;
	const totalTicks = 4;

	var maxValue = Math.ceil(Math.max(...seriesArray.flat()) / 10) * 10;
	var multiples = Math.ceil(maxValue/totalTicks);
	let ticksArray = Array.from({length: totalTicks}, (_,i) => multiples + (i * multiples))
	let barscount = seriesArray.length;
	
	//push 0 as we require by default
	ticksArray.push(0);
	
	var options={
		seriesBarDistance:  offSetVal === true? 15 : 30,
		reverseData: true,
		horizontalBars: true,
		axisX : {
			type : Chartist.FixedScaleAxis,
			low : 0,
			high : Math.max(...ticksArray),
			ticks : ticksArray,
			offset : offSetVal === true?  35 : 50,
			labelInterpolationFnc: function(value) {
                         return value + '%'
					}
		},		
		
		
      
    }
	if(offSetVal === true){
		options.axisY = {
			offset:100
		}
		
	}
if(barscount === 1){
        if(seriesArray[0].length >=7 ){
            options.axisX.offset = 150;
			options.axisY = {
			offset:100
		  }
		}
		else{
			options.axisY = {
			offset:180
		  }
		}
    }else{
		options.axisY = {
			offset:180
		}
	}

	var chartist = new Chartist.Bar('#WealthAllocationCheckChart', {
			labels: labelsArray,
			series: seriesArray
		}, options).on('draw', function(data) {
			var barHorizontalCenter, barVerticalCenter, label, value;
			
			//IW-3681 Fix			
			if (data.type === 'label' && data.axis.units.pos === "x") {
      let width=parseInt(data.element._node.getAttribute("width"));
      let x= parseInt(data.element._node.getAttribute("x"));
      let tot=x-(width/2);
	   data.element._node.setAttribute('style', 'x: ' + tot + '; align-items: flex-end ; justify-content: center ; text-align: left ; text-anchor: start;');
        }
			
			//Get the first grid positions to draw grey bg
			if (data.type=== "grid" && this.isFirstLine ){
				this.xpos = data.x2;
				this.isFirstLine = false;
			}

			if (data.type === "bar") {
				barHorizontalCenter = this.xpos + 10;
				barVerticalCenter = data.y2 +7 ;
				value = data.element.attr('ct:value');

				datax = data.axisX.axisLength;
				if(offSetVal === true){
					if(barscount === 1){
				if (data.type !== 'grid') {
      if (chartColors[data.index]) {
        data.element.attr({
                    style: 'stroke-width: 10px;fill:'+chartColors[data.index]+';stroke:'+chartColors[data.index]+'; '
                    });
      }
    }
				}
				
				else if(barscount >= 1){
					if (data.type !== 'grid') {
      if (chartColors[data.seriesIndex]) {
        data.element.attr({
                    style: 'stroke-width: 10px;fill:'+chartColors[data.seriesIndex]+';stroke:'+chartColors[data.seriesIndex]+'; '
                    });
      }
    }
				}
				}
				else{
					if(barscount === 1){
				if (data.type !== 'grid') {
      if (chartColors[data.index]) {
        data.element.attr({
                    style: 'stroke-width: 20px;fill:'+chartColors[data.index]+';stroke:'+chartColors[data.index]+'; '
                    });
      }
    }
				}
				
				else if(barscount >= 1){
					if (data.type !== 'grid') {
      if (chartColors[data.seriesIndex]) {
        data.element.attr({
                    style: 'stroke-width: 20px;fill:'+chartColors[data.seriesIndex]+';stroke:'+chartColors[data.seriesIndex]+'; '
                    });
      }
    }
				}
				}
				
				
				
				
				
				//draw grey background BG
				data.group.append(
					new Chartist.Svg('rect', {
					x: data.x1+10,
					y: data.y1-1.5,
					rx: 0.1,
					ry: 0.1,
					width:offSetVal?this.datax-15:this.datax-20,
					height:2,
					opacity:".3",
					style:offSetVal?"stroke:lightgrey; fill:lightgrey; stroke-width:10;":"stroke:lightgrey; fill:lightgrey; stroke-width:20;"
					}, 'greyBG')
				)
//IW-3681 Fix	
	//			if (value !== '0') {
					label = new Chartist.Svg('text');
					label.text(parseFloat(value).toFixed(2) + "%");
					label.addClass("ct-barlabel");
					label.attr({
					x: barHorizontalCenter,
					y: barVerticalCenter
					});
					return data.group.append(label);
	//			}
			}

	}).on('created', function(data) {
		
		
		try {
		
			//move the rect above the axis lines
			var grpTag = document.getElementById("WealthAllocationCheckChart").getElementsByTagName("rect");		
			for(var index=0; index<grpTag.length; index++){ 
				grpTag[index].parentNode.prepend(grpTag[index]);
			}

			//set width again 100% so that labels at right will be visible
			document.getElementById("WealthAllocationCheckChart").getElementsByTagName("svg")[0].setAttribute("style", "width:100% !important;");
			this.isFirstLine=true;
			
			//Grids appear above the lines
			var grpTag = document.getElementById("WealthAllocationCheckChart").getElementsByTagName("g");   
			grpTag[1].parentNode.insertBefore(grpTag[1], grpTag[0]);
		}
		catch(err) {
		  console.log(err);
		}
	});
}