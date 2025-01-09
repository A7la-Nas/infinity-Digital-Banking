	var values = []
					
function setArc(arg) {

	
	drawArc(arg)
	window.addEventListener('load', function() { drawArc(arg) });
	window.addEventListener('resize', function() { drawArc(arg) });
}

function drawArc(data) {

	var canvas = document.getElementById("canvas");		
	var parent = document.getElementById("parent");
	var needle = document.getElementById("needle");
	
	canvas.width = parent.offsetWidth;
	canvas.height = parent.offsetHeight;
	

	
	var size = canvas.width/2<canvas.height/2? canvas.width/2:canvas.height/2;

	console.log(parent.offsetWidth/2);
	
	
	var valueArr = data.valueArr;
	var respectiveColors = ['#A9EFCD', '#7BCCC4', '#3AB1D6', '#0475C4', '#0433C4'];

	var startValue = Math.PI;
	var endValue = 2*Math.PI;
	for(var item = 0; item<valueArr.length; item++)
	{
		
		endValue = startValue+(valueArr[item] * (Math.PI/100));
		var context = canvas.getContext("2d");
		context.beginPath();
		context.arc(parent.offsetWidth/2, parent.offsetHeight/1.5,  size, startValue, endValue);
		context.lineWidth = 10;
		context.strokeStyle = respectiveColors[item];
		context.stroke();
		startValue = endValue;
	}
	
	var canvas=document.getElementById("canvas");
	var ctx=canvas.getContext("2d");
	var cw=canvas.width;
	var ch=canvas.height;
	
	var value=data.angle;
	
	//Convert to degrees 
	
	var degree = ((value - 100) *1.2)*-1;

	var degrees=-degree;
	var radians=degrees*Math.PI/120;

	$myslider=$('#canvas');
	$myslider.attr({min:-180,max:0}).val(degrees);
	
		ctx.beginPath();
		ctx.arc(parent.offsetWidth/2, parent.offsetHeight/1.5, 9, 0, 2 * Math.PI);
		ctx.lineWidth = 8;
		ctx.strokeStyle = '#dfdfdf';
		ctx.stroke();

	drawNeedle(cw/2,ch/1.5,(size - (size*.1)),radians);
	

	function drawNeedle(cx,cy,radius,radianAngle){
		//ctx.clearRect(0,0,cw,ch);
		ctx.translate(cx,cy);
		ctx.rotate(radianAngle);
		ctx.beginPath();
		ctx.moveTo(0,-6.5);
		ctx.lineTo(radius,0);
		ctx.lineTo(0,6.5);
		
		ctx.fillStyle='#003E75';
		ctx.fill();
		ctx.rotate(-radianAngle);
		ctx.translate(-cx,-cy);
		ctx.beginPath();
		ctx.arc(cx,cy,7,0,Math.PI*2);
		
		ctx.fill();
		
		
		ctx.beginPath();
		ctx.arc(parent.offsetWidth/2, parent.offsetHeight/1.5, 1, 0, 2 * Math.PI);
		ctx.strokeStyle = '#FFF';
		ctx.lineWidth=3
		ctx.stroke();
		
		
	}
	var canvas=document.getElementById("canvas");
var context=canvas.getContext("2d");

var dotsPerCircle=100;

var interval=(Math.PI*2)/dotsPerCircle;   

var centerX=parent.offsetWidth/2;
var centerY=parent.offsetHeight/1.5;
var radius=size + (size*.08);

for(var i=dotsPerCircle/2;i<dotsPerCircle+1;i++){

    desiredRadianAngleOnCircle = interval*i;
    
    var x = centerX+radius*Math.cos(desiredRadianAngleOnCircle);
    var y = centerY+radius*Math.sin(desiredRadianAngleOnCircle);

     context.beginPath();
     context.arc(x,y,size*0.009,0,Math.PI*2);
		
     context.closePath();
     context.fill();
}
context.font = "15px SourceSansPro-Regular, Arial";
	 context.fillStyle = "#727272";
	 context.fillText(data.leftLabel, centerX-15-radius, centerY+25);
	 context.fillText(data.rightLabel, centerX+radius-40, centerY+25);	

}