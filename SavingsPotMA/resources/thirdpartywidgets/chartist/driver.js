function drawFinalDataChart(filter, xLabels, data, percentages, chartStyle = null, currencySymbol) {
 var expectedMonth=showOnlyFewMonth(xLabels,filter);
  // Function to define the labelling strategy for X Axis to configure for Chartist
  let interpolationFunc = (value, index, labels) => index === labels.findIndex(l => l === value) ? value : null;
  let dateOptions = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  switch (filter) {
    case '1D': interpolationFunc = (value,index) =>  {
      let d = new Date(value);
      //let halfHour = (d.getMinutes() === 30 || d.getMinutes()===0) && index%5===0;
      let halfHour = d.getMinutes()===0 && d.getMinutes() !== 30;
      return halfHour ? d.toLocaleTimeString(undefined,{hour: 'numeric', minute: 'numeric' }) : null;
    };
      break;
    case '1M': dateOptions = { month: 'short', day: 'numeric' };
	if(xLabels.length<=4){
        interpolationFunc = (value) =>  value;
      }
      else{
        interpolationFunc = (value) => (new Date(value)).getDay() === 5 ? value : null;
	  }
      break;

    case '1Y': dateOptions = { year: 'numeric', month: 'short' };
      interpolationFunc = (value, index, labels) =>{
        try{
          if( index === labels.findIndex(l => l === value) && expectedMonth.includes(value.slice(0, 3))){
            expectedMonth.shift();
            return  value.slice(0, 4);
          } else if (index === labels.findIndex(l => l === value) && expectedMonth.includes(value.slice(4, 8))) {  
            return  value.slice(4, 8);  
          } else { 
            return  null;
          }
        } catch(e) {
          return 'e'+e;
        }
       }
      break;

   case '5Y': dateOptions = { year: 'numeric', month: 'short' };
	  let arrayYear=[];
	  let count;
	  if(xLabels.length<=4){
         interpolationFunc = (value, index, labels) => {
        try {
          let date = moment(value,"MMM YYYY");
          let year=date.format("YYYY");
          if(arrayYear.indexOf(year) === -1) {
            arrayYear.push(date.format("YYYY"));
            return date.format("MMM'YY");
          } else {
            return null;
          }
        } catch(e) {
          return 'e'+e;
        }
         };
      }
	  else{
	  interpolationFunc = (value, index, labels) => {
		try {
		  let date = moment(value,"MMM YYYY");
		  let year = date.format("YYYY");
		  let month = date.format("MMM");
		  
		  if(date.month()===0 && arrayYear.indexOf(year) === -1) {
			  count = 1;
			  arrayYear.push(date.format("YYYY"))
			  return date.format("MMM'YY");
		  }
		  else if (date.month() >= 5 && arrayYear.includes(year) && count == 1) {
			  count = 0;
			  arrayYear.push('Jul');
			  let myDate = moment(('Jul ' + year), "MMM YYYY");
			  let finalDate =  myDate.format("MMM'YY"); 
			  return finalDate
		  }
		  else {
			return null;
		  }
		} catch(e) {
		  return 'e'+e;
		}
	  }
	  }
	  break;
          
    case 'YTD': dateOptions = { year: 'numeric', month: 'short' };
      interpolationFunc = (value, index, labels) =>{
        try{
          if( index === labels.findIndex(l => l === value) && expectedMonth.includes(value.slice(0, 3)))
          {
            expectedMonth.shift();
            return  value.slice(0, 4);
          }
          else
          { 
            return  null;
          }
     
        } catch(e) {
          return 'e'+e;
        }
       }
      break;
          
    default: dateOptions = { year: 'numeric', month: 'short' };
      break;
  }

  let xData = xLabels.map((x)=>{
    let xDate = new Date(x);
    let dString = '';
    if(filter!=='1D') {
      dString = (xDate.getMonth()+1) + '/' + xDate.getDate() + '/' + xDate.getFullYear();
    } else {
      dString = xDate.toLocaleTimeString(undefined,{hour: 'numeric', minute: 'numeric' });
    }
    return dString;
  });

  xLabels = xLabels.map(x => {
    let d = new Date(x);
    return d.toLocaleDateString('en-US', dateOptions)
  });

  AddInvestmentChart(
    xLabels, xData,
    data, percentages, null, null, chartStyle,currencySymbol, interpolationFunc);
}

function showOnlyFewMonth(xLabels,filter) { 
  let finalMonthArray=[];
  let monthlist = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let currentYear = moment().year();
  if(xLabels.length>0) {
      let temArray=[];
      for(let i=0; i<=xLabels.length-1;i++) {
      let d = new Date(xLabels[i]);
      if(temArray.indexOf(monthlist[d.getMonth()])===-1 )
        {

         temArray.push(monthlist[d.getMonth()]) ;
        }

        if((xLabels.length-1)===i){
         temArray.push(monthlist[d.getMonth()]);
        } 
      }
      for(let j=0; j<=temArray.length-1;j++) {
        if(temArray.length>0 && finalMonthArray.indexOf(temArray[j])===-1) {
          temArray[j] === "Jan" ? finalMonthArray.push(currentYear.toString()) : finalMonthArray.push(temArray[j]);
        }
      }  
  }
  if(filter==='YTD' && finalMonthArray.length===5) {
    finalMonthArray.pop();
  }
  // console.log(finalMonthArray)
  return finalMonthArray;
}
