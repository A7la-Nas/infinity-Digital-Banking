define(function() {

  let chartFilters = ['1M','1Y','5Y','YTD'];
  let chartStyleConfig = null;
  let defaultChartStyle = {
    lineColor : '#293276',
    areaColor : '#53A8E2'
  };

//   let currentFilter = '1Y';

  function setFilter(filter) {
    let normalSkin="sknlblSSRSB15px";
    let activeSkin="sknlbl0b4d49a4f0ca34615PX";
    let filterLabels = this.view.flxlineChartFilter.widgets();
    filterLabels.forEach(w=>w.skin = w.text.trim().toLowerCase()===filter.toLowerCase()?activeSkin:normalSkin);
    //     drawChart.call(this,filter);
    this.view.brwInvestmentChart.evaluateJavaScript("document.querySelectorAll('[id^=charttooltip]').forEach(node => node.hidden = true);");    
    this.currentFilter = filter;
    if(this.onFilterChanged)
      this.onFilterChanged(filter);
    else
      drawChart.call(this,filter);
  }

  function setFilterValues(filterValues) {
    chartFilters = filterValues || chartFilters;
    let filterLabels = this.view.flxlineChartFilter.widgets();
    filterLabels.forEach((w,i)=>{
      w.text=chartFilters[i];
      w.onTouchEnd = setFilter.bind(this,chartFilters[i]);
    });
  }

  // To draw demo chart data
  function drawChart(chartType){

    var NormalSkin="sknlblSSRSB15px";
    var activeSkin="sknlbl003E75SSPSB5R15px";
    var XaxisArray=[];
    var YaxisArray=[];
    var data=[];
    var maxVal=0;

    if(chartType==="1M")
    {
      XaxisArray=['5', '10', '15', '20', '25', '30'];
      YaxisArray=[0,10,20,50,60,100,120];
      data=[10,40,69,90,5,120];
      maxVal=120;
    }
    else if(chartType==="1Y")
    {
      XaxisArray=['Jan', 'eb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov','Dec'];
      YaxisArray=[0,500,1000,1500,2000,2500,5000];
      data=[0,1000,500,2000,1000,5000,2000,2500,1500,2000,1000,500];
      maxVal=5000;
    }
    else if(chartType==="5Y")
    {
    }
    else if(chartType==="YTD")
    {

    }
    try{
      this.view.brwInvestmentChart.evaluateJavaScript("AddLineChart( " + JSON.stringify(XaxisArray)+" ," + JSON.stringify(data) +"," +JSON.stringify(YaxisArray)+"," +JSON.stringify(maxVal)+"," +JSON.stringify(chartStyleConfig)+" );");
    }catch(e) {
      //       console.log(e);
    }
  }

    function getFormattedDate(date) {
      let year = date.getFullYear();
      let month = (1 + date.getMonth()).toString().padStart(2, '0');
      let day = date.getDate().toString().padStart(2, '0');
      return year+'-'+month + '-' + day;
  }
  function checkWithinMonth(date) {
    let ldat=getFormattedDate(date);
    let today = getFormattedDate(new Date());
    let oneMonthPrior = new Date();
    oneMonthPrior.setMonth((new Date()).getMonth() - 1);
    let someDate = getFormattedDate(oneMonthPrior);
    return ldat >= someDate && ldat <= today;
  }

  function checkWithinYear(date, year = 1) {
    let today = new Date();
    let priorYear = new Date();
    if (year === 0) {
      priorYear.setMonth(0);
      priorYear.setDate(1);
    } else {
      priorYear.setFullYear(priorYear.getFullYear() - year);
    }
	  priorYear.setHours(0);
    priorYear.setMinutes(0);
    priorYear.setSeconds(0);
    return date >= priorYear && date <= today;
  }

  function extractRefinitivData(filter,data) {
    let chartData = data;
    let xData = [];
    let xLabels = [];
    let formattedAmount = [];
    let dateOptions = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    switch (filter) {

      case '1D': 
        break;

      case '1M': chartData = chartData.filter(d => checkWithinMonth(new Date(d.TIMESTAMP)));
        dateOptions = { month: 'short', day: 'numeric' };
        break;

      case '1Y': chartData = chartData.filter(d => checkWithinYear((new Date(d.TIMESTAMP)), 1));
        dateOptions = { year: 'numeric', month: 'short' };
        break;
      case '5Y': chartData = chartData.filter(d => checkWithinYear((new Date(d.TIMESTAMP)), 5));
        dateOptions = { year: 'numeric', month: 'short' };
        break;
      case 'YTD': chartData = chartData.filter(d => checkWithinYear((new Date(d.TIMESTAMP)), 0));
        dateOptions = { year: 'numeric', month: 'short' };
        break;
      default: chartData = chartData.filter(d => checkWithinYear(new Date(d.TIMESTAMP)));
        dateOptions = { year: 'numeric', month: 'short' };
        break;
    }

    // Collect X axis labels
    xLabels = chartData.map(x => x.TIMESTAMP);

    // Collect percentage data if available, otherwise blank
    let percentages = chartData.map(d=>d.PERCENTAGE || '');

    // Collect data points to plot y
    chartData = chartData.map(d => d.CLOSE?d.CLOSE:d.AMOUNT);
    var forUtility = applicationManager.getFormatUtilManager();
    for(var i =0;i<chartData.length;i++){
       formattedAmount.push(forUtility.formatAmount(chartData[i]));
    }
    return {
      data:chartData,xLabels,percentages,formattedAmount
    };
  }

  function drawDataChart(filter,data,chartStyle=null) {
    //     if(chartStyle) {
    chartStyleConfig = chartStyle ? Object.assign({},chartStyleConfig,chartStyle) : defaultChartStyle;      
    //     }
    let chartData = extractRefinitivData(filter,data);
    this.view.brwInvestmentChart.evaluateJavaScript("drawDataChart( " + JSON.stringify(filter)+" ," + JSON.stringify(chartData.xLabels)+" ," +JSON.stringify(chartData.data)+" ," +JSON.stringify(chartData.percentages)+" ," +JSON.stringify(chartStyleConfig)+ " ," + JSON.stringify(this.currencySymbol || '$')+" ," +JSON.stringify(chartData.formattedAmount)+" );");
  }

  function populateChart(data,xLabels,yLabels,chartStyle=null) {
    if(chartStyle) {
      chartStyleConfig = Object.assign({},chartStyleConfig,chartStyle);      
    }
    this.view.brwInvestmentChart.evaluateJavaScript("AddLineChart( " + JSON.stringify(xLabels)+" ," + JSON.stringify(data) +"," +JSON.stringify(yLabels)+"," +JSON.stringify(3000)+"," +JSON.stringify(chartStyleConfig)+" );");
  }

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
    },

    initGettersSetters: function() {

    },
    preShow:function(){
      //Bind event to graph
      //this.view.brwInvestmentChart.onSuccess=setFilter.bind(this,chartFilters[1]);
      this.view.brwInvestmentChart.onPageFinished=setFilter.bind(this,this.currentFilter || chartFilters[1]);
		if(this.currentFilter==='1D')
          {
            let ID = ['1D','1M','1Y','YTD'];
      		setFilterValues.call(this,ID);      
          }
      else{
        setFilterValues.call(this);
      }
      // Bind relevant event to filter labels
      
    },

    // Set Data to Chart
    setChartData : function(data,xLabels,yLabels,chartStyle=null,chartMode=null) {      
      // Refinitiv Integration where data is array of {'CLOSE'/'Amount','TIMESTAMP'}
      if(chartMode) {
        drawDataChart.call(this,this.currentFilter,data,chartStyle);
      }else {         
        populateChart.call(this,data,xLabels,yLabels,chartStyle);
      }
    },
    
    setFilterLabels : function(filter){
      let normalSkin="sknlblSSRSB15px";
    let activeSkin="sknlbl0b4d49a4f0ca34615PX";
    let filterLabels = this.view.flxlineChartFilter.widgets();
    filterLabels.forEach(w=>w.skin = w.text.trim().toLowerCase()===filter.toLowerCase()?activeSkin:normalSkin);
    },

    // Set Filters to Chart
    setChartFilters : function(filterValues) {
      if(filterValues.length){        
        setFilterValues.call(this,filterValues);
      }
    },
  };
});