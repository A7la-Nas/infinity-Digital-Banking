define(function() {

  let chartFilters = ['1M','1Y','5Y','YTD'];
  let chartStyleConfig = null;
  let defaultChartStyle = {
    lineColor : '#293276',
    areaColor : '#53A8E2'
  };

//   let currentFilter = '1Y';
 
  function setFilter(filter) {
    filterBorderPosition.call(this, filter || chartFilters[0]);
    this.currentFilter = filter;
    if(this.onFilterChanged)
      this.onFilterChanged(filter);
    else
      drawChart.call(this,filter);
  }
  function filterBorderPosition(filter) {
    this.view.lblDate1.skin = "bbSknLbl727272SSP15Px";
    this.view.lblDate2.skin = "bbSknLbl727272SSP15Px";
    this.view.lblDate3.skin = "bbSknLbl727272SSP15Px";
    this.view.lblDate4.skin = "bbSknLbl727272SSP15Px";
    if (filter === this.date1) {
      this.view.flxFilterBorder.left = "0dp";
      this.view.lblDate1.skin = "bbSknLbl424242SSP15Px";
    } else if (filter === this.date3) {
      this.view.flxFilterBorder.left = "80dp";
      this.view.lblDate3.skin = "bbSknLbl424242SSP15Px";
    } else if (filter === this.date4) {
      this.view.flxFilterBorder.left = "120dp";
      this.view.lblDate4.skin = "bbSknLbl424242SSP15Px";
    } else {
      this.view.flxFilterBorder.left = "40dp";
      this.view.lblDate2.skin = "bbSknLbl424242SSP15Px";
    }
  }
  function setFilterValues(filterValues) {
    chartFilters = filterValues || chartFilters;
    let filterLabels = this.view.flxlineChartFilter.widgets();
    filterLabels.forEach((w,i)=>{
      w.text=chartFilters[i];
      w.onClick = setFilter.bind(this,chartFilters[i]);
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
      //this.view.brwInvestmentChart.evaluateJavaScript("AddLineChart( " + JSON.stringify(XaxisArray)+" ," + JSON.stringify(data) +"," +JSON.stringify(YaxisArray)+"," +JSON.stringify(maxVal)+"," +JSON.stringify(chartStyleConfig)+" );");
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

    return {
      data:chartData,xLabels,percentages
    };
  }

  function drawDataChart(filter,data,chartStyle=null) {
    //     if(chartStyle) {
    chartStyleConfig = chartStyle ? Object.assign({},chartStyleConfig,chartStyle) : defaultChartStyle;      
    //     }
    let chartData = extractRefinitivData(filter,data);
      
    var finalData={};
    finalData.filter = filter;
    finalData.xLabels = chartData.xLabels;
    finalData.data = chartData.data;
    finalData.percentages = chartData.percentages;
    finalData.chartStyle = chartStyleConfig;
    finalData.currencySymbol = scope_WealthPresentationController.investmentChartCurrency || '$';
    if(scope_WealthPresentationController.priceChartCurrency !== "")
    finalData.currencySymbol = scope_WealthPresentationController.priceChartCurrency;
    this.view.flxChart.lineChartWealth.chartData = finalData;  
    filterBorderPosition.call(this, filter || chartFilters[0]);
    //this.view.brwInvestmentChart.evaluateJavaScript("drawFinalDataChart( " + JSON.stringify(filter)+" ," + JSON.stringify(chartData.xLabels)+" ," +JSON.stringify(chartData.data)+" ," +JSON.stringify(chartData.percentages)+" ," +JSON.stringify(chartStyleConfig)+ " ," + JSON.stringify(this.currencySymbol || '$')+" );");
  }

  function populateChart(data,xLabels,yLabels,chartStyle=null) {
    if(chartStyle) {
      chartStyleConfig = Object.assign({},chartStyleConfig,chartStyle);      
    }
    //this.view.brwInvestmentChart.evaluateJavaScript("AddLineChart( " + JSON.stringify(xLabels)+" ," + JSON.stringify(data) +"," +JSON.stringify(yLabels)+"," +JSON.stringify(3000)+"," +JSON.stringify(chartStyleConfig)+" );");
  }

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
            this._data = {};
            var lineChart = new kony.ui.CustomWidget({
                "id": "lineChartWealth",
                "isVisible": true,
                "width": "100%",
                "height": "100%",
            }, {
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "widgetName": "WealthLineChart",
                "chartData": this._data,
                "OnClickOfPie": function() {}
            });

            this.view.flxChart.add(lineChart);
        
    },

    initGettersSetters: function() {

    },
    preShow:function(){
      //Bind event to graph
      //this.view.brwInvestmentChart.onSuccess=setFilter.bind(this,chartFilters[1]);
      //this.view.brwInvestmentChart.onPageFinished=setFilter.bind(this,this.currentFilter || chartFilters[1]);
      this.view.flxlineChartFilter.skin="flxHoverSkinPointer";
      this.view.lblDate1.text = this.date1;
      this.view.lblDate2.text = this.date2;
      this.view.lblDate3.text = this.date3;
      this.view.lblDate4.text = this.date4;
      this.view.lblDate1.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1
        }
      }
      this.view.flxDate1.accessibilityConfig = {
        a11yARIA: {
          role: "button",
          "aria-labelledby": "lbldate1"
        }
      }
      this.view.lblDate2.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1
        }
      }
      this.view.flxDate2.accessibilityConfig = {
        a11yARIA: {
          role: "button",
          "aria-labelledby": "lbldate2"
        }
      }
      this.view.lblDate3.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1
        }
      }
      this.view.flxDate3.accessibilityConfig = {
        a11yARIA: {
          role: "button",
          "aria-labelledby": "lbldate3"
        }
      }
      this.view.lblDate4.accessibilityConfig = {
        a11yARIA: {
          tabindex: -1
        }
      }
      this.view.flxDate4.accessibilityConfig = {
        a11yARIA: {
          role: "button",
          "aria-labelledby": "lbldate4"
        }
      }
      if(this.date1==='1D')
      {
        let ID = ['1D','1M','1Y','YTD'];
        setFilterValues.call(this,ID);
        setFilter.call(this, this.currentFilter);
        this.view.forceLayout();
      }
      else{
        setFilterValues.call(this);
      }
      // Bind relevant event to filter labels

    },
    accSetActive: function(){
      var self = this;
      self.view.flxDate1.setActive(true);
    },
    // Set Data to Chart
    setChartData : function(data,chartStyle=null) {      
      // Refinitiv Integration where data is array of {'CLOSE'/'Amount','TIMESTAMP'}
      drawDataChart.call(this,this.currentFilter,data,chartStyle);
    },

    // Set Filters to Chart
    setChartFilters : function(filterValues) {
      if(filterValues.length){        
        setFilterValues.call(this,filterValues);
      }
    },
  };
});