 define(function() {

  return {
    benchmarkIndex:"",
    constructor: function(baseConfig, layoutConfig, pspConfig) {
            this._data = {};
            var performanceChart = new kony.ui.CustomWidget({
                "id": "performanceChartWealth",
                "isVisible": true,
                "width": "100%",
                "height": "100%",
            }, {
                "padding": [0, 0, 0, 0],
                "paddingInPixel": false
            }, {
                "widgetName": "WealthPerformanceChart",
                "chartData": this._data,
                "OnClickOfPie": function() {}
            });

            this.view.flxChart.add(performanceChart);
        
    },
  // drawDataChart: function(xData,portfolioReturn,benchmarkReturn,filter,portfolioColor,benchmarkColor) {
    drawDataChart: function(response, configurableValue){
    this.view.AllForms1.setVisibility(false);
    this.cardDetails(response, configurableValue);
    var data = response.monthlyOverview;
    var xData = [];
    var portfolioReturn = [];
    var benchmarkReturn = [];
    var filter;
    for (var list in data){
      var formattedDate = data[list].dateTime.slice(4,6)+"/"+data[list].dateTime.slice(6,8)+"/"+data[list].dateTime.slice(0,4);
      xData.push(formattedDate);
      if(data[list].percentageChange == ""){
        data[list].percentageChange = "0";
      }
      portfolioReturn.push(JSON.parse(data[list].percentageChange));
      if(data[list].benchMarkIndex == ""){
        data[list].benchMarkIndex = "0";
      }
      benchmarkReturn.push(JSON.parse(data[list].benchMarkIndex));
    }
//     var xData = ["01/31/2020", "02/29/2020", "03/31/2020", "04/30/2020", "05/31/2020", "06/30/2020", "07/31/2020", "01/31/2021", "09/30/2021", "10/31/2021", "11/30/2021", "12/31/2021"];
//     var portfolioReturn = [2.33, 6.98, 1.16, 1.16, 3.84, 6.98, 11.63, 8.6, 4.65, 1.16, 1.63, -3.49];
//     var benchmarkReturn = [1, 10, -2, 1, 6, 8, 17, 12, 2, -2, 3, 3];
      if(configurableValue.dateFilter == "1Y"){
        filter = "OneY";
      }
      else if(configurableValue.dateFilter == "YTD"){
        filter = "YTD";
      }
      else if(configurableValue.dateFilter == "sinceInception"){
        filter = "Inception";
      }
      else{
        filter = "free";
      }
       var portfolioColor = configurableValue.performanceConfig.firstColorCode;
       var benchmarkColor = configurableValue.performanceConfig.secondColorCode;
      this.view.lblPortfolio.text = configurableValue.performanceConfig.lblOneName;
      this.view.lblBenchmark.text = configurableValue.performanceConfig.lblTwoName;
      this.view.lblBenchmarkRight = configurableValue.performanceConfig.lblTwoName;
      this.view.imgPortfolio.src = configurableValue.performanceConfig.firstImageName;
      this.view.imgBenchmark.src = configurableValue.performanceConfig.secondImageName;
    var finalData={};
    finalData.xData = xData;
    finalData.portfolioReturn = portfolioReturn;
    finalData.benchmarkReturn = benchmarkReturn;
    finalData.filter = filter;
    finalData.portfolioColor = portfolioColor;
    finalData.benchmarkColor = benchmarkColor;
    this.view.flxChart.performanceChartWealth.chartData = finalData;
      if(configurableValue.performanceConfig.graphRequired == "Yes"){
        this.view.flxLeftContent.setVisibility(true);
        this.view.flxBenchmark.setVisibility(false);
        this.view.flxRightContent.left = "70dp";
      }
      else{
        this.view.flxLeftContent.setVisibility(false);
        this.view.flxBenchmark.setVisibility(true);
        this.view.flxRightContent.left = "30dp";
      }
  },
    cardDetails: function(performance, configurableValue){
      var forUtility = applicationManager.getFormatUtilManager();
      this.view.lblValue.text = forUtility.formatAmountandAppendCurrencySymbol(performance.performanceList.initialValue, performance.referenceCurrency);
      this.view.lblNetDepositValue.text = forUtility.formatAmountandAppendCurrencySymbol(performance.performanceList.netDeposit, performance.referenceCurrency);
    this.view.lblPLVal.text = forUtility.formatAmountandAppendCurrencySymbol(performance.performanceList.pl, performance.referenceCurrency);
    this.view.lblFeesVal.text = forUtility.formatAmountandAppendCurrencySymbol(performance.performanceList.feesAndTax, performance.referenceCurrency);
    this.view.lblCurrentValue.text = forUtility.formatAmountandAppendCurrencySymbol(performance.performanceList.currentValue, performance.referenceCurrency);
    var timeWeighted = (forUtility.formatAmount(performance.performanceList.timeWeighted)).replace(",", ".");
    var moneyWeighted = (forUtility.formatAmount(performance.performanceList.moneyWeighted)).replace(",", ".");
    if(performance.performanceList.timeWeighted < 0){
      this.view.lblTimeWeightVal.skin = "sknlblee0005SSPReg15px";
      this.view.lblTimeWeightVal.text = "-" +timeWeighted +"%";
    }
    else{
      this.view.lblTimeWeightVal.skin = "sknLbl2F8523IWSemiBold";
      this.view.lblTimeWeightVal.text = "+" +timeWeighted +"%";
    }
    if(performance.performanceList.moneyWeighted < 0){
      this.view.lblMoneyWeightVal.skin = "sknlblee0005SSPReg15px";
      this.view.lblMoneyWeightVal.text = "-" +moneyWeighted +"%";
    }
    else{
      this.view.lblMoneyWeightVal.skin = "sknLbl2F8523IWSemiBold";
      this.view.lblMoneyWeightVal.text = "+" +moneyWeighted +"%";
    }
      
      var uiData =[];
      var responseArray = performance.benchMarkList;
       if ( performance.benchMarkList[0].benchMarkId !== undefined) {
      for(var num in responseArray){
         var benchmarkData = responseArray[num].benchMark;
         uiData.push( [responseArray[num].benchMarkId, benchmarkData]);
       }
       this.view.lstbxBenchmark.masterData = uiData;
       this.view.lstbxBenchmarkRight.masterData = uiData;
          }
         else{
           this.view.lstbxBenchmark.setEnabled(false);
         }
      if(configurableValue.benchMarkIndex && configurableValue.benchMarkIndex !== " "){
        this.view.lstbxBenchmark.selectedKey = this.benchmarkIndex[0];
        this.view.lstbxBenchmarkRight.selectedKey = this.benchmarkIndex[0];
      }
      else{
       this.view.lstbxBenchmark.selectedKey = this.view.lstbxBenchmark.masterData[0][0];
       this.view.lstbxBenchmarkRight.selectedKey = this.view.lstbxBenchmarkRight.masterData[0][0];
      }
    },
    benchmarkSelection :function(context){
       this.benchmarkIndex = context.selectedKeyValue;
       this.setBenchmark(this.benchmarkIndex[1]);
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

        },
    postShow: function(){
     this.view.flxMoneyInfo.width = "20dp";
      this.view.imgInfo.left = "0dp";
      this.view.imgMoneyInfo.left = "0dp";
      this.view.flxMoneyInfo.height = "20dp";
      this.view.flxImgInfo.width = "20dp";
      this.view.flxImgInfo.height = "20dp";      
      this.view.imgInfo.width = "100%";
      this.view.imgInfo.height = "100%";
      this.view.imgMoneyInfo.width = "100%";
      this.view.imgMoneyInfo.height = "100%";
  },
    dismissInfoPopup: function(){
      this.view.AllForms1.setVisibility(false);
    },
    showTimeInfoPopup: function(){
        if(this.view.AllForms1.isVisible){
        this.view.AllForms1.setVisibility(false);
      }
      else{
      let timeText = "Return calculation that eliminates the effects on growth rates created by any inflows or outflows of cash. The time-weighted return breaks up the return into separate intervals based on whether cash was added or withdrawn.";
      this.view.AllForms1.RichTextInfo.text = timeText;
        this.view.AllForms1.setVisibility(true);
      }
    },
    showMoneyInfoPopup: function(){
      if(this.view.AllForms1.isVisible){
        this.view.AllForms1.setVisibility(false);
      }
      else{
      let moneyText = "Return calculation that uses the rate of return that will set the present values of all cash flows equal to the value of the initial investment. For periods without cash flows Money-weighted return and Time-Weighted return are equal.";
      this.view.AllForms1.RichTextInfo.text = moneyText;
        this.view.AllForms1.setVisibility(true);
      }
    },
    preShow:function(){
 	  this.view.flxChart.setVisibility(true);
      this.view.AllForms1.setVisibility(false);
       this.view.AllForms1.flxCross.onClick = this.dismissInfoPopup;
      this.view.flxImgInfo.onClick = this.showTimeInfoPopup;
      this.view.flxMoneyInfo.onClick = this.showMoneyInfoPopup;
       this.view.postShow =  this.postShow;
      this.view.flxMoneyInfo.width = "20dp";
      this.view.flxMoneyInfo.height = "20dp";
      this.view.imgInfo.left = "0dp";
      this.view.imgMoneyInfo.left = "0dp";
      this.view.flxImgInfo.width = "20dp";
      this.view.flxImgInfo.height = "20dp";
      this.view.imgInfo.width = "100%";
      this.view.imgInfo.height = "100%";
      this.view.imgMoneyInfo.width = "100%";
      this.view.imgMoneyInfo.height = "100%";
      this.view.lstbxBenchmark.onSelection = this.benchmarkSelection;
      this.view.lstbxBenchmarkRight.onSelection = this.benchmarkSelection;
    },
  };
});