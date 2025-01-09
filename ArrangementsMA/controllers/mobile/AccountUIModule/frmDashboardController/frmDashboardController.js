define({
	adsHided : false,
    currAdFlex : 1,
    accountDashboardCampaignData : [],
    numOfAds : 0,
    xOffset : 0,
    imageObjArray : [],
    imageDownloadFailureCount : 0,
    gestIDs : [],
    isSwipeDone : false,
    isTapDone : false,
    init : function(){
    var date = new Date();
		this.currentMonth = parseInt(date.getMonth()+1);
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
	},
    preshow: function () {
      var navManager = applicationManager.getNavigationManager();
      navManager.setEntryPoint("centralmoneymovement","frmDashboardAggregated");
      navManager.setEntryPoint("europeTransferFlow","frmDashboardAggregated");
      this.view.flxDashboardHeader.showFadingEdges = false;
      this.view.flxDashboard.showFadingEdges = false;
      this.adsPreshow();
       if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
         this.view.flxTitle.isVisible = true;
         this.view.flxMenu.isVisible = false;
       }
        else{
          this.view.flxTitle.isVisible = false;
         this.view.flxMenu.isVisible = true;
         }
      	this.CATEGORY_COUNT = 9;
        this.initActions();
      	this.MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
         var authMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
         authMode.presentationController.firstTimeLoginDone();
         var navMan = applicationManager.getNavigationManager();
         var formatUtility = applicationManager.getFormatUtilManager();
         var custominfo = navMan.getCustomInfo("frmDashboard");
         var accountData = custominfo.accountData;
         var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
         var processedAccountsData = accountMod.presentationController.processAccountsData(accountData);
         var totalAvaBal = accountMod.presentationController.getTotalAvailableBalance(accountData);
         var totalDebt = accountMod.presentationController.getTotalDebtBalance(accountData);
         var totalAvlFloat = totalAvaBal.replace(',', '');
		 var totalDebtFloat = totalDebt.replace(',', '');
         totalAvlFloat = parseFloat(totalAvlFloat.replace(/[^0-9,.]*/, ''));
         totalDebtFloat = parseFloat(totalDebtFloat.replace(/[^0-9,.]*/, ''));
         this.view.lblBankName.text = formatUtility.formatAmountandAppendCurrencySymbol(totalAvlFloat - totalDebtFloat);
         this.view.lblAssetsValue.text = totalAvaBal;
         this.view.lblDebtValue.text = totalDebt;
         this.view.segAccounts.widgetDataMap={
                             lblAccountName:"nickName",
                             lblAccountBalValue:"availableBalance",
                           //  lblBankName:"bankName",
                             lblBankName:"accountBalanceType",
                           	 lblAccountId:"accountID",
                             lblAccountBal:"accountBalanceType"
                            };
      	this.view.segSummary.widgetDataMap = {
             "lblSpending": "accountName",
             "lblAmountSpent": "availableBalance"
        };
      	 this.view.segSummary.setData(processedAccountsData);
         this.view.segAccounts.setData(processedAccountsData);
         this.view.flxHamburger.setVisibility(false);
   //	this.view.customFooter.flxMore.onClick = this.onClickFlxMore;
      	this.view.flxOne.onClick = this.navigateToPFM;
        var navManager = applicationManager.getNavigationManager();
	  	var currentForm = navManager.getCurrentForm();
	    applicationManager.getPresentationFormUtility().logFormName(currentForm);
	  	applicationManager.getPresentationUtility().dismissLoadingScreen();
        var loggerManager = applicationManager.getLoggerManager();
    	loggerManager.setCustomMetrics(this,true,"#Successfull Logins");
        if(custominfo.isNavigationFromQuickAction)
          {
           var basicConfig = {message: custominfo.quickActionAlertText,alertIcon:null,alertType: constants.ALERT_TYPE_INFO};
           var pspConfig = {};
           applicationManager.getPresentationUtility().showAlertMessage(basicConfig,pspConfig);
           custominfo.isNavigationFromQuickAction = false;
          }
   },
  mapDataToBar : function(){
    var navManager = applicationManager.getNavigationManager();
    var barData = navManager.getCustomInfo("frmDashboardPFMBar");
    var p = 0;
    for (p = 0; p < barData.length; p++) {
      if(p >= this.limitMonth)
      {
        barData[p].totalCashFlow = 0;
      }
    }
    var maxAmount = barData.reduce(function (previous, record) {
        if (previous > parseInt(record.totalCashFlow)) {
            return previous;
        }
        return parseInt(record.totalCashFlow);
    }, 0).toFixed(2);
    var barGraphData = [];
    var barSegData = [];
    var formatUtility = applicationManager.getFormatUtilManager();
    for(p = 0; p < barData.length; p++)
    {
        barGraphData.push((parseInt(barData[p].totalCashFlow) * 100) / maxAmount);
        if(p < this.limitMonth)
        {
          barSegData.push({
            "monthName": kony.i18n.getLocalizedString("kony.mb.Months."+barData[p].monthName),
            "totalCashFlow": formatUtility.formatAmountandAppendCurrencySymbol(barData[p].totalCashFlow)
          });
        }
    }
    this.view.segBar.widgetDataMap = {
                "lblSpending": "monthName",
                "lblAmountSpent": "totalCashFlow",
            };
    this.view.segBar.setData(barSegData);
	  var result = this.view.browserBar.evaluateJavaScript("createBarChart("+JSON.stringify(barGraphData)+");");
   	if(!result){
      kony.ui.Alert("Error in creating chart");
    }
  },
  mapDataToChart : function(){
    var navManager = applicationManager.getNavigationManager();
    var pieData = navManager.getCustomInfo("frmDashboardPFMPie");
    this.mapDataToBar();
    var chartData = [];
    var segSpendingData = [];
    var formatUtility = applicationManager.getFormatUtilManager();
    var totalAmount = pieData.reduce(function(previous, record) {
                			return previous + Number(record.cashSpent);
            			}, 0).toFixed(2);
    pieData.forEach(function(record) {
				var percentageValue = Math.round((record.cashSpent * 100) / totalAmount) + "%";
                chartData.push({
                    "label": kony.i18n.getLocalizedString("kony.mb.PFM." + record.categoryName),
                    "value": percentageValue,
                  	"color":"ffffff",
                  	"alpha":"80"
                });
                segSpendingData.push({
                    "categoryName": kony.i18n.getLocalizedString("kony.mb.PFM." + record.categoryName) + " - " + percentageValue,
                    "cashSpent": formatUtility.formatAmountandAppendCurrencySymbol(record.cashSpent)
                });
            });
            this.view.segTransactions.widgetDataMap = {
                "lblSpending": "categoryName",
                "lblAmountSpent": "cashSpent",
            };
            this.view.segTransactions.setData(segSpendingData);
    		var x = this.view.browserChart.evaluateJavaScript("createPieChart("+JSON.stringify(chartData)+");");
    		this.view.lblTotalSpendingValue.text = formatUtility.formatAmountandAppendCurrencySymbol(totalAmount);
    		this.view.lblMonthAndYearSummary.text = kony.i18n.getLocalizedString("kony.mb.Months."+this.MONTH_NAMES[this.currentMonth-1]);
    		this.view.lblMonthAndYear.text = kony.i18n.getLocalizedString("kony.mb.Months."+this.MONTH_NAMES[this.currentMonth-1]);
    		if(!x){
              kony.ui.Alert("Error in creating PFM chart");
            }
    	this.view.forceLayout();
    	applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  prevMonthClick : function(){
    if(this.currentMonth===1){
      return;
    }
    this.prevMonth = parseInt(this.currentMonth)-1;
    this.nextMonth = -1;
    this.goToMonth(this.prevMonth);
  },
  nextMonthClick : function(){
    if(this.currentMonth===12){
      return;
    }
    this.prevMonth = -1;
    this.nextMonth = parseInt(this.currentMonth)+1;
    this.goToMonth(this.nextMonth);
  },
  goToMonth : function(monthId){
     var date = new Date();
     var presentYear = date.getFullYear();
     applicationManager.getPresentationUtility().showLoadingScreen();
     var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
     accountMod.presentationController.fetchMonthPFMData(monthId,presentYear,this.monthFetchSuccess,this.monthFetchFailure);
  },
  monthFetchSuccess : function(response){
    if(response.length>0){
    var navManager = applicationManager.getNavigationManager();
   	navManager.setCustomInfo("frmDashboardPFMPie",response);
    if(this.prevMonth===-1){
      this.currentMonth++;
    }
    else if(this.nextMonth === -1){
      this.currentMonth--;
    }
     this.mapDataToChart();
    }
  },
  monthFetchFailure : function(response){
    kony.ui.Alert("Something went wrong");
  },
   onClickFlxMore : function(){
     var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
     accountMod.presentationController.commonFunctionForNavigation("frmMenu");
   },
   postShow: function(){
        this.view.flxDashboardHeader.scrollToWidget(this.view.flxDashboardHeader.widgets()[0]);
   },
    /**
     * Description
     * @method onSuccessEvent
     * @return
     */
   onSuccessEvent: function(){
     this.mapDataToChart();
   },
   initActions: function () {
       var scope = this;
       this.view.browserChart.onSuccess = this.onSuccessEvent;
       this.view.flxPrevMonth.onClick = this.prevMonthClick.bind(this);
       this.view.flxNextMonth.onClick = this.nextMonthClick.bind(this);
       this.view.flxDummyHorizontalScroll.onScrolling=function(){
        if (scope.view.flxDashboard.zIndex>scope.view.flxDashboardHeader.zIndex) {
          var scrollX=scope.view.flxDummyHorizontalScroll.contentOffsetMeasured.x;
          scope.view.flxDashboardHeader.setContentOffset({"x":scrollX+"dp"});
        }
        scope.pageIndicatorHighlight();
      };
      this.view.flxDashboardHeader.onScrolling=function(){
          if (scope.view.flxDashboard.zIndex<scope.view.flxDashboardHeader.zIndex) {
              var scrollX=scope.view.flxDashboardHeader.contentOffsetMeasured.x;
              scope.view.flxDummyHorizontalScroll.setContentOffset({"x":scrollX+"dp"});
          }
          scope.pageIndicatorHighlight();
        };
      this.view.flxDashboard.onScrolling=function(){
          var vScroll=scope.view.flxDashboard.contentOffsetMeasured.y;
          if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
              scope.view.flxDashboardHeader.top=Math.round(vScroll*-0.3)+56+"dp";
              scope.view.flxGradient.top=Math.round(vScroll*-0.3)+56+"dp";
              scope.view.flxPageIndicators.top=Math.round(vScroll*-0.3)+56+230+"dp";
          }
           else{
              scope.view.flxDashboardHeader.top=Math.round(vScroll*-0.3)+"dp";
              scope.view.flxGradient.top=Math.round(vScroll*-0.3)+"dp";
              scope.view.flxPageIndicators.top=Math.round(vScroll*-0.3)+230+"dp";
          }
      };
      this.view.flxChartSizeToggle.onTouchEnd = function () {
        scope.view.flxChartSizeToggle.setEnabled(false);
          scope.view.flxDashboard.setContentOffset({y:"0dp"});
        if (scope.view.imgChartSizeToggle.src === "arrowdown.png") {
          scope.view.flxDonutSegment.setVisibility(true);
          scope.view.flxBarSegment.setVisibility(true);
          scope.view.flxSummarySegment.setVisibility(true);
          var newHeight = scope.view.flxBGDummy.frame.height;
          if (applicationManager.getPresentationFormUtility().getDeviceName() === "android") {
            newHeight = newHeight - 56;
          }
          scope.view.flxGradient.height = newHeight+25+"dp";
          var segMaxHeight=newHeight-399;// -260 -1 -42 - 1 -35 -60
          newHeight = newHeight -35+ "dp";
          scope.view.imgChartSizeToggle.src = "arrowup.png";
          scope.view.flxDashboardHeader.height = newHeight;
          scope.view.segTransactions.height=segMaxHeight+"dp";
          scope.view.segSummary.height=segMaxHeight+60+"dp";
          scope.view.segBar.height=segMaxHeight+60+"dp";
          scope.view.flxSummarySegment.height=segMaxHeight+104+"dp";
          scope.view.flxBarSegment.height=segMaxHeight+104+"dp";
          scope.view.flxDonutSegment.height=segMaxHeight+104+"dp";
          if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
              scope.view.flxDashboard.animate(
                  kony.ui.createAnimation({
                  0:{bottom:"60dp","stepConfig":{}},
                  100:{bottom:"0dp","stepConfig":{}}}),
                  {fillMode:kony.anim.FILL_MODE_FORWARDS,duration:.3},
                  {
                      animationEnd: function() {}
                  }
              );
              scope.view.flxMenu.animate(
                  kony.ui.createAnimation({
                  0:{bottom:"0dp","stepConfig":{}},
                  100:{bottom:"-60dp","stepConfig":{}}}),
                  {fillMode:kony.anim.FILL_MODE_FORWARDS,duration:.3},
                  {
                      animationEnd: function() {}
                  }
              );
          }
              scope.view.flxDummyHorizontalScroll.animate(
                  kony.ui.createAnimation({
                  0:{height:"250dp","stepConfig":{}},
                  100:{height:newHeight,"stepConfig":{}}}),
                  {fillMode:kony.anim.FILL_MODE_FORWARDS,duration:.3},
                  {animationEnd: function() {
                      scope.view.flxDashboard.enableScrolling=false;
                      scope.view.flxDashboard.zIndex=3;
                  }});
          } else {
              scope.view.imgChartSizeToggle.src = "arrowdown.png";
              scope.view.flxDashboard.zIndex=6;
              if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
                  scope.view.flxDashboard.animate(
                      kony.ui.createAnimation({
                      0:{bottom:"0dp","stepConfig":{}},
                      100:{bottom:"60dp","stepConfig":{}}}),
                      {fillMode:kony.anim.FILL_MODE_FORWARDS,duration:.3},
                      {
                          animationEnd: function() {}
                      }
                  );
                  scope.view.flxMenu.animate(
                      kony.ui.createAnimation({
                      0:{bottom:"-60dp","stepConfig":{}},
                      100:{bottom:"0dp","stepConfig":{}}}),
                      {fillMode:kony.anim.FILL_MODE_FORWARDS,duration:.3},
                      {
                          animationEnd: function() {}
                      }
                  );
              }
              scope.view.flxDummyHorizontalScroll.animate(
                  kony.ui.createAnimation({
                  0:{height:scope.view.flxDummyHorizontalScroll.height+"dp","stepConfig":{}},
                  100:{height:"250dp","stepConfig":{}}}),
                  {fillMode:kony.anim.FILL_MODE_FORWARDS,duration:.3},
                  {animationEnd: function() {
                      scope.view.flxGradient.height = "55%";
                      scope.view.flxDashboardHeader.height = "55%";
                      scope.view.flxBarSegment.setVisibility(false);
                      scope.view.flxSummarySegment.setVisibility(false);
                      scope.view.flxDonutSegment.setVisibility(false);
                      scope.view.flxDashboard.enableScrolling=true;
                  }});
          }
        scope.view.flxDummyHorizontalScroll.enableScrolling=true;
        scope.view.flxChartSizeToggle.setEnabled(true);
      };
       var configManager = applicationManager.getConfigurationManager();
       var MenuHandler =  applicationManager.getMenuHandler();
     MenuHandler.setUpHamburgerForForm(scope,configManager.constants.MENUACCOUNTS);
       this.view.flxShowGraph.onClick = function(){
           scope.showGraph();
       };
       //this.view.flxDashboard.onScrolling = this.onScrollingDashboard;
       //scope.view.segAccounts.onTouchEnd = this.onScrollingSegment;
     this.view.btnViewAllTransactions.onClick = this.viewTransactions.bind(this);
   },
  viewTransactions : function(){
    try{
      			applicationManager.getPresentationUtility().showLoadingScreen();
      			this.currentTransactions = 0;
                this.totalTransactions = this.CATEGORY_COUNT;
                for (i = 1; i <= this.CATEGORY_COUNT; i++) {
                    this.fetchTransactions(this.currentMonth, i);
                }
            }
        catch (exception) {
            //replace
        }
    },
    /**
     * Description
     * @method fetchTransactions
     * @param {} monthId
     * @param {} categoryId
     * @return
     */
    fetchTransactions: function(monthId, categoryId) {
        try {
            this.transactions = [];
          	var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
            var inputParams = {
                "monthId": monthId + "",
                "categoryId": categoryId + ""
            };
			accountMod.presentationController.getPFMTransactions(inputParams, this.fetchTransactionsSuccess.bind(this), this.fetchTransactionsFailure.bind(this));
        } catch (exception) {
            //replace
        }
    },
    /**
     * Description
     * @method fetchTransactionsSuccess
     * @param {} response
     * @return
     */
    fetchTransactionsSuccess: function(response) {
        try {
            this.currentTransactions++;
            Array.prototype.push.apply(this.transactions, response);
            if (this.currentTransactions === this.totalTransactions) {
                var navManager = applicationManager.getNavigationManager();
                this.navData = [];
                this.navData.transactions = this.transactions;
                this.navData.isYear = false;
                navManager.setCustomInfo("frmPFMAdvancedSearchData", this.navData);
                navManager.setCustomInfo("frmPFMCategorisedTransactions", this.transactions);
                var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
     		accountMod.presentationController.commonFunctionForNavigation("frmPFMCategorisedTransactions");
            }
        } catch (exception) {
            //replace
        }
    },
    /**
     * Description
     * @method fetchTransactionsFailure
     * @param {} response
     * @return
     */
    fetchTransactionsFailure: function(response) {
        try {
            this.currentTransactions++;
        } catch (exception) {
            //replace
        }
        // alert("Failure" + JSON.stringify(response));
    },
     onScrollingDashboard: function(){
       if(this.view.flxSuggestedOffers.isVisible === true){
           return;
       }
       if(this.view.flxSpendingBudget.isVisible === true){
           return;
       }
       var scope = this;
       var flxy = scope.view.flxDashboard.contentOffsetMeasured.y;
       if(flxy>=50){
           scope.view.segAccounts.height = "100%";
           scope.view.forceLayout();
       }
   },
   onScrollingSegment : function(){
       var scope = this;
       if(scope.view.flxGraph.height!=="0dp"){
           scope.showGraph();
       }
       if(scope.view.segAccounts.height !== "preferred"){
           var segy = scope.view.segAccounts.contentOffsetMeasured.y;
           if(segy<=1){
               scope.view.segAccounts.height = "preferred";
               scope.view.forceLayout();
           }
       }
   },
   showGraph: function () {
       var scope = this;
       var heightValue;
       if (this.view.flxGraph.height === "0dp") {
           heightValue = "245dp";
       } else {
           heightValue = "0dp";
       }
       this.view.flxGraph.animate(
           kony.ui.createAnimation({
               "100": {
                   "stepConfig": {
                       "timingFunction": kony.anim.EASE
                   },
                   "height": heightValue
               }
           }), {
               "delay": 0,
               "iterationCount": 1,
               "fillMode": kony.anim.FILL_MODE_FORWARDS,
               "duration": 0.25
           }, {
               "animationEnd": function () {
                   if (heightValue === "0dp") {
                       scope.view.imgShowGraph.src = "dashboardicon.png";
                   } else {
                       scope.view.imgShowGraph.src = "dbicon_up.png";
                   }
                   scope.view.forceLayout();
               }
           });
   },
   pageIndicatorHighlight : function(){
    for (let index = 1; index <= this.view.flxPageIndicators.widgets().length; index++) {
        this.view["flxPageIndicator"+index].skin="sknFlxPageIndicatorUnselected";
    }
    var scrollX=this.view.flxDummyHorizontalScroll.contentOffsetMeasured.x;
    var screenWidth = kony.os.deviceInfo().screenWidth;
    var chartNum=Math.round(scrollX/screenWidth)+1;
    // alert("chartNum : "+chartNum);
    this.view["flxPageIndicator"+chartNum].skin="sknFlxPageIndicatorSelected";
},
   showAllAccountTypes: function () {
       var scope = this;
       var heightValue;
       if (this.view.flxAccountTypes.height === "0dp") {
           heightValue = "preferred";
       } else {
           heightValue = "0dp";
       }
       this.view.flxAccountTypes.animate(
           kony.ui.createAnimation({
               "100": {
                   "stepConfig": {
                       "timingFunction": kony.anim.EASE
                   },
                   "height": heightValue
               }
           }), {
               "delay": 0,
               "iterationCount": 1,
               "fillMode": kony.anim.FILL_MODE_FORWARDS,
               "duration": 0.25
           }, {
               "animationEnd": function () {
                   if (heightValue === "0dp") {
                       scope.view.imgShowAllAccounts.src = "arrowdown.png";
                   } else {
                       scope.view.imgShowAllAccounts.src = "arrowup.png";
                   }
                   scope.view.forceLayout();
               }
           });
   },
   setAccountsData: function () {
       var data = [
           [{
                   "lblTypeName": "Checking Accounts (3)",
                   "lblTypeValue": "$127,912.00"
               },
               [{
                       "imgBank": "bankofamerica.png",
                       "lblAccountBal": "Available Balance",
                       "lblAccountBalValue": "$42,304.00",
                       "lblAccountName": "My Checking…2343",
                       "lblBankName": "Bank of America"
                   },
                   {
                       "imgBank": "chasebank.png",
                       "lblAccountBal": "Available Balance",
                       "lblAccountBalValue": "$42,304.00",
                       "lblAccountName": "Little John…2343",
                       "lblBankName": "Citi Bank"
                   },
                   {
                       "imgBank": "citibank.png",
                       "lblAccountBal": "Available Balance",
                       "lblAccountBalValue": "$42,304.00",
                       "lblAccountName": "Honey home…2343",
                       "lblBankName": "Chase Bank"
                   },
               ]
           ],
           [{
                   "lblTypeName": "Saving Accounts (3)",
                   "lblTypeValue": "$83,912.00"
               },
               [{
                       "imgBank": "bankofamerica.png",
                       "lblAccountBal": "Available Balance",
                       "lblAccountBalValue": "$42,304.00",
                       "lblAccountName": "My Saving…2343",
                       "lblBankName": "Citi Bank"
                   },
                   {
                       "imgBank": "citibank.png",
                       "lblAccountBal": "Available Balance",
                       "lblAccountBalValue": "$42,304.00",
                       "lblAccountName": "John Saving…2343",
                       "lblBankName": "Chase Bank"
                   },
               ]
           ],
           [{
                   "lblTypeName": "Credit Cards (3)",
                   "lblTypeValue": "$83,912.00"
               },
               [{
                       "imgBank": "chasebank.png",
                       "lblAccountBal": "Available Balance",
                       "lblAccountBalValue": "$42,304.00",
                       "lblAccountName": "Kony Corel Card…2343",
                       "lblBankName": "Citi Bank"
                   },
                   {
                       "imgBank": "citibank.png",
                       "lblAccountBal": "Available Balance",
                       "lblAccountBalValue": "$42,304.00",
                       "lblAccountName": "Little John…2343",
                       "lblBankName": "Chase Bank"
                   },
               ]
           ],
           [{
                   "lblTypeName": "Loans (1)",
                   "lblTypeValue": ""
               },
               [{
                   "imgBank": "bankofamerica.png",
                   "lblAccountBal": "Available Balance",
                   "lblAccountBalValue": "$42,304.00",
                   "lblAccountName": "My Checking…2343",
                   "lblBankName": "Citi Bank"
               }]
           ],
           [{
                   "lblTypeName": "Deposits (1)",
                   "lblTypeValue": ""
               },
               [{
                   "imgBank": "citibank.png",
                   "lblAccountBal": "Available Balance",
                   "lblAccountBalValue": "$42,304.00",
                   "lblAccountName": "My Checking…2343",
                   "lblBankName": "Citi Bank"
               }]
           ],
           [{
                   "lblTypeName": "Deposits (1)",
                   "lblTypeValue": ""
               },
               [{
                   "imgBank": "citibank.png",
                   "lblAccountBal": "Available Balance",
                   "lblAccountBalValue": "$42,304.00",
                   "lblAccountName": "My Checking…2343",
                   "lblBankName": "Citi Bank"
               }]
           ],
           [{
                   "lblTypeName": "Deposits (1)",
                   "lblTypeValue": ""
               },
               [{
                   "imgBank": "citibank.png",
                   "lblAccountBal": "Available Balance",
                   "lblAccountBalValue": "$42,304.00",
                   "lblAccountName": "My Checking…2343",
                   "lblBankName": "Citi Bank"
               }]
           ],
           [{
                   "lblTypeName": "Deposits (1)",
                   "lblTypeValue": ""
               },
               [{
                   "imgBank": "citibank.png",
                   "lblAccountBal": "Available Balance",
                   "lblAccountBalValue": "$42,304.00",
                   "lblAccountName": "My Checking…2343",
                   "lblBankName": "Citi Bank"
               }]
           ],
           [{
                   "lblTypeName": "Deposits (1)",
                   "lblTypeValue": ""
               },
               [{
                   "imgBank": "citibank.png",
                   "lblAccountBal": "Available Balance",
                   "lblAccountBalValue": "$42,304.00",
                   "lblAccountName": "My Checking…2343",
                   "lblBankName": "Citi Bank"
               }]
           ],
       ];
       this.view.segAccounts.setData(data);
   },
   accountSegmentOnClick: function(){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var rowid=this.view.segAccounts.selectedRowIndex[1];
    var selectedAccountId = this.view.segAccounts.data[rowid]["accountID"];
    var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
    var processedAccountsData = accountMod.presentationController.fetchAccountTransactions(selectedAccountId);
   },
   navigateToPFM : function(){
     var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
     accountMod.presentationController.fetchPFMDetails();
   },
    adsPreshow : function(){
    if(!this.adsHided){
            this.resetAdsUI();
            var navManager = applicationManager.getNavigationManager();
            var formData = navManager.getCustomInfo("frmDashboard");
            if (formData.accountDashboardCampaignData) {
              if(formData.accountDashboardCampaignData.length!==0)
                {
                  this.accountDashboardCampaignData = formData.accountDashboardCampaignData;
                  this.bindAdData();
                }
              else
                {
                  this.hideAds();
                }
            }
            else{
              this.hideAds();
            }
      }
  },
  bindAdData : function(){
    var accountDashboardCampaignData = this.accountDashboardCampaignData;
    this.numOfAds = accountDashboardCampaignData.length;
    var param;
    var date = new Date();
    var deviceUtilManager = applicationManager.getDeviceUtilManager();
    this.view.flxLoadingIndicator.setVisibility(true);
    for(var j = 1; j <= this.numOfAds; j++)
    {
      param=date.getTime();
      this.view["flxAd"+j].setVisibility(false);
      this.view["flxAd"+j].left=parseInt(deviceUtilManager.getDeviceInfo().screenWidth) + "dp";
      this.view["imgAd"+j].src = accountDashboardCampaignData[j-1].imageURL + "?Param=" + param;;
    }
  },
  resetAdsUI :function(){
    this.currAdFlex = 1;
    this.imageObjArray = [];
	this.imageDownloadFailureCount = 0;
    this.xOffset = 0;
    this.isSwipeDone = false;
    this.isTapDone = false;
    this.removeGestureRecognisers();
    this.view.flxScrollContainerAds.setContentOffset({
    x: this.xOffset,
    y: 0
  }, true);
        this.view.flxLoadingIndicator.setVisibility(true);
        this.view.imgLoadingIndicator.src = "loadermedium.gif";
        this.view.flxAdInfo.setVisibility(false);
        for(var i=1;i<=5;i++)
          {
            this.view["flxAd"+i].setVisibility(false);
            this.view["flxProgressButton"+i].setVisibility(false);
          }
        this.view.flxProgressBar.forceLayout();
        this.view.flxProgressBar.setVisibility(false);
  },
  onAdDownloadComplete : function(issuccess,adNumber){
     if(issuccess)
     {
       var i=this.imageObjArray.length;
       this.view["flxAd"+adNumber].setVisibility(true);
       this.alignFlexInScrollContainer(i+1);
       if(i===0)
       {
         this.setGestureRecogniser();
         this.setDataForAd(adNumber);
         var loggerManager = applicationManager.getLoggerManager();
    	 loggerManager.setCustomMetrics(this,true,"#AccountDashboardCampaigns Displayed");
       }
       this.imageObjArray[i] = adNumber;
     }
   else
   {
     this.imageDownloadFailureCount++;
     this.view["flxAd"+adNumber].setVisibility(false);
     if(this.imageDownloadFailureCount === this.numOfAds)
     {
       var logger = applicationManager.getLoggerManager();
       logger.log("####All Account dashboard Campaign's download failed\n####Therefore Hiding Them");
       this.onAllAdsDownloadFailure();
     }
   }
   if(this.imageObjArray.length >= 1 && (this.imageObjArray.length + this.imageDownloadFailureCount) === this.numOfAds) {
      this.onAllAdsDownloadComplete();
    }
  },
  onAllAdsDownloadComplete: function() {
    var deviceUtilManager = applicationManager.getDeviceUtilManager();
    var visible = 0;
     for(var k = 1; k <= this.numOfAds; k++) {
       if(this.view["flxAd"+ (k)].isVisible) {
         visible++;
         var leftVal = ((visible-1)*parseInt(deviceUtilManager.getDeviceInfo().screenWidth));
         this.view["flxAd"+k].left = leftVal+"dp";
       }
     }
     this.view.flxProgressBar.setVisibility(true);
     this.view.flxLoadingIndicator.setVisibility(false);
  },
  removeGestureRecognisers : function()
  {
    if(this.gestIDs.length!==0)
    {
      var  swipeGestureID = this.gestIDs[0];
      var  tapGestureID = this.gestIDs[1];
      this.view.flxScrollContainerAds.removeGestureRecognizer(swipeGestureID);
      this.view.flxScrollContainerAds.removeGestureRecognizer(tapGestureID);
      this.gestIDs = [];
    }
  },
  setGestureRecogniser : function(){
      if(this.gestIDs.length === 0)
    {
      var swipeGestID = this.view.flxScrollContainerAds.setGestureRecognizer(2, {
        fingers: 1,
        swipedistance: 20,
        swipevelocity: 60
      }, this.onAdSwipe);
      var tapGestID = this.view.flxScrollContainerAds.setGestureRecognizer(1, {
        fingers: 1,
        taps:1
      }, this.onAdTap);
      this.gestIDs[0]=swipeGestID;
      this.gestIDs[1]=tapGestID;
    }
    this.view.rtxDetails.onClick = this.onAdTap;
  },
 onAllAdsDownloadFailure : function(){
   this.hideAds();
   this.view.imgLoadingIndicator.src="addownloadfailed.png";
 },
 alignFlexInScrollContainer : function(noOfDownloadedAds)
 {
   if(noOfDownloadedAds>1)
   {
     if(noOfDownloadedAds === 2)
     {
       this.view.flxProgressButton1.setVisibility(true);
       this.view.flxProgressButton2.setVisibility(true);
       this.view.flxProgressButton1.left="46%";
       this.view.flxProgressButton1.skin = "sknflx003e75Radius100px";
       this.view.flxProgressButton2.skin = "sknflxE3E3E3Radius100px";
     }
     else if(noOfDownloadedAds === 3)
     {
       this.view.flxProgressButton3.setVisibility(true);
       this.view.flxProgressButton3.skin = "sknflxE3E3E3Radius100px";
       this.view.flxProgressButton1.left="43.5%";
     }
     else if(noOfDownloadedAds === 4)
     {
       this.view.flxProgressButton4.setVisibility(true);
       this.view.flxProgressButton4.skin = "sknflxE3E3E3Radius100px";
       this.view.flxProgressButton1.left="41%";
     }
     else
     {
       this.view.flxProgressButton5.setVisibility(true);
       this.view.flxProgressButton5.skin = "sknflxE3E3E3Radius100px";
       this.view.flxProgressButton1.left="38%";
     }
     this.view.flxProgressBar.forceLayout();
   }
 },
 setDataForAd : function(adNumber){
   var adData = this.accountDashboardCampaignData[adNumber-1];
   this.view.flxAdInfo.setVisibility(false);
   this.view.flxAdInfo.forceLayout();
   var loggerManager = applicationManager.getLoggerManager();
   loggerManager.setCustomMetrics(this,true,"#AccountDashboardCampaign"+adNumber+" Displayed");
 },
 onAdSwipe :function(widget, gestureInfo, context){
  var downloadedAdCount = this.imageObjArray.length;
  var xVal = this.xOffset;
  var scWidth = applicationManager.getDeviceUtilManager().getDeviceInfo().screenWidth;
  var isThereChange = false;
  if(!this.isSwipeDone)
      {
         var loggerManager = applicationManager.getLoggerManager();
   		 loggerManager.setCustomMetrics(this,true,"#AccountDashboardCampaigns Swiped");
         this.isSwipeDone = true;
      }
  if (gestureInfo.swipeDirection === 1) {
    if (this.currAdFlex >= 1 && this.currAdFlex < downloadedAdCount)
    {
      isThereChange = true;
      xVal = xVal + scWidth;
      this.currAdFlex++;
    }
  } else if (gestureInfo.swipeDirection === 2) {
    if (this.currAdFlex > 1 && this.currAdFlex <= downloadedAdCount) {
      isThereChange = true;
      xVal = xVal - scWidth;
      this.currAdFlex--;
    }
  }
  if(isThereChange)
    {
      this.view.flxScrollContainerAds.setContentOffset({
        x: xVal,
        y: 0
      }, true);
      var adNumber = this.imageObjArray[this.currAdFlex-1];
      this.setDataForAd(adNumber);
      for (var j = 1; j <= downloadedAdCount ; j++) {
        if (j === this.currAdFlex){
          this.view["flxProgressButton" + j].skin = "sknflx003e75Radius100px";
        }
        else{
          this.view["flxProgressButton" + j].skin = "sknflxE3E3E3Radius100px";
        }
      }
      this.xOffset = xVal;
      this.view.flxProgressBar.forceLayout();
      this.view.flxScrollContainerAds.forceLayout();
    }
 },
 onAdTap : function(){
   var adNumber = this.imageObjArray[this.currAdFlex-1];
   var adData = this.accountDashboardCampaignData[adNumber-1];
   var navUrl = adData.destinationURL;
   if(navUrl){
     kony.application.openURL(navUrl);
     var loggerManager = applicationManager.getLoggerManager();
     if(!this.isTapDone)
     {
       loggerManager.setCustomMetrics(this,true,"#AccountDashboardCampaigns Tapped");
       this.isTapDone = true;
     }
     loggerManager.setCustomMetrics(this,true,"#AccountDashboardCampaign"+adNumber+" Image Tapped");
   }
 },
  hideAds : function(){
    this.adsHided = true;
    this.view.flxSuggestedOffers.setVisibility(false);
  }
});