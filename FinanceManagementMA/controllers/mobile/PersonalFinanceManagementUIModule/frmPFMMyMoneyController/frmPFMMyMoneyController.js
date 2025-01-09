define(['CommonUtilities', 'CampaignUtility'], function(CommonUtilities, CampaignUtility){
  return{
    init : function(){
      try {
        var navManager = applicationManager.getNavigationManager();
        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    /**
     * Description
     * @method pfmPreshow
     * @return
     */
    pfmPreshow: function() {
      try {
        if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
          this.view.flxHeader.isVisible = false;
            this.view.flxFooter.isVisible = true;
        } else {
          this.view.flxHeader.isVisible = true;
            this.view.flxFooter.isVisible = false;
        }
        var MyMoney = applicationManager.getLoggerManager();
        MyMoney.setCustomMetrics(this, false, "MyMoney");
        this.chartColors = {
          "0": "#AAAAAA",
          "1": "#6753EC",
          "2": "#3645A7",
          "3": "#FDDB64",
          "4": "#8ED174",
          "5": "#E8A75E",
          "6": "#04B6DF",
          "7": "#E87C5E",
          "8": "#D6B9EA",
          "9": "#654321",
          "10": "#123456"
        };
        this.CATEGORY_COUNT = 9;
        this.MONTH_NAMES = ["None", "January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"
                           ];
        this.setActions();
        var navManager = applicationManager.getNavigationManager();
        var selectedData = navManager.getCustomInfo("frmPFMSelectTimePeriod");
        var frmData = navManager.getCustomInfo("frmPFMMyMoney");
        this.view.segBudget.isVisible = false;
        this.bar = frmData.bar;
        this.pie = frmData.pie;
        this.budget = frmData.budget;
        if(!kony.sdk.isNullOrUndefined(selectedData) && !kony.sdk.isNullOrUndefined(selectedData.fromMyMoneyflag))
        {
          var date = new Date();
          this.currentYear = date.getFullYear();
          if(!kony.sdk.isNullOrUndefined(selectedData.currentYear))
          {
            this.currentYear = selectedData.currentYear;
          }
          if(selectedData.fromMyMoneyflag === true)
          {
            this.isYear = true;
            this.onPieClick();
          }
          else if(selectedData.currentSelected === "year"){
            this.isYear = true;
            this.onPieClick();
          }
          else
          {
            this.isYear = false;
            var date = new Date();
            this.currentMonthId = parseInt(date.getMonth()+1);
            this.limitMonth = this.currentMonthId;
            this.setMonthChartData(this.pie[this.MONTH_NAMES[this.currentMonthId]]);
          }
        }
        else{
          var date = new Date();
          this.currentYear = date.getFullYear();
          this.isYear = false;
          //var date = new Date();
          this.currentMonthId = parseInt(date.getMonth()+1);
          this.limitMonth = this.currentMonthId;
           this.setMonthChartData(this.pie[this.MONTH_NAMES[this.currentMonthId]]);
        }
        var scope=this;
        var configManager = applicationManager.getConfigurationManager();
        var MenuHandler =  applicationManager.getMenuHandler();
        MenuHandler.setUpHamburgerForForm(scope,configManager.constants.MENUPFMMYMONEY);
        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().logFormName(currentForm);
        var accessibilityConfig = CommonUtilities.getaccessibilityConfig();
        CommonUtilities.setText(this.view.lblBudget, kony.i18n.getLocalizedString("kony.mb.PFM.BUDGET"), accessibilityConfig);
        CommonUtilities.setText(this.view.lblSpending, kony.i18n.getLocalizedString("kony.mb.PFM.SPENDING"), accessibilityConfig);
        CommonUtilities.setText(this.view.btnViewTransactions, kony.i18n.getLocalizedString("kony.mb.PFM.VIEWTRANSACTIONS"), accessibilityConfig);
        CommonUtilities.setText(this.view.customHeader.lblLocateUs, kony.i18n.getLocalizedString("kony.mb.PFMMyMoney"), accessibilityConfig);
      //  this.view.customHeader.flxBack.onClick = this.navigateBackToDashboard.bind(this);
      }
      catch(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
      finally{
        let scopeObj = this;
        let campaignPopUpSuccess = function(response){
          CampaignUtility.showCampaign(response, scopeObj.view);
        }
        let campaignPopUpError = function(response){
          kony.print(response, "Campaign Not Found!");
        }
        CampaignUtility.fetchPopupCampaigns(campaignPopUpSuccess, campaignPopUpError);
      }
    },
    /**
     * Description
     * @method pfmPostshow
     * @return
     */
    pfmPostshow: function() {
    },
    /**
     * Description
     * @method onPreviousMonthClick
     * @return
     */
    onPreviousMonthClick: function() {
        try {
          	if(this.isYear){
              if(this.currentYear == 2014){
                return;
              }
              this.currentYear--;
              this.view.lblDateRange.text = this.currentYear.toString();
              var pfmMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PersonalFinanceManagementUIModule");
              var navManager = applicationManager.getNavigationManager();
              var selectedData = navManager.getCustomInfo("frmPFMSelectTimePeriod");
              selectedData.currentSelected = "year";
              selectedData.currentYear = this.currentYear;
              selectedData.year = this.view.lblDateRange.text;
              selectedData.fromMyMoneyflag = true;
              navManager.setCustomInfo("frmPFMSelectTimePeriod", selectedData);	         
              pfmMod.presentationController.fetchPFMDetails(true);
            }
          else{
            if (this.currentMonthId === 1) {
                return;
            }
            var label = this.view.lblDateRange.text;
            var monthId = this.currentMonthId;
            this.currentMonthId--;
            this.setMonthChartData(this.pie[this.MONTH_NAMES[this.currentMonthId]]);
          }
        }
        catch(err) {
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method onNextMonthClick
     * @return
     */
    onNextMonthClick: function() {
        try {
            var date = new Date();
          	if(this.isYear){
              if(this.currentYear == date.getFullYear()){
                return;
              }
              this.currentYear++;
              this.view.lblDateRange.text = this.currentYear.toString();
              var pfmMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PersonalFinanceManagementUIModule");
              var navManager = applicationManager.getNavigationManager();
              var selectedData = navManager.getCustomInfo("frmPFMSelectTimePeriod");
              selectedData.currentSelected = "year";
              selectedData.currentYear = this.currentYear;
              selectedData.year = this.view.lblDateRange.text;
              selectedData.fromMyMoneyflag = true;
              navManager.setCustomInfo("frmPFMSelectTimePeriod", selectedData);
              pfmMod.presentationController.fetchPFMDetails(true);
            }
          else{
            if(this.currentMonthId >= 12 ||((this.currentYear == date.getFullYear()) && (this.currentMonthId == this.limitMonth)))
            {
              return;
            }
            else if (this.currentYear == date.getFullYear() && this.currentMonthId >= this.limitMonth) {
              this.currentMonthId = parseInt(date.getMonth()+1);
            }
            var label = this.view.lblDateRange.text;
            var monthId = this.currentMonthId;
            this.currentMonthId++;
            this.setMonthChartData(this.pie[this.MONTH_NAMES[this.currentMonthId]]);
          }
        }
        catch(err) {
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method setMonthChartData
     * @param {} pieData
     * @return
     */
    setMonthChartData: function(pieData) {
        try {
            var self = this;
          	this.view.lblDateRange.text = kony.i18n.getLocalizedString("kony.mb.Months."+this.MONTH_NAMES[this.currentMonthId]) + " " + this.currentYear.toString();
          	if(this.view.segBudget.isVisible === true){
              applicationManager.getPresentationUtility().dismissLoadingScreen();
              return true;
            }
            this.view.flxSpendingCenter.isVisible = false;
            // Extract Pie data and show it
            this.toggleWidgetVisibilities(true, false, true, false, true, true, "sknbtnbg046AF9noradius", "sknbtnfont046AF9noradius", true,false);
            this.isYear = false;
            this.view.flxDateLeft.setEnabled(true);
            this.view.flxDateRight.setEnabled(true);
            var formatUtility = applicationManager.getFormatUtilManager();
            this.view.flxToggle.isVisible = false;
            var chartData = [];
            var segSpendingData = [];
            this.view.lblTotalIncomeValue.text = "$5,783.54";
            var totalAmount = 0;
            if(!kony.sdk.isNullOrUndefined(pieData) && pieData.length > 0)
            {
			  this.view.flxNoSpending.isVisible = false;
              var totalAmount = pieData.reduce(function(previous, record) {
                return previous + Number(record.cashSpent);
              }, 0);
              pieData.forEach(function(record) {
                chartData.push({
                  "label": kony.i18n.getLocalizedString("kony.mb.PFM."+record.categoryName),
                  "value": record.cashSpent,
                  "color": self.hexToRgbA(self.chartColors[record.cateforyId])
                });
                var percentageValue = 0;
                if(totalAmount != 0){
                  percentageValue = Math.round((record.cashSpent * 100) / totalAmount);
				}
                segSpendingData.push({
                  "categoryName": kony.i18n.getLocalizedString("kony.mb.PFM."+record.categoryName) + " - " + percentageValue + "%",
                  "cashSpent": formatUtility.formatAmountandAppendCurrencySymbol(record.cashSpent),
                  "categoryColor": {
                    "skin": "sknFlxChart" + record.cateforyId
                  }
                });
              });
            }
			else
			{
				self.view.lblNoSpendingMsg.text = kony.i18n.getLocalizedString("kony.mb.PFMMyMoney.NoMonthSpending");
                self.view.flxNoSpending.isVisible = true;
			}
			this.view.lblTotalSpendingValue.text = formatUtility.formatAmountandAppendCurrencySymbol(totalAmount);
            this.view.lblTotalSpendingVal.text = formatUtility.formatAmountandAppendCurrencySymbol(totalAmount);
            var stringifiedData = "generateDoughnutChart(" + JSON.stringify(chartData) + ");";
            this.view.brwsrPie.evaluateJavaScript(stringifiedData);
          
            this.view.segSpending.widgetDataMap = {
                "lblSpending": "categoryName",
                "lblAmountSpent": "cashSpent",
                "flxColor": "categoryColor"
            };
            this.view.segSpending.setData(segSpendingData);
            // pfm value in the center of the Pie chart
            if (!kony.sdk.isNullOrUndefined(pieData) && pieData.length > 0)
            {
              this.view.flxSpendingCenter.isVisible = true;
            } 
            else 
            {
              this.view.flxSpendingCenter.isVisible = false;
            }
            applicationManager.getPresentationUtility().dismissLoadingScreen();
            return true;
        }
        catch(err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method setYearChartData
     * @param {} chartType
     * @return
     */
    setYearChartData: function(chartType) {
        try {
            var formatUtility = applicationManager.getFormatUtilManager();
            var stringifiedData = "";
            var totalAmount = 0;
            var isChartCreated = false;
            this.isYear = true;
            if (chartType === "pie") {
                this.view.flxSpendingCenter.isVisible = false;
                this.isYear = true;
                this.view.flxToggle.isVisible = true;
                // Extract yearly data and show it
                this.view.segSpending.isVisible = true;
               this.view.flxSpendingDetails.isVisible=true;
                var chartData = [];
                var tempData = {};
                var categories = {};
                for (var month in this.pie) {
                    var monthData = this.pie[month];
                    for (var i = 0; i < monthData.length; i++) {
                        if (!tempData[monthData[i].categoryName]) {
                            tempData[monthData[i].categoryName] = 0;
                        }
                        totalAmount += parseFloat(monthData[i].cashSpent);
                        tempData[monthData[i].categoryName] += parseFloat(monthData[i].cashSpent);
                        categories[monthData[i].categoryName] = monthData[i].cateforyId;
                    }
                }
                var segmentData = [];
				if (!kony.sdk.isNullOrUndefined(tempData) && Object.keys(tempData).length > 0)
				{
					this.view.flxNoSpending.isVisible = false;
					for (var category in tempData) {
						var percentageValue = Math.round((tempData[category] * 100) / totalAmount);
						chartData.push({
							"label": kony.i18n.getLocalizedString("kony.mb.PFM."+category),
							"value": tempData[category],
							"color": this.chartColors[categories[category]]
						});
						segmentData.push({
							"categoryName": category + " - " + percentageValue + "%",
							"cashSpent": formatUtility.formatAmountandAppendCurrencySymbol(tempData[category]),
							"categoryColor": {
								"skin": "sknFlxChart" + categories[category]
							}
						});
					}
					this.view.segSpending.widgetDataMap = {
						"lblSpending": "categoryName",
						"lblAmountSpent": "cashSpent",
						"flxColor": "categoryColor"
					};
				}
				else
				{
					this.view.lblNoSpendingMsg.text = kony.i18n.getLocalizedString("kony.mb.PFMMyMoney.NoYearSpending");
                    this.view.flxNoSpending.isVisible = "true";
				}
                stringifiedData = "generateDoughnutChart(" + JSON.stringify(chartData) + ");";
               isChartCreated = this.view.brwsrPie.evaluateJavaScript(stringifiedData);
            
                this.view.segSpending.setData(segmentData);
                this.view.segSpending.isVisible = true;
              this.view.flxSpendingDetails.isVisible=true;
                // pfm value in the center of the Pie chart
                if (!kony.sdk.isNullOrUndefined(tempData) && Object.keys(tempData).length > 0)
                {
                  this.view.flxSpendingCenter.isVisible = true;
                }
                else 
                {
                  this.view.flxSpendingCenter.isVisible = false;
                }
            } else if (chartType === "bar") {
                this.view.segSpending.isVisible = false;
               this.view.flxSpendingDetails.isVisible=false;
                this.view.flxSpendingCenter.isVisible = false;
                var barData = [];
				if (!kony.sdk.isNullOrUndefined(this.bar) && Object.keys(this.bar).length > 0){
					this.view.flxNoSpending.isVisible = false;
					this.bar.forEach(function(record) {
						barData.push({
							"value": parseFloat(record.totalCashFlow),
							"month": record.monthName.toUpperCase().substr(0, 3),
							"color": "#ffcc00"
						});
						totalAmount += parseFloat(record.totalCashFlow);
					});
				}
				else
				{
					this.view.lblNoSpendingMsg.text = kony.i18n.getLocalizedString("kony.mb.PFMMyMoney.NoYearSpending");
                    this.view.flxNoSpending.isVisible = true;
                    this.view.flxSpendingCenter.isVisible = false;
				}
                stringifiedData = "generateBarGraph(" + JSON.stringify(barData) + ");";
                isChartCreated = this.view.brwsrPie.evaluateJavaScript(stringifiedData);
             
            }
            this.view.lblDateRange.text = this.currentYear.toString();
            this.view.lblTotalIncomeValue.text = "$5,783.54";
            this.view.lblTotalSpendingValue.text = formatUtility.formatAmountandAppendCurrencySymbol(totalAmount);
            this.view.lblTotalSpendingVal.text = formatUtility.formatAmountandAppendCurrencySymbol(totalAmount);
            this.view.forceLayout();
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        }
        catch(err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method setActions
     * @return
     */
    setActions: function() {
        try {
          	var self = this;
            this.view.flxBtnSpending.onClick = this.onSpendingClick.bind(this);
            this.view.lblSpending.onClick = this.onSpendingClick.bind(this);
            this.view.flxBtnBudget.onClick = this.onBudgetClick.bind(this);
            this.view.lblBudget.onClick = this.onBudgetClick.bind(this);
            this.view.flxCalIcon.onClick = this.onCalendarIconClick.bind(this);
            this.view.flxDateLeft.onClick = this.onPreviousMonthClick.bind(this);
            this.view.flxDateRight.onClick = this.onNextMonthClick.bind(this);
            this.view.flxPie.onClick = this.onPieClick.bind(this);
            this.view.flxBar.onClick = this.onBarClick.bind(this);
          	this.view.btnViewTransactions.onClick = function () {
              self.viewTransactionsOnClick();
        		};
            this.view.brwsrPie.onSuccess = this.onSuccessEvent;
        }
        catch(err) {
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method onSuccessEvent
     * @return
     */
    onSuccessEvent: function() {
      var date = new Date();
      var navManager = applicationManager.getNavigationManager();
      var selectedData = navManager.getCustomInfo("frmPFMSelectTimePeriod");
      if (kony.sdk.isNullOrUndefined(selectedData)) {
        kony.print("onSuccess selectedData null ");
        this.setMonthChartData(this.pie[this.MONTH_NAMES[this.currentMonthId]]);
      } else {
        kony.print("onSuccess selectedData"+JSON.stringify(selectedData));
        if (selectedData.currentSelected === "month") {
          if(this.currentYear === date.getFullYear() && selectedData.monthId > this.limitMonth)
          {
              selectedData.monthId = this.currentMonthId;
          }
          this.setMonthChartData(this.pie[this.MONTH_NAMES[selectedData.monthId]]);
        } else if (selectedData.currentSelected === "year") {
          this.onPieClick();
        }
      }
    },
    /**
     * Description
     * @method setBarAndPieIcons
     * @param {} pie
     * @param {} bar
     * @return
     */
    setBarAndPieIcons: function(pie, bar) {
        try {
            this.view.imgPie.src = pie;
            this.view.imgBar.src = bar;
        }
        catch(err) {
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method onPieClick
     * @return
     */
    onPieClick: function() {
        if (kony.i18n.getCurrentLocale() === "ar_AE") {
            try {
              //Toggle icons
              this.toggleWidgetVisibilities(true, false, true, false, true, true, "sknbtnbg046AF9noradius", "sknbtnfont046AF9noradius", true, false);
              this.setBarAndPieIcons("piechartactive_rtl.png", "barchartactive_rtl.png");
              this.setYearChartData("pie");
          }
          catch(err) {
            throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
          }
        }else {
          try {
              //Toggle icons
              this.toggleWidgetVisibilities(true, false, true, false, true, true, "sknbtnbg046AF9noradius", "sknbtnfont046AF9noradius", true, false);
              this.setBarAndPieIcons("piechartactive.png", "barchartinactive.png");
              this.setYearChartData("pie");
          }
          catch(err) {
            throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
          }
        }
    },
    /**
     * Description
     * @method onBarClick
     * @return
     */
    onBarClick: function() {
      if (kony.i18n.getCurrentLocale() === "ar_AE") {
          try {
              //Toggle icons
              this.view.flxDummy.isVisible = true;
              this.setBarAndPieIcons("piechartinactive_rtl.png", "barchartinactive_rtl.png");
              this.setYearChartData("bar");
          }
          catch(err) {
            throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
          }
    }else {
         try {
            //Toggle icons
          	this.view.flxDummy.isVisible = true;
            this.setBarAndPieIcons("piechartinactive.png", "barchartactive.png");
            this.setYearChartData("bar");
        }
        catch(err) {
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
      
    }
  },
    /**
     * Description
     * @method onCalendarIconClick
     * @return
     */
    onCalendarIconClick: function() {
        try {
            var navManager = applicationManager.getNavigationManager();
            var selectedData = navManager.getCustomInfo("frmPFMSelectTimePeriod");
            if (kony.sdk.isNullOrUndefined(selectedData)) {
                selectedData = {
                    "currentSelected": "month",
                };
            }
            if (this.isYear) {
                selectedData.chart = "pie";
            } else {
                selectedData.monthId = this.currentMonthId;
            }
            selectedData.fromMyMoneyflag = false;
            navManager.setCustomInfo("frmPFMSelectTimePeriod", selectedData);
            applicationManager.getPresentationUtility().showLoadingScreen();
            var pfmMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PersonalFinanceManagementUIModule");
      	    pfmMod.presentationController.commonFunctionForNavigation("frmPFMSelectTimePeriod");
        }
        catch(err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method toggleWidgetVisibilities
     * @param {} flxPieChart
     * @param {} flxBudgetSegment
     * @param {} flxCharts
     * @param {} flxBarChart
     * @param {} flxDummy
     * @param {} segSpending
     * @param {} spendingSkin
     * @param {} budgetSkin
     * @param {} btnTransactions
     * @param {} segBudget
     * @return
     */
    toggleWidgetVisibilities: function(flxPieChart, flxBudgetSegment, flxCharts, flxBarChart, flxDummy, segSpending, spendingSkin, budgetSkin, btnTransactions, segBudget) {
        try {
            this.view.flxPieChart.isVisible = flxPieChart;
            this.view.flxBudgetSegment.isVisible = flxBudgetSegment;
            this.view.flxBarChart.isVisible = flxBarChart;
            this.view.flxCharts.isVisible = flxCharts;
            this.view.flxDummy.isVisible = flxDummy;
            this.view.segSpending.isVisible = segSpending;
            this.view.segBudget.isVisible = segBudget;
            this.view.lblSpending.skin = spendingSkin;
            this.view.lblBudget.skin = budgetSkin;
            this.view.btnViewTransactions.isVisible = btnTransactions;
        }
        catch(err) {
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method onSpendingClick
     * @return
     */
    onSpendingClick: function() {
        try {
            this.toggleWidgetVisibilities(true, false, true, false, true, true, "sknbtnbg046AF9noradius", "sknbtnfont046AF9noradius", true, false);
            var navManager = applicationManager.getNavigationManager();
            var selectedData = navManager.getCustomInfo("frmPFMSelectTimePeriod");
          	this.view.flxCalIcon.isVisible=true;
          this.view.flxDateRange.right="111dp";
          this.view.flxDateRight.right="56dp";
          this.view.flxCalSeperator.isVisible=true;
            if (!kony.sdk.isNullOrUndefined(selectedData)) {
                if (selectedData.currentSelected === "year") {
                    this.onPieClick("pie");
                } else if (selectedData.currentSelected === "month") {
                    this.currentMonthId = selectedData.monthId;
                    this.setMonthChartData(this.pie[this.MONTH_NAMES[this.currentMonthId]]);
                }
            } else {
                if (this.isYear) {
                    //Year Logic
                    this.view.flxToggle.isVisible = true;
                } else {
                    this.setMonthChartData(this.pie[this.MONTH_NAMES[this.currentMonthId]]);
                }
            }
        }
        catch(err) {
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method onBudgetClick
     * @return
     */
    onBudgetClick: function() {
        try {
            this.toggleWidgetVisibilities(false, true, false, false, false, false, "sknbtnfont046AF9noradius", "sknbtnbg046AF9noradius", false, true);
			this.view.flxCalIcon.isVisible=true;
          this.view.flxDateRange.right="55dp";
          this.view.flxDateRight.right="0dp";
          this.view.flxCalSeperator.isVisible=false;
            this.view.flxToggle.isVisible = false;
			this.isYear = false;
            this.view.lblDateRange.text = kony.i18n.getLocalizedString("kony.mb.Months."+this.MONTH_NAMES[this.currentMonthId]) + " " + this.currentYear.toString();
            var formatUtility = applicationManager.getFormatUtilManager();
            var maxAllocatedAmount = this.budget.reduce(function(previousMax, record) {
                return (previousMax > parseFloat(record.allocatedAmount) ? previousMax : record.allocatedAmount);
            });
            var lineGraphData = [];
            var totalAmountSpent = 0;
            var categories = {
                "1": "home.png",
                "2": "utilities.png",
                "3": "financial.png",
                "4": "education.png",
                "5": "transport.png",
                "6": "health.png",
                "7": "travel.png",
                "8": "food.png",
                "9": "uncategorized.png",
                "10": "others.png"
            };
            this.budget.forEach(function(record) {
                lineGraphData.push({
                    "flxTarget": {
                        "width": (parseFloat(record.allocatedAmount) * 100) / maxAllocatedAmount + "%"
                    },
                    "flxSpent": {
                        "width": (parseFloat(record.amountSpent) * 100) / maxAllocatedAmount + "%"
                    },
                    "categoryName": kony.i18n.getCurrentLocale() === "ar_AE" ? kony.i18n.getLocalizedString("kony.mb.PFM."+record.categoryName) + " - " + "%" + Math.round(parseFloat(record.amountSpent) * 100 / parseFloat(record.allocatedAmount)) : kony.i18n.getLocalizedString("kony.mb.PFM."+record.categoryName) + " - " + Math.round(parseFloat(record.amountSpent) * 100 / parseFloat(record.allocatedAmount)) + "%" ,
                    "totalBudget": formatUtility.formatAmountandAppendCurrencySymbol(record.allocatedAmount),
                    "categoryImage": categories[record.categoryId]
                });
                totalAmountSpent += parseFloat(record.amountSpent);
            });
            this.view.lblTotalIncomeValue.text = "$5,783.54";
            this.view.lblTotalSpendingValue.text = formatUtility.formatAmountandAppendCurrencySymbol(totalAmountSpent);
            this.view.lblTotalSpendingVal.text = formatUtility.formatAmountandAppendCurrencySymbol(totalAmountSpent);
            this.view.segBudget.widgetDataMap = {
                "flxTarget": "flxTarget",
                "flxSpent": "flxSpent",
                "lblBudgetName": "categoryName",
                "lblBudgetAmount": "totalBudget",
                "imgBudgetType": "categoryImage"
            };
            this.view.segBudget.setData(lineGraphData);
        }
        catch(err) {
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method viewTransactionsOnClick
     * @return
     */
    viewTransactionsOnClick: function() {
        try {
            var i = 0;
            applicationManager.getPresentationUtility().showLoadingScreen();
          	var navManager = applicationManager.getNavigationManager();
          	navManager.setCustomInfo("navigationToTransactions",true);
            this.currentTransactions = 0;
            this.totalTransactions = 0;
            //Goto transactions
            if (this.isYear) {
                //Fetch yearly transactions
                this.totalTransactions = 1;
                this.fetchTransactions("","",this.currentYear.toString(),"");
            } else {
                //Fetch monthly transactions
                this.totalTransactions = 1;
                this.fetchTransactions(this.currentMonthId,"" ,this.currentYear.toString(),true);
            }
        }
        catch(err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.LOG, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method fetchTransactions
     * @param {} monthId
     * @param {} categoryId
     * @return
     */
    fetchTransactions: function(monthId, categoryId, year, getMonthlyTransactions) {
        try {
            this.transactions = [];
          	var pfmMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PersonalFinanceManagementUIModule");
            var inputParams = {
                "monthId": monthId + "",
                "categoryId": categoryId + "",
                "year": year+"",
                "getMonthlyTransactions": getMonthlyTransactions+""
            };
			   var navManager = applicationManager.getNavigationManager();
          
          navManager.setCustomInfo("SelectedCalenderInfo",inputParams);
	  pfmMod.presentationController.getPFMTransactions(inputParams, this.fetchTransactionsSuccess.bind(this), this.fetchTransactionsFailure.bind(this));
        }
        catch(err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.ServiceCallFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    
  
		
    /**
     * Description
     * @method navTofrmPFMCategorisedTransactions
     * @param
     * @return
     */
    navTofrmPFMCategorisedTransactions:function()
    {
        if (this.currentTransactions === this.totalTransactions) {
            var navManager = applicationManager.getNavigationManager();
            this.navData = [];
            this.navData.transactions = this.transactions;
            this.navData.isYear = this.isYear;
            if(this.isYear)
            {
                this.navData.year = this.currentYear.toString();
            }
            navManager.setCustomInfo("frmPFMAdvancedSearchData", this.navData);
            navManager.setCustomInfo("frmPFMCategorisedTransactions", this.transactions);
            var pfmMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("PersonalFinanceManagementUIModule");
            pfmMod.presentationController.commonFunctionForNavigation("frmPFMCategorisedTransactions");
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
            this.navTofrmPFMCategorisedTransactions();
        }
        catch(err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.ServiceCallFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
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
	          this.navTofrmPFMCategorisedTransactions();
        }
        catch(err) {
          applicationManager.getPresentationUtility().dismissLoadingScreen();
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.ServiceCallFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method random_rgba
     * @return
     */
    random_rgba: function() {
        try {
            var o = Math.round,
                r = Math.random,
                s = 255;
            return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',1)';
        }
        catch(err) {
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.processingError", GlobalExceptionHandler.ActionConstants.LOG, arguments.callee.name);
        }
    },
    /**
     * Description
     * @method hexToRgbA
     * @param {} hex
     * @return
     */
    hexToRgbA: function(hex) {
        try {
            var c;
            if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
                c = hex.substring(1).split('');
                if (c.length === 3) {
                    c = [c[0], c[0], c[1], c[1], c[2], c[2]];
                }
                c = '0x' + c.join('');
                return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',1)';
            }
            throw new Error('Bad Hex');
        }
        catch(err) {
          throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.processingError", GlobalExceptionHandler.ActionConstants.LOG, arguments.callee.name);
        }
    },
  	navigateBackToDashboard : function(){
       var navManager = applicationManager.getNavigationManager();
       navManager.goBack();
    }
  };
});