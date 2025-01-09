define(['CampaignUtility', 'CommonUtilities'], function(CampaignUtility, CommonUtilities){
  return{
    /**
     * Description
     * @method preshow
     * @return 
     */
    adsHided: false,
    currAdFlex: 1,
    accountDashboardCampaignData: [],
    numOfAds: 0,
    xOffset: 0,
    imageObjArray: [],
    imageDownloadFailureCount: 0,
    imageDownloadSuccessCount : 0,
    gestIDs: [],
    isSwipeDone : false,
    isOutageShown :false,
    isTapDone : false,
  	showPwdWarningFlag : true,  
  	successResponse:{},
    init: function () {
        var navManager = applicationManager.getNavigationManager();
        var currentForm = navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
        this.limitMonth = this.currentMonth;
    },
    preshow: function () {
      this.isDonutChartDisplayed = false;
      this.isBarChartDisplayed = false;
      this.view.flxDashboardHeader.showFadingEdges = false;
     // this.view.flxScrollContainerAds.onClick=this.toFormLoans;
      var configManager = applicationManager.getConfigurationManager();
      if(configManager.isCombinedUser=="true"){
        this.view.customHeader.flxSearch.isVisible = true;
      }
      else{
        this.view.customHeader.flxSearch.isVisible = false;
      }
      this.adsPreshow();
      var navManager = applicationManager.getNavigationManager();
      navManager.setEntryPoint("centralmoneymovement","frmDashboardAggregated");
      navManager.setEntryPoint("europeTransferFlow","frmDashboardAggregated");
      this.view.flxDashboard.showFadingEdges = false;
      var confManager = applicationManager.getConfigurationManager();
        if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
            this.view.flxTitle.isVisible = true;
            this.view.flxMenu.isVisible = false;
        } else {
            this.view.flxTitle.isVisible = false;
            this.view.flxMenu.isVisible = true;
          if(confManager.isCombinedUser !== "true") {
            try {
              var rightBarButtonItem = new kony.ui.BarButtonItem({
                type: confManager.constants.BAR_BUTTON_TITLE,
                style: confManager.constants.BAR_ITEM_STYLE_PLAIN,
                enabled: true,
                tintColor: "FFFFFF00",
                metaData: {
                  title: " "
                }
              });
              this.view.setRightBarButtonItems({
                items: [rightBarButtonItem],
                animated: true
              });
            }
            catch(err) {
            }
          }
        }
        this.MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        this.CATEGORY_COUNT = 9;
        var authMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
        authMode.presentationController.firstTimeLoginDone();
        this.selectedBankSkin = "sknlbl000000SSP26px";
        this.otherBankSkin = "sknLbl0095e4SSPRegular26px";
       
        var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
        var formatUtility = applicationManager.getFormatUtilManager();
        var custominfoInt = JSON.parse(JSON.stringify(navManager.getCustomInfo("frmDashboard")));
      	if(Array.isArray(custominfoInt.accountData)){
          var configManager = applicationManager.getConfigurationManager();
          if(configManager.isCombinedUser=="true"){
            custominfoInt.accountData = custominfoInt.accountData.filter(this.filterPersonalAccount);
          }
        }
        var custominfoExt = JSON.parse(JSON.stringify(navManager.getCustomInfo("frmDashboardAggregated")));
        if(Array.isArray(custominfoExt.accountData)){
          var configManager = applicationManager.getConfigurationManager();
          if(configManager.isCombinedUser=="true"){
            custominfoExt.accountData = custominfoExt.accountData.filter(this.filterPersonalAccount);
          }
        }
        var internalAccounts = this.clone(custominfoInt.accountData);
        var externalAccounts = this.clone(custominfoExt.accountData);
        try{ 
        	Array.prototype.push.apply(internalAccounts, externalAccounts);
        }
        catch(e){}
        //var processedAccountsData = accountMod.presentationController.processAccountsData(internalAccounts);
        var totalAvaBal = accountMod.presentationController.getTotalAvailableBalance(internalAccounts);
        var totalDebt = accountMod.presentationController.getTotalDebtBalance(internalAccounts);
   		var totalAvlFloat = formatUtility.deFormatAmount(totalAvaBal);
        var totalDebtFloat = formatUtility.deFormatAmount(totalDebt);
        if(internalAccounts.length > 0){
          var currencyCode = internalAccounts[0]["currencyCode"];
          this.view.lblBankName.text = formatUtility.formatAmountandAppendCurrencySymbol(totalAvlFloat - totalDebtFloat,currencyCode);
        }else{
          this.view.lblBankName.text = formatUtility.formatAmountandAppendCurrencySymbol(totalAvlFloat - totalDebtFloat);
        }
        this.view.lblAssetsValue.text = totalAvaBal;
        this.view.lblDebtValue.text = totalDebt;
        if(configManager.isCombinedUser == "true")  {
          this.view.segAccounts.rowTemplate = "flxCombinedAccounts";
          this.view.segAccounts.widgetDataMap = {
            "flxAccountName": "flxAccountName",
            "flxAccountType": "flxAccountType",
            "flxBank": "flxBank",
            "flxCombinedAccounts": "flxCombinedAccounts",
            "flxDelete": "flxDelete",
            "flxMain": "flxMain",
            "flxRefresh": "flxRefresh",
            "flxSeparator": "flxSeparator",
            "imgAccountType": "imgAccountType",
            "imgBank": "imgBank",
            "flximgBank": "flximgBank",
            "imgDelete": "imgDelete",
            "imgError": "imgError",
            "imgRefresh": "imgRefresh",
            "lblAccountBal": "accountBalanceType",
            "lblAccountBalValue": "availableBalance",
            "lblAccountName": "nickName",
            "lblAccountNumber": "Last4DigitAccount",
            "lblBankName": "accountType",
            "lblDelete": "lblDelete",
            "lblRefresh": "lblRefresh",
            "imgWarn":"imgWarn"
          };
        }
        this.mapAccountsAndBanks();        
//         this.view.flxOne.onClick = this.animateDashboardFlex.bind(this);
//         this.view.flxTwo.onClick = this.animateDashboardFlex.bind(this);
//         this.view.flxThree.onClick = this.animateDashboardFlex.bind(this);
        this.view.flxHamburger.isVisible = false;
        var currentForm = navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().logFormName(currentForm);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        var loggerManager = applicationManager.getLoggerManager();
   		loggerManager.setCustomMetrics(this,true,"#Successfull Logins");
        if(custominfoInt.isNavigationFromQuickAction)
          {
           var basicConfig = {message: custominfoInt.quickActionAlertText,alertIcon:null,alertType: constants.ALERT_TYPE_INFO};
           var pspConfig = {};
           applicationManager.getPresentationUtility().showAlertMessage(basicConfig,pspConfig);
           custominfoInt.isNavigationFromQuickAction = false;
          }  
       this.initActions();
       this.view.flxDashboard.setContentOffset({
            "y" : "0dp"
        });
      this.initPageIndicators();
      this.welcomeVIPCustomer();
	  if (this.currentMonth === 1)
          this.view.flxPrevMonth.setVisibility(false);
      if (this.currentMonth >= this.limitMonth)
          this.view.flxNextMonth.setVisibility(false);
      if (applicationManager.getPresentationFormUtility().getDeviceName() === "android") {
      kony.application.setApplicationCallbacks({"onforeground":this.changeDashboardHeaderOffset});
      }
      let scopeObj = this;
      function campaignPopUpSuccess(response){
        CampaignUtility.showCampaign(response, scopeObj.view);
      }
      function campaignPopUpError(response){
        kony.print(response, "Campaign Not Found!");
      }
      CampaignUtility.fetchPopupCampaigns(campaignPopUpSuccess, campaignPopUpError);
      
      var existAccounts = (internalAccounts !== "" && internalAccounts.length > 0) || (externalAccounts !== "" && externalAccounts.length > 0);
      this.view.noAccounts.setVisibility(!existAccounts);
      if (existAccounts) {
        this.view.flxSuggestedOffers.top = "0dp";
      } else {
        this.view.flxSuggestedOffers.top = "55dp";
      }
    },
  initPageIndicators:function(){
        for (let index = 1; index <= this.view.flxPageIndicators.widgets().length; index++) {
            this.view["flxPageIndicator" + index].skin = "sknFlxPageIndicatorUnselected";
        }
        this.view["flxPageIndicator1"].skin = "sknFlxPageIndicatorSelected";
    },
  changeDashboardHeaderOffset:function(){
    var navManager = applicationManager.getNavigationManager();
    if(navManager.getCurrentForm() == "frmDashboardAggregated"){
    var scrollX = this.view.flxDummyHorizontalScroll.contentOffsetMeasured.x;
    this.view.flxDashboardHeader.setContentOffset({
                    "x": scrollX + "dp"
                });
    }
  },
    navigateToCombinedSelector:function(){
      try{
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo("frmDashboardSelector");
      }catch(er){
      }
    },
  resetDashboardFlex : function(){
    if (this.view.imgChartSizeToggle.src !== "arrowdown.png") {
      this.view.imgChartSizeToggle.src = "arrowdown.png";
      this.view.flxDashboard.zIndex = 6;
      if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") 
      {       
        this.view.flxDashboard.bottom = "60dp";
        this.view.flxMenu.bottom= "0dp";
      } else if (applicationManager.getPresentationFormUtility().getDeviceName() === "android") {
        this.view.flxDummyHorizontalScroll.horizontalScrollIndicator = false;
        this.view.flxSummary.height = "100%";
        this.view.flxGraph.height = "100%";
        this.view.flxBarChart.height = "100%";
      }
      this.view.flxDummyHorizontalScroll.height = "250dp"
      this.view.flxGradient.height = "55%";   
      this.view.flxDashboardHeader.height = "55%";   
      this.view.flxBarSegment.setVisibility(false);
      this.view.flxSummarySegment.setVisibility(false);
      this.view.flxDonutSegment.setVisibility(false);
      this.view.flxDashboard.enableScrolling = true;
      this.view.flxDummyHorizontalScroll.setEnabled(true);
      this.view.flxChartSizeToggle.setEnabled(true);
      this.view.flxDummyHorizontalScroll.enableScrolling = true;
    }
  },
  showPwdWarning : function(){
    this.showPwdWarningFlag = false;
    var authMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthModule");
    var passwordWarning = authMode.presentationController.getPasswordWarning();
    if(passwordWarning && passwordWarning.passwordExpiryWarningRequired == "true")
    {
      var msg = "Your password will expire in " + passwordWarning.passwordExpiryRemainingDays + " days. " + "Do you want to change it now?";
      this.bindGenericError(msg);
    }
  },
    bindGenericError : function(msg)
  {
    applicationManager.getDataProcessorUtility().showToastMessageError(this,msg);
  },
    mapInternalAccounts: function () {
        var scope = this;
        var navManager = applicationManager.getNavigationManager();
        var campaignMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CampaignManagement");
        var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
      var configManager = applicationManager.getConfigurationManager();
      if(configManager.isCombinedUser == "true")  {
      }else{
        this.view.segAccounts.rowTemplate = "flxAccountsNoImage";
      }
        this.view.flxSelectAccount.isVisible = false;
        this.view.flxChartSizeToggle.skin = "sknFlxffffffmb";
        var configManager = applicationManager.getConfigurationManager();
        var custominfoInt = JSON.parse(JSON.stringify(navManager.getCustomInfo("frmDashboard")));
      	if(Array.isArray(custominfoInt.accountData)){
          if(configManager.isCombinedUser=="true"){
            custominfoInt.accountData = custominfoInt.accountData.filter(this.filterPersonalAccount);
          }
        }
        var internalAccounts = this.clone(custominfoInt.accountData);
        var processedAccountsData = accountMod.presentationController.processAccountsData(internalAccounts);
        processedAccountsData.forEach(function(record){
          record.flxDelete = {};
	      record.imgDelete = {};
          record.lblDelete = {};
          record.type="internal";
          record.flxDelete.onClick = scope.alertCallBack;
          record.flxDelete.skin = "slFSboxmb";
          record.imgDelete.src = "alert.png";
	      record.lblDelete.text = "Alerts";
          record.lblDelete.skin = "sknLbl004B95SSPRegular20px";
        });
      if(configManager.isCombinedUser != "true"){
        this.view.segAccounts.widgetDataMap = {
          lblAccountName: "nickName",
          lblAccountBalValue: "availableBalance",
          imgBank : "imgBank",
          lblBankName: "accountType",
          lblAccountId: "accountID",
          lblAccountBal: "accountBalanceType",
          imgEngageInsertIcon: "engageInsertIcon",
          lblEngageInsertCaption: "engageInsertCaption",
          lblEngageInsertText: "engageInsertText",
          btnEngageInsertChatNow: "engageInsertChatNow",
          type: "type",
          flxDelete: "flxDelete",
          imgDelete: "imgDelete",
          lblDelete: "lblDelete",
          imgWarn: "imgWarn"
        };
      }
      if(campaignMod.presentationController.isLoggedIn===true){
          processedAccountsData.push(campaignMod.presentationController.loanData);
        }

        if (applicationManager.getConfigurationManager().isEngageEnabled()) {
          this.updateForEngageFeatureAnnouncement(processedAccountsData);
        }
      
       this.view.segAccounts.setData(processedAccountsData);
      this.removeBlueScreen(processedAccountsData);
    },
    filterPersonalAccount: function(data){
      if(!kony.sdk.isNullOrUndefined(data.isBusinessAccount)){
        return data.isBusinessAccount === "true"? false: true;
      }
      return true;
        
    },
    alertCallBack: function(wdgt,context){
       var settingsModule = applicationManager.getModulesPresentationController("SettingsModule");
        var rowid = context.rowIndex;
        var selectedAccountId = this.view.segAccounts.data[rowid]["accountID"];
        var params={
        "AlertCategoryId":"ALERT_CAT_ACCOUNTS",
        "AccountId":selectedAccountId
      };
      var name = applicationManager.getPresentationUtility().formatText(this.view.segAccounts.data[rowid]["nickName"], 10, selectedAccountId, 4);
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("frmAlertsListHeader",name);
      settingsModule.setAlertsCategoryID("ALERT_CAT_ACCOUNTS");
      settingsModule.setAccountID(selectedAccountId);
      settingsModule.getAlertsBasedOnAccounts(params);
    },
     refreshCallBack: function(){
    var data = this.view.segAccounts.selectedItems[0];
    var bank =data.accountID.split("-")[0];
        var externalAccountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ExternalAccountsModule");
        externalAccountMod.presentationController.refreshConsent(bank);
    },
   deleteCallBack: function() {
        var basicConfig = {
                     "alertType": constants.ALERT_TYPE_CONFIRMATION,
                     "message": "Are you sure you want to remove this account ?" ,
                     "yesLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertYes"),
                     "noLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertNo"),
                     
                     "alertHandler": this.deleteConnection
                 };
                 applicationManager.getPresentationUtility().showAlertMessage(basicConfig, {});
       
    },
   deleteConnection:function(response)
    {
       if (response === true) {
        var data = this.view.segAccounts.selectedItems[0];
               var bank = data.accountID.split("-")[0];
               var externalAccountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ExternalAccountsModule");
               externalAccountMod.presentationController.deleteConnection(bank);
             }
    },
    updateForEngageFeatureAnnouncement: function(accountsData) {
      var engagePresentationController = applicationManager.getModulesPresentationController("EngageModule");
      var config = engagePresentationController.getFeatureAnnouncementConfiguration();
      var advertEnabled = false, insertEnabled = false, insertLocation = null;
      if (!kony.sdk.isNullOrUndefined(config)) {
        if (applicationManager.getEngageManager().isEngageProvisioned()) {
          advertEnabled = config.engageAdvertEnabledForExistingUsers;
          insertEnabled = config.engageInsertEnabledForExistingUsers;
        } else {
          advertEnabled = config.engageAdvertEnabledForNewUsers;
          insertEnabled = config.engageInsertEnabledForNewUsers;
        }
        insertLocation = config.engageInsertLocation;
      }
      if (insertEnabled === true) {
        var i = -1;
        switch (insertLocation) {
          case "top":
            i = 0;
            break;
          case "middle":
            i = Math.floor((this.view.segAccounts.data.length + 1) / 2);
            break;
          case "bottom":
            i = this.view.segAccounts.data.length;
            break;
        }
        if (i >= 0) {
          var dataObj = {
            "template": "flxAccountsEngageInsert",
            "engageInsertIcon": {},
            "engageInsertCaption": {},
            "engageInsertText": {},
            "engageInsertChatNow": {
              "onClick": this.invokeEngage
            }
          };
          accountsData.splice(i, 0, dataObj);
        }
      }
      if (advertEnabled === true) {
        this.view.flxSuggestedOffers.isVisible = false;
        this.view.flxEngageAdvert.isVisible = true;
        this.view.btnEngageAdvertChatNow.onClick = this.invokeEngage.bind(this);
      } else {
        this.view.flxSuggestedOffers.isVisible = true;
        this.view.flxEngageAdvert.isVisible = false;
        this.view.btnEngageAdvertChatNow.onClick = null;
      }
    },
    invokeEngage: function() {
      applicationManager.getModulesPresentationController("EngageModule").invokeEngage();
    },
    displayBarChart: function () {
        var navManager = applicationManager.getNavigationManager();
        var barData = navManager.getCustomInfo("frmDashboardPFMBar");
        //var balanceBars = this.view.allBalanceBars.widgets();
        var p = 0;
        for (p = 0; p < barData.length; p++) {
          if(p >= 12)
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

        var barGraphLabels = [];
		var barGraphData = [];
		var barSegData = [];
		var formatUtility = applicationManager.getFormatUtilManager();
        for(p = 0; p < barData.length; p++)
        {   
            if(p < this.limitMonth)
            {
              barSegData.push({
                "monthName": kony.i18n.getLocalizedString("kony.mb.Months."+barData[p].monthName),
                "totalCashFlow": formatUtility.formatAmountandAppendCurrencySymbol(barData[p].totalCashFlow)
              });
			  barGraphLabels.push(kony.i18n.getLocalizedString("kony.mb.Months."+barData[p].monthName));
			  barGraphData.push(barData[p].totalCashFlow);
            }            
        }
		var currencySymbol = formatUtility.getCurrencySymbol();
		var x = this.view.browserBarChart.evaluateJavaScript("AddBarChart(" + JSON.stringify(barGraphLabels) +"," +JSON.stringify(barGraphData) + ",'" +currencySymbol+ "')");
		this.view.segBar.widgetDataMap = {
            "lblSpending": "monthName",
            "lblAmountSpent": "totalCashFlow",
        };
        this.view.segBar.setData(barSegData);
        this.view.forceLayout();
    },
    displayDonutChart: function () {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var navManager = applicationManager.getNavigationManager();
        var pieData = navManager.getCustomInfo("frmDashboardPFMPie");
        var chartData_Labels = [];
        var chartData_values = [];
        var segSpendingData = [];

        var formatUtility = applicationManager.getFormatUtilManager();
        var totalAmount = pieData.reduce(function (previous, record) {
            return previous + Number(record.cashSpent);
        }, 0).toFixed(2);
		
      
        pieData.forEach(function (record) {
            var percentageValue = Math.round((record.cashSpent * 100) / totalAmount) + "";
			chartData_Labels.push(kony.i18n.getLocalizedString("kony.mb.PFM." + record.categoryName)+", "+percentageValue+"%");
          	chartData_values.push(percentageValue);
			percentageValue += "%";
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
        var x = this.view.browserChart.evaluateJavaScript("AddDonutChart(" + JSON.stringify(chartData_Labels) +","+JSON.stringify(chartData_values)+");");
        this.view.lblTotalSpendingValue.text = formatUtility.formatAmountandAppendCurrencySymbol(totalAmount);
        this.view.lblMonthAndYearSummary.text = kony.i18n.getLocalizedString("kony.mb.Months."+this.MONTH_NAMES[this.currentMonth - 1]);
        this.view.lblMonthAndYear.text = kony.i18n.getLocalizedString("kony.mb.Months."+this.MONTH_NAMES[this.currentMonth - 1]);
        this.view.lblTotalSpendingValue.isVisible = true;
        this.view.lblTotalSpending.isVisible = true;
        if (!x) {
            //Error in creating PFM Charts
        }
        this.view.forceLayout();
        applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
     prevMonthClick: function () {
        if (this.currentMonth === 1) {
          
            return;
        }
      this.view.flxNextMonth.setVisibility(true);
        this.prevMonth = parseInt(this.currentMonth) - 1;
        this.nextMonth = -1;
        this.goToMonth(this.prevMonth);

    },
    nextMonthClick: function () {
        if (this.currentMonth >= this.limitMonth) {
            return;
        }
      this.view.flxPrevMonth.setVisibility(true);
        this.prevMonth = -1;
        this.nextMonth = parseInt(this.currentMonth) + 1;
        this.goToMonth(this.nextMonth);
    },
    goToMonth: function (monthId) {
        var date = new Date();
        var presentYear = date.getFullYear();
        applicationManager.getPresentationUtility().showLoadingScreen();
        var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
        accountMod.presentationController.fetchMonthPFMData(monthId, presentYear, this.monthFetchSuccess, this.monthFetchFailure);
    },
    monthFetchSuccess: function (response) {
        if (response.length > 0) {
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("frmDashboardPFMPie", response);
            if (this.prevMonth === -1) {
                this.currentMonth++;
            } else if (this.nextMonth === -1) {
                this.currentMonth--;
            }
             if (this.currentMonth === 1)
                this.view.flxPrevMonth.setVisibility(false);
             if (this.currentMonth >= this.limitMonth)
                 this.view.flxNextMonth.setVisibility(false);
			this.displayBarChart();
            this.displayDonutChart();
        }
		else
        {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
        }
    },
    monthFetchFailure: function (response) {
        kony.ui.Alert("Something went wrong");
    },
    /**
     * Description
     * @method mapAccountsAndBanks
     * @return 
     */
    mapAccountsAndBanks: function () {
        var navManager = applicationManager.getNavigationManager();
        var configManager = applicationManager.getConfigurationManager();
        var custominfoInt = JSON.parse(JSON.stringify(navManager.getCustomInfo("frmDashboard")));
      	if(Array.isArray(custominfoInt.accountData)){
          if(configManager.isCombinedUser=="true"){
            custominfoInt.accountData = custominfoInt.accountData.filter(this.filterPersonalAccount);
          }
        }
        var custominfoExt = JSON.parse(JSON.stringify(navManager.getCustomInfo("frmDashboardAggregated")));
        if(Array.isArray(custominfoExt.accountData)){
          if(configManager.isCombinedUser=="true"){
            custominfoExt.accountData = custominfoExt.accountData.filter(this.filterPersonalAccount);
          }
        }
        var internalAccounts = this.clone(custominfoInt.accountData);
        var externalAccounts = this.clone(custominfoExt.accountData);
        if(applicationManager.getConfigurationManager().isAggregatedExternalAccountEnabled())
        {
          for(var i=0;i<internalAccounts.length;i++){	  
            if(internalAccounts[i].externalIndicator!== undefined && internalAccounts[i].externalIndicator==="true")
              {
               externalAccounts.push(internalAccounts[i]);
               internalAccounts.splice(i,1);
               i--;
              }
          }
         if(externalAccounts.length>0) 
         {
             externalAccounts.forEach(function(record){
                   record.BankName = record.bankName;
                   record.type = "external";
                   record.TypeDescription = record.accountType;
                   record.AccountName = record.accountName;
                   record.AccountId = record.accountID;
                    record.NickName = record.nickName;
                    record.CurrencyCode = record.currencyCode;
                    record.Last4DigitAccount = "..." + (record.accountID).substr((record.accountID).length - 4);
                    record.LastUpdated = record.processingTime;
                    record.AvailableBalance= record.availableBalance;
                   record.BankLogo = "genericexternalbank.png";//record.logoURL;
        try{
          if(record.externalIndicator == "true"){
                                            var dateFormat = applicationManager.getFormatUtilManager().getDateFormat();
                                      var targetDate = CommonUtilities.getDateAndTime(record.expiresAt);
                                    var expireDate = (targetDate.split(","))[0];
                            var today = kony.os.date(dateFormat);
         var todayDateObj = applicationManager.getFormatUtilManager().getDateObjectFromCalendarString(today, (applicationManager.getFormatUtilManager().getDateFormat()).toUpperCase());
                        var targetDateObj = applicationManager.getFormatUtilManager().getDateObjectFromCalendarString(expireDate, (applicationManager.getFormatUtilManager().getDateFormat()).toUpperCase());
                          var difference=targetDateObj-todayDateObj;
                                 var count= Math.ceil(difference/ (1000 * 60 * 60 * 24));
                        record.Count= count;
                         record.AlertDays= record.connectionAlertDays;
                            }}
                      catch(e){}
                      });
                  }
              }
        if (!kony.sdk.isNullOrUndefined(externalAccounts) && externalAccounts.length !== 0){//&& applicationManager.getConfigurationManager().isAggregatedExternalAccountEnabled()) {
            this.view.segAccounts.onRowClick = this.accountAggregatedSegmentOnClick.bind(this);
            this.setBankAccounts(internalAccounts, externalAccounts);
            this.setAccountsInfo(internalAccounts, externalAccounts, kony.i18n.getLocalizedString("kony.mb.common.allAccounts"));
        }
        else {
            this.view.segAccounts.onRowClick = this.accountSegmentOnClick.bind(this);
            this.setAccountsInfo(internalAccounts, [], kony.i18n.getLocalizedString("kony.mb.common.allAccounts"));
            this.mapInternalAccounts();
        }
    },
    /**
     * Description
     * @method setBankAccounts
     * @param {} accountResponse
     * @return 
     */
    setBankAccounts: function (internalAccounts, externalAccounts) {

        this.view.lblSelectedAccountType.text = kony.i18n.getLocalizedString("kony.mb.common.allAccounts");
        var configManager = applicationManager.getConfigurationManager();
        if(configManager.isCombinedUser == "true")  {
        }else{
          this.view.segAccounts.rowTemplate = "flxAccounts";
        }
        this.view.flxChartSizeToggle.skin = "sknFlxf9f9f9";
        this.view.flxSelectAccount.isVisible = true;
        var bankJS = {};
        var banks = [{
            "lblName": {
                "text": kony.i18n.getLocalizedString("kony.mb.common.allAccounts"),
                "skin": this.selectedBankSkin
            },
            "imgIcon": "tickmark_green.png"
        }];
        if (!kony.sdk.isNullOrUndefined(internalAccounts) && internalAccounts.length > 0) {
            internalAccounts.forEach(function (record) {
                if (!bankJS[record.bankName]) {
                    banks.push({
                        "lblName": {
                            "text": (record.bankName).toUpperCase() + " " + kony.i18n.getLocalizedString("kony.mb.common.accounts"),
                            "skin": "sknLbl0095e4SSPRegular26px"
                        },
                        "imgIcon": ""
                    });
                    bankJS[record.bankName] = true;
                }
            });
        }
        if (!kony.sdk.isNullOrUndefined(externalAccounts) && externalAccounts.length > 0) {
            externalAccounts.forEach(function (record) {
                if (!bankJS[record.BankName]) {
                    banks.push({
                        "lblName": {
                            "text": (record.BankName).toUpperCase() + " " + kony.i18n.getLocalizedString("kony.mb.common.accounts"),
                            "skin": "sknLbl0095e4SSPRegular26px"
                        },
                        "imgIcon": ""
                    });
                    bankJS[record.BankName] = true;
                }
            });
        }
        this.view.segAccountTypes.setData(banks);

    },
    /**
     * Description
     * @method setAccountsInfo
     * @param {} accountResponse
     * @param {} bankName
     * @return 
     */
    setAccountsInfo: function (internalAccounts, externalAccounts, bankName) {
        if (bankName !== kony.i18n.getLocalizedString("kony.mb.common.allAccounts")) {
            var len = bankName.length;
            var x = len - bankName.lastIndexOf(" ");
            bankName = (bankName.substring(0, len - x)).toLowerCase().trim();
        }

	    var scope = this;
        var typesJS = {};
        var typeBalance = {};
        var types = [];
        var data = [];
        var summaryData = [];
        var totalBalance = 0;
        var totalAsset = 0;
        var totalDebt = 0;
        var formatUtility = applicationManager.getFormatUtilManager();
        var configManager = applicationManager.getConfigurationManager();
        var TypeManager = applicationManager.getTypeManager();
      
        if (!kony.sdk.isNullOrUndefined(internalAccounts) && internalAccounts.length > 0) {
            internalAccounts.forEach(function (record) {
				 var AvailableBalance;
              if (record.accountType === TypeManager.getAccountTypeBackendValue(configManager.accountTypes.LOAN) || record.accountType === TypeManager.getAccountTypeBackendValue(configManager.accountTypes.CREDITCARD)) {
                AvailableBalance =  record.outstandingBalance;
              } else if (record.accountType ===TypeManager.getAccountTypeBackendValue(configManager.accountTypes.DEPOSIT)){
                AvailableBalance = record.currentBalance;
              } else {
                AvailableBalance = record.availableBalance;
              }
//               if(MyAccObj.AlertDays!= null && MyAccObj.AlertDays!= undefined){
//           try{      if (MyAccObj.Count <= 0) {
//                     imgWarn = {
//                         "src": "alert_2.png",
//                         "isVisible": true
//                     };
//                 } else if (MyAccObj.Count <= MyAccObj.AlertDays ) {
//                     imgWarn = {
//                         "src": "infoappbar.png",
//                         "isVisible": true
//                     };
//                 }}
//               catch(e){}}
          record.flxDelete = {};
	      record.imgDelete = {};
          record.lblDelete = {};
          record.type="internal";
          record.flxDelete.onClick = scope.alertCallBack;
          record.flxDelete.skin = "slFSboxmb";
          record.imgDelete.src = "alert.png";
	      record.lblDelete.text = "Alerts";
          record.lblDelete.skin = "sknLbl004B95SSPRegular20px";
                externalAccounts.unshift({
                    "BankLogo": "konybanklogo.png",
                    "AccountName": record.accountName,
                    "AvailableBalance": AvailableBalance,
                    "BankName": record.bankName,
                    "LastUpdated": "AvailableBalance",
                    "type": "internal",
                    "TypeDescription": record.accountType,
                    "AccountId": record.accountID,
                    "errorIcon": "",
                    "Last4DigitAccount": "..." + (record.accountID).substr((record.accountID).length - 4),
                    "NickName": record.nickName,
					"CurrencyCode" : record.currencyCode,
                    "flxDelete":  record.flxDelete,
                    "imgDelete":  record.imgDelete,
                    "lblDelete": record.lblDelete,
                    "currentBalance": record.currentBalance,
                    "outstandingBalance" : record.outstandingBalance
                });
            });
        }
        if (!kony.sdk.isNullOrUndefined(externalAccounts) && externalAccounts.length > 0) {
            externalAccounts.forEach(function (record) {
                if (bankName === kony.i18n.getLocalizedString("kony.mb.common.allAccounts") || bankName === (record.BankName).toLowerCase().trim()) {
                    if (record.TypeDescription !== null && record.TypeDescription !== undefined) {
                        if (!typesJS[record.TypeDescription]) {
                            typesJS[record.TypeDescription] = [];
                            typeBalance[record.TypeDescription] = 0;
                            types.push(record.TypeDescription);
                        }
                        typesJS[record.TypeDescription].push(record);
                        if ((record.TypeDescription.toLowerCase().trim() === (TypeManager.getAccountTypeBackendValue(configManager.accountTypes.SAVINGS)).toLowerCase()) || (record.TypeDescription.toLowerCase().trim() === (TypeManager.getAccountTypeBackendValue(configManager.accountTypes.CHECKING)).toLowerCase())) {
                            typeBalance[record.TypeDescription] = kony.i18n.getLocalizedString("kony.mb.accdetails.availBal");
                        } else if ((record.TypeDescription.toLowerCase().trim() === (TypeManager.getAccountTypeBackendValue(configManager.accountTypes.DEPOSIT)).toLowerCase()) || (record.TypeDescription.toLowerCase().trim() === (TypeManager.getAccountTypeBackendValue(configManager.accountTypes.CREDITCARD)).toLowerCase())) {
                            typeBalance[record.TypeDescription] = kony.i18n.getLocalizedString("kony.mb.accdetails.currBal");
                        } else if ((record.TypeDescription.toLowerCase().trim() === (TypeManager.getAccountTypeBackendValue(configManager.accountTypes.LOAN)).toLowerCase()) || (record.TypeDescription.toLowerCase().trim() === (TypeManager.getAccountTypeBackendValue(configManager.accountTypes.MORTGAGE)).toLowerCase())) {
                            typeBalance[record.TypeDescription] = kony.i18n.getLocalizedString("kony.mb.accdetails.outstandingBal");
                        } else {
                            typeBalance[record.TypeDescription] = kony.i18n.getLocalizedString("kony.mb.accdetails.availBal");
                        }
                        if (isNaN(parseFloat(record.AvailableBalance))) {
                            record.AvailableBalance = "0.00";
                        }
                       if (record.TypeDescription.toLowerCase() === (TypeManager.getAccountTypeBackendValue(configManager.accountTypes.SAVINGS)).toLowerCase()|| record.TypeDescription.toLowerCase().trim() === (TypeManager.getAccountTypeBackendValue(configManager.accountTypes.CHECKING)).toLowerCase() || record.TypeDescription.toLowerCase() === "current" || record.TypeDescription.toLowerCase() === (TypeManager.getAccountTypeBackendValue(configManager.accountTypes.DEPOSIT)).toLowerCase()) {
                            if(record.TypeDescription.toLowerCase() === (TypeManager.getAccountTypeBackendValue(configManager.accountTypes.DEPOSIT)))
                                totalAsset = totalAsset + parseFloat(record.currentBalance);
                            else
                              totalAsset = totalAsset + parseFloat(record.AvailableBalance);
                            if(!kony.sdk.isNullOrUndefined(record.nickName)){
                              record.NickName = record.nickName;
                            }
                            else if(kony.sdk.isNullOrUndefined(record.NickName) && kony.sdk.isNullOrUndefined(record.nickName)){
                              record.NickName = record.AccountName;
                            }
                            summaryData.push(record);
                        }
                        if (record.TypeDescription.toLowerCase() === (TypeManager.getAccountTypeBackendValue(configManager.accountTypes.MORTGAGE)).toLowerCase() || record.TypeDescription.toLowerCase() === (TypeManager.getAccountTypeBackendValue(configManager.accountTypes.LOAN)).toLowerCase()) {
                          if(record.TypeDescription.toLowerCase() === (TypeManager.getAccountTypeBackendValue(configManager.accountTypes.LOAN)).toLowerCase())  
                            totalDebt = totalDebt + parseFloat(record.outstandingBalance);
                          else
                            totalDebt = totalDebt + parseFloat(record.AvailableBalance);
                        }
                        record.AvailableBalance = formatUtility.formatAmountandAppendCurrencySymbol(record.AvailableBalance,record.CurrencyCode);
                        var forUtility = applicationManager.getFormatUtilManager();
                        if(record.LastUpdated)
                        record.LastUpdated = forUtility.getTimeDiferenceOfDate(record.LastUpdated);
                        if (record.Number) {
                            record.Last4DigitAccount = "..." + (record.Number).substr((record.Number).length - 4);
                        }
                        if (!record.type) {
                            record.type = "external";
                        }
                        if (!kony.sdk.isNullOrUndefined(record.error) && record.error.trim() !== "") {
                            record.errorIcon = {
                                src: "erroricon.png",
                                isVisible: true
                            };
                        } else {
                            record.errorIcon = {
                                src: "",
                                isVisible: false
                            };
                        }
                      if (record.externalIndicator !== undefined && record.externalIndicator === "true") {
                          if (record.Count <= 0) {
                              record.imgWarn = {
                                  src: "alert_2.png",
                                  isVisible: true
                              };
                          } else if (record.Count <= Number(record.AlertDays)) {
                              record.imgWarn = {
                                    src: "infoappbar.png",
                                    isVisible: true
                                  };
                          }else {
                              record.imgWarn = {
                                  src: "",
                                  isVisible: false
                              };
                          }
                      }else{
                          record.imgWarn = {
                              src: "",
                              isVisible: false
                          };
                      }
                      if(record.externalIndicator!== undefined && record.externalIndicator === "true")
                      {
                        if (record.LastUpdated) {
                          var formatUtilManager = applicationManager.getFormatUtilManager();
                          var dateObj = formatUtilManager.getDateObjectfromString(record.processingTime, "YYYY-MM-DD HH:MM:SS");
                          record.LastUpdated = "as of " + formatUtilManager.getFormatedDateString(dateObj, formatUtilManager.getApplicationDateTimeFormat());
                        }
                       record.flxDelete = {};
                       record.flxRefresh = {};
                       record.imgDelete = {};
                       record.lblDelete = {};
                       record.flxDelete.onClick=scope.deleteCallBack;
                       record.flxRefresh.onClick=scope.refreshCallBack;
                      }
                    }
                }
            });
        }

        var allTypes= TypeManager.getAccountTypesByPriority();
        for (var i = 0;i<allTypes.length;i++) {
          var type = TypeManager.getAccountTypeBackendValue(allTypes[i]);
          if(typesJS[type]!="" && typesJS[type]!=null)
          {
            var balance = 0;
            var typeVal = type;
            for (var index = 0; index < typesJS[type].length; index++) {
                var neg = 1;
                var bal = typesJS[type][index].AvailableBalance.replace(/,/g, "");
                if (bal[0] === '-') {
                    neg = -1;
                    bal = bal.substr(2, bal.length);
                }
                else {
                    bal = bal.substr(1, bal.length);
                }
               var tmp = (neg * parseFloat(bal));
                if(isNaN(tmp) === false){
                  balance+=tmp;
                }
            }
            data.push([{
                "lblTypeName": TypeManager.getAccountTypeDisplayValue(TypeManager.getAccountType(typeVal)) + " Accounts (" + typesJS[type].length + ")",
                "lblTypeValue": formatUtility.formatAmountandAppendCurrencySymbol(balance.toFixed(2))
            }, typesJS[type]]);
          }  
        }
        totalBalance = totalAsset - totalDebt;
        this.view.lblBankName.text = formatUtility.formatAmountandAppendCurrencySymbol(totalBalance.toFixed(2));
        this.view.lblAssetsValue.text = formatUtility.formatAmountandAppendCurrencySymbol(totalAsset.toFixed(2));
        this.view.lblDebtValue.text = formatUtility.formatAmountandAppendCurrencySymbol(totalDebt.toFixed(2));
      if(configManager.isCombinedUser != "true") {
        this.view.segAccounts.widgetDataMap = {
            "lblTypeName": "lblTypeName",
            "lblTypeValue": "lblTypeValue",
            "imgBank": "BankLogo",
            "lblAccountName": "NickName",
            "lblAccountBalValue": "AvailableBalance",
            "lblBankName": "BankName",
            "lblAccountBal": "LastUpdated",
            "imgError": "errorIcon",
            "lblAccountNumber": "Last4DigitAccount",
            "flxDelete":"flxDelete",
            "flxRefresh":"flxRefresh",
            "imgDelete": "imgDelete",
            "lblDelete": "lblDelete",
            "imgWarn": "imgWarn"
        };
        }
        this.view.segSummary.widgetDataMap = {
          "lblSpending": "NickName",
          "lblAmountSpent": "AvailableBalance"
        };
        this.view.segSummary.setData([]);
        this.view.segSummary.setData(summaryData);
        this.setView(data);
    },
    setView: function (data) {
       this.view.segAccounts.setData([]);
       this.view.segAccounts.setData(data);
      
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      this.removeBlueScreen(data);
    },
    /**
     * Description
     * @method postShow
     * @return 
     */
    postShow: function () {
        var h = this.view.flxDashboard.frame.height;
        this.view.flxAccounts.height = h + "dp";
        if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
            this.view.flxDashboardHeader.top = "56dp";
            this.view.flxGradient.top = "56dp";
            this.view.flxPageIndicators.top = "281dp";
            this.view.noAccounts.top = "56dp";
        } else {
            this.view.flxDashboardHeader.top = "0dp";
            this.view.flxGradient.top = "0dp";
            this.view.flxPageIndicators.top = "225dp";
          	this.view.noAccounts.top = "0dp";
        }
        //othis.view.flxDashboardHeader.scrollToWidget(this.view.flxDashboardHeader.widgets()[0]);
//         if (this.view.imgChartSizeToggle.src === "arrowup.png"){
// 	       this.animateDashboardFlex();
//        }

        //var configManager = applicationManager.getConfigurationManager();
		//if(configManager.isAggregatedExternalAccountEnabled()){
			//this.getAccountsRealTime();
		//}
        
      	if(this.showPwdWarningFlag){           
        	this.showPwdWarning();
        }
      if (applicationManager.getConfigurationManager().isCombinedUser === "true") {
        var data = this.view.segAccounts.data;
        data.forEach(function (item, index) {
          if (item["accountID"] != null && item["accountID"] !== undefined) {
          item["Last4DigitAccount"] = "..." + (item["accountID"]).substr((item["accountID"]).length - 4);
          item["imgAccountType"] = {
            "src" : "personalaccount.png",
            "isVisible" : true
          };
          item["flximgBank"] = {
            "isVisible" : false
          };
          item["imgBank"] = {
            "isVisible" : false
          };
          }
        });
        this.view.segAccounts.data = data;
      }
      else {
        var data = this.view.segAccounts.data;
        data.forEach(function (item, index) {
          if (item["accountID"] != null && item["accountID"] !== undefined) {
          item["Last4DigitAccount"] = "..." + (item["accountID"]).substr((item["accountID"]).length - 4);
          item["imgAccountType"] = {
            "src" : "personalaccount.png",
            "isVisible" : true
          };
          item["flximgBank"] = {
            "isVisible" : false
          };
          item["imgBank"] = {
            "isVisible" : false
          };
          }
        });
        this.view.segAccounts.data = data;
      }
      this.showOutageAlert();
      
    },
  
   /**
     * shows outage message
     * @method showOutageAlert
     * @return 
     */
     showOutageAlert:function()
     {
        var accountManager = applicationManager.getAccountManager();
       var response =accountManager.getOutageMessages();
       if(response.length>0 && !this.isOutageShown)
         {
       var msg="\r\n"+response[0];
      var i=1;
    while(i<response.length){
    msg+=("\r\n"+"\r\n"+response[i]);
    i++;
     }
    
       var pspConfig = {"iconPosition" : constants.ALERT_CONTENT_ALIGN_CENTER,
                     "contentAlignment": constants.ALERT_ICON_POSITION_LEFT } ;
       var basicProperties = {
      "message": msg,
    "alertType": constants.ALERT_TYPE_INFO,
   "alertTitle": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Outage.ImportantNotice"),
     "yesLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.Dismiss"),
    "alertIcon": "",
 "alertHandler": function(response) {}
        };
 
    kony.ui.Alert(basicProperties,pspConfig); //this alert is to show outage alert
           this.isOutageShown=true;
         }
     },
  /**
     * Description
     * @method getAccountsRealTime
     * @return 
     */
    getAccountsRealTime: function () {
        var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
        var main_user = applicationManager.getUserPreferencesManager().getUserName();
        accountsModule.presentationController.fetchExternalAccounts(main_user, this.getAccountsRealTimeSuccess.bind(this), this.getAccountsRealTimeError.bind(this));
    },
    /**
     * Description
     * @method getAccountsRealTime success
     * @return 
     */
    getAccountsRealTimeSuccess: function () {
        this.mapAccountsAndBanks();
    },
    /**
     * Description
     * @method getAccountsRealTime success
     * @return 
     */
    getAccountsRealTimeError: function () {
        //do nothing
    },
    /**
     * Description
     * @method initActions
     * @return 
     */
    initActions: function () {
      var scope = this;
      this.view.customHeader.flxSearch.onClick = this.navigateToCombinedSelector;
      this.view.flxPrevMonth.onClick = this.prevMonthClick.bind(this);
      this.view.flxNextMonth.onClick = this.nextMonthClick.bind(this);
      this.view.flxDashboardHeader.setContentOffset({
        "x": "0dp"
      });
      this.view.flxDummyHorizontalScroll.setContentOffset({
        "x": "0dp"
      });
      this.view.flxDummyHorizontalScroll.onScrolling = function () {
        if (scope.view.flxDashboard.zIndex === 6) {
          var scrollX = scope.view.flxDummyHorizontalScroll.contentOffsetMeasured.x;
          scope.view.flxDashboardHeader.setContentOffset({
            "x": scrollX + "dp"
          });
        }
        scope.pageIndicatorHighlight();
      };
      this.view.btnViewAllTransactions.onClick = this.viewAllTransactions.bind(this);
      this.view.flxDashboardHeader.onScrolling = function () {
        if (scope.view.flxDashboard.zIndex === 3) {
          var scrollX = scope.view.flxDashboardHeader.contentOffsetMeasured.x;
          scope.view.flxDummyHorizontalScroll.setContentOffset({
            "x": scrollX + "dp"
          });
        }
        scope.pageIndicatorHighlight();
      };
      this.view.flxDashboard.onScrolling = function () {
        var vScroll = scope.view.flxDashboard.contentOffsetMeasured.y;
        if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
          scope.view.flxDashboardHeader.top = Math.round(vScroll * -0.3) + 56 + "dp";
          scope.view.flxGradient.top = Math.round(vScroll * -0.3) + 56 + "dp";
          scope.view.flxPageIndicators.top = Math.round(vScroll * -0.3) + 56 + 230 + "dp";
        } else {
          scope.view.flxDashboardHeader.top = Math.round(vScroll * -0.3) + "dp";
          scope.view.flxGradient.top = Math.round(vScroll * -0.3) + "dp";
          scope.view.flxPageIndicators.top = Math.round(vScroll * -0.3) + 230 + "dp";
        }
      };
      this.view.flxChartSizeToggle.onClick = this.animateDashboardFlex.bind(this);
      var configManager = applicationManager.getConfigurationManager();
      var MenuHandler =  applicationManager.getMenuHandler();
      MenuHandler.setUpHamburgerForForm(scope, configManager.constants.MENUACCOUNTS);
      this.view.flxSelectAccount.onClick = function () {
        //             if (scope.view.flxGraph.height !== "0dp") {
        //                 scope.showGraph();
        //             }
        scope.showAllAccountTypes();
      }
      this.view.segAccountTypes.onRowClick = this.selectedClickedAccount;
      scope.view.segAccounts.onTouchEnd = this.onScrollingSegment;
      scope.view.noAccounts.btnOpenAccount.onClick = scope.openNewAccount;
      this.resetDashboardFlex();
    },
    animateDashboardFlex: function () {
     	var scope = this;
      	if(scope.view.flxPopup.isVisible) return;
        	
        scope.view.flxDummyHorizontalScroll.setEnabled(false);  
        scope.view.flxChartSizeToggle.setEnabled(false);
      	scope.view.flxDashboard.setContentOffset({
            y: "0dp"
        });
      	scope.view.flxDashboard.enableScrolling = false;
        scope.view.flxDashboardHeader.enableScrolling = false;
      	kony.timer.schedule("timerId", function() {
        	scope.view.flxDashboard.enableScrolling = true;
          scope.view.flxDashboardHeader.enableScrolling = true;
      	}, 0.3, false);
        if (scope.view.imgChartSizeToggle.src === "arrowdown.png") {
            scope.view.flxDonutSegment.setVisibility(true);
            scope.view.flxBarSegment.setVisibility(true);
            scope.view.flxSummarySegment.setVisibility(true);
            var height = 0;
            //   var newHeight = kony.os.deviceInfo().screenHeight - 40;
            var newHeight = scope.view.flxBGDummy.frame.height;
            if (applicationManager.getPresentationFormUtility().getDeviceName() === "android") {
                newHeight = newHeight - 56;
                scope.view.flxDummyHorizontalScroll.horizontalScrollIndicator = true;
                scope.view.flxSummary.height = "99.4%";
                scope.view.flxGraph.height = "99.4%";
                scope.view.flxBarChart.height = "99.4%";
            }

            //   var segMaxHeight=newHeight-362;
            var segMaxHeight = newHeight - 399;// -260 -1 -42 - 1 -60 -35(-segtop-sep-date-sep-btn-toggle)
            newHeight = newHeight - 35 + "dp";
            scope.view.flxGradient.height = newHeight;
            scope.view.imgChartSizeToggle.src = "arrowup.png";
            scope.view.flxDashboardHeader.height = newHeight;       
            scope.view.segTransactions.height = segMaxHeight + "dp";
            scope.view.segSummary.height = segMaxHeight + 60 + "dp";
            scope.view.segBar.height = segMaxHeight + 60 + "dp";
            scope.view.flxSummarySegment.height = segMaxHeight + 104 + "dp";
            scope.view.flxBarSegment.height = segMaxHeight + 104 + "dp";
            scope.view.flxDonutSegment.height = segMaxHeight + 104 + "dp";

            if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
                scope.view.flxDashboard.animate(
                    kony.ui.createAnimation({
                        0: {
                            bottom: "60dp",
                            "stepConfig": {}
                        },
                        100: {
                            bottom: "0dp",
                            "stepConfig": {
                                "timingFunction": kony.anim.EASE
                            }
                        }
                    }), {
                        fillMode: kony.anim.FILL_MODE_FORWARDS,
                        duration: .3
                    }, {
                        animationEnd: function () { }
                    }
                );
                scope.view.flxMenu.animate(
                    kony.ui.createAnimation({
                        0: {
                            bottom: "0dp",
                            "stepConfig": {}
                        },
                        100: {
                            bottom: "-60dp",
                            "stepConfig": {
                                "timingFunction": kony.anim.EASE
                            }
                        }
                    }), {
                        fillMode: kony.anim.FILL_MODE_FORWARDS,
                        duration: .3
                    }, {
                        animationEnd: function () { }
                    }
                );
            }
            scope.view.flxDummyHorizontalScroll.animate(
                kony.ui.createAnimation({
                    0: {
                        height: "250dp",
                        "stepConfig": {}
                    },
                    100: {
                        height: newHeight,
                        "stepConfig": {
                            "timingFunction": kony.anim.EASE
                        }
                    }
                }), {
                    fillMode: kony.anim.FILL_MODE_FORWARDS,
                    duration: .3
                }, {
                    animationEnd: function () {
                        scope.view.flxDummyHorizontalScroll.setEnabled(true);  
                        scope.view.flxChartSizeToggle.setEnabled(true);
                        scope.view.flxDashboard.enableScrolling = false;
                        scope.view.flxDashboard.zIndex = 3;
                    }
                });


        } else {
            scope.view.imgChartSizeToggle.src = "arrowdown.png";
            scope.view.flxDashboard.zIndex = 6;
            if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
                scope.view.flxDashboard.animate(
                    kony.ui.createAnimation({
                        0: {
                            bottom: "0dp",
                            "stepConfig": {}
                        },
                        100: {
                            bottom: "60dp",
                            "stepConfig": {
                                "timingFunction": kony.anim.EASE
                            }
                        }
                    }), {
                        fillMode: kony.anim.FILL_MODE_FORWARDS,
                        duration: .3
                    }, {
                        animationEnd: function () { }
                    }
                );
                scope.view.flxMenu.animate(
                    kony.ui.createAnimation({
                        0: {
                            bottom: "-60dp",
                            "stepConfig": {}
                        },
                        100: {
                            bottom: "0dp",
                            "stepConfig": {
                                "timingFunction": kony.anim.EASE
                            }
                        }
                    }), {
                        fillMode: kony.anim.FILL_MODE_FORWARDS,
                        duration: .3
                    }, {
                        animationEnd: function () { }
                    }
                );
            }
            scope.view.flxDummyHorizontalScroll.animate(
                kony.ui.createAnimation({
                    0: {
                        height: scope.view.flxDummyHorizontalScroll.height + "dp",
                        "stepConfig": {}
                    },
                    100: {
                        height: "250dp",
                        "stepConfig": {
                            "timingFunction": kony.anim.EASE
                        }
                    }
                }), {
                    fillMode: kony.anim.FILL_MODE_FORWARDS,
                    duration: .3
                }, {
                    animationEnd: function () {
                      if (applicationManager.getPresentationFormUtility().getDeviceName() === "android") {
                            scope.view.flxDummyHorizontalScroll.horizontalScrollIndicator = false;
                            scope.view.flxSummary.height = "100%";
                            scope.view.flxGraph.height = "100%";
                            scope.view.flxBarChart.height = "100%";
                        }
                        scope.view.flxGradient.height = "55%";
                        scope.view.flxDashboardHeader.height = "55%";
                        scope.view.flxBarSegment.setVisibility(false);
                        scope.view.flxSummarySegment.setVisibility(false);
                        scope.view.flxDonutSegment.setVisibility(false);
                        scope.view.flxDashboard.enableScrolling = true;
                        scope.view.flxDummyHorizontalScroll.setEnabled(true);
                        scope.view.flxChartSizeToggle.setEnabled(true);
                   }
                });
        }
        scope.view.flxDummyHorizontalScroll.enableScrolling = true;
    },
    pageIndicatorHighlight: function () {
        for (let index = 1; index <= this.view.flxPageIndicators.widgets().length; index++) {
            this.view["flxPageIndicator" + index].skin = "sknFlxPageIndicatorUnselected";
        }
        var scrollX = this.view.flxDummyHorizontalScroll.contentOffsetMeasured.x;
        var screenWidth = kony.os.deviceInfo().screenWidth;
        var chartNum = Math.round(scrollX / screenWidth) + 1;
        // alert("chartNum : "+chartNum);
        this.view["flxPageIndicator" + chartNum].skin = "sknFlxPageIndicatorSelected";
        kony.print("chart num"+chartNum);
      	
      	//we are displaying bar chart and donut chart only after scrolling the 
      	//browser widget into the view to show animation to the user.
      	//Requirement is to show animation only once, for the first time the chart is rendered.
      	//Since rendering the chart and animating it are tightly coupled,
      	//we are calling these methods only when the browser widgets are into the view.
      	if(chartNum === 2 && !this.isDonutChartDisplayed){
          this.displayDonutChart();
          this.isDonutChartDisplayed = true;
        }
      	if(chartNum === 3 && !this.isBarChartDisplayed){
          this.displayBarChart();
          this.isBarChartDisplayed = true;
        }
    },

    /**
     * Description
     * @method onScrollingDashboard
     * @return 
     */
    onScrollingDashboard: function () {
        return;
        // var scope = this;
        // if (this.view.flxSuggestedOffers.isVisible === true) {
        //     return;
        // }
        // if (this.view.flxSpendingBudget.isVisible === true) {
        //     return;
        // }
        // var flxy = scope.view.flxDashboard.contentOffsetMeasured.y;
        // if (flxy >= 110) {
        //     scope.view.segAccounts.height = "100%";
        //     scope.view.forceLayout();
        // }
    },
    /**
     * Description
     * @method onScrollingSegment
     * @return 
     */
    onScrollingSegment: function () {
        return;
        // var scope = this;
        // if (scope.view.flxGraph.height !== "0dp") {
        //     scope.showGraph();
        // }
        // if (scope.view.flxAccountTypes.height !== "0dp") {
        //     scope.showAllAccountTypes();
        // }
        // if (scope.view.segAccounts.height !== "preferred") {
        //     var segy = scope.view.segAccounts.contentOffsetMeasured.y;
        //     if (segy <= 1) {
        //         scope.view.segAccounts.height = "preferred";
        //         scope.view.forceLayout();
        //     }
        // }
    },
    /**
* Description
* @method viewTransactionsOnClick
* @return 
*/
    viewAllTransactions: function () {
        try {
            applicationManager.getPresentationUtility().showLoadingScreen();
            this.currentTransactions = 0;
            this.totalTransactions = this.CATEGORY_COUNT;
            for (i = 1; i <= this.CATEGORY_COUNT; i++) {
                this.fetchTransactions(this.currentMonth, i);
            }
        } catch (exception) {
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
    fetchTransactions: function (monthId, categoryId) {
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
     * @method navTofrmPFMCategorisedTransactions
     * @param 
     * @return 
     */
    navTofrmPFMCategorisedTransactions:function(){
        if (this.currentTransactions === this.totalTransactions) {
        var navManager = applicationManager.getNavigationManager();
        this.navData = [];
        this.navData.transactions = this.transactions;
        this.navData.isYear = false;       
        navManager.setCustomInfo("frmPFMAdvancedSearchData", this.navData); 
        navManager.setCustomInfo("frmPFMCategorisedTransactions", this.transactions);
        var accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
        accountModule.presentationController.commonFunctionForNavigation("frmPFMCategorisedTransactions");
        }
    },
    /**
     * Description
     * @method fetchTransactionsSuccess
     * @param {} response
     * @return 
     */
    fetchTransactionsSuccess: function (response) {
        try {
            this.currentTransactions++;
            Array.prototype.push.apply(this.transactions, response);
	          this.navTofrmPFMCategorisedTransactions();
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
    fetchTransactionsFailure: function (response) {
        try {
            this.currentTransactions++;
	          this.navTofrmPFMCategorisedTransactions();
        } catch (exception) {
            //replace
        }
    },

    /**
     * Description
     * @method showGraph
     * @return 
     */
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
                /**
                 * Description
                 * @return 
                 */
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
    /**
     * Description
     * @method selectedClickedAccount
     * @return 
     */
    selectedClickedAccount: function () {
        this.showAllAccountTypes();
        var selectedItem = this.view.segAccountTypes.selectedItems[0];
        this.view.lblSelectedAccountType.text = selectedItem.lblName.text;
        var data = this.view.segAccountTypes.data;
        for (i = 0; i < data.length; i++) {
            if (selectedItem.lblName.text === data[i].lblName.text) {
                data[i].lblName.skin = this.otherBankSkin;
                data[i].imgIcon = "tickmark_green.png";
            } else {
                data[i].lblName.skin = this.otherBankSkin;
                data[i].imgIcon = "";
            }
        }
        this.view.segAccountTypes.setData(data);
        var navManager = applicationManager.getNavigationManager();
        var internalCustom = JSON.parse(JSON.stringify(navManager.getCustomInfo("frmDashboard")));
      	if(Array.isArray(internalCustom.accountData)){
          var configManager = applicationManager.getConfigurationManager();
          if(configManager.isCombinedUser=="true"){
            internalCustom.accountData = internalCustom.accountData.filter(this.filterPersonalAccount);
          }
        }
        var externalCustom = JSON.parse(JSON.stringify(navManager.getCustomInfo("frmDashboardAggregated")));
        if(Array.isArray(externalCustom.accountData)){
          var configManager = applicationManager.getConfigurationManager();
          if(configManager.isCombinedUser=="true"){
            externalCustom.accountData = externalCustom.accountData.filter(this.filterPersonalAccount);
          }
        }
        var internalAccounts = this.clone(internalCustom.accountData);
        var externalAccounts = this.clone(externalCustom.accountData);
         if(!applicationManager.getConfigurationManager().isAggregatedExternalAccountEnabled())
        {
          for(var i=0;i<internalAccounts.length;i++){
            if(internalAccounts[i].externalIndicator!== undefined && internalAccounts[i].externalIndicator==="true")
              {
               externalAccounts.push(internalAccounts[i]);
               internalAccounts.splice(i,1);
               i--;
              }
          }
         if(externalAccounts.length>0) 
         {
             externalAccounts.forEach(function(record){
                   record.BankName = record.bankName;
                   record.type = "external";
                   record.TypeDescription = record.accountType;
                   record.AccountName = record.accountName;
                   record.AccountId = record.accountID;
                    record.NickName = record.nickName;
                    record.CurrencyCode = record.currencyCode;
                    record.Last4DigitAccount = "..." + (record.accountID).substr((record.accountID).length - 4);
                    record.LastUpdated = record.processingTime;
                    record.AvailableBalance= record.availableBalance;
                    record.BankLogo = record.logoURL;
                 });
         }
        }
        if (this.view.lblSelectedAccountType.text === "ALL ACCOUNTS") {
            this.setAccountsInfo(internalAccounts, externalAccounts, "ALL ACCOUNTS");
        } else {
            this.setAccountsInfo(internalAccounts, externalAccounts, selectedItem.lblName.text);
        }
    },
    /**
     * Description
     * @method showAllAccountTypes
     * @return 
     */
    showAllAccountTypes: function () {
        var scope = this;
        var visibleValue = true;
        // var arrowDirection = "arrowup.png";

        if (this.view.flxAccountTypes.isVisible) {
            visibleValue = false;
            //  arrowDirection = "arrowdown.png";
        }
        this.view.flxAccountTypes.isVisible = visibleValue;
        //  this.view.imgShowAllAccounts.src = arrowDirection;
        this.view.forceLayout();

    },
    /**
     * Description
     * @method setSelectAccountTypeData
     * @return 
     */
    setSelectAccountTypeData: function () {
        var data = [{
            "lblName": {
                "text": "ALL ACCOUNTS",
                "skin": "sknLblda8b08SSPRegular26px"
            },
            "imgIcon": "tickmark_green.png"
        },
        {
            "lblName": {
                "text": "CITI BANK ACCOUNTS",
                "skin": "sknLbl0095e4SSPRegular26px"
            },
            "imgIcon": ""
        },
        {
            "lblName": {
                "text": "BANK OF AMERICA ACCOUNTS",
                "skin": "sknLbl0095e4SSPRegular26px"
            },
            "imgIcon": ""
        },
        {
            "lblName": {
                "text": "BANK OF AMERICA ACCOUNTS",
                "skin": "sknLbl0095e4SSPRegular26px"
            },
            "imgIcon": ""
        },
        ]

        this.view.segAccountTypes.setData(data);
    },
    /**
     * Description
     * @method setAccountsData
     * @return 
     */
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
      this.removeBlueScreen(data);
    },
    /**
     * Description
     * @method clone
     * @param {} source
     * @return result
     */
    clone: function (source) {
        var result = source,
            i, len;
        if (!source ||
            source instanceof Number ||
            source instanceof String ||
            source instanceof Boolean) {
            return result;
        } else if (Object.prototype.toString.call(source).slice(8, -1) === 'Array') {
            result = [];
            var resultLen = 0;
            for (i = 0, len = source.length; i < len; i++) {
                result[resultLen++] = this.clone(source[i]);
            }
        } else if (typeof source == 'object') {
            result = {};
            for (i in source) {
                if (source.hasOwnProperty(i)) {
                    result[i] = this.clone(source[i]);
                }
            }
        }
        return result;
    },
    accountSegmentOnClick: function () {
        var navManager=applicationManager.getNavigationManager();
        var rowid = this.view.segAccounts.selectedRowIndex[1];
        if (this.view.segAccounts.data[rowid].template === "flxAccountsEngageInsert") {
          this.invokeEngage();
          return;
        }
        applicationManager.getPresentationUtility().showLoadingScreen();
            //         var selectedAccountId = this.view.segAccounts.data[rowid]["accountID"];
        var formflow=navManager.setCustomInfo("frmdashboardflow","frmDashboardAggregated");
            var bbAccountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("BBAccountsModule");
            applicationManager.getPresentationUtility().showLoadingScreen();
            var rowData = this.view.segAccounts.data[rowid];
            var contextData = {
                "accountID": rowData["accountID"],
                "accountType": rowData["accountType"],
                "currencyCode": rowData["currencyCode"]
            };
            var navManager = applicationManager.getNavigationManager();
            navManager.setCustomInfo("frmAccountDetailsNew", contextData);
            bbAccountsModule.presentationController.commonFunctionForNavigation("BBAccountsModule/frmAccountDetailsNew");
            // 		 if(applicationManager.getConfigurationManager().isAccountDetailsServiceConfigured)
            //         {
            //           accountMod.presentationController.fetchAccountDetailsAndTransactions(selectedAccountId);
            //         }
            //       else 
            // 	  {
            //         var processedAccountsData = accountMod.presentationController.fetchAccountTransactions(selectedAccountId);
            // 	  }

    },

    accountAggregatedSegmentOnClick: function () {
        var self = this;
        var navManager=applicationManager.getNavigationManager();
        var formflow=navManager.setCustomInfo("frmdashboardflow","frmDashboardAggregated");
        var sectionId = this.view.segAccounts.selectedIndices[0][0];
        var rowId = this.view.segAccounts.selectedIndices[0][1][0];
        var rowData = this.view.segAccounts.data[sectionId][1][rowId];
        var main_user = applicationManager.getUserPreferencesManager().getUserName();
        var userName = (!kony.sdk.isNullOrUndefined(rowData.Username) ? rowData.Username : rowData.AccountHolder);
        var bankId = parseInt(rowData.Bank_id, 10);
        var AccountDetailsObj = {
            "accountName": rowData.AccountName,
            "lastUpdated": rowData.LastUpdated,
            "availableBalance": rowData.AvailableBalance,
            "type": rowData.type,
            "accountID": rowData.Account_id,
          	"nickName" : rowData.NickName
        };
        if (rowData.type === "internal"||rowData.externalIndicator === "true") {
            applicationManager.getPresentationUtility().showLoadingScreen();
            var selectedAccountId = rowData.AccountId;
            var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
            var processedAccountsData = accountMod.presentationController.fetchAccountTransactions(selectedAccountId);

        } else {
            if (rowData.error && rowData.error !== " ") {
                var alertmessage = kony.i18n.getLocalizedString("kony.mb.externalAccounts.ErrorInFetchingAccountBalanceOptionForRetryAndRemove");
                var yesText = kony.i18n.getLocalizedString("kony.mb.common.tryagian");
                var noText = kony.i18n.getLocalizedString("kony.mb.externalAccounts.remove");
                var basicConfig = {
                    "alertType": constants.ALERT_TYPE_CONFIRMATION,
                    "alertTitle": "",
                    "yesLabel": yesText,
                    "noLabel": noText,
                    "message": alertmessage,
                    "alertHandler": alertHandler
                };
                applicationManager.getPresentationUtility().showAlertMessage(basicConfig, {});

            } else {
                applicationManager.getPresentationUtility().showLoadingScreen();
                var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
                accountMod.presentationController.fetchAccountExternalTransactions(main_user, userName, bankId, account, AccountDetailsObj);
            }

            function successCallback(response) {
                var formatUtility = applicationManager.getFormatUtilManager();
                rowData.AvailableBalance = formatUtility.formatAmountandAppendCurrencySymbol(response[0].AvailableBalance,response[0].currencyCode);
                rowData.LastUpdated = kony.i18n.getLocalizedString("kony.mb.AccountsAggregated.JustNow");
                rowData.error = " ";
                rowData.errorIcon = "";
                self.view.segAccounts.setDataAt(rowData, rowId, sectionId);
                applicationManager.getPresentationUtility().dismissLoadingScreen();
            }

            function deleteAccountSuccessCallback() {
                var navManager = applicationManager.getNavigationManager();
                var externalCustom = JSON.parse(JSON.stringify(navManager.getCustomInfo("frmDashboardAggregated")));
                var configManager = applicationManager.getConfigurationManager();
                if(Array.isArray(externalCustom.accountData)){
                  if(configManager.isCombinedUser=="true"){
                    externalCustom.accountData = externalCustom.accountData.filter(this.filterPersonalAccount);
                  }
                }
                var data = externalCustom.accountData;
                for (var i in data) {
                    if (String(data[i].Bank_id).trim() === String(bankId).trim() && String(data[i].Username).trim() === String(userName).trim() && String(data[i].AccountName).trim() === String(account).trim()) {
                        data.splice(i, 1);
                        break;
                    }
                }
                self.mapAccountsAndBanks();
            }

            function deleteAccountErrorCallback() {
                kony.ui.Alert("Unable to remove");
            }

            function alertHandler(response) {
                var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
                if (response === true) {
                    applicationManager.getPresentationUtility().showLoadingScreen();
                    accountMod.presentationController.fetchSingleAccountDetails(main_user, userName, bankId, account, successCallback); ///*rowData.main_user*/, rowData.AccountHolder, rowData.Bank_id, rowData.AccountName, successCallback);//(user_id, username, bank_id, account);
                } else {
                    accountMod.presentationController.deleteExternalAccount({
                        mainUser: main_user,
                        userName: userName,
                        bankId: bankId,
                        accountName: account,
                        loopCount: "1"
                    }, deleteAccountSuccessCallback, deleteAccountErrorCallback);
                }
            }
        }

    },

    adsPreshow: function () {
        if (!this.adsHided) {
            this.resetAdsUI();
            var navManager = applicationManager.getNavigationManager();
            var formData = JSON.parse(JSON.stringify(navManager.getCustomInfo("frmDashboardAggregated")));
            var configManager = applicationManager.getConfigurationManager();
            if(Array.isArray(formData.accountData)){
              if(configManager.isCombinedUser=="true"){
                formData.accountData = formData.accountData.filter(this.filterPersonalAccount);
              }
            }
            if (formData.accountDashboardCampaignData) {
                if (formData.accountDashboardCampaignData.length !== 0) {
                    this.accountDashboardCampaignData = formData.accountDashboardCampaignData;
                    this.bindAdData();
                }
                else {
                    this.hideAds();
                }
            }
            else {
                this.hideAds();
            }
        }
    },
    bindAdData: function () {
        var accountDashboardCampaignData = this.accountDashboardCampaignData;
        this.numOfAds = accountDashboardCampaignData.length;
        var param;
        var date = new Date();
        var deviceUtilManager = applicationManager.getDeviceUtilManager();
      	this.view.flxLoadingIndicator.setVisibility(true);
        for (var j = 1; j <= this.numOfAds; j++) {
            param = date.getTime();
          	this.view["flxAd" + j].setVisibility(false);
            this.view["flxAd" + j].left = parseInt(deviceUtilManager.getDeviceInfo().screenWidth) + "dp";
            this.view["imgAd" + j].src = accountDashboardCampaignData[j - 1].imageURL + "?Param=" + param;
        }
    },
    resetAdsUI: function () {
        this.currAdFlex = 1;
        this.numOfAds = 0;
        this.imageObjArray = [];
        this.imageDownloadFailureCount = 0;
        this.imageDownloadSuccessCount = 0;
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
        for (var i = 1; i <= 5; i++) {
            this.view["flxAd" + i].setVisibility(false);
            this.view["flxProgressButton" + i].setVisibility(false);
        }
        this.view.flxProgressBar.forceLayout();
        this.view.flxProgressBar.setVisibility(false);
    },
    onAdDownloadComplete: function (issuccess, adNumber) {
             if (issuccess) {
            var i = this.imageDownloadSuccessCount;//this.imageObjArray.length;
          	this.view["flxAd"+adNumber].setVisibility(true);
            this.alignFlexInScrollContainer(i+1);
            if (i === 0) {
                this.setGestureRecogniser();
                this.setDataForAd(adNumber);
                var loggerManager = applicationManager.getLoggerManager();
   				loggerManager.setCustomMetrics(this,true,"#AccountDashboardCampaigns Displayed");
            }
            this.imageObjArray[adNumber-1] = adNumber;
            this.imageDownloadSuccessCount++;   
        } else {
            this.imageDownloadFailureCount++;
          	this.view["flxAd"+adNumber].setVisibility(false);
            if (this.imageDownloadFailureCount === this.numOfAds) {
                var logger = applicationManager.getLoggerManager();
                logger.log("####All Account dashboard Campaign's download failed\n####Therefore Hiding Them");
                this.onAllAdsDownloadFailure();
            }
        }
      	if(this.imageObjArray.length >= 1 && (this.imageDownloadSuccessCount + this.imageDownloadFailureCount) === this.numOfAds) {
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
      this.imageObjArray = this.imageObjArray.filter(function (el) {if(el) return el});
      this.view.flxLoadingIndicator.setVisibility(false);
    },
  
    removeGestureRecognisers: function () {
        if (this.gestIDs.length !== 0) {
            var swipeGestureID = this.gestIDs[0];
            var tapGestureID = this.gestIDs[1];
            this.view.flxScrollContainerAds.removeGestureRecognizer(swipeGestureID);
            this.view.flxScrollContainerAds.removeGestureRecognizer(tapGestureID);
            this.gestIDs = [];
        }
    },
    setGestureRecogniser: function () {
        if (this.gestIDs.length === 0) {
            var swipeGestID = this.view.flxScrollContainerAds.setGestureRecognizer(2, {
                fingers: 1,
                swipedistance: 20,
                swipevelocity: 60
            }, this.onAdSwipe);
            var tapGestID = this.view.flxScrollContainerAds.setGestureRecognizer(1, {
                fingers: 1,
                taps: 1
            }, this.onAdTap);
            this.gestIDs[0] = swipeGestID;
            this.gestIDs[1] = tapGestID;
        }
      // this.view.flxScrollContainerAds.onClick = this.onAdTap;
    },
    onAllAdsDownloadFailure: function () {
      	this.hideAds();
        this.view.imgLoadingIndicator.src = "addownloadfailed.png";
    },
    alignFlexInScrollContainer: function (noOfDownloadedAds) {
        if (noOfDownloadedAds > 1) {
            if (noOfDownloadedAds === 2) {
                this.view.flxProgressButton1.setVisibility(true);
                this.view.flxProgressButton2.setVisibility(true);
                this.view.flxProgressButton1.left = "46%";
                this.view.flxProgressButton1.skin = "sknflx003e75Radius100px";
                this.view.flxProgressButton2.skin = "sknflxE3E3E3Radius100px";
            } else if (noOfDownloadedAds === 3) {
                this.view.flxProgressButton3.setVisibility(true);
                this.view.flxProgressButton3.skin = "sknflxE3E3E3Radius100px";
                this.view.flxProgressButton1.left = "43.5%";
            } else if (noOfDownloadedAds === 4) {
                this.view.flxProgressButton4.setVisibility(true);
                this.view.flxProgressButton4.skin = "sknflxE3E3E3Radius100px";
                this.view.flxProgressButton1.left = "41%";
            } else {
                this.view.flxProgressButton5.setVisibility(true);
                this.view.flxProgressButton5.skin = "sknflxE3E3E3Radius100px";
                this.view.flxProgressButton1.left = "38%";
            }
            this.view.flxProgressBar.forceLayout();
        }
    },
    navigateToCombinedSelector:function(){
      try{
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo("frmDashboardSelector");
      }catch(er){
      }
    },
    setDataForAd: function (adNumber) {
        var adData = this.accountDashboardCampaignData[adNumber - 1];
        this.view.flxAdInfo.setVisibility(false);
        this.view.flxAdInfo.forceLayout();
        var loggerManager = applicationManager.getLoggerManager();
   		loggerManager.setCustomMetrics(this,true,"#AccountDashboardCampaign"+adNumber+" Displayed"); 
    },
    onAdSwipe: function (widget, gestureInfo, context) {
        var downloadedAdCount = this.imageDownloadSuccessCount;//this.imageObjArray.length;
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
            if (this.currAdFlex >= 1 && this.currAdFlex < downloadedAdCount) {
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
        if (isThereChange) {
            this.view.flxScrollContainerAds.setContentOffset({
                x: xVal,
                y: 0
            }, true);
            var adNumber = this.imageObjArray[this.currAdFlex - 1];
            this.setDataForAd(adNumber);
            for (var j = 1; j <= downloadedAdCount; j++) {
                if (j === this.currAdFlex) {
                    this.view["flxProgressButton" + j].skin = "sknflx003e75Radius100px";
                } else {
                    this.view["flxProgressButton" + j].skin = "sknflxE3E3E3Radius100px";
                }
            }
            this.xOffset = xVal;
            this.view.flxProgressBar.forceLayout();
            this.view.flxScrollContainerAds.forceLayout();
        }
    },
    onAdTap: function () {
        var adNumber = this.imageObjArray[this.currAdFlex - 1];
        var navUrl;
      	if(adNumber){
          	var adData = this.accountDashboardCampaignData[this.currAdFlex - 1];
        	navUrl = adData.destinationURL;
        }
        CampaignUtility.onClickofInAppCampaign(navUrl);
//       	if(navUrl){
//           kony.application.openURL(navUrl);
//           var navId = adData.navigationId;
//           var loggerManager = applicationManager.getLoggerManager();
//           if(!this.isTapDone)
//           {
//             loggerManager.setCustomMetrics(this,true,"#AccountDashboardCampaigns Tapped");
//             this.isTapDone = true;
//           }
//           loggerManager.setCustomMetrics(this,true,"#AccountDashboardCampaign"+adNumber+" Image Tapped"); 
//         }
    },
    hideAds: function () {
        this.adsHided = true;
        this.view.flxSuggestedOffers.setVisibility(false);
    },
  removeBlueScreen:function(data){
    if(data.length<3){
      this.view.flxWhiteBg.setVisibility(true);
    }
    else{
      this.view.flxWhiteBg.setVisibility(false);
    }
  },
  toFormLoans : function(){
    var campMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CampaignManagement");
    campMod.presentationController.commonFunctionForNavigation("frmPersonalLoans");//frmPersonalLoans
  },
  toFormDeposits : function(){
    var campMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CampaignManagement");
    campMod.presentationController.commonFunctionForNavigation("frmShortTermDeposits");
  },
  
  toFormAutoLoan : function(){
    var campMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CampaignManagement");
    campMod.presentationController.commonFunctionForNavigation("frmAutoLoan");
  },
  
  toFormHELOC : function(){
    var campMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CampaignManagement");
    campMod.presentationController.commonFunctionForNavigation("frmHELOC");
  },
  
  toFormSpecialBonus : function(){
    var campMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CampaignManagement");
    campMod.presentationController.commonFunctionForNavigation("frmSpecialBonus");
  },
  toFormEStmtAccountPreferences  : function(){
    var setMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsModule");
    setMod.presentationController.onClickPaperlessCampaign();
  },
  toformFinancialHelp : function(){
    var campMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("CampaignManagement");
    campMod.presentationController.commonFunctionForNavigation("frmFinancialHelp");
  },
  getSuccessResponse:function(data){
    this.successResponse=data;
    var campMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule('CampaignManagement');
    campMod.presentationController.updateCampaignDetails(this.successResponse);
  },
  addLoanAccounts:function(data){
    var navManager = applicationManager.getNavigationManager();
        var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AccountModule");
        var configManager = applicationManager.getConfigurationManager();
        if(configManager.isCombinedUser == "true")  {
        }else{
          this.view.segAccounts.rowTemplate = "flxAccountsNoImage";
        }
        this.view.flxSelectAccount.isVisible = false;
        this.view.flxChartSizeToggle.skin = "sknFlxffffffmb";
    
    	var configManager = applicationManager.getConfigurationManager();
        var custominfoInt = JSON.parse(JSON.stringify(navManager.getCustomInfo("frmDashboard")));
      	if(Array.isArray(custominfoInt.accountData)){
          if(configManager.isCombinedUser=="true"){
            custominfoInt.accountData = custominfoInt.accountData.filter(this.filterPersonalAccount);
          }
        }
        
    if(configManager.isCombinedUser != "true") {
        this.view.segAccounts.widgetDataMap = {
            lblAccountName: "nickName",
            lblAccountBalValue: "availableBalance",
            lblBankName: "accountType",
            lblAccountId: "accountID",
            lblAccountBal: "accountBalanceType"
        };
    }
        var internalAccounts = this.clone(custominfoInt.accountData);
        var processedAccountsData = accountMod.presentationController.processAccountsData(internalAccounts);

    
		processedAccountsData.push(data);
        this.view.segAccounts.setData(processedAccountsData);
      this.removeBlueScreen(processedAccountsData);
  },
  
  welcomeVIPCustomer : function()
  {
    var navManager = applicationManager.getNavigationManager();
    var theme = navManager.getCustomInfo("theme");
    if(theme === "GoldTheme")
	    applicationManager.getDataProcessorUtility().showToastMessageSuccess(this,  kony.i18n.getLocalizedString("kony.mb.vipCustomer.welcomeMsg"));
  },
    
  openNewAccount : function ()
  {
    var NAOModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("NewAccountOpeningModule");
    NAOModule.presentationController.fetchAllProductsAndTnc();
  }
  
  };
  
});
