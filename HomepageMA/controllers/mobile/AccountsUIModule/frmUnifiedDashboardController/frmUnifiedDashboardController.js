define(['CampaignUtility', 'CommonUtilities'], function(CampaignUtility, CommonUtilities) {
  var count = "";
  return {
    /**
         * Description
         * @method preshow
         * @return 
         */
    adsHided: false,
    accountsData: null,
    currentMonthBar: "",
    prevMonth: "",
    prevIndex: null,
    authModule: null,
    nextMonth: "",
    currentMonthSummary: 0,
    limitMonth: "",
    
    MemberShipName: [],
    currentMonthCashPos: 0,
    accountTypeFilterData: null,
    filteredAccountsData: null,
    setLimit: true,
    currAdFlex: 1,
    isFilterApplied: false,
    isPerformanceMetrixEnable:true,
    filterPageData: null,
    processedRetailAccounts: [],
    accountDashboardCampaignData: [],
    numOfAds: 0,
    xOffset: 0,
    imageObjArray: [],
    imageDownloadFailureCount: 0,
    imageDownloadSuccessCount: 0,
    gestIDs: [],
    isSwipeDone: false,
    isOutageShown: false,
    isTapDone: false,
    showPwdWarningFlag: true,
    ACHModule: "",
    timerCounter: 0,
    successResponse: {},
    wealthData: {},
    isApprovalRequestCountHidden: false,
    monthLimit: 0,
    respData :"",
    data1: [],
    data2: [],
    data3: [],
    data4: [],
    combinedFlowName: "",
    wealthFlow: "investmentBanking",
    isPortfolioPermissionAccessible: true,
	    segAccountData:{},
    customerId: "",
    totalAssetsPermission: false,
    pfmData :"",
    accounts:{},
    isGraphAvailable : false,
    flowConstants: {
      "combinedBanking": "combinedBanking",
      "businessBanking": "businessBanking",
      "personalBanking": "personalBanking",
      "investmentBanking": "investmentBanking"
    },

    init: function() {
      //this.customerId = applicationManager.getUserPreferencesManager().primaryCustomerId.id;

      var userMan = applicationManager.getUserPreferencesManager();
      if (userMan.backendIdentifier && userMan.backendIdentifier !== "") {
        this.customerId = userMan.backendIdentifier;
      } else if (userMan.primaryCustomerId.id && userMan.primaryCustomerId.id !== "") {
        this.customerId = userMan.primaryCustomerId.id;
      } else if (userMan.accessibleCustomerIds[0].id && userMan.accessibleCustomerIds[0].id !== "") {
        this.customerId = userMan.accessibleCustomerIds[0].id;
      } 
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
	  this.view.onNavigate = this.onNavigate;
    },
	onNavigate: function () {
		// Footer Menu
		if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
		  var footerMenuUtility = require("FooterMenuUtility");
          if(count === ""){
		  this.footerMenuUtility =
			footerMenuUtility.getFooterMenuUtilityInstance();
            count = 1;
          }else {
            this.footerMenuUtility =
			footerMenuUtility.footerInstanceWhenlanguageChange();
          }
		  var cm = applicationManager.getConfigurationManager();
		  this.footerMenuUtility.entitlements = {
			features: cm.getUserFeatures(),
			permissions: cm.getUserPermissions(),
		  };
		  this.footerMenuUtility.scope = this;
		}
		
    },
    preshow: function() {
      
      try{
        this.view.flxShowAllAccountTypes.isVisible=false;
        this.view.flxSearchAccounts.isVisible=false;
        this.view.lblSelectedAccountType.isVisible=false;
        this.view.flxSelectAccount.isVisible=false; 
        this.isPerformanceMetrixEnable = true;
      }      
      catch(e){}
      this.searchBarConfig();
      this.filterConfig();
      // unwanted carousels issue fix 
      this.view.flxPageIndicator1.isVisible = false;
      this.view.flxPageIndicator2.isVisible = false;
      this.view.flxPageIndicator3.isVisible = false;
      this.view.flxPageIndicator4.isVisible = false;
      this.view.flxPageIndicator5.isVisible = false;
      this.view.flxPageIndicator6.isVisible = false;
      
      var navigationMan = applicationManager.getNavigationManager();
      var checkUserPermission = function(permission) {
        return applicationManager.getConfigurationManager().checkUserPermission(permission);
      }
      var investmentPermission = applicationManager.getConfigurationManager().getInvestmentSummaryPermissionsList().some(checkUserPermission);
      var configManager = applicationManager.getConfigurationManager();
      configManager.getDisputeConfigurations();      
      var isAppPresent=configManager.isMicroAppPresent("PortfolioManagementMA");
      if(isAppPresent===true && investmentPermission){
        this.checkPermissions();
      }
      // if(kony.i18n.getCurrentLocale() === "ar_AE") {
      //   this.view.imgShowAllAccounts.src = "advansecsearch_arabic.png"
      // }
      var investAccounts = '';
      if (investmentPermission) {
        var customData = navigationMan.getCustomInfo('frmUnifiedDashboard');
        this.wealthData = customData ? customData.response : {};
        var configManager = applicationManager.getConfigurationManager();      
        var isAppPresent=configManager.isMicroAppPresent("PortfolioManagementMA");
        if(isAppPresent===true){
          this.loadInvestmentAccounts(this.wealthData);

          investAccounts = this.wealthData.PortfolioList ? this.wealthData.PortfolioList.portfolioList : "";
          let assetsPermission = configManager.getTotalAssetsPermissionsList().some(checkUserPermission);
          if (assetsPermission) {
            this.getAssetsList();
          }
        }

        //      var filter = "OneY";
        //      this.chartService(filter);

      }
      this.view.flxDetails.setVisibility(false);

      try {
        this.isAggregatedUser = false;
        var configManager = applicationManager.getConfigurationManager();      
        var isAppPresent=configManager.isMicroAppPresent("ApprovalRequestMA");
        if(isAppPresent===true){
          this.fetchCounts();
        }        
        this.adsPreshow();
      } catch (e) {
        try {
          kony.print("Exception in preshow" + JSON.stringify(e, null, 4));
        } catch (er) {}
      }

      try {
        var configurationManager = applicationManager.getConfigurationManager();
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("formFlow", "frmUnifiedDashboard");
        var userType = 3;
        this.isFilterApplied = false;
        try {
          var configManager = applicationManager.getConfigurationManager();      
          var isAppPresent=configManager.isMicroAppPresent("ApprovalRequestMA");
          if(isAppPresent===true){
            this.showApprovalAndRequestView();
          }
        } catch (e) {
          try {
            kony.print("Exception in preshow" + JSON.stringify(e, null, 4));
          } catch (er) {}
        }

        if (configurationManager.isCombinedUser === "true") {
          this.combinedFlowName = this.flowConstants.combinedBanking;
          var dashboardSelctionFlow = navManager.getCustomInfo("frmDashboardSelector");
          userType = 1;
          if (!kony.sdk.isNullOrUndefined(dashboardSelctionFlow)) {
            this.combinedFlowName = dashboardSelctionFlow;
            //navManager.setCustomInfo("frmDashboardSelector", undefined);
          }
        } else if (configurationManager.isSMEUser === "true") {
          this.combinedFlowName = this.flowConstants.businessBanking;
          userType = 2;
        } else {
          this.combinedFlowName = this.flowConstants.personalBanking;
          userType = 3;
        }

        var isAppPresent=configurationManager.isMicroAppPresent("HomepageMA");
        if(isAppPresent===true){
          this.ACHModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AccountsUIModule", "appName": "HomepageMA" });
        }
        var configManager = applicationManager.getConfigurationManager();      
        var isAppPresent=configManager.isMicroAppPresent("ApprovalRequestMA");
        if(isAppPresent===true){
          if (userType !== 3) {
            this.showApprovalAndRequestView();

            this.fetchGeneralTransactionApprovals();
          }

          this.view.flxApprovalTitleContainer.onClick = this.navigateToApprovals;
          this.view.customHeader.flxSearch.onClick = this.navigateToCombinedSelector;
          this.view.flxRequestTitleContainer.onClick = this.navigateToRequests;
        }
        var configManager = applicationManager.getConfigurationManager();      
        var isAppPresent=configManager.isMicroAppPresent("PortfolioManagementMA");
        if(isAppPresent===true){
          this.view.flxTopNewsLink.onClick = this.goToTopNews;
          this.view.flxRecentActivity.onClick = this.goToRecentActivity;
        }
        else{
          this.view.flxTopNewsLink.setVisibility(false);
          this.view.flxRecentActivity.setVisibility(false);
        }
        this.isDonutChartDisplayed = false;
        this.isBarChartDisplayed = false;
        this.isAssetChartDisplayed = false;
        this.isMultiLineBarChartDisplayed = false;
        this.view.flxDashboardHeader.showFadingEdges = false;
        this.view.flxSearchContainer.isVisible = false;
        this.view.flxAccountTypes.isVisible = false;
        this.view.flxNextMonthBarSeg.setVisibility(false);
        this.view.flxNextMonthGraph.setVisibility(false);
        this.view.flxWealthContainer.setVisibility(false);
        this.view.customSearchbox.tbxSearch.text = "";
        this.view.btnViewTransactions.isVisible = true;
        this.resetLanguageChange();
        this.view.customSearchbox.tbxSearch.placeholder = kony.i18n.getLocalizedString("kony.mb.login.searchplaceholder");
        var date = new Date();
        this.MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"
                           ];
        var presentYear = date.getFullYear();
        this.currentMonthBar = presentYear;
        this.currentMonthCashPos = date.getMonth();
        this.currentMonthSummary = this.currentMonthCashPos;
        this.monthLimit = this.currentMonthCashPos;
        this.view.lblMonthAndYearCashBarSeg.text = "" + this.currentMonthBar;
        this.view.lblMonthAndYearGraph.text = this.MONTH_NAMES[this.currentMonthSummary] + " " + "-" + " " + presentYear;
        this.view.lblMonthAndYearCashPos.text = this.MONTH_NAMES[this.currentMonthCashPos] + " - " + presentYear;
        this.view.flxNextMonthCashPos.setVisibility(false);

      } catch (e) {
        try {
          kony.print("Exception in preshow" + JSON.stringify(e, null, 4));
        } catch (er) {}
      }

      // this.view.flxScrollContainerAds.onClick=this.toFormLoans;
      try {
        var navManager = applicationManager.getNavigationManager();
        var configManager = applicationManager.getConfigurationManager();      
        var isAppPresent=configManager.isMicroAppPresent("FinanceManagementMA");
        if(isAppPresent===true){
          var accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "PersonalFinanceManagementUIModule", "appName": "FinanceManagementMA" });
          accountModule.presentationController.fetchPFMDetails(false);
          //this.pfmData=navManager.getCustomInfo("frmPFMMyMoney");//osama to dis chart

          //   applicationManager.getPresentationUtility().dismissLoadingScreen();


        }
      } catch (e) {
        try {
          kony.print("Exception in preshow" + JSON.stringify(e, null, 4));
        } catch (er) {}
      }
      var navManager = applicationManager.getNavigationManager();

      try {
        navManager.setEntryPoint("centralmoneymovement", "frmDashboardAggregated");
        navManager.setEntryPoint("europeTransferFlow", "frmDashboardAggregated");
        this.view.flxDashboard.showFadingEdges = false;
        if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
          this.view.flxTitle.isVisible = true;
          this.view.flxMenu.isVisible = false;
        } else {
          this.view.flxTitle.isVisible = false;
          this.view.flxMenu.isVisible = true;
          this.view.flxDashboardHeader.horizontalScrollIndicator = false;
        }
        this.CATEGORY_COUNT = 9;
        var configManager = applicationManager.getConfigurationManager();      
        var isAppPresent=configManager.isMicroAppPresent("AuthenticationMA");
        if(isAppPresent===true){
          var authMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AuthUIModule", "appName": "AuthenticationMA" });
          authMode.presentationController.firstTimeLoginDone();
          this.selectedBankSkin = "sknlbl000000SSP26px";
          this.otherBankSkin = "sknLbl0095e4SSPRegular26px";
        }
      } catch (e) {
        try {
          kony.print("Exception in preshow" + JSON.stringify(e, null, 4));
        } catch (er) {}
      }

      /// var isAppPresent=configManager.isMicroAppPresent("HomepageMA");
      // if(isAppPresent===true){
      var navManager = applicationManager.getNavigationManager();
      var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AccountsUIModule", "appName": "HomepageMA" });
      var formatUtility = applicationManager.getFormatUtilManager();
      var custominfoInt = navManager.getCustomInfo("frmDashboard");
      var custominfoExt = navManager.getCustomInfo("frmDashboardAggregated");
      var internalAccounts;
      if(custominfoInt!==undefined)
      {
        internalAccounts = this.clone(custominfoInt.accountData);
        internalAccounts = internalAccounts.filter(account => account.isPortFolioAccount === "false");
        //internalAccounts = internalAccounts.filter(function(account) {if(account.accountType !== "mortgageFacility") return account});
        this.accounts=internalAccounts;
      }

      var externalAccounts ;
      if(custominfoExt!==undefined)
      {
        externalAccounts = this.clone(custominfoExt.accountData);
      }
      // var externalAccounts = this.clone(custominfoExt.accountData);
      var existAccounts = (internalAccounts !==undefined && internalAccounts !== "" && internalAccounts.length > 0) || (externalAccounts && externalAccounts.length > 0) || (investAccounts !== undefined && investAccounts !== "" && investAccounts.length > 0);
      if(custominfoInt && custominfoInt.isGetListCalled===true){
        this.view.noAccounts.setVisibility(!existAccounts);
      }
      this.view.flxChartSizeToggle.setVisibility(existAccounts);
      var configManager = applicationManager.getConfigurationManager();      
      var isAppPresent=configManager.isMicroAppPresent("ArrangementsMA");
      if(isAppPresent===true){
        this.view.noAccounts.btnOpenAccount.onClick = this.openNewAccount;
      }
      else{
        this.view.noAccounts.btnOpenAccount.setVisibility(false);
      }
      if (existAccounts) {
        this.view.flxDashboard.setVisibility(true);
      } else {
        this.view.flxDashboard.setVisibility(false);
      }
      try {
        Array.prototype.push.apply(internalAccounts, externalAccounts);
      } catch (e) {
        try {
          kony.print("Exception in preshow" + JSON.stringify(e, null, 4));
        } catch (er) {}
      }
      //var processedAccountsData = accountMod.presentationController.processAccountsData(internalAccounts);
      if(internalAccounts!==undefined){
        var totalAvaBal = accountMod.presentationController.getTotalAvailableBalance(internalAccounts);
        var totalDebt = accountMod.presentationController.getTotalDebtBalance(internalAccounts);
        var totalAvlFloat = formatUtility.deFormatAmount(totalAvaBal);
        var totalDebtFloat = formatUtility.deFormatAmount(totalDebt);
      }

      var currentForm = navManager.getCurrentForm();
      var loggerManager = applicationManager.getLoggerManager();
      var navManager = applicationManager.getNavigationManager();
      try {
        this.view.lblAssetsValue.text = totalAvaBal;
        this.view.lblDebtValue.text = totalDebt;
        this.mapAccountsAndBanks();


        if (this.combinedFlowName === this.flowConstants.combinedBanking || this.combinedFlowName === this.flowConstants.businessBanking) {
          this.loadCashPos();
        }

        //this.view.flxOne.onClick = this.animateDashboardFlex;
        //this.view.flxTwo.onClick = this.animateDashboardFlex;
        //this.view.flxThree.onClick = this.animateDashboardFlex;
        this.view.flxHamburger.isVisible = false;

        applicationManager.getPresentationFormUtility().logFormName(currentForm);

        loggerManager.setCustomMetrics(this, true, "#Successfull Logins");
        if(custominfoInt!==undefined)
        {
          if (custominfoInt.isNavigationFromQuickAction) {
            var basicConfig = { message: custominfoInt.quickActionAlertText, alertIcon: null, alertType: constants.ALERT_TYPE_INFO };
            var pspConfig = {};
            applicationManager.getPresentationUtility().showAlertMessage(basicConfig, pspConfig);
            custominfoInt.isNavigationFromQuickAction = false;
          }
        }
        this.initActions();
        this.view.flxDashboard.setContentOffset({
          "y": "0dp"
        });
        this.initPageIndicators();
      } catch (e) {
        try {
          kony.print("Exception in preshow" + JSON.stringify(e, null, 4));
        } catch (er) {}
      }
      //   }
      try {
        //Sibhi Start
          this.view.lblSelectedAccountType.text = kony.i18n.getLocalizedString("kony.mb.common.allAccounts");
        var configurationManager = applicationManager.getConfigurationManager();

        if (this.combinedFlowName === this.flowConstants.combinedBanking) {
          this.view.customHeader.imgSearch.src = "combinedbankingwhite.png";
          this.setRightBarButtonsiOS(3);
          this.view.customHeader.imgSearch.setVisibility(false);
          this.view.customHeader.flxSearch.setVisibility(false);
          //this.setupNavBarIconForiPhone("combined");
          this.view.flxSelectedAccounts.isVisible = true;
          this.view.lblSelectedAccountType.text = kony.i18n.getLocalizedString("kony.mb.common.allAccounts");
          this.view.customHeader.flxSearch.isVisible = true;
          if (internalAccounts.length > 0) {
            var currencyCode = internalAccounts[0]["currencyCode"];
            this.view.lblBankName.text = formatUtility.formatAmountandAppendCurrencySymbol(totalAvlFloat - totalDebtFloat, currencyCode);
          } else {
            this.view.lblBankName.text = formatUtility.formatAmountandAppendCurrencySymbol(totalAvlFloat - totalDebtFloat);
          }
          this.view.lblAssetsValue.text = totalAvaBal;
          this.view.lblDebtValue.text = totalDebt;

          this.view.customHeader.imgSearch.setVisibility(false);
          this.view.customHeader.flxSearch.setVisibility(false);
        } else if (this.combinedFlowName === this.flowConstants.businessBanking) {
          this.view.customHeader.flxSearch.onClick = this.navigateToCombinedSelector;
          this.view.flxSelectedAccounts.isVisible = true;
          this.view.lblSelectedAccountType.text = kony.i18n.getLocalizedString("kony.mb.businessDashboard.viewByBusinessGroup");
          if (configurationManager.isCombinedUser === "true") {
            this.view.customHeader.flxSearch.isVisible = true;
            this.view.customHeader.imgSearch.src = "businessbankingwhite.png";
            this.setRightBarButtonsiOS(2);
            //this.setupNavBarIconForiPhone("business");
            this.view.customHeader.imgSearch.setVisibility(false);
            this.view.customHeader.flxSearch.setVisibility(false);
          } else {
            this.view.customHeader.flxSearch.isVisible = false;
          }

          var keyvalue = "BusinessDashboard";
          navManager.setCustomInfo("backFormFlow", keyvalue);
          this.setRightBarButtonsiOS(2);
          this.view.customHeader.imgSearch.setVisibility(false);
          this.view.customHeader.flxSearch.setVisibility(false);
        } else if (this.combinedFlowName === this.flowConstants.personalBanking) {
          this.view.flxSelectedAccounts.isVisible = true;
          if (configurationManager.isCombinedUser === "true") {
            this.view.customHeader.flxSearch.isVisible = true;
            this.view.customHeader.imgSearch.src = "personalbankingwhitelarge.png";
            this.setRightBarButtonsiOS(1);
            this.view.customHeader.imgSearch.setVisibility(false);
            this.view.customHeader.flxSearch.setVisibility(false);
            //this.setupNavBarIconForiPhone("retail");
          } else {
            this.view.customHeader.flxSearch.isVisible = false;
          }

          var date = new Date();
          var presentMonth = date.getMonth();
          this.currentMonth = presentMonth;
          var configManager = applicationManager.getConfigurationManager();      
          var isAppPresent=configManager.isMicroAppPresent("FinanceManagementMA");
          if(isAppPresent===true){
            this.goToMonth(presentMonth);
          }

        }
        //Sibhi end
      } catch (e) {
        try {
          kony.print("Exception in preshow" + JSON.stringify(e, null, 4));
        } catch (er) {}
      }

      //If the filter is applied
      var filterAccountsInfo = navManager.getCustomInfo("frmFilterAccounts");
      if (!kony.sdk.isNullOrUndefined(filterAccountsInfo)) {
        if (filterAccountsInfo.isFilterApplied) { //Only when filter is applied
          this.isFilterApplied = true;
          if (Array.isArray(filterAccountsInfo.segData)) {
            var segData = this.viewAllFilter(filterAccountsInfo.segData);
            this.filterPageData = filterAccountsInfo.segData;
            this.view.segAccounts.widgetDataMap = this.getAccountsWidgetDataMap();
            this.view.segAccounts.setData(segData);
            this.view.lblSelectedAccountType.text = filterAccountsInfo.selectedAccountsName;
            this.accountsData = filterAccountsInfo.accountData; //this.clone(filterAccountsInfo.accountData); // It is not working if clone is used
            if (this.combinedFlowName !== this.flowConstants.combinedBanking) {
              this.processedRetailAccounts = filterAccountsInfo.accountData["Personal Accounts"];
            } else if (this.combinedFlowName === this.flowConstants.businessBanking) {

            } else {
              var configManager = applicationManager.getConfigurationManager();      
              var isAppPresent=configManager.isMicroAppPresent("ArrangementsMA");
              if(isAppPresent===true){
                this.view.segAccounts.onRowClick = this.accountSegmentOnClick.bind(this);
              }
              else{
                this.view.segAccounts.setVisibility(false);
              }
            }
            var data = {
              "segData": filterAccountsInfo.segData,
              "isFilterApplied": true,
              "selectedAccountsName": filterAccountsInfo.selectedAccountsName,
              "accountData": filterAccountsInfo.accountData
            };

            navManager.setCustomInfo("frmFilterAccounts", data);
          }
        }
      }

      try {
        this.welcomeVIPCustomer();
        if (this.currentMonth === 1)
          this.view.flxPrevMonth.setVisibility(false);
        if (this.currentMonth >= this.limitMonth)
          this.view.flxNextMonth.setVisibility(false);
        if (applicationManager.getPresentationFormUtility().getDeviceName() === "android") {
          kony.application.setApplicationCallbacks({ "onforeground": this.changeDashboardHeaderOffset });
        }
      } catch (e) {
        try {
          kony.print("Exception in preshow" + JSON.stringify(e, null, 4));
        } catch (er) {}
      }

      try {
        this.setupChartsDependingOnTypeOfUser();
      } catch (e) {
        try {
          kony.print("Exception in preshow" + JSON.stringify(e, null, 4));
        } catch (er) {}

      }

      try {
        var confManager = applicationManager.getConfigurationManager();
        if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
          if (confManager.isCombinedUser != "true") {
            this.setRightBarButtonsiOS(0);
            this.view.customHeader.imgSearch.setVisibility(false);
            this.view.customHeader.flxSearch.setVisibility(false);
          }
        }
      } catch (err) {}
      	    var accounts = internalAccounts?internalAccounts:[];
            var searchBarConfigResp = this.searchBarConfig(accounts.length);
            var filterConfigResp = this.filterConfig(accounts.length);
            if(searchBarConfigResp && filterConfigResp) this.view.flxSelectAccount.isVisible=false;

      this.view.forceLayout();
      let scopeObj = this;

      function campaignPopUpSuccess(response) {
        CampaignUtility.showCampaign(response, scopeObj.view);
      }

      function campaignPopUpError(response) {
        kony.print(response, "Campaign Not Found!");
      }
      if(applicationManager.getConfigurationManager().isMicroAppPresent(applicationManager.getConfigurationManager().microappConstants.CAMPAIGN)){
        CampaignUtility.fetchPopupCampaigns(campaignPopUpSuccess, campaignPopUpError);
      }
      let custominfoCD = applicationManager.getNavigationManager().getCustomInfo("frmCustomerDashboard");
	// Footer Menu
	  if (applicationManager.getPresentationFormUtility().getDeviceName() !==	"iPhone") {
			this.footerMenuUtility.setFooterMenuItems(this, "flxPrimary500");
	  		if(!kony.sdk.isNullOrUndefined(custominfoCD) && (custominfoCD.reDesignFlow === "true"))
			  this.view.customHeader.flxBack.isVisible = true;
        	else
              this.view.customHeader.flxBack.isVisible = false;
		}
      this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
      applicationManager.getPresentationUtility().dismissLoadingScreen(); // please let this be the last line of preshow
    },

    resetLanguageChange: function(){
      let custominfoCD = applicationManager.getNavigationManager().getCustomInfo("frmCustomerDashboard");
	  if(!kony.sdk.isNullOrUndefined(custominfoCD) && (custominfoCD.reDesignFlow === "true")){
      	this.view.customHeader.lblLocateUs.text = custominfoCD.MembershipName;
        this.view.title = custominfoCD.MembershipName;
      }else{
        this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.MyAccounts.Title");
        this.view.title = kony.i18n.getLocalizedString("kony.mb.MyAccounts.Title");
      }
      this.view.title = kony.i18n.getLocalizedString("kony.mb.MyAccounts.Title");
      this.view.lblTransaction.text = kony.i18n.getLocalizedString("kony.mb.Dashboard.singleTransactions");
      this.view.lblACHTransaction.text = kony.i18n.getLocalizedString("kony.mb.Dashboard.bulkTransactions");
      this.view.lblACHFile.text = kony.i18n.getLocalizedString("kony.mb.Dashboard.otherRequest");
      this.view.lblPending.text = kony.i18n.getLocalizedString("kony.mb.Dashboard.singleTransactions");
      this.view.lblApproved.text = kony.i18n.getLocalizedString("kony.mb.Dashboard.bulkTransactions");
      this.view.lblRejected.text = kony.i18n.getLocalizedString("kony.mb.Dashboard.otherRequest");
      this.view.btnViewTransactions.text = kony.i18n.getLocalizedString("i18n.wealth.viewAll");
      this.view.lblAssetsTitle.text = kony.i18n.getLocalizedString("kony.mb.login.Assets");
      this.view.lblDebtTitle.text = kony.i18n.getLocalizedString("kony.mb.login.debt");
      this.view.lblNetWorthSummary.text = kony.i18n.getLocalizedString("kony.mb.login.netWorthSummary");
      this.view.lblBalanceOverview.text = kony.i18n.getLocalizedString("kony.mb.login.netWorthSummary");
      this.view.lblSuggestedOffersTitle.text = kony.i18n.getLocalizedString("kony.mb.DashboardAggregated.SuggestedOffersTitle");
      this.view.lblApprovalsText.text = kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Approvals");
      this.view.lblRequestsText.text = kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Requests");
    },
    viewAllFilter: function(processedArry) {
      try {
        kony.print("Entrered viewAllFilter");
        //Adding ViewAll functionality
        var scope = this;
        for (var i = 0; i < processedArry.length; i++) {
          var items = processedArry[i][1];
          var templateName = "";
          if (scope.combinedFlowName === scope.flowConstants.combinedBanking) {
            templateName = "flxClearViewAll";
          } else if (scope.combinedFlowName === scope.flowConstants.businessBanking) {
            templateName = "flxViewAll";
          } else {
            templateName = "flxViewAll";
          }
          var viewAllConfig = {};
          viewAllConfig = {
            "template": templateName,
            "lblViewAll": {
              //"text" : "View All"   
              "isVisible": false // Disabling it as the text is not need
            },
            "imgViewAll": { //"left" : "200%" ,
              "src": "blue_downarrow.png",
              "left": "50%"
            },
            "flxViewContainer": {
              "onClick": scope.viewAllFilterOnClick
            }
          };

          if (processedArry[i][1].length > 3) {
            processedArry[i][1].splice(3, processedArry[i][1].length);
            processedArry[i][1].push(viewAllConfig);
          }
        }
        return processedArry;
      } catch (e) {
        kony.print("Exception in viewAllFilter" + e);
      }
    },

    viewAllFilterOnClick: function(eventobject, context) {
      try {
        var accountsData = {};
        var scope = this;
        var accountsKeys = Object.keys(scope.accountsData);
        if(kony.sdk.isNullOrUndefined(scope.accountsData[0])){
          accountsData[accountsKeys[context.sectionIndex]] = scope.accountsData[accountsKeys[context.sectionIndex]];
          //Upon clicking the downarrow, processing the entire set of data to be visible in the list
          if (accountsData[accountsKeys[context.sectionIndex]].length > 3) {
            var pendingRowdata = accountsData[accountsKeys[context.sectionIndex]].slice(3, accountsData[accountsKeys[context.sectionIndex]].length);
            var acctSegData = this.viewAllFilter(this.filterPageData); //this.getSegmentDataForAccounts(this.accountsData, 3);
            acctSegData.forEach(function(sectionData, index) {
              if (index == context.sectionIndex) {
                sectionData[1].pop();
                Array.prototype.push.apply(sectionData[1], pendingRowdata)
              }
            });
            this.view.segAccounts.setData(acctSegData);
          }
        }else{
          accountsData = scope.accountsData;
          if (accountsKeys.length > 3) {
            var pendingRowdata = accountsData.slice(3, accountsData.length);
            var acctSegData = this.viewAllFilter(this.filterPageData); //this.getSegmentDataForAccounts(this.accountsData, 3);
            acctSegData.forEach(function(sectionData, index) {
              if (index == context.sectionIndex) {
                sectionData[1].pop();
                Array.prototype.push.apply(sectionData[1], pendingRowdata)
              }
            });
            this.view.segAccounts.setData(acctSegData);
          }
        }

      } catch (e) {
        kony.print("Exception in viewAllFilterOnClick" + e);
      }
    },

    openNewAccount: function() {
      var configManager = applicationManager.getConfigurationManager(); 
      var NAOModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "NewAccountOpeningModule", "appName": "ArrangementsMA" });
      NAOModule.presentationController.fetchAllProductsAndTnc();

    },

    /**
         * @function
         *
         * @param switchtype 
         */
    setupNavBarIconForiPhone: function(switchtype) {
      // 0 = retail
      // 1 = business
      // 2 = combined
      // 3 = remove any icon
      return; //adding this as this was causing issues in iOS
      //       try {
      //         if(applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone");
      //         else {
      //           return;
      //         }

      //         var type = -1;
      //         var configurationManager = applicationManager.getConfigurationManager();
      //         var basicConfImage = {
      //           "id":"imageIdTest",
      //           "isVisible":true,
      //           "src":"",
      //           "imageWhenFailed":"combinedbankingwhite.png",
      //           "imageWhileDownloading":"combinedbankingwhite.png",
      //           "onTouchEnd" : function(eventSource, x, y) {
      //             var navManager = applicationManager.getNavigationManager();
      //             navManager.navigateTo("frmDashboardSelector");
      //           }
      //         };
      //         var layoutConfImage = {
      //           "containerWeight":100,
      //           "imageScaleMode":"constants.IMAGE_SCALE_MODE_FIT_TO_DIMENSIONS"
      //         };
      //         var PSPConfImage = {
      //           "toolTip":"usertypeicon"
      //         };

      //         if(!kony.sdk.isNullOrUndefined(switchtype)) {
      //           if(switchtype === 0 || switchtype === "retail") {
      //             type = 0;
      //           }
      //           else if(switchtype === 1 || switchtype === "business") {
      //             type = 1;
      //           }
      //           else if(switchtype === 2 || switchtype === "combined") {
      //             type = 2;
      //           }
      //           else if(switchtype === 3) {
      //             type = 3;
      //           }
      //           else {
      //             type = -1;
      //           }
      //         }
      //         if(type === -1) {
      //           if(configurationManager.isCombinedUser === "true") {
      //             type = 2;
      //           }
      //           else if(configurationManager.isRBUser === "true") {
      //             type = 3;
      //           }
      //           else if(configurationManager.isSMEUser === "true") {
      //             type = 3;
      //           }
      //         }

      //         switch(type) {
      //           case -1 : return;
      //           case 0 : //retail
      //             basicConfImage["src"] = "personalbankingwhite.png";
      //             PSPConfImage["toolTip"] = "Retail Banking User Icon";
      //             var personalimg = new kony.ui.Image2(basicConfImage, layoutConfImage, PSPConfImage);
      //             this.view.setRightBarButtonItems({
      //               items: [personalimg],
      //               animated: true
      //             });
      //             break;
      //           case 1 : //business
      //             basicConfImage["src"] = "businessbankingwhite.png";
      //             PSPConfImage["toolTip"] = "Business Banking User Icon";
      //             var businessimg = new kony.ui.Image2(basicConfImage, layoutConfImage, PSPConfImage);
      //             this.view.setRightBarButtonItems({
      //               items: [businessimg],
      //               animated: true
      //             });
      //             break;
      //           case 2 : //combined
      //             basicConfImage["src"] = "combinedbankingwhite.png";
      //             PSPConfImage["toolTip"] = "Combined Banking User Icon";
      //             var combinedimg = new kony.ui.Image2(basicConfImage, layoutConfImage, PSPConfImage);
      //             this.view.setRightBarButtonItems({
      //               items: [combinedimg],
      //               animated: true
      //             });
      //             break;
      //           case 3 : //remove all
      //             var rightBarButtonItem = new kony.ui.BarButtonItem({
      //               type: configManager.constants.BAR_BUTTON_TITLE,
      //               style: configManager.constants.BAR_ITEM_STYLE_PLAIN,
      //               enabled: true,
      //               tintColor: "FFFFFF00",
      //               metaData: {
      //                 title: " "
      //               }
      //             });
      //             this.view.setRightBarButtonItems({
      //               items: [rightBarButtonItem],
      //               animated: true
      //             });
      //             break;
      //         }
      //       }
      //       catch (e) {
      //         kony.print("Exception in preshow" + JSON.stringify(e, null, 4));
      //       }
    },
    fetchGeneralTransactionApprovals: function() {
      try {
        kony.print("Entered fetchGeneralTransactionApprovals");
        var scopeObj = this;             
        var approvalsReqModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "ApprovalsReqUIModule", "appName": "ApprovalRequestMA" });
        var fetchParams = {
          "searchString": "",
          "sortByParam": "createdts",
          "sortOrder": "DESC",
          "pageSize": 100,
          "pageOffset": 0,
          "filterByTransactionType": "",
          "filterByStatus": ""
        };
        var navObj = {
          requestData: fetchParams,
          formData: this
        };
        approvalsReqModule.presentationController.getGeneralTransactionsPullDownDashboard(navObj);

      } catch (error) {
        kony.print("Exception in  fetchGeneralTransactionApprovals-->" + error);
      }
    },

    fetchGenTransactionMyApprovalSuccessCallBack: function(response) {
      try {
        if (this.combinedFlowName === this.flowConstants.combinedBanking || this.combinedFlowName === this.flowConstants.businessBanking) {} else {}
      } catch (er) {}
    },

    showApprovalAndRequestView: function() {
      var configManager = applicationManager.getConfigurationManager();
      var isViewGeneralTransactionsEnabled = configManager.getViewGeneralTransactionPermissionsList().some(configManager.checkUserPermission.bind(configManager));
      var isViewACHTransactionsEnabled = configManager.getViewACHTransactionPermissionsList().some(configManager.checkUserPermission.bind(configManager));
      var isViewACHFilesEnabled = configManager.getViewACHFilePermissionsList().some(configManager.checkUserPermission.bind(configManager));
      var isApproveGeneralTransactionsEnabled = configManager.getGeneralTransactionApprovalFeaturePermissionsList().some(configManager.checkUserPermission.bind(configManager));
      var isApproveACHTransactionsEnabled = configManager.getACHTransactionApprovalsFeaturePermissionsList().some(configManager.checkUserPermission.bind(configManager));
      var isApproveACHFilesEnabled = configManager.getACHFileApprovalsFeaturePermissionsList().some(configManager.checkUserPermission.bind(configManager));
      var checkUserPermission = function(permission) {
        return applicationManager.getConfigurationManager().checkUserPermission(permission);
      }
      var allApprovalAndRequestPermission = configManager.getApprovalsAndRequestsFeaturePermissionsList();
      var isApprovalOrRequestPermissionAccessible = allApprovalAndRequestPermission.some(checkUserPermission);
      //Some/All of the Approval or request permission access
      let custominfoCD = applicationManager.getNavigationManager().getCustomInfo("frmCustomerDashboard");
        if(!kony.sdk.isNullOrUndefined(custominfoCD) && (custominfoCD.reDesignFlow === "true"))
      isApprovalOrRequestPermissionAccessible=false;
      if (isApprovalOrRequestPermissionAccessible) {
        // this.getCounts();
        this.view.flxApprovalRequest.isVisible = true;


        //Sibhi start
        if (this.combinedFlowName === this.flowConstants.combinedBanking) {
          this.view.flxPageIndicator5.isVisible = true;
        } else if (this.combinedFlowName === this.flowConstants.businessBanking) {
          this.view.flxPageIndicator2.isVisible = true;
        } else {

        }
        //Sibhi End



        var allApprovalPermission = configManager.getApprovalsFeaturePermissionsList();
        var isApprovalPermissionAccessible = allApprovalPermission.some(checkUserPermission);

        var allRequestPermissionAccessible = configManager.getRequestsFeaturePermissionsList();
        var isRequestPermissionAccessible = allRequestPermissionAccessible.some(checkUserPermission);

        if (isApprovalPermissionAccessible && !isRequestPermissionAccessible) {
          //show only approbval counts
          this.view.flxApprovalContainer.isVisible = true;
          this.view.flxRequestContainer.isVisible = false;
          this.view.flxApprovalContainer.width = "90%";

        }
        if (!isApprovalPermissionAccessible && isRequestPermissionAccessible) {
          //show only request Count
          this.view.flxApprovalContainer.isVisible = false;
          this.view.flxRequestContainer.isVisible = true;
          this.view.flxRequestContainer.left = "8%";
          this.view.flxRequestContainer.width = "92%";
        }
        if (isApprovalPermissionAccessible && isRequestPermissionAccessible) {
          this.view.lblRecenTransactions.text = kony.i18n.getLocalizedString("kony.mb.dashboard.pendingApprovals");
        } else if (!isApprovalPermissionAccessible && isRequestPermissionAccessible) {
          this.view.lblRecenTransactions.text = kony.i18n.getLocalizedString("kony.mb.dashboard.pendingRequests");
        } else if (isApprovalPermissionAccessible && !isRequestPermissionAccessible) {
          this.view.lblRecenTransactions.text = kony.i18n.getLocalizedString("kony.mb.dashboard.pendingApprovals");
        }

        this.view.flxApprovalTransactionContainer.isVisible = (isViewGeneralTransactionsEnabled && isApproveGeneralTransactionsEnabled);
        this.view.flxApprovalACHTransactionContainer.isVisible = (isViewACHTransactionsEnabled && isApproveACHTransactionsEnabled);
        this.view.flxApprovalACHFileContainer.isVisible = (isViewACHFilesEnabled && isApproveACHFilesEnabled);
      }
      //no permission access
      else {
        //hide all the UI of Approval and Request counts
        this.view.flxApprovalRequest.isVisible = false;

        //change pageIndicator
        this.isApprovalRequestCountHidden = true;

        //Sibhi start
        if (this.combinedFlowName === this.flowConstants.combinedBanking) {
          this.view.flxPageIndicator5.isVisible = false;
        } else if (this.combinedFlowName === this.flowConstants.businessBanking) {
          this.view.flxPageIndicator2.isVisible = false;
        } else {

        }
        //Sibhi End

        //show multiline bar chart on preshow
        this.displayMultiLineBarChart();
        this.isMultiLineBarChartDisplayed = true;
      }
    },
    initPageIndicators: function() {
      var len = this.view.flxPageIndicators.widgets().length;
      if (this.isApprovalRequestCountHidden) {
        len = len - 1;
      }
      if (this.totalAssetsPermission === false) {
        len = len - 1;
      }
      for (let index = 1; index <= len; index++) {
        this.view["flxPageIndicator" + index].skin = "sknFlxPageIndicatorUnselected";
      }
      this.view["flxPageIndicator1"].skin = "sknFlxPageIndicatorSelected";
    },
    changeDashboardHeaderOffset: function() {
      var navManager = applicationManager.getNavigationManager();
      if (navManager.getCurrentForm() == "frmDashboardAggregated") {
        var scrollX = this.view.flxDummyHorizontalScroll.contentOffsetMeasured.x;
        this.view.flxDashboardHeader.setContentOffset({
          "x": scrollX + "dp"
        });
      }
    },

    fetchPendingRequests: function() {
      var scopeObj = this;
      var navObj = {
        "sortByParam": "createdts",
        "sortOrder": "DESC",
        "searchString": "",
        "pageSize": 100,
        "pageOffset": 0,
        "filterByParam": "",
        "filterByValue": ""
      };
      scopeObj._approvalsReqModule.presentationController.getPendingRequests(navObj);
    },
    fetchPendingApprovals: function(filterByParam, filterByValue) {
      var scopeObj = this;
      var configManager = applicationManager.getConfigurationManager();      
      var isAppPresent=configManager.isMicroAppPresent("ApprovalRequestMA");
      if(isAppPresent===true){
        var approvalsReqModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "ApprovalsReqModule", "appName": "ApprovalRequestMA" });
        if (kony.sdk.isNullOrUndefined(filterByParam) || kony.sdk.isNullOrUndefined(filterByValue)) {
          filterByValue = "";
          filterByParam = "";
        }
        var navObj = {
          "sortByParam": "createdts",
          "sortOrder": "DESC",
          "searchString": "",
          "pageSize": 100,
          "pageOffset": 0,
          "filterByParam": filterByParam,
          "filterByValue": filterByValue
        };
        approvalsReqModule.presentationController.getPendingApprovals(navObj);
      }
    },

    fetchMyPendingApprovalSuccessCallBack: function(responseArr) {
      var segData = [];
      var isNoDataFound = false;
      if (responseArr.length > 0) {
        for (var i = 0; i < responseArr.length; i++) {
          if (!kony.sdk.isNullOrUndefined(responseArr[i].featureActionName) && !kony.sdk.isNullOrUndefined(responseArr[i].requiredApprovals)) {
            isNoDataFound = false;
            var json = {
              "featureName": responseArr[i].featureActionName.text,
              "requiredApprovals": responseArr[i].requiredApprovals.text
            }
            segData.push(json);
          } else {
            isNoDataFound = true;

          }

        }

        if (isNoDataFound) {
          this.view.segRecentTransactions.isVisible = false;
          this.view.flxViewTransactions.isVisible = false;
          this.view.lblNoData.isVisible = true;
        } else {
          this.view.segRecentTransactions.isVisible = true;
          this.view.lblNoData.isVisible = false;
          this.view.flxViewTransactions.isVisible = true;
          this.view.segRecentTransactions.widgetDataMap = {
            "lblSpendingCategory": "featureName",
            "lblTotalAmount": "requiredApprovals",
          };
          this.view.segRecentTransactions.removeAll();
          this.view.segRecentTransactions.setData(segData);
        }


      }
    },

    navigateToApprovalsList: function() {
      try {
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo({appName: 'ApprovalRequestMA', friendlyName: 'frmApprovalsAndRequestsTitle'});
      } catch (er) {}
    },

    //osamaUN
    navigateToUNtest: function() {
      try {
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo({appName: 'UNMoneyTestMA', friendlyName: 'UNMoney/frmULTNetworkTransfers'});
      } catch (er) {}
    },
     navigateToUN: function() {
      try {
        var navManager = applicationManager.getNavigationManager();
        navManager.navigateTo({appName: 'UNMoneyMA', friendlyName: 'UNMoney/frmULTNetworkTransfers'});
      } catch (er) {}
    },
    navigateToCombinedSelector: function() {
      //       try {
      //         var navManager = applicationManager.getNavigationManager();
      //         navManager.navigateTo("frmDashboardSelector");
      //       } catch (er) {}
    },

    navigateToSelector: function() {
      //       try {
      //         var navManager = applicationManager.getNavigationManager();
      //         navManager.navigateTo("frmDashboardSelector");
      //       } catch (er) {

      //       }
    },
    resetDashboardFlex: function() {
      if (this.view.imgChartSizeToggle.src !== "whitearrowdown.png") {
        this.view.imgChartSizeToggle.src = "whitearrowdown.png";
        this.view.flxDashboard.zIndex = 6;
        if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {
          this.view.flxDashboard.bottom = "60dp";
          this.view.flxMenu.bottom = "0dp";
        }
        this.view.flxDummyHorizontalScroll.height = "250dp"
        this.view.flxGradient.height = "250dp";
        this.view.flxDashboardHeader.height = "250dp";
        this.view.flxBarSegment.setVisibility(false);
        this.view.flxSummarySegment.setVisibility(false);
        this.view.flxApprovalSeg.setVisibility(false);
        this.view.flxCashpos.setVisibility(false);
        this.view.flxSegGraph.setVisibility(false);
        this.view.flxDashboard.enableScrolling = true;
        this.view.flxDummyHorizontalScroll.setEnabled(true);
        this.view.flxChartSizeToggle.setEnabled(true);
        this.view.flxSelectAccount.setVisibility(true);
        this.view.flxDummyHorizontalScroll.enableScrolling = true;
      }
    },
    showPwdWarning: function() {
      this.showPwdWarningFlag = false;
      var configManager = applicationManager.getConfigurationManager();      
      var isAppPresent=configManager.isMicroAppPresent("AuthenticationMA");
      if(isAppPresent===true){
        var authMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AuthUIModule", "appName": "AuthenticationMA" });
        var passwordWarning = authMode.presentationController.getPasswordWarning();
        if (passwordWarning && passwordWarning.passwordExpiryWarningRequired == "true") {
          var msg = kony.i18n.getLocalizedString("kony.mb.login.passwordWillExpire") + passwordWarning.passwordExpiryRemainingDays + kony.i18n.getLocalizedString("i18n.accounts.days") + kony.i18n.getLocalizedString("kony.mb.login.changenow");
          this.bindGenericError(msg);
        }
      }
    },
    bindGenericError: function(msg) {
      applicationManager.getDataProcessorUtility().showToastMessageError(this, msg);
    },
    mapInternalAccounts: function() {
      var scope = this;
      var navManager = applicationManager.getNavigationManager();
      var configManager = applicationManager.getConfigurationManager(); 
      var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AccountsUIModule", "appName": "HomepageMA" });

      //  var isAppPresent1=configManager.isMicroAppPresent("HomepageMA");

      //  if(isAppPresent1===true&&isAppPresent2===true){
      this.view.flxSelectAccount.isVisible = true;
      //this.view.flxChartSizeToggle.skin = "sknFlxffffffmb";
      var custominfoInt = navManager.getCustomInfo("frmDashboard");
      var internalAccounts;
      if(custominfoInt!==undefined)
      {
        internalAccounts = this.clone(custominfoInt.accountData);
        internalAccounts = internalAccounts.filter(account => account.isPortFolioAccount === "false");
        // internalAccounts = internalAccounts.filter(function(account) {if(account.accountType !== "mortgageFacility") return account});
      }

      var personalAccnts = [];
      for (var x = 0; x < internalAccounts.length; x++) {
        if (internalAccounts[x].isBusinessAccount === "false" || internalAccounts[x].isBusinessAccount === 0) {
          personalAccnts.push(internalAccounts[x]);
        }
      }
      var processedAccountsData = accountMod.presentationController.processAccountsData(internalAccounts);
      processedAccountsData = this.getOrganisationAccountsMap(processedAccountsData);

      for (var key in processedAccountsData) {
        processedAccountsData[key].forEach(function(record, i) {
          record.flxDelete = {};
          record.imgDelete = {};
          record.lblDelete = {};
          record.type = "internal";
          var configManager = applicationManager.getConfigurationManager();      
          var isAppPresent=configManager.isMicroAppPresent("ConsentMgmtMA");
          if(isAppPresent===true){
            record.flxDelete.onClick = scope.alertCallBack;
          }
          else{
            record.flxDelete.isVisible=false;
          }
          record.flxDelete.skin = "slFSboxmb";
          record.imgDelete.src = "alert.png";
          record.lblDelete.text = "Alerts";
          record.lblDelete.skin = "sknLbl004B95SSPRegular20px";
          record.flximgBank = {
            "isVisible": false
          };
          if (processedAccountsData[key].length === i + 1) {
            record.flxSeparator = {
              "isVisible": false
            }
          } else {
            record.flxSeparator = {
              "isVisible": true
            }
          }
        })
      }

      this.view.segAccounts.widgetDataMap = {
        lblAccountName: "nickName",
        lblAccountNumber: "maskedAccountNumber",
        lblAccountBalValue: "availableBalance",
        lblBankName: "accountType",
        lblAccountId: "accountID",
        lblAccountBal: "accountBalanceType",
        imgEngageInsertIcon: "engageInsertIcon",
        lblEngageInsertCaption: "engageInsertCaption",
        lblEngageInsertText: "engageInsertText",
        flxAccountType: "flxAccountType",
        flxBankIcon: "flxBankIcon",
        btnEngageInsertChatNow: "engageInsertChatNow",
        type: "type",
        flxDelete: "flxDelete",
        imgDelete: "imgDelete",
        lblDelete: "lblDelete",
        "lblViewAll": "lblViewAll",
        "imgViewAll": "imgViewAll",
        "flxViewContainer": "flxViewContainer",
        lblTypeName: "lblTypeName",
        "imgAccountType": "imgAccountType",
        lblTypeValue: "lblTypeValue",
        lblAccountBalValue2: "currentBalanceForDual",
        lblAccountBal2: "lblAccountBal2",
        "flxSeparator": "flxSeparator",
        "imgBank": "imgBank",
        "flxStatus" : "flxStatus",
        "flximgBank": "flximgBank",

      };
      var isAppPresent2=configManager.isMicroAppPresent("CampaignMA");
      if(isAppPresent2===true){
        var campaignMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "CampaignUIModule", "appName": "CampaignMA" }); 
        if (campaignMod.presentationController.isLoggedIn === true) {
          processedAccountsData.push(campaignMod.presentationController.loanData);
        }
      }

      if (applicationManager.getConfigurationManager().isEngageEnabled()) {
        this.updateForEngageFeatureAnnouncement(processedAccountsData);
      }

      //this.view.segAccounts.setData(processedAccountsData);
      if (this.isFilterApplied) {
        processedAccountsData = this.accountsData[Object.keys(this.accountsData)[0]];
      }
      this.processedRetailAccounts = processedAccountsData;
      var configurationManager = applicationManager.getConfigurationManager();
      var configManager = applicationManager.getConfigurationManager();      
      //  var isAppPresent1=configManager.isMicroAppPresent("HomepageMA");
      //  var isAppPresent2=configManager.isMicroAppPresent("CampaignMA");
      // if(isAppPresent1===true&&isAppPresent2===true){

      if (this.setLimit === false) {
        this.view.segAccounts.setData(this.getSegmentRetailAccounts(processedAccountsData, processedAccountsData.length));
        this.setLimit = true;
      } else {
        this.view.segAccounts.setData(this.getSegmentRetailAccounts(processedAccountsData, 3));
      }
      // }


      this.removeBlueScreen(processedAccountsData);
    },
    setDummyData: function() {
      var xdata = [
        [{
          "lblTypeName": "Checking Accounts (3)",
          "lblTypeValue": "$127,912.00"
        },
         [{
           "accountName": "Business Advantage Savings",
           "availableBalance": "$510,852.74",
           "accountID": "200528075255840",
           "bankName": "Infinity",
           "accountBalanceType": "Available Balance",
           "accountType": "Savings",
           "nickName": "Business Savings",
           "flxDelete": {
             "skin": "slFSboxmb"
           },
           "imgDelete": {
             "src": "alert.png"
           },
           "lblDelete": {
             "text": "Alerts",
             "skin": "sknLbl004B95SSPRegular20px"
           },
           "type": "internal",
           "template": "flxAccountsNoImage"
         },
          {
            "accountName": "Business Advantage Savings",
            "availableBalance": "$510,852.74",
            "accountID": "200528075255840",
            "bankName": "Infinity",
            "accountBalanceType": "Available Balance",
            "accountType": "Savings",
            "nickName": "Business Savings",
            "flxDelete": {
              "skin": "slFSboxmb"
            },
            "imgDelete": {
              "src": "alert.png"
            },
            "lblDelete": {
              "text": "Alerts",
              "skin": "sknLbl004B95SSPRegular20px"
            },
            "type": "internal",
            "template": "flxAccountsNoImage"
          }, {
            "accountName": "Business Advantage Savings",
            "availableBalance": "$510,852.74",
            "accountID": "200528075255840",
            "bankName": "Infinity",
            "accountBalanceType": "Available Balance",
            "accountType": "Savings",
            "nickName": "Business Savings",
            "flxDelete": {
              "skin": "slFSboxmb"
            },
            "imgDelete": {
              "src": "alert.png"
            },
            "lblDelete": {
              "text": "Alerts",
              "skin": "sknLbl004B95SSPRegular20px"
            },
            "type": "internal",
            "template": "flxAccountsNoImage"
          }, {
            "lblViewAll": "View All",
            "template": "flxViewAll"
          }
         ]
        ],
        [{
          "lblTypeName": "Saving Accounts (3)",
          "lblTypeValue": "$83,912.00"
        },
         [{
           "accountName": "Business Advantage Savings",
           "availableBalance": "$510,852.74",
           "accountID": "200528075255840",
           "bankName": "Infinity",
           "accountBalanceType": "Available Balance",
           "accountType": "Savings",
           "nickName": "Business Savings",
           "flxDelete": {
             "skin": "slFSboxmb"
           },
           "imgDelete": {
             "src": "alert.png"
           },
           "lblDelete": {
             "text": "Alerts",
             "skin": "sknLbl004B95SSPRegular20px"
           },
           "type": "internal",
           "template": "flxAccountsNoImage"
         }, {
           "accountName": "Business Advantage Savings",
           "availableBalance": "$510,852.74",
           "accountID": "200528075255840",
           "bankName": "Infinity",
           "accountBalanceType": "Available Balance",
           "accountType": "Savings",
           "nickName": "Business Savings",
           "flxDelete": {
             "skin": "slFSboxmb"
           },
           "imgDelete": {
             "src": "alert.png"
           },
           "lblDelete": {
             "text": "Alerts",
             "skin": "sknLbl004B95SSPRegular20px"
           },
           "type": "internal",
           "template": "flxAccountsNoImage"
         }, {
           "accountName": "Business Advantage Savings",
           "availableBalance": "$510,852.74",
           "accountID": "200528075255840",
           "bankName": "Infinity",
           "accountBalanceType": "Available Balance",
           "accountType": "Savings",
           "nickName": "Business Savings",
           "flxDelete": {
             "skin": "slFSboxmb"
           },
           "imgDelete": {
             "src": "alert.png"
           },
           "lblDelete": {
             "text": "Alerts",
             "skin": "sknLbl004B95SSPRegular20px"
           },
           "type": "internal",
           "template": "flxAccountsNoImage"
         }, {
           "lblViewAll": "View All",
           "template": "flxViewAll"
         }]
        ]
      ];
      this.view.segAccounts.setData(xdata);

    },
    showFullAccountList: function(sectionNumber) {
      kony.print(sectionNumber);
    },
        searchBarConfig: function(accsLen) {
            var searchFlag = applicationManager.getConfigurationManager().getConfigurationValue('isSearchRequired');
            var searchConfigCount = applicationManager.getConfigurationManager().getConfigurationValue('searchCount');
            if (searchFlag !== true) {
                this.view.flxSearchAccounts.isVisible=false;
                return true;
            } else {
                if (searchConfigCount > accsLen){
                    this.view.flxSearchAccounts.isVisible=false;
                    return true;
                }
              else{
                this.view.flxSelectAccount.isVisible=true;
                this.view.flxSearchAccounts.isVisible=true;
              }
            }
          this.view.forceLayout();
            return false;
        },
        /**
        Method to enable or disable advanced filter and dropdown based on spotlight configuration.
        */
        filterConfig: function(accsLen) {
            var filterFlag = applicationManager.getConfigurationManager().getConfigurationValue('isFilterRequired');
            var filterConfigCount = applicationManager.getConfigurationManager().getConfigurationValue('filterCount');
            
                if(filterFlag !== true){
                    this.view.flxShowAllAccountTypes.isVisible=false;
                    this.view.lblSelectedAccountType.isVisible=false;
                    return true;                   
                }else{
                    if(filterConfigCount > accsLen){
                        this.view.flxShowAllAccountTypes.isVisible=false;
                        this.view.lblSelectedAccountType.isVisible=false;
                        return true;                         
                    }
                  else{
                    this.view.lblSelectedAccountType.isVisible=true;
                    this.view.flxShowAllAccountTypes.isVisible=true;
                    this.view.flxSelectAccount.isVisible=true;
                    
                    
                  }
                }
          this.view.forceLayout();
            
            return false;
        },
    alertCallBack: function(wdgt, context) {         
      var settingsModule = applicationManager.getModulesPresentationController({ "moduleName": "SettingsUIModule", "appName": "ManageProfileMA" });
      var rowid = context.rowIndex;
      var selectedAccountId = this.view.segAccounts.data[rowid]["accountID"];
      var params = {
        "AlertCategoryId": "ALERT_CAT_ACCOUNTS",
        "AccountId": selectedAccountId
      };
      var name = applicationManager.getPresentationUtility().formatText(this.view.segAccounts.data[rowid]["nickName"], 10, selectedAccountId, 4);
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("frmAlertsListHeader", name);
      settingsModule.setAlertsCategoryID("ALERT_CAT_ACCOUNTS");
      settingsModule.setAccountID(selectedAccountId);
      settingsModule.getAlertsBasedOnAccounts(params);

    },
    refreshCallBack: function() {
      var data = this.view.segAccounts.selectedItems[0];
      var bank = data.accountID.split("-")[0];          
      var externalAccountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "ExternalAccountsUIModule", "appName": "AccAggregationMA" });
      externalAccountMod.presentationController.refreshConsent(bank);

    },
    deleteCallBack: function() {
      var basicConfig = {
        "alertType": constants.ALERT_TYPE_CONFIRMATION,
        "message": "Are you sure you want to remove this account ?",
        "yesLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertYes"),
        "noLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertNo"),

        "alertHandler": this.deleteConnection
      };
      applicationManager.getPresentationUtility().showAlertMessage(basicConfig, {});

    },
    deleteConnection: function(response) {
      if (response === true) {
        var data = this.view.segAccounts.selectedItems[0];
        var bank = data.accountID.split("-")[0];               
        var externalAccountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "ExternalAccountsUIModule", "appName": "AccAggregationMA" });
        externalAccountMod.presentationController.deleteConnection(bank);

      }
    },
    updateForEngageFeatureAnnouncement: function(accountsData) {
      var engagePresentationController = applicationManager.getModulesPresentationController("EngageModule");
      var config = engagePresentationController.getFeatureAnnouncementConfiguration();
      var advertEnabled = null,
          insertEnabled = false,
          insertLocation = null;
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
          var userName = applicationManager.getUserPreferencesManager().getUserName();
          for (var key in accountsData) {
            if (userName === key.toLowerCase()) {
              accountsData[key].splice(i, 0, dataObj)
            }
          }
        }
      }
      if (!kony.sdk.isNullOrUndefined(advertEnabled)) {
        if (advertEnabled === true) {
          this.view.flxSuggestedOffers.isVisible = true;
          this.view.flxEngageAdvert.isVisible = true;
          this.view.btnEngageAdvertChatNow.onClick = this.invokeEngage.bind(this);
        } else {
          this.view.flxSuggestedOffers.isVisible = false;
          this.view.flxEngageAdvert.isVisible = false;
          this.view.btnEngageAdvertChatNow.onClick = null;
        }
      }
    },
    invokeEngage: function() {

      applicationManager.getModulesPresentationController("EngageModule").invokeEngage();
    },
    displayBarChart: function() {
      var navManager = applicationManager.getNavigationManager();

      var pfmData  =navManager.getCustomInfo("frmPFMMyMoney");
      if(pfmData && pfmData.bar){
        var barData = pfmData.bar;
      
      var choosedYear = this.view.lblMonthAndYearCashBarSeg.text;
      choosedYear = parseInt(choosedYear);
      //var balanceBars = this.view.allBalanceBars.widgets();
      var p = 0;
      var date = new Date();
      var currMonth = date.getMonth() + 1;
      var currYear = date.getFullYear();
      this.limitMonth = currMonth;
      //         for (p = 0; p < barData.length; p++) {
      //           if(p >= this.limitMonth)
      //           {
      //             barData[p].totalCashFlow = 0;
      //           }
      //         }
      if(!kony.sdk.isNullOrUndefined(barData)){
        var maxAmount = barData.reduce(function(previous, record) {
          if (previous > parseInt(record.totalCashFlow)) {
            return previous;
          }
          return parseInt(record.totalCashFlow);
        }, 0).toFixed(2);

        var barGraphLabels = [];
        var barGraphData = [];
        var barSegData = [];
        var formatUtility = applicationManager.getFormatUtilManager();
        for (p = 0; p < barData.length; p++) {
          if (choosedYear === currYear) {
            if (p < this.limitMonth) {
              barSegData.push({
                "monthName": kony.i18n.getLocalizedString("kony.mb.Months." + barData[p].monthName),
                "totalCashFlow": formatUtility.formatAmountandAppendCurrencySymbol(barData[p].totalCashFlow)
              });
              barGraphLabels.push(kony.i18n.getLocalizedString("kony.mb.Months." + barData[p].monthName));
              barGraphData.push(barData[p].totalCashFlow);
            }
          } else {
            barSegData.push({
              "monthName": kony.i18n.getLocalizedString("kony.mb.Months." + barData[p].monthName),
              "totalCashFlow": formatUtility.formatAmountandAppendCurrencySymbol(barData[p].totalCashFlow)
            });
            barGraphLabels.push(kony.i18n.getLocalizedString("kony.mb.Months." + barData[p].monthName));
            barGraphData.push(barData[p].totalCashFlow);
          }

        }
      }
      var formatUtility = applicationManager.getFormatUtilManager();
      var currencySymbol = formatUtility.getCurrencySymbol();
      var x = this.view.browserBarChart.evaluateJavaScript("AddBarChart(" + JSON.stringify(barGraphLabels) + "," + JSON.stringify(barGraphData) + ",'" + currencySymbol + "')");
      this.view.segBar.widgetDataMap = {
        "lblAmountSpent": "monthName",
        "lblPaymentMode": "totalCashFlow",
      };
      this.view.segBar.setData(barSegData);
      this.view.forceLayout();
    }},
    displayDonutChart: function() {
      applicationManager.getPresentationUtility().showLoadingScreen();
      var navManager = applicationManager.getNavigationManager();
      //  var pieData = navManager.getCustomInfo("frmDashboardPFMPie");
      var pfmData  =navManager.getCustomInfo("frmPFMMyMoney");
      var pieData = pfmData.pie;
      var chartData_Labels = [];
      var chartData_values = [];
      var segSpendingData = [];

      var formatUtility = applicationManager.getFormatUtilManager();
      if(!kony.sdk.isNullOrUndefined(pieData.reduce)){
        var totalAmount = pieData.reduce(function(previous, record) {
          return previous + Number(record.cashSpent);
        }, 0).toFixed(2);


        pieData.forEach(function(record) {
          var percentageValue = Math.round((record.cashSpent * 100) / totalAmount) + "";
          chartData_Labels.push(kony.i18n.getLocalizedString("kony.mb.PFM." + record.categoryName) + ", " + percentageValue + "%");
          chartData_values.push(percentageValue);
          percentageValue += "%";
          segSpendingData.push({
            "categoryName": kony.i18n.getLocalizedString("kony.mb.PFM." + record.categoryName) + " - " + percentageValue,
            "cashSpent": formatUtility.formatAmountandAppendCurrencySymbol(record.cashSpent)
          });
        });
      }
      this.view.segGraph.widgetDataMap = {
        "lblAmountSpent": "categoryName",
        "lblPaymentMode": "cashSpent",
      };
      if(segSpendingData.length!==0&&segSpendingData.length!==undefined){
        this.isGraphAvailable = true;
        this.view.flxGraph.isVisible=true;
        this.view.flxPageIndicator3.isVisible=true;
        this.view.segGraph.setData(segSpendingData);
        var x = this.view.browserChart.evaluateJavaScript("AddDonutChart(" + JSON.stringify(chartData_Labels) + "," + JSON.stringify(chartData_values) + ");");
        this.view.lblTotalSpendingValue.text = formatUtility.formatAmountandAppendCurrencySymbol(totalAmount);
        //   this.view.lblMonthAndYearSummary.text = kony.i18n.getLocalizedString("kony.mb.Months."+this.MONTH_NAMES[this.currentMonth - 1]);
        //         this.view.lblMonthAndYear.text = kony.i18n.getLocalizedString("kony.mb.Months."+this.MONTH_NAMES[this.currentMonth - 1]);
        //Sibhi start
      }
      else{
        this.isGraphAvailable = false;
        this.view.flxGraph.isVisible=false;
      }
      if (this.combinedFlowName === this.flowConstants.combinedBanking) {
        this.view.lblTotalSpendingValue.isVisible = true;
        this.view.lblTotalSpending.isVisible = true;
      } else if (this.combinedFlowName === this.flowConstants.businessBanking) {

      } else {

      }

      //Sibhi end
      if (!x) {
        //Error in creating PFM Charts
      }
      this.view.forceLayout();
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    displayMultiLineBarChart: function() {
      var navManager = applicationManager.getNavigationManager();
      var cashPositionGraphData = navManager.getCustomInfo("frmDashboardPFMCashPosition");
      var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      var prevFourMonth = [];
      var date = new Date();
      var fullyear = date.getFullYear();
      var isYearEdgeCase = false;
      fullyear = fullyear.toString().slice(2);
      //var i = 4; i >0; i--
      for (var i = 4; i >= 0; i--) {
        var ctr = (new Date()).getMonth() - i;
        if (ctr < 0) {
          isYearEdgeCase = true;
          ctr = 12 + ctr;
        }
        var month = months[ctr];
        prevFourMonth.push(month);
      }
      var lastFourMonthData = [];
      if (!kony.sdk.isNullOrUndefined(cashPositionGraphData) && Array.isArray(cashPositionGraphData)) {
        for (var i = 0; i < prevFourMonth.length; i++) {
          for (var j = 0; j < cashPositionGraphData.length; j++) {
            if (prevFourMonth[i].toLowerCase() == cashPositionGraphData[j].span.toLowerCase()) {
              lastFourMonthData.push(cashPositionGraphData[j]);
              break;
            }
          }
        }
      }
      for (var i = 0; i < prevFourMonth.length; i++) {
        if (isYearEdgeCase) {
          var indexOfLength = months.indexOf(prevFourMonth[prevFourMonth.length - 1]);
          var indexOfi = months.indexOf(prevFourMonth[i]);
          if (indexOfi > indexOfLength)
            prevFourMonth[i] = prevFourMonth[i] + ", " + (fullyear - 1);
          else
            prevFourMonth[i] = prevFourMonth[i] + ", " + fullyear;
        } else {
          prevFourMonth[i] = prevFourMonth[i] + ", " + fullyear;
        }
      }
      var creditData = [];
      var debitData = [];
      var availableData = [];
      if (lastFourMonthData.length > 0) {
        for (var i = 0; i < lastFourMonthData.length; i++) {
          var creditValue = 0;
          var debitValue = 0;
          var availableValue = 0;
          if (!kony.sdk.isNullOrUndefined(lastFourMonthData[i]) && !kony.sdk.isNullOrUndefined(lastFourMonthData[i].credit)) {
            creditValue = parseFloat(lastFourMonthData[i].credit).toFixed(2);
          }
          if (!kony.sdk.isNullOrUndefined(lastFourMonthData[i]) && !kony.sdk.isNullOrUndefined(lastFourMonthData[i].debit)) {
            debitValue = parseFloat(lastFourMonthData[i].debit).toFixed(2);
          }
          if (!kony.sdk.isNullOrUndefined(lastFourMonthData[i]) && !kony.sdk.isNullOrUndefined(lastFourMonthData[i].total_balance)) {
            availableValue = parseFloat(lastFourMonthData[i].total_balance).toFixed(2);
          }
          creditData.push(creditValue);
          debitData.push(debitValue);
          availableData.push(availableValue);
        }
      } else {
        for (var i = 0; i < 4; i++) {
          var creditValue = 0;
          var debitValue = 0;
          var availableValue = 0;
          creditData.push(creditValue);
          debitData.push(debitValue);
          availableData.push(availableValue);
        }
      }

      var cashPositionData = [];
      cashPositionData.push(creditData);
      cashPositionData.push(debitData);
      cashPositionData.push(availableData);
      var formatUtility = applicationManager.getFormatUtilManager();
      var currencySymbol = formatUtility.getCurrencySymbol();
      this.browserMultiLineData = "addMultiLineBarChart(" + JSON.stringify(prevFourMonth) + "," + JSON.stringify(cashPositionData) + ",'" + currencySymbol;
      var x = this.view.browserMultiLine.evaluateJavaScript(this.browserMultiLineData + "')");
    },

    prevMonthClick: function() {
      if (this.currentMonthSummary === 0) {
        return;
      }
      this.view.flxNextMonthGraph.setVisibility(true);
      this.prevMonth = parseInt(this.currentMonthSummary) - 1;
      this.currentMonthSummary = this.prevMonth;
      //this.nextMonth = -1;
      this.goToMonth(this.prevMonth);

    },
    nextMonthClick: function() {
      if (this.currentMonthSummary >= this.monthLimit) {
        return;
      }
      this.view.flxPrevMonthGraph.setVisibility(true);
      //this.prevMonth = -1;
      this.nextMonth = parseInt(this.currentMonthSummary) + 1;
      this.currentMonthSummary = this.nextMonth;
      this.goToMonth(this.nextMonth);
    },
    prevMonthClickCashPos: function() {
      if (this.currentMonthCashPos === 0) {
        return;
      }
      this.view.flxNextMonthCashPos.setVisibility(true);
      this.prevMonth = parseInt(this.currentMonthCashPos) - 1;
      this.currentMonthCashPos = this.prevMonth;
      var date = new Date();
      var presentYear = date.getFullYear();
      if (this.currentMonthCashPos === 0) {
        this.view.flxPrevMontCashPos.setVisibility(false);
      }
      if (this.currentMonthCashPos >= this.monthLimit) {
        this.view.flxNextMonthCashPos.setVisibility(false);
      }
      this.view.lblMonthAndYearCashPos.text = this.MONTH_NAMES[this.currentMonthCashPos] + " - " + presentYear;
    },
    nextMonthClickCashPos: function() {
      if (this.currentMonthCashPos >= this.monthLimit) {
        return;
      }
      this.view.flxPrevMontCashPos.setVisibility(true);
      this.nextMonth = parseInt(this.currentMonthCashPos) + 1;
      this.currentMonthCashPos = this.nextMonth;
      var date = new Date();
      var presentYear = date.getFullYear();
      if (this.currentMonthCashPos === 0) {
        this.view.flxPrevMontCashPos.setVisibility(false);
      }
      if (this.currentMonthCashPos >= this.monthLimit) {
        this.view.flxNextMonthCashPos.setVisibility(false);
      }
      this.view.lblMonthAndYearCashPos.text = this.MONTH_NAMES[this.currentMonthCashPos] + " - " + presentYear;
      //this.fetchCashPositionDet(this.nextMonth,"All");
    },


    prevMonthClickBarData: function() {
      this.view.flxNextMonthBarSeg.setVisibility(true);
      this.prevMonth = parseInt(this.currentMonthBar) - 1;
      this.currentMonthBar = this.prevMonth;
      this.view.lblMonthAndYearCashBarSeg.text = "" + this.currentMonthBar;
      this.goToBarMonth(this.prevMonth);
    },
    nextMonthClickBarData: function() {
      var date = new Date();
      var currYear = date.getFullYear();
      if (this.currentMonthBar === currYear - 1) {
        this.view.flxNextMonthBarSeg.setVisibility(false);
      }
      this.view.flxPrevMontBarSeg.setVisibility(true);
      this.nextMonth = parseInt(this.currentMonthBar) + 1;
      this.currentMonthBar = this.nextMonth;
      this.view.lblMonthAndYearCashBarSeg.text = "" + this.currentMonthBar;
      this.goToBarMonth(this.nextMonth);
    },
    errorCallback: function(response) {
      var date = new Date();
      var presentYear = date.getFullYear();
      if (this.prevMonth === -1) {
        this.currentMonthCashPos++;
      } else if (this.nextMonth === -1) {
        this.currentMonthCashPos--;
      }
      if (this.currentMonthCashPos === 0) {
        this.view.flxPrevMontCashPos.setVisibility(false);
      }

      if (this.currentMonthCashPos >= this.monthLimit) {
        this.view.flxNextMonthCashPos.setVisibility(false);
      }
      this.view.lblMonthAndYearCashPos.text = this.MONTH_NAMES[this.currentMonthCashPos] + " - " + presentYear;
      this.view.segCashpos.setData([]);
    },

    monthFetchSuccessBar: function(response) {
      var barSegData = [];

      if (response.length > 0) {
        var navManager = applicationManager.getNavigationManager();
        var barData = navManager.setCustomInfo("frmDashboardPFMBar", response);
        var configManager=applicationManager.getConfigurationManager();
        var isAppPresent1=configManager.isMicroAppPresent("FinanceManagementMA");
        if(isAppPresent1===true){

          //this.displayBarChart();  //osama to dis chart
        }
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      } else {
        var chartData_Labels = [];
        var chartData_values = [];
        this.view.browserChart.evaluateJavaScript("AddBarChart(" + JSON.stringify(chartData_Labels) + "," + JSON.stringify(chartData_values) + ");");
        this.view.segBar.setData([]);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }

      var barGraphLabels = [];
      var barGraphData = [];
      var barSegData = [];
      var formatUtility = applicationManager.getFormatUtilManager();
      for (p = 0; p < response.length; p++) {
        if (choosedYear === currYear) {
          if (p < this.limitMonth) {
            barSegData.push({
              "monthName": kony.i18n.getLocalizedString("kony.mb.Months." + response[p].monthName),
              "totalCashFlow": formatUtility.formatAmountandAppendCurrencySymbol(response[p].totalCashFlow)
            });
            barGraphLabels.push(kony.i18n.getLocalizedString("kony.mb.Months." + response[p].monthName));
            barGraphData.push(response[p].totalCashFlow);
          }
        } else {
          barSegData.push({
            "monthName": kony.i18n.getLocalizedString("kony.mb.Months." + response[p].monthName),
            "totalCashFlow": formatUtility.formatAmountandAppendCurrencySymbol(response[p].totalCashFlow)
          });
          barGraphLabels.push(kony.i18n.getLocalizedString("kony.mb.Months." + response[p].monthName));
          barGraphData.push(response[p].totalCashFlow);
        }
      }
      this.view.segBar.setData(barSegData);
      this.view.forceLayout();
    },

    goToBarMonth: function(year) {
      try {
        applicationManager.getPresentationUtility().showLoadingScreen();               
        var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "PersonalFinanceManagementUIModule", "appName": "FinanceManagementMA" });
        accountMod.presentationController.barGraphPFM(year);

      } catch (er) {

      }
    },

    goToMonth: function(monthId) {
      var date = new Date();
      var presentYear = date.getFullYear();
      applicationManager.getPresentationUtility().showLoadingScreen();      
      var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "PersonalFinanceManagementUIModule", "appName": "FinanceManagementMA" });
      accountMod.presentationController.fetchMonthPFMData(monthId, presentYear, this.monthFetchSuccess, this.monthFetchFailure);

    },

    monthFetchSuccess: function(response) {
      var navManager = applicationManager.getNavigationManager();
      var date = new Date();
      var presentYear = date.getFullYear();
      if (this.prevMonth === -1) {
        this.currentMonthSummary++;
      } else if (this.nextMonth === -1) {
        this.currentMonthSummary--;
      }
      if (this.currentMonthSummary === 0) {
        this.view.flxPrevMonthGraph.setVisibility(false);
      }

      if (this.currentMonthSummary >= this.monthLimit) {
        this.view.flxNextMonthGraph.setVisibility(false);
      }
      this.view.lblMonthAndYearGraph.text = this.MONTH_NAMES[this.currentMonthSummary] + " - " + presentYear;

      if (response.length > 0) {
        navManager.setCustomInfo("frmDashboardPFMPie", response);
       // this.displayDonutChart();//osama to dis chart
      } else {
        var chartData_Labels = [];
        var chartData_values = [];
        this.view.browserChart.evaluateJavaScript("AddDonutChart(" + JSON.stringify(chartData_Labels) + "," + JSON.stringify(chartData_values) + ");");
        this.view.segGraph.setData([]);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
    },

    monthFetchFailure: function(response) {
      kony.ui.Alert("Something went wrong");
    },

    sortAccountsBasedOnType: function(accounts) {
      accounts.sort(function(account1, account2) {
        return account1.accountType.localeCompare(account2.accountType);
      });
    },

    processViewFormattedData: function(data) {
      var processedData = {}
      for (var i = 0; i < data.length; i++) {
        if (!processedData.hasOwnProperty(data[i].accountType)) {
          processedData[data[i].accountType] = [];
        }
        if (processedData.hasOwnProperty(data[i].accountType)) {
          processedData[data[i].accountType].push(data[i]);
        }
      }
      return processedData;
    },

    getOrganisationAccountsMap: function(accounts) {
      try {
        var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
        if (isSingleCustomerProfile === true || isSingleCustomerProfile === "true") {
          var viewBindData = this.processViewFormattedData(accounts);
          //var processedAccounts=moneyMovementModule.orderByPriority(viewBindData);
          return viewBindData;
        } else {
          var primaryCustomerId = applicationManager.getUserPreferencesManager().primaryCustomerId;
          var businessAccounts = this.getDistinctBusinessAccount(accounts);
          var orgAccounts = {};
          if (!kony.sdk.isNullOrUndefined(primaryCustomerId)) {
            if (primaryCustomerId.type === 'personal') {
              orgAccounts = {
                "Personal Accounts": [],
                "Business Accounts": []
              };
              orgAccounts["Personal Accounts"] = [];
              for (var i = 0; i < businessAccounts.length; i++) {
                orgAccounts[businessAccounts[i]] = [];
              }
              accounts.forEach(function(account) {
                if (account.Membership_id === primaryCustomerId.id && account.isBusinessAccount === "false") {
                  orgAccounts["Personal Accounts"].push(account);
                } else {
                  if (account.isBusinessAccount === "true") {
                    if (!kony.sdk.isNullOrUndefined(account.MembershipName) && account.MembershipName !== "") {
                      if (kony.sdk.isNullOrUndefined(orgAccounts[account.MembershipName])) {
                        orgAccounts[account.MembershipName] = Array(account);
                      } else {
                        orgAccounts[account.MembershipName].push(account);
                      }
                    }
                  } else {
                    if (primaryCustomerId.id !== account.Membership_id) {
                      if (kony.sdk.isNullOrUndefined(orgAccounts[account.MembershipName])) {
                        orgAccounts[account.MembershipName] = Array(account);
                      } else {
                        orgAccounts[account.MembershipName].push(account);
                      }
                    }
                  }
                }
              });
            } else {
              orgAccounts["Personal Accounts"] = [];
              for (var i = 0; i < businessAccounts.length; i++) {
                orgAccounts[businessAccounts[i]] = [];
              }
              accounts.forEach(function(account) {
                if (account.isBusinessAccount === "true") {
                  if (!kony.sdk.isNullOrUndefined(account.MembershipName) && account.MembershipName !== "") {
                    if (kony.sdk.isNullOrUndefined(orgAccounts[account.MembershipName])) {
                      orgAccounts[account.MembershipName] = Array(account);
                    } else {
                      orgAccounts[account.MembershipName].push(account);
                    }
                  }
                } else {
                  if (primaryCustomerId.id !== account.Membership_id) {
                    if (kony.sdk.isNullOrUndefined(orgAccounts[account.MembershipName])) {
                      orgAccounts[account.MembershipName] = Array(account);
                    } else {
                      orgAccounts[account.MembershipName].push(account);
                    }
                  }
                }
              });
            }
          } else {
            orgAccounts["Personal Accounts"] = [];
            for (var i = 0; i < businessAccounts.length; i++) {
              orgAccounts[businessAccounts[i]] = [];
            }
            accounts.forEach(function(account) {
              if (account.isBusinessAccount === "true") {
                if (!kony.sdk.isNullOrUndefined(account.MembershipName) && account.MembershipName !== "") {
                  if (kony.sdk.isNullOrUndefined(orgAccounts[account.MembershipName])) {
                    orgAccounts[account.MembershipName] = Array(account);
                  } else {
                    orgAccounts[account.MembershipName].push(account);
                  }
                }
              }
            });
          }
          if (!kony.sdk.isNullOrUndefined(orgAccounts["Personal Accounts"])) {
            if (orgAccounts["Personal Accounts"].length === 0) {
              delete orgAccounts["Personal Accounts"];
            }
          }
          if (!kony.sdk.isNullOrUndefined(orgAccounts["Business Accounts"])) {
            if (orgAccounts["Business Accounts"].length === 0) {
              delete orgAccounts["Business Accounts"];
            }
          }
          return orgAccounts;
        }
      } catch (error) {



      }
      //       var businessAccounts = this.getDistinctBusinessAccount(accounts);
      //       var orgAccounts = {};
      //       var self = this;
      //       var configurationManager = applicationManager.getConfigurationManager();
      //       if(businessAccounts.length==0){
      //         //Sibhi Start

      //         if(this.combinedFlowName === self.flowConstants.combinedBanking){
      //           orgAccounts = {
      //             "Personal Accounts" : [],
      //             "Business Accounts" : []
      //           };
      //           accounts.forEach(function(account){
      //             if(account.isBusinessAccount === "true")
      //               orgAccounts["Business Accounts"].push(account);
      //             else
      //               orgAccounts["Personal Accounts"].push(account);
      //           });
      //         }
      //         else if(self.combinedFlowName === self.flowConstants.businessBanking){
      //           orgAccounts = {
      //             "Business Accounts" : []
      //           };
      //           accounts.forEach(function(account){
      //             if(account.isBusinessAccount === "true")
      //               orgAccounts["Business Accounts"].push(account);
      //           });
      //         }
      //         else{

      //         }
      //         //Sibhi End
      //       }
      //       else{
      //         if(self.combinedFlowName === self.flowConstants.combinedBanking){
      //           orgAccounts["Personal Accounts"] = [];
      //         }
      //         for(var i=0; i<businessAccounts.length; i++){
      //           orgAccounts[businessAccounts[i]] = [];
      //         }
      //         accounts.forEach(function(account){
      //           if(account.isBusinessAccount === "true"){
      //             if(!kony.sdk.isNullOrUndefined(account.MembershipName) && account.MembershipName !== ""){
      //               orgAccounts[account.MembershipName].push(account);
      //             }
      //           }
      //           else{
      //             if( self.combinedFlowName === self.flowConstants.combinedBanking){
      //               orgAccounts["Personal Accounts"].push(account);
      //             }
      //           }
      //         });
      //       }

      //       return orgAccounts;
    },
    getDistinctBusinessAccount: function(accounts) {
      var businessAccounts = [];
      for (var i = 0; i < accounts.length; i++) {
        if (accounts[i].isBusinessAccount === "true") {
          if (!kony.sdk.isNullOrUndefined(accounts[i].MembershipName) && accounts[i].MembershipName !== "") {
            if (businessAccounts.indexOf(accounts[i].MembershipName) === -1) {
              businessAccounts.push(accounts[i].MembershipName);
            }
          }
        }
      }
      businessAccounts.sort();

      return businessAccounts;
    },

    addEntriesInAccountTypeFilterData: function(accountData) {
      var scope = this;
      this.accountTypeFilterData = {};
      var keys = [];
      accountData.forEach(function(account) {
        if (keys.includes(account.accountType)) {
          scope.accountTypeFilterData[account.accountType].push(account);
        } else {
          scope.accountTypeFilterData[account.accountType] = [account];
          keys.push(account.accountType);
        }
      });
    },

    processAccountsDataForSegment: function(accounts) {
      var configurationManager = applicationManager.getConfigurationManager();
      var configManager = applicationManager.getConfigurationManager();      
      //  var isAppPresent=configManager.isMicroAppPresent("HomepageMA");
      // if(isAppPresent===true){
      var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AccountsUIModule", "appName": "HomepageMA" });
      var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
      var profileAccess = applicationManager.getUserPreferencesManager().profileAccess;
      var forUtility = applicationManager.getFormatUtilManager();
      var self = this;
      var balanceType = "";
      var balanceTypeVisiblity = false;
      var dualBalanceConfig = {
        "isAvailableBalanceToBeDisplayed": true,
        "isCurrentBalanceToBeDisplayed": false
      };
      var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
      if (!isSingleCustomerProfile) {
        if (profileAccess !== "both") {
          if (!kony.sdk.isNullOrUndefined(dualBalanceConfig.isAvailableBalanceToBeDisplayed) &&
              !kony.sdk.isNullOrUndefined(dualBalanceConfig.isCurrentBalanceToBeDisplayed)) {
            if (dualBalanceConfig.isAvailableBalanceToBeDisplayed === true &&
                dualBalanceConfig.isCurrentBalanceToBeDisplayed === true) {
              this.view.segAccounts.rowTemplate = "flxAccountsNoImageEuro";
            } else if (dualBalanceConfig.isAvailableBalanceToBeDisplayed === false &&
                       dualBalanceConfig.isCurrentBalanceToBeDisplayed === true) {
              this.view.segAccounts.rowTemplate = "flxAccountsNoImageCur";
            } else {
              this.view.segAccounts.rowTemplate = "flxAccountsNoImage";
            }
          } else {
            this.view.segAccounts.rowTemplate = "flxAccountsNoImage";
          }
        } else {
          if (!kony.sdk.isNullOrUndefined(dualBalanceConfig.isAvailableBalanceToBeDisplayed) &&
              !kony.sdk.isNullOrUndefined(dualBalanceConfig.isCurrentBalanceToBeDisplayed)) {
            if (dualBalanceConfig.isAvailableBalanceToBeDisplayed === true &&
                dualBalanceConfig.isCurrentBalanceToBeDisplayed === true) {
              this.view.segAccounts.rowTemplate = "flxCombinedAccountsEuro";
            } else if (dualBalanceConfig.isAvailableBalanceToBeDisplayed === false &&
                       dualBalanceConfig.isCurrentBalanceToBeDisplayed === true) {
              this.view.segAccounts.rowTemplate = "flxCombinedAccountsCur";
            } else {
              this.view.segAccounts.rowTemplate = "flxCombinedAccounts";
            }
          } else {
            this.view.segAccounts.rowTemplate = "flxCombinedAccounts";
          }

        }

      } else {
        if (!kony.sdk.isNullOrUndefined(dualBalanceConfig.isAvailableBalanceToBeDisplayed) &&
            !kony.sdk.isNullOrUndefined(dualBalanceConfig.isCurrentBalanceToBeDisplayed)) {
          if (dualBalanceConfig.isAvailableBalanceToBeDisplayed === true &&
              dualBalanceConfig.isCurrentBalanceToBeDisplayed === true) {
            this.view.segAccounts.rowTemplate = "flxAccountsNoImageEuro";
          } else if (dualBalanceConfig.isAvailableBalanceToBeDisplayed === false &&
                     dualBalanceConfig.isCurrentBalanceToBeDisplayed === true) {
            this.view.segAccounts.rowTemplate = "flxAccountsNoImageCur";
          } else {
            this.view.segAccounts.rowTemplate = "flxAccountsNoImage";
          }
        } else {
          this.view.segAccounts.rowTemplate = "flxAccountsNoImage";
        }
      }
      var imgIcon = "";
      for (var key in accounts) {
        accounts[key].forEach(function(account, i) {
          var isBusinesspayee = account.isBusinessAccount;
          if (!isSingleCustomerProfile) {
            imgIcon = isBusinesspayee === "false" ? "personalaccount.png" : "businessaccount.png"
            account.imgAccountType = {
              "src": imgIcon,
              "isVisible": true
            };
            account.flxAccountType = {
              "isVisible": true
            };
          } else {
            imgIcon = "";
            account.imgAccountType = {
              "isVisible": false
            };
            account.flxAccountType = {
              "isVisible": false
            };
          }
          //           var imgIcon = "businessaccount.png";
          //           if( self.combinedFlowName === self.flowConstants.combinedBanking){
          //             if(key === "Personal Accounts"){
          //               imgIcon = "personalaccount.png" ;
          //             }
          //           }
          //           else if(self.combinedFlowName === self.flowConstants.businessBanking){
          //              imgIcon = "businessaccount.png";

          //           }
          //           else{
          //            // imgIcon = "personalaccount.png" ;
          //           }    
          //           if((configurationManager.isSMEUser === "true") || (self.combinedFlowName === "businessBanking")){
          //             account.imgAccountType = {
          //             "isVisible" : false
          //           };
          //             account.flxAccountType = {
          //              "isVisible" : false
          //             };

          //           }else if(configurationManager.isCombinedUser === "true"){
          //             account.imgAccountType = {
          //             "src" : imgIcon,
          //             "isVisible" : true
          //           };
          //             account.flxAccountType = {
          //              "isVisible" : true
          //             };
          //           }

          account.imgBank = {
            "src": (account.logoURL) ? "genericexternalbank.png" : "genericexternalbank.png",
            "isVisible": (account.logoURL) ? true : false
          };
          if (account.externalIndicator == "true") {
            var dateFormat = applicationManager.getFormatUtilManager().getDateFormat();
            var targetDate = CommonUtilities.getDateAndTime(account.expiresAt);
            var expireDate = (targetDate.split(","))[0];
            var today = kony.os.date(dateFormat);
            var todayDateObj = applicationManager.getFormatUtilManager().getDateObjectFromCalendarString(today, (applicationManager.getFormatUtilManager().getDateFormat()).toUpperCase());
            var targetDateObj = applicationManager.getFormatUtilManager().getDateObjectFromCalendarString(expireDate, (applicationManager.getFormatUtilManager().getDateFormat()).toUpperCase());
            var difference = targetDateObj - todayDateObj;
            var count = Math.ceil(difference / (1000 * 60 * 60 * 24));
            account.Count = count;
            account.AlertDays = account.connectionAlertDays;
          }
          if (account.externalIndicator !== undefined && account.externalIndicator === "true") {
            if (account.Count <= 0) {
              account.imgWarn = {
                src: "alert_2.png",
                isVisible: true
              };
            } else if (account.Count <= Number(account.AlertDays)) {
              account.imgWarn = {
                src: "infoappbar.png",
                isVisible: true
              };
            } else {
              account.imgWarn = {
                src: "",
                isVisible: false
              };
            }
          } else {
            account.imgWarn = {
              src: "",
              isVisible: false
            };
          }


          account.flximgBank = {
            "isVisible": (account.logoURL) ? true : false
          };
          account.availableBalanceValue = {
            "text": accountMod.presentationController.getAvailableBalanceCurrencyString(account),
            //"text" : applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(account.availableBalance, account.currencyCode)
          };
          account.lblAccountBal = {
            "text": accountMod.presentationController.getAvailableBalanceType(account),
            "skin": (account.availableBalance < 0 && (configurationManager.constants.CHECKING === account.accountType || configurationManager.constants.SAVINGS === account.accountType))
                      ? "sknLblc64d0eSSP14Px" : "sknSSP72727213Px"
          };
          account.currentBalanceForDual = account.currentBalance;
          if (configurationManager.constants.SAVINGS === account.accountType) {
            balanceType = kony.i18n.getLocalizedString("kony.mb.accdetails.currBal");
            balanceTypeVisiblity = true;

            account.currentBalanceForDual = {
              "text": forUtility.formatAmountandAppendCurrencySymbol(account.currentBalanceForDual, account.currencyCode),
              "isVisible": true
            }
          } else if (configurationManager.constants.CHECKING === account.accountType) {
            balanceType = kony.i18n.getLocalizedString("kony.mb.accdetails.currBal");
            balanceTypeVisiblity = true;
            account.currentBalanceForDual = {
              "text": forUtility.formatAmountandAppendCurrencySymbol(account.currentBalanceForDual, account.currencyCode),
              "isVisible": true
            }
          } else {
            balanceType = "";
            balanceTypeVisiblity = false;
            account.currentBalanceForDual = {
              "text": forUtility.formatAmountandAppendCurrencySymbol(account.currentBalanceForDual, account.currencyCode),
              "isVisible": false
            }
          }
          account.lblAccountBal2 = {
            "text": balanceType,
            "isVisible": balanceTypeVisiblity
          };
          account.flxSeparator = {
            "isVisible": true
          };

          account.maskedNickName = {
            "text": kony.sdk.isNullOrUndefined(account.nickName) ? " " : (account.nickName).substr(0, 25).trim() 
          }
          if (accounts[key].length === i + 1) {
            account.flxSeparator = {
              "isVisible": false
            }
          }
          account.maskedAccountNumber = {
            "text":   (account.accountID).substr((account.accountID).length - 4) + "..."
          };
          account.flxStatus = {
            "isVisible" : !kony.sdk.isNullOrUndefined(account.accountStatus)? (account.accountStatus.toUpperCase() == "CLOSED" ? true : false): false
          };

          if (dualBalanceConfig.isCurrentBalanceToBeDisplayed === true && dualBalanceConfig.isAvailableBalanceToBeDisplayed === false) {
            if (configurationManager.constants.SAVINGS === account.accountType || configurationManager.constants.CHECKING === account.accountType) {
              account.currentBalanceForDual.isVisible = true;
              account.lblAccountBal2.isVisible = true;
            } else {
              account.lblAccountBal.isVisible = true;
              account.availableBalanceValue.isVisible = true;
            }
          }
        });
      }
      this.filteredAccountsData = this.clone(accounts);
      //  }
    },

    getAllAccountsWithoutOrgName: function(accountData) {
      var resultData = [];
      try {
        for (key in accountData) {
          var tempArr = accountData[key];
          resultData = resultData.concat(tempArr);
        }
      } catch (e) {
        resultData = [];
        return resultData;
      }
      return resultData;
    },

    getSegmentDataForAccounts: function(accounts, limit) {
      var segData = [];
      var showTotBalance = true;
      var currencyCode = "";
      var accType = "";
      this.processAccountsDataForSegment(accounts);
      var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
      var templateName = "";
      var self = this;
      //Sibhi Start
      var configurationManager = applicationManager.getConfigurationManager();
      if (self.combinedFlowName === self.flowConstants.combinedBanking) {
        templateName = "flxClearViewAll";
      } else if (self.combinedFlowName === self.flowConstants.businessBanking) {
        templateName = "flxViewAll";
      } else {
        templateName = "flxViewAll";
      }
      //Sibhi End
      if (isSingleCustomerProfile == true || isSingleCustomerProfile == "true") {
        var prioritizeAccountTypes = applicationManager.getTypeManager().getAccountTypesByPriority();
        for (var priorityType in prioritizeAccountTypes) {
          var key = prioritizeAccountTypes[priorityType];
          var customKey = this.getCustomLocalKey(key);
          if (accounts.hasOwnProperty(key)) {
            segData.push(this.getSegmentDataForEachAccount(accounts, limit, key, templateName)[0]);
          } 
          else if(accounts.hasOwnProperty(customKey)) {
            segData.push(this.getSegmentDataForEachAccount(accounts, limit, customKey, templateName)[0]);
          }
        }
      } else {
        for (var key in accounts) {
          segData.push(this.getSegmentDataForEachAccount(accounts, limit, key, templateName)[0]);
        }
      }
      return segData;
    },
    getSegmentDataForEachAccount: function(accounts, limit, key, templateName) {
      var segData = [];
      var showTotBalance = true;
      var currencyCode = "";
      var accType = "";
      this.processAccountsDataForSegment(accounts);
      var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
      var self = this;
      //Sibhi Start
      var configurationManager = applicationManager.getConfigurationManager();
      //Sibhi End

      // for(var key in accounts) {
      var viewAllConfig = {
        "template": templateName, //"flxClearViewAll"
        "lblViewAll": {
          //"text" : "View All"   
          "isVisible": false // Disabling it as the text is not need
        },
        "imgViewAll": { //"left" : "200%" ,
          "src": "blue_downarrow.png",
          "left": "50%"
        },
        "flxViewContainer": {
          "onClick": function(eventobject, context) {
            var accountsData = {};
            var accountsKeys = Object.keys(this.filteredAccountsData);
            accountsData[accountsKeys[context.sectionIndex]] = this.filteredAccountsData[accountsKeys[context.sectionIndex]];
            //Upon clicking the downarrow, processing the entire set of data to be visible in the list
            if (accountsData[accountsKeys[context.sectionIndex]].length > limit) {
              var pendingRowdata = accountsData[accountsKeys[context.sectionIndex]].slice(limit, accountsData[accountsKeys[context.sectionIndex]].length);
              var acctSegData = this.view.segAccounts.data;
              //this.getSegmentDataForAccounts(this.filteredAccountsData, 3);
              acctSegData.forEach(function(sectionData, index) {
                if (index == context.sectionIndex) {
                  sectionData[1].pop();
                  Array.prototype.push.apply(sectionData[1], pendingRowdata)
                }
              });
              this.view.segAccounts.setData(acctSegData);
            }
          }.bind(this)
        }
      };
      var rowData = accounts[key];
      if (rowData.length === 1) {
        showTotBalance = false;
      } else {
        for (var z = 0; z < rowData.length; z++) {
          showTotBalance = true;
          if (z === 0) {
            currencyCode = rowData[z].currencyCode
            accType = rowData[z].accountType
          }

          if (z > 0) {
            if (currencyCode !== rowData[z].currencyCode) {
              showTotBalance = false;
            }

            if (accType !== rowData[z].accountType) {
              showTotBalance = false;
            }
          }
        }
      }

      var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AccountsUIModule", "appName": "HomepageMA" });
      var sum = 0;
      var typeOfTotalAccount = "";
      if (showTotBalance) {
        sum = accountMod.presentationController.getTotalAvailableBalance(rowData);
        typeOfTotalAccount = accountMod.presentationController.getTotalAvailableBalanceType(rowData);
      }
      if (accounts[key].length > limit) {
        rowData = accounts[key].slice(0, limit);
        rowData.push(viewAllConfig);
      }



      if (!isSingleCustomerProfile) {
        showTotBalance = false;
      }
      var customKey = key;
      if(isSingleCustomerProfile) {
        var customKey = this.getCustomLocalKey(key);
        for(i = 0 ; i < rowData.length ; i++){
          rowData[i].accountType = customKey;
        }
      } else {
          for(var i = 0; i < accounts[key].length; i++){
            accounts[key][i].accountType = this.getCustomLocalKey(accounts[key][i].accountType);
          }
      }
      segData.push([{
        "template": "flxAccountsHeaderDashboardwithBorder",
        "flxHeaderShadows": {
          "isVisible": false
        },
        "flxSeperator": {
          "isVisible": true
        },
        "lblTypeName": {
          "text": kony.sdk.isNullOrUndefined(key) ? " " : (customKey).substr(0, 16).trim() + "(" + accounts[key].length + ")"
        },
        "lblTypeValue": {
          "text": sum,
          "isVisible": showTotBalance
        },
        "lblAccountBal": {
          "isVisible": showTotBalance,
          "text": typeOfTotalAccount
        }
      },
                    rowData
                   ]);
      return segData;

    },
    getSegmentRetailAccounts: function(accounts, limit) {
      var segData = [];
      var isSameCurrecyCode = false;
      //var currencyCode = "";
      //var typeOfTotalAccount = "";
      var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
      //var actualAccounts = accounts;
      // accounts = accounts.slice(0, limit);
      // var templateName = "";
      //var length = "";
      //var configurationManager = applicationManager.getConfigurationManager();
      //templateName = "flxViewAll";
      var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
      if (isSingleCustomerProfile == true || isSingleCustomerProfile == "true") {
        var prioritizeAccountTypes = applicationManager.getTypeManager().getAccountTypesByPriority();
        for (var priorityType in prioritizeAccountTypes) {
          var key = prioritizeAccountTypes[priorityType];
          var customKey = this.getCustomLocalKey(key);
          if (accounts.hasOwnProperty(key)) {
            segData.push(this.getSegmentRetailEachAccount(accounts, limit, key)[0]);
          } 
          else if (accounts.hasOwnProperty(customKey)) {
            segData.push(this.getSegmentRetailEachAccount(accounts, limit, customKey)[0]);
          }
        }
      } else {
        for (var key in accounts) {
          segData.push(this.getSegmentRetailEachAccount(accounts, limit, key)[0]);
        }
      }

      return segData;
    },
    getSegmentRetailEachAccount: function(accounts, limit, key) {
      var segData = [];
      var isSameCurrecyCode = false;
      var currencyCode = "";
      var typeOfTotalAccount = "";
      var isSingleCustomerProfile = applicationManager.getUserPreferencesManager().isSingleCustomerProfile;
      var actualAccounts = accounts;
      // accounts = accounts.slice(0, limit);
      var templateName = "";
      var length = "";
      var configurationManager = applicationManager.getConfigurationManager();
      templateName = "flxViewAll";
      var viewAllConfig = {
        "template": templateName,
        "lblViewAll": {
          "isVisible": false,
        },
        "imgViewAll": {
          "src": "blue_downarrow.png",
          "left": "50%"
        },

        "flxViewContainer": {
          "onClick": function(eventobject, context) {
            this.setLimit = false;
            this.mapInternalAccounts();
          }.bind(this)
        }
      };
      length = accounts[key].length;

      var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AccountsUIModule", "appName": "HomepageMA" });
      var totalBalance = 0.0;
      var availableBalance = 0.0;
      var forUtility = applicationManager.getFormatUtilManager();
      var configManager = applicationManager.getConfigurationManager();
      if (accounts[key].length === 1) {
        isSameCurrecyCode = false;
      } else {
        for (var z = 0; z < length; z++) {
          if (z === 0) {
            currencyCode = accounts[key][z].currencyCode
          }

          if (z > 0) {
            if (currencyCode === accounts[key][z].currencyCode) {
              isSameCurrecyCode = true;
            } else {
              isSameCurrecyCode = false;
            }
          }
        }

        if (isSameCurrecyCode) {
          for (var i = 0; i < length; i++) {
            if (accounts[key][i].accountType === configManager.constants.SAVINGS || accounts[key][i].accountType === configManager.constants.CHECKING || accounts[key][i].accountType === kony.i18n.getLocalizedString("i18n.Accounts.displaySavingsmb") || accounts[key][i].accountType === kony.i18n.getLocalizedString("i18n.Accounts.displayCheckingmb")) {
              typeOfTotalAccount = kony.i18n.getLocalizedString("kony.mb.dashboard.TotalAvailableBalance");
              if (!kony.sdk.isNullOrUndefined(accounts[key][i]["balaceToShow"])) {
                availableBalance = accounts[key][i]["balaceToShow"];
              } else {
                availableBalance = accounts[key][i]["availableBalance"];
              }
              totalBalance = totalBalance + parseFloat(availableBalance);
            } else if (accounts[key][i].accountType === configManager.constants.CREDITCARD ||
                       accounts[key][i].accountType === "Credit Card" ||
                       accounts[key][i].accountType === kony.i18n.getLocalizedString("i18n.Accounts.displayCreditCardmb")  ||
                       accounts[key][i].accountType === configManager.constants.DEPOSIT ||
                       accounts[key][i].accountType === kony.i18n.getLocalizedString("i18n.Accounts.displayDepositmb")) {
              typeOfTotalAccount = kony.i18n.getLocalizedString("kony.mb.dashboard.TotalAvailableCredit");
              if (!kony.sdk.isNullOrUndefined(accounts[key][i]["balaceToShow"])) {
                availableBalance = accounts[key][i]["balaceToShow"];
              } else {
                availableBalance = accounts[key][i]["currentBalance"];
              }
              totalBalance = totalBalance + parseFloat(availableBalance);
            } else if (accounts[key][i].accountType ===
                       configManager.constants.MORTGAGE ||
                       accounts[key][i].accountType === kony.i18n.getLocalizedString("i18n.Accounts.displayMortgagemb") ||
                       accounts[key][i].accountType === kony.i18n.getLocalizedString("i18n.Accounts.displayLoanmb") ||
                       accounts[key][i].accountType === configManager.constants.LOAN) {
              typeOfTotalAccount = kony.i18n.getLocalizedString("kony.mb.dashboard.TotalOutstandingBalance");
              if (!kony.sdk.isNullOrUndefined(accounts[key][i]["balaceToShow"])) {
                availableBalance = accounts[key][i]["balaceToShow"];
              } else {
                availableBalance = accounts[key][i]["outstandingBalance"];
              }
              totalBalance = totalBalance + parseFloat(availableBalance);
            }
            else if(accounts[key][i].accountType === configManager.constants.INVESTMENT){
              typeOfTotalAccount = kony.i18n.getLocalizedString("kony.mb.dashboard.TotalCurrentBalance");
              if (!kony.sdk.isNullOrUndefined(accounts[key][i]["balaceToShow"])) {
                availableBalance = accounts[key][i]["balaceToShow"];
              } else {
                availableBalance = accounts[key][i]["marketValue"];
              }
              availableBalance = (kony.sdk.isNullOrUndefined(availableBalance)) ? 0.0 : availableBalance;
              totalBalance = totalBalance + parseFloat(availableBalance);
            }
          }

        }
      }

      if (accounts[key].length > 0) {
        var currCode = accounts[key][0]["currencyCode"];
      }
      var sum = 0.0;
      sum = forUtility.formatAmountandAppendCurrencySymbol(totalBalance, currCode);

      if ((accounts[key].length) > limit) {
        accounts[key] = accounts[key].slice(0, limit);
        accounts[key].push(viewAllConfig);
      }


      if (!isSingleCustomerProfile) {
        isSameCurrecyCode = false;
      }
      customKey = key;
      if(isSingleCustomerProfile) {
        var customKey = this.getCustomLocalKey(key);
        for(var i = 0; i < accounts[key].length; i++){
          accounts[key][i].accountType = customKey;
        }
      } else {
        for(var i = 0; i < accounts[key].length; i++){
          accounts[key][i].accountType = this.getCustomLocalKey(accounts[key][i].accountType);
        }
      }
      segData.push([{
        "template": "flxAccountsHeaderDashboardwithBorder",
        "flxHeaderShadows": {
          "isVisible": false
        },
        "flxSeperator": {
          "isVisible": true
        },
        "lblTypeName": {
          "text": kony.sdk.isNullOrUndefined(key) ? " " : (customKey).substr(0, 16).trim() + "(" + accounts[key].length + ")"
        },
        "lblTypeValue": {
          "text": sum,
          "isVisible": false//isSameCurrecyCode
        },
        "lblAccountBal": {
          "isVisible": false,//isSameCurrecyCode
          "text": typeOfTotalAccount
        },
        "accountBalanceType": {
          "isVisible": isSameCurrecyCode,
          "text": typeOfTotalAccount
        }
      },
                    accounts[key]
                   ]);
      return segData

    },
    getAccountsWidgetDataMap: function() {
      return {
        "lblBankName": "accountType",
        "flxStatus":"flxStatus",
        "imgAccountType": "imgAccountType",
        "imgBank": "imgBank",
        "flximgBank": "flximgBank",
        "lblAccountBal": "lblAccountBal",
        "lblAccountBalValue": "availableBalanceValue",
        "flxSeparator": "flxSeparator",
        "lblAccountName": "maskedNickName",
        "lblAccountNumber": "maskedAccountNumber",
        "lblTypeName": "lblTypeName",
        "flxHeaderShadows": "flxHeaderShadows",
        "flxSeperator": "flxSeperator",
        "template": "template",
        "lblTypeValue": "lblTypeValue",
        "lblViewAll": "lblViewAll",
        "imgViewAll": "imgViewAll",
        "flxViewContainer": "flxViewContainer",
        "lblAccountBalValue2": "currentBalanceForDual",
        "lblAccountBal2": "lblAccountBal2",
        "imgWarn": "imgWarn"
      };
    },
    getCustomLocalKey : function(key) {
      var customKey = "";
      switch(key) {
        case "Savings": customKey = kony.i18n.getLocalizedString("i18n.Accounts.displaySavingsmb"); break;
        case "Checking": customKey = kony.i18n.getLocalizedString("i18n.Accounts.displayCheckingmb");break;
        case "Loan": customKey = kony.i18n.getLocalizedString("i18n.Accounts.displayLoanmb");break;
        case "Deposit": customKey = kony.i18n.getLocalizedString("i18n.Accounts.displayDepositmb");break;
        case "CreditCard": customKey = kony.i18n.getLocalizedString("i18n.Accounts.displayCreditCard");break;
        case "Mortgage": customKey = kony.i18n.getLocalizedString("i18n.Accounts.displayMortgagemb"); break;
        default: customKey = key;
      }
      return customKey;
    },
    getDefaultKey : function(key) {
      var customKey = "";
      switch(key) {
        case kony.i18n.getLocalizedString("i18n.Accounts.displaySavingsmb"): customKey = "Savings"; break;
        case kony.i18n.getLocalizedString("i18n.Accounts.displayCheckingmb"): customKey = "Checking" ;break;
        case kony.i18n.getLocalizedString("i18n.Accounts.displayLoanmb"): customKey = "Loan";break;
        case kony.i18n.getLocalizedString("i18n.Accounts.displayDepositmb"): customKey = "Deposit";break;
        case kony.i18n.getLocalizedString("i18n.Accounts.displayDepositmb"): customKey = "CreditCard";break;
        case kony.i18n.getLocalizedString("i18n.Accounts.displayMortgagemb"): customKey = "Mortgage"; break;
        default: customKey = key;
      }
      return customKey;
    },
    filterPersonalAccount: function(data) {
      if (!kony.sdk.isNullOrUndefined(data.isBusinessAccount)) {
        return data.isBusinessAccount === "true" ? false : true;
      }
      return true;
    },
    getMembershipName: function(accounts) {
      try {
        this.MemberShipName = [];
        for (var i = 0; i < accounts.length; i++) {
          if (!kony.sdk.isNullOrUndefined(accounts[i].MembershipName) && accounts[i].MembershipName !== "") {
            if (this.MemberShipName.indexOf(accounts[i].MembershipName) === -1) {
              this.MemberShipName.push(accounts[i].MembershipName);
            }
          }
        }
        this.MemberShipName.sort();
        return this.MemberShipName;
      } catch (er) {

      }
    },

    /**
         * Description
         * @method mapAccountsAndBanks
         * @return 
         */
    mapAccountsAndBanks: function() {
      try {
        var navManager = applicationManager.getNavigationManager();
        var custominfoInt = navManager.getCustomInfo("frmDashboard");
        var accounts;
        if(custominfoInt!==undefined)
        {
          accounts = this.clone(custominfoInt.accountData);
          accounts = accounts.filter(account => account.isPortFolioAccount === "false");
          // accounts = accounts.filter(function(account) {if(account.accountType !== "mortgageFacility") return account});
        }
        //this.sortAccountsBasedOnType(accounts);
        var processedAccounts = this.getOrganisationAccountsMap(accounts);
        this.getMembershipName(accounts);
        var accountsSegmentData = this.getSegmentDataForAccounts(processedAccounts, 3);
        this.view.segAccounts.widgetDataMap = this.getAccountsWidgetDataMap();
        this.accountsData = this.clone(processedAccounts);
        var configurationManager = applicationManager.getConfigurationManager();
        this.view.segAccounts.setData(accountsSegmentData);
        var configManager = applicationManager.getConfigurationManager();
        var isArrangementsAppPresent = configManager.isMicroAppPresent("ArrangementsMA");
        if(isArrangementsAppPresent === true){
          this.view.segAccounts.onRowClick = this.accountSegmentOnClick.bind(this);
        }
        /*var isAppPresent=configManager.isMicroAppPresent("ApprovalRequestMA");
        if(isAppPresent===true){
          this.view.segAccounts.onRowClick = function(seguiWidget, sectionNumber, rowNumber, selectedState) {
            applicationManager.getPresentationUtility().showLoadingScreen();
            var accountData = seguiWidget.data[sectionNumber][1][rowNumber];
            //  var formflow=navManager.setCustomInfo("frmdashboardflow","frmUnifiedDashboard");


            var bbAccountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "BBAccountsModule", "appName": "HomepageMA" });
            var navManager = applicationManager.getNavigationManager();
            var params = {
              "accountID": accountData["accountID"],
              "accountType": accountData["accountType"],
              "currencyCode": accountData["currencyCode"]
            };
            navManager.setCustomInfo("frmAccountDetailsNew", params);
            bbAccountsModule.presentationController.commonFunctionForNavigation("BBAccountsModule/frmAccountDetailsNew");
            // accountsModule.presentationController.fetchTransactionsByAccountId(accountData);
          }.bind(this);
        }*/
        this.setSelectAccountTypeData(processedAccounts);
        this.showorHideScrollingMenu(true);
        this.view.forceLayout();
        //Sibhi Start
        var configurationManager = applicationManager.getConfigurationManager();

        if (this.combinedFlowName === this.flowConstants.businessBanking) {
          var filteredAccountsData = this.getAllAccountsWithoutOrgName(this.accountsData);
          this.addEntriesInAccountTypeFilterData(filteredAccountsData);
          this.showSummaryData(); //for showing dropdown in Networth Summary
        } else {
          var custominfoInt = JSON.parse(JSON.stringify(navManager.getCustomInfo("frmDashboard")));
          var accounts ;
          if(custominfoInt!==undefined)
          {
            accounts = this.clone(custominfoInt.accountData);
            accounts = accounts.filter(account => account.isPortFolioAccount === "false");
            // accounts = accounts.filter(function(account) {if(account.accountType !== "mortgageFacility") return account});
          }
          if (Array.isArray(accounts)) {
            if (this.combinedFlowName === this.flowConstants.combinedBanking) {
              accounts = accounts.filter(this.filterPersonalAccount);
            }
          }
          var custominfoExt = JSON.parse(JSON.stringify(navManager.getCustomInfo("frmDashboardAggregated")));
          var externalAccounts ;
          if(custominfoExt!==undefined)
          {
            externalAccounts = this.clone(custominfoExt.accountData);
          }
          // var externalAccounts = this.clone(custominfoExt.accountData);
          if (Array.isArray(externalAccounts)) {
            if (this.combinedFlowName === this.flowConstants.combinedBanking) {
              externalAccounts = externalAccounts.filter(this.filterPersonalAccount);
            }
          }
          var internalAccounts ;
          if(custominfoInt!==undefined)
          {
            internalAccounts = this.clone(custominfoInt.accountData);
            internalAccounts = internalAccounts.filter(account => account.isPortFolioAccount === "false");
            // internalAccounts = internalAccounts.filter(function(account) {if(account.accountType !== "mortgageFacility") return account});
          }

          var externalAccounts ;
          if(custominfoExt!==undefined)
          {
            externalAccounts = this.clone(custominfoExt.accountData);
            externalAccounts = externalAccounts.filter(account => account.isPortFolioAccount === "false");
            // externalAccounts = externalAccounts.filter(function(account) {if(account.accountType !== "mortgageFacility") return account});
          }

          if (applicationManager.getConfigurationManager().isAggregatedExternalAccountEnabled()) {
            for (var i = 0; i < internalAccounts.length; i++) {
              if (internalAccounts[i].externalIndicator !== undefined && internalAccounts[i].externalIndicator === "true") {
                externalAccounts.push(internalAccounts[i]);
                internalAccounts.splice(i, 1);
                i--;
              }
            }
            if (externalAccounts.length > 0) {
              this.isAggregatedUser = true;
              externalAccounts.forEach(function(record) {
                record.BankName = record.bankName;
                record.type = "external";
                record.TypeDescription = record.accountType;
                record.AccountName = record.accountName;
                record.AccountId = record.accountID;
                record.NickName = record.nickName;
                record.CurrencyCode = record.currencyCode;
                record.Last4DigitAccount =  (record.accountID).substr((record.accountID).length - 4) + "...";
                record.LastUpdated = record.processingTime;
                record.AvailableBalance = record.availableBalance;
                record.BankLogo = "genericexternalbank.png"; //record.logoURL;
                try {
                  if (record.externalIndicator == "true") {
                    var dateFormat = applicationManager.getFormatUtilManager().getDateFormat();
                    var targetDate = CommonUtilities.getDateAndTime(record.expiresAt);
                    var expireDate = (targetDate.split(","))[0];
                    var today = kony.os.date(dateFormat);
                    var todayDateObj = applicationManager.getFormatUtilManager().getDateObjectFromCalendarString(today, (applicationManager.getFormatUtilManager().getDateFormat()).toUpperCase());
                    var targetDateObj = applicationManager.getFormatUtilManager().getDateObjectFromCalendarString(expireDate, (applicationManager.getFormatUtilManager().getDateFormat()).toUpperCase());
                    var difference = targetDateObj - todayDateObj;
                    var count = Math.ceil(difference / (1000 * 60 * 60 * 24));
                    record.Count = count;
                    record.AlertDays = record.connectionAlertDays;
                  }
                } catch (e) {}
              });
            }
          }
          if (this.combinedFlowName === this.flowConstants.combinedBanking) {
            this.setAccountsInfo(internalAccounts, externalAccounts, kony.i18n.getLocalizedString("kony.mb.common.allAccounts"));
          } else {
            if (!kony.sdk.isNullOrUndefined(externalAccounts) && externalAccounts.length !== 0) { //&& applicationManager.getConfigurationManager().isAggregatedExternalAccountEnabled()) {
              this.isAggregatedUser = true;
              var configManager = applicationManager.getConfigurationManager();      
              var isAppPresent1=configManager.isMicroAppPresent("ArrangementsMA");
              ///  var isAppPresent2=configManager.isMicroAppPresent("HomepageMA");
              if(isAppPresent1===true){
                this.view.segAccounts.onRowClick = this.accountAggregatedSegmentOnClick.bind(this);
              }else
              {
                this.view.segAccounts.setEnabled(false);                 
              }

              this.setBankAccounts(internalAccounts, externalAccounts);
              this.setAccountsInfo(internalAccounts, externalAccounts, kony.i18n.getLocalizedString("kony.mb.common.allAccounts"));
              this.mapInternalAccounts();
            } else {
              var configManager = applicationManager.getConfigurationManager();      
              var isAppPresent=configManager.isMicroAppPresent("ArrangementsMA");
              if(isAppPresent===true){
                this.view.segAccounts.onRowClick = this.accountSegmentOnClick.bind(this);
              }else
              {
                this.view.segAccounts.setEnabled(false);                
              }
              this.setAccountsInfo(internalAccounts, [], kony.i18n.getLocalizedString("kony.mb.common.allAccounts"));
              var configManager = applicationManager.getConfigurationManager();      
              //    var isAppPresent1=configManager.isMicroAppPresent("HomepageMA");
              //    var isAppPresent2=configManager.isMicroAppPresent("CampaignMA");
              //   if(isAppPresent1===true&&isAppPresent2===true){
              this.mapInternalAccounts();
              //}
            }
          }





        }
        //Sibhi End

        //     }

      } catch (exp) {
        kony.print("Exception in mapAccountsandBanks" + exp);
      }

    },
    /*
        Code for Showing Networth Summary dropdown for Business User
        */
    showSummaryData: function() {
      var summaryData = [];
      var configManager = applicationManager.getConfigurationManager();      
      //       var isAppPresent=configManager.isMicroAppPresent("HomepageMA");
      //       if(isAppPresent===true){
      var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AccountsUIModule", "appName": "HomepageMA" });
      var formatUtility = applicationManager.getFormatUtilManager();
      if (this.MemberShipName.length > 1 && (this.MemberShipName.length === Object.keys(this.accountsData).length)) { //checking if user has multiple contracts for showing contracts list in dropdown of net worth summary
        for (var i = 0; i < this.MemberShipName.length; i++) {
          var record = {};
          record.NickName = Object.keys(this.accountsData)[i];
          var totAvlBal = accountMod.presentationController.getTotalAvailableBalance(this.accountsData[record.NickName]);
          var totDebtBal = accountMod.presentationController.getTotalDebtBalance(this.accountsData[record.NickName]);
          record.AvailableBalance = formatUtility.formatAmountandAppendCurrencySymbol((formatUtility.deFormatAmount(totAvlBal, totAvlBal[0]) - formatUtility.deFormatAmount(totDebtBal, totDebtBal[0])).toFixed(2));
          summaryData.push(record);
        }
      } else {
        for (var i = 0; i < this.accountsData.length; i++) {
          var account = this.accountsData[i];
          if (account.TypeDescription.toLowerCase() === (TypeManager.getAccountTypeBackendValue(configManager.accountTypes.SAVINGS)).toLowerCase() || account.TypeDescription.toLowerCase().trim() === (TypeManager.getAccountTypeBackendValue(configManager.accountTypes.CHECKING)).toLowerCase() || account.TypeDescription.toLowerCase() === "current" || account.TypeDescription.toLowerCase() === (TypeManager.getAccountTypeBackendValue(configManager.accountTypes.DEPOSIT)).toLowerCase()) {
            var record = {};
            record.NickName = account.accountName;
            record.AvailableBalance = account.availableBalanceValue.text;
            summaryData.push(record);
          }
        }
      }
      this.view.segSummary.isVisible = true;
      this.view.segSummary.widgetDataMap = {
        "lblAmountSpent": "NickName",
        "lblPaymentMode": "AvailableBalance",
        "flxSeperator":"flxSeperator"
      };
      this.view.segSummary.setData([]);
      this.view.segSummary.setData(summaryData);
      //  }
    },
    /**
         * Description
         * @method setBankAccounts
         * @param {} accountResponse
         * @return 
         */
    setBankAccounts: function(internalAccounts, externalAccounts) {

      this.view.lblSelectedAccountType.text = kony.i18n.getLocalizedString("kony.mb.common.allAccounts");
      this.view.segAccounts.rowTemplate = "flxAccounts";
      this.view.flxChartSizeToggle.skin = "sknFlxf9f9f9";
      this.view.flxChartSizeToggle.isVisible = false;
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
        internalAccounts.forEach(function(record) {
          if (record.bankName && !bankJS[record.bankName]) {
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
        this.isAggregatedUser = true;
        externalAccounts.forEach(function(record) {
          if (record.bankName && !bankJS[record.BankName]) {
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
    setAccountsInfo: function(internalAccounts, externalAccounts, bankName) {
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

      // var isAppPresent=configManager.isMicroAppPresent("HomepageMA");
      //  if(isAppPresent===true){
      var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AccountsUIModule", "appName": "HomepageMA" });

      if (!kony.sdk.isNullOrUndefined(internalAccounts) && internalAccounts.length > 0) {
        internalAccounts.forEach(function(record) {
          var AvailableBalance;
          var configManager = applicationManager.getConfigurationManager();
          //  if(record.isBusinessAccount==="false"){		//from Release 2021.01 after moving to contract based account this condition is not required		
          if (record.accountType === TypeManager.getAccountTypeBackendValue(configManager.accountTypes.LOAN) || record.accountType === TypeManager.getAccountTypeBackendValue(configManager.accountTypes.CREDITCARD)) {
            AvailableBalance = record.outstandingBalance;
          } else if (record.accountType === TypeManager.getAccountTypeBackendValue(configManager.accountTypes.DEPOSIT)) {
            AvailableBalance = record.currentBalance;
          } else {
            AvailableBalance = record.availableBalance;
          }
          record.flxDelete = {};
          record.imgDelete = {};
          record.lblDelete = {};
          record.type = "internal";
          var configManager = applicationManager.getConfigurationManager();      
          var isAppPresent=configManager.isMicroAppPresent("ConsentMgmtMA");
          if(isAppPresent===true){
            record.flxDelete.onClick = scope.alertCallBack;
          }
          else{
            record.flxDelete.isVisible=false;
          }
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
            "Last4DigitAccount":  (record.accountID).substr((record.accountID).length - 4) + "...",
            "NickName": record.nickName,
            "CurrencyCode": record.currencyCode,
            "flxDelete": record.flxDelete,
            "imgDelete": record.imgDelete,
            "lblDelete": record.lblDelete,
            "currentBalance": record.currentBalance,
            "outstandingBalance": record.outstandingBalance,

          });
          //     }
        });
      }
      if (!kony.sdk.isNullOrUndefined(externalAccounts) && externalAccounts.length > 0) {
        this.isAggregatedUser = true;
        externalAccounts.forEach(function(record) {
          var configManager = applicationManager.getConfigurationManager();
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
              if (record.TypeDescription.toLowerCase() === (TypeManager.getAccountTypeBackendValue(configManager.accountTypes.SAVINGS)).toLowerCase() || record.TypeDescription.toLowerCase().trim() === (TypeManager.getAccountTypeBackendValue(configManager.accountTypes.CHECKING)).toLowerCase() || record.TypeDescription.toLowerCase() === "current" || record.TypeDescription.toLowerCase() === (TypeManager.getAccountTypeBackendValue(configManager.accountTypes.DEPOSIT)).toLowerCase()) {
                if (record.TypeDescription.toLowerCase() === (TypeManager.getAccountTypeBackendValue(configManager.accountTypes.DEPOSIT)))
                  totalAsset = totalAsset + parseFloat(record.currentBalance);
                else
                  totalAsset = totalAsset + parseFloat(record.AvailableBalance);
                if (!kony.sdk.isNullOrUndefined(record.NickName)) {
                  record.NickName = record.NickName;
                } else if (kony.sdk.isNullOrUndefined(record.NickName) && kony.sdk.isNullOrUndefined(record.nickName)) {
                  record.NickName = record.AccountName;
                }
                if (scope.MemberShipName.length < 2) { //checking if user has multiple contracts, if not, list of accounts will be shown in dropdown
                  summaryData.push(record);
                }
              }
              if (record.TypeDescription.toLowerCase() === (TypeManager.getAccountTypeBackendValue(configManager.accountTypes.MORTGAGE)).toLowerCase() || record.TypeDescription.toLowerCase() === (TypeManager.getAccountTypeBackendValue(configManager.accountTypes.LOAN)).toLowerCase()) {
                if (record.TypeDescription.toLowerCase() === (TypeManager.getAccountTypeBackendValue(configManager.accountTypes.LOAN)).toLowerCase())
                  totalDebt = totalDebt + parseFloat(record.outstandingBalance);
                else
                  totalDebt = totalDebt + parseFloat(record.AvailableBalance);
              }
              record.AvailableBalance = formatUtility.formatAmountandAppendCurrencySymbol(record.AvailableBalance, record.CurrencyCode);
              var forUtility = applicationManager.getFormatUtilManager();
              if (record.LastUpdated)
                record.LastUpdated = forUtility.getTimeDiferenceOfDate(record.LastUpdated);
              if (record.Number) {
                record.Last4DigitAccount =  (record.Number).substr((record.Number).length - 4) + "..." ;
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
                } else {
                  record.imgWarn = {
                    src: "",
                    isVisible: false
                  };
                }
              } else {
                record.imgWarn = {
                  src: "",
                  isVisible: false
                };
              }
              if (record.externalIndicator !== undefined && record.externalIndicator === "true") {
                if (record.LastUpdated) {
                  var formatUtilManager = applicationManager.getFormatUtilManager();
                  var dateObj = formatUtilManager.getDateObjectfromString(record.processingTime, "YYYY-MM-DD HH:MM:SS");
                  record.LastUpdated = "as of " + formatUtilManager.getFormatedDateString(dateObj, formatUtilManager.getApplicationDateTimeFormat());
                }
                record.flxDelete = {};
                record.flxRefresh = {};
                record.imgDelete = {};
                record.lblDelete = {};
                var configManager = applicationManager.getConfigurationManager();      
                var isAppPresent=configManager.isMicroAppPresent("AccAggregationMA");                             
                if(isAppPresent===true){
                  record.flxDelete.onClick = scope.deleteCallBack;
                  record.flxRefresh.onClick = scope.refreshCallBack;
                }
                else{
                  record.flxRefresh.isVisible=false; 
                  record.flxDelete.isVisible=false; 
                }
              }
            }
          }
        });
      }
      if (scope.MemberShipName.length > 1 && (scope.MemberShipName.length === Object.keys(scope.accountsData).length)) { //checking if user has multiple contracts for showing contracts list in dropdown of net worth summary
        for (var i = 0; i < scope.MemberShipName.length; i++) {
          var account = {};
          account.NickName = Object.keys(scope.accountsData)[i];
          var totAvlBal = accountMod.presentationController.getTotalAvailableBalance(scope.accountsData[account.NickName]);
          var totDebtBal = accountMod.presentationController.getTotalDebtBalance(scope.accountsData[account.NickName]);
          account.AvailableBalance = formatUtility.formatAmountandAppendCurrencySymbol((formatUtility.deFormatAmount(totAvlBal, totAvlBal[0]) - formatUtility.deFormatAmount(totDebtBal, totDebtBal[0])).toFixed(2));
          summaryData.push(account);
        }
      }
      var allTypes = TypeManager.getAccountTypesByPriority();
      for (var i = 0; i < allTypes.length; i++) {
        var type = TypeManager.getAccountTypeBackendValue(allTypes[i]);
        if (typesJS[type] != "" && typesJS[type] != null) {
          var balance = 0;
          var typeVal = type;
          for (var index = 0; index < typesJS[type].length; index++) {
            var neg = 1;
            var bal = typesJS[type][index].AvailableBalance.replace(/,/g, "");
            if (bal[0] === '-') {
              neg = -1;
              bal = bal.substr(2, bal.length);
            } else {
              bal = bal.substr(1, bal.length);
            }
            var tmp = (neg * parseFloat(bal));
            if (isNaN(tmp) === false) {
              balance += tmp;
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
      //Sibhi Start
      var configurationManager = applicationManager.getConfigurationManager();

      if (this.combinedFlowName === this.flowConstants.combinedBanking) {
        //abilash start
        this.view.segSummary.widgetDataMap = {
          "lblAmountSpent": "NickName",
          "lblPaymentMode": "AvailableBalance"
        };
        this.view.segSummary.setData([]);
        this.view.segSummary.setData(summaryData);
        //abilash end
      } else if (this.combinedFlowName === this.flowConstants.businessBanking) {
        this.view.segAccounts.widgetDataMap = {
          "lblTypeName": "lblTypeName",
          "lblTypeValue": "lblTypeValue",
          "imgBank": "BankLogo",
          "flximgBank": "flximgBank",
          "lblAccountName": "NickName",
          "lblAccountBalValue": "AvailableBalance",
          "lblBankName": "BankName",
          "lblAccountBal": "LastUpdated",
          "imgError": "errorIcon",
          "lblAccountNumber": "Last4DigitAccount",
          "flxDelete": "flxDelete",
          "flxRefresh": "flxRefresh",
          "imgDelete": "imgDelete",
          "lblDelete": "lblDelete",
          "lblAccountBalValue2": "currentBalanceForDual",
          "lblAccountBal2": "lblAccountBal2"
        };


      } else {
        //abilash start
        this.view.segSummary.widgetDataMap = {
          "lblAmountSpent": "NickName",
          "lblPaymentMode": "AvailableBalance"
        };
        this.view.segSummary.setData([]);
        this.view.segSummary.setData(summaryData);
        var configManager=applicationManager.getConfigurationManager();
        var isAppPresent1=configManager.isMicroAppPresent("FinanceManagementMA");
        if(isAppPresent1===true){
          //this.displayBarChart();//osama to dis chart
          //this.displayDonutChart(); //osama to dis chart
        }
        //abilash end
        this.setView(data);
      }
      // }
      //Sibhi End

    },
    setView: function(data) {
      if (!kony.sdk.isNullOrUndefined(this.isAggregatedUser)) {
        if (this.isAggregatedUser) {
          var segwidgetDataMap = {
            "lblTypeName": "lblTypeName",
            "lblTypeValue": "lblTypeValue",
            "imgBank": "BankLogo",
            "lblAccountName": "NickName",
            "lblAccountBalValue": "AvailableBalance",
            "lblBankName": "BankName",
            "lblAccountBal": "LastUpdated",
            "imgError": "errorIcon",
            "lblAccountNumber": "Last4DigitAccount",
            "flxDelete": "flxDelete",
            "flxRefresh": "flxRefresh",
            "imgDelete": "imgDelete",
            "lblDelete": "lblDelete",
            "imgWarn": "imgWarn",
          };
          this.view.segAccounts.widgetDataMap = segwidgetDataMap;
        }
      }
      this.view.segAccounts.setData([]);
      this.view.segAccounts.setData(data);
      this.removeBlueScreen(data);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    /**
         * Description
         * @method postShow
         * @return 
         */
    postShow: function() {
      applicationManager.getPresentationUtility().showLoadingScreen();
      try {
        var accounts = this.accounts;
        var searchBarConfigResp = this.searchBarConfig(accounts.length);
        var filterConfigResp = this.filterConfig(accounts.length);
        if(searchBarConfigResp && filterConfigResp) this.view.flxSelectAccount.isVisible=false;


        //let data = {};
        //data = this.respData.PortfolioList.portfolioList;
        if (Object.keys(this.respData).length === 0) {
                this.view.lblInvestmentSummary.setVisibility(false);
          		this.view.flxAccounts.setVisibility(false);
          this.view.flxPortfolioLineChart.setVisibility(false);
                this.view.flxAccounts.height = "0dp";
                this.view.flxRecentActivity.setVisibility(false);
            }
        else{
        var h = this.view.flxDashboard.frame.height;
        this.view.flxAccounts.height = h + "dp";
        }
        if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
          this.view.flxDashboardHeader.top = "56dp";
          this.view.flxGradient.top = "56dp";
//           this.view.flxPageIndicators.top = "281dp";
          this.view.flxChartSizeToggle.top = "275dp";
          this.view.noAccounts.top = "56dp";
        } else {
          this.view.flxDashboardHeader.top = "0dp";
          this.view.flxGradient.top = "0dp";
//           this.view.flxPageIndicators.top = "210dp";
          this.view.flxChartSizeToggle.top = "215dp";
          this.view.noAccounts.top = "0dp";
        }
        this.view.flxDashboardHeader.scrollToWidget(this.view.flxDashboardHeader.widgets()[0]);
        if (this.view.imgChartSizeToggle.src === "whitearrowup.png") {
          //this.animateDashboardFlex();
        }
      } catch (e) {
        try {
          kony.print("Exception in postshow" + JSON.stringify(e, null, 4));
        } catch (er) {}
      }
      //         var configManager = applicationManager.getConfigurationManager();
      // 		if(configManager.isAggregatedExternalAccountEnabled()){
      // 			this.getAccountsRealTime();
      // 		}
      var custominfoCD = applicationManager.getNavigationManager().getCustomInfo("frmCustomerDashboard");
      try {
        if (this.showPwdWarningFlag && !(!kony.sdk.isNullOrUndefined(custominfoCD) && (custominfoCD.reDesignFlow === "true"))) {
          this.showPwdWarning();
        }
        this.showOutageAlert();
      } catch (e) {
        try {
          kony.print("Exception in postshow" + JSON.stringify(e, null, 4));
        } catch (er) {}
      }

      try {
        var titleBarAttributes = this.view.titleBarAttributes;
        titleBarAttributes["navigationBarHidden"] = false;
        this.view.titleBarAttributes = titleBarAttributes;
      } catch (err) {
        kony.print("Exception in postshow" + JSON.stringify(err, null, 4));
      }

      var date = new Date();
      var fetchedMonth = date.getMonth();
      try {
        this.setupPendingRequestsCounter();
      } catch (e) {}

      try {
        this.setupPaginationDotsBasedOnNumberOfPages();
      } catch (err) {
        kony.print("Exception in postshow" + JSON.stringify(err, null, 4));
      }
      var configManager = applicationManager.getConfigurationManager();      
      var isAppPresent=configManager.isMicroAppPresent("SecureMessageMA");             
      if(isAppPresent===true){
        this.validatePriorityMessages(); 
      }
	  var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AuthUIModule", "appName": "AuthenticationMA" });
      if(!(!kony.sdk.isNullOrUndefined(custominfoCD) && (custominfoCD.reDesignFlow === "true"))){
        if(custominfoCD.showUpgradePopup && "downgrade" === custominfoCD.showUpgradePopup.toLowerCase())
          presenter.presentationController.showLighterDashboardView();
      }
      // this.fetchCashPositionDet(fetchedMonth,"All");
      this.view.forceLayout();
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      //please let this be the last line of postshow
    },
    validatePriorityMessages: function(){
      let scopeObj = this;
      if(scopeObj.view.priorityMessages){
        scopeObj.view.remove(scopeObj.view.priorityMessages);
      }
      if(applicationManager.getMessagesManager().priorityMessageCount > 0){
        var priorityMessages = new com.InfinityMB.HomepageMA.priorityMessages({
          "autogrowMode": kony.flex.AUTOGROW_NONE,
          "height": "100%",
          "id": "priorityMessages",
          "isVisible": true,
          "layoutType": kony.flex.FREE_FORM,
          "left": "0dp",
          "masterType": constants.MASTER_TYPE_DEFAULT,
          "isModalContainer": false,
          "skin": "sknFlx000000Op50mb",
          "top": "0dp",
          "width": "100%",
          "zIndex": 400,
          "overrides": {}
        }, {
          "overrides": {}
        }, {
          "overrides": {}
        });
        scopeObj.view.add(priorityMessages);
        priorityMessages.showPriorityMessages(applicationManager.getMessagesManager().priorityMessageCount);
      }
    },

    loadCashPos: function() {
      var templateName = "flxSegHeaderCashPos";
      var segData = [];
      for (var i = 0; i < this.MemberShipName.length; i++) {
        var rowData = {};
        var headerData = {
          "template": templateName,
          "lblMemberShipName": this.MemberShipName[i],
          "imgArrow": {
            "src": "whitearrowdown.png"
          },
          "flxImg": {
            "onClick": function(eventobject, context) {
              applicationManager.getPresentationUtility().showLoadingScreen();
              var sectionDataRemoval = [{
                "template": "flxTotalBalance",
                "lblAmountSpent": "",
                "lblPaymentMode": "",
                "flxSeperator": {
                  "skin": "sknFlxBgFFFFFF",
                  "isVisible": false
                },
                "flxSpendingSub": {
                  "isVisible": false
                }
              }, {
                "template": "flxTotalBalance",
                "lblAmountSpent": "",
                "lblPaymentMode": "",
                "flxSeperator": {
                  "skin": "sknFlxBgFFFFFF",
                  "isVisible": false
                },
                "flxSpendingSub": {
                  "isVisible": false
                }
              }, {
                "template": "flxTotalBalance",
                "lblAmountSpent": "",
                "lblPaymentMode": "",
                "flxSeperator": {
                  "skin": "sknFlxBgFFFFFF",
                  "isVisible": false
                },
                "flxSpendingSub": {
                  "isVisible": false
                }
              }];
              var segData = this.view.segCashpos.data;
              var selecteIndex = context.sectionIndex;
              var fetchedAccountType = segData[selecteIndex][0].lblMemberShipName;
              var fetchedMonth = this.view.lblMonthAndYearCashPos.text;
              fetchedMonth = fetchedMonth.substring(0, 3);
              if (segData[selecteIndex][0].imgArrow.src === "whitearrowdown.png") {
                if (this.prevIndex !== selecteIndex) {
                  if (this.prevIndex === null || this.prevIndex === undefined || this.prevIndex === "") {} else {
                    segData[this.prevIndex][0].imgArrow.src = "whitearrowdown.png";
                    var headerArr = segData[this.prevIndex][0];
                    this.view.segCashpos.setSectionAt([headerArr, sectionDataRemoval], this.prevIndex);
                  }
                }
                this.prevIndex = context.sectionIndex;
                this.fetchCashPositionDet(fetchedMonth, fetchedAccountType);
              } else {
                segData[selecteIndex][0].imgArrow.src = "whitearrowdown.png";
                var headerArr = segData[selecteIndex][0];
                this.prevIndex = null;
                this.view.segCashpos.setSectionAt([headerArr, sectionDataRemoval], selecteIndex);
                applicationManager.getPresentationUtility().dismissLoadingScreen();
              }
            }.bind(this)
          }
        }
        rowData = [];
        segData.push([headerData, rowData]);
      }
      this.view.segCashpos.widgetDataMap = {
        "lblMemberShipName": "lblMemberShipName",
        "imgArrow": "imgArrow",
        "lblAmountSpent": "lblAmountSpent",
        "lblPaymentMode": "lblPaymentMode",
        "flxImg": "flxImg",
        "flxSeperator": "flxSeperator",
        "flxSpendingSub": "flxSpendingSub"
      };
      this.view.segCashpos.setData(segData);

    },

    fetchCashPositionDet: function(fetchedMonth, fetchedAccountType) {
      try {

        var date = new Date();
        var fetchedYear = date.getFullYear();
        var type;
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var month = date.getMonth();
        month = months[month];
        if (month === fetchedMonth) {
          type = "Weekly";
        } else {
          type = "Monthly"
        }
        var configManager = applicationManager.getConfigurationManager();      

        this.authModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AccountsUIModule", "appName": "HomepageMA" });
        this.authModule.presentationController.fetchCashPositionDatas(type, fetchedYear, fetchedMonth, fetchedAccountType);

      } catch (er) {

      }
    },
    errorCallback: function(response) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var date = new Date();
      var presentYear = date.getFullYear();
      if (this.prevMonth === -1) {
        this.currentMonthCashPos++;
      } else if (this.nextMonth === -1) {
        this.currentMonthCashPos--;
      }
      if (this.currentMonthCashPos === 0) {
        this.view.flxPrevMontCashPos.setVisibility(false);
      }

      if (this.currentMonthCashPos >= this.monthLimit) {
        this.view.flxNextMonthCashPos.setVisibility(false);
      }
      this.view.lblMonthAndYearCashPos.text = this.MONTH_NAMES[this.currentMonthCashPos] + " - " + presentYear;
      this.view.segCashpos.setData([]);
    },


    fetchCashPositionDataSuccessCallBack: function(response) {
      try {
        kony.print("fetchCashPositionDataSuccessCallBack" + response);
        var credit = null;
        var debit = null;
        var total_balance = null;
        var sectionDataRemoval = [{
          "template": "flxTotalBalance",
          "lblAmountSpent": "",
          "lblPaymentMode": "",
          "flxSeperator": {
            "skin": "sknFlxBgFFFFFF",
            "isVisible": false
          },
          "flxSpendingSub": {
            "isVisible": false
          }
        }, {
          "template": "flxTotalBalance",
          "lblAmountSpent": "",
          "lblPaymentMode": "",
          "flxSeperator": {
            "skin": "sknFlxBgFFFFFF",
            "isVisible": false
          },
          "flxSpendingSub": {
            "isVisible": false
          }
        }, {
          "template": "flxTotalBalance",
          "lblAmountSpent": "",
          "lblPaymentMode": "",
          "flxSeperator": {
            "skin": "sknFlxBgFFFFFF",
            "isVisible": false
          },
          "flxSpendingSub": {
            "isVisible": false
          }
        }];
        if (response.length > 0) {
          var processedData = [];
          var formatUtility = applicationManager.getFormatUtilManager();
          var fetchedMonth = this.view.lblMonthAndYearCashPos.text;
          fetchedMonth = fetchedMonth.substring(0, 3);
          //process and set data once ready
          for (var i = 0; i < response.length; i++) {
            if (response[i].span === fetchedMonth) {
              processedData.push({
                "lblAmountSpent": "Credit",
                "lblPaymentMode": formatUtility.formatAmountandAppendCurrencySymbol(response[i].credit),
              }, {
                "lblAmountSpent": "Debit",
                "lblPaymentMode": formatUtility.formatAmountandAppendCurrencySymbol(response[i].debit)
              }, {
                "lblAmountSpent": "Total Balance",
                "lblPaymentMode": formatUtility.formatAmountandAppendCurrencySymbol(response[i].total_balance)
              });
              this.setDataForCashPos(processedData);
            } else {
              if (credit === null) {
                credit = parseInt(response[i].credit);
              } else {
                credit = credit + parseInt(response[i].credit);
              }
              if (debit === null) {
                debit = parseInt(response[i].debit);
              } else {
                debit = debit + parseInt(response[i].debit);
              }
              if (total_balance === null) {
                total_balance = parseInt(response[i].total_balance);
              } else {
                total_balance = total_balance + parseInt(response[i].total_balance);
              }
            }
          }
          var date = new Date();
          var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          var month = date.getMonth();
          month = months[month];
          if (month === fetchedMonth) {
            processedData.push({
              "lblAmountSpent": "Credit",
              "lblPaymentMode": formatUtility.formatAmountandAppendCurrencySymbol(credit),
            }, {
              "lblAmountSpent": "Debit",
              "lblPaymentMode": formatUtility.formatAmountandAppendCurrencySymbol(debit)
            }, {
              "lblAmountSpent": "Total Balance",
              "lblPaymentMode": formatUtility.formatAmountandAppendCurrencySymbol(total_balance)
            });
            this.setDataForCashPos(processedData);

          }

        } else {
          this.setDataForCashPos(sectionDataRemoval);
        }
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      } catch (er) {}
    },

    setDataForCashPos: function(processedData) {
      var segData = this.view.segCashpos.data;
      segData[this.prevIndex][0].imgArrow.src = "whitearrowup.png"
      var headerArr = segData[this.prevIndex][0];
      this.view.segCashpos.setSectionAt([headerArr, processedData], this.prevIndex);
    },
    //     navigateToCombinedSelector:function(){
    //       try{
    //         var navManager = applicationManager.getNavigationManager();
    //         navManager.navigateTo("frmDashboardSelector");
    //       }catch(er){
    //       }
    //     },
    navigateToApplyFilter: function() {
      try {            
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("frmUnifiedDashSelector", this.combinedFlowName);
        var navigatetoApprovals = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AccountUIModule", "appName": "ArrangementsMA" });
        var frmName = {"appName": "HomepageMA","friendlyName":"AccountsUIModule/frmFilterAccounts"};
        navigatetoApprovals.presentationController.commonFunctionForNavigation(frmName);

      } catch (er) {}
    },
    navigateToApprovals: function() {
      try {

        var navigatetoApprovals = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "ApprovalsReqUIModule", "appName": "ApprovalRequestMA" });
        navigatetoApprovals.presentationController.commonFunctionForNavigation("ApprovalsReqUIModule/frmApprovalsList");

      } catch (er) {}
    },
    navigateToRequests: function() {
      try {

        var navigatetoApprovals = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "ApprovalsReqUIModule", "appName": "ApprovalRequestMA" });
        navigatetoApprovals.presentationController.commonFunctionForNavigation("ApprovalsReqUIModule/frmRequestList");

      } catch (er) {}
    },


    /**
         * shows outage message
         * @method showOutageAlert
         * @return 
         */
    showOutageAlert: function() {
      var accountManager = applicationManager.getAccountManager();
      var response = accountManager.getOutageMessages();
      if (response.length > 0 && !this.isOutageShown) {
        var msg = "\r\n" + response[0];
        var i = 1;
        while (i < response.length) {
          msg += ("\r\n" + "\r\n" + response[i]);
          i++;
        }

        var pspConfig = {
          "iconPosition": constants.ALERT_CONTENT_ALIGN_CENTER,
          "contentAlignment": constants.ALERT_ICON_POSITION_LEFT
        };
        var basicProperties = {
          "message": msg,
          "alertType": constants.ALERT_TYPE_INFO,
          "alertTitle": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Outage.ImportantNotice"),
          "yesLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.Dismiss"),
          "alertIcon": "",
          "alertHandler": function(response) {}
        };

        kony.ui.Alert(basicProperties, pspConfig); //this alert is to show outage alert
        this.isOutageShown = true;
      }
    },
    /**
         * Description
         * @method getAccountsRealTime
         * @return 
         */
    getAccountsRealTime: function() {
      var configManager = applicationManager.getConfigurationManager();      
      //       var isAppPresent=configManager.isMicroAppPresent("HomepageMA");
      //       if(isAppPresent===true){
      var accountsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AccountsUIModule", "appName": "HomepageMA" });
      var main_user = applicationManager.getUserPreferencesManager().getUserName();
      accountsModule.presentationController.fetchExternalAccounts(main_user, this.getAccountsRealTimeSuccess.bind(this), this.getAccountsRealTimeError.bind(this));
      // }
    },
    /**
         * Description
         * @method getAccountsRealTime success
         * @return 
         */
    getAccountsRealTimeSuccess: function() {
      this.mapAccountsAndBanks();
    },
    /**
         * Description
         * @method getAccountsRealTime success
         * @return 
         */
    getAccountsRealTimeError: function() {
      //do nothing
    },
    /**
         * Description
         * @method initActions
         * @return 
         */
    initActions: function() {
      var scope = this;
      var configManager = applicationManager.getConfigurationManager();      
      var isAppPresent=configManager.isMicroAppPresent("FinanceManagementMA");
      if(isAppPresent===true){
        this.view.flxPrevMonthGraph.onClick = this.prevMonthClick.bind(this);
        this.view.flxNextMonthGraph.onClick = this.nextMonthClick.bind(this);            
        this.view.flxPrevMontBarSeg.onClick = this.prevMonthClickBarData.bind(this);
        this.view.flxNextMonthBarSeg.onClick = this.nextMonthClickBarData.bind(this);
      }
      this.view.flxPrevMontCashPos.onClick = this.prevMonthClickCashPos.bind(this);
      this.view.flxNextMonthCashPos.onClick = this.nextMonthClickCashPos.bind(this);
      this.view.flxViewTransactions.isVisible = true;
      this.view.flxViewTransactionsSummary.isVisible = false;
      this.view.flxViewTransactionsGraph.isVisible = true;
      this.view.flxViewTransactionsBarSeg.isVisible = false;
      this.view.flxDashboardHeader.setContentOffset({
        "x": "0dp"
      });
      this.view.flxDummyHorizontalScroll.setContentOffset({
        "x": "0dp"
      });
      this.view.flxDummyHorizontalScroll.onScrolling = function() {
        if (scope.view.flxDashboard.zIndex === 7) {
          var scrollX = scope.view.flxDummyHorizontalScroll.contentOffsetMeasured.x;
          scope.view.flxDashboardHeader.setContentOffset({
            "x": scrollX + "dp"
          });
        }
        scope.pageIndicatorHighlight();
      };
      //osamaUN
      //this.view.btnUNMoney.onClick = this.navigateToUNtest.bind(this);
      //this.view.btnUNMoneyLive.onClick = this.navigateToUN.bind(this);
      this.view.btnViewTransactions.onClick = this.navigateToApprovalsList.bind(this);
      var configManager = applicationManager.getConfigurationManager();      
      var isAppPresent=configManager.isMicroAppPresent("FinanceManagementMA");
      if(isAppPresent===true){
        this.view.btnViewTransactionsSummary.onClick = this.viewAllTransactions.bind(this);
        this.view.btnViewTransactionsBarSeg.onClick = this.viewAllTransactions.bind(this);
        this.view.btnViewTransactionsGraph.onClick = this.viewAllTransactions.bind(this);
      }
      this.view.flxDashboardHeader.onScrolling = function() {
        if (scope.view.flxDashboard.zIndex === 3) {
          var scrollX = scope.view.flxDashboardHeader.contentOffsetMeasured.x;
          scope.view.flxDummyHorizontalScroll.setContentOffset({
            "x": scrollX + "dp"
          });
        }
        scope.pageIndicatorHighlight();
      };
      this.view.flxDashboard.onScrolling = function() {
        var vScroll = scope.view.flxDashboard.contentOffsetMeasured.y;

        if (vScroll > 17) {
          scope.view.flxDashboard.zIndex = 20;
          scope.view.flxDashboardHeader.zIndex = 7;
        } else {
          scope.view.flxDashboardHeader.zIndex = 14;
          scope.view.flxDashboard.zIndex = 7;
        }

        if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
          scope.view.flxDashboardHeader.top = Math.round(vScroll * -0.3) + 56 + "dp";
          scope.view.flxGradient.top = Math.round(vScroll * -0.3) + 56 + "dp";
//           scope.view.flxPageIndicators.top = Math.round(vScroll * -0.3) + 56 + 230 + "dp";
          scope.view.flxChartSizeToggle.top = Math.round(vScroll * -0.3) + 56 + 220 + "dp";
        } else {
          scope.view.flxDashboardHeader.top = Math.round(vScroll * -0.3) + "dp";
          scope.view.flxGradient.top = Math.round(vScroll * -0.3) + "dp";
//           scope.view.flxPageIndicators.top = Math.round(vScroll * -0.3) + 230 + "dp";
          scope.view.flxChartSizeToggle.top = Math.round(vScroll * -0.3) + 220 + "dp";
        }
      };
      //osama//this.view.flxInnerChartSizeToggle.onClick = this.animateDashboardFlex.bind(this);
      var configManager = applicationManager.getConfigurationManager();
      var MenuHandler = applicationManager.getMenuHandler();
      MenuHandler.setUpHamburgerForForm(scope, configManager.constants.MENUACCOUNTS);
      this.view.customSearchbox.tbxSearch.skin = "sknTbxBorder1pxebedeeRadius3px";
      //this.view.customSearchbox.tbxSearch.onTouchEnd = this.view.flxAccounts.setVisibility(true);
      var configManager = applicationManager.getConfigurationManager();      
      //       var isAppPresent=configManager.isMicroAppPresent("HomepageMA");
      //       if(isAppPresent===true){
      this.view.customSearchbox.tbxSearch.onTextChange = this.searchAccoutsData;
      this.view.customSearchbox.flxSearchMain.skin = "sknflxf6f6f6Bcg";
      this.view.customSearchbox.flxHeaderShadow.skin = "sknflxshadowLogin";
      this.view.customSearchbox.btnCancel.skin = "sknLbl004B95SSP32PxTab";
      var configManager = applicationManager.getConfigurationManager();      
      var isAppPresent=configManager.isMicroAppPresent("ArrangementsMA");
      if(isAppPresent===true){
        this.view.flxShowAllAccountTypes.onClick = this.navigateToApplyFilter; //showAllAccountTypes;
      }
      else{
        this.view.flxShowAllAccountTypes.setVisibility(false);
      }
      this.view.flxSearchAccounts.onClick = this.showSearchAccounts;

      this.view.customSearchbox.btnCancel.onClick = function() {
        scope.view.customSearchbox.tbxSearch.text = "";
        scope.view.lblNoDataFound.isVisible = false;

        var filterName = "";
        if (this.combinedFlowName === this.flowConstants.combinedBanking) {
          filterName = kony.i18n.getLocalizedString("kony.mb.FilterAccounts.AllAccounts");
        } else if (this.combinedFlowName === this.flowConstants.businessBanking) {
          filterName = kony.i18n.getLocalizedString("kony.mb.businessDashboard.viewAccountsByBusinessGroup");
        } else {
          filterName = kony.i18n.getLocalizedString("kony.mb.FilterAccounts.AllAccounts");
        }

        //scope.filterAccountsSegment(filterName);
        scope.view.segAccounts.setData(scope.segAccountData);
        scope.showSearchAccounts();
        if (this.adsHided === false) {
          this.view.flxSuggestedOffers.setVisibility(true);
        }
      }.bind(scope);
      this.view.segAccountTypes.onRowClick = this.selectedClickedAccount;
      // }
      scope.view.segAccounts.onTouchEnd = this.onScrollingSegment;
      this.resetDashboardFlex();

    },

    //abilash start
    animateDashboardFlex: function() {
      var scope = this;
      var configurationManager = applicationManager.getConfigurationManager();
      if (scope.view.flxPopup.isVisible) return;

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
      if (scope.view.imgChartSizeToggle.src === "whitearrowdown.png") {
        var height = 0;
        //   var newHeight = kony.os.deviceInfo().screenHeight - 40;
        var newHeight = scope.view.flxBGDummy.frame.height;
        scope.view.flxSelectedAccounts.isVisible = false;
        if (applicationManager.getPresentationFormUtility().getDeviceName() === "android") {
          newHeight = newHeight - 56;
        }

        //   var segMaxHeight=newHeight-362;
        //var segMaxHeight = newHeight - 399;// -260 -1 -42 - 1 -60 -35(-segtop-sep-date-sep-btn-toggle)
        //newHeight = newHeight - 35 + "dp";
        var segMaxHeight = newHeight;
        scope.view.flxGradient.height = newHeight;
        scope.view.imgChartSizeToggle.src = "whitearrowup.png";
        scope.view.flxDashboardHeader.height = newHeight;
        scope.view.segRecentTransactions.height  =  segMaxHeight - 60 -250 - 30 + "dp" ;
        //scope.view.segSummary.height = segMaxHeight + 60 + "dp";
        //scope.view.segBar.height = segMaxHeight + 60 + "dp";
        //scope.view.segCashpos.height = segMaxHeight + 60 + "dp";
        scope.view.segCashpos.height = segMaxHeight + 104 + "dp";
        //scope.view.flxSummarySegment.height = segMaxHeight + 104 + "dp";
        //scope.view.flxBarSegment.height = segMaxHeight + 104 + "dp";
        //scope.view.flxSegGraph.height = segMaxHeight + 104 + "dp";
        if (scope.combinedFlowName === scope.flowConstants.combinedBanking) {
          // this.view.flxSummary.setVisibility(true);
          //this.view.flxBarChart.setVisibility(true);
          // this.view.browserChart.setVisibility(true);
          this.view.flxApprovalSeg.setVisibility(true);
          this.view.flxCashpos.setVisibility(true);
          //osama//this.view.flxSummarySegment.setVisibility(true);
          this.view.flxSegGraph.setVisibility(true);
          //oosama//this.view.flxBarSegment.setVisibility(true);
        } else if (scope.combinedFlowName === scope.flowConstants.businessBanking) {
          // this.view.flxSummary.setVisibility(false);
          //this.view.flxBarChart.setVisibility(false);
          // this.view.browserChart.setVisibility(false);
          this.view.flxApprovalSeg.setVisibility(true);
          this.view.flxCashpos.setVisibility(true);
          this.view.flxSummarySegment.setVisibility(false);
          this.view.flxSegGraph.setVisibility(false);
          this.view.flxBarSegment.setVisibility(false);

        } else {
          // this.view.flxSummary.setVisibility(false);
          //this.view.flxBarChart.setVisibility(false);
          // this.view.browserChart.setVisibility(false);
          this.view.flxApprovalSeg.setVisibility(true);
          this.view.flxCashpos.setVisibility(false);
          //osama//this.view.flxSummarySegment.setVisibility(true);
          this.view.flxSegGraph.setVisibility(true);
          //osama//this.view.flxBarSegment.setVisibility(true);
          this.view.flxDetails.setVisibility(true);
        }
        scope.view.segCashpos.setVisibility(true);
        this.view.brwTotalAssetChart.evaluateJavaScript("AddDonutChart( " + JSON.stringify(this.data1) + " ," + JSON.stringify(this.data2) + "," + JSON.stringify(this.data3) + "," + JSON.stringify(this.data4) +', ' + false + " );");
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
              animationEnd: function() {}
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
              animationEnd: function() {}
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
            animationEnd: function() {
              scope.view.flxDummyHorizontalScroll.setEnabled(true);
              scope.view.flxChartSizeToggle.setEnabled(true);
              scope.view.flxDashboard.enableScrolling = false;
              scope.view.flxDashboard.zIndex = 3;
            }
          });


      } else {
        scope.view.imgChartSizeToggle.src = "whitearrowdown.png";
        scope.view.flxSelectedAccounts.isVisible = true;
        scope.view.flxCashpos.setVisibility(false);
        scope.view.flxBarSegment.setVisibility(false);
        scope.view.flxSegGraph.setVisibility(false);
        this.view.flxDetails.setVisibility(false);
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
              animationEnd: function() {}
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
              animationEnd: function() {}
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
            animationEnd: function() {
              scope.view.flxGradient.height = "250dp";
              scope.view.flxDashboardHeader.height = "250dp";
              scope.view.flxSummarySegment.setVisibility(false);
              scope.view.segCashpos.setVisibility(false);
              scope.view.flxApprovalSeg.setVisibility(false);
              scope.view.flxDashboard.enableScrolling = true;
              scope.view.flxDummyHorizontalScroll.setEnabled(true);
              scope.view.flxChartSizeToggle.setEnabled(true);
        scope.view.brwTotalAssetChart.evaluateJavaScript("AddDonutChart( " + JSON.stringify(this.data1) + " ," + JSON.stringify(this.data2) + "," + JSON.stringify(this.data3) + "," + JSON.stringify(this.data4) +', ' + true + " );");
            }
          });
      }
      scope.view.flxDummyHorizontalScroll.enableScrolling = true;
    },
    //abilash end

    pageIndicatorHighlight: function() {
      for (let index = 1; index <= this.view.flxPageIndicators.widgets().length; index++) {
        this.view["flxPageIndicator" + index].skin = "sknFlxPageIndicatorUnselected";
      }
      var scrollX = this.view.flxDashboardHeader.contentOffsetMeasured.x;
      var screenWidth = kony.os.deviceInfo().screenWidth;
      var chartNum = Math.round(scrollX / screenWidth) + 1;
      var configurationManager = applicationManager.getConfigurationManager();
      // alert("chartNum : "+chartNum);
      this.view["flxPageIndicator" + chartNum].skin = "sknFlxPageIndicatorSelected";
      kony.print("chart num" + chartNum);
      if (this.wealthFlow === this.flowConstants.investmentBanking) {
        if (chartNum === 6 && !this.isAssetChartDisplayed) {
          var configManager = applicationManager.getConfigurationManager();      
          var isAppPresent=configManager.isMicroAppPresent("PortfolioManagementMA");
          if(isAppPresent===true){
            this.chartService("OneY");
            this.isAssetChartDisplayed = true;
          }
        }
      }

      //we are displaying bar chart and donut chart only after scrolling the 
      //browser widget into the view to show animation to the user.
      //Requirement is to show animation only once, for the first time the chart is rendered.
      //Since rendering the chart and animating it are tightly coupled,
      //we are calling these methods only when the browser widgets are into the view.
      var configManager=applicationManager.getConfigurationManager();
      var isAppPresent1=configManager.isMicroAppPresent("FinanceManagementMA");
      if(isAppPresent1===true){
        if (this.isApprovalRequestCountHidden) {
          if (chartNum === 1 && !this.isMultiLineBarChartDisplayed) {
            this.displayMultiLineBarChart();
            this.isMultiLineBarChartDisplayed = true;
          }
          if (this.combinedFlowName === this.flowConstants.combinedBanking) {
            if (chartNum === 3 && !this.isDonutChartDisplayed) {
             // this.displayDonutChart();//osama to dis chart
              this.isDonutChartDisplayed = true;
            }
            if (chartNum === 4 && !this.isBarChartDisplayed) {

             // this.displayBarChart(); //osama to dis chart

              this.isBarChartDisplayed = true;
            }
          } else if (this.combinedFlowName === this.flowConstants.businessBanking) {
            if (chartNum === 3 && !this.isDonutChartDisplayed) {
              var configManager=applicationManager.getConfigurationManager();
              var isAppPresent1=configManager.isMicroAppPresent("FinanceManagementMA");
              if(isAppPresent1===true){
               // this.displayDonutChart();//osama to dis chart
              }
              this.isDonutChartDisplayed = false;
            }
            if (chartNum === 4 && !this.isBarChartDisplayed) {
              var configManager=applicationManager.getConfigurationManager();
              var isAppPresent1=configManager.isMicroAppPresent("FinanceManagementMA");
              if(isAppPresent1===true){
               // this.displayBarChart(); //osama to dis chart
              }
              this.isBarChartDisplayed = false;
            }
          } else {
            var configManager=applicationManager.getConfigurationManager();
            var isAppPresent1=configManager.isMicroAppPresent("FinanceManagementMA");
            if(isAppPresent1===true){
              //this.displayBarChart();//osama to dis chart
              //this.displayDonutChart();//osama to dis chart
            }
          }
          //Sibhi End

        } else {
          if (chartNum === 2 && !this.isMultiLineBarChartDisplayed) {
            this.displayMultiLineBarChart();
            this.isMultiLineBarChartDisplayed = true;
          }
          if (this.combinedFlowName === this.flowConstants.combinedBanking) {
            if (chartNum === 4 && !this.isDonutChartDisplayed) {
              //this.displayDonutChart();//osama to dis chart
              this.isDonutChartDisplayed = true;
            }
            if (chartNum === 5 && !this.isBarChartDisplayed) {
             // this.displayBarChart();//osama to dis chart
              this.isBarChartDisplayed = true;
            }
          } else if (this.combinedFlowName === this.flowConstants.businessBanking) {
            if (chartNum === 4 && !this.isDonutChartDisplayed) {
              //this.displayDonutChart();//osama to dis chart
              this.isDonutChartDisplayed = false;
            }
            if (chartNum === 5 && !this.isBarChartDisplayed) {
              //this.displayBarChart();//osama to dis chart
              this.isBarChartDisplayed = false;
            }
          } else {
            //this.displayBarChart();//osama to dis chart
            //this.displayDonutChart();//osama to dis chart
          }
        }
      }

    },

    /**
         * Description
         * @method onScrollingDashboard
         * @return 
         */
    onScrollingDashboard: function() {
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
    onScrollingSegment: function() {
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
    viewAllTransactions: function() {
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
    fetchTransactions: function(monthId, categoryId) {
      try {
        this.transactions = [];
        var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "PersonalFinanceManagementUIModule", "appName": "FinanceManagementMA" });
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
    navTofrmPFMCategorisedTransactions: function() {
      if (this.currentTransactions === this.totalTransactions) {
        var navManager = applicationManager.getNavigationManager();
        this.navData = [];
        this.navData.transactions = this.transactions;
        this.navData.isYear = false;
        navManager.setCustomInfo("frmPFMAdvancedSearchData", this.navData);
        navManager.setCustomInfo("frmPFMCategorisedTransactions", this.transactions);         
        var accountModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "PersonalFinanceManagementUIModule", "appName": "FinanceManagementMA" });
        accountModule.presentationController.commonFunctionForNavigation("frmPFMCategorisedTransactions");

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
    showGraph: function() {
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
          "animationEnd": function() {
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
    selectedClickedAccount: function() {
      applicationManager.getPresentationUtility().showLoadingScreen();
      this.showAllAccountTypes();
      var selectedItem = this.view.segAccountTypes.selectedItems[0];
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
      this.filterAccountsSegment(selectedItem.lblName.text);
    },
    filterAccountsSegment: function(selectedKey) {
      var configurationManager = applicationManager.getConfigurationManager();

      if (this.combinedFlowName === this.flowConstants.combinedBanking) {
        this.view.lblSelectedAccountType.text = selectedKey;
        var data = null;
        if (selectedKey !== kony.i18n.getLocalizedString("kony.mb.FilterAccounts.AllAccounts")) {
          var segData = {};
          for (var key in this.accountsData) {
            if (key === selectedKey) {
              segData[key] = this.accountsData[key];
            }
          }
          data = this.getSegmentDataForAccounts(segData, 3);
        } else {
          data = this.getSegmentDataForAccounts(this.accountsData, 3);
        }
        this.view.segAccounts.setData(data);
        this.showorHideScrollingMenu(true);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        this.view.forceLayout();
      } else if (this.combinedFlowName === this.flowConstants.businessBanking) {
        this.filterAccountsSegmentBusiness(selectedKey);
      } else {
        var navManager = applicationManager.getNavigationManager();
        var filterAccountsInfo = navManager.getCustomInfo("frmFilterAccounts");
        if (!kony.sdk.isNullOrUndefined(filterAccountsInfo)) {
          if (this.isFilterApplied) {
            this.setLimit = false;
            var accnt = this.accountsData[Object.keys(this.accountsData)[0]];
            var configManager = applicationManager.getConfigurationManager();      
            //   var isAppPresent1=configManager.isMicroAppPresent("HomepageMA");
            //  var isAppPresent2=configManager.isMicroAppPresent("CampaignMA");
            //   if(isAppPresent1===true&&isAppPresent2===true){
            var accounts = this.getSegmentRetailAccounts(accnt, accnt.length);
            //   }
            this.view.segAccounts.setData(accounts);
            this.showorHideScrollingMenu(true);
          } else {
            this.mapAccountsAndBanks();
          }
        } else {
          this.mapAccountsAndBanks();
        }
      }
      if (this.isFilterApplied) {
        var navManager = applicationManager.getNavigationManager();
        var filterAccountsInfo = navManager.getCustomInfo("frmFilterAccounts");
        if (!kony.sdk.isNullOrUndefined(filterAccountsInfo)) {
          this.view.lblSelectedAccountType.text = filterAccountsInfo.selectedAccountsName;
        }
      }
    },

    filterAccountsSegmentBusiness: function(selectedKey) {
      if (selectedKey !== kony.i18n.getLocalizedString("kony.mb.businessDashboard.viewAccountsByBusinessGroup") &&
          selectedKey !== kony.i18n.getLocalizedString("kony.mb.businessDashboard.viewAccountsByAccountType")) {
        this.view.lblSelectedAccountType.text = selectedKey;
        var segData = {};
        for (var key in this.accountsData) {
          if (key === selectedKey) {
            segData[key] = this.accountsData[key];
          }
        }
        this.view.segAccounts.setData(this.getSegmentDataForAccounts(segData, 3));
      } else {
        if (selectedKey === kony.i18n.getLocalizedString("kony.mb.businessDashboard.viewAccountsByAccountType")) {
          this.view.lblSelectedAccountType.text = kony.i18n.getLocalizedString("kony.mb.businessDashboard.viewByAccountType");

          var acctSegData = this.getSegmentDataForAccounts(this.accountTypeFilterData, 3);
          var scope = this;
          acctSegData.forEach(function(sectionData, index) {
            var accountData = scope.accountTypeFilterData[Object.keys(scope.accountTypeFilterData)[index]];
            var totalBalance = 0;
            accountData.forEach(function(data) {
              totalBalance += parseFloat(data.availableBalance);
            });
            sectionData[0].lblTypeValue = applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(totalBalance, accountData[0].currencyCode);
            sectionData[0].lblAccountBal = "Available Balance";
          });
          this.view.segAccounts.setData(acctSegData);
        } else {
          this.view.lblSelectedAccountType.text = kony.i18n.getLocalizedString("kony.mb.businessDashboard.viewByBusinessGroup");
          var segData = this.getSegmentDataForAccounts(this.accountsData, 3);
          this.view.segAccounts.setData(segData);
        }
      }
      this.showorHideScrollingMenu(true);
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      this.view.forceLayout();
    },
    showorHideScrollingMenu: function(isVisible) {
      this.view.flxDummyHorizontalScroll.isVisible = isVisible;
      this.view.flxDashboardHeader.isVisible = isVisible;
      this.view.flxPageIndicators.isVisible = isVisible;
      this.view.flxGradient.isVisible = isVisible;
    },
    showSearchAccounts: function() {

      this.view.flxSuggestedOffers.setVisibility(false);
      if (this.view.flxSearchContainer.isVisible) {
        this.view.flxSearchContainer.isVisible = false;
        this.view.flxSelectedAccounts.isVisible = true;
        this.showorHideScrollingMenu(true);
        var configManager = applicationManager.getConfigurationManager();      
        var isAppPresent=configManager.isMicroAppPresent("PortfolioManagementMA");
        if(isAppPresent===true){
          this.checkPermissions();
        }
      } else {
        var scope = this;

        function timercallback() {
          scope.view.customSearchbox.tbxSearch.setFocus(true);
        }
        kony.timer.schedule("tbxfocustimer001", timercallback, 0.5, false);
        this.segAccountData=this.view.segAccounts.data;
        this.view.flxSearchContainer.isVisible = true;
        this.view.flxSelectedAccounts.isVisible = false;
        this.showorHideScrollingMenu(false);
        //this.view.flxTopNews.isVisible=false;
        this.view.flxTopNews.isVisible = false;
        this.view.flxPortfolioValues.isVisible = false;
        this.view.flxPortfolioLineChart.isVisible = false;
        this.view.segInvestmentAccounts.isVisible = false;
        this.view.segAccounts.isVisible = true;
        //this.view.flxRecentActivity.isVisible=false;
        this.view.flxAccountsHeaderDashboardExact.isVisible = false;
        this.view.flxShadowTopNews.isVisible = false;
      }
      this.view.forceLayout();
    },
    /**
         * Description
         * @method showAllAccountTypes
         * @return 
         */
    showAllAccountTypes: function() {
      if (this.view.flxAccountTypes.isVisible) {
        this.view.flxAccountTypes.isVisible = false;
        this.view.flxAccountShadow.isVisible = false;
        this.view.flxSelectedAccounts.isVisible = true;

        this.showorHideScrollingMenu(true);
      } else {
        this.showorHideScrollingMenu(false);
        this.view.flxAccountTypes.isVisible = true;
        this.view.flxAccountShadow.isVisible = true;
        this.view.flxSelectedAccounts.isVisible = false;

      }
      this.view.forceLayout();
    },

    searchAccoutsData: function() {
      this.view.segAccounts.isVisible = true;
      var filterKey = this.view.lblSelectedAccountType.text;
      var searchKey = this.view.customSearchbox.tbxSearch.text.trim().toLowerCase();
      var accountsData = {};
      var scopeObj = this;
      var configurationManager = applicationManager.getConfigurationManager();
      if (this.combinedFlowName === this.flowConstants.combinedBanking) {
        if (filterKey !== kony.i18n.getLocalizedString("kony.mb.FilterAccounts.AllAccounts")) {
          //accountsData[filterKey] = this.accountsData[filterKey];
          accountsData = this.accountsData
        } else {
          accountsData = this.accountsData;
        }
        var searchedData = this.searchKeyAndGetData(accountsData, searchKey);
        searchedData = this.getSegmentDataForAccounts(searchedData, 3);
        if (searchedData.length === 0) {
          this.view.segAccounts.setData([]);
          this.view.lblNoDataFound.isVisible = true;
          this.view.lblNoDataFound.text = kony.i18n.getLocalizedString("kony.mb.MM.NoResultsFound");
        } else {
          this.view.lblNoDataFound.isVisible = false;
          this.view.segAccounts.setData(searchedData);
        }
        if (this.combinedFlowName === this.flowConstants.combinedBanking) {
          this.showorHideScrollingMenu(false);
        }
        this.view.forceLayout();
      } else if (this.combinedFlowName === this.flowConstants.businessBanking) {
        /* if(filterKey !== kony.i18n.getLocalizedString("kony.mb.businessDashboard.viewByBusinessGroup")){
                   if(filterKey === kony.i18n.getLocalizedString("kony.mb.businessDashboard.viewByAccountType")){
                     accountsData = this.accountTypeFilterData;
                   }
                   else{
                     accountsData[filterKey] = this.accountsData[filterKey]; 
                   }
                 }
                 else{
                   accountsData = this.accountsData;
                 }*/
        accountsData = this.accountsData;
        var searchedData = this.searchKeyAndGetData(accountsData, searchKey);
        searchedData = this.getSegmentDataForAccounts(searchedData, 3);
        if (searchedData.length === 0) {
          this.view.segAccounts.setData([]);
          this.view.lblNoDataFound.isVisible = true;
          this.view.lblNoDataFound.text = kony.i18n.getLocalizedString("kony.mb.MM.NoResultsFound");
        } else {
          this.view.lblNoDataFound.isVisible = false;
          this.view.segAccounts.setData(searchedData);
        }
        if (this.combinedFlowName === this.flowConstants.combinedBanking) {
          this.showorHideScrollingMenu(false);
        }
        this.view.forceLayout();
      } else {
        //var accountsDatas = this.processedRetailAccounts;
        // var searchedData = this.searchKeyAndGetData(accountsDatas, searchKey);

        var accountsDatas = this.searchRetailAccounts(this.accountsData, searchKey);
        if (Object.keys(accountsDatas).length === 0) {
          this.view.segAccounts.setData([]);
          this.view.lblNoDataFound.isVisible = true;
          this.view.lblNoDataFound.text = kony.i18n.getLocalizedString("kony.mb.MM.NoResultsFound");


        } else {
          this.view.lblNoDataFound.isVisible = false;
          var configManager = applicationManager.getConfigurationManager();      
          //   var isAppPresent1=configManager.isMicroAppPresent("HomepageMA");
          //  var isAppPresent2=configManager.isMicroAppPresent("CampaignMA");
          //     if(isAppPresent1===true&&isAppPresent2===true){
          if (accountsDatas.length > 3) {
            this.setLimit = true;
            this.view.segAccounts.setData(this.getSegmentRetailAccounts(accountsDatas, 3));
          } else {
            this.setLimit = false;
            this.view.segAccounts.setData(this.getSegmentRetailAccounts(accountsDatas, accountsDatas.length));
          }
          //}
        }

      }
    },
    searchRetailAccounts: function(accountsData, searchKey) {
      try {
        var searchArr = {}
        var accountKeys = [];
        if (searchKey !== null || searchKey !== undefined || searchKey !== "") {
          for (var key in accountsData) {
            accountsData[key].forEach(function(data) {
              if (data.template !== "flxViewAll") {
                if (data.nickName.toLowerCase().includes(searchKey) ||
                    data.accountID.includes(searchKey)) {
                  if (accountKeys.includes(key)) {
                    searchArr[key].push(data);
                  } else {
                    searchArr[key] = [data];
                    accountKeys.push(key);
                  }
                }
              }

              //               var nickname = data.nickName.toLowerCase();
              //               var accountID = data.accountID;
              //               if(nickname !== undefined && accountID!== undefined){
              //                 if(nickname.includes(searchKey) || accountID.includes(searchKey)){
              //                   searchArr[key].push(data);
              //                 }else{
              //                   searchArr[key] = [data];
              //                 }
              //               }
            })
          }
        }
        return searchArr;


      } catch (er) {

      }
    },

    searchKeyAndGetData: function(accounts, searchKey) {
      var searchedAccounts = {};
      var accountKeys = [];
      for (var key in accounts) {
        accounts[key].forEach(function(data) {
          if (data.nickName.toLowerCase().includes(searchKey) ||
              data.accountType.toLowerCase().includes(searchKey) ||
              data.accountID.includes(searchKey)) {
            if (accountKeys.includes(key)) {
              searchedAccounts[key].push(data);
            } else {
              searchedAccounts[key] = [data];
              accountKeys.push(key);
            }
          }
        });
      }
      return searchedAccounts;
    },
    /**
         * Description
         * @method setSelectAccountTypeData
         * @return 
         */
    setSelectAccountTypeData: function(accounts) {
      var scope = this;
      var configurationManager = applicationManager.getConfigurationManager();
      var accountTypes = [];
      if (this.combinedFlowName === this.flowConstants.combinedBanking) {
        accountTypes = [kony.i18n.getLocalizedString("kony.mb.FilterAccounts.AllAccounts")].concat(Object.keys(accounts));
      } else if (this.combinedFlowName === this.flowConstants.businessBanking) {
        accountTypes = [
          kony.i18n.getLocalizedString("kony.mb.businessDashboard.viewAccountsByBusinessGroup"),
          kony.i18n.getLocalizedString("kony.mb.businessDashboard.viewAccountsByAccountType")
        ].concat(Object.keys(accounts));
      } else {

      }
      this.view.lblFilterHeader.text = "Account Filters";
      this.view.imgFilterClose.onTouchEnd = function() {
        scope.view.flxAccountTypes.isVisible = false;
        scope.view.flxSelectedAccounts.isVisible = true;
        scope.showorHideScrollingMenu(true);
        scope.view.forceLayout();
      }.bind(this);
      var data = [];
      accountTypes.forEach(function(type, index) {
        var src = "";
        var typeObj = {
          "lblName": {
            "text": type
          },
          "imgIcon": {
            "src": ""
          },
          "flxSeparator": {
            "isVisible": true
          }
        };
        if (index === 0) {
          src = "tickmark_green.png";
        }
        typeObj.imgIcon.src = src;
        data.push(typeObj);
      });
      this.view.segAccountTypes.widgetDataMap = {
        "lblName": "lblName",
        "imgIcon": "imgIcon",
        "flxSeparator": "flxSeparator"
      };
      this.view.segAccountTypes.setData(data);
    },
    /**
         * Description
         * @method setAccountsData
         * @return 
         */
    setAccountsData: function() {
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
    clone: function(source) {
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
    accountSegmentOnClick: function() {
      // var rowid = this.view.segAccounts.selectedRowIndex[1];
      var sectionId = this.view.segAccounts.selectedIndices[0][0];
      var rowId = this.view.segAccounts.selectedIndices[0][1][0];
      var rowid = this.view.segAccounts.data[sectionId][1][rowId];
      //       if(rowid.template!==undefined){
      //         if (rowid.template.id === "flxAccountsEngageInsert") {
      //           this.invokeEngage();
      //           return;
      //         }
      //       }
      //       if(rowid.template!==undefined){
      //         if (rowid.template.id === "flxViewAll" || rowid.template.id === "flxClearViewAll") {
      //           var sectionId = this.view.segAccounts.selectedRowIndex[0];
      //           this.showFullAccountList(sectionId);
      //           return;
      //         }
      //       }

      applicationManager.getPresentationUtility().showLoadingScreen();
      var selectedAccountId = rowid["accountID"];
      var contextData = {
        "accountID": rowid["accountID"],
        "accountType": rowid["accountType"],
        "currencyCode": rowid["currencyCode"],
        "isBusinessAccount": rowid["isBusinessAccount"],
        "accountName": (rowid["accountName"]) ? rowid["accountName"] : "",
        "nickName": (rowid["nickName"]) ? rowid["nickName"] : "",
      }

      var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AccountUIModule", "appName": "ArrangementsMA" });
      //       if(applicationManager.getConfigurationManager().isAccountDetailsServiceConfigured)
      //       {
      //         accountMod.presentationController.fetchAccountDetailsAndTransactions(selectedAccountId);
      //       }
      //       else 
      //       {
      //         var processedAccountsData = accountMod.presentationController.fetchAccountTransactions(selectedAccountId);
      //       }
      var navManager = applicationManager.getNavigationManager();
      contextData.accountType = this.getDefaultKey(contextData.accountType);
      navManager.setCustomInfo("frmAccountDetails", contextData);
      navManager.setCustomInfo("accountMembershipId", rowid.Membership_id);
      var closeAccount={
        "accountID":contextData.accountID,
        "accountName":contextData.accountName
      };
      var selectedAc=applicationManager.getAccountManager().getInternalAccounts().filter(function(ac){return ac.accountID === contextData.accountID})
      navManager.setCustomInfo("CloseAccountPopup", closeAccount);
      navManager.setCustomInfo("selectedAccount", selectedAc[0]);
      navManager.navigateTo({"friendlyName": "AccountUIModule/frmAccountDetails","appName": "ArrangementsMA"});

    },

    accountAggregatedSegmentOnClick: function() {
      var self = this;
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
        "currencyCode": rowData["currencyCode"],
        "type": rowData.type,
        "accountType": rowData["accountType"],
        "accountID": rowData.Account_id ? rowData["Account_id"] :rowData["accountID"]?rowData["accountID"]:"",
        "nickName": rowData.NickName
      };
      if (rowData.type === "internal" || rowData.externalIndicator === "true") {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var selectedAccountId = AccountDetailsObj.accountID;

        // var processedAccountsData = accountMod.presentationController.fetchAccountTransactions(selectedAccountId);

        var navManager = applicationManager.getNavigationManager();
        var selectedAc=applicationManager.getAccountManager().getInternalAccounts().filter(function(ac){return ac.accountID === selectedAccountId})
        var closeAccount={
        "accountID":rowData.accountID,
        "accountName":rowData.accountName
      };
      navManager.setCustomInfo("CloseAccountPopup", closeAccount);
      navManager.setCustomInfo("selectedAccount", selectedAc[0]);
        AccountDetailsObj.accountType = this.getDefaultKey(AccountDetailsObj.accountType);
        navManager.setCustomInfo("frmAccountDetails", AccountDetailsObj);
        navManager.setCustomInfo("accountMembershipId", rowData.Membership_id);
        navManager.navigateTo({
          "friendlyName": "AccountUIModule/frmAccountDetails",
          "appName": "ArrangementsMA"
        });
      }else if(rowData.externalIndicator == "false"){
        applicationManager.getPresentationUtility().showLoadingScreen();
        var contextData = {
          "accountID": rowData["accountID"],
          "accountType": rowData["accountType"],
          "currencyCode": rowData["currencyCode"],
          "isBusinessAccount": rowData["isBusinessAccount"],
          "accountName": (rowData["accountName"]) ? rowData["accountName"] : "",
          "nickName": (rowData["nickName"]) ? rowData["nickName"] : "",
        };
        var closeAccount={
        "accountID":rowData.accountID,
        "accountName":rowData.accountName
      };
        var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AccountUIModule", "appName": "ArrangementsMA" });
        var navManager = applicationManager.getNavigationManager();
        var selectedAc=applicationManager.getAccountManager().getInternalAccounts().filter(function(ac){return ac.accountID === contextData.accountID})
      navManager.setCustomInfo("CloseAccountPopup", closeAccount);
      navManager.setCustomInfo("selectedAccount", selectedAc[0]);
        contextData.accountType = this.getDefaultKey(contextData.accountType);
        navManager.setCustomInfo("frmAccountDetails", contextData);
        navManager.setCustomInfo("accountMembershipId", rowData.Membership_id);
        navManager.navigateTo({"friendlyName": "AccountUIModule/frmAccountDetails","appName": "ArrangementsMA"});	  
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
          var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AccountUIModule", "appName": "ArrangementsMA" });
          accountMod.presentationController.fetchAccountExternalTransactions(main_user, userName, bankId, account, AccountDetailsObj);

        }

        function successCallback(response) {
          var formatUtility = applicationManager.getFormatUtilManager();
          rowData.AvailableBalance = formatUtility.formatAmountandAppendCurrencySymbol(response[0].AvailableBalance, response[0].currencyCode);
          rowData.LastUpdated = kony.i18n.getLocalizedString("kony.mb.AccountsAggregated.JustNow");
          rowData.error = " ";
          rowData.errorIcon = "";
          self.view.segAccounts.setDataAt(rowData, rowId, sectionId);
          applicationManager.getPresentationUtility().dismissLoadingScreen();
        }

        function deleteAccountSuccessCallback() {
          var navManager = applicationManager.getNavigationManager();
          var externalCustom = navManager.getCustomInfo("frmDashboardAggregated");
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

          var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AccountsUIModule", "appName": "HomepageMA" });
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

    adsPreshow: function() {
      if (!this.adsHided) {
        this.resetAdsUI();
        var navManager = applicationManager.getNavigationManager();
        var formData = navManager.getCustomInfo("frmDashboardAggregated");
        if (formData.accountDashboardCampaignData) {
          if (formData.accountDashboardCampaignData.length !== 0) {
            this.accountDashboardCampaignData = formData.accountDashboardCampaignData;
            this.bindAdData();
          } else {
            this.hideAds();
          }
        } else {
          this.hideAds();
        }
      }
    },
    bindAdData: function() {
      var accountDashboardCampaignData = this.accountDashboardCampaignData;
      this.numOfAds = accountDashboardCampaignData.length;
      var param;
      var x = 1;
      var date = new Date();
      var deviceUtilManager = applicationManager.getDeviceUtilManager();
      this.view.flxLoadingIndicator.setVisibility(true);
      this.view.flxSuggestedOffers.setVisibility(true);
      for (var j = 1; j <= this.numOfAds; j++) {
        if (accountDashboardCampaignData[j - 1].imageURL !== "") {
          param = date.getTime();
          this.view["flxAd" + x].setVisibility(true);
          this.view["flxAd" + x].left = (parseInt(deviceUtilManager.getDeviceInfo().screenWidth)) * (x - 1) + "dp";
          this.view["imgAd" + x].src = accountDashboardCampaignData[j - 1].imageURL + "?Param=" + param;
          x++;
        }
      }

    },
    resetAdsUI: function() {
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
    onAdDownloadComplete: function(issuccess, adNumber) {
      if (issuccess) {
        var i = this.imageDownloadSuccessCount; //this.imageObjArray.length;
        this.view["flxAd" + adNumber].setVisibility(true);
        this.alignFlexInScrollContainer(i + 1);
        if (i === 0) {
          this.setGestureRecogniser();
          this.setDataForAd(adNumber);
          var loggerManager = applicationManager.getLoggerManager();
          loggerManager.setCustomMetrics(this, true, "#AccountDashboardCampaigns Displayed");
        }
        this.imageObjArray[adNumber - 1] = adNumber;
        this.imageDownloadSuccessCount++;
      } else {
        this.imageDownloadFailureCount++;
        this.view["flxAd" + adNumber].setVisibility(false);
        if (this.imageDownloadFailureCount === this.numOfAds) {
          var logger = applicationManager.getLoggerManager();
          logger.log("####All Account dashboard Campaign's download failed\n####Therefore Hiding Them");
          this.onAllAdsDownloadFailure();
        }
      }
      if (this.imageObjArray.length >= 1 && (this.imageDownloadSuccessCount + this.imageDownloadFailureCount) === this.numOfAds) {
        this.onAllAdsDownloadComplete();
      }
    },

    onAllAdsDownloadComplete: function() {
      var deviceUtilManager = applicationManager.getDeviceUtilManager();
      var visible = 0;
      for (var k = 1; k <= this.numOfAds; k++) {
        if (this.view["flxAd" + (k)].isVisible) {
          visible++;
          var leftVal = ((visible - 1) * parseInt(deviceUtilManager.getDeviceInfo().screenWidth));
          this.view["flxAd" + k].left = leftVal + "dp";
        }
      }
      this.view.flxProgressBar.setVisibility(true);
      this.imageObjArray = this.imageObjArray.filter(function(el) { if (el) return el });
      this.view.flxLoadingIndicator.setVisibility(false);
    },

    removeGestureRecognisers: function() {
      if (this.gestIDs.length !== 0) {
        var swipeGestureID = this.gestIDs[0];
        var tapGestureID = this.gestIDs[1];
        this.view.flxScrollContainerAds.removeGestureRecognizer(swipeGestureID);
        this.view.flxScrollContainerAds.removeGestureRecognizer(tapGestureID);
        this.gestIDs = [];
      }
    },
    setGestureRecogniser: function() {
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
    onAllAdsDownloadFailure: function() {
      this.hideAds();
      this.view.imgLoadingIndicator.src = "addownloadfailed.png";
    },
    alignFlexInScrollContainer: function(noOfDownloadedAds) {
      if (noOfDownloadedAds > 1) {
        if (noOfDownloadedAds === 2) {
          this.view.flxProgressButton1.setVisibility(true);
          this.view.flxProgressButton2.setVisibility(true);
          this.view.flxProgressButton1.left = kony.i18n.getCurrentLocale() === "ar_AE" ? "10%" : "46%";
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
    setDataForAd: function(adNumber) {
      var adData = this.accountDashboardCampaignData[adNumber - 1];
      this.view.flxAdInfo.setVisibility(false);
      this.view.flxAdInfo.forceLayout();
      var loggerManager = applicationManager.getLoggerManager();
      loggerManager.setCustomMetrics(this, true, "#AccountDashboardCampaign" + adNumber + " Displayed");
    },
    onAdSwipe: function(widget, gestureInfo, context) {
      var downloadedAdCount = this.imageDownloadSuccessCount; //this.imageObjArray.length;
      var xVal = this.xOffset;
      var scWidth = applicationManager.getDeviceUtilManager().getDeviceInfo().screenWidth;
      var isThereChange = false;
      if (!this.isSwipeDone) {
        var loggerManager = applicationManager.getLoggerManager();
        loggerManager.setCustomMetrics(this, true, "#AccountDashboardCampaigns Swiped");
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
    onAdTap: function() {
      var adNumber = this.imageObjArray[this.currAdFlex - 1];
      var navUrl;
      if (adNumber) {
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
    hideAds: function() {
      this.adsHided = true;
      this.view.flxSuggestedOffers.setVisibility(false);
    },
    removeBlueScreen: function(data) {
      if (data.length < 3) {
        this.view.flxWhiteBg.setVisibility(true);
      } else {
        this.view.flxWhiteBg.setVisibility(false);
      }
    },
    toFormLoans: function() {
      //Removed until these forms are migrated to Seperate MicroApp
      //       var configManager = applicationManager.getConfigurationManager();      
      //       var isAppPresent=configManager.isMicroAppPresent("CampaignMA");
      //       if(isAppPresent===true){
      //         var campMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "CampaignManagement", "appName": "CampaignMA" });
      //         campMod.presentationController.commonFunctionForNavigation("frmPersonalLoans"); //frmPersonalLoans}
      //       }
    },
    toFormDeposits: function() {
      //Removed until these forms are migrated to Seperate MicroApp
      //       var configManager = applicationManager.getConfigurationManager();      
      //       var isAppPresent=configManager.isMicroAppPresent("CampaignMA");
      //       if(isAppPresent===true){
      //         var campMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "CampaignManagement", "appName": "CampaignMA" });
      //         campMod.presentationController.commonFunctionForNavigation("frmShortTermDeposits");
      //       }
    },

    toFormAutoLoan: function() {
      //Removed until these forms are migrated to Seperate MicroApp
      //       var configManager = applicationManager.getConfigurationManager();      
      //       var isAppPresent=configManager.isMicroAppPresent("CampaignMA");
      //       if(isAppPresent===true){
      //         var campMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "CampaignManagement", "appName": "CampaignMA" });
      //         campMod.presentationController.commonFunctionForNavigation("frmAutoLoan");
      //       }
    },

    toFormHELOC: function() {
      //Removed until these forms are migrated to Seperate MicroApp
      //       var configManager = applicationManager.getConfigurationManager();      
      //       var isAppPresent=configManager.isMicroAppPresent("CampaignMA");
      //       if(isAppPresent===true){
      //         var campMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "CampaignManagement", "appName": "CampaignMA" });
      //         campMod.presentationController.commonFunctionForNavigation("frmHELOC");
      //       }
    },

    toFormSpecialBonus: function() {
      //Removed until these forms are migrated to Seperate MicroApp
      //       var configManager = applicationManager.getConfigurationManager();      
      //       var isAppPresent=configManager.isMicroAppPresent("CampaignMA");
      //       if(isAppPresent===true){
      //         var campMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "CampaignManagement", "appName": "CampaignMA" });
      //         campMod.presentationController.commonFunctionForNavigation("frmSpecialBonus");
      //       }
    },
    toFormEStmtAccountPreferences: function() {
      var configManager = applicationManager.getConfigurationManager();      
      var isAppPresent=configManager.isMicroAppPresent("ConsentMgmtMA");
      if(isAppPresent===true){
        var setMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "SettingsUIModule", "appName": "ManageProfileMA" });
        setMod.presentationController.onClickPaperlessCampaign();
      }
    },
    toformFinancialHelp: function() {
      //Removed until these forms are migrated to Seperate MicroApp
      //       var configManager = applicationManager.getConfigurationManager();      
      //       var isAppPresent=configManager.isMicroAppPresent("CampaignMA");
      //       if(isAppPresent===true){
      //         var campMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "CampaignManagement", "appName": "CampaignMA" });
      //         campMod.presentationController.commonFunctionForNavigation("frmFinancialHelp");
      //       }
    },
    getSuccessResponse: function(data) {
      this.successResponse = data;
      var configManager = applicationManager.getConfigurationManager();      
      var isAppPresent=configManager.isMicroAppPresent("CampaignMA");
      if(isAppPresent===true){
        var campMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "CampaignManagement", "appName": "CampaignMA" });
        campMod.presentationController.updateCampaignDetails(this.successResponse);
      }
    },
    addLoanAccounts: function(data) {
      var configManager = applicationManager.getConfigurationManager();      
      //       var isAppPresent=configManager.isMicroAppPresent("HomepageMA");
      //       if(isAppPresent===true){
      var navManager = applicationManager.getNavigationManager();
      var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AccountsUIModule", "appName": "HomepageMA" });
      this.view.segAccounts.rowTemplate = "flxAccountsNoImage";
      //this.view.flxSelectAccount.isVisible = false;
      //this.view.flxChartSizeToggle.skin = "sknFlxffffffmb";
      var custominfoInt = navManager.getCustomInfo("frmDashboard");
      var internalAccounts ;
      if(custominfoInt!==undefined)
      {
        internalAccounts = this.clone(custominfoInt.accountData);
        internalAccounts = internalAccounts.filter(account => account.isPortFolioAccount === "false");
        // internalAccounts = internalAccounts.filter(function(account) {if(account.accountType !== "mortgageFacility") return account});
      }

      var processedAccountsData = accountMod.presentationController.processAccountsData(internalAccounts);

      this.view.segAccounts.widgetDataMap = {
        lblAccountName: "nickName",
        lblAccountBalValue: "availableBalance",
        lblBankName: "accountType",
        lblAccountId: "accountID",
        lblAccountBal: "accountBalanceType"
      };

      processedAccountsData.push(data);
      this.view.segAccounts.setData(processedAccountsData);
      this.removeBlueScreen(processedAccountsData);
      // }
    },

    getCounts: function() {
      try {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var configManager = applicationManager.getConfigurationManager();
        var checkUserPermission = function(permission) {
          return applicationManager.getConfigurationManager().checkUserPermission(permission);
        }                
        //         var isAppPresent=configManager.isMicroAppPresent("HomepageMA");
        //         if(isAppPresent===true){
        var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AccountsUIModule", "appName": "HomepageMA" });
        var singleApprovalsPendingCount = presenter.presentationController.singleApprovalsPendingCount;
        var bulkApprovalsPendingCount = presenter.presentationController.bulkApprovalsPendingCount;
        var otherApprovalsPendingCount = presenter.presentationController.otherApprovalsPendingCount;
        var singleRequestsPendingCount = presenter.presentationController.singleRequestsPendingCount;
        var bulkRequestsPendingCount = presenter.presentationController.bulkRequestsPendingCount;
        var otherRequestsPendingCount = presenter.presentationController.otherRequestsPendingCount;
        var approvalsCounter = singleApprovalsPendingCount + bulkApprovalsPendingCount + otherApprovalsPendingCount;
        var requestsCounter = singleRequestsPendingCount + bulkRequestsPendingCount + otherRequestsPendingCount;
        this.view.lblApprovalsCounter.text = "" + approvalsCounter;
        this.view.lblRequestsCounter.text = "" + requestsCounter;
        this.setupPendingRequestsCounter();
        this.view.lblTransactionValue.text = "" + singleApprovalsPendingCount;
        this.view.lblACHTransactionValue.text = "" + bulkApprovalsPendingCount;
        this.view.lblACHFileValue.text = "" + otherApprovalsPendingCount;
        this.view.lblPendingValue.text = "" + singleRequestsPendingCount;
        this.view.lblApprovedValue.text = "" + bulkRequestsPendingCount;
        this.view.lblRejectedValue.text = "" + otherRequestsPendingCount;



        applicationManager.getPresentationUtility().dismissLoadingScreen();
        // var scopeObj = this;
        // var formName = "frmUnifiedDashboard";
        // scopeObj.ACHModule.presentationController.getApprovalCounts(formName);
        //  }
      } catch (er) {}
      try {
        var configManager = applicationManager.getConfigurationManager();      
        var isAppPresent=configManager.isMicroAppPresent("ApprovalRequestMA");
        if(isAppPresent===true){
          this.setupApprovalsAndRequests();
        }
      } catch (e) {}
    },
    setupApprovalsAndRequests: function() {
      this.view.flxApprovalInnerContainer.isVisible = false;
      this.view.flxApprovalsCounter.isVisible = true;
      this.view.lblApprovalsText.isVisible = true;
      this.view.flxApprovalsCounterContainer.isVisible = true;
      this.view.lblApprovalsCounter.isVisible = true;
      this.view.flxRequestInnerContainer.isVisible = false;
      this.view.flxRequestCounter.isVisible = true;
      this.view.lblRequestsText.isVisible = true;
      this.view.flxRequestsCounterContainer.isVisible = true;
      this.view.lblRequestsCounter.isVisible = true;
      this.view.lblApprovalsText.text = kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Approvals");
      this.view.lblRequestsText.text = kony.i18n.getLocalizedString("kony.mb.ApprovalRequests.Requests");
    },
    fetchMyPendingRequestSuccessCallBack: function(responseArr) {
      var segData = [];
      var isNoDataFound = false;
      if (responseArr.length > 0) {
        for (var i = 0; i < responseArr.length; i++) {
          if (!kony.sdk.isNullOrUndefined(responseArr[i].featureActionName) &&
              !kony.sdk.isNullOrUndefined(responseArr[i].requiredApprovals)) {
            isNoDataFound = false;
            var json = {
              "featureName": responseArr[i].featureActionName.text,
              "requiredApprovals": responseArr[i].requiredApprovals.text
            }
            segData.push(json);
          } else {
            isNoDataFound = true;
          }
        }
        if (isNoDataFound) {
          this.view.segRecentTransactions.isVisible = false;
          this.view.flxViewTransactions.isVisible = false;
          this.view.lblNoData.isVisible = true;
        } else {
          this.view.flxApprovalSeg.isVisible = true;
          this.view.lblNoData.isVisible = false;
          this.view.flxViewTransactions.isVisible = true;
          this.view.segRecentTransactions.widgetDataMap = {
            "lblSpendingCategory": "featureName",
            "lblTotalAmount": "requiredApprovals",
          };
          this.view.segRecentTransactions.removeAll();
          this.view.segRecentTransactions.setData(segData);
        }
      }
    },

    getCountsSuccessCB: function(singleApprovalsPendingCount, bulkApprovalsPendingCount,
                                  otherApprovalsPendingCount, singleRequestsPendingCount,
                                  bulkRequestsPendingCount, otherRequestsPendingCount, featureActionNames, sameBankCount, reqArray, approvalArray) {
      var configManager = applicationManager.getConfigurationManager();
      var checkUserPermission = function(permission) {
        return applicationManager.getConfigurationManager().checkUserPermission(permission);
      }
      var allApprovalPermission = configManager.getApprovalsFeaturePermissionsList();
      var isApprovalPermissionAccessible = allApprovalPermission.some(checkUserPermission);
      var allRequestPermissionAccessible = configManager.getRequestsFeaturePermissionsList();
      var isRequestPermissionAccessible = allRequestPermissionAccessible.some(checkUserPermission);
      var featureNameFinalArr = [];
      var json = {};
      var key;
      this.view.lblTransactionValue.text = "" + singleApprovalsPendingCount;
      this.view.lblACHTransactionValue.text = "" + bulkApprovalsPendingCount;
      this.view.lblACHFileValue.text = "" + otherApprovalsPendingCount;
      this.view.lblPendingValue.text = "" + singleRequestsPendingCount;
      this.view.lblApprovedValue.text = "" + bulkRequestsPendingCount;
      this.view.lblRejectedValue.text = "" + otherRequestsPendingCount;
      this.view.lblRecenTransactions.text = "";
      var pendingApprovalsArr = [];
      var pendingRequest = [];
      var pendingReqArr = [];
      var segData = [];
      this.view.flxViewTransactions.top = "10dp";
      if (approvalArray.length > 0) {
        for (var i = 0; i < approvalArray.length; i++) {
          if (approvalArray[i].lblSpendingCategory === "Other") {
            approvalArray[i].lblSpendingCategory = kony.i18n.getLocalizedString("kony.mb.approvalsAndRequest.filter.otherRequests")
          }

          if (approvalArray.length === i + 1) {
            approvalArray[i].flxSeperator = { "isVisible": false }
          }

        }
      }
      if (reqArray.length > 0) {
        for (var i = 0; i < reqArray.length; i++) {
          if (reqArray[i].lblSpendingCategory === "Other") {
            reqArray[i].lblSpendingCategory = kony.i18n.getLocalizedString("kony.mb.approvalsAndRequest.filter.otherRequests")
          }
        }
      }
      if (isApprovalPermissionAccessible && isRequestPermissionAccessible) {
        //this.view.flSepReq.isVisible = true;
        //this.view.flRecentTransReq.isVisible = true;
        //this.view.flSepReqPending.isVisible = true;
        //this.view.segRequestPendings.isVisible = true;
        this.view.segRecentTransactions.height = "48%";
        this.view.flxRecentTransactions.height = "20%";


        this.view.lblRecenTransactions.text = kony.i18n.getLocalizedString("kony.mb.dashboard.pendingApprovals")
        pendingApprovalsArr.push({
          "lblSpendingCategory": {
            "text": kony.i18n.getLocalizedString("kony.mb.approvalsAndRequest.filter.SingleTransactions")
          },
          "lblTotalAmount": "" + singleApprovalsPendingCount,
          "flxSeperator": { "isVisible": true }
        }, {
          "lblSpendingCategory": {
            "text": kony.i18n.getLocalizedString("kony.mb.approvalsAndRequest.filter.bulkTransactions")
          },
          "lblTotalAmount": "" + bulkApprovalsPendingCount,
          "flxSeperator": { "isVisible": true }
        }, {
          "lblSpendingCategory": {
            "text": kony.i18n.getLocalizedString("kony.mb.approvalsAndRequest.filter.sameBank")
          },
          "lblTotalAmount": "" + sameBankCount,
          "flxSeperator": { "isVisible": true }
        }, {
          "lblSpendingCategory": {
            "text": kony.i18n.getLocalizedString("kony.mb.approvalsAndRequest.filter.otherRequests")
          },
          "lblTotalAmount": "" + otherApprovalsPendingCount,
          "flxSeperator": { "isVisible": false }
        });

        segData.push([{
          "template": "flxPulldownheader",
          "flxSeperatorTop": {
            "isVisible": true
          },
          "flxSeperatorBottom": {
            "isVisible": true
          },
          "lblRecentTransactions": {
            "text": "Pending Approvals"
          },
          "flxRecentTranactions": {
            "isVisible": true,

          }
        },
                      approvalArray
                     ]);

        pendingRequest.push({
          "lblSpendingCategory": {
            "text": kony.i18n.getLocalizedString("kony.mb.approvalsAndRequest.filter.SingleTransactions")
          },
          "lblTotalAmount": "" + singleRequestsPendingCount,
          "flxSeperator": { "isVisible": true }
        }, {
          "lblSpendingCategory": {
            "text": kony.i18n.getLocalizedString("kony.mb.approvalsAndRequest.filter.bulkTransactions")
          },
          "lblTotalAmount": "" + bulkRequestsPendingCount,
          "flxSeperator": { "isVisible": true }
        }, {
          "lblSpendingCategory": {
            "text": kony.i18n.getLocalizedString("kony.mb.approvalsAndRequest.filter.sameBank")
          },
          "lblTotalAmount": "" + sameBankCount,
          "flxSeperator": { "isVisible": true }
        }, {
          "lblSpendingCategory": {
            "text": kony.i18n.getLocalizedString("kony.mb.approvalsAndRequest.filter.otherRequests")
          },
          "lblTotalAmount": "" + otherRequestsPendingCount,
          "flxSeperator": { "isVisible": true }
        });
        segData.push([{
          "template": "flxPulldownheader",
          "flxSeperatorTop": {
            "isVisible": true
          },
          "flxSeperatorBottom": {
            "isVisible": true
          },
          "lblRecentTransactions": {
            "text": "Pending Requests"
          },
          "flxRecentTranactions": {
            "isVisible": true,

          }
        },
                      reqArray
                     ]);

        //                if(Object.keys(featureActionNames).length !== 0){
        //                  for (key in featureActionNames) {
        //                    for(var i =0;i<featureActionNames[key].length;i++){
        //                        json = {
        //                          "lblSpendingCategory":featureActionNames[key][i].featureActionName,
        //                          "lblTotalAmount":featureActionNames[key][i].myApprovalsPending,
        //                          "lblRecentTransactions":"Pending Approvals"
        //                        }
        //                       featureNameFinalArr.push(json);
        //                    }                  
        //                 }  
        //               }

        //                if(Object.keys(featureActionNames).length !== 0){
        //                  localArr = [];
        //                  for (key in featureActionNames) {
        //                    for(var i =0;i<featureActionNames[key].length;i++){
        //                        json = {
        //                          "lblSpendingCategory":featureActionNames[key][i].featureActionName,
        //                          "lblTotalAmount":featureActionNames[key][i].myRequestsPending,
        //                        }
        //                        pendingReqArr.push(json);

        //                    }                  
        //                  }
        //              }

      } else if (!isApprovalPermissionAccessible && isRequestPermissionAccessible) {
        //         this.view.flSepReq.isVisible = false;
        //         this.view.flRecentTransReq.isVisible = false;
        //         this.view.flSepReqPending.isVisible = false;
        //         this.view.segRequestPendings.isVisible = false;
        this.view.segRecentTransactions.height = "48%";
        this.view.flxRecentTransactions.height = "20%";
        //  this.view.flxViewTransactions.top = "0dp";
        this.view.lblRecenTransactions.text = kony.i18n.getLocalizedString("kony.mb.dashboard.pendingRequests");
        pendingRequest = [];
        pendingRequest.push({
          "lblSpendingCategory": {
            "text": kony.i18n.getLocalizedString("kony.mb.approvalsAndRequest.filter.SingleTransactions")
          },
          "lblTotalAmount": "" + singleRequestsPendingCount,
          "flxSeperator": { "isVisible": true }
        }, {
          "lblSpendingCategory": {
            "text": kony.i18n.getLocalizedString("kony.mb.approvalsAndRequest.filter.bulkTransactions")
          },
          "lblTotalAmount": "" + bulkRequestsPendingCount,
          "flxSeperator": { "isVisible": true }
        }, {
          "lblSpendingCategory": {
            "text": kony.i18n.getLocalizedString("kony.mb.approvalsAndRequest.filter.sameBank")
          },
          "lblTotalAmount": "" + otherRequestsPendingCount,
          "flxSeperator": { "isVisible": true }
        }, {
          "lblSpendingCategory": {
            "text": kony.i18n.getLocalizedString("kony.mb.approvalsAndRequest.filter.otherRequests")
          },
          "lblTotalAmount": "" + otherRequestsPendingCount,
          "flxSeperator": { "isVisible": true }
        });
        segData.push([{
          "template": "flxPulldownheader",
          "flxSeperatorTop": {
            "isVisible": true
          },
          "flxSeperatorBottom": {
            "isVisible": true
          },
          "lblRecentTransactions": {
            "text": "Pending Requests"
          },
          "flxRecentTranactions": {
            "isVisible": true,

          }
        },
                      reqArray
                     ]);

        //               if(Object.keys(featureActionNames).length !== 0){
        //                  for (key in featureActionNames) {
        //                    for(var i =0;i<featureActionNames[key].length;i++){
        //                        json = {
        //                          "lblSpendingCategory":featureActionNames[key][i].featureActionName,
        //                          "lblTotalAmount":featureActionNames[key][i].myRequestsPending,
        //                        }
        //                        featureNameFinalArr.push(json);

        //                    }
        //                  }

        //               }

      } else if (isApprovalPermissionAccessible && !isRequestPermissionAccessible) {
        //         this.view.flSepReq.isVisible = false;
        //         this.view.flRecentTransReq.isVisible = false;
        //         this.view.flSepReqPending.isVisible = false;
        //         this.view.segRequestPendings.isVisible = false;
        this.view.segRecentTransactions.height = "48%";
        this.view.flxRecentTransactions.height = "20%";
        // this.view.flxViewTransactions.top = "0dp";
        this.view.lblRecenTransactions.text = kony.i18n.getLocalizedString("kony.mb.dashboard.pendingApprovals");
        pendingApprovalsArr = [];
        pendingApprovalsArr.push({
          "lblSpendingCategory": {
            "text": kony.i18n.getLocalizedString("kony.mb.approvalsAndRequest.filter.SingleTransactions")
          },
          "lblTotalAmount": "" + singleApprovalsPendingCount,
          "flxSeperator": { "isVisible": true }
        }, {
          "lblSpendingCategory": {
            "text": kony.i18n.getLocalizedString("kony.mb.approvalsAndRequest.filter.bulkTransactions")
          },
          "lblTotalAmount": "" + bulkApprovalsPendingCount,
          "flxSeperator": { "isVisible": true }
        }, {
          "lblSpendingCategory": {
            "text": kony.i18n.getLocalizedString("kony.mb.approvalsAndRequest.filter.sameBank")
          },
          "lblTotalAmount": "" + otherApprovalsPendingCount,
          "flxSeperator": { "isVisible": true }
        }, {
          "lblSpendingCategory": {
            "text": kony.i18n.getLocalizedString("kony.mb.approvalsAndRequest.filter.otherRequests")
          },
          "lblTotalAmount": "" + otherApprovalsPendingCount,
          "flxSeperator": { "isVisible": true }
        });

        segData.push([{
          "template": "flxPulldownheader",
          "flxSeperatorTop": {
            "isVisible": true
          },
          "flxSeperatorBottom": {
            "isVisible": true
          },
          "lblRecentTransactions": {
            "text": "Pending Approvals"
          },
          "flxRecentTranactions": {
            "isVisible": true,

          }
        },
                      approvalArray
                     ]);
        //              if(Object.keys(featureActionNames).length !== 0){
        //                  for (key in featureActionNames) {
        //                    for(var i =0;i<featureActionNames[key].length;i++){
        //                        json = {
        //                          "lblSpendingCategory":featureActionNames[key][i].featureActionName,
        //                          "lblTotalAmount":featureActionNames[key][i].myApprovalsPending,
        //                        }
        //                        featureNameFinalArr.push(json);

        //                    }                  
        //                  }

        //              }

      }
      if (segData.length === 0) {
        this.view.segRecentTransactions.isVisible = false;
        this.view.flxViewTransactions.isVisible = false;
        this.view.lblNoData.isVisible = true;
      } else {
        this.view.flxApprovalSeg.isVisible = true;
        this.view.segRecentTransactions.isVisible = true;
        this.view.flxViewTransactions.isVisible = true;
        this.view.lblNoData.isVisible = false;
        this.view.segRecentTransactions.removeAll();
        this.view.segRecentTransactions.widgetDataMap = {
          "lblSpendingCategory": "lblSpendingCategory",
          "lblTotalAmount": "lblTotalAmount",
          "lblRecentTransactions": "lblRecentTransactions",
          "flxSeperator": "flxSeperator"
        };
        this.view.segRecentTransactions.setData(segData);
        //             this.view.segRequestPendings.widgetDataMap = {
        //               "lblSpendingCategory": "lblSpendingCategory",
        //               "lblTotalAmount": "lblTotalAmount",
        //             };
        //             if(pendingReqArr.length>0){
        //               this.view.segRequestPendings.setData(pendingReqArr);
        //             }

      }
      var approvalsCounter = singleApprovalsPendingCount + bulkApprovalsPendingCount + otherApprovalsPendingCount;
      var requestsCounter = singleRequestsPendingCount + bulkRequestsPendingCount + otherRequestsPendingCount;
      this.view.lblApprovalsCounter.text = "" + approvalsCounter;
      this.view.lblRequestsCounter.text = "" + requestsCounter;
      this.setupPendingRequestsCounter();
    },

    getApprovalCountsSuccessCallBack: function(response) {
      try {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        this.view.lblTransactionValue.text = "";
        this.view.lblACHTransactionValue.text = "";
        this.view.lblACHFileValue.text = "";
        this.view.lblPendingValue.text = "";
        this.view.lblApprovedValue.text = "";
        this.view.lblRejectedValue.text = "";
        var data = {
          "dataset": [{
            "limitgroupId": "SINGLE",
            "limitgroupName": "Single Payments",
            "featureActions": [{
              "featureActionId": "BILL_PAY_CREATE",
              "featureActionName": "Bill Pay Create",
              "myApprovalsPending": "2",
              "myApprovalsHistory": "2",
              "myRequestsPending": "10",
              "myApprovalsHistory": "2"
            },
                               {
                                 "featureActionId": "P2P_CREATE",
                                 "featureActionName": "P2P transfer",
                                 "myApprovalsPending": "2",
                                 "myApprovalsHistory": "2",
                                 "myRequestsPending": "10",
                                 "myApprovalsHistory": "2"
                               }
                              ]
          }, {
            "limitgroupId": "BULK",
            "limitgroupName": "Bulk Payments",
            "featureActions": [{
              "featureActionId": "BILL_PAY_CREATE",
              "featureActionName": "Bill Pay Create",
              "myApprovalsPending": "2",
              "myApprovalsHistory": "2",
              "myRequestsPending": "10",
              "myApprovalsHistory": "2"
            },
                               {
                                 "featureActionId": "ACH_PAYMNET_CREATE",
                                 "featureActionName": "Ach Payment",
                                 "myApprovalsPending": "2",
                                 "myApprovalsHistory": "2",
                                 "myRequestsPending": "10",
                                 "myApprovalsHistory": "2"
                               },
                              ]
          }, {
            "limitgroupId": "OTHER",
            "limitgroupName": "Other Requests",
            "featureActions": [{
              "featureActionId": "CHEQUE_MANAGEMNET",
              "featureActionName": "Cheque managemnet",
              "myApprovalsPending": "2",
              "myApprovalsHistory": "2",
              "myRequestsPending": "10",
              "myApprovalsHistory": "2"
            }]
          }]
        };

        for (var j = 0; j < data.dataset.length; j++) {

          if (data.dataset[j].limitgroupId === "SINGLE") {
            this.view.lblTransactionValue.text = data.dataset[j].featureActions[0].myApprovalsPending;
            this.view.lblPendingValue.text = data.dataset[j].featureActions[0].myRequestsPending;
          } else if (data.dataset[j].limitgroupId === "BULK") {
            this.view.lblACHTransactionValue.text = data.dataset[j].featureActions[0].myApprovalsPending;
            this.view.lblApprovedValue.text = data.dataset[j].featureActions[0].myRequestsPending;
          } else if (data.dataset[j].limitgroupId === "OTHER")
            this.view.lblACHFileValue.text = data.dataset[j].featureActions[0].myApprovalsPending;
          this.view.lblRejectedValue.text = data.dataset[j].featureActions[0].myRequestsPending;
        }

        //       this.view.lblTransactionValue.text = kony.sdk.isNullOrUndefined(response[0].GeneralTransactionsForMyApproval)?"-": response[0].GeneralTransactionsForMyApproval;
        //       this.view.lblACHTransactionValue.text = kony.sdk.isNullOrUndefined(response[0].ACHTransactionsForMyApproval)?"-": response[0].ACHTransactionsForMyApproval;
        //       this.view.lblACHFileValue.text = kony.sdk.isNullOrUndefined(response[0].ACHFilesForMyApproval)?"-": response[0].ACHFilesForMyApproval;
        //       this.view.lblPendingValue.text = kony.sdk.isNullOrUndefined(response[0].myRequestsWaiting)?"-": response[0].myRequestsWaiting;
        //       this.view.lblApprovedValue.text = kony.sdk.isNullOrUndefined(response[0].myRequestsApproved)?"-": response[0].myRequestsApproved;
        //       this.view.lblRejectedValue.text =  kony.sdk.isNullOrUndefined(response[0].myRequestsRejected)?"-": response[0].myRequestsRejected;
      } catch (er) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
    },
    fetchErrorBack: function(response) {
      try {
        if (!kony.sdk.isNullOrUndefined(response)) {
          var scopeObj = this;
          var errorResponse = "";
          if (!kony.sdk.isNullOrUndefined(response.errorMessage)) {
            errorResponse = response.errorMessage;
          } else {
            errorResponse = "Something went wrong while making service call.";
          }
          this.view.customPopup.lblPopup.text = errorResponse;
          if (!kony.sdk.isNullOrUndefined(this.timerCounter)) {
            this.timerCounter = parseInt(this.timerCounter) + 1;
          } else {
            this.timerCounter = 1;
          }
          var timerId = "timerPopupErrorACHTransactionDetail" + this.timerCounter;
          this.view.flxPopup.skin = "sknflxff5d6e";
          this.view.customPopup.imgPopup.src = "errormessage.png";
          this.view.flxPopup.setVisibility(true);
          kony.timer.schedule(timerId, function() {
            scopeObj.view.flxPopup.setVisibility(false);
          }, 1.5, false);
        }
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      } catch (error) {
        kony.print("frmACHTransactions ACHFileListload_rowclick-->" + error);
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
    },
    setupMonthlySpendingChartsBasedOnPermissions: function() {
      var configManager = applicationManager.getConfigurationManager();
      //var isMonthlySpendingChartsAccessible = applicationManager.getConfigurationManager().checkUserPermission("PERSONAL_FINANCE_MANAGEMENT");
      //checking cash position permission to enable visibility of chart
      var isMonthlySpendingChartsAccessible = applicationManager.getConfigurationManager().checkUserPermission("ACCESS_CASH_POSITION");

      if (isMonthlySpendingChartsAccessible) {
        this.setupMultiLineBarChartDependingOnTypeOfUser(true);
      } else {
        this.setupMultiLineBarChartDependingOnTypeOfUser(false);
      }
      //       this.setupMultiLineBarChartDependingOnTypeOfUser(true);
    },
    setupApprovalsAndRequestsBasedOnPermissions: function() {
      var configManager = applicationManager.getConfigurationManager();
      var isViewGeneralTransactionsEnabled = configManager.getViewGeneralTransactionPermissionsList().some(configManager.checkUserPermission.bind(configManager));
      var isViewACHTransactionsEnabled = configManager.getViewACHTransactionPermissionsList().some(configManager.checkUserPermission.bind(configManager));
      var isViewACHFilesEnabled = configManager.getViewACHFilePermissionsList().some(configManager.checkUserPermission.bind(configManager));
      var isApproveGeneralTransactionsEnabled = configManager.getGeneralTransactionApprovalFeaturePermissionsList().some(configManager.checkUserPermission.bind(configManager));
      var isApproveACHTransactionsEnabled = configManager.getACHTransactionApprovalsFeaturePermissionsList().some(configManager.checkUserPermission.bind(configManager));
      var isApproveACHFilesEnabled = configManager.getACHFileApprovalsFeaturePermissionsList().some(configManager.checkUserPermission.bind(configManager));
      var checkUserPermission = function(permission) {
        return applicationManager.getConfigurationManager().checkUserPermission(permission);
      }
      var allApprovalAndRequestPermission = configManager.getApprovalsAndRequestsFeaturePermissionsList();
      var isApprovalOrRequestPermissionAccessible = allApprovalAndRequestPermission.some(checkUserPermission);
       let custominfoCD = applicationManager.getNavigationManager().getCustomInfo("frmCustomerDashboard");
        if(!kony.sdk.isNullOrUndefined(custominfoCD) && (custominfoCD.reDesignFlow === "true"))
      isApprovalOrRequestPermissionAccessible=false;
      if (isApprovalOrRequestPermissionAccessible) {
        //this.getCounts();
        this.view.flxApprovalRequest.isVisible = true;
        var allApprovalPermission = configManager.getApprovalsFeaturePermissionsList();
        var isApprovalPermissionAccessible = allApprovalPermission.some(checkUserPermission);
        var allRequestPermissionAccessible = configManager.getRequestsFeaturePermissionsList();
        var isRequestPermissionAccessible = allRequestPermissionAccessible.some(checkUserPermission);

        if (isApprovalPermissionAccessible && !isRequestPermissionAccessible) {
          this.view.flxApprovalContainer.isVisible = true;
          this.view.flxRequestContainer.isVisible = false;
          this.view.flxApprovalContainer.width = "90%";
        }
        if (!isApprovalPermissionAccessible && isRequestPermissionAccessible) {
          this.view.flxApprovalContainer.isVisible = false;
          this.view.flxRequestContainer.isVisible = true;
          this.view.flxRequestContainer.left = "8%";
          this.view.flxRequestContainer.width = "92%";
        }
        this.view.flxApprovalTransactionContainer.isVisible = (isViewGeneralTransactionsEnabled && isApproveGeneralTransactionsEnabled);
        this.view.flxApprovalACHTransactionContainer.isVisible = (isViewACHTransactionsEnabled && isApproveACHTransactionsEnabled);
        this.view.flxApprovalACHFileContainer.isVisible = (isViewACHFilesEnabled && isApproveACHFilesEnabled);
      } else {
        this.view.flxApprovalRequest.isVisible = false;
        this.isApprovalRequestCountHidden = true;
      }
    },

    setupChartsDependingOnTypeOfUser: function() {
      //       flxPageIndicator1 - flxApprovalRequest   - Approvals & Requests - Business
      //       flxPageIndicator2 - flxMultiLineBarChart - Bar Chart            - Business
      //       flxPageIndicator3 - flxSummary           - Net Summary          - All
      //       flxPageIndicator4 - flxGraph             - Circle Graph         - Retail
      //       flxPageIndicator5 - flxBarChart          - All Account Balance  - Retail
      try {
        var configManager = applicationManager.getConfigurationManager();

        var isCombinedUser = configManager.isCombinedUser === "true";
        var isSMEUser = configManager.isSMEUser === "true";
        var isMBBUser = configManager.isMBBUser === "true";
        var isRBUser = configManager.isRBUser === "true" || !(isSMEUser || isCombinedUser || isRBUser);
        //		let totalAssetsPermission = applicationManager.getConfigurationManager().checkUserPermission("WEALTH_INVESTMENT_DETAILS_TOTAL_ASSETS_VIEW");
        if (this.combinedFlowName === this.flowConstants.combinedBanking) { //isCombinedUser) {
          this.setUpWealthAssetsChartDependingOnTypeOfUser(this.totalAssetsPermission);
          this.setupApprovalRequestChartDependingOnTypeOfUser(true);
          this.setupMultiLineBarChartDependingOnTypeOfUser(true);
          this.setupSummaryChartDependingOnTypeOfUser(true);
          this.setupGraphChartDependingOnTypeOfUser(true);
          this.setupBarChartDependingOnTypeOfUser(true);
        } else if (this.combinedFlowName === this.flowConstants.businessBanking) {
          this.setUpWealthAssetsChartDependingOnTypeOfUser(this.totalAssetsPermission);
          this.setupApprovalRequestChartDependingOnTypeOfUser(true);
          this.setupMultiLineBarChartDependingOnTypeOfUser(true);
          this.setupSummaryChartDependingOnTypeOfUser(false);
          this.setupGraphChartDependingOnTypeOfUser(false);
          this.setupBarChartDependingOnTypeOfUser(false);
        } else if (isMBBUser) {
          this.setUpWealthAssetsChartDependingOnTypeOfUser(this.totalAssetsPermission);
          this.setupApprovalRequestChartDependingOnTypeOfUser(true);
          this.setupMultiLineBarChartDependingOnTypeOfUser(true);
          this.setupSummaryChartDependingOnTypeOfUser(true);
          this.setupGraphChartDependingOnTypeOfUser(false);
          this.setupBarChartDependingOnTypeOfUser(false);
        } else if (this.combinedFlowName === this.flowConstants.personalBanking) { //isRBUser
          this.setUpWealthAssetsChartDependingOnTypeOfUser(this.totalAssetsPermission);
          this.setupApprovalRequestChartDependingOnTypeOfUser(true);
          this.setupMultiLineBarChartDependingOnTypeOfUser(false);
          this.setupSummaryChartDependingOnTypeOfUser(true);
          this.setupGraphChartDependingOnTypeOfUser(true);
          this.setupBarChartDependingOnTypeOfUser(true);
        } else {
          this.setUpWealthAssetsChartDependingOnTypeOfUser(this.totalAssetsPermission);
          this.setupApprovalRequestChartDependingOnTypeOfUser(true);
          this.setupMultiLineBarChartDependingOnTypeOfUser(false);
          this.setupSummaryChartDependingOnTypeOfUser(true);
          this.setupGraphChartDependingOnTypeOfUser(false);
          this.setupBarChartDependingOnTypeOfUser(false);
        }
        // hide all kinds of business/personal icons in charts
        this.view.flximgApprovalAndRequest.isVisible = false;
        this.view.imgApprovalAndRequest.isVisible = false;
        this.view.flximgCashPositionTitle.isVisible = false;
        this.view.imgCashPositionTitle.isVisible = false;
        this.view.flximgPersonalAccnt.isVisible = false;
        this.view.imgPersonalAccnt.isVisible = false;
        this.view.flximgMonthlySpending.isVisible = false;
        this.view.imgMonthlySpending.isVisible = false;
        this.view.flximgTotalAccountBalancesContainer.isVisible = false;
        this.view.imgTotalAccountBalancesContainer.isVisible = false;

        //setup My approvals and My requests widget based on permissions
        try {
          var configManager = applicationManager.getConfigurationManager();      
          var isAppPresent=configManager.isMicroAppPresent("ApprovalRequestMA");
          if(isAppPresent===true){
            this.setupApprovalsAndRequestsBasedOnPermissions();
          }
        } catch (e) {}

        //setup Monthly spendings chart widget based on permissions
        try {
          var configManager = applicationManager.getConfigurationManager();      
          var isAppPresent=configManager.isMicroAppPresent("FinanceManagementMA");
          if(isAppPresent===true){
            this.setupMonthlySpendingChartsBasedOnPermissions();
            this.setupPFMChart();
          }
        } catch (e) {}
      } catch (e) {
        try {
          kony.print("Exception in setupChartsDependingOnTypeOfUser" + JSON.stringify(e, null, 4));
        } catch (er) {}
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      } finally {
        this.view.forceLayout();
      }
    },
    setupPFMChart: function() {
      try {
        var isPFMPermissionPresent = applicationManager.getConfigurationManager().checkUserPermission("PERSONAL_FINANCE_MANAGEMENT");
        this.setupGraphChartDependingOnTypeOfUser(isPFMPermissionPresent);
      } catch (e) {
        try {
          kony.print("Exception in setupPFMChart" + JSON.stringify(e, null, 4));
        } catch (er) {}
      } finally {
        this.view.forceLayout();
      }
    },
    setUpWealthAssetsChartDependingOnTypeOfUser: function(visibility) {
      var configManager = applicationManager.getConfigurationManager();      
      var isAppPresent=configManager.isMicroAppPresent("PortfolioManagementMA");
      if(isAppPresent===true){
        if (kony.sdk.isNullOrUndefined(visibility) && !(typeof true === "boolean")) visibility = true;
        this.view.flxWealthContainer.isVisible = visibility;
        this.view.flxPageIndicator1.isVisible = visibility;
      }
    },
    setupApprovalRequestChartDependingOnTypeOfUser: function(visibility) {
      var configManager = applicationManager.getConfigurationManager();      
      var isAppPresent=configManager.isMicroAppPresent("ApprovalRequestMA");
      if(isAppPresent===true){
        if (kony.sdk.isNullOrUndefined(visibility) && !(typeof visibility === "boolean")) visibility = true;
        this.view.flxApprovalRequest.isVisible = visibility;
        this.view.flxPageIndicator6.isVisible = visibility;
      }
    },
    setupMultiLineBarChartDependingOnTypeOfUser: function(visibility) {
      var configManager = applicationManager.getConfigurationManager();      
      var isAppPresent=configManager.isMicroAppPresent("FinanceManagementMA");
      if(isAppPresent===true){
        if (kony.sdk.isNullOrUndefined(visibility) && !(typeof visibility === "boolean")) visibility = true;
        this.view.flxMultiLineBarChart.isVisible = visibility;
        this.view.flxPageIndicator5.isVisible = visibility;
      }
    },
    setupSummaryChartDependingOnTypeOfUser: function(visibility) {
      if (kony.sdk.isNullOrUndefined(visibility) && !(typeof visibility === "boolean")) visibility = true;
      this.view.flxSummary.isVisible = visibility;
      this.view.flxPageIndicator2.isVisible = visibility;
    },
    setupGraphChartDependingOnTypeOfUser: function(visibility) {
      var configManager = applicationManager.getConfigurationManager();      
      var isAppPresent=configManager.isMicroAppPresent("FinanceManagementMA");
      if(isAppPresent===true){
        if (kony.sdk.isNullOrUndefined(visibility) && !(typeof visibility === "boolean")) visibility = this.isGraphAvailable;
        this.view.flxGraph.isVisible = this.isGraphAvailable;
        this.view.flxPageIndicator3.isVisible = this.isGraphAvailable;
      }
    },
    setupBarChartDependingOnTypeOfUser: function(visibility) {
      var configManager = applicationManager.getConfigurationManager();      
      var isAppPresent=configManager.isMicroAppPresent("FinanceManagementMA");
      if(isAppPresent===true){
        if (kony.sdk.isNullOrUndefined(visibility) && !(typeof visibility === "boolean")) visibility = true;
        this.view.flxBarChart.isVisible = visibility;
        this.view.flxPageIndicator4.isVisible = visibility;
      }
    },

    setupPaginationDotsBasedOnNumberOfPages: function() {
      var numberOfPages = 0;
      if (this.view.flxWealthContainer.isVisible) numberOfPages++;
      if (this.view.flxApprovalRequest.isVisible) numberOfPages++;
      if (this.view.flxMultiLineBarChart.isVisible) numberOfPages++;
      if (this.view.flxSummary.isVisible) numberOfPages++;
      if (this.view.flxGraph.isVisible) numberOfPages++;
      if (this.view.flxBarChart.isVisible) numberOfPages++;

      this.view.flxPageIndicator1.isVisible = false;
      this.view.flxPageIndicator2.isVisible = false;
      this.view.flxPageIndicator3.isVisible = false;
      this.view.flxPageIndicator4.isVisible = false;
      this.view.flxPageIndicator5.isVisible = false;
      this.view.flxPageIndicator6.isVisible = false;

      switch (numberOfPages) {
        case 6:
          this.view.flxPageIndicator6.isVisible = true;
        case 5:
          this.view.flxPageIndicator5.isVisible = true;
        case 4:
          this.view.flxPageIndicator4.isVisible = true;
        case 3:
          this.view.flxPageIndicator3.isVisible = true;
        case 2:
          this.view.flxPageIndicator2.isVisible = true;
        case 1:
          this.view.flxPageIndicator1.isVisible = true;
        case 0:
          break;
      }
    },

    onClickforMultiBarChart: function(obj1, obj2, obj3, obj4) {

    },
    toUpdateMultiBarChart: function(indexOfMonthInChart) {
      this.view.browserMultiLine.evaluateJavaScript(this.browserMultiLineData + ",'" + indexOfMonthInChart + "')");
    },

    welcomeVIPCustomer: function() {
      var navManager = applicationManager.getNavigationManager();
      var theme = navManager.getCustomInfo("theme");
      if (theme === "GoldTheme")
        applicationManager.getDataProcessorUtility().showToastMessageSuccess(this, kony.i18n.getLocalizedString("kony.mb.vipCustomer.welcomeMsg"));
    },
    bringFlxDashboardToFront: function() {
      this.view.flxDashboard.zIndex = 6;
      this.view.flxDashboardHeader.zIndex = 4;
      this.view.forceLayout();
    },
    bringFlxDashboardHeaderToFront: function() {
      this.view.flxDashboard.zIndex = 7;
      this.view.flxDashboardHeader.zIndex = 6;
      this.view.forceLayout();
    },
    navigate2ApprovalsPending: function() {
      var navManager = applicationManager.getNavigationManager();
      //sasi
      var key = "ApprovalAndRequest";
      navManager.setCustomInfo("backFormFlow", key);
      //sasiend
      navManager.navigateTo({appName: 'ApprovalRequestMA', friendlyName: 'ApprovalReqMain'});
    },
    navigate2RequestsPending: function() {
      var navManager = applicationManager.getNavigationManager();
      //sasi
      var key = "ApprovalAndRequest";
      navManager.setCustomInfo("backFormFlow", key);
      //sasiend
      navManager.navigateTo({appName: 'ApprovalRequestMA', friendlyName: 'RequestList'});
    },


    setupPendingRequestsCounter: function() {
      var configManager = applicationManager.getConfigurationManager();      
      //       var isAppPresent=configManager.isMicroAppPresent("HomepageMA");
      //       if(isAppPresent===true){
      var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AccountsUIModule", "appName": "HomepageMA" });
      var navigationManager = applicationManager.getNavigationManager();
      var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AccountsUIModule", "appName": "HomepageMA" });
      var approvalsCounter,requestsCounter;
      if(configManager.isMicroAppPresent(applicationManager.getConfigurationManager().microappConstants.APPROVALREQUEST)){
        approvalsCounter = presenter.presentationController.getAllApprovalsPendingCount();
        requestsCounter = presenter.presentationController.getAllRequestsPendingCount();
      }      

	    if(!kony.sdk.isNullOrUndefined(approvalsCounter) && !isNaN(approvalsCounter)) {
        this.view.lblApprovalsCounter.text = "" + parseInt(approvalsCounter);
      }
      else{
        this.view.lblApprovalsCounter.text = "-";
      }

      if(!kony.sdk.isNullOrUndefined(requestsCounter) && !isNaN(requestsCounter)){
        this.view.lblRequestsCounter.text = "" + parseInt(requestsCounter);
      }
      else{
        this.view.lblRequestsCounter.text = "-";
      }
      // }
    },

    getAllApprovalsPendingCount : function () {
      return this.allApprovalsPendingCounts;
    },

    fetchCounts: function() {    
      var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "ApprovalsReqUIModule", "appName": "ApprovalRequestMA" });
      presenter.presentationController.getAllCounts();

    },

    goToTopNews: function() {
      try{
      var inputParams = {
        "Topic": "OLUSBUS",
        "pageSize":100,
        "pageOffset":0
      };          
      var wealthModule = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({ "moduleName": "WealthPortfolioUIModule", "appName": "PortfolioManagementMA" }).presentationController;
      wealthModule.getTopNews(inputParams);
      }catch(err) {
        this.setError(err, "goToTopNews");
      }
    },
    goToRecentActivity: function() {
      try{
      var inputParams = {
        "customerId": this.customerId
      }

      var wealthModule = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({ "moduleName": "WealthPortfolioUIModule", "appName": "PortfolioManagementMA" }).presentationController;
      wealthModule.getRecentActivity(inputParams);
        }catch(err) {
        this.setError(err, "goToRecentActivity");
      }

    },
    lineChartData: function(responseObj) {
      try{
      var val = responseObj.response;
	  var isRTL = scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale());
    //  if(this.view.investmentLineChart.currentFilter == "1M"){
        if(this.isPerformanceMetrixEnable && val.performance !== undefined){
          this.isPerformanceMetrixEnable = false;
          this.view.investmentLineChart.currentFilter = val.performance;
          this.view.investmentLineChart.setFilterLabels(this.view.investmentLineChart.currentFilter);
        var unrealizedPLIndicator = val.unRealizedPL;
        var forUtility = applicationManager.getFormatUtilManager();
        var totalVal = forUtility.formatAmountandAppendCurrencySymbol(val.marketValue, val.referenceCurrency);
        var unrealizedPL = forUtility.formatAmountandAppendCurrencySymbol(val.unRealizedPLAmount, val.referenceCurrency);
        //var todaysPL = forUtility.formatAmountandAppendCurrencySymbol(val.todayPLAmount, val.referenceCurrency);
        this.view.lblTotalVal.text = totalVal;
       /* if (val.unRealizedPLAmount >= 0 || unrealizedPLIndicator == "P" || unrealizedPLIndicator == "p") {
          this.view.lblUnrealizedPLValue.skin = "sknIbl2f8523SSPsb45px";
          this.view.lblUnrealizedPLValue.text = val.unRealizedPLPercentage !== "" ? ("+" + unrealizedPL + " (+" + val.unRealizedPLPercentage + "%)") : ("+" + unrealizedPL);
        } else {
          this.view.lblUnrealizedPLValue.skin = "sknIblEE0005SSPsb45px";
          this.view.lblUnrealizedPLValue.text = val.unRealizedPLPercentage !== "" ? ("-" + unrealizedPL + " (-" + val.unRealizedPLPercentage + "%)") : ("-" + unrealizedPL);
        }*/
       /* if (val.todayPLAmount !== undefined && val.todayPLAmount !== '') {
          this.view.flxTodayPL.setVisibility(true);
          if (val.todayPLAmount >= 0) {
            this.view.lblTodayPLValue.skin = "sknIbl2f8523SSPsb45px";
            this.view.lblTodayPLValue.text = "+" + todaysPL + " (+" + val.todayPLPercentage + "%)";
          } else {
            this.view.lblTodayPLValue.skin = "sknIblEE0005SSPsb45px";
            this.view.lblTodayPLValue.text = "-" + todaysPL + " (-" + val.todayPLPercentage + "%)";
          }
        } else {
          this.view.flxTodayPL.setVisibility(false);
        }*/
          
          if (val.performanceValue !== undefined && val.performanceValue !== '') {
          this.view.flxTodayPL.setVisibility(true);
            this.view.lblTodayPL.text = isRTL? ":("+val.performance+") "+kony.i18n.getLocalizedString("i18n.wealth.performance"): kony.i18n.getLocalizedString("i18n.wealth.performance")+" ("+val.performance+"):";     
          if(Number(val.performanceValue.slice(1,)) == 0){
            this.view.lblTodayPLValue.skin = "sknIbl2f8523SSPsb45px";
            this.view.lblTodayPLValue.text = "+"+val.performanceValue.slice(1,) + "%";
          }
          else if (val.performanceValue >= 0) {
            this.view.lblTodayPLValue.skin = "sknIbl2f8523SSPsb45px";
            this.view.lblTodayPLValue.text = val.performanceValue + "%";
          } else {
            this.view.lblTodayPLValue.skin = "sknIblEE0005SSPsb45px";
            this.view.lblTodayPLValue.text = val.performanceValue + "%";
          }
        } else {
          this.view.flxTodayPL.setVisibility(false);
        }
      }
      var graphData = val.graphDuration;
      this.view.investmentLineChart.setChartData(graphData, null, null, null, "PORTFOLIO");
      if (!kony.sdk.isNullOrUndefined(graphData)){
        this.view.flxPortfolioLineChart.setVisibility(true);
        this.view.investmentLineChart.setVisibility(true);
        this.view.lblTotalValue.setVisibility(true);
        this.view.lblTotalVal.setVisibility(true);
        this.view.flxPL.setVisibility(true);
      }
        }catch(err) {
        this.setError(err, "lineChartData");
      }
    },
    chartFilters: {
      ONE_MONTH: '1M',
      ONE_YEAR: '1Y',
      FIVE_YEARS: '5Y',
      YTD: 'YTD',
    },
    onFilterChanged: function(filter) {
      try{
      var configManager = applicationManager.getConfigurationManager();      
      var isAppPresent=configManager.isMicroAppPresent("PortfolioManagementMA");
      if(isAppPresent===true){
        var filterMap = "";
        if (filter === this.chartFilters.ONE_MONTH) {
          filterMap = "OneM";
          this.chartService(filterMap);
        } else if (filter === this.chartFilters.ONE_YEAR) {
          filterMap = "OneY";
          this.chartService(filterMap);
        } else if (filter === this.chartFilters.FIVE_YEARS) {
          filterMap = "FiveY";
          this.chartService(filterMap);
        } else {
          filterMap = "YTD";
          this.chartService(filterMap);
        }
      }
        }catch(err) {
        this.setError(err, "onFilterChanged");
      }
    },
    setRightBarButtonsiOS: function(dashboardcode) {
      if (applicationManager.getPresentationFormUtility().getDeviceName() === "iPhone") {} else {
        this.view.customHeader.imgSearch.setVisibility(false);
        this.view.customHeader.flxSearch.setVisibility(false);
        return;
      }

      try {
        var titleBarAttributes = this.view.titleBarAttributes;
        titleBarAttributes["navigationBarHidden"] = false;
        this.view.titleBarAttributes = titleBarAttributes;
      } catch (err) {
        kony.print("Exception in setRightBarButtonsiOS" + JSON.stringify(err, null, 4));
      }

      try {
        var scope = this;
        var configManager = applicationManager.getConfigurationManager();
        var isCombinedUser = configManager.isCombinedUser === "true";
        var isSMEUser = configManager.isSMEUser === "true";
        var isMBBUser = configManager.isMBBUser === "true";
        var isRBUser = configManager.isRBUser === "true" || !(isSMEUser || isCombinedUser || isRBUser);
        var personalbanking = new kony.ui.BarButtonItem({
          type: constants.BAR_BUTTON_IMAGE,
          style: constants.BAR_ITEM_STYLE_PLAIN,
          enabled: true,
          action: scope.navigateToCombinedSelector,
          tintColor: "FFFFFF00",
          metaData: {
            image: "personalbankingnew.png"
          }
        });
        var businessbanking = new kony.ui.BarButtonItem({
          type: constants.BAR_BUTTON_IMAGE,
          style: constants.BAR_ITEM_STYLE_PLAIN,
          enabled: true,
          action: scope.navigateToCombinedSelector,
          tintColor: "FFFFFF00",
          metaData: {
            image: "businessbankingwhite.png"
          }
        });
        var combinedbanking = new kony.ui.BarButtonItem({
          type: constants.BAR_BUTTON_IMAGE,
          style: constants.BAR_ITEM_STYLE_PLAIN,
          enabled: true,
          action: scope.navigateToCombinedSelector,
          tintColor: "FFFFFF00",
          metaData: {
            image: "combinedbankingheader.png"
          }
        });
        var noimg = new kony.ui.BarButtonItem({
          type: constants.BAR_BUTTON_IMAGE,
          style: constants.BAR_ITEM_STYLE_PLAIN,
          enabled: true,
          tintColor: "FFFFFF00",
          metaData: {
            image: "transparent.png"
          }
        });
        var rightBarButtonItem = noimg;

        if (kony.sdk.isNullOrUndefined(dashboardcode) || typeof dashboardcode != "number") {
          dashboardcode = -1;
        }
        //         if(kony.sdk.isNullOrUndefined(dashboardcode) || typeof dashboardcode != "number") {
        //           dashboardcode = -1;
        //         }
        //
        //         if(!isCombinedUser) {
        //           rightBarButtonItem = noimg;
        //         }
        //         else if(dashboardcode === -1) {
        //           rightBarButtonItem = noimg;
        //         }
        //         else if(dashboardcode === 0) {
        //           rightBarButtonItem = noimg;
        //         }
        //         else if(dashboardcode === 1) {
        //           rightBarButtonItem = personalbanking;
        //         }
        //         else if(dashboardcode === 2) {
        //           rightBarButtonItem = businessbanking;
        //         }
        //         else if(dashboardcode === 3) {
        //           rightBarButtonItem = combinedbanking;
        //         }
      } catch (err) {
        kony.print("Exception in setRightBarButtonsiOS" + JSON.stringify(err, null, 4));
      }

      try {
        this.view.setRightBarButtonItems({
          items: [rightBarButtonItem],
          animated: true
        });
      } catch (err) {
        kony.print("Exception in setRightBarButtonsiOS" + JSON.stringify(err, null, 4));
      }
    },

    loadInvestmentAccounts: function(respData) {
      try{
      this.respData = respData;
	  scope_WealthPresentationController.isTapIntegration = (this.respData.isTapIntegration && this.respData.isTapIntegration === "true" )?true:false;
	  scope_WealthPresentationController.isMockIntegration = (this.respData.isMockIntegration && this.respData.isMockIntegration === true )?true:false;
      var isRTL = scope_WealthPresentationController.rtlLocale.includes(kony.i18n.getCurrentLocale());
      this.view.imgChevron.src = isRTL ? "chevron_reverse.png" : "chevron.png";
	  this.view.imgChevronOne.src = isRTL ? "chevron_reverse.png" : "chevron.png";
	  var configManager = applicationManager.getConfigurationManager();      
      var isAppPresent=configManager.isMicroAppPresent("PortfolioManagementMA");
      if(isAppPresent===true){           
        scope_WealthPresentationController.sortByValueWatchlist = "";
      }
     // this.view.investmentLineChart.currentFilter = "1M";
      var investmentAccData = [];
      var dataFromResponse = respData.PortfolioList ? respData.PortfolioList.portfolioList : [];
      this.view.lblInvestmentSummary.text = kony.i18n.getLocalizedString("i18n.wealth.myInvestmentSummary") + "(" + dataFromResponse.length + ")";
	  if(dataFromResponse.length === 0){
        this.view.lblInvestmentSummary.setVisibility(false);
		this.view.flxAccounts.setVisibility(false);
        this.view.flxPortfolioLineChart.setVisibility(false);
        this.view.flxAccounts.height = "0dp";
        this.view.flxRecentActivity.setVisibility(false);
        
      }
      for (var list in dataFromResponse) {
        var storeData;
        var forUtility = applicationManager.getFormatUtilManager();
        var maskAccountName = CommonUtilities.truncateStringWithGivenLength(dataFromResponse[list].accountName + "....", 26) + CommonUtilities.getLastFourDigit(dataFromResponse[list].accountNumber);
        var profitLossAmount = forUtility.formatAmountandAppendCurrencySymbol(dataFromResponse[list].unRealizedPLAmount, dataFromResponse[list].referenceCurrency);
        var accountBal = forUtility.formatAmountandAppendCurrencySymbol(dataFromResponse[list].marketValue, dataFromResponse[list].referenceCurrency);
        if (dataFromResponse[list].unRealizedPL === "L") {
          storeData = {
            portfolioManagedSince: dataFromResponse[list].portfolioManagedSince,
            joint: {
              isVisible: JSON.parse(dataFromResponse[list].isJointAccount)
            },
            jointDetails: dataFromResponse[list],
            accountName: maskAccountName,
            referenceCurrency: dataFromResponse[list].referenceCurrency,
            portfolioId: dataFromResponse[list].portfolioId,
            profitLossAmt: {
              "skin": "sknIblEE0005SSPR45px",
              "text": dataFromResponse[list].unRealizedPLPercentage !== "" ? ("-" + profitLossAmount + "(-" + dataFromResponse[list].unRealizedPLPercentage + "%" + ")") : "-" + profitLossAmount
            },
            accountBalance: accountBal,
            imageAccountType: {
              "src": "personalaccount.png",
              isVisible: true
            },
            imageBank: {
              isVisible: false
            },
            //accountType: dataFromResponse[list].investmentType,
            accountType: dataFromResponse[list].investmentType !== "Advisory" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Investment.key") : kony.i18n.getLocalizedString("i18n.wealth.advisory"),
            //accountType: "Investment",
            flx: {
              "onClick": function(event, context) {
                this.onInvestmentAccountSelect(event, context);
              }.bind(this)
            }
          }
        } else {
          storeData = {
            portfolioManagedSince: dataFromResponse[list].portfolioManagedSince,
            joint: {
              isVisible: JSON.parse(dataFromResponse[list].isJointAccount ? dataFromResponse[list].isJointAccount : false)
            },
            jointDetails: dataFromResponse[list],
            accountName: maskAccountName,
            referenceCurrency: dataFromResponse[list].referenceCurrency,
            portfolioId: dataFromResponse[list].portfolioId,
            profitLossAmt: {
              "skin": "sknIbl2f8523SSPR45px",
              "text": dataFromResponse[list].unRealizedPLPercentage !== "" ? ("+" + profitLossAmount + " (+" + dataFromResponse[list].unRealizedPLPercentage + "%" + ")") : "+" + profitLossAmount
            },
            accountBalance: accountBal,
            imageAccountType: {
              "src": "personalaccount.png",
              isVisible: true
            },
            imageBank: {
              isVisible: false
            },
            //accountType: dataFromResponse[list].investmentType,
            accountType: dataFromResponse[list].investmentType !== "Advisory" ? kony.i18n.getLocalizedString("kony.mb.common.AccountType.Investment.key") : kony.i18n.getLocalizedString("i18n.wealth.advisory"),
            //accountType: "Investment",
            flx: {
              "onClick": function(event, context) {
                this.onInvestmentAccountSelect(event, context);
              }.bind(this)
            }
          }
        }
        
        storeData.investmentTypeData= dataFromResponse[list].investmentType;
        investmentAccData.push(storeData);
      }
      this.view.segInvestmentAccounts.widgetDataMap = {
        lblAccountName: "accountName",
        lblAccountBal: "profitLossAmt",
        lblAccountBalValue: "accountBalance",
        imgAccountType: "imageAccountType",
        flxBankIcon: "imageBank",
        lblBankName: "accountType",
        lblJoint: "joint",
        flxMain: "flx"
      };
      this.view.segInvestmentAccounts.data = investmentAccData;
        }catch(err) {
        this.setError(err, "loadInvestmentAccounts");
      }
    },

    onInvestmentAccountSelect: function(event, context) {
      try{
      if (this.isPortfolioPermissionAccessible) {
        var navManager = applicationManager.getNavigationManager();
        var rowIndexValue = context.rowIndex;
        
        var portfolioListResponse = this.respData.PortfolioList ? this.respData.PortfolioList.portfolioList : [];
        
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("frmPortfolioRowIndex",portfolioListResponse[context.rowIndex]);
        var Id = context.widgetInfo.data[rowIndexValue].portfolioId;
        var refCurrencyId = context.widgetInfo.data[rowIndexValue].referenceCurrency;
        scope_WealthPresentationController.portfolioManagedSince = context.widgetInfo.data[rowIndexValue].portfolioManagedSince;
        var configManager = applicationManager.getConfigurationManager();      
        
        scope_WealthPresentationController.isAdvisory = (context.widgetInfo.data[rowIndexValue].investmentTypeData==="Advisory")?true:false;
        scope_WealthPresentationController.isInvestmentAccount = !scope_WealthPresentationController.isAdvisory;
        var isAppPresent=configManager.isMicroAppPresent("PortfolioManagementMA");
        if(isAppPresent===true){
          scope_WealthPresentationController.isJointAccount = context.widgetInfo.data[rowIndexValue].joint.isVisible;
          scope_WealthPresentationController.jointAccountDetails = context.widgetInfo.data[rowIndexValue].jointDetails;
          this.goToPortfolioDetails(Id, refCurrencyId);
        }
      }
        }catch(err) {
        this.setError(err, "onInvestmentAccountSelect");
      }
    },
    goToPortfolioDetails: function(portfolioId, refCurrencyId) {
      try{
      scope_WealthPresentationController.portfolioId = portfolioId;
      scope_WealthPresentationController.refCurrencyId = refCurrencyId;
      var params = {
        "portfolioId": portfolioId,
        "navPage": "Portfolio",
        "graphDuration": ""
      };

      var wealthModule = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({ "moduleName": "WealthPortfolioUIModule", "appName": "PortfolioManagementMA" }).presentationController;
      wealthModule.getPortfolioAndGraphDetails(params);
      }catch(err) {
        this.setError(err, "goToPortfolioDetails");
      }
    },
    getMarketNews: function() {
      try{
      var wealthModule = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({ "moduleName": "WealthPortfolioUIModule", "appName": "PortfolioManagementMA" }).presentationController;
      wealthModule.getTodayMarketNews();
      }catch(err) {
        this.setError(err, "getMarketNews");
      }
    },
    getAssetsList: function() {
      try{
      var params = {
        "customerId": this.customerId
      };

      var wealthModule = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({ "moduleName": "WealthPortfolioUIModule", "appName": "PortfolioManagementMA" }).presentationController;
      //applicationManager.getModulesPresentationController("WealthModule");
      wealthModule.getAssetsList(params);
      }catch(err) {
        this.setError(err, "getAssetsList");
      }
    },
    chartService: function(filter) {
      try{
        if(this.isPerformanceMetrixEnable){
          var params = {
        "customerId": this.customerId,
        "graphDuration": ""
      };
        }else{
      var params = {
        "customerId": this.customerId,
        "graphDuration": filter
      };
        }

      var wealthModule = kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({ "moduleName": "WealthPortfolioUIModule", "appName": "PortfolioManagementMA" }).presentationController;
      wealthModule.getDashboardGraphDetails(params);
       }catch(err) {
        this.setError(err, "chartService");
      }
    },
    loadMarketNewsSection: function(respData) {
      try{
      var segData = [];
      var newsDetails = [];
      newsDetails = respData.response;
      if (newsDetails && Object.keys(newsDetails).length > 0) {
        var result = [];
        var inresult = [];
        var innerdata = {};
        for (var i in newsDetails) {
          var subArray = [];
          subArray = newsDetails[i].Fields.Field;
          innerdata = {};
          for (var j in subArray) {
            var dt = subArray[j].DataType;
            var value = subArray[j][dt];
            var keyA = subArray[j].Name;
            var data = {};
            innerdata[keyA] = value;
          }
          inresult.push(innerdata);
        }
        for (var list in inresult) {
          var storeData;
          var change = parseFloat(inresult[list].CF_NETCHNG).toFixed(2);
          var percent = parseFloat(inresult[list].PCTCHNG).toFixed(2);
          var forUtility = applicationManager.getFormatUtilManager();
          var balance = forUtility.formatAmount(inresult[list].CF_LAST);
          if (inresult[list].CF_NETCHNG < 0) {
            storeData = {
              marketName: inresult[list].DSPLY_NAME,
              amount: balance,
              profitLoss: {
                "skin": "sknIblEE0005SSPsb45px",
                "text": change + " (" + percent + "%" + ")"
              },
            }
          } else {
            storeData = {
              marketName: inresult[list].DSPLY_NAME,
              amount: balance,
              profitLoss: {
                "skin": "sknIbl2f8523SSPsb45px",
                "text": "+" + change + " (" + "+" + percent + "%" + ")"
              },

            }
          }
          segData.push(storeData);
        }
        this.view.segMarketNews.widgetDataMap = {
          lblMarketName: "marketName",
          lblProfitLoss: "profitLoss",
          lblAmount: "amount"
        };
        this.view.segMarketNews.data = segData;
      } else {
        var configManager = applicationManager.getConfigurationManager();      
        var isAppPresent=configManager.isMicroAppPresent("PortfolioManagementMA");
        if(isAppPresent===true){
          scope_WealthPresentationController.marketIndexService = false;

          this.checkPermissions();
        }
      }
         }catch(err) {
        this.setError(err, "loadMarketNewsSection");
      }
    },
    loadAssetsDetails: function(resData) {
      try{
      this.view.flxChartSizeToggle.setVisibility(true);
      var forUtility = applicationManager.getFormatUtilManager();
      var colorArray = ["sknFlexslider2C82BE", "sknFlxslider53A8E2", "sknFlxslider24BFEC", "sknFlxslider76DDFB", "sknFlxF5FAF0", "sknFlxE55845", "sknFlxE48444", "sknFlxE8DD46", "sknFlx54D75D", "sknFlx04C477"];
      var assetsList = [];
      var responseObj = resData.response.AssetList;
      // var responseObj = resData.AssetList;
      var segSortData = [];
      var finalData = [];
      // var data1 = [];
      // var data2 = [];
      // var data3 = [];
      // var data4 = [];
      assetsList = responseObj.assets;
      let totalValPerce = assetsList.reduce(function(tot, arr) {
        // return the sum with previous value
        return tot + Math.abs(arr.marketValue);

        // set initial value as 0
      }, 0);
      this.view.lblTotalAssetValue.text = forUtility.formatAmountandAppendCurrencySymbol(responseObj.totalAssetValue, responseObj.referenceCurrency);
      for (var list in assetsList) {
        var assetPercent = this.calculatePercent(assetsList[list].marketValue, totalValPerce);
        var assetMarketValue = forUtility.formatAmountandAppendCurrencySymbol(assetsList[list].marketValue, responseObj.referenceCurrency);

        var storeData = {
          "assetName": assetsList[list].assetGroup + " - " + assetPercent.toString() + "%",
          "assetAmount": assetMarketValue,
          "percent": assetPercent,
        }
        segSortData.push(storeData);
      }
      segSortData.sort(function(a, b) {
        return parseFloat(b.percent) - parseFloat(a.percent);
      });
      this.data1=[];
      this.data2=[];
      this.data3=[];
      this.data4=[];
      for (var i in segSortData) {
        segSortData[i].dotColor = {
          "skin": colorArray[i]
        };
        finalData.push(segSortData[i]);
        this.data1.push(finalData[i].percent + "%");
        this.data2.push(JSON.parse(finalData[i].percent));
        this.data3.push(finalData[i].assetName.split("-")[0]);
        this.data4.push(finalData[i].assetAmount);
      }
      this.view.segDetails.widgetDataMap = {
        lblTitle: "assetName",
        lblValue: "assetAmount",
        flxDot: "dotColor"
      }
      this.view.segDetails.setData(finalData);
      applicationManager.getPresentationUtility().showLoadingScreen();
      this.chartData();
      // this.chartData(data1, data2, data3, data4);
	  
	  var forUtility = applicationManager.getFormatUtilManager();
      var unrealizedPL = forUtility.formatAmountandAppendCurrencySymbol(responseObj.unRealizedPLAmount, responseObj.referenceCurrency);
        
	  if (responseObj.unRealizedPL == "P") {
                this.view.lblUnrealizedPLValue.skin = "sknIbl2f8523SSPsb45px";
                this.view.lblUnrealizedPLValue.text = (unrealizedPL != "" && responseObj.unRealizedPLPercentage != "") ?( "+" + unrealizedPL + "(+" + responseObj.unRealizedPLPercentage + "%)" ):  ((unrealizedPL != "") ? ("+" + unrealizedPL) :  ((responseObj.unRealizedPLPercentage != "") ? ( "(+" + responseObj.unRealizedPLPercentage + "%)") : ""));
				} 
				else {
				this.view.lblUnrealizedPLValue.skin = "sknIblEE0005SSPsb45px";
				 this.view.lblUnrealizedPLValue.text =(unrealizedPL != "" && responseObj.unRealizedPLPercentage != "") ? ( unrealizedPL + "(" + responseObj.unRealizedPLPercentage + "%)") : ((unrealizedPL != "")  ? ( unrealizedPL) : ((responseObj.unRealizedPLPercentage != "") ? ("(" + responseObj.unRealizedPLPercentage + "%)") : ""));
				}  	  
         }catch(err) {
        this.setError(err, "loadAssetsDetails");
      }
    },
    chartData: function() {
      try{
      this.isAssetChartDisplayed = true;
      this.view.brwTotalAssetChart.evaluateJavaScript("AddDonutChart( " + JSON.stringify(this.data1) + " ," + JSON.stringify(this.data2) + "," + JSON.stringify(this.data3) + "," + JSON.stringify(this.data4) + " );");
      applicationManager.getPresentationUtility().dismissLoadingScreen();
         }catch(err) {
        this.setError(err, "chartData");
      }
    },
    calculatePercent: function(part, total) {
      var partAmount = Math.abs(Number(part));
      var totalAmount = Number(total);
      var percent = (partAmount / totalAmount) * 100;
      return percent.toFixed(2);
    },
    checkPermissions: function() {
      try{
      var configManager = applicationManager.getConfigurationManager();
      var checkUserPermission = function(permission) {
        return applicationManager.getConfigurationManager().checkUserPermission(permission);
      }
      //RECENT ACTIVITY CHECK AND PASS PERMISSION TO Component
      //        let recentActivityPermission = applicationManager.getConfigurationManager().checkUserPermission("WEALTH_INVESTMENT_DETAILS_RECENT_ACTIVITY_VIEW");
      let recentActivityPermission = configManager.getRecentActivityPermissionsList().some(checkUserPermission);
      if (recentActivityPermission === false || scope_WealthPresentationController.recentActivityService === false) {
        this.view.flxRecentActivity.isVisible = false;
      }

      // TOP NEWS AND RECENT MARKETS PERMISSIONS CHECK AND PASS TO COMPONENT
      //       let marketIndexPermission = applicationManager.getConfigurationManager().checkUserPermission("WEALTH_MARKET_AND_NEWS_MARKET_VIEW");
      //       let marketTopNewsPermission = applicationManager.getConfigurationManager().checkUserPermission("WEALTH_MARKET_AND_NEWS_TOP_NEWS_DETAILS_VIEW"); 
      let marketIndexPermission = configManager.getMarketIndexPermissionsList().some(checkUserPermission);
      let marketNewsViewDetails = configManager.getNewsDetailsPermissionsList().some(checkUserPermission);
      //        let marketTopNewsPermission = configManager.getTopNewsPermissionsList().some(checkUserPermission);  
      if (marketIndexPermission === false || scope_WealthPresentationController.marketIndexService === false) {
        this.view.flxTopNews.isVisible = false;
        this.view.flxShadowTopNews.isVisible = false;
      } else {
        var configManager = applicationManager.getConfigurationManager();      
        var isAppPresent=configManager.isMicroAppPresent("PortfolioManagementMA");
        if(isAppPresent===true){
          this.getMarketNews();
          this.view.flxTopNews.isVisible = true;
          this.view.flxShadowTopNews.isVisible = true;
        }
      }
      if (marketNewsViewDetails === false || scope_WealthPresentationController.marketNewsService === false) {
        this.view.flxTopNewsLink.isVisible = false;
      }
      // CHECK ASSETS PERMISSIONS
      //  let assetsPermission = applicationManager.getConfigurationManager().checkUserPermission("WEALTH_INVESTMENT_DETAILS_TOTAL_ASSETS_VIEW");
      let assetsPermission = configManager.getTotalAssetsPermissionsList().some(checkUserPermission);
      this.totalAssetsPermission = scope_WealthPresentationController.assetsService && assetsPermission;
      if (scope_WealthPresentationController.assetsService === false || assetsPermission === false) {
        this.view.flxWealthContainer.isVisible = false;
        this.view.flxPageIndicator1.isVisible=false;
      }
      else if (scope_WealthPresentationController.assetsService === true && assetsPermission === true) 
      {
        this.view.flxPageIndicator1.isVisible=true;
        this.view.flxWealthContainer.isVisible = true;
      }

      // CHECK PORTOFOLIO PERMISSIONS

      this.isPortfolioPermissionAccessible = configManager.getPortfolioPermissionsList().some(checkUserPermission);

      // CHECK INVESTMENT SUMMARY PERMISSIONS
      //    let investSummaryPermission = applicationManager.getConfigurationManager().checkUserPermission("WEALTH_INVESTMENT_DETAILS_INVESTMENT_SUMMARY_VIEW");
      let investSummaryPermission = configManager.getInvestmentSummaryPermissionsList().some(checkUserPermission);
      if (investSummaryPermission === true) {
        if(this.respData){
        if(scope_WealthPresentationController.dashboardErrorFlow === true || (this.respData && this.respData.PortfolioList && this.respData.PortfolioList.portfolioList && this.respData.PortfolioList.portfolioList.length === 0)){
          this.view.lblInvestmentSummary.isVisible = false;
          this.view.flxRecentActivity.isVisible = false;
          if(this.respData.AssetList.assets.length === 0){
          this.view.flxChartSizeToggle.setVisibility(false);
          // this.view.flxWealthContainer.isVisible = false;
            this.view.flxTotalAssets.isVisible = false;
            this.view.flxChartDetails.isVisible = false;
            this.view.flxSeparate.isVisible = false;
        this.view.flxPageIndicator1.isVisible=false;
          }else{
            this.view.flxChartSizeToggle.setVisibility(true);
           // this.view.flxWealthContainer.isVisible = true;
            this.view.flxTotalAssets.isVisible = true;
            this.view.flxRecentActivity.isVisible = true;
            this.view.flxChartDetails.isVisible = true;
            this.view.flxSeparate.isVisible = true;
        this.view.flxPageIndicator1.isVisible=true;
          }
        }else{
          this.view.lblInvestmentSummary.isVisible = true;
          this.view.flxRecentActivity.isVisible = true;
        }
        this.view.flxPortfolioValues.isVisible = true;
        this.view.segInvestmentAccounts.isVisible = true;
        this.view.flxAccountsHeaderDashboardExact.isVisible = true;
        }else{
          if(scope_WealthPresentationController.dashboardErrorFlow === true )
          {
            this.view.lblInvestmentSummary.isVisible = false;
          }else{
            this.view.lblInvestmentSummary.isVisible = true;
            this.view.flxRecentActivity.isVisible = true;
          }
        }

      }

      if (scope_WealthPresentationController.investSummaryService === false) {
        this.view.flxPortfolioLineChart.isVisible = false;
        this.view.flxPortfolioValues.isVisible = false;
      } else {
        this.view.flxPortfolioLineChart.isVisible = true;
        this.view.flxPortfolioValues.isVisible = true;
      }
      this.view.forceLayout();
         }catch(err) {
        this.setError(err, "checkPermissions");
      }
    },
    setError: function(errorMsg, method) {
      var scope = this;
      var errorObj = {
        "method" : method,
        "error": errorMsg
      };
      var configManager = applicationManager.getConfigurationManager();      
      if(configManager.isMicroAppPresent("PortfolioManagementMA") || configManager.isMicroAppPresent("WealthOrderMA")){
      var wealthModule = applicationManager.getModulesPresentationController("WealthPortfolioUIModule");
        wealthModule.onError(errorObj);
      }
    },
    
    flxBackOnClick: function() {
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo({
          "appName": "HomepageMA",
          "friendlyName": "AccountsUIModule/frmUnifiedCustomerDashboard"
      });
    },
  };
});