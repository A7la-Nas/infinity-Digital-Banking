define(['CampaignUtility', 'CommonUtilities'], function(CampaignUtility, CommonUtilities) {
  var count = "";
   return{
    segdata:[],
    favouriteCustomers:[],
    adsHided: false,
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
    init: function() {
      this.initActions();
      this.renderTitleBar();
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

    onpreShow: function () {
      try {
          let custominfo = applicationManager.getNavigationManager().getCustomInfo("frmCustomerDashboard");
          let accsLen = !kony.sdk.isNullOrUndefined(custominfo.accountData) ? custominfo.accountData.length : 0;
          this.view.customSearchbox.tbxSearch.onTextChange = this.searchCustomer;
          this.hideFIlterFlex();
       	   var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AuthUIModule", "appName": "AuthenticationMA" });
          if(applicationManager.getConfigurationManager().isMicroAppPresent(applicationManager.getConfigurationManager().microappConstants.CAMPAIGN)){
            presenter.presentationController.fetchPostloginAds();
          }
         // this.filterConfig(accsLen);
         // this.searchBarConfig(accsLen);
          if (custominfo.searchConfigCount === "true") {
             this.view.flxSearchAccounts.setVisibility(true);
          } 
          if (custominfo.filterConfigCount === "true") {
             this.view.flxFilterCustomer.setVisibility(true);
          } 
          if ((custominfo.searchConfigCount === "true") && 
              !(!kony.sdk.isNullOrUndefined(custominfo.filterConfigCount) && (custominfo.filterConfigCount === "true")))
             this.view.flxSearchFilterSeparator.setVisibility(false);
          if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
             this.view.flxMenu.isVisible = false;
          } else {
             this.view.flxMenu.isVisible = true;
          }
          var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AuthUIModule", "appName": "AuthenticationMA" });
         // Footer Menu
          if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
            this.footerMenuUtility.setFooterMenuItems(this, "flxPrimary500");
          }
          this.view.segCustomers.onRowClick = this.customerSegmentOnClick.bind(this);
          if("upgrade" === custominfo.showUpgradePopup.toLowerCase())
          	presenter.presentationController.showDashboardUpgrade();
      } catch (e) {
        kony.print("Exception in onpreShow" + e);
      }
    },
    
    postShow: function(){
      try {
        this.setupPendingRequestsCounter();
        try {
          if (this.showPwdWarningFlag) {
            this.showPwdWarning();
          }
          this.showOutageAlert();
        } catch (e) {
          try {
            kony.print("Exception in postshow" + JSON.stringify(e, null, 4));
          } catch (er) {}
        }
      } catch (e) {}
    },
     
    initActions: function(){
      const scopeObj = this;
      let custominfo = applicationManager.getNavigationManager().getCustomInfo("frmCustomerDashboard");          
      this.view.flxFilterCustomer.onClick =function(){
        scopeObj.showFIlterFlex();
      };
      this.view.flxSearchAccounts.onClick =function(){
        scopeObj.showSearchFlex();
      };
      this.view.customHeader.btnRight.onClick =function(){
        scopeObj.btnCancelOnClick();
      }; 
      this.view.imgFilterClose.isVisible = true;
              
      this.view.flxViewCustomers.onClick = this.setupFilteronNavigate;
      this.view.flxViewFavCustomers.onClick =function(){
        scopeObj.view.imgFilterClose2.setVisibility(true);
        scopeObj.view.imgFilterClose.setVisibility(false);
        scopeObj.hideFIlterFlex();
        scopeObj.viewFavouriteCustomers(scopeObj.segdata)
      };
      this.setCustomerData(custominfo.accountData);
	  this.view.customHeader.lblLocateUs.text="Customers List ("+ custominfo.accountData.length+")";
      var configManager = applicationManager.getConfigurationManager();
       var MenuHandler = applicationManager.getMenuHandler();
       MenuHandler.setUpHamburgerForForm(scopeObj, configManager.constants.MENUACCOUNTS);
      this.view.customSearchbox.tbxSearch.onTextChange = this.searchCustomer;
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
	  this.view.onNavigate = this.onNavigate;
    },
     setupFilteronNavigate:function()
      {
        const scopeObj = this;
        scopeObj.view.imgFilterClose.setVisibility(true);
        scopeObj.view.imgFilterClose2.setVisibility(false);
        scopeObj.hideFIlterFlex();
        let custominfo = applicationManager.getNavigationManager().getCustomInfo("frmCustomerDashboard");
        scopeObj.viewAllCustomers(custominfo.accountData);
      },
    renderTitleBar: function () {
      let deviceUtilManager = applicationManager.getDeviceUtilManager();
      let isIphone = deviceUtilManager.isIPhone();
      if (!isIphone) {
                this.view.flxOverviewTitle.isVisible = true;
                this.view.lblOverview.text = "Overview";//kony.i18n.getLocalizedString("kony.mb.legalEntity.SwitchEntity");
        		this.view.flxMain.top = "150dp";
      } else {
                this.view.flxOverviewTitle.isVisible = false;
                this.view.title = "Overview";//kony.i18n.getLocalizedString("kony.mb.legalEntity.SwitchEntity");
        		this.view.flxMain.top = "110dp";
      }
    },
     
    btnCancelOnClick: function(){
      var scopeObj = this;
      let custominfo = applicationManager.getNavigationManager().getCustomInfo("frmCustomerDashboard");  
      scopeObj.hideSearchFlex();
      scopeObj.view.segCustomers.isVisible = true;
      if(scopeObj.view.imgFilterClose2.isVisible === true){
          scopeObj.setCustomerData(scopeObj.favouriteCustomers);
          scopeObj.view.customHeader.lblLocateUs.text = "Customers List"+" ("+scopeObj.favouriteCustomers.length+")";
      }else{
          scopeObj.view.customHeader.lblLocateUs.text = "Customers List"+" ("+custominfo.accountData.length+")";
          scopeObj.setCustomerData(custominfo.accountData);   
      }
    },

    setCustomerData: function(customerAccount) {
            var scope = this;
         //   this.view.PaginationContainer.setLowerLimit(1);
         //   this.view.PaginationContainer.setPageSize(3);
            scope.view.segCustomers.rowTemplate = "flxCustomerAccountList";
            var dataMap = {
                "lblCustomerName": "lblCustomerName",
                "lblCustomerID": "lblCustomerID",
                "lblNumOfAccounts": "lblNumOfAccounts",
               // "lblBankName": "lblBankName",
                "favouriteStatus":"favouriteStatus",
              	"membershipId":"membershipId",
              	"accountsCount":"accountsCount",
                "flxSeparator":"flxSeparator"
            }
            scope.view.segCustomers.widgetDataMap = dataMap;
            if (customerAccount !== undefined) {
                var data = customerAccount.map(function(res) {
                    return {
                        "lblCustomerName": {
                            "text": res.MembershipName
                        },
                        "lblCustomerID": {
                            "text": "Customer ID:" + res.membershipId
                        },
                        "lblNumOfAccounts": {
                            "text": res.accountsCount + " Accounts"
                        },
                        "favouriteStatus": {
                            "text": res.favouriteStatus
                        },
                        "membershipId": res.membershipId,
                      	"MembershipName": res.MembershipName,
                      	"accountsCount": res.accountsCount,
                      	"flxSeparator": {
                            "isVisible": true
                        }
                    }
                });
              for(var j=0; j<data.length; j++){
                  if(data.length === j+1){
                    data[j].flxSeparator = {
                        "isVisible": false
                      };
                  }else{
                    data[j].flxSeparator = {
                        "isVisible": true
                      };
                  }
               }
                // scope.setPagination({
                //     'show': true,
                //     'offset': this.offset
                // }, customerAccount);
              scope.segdata = data;
              scope.view.lblNumOfCustomers.text = kony.i18n.getLocalizedString("konybb.userMgmt.Customers")+" ("+this.segdata.length+")";
              scope.view.segCustomers.setData(data);
              scope.view.segCustomers.isVisible = true;
              scope.view.forceLayout();
              //  scope.initializeSearchAndFilterActions(customerAccount);
          }            
    },
    setSegAccountListData: function(){
      this.view.segCustomers.widgetDataMap = {
        "lblCustomerName": "lblCustomerName",
        "lblCustomerID": "lblCustomerID",
        "lblNumOfAccounts":"lblNumOfAccounts",
        "favouriteStatus":"favouriteStatus",
        "flxSeparator": "flxSeparator"
      };
      var segdata = [];
      for (var i = 0; i < 12; i++) {
        var eachdata = {
          "lblCustomerName" : "Infinity"+i,
          "lblCustomerID": (i+1)+"123",
          "lblNumOfAccounts": (i+1)*3 + " Accounts",
          "favouriteStatus":i>4?"true":"false",
          "flxSeparator": {
            "isVisible": true
          }
        };
        segdata.push(eachdata);
      }
      this.segdata=segdata;
      var filterType=(this.view.imgFilterClose2.isVisible===true)?"FavCustomers":"AllCustomers";
      if(filterType=="FavCustomers")
      var data=this.favouriteCustomers;
      else
      var data=this.segdata;
      this.view.segCustomers.setData(data);
      this.view.segCustomers.isVisible = true;
      this.view.lblNumOfCustomers.text = kony.i18n.getLocalizedString("konybb.userMgmt.Customers")+" ("+this.segdata.length+")";
      this.view.customHeader.lblLocateUs.text="Customers List ("+segdata.length+")";
      //       if(segdata.length>10){
      //         this.view.flxEngageAdvert.setVisibility(true);
      //         this.view.flxShadowTopNews.setVisibility(true);
      //       }
      //       else{
      //         this.view.flxEngageAdvert.setVisibility(false);
      //         this.view.flxShadowTopNews.setVisibility(false);
      //       }

    },
    showFIlterFlex: function (){
      this.view.flxFilterTypes.setVisibility(true);
      this.view.flxAccountShadow.setVisibility(true);
    },

    hideFIlterFlex: function (){
      this.view.flxFilterTypes.setVisibility(false);
      this.view.flxAccountShadow.setVisibility(false);
    },

    showSearchFlex: function (){
      this.view.flxDashboardHeader.setVisibility(false);
      this.view.flxTitle.setVisibility(true);
      this.view.flxSelectedAccounts.setVisibility(false);
      this.view.flxFilterTypes.setVisibility(false);
      this.view.flxAccountShadow.setVisibility(false);
      this.view.flxSearchContainer.setVisibility(true);
      this.view.customSearchbox.tbxSearch.text="";
      this.view.customHeader.lblLocateUs.text = "Customers List" + " (" + this.segdata.length + ")";
   //   this.view.lblCustomerSearchList.text = "Customers List"+" ("+this.segdata.length+")";
      this.view.flxMain.top="50dp";
      this.view.forceLayout();
    },
    hideSearchFlex: function (){
      this.view.customSearchbox.tbxSearch.text="";
      this.view.flxDashboardHeader.setVisibility(true);
      this.view.flxTitle.setVisibility(false);
      this.view.flxMain.top="150dp";
      this.view.flxSearchContainer.setVisibility(false);
      this.view.flxSelectedAccounts.setVisibility(true);
    },
    searchCustomer: function(){
      this.view.segCustomers.isVisible = true;
      //var filterKey = this.view.lblSelectedAccountType.text;
      var searchKey = this.view.customSearchbox.tbxSearch.text.trim().toLowerCase();
      var customerData = {};
      var scopeObj = this;
      var configurationManager = applicationManager.getConfigurationManager();
      var filterType=(this.view.imgFilterClose2.isVisible===true)?"FavCustomers":"AllCustomers";
      if(filterType=="FavCustomers")
      var data=this.favouriteCustomers;
      else
        var data=this.segdata;
      var searchedData = scopeObj.searchKeyAndGetData(data, searchKey);
      scopeObj.setFormattedListToSegment(searchedData);
      this.view.customHeader.lblLocateUs.text="Customers List ("+ searchedData.length+")";
      this.view.forceLayout();
    },
    searchKeyAndGetData: function(customerList, searchKey) {
      var searchedCustomers = [];
      var accountKeys = [];
      if (searchKey !== null || searchKey !== undefined || searchKey !== "") {
        customerList.forEach(function(data) {
          if (data.lblCustomerName["text"].toLowerCase().includes(searchKey) ||
              data.lblCustomerID["text"].includes(searchKey) ||
              data.lblNumOfAccounts["text"].includes(searchKey)) {

            searchedCustomers.push(data);
          }
        });  
      }
      else{
        searchedCustomers= customerList;
      }
      return searchedCustomers;
    },
    setFormattedListToSegment: function(matchedCustomerData) {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmAccountListController : setCustomerListToSegment ####");
        this.view.segCustomers.widgetDataMap = {
          "lblCustomerName": "lblCustomerName",
          "lblCustomerID": "lblCustomerID",
          "lblNumOfAccounts":"lblNumOfAccounts",
          "favouriteStatus":"favouriteStatus",
          "flxSeparator": "flxSeparator"
        };
        if(matchedCustomerData.length > 0) {
          this.view.segCustomers.isVisible = true;

        } else {
          this.view.segCustomers.isVisible = false;
        }
        this.view.segCustomers.setData(matchedCustomerData);
        //         if(matchedCustomerData.length>10){
        //           this.view.flxEngageAdvert.setVisibility(true);
        //           this.view.flxShadowTopNews.setVisibility(true);
        //         }
        //         else{
        //           this.view.flxEngageAdvert.setVisibility(false);
        //           this.view.flxShadowTopNews.setVisibility(false);
        //         }
        this.view.forceLayout();
      } catch (err) {
        loggerManager.log("#### in catch " + JSON.stringify(err) + " ####");
      }
    },
    viewFavouriteCustomers:function(customerList){
      var favouriteCustomers = [];
      if (customerList.length >0)  {
        customerList.forEach(function(data) {
          if ((data.favouriteStatus["text"] === "true") || (data.favouriteStatus["text"] === "1")) {
            favouriteCustomers.push(data);
          }
        });  
      }
      this.view.lblNumOfCustomers.text = kony.i18n.getLocalizedString("konybb.userMgmt.Customers")+" ("+favouriteCustomers.length+")";
      this.segdata = favouriteCustomers;
      this.favouriteCustomers=favouriteCustomers;
      this.setFormattedListToSegment(this.favouriteCustomers);

    },
    viewAllCustomers:function(customerAccount){
   //   this.view.lblNumOfCustomers.text = kony.i18n.getLocalizedString("konybb.userMgmt.Customers")+"("+this.segdata.length+")";
   //   this.setFormattedListToSegment(this.segdata);
      this.setCustomerData(customerAccount);
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
     
    setupPendingRequestsCounter: function() {
      var configManager = applicationManager.getConfigurationManager();      
      var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AccountsUIModule", "appName": "HomepageMA" });
      var navigationManager = applicationManager.getNavigationManager();
      var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AccountsUIModule", "appName": "HomepageMA" });
      var approvalsCounter,requestsCounter;
      if(configManager.isMicroAppPresent(applicationManager.getConfigurationManager().microappConstants.APPROVALREQUEST)){
        approvalsCounter = presenter.presentationController.getAllApprovalsPendingCount();
        requestsCounter = presenter.presentationController.getAllRequestsPendingCount();
      }      

	    if(!kony.sdk.isNullOrUndefined(approvalsCounter) && !isNaN(approvalsCounter)) {
        this.view.lblPendingApprovalsCount.text = "" + parseInt(approvalsCounter);
      }
      else{
        this.view.lblPendingApprovalsCount.text = "0";
      }

      if(!kony.sdk.isNullOrUndefined(requestsCounter) && !isNaN(requestsCounter)){
        this.view.lblPendingRequestsCount.text = "" + parseInt(requestsCounter);
      }
      else{
        this.view.lblPendingRequestsCount.text = "0";
      }
    },
     
     /**
      Method to enable or disable search bar based on spotlight configuration.
      */
    searchBarConfig: function(accsLen) {
       var searchConfigCount = applicationManager.getConfigurationManager().getConfigurationValue('searchCustomerCount');
       if (this.view.imgFilterClose2.isVisible !== true) {
          if (searchConfigCount > accsLen || searchConfigCount === 0) {
             this.view.flxSearchAccounts.setVisibility(false);
           return true;
       } else {
           this.view.flxSearchAccounts.setVisibility(true);
       }
       return false;
       }
    },
        
    /**
    Method to enable or disable advanced filter and dropdown based on spotlight configuration.
    */
    filterConfig: function(accsLen) {
       var filterConfigCount = applicationManager.getConfigurationManager().getConfigurationValue('dropdownCustomerCount');
       if (this.view.imgFilterClose2.isVisible !== true) {
           if (filterConfigCount > accsLen || filterConfigCount === 0) {
              this.view.flxFilterCustomer.setVisibility(false);
              return true;
           } else {
              this.view.flxFilterCustomer.setVisibility(true);
           }
           return false;
      }
    },
     
    customerSegmentOnClick: function(){
      var index = this.view.segCustomers.selectedIndex[1];
      var rowId = this.view.segCustomers.data[index];
      applicationManager.getPresentationUtility().showLoadingScreen();
      let custominfo = applicationManager.getNavigationManager().getCustomInfo("frmCustomerDashboard");
      custominfo.MembershipName = rowId.MembershipName;
      custominfo.selectedRow = rowId;
      applicationManager.getNavigationManager().setCustomInfo("frmCustomerDashboard", custominfo);
      var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AccountsUIModule", "appName": "HomepageMA" });
	  accountMod.presentationController.showCustomerAccounts(rowId.membershipId);
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
    }
     
  };
});