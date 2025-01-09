define(["CommonUtilities"], function(CommonUtilities) {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
      this.AsyncManager = applicationManager.getAsyncManager();
      this.LoggerManager = applicationManager.getLoggerManager();
      this.preloginAdData = [];
      this.gestID = "";
      this.gestIDs = [];
      this.numOfAds = 0;
      this.xOffset = 0;
      this.imageObjArray = [];
      this.imageDownloadFailureCount = 0;
      this.imageDownloadSuccessCount = 0;
      this.currAdFlex = 1;
      this.adsHided = false;
      this.isSwipeDone = false;
      this.isTapDone = false;
      this.isAdsCallExecuted = false;
      this.isTimerOn = false;
    },
    initGettersSetters: function() {

    },
    getModule: function({appName, moduleName}) {
      return kony.mvc.MDAApplication.getSharedInstance().moduleManager.getModule({ 
        appName, 
        moduleName
      });
    },
    adsPreshow: function() {
      const configManager = applicationManager.getConfigurationManager();
      const isCampaignMAPresent = configManager.isMicroAppPresent('CampaignMA');      
      if(isCampaignMAPresent){
        const currFormName = kony.application.getCurrentForm().id;
        this.resetAdsUI();
        if(currFormName === "frmLogin"){
          this.fetchPreloginAds();
        } else {
          this.fetchPostLoginAds();
        }
      } else {
        this.hideAds();
      }
//       if(!this.adsHided){
//         this.resetAdsUI();
//         if(this.canPreloginAdsRenderedToUI()){
//           var preloginAdData = this.fetchPreloginAds();
//           if(preloginAdData){
//             this.bindAdData(preloginAdData);
//           }
//         }
//       } else {
//         this.hideAds();
//       }
    },
    postShow: function(){
      const currFormName = kony.application.getCurrentForm().id;
      if (currFormName === "frmLogin") {
        if (kony.net.isNetworkAvailable(constants.NETWORK_TYPE_ANY) && !this.isAdsCallExecuted) {
          this.view.flxLoadingIndicator.setVisibility(true);
          applicationManager.getPresentationUtility().showLoadingScreen();
        }
        if (CommonUtilities.CLIENT_PROPERTIES &&
            (CommonUtilities.CLIENT_PROPERTIES.MB_ENABLE_INAPP_CAMPAIGNS === undefined ||
             (CommonUtilities.CLIENT_PROPERTIES.MB_ENABLE_INAPP_CAMPAIGNS &&
              CommonUtilities.CLIENT_PROPERTIES.MB_ENABLE_INAPP_CAMPAIGNS.toUpperCase() === "FALSE"))
           ) {
          this.view.flxLoadingIndicator.setVisibility(false);
          const AuthUIModule = this.getModule({
            appName: "AuthenticationMA",
            moduleName: "AuthUIModule",
          });
          if (!AuthUIModule.presentationController.isFaceLoginInProgress && !this.isAdsCallExecuted) {
            applicationManager.getPresentationUtility().dismissLoadingScreen();
          }
        }
      }      
    },
    resetAdsUI: function(){
      this.view.flxPreLoginCampaigns.setVisibility(true);
      //this.view.flxBottom.setVisibility(true);
      //this.view.flxSelectLanguage.setVisibility(false);
      //this.view.flxBottom.top = "72%";
      this.view.imgBg.setVisibility(false);
      this.removeGestureRecognisers();
      this.xOffset = 0;
      this.imageObjArray = [];
      this.currAdFlex = 1;
      this.imageDownloadFailureCount = 0;
      this.imageDownloadSuccessCount = 0;
      this.isSwipeDone = false;
      this.isTapDone = false;
      this.view.flxScrollContainerAds.setContentOffset({
        x: this.xOffset,
        y: 0
      }, true);
      // this.view.flxBottom.skin = "sknFlxffffffmb";
      this.view.flxLoadingIndicator.setVisibility(true);      
      if (
        CommonUtilities.CLIENT_PROPERTIES &&
        (CommonUtilities.CLIENT_PROPERTIES.MB_ENABLE_INAPP_CAMPAIGNS === undefined ||
         (CommonUtilities.CLIENT_PROPERTIES.MB_ENABLE_INAPP_CAMPAIGNS &&
          CommonUtilities.CLIENT_PROPERTIES.MB_ENABLE_INAPP_CAMPAIGNS.toUpperCase() === "FALSE"))
      ) {
        this.view.flxLoadingIndicator.setVisibility(false);
      }
      this.view.imgLoadingIndicator.src = "loadersmall.gif";
      this.view.flxAdInfo.setVisibility(false);
      for(let i=1; i<=5; i++){
        this.view["flxAd" + i].setVisibility(false);
        this.view["imgAd" + i].src = null;
        this.view["flxProgressBarButton" + i].setVisibility(false);
      }
      this.view.flxProgressBar.forceLayout();
      this.view.flxProgressBar.setVisibility(true);
    },
    bindAdData: function(preloginAdData) {
      if(preloginAdData && preloginAdData.length!==0) {
        this.imageObjArray = [];
        this.preloginAdData = preloginAdData;
        this.numOfAds = preloginAdData.length;
        this.imageDownloadSuccessCount = 0;
        this.imageDownloadFailureCount = 0;
        let param;
        const date = new Date();
        const deviceUtilManager = applicationManager.getDeviceUtilManager();
        this.view.flxLoadingIndicator.setVisibility(true);
        for(let j = 1; j <= this.numOfAds; j++){
          param = date.getTime();
          this.view["flxAd"+j].setVisibility(false);
          this.view["flxAd"+j].left = parseInt(deviceUtilManager.getDeviceInfo().screenWidth) + "dp";
          this.view["imgAd"+j].src = preloginAdData[j-1].imageURL + "?Param=" + param;
        }
      } else {
        this.hideAds();
      }
      this.setRenderPreloginAdsToTrue();
    },
    removeGestureRecognisers: function() {
      if(this.gestIDs.length !== 0) {
        let swipeGestureID = this.gestIDs[0];
        let tapGestureID = this.gestIDs[1];
        this.view.flxScrollContainerAds.removeGestureRecognizer(swipeGestureID);
        this.view.flxScrollContainerAds.removeGestureRecognizer(tapGestureID);
        this.gestIDs = [];
      }
      if(this.gestID !== "") {
        this.view.flxPreLoginCampaigns.removeGestureRecognizer(this.gestID);
      }
    },
    setGestureRecogniser: function() {      
      if(this.gestIDs.length === 0) {
        var swipeGestID = this.view.flxScrollContainerAds.setGestureRecognizer(2, {
          fingers: 1,
          swipedistance: 20,
          swipevelocity: 60
        }, this.onAdSwipe);
        var tapGestID = this.view.flxScrollContainerAds.setGestureRecognizer(1, {
          fingers: 1,
          taps:1
        }, this.onAdTap);
        this.gestIDs[0] = swipeGestID;
        this.gestIDs[1] = tapGestID;
      }
      this.view.rtxDetails.onClick = this.onAdTap;
    },
    onAdDownloadComplete: function(issuccess,adNumber){
      if(kony.application.getCurrentForm().id==="frmLogin" && this.onDownloadComplete){
        this.onDownloadComplete();
      }
      const AuthUIModule = this.getModule({
        appName: "AuthenticationMA",
        moduleName: "AuthUIModule",
      });
      if(issuccess) {
        let i = this.imageDownloadSuccessCount;//this.imageObjArray.length;
        this.view["flxAd" + adNumber].setVisibility(true);
        this.alignFlexInScrollContainer(i + 1);
        if(i === 0) {
          this.setGestureRecogniser();
          this.setDataForAd(adNumber);
          // this.LoggerManager.setCustomMetrics(this ,true, "#PreLoginAds Displayed"); MICROAPP: setCustomMetrics was failing, hence commenting
          this.isAdsCallExecuted = true;
          if (AuthUIModule.presentationController.isappInitDone()){
            this.view.flxLoadingIndicator.setVisibility(false);
            if(AuthUIModule.presentationController.isFaceLoginInProgress === false)
              applicationManager.getPresentationUtility().dismissLoadingScreen();
          }
        }
        this.imageObjArray[adNumber-1] = adNumber;
        this.imageDownloadSuccessCount++;
      } else {
        this.imageDownloadFailureCount++;
        this.isAdsCallExecuted = true;
        this.view["flxAd" + adNumber].setVisibility(false);
        if (this.imageDownloadFailureCount === this.numOfAds) {
          this.LoggerManager.log(
            "####All Prelogin Ad's download failed\n####Therefore Hiding Them"
          );
          this.onAllAdsDownloadFailure();
        }
      }
      if (
        this.imageObjArray.length >= 1 &&
        this.imageDownloadSuccessCount + this.imageDownloadFailureCount === this.numOfAds
      ) {
        this.onAllAdsDownloadComplete();
      }
    },
    onHide: function () {
		try{
			kony.timer.cancel("slide5");
		} catch(err){}
		this.isTimerOn = false;
    },
    slideCarousel: function () {
      let scWidth = applicationManager.getDeviceUtilManager().getDeviceInfo().screenWidth;
      let xVal = this.xOffset;
      if (this.currAdFlex >= 1 && this.currAdFlex < this.numOfAds) {
        xVal = xVal + scWidth;
        this.currAdFlex++;
      } else if (this.currAdFlex === this.numOfAds) {
        xVal = 0;
        this.currAdFlex = 1;
      }
      this.view.flxScrollContainerAds.setContentOffset({
        x: xVal,
        y: 0
      }, true);
      let adNumber = this.imageObjArray[this.currAdFlex - 1];
      this.setDataForAd(adNumber);
      for (let j = 1; j <= this.numOfAds; j++) {
        if (j === this.currAdFlex) {
          this.view["flxProgressBarButton" + j].skin = "sknflx003e75Radius100px";
        } else {
          this.view["flxProgressBarButton" + j].skin = "sknflxE3E3E3Radius100px";
        }
      }
      this.xOffset = xVal;
      this.isTimerOn = true;
    },
    onAllAdsDownloadComplete: function() {
      const deviceUtilManager = applicationManager.getDeviceUtilManager();
      if(this.isTimerOn){
        kony.timer.cancel("slide5");
      }
      let visible = 0;
      for(let k = 1; k <= this.numOfAds; k++) {
        if(this.view["flxAd"+ (k)].isVisible) {
          visible++;
          let leftVal = ((visible-1)*parseInt(deviceUtilManager.getDeviceInfo().screenWidth));
          this.view["flxAd" + k].left = leftVal + "dp";
        }
      }
      kony.timer.schedule("slide5", this.slideCarousel, 5, true);
      this.view.flxProgressBar.setVisibility(true);
      this.imageObjArray = this.imageObjArray.filter(function (el) {
        if (el) {
          return el;
        }
      });
      this.view.flxLoadingIndicator.setVisibility(false);
    },
    onAllAdsDownloadFailure: function() {
      this.view.imgLoadingIndicator.src = "addownloadfailed.png";
      this.hideAds();
    },
    alignFlexInScrollContainer: function(noOfDownloadedAds) {
      if(noOfDownloadedAds > 1) {
        if(noOfDownloadedAds === 2) {
          this.view.flxProgressBarButton1.setVisibility(true);
          this.view.flxProgressBarButton2.setVisibility(true);
          this.view.flxProgressBarButton1.left = "38dp";
          this.view.flxProgressBarButton2.left = "55dp";
          this.view.flxProgressBarButton1.skin = "sknflx003e75Radius100px";
          this.view.flxProgressBarButton2.skin = "sknflxE3E3E3Radius100px";
        } else if(noOfDownloadedAds === 3) {
          this.view.flxProgressBarButton3.setVisibility(true);
          this.view.flxProgressBarButton3.skin = "sknflxE3E3E3Radius100px";
          this.view.flxProgressBarButton1.left = "29.5dp";
          this.view.flxProgressBarButton2.left = "46.5dp";
          this.view.flxProgressBarButton3.left = "63.5dp";
        } else if(noOfDownloadedAds === 4) {
          this.view.flxProgressBarButton4.setVisibility(true);
          this.view.flxProgressBarButton4.skin = "sknflxE3E3E3Radius100px";
          this.view.flxProgressBarButton1.left = "21dp";
          this.view.flxProgressBarButton2.left = "38dp";
          this.view.flxProgressBarButton3.left = "55dp";
          this.view.flxProgressBarButton4.left = "72dp";
        } else {
          this.view.flxProgressBarButton5.setVisibility(true);
          this.view.flxProgressBarButton5.skin = "sknflxE3E3E3Radius100px";
          this.view.flxProgressBarButton1.left = "12.5dp";
          this.view.flxProgressBarButton2.left = "29.5dp";
          this.view.flxProgressBarButton3.left = "46.5dp";
          this.view.flxProgressBarButton4.left = "63.5dp";
          this.view.flxProgressBarButton5.left = "80.5dp";
        }
        this.view.flxProgressBar.forceLayout();
      }
    },
    setDataForAd: function(adNumber) {
      this.view.flxAdInfo.setVisibility(false);
      this.view.flxAdInfo.forceLayout();      
      var adData = this.preloginAdData[adNumber-1];
      // this.LoggerManager.setCustomMetrics(this, true, "#PreLogin Ad" + adNumber + " Displayed"); MICROAPP - setCustomMetrics breaking, hence commenting.
    },
    onAdSwipe: function(widget, gestureInfo, context) {
      let downloadedAdCount = this.imageDownloadSuccessCount;
      let xVal = this.xOffset;
      let scWidth = applicationManager.getDeviceUtilManager().getDeviceInfo().screenWidth;
      let isThereChange = false;
      if(!this.isSwipeDone){
        // this.LoggerManager.setCustomMetrics(this ,true, "#PreLoginAds Swiped"); MICROAPP - setCustomMetrics breaking, hence commenting.
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
        let adNumber = this.imageObjArray[this.currAdFlex - 1];
        this.setDataForAd(adNumber);
        for (let j = 1; j <= downloadedAdCount; j++) {
          if (j === this.currAdFlex) {
            this.view["flxProgressBarButton" + j].skin = "sknflx003e75Radius100px";
          } else {
            this.view["flxProgressBarButton" + j].skin = "sknflxE3E3E3Radius100px";
          }
        }
        this.xOffset = xVal;
        this.view.flxProgressBar.forceLayout();
        this.view.flxScrollContainerAds.forceLayout();
      }
    },
    onAdTap: function() {
      let adNumber = this.imageObjArray[this.currAdFlex - 1];
      let navUrl;
      if(adNumber) {
        let adData = this.preloginAdData[adNumber - 1];
        navUrl = adData.destinationURL;
      }
      if(navUrl) {
        kony.application.openURL(navUrl);        
        if(!this.isTapDone){
          // this.LoggerManager.setCustomMetrics(this, true, "#PreLoginAds Tapped"); MICROAPP - setCustomMetrics breaking, hence commenting.
          this.isTapDone = true;
        }
        // this.LoggerManager.setCustomMetrics(this, true, "#PreLogin Ad" + adNumber + " Image Tapped"); MICROAPP - setCustomMetrics breaking, hence commenting.
      }
    },
    hideAds: function(){
      const AuthUIModule = this.getModule({
        appName: "AuthenticationMA",
        moduleName: "AuthUIModule",
      });
      this.adsHided = true;
      this.view.flxPreLoginCampaigns.setVisibility(false);
      if (AuthUIModule.presentationController.isappInitDone()) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
      this.isAdsCallExecuted = true;
    },
    canPreloginAdsRenderedToUI: function(){
      const DmManager = applicationManager.getDirectMarketingManager();
      let value =  DmManager.getRenderPreloginAds();
      return value;
    },
    setRenderPreloginAdsToTrue: function(){
      const DmManager = applicationManager.getDirectMarketingManager();
      DmManager.setRenderPreloginAds(true);
    },
    fetchPreloginAds: function(){
      const scope = this;
      const DmManager = applicationManager.getDirectMarketingManager();
      if (!DmManager.arePreLoginAdsFetched()) {
        if (Object.keys(CommonUtilities.CLIENT_PROPERTIES).length === 0) {
          let configurationSvc = kony.sdk
          .getCurrentInstance()
          .getConfigurationService();
          configurationSvc.getAllClientAppProperties(
            function (response) {
              if (
                Object.keys(response).length === 0 ||
                response.MB_ENABLE_INAPP_CAMPAIGNS === undefined ||
                response.MB_ENABLE_POPUP_CAMPAIGNS === undefined
              ) {
                response = {
                  MB_ENABLE_INAPP_CAMPAIGNS: "false",
                  MB_ENABLE_POPUP_CAMPAIGNS: "false",
                };
              }
              CommonUtilities.CLIENT_PROPERTIES = response;
              if (
                response.MB_ENABLE_INAPP_CAMPAIGNS &&
                response.MB_ENABLE_INAPP_CAMPAIGNS.toUpperCase() === "TRUE"
              ) {
                scope.AsyncManager.callAsync(
                  [scope.AsyncManager.asyncItem(DmManager, "getPreLoginAds")],
                  function (asyncResponses) {
                    scope.campaignsCallback(asyncResponses.responses[0].data);
                  }
                );
              }
            },
            function () {}
          );
        } else if (
          CommonUtilities.CLIENT_PROPERTIES &&
          CommonUtilities.CLIENT_PROPERTIES.MB_ENABLE_INAPP_CAMPAIGNS &&
          CommonUtilities.CLIENT_PROPERTIES.MB_ENABLE_INAPP_CAMPAIGNS.toUpperCase() === "TRUE"
        ) {
          scope.AsyncManager.callAsync(
            [scope.AsyncManager.asyncItem(DmManager, "getPreLoginAds")],
            function (asyncResponses) {
              scope.campaignsCallback(asyncResponses.responses[0].data);
            }
          );
        }
      } else {
        let preloginAdData = [];
        if (
          CommonUtilities.CLIENT_PROPERTIES &&
          CommonUtilities.CLIENT_PROPERTIES.MB_ENABLE_INAPP_CAMPAIGNS &&
          CommonUtilities.CLIENT_PROPERTIES.MB_ENABLE_INAPP_CAMPAIGNS.toUpperCase() === "TRUE"
        ) {
          preloginAdData = DmManager.getPreLoginAds();
        }
        return preloginAdData;
      }
    },
    campaignsCallback: function(response) {
      if(response && response["isServerUnreachable"] == true) {
        this.fetchPreloginAdsErrorCallback(response);
      } else {
        this.fetchPreloginAdsSuccesCallback(response);
      }
    },
    fetchPreloginAdsSuccesCallback: function(successResponse) {
      const AuthUIModule = this.getModule({
        appName: "AuthenticationMA",
        moduleName: "AuthUIModule",
      });
      const DmManager = applicationManager.getDirectMarketingManager();
      if(!AuthUIModule.presentationController.isStartUpComplete()) {
        DmManager.setRenderPreloginAds(true);
      } else {
        let preloginAdData = successResponse;
        let maxNumOfPreloginAds = DmManager.getMaxNumOfPreloginAds();
        if(preloginAdData.length > maxNumOfPreloginAds){
          this.LoggerManager.log(
            "###Prelogin Ad's count exceeded maxNumOfAds : " +
            maxNumOfPreloginAds +
            " \n####Therefore Hiding them"
          );
          this.hideAds();
        } else if(preloginAdData.length === 0) {
          this.LoggerManager.log(
            "###Prelogin Ad's count is 0 \n####Therefore Hiding them"
          );
          this.hideAds();
        } else {
          this.LoggerManager.log("###Succesfully fetched Prelogin ads");
          this.bindAdData(preloginAdData);
        }
      }
    },
    fetchPreloginAdsErrorCallback: function(errorResponse) {
      this.LoggerManager.log(
        "###In Error callback while fetching prelogin ads : " +
        errorResponse +
        "\n####Therefore Hiding them"
      );
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      this.hideAds();
    },
    // =========================== PostLogin Ads ==========================
    fetchPostLoginAds: function(){
      this.fetchAccountDashboardCampaignsForAggregatedDashboard();
    },
    fetchAccountDashboardCampaignsForAggregatedDashboard: function(){
      const scopeObj = this;
      const logger = applicationManager.getLoggerManager();
      const navManager = applicationManager.getNavigationManager();
      const DmManager = applicationManager.getDirectMarketingManager();
      let custominfo =  navManager.getCustomInfo("frmDashboardAggregated");
      if(!custominfo) {
        custominfo = {};
      }
      custominfo.accountDashboardCampaignData = [];
      if (!DmManager.areAccountDashboardCampaignsFetched()) {
        if (CommonUtilities.CLIENT_PROPERTIES && CommonUtilities.CLIENT_PROPERTIES.MB_ENABLE_INAPP_CAMPAIGNS && CommonUtilities.CLIENT_PROPERTIES.MB_ENABLE_INAPP_CAMPAIGNS.toUpperCase() === "TRUE") {
          DmManager.getAccountDashboardCampaigns(scopeObj.fetchAccountDashboardCampaignsPresentationSuccessCallback, scopeObj.fetchAccountDashboardCampaignsPresentationErrorCallback);
        } else {
          scopeObj.fetchAccountDashboardCampaignsPresentationSuccessCallback([]);
        }
      } else {
        let accountDashboardCampaignsData = [];
        if (CommonUtilities.CLIENT_PROPERTIES && CommonUtilities.CLIENT_PROPERTIES.MB_ENABLE_INAPP_CAMPAIGNS && CommonUtilities.CLIENT_PROPERTIES.MB_ENABLE_INAPP_CAMPAIGNS.toUpperCase() === "TRUE") {
          accountDashboardCampaignsData = DmManager.getAccountDashboardCampaigns();
        }
        let maxNumOfAccountDashboardCampaigns = DmManager.getMaxNumOfAccountDashboardCampaigns();
        if (accountDashboardCampaignsData.length > maxNumOfAccountDashboardCampaigns) {
          logger.log("###account dashboard Campaign's count exceeded maxNumOfAds : " + maxNumOfAccountDashboardCampaigns + " \n####Therefore Hiding them");
        } else if (accountDashboardCampaignsData.length === 0) {
          logger.log("###Account dashboard Campaign's count is 0 \n####Therefore Hiding them");
        } else {
          logger.log("###Succesfully fetched Account Dashboard Campaigns");
          custominfo.accountDashboardCampaignData = accountDashboardCampaignsData;
        }
        navManager.setCustomInfo("frmDashboardAggregated", custominfo);
        this.bindAdData(custominfo.accountDashboardCampaignData);
      }
    },
    fetchAccountDashboardCampaignsPresentationSuccessCallback: function(successResponse) {
      const navManager = applicationManager.getNavigationManager();
      const DmManager = applicationManager.getDirectMarketingManager();
      const logger = applicationManager.getLoggerManager();
      let custominfo = navManager.getCustomInfo("frmDashboardAggregated");
      if(!custominfo){
        custominfo = {};
      }
      let accountDashboardCampaignsData = successResponse;
      let maxNumOfAccountDashboardCampaigns = DmManager.getMaxNumOfAccountDashboardCampaigns();
      custominfo.accountDashboardCampaignData = [];
      if (accountDashboardCampaignsData.length > maxNumOfAccountDashboardCampaigns) {
        logger.log("###Account dashboard Campaign's count exceeded maxNumOfAds : " + maxNumOfAccountDashboardCampaigns + " \n####Therefore Hiding them");
      } else if (accountDashboardCampaignsData.length === 0) {
        logger.log("###Account dashboard Campaign's count is 0 \n####Therefore Hiding them");
      } else {
        logger.log("###Succesfully fetched Account Dashboard Campaigns");
        custominfo.accountDashboardCampaignData = accountDashboardCampaignsData;
      }
      navManager.setCustomInfo("frmDashboardAggregated", custominfo);
      this.bindAdData(custominfo.accountDashboardCampaignData);
    },
    fetchAccountDashboardCampaignsPresentationErrorCallback: function(errorResponse) {
      const navManager = applicationManager.getNavigationManager();
      let custominfo = navManager.getCustomInfo("frmDashboardAggregated");
      if(!custominfo){
        custominfo = {};
      }
      const logger = applicationManager.getLoggerManager();
      logger.log("###In Error callback while fetching Account Dashboard Campaigns : "+errorResponse+"\n####Therefore Not Showing them");
      custominfo.accountDashboardCampaignData = [];
      navManager.setCustomInfo("frmDashboardAggregated", custominfo);
      this.hideAds();
    },
  };
});