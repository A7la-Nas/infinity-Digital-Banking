define({
  numOfAds  : 0 ,
  currentFlex  : 1 ,
  xOffset  : 0 ,
  postLoginCampaigns  : 0 ,
  imageObjArray  : [] ,
  imageDownloadFailureCount  : 0 ,
  imageDownloadSuccessCount : 0,
  gestIDs  : [] ,
  isSwipeDone : false,
  isTapDone : false,
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  initActions : function(){
    this.view.flxCancel.onClick  = this.onAdClose;
  },
  preShow: function() {
    this.initActions();
    this.view.statusBarHidden = true;
    var navManager =  applicationManager.getNavigationManager();
    this.postLoginCampaigns =  navManager.getCustomInfo("frmFullScreenAds").postLoginAdData;
    this.numOfAds = this.postLoginCampaigns.length;
    this.xOffset = 0;
    this.currentFlex = 1;
    this.imageDownloadFailureCount = 0;
    this.imageDownloadSuccessCount = 0;
    this.imageObjArray = [];
    this.isSwipeDone = false;
  	this.isTapDone = false;
    if(!this.gestIDs)
    {
      this.gestIDs = [];
    }
    this.disableUntilImageDownloads();
    this.removeGestureRecognisers();
    var date = new Date();
    var param;
    var imgUrl;
    var deviceUtilManager = applicationManager.getDeviceUtilManager();
    var deviceData = deviceUtilManager.getDeviceInfo();
    this.view.flxLoadingIndicator.setVisibility(true);
    for(var j = 1; j <= this.numOfAds; j++)
    {
      param=date.getTime();
      this.view["flxAd"+j].setVisibility(false);
      this.view["flxAd"+j].left=parseInt(deviceUtilManager.getDeviceInfo().screenWidth) + "dp";
      //Ideally for IphoneX we use @3x images,
      // But in case of postLogin full screen Ads, to achieve a better UI look
      // We are using a customised image, hence we are storing the image name with "@IphoneX"
      // as an extension.
     this.view["imgAd"+j].src = this.postLoginCampaigns[j-1].imageURL + "?Param=" + param;;
    }
    if(deviceData.model.indexOf("iPhone X") > -1 || deviceData.model.indexOf("iPhone 11") > -1)
    {
      this.view.flxAdvertisement.top="-46dp";
    }
    this.view.flxScrollContainerAds.setContentOffset({
      x: this.xOffset,
      y: 0
    }, true);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },
  getActionDetails : function(adNumber,actionNumber) {
    var interactions = this.postLoginCampaigns[adNumber-1].interactions;
    if(actionNumber === 1)
    {
      return interactions[0];
    }
    else if(actionNumber === 2)
    {
      return interactions[1];
    }
  },
  onAdDownloadComplete : function(issuccess,adNumber){
    if(issuccess)
    {
      var i=this.imageDownloadSuccessCount;//this.imageObjArray.length;
      this.view["flxAd"+adNumber].setVisibility(true);
      this.alignFlexInScrollContainer(i+1);
      if(i===0)
      {
        this.setGestureRecogniser();
        var loggerManager = applicationManager.getLoggerManager();
		loggerManager.setCustomMetrics(this,true,"#PostLoginAds Displayed");
      }
      this.imageObjArray[adNumber-1] = adNumber;
      this.imageDownloadSuccessCount++;
    }
    else
    {
      this.imageDownloadFailureCount++;
      this.view["flxAd"+adNumber].setVisibility(false);
      if(this.imageDownloadFailureCount === this.numOfAds)
      {
        var logger = applicationManager.getLoggerManager();
        logger.log("####All PostLogin Ad's download failed\n####Therefore Closing Them");
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
  enableAfterImageDownloads : function(adNumber){
    var title =null;
    var textColor =null;
    var text =null;
    var scope = this;
    if(this.isActionPresent(adNumber,1))
    {
      this.view["flxAdAction1Img"+adNumber].setVisibility(true);
      this.view["rtxLblAdAction1Img"+adNumber].setVisibility(true);
      this.view["btnAdAction1Img"+adNumber].backgroundColor = this.getActionDetails(adNumber,1).colour;
      this.view["btnAdAction1Img"+adNumber].setVisibility(true);
      title = this.getActionDetails(adNumber,1).text;
      textColor = this.getActionDetails(adNumber,1).textcolor;
      if(!textColor || textColor === "")
      {
        textColor = "#ffffff";
      }
      text = "<label style=\"color:"+textColor+"\">"+title+"</label>";
      this.view["rtxLblAdAction1Img"+adNumber].text = text;
      this.view["flxAdAction1Img"+adNumber].forceLayout();
    }
    if(this.isActionPresent(adNumber,2))
    {
      var buttonType = this.getActionDetails(adNumber,2).buttonType;
      if( buttonType === "BUTTON")
      {
        this.view["flxAdAction2Img"+adNumber].setVisibility(true);
        this.view["rtxLblAdAction2Img"+adNumber].setVisibility(true);
        this.view["btnAdAction2Img"+adNumber].backgroundColor = this.getActionDetails(adNumber,2).colour;
        this.view["btnAdAction2Img"+adNumber].setVisibility(true);
        title = this.getActionDetails(adNumber,2).text;
        textColor = this.getActionDetails(adNumber,2).textcolor;
        if(!textColor || textColor === "")
        {
          textColor = "#ffffff";
        }
        text = "<label style=\"color:"+textColor+"\">"+title+"</label>";
        this.view["rtxLblAdAction2Img"+adNumber].text = text;
      }
      else if(buttonType === "LINK")
      {
        this.view["flxAdAction2Img"+adNumber].setVisibility(true);
        this.view["btnAdAction2Img"+adNumber].setVisibility(false);
        this.view["rtxLblAdAction2Img"+adNumber].setVisibility(true);
        title = this.getActionDetails(adNumber,2).text;
        textColor = this.getActionDetails(adNumber,2).textcolor;
        if(!textColor)
        {
          textColor = "#ffffff";
        }
        text = "<u><label style=\"color:"+textColor+"\">"+title+"</label></u>";
        this.view["rtxLblAdAction2Img"+adNumber].text = text;
      }
      this.view["flxAdAction2Img"+adNumber].forceLayout();
    }
    var loggerManager = applicationManager.getLoggerManager();
    loggerManager.setCustomMetrics(this,true,"#PostLogin Ad"+adNumber+" Displayed");
  },
  alignFlexInScrollContainer : function (noOfDownloadedAds){
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
  onAllAdsDownloadFailure : function(){
	this.onAdClose();
    this.view.imgLoadingIndicator.src="fullscreenaddownloadfailed.png";
  },
  disableUntilImageDownloads : function(){
    for(var i=1;i<6;i++)
    {
      this.view["flxAdAction1Img"+i].setVisibility(false);
      this.view["btnAdAction1Img"+i].setVisibility(false);
      this.view["rtxLblAdAction1Img"+i].setVisibility(false);
      this.view["flxAdAction2Img"+i].setVisibility(false);
      this.view["btnAdAction2Img"+i].setVisibility(false);
      this.view["rtxLblAdAction2Img"+i].setVisibility(false);
    }
    this.view.flxProgressButton1.setVisibility(false);
    this.view.flxProgressButton2.setVisibility(false);
    this.view.flxProgressButton3.setVisibility(false);
    this.view.flxProgressButton4.setVisibility(false);
    this.view.flxProgressButton5.setVisibility(false);
    this.view.flxProgressBar.forceLayout();
    this.view.flxProgressBar.setVisibility(false);
    this.view.flxLoadingIndicator.setVisibility(true);
    this.view.imgLoadingIndicator.src = "loaderfullscreen.gif";
  },
  removeGestureRecognisers : function()
  {
    if(this.gestIDs.length!==0)
    {
      var  swipeGestureID = this.gestIDs[0];
      var  tapGestureID = this.gestIDs[1];
      this.view.flxAdActionArea.removeGestureRecognizer(swipeGestureID);
      this.view.flxAdActionArea.removeGestureRecognizer(tapGestureID);
      this.gestIDs = [];
    }
  },
  setGestureRecogniser : function()
  {
    if(this.gestIDs.length === 0)
    {
      var swipeGestID = this.view.flxAdActionArea.setGestureRecognizer(2, {
        fingers: 1,
        swipedistance: 20,
        swipevelocity: 60
      }, this.onAdSwipe);
      var tapGestID = this.view.flxAdActionArea.setGestureRecognizer(1, {
        fingers: 1,
        taps:1
      }, this.onAdTap);
      this.gestIDs[0]=swipeGestID;
      this.gestIDs[1]=tapGestID;
    }
    this.view.flxAction1.onClick = this.onAdTap;
    this.view.flxAction2.onClick = this.onAdTap;
  },
  onAdSwipe : function(widget, gestureInfo, context) {
    var adNum = this.imageDownloadSuccessCount;//this.imageObjArray.length;
    var scWidth= applicationManager.getDeviceUtilManager().getDeviceInfo().screenWidth;
    var currFlex = this.currentFlex;
    var xVal = this.xOffset;
    var isThereChange = false;
    if(!this.isSwipeDone)
    {
     	var loggerManager = applicationManager.getLoggerManager();
        loggerManager.setCustomMetrics(this,true,"#PostLoginAds Swiped");
    	this.isSwipeDone = true;
    }
    if (gestureInfo.swipeDirection === 1) {
      if (currFlex>=1 && currFlex<adNum)
      {
        isThereChange = true;
        xVal = xVal + scWidth;
        currFlex++;
      }
    } else if (gestureInfo.swipeDirection === 2) {
      if (currFlex>1 && currFlex<=adNum) {
        isThereChange = true;
        xVal = xVal - scWidth;
        currFlex--;
      }
    }
    if(isThereChange)
    {
      this.view.flxScrollContainerAds.setContentOffset({
        x: xVal,
        y: 0
      }, true);
      for (var j = 1; j <= adNum; j++) {
        if (j === currFlex){
          this.view["flxProgressButton" + j ].skin = "sknflx003e75Radius100px";
        }
        else{
          this.view["flxProgressButton" + j ].skin = "sknflxE3E3E3Radius100px";
        }
      }
      this.view.flxProgressBar.forceLayout();
      this.view.flxScrollContainerAds.forceLayout();
      this.currentFlex = currFlex;
      this.xOffset = xVal;
    }
  },
  isActionPresent : function(adNumber,actionNumber) {
    var interactions = this.postLoginCampaigns[adNumber-1].interactions;
    if(actionNumber === 1)
    {
      if(interactions.length > 0)
      {
        return true;
      }
    }
    else if (actionNumber === 2)
    {
      if(interactions.length > 1)
      {
        return true;
      }
    }
    return false;
  },
  onAdTap : function(widget, gestureInfo, context){
    applicationManager.getPresentationUtility().showLoadingScreen();
    var postLoginCampaigns = this.postLoginCampaigns;
    var currFlex = this.currentFlex;
    var currAd = this.imageObjArray[currFlex-1];
    var navUrl;
    if(currAd)
      	navUrl = postLoginCampaigns[currAd-1].destinationURL;
    if(!this.isTapDone)
    {
      this.isTapDone=true;
    }
    var loggerManager = applicationManager.getLoggerManager();
    loggerManager.setCustomMetrics(this,true,"#PostLogin Ad"+currAd+" Image Tapped");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    if(navUrl)
      kony.application.openURL(navUrl);
    else
      return 0;
  },
  onAdAction1Onclick : function(){
    if(!this.view.flxLoadingIndicator.isVisible)
    {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var currFlex = this.currentFlex;
    var currAd = this.imageObjArray[currFlex-1];
    var navType = this.getActionDetails(currAd,1).navigationType;
    if(!this.isTapDone)
    {
      this.isTapDone=true;
    }
    if(navType  === "URL")
    {
      var navURL = this.getActionDetails(currAd,1).navigationURL;
      if(navURL)
        kony.application.openURL(navURL);
      else
        return 0;
    }
    else
    {
      kony.print("Navigation type"+navType);
    }
    var navId = this.getActionDetails(currAd,1).navigationId;
    var authMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
    authMode.presentationController.sendDmResponseForPostloginAds(navId);
    var loggerManager = applicationManager.getLoggerManager();
    loggerManager.setCustomMetrics(this,true,"#PostLogin Ad"+currAd+" Action1 clicked");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
   }
  },
  onAdAction2Onclick : function(){
    if(!this.view.flxLoadingIndicator.isVisible)
    {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var currFlex = this.currentFlex;
    var currAd = this.imageObjArray[currFlex-1];
    var navType = this.getActionDetails(currAd,2).navigationType;
    if(!this.isTapDone)
    {
      this.isTapDone=true;
    }
    if(navType  === "URL")
    {
      var navURL = this.getActionDetails(currAd,2).navigationURL;
      if(navURL)
      	kony.application.openURL(navURL);
      else
        return 0;
    }
    else
    {
      kony.print("Navigation type"+navType);
    }
    var navId = this.getActionDetails(currAd,2).navigationId;
    var authMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
    authMode.presentationController.sendDmResponseForPostloginAds(navId);
    var loggerManager = applicationManager.getLoggerManager();
    loggerManager.setCustomMetrics(this,true,"#PostLogin Ad"+currAd+" Action2 clicked");
    applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
  },
  onAdClose: function() {
    applicationManager.getPresentationUtility().showLoadingScreen();
    var authMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("AuthUIModule");
    authMode.presentationController.sendDmResponseForPostloginAds("EXIT");
    authMode.presentationController.navigateToDashboardFromAds();
    var currFlex = this.currentFlex;
    var currAd = this.imageObjArray[currFlex-1];
    var loggerManager = applicationManager.getLoggerManager();
    if(this.isTapDone)
      {
        loggerManager.setCustomMetrics(this,true,"#PostLoginAds closed");
   	  }
    else
      {
        loggerManager.setCustomMetrics(this,true,"#PostLoginAds closed without Tap");
      }
     loggerManager.setCustomMetrics(this,true,"#PostLoginAd"+currAd+" closed");
  },
}) ;