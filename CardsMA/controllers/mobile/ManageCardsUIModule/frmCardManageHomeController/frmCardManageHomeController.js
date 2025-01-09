define(['CommonUtilities','CampaignUtility'], function(CommonUtilities,CampaignUtility){
  return{
    timerCounter: 0,
    dialPadNo: "",
    lengthOfDialNo: 0,
    cardList: [],
    cardListImages: [],
    cardListIndex: 0,
    cardListLastIndex: 0,
    cardListTotalCards: 0,
    cardListWidth: 0,
    cardListCards: [],
    cardListStartScale: 0.83,
    cardListScaleGrowth: 0.2,
    cardListNumbers: [],
    isAppendData: false,
    currCardNumber: "",
    cardId:"",
    popUpMsg: '',
    cardTypeFlag: null,
    objToSend: {},
    expiryFlag:false,
    isManageTabShown: false,
    buisnessuser:0,
    users:{},
        scinstance:null,
    init : function() {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardManageHomeController : init ####");
        var navManager = applicationManager.getNavigationManager();
        var currentForm=navManager.getCurrentForm();
        applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
            }
        },
      addComponentforSCA : function()
      {
        if(this.scinstance!=null)
          return;
        var currform = kony.application.getCurrentForm();
        this.scinstance = new com.temenos.infinity.mb.sca.transactions.SCAComponent({
          "height": "100%",
          "id": "SCAComponent",
          "isVisible": true,
          "left": "0dp",
          "masterType": constants.MASTER_TYPE_USERWIDGET,
          "isModalContainer": false,
          "skin": "slFboxmb",
          "top": "0dp",
          "width": "100%",
          "appName": "ResourcesHIDMA",
          "viewType": "SCAComponent",
          "shouldGroup": false,
          "overrides": {
            "SCAComponent": {
              "right": "viz.val_cleared",
              "bottom": "viz.val_cleared",
              "minWidth": "viz.val_cleared",
              "minHeight": "viz.val_cleared",
              "maxWidth": "viz.val_cleared",
              "maxHeight": "viz.val_cleared",
              "centerX": "viz.val_cleared",
              "centerY": "viz.val_cleared"
            }
      }
        }, {
          "paddingInPixel": false,
          "overrides": {}
        }, {
          "overrides": {}
        });
        this.scinstance.flowType = "";
        this.scinstance.servicekey = "";
        currform.add(this.scinstance);

    },
    setFlowActions: function() {
      this.view.flxNoCards.onClick = function(){kony.print("Clicked on Flx No Crads");};
      var configManager=applicationManager.getConfigurationManager();
      if(configManager.isMicroAppPresent(configManager.microappConstants.ABOUTUS)){
        this.view.flxCallCusCare.setVisibility(true);
        this.view.btnCallCustomerCare.onClick = this.callCustomerCare;
      }
      else{
        this.view.flxCallCusCare.setVisibility(false);
      }
      this.view.switchActiveorInactive.onSlide = this.flxActiveOrInactiveOnClick;
      this.view.flxReplaceCard.onClick = this.flxReplaceCardOnClick;
      this.view.flxReportStolenOrLost.onClick = this.flxReportStolenOrLostOnClick;
      this.view.flxCancelCard.onClick = this.flxCancelCardOnClick;
      this.view.flxChangePin.onClick = this.flxChangePinOnClick;
      this.view.customHeader.flxBack.onClick = this.navigateToMenu;
      this.view.customHeader.flxSearch.onClick = this.navigateToFilterOrApplyCard;
      this.view.flxSetPurchaseLimit.onClick = this.flxSetPurchaseLimitOnClick;
      this.view.flxSetATMWithdrawalLimit.onClick = this.flxSetATMWithdrawalLimitOnClick;
      this.view.btnManageTravelPlans.onClick = this.navigateToTravelManageHome;
      this.view.flxViewStatements.onClick = this.viewStatements;
      this.view.flxCardDetails.onClick = this.navigateToCardMngDetails;
      this.view.btnActivateCard.onClick= this.activateCards;
      this.view.btnTransactionTab.onClick = this.getTransactions;
      this.view.btnManageTab.onClick = this.hideTransactions;
      this.view.segTransactionsScreen.onRowClick = this.onSegmentRowClick;
      this.view.btnAboutExpire.onClick=this.activateExpiryCards;
      this.view.flxMainContainer.onScrollEnd = this.checkForReachEnd;
      this.view.btnFilterCards.onClick=this.navigateToFilterCards;
      this.view.btnApplyForCard.onClick = this.applyForNewCard;
      this.view. btnCancelMngCards.onClick=this.cancelFlex;
      this.view.btnApplyCard.onClick = this.applyForNewCard;
      this.view.flxApplePay.onClick = this.applePay;
      this.view.flxSamsungPay.onClick = this.samsumgPay;
      this.view.flxGooglePay.onClick = this.googlePay;
      if(1 === CommonUtilities.getSCAType()){
                this.addComponentforSCA();
      this.view.SCAComponent.onSuccessCallback = this.scaSuccessCallback;
      this.view.SCAComponent.onFailureCallback =this.scaFailureCallback;
                this.view.SCAComponent.zIndex = 1;
              this.view.flxMainContainer.zIndex = 5;
      }
    },
    checkForReachEnd: function(){
        var offsetY = this.view.flxMainContainer.contentOffsetMeasured.y;
        var contentHeight = this.view.flxMainContainer.contentSizeMeasured.height;
        var viewPortHeight = this.view.flxMainContainer.frame.height;
        if(Number(contentHeight) === Number(offsetY) + Number(viewPortHeight))
        {
          this.onReachingEnd();
        }
    },
    setPreShowData:function(){
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardManageHomeController : preShowData ####");
        //    var bankName = applicationManager.getUserPreferencesManager().getBankName();
        var configManager = applicationManager.getConfigurationManager();
        var navManager = applicationManager.getNavigationManager();        
          if (applicationManager.getPresentationFormUtility().getDeviceName() === 'iPhone'){
            this.view.title = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Hamburger.CardManagement");
          }else{
            this.view.customHeader.lblLocateUs.text = applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.Hamburger.CardManagement");
          }
        
        if(configManager.isRBUser === "true" || configManager.isSMEUser === "true"){
          var MenuHandler =  applicationManager.getMenuHandler();
         MenuHandler.setUpHamburgerForForm(this, configManager.constants.MENUCARDMANAGEMENT);
        }		
      }
      catch(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      } finally {
        let scopeObj = this;
        let campaignPopUpSuccess = function(response){
          CampaignUtility.showCampaign(response, scopeObj.view);
        };
        let campaignPopUpError = function(response){
          kony.print(response, "Campaign Not Found!");
        };
        CampaignUtility.fetchPopupCampaigns(campaignPopUpSuccess, campaignPopUpError);
      }
    },
    resetPayFlexs: function(){
      this.view.flxApplePay.setVisibility(false);
      this.view.flxSeperatorPay4.setVisibility(false);
      this.view.flxSamsungPay.setVisibility(false);
      this.view.flxSeperatorPay5.setVisibility(false);
      this.view.flxGooglePay.setVisibility(false);
      this.view.flxSeperatorPay6.setVisibility(false);
    },
    samsungPayCallBack : function(isSupported){
      if(isSupported.toString() === "true"){
        this.view.flxSamsungPay.setVisibility(true);
        this.view.flxSeperatorPay5.setVisibility(true); 
      }
    },
    getDeviceOS: function() {
      try 
      {
        return kony.os.deviceInfo(); 
      } 
      catch (exception) { 
        try {
          return kony.crypto.createHMacHash("SHA512", this.getDeviceOS().deviceid, "KonyAnalytics"); } 
        catch (ex) 
        { 
          kony.print(JSON.stringify(ex)); 
        } 
      } 
    },
	onNavigate: function () {
		if (
		  applicationManager.getPresentationFormUtility().getDeviceName() !==
		  "iPhone"
		) {
		  var footerMenuUtility = require("FooterMenuUtility");
		  this.footerMenuUtility =
			footerMenuUtility.getFooterMenuUtilityInstance();
		  var cm = applicationManager.getConfigurationManager();
		  this.footerMenuUtility.entitlements = {
			features: cm.getUserFeatures(),
			permissions: cm.getUserPermissions(),
		  };
		  this.footerMenuUtility.scope = this;
		}
    },
    preShow: function() {
      var loggerManager = applicationManager.getLoggerManager();
      try {
		if (
			applicationManager.getPresentationFormUtility().getDeviceName() !==
		"iPhone"
		) {
			this.footerMenuUtility.setFooterMenuItems(this, "flxPrimary500");
			this.view.customHeader.flxBack.isVisible = false;
		}
        loggerManager.log("#### start frmCardManageHomeController : preShow ####");
        applicationManager.getPresentationUtility().showLoadingScreen();
        this.view.flxMainContainer.showFadingEdges = false;
        this.view.flxscrmain.isVisible = true;
        this.view.flxCardsHomeTabs.setVisibility(true);
        this.view.flxPopupApplyForCard.setVisibility(false);
        this.view.flxHeader.setEnabled(true);
        this.view.flxMainContainer.setEnabled(true);
        this.view.flxHamburger.setEnabled(true);
        this.view.flxNoCards.setEnabled(true);
        this.view.flxManageTravelPlanButton.setVisibility(true);
        this.view.flxManageTravelPlanButton.setEnabled(true);
        this.view.flxFooter.setEnabled(true);
        this.view.lblNoCards.text = kony.i18n.getLocalizedString("kony.mb.cardManage.FetchingCards");
        this.view.flxNoCards.isVisible = true;
        this.view.customHeader.flxSearch.isVisible = true;
        this.view.flxAboutExpire.setVisibility(false);
        this.view.customHeader.imgSearch.src="circledots.png";
        this.view.customHeader.imgBack.src="backbutton.png";
         var  manageCardModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        var cardReset=manageCardModule.presentationController.getCardIndexStatus();
        if(cardReset){        
          this.cardListIndex=0;
          manageCardModule.presentationController.setCardIndexStatus(false);
        }
        this.setFlowActions();
          if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
            this.view.flxHeader.isVisible = true;
            this.view.flxFooter.isVisible = false;
          } else {
            this.view.flxHeader.isVisible = false;
            this.view.flxFooter.isVisible = true;
          }
        
        this.setPreShowData();
      }
      catch(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    callCustomerCare: function(){
      applicationManager.getPresentationUtility().showLoadingScreen();
      var infModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"AboutUsMA","moduleName":"InformationUIModule"});
      infModule.presentationController.onClickCallUs();
    },
    showDial: function (phoneNumber) {
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      kony.phone.dial(phoneNumber);
    },
    setCardView: function(cardStatus,cardType) {
      var loggerManager = applicationManager.getLoggerManager();
      //   kony.ui.Alert(this.expiryFlag);
      loggerManager.log("EXPIRYFLAG"+this.expiryFlag);
      try {
        loggerManager.log("#### start frmCardManageHomeController : setCardView ####");
        if (kony.sdk.isNullOrUndefined(cardStatus)) {
          applicationManager.getDataProcessorUtility().showToastMessageError(this, kony.i18n.getLocalizedString("kony.mb.cardManage.errorFetchCards"));
          applicationManager.getPresentationUtility().dismissLoadingScreen();
        }
        var navManager = applicationManager.getNavigationManager();
        var frmData = navManager.getCustomInfo("frmCardManageHome");
        if(!kony.sdk.isNullOrUndefined(frmData.cardData) )
        {
          if(frmData.cardData.view === "pinChange") {
            if(kony.sdk.isNullOrUndefined(frmData.cardData.type)) {
              this.popupMsg = kony.i18n.getLocalizedString("kony.mb.cardManage.pinChangeMsg");
            }
            else if (frmData.cardData.type === "email") {
              this.popupMsg = kony.i18n.getLocalizedString("kony.mb.cardManage.pinChangeMsgEmail");
            }
            else if (frmData.cardData.type === "phoneNo") {
              this.popupMsg = kony.i18n.getLocalizedString("kony.mb.cardManage.pinChangeMsgPhone");
            }
            else if (frmData.cardData.type === "postalAddress") {
              this.popupMsg = kony.i18n.getLocalizedString("kony.mb.cardManage.pinChangeMsgAddress");
            }
          }
          frmData.cardData = null;
          navManager.setCustomInfo("frmCardManageHome", frmData);
          this.setViewForPinChange(cardType);
        }
        else {
          if(!kony.sdk.isNullOrUndefined(frmData.pinChange)&&frmData.pinChange==="pinChange")
          {
            frmData.pinChange="";
            navManager.setCustomInfo("frmCardManageHome", frmData);
            this.popupMsg = kony.i18n.getLocalizedString("kony.mb.cardManage.pinChangeMsg");
            this.setViewForPinChange(cardType);
          }
          else
          {
            if (cardStatus === "Locked") {
              this.popupMsg = kony.i18n.getLocalizedString("kony.mb.cardManage.setInActiveMsg");
              this.setCardLocked(cardType);
            }
            else if (cardStatus === "Inactive") {
              this.popupMsg = kony.i18n.getLocalizedString("kony.mb.cardManage.setInActiveMsg");
              this.setCardInactive(cardType);
            }
            else if (cardStatus === "Active") {
              this.popupMsg = kony.i18n.getLocalizedString("kony.mb.cardManage.setActiveMsg");
              this.setCardActive(cardType);
            }
            else if (cardStatus === "pinChange") {
              this.popupMsg = kony.i18n.getLocalizedString("kony.mb.cardManage.pinChangeMsg");
              this.setViewForPinChange(cardType);
            }
            else if (cardStatus === "Replace Request Sent") {
              this.popupMsg = kony.i18n.getLocalizedString("kony.mb.cardManage.replaceMsg");
              this.setViewForReplacedCard(cardType);
            }
            else if (cardStatus === "Reported Lost") {
              this.popupMsg = kony.i18n.getLocalizedString("kony.mb.cardManage.reportMsg");
              this.setViewForStolenCard(cardType);
            }
            else if (cardStatus === "Cancelled") {
              this.popupMsg = kony.i18n.getLocalizedString("kony.mb.cardManage.cancelMsg");
              this.setViewForCancelCard(cardType);
            }
            else if (cardStatus === "Issued") {
              this.popupMsg = kony.i18n.getLocalizedString("kony.mb.cardManage.cancelMsg");
              this.setViewForIssuedCard(cardType);
            }
          }
        }
      }
      catch(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    postShow: function() {
      var deviceManager = applicationManager.getDeviceUtilManager();
      deviceManager.detectDynamicInstrumentation();
      var navManager = applicationManager.getNavigationManager();
      var frmData = navManager.getCustomInfo("frmCardManageHome");
      if(!kony.sdk.isNullOrUndefined(frmData))
      {
        var response = frmData.response;
        if(kony.sdk.isNullOrUndefined(response) || response.length === 0)
        {
          var cardsManager = applicationManager.getCardsManager();
          response = cardsManager.getCards();
        }
         if(!scope_ManageCards_Pres.isBillingAddressAvailable){
            this.showEmptyBillingAddressError();
          }
        if(!kony.sdk.isNullOrUndefined(response) && response.length > 0) {
          this.cardList = response;
          this.cardListTotalCards = response.length;
          this.carouselAnimationPreShow();
          this.getAndSetCards();
          this.view.flxNoCards.setVisibility(false);
          this.view.flxMainContainer.setVisibility(true);
         // this.view.flxManageTravelPlanButton.setVisibility(true);
        }
        else {
          this.cardListTotalCards = 0;
          this.view.lblNoCards.text = kony.i18n.getLocalizedString("kony.mb.cards.noCardsApply");
          this.view.flxNoCards.setVisibility(true);
          this.view.flxMainContainer.setVisibility(false);
          this.view.customHeader.flxSearch.isVisible = false;
          this.view.flxManageTravelPlanButton.setVisibility(false);
        }
        applicationManager.getPresentationUtility().dismissLoadingScreen();
      }
    },
    getAndSetCards: function() {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardManageHomeController : getAndSetCards ####");
        var navManager = applicationManager.getNavigationManager();
        var frmData = navManager.getCustomInfo("frmCardManageHome");
        var isMainScreen = false;
        if(!kony.sdk.isNullOrUndefined(frmData)){
          isMainScreen = frmData.isMainScreen;
        }
        this.cardListGetCards();
        this.cardListScrollIndex();
        if (!isMainScreen) {
          this.popupMsg = "";
          navManager.setCustomInfo("frmCardManageHome", {"isMainScreen":undefined});
          if(isMainScreen === true){
            this.cardListIndex = 0;
          }
        }
        if (this.popupMsg !== ''&& scope_ManageCards_Pres.activeCardsScenario===false) {
          this.showPopupSuccess();
        }
        scope_ManageCards_Pres.activeCardsScenario=false;

        this.view.flxNoCards.isVisible = false;
        this.view.forceLayout();
        applicationManager.getPresentationUtility().dismissLoadingScreen();

      }
      catch(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    setDataForCards: function() {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardManageHomeController : setDataForCards ####");
        this.cardListImages = [
          "atmcardgold.png",
          "atmcardplatinum.png",
          "atmcardblack.png",
          "atmcardgold.png",
          "atmcardplatinum.png",
          "atmcardblack.png",
          "atmcardplatinum.png",
          "atmcardblack.png",
        ];
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    carouselAnimationPreShow: function() {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardManageHomeController : carouselAnimationPreShow ####");
        var no_of_cards = this.cardListTotalCards;
        var no_of_widgets = this.view.flxCardList.widgets().length;
        if (no_of_cards !== no_of_widgets) {
          this.cardListIndex = 0;
          this.removeExtraClonedCards();
          this.cardListCloneCards();
        }
        this.view.flxCardList.showFadingEdges = false;
       // if(applicationManager.getPresentationFormUtility().getDeviceName() != "iPhone")
        this.view.flxCardList.scrollToWidget(this.view.flxCardList.widgets()[this.cardListIndex]);
        //         kony.runOnMainThread(mainthreadFun, []);
        //         function mainthreadFun () { 
        //          this.view.flxCardList.scrollToWidget(this.view.flxCardList.widgets()[this.cardListIndex]);
        //         }
        this.setDataForCards();
        this.setCarouselAnimationActions();
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    removeExtraClonedCards: function() {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardManageHomeController : removeExtraClonedCards ####");
        var totalCards = this.view.flxCardList.widgets().length;
        for (var i = totalCards - 1 ; i > 0; i--) {
          this.view.flxCardList.removeAt(i);
        }
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    cardListCloneCards: function() {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardManageHomeController : cardListCloneCards ####");
        for (var i = 1; i < this.cardListTotalCards; i++) {
          var newPage = this.view.flxCard.clone("newPage" + i);
          this.view.flxCardList.add(newPage);
        }
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    setCarouselAnimationActions: function() {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardManageHomeController : setCarouselAnimationActions ####");
        var scopeObj = this;
        this.view.flxCardList.onScrollStart = function() {
          try {
            scopeObj.cardListScrollStart();
          }
          catch(e) {
            try {
              var scope;

              if(!kony.sdk.isNullOrUndefined(scopeObj)) {
                scope = scopeObj;
              }
              else {
                scope = this;
              }
              if(!kony.sdk.isNullOrUndefined(scope.timerCounter)) {
                scope.timerCounter = parseInt(scope.timerCounter)+1;
              }
              else {
                scope.timerCounter = 1;
              }

              var timerId="timerPopupError_frmCardManageHome_CarouselAnimationActions"+scope.timerCounter;
              scope.view.customPopup.imgPopup.src = "errormessage.png";
              scope.view.customPopup.lblPopup.text = kony.i18n.getLocalizedString("kony.mb.cardmgmt.error");
              scope.view.flxPopup.skin = "sknflxff5d6e";
              scope.view.flxPopup.setVisibility(true);

              kony.timer.schedule(timerId, function() {
                var timerScope ;
                if(!kony.sdk.isNullOrUndefined(scope)) {
                  timerScope = scope;
                }
                else {
                  timerScope = this;
                }
                timerScope.view.flxPopup.setVisibility(false);
              }, 1.5, false);            
            }catch(error){
              kony.print("frmCardManageHome CarouselAnimationActions-->"+JSON.stringify(error));
            }      
          }
        };
        this.view.flxCardList.onScrolling = function() {
          try{
            scopeObj.cardListScroll();
          }
          catch(e) {
            try {
              var scope;

              if(!kony.sdk.isNullOrUndefined(scopeObj)) {
                scope = scopeObj;
              }
              else {
                scope = this;
              }
              if(!kony.sdk.isNullOrUndefined(scope.timerCounter)) {
                scope.timerCounter = parseInt(scope.timerCounter)+1;
              }
              else {
                scope.timerCounter = 1;
              }

              var timerId="timerPopupError_frmCardManageHome_CarouselAnimationActions"+scope.timerCounter;
              scope.view.customPopup.imgPopup.src = "errormessage.png";
              scope.view.customPopup.lblPopup.text = kony.i18n.getLocalizedString("kony.mb.cardmgmt.error");
              scope.view.flxPopup.skin = "sknflxff5d6e";
              scope.view.flxPopup.setVisibility(true);

              kony.timer.schedule(timerId, function() {
                var timerScope ;
                if(!kony.sdk.isNullOrUndefined(scope)) {
                  timerScope = scope;
                }
                else {
                  timerScope = this;
                }
                timerScope.view.flxPopup.setVisibility(false);
              }, 1.5, false);            
            }catch(error){
              kony.print("frmCardManageHome CarouselAnimationActions-->"+JSON.stringify(error));
            }      
          }
        };
        this.view.flxCardList.onScrollEnd = function() {
          try{
            scopeObj.cardListScrollStop();
          }
          catch(e) {
            try {
              var scope;

              if(!kony.sdk.isNullOrUndefined(scopeObj)) {
                scope = scopeObj;
              }
              else {
                scope = this;
              }
              if(!kony.sdk.isNullOrUndefined(scope.timerCounter)) {
                scope.timerCounter = parseInt(scope.timerCounter)+1;
              }
              else {
                scope.timerCounter = 1;
              }

              var timerId="timerPopupError_frmCardManageHome_CarouselAnimationActions"+scope.timerCounter;
              scope.view.customPopup.imgPopup.src = "errormessage.png";
              scope.view.customPopup.lblPopup.text = kony.i18n.getLocalizedString("kony.mb.cardmgmt.error");
              scope.view.flxPopup.skin = "sknflxff5d6e";
              scope.view.flxPopup.setVisibility(true);

              kony.timer.schedule(timerId, function() {
                var timerScope ;
                if(!kony.sdk.isNullOrUndefined(scope)) {
                  timerScope = scope;
                }
                else {
                  timerScope = this;
                }
                timerScope.view.flxPopup.setVisibility(false);
              }, 1.5, false);            
            }catch(error){
              kony.print("frmCardManageHome CarouselAnimationActions-->"+JSON.stringify(error));
            }      
          }
        };
        this.view.postShow = function() {
          try{
            scopeObj.postShow();
          }
          catch(e) {
            try {
              var scope;

              if(!kony.sdk.isNullOrUndefined(scopeObj)) {
                scope = scopeObj;
              }
              else {
                scope = this;
              }
              if(!kony.sdk.isNullOrUndefined(scope.timerCounter)) {
                scope.timerCounter = parseInt(scope.timerCounter)+1;
              }
              else {
                scope.timerCounter = 1;
              }

              var timerId="timerPopupError_frmCardManageHome_CarouselAnimationActions"+scope.timerCounter;
              scope.view.customPopup.imgPopup = "errormessage.png";
              scope.view.customPopup.lblPopup = kony.i18n.getLocalizedString("kony.mb.cardmgmt.error");
              scope.view.flxPopup.skin = "sknflxff5d6e";
              scope.view.flxPopup.setVisibility(true);

              kony.timer.schedule(timerId, function() {
                var timerScope ;
                if(!kony.sdk.isNullOrUndefined(scope)) {
                  timerScope = scope;
                }
                else {
                  timerScope = this;
                }
                timerScope.view.flxPopup.setVisibility(false);
              }, 1.5, false);            
            }catch(error){
              kony.print("frmCardManageHome CarouselAnimationActions-->"+JSON.stringify(error));
            }      
          }
        };
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    cardListGetCards: function() {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardManageHomeController : cardListGetCards ####");
        kony.print("-- cardListGetCards Start --");
        if(!kony.sdk.isNullOrUndefined(this.view) &&
           !kony.sdk.isNullOrUndefined(this.view.flxCardList) &&
           !kony.sdk.isNullOrUndefined(this.view.flxCardList.widgets()) &&
           !kony.sdk.isNullOrUndefined(this.view.flxCard.frame))
        {
          this.cardListCards = this.view.flxCardList.widgets();
          this.cardListWidth = this.view.flxCard.frame.width;
          kony.print("-- cardListWidth = " + this.cardListWidth);
          kony.print("-- cardListGetCards End --");
          this.cardListSetCards();
        }
        else
        {
          this.cardListCards = [];
          this.cardListWidth = 0;
        }
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    cardListSetCards: function() {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardManageHomeController : cardListSetCards ####");
        this.lastSetIndex = this.clone(this.cardListIndex);
        var cardListStartTransform = kony.ui.makeAffineTransform();
        cardListStartTransform.scale(this.cardListStartScale, this.cardListStartScale);
        var growEnd = this.cardListStartScale + this.cardListScaleGrowth;
        var cardListEndTransform = kony.ui.makeAffineTransform();
        cardListEndTransform.scale(growEnd, growEnd);
        for (i = 0; i < this.cardListCards.length; i++) {
          this.cardListCards[i].transform = cardListStartTransform;
          var cardListChildWidgets = this.cardListCards[i].widgets();
          var cardNumbers = cardListChildWidgets[1].widgets();
          var cardNumber1 = cardNumbers[0].widgets();
          cardNumber1[0].text = this.cardList[i]['maskedCardNumber'].slice(0,4);
          var cardNumber4 = cardNumbers[3].widgets();
          cardNumber4[0].text = this.cardList[i]['maskedCardNumber'].slice(-4);
          this.cardListCards[i].opacity = 0.5;
          var prdName = this.cardList[i].cardProductName;
          cardListChildWidgets[0].src = this.getCardImage(prdName);
          /* if(this.cardList[i]['cardType'].trim() === "Debit")
          {
            cardListChildWidgets[0].src = "atmcardblack.png";
          }
          else if(this.cardList[i]['cardType'].trim() === "Credit")
          {
            cardListChildWidgets[0].src = "atmcardgold.png";
          }
          else
          {
            cardListChildWidgets[0].src = "atmcardpetrol.png";
          }*/
        }
        this.cardListCards[this.cardListIndex].opacity = 1;
        this.cardListCards[this.cardListIndex].transform = cardListEndTransform;
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    cardListScrollStart: function() {
      this.cardListLastIndex = this.cardListIndex;
    },
    getCardImage : function(cardProductName)
    {
      var cards ={
        "Eazee Food Card": 'eazee_food_card.png',
        "Gold Debit Card": 'golden_card.png',
        "Petro Card": 'petro_card.png',
        "My Platinum Credit Card": 'premium_club_credit.png',
        "PremiumCredit": 'platinum_card.png',
        "Shopping Card": 'shopping_card.png',
        "Classic Cashback Card": 'golden_card.png',
        "Rewards Priority Card": 'petro_card.png',
        "Shop@Ease Platinum Card": 'platinum_card.png',
        "Maverick Debit Card": 'shopping_card.png'
      };
      if(!kony.sdk.isNullOrUndefined(cards[cardProductName]))
        return cards[cardProductName];
      else
        return 'platinum_card.png';
    },
    cardListScroll: function() {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardManageHomeController : cardListScroll ####");
        if (kony.sdk.isNullOrUndefined(this.view) ||
            kony.sdk.isNullOrUndefined(this.view.flxCardList) ||
            kony.sdk.isNullOrUndefined(this.view.flxCardList.widgets())
           )
        {
          return;
        }
        var scrollPosX = this.view.flxCardList.contentOffsetMeasured.x;
        var cardListFactor = [];
        var cardListScaleFactor = [];
        var cardListScale = [];
        var cardListScrollTransform = [];
        var cardListOpacity = [];
        for (i = 0; i < this.cardListCards.length; i++) {
          if(this.cardListWidth !== 0){
            cardListFactor[i] = this.roundNum(Math.min(2, (Math.max(0, (scrollPosX - (this.cardListWidth * (i - 1)))) / (this.cardListWidth))), 3);
          }
          else{
            cardListFactor[i] = 0;
          }
          kony.print("-- cardListFactor " + i + " " + cardListFactor[i]);
          if (cardListFactor[i] < 1) {
            cardListScaleFactor[i] = cardListFactor[i];
          } else {
            cardListScaleFactor[i] = this.roundNum((2 - cardListFactor[i]), 3);
          }
          kony.print("-- cardListScaleFactor " + i + " " + cardListScaleFactor[i]);
          cardListScale[i] = (this.cardListStartScale + (cardListScaleFactor[i] * (this.cardListScaleGrowth)));
          cardListScrollTransform[i] = kony.ui.makeAffineTransform();
          cardListScrollTransform[i].scale(cardListScale[i], cardListScale[i]);
          this.cardListCards[i].transform = cardListScrollTransform[i];
          cardListOpacity[i] = Math.max(0.5, (cardListScaleFactor[i]));
          this.cardListCards[i].opacity = cardListOpacity[i];
          kony.print("-- cardListIndex = " + this.cardListIndex);
          kony.print("-- cardListFactor " + i + " = " + cardListFactor[i] + " cardListScale " + i + " = " + this.roundNum(cardListScale[i], 3) + " cardListOpacity = " + cardListOpacity[i]);
        }
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    cardListScrollStop: function() {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardManageHomeController : cardListScrollStop ####");
        var scrollPosX = parseInt(this.view.flxCardList.contentOffsetMeasured.x);
        var cardFrameWidth = parseInt(this.view.flxCardList.frame.width);
        this.cardListIndex = parseInt((scrollPosX + 1) / cardFrameWidth);
        this.isAppendData = false;
        this.cardListScrollIndex();
        // this.hideTransactions();
        kony.print("-- cardListLastIndex = " + this.cardListLastIndex);
        kony.print("-- cardListIndex = " + this.cardListIndex);
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    setCurrentCardDetails : function(){
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardManageHomeController : setCurrentCardDetails ####");
        var formatUtil = applicationManager.getFormatUtilManager();
        var configurationManager = applicationManager.getConfigurationManager();
        this.view.lblCrntBalText.text = kony.i18n.getLocalizedString("kony.mb.accounts.CurrentBalance");
        // this.view.lblBalanceAmount.text = formatUtil.formatAmountandAppendCurrencySymbol(this.cardList[this.cardListIndex].currentBalance,this.cardList[this.cardListIndex].currencyCode);
        // this.view.lblBalGraphicTxt.text = this.view.lblBalanceAmount.text;
        if(kony.sdk.isNullOrUndefined(this.cardList[this.cardListIndex].currencyCode))
        {
          this.cardList[this.cardListIndex].currencyCode = configurationManager.getCurrencyCode();
        }
        var screenWidth = kony.os.deviceInfo().screenWidth;
        screenWidth = screenWidth - 64;
        if(this.cardList[this.cardListIndex].cardType === "Debit"){
          this.view.lblBalanceAmount.text = CommonUtilities.formatCurrencyWithCommas(this.cardList[this.cardListIndex].currentBalance, false, this.cardList[this.cardListIndex].currencyCode);
          this.view.lblBalGraphicTxt.text = this.view.lblBalanceAmount.text;
          this.view.lblPaymentDueText.setVisibility(false);
          this.view.lblCreditLimitTxt.text = kony.i18n.getLocalizedString("kony.mb.cardManagement.purchaseLimit") +": " + CommonUtilities.formatCurrencyWithCommas(this.cardList[this.cardListIndex].withdrawlLimit, false, this.cardList[this.cardListIndex].currencyCode);
          this.view.lblAvialCreditText.text = kony.i18n.getLocalizedString("kony.mb.accounts.AvailableBalance");
          this.view.lblCreditAmount.text = CommonUtilities.formatCurrencyWithCommas(this.cardList[this.cardListIndex].availableBalance, false, this.cardList[this.cardListIndex].currencyCode);
          var currentBalance = Number(this.cardList[this.cardListIndex].currentBalance);
          var availableBalance = Number(this.cardList[this.cardListIndex].availableBalance);
          var total = currentBalance + availableBalance;
          if(currentBalance !==0 && availableBalance!==0){
            var currentBalanceWidth = (currentBalance/total)*screenWidth;
            this.view.flxCurntBalBarNTxt.width = currentBalanceWidth + "dp";
            this.view.flxCredLimitBarNTxt.width = (screenWidth - currentBalanceWidth) + "dp";
            this.view.lblBalGraphicTxt.setVisibility(true);
            this.view.flxCurntBalBarNTxt.setVisibility(true);
            this.view.flxCredLimitBarNTxt.setVisibility(true);
          }
          else
          {
            this.view.lblBalGraphicTxt.setVisibility(false);
            this.view.flxCurntBalBarNTxt.setVisibility(false);
            this.view.flxCredLimitBarNTxt.setVisibility(false);
          }
        }
        else{
          var creditLimit = Number(this.cardList[this.cardListIndex].creditLimit);
          var currentBalance = creditLimit - Number(this.cardList[this.cardListIndex].availableCredit);
          this.view.lblBalanceAmount.text = CommonUtilities.formatCurrencyWithCommas(currentBalance, false, this.cardList[this.cardListIndex].currencyCode);
          this.view.lblBalGraphicTxt.text = this.view.lblBalanceAmount.text;
          this.view.lblCreditAmount.text =  CommonUtilities.formatCurrencyWithCommas(this.cardList[this.cardListIndex].availableCredit, false, this.cardList[this.cardListIndex].currencyCode);
          if(!kony.sdk.isNullOrUndefined(this.cardList[this.cardListIndex].paymentDueDate))
          {
            var paymentDueDate = this.cardList[this.cardListIndex].paymentDueDate;
            paymentDueDate = paymentDueDate.replace(' ','T');
            var date = new Date(paymentDueDate);  // 2009-11-10
            // var monthName = date.toLocaleString('default', { month: 'short' });
            var options = { month: 'short'};
            var monthName = new Intl.DateTimeFormat('en-US', options).format(date);
            this.view.lblPaymentDueText.text = "Payment due "+date.getDate()+" "+monthName+".";
          }
          this.view.lblPaymentDueText.setVisibility(true);
          this.view.lblCreditLimitTxt.text = kony.i18n.getLocalizedString("kony.mb.accdetails.creditLimit") +": "+ CommonUtilities.formatCurrencyWithCommas(this.cardList[this.cardListIndex].creditLimit, false, this.cardList[this.cardListIndex].currencyCode);
          this.view.lblAvialCreditText.text = kony.i18n.getLocalizedString("kony.mb.accdetails.availCred");
          if(creditLimit !== 0 ){
            var currentBalanceWidth = (currentBalance/creditLimit)*screenWidth;
            this.view.flxCurntBalBarNTxt.width = currentBalanceWidth + "dp";
            this.view.flxCredLimitBarNTxt.width = (screenWidth - currentBalanceWidth) + "dp";
            this.view.lblBalGraphicTxt.setVisibility(true);
            this.view.flxCurntBalBarNTxt.setVisibility(true);
            this.view.flxCredLimitBarNTxt.setVisibility(true);
          }
          else
          {
            this.view.lblBalGraphicTxt.setVisibility(false);
            this.view.flxCurntBalBarNTxt.setVisibility(false);
            this.view.flxCredLimitBarNTxt.setVisibility(false);
          }
        }
        if(!kony.sdk.isNullOrUndefined(this.cardList[this.cardListIndex].rewardsPoint)){
          this.view.lblRewardPoints.text = this.cardList[this.cardListIndex].rewardsPoint + " pts";
          this.view.flxRewardPoints.setVisibility(true);
        }
        else{
          this.view.flxRewardPoints.setVisibility(false);
        }
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    onSegmentRowClick: function()
    {
      var selectedSectionIndex=Math.floor(this.view.segTransactionsScreen.selectedRowIndex[0]);
      var selectedRowIndex=Math.floor(this.view.segTransactionsScreen.selectedRowIndex[1]);
      var transactionData = this.view.segTransactionsScreen.data[selectedSectionIndex][1][selectedRowIndex];
      var navManager = applicationManager.getNavigationManager();
      navManager.setCustomInfo("frmCardTransactionDetails",transactionData);
      var config = applicationManager.getConfigurationManager();
      if (!config.isDisputeConfigurationAdded) {
        var disputePresentationController = applicationManager.getModulesPresentationController("DisputeTransactions")
        disputePresentationController.fetchDisputeConfiguration();
      } else {
        navManager.navigateTo("frmCardTransactionDetails");
      }
    },
    showTransactions : function(showOnlyCardDetails){
      this.isManageTabShown = false;
      var cardStatus = this.cardList[this.cardListIndex]['cardStatus'];
      this.view.btnTransactionTab.skin = "sknBtnFFFFFFSSPSBoldBdr8Px";
      this.view.btnManageTab.skin = "sknbtn000000SSPSemiBold15px";
      this.view.btnManageTab.right = "2dp";
      var navManager = applicationManager.getNavigationManager();
      var cardTransactionDetails = navManager.getCustomInfo("frmCardManageHomeTransactions");
      var transactions;
      if(!kony.sdk.isNullOrUndefined(cardTransactionDetails))
        transactions = cardTransactionDetails.cardTransactions;
      if(!kony.sdk.isNullOrUndefined(showOnlyCardDetails)&&showOnlyCardDetails === true){
        this.view.flxCardsHomeTabs.setVisibility(true);
        this.view.flxCardBalNCreditStatus.setVisibility(true);
        this.view.flxBalNCreditGraphic.setVisibility(true);
        this.view.flxManageTravelPlanButton.setVisibility(false);
        this.view.flxOptionsContainer.setVisibility(false);
        this.view.flxTransactionsList.setVisibility(false);
        this.view.flxNoTransactionsList.setVisibility(false);
      }
      else if(cardStatus == "Cancelled" ||cardStatus == "Issued"){
        this.view.flxCardsHomeTabs.setVisibility(false);
        this.view.flxTransactionsList.setVisibility(false);
        this.view.flxNoTransactionsList.setVisibility(false);
      }
      else{
        this.view.flxCardsHomeTabs.setVisibility(true);
        this.view.flxManageTravelPlanButton.setVisibility(false);
        this.view.flxOptionsContainer.setVisibility(false);
        this.view.flxCardBalNCreditStatus.setVisibility(true);
        this.view.flxBalNCreditGraphic.setVisibility(true);
        if((!kony.sdk.isNullOrUndefined(transactions)&&transactions.length>0)||this.isAppendData){
          this.view.flxTransactionsList.setVisibility(true);
          this.view.flxNoTransactionsList.setVisibility(false);
        }else{
          this.view.flxTransactionsList.setVisibility(false);
          this.view.flxNoTransactionsList.setVisibility(true);
        }
      }
    },
    hideTransactions : function(){
      this.isManageTabShown = true;
      this.view.flxCardsHomeTabs.setVisibility(true);
      var cardStatus = this.cardList[this.cardListIndex]['cardStatus'];
      var cardType = this.cardList[this.cardListIndex]['cardType'];
      this.view.flxNoTransactionsList.setVisibility(false);
      var replaceCdrdPermission = applicationManager.getConfigurationManager().checkUserPermission("CARD_MANAGEMENT_REPLACE_CARD");
      var lockCard = applicationManager.getConfigurationManager().checkUserPermission("CARD_MANAGEMENT_LOCK_CARD");
      var unLockCard = applicationManager.getConfigurationManager().checkUserPermission("CARD_MANAGEMENT_UNLOCK_CARD");
      var reportCardStolen = applicationManager.getConfigurationManager().checkUserPermission("CARD_MANAGEMENT_REPORT_CARD_STOLEN");
      var changePin = applicationManager.getConfigurationManager().checkUserPermission("CARD_MANAGEMENT_CHANGE_PIN");
      var cancelCard = applicationManager.getConfigurationManager().checkUserPermission("CARD_MANAGEMENT_CANCEL_CARD");
      if(replaceCdrdPermission){
        this.view.flxReplaceCard.isVisible=true;
        this.view.flxSeperator4.setVisibility(true);
      }else{
        this.view.flxReplaceCard.isVisible=false;
        this.view.flxSeperator4.setVisibility(false);
      }
      if(lockCard && unLockCard){
        this.view.flxActiveOrInactive.isVisible=true;
        this.view.flxSeperator2.setVisibility(true);
      }else{
        this.view.flxActiveOrInactive.isVisible=false;
        this.view.flxSeperator2.setVisibility(false);
      }
      if(reportCardStolen){
        this.view.flxReportStolenOrLost.isVisible=true;
        this.view.flxSeperator5.setVisibility(true);
      }else{
        this.view.flxReportStolenOrLost.isVisible=false;
        this.view.flxSeperator5.setVisibility(false);
      }
      if(changePin){
        this.view.flxChangePin.isVisible=true;
        this.view.flxSeperator3.setVisibility(true);
      }else{
        this.view.flxChangePin.isVisible=false;
        this.view.flxSeperator3.setVisibility(false);
      }
      if(cancelCard){
        this.view.flxCancelCard.isVisible=true;
        this.view.flxCancelCardSeparator.setVisibility(true);
      }else{
        this.view.flxCancelCard.isVisible=false;
        this.view.flxCancelCardSeparator.setVisibility(false);
      }
	  if(cardStatus === "Active"){
        this.setPayMethods();
      }
      else{
        this.resetPayFlexs(); 
      }
      if(cardStatus == "Cancelled"){
        this.view.flxOptionsContainer.setVisibility(false);
        this.view.flxCardsHomeTabs.setVisibility(false);
        this.view.flxManageTravelPlanButton.setVisibility(true);
      }
      else if(cardStatus == "Issued")
      {
       // this.view.flxOptionsContainer.setVisibility(false);
        //this.view.flxCardsHomeTabs.setVisibility(false);
       this.view.flxManageTravelPlanButton.setVisibility(false);
         this.setViewForIssuedCard(cardType);
      }
      else if(cardStatus == "Reported Lost")
      {
        if(cardType == applicationManager.getConfigurationManager().OLBConstants.CARD_TYPE.Credit)
        {
          this.view.flxOptionsContainer.setVisibility(true);
          this.view.flxManageTravelPlanButton.setVisibility(true);
        }
        else
          this.view.flxOptionsContainer.setVisibility(false);
        this.setViewForStolenCard(cardType);
      }
      else if (cardStatus === "Replace Request Sent") {
        this.setViewForReplacedCard(cardType);
      } 
      else
      {
        this.view.flxOptionsContainer.setVisibility(true);
        this.view.flxManageTravelPlanButton.setVisibility(true);
      }
	  if(cardType == applicationManager.getConfigurationManager().OLBConstants.CARD_TYPE.Credit)
        this.view.flxCancelCard.setVisibility(true);
      else
        this.view.flxCancelCard.setVisibility(false);
      this.view.flxCardBalNCreditStatus.setVisibility(false);
      this.view.flxBalNCreditGraphic.setVisibility(false);
      this.view.flxTransactionsList.setVisibility(false);
      this.view.btnTransactionTab.skin = "sknbtn000000SSPSemiBold15px";
      this.view.btnManageTab.skin = "sknBtnFFFFFFSSPSBoldBdr8Px";
    },
    onReachingEnd: function()
    {
      if(this.isManageTabShown==false)
      {
        var length = 0;
        for(var i = 0 ; i < this.view.segTransactionsScreen.data.length; i++)
        {
          length += this.view.segTransactionsScreen.data[i][1].length;
        }
        var  manageCardModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        this.isAppendData=true;
        manageCardModule.presentationController.getTransactionsForCard(this.cardId,length);
      }
    },
    setSegmentData: function()
    {
      var formatUtil = applicationManager.getFormatUtilManager();
      var navManager = applicationManager.getNavigationManager();
      var cardTransactionDetails = navManager.getCustomInfo("frmCardManageHomeTransactions");
      var transactions = cardTransactionDetails.cardTransactions;
      if(!kony.sdk.isNullOrUndefined(transactions)&&transactions.length>0){
        var unbilled = [];
        var billed = [];
        this.view.segTransactionsScreen.widgetDataMap = {
          "lblHeader" : "lblHeader",
          "lblTitle" : "transactionDescription",
          "lblDate" : "date",
          "lblTransactionAmount" : "amount"
        };
        var cardType = this.cardList[this.cardListIndex].cardType;
        transactions.forEach(function(transaction){
          if(cardType === "Credit"){
            if(transaction.transactionCategory === "B"){
              billed.push(transaction);
            }
            else{
              unbilled.push(transaction);
            }
          }
          else{
            if(transaction.transactionStatus === "C"){
              billed.push(transaction);
            }
            else{
              unbilled.push(transaction);
            }
          }
          if(!kony.sdk.isNullOrUndefined(transaction.transactionDate) ){
            transaction.transactionDate = transaction.transactionDate.replace(' ','T');
            var currentDate = new Date(transaction.transactionDate);
            var month = (currentDate.getMonth()+1)>=10?(currentDate.getMonth()+1):"0" + (currentDate.getMonth()+1);
            var date = currentDate.getDate()>=10?(currentDate.getDate()):("0" + currentDate.getDate());
            transaction.date = month + "/" + date+ "/" + currentDate.getFullYear();
          }
          else
            transaction.date = "";
          transaction.amount = CommonUtilities.formatCurrencyWithCommas(transaction.transactionAmount, false, transaction.transactionCurrencyCode);
        });
        var data = [];
        if(this.cardTypeFlag===applicationManager.getConfigurationManager().OLBConstants.CARD_TYPE.Credit)
        {
          if(unbilled.length>0){
            data.push([{"lblHeader": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.CardMng.UnBilledTransactions")},unbilled]);
          }
          if(billed.length>0){
            data.push([{"lblHeader": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.CardMng.BilledTransactions")},billed]);
          }
        }
        else
        {
          if(unbilled.length>0){
            data.push([{"lblHeader": "Pending Transactions"},unbilled]);
          }
          if(billed.length>0){
            data.push([{"lblHeader": "Posted Transactions"},billed]);
          }
        }
        if(!this.isAppendData)
        {
          this.view.segTransactionsScreen.removeAll();
          this.view.segTransactionsScreen.setData(data);
          if(data.length !== 0)
            this.isAppendData = true;
        }
        else{
          for(var i = 0; i < this.view.segTransactionsScreen.data.length;i++){
            for(var j = 0; j < data.length ; j++){
              if(this.view.segTransactionsScreen.data[i][0].lblHeader === data[j][0].lblHeader){
                for(var k = 0; k < data[j][1].length; k++){
                  this.view.segTransactionsScreen.addDataAt(data[j][1][k],1,i);
                }
              }
            }
          }
        }
        this.showTransactions();
      } else{
        if(!this.isAppendData){
          this.showTransactions();
        }
      }



    },
    cardListScrollIndex: function() {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardManageHomeController : cardListScrollIndex ####");
        kony.print("-- cardListScrollIndex Start --");
        this.currCardNumber = this.cardList[this.cardListIndex]['maskedCardNumber'];
        var cardStatus = this.cardList[this.cardListIndex]['cardStatus'];
        var cardType = this.cardList[this.cardListIndex]['cardType'];
        this.cardId=this.cardList[this.cardListIndex]['cardId'];
        var index=scope_ManageCards_Pres.expiryCardId.indexOf(this.cardId);
        scope_ManageCards_Pres.currentCardDetails=this.cardList[this.cardListIndex];
        var configManager =  applicationManager.getConfigurationManager();
        if(configManager.isCombinedUser === "true"){
          //var str = this.currCardNumber;
          //var lastNo = str.replace(/.(?=.{4})/g, '');
          //this.view.customCardHeader.lblCardLastNo.text="Card Ending - "+lastNo;
          //this.view.customCardHeader.lblLocateUs.text=this.cardList[this.cardListIndex]['cardProductName'];
          if (applicationManager.getPresentationFormUtility().getDeviceName() === 'iPhone'){
            this.view.title=this.cardList[this.cardListIndex]['cardProductName'];
          }else{
            this.view.customHeader.lblLocateUs.text=this.cardList[this.cardListIndex]['cardProductName'];
          }
          if(!kony.sdk.isNullOrUndefined(this.cardList[this.cardListIndex]['isTypeBusiness'])){
            this.view.customCardHeader.imgIcon.src="businessaccount.png";
            this.buisnessuser=1;
            this.users={
              "buisnessuser":this.buisnessuser,
              "title":this.cardList[this.cardListIndex]['cardProductName']
            }
          }else{
            this.view.customCardHeader.imgIcon.src="personalaccount.png";
            this.buisnessuser=0;
            this.users={
              "buisnessuser":this.buisnessuser,
              "title":this.cardList[this.cardListIndex]['cardProductName']
            }
          }
        }else{
          if (applicationManager.getPresentationFormUtility().getDeviceName() === 'iPhone'){
            this.view.title=this.cardList[this.cardListIndex]['cardProductName'];
          }else{
            this.view.customHeader.lblLocateUs.text=this.cardList[this.cardListIndex]['cardProductName'];
          }
        }
        this.view.flxAboutExpire.setVisibility(false);
        this.cardTypeFlag=cardType;
        this.expiryFlag=(index!==-1)?true:false;
        this.setCurrentCardDetails();
        var  manageCardModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        if(manageCardModule.presentationController.isFirstTime){
          this.isAppendData = false;
          this.hideTransactions();
          //  this.getTransactions();
        }
        else if(this.isManageTabShown===true)
        {
          this.hideTransactions();
        }
        else if(this.isManageTabShown===false)
        {
          this.getTransactions();
        }
        this.setCardView(cardStatus,cardType);
        manageCardModule.presentationController.isFirstTime = false;
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    getTransactions: function(){
      var cardStatus = this.cardList[this.cardListIndex]['cardStatus'];
      var  manageCardModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
      if(cardStatus !== "Cancelled" && cardStatus !== "Issued"){
        applicationManager.getPresentationUtility().showLoadingScreen();
        this.view.segTransactionsScreen.removeAll();
        this.isAppendData=false;
        manageCardModule.presentationController.getTransactionsForCard(this.cardId,0);
      }
      else{
        this.hideTransactions();
      }
    },
    roundNum: function(num, decimals) {
      var t = Math.pow(10, decimals);
      return (Math.round((num * t) + (decimals > 0 ? 1 : 0) * (Math.sign(num) * (10 / Math.pow(100, decimals)))) / t).toFixed(decimals);
    },
    flxActiveOrInactiveOnClick: function() {
      try {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var navManager = applicationManager.getNavigationManager();
        var frmData = navManager.getCustomInfo("frmCardManageHome");
        frmData.isMainScreen = undefined;
        navManager.setCustomInfo("frmCardManageHome",frmData);
        var cardDetails = {
          "cardId": this.getCurrentCardDetails().cardId,
         // "currentCardData" : this.getCurrentCardDetails(),

        };
        if(1==CommonUtilities.getSCAType())
          cardDetails.currentCardData = this.getCurrentCardDetails()


        if (this.view.switchActiveorInactive.selectedIndex === 1) {
          cardDetails.view = "unlockCard";
        } else {
          cardDetails.view = "lockCard";
        }
        if(1==CommonUtilities.getSCAType())
              {
                navManager.setCustomInfo("frmCardMngConfirmDetails",cardDetails);
                var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
                manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMngConfirmDetails");
              }
              else
              {
        navManager.setCustomInfo("frmCardMgtSecurityCode", cardDetails);
        this.navigateToCardsEachflow();
      }
        //         var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        //     	manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMgtSecurityCode");
      }
      catch(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    setCardLocked: function(cardType) {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardManageHomeController : setCardInactive ####");
        // this.view.flxOptionsContainer.setVisibility(true);
        this.view.flxActivateCardMsg.setVisibility(false);
        // this.view.flxAvailableBal.setVisibility(true);
         this.view.flxManageTravelPlanButton.setVisibility(true);
        if(this.expiryFlag===true)
        {
          this.expiryCardsProcess();
        }
        this.view.flxChangePin.setVisibility(false);
        this.view.flxSeperator3.setVisibility(false);
        this.view.flxReplaceCard.setVisibility(true);
        this.view.flxSeperator4.setVisibility(true);
        this.view.flxReportStolenOrLost.setVisibility(true);
        this.view.flxSeperator5.setVisibility(true);
        this.view.flxActiveOrInactive.setVisibility(true);
        this.view.flxSeperator2.setVisibility(true);
        this.view.flxViewStatements.setVisibility(false);
        this.view.flxCardDetails.setVisibility(false);
        this.view.flxViewStatements.setVisibility(false);
        //  this.view.flxCancelCard.setVisibility(true);
        if(cardType == applicationManager.getConfigurationManager().OLBConstants.CARD_TYPE.Credit)
          this.view.flxCancelCard.setVisibility(true);
        else
          this.view.flxCancelCard.setVisibility(false);
        this.view.flxSeperator6.setVisibility(false);
        this.view.flxCustomerCare.setVisibility(false);
        this.view.flxSetPurchaseLimit.setVisibility(false);
        this.view.flxSetATMWithdrawalLimit.setVisibility(false);
        this.view.switchActiveorInactive.selectedIndex = 0;
        this.view.lblActiveOrInactive.text = kony.i18n.getLocalizedString("i18n.CardManagement.UnlockCard");
        this.view.flxActiveOrInactive.forceLayout();
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    setCardActive: function(cardType) {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardManageHomeController : setCardActive ####");
        // this.view.flxOptionsContainer.setVisibility(true);
        this.view.flxActivateCardMsg.setVisibility(false);
        // this.view.flxAvailableBal.setVisibility(true);
        this.view.flxManageTravelPlanButton.setVisibility(true);
        this.view.flxSetPurchaseLimit.setVisibility(true);
        this.view.flxSetATMWithdrawalLimit.setVisibility(true);
        if(this.expiryFlag===true)
        {
          this.expiryCardsProcess();
        }
        this.view.flxChangePin.setVisibility(true);
        this.view.flxSeperator3.setVisibility(true);
        this.view.flxReplaceCard.setVisibility(true);
        this.view.flxSeperator4.setVisibility(true);
        this.view.flxReportStolenOrLost.setVisibility(true);
        this.view.flxViewStatements.setVisibility(true);
        this.view.flxCardDetails.setVisibility(true);
        this.view.flxSeperator5.setVisibility(true);
        this.view.flxActiveOrInactive.setVisibility(true);
        this.view.flxSeperator2.setVisibility(true);
        // this.view.flxCancelCard.setVisibility(true);
        if(cardType == applicationManager.getConfigurationManager().OLBConstants.CARD_TYPE.Credit)
          this.view.flxCancelCard.setVisibility(true);
        else
          this.view.flxCancelCard.setVisibility(false);
        this.view.flxSeperator6.setVisibility(false);
        this.view.flxViewStatements.setVisibility(true);
        this.view.flxCardDetails.setVisibility(true);
        this.view.flxCustomerCare.setVisibility(false);
        this.view.lblActiveOrInactive.text = kony.i18n.getLocalizedString("i18n.CardManagement.LockCard");
        this.view.switchActiveorInactive.selectedIndex = 1;
        this.view.flxActiveOrInactive.forceLayout();
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    showPopupSuccess: function() {
		 var requestId=null;
      var navManager=applicationManager.getNavigationManager();
      var navData=navManager.getCustomInfo("frmCardManageHome");
      if(!kony.sdk.isNullOrUndefined(navData) && !kony.sdk.isNullOrUndefined(navData.isMainScreen))
      {
		   if(!kony.sdk.isNullOrUndefined(navData.reqID))	
          {	
            requestId=navData.reqID;	
          }
        navData.isMainScreen=false;
        navManager.setCustomInfo("frmCardManageHome",navData);
      }
      else
      {
        navManager.setCustomInfo("frmCardManageHome",{"isMainScreen": false});
      }
      if (requestId != null) {
        this.popupMsg = (requestId != "") ? kony.i18n.getLocalizedString("i18n.CardManagement.RequestInitiatedSuccessfully") + " " + requestId : kony.i18n.getLocalizedString("i18n.CardManagement.SucessfulRequestAckMessage")
      }
      applicationManager.getDataProcessorUtility().showToastMessageSuccess(this, this.popupMsg);
      this.popupMsg = "";
    },
    flxChangePinOnClick: function() {
      var cardDetails;
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardManageHomeController : flxChangePinOnClick ####");
        applicationManager.getPresentationUtility().showLoadingScreen();
        var navManager = applicationManager.getNavigationManager();
        if(this.getCurrentCardDetails().cardType=="Credit")
        {
          cardDetails =  {
            "cardId":this.getCurrentCardDetails().cardId,
            "view": "pinChange",
            "cardType": this.getCurrentCardDetails().cardType,
            "CardAccountNumber": this.getCurrentCardDetails().maskedCardNumber,
            "CardAccountName":this.getCurrentCardDetails().cardProductName,
            "AccountType": 'CARD',
            "RequestCode":"NEW_PIN",
            "Channel":"Online"
          };
        }
        else
        {
          cardDetails =  {
            "cardId":this.getCurrentCardDetails().cardId,
            "view": "pinChange",
            "cardType": this.getCurrentCardDetails().cardType,
            "Reason":"lb"
          };
        }
        navManager.setCustomInfo("frmCardMgtSecurityCode",cardDetails);
        this.navigateToCardsEachflow();
        //         var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        //     	manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMgtSecurityCode");
      }
      catch(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    flxSetPurchaseLimitOnClick: function() {
      try {
        var loggerManager = applicationManager.getLoggerManager();
        var currentCardDetails = this.getCurrentCardDetails();
        var cardLimitDetails = {
          "cardId": currentCardDetails.cardId,
          "currencyCode": currentCardDetails.currencyCode,
          "purchaseLimit": currentCardDetails.purchaseLimit,
          "purchaseMinLimit": currentCardDetails.purchaseMinLimit,
          "purchaseMaxLimit": currentCardDetails.purchaseMaxLimit,
          "purchaseStepLimit": currentCardDetails.purchaseStepLimit
        };
        var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        manageCardsModule.presentationController.navigateToSetPurchaseCardLimit(cardLimitDetails);
      }
      catch (err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    
    flxSetATMWithdrawalLimitOnClick: function() {
      try {
        var loggerManager = applicationManager.getLoggerManager();
        var currentCardDetails = this.getCurrentCardDetails();
        var cardLimitDetails = {
          "cardId": currentCardDetails.cardId,
          "currencyCode": currentCardDetails.currencyCode,
          "withdrawalLimit": currentCardDetails.withdrawlLimit,
          "withdrawalMinLimit": currentCardDetails.withdrawalMinLimit,
          "withdrawalMaxLimit": currentCardDetails.withdrawalMaxLimit,
          "withdrawalStepLimit": currentCardDetails.withdrawalStepLimit
        };
        var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        manageCardsModule.presentationController.navigateToSetWithdrawalCardLimit(cardLimitDetails);
      }
      catch (err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    flxReplaceCardOnClick: function() {
      try {
        var currentCardDetails = this.getCurrentCardDetails();
        var navManager = applicationManager.getNavigationManager();
        var bankName = applicationManager.getUserPreferencesManager().getBankName();
        var cardDetails = {
          "cardId": this.getCurrentCardDetails().cardId,
          "view": "replaceCard",
          "cardNumber": currentCardDetails.maskedCardNumber,
          "cardHolderName": currentCardDetails.cardHolderName,
          "expiryDate": currentCardDetails.expiryDate,
          "issuerName": bankName,
          "cardType": currentCardDetails.cardType
        };
        navManager.setCustomInfo("frmCardMgtSecurityCode", cardDetails);
        this.navigateToCardsEachflow();
        //         var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        //     	manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMgtSecurityCode");
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    flxReportStolenOrLostOnClick: function() {
      try {
        var currentCardDetails = this.getCurrentCardDetails();
        var navManager = applicationManager.getNavigationManager();
        var bankName = applicationManager.getUserPreferencesManager().getBankName();
        var cardDetails = {
          "cardId": this.getCurrentCardDetails().cardId,
          "view": "lostCard",
          "cardNumber": currentCardDetails.maskedCardNumber,
          "cardHolderName": currentCardDetails.cardHolderName,
          "expiryDate": currentCardDetails.expiryDate,
          "issuerName": bankName,
          "cardType": currentCardDetails.cardType
        };
        navManager.setCustomInfo("frmCardMgtSecurityCode", cardDetails);
        this.navigateToCardsEachflow();
        //         var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        //    		manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMgtSecurityCode");
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    flxCancelCardOnClick: function() {
      try {
        var currentCardDetails = this.getCurrentCardDetails();
        var navManager = applicationManager.getNavigationManager();
        var bankName = applicationManager.getUserPreferencesManager().getBankName();
        var cardDetails = {
          "cardId": currentCardDetails.cardId,
          "view": "cancelCard",
          "cardNumber": currentCardDetails.maskedCardNumber,
          "cardHolderName": currentCardDetails.cardHolderName,
          "expiryDate": currentCardDetails.expiryDate,
          "issuerName": bankName,
          "cardType": currentCardDetails.cardType
        };
        navManager.setCustomInfo("frmCardMgtSecurityCode", cardDetails);
        this.navigateToCardsEachflow();
        //         var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        //    		manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMgtSecurityCode");
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    setViewForPinChange: function(cardType) {
      // this.view.flxOptionsContainer.setVisibility(true);
      this.view.flxActivateCardMsg.setVisibility(false);
      // this.view.flxAvailableBal.setVisibility(true);
      this.view.flxManageTravelPlanButton.setVisibility(true);
      if(this.expiryFlag===true)
      {
        this.expiryCardsProcess();
      }
      if(cardType === applicationManager.getConfigurationManager().OLBConstants.CARD_TYPE.Credit)
        this.view.flxCancelCard.setVisibility(true);
      else
        this.view.flxCancelCard.setVisibility(false);
      this.view.flxSetPurchaseLimit.setVisibility(true);
      this.view.flxSetATMWithdrawalLimit.setVisibility(true);
      this.view.flxCustomerCare.setVisibility(false);
      this.view.flxViewStatements.setVisibility(true);
      this.view.flxCardDetails.setVisibility(true);
    },
    setViewForReplaceCard: function(cardType) {
      this.view.switchActiveorInactive.selectedIndex = 1;
      this.view.flxReportStolenOrLost.setVisibility(true);
      this.view.flxSeperator5.setVisibility(true);
      // this.view.flxOptionsContainer.setVisibility(true);
      this.view.flxActivateCardMsg.setVisibility(false);
      // this.view.flxAvailableBal.setVisibility(true);
      this.view.flxViewStatements.setVisibility(false);
      this.view.flxCardDetails.setVisibility(false);
      if(this.expiryFlag===true)
      {
        this.expiryCardsProcess();
      }
       this.view.flxManageTravelPlanButton.setVisibility(true);
      if(cardType === applicationManager.getConfigurationManager().OLBConstants.CARD_TYPE.Credit)
        this.view.flxCancelCard.setVisibility(true);
      else
        this.view.flxCancelCard.setVisibility(false);
      this.view.flxCustomerCare.setVisibility(false);
    },
    setViewForStolenCard: function(cardType) {
      if(this.expiryFlag===true)
      {
        this.expiryCardsProcess();
      }
      
      if(cardType == applicationManager.getConfigurationManager().OLBConstants.CARD_TYPE.Credit)
      {
          this.view.flxOptionsContainer.setVisibility(true);
        
        //  this.view.flxAvailableBal.setVisibility(true);
          this.view.flxManageTravelPlanButton.setVisibility(true);
        this.view.flxCustomerCare.setVisibility(false);
        this.view.flxCancelCard.setVisibility(true);
        this.view.flxChangePin.setVisibility(false);
        this.view.flxSeperator3.setVisibility(false);
        this.view.flxReplaceCard.setVisibility(false);
        this.view.flxSeperator4.setVisibility(false);
        this.view.flxReportStolenOrLost.setVisibility(false);
        this.view.flxSeperator5.setVisibility(false);
        this.view.flxActiveOrInactive.setVisibility(false);
        this.view.flxSeperator2.setVisibility(true);
      }
      else
      {
        this.view.flxCancelCard.setVisibility(false);
        // this.view.flxOptionsContainer.setVisibility(false);
        this.view.flxCustomerCare.setVisibility(true);
      }
       this.view.flxActivateCardMsg.setVisibility(false);
      this.view.flxSetPurchaseLimit.setVisibility(false);
      this.view.flxSetATMWithdrawalLimit.setVisibility(false);
      this.view.flxViewStatements.setVisibility(false);
      this.view.flxCardDetails.setVisibility(false);
      this.view.lblActiveOrInactive.text = kony.i18n.getLocalizedString("kony.mb.cardManage.cardActive");
      this.view.switchActiveorInactive.selectedIndex = 0;
      this.view.flxActiveOrInactive.forceLayout();
    },
    setCardInactive: function() {
      // this.view.flxOptionsContainer.setVisibility(true);
      this.view.flxActivateCardMsg.setVisibility(false);
      // this.view.flxAvailableBal.setVisibility(true);
       this.view.flxManageTravelPlanButton.setVisibility(true);
      this.view.flxViewStatements.setVisibility(false);
      this.view.flxCardDetails.setVisibility(false);
      if(this.expiryFlag===true)
      {
        this.expiryCardsProcess();
      }
      this.view.lblMsg.text = kony.i18n.getLocalizedString("kony.mb.cardManage.setInActiveMsg");
      this.view.flxCustomerCare.forceLayout();
      this.view.flxCustomerCare.setVisibility(true);
    },
    setViewForCancelCard: function() {
      // this.view.flxOptionsContainer.setVisibility(false);
      this.view.flxActivateCardMsg.setVisibility(false);
      // this.view.flxAvailableBal.setVisibility(true);
      this.view.flxViewStatements.setVisibility(false);
      this.view.flxCardDetails.setVisibility(false);
      this.view.flxSetPurchaseLimit.setVisibility(false);
      this.view.flxSetATMWithdrawalLimit.setVisibility(false);
       this.view.flxManageTravelPlanButton.setVisibility(true);
      if(this.expiryFlag===true)
      {
        this.expiryCardsProcess();
      }
      this.view.lblMsg.text = kony.i18n.getLocalizedString("kony.mb.cardManage.cancelMessage");
      this.view.flxCustomerCare.forceLayout();
      this.view.flxCustomerCare.setVisibility(true);
    },
    setViewForIssuedCard: function()
    {
       this.view.flxOptionsContainer.setVisibility(false);
      this.view.flxCancelCard.setVisibility(false);
      this.view.flxActivateCardMsg.setVisibility(true);
      // this.view.flxAvailableBal.setVisibility(false);
       this.view.flxManageTravelPlanButton.setVisibility(false);
      if(this.expiryFlag===true)
      {
        this.expiryCardsProcess();
      }
      //  this.view.lblMsg.text = kony.i18n.getLocalizedString("kony.mb.cardManage.cancelMessage");
      // this.view.flxCustomerCare.forceLayout();
      this.view.flxCustomerCare.setVisibility(false);
    },
    setViewForReplacedCard: function(cardType) {
      this.view.lblMsg.text = kony.i18n.getLocalizedString("kony.mb.cardManage.replaceMessage");
      this.view.flxOptionsContainer.setVisibility(true);
      this.view.flxActivateCardMsg.setVisibility(false);
      // this.view.flxAvailableBal.setVisibility(true);
      this.view.flxActiveOrInactive.setVisibility(false);
       this.view.flxManageTravelPlanButton.setVisibility(true);
      if(this.expiryFlag===true)
      {
        this.expiryCardsProcess();
      }
      //       else
      //         {
      //           this.view.btnExpiry.setVisibility(false);
      //         }
      this.view.flxActiveOrInactive.setVisibility(false);
      this.view.flxSeperator2.setVisibility(false);
      this.view.flxChangePin.setVisibility(false);
      this.view.flxSeperator3.setVisibility(false);
      this.view.flxReplaceCard.setVisibility(false);
      this.view.flxSeperator4.setVisibility(false);
      this.view.flxReportStolenOrLost.setVisibility(true);
      this.view.flxSeperator5.setVisibility(true);
      this.view.flxViewStatements.setVisibility(false);
      this.view.flxCardDetails.setVisibility(false);
      this.view.flxSetPurchaseLimit.setVisibility(false);
      this.view.flxSetATMWithdrawalLimit.setVisibility(false);
      if(cardType == applicationManager.getConfigurationManager().OLBConstants.CARD_TYPE.Credit)
        this.view.flxCancelCard.setVisibility(true);
      else
        this.view.flxCancelCard.setVisibility(false);
      // this.view.flxCancelCard.setVisibility(true);
      //  this.view.flxSeperator6.setVisibility(true);
      this.view.flxCustomerCare.setVisibility(false);
      this.view.lblActiveOrInactive.text = kony.i18n.getLocalizedString("kony.mb.cardManage.cardActive");
      this.view.switchActiveorInactive.selectedIndex = 0;
      this.view.flxActiveOrInactive.forceLayout();
    },
    getCurrentCardDetails: function() {
      return this.cardList[this.cardListIndex];
    },
    navigateToCardMngDetails: function() {
      if((this.cardListTotalCards > 0)&&(!(this.getCurrentCardDetails().cardStatus==="Issued"))) {
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("frmCardManageDetails", this.cardList[this.cardListIndex]);
        navManager.setCustomInfo("buisnessuser", this.users);
        var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        manageCardsModule.presentationController.commonFunctionForNavigation("frmCardManageDetails");
      }
    },
    clone: function(obj) {
      if (null === obj || "object" != typeof obj) return obj;
      var copy = obj.constructor();
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
      }
      return copy;
    },
    navigateToMenu: function(){
      var navManager = applicationManager.getNavigationManager();
      navManager.goBack();
    },
    navigateToCardsEachflow: function()
    {
      try {
        var scope = this;
        this.view.customHeader.btnRight.onClick = this.goBackToHome;
        var navManager = applicationManager.getNavigationManager();
        var frmData = navManager.getCustomInfo("frmCardMgtSecurityCode");
        if (frmData === undefined) {
          var newObj = {
            "view": "none"
          };
          frmData = newObj;
        }
        if (frmData.view === "lockCard") {
          this.setFunctionalityForLockCard(frmData);
        }
        if (frmData.view === "unlockCard") {
          this.setFunctionalityForUnlockCard(frmData);
        }
        if (frmData.view === "pinChange") {
          this.setFunctionalityForPinChange(frmData);
        }
        if (frmData.view === "replaceCard") {
          this.setFunctionalityForReplaceCard(frmData);
        }
        if (frmData.view === "lostCard") {
          this.setFunctionalityForLostCard(frmData);
        }
        if (frmData.view === "cancelCard") {
          this.setFunctionalityForCancelCard(frmData);
        }
      }
      catch(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    setFunctionalityForLockCard: function(cardData) {
      var scope = this;
      cardData.Action = "Lock";
      cardData.Reason = "Lock";
      //  this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.cardManage.lockCard");
      //this.titleText = kony.i18n.getLocalizedString("kony.mb.cardManage.lockCard");
      //   this.view.btnProceed.onClick = function() {
      scope.lockUnlockCard(cardData);
      // };
    },
    setFunctionalityForUnlockCard: function(cardData) {
      var scope = this;
      cardData.Action = "Activate";
      cardData.Reason = "Unlock";
      //  this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.cardManage.unlockCard");
      //this.titleText = kony.i18n.getLocalizedString("kony.mb.cardManage.unlockCard");
      //this.view.btnProceed.onClick = function() {
      scope.lockUnlockCard(cardData);
      // };
    },
    showEmptyBillingAddressError : function(){
      var scope = this;
      if(!kony.sdk.isNullOrUndefined(scope.timerCounter)) {
        scope.timerCounter = parseInt(scope.timerCounter)+1;
      }
      else {
        scope.timerCounter = 1;
      }

      var timerId="timerPopupError_frmCardManageHome_BillingAddress"+scope.timerCounter;
      scope.view.customPopup.imgPopup.src = "errormessage.png";
      scope.view.customPopup.lblPopup.text = kony.i18n.getLocalizedString("kony.mb.cardManage.AddAddress");
      scope.view.flxPopup.skin = "sknflxff5d6e";
      scope.view.flxPopup.setVisibility(true);

      kony.timer.schedule(timerId, function() {
        var timerScope ;
        if(!kony.sdk.isNullOrUndefined(scope)) {
          timerScope = scope;
        }
        else {
          timerScope = this;
        }
        timerScope.view.flxPopup.setVisibility(false);
      }, 1.5, false);
      scope_ManageCards_Pres.isBillingAddressAvailable = true;
    },
    lockUnlockCard : function(cardData){
      try {
        applicationManager.getPresentationUtility().showLoadingScreen();
        var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        manageCardsModule.presentationController.updateCardData(cardData);
      }
      catch(err) {
        applicationManager.getPresentationUtility().dismissLoadingScreen();
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.ServiceCallFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    setFunctionalityForPinChange: function(cardDetails) {
      var loggerManager = applicationManager.getLoggerManager();
      try {
        loggerManager.log("#### start frmCardMgtSecurityCodeController : setFunctionalityForPinChange ####");
        cardDetails.Action = "PinChange";
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("frmCardMngReasons", cardDetails );
        if(cardDetails.cardType==="Credit")
        {
          var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
          manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMngReasons");
        }
        else
        {
          var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
          manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMngNewPin");
        }
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    setFunctionalityForReplaceCard: function(cardData) {
      try {
        var scope = this;
        cardData.Action = "Replace";
        // this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.cardManage.replacingCard");
        //this.titleText = kony.i18n.getLocalizedString("kony.mb.cardManage.replacingCard");
        //this.view.btnProceed.onClick = function() {
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("frmCardMngReasons",cardData);
        var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMngReasons");
        //};
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    setFunctionalityForLostCard: function(cardData) {
      try {
        var scope = this;
        cardData.Action = "Report Lost";
        // this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.cardManage.stolenCreditCard");
        // this.titleText = kony.i18n.getLocalizedString("kony.mb.cardManage.stolenCreditCard");
        //this.view.btnProceed.onClick = function() {
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("frmCardMngReasons",cardData);
        var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMngReasons");
        //   };
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    setFunctionalityForCancelCard: function(cardData) {
      try {
        var scope = this;
        cardData.Action = "Cancel";
        // this.view.customHeader.lblLocateUs.text = kony.i18n.getLocalizedString("kony.mb.cardManage.cancelCardTitle");
        // this.titleText = kony.i18n.getLocalizedString("kony.mb.cardManage.cancelCardTitle");
        //this.view.btnProceed.onClick = function() {
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("frmCardMngReasons",cardData);
        var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        manageCardsModule.presentationController.commonFunctionForNavigation("frmCardMngReasons");
        //  };
      }
      catch(err) {
        throw GlobalExceptionHandler.addMessageAndActionForException(err, "kony.error.LoadingFormFailed", GlobalExceptionHandler.ActionConstants.ALERT, arguments.callee.name);
      }
    },
    activateCards: function()
    {
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("frmCardManageNewCVV");
    },
    activateExpiryCards: function(response)
    {
      //if(response===true)
      //{
      scope_ManageCards_Pres.isReplaceCardScenario=true;
      var navManager = applicationManager.getNavigationManager();
      navManager.navigateTo("frmCardManageOldCVV");
      //}
    },
    expiryCardsProcess: function()
    {
      //       var basicConfig={
      //             "alertType": constants.ALERT_TYPE_CONFIRMATION,
      //             "message": "Card is About to Expire. Please Activate Card",
      //             "yesLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertYes"),
      //             "noLabel": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.AlertNo"),
      //           //  "message": "Do you wish to continue?",
      //             "alertHandler": this.activateExpiryCards
      //           };
      //     applicationManager.getPresentationUtility().showAlertMessage(basicConfig,{});
      this.view.flxAboutExpire.setVisibility(true);
    },
    /**
   * @function
   * Entry to Travel Notification Management Home
   * form: frmManageTravelPlans
   */
    navigateToTravelManageHome: function(){

      var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
      manageCardsModule.presentationController.fetchTravelPlans();

    },

    viewStatements:function()
    {
      var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
      manageCardsModule.presentationController.navigateToCardstatements(this.cardId,this.currCardNumber);

    },
    navigateToFilterOrApplyCard:function()
    {
      this.view.flxHeader.setEnabled(false);
      this.view.flxMainContainer.setEnabled(false);
      this.view.flxHamburger.setEnabled(false);
      this.view.flxNoCards.setEnabled(false);
      this.view.flxManageTravelPlanButton.setEnabled(false);
      this.view.flxFooter.setEnabled(false);
      if (applicationManager.getDeviceUtilManager().isIPhone()) {
        this.view.flxPopupApplyForCard.setVisibility(false);

        var actionSheetObject = new kony.ui.ActionSheet({
          "title": null,
          "message": null,
          "showCompletionCallback": null
        });
        applicationManager.actionSheetObject = actionSheetObject;


        var filterCardsAI = new kony.ui.ActionItem({
          "title": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cards.filterCards", "Filter Cards"),
          "style": constants.ACTION_STYLE_DEFAULT,
          "action": this.view.btnFilterCards.onClick
        });
        var applyNewCardAI = new kony.ui.ActionItem({
          "title": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cards.applyNewCard", "Change Profile Picture"),
          "style": constants.ACTION_STYLE_DEFAULT,
          "action": this.view.btnApplyForCard.onClick
        });
        var actionCancel = new kony.ui.ActionItem({
          "title": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.common.Cancel", "Cancel"),
          "style": constants.ACTION_ITEM_STYLE_CANCEL,
          "action": this.enableBackgroundonClose
        });
        actionSheetObject.addAction(filterCardsAI);
        actionSheetObject.addAction(applyNewCardAI);
        actionSheetObject.addAction(actionCancel);
        actionSheetObject.show();
      }
      else
        this.view.flxPopupApplyForCard.setVisibility(true);
    },
    enableBackgroundonClose: function() {
             var scope = this;
             scope.view.flxMainContainer.setEnabled(true);
    },
    cancelFlex:function()
    {
      this.view.flxPopupApplyForCard.setVisibility(false);
      this.view.flxHeader.setEnabled(true);
      this.view.flxMainContainer.setEnabled(true);
      this.view.flxHamburger.setEnabled(true);
      this.view.flxNoCards.setEnabled(true);
      this.view.flxManageTravelPlanButton.setEnabled(true);
      this.view.flxFooter.setEnabled(true);
    },
    navigateToFilterCards:function()
    {
      var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
      manageCardsModule.presentationController.commonFunctionForNavigation("frmManageFilterCards");
    },
    applyForNewCard:function()
    {
       applicationManager.getPresentationUtility().showLoadingScreen();
      var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
      manageCardsModule.presentationController.navigateToNewCardFlow();

    },
	setPayMethods:function(cardStatus){
      var wallet = new WalletsIntegration();
      let applePayPermission = applicationManager.getConfigurationManager().checkUserPermission("CARD_MANAGEMENT_ADD_CARD_APPLE_WALLET");
      let samsungPayPermission = applicationManager.getConfigurationManager().checkUserPermission("CARD_MANAGEMENT_ADD_CARD_SAMSUNG_PAY");        
      let googlePayPermission = applicationManager.getConfigurationManager().checkUserPermission("CARD_MANAGEMENT_ADD_CARD_GOOGLE_PAY");
      this.resetPayFlexs();      
        if(applePayPermission.toString() === "true" && wallet.isApplePaySupported().toString() === "true"){                    
          this.view.flxApplePay.setVisibility(true);
          this.view.flxSeperatorPay4.setVisibility(true);                        
        }                   	                          
        if(samsungPayPermission.toString() === "true"){
          wallet.isSamsungPaySupported(this.samsungPayCallBack);                                     
        }  

        if(googlePayPermission.toString() === "true" && wallet.isGooglePaySupported().toString() === "true"){                                  
          this.view.flxGooglePay.setVisibility(true);
          this.view.flxSeperatorPay6.setVisibility(true);                       
        }        
    },
    applePay:function()
    {
    	this.navToAddCards("ApplePay");               	    	
    },
    samsumgPay:function()
    {    
      	this.navToAddCards("SamsungPay");       	 		 
    },
    googlePay:function()
    {
    	this.navToAddCards("GooglePay");      	      	 
    },
    navToAddCards:function(param){
    	var currentCardDetails = this.getCurrentCardDetails();  
      	var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("frmCardManagePay",param);
        navManager.setCustomInfo("frmCardManagePay_cardDetails",currentCardDetails);
        navManager.navigateTo("frmCardManagePay");	
    },
    SCAComponentUnLockCall : function(response){
      var scopeObj =this;
      const userManager = applicationManager.getUserPreferencesManager();
      const userName = userManager.getUserObj().userName;
      response.userName = userName;
      response.userDetails={
        "data1": response.flowType,
        "data2": response.action
      };
      applicationManager.getMFAManager().setMFAFlowType(response.flowType);
      if (1===CommonUtilities.getSCAType()){
        try{
          scopeObj.view.SCAComponent.setVisibility(true);
          scopeObj.view.SCAComponent.setContext(response);
        }catch(e){
          kony.print(" Unlock SCAComponent Call-->"+e);
          kony.print(e);
        }
      }
    },
    scaSuccessCallback: function(response){
      applicationManager.getPresentationUtility().MFA.navigateToAckScreen(response);
    },
    scaFailureCallback : function(response){
      if(response.hasOwnProperty("isLogoutUser") && response.isLogoutUser ){
        let loginData = applicationManager.getNavigationManager().getCustomInfo("frmLoginToast");
        loginData = loginData ? loginData : {};
        loginData.toastMessage = response.errorMessage;
        applicationManager.getNavigationManager().setCustomInfo("frmLoginToast", loginData);
        const authMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "AuthUIModule", "appName" : "AuthenticationMA"});
        authMod.presentationController.onLogout();
      } else {
        applicationManager.getPresentationUtility().MFA.onMFAError(response);
      }
    },

    SCAComponentActivationCall : function(response){
      applicationManager.getPresentationUtility().dismissLoadingScreen();
      var scopeObj = this;
      this.view.SCAComponent.onSuccessCallback = this.scaSuccessCallback;
      this.view.SCAComponent.onFailureCallback =this.scaFailureCallback;
      this.view.SCAComponent.zIndex= 300;
      const userManager = applicationManager.getUserPreferencesManager();
      const userName = userManager.getUserObj().userName;
      response.userName = userName;
      this.view.flxActivateCardMsg.setVisibility(false);
      response.userDetails={
        //  "data1": this.keypadString,
        //"data2": scope_ManageCards_Pres.currentCardDetails["cardId"]
        "data1": response.flowType,
        "data2": "ACTIVATE"
      };
      if (1===CommonUtilities.getSCAType()){
        try{
          scopeObj.view.SCAComponent.setVisibility(true);

          scopeObj.view.SCAComponent.setContext(response);
        }catch(e){
          kony.print("Card activation SCAComponent Call-->"+e);
          kony.print(e);
        }
      }
    }
  };
});
