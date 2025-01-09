define({
  init: function() {
    var scope = this;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm = currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.navigateCustomBack);
  },

  preShow: function() {
    if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
      this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
      this.view.customHeader.btnRight.onClick = this.cancelCommon;
    }
    this.view.btnTransfer.skin = "sknBtn0095e4RoundedffffffSSP26px";
    this.view.btnTransfer.setEnabled(true);
    this.setSegmentData();
    this.view.imgToRightArrow.onTouchEnd=function()
    {
      var navMan = applicationManager.getNavigationManager();
      navMan.navigateTo("frmManageNewCardAccounts");
    };
    this.view.btnTransfer.onClick=function()
    {
      var navMan = applicationManager.getNavigationManager();
      navMan.navigateTo("frmManageNewCardPin");
    }
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  postShow: function() {
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  setSegmentData:function()
  {
    var navMan = applicationManager.getNavigationManager();
    var data = navMan.getCustomInfo("frmManageNewCardReview");
    this.view.imgCard.src= this.getCardImage(data.cardProductName);
    this.view.lblCardName.text=data.cardProductName;
    this.view.lblToAccountValue.text= data.accountName.substr(0,16)+"..."+data.accountId.substr(data.accountId.length-4,data.accountId.length).trim();
    this.view.lblToAvailableBalance.text=data.accountBalanceType+":";
    this.view.lblToBalanceValue.text=applicationManager.getFormatUtilManager().formatAmountandAppendCurrencySymbol(data.availableBalance);
    this.view.segDetails.widgetDataMap = {
      lblTitle:"lblTitle",
      lblValue:"lblValue",
      imgArrow:"imgArrow"
    };

    var data = [
      {
        "lblTitle": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cards.selectedCard") ,
        "lblValue":data.cardProductName,
        "imgArrow": {
          "onTouchEnd": function(widgetRef) {
            var navMan = applicationManager.getNavigationManager();
            navMan.navigateTo("frmManageSelectNewCards");
          }
        }
      } ,
      {
        "lblTitle": applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cards.nameOnCard") ,
        "lblValue":data.cardDisplayName,
        "imgArrow": {
          "onTouchEnd": function(widgetRef) {
            var navMan = applicationManager.getNavigationManager();
            navMan.navigateTo("frmManageNewCardName");
          }
        }
      }
    ];

    this.view.segDetails.setData(data);


  },
  getCardImage: function(cardProductName) {
    var cards = {
      "Classic Cashback Card": 'golden_card.png',
      "Rewards Priority Card": 'petro_card.png',
      "Shop@Ease Platinum Card": 'platinum_card.png',
      "Maverick Debit Card": 'shopping_card.png'
    };
    if (!kony.sdk.isNullOrUndefined(cards[cardProductName])) return cards[cardProductName];
    else return 'platinum_card.png';
  },
  flxBackOnClick: function() {
    var navMan = applicationManager.getNavigationManager();
    navMan.goBack();
  },
  cancelCommon:function()
  {
    var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
    manageCardsModule.presentationController.cancelCommon();
  }

});