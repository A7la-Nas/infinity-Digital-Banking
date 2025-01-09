define(['CampaignUtility'], function(CampaignUtility){
  return{
    cardProducts: null,
    init: function() {
      var navManager = applicationManager.getNavigationManager();
      var currentForm = navManager.getCurrentForm();
      applicationManager.getPresentationFormUtility().initCommonActions(this, "YES", currentForm);
    },
    preShow: function() {
      if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
        this.view.flxHeader.isVisible = true;
      } else {
        this.view.flxHeader.isVisible = false;
      }
      this.view.customHeader.flxBack.onClick = this.flxBackOnClick;
      this.view.customHeader.btnRight.onClick = this.cancelCommon;
      this.setSegmentData();
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    setSegmentData: function() {
      var navMan = applicationManager.getNavigationManager();
      var data = navMan.getCustomInfo("frmManageSelectNewCards");
      data = data.cardProducts;
      this.cardProducts = data;
      if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
          data[i]["imgCard"] = {
            "src": this.getCardImage(data[i]["productName"])
          }
          data[i]["btnApply"] = {
            "text": kony.i18n.getLocalizedString("kony.mb.Location.Apply"),
            "onClick": function(widget, context) {
              var r = context["rowIndex"];
              var data1 = context.widgetInfo.data[r];
              var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
              manageCardsModule.presentationController.navigateToCardName(data1);
            }
          }
          data[i]["btnLearnMore"] = {
            "text": kony.i18n.getLocalizedString("kony.mb.login.learnMore"),
            "onClick": function(widget, context) {
              var r = context["rowIndex"];
              var data1 = context.widgetInfo.data[r];
              var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
              manageCardsModule.presentationController.navigateToLearnMore(data1);
            }
          }
        }
        this.view.segSelectProducts.widgetDataMap = {
          "lblCardName": "productName",
          "imgCard": "imgCard",
          "rtxCardDetails": "featureOverview",
          "btnLearnMore": "btnLearnMore",
          "btnApply": "btnApply"
        };
        this.view.segSelectProducts.setData(data);
        this.view.flxNoProducts.setVisibility(false);
      } else {
        this.view.flxNoProducts.setVisibility(true);
      }
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

  };
});