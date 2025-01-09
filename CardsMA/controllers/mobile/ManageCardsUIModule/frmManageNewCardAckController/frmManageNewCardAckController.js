define({
  init: function () {
    var scope=this;
    var currentFormObject = kony.application.getCurrentForm();
    var currentForm=currentFormObject.id;
    applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm);
  },
  preShow: function () {
    if (kony.os.deviceInfo().name === "iPhone") {
      this.view.flxHeader.isVisible = false;
    }
    this.initActions();
    this.setupUI();
    this.setSegmentData();
    var navManager = applicationManager.getNavigationManager();
    var currentForm = navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
  },
  initActions: function () {
    var scope = this;
    var navMan = applicationManager.getNavigationManager();
    scope.view.btnDashboard.onClick = this.backToCardManagement;

  },
  setupUI : function () {

    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  setSegmentData : function () {
    var navMan = applicationManager.getNavigationManager();
    var ContextData = navMan.getCustomInfo("frmManageNewCardAck");
    var cardObj = applicationManager.getCardsManager();
    var cardobjIns = cardObj.getCardObject();
    var data = cardobjIns;
    var refno;
    refno=ContextData.orderId;
    if( refno && refno != "") {
    var segData=[
      {
        "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.CM.account")+":",
        "value":data.accountName
      },
      {
        "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.CardMng.cardProductName")+":",
        "value":data.cardProductName
      },

      {
        "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cards.nameOnCard"),
        "value":data.cardDisplayName
      },
      {
        "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cards.newCardReqRefNo"),
        "value":refno
      }
    ];
  } 
  else{
    var segData=[
      {
        "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.CM.account")+":",
        "value":data.accountName
      },
      {
        "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.CardMng.cardProductName")+":",
        "value":data.cardProductName
      },

      {
        "property":applicationManager.getPresentationUtility().getStringFromi18n("kony.mb.cards.nameOnCard"),
        "value":data.cardDisplayName
      }
    ];
  }
    this.view.segDetails.widgetDataMap = this.getWidgetDataMap();
    this.view.segDetails.setData(segData);
  },
  getWidgetDataMap : function () {
    var map = {
      lblTitle:"property",
      lblDetails:"value",
    }
    return map;
  },
  backToCardManagement : function () {
    var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
    manageCardsModule.presentationController.cancelCommon();
  },
});