define(['CommonUtilities'], function(CommonUtilities2){
  return {
    currencyCode: "",
    init: function () {
      var scope=this;
      var currentFormObject = kony.application.getCurrentForm();
      var currentForm=currentFormObject.id;
      applicationManager.getPresentationFormUtility().initCommonActions(this, "CALLBACK", currentForm, scope.navigateCustomBack);
    },

    preShow: function () {
  /*    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
        this.view.flxHeader.isVisible = true;
      }
      else{
        this.view.flxHeader.isVisible = false;
        this.view.title= kony.i18n.getLocalizedString("kony.mb.MM.Confirmation");
      } */
      var navManager = applicationManager.getNavigationManager();
      var deviceUtilManager = applicationManager.getDeviceUtilManager();
      var configurationManager = applicationManager.getConfigurationManager();
      var formatManager = applicationManager.getFormatUtilManager();
      var isIPhone = deviceUtilManager.isIPhone();
      this.view.flxHeader.setVisibility(!isIPhone);
      this.currencyCode = configurationManager.getCurrencyCode();

      this.initActions();

      var cardDetails = navManager.getCustomInfo("frmSetCardLimitConfirmation");
      this.cardDetails = cardDetails;
      if (cardDetails === undefined) {
        var newObj = {
          "view": "none"
        };
        cardDetails = newObj;
      }
  //    this.setupUI();
      if (cardDetails.requestId && cardDetails.requestId!== "") {
        this.view.lblRequest.setVisibility(true);
        this.view.lblRequestId.setVisibility(true);
        this.view.lblRequestId.text = cardDetails.requestId;
      }
      else {
        this.view.lblRequest.setVisibility(false);
        this.view.lblRequestId.setVisibility(false);
      }
      if (cardDetails.view === "purchase") {
        this.view.lblUpdateMsg.text=kony.i18n.getLocalizedString("kony.mb.cardManage.purchaseLimitUpdate");
      }

      if (cardDetails.view === "withdrawal") {
        this.view.lblUpdateMsg.text=kony.i18n.getLocalizedString("kony.mb.cardManage.ATMLimitUpdate");
      }

      var isMirrorLayoutEnabled = CommonUtilities2.isMirrorLayoutEnabled();
      var newLimit = cardDetails.newLimit;
  //    var currencySymbol = cardDetails.currencySymbol;
      var limitMsg = kony.i18n.getLocalizedString("kony.mb.cardManage.NewLimit");
      if(!isMirrorLayoutEnabled){
      	this.view.lblNewLimitMsg.text = limitMsg + " " + formatManager.getCurrencySymbol(this.currencyCode) + " " + newLimit; 
      } else {
        this.view.lblNewLimitMsg.text = limitMsg + " " + newLimit + " " + formatManager.getCurrencySymbol(this.currencyCode); 
      }
      applicationManager.getPresentationUtility().dismissLoadingScreen();

      var currentForm = navManager.getCurrentForm();

      applicationManager.getPresentationFormUtility().logFormName(currentForm);
    },

    initActions: function () {
      var scope = this;

      scope.view.btnCardsManagement.onClick=function(){
  //      scope_ManageCards_Pres.activeCardsScenario=true;
        var navManager = applicationManager.getNavigationManager();
        navManager.setCustomInfo("frmCardManageHome",{"isMainScreen": false});
        var manageCardsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("ManageCardsUIModule");
        manageCardsModule.presentationController.showCardsHome();
      };
      this.view.onDeviceBack = scope.view.btnCardsManagement.onClick;
    },
    setupUI : function () {
      /*  if(scope_ManageCards_Pres.isATMLimitScenario===true)
      {
        scope_ManageCards_Pres.isATMLimitScenario=false;
        this.view.lblUpdateMsg.text=kony.i18n.getLocalizedString("kony.mb.cardManage.ATMLimitUpdate");

      }
    else
      {
        scope_ManageCards_Pres.isPurchaseLimitScenario=false;
        this.view.lblUpdateMsg.text=kony.i18n.getLocalizedString("kony.mb.cardManage.purchaseLimitUpdate");
      }

  */
      var isMirrorLayoutEnabled = CommonUtilities2.isMirrorLayoutEnabled();
      var newLimit = 2000;
      var limitMsg = kony.i18n.getLocalizedString("kony.mb.cardManage.NewLimit");
      if(!isMirrorLayoutEnabled){
         this.view.lblNewLimitMsg.text = limitMsg + " " + formatManager.getCurrencySymbol(this.currencyCode) + " " + newLimit;
      } else {
         this.view.lblNewLimitMsg.text = limitMsg + " " + newLimit + " " + formatManager.getCurrencySymbol(this.currencyCode); 
      }
     
      applicationManager.getPresentationUtility().dismissLoadingScreen();
    }
  }
});