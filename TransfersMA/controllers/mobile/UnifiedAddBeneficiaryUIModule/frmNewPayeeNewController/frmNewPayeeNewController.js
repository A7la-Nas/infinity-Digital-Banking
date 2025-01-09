define({ 
  contextAck : "",
  onNavigate : function(context)
  {
    
    var navMan = applicationManager.getNavigationManager();
    context = navMan.getCustomInfo("frmNewPayeeNew");
    if(kony.os.deviceInfo().name === "iPhone") {
      var titleBarAttributes = this.view.titleBarAttributes;
      titleBarAttributes["shadowImage"] = "transparentbox.png";
      titleBarAttributes["hidesBackButton"] = false;
      this.view.titleBarAttributes = titleBarAttributes;
      this.view.setBackgroundImageForNavbar({
        "image": "transparentbox.png",
        "barMetrics": constants.BAR_METRICS_DEFAULT
      });
    }
    this.initActions();
    this.contextAck = context;
    this.view.saveNewPayee.setContext(context);
  },
  initActions:function()
  {
    var scope = this;
    var navMan = applicationManager.getNavigationManager();
    var configManager = applicationManager.getConfigurationManager();
    scope.view.flxSaveNewPayee.onScrolling = function() {
      scope.iPhoneHeaderHandler();
    };
    scope.view.saveNewPayee.onError = function(error)
    {
     kony.print(JSON.stringify(error));
    };
    scope.view.saveNewPayee.contextualActionButtonOnClick = function(data)
    {
      //      kony.print(JSON.stringify(data));
      if(data === "NewTransfer")
      {

        navMan.navigateTo("UnifiedTransferFlowNew/frmSelectTransferTypeNew");
      }
      if(data === "TryAgain")
      {

        navMan.navigateTo("UnifiedTransferFlowNew/frmSelectTransferTypeNew");
      }
       if(data === "TransferActivities")
      {
        var transMod = applicationManager.getModulesPresentationController("TransactionModule");
        if (configManager.getDeploymentGeography() === 'EUROPE') {
          applicationManager.getPresentationUtility().showLoadingScreen();
          var transferModPresentationController = applicationManager.getModulesPresentationController("TransferModule");
          transferModPresentationController.clearEuropeFlowAtributes();
          navMan.setEntryPoint("europeTransferFlow", "frmTransferActivitiesTransfersEurope");
          navMan.navigateTo("frmTransferActivitiesTransfersEurope");
        } 
        else {
          var moneyMovementModule = applicationManager.getModulesPresentationController("MoneyMovementModule");
          moneyMovementModule.clearMMFlowAtributes();
          navMan.setEntryPoint("centralmoneymovement", "frmTransferActivitiesTransfers");
          navMan.navigateTo("frmTransferActivitiesTransfers");

        }
      }
    };
    scope.view.saveNewPayee.getBtnEntitlement = function(btnId, data, callback)
    {
      callback(true);
    };
    scope.view.saveNewPayee.onBack = function()
    {
      scope.backToAcknowledgment();
    };
    scope.view.saveNewPayee.requestStart = function()
    {
      kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, true, true, {});
    };
    scope.view.saveNewPayee.requestEnd = function()
    {
      kony.application.dismissLoadingScreen();
    };
    scope.view.saveNewPayee.iphonePayeeAcknowledgmentHeaderHandler = scope.iphonePayeeAcknowledgmentHeader;
  },
  iPhoneHeaderHandler: function(){
    //var scope = this;
    if(this.view.flxSaveNewPayee.contentOffsetMeasured.y > 50){
      this.view.title = kony.i18n.getLocalizedString("Kony.mb.EBill.PayeeNickName");
    }
    else if(this.view.flxSaveNewPayee.contentOffsetMeasured.y < 45){
      this.view.title = "";
    }
  },
  backToAcknowledgment : function()
  {
  
    var navMan = applicationManager.getNavigationManager();
    navMan.goBack();
  },
  iphonePayeeAcknowledgmentHeader: function() {
    var titleBarAttributes = this.view.titleBarAttributes;
    titleBarAttributes["hidesBackButton"] = true;
    this.view.titleBarAttributes = titleBarAttributes;
  }
});