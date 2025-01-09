define({ 

  onNavigate : function(data)
  {
    var scope = this;
    var navMan = applicationManager.getNavigationManager();
    data = navMan.getCustomInfo("flxDomesticAcknowledgementNew");
    if(kony.os.deviceInfo().name === "iPhone") {
      var titleBarAttributes = this.view.titleBarAttributes;
      titleBarAttributes["shadowImage"] = "transparentbox.png";
      this.view.titleBarAttributes = titleBarAttributes;
      this.view.setBackgroundImageForNavbar({
        "image": "transparentbox.png",
        "barMetrics": constants.BAR_METRICS_DEFAULT
      });
    }
    scope.initActions();
    if(data !== "" && data !== null && data !== undefined) {
      if(data.payeeFlow && data.payeeFlow!=="New"){
        data["btn1Text"] = kony.i18n.getLocalizedString("kony.mb.MM.NewTransfer");
        data["btn2Text"] = kony.i18n.getLocalizedString("kony.mb.MM.transferActivity");
      }
      else{
        data["btn1Text"] = kony.i18n.getLocalizedString("kony.mb.MM.NewTransfer"); 
        data["btn2Text"] = kony.i18n.getLocalizedString("i18n.payments.saveNewPayee");
        data["btn3Text"] = kony.i18n.getLocalizedString("kony.mb.MM.transferActivity");
      }
      if(data.errorDetails === undefined){
        if(data.dbpErrMsg === undefined || data.dbpErrMsg === "" || data.dbpErrMsg === null){
        data["dbpErrMsg"] = data["errmsg"] || data["errorMessage"];
        }
        let obj = 
                  {"message": data["errmsg"] || data["errorMessage"]};
         data["errorDetails"] = JSON.stringify(obj);
      }
      data["btnFailText"] = kony.i18n.getLocalizedString("kony.mb.common.TryAgain");
      scope.view.AcknowledgementComponent.setContext(data);
      if (data.messageDetails) {
        var messageObject = {};
        messageObject.messageDetails = data.messageDetails;
        var formattedText = kony.i18n.getLocalizedString('i18n.kony.transfers.followingDetails');
        messageObject.formattedSuccessText = formattedText;
        messageObject.isSuccess = "";
        this.view.CancelTransactionPopup.setContext(messageObject);
        this.view.flxOverrides.setVisibility(true);
        this.view.CancelTransactionPopup.contextualActionButtonOnClick = function(btnAction){
          if(btnAction)
            scope.view.flxOverrides.setVisibility(false);
        };
      }
    }
  },
  initActions:function()
  {
    var scope = this;
    var navMan = applicationManager.getNavigationManager();
    var configManager = applicationManager.getConfigurationManager();
    scope.view.flxDomesticAckMainContainer.onScrolling = function() {
      scope.iPhoneHeaderHandler();
    };
    scope.view.AcknowledgementComponent.onError = function(error)
    {
     kony.print(JSON.stringify(error));
    };
    scope.view.AcknowledgementComponent.contextualActionButtonOnClick = function(data,context)
    {
      
      if(data === kony.i18n.getLocalizedString("kony.mb.MM.NewTransfer"))
      {
        navMan.setCustomInfo("frmDomesticAddAccountNew", {});
        navMan.navigateTo("UnifiedTransferFlowUIModule/frmSelectTransferTypeNew");
      }
      if(data === kony.i18n.getLocalizedString("kony.mb.common.TryAgain"))
      {

        navMan.navigateTo("UnifiedTransferFlowUIModule/frmSelectTransferTypeNew");
      }
      if(data === kony.i18n.getLocalizedString("i18n.payments.saveNewPayee"))
      {
        navMan.setCustomInfo("frmDomesticAddAccountNew", context);
        navMan.navigateTo("UnifiedAddBeneficiaryUIModule/frmDomesticAddAccountNew");
        
      }
      if(data === kony.i18n.getLocalizedString("kony.mb.MM.transferActivity"))
      {
        //var transMod = applicationManager.getModulesPresentationController("TransactionModule");
        if (configManager.getDeploymentGeography() === 'EUROPE') {
          applicationManager.getPresentationUtility().showLoadingScreen();
          var transferModPresentationController = applicationManager.getModulesPresentationController("ManageActivitiesUIModule");
          transferModPresentationController.clearEuropeFlowAtributes();
          navMan.setEntryPoint("europeTransferFlow", "frmTransferActivitiesTransfersEurope");
          navMan.setEntryPoint("acknowledgementform", "frmDomesticAcknowledgementNew");
          navMan.navigateTo({"appName" : "TransfersMA", "friendlyName" : "ManageActivitiesUIModule/frmTransferActivitiesTransfersEurope"});
        } 
        else {
          var moneyMovementModule = applicationManager.getModulesPresentationController({"moduleName" : "MoneyMovementUIModule", "appName" : "TransfersMA"});
          moneyMovementModule.clearMMFlowAtributes();
          navMan.setEntryPoint("centralmoneymovement", "frmTransferActivitiesTransfers");
          navMan.setEntryPoint("acknowledgementform", "frmDomesticAcknowledgementNew");
          navMan.navigateTo({"appName" : "TransfersMA", "friendlyName" : "MoneyMovementUIModule/frmTransferActivitiesTransfers"});
        }
      }
    };
    scope.view.AcknowledgementComponent.getBtnEntitlement = function(btnId, data, callback)
    {
      callback(true);
    };
    scope.view.AcknowledgementComponent.onBack = function()
    {
     kony.print("Back Navigation");
    };

  },
  iPhoneHeaderHandler: function(){
    var scope = this;
    if(this.view.flxDomesticAckMainContainer.contentOffsetMeasured.y > 50){
      scope.view.title = kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement");
    }
    else if(this.view.flxDomesticAckMainContainer.contentOffsetMeasured.y < 45){
      scope.view.title = "";
    }
  },


});