define({ 

  onNavigate : function(data)
  {
    var scope = this;
    if(kony.os.deviceInfo().name === "iPhone") {
      var titleBarAttributes = this.view.titleBarAttributes;
      titleBarAttributes["shadowImage"] = "transparentbox.png";
      this.view.titleBarAttributes = titleBarAttributes;
      this.view.setBackgroundImageForNavbar({
        "image": "transparentbox.png",
        "barMetrics": constants.BAR_METRICS_DEFAULT
      });
    }
    var navMan = applicationManager.getNavigationManager();
    data = navMan.getCustomInfo("frmP2PAcknowledgementNew");
    scope.initActions();
     if(data !== "" && data !== null && data !== undefined) {
           if(data.payeeFlow && data.payeeFlow!="New"){
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
    }
     scope.view.AcknowledgementComponent.setContext(data);

  },
  initActions:function()
  {
    var scope = this;
    var navMan = applicationManager.getNavigationManager();
    var configManager = applicationManager.getConfigurationManager();
    scope.view.flxAcknowledgement.onScrolling = function() {
      scope.iPhoneHeaderHandler();
    };
    scope.view.AcknowledgementComponent.onError = function(error)
    {
     kony.print(JSON.stringify(error));
    };
    scope.view.AcknowledgementComponent.contextualActionButtonOnClick = function(data,context)
    {
      //alert(JSON.stringify(data));
      if(data === kony.i18n.getLocalizedString("kony.mb.MM.NewTransfer"))
      {
//         var ntf = new kony.mvc.Navigation("frmP2PTransferType");
//         ntf.navigate();
        navMan.navigateTo({"friendlyName" : "UnifiedTransferFlowUIModule/frmSelectTransferTypeNew", "appName" : "TransfersMA"});
      }
      if(data === kony.i18n.getLocalizedString("kony.mb.common.TryAgain"))
      {
//         var ntf = new kony.mvc.Navigation("frmP2PTransferType");
//         ntf.navigate();
        navMan.navigateTo({"friendlyName" : "UnifiedTransferFlowUIModule/frmSelectTransferTypeNew", "appName" : "TransfersMA"});
      }
      if(data === kony.i18n.getLocalizedString("i18n.payments.saveNewPayee"))
      {
//         var ntf = new kony.mvc.Navigation("frmNewPayee");
//         ntf.navigate(context);
        navMan.setCustomInfo("frmNewPayee", context);
        navMan.navigateTo("UnifiedAddBeneficiaryUIModule/frmNewPayeeNew");
        
      }
       if(data === kony.i18n.getLocalizedString("kony.mb.MM.transferActivity"))
      {
        //var transMod = applicationManager.getModulesPresentationController("TransactionModule");
        if (configManager.getDeploymentGeography() === 'EUROPE') {
          applicationManager.getPresentationUtility().showLoadingScreen();
          var transferModPresentationController = applicationManager.getModulesPresentationController({"moduleName" : "ManageActivitiesUIModule", "appName" : "TransfersMA"});
          transferModPresentationController.clearEuropeFlowAtributes();
          navMan.setEntryPoint("europeTransferFlow", "frmTransferActivitiesTransfersEurope");
          navMan.setEntryPoint("acknowledgementform", "frmP2PAcknowledgementNew");
          //navMan.navigateTo("frmTransferActivitiesTransfersEurope");
		  navMan.navigateTo({"appName" : "TransfersMA", "friendlyName" : "ManageActivitiesUIModule/frmTransferActivitiesTransfersEurope"});
		  
        } 
        else {
		  var moneyMovementModule = applicationManager.getModulesPresentationController({"moduleName" : "MoneyMovementUIModule", "appName" : "TransfersMA"});
          moneyMovementModule.clearMMFlowAtributes();
          navMan.setEntryPoint("centralmoneymovement", "frmTransferActivitiesTransfers");
          //navMan.navigateTo("frmTransferActivitiesTransfers");
          navMan.setEntryPoint("acknowledgementform", "frmP2PAcknowledgementNew");
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
    if(this.view.flxAcknowledgement.contentOffsetMeasured.y > 50){
      scope.view.title = kony.i18n.getLocalizedString("i18n.transfers.Acknowledgement");
    }
    else if(this.view.flxAcknowledgement.contentOffsetMeasured.y < 45){
      scope.view.title = "";
    }
  },


});