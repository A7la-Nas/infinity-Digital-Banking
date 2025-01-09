define({ 

  onNavigate : function()
  {
   
    var navMan = applicationManager.getNavigationManager();
    var data = navMan.getCustomInfo("frmP2PNewAccountAckNew");
    if(kony.os.deviceInfo().name === "iPhone") {
      var titleBarAttributes = this.view.titleBarAttributes;
      titleBarAttributes["shadowImage"] = "transparentbox.png";
      this.view.titleBarAttributes = titleBarAttributes;
      this.view.setBackgroundImageForNavbar({
        "image": "transparentbox.png",
        "barMetrics": constants.BAR_METRICS_DEFAULT
      });
    }
    this.initActions();
    this.view.Acknowledgement.setContext(data);

  },
  initActions:function()
  {
    var scope = this;
    scope.view.flxAcknowledgement.onScrolling = function() {
      scope.iPhoneHeaderHandler();
    };
    scope.view.Acknowledgement.onError = function(error)
    {
     kony.print(JSON.stringify(error));
    };
    scope.view.Acknowledgement.contextualActionButtonOnClick = function(data,context)
    {
       var navMan = applicationManager.getNavigationManager();
      //alert(JSON.stringify(data));
     
      switch(data) {
        case "NewTransfer":
                          navMan.navigateTo({"friendlyName" : "UnifiedTransferFlowUIModule/frmSelectTransferTypeNew", "appName" : "TransfersMA"});
                          break;
        case "btnTryAgain":
                          navMan.navigateTo({"friendlyName" : "UnifiedTransferFlowUIModule/frmSelectTransferTypeNew", "appName" : "TransfersMA"});
                          break;
        case "SaveNewPayee":
                          navMan.navigateTo("UnifiedAddBeneficiaryUIModule/frmP2PAddAccountNew");
                          break;
        case "Accounts":
                          var accountMod = applicationManager.getModulesPresentationController({"moduleName" : "AccountsUIModule", "appName" : "HomepageMA"});
                          accountMod.showDashboard();
                          break;
        
      }
    };
    scope.view.Acknowledgement.getBtnEntitlement = function(btnId, data, callback)
    {
      callback(true);
    };
    scope.view.Acknowledgement.onBack = function()
    {
     kony.print("Back Navigation");
    };
  },

  iPhoneHeaderHandler: function(){
   
    if(this.view.flxAcknowledgement.contentOffsetMeasured.y > 50){
      this.view.title = kony.i18n.getLocalizedString("i18n.wealth.acknowledgement");
    }
    else if(this.view.flxAcknowledgement.contentOffsetMeasured.y < 45){
      this.view.title = "";
    }
  },


});