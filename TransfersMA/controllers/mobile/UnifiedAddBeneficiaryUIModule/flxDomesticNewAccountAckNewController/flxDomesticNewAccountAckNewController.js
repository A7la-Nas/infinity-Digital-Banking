define({ 

  onNavigate : function()
  {
    
     var navMan = applicationManager.getNavigationManager();
    var data = navMan.getCustomInfo("flxDomesticNewAccountAckNew");
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
    scope.view.flxDomesticAckMainContainer.onScrolling = function() {
      scope.iPhoneHeaderHandler();
    };
    scope.view.Acknowledgement.onError = function(error)
    {
     kony.print(JSON.stringify(error));
    };
    scope.view.Acknowledgement.contextualActionButtonOnClick = function(data,context)
    {
      //alert(JSON.stringify(data));
      var navMan = applicationManager.getNavigationManager();
     
      switch(data) {
        case "NewTransfer":
                          navMan.setCustomInfo("frmDomesticAddAccountNew", {});
                          navMan.navigateTo("UnifiedTransferFlowUIModule/frmSelectTransferTypeNew");
                          break;
        case "btnTryAgain":
                          navMan.navigateTo("UnifiedTransferFlowUIModule/frmSelectTransferTypeNew");
                          break;
        case "SaveNewPayee":
                          navMan.setCustomInfo("frmDomesticAddAccountNew", context);
                          navMan.navigateTo("UnifiedAddBeneficiaryUIModule/frmDomesticAddAccountNew");
                          break;
        case "Accounts":
                          var accountModPresentation = applicationManager.getModulesPresentationController({"moduleName" : "AccountsUIModule", "appName" : "HomepageMA"});
                          accountModPresentation.showDashboard();
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
    
    if(this.view.flxDomesticAckMainContainer.contentOffsetMeasured.y > 50){
      this.view.title =  kony.i18n.getLocalizedString("i18n.konybb.common.Acknowledgement");
    }
    else if(this.view.flxDomesticAckMainContainer.contentOffsetMeasured.y < 45){
      this.view.title = "";
    }
  },


});