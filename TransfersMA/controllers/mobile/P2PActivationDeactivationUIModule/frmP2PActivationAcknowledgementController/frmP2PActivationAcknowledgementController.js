define({ 

  userDetails: {},
 //Type your controller code here 
  onNavigate: function(context) {
    var scope = this;
    var navMan = applicationManager.getNavigationManager();
    context = navMan.getCustomInfo("frmP2PActivationAcknowledgement");
    if(kony.os.deviceInfo().name === "iPhone") {
      var titleBarAttributes = this.view.titleBarAttributes;
      titleBarAttributes["shadowImage"] = "transparentbox.png";
      this.view.titleBarAttributes = titleBarAttributes;
      this.view.setBackgroundImageForNavbar({
        "image": "transparentbox.png",
        "barMetrics": constants.BAR_METRICS_DEFAULT
      });
    }
    scope.fetchUserDetails(); 
    if(!kony.sdk.isNullOrUndefined(context) && context !== "") {
      scope.view.AcknowledgementComponent.setContext(context);
    }
    scope.initActions();
  },

  initActions:function() {
    var scope = this;
    scope.view.AcknowledgementComponent.onError = function(error) {
     kony.print(JSON.stringify(error));
    };
    scope.view.AcknowledgementComponent.contextualActionButtonOnClick = function(data,context) {
      var navMan = applicationManager.getNavigationManager();
      if(data === kony.i18n.getLocalizedString("i18n.FastTransfers.NewTransfer") || data === kony.i18n.getLocalizedString("kony.mb.common.TryAgain")) {
        var formName = navMan.stack[navMan.stack.length -3];
        //navMan.navigateTo(formName);
        navMan.navigateTo({"friendlyName" : "UnifiedTransferFlowUIModule/frmSelectTransferTypeNew", "appName" : "TransfersMA"});
      } else {
        var accountMod = applicationManager.getModulesPresentationController({"moduleName" : "AccountsUIModule", "appName" : "HomepageMA"});
        accountMod.showDashboard();
      }
    };
    scope.view.AcknowledgementComponent.onBack = function() {
     kony.print("Back Navigation");
    };
    scope.view.flxMainContainer.onScrolling = function() {
      scope.iPhoneHeaderHandler();
    };
  },
  
  iPhoneHeaderHandler : function() {
    var scope = this;
    if(this.view.flxMainContainer.contentOffsetMeasured.y > 50) {
      scope.view.title = kony.i18n.getLocalizedString("kony.mb.MM.Acknowledgement");
    }
    else if(this.view.flxMainContainer.contentOffsetMeasured.y < 45) {
      scope.view.title = "";
    }
  },

  fetchUserDetails : function() {
    var p2pMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "PayAPersonUIModule", "appName" : "TransfersMA"});
    p2pMod.presentationController.fetchUserDetails();
  },
 });