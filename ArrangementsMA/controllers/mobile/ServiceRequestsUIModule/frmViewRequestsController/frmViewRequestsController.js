define({ 

  init: function (){

    var configurationManager = applicationManager.getConfigurationManager();
    var params = configurationManager.userAccounts;
    if(params) {
      this.view.viewRequests.setContext(params);
    }
	this.view.onNavigate = this.onNavigate;
  },
  updateFormUI: function(uiData) {
    if(uiData.documentDownloadFile){
      //this.downloadPageDoc(uiData.documentDownloadFile);
      kony.application.openURL(uiData.documentDownloadFile);
    }
  },
  onNavigate: function () {
	    // Footer Menu
		if (applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone") {
		  var footerMenuUtility = require("FooterMenuUtility");
		  this.footerMenuUtility =
			footerMenuUtility.getFooterMenuUtilityInstance();
		  var cm = applicationManager.getConfigurationManager();
		  this.footerMenuUtility.entitlements = {
			features: cm.getUserFeatures(),
			permissions: cm.getUserPermissions(),
		  };
		  this.footerMenuUtility.scope = this;
		}
    },
  preShow: function (){
 //   this.view.viewRequests.onClickBack = this.navigateCustomBack;
    this.view.onDeviceBack = this.backNavigation;

    this.view.viewRequests.onError = function(error)
    {
      alert(JSON.stringify(error));
    };
	if (applicationManager.getPresentationFormUtility().getDeviceName() !==	"iPhone") {
			this.footerMenuUtility.setFooterMenuItems(this, "flxPrimary500");
			//this.view.customHeader.flxBack.isVisible = false;
	}
  },
//osama
  backNavigation: function () {
      try {
        var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"HomepageMA","moduleName":"AccountsUIModule"});
        accountMod.presentationController.showDashboard();
      } catch (er) {
      }
    },
  postShow: function(){

  },

navigateCustomBack: function () {
    new kony.mvc.Navigation({"appName" : "HomepageMA", "friendlyName" : "AccountsUIModule/frmUnifiedDashboard"}).navigate();
  },

});