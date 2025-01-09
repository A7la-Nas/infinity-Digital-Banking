define(function() {

	return {
		
      dismissUpgradePopup: function(){
      	var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AuthUIModule", "appName": "AuthenticationMA" });
        presenter.presentationController.dismissUpgradePopup();
      },
      
	};
});