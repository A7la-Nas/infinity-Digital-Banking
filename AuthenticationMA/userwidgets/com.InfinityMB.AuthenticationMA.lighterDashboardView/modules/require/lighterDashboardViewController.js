define(function() {

	return {

       dismissDowngradePopup: function(){
      	var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AuthUIModule", "appName": "AuthenticationMA" });
        presenter.presentationController.dismissDowngradePopup();
      },
      
	};
});