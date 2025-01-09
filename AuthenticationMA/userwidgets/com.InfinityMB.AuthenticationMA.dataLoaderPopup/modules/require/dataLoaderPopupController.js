define(function() {

	return {
		dismissDataLoaderPopup: function(){
          var presenter = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({ "moduleName": "AuthUIModule", "appName": "AuthenticationMA" });
          presenter.presentationController.dismissDataLoader();
        },
	};
});