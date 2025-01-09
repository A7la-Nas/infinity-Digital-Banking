define({
	init : function(){
		var navManager = applicationManager.getNavigationManager();
		var currentForm=navManager.getCurrentForm();
		applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
	},
    preShow: function () {
        if(applicationManager.getPresentationFormUtility().getDeviceName()==="iPhone"){
            this.view.flxHeader.isVisible = false;
        }else{
            this.view.flxHeader.isVisible = true;
        }
        this.initActions();
        var navManager = applicationManager.getNavigationManager();
	  	var currentForm = navManager.getCurrentForm();
	    applicationManager.getPresentationFormUtility().logFormName(currentForm);
	  	applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    initActions: function () {
        var scope = this;
        this.view.btnRegisterDevice.onClick = this.btnRegisterDeviceOnClick;
        this.view.customHeader.flxBack.onClick=function(){
           var navManager = applicationManager.getNavigationManager();
           navManager.goBack();
        };
    },
    btnRegisterDeviceOnClick: function(){
  		var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
        settingsMode.presentationController.deRegisterDevice(this);
    }
});