define({
	toggleBtnStatus : "",
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
      	this.frmAccpreviewPreshow();
        this.initActions();
		var navManager = applicationManager.getNavigationManager();
		var currentForm = navManager.getCurrentForm();
		applicationManager.getPresentationFormUtility().logFormName(currentForm);
		applicationManager.getPresentationUtility().dismissLoadingScreen();
    },
    initActions: function () {
        var scopeObj = this;
        this.view.customHeader.btnRight.onClick = function(){
          var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
          settingsMod.presentationController.commonFunctionForNavigation("frmTransfers");
        };
		this.view.customHeader.flxBack.onClick = this.imgbackAction;
        this.view.switchPreview.onSlide=this.toggleBtnAction;
    },
	frmAccpreviewPreshow : function(){
  		var navManager = applicationManager.getNavigationManager();
    	var status = navManager.getCustomInfo("frmPreferencesAccountPreview");
        if (status.isRememberMeOn != true || status.deviceReg === false)
        {
          this.view.lblNote.text=kony.i18n.getLocalizedString("kony.mb.preferences.AccountPreviewCannotBeEnabled");
          this.view.flxSwitch.setVisibility(false);
        }
      else{
        this.view.lblNote.text=kony.i18n.getLocalizedString("kony.mb.See.your.account.and.card.balances.instantly.without.signing.on.the.login");
         this.view.flxSwitch.setVisibility(true);
        if(status.accPreview === true)
          this.view.switchPreview.selectedIndex = 0;
        else
           this.view.switchPreview.selectedIndex = 1;
      }
   },
	toggleBtnAction : function(){
      try{
        var navManager = applicationManager.getNavigationManager();
        var authMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "AuthUIModule", "appName" : "AuthenticationMA"});
        var settingsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "SettingsUIModule", "appName" : "ManageProfileMA"});
        if(this.view.switchPreview.selectedIndex===1){
          authMode.presentationController.setAccountPreviewFlag(false);
        }
        else{
          authMode.presentationController.setAccountPreviewFlag(true);
        }
        settingsModule.presentationController.getDevDetails();
        var keys = navManager.getCustomInfo("frmSettings");
        keys.popUpMsg = "";
        navManager.setCustomInfo("frmSettings",keys);
      }catch(er){
        kony.print(er);
      }
   },
   imgbackAction : function(){
  		  var navManager = applicationManager.getNavigationManager();
           navManager.goBack();
   }
});