define({
   onNavigate : function(param){
     var self = this;
    if(param === "add"){
      self.setAddFlow();
    }
    else if(param === "edit"){
      self.setEditFlow();
    }
  },
  init : function(){
    var navManager = applicationManager.getNavigationManager();
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().initCommonActions(this,"YES",currentForm);
  },
  setEditFlow : function(){
    var scope = this;
   this.view.segContactLocation.onRowClick = function () {
      scope.NavToContactType("edit");
    };
  },
  setAddFlow : function(){
    var scope = this;
 this.view.segContactLocation.onRowClick = function () {
   scope.onRowClickOfLocation();
      //scope.NavToContactType("add");
    };
  },
  onRowClickOfLocation : function(){
    var index = this.view.segContactLocation.selectedRowIndex[1];
    index = parseInt(index);
    var locationType = "domestic";
    if(index === 1){
      locationType = "international";
    }
    var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    settingsMode.presentationController.createOrUpdatePhoneBuilderObject('countryType',locationType);
    settingsMode.presentationController.navigateToProfileContactType();
  },
  preShow: function () {
    this.initActions();
   if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
    }
    else{
      this.view.flxHeader.isVisible = false;
    }
    var navManager = applicationManager.getNavigationManager();
    var param = navManager.getCustomInfo("frmProfileSelectLocation");
    this.onNavigate(param);
    var currentForm=navManager.getCurrentForm();
    applicationManager.getPresentationFormUtility().logFormName(currentForm);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  initActions: function () {
    var scope = this;
    this.view.customHeader.btnRight.onClick = function(){
      var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
      settingsMod.presentationController.commonFunctionForNavigation("frmProfilePersonalDetails");
    };
    this.view.customHeader.flxBack.onClick = function(){
      var navManager = applicationManager.getNavigationManager();
      navManager.goBack();
    };
  },
  NavToContactType : function(param){
    }
});