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
    this.view.segContactType.onRowClick = function () {
      scope.navToEditPhoneNumber("edit");
    }
  },
  setAddFlow : function(){
    var scope = this;
    this.view.segContactType.onRowClick = function () {
      scope.onRowClickOfContactType();
      //scope.navToEditPhoneNumber("add");
    }
  },
  onRowClickOfContactType : function(){
      var index = this.view.segContactType.selectedRowIndex[1];
    index = parseInt(index);
    var type = "";
    if(index === 0){
      type = "Home";
    }
    if(index === 1){
      type = "Mobile";
    }
    if(index === 2){
      type = "Work";
    }
    if(index === 3){
      type = "Other";
    }
    var settingsMode = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    settingsMode.presentationController.createOrUpdatePhoneBuilderObject('type',type);
    this.navToEditPhoneNumber("add");
  },
  preShow: function () {
    this.initActions();
    if(applicationManager.getPresentationFormUtility().getDeviceName() !== "iPhone"){
      this.view.flxHeader.isVisible = true;
      this.view.flxTransactionFrequency.top = "56dp";
    }
    else{
      this.view.flxHeader.isVisible = false;
      this.view.flxTransactionFrequency.top = "0dp";
    }
    var navigationManager = applicationManager.getNavigationManager();
    var param = navigationManager.getCustomInfo("frmProfileContactType");
    this.onNavigate(param);
    var navManager = applicationManager.getNavigationManager();
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
  navToEditPhoneNumber : function(param){
    var navManager = applicationManager.getNavigationManager();
    var jsonV = {};
    jsonV.flow = param;
    jsonV.data = "";
    navManager.setCustomInfo("frmProfileEditPhoneNumberMain",jsonV);
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule("SettingsUIModule");
    settingsMod.presentationController.commonFunctionForNavigation("frmProfileEditPhoneNumberMain");
  },
});