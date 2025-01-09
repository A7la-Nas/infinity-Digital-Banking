define({ 

 //Type your controller code here 
  initActions: function () {
    this.view.customHeader.flxBack.onClick = function () {
    new kony.mvc.Navigation({"appName" : "HomepageMA", "friendlyName" : "AccountsUIModule/frmUnifiedDashboard"}).navigate();

    };   
    this.view.customHeader.lblLocateUs.skin = "sknTitle1a98ffffffff30px";
    this.view.segTPP.onRowClick = this.segRowClick;
  },
  preShow: function() {
	this.initActions();
    applicationManager.getPresentationUtility().showLoadingScreen();
    var settingsModule = applicationManager.getModulesPresentationController({"moduleName" : "PSD2ConsentUIModule", "appName" : "ConsentMgmtMA"});
    settingsModule.getTPPData();

  },
  setSegmentData: function(tppData) {
    this.view.segTPP.widgetDataMap = this.getWidgetDataMap();
    this.view.segTPP.setData(tppData);
    this.view.segTPP.setVisibility(true);
    this.view.flxNoTpp.setVisibility(false);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  getWidgetDataMap: function(){
    var map = {
      imgTPP : "imgTPP",
      lblTPP : "lblTPP",
      lblDaysLeft : "lblDaysLeft"
    };
    return map;
  },
  showErrorMessage: function(errorObj){
      if(errorObj){
        this.view.segTPP.setVisibility(false);
        this.view.flxNoTpp.setVisibility(true);
        this.view.lblnoTpp.text = errorObj;
      }
    },
  segRowClick : function()
  {
    var rowId = this.view.segTPP.selectedRowIndex[1];
    var selectedBank = this.view.segTPP.data[rowId];
    var navManager = applicationManager.getNavigationManager();
    navManager.setCustomInfo('frmTppBankNameSelection',{selectedBank,rowId});
    var settingsMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"moduleName" : "PSD2ConsentUIModule", "appName" : "ConsentMgmtMA"});
    settingsMod.presentationController.commonFunctionForNavigation("PSD2ConsentUIModule/frmTppBankNameSelection");
  }
  
 });