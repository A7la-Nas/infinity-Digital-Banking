define({ 

 //Type your controller code here 
initActions: function () {
    this.view.customHeader.flxBack.onClick = function () {
      new kony.mvc.Navigation({"appName" : "ConsentMgmtMA", "friendlyName" : "frmTppBankNameSelection"}).navigate();
    }; 
  this.view.customHeader.lblLocateUs.skin = "sknTitle1a98ffffffff30px";
  this.mapConsentDetails();
  },
  
  mapConsentDetails : function()
  {     
     var navManager = applicationManager.getNavigationManager();
     var selectedIban = navManager.getCustomInfo('frmTppAccountDetails');
     this.view.customHeader.lblLocateUs.text = selectedIban.selectedAccount.lblTitle;     
     applicationManager.getPresentationUtility().showLoadingScreen();
     var settingsModule = applicationManager.getModulesPresentationController({"moduleName" : "PSD2ConsentUIModule", "appName" : "ConsentMgmtMA"});
     settingsModule.mapAccountDetails(selectedIban.rowId, selectedIban.selectedAccount.lblDetails, selectedIban.index);
  },
   setSegmentData: function(accountData) {
    this.view.segAccountDetails.widgetDataMap = this.getWidgetDataMap();
    this.view.segAccountDetails.setData(accountData);
    applicationManager.getPresentationUtility().dismissLoadingScreen();
  },
  getWidgetDataMap: function(){
    var map = {
      lblTitle : "lblTitle",
      lblDetails : "lblDetails",
    };
    return map;
  }
 });