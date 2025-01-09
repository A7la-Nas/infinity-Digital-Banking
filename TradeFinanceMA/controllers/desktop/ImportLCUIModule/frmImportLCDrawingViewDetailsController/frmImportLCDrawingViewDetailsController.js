/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Copyright © Temenos Headquarters SA 2021. All rights reserved.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*/
define({ 
  onBreakpointChange: function(){
    this.view.customheadernew.onBreakpointChangeComponent(kony.application.getCurrentBreakpoint());
    this.view.customfooternew.onBreakpointChangeComponent(kony.application.getCurrentBreakpoint());
  },
  onNavigate: function(recievedData){
    var scope = this;
    var serviceData = [];
    var Accounts = applicationManager.getConfigurationManager().userAccounts;
    serviceData["frmType"] = "ViewDetails";
    serviceData["LetterOfCredit"] = recievedData;
    serviceData["DigitalArrangements"] = Accounts;
    //scope.localServiceData = serviceData;
    //scope.flexName = serviceData.letterOfCredits.flexName;
    //scope.frmType = serviceData.letterOfCredits.frmType;     
    scope.view.DrawingDetails.setContext(serviceData);
  },
  preShow : function(){
    var scope = this;
    scope.view.customheadernew.forceCloseHamburger();
    scope.view.customheadernew.activateMenu("TradeFinance","Imports");
  },
  postShow: function(){
     var scope = this;
    scope.view.DrawingDetails.navigateToPrintScreen = scope.navigateToPrintScreen;
  },
  navigateToPrintScreen: function(data){
    data["previousFormName"] = "frmImportLCDrawingViewDetails";
    new kony.mvc.Navigation({
      "appName": "TradeFinanceMA",
      "friendlyName": "ImportLCUIModule/frmImportLCPrint"
    }).navigate(data);
  } 
});