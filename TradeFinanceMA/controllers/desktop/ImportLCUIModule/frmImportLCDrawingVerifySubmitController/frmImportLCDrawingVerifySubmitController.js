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
    var accounts = applicationManager.getConfigurationManager().userAccounts;
    var serviceData = [];
    serviceData["DigitalArrangements"] = accounts;
    serviceData["frmType"] = "VerifyAndSubmit";    
    serviceData["LetterOfCredit"] = recievedData;
    scope.view.DrawingDetails.setContext(serviceData);
  },
  preShow : function(){
    var scope = this;
    scope.view.customheadernew.forceCloseHamburger();
    scope.view.customheadernew.activateMenu("TradeFinance","Imports");
  }
});