define({ 
  onNavigate: function(param){
    var scope = this;
    var Accounts = applicationManager.getConfigurationManager().userAccounts;
      param["userAccounts"] = Accounts;
    scope.view.PrintReport.setContext(param);
  },
  //Type your controller code here 
  preShow : function(){
    var scope = this;
    var param = {
    };
    scope.view.PrintReport.invokePrint = scope.invokePrint;
  },
  invokePrint: function(widgetId, data){
    var scope = this;
    kony.os.print();
    //timeout is required to allow print popup to be visible.
    setTimeout(function () {
      scope.afterPrintCallback(data);
    }, "17ms");
  }, 
  afterPrintCallback: function(data) {
    //data["previousFormName"] = "frmImportLCPrint";
    if (data.dashboardForm === true) {
      new kony.mvc.Navigation({
        "appName": "TradeFinanceMA",
        "friendlyName": "ImportLCUIModule/frmImportLCDashboard"
      }).navigate();
    } else if (data.viewDetails === true) {
      new kony.mvc.Navigation({
        "appName": "TradeFinanceMA",
        "friendlyName": "ImportLCUIModule/frmImportLCDetails"
      }).navigate(data);
    } /*else if (data.isDrawingDetailsPrint === true) {
            new kony.mvc.Navigation({
                "appName": "TradeFinanceMA",
                "friendlyName": "ImportLCUIModule/frmImportLCDrawingViewDetails"
            }).navigate();
        }*/else{
          new kony.mvc.Navigation({
            "appName": "TradeFinanceMA",
            "friendlyName": "ImportLCUIModule/frmImportLCDashboard"
          }).navigate();	
        }
  }

});