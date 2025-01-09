define({ 

 //Type your controller code here 
 frmULTNetworkTranfersPreShow: function () {
    
    this.view.flxLocalTransfer.onTouchEnd = this.navigateToUN;
    this.view.flxUTFTransfer.onTouchEnd = this.navigateToUTF;
    this.view.frmTest.onClick = this.navigateToTest;
    this.view.customHeader.flxBack.onClick = this.flxBackOnClick;

    this.view.flxUNMoneyContainer.onTouchEnd = this.navigateToTestContacts;
 },

    navigateToUN: function() {
      try {
       var self = this;
        var ntf = new kony.mvc.Navigation("UNMoney/frmULTUNMoney");
        ntf.navigate();
      } catch (er) {}
    },

    navigateToUTF: function() {
      try {
       var navMan = applicationManager.getNavigationManager();
         navMan.navigateTo({"appName" : "TransfersMA", "friendlyName" :"UnifiedTransferFlowUIModule/frmSelectTransferTypeNew"});
      } catch (er) {}
    },
    
    


    navigateToTest: function() {
     // try {
       serviceName = "UNMoneyService";
        integrationObj = KNYMobileFabric.getIntegrationService(serviceName);
        operationName =  "UnMonyApprovRemittance";
        data= {"recordId": "FT2434300042"};
        dataa = {};
        dataa["recordId"] = this.view.txtID.text;
        headers= {};
        integrationObj.invokeOperation(operationName, headers, data, operationSuccess, operationFailure);

        function operationSuccess(res){
            // code for success call back
            console.log("ok ok response: ", JSON.stringify(res));
        }
        function operationFailure(res){
            // code for failure call back
            console.log("Full error response: ", JSON.stringify(res));
        }
     // } catch (er) {}
    },

    flxBackOnClick: function() {
      try {
       var self = this;
        var accountMod = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({"appName":"HomepageMA","moduleName":"AccountsUIModule"});
      accountMod.presentationController.showDashboard();
      } catch (er) {}
    },


    navigateToTestContacts: function() {
      try {
       var self = this;
        var ntf = new kony.mvc.Navigation("UNMoney/frmULTTestContacts");
        ntf.navigate();
      } catch (er) {}
    },
 });