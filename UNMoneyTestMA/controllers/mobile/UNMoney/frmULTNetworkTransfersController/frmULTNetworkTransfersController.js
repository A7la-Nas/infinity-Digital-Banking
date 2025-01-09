define({ 

 //Type your controller code here 
 frmULTNetworkTranfersPreShow: function () {
    
    this.view.flxUNMoney.onTouchEnd = this.navigateToUN;
    this.view.frmTest.onClick = this.navigateToTest;
 },

    navigateToUN: function() {
      try {
       var self = this;
        var ntf = new kony.mvc.Navigation("UNMoney/frmULTUNMoneyTypes");
        ntf.navigate();
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
 });