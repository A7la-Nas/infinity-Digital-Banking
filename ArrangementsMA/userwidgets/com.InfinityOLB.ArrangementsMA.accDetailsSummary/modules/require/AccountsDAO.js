define(function () {

  function AccountsDAO(){

  }
  AccountsDAO.prototype.fetchAccountDetails = function(objServiceName,operationName,objName,criteria,unicode,onSuccess,onError) {
    var self = this;
    try{
      var objSvc = kony.sdk.getCurrentInstance().getObjectService(objServiceName, {
        "access": "online"
      });
      var dataObject = new kony.sdk.dto.DataObject(objName);
      for(var key in criteria){
        dataObject.addField(key,criteria[key]);
      }
      var options = {
        "dataObject": dataObject
      };

      objSvc.customVerb(operationName, options,
                        function(response) {
        onSuccess(response,unicode);
          
        var arrangementsModule = kony.mvc.MDAApplication.getSharedInstance().getModuleManager().getModule({
          "moduleName": "AccountsUIModule", 
          "appName": "ArrangementsMA"
        });
        arrangementsModule.presentationController.accountDetails = response;
          
        kony.print("Fetch Performed Successfully: " + JSON.stringify(response));
      },
                        function(error) {
        kony.print("Failed to fetch Account Details:" + JSON.stringify(error));
        var errorObj = {
          "errorInfo" : "Error in fetching account details",
          "errorLevel" : "Fabric",
          "error": error
        };
        onError(errorObj);
      });
    }
    catch(err)
    {
      var errorObj = {
        "errorInfo" : "Error in calling service to fetch account details",
        "errorLevel" : "Business",
        "error": err
      };
      onError(errorObj);
    }
  };
  return AccountsDAO;
});