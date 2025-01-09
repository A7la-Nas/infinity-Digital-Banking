define(function () {

  function SwiftLookUpDAO(){
    this.client = kony.sdk.getCurrentInstance();
  }

  SwiftLookUpDAO.prototype.fetchSwiftData = function(objServiceName,objName,operationName,criteria,onSuccess,onError,unicode){
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    var objSvc = this.client.getObjectService(objServiceName, {
      "access": "online"
    });
    var dataObject = new kony.sdk.dto.DataObject(objName);
    for(var key in criteria){
      dataObject.addField(key,criteria[key]);
    }
    var options1 = {
      "dataObject": dataObject
    };
    objSvc.customVerb(operationName, options1,
                      function(response) {
      onSuccess(response,unicode);
      kony.print("Fetch Performed Successfully: " + JSON.stringify(response));
    },
                      function(error) {
      var errObj = {
        "errorInfo" : "Error in getting bic/swift code.",
        "error": error
      };
      onError(error);

    });
  }

  return SwiftLookUpDAO;
});