define(function () {
  
  //constructor
  function ForexDAO(){
  }
  
  ForexDAO.prototype.invokeService = function(serviceConfig){
    try{
      var objectService = kony.sdk.getCurrentInstance().getObjectService(serviceConfig.objectServiceName, { "access": "online" });
      var dataObject = new kony.sdk.dto.DataObject(serviceConfig.objectName);
      for(var key in serviceConfig.criteria){
        dataObject.addField(key,serviceConfig.criteria[key]);
      }
      objectService.customVerb(
        serviceConfig.operationName, 
        { "dataObject": dataObject },
		function(response) {
          kony.print("Service call completed Successfully: " + JSON.stringify(response));
          if(response.hasOwnProperty("dbpErrCode") || response.hasOwnProperty("dbpErrMsg")){
            serviceConfig.onError(response);
          }
          else{
            serviceConfig.onSuccess(response);
          }
        },
        function(error) {
          kony.print("Failed to complete service call:" + JSON.stringify(error));
          serviceConfig.onError(error);
        }
      );
    }
    catch(err){
      serviceConfig.onError(err);
    }
  };

  return ForexDAO;
});