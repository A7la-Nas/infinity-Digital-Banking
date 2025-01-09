define(function () {

  function UnifiedTransferDAO(){

  }

  /**
     * @api : invokeService
     * @description :  method to invoke service call
     * @param : objServiceName{String} -object service name
     * @param : objName{String} -object name
     * @param : operationname{String} -operation name
     * @param : criteria{JSON} -criteria
     * @param : onSuccess{function} -function to be invoked on success
     * @param : unicode{String} -service response
     */
  UnifiedTransferDAO.prototype.invokeService = function(objServiceName,objName,operationName,criteria,unicode,onSuccess,onError) {
    var objSvc = kony.sdk.getCurrentInstance().getObjectService(objServiceName, {
      "access": "online"
    });
    var dataObject = new kony.sdk.dto.DataObject(objName);
    for(var key in criteria) {
      dataObject.addField(key,criteria[key]);
    }
    var options = {
      "dataObject": dataObject
    };

    objSvc.customVerb(operationName, options, function(response) {
      onSuccess(response,unicode);
      kony.print("Transaction Performed Successfully: " + JSON.stringify(response));
    },
      function(error) {
      var errObj = {
        "errorInfo" : "Error in Transaction method of the component.",
        "error": error
      };
      onError(errObj);
    });
  };

return UnifiedTransferDAO;

});