define(function() {

  function saveNewPayeeDAO() {

  }
  /**
     * Method to save the new payee based on criteria
     * @param {Object} params containing nickanme
     * @param {function} presentationSuccessCallback Method that gets invoked in case of service success
     * @param {function} presentationErrorCallback Method that gets invoked in case of service failure
     */
  saveNewPayeeDAO.prototype.saveNewPayee = function(objServiceName, operationName, objName, criteria, unicode, onSuccess, onError) {

    var objSvc = kony.sdk.getCurrentInstance().getObjectService(objServiceName, {
      "access": "online"
    });
    var dataObject = new kony.sdk.dto.DataObject(objName);

    for (var key in criteria) {
      dataObject.addField(key, criteria[key]);
    }
    var options = {
      "dataObject": dataObject
    };
    objSvc.customVerb(operationName, options,function(response) {
      onSuccess(response, unicode);
      kony.print("Payee added successfully: " + JSON.stringify(response));
    },function(error) {
      var errorObj = {
        "errorInfo": "Failed to save the payee",
        "errorLevel": "Fabric",
        "error": error
      }
      onError(errorObj);
      kony.print("Failed to save the payee:" + JSON.stringify(error));
    });
  };
  return saveNewPayeeDAO;
});