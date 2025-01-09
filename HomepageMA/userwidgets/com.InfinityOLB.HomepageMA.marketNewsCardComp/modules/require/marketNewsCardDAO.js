define(function () {

  function marketNewsCardDAO(){

  }
  /**
     * component Market News Card
     * To invoke the service using sdk apis
     * @param : objServiceName {string}  - name of the fabric object service
     * @param : operationName  {string}  - name of the fabric operation to be invoked
     * @param : objName        {string}  - name of the fabric object
     * @param : criteria   {JSONObject}  - object containing query params
     * @param : onSuccess    {function}  - callback function post receving response
     * @param : unicode        {string}  - unique code to identify service reposne in case of multiple service calls
     */
  marketNewsCardDAO.prototype.fetchDetails = function(objServiceName,operationName,objName,criteria,unicode,onSuccess,onError) {
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
      response.GetSummaryByTopic_Response_1 = JSON.parse(response.GetSummaryByTopic_Response_1);
      onSuccess(response,unicode);
      kony.print("Fetch Performed Successfully: " + JSON.stringify(response));
    },
                      function(error) {
      var  errorObj =
          {
            "errorInfo" : "Fetch Market News list service call failed",
            "errorLevel" : "Fabric",
            "error": error
          }
      onError(errorObj);
      kony.print("Failed to fetch Market News Card:" + JSON.stringify(error));
    });
  };
  return marketNewsCardDAO;
});