define(function () {
  function deviceRegistrationDAO(){

  }

  deviceRegistrationDAO.prototype.deviceRegistrationOperations = function(objServiceName, objName, operationName, criteria, callBack) {
    if(!criteria.auth_req_id)
      callBack({ 
        progressBar : {
          isLoading : true
        }
      });
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

    objSvc.customVerb(
      operationName, 
      options,
      function(response) {
        response.operationName = operationName;
        callBack(response);
        kony.print("Fetch Performed Successfully: " + JSON.stringify(response));
        if(!response.auth_req_id)
          callBack({ 
            progressBar : {
              isLoading : false
            },
          });
      },
      function(error) {
        kony.print("Failed to perform operation: " + JSON.stringify(error));
        let defaultErrMsg = "Failed to perform operation, please check network call";
        callBack({ 
          progressBar : {
            isLoading : false
          },
          error : {
            message: error? error.message? error.message :  error.errmsg? error.errmsg : error.errorMessage? error.errorMessage : defaultErrMsg : defaultErrMsg
          }
        });
      });
  };
  
  return deviceRegistrationDAO;
});