define(function () {
  function DetailsDAO(){

  }
  
  /* @params ServiceName, Operation Name, ObjectName, criteria,onsuccess and onerror 
     @returns reponse on service success and error
   */
  DetailsDAO.prototype.cancelCall = function(objServiceName,operationName,objName,criteria,onSuccess,onError){
    
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
      if(response.hasOwnProperty("errcode") || response.hasOwnProperty("dbpErrCode") || 
        response.hasOwnProperty("dbpErrMsg")){
        onError(response);
      }else{
        onSuccess(response);
      }
      kony.print("Fetch Performed Successfully: " + JSON.stringify(response));
    },
                      function(error) {
      var errObj = {
        "errorInfo" : "Failed to fetch Account Details.",
        "error": error
      };
      onError(errObj);
    });
  };
  
   /* @params ServiceName, Operation Name, ObjectName, criteria,unicode ,onsuccess and onerror 
     @returns reponse on service success and error
     unicode - service identifier 
   */
  DetailsDAO.prototype.getDetails = function(objServiceName,operationName,objName,criteria,unicode,onSuccess,onError){
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
      onSuccess(response, unicode);
      kony.print("Fetch Performed Successfully: " + JSON.stringify(response));
    },
                      function(error) {
      var errObj = {
        "errorInfo" : "Failed to fetch Account Details.",
        "error": error
      };
      onError(errObj);
    });
  };
  
  return DetailsDAO;
});