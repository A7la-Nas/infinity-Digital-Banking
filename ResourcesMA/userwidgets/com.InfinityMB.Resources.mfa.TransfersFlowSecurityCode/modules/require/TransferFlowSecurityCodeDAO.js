define(function () {
  function TransferFlowSecurityCodeDAO(){

  }

  TransferFlowSecurityCodeDAO.prototype.requestLoginMFAOtp= function (objServiceName, objName, operationName, params, presentationSuccessCallback, presentationErrorCallback) {
    var objSvc = kony.sdk.getCurrentInstance().getObjectService(objServiceName, {"access":"online"});
    var dataObject = new kony.sdk.dto.DataObject(objName);
    /*for(var key in criteria){
    dataObject.addField(key,criteria[key]);
    }*/
    //alert(JSON.stringify(dataObject));
    var options = {
      "dataObject": dataObject
    };    
     function getUserCompletionCallback(response) {
        presentationSuccessCallback(response);
    }
    objSvc.customVerb(operationName, options, getUserCompletionCallback, function(error) {
       presentationErrorCallback(error);
      
      kony.print("Failed to fetch Account Details:" + JSON.stringify(error));
    });
  };
  
  TransferFlowSecurityCodeDAO.prototype.verifyLoginMFAOtp = function (objServiceName, objName, operationName, params, presentationSuccessCallback, presentationErrorCallback) {
     var objSvc = kony.sdk.getCurrentInstance().getObjectService(objServiceName, {"access":"online"});
    var dataObject = new kony.sdk.dto.DataObject(objName);
    /*for(var key in criteria){
    dataObject.addField(key,criteria[key]);
    }*/
    //alert(JSON.stringify(dataObject));
    var options = {
      "dataObject": dataObject
    };    
     function getUserCompletionCallback(response) {
        presentationSuccessCallback(response);
    }
    objSvc.customVerb(operationName, options, getUserCompletionCallback, function(error) {
       presentationErrorCallback(error);
      
      kony.print("Failed to fetch Account Details:" + JSON.stringify(error));
    });
  };

  return TransferFlowSecurityCodeDAO;
});