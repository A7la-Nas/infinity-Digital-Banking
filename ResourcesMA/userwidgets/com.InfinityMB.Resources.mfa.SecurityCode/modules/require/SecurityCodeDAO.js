define(function () {
  function SecurityCodeDAO(){

  }

  SecurityCodeDAO.prototype.requestLoginMFAOtp = function(objServiceName, objName, operationName, params, presentationSuccessCallback, presentationErrorCallback){
    var objSvc = kony.sdk.getCurrentInstance().getObjectService(objServiceName, {"access":"online"});
    var dataObject = new kony.sdk.dto.DataObject(objName);
    /*
    var options = {
      "dataObject": dataObject
    };
    objSvc.customVerb(operationName, options, successCallback, failureCallback);
    */                  
    var userobj = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository(objName);
    function getUserCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      }
      else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
    userobj.customVerb(operationName, params, getUserCompletionCallback);
  };
  
  SecurityCodeDAO.prototype.verifyLoginMFAOtp = function (objServiceName, objName, operationName, params, presentationSuccessCallback, presentationErrorCallback) {
    var objSvc = kony.sdk.getCurrentInstance().getObjectService(objServiceName, {"access":"online"});
    var dataObject = new kony.sdk.dto.DataObject(objName);
    /*
    var options = {
      "dataObject": dataObject
    };
    objSvc.customVerb(operationName, options, successCallback, failureCallback);
    */  
    var userobj = kony.mvc.MDAApplication.getSharedInstance().getRepoManager().getRepository(objName);    
    function getUserCompletionCallback(status, data, error) {
      var srh = applicationManager.getServiceResponseHandler();
      var obj = srh.manageResponse(status, data, error);
      if (obj["status"] === true) {
        presentationSuccessCallback(obj["data"]);
      }
      else {
        presentationErrorCallback(obj["errmsg"]);
      }
    }
    userobj.customVerb(operationName, params, getUserCompletionCallback);
  };

  return SecurityCodeDAO;
});