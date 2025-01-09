define(function () {
  function updatePasswordDAO(){
  }
  updatePasswordDAO.prototype.performOperations = function(objServiceName, objName, operationName, criteria, callBack) {
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
    objSvc.customVerb(operationName, options,success => callBack(true, success), error => callBack(false, error));
  };
  return updatePasswordDAO;
});