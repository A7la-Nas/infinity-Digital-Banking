define(function () {



  function SavePayeeDAO(){
    this.client=kony.sdk.getCurrentInstance();
  }



  /**
     * @api : savePayee
     * @description :  method to invoke save this Payee service
     * @param : objServiceName{String} -object service name
     * @param : objName{String} -object name
     * @param : operationname{String} -operation name
     * @param : criteria{JSON} -criteria
     * @param : onSuccess{function} -function to be invoekd on success
     * @param : unicode{String} -service response
     */
  SavePayeeDAO.prototype.savePayee = function(objServiceName,objName,operationName,criteria,onSuccess,unicode,onError) {
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
                      function(response1) {
      onSuccess(response1,unicode);
      kony.print("Fetch Performed Successfully: " + JSON.stringify(response1));
    },
                      function(error) {

      var errObj = {
        "errorInfo" : "Error in fetch.",
        "error": error
      };
      onError(errObj);
    });
  }; 
  
  /**
     * @api : saveP2PPayee
     * @description :  method to invoke save this Payee service
     * @param : objServiceName{String} -object service name
     * @param : objName{String} -object name
     * @param : operationname{String} -operation name
     * @param : criteria{JSON} -criteria
     * @param : onSuccess{function} -function to be invoekd on success
     * @param : unicode{String} -service response
     */
  SavePayeeDAO.prototype.saveP2PPayee = function(objServiceName,objName,operationName,criteria,onSuccess,unicode,onError) {
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
                      function(response1) {
      onSuccess(response1,unicode);
      kony.print("Fetch Performed Successfully: " + JSON.stringify(response1));
    },
                      function(error) {

      var errObj = {
        "errorInfo" : "Error in fetch.",
        "error": error
      };
      onError(errObj);
    });
  }; 
  return SavePayeeDAO;
});