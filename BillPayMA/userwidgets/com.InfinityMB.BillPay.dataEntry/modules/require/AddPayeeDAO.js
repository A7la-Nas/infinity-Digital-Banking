define(function () {

  function AddPayeeDAO(){
    this.client=kony.sdk.getCurrentInstance();
  }

  /**
     * @api : createPayee
     * @description :  method to invoke createPayee service
     * @param : objServiceName{String} -object service name
     * @param : objName{String} -object name
     * @param : operationname{String} -operation name
     * @param : criteria{JSON} -criteria
     * @param : onSuccess{function} -function to be invoekd on success
     * @param : unicode{String} -service response
     */
  AddPayeeDAO.prototype.createPayee = function(objServiceName,objName,operationName,criteria,onSuccess,unicode,onError) {
     kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {});
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
            "errorInfo" : "Error in createPayee method of the component.",
            "error": error
          };
          onError(errObj);

    });
  }; 

  /**
     * @api : customPayee
     * @description :  method to invoke customPayee service
     * @param : objServiceName{String} -object service name
     * @param : objName{String} -object name
     * @param : operationname{String} -operation name
     * @param : criteria{JSON} -criteria
     * @param : onSuccess{function} -function to be invoekd on success
     * @param : unicode{String} -service response
     */
  AddPayeeDAO.prototype.customPayee = function(objServiceName,objName,operationName,criteria,onSuccess,unicode,onError) {
     kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {});
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
            "errorInfo" : "Error in customPayee method of the component.",
            "error": error
          };
          onError(errObj);

    });
  }; 
  
  /**
     * @api : updatePayee
     * @description :  method to invoke updatePayee service
     * @param : objServiceName{String} -object service name
     * @param : objName{String} -object name
     * @param : operationname{String} -operation name
     * @param : criteria{JSON} -criteria
     * @param : onSuccess{function} -function to be invoked on success
     * @param : unicode{String} -service response
     */
  AddPayeeDAO.prototype.updatePayee = function(objServiceName,objName,operationName,criteria,onSuccess,unicode,onError) {
     kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {});
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
            "errorInfo" : "Error in editPayee method of the component.",
            "error": error
          };
          onError(errObj);

    });
  }; 

  /**
     * @api : fetchBillerList
     * @description :  method to invoke fetchBillerList service
     * @param : objServiceName{String} -object service name
     * @param : objName{String} -object name
     * @param : operationname{String} -operation name
     * @param : criteria{JSON} -criteria
     * @param : onSuccess{function} -function to be invoked on success
     * @param : unicode{String} -service response
     */
  AddPayeeDAO.prototype.fetchBillerList = function(objServiceName,objName,operationName,criteria,onSuccess,unicode,onError) {
     kony.application.showLoadingScreen(null, "", constants.LOADING_SCREEN_POSITION_ONLY_CENTER, false, true, {});
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
            "errorInfo" : "Error in editPayee method of the component.",
            "error": error
          };
          onError(errObj);

    });
  };
  
  return AddPayeeDAO;
});