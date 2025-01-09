define(function () {

  function TransactionListDAO(){

  }
  TransactionListDAO.prototype.fetchTransfersList = function(objServiceName,operationName,objName,criteria,unicode,onSuccess,onError) {
   
    var objSvc = kony.sdk.getCurrentInstance().getObjectService(objServiceName, {
      "access": "online"
    });
    var dataObject = new kony.sdk.dto.DataObject(objName);

    for(var key in criteria){
      dataObject.addField(key,criteria[key]);
    }
    //alert(JSON.stringify(dataObject));
    var options = {
      "dataObject": dataObject
    };    
    
    objSvc.customVerb(operationName, options,
                      function(response) {
      onSuccess(response,unicode);
      kony.print("Fetch Performed Successfully: " + JSON.stringify(response));
    },
                      function(error) {
      var  errorObj =
          {
            "errorInfo" : "Fetch transfers list service call failed",
            "errorLevel" : "Fabric",
            "error": error
          }
      onError(errorObj);
      kony.print("Failed to fetch Account Details:" + JSON.stringify(error));
    });
  };
  
  TransactionListDAO.prototype.deleteTransaction = function(objServiceName, operationName, objName, criteria, onSuccess, onError) {
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
      onSuccess(response);
      kony.print("Delete Performed Successfully: " + JSON.stringify(response));
    },
                      function(error) {
      var  errorObj =
          {
            "errorInfo" : "Delete Transaction Service Call Failed",
            "errorLevel" : "Fabric",
            "error": error
          }
      onError(errorObj);
      kony.print("Failed to delete transaction:" + JSON.stringify(error));
    });
  };

 
return TransactionListDAO;

});