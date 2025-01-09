define(function () {
  function BeneficiaryListDAO(){
  }
  /**
     * component fetchBeneficiaryList
     * To invoke the service using sdk apis
     * @param : objServiceName {string}  - name of the fabric object service
     * @param : operationName  {string}  - name of the fabric operation to be invoked
     * @param : objName        {string}  - name of the fabric object
     * @param : criteria   {JSONObject}  - object containing query params
     * @param : onSuccess    {function}  - callback function post receving response
     * @param :         {string}  - unique code to identify service response in case of multiple service calls
     */
  BeneficiaryListDAO.prototype.fetchBeneficiaryList = function(objServiceName,operationName,objName,criteria,onSuccess,onError) {
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    var objSvc = kony.sdk.getCurrentInstance().getObjectService(objServiceName, {
        "access": "online"
    });
    var dataObject = new kony.sdk.dto.DataObject(objName);
    var options;
    var successCallback = function(response){
      kony.application.dismissLoadingScreen();
      onSuccess(response);
      kony.print("Fetch Performed Successfully: " + JSON.stringify(response));
    };
    var errorCallback = function(error) {
     var errObj = {
            "errorInfo" : "Failed to fetch Account Details.",
            "error": error
          };
          onError(errObj);
    };
    
    if(operationName == "GET"){
      var odataUrl = "sortBy=" + criteria.sortBy + "&order=" + criteria.order + "&offset=" + criteria.offset +"&limit=" + criteria.limit + "&dataSource="+ criteria.dataSource;
      dataObject.setOdataUrl(odataUrl);
      options = {
        "dataObject": dataObject
      };
      objSvc.fetch(options, successCallback, errorCallback);
    }else{
      for(var key in criteria){
        dataObject.addField(key,criteria[key]);
      }
      options = {
        "dataObject": dataObject
      };
      objSvc.customVerb(operationName, options, successCallback, errorCallback);
    }
  };
  
  /**
     * component searchBeneficiaries
     * To invoke the service using sdk apis
     * @param : objServiceName {string}  - name of the fabric object service
     * @param : operationName  {string}  - name of the fabric operation to be invoked
     * @param : objName        {string}  - name of the fabric object
     * @param : criteria   {JSONObject}  - object containing query params
     * @param : onSuccess    {function}  - callback function post receving response
     * @param :         {string}  - unique code to identify service reposne in case of multiple service calls
     */
  BeneficiaryListDAO.prototype.searchBeneficiaries = function(objServiceName,operationName,objName,criteria,responsePath,onSuccess,onError) {
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    var objSvc = kony.sdk.getCurrentInstance().getObjectService(objServiceName, {
        "access": "online"
    });
    var dataObject = new kony.sdk.dto.DataObject(objName);
    var options;
    var successCallback = function(response){
      kony.application.dismissLoadingScreen();
      if(response[responsePath] === undefined || response[responsePath] === null){
        response[responsePath] = response["records"];
        delete response["records"];
      }
      onSuccess(response);
      kony.print("Fetch Performed Successfully: " + JSON.stringify(response));
    };
    var errorCallback = function(error) {
     var errObj = {
            "errorInfo" : "Failed to fetch Account Details.",
            "error": error
          };
          onError(errObj);
    };
    
    if(operationName == "GET"){
      var odataUrl = "searchString=" + criteria.searchString + "&dataSource="+ criteria.dataSource;
      dataObject.setOdataUrl(odataUrl);
      options = {
        "dataObject": dataObject
      };
      objSvc.fetch(options, successCallback, errorCallback);
    }else{
      for(var key in criteria){
        dataObject.addField(key,criteria[key]);
      }
      options = {
        "dataObject": dataObject
      };
      objSvc.customVerb(operationName, options, successCallback, errorCallback);
    }
  };
  
/**
     * component fetchP2PBeneficiaryList
     * To invoke the service using sdk apis
     * @param : objServiceName {string}  - name of the fabric object service
     * @param : operationName  {string}  - name of the fabric operation to be invoked
     * @param : objName        {string}  - name of the fabric object
     * @param : criteria   {JSONObject}  - object containing query params
     * @param : onSuccess    {function}  - callback function post receving response
     * @param :         {string}  - unique code to identify service reposne in case of multiple service calls
     */
  BeneficiaryListDAO.prototype.fetchP2PBeneficiaryList = function(objServiceName,operationName,objName,criteria,onSuccess,onError) {
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
    var objSvc = kony.sdk.getCurrentInstance().getObjectService(objServiceName, {
        "access": "online"
    });
    var dataObject = new kony.sdk.dto.DataObject(objName);
    var options;
    var successCallback = function(response){
      kony.application.dismissLoadingScreen();
      onSuccess(response);
      kony.print("Fetch Performed Successfully: " + JSON.stringify(response));
    };
    var errorCallback = function(error) {
     var errObj = {
            "errorInfo" : "Failed to fetch Account Details.",
            "error": error
          };
          onError(errObj);
    };
    
    if(operationName == "GET"){
      var odataUrl = "sortBy=" + criteria.sortBy + "&order=" + criteria.order + "&offset=" + criteria.offset +"&limit=" + criteria.limit + "&dataSource="+ criteria.dataSource;
      dataObject.setOdataUrl(odataUrl);
      options = {
        "dataObject": dataObject
      };
      objSvc.fetch(options, successCallback, errorCallback);
    }else{
      for(var key in criteria){
        dataObject.addField(key,criteria[key]);
      }
      options = {
        "dataObject": dataObject
      };
      objSvc.customVerb(operationName, options, successCallback, errorCallback);
    }
  };
/**
     * component deleteBeneficiary
     * To invoke the service using sdk apis
     * @param : objServiceName {string}  - name of the fabric object service
     * @param : operationName  {string}  - name of the fabric operation to be invoked
     * @param : objName        {string}  - name of the fabric object
     * @param : criteria   {JSONObject}  - object containing query params
     * @param : onSuccess    {function}  - callback function post receving response
     * @param :         {string}  - unique code to identify service reposne in case of multiple service calls
     */
  BeneficiaryListDAO.prototype.deleteBeneficiary = function(objServiceName,operationName,objName,criteria,onSuccess,onError) {
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
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
      kony.application.dismissLoadingScreen();
      onSuccess(response);
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
/**
     * component deleteP2PBeneficiary
     * To invoke the service using sdk apis
     * @param : objServiceName {string}  - name of the fabric object service
     * @param : operationName  {string}  - name of the fabric operation to be invoked
     * @param : objName        {string}  - name of the fabric object
     * @param : criteria   {JSONObject}  - object containing query params
     * @param : onSuccess    {function}  - callback function post receving response
     * @param :         {string}  - unique code to identify service reposne in case of multiple service calls
     */
  BeneficiaryListDAO.prototype.deleteP2PBeneficiary = function(objServiceName,operationName,objName,criteria,onSuccess,onError) {
    kony.application.showLoadingScreen("loadingskin","Data is still Loading");
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
      kony.application.dismissLoadingScreen();
      onSuccess(response);
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
  
  return BeneficiaryListDAO;
});